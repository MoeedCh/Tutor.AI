import multiprocessing
import os
import time

import ebooklib
from bs4 import BeautifulSoup
from ebooklib import epub
from langchain.text_splitter import RecursiveCharacterTextSplitter


import multiprocessing

def _worker(tasks, results, task_completed):
    while True:
        item = tasks.get()
        if item is None:  # Sentinel value
            tasks.task_done()
            break
        priority, (func, args) = item
        result = func(*args)
        results.put(result)  # Store the result
        task_completed.set()  # Signal that the task has been completed
        tasks.task_done()

class ProcessPool:
    def __init__(self):
        self.tasks = multiprocessing.JoinableQueue()
        self.results = multiprocessing.Manager().Queue()
        self.task_completed = multiprocessing.Event()  # <-- Add an event object
        self.num_cores = multiprocessing.cpu_count()-1
        self.processes = []

    def start_workers(self):
        for _ in range(self.num_cores):
            p = multiprocessing.Process(target=_worker, args=(self.tasks, self.results, self.task_completed))
            p.start()
            self.processes.append(p)

    def get_result(self):
        return self.results.get()

    def submit_task(self, func, args, priority):
        task_data = (func, args)
        self.tasks.put((priority, task_data))
        if len(self.processes) < self.num_cores:  # Start a new process if there are idle cores
            self.start_workers()

    def close(self):
        for _ in range(self.num_cores):
            self.tasks.put(None)
        for p in self.processes:
            p.join()

    def join(self):
        self.tasks.join()

        # Wait for all tasks to be completed
        while not self.tasks.empty():
            self.task_completed.wait()
            self.task_completed.clear()

        self.close()

def task_func(task_id):
    """A simple task function that returns the task ID."""
    time.sleep(1)  # Simulate some work
    return task_id

if __name__ == '__main__':
    # Create a process pool with 4 worker processes
    pool = ProcessPool()

    # Start the worker processes
    #pool.start_workers()

    # Submit a list of tasks to the pool
    tasks = [(task_func, (i,), 0) for i in range(10)]
    for task in tasks:
        pool.submit_task(*task)

    # Wait for all tasks to complete
    pool.join()

    # Get the results of the tasks
    results = []
    while not pool.results.empty():
        result = pool.get_result()
        results.append(result)

    # Print the results
    print(results)