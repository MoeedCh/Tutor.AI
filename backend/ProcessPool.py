import multiprocessing

import ebooklib
from bs4 import BeautifulSoup
from ebooklib import epub
from langchain.text_splitter import RecursiveCharacterTextSplitter


# Moved the worker function out of the class
def _worker(tasks, results):
    while True:
        item = tasks.get()
        if item is None:  # Sentinel value
            tasks.task_done()
            break
        priority, (func, args) = item
        result = func(*args)
        results.put(result)  # Store the result
        tasks.task_done()


class ProcessPool:
    def __init__(self):
        self.tasks = multiprocessing.JoinableQueue()
        self.results = multiprocessing.Manager().Queue()  # <-- Add a results queue
        self.num_cores = multiprocessing.cpu_count()
        self.processes = []

    def start_workers(self):
        for _ in range(self.num_cores):
            p = multiprocessing.Process(target=_worker, args=(self.tasks, self.results))  # Pass the results queue
            p.start()
            self.processes.append(p)

    def get_result(self):
        return self.results.get()

    def submit_task(self, func, args, priority):
        """Submits a task to the given priority queue with the specified priority."""
        task_data = (func, args)
        self.tasks.put((priority, task_data))

    def close(self):
        """Close the pool, terminating all worker processes."""
        # Add sentinel values to signal workers to exit
        for _ in range(self.num_cores):
            self.tasks.put(None)
        # Wait for all worker processes to finish
        for p in self.processes:
            p.join()

def print_message(msg):
    print(msg)


def split_text(item, max_chunk_size=2000):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=max_chunk_size, chunk_overlap=0)
    if isinstance(item, str):
        return text_splitter.split_text(item)
    else:
        return text_splitter.split_documents(item)


def add_epub(epub_path, pool=None):
    book = epub.read_epub(epub_path)
    text = []
    for item in book.get_items():
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            soup = BeautifulSoup(item.get_content(), "html.parser")
            t = soup.get_text().strip()
            if t == "":
                continue
            text.append(t)

    if pool:
        results = []
        for item in text:
            pool.submit_task(split_text, (item,), 1)

        # Collect results
        for _ in text:
            results.append(pool.get_result())

        return results
    else:
        return [split_text(item) for item in text]


if __name__ == "__main__":
    pool = ProcessPool()
    pool.start_workers()

    result = add_epub("../bookdata/Java_Script.epub", pool)  # Replace with your EPUB path

    pool.close()
    print(result)