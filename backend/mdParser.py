import mistletoe
from bs4 import BeautifulSoup

def fetchKeyConcepts(filename):
    with open(filename,'r') as fin:
        rendered = mistletoe.markdown(fin)
        
        soup = BeautifulSoup(rendered, 'html.parser')

        h1_tags = soup.find_all('h1')

        result = []
        for h1 in h1_tags:
            result.append(h1.text.split(": ")[1])
        return result

def mdToHtml(filename):
    with open(filename, 'r') as fin:
        rendered = mistletoe.markdown(fin)
        soup = BeautifulSoup(rendered, 'html.parser')
        with open (f"{filename}.html", 'w') as file:
            file.write(soup.prettify())

