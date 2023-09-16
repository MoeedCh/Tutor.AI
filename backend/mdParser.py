import mistletoe
from bs4 import BeautifulSoup

with open('test.md','r') as fin:
    rendered = mistletoe.markdown(fin)
    
    soup = BeautifulSoup(rendered, 'html.parser')

    h1_tags = soup.find_all('h1')

    print(h1_tags)

