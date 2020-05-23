import urllib2
from bs4 import BeautifulSoup
import re
import sys


opener = urllib2.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
response = opener.open("https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias=aps&field-keywords=apple")

amazonText = response.read();
soup = BeautifulSoup(amazonText, 'html.parser')


payload = {
    'product_name': [],
    'product_price': [],
    'product_url': []
}


product_name = soup.findAll('h2', attrs={'class': 'a-size-medium s-inline s-access-title a-text-normal'})
product_price = soup.findAll('span', attrs={'class': 'a-size-base a-color-price s-price a-text-bold'})

for a in soup.findAll('a', href=True):
    if re.findall('pid', a['href']):
        product_url = a['href']
        payload['product_url'].append(product_url)


for div in product_name:
    links = div.findAll(text=True)
    for a in links:
        payload['product_name'].append(a)

for div in product_price:
    links = div.findAll(text=True)
    for a in links:
        payload['product_price'].append(a)


f = open('out.txt', 'w')
i = 1

while(i < len(payload['product_name'])):
    ppname = ''
    pprice = ''
    plink = ''

    for name in range(0, i):
        ppname = payload['product_name'][name]
    for price in range(0, i):
        pprice = payload['product_price'][name]
    # for link in range(0, i):
    #     plink = payload['product_url'][name]

    f.write(str(ppname) + ' && ' + pprice.encode('utf-8','ignore') +' && ' + str(plink) + '\n')
    i = i + 1


f.close()
# sys.stdout.flush()
