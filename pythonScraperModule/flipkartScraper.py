import urllib2
from BeautifulSoup import BeautifulSoup
import re
import sys
# i =0

url = "https://www.flipkart.com/search?q=" + urllib2.quote(sys.argv[1])
flipkartText = urllib2.urlopen(url).read()
soup = BeautifulSoup(flipkartText)


payload = {
    'product_name': [],
    'product_price': [],
    'product_url': []
}

product_name = soup.findAll('div', attrs={'class': '_3wU53n'})
product_price = soup.findAll('div', attrs={'class': '_1vC4OE _2rQ-NK'})
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



while(i < len(payload['product_name'])):
    ppname = ''
    pprice = ''
    plink = ''

    for name in range(0, i):
        ppname = payload['product_name'][name]
    for price in range(0, i):
        pprice = payload['product_price'][name]
    for link in range(0, i):
        plink = payload['product_url'][name]

    sys.stdout.write(str(ppname) + ' && ' + str(pprice) +' && ' + 'https://flipkart.com' + str(plink) + '\n')
    i = i + 1

sys.stdout.flush()
