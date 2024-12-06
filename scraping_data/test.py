from bs4 import BeautifulSoup
import requests

html_text = requests.get('https://www.khmer24.com/c-cars-for-sale?keyword=&ad_field=toyota')
print(html_text)
# soup = BeautifulSoup(html_text, 'lxml')

# jobs = soup.find_all('div', class_='flex_all_post lists_post_content')