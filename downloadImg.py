import shutil

import requests

url = "http://d2q9kw5vp0we94.cloudfront.net/Yarn_Color_Detail/24007.jpg"
response = requests.get(url, stream=True)
with open('24007.jpg', 'wb') as out_file:
    shutil.copyfileobj(response.raw, out_file)
del response