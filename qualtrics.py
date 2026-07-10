import os
import requests
from dotenv import load_dotenv

hub_id = "SV_3t9Kq6vkAF01nPo"

load_dotenv('./.env')


baseUrl = f"https://{os.environ['Q_DATA_CENTER']}.qualtrics.com/API/v3/surveys/{hub_id}"
headers = {
    "x-api-token": os.environ["Q_API_TOKEN"],
}

response = requests.get(baseUrl, headers=headers)
print(response.text)
