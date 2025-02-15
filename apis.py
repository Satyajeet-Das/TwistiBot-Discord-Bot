from fastapi import FastAPI
from bs4 import BeautifulSoup
import requests
# import uvicorn

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/scrape/{url}")
def scrape(url: str):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    return {"title": soup.title.string}




