import requests
from datetime import datetime, timedelta

API_URL = "https://api.exchangerate-api.com/v4/latest/"
API_KEY = "23b640ccd2c4c547821c325d6f7c3e1f"

def get_exchange_history(from_currency, to_currency):
    today = datetime.today().strftime("%Y-%m-%d")
    start_date = (datetime.today() - timedelta(days=30)).strftime("%Y-%m-%d")

    url = f"https://api.exchangerate.host/timeframe?currencies={from_currency},{to_currency}&start_date={start_date}&end_date={today}&access_key={API_KEY}"
    
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    quotes = data.get("quotes", {})
    dates = sorted(quotes.keys())
    rates = [quotes[date].get(f"{from_currency}{to_currency}", None) for date in dates]

    return {"dates": dates, "rates": rates}

def get_valid_currencies():
    response = requests.get(API_URL + "USD")
    if response.status_code == 200:
        return list(response.json()["rates"].keys())
    return ["USD", "EUR", "GBP", "JPY", "CAD"]

def get_exchange_rate(from_currency, to_currency):
    response = requests.get(f"{API_URL}{from_currency}")
    if response.status_code == 200:
        data = response.json()
        return data['rates'].get(to_currency, None)
    return None
