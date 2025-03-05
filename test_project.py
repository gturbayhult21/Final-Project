import pytest
import json
from project import app, format_value, convert, get_exchange_history

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_main(client):
    response = client.get("/")
    assert response.status_code == 200

def test_convert(client):
    data = {
        "amount": 100,
        "from_currency": "USD",
        "to_currency": "EUR"
    }
    response = client.post("/", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 200
    assert "result" in response.get_json()

def test_get_exchange_history(client):
    response = client.get("/history?from=USD&to=EUR")
    assert response.status_code == 200
    assert "dates" in response.get_json()
    assert "rates" in response.get_json()

def test_format_value():
    assert format_value(1234.56) == "1,234.56"
    assert format_value(9876543.21) == "9,876,543.21"
