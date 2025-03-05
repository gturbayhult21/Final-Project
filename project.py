from flask import Flask, render_template, request, jsonify
from converter import get_exchange_rate, get_valid_currencies, get_exchange_history

app = Flask(__name__)

@app.route("/history")
def history():
    from_currency = request.args.get("from")
    to_currency = request.args.get("to")
    return jsonify(get_exchange_history(from_currency, to_currency))

def convert(amount, from_currency, to_currency):
    rate = get_exchange_rate(from_currency, to_currency)
    if rate:
        return format_value(amount * rate), rate
    return None, None

def get_currencies():
    return get_valid_currencies()

def format_value(value):
    return "{:,.2f}".format(value)

@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        data = request.get_json()
        amount = float(data["amount"])
        from_currency = data["from_currency"]
        to_currency = data["to_currency"]
        result, rate = convert(amount, from_currency, to_currency)
        if result is None:
            return jsonify({"error": "Conversion failed"}), 500
        return jsonify({
            "result": f"{amount} {from_currency} = {result} {to_currency}",
            "rate": f"1 {from_currency} = {rate} {to_currency}"
        })
    
    return render_template("index.html", currencies=get_currencies())

if __name__ == "__main__":
    app.run(debug=True)
