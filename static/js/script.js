document.addEventListener("DOMContentLoaded", function () {
    let chartInstance = null;
    const API_KEY = "23b640ccd2c4c547821c325d6f7c3e1f";
    function fetchPopularRates() {
        fetch("https://api.exchangerate.host/live?source=USD&currencies=EUR,GBP,COP&access_key="+ API_KEY)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("usd-eur-rate").textContent = data.quotes.USDEUR.toFixed(4);
                    document.getElementById("usd-gbp-rate").textContent = data.quotes.USDGBP.toFixed(4);
                    document.getElementById("usd-cop-rate").textContent = data.quotes.USDCOP.toFixed(2);
                } else {
                    console.error("Error on API:", data.error.info);
                    setRatesToUnavailable();
                }
            })
            .catch(error => {
                console.error("Error on API:", error);
                setRatesToUnavailable();
            });
    }

    function setRatesToUnavailable() {
        document.getElementById("usd-eur-rate").textContent = "Not available";
        document.getElementById("usd-gbp-rate").textContent = "Not available";
        document.getElementById("usd-cop-rate").textContent = "Not available";
    }

    fetchPopularRates();  // 🔹 Llamamos la función al cargar la página

    document.getElementById("currency-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let amount = document.getElementById("amount").value;
        let from_currency = document.getElementById("from_currency").value.toUpperCase();
        let to_currency = document.getElementById("to_currency").value.toUpperCase();
        let loadingIndicator = document.getElementById("loading");
        let resultBox = document.getElementById("result");
        let historySection = document.getElementById("history-section");

        loadingIndicator.style.display = "block";
        resultBox.style.display = "none";
        historySection.style.display = "none"; // 🔹 Ocultar historial antes de la conversión

        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: amount,
                from_currency: from_currency,
                to_currency: to_currency
            })
        })
        .then(response => response.json())
        .then(data => {
            loadingIndicator.style.display = "none";
            resultBox.style.display = "block";
            resultBox.innerHTML = `<strong>${data.result}</strong>`;

            fetch(`/history?from=${from_currency}&to=${to_currency}`)
                .then(response => response.json())
                .then(historyData => {
                    updateChart(historyData);
                    historySection.style.display = "block"; // 🔹 Mostrar el historial
                    setTimeout(() => historySection.style.opacity = "1", 100); // 🔹 Aplicar animación suave
                });
        })
        .catch(error => {
            console.error("Error in the conversion:", error);
            loadingIndicator.style.display = "none";
        });
    });

    function updateChart(historyData) {
        let ctx = document.getElementById("exchangeChart").getContext("2d");

        let labels = historyData.dates;
        let values = historyData.rates;

        if (chartInstance) {
            chartInstance.destroy();
        }

        let filteredLabels = labels.map((label, index) => {
            return index % 5 === 0 ? label : "";
        });

        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Exchange Rate",
                    data: values,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            callback: function (value, index) {
                                return index % 5 === 0 ? labels[index] : "";
                            }
                        }
                    }
                }
            }
        });
    }
});
