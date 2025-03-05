# Currency Converter Web App

video: https://youtu.be/kCEGlvTdWTM 

This project is a **Flask-based web application** that allows users to convert currencies using real-time exchange rates. It provides a simple and intuitive interface for users to input an amount, select source and destination currencies, and receive an instant conversion result. Additionally, the app includes an endpoint for retrieving historical exchange rates between selected currencies.

The project is designed with a **modular structure**, ensuring that components are reusable, maintainable, and easily extendable. Flask is used as the web framework due to its lightweight nature and simplicity, making it an excellent choice for this type of application.

## Features
- **Real-time Currency Conversion**: Fetches live exchange rates and performs currency conversions.
- **Historical Exchange Rates**: Retrieves historical exchange rate data for selected currencies.
- **Dynamic Currency Selection**: Displays available currencies dynamically for selection.
- **RESTful API Endpoints**: Supports JSON-based API calls for automated currency conversion.
- **Error Handling and Validation**: Ensures correct inputs and handles potential errors gracefully.

## Project Structure
The project consists of multiple files, each serving a distinct role in the functionality and operation of the application.

### `app.py`
This is the **main entry point** of the Flask application. It defines the primary routes and handles requests for currency conversion and historical exchange rates. The key functionalities include:
- Rendering the HTML template (`index.html`) for the user interface.
- Handling **POST** requests for currency conversion and returning JSON responses.
- Fetching valid currencies for the dropdown menu in the UI.
- Providing a `/history` endpoint to retrieve historical exchange rate data.

### `converter.py`
This module contains the core logic for interacting with currency exchange data. It includes three primary functions:
1. `get_exchange_rate(from_currency, to_currency)`: Retrieves the current exchange rate between two currencies.
2. `get_valid_currencies()`: Returns a list of available currencies that the app supports.
3. `get_exchange_history(from_currency, to_currency)`: Fetches historical exchange rate data for the given currency pair.

### `templates/index.html`
The **front-end** of the application, designed using HTML and basic CSS. It presents a simple user interface where users can:
- Input an amount.
- Select source and target currencies from dynamically populated dropdown menus.
- View the converted amount instantly upon submitting the form.

### `static/styles.css`
This file contains CSS styles for the application, ensuring that the UI is visually appealing and responsive.

### `requirements.txt`
Lists all the Python dependencies required to run the application. Installing dependencies using `pip install -r requirements.txt` ensures that the app runs smoothly on any environment.

### `README.md`
This document, explaining the purpose, structure, and functionality of the project.


## Design Decisions
### Choice of Flask
We selected **Flask** because of its lightweight nature and ease of integration with APIs. Since this project primarily focuses on making API calls and rendering a simple UI, Flask provides just the right level of flexibility without unnecessary complexity.

### Separation of Concerns
We structured the project with **modularity in mind**, separating the core logic (`converter.py`) from the main application (`app.py`). This makes the application more maintainable and scalable.

### JSON-Based API Endpoints
The `/history` and conversion endpoints return responses in JSON format, making the application useful for both web-based interactions and integration into external systems.

### Error Handling
- We validate user inputs to ensure that incorrect data doesn't crash the application.
- If the exchange rate retrieval fails, the user receives a clear error message instead of an ambiguous failure.
- We catch exceptions when processing JSON requests to prevent application breakdowns.

---

## How to Run the Application
### Prerequisites
- Python 3.8+
- `pip` (Python package manager)

### Installation

1. **Install Dependencies**:
   ```sh
   pip install -r requirements.txt
   ```

2. **Run the Flask Application**:
   ```sh
   python app.py
   ```

## Academic Integrity & AI Usage
For this final project, it is **reasonable to use AI-based tools** such as ChatGPT, GitHub Copilot, and Bing Chat. However, the essence of the work must remain **OUR own**. These tools were serve as amplifiers of productivity rather than substitutes for original effort.


## Future Enhancements
- **User Authentication**: Add login/logout functionality for personalized conversion history.
- **Multi-Language Support**: Allow users to select different languages for the UI.
- **Advanced Historical Data Analysis**: Implement graphs and trend analysis for exchange rates.
- **Integration with External APIs**: Support multiple sources for exchange rates to improve reliability.

![Screenshot 2025-03-04 at 8 32 00 PM](https://github.com/user-attachments/assets/a3c257bb-6849-4faf-a63c-f31d36792ec9)
