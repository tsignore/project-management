import dash
import dash_bootstrap_components as dbc
import requests
import pandas as pd
from dash import dcc, html, Input, Output

# URL бэкенда Django
API_URL = "http://127.0.0.1:8000/api/clients"

# Функция для получения данных с бэкенда
def fetch_clients():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Ошибка запроса: {e}")
        return []

# Создание Dash-приложения
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Макет приложения
app.layout = dbc.Container([
    html.H1("Список клиентов", className="text-center mt-4"),
    
    dcc.Input(id="search-box", type="text", placeholder="Поиск по имени...",
              className="form-control mb-3"),

    dbc.Table(
        id="clients-table",
        bordered=True,
        striped=True,
        hover=True,
        className="table"
    )
])

# Обновление таблицы клиентов на основе поиска
@app.callback(
    Output("clients-table", "children"),
    Input("search-box", "value")
)
def update_table(search_value):
    clients = fetch_clients()
    
    if not clients:
        return html.P("Не удалось загрузить данные с сервера.", className="text-center")

    if search_value:
        clients = [c for c in clients if search_value.lower() in c['name'].lower()]

    table_header = [
        html.Thead(html.Tr([html.Th("ID"), html.Th("Имя"), html.Th("Email"), html.Th("Телефон")]))
    ]
    table_body = [
        html.Tbody([html.Tr([html.Td(c["id"]), html.Td(c["name"]), html.Td(c["email"]), html.Td(c["phone"])]) for c in clients])
    ]

    return table_header + table_body

# Запуск сервера
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8050)
