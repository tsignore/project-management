# Используем официальный образ Python как базовый
FROM python:3.10-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы проекта в контейнер
COPY . /app

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Открываем порт 8050 для Dash
EXPOSE 8050

# Команда для запуска приложения
CMD ["python", "app.py"]
