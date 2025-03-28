# Базовый образ для Python
FROM python:3.10-slim

# Установка рабочей директории
WORKDIR /app

# Копирование файла с зависимостями
COPY requirements.txt .

# Установка зависимостей
RUN pip install --no-cache-dir -r requirements.txt

# Копирование всех файлов проекта в контейнер
COPY . .

# Прокси для запуска Django на порту 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
