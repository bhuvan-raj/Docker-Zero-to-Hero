FROM python:3.9-slim

WORKDIR /app

COPY . .

RUN pip install flask

# Create necessary directories
RUN mkdir -p /app/templates
RUN mkdir -p /app/static

EXPOSE 5000

CMD ["python", "app.py"]
