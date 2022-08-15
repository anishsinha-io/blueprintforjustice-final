FROM python:3.10-alpine
WORKDIR /usr/app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8888", "-w", "4", "wsgi:server"]