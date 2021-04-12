FROM python:3
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
RUN chmod +x ./docker_entrypoint.sh
ENTRYPOINT ["./docker_entrypoint.sh"]
