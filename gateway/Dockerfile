FROM golang:1.17

RUN apt-get update && \
    apt-get install -y wait-for-it && \
    go install github.com/movio/bramble/cmd/bramble@v1.2.1

CMD ["bramble", "-conf", "/config.json"]

