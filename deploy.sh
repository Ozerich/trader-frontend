#!/bin/bash

cd /srv/trader-frontend

git pull origin main

sudo docker build -f ./Dockerfile -t trader-frontend .

sudo docker stop trader-frontend || true
sudo docker rm trader-frontend || true

sudo docker run --init -d --name trader-frontend -p 3006:80 --restart=always trader-frontend