# Home Recorder
---
The purpose of this app is to expose an endpoint to record home events

## How to setup

  1. Run `docker build -t lucky13/home-recorder`
  1. Next run, `docker run -p 49160:8080 -d lucky13/home-recorder`

## How to destroy

  1. First get the container ID, `docker ps`
  1. Then run, `docker stop <container ID>`

