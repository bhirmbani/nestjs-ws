### What
- Nest JS
- Websocket
- VueJS client
- RabbitMQ

### How to start
1. Clone the repository
2. Make sure docker running on your computer
3. run `docker compose up -d`
4. go to `http://localhost:3000/`
5. websocket should running on network tab on browser devtools
6. Make sure rabbitMQ server have run on localhost at port `localhost:5672`
7. create HTTP POST request to `http://localhost:3000/send-notification` to create new queue to rabbit MQ server
