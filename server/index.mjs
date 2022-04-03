import { server as WebsocketServer } from "websocket";
import http from 'http';
import {v4 as uuid} from 'uuid';

const httpServer = http.createServer();
httpServer.listen(8000);
const wsServer = new WebsocketServer({
  httpServer,
});

const clients = {};

const sendMessage = message => {
  Object.keys(clients).forEach(uid => {
    clients[uid].sendUTF(message);
  });
};

wsServer.on("request", request => {
  const uid = uuid();
  const connection = request.accept(null, request.origin);
  clients[uid] = connection;
  console.log(`User ${uid} connected`);
  
  connection.on("message", message => {
    console.log(`Message from ${uid}: "${message.utf8Data}"`);
    sendMessage(message.utf8Data);
  });

  connection.on("close", () => {
    delete clients[uid];
    console.log(`User ${uid} disconnected`);
  });
});