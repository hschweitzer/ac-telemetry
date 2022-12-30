import { RTCarInfo } from "../types/RTCarInfo";
import { handshakerResponse } from '../types/handshakerResponse';

import express from 'express';
const app = express();

import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../interfaces/SocketInterfaces';
const ACRemoteTelemetryClient = require('ac-remote-telemetry-client');

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>
    (server, {
        cors: {
            origin: ['http://localhost:8080']
        }
    });

io.on('connection', socket => {
    const client = new ACRemoteTelemetryClient();

    client.on('HANDSHAKER_RESPONSE', (data: handshakerResponse) => {
        console.log(data.carName);
        console.log(data.driverName);
        console.log(data.trackName);
    });

    client.on('RT_CAR_INFO', (data: RTCarInfo) => {
        socket.emit("rtCarInfo", data);
    });

    // client.on('RT_LAP', (data: RTLap) => {
    //     console.log(data);
    // });

    // Start listening
    client.start();

    // Send initial handshake
    client.handshake();

    // Subscribe to desired updates
    client.subscribeUpdate();
    client.subscribeSpot();

    // Stop listening
    // client.stop();
});

server.listen(3000, () => {
    console.log('listening on localhost:3000');
});