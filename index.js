import express from 'express';
import { scan, getNodeID } from './scan.js';
import Graph from './graph.js';

const app = express();
const IP_GRAPH = new Graph();
const NODE = Math.floor(Math.random() * 1000);
const PORT = 1412;

app.get('/', (req, res) => {
    res.sendStatus('200');
});

app.get('/graph', (req, res) => {
    res.send(IP_GRAPH.adjacencyList);
});

app.get('/id', (req, res) => {
    res.send(NODE.toString());
});

app.get('/scan', (req, res) => {
    const IP_TABLES = [];
    const NODE_TABLES = new Map();
    scan(PORT).then(async (data) => {
        for (const ip of data) {
            const id = await getNodeID(ip, PORT);
            IP_TABLES.push({ id, ip });
        }
        IP_TABLES.forEach((entry) => {
            const id = entry.id;
            const ip = entry.ip;
            if (!NODE_TABLES.has(id)) {
                NODE_TABLES.set(id, []);
            }
            NODE_TABLES.get(id).push(ip);
        });
        const jsonResult = Object.fromEntries(NODE_TABLES);
        [...NODE_TABLES.keys()].forEach((key) => {
            IP_GRAPH.addVertex(key);
            IP_GRAPH.addEdge(NODE, key, Math.floor(Math.random() * 100));
        });
        console.log(IP_GRAPH.adjacencyList);
        res.send(jsonResult);
    });
});

app.listen(PORT, () => {
    console.log(`Node ${NODE} listening on port ${PORT}`);
});