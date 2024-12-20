import Evilscan from 'evilscan';
import netmask from 'netmask';
import axios from 'axios';
import os from 'os';
const nm = netmask.Netmask;

export async function scan(PORT) {
    var ip = [];
    const promises = [];

    for (const [key, value] of Object.entries(os.networkInterfaces())) {
        for (const entry of value) {
            if (entry.family === 'IPv4' && !entry.internal) {
                const block = new nm(entry.cidr);
                promises.push(new Promise((resolve, reject) => {
                    new Evilscan({ target: block.base + '/' + block.bitmask, port: PORT, concurrency: 50000 }, (err, scan) => {
                        if (err) {
                            return reject(err);
                        }
                        scan.on('result', (data) => {
                            ip.push(data.ip);
                        });
                        scan.on('done', () => {
                            resolve();
                        });
                    }).run();
                }));
            }
        }
    }

    await Promise.all(promises);
    return ip;
}

export async function getNodeID(IP, PORT) {
    return new Promise((resolve, reject) => {
        axios.get(`http://${IP}:${PORT}/id`).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}