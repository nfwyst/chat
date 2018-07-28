import * as ws from 'nodejs-websocket';
import Message from './Message.js';
import 'babel-polyfill';

export default class Server {
  constructor() {
    this.participants = new Map();
    this.server = ws.createServer(con => {
      con.on('connection', () => {
        console.info('Server create a new connection');
      });
      con.on('text', text => {
        const msg = Message.fromString(text);
        const method = `on${msg.event}`;
        if (!this[method]) {
          return false; 
        }
        this[method](msg.data, con);
      });
      con.on('error', err => {
        console.error(`Server error: ${err.message}`);
      });
      con.on('close', (code, reason) => {
        console.log(`Server close a connection Code: ${code}, Reason: ${reason}`);
      });
    });
  }

  onjoin(name, con) {
    const time = new Date().toString();
    this.participants.set(con, {
      name,
      time
    });
    this.broadCast('participants', Array.from(this.participants.values()));
  }

  ontext(data, con) {
    const name = this.participants.get(con).name; 
    data.name = name;
    this.broadCast('text', data);
  }

  broadCast(event, data) {
    const text = Message.toString(event, data);
    this.server.connections.forEach(con => {
      con.sendText(text);
    });
  }

  async connect(host, port, client) {
    this.server.listen(port, host, async () => {
      console.info('Server is ready');
      try {
        await client.connect(host, port); 
      } catch (e) {
        console.error(`Client connect error: ${e.message}`);
      }
    });
  }
}
