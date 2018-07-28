import EventEmitter from 'events';
import Message from './Message.js';

const READY_STATE_OPEN = 1;

export default class Client extends EventEmitter {
  constructor() {
    super();
    this.participants = [];
    this.userName = null;
  }
  connect(host, port) {
    return new Promise((resolve, reject) => {
      this.socket = new WebSocket(`ws://${host}:${port}`);
      // map key to function
      const filte = new Map();
      filte.open = () => { resolve() };
      filte.error = (e) => {
        if (e.target.readyState > READY_STATE_OPEN) {
          reject(); 
        }
      }
      filte.message = (e) => {
        const msg = Message.fromString(e.data);
        const method = `on${msg.event}`;
        if (!this[method]) {
          return; 
        }
        this[method](msg.data);
      }
      Reflect.ownKeys(filte).forEach(key => {
        this.socket.addEventListener(key, filte[key]);
      });
    });
  }

  onparticipants(data) {
    this.emit('participants', data);
  } 

  ontext(data) {
    this.emit('text', data);
  }

  getParticipants() {
    return this.participants;
  }

  join(userName) {
    this.userName = userName;
    this.send('join', userName);
  }

  message(text) {
    this.send('text', {
      userName: this.userName,
      text,
      dateTime: Date.now()
    });
  }

  send(event, data) {
    this.socket.send(Message.toString(event, data));
  }
}
