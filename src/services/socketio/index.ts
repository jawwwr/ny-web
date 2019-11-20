import io from 'socket.io-client';

const socket = io('http://0.0.0.0:3000');

// Emitters

export const testEmitter = () => {
    socket.emit('test_emit', 'this is a test emitter from frontend');
}

export default socket