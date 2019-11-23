import io from 'socket.io-client';

const socket = io('http://3.0.178.112:3000');

// Emitters

export const testEmitter = () => {
    socket.emit('test_emit', 'this is a test emitter from frontend');
}

export default socket