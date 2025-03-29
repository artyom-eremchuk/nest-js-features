import * as io from 'socket.io-client';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getValidUsername(callback: (username: string) => void) {
  rl.question('Please enter your username: ', (username) => {
    if (username.trim() === '') {
      console.log('Username cannot be empty. Please try again.');
      getValidUsername(callback);
    } else {
      callback(username);
    }
  });
}

function initializeWebSocket(username: string) {
  const socket = io.connect(
    `http://localhost:3000/?username=${encodeURIComponent(username)}`,
  );

  socket.on('connect', () => {
    console.log(`Welcome, ${username}! You are connected.`);
  });

  socket.on('message', (data) => {
    console.log(`${data.clientId}: ${data.message}`);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
  });

  rl.on('line', (input) => {
    if (input === '/exit') {
      process.exit();
    }

    const message = input.trim();
    if (message) {
      socket.emit('message', htmlEscape(message));
    }
  });
}

function htmlEscape(input: string): string {
  return input.replace(/</g, '<').replace(/>/g, '>');
}

getValidUsername(initializeWebSocket);
