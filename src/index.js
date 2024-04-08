import app from './app.js';

const hostname = '127.0.0.1';
const port = 3000;

console.log('Starting server...');

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
