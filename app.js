import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cat', (req, res) => {
  const cat = {
    cat_id: 1,
    name: 'Fluffy',
    birthdate: '2022-01-01',
    weight: 5.2,
    owner: 'John Doe',
    image: 'https://loremflickr.com/320/240/cat',
  };
  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server Running At http://${hostname}:${port}/`);
});
