const https = require('https');

const productsMock = require('./products-mock.ts').productsMock;

const AWS_URL = 'https://p9ab3z37w7.execute-api.eu-west-1.amazonaws.com';
const PATH = '/dev/products';

const postProductToDB = (product) => {
  const req = https.request(AWS_URL + PATH, { method: 'POST' }, (msg) => {
    let response;

    msg.on('data', dataChunk => response = dataChunk);
    msg.on('end', () => console.log(response.toString()));
  });

  req.write(JSON.stringify(product));

  req.on('error', (error) => console.log(error));
  req.end();
};

productsMock.forEach(product => postProductToDB(product));
