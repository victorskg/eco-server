import express, { response } from 'express';

const app = express();

app.get('/users', (request, response) => {
    response.json([
        {
            name: 'João Victor'
        },
        {
            name: 'Cléria Freitas'
        }
    ]);
});

app.listen(3333);
