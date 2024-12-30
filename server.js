const express = require('express');
const app = express();
const port = 3000;

app.get('/name', (req, res) => {
    res.send('Hello World! I am Raju Rao');
    }
);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
    