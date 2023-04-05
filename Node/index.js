const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routers = require('./Server/Routers');

app.use(cors());
app.use(express.json());
app.set('json spaces', 2)
app.use('/', routers);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
