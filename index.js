import express from 'express';
import ConnectDB from './DBConnect/DBConnect.js';

import router from './Router/Router.js';
import dotenv from 'dotenv'

const app = express();

app.use(express.json());
dotenv.config();
ConnectDB();
const port = process.env.PORT;




app.use('/api',router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
