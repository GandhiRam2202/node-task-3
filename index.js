import express from 'express';
import ConnectDB from './DBConnect/DBConnect.js';
import router from './Router/Router.js';
import dotenv from 'dotenv'

dotenv.config();
const app = express();
ConnectDB();
app.use(express.json());

app.use('/api',router);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
