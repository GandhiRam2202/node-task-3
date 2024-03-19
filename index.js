import express from 'express';
import ConnectDB from './DBConnect/DBConnect.js';
import cors from 'cors'
import router from './Router/Router.js';
import dotenv from 'dotenv'

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
ConnectDB();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).json({"message": 'Welcome to the Nodejs file system'});
})


app.use('/api',router);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
