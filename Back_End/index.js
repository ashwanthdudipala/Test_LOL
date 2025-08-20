/* External Libs*/
import express from 'express';
import cors from 'cors';
//middleware
const app = express();
app.use(cors());
app.use(express.json());
//Database
import supabase from './DataBase/supabase.js';
//Controllers
import login from './controllers/login.js';
import {getHomePage,postHomePage} from './controllers/homePage.js';
import auth from './Auth/auth.js';
import register from './controllers/register.js'

export const secret_key = "reallylongstring";

app.get('/api/home',auth,getHomePage).post('/api/home',auth,postHomePage);
app.post('/api/login',login);
app.post('/api/register',register);

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
