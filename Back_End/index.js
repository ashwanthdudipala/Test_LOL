/* External Libs */
import dotenv from 'dotenv';

/* Load environment variables (local dev only) */
dotenv.config();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://your-frontend.onrender.com"],
  credentials: true
}));
app.use(express.json());

/* Controllers */
import login from './controllers/login.js';
import { getHomePage, postHomePage } from './controllers/homePage.js';
import auth from './Auth/auth.js';
import register from './controllers/register.js';
import {
  deleteHealthCondition,
  getHealthConditions,
  postHealthConditions
} from './controllers/healthConditions.js';
import {
  getMedications,
  postMedications,
  deleteMedication
} from './controllers/medications.js';
import supabase from './DataBase/supabase.js';

/* JWT Secret (from environment) */
export const secret_key = process.env.JWT_SECRET;

if (!secret_key) {
  console.error("❌ JWT_SECRET is not defined. Please set it in your .env or Render environment variables.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing. Please set it in .env or Render environment variables.");
  process.exit(1);
}

/* Example secured route using Supabase */
const getDetails = async (req,res)=>{
  try {
    const data = await supabase.from('details').select('*').eq('email',req.user.email);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json({success:false});
  }
}

/* Routes */
app.get('/api/home', auth, getHomePage)
   .post('/api/home', auth, postHomePage);

app.post('/api/login', login);
app.post('/api/register', register);

app.get('/api/healthconditions', auth, getHealthConditions)
   .post('/api/healthconditions', auth, postHealthConditions)
   .delete('/api/healthconditions', auth, deleteHealthCondition);

app.get('/api/medications', auth, getMedications)
   .post('/api/medications', auth, postMedications)
   .delete('/api/medications', auth, deleteMedication);

app.get('/api/details', auth, getDetails);

/* Health Check (for Render) */
app.get('/health', (req, res) => res.send('OK'));

/* Start Server */
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`✅ Backend listening on port ${port}`);
});
