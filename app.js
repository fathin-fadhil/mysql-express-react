import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from "http-errors";
import dotenv from 'dotenv';
import compression from 'compression';

// module import
import db  from "./config/database.js";
import Users  from "./models/UsersModel.js";
import Books from './models/BooksModel.js';
import BorrowerList from './models/BorrowerListModel.js';

// router import
import authRouter from "./routes/authRouter.js";
import apiRouter from "./routes/apiRouter.js"


var app = express();
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(compression())
app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));


// database connection
try {
  await db.authenticate()
  console.log('db connected successfully')
  await Users.sync()
  console.log('users model synced')
  await Books.sync()
  console.log('books model synced')
  await BorrowerList.sync()
  console.log('borrowerlist synced')
} catch (error) {
  console.error(error)
}

// routing
app.use('/', authRouter)
app.use('/api', apiRouter)
app.get('*', (req, res) => {
  res.sendFile('index.html', {root : path.join(__dirname, './public')})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

export default app

// test