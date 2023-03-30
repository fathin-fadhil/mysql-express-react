import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from "http-errors";
import dotenv from 'dotenv';

// module import
import db  from "./config/database.js";
import Users  from "./models/UsersModel.js";

// router import
import authRouter from "./routes/authRouter.js";
import apiRouter from "./routes/apiRouter.js"


var app = express();
dotenv.config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), './public')));


// database connection
try {
  await db.authenticate()
  console.log('db connected successfully')
  await Users.sync()
  console.log('users model synced')
} catch (error) {
  console.error(error)
}

// routing
app.use('/', authRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

export default app
