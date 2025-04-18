import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'


const app: express.Application = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
  });
});

import userRouter from './routes/user.route.js'
import filesRouter from './routes/files.route.js'
import directoriesRouter from './routes/directories.js'

app.use('/api/v1/user',userRouter)
app.use('/api/v1/files',filesRouter)
app.use('/api/v1/dir',directoriesRouter)
export {app}