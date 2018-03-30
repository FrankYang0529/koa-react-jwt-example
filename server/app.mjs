import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import mongoose from 'mongoose'
import * as bluebird from 'bluebird'

import authRoute from './routes/auth'

// db
mongoose.promise = bluebird
mongoose.connect('mongodb://localhost/koa-react-jwt')

const app = new Koa()
app.use(bodyParser())
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}))
app.use(
  jwt({
    secret: 'secret'
  }).unless({
    path: [/\/register/, /\/login/]
  }))

app.use(authRoute.routes())

app.use(async (ctx, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(async (err, ctx) => {
  ctx.status = err.status || 500
  ctx.body = {
    message: err.message
  }
})

export default app