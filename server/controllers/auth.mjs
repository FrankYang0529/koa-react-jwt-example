import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

import User from '../models/user'

export const register = async (ctx, next) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.status = 400
    ctx.body = {
      message: "You must type in username and password."
    }
    return
  }

  try {
    const isExist = await User.count({ username: username })
    if (isExist >= 1) {
      ctx.status = 406
      ctx.body = {
        message: "User exists"
      }
      return
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = new User({ username, password: hashPassword })
    await user.save()

    ctx.status = 201
  } catch (error) {
    ctx.throw(500)
  }
}

export const login = async (ctx, next) => {
  const { username, password } = ctx.request.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      ctx.status = 400
      ctx.body = {
        message: 'Username or password error'
      }
      return
    }

    const isCompare = await bcrypt.compare(password, user.password)
    if (!isCompare) {
      ctx.status = 401
      ctx.body = {
        message: 'Username or password error'
      }
      return
    }

    ctx.status = 200
    ctx.body = {
      message: 'Login Success',
      user: user.toJSON(),
      token: jsonwebtoken.sign({
        user: user.toJSON(),
        exp: Math.floor(Date.now() / 1000) + (60)
      }, 'secret')
    }
  } catch (error) {
    ctx.throw(500)
  }
}

export const info = async (ctx) => {
  const { user } = ctx.state.user

  ctx.status = 200
  ctx.body = { user }
}