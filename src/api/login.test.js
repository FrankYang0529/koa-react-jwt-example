/**
 * @jest-environment node
 */

import fetchMock from 'fetch-mock'

import login from './login'

describe('login api', () => {
  const username = 'username'
  const password = 'password'
  const token = 'token'
  const user = { username }

  beforeEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('login success', async () => {
    fetchMock.postOnce('http://localhost:3000/auth/login', { user, token })

    const response = await login({ username, password })
    expect(response.user).toEqual(user)
    expect(response.token).toEqual(token)
  })

  it('missing username or password', async () => {
    const response = await login({})
    expect(response.message).toEqual('Missing username or password')
  })

  it('login fail', async () => {
    const message = 'Username or Password error'
    fetchMock.postOnce('http://localhost:3000/auth/login', { status: 401, body: { message } })

    const response = await login({ username, password })
    expect(response.message).toEqual(message)
  })
})