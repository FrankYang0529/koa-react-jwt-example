/**
 * @jest-environment node
 */

import fetchMock from 'fetch-mock'

import register from './register'

describe('register api', () => {
  const username = 'username'
  const password = 'password'

  beforeEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('register success', async () => {
    fetchMock.postOnce('http://localhost:3000/auth/register', {})

    const response = await register({ username, password })
    expect(response).toEqual({})
  })

  it('missing username or password', async () => {
    const response = await register({})
    expect(response.message).toEqual('Missing username or password')
  })

  it('register fail', async () => {
    const message = 'Duplicate username'
    fetchMock.postOnce('http://localhost:3000/auth/register', { status: 401, body: { message } })

    const response = await register({ username, password })
    expect(response.message).toEqual(message)
  })
})