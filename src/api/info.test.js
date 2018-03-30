/**
 * @jest-environment node
 */

import fetchMock from 'fetch-mock'

import MockLocalStorage from '../utils/MockLocalStorage'
import info from './info'

global.localStorage = new MockLocalStorage()

describe('info api', () => {
  const token = 'token'
  const user = { username: 'username' }

  beforeEach(() => {
    localStorage.removeItem('token')
    fetchMock.reset()
    fetchMock.restore()
  })

  it('info success', async () => {
    localStorage.setItem('token', token)
    fetchMock.getOnce('http://localhost:3000/auth/info', { user })

    const response = await info()
    expect(response.user).toEqual(user)
  })

  it('info fail', async () => {
    const message = 'Token expired'
    fetchMock.getOnce('http://localhost:3000/auth/info', { status: 401 })

    const response = await info()
    expect(response.message).toEqual(message)
  })
})