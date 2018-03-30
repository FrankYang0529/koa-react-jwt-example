/**
 * @jest-environment node
 */

import 'jsdom-global/register';
import React from 'react'
import { shallow, mount } from 'enzyme'

import { onLoginRequest, onRegisterRequest } from '../actions/auth'
import { LoginPage, mapDispatchToProps } from './LoginPage'

describe('<LoginPage />', () => {
  let renderedComponent
  beforeEach(() => {
    renderedComponent = shallow(
      <LoginPage onLoginRequestAction={jest.fn()} />
    )
  })

  it('should render username input', () => {
    expect(renderedComponent.find('#username').length).toBe(1)
  })

  it('should render password input', () => {
    expect(renderedComponent.find('#password').length).toBe(1)
  })

  it('should render a login button', () => {
    const loginButton = renderedComponent.find('button').at(0)
    expect(loginButton.text()).toEqual('Login')
  })

  it('should render a register button', () => {
    const loginButton = renderedComponent.find('button').at(1)
    expect(loginButton.text()).toEqual('Register')
  })

  describe('mapDispatchToProps', () => {
    describe('onLoginRequestAction', () => {
      it('should be defined', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onLoginRequestAction).toBeDefined()
      })

      it('should dispatch onLoginRequest when called', () => {
        const username = 'username'
        const password = 'password'
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onLoginRequestAction(username, password)
        expect(dispatch).toHaveBeenCalledWith(onLoginRequest(username, password))
      })
    })

    describe('onRegisterRequestAction', () => {
      it('should be defined', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onRegisterRequestAction).toBeDefined()
      })

      it('should dispatch onRegisterRequest when called', () => {
        const username = 'username'
        const password = 'password'
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        result.onRegisterRequestAction(username, password)
        expect(dispatch).toHaveBeenCalledWith(onRegisterRequest(username, password))
      })
    })
  })

  describe('simulates events', () => {
    it('simulate submit login event', () => {
      const onLoginRequestAction = jest.fn()
      const preventDefault = jest.fn()
      renderedComponent = mount(
        <LoginPage onLoginRequestAction={onLoginRequestAction} />
      )

      renderedComponent.find('button').at(0).simulate('click', { preventDefault })
      expect(onLoginRequestAction).toHaveBeenCalled()
      expect(preventDefault).toHaveBeenCalled()
    })

    it('simulate submit register event', () => {
      const onRegisterRequestAction = jest.fn()
      const preventDefault = jest.fn()
      renderedComponent = mount(
        <LoginPage onRegisterRequestAction={onRegisterRequestAction} />
      )

      renderedComponent.find('button').at(1).simulate('click', { preventDefault })
      expect(onRegisterRequestAction).toHaveBeenCalled()
      expect(preventDefault).toHaveBeenCalled()
    })
  })
})