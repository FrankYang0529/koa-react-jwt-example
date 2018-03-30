/**
 * @jest-environment node
 */

import 'jsdom-global/register';
import React from 'react'
import { shallow, mount } from 'enzyme'

import { onLogout } from '../actions/auth'
import { HomePage, mapDispatchToProps } from './HomePage'

describe('<HomePage />', () => {
  let user = { username: 'username' }
  let renderedComponent
  beforeEach(() => {
    renderedComponent = shallow(
      <HomePage user={user} onLogoutAction={jest.fn()} />
    )
  })

  it('should render a paragraph', () => {
    expect(renderedComponent.find('p').length).toBe(1)
    expect(renderedComponent.find('p').first().text()).toBe(
      `Hello ${user.username}, welcome to the web 😀`
    )
  })

  it('should render a button', () => {
    expect(renderedComponent.find('button').length).toBe(1)
  })

  describe('mapDispatchToProps', () => {
    describe('onLogoutAction', () => {
      it('should be defined', () => {
        const dispatch = jest.fn()
        const result = mapDispatchToProps(dispatch)
        expect(result.onLogoutAction).toBeDefined()
      })

      it('should dispatch onLogout when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onLogoutAction();
        expect(dispatch).toHaveBeenCalledWith(onLogout());
      })
    })
  })

  describe('simulates events', () => {
    it('simulates submit event', () => {
      const onLogoutAction = jest.fn()
      const preventDefault = jest.fn()
      renderedComponent = mount(
        <HomePage user={user} onLogoutAction={onLogoutAction} />
      )

      renderedComponent.find('button').simulate('click', { preventDefault })
      expect(onLogoutAction).toHaveBeenCalled()
      expect(preventDefault).toHaveBeenCalled()
    })
  })
})