/**
 * @jest-environment node
 */

import 'jsdom-global/register';
import React from 'react'
import { MemoryRouter } from 'react-router';
import { shallow, mount } from 'enzyme'

import { App } from './App'
import HomePage from './HomePage'
import LoginPage from './LoginPage'

describe('<App />', () => {
  it('should render title', () => {
    const loggedIn = false
    const alert = {}
    const renderedComponent = shallow(
      <App loggedIn={loggedIn} alert={alert}/>
    )

    expect(renderedComponent.find('h1').length).toBe(1)
    expect(renderedComponent.find('h1').first().text()).toBe('Koa-React-JWT Example')
  })

  // it('should render <HomePage />', () => {
  //   const loggedIn = true
  //   const alert = {}
  //   const renderedComponent = shallow(
  //     <App loggedIn={loggedIn} alert={alert} onInfoRequestAction={jest.fn()} />
  //   )

  //   expect(renderedComponent.find(HomePage).length).toBe(1)
  //   expect(renderedComponent.find(LoginPage).length).toBe(0)
  // })

  // it('should render <LoginPage />', () => {
  //   const loggedIn = false
  //   const alert = {}
  //   // const renderedComponent = shallow(
  //   //   <App loggedIn={loggedIn} alert={alert} />
  //   // )

  //   const wrapper = mount(
  //     <MemoryRouter initialEntries={['/login']} initialIndex={0}>
  //       <App loggedIn={loggedIn} alert={alert} onInfoRequestAction={jest.fn()} />
  //     </MemoryRouter>
  //   )
  //   console.log(wrapper.html())

  //   // expect(renderedComponent.find(LoginPage).length).toBe(1)
  //   // expect(renderedComponent.find(HomePage).length).toBe(0)

  //   // expect(wrapper.find(LoginPage).length).toBe(1)
  //   // expect(wrapper.find(LoginPage)).toHaveLength(1)
  //   // expect(wrapper.find(HomePage).length).toBe(0)
  // })
})