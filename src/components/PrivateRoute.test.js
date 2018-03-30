/**
 * @jest-environment node
 */

import 'jsdom-global/register';
import React from 'react'
import { StaticRouter, Redirect } from 'react-router';
import { mount } from 'enzyme'

import { HomePage } from './HomePage'
import PrivateRoute from './PrivateRoute'

jest.mock('./HomePage', () => ({
  'HomePage': () => 'HomePage'
}))

describe('<PrivateRoute />', () => {
  it('should redirect', () => {
    const renderedComponent = mount(
      <StaticRouter location={'/'} context={{}}>
        <PrivateRoute component={HomePage} loggedIn={false} />
      </StaticRouter>
    )

    expect(renderedComponent.find(HomePage)).toHaveLength(0)
    expect(renderedComponent.find(Redirect)).toHaveLength(1)
  })

  it('should show home page', () => {
    const renderedComponent = mount(
      <StaticRouter location={'/'} context={{}}>
        <PrivateRoute component={HomePage} loggedIn={true} />
      </StaticRouter>
    )

    expect(renderedComponent.find(HomePage)).toHaveLength(1)
    expect(renderedComponent.find(Redirect)).toHaveLength(0)
  })
})