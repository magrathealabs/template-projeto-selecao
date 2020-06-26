import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import IndexPage from './index'

it('should render index', () => {
  const { getByText } = render(<IndexPage />)
  const textElement = getByText(/hello world!/i)
  expect(textElement).toBeInTheDocument()
})
