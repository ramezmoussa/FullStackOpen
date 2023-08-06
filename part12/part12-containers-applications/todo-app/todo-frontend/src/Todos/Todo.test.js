import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test('Test Single Todo', () => {
  const todo =
    {
      _id: 1,
      text: 'Test Single Todo',
      done: true
    }

    const onClickComplete = jest.fn()
    const onClickDelete = jest.fn()

  const component = render(
    <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
    )

  expect(component.container).toHaveTextContent(
    'Test Single To'
  )
})