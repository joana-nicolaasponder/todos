//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'

import { renderApp } from '../test/setup'

import { waitFor } from '@testing-library/react'

const mockTodos = [
  {
    id: 1,
    taskDetails: 'Cook dinner',
    priority: 'Low',
    completed: false,
  },
]

describe('Todos page renders', () => {
  it('should render', async () => {
    const { user, ...screen } = renderApp()

    const todos = screen.getByRole('textbox', { name: 'new-task-details' })

    expect(todos).toBeInTheDocument()
  })
  it('should show existing todos', async () => {
    const scope = nock('http://localhost/')
      .get('/api/v1/todos')
      .reply(200, mockTodos)
    const screen = renderApp()
    const todo = await screen.findByText('Cook dinner')
    expect(todo).toBeVisible()
    expect(scope.isDone()).toBeTruthy()
  })
  it('should add a new todo', async () => {
    const initialScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, mockTodos)

    const addScope = nock('http://localhost')
      .post('/api/v1/todos', { newTask: { taskDetails: 'New todo' } })

      .reply(200, [
        { id: 31, taskDetails: 'Banana', priority: 'Low', completed: false },
      ])

    const { user, ...screen } = renderApp()
    const todos = screen.getByRole('textbox', { name: 'new-task-details' })
    await user.type(todos, 'New todo')
    await user.keyboard('{Enter}')
    const loadingScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [
        ...mockTodos,
        { id: 31, taskDetails: 'New todo', priority: 'Low', completed: false },
      ])

    expect(addScope.isDone()).toBeTruthy()
    const newTodo = await screen.findByText('New todo')

    expect(newTodo).toBeVisible()
    expect(loadingScope.isDone()).toBeTruthy()
  })

  it('should check off a todo', async () => {
    const initialScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, mockTodos)

    const { user, ...screen } = renderApp()

    const checkedoffScope = nock('http://localhost')
      .patch('/api/v1/todos', { id: 1 })
      .reply(200, [
        { id: 1, taskDetails: 'Cook dinner', priority: 'Low', completed: true },
      ])

    const afterScope = nock('http://localhost')
      .get('/api/v1/todos')
      .reply(200, [
        { id: 1, taskDetails: 'Cook dinner', priority: 'Low', completed: true },
      ])

    const checkbox = await screen.findByRole('checkbox')

    await user.click(checkbox)
    await waitFor(() => {
      expect(checkbox).toBeChecked()
    })

    expect(checkedoffScope.isDone()).toBeTruthy()
    expect(afterScope.isDone()).toBeTruthy()
  })
})
