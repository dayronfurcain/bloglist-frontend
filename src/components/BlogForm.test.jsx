import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm/> create a new blog calling create prop', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm create={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test de Blog')
  await user.type(authorInput, 'Dayron Furcain')
  await user.type(urlInput, 'http://test_de_blog.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].blog.title).toBe('Test de Blog')
  expect(createBlog.mock.calls[0][0].blog.author).toBe('Dayron Furcain')
  expect(createBlog.mock.calls[0][0].blog.url).toBe('http://test_de_blog.com')
})
