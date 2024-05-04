import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('title and author are displayed but not url and likes', () => {
  const blog = {
    title: 'Test blog 1',
    author: 'Dayron Furcain',
    url: 'http://test_blog_1.com',
    likes: 20
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.togglableContent')
  const element = screen.getByText('Test blog 1 Dayron Furcain')

  expect(element).toBeDefined()
  expect(div).toHaveStyle('display: none')
})

test('url and likes are displayed after to do click on "view"', async () => {
  const blog = {
    title: 'Test blog 1',
    author: 'Dayron Furcain',
    url: 'http://test_blog_1.com',
    likes: 20
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const div = container.querySelector('.togglableContent')

  expect(div).not.toHaveStyle('display: none')
})

test('two times click on "likes" call handler ', async () => {
  const blog = {
    title: 'Test blog 1',
    author: 'Dayron Furcain',
    url: 'http://test_blog_1.com',
    likes: 20
  }
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} update={mockHandler} />)

  const user = userEvent.setup()

  const buttonView = screen.getByText('view')
  await user.click(buttonView)

  const buttonLikes = container.querySelector('.button-likes')

  await user.click(buttonLikes)
  await user.click(buttonLikes)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
