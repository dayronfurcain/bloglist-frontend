import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        setError(true)
        setMessage(error.response.data.error)
        setTimeout(() => {
          setError(false)
          setMessage('')
        }, 5000)
      })
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        credential: { username, password }
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setError(false)
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = async ({ blog }) => {
    try {
      const savedBlog = await blogService.create({ blog })
      setBlogs(blogs.concat(savedBlog))
      setMessage(`a new blog ${blog.title} ${blog.author}`)
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      setError(true)
      setMessage(error.response.data)
      setTimeout(() => {
        setError(false)
        setMessage('')
      }, 5000)
    }
  }

  const updateBlog = async ({ blog }) => {
    const { id } = blog

    try {
      const updatedBlog = await blogService.update({ blog, id })

      const listOfBlogs = blogs.map((blog) => {
        return blog.id !== updatedBlog.id ? blog : updatedBlog
      })

      setBlogs(listOfBlogs)
    } catch (error) {
      setError(true)
      setMessage(error.response.data)
      setTimeout(() => {
        setError(false)
        setMessage('')
      }, 5000)
    }
  }

  const removeBlog = async ({ blog }) => {
    const { id } = blog

    try {
      await blogService.remove({ id })
      const listOfBlogs = blogs.filter((blog) => blog.id !== id)

      setBlogs(listOfBlogs)
    } catch (error) {
      setError(true)
      setMessage(error.response.data)
      setTimeout(() => {
        setError(false)
        setMessage('')
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} error={error} />
        <LoginForm login={handleLogin} />
      </div>
    )
  }

  const showWhenIsVisible = visible ? { display: '' } : { display: 'none' }
  const hideWhenIsVisible = visible ? { display: 'none' } : { display: '' }

  const toggleVisibility = () => setVisible(!visible)

  const sortedBlog = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
      <p>
        {user?.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        <div style={hideWhenIsVisible}>
          <button onClick={toggleVisibility}>new note</button>
        </div>
        <div style={showWhenIsVisible}>
          <BlogForm create={createBlog} />
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
      {sortedBlog.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          update={updateBlog}
          name={user.name}
          deleteBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
