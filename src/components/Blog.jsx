import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, update, name, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenIsVisible = visible ? { display: '' } : { display: 'none' }

  const showRemoveButton =
    user.id === blog.user || user.id === blog.user.id
      ? { display: '' }
      : { display: 'none' }

  const toggleVisibility = () => setVisible(!visible)

  const handleLikes = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    update({ blog: newBlog })
  }

  const remove = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (!confirm) return

    deleteBlog({ blog })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <article style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        <div style={showWhenIsVisible} className='togglableContent'>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleLikes} className='button-likes'>
              likes
            </button>
            <div>{name}</div>
            <div style={showRemoveButton}>
              <button onClick={remove} style={{ backgroundColor: 'blue' }}>
                remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Blog
