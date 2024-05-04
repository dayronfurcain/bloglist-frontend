import { useState } from 'react'
import PropTypes from 'prop-types'

function BlogForm({ create }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = { title, author, url }

    if (!title || !url) {
      return
    }

    create({ blog })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor='title'>title</label>
          <input
            data-testid='title'
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input
            data-testid='author'
            type='text'
            id='author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input
            data-testid='url'
            type='text'
            id='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  create: PropTypes.func.isRequired
}

export default BlogForm
