import { useState } from 'react'
import PropTypes from 'prop-types'

function LoginForm({ login }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    if (!username || !password) return

    login({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>username</label>
          <input
            data-testid='username'
            type='text'
            id='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input
            data-testid='password'
            type='password'
            id='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm
