import PropTypes from 'prop-types'

const Notification = ({ message, error }) => {
  if (!message) {
    return null
  }

  return <div className={`${error ? 'error' : 'success'}`}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired
}

export default Notification
