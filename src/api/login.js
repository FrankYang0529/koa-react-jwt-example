const login = async ({ username, password}) => {
  try {
    if (!username || !password) {
      throw new Error('Missing username or password')
    }

    const response = await fetch('http://localhost:3000/auth/login',
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      }
    )

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }

    const { user, token } = await response.json()
    return { user, token }
  } catch (error) {
    return { message: error.message }
  }
}

export default login