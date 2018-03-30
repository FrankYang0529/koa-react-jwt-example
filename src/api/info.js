const info = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/auth/info',
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3001',
          'Authorization': `Bearer ${token}`,
        }
      }
    )

    if (!response.ok) { throw new Error('Token expired') }

    const { user } = await response.json()
    return { user }
  } catch (error) {
    return { message: error.message }
  }
}

export default info