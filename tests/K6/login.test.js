import http from 'k6/http'

export function login() {
  const res = http.post('http://localhost:3000/auth/login', JSON.stringify({
    username: 'admin',
    password: '123'
  }), {
    headers: { 'Content-Type': 'application/json' }
  })

  return JSON.parse(res.body).token
}