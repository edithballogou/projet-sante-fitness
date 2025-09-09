import { useState } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      })

      const user = res.data.user
      localStorage.setItem('user', JSON.stringify(user)) // sauvegarde session
      window.location.href = '/dashboard' // redirection

    } catch (err) {
      console.error(err.response?.data || err)
      setError(err.response?.data?.message || 'Identifiants invalides')
    }
  }

  return (
    <div className="card center">
      <h2>Connexion</h2>
      <form onSubmit={onSubmit} className="form">
        <Input label="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <Input label="Mot de passe" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  )
}
