import { useState } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', poids: '', taille: '', objectif_poids: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    try {
      // Conversion des champs numériques
      const payload = {
        ...form,
        age: parseInt(form.age),
        poids: parseFloat(form.poids),
        taille: parseFloat(form.taille),
        objectif_poids: form.objectif_poids ? parseFloat(form.objectif_poids) : null
      }

      // Appel API
      await axios.post('http://localhost:8000/api/users', payload)

      setSuccess(true)
      setForm({ name:'', email:'', password:'', age:'', poids:'', taille:'', objectif_poids:'' })

    } catch (err) {
      console.error(err.response || err)
      setError(err.response?.data?.message || 'Inscription impossible')
    }
  }

  return (
    <div className="card center">
      <h2>Inscription</h2>
      {success && <div className="success">Inscription réussie !</div>}
      <form onSubmit={onSubmit} className="form">
        <Input label="Nom" name="name" value={form.name} onChange={onChange} required/>
        <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required/>
        <Input label="Mot de passe" name="password" type="password" value={form.password} onChange={onChange} required/>
        <div className="grid-2">
          <Input label="Âge" name="age" type="number" value={form.age} onChange={onChange} required/>
          <Input label="Poids (kg)" name="poids" type="number" step="0.1" value={form.poids} onChange={onChange} required/>
        </div>
        <div className="grid-2">
          <Input label="Taille (cm)" name="taille" type="number" value={form.taille} onChange={onChange} required/>
          <Input label="Objectif poids (kg)" name="objectif_poids" type="number" step="0.1" value={form.objectif_poids} onChange={onChange}/>
        </div>
        {error && <div className="error">{error}</div>}
        <Button type="submit">Créer le compte</Button>
      </form>
    </div>
  )
}








