import { useState } from 'react'
import api from '../api/axios'
import Button from './ui/Button'
import Input from './ui/Input'

export default function ActivityForm({ onSaved }) {
  const user = JSON.parse(localStorage.getItem('user')) // utilisateur connecté
  const [form, setForm] = useState({
    type: '',
    duree: '',
    calories_brulees: '',
    date_activite: ''
  })
  const [error, setError] = useState(null)

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      // on envoie user_id caché côté backend
      await api.post('/activities', { ...form, user_id: user.id })
      setForm({ type: '', duree: '', calories_brulees: '', date_activite: '' })
      if(onSaved) onSaved()
    } catch (err) {
      console.error(err)
      setError('Erreur lors de l’enregistrement')
    }
  }

  return (
    <form onSubmit={onSubmit} className="card form">
      <h3>Ajouter une activité</h3>

      <Input label="Type" name="type" value={form.type} onChange={onChange} required/>
      <Input label="Durée (min)" name="duree" type="number" value={form.duree} onChange={onChange} required/>
      <Input label="Calories brûlées" name="calories_brulees" type="number" step="0.1" value={form.calories_brulees} onChange={onChange} required/>
      <Input label="Date" name="date_activite" type="date" value={form.date_activite} onChange={onChange} required/>

      {error && <div className="error">{error}</div>}
      <Button type="submit">Enregistrer</Button>
    </form>
  )
}
