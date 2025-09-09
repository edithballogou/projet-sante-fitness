import { useState } from 'react'
import api from '../api/axios'
import Button from './ui/Button'
import Input from './ui/Input'

export default function MealForm({ onSaved, meal }) {
  const [form, setForm] = useState({
    description: meal?.description || '',
    calories: meal?.calories || '',
    date_repas: meal?.date_repas || ''
  })
  const [error, setError] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const payload = { ...form, user_id: user.id }
      if (meal) {
        await api.put(`/meals/${meal.id}`, payload)
      } else {
        await api.post('/meals', payload)
      }
      setForm({ description:'', calories:'', date_repas:'' })
      onSaved && onSaved()
    } catch (err) {
      console.error(err)
      setError('Erreur lors de l’enregistrement')
    }
  }

  return (
    <form onSubmit={onSubmit} className="form card">
      <h3>{meal ? 'Modifier le repas' : 'Ajouter un repas'}</h3>
      <Input label="Description" name="description" value={form.description} onChange={onChange} required />
      <Input label="Calories" name="calories" type="number" step="0.1" value={form.calories} onChange={onChange} required />
      <Input label="Date" name="date_repas" type="date" value={form.date_repas} onChange={onChange} required />
      {error && <div className="error">{error}</div>}
      <Button type="submit">{meal ? 'Mettre à jour' : 'Ajouter'}</Button>
    </form>
  )
}
