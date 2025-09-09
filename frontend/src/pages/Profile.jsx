import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Profile() {
  const { user } = useAuth()
  const [form, setForm] = useState(user || {})
  const [msg, setMsg] = useState(null)

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const onSave = async () => {
    try {
      const { data } = await api.put(`/users/${user.id}`, form)
      localStorage.setItem('user', JSON.stringify(data))
      setMsg('Profil mis à jour')
    } catch { setMsg('Échec de la mise à jour') }
  }

  if (!user) return null

  return (
    <div className="card">
      <h2>Mon profil</h2>
      <div className="grid-2">
        <Input label="Nom" name="name" value={form.name||''} onChange={onChange}/>
        <Input label="Email" name="email" value={form.email||''} onChange={onChange}/>
        <Input label="Âge" name="age" type="number" value={form.age||''} onChange={onChange}/>
        <Input label="Poids (kg)" name="poids" type="number" step="0.1" value={form.poids||''} onChange={onChange}/>
        <Input label="Taille (cm)" name="taille" type="number" value={form.taille||''} onChange={onChange}/>
        <Input label="Objectif poids (kg)" name="objectif_poids" type="number" step="0.1" value={form.objectif_poids||''} onChange={onChange}/>
      </div>
      {msg && <div className="info">{msg}</div>}
      <Button onClick={onSave}>Enregistrer</Button>
    </div>
  )
}
