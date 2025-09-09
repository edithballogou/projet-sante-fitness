import api from '../api/axios'
import Button from './ui/Button'

export default function NotificationAlert({ notif, onChanged }) {
  const toggleRead = async () => {
    await api.put(`/notifications/${notif.id}`, { ...notif, etat: !notif.etat })
    onChanged && onChanged()
  }
  const onDelete = async () => {
    await api.delete(`/notifications/${notif.id}`)
    onChanged && onChanged()
  }

  return (
    <div className={`card item ${notif.etat ? 'ok' : ''}`}>
      <div><b>{notif.type}</b> — {notif.message}</div>
      <div>{notif.date_envoi}</div>
      <div className="row">
        <Button onClick={toggleRead}>{notif.etat ? 'Marquer non lu' : 'Marquer lu'}</Button>
        <Button variant="ghost" onClick={onDelete}>Supprimer</Button>
      </div>
    </div>
  )
}
