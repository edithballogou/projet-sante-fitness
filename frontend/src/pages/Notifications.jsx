import { useEffect, useState } from 'react'
import api from '../api/axios'
import NotificationAlert from '../components/NotificationAlert'

export default function Notifications() {
  const [items, setItems] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  const load = () => {
    api.get(`/notifications?user_id=${user.id}`)
      .then(r => setItems(r.data))
      .catch(() => setItems([]))
  }

  useEffect(() => { load() }, [])

  return (
    <div className="stack">
      <h2>Notifications</h2>
      {items.length === 0 && <p>Aucune notification</p>}
      <div className="list">
        {items.map(n => (
          <NotificationAlert key={n.id} notif={n} onChanged={load} />
        ))}
      </div>
    </div>
  )
}
