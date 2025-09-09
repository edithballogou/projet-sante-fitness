import api from '../api/axios'
import Button from './ui/Button'

export default function ActivityCard({ activity, onChanged }) {
  const onDelete = async () => {
    await api.delete(`/activities/${activity.id}`)
    onChanged && onChanged()
  }
  return (
    <div className="card item">
      <div><b>{activity.type}</b> — {activity.duree} min — {activity.calories_brulees} kcal</div>
      <div>{activity.date_activite}</div>
      <Button variant="ghost" onClick={onDelete}>Supprimer</Button>
    </div>
  )
}
