import api from '../api/axios'
import Button from './ui/Button'

export default function MealCard({ meal, onChanged }) {
  const onDelete = async () => {
    await api.delete(`/meals/${meal.id}`)
    onChanged && onChanged()
  }
  return (
    <div className="card item">
      <div><b>{meal.description}</b> — {meal.calories} kcal</div>
      <div>{meal.date_repas}</div>
      <Button variant="ghost" onClick={onDelete}>Supprimer</Button>
    </div>
  )
}
