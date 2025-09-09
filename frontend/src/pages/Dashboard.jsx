import { useEffect, useState } from 'react'
import api from '../api/axios'
import ActivityCard from '../components/ActivityCard'
import MealCard from '../components/MealCard'

export default function Dashboard() {
  const [data, setData] = useState({ activities: { future: [], past: [] }, meals: { future: [], past: [] } })
  const user = JSON.parse(localStorage.getItem('user'))

  const loadDashboard = () => {
    api.get(`/dashboard?user_id=${user.id}`)
      .then(res => setData(res.data))
      .catch(() => setData({ activities: { future: [], past: [] }, meals: { future: [], past: [] } }))
  }

  useEffect(() => { loadDashboard() }, [])

  return (
    <div className="stack">
      <h2>Tableau de bord</h2>

      {/* --- Activités --- */}
      <section className="dashboard-section">
        <h3>📌 Activités futures</h3>
        {data.activities.future.length === 0 ? (
          <p>Aucune activité prévue</p>
        ) : (
          data.activities.future.map(a => (
            <ActivityCard key={a.id} activity={a}/>
          ))
        )}

        <h3>✅ Activités passées</h3>
        {data.activities.past.length === 0 ? (
          <p>Aucune activité passée</p>
        ) : (
          data.activities.past.map(a => (
            <ActivityCard key={a.id} activity={a}/>
          ))
        )}
      </section>

      {/* --- Repas --- */}
      <section className="dashboard-section">
        <h3>📌 Repas futurs</h3>
        {data.meals.future.length === 0 ? (
          <p>Aucun repas prévu</p>
        ) : (
          data.meals.future.map(m => (
            <MealCard key={m.id} meal={m}/>
          ))
        )}

        <h3>✅ Repas passés</h3>
        {data.meals.past.length === 0 ? (
          <p>Aucun repas passé</p>
        ) : (
          data.meals.past.map(m => (
            <MealCard key={m.id} meal={m}/>
          ))
        )}
      </section>
    </div>
  )
}
