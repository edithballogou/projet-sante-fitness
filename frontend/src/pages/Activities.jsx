import { useEffect, useState } from 'react'
import api from '../api/axios'
import ActivityForm from '../components/ActivityForm'
import ActivityCard from '../components/ActivityCard'

export default function Activities() {
  const [myActivities, setMyActivities] = useState([])
  const [allActivities, setAllActivities] = useState([])
  const [showAll, setShowAll] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))

  // Charger les activités de l'utilisateur
  const loadMyActivities = () => {
    api.get(`/activities?user_id=${user.id}`)
      .then(r => setMyActivities(r.data))
      .catch(() => setMyActivities([]))
  }

  // Charger toutes les activités
  const loadAllActivities = () => {
    api.get('/activities')
      .then(r => setAllActivities(r.data))
      .catch(() => setAllActivities([]))
  }

  useEffect(() => {
    loadMyActivities()
    loadAllActivities()
  }, [])

  return (
    <div className="stack">
      <h2>Activités</h2>

      {/* Formulaire pour ajouter une activité */}
      <ActivityForm onSaved={() => { loadMyActivities(); loadAllActivities() }} />

      {/* Section : Mes activités */}
      <div className="section">
        <h3>Mes activités</h3>
        {myActivities.length === 0 ? (
          <p>Aucune activité enregistrée.</p>
        ) : (
          myActivities.map(a => (
            <ActivityCard key={a.id} activity={a} onChanged={loadMyActivities}/>
          ))
        )}
      </div>

      {/* Section : Toutes les activités */}
      <div className="section" style={{ marginTop: '2rem' }}>
        <h3>Toutes les activités</h3>
        <button onClick={loadAllActivities}>Actualiser</button>
        {allActivities.length === 0 ? (
          <p>Aucune activité trouvée.</p>
        ) : (
          allActivities.map(a => (
            <ActivityCard key={a.id} activity={a} onChanged={loadAllActivities}/>
          ))
        )}
      </div>
    </div>
  )
}
