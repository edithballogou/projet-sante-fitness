import { useEffect, useState } from 'react'
import api from '../api/axios'
import MealForm from '../components/MealForm'
import MealCard from '../components/MealCard'

export default function Meals() {
  const [myMeals, setMyMeals] = useState([])
  const [allMeals, setAllMeals] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  // Charger les repas de l'utilisateur
  const loadMyMeals = () => {
    api.get(`/meals?user_id=${user.id}`)
      .then(r => setMyMeals(r.data))
      .catch(() => setMyMeals([]))
  }

  // Charger tous les repas
  const loadAllMeals = () => {
    api.get('/meals')
      .then(r => setAllMeals(r.data))
      .catch(() => setAllMeals([]))
  }

  useEffect(() => {
    loadMyMeals()
    loadAllMeals()
  }, [])

  return (
    <div className="stack">
      <h2>Repas</h2>

      {/* Formulaire pour ajouter un repas */}
      <MealForm onSaved={() => { loadMyMeals(); loadAllMeals() }} />

      {/* Section : Mes repas */}
      <div className="section">
        <h3>Mes repas</h3>
        {myMeals.length === 0 ? (
          <p>Aucun repas enregistré.</p>
        ) : (
          myMeals.map(m => (
            <MealCard key={m.id} meal={m} onChanged={loadMyMeals}/>
          ))
        )}
      </div>

      {/* Section : Tous les repas */}
      <div className="section" style={{ marginTop: '2rem' }}>
        <h3>Tous les repas</h3>
        <button onClick={loadAllMeals}>Actualiser</button>
        {allMeals.length === 0 ? (
          <p>Aucun repas trouvé.</p>
        ) : (
          allMeals.map(m => (
            <MealCard key={m.id} meal={m} onChanged={loadAllMeals}/>
          ))
        )}
      </div>
    </div>
  )
}
