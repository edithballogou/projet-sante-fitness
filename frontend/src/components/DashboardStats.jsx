export default function DashboardStats({ activities = [], meals = [] }) {
  const totalKcalBurn = activities.reduce((s,a)=>s+Number(a.calories_brulees||0),0)
  const totalKcalEat = meals.reduce((s,m)=>s+Number(m.calories||0),0)
  return (
    <div className="grid-3">
      <div className="stat card"><span>Total activités</span><b>{activities.length}</b></div>
      <div className="stat card"><span>Calories brûlées</span><b>{totalKcalBurn}</b></div>
      <div className="stat card"><span>Calories consommées</span><b>{totalKcalEat}</b></div>
    </div>
  )
}
