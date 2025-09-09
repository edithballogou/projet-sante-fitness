import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="header">
      <Link to="/" className="brand">Suivi Santé & Fitness</Link>
      {user && (
        <nav className="nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/activities">Activités</NavLink>
          <NavLink to="/meals">Repas</NavLink>
          <NavLink to="/notifications">Notifications</NavLink>
          <NavLink to="/profile">Profil</NavLink>
          <button className="link" onClick={logout}>Déconnexion</button>
        </nav>
      )}
      {!user && (
        <nav className="nav">
          <NavLink to="/login">Connexion</NavLink>
          <NavLink to="/register">Inscription</NavLink>
        </nav>
      )}
    </header>
  )
}
