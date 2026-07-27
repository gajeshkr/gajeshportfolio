import profile from '../data/profile'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        © {new Date().getFullYear()} {profile.name}. Built with React.
      </div>
    </footer>
  )
}
