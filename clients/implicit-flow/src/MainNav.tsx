import * as React from 'react'
import { AuthenticationConsumer } from "@axa-fr/react-oidc-context"
import { Link } from "react-router-dom"

import styles from './MainNav.module.css'

type Props = {
  title: string
  links: ReadonlyArray<{
    target: string
    label: string
    active?: boolean
  }>
  user?: string
  onLogin: () => void
  onLogout: () => void
}

export const MainNav = ({title, links, user, onLogin, onLogout}: Props) => (
  <section className={styles.containers}>
    <nav className={styles.titleRow}>
      <h2 className={styles.title}>Welcome to the example</h2>
      {!user && <button className={styles.button} onClick={onLogin}>Login</button>}
      {user && <h3 className={styles.user}>{user}</h3>}
      {user && <button className={styles.button} onClick={onLogout}>Logout</button>}
    </nav>
    <nav className={styles.navRow}>
      {links.filter( ({active = true}) => active).map(({ target, label }, i) => (
        <li key={i} className={styles.navLink}>
          <Link to={target} >{label}</Link>
        </li>
      ))}
    </nav>
  </section>
)
