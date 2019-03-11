import * as React from 'react'
import { Link } from "react-router-dom"

interface Props {
  links: ReadonlyArray<{
    target: string
    label: string
  }>
  className?: string
}

export const NavBar = ({ links, className }: Props) => (
  <nav className={className}>
    {links.map(({ target, label }, i) => (
      <li key={i} className="App-link">
        <Link to={target} >{label}</Link>
      </li>
    ))}
  </nav>
)
