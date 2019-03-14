import * as React from 'react'

import styles from './MainContent.module.css'

export const MainContent: React.FunctionComponent = ({children}) => (
  <section className={styles.container}>
    {children}
  </section>
)
