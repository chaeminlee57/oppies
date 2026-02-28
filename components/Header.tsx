import styles from './Header.module.scss'

export default function Header() {
  return(
    <header className={styles.headerWrapper}>
      <h1 className={styles.websiteName}>Oppies</h1>
    </header>
  )
}