import styles from './LeftNavBar.module.scss'

export default function LeftNavBar() {
  return(
    <nav className={styles.navWrapper}>
      <a href="#" className={styles.navLink}><h2 className={styles.navItem}>Home</h2></a>
      <a href="#" className={styles.navLink}><h2 className={styles.navItem}>Feed</h2></a>
      <a href="#" className={styles.navLink}><h2 className={styles.navItem}>Write</h2></a>
      <a href="#" className={styles.navLink}><h2 className={styles.navItem}>Profile</h2></a>
      <a href="#" className={styles.navLink}><h2 className={styles.navItem}>Contact</h2></a>
    </nav>
  )
}