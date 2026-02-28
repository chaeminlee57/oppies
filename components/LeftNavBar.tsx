import styles from './LeftNavBar.module.scss'

export default function LeftNavBar() {
  return(
    <nav className={styles.navWrapper}>
      <a href="#" className={styles.navLink}><li className={styles.navItem}>Home</li></a>
      <a href="#" className={styles.navLink}><li className={styles.navItem}>Feed</li></a>
      <a href="#" className={styles.navLink}><li className={styles.navItem}>Write</li></a>
      <a href="#" className={styles.navLink}><li className={styles.navItem}>Profile</li></a>
      <a href="#" className={styles.navLink}><li className={styles.navItem}>Contact</li></a>
    </nav>
  )
}