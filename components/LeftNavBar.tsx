import styles from './LeftNavBar.module.scss'
import { playfairDisplay } from '../app/fonts';
import { House, Newspaper, PenLine, User, Mail } from 'lucide-react';

export default function LeftNavBar() {
  return(
    <nav className={`${styles.navWrapper} ${playfairDisplay.variable}`}>
      <a href="#" className={styles.navLink}><House className={styles.navItem} /></a>
      <a href="#" className={styles.navLink}><Newspaper className={styles.navItem} /></a>
      <a href="#" className={styles.navLink}><PenLine className={styles.navItem} /></a>
      <a href="#" className={styles.navLink}><User className={styles.navItem} /></a>
      <a href="#" className={styles.navLink}><Mail className={styles.navItem} /></a>
    </nav>
  )
}