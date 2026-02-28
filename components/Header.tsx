import styles from './Header.module.scss'
import { playfairDisplay } from '../app/fonts';

export default function Header() {
  return(
    <header className={`${styles.headerWrapper} ${playfairDisplay.variable}`}>
      <h1 className={styles.websiteName}>Oppies</h1>
    </header>
  )
}