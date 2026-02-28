import Image from "next/image";
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.mainGridWrapper}>
      <nav></nav>
      <main></main>
      <nav></nav>
    </div>
  );
}