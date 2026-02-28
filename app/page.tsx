import Image from "next/image";
import styles from './page.module.scss'
import LeftNavBar from "@/components/LeftNavBar";

export default function Home() {
  return (
    <div className={styles.mainGridWrapper}>
      <LeftNavBar />
      <main></main>
      <nav></nav>
    </div>
  );
}