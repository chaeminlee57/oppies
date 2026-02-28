import Image from "next/image";
import styles from './page.module.scss'
import LeftNavBar from "@/components/LeftNavBar";
import RightFeedBar from "@/components/RightFeedBar";

export default function Home() {
  return (
    <div className={styles.mainGridWrapper}>
      <LeftNavBar />
      <main></main>
      <RightFeedBar />
    </div>
  );
}