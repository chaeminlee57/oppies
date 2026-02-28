import Image from "next/image";
import styles from './page.module.scss'
import LeftNavBar from "@/components/LeftNavBar";
import RightFeedBar from "@/components/RightFeedBar";
import WriteBox from "@/components/WriteBox";

export default function Home() {
  return (
    <div className={styles.mainGridWrapper}>
      <LeftNavBar />
      <main className={styles.mainContent}>
        <WriteBox />
      </main>
      <RightFeedBar />
    </div>
  );
}