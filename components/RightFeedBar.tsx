'use client'

import styles from './RightFeedBar.module.scss'

export default function RightFeedBar() {
  return(
    <div className={styles.feedWrapper}>
      <h2 className={styles.feedTitle}>
        Feed
      </h2>
      <ul className={styles.feedList}>
        <li className={styles.feedItem}>
          <a href="#" className={styles.feedLink}>
            <h3 className={styles.feedTitle}>Why Silicon Valley Got AI Completely Wrong</h3>
          </a>
        </li>
        <li className={styles.feedItem}>
          <a href="#" className={styles.feedLink}>
            <h3 className={styles.feedTitle}>The Quiet Death of the American Middle Class</h3>
          </a>
        </li>
        <li className={styles.feedItem}>
          <a href="#" className={styles.feedLink}>
            <h3 className={styles.feedTitle}>Remote Work Didn't Kill Productivity — Managers Did</h3>
          </a>
        </li>
        <li className={styles.feedItem}>
          <a href="#" className={styles.feedLink}>
            <h3 className={styles.feedTitle}>We Were Wrong About Social Media and Democracy</h3>
          </a>
        </li>
        <li className={styles.feedItem}>
          <a href="#" className={styles.feedLink}>
            <h3 className={styles.feedTitle}>College Is Broken and Nobody Wants to Admit It</h3>
          </a>
        </li>
      </ul>
    </div>
  )
}