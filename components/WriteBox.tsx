'use client';

import { useState } from "react";
import styles from './WriteBox.module.scss'

export default function WriteBox() {
  const [text, setText] = useState('');

  return(
    <div className={styles.boxWrapper}>
      <textarea 
        className={styles.textArea}
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="What are your thoughts right now?"
        />
    </div>
  )
}