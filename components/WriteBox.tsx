'use client';

import { useState, useRef } from "react";
import styles from './WriteBox.module.scss'
import { satoshi } from '../app/fonts'

export default function WriteBox() {
  const [lines, setLines] = useState<string[]>([]);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const el = editableRef.current;
    if (!el) return;
  
    const currentText = el.textContent || '';
  
    // keep splitting as long as text overflows
    while (el.scrollWidth > el.clientWidth) {
      const fullText = el.textContent || '';
  
      // binary search for the exact cutoff point
      let low = 0;
      let high = fullText.length;
  
      while (low < high) {
        const mid = Math.floor((low + high + 1) / 2);
        el.textContent = fullText.substring(0, mid);
        if (el.scrollWidth > el.clientWidth) {
          high = mid - 1;
        } else {
          low = mid;
        }
      }
  
      // snap back to last word boundary
      const fittedText = fullText.substring(0, low);
      const remainder = fullText.substring(low);
      const lastSpace = fittedText.lastIndexOf(' ');
  
      const completedLine = lastSpace > -1 ? fittedText.substring(0, lastSpace) : fittedText;
      const leftover = lastSpace > -1 ? fittedText.substring(lastSpace + 1) + remainder : remainder;
  
      setLines(prev => [...prev, completedLine]);
      el.textContent = leftover;
    }
  
    // move cursor to end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  return(
    <div className={styles.boxWrapper}>
      <div className={styles.linesWrapper}>
        {lines.map((line, index) => (
          <div key={index} className={styles.completedLine}>{line}</div>
        ))}
      </div>
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder="What are your thoughts right now?"
        className={styles.textArea}
        onInput={handleInput}
      />
    </div>
  )
}