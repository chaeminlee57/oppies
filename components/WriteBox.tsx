'use client';

import { useState, useRef } from "react";
import styles from './WriteBox.module.scss'
import { satoshi } from '../app/fonts'

export default function WriteBox() {
  const [lines, setLines] = useState<string[]>([]);
  const editableRef = useRef<HTMLDivElement>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handleKey = (char: string) => {
    const el = editableRef.current;
    if (!el) return;
    el.textContent += char;
    handleInput({ currentTarget: el } as any);
  };

  const handleBackspace = () => {
    const el = editableRef.current;
    if (!el) return;
    const current = el.textContent || '';
    if (current.length > 0) {
      el.textContent = current.slice(0, -1);
    } else if (lines.length > 0) {
      const prevLine = lines[lines.length - 1];
      setLines(prev => prev.slice(0, -1));
      el.textContent = prevLine;
    }
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const handleReturn = () => {
    const el = editableRef.current;
    if (!el) return;
    const current = el.textContent || '';
    setLines(prev => [...prev, current]);
    el.textContent = '';
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement> | { currentTarget: HTMLDivElement }) => {
    const el = editableRef.current;
    if (!el) return;
  
  const newText = el.textContent || '';
  const lastChar = newText.slice(-1).toUpperCase();
  setPressedKey(lastChar);
  setTimeout(() => setPressedKey(null), 120);

    while (el.scrollWidth > el.clientWidth) {
      const fullText = el.textContent || '';
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

      const fittedText = fullText.substring(0, low);
      const remainder = fullText.substring(low);
      const lastSpace = fittedText.lastIndexOf(' ');

      const completedLine = lastSpace > -1 ? fittedText.substring(0, lastSpace) : fittedText;
      const leftover = lastSpace > -1 ? fittedText.substring(lastSpace + 1) + remainder : remainder;

      setLines(prev => [...prev, completedLine]);
      el.textContent = leftover;
    }

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  return(
    <>
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
          autoFocus
          data-placeholder="What are your thoughts right now?"
          className={styles.textArea}
          onInput={handleInput}
        />
      </div>
    </>
  )
}