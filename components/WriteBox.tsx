'use client';

import { useState, useRef } from "react";
import styles from './WriteBox.module.scss'

export default function WriteBox() {
  const [paragraphs, setParagraphs] = useState<string[][]>([[]]);
  const editableRef = useRef<HTMLDivElement>(null);

  const moveCursorToEnd = (el: HTMLDivElement) => {
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
    // seal current paragraph with the last line, start a new empty paragraph
    setParagraphs(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = [...updated[updated.length - 1], current];
      updated.push([]);
      return updated;
    });
    el.textContent = '';
    moveCursorToEnd(el);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement> | { currentTarget: HTMLDivElement }) => {
    const el = editableRef.current;
    if (!el) return;

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

      const completedLine = fittedText;
      const leftover = remainder;

      setParagraphs(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = [...updated[updated.length - 1], completedLine];
        return updated;
      });
      el.textContent = leftover;
    }

    moveCursorToEnd(el);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleReturn();
    }
  };

  return (
    <>
      <div className={styles.boxWrapper}>
        <div className={styles.linesWrapper}>
          {paragraphs.map((paragraph, pIndex) => (
            <div key={pIndex} className={styles.paragraph}>
              {paragraph.map((line, lIndex) => (
                <span key={lIndex} className={styles.completedLine}>
                  {line}{' '}
                </span>
              ))}
            </div>
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
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
}