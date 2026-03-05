'use client';

import { useState, useRef } from "react";
import styles from './WriteBox.module.scss'

export default function WriteBox() {
  const [paragraphs, setParagraphs] = useState<string[][]>([[]]);
  const [editingPIndex, setEditingPIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
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

      setParagraphs(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = [...updated[updated.length - 1], fittedText];
        return updated;
      });
      el.textContent = remainder;
    }

    moveCursorToEnd(el);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleReturn();
    }
  };

  const handlePencilClick = (pIndex: number) => {
    const fullText = paragraphs[pIndex].join(' ');
    setEditingPIndex(pIndex);
    setEditingValue(fullText);
  };

  const handleEditSave = () => {
    if (editingPIndex === null) return;
    setParagraphs(prev => {
      const updated = [...prev];
      updated[editingPIndex] = [editingValue];
      return updated;
    });
    setEditingPIndex(null);
    setEditingValue('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') {
      setEditingPIndex(null);
      setEditingValue('');
    }
  };

  return (
    <>
      <div className={styles.boxWrapper}>
        <div className={styles.linesWrapper}>
          {paragraphs.filter(paragraph => paragraph.length > 0).map((paragraph, pIndex) => (
            <div key={pIndex} className={styles.paragraphWrapper}>
              <div className={styles.paragraph}>
              {editingPIndex === pIndex ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  className={styles.editContentEditable}
                  onBlur={e => {
                    const text = e.currentTarget.textContent || '';
                    setParagraphs(prev => {
                      const updated = [...prev];
                      updated[editingPIndex!] = [text];
                      return updated;
                    });
                    setEditingPIndex(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Escape') {
                      const text = e.currentTarget.textContent || '';
                      setParagraphs(prev => {
                        const updated = [...prev];
                        updated[editingPIndex!] = [text];
                        return updated;
                      });
                      setEditingPIndex(null);
                      setEditingValue('');
                    }
                  }}
                  ref={el => { 
                    if (el && editingPIndex === pIndex) { 
                      el.textContent = editingValue; 
                      el.focus(); 
                    }
                  }}
                />
              ) : (
                paragraph.map((line, lIndex) => (
                  <span key={lIndex} className={styles.completedLine}>
                    {line}{' '}
                  </span>
                ))
              )}
              </div>
              <div className={styles.pencilWrapper}>
                <img
                  src="/pencil.png"
                  alt="Edit"
                  className={styles.pencilIcon}
                  onClick={() => handlePencilClick(pIndex)}
                />
                {editingPIndex === pIndex && (
                  <span className={styles.editHint}>press esc to save</span>
                )}
              </div>
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