'use client';

import { useState, useRef } from "react";
import styles from './WriteBox.module.scss'

export default function WriteBox() {
  const [paragraphs, setParagraphs] = useState<string[][]>([[]]);
  const [editingPIndex, setEditingPIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [insertedPIndex, setInsertedPIndex] = useState<number | null>(null);
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

  const handlePencilClick = (realPIndex: number) => {
    const fullText = paragraphs[realPIndex].join(' ');
    setEditingPIndex(realPIndex);
    setEditingValue(fullText);
  };

  const handleAddParagraph = (realPIndex: number) => {
    setParagraphs(prev => {
      const updated = [...prev];
      updated.splice(realPIndex + 1, 0, [' ']);
      return updated;
    });
    setInsertedPIndex(realPIndex + 1);
    setEditingPIndex(realPIndex + 1);
    setEditingValue('');
  };

  const handleDeleteParagraph = (realPIndex: number) => {
    setParagraphs(prev => {
      const updated = prev.filter((_, i) => i !== realPIndex);
      return updated.length > 0 ? updated : [[]];
    });
  };

  return (
    <>
      <div className={styles.boxWrapper}>
        <div className={styles.linesWrapper}>
          {paragraphs.map((paragraph, realPIndex) => {
            const isInserted = insertedPIndex === realPIndex;
            if (paragraph.length === 0 || (paragraph[0].trim() === '' && !isInserted)) return null;

            return (
              <div key={realPIndex} className={styles.paragraphWrapper}>
                <div className={styles.paragraph}>
                  {editingPIndex === realPIndex ? (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className={styles.editContentEditable}
                      onBlur={e => {
                        const text = e.currentTarget.textContent || '';
                        setParagraphs(prev => {
                          const updated = [...prev];
                          updated[realPIndex] = text.trim() ? [text] : [];
                          return updated;
                        });
                        setEditingPIndex(null);
                        setInsertedPIndex(null);
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Escape') {
                          const text = e.currentTarget.textContent || '';
                          setParagraphs(prev => {
                            const updated = [...prev];
                            updated[realPIndex] = text.trim() ? [text] : [];
                            return updated;
                          });
                          setEditingPIndex(null);
                          setEditingValue('');
                          setInsertedPIndex(null);
                        }
                      }}
                      ref={el => {
                        if (el && editingPIndex === realPIndex) {
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
                    onClick={() => handlePencilClick(realPIndex)}
                  />
                  <img
                    src="/add.png"
                    alt="Add paragraph"
                    className={styles.pencilIcon}
                    onClick={() => handleAddParagraph(realPIndex)}
                  />
                  <img
                    src="/delete.png"
                    alt="Delete paragraph"
                    className={styles.pencilIcon}
                    onClick={() => handleDeleteParagraph(realPIndex)}
                  />
                  {editingPIndex === realPIndex && (
                    <span className={styles.editHint}>press esc to save</span>
                  )}
                </div>
              </div>
            );
          })}
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