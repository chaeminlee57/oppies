'use client'

import { playfairDisplay } from '../app/fonts';

const ROWS = [
  ["1","2","3","4","5","6","7","8","9","0","-"],
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L",";"],
  ["Z","X","C","V","B","N","M",",","."],
];

const styles = `
  .keyboard {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .key-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .key-row:nth-child(2) { padding-left: 12px; }
  .key-row:nth-child(3) { padding-left: 24px; }
  .key-row:nth-child(4) { padding-left: 36px; }

  .key {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #f5ede0;
    box-shadow: 0 5px 0 #2e2418, 0 6px 8px rgba(0,0,0,0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #2e2418;
    user-select: none;
    transition: transform 0.06s ease, box-shadow 0.06s ease;
    border: none;
  }

  .key:active, .key.pressed {
    box-shadow: 0 1px 0 #2e2418, 0 2px 4px rgba(0,0,0,0.2);
    transform: translateY(4px);
  }

  .bottom-row {
    display: flex;
    gap: 8px;
    margin-top: 2px;
    align-items: center;
  }

  .key-wide {
    width: 80px;
    height: 46px;
    border-radius: 23px;
    background: transparent;
    box-shadow: 0 5px 0 #2e2418, 0 6px 8px rgba(0,0,0,0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #2e2418;
    user-select: none;
    transition: transform 0.06s ease, box-shadow 0.06s ease;
    border: none;
  }

  .key-wide:active, .key-wide.pressed {
    box-shadow: 0 1px 0 #2e2418, 0 2px 4px rgba(0,0,0,0.2);
    transform: translateY(4px);
  }

  .key-space {
    width: 220px;
    height: 46px;
    border-radius: 23px;
    background: transparent;
    box-shadow: 0 5px 0 #2e2418, 0 6px 8px rgba(0,0,0,0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: #2e2418;
    user-select: none;
    transition: transform 0.06s ease, box-shadow 0.06s ease;
    border: none;
    letter-spacing: 0.15em;
  }

  .key-space:active, .key-space.pressed {
    box-shadow: 0 1px 0 #2e2418, 0 2px 4px rgba(0,0,0,0.2);
    transform: translateY(4px);
  }
`;

interface TypewriterProps {
  onKey?: (char: string) => void;
  onBackspace?: () => void;
  onReturn?: () => void;
  pressedKey?: string | null;
}

export default function Typewriter({ onKey, onBackspace, onReturn, pressedKey }: TypewriterProps) {

  const press = (char: string) => {
    onKey?.(char);
  };

  return (
    <div className={playfairDisplay.variable} style={{ fontFamily: 'var(--font-playfair)' }}>
      <style>{styles}</style>
      <div className="keyboard">
        {ROWS.map((row, rowIndex) => (
          <div className="key-row" key={rowIndex}>
            {row.map(k => (
              <button
                key={k}
                className={`key ${pressedKey === k ? 'pressed' : ''}`}
                onClick={() => press(k)}
              >
                {k}
              </button>
            ))}
          </div>
        ))}
        <div className="bottom-row">
          <button className={`key-wide ${pressedKey === "⌫" ? 'pressed' : ''}`} onClick={() => onBackspace?.()}>⌫ DEL</button>
          <button className={`key-space ${pressedKey === " " ? 'pressed' : ''}`} onClick={() => press(" ")}>SPACE</button>
          <button className={`key-wide ${pressedKey === "↵" ? 'pressed' : ''}`} onClick={() => onReturn?.()}>↵ RETURN</button>
        </div>
      </div>
    </div>
  );
}