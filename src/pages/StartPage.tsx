import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

interface Flashcard {
  question: string;
  answer: string;
}

const StartPage: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  // Static list of markdown files in cards/ directory
  const mockFiles = [
    "NestJS - Projektinitialisierung & Grundlagen.md",
    "React - State Management.md",
  ];

  useEffect(() => {
    if (currentFile) {
      setLoading(true);
      fetch(`cards/${currentFile}`)
        .then(res => res.text())
        .then(md => {
          const blocks = md.split(/---+/g).map(s => s.trim()).filter(Boolean);
          const parsedCards: Flashcard[] = [];
          blocks.forEach(block => {
            const match = block.match(/^###\s*\S+(.+?)\n+([\s\S]+)/);
            if (match) {
              const [, question, answer] = match;
              parsedCards.push({ question: question.trim(), answer: answer.trim() });
            }
          });
          setCards(parsedCards);
          setFlippedCards(new Set()); // Reset flipped cards on file change
          setLoading(false);
        });
    }
  }, [currentFile]);

  const handleFileClick = (filename: string) => {
    setCurrentFile(filename);
  };

  const handlePrintClick = () => {
    if (!currentFile) {
      alert('Bitte zuerst eine Datei laden.');
      return;
    }
    navigate(`/print?file=${encodeURIComponent(`cards/${currentFile}`)}`);
  };

  // Flip logic: flip on mouse or touch down, flip back on mouse/touch up or leave
  const startFlip = (index: number) => {
    setFlippedCards(prev => new Set(prev).add(index));
  };

  const endFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  return (
    <div>
      <h1>📚 Flashcard Viewer</h1>
      <div id="fileList">
        {mockFiles.map((filename) => (
          <button key={filename} onClick={() => handleFileClick(filename)}>
            {filename}
          </button>
        ))}
      </div>
      <button id="printButton" onClick={handlePrintClick}>
        🖨️ Druckansicht
      </button>
      <div id="cardContainer" className="card-container">
        {loading && <p>Loading...</p>}
        {!loading &&
          cards.map((card, idx) => (
            <div
              key={idx}
              className={`card${flippedCards.has(idx) ? ' flipped' : ''}`}
              onMouseDown={() => startFlip(idx)}
              onMouseUp={() => endFlip(idx)}
              onMouseLeave={() => endFlip(idx)}
              onTouchStart={() => startFlip(idx)}
              onTouchEnd={() => endFlip(idx)}
            >
              <div className="card-inner" style={{ transform: flippedCards.has(idx) ? 'rotateY(180deg)' : 'none' }}>
                <div className="card-front">{card.question}</div>
                <div className="card-back" dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartPage;
