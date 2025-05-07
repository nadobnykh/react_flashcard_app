import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';

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
            const match = block.match(/^###\\s*\\S+(.+?)\\n+([\\s\\S]+)/);
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

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
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
      <button
        id="printButton"
        onClick={handlePrintClick}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        🖨️ Druckansicht
      </button>
      <div
        id="cardContainer"
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {loading && <p>Loading...</p>}
        {!loading &&
          cards.map((card, index) => (
            <div
              key={index}
              className={`card${flippedCards.has(index) ? ' flipped' : ''}`}
              style={{
                background: 'white',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                perspective: 1000,
              }}
              onMouseDown={() => toggleFlip(index)}
            >
              <div
                className="card-inner"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.6s',
                  transformStyle: 'preserve-3d',
                  transform: flippedCards.has(index)
                    ? 'rotateY(180deg)'
                    : 'none',
                }}
              >
                <div
                  className="card-front"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    backfaceVisibility: 'hidden',
                    color: '#0077cc',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '6cm',
                    fontSize: '1.1rem',
                    border: '1px dashed #999',
                    borderRadius: '10px',
                  }}
                >
                  {card.question}
                </div>
                <div
                  className="card-back"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    backfaceVisibility: 'hidden',
                    color: '#333',
                    transform: 'rotateY(180deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '6cm',
                    fontSize: '1.1rem',
                    padding: '0.5rem',
                    border: '1px dashed #999',
                    borderRadius: '10px',
                  }}
                  dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartPage;
