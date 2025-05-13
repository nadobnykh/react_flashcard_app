import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

interface Flashcard {
  category: string;
  question: string;
  answer: string;
}

const StartPage: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [cardFiles, setCardFiles] = useState<string[]>([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [flashcardsPerPage, setFlashcardsPerPage] = useState<number>(() => {
    // Try to load saved setting from session storage or default to 8
    const saved = sessionStorage.getItem('flashcardsPerPage');
    return saved ? parseInt(saved, 10) : 8;
  });
  const navigate = useNavigate();

  // Fetch list of markdown files from server API
  useEffect(() => {
    setFilesLoading(true);
    fetch('http://localhost:8000/api/cards')
      .then(res => {
        if (!res.ok) throw new Error('Failed fetching card filenames');
        console.log(res);
        // Check if the response is JSON
        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return res;
      })
      .then((files: string[]) => {
        setCardFiles(files);
        setFilesError(null);
      })
      .catch(err => {
        console.error(err);
        setFilesError('Fehler beim Laden der Kartendateien');
      })
      .finally(() => {
        setFilesLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentFile) {
      setLoading(true);
      console.log(`Loading file: ${currentFile}`);
      fetch(`cards/${currentFile}`)
        .then(res => res.text())
        .then(md => {
          const blocks = md.split(/---+/g).map(s => s.trim()).filter(Boolean);
          //console.log(blocks);
          const parsedCards: Flashcard[] = [];
          blocks.forEach(block => {
            const lines = block.split(/\r\n|\r|\n/);
            let category = "";
            let question = "";
            let answer = "";
            lines.forEach(line => {
                // The previous code attempts to assign answer in every line, causing logical issues and 'continue' used improperly.
                if(line.startsWith('## ')) category = line.slice(3).trim();
                else if(line.startsWith('### ')) question = line.slice(4).trim();
                else answer += "\n" + line.trim();
            });
            parsedCards.push({ category, question, answer });
            console.log(parsedCards);
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
    navigate(`/print?file=${encodeURIComponent(`cards/${currentFile}`)}&cardsPerPage=${flashcardsPerPage}`);
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
  // Prevent context menu on long press touch/mobile devices
  const preventContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };


  return (
    <div>
      <h1>📚 Flashcard Viewer</h1>
      <div id="fileList">
        {filesLoading && <p>Loading files...</p>}
        {filesError && <p style={{color: "red"}}>{filesError}</p>}
        {!filesLoading && !filesError && cardFiles.map((filename) => (
          <button key={filename} onClick={() => handleFileClick(filename)}>
            {filename}
          </button>
        ))}
      </div>

      <label htmlFor="flashcardsPerPageSelect" style={{ marginRight: '0.5rem' }}>
        Flashcards per Page:
      </label>
      <select
        id="flashcardsPerPageSelect"
        value={flashcardsPerPage}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          setFlashcardsPerPage(newValue);
          sessionStorage.setItem('flashcardsPerPage', newValue.toString());
        }}
        style={{ marginRight: '1rem' }}
      >
        <option value={8}>8</option>
        <option value={6}>6</option>
      </select>

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
              onContextMenu={preventContextMenu}
            >
              <div className="card-inner" style={{ transform: flippedCards.has(idx) ? 'rotateY(180deg)' : 'none' }}>
                <div className="card-front" dangerouslySetInnerHTML={{ __html: marked.parse(card.question) }} />
                <div className="card-back" dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StartPage;
