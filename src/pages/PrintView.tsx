import React, { useEffect, useState } from 'react';
import './PrintView.css';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  question: string;
  answer: string;
}

const PrintView = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');

    if (file) {
      fetch(file)
        .then(res => res.text())
        .then(md => {
          const blocks = md.split(/---+/g).map(s => s.trim()).filter(Boolean);
          const cards: Flashcard[] = [];
          blocks.forEach(block => {
            const match = block.match(/^###\s*\S+(.+?)\n+([\s\S]+)/);
            if (match) {
              const [, question, answer] = match;
              cards.push({ question: question.trim(), answer: answer.trim() });
            }
          });
          setCards(cards);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="root-container" onClick={() => navigate('/')}>
      <div className="card-container-question">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div>{card.question}</div>
          </div>
        ))}
      </div>
      <div className="card-container-answer">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintView;
