import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

interface Flashcard {
  question: string;
  answer: string;
}

const PrintView = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1cm', padding: '1cm' }}>
      <div style={{ display: 'contents' }}>
        {cards.map((card, index) => (
          <div key={index} className="card" style={{ border: '1px dashed #999', padding: '1rem', height: '6cm', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', pageBreakInside: 'avoid', position: 'relative' }}>
            <div>{card.question}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'contents' }}>
        {cards.map((card, index) => (
          <div key={index} className="card" style={{ border: '1px dashed #999', padding: '1rem', height: '6cm', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', pageBreakInside: 'avoid', position: 'relative' }}>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrintView;
