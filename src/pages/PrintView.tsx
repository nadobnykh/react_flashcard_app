import React, { useEffect, useState } from 'react';
import './PrintView.css';
import { marked } from 'marked';
import { useNavigate } from 'react-router-dom';

interface Flashcard {
  filename: string;
  category: string;
  question: string;
  answer: string;
}

const PrintView = () => {
  const [pages, setPages] = useState<Flashcard[][]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cardsPerPage = 8; // Number of cards per page
  const cardHeight = 50 / cardsPerPage; // Height of the card in cm

  // Get today's date string formatted as dd.mm.yyyy (European format)
  const todayDate = new Date().toLocaleDateString('de-DE');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');
    

    if (file) {
      fetch(file)
        .then(res => res.text())
        .then(md => {
          const filename = file.split('/').pop() || 'unknown'; // Extract filename from the file path
          const blocks = md.split(/---+/g).map(s => s.trim()).filter(Boolean);
          var pageIndex = 0;
          blocks.forEach((block, index) => {
            const lines = block.split(/\r\n|\r|\n/);
            let category = "";
            let question = "";
            let answer = "";
            lines.forEach(line => {
              if(line.startsWith('## ')) category = line.slice(3).trim();
              else if(line.startsWith('### ')) question = line.slice(4).trim();
              else answer += "\n" + line.trim();
            });


            if(index > 0 && index % cardsPerPage == 0) {
              pageIndex++;
            }
            
            pages[pageIndex] = pages[pageIndex] || [];
            pages[pageIndex].push({ filename, category, question, answer });
            
          });
          setPages(pages);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="root-container" onClick={() => navigate('/')}>
      
      {pages.map((page, index) => (
        <div key={index} className="pages-wrapper">
          <div className="page-container page-ltr">
            {page.map((card, index) => (
              <div key={index} style={{ height: cardHeight+'cm' }} className="card-print card-print-front">
                <div className="card-header">✨ {card.filename}</div>
                <div className="card-category">{card.category}</div>
                <div dangerouslySetInnerHTML={{ __html: marked.parse(card.question+"❔") }} />
                <div className="card-footer">📅 {todayDate} 📍</div>
              </div>
            ))}
          </div>
          <div className="page-container page-rtl">
            {page.map((card, index) => (
              <div key={index} style={{ height: cardHeight+'cm' }} className="card-print">
                <div dangerouslySetInnerHTML={{ __html: marked.parse(card.answer) }} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintView;
