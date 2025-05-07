interface Flashcard {
  question: string;
  answer: string;
}

import { marked } from 'marked';

const cardContainer = document.getElementById("cardContainer")!;
const fileList = document.getElementById("fileList")!;

// Simulierte Liste von Markdown-Dateien im cards/-Verzeichnis
const mockFiles = [
  "NestJS - Projektinitialisierung & Grundlagen.md",
  "React - State Management.md"
];

function createFileButtons() {
  mockFiles.forEach((filename) => {
    const btn = document.createElement("button");
    btn.textContent = filename;
    btn.addEventListener("click", () => loadMarkdown(`cards/${filename}`));
    fileList.appendChild(btn);
  });
}

async function loadMarkdown(path: string) {
  const res = await fetch(path);
  const text = await res.text();
  const cards = parseMarkdownToCards(text);
  renderCards(cards);
}

function parseMarkdownToCards(md: string): Flashcard[] {
  const blocks = md.split(/---+/g).map(s => s.trim()).filter(Boolean);
  const cards: Flashcard[] = [];

  for (const block of blocks) {
    const match = block.match(/^###\s*\S+(.+?)\n+([\s\S]+)/);
    if (match) {
      const [, question, answer] = match;
      cards.push({ question: question.trim(), answer: answer.trim() });
    }
  }

  return cards;
}

function renderCards(cards: Flashcard[]) {
  cardContainer.innerHTML = "";
  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";

    const inner = document.createElement("div");
    inner.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";
    front.textContent = card.question;

    const back = document.createElement("div");
    back.className = "card-back";
    back.innerHTML = marked.parse(card.answer);

    inner.appendChild(front);
    inner.appendChild(back);
    cardEl.appendChild(inner);
    cardContainer.appendChild(cardEl);
  });
}

createFileButtons();
