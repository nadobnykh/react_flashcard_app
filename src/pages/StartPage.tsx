import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

const StartPage = () => {
  return (
    <div>
      <h1>📚 Flashcard Viewer</h1>
      <div id="fileList"></div>
      <button id="printButton" className="print-button">
        🖨️ Druckansicht
      </button>
      <div id="cardContainer"></div>
      <script type="module" src="script.ts"></script>
    </div>
  );
};

export default StartPage;
