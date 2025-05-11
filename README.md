# React Flashcard App

## Project Description
This is a React-based flashcard application designed for creating, displaying, and printing flashcards. The app supports rendering markdown content for questions and answers, paginating cards efficiently, and includes a PrintView mode that formats flashcards for easy printing. The PrintView dynamically shows the current date in a European date format (dd.mm.yyyy) on each card.

## Features
- Load flashcards from markdown files with front (question) and back (answer).
- Paginate flashcards for organized viewing and printing.
- Print-ready views with date stamping.
- Supports React Router for navigation.
- Uses `marked` for markdown rendering.

## Technologies Used
- React with TypeScript
- marked (Markdown parser)
- React Router
- CSS for styling

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd react_flashcard_app
   ```

2. **Install dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the application in development mode**
   ```bash
   npm start
   ```
   This will start the development server, typically at `http://localhost:5173/`.

4. **Build for production**
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist` or `build` folder.

## Usage

- Place your markdown flashcard files in an accessible location.
- Navigate in the app to the PrintView mode and pass the file path as a URL parameter `file`.
- Example URL: `http://localhost:3000/printview?file=public/cards/your-flashcards.md`
- Print the formatted flashcards with the current date shown on each card.

## Project Structure Overview
- `src/pages/PrintView.tsx`: Main component for rendering flashcards in print format.
- `src/pages/PrintView.css`: Styles specific to the print view.
- `public/cards/`: Default location for example markdown flashcard files.

## Notes
- Ensure markdown files adhere to the structure expected by the app (headers starting with `###`).
- Date format in the card footer is European (dd.mm.yyyy).
- The root container is clickable and returns navigation to the start page.

## License
MIT License - open for modification and redistribution.

---

If you have any questions or want to contribute, please open an issue or pull request on the repository.
