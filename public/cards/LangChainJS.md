### 1 Wie initialisiere ich ein neues Node.js-Projekt, um ein neues Projekt zu starten?

```bash
npm init -y
```

---

### 2 Welche Pakete muss ich installieren, um LangChain mit OpenAI und TypeScript in meinem Projekt zu verwenden?

```bash
npm install langchain openai dotenv
npm install -D typescript ts-node
npm install @langchain/community
```

---

### 3 Wie kann ich eine TypeScript-Konfigurationsdatei für mein Projekt erstellen?



```bash
npx tsc --init
```

---

### 4 Wo speichere ich meinen OpenAI API-Schlüssel und wie lade ich ihn in meinem Projekt?


Speichere den API-Schlüssel in einer `.env`-Datei:

```env
OPENAI_API_KEY=dein-openai-api-schlüssel
```

---

### 5 Wie sollte die Verzeichnisstruktur für mein LangChain-Projekt aussehen?



```
markdown-qa/
├─ markdown/               # Hier legst du deine .md-Dateien ab
├─ index.ts                # Hauptlogik (die wir erstellen)
├─ .env                    # Deine OpenAI API-Key
├─ package.json
└─ tsconfig.json           # TypeScript Config
```

---

### 6 Wie lade ich Markdown-Dateien in LangChain, um sie weiter zu verarbeiten?


Verwende `DirectoryLoader` zum Laden der Markdown-Dateien:

```ts
const loader = new DirectoryLoader("./markdown", {
  ".md": (path) => fs.promises.readFile(path, "utf-8").then(content => ({
    pageContent: content,
    metadata: { source: path }
  }))
});
```

---

### 7 Wie zerlege ich große Texte in kleinere Chunks, um sie effizienter verarbeiten zu können?


Nutze den `RecursiveCharacterTextSplitter`, um Texte in kleinere Abschnitte zu unterteilen:

```ts
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
});
const splitDocs = await splitter.splitDocuments(docs);
```

---

### 8 Wie erstelle ich einen Vektor-Store mit LangChain, um meine Dokumente zu speichern und später darauf zuzugreifen?


Verwende `Chroma`, um Vektoren aus den Dokumenten zu erstellen und zu speichern:

```ts
const vectorStore = await Chroma.fromDocuments(
  splitDocs,
  new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
  {
    collectionName: "markdown-docs",
    path: "./chroma", // lokal speichern
  }
);
```

---

### 9 Wie richte ich das `readline`-Modul ein, um Benutzereingaben in der Konsole zu ermöglichen?


Nutze das `readline`-Modul von Node.js:

```ts
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

---

### 10 Wie fordere ich den Benutzer auf, eine Frage zu stellen, die anschließend vom System beantwortet wird?


Verwende `rl.question()`, um eine Eingabeaufforderung an den Benutzer zu stellen. `rl` ist die Instanz von `readline`, die die Benutzereingabe ermöglicht. Hier ein Beispiel:

```ts
rl.question("Bitte stelle eine Frage zu deinen Markdown-Dateien: ", (question) => {
  // Verarbeite die Frage
});
```

Der Benutzer gibt hier eine Frage ein, die im weiteren Verlauf vom Programm verarbeitet wird.

---

### 11 Wie kann ich GPT verwenden, um auf Basis der Markdown-Dateien und einer Frage eine Antwort zu generieren?


Schicke die relevante Kontextinformation und die Benutzerfrage an GPT:

```ts
const response = await model.call([
  { role: "system", content: "Beantworte Fragen basierend auf folgendem Kontext:" },
  { role: "user", content: `${context}\n\nFrage: ${question}` },
]);
```

---

### 12 Wie starte ich das TypeScript-Projekt nach der Kompilierung?



1. Kompiliere das TypeScript-Projekt:

   ```bash
   npx tsc
   ```
2. Starte das Projekt:

   ```bash
   node dist/index.js
   ```

---

### 13 Wie gebe ich die Antwort von GPT in der Konsole aus?


Verwende `console.log()` zur Ausgabe:

```ts
console.log("\n🧠 Antwort:");
console.log(response.text);
```

---

### 14 Wie kann ich das `readline`-Interface nach der Eingabe des Benutzers schließen?


Nutze `rl.close()`, um das Interface zu schließen:

```ts
rl.close();
```

---

### 15 Was mache ich, wenn der Vektor-Store nicht korrekt erstellt wird oder wenn ich Probleme beim Laden habe?


Lösche den Vektor-Store-Ordner, um einen Neustart zu erzwingen:

```bash
rm -rf ./chroma
```

---

### 16 Was ist der Zweck des `chunkSize`-Parameters im `RecursiveCharacterTextSplitter`?


Der `chunkSize` bestimmt, wie groß jedes Textstück maximal sein darf. Ein kleinerer Wert sorgt für präzisere Ergebnisse, da GPT weniger Text auf einmal verarbeiten muss.

---

### 17 Wie kann ich die Frage des Benutzers an das System anpassen, wenn ich eine neue Frage stellen möchte?


Ändere die Variable `question`, um die gewünschte Frage zu stellen:

```ts
const question = "Was steht in meinen Notizen zu Promises in JavaScript?";
```

---
