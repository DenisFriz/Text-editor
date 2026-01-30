## 💻 Local Setup

Follow these steps to run the project on your computer:

### 1. Clone the repository

```bash
git clone https://github.com/DenisFriz/Text-editor.git
cd text-tools
```

```bash
npm install
```

```bash
npm run dev
```

After running this, open your browser at:

```bash
http://localhost:5173/Text-editor/
```

Цей хук `useHistory` зберігає історію тексту, щоб можна було робити **undo** і **redo**. Для продуктивності він обмежує кількість збережених станів (за замовчуванням 10) і очищає майбутні стани після нових змін.

Що можна покращити: зберігати тільки різниці між станами для великих текстів і додати підтримку клавіш Ctrl+Z / Ctrl+Y.
