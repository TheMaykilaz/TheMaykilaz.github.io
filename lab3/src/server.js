const express = require('express');
const path = require('path');
const app = express();

// Шлях до каталогу build (створеного після `npm run build`)
const buildPath = path.join(__dirname, 'build');

// Видача статичних файлів React (JS, CSS, медіа тощо)
app.use(express.static(buildPath));

// Будь-який GET запит — повертає index.html (щоб React Router працював)
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
