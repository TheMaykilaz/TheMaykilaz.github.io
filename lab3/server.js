const express = require('express');
const path = require('path');
const admin = require('firebase-admin');
const cors = require('cors');

// Ініціалізація Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com'
});

const db = admin.firestore();
const app = express();

// Дозволяємо доступ до API з іншого домену (для фронтенду)
app.use(cors());

// Парсинг JSON
app.use(express.json());

// Шлях до каталогу build (створеного після `npm run build`)
const buildPath = path.join(__dirname, 'build');

// Видача статичних файлів React (JS, CSS, медіа тощо)
app.use(express.static(buildPath));

// API маршрут для отримання бронювань користувача
app.get('/api/bookings/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const bookingsRef = db.collection('bookings');
        const snapshot = await bookingsRef.where('userId', '==', userId).get();

        if (snapshot.empty) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    }
});

// API маршрут для видалення бронювання
app.delete('/api/bookings/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        await db.collection('bookings').doc(bookingId).delete();
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete booking' });
    }
});

// API маршрут для оновлення бронювання
app.put('/api/bookings/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const updatedBooking = req.body;

        await db.collection('bookings').doc(bookingId).update(updatedBooking);
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update booking' });
    }
});

// Будь-який GET запит — повертає index.html (щоб React Router працював)
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
