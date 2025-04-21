import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                setError('❌ Неправильний пароль. Спробуйте ще раз.');
            } else if (err.code === 'auth/user-not-found') {
                setError('❌ Користувача з такою поштою не знайдено.');
            } else {
                setError('⚠️ Сталася помилка при вході.');
            }
        }
    };

    return (
        <section>
            <h2>Вхід</h2>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Увійти</button>
            </form>
        </section>
    );
}

export default Login;
