import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <section id="about">
            <h2>Про нас</h2>
            <p>Ми є провідною платформою з прокату автомобілів, що надає доступні та надійні транспортні рішення.</p>
            <p>Зв'яжіться з нами: <a href="mailto:info@example.com">info@example.com</a></p>
            <p>Телефон: +380 50 123 45 67</p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.8015763247126!2d23.6560741!3d49.6327173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473afe6ca4134c71%3A0xc7a92e90f89475ae!2z0J_QvtC70YLQsNC90L3QuNGP0YDQtdGC0L3Ri9C5INGC0LDQsdCw0L3QuNC10L3RgdGM0LrQuNC5INCjLiwgODE1NjE!5e0!3m2!1suk!2sua!4v1714850202963!5m2!1suk!2sua"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Map"
            />
        </section>
    );
}

export default About;