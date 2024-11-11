import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">      
        
            <div className="logo-section">
            <img className='LogoFoo' alt=''></img>
            </div>

            <div className="info-section">
                <h2>ACERCA DE MINKY</h2>
                <p>Minky Colombia</p>
                <p>Minky Colombia</p>
                <p>Términos y condiciones</p>
            </div>

            <div className="contact-section">
                <h2>CONTÁCTENOS</h2>
                <p>Teléfono: 3125487548</p>
                <p>Correo: minky_mascotas@gmail.com</p>
                <p>Ibagué, Colombia</p>
            </div>
        </footer>
    );
};

export default Footer;
