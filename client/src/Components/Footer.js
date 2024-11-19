import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">      
        
            <div className="logo-section">
            <img className='LogoFoo' alt=''></img>
            </div>

            <div className="info-section">
                <h2 style={{ color: "#004AAD" }}>ACERCA DE MINKY</h2>
                <p style={{ color: "black" }}>Minky Colombia</p>
                <p>Minky Colombia</p>
                <p>Términos y condiciones</p>
            </div>

            <div className="contact-section">
                <h2 style={{ color: "#004AAD" }}>CONTÁCTENOS</h2>
                <p>Teléfono: 3125487548</p>
                <p>Correo: minky_mascotas@gmail.com</p>
                <p>Ibagué, Colombia</p>
            </div>
        </footer>
    );
};

export default Footer;
