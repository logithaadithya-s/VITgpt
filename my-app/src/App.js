// src/App.js
import React from 'react';
import './App.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function App() {
  return (
    <div className="contact-wrapper">
      <nav className="navbar">
        <ul>
          <li className="active">Contact</li>
        </ul>
      </nav>

      <header className="contact-header">
        <p>Get in Touch</p>
        <h1>Contact</h1>
      </header>

      <main className="contact-container">
        <section className="left-info">
          <div className="info-box">
            <FaPhoneAlt className="icon" />
            <span>+8801231</span>
          </div>
          <div className="info-box">
            <FaEnvelope className="icon" />
            <span>vitgpt@gmail.com</span>
          </div>
          <div className="info-box">
            <FaMapMarkerAlt className="icon" />
            <span>VIT, Vellore, India</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
