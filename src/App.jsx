import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
    return (
        <div className="relative min-h-screen flex flex-col bg-background">
            <Header />
            <div className="flex-grow">
            </div>
            <Footer />
        </div>
    );
}

