import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <Header />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}
