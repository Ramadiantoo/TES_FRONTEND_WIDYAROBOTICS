// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button'; // Pastikan path ini benar

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card text-card-foreground">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-foreground transition-colors">
            Vehicle Tracker
          </Link>
          <nav>
            <Button asChild variant="ghost">
              <Link to="/">Dashboard</Link>
            </Button>
            {/* Tambahkan link navigasi lain di sini jika diperlukan */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 py-8">
        {children}
      </main>

      {/* Footer (Opsional) */}
      {/* <footer className="border-t bg-card text-card-foreground p-4 text-center text-sm">
        &copy; 2025 Vehicle Tracker. All rights reserved.
      </footer> */}
    </div>
  );
};

export default Layout;