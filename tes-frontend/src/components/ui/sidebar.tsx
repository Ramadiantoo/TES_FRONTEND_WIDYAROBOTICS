// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils'; // Assuming you have a utility for class merging

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r bg-card text-card-foreground p-4 sticky top-0 left-0">
      <div className="mb-8 mt-2">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary-foreground transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M17.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M12.5 6.5A3.5 3.5 0 1 0 12.5 0 3.5 3.5 0 0 0 12.5 6.5Z" />
            <path d="M7.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M17.5 6.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M12.5 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M7.5 6.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
            <path d="M17.5 12V3" />
            <path d="M7.5 12V3" />
            <path d="M12.5 12V3" />
            <path d="M17.5 21V12" />
            <path d="M7.5 21V12" />
            <path d="M12.5 21V12" />
          </svg>
          Tracker
        </Link>
      </div>
      <nav className="flex flex-col space-y-1 flex-grow">
        <Button
          asChild
          variant="ghost"
          className={cn(
            "w-full justify-start text-base py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground",
            location.pathname === '/' && "bg-muted text-primary-foreground font-semibold"
          )}
        >
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-5 w-5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Dashboard
          </Link>
        </Button>
        {/* Add more navigation links here if needed in the future */}
        {/*
        <Button
          asChild
          variant="ghost"
          className={cn(
            "w-full justify-start text-base py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground",
            location.pathname === '/settings' && "bg-muted text-primary-foreground font-semibold"
          )}
        >
          <Link to="/settings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-5 w-5"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.73l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.73l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </Link>
        </Button>
        */}
      </nav>
      <Separator className="my-6" />
      <div className="text-sm text-muted-foreground mt-auto">
        <p>&copy; {new Date().getFullYear()} Vehicle Tracker</p>
        <p>All rights reserved.</p>
      </div>
    </aside>
  );
};

export default Sidebar;