// src/components/Layout.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  IoSearchOutline,
  IoPrintOutline,
  IoGridOutline,
  IoMapOutline,
  IoDocumentTextOutline,
  IoInformationCircleOutline,
  IoMenu
} from 'react-icons/io5';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarContent: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="https://via.placeholder.com/40x40/007bff/ffffff?text=TC" alt="Logo Perusahaan Taksi" />
          <AvatarFallback>VT</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-xl font-bold">Vehicle Tracker</span>
          <span className="text-sm text-gray-400">Indonesia</span>
        </div>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        <Link to="/" className="w-full">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-200">
            <IoGridOutline className="mr-3 text-xl" />
            Dashboard
          </Button>
        </Link>

        <Link to="#" className="w-full">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-200">
            <IoMapOutline className="mr-3 text-xl" />
            Lorem Ipsum
          </Button>
        </Link>
        <Link to="#" className="w-full">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-200">
            <IoDocumentTextOutline className="mr-3 text-xl" />
            Lorem Ipsum
          </Button>
        </Link>
        <Link to="#" className="w-full">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-blue-600 hover:text-white transition-colors duration-200">
            <IoInformationCircleOutline className="mr-3 text-xl" />
            Lorem Ipsum
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-700 bg-gray-900 flex flex-col items-center">
        <Avatar className="w-20 h-20 mb-3 border-2 border-blue-500">
          <AvatarImage src="https://via.placeholder.com/80" alt="Avatar Pengguna" />
          <AvatarFallback>LI</AvatarFallback>
        </Avatar>
        <p className="text-white font-semibold text-lg">Lorem Ipsum</p>
        <p className="text-gray-400 text-sm">Lorem Ipsum@gmail.com</p>
      </div>
      </div>
  );
};


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">

      <aside className="w-64 bg-gray-800 text-white flex-col shadow-lg hidden md:flex">
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800 mr-2">
                  <IoMenu className="text-2xl" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-gray-800 text-white">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold text-gray-800">Tracking Dashboard</h1>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 hidden md:block">Tracking Dashboard</h1>

          <div className="flex items-center space-x-4">
            <p className="text-gray-600 hidden sm:block">Tracker Corporation</p>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <IoSearchOutline className="text-2xl" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
              <IoPrintOutline className="text-2xl" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;