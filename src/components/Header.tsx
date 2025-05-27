
import React from 'react';
import { Trophy, User, BookOpen, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white p-6 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              QA Academy
            </h1>
            <p className="text-sm text-gray-300">Domine o Quality Assurance</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <BookOpen className="w-4 h-4 mr-2" />
            Tutorial
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Trophy className="w-4 h-4 mr-2" />
            Ranking
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
