
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Star, Users, CheckCircle } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  points: number;
  time_estimate: string;
  type: 'manual' | 'automated' | 'exploratory';
}

interface ChallengeCardProps {
  challenge: Challenge;
  onStart: (id: string) => void;
  isCompleted?: boolean;
  completedCount?: number;
}

const ChallengeCard = ({ challenge, onStart, isCompleted, completedCount = 0 }: ChallengeCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante':
        return 'from-green-400 to-green-600';
      case 'Intermediário':
        return 'from-yellow-400 to-orange-500';
      case 'Avançado':
        return 'from-red-400 to-red-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manual':
        return '🔍';
      case 'automated':
        return '🤖';
      case 'exploratory':
        return '🧭';
      default:
        return '📋';
    }
  };

  return (
    <Card className={`p-6 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${isCompleted ? 'border-green-200 bg-green-50/50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getTypeIcon(challenge.type)}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          {isCompleted && (
            <CheckCircle className="w-5 h-5 text-green-600" />
          )}
        </div>
        <div className="flex items-center space-x-1 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold">{challenge.points}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{challenge.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{challenge.time_estimate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{completedCount} completaram</span>
        </div>
      </div>
      
      <Button 
        onClick={() => onStart(challenge.id)}
        className={`w-full ${isCompleted 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        } text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300`}
        disabled={isCompleted}
      >
        {isCompleted ? 'Concluído' : 'Iniciar Desafio'}
      </Button>
    </Card>
  );
};

export default ChallengeCard;
