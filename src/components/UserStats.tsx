
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Zap, Target, Award } from 'lucide-react';

const UserStats = () => {
  const stats = [
    {
      icon: Trophy,
      label: 'Pontuação Total',
      value: '2,450',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Target,
      label: 'Bugs Encontrados',
      value: '127',
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Zap,
      label: 'Streak Atual',
      value: '15 dias',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Award,
      label: 'Nível Atual',
      value: 'QA Senior',
      color: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UserStats;
