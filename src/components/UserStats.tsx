
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Zap, Target, Award } from 'lucide-react';
import { useUserStats } from '@/hooks/useUserStats';
import { Skeleton } from '@/components/ui/skeleton';

const UserStats = () => {
  const { stats, isLoading } = useUserStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statsData = [
    {
      icon: Trophy,
      label: 'Pontuação Total',
      value: stats.total_score.toLocaleString(),
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Target,
      label: 'Bugs Encontrados',
      value: stats.bugs_found.toString(),
      color: 'from-red-400 to-pink-500'
    },
    {
      icon: Zap,
      label: 'Streak Atual',
      value: `${stats.current_streak} dias`,
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Award,
      label: 'Nível Atual',
      value: stats.current_level,
      color: 'from-green-400 to-teal-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
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
