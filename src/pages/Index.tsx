
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserStats from '@/components/UserStats';
import ChallengeCard from '@/components/ChallengeCard';
import BugSimulation from '@/components/BugSimulation';
import Tutorial from '@/components/Tutorial';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useChallenges } from '@/hooks/useChallenges';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  const { user, loading: authLoading } = useAuth();
  const { challenges, progress, isLoading, startChallenge, isStarting } = useChallenges();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleStartChallenge = (challengeId: string) => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para iniciar desafios.",
        variant: "destructive",
      });
      return;
    }

    console.log('Starting challenge:', challengeId);
    startChallenge(challengeId, {
      onSuccess: () => {
        toast({
          title: "Desafio iniciado!",
          description: "Boa sorte em seu desafio de QA!",
        });
      },
      onError: (error: any) => {
        console.error('Failed to start challenge:', error);
        toast({
          title: "Erro ao iniciar desafio",
          description: "Tente novamente em alguns instantes.",
          variant: "destructive",
        });
      },
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="w-12 h-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  // Get completed challenge IDs for current user
  const completedChallengeIds = new Set(
    progress?.filter(p => p.completed).map(p => p.challenge_id) || []
  );

  // Calculate completion count for each challenge (mock data for now)
  const getChallengeCompletionCount = (challengeId: string) => {
    // This would come from a real query in production
    return Math.floor(Math.random() * 1000) + 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Bem-vindo à <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">QA Academy</span>
          </h1>
          <p className="text-xl text-gray-600">
            Aprenda Quality Assurance de forma prática e divertida através de desafios gamificados
          </p>
        </div>

        <UserStats />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
            <TabsTrigger value="simulation">Simulação</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Desafios Disponíveis</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Filtrar por Dificuldade</Button>
                <Button variant="outline">Filtrar por Tipo</Button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : challenges && challenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    onStart={handleStartChallenge}
                    isCompleted={completedChallengeIds.has(challenge.id)}
                    completedCount={getChallengeCompletionCount(challenge.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Nenhum desafio encontrado.</p>
                <p className="text-sm text-gray-500 mt-2">Verifique se o banco de dados está configurado corretamente.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="simulation">
            <BugSimulation />
          </TabsContent>

          <TabsContent value="tutorial">
            <Tutorial />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
