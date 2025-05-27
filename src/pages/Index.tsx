
import React, { useState } from 'react';
import Header from '@/components/Header';
import UserStats from '@/components/UserStats';
import ChallengeCard from '@/components/ChallengeCard';
import BugSimulation from '@/components/BugSimulation';
import Tutorial from '@/components/Tutorial';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('challenges');

  const challenges = [
    {
      id: 1,
      title: "Teste de Login Básico",
      description: "Valide os campos de login e senha, testando cenários positivos e negativos. Inclui testes de validação de email e força da senha.",
      difficulty: "Iniciante" as const,
      points: 100,
      timeEstimate: "15 min",
      completedBy: 1247,
      type: "manual" as const
    },
    {
      id: 2,
      title: "Automação com Selenium",
      description: "Crie scripts automatizados para testar fluxo de compra em e-commerce. Aprenda a configurar drivers e selecionar elementos.",
      difficulty: "Intermediário" as const,
      points: 250,
      timeEstimate: "45 min",
      completedBy: 843,
      type: "automated" as const
    },
    {
      id: 3,
      title: "Teste Exploratório de API",
      description: "Explore uma API REST sem documentação completa. Encontre endpoints não documentados e valide respostas inesperadas.",
      difficulty: "Avançado" as const,
      points: 400,
      timeEstimate: "60 min",
      completedBy: 321,
      type: "exploratory" as const
    },
    {
      id: 4,
      title: "Teste de Performance",
      description: "Analise o tempo de resposta de uma aplicação web sob diferentes cargas. Use ferramentas de monitoring para identificar gargalos.",
      difficulty: "Intermediário" as const,
      points: 300,
      timeEstimate: "30 min",
      completedBy: 567,
      type: "automated" as const
    },
    {
      id: 5,
      title: "Bug Hunting Challenge",
      description: "Encontre o máximo de bugs possível em uma aplicação real em 20 minutos. Técnicas de teste exploratório serão fundamentais.",
      difficulty: "Avançado" as const,
      points: 500,
      timeEstimate: "20 min",
      completedBy: 156,
      type: "exploratory" as const
    },
    {
      id: 6,
      title: "Testes de Usabilidade",
      description: "Avalie a experiência do usuário em uma interface móvel. Identifique problemas de acessibilidade e navegação.",
      difficulty: "Iniciante" as const,
      points: 150,
      timeEstimate: "25 min",
      completedBy: 934,
      type: "manual" as const
    }
  ];

  const handleStartChallenge = (challengeId: number) => {
    console.log(`Iniciando desafio ${challengeId}`);
    // Aqui seria implementada a lógica para iniciar o desafio
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onStart={handleStartChallenge}
                />
              ))}
            </div>
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
