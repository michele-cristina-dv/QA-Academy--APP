
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bug, CheckCircle, XCircle } from 'lucide-react';

const BugSimulation = () => {
  const [foundBugs, setFoundBugs] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const bugs = [
    { id: 1, element: 'login-button', description: 'Botão de login não responde ao clique' },
    { id: 2, element: 'search-field', description: 'Campo de busca aceita caracteres especiais inválidos' },
    { id: 3, element: 'price-display', description: 'Preço exibido com formatação incorreta' }
  ];

  const handleBugFound = (bugId: number) => {
    if (!foundBugs.includes(bugId)) {
      setFoundBugs([...foundBugs, bugId]);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="flex items-center space-x-3 mb-6">
        <Bug className="w-8 h-8 text-red-400" />
        <div>
          <h2 className="text-2xl font-bold">Simulação de Aplicação</h2>
          <p className="text-gray-300">Encontre os bugs escondidos nesta aplicação simulada</p>
        </div>
      </div>

      {/* Aplicação Simulada */}
      <div className="bg-white text-black rounded-lg p-6 mb-6">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold">E-commerce Demo</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Área de Login */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Login</h4>
            <input 
              type="text" 
              placeholder="Email" 
              className="w-full p-2 border rounded mb-2"
            />
            <input 
              type="password" 
              placeholder="Senha" 
              className="w-full p-2 border rounded mb-3"
            />
            <Button 
              className="w-full opacity-50 cursor-not-allowed"
              onClick={() => handleBugFound(1)}
            >
              Entrar
            </Button>
          </div>

          {/* Área de Busca */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Buscar Produtos</h4>
            <input 
              type="text" 
              placeholder="Digite sua busca... @@##$$"
              className="w-full p-2 border rounded mb-3"
              onClick={() => handleBugFound(2)}
            />
            <Button className="w-full">Buscar</Button>
          </div>

          {/* Produto */}
          <div className="border rounded-lg p-4 md:col-span-2">
            <h4 className="font-semibold mb-3">Produto em Destaque</h4>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded"></div>
              <div>
                <h5 className="font-medium">Smartphone XYZ</h5>
                <p 
                  className="text-lg font-bold text-red-500 cursor-pointer"
                  onClick={() => handleBugFound(3)}
                >
                  Preço: R$ 1.234,567.89
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status dos Bugs */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3">Bugs Encontrados: {foundBugs.length}/3</h3>
        <div className="space-y-2">
          {bugs.map((bug) => (
            <div key={bug.id} className="flex items-center space-x-3">
              {foundBugs.includes(bug.id) ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-gray-500" />
              )}
              <span className={foundBugs.includes(bug.id) ? 'text-green-400' : 'text-gray-400'}>
                {bug.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
      >
        Finalizar Teste
      </Button>

      {showResults && (
        <Alert className="mt-4 bg-green-900/20 border-green-500">
          <AlertDescription>
            Parabéns! Você encontrou {foundBugs.length} de 3 bugs. 
            Pontuação: {foundBugs.length * 100} pontos!
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
};

export default BugSimulation;
