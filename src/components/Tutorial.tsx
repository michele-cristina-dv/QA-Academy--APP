
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "O que é Quality Assurance?",
      content: "Quality Assurance (QA) é o processo de garantir que um produto ou serviço atenda aos requisitos especificados e funcione conforme esperado. É fundamental para entregar software de qualidade.",
      example: "Exemplo: Verificar se um botão de 'Comprar' realmente adiciona o item ao carrinho."
    },
    {
      title: "Tipos de Teste",
      content: "Existem diferentes tipos de teste: Manuais (executados por humanos), Automatizados (executados por scripts), Funcionais (testam funcionalidades) e Não-funcionais (testam performance, segurança).",
      example: "Teste Manual: Clicar em todos os botões manualmente. Teste Automatizado: Script que clica automaticamente."
    },
    {
      title: "Encontrando Bugs",
      content: "Um bug é um erro no software. Para encontrá-los, teste cenários diferentes, use dados inválidos, e sempre questione: 'E se...?'",
      example: "E se eu inserir letras no campo de idade? E se clicar duas vezes seguidas no botão?"
    },
    {
      title: "Documentação de Bugs",
      content: "Sempre documente bugs encontrados com: Passos para reproduzir, resultado esperado vs obtido, evidências (prints), e severidade do problema.",
      example: "Bug: Login falha. Passos: 1. Inserir email válido 2. Inserir senha 3. Clicar entrar. Resultado: Erro 500."
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex items-center space-x-3 mb-6">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tutorial Interativo de QA</h2>
          <p className="text-gray-600">Aprenda os fundamentos do Quality Assurance</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Passo {currentStep + 1} de {steps.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% completo
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {steps[currentStep].title}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {steps[currentStep].content}
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-blue-800">
            <strong>💡 {steps[currentStep].example}</strong>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          onClick={prevStep}
          disabled={currentStep === 0}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Anterior</span>
        </Button>
        
        {currentStep === steps.length - 1 ? (
          <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white">
            Concluir Tutorial
          </Button>
        ) : (
          <Button 
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
          >
            <span>Próximo</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Tutorial;
