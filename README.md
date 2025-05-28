Bem-vindo ao  projeto da QA Academy - Welcome to the QA Academy project- 
Informações do Projeto: 
Este projeto foi criado com o objetivo de ajudar estudantes de QA (como eu) a entender, de forma prática, como funciona o trabalho de um analista de qualidade — por meio de uma aplicação simples e funcional, simulando cenários reais de testes.

Tecnologias Utilizadas
Este projeto foi desenvolvido com as seguintes tecnologias:

Vite
TypeScript
React
shadcn-ui
Tailwind CSS

 Documentação de Testes – Bug Report
 Ambiente de Testes - Navegador (localhost)

App rodando localmente via Node.js

Backend: Supabase (autenticação com verificação de e-mail)

 Fluxo de Cadastro e Login

Comportamento esperado: O usuário precisa se cadastrar antes de fazer login.

Validação: O campo de e-mail exige um endereço real, pois o Supabase envia uma verificação por e-mail.

* BUG 1 – Falta de feedback claro para e-mail inválido
Quando um e-mail incorreto é inserido, não há mensagem visível de erro.

--- Melhoria sugerida: Exibir mensagem como "E-mail inválido" ou "Por favor, insira um e-mail válido".

* BUG 2 – Campo de senha sem validação mínima
Qualquer valor é aceito (ex: "123").

--- Melhoria sugerida: Adicionar validação como "mínimo 6 caracteres" ou exigir pelo menos 1 letra e 1 número.

Teste Funcional – Tela de Testes Interativos
O botão "Iniciar teste" aparece normalmente.

Ao clicar, exibe apenas a mensagem: “Teste iniciado com sucesso”.

* BUG 3 – Nenhuma interação real após o clique
Nenhum teste é carregado após clicar no botão.

!!!! Causa provável: Falta de integração com API ou lógica de testes inexistente no backend.

--- Melhoria sugerida: Adicionar uma lógica de perguntas e respostas simuladas, ou conectar a uma API real de testes.

 Relatório Final – Funcionalidades Verificadas
 Login: Funciona apenas com e-mail real + senha válida
 Logout: Realiza a saída corretamente

!!!! Limitações:

Não há opção de recuperação de senha

Falta o botão "lembrar-me"

Não há login via redes sociais

