

<h1>Indice</h1>

<div>
  <a href="#requisitosFuncionais">Requisitos Funcionais</a>
  <a href="#requisitosNaoFuncionais">Requisitos Não Funcionais</a>
</div>







<h1 id ="requisitosFuncionais">Requisitos Funcionais</h1>

<div>
  <h2>RF001 - O SISTEMA DEVE SER CAPAZ DE REGISTRAR USUÁRIOS</h2>
  <p>Descrição: o sistema deve permitir a criação de uma conta para novos usuários no sistema. O usuário deverá fornecer informações como endereço de e-mail, senha e confirmação de senha.</p>

  <p>Critérios de Aceitação:</p>

  <ul>
    <li>O sistema deve impedir o cadastro de e-mails duplicados.</li>
    <li>O sistema deve enviar um email com um código para confirmação do email.</li>
    <li>O cadastro deve ser bem-sucedido após o preenchimento correto dos campos obrigatórios e a confirmação do email.</li>
  </ul>

  <p>Prioridade: <strong>Alta</strong></p>

  <p>Concluido: <strong>false</strong></p>

##
</div>


<div>
  <h2>RF002 - O SISTEMA DEVE SER CAPAZ DE LOGAR USUÁRIOS</h2>
  <p>Descrição: O sistema deve permitir que usuários loguem com um endereço de e-mail e senha previamente cadastrados. A autenticação deve ser segura, utilizando criptografia para a senha e tokens (como JWT) para manter a sessão ativa durante a navegação.</p>

  <p>Critérios de Aceitação:</p>

  <ul>
    <li>O login deve ser bem-sucedido quando o e-mail e a senha estiverem corretos.</li>
    <li>Dados sensiveis devem ser criptografados </li>
    <li>O sistema deve exibir uma mensagem de erro se as credenciais estiverem incorretas.</li>
  </ul> 

  <p>Prioridade: <strong>Alta</strong></p>
  
  <p>Concluido: <strong>false</strong></p>

##
</div>

<div>
  <h2>RF003 - O SISTEMA DEVE SER CAPAZ DE DELETAR USUÁRIOS</h2>
  <p>Descrição: O sistema deve permitir que os administradores excluam qualquer usuário da plataforma e que usuários consigam excluir a própria conta. Isso deve ser feito de forma segura, com uma confirmação da exclusão para evitar remoções acidentais.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema solicita uma confirmação antes de deletar um usuário.</li>
    <li>O usuário é excluído corretamente, retornando uma mensagem de sucesso.</li>
  </ul> 

  <p>Prioridade: <strong>Alta</strong></p>

  <p>Concluido: <strong>false</strong></p>

##
</div>

<div>
  <h2>RF004 - O SISTEMA DEVE SER CAPAZ DE ATUALIZAR DADOS PARA A COMPRA</h2>
  <p>Descrição: O sistema deve permitir que usuários atualizem suas informações cadastrais antes de uma compra, como nome, endereço, telefone, entre outros. Isso deve ser feito de maneira simples, com a possibilidade de editar qualquer informação armazenada.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O usuário pode atualizar suas informações de compra com sucesso.</li>
    <li>Dados novos devem ser verificados e válidos.</li>
    <li>Caso o usuário tenha um pedido em aberto, o sistema informará que o produto chegará no destino antigo.</li>
  </ul>

  <p>Prioridade: <strong>Alta</strong></p>
  
  <p>Concluido: <strong>false</strong></p>

##
</div>
<div>
  <h2>RF005 - O SISTEMA DEVE POSSIBILITAR A ALTERAÇÃO DE SENHA</h2>
  
  <p>Descrição: O sistema deve permitir que o usuário altere sua senha sempre que desejar, desde que informe a senha atual para validação e confirme o codigo enviado para seu e-mail.</p>
  
  <p>Critérios de Aceitação:</p>
  
  <ul>
    <li>O sistema solicita a senha atual antes de permitir a alteração.</li>
    <li>O sistema envia um código de verificação ao e-mail do usuário.</li>
    <li>O sistema valida a nova senha e exibe uma mensagem de sucesso ou erro.</li>
  </ul> 
  
  <p>Prioridade: <strong>Alta</strong></p>
  
  <p>Concluido: <strong>false</strong></p>

##
</div>

<div> 
  <h2>RF006 - O SISTEMA DEVE POSSIBILITAR A ALTERAÇÃO DE EMAIL</h2>
  <p>Descrição: O sistema deve possibilitar que o usuário atualize seu endereço de e-mail. Após a alteração, o sistema deve enviar um e-mail de confirmação para o novo endereço, para garantir a veracidade da mudança.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema envia um e-mail de confirmação ao novo e-mail após a alteração.</li>
    <li>O sistema impede a alteração do e-mail para um endereço já registrado.</li>
  </ul> 
  <p>Prioridade: <strong>Média</strong></p> 
  
  <p>Concluido: <strong>false</strong></p>  
  ##
</div>
<div>
  <h2>RF007 - O SISTEMA DEVE DIFERENCIAR ADMINS DE USUÁRIOS PADRÃO</h2>
  <p>Descrição: O sistema deve permitir a diferenciação entre usuários comuns e administradores, com permissões distintas. Administradores terão acesso a funcionalidades restritas, como gerenciamento de produtos, usuários e pedidos.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema garante que administradores tenham acesso ao painel de administração.</li>
    <li>Usuários padrão não têm acesso a funcionalidades exclusivas de administradores.</li>
  </ul> 
  <p>Prioridade: <strong>Alta</strong></p>
  
  <p>Concluido: <strong>false</strong></p>

##
</div>

<div>
  <h2>RF008 - O SISTEMA DEVE SER CAPAZ DE CADASTRAR PRODUTOS</h2>
  <p>Descrição: O sistema deve permitir que administradores cadastrem novos produtos, fornecendo informações como nome, descrição, preço, categoria, imagens, e quantidade em estoque.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O produto é salvo corretamente no banco de dados após o cadastro.</li>
    <li>O sistema valida campos obrigatórios, como nome, preço e descrição.</li>
  </ul> 
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF009 - O SISTEMA DEVE FORNECER BUSCA AVANÇADA DE PRODUTOS</h2>
  <p>Descrição: O sistema deve permitir que os usuários busquem produtos utilizando filtros avançados como categoria, preço, cor, tamanho, etc. A busca deve ser rápida e eficiente, retornando resultados relevantes.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema retorna resultados relevantes de acordo com os filtros aplicados.</li>
    <li>A busca deve ser responsiva e rápida.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF010 - O SISTEMA DEVE POSSIBILITAR USUÁRIOS FAVORITAREM PRODUTOS</h2>
  <p>Descrição: Os usuários devem ser capazes de marcar produtos como favoritos, criando uma lista personalizada. O botão de "favoritar" deve alterar seu estado para indicar que o produto foi favoritado.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema permite adicionar e remover produtos da lista de favoritos.</li>
    <li>A lista de favoritos é salva no banco de dados e acessível ao usuário em seu perfil.</li>
  </ul> 
  <p>Prioridade: <strong>Média</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF011 - O SISTEMA DEVE POSSIBILITAR USUÁRIOS COMPRAR PRODUTOS</h2>
  <p>Descrição: O sistema deve permitir que os usuários adicionem produtos ao carrinho e finalizem a compra. O processo de compra incluirá a escolha do endereço, método de pagamento e a confirmação do pedido.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O usuário pode finalizar a compra com sucesso após preencher os detalhes necessários.</li>
    <li>O sistema processa o pagamento e confirma o pedido.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF012 - O SISTEMA DEVE POSSUIR UM CARRINHO DE COMPRAS</h2>
  <p>Descrição: O sistema deve possuir um carrinho de compras onde o usuário pode adicionar, remover ou editar a quantidade dos itens selecionados. O carrinho deve ser persistente, ou seja, o conteúdo deve ser mantido mesmo que o usuário saia da página e volte depois.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O carrinho salva as informações dos produtos selecionados e as guarda no localStorage.</li>
    <li>O usuário pode editar o carrinho a qualquer momento, removendo ou adicionando itens.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF013 - O SISTEMA DEVE POSSIBILITAR QUE O CARRINHO DE COMPRAS SOME OS VALORES DOS PRODUTOS SELECIONADOS</h2>
  <p>Descrição: O sistema deve calcular automaticamente o total do carrinho, somando os preços dos produtos selecionados. O cálculo deve ser feito em tempo real, considerando eventuais descontos ou promoções aplicadas.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O valor total do carrinho é calculado corretamente.</li>
    <li>O cálculo deve ser atualizado automaticamente ao adicionar ou remover produtos.</li>
  </ul> 
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF014 - O SISTEMA DEVE CHECAR O ESTOQUE DOS PRODUTOS</h2>
  <p>Descrição: O sistema deve verificar se há unidades suficientes de um produto em estoque antes de permitir que o usuário finalize a compra. Caso o estoque esteja baixo ou esgotado, o sistema deve notificar o usuário.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema impede a compra de produtos fora de estoque.</li>
    <li>O sistema exibe uma mensagem de aviso quando o estoque estiver baixo.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF015 - O SISTEMA DEVE POSSUIR UM HISTÓRICO DE COMPRAS</h2>
  <p>Descrição: O sistema deve registrar no banco de dados os produtos que foram comprados pelos usuários.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O usuário consegue acessar compras pendentes, concluídas e canceladas.</li>
    <li>O usuário consegue acessar dados das compras.</li>
    <li>Os dados sensíveis do cartão de crédito são os 3 últimos números.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF016 - O SISTEMA DEVE PERMITIR O ACOMPANHAMENTO DE PEDIDOS</h2>
  <p>Descrição: O sistema deve possibilitar que usuarios acompanhem produtos comprados, desde o status da compra até a localização do produto.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O usuario consegue acessar o status de sua compra</li>
    <li>O usuario consegue ver onde esta seu produto</li>
  </ul>
  <p>Prioridade: <strong>Baixa</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF017 - O SISTEMA DEVE POSSUIR UM SISTEMA DE AVALIAÇÃO DE PRODUTOS</h2>
  <p>Descrição: O sistema deve permitir que usuarios logados avaliem produtos e essas avaliações devem ser mantidas no banco de dados até que o usuario decida excluir a avaliação. </p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O usuario consegue avaliar produtos comprados</li>
    <li>Somente usuários logados conseguem avaliar produtos</li>
    <li>Produtos avaliados permanecem avaliados até que o usuário exclua a avaliação</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF018 - O SISTEMA DEVE PERMITIR O CANCELAMENTO DE PEDIDOS</h2>
  <p>Descrição: </p>
  <p>Critérios de Aceitação:O sistema deve permitir o cancelamento de pedidos em aberto que não foram enviados ainda, caso o produto ja tenha sido enviado o sistema deve gerar uma notificação pedindo para que o usuário mande o produto pelos correios.</p>
  <ul>
    <li>O usuário consegue cancelar sua compra</li>
    <li>O usuário é reembolsado</li>
    <li>O status do produto é alterado para cancelado</li>
    <li>O sistema envia uma confirmação de cancelamento ao usuário.</li>
    <li>Caso o produto já tenha sido enviado, o sistema deverá gerar uma notificação solicitando que o usuário devolva o item pelos correios.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF019 - O SISTEMA DEVE GARANTIR A SEGURANÇA DAS INFORMAÇÕES PESSOAIS</h2>
  <p>Descrição: O sistema não deve expor informações pessoais de usuarios para outros usuarios </p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema não expõe dados sensiveis de usuarios para outros usuarios como cartão de credito,email, senha e endereço</li>
    <li>O sistema criptografa os dados antes de enviar requisições ou salvar no banco de dados</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
## 
</div>
<div>
  <h2>RF020 - O SISTEMA DEVE APLICAR DESCONTOS E PROMOÇÕES A PRODUTOS</h2>
  <p>Descrição: o sistema deve ser capaz de mostrar produtos já com desconto aplicados </p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>Os produtos aparecem com descontos</li>
    <li>Os cupons utilizados são mostrados</li>
    <li>Promoções aparecem na pagina de promoções</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##
</div>

<div>
  <h2>RF021 - O SISTEMA DEVE PERMITIR O ARMAZENAMENTO DE DADOS DE PAGAMENTO</h2>
  <p>Descrição: O sistema deve armazenar os dados de pagamento de forma segura </p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>Os dados salvos são criptografados</li>
    <li>Os dados do usuário são salvos caso o usuário permita</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RF022 - O SISTEMA DEVE POSSUIR UM SUPORTE AO CLIENTE ONLINE</h2>
  <p>Descrição: O sistema deve possuir um SAC (Serviço de Atendimento ao Consumidor) para solucionar possiveis dúvidas e orientar os clientes o SAC será um atendimento em chat por whatsapp ou email </p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O SAC responde dúvidas dos clientes dentro de 3 dias úteis </li>
    <li>O SAC envia email aos clientes avisando q seu produto está chegando</li>
    <li>O SAC envia mensagem aos clientes por wpp caso necessário</li>
    <li>O SAC mantém um historico de conversa com o cliente</li>
  </ul>
  <p>Prioridade: <strong>Média</strong></p>
  <p>Concluido: <strong>false</strong></p>
  ##  
</div>

<h1 id ="requisitosNaoFuncionais">Requisitos Não Funcionais</h1>

<div>
  <h2>RNF001 - Desempenho do Sistema</h2>
  <p>Descrição: O sistema deve ser capaz de lidar com uma alta carga de acessos simultâneos .</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema deve ser capaz de suportar usuários simultâneos .</li>
  </ul>
  <p>Prioridade: <strong>Média</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF002 - Segurança dos Dados</h2>
  <p>Descrição: O sistema deve garantir a segurança dos dados dos usuários, protegendo informações sensíveis durante a transmissão e o armazenamento.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>Todos os dados sensíveis (como informações de pagamento e dados pessoais) devem ser criptografados .</li>
    <li>O sistema deve exigir autenticação de dois fatores para acessos administrativos.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF003 - Usabilidade e Acessibilidade</h2>
  <p>Descrição: O sistema deve oferecer uma experiência de usuário simples e intuitiva, além de ser acessível para pessoas com deficiências.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema deve ter uma interface amigável, permitindo que qualquer novo usuário realize tarefas básicas sem necessidade de treinamento.</li>
    <li>O sistema deve ser totalmente acessível para pessoas com deficiências.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF004 - Escalabilidade</h2>
  <p>Descrição: O sistema deve ser escalável para acomodar o crescimento do número de usuários e dados sem comprometer o desempenho.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema deve permitir a adição de novos servidores e recursos de forma fácil e sem interrupção do serviço.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF005 - Disponibilidade do Sistema</h2>
  <p>Descrição: O sistema deve garantir alta disponibilidade, minimizando períodos de inatividade.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema deve estar disponível 99,9% do tempo</li>
    <li>Em caso de falha, o sistema deve ter mecanismos de recuperação automática para minimizar o impacto para os usuários.</li>
  </ul>
  <p>Prioridade: <strong>Alta</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF006 - Compatibilidade entre Navegadores</h2>
  <p>Descrição: O sistema deve ser compatível com os navegadores mais usados, garantindo boa experiência de usuário independentemente da plataforma.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O sistema deve funcionar corretamente nas versões mais recentes do Google Chrome, Mozilla Firefox, Safari e Microsoft Edge.</li>
    <li>O sistema deve ser responsivo e adaptar-se adequadamente a diferentes tamanhos de tela, incluindo dispositivos móveis.</li>
  </ul>
  <p>Prioridade: <strong>Média</strong></p>
  <p>Concluido: <strong>false</strong></p>
##
</div>

<div>
  <h2>RNF007 - Manutenibilidade</h2>
  <p>Descrição: O sistema deve ser fácil de manter, com um código-fonte bem estruturado e documentado.</p>
  <p>Critérios de Aceitação:</p>
  <ul>
    <li>O código-fonte deve ser modular, permitindo que desenvolvedores adicionem ou modifiquem funcionalidades sem causar impacto nas demais partes do sistema.</li>
    <li>O código deve ser bem documentado, com comentários claros sobre a lógica de funcionamento e instruções para modificações futuras.</li>
  </ul>
  <p>Prioridade: <strong>Média</strong></p>
  <p>Concluido: <strong>false</strong></p>
##

</div>
