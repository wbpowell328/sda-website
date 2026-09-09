---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 11: Gestão de cadeia de suprimentos II: O jogo da cerveja"
permalink: /sdam/pt-BR/chapter-11/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: f0d9a39d57818789
---


{% raw %}
## Visão geral do capítulo

O jogo da cerveja é um clássico no ensino de gestão de cadeia de suprimentos. Nós o abordamos como um problema multiagente geral, no qual cada fornecedor no jogo da cerveja é modelado como um agente separado. Esta apresentação estende a base que estabelecemos no [Capítulo 10](/sdam/pt-BR/chapter-10/), com a complicação adicional de que os agentes estão enviando tanto informação (pedidos de cerveja) quanto recursos físicos (cerveja).

O capítulo mantém a modelagem da incerteza bastante simples. Em vez disso, exploramos uma série de políticas paramétricas simples, mas aproveitamos esta oportunidade para introduzir crenças que um agente tem sobre a informação que outro agente pode ter (neste caso, sobre pedidos em atraso). Em seguida, apresentamos uma ilustração da conhecida política de "ancoragem e ajuste" (anchor-and-adjustment), introduzida primeiramente por dois renomados cientistas da decisão, Daniel Kahneman e Amos Tversky, adaptada ao contexto do jogo da cerveja. Encerramos esboçando como poderíamos projetar uma política de horizonte de previsão estocástica, explorando a propriedade de que nossa decisão é um escalar.

O capítulo se encerra propondo uma extensa série de extensões, indicando a riqueza das variações de problemas de controle que surgem em contextos de cadeia de suprimentos.

## Narrativa

Este capítulo aborda um jogo famoso da década de 1950 conhecido como "jogo da cerveja". Ele foi originalmente concebido por Jay Forrester, professor do MIT, que criou o jogo para ilustrar as instabilidades das cadeias de suprimentos. O problema envolve uma cadeia de suprimentos linear em que diversos fornecedores movem cerveja do local onde ela é fabricada (o fabricante) até o mercado (o varejista). A cerveja precisa passar por vários intermediários em seu caminho do ponto de fabricação até o mercado.

Existem dois tipos de fluxos:

- O fluxo de cerveja – Cada caixa de cerveja é representada por uma moeda de um centavo que se move do fabricante ao varejista.
- O fluxo de informação – Cada ponto da cadeia de suprimentos reabastece seu estoque fazendo pedidos de mais cerveja ao próximo nível abaixo.

Cada nível da cadeia de suprimentos é conhecido como um *elo* (echelon). Normalmente há de quatro a seis elos por equipe. As demandas no varejista são fixadas previamente, mas ocultas, em um baralho de cartas. Conforme o varejista revela a demanda daquela semana, ele tenta atendê-la a partir do estoque. O varejista, e todos os demais fornecedores na cadeia de suprimentos (exceto o fabricante), então preenchem uma folha de papel solicitando mais estoque.

É possível que o varejista, ou qualquer um dos fornecedores intermediários, não consiga atender ao pedido de mais estoque (ou à demanda de mercado no nível do varejo). Nesse caso, a demanda não satisfeita permanece em um backlog de pedidos aguardando ser atendida à medida que novo estoque chega.

Após atender aos pedidos, todos (naquela cadeia de suprimentos) precisam parar e registrar seu estoque (o número de caixas de cerveja em estoque) ou seu backlog de pedidos. O backlog de pedidos carrega uma penalidade de ＄4 por caixa. O excesso de estoque carrega um custo de manutenção de ＄1 por caixa.

As etapas do processo estão ilustradas na Figura 11.1. São cinco etapas:

**Etapa 0:** A cada semana, cada jogador terá um estoque (em moedas de um centavo, cada uma representando uma caixa de cerveja) e um pedido, que pode ser a demanda de varejo (para o elo de varejo) ou um pedido feito pelo jogador à sua esquerda.

**Etapa 1:** Cada jogador tenta retirar o máximo possível de caixas de seu estoque e movê-las para sua esquerda, para uma área *entre* ele e o jogador à esquerda (não adicione as moedas ao estoque do jogador à esquerda). Se não houver estoque suficiente para satisfazer o pedido, risque o pedido e substitua-o pelo número de caixas que ainda restam a ser satisfeitas (este é o backlog de pedidos).

**Etapa 2:** Agora escreva um pedido de quantas caixas você deseja para reabastecer seu estoque e coloque-o na área *entre* você e o jogador à sua direita (o fabricante coloca um pedido sobre a pilha de moedas de onde toda a cerveja se origina).

**Etapa 3:** Pare e registre em sua folha de estoque quanto estoque você tem. Se você não conseguiu satisfazer um pedido, não terá estoque e terá pedidos em seu backlog (os pedidos não satisfeitos). Se for esse o caso, registre isso como seu backlog de pedidos.

**Etapa 4:** Esta é a etapa-chave: estenda a mão esquerda e puxe a próxima folha de pedido para sua pilha de pedidos (as folhas de papel), e ao mesmo tempo estenda a mão direita para puxar as moedas que chegam até você para seu estoque. Agora você está de volta ao ponto em que estava na etapa 0.

<figure class="book-figure">
  <img src="/assets/images/sdam/princetonbeergame2018.png" alt="Layout da versão Princeton do jogo da cerveja." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 11.1.</span> Layout da versão Princeton do jogo da cerveja.</figcaption>
</figure>

É muito importante que todos façam seus movimentos ao mesmo tempo, mas não é permitido compartilhar informações (e eles não devem olhar para os estoques de outros jogadores na mesma cadeia). O varejista precisa desempenhar o papel de manter todos sincronizados.

As instruções completas para uma versão simplificada do clássico jogo da cerveja podem ser baixadas em [tinyurl.com/PrincetonBeerGame](https://tinyurl.com/PrincetonBeerGame). Esta versão do jogo é ideal para aulas ministradas em mesas contínuas, com uma turma de pelo menos 8 a 10 alunos (as mesas contínuas são necessárias para que os jogadores possam empurrar papéis e moedas entre si). As equipes devem ter cinco ou seis jogadores (o que significa cinco ou seis elos intermediários mais o varejista), mas nunca menos de quatro. A pessoa responsável pelo estoque mais próximo da fábrica pode administrar ambas as posições (já que a fábrica faz pouco mais do que atender pedidos). As equipes não precisam ter o mesmo tamanho, e é bastante fácil estender uma cadeia para incluir um aluno que chegue atrasado. É possível conduzir o jogo completo em uma aula de 50 minutos.

## Enquadrando o problema

Este é mais um problema multiagente. As respostas às nossas três perguntas de enquadramento para cada agente são:

- **Métricas:** Minimizar os custos esperados de manutenção de estoque mais os custos de pedidos em atraso para pedidos não satisfeitos.
- **Decisões:** Quanto de novo produto solicitar ao próximo agente ao longo da cadeia de suprimentos.
- **Incertezas:** Quanto o mercado vai solicitar (para o agente de varejo que atende diretamente ao mercado), ou a quantidade que o próximo agente mais próximo do mercado irá solicitar, e a quantidade de pedidos solicitados que são satisfeitos por agentes a montante (mais próximos da fábrica).

## Modelo básico

Vamos modelar um fornecedor que não seja um dos pontos extremos (varejista ou fabricante de cerveja). Este modelo seguirá de perto o estilo do problema do jornaleiro de dois agentes do capítulo anterior, embora existam alguns ajustes. Antes de começarmos, precisamos introduzir uma nova notação para sistemas multiagentes.

### Notação multiagente

Antes de começarmos, precisamos estabelecer nosso sistema de notação para quem sabe o quê, e o processo de compartilhamento de informações.

Vamos rotular os diferentes agentes de tomada de decisão na cadeia de suprimentos por $\Qcal = \lbrace 1, 2, \ldots, Q\rbrace $. Vamos deixar $q=0$ descrever o mercado, que é uma fonte de informação, mas não toma decisões. Vamos deixar $q=Q$ referir-se à planta de fabricação, que assumimos (pelo menos inicialmente) poder sempre produzir o suficiente para atender à demanda.

Começamos definindo a variável de estado para o agente $q$ usando $S_{tq}$, a informação conhecida pelo agente $q$ no tempo $t$ (isso pode incluir crenças). Se o agente $q$ atua sobre o agente $q'$, usaremos $x_{tqq'}$, a ação do agente $q$ sobre o agente $q'$. Observamos que a decisão $x_{tqq'}$ é determinada por $q$, mas chega a $q'$ como informação.

Uma ação de $q$ sobre $q'$ no tempo $t$ pode envolver a movimentação de recursos físicos, mas também pode incluir o envio de informação. A ação de $q$ sobre $q'$ chegará a $q'$ como um processo de informação exógena chegando a $q'$ no tempo $t+1$ (que é onde quaisquer distorções seriam capturadas), o qual escrevemos como $W_{t+1,q,q'}$, informação chegando ao agente $q'$ no tempo $t+1$ a partir de ações tomadas pelo agente $q$ (isso pode ser informação sobre recursos ou algo envolvendo o envio ou compartilhamento de informação por parte de $S_{tq}$).

Por fim, haverá momentos em que o agente $q$ precisará criar uma estimativa de algo conhecido pelo agente $q'$. Se deixarmos $S_{tq'}$ representar algo conhecido pelo agente $q'$, deixaremos $\overleftarrow{S}\_{t,q,q'}$ denotar a estimativa que o agente $q$ cria da informação em $S_{tq'}$.

### Variáveis de estado

As variáveis de estado para os agentes $q=1, \ldots, Q-1$ são: $R^{inv}\_{tq}$, o estoque restante após a iteração $t$, depois de entregar o produto ao fornecedor a montante para o agente $q$; e $R^{back}\_{tq}$, a demanda em atraso (backordered) que ainda não foi satisfeita a partir do estoque.

Assume-se que o fabricante $q=Q$ sempre tem estoque ilimitado.

Com o tempo, aprenderemos que esta é uma descrição incompleta do estado do problema, mas é um bom ponto de partida.

### Variáveis de decisão

O agente $q$ precisa tomar duas decisões. A primeira (e mais importante) é quanto pedir ao agente a jusante $q+1$, que escrevemos como $x^{req}\_{tq,q+1}$, o pedido feito pelo fornecedor $q$ para ser repassado ao fornecedor $q+1$, feito no instante de pedido na iteração $t$, que será recebido por $q+1$ para ser atendido na iteração $t+1$.

A segunda é quanto do pedido do agente a montante atender a partir do estoque. Escrevemos isso como $x^{fill}\_{tq,q-1}$, quanto da demanda não satisfeita $R^{back}\_{tq}$ atender no tempo $t$ a partir do estoque.

Essas decisões são restringidas para $q=1, \ldots, Q-1$ por:

$$
\begin{align}
0 \leq x^{fill}_{tq,q-1}           &\leq R^{inv}_{tq},\label{eq:beergameconstraint1}\\
0 \leq x^{fill}_{tq,q-1}           &\leq R^{back}_{tq},\label{eq:beergameconstraint2}\\
x^{req}_{tq,q+1},x^{fill}_{tq,q-1} &\geq 0. \label{eq:beergameconstraint3}
\end{align}
$$

A restrição $\eqref{eq:beergameconstraint1}$ reflete a realidade de que não podemos enviar ao agente $q-1$ estoque que não temos disponível. A restrição $\eqref{eq:beergameconstraint2}$ diz que não podemos enviar ao agente $q-1$ estoque que não foi solicitado. Observe que $R^{back}\_{tq}$ inclui novos pedidos que ainda não foram atendidos.

Escrevemos então nosso vetor de decisão como

$$
x_{tq} = (x^{req}_{tq,q+1},x^{fill}_{tq,q-1}),
$$

onde nossas decisões serão tomadas por alguma política $X^\pi(S_t)$ que projetaremos mais adiante.

Em nosso jogo básico, sempre vamos atender o máximo possível do pedido de $q-1$ a partir do estoque, então tecnicamente $x^{fill}\_{tq,q-1}$ não é realmente uma decisão, já que simplesmente definiremos $x^{fill}\_{tq,q-1} = \min\lbrace R^{back}\_{tq},R^{inv}\_{tq}\rbrace $. No entanto, ainda é uma ação tomada por $q$, e isso abre caminho para comportamentos mais ricos posteriormente.

Se formos o mercado varejista $q=0$, então o pedido $W_{t,0,1} = x^{req}\_{t,0,1}$ feito ao agente $q=1$ vem de uma fonte de informação exógena.

Se formos a planta $q=Q$, sempre atendemos ao pedido de $q=Q-1$, portanto

$$
x^{fill}_{t+1,Q,Q-1} = x^{req}_{t,Q-1,Q}.
$$

### Informação exógena

Existem dois tipos de informação exógena para o fornecedor $q$: $W^{fill}\_{t+1,q+1,q}$, a quantidade de produto recebida do fornecedor $q+1$ em resposta ao pedido feito no tempo $t$, mas chegando no tempo $t+1$; e $W^{req}\_{t+1,q-1,q}$, o pedido feito pelo fornecedor $q-1$ no tempo $t$ ao fornecedor $q$, que chegaria no tempo $t+1$.

É importante reconhecer que as decisões tomadas pelos agentes $q+1$ e $q-1$ chegam ao agente $q$ como informação exógena. Isso significa que poderíamos escrever

$$
W^{fill}_{t+1,q+1,q} = x^{fill}_{t,q+1,q}, \qquad W^{req}_{t+1,q-1,q} = x^{req}_{t,q-1,q}.
$$

Podemos representar a informação exógena para o agente $q$ que chega até o tempo $t+1$ usando

$$
W_{t+1,q} = (W^{fill}_{t+1,q+1,q},W^{req}_{t+1,q-1,q}).
$$

Isso descreve o processo de informação para os agentes intermediários $q=1, \ldots, Q-1$. O processo de informação $W_{t,0}$ refere-se ao mercado, onde assumimos que existe uma fonte exógena de pedidos $x^{req}\_{t,0,1} = W_{t,0,1}$ que são feitos ao agente 1.

### Função de transição

Nossas variáveis de estado $R^{inv}\_{tq}$ e $R^{back}\_{tq}$ para $q=1, \ldots, Q-1$ evoluem de acordo com

$$
\begin{align}
R^{inv}_{t+1,q} &= R^{inv}_{tq}-x^{fill}_{t,q,q-1} + W^{fill}_{t+1,q+1,q}, \label{eq:beergametrans1}\\
R^{back}_{t+1,q} &= R^{back}_{tq}-x^{fill}_{t,q,q-1} + W^{req}_{t+1,q-1,q}. \label{eq:beergametrans2}
\end{align}
$$

A equação $\eqref{eq:beergametrans1}$ retira o pedido $x^{fill}\_{t,q,q-1}$ do estoque (não é permitido que este fique negativo) e então adiciona o estoque recebido $W^{fill}\_{t+1,q+1,q}$ do agente a jusante $q+1$ para criar o estoque no tempo $t+1$. A equação $\eqref{eq:beergametrans2}$ atende aos pedidos que foram solicitados, mantidos em $R^{back}\_{tq}$, e então adiciona novos pedidos $W^{req}\_{t+1,q-1,q}$ a serem atendidos no período $t+1$.

### Função objetivo

Nossa função objetivo para o agente $q$ avalia penalidades para o estoque remanescente $R^{inv}\_{tq}$ e a demanda não satisfeita $R^{back}\_{tq}$. Seja $c^{inv}\_q$ o custo unitário de manutenção de estoque para o agente $q$, e $c^{back}\_q$ o custo unitário dos pedidos não satisfeitos para o agente $q$.

Esses custos são avaliados sobre os estoques e as demandas em atraso após a tomada de decisões para atender a um pedido de cliente, mas antes que novos pedidos tenham chegado. Assim, nossa função de custo para o agente $q$ é dada por

$$
C(S_t,x_t) = c^{inv}(R^{inv}_{tq}-x^{fill}_{t,q,q-1}) + c^{back}(R^{back}_{tq}-x^{fill}_{t,q,q-1}).
$$

Tenha em mente que $R^{inv}\_{tq}$ é o estoque atual, então $R^{inv}\_{tq}-x^{fill}\_{t,q,q-1}$ é o estoque restante após termos atendido os pedidos para o tempo $t$. De forma similar, $R^{back}\_{tq}$ inclui novos pedidos, bem como pedidos não atendidos de períodos anteriores. Como resultado, $R^{back}\_{tq}-x^{fill}\_{t,q,q-1}$ são os pedidos que não foram atendidos imediatamente.

Agora buscamos a melhor política usando

$$
\min_\pi \E\left\{\sum_{t=0}^T C_q(S_t,X^\pi(S_t))\vert S_0\right\}.
$$

Isso tem que ser feito para cada agente $q$, assumindo que cada um está se autootimizando. Um desafio separado é escolher políticas para cada agente, que só podem usar a informação disponível para cada agente, mas onde ainda queremos políticas que alcancem uma otimalidade global. Essa é uma questão que está além do escopo deste livro.

## Modelando a incerteza

Cada agente, exceto os agentes nos pontos extremos, tem que gerenciar duas fontes de incerteza:

- Os pedidos feitos pelo agente upstream, que pode ser o mercado, ou outro agente que está respondendo de forma incerta às demandas que enfrenta, e a capacidade da cadeia de suprimentos de responder aos seus pedidos.
- A capacidade do agente upstream de atender os pedidos do agente.

Em outras palavras, as únicas fontes de incerteza são o mercado e o comportamento dos agentes. As formas pelas quais os agentes (que são pessoas) interagem entre si introduzem dinâmicas complexas (e incertas). Normalmente, o jogo é conduzido com uma dinâmica de mercado bastante modesta. Mesmo quando conduzido dessa forma, o comportamento humano pode introduzir instabilidades significativas que foram observadas em cadeias de suprimentos reais, onde receberam o nome de "efeito bullwhip."

## Projetando políticas

Existe uma variedade de políticas básicas do tipo PFA que podemos considerar. Começamos assumindo que sempre atendemos um pedido até o limite do nosso estoque disponível, então

$$
x^{fill}_{t,q,q-1} = \min\{x^{req}_{t,q-1,q}, R^{inv}_{tq}\}.
$$

Notamos que, ao projetarmos diferentes políticas, talvez tenhamos que introduzir elementos adicionais às variáveis de estado para atender às necessidades de informação da política.

### Algumas regras simples

Vamos começar com algumas regras simples de pedido:

- Solicitar ao agente $q+1$ o que foi solicitado a $q$ no período de tempo anterior:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = W^{req}_{t-1,q-1,q} + \theta_{q}.
$$

  Esta política ignora quanto temos em estoque; é uma política de rastreamento puro. Esta política requer que armazenemos o pedido anterior $W^{req}\_{t-1,q-1,q}$ em nossa variável de estado, que se torna

$$
S_{tq} = (R^{inv}_{tq},R^{back}_{tq}, W_{t-1,q-1,q}).
$$

  Em seguida, aumentamos esse valor em $\theta$ para proteção contra a incerteza.
- Solicitar o que é necessário para atender aos pedidos atuais e passados:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = R^{back}_{tq} + \theta_{q}.
$$

  Quando temos demandas remanescentes, esta política resultaria em contagem duplicada, o que significa fazer múltiplos pedidos.
- Política de estoque-alvo:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = \max\{0, \theta^{target}_{q}-R^{inv}_{tq}\}.
$$

  Esta política busca manter um estoque-alvo especificado $\theta^{target}$ que não varia conforme as condições mudam.

Estas são PFAs parametrizadas básicas, fáceis de implementar, mas que, é claro, exigem calibração. Ao mesmo tempo, são bastante simples e ignoram fatores como o histórico de pedidos passados que ainda não foram atendidos (na verdade, cada uma dessas políticas apresenta falhas fundamentais).

Tenha em mente que $R^{back}\_{tq}$ são os pedidos feitos pelo agente $q-1$ ao agente $q$ que $q$ ainda não atendeu. Os pedidos feitos por $q$ a $q+1$ que ainda não foram atendidos são dados por $R^{back}\_{t,q+1}$, mas isso não é imediatamente conhecido pelo agente $q$. Seja $\overleftarrow{R}^{back}\_{tq,q+1}$ a estimativa de $R^{back}\_{t,q+1}$ feita pelo agente $q$ das demandas em atraso conhecidas por $q+1$. Estes são os pedidos não atendidos que $q$ fez a $q+1$, que é uma estatística normalmente mantida por $q+1$.

Normalmente, a informação conhecida por um agente (como $q+1$) não pode ser conhecida perfeitamente por outro agente (como $q$), mas neste caso, esta é uma estatística que $q$ pode manter por conta própria usando

$$
\overleftarrow{R}^{back}_{t+1,q,q+1} = \max\{0,\overleftarrow{R}^{back}_{tq,q+1}+x^{req}_{t,q,q+1} - W^{fill}_{t+1,q+1,q}\}.
$$

Podemos usar esta estatística para sugerir uma política de estoque-alvo ajustada, na qual estamos adicionando os pedidos não atendidos capturados por $\overleftarrow{R}^{back}\_{t+1,q,q+1}$ ao nosso estoque atual $R^{inv}\_{tq}$, o que escrevemos usando:

- Política de estoque-alvo ajustada:

$$
x^{req}_{t,q,q+1} = \max\{0, \theta^{target}-(R^{inv}_{tq}+\overleftarrow{R}^{back}_{t+1,q,q+1})\}.
$$

Esta política é uma forma de PFA (não há otimização embutida), mas reflete os suprimentos que estarão chegando no futuro.

### Uma heurística de ancoragem e ajuste

Em 1989, John Sterman (professor do MIT e especialista em dinâmica de negócios) escreveu um artigo aplicando o princípio de "ancoragem e ajuste" desenvolvido por Tversky e Kahneman (1974) ao beer game. Vamos delinear essa ideia aqui.

Começamos definindo um conjunto de variáveis de estado. As variáveis que efetivamente usamos podem depender da política.

- **Variáveis de estado físico:** $R^{inv}\_{tq}$, estoque atual; $R^{back}\_{tq}$, demanda em atraso; e $R^{transit}\_{tq}$, estoque atual em trânsito (não estamos capturando por quanto tempo o estoque esteve em trânsito). O estado do recurso é então $R_{tq} = (R^{inv}\_{tq},R^{back}\_{tq},R^{transit}\_{tq})$.
- **Variáveis de informação:** $F_{t-1,q,q-1}$, atendimento real de $q$ para $q-1$ do período de tempo anterior, então $F_{t-1,q,q-1} = x^{fill}\_{t-1,q,q-1}$; e $A_{t-1,q+1,q}$, chegadas reais a $q$ de $q+1$ no período de tempo anterior, então $A_{t-1,q+1,q} = x^{fill}\_{t-1,q+1,q}$. O estado de informação é então $I_{tq} = (F_{t-1,q-1,q},A_{t-1,q-1,q})$. Com essas variáveis, estamos "lembrando" uma atividade do período de tempo anterior. Seu uso depende da política.
- **Variáveis de estado de crença:** $\Abar_{t,q+1,q}$, taxa estimada de chegada de produto do agente $q+1$ (esta é uma estimativa da taxa na qual o produto está chegando a $q$ de $q+1$); $\Fbar_{t,q,q-1}$, taxa estimada de atendimento entregue ao agente $q-1$ (esta é uma estimativa da taxa na qual o produto está sendo enviado para $q-1$); e $\Dbar_{t,q-1,q}$, taxa de demanda estimada de $q-1$ (isso seria igual a $\Fbar_{t,q-1,q}$ se atendêssemos completamente todos os pedidos, o que significa que $\Fbar_{t,q-1,q} \leq \Dbar_{t,q-1,q}$). O estado de crença é então $B_{tq} = (\Abar_{t,q+1,q},\Fbar_{t,q-1,q},\Dbar_{t,q-1,q})$. Assim como com $I_t$, o uso dessas variáveis depende da política. Mais adiante propomos diferentes formas de calcular essas estimativas.

Nossa variável de estado completa é então

$$
S_{tq} = (R_{tq}, I_{tq}, B_{tq}).
$$

A taxa de atendimento estimada $\Fbar_{t,q,q-1}$ pode ser calculada de várias formas:

- Reativa: $\Fbar_{t,q-1,q} = F_{t-1,q-1,q}$.
- Estável: $\Fbar_{t,q-1,q} = \theta^{trgt-fill}\_q$, onde $\theta^{trgt-fill}\_q$ é uma taxa de atendimento-alvo definida pelo agente $q$.
- Expectativas regressivas: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \theta^{trgt-fill}\_q$ para um fator de suavização especificado $0 \leq \gamma \leq 1$.
- Expectativas adaptativas: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \Fbar_{t,q-1,q}$.

O princípio de "ancoragem e ajuste" aplicado a este contexto consiste em escolher uma "âncora" que especifica quanto esperamos que devamos pedir em média, com um "ajuste" para refletir as condições atuais.

- **Política básica de reabastecimento** – Podemos usar qualquer um dos métodos para calcular $\Fbar$ para obter a política

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}) = \Fbar_{t,q-1,q}.
$$

- **Política de ancoragem e ajuste** – Vamos usar nossa taxa de pedido estimada $\Fbar_{t,q-1,q}$ como nossa "âncora," que é o que esperamos que devamos pedir, mas vamos fazer ajustes com base no nosso estoque disponível e no estoque em trânsito. Representamos esses ajustes usando $\delta R^{inv}\_{tq}$, o ajuste baseado no estoque atual $R^{inv}\_{tq}$; e $\delta R^{transit}\_{tq}$, o ajuste baseado no estoque em trânsito atual $R^{transit}\_{tq}$.

  Podemos usar esses elementos para criar uma política de "ancoragem e ajuste" dada por

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta_q) = \max\{0,\Fbar_{t,q-1,q} + \delta R^{inv}_{tq} + \delta R^{transit}_{tq}\}.
$$

  Agora temos que projetar mecanismos de ajuste. Uma estratégia possível para $\delta R^{inv}\_t$ poderia ser

$$
\delta R^{inv}_{tq} = \theta^{inv}_q (R^{inv-trgt}_q - R^{inv}_{tq}),
$$

  onde $\theta^{inv}\_q$ é um fator de suavização e o estoque-alvo $R^{inv-trgt}$ são parâmetros ajustáveis.

  Uma estratégia possível para $\delta R^{transit}\_{tq}$ poderia ser

$$
\delta R^{transit}_{tq} = \theta^{transit} (R^{transit-trgt}_q - R^{transit}_{tq}).
$$

  Nosso vetor de parâmetros ajustáveis seria então

$$
\theta_q = (\theta^{inv}_q, R^{inv-trgt}_q, \theta^{transit}_q, R^{transit-trgt}_q).
$$

  Esses parâmetros têm que ser calibrados para cada agente $q$.

A política de ancoragem e ajuste foi motivada pelo comportamento humano, e não por qualquer justificativa de que seria quase ótima. Uma vantagem é que ela é simples, transparente e intuitiva. O desafio está sempre nos parâmetros ajustáveis, e em particular nos alvos $R^{inv-trgt}$ e $R^{transit-trgt}$, já que estes são apresentados como parâmetros estáticos, quando na verdade eles realmente precisam responder às condições.

### Uma política de horizonte de previsão

Apresentamos pela primeira vez uma política estocástica de horizonte de previsão no [Capítulo 7](/sdam/pt-BR/chapter-7/), mas a replicamos aqui para facilitar a referência:

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA2}
\end{align}
$$

A Equação $\eqref{eq:policiesapproximateDLA2}$ pode ser particularmente intimidante. A Figura 11.2 ilustra cada um dos elementos da política usando uma árvore de decisão básica (tudo isso é para um único agente $q$ que suprimimos). Há um conjunto de decisões $x_t$ que emanam do primeiro nó de decisão $S_t$, após o qual tomamos uma expectativa sobre a informação aleatória em $\Wtilde_{t,t+1}$. Depois disso, usamos uma "política de horizonte de previsão" aproximada $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$ para cada nó de decisão $\Stilde_{tt'}$ em nosso modelo de horizonte de previsão, onde tipicamente simplificamos a variável de estado de alguma forma. Também aproximamos a informação que chega no futuro usando $\Wtilde_{tt'}$, seja usando um modelo de horizonte de previsão determinístico, ou um conjunto simulado de resultados possíveis.

<figure class="book-figure">
  <img src="/assets/images/sdam/lookaheadpolicytodecisiontree.jpg" alt="Ilustração da política de horizonte de previsão como uma árvore de decisão." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 11.2.</span> Ilustração da política de horizonte de previsão como uma árvore de decisão.</figcaption>
</figure>

Essa equação pode ser pensada como consistindo de dois elementos:

- Primeiro enumeramos cada decisão possível $x_{tq}$.
- Em seguida, simulamos os efeitos dessa decisão usando uma amostra de qualquer informação aleatória, enquanto tomamos decisões usando uma "política de horizonte de previsão" aproximada que é designada $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$.

Para usar isso em nosso contexto de cadeia de suprimentos, temos que simular o comportamento dos outros agentes, percebendo que a) não conhecemos as condições iniciais $R_{tq'}$ para $q' \ne q$, e b) não sabemos como os outros agentes estão tomando decisões.

Para lidar com nossa falta de conhecimento das condições iniciais, temos que considerá-las como variáveis aleatórias e amostrar de uma distribuição (isso está embutido no primeiro $\Etilde_{\Wtilde_{t,t+1}}$). Notamos que é possível que um agente tenha, por exemplo, nenhum estoque e um pedido em atraso substancial. Poderíamos ser capazes de supor que esse é o caso se observarmos que o tempo para atender os pedidos que estamos fazendo está demorando muito para ser atendido.

Então temos que simular as políticas desconhecidas. Enquanto estamos tentando construir uma política estocástica de horizonte de previsão muito sofisticada para o agente $q$ no tempo $t$, sugerimos usar as políticas muito mais simples que sugerimos anteriormente, não apenas para os outros agentes, mas também para o agente $q$ em períodos de tempo futuros.

Então, dadas essas aproximações, uma política estocástica de horizonte de previsão teria desempenho superior a uma das políticas mais simples que esboçamos acima? Esta seria uma boa questão de pesquisa, mas a política de horizonte de previsão supera uma limitação importante das políticas parametrizadas mais simples. Especificamente, a política de horizonte de previsão captura naturalmente o estado complexo deste sistema, como o histórico de pedidos anteriores, bem como quaisquer previsões de eventos futuros. As políticas parametrizadas são adequadas a problemas estacionários, enquanto a política de horizonte de previsão se adapta naturalmente a comportamentos que podem ser altamente não estacionários.

## Extensões

Há muitas formas pelas quais podemos modificar este problema. Algumas ideias incluem:

**1)** Temos que lidar com situações em que os pedidos dos agentes upstream são muito maiores (ou talvez menores) do que o que vimos no passado, sugerindo uma mudança sistemática na demanda. Podemos introduzir estimativas do potencial crescimento em demandas futuras para lidar com mudanças inesperadas na demanda upstream.

**2)** Podemos manter crenças sobre como os agentes upstream podem se comportar. Por exemplo, é útil ao agente $q$ se o agente $q+1$ mantiver estoques generosos. Podemos incentivar a construção de estoque introduzindo ruído em nossos próprios pedidos, o que então aumenta a estimativa que o agente $q+1$ tem sobre a incerteza nos pedidos feitos pelo agente $q$.

**3)** Cada agente reage a interrupções, respondendo mantendo estoques mais altos. Um agente $q$ poderia introduzir algum ruído em seus pedidos a $q+1$ de modo que $q+1$ manterá estoques mais altos, para que os pedidos de $q$ tenham maior probabilidade de serem atendidos.

**4)** Grande parte da sensibilidade do jogo se deve à alta penalidade por falta de estoque em comparação com a manutenção de estoque (lembre-se de que custa ＄4 por caixa por dia de pedidos em atraso, e ＄1 por caixa por dia para manter o estoque). Tente mudar o custo de falta de estoque de ＄4 para ＄1, e depois para ＄0,50.

## O que aprendemos?

- Descrevemos um problema multiagente simples chamado "jogo da cerveja" ("beer game"), que foi inventado na década de 1950. Para modelar o problema, introduzimos notação adicional para capturar o conhecimento de cada agente, e a transferência de informação entre agentes. Isso pode ser pensado como uma série de problemas do vendedor de jornais ("newsvendor") de dois agentes, com a peculiaridade de que o estoque excedente é mantido para o próximo período de tempo, assim como as demandas não satisfeitas.
- Os leitores são direcionados a uma versão simplificada do clássico jogo da cerveja desenvolvida pelo autor na Universidade de Princeton.
- Introduzimos uma notação que captura o que cada agente sabe, incluindo uma estimativa feita por um agente sobre informações conhecidas por outro agente.
- Modelamos uma decisão tomada por um agente como informação exógena para outro agente.
- Começamos com algumas políticas PFA simples, nas quais os agentes se adaptam a informações básicas sobre quanto precisam pedir.
- Em seguida, resumimos uma famosa política de "ancoragem e ajuste", sugerida por dois psicólogos, que é outra forma de PFA.
- Por fim, esboçamos uma política de horizonte de previsão direta que depende de um agente $q$ simulando o comportamento de outros agentes.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Qual é o estado de um agente intermediário?</li>
<li>Quais decisões podem ser tomadas por cada agente?</li>
<li>Quais são as fontes de informação exógena para cada agente intermediário?</li>
<li>Quais fontes de incerteza afetam o comportamento do jogo?</li>
<li>Explique em palavras o que se entende por uma política de "ancoragem e ajuste"? Era esperado por seus criadores que essa fosse uma boa política?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Ofereça uma crítica às regras simples sugeridas acima.</li>
<li>Imagine que existam mudanças ocasionais, mas pouco frequentes, na demanda do mercado para níveis muito mais altos ou mais baixos. Projete uma política que entenda que essas mudanças podem acontecer, o que significa que o restante da cadeia de suprimentos também precisa se adaptar. Como sua política responderia aos períodos inevitáveis de escassez de produto?</li>
<li>A seção sobre a política de horizonte de previsão acima fornece um esboço aproximado de uma política de horizonte de previsão. Complete os detalhes escrevendo uma implementação detalhada.</li>
</ol>
{% endraw %}
