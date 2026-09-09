---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 6: Problemas de caminho mais curto estocástico - Dinâmica"
permalink: /sdam/pt-BR/chapter-6/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 0cd6be02e9b93c08
---


{% raw %}
## Visão geral do capítulo

O [Capítulo 5](/sdam/pt-BR/chapter-5/) apresentou um problema de caminho mais curto que assume que ou não sabemos nada sobre os tempos de viagem em arcos que mudam dinamicamente, ou podemos observar os tempos nos arcos que estão conectados à interseção onde nosso viajante está localizado (mas nada além disso no futuro).

Agora imagine que somos um serviço como o Google maps que tem acesso a informações em tempo real sobre toda a rede. Além disso, essa informação está sendo atualizada em tempo real, o que leva o Google a atualizar o caminho recomendado até o destino do viajante. Essa informação introduz uma mudança importante no modelo, que elimina completamente qualquer possibilidade de usar os métodos que apresentamos no [Capítulo 5](/sdam/pt-BR/chapter-5/).

A abordagem que usamos para este problema se aplica a qualquer problema que resolveríamos por meio de planejamento para o futuro usando o que poderíamos chamar de "melhores estimativas" de valores incertos. Isso oferece um contexto para nosso primeiro uso da quarta classe de política, que chamamos de aproximações de horizonte de previsão direto. Usamos este contexto para demonstrar um método prático e poderoso para tomar decisões em um ambiente dinâmico (o que significa sob incerteza), em que começamos com um modelo de horizonte de previsão determinístico e, em seguida, introduzimos parâmetros para fazê-lo funcionar melhor ao longo do tempo, sob incerteza.

## Narrativa

Vamos abordar novamente caminhos mais curtos estocásticos, mas desta vez faremos isso exatamente como é feito no Google maps (ou em qualquer sistema de navegação comercial). Todos reconhecemos que as redes de transporte frequentemente têm padrões previsíveis de congestionamento, além de variações aleatórias que ocorrem no curso natural dos eventos. Por exemplo, um acidente pode criar um acúmulo em que poderíamos estimar como os atrasos de viagem podem evoluir como resultado do acidente.

O ponto de partida em relação ao problema de caminho mais curto estático é que nossas estimativas de custos futuros estão evoluindo ao longo do tempo. Vamos retornar ao problema em que os custos são estocásticos, mas quando chegamos a um nó $i$, não vemos as realizações reais dos custos a partir do nó $i$. No entanto, vamos assumir que recebemos estimativas atualizadas de custos em toda a rede. Essas estimativas podem ser vistas como uma previsão; vamos assumir que o custo real que incorremos ao atravessar um arco será, em média, igual à previsão (ou seja, as previsões são não enviesadas), mas essas previsões vão evoluir ao longo do tempo à medida que recebemos atualizações sobre o status da rede.

## Enquadrando o problema

As respostas às nossas três questões de enquadramento são:

- **Métricas:** Desejamos minimizar o tempo de viagem esperado, podendo também incluir uma penalidade por chegar após um horário de chegada-alvo.
- **Decisões:** Para um viajante no nó $i$, queremos dizer a ele qual nó $j$ atravessar em seguida.
- **Incertezas:** Os tempos de viagem estimados mudam aleatoriamente cada vez que um viajante atravessa um link até um nó a jusante. O tempo real ao atravessar um link diferirá da estimativa.

## Modelo básico

Suponha que, quando precisamos tomar uma decisão no tempo $t$, temos uma estimativa atualizada dos custos de viagem com base nos níveis de congestionamento *atuais* (rastreando a velocidade com que nossos smartphones estão se movendo no trânsito). Vamos representar esses tempos usando $\cbar_{tk\ell}$, o custo estimado de atravessar o link $(k,\ell)$ no tempo $t$, usando estimativas baseadas no que sabemos no tempo $t$.

Por enquanto, não vamos tentar modelar o custo se chegarmos a um ponto no tempo $t' > t$ dado o que sabemos no tempo $t$. Assim, podemos estimar, às 15h, que vamos chegar a um link às 17h, mas vamos usar nossa estimativa das 15h (como o Google faz atualmente).

### Variáveis de estado

Um viajante no nó $N_t = i$ no tempo $t$ é considerado como tendo recebido um conjunto de previsões $\cbar_{t} = (\cbar_{ttk\ell})\_{k, \ell \in \Ncal}$, o vetor de estimativas do custo de atravessar o link $(k, \ell)$ no tempo $t$, dado o que é conhecido no tempo $t$. O estado do viajante $S_t$ no tempo $t$ é então

$$
S_t = (N_t, \cbar_t).
$$

Note que essa variável de estado é *muito* grande; ela consiste em um vetor de estimativas de custos de links para *cada* link na rede.

### Variáveis de decisão

As variáveis de decisão são as mesmas do problema de caminho mais curto estocástico estático

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i \text{ at time } t, \\ 0 & \text{otherwise.} \end{cases}
$$

Esta decisão precisa obedecer à restrição de que fazemos *algo* quando estamos no estado $N_t = i$, desde que $i$ não seja o destino. Escrevemos essa restrição como

$$
\begin{align}
\sum_j x_{t,i,j} = 1 \quad \text{for } N_t = i \text{ other than the destination.} \label{dynamicshorestpathconstraint}
\end{align}
$$

Se estivermos no destino, então não fazemos nada, e em vez disso escrevemos $x_{tij} = 0$ para $i$ igual ao destino, e $j$ qualquer outro nó.

Como acima, deixamos que $X^\pi(S_t)$ seja nossa política para determinar o vetor $x_t$, que assumimos que precisa satisfazer a restrição $\eqref{dynamicshorestpathconstraint}$.

### Informação exógena

Existem dois tipos de informação exógena para este problema. O primeiro tipo é os custos observados: $\chat_{t+1,ij}$, o custo real de atravessar o link $(i,j)$ depois que o viajante tomou a decisão no tempo $t$ de atravessar esse link. Note que só observamos $\chat_{t+1,ij}$ se o viajante atravessar o link $(i,j)$ (podemos simplesmente inserir 0 para links que não atravessamos, já que não usaremos esses valores).

O segundo tipo de nova informação são as atualizações das estimativas $\cbar_t$ dos custos dos links. Vamos modelar a informação exógena como a mudança nas estimativas:

$$
\delta \cbar_{t+1,k\ell} = \begin{cases} \cbar_{t+1,k\ell} - \cbar_{tk\ell} & \text{if } x_{tk\ell}=1, \\ 0 & \text{otherwise.} \end{cases}
$$

$$
\delta \cbar_{t+1} = (\delta \cbar_{t+1,k\ell})_{(k,\ell)\in\Ncal}.
$$

Nossa variável de informação exógena, então, é dada por

$$
W_{t+1} = (\chat_{t+1}, \delta \cbar_{t+1}).
$$

### Função de transição

Estamos assumindo que $\chat_{t+1}$ chega como informação exógena (poderíamos ter deixado a informação exógena ser a mudança nos custos, mas isso é mais natural).

A função de transição para as previsões evolui de acordo com

$$
\begin{align}
\cbar_{t+1,k\ell} = \cbar_{tk\ell} + \delta \cbar_{t+1,k\ell}. \label{eq:shortestpathdynamictransition1}
\end{align}
$$

Finalmente, atualizamos o estado físico $N_t$ usando

$$
\begin{align}
N_{t+1} = \{j\vert x_{t,N_t,j} = 1\}. \label{eq:shortestpathdynamictransition2}
\end{align}
$$

Em outras palavras, se estamos no nó $i=N_t$ e tomamos a decisão $x_{tij}= 1$ (o que requer que estejamos no nó $i$, já que caso contrário $x_{tij} = 0$), então $N_{t+1} = j$.

A atualização de $\chat_{t+1}$, equação $\eqref{eq:shortestpathdynamictransition1}$ para as previsões $\cbar_{t+1}$, e equação $\eqref{eq:shortestpathdynamictransition2}$ para nosso estado físico $R_t$, compõem nossa função de transição

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

### Função objetivo

Agora escrevemos nossa função objetivo como

$$
\begin{align}
\min_\pi F^\pi(S_0) = \E \left\{\sum_{t=0}^T \sum_{(i,j)\in\Ncal} \chat_{t+1,i,j}X^\pi(S_t)\vert S_0 \right\}. \label{eq:shortestpathdynamicobjective}
\end{align}
$$

Note que nossa política $X^\pi(S_t)$ faz a escolha do próximo link para o qual nos movemos dado o que sabemos no tempo $t$, capturado por $S_t$.

## Modelando a incerteza

Na prática, a atualização dinâmica dos custos (e previsões) vem de sistemas reais, o que significa que eles são *orientados por dados*. Quando esse é o caso, não usamos um modelo matemático dos custos dos links. A alternativa é ter um modelo matemático da informação aleatória $W^{n+1}$.

Se quisermos executar simulações, então enfrentamos o desafio de modelar a realização dos custos capturados por $\chat_t$, bem como a sequência de previsões. É preciso ter bastante cuidado com esse modelo. Primeiro, a mudança na estimativa de $\ctilde_t$, que representamos por $\delta \ctilde_{t+1}$, tem que ser extraída de uma distribuição com média $0$. Além disso, as realizações $\chat_{t+1}$ têm que ser extraídas de uma distribuição com média $\ctilde_t$.

Não queremos minimizar o desafio de criar um modelo estocástico realista. Mudanças nos custos dos links surgem de diferentes fontes, desde variações naturais do tráfego, clima, acidentes, e mudanças nos fluxos devido a motoristas reagindo a congestionamentos em outras partes da rede. Variações estocásticas nos custos dos links são não estacionárias, e não são independentes, nem ao longo do tempo nem entre os links. No entanto, além de reconhecer os desafios difíceis, um modelo mais realista está além do escopo de nossa discussão.

## Desenhando políticas

Uma indicação rápida de que não vamos usar a equação de Bellman (mesmo que de forma aproximada) é o tamanho da variável de estado, que agora inclui previsões dos custos de viagem em cada link da rede.

Em vez disso, vamos basear nossa política em um modelo especial que chamamos de *modelo de horizonte de previsão*. Por exemplo, no tempo $t$ podemos criar um modelo consistindo de estados $S_t$, decisões $x_t$ e informação exógena $W_{t+1}$, mas em nosso problema base a variável de estado $S_t = (N_t, \cbar_t)$, que é bastante complicada.

Em vez disso, vamos criar um modelo mais simples em que primeiro criamos um novo conjunto de variáveis que são tipicamente aproximações das variáveis no modelo base. Diferenciamos um novo conjunto de variáveis para nossos modelos de horizonte de previsão colocando tils sobre as variáveis no modelo de horizonte de previsão, e as indexamos por dois índices de tempo: o tempo $t$, que é o momento em que uma decisão está sendo tomada, e um segundo índice $t'$, que é o tempo dentro do modelo de horizonte de previsão.

A sequência de estados, decisões e informação exógena no modelo de horizonte de previsão seria então escrita como

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots ).
$$

Nosso vetor de custos $\cbar_t$ seria então substituído pelo vetor $\ctilde_{tt'}$. Agora enfrentamos o desafio de projetar uma política de horizonte de previsão que poderíamos chamar de $\Xtilde_{tt'}(\Stilde_{tt'})$ que determina $\xtilde_{tt'}$ dentro do modelo de horizonte de previsão. Abaixo propomos duas estratégias, ambas as quais podem ser resolvidas usando um algoritmo simples de caminho mais curto.

### Uma política de horizonte de previsão determinística

Aproximamos o problema assumindo que os custos no modelo de horizonte de previsão, $\ctilde_{tt'}$, são fixos e iguais às estimativas atuais, o que significa que deixamos

$$
\ctilde_{tt'k\ell} = \cbar_{tk\ell}.
$$

Isso significa que não temos mais as variáveis de informação exógena $\Wtilde_{tt'}$, o que nos dá um modelo de horizonte de previsão determinístico.

Isso nos permite resolver nosso modelo de horizonte de previsão de forma determinística, tratando as estimativas de custo $\ctilde_{tt',k\ell}$ como o custo correto, em vez de variáveis aleatórias. Neste caso, nossa variável de estado é, novamente, simplesmente o nó onde o viajante está localizado (dentro do modelo de horizonte de previsão).

Podemos resolver este problema com um algoritmo padrão de caminho mais curto que, como vimos no [Capítulo 5](/sdam/pt-BR/chapter-5/), é uma programação dinâmica determinística que podemos resolver com a equação de Bellman, o que fazemos primeiro encontrando o "valor" de estar no nó $i$ no tempo $t'$ em nosso modelo de horizonte de previsão. Podemos calcular esses valores definindo os valores no final do nosso modelo de horizonte de previsão para o tempo $t$ igual a zero

$$
\Vtilde_{t,t+H}(i) = 0,\ \text{for all } i.
$$

Em seguida, retrocedemos no tempo (no modelo de horizonte de previsão) para $t' = t+H-1, t+H-2, \ldots, t$ e calculamos, para cada nó $i$:

$$
\begin{align}
\Vtilde_{tt'}(i) = \min_{j\in\Ncal^+_i} (\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(j)). \label{eq:shortestpathdetlookahead}
\end{align}
$$

Nossa política de horizonte de previsão é então dada por

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmandetlookahead}
\end{align}
$$

Finalmente, a política que vamos implementar no modelo base, se estivermos no nó $i$, seria

$$
X^\pi_t(S_t = i) = \Xtilde^\pi_{tt}(S_t = i).
$$

Esta é a política que estamos usando quando seguimos um sistema de navegação. Tomar decisões com base em um modelo de horizonte de previsão determinístico é um dos métodos mais amplamente usados para tomar decisões em problemas de decisão sequencial sob incerteza.

<figure class="book-figure">
  <img src="/assets/images/sdam/rhpdeterministic123.jpg" alt="Ilustração da simulação de uma política de horizonte de previsão direto, usando um modelo determinístico do futuro." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 6.1.</span> Ilustração da simulação de uma política de horizonte de previsão direto, usando um modelo determinístico do futuro.</figcaption>
</figure>

A Figura 6.1 ilustra um processo de horizonte de previsão rolante. Nos tempos $t$, $t+1$, $t+2$, $\ldots$, criamos e resolvemos um modelo de horizonte de previsão usando estimativas de custos como as conhecemos. Em seguida, resolvemos nosso problema de caminho mais curto, que é representado nas decisões $\xtilde_{tt'}(j)$ para todos os nós $j$, mas então implementamos apenas a decisão $\xtilde_{tt}(i)$ para o nó $i$ onde estamos localizados no tempo $t$.

Quando mantemos uma variável que muda dinamicamente constante em um modelo de horizonte de previsão, nos referimos a essa variável como uma *variável latente* no modelo de horizonte de previsão. O termo "variável latente" tecnicamente significa variável oculta; neste contexto, refere-se a uma variável que não muda ao longo do tempo (dentro do modelo de horizonte de previsão), caso em que a removemos da variável de estado, o que significa que ela fica oculta (novamente, no modelo de horizonte de previsão).

Este é um dos vários tipos diferentes de aproximações que podem ser feitas em um modelo de horizonte de previsão. A aproximação mais óbvia que estamos fazendo é que usamos um futuro determinístico, o que significa que as estimativas de custos dos links são mantidas constantes dentro do modelo de horizonte de previsão, mesmo enquanto elas estão mudando no modelo base.

O modelo de horizonte de previsão, então, é seu próprio modelo com suas próprias características, razão pela qual usamos variáveis com tils — é assim que fazemos a distinção entre nosso modelo base, que usa variáveis como $S_t$ e $x_t$, e o modelo de horizonte de previsão, onde usamos variáveis como $\Stilde_{tt'}$ e $\xtilde_{tt'}$.

A seguir, vamos propor um pequeno ajuste para fazer essa abordagem funcionar melhor sob incerteza.

### Uma política de horizonte de previsão determinístico parametrizada

Uma estratégia simples para lidar com a incerteza em nosso problema de caminho mais curto dinâmico seria substituir nossa estimativa pontual $\ctilde_{tt'k\ell}=\cbar_{tk\ell}$ para o custo de atravessar o link $(k,\ell)$ no tempo $t$ por, digamos, o percentil $\theta$ dos custos, sugerindo que escrevamos os custos como $\ctilde_{tt',k\ell}(\theta) = \cbar_{tij}(\theta)$. Essa lógica poderia, por exemplo, evitar um caminho por uma área que às vezes fica muito congestionada, onde o custo *poderia* ser bastante alto.

Essa política ainda produz um problema de caminho mais curto determinístico que é tão fácil de resolver quanto quando usávamos as estimativas pontuais $\cbar_t$. Simplesmente modificamos as equações $\eqref{eq:shortestpathdetlookahead}$–$\eqref{eq:shortestpathbellmandetlookahead}$ acima usando os custos de link do percentil $\theta$. Em seguida, designamos as funções de valor $\Vtilde_{tt'}(i\vert \theta)$ para indicar a dependência do parâmetro $\theta$, que é calculado usando

$$
\begin{align}
\Vtilde_{tt'}(i\vert \theta) = \min_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{t,t'+1}(j\vert \theta)\big). \label{eq:shortestpaththetalookahead}
\end{align}
$$

Nossa política de horizonte de previsão é então dada por

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i\vert \theta) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{tt'}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmanthetalookahead}
\end{align}
$$

Em seguida, escrevemos nossa política parametrizada para o modelo base (que fornece as decisões que são realmente implementadas) usando

$$
X^\pi_t(S_t = i\vert \theta) = \Xtilde_{tt}(S_t = i\vert \theta).
$$

Isso é equivalente ao nosso modelo original de horizonte de previsão determinístico, com uma exceção importante: precisamos ajustar $\theta$ otimizando

$$
\begin{align}
\min_\theta F^\pi(\theta\vert S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}. \label{eq:tuneshortestpathcfa}
\end{align}
$$

onde $S_{t+1} = S^M(S_t,X^\pi(S_t\vert \theta), W_{t+1})$ (veja as equações $\eqref{eq:shortestpathdynamictransition1}$–$\eqref{eq:shortestpathdynamictransition2}$) usando algum método para gerar realizações aleatórias de $W_1, \ldots, W_T$.

O problema de otimização em $\eqref{eq:tuneshortestpathcfa}$ é, por si só, um problema desafiador, mas é facilitado pelo fato de que $\theta$ é um escalar entre 0 e 1. Algoritmos práticos para otimizar a função objetivo em $\eqref{eq:tuneshortestpathcfa}$ tipicamente envolvem a execução de simulações para obter observações ruidosas da função.

Uma pergunta óbvia é se o uso de um percentil diferente de $\theta = 0.5$ melhoraria os resultados. Nossa experiência é que isso é verdade quando há uma penalidade para chegadas atrasadas (por exemplo, quando queremos chegar a um compromisso às 9h).

## O que aprendemos?

- Mostramos como modelar um problema de rede dinâmica, onde as estimativas de custos evoluem ao longo do tempo. Desta vez, o estado do sistema é a localização do viajante junto com as estimativas de custos em todos os links da rede.
- Introduzimos a ideia de um modelo aproximado de horizonte de previsão, neste caso um horizonte de previsão determinístico, que pode ser resolvido como um problema de caminho mais curto. Embora essa seja uma solução ótima, resolver um modelo aproximado de horizonte de previsão, mesmo que de forma ótima, não é uma política ótima.
- Descrevemos variáveis latentes, que são variáveis dinâmicas (os custos nos links) que são mantidas constantes no modelo de horizonte de previsão (razão pela qual elas não estão mais na variável de estado).
- Mostramos como podemos modificar nosso horizonte de previsão determinístico em um horizonte de previsão determinístico parametrizado. Em vez de usar o custo esperado em cada link, poderíamos usar o percentil $\theta$ para que consideremos o quão ruim um link *poderia* ser. O parâmetro $\theta$ precisa ser ajustado, tornando isso um híbrido de uma aproximação de horizonte de previsão determinístico (uma política DLA) que é parametrizada, o que a torna uma forma de política CFA, dando-nos uma política híbrida DLA/CFA.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Por que não poderíamos usar os métodos de programação dinâmica aproximada do [Capítulo 5](/sdam/pt-BR/chapter-5/) para resolver nosso problema dinâmico?</li>
<li>Como estamos modelando o processo exógeno $W_t$, no modelo de horizonte de previsão?</li>
<li>Descreva em palavras o que queremos dizer com uma política de horizonte de previsão.</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Resolvemos um modelo de horizonte de previsão determinístico como nossa política. Isso resolve o problema determinístico de forma ótima. Por que isso não é uma política ótima?</li>
<li>Resolvemos nosso modelo de horizonte de previsão determinístico (possivelmente com custos modificados $\cbar_{ij}(\theta)$) como uma programação dinâmica determinística usando a equação de Bellman. Por que não diríamos, então, que estamos resolvendo nosso modelo base usando programação dinâmica?</li>
<li>Imagine que queremos partir o mais tarde possível do nó de origem, mas há uma alta penalidade por chegar atrasado ao nó de destino. Se otimizarmos sobre o percentil $\theta$ dos custos $\cbar_{tij}(\theta)$, como essa lógica poderia nos ajudar a evitar chegadas atrasadas?</li>
<li>Dadas as percepções do exercício 6, como você acha que usar os custos do percentil $\theta$ ajudaria em um problema onde estamos simplesmente tentando minimizar o tempo total de viagem sem considerar a possibilidade de chegar atrasado?</li>
<li>Forneça o modelo completo (variáveis de estado, variáveis de decisão, ...) para o cenário em que os custos $\chat_{tij}$ nos links que saem do nó $i$ são revelados quando o viajante chega ao nó $i$ e antes de ele tomar a decisão de qual link atravessar. Lembre-se de que você está minimizando os custos acumulados ao longo do caminho. Você não precisa projetar uma política; siga nossa prática padrão de introduzir uma política $X^\pi(S_t)$ sem especificar a política.</li>
<li>Imagine que queremos resolver nosso problema de caminho mais curto onde queremos partir o mais tarde possível da origem, mas precisamos chegar ao destino até às 9h. Atribuímos uma penalidade $\eta$ para cada minuto que chegamos após as 9h. Descreva um modelo base e uma política de horizonte de previsão parametrizada para resolver esse problema. Qual é a variável de estado para o modelo base? Qual é a variável de estado para o modelo de horizonte de previsão?</li>
</ol>

**Questões de programação**

Esses exercícios usam o módulo Python *StochasticShortestPath_Dynamic* em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Vamos usar um modelo de horizonte de previsão determinístico como foi feito nas notas, mas em vez de usar o custo esperado em cada link, vamos usar um percentil que designamos por $\theta^{cost}$. Por exemplo, se $\theta^{cost} = 0.8$, então usaríamos o percentil 80 do custo (pense nisso como usar uma estimativa de quão grande o custo poderia ser). Seja $\cbar_{tij}(\theta^{cost})$ o custo do percentil $\theta^{cost}$ do link $(i,j)$ dado o que sabemos no tempo $t$.
  <ol type="a">
    <li>Escreva o modelo de horizonte de previsão, que seria um caminho mais curto determinístico usando os custos $\cbar_{tij}(\theta^{cost})$ (como é feito no livro). Use esse modelo para definir formalmente uma política de horizonte de previsão $X^{DLA}(S_{tj}\vert \theta^{cost})$.</li>
    <li>Qual é a variável de estado para o problema dinâmico? Lembre-se de que a variável de estado inclui todas as informações dinamicamente variáveis usadas para tomar uma decisão (o que inclui calcular custos e restrições), bem como calcular a transição de $t$ para $t + 1$.</li>
    <li>Escreva a função objetivo usada para avaliar nossa política de horizonte de previsão.</li>
    <li>Agora temos uma política $X^{DLA}(S_{tj}\vert \theta^{cost})$ parametrizada por $\theta^{cost}$. Usando o módulo Python <em>StochasticShortestPath_Dynamic</em>, simule a política para $\theta^{cost} = (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0)$. Simule cada versão da política 100 vezes e tire uma média do custo real total (não o percentil $\theta^{cost}$). Considere também o risco de estar "atrasado", ou seja, o custo real total ser maior que um determinado limiar. Plote os resultados e compare-os.</li>
  </ol>
</li>
</ol>
{% endraw %}
