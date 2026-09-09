---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 5: Problemas de caminho mais curto estocástico - Estático"
permalink: /sdam/pt-BR/chapter-5/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 753d27ec659d4188
---


{% raw %}
## Visão geral do capítulo

Problemas de caminho mais curto sobre grafos constituem tanto uma importante área de aplicação (surgindo em transporte, logística e comunicação) quanto uma classe fundamental de problemas que aparece em muitos outros contextos. O problema de caminho mais curto mais conhecido é o problema determinístico clássico ilustrado na Figura 5.1, no qual precisamos encontrar o melhor caminho do nó 1 ao nó 11, sendo que o custo de percorrer cada arco é conhecido antecipadamente.

<figure class="book-figure">
  <img src="/assets/images/sdam/deterministicgraph.jpg" alt="Rede para um problema de caminho mais curto determinístico." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.1.</span> Rede para um problema de caminho mais curto determinístico.</figcaption>
</figure>

Neste capítulo, começaremos com um problema de caminho mais curto no qual os tempos de viagem são conhecidos e fixos. A versão determinística nos permitirá demonstrar uma forma específica de tomar decisões usando a equação de Bellman. Em seguida, introduziremos incerteza de uma maneira bem específica que nos permitirá demonstrar uma estratégia de solução conhecida como programação dinâmica aproximada.

## Narrativa

Você está tentando criar um sistema de navegação que guiará um veículo autônomo até um destino em uma rede congestionada. Assumimos que nosso sistema tem acesso a custos de ligação históricos e em tempo real, a partir dos quais podemos criar estimativas da média e da variância do custo de percorrer uma ligação. Podemos pensar nisso como um problema de caminho mais curto no qual observamos distribuições em vez de custos reais, conforme representado na Figura 5.2.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph1.jpg" alt="Rede para um problema de caminho mais curto estocástico em que as distribuições são conhecidas, mas os custos não são observados até depois que as decisões são tomadas." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.2.</span> Rede para um problema de caminho mais curto estocástico em que as distribuições são conhecidas, mas os custos não são observados até depois que as decisões são tomadas.</figcaption>
</figure>

Começaremos assumindo que precisamos tomar decisões sobre qual ligação percorrer com base nessas distribuições. Após percorrermos uma ligação de $i$ até $j$, então experimentamos uma realização amostral da distribuição. Queremos escolher um caminho que minimize os custos esperados.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Desejamos minimizar o tempo de viagem esperado até o destino, partindo da origem do viajante até um destino especificado.
- **Decisões:** Quando um viajante está em um determinado nó $i$, ele precisa tomar uma decisão sobre qual nó posterior $j$ percorrer, levando por fim ao destino final.
- **Incertezas:** Consideramos tanto um problema determinístico, em que não há incerteza, quanto uma versão em que os tempos de viagem são incertos, mas são revelados imediatamente antes de o viajante se comprometer a percorrer uma determinada ligação.

## Modelo básico

Vamos assumir que estamos tentando percorrer a rede na Figura 5.2 começando em um nó $q$ e terminando em um destino $r$.

### Notação

Problemas de caminho mais curto se baseiam em uma recursão fundamental de programação dinâmica. Seja $\Ncal$ o conjunto de todos os nós na rede (os nós $1, 2, \ldots, 11$), $\Ncal^+\_i$ o conjunto de todos os nós que podem ser alcançados diretamente a partir do nó $i$, $\Ncal^-\_j$ o conjunto de todos os nós que estão conectados ao nó $j$, $\Lcal$ o conjunto de todas as ligações $(i,j)$ na rede, e $c_{ij}$ o custo de percorrer a ligação $(i,j)$, em que $j$ é assumido como pertencente ao conjunto $\Ncal^+\_i$.

Seja $v_i$ o custo mínimo do nó $i$ até o nó de destino 11. Os valores $v_i$ para todos os nós $i\in\Ncal$ devem satisfazer

$$
\begin{align}
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j). \label{eq:shortestpathbellman1}
\end{align}
$$

Podemos executar a equação $\eqref{eq:shortestpathbellman1}$ inicializando $v_{11}$ com zero e definindo todos os demais valores como um número grande. Se percorrermos todos os nós $i$ em um laço e calcularmos $v_i$ usando a equação $\eqref{eq:shortestpathbellman1}$ repetidamente, os valores $v_i$ convergirão para o valor ótimo. Esta é uma versão bastante ineficiente de um algoritmo de caminho mais curto.

Outra forma de ver nossa rede é assumir que cada nó $i$ é um estado $S$, e deixar que $V_t(S_t)$ seja o valor de estar no estado $S_t$ no "tempo" $t$. Em nosso problema de caminho mais curto, usaremos $t$ para indexar o número de ligações que percorremos no caminho do nó 1 até o nó representado por $S_t$.

A partir de um estado (nó) $S_t$, suponha que tomemos uma decisão que chamamos de "$x$", que corresponderia a uma decisão de percorrer uma ligação que emana do nó correspondente ao estado $S_t$. Podemos escrever esse conjunto de decisões como $\Xcal_s$, representando as decisões $x$ que estão disponíveis quando estamos no estado $S_t = s$.

A seguir, seja $C(s,x)$ o custo de estar no estado $s$ e escolher a decisão $x$, o que corresponderia ao custo de nossa ligação $c_{ij}$ na rede acima. Por fim, usaremos uma "função de transição de estado", que denotamos por $S^M(s,x)$, que nos informa para qual estado transitamos se estivermos no estado $s$ e tomarmos a ação $x\in\Xcal_s$.

Usando essa notação, podemos reescrever a equação $\eqref{eq:shortestpathbellman1}$ como

$$
\begin{align}
V_t(s) = \min_{x\in\Xcal_s} \big(C(s,x) + V_{t+1}(S_{t+1})\big). \label{eq:shortestpathbellman2}
\end{align}
$$

em que $S_{t+1} = S^M(s,x)$. Podemos executar a equação $\eqref{eq:shortestpathbellman2}$ definindo $V_T(s) = 0$ para um valor de $T$ suficientemente grande (ou seja, o maior número de ligações que poderíamos percorrer em um caminho). Como podemos definir $T$ com um valor grande demais, precisamos acrescentar ao conjunto de escolhas em $\Xcal_s$ a possibilidade de permanecer no nó de destino no tempo $T$. Em seguida, definimos $t=T-1$ e executamos $\eqref{eq:shortestpathbellman2}$ para todos os estados $s$. Continuamos repetindo esse processo até chegarmos a $t=0$. Quando executamos o sistema dessa forma, o índice de tempo $t$ é, na verdade, um contador de quantas ligações percorremos.

A equação $\eqref{eq:shortestpathbellman2}$ é uma versão determinística do que é conhecido como equação de Bellman. No restante deste capítulo, mostraremos como usar a equação de Bellman para lidar com incerteza em nosso problema de caminho mais curto.

### Variáveis de estado

Neste problema básico, o estado $S_t=N_t$ é o nó em que estamos localizados após $t$ travessias de ligações. É tentador simplesmente dizer que o viajante está no nó $N_t$, mas, como veremos nas extensões, pequenas alterações produzem uma variável de estado mais rica, e é importante reconhecer o verdadeiro estado do nosso viajante.

### Variáveis de decisão

Estamos modelando a decisão como o nó $j$ até o qual nos deslocamos, dado que estamos no nó $i$. Existe uma grande comunidade que trabalha em problemas que se encaixam nessa classe, na qual a decisão é representada como uma ação $a$, em que $a$ assume um dos valores discretos de um conjunto $\Acal_s$ quando estamos no estado $s$.

Uma forma conveniente de representar decisões é definir

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i, \\ 0 & \text{otherwise.} \end{cases}
$$

Essa notação será útil quando escrevermos nossa função objetivo.

### Informação exógena

Após percorrer a ligação $(i,j)$, observamos $\chat_{tij}$, o custo que experimentamos ao percorrer de $i$ até $j$ durante a $t$-ésima travessia (que só observamos após percorrer a ligação). Por ora, vamos assumir que a nova observação $\chat_{tij}$ é armazenada em um banco de dados muito grande. Podemos então usar essas observações para estimar o custo médio $\cbar_{ij}$ de percorrer a ligação $(i,j)$ (excluímos o índice $t$ para $\cbar_{ij}$, já que se trata do custo médio independentemente de quando percorremos a ligação $(i,j)$).

### Função de transição

Em nosso problema de grafo básico, se tomarmos a decisão $x_{tij}=1$, o estado $N_t = i$ evolui para o estado $N_{t+1} = j$.

### Função objetivo

Podemos modelar nossos custos usando a seguinte notação: $\chat_{tij}$ é uma variável aleatória que fornece o custo de percorrer do nó $i$ até o nó $j$; $\cbar_{ij}$ é uma estimativa do valor esperado de $\chat_{tij}$ calculada pela média sobre nosso banco de dados de custos de viagem passados; e $\sigmabar_{ij}$ é nossa estimativa do desvio-padrão de $\cbar_{ij}$ calculada usando dados históricos.

Assumimos que precisamos tomar a decisão de qual ligação percorrer a partir de um nó $i$ antes de observar o valor real do custo aleatório $\chat_{tij}$. Isso significa que precisamos tomar nossa decisão usando nossa melhor estimativa de $\chat_{tij}$, que seria $\cbar_{ij}$.

Poderíamos escrever nossa função objetivo usando

$$
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T \sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \chat_{tij}x_{tij},
$$

mas essa formulação exigiria que conhecêssemos as realizações $\chat_{tij}$. Em vez disso, usaremos a esperança, o que nos dá

$$
\begin{align}
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T\sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \cbar_{ij}x_{tij}.  \label{shortestpathobjective1}
\end{align}
$$

A solução ótima desse problema seria definir todos os $x_{tij} = 0$, o que significa que não obtemos um caminho. Por essa razão, precisamos introduzir *restrições* da forma

$$
\begin{align}
\sum_{j\in\Ncal^+_q} x_{tqj} &= 1,  \label{shortestpathobjective2}\\
\sum_{i\in\Ncal^-_r} x_{t-1,ir} &= 1, \label{shortestpathobjective3}\\
\sum_{i\in\Ncal^-_j} x_{t-1,ij} - \sum_{k\in\Ncal^+_j} x_{tjk} &= 0, \quad \text{for } j \ne q, r,  \label{shortestpathobjective4}\\
x_{tij} &\geq 0, \quad (i,j) \in \Lcal,\ 0 \leq t \leq T.  \label{shortestpathobjective5}
\end{align}
$$

As equações $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$ representam um *programa linear*, e existem pacotes poderosos que podem ser usados para resolver esse problema quando escrito dessa forma. Contudo, existem algoritmos especializados (conhecidos simplesmente como "algoritmos de caminho mais curto") que aproveitam a estrutura do problema para produzir soluções excepcionalmente rápidas.

Entretanto, essa abordagem não fornece um método para lidar com incerteza. A seguir, descrevemos como resolver o problema de caminho mais curto estocástico usando nossa linguagem de projeto de políticas, o que fornecerá uma base para abordar a incerteza.

## Modelando a incerteza

Em nosso modelo básico, estamos usando apenas as estimativas pontuais $\cbar_{ij}$, que assumimos ser apenas uma média de observações anteriores coletadas, por exemplo, a partir de estimativas de custo de viagem obtidas de smartphones habilitados para GPS. Quando as estimativas se baseiam em observações de campo, o método é chamado *orientado por dados* (*data-driven*), o que significa que não precisamos de um modelo de incerteza — apenas precisamos observá-la.

Por exemplo, seja $\cbar_{ij}$ nossa estimativa atual do custo médio de viagem para a ligação $(i,j)$, e suponha que acabamos de observar um custo de $\chat_{tij}$. Poderíamos atualizar nossa estimativa usando

$$
\cbar_{ij} \leftarrow (1-\alpha) \cbar_{ij} + \alpha \chat_{tij},
$$

em que $\alpha$ é um parâmetro de suavização (às vezes chamado de taxa de aprendizado ou tamanho de passo) menor que 1.

Se atualizarmos nossas estimativas dessa forma, isso significa que o vetor de tempos de viagem estimados $\cbar$ varia dinamicamente, embora possamos realizar as atualizações apenas uma vez por dia, em vez de dentro de uma viagem. Em nossa estrutura de modelagem, o vetor de estimativas de custo $\cbar$ é capturado pelo estado inicial $S_0$. Se deixarmos que $n$ indexe o dia da viagem, faríamos $\cbar^n$ ser as estimativas de custo usando os primeiros $n$ dias de dados, que são então mantidas no estado inicial $S^n_0$ ao planejar para o dia $n+1$.

## Projetando políticas

Nossa "política" para esse problema determinístico é uma função que mapeia o "estado" (ou seja, em qual nó estamos) para uma ação (qual ligação percorremos). Podemos resolver esse problema otimizando o programa linear representado pelas equações $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$, o que nos dá o vetor $x^\ast \_{ij}$ para todas as ligações $(i,j)$. Podemos pensar nisso como uma função em que, dado o estado (nó $i$), escolhemos uma ação, que é a ligação $(i,j)$ para a qual $x_{ij} = 1$. Podemos escrever essa política como uma função $X^\pi(S_t)$ usando

$$
X^\pi(S_t=N_t=i) = j \quad \text{if } x_{ij} = 1.
$$

Alternativamente, podemos resolver a equação de Bellman como fizemos inicialmente para nosso problema de caminho mais curto determinístico usando a equação $\eqref{eq:shortestpathbellman1}$. Isso nos dá um valor $v_i$, que é o custo mínimo de viagem de cada nó $i$ até o nó de destino $r$. Uma vez calculados esses valores, podemos tomar decisões usando a seguinte política

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\cbar_{ij} + v_j). \label{eq:shortestpathbellman3}
\end{align}
$$

Isso significa que nosso problema de caminho mais curto "estocástico" pode ser resolvido exatamente como resolvemos nosso problema determinístico. Mais adiante, em nossas extensões, mostramos que, com uma pequena mudança, a situação se altera drasticamente.

## Avaliação de política

A avaliação de política não é necessária para esse problema, porque a política é ótima. Embora nossos custos de ligação sejam estocásticos, desde que não aprendamos nada sobre o custo real até depois de tomarmos nossa decisão, as decisões ótimas envolvem resolver um problema de caminho mais curto determinístico. Esta será a última vez neste livro em que veremos um problema como este.

Nas extensões, vamos introduzir incerteza de uma forma que nos permitirá apresentar uma estratégia algorítmica poderosa chamada *programação dinâmica aproximada* (também conhecida como *aprendizado por reforço*).

## Extensão - Caminhos mais curtos estocásticos adaptativos

Vamos alterar a informação que podemos usar ao tomar decisões. No nosso primeiro problema de caminho mais curto estocástico, assumimos que tínhamos que escolher o próximo link a percorrer *antes* de vermos o custo real de viagem sobre o link. Agora suponha que tomamos nossa decisão *depois* de observarmos os custos dos links, o que significa que tomamos a decisão usando o custo real $\chat_{ij}$ em vez de sua expectativa (ou média) $\cbar_{ij}$. Isso está ilustrado na Figura 5.3, onde um viajante no nó 6 passa a ver os custos reais nos links a partir do nó 6 (em vez de apenas o conhecimento das distribuições).

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph2.jpg" alt="Network for a stochastic shortest path problem where travelers get to see the link costs before making a decision." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.3.</span> Rede para um problema de caminho mais curto estocástico onde os viajantes conseguem ver os custos dos links antes de tomar uma decisão. Este grafo representa um viajante que percorreu o caminho 1-3-6, e agora vê os custos nos links a partir do nó 6.</figcaption>
</figure>

Se fingirmos por um momento que alguém pode nos fornecer os valores $v_j$, que é o custo mínimo de viagem do nó $j$ até nosso nó de destino $r$, uma política ótima para escolher o próximo nó a jusante seria escrita como

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\chat_{ij} + v_j). \label{eq:shortestpathbellman4}
\end{align}
$$

O problema aqui é que não podemos calcular $v_j$ como fizemos antes usando a equação $\eqref{eq:shortestpathbellman1}$. Na verdade, a mudança para ver os custos antes de tomarmos uma decisão requer uma alteração fundamental em nosso modelo básico.

Em nosso modelo determinístico, ou modelo estocástico estático, a variável de estado $S_t$ após "$t$" transições era o nó $i$ onde o viajante estava localizado. Essa era a única informação de que precisávamos naquele momento no tempo.

Em nosso novo modelo estocástico, apenas capturar o nó onde nosso viajante está localizado não é mais suficiente. Lembre-se de que, acima, introduzimos uma variável de estado como "toda a informação de que precisamos no tempo $t$ a partir do histórico para modelar o sistema a partir do tempo $t$ em diante." Mais adiante, no [Capítulo 7](/sdam/pt-BR/chapter-7/), forneceremos uma definição mais precisa, mas por ora esta servirá às nossas necessidades.

Nosso novo problema de caminho mais curto estocástico introduz uma nova informação necessária para tomar uma decisão: os custos a partir do nó onde estamos localizados. Vamos achar conveniente introduzir dois tipos de variáveis de estado: $N_t$, o estado físico do sistema, que geralmente é controlado diretamente pelas decisões, e $I_t$, outra informação de que precisamos para tomar uma decisão. Em nosso problema de rede, nosso estado físico seria o nó onde estamos localizados, enquanto a variável de "outra informação" $I_t$ capturaria os custos nos links a partir do nó onde estamos localizados, que escrevemos como

$$
I_t = (\chat_{tij}), i=N_t, j\in\Ncal^+_i.
$$

Suponha que no tempo $t$ que $N_t = i$. Vamos adicionar o tempo $t$ ao nosso índice para os custos dos links, o que significa que substituiremos $\chat_{ij}$ por $\chat_{tij}$ para nos referir ao custo quando vamos de $i$ para $j$ no tempo $t$. Poderíamos então escrever

$$
S_t = (N_t, I_t) = \big(i, (\chat_{tij})_{j\in\Ncal^+_i}\big).
$$

Para ver o que isso faz com nossa forma anterior de resolver nosso problema de caminho mais curto, dê uma nova olhada na equação de Bellman como a introduzimos primeiro na equação $\eqref{eq:shortestpathbellman2}$, que se torna

$$
\begin{align}
V_t(S_t) = \min_{x_t\in\Xcal_s} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big), \label{eq:shortestpathbellman5}
\end{align}
$$

onde $S_{t+1}$ seria dado por $S_{t+1} = (N_{t+1}, I_{t+1})$, onde $N_{t+1}$ é o nó produzido por nossa decisão $x$, então se $x_{ij} =1$, então $N_{t+1} = j$; e $I_{t+1}$ são os custos que são observados a partir do nó $N_{t+1}$, que depende da decisão $x_t$. Se $x_t$ nos envia ao nó $j$ de modo que $N_{t+1} = j$, então $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$ (assumindo que há três links a partir do nó $j$).

Suponha que $N_t = i$. A função de custo $C(S_t,x)$ é dada por

$$
C(S_t,x) = \sum_{j\in\Ncal^+_i} \chat_{tij}x_{ij}.
$$

Lembre-se de que $S_t$ (onde $N_t = i$) contém os custos $\chat_{tij}$ para os links $(i,j)$ a partir de $i$, então esses são conhecidos (e estão contidos em $S_t$).

A equação $\eqref{eq:shortestpathbellman5}$ é fácil de escrever, mas difícil de resolver agora que nossa variável de estado é um vetor (o que faz explodir o número de estados). Vamos primeiro descrever dois desafios computacionais. Depois, vamos introduzir a ideia do estado pós-decisão para resolver um dos dois desafios. Por fim, vamos fornecer uma breve introdução a uma classe de métodos conhecidos como programação dinâmica aproximada (mas frequentemente chamados de aprendizado por reforço) para lidar com o segundo desafio.

### Desafios computacionais

Começamos identificando dois desafios computacionais:

- Os custos dos links $I_{t+1}$ a partir do nó a jusante $N_{t+1}$ (que é determinado pela decisão $x$) não são conhecidos. Dito de outra forma, $I_{t+1}$ é uma variável aleatória no tempo $t$, o que significa que não podemos nem calcular $V_{t+1}(S_{t+1})$. Corrigimos isso tomando a expectativa, que escrevemos como

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big). \label{eq:shortestpathbellman6}
\end{align}
$$

  O operador de expectativa $\E$ deve ser visto como o cálculo de uma média sobre os possíveis custos de link que um viajante pode encontrar ao chegar ao nó $N_{t+1}$ ao tomar a decisão $x$ (que determina $N_{t+1}$).

  Para escrever isso de forma mais explícita, suponha que $x_t$ nos envia ao nó $j$ (o que significa que $x_{tij} = 1$), e quando chegamos vemos $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$. Aprendemos esses custos quando chegamos ao nó $j$ no tempo $t+1$, mas eles são aleatórios quando estamos no nó $i$ no tempo $t$ pensando sobre o que fazer.
- O espaço de estados – Mesmo se assumirmos que os custos $\chat_{t+1,j}$ são discretos, o espaço de estados acabou de crescer dramaticamente. Imagine que discretizamos os custos em faixas de 20 valores. Se houver três links a partir de cada nó, nosso espaço de estados cresceu do número de nós para um que é $20 \times 20 \times 20 = 8,000$ vezes maior.

Para ilustrar o desafio de calcular a expectativa, suponha que cada custo $\chat_{t+1,jk}$ possa assumir os valores $c_1, c_2, \ldots, c_L$ com probabilidades $p_{jk}(c_{\ell})$. Por exemplo, $c_1$ pode ser 1 minuto, $c_2$ pode ser 2 minutos, e assim por diante. A probabilidade $p_{jk}(c_{\ell})$ é a probabilidade de que $\chat_{t+1,jk} = c_\ell$.

Agora suponha que a decisão $x$ nos leve ao nó $j$, após o qual enfrentamos uma escolha de percorrer os links $(j,k_1), (j,k_2)$ ou $(j,k_3)$. Calcularíamos nossa expectativa usando

$$
\begin{align}
\E \{V_{t+1}(S_{t+1})\vert S_t,x\} &= \sum_{\ell_1=1}^L p_{jk_1}(c_{\ell_1}) \sum_{\ell_2=1}^L p_{jk_2}(c_{\ell_2}) \sum_{\ell_3=1}^L p_{jk_3}(c_{\ell_3}) \nonumber \\
          & \quad \times V_{t+1}(S_{t+1} = (j, (c_{\ell_1},c_{\ell_2},c_{\ell_3}))). \label{eq:shortestpathexpectation}
\end{align}
$$

Para ser direto, a equação $\eqref{eq:shortestpathexpectation}$ é bem feia. Aquelas triplas somatórias serão difíceis de calcular.

Agravando o problema está o tamanho do espaço de estados. Para usar a equação de Bellman na equação $\eqref{eq:shortestpathbellman6}$ (ou $\eqref{eq:shortestpathbellman2}$), temos que calcular $V_t(S_t)$ para cada estado possível $S_t$. Quando o estado era apenas um nó, isso não era tão ruim, mesmo que houvesse milhares (até dezenas de milhares) de nós. No entanto, adicionar a variável de informação $I_t$ ao estado torna o problema drasticamente mais difícil.

Para ver o quão rapidamente isso aumenta o espaço de estados, imagine que existam 20 valores possíveis para cada variável de custo $\chat_{tij}$. Isso significa que existem 8.000 valores possíveis de $I_t$. Se nossa rede tiver 10.000 nós (ou seja, $N_t$ pode assumir 10.000 valores), então $S_t$ agora pode assumir $10,000 \times 8,000 = 80,000,000$ valores.

Este é nosso primeiro vislumbre do que acontece quando uma variável de estado se torna um vetor. O número de valores possíveis da variável de estado cresce exponencialmente, um processo amplamente conhecido como a *maldição da dimensionalidade*.

### Usando o estado pós-decisão

Nem tudo está perdido para este problema. Há um truque que podemos usar que nos permite superar a maldição da dimensionalidade para este problema em particular. O principal desafio computacional com a equação de Bellman na equação $\eqref{eq:shortestpathbellman6}$ é o operador de expectativa, que é facilmente a peça mais perigosa de notação na resolução de problemas de decisão sequencial.

Vamos usar duas estratégias poderosas para superar esse problema neste contexto (e vamos usar essas estratégias para outros contextos também). Primeiro, introduzimos a ideia do *estado pós-decisão*, que designamos $S^x_t$. O estado pós-decisão é o estado do sistema imediatamente *após* tomarmos uma decisão, e antes que qualquer nova informação chegue, razão pela qual o indexamos por $t$.

Para ver os estados pré e pós-decisão, retorne à Figura 5.3. Como vimos antes, nosso estado pré-decisão (que chamamos de "o estado") $S_t$ é

$$
S_t = (6, (12.7, 8.9, 13.5)).
$$

Uma vez que tomamos uma decisão, ainda estamos no nó 6, mas imagine que a decisão que tomamos foi ir para o nó 9. Poderíamos descrever nosso estado físico pós-decisão $R^x_t = 9$, que poderíamos alternativamente afirmar como "indo para o nó 9." No entanto, não precisamos mais daquelas problemáticas observações de custos nos links a partir do nó 6, dadas por $(\chat_{t+1,6,5}, \chat_{t+1,6,9}, \chat_{t+1,5,7}) = (12.7, 8.9, 13.5)$. Isso significa que nosso estado pós-decisão é

$$
S^x_t = (9).
$$

Usando o estado pós-decisão, vamos dividir a equação de Bellman em duas etapas. Em vez de ir de $S_t$ para $S_{t+1}$ para $S_{t+2}$ como fazemos na equação de Bellman $\eqref{eq:shortestpathbellman6}$, vamos primeiro passar do estado pré-decisão $S_t$ para o estado pós-decisão $S^x_t$, o que fazemos reescrevendo a equação $\eqref{eq:shortestpathbellman6}$ como

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V^x_t(S^x_t) \big), \label{eq:shortestpathbellman6a}
\end{align}
$$

onde $V^x_t$ é o valor de estar no estado pós-decisão $S^x_t$. Observe que não temos mais a expectativa, porque, por construção, o estado pós-decisão envolve uma decisão dada $x_t$ (por exemplo, "ir para o nó 9"), mas nenhuma nova informação (que é a parte aleatória). Observe que, neste caso, o estado pós-decisão $S^x_t$ consiste em apenas o nó, o que significa que é muito mais simples do que $S_t$.

Não estamos fora de perigo. Ainda temos que calcular $V^x_t(S^x_t)$, o que é feito usando

$$
\begin{align}
V^x_t(S^x_t) = \E \{V_{t+1}(S_{t+1})\vert S_t,x\}. \label{eq:shortestpathbellman6b}
\end{align}
$$

Assim, ainda temos que calcular essa expectativa, e ela não ficou mais fácil. Suponha que nossa decisão $x$ seja ir para o nó $j$ (o que significa que $x_{ij}=1$), e seja $\chat_{t+1,j} = (\chat_{t+1,jk},~k\in\Ncal^+\_j)$ o conjunto de custos dos links a partir do nó $j$. Nosso próximo estado pré-decisão $S_{t+1}$ seria então

$$
S_{t+1} = (j, \chat_{t+1,j}).
$$

Agora suponha que tenhamos uma maneira de amostrar valores possíveis de $\chat_{t+1,j}$. Podemos fazer isso a partir de um banco de dados de observações históricas de custos de links, ou podemos construir uma distribuição de probabilidade a partir de dados passados e amostrar dela. Suponha que faremos isso iterativamente, e seja $\chat^n_{t+1,ij}$ a $n$-ésima amostra do custo do link de $i$ para $j$. Podemos usar essa estratégia baseada em amostragem para criar uma estimativa da expectativa, em vez do valor exato. Isso é feito na próxima seção.

### Programação dinâmica aproximada

Usar variáveis de estado pós-decisão resolve o problema de calcular a expectativa ao encontrar a melhor decisão $x_t$, mas ainda temos a questão de lidar com o grande espaço de estados. Para isso, vamos recorrer aos métodos amplamente conhecidos como *programação dinâmica aproximada*, onde substituímos a função de valor pós-decisão $V^x_t(S^x_t)$ por uma aproximação.

Vamos construir aproximações $\Vbar^x_t(j)$ do valor de estar no nó $j$, onde

$$
\Vbar^{x,n}_t(S^x_t = j) \approx \E \{V_{t+1}(S_{t+1})\vert S^x_t\}.
$$

Seja $\Vbar^{x,n}\_t(j)$ nossa aproximação de $\E \lbrace V_{t+1}(S_{t+1})\vert S^x_t\rbrace $ após observar $n$ amostras. Uma maneira de construir essa aproximação é usar amostras do valor de estar no nó $j$. Imagine que vamos passar adiante através da rede, tomando decisões usando aproximações $\Vbar^{x,n-1}\_t(S^x_t)$ obtidas de iterações anteriores, junto com custos amostrados $\chat^n_{tij}$. Podemos obter uma estimativa amostrada do valor de estar no estado $S_t$ usando

$$
\begin{align}
\vhat^{x,n}_t(i) = \min_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(S^x_t = j)\big). \label{eq:vhatsinglepass}
\end{align}
$$

Em seguida, vamos usar $\vhat^{x,n}\_t(i)$, que é o valor de estar no estado $S_t$ (que inclui tanto o nó $i$ quanto os custos $\chat^n_{tij}$ para todos os $j$ a partir do nó $i$), para atualizar o estado pós-decisão anterior $S^x_{t-1}$, o que fazemos usando

$$
\begin{align}
\Vbar^{x,n}_{t-1}(i) = (1-\alpha_n) \Vbar^{x,n-1}_{t-1}(i) + \alpha_n \vhat^{x,n}_t(i). \label{eq:vhatsmoothing}
\end{align}
$$

Aqui, $\alpha_n$ é conhecido como fator de suavização ou taxa de aprendizado, mas por razões técnicas também é conhecido como "tamanho de passo" ("stepsize"). Podemos usar uma constante como $\alpha_n = .1$ ou $.05$, mas uma estratégia comum é usar uma fórmula decrescente como

$$
\alpha_n = \frac{\theta^\alpha}{\theta^\alpha + n - 1},
$$

onde $\theta^\alpha$ é um parâmetro ajustável. Por exemplo, se definirmos $\theta^\alpha = 1$, obtemos $\alpha_n = 1/n$. Neste caso, é possível verificar que a equação $\eqref{eq:vhatsmoothing}$ está fazendo uma média sobre os valores $\vhat^n_t(i)$. Na prática, é improvável que essa fórmula funcione bem para este problema, porque o tamanho de passo tende a zero muito rapidamente.

Fazemos uma pausa para observar duas vantagens do uso do estado pós-decisão $S^x_t$:

- Não precisamos mais lidar com a expectativa ao otimizar sobre a escolha dos links de saída de um nó (veja a equação $\eqref{eq:vhatsinglepass}$).
- Aproximar a função de valor $\Vbar^{x,n}\_t(S^x_t = i)$ é muito mais simples, já que o estado pós-decisão $S^x_t$ agora é apenas um escalar, o que é muito mais fácil de estimar do que uma função de dimensão mais alta.

Um desafio com a equação $\eqref{eq:vhatsinglepass}$ é que precisaremos de valores iniciais para $\Vbar^{x,0}\_t(i)$. Uma escolha natural seria resolver a versão determinística deste problema, na qual os custos $\chat_{tij}$ são igualados a estimativas de suas médias, e então obter estimativas iniciais do custo incorrido para ir de cada nó até o destino.

Um método alternativo é usar as estimativas $\Vbar^{x,n-1}(i)$ para tomar decisões usando

$$
\begin{align}
x^n_t(i) = \argmin_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(j)\big). \label{eq:stochasticpath}
\end{align}
$$

A decisão $i^n_t = x^n_t(i)$ nos dá o próximo nó após o nó $i$ com base nos custos amostrados $\chat^n_{tij}$ e nas estimativas do custo $\Vbar^{x,n-1}\_t(j)$ para ir do nó $j$ até o nó de destino $r$. Quando chegamos a $r$, temos um caminho completo formado pelos nós

$$
(q, i^n_1, i^n_2, \ldots, r).
$$

Também temos os custos amostrados $\chat^n_{t,i^n_t,i^n_{t+1}}$ ao longo de todo o caminho. Suponha que existam $T$ elos no caminho. Percorremos então o caminho de trás para frente, começando por $\vhat^n_T(r) = 0$, e calculando

$$
\begin{align}
\vhat^n_t(i^n_t) = \chat^n_{t,i^n_t,i^n_{t+1}} + \vhat^n_{t+1}(i^n_{t+1}).  \label{eq:vhatdoublepass}
\end{align}
$$

Em seguida, usamos essas estimativas em nosso processo de suavização na equação $\eqref{eq:vhatsmoothing}$.

Este procedimento é uma forma de *programação dinâmica aproximada* (também conhecida como *aprendizado por reforço*). Mais especificamente, trata-se de uma forma de *programação dinâmica aproximada progressiva*, já que avança passo a passo no tempo. Ilustramos um procedimento de passagem progressiva pura usando a equação $\eqref{eq:vhatsinglepass}$, que exige passagens únicas pela rede, e um procedimento de dupla passagem usando a equação $\eqref{eq:vhatdoublepass}$, que consiste em primeiro avançar pelo grafo simulando decisões e, em seguida, retroceder para atualizar o valor de se estar em cada estado.

Este método é muito robusto em relação a estados pré-decisão complexos. Por exemplo, não nos importamos com quantos elos podem sair de cada nó, pois estamos aproveitando o fato de que nossa variável de estado pós-decisão é bastante simples (neste caso, trata-se apenas do nó em que estamos).

## O que aprendemos?

- Esta é a primeira (e única) vez em que temos um problema no qual conseguimos encontrar a política ótima para um problema de decisão sequencial. Embora estejamos otimizando sobre uma rede estocástica, o viajante não recebe nenhuma informação antecipada sobre um elo antes de percorrê-lo, o que significa que ele precisa fazer sua escolha com base em custos esperados.
- Como o modelo básico se reduz a um problema de caminho mínimo determinístico, podemos resolvê-lo de forma ótima, o que é um exemplo raro de conseguirmos resolver o problema base de forma ótima (na verdade, esta é a única vez em que isso acontecerá neste livro).
- Em seguida, introduzimos a dimensão em que os custos são revelados antes de o viajante percorrer o elo. Reformulamos o problema, mostrando que a variável de estado agora se torna muito mais complexa, consistindo no nó em que o viajante está localizado e nos custos dos elos que saem do nó. Este problema não pode mais ser resolvido exatamente por programação dinâmica.
- Introduzimos e descrevemos um algoritmo de programação dinâmica aproximada usando o conceito de uma variável de estado pós-decisão, que elimina a esperança embutida na equação de Bellman, reduzindo o espaço de estados de volta apenas ao conjunto de nós.
- Este é um exemplo de política de VFA. Como não podemos calcular as funções de valor de forma exata, não podemos garantir que se trate de uma política ótima.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>No problema original de caminho mínimo estocástico, em que só observamos o custo real após percorrer o elo, explique por que isso pode ser resolvido exatamente como um simples problema de caminho mínimo determinístico.</li>
<li>Para a versão em que observamos o custo real sobre um elo antes de escolher em que direção nos mover, forneça as variáveis de estado pré-decisão e pós-decisão.</li>
<li>Na equação $\eqref{eq:vhatsmoothing}$, usamos o valor amostrado $\vhat^{x,n}_t(i)$ de estar no estado $S_t$ para atualizar o valor estimado de estar no estado pós-decisão anterior dado por $\Vbar^{x,n}_{t-1}(i)$. Crie um pequeno exemplo numérico para ilustrar esta equação.</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Um viajante precisa atravessar o grafo mostrado na Figura 5.4 do nó 1 até o nó 11. Existe uma probabilidade de que cada elo possa ser percorrido, mostrada no grafo (essas probabilidades são conhecidas com antecedência). Quando o viajante chega ao nó $i$, ele passa a ver quais elos (se houver) podem ser percorridos a partir do nó $i$. Se nenhum elo puder ser percorrido, a viagem termina em fracasso. O objetivo é escolher um caminho que maximize o produto dessas probabilidades, mas ela está limitada a percorrer os elos disponíveis.
  <ol type="a">
    <li>Descreva uma variável de estado apropriada para este problema (com notação).</li>
    <li>Imagine que a viajante esteja no nó 6, tendo seguido o caminho 1-2-6, e então vê que os elos 6-9 e 6-10 estão disponíveis (mas 6-8 não está disponível); qual é seu estado (pré-decisão)? Estou buscando os valores numéricos das variáveis de estado que você forneceu na parte (a).</li>
    <li>Suponha que a viajante consiga se mover para o nó 9 e decida fazer isso. Qual é o estado pós-decisão após tomar essa decisão?</li>
    <li>Escreva a equação de Bellman que caracteriza o valor de estar no estado pré-decisão após percorrer o caminho 1-2-6, em termos dos estados pré-decisão a jusante. Calcule numericamente o valor de estar no estado após percorrer 1-2-6 e observar que 6-9 e 6-10 estão disponíveis (mas 6-8 não está).</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariableminproductprobability.jpg" alt="Um problema de caminho mínimo para maximizar a probabilidade de completar um caminho." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.4.</span> Um problema de caminho mínimo para maximizar a probabilidade de completar um caminho.</figcaption>
</figure>
</li>
<li>(Esta questão se aplica à extensão adaptativa do caminho mínimo estocástico apresentada acima.) Escreva as etapas envolvidas no ajuste de uma aproximação de função de valor para os estados pós-decisão, respondendo:
  <ol type="a">
    <li>Escreva os estados pré-decisão e pós-decisão. Se a rede tiver $N$ nós, e se os custos em cada elo forem discretizados em 20 valores (suponha no máximo $L$ elos saindo de qualquer nó), qual é o tamanho dos espaços de estado pré-decisão e pós-decisão?</li>
    <li>Forneça a equação para calcular $\vhat^n_t(i)$. Esta é a estimativa de estar em um estado pré-decisão ou em um estado pós-decisão? Explique.</li>
    <li>A que se refere o índice de "tempo" $t$?</li>
    <li>Forneça a equação de atualização para o valor de estar em um estado pós-decisão.</li>
    <li>Por que precisamos do valor de estar em um estado pós-decisão em vez de um estado pré-decisão?</li>
  </ol>
</li>
<li>A Figura 5.5 ilustra as escolhas que um motorista de Uber pode enfrentar. No nó 1, ela tem a escolha entre as viagens (2-4) e (3-5). Suponha que as viagens durem pelo menos 15 minutos, e que se espera que sejam atendidas em até 10 minutos, ou serão perdidas. Isso significa que as viagens que saem dos nós 6, 7 e 8 só se tornam conhecidas depois que as viagens (2-4) e (3-5) já teriam sido concluídas.

<figure class="book-figure">
  <img src="/assets/images/sdam/uber_driver.jpg" alt="Uma árvore de decisão ilustrando as escolhas enfrentadas por um motorista de Uber." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.5.</span> Uma árvore de decisão ilustrando as escolhas enfrentadas por um motorista de Uber.</figcaption>
</figure>

Suponha que nossa motorista primeiro escolha (3-5) e depois escolha (7-10). Após completar (7-10), ela precisa se deslocar até uma estação de recarga para carregar sua bateria antes de retornar para casa (suponha que ela escolha a estação de recarga de menor custo).

Ao lado de cada movimento está indicado quanto ela ganha (denote isso por $c_{ij}$), sendo positivo ao atender um cliente e negativo ao se deslocar vazia. É claro que ela está tentando maximizar os lucros ao longo de todo o seu turno.

O estado de nossa motorista é sua localização (número do nó) ou o número do nó para o qual está se dirigindo, juntamente com qualquer outra informação disponível naquele momento relevante para sua decisão.
  <ol type="a">
    <li>Dado que ela está inicialmente no nó 1, qual é seu estado (pré-decisão)? Qual é seu estado pós-decisão após decidir aceitar a viagem (3-5)?</li>
    <li>Seja $s_1$ o estado (pré-decisão) após atender a viagem (3-5). Seja $\vhat_1(s_1)$ o valor de estar no estado $s_1$. Qual é $\vhat_1(s_1)$?</li>
    <li>Seja $s^x_0$ o estado pós-decisão anterior a $s_1$, e seja $\vhat^x_0(s^x_0)$ o valor de estar em $s^x_0$. Qual é $\vhat^x_0(s^x_0)$?</li>
    <li>Qual é a vantagem computacional de usar estados pós-decisão em vez de estados pré-decisão em termos de cálculo de uma política? Esta deve ser uma resposta de uma única frase.</li>
  </ol>
</li>
</ol>

**Questões de programação**

Estes exercícios usam o módulo Python *StochasticShortestPath_Static*, disponível em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>(Esta questão se aplica à extensão adaptativa do caminho mínimo estocástico apresentada acima.) Atualmente, o algoritmo possui um fator de suavização fixo para estimar as aproximações de função de valor ao resolver o problema modificado na extensão. Implemente um tamanho de passo decrescente, da seguinte forma:

$$
\alpha_n = \frac{\theta^{step}}{\theta^{step} + n-1}.
$$

Execute o módulo Python para $\theta^{step} = (1, 5, 10, 20, 50)$ por 100 iterações e compare o desempenho tanto em termos da taxa de convergência quanto da solução final. Qual você escolheria?</li>
</ol>
{% endraw %}
