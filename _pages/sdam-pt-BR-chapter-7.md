---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 7: Aplicações, revisitadas"
permalink: /sdam/pt-BR/chapter-7/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 80dcb065dd6e7cae
---


{% raw %}
Agora que revisamos uma série de configurações de problemas, vamos fazer uma pausa e usar essas aplicações para ilustrar em maior profundidade algumas das questões de modelagem que abordamos no [Capítulo 1](/sdam/pt-BR/chapter-1/).

Começando com os problemas de estoque no Capítulo 1, já cobrimos seis classes de problemas de decisão sequencial. Para cada problema, ilustramos uma ou duas estratégias para tomar decisões:

- **Capítulo 1)** Problemas de estoque – Introduzimos os problemas de decisão sequencial usando variações de um problema simples de estoque. As políticas incluíam order-up-to e uma política baseada em previsões ajustadas.
- **Capítulo 2)** Vendendo um ativo – Tivemos que decidir quando vender um ativo financeiro. As políticas incluíam variações de comprar-baixo, vender-alto.
- **Capítulo 3)** Planejamento adaptativo de mercado – Este problema usou uma busca estocástica baseada em derivadas, onde o problema de decisão sequencial era escolher um tamanho de passo (stepsize), o que ilustramos usando funções paramétricas simples.
- **Capítulo 4)** Aprendendo o melhor tratamento para diabetes – Este é um clássico problema de aprendizado ativo conhecido como problema do bandido multi-braço (multiarmed bandit). Projetamos políticas baseadas em problemas de otimização parametrizados.
- **Capítulo 5)** Caminhos mais curtos estocásticos estáticos – Encontramos uma solução ótima de uma versão particular de um problema de caminho mais curto estocástico usando uma recursão clássica de programação dinâmica que pudemos resolver exatamente, e então introduzimos uma versão estocástica mais complexa que resolvemos usando programação dinâmica aproximada, explorando uma variável de estado pós-decisão.
- **Capítulo 6)** Caminhos mais curtos estocásticos dinâmicos – Aqui mudamos para um problema de caminho mais curto dinâmico onde as estimativas dos custos de caminho esperados evoluem ao longo do tempo (no caso estático do Capítulo 5, nossas estimativas dos custos esperados não mudavam). Usamos isso para ilustrar uma política básica de horizonte de previsão determinística, e uma política de horizonte de previsão parametrizada.

Anteriormente, introduzimos quatro classes de políticas. Nas aplicações que revisamos até agora, vimos ilustrações de cada uma das quatro classes. Neste capítulo, vamos revisar as quatro classes com maior profundidade, e depois voltaremos ao nosso conjunto de aplicações e identificaremos a classe de cada uma das políticas sugeridas.

## As quatro classes de políticas

Primeiro observamos que as quatro classes de políticas podem ser divididas em duas categorias: a classe de busca de política, e a classe de horizonte de previsão. Cada uma dessas pode então ser subdividida em duas classes, criando as quatro classes de políticas. Elas são descritas em maior detalhe abaixo.

### Busca de política

A classe de políticas de "busca de política" envolve buscar sobre um conjunto de funções para tomar decisões a fim de encontrar a função que funciona melhor em média, usando qualquer objetivo que seja apropriado para o problema. Na maioria das vezes, isso significará buscar o melhor valor de um conjunto de parâmetros que caracterizam uma política parametrizada, mas também significa que talvez tenhamos que avaliar diferentes parametrizações.

As políticas de busca de política podem ser divididas em duas classes:

- **Aproximações de função de política (PFAs)** – São funções analíticas que mapeiam diretamente um estado para uma ação. Alguns exemplos são:
    - Uma função parametrizada como a política "high-low" apresentada no [Capítulo 2](/sdam/pt-BR/chapter-2/), que repetimos aqui

    $$
    X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
    $$

    onde $\theta^{sell-low} = (\theta^{low},\theta^{high})$. Outros exemplos são a política order-up-to que vimos no [Capítulo 1](/sdam/pt-BR/chapter-1/), e a política de previsão ajustada.
    - Uma função linear, tal como

    $$
    X^\pi(S_t\vert \theta) = \theta_0 + \theta_1 \phi_1(S_t) + \theta_1 \phi_1(S_t) + \ldots + \theta_F \phi_F(S_t)
    $$

    onde $(\phi_f(S_t)),~f=1, \ldots, F$ é um conjunto de features ("linear" significa linear no vetor de parâmetros $\theta$ – as features $\phi_f(S_t)$ podem ser altamente não lineares em $S_t$). Por exemplo, podemos estar tentando decidir quanto ofertar para que um filme seja anunciado em um site, e uma feature poderia ser o gênero do filme ou o nome do ator ou atriz principal.

    Funções lineares (também conhecidas como "políticas afins") são populares, mas note que você não poderia usar uma função linear para aproximar funções degrau como as políticas comprar-baixo, vender-alto ou order-up-to ilustradas acima.
    - Funções avançadas como funções localmente lineares ou redes neurais, embora estas tipicamente tenham um grande número de parâmetros (os pesos em uma rede neural) que precisam ser ajustados.
- **Aproximações de função de custo (CFAs)** – São políticas que exigem resolver um problema de otimização parametrizado, onde podemos parametrizar tanto a função objetivo quanto as restrições. As CFAs abrem a porta para resolver problemas de decisão de alta dimensionalidade. Alguns exemplos são:
    - Um exemplo simples de uma aproximação de função de custo parametrizada é a política de estimativa de intervalo que introduzimos no [Capítulo 4](/sdam/pt-BR/chapter-4/) e repetimos aqui

    $$
    X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
    $$

    - Modelos de otimização parametrizados – Vimos isso no [Capítulo 6](/sdam/pt-BR/chapter-6/) quando escolhemos o percentil $\theta$ dos custos de link. Esta é uma heurística amplamente usada na indústria que tem sido negligenciada pela literatura de pesquisa. As companhias aéreas usam essa ideia para otimizar a movimentação de suas aeronaves e tripulações na presença de atrasos climáticos significativos. Operadores de rede que planejam o agendamento de geradores de energia inserirão capacidade de reserva para garantir que a demanda possa ser atendida caso um gerador falhe.

Tanto as PFAs quanto as CFAs têm parâmetros que precisam ser ajustados. A única diferença é se a política envolve um problema de otimização embutido ou não. Ambas são excepcionalmente poderosas e são amplamente usadas em diferentes contextos.

### Aproximações de horizonte de previsão

Políticas baseadas em aproximações de horizonte de previsão são construídas aproximando os custos (ou recompensas) futuros decorrentes de tomar uma decisão agora, que são então considerados junto com o custo (ou recompensa) inicial da decisão inicial.

- **Políticas baseadas em aproximações de função de valor (VFAs)** – São políticas baseadas na equação de Bellman. A forma mais básica da equação de Bellman para problemas determinísticos foi apresentada pela primeira vez no [Capítulo 5](/sdam/pt-BR/chapter-5/) como

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V_{t+1}(S_{t+1}) \big).
$$

  Há muitos problemas em que a transição para $S_{t+1}$ envolve informação (contida em $W_{t+1}$) que não é conhecida no tempo $t$, o que significa que $S_{t+1}$ é uma variável aleatória no tempo $t$. Nesse caso, temos que inserir uma esperança como fizemos anteriormente, o que nos dá

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  Na prática, tipicamente temos que substituir a função de valor $V_{t+1}(S_{t+1})$ por uma aproximação $\Vbar_{t+1}(S_{t+1})$, como fizemos na seção de programação dinâmica aproximada do [Capítulo 5](/sdam/pt-BR/chapter-5/). O campo que estuda essas aproximações é conhecido por nomes como programação dinâmica aproximada, aprendizado por reforço (que se originou na ciência da computação), e programação dinâmica adaptativa (o termo usado na comunidade de controles de engenharia). Nesse caso, a política seria dada por

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \E \{\Vbar_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  Se usarmos o estado pós-decisão $S^x_t$, podemos escrever nossa política como

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \Vbar^x_t(S^x_t) \big),
$$

  o que ilustramos no [Capítulo 5](/sdam/pt-BR/chapter-5/).

  Usamos o problema de caminho mais curto determinístico para ilustrar uma aplicação onde as funções de valor podiam ser calculadas exatamente. Isso às vezes pode ser feito em problemas estocásticos, mas na maioria das aplicações, isso tem que ser feito de forma aproximada. O desafio é fazer cálculos que sejam de qualidade suficientemente alta para produzir políticas eficazes.

  Uma estratégia de aproximação popular para funções de valor é usar um modelo linear dado por

$$
\begin{align}
\Vbar^x_t(S^x_t\vert \theta^{VFA}) = \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t), \label{eq:hybridlinearvfa}
\end{align}
$$

  onde $(\phi_f(S^x_t))\_{f\in\Fcal}$ é um conjunto de features definido pelo usuário e $\theta^{VFA}$ é um conjunto de parâmetros escolhidos usando algoritmos de programação dinâmica aproximada.

  Ajustamos o modelo linear coletando "observações" do valor $\vhat^n_t$ de estar no estado $S^n_t$ na $n$-ésima iteração. Seja $\thetabar^{VFA,n-1}$ a estimativa de $\theta^{VFA}$ após $n-1$ atualizações. Há métodos que nos permitem usar $\vhat^n_t$ para facilmente atualizar $\thetabar^{VFA,n-1}$ e obter $\thetabar^{VFA,n}$. Isso nos dá uma política VFA que podemos escrever como

$$
\begin{align}
X^{VFA}_t(S_t\vert \theta^{VFA}) &= \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t\vert \theta^{VFA})\big) \nonumber \\
                            &= \argmax_x \left(C(S_t,x) + \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t)\right).
\label{eq:linearvfa}
\end{align}
$$

  Aproximar funções de valor usando modelos lineares tem sido muito popular, mas praticamente não há garantias teóricas sobre a qualidade da solução resultante. Pior ainda, há evidência empírica de que os resultados podem ser bastante ruins. No entanto, isso continua popular porque é uma maneira fácil de "obter um número."

  Também popular hoje em dia é usar redes neurais (especialmente redes neurais profundas) para aproximar uma função de valor. Redes neurais são atraentes já que evitam a necessidade de projetar o conjunto de features $(\phi_f(S_t))$ para $f\in\Fcal$. Deve-se ter cautela, especialmente quando temos que trabalhar com observações ruidosas da função de valor, já que a enorme flexibilidade das redes neurais pode causar sobreajuste (overfitting).
- **Aproximações de horizonte de previsão direto (DLAs)** – As três primeiras classes de políticas exigem encontrar alguma forma de aproximação funcional: a política (para PFAs), a função sendo otimizada (para CFAs), ou o valor de estar em um estado futuro (para VFAs). No entanto, há muitos problemas em que essas aproximações funcionais simplesmente não são possíveis.

  A maneira "correta" de resolver uma DLA é resolver o problema verdadeiro no futuro, começando a partir do estado $S_{t+1}$ produzido ao começar no estado $S_t$, tomar a ação $x_t$, e então observar a informação aleatória $W_{t+1}$. A parte difícil é que, além de modelar incertezas futuras $W_{t+1}, W_{t+2}, \ldots$, também temos que tomar decisões ótimas $x_{t+1}, x_{t+2}, \ldots$, cada uma das quais depende do estado futuro $S_{t+1}, S_{t+2}, \ldots$, que são aleatórios.

  Embora seja bastante confuso (e talvez assustador), esta política significa resolver

$$
\begin{align}
X^{\ast }(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\min_{\pi} \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesDLA}
\end{align}
$$

  Se pudéssemos calcular a equação $\eqref{eq:policiesDLA}$, teríamos uma política ótima. É bastante raro que a equação $\eqref{eq:policiesDLA}$ possa ser resolvida exatamente. O problema básico de caminho mais curto estocástico no [Capítulo 5](/sdam/pt-BR/chapter-5/) é um exemplo, mas isso ocorre porque a incerteza surge de uma maneira particularmente simples.

  Na maioria das aplicações, abordamos a resolução de $\eqref{eq:policiesDLA}$ resolvendo um modelo de horizonte de previsão aproximado. Em vez de escrever nossa sequência de estados, decisões e informações como

$$
(S_0, x_0, W_1, \ldots, S_t, x_t, W_{t+1}, \ldots),
$$

  criamos um conjunto simplificado de estados, decisões e informações para um modelo que estamos resolvendo no tempo $t$ que representamos usando

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots),
$$

  onde $\Stilde_{tt'}$ é tipicamente uma variável de estado simplificada para o modelo de horizonte de previsão que criamos ao tomar uma decisão no tempo $t$, para o tempo $t'$ no modelo de horizonte de previsão. $\xtilde_{tt'}$ é nossa decisão (possivelmente simplificada) criada para o tempo $t'$ no modelo de horizonte de previsão, e $\Wtilde_{tt'}$ é o processo de informação simplificado no tempo $t'$ no modelo de horizonte de previsão. As decisões $\xtilde_{tt'}$ são tomadas usando uma *política de horizonte de previsão* $\Xtilde^{\tilde \pi}\_t(\Stilde_{tt'})$ que é tipicamente uma política simplificada escolhida por ser fácil de calcular.

  Nossa política baseada em nosso modelo de horizonte de previsão aproximado seria escrita como

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA}
\end{align}
$$

  A equação $\eqref{eq:policiesapproximateDLA}$ é ilustrada usando a árvore de decisão na Figura 7.1, que ilustra o uso de estados, decisões e incertezas aproximados à medida que olhamos para o futuro. Criar essas aproximações requer uma mescla de arte e ciência. Queremos encontrar um equilíbrio entre modelar o futuro com precisão e balancear os requisitos computacionais.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticdla.jpg" alt="Uma árvore de decisão estocástica usando aproximações de estados, decisões e incertezas." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 7.1.</span> Uma árvore de decisão estocástica usando aproximações de estados, decisões e incertezas, além de uma política aproximada para tomar decisões no futuro. Os nós quadrados são onde tomamos decisões, enquanto os círculos são onde observamos a informação exógena.</figcaption>
</figure>

  O projeto da política de horizonte de previsão $\tilde \pi$ (às vezes chamada de política-dentro-de-uma-política) é altamente dependente do problema. De fato, podemos usar qualquer uma das nossas quatro classes de políticas. A chave é que ela precisa ser computacionalmente simples, já que teremos que calculá-la muitas vezes. Lembre-se de que o modelo de horizonte de previsão não precisa ser exato (na maioria dos casos, nunca poderíamos resolvê-lo se tentássemos usar um modelo de horizonte de previsão exato). Em vez disso, estamos escolhendo aproximações que acreditamos que produzirão boas decisões agora, aproximando decisões que *poderíamos* tomar no futuro.

Já vimos aplicações dessa abordagem. Para o problema de caminho mais curto dinâmico no [Capítulo 6](/sdam/pt-BR/chapter-6/), recorremos à abordagem amplamente utilizada de resolver um modelo de horizonte de previsão determinístico, no qual tomamos a melhor estimativa do que pode acontecer no futuro e resolvemos um problema de otimização determinístico. Essa abordagem ignora o efeito das incertezas futuras, mas introduzimos a ideia de usar um problema de otimização determinístico parametrizado. Contudo, precisamos ajustar o parâmetro.

Essas quatro classes de políticas (PFAs, CFAs, VFAs e DLAs) são universais, ou seja, qualquer política escolhida para um problema de decisão sequencial (*qualquer* problema de decisão sequencial) pertencerá a uma dessas quatro classes. No entanto, elas também podem servir como blocos de construção para políticas híbridas.

Ilustramos todas as quatro classes de políticas, o que deixa a questão: como saber qual delas usar? Às vezes isso parecerá óbvio, como encontrar o melhor caminho até um destino. Para problemas como esse, uma política de horizonte de previsão direta é uma escolha natural. Mas há problemas em que qualquer uma das quatro classes é uma candidata viável.

Dois problemas nos quais demonstramos com sucesso todas as quatro classes são os problemas de estoque no [Capítulo 1](/sdam/pt-BR/chapter-1/), e o problema de aprendizado sobre diabetes no [Capítulo 4](/sdam/pt-BR/chapter-4/). A chave é pensar cuidadosamente sobre todas as quatro classes de políticas, em vez de focar apenas em uma, que é o que acontece com tanta frequência hoje em dia.

## Modelos, revisitados

Nesta seção, faremos um tour pelas diferentes aplicações, começando primeiro com uma revisão das variáveis de estado. Em seguida, revisaremos as diferentes políticas e classificaremos as políticas que vimos nas quatro classes.

### Variáveis de estado, revisitadas

Há considerável confusão na literatura acadêmica sobre o que se entende por variável de estado, evidenciada pela notável ausência de definições do que é uma variável de estado em livros sobre programação dinâmica, programação estocástica e aprendizado por reforço.

A única exceção a esse padrão, que realmente se destaca, é a literatura de controle ótimo, onde definições de variáveis de estado são bastante comuns. Na comunidade de controles, uma variável de estado é comumente definida como "toda a informação de que precisamos no tempo $t$ para modelar um sistema a partir do tempo $t$ em diante." O que falta, contudo, é qualquer descrição de precisamente qual informação é necessária para modelar o sistema a partir do tempo $t$ em diante.

Definimos duas versões de variáveis de estado (de *Reinforcement Learning and Stochastic Optimization*, Seção 9.4):

> **Uma variável de estado é:**
>
> **a) Versão dependente de política** – Uma função do histórico que, combinada com a informação exógena (e uma política), é necessária e suficiente para calcular a função de custo/contribuição, a função de decisão (a política), e qualquer informação exigida pela função de transição para modelar a informação necessária para as funções de custo/contribuição e decisão.
>
> **b) Versão de otimização** – Uma função do histórico que é necessária e suficiente para calcular a função de custo/contribuição, as restrições, e qualquer informação exigida pela função de transição para modelar a informação necessária para a função de custo/contribuição e as restrições.

Precisamos das duas versões, pois se tivermos um sistema em que especificamos a estrutura de uma política, precisamos garantir que incluímos qualquer informação necessária para a política. Por exemplo, podemos ter um problema de estoque, no qual consideramos duas políticas: uma que usa uma previsão de demandas futuras, enquanto a outra usa apenas uma política de reposição até um nível-alvo. Embora uma previsão certamente pareça relevante, se estivermos usando uma política de reposição até um nível-alvo, não estamos usando a previsão, e como resultado ela não estaria na variável de estado.

É útil fazer um tour por nossas aplicações até agora e revisar as variáveis de estado de cada uma. Para cada aplicação, resumiremos a variável de estado, que podemos escrever como $S_t$ ou $S^n$ dependendo do cenário, e classificaremos os elementos como variáveis de estado físicas $R_t$, variáveis informacionais $I_t$, e variáveis de estado de crença $B_t$.

**Capítulo 1 –** Este capítulo introduziu dois problemas de estoque que também foram projetados para trazer à tona diferentes tipos de variáveis de estado. O problema de estoque simples foi caracterizado por uma variável de estado $S_t$ que consiste apenas no estoque $R^{inv}\_t$ no tempo $t$. Este problema é uma das aplicações mais amplamente utilizadas para ilustrar programação dinâmica.

O problema de estoque mais complexo exigiu uma variável de estado

$$
S_t = (\underbrace{R^{inv}_t}_{R_t},\underbrace{c_t}_{I_t},\underbrace{f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t}_{B_t}).
$$

Esta variável de estado ilustra as três classes de informação em variáveis de estado: as variáveis de estado físicas $R_t = R^{inv}\_t$, outras informações $I_t = c_t$, e variáveis de estado de crença $B_t = (f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t)$ onde $(f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t)$ captura a média prevista e o desvio padrão do erro da demanda futura $\Dhat_{t+1}$, e o desvio padrão na mudança das previsões do tempo $t$ para $t+1$ (assumimos que a mudança nas previsões tem média zero).

**Capítulo 2 –** Este capítulo introduziu um problema simples de venda de ativos com variável de estado

$$
S_t = (R^{asset}_t, p_t).
$$

onde a variável de estado física $R_t$ captura se ainda estamos segurando o ativo ou não (também poderia ter capturado quantas ações estávamos segurando), e o estado informacional $I_t = p_t$ é o preço pelo qual vendemos a ação.

Também introduzimos a ideia de calcular uma estimativa suavizada do preço do ativo usando

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Em seguida, projetamos uma política que tomava decisões com base em quanto o preço $p_t$ se desviava dessa estimativa suavizada. Agora nossa variável de estado se torna

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,\pbar_t)}_{I_t}\big).
$$

Agora imagine que quando decidimos vender nossa ação no tempo $t$, vendemos a um preço desconhecido $p_{t+1}$ que evolui de acordo com

$$
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1},
$$

onde $\varepsilon_{t+1}$ é um termo de ruído de média 0. Agora nossa variável de estado ficaria assim

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,p_{t-1},p_{t-2})}_{I_t}\big).
$$

**Capítulo 3 –** Aqui descrevemos um algoritmo de busca baseado em gradiente que evolui de acordo com uma iteração clássica de busca estocástica dada por

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \nabla_x F(x^n,W^{n+1}).  \label{eq:stochasticgradientaltransitionrevisited}
\end{align}
$$

Este procedimento é um método para buscar o melhor valor de $x$, mas isso é um problema de decisão sequencial no qual o tamanho do passo $\alpha_n$ é a decisão. Se escolhermos o tamanho do passo com uma fórmula determinística tal como $\alpha_n =1/n$, então o "estado" de nosso procedimento de busca é

$$
S^n = (x^n).
$$

No entanto, podemos usar uma fórmula de tamanho de passo adaptativa (estocástica) tal como

$$
\begin{align}
\alpha_n = \frac{\theta}{\theta + N^n - 1} \label{eq:adaptivealpharevisited}
\end{align}
$$

onde $N^n$ é o número de vezes que o gradiente $\nabla_x F(x^n,W^{n+1})$ muda de direção, então precisamos saber $N^n$, e nossa variável de estado se torna

$$
S^n = (x^n,N^n).
$$

**Capítulo 4 –** Nosso problema de diabetes é uma instância de um problema de aprendizado puro, no qual estamos tentando aprender a verdadeira resposta $\mu_x$ de um paciente a um medicamento. Depois de tentar vários medicamentos, podemos capturar nossa crença usando o estado

$$
S^n = (\underbrace{\mubar^n_x, \sigmabar^n_x}_{B^n})_{x\in\Xcal},
$$

onde assumimos que a verdadeira resposta $\mu_x \sim N(\mubar^n_x, (\sigmabar^n_x)^2)$.

Este modelo de crença pode funcionar se tivermos uma crença diferente para cada paciente, mas presumivelmente começamos com um conjunto de conhecimento sobre como o medicamento funciona em todos os pacientes. Podemos capturar isso em um estado inicial

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal}.
$$

Agora imagine que o $n$-ésimo paciente chega com atributos $a^n$ (gênero, peso, histórico de tabagismo, ...). A resposta do paciente ao medicamento $x$ dependeria tanto do medicamento quanto dos atributos do paciente. Isso significa que nossa variável de estado (isto é, a informação de que dispomos para tomar a decisão) consiste em informação que não controlamos (os atributos do paciente $a^n$), e informação que controlamos (a escolha do medicamento $x^n$). Assim, escreveríamos nossa variável de estado (a informação que usamos para tomar a decisão) como

$$
S^n = (\underbrace{a^n}_{I^n}, \underbrace{(\mubar^n_x, \sigmabar^n_x)}_{B^n})_{x\in\Xcal},
$$

onde decidimos colocar $a^n$ em nossa variável de estado informacional $I^n$, e as variáveis $(\mubar^n_x, \sigmabar^n_x)$ na variável de estado de crença $B^n$.

**Capítulo 5 –** Para nosso problema de caminho mais curto estocástico, começamos com um problema básico no qual um viajante incorre em um custo aleatório ao atravessar um link, mas conhece apenas a média e a variância dos custos antes de tomar uma decisão no nó $i$ sobre qual link $(i,j)$ atravessar. Para este problema, o estado de nosso viajante é simplesmente o nó $N_t$ onde ele está localizado após atravessar $t$ links, dando-nos

$$
S_t = N_t.
$$

Em seguida, passamos para um problema no qual o viajante no nó $i$ pode ver os custos reais $\chat_{tij}$ que seriam incorridos caso ele viajasse pelo link $(i,j)$. Com essa informação adicional, a variável de estado se torna

$$
S_t = \left(\underbrace{N_t}_{R_t},(\underbrace{\chat_{t, N_t, j}}_{I_t})_{j\in\Ncal^+_i}\right).
$$

**Capítulo 6 –** Consideramos um problema de caminho mais curto dinâmico no qual o custo estimado no link $(i,j)$, $\cbar_{tij}$, evolui ao longo do tempo. Ou seja, no tempo $t+1$, assumimos que recebemos um conjunto atualizado de estimativas que denotaríamos por $\cbar_{t+1}$. Imagine que nosso viajante está no nó $N_t= i$. O estado de nosso sistema (para nosso viajante) seria então dado por

$$
S_t = (\underbrace{N_t}_{R_t}, \underbrace{\cbar_t}_{I_t}).
$$

Agora imagine que mostramos ao viajante um caminho que designamos $p_t$, que é o conjunto de links que planejamos usar para ir de seu nó atual $N_t$ até o destino. Digamos que acabamos de atualizar o caminho, e perguntamos ao viajante se ele aceita o novo caminho. Se ele disser sim, o sistema de navegação continuará a reotimizar, mas introduzirá um pequeno bônus por permanecer com o caminho mais recente $p_t$ que o viajante acabou de aceitar (isso é feito para evitar que o sistema oscile entre dois caminhos quase equivalentes).

Se $p_t$ é o caminho mais recentemente aceito, então essa é uma informação de que precisamos para tomar decisões no futuro. Neste caso, nossa variável de estado se torna

$$
S_t = (\underbrace{N_t}_{R_t}, (\underbrace{\cbar_t,p_t}_{I_t})).
$$

Esses problemas de decisão ilustraram os três tipos de variáveis de estado: variáveis de estado físicas $R_t$, variáveis de estado informacionais $I_t$, e variáveis de estado de crença $B_t$. Vimos problemas que têm apenas $R_t$, ou apenas $B_t$, e combinações com $I_t$ tais como $(R_t, I_t)$ e $(I_t, B_t)$, bem como todos os três $(R_t, I_t, B_t)$. Enfatizamos que a distinção entre $R_t$ e $I_t$ pode às vezes ser arbitrária, mas há tantos problemas que envolvem gerenciar recursos físicos ou financeiros (comprar, vender, mover, modificar), com decisões que afetam (ou são restringidas por) recursos físicos ou financeiros, que sentimos que era necessário criar uma classe especial apenas para recursos.

Pensamos que há muitos problemas envolvendo incerteza que também envolvem aprendizado, e podem envolver aprendizado ativo, já que as decisões podem impactar o que observamos (como no exemplo do diabetes). Suspeitamos que, à medida que os modeladores se sintam confortáveis em incluir variáveis de estado de crença em problemas de decisão sequencial, veremos essas variáveis sendo usadas com mais frequência.

### Políticas, revisitadas

Nossos seis cenários de aplicação (e, em alguns casos, as extensões) foram escolhidos para expor cada uma das quatro classes de políticas. Abaixo revisamos as diferentes políticas e identificamos a classe à qual pertencem.

**Capítulo 1 –** Introduzimos dois problemas de estoque. Um usava uma política de reposição até um nível-alvo da forma

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases}
$$

enquanto o segundo usava uma política de elevar o estoque até a demanda prevista mais um buffer

$$
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta.
$$

Ambas as políticas envolvem um ou dois parâmetros ajustáveis. Ambas são funções analíticas que não têm um operador de otimização embutido ($\min$ ou $\max$). Essas são as características distintivas de uma aproximação de função de política (PFA).

**Capítulo 2 –** Este capítulo abordou o problema de determinar quando vender um ativo. Várias políticas foram sugeridas, mas amostras representativas são a política de "venda-baixa", dada por

$$
X^{sell-low}(S_t\vert \theta^{low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ and } R_t = 1, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

e a "política de rastreamento"

$$
X^{track}(S_t\vert \theta^{track}) = \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Ambas as políticas são semelhantes à nossa política de pedidos de estoque "reposição até um nível-alvo", pois são funções paramétricas com parâmetros ajustáveis, o que significa que são exemplos adicionais de aproximação de função de política (PFA). Embora essa não seja de forma alguma a única maneira de resolver um problema de venda de ativos, essa classe de política é bastante popular em Wall St.

As PFAs são populares na prática devido à sua simplicidade e transparência, mas é importante ter em mente: *o preço da simplicidade são parâmetros ajustáveis... e ajustá-los é difícil!*

**Capítulo 3 –** Planejamento adaptativo de mercado – Este problema envolve o uso de um método popular de busca baseado em gradiente (ver equação $\eqref{eq:stochasticgradientaltransitionrevisited}$) em que o tamanho de passo $\alpha_n$ é a decisão. Se tivéssemos um problema determinístico, calcularíamos $\alpha_n$ resolvendo o problema de otimização unidimensional

$$
\alpha_n = \argmax_{\alpha \geq 0} \big(F(x^n + \alpha \nabla_x F(x^n))\big),
$$

que é uma forma de aproximação de horizonte de previsão direto (DLA). No entanto, quando temos que lidar com incerteza, uma busca unidimensional significa que precisamos ser capazes de calcular a esperança $F(x) = \E F(x,W)$, o que geralmente não é possível na prática. Em vez disso, podemos usar uma política determinística como

$$
\alpha^\pi_n(\theta) = \frac{\theta}{\theta+n-1},
$$

onde escrevemos isso como uma função parametrizada (isto é, uma forma de PFA). Também ilustramos uma política adaptativa (dependente do estado) dada pela equação $\eqref{eq:adaptivealpharevisited}$ onde substituímos $n$ por um contador $N^n$ que conta quantas vezes o gradiente muda de direção (ou poderíamos contar quantas vezes a função objetivo não melhora). Escreveríamos essa política como

$$
\alpha^\pi_n(S^n\vert \theta) = \frac{\theta}{\theta+N^n-1},
$$

onde nosso estado $S^n$ carrega a informação $N^n$.

Observação lateral: políticas do estilo PFA são universalmente usadas em algoritmos de gradiente estocástico. Embora estas possam de fato ser as melhores, a realidade é que ninguém sequer tentou usar as outras três classes de políticas. Pode valer a pena investigar.

**Capítulo 4 –** Aprendendo o melhor tratamento para diabetes – Este é um problema de aprendizado puro que abordamos usando a classe altamente popular de políticas conhecida como limitação superior de confiança (upper confidence bounding). Talvez a política UCB mais conhecida seja dada por

$$
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right).
$$

Outra variante que funciona muito bem foi originalmente introduzida como estimativa de intervalo (interval estimation), que é dada por

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
$$

Finalmente, uma variante que foi originalmente descoberta em 1933 e depois redescoberta alguns anos atrás é a amostragem de Thompson, que é dada por

$$
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x.
$$

onde $\muhat^n_x$ é amostrado aleatoriamente a partir de uma distribuição normal com média $\mubar^n_x$ e variância $\theta^{TS} \sigmabar^n_x$.

Observe que as três políticas compartilham duas características: um operador de otimização (um $\argmax_x$ para essas políticas) e um parâmetro ajustável. Estas podem ser vistas como problemas de otimização parametrizados, que pertencem à classe de aproximação de função de custo paramétrica (ou CFA).

Políticas CFA são amplamente usadas na prática, mas receberam muito pouca atenção na literatura acadêmica fora da aplicação específica de políticas de aprendizado, como nossa aplicação de diabetes. Veremos essa ideia aplicada em um contexto bem diferente em capítulos posteriores.

**Capítulo 5 –** Caminhos mais curtos estocásticos estáticos – Nosso primeiro problema de caminho mais curto estocástico assumiu que um viajante incorria em custos estocásticos, mas estes só eram conhecidos após percorrer um link. Essa suposição nos permitiu resolver o problema como um problema de caminho mais curto determinístico, que é facilmente resolvido usando a equação de Bellman, dando-nos uma política que é dada por

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\cbar_{tij} + V_{t+1}(S_{t+1}=j)\big).
$$

onde $S_t = N_t = i$ é o nó em que o viajante está localizado. As funções de valor $V_t(S_t)$ são calculadas trabalhando para trás no tempo, começando em $t=T$ onde definimos $V_T(S_T) = 0$ para todos os nós $S_T$. Esta é uma forma de política baseada em aproximações de função de valor, e este é um caso raro em que uma política VFA é de fato ótima.

Em seguida, passamos para um problema mais difícil, em que um viajante tem permissão para ver os custos $\chat_{tij}$ ao sair do nó $i = N_t$. Para este problema, a variável de estado se torna $S_t = (N_t, (\chat_{t,N_t,j},~j\in\Ncal^+\_i))$. Para este problema, tivemos que aproximar a função de valor usando o estado pós-decisão $S^x_t = N^x_t$ onde $N^x_t$ é o nó que escolhemos para ir depois de tomar nossa decisão $x_t$ quando estamos no nó $N_t$. Neste caso, nossa política se parecia com

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\chat_{tij} + \Vbar^x_t(S^x_t)\big).
$$

Esta é novamente uma política baseada em VFA, mas desta vez não é mais ótima, uma vez que $\Vbar^x_t(S^x_t)$ é uma aproximação que tivemos que estimar a partir dos dados. Com algum cuidado, no entanto, podemos desenvolver uma política assintoticamente ótima.

**Capítulo 6 –** Caminhos mais curtos estocásticos dinâmicos – É aqui que encontramos um problema em que o custo estimado em cada link $\cbar_{tij}$ está evoluindo ao longo do tempo. Assim, no tempo $t$, $\cbar_t$ é o vetor de custos de link estimados, que se torna $\cbar_{t+1}$ no próximo período de tempo. Isso significa que nossa variável de estado transita de $S_t = N_t$, que é apenas o nó em que o viajante está localizado, para $S_t = (N_t, \cbar_t)$, que é uma variável de estado extremamente de alta dimensão. Este não é um problema que podemos abordar mesmo com programação dinâmica aproximada (é difícil imaginar uma VFA construída em torno dessa variável de estado).

Em vez disso, propomos a ideia de usar um modelo de horizonte de previsão, em que ignoramos o fato de que, à medida que o viajante progride pela rede, o vetor de custos de link estimados $\cbar_t$ evoluirá ao longo do tempo. Em vez disso, podemos assumir que ele é fixo (e vamos supor que seja determinístico). Isso significa que agora temos um modelo de horizonte de previsão que é, de fato, um problema de caminho mais curto determinístico, mas temos que lembrar que estamos otimizando um modelo de horizonte de previsão aproximado, que é uma política DLA. Claro, sabemos como fazer isso de forma ótima, mas uma solução ótima para um modelo de horizonte de previsão aproximado não é uma política ótima!

Horizontes de previsão determinísticos são populares, mas há uma maneira de torná-los ainda melhores, sem torná-los mais complicados. Introduzimos essa ideia quando sugerimos usar o percentil $\theta$ do custo em vez da média $\cbar_t$. Seja $\ctilde_{tij}(\theta)$ o percentil $\theta$ do custo no link $(i,j)$ dado o que sabemos no tempo $t$. Agora, resolva um modelo de horizonte de previsão determinístico usando os custos $\ctilde_{tij}(\theta)$. Agora temos um modelo de horizonte de previsão determinístico parametrizado, que é um híbrido de uma CFA paramétrica e uma DLA.

## Objetivos online versus offline

Existem duas perspectivas para avaliar o desempenho de uma política:

- **Aprendizado online** – Existem muitas situações em que temos que aprender à medida que avançamos no campo. Por exemplo, podemos estar tentando aprender o melhor preço para um produto, o melhor caminho por uma cidade congestionada ou o melhor medicamento para um paciente reduzir a pressão arterial. Em cada um desses casos, queremos fazer o melhor possível dado o que sabemos, mas ainda estamos aprendendo para que possamos tomar melhores decisões no futuro. Isso significa que precisamos maximizar a *recompensa cumulativa* ao longo do tempo (ou iterações) para capturar o quão bem estamos indo enquanto aprendemos.
- **Aprendizado offline** – Em outros casos, podemos aprender em um ambiente de laboratório, que pode ser um laboratório físico (para testar diferentes materiais ou observar o desempenho de um medicamento em camundongos), um simulador de computador, ou até mesmo um ambiente de campo que está sendo conduzido como um mercado de teste (para avaliar um produto) ou um ensaio clínico (para testar medicamentos). Se estamos aprendendo em um ambiente de laboratório ("offline"), então estamos dispostos a realizar tentativa e erro sem nos preocuparmos com o quão bem estamos indo. Em vez disso, tudo o que nos importa é a qualidade da solução no final, o que significa que queremos otimizar a *recompensa final*.

Uma palavra de cautela sobre os termos online e offline. Na comunidade de aprendizado de máquina, "offline" se refere à estimação de modelos usando um único conjunto de dados em lote (batch). Em contraste, o aprendizado online é usado para se referir a configurações totalmente sequenciais em que os dados chegam ao longo do tempo. Isso geralmente ocorre em situações de campo em que os dados são criados por algum processo exógeno (como observar pacientes chegando ao consultório de um médico), que é a mesma configuração que assumimos ao usar o termo "online". No entanto, em aprendizado de máquina, "online" ainda seria usado para se referir a um algoritmo iterativo sendo usado em uma simulação.

Existem campos inteiros que lidam com problemas de decisão sequencial que são separados por se concentrarem em recompensa final ou recompensa cumulativa. Por exemplo, comunidades que trabalham com "busca estocástica" tendem a se concentrar na recompensa final, enquanto as comunidades que trabalham com "problemas de bandidos de múltiplos braços" (uma forma de problema de busca estocástica) geralmente otimizam a recompensa cumulativa. A realidade é que você pode usar a mesma política para qualquer um dos objetivos, mas precisa ajustá-la para o objetivo escolhido.

### Otimização online (recompensa cumulativa)

É tipicamente o caso, ao fazer busca de políticas, que temos uma política parametrizada que podemos escrever como $X^\pi(S_t\vert \theta)$. A decisão $x_t = X^\pi(S_t\vert \theta)$ pode ser o preço de um produto, a escolha de um medicamento para pressão arterial ou o lance feito para maximizar cliques em anúncios. Em todos esses casos, temos que aprender à medida que avançamos, o que significa que precisamos maximizar o desempenho enquanto estamos aprendendo.

Seja $C(S_t,x_t)$ nossa métrica de desempenho (receita, redução na pressão arterial, ou receita líquida de cliques em anúncios). Queremos encontrar $\theta$ que produz a política $X^\pi(S_t\vert \theta)$ que resolve o problema de otimização

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S_0} \E_{W_1, \ldots, W_T\vert S_0} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}, \label{eq:derivativebasedonline}
\end{align}
$$

onde $S_{t+1} = S^M(S_t, X^\pi(S_t\vert \theta),W_{t+1})$. A esperança em $\eqref{eq:derivativebasedonline}$ é sobre todas as realizações possíveis de $W_1, \ldots, W_T$, bem como sobre os valores possíveis de parâmetros incertos (como crenças iniciais incertas sobre respostas de mercado ou como alguém responde a um medicamento) que estão contidos no estado inicial $S_0$.

A equação $\eqref{eq:derivativebasedonline}$ é um exemplo de uma função objetivo "online" ou de "recompensa cumulativa", uma vez que queremos maximizar a soma de todas as recompensas ao longo de algum horizonte. Isso é de particular interesse em problemas de aprendizado online em que temos que aprender o desempenho, como a receita de um preço ou o desempenho de um medicamento para um paciente específico, o que significa equilibrar o processo de aprendizado enquanto também tentamos fazer o melhor possível.

### Otimização offline (recompensa final)

Em ambientes offline, tipicamente temos um orçamento de $N$ experimentos. Um problema clássico (embora inadequado) que é frequentemente usado para ilustrar o aprendizado offline sem derivadas é o problema do jornaleiro (newsvendor), que abordamos no [Capítulo 3](/sdam/pt-BR/chapter-3/). Como lembrete, o problema do jornaleiro é escrito como

$$
F(x) = \E_W \big(p \min\{x,W\} - cx\big),
$$

onde $x$ é a quantidade de recurso que pedimos a um custo unitário $c$, que é então usada para atender à demanda $W$ (que é desconhecida quando escolhemos $x$). Assumimos que a distribuição de $W$ é desconhecida.

Seja $x^n = X^\pi(S^n\vert \theta)$ nossa escolha de $x$ dado o que sabemos, o que é capturado por $S^n$, onde nossa política $X^\pi(S^n\vert \theta)$ depende de um ou mais parâmetros em $\theta$. Depois de implementarmos $x^n$, observamos $W^{n+1}$, atualizamos $S^{n+1}$ e então repetimos o processo. Após $N$ iterações, obtemos um design final que denotamos $x^{\pi,N}(\theta)$.

Agora temos que avaliar nosso design final $x^{\pi,N}(\theta)$. Para realizar essa avaliação, temos que considerar duas, e possivelmente três, fontes de incerteza. A primeira é que podemos ter incerteza em parâmetros desconhecidos, como a média de $W$. Por exemplo, $W$ pode vir de uma distribuição de Poisson com média $\mu$, e podemos assumir que $\mu \in \lbrace \mu_1, \ldots, \mu_K\rbrace $ onde $p_k = Prob[\mu = \mu_k]$. A distribuição $(p_k)\_{k=1}^K$ está contida no estado inicial $S_0$.

Depois, temos as chegadas aleatórias de demandas $W^1, \ldots, W^N$ que seriam amostradas de uma distribuição com média $\mu$. Usamos essas observações, e a política $X^\pi(S^n\vert \theta)$, para calcular $x^{\pi,N}(\theta)$. É importante reconhecer que $x^{\pi,N}(\theta)$ é uma variável aleatória que depende de qualquer informação em $S^0$ (independentemente de ser determinística ou aleatória).

Uma vez que tenhamos calculado $x^{\pi,N}(\theta)$, temos que executar um conjunto final de simulações para avaliar o quão bem ele funciona. Introduzimos uma nova variável aleatória, $\What$, para representar amostras de $W$ usadas para avaliar nosso design final.

Esta notação nos permite escrever nossa função objetivo para o aprendizado offline como

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S^0} \E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(x^{\pi,N}(\theta),\What).\label{eq:derivativebasedoffline}
\end{align}
$$

Enfatizamos que escrevemos esperanças simplesmente como uma forma de indicar que temos que fazer a média sobre qualquer informação aleatória. Abordamos o problema de calcular essas esperanças a seguir.

### Avaliação de políticas

As funções objetivo para recompensa cumulativa (dada em $\eqref{eq:derivativebasedonline}$) e recompensa final (dada em $\eqref{eq:derivativebasedoffline}$) foram ambas escritas usando esperanças, que é nossa forma de dizer que estamos fazendo a média sobre o que quer que seja aleatório. Isso é bom de escrever matematicamente, mas isso praticamente nunca é computável.

Sempre que precisamos tomar uma esperança, ajuda assumir que iremos estimar a esperança por amostragem. Primeiro ilustramos como fazer isso para o objetivo de recompensa cumulativa dado em $\eqref{eq:derivativebasedonline}$. Aqui, podemos ter uma quantidade incerta no estado inicial $S_0$, como a incerteza em como um mercado responde ao preço, a produção de metano por um poço de petróleo, ou como um paciente pode responder a um medicamento. Em seguida, temos a informação exógena $W_1, \ldots, W_T$, que poderia ser observações de vendas, a mudança nas temperaturas atmosféricas, ou como um paciente responde à medicação.

Seja $\omega$ uma realização amostral de todas essas quantidades incertas. Assuma que geramos um conjunto de amostras de todas essas quantidades incertas e as armazenamos em um conjunto $\Omega = \lbrace \omega^1, \ldots, \omega^K\rbrace $. Assim, sempre que escrevemos $W_t(\omega)$, isso é uma realização amostral do que observamos no tempo $t$. Se estivermos usando uma política $X^\pi(S_t\vert \theta)$, então seguiríamos a trajetória amostral de estados $S_t(\omega)$, decisões $x_t(\omega) = X^\pi(S_t(\omega)\vert \theta)$ e informação exógena $W_{t+1}(\omega)$ governada pela nossa função de transição

$$
S_{t+1}(\omega) = S^M(S_t(\omega), x_t(\omega), W_{t+1}(\omega)).
$$

Usando nosso conjunto de observações amostrais $\Omega$, podemos aproximar nossa esperança $F^\pi(\theta)$ usando

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \sum_{k=1}^K \sum_{t=0}^T C(S_t(\omega^k),X^\pi(S_t(\omega^k)\vert \theta)). \label{eq:simulatedcumulativereward}
\end{align}
$$

Se estivermos usando um objetivo de recompensa final, precisamos primeiro estimar $x^{\pi,N}(\theta)$. Se seguirmos a trajetória amostral $\omega$, então escreveríamos nosso design final como $x^{\pi,N}(\omega\vert \theta)$, onde $\omega$ captura tudo o que usamos para realizar o treinamento dado por $(S_0(\omega), W_1(\omega), \ldots, W_T(\omega))$.

Precisamos então avaliar nosso design $x^{\pi,N}(\omega\vert \theta)$ usando os dados de teste capturados em $\What$. Seja $\psi$ uma realização amostral de $\What$, e assim como assumimos que temos um conjunto de amostras $\Omega$ para $\omega$, vamos assumir que criamos um conjunto de resultados amostrais de $\What$ dado por $\Psi = \lbrace \psi^1, \ldots, \psi^L\rbrace $. Tenha em mente que $\What$ representa qualquer informação simulada que precisamos para avaliar nosso design $x^{\pi,N}$. Pode ser um conjunto de variáveis aleatórias (atributos do paciente, clima, condições de mercado), e pode até representar informação que evolui ao longo do tempo. Em outras palavras... qualquer coisa.

Agora escreveríamos a estimativa do desempenho da política em um cenário de recompensa final como

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \frac{1}{L} \sum_{k=1}^K \sum_{\ell=1}^L F(x^{\pi,N}(\omega^k),\What(\psi^\ell)). \label{eq:simulatedfinalreward}
\end{align}
$$

### Reunindo tudo

A equação $\eqref{eq:derivativebasedonline}$ ilustra uma função objetivo online, ou de recompensa cumulativa, onde temos que maximizar o desempenho total durante o processo de aprendizado. A equação $\eqref{eq:derivativebasedoffline}$ ilustra a função objetivo offline, ou de recompensa final, onde temos que buscar o melhor design que funcionará melhor em média após fixarmos o design. O que é importante no momento é que ambos os problemas envolvem resolver

$$
\begin{align}
\max_\theta F^\pi(\theta), \label{eq:searchovertheta}
\end{align}
$$

onde $F(\theta)$ é uma função desconhecida que podemos amostrar de forma ruidosa.

Podemos expandir o objetivo em $\eqref{eq:searchovertheta}$ para incluir uma busca sobre diferentes classes de políticas. Seja $\Fcal$ o conjunto de todos os tipos possíveis de políticas, incluindo as classes principais (PFAs, CFAs, VFAs e DLAs), assim como diferentes funções dentro de cada uma dessas classes. Então, seja $\Theta^f$ o conjunto de todos os vetores de parâmetros possíveis $\theta$ que correspondem a qualquer classe de política $f\in\Fcal$ que tenhamos escolhido. Nesse caso, podemos escrever nosso problema de otimização como

$$
\max_{\pi=(f\in\Fcal, \theta\in\Theta^f)} F^\pi(\theta).
$$

Na prática, tendemos a escolher a classe de política $f\in\Fcal$ usando intuição e um entendimento da estrutura do problema, mas isso nem sempre é óbvio. Encorajamos os leitores a estarem prontos para usar a intuição e o bom senso, mas cientes de todas as quatro classes. Isso não significa que você tenha que testar todas as quatro classes, mas você deve estar pronto para defender por que fez a escolha que fez.

Voltamo-nos agora para o problema de otimizar sobre $\theta$, que assumimos ser contínuo e, na maioria dos casos, com valores vetoriais. Existem duas amplas classes de métodos de busca que podemos aplicar para encontrar $\theta$: baseados em derivadas e livres de derivadas.

### Dependência do estado inicial

Independentemente de estarmos usando um objetivo de recompensa cumulativa (como a equação $\eqref{eq:derivativebasedonline}$) ou objetivo de recompensa final (como a equação $\eqref{eq:derivativebasedoffline}$), nossa otimização de $\theta$ dependerá do estado inicial $S_0$. Isso significa que alterar a informação em $S_0$ tem o potencial de alterar nossos resultados, incluindo a escolha da política.

O estado inicial $S_0$ contém toda e qualquer informação que afeta o comportamento do sistema de qualquer forma. Pode incluir parâmetros determinísticos, distribuições sobre parâmetros incertos, e até mesmo a posição inicial do algoritmo de busca.

A dependência das soluções ótimas em relação à informação em $S_0$ é amplamente negligenciada na literatura algorítmica. Seria bom se pudéssemos calcular a função $\theta(S_0)$ para capturar essa dependência, mas estimar essa função é intratável. Isso significa que, se $S_0$ mudar, podemos ter que reotimizar $\theta$. Isso seria aceitável, exceto que há muitas situações em que $S_0$ muda, e não reotimizamos $\theta$ simplesmente porque isso pode ser bastante difícil.

Isso é algo que o leitor deve ter em mente.

## Busca de política baseada em derivada

Assuma que estamos tentando resolver o problema

$$
\begin{align}
\max_\theta F(\theta),  \label{eq:maxFtheta}
\end{align}
$$

onde $F(\theta)$ é alguma função paramétrica em $\theta$. Além disso, assuma que $\theta$ é um vetor e que podemos calcular o gradiente

$$
\nabla_\theta F(\theta) = \begin{pmatrix} \frac{\partial F(\theta)}{\partial \theta_1} \\ \frac{\partial F(\theta)}{\partial \theta_2} \\ \vdots \\ \frac{\partial F(\theta)}{\partial \theta_K} \end{pmatrix}.
$$

Na prática, calcular derivadas exatamente frequentemente não é possível.

Um método útil para lidar com vetores de parâmetros de maior dimensão é a *aproximação estocástica por perturbação simultânea* (ou SPSA, do inglês *simultaneous perturbation stochastic approximation*), desenvolvida por Spall (2003), que aproxima gradientes da seguinte forma. Seja $Z_p, p=1, \ldots, P$ uma amostra de realizações de variáveis aleatórias (elas podem ser normalmente distribuídas) com média 0. Seja $Z^n$ o vetor $p$-dimensional com as realizações para a iteração $n$. Aproximamos o gradiente perturbando $x^n$ pelo vetor $Z$ usando $x^n+\eta^nZ^n$ e $x^n-\eta^nZ^n$, onde $\eta^n$ é um parâmetro de escala que pode ser constante ao longo das iterações, ou pode variar (tipicamente ele diminuirá).

Agora, sejam $W^{n+1,+}$ e $W^{n+1,-}$ representando duas amostras diferentes das variáveis aleatórias que conduzem a simulação (elas podem ser geradas com antecedência ou em tempo real). Executamos então nossa simulação duas vezes: uma vez para encontrar $F(x^n + \eta^nZ^n,W^{n+1,+})$, e outra vez para encontrar $F(x^n - \eta^nZ^n,W^{n+1,-})$. A estimativa do gradiente é então dada por

$$
\begin{align}
\nabla_\theta F(\theta^n,W^{n+1}) \approx \begin{bmatrix}
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_1} \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_2} \\[6pt]
\vdots \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_P}
\end{bmatrix}. \label{eq:SPSAgradient}
\end{align}
$$

Observe que o numerador de cada elemento do gradiente na equação $\eqref{eq:SPSAgradient}$ é o mesmo, o que significa que precisamos apenas de duas avaliações de função: $F(x^n + \eta^nZ^n,W^{n+1,+})$ e $F(x^n - \eta^nZ^n,W^{n+1,-})$. A única diferença é o $Z^n_p$ no denominador para cada dimensão $p$ (essa é a magia do SPSA). (Veja *Reinforcement Learning and Stochastic Optimization*, Capítulo 5, seção 5.4.4, para uma apresentação sobre SPSA.)

Uma breve palavra de cautela sobre a "magia" do SPSA é que os gradientes podem ser bastante ruidosos. Por esse motivo, uma estratégia comum é executar múltiplas simulações (chamadas de mini-lotes na literatura) de cada simulação perturbada e fazer a média. O tamanho apropriado dos mini-lotes depende das características do problema, portanto, antecipe gastar algum tempo ajustando esse parâmetro.

Independentemente de como calculamos o gradiente, nosso algoritmo de busca (que vimos no [Capítulo 3](/sdam/pt-BR/chapter-3/)) é dado por

$$
\theta^{n+1} = \theta^n + \alpha_n \nabla_\theta F(\theta^n,W^{n+1}).
$$

Precisamos agora escolher uma política para o tamanho do passo $\alpha_n$, que discutimos no [Capítulo 3](/sdam/pt-BR/chapter-3/), mas veja *Reinforcement Learning and Stochastic Optimization*, Capítulo 6, para uma discussão detalhada sobre políticas de tamanho de passo. Lembramos ao leitor que um algoritmo de gradiente estocástico é, por si só, um problema de decisão sequencial (como vimos no [Capítulo 3](/sdam/pt-BR/chapter-3/)).

## Busca de política livre de derivada

A busca de política livre de derivada é simplesmente outro exemplo de um problema de decisão sequencial que é o foco de todo este volume, com a principal diferença de que a única variável de estado será a crença sobre a função que estamos maximizando (que é a mesma coisa que nossa aplicação de diabetes no [Capítulo 4](/sdam/pt-BR/chapter-4/)).

Podemos formar crenças usando qualquer um dos seguintes:

- **Tabelas de consulta** – Assuma que podemos discretizar o conjunto de valores possíveis de $\theta$ em um conjunto $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $. Defina uma variável aleatória $\mu_\theta = F(\theta) = \E F(\theta,W)$ que é uma variável aleatória porque não conhecemos $F(\theta)$ (ou $\mu_\theta$). Assuma que podemos executar experimentos para amostrar $\Fhat^{n+1} = F(\theta^n, W^{n+1})$. Podemos usar essas amostras para criar estimativas $\mubar^n_\theta$ para cada valor discreto de $\theta \in \Theta$. Isso seria um modelo de crença de tabela de consulta.

  O modelo de crença mais simples é uma tabela de consulta com crenças independentes, que vimos primeiro no [Capítulo 4](/sdam/pt-BR/chapter-4/) com nossa aplicação de diabetes. Seja $\mubar^n_\theta$ nossa estimativa de $\E F(\theta)$ para algum $\theta \in \lbrace \theta_1, \ldots, \theta_K\rbrace $ após $n$ amostras (em todos os experimentos). Seja $\sigmabar^n_{\theta_k}$ o desvio padrão da estimativa $\mubar^n_{\theta_k}$ e seja $\beta^n_{\theta_k}$ a precisão dada por

  $$
  \beta^n_{\theta_k} = \frac{1}{(\sigmabar^n_{\theta_k})^2}.
  $$
- **Modelo paramétrico** – Poderíamos estimar um modelo linear da forma

  $$
  F(\theta\vert \eta) \approx \eta_0 + \eta_1 \phi_1(\theta) + \eta_2 \phi_2(\theta) + \ldots
  $$

  onde $\phi_f(\theta)$ são características (*features*) calculadas a partir do vetor $\theta$, que podem consistir em termos como $\theta,$ $\theta^2$, ou $\ln \theta$. Observe que um "modelo linear" significa que ele é linear nos coeficientes $\eta$; as características $\phi_f(\theta)$ podem ser funções não lineares de $\theta$.

  Embora os modelos lineares sejam populares, eles provavelmente serão pouco mais do que uma aproximação local. Isso não é um problema se ajustarmos o modelo linear em torno do ponto certo. O problema é encontrar o ponto certo!
- **Modelos não paramétricos** – Modelos não paramétricos são melhor entendidos como aproximações locais das funções em torno de algum conjunto de pontos (talvez escolhidos aleatoriamente). A estimativa pode ser uma constante (o que é mais típico) ou talvez uma aproximação linear local.

  Existem muitas formas de criar modelos não paramétricos. Talvez a mais comum seja criar uma estimativa $\mubar_\theta$ fazendo a média sobre $\mubar_{\theta_1}, \ldots, \mubar_{\theta_K}$ para valores $\theta_k$ que estão próximos de $\theta$. Não vamos recorrer a métodos não paramétricos neste livro, principalmente porque eles demandam muitos dados e são um tanto trabalhosos de usar.

*Reinforcement Learning and Stochastic Optimization*, Capítulo 3, descreve uma série de métodos para estimar funções recursivamente, cobrindo diversos modelos de crença para tabelas de consulta, modelos lineares e modelos não lineares. O capítulo também aborda tanto modelos bayesianos quanto frequentistas. Já vimos as equações recursivas para uma tabela de consulta em nosso exemplo de diabetes, onde a atualização era dada pelas equações de transição no [Capítulo 4](/sdam/pt-BR/chapter-4/) (essas equações assumem um modelo de crença bayesiano). Mais adiante, ilustraremos a atualização recursiva de modelos lineares e não lineares.

Podemos modelar o processo de realizar busca livre de derivada usando os cinco elementos do framework universal de modelagem:

- **Variáveis de estado** – Isso seria a crença sobre $\E F(x,W)$, que podemos escrever como $S^n = B^n$. Como armazenamos o estado de crença depende de estarmos usando tabelas de consulta (e que tipo de tabela de consulta), modelos lineares ou não lineares. Se estivermos usando nosso modelo de crença de tabela de consulta, usaríamos

  $$
  B^n = (\mubar^n_\theta,\beta^n_\theta),~\theta \in \{\theta_1, \ldots, \theta_K\}.
  $$
- **Variável de decisão** – A decisão é a escolha $\theta^n$ de qual valor de $\theta$ avaliar a função para obter $\Fhat^{n+1} = F(x^n,W^{n+1})$. Fazemos nossa escolha $\theta^n = \Theta^\pi(S^n)$ usando uma política $\Theta^\pi(S^n)$ que precisamos projetar.
- **Informação exógena** – Normalmente pensamos na informação exógena como sendo a observação amostrada $\Fhat^{n+1} = F(\theta^n,W^{n+1})$. Seja $\beta^W_\theta$ a precisão (o inverso da variância) do ruído ao observar a função $F(\theta^n,W^{n+1})$ em um ponto $\theta$.
- **Função de transição** – A função de transição vem na forma das equações recursivas para atualizar nossas crenças. Por exemplo, as equações de atualização para as crenças de tabela de consulta no [Capítulo 4](/sdam/pt-BR/chapter-4/), onde estávamos buscando o melhor medicamento para diabetes. Usando novamente nosso modelo de crença de tabela de consulta, a função de transição seria

  $$
  \begin{align}
  \mubar^{n+1}_\theta &= \frac{\beta^n_\theta \mubar^n_\theta + \beta^W_\theta W^{n+1}_\theta}{\beta^n_\theta + \beta^W_\theta},\label{eq:thetatransition1}\\
  \beta^{n+1}_\theta &= \beta^n_\theta + \beta^W.\label{eq:thetatransition2}
  \end{align}
  $$
- **Função objetivo** – É mais comum que usemos um simulador offline para buscar o melhor valor de $\theta$, o que significa um objetivo de recompensa final. Seja $\theta^{\pi,N}$ o melhor valor do vetor de parâmetros $\theta$ derivado do nosso modelo de crença após $N$ amostras. Por exemplo, se estivéssemos usando um modelo de crença de tabela de consulta, e obtivéssemos estimativas $\mubar^N_\theta$ para cada escolha $\theta$ após $N$ experimentos, escolheríamos

  $$
  \theta^{\pi,N} = \argmax_{\theta\in\Theta} \mubar^N_\theta,
  $$

  onde o sobrescrito "$\pi$" em $\theta^{\pi,N}$ reflete o tipo de política de busca $\pi$ usado ao estimar $\mubar^N_x$. O problema de otimização para buscar a melhor política $\pi$ seria escrito

  $$
  \max_{\pi} \E_{S^0}\E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(\theta^{\pi,N},\What).
  $$

Lembre-se de que calculamos esperanças usando simulação, como mostramos acima, na equação $\eqref{eq:simulatedcumulativereward}$ para recompensa cumulativa, ou $\eqref{eq:simulatedfinalreward}$ para recompensa final.

Isso nos deixa com a questão: Como projetamos a política de busca $\Theta^\pi(S^n)$? Esperamos que não seja surpresa que possamos escolher entre qualquer uma das quatro classes de políticas. Todas as quatro classes são discutidas em profundidade em *Reinforcement Learning and Stochastic Optimization*, Capítulo 7, mas também remeteríamos à discussão de busca de políticas no Capítulo 12 daquele livro.

Para nossos propósitos, vamos ilustrar duas políticas que são relativamente simples e naturais.

- **Políticas de estimativa de intervalo para modelos de crença de tabela de consulta** – Revisamos várias políticas para o cenário de diabetes, mas uma que é particularmente eficaz é a política de estimativa de intervalo, dada por

  $$
  \begin{align}
  \Theta^{IE}(S^n\vert \theta^{IE}) = \argmax_{\theta\in\Theta} \left(\mubar^n_\theta + \theta^{IE} \sigmabar^n_\theta \right). \label{eq:thetaIE}
  \end{align}
  $$

  Agora temos que buscar o melhor valor de $\theta^{IE}$. Pense nisso como um problema de decisão sequencial (encontrar o melhor $\theta^{IE}$) para resolver um problema de decisão sequencial (encontrar o melhor $\theta$ para nossa política $X^\pi(S_t\vert \theta)$). Observamos que, na comunidade de busca, o ajuste do parâmetro $\theta^{IE}$ é tipicamente negligenciado na literatura de pesquisa, mas os praticantes estão conscientes de que isso precisa ser feito.
- **Métodos clássicos de superfície de resposta** – Para problemas em que $x$ é contínuo, faz sentido ajustar um modelo paramétrico à função $\E F(x,W)$. Embora possa ser tentador hoje usar redes neurais, tenha em mente que estes são modelos de alta dimensão que tendem a fazer sobreajuste (overfitting) a qualquer ruído. Existem muitos problemas em que $F(x,W)$ é caro; por exemplo, pode ser uma simulação computacional que poderia levar uma hora ou mais, ou pode exigir experimentos de campo.

  Por essas razões, uma estratégia popular é usar um modelo linear da forma

  $$
  \Fbar(x) = \sum_f \theta_f \phi_f(x),
  $$

  onde $\phi_f(x)$ é uma característica (feature) extraída do vetor de entrada $x$. Suponha que executamos $n$ experimentos usando entradas $x^0, \ldots, x^{n-1}$ a partir das quais observamos as respostas $\Fhat^1, \ldots, \Fhat^n$. A partir desses dados, podemos usar as técnicas de regressão linear para ajustar nosso modelo linear com estimativas $\theta \approx \thetabar^n$, o que nos dá a aproximação

  $$
  \Fbar^n(x) = \sum_f \thetabar^n_f \phi_f(x).
  $$

  A literatura de superfície de resposta há muito tempo usa a estratégia gulosa de otimizar $\Fbar^n(x)$ para encontrar o próximo ponto a observar, o que significa que escreveríamos

  $$
  \begin{align}
  x^n = \argmax_x \Fbar^n(x). \label{eq:responsesurfacegreedy}
  \end{align}
  $$

  Embora essa ideia seja intuitivamente atraente, acontece que usar o que parece ser a melhor estimativa do ótimo com base em nossa aproximação $\Fbar^n(x)$ é, na verdade, uma forma terrível de aprender a melhor aproximação de $\E F(x)$.

  A Figura 7.2 ilustra os desafios de aprender uma função paramétrica. Aqui mostramos três curvas lineares de resposta de demanda, dando a demanda em função do preço, com a forma $D(p) = \theta_0 - \theta_1 p$. Nosso objetivo é maximizar a receita $R(p) = pD(p)$. A Figura 7.2(a) mostra três possíveis curvas de demanda e as curvas de receita correspondentes.

<figure class="book-figure">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-width: 560px; margin: 0 auto;">
    <div><img src="/assets/images/sdam/learningrevenue1.png" alt="Painel (a): três possíveis retas de resposta de vendas e curvas de receita correspondentes" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(a)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue2.png" alt="Painel (b): combinações observadas de preço-vendas se usarmos preços que aparentam maximizar a receita" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(b)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue3.png" alt="Painel (c): observando preços extremos para melhorar o aprendizado da resposta de vendas" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(c)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue4.png" alt="Painel (d): equilibrando aprendizado e ganho" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(d)</p></div>
  </div>
  <figcaption><span class="fig-num">Figura 7.2.</span> Aprendendo ativamente uma função de resposta de demanda: (a) Três possíveis retas de resposta de vendas e curvas de receita correspondentes, (b) Combinações observadas de preço-vendas se usarmos preços que aparentam maximizar a receita, (c) Observando preços extremos (alto e baixo) para melhorar o aprendizado da resposta de vendas, e (d) Equilibrando aprendizado (observando afastado do meio) e ganho (observando preços próximos ao meio).</figcaption>
</figure>

  É tentador querer cotar preços que otimizem a receita como fazemos na Figura 7.2(b), mas isso produz um conjunto de pontos em uma bola que dificulta a estimativa da curva de demanda. A melhor forma de estimar a curva de demanda é cotar preços próximos aos extremos como fazemos na Figura 7.2(c), mas a receita é muito baixa nesses pontos, então não ganhamos dinheiro enquanto estamos aprendendo.

  Uma boa abordagem é testar pontos nos "ombros", o que significa não no ótimo, mas não muito distante, como fazemos na Figura 7.2(d), um comportamento que realizamos com uma política que descrevemos a seguir.
- **Métodos de superfície de resposta com perturbação** – Uma política que supera o trade-off entre exploração e explotação ilustrado na Figura 7.2 usa uma política de horizonte de previsão de um passo chamada gradiente de conhecimento (knowledge gradient), que escolhe $x^n$ para ser o valor que produz o valor máximo de informação. Acontece que os pontos que maximizam o valor da informação nos dão o padrão de amostragem ilustrado na Figura 7.2(d).

  O gradiente de conhecimento é muito complexo para nossa apresentação aqui, mas há uma forma muito simples de obter o mesmo comportamento. Em vez de tomarmos nossa estimativa atual do ótimo aparente $x^n$ como fazemos em $\eqref{eq:responsesurfacegreedy}$, nós o perturbamos por uma quantidade $\rho$, mas há duas formas de fazer isso:

    - **Uma política de desvio-do-ótimo** – A ideia aqui é escolher um ponto $x^n$ que esteja a uma distância $\rho$ do ótimo $\xbar^n = \argmax_x \Fbar^n(x\vert \thetabar^n)$. Se $x$ é um vetor $k$-dimensional, esse desvio pode ser criado amostrando $k$ variáveis aleatórias normalmente distribuídas $Z_1, \ldots, Z_K$, cada uma com média 0 e variância 1, e então normalizando-as de forma que

      $$
      \sqrt{\sum_{k=1}^K Z^2_k} = \rho.
      $$

      Seja $\Zbar^n$ o vetor $k$-dimensional resultante. Agora calcule o ponto de amostragem usando

      $$
      x^n_k = \xbar^n_k + \Zbar^n_k.
      $$

      Observe que, em uma dimensão, teríamos $\Zbar^n = \pm \rho$.
    - **Uma política de excitação** – Aqui novamente geramos um vetor de perturbação $k$-dimensional $Z^n$, onde cada elemento tem média 0 e variância 1, e então definimos

      $$
      x^n_k = \Xbar^n_k + \rho Z^n_k.
      $$

      Enquanto a política de desvio-do-ótimo força $x^n$ a estar a uma distância $\rho$ do ótimo $\xbar^n$, uma política de excitação simplesmente introduz uma perturbação aleatória com média 0, o que significa que o ponto mais provável a ser amostrado é o ótimo de $\fbar^n(x\vert \thetabar^n)$.

  Sugerimos que a política de desvio-do-ótimo é mais adequada para objetivos offline, de recompensa final, enquanto a política de excitação é melhor quando estamos em um ambiente online otimizando recompensa cumulativa.

## O que aprendemos?

- Revisamos as quatro classes de políticas.
- Usamos todas as aplicações introduzidas nos seis capítulos anteriores para contrastar os diferentes estilos de variáveis de estado, e para ilustrar cada uma das quatro classes de políticas.
- Também descrevemos objetivos de recompensa final e recompensa cumulativa. Objetivos de recompensa final surgem quando estamos fazendo observações em um ambiente experimental (no laboratório ou no campo), onde nos importamos apenas com o desempenho do design final. Objetivos de recompensa cumulativa são usados quando estamos aprendendo enquanto fazemos.
- Descrevemos métodos de busca baseados em derivada e métodos de busca livres de derivada para realizar busca de parâmetros.
- Observamos que tanto a busca estocástica baseada em derivada quanto a livre de derivada são problemas de decisão sequencial.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>O que distingue as PFAs das outras três classes de políticas?</li>
<li>O que distingue as VFAs e as DLAs das PFAs e CFAs?</li>
<li>No Capítulo 1, a variável de estado para o problema de estoque mais complicado consiste em variáveis de estado físico $R_t$, variáveis de estado informacional $I_t$, e variáveis de estado de crença $B_t$. O que distingue uma variável de estado de crença de uma variável de estado informacional?</li>
<li>Qual é a diferença nas funções objetivo para aprendizado online e offline?</li>
<li>Descrevemos a busca estocástica baseada em derivada e a livre de derivada como problemas de decisão sequencial. Qual dessas duas estratégias usa um estado de crença, e por que isso é necessário?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>A Figura 7.3 mostra um grafo determinístico, onde estamos tentando encontrar um caminho do nó 1 ao nó 11 usando diferentes objetivos.
  <ol type="a">
    <li>Se nosso viajante simplesmente quer minimizar o tempo total de viagem do nó 1 ao 11, e atualmente percorreu o caminho 1-2-6-9, qual é o seu estado?</li>
    <li>Agora suponha que nosso viajante tenha que chegar ao nó 11 até o tempo 45. Se chegar após o tempo 45, ela recebe uma penalidade igual ao quadrado do atraso. Qual é o estado do viajante que percorreu o caminho 1-2-6-9 até agora?</li>
    <li>Qual é o estado se o viajante que percorreu o caminho 1-2-6-9 quer minimizar o segundo maior custo em qualquer um dos elos ao longo de seu caminho?</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariablemaxarccost.jpg" alt="Um grafo determinístico." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 7.3.</span> Um grafo determinístico.</figcaption>
</figure>
</li>
<li>História real: uma empresa de tecnologia financeira ("fintech") tem um sistema de negociação algorítmica para negociação de alta frequência. No instante $t$, quando um ativo está sendo negociado ao preço $p_t$, eles estimam se o preço está subindo ou caindo usando uma série de previsões de como o preço pode mudar ao longo de um horizonte rolante dentro do dia. Aqui, o tempo é medido em incrementos de 15 minutos. Seja $f_{tt'}$ o preço estimado do ativo no instante $t'$, feito dada a informação no instante $t$. Agora crie um preço estimado usando

$$
\fbar_t(\theta) = \sum_{t'=t+1}^{t+H} \theta_{t'-t} f_{tt'},
$$

onde $\theta = (\theta_1, \theta_2, \ldots, \theta_H)$ é o vetor de pesos para cada incremento de 15 minutos até seis horas no futuro (24 incrementos). Seja $x_t = 1$ indicando uma decisão de vender no instante $t$, $x_t = -1$ é uma decisão de comprar, e $x_t = 0$ é de manter, onde a política é

$$
X^\pi(S_t\vert \theta) = \begin{cases} +1 & \text{if } \fbar_t(\theta) \geq p_t + 1.0, \\ 0 & \text{if } p_t - 1.0 < \fbar_t(\theta) < p_t + 1.0, \\ -1 & \text{if } \fbar_t(\theta) \leq p_t - 1.0. \end{cases}
$$

O desafio é otimizar o vetor de pesos $\theta$.
  <ol type="a">
    <li>No instante $t$, qual é o estado deste sistema?</li>
    <li>Em qual classe de política $X^\pi(S_t\vert \theta)$ se encaixaria? Explique.</li>
    <li>Suponha que você possa simular a política usando dados históricos em um simulador. Seja $F(\theta)$ o desempenho esperado da política dado o vetor de parâmetros $\theta$. Escreva esse objetivo supondo que você vá simular a política usando uma única amostra do histórico.</li>
    <li>Descreva como calcular uma derivada numérica usando seu simulador. Escreva apenas a derivada numérica para um único elemento $\theta_\tau$.</li>
  </ol>
</li>
</ol>
{% endraw %}
