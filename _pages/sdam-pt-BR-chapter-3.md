---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 3: Planejamento adaptativo de mercado"
permalink: /sdam/pt-BR/chapter-3/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 8d040048b8e28e95
---


{% raw %}
## Visão geral do capítulo

Usamos o termo "planejamento adaptativo de mercado" para descrever o que é amplamente conhecido como o problema do jornaleiro (*newsvendor problem*), no qual temos que escolher uma quantidade de um recurso para vender (os "jornais") a fim de atender a uma demanda de mercado desconhecida, sendo que os recursos não utilizados são descartados ao final do período de venda. Isso significa que os diferentes períodos de tempo não estão fisicamente conectados.

Começamos usando esse problema para ilustrar um algoritmo básico de gradiente estocástico que é conhecido por convergir para a quantidade ótima. Essa abordagem supera o problema de que, se alocarmos muito pouco, não observamos a demanda real, mas sim apenas o quanto conseguimos vender (o que é limitado pelo estoque que disponibilizamos).

Algoritmos de gradiente estocástico são amplamente usados na otimização sob incerteza, quando temos acesso a um gradiente. Algoritmos de gradiente estocástico foram introduzidos pela primeira vez em 1951 e possuem propriedades de convergência bem compreendidas. Menos conhecida, no entanto, é a ideia de que um algoritmo de gradiente estocástico é, por si só, um problema de decisão sequencial, no qual a "decisão" é o tamanho do passo (*stepsize*) usado no algoritmo.

A literatura clássica sobre algoritmos de gradiente estocástico se concentra na propriedade de que, no limite, eles produzirão a solução ótima para um problema de período único (ou seja, encontram a quantidade ótima a ser alocada). Quase inteiramente negligenciado é o fato de que, quando isso é feito em um ambiente de campo, o que significa que estamos vivenciando os resultados à medida que ocorrem, precisamos usar como objetivo a tarefa de maximizar a *recompensa cumulativa*, que é a soma das recompensas ao longo do tempo.

Nas extensões, também introduzimos uma nuance que é negligenciada na literatura. Na prática, não apenas não conhecemos a demanda, como também não conhecemos sua distribuição. A cada período de tempo, observamos quanto vendemos (o que é limitado pela quantidade do recurso que disponibilizamos), e aprendemos com essa experiência para atualizar nossa crença sobre a distribuição antes de decidir quanto alocar no próximo período de tempo. Isso introduz um estado de crença que conecta os períodos de tempo entre si, assim como aconteceria se mantivéssemos o estoque remanescente para o período seguinte. Essa é outra perspectiva ausente nos tratamentos clássicos do problema do jornaleiro.

Essas questões oferecem uma riqueza considerável a um problema de decisão sequencial que ainda é bastante simples e elegante.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Maximizar a receita esperada ao atender a demanda, menos o custo de compra do produto, ao longo de um horizonte de planejamento.
- **Decisões:** Quanto produto comprar em cada período de tempo.
- **Incertezas:** A demanda pelo produto em cada período de tempo.

## Narrativa

Existe uma ampla classe de problemas que envolvem a alocação de algum recurso para atender a uma demanda incerta (e, às vezes, inobservável). Exemplos incluem:

- Estocar um inventário perecível (por exemplo, peixe fresco) para atender a uma demanda em que o estoque remanescente não pode ser mantido para o futuro.
- Estocar peças para manufatura de alta tecnologia (por exemplo, motores a jato), em que precisamos encomendar peças para atender a uma demanda conhecida, mas em que as peças podem não atender às especificações exigidas e ter que ser descartadas. Assim, podemos precisar encomendar oito peças para atender a uma demanda de cinco, porque várias das peças podem não atender às especificações de engenharia exigidas.
- Temos que alocar tempo para concluir uma tarefa (como dirigir até o trabalho, ou alocar tempo para concluir um projeto).
- Temos que alocar orçamentos anuais para atividades como marketing. Os fundos remanescentes são devolvidos à empresa.

O problema mais simples envolve tomar essas decisões para atender a uma demanda incerta com uma distribuição conhecida, mas as aplicações mais comuns envolvem distribuições que são desconhecidas e precisam ser aprendidas. Pode haver outras informações, como a disponibilidade de previsões da demanda, bem como informações dinâmicas, como o preço de mercado do peixe fresco (que pode ser conhecido ou desconhecido antes de a decisão sobre o recurso ser tomada).

Esse problema tem sido amplamente estudado desde a década de 1950, originalmente conhecido como o "problema de estoque de período único", mas atualmente é identificado principalmente como o "problema do jornaleiro" (*newsvendor problem*). Ele é amplamente usado como o problema canônico em otimização sob incerteza.

O problema do jornaleiro é tipicamente formulado como

$$
\begin{align}
\max_x \E F(x,W) = \E \big(p\min\{x,W\} - cx\big), \label{eq:newsvendorasymptotic}
\end{align}
$$

em que $x$ é nossa variável de decisão que determina a quantidade de recurso para atender à demanda, e em que $W$ é a demanda incerta pelo recurso. Assumimos que "compramos" nosso recurso a um custo unitário de $c$, e vendemos o menor entre $x$ e $W$ a um preço $p$ (que assumimos ser maior que $c$). A função objetivo apresentada na equação $\eqref{eq:newsvendorasymptotic}$ é chamada de forma *assintótica* do problema do jornaleiro.

Existem duas variações importantes do problema do jornaleiro:

- A distribuição da variável aleatória $W$ é conhecida.
- A distribuição de $W$ é desconhecida.

O caso desconhecido é o que surge com mais frequência na prática, o que introduz a dimensão de que, a cada vez que executamos uma iteração de escolher $x$ e depois observar o menor entre $x$ e $W$, aprendemos algo sobre a distribuição de $W$.

Se $W$ fosse determinístico (e se $p > c$), então a solução é facilmente verificada como sendo $x = W$. Agora imagine que $W$ seja uma variável aleatória com distribuição de probabilidade $f^W(w)$ ($W$ pode ser discreta ou contínua). Seja $F^W(w) = Prob[W \leq w]$ a distribuição cumulativa de $W$. Se $W$ for contínua, e se pudéssemos calcular $F(x) = \E F(x,W)$, então a solução ótima $x^\ast $ satisfaria

$$
\left.\frac{d F(x)}{dx}\right\vert _{x=x^\ast } = 0.
$$

Considere agora o que é conhecido como o *gradiente estocástico*, em que tomamos a derivada de $F(x,W)$ assumindo que conhecemos $W$, que é dada por

$$
\begin{align}
\frac{d F(x,W)}{dx} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases} \label{eq:newsvendorstochasticgradient}
\end{align}
$$

Este é um gradiente (ou seja, uma derivada) de $F(x,W)$ dada a variável aleatória $W$, que é "estocástico" porque depende da variável aleatória $W$, que é revelada somente após escolhermos $x$. Essa é a razão pela qual $d F(x,W)/dx$ na equação $\eqref{eq:newsvendorstochasticgradient}$ é chamado de "gradiente estocástico".

Tomando a esperança de ambos os lados de $\eqref{eq:newsvendorstochasticgradient}$, obtemos

$$
\begin{align*}
\E \frac{d F(x,W)}{dx} &= (p-c) Prob[x \leq W] - c Prob[x > W] \\
&= (p-c) (1-F^W(x)) - c F^W(x) \\
&= (p-c) - pF^W(x) \\
&= 0 \quad \text{for } x = x^\ast .
\end{align*}
$$

Podemos agora resolver para $F^W(x^\ast )$, obtendo

$$
F^W(x^\ast ) = \frac{p-c}{p}.
$$

Assim, à medida que $c$ diminui para 0, queremos encomendar uma quantidade $x^\ast $ que atenderá à demanda com probabilidade 1. À medida que $c$ se aproxima de $p$, então a quantidade ótima de pedido atenderá à demanda com uma probabilidade que se aproxima de 0.

Isso significa que calculamos $(p-c)/p$, que é um número entre 0 e 1, e então encontramos a quantidade $x^\ast $ que corresponde à quantidade de pedido em que a probabilidade de a demanda aleatória ser menor que $x^\ast $ é igual a $(p-c)/p$.

Acabamos de ver duas situações em que podemos encontrar a quantidade de pedido exatamente: quando conhecemos $W$ com antecedência (poderíamos chamar isso de previsão perfeita) ou quando conhecemos a distribuição de $W$. Esse resultado é conhecido desde a década de 1950, gerando uma série de artigos para estimar a distribuição de $W$ a partir de dados observados, lidando com a situação em que não podemos observar $W$ diretamente quando $x < W$ (ou seja, observamos apenas as vendas, e não a demanda, uma situação conhecida como "demandas censuradas").

Vamos abordar o problema em que a distribuição da demanda é desconhecida. Nossa abordagem será usar um algoritmo de busca sequencial dado por

$$
\begin{align}
x^{n+1} = \max\left\{0,x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n} \right\},  \label{eq:stochasticgradientalgorithm}
\end{align}
$$

em que $\alpha_n$ é conhecido como um *tamanho de passo* (*stepsize*). Nosso desafio será escolher $\alpha_n$ a cada iteração.

## Modelo básico

### Variáveis de estado

A variável de estado captura a informação que temos no instante $n$ que precisamos, junto com a política e a informação exógena, para calcular o estado no instante $n+1$. Para nosso procedimento de busca na equação $\eqref{eq:stochasticgradientalgorithm}$, nossa variável de estado é dada por

$$
S^n = (x^n).
$$

### Variáveis de decisão

O truque com esse problema é reconhecer a variável de decisão. É tentador pensar que $x^n$ é a decisão, mas, no contexto deste algoritmo, a decisão real é o tamanho do passo $\alpha_n$. Como em todos os nossos problemas de decisão sequencial, a decisão (ou seja, o tamanho do passo) é determinada pelo que é tipicamente chamado de regra de tamanho de passo, mas às vezes é chamada de política de tamanho de passo, que denotamos por $\alpha^\pi(S^n)$.

Normalmente introduzimos políticas mais adiante, mas, para ajudar na compreensão do modelo, vamos começar com uma política básica de tamanho de passo chamada *regra de tamanho de passo harmônica*, dada por

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

Esta é uma regra de tamanho de passo determinística simples, o que significa que conhecemos de antemão o tamanho do passo $\alpha_n$ assim que soubermos $n$. Abaixo, introduzimos uma política de tamanho de passo estocástica mais interessante, que exige uma variável de estado mais rica.

Também vamos deixar que $X^\pi(S^n)$ seja o valor de $x^n$ determinado pela política de tamanho de passo $\alpha^\pi(S^n)$.

### Informação exógena

A informação exógena é a demanda aleatória $W^{n+1}$ pelo recurso (produto, tempo ou dinheiro) que estamos tentando atender com nosso suprimento de produto $x^n$. Podemos assumir que observamos $W^{n+1}$ diretamente, ou podemos apenas observar se $x^n \leq W^{n+1}$, ou $x^n > W^{n+1}$.

### Função de transição

A equação de transição, para o cenário em que $x$ é irrestrito, é dada por

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n}.  \label{eq:stochasticgradientaltransition1}
\end{align}
$$

Observamos que é possível que a equação $\eqref{eq:stochasticgradientaltransition1}$ produza um valor $x^{n+1} < 0$, que não pode ser implementado. A correção aqui é simples: basta definir $x^{n+1} = 0$.

### Função objetivo

A cada iteração, recebemos um benefício líquido dado por

$$
F(x^n,W^{n+1}) = p\min\{x^n,W^{n+1}\} - cx^n.
$$

Agora temos que construir uma função objetivo para encontrar a melhor política. Podemos abordar essa configuração de problema de duas maneiras. Na primeira, assumimos que temos que aprender em campo, enquanto a segunda assume que temos acesso a um simulador para aprender a política.

**Otimizando em campo**

Se estamos vivenciando nossas decisões em campo, queremos maximizar a *recompensa cumulativa* ao longo de algum horizonte. Isso significa que precisamos encontrar a melhor política (o que, nesse contexto, significa a melhor regra de tamanho de passo) resolvendo

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} F(X^\pi(S^n\vert \theta),W^{n+1})\vert S^0\right\}. \label{eq:newsvendorobjectivecumulativereward}
\end{align}
$$

em que $S^{n+1} = S^M(S^n,X^\pi(S^n),W^{n+1})$ descreve a evolução do algoritmo (por exemplo, a função de transição dada pela equação $\eqref{eq:stochasticgradientaltransition1}$). Aqui, $\pi$ se refere ao tipo de regra de tamanho de passo (consideramos várias abaixo), e a quaisquer parâmetros ajustáveis (como $\theta^{step}$).

Curiosamente, a narrativa por trás do problema do jornaleiro sempre envolve aprendizado em campo, e, no entanto, a recompensa cumulativa na equação $\eqref{eq:newsvendorobjectivecumulativereward}$ nunca é usada como função objetivo. Mencionamos isso para os leitores que fizerem uma pesquisa bibliográfica sobre o "problema do jornaleiro".

**Otimizando usando um simulador**

Alternativamente, podemos estar usando um simulador em que executaremos nossa busca por $N$ iterações, terminando com $x^N$. Vamos renomear essa solução final como $x^{\pi,N}$ para expressar a dependência em relação à política de tamanho de passo $\alpha^\pi(S^n)$.

Nossa solução final $x^{\pi,N}$ é uma variável aleatória, pois depende da sequência $W^1, \ldots, W^n$. Como antes, vamos deixar que $\omega$ represente uma realização amostral de $W^1(\omega), \ldots, W^n(\omega)$, e escrevemos nossa solução como $x^{\pi,N}(\omega)$ para indicar que esta é a solução que obtivemos quando usamos o caminho amostral $\omega$.

Como estamos usando um simulador, nos importamos apenas com o desempenho da solução final (também chamada de *recompensa final*), que escrevemos como

$$
\begin{align}
F(x^{\pi,N},\What) = p\min\{x^{\pi,N},\What\} - cx^{\pi,N}, \label{eq:newsvendorxpiNobjective}
\end{align}
$$

em que $\What$ é uma variável aleatória que usamos para testar o desempenho de $x^{\pi,N}$.

Isso significa que temos duas variáveis aleatórias em nossa função objetivo dada em $\eqref{eq:newsvendorxpiNobjective}$. Para um único conjunto de realizações de $W^1(\omega), \ldots, W^n(\omega)$, obtemos uma solução $x^{\pi,N}(\omega)$. Agora, seja $\psi$ uma realização amostral de $\What$. Assim, se tivermos uma realização amostral da solução $x^{\pi,N}(\omega)$, e uma realização amostral de nossa variável de teste $\What(\psi)$, nosso desempenho seria

$$
\begin{align}
F(x^{\pi,N}(\omega),\What(\psi)) = p\min\{x^{\pi,N}(\omega),\What(\psi)\} - cx^{\pi,N}(\omega). \label{eq:newsvendorxpiNobjectivesample}
\end{align}
$$

O que realmente queremos fazer é tirar médias sobre as possíveis realizações tanto de $x^{\pi,N}(\omega)$ quanto de $\What(\psi)$, o que podemos escrever usando

$$
\begin{align}
\Fbar^\pi  = \frac{1}{N} \frac{1}{M} \sum_{\omega=1}^N \sum_{\psi=1}^M \left(p\min\{x^{\pi,N}(\omega^n),\What(\psi^m)\} - cx^{\pi,N}(\omega^n)\right). \label{eq:newsvendorxpiNobjectivesampleaverage}
\end{align}
$$

A estimativa $\Fbar^\pi$ representa uma média sobre $N$ amostras da sequência $W^1(\omega), \ldots, W^n(\omega)$, e $M$ amostras da variável de teste $\What(\psi)$.

## Modelagem de incerteza

Seja $f^W(w)$ a distribuição de $W$ (que pode ser discreta ou contínua), com função de distribuição cumulativa $F^W(w) = Prob[W \leq w]$. Podemos assumir que a distribuição é conhecida com um parâmetro desconhecido. Por exemplo, imagine que $W$ siga uma distribuição de Poisson com média $\mu$ dada por

$$
f^W(w) = \frac{\mu^w e^{-\mu}}{w!}, \quad w=0, 1, 2, \ldots.
$$

Podemos assumir que conhecemos $\mu$, caso em que poderíamos resolver este problema usando a solução analítica apresentada no início do capítulo. Suponha, em vez disso, que $\mu$ seja desconhecido, mas com uma distribuição conhecida $p^\mu_k = Prob[\mu=\mu_k]$. Observe que essa distribuição $p^\mu = (p^\mu_k)\_{k=1}^K$ seria modelada em nosso estado inicial $S^0$.

## Projetando políticas

Já apresentamos duas escolhas de políticas de tamanho de passo, que escrevemos como $\alpha^\pi(S^n)$ para imitar nosso estilo em outras partes ao escrever políticas.

Uma ampla gama de políticas de tamanho de passo (frequentemente chamadas de regras de tamanho de passo) foi sugerida na literatura. Uma das mais simples e populares é a política de tamanho de passo harmônico, dada por

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

A Figura 3.1 ilustra o comportamento da regra de tamanho de passo harmônico para diferentes valores de $\theta^{step}$.

<figure class="book-figure">
  <img src="/assets/images/sdam/harmonicstepsizes.png" alt="Harmonic stepsizes for different values of theta-step." style="max-width: 420px;">
  <figcaption><span class="fig-num">Figura 3.1.</span> Tamanhos de passo harmônicos para diferentes valores de $\theta^{step}$.</figcaption>
</figure>

A política de tamanho de passo harmônico também é conhecida como política determinística, pois conhecemos seu valor para um dado $n$ com antecedência. O desafio com as políticas determinísticas é que elas não podem se adaptar aos dados. Por essa razão, é frequentemente útil usar uma regra estocástica. Um dos primeiros e mais simples exemplos é a regra de Kesten

$$
\alpha^{kesten}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+K^n-1},
$$

onde $K^n$ é um contador que conta quantas vezes o gradiente mudou de direção. Determinamos isso perguntando se o produto (ou produto interno, se $x$ for um vetor) $(\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0$. Se o gradiente estiver mudando de direção, isso significa que estamos nas proximidades do ótimo e o estamos ultrapassando, então precisamos reduzir o tamanho do passo. Essa fórmula é escrita como

$$
\begin{align}
K^{n+1} = \begin{cases} K^n + 1 & \text{if } (\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0, \\ K^n & \text{otherwise,} \end{cases} \label{eq:kestenupdate}
\end{align}
$$

onde $\nabla_x F(x^n,W^{n+1}) = \frac{d F(x,W^{n+1})}{dx}$.

Agora temos um tamanho de passo que depende de uma variável aleatória $K^n$, motivo pelo qual a chamamos de regra estocástica de tamanho de passo. Se usarmos a regra de Kesten, precisamos modificar nossa variável de estado para incluir $K^n$, o que nos dá

$$
S^n = (x^n,K^n).
$$

Também precisamos adicionar a equação $\eqref{eq:kestenupdate}$ à nossa função de transição.

Outra regra de tamanho de passo, conhecida como AdaGrad, é particularmente adequada quando $x$ é um vetor com elemento $x_i,~i=1, \ldots, I$. Para simplificar um pouco a notação, seja o gradiente estocástico em relação ao elemento $x_i$ dado por

$$
g^n_{i} = \nabla_{x_i} F(x^{n-1}, W^n).
$$

Agora crie uma matriz diagonal $I \times I$ $G^n$ onde o $(i,i)$-ésimo elemento $G^n_{ii}$ é dado por

$$
G^n_{ii}  = \sum_{m=1}^n (g^n_{i})^2.
$$

Em seguida, definimos um tamanho de passo para a $i$-ésima dimensão usando

$$
\begin{align}
\alpha_{ni} = \frac{\theta}{(G^n_{ii})^2 + \epsilon}, \label{eq:adagrad}
\end{align}
$$

onde $\theta$ é um parâmetro ajustável (comparável a $\theta^{step}$ em nossa fórmula de tamanho de passo harmônico) e $\epsilon$ é um número pequeno (por exemplo, $10^{-8}$, para evitar a possibilidade de divisão por zero).

A Figura 3.2 ilustra diferentes taxas de convergência para diferentes regras de tamanho de passo, mostrando $F(x^n,W^{n+1})$ em função do número de iterações. Se estivéssemos otimizando a recompensa final em $\eqref{eq:newsvendorxpiNobjectivesampleaverage}$, poderíamos simplesmente escolher a linha mais alta, o que depende do orçamento $N$. Se estivermos otimizando a recompensa acumulada na equação $\eqref{eq:newsvendorobjectivecumulativereward}$, então precisamos nos concentrar na área sob a curva, o que favorece a convergência inicial rápida.

<figure class="book-figure">
  <img src="/assets/images/sdam/newsvendorconvergence.png" alt="Plot of F(x^n, W^n+1) for different stepsize rules, illustrating different rates of convergence." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 3.2.</span> Gráfico de $F(x^n,W^{n+1})$ para diferentes regras de tamanho de passo, ilustrando diferentes taxas de convergência.</figcaption>
</figure>

## Extensões

**1)** Imagine que não conhecemos $\mu$, mas vamos supor que $\mu$ pode assumir um dos valores $(\mu_1, \mu_2, \ldots, \mu_K)$. Seja $H^n$ o histórico de observações até o $n$-ésimo experimento, e seja $H^0$ o histórico inicial vazio. Assumimos que começamos com uma probabilidade a priori inicial sobre $\mu$, que escrevemos como

$$
p^0_k = Prob[\mu = \mu_k\vert H^0].
$$

Depois de observarmos $W^1, \ldots, W^n$, escreveríamos nossa distribuição atualizada como

$$
p^n_k = Prob[\mu = \mu_k\vert H^n].
$$

Podemos atualizar $p^n = (p^n_k)\_{k=1}^K$ usando o teorema de Bayes

$$
\begin{align}
p^{n+1}_k &= Prob[\mu=\mu_k\vert W^{n+1}=w,H^n] \\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k,H^n]Prob[\mu=\mu_k\vert H^n]}{Prob[W^{n+1}=w\vert H^n]}\\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k}{Prob[W^{n+1}=w\vert H^n]},
\end{align}
$$

onde

$$
Prob[W^{n+1}=w\vert H^n] = \sum_{k=1}^K Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k.
$$

Com essa extensão do modelo básico, temos duas distribuições de probabilidade: a crença sobre a verdadeira média $\mu$, e a demanda aleatória $W$ dado $\mu$. Para incluir essa extensão, teríamos que inserir $p^n$ em nossa variável de estado, de modo que escreveríamos

$$
S^n = (x^n, p^n).
$$

**2)** Imagine que nosso problema seja comprar uma commodity (como petróleo ou gás natural) no mês $n$ para ser usada durante o mês $n+1$. Compramos a commodity a um custo unitário $c$ e a vendemos até uma demanda desconhecida $D^{n+1}$ a um preço desconhecido $p^{n+1}$. Escreveríamos nossa função objetivo para este problema como

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^{n+1} \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension1}
\end{align}
$$

## O que aprendemos?

- Usamos o contexto de um problema do tipo *newsvendor* para ilustrar um algoritmo de gradiente estocástico como um problema de decisão sequencial. Mostramos como modelar um algoritmo de gradiente estocástico usando os cinco elementos de um problema de decisão sequencial apresentados no [Capítulo 1](/sdam/pt-BR/chapter-1/).
- Apresentamos vários exemplos de políticas PFA para a escolha dos tamanhos de passo.
- O problema do *newsvendor* é classicamente apresentado como um problema estático, no qual buscamos a melhor solução, interessando-nos apenas o desempenho de nossa escolha final de $x$. Neste capítulo, apresentamos dois objetivos: a *recompensa acumulada* para o aprendizado (otimização) online em campo, e a *recompensa final*, caso estivéssemos usando um simulador para projetar a melhor política de aprendizado.
- Apresentamos a ideia de usar uma distribuição de probabilidade (neste caso, uma distribuição de Poisson) para as demandas aleatórias de produto, na qual a média da distribuição de Poisson é, em si, uma variável aleatória.
- Apresentamos a extensão de aprender adaptativamente a distribuição de probabilidade para a média da distribuição de Poisson.
- Também apresentamos a questão de fazer com que a decisão $x_t$ dependa de outras variáveis de estado, como o preço $p_t$. Isso é o mesmo que criar uma política $X^\pi(S_t)$ onde o estado $S_t$ depende (neste contexto) do preço $p_t$. Essa é uma mudança significativa na forma de pensar sobre o problema do *newsvendor*, mas se enquadra na mesma classe de todos os nossos problemas de decisão sequencial.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Qual é a variável de decisão para nosso algoritmo de busca sequencial?</li>
<li>Dê exemplos de busca em classes de políticas (dê dois exemplos) e os parâmetros ajustáveis para cada classe de política.</li>
<li>Escreva o que se entende por um objetivo de *recompensa acumulada* e um objetivo de *recompensa final*.</li>
<li>Ao buscar o parâmetro ajustável $\theta^{step}$ para a regra de tamanho de passo harmônico, como você acha que o valor ótimo de $\theta^{step}$ obtido usando uma recompensa acumulada se compararia ao valor ótimo ao usar uma recompensa final?</li>
<li>Supondo que não conhecemos a distribuição da demanda $W$, argumente por que não faz sentido encontrar o $x^\ast $ ótimo em um simulador. Dado isso, faz mais sentido usar o simulador para otimizar a política de aprendizado. Se usarmos um simulador para otimizar a política de aprendizado, qual função objetivo seria apropriada para este exercício de aprendizado?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Uma grande empresa de gases industriais precisa comprar contratos de eletricidade com um mês de antecedência usando um contrato do tipo "take or pay" (compra ou paga). Se a empresa contratar a compra de $x_t$ megawatts-hora para o mês $t+1$, ela paga um preço $p_t$ independentemente de precisar ou não da energia. Mas se a carga (demanda) $L_{t+1}$ no mês $t+1$ exceder $x_t$, então a empresa precisa comprar energia da rede a um preço à vista $p^{spot}_{t+1}$. O custo de satisfazer a carga no mês $t+1$ é, então,

$$
C(S_t,W_{t+1}) = p_t x_t + p^{spot}_{t+1} \max\{0, L_{t+1}-x_t\}.
$$

Somos capazes de observar os diferentes preços e cargas, mas não conhecemos sua distribuição de probabilidade. Nosso objetivo é minimizar os custos ao longo de um ano.

Suponha que $x_t$ seja discreto com valores $x_1, \ldots, x_M$. Seja $(\mubar_{tx}, \beta_{tx})$ a média e a precisão de nossa estimativa de $\E C(S_t,W_{t+1})$ e suponha que usemos uma política chamada *estimativa por intervalo*, $X^{IE}(S_t\vert \theta)$, para escolher $x_t$:

$$
X^{IE}(S_t\vert \theta^{IE}) = \argmin_x \left(\mubar_{tx} - \theta^{IE} \sqrt{\frac{1}{\beta_{tx}}}\right).
$$

  <ol type="a">
    <li>Forneça a variável de estado $S_t$ e a informação exógena $W_{t+1}$.</li>
    <li>Escreva a função objetivo para encontrar $\theta^{IE}$ que minimize os custos acumulados ao longo de um ano. Mostre a esperança sobre cada variável aleatória escrevendo a variável aleatória como um subscrito do operador de esperança (como em $\E_Y$). Em seguida, mostre como escrever a esperança como uma simulação, assumindo que você tenha $K$ amostras de cada variável aleatória.</li>
    <li>Forneça a fórmula para encontrar o gradiente da função objetivo em (b) usando uma derivada numérica, e escreva um algoritmo de gradiente estocástico para encontrar um bom valor de $\theta$ dentro de $N$ iterações.</li>
    <li>Suponha agora que os preços evoluam de acordo com $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2}$. Qual é a variável de estado agora, e como a adição de dimensões à variável de estado complica o problema de encontrar o $\eta$ ótimo acima?</li>
  </ol>
</li>
<li>Considere a extensão 2 acima, na qual o preço $p$ agora muda com as iterações, e na qual o preço que recebemos no tempo $n$ não é conhecido no tempo $n$, então o designamos por $p^{n+1}$. Por ora, suponha que $p^{n+1}$ é independente de $p^n$, e que $D^{n+1}$ é independente de $D^n$.
  <ol type="a">
    <li>Para o modelo na equação $\eqref{eq:newsvendorextension1}$, forneça a variável de estado $S^n$ e a variável de informação exógena $W^n$.</li>
    <li>Forneça o algoritmo de gradiente estocástico para este problema, e mostre que ele é basicamente o mesmo que quando o preço era constante.</li>
  </ol>
</li>
<li>Estenda o exercício 7, mas agora suponha que os preços evoluem de acordo com

$$
p^{n+1} = \eta_0 p^n + \eta_1 p^{n-1} + \eta_2 p^{n-2} + \varepsilon^{n+1}
$$

onde $\varepsilon^{n+1}$ é um termo de ruído de média 0, independente do processo de preços.
  <ol type="a">
    <li>Para o modelo na equação $\eqref{eq:newsvendorextension1}$, forneça a variável de estado $S^n$ e a variável de informação exógena $W^n$.</li>
    <li>Forneça o algoritmo de gradiente estocástico para este problema.</li>
  </ol>
</li>
<li>Agora suponha que nosso objetivo seja otimizar

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^n \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension2}
\end{align}
$$

A única diferença entre as equações $\eqref{eq:newsvendorextension2}$ e $\eqref{eq:newsvendorextension1}$ é que agora conseguimos ver o preço $p^n$ *antes* de escolher nossa decisão $x^n$. Sabemos disso pela forma como o preço é indexado.
  <ol type="a">
    <li>Para o modelo na equação $\eqref{eq:newsvendorextension2}$, forneça a variável de estado $S^n$ e a variável de informação exógena $W^n$.</li>
    <li>Forneça o algoritmo de gradiente estocástico para este problema. Diferentemente do problema anterior, esse gradiente será uma função de $p^n$.</li>
  </ol>

A situação em que o gradiente depende do preço $p^n$ é uma complicação bastante significativa. O que está acontecendo aqui é que, em vez de tentar encontrar uma solução ótima $x^\ast $ (ou mais precisamente, $x^{\pi,N}$), estamos tentando encontrar uma função $x^{\pi,N}(p)$.

O truque aqui é escolher uma forma funcional para $x^{\pi,N}(p)$. Sugerimos duas alternativas:

**Tabela de consulta (lookup table)** – Mesmo que $p$ seja contínuo, podemos discretizá-lo em uma série de preços discretos $p_1, \ldots, p_K$, onde escolhemos o valor $p_k$ mais próximo de um preço $p^n$. Chame esse preço de $p^n_k$. Agora pense em um algoritmo de gradiente estocástico indexado por qualquer $p_k$ que esteja mais próximo de $p^n$. Em seguida, usamos o gradiente estocástico para atualizar $x^n(p^n_k)$ usando

$$
x^{n+1}(p^n_k) = x^n(p^n_k) + \alpha_n \nabla_x F^n(x^n,W^{n+1}).
$$

Obviamente, não queremos discretizar $p$ de forma muito fina. Se discretizarmos os preços em, digamos, 100 faixas, isso significa que estamos tentando encontrar 100 quantidades de pedido $x^{\pi,N}(p)$, o que seria bastante difícil.

**Modelo paramétrico** – Agora imagine que acreditamos poder representar a quantidade de pedido $x^{\pi,N}(p)$ como uma função paramétrica

$$
\begin{align}
x^{\pi,N}(p\vert \theta) = \theta_0 + \theta_1 p + \theta_2 p^{\theta_3}. \label{eq:parametricorderquantity}
\end{align}
$$

Quando usamos uma função paramétrica como essa, não estamos mais tentando encontrar a quantidade de pedido $x^{\pi,N}$; em vez disso, estamos tentando encontrar $\theta$, que determina a função (neste caso, $\eqref{eq:parametricorderquantity}$). Nosso algoritmo de gradiente estocástico agora se torna

$$
\begin{align*}
\theta^{n+1} &= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d \theta} \\
&= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta},
\end{align*}
$$

Lembre-se de que $\theta^n$ é um vetor coluna de quatro elementos, enquanto $x^n$ é um escalar. A primeira derivada é nosso gradiente estocástico original

$$
\frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases}
$$

A segunda derivada é calculada diretamente a partir da política $\eqref{eq:parametricorderquantity}$, que é dada por

$$
\frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta} = \begin{pmatrix} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_0} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_1} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_2} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_3} \end{pmatrix} = \begin{pmatrix} 1 \\ p^n \\ (p^n)^{\theta_3} \\ \theta_2(p^n)^{\theta_3} \ln{p^n} \end{pmatrix}.
$$

Usar o modelo paramétrico pode ser muito eficaz se a forma paramétrica corresponder à verdadeira forma da função $x^{\pi,N}(p)$. A representação em tabela de consulta é mais geral, o que pode ser uma vantagem, mas se a discretização for muito fina, isso exigirá um número muito maior de iterações para resolver.

Com essas estratégias em mente, considere as próximas três extensões:</li>
<li>Retorne à função objetivo na equação $\eqref{eq:newsvendorextension1}$, onde o preço só é revelado após fazermos a decisão de pedido, mas agora $p^{n+1}$ depende do histórico, como em

$$
p^{n+1} = p^n + \varepsilon^{n+1}.
$$

Discuta como você abordaria esse problema, dado o que apresentamos acima.</li>
<li>Repita o exercício 10, mas agora suponha que

$$
p^{n+1} = 0.5 p^n + 0.5 p^{n-1} + \varepsilon^{n+1}.
$$</li>
<li>Repita o exercício 10, mas agora a quantidade $x^n$ é escolhida sujeita à restrição $0 \leq x \leq R^n$ onde

$$
R^{n+1} = \max\{0, R^n + x^n - W^{n+1}\},
$$

e onde o preço $p=p^n$ é revelado antes de tomarmos uma decisão. Com essa transição, nosso problema se torna um problema de estoque tradicional.</li>
<li>Uma conta de gastos flexíveis (FSA, na sigla em inglês) é um instrumento contábil que permite às pessoas guardar dinheiro isento de impostos com o objetivo de cobrir despesas médicas. Você precisa alocar quanto deseja ter disponível no ano $t+1$ ao final do ano $t$. O desafio é que, se você colocar dinheiro demais na conta, perde o que sobrar.

Seja $M_{t+1}$ suas despesas médicas no ano $t+1$, e seja $x_t$ o montante que você aloca ao final do ano $t$ para gastar no ano $t+1$. Seja $r$ sua alíquota marginal de imposto, onde $0 < r < 1$. Seus gastos totais no ano $t+1$ são dados por

$$
C(x_t,M_{t+1}) = x_t + \frac{1}{1-r}\max\{0,M_{t+1} - x_t\}.
$$

Você gostaria de usar um algoritmo de gradiente estocástico da forma

$$
x_{t+1} = x_t + \alpha_t \gbar_{t+1},
$$

onde

$$
\gbar_{t+1} = (1-\eta)\gbar_t + \eta \frac{dC(x_t,M_{t+1})}{dx_t}
$$

e onde $0 < \eta < 1$ é um fator de suavização. Para o tamanho do passo, use

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + K_t -1},
$$

onde $K_t$ conta quantas vezes a derivada da função de custo mudou de sinal. Ou seja,

$$
K_{t+1} = \begin{cases} K_t +1 & \text{if } \frac{dC(x_t,M_{t+1})}{dx_t} \frac{dC(x_{t-1},M_t)}{dx_{t-1}} < 0. \\ K_t & \text{otherwise.} \end{cases}
$$

Seu desafio é decidir o parâmetro de tamanho do passo $\theta^{step}$ e o parâmetro de suavização $\eta$ formulando esse problema como um problema de decisão sequencial. Suponha que você tenha acesso a um simulador para avaliar o desempenho da regra de tamanho de passo.

Vamos começar encontrando a solução ótima assumindo que conhecemos a distribuição de $M_{t+1}$:
  <ol type="a">
    <li>O que é $\frac{dC(x_t,M_{t+1})}{dx_t}$? Lembre-se de que isso é calculado após $M_{t+1}$ se tornar conhecido.</li>
    <li>Encontre a solução estática ótima igualando a derivada (da parte (a)) a zero e depois resolvendo para $x^\ast $. Suponha que a função de distribuição cumulativa $F^M(m) = Prob(M_{t+1} \leq m)$ seja conhecida.</li>
  </ol>

Agora vamos modelar o problema de aprendizado sequencial, em que não assumiremos que a distribuição de $M_{t+1}$ é conhecida:
  <ol type="a" start="3">
    <li>Qual é a variável de estado para esse sistema dinâmico?</li>
    <li>Qual é(são) a(s) variável(is) de decisão?</li>
    <li>Qual é a informação exógena?</li>
    <li>Qual é a função de transição? Lembre-se de que você precisa de uma equação para cada elemento da variável de estado.</li>
    <li>Qual é a função objetivo? O que você está otimizando?</li>
  </ol>
</li>
<li>Vamos assumir que o preço pelo qual vendemos nosso gás muda de mês para mês. A função de lucro mensal seria dada por

$$
F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t,
$$

onde $D_{t+1}$ é a demanda por eletricidade (em megawatts-hora) para o mês $t + 1$.

Suponha, por simplicidade, que o processo de preço evolua da seguinte forma:

$$
p_{t+1} = \begin{cases} p_t - 1 & \text{with probability 0.2,} \\ p_t & \text{with probability 0.6,} \\ p_t + 1 & \text{with probability 0.1.} \end{cases}
$$

  <ol type="a">
    <li>Reescreva os cinco elementos do modelo que você forneceu originalmente no exercício 15, parte (a). Note que, em vez de procurar $x_t$, você agora está procurando $x_t(p_t)$. Isso significa que, em vez de procurar um escalar, agora estamos procurando uma função.</li>
    <li>Vamos começar representando $x_t(p_t)$ como uma função de tabela de consulta, o que significa que vamos discretizar $p_t$ em um conjunto de preços discretos $(0, 1, 2, \ldots, 50)$. Sem fazer nenhuma programação, descreva as etapas do método que você usaria para estimar a função $x_t(p_t)$ (sua descrição precisa ser cuidadosa o suficiente para que alguém pudesse escrever código a partir dela). Compare a complexidade desse problema com a do modelo básico.</li>
    <li>Repita (b), mas em vez de uma tabela de consulta para $x_t(p_t)$, aproxime a forma funcional da política usando

    $$
    x_t(p_t\vert \theta) = \theta_0 + \theta_1 p_t + \theta_2 \ln{p_t} + \theta_3 \exp{\{\theta_4 p_t\}}.
    $$

    Novamente, descreva as etapas de um algoritmo adaptativo para encontrar $\theta$.</li>
  </ol>
</li>
</ol>

**Questões de programação**

Esses exercícios usam o módulo Python *AdaptiveMarketPlanning*, disponível em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 14;">
<li>Uma grande empresa de gases industriais, que converte ar em oxigênio e nitrogênio liquefeitos, precisa assinar contratos de gás natural para a produção de eletricidade. Os contratos fornecem uma quantidade de gás para o mês seguinte, assinada com um mês de antecedência. Seja $W_{t+1}$ a demanda por eletricidade (em megawatts-hora) para o mês $t+1$, e seja $x_t$ a quantidade de gás, decidida no início do mês $t$, a ser comprada no mês $t + 1$ (poderíamos ter indexado isso como $x_{t,t+1}$).

Suponha que compremos gás (normalmente medido em unidades de milhões de btus) a um preço de ＄20 por mwh equivalente, e o vendamos a um preço de ＄26 por mwh equivalente (mais adiante vamos introduzir incerteza nesses preços).

Por simplicidade, vamos assumir que as variáveis aleatórias $W_1,W_2, \ldots, W_t,$ são estacionárias, o que significa que todas têm a mesma distribuição, mas a distribuição é desconhecida. Seus lucros para o mês $t$ são dados por

$$
F_t(x_t,W_{t+1}) = p \min\{x_t,W_{t+1}\} - cx_t.
$$

Suponha ainda que você vai usar um algoritmo de gradiente estocástico para encontrar as quantidades de pedido $x_t$, dado por

$$
x_{t+1} = x_t + \alpha_t \nabla F_t(x_t,W_{t+1}).
$$

Por fim, suponha que o tamanho do passo seja dado por

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + N_t - 1},
$$

onde $N_t$ conta o número de vezes que o gradiente mudou de sinal. Escrevemos a equação de atualização para $N_t$ usando

$$
N_{t+1} = \begin{cases} N_t + 1 & \text{if } \nabla F_{t-1}(x_{t-1},W_t)\nabla F_t(x_t,W_{t+1}) < 0, \\ N_t & \text{otherwise.} \end{cases}
$$

  <ol type="a">
    <li>Escreva os cinco elementos do modelo para este problema. Para a função objetivo, você quer encontrar a melhor política (isso será um algoritmo) para maximizar o lucro total com a compra e venda de gás natural ao longo de um horizonte de $T = 24$ meses. Note que a busca sobre políticas se refere a encontrar o melhor valor de $\theta^{step}$.</li>
    <li>Use o pacote Python <em>AdaptiveMarketPlanning</em> em <a href="https://tinyurl.com/sdagithub/">tinyurl.com/sdagithub</a> para avaliar $\theta^{step} = (2,5,10,20,50)$ para o modelo da parte (a).</li>
    <li>Como sua função objetivo mudaria se você fosse otimizar a recompensa terminal em vez da recompensa acumulada? Certifique-se de escrever a expectativa em sua forma aninhada (ou seja, usando notação como $\E_W$ se você estiver tomando uma expectativa sobre $W$).</li>
    <li>Repita a busca pelo melhor $\theta^{step}$ (usando os mesmos valores), mas agora usando a formulação de recompensa final que você apresentou na parte (c).</li>
    <li>Agora suponha que sua função objetivo seja dada por

    $$
    F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t.
    $$

    onde agora assumimos que precisamos assinar nosso contrato para uma quantidade $x_t$ sem saber o preço que receberemos pela eletricidade que vendemos ao mercado. Em vez disso, o preço $p_{t+1}$ é revelado durante o mês $t + 1$. Como essa mudança afetaria seu modelo e sua estratégia de solução?</li>
  </ol>
</li>
</ol>
{% endraw %}
