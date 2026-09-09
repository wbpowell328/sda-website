---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 2: Um problema de venda de ativo"
permalink: /sdam/pt-BR/chapter-2/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 0243c062a31cf107
---


{% raw %}
## Visão geral do capítulo

O problema de venda de ativos é o mais simples dos nossos problemas de decisão sequencial, consistindo puramente em um processo estocástico de preços em que precisamos tomar uma decisão sobre quando vender um ativo que estamos mantendo. O problema consiste em determinar quando vender o ativo de modo a maximizar o preço esperado que recebemos.

Este problema é amplamente conhecido como um *problema de parada ótima*, que normalmente é expresso usando matemática bastante sofisticada. Nós o usamos para ilustrar algumas políticas básicas que se encaixam na primeira das nossas quatro classes, as aproximações de função de política (PFAs). Introduzimos várias PFAs, cada uma exigindo parâmetros de ajuste para obter os melhores resultados.

Este exercício serve como uma ilustração simples e elegante de todos os cinco elementos do framework de modelagem universal.

## Narrativa

Estamos mantendo um lote de ações, buscando um momento oportuno para vender. Começamos assumindo que somos um pequeno investidor, o que significa que não importa quantas ações vendamos, então vamos assumir que temos apenas uma ação. Se vendermos no tempo $t$, recebemos um preço que varia de acordo com algum processo aleatório ao longo do tempo, embora não acreditemos que os preços estejam em tendência de alta ou de baixa. Uma vez que vendemos a ação, o processo termina.

## Formulando o problema

As respostas às nossas três questões de formulação são:

- **Métricas:** Maximizar o preço esperado que recebemos ao vender o ativo.
- **Decisões:** Manter ou vender o ativo.
- **Incertezas:** O preço de venda em períodos de tempo futuros.

## Modelo básico

### Variáveis de estado

Nosso processo possui duas variáveis de estado: o "estado físico", que capta se ainda estamos ou não mantendo o ativo, e um "estado informacional", que para este problema é o preço da ação.

Nosso "estado físico" é dado por

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

Se vendermos a ação, recebemos o preço por ação de $p_t$. Isso significa que nossa variável de estado é

$$
S_t = (R^{asset}_t, p_t).
$$

### Variáveis de decisão

A variável de decisão é se devemos manter ou vender a ação. Escrevemos isso usando

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

Só podemos vender a ação neste problema, então temos que obedecer à restrição

$$
x_t \leq R^{asset}_t.
$$

Vamos definir nossa política $X^\pi(S_t)$, que vai definir como tomamos decisões. Neste momento, introduzimos a notação para a política, mas adiamos o projeto da política para mais tarde. É isso que queremos dizer quando falamos que "modelamos primeiro, depois resolvemos".

### Informação exógena

O único processo aleatório em nosso modelo básico é a mudança no preço. Há duas formas de escrever isso. Uma é assumir que a informação exógena é a mudança no preço. Podemos escrever isso como

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

Isso significa que nosso processo de preços está evoluindo de acordo com

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

Poderíamos então escrever nossa informação exógena $W_{t+1}$ como

$$
W_{t+1} = \phat_{t+1}.
$$

A segunda forma é assumir que simplesmente observamos o próximo preço, caso em que escreveríamos

$$
W_{t+1} = p_{t+1}.
$$

### Função de transição

A função de transição consiste nas equações que descrevem como o estado evolui ao longo do tempo. A equação de transição para $R_t$ é dada por

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

onde temos a restrição de que $x_t \leq R^{asset}\_t$ para garantir que não vendamos o ativo quando não o possuirmos mais.

Em seguida, temos que escrever como o processo de preços evolui ao longo do tempo. Se usarmos a notação $\phat_t$, a função de transição para o preço $p_t$ seria dada por

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

As equações $\eqref{eq:assetsellingR}$ e $\eqref{eq:assetsellingP}$ compõem o que chamamos de nossa *função de transição*, que escrevemos como

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

Se usarmos nossa política $X^\pi(S_t)$ para tomar decisões, e se escolhermos o caminho amostral $\omega$ que determina a sequência $W_1, W_2, \ldots, W_T$, então podemos escrever uma simulação do nosso processo como

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

Observe que, ao escrevermos a sequência, indexamos as variáveis pelo seu conteúdo informacional. Por exemplo, $S_0$ é um estado inicial, e $x_0$ depende apenas de $S_0$. Por outro lado, qualquer variável indexada por $t$ tem permissão para "ver" quaisquer dos resultados do nosso processo exógeno $W_1, \ldots, W_t$, mas não tem permissão para ver $W_{t+1}$.

### Função objetivo

Encerramos nosso modelo com uma declaração da nossa função objetivo, que se torna então a base para a avaliação de políticas. Para começar, precisamos ter alguma métrica de desempenho, que para este problema seria quanto ganhamos ao vender nossa ação. Podemos definir uma função de contribuição genérica que escrevemos como $C(S_t,x_t)$, que seria dada por

$$
C(S_t,x_t) = p_tx_t.
$$

Em nosso problema, $x_t =0$ até que escolhamos vender. Por ora, assuma que estamos vendendo um único ativo discreto (poderíamos pensar nisso como vender todas as nossas ações de uma só vez). Neste caso, quando vendermos, faríamos $x_t = 1$, o que vai acontecer apenas uma vez ao longo do nosso horizonte. Escrevemos a dependência de $C(S_t,x_t)$ para captar a dependência do estado, o que se deve à presença do preço $p_t$.

Agora queremos formular nosso problema de otimização. Se os preços nos fossem dados com antecedência, escreveríamos

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

onde imporíamos as restrições

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

Isso é adequado quando o problema é determinístico, mas como modelamos o problema para lidar com a incerteza nos preços? O que fazemos é imaginar que estamos simulando uma política seguindo um caminho amostral $\omega$ de preços $p_1(\omega), p_2(\omega), \ldots$. Usando uma política $\pi$, geraríamos então uma série de estados usando

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

Escrevemos $S_t(\omega)$ para expressar a dependência do caminho amostral. Também poderíamos ter escrito $S^\pi_t(\omega)$ para expressar a dependência da política $\pi$, mas tendemos a suprimir a dependência da política por simplicidade.

Se seguirmos a política $\pi$ ao longo deste caminho amostral, podemos calcular o desempenho usando

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

Isso é para um caminho amostral. Observe que obtemos um conjunto de decisões $x_t(\omega)$ para cada caminho amostral a partir da política $x_t(\omega) = X^\pi(S_t(\omega))$. Esta notação comunica que $x_t$ é uma variável aleatória que depende do caminho amostral $\omega$. Para cada caminho amostral, ainda obtemos $\sum_{t=0}^{T-1} x_t(\omega) =1$, o que espelha nossa restrição acima para a versão determinística do problema. Há um tempo $\tau(\omega)$, que é o tempo em que $x_t(\omega)=1$ para $t=\tau(\omega)$. Este tempo é conhecido como um *tempo de parada* para este problema de venda de ativos.

Podemos simular sobre uma amostra de $N$ amostras $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ e tirar uma média usando

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

Finalmente, escrevemos o problema de otimização em termos de encontrar a melhor política, o que podemos escrever

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

Veremos que o problema de otimização declarado por $\eqref{eq:maxpifbarasset}$, no qual gostaríamos de encontrar a política ótima, é primariamente aspiracional. Embora certamente gostaríamos da política ótima, tipicamente nos contentaremos com a melhor política que conseguirmos encontrar (e conseguirmos calcular).

Na prática, tipicamente usamos médias, como na equação $\eqref{eq:assetsellingfbarpi}$, para nosso problema de otimização. No entanto, isso é apenas uma aproximação de calcular uma expectativa real, que escreveremos como

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

Por convenção, quando escrevemos a expectativa, eliminamos a indexação em $\omega$ e, em vez disso, vemos $\Fhat^\pi$ como uma variável aleatória, enquanto $\Fhat^\pi(\omega)$ é tratado como uma realização amostral (esta é uma notação padrão na comunidade de modelagem estocástica, então apenas se acostume com ela).

Usando nosso operador de expectativa, escreveríamos nossa função objetivo como

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

Frequentemente, vamos escrever nossa função objetivo como

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

A forma na equação $\eqref{eq:assetsellingobjective}$ (ou $\eqref{eq:assetsellingfpiexpectation}$ ou $\eqref{eq:assetsellingexpectedsum}$) é agradável e compacta. Você só precisa se lembrar de que quase nunca é o caso de conseguirmos de fato calcular a expectativa, então geralmente dependemos de executar simulações e tirar uma média, como fazemos na equação $\eqref{eq:assetsellingfbarpi}$.

Agora nos resta o problema de buscar entre políticas. Sempre vamos criar nosso modelo primeiro, e depois nos voltar para o problema de projetar políticas. Antes de fazer isso, temos que pensar em como vamos modelar quaisquer incertezas em $S_0$ e o processo de informação exógena $W_1, \ldots, W_T$.

## Modelando a incerteza

Vamos precisar de alguma forma de amostrar observações de $W_t$, o que, para este problema, significa modelar a evolução dos preços $p_t$ ao longo do tempo. Uma forma é extrair amostras do histórico. Imagine que estamos interessados em executar nossa simulação ao longo de um período de um ano. Podemos usar o histórico do ano anterior, mas isso é apenas um caminho amostral.

A segunda estratégia, que usaremos frequentemente, é estimar um modelo estatístico. Para nosso modelo básico, poderíamos assumir

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

onde $\phat_{t+1}$ é descrito por alguma distribuição de probabilidade. Um modelo simples seria assumir que $\phat_{t+1}$ tem distribuição normal com média 0 e variância $\sigma^2$. Também poderíamos começar assumindo que as mudanças nos preços $\phat_t$ e $\phat_{t+1}$ são independentes, e que $\phat_{t+1}$ é independente do preço atual $p_t$ (essa última suposição é um tanto forte, mas nos ajudará a começar).

A maioria das linguagens de computador possui funções para simular observações de uma distribuição normal. Por exemplo, o Excel fornece a função `Norm.inv`$(p,\mu,\sigma)$, que retorna o valor $w$ de uma variável aleatória $W$ com média $\mu$ e desvio padrão $\sigma$, onde $P[W \leq w] = p$. Um truque padrão é definir $p=Rand()$, onde $Rand()$ é uma função do Excel que retorna uma variável aleatória distribuída uniformemente entre $0$ e $1$. Podemos então escrever

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

o que nos dará uma observação aleatória de $\phat_{t+1}$ que tem distribuição normal com média $0$ e desvio padrão $\sigma$.

A Tabela 2.1 ilustra dez observações de variáveis aleatórias $U$ que são distribuídas uniformemente entre 0 e 1, e as amostras correspondentes de mudanças de preço com distribuição normal $\phat$ com média 0 e variância 1.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>$U$</th><th>$\phat$</th></tr></thead>
<tbody>
<tr><td>0.8287</td><td>0.9491</td></tr>
<tr><td>0.6257</td><td>0.3206</td></tr>
<tr><td>0.9343</td><td>1.5086</td></tr>
<tr><td>0.4879</td><td>-0.0303</td></tr>
<tr><td>0.3736</td><td>-0.3223</td></tr>
<tr><td>0.8145</td><td>0.8947</td></tr>
<tr><td>0.0385</td><td>-1.7685</td></tr>
<tr><td>0.0089</td><td>-2.3698</td></tr>
<tr><td>0.9430</td><td>1.5808</td></tr>
<tr><td>0.3693</td><td>-0.3336</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 2.1.</span> Dez variáveis aleatórias uniformes $U$, e dez amostras correspondentes de mudanças de preço com distribuição normal $\phat$ com média 0 e variância 1.</p>
</div>

A equação $\eqref{eq:assetsellingpricemodel1}$ é um modelo de preços bastante básico, mas ajudará a ilustrar nosso framework de modelagem. Abaixo, vamos introduzir algumas extensões que incluem um modelo mais rico.

## Projetando políticas

Podemos vislumbrar diversas políticas diferentes para este problema. Por exemplo, uma política simples poderia ser vender se o preço cair abaixo de um ponto limite que consideramos sugerir que ele está iniciando um grande declínio. Assim, poderíamos escrever esta política como

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

Outra política poderia ser uma política de venda "alto-baixo", em que queremos vender se o preço subir demais ou cair demais. Seja $\theta^{high-low} = (\theta^{low}, \theta^{high})$. Isso poderia ser escrito

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

Uma possível objeção a esta política poderia ser que ela vende prematuramente uma ação em ascensão. Talvez queiramos apenas vender quando a ação subir acima de um sinal de acompanhamento. Para lidar com essa questão, primeiro criamos uma estimativa suavizada do preço usando

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Agora considere uma política de acompanhamento que poderíamos escrever como

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

Em todos os casos, só podemos vender o ativo (ou seja, $X^{track}(S_t\vert \theta^{track}) =1$) se ainda estivermos mantendo o ativo (o que significa $R^{asset}\_t = 1$).

Para essa política, vamos precisar ajustar nosso modelo, pois agora precisamos de $\pbar_t$ para tomar uma decisão. Isso significa que escreveríamos agora nosso estado como

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

Podemos escrever nossas classes de políticas como o conjunto $\Fcal = \lbrace $"venda-baixa", "alto-baixo", "acompanhamento"$\rbrace $. Para cada uma dessas classes, temos um conjunto de parâmetros que podemos escrever como $\theta^f$ para $f\in\Fcal$. Para as políticas "venda-baixa" e "acompanhamento" há um único parâmetro, enquanto $\theta^{high-low}$ tem dois parâmetros.

Agora podemos escrever nossa busca sobre políticas $\pi$ de uma forma mais prática, como buscar sobre classes de funções $f\in\Fcal$, e então buscar sobre parâmetros $\theta^f \in \Theta^f$, onde $\Theta^f$ nos diz a faixa de valores possíveis (capturando ao mesmo tempo a dimensionalidade de $\theta^f$).

A forma como projetamos as políticas nesta seção pode parecer um tanto improvisada, mas é exatamente assim que muitas políticas são projetadas (incluindo estratégias de compra e venda usadas por grandes fundos de hedge). Muitos tipos de políticas são possíveis, algumas das quais terão desempenho melhor do que outras; focamos nestas como exemplos ilustrativos. Há uma arte em projetar políticas que é paralela à arte de projetar modelos estatísticos para estimação.

## Avaliação de política

Indicamos acima que podemos avaliar uma política simulando-a usando

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

onde $\omega$ é usado para representar uma amostra de caminho de realizações de quaisquer variáveis aleatórias exógenas usadas no modelo. A Tabela 2.2 ilustra uma série de amostras de caminhos de preços. Por exemplo, imagine que estamos usando a política "vender-baixo" com $\theta^{sell-low} = \Doll 42$. Agora considere testá-la na amostra de caminho $\omega^5$. O resultado seria

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

já que $\Doll 41.53$ é o primeiro preço que cai abaixo de $\Doll 42$. Se nenhum dos preços cair abaixo do nosso ponto de venda, então todas as nossas políticas são projetadas para vender no final.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>42.67</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>46.35</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>43.17</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.24</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>47.68</td><td>46.32</td><td>46.14</td><td>41.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>47.83</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.11</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>46.78</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>43.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>43.16</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>46.57</td><td>45.01</td><td>46.73</td><td>42.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 2.2.</span> Ilustração de um conjunto de caminhos de preços.</p>
</div>

Podemos então avaliar cada política (tanto a classe de política, quanto os parâmetros para essa classe) fazendo simulações repetidas e calculando uma média. Escrevemos isso como

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

Às vezes precisamos expressar um intervalo de confiança, já que $\Fbar^\pi$ nada mais é do que uma estimativa estatística. Primeiro calcularíamos uma estimativa da variância da nossa variável aleatória $\Fhat^\pi$, o que fazemos usando

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

Em seguida, obtemos nossa estimativa da variância da nossa média $\Fbar^\pi$ usando

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

A partir disso, podemos construir um intervalo de confiança para comparar duas políticas que poderíamos chamar de $\pi^A$ e $\pi^B$. Seja $\mu^\pi$ o verdadeiro desempenho da política $\pi$, onde $\Fbar^\pi$ é nossa estimativa estatística de $\mu^\pi$. Gostaríamos de obter um intervalo de confiança para a diferença $\mu^{\pi^A} - \mu^{\pi^B}$. Nossa melhor estimativa dessa diferença é $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$. A variância dessa diferença é

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

onde assumimos que as estimativas $\Fbar^{\pi^A}$ e $\Fbar^{\pi^B}$ são independentes, o que significa que cada política está sendo testada em uma amostra aleatória diferente de preços. Quando esse é o caso, calcularíamos nosso intervalo de confiança usando

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

onde $z_\alpha$ é o valor de $z$ tal que uma variável aleatória normalmente distribuída $Z$ é maior que $z$ com probabilidade $\alpha$. Por exemplo, $z_{.05} = 1.645$, o que significa $Prob[Z \geq 1.645] = .05$.

Uma abordagem melhor é usar as mesmas amostras para avaliar cada política. Por exemplo, poderíamos testar cada política na mesma amostra de caminho $\omega$ escolhida da Tabela 2.2. Testando nossas políticas dessa forma, obteríamos $\Fhat^{\pi^A}(\omega)$ e $\Fhat^{\pi^B}(\omega)$ (usando o mesmo conjunto de preços $p_t(\omega)$), e então calcularíamos a diferença

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

Agora calculamos a diferença média

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

e a variância

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

Observe que a variância $(\delta \sigmabar^{A-B})^2$ será menor do que a variância quando amostras independentes são usadas. O intervalo de confiança para a diferença seria então

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

Calcular intervalos de confiança pode ser útil ao comparar diferentes classes de políticas. Alternativamente, podemos estar comparando o desempenho de dois projetos físicos (por exemplo, a velocidade de duas máquinas ou os locais de uma instalação). A escolha de política é bastante paralela a qualquer decisão de projeto para um sistema.

## Extensões

### Processos de preços em séries temporais

Imagine que queremos um processo de preços um pouco mais realista que capture a autocorrelação ao longo do tempo. Poderíamos propor que

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

onde ainda assumimos que o ruído aleatório $\varepsilon_t$ é independente (e identicamente distribuído) ao longo do tempo. Também vamos assumir, por ora, que conhecemos os coeficientes $\eta = (\eta_0, \eta_1, \eta_2)$.

Este modelo de preços requer uma mudança sutil em nosso modelo, especificamente na variável de estado. Vamos substituir nossa antiga equação de transição para preços, $\eqref{eq:assetsellingP}$, pelo nosso novo modelo de série temporal dado em $\eqref{eq:assetsellingpricetimeseries}$. Para calcular $p_{t+1}$, não é mais suficiente conhecer $p_t$; agora também precisamos conhecer $p_{t-1}$ e $p_{t-2}$. Nossa variável de estado agora seria dada por

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Para as políticas que consideramos acima, isso não complica muito nosso modelo. Mais adiante, vamos introduzir políticas em que as variáveis adicionais representam uma complicação importante.

### Processo de preços em série temporal com aprendizado

Agora assuma que nosso processo de preços em série temporal é dado por

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

onde $\varepsilon \sim N(0, 4^2)$ e onde $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ é nossa *estimativa* de $\eta$ dado o que sabemos no tempo $t$ (na seção anterior, assumimos que $\theta$ era conhecido).

Existem fórmulas simples que governam a atualização de $\etabar_t$ para $\etabar_{t+1}$ dadas nossas estimativas $\etabar_t$ e a observação do próximo preço $p_{t+1}$.

Primeiro, deixamos

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

ser nossa estimativa de $p_{t+1}$ dado o que sabemos no tempo $t$. O erro nesta estimativa é dado por

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

Agora deixe o vetor $\phi_t$ ser o vetor de variáveis explicativas em nosso processo de preços, dado por

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

A seguir, definimos a matriz $2 \times 2$ $M_t$, que é atualizada recursivamente usando

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

onde $\gamma_t$ é um escalar calculado usando

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

Agora podemos atualizar $\etabar_t$ usando

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

O Exercício 6 aprofundará essas equações.

### Cesta de ativos

Outra reviravolta surge quando estamos considerando uma cesta de ativos. Seja $p_{ti}$ o preço do ativo $i$. Assuma, por ora, que cada preço evolui de acordo com o processo básico

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

Poderíamos assumir que os termos de ruído $\varepsilon_{t+1,i}$ são independentes entre os ativos $i\in\Ical$, mas um modelo mais realista seria assumir que os preços de diferentes ativos são correlacionados. Seja $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ a covariância dos preços aleatórios $p_{t+1,i}$ e $p_{t+1,j}$ para os ativos $i$ e $j$ dado o que sabemos no tempo $t$. Assuma, por ora, que conhecemos a matriz de covariância $\Sigma$, talvez usando um conjunto de dados históricos para estimá-la (mas mantendo-a fixa uma vez estimada).

Podemos usar a matriz de covariância para gerar realizações amostrais de preços correlacionados usando uma técnica chamada decomposição de Cholesky. Ela procede criando o que chamamos de "raiz quadrada" da matriz de covariância $\Sigma$, que armazenamos em uma matriz triangular inferior $L$. Em python, usando o pacote NumPy, usaríamos o comando python

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

A matriz $L$ nos permite obter a matriz $\Sigma$ usando $\Sigma = L^T L$.

Agora seja $Z$ um vetor de variáveis aleatórias, uma para cada ativo, onde $Z_i \sim N(0,1)$ (praticamente toda linguagem de programação tem rotinas para criar amostras aleatórias de distribuições normais com média 0, variância 1). Sejam $p_t$, $p_{t+1}$ e $Z$ vetores coluna (dimensionados pelo número de ativos). Primeiro criamos uma amostra $\hat Z$ amostrando de $N(0,1)$ $\vert \Ical\vert $ vezes. Nossa amostra de preços $p_{t+1}$ é então dada por

$$
p_{t+1} = p_t + L \hat{Z}.
$$

Para este problema, nossa variável de estado é dada por $S_t = (R_t,p_t)$, onde $R_t = (R_{ti})\_{i\in\Ical}$ captura quantas ações de cada ativo possuímos, enquanto $p_t$ é nosso vetor atual de preços. A matriz de covariância $\Sigma$ não está na variável de estado porque assumimos que ela é estática (o que significa que a colocamos em $S_0$). A resposta muda se atualizássemos a matriz de covariância a cada nova observação, caso em que escreveríamos a matriz de covariância como $\Sigma_t$ para capturar sua dependência do tempo. Como agora ela varia dinamicamente, a variável de estado seria $S_t = (R_t, p_t, \Sigma_t)$.

## O que aprendemos?

Usamos este problema para ilustrar diferentes tipos de políticas PFA:

- Usamos um problema simples de venda de ativos para ilustrar um problema de decisão sequencial com tanto um estado físico (se estamos mantendo um ativo, ou quanto), quanto o preço pelo qual poderíamos vendê-lo no tempo $t$.
- Mostramos como modelar a incerteza e introduzir a noção de uma amostra de caminho $\omega$ para o processo de informação exógena $W_1, \ldots, W_T$.
- Ilustramos várias políticas simples na classe PFA.
- Mostramos como simular uma política.
- Introduzimos alguma complexidade no processo de preços (onde o preço $p_{t+1}$ depende do histórico recente de preços), e a situação em que o preço de venda depende de uma cesta de ativos, que é um processo de informação mais complexo e multidimensional. Observe que isso não introduz nenhuma complexidade significativa além da modelagem do processo. Isso cria uma variável de estado de dimensão muito maior, mas isso não representa uma forma significativa de complexidade para o problema de projetar ou avaliar políticas (isso não é verdade para todas as classes de políticas).
- Mostramos como atualizar um modelo linear do processo de preços.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Escrevemos a função de transição como $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.
  <ol type="a">
    <li>Por que escrevemos a informação exógena como $W_{t+1}$ em vez de $W_t$?</li>
    <li>Em que ponto no tempo estaríamos calculando $S_{t+1}$ usando esta equação?</li>
  </ol>
</li>
<li>Qual é a diferença entre $p_t$ e $p_t(\omega)$?</li>
<li>Ao testar diferentes políticas, a estrutura da função de transição muda?</li>
<li>A função objetivo na equação $\eqref{eq:deterministicobjassetselling}$ é escrita para uma versão determinística do problema. Se resolvermos este problema de otimização, a decisão $x_t$ no tempo $t$ depende dos preços $p_{t'}$ para $t' > t$?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Usando os preços na Tabela 2.2, use a política de que você venderá quando o preço cair abaixo de ＄44.00. Calcule a função objetivo $\Fhat(\omega^n)$ para $n=1,\ldots, 10$. Calcule o preço médio de venda e sua variância.</li>
<li>As questões abaixo o guiarão pelos passos de modelagem da venda de um ativo (digamos, uma única ação de uma empresa).
  <ol type="a">
    <li>Assuma que você está simulando seus preços usando dados de um modelo matemático dado por $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$, onde $\varepsilon \sim N(0, 6^2)$.

    Não sabemos o valor de $\eta = (\eta_0, \eta_1)$, mas nossa crença sobre o verdadeiro valor de $\eta$ é que ele é multivariado normal, com $\eta \sim MVN({\bar \eta}, \Sigma)$ onde

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    Assuma que a matriz de covariância $\Sigma_t$ é dada por

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    onde $\Sigma_{tij} = Cov(\eta_i,\eta_j)$ para $i,j \in (0,1)$. Assuma que no tempo $t$, $p_t = 20$, $p_{t-1} = 24$ e observamos $p_{t+1} = 18.2$.

Usando as equações da seção sobre o processo de preços em série temporal com aprendizado, quais são as estimativas atualizadas de $\etabar_{t+1}$ e $\Sigma_{t+1}$? Forneça a equação de atualização e calcule $\etabar_{t+1}$ e $\Sigma_{t+1}$ numericamente.</li>
    <li>Qual é a variável de estado para este problema? Forneça a lista de variáveis. Observe que talvez seja necessário adicionar variáveis à medida que você avança no exercício (você não tem todas as informações neste momento). Certifique-se de incluir todas as informações necessárias para atualizar $\etabar_{t+1}$ a partir de $\etabar_t$. Quantas dimensões tem sua variável de estado (isso é o mesmo que perguntar quantas variáveis há em $S_t$).</li>
    <li>Nosso trader toma decisões de negociação com base em uma média móvel de 7 dias dos preços. Suponha que estamos no dia $t$, e a média móvel de 7 dias é calculada usando

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    O trader venderá um ativo se $p_t < \pbar_t - \theta^{sell}$. Escreva a regra de decisão como uma política $X^\pi(S_t\vert \theta^{sell})$ que retorna 1 se vendermos o ativo e 0 caso contrário.</li>
    <li>Qual é a informação exógena?</li>
    <li>Escreva as equações de transição. Você precisa de uma equação para cada elemento de $S_t$.</li>
    <li>Escreva a função objetivo (e lembre-se de usar um operador de esperança para cada variável aleatória, conforme descrito nas instruções). Certifique-se de especificar o que você está otimizando dado a classe de política especificada na parte (c). Suponha que você esteja treinando sua política em dados históricos em um cenário offline.</li>
  </ol>
</li>
<li>Você precisa executar uma simulação de preços de eletricidade, que são notoriamente de cauda pesada. Você coleta os dados mostrados na tabela abaixo.

<div class="book-table-wrap">
<table class="book-table is-narrow">
<thead><tr><th>Tempo</th><th>Preço</th></tr></thead>
<tbody>
<tr><td>1</td><td>20</td></tr>
<tr><td>2</td><td>32</td></tr>
<tr><td>3</td><td>26</td></tr>
<tr><td>4</td><td>180</td></tr>
<tr><td>5</td><td>30</td></tr>
<tr><td>6</td><td>45</td></tr>
<tr><td>7</td><td>18</td></tr>
<tr><td>8</td><td>120</td></tr>
<tr><td>9</td><td>57</td></tr>
<tr><td>10</td><td>15</td></tr>
</tbody>
</table>
</div>

  <ol type="a">
    <li>Use os dados da tabela para produzir uma função de distribuição cumulativa. Você precisará plotar a fdc, que se parece com uma função escada com cinco degraus.</li>
    <li>Agora você observa três realizações de preços: 25, 18, 160. Use a função de distribuição cumulativa da parte (a) para criar três realizações de uma variável aleatória uniformemente distribuída entre 0 e 1 (chame essa variável aleatória de $U$).</li>
    <li>Agora use essas observações de $U$ para criar três observações de uma variável aleatória $Z$ que é normalmente distribuída com média 0 e variância 1. Certifique-se de que seu método para gerar essas variáveis aleatórias esteja claro. [Dica: use a distribuição cumulativa de uma variável aleatória normal (0,1) da mesma forma que você usou a fdc que criou na parte (a) para criar variáveis aleatórias uniformes na parte (b).]</li>
    <li>Suponha que você tenha usado esse método para criar uma sequência de variáveis aleatórias normais (0,1) para ajustar um modelo linear da forma $Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$, onde $\varepsilon_{t+1}$ é normalmente distribuído com média 0 e variância 1 (sabemos disso porque estamos simulando variáveis aleatórias normais (0,1)). Começando com $t=1$ e $Z_0 = 0.5$ e $Z_1 = -0.3$, gere $Z_2, Z_3, Z_4$ assumindo que $\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$. Em seguida, use sua distribuição cumulativa da parte (a) para gerar observações de $P_2, P_3$ e $P_4$.</li>
  </ol>
</li>
</ol>

**Questões de programação**

Esses exercícios usam o módulo Python *AssetSelling*, disponível em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Nossa política básica de venda "high-low" foi dada por

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Além do módulo *AssetSelling*, você também precisará baixar a planilha "Chapter2_asset_selling_policy" em [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements), que fornece os parâmetros a serem usados pelo módulo python.
  <ol type="a">
    <li>Simule a política por 200 períodos de tempo usando os parâmetros:

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>Realize uma busca pelo melhor valor de $\theta^{min}$ e $\theta^{max}$ fixando $\theta^{max} = 13$ e, em seguida, buscando em incrementos de 1 pelo melhor $\theta^{min}$. Depois, fixe naquele valor de $\theta^{min}$ e realize uma busca semelhante para $\theta^{max}$ (imponha a restrição de que $\theta^{max} = \theta^{min}+2$).</li>
  </ol>
</li>
<li>Considere uma política que entende que o preço do ativo pode estar subindo, o que significa que limites estáticos de compra-venda podem não ser eficazes. Suponha que preveremos o preço para o tempo $t+1$ usando o modelo de série temporal ajustado

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

Vamos usar $\pbar_t$ como uma previsão de $p_{t+1}$ dado o que sabemos no tempo $t$.
  <ol type="a">
    <li>Qual é a variável de estado para este problema? Se os preços forem discretizados para o décimo mais próximo, e supondo que os preços variem entre 0 e 100, qual é o tamanho do espaço de estados?</li>
    <li>Suponha que introduzamos a política

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    Nesta versão da política, estamos procurando desvios repentinos em relação ao preço esperado. Plote o gráfico da função objetivo (contribuição) versus $\theta$. Comente seu gráfico. Observe que, embora o espaço de estados seja bastante grande, não há mudança na complexidade de encontrar a melhor política nessa classe.

    (Dica: você precisaria mudar a variável de estado, mudar a política high-low e criar um laço externo sobre diferentes valores de $\theta$ no módulo *DriverScript*. Você é encorajado a experimentar seu código e escolher seus próprios intervalos de valores. Inclua quanto tempo levou para executar seu código com a escolha de valores.)</li>
  </ol>
</li>
<li>(Continuando do exercício 9) Imagine que nossa ação segue um padrão sazonal, sugerindo que nossos sinais de compra-venda devem depender do tempo. Isso significa que precisamos substituir $\theta$ por $\theta_t$. Discuta como isso complicaria nosso processo de busca de políticas.</li>
<li>(Continuando do exercício 9) Podemos, em seguida, considerar que nosso sinal de compra-venda deveria depender do preço. Por exemplo, se os preços forem mais altos, podemos achar que procuramos um desvio maior em relação a $\pbar_t$ na equação $\eqref{eq:assetsellingpolicytimeseries}$ do que se os preços fossem menores. Isso significa que substituiríamos o vetor constante $\theta$ por uma função $\theta(\pbar_t)$.
  <ol type="a">
    <li>Descreva uma representação em tabela de consulta (lookup table) de $\theta(\pbar_t)$, e desenhe um gráfico retratando como você acha que essa função poderia parecer. Isso exigiria discretizar $\pbar_t$ em, digamos, 10 faixas. Como isso complica o problema de busca por políticas?</li>
    <li>Sugira uma forma paramétrica para $\theta(\pbar_t)$ que capture sua intuição de que $\theta$ deveria ser maior se $\pbar_t$ for maior? Quais parâmetros você agora precisa buscar?</li>
  </ol>
</li>
</ol>
{% endraw %}
