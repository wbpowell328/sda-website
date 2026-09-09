---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 12: Otimização de cliques em anúncios"
permalink: /sdam/pt-BR/chapter-12/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 4ae8bcde1a247d20
---


{% raw %}
## Visão geral do capítulo

Este capítulo aborda o problema de otimizar a política de definição de lances para maximizar retornos em plataformas de e-commerce como Google e Facebook. Essas plataformas executam leilões sofisticados para garantir que estão recebendo o valor de mercado integral pelos anúncios que exibem. A modelagem do problema, e o design das políticas, é complicada pela necessidade de representar três formas de incerteza: a probabilidade de vencermos o lance que fazemos em um anúncio, o resultado de vencermos ou não o lance, e a receita obtida ao vencer o lance.

Exploramos três políticas. As duas primeiras são relativamente simples: uma política gulosa que escolhe o melhor lance dadas nossas estimativas atuais de todas as quantidades incertas, e uma versão aleatorizada da política gulosa que incentiva a exploração. A terceira é mais sofisticada: conhecida como "gradiente de conhecimento", ela maximiza o valor da informação obtida ao fazer um determinado lance. Isso requer encontrar uma expectativa da melhoria a partir do que aprendemos com um dado lance. O gradiente de conhecimento envolve cálculos de probabilidade relativamente sofisticados.

## Narrativa

Empresas que fazem publicidade em sites da internet como o Google precisam dar lances para colocar seus anúncios em uma posição visível (isto é, no topo da lista de anúncios patrocinados). Quando um cliente digita um termo de busca, o Google identifica todos os licitantes que listaram o mesmo termo de busca (ou similar) em sua lista de palavras-chave de anúncios. O Google então pega todas as correspondências, as ordena de acordo com quanto cada participante ofertou, e realiza um leilão. Quanto maior o lance, maior a probabilidade de seu anúncio ser posicionado perto do topo da lista de anúncios patrocinados, o que aumenta a probabilidade de um clique. A Figura 12.1 é um exemplo do que é produzido após inserir os termos de busca "hotels in baltimore md."

<figure class="book-figure">
  <img src="/assets/images/sdam/adclicksponsoredlist.png" alt="Amostra de anúncios exibidos em resposta a uma busca por palavra-chave de anúncio." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 12.1.</span> Amostra de anúncios exibidos em resposta a uma busca por palavra-chave de anúncio.</figcaption>
</figure>

Se um cliente clica no anúncio, há um retorno esperado que reflete a quantia média que um cliente gasta ao visitar o site da empresa. O problema é que não sabemos qual é a curva de resposta ao lance. A Figura 12.2 reflete uma família de possíveis curvas de resposta. Nosso desafio é testar diferentes lances para aprender qual curva é a correta.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickresponse.png" alt="Possíveis instâncias da probabilidade de um anúncio receber um clique dado o lance." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 12.2.</span> Possíveis instâncias da probabilidade de um anúncio receber um clique dado o lance.</figcaption>
</figure>

Começamos assumindo que podemos ajustar o lance após cada leilão, o que significa que aprendemos apenas uma única resposta (o cliente clicou ou não no link). É possível que o cliente tenha olhado para um link exibido e decidido não clicar nele, ou nosso lance pode ter sido tão baixo que nem sequer estávamos na lista de anúncios exibidos.

Nosso desafio é projetar uma política para definir os lances. O objetivo é maximizar a receita líquida, incluindo o que ganhamos com a venda de nossos produtos ou serviços, menos o que gastamos com cliques em anúncios.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Maximizar a receita líquida esperada com a venda de produtos anunciados na plataforma, menos o valor pago para veicular o anúncio.
- **Decisões:** Quanto dar de lance pelo anúncio.
- **Incertezas:** Se um lance é bem-sucedido, e o valor da receita recebida com um lance bem-sucedido.

## Modelo básico

Vamos assumir que usamos algum tipo de modelo parametrizado para capturar a probabilidade de que um cliente clique em um anúncio. No mínimo, essa probabilidade dependerá de quanto oferecemos pelo anúncio – quanto maior o lance, mais alto o anúncio aparecerá na lista de anúncios patrocinados, o que aumenta a probabilidade de um cliente clicar nele. Seja $K^n = 1$ se o $n$-ésimo cliente clicar no anúncio. Seja

$$
P^{click}(\theta_k,x) = Prob[K^{n+1}=1\vert \theta=\theta_k,x]
$$

onde $Prob[K^{n+1}=1\vert \theta=\theta_k,x]$ será descrito por uma função logística dada por

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,x^n, H^n] = \frac{e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}{1+e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}. \label{eq:adclicklogisticregression}
\end{align}
$$

Essa função é parametrizada por $\theta = (\theta^{const}, \theta^{bid})$. Não sabemos qual é $\theta$, mas vamos assumir que é um dentre um conjunto amostrado $\Theta = \lbrace \theta_1, \ldots,\theta_K\rbrace $.

### Variáveis de estado

O estado inicial $S^0$ inclui $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $, o conjunto de valores possíveis que $\theta$ pode assumir; e $\Rbar^0$, a estimativa inicial da receita obtida quando um cliente clica em um link.

As variáveis de estado dinâmicas $S^n$ incluem $p^n_k$, a probabilidade de que o verdadeiro $\theta = \theta_k$, com $p^n = (p^n_k)\_{k=1}^K$; e $\Rbar^n$, a estimativa da receita obtida com um clique no anúncio após $n$ leilões.

Nossa variável de estado dinâmica, então, é

$$
S^n = (\Rbar^n, p^n).
$$

Observe que podemos criar uma estimativa pontual de $\theta$ após $n$ observações usando

$$
\thetabar^n = \sum_{k=1}^K p^n_k \theta_k,
$$

mas esta é uma estatística que podemos calcular a partir da informação em $S^n$, portanto não colocamos $\thetabar^n$ na variável de estado.

### Variáveis de decisão

Nossa única variável de decisão é o lance, que definimos como $x^n$, o lance (em ＄ por clique) para o $(n+1)$-ésimo leilão. Como antes, deixamos $X^\pi(S^n)$ ser nossa política genérica que nos dá o lance $x^n$ em função da informação disponível para nós, representada por $S^n$, o que significa que escreveríamos

$$
x^n = X^\pi(S^n).
$$

Assumimos que a política impõe quaisquer restrições, como garantir que o lance não seja negativo ou muito grande.

### Informação exógena

Em nosso modelo inicial, observamos apenas os resultados de um único leilão, que modelamos usando:

$$
K^{n+1} = \begin{cases} 1 & \text{if the customer clicks on our ad,} \\ 0 & \text{otherwise.} \end{cases}
$$

e $\Rhat^{n+1}$, a receita obtida no $n+1$-ésimo leilão. Isso significa que nossa variável completa de informação exógena é

$$
W^{n+1} = (\Rhat^{n+1},K^{n+1}).
$$

### Função de transição

A função de transição para este problema parecerá muito mais complicada do que outras neste volume, porque estamos atualizando crenças sobre a incerteza no vetor de parâmetros $\theta$. Precisamos enfatizar que todas as equações de transição podem ser codificadas com relativa facilidade.

Vamos atualizar nossa receita estimada quando um cliente clica no anúncio usando:

$$
\begin{align}
\Rbar^{n+1} = \begin{cases} (1-\alpha^{lrn}) \Rbar^n + \alpha^{lrn} \Rhat^{n+1} & \text{if } K^{n+1} = 1, \\ \Rbar^n & \text{otherwise.} \end{cases} \label{eq:adclicktransition1}
\end{align}
$$

Assim, só atualizamos nossa receita estimada quando obtemos um clique. O parâmetro $\alpha^{lrn}$ é um parâmetro de suavização (às vezes chamado de "taxa de aprendizado") entre 0 e 1 que fixamos de antemão.

Em seguida, tratamos da atualização das probabilidades $p^n_k$. Deixamos $H^n$ ser o histórico de estados, decisões e informação exógena

$$
H^n = (S^0,x^0,W^1, S^1, x^1, \ldots, W^n, S^n, x^n).
$$

Usamos isso para escrever

$$
p^n_k = Prob[\theta=\theta_k\vert H^n].
$$

A forma de ler o condicionamento no histórico $H^n$ é "$p^n_k$ é a probabilidade $\theta = \theta_k$ dado o que sabemos após $n$ observações." Em seguida, usamos o teorema de Bayes para escrever

$$
\begin{align}
p^{n+1}_k &= Prob[\theta=\theta_k\vert W^{n+1}, H^n] \nonumber\\
          &= \frac{Prob[K^{n+1}\vert \theta=\theta_k,H^n]Prob[\theta=\theta_k\vert H^n]}{Prob[K^{n+1}\vert H^n]}. \label{eq:adclicktransition2}
\end{align}
$$

Lembre-se de que o histórico $H^n$ inclui a decisão $x^n$ que, dada uma política para tomar essas decisões, é diretamente uma função do estado $S^n$ (que por sua vez é uma função do histórico $H^n$). Agora usamos nossa curva logística na equação $\eqref{eq:adclicklogisticregression}$ para escrever

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,H^n] &= Prob[K^{n+1}=1\vert \theta=\theta_k, x^n]\nonumber\\
   &= \frac{e^{\theta^{const}_k + \theta^{bid}_k x^n}}{1+e^{\theta^{const}_k + \theta^{bid}_k x^n}}. \label{eq:adclicktransition2a}
\end{align}
$$

Em seguida, observamos que

$$
\begin{align}
Prob[\theta=\theta_k\vert H^n]  = p^n_k. \label{eq:adclicktransition2b}
\end{align}
$$

Finalmente, observamos que o denominador pode ser calculado usando

$$
\begin{align}
Prob[K^{n+1}\vert H^n] = \sum_{k=1}^K Prob[K^{n+1}\vert \theta=\theta_k,H^n] p^n_k. \label{eq:adclicktransition2c}
\end{align}
$$

Nosso uso de uma representação amostrada dos possíveis resultados de $\theta$ está nos ajudando aqui. Mesmo que $\theta$ tenha apenas duas dimensões (como é o caso aqui, mas apenas por enquanto), realizar uma integral bidimensional sobre uma distribuição multivariada para $\theta$ seria problemático.

As equações $\eqref{eq:adclicktransition2a}$–$\eqref{eq:adclicktransition2c}$ nos permitem calcular nossa equação de atualização bayesiana para as probabilidades em $\eqref{eq:adclicktransition2}$. As equações $\eqref{eq:adclicktransition1}$–$\eqref{eq:adclicktransition2}$ compõem nossa função de transição

$$
S^{n+1} = S^M(S^n,x^n,W^{n+1}).
$$

### Função objetivo

Começamos escrevendo a função de lucro de um único período como

$$
C(S^n,x^n,W^{n+1}) = (\Rhat^{n+1} - x^n) K^{n+1},
$$

o que significa que não ganhamos nada se o cliente não clicar no anúncio ($K^{n+1} = 0$). Se o cliente clicar no anúncio ($K^{n+1} = 1$), recebemos receita dada por $\Rhat^{n+1}$, mas também temos que pagar o que oferecemos pelo clique no anúncio, dado pelo nosso lance $x^n$.

Acabaremos tomando a contribuição esperada, que escrevemos como

$$
\E \{C(S^n,x^n,W^{n+1})\vert S^n\} = \E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Há três variáveis aleatórias ocultas na expectativa:

- $\theta$, com distribuição $p^n = (p^n_1, \ldots, p^n_K)$ (contida em $S^n$).
- $K^{n+1}$, onde $P^{click}(\theta,x) = Prob[K^{n+1}=1\vert \theta,x]$.
- $\Rhat^{n+1}$, que observamos a partir de alguma distribuição desconhecida se $K^{n+1}=1$, e onde $\Rhat^{n+1}=0$ se $K^{n+1}=0$ (não obtemos nenhuma receita se o cliente não clicar no anúncio).

Podemos então decompor a expectativa em três expectativas aninhadas:

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \E_{\Rhat} \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Começamos tomando a expectativa sobre $\Rhat$ onde simplesmente usamos $\E \lbrace \Rhat^{n+1}\vert S^n\rbrace  = \Rbar^n$ (lembre-se de que $\Rbar^n$ está na variável de estado $S^n$), o que nos permite escrever

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Em seguida, vamos tomar a expectativa sobre $K^{n+1}$ para um dado $\theta$ usando

$$
\E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\} =  (\Rbar^n - x^n) P^{click}(\theta,x).
$$

onde usamos o fato de que $(\Rbar^n - x^n) K^{n+1}=0$ se $K^{n+1}=0$.

Finalmente, tomamos a expectativa sobre $\theta$ usando

$$
\E_{\theta}  \{(\Rbar^n - x^n) P^{click}(\theta,x^n) \vert S^n\} = \sum_{k=1}^K (\Rbar^n - x^n) P^{click}(\theta=\theta_k,x^n) p^n_k.
$$

Vamos deixar $\Cbar(S^n,x)$ ser a contribuição esperada, ou seja,

$$
\Cbar(S^n,x)   =  \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Nossa função objetivo agora pode ser escrita como

$$
\max_\pi \E_{S^0} \E_{W^1, \ldots, W^n\vert S^0} \left\{\sum_{n=0}^N C(S^n,X^\pi(S^n),W^{n+1})\vert S_0\right\}.
$$

Observe que o condicionamento em $S_0$ é como comunicamos nossa priori $p^0\_k = Prob[\theta=\theta_k]$ ao modelo. Como antes, aproximaríamos a expectativa fazendo uma média sobre amostras simuladas do valor verdadeiro de $\theta$, e dos cliques observados $K^n$ e receitas $R^n$.

## Modelando a incerteza

Temos três formas de incerteza: o clique no anúncio $K^{n+1}$, a receita que recebemos $\Rhat^{n+1}$ se $K^{n+1}=1$, e então o valor verdadeiro de $\theta$. Vamos assumir que simplesmente observamos $\Rhat^{n+1}$ a partir de um fluxo de dados real, o que significa que não precisamos de um modelo de probabilidade formal para essas variáveis aleatórias. Assumimos que $K^{n+1}$ é descrito por nossa função logística

$$
\begin{align}
P^{click}(\theta,x) &= P[K^{n+1} = 1\vert \theta,x=x^n] \nonumber \\
                   &= \frac{e^{\theta^{const} + \theta^{bid} x}}{1+e^{\theta^{const} + \theta^{bid} x}}, \label{eq:adclicklogistic}
\end{align}
$$

mas é importante reconhecer que esta é apenas uma curva ajustada. Os valores de $K^{n+1}$ são observados a partir de dados, o que significa que não temos garantia de que a distribuição corresponda precisamente à nossa regressão logística.

Finalmente, assumimos que $\theta \in \Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $, o que também é uma aproximação. Existem maneiras de relaxar a exigência de um conjunto amostrado, mas a lógica se torna um pouco mais complicada sem agregar muito valor educacional.

## Projetando políticas

Vamos explorar três políticas de aprendizado:

- Exploração pura (pure exploitation) – Aqui sempre colocamos o lance que parece ser o melhor de acordo com nossas estimativas atuais.
- Uma política de excitação – Introduzimos exploração (exploration) em nossa política de exploração pura adicionando um termo de ruído aleatório que força o sistema a explorar regiões próximas às áreas que consideramos melhores (isso é popular em engenharia, onde estados e decisões são contínuos).
- Uma política de valor da informação – Vamos maximizar o valor da informação obtida ao fazer um lance e aprender o resultado.

### Exploração pura

O ponto de partida de qualquer política online deve ser a exploração pura, o que significa fazer o melhor que pudermos. Para calcular isso, começamos usando

$$
\E \{\Rhat^{n+1} K^{n+1}\} = \E \{\Rhat^{n+1}\vert K^{n+1} = 1\} Prob[K^{n+1}=1\vert \theta=\theta_k] = \Rbar^n P^{click}(\theta,x).
$$

Para encontrar o melhor lance, encontramos (após um pouco de álgebra) a derivada em relação ao lance $x$

$$
\frac{d \Cbar(x)}{d x} = (\Rbar^n - x)\frac{d P^{click}(\theta,x)}{d x} - P^{click}(\theta,x)
$$

onde

$$
\frac{d P^{click}(\theta,x)}{d x} = \frac{\theta_1 e^{-\theta_0 - \theta_1 x}}{(1+e^{-\theta_0 - \theta_1 x})^2}.
$$

Agora queremos encontrar o lance $x^\ast $ onde

$$
\left.\frac{d \Cbar(x)}{d x}\right\vert _{x=x^\ast } = 0.
$$

A Figura 12.3 mostra $\frac{d \Cbar(x\vert \theta)}{d x}$ versus o lance $x$, mostrando o comportamento de começar positivo e transicionar para negativo. O ponto onde é igual a zero seria o lance ótimo, um ponto que pode ser encontrado numericamente com bastante facilidade. Seja $X^{explt}(S^n)$ o lance $x^\ast $ que satisfaz $d \Cbar(x)/dx = 0$.

Isso significa que temos que executar um algoritmo numérico para calcular a política. Esta é uma política gulosa que se enquadra na classe CFA, mas sem nenhum parâmetro ajustável.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickprofitderivative.png" alt="Derivada da função de lucro do clique em anúncio versus o lance." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 12.3.</span> Derivada da função de lucro do clique em anúncio versus o lance.</figcaption>
</figure>

### Uma política de excitação

Uma possível limitação de nossa política de exploração pura é que ela ignora o valor de tentar uma gama mais ampla de lances para ajudar no processo de aprendizado dos valores corretos de $\theta$. Uma estratégia popular é adicionar um termo de ruído, conhecido em engenharia como "excitação," dando-nos a política

$$
X^{excite}(S^n\vert \rho) = X^{explt}(S^n) + \varepsilon(\rho)
$$

onde $\varepsilon(\rho) \sim N(0,\rho^2)$. Nesta política, $\rho$ é nosso parâmetro ajustável que controla a quantidade de exploração na política. Se for muito pequeno, pode não haver exploração suficiente. Se for muito grande, escolheremos lances distantes do ideal, possivelmente sem nenhum benefício do aprendizado.

### Uma política de valor da informação

As políticas de exploração pura e de excitação que acabamos de introduzir são ambas relativamente simples. Agora vamos considerar uma política que maximiza o valor da informação no futuro. Isso parece uma ideia razoável, mas requer que pensemos sobre como a informação agora afeta qual decisão *podemos* tomar no futuro, e isso será um pouco mais difícil.

Nossa política de exploração assume que os parâmetros estimados $\theta^n$ após $n$ experimentos são o valor correto, e escolhe um lance com base nessa estimativa. Agora imagine que fazemos um lance $x^n=x$ e observamos $K^{n+1}$ e $\Rhat^{n+1}$, e usamos essa informação para obter uma estimativa atualizada de $\theta^{n+1}$ assim como de $\Rbar^{n+1}$. Podemos então usar essas estimativas atualizadas para tomar uma decisão melhor. Queremos escolher o lance $x$ que nos dá a maior melhora no valor da informação a partir de uma decisão, reconhecendo que não sabemos o resultado de $W^{n+1} = (\Rhat^{n+1},K^{n+1})$ até realmente colocarmos o lance.

Seja $\theta^{n+1}(x^n,W^{n+1})$ a estimativa atualizada de $\theta$ assumindo que fazemos um lance $x^n=x$ e observamos $W^{n+1} = (\Rhat^{n+1},K^{n+1})$. Esta é uma variável aleatória, porque estamos pensando em colocar um lance $x^n=x$ para o $n+1$-ésimo leilão, mas ainda não colocamos o lance, o que significa que ainda não observamos $W^{n+1}$.

Para simplificar nossa análise, vamos assumir que a variável aleatória $K^{n+1} = 1$ com probabilidade $P^{click}(\theta,x)$ e $K^{n+1} = 0$ com probabilidade $1-P^{click}(\theta,x)$. Vamos então assumir que nossa estimativa da receita que recebemos de um clique no anúncio se estabilizou, o que significa que $\Rbar^{n+1} \approx \Rbar^n$.

Podemos pensar nisso como um modelo aproximado de horizonte de previsão, onde $\Rbar^n$ não muda. Escreveríamos então nossa informação exógena em nosso modelo de horizonte de previsão como

$$
\Wtilde^{n,n+1}=\Ktilde^{n,n+1},
$$

onde o sobrescrito duplo $(n,n+1)$ significa que esta é a informação em um modelo de horizonte de previsão criado no tempo $n$, olhando para o que pode acontecer no tempo $n+1$. A variável aleatória $\Ktilde^{n,n+1}$ é o clique no anúncio que estamos simulando que *pode* acontecer em nosso modelo de horizonte de previsão, em vez da observação real de se alguém clicou no anúncio. Apenas lembre-se de que usamos til para qualquer variável em nosso modelo de horizonte de previsão, e essas variáveis serão indexadas por $n$ (o tempo em que estamos iniciando o modelo de horizonte de previsão), e $n+1$ (já que estamos olhando um período de tempo à frente no modelo de horizonte de previsão).

Em seguida, usamos nossa equação de atualização $\eqref{eq:adclicktransition2}$ para as probabilidades $p^n_k = Prob[\theta=\theta_k\vert H^n]$. Podemos escrever essas probabilidades atualizadas como $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$ para capturar a dependência da atualização em $\Ktilde^{n,n+1}$ (a equação $\eqref{eq:adclicktransition2}$ é escrita para $\Ktilde^{n,n+1}=1$). Como $\Ktilde^{n,n+1}$ pode assumir dois resultados (0 ou 1) teremos dois valores possíveis para $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$.

Agora imagine que realizamos nossa política de exploração pura $X^{explt}(S^n\vert \theta^n)$ que descrevemos acima, mas vamos fazê-la em nosso modelo aproximado de horizonte de previsão (é aqui que ignoramos mudanças em $\Rbar^n$). Seja $\Stilde^{n,n+1}$ representando nosso estado no modelo de horizonte de previsão dado por

$$
\Stilde^{n,n+1}(\Ktilde^{n,n+1}) = (\Rbar^n, \ptilde^{n,n+1}(\Ktilde^{n,n+1})).
$$

Lembre-se – já que $\Ktilde^{n,n+1}$ é uma variável aleatória (ainda estamos no tempo $n$), $\Stilde^{n,n+1}(\Ktilde^{n,n+1})$ também é uma variável aleatória, motivo pelo qual escrevemos sua dependência explícita do resultado $\Ktilde^{n,n+1}$.

A forma de pensar sobre este modelo de horizonte de previsão é como se você estivesse jogando um jogo (como xadrez) em que você pensa em um movimento (para nós, isso seria o lance $x^n$) e então, antes de fazer o movimento, pensa sobre o que pode acontecer no futuro. Neste problema, nosso futuro tem apenas dois resultados (se um cliente clica ou não no anúncio), o que significa dois valores possíveis de $\Stilde^{n,n+1}$, que produzem dois conjuntos de probabilidades atualizadas $\ptilde^{n,n+1}(K^{n+1})$.

Finalmente, isso significa que haverá dois valores do lance míope ótimo (usando nossa política de exploração pura) $X^{explt}(\Stilde^{n,n+1})$. A contribuição esperada que faríamos no futuro é então dada por $\Ctilde(\Stilde^{n,n+1},\xtilde^{n,n+1})$ onde $\xtilde^{n,n+1}$ (esta é a decisão que estamos pensando em tomar no futuro) é dada por

$$
\xtilde^{n,n+1} = X^{explt}(\Stilde^{n,n+1}).
$$

Isso significa que há duas decisões ótimas possíveis, o que significa dois valores diferentes da contribuição esperada $\Ctilde(\Stilde^{n,n+1},X^{explt}(\Stilde^{n,n+1}))$. Para maior compactação, vamos chamar esses valores de $\Ctilde^{n,n+1}(1)$ (se $\Ktilde^{n,n+1} = 1$) e $\Ctilde^{n,n+1}(0)$ (se $\Ktilde^{n,n+1} = 0$). Pense nesses valores como as contribuições esperadas que *podem* acontecer no futuro dado o que sabemos agora. Finalmente podemos calcular a esperança sobre $\Ktilde^{n,n+1}$ para obter a contribuição esperada de colocar um lance $x^n=x$ agora, que podemos calcular usando

$$
\Cbar^n(x) = \sum_{k=1}^K \big(P^{click}(\theta=\theta_k,x) \Ctilde^{n,n+1}(1) + (1-P^{click}(\theta=\theta_k,x)) \Ctilde^{n,n+1}(0)\big) p^n_k.
$$

Nossa política, então, é escolher o lance $x$ que maximiza $\Cbar^n(x)$. Assuma que discretizamos nossos lances em um conjunto $\Xcal = \lbrace x_1, \ldots, x_M\rbrace $. Nossa política de valor da informação seria escrita como

$$
X^{VoI}(S^n) = \argmax_{x\in\Xcal} \Cbar^n(x).
$$

Notamos que esta é uma classe de política de aproximação de horizonte de previsão direto (DLA).

Políticas de valor da informação são bastante poderosas. Elas são mais difíceis de calcular, mas não têm nenhum parâmetro ajustável. Imagine, por exemplo, fazer esse cálculo quando há mais de dois resultados. Por exemplo, se não tivéssemos feito nossa simplificação de manter $\Rbar^n$ constante, teríamos que reconhecer que essa variável de estado também está mudando.

Notamos apenas de passagem que realizamos muitas comparações de diferentes políticas de aprendizado, e o valor da informação de horizonte de um passo frequentemente funciona bastante bem. Usamos esse cenário porque tornou as derivações muito mais simples.

Uma palavra de cautela é necessária. Problemas de aprendizado onde o resultado é 0 ou 1 são problemas em que um único experimento fornece muito pouca informação. Em vez disso, é melhor assumir que tomamos nossa decisão (isto é, definimos o lance) e depois a observamos para, digamos, $M$ leilões. Isso significa que $\Ktilde^{n,n+1}$ agora pode ser um número entre 0 e $M$. O número $M$ torna-se um parâmetro ajustável, e os cálculos ficaram um pouco mais complexos (temos que somar sobre $M+1$ realizações em vez de apenas duas), mas essa abordagem pode funcionar bastante bem.

## Extensão: Clientes com atributos simples

Suponha que sabemos a localização de um cliente até a região ou a cidade principal mais próxima, que designamos por $L$. Se acharmos que o comportamento de cada região é diferente, poderíamos indexar $\theta$ por $\theta_\ell$ se o cliente for da localização $L=\ell$. Isso significa que, se houver 1.000 localizações, teremos que estimar 1.000 modelos, o que significa 1.000 valores de $\theta = (\theta^{const},\theta^{bid})$.

Uma abordagem alternativa seria especificar um modelo da forma

$$
Prob^n[K^{n+1}=1\vert \theta] = \frac{e^{U(x,L\vert \theta)}}{1+e^{U(x,L\vert \theta)}}.
$$

onde vamos agora usar como nossa função de utilidade

$$
U(x,L\vert \theta) = \theta^{const} + \theta^{bid}x + \sum_{\ell=1}^L \theta^{loc}_\ell I_{\ell=L}.
$$

Este é um modelo mais compacto porque agora assumimos que o termo constante $\theta^{const}$ e o coeficiente de lance $\theta^{bid}$ não dependem da localização. Em vez disso, estamos apenas adicionando um deslocamento $\theta^{loc}\_\ell$. Assim, ainda temos 1.000 parâmetros a estimar (os coeficientes de localização), mas antes tínhamos 2.000 parâmetros a estimar – $\theta^{const}\_\ell$ e $\theta^{bid}\_\ell$ para cada localização $\ell \in \lbrace 1, \ldots, L\rbrace $.

## O que aprendemos?

- Este é outro problema de aprendizado puro (nosso problema de diabetes no [Capítulo 4](/sdam/pt-BR/chapter-4/) foi um problema de aprendizado puro), mas desta vez estamos usando um modelo de crença não linear, com um modelo amostrado para o parâmetro desconhecido $\theta$ que determina a resposta ao preço.
- A função de transição inclui a atualização bayesiana das crenças sobre as probabilidades $p^n_k$ de que o parâmetro desconhecido $\theta$ seja igual a um valor específico $\theta_k$.
- Há três formas de incerteza: se alguém vai clicar em um anúncio dado o preço do lance; a receita obtida ao clicar no anúncio (por exemplo, se o cliente comprou o produto), e a incerteza sobre a resposta do mercado capturada pelo parâmetro desconhecido $\theta$.
- Ilustramos uma política de exploração pura, uma política de excitação (que simplesmente aleatoriza o preço recomendado pela política de exploração), e uma política de gradiente do conhecimento que maximiza o valor da informação.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Qual modelo probabilístico é assumido para a variável aleatória $K^n$ que indica se um cliente clicou no anúncio ou não?</li>
<li>Qual modelo probabilístico assumimos para o vetor de parâmetros desconhecido (e, portanto, incerto) $\theta$?</li>
<li>Qual distribuição de probabilidade assumimos para a receita $\Rhat^{n+1}$ que recebemos quando o cliente clica em um anúncio?</li>
<li>Forneça os números das equações que compõem a função de transição.</li>
<li>Qual informação probabilística está no estado inicial $S^0$?</li>
<li>O que se consegue ao adicionar o termo de ruído $\varepsilon(\rho)$ para criar a política de excitação? Quais parâmetros específicos isso nos ajuda a identificar?</li>
<li>Descreva em palavras a lógica por trás da política de valor da informação. Qual é o valor de aprender se um cliente clica ou não no anúncio caso isso não mude o que vamos ofertar?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li><p>Sistema de recomendação parte I - Modelo de crença - Você vai ajudar a projetar um sistema de recomendação que recomenda produtos para anunciar quando um cliente está rolando a tela em um site. Como o cliente precisa fazer login, podemos identificar o $n$-ésimo cliente por um vetor de atributos $a=a^n$ que inclui:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$a_1$</td><td>Gênero (2 tipos).</td></tr>
<tr><td>$a_2$</td><td>Faixa etária $(0$–$10, 11$–$20, \ldots, 70$–$100)$ (8 tipos).</td></tr>
<tr><td>$a_3$</td><td>Tipo de dispositivo (smartphone, laptop, tablet) (3 tipos).</td></tr>
<tr><td>$a_4$</td><td>Região (200).</td></tr>
<tr><td>$a_5$</td><td>ID único (endereço de e-mail) (100 milhões).</td></tr>
</tbody>
</table>
</div>

<p>Imagine que estamos recomendando artigos de texto. Suponha que o artigo que recomendamos para o $n$-ésimo cliente tenha atributos $b=b^n$ que incluem:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$b_1$</td><td>Notícias, esportes, artes, negócios, culinária, imóveis (6 tipos).</td></tr>
<tr><td>$b_2$</td><td>Subcategoria: se notícias, então internacional, nacional (por país), regional (região dentro de um país); se esportes, então por esporte, e depois por time (ou atleta); e assim por diante (um total de 500).</td></tr>
<tr><td>$b_3$</td><td>Fonte (site, jornal, ...) (5 fontes).</td></tr>
<tr><td>$b_4$</td><td>Autor (2.000).</td></tr>
<tr><td>$b_5$</td><td>ID único do artigo (6 milhões).</td></tr>
</tbody>
</table>
</div>

<p>Gostaríamos de estimar:</p>

<p style="margin-left: 2rem;">$P(b^n\vert a^n)$ = Probabilidade de que o $n$-ésimo cliente com atributo $a^n$ clique no link de um artigo com atributo $b^n$.</p>

<p>Quando o cliente $a^n$ chega, vamos assumir que temos que escolher um artigo de notícia de um conjunto $\Bcal^n$, que é o conjunto de artigos disponíveis quando o $n$-ésimo cliente chega (esse conjunto muda ao longo do tempo). Gostaríamos de escolher um artigo com atributo $b\in\Bcal^n$ que maximize a probabilidade de que nosso cliente clique nesse artigo de notícia. Nossa política tem que escolher um artigo específico com atributo $b^n$.</p>

<p>Idealmente, queremos $P(b^n_5\vert a^n_5)$ que é a probabilidade de que o usuário $a^n_5$ selecione o artigo $b^n_5$, mas há usuários e artigos demais para obter estimativas razoáveis dessa probabilidade. Se considerarmos apenas os elementos $a_1, a_2, a_3$ e $a_4$, haveria 9.600 combinações, com uma média de aproximadamente 10.000 pessoas para cada uma dessas quatro primeiras elementos. Abaixo, vamos assumir que usamos apenas $a_1$ e $a_2$, o que significa 16 tipos de pessoas.</p>

<p>Vamos criar um conjunto de características $\Fcal$ que são construídas a partir dos elementos de $a$ e $b$ que desejamos considerar. Vamos usar apenas os elementos $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $ a partir dos quais construiremos um conjunto de variáveis de característica $\phi_f(a,b),~f\in\Fcal$. Como esses cinco elementos são todos categóricos, as características mais elementares são variáveis indicadoras. Por exemplo, para o atributo de gênero $a_1$ temos dois gêneros a partir dos quais criamos duas características:</p>

$$
\phi_{male}(a) = \begin{cases} 1 & \text{if } a_1 = male, \\ 0 & \text{otherwise.} \end{cases} \qquad \phi_{female}(a) = \begin{cases} 1 & \text{if } a_1 = female, \\ 0 & \text{otherwise.} \end{cases}
$$

<p>Se nos restringirmos a essas características elementares, teríamos uma característica para cada valor possível de cada elemento dos atributos $a_1,a_2,b_1,b_2,b_3$.</p>

<p>Nosso processo começa quando o primeiro cliente faz login com vetor de atributos $a^1$, momento em que temos que decidir os atributos de um artigo $b^1$ para exibir a esse usuário, e então observar $Y^1$, onde $Y^1 = 1$ se o cliente clicar no artigo ou 0 caso contrário. Essa informação é usada para criar um estado atualizado $S^1$, após o qual observamos o cliente $a^2$.</p>

<p>Se $a^n$ são os atributos do $n$-ésimo cliente, então nossa decisão é escolher $b^n$ usando o que sabemos, o que designamos por $S^n$. Nosso objetivo é modelar esse problema e projetar uma política $B^\pi(S^n)$ que determine $b^n$.</p>

<p>Nosso primeiro desafio é desenvolver um modelo de crença:</p>
  <ol type="a">
    <li>Se usarmos um modelo de crença de tabela de consulta para $P(b\vert a)$ usando os atributos $\lbrace a_1,a_2, b_1,b_2,b_3\rbrace $, quantos parâmetros estamos tentando estimar?</li>
    <li>Em vez disso, considere usar uma regressão logística. Primeiro defina uma função de utilidade

    $$
    U(a,b\vert \theta) = \sum_{f\in\Fcal} \theta_f \phi_f(b\vert a),
    $$

    onde $\Fcal$ é o conjunto de características elementares que podemos construir a partir dos elementos $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $. Agora crie um modelo de regressão logística para a probabilidade de clicar em um artigo usando

    $$
    P(Y=1\vert a,b,\theta) = \frac{e^{U(a,b\vert \theta)}}{1+e^{U(a,b\vert \theta)}}.
    $$

    Qual é a dimensionalidade do vetor $\theta$ supondo que usemos apenas variáveis indicadoras elementares?</li>
    <li>Reconhecendo que o número de parâmetros no modelo paramétrico da parte (b) é muito menor do que o número de parâmetros no modelo de tabela de consulta da parte (a), por que alguém usaria um modelo de crença de tabela de consulta em vez de um modelo paramétrico como a regressão logística? Discuta os prós e contras de cada tipo de modelo de crença.</li>
    <li>Agora precisamos estimar $\theta$. Suponha que geremos uma amostra de valores possíveis do vetor $\theta$ que representamos como $\lbrace \theta_1, \ldots, \theta_k, \ldots, \theta_K\rbrace $, onde cada $\theta_k$ é um vetor com elemento $\theta_{kf},~f\in\Fcal$. Comece com a probabilidade a priori $p^0_k = 1/K$. Em seguida, suponha que observamos os atributos do primeiro cliente $a^1$, e então tomamos a decisão de exibir um artigo com atributo $b^1$ (esta é nossa variável de decisão). Assumindo que você conhece $p^n_k$, escreva o teorema de Bayes para calcular $p^{n+1}_k$ após observar um cliente com atributo $a^{n+1}$, e então escolher um artigo com atributo $b^{n+1}$ após o qual você observa o resultado $Y^{n+1} = 1$.</li>
  </ol>
</li>
<li>Sistema de recomendação parte II - Modelo do sistema - Agora vamos modelar todos os cinco elementos do problema.
  <ol type="a">
    <li>Dê os elementos do estado pré-decisão $S^n$ e do estado pós-decisão $S^{b,n}$.</li>
    <li>Existem duas formas de informação exógena nesse processo. Quais são elas?</li>
    <li>Escreva a sequência de estados (pré e pós), decisões e as diferentes formas de informação exógena começando com o que você sabe no tempo 0 e prosseguindo até (mas excluindo) a chegada do terceiro cliente. Escreva-os na ordem em que ocorrem, com a indexação adequada (por exemplo, $n$ versus $n+1$).</li>
    <li>Escreva as equações que representam a função de transição.</li>
    <li>Escreva a função objetivo para encontrar a melhor política $B^\pi(S^n)$ (sem especificar o tipo de política).</li>
  </ol>
</li>
<li>Sistema de recomendação parte III - Projeto de política - Finalmente, vamos tentar projetar políticas. Suponha que temos $K=20$ valores possíveis de $\theta$.
  <ol type="a">
    <li>Comece supondo que sabemos que $\theta = \theta_k$. Escreva uma política de pura explotação em que escolhemos o atributo $b\in\Bcal^n$ que maximiza a probabilidade de ser escolhido, dado que $\theta = \theta_k$.</li>
    <li>Em seguida, suponha que não sabemos que $\theta=\theta_k$. Em vez disso, $\theta=\theta_k$ com probabilidade $p^n_k$. Reescreva sua política da parte (a) onde você precisa tratar $\theta$ como uma variável aleatória. Você precisará inserir uma esperança em algum lugar.</li>
    <li>A política em (b) pode ser vista como muito cara de calcular. Você pode simplificá-la substituindo a variável aleatória $\theta$ por sua esperança

    $$
    \thetabar^n = \E^n \theta_k = \sum_{k=1}^K \theta_k p^n_k.
    $$

    Reescreva sua política da parte (b) usando essa estimativa pontual. Suponha que você esteja considerando apenas artigos em que a probabilidade de clicar em um artigo seja maior que 0,5. Como você acha que a probabilidade de clicar em um artigo calculada usando a estimativa pontual em (c) se compararia à estimativa fornecida usando a esperança em (b)?</li>
    <li>A política de estimativa por intervalo usa, digamos, o percentil 95 da estimativa do valor de uma escolha. Seja $\rho$ o percentil desejado, e suponha que ele tenha que ser arredondado para 0,05 (porque escolhemos $K=20$ valores possíveis para $\theta$). Mostre como projetar uma política que escolhe o vetor de atributos $b$ que maximiza a $\rho$-ésima probabilidade (em vez da estimativa pontual), e dê a função objetivo para encontrar o melhor valor de $\rho$ para maximizar o número total de cliques em anúncios.</li>
  </ol>
</li>
</ol>
{% endraw %}
