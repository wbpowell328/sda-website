---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 9: Armazenamento de energia II"
permalink: /sdam/pt-BR/chapter-9/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: f45bf159515d3588
---


{% raw %}
<figure class="book-figure">
  <img src="/assets/images/sdam/renewablegridstorageload.jpg" alt="Sistema de energia para atender uma carga (edifício) a partir de um parque eólico, da rede elétrica e de um dispositivo de armazenamento em bateria." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 9.1.</span> Sistema de energia para atender uma carga (edifício) a partir de um parque eólico (com velocidades de vento variáveis), da rede elétrica (com preços variáveis) e de um dispositivo de armazenamento em bateria.</figcaption>
</figure>

## Visão geral do capítulo

Este capítulo estende o modelo do [Capítulo 8](/sdam/pt-BR/chapter-8/) começando com um problema de armazenamento de energia mais complexo que combina energia de duas fontes (um parque eólico e a rede elétrica) para atender uma carga dependente do tempo, auxiliado por um dispositivo de armazenamento. Uma característica distintiva desse problema é que nos é fornecida uma previsão de vento de 24 horas que é atualizada a cada hora. Essas previsões podem mudar bastante ao longo do tempo, o que introduz uma nova fonte de incerteza, que não é apenas o fato de as previsões não serem perfeitas, mas sim que as próprias previsões estão mudando.

Começamos explorando dois modelos para modelar a incerteza nas previsões de vento. O primeiro é um método conhecido como regressão de processo gaussiano, que é útil para modelar processos contínuos como a quantidade de energia eólica que esperamos que seja gerada nas próximas 24 horas.

O segundo método usa uma técnica poderosa, porém surpreendentemente simples, baseada no que são chamados de "modelos de estado oculto" que nos permitem replicar uma propriedade das previsões conhecida como *tempos de cruzamento*. Estes se referem à quantidade de tempo em que uma previsão está acima, ou abaixo, do valor real. Esse é um comportamento importante ao modelar problemas de armazenamento.

Para projetar nossa política, adaptamos a técnica que introduzimos pela primeira vez no [Capítulo 6](/sdam/pt-BR/chapter-6/), na qual começamos com uma política de horizonte de previsão determinística, e então introduzimos parâmetros para ajudá-la a funcionar melhor ao longo do tempo. Para nosso problema de energia, planejamos usando nossa melhor estimativa da energia eólica prevista multiplicada por coeficientes que dependem de quantas horas estamos prevendo à frente. Isso nos dá um modelo de otimização determinístico com 24 parâmetros que precisam ser ajustados.

## Narrativa

Agora vamos resolver um problema de armazenamento de energia um pouco mais complexo, retratado na Figura 9.1. Em contraste com nosso sistema de armazenamento anterior, que apenas comprava e vendia energia da rede elétrica, agora enfrentamos o problema de atender uma carga dependente do tempo para um edifício usando energia de um parque eólico e da rede elétrica, com um único dispositivo de armazenamento de energia para ajudar a suavizar os diferentes processos.

Esse problema também vai exibir outra propriedade distintiva, que é o fato de que todos os processos exógenos (vento, preços, cargas e temperatura) virão de um processo dinâmico que varia com diferentes tipos de previsibilidade:

- Cargas – A carga (que é a demanda por energia) segue um padrão razoavelmente previsível que depende da hora do dia (um edifício precisa estar a uma determinada temperatura às 8h, quando as pessoas começam a chegar) bem como da temperatura.
- Temperatura – A temperatura é um processo razoavelmente previsível que depende da hora do dia e da estação, mas também reflete condições climáticas locais que podem ser previstas com certa precisão.
- Vento – Existem fornecedores que realizam serviços de previsão de vento, embora as previsões não sejam muito precisas e evoluam com bastante rapidez mesmo ao longo do dia (veja a Figura 9.2).
- Preços – O preço da eletricidade na rede reflete a oferta e a demanda, em que o fornecedor de energia é projetado para se ajustar rapidamente à demanda. No entanto, escassezes de curto prazo podem produzir picos em que os preços podem subir de 10 a 100 vezes o preço médio. Também pode haver períodos em que a carga cai mais rápido do que os geradores podem ser reduzidos, ocasionalmente produzindo excesso de energia que é vendido a preços muito baixos, até mesmo negativos.

<figure class="book-figure">
  <img src="/assets/images/sdam/windforecasts.png" alt="Evolução das previsões de energia eólica ao longo de um período de 24 horas, atualizadas a cada hora." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 9.2.</span> Evolução das previsões de energia eólica ao longo de um período de 24 horas, atualizadas a cada hora. A linha preta é o valor real.</figcaption>
</figure>

Cada um desses processos pode ser previsto com diferentes graus de precisão. A previsão da energia eólica é a menos precisa, e embora o vento possa ser mais forte à noite, picos e mínimos podem ocorrer a qualquer hora do dia ou da noite. As cargas são altamente correlacionadas com a hora do dia, em grande parte devido à atividade humana, mas também devido à temperatura. Observe que tardes quentes podem criar picos no meio de um dia de verão devido ao ar-condicionado, enquanto isso pode, na verdade, reduzir a carga de aquecimento (que pode ser atendida por aquecimento elétrico) durante o inverno. A temperatura também tem um forte componente de hora do dia devido ao nascer e ao pôr do sol, mas pode haver variações à medida que frentes climáticas se deslocam.

Nosso problema envolve decidir quanto comprar da rede elétrica (ou vender de volta para a rede) e quanto armazenar em cada ponto no tempo (essas decisões podem ser tomadas em incrementos de 5 minutos para alguns operadores de rede). Precisamos atender à demanda por energia, mas, caso contrário, gostaríamos de maximizar a receita que obtemos com a venda de energia menos o custo de compra da energia da rede elétrica ou do parque eólico.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Queremos maximizar o lucro total esperado, que inclui a receita recebida pelo atendimento da demanda, menos o custo de compra de energia da rede elétrica.
- **Decisões:** Temos seis decisões: o fluxo de energia da rede elétrica para o armazenamento, o fluxo de energia da rede elétrica para a carga, o fluxo de energia do parque eólico para o armazenamento, o fluxo de energia do parque eólico para a carga, o fluxo de energia do armazenamento para a rede elétrica, e o fluxo de energia do armazenamento para a carga.
- **Incertezas:** Temos os seguintes processos dinâmicos de informação: a carga (a demanda por energia), a temperatura (que influencia a carga), a energia do parque eólico, o preço que recebemos pelo atendimento da carga, e o custo de compra de energia da rede elétrica.

## Modelo básico

### Variáveis de estado

Começamos modelando a fotografia do sistema no tempo $t$, que inclui $R_t$, a quantidade de energia (em MWh) armazenada na bateria no tempo $t$; $L_t$, a carga (demanda) por energia no tempo $t$ (em MW); $\tau_t$, a temperatura no tempo $t$; $w_t$, a energia do vento no tempo $t$ (em MW); $p^{load}\_t$, a quantia que somos pagos por MWh para atender a carga do edifício no tempo $t$; e $c^{grid}\_t$, o custo de compra de energia da rede elétrica (este é o preço que recebemos se vendermos de volta para a rede).

Como o problema subjacente é muito dependente do tempo (devido a ciclos diários), precisaremos usar previsões, tanto para modelar a dinâmica do problema quanto para tomar decisões que precisam antecipar o que pode acontecer no futuro. Assumimos que nos é fornecido um conjunto rolante de previsões, conforme ilustrado para o vento na Figura 9.2. Modelamos as previsões para carga ($L$), temperatura ($\tau$), vento ($w$), preços de mercado ($p$) e preços da rede elétrica ($G$) usando: $f^L_{tt'}$, a previsão da carga $L_t$ (em MW) no tempo $t' > t$ dado o que sabemos no tempo $t$; $f^\tau_{tt'}$, a previsão da temperatura $\tau_t$ no tempo $t' > t$ dado o que sabemos no tempo $t$; $f^w_{tt'}$, a previsão da energia eólica $w_t$ (em MW) no tempo $t' > t$ dado o que sabemos no tempo $t$; $f^p_{tt'}$, a previsão dos preços de mercado $p^{load}\_t$ (em ＄/MWh) em $t' > t$ dado o que sabemos no tempo $t$; e $f^G_{tt'}$, a previsão dos preços da rede elétrica $c^{grid}\_t$ (em ＄/MWh) em $t' > t$ dado o que sabemos no tempo $t$.

Todas as previsões são vetores sobre o horizonte $t, t+1, \ldots, t+H$, onde $H$ é um horizonte especificado (por exemplo, 24 horas). Deixamos $f^X_t$ ser o vetor de previsões para $X \in \Xcal = \lbrace L, T, W, P, G\rbrace $.

Nossa variável de estado é então

$$
S_t = (\underbrace{R_t}_{R_t}, \underbrace{(L_t, \tau_t, w_t, p^{load}_t, c^{grid}_t)}_{I_t}, \underbrace{(f^L_t, f^T_t, f^w_t, f^P_t, f^G_t )}_{B_t}).
$$

Aqui agrupamos o recurso controlável $R_t$ (nossa variável de estado físico), a fotografia da carga, temperatura, energia eólica e preço (que podemos agrupar como variáveis de informação $I_t$), e então as previsões (que representam uma forma de crença $B_t$ sobre o futuro).

Rapidamente percebemos que temos uma variável de estado de dimensão relativamente alta. Se estivermos planejando em incrementos de 5 minutos, uma previsão rolante de 24 horas teria 288 elementos. Isso dá uma ideia do desafio que espera qualquer pessoa que queira estimar o valor $V_t(S_t)$ de estar no estado $S_t$.

### Variáveis de decisão

As variáveis de decisão para nosso sistema são agora $x^{wr}\_t$, a quantidade de energia movida do parque eólico para a bateria no tempo $t$; $x^{w\ell}\_t$, a quantidade de energia movida do parque eólico para a carga (o edifício) no tempo $t$; $x^{gr}\_t$, a quantidade de energia movida da rede elétrica para a bateria no tempo $t$; $x^{rg}\_t$, a quantidade de energia movida da bateria para a rede elétrica no tempo $t$; $x^{g\ell}\_t$, a quantidade de energia movida da rede elétrica para a carga no tempo $t$; $x^{r\ell}\_t$, a quantidade de energia movida da bateria para a carga no tempo $t$; e $x^{loss}\_t$, carga não coberta (conhecida como "corte de carga").

Essas variáveis precisam ser determinadas sujeitas às restrições

$$
\begin{align}
x^{w\ell}_t + x^{g\ell}_t + \frac{1}{\eta} x^{r\ell}_t + x^{loss}_t &=  L_t, \label{eq:energysystem1}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta R_t, \label{eq:energysystem2}
\end{align}
$$

$$
\begin{align}
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} (R^{max} - R_t), \label{eq:energysystem3}\\
x^{rg}_t                                     &\leq  \eta R_t, \label{eq:energysystem3a}\\
x^{w\ell}_t +  x^{wr}_t                      &\leq  w_t, \label{eq:energysystem4}\\
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energysystem5}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta u^{discharge}, \label{eq:energysystem6}\\
x^{wr}_t, x^{w\ell}_t, x^{gr}_t, x^{rg}_t, x^{g\ell}_t, x^{r\ell}_t &\geq  0.  \label{eq:energysystem7}
\end{align}
$$

A Equação $\eqref{eq:energysystem1}$ limita a energia para atender a carga (o edifício) à quantidade da carga (não podemos sobrecarregar o edifício). A variável $x^{loss}$ captura a quantidade pela qual não cobrimos a carga. A restrição captura perdas de conversão para energia retirada da bateria. A Equação $\eqref{eq:energysystem2}$ diz que não podemos mover mais energia para fora do nosso armazenamento em bateria do que existe na bateria, ajustado pelas perdas de conversão. A Equação $\eqref{eq:energysystem3}$ então limita quanto podemos mover para a bateria à quantidade de capacidade disponível, novamente ajustada pelas perdas de conversão. A Equação $\eqref{eq:energysystem3a}$ limita quanto podemos mover do armazenamento de volta para a rede elétrica. A Equação $\eqref{eq:energysystem4}$ limita a quantidade do parque eólico ao que o parque eólico está gerando naquele momento. As Equações $\eqref{eq:energysystem5}$–$\eqref{eq:energysystem6}$ limitam os fluxos de entrada e saída da bateria às taxas de carga e descarga. A Equação $\eqref{eq:energysystem7}$ impõe não negatividade a cada variável.

### Informação exógena

Nossa primeira fonte de informação exógena é a diferença entre o valor real e o valor previsto para qualquer processo "$X$" onde

$$
X = (L, \tau, w, p^{load}, c^{grid}).
$$

Seja $X_t$ o processo e $\varepsilon^X_{t+1}$ a diferença entre os valores real e previsto. Então deixamos

$$
\varepsilon^X_{t+1} = X_{t+1} - f^X_{t,t+1}.
$$

Podemos modelar $\varepsilon^X_{t+1}$ usando amostras extraídas de dados históricos, ou assumindo que segue alguma distribuição pressuposta.

A segunda fonte de informação exógena é a mudança nas previsões à medida que avançamos no tempo. Novamente deixamos $f^X_t$ ser um vetor de previsões para cada processo de informação $X$, onde $f^X_{tt}$ é o valor real no tempo $t$. Seja $\fhat^X_{t+1,t'}$ a mudança na previsão para o tempo $t'$ entre $t$ e $t+1$, de modo que

$$
\fhat^X_{t+1,t'} = f^X_{t+1,t'} - f^X_{tt'},~ t'=t, t+1, \ldots, t+H.
$$

As mudanças exógenas $\fhat^X_{t+1,t'}$ são correlacionadas entre os períodos de tempo $t'$. Se este não fosse o caso, então as previsões, quando plotadas ao longo do horizonte $t'=t, \ldots, t+H$, não exibiriam mais a suavidade que vemos nas previsões de vento na Figura 9.2. Retornamos à questão de modelar a incerteza nas previsões mais adiante.

Isso significa que podemos escrever nossa informação exógena como

$$
W_{t+1,X} = (\varepsilon^X_{t+1}, \fhat^X_{t+1,t'}), t' > t,
$$

para $X$ igual às diferentes variáveis (carga, temperatura, vento, preços de mercado e preços da rede elétrica).

### Função de transição

A evolução da variável de estado do recurso é dada por

$$
\begin{align}
R_{t+1} = R_t + \eta (x^{wr}_t + x^{gr}_t) - \frac{1}{\eta} (x^{rg}_t + x^{r\ell}_t).\label{eq:energytransitionII1}
\end{align}
$$

Cada uma das variáveis $L_t$, $\tau_t$, $w_t$, $p^{load}\_t$ e $c^{grid}\_t$ evolui usando as previsões. Por exemplo, escreveríamos a evolução da carga $L_t$ usando

$$
\begin{align}
L_{t+1} = f^L_{t,t+1} + \varepsilon^L_{t+1}, \label{eq:energytransitionII2}
\end{align}
$$

Poderíamos criar equações semelhantes para $\tau_t$, $w_t$, $p^{load}\_t$ e $c^{grid}\_t$.

Escrevemos a evolução das previsões usando

$$
\begin{align}
f^X_{t+1,t'} = f^X_{tt'} + \fhat^X_{t+1,t'}, ~X\in\Xcal, ~t'=t+1, \ldots, t+1+H,  \label{eq:energytransitionII3}
\end{align}
$$

para $X=L, \tau, w, p^{load}$ e $c^{grid}$. A Equação $\eqref{eq:energytransitionII3}$ é conhecida na literatura como o "modelo martingale de evolução de previsão." O termo "martingale" se refere à nossa suposição de que $f^X_{tt'}$ é uma estimativa não viesada de $f^X_{t+1,t'}$, já que assumimos que os desvios aleatórios $\fhat^X_{t+1,t'}$ são, em média, zero.

As Equações $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ e $\eqref{eq:energytransitionII3}$ (para todas as previsões $X$) compõem a função de transição

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Função objetivo

Nossa função de lucro no tempo $t$ é dada por

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

onde o preço de mercado $p^{load}\_t$ e o preço da rede $c^{grid}\_t$ estão contidos na variável de estado $S_t$. Nossa função objetivo ainda é o problema canônico dado por

$$
\max_\pi \E \sum_{t=0}^T  C(S_t,X^\pi(S_t))
$$

Como antes, $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ que é dado pelas equações $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ e $\eqref{eq:energytransitionII3}$.

## Modelando a incerteza

Descrevemos abaixo dois estilos para modelar a incerteza ao longo do tempo. Primeiro descrevemos um método para modelar as correlações nos erros das previsões ao longo do tempo usando uma técnica às vezes chamada de *regressão de processo Gaussiano*. Esse método garante que, ao avançarmos no tempo, um vetor de previsões evolua de forma natural.

Em seguida, descrevemos um modelo de Markov com estado oculto que consideramos fornecer trajetórias amostrais excepcionalmente realistas para processos estocásticos. Esse modelo replica de perto as distribuições de erro, mas também faz um trabalho muito bom ao capturar *tempos de cruzamento (crossing times)*, que é o tempo em que o processo real (por exemplo, velocidade do vento) permanece acima ou abaixo de uma referência, como uma previsão. Se conseguirmos capturar adequadamente o tempo em que uma previsão está acima ou abaixo do valor real, isso significa que estamos capturando as correlações ao longo do tempo.

Esta seção ilustrará diversos métodos poderosos de modelagem estocástica que deveriam estar em qualquer conjunto de ferramentas para modelar a incerteza. A modelagem estocástica pode ser tecnicamente sofisticada, e esta seção reflete isso. Alertamos o leitor de que esta seção é bem mais elaborada do que nossas outras seções sobre modelagem da incerteza.

### Regressão de processo Gaussiano para erros de previsão

A regressão de processo Gaussiano (GPR, do inglês *Gaussian process regression*) é um método simples para gerar sequências correlacionadas de variáveis aleatórias normalmente distribuídas. A GPR é particularmente útil ao tentar estimar uma superfície contínua, em que, se um ponto da superfície estiver mais alto do que o esperado, isso significa que pontos próximos também estarão mais altos do que o esperado.

Seja $X_{t'}$ o resultado real de qualquer um dos nossos processos exógenos (preços, cargas, temperatura, energia eólica) no instante $t'$, e seja $f^X_{tt'}$ a previsão de $X_{t'}$ feita no instante $t < t'$. É comum assumir algum erro $\varepsilon_{t'-t}$ que descreve a diferença entre $X_{t'}$ e a previsão $f^X_{tt'}$. Assumiríamos então algum modelo para $\varepsilon^X_{t'-t}$ como

$$
\varepsilon^X_{t'-t} \sim N(0, (t'-t) \sigma^2_X).
$$

Vamos adotar uma abordagem um pouco diferente, assumindo que a distribuição da variação em uma previsão $\fhat^X_{t+1,t'}$ é descrita por

$$
\fhat^X_{t+1,t'} \sim N(0, \sigma^2_X).
$$

Assumimos então que as variações nas previsões $\fhat^X_{t+1,t'}$ são correlacionadas entre os instantes $t'$ com uma função de covariância

$$
\begin{align}
Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''}) = \sigma^2_X e^{-\beta\vert t''-t'\vert }. \label{eq:forecastcovariancefunction}
\end{align}
$$

A função de covariância $Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''})$ na equação $\eqref{eq:forecastcovariancefunction}$ captura a propriedade de que a covariância ao longo do tempo exibe correlações que diminuem com a diferença entre os dois instantes. Esse modelo simples introduz o parâmetro ajustável $\beta$, que precisa ser estimado a partir de dados, ou possivelmente por julgamento. Por exemplo, pode ser possível plotar os valores de covariância para diferentes valores de $\beta$ e escolher um que pareça razoável.

Podemos usar essa função de covariância para criar uma matriz de covariância $\Sigma^X$ com elemento $\Sigma^X_{t't''} = \sigma^2\_X e^{-\beta\vert t''-t'\vert }$. Existe uma forma simples de criar uma amostra correlacionada de variações nas previsões usando um método chamado *decomposição de Cholesky*. Ele começa criando o que poderíamos chamar de "raiz quadrada" da matriz de covariância $\Sigma^X$, que armazenamos em uma matriz triangular inferior $L$. Em python, usando o pacote NumPy, usaríamos o comando python

```
L = scipy.linalg.cholesky(Sigma_X, lower=True)
```

Notamos que $\Sigma^X = L^T L$, motivo pelo qual pensamos em $L$ como a raiz quadrada de $\Sigma^X$.

Em seguida, geramos uma sequência de variáveis aleatórias independentes $Z_{\tau}$ para $\tau =  1, \ldots, H$ que são normalmente distribuídas com média 0 e variância 1. Agora seja $Z=(Z_{t+1}, Z_{t+2}, \ldots, Z_{t+H})^T$ um vetor coluna formado por essas variáveis aleatórias normais padrão independentemente distribuídas. Podemos criar uma amostra correlacionada de variações nas previsões usando

$$
\begin{pmatrix} \fhat^X_{t+1,t+1} \\ \fhat^X_{t+1,t+2} \\ \vdots \\ \fhat^X_{t+1,t+H} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} + L Z.
$$

Essa fórmula nos fornece um conjunto amostrado de variações nas previsões $\fhat^X_{t+1,t+1}, \ldots, \fhat^X_{t+1,t+H}$ que são correlacionadas de acordo com nossa função de decaimento exponencial na equação $\eqref{eq:forecastcovariancefunction}$. O resultado será um conjunto evolutivo de previsões em que a variância nos erros das previsões cresce linearmente ao longo do tempo de acordo com

$$
Var(\varepsilon^X_{t'-t}) = (t'-t) \sigma^2_X.
$$

As previsões evolutivas $f^X_{t,t'}, f^X_{t+1,t'}, \ldots$ exibirão o comportamento que vimos em nossas previsões evolutivas de vento na Figura 9.2.

### Modelo de Markov com estado oculto

Um desafio ao desenvolver modelos estocásticos na área de energia é capturar uma propriedade conhecida como *tempo de cruzamento (crossing time)*. Esse é o tempo em que um processo real (por exemplo, preço ou velocidade do vento) está acima ou abaixo de alguma referência, como uma previsão. A Figura 9.3 ilustra um tempo de cruzamento ascendente (up-crossing) para um processo de vento.

<figure class="book-figure">
  <img src="/assets/images/sdam/upcrossingtime.png" alt="Potência eólica prevista e real, ilustrando um tempo de cruzamento ascendente." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 9.3.</span> Potência eólica prevista (preto) e real, ilustrando um período em que o valor real está acima da previsão. A duração desse período acima é chamada de tempo de cruzamento ascendente (up-crossing time).</figcaption>
</figure>

Replicar tempos de cruzamento usando a modelagem tradicional de séries temporais mostrou-se malsucedido. O que funcionou foi o desenvolvimento de um modelo de Markov com uma variável de estado oculta $S^C_t$, que é calibrada para capturar a dinâmica do processo se movendo acima ou abaixo da referência. O processo utiliza as seguintes etapas:

**Etapa 1** – Comparando o processo real com a referência, encontre os instantes em que o processo real se move acima ou abaixo da referência, e produza um conjunto de dados que capture se o processo estava acima (A) ou abaixo (B) e por quanto tempo. Agregue esses períodos em três categorias (S/M/L) para curto/médio/longo, e rotule cada segmento com A ou B e S/M/L, criando seis estados. Esses são chamados de "estados ocultos" porque, embora saibamos no instante $t$ se o processo real está acima ou abaixo da referência, não saberemos se a duração é curta, média ou longa até que o processo cruze a referência.

**Etapa 2** – Usando a sequência histórica de $S^C_t$, calcule uma matriz de transição de um passo $P^C[S^C_{t+1}\vert S^C_t]$, a probabilidade de que o processo de cruzamento assuma o valor $S^C_{t+1}$ dado que está atualmente no estado $S^C_t$.

**Etapa 3** – Agregue o processo real (por exemplo, velocidade do vento) em, digamos, cinco categorias com base na distribuição cumulativa empírica. Seja $W^g_t$ a velocidade do vento agregada (um número de 1 a 5).

**Etapa 4** – A partir do histórico, calcule a distribuição condicional da velocidade do vento dado $W^g_t$ e $S^C_t$, $F^W[W_{t+1}\vert W^g_t, S^C_t]$, a distribuição cumulativa empírica da velocidade do vento $W_{t+1}$ dado $W^g_t$ e $S^C_t$.

Usando a matriz de transição de um passo $P^C[S^C_{t+1}\vert S^C_t]$ e a distribuição cumulativa condicional $F^W[W_{t+1}\vert W^g_t, S^C_t]$, podemos agora simular nosso processo estocástico simulando primeiro a variável de estado oculta $S^C_{t+1}$ dado $S^C_t$ (observe que existem apenas 30 destas). Em seguida, a partir de uma velocidade do vento $W_t$, podemos encontrar a velocidade do vento agregada $W^g_t$, e então amostrar a velocidade do vento real $W_{t+1}$ a partir da distribuição cumulativa condicional $F^W[W_{t+1}\vert W^g_t, S^C_t]$.

Constatou-se que essa lógica reproduz com precisão tanto a distribuição de erro (real vs. referência), quanto as distribuições de tempos de cruzamento ascendente e descendente em uma variedade de conjuntos de dados que modelam tanto o vento quanto os preços da rede. A Figura 9.4 ilustra essas distribuições em um conjunto de dados específico.

<figure class="book-figure">
  <img src="/assets/images/sdam/crossingtimedistributions.jpg" alt="Comparação das distribuições de erro de previsão real vs. prevista, distribuições de tempo de cruzamento ascendente e distribuições de tempo de cruzamento descendente." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 9.4.</span> Comparação das distribuições de erro de previsão real vs. prevista (acima), distribuições de tempo de cruzamento ascendente (abaixo à esquerda) e distribuições de tempo de cruzamento descendente (abaixo à direita).</figcaption>
</figure>

## Elaborando políticas

A maior complicação deste problema é que as previsões fazem parte da variável de estado, o que nos permite modelar explicitamente a evolução contínua da previsão. A dificuldade é que isso torna a variável de estado de alta dimensionalidade.

As abordagens mais comuns para lidar com previsões usam um modelo de horizonte de previsão que aproxima o futuro fixando a previsão. As duas estratégias mais populares são:

- Horizonte de previsão determinístico com a previsão capturada na formulação do horizonte de previsão.
- Horizonte de previsão estocástico com variáveis latentes – Podemos usar a previsão para desenvolver um modelo de horizonte de previsão estocástico, que resolvemos usando programação dinâmica clássica. No modelo de horizonte de previsão, fixamos as previsões no modelo, em vez de modelar sua evolução ao longo do tempo. Quando ignoramos uma variável em um modelo (incluindo um modelo de horizonte de previsão), isso é chamado de *variável latente*.

Ambos os métodos usam a previsão como uma variável latente, na medida em que não modelam a evolução da previsão dentro do modelo de horizonte de previsão. A dificuldade com o modelo de horizonte de previsão estocástico é que ele é mais difícil de resolver. Se estivermos otimizando nosso problema de armazenamento de energia em incrementos de tempo curtos (isso pode ser de 5 minutos, ou até menos), isso pode criar problemas para técnicas como programação dinâmica exata ou mesmo aproximada.

Por esse motivo, a estratégia mais popular para lidar com problemas dependentes do tempo com uma previsão é resolver um modelo de horizonte de previsão determinístico, assim como fizemos para nosso problema de caminho mais curto dinâmico. Descrevemos esse modelo abaixo, e então introduzimos uma versão parametrizada que permite ao modelo determinístico lidar melhor com a incerteza.

Fazemos uma pausa para observar que o planejamento usando previsões contínuas é bastante comum na gestão de operações. Curiosamente, os livros didáticos quase uniformemente ignoram a modelagem adequada de previsões contínuas. Praticamente todo livro sobre planejamento de estoque, por exemplo, equipara a variável de estado ao estoque. Apenas um pequeno número reconhece que, se as previsões estão sendo atualizadas a cada período de tempo, precisamos representar na variável de estado a informação necessária para atualizar as previsões. Se ignorarmos essa informação, estaremos efetivamente criando um modelo de horizonte de previsão em que a previsão é mantida constante.

### Horizonte de previsão determinístico

Vamos usar o mesmo estilo notacional que introduzimos pela primeira vez no [Capítulo 6](/sdam/pt-BR/chapter-6/), no qual distinguimos nosso *modelo base*, que é o problema que estamos tentando resolver, do *modelo de horizonte de previsão*, que resolvemos como uma forma de política para resolver o modelo base.

Lembre-se de que a formulação canônica do nosso modelo base é

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))\vert S_0\right\},
$$

onde $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$, e onde temos um processo de informação exógena $(S_0, W_1, W_2, \ldots, W_T)$. Observe que as variáveis $W_t$ podem depender do estado $S_t$ e/ou da decisão $x_t$; se for esse o caso, então a variável $W_{t+1}$ precisa ser gerada dinamicamente depois que soubermos $S_t$ e $x_t$.

Vamos criar uma política formulando um modelo de horizonte de previsão determinístico, no qual todas as variáveis são identificadas com tils, e indexadas tanto pelo instante $t$ em que estamos tomando nossa decisão, quanto pelo instante $t'$, que é a variável de tempo dentro do modelo de horizonte de previsão. Assim, definiríamos $\xtilde_{tt'}$, a decisão no instante $t'$ no modelo de horizonte de previsão sendo gerada no instante $t$; $\ctilde_{tt'}$, o coeficiente de custo para $\xtilde_{tt'}$; e $\Rtilde_{tt'}$, a energia na bateria no instante $t'$ no modelo de horizonte de previsão gerado no instante $t$.

Observe que $x_t = \xtilde_{tt}$, $c_t = \ctilde_{tt}$ e assim por diante.

Criamos nossa política de horizonte de previsão determinístico $X^{DLA}\_t(S_t)$ como o seguinte programa linear:

$$
\begin{align}
X^{DLA}_t(S_t) = \argmax_{x_t, (\xtilde_{tt'},t'=t+1, \ldots, t+H)} \left(C(S_t,x_t) + \sum_{t'=t+1}^{t+H} C(\Stilde_{tt'},\xtilde_{tt'})\right),  \label{eq:energydetlookahead0}
\end{align}
$$

onde

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

$$
C(\Stilde_{tt'},\xtilde_{tt'}) = (\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \eta \xtilde^{r\ell}_{tt'}) \ptilde^{load}_{tt'} - (\xtilde^{g\ell}_{tt'} + \xtilde^{gr}_{tt'})\ctilde^{grid}_{tt'}.
$$

Este problema deve ser resolvido sujeito às restrições $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$ para $x_t$, e às seguintes restrições para $\xtilde_{tt'}$ para todo $t' = t+1, \ldots, t+H$:

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookahead1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}   &\leq  f^L_{tt'}, \label{eq:energydetlookahead2} \\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookahead3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookahead4}
\end{align}
$$

$$
\begin{align}
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookahead4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{wr}_{tt'}   &\leq  f^W_{tt'}, \label{eq:energydetlookahead5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energydetlookahead6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookahead7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookahead8}
\end{align}
$$

Essas equações espelham as das restrições base $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$, com a única mudança de que usamos variáveis de horizonte de previsão como $\xtilde_{tt'}$, $\Rtilde_{tt'}$, e previsões como $f^W_{tt'}$ em vez do vento real $W_t$.

O modelo descrito pelas equações $\eqref{eq:energydetlookahead0}$–$\eqref{eq:energydetlookahead8}$ é um programa linear relativamente simples, para o qual pacotes já estão disponíveis em linguagens como Matlab ou python.

Políticas de horizonte de previsão como $X^{DLA}\_t(S_t)$ são amplamente usadas em problemas dinâmicos e variantes no tempo como este. Elas precisam ser resolvidas de forma contínua, como ilustramos primeiro para nosso problema de caminho mais curto determinístico. Por essa razão, elas às vezes são chamadas de "procedimentos de horizonte rolante" ou "procedimentos de horizonte recuante" (receding horizon procedures). Existe um campo inteiro conhecido como "controle preditivo baseado em modelo" (model predictive control) que se baseia nessas políticas de horizonte de previsão.

Para aplicações como este problema de armazenamento de energia, o uso de um modelo de horizonte de previsão determinístico levanta a preocupação de que não estamos considerando as incertezas. Por exemplo, podemos querer armazenar energia extra na bateria para nos proteger de uma queda súbita no vento ou de um aumento nos preços na rede. Na próxima seção, vamos descrever como usar um modelo de horizonte de previsão determinístico para lidar com a incerteza.

### Horizonte de previsão parametrizado

Existe uma maneira muito simples de resolver o problema de que nosso horizonte de previsão determinístico não lida com a incerteza. O que precisamos fazer é pensar em como poderíamos modificar o modelo (ou a solução) por causa da incerteza. Por exemplo, podemos querer pagar por armazenamento extra *no futuro* para lidar com variações inesperadas. Obviamente, não podemos forçar o modelo a manter energia em armazenamento agora quando talvez precisemos dela. Também podemos querer descontar previsões que talvez não sejam muito precisas.

Podemos introduzir essas mudanças substituindo as restrições $\eqref{eq:energydetlookahead1}$–$\eqref{eq:energydetlookahead8}$ pelas seguintes

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookaheadmod1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}     &=     \theta^L_{t'-t} f^L_{tt'}, \label{eq:energydetlookaheadmod2}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookaheadmod3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookaheadmod4}\\
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookaheadmod4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{w\ell}_{tt'}&\leq  \theta^W_{t'-t} f^W_{tt'}, \label{eq:energydetlookaheadmod5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta}u^{charge}, \label{eq:energydetlookaheadmod6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookaheadmod7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookaheadmod8}
\end{align}
$$

Observe que introduzimos parâmetros para modificar o lado direito das restrições $\eqref{eq:energydetlookaheadmod2}$ e $\eqref{eq:energydetlookaheadmod5}$, onde introduzimos coeficientes $\theta^L_{t'-t}$ e $\theta^W_{t'-t}$ para modificar as previsões de carga e vento, sendo que os coeficientes são indexados por quantos períodos de tempo estamos prevendo no futuro. Em seguida, modificamos a restrição $\eqref{eq:energydetlookaheadmod3}$ com a ideia de que podemos querer restringir nossa capacidade de usar toda a energia em armazenamento a fim de manter uma reserva.

Seja $X^{DLA-P}(S_t\vert \theta)$ a política de horizonte de previsão que é resolvida sujeita às restrições parametrizadas $\eqref{eq:energydetlookaheadmod1}$–$\eqref{eq:energydetlookaheadmod8}$. Uma vez que tenhamos decidido como introduzir essas parametrizações (esta é a arte por trás de qualquer modelo paramétrico), resta o problema de encontrar o melhor valor para $\theta$. Este é o problema de busca de parâmetros que abordamos no [Capítulo 7](/sdam/pt-BR/chapter-7/).

Calculamos a melhoria relativa do uso de um horizonte de previsão determinístico parametrizado e otimizado, no qual buscamos os melhores valores do vetor $\theta=(\theta^L, \theta^W)$, em comparação com uma política básica que define esses parâmetros como iguais a 1,0. Em nossos experimentos, definimos $\theta^L_{t'-t} = 1$, e apenas otimizamos o coeficiente da previsão de vento, $\theta^W_{t'-t}$.

Os resultados são mostrados na Figura 9.5, que mostram que melhoramos o desempenho em média em cerca de 30 por cento. O que é importante é que essa melhoria não vem acompanhada de nenhuma complexidade adicional na tomada de decisões em campo. A única etapa, que não descrevemos aqui, é que precisamos ajustar o vetor de parâmetros $\theta$. O processo de otimizar $\theta$ é, infelizmente, não fácil.

<figure class="book-figure">
  <img src="/assets/images/sdam/cfaenergyperformance.png" alt="Relative improvement of the deterministic lookahead with optimized theta versus using theta=1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 9.5.</span> Melhoria relativa do horizonte de previsão determinístico com $\theta_\tau$ otimizado versus o uso de $\theta_\tau = 1$.</figcaption>
</figure>

## O que aprendemos?

- Neste capítulo, apresentamos um problema de armazenamento de energia muito mais complexo com previsões contínuas.
- Apresentamos o "modelo martingale de evolução de previsão" que assume que as previsões do futuro evoluem ao longo do tempo, onde a mudança esperada em uma previsão é zero (mas a mudança real é positiva ou negativa).
- Em seguida, descrevemos um modelo semi-Markov oculto que nos ajuda a replicar "tempos de cruzamento" que capturam o tempo em que uma previsão está acima ou abaixo do valor real.
- Apresentamos uma política de horizonte de previsão determinística e, em seguida, um horizonte de previsão determinístico parametrizado, no qual introduzimos coeficientes para cada previsão (outro exemplo de um híbrido DLA/CFA).
- Mostramos que a política DLA/CFA ajustada supera o horizonte de previsão determinístico puro (não ajustado) em cerca de 30 por cento.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>O que significa o "modelo martingale de evolução de previsão"?</li>
<li>Toda a previsão no tempo $t$ para cada quantidade, como a carga $L_t$, $f^L_{tt'}$ para $t'=t, \ldots, t+H$, está na variável de estado. Por quê? [Dica: observe as equações de transição para as previsões e as variáveis que elas estão prevendo.]</li>
<li>Qual é a diferença entre as variáveis $x_t$, $t=0, \ldots, T$ e as variáveis $\xtilde_{tt'}$ para $t' = t, \ldots, t+H$?</li>
<li>O que é um "tempo de cruzamento"?</li>
<li>O que é uma "decomposição de Cholesky" e para que ela é usada?</li>
<li>Qual estado está oculto no modelo de Markov de estado oculto para energia eólica? Explique por que ele está oculto.</li>
<li>Que classe de política é a política de horizonte de previsão parametrizada acima? Qual função objetivo é usada para encontrar o melhor conjunto de parâmetros de ajuste?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Tente projetar uma política parametrizada para tomar decisões sob as condições do problema deste capítulo. Você pode usar qualquer coisa na forma de regras ou funções parametrizadas. A única limitação é que você não pode otimizar sobre nada (ou seja, você não pode usar um $\argmax_x$ dentro da sua política).</li>
<li>Nosso horizonte de previsão parametrizado se limitou a introduzir coeficientes na frente das previsões. Você também pode introduzir ajustes aditivos, como impedir que o dispositivo de armazenamento de energia fique muito próximo de sua capacidade (isso permitiria armazenar uma rajada de vento que excede a previsão) ou fique muito próximo de zero (caso haja uma queda no vento). Sugira uma parametrização alternativa e apresente um argumento sobre por que sua estrutura pode agregar valor.</li>
</ol>
{% endraw %}
