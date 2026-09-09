---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 8: Armazenamento de energia I"
permalink: /sdam/pt-BR/chapter-8/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 46e5d45993dd1cd0
---


{% raw %}
## Visão geral do capítulo

Este capítulo aborda o que inicialmente parece ser um problema de estoque bastante simples, que surge ao armazenar energia que podemos comprar ou vender para a rede elétrica, a qual apresenta preços altamente estocásticos. Em contraste com os seis primeiros capítulos, utilizamos um conjunto muito mais rico de modelos para descrever esses preços estocásticos, o que começa a sugerir a complexidade que podemos encontrar ao modelar a incerteza. Fornecemos um tour por diferentes modelos para processos de preços, incluindo modelos clássicos de séries temporais, modelos de difusão com saltos (para capturar picos), distribuições quantílicas e, por fim, um híbrido que combina distribuições quantílicas com distribuições normais padrão, abrindo caminho para o uso de métodos que dependem de normalidade.

Em seguida, descrevemos uma série de políticas, começando com uma política básica de "comprar barato, vender caro" (uma forma de aproximação de função de política), antes de fazer a transição para vários métodos baseados na aproximação da equação de Bellman, que vimos pela primeira vez no [Capítulo 5](/sdam/pt-BR/chapter-5/). Começamos com uma descrição básica da equação de Bellman (que é computacionalmente inviável para quase todos os problemas) e, em seguida, fornecemos um tour pelas variações conhecidas como programação dinâmica aproximada (ADP) regressiva, ADP progressiva e uma estratégia híbrida que utiliza ADP progressiva combinada com ajuste de parâmetros.

## Narrativa

Nova Jersey busca desenvolver 3.500 megawatts (MW) de geração de energia eólica offshore. Um desafio é que o vento (e especialmente o vento offshore) pode ser altamente variável. O efeito dessa variabilidade sobre a rede elétrica é ampliado pela propriedade de que a energia eólica (em faixas intermediárias) aumenta com o cubo da velocidade do vento. Essa variabilidade está representada na Figura 8.1.

<figure class="book-figure">
  <img src="/assets/images/sdam/windpower.png" alt="Potência de cinco níveis de capacidade de geração eólica." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.1.</span> Potência de cinco níveis de capacidade de geração eólica.</figcaption>
</figure>

A energia eólica se tornou popular em regiões onde o vento é intenso, como o meio-oeste dos Estados Unidos, regiões costeiras da Europa, o nordeste do Brasil e regiões do norte da China (para citar apenas algumas). Às vezes, comunidades (e empresas) investem em fontes renováveis (eólica ou solar) para ajudar a reduzir sua pegada de carbono e minimizar sua dependência da rede elétrica.

No entanto, é bastante raro que esses projetos permitam que uma comunidade elimine a rede elétrica de seu portfólio. A prática comum é deixar que a fonte renovável (eólica ou solar) venda diretamente para a rede, enquanto uma empresa pode comprar da rede. Isso pode ser útil como proteção (hedge), já que a empresa ganhará muito dinheiro durante os picos de preço (os preços podem saltar de ＄20 por megawatt-hora (mwh) para ＄300 por mwh ou mais), o que compensa o custo de comprar energia durante esses períodos.

A principal dificuldade com as fontes renováveis é lidar com a variabilidade. Embora uma solução seja simplesmente injetar qualquer energia proveniente de uma fonte renovável na rede e usar a capacidade da rede para lidar com essa variabilidade, tem havido considerável interesse em usar armazenamento (em particular, armazenamento em baterias) para suavizar os picos e vales. Além de suavizar a variabilidade na fonte renovável, também tem havido interesse em usar baterias para aproveitar os picos de preço, comprando energia quando ela está barata (os preços podem até ficar negativos) e revendendo-a quando estão altos. Explorar a variabilidade nos preços de energia na rede para comprar quando os preços estão baixos e vender quando estão altos é conhecido como arbitragem de baterias.

<figure class="book-figure">
  <img src="/assets/images/sdam/storagegrid.jpg" alt="Sistema de rede para armazenamento para estabilização de energia e arbitragem de baterias." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.2.</span> Sistema de rede para armazenamento para estabilização de energia e arbitragem de baterias.</figcaption>
</figure>

Vamos usar a configuração mostrada na Figura 8.2 para ilustrar uma série de questões de modelagem e algorítmicas em armazenamento de energia. Esse problema fornecerá insights sobre praticamente qualquer problema de estoque/armazenamento, incluindo:

- Manter caixa em fundos mútuos – Um banco precisa determinar quanto de seu capital de investimento deve manter em caixa para atender a solicitações de resgate, versus investir o dinheiro em empréstimos, ações e títulos.
- Varejistas (tanto online quanto lojas físicas) precisam gerenciar estoques de centenas de milhares de produtos.
- Concessionárias de automóveis precisam decidir quantos carros manter para atender à demanda dos clientes.
- Empresas de consultoria precisam decidir quantos funcionários manter no quadro para atender à demanda variável de diferentes projetos de consultoria.

O armazenamento de energia é uma forma particularmente rica de problema de estoque. Embora não vamos considerar todas as variações possíveis (que são infinitas), nosso problema exibirá as seguintes características:

- Os preços de eletricidade na rede podem ser altamente voláteis. No início dos anos 2000, os preços típicos de energia giravam em torno de ＄20-＄25 por mwh, mas frequentemente saltavam para mais de ＄300, podendo exceder ＄1000, tipicamente durante eventos climáticos extremos.
- A energia eólica pode ser prevista, embora não muito bem. Previsões contínuas (rolling forecasts) estão disponíveis para atualizar essas estimativas.
- A energia solar exibe três tipos de variabilidade: o processo altamente previsível do ciclo diurno do nascer e pôr do sol, a presença de dias muito ensolarados ou muito nublados (esses geralmente podem ser previstos com um dia ou mais de antecedência) e a variabilidade de nuvens localizadas, que são difíceis de prever mesmo com apenas uma hora de antecedência, mas que podem criar picos severos de energia na rede.
- A demanda por energia é variável, mas relativamente previsível, já que depende principalmente da temperatura (e, em menor grau, da umidade).
- A energia pode ser comprada ou vendida para a rede aos preços atuais da rede. Da mesma forma, a energia proveniente da fonte renovável pode ser usada para satisfazer a carga atual (demanda por energia), armazenada ou revendida para a rede (dependendo da configuração).
- Há uma perda de aproximadamente 5 a 10 por cento na conversão de energia de CA (como ela chega pela rede) para CC (necessária para armazenar energia na bateria).

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Desejamos minimizar o preço esperado que pagamos pela eletricidade comprada da rede.
- **Decisões:** A quantidade de energia que compramos em cada período de tempo da rede, ou revendemos para a rede.
- **Incertezas:** O preço da eletricidade em cada período de tempo.

## Modelo básico

Vamos usar uma sequência de variações desse problema para ilustrar diferentes questões de modelagem, começando com um sistema básico de uso de uma bateria para comprar e vender para a rede, a fim de aproveitar a volatilidade dos preços. Para essa aplicação, vamos avançar em incrementos de tempo de 5 minutos, já que essa é a frequência com que os preços são atualizados na rede (esse incremento de tempo varia dependendo do operador da rede).

### Variáveis de estado

Para nosso modelo básico, precisamos apenas acompanhar duas variáveis: $R_t$, a quantidade de energia (medida em megawatts-hora, ou mwh) armazenada na bateria no tempo $t$; e $p_t$, o preço da energia na rede. Nossa variável de estado é então

$$
S_t = (R_t, p_t).
$$

A variável de estado rapidamente se torna mais complexa à medida que adicionamos diferentes elementos ao modelo. Por exemplo, a variável de estado que representa os preços depende de como modelamos o processo de preços, conforme descrito na função de transição (veja abaixo).

### Variáveis de decisão

Nossa única decisão é se compramos da rede ou vendemos para a rede: $x_t$, a quantidade de energia comprada de ($x_t > 0$) ou vendida para ($x_t < 0$) a rede.

Quando transferimos energia para dentro ou para fora da bateria, vamos assumir que obtemos apenas uma fração $\eta$ na transferência, implicando uma perda de $1-\eta$. Para simplificar, vamos assumir que essa perda é a mesma, independentemente de estarmos carregando ou descarregando a bateria.

A decisão é limitada pela capacidade da bateria, o que significa que temos que observar as restrições

$$
x_t \leq \frac{1}{\eta} (R^{max} - R_t), \qquad x_t \geq -\eta R_t,
$$

onde a primeira restrição se aplica quando estamos comprando da rede ($x_t > 0$), enquanto a segunda restrição se aplica quando estamos vendendo para a rede ($x_t < 0$).

Como sempre, assumimos que as decisões são tomadas com uma política $X^\pi(S_t)$, a ser determinada abaixo.

### Informação exógena

Em nosso modelo básico, a única informação exógena é a mudança nos preços. Podemos assumir que o preço em cada período de tempo é revelado, sem qualquer modelo para prever o preço com base em preços passados. Nesse caso, nossa informação exógena $W_t$ seria

$$
W_{t+1} = p_{t+1}.
$$

Alternativamente, podemos assumir que observamos a mudança de preço $\phat_t = p_t - p_{t-1}$, caso em que escreveríamos

$$
W_{t+1} = \phat_{t+1}.
$$

### Função de transição

A evolução das variáveis de estado é dada por

$$
\begin{align}
R_{t+1} &= \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases} \label{eq:energytransition1}\\
p_{t+1} &= p_t + \phat_{t+1}. \label{eq:energytransition2}
\end{align}
$$

Esse estilo de modelar o processo de preços "observando" a mudança de preço nos ajuda ao escrever a função de transição. Na prática, tipicamente estaríamos observando $p_{t+1}$ diretamente (em vez da mudança), caso em que não há necessidade de uma equação de transição explícita. Essas duas equações compõem nossa função de transição $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.

Mais adiante, vamos achar útil modelar o estado pós-decisão $S^x_t$, que é o estado logo após tomarmos uma decisão $x_t$, mas antes de qualquer nova informação chegar. O estado de recurso pós-decisão é

$$
R^x_t = \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases}
$$

Como a variável de armazenamento evolui de forma determinística, a transição para o próximo estado pré-decisão é apenas

$$
R_{t+1} = R^x_t.
$$

O preço $p_t$, por outro lado, não é afetado pela decisão, então o preço pós-decisão seria apenas

$$
p^x_t = p_t.
$$

Isso significa que o estado pós-decisão é

$$
S^x_t = (R^x_t, p_t).
$$

### Função objetivo

Em qualquer período, a quantidade de dinheiro que ganhamos ou perdemos é dada por

$$
C(S_t,x_t) = -p_t x_t.
$$

Nossa função objetivo é então o problema canônico dado por

$$
\max_\pi \E \sum_{t=0}^T -p_t X^\pi(S_t),
$$

onde $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ é dado pelas equações $\eqref{eq:energytransition1}$ e $\eqref{eq:energytransition2}$. Precisamos então também especificar o estado inicial $S_0$ (isto é, $R_0$ e $p_0$) e ter um método para gerar $W_1, W_2, \ldots$, que descrevemos a seguir.

## Modelando a incerteza

Em nosso problema de venda de ativos no [Capítulo 2](/sdam/pt-BR/chapter-2/), assumimos que poderíamos modelar preços de acordo com

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

onde então assumimos que $\varepsilon_{t+1}$ era normalmente distribuído com média 0 e alguma variância conhecida. A Figura 8.3 mostra preços da rede, conhecidos como "preços marginais locacionais" (ou LMPs na terminologia da comunidade de energia) ao longo de um ano, o que ilustra a tremenda volatilidade que os preços na rede exibem. Essa volatilidade surge porque há surtos na carga (ou perdas de energia) que podem criar escassezes de curto prazo. Como a demanda é inelástica (espera-se que a rede atenda 100 por cento da carga), os preços podem saltar por um fator de 20 a 50 por curtos períodos (os preços são atualizados em incrementos de 5 minutos).

<figure class="book-figure">
  <img src="/assets/images/sdam/pjmlmp.png" alt="Preços marginais locacionais para a rede PJM (em intervalos de 5 minutos) para 2010." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.3.</span> Preços marginais locacionais para a rede PJM (em intervalos de 5 minutos) para 2010.</figcaption>
</figure>

Existem vários métodos para modelar preços de eletricidade. Abaixo vamos descrever quatro que têm sido usados para esse problema.

### Modelos de séries temporais

A literatura de séries temporais é bastante rica, então vamos apenas ilustrar um modelo básico que representa o preço $p_{t+1}$ como uma função do histórico recente de preços. Para ilustração, vamos usar os últimos três períodos de tempo, o que significa que escreveríamos nosso modelo como

$$
\begin{align}
p_{t+1} &= \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}, \label{eq:energytimeseriesmodel}\\
        &= \thetabar^T_t \phi_t + \varepsilon_{t+1}, \nonumber
\end{align}
$$

onde

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \\ p_{t-2} \end{pmatrix}
$$

é nosso vetor de preços. Assumimos que o ruído $\varepsilon \sim N(0,\sigma^2\_\epsilon)$ para um dado $\sigma^2\_\epsilon$.

O vetor de coeficientes $\thetabar_t = (\thetabar_{t0},\thetabar_{t1},\thetabar_{t2})^T$ pode ser estimado recursivamente. Suponha que começamos com uma estimativa inicial $\thetabar_0$ do vetor de coeficientes. Também vamos precisar de uma matriz três por três $M_0$ que, por enquanto, podemos assumir ser uma matriz identidade escalada (fornecemos uma ideia melhor abaixo).

A equação básica de atualização para $\thetabar_t$ é dada por

$$
\thetabar_{t+1} = \thetabar_t - H_t\phi_t \varepsilon_{t+1},
$$

O erro $\hat{\varepsilon}\_t$ é calculado usando

$$
\varepsilon_{t+1} = \thetabar^T_{t}\phi_t - p_{t+1}.
$$

A matriz três por três $H_t$ é calculada usando

$$
H_t=\frac{1}{\gamma_t}M_t,
$$

onde a matriz $M_t$ é calculada recursivamente usando

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}).
$$

A variável $\gamma_t$ é um escalar calculado usando

$$
\gamma_t = 1 + (\phi_t)^TM_{t-1}\phi_t.
$$

Essas equações precisam de estimativas iniciais para $\thetabar_0$ e $M_0$. Uma forma de fazer isso é coletar alguns dados iniciais e então resolver um problema de estimação estática. Suponha que você observe $K$ preços. Seja $Y_0$ um vetor coluna de $K$ elementos dos preços observados $p_3, p_4, \ldots, p_{K+3-1}$ (temos que começar com o terceiro preço por causa da necessidade dos três preços anteriores em nosso modelo).

Em seguida, seja $X_0$ uma matriz com $K$ linhas, onde cada linha consiste em $p_k, p_{k-1}, p_{k-2}$. Nossa melhor estimativa de $\thetabar$ é dada pelas equações normais

$$
\thetabar_0 = [(X_0)^T X_0]^{-1} (X_0)^T Y_0.
$$

Por fim, seja $M_0 = [(X_0)^T X_0]^{-1}$, o que mostra que a matriz $M_t$ é a estimativa no tempo $t$ de $[(X_t)^T X_t]^{-1}$.

Existem famílias inteiras de modelos de séries temporais que capturam a relação de variáveis ao longo do tempo. Se aplicássemos esses métodos diretamente aos dados de preços, os resultados seriam bastante ruins. Primeiro, os preços não são normalmente distribuídos. Segundo, embora os preços possam se tornar negativos, isso é relativamente raro. No entanto, uma aplicação direta desse modelo provavelmente produziria preços negativos se a variância $\sigma^2\_\epsilon$ fosse calibrada para o alto ruído desse tipo de dado. Por fim, o comportamento dos saltos nos preços ao longo do tempo não seria realista.

### Difusão com saltos

Uma crítica importante ao modelo linear acima é que ele não captura bem os grandes picos que são comuns no estudo dos preços de eletricidade. Uma ideia simples para superar essa limitação é usar o que é conhecido como um *modelo de difusão com saltos (jump diffusion)*, no qual adicionamos outro termo de ruído à equação $\eqref{eq:energytimeseriesmodel}$, obtendo

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1} + \mathbb{I}_t \varepsilon^J_{t+1}.
$$

Aqui, a variável indicadora $\mathbb{I}\_t = 1$ ocorre com alguma probabilidade $p^{jump}$, e o ruído $\varepsilon^J_{t+1}$ é normalmente distribuído com média $\mu^{jump}$ (que é tipicamente muito maior que zero) e variância $(\sigma^{jump})^2$, que é bastante grande.

Precisamos estimar a probabilidade de salto $p^{jump}$, e a média e a variância $(\mu^{jump}, (\sigma^{jump})^2)$. Isso é feito começando com um modelo básico onde $p^{jump} = 0$. Usamos esse modelo básico para estimar $\sigma^2\_\epsilon$. Em seguida, escolhemos alguma tolerância, como três desvios-padrão (isto é, $3 \sigma_\epsilon$), e quaisquer observações fora desse intervalo são atribuídas a uma fonte diferente de ruído. Seja $p^{jump}$ a fração de períodos de tempo em que essas observações ocorrem. Então, calculamos a média e o desvio-padrão dessas observações para obter $(\mu^{jump}, (\sigma^{jump})^2)$.

Não paramos por aqui. Depois de retirar essas variações extremas dos dados, devemos reajustar nosso modelo linear sem essas observações. A prática padrão é repetir esse processo várias vezes até que essas estimativas parem de mudar.

Modelos de difusão com saltos fazem um trabalho melhor ao reproduzir as caudas, mas ainda dependem do comportamento da cauda da distribuição normal. Um ajuste melhor pode ser obtido reconhecendo que a variância do ruído depende da temperatura, e particularmente de temperaturas extremas. Podemos agrupar as temperaturas em três faixas: abaixo do congelamento, acima de 90 graus Fahrenheit, e entre esses dois valores. Introduzir a dependência da temperatura, embora adicione mais uma variável ao conjunto de variáveis de estado, introduz um grau adicional de complexidade (o efeito disso depende da classe de política).

### Distribuições de quantis

Embora possa ser possível ajustar outras distribuições paramétricas, uma estratégia poderosa é calcular numericamente a distribuição cumulativa a partir dos dados, criando o que é frequentemente chamado de *distribuição de quantis*. Para calcular isso, simplesmente ordenamos os preços do menor para o maior. Denotamos essa sequência ordenada por $\ptilde_t$, onde $\ptilde_{t-1} \leq \ptilde_t$. Seja $T = 105,210$ o número de períodos de tempo de 5 minutos em um ano. A porcentagem de períodos de tempo com um preço menor que $\ptilde_t$ é então $t/T$. Podemos criar uma distribuição cumulativa usando

$$
F_P(\ptilde_t) = \frac{t}{T},
$$

que é ilustrada na Figura 8.4.

<figure class="book-figure">
  <img src="/assets/images/sdam/cdfprices.png" alt="Distribuição de quantis dos preços." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 8.4.</span> Distribuição de quantis dos preços.</figcaption>
</figure>

Podemos criar uma distribuição contínua $F_P(p)$ para qualquer $p$ encontrando o maior $\ptilde_t < p$ e definindo $F_P(p)$ igual a esse valor, criando uma função escada. A função $F_P(p)$ é uma forma de distribuição *não paramétrica*, já que não estamos ajustando a distribuição a nenhuma forma paramétrica conhecida. A boa notícia é que ela corresponderá perfeitamente aos dados, o que significa que representaremos com precisão as caudas extremas que ocorrem nos preços de eletricidade. A desvantagem é que precisamos de um bom conjunto de dados para criar essas distribuições, e temos que manter o conjunto de dados para calcular a distribuição, em vez de apenas armazenar um pequeno número de parâmetros, como faríamos se ajustássemos um modelo paramétrico para a distribuição.

Podemos amostrar dessa distribuição gerando uma variável aleatória $U$ uniformemente distribuída entre 0 e 1. Digamos que geramos $U= 0.70$. Então queremos encontrar o preço $p^{.70}$ que corresponde a $F_P(p^{.70}) = 0.70$, como ilustrado na Figura 8.4. Escrevemos isso matematicamente definindo a função inversa $F^{-1}\_P(u)$, que retorna o preço $p$ que produz $F_P(p) = u$. Podemos amostrar repetidamente de nossa distribuição de preços apenas amostrando a variável aleatória uniforme $U$ e então observando um preço $p=F^{-1}\_P(U)$.

### Série temporal híbrida com dados transformados

Uma estratégia poderosa é combinar o uso de distribuições empíricas com métodos clássicos de séries temporais. Começamos ajustando uma distribuição empírica aos dados de preços, obtendo a distribuição cumulativa $F_P(p)$. Agora, seja $p_t$ um preço e calcule $u_t = F_P(p_t)$, onde $0\leq u_t \leq 1$. Em seguida, seja $\Phi(z)$ a distribuição cumulativa de uma variável aleatória normal padrão $Z \sim N(0,1)$, e seja $\Phi^{-1}(u)$ sua inversa. Em seguida, seja $z_t = \Phi^{-1}(u_t)$. O processo de mapeamento $p_t \rightarrow u_t \rightarrow z_t$ é ilustrado na Figura 8.5.

<figure class="book-figure">
  <img src="/assets/images/sdam/normaltoanything.png" alt="Transformando uma distribuição empírica em uma distribuição normal (e de volta)." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 8.5.</span> Transformando uma distribuição empírica em uma distribuição normal (e de volta).</figcaption>
</figure>

Podemos usar esse método para transformar os preços altamente não normais $p_t$ na sequência $z_t$ de valores que são normalmente distribuídos com média 0 e variância 1, onde também podemos capturar correlações. Podemos então realizar qualquer modelagem de série temporal na sequência $z_t$. Depois disso, quaisquer estimativas provenientes desse modelo normalizado podem ser transformadas de volta em preços percorrendo o caminho da Figura 8.5 na direção inversa: $u_t = \Phi(z_t)$, e então $p_t = F^{-1}\_P(u_t)$.

Essa estratégia é muito eficaz ao lidar com dados que não são normalmente distribuídos, e apresenta desempenho muito melhor do que o modelo de difusão com saltos, que é popular em finanças.

## Projetando políticas

Vamos ilustrar a resolução deste problema usando duas classes de políticas, além de uma híbrida:

- **Busca de política** – Vamos usar uma política parametrizada simples de comprar-na-baixa, vender-na-alta. Isso pertence à classe de políticas PFA (aproximações de função de política).
- **Política de horizonte de previsão** – Usaremos a equação de Bellman para produzir uma aproximação de função de valor que aproxima o impacto de uma decisão agora sobre o futuro. Isso pertence à classe de políticas VFA (políticas baseadas em aproximações de função de valor).
- **Política híbrida** – Por fim, vamos introduzir uma classe de política ajustável que começa com uma política baseada em funções de valor, e depois muda para busca de política para ajustar ainda mais a política. Isso começará como uma política VFA, mas então transicionará para uma aproximação de função de custo (CFA) paramétrica quando usarmos busca de política para ajustar os parâmetros do que começou como a aproximação de função de valor.

Políticas baseadas na equação de Bellman requerem calcular (ou aproximar) o valor $V_{t+1}(S_{t+1})$ resultante de estar em um estado $S_t$, tomar uma decisão $x_t$, e então observar a informação exógena aleatória $W_{t+1}$. Vimos esses métodos pela primeira vez no contexto de problemas de caminho mais curto. Uma diferença significativa agora é que o estado $S_{t+1}$ é aleatório dado $S_t$ e $x_t$ (no problema de caminho mais curto, apenas o custo $\chat_t$ era aleatório). Além disso, nossa variável de estado agora tem duas dimensões contínuas, em vez de apenas o nó discreto.

Primeiro descrevemos a política de comprar-na-baixa, vender-na-alta, e depois introduzimos três métodos baseados na aproximação da equação de Bellman:

- Programação dinâmica retroativa clássica, que produz uma política ótima.
- Programação dinâmica aproximada retroativa.
- Programação dinâmica aproximada progressiva.

Terminamos com uma descrição de uma política híbrida que combina aproximações de função de valor da equação de Bellman com uma forma de busca de política.

### Comprar-na-baixa, vender-na-alta

Uma política de comprar-na-baixa, vender-na-alta funciona com o princípio simples de carregar a bateria quando o preço cai abaixo de um limite inferior, e vender quando o preço sobe acima de um limite superior. A política pode ser escrita como

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t \leq \theta^{buy}, \\ 0 & \text{if } \theta^{buy} < p_t < \theta^{sell}, \\ +1 & \text{if } p_t \geq \theta^{sell}. \end{cases}
$$

Agora temos que ajustar $\theta = (\theta^{buy}, \theta^{sell})$. Avaliamos nossa política seguindo uma trajetória amostral de preços $p_t(\omega)$ (ou podemos estar observando as mudanças nos preços $\phat(\omega)$). Assumindo que estamos gerando trajetórias amostrais a partir de um modelo matemático, podemos gerar trajetórias amostrais $\omega^1, \ldots, \omega^N$. Podemos então simular o desempenho da política ao longo de cada trajetória amostral e calcular uma média usando

$$
\Fbar^{low-high} = \frac{1}{N} \sum_{n=1}^N C\big(S_t(\omega^n),X^{low-high}(S_t(\omega^n)\vert \theta)\big).
$$

Ajustar $\theta$ requer resolver o problema

$$
\begin{align}
\max_\theta \Fbar^{low-high}(\theta\vert S_0). \label{eq:buylowpolicysearch}
\end{align}
$$

Como $\theta$ tem apenas duas dimensões, uma estratégia é fazer uma busca em grade completa discretizando cada dimensão, e então buscar em todos os valores possíveis das duas dimensões. Uma discretização comum é dividir uma região em incrementos de 5%. Incluindo os limites, isso significa que temos que representar 21 valores de cada parâmetro, criando uma grade de tamanho 441 pontos, o que é gerenciável (embora não trivial) para a maioria dos problemas.

Notamos que uma busca em grade por força bruta só funciona se executarmos simulações $N$ suficientes para que a variância na estimativa $\Fbar^\pi(\theta)$ seja relativamente pequena. No entanto, temos métodos para realizar a busca de $\theta$ mesmo com estimativas ruidosas do desempenho da política, conforme apresentado no [Capítulo 7](/sdam/pt-BR/chapter-7/).

Veremos o problema de otimização dado por $\eqref{eq:buylowpolicysearch}$ repetidamente, já que as políticas mais simples sempre apresentam parâmetros ajustáveis. O problema $\eqref{eq:buylowpolicysearch}$ pode ser resolvido usando métodos baseados em derivadas se formos capazes de calcular (ou aproximar) derivadas de $\Fbar^{low-high}(\theta\vert S_0)$ em relação a $\theta$. Quando isso não é possível, temos que usar métodos livres de derivadas, que é precisamente o problema que enfrentamos no [Capítulo 2](/sdam/pt-BR/chapter-2/).

### Programação dinâmica retroativa

A programação dinâmica retroativa envolve resolver diretamente a equação de Bellman

$$
\begin{align}
V_t(s_t) = \max_{x_t} \left(C_t(s,x_t)+  \E\{V_{t+1}(S_{t+1})\vert S_t,x_t\} \right), \label{eq:energystoragebellman}
\end{align}
$$

onde $S_{t+1} = S^M(s_t,x_t,W_{t+1})$, e onde a esperança é sobre a variável aleatória $W_{t+1}$. Suponha que $W_{t+1}$ seja discreta, assumindo valores em $\Wcal = \lbrace w_1, w_2, \ldots, W_M\rbrace $, e represente a distribuição de probabilidade usando

$$
f^W(w\vert s_t,x_t) = Prob[W_{t+1} = w\vert s_t,x_t].
$$

Escrevemos a distribuição como dependente do estado $s_t$ e da decisão $x_t$, mas isso depende do problema. Por exemplo, podemos razoavelmente supor que a mudança no preço $p_{t+1}-p_t$ depende do preço atual $p_t$ (se os preços estão muito altos, é mais provável que caiam), o que seria uma razão para condicionar em $s_t$. Podemos até precisar da dependência em $x_t$ se a compra de uma grande quantidade de eletricidade da rede elevar os preços.

Podemos então reescrever a equação $\eqref{eq:energystoragebellman}$ como

$$
V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right).
$$

Uma implementação simples da programação dinâmica retroativa apresenta quatro loops:

1. O loop retrocedendo no tempo de $T$ até o tempo $0$.
2. O loop sobre todos os estados possíveis $s_t\in\Scal$ (mais precisamente, este é o conjunto de valores possíveis da variável de estado $S_t$ no tempo $t$).
3. O loop que seria necessário para buscar entre todas as decisões possíveis $x_t$ a fim de resolver o problema de maximização.
4. O loop sobre todos os valores possíveis da variável aleatória $W$ que é capturado no somatório necessário para calcular $V_t(s)$.

<div class="book-algorithm">
<p><strong>Programação dinâmica regressiva</strong></p>
<p><strong>Passo 0. Inicialização:</strong> Inicialize a contribuição terminal $V_{T+1}(S_{T+1})=0$ para todos os estados $S_{t+1}$.</p>
<p><strong>Passo 1.</strong> Faça para $t=T, T-1, \ldots, 1, 0$:</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2.</strong> Para todos $s\in\Scal$, calcule</p>
<p style="margin-left: 1.5rem;">$$V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right)$$</p>
</div>

É útil considerar a faixa de valores que cada laço pode assumir. Para um problema de energia, poderíamos otimizar um dispositivo de armazenamento em incrementos horários ao longo de um dia, o que nos dá 24 passos de tempo. Se usarmos passos de tempo de 5 minutos (alguns operadores de rede atualizam preços a cada 5 minutos), então um horizonte de 24 horas implicaria 288 períodos de tempo (multiplique por sete se quisermos planejar ao longo de uma semana). Se estivermos fazendo regulação de frequência, então temos que tomar decisões a cada 2 segundos, o que se traduz em 43.200 períodos de tempo ao longo de um dia.

Nossa variável de estado consiste em $S_t = (R_t,p_t)$, o que significa que temos que substituir o laço sobre todos os estados por laços aninhados sobre todos os valores de $R_t$, e depois todos os valores de $p_t$. Como ambos são contínuos, cada um terá que ser discretizado. A variável de recurso $R_t$ teria que ser dividida em incrementos com base em quanto poderíamos carregar ou descarregar em um único incremento de tempo. Precisamos então discretizar o preço da rede $p_t$. Os preços da rede podem chegar a valores tão baixos quanto -＄100, e tão altos quanto ＄10.000 (em casos extremos). Uma estratégia razoável poderia ser construir uma distribuição empírica, e então representar os preços correspondentes, digamos, a cada incremento de dois por cento da distribuição cumulativa, o que nos dá 50 preços possíveis.

O número de decisões de carga-descarga pode ser tão pequeno quanto três (carregar, descarregar ou não fazer nada), ou muito maior se pudermos carregar ou descarregar em diferentes taxas.

Finalmente, a distribuição de probabilidade $f^W(w)$ seria a distribuição das mudanças aleatórias nos preços, $\phat_{t+1}$. Novamente, recomendamos construir uma distribuição empírica das mudanças em $\phat_{t+1}$ e depois discretizar a distribuição cumulativa em incrementos de, digamos, dois por cento.

Se tivermos uma variável de estado bidimensional (como é o caso do nosso modelo básico), então já temos cinco laços (tempo, as duas variáveis de estado, o operador max sobre $x$, e depois a soma sobre os resultados de $W$). Isso pode se tornar caro, e mal começamos. Agora imagine que estamos usando o modelo de série temporal na equação $\eqref{eq:energytimeseriesmodel}$, onde agora temos que acompanhar os preços $(p_t, p_{t-1}, p_{t-2})$. Nesse caso, nossa variável de estado seria

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Nesse caso, agora teríamos sete laços aninhados. Embora a complexidade dependa da discretização das variáveis contínuas, executar esse algoritmo de programação dinâmica regressiva poderia facilmente exigir um ano (ou mais).

Dada a dificuldade de usar a equação de Bellman, mesmo para esse problema relativamente simples, é surpreendente que essa abordagem específica ainda seja ensinada em aulas. Dada a complexidade, houve extensa pesquisa em métodos que aproximam a equação de Bellman, que foram agrupados sob nomes como *programação dinâmica aproximada* e *aprendizado por reforço*. Vamos descrever duas estratégias para aproximar a equação de Bellman conhecidas como ADP regressivo e ADP progressivo.

### Programação dinâmica aproximada regressiva

Uma estratégia algorítmica poderosa é conhecida como "programação dinâmica aproximada regressiva". Essa abordagem progride exatamente como fizemos acima, com uma diferença. Em vez de fazer um laço sobre todos os estados, escolhemos uma amostra aleatória $\Shat$. Em seguida, calculamos o valor de estar no estado $s\in\Shat$ exatamente como fizemos originalmente, e calculamos o valor correspondente $\vhat$. Suponha que repetimos isso $N$ vezes e adquirimos um conjunto de dados $(\shat^n, \vhat^n), n=1, \ldots, N$. Usamos então isso para ajustar um modelo estatístico, como o modelo linear dado por:

$$
\begin{align}
\Vbar(s) = \theta_0 + \theta_1 \phi_1(s) + \theta_2 \phi_2(s) + \ldots + \theta_F \phi_F(s), \label{eq:energylinearvfa}
\end{align}
$$

onde $\phi_f(s), f=1, \ldots, F$ é um conjunto de características apropriadamente escolhidas. Exemplos de características podem ser

$$
\begin{align*}
\phi_1(s) &= R_t, \\
\phi_2(s) &= R^2_t, \\
\phi_3(s) &= p_t, \\
\phi_4(s) &= p^2_t, \\
\phi_5(s) &= p_{t-1}, \\
\phi_6(s) &= p_{t-2}, \\
\phi_7(s) &= R_t p_t.
\end{align*}
$$

Observe que, com um termo constante $\theta_0$, esse modelo tem apenas oito coeficientes a serem estimados. Amostrar algumas centenas de estados deveria ser mais do que suficiente para obter uma boa aproximação estatística. Essa metodologia é relativamente insensível ao número de variáveis de estado, e é claro que não há problema se alguma das variáveis for contínua.

Um desafio sempre que usamos um modelo paramétrico como o modelo linear acima é que temos que especificar as características $\phi_f(S_t)$. À medida que as redes neurais se tornaram populares, os pesquisadores começaram a usar essa abordagem, incluindo redes neurais profundas que podem exigir a estimativa de milhões de parâmetros. A vantagem dessa abordagem é que ela remove a necessidade de especificar a estrutura do modelo, mas o preço é que você precisa de muito mais observações. Redes neurais profundas oferecem a propriedade atraente de poder aproximar qualquer função, mas isso também significa que elas podem modelar ruído. As redes neurais também têm dificuldade em replicar estruturas conhecidas do problema, como monotonicidade (quanto maior o estoque, maior o valor) ou convexidade.

Descobrimos que o ADP regressivo funciona excepcionalmente bem em um pequeno conjunto de problemas (veja *Reinforcement Learning and Stochastic Optimization*, Seção 15.4, para um resumo de comparações do ADP regressivo com referências de desempenho), mas não há garantias, e seu desempenho claramente depende da escolha de um conjunto eficaz de características. Em uma aplicação, reduzimos um tempo de execução de 30 dias para um algoritmo MDP regressivo padrão, para 20 minutos, com uma solução que estava dentro de 5 por cento do ótimo (produzido pela execução de um mês). Mas, novamente, não há garantias desse desempenho.

### Programação dinâmica aproximada progressiva

A programação dinâmica aproximada progressiva funciona de maneira intuitiva. Imagine que começamos com uma aproximação de função de valor $\Vbar^{x,n-1}\_t(S^x_t)$ em torno do estado pós-decisão $S^x_t$ que calculamos a partir das primeiras $n-1$ iterações do nosso algoritmo. Introduzimos pela primeira vez a ideia de estados pós-decisão no [Capítulo 1](/sdam/pt-BR/chapter-1/), mas esse é o estado imediatamente após tomarmos uma decisão, mas antes que qualquer nova informação tenha chegado.

Agora, imagine que estamos em um estado particular $S^n_t$ durante a $n$ª iteração do nosso algoritmo, seguindo um caminho amostral $\omega^n$ que guia a amostragem à medida que avançamos no tempo. Suponha que temos uma função $S^{x,n}\_t = S^{M,x}(S^n_t,x)$ que nos leva ao estado pós-decisão. Para o nosso problema de energia onde $S^n_t = (R^n_t,p^n_t)$, o estado pós-decisão seria

$$
S^{x,n} = (R^n_t+x^n_t, p^n_t).
$$

Em seguida, tomamos uma decisão usando

$$
x^n_t = \argmax_x \big(C(S^n_t,x) + \Vbar^{x,n-1}_t(S^{x,n}) \big).
$$

Dado $S^n_t$ e nossa decisão $x^n_t$, amostramos então $W_{t+1}(\omega^n)$ que se traduz na mudança nos preços $\phat^n_{t+1}$. Então simulamos nosso caminho até o próximo estado

$$
S^n_{t+1} = (R^n_t+x^n_t, p^n_t + \phat^n_{t+1}(\omega)).
$$

Assim, estamos apenas simulando nosso caminho para frente no tempo, o que significa que não nos importamos com quão complexa seja a variável de estado. Existem diferentes estratégias para atualizar a aproximação de função de valor $\Vbar^{n-1}\_t$:

<div class="book-algorithm">
<p><strong>Programação dinâmica aproximada progressiva</strong></p>
<p><strong>Passo 0. Inicialização:</strong> Inicialize $V^{\pi,0}_t,~t\in\Tcal$. Defina $n = 1$. Inicialize $S^1_0$.</p>
<p><strong>Passo 1.</strong> Faça para $n = 1, 2, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2.</strong> Faça para $m = 1, 2, \ldots, M$:</p>
<p style="margin-left: 3rem;"><strong>Passo 3.</strong> Escolha um caminho amostral $\omega^m$.</p>
<p style="margin-left: 3rem;"><strong>Passo 4.</strong> Inicialize $\vhat^m = 0$.</p>
<p style="margin-left: 3rem;"><strong>Passo 5.</strong> Faça para $t = 0, 1, \ldots, T$:</p>
<p style="margin-left: 4.5rem;"><strong>Passo 5a.</strong> Resolva:</p>
<p style="margin-left: 4.5rem;">$$x^{n,m}_t = \argmax_{x_t\in\Xcal^{n,m}_t} \big(C_t(S^{n,m}_t,x_t) + V^{\pi,n-1}_t(S^{M,x}(S^{n,m}_t,x_t))\big)$$</p>
<p style="margin-left: 4.5rem;"><strong>Passo 5b.</strong> Calcule:</p>
<p style="margin-left: 4.5rem;">$$S^{x,n,m}_t = S^{M,x}(S^{n,m}_t,x^{n,m}_t), \qquad S^{n,m}_{t+1} = S^M(S^{x,n,m}_t,x^{n,m},W_{t+1}(\omega^m)).$$</p>
<p style="margin-left: 3rem;"><strong>Passo 6.</strong> Faça para $t = T-1,\ldots, 0$:</p>
<p style="margin-left: 4.5rem;"><strong>Passo 6a.</strong> Acumule o custo do caminho (com $\vhat^m_{T} = 0$):</p>
<p style="margin-left: 4.5rem;">$$\vhat^m_t = C_t(S^{n,m}_t,x^m_t) + \vhat^m_{t+1}$$</p>
<p style="margin-left: 4.5rem;"><strong>Passo 6b.</strong> Atualize o valor aproximado da política começando no tempo $t$:</p>
<p style="margin-left: 4.5rem;">$$\Vbar^{n,m}_{t-1} \leftarrow U^V(\Vbar^{n,m-1}_{t-1}, S^{x,n,m}_{t-1}, \vhat^m_t)$$</p>
<p style="margin-left: 4.5rem;">onde tipicamente usamos $\step_{m-1} = 1/m$.</p>
<p style="margin-left: 1.5rem;"><strong>Passo 7.</strong> Atualize a função de valor da política $V^{\pi,n}_t(S^x_t) = \Vbar^{n,M}_t(S^x_t)$ para todos $t = 0, 1, \ldots, T$.</p>
<p><strong>Passo 8.</strong> Retorne as funções de valor $(V^{\pi,N}_t)_{t=1}^T$.</p>
</div>

Isso deixa a atualização real em uma função de atualização $U^V(\cdot)$, uma vez que isso depende de como estamos aproximando a função de valor.

A programação dinâmica aproximada progressiva é atraente porque escala para problemas de alta dimensão. Em nenhum momento fazemos um laço sobre todos os estados ou resultados possíveis. De fato, podemos até lidar com decisões de alta dimensão $x$ se aproximarmos a função de valor apropriadamente, de modo que possamos aproveitar algoritmos poderosos. No entanto, o ADP progressivo (assim como o ADP regressivo) possui poucas garantias de desempenho.

### Uma política híbrida de busca de política e VFA

De qualquer forma que escolhamos aproximar a função de valor, nossa política é dada por

$$
X^{VFA}(S_t) = \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t)\big).
$$

Simulamos a política progressivamente, onde deixamos $\omega^n$ representar um caminho amostral da informação exógena (isto é, o conjunto de mudanças nos preços). É frequentemente o caso de que vamos testar nossa política em dados históricos, caso em que há apenas um único caminho amostral. No entanto, se desenvolvemos um modelo matemático dos preços incertos, podemos criar um caminho amostral $\omega$ que usamos para aproximar o valor de uma política (também poderíamos criar múltiplos caminhos amostrais e tirar uma média):

$$
\Fbar^{VFA}(\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega))\big).
$$

Isso significa que o método é bem adequado para aproximar até mesmo problemas de alta dimensão que possam surgir em logística.

Quando estamos construindo uma aproximação de função de valor (que pertence à classe de políticas de horizonte de previsão), tipicamente não temos mais uma etapa em que ajustamos a política. No entanto, isso não significa que não possamos tentar. Suponha que nossa função de valor seja dada pelo modelo linear na equação $\eqref{eq:energylinearvfa}$. Podemos agora escrever nossa política usando

$$
X^{VFA}(S_t\vert \theta) = \argmax_x \left(C(S_t,x) + \sum_{f=1}^F \theta_f \phi_f(S_t)\right).
$$

Faz sentido usar um dos nossos algoritmos de ADP regressivo ou progressivo para obter uma estimativa inicial de $\theta$, mas, como observamos acima, não há garantia de que a política resultante seja de alta qualidade. No entanto, sempre podemos torná-la melhor usando isso como ponto de partida,

$$
\Fhat^{VFA}(\theta,\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega)\vert \theta)\big).
$$

Agora, só temos que resolver o problema de busca de política que poderíamos formular como

$$
\begin{align}
\max_\theta \Fbar^{VFA}(\theta,\omega\vert S_0).  \label{eq:optthetavfa}
\end{align}
$$

Em nossos exemplos anteriores de busca de política, $\theta$ era um escalar, o que torna esse problema relativamente fácil. Agora, $\theta$ é um vetor que pode ter dezenas de dimensões. Vamos retornar a esse problema mais adiante.

### Algumas notas de cautela sobre ADP

Usamos essa configuração de problema para fornecer um tour relativamente aprofundado sobre métodos baseados na ideia de aproximar o valor de estar em um estado. Isso tem sido estudado sob termos como "programação dinâmica aproximada" ou "aprendizado por reforço". Esses métodos têm atraído considerável atenção das comunidades de pesquisa acadêmica, mas na prática, os métodos não são fáceis. Problemas de decisão sequencial estão em toda parte, mas aplicações bem-sucedidas na prática são relativamente raras.

Aproximações de tabela de consulta, em que estimamos o valor para cada estado discreto (ou discretizado), não escalam quando a variável de estado tem mais de três dimensões. Usar estratégias de aproximação como nossa aproximação linear tipicamente não funciona, pois essas aproximações precisam ser globalmente precisas, uma vez que podemos visitar qualquer estado. Ao mesmo tempo, aproximações locais (que são formas de modelos não paramétricos) podem ter dificuldades porque a flexibilidade das aproximações locais introduz instabilidade.

Complicando o processo está o fato de que dependemos de nossa função de valor aproximada para tomar decisões, o que cria um ciclo vicioso. Nossas aproximações iniciais não são muito boas e, como resultado, levam a decisões ruins. Essas decisões ruins são então usadas para atualizar a aproximação da função de valor, e a partir daí você pode ver a espiral descendente.

A ideia de ajustar uma aproximação de função de valor, como fizemos na equação $\eqref{eq:optthetavfa}$, é promissora porque otimiza diretamente o desempenho da política. Estranhamente, essa ideia não é amplamente utilizada. Notamos apenas que ajustar $\theta$ usando essas simulações não é fácil. Assim, alertamos qualquer leitor que decida experimentar essas abordagens para que tenha cautela.

## O que aprendemos?

- Revisitamos um problema de estoque simples do [Capítulo 1](/sdam/pt-BR/chapter-1/), mas no contexto de armazenamento de energia, com variáveis físicas e informacionais.
- Descrevemos uma variedade de modelos estocásticos para preços de eletricidade a fim de ilustrar a riqueza da modelagem de incerteza.
- Descrevemos uma série de políticas: uma PFA (comprar-baixo, vender-alto), uma política VFA (baseada em programação dinâmica aproximada regressiva), bem como programação dinâmica aproximada progressiva.
- Por fim, introduzimos a ideia de estimar um modelo linear para uma aproximação de função de valor usando as técnicas de programação dinâmica aproximada, e então realizar busca direta de política sobre os coeficientes do modelo linear. Assim, trata-se inicialmente de uma política baseada em VFA, que então se transforma em uma forma de política CFA com uma função objetivo parametrizada.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Dada a natureza de caudas pesadas dos preços de eletricidade, o que há de errado em usar um modelo de série temporal?</li>
<li>Esboce brevemente como separamos os preços que caem dentro das variações normais (três desvios padrão) das observações mais extremas.</li>
<li>Usar dados históricos para ajustar uma distribuição empírica deveria nos fornecer uma distribuição de probabilidade que corresponde ao histórico. Que outros erros ainda poderiam estar presentes no modelo estocástico de preços?</li>
<li>Descreva em palavras o que a transformação dos dados na seção de série temporal híbrida está realizando.</li>
<li>A programação dinâmica regressiva clássica rapidamente explode devido à maldição da dimensionalidade. Descreva em palavras como a programação dinâmica aproximada regressiva supera a maldição da dimensionalidade. Por exemplo, se dobrássemos o número de dimensões na variável de estado, descreva como isso complica a ADP regressiva.</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Escreva os cinco elementos do modelo básico para o problema de armazenamento de energia como são apresentados no texto. Escreva a função objetivo assumindo que a política é a política comprar-baixo, vender-alto

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t < \theta^{buy}, \\ 0 & \text{if } \theta^{buy} \leq p_t \leq \theta^{sell}, \\ +1 & \text{if } p_t > \theta^{sell}. \end{cases}
$$

Escreva a função objetivo em termos da busca sobre os parâmetros da política. Além disso, escreva a esperança na função objetivo usando a forma aninhada que reflete cada variável aleatória.</li>
<li>Na seção sobre modelagem de incerteza, introduzimos um modelo de série temporal para preços dado por

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}.
$$

O livro descreve as equações de atualização para o vetor de coeficientes $\thetabar_t = (\thetabar_{t0},\thetabar_{t1}, \thetabar_{t2})$. Lembrando que o estado $S_t$ consiste em *toda* a informação necessária para modelar o sistema a partir do tempo $t$ em diante, forneça a variável de estado atualizada e a função de transição para lidar com esse processo de preços.</li>
</ol>

**Questões de programação**

Esses exercícios usam o módulo Python *EnergyStorage_I* em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Usando o módulo python, execute uma busca em grade para o vetor de parâmetros $\theta = (\theta^{buy}, \theta^{sell})$ variando $\theta^{sell}$ ao longo do intervalo de 1,0 a 100,0 em incrementos de ＄1 para preços, e variando $\theta^{buy}$ ao longo do intervalo de 1,0 a $\theta^{sell}$, também em incrementos de ＄1. Os preços serão preços horários históricos reais para um período de 8 dias.</li>
<li>Resolva para uma política ótima usando a estratégia de programação dinâmica regressiva descrita acima (o algoritmo já foi implementado no módulo python). Assuma que o processo de preços evolui de acordo com

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

onde $\varepsilon_{t+1}$ segue uma distribuição empírica baseada nas diferenças de preços dos preços históricos reais.
  <ol type="a">
    <li>Execute o algoritmo onde os preços são discretizados em incrementos de ＄1, depois ＄0,50 e, finalmente, ＄0,25. Calcule o tamanho do espaço de estados para cada um dos três níveis de discretização, e plote os tempos de execução em função do tamanho do espaço de estados.</li>
    <li>Usando a função de valor ótima para a discretização de ＄1, compare o desempenho com a melhor política de compra-venda que você encontrou na parte (a).</li>
  </ol>
</li>
<li>Baixe a planilha "Chapter8_electricity_prices" de [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements/). Use os dados na aba "electricity prices" para as seguintes questões:
  <ol type="a">
    <li>Construa uma distribuição cumulativa empírica $F_P(p) = Prob[P \leq p]$ onde $P$ é um preço escolhido aleatoriamente para uma hora específica ao longo do período de uma semana no conjunto de dados.</li>
    <li>Seja $F^{-1}_P(u)$ a distribuição cumulativa inversa, onde $u$ está entre 0 e 1. Encontre o preço $p(u) = F^{-1}_P(u)$ correspondente a $u = 0, 0.1, 0.2, \ldots, 0.9, 1.0$. Dando a cada um desses preços uma probabilidade de 1/11, encontre a distribuição cumulativa, e compare-a com a distribuição cumulativa que você criou na parte (a). Elas parecem coincidir?</li>
  </ol>
</li>
<li>Usando a planilha "Chapter8_electricity_prices," ajuste um modelo de reversão à média da forma

$$
\begin{align}
p_{t+1} = p_t + \beta (\mubar_t - p_t) + \varepsilon_{t+1} \label{eq:priceexercise}
\end{align}
$$

onde

$$
\mubar_t = (1-\alpha)\mubar_{t-1} + \alpha p_t.
$$

Assuma $\alpha = 0.15$. Encontre $\beta$ que minimize

$$
G(\beta) = \sum_{t=0}^T \big(p_{t+1} - (p_t + \beta (\mubar^t-p_t))\big)^2.
$$

  <ol type="a">
    <li>Ajuste o modelo de reversão à média fazendo uma busca unidimensional simples (por exemplo, tente valores entre 0 e 1 em incrementos de 0,1).</li>
    <li>Calcule o desvio padrão $\sigma$ de $\varepsilon$ a partir de sua amostra (assumimos que a média é 0). Note que assumimos que existe um único desvio padrão constante, embora permitamos que a média $\mubar_t$ varie ao longo do tempo.</li>
    <li>Usando o valor de $\beta$ que você encontrou em (a), gere 10 trajetórias amostrais usando a equação $\eqref{eq:priceexercise}$ amostrando $\varepsilon_{t+1}$ de uma distribuição normal com média 0 e desvio padrão $\sigma$. Plote as trajetórias amostrais em um gráfico, e compare o comportamento de suas trajetórias amostrais com os preços históricos. Elas parecem semelhantes?</li>
  </ol>
</li>
<li>Agora você vai ajustar um modelo de difusão com saltos, dado por

$$
p_{t+1} = p_t + \beta(\mubar_t - p_t) + \varepsilon_{t+1} + J_{t+1} \varepsilon_{t+1},
$$

onde $J_{t+1} = 1$ com alguma probabilidade de salto (que calculamos abaixo) e 0 caso contrário, e $\varepsilon^J_{t+1}$ é o tamanho aleatório do salto quando eles ocorrem.

Siga os passos abaixo para ajustar o modelo de difusão com saltos e comparar os resultados com o histórico.
  <ol type="a">
    <li>Usando o valor de $\beta$ do exercício 11, percorra os dados e identifique todos os pontos de dados que caem fora do intervalo $[\mubar_t \pm 3 \sigma]$.</li>
    <li>Usando o mesmo valor de $\beta$ que você encontrou no exercício 11, execute a reversão à média sobre os dados uma segunda vez, mas desta vez incluindo apenas os pontos de dados que não foram excluídos na parte (a). Encontre a nova média e o desvio padrão de $\sigma$ sobre os dados que não foram excluídos.</li>
    <li>Repita (b) mais uma vez nos pontos de dados que foram retidos, novamente excluindo pontos de dados fora do intervalo $\pm 3 \sigma$.</li>
    <li>Calcule a probabilidade de um salto como a fração de pontos que foram excluídos até o momento em que você termina a parte (c) (a essa altura você já executou o processo de exclusão de pontos de dados duas vezes). Além disso, calcule a média e o desvio padrão dos pontos que foram excluídos.</li>
    <li>Agora, execute 10 simulações do seu modelo de difusão com saltos, usando a média e a variância finais para os pontos retidos e excluídos, e onde você amostra os saltos usando a probabilidade de difusão com saltos. Compare essas simulações com o histórico, e discuta se as trajetórias de preços resultantes são mais realistas do que aquelas encontradas no exercício 11, e compare as trajetórias de preços com o histórico real.</li>
  </ol>
</li>
<li>Vamos tentar novamente obter um bom ajuste dos preços repetindo partes dos exercícios 11 e 12 usando preços transformados.
  <ol type="a">
    <li>Usando a distribuição cumulativa do exercício 10, converta cada um dos preços em uma variável aleatória uniformemente distribuída usando a identidade $U_t = F_P(p_t)$.</li>
    <li>A seguir, converta suas variáveis aleatórias uniformemente distribuídas $U_t$ em variáveis aleatórias normalmente distribuídas com média 0 e variância 1 usando $Z_t = \Phi^{-1}(U_t)$ onde $\Phi(z)$ é a distribuição cumulativa da distribuição normal padrão, e $\Phi^{-1}(U_t)$ é a inversa dessa distribuição. Isso é capturado pela função norm.s.inv(p) no Excel, que retorna o valor $Z$ correspondente a uma probabilidade $p$ (que é dada pela variável $U_t$).</li>
    <li>Agora precisamos reajustar $\beta$ na equação de reversão à média do exercício 11. Desta vez, em vez de usar o preço $p_t$, usamos a quantidade normalizada $Z_t$; do contrário, tudo permanece igual (portanto, você pode simplesmente seguir o mesmo processo usado ao ajustar $\beta$ para os preços brutos).</li>
    <li>Agora use seu modelo de (c) (com o novo valor para $\beta$) para criar uma trajetória amostral de valores $Z_t$. Depois, use $U_t = \text{norm.s.dist}(Z_t,1)$ para obter a probabilidade de que $Z_t \leq z$ (que é uniformemente distribuída entre 0 e 1). Por fim, mapeie o valor de $U_t$ de volta para um preço usando a distribuição cumulativa que você encontrou no exercício 11. Plote uma trajetória amostral (isso não é muito difícil se você for proficiente em Excel — caso contrário, a parte trabalhosa é esse último passo).</li>
    <li>Compare o comportamento da trajetória amostral resultante com a distribuição histórica. Note que a distribuição dos preços deveria ser perfeita, mas a série de preços ainda pode não parecer um bom ajuste. Que erros ainda podemos estar cometendo?</li>
  </ol>
</li>
</ol>
{% endraw %}
