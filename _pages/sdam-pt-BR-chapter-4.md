---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 4: Aprendendo o melhor medicamento para diabetes"
permalink: /sdam/pt-BR/chapter-4/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 60758982728bf18e
---


{% raw %}
## Visão geral do capítulo

Aprender a melhor medicação para diabetes retoma de onde nosso problema do jornaleiro parou, onde períodos de tempo sucessivos são conectados por aquilo em que acreditamos sobre parâmetros desconhecidos. Aqui, estamos tentando aprender qual é a melhor de um conjunto de medicações para diabetes para um paciente específico. Testamos uma medicação, observamos o que assumimos ser uma resposta ruidosa e, então, atualizamos nossas crenças para decidir o que testar em seguida, onde queremos maximizar a redução do açúcar no sangue. Esta classe de problemas tem sido estudada sob uma variedade de nomes, incluindo problema do bandido de múltiplos braços, busca estocástica livre de derivadas, ou tentativa e erro inteligente.

No cerne deste problema estão nossas crenças sobre como diferentes medicações irão se comportar. Para manter a apresentação o mais simples possível, assumimos que o que observamos de uma medicação não nos diz nada sobre o desempenho de outras medicações, uma propriedade conhecida como crenças independentes. Um caso mais interessante e relevante capturaria crenças correlacionadas, mas isso teria complicado a apresentação.

Consideramos apenas os tipos mais simples de políticas, que são todas formas de aproximações de função de política. Estas são bastante simples de usar, mas todas envolvem parâmetros ajustáveis, o que não é abordado neste capítulo.

Consideramos como uma extensão o caso em que queremos usar o que aprendemos de um paciente para outros pacientes com atributos semelhantes. Isso introduz os atributos de um paciente na variável de estado, produzindo o que é conhecido como um *problema de bandido contextual*, o que significa aprender o desempenho da medicação no "contexto" dos atributos do paciente. Retornamos a essas questões em um contexto de problema muito mais rico no [Capítulo 12](/sdam/pt-BR/chapter-12/), para o problema de otimizar a escolha de URLs a serem exibidas para maximizar cliques em anúncios.

## Formulando o problema

As respostas às nossas três perguntas de formulação são:

- **Métricas:** Desejamos reduzir o açúcar no sangue do paciente (medido pelo A1c) até um nível-alvo.
- **Decisões:** Para este capítulo, estamos apenas escolhendo o tipo de medicação a ser administrada (normalmente também precisaríamos encontrar a melhor dosagem, mas assumimos que a dosagem é determinada pelo tipo de medicação e pelo peso do paciente).
- **Incertezas:** Quanto uma medicação reduz o A1c do paciente. Pode ser o caso de o paciente não tolerar uma medicação, caso em que definiríamos a redução do A1c como zero.

## Narrativa

Quando as pessoas descobrem que têm açúcar elevado no sangue, tipicamente avaliado usando uma métrica chamada "A1c", existem várias dezenas de medicamentos que se enquadram em quatro grandes grupos:

- Sensibilizadores – Estes têm como alvo células do fígado, músculo e gordura para aumentar diretamente a sensibilidade à insulina, mas podem causar retenção de fluidos e, portanto, não devem ser usados em pacientes com histórico de insuficiência renal.
- Secretagogos – Estes medicamentos aumentam a sensibilidade à insulina tendo como alvo o pâncreas, mas frequentemente causam hipoglicemia e ganho de peso.
- Inibidores da alfa-glicosidase – Estes retardam a taxa de metabolismo do amido no intestino, mas podem causar problemas digestivos.
- Análogos de peptídeos – Estes imitam hormônios naturais no corpo que estimulam a produção de insulina.

O medicamento mais popular é um tipo de sensibilizador chamado metformina, que é quase sempre o primeiro medicamento prescrito para um novo diabético, mas isso nem sempre funciona. Antes de trabalhar com um paciente específico, um médico pode ter uma crença sobre o potencial da metformina, e de medicamentos de cada um dos quatro grupos, para reduzir o açúcar no sangue, o que está ilustrado na Figura 4.1.

<figure class="book-figure">
  <img src="/assets/images/sdam/diabeteslearning2.jpg" alt="Crenças sobre o potencial que cada medicamento pode ter na redução do açúcar no sangue." style="max-width: 420px;">
  <figcaption><span class="fig-num">Figura 4.1.</span> Crenças sobre o potencial que cada medicamento pode ter na redução do açúcar no sangue.</figcaption>
</figure>

Um médico normalmente começará com metformina, mas isso funciona para apenas cerca de 70 por cento dos pacientes. Frequentemente, os pacientes simplesmente não conseguem tolerar uma medicação (ela pode causar problemas digestivos graves). Quando isso acontece, os médicos precisam começar a experimentar medicamentos diferentes. Este é um processo lento, pois leva várias semanas até que seja possível avaliar o efeito que um medicamento está tendo em um paciente. Após testar um medicamento em um paciente por um período de tempo, observamos a redução no nível de A1c e, então, usamos essa observação para atualizar nossa estimativa de quão bem o medicamento funciona no paciente.

Nosso desafio é encontrar uma política para identificar a medicação que alcança a maior redução possível no nível de A1c de um paciente.

## Modelo básico

Para nosso modelo básico, vamos assumir que temos cinco opções de medicações: metformina, ou um medicamento (diferente da metformina) extraído de um dos quatro grupos principais de medicamentos. Seja $\Xcal = \lbrace x_1, x_2, x_3, x_4, x_5\rbrace $ as cinco opções. A partir da observação do desempenho de cada medicamento ao longo de centenas ou milhares de pacientes, é possível construir uma distribuição de probabilidade da redução nos níveis de A1c entre todos os pacientes. Os resultados dessa análise são mostrados na Tabela 4.1, que relata a redução média e o desvio padrão entre todos os pacientes. Assumimos que a distribuição das reduções em A1c na população é normalmente distribuída, com médias e desvios padrão conforme dados na tabela.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medicamento</th><th>Redução de A1c</th><th>Desvio padrão</th></tr></thead>
<tbody>
<tr><td>Metformina</td><td>0.32</td><td>0.12</td></tr>
<tr><td>Sensibilizadores</td><td>0.28</td><td>0.09</td></tr>
<tr><td>Secretagogos</td><td>0.30</td><td>0.17</td></tr>
<tr><td>Inibidores da alfa-glicosidase</td><td>0.26</td><td>0.15</td></tr>
<tr><td>Análogos de peptídeos</td><td>0.21</td><td>0.11</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 4.1.</span> Metformina e as quatro classes de medicamentos e a redução média em toda a população.</p>
</div>

Para criar um modelo, seja $\mubar^0\_x$ a redução média no A1c para a escolha de medicamento $x$ em toda a população, e seja $\sigmabar^0\_x$ o desvio padrão na redução do A1c para o medicamento $x$. Nosso interesse é aprender qual é o melhor medicamento para um indivíduo específico. Embora possamos descrever o paciente usando um conjunto de atributos, por ora vamos assumir apenas que as características do paciente não alteram nossa crença sobre o desempenho de cada medicamento para um paciente individual.

Não sabemos a redução que podemos esperar de cada medicamento, então a representamos como uma variável aleatória $\mu_x$, onde assumimos que $\mu_x$ é normalmente distribuída, o que escrevemos como

$$
\mu_x \sim N(\mubar^0_x, (\sigmabar^0_x)^2).
$$

Referimo-nos à distribuição normal $N(\mubar^0\_x, (\sigmabar^0\_x)^2)$ como a *distribuição a priori de crença* sobre $\mu_x$.

Indexamos cada iteração de prescrição de uma medicação por $n$, que começa em 0, o que se refere ao momento antes de termos realizado qualquer experimento. Assuma que sempre observamos um paciente por um período fixo de tempo (digamos, um mês). Se testarmos um medicamento $x$ em um paciente, fazemos uma observação ruidosa do valor verdadeiro $\mu_x$ da resposta do paciente a uma medicação. Assuma que fazemos uma escolha de medicamento $x^n$ usando o que sabemos após $n$ testes, após o qual observamos o resultado do $n+1$-ésimo teste, que denotamos $W^{n+1}$ (esta é a redução no nível de A1c). Isso pode ser escrito

$$
W^{n+1} = \mu_{x^n} + \varepsilon^{n+1}.
$$

Lembre-se de que não sabemos $\mu_x$; esta é uma variável aleatória, onde $\mubar^n_x$ é nossa estimativa atual da média de $\mu_x$.

### Variáveis de estado

Nossa variável de estado é nossa crença sobre a variável aleatória $\mu_x$, que é o efeito verdadeiro de cada medicamento em um paciente específico após $n$ testes. $S^0$ é o estado inicial, que escrevemos como

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal},
$$

onde também incluímos em $S^0$ a suposição de normalidade, que permanece ao longo de todos os experimentos. Após $n$ experimentos, o estado é

$$
S^n = (\mubar^n_x, \sigmabar^n_x)_{x\in\Xcal},
$$

onde não incluímos mais a suposição de normalidade porque ela está capturada em nosso estado inicial (a distribuição é estática, então, por convenção, não a incluímos na variável de estado dinâmica).

Mais adiante, será útil trabalhar com a *precisão* de nossa crença, que é dada por

$$
\beta^n_x = \frac{1}{(\sigmabar^n_x)^2}.
$$

Podemos, então, escrever nossa variável de estado como

$$
S^n = (\mubar^n_x, \beta^n_x)_{x\in\Xcal}.
$$

Estamos usando o que é conhecido como um *modelo de crença bayesiana*. Neste modelo, tratamos o valor desconhecido de um medicamento, $\mu_x$, como uma variável aleatória com distribuição a priori inicial dada por $S^0$. Após $n$ experimentos com medicamentos diferentes, obtemos a distribuição de crença *a posteriori* $S^n$.

### Variáveis de decisão

A decisão é a escolha da medicação a ser testada por um mês, que escrevemos como $x^n$, a escolha de medicação, onde $x^n \in \Xcal = \lbrace x_1, \ldots, x_5\rbrace $. Vamos determinar $x^n$ usando uma política $X^\pi(S^n)$ que depende apenas da variável de estado $S^n$ (juntamente com a suposição da distribuição normal em $S^0$).

### Informação exógena

Após tomar a decisão $x^n$, observamos $W^{n+1}\_x$, a redução no nível de A1c resultante do medicamento $x=x^n$ que prescrevemos para o $n+1$-ésimo teste. Um leitor pode se perguntar por que escrevemos a informação aprendida com a decisão $x^n$ como $W^{n+1}\_x$ em vez de $W^n_x$. Fazemos isso para capturar a informação disponível em cada variável. Assim, a decisão $x^0$ depende apenas do estado inicial $S^0$. O estado $S^n$ para $n\geq 1$ depende de $S^0$ juntamente com as observações $W^1\_{x^0}, \ldots, W^n_{x^{n-1}}$, mas não $W^{n+1}\_{x^n}$, já que ainda não concluímos o $n+1$-ésimo experimento que revelaria $W^{n+1}\_{x^n}$. Ao deixar $W^{n+1}\_{x^n}$ ser o resultado da prescrição $x^n$, sabemos que $x^n$ não pode depender de $W^{n+1}$, o que seria como ver o futuro.

### Função de transição

A função de transição captura como a redução observada no A1c, $W^{n+1}\_x$, afeta nosso estado de crença $S^n$. Embora exija um pouco de álgebra, é possível mostrar que, se testarmos o medicamento $x=x^n$ e observarmos $W^{n+1}\_x$, podemos atualizar nossa estimativa da média e da precisão usando

$$
\begin{align}
\mubar^{n+1}_x &= \frac{\beta^n_x\mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W},\label{eq:diabetestransition1}\\
\beta^{n+1}_x &= \beta^n_x + \beta^W.\label{eq:diabetestransition2}
\end{align}
$$

onde $\beta^W$ é a precisão de uma observação (podemos tornar isso dependente de $x$, se necessário). Para todo $x\ne x^n$, $\mubar^n_x$ e $\beta^n_x$ permanecem inalterados.

A função de transição, que anteriormente escrevemos como uma função genérica $S^{n+1} = S^M(S^n,x^n,W^{n+1})$, é dada pelas equações $\eqref{eq:diabetestransition1}$–$\eqref{eq:diabetestransition2}$.

### Função objetivo

Cada vez que prescrevemos um medicamento $x=x^n$, observamos a redução no A1c representada por $W^{n+1}\_{x^n}$. Queremos encontrar uma política que escolha um medicamento $x^n = X^\pi(S^n)$ que maximize a redução total esperada no A1c. Nosso modelo canônico usou $C(S^n,x^n,W^{n+1})$ como nossa métrica de desempenho. Para este problema, isso seria

$$
C(S^n,x^n,W^{n+1}) = W^{n+1}_{x^n}.
$$

Escrevemos o problema de encontrar a melhor política como

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}, \label{eq:diabetesobjective1}
\end{align}
$$

onde $x^n = X^\pi(S^n)$, e $S^{n+1} = S^M(S^n,x^n,W^{n+1})$. Aqui, o condicionamento em $S_0$ é particularmente importante porque carrega a distribuição a priori de crença.

## Modelando a incerteza

Amostrar resultados aleatórios para nosso problema de venda de ativos foi relativamente simples. Para nosso ambiente médico, gerar resultados das variáveis aleatórias $W^1, \ldots, W^n, \ldots$ é um pouco mais complexo.

Com o problema de venda de ativos, estávamos gerando variáveis aleatórias com média 0 e uma variância dada, que assumíamos ser conhecida. Nesta aplicação médica, a redução no A1c a partir de um medicamento específico é uma observação ruidosa da média verdadeira $\mu_x$ (para um paciente específico), que podemos escrever como

$$
W^{n+1} = \mu_x + \varepsilon^{n+1},
$$

onde $\varepsilon^{n+1}$ é normalmente distribuída com média 0 e uma variância (que assumimos ser conhecida) dada por $(\sigma^W)^2$. A questão real é que não sabemos $\mu_x$. Dado o que sabemos após $n$ experimentos com medicamentos diferentes, assumimos que $\mu_x$ é normalmente distribuída com média $\mubar^n_x$ e precisão $\beta^n_x$. Escrevemos isso como

$$
\begin{align}
\mu_x\vert S^n \sim N(\mubar^n_x, \beta^n_x) \label{eq:mugivenS}
\end{align}
$$

onde o lado direito de $\eqref{eq:mugivenS}$ se lê "a média $\mu_x$ dado o estado $S^n$", o que significa que assumimos saber que a média $\mu_x$ é dada por $\mubar^n_x$. Usamos a precisão $\beta^n_x$ (que é o inverso da variância) em vez da variância mais habitual, quando escrevemos nossa distribuição normal. Escrevemos, então, a distribuição de $W^{n+1}$ como condicionada em $\mu_x$ usando

$$
W^{n+1}\vert \mu_x \sim N(\mu_x, \beta^W_x).
$$

Isso significa que temos que simular duas variáveis aleatórias: o verdadeiro desempenho do medicamento $x$ em nosso paciente, dado por $\mu_x$ (dadas nossas crenças após $n$ experimentos), e depois o ruído $\varepsilon^{n+1}$ quando tentamos observar $\mu_x$. Isso significa apenas que, em vez de gerar uma única variável aleatória normalmente distribuída, como fizemos em nosso problema de venda de ativos, temos que gerar duas.

## Projetando políticas

Uma classe popular de políticas para essa classe de problemas se encaixa em uma categoria conhecida como *limite de confiança superior* (upper confidence bounding). Uma das primeiras políticas UCB tem a forma

$$
\begin{align}
X^{UCB}(S^n) = \argmax_{x\in\Xcal} \left(\mubar^n_x + 4 \sigma^W \sqrt{\frac{\log n}{N^n_x}}\right), \label{eq:diabetesUCB1}
\end{align}
$$

onde $N^n_x$ é o número de vezes que tentamos o medicamento $x$ (lembre-se de que "$\argmax_x$" retorna o valor de $x$ que atinge o máximo). É prática padrão substituir o coeficiente $4 \sigma^W$ por um parâmetro ajustável, o que nos dá

$$
\begin{align}
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right). \label{eq:diabetesUCB2}
\end{align}
$$

Uma variante popular que descobrimos funcionar surpreendentemente bem foi originalmente introduzida sob o nome *estimativa de intervalo* (interval estimation), que é dada por

$$
\begin{align}
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right), \label{eq:diabetesIE}
\end{align}
$$

onde $\sigmabar^n_x$ é o desvio padrão da estimativa $\mubar^n_x$.

As políticas $\eqref{eq:diabetesUCB2}$–$\eqref{eq:diabetesIE}$ compartilham a estrutura de escolher o medicamento $x$ que maximiza nossa estimativa de seu desempenho $\mubar^n_x$ mais um termo frequentemente chamado de "bônus de incerteza." A intuição por trás dessas políticas é que as estimativas $\mubar^n_x$ podem estar baixas devido à má sorte. Sem o bônus de incerteza, alguns resultados ruins podem significar que nunca mais tentaríamos um medicamento. Essas políticas têm atraído considerável atenção da literatura de pesquisa, que pode derivar limites teóricos sobre seu desempenho, mas, em última análise, tudo depende de comparações experimentais usando dados realistas. Uma etapa importante na avaliação das políticas é o ajuste do parâmetro $\theta^{UCB}$ ou $\theta^{IE}$.

Uma terceira estratégia que tem atraído considerável atenção é conhecida como amostragem de Thompson (Thompson sampling). Essa abordagem retira uma amostra aleatória de nossa crença sobre $\mu_x$ para cada medicamento $x$, e então toma a melhor dessas. Mais precisamente, seja

$$
\muhat^n_x \sim N(\mubar^n_x, \theta^{TS} \sigmabar^n_x)
$$

uma amostra aleatória retirada de uma distribuição normal com média $\mubar^n_x$ e desvio padrão $\sigmabar^n_x$, que é nossa crença atual sobre a verdadeira resposta $\mu_x$. O parâmetro $\theta^{TS}$ é um parâmetro ajustável que influencia a incerteza que temos em torno da média estimada $\mubar^n_x$.

Agora escolha o medicamento a testar a seguir usando

$$
\begin{align}
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x. \label{eq:thompsonsampling}
\end{align}
$$

A amostragem de Thompson favorece escolhas em que o desempenho estimado $\mubar^n_x$, dado o que sabemos após $n$ observações (em todos os medicamentos), mas randomiza o desempenho. A randomização incentiva a exploração, já que medicamentos cujo impacto estimado sobre a A1c pode não ser o maior ainda têm chance de apresentar o maior valor amostrado $\muhat^n_x$.

Notamos que todas essas três políticas, $X^{UCB}(S^n\vert \theta^{UCB})$, $X^{IE}(S^n\vert \theta^{IE})$ e $X^{TS}(S^n\vert \theta^{TS})$, compartilham duas características: a política em si exige a solução de um problema de otimização (o "$\argmax_x$"), e todas têm parâmetros ajustáveis. Por essa razão, todas essas são exemplos de *aproximações de função de custo* (ou CFAs).

## Avaliação de política

Originalmente escrevemos nossa função objetivo como

$$
\max_\pi F^\pi(S_0) = \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\},
$$

mas escrever a esperança dessa forma é um pouco vago. Lembre-se de que temos dois conjuntos de variáveis aleatórias: os verdadeiros valores de $\mu_x$ para todo $x\in\Xcal$, e as observações $W^1, \ldots, W^N$ (ou, mais precisamente, o ruído quando tentamos observar $\mu_x$). Podemos expressar essa dependência aninhada escrevendo a função objetivo como

$$
\max_\pi F^\pi(S_0) = \E_\mu \E_{W^1, \ldots, W^N\vert \mu} \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}.
$$

Existem duas maneiras de simular o valor de uma política:

- **Amostragem aninhada** – Primeiro simulamos o valor da verdade $\mu_x$ para todo $x\in\Xcal$ onde deixamos $\psi\in\Psi$ ser uma realização amostral de $\mu$, que escrevemos como $\mu(\psi)$. Em seguida, simulamos as observações $W$, onde deixamos $\omega\in\Omega$ ser uma realização amostral de $W^1(\omega), \ldots, W^N(\omega)$, o que significa que $\omega$ é um resultado de todas as observações possíveis sobre todos os medicamentos possíveis $x\in\Xcal$, ao longo de todos os experimentos $n=1, \ldots, N$.
- **Amostragem simultânea** – Aqui, deixamos $\omega$ ser uma realização amostral tanto de $\mu_x$ quanto das observações $W^1, \ldots, W^N$.

Se usarmos amostragem aninhada, suponha que geremos $K$ amostras dos verdadeiros valores $\mu(\psi_k)$, e $L$ amostras dos erros $\varepsilon^1(\omega_\ell), \ldots, \varepsilon^N(\omega_\ell)$. Para a verdade amostrada $\mu(\psi_k)$ e ruído $\varepsilon^n(\omega_\ell)$, o desempenho do medicamento $x^n$ no $n+1$º experimento seria

$$
W^{n+1}_{x^n}(\psi_k,\omega_\ell) = \mu(\psi_k) + \varepsilon^n(\omega_\ell).
$$

Podemos então calcular uma estimativa simulada do desempenho esperado de uma política usando

$$
\Fbar^\pi(S_0) = \frac{1}{K} \sum_{k=1}^K \left(\frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\psi_k,\omega_\ell)\right),
$$

onde $x^n = X^\pi(S^n)$ e

$$
S^{n+1}(\psi_k,\omega_\ell) = S^M(S^n(\psi_k,\omega_\ell), X^\pi(S^n(\psi_k,\omega_\ell)), W^{n+1}(\psi_k,\omega_\ell)).
$$

Se usarmos amostragem simultânea, então uma amostra $\omega$ determina tanto a verdade $\mu(\omega)$ quanto o ruído $\varepsilon(\omega)$, permitindo-nos escrever uma estimativa amostrada de nossa observação $W^{n+1}\_{x^n}$ como

$$
W^{n+1}_{x^n}(\omega_\ell) = \mu(\omega_\ell) + \varepsilon^n(\omega_\ell).
$$

O valor estimado de uma política é dado por

$$
\Fbar^\pi(S_0) = \frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\omega_\ell).
$$

Se usarmos uma de nossas políticas parametrizadas em que $\theta$ é o parâmetro ajustável, podemos escrever o desempenho esperado como $\Fbar^\pi(\theta\vert S_0)$. Então, o problema de otimização seria

$$
\begin{align}
\max_\theta \Fbar^\pi(\theta\vert S_0), \label{eq:diabetestuningpolicy}
\end{align}
$$

que podemos resolver usando uma variedade de procedimentos de busca, como os métodos apresentados neste capítulo ou no [Capítulo 3](/sdam/pt-BR/chapter-3/). Revisamos métodos de busca com mais profundidade no [Capítulo 7](/sdam/pt-BR/chapter-7/).

## Extensões

Temos descrito um problema que se aplica a um único paciente. Isso significa que teríamos que resolver esse problema do zero para cada paciente. Se tivermos um milhão de pacientes diabéticos, então teríamos um milhão de modelos.

Imagine que gostaríamos de usar informações de pacientes diferentes para aprender um único modelo. Podemos fazer isso caracterizando cada paciente usando um conjunto de atributos $a = (a_1, \ldots, a_K)$. Suponha, por ora, que cada elemento $a_k$ seja discreto (por exemplo, gênero) ou discretizado (por exemplo, idade, dividida em faixas). Na verdade, vamos começar supondo que existe um único atributo, gênero. Seja $G^n$ o gênero do $n$º paciente. Agora temos duas formas de informação exógena: o gênero $G^n$ do $n$º paciente, e o resultado $W^n$ do tratamento do $n$º paciente.

Começamos com um estado de conhecimento $K^0$ que é nosso vetor $(\mubar^0, \beta^0)$ introduzido anteriormente no capítulo. O primeiro paciente terá gênero $G^1$, o que significa que nossa variável de estado (isto é, tudo o que sabemos) após a chegada do primeiro paciente é $S^1 = (K^0,G^1)$. Em seguida, tomamos uma decisão $x^1$ referente ao tratamento do paciente 1, após o qual observamos um resultado $W^1$ descrevendo como o tratamento funcionou. Usamos essa informação para obter um estado de conhecimento atualizado $K^1$, após o que o processo se repete:

$$
\begin{align*}
&(K^0, G^1, S^1=(K^0,G^1), x^1, W^1, K^{1}, G^2, S^2=(K^1,G^2), \ldots, \\
&\hspace{0.75in} K^{n-1}, G^n, S^n=(K^{n-1},G^n), x^n, W^{n}, K^{n}, G^{n+1}, \ldots)
\end{align*}
$$

Fazemos uma pausa por um momento e notamos que nossa indexação é diferente daquela usada no modelo básico. Em nosso modelo básico, o índice $n$ referia-se a visitas de um paciente. Tomamos uma decisão $x^n$ *após* a $n$ª visita usando o que é conhecido a partir das primeiras $n$ visitas. Deixamos $W^{n+1}$ ser o resultado desse tratamento, incrementando $n$ para $n+1$ para enfatizar que $x^n$ foi calculado sem saber $W^{n+1}$.

Com nosso novo modelo, porém, $n$ refere-se a um paciente. Faz mais sentido deixar $G^n$ ser o gênero do $n$º paciente, ponto em que tomamos uma decisão para o $n$º paciente, e deixar $W^n$ ser o resultado do tratamento para o $n$º paciente. Não incrementamos $n$ até vermos o $n+1$º paciente, ponto em que vemos o gênero do $n+1$º paciente.

## O que aprendemos?

- Introduzimos a ideia de um problema de decisão sequencial que é um problema puramente de aprendizado, onde a variável de estado consiste apenas em variáveis de estado de crença.
- Vimos um exemplo de problema onde a incerteza estava no verdadeiro valor do desempenho de uma escolha, como o medicamento para diabetes.
- Introduzimos um exemplo de política de aproximação de função de custo que é uma forma de problema de otimização parametrizado, e ilustramos essa ideia usando três tipos de políticas: limite de confiança superior (que é uma classe geral de políticas), estimativa de intervalo e amostragem de Thompson.
- Notamos que cada política envolve um parâmetro ajustável e formulamos o problema de ajuste como seu próprio problema de otimização.
- Mostramos como modelar a presença de variáveis de informação exógena (como o gênero do paciente) como um problema de decisão totalmente sequencial, conhecido na literatura de aprendizado como um "problema de bandit contextual" (o contexto é o gênero). Em vez de encontrar o melhor $x$, agora estamos procurando o melhor $x(G)$ em função do gênero (poderíamos expandir isso com outros atributos dos pacientes).

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Qual é a diferença fundamental, de uma perspectiva algorítmica, entre o problema de diabetes que resolvemos neste capítulo e o problema resolvido no [Capítulo 3](/sdam/pt-BR/chapter-3/)?</li>
<li>Quando deixamos $\mubar^n_x$ ser a estimativa de quão bem o medicamento se comporta em um paciente após $n$ testes, o que $n$ está medindo? É o número de vezes que tentamos o medicamento $x$?</li>
<li>Qual é a variável de estado para esse problema?</li>
<li>Acima, introduzimos uma política de limite de confiança superior, uma política de estimativa de intervalo e uma política baseada em amostragem de Thompson. Que características essas políticas tinham em comum?</li>
<li>Nossa função objetivo otimizou recompensa cumulativa ou recompensa final? Por que usamos essa versão? O que muda se mudarmos para a outra função objetivo em termos de busca de uma boa política?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Você está tentando determinar a dosagem de um medicamento para diabetes que produz a maior redução no nível de açúcar no sangue. Você está atualmente experimentando três dosagens que designamos por $d_1$, $d_2$ e $d_3$. Seja $\mu_i$ a verdadeira redução no açúcar no sangue produzida pela dosagem $i$. Após $n$ experimentos com medicamentos diferentes, seja $\mubar^n_i$ a estimativa da redução produzida pela dosagem $d_i$. Desejamos explorar a observação de que nossas crenças sobre $\mu_i$ são correlacionadas. Seja $\sigma_{ii'} = Cov(\mu_i, \mu_{i'})$ a covariância em nossa crença sobre $\mu_i$ e $\mu_{i'}$.

Suponha que, após $n$ testes de diferentes dosagens, obtemos o vetor atual de estimativas

$$
\mubar^{n} = \begin{bmatrix} 32 \\ 42 \\ 20 \end{bmatrix}.
$$

Suponha que a variância de um único experimento seja $16$ e que nossa matriz de covariância $\Sigma^n$ seja dada por

$$
\Sigma^n = \begin{bmatrix} 8 & 4 & 2 \\ 4 & 8 & 4 \\ 2 & 4 & 8 \end{bmatrix}.
$$

  <ol type="a">
    <li>Escreva as equações para encontrar as estimativas atualizadas $\mubar^{n+1}$ e a matriz de covariância $\Sigma^{n+1}$ dada uma observação $W^{n+1}$.</li>
    <li>Suponha que testemos a dosagem $d_2$ e obtenhamos uma observação $W^{n+1} = 50$. Calcule as estimativas atualizadas $\mubar^{n+1}$ e a matriz de covariância $\Sigma^{n+1}$.</li>
  </ol>
</li>
<li>Mostre como adaptar a política apresentada anteriormente ao nosso problema em que o gênero é o único atributo do paciente, usando uma representação de tabela de consulta (lookup table), o que significa que, em vez de aprender $\mubar^n_x$, aprendemos $\mubar^n_{a,x}$ onde $a=$ gênero. Assim, em vez de aprender uma estimativa $\mubar^n_x$ para cada tratamento $x$, temos que aprender uma estimativa $\mubar^n_{a,x}$ para cada combinação de gênero $a = G^n$ e tratamento $x=x^n$.</li>
<li>Esboce uma estratégia para aplicar as ideias deste capítulo ao problema de planejamento de mercado no [Capítulo 3](/sdam/pt-BR/chapter-3/).</li>
<li>É possível aplicar os métodos do [Capítulo 3](/sdam/pt-BR/chapter-3/) ao problema de diabetes? Explique.</li>
<li>Agora imagine que, em vez de apenas gênero, capturamos idade por década $(0$–$9, 10$–$19, \ldots, 80^+)$, fumante ou não, e raça (suponha oito categorias de etnia), dando-nos um vetor de atributos $a = (a_{gender}, a_{age}, a_{smoker}, a_{race})$. Se $a\in\Acal$, quantos elementos $\Acal$ tem? Como isso impactaria sua solução proposta no exercício 7?</li>
<li>Imagine que cada elemento $a_k$ no vetor de atributos $a$ tenha $L$ valores possíveis, e que $a$ tenha $K$ elementos, o que significa que $\Acal$ tem $L^K$ elementos. Se $L = 10$, qual é o maior valor de $K$ de modo que aprender nosso modelo baseado em atributos seja mais fácil do que aprender um modelo para cada um dos 7 milhões de pacientes diabéticos.</li>
<li>Agora imagine que nosso espaço de atributos $\Acal$ é simplesmente muito grande para ser prático. O que fizemos até agora é uma representação de tabela de consulta em que encontramos uma estimativa $\mubar^n_{a,x}$, o que se torna problemático quando o número de valores possíveis de $a$ se torna grande. Uma abordagem alternativa é usar um modelo paramétrico. O mais simples seria um modelo linear em que escreveríamos

$$
\mubar_{a,x} = \sum_{f\in\Fcal} \theta_f \phi_f(a,x),
$$

onde $\phi_f(a,x)$ para $f\in\Fcal$ é um conjunto de características que nós (como analistas) teríamos que definir. Por exemplo, uma característica poderia ser simplesmente um indicador de gênero, faixa etária ou raça. Neste caso, haveria uma característica para cada gênero possível, cada faixa etária possível, e assim por diante.
  <ol type="a">
    <li>Se existem $L$ valores possíveis para cada um dos $K$ atributos, qual é o número mínimo de características que precisaríamos?</li>
    <li>Sugira características mais complexas além daquelas que apenas indicam o valor de cada atributo.</li>
    <li>Compare os pontos fortes e fracos de uma representação por tabela de consulta versus nosso modelo linear.</li>
  </ol>
</li>
<li>Vamos avaliar diferentes políticas para encontrar o melhor medicamento para reduzir o açúcar no sangue. Assumimos que nossa distribuição de crença a priori para cada medicamento é dada na Tabela 4.1.

Começamos com uma política de aprendizado conhecida como estimativa de intervalo dada por

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} (\mubar^n_x + \theta^{IE} \sigmabar^n_x).
$$

Usamos um modelo de crença Bayesiano em que é conveniente usar o conceito de *precisão*, que é simplesmente o inverso da variância. Assim, a precisão em nossa estimativa inicial do valor verdadeiro $\mu_x$ é dada por

$$
\beta^0_x = \frac{1}{(\sigma^0_x)^2},
$$

onde $\sigma^0_x$ é dado na Tabela 4.1.

Após $n$ experimentos, vamos usar nossa política para tomar uma decisão $x^n$, que é o medicamento a testar no $n+1$-ésimo experimento. Não sabemos o desempenho verdadeiro $\mu_x$ do medicamento $x$, mas podemos observá-lo usando uma observação ruidosa do valor verdadeiro $\mu_x$, que escrevemos usando

$$
W^{n+1}_x = \mu_x + \varepsilon^{n+1}_x.
$$

Assuma que o desvio padrão de um único experimento é $\sigma^W = 5$. Usamos a observação de $W^{n+1}_x$ para atualizar nossas crenças usando:

  <ol type="i">
    <li>Se testarmos o medicamento $x$:

    $$
    \mubar^{n+1}_x = \frac{\beta^n_x \mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W}, \qquad \beta^{n+1}_x = \beta^n_x + \beta^W.
    $$</li>
    <li>Se $x$ é um medicamento que não testamos, então:

    $$
    \mubar^{n+1}_x = \mubar^n_x, \qquad \beta^{n+1}_x = \beta^n_x.
    $$</li>
  </ol>

Responda o seguinte:
  <ol type="a">
    <li>Usando um modelo de crença Bayesiano, qual é a variável de estado?</li>
    <li>Qual é a função de transição para o modelo de crença?</li>
    <li>Escreva o valor esperado de uma política $X^\pi(S^n)$ usando o operador de expectativa $\E$. Certifique-se de indexar o operador para indicar quais variáveis aleatórias estão envolvidas, como em $\E_\mu$ ou $\E_W$ (ou $\E_{W_1,\ldots,M}$). Você pode mostrar o condicionamento usando $\E_{W\vert \mu}$ (esta é a expectativa sobre a redução observada $W$ dado que sabemos a média verdadeira $\mu$).</li>
  </ol>
</li>
<li>Poderíamos razoavelmente pensar que o parâmetro $\theta^{IE}$ deveria depender do número de experimentos restantes em nosso orçamento, o que significa que $\theta^{IE}$ precisa ser uma função de $n$ (ou equivalentemente, seria uma função dos experimentos restantes $N-n$). Existem duas formas de representar essa função. Discuta (sem qualquer programação) os pontos fortes de cada abordagem, e os desafios computacionais que estariam envolvidos.
  <ol type="a">
    <li>Tabela de consulta – Em vez de buscar sobre um escalar $\theta^{IE}$, teríamos que buscar sobre um vetor $\theta^{IE}_n$.</li>
    <li>Paramétrica – Poderíamos assumir uma forma funcional como $\theta^{IE} = \theta^{slope}(N-n)$, onde agora só precisamos ajustar o escalar $\theta^{slope}$.</li>
  </ol>
</li>
<li>Abordamos este problema como se estivéssemos resolvendo o problema para cada paciente. Imagine que temos $I$ pacientes indexados por $i = 1, \ldots, I$, lembrando que $I$ pode ser 10 milhões de pacientes. Encontrar um vetor de estimativas $\mubar = (\mubar_x)_{x\in\Xcal}$ para cada paciente seria escrito $\mubar = (\mubar_{i})_{i=1}^I$ onde cada $\mubar_i = (\mubar_{ix})_{x\in\Xcal}$. Criar 10 milhões de estimativas parece um tanto desajeitado.

Imagine, em vez disso, que cada paciente tem um vetor de atributos $a = (a_1,\ldots, a_M)$ onde $a \in \Acal$. Pode haver muitos atributos, caso em que o conjunto $\Acal$ seria bastante grande, mas podemos escolher um pequeno subconjunto de forma que $\Acal$ não seja tão grande, como gênero e se a pessoa fuma. Podemos novamente usar duas representações diferentes de $\mubar_{ax}$. Como antes, discuta os pontos fortes e os desafios computacionais de cada uma das seguintes formas de modelar $\mubar_{ax}$:
  <ol type="a">
    <li>Tabela de consulta – Enumeraríamos cada um dos atributos $a \in \Acal$, e criaríamos uma estimativa $\mubar_{ax}$ do desempenho de cada medicamento $x$ e para cada atributo $a$. Este poderia ser um conjunto grande, mas deveria ser menor do que 10 milhões.</li>
    <li>Paramétrica – Isso requer criar uma forma paramétrica para $\mubar_{ax}$ para cada medicamento $x$. Uma poderia ser

    $$
    \mubar_{ax} = \sum_{f\in\Fcal} \thetabar_{fx} \phi_f(a).
    $$

    As funções $\phi_f(a)$ às vezes são chamadas de funções de base (outros termos são variáveis independentes ou covariáveis). Estas poderiam ser variáveis indicadoras que capturam, por exemplo, o gênero do paciente ou se ele fuma. Esta representação substitui calcular $\mubar_{ax}$ para cada atributo $a$ por calcular um vetor de coeficientes $\mubar_{ax}$ para um conjunto de características. O conjunto $\Fcal$ é presumivelmente muito menor do que o conjunto de atributos (se este não for o caso, então deveríamos usar a representação por tabela de consulta).</li>
  </ol>
</li>
</ol>

**Questões de programação**

Estes exercícios usam o módulo Python *AdaptiveMarketPlanning* em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 15;">
<li>Realize $L = 1000$ simulações da política de estimativa de intervalo ao longo de um orçamento de $N = 20$ experimentos usando $\theta^{IE} = 1$. Seja $\Fhat^{IE}$ o desempenho da política IE para um caminho amostral específico. Assuma que o desempenho verdadeiro de um medicamento, $\mu_x$, é dado na Tabela 4.2, e use as suposições para o desvio padrão de cada crença da Tabela 4.1. Use também o desvio padrão $\sigma^W = 5$ para a variação experimental, como fizemos no exercício 13.
  <ol type="a">
    <li>Calcule a média e o desvio padrão do valor da política $\Fbar^{IE}(\theta^{IE})$ com $\theta^{IE}=1$.</li>
    <li>Avalie a política IE para $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ e plote $\Fbar^{IE}(\theta)$. O que você aprende com este gráfico?</li>
  </ol>
</li>
<li>Avalie a política IE dado um orçamento $N = 20$ sobre os valores $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ para dois conjuntos diferentes de verdades:
  <ol type="a">
    <li>Primeiro assuma que a distribuição a priori é $\mu^0_x = 0.3$ para todos os medicamentos $x$ e onde o desvio padrão inicial é $\sigma^0_x = 0.10$. Isso significa que estamos assumindo que a verdade $\mu_x \sim N(\mubar^0_x,(\sigmabar^0_x)^2)$. No entanto, vamos amostrar nossa verdade usando

    $$
    \muhat_x = .3 + \varepsilon
    $$

    onde $\varepsilon$ tem distribuição uniforme no intervalo $[-0.15,+0.15]$. Este é um exemplo de ter uma distribuição de crença a priori (neste caso, normalmente distribuída em torno de 0,3), mas amostrar a verdade a partir de uma distribuição diferente (que é uniformemente distribuída em torno da média 0,3).

    Realize 10.000 repetições de cada valor de $\theta^{IE}$ para calcular o desempenho médio. Que conclusões você pode tirar do gráfico resultante sobre os 11 valores de $\theta^{IE}$?</li>
    <li>Para este exercício, vamos simular nossa verdade a partir da distribuição a priori usando

    $$
    \mu_x = \mubar^0_x + \varepsilon
    $$

    onde $\mubar^0$ é dado na Tabela 4.2 ("Redução de A1c") e onde $\varepsilon$ tem distribuição uniforme no intervalo $[-.5\mubar^0_x, +.5\mubar^0_x]$. Realize 10.000 repetições de cada valor de $\theta^{IE}$ para calcular o desempenho médio. Que conclusões você pode tirar do gráfico?</li>
  </ol>
</li>
</ol>

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medicamento</th><th>Redução de A1c</th><th>Verdade</th></tr></thead>
<tbody>
<tr><td>Metformina</td><td>0,32</td><td>0,25</td></tr>
<tr><td>Sensibilizadores</td><td>0,28</td><td>0,30</td></tr>
<tr><td>Secretagogos</td><td>0,30</td><td>0,28</td></tr>
<tr><td>Inibidores da alfa-glucosidase</td><td>0,26</td><td>0,34</td></tr>
<tr><td>Análogos de peptídeos</td><td>0,21</td><td>0,24</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 4.2.</span> Valores verdadeiros para um paciente específico.</p>
</div>
{% endraw %}
