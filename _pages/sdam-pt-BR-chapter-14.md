---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 14: Otimizando ensaios clínicos"
permalink: /sdam/pt-BR/chapter-14/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: d2f03f02e366eab2
---


{% raw %}
## Visão geral do capítulo

Para levar um medicamento ao mercado, as empresas farmacêuticas precisam passar por um processo de testes em três fases, terminando com a mais cara, a Fase III, na qual o medicamento é administrado a centenas ou milhares de pacientes. A cada semana, a empresa farmacêutica analisa os resultados dos experimentos e precisa tomar a decisão de continuar os testes, interromper e lançar o produto no mercado, ou interromper e cancelar o medicamento.

Há diversas fontes de incerteza. A primeira, obviamente, é o desempenho do próprio medicamento. No entanto, para testar o medicamento, precisamos inscrever pacientes que estejam dispostos a tomá-lo (ou um placebo), o que introduz outra fonte de incerteza. Há ainda a incerteza sobre a probabilidade de um medicamento funcionar em um determinado paciente, que é distinta do resultado real quando o medicamento é administrado a um paciente.

Usamos esse contexto de problema para ilustrar três diferentes políticas de horizonte de previsão diretas, propondo diferentes formas de aproximar o problema, partindo de um modelo simples que nunca funcionaria até modelos mais sofisticados que oferecem melhor precisão ao custo de maior complexidade.

## Narrativa

A qualquer momento, empresas farmacêuticas podem estar conduzindo centenas de milhares de ensaios clínicos testando novos medicamentos (veja [clinicaltrials.gov](https://clinicaltrials.gov)). Os testes de medicamentos ocorrem em três fases:

**Fase I** – São testes realizados com 20 a 100 voluntários ao longo de alguns meses para determinar a dose, identificar efeitos colaterais e realizar uma avaliação inicial da resposta ao medicamento e dos efeitos colaterais.

**Fase II** – São ensaios maiores, com várias centenas de pacientes, abrangendo dois anos. O objetivo é determinar se a doença responde ao tratamento.

**Fase III** – São ensaios envolvendo centenas a milhares de pacientes, frequentemente abrangendo vários anos, para avaliar eficácia e segurança. É nessa fase que se determina se o tratamento é melhor do que os tratamentos existentes.

Tanto os ensaios de Fase II quanto os de Fase III exigem a identificação de pacientes com as características adequadas para entrar no ensaio, momento em que são randomicamente designados para um dos grupos de comparação.

Em nosso exercício, assumimos que inscrevemos um conjunto de hospitais e clínicas a cada semana para alcançar uma população *potencial*, a partir da qual os pacientes serão identificados como candidatos ao ensaio com base em registros em papel. Há um custo administrativo inicial para inscrever um hospital ou clínica no ensaio. O custo administrativo reflete o conjunto de pacientes que a instituição pode ter para o estudo. Por exemplo, pode custar ＄250.000 para inscrever um grupo de hospitais e clínicas com uma população potencial total de 500 pacientes. Em nosso modelo, simplesmente definiremos um custo de inscrição de ＄500 por paciente, tendo em mente que isso se refere a uma população potencial total, da qual extraímos as inscrições reais.

Uma vez que tenhamos inscrito uma instituição, anunciamos o ensaio clínico, do qual os pacientes (ou seus médicos) se apresentam voluntariamente. Nesse ponto, o paciente é então submetido a uma avaliação mais detalhada, que determina quem é aceito no ensaio. Os pacientes inelegíveis são então descartados.

Para os fins deste exercício, vamos assumir que cada paciente recebe uma medicação no início da semana. Ao final da semana, sabemos se o paciente está respondendo ou não. Os pacientes que respondem são designados como sucessos, os demais como fracassos. Cada semana, então, exige um conjunto inteiramente novo de pacientes, mas estes são extraídos da população base que inscrevemos. Só podemos aumentar essa população inserindo mais capacidade no ensaio e pagando o custo administrativo inicial.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Maximizar a receita esperada recebida quando um medicamento é aprovado para uso, menos o custo semanal de conduzir um ensaio, menos o custo de administrar o medicamento a cada paciente no estudo.
- **Decisões:** Há três tipos de decisões tomadas durante a condução de um ensaio clínico: se deve continuar a executar o ensaio por mais uma semana, ou interrompê-lo; se a decisão for interromper, temos que decidir se cancelamos o medicamento ou seguimos para o mercado; e se continuarmos o ensaio, também precisamos decidir quantos novos pacientes inscrever.
- **Incertezas:** Há duas fontes de incerteza: quantos pacientes se inscrevem no ensaio a cada semana, e os resultados de cada paciente no ensaio, seja ele tendo recebido o medicamento ou um placebo.

## Modelo básico

Assumimos que tomamos decisões ao final de cada semana $t$, a serem implementadas durante a semana $t+1$. Denotamos o tempo $t$ como o fim da semana $t$.

### Variáveis de estado

Temos as seguintes variáveis de estado: $R_t$, a população potencial de pacientes que estão nos hospitais e clínicas que foram inscritos; $\alpha_t$, o número de sucessos do tratamento até a semana $t$ ao longo do ensaio clínico; $\beta_t$, o número de fracassos do tratamento até a semana $t$; e $\bar\lambda^{response}\_t$, a fração estimada de pacientes potenciais que optam por participar do ensaio dado o que sabemos no tempo $t$.

Usando essa informação, podemos estimar a probabilidade de que nosso tratamento seja bem-sucedido usando $\rho_t$, a probabilidade de que o tratamento seja bem-sucedido dado o que sabemos até o final da semana $t$, de modo que

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Isso significa que nossa variável de estado seria

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

É razoável usar $R_0 = 0$ como o valor inicial de $R_t$, mas ajuda usar estimativas iniciais da probabilidade de sucesso com base em ensaios clínicos anteriores.

### Variáveis de decisão

Modelamos o número de pacientes potenciais que são inscritos usando $x^{enroll}\_t$, o aumento na população potencial de pacientes que é adquirida ao adicionar novas instalações hospitalares. O número de pacientes que efetivamente ingressam no ensaio clínico será extraído dessa população durante a semana $t+1$.

Também temos a decisão de quando interromper o ensaio, representada por

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

Se $x^{trial}\_t = 0$, então vamos definir $R_{t+1} = 0$, o que encerra o ensaio. Assumimos que, uma vez que tenhamos interrompido o ensaio, não podemos reiniciá-lo, o que significa que exigiremos que $x^{trial}\_t = 0$ se $R_t = 0$.

Se interrompermos o ensaio, temos que declarar se o medicamento é um sucesso ou um fracasso,

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

Vamos criar políticas $X^{\pi^{enroll}}(S_t)$, $X^{\pi^{trial}}(S_t)$ e $X^{\pi^{drug}}(S_t)$ que determinam $x^{enroll}\_t$, $x^{trial}\_t$ e $x^{drug}\_t$. Podemos então escrever

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

Como sempre, projetamos as políticas mais adiante.

### Informação exógena

Primeiro identificamos novos pacientes e desistências de pacientes do ensaio usando $\Rhat_{t+1}$, o número de novos pacientes que ingressam no ensaio durante a semana $t+1$, que depende da população potencial de pacientes que foram inscritos, dada por $R_{t+1} = R_t + x^{enroll}\_t$. Poderíamos, por exemplo, assumir que cada paciente na população $R_{t+1}$ pode se inscrever no ensaio clínico com alguma probabilidade $\lambda^{response}$, que precisa ser estimada a partir dos dados.

Em seguida, acompanhamos nossos sucessos com $\Xhat_{t+1}$, o número de sucessos durante a semana $t+1$, e $\Yhat_{t+1}$, o número de fracassos durante a semana $t+1$. O número de fracassos durante a semana $t$ pode ser calculado como

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

Essas variáveis dependem do número de pacientes $R_t$ no sistema ao final da semana $t$. Como sempre, deixamos para a seção sobre modelagem de incerteza o desenvolvimento dos modelos de probabilidade subjacentes a essas variáveis aleatórias.

Nosso processo de informação exógena é então

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

onde excluímos $\Yhat_{t+1}$ porque pode ser calculado a partir das outras variáveis.

### Função de transição

A equação de transição para o número de pacientes inscritos é dada por

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

Atualizamos a probabilidade de que o medicamento seja um sucesso contando o número de sucessos e fracassos usando

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

Por fim, atualizamos nossa estimativa do número de pacientes que se inscrevem no ensaio suavizando a estimativa atual $\bar\lambda^{response}\_t$ com a razão mais recente entre o número que se inscreveu durante a semana $t+1$, $\Rhat_{t+1}$, e o número que está atualmente inscrito, $R_t + x^{enroll}\_t$.

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

As equações $\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$ compõem a função de transição que representamos genericamente usando

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Função objetivo

Precisamos considerar os seguintes custos: $c^{enroll}$, o custo de manter um paciente no ensaio por período de tempo; $c^{trial}$, os custos administrativos contínuos de manter o ensaio em andamento (isso termina quando interrompemos os testes); e $p^{success}$, a (grande) receita obtida se interrompermos e declararmos sucesso, o que normalmente significa vender a patente para um fabricante.

O lucro (contribuição) em um período de tempo seria então dado por

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

Nossa função objetivo, então, seria nossa função objetivo canônica, que declaramos como

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

onde reconhecemos que nossa política é uma composição da política de inscrição de pacientes $X^{\pi^{enroll}}(S_t)$, da política de continuação do ensaio $X^{\pi^{trial}}(S_t)$, e da política de sucesso/fracasso do medicamento $X^{\pi^{drug}}(S_t)$.

## Modelagem da incerteza

Há duas razões potenciais para desenvolver um modelo formal de incerteza. A primeira é para o modelo base, que podemos usar tanto para projetar políticas quanto para conduzir estudos. A segunda é que podemos querer modelar a incerteza em uma política de horizonte de previsão estocástica.

Começamos desenvolvendo um modelo base probabilístico, o que significa que faremos o melhor esforço para modelar o problema real, reconhecendo que todos os modelos matemáticos são aproximações do mundo real.

Precisamos modelar três variáveis aleatórias:

- O número de clientes $\Rhat_{t+1}$ que se inscrevem no ensaio.
- A taxa de sucesso (não observável) $\rho^{true}$.
- O número de sucessos $\Xhat_{t+1}$, que de fato observamos.

Tratamos cada uma delas abaixo.

### O processo de inscrição de pacientes

Vamos usar o modelo simples em que fazemos escolhas (por exemplo, ao inscrever hospitais e clínicas) que nos permitem esperar inscrever $x^{enroll}\_t$ pacientes para a semana $t+1$, o que nos dá uma população total de $R_{t+1} = R_t + x^{enroll}\_t$. A realidade será diferente. Propomos modelar o número real de chegadas assumindo que sejam Poisson com uma média de $\bar\lambda^{response} (R_t + x^{enroll}\_t)$, onde $0 < \bar\lambda^{response} < 1$ é a fração de pacientes potenciais que optam por participar do ensaio (o que é desconhecido). Isso significa que podemos escrever

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

Podemos usar uma distribuição de Poisson truncada para $\Rhat_{t+1}$, onde temos que reconhecer que o número de pacientes que ingressam no ensaio é limitado pelo número de pacientes potenciais dado por $R_{t+1} = R_t + x^{enroll}\_t$. Seja

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

o número esperado de pacientes que se voluntariarão para o ensaio (dado $R_t$) e

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

Escrevemos $P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$ como uma função de $x^{enroll}\_t$ e $\Rbar_t$ para refletir sua dependência da decisão e do número $R_{t+1} = R_t + x^{enroll}\_t$.

A distribuição de Poisson truncada é então dada por

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

Para um processo populacional como este, um processo de Poisson é um bom ponto de partida. Ele possui a propriedade de que a média é igual à variância, que é igual a $\Rbar_t$.

### A probabilidade de sucesso

Os sucessos são determinados pela probabilidade subjacente, porém não observável, de que o tratamento produza um sucesso em um paciente durante uma semana. Usamos o estilo bayesiano de atribuir uma distribuição de probabilidade a $\rho^{true}$. Há três maneiras de representar a distribuição de nossa crença sobre $\rho^{true}$:

- Uma priori uniforme, na qual assumiríamos que $\rho^{true}$ é distribuído uniformemente entre $0$ e $1$.
- Uma distribuição beta com parâmetros $(\alpha_0,\beta_0)$.
- Uma distribuição amostrada, na qual assumimos que $\rho^{true}$ assume um dos valores do conjunto $(\rho_1, \ldots, \rho_K)$, onde deixamos nossa distribuição inicial ser $p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$. Poderíamos definir $p_{0k} = 1/K$ (isso seria comparável a usar a priori uniforme). Alternativamente, poderíamos estimar esses valores a partir da distribuição beta.

Por ora, vamos usar nossa distribuição amostrada, pois é a mais fácil de trabalhar.

### O processo de sucesso

O número aleatório de sucessos $\Xhat_{t+1}$, dado o que sabemos no tempo $t$, depende primeiro da variável aleatória $\Rhat_{t+1}$ que fornece o número de pacientes que ingressaram no ensaio, e da probabilidade desconhecida $\rho^{true}$ de sucesso no ensaio. A maneira de criar a distribuição de $\Xhat_{t+1}$ é usar o poder do condicionamento. Assumimos que $\Rhat_{t+1} = r$ e que $\rho^{true} = \rho_k$.

Dado que $r$ pacientes ingressam no ensaio e assumindo que a probabilidade de sucesso é $\rho_k$, o número de sucessos $\Xhat_{t+1}$ é a soma de $r$ variáveis aleatórias de Bernoulli (ou seja, 0/1). A soma de $r$ variáveis aleatórias de Bernoulli é dada por uma distribuição binomial, o que significa

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

Podemos encontrar a distribuição incondicional de $\Xhat_{t+1}$ apenas somando sobre $r$ e $k$ e multiplicando pelas probabilidades apropriadas, o que nos dá

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

Usar distribuições de probabilidade explícitas, como a de $\Xhat_{t+1}$ na equação $\eqref{eq:clinicaltrialsuccessdist}$, é conveniente quando conseguimos encontrá-las (e calculá-las), mas há muitos problemas complexos nos quais isso não é possível. Por exemplo, mesmo a equação $\eqref{eq:clinicaltrialsuccessdist}$ exigiu que usássemos o artifício de utilizar uma representação amostrada da variável aleatória contínua $\rho^{true}$. Sem isso, teríamos que introduzir uma integral sobre a densidade de $\rho^{true}$.

Outra abordagem, muito mais fácil e que se estende até mesmo a situações mais complicadas, usa a amostragem de Monte Carlo para gerar $\Rhat_{t+1}$ e $\Xhat_{t+1}$. Esse processo é descrito a seguir, produzindo uma amostra $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ (e o $\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$ correspondente). Podemos agora aproximar a variável aleatória $\Xhat_{t+1}$ pelo conjunto de resultados $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$, cada um dos quais pode ocorrer com igual probabilidade.

<div class="book-algorithm">
<p><strong>Um modelo baseado em Monte Carlo do processo de ensaio clínico</strong></p>
<p><strong>Passo 1.</strong> Percorra as iterações $n=1, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2a.</strong> Gere uma amostra de Monte Carlo $r^n \sim \Rhat_{t+1}(x^{enroll})$ a partir da distribuição de Poisson dada pela equação $\eqref{eq:clinicaltrialpoisson2}$.</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2b.</strong> Gere uma amostra de Monte Carlo da verdadeira probabilidade de sucesso $\rho^n \sim \rho^{true}$.</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2c.</strong> Dados $r^n$ e $\rho^n$, percorra nossos $r^n$ pacientes e gere uma variável aleatória 0/1 que vale 1 (isto é, o medicamento foi um sucesso) com probabilidade $\rho^n$.</p>
<p style="margin-left: 1.5rem;"><strong>Passo 2d.</strong> Some os sucessos e considere isso como uma realização amostral de $\Xhat^n_{t+1}$.</p>
<p><strong>Passo 3.</strong> Retorne a amostra $\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$.</p>
</div>

## Projetando políticas

Vamos usar este problema para realmente entender nossa política de horizonte de previsão totalmente estocástica, que introduzimos pela primeira vez no [Capítulo 7](/sdam/pt-BR/chapter-7/), dada por

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

Vamos nos concentrar no significado dessa maximização sobre as políticas $\pi$ embutidas dentro da política (isso poderia ser chamado de "política dentro da política").

Para nossa aplicação de ensaios clínicos, precisamos projetar políticas para as três decisões diferentes: o número de pacientes a inscrever, se o ensaio deve ou não continuar, e se o medicamento deve ou não ser declarado um sucesso quando o ensaio for interrompido. Vamos começar projetando aproximações de função de política simples para as decisões de interromper ou continuar e, se interrompermos, se declaramos o medicamento um sucesso ou um fracasso. Em seguida, abordamos a decisão mais difícil de quantos pacientes inscrever no ensaio.

### Interrompendo o ensaio

Começamos usando nossa crença sobre $\rho^{true}$ dada pela distribuição beta com parâmetros $(\alpha_t,\beta_t)$, o que nos fornece uma estimativa de

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Agora introduzimos os parâmetros $\theta^{stop-low}$ e $\theta^{stop-high}$, em que vamos interromper o ensaio e declarar sucesso se $\bar\rho_t > \theta^{stop-high}$, enquanto interromperemos o ensaio e declararemos fracasso se $\bar\rho_t < \theta^{stop-low}$. Seja $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$. Usamos essas regras para definir a política de interrupção do ensaio como

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

Se interrompermos o ensaio, então a política para declarar sucesso (1) ou fracasso (0) é dada por

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### A política de inscrição de pacientes

É frequentemente o caso que problemas com um estado físico (como $R_t$) precisam de uma política de horizonte de previsão, assim como usamos com nosso problema de caminho mais curto estocástico. Mas, como vimos com o problema de caminho mais curto estocástico, podemos escolher o que colocar em nosso modelo de horizonte de previsão estocástico.

Uma escolha que temos que fazer é a política de interrupção $X^{trial}(S_t\vert \theta^{stop})$ e a política de sucesso/fracasso $X^{drug}(S_t\vert \theta^{stop})$, em que propomos usar o mesmo vetor de parâmetros $\theta^{stop}$ em nosso modelo de horizonte de previsão que usamos em nosso modelo base. Podemos nos referir a essas como $\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$ e $\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$, já que agora se aplicam apenas ao modelo de horizonte de previsão.

O problema de determinar quantos novos pacientes potenciais inscrever é um pouco mais difícil, uma vez que é necessário pagar um custo inicial para adquirir mais pacientes potenciais, e temos que fazer isso sob incerteza sobre a disposição dos pacientes em participar do ensaio (dada pelo parâmetro desconhecido $\lambda^{response}$).

Para criar um modelo de horizonte de previsão completo como descrevemos acima, criaríamos variáveis como $\tilde\lambda_{tt'}$ para a versão de horizonte de previsão de $\bar\lambda^{response}\_t$, $\tilde\rho_{tt'}$ para $\bar\rho_t$, e $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ para $(\alpha_t, \beta_t)$. Fora isso, toda a lógica seria a mesma do modelo de incerteza original.

Embora possamos usar o modelo de incerteza completo, podemos optar por simplificar o modelo de diferentes maneiras. Essas escolhas incluem:

- A taxa de inscrição $\bar\lambda^{response}\_t$ – Temos duas opções: podemos continuar estimando $\bar\lambda^{response}\_t$, em que introduziríamos a notação $\tilde\lambda^{response}\_{tt'}$ como a estimativa no tempo $t'$ no modelo de horizonte de previsão da taxa de inscrição $\lambda$; ou poderíamos fixar $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, que é nossa estimativa no tempo $t$ no modelo base.
- A taxa de sucesso do medicamento $\rho^{true}$ – Novamente temos duas opções: podemos continuar estimando a taxa de sucesso, para a qual definiríamos as variáveis $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ para acumular sucessos e fracassos no modelo de horizonte de previsão; ou, alternativamente, poderíamos fixar $(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$ dentro do modelo de horizonte de previsão.

Usando nossas escolhas para modelar a incerteza, podemos sugerir três estratégias diferentes para projetar um modelo de horizonte de previsão:

**Modelo A** – Modelo de horizonte de previsão determinístico. Aqui, vamos supor que a taxa de inscrição $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, o que significa que a taxa de inscrição é fixada na estimativa no tempo $t$ quando criamos o modelo de horizonte de previsão. Em seguida, supomos que a verdadeira probabilidade de sucesso do medicamento é fixada em

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

que é nossa estimativa no tempo $t$ no modelo base.

**Modelo B** – Fixamos nossa estimativa da taxa de inscrição em $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, mas supomos que continuamos aprendendo sobre a eficácia do medicamento.

**Modelo C** – Modelamos o processo de aprendizado da taxa de inscrição $\tilde\lambda_{tt'}$ e da eficácia do medicamento $\tilde\rho_{tt'}$.

Observe que não incluímos o potencial quarto modelo em que fixamos a eficácia do medicamento, mas continuamos aprendendo a taxa de inscrição de pacientes (veremos daqui a pouco quão sem sentido esse modelo seria).

Vamos usar esses três modelos para ilustrar o processo de projetar um modelo de horizonte de previsão.

### Modelo A

O Modelo A é um problema determinístico, uma vez que estamos fixando tanto a taxa de inscrição estimada $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$ quanto $\tilde\rho_{tt'} = \bar\rho_t$. A boa notícia é que isso é basicamente um problema de caminho mais curto determinístico, em que o número de pacientes que inscrevemos (no modelo de horizonte de previsão), dado por $\Rtilde_{tt'}$, é como um nó em uma rede, e a decisão $\xtilde^{enroll}\_{tt'}$ é um elo que nos leva ao nó $\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$.

Para ver isso, recorde a equação $\eqref{eq:shortestpathbellman1}$ para nosso problema de caminho mais curto determinístico, que repetimos aqui

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

Agora simplesmente substituímos $v_i$ pelo valor no nó $i$, por $\Vtilde_{tt'}(\Rtilde_{tt'})$, que é o valor de ter $\Rtilde_{tt'}$ pacientes inscritos (lembre-se de que estamos em nosso modelo de horizonte de previsão). A decisão de ir ao nó $j$ é substituída pela decisão de inscrever $\xtilde^{enroll}\_{tt'}$ pacientes. Em vez de isso nos levar ao nó $j$, isso nos leva ao nó $\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$. Assim, a equação de Bellman se torna

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

A função de lucro de um único período $\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$ é adaptada da mesma função de nosso modelo base (veja a equação $\eqref{eq:clinicaltrialprofit}$).

Há apenas um problema com nosso modelo de horizonte de previsão determinístico: nunca pararíamos, porque nossa política de interrupção exige que nossa estimativa de $\tilde\rho_{tt'}$ entre nas regiões de "sucesso" ou "fracasso" (ela teria que começar na região de "continuar", pois, caso contrário, teríamos interrompido o modelo base). No entanto, isso não significa que não possamos usar o modelo de horizonte de previsão determinístico: apenas temos que fixar um horizonte $H$ e parar quando $t' = t+H$.

Usando essa estratégia, resolvemos nosso problema de caminho mais curto determinístico ao longo do horizonte $t'=t, \ldots, t+H$, e então, a partir disso, encontramos $\xtilde^\ast \_{tt}$. Nossa política de inscrição é então

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

Não estamos afirmando que essa será uma política eficaz. Estamos principalmente ilustrando os tipos de aproximações de modelagem que podem ser feitas em um modelo de horizonte de previsão.

### Modelo B

Agora vamos fixar nossa estimativa da taxa de resposta $\tilde\lambda_{tt'}$ em nossa estimativa $\bar\lambda^{response}\_t$ no tempo $t$ no modelo base. Para simplificar nosso modelo, vamos supor que o número de inscrições $\tilde\Rhat_{t,t'+1}$ é igual ao número esperado de pacientes que se voluntariarão $\tilde\Rbar_{tt'}$. As inscrições $\tilde\Rhat_{t,t'+1}$ são geradas deterministicamente a partir de

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

em que $\lfloor x \rfloor$ significa arredondar $x$ para baixo até o número inteiro mais próximo. Em seguida, calculamos a distribuição de $\tilde\Xhat_{t,t'+1}$ usando $Prob[\Xhat_{t+1} = s\vert \Rbar_t]$, mas em que substituímos $\Rbar_t$ por $\tilde\Rbar_{tt'}$.

Ainda precisamos gerar o número de sucessos $\tilde\Xhat_{t,t'+1}$ a partir de uma verdade simulada $\tilde\rho_{tt'}$, a partir da qual atualizaremos $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$, o que fazemos usando

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

Modelamos a distribuição de $\tilde\Xhat_{t,t'+1}$ usando $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ na equação $\eqref{eq:clinicaltrialsuccessdist}$, mas condicionando em $\tilde\Rbar_{tt'}$ em vez de $\Rbar_t$ (lembre-se de que também podemos usar a distribuição amostrada usando o método de Monte Carlo acima, em vez da distribuição de Poisson).

Podemos resolver o modelo de horizonte de previsão adaptando a equação de Bellman do Modelo A na equação $\eqref{eq:clinicaltrialbellmanModelA}$ para $t'=t, \ldots, t+H$:

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

em que $\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$ é condicionado ao número de sucessos $\tilde\Xhat_{t,t'+1} = s$, e em que $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ vem da equação $\eqref{eq:clinicaltrialsuccessdist}$. Temos que ter em mente que a evolução de $\Rtilde_{tt'}$ precisa refletir se decidimos interromper ou continuar o ensaio dentro do modelo de horizonte de previsão.

Nossa variável de estado físico (total de pacientes potenciais) $\Rtilde_{t,t'+1}$ é dada por

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

Observe que, assim como em nosso modelo base, o número de pacientes potenciais cai a zero se interrompermos o ensaio no modelo de horizonte de previsão.

Nossa estimativa atual do sucesso do medicamento (no modelo de horizonte de previsão) é calculada usando

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

Na expectativa, se condicionarmos ao número de sucessos ser $\tilde\Xhat_{t,t'+1} = s$, então o estado de crença atualizado $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ é

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

Agora temos que resolver o modelo de horizonte de previsão usando a equação de Bellman na <span style="white-space: nowrap;">equação $\eqref{eq:clinicaltrialbellmanModelB}$.</span> Para este problema, faz sentido usar um horizonte $H$ suficientemente grande, de modo que possamos supor com confiança que teríamos interrompido o ensaio até então (isto é, $\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$). Isso significa que podemos supor que $\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$, e trabalhar de trás para frente a partir daí até o tempo $t$. Uma vez resolvido o programa dinâmico, podemos extrair nossa decisão de inscrição usando

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### Modelo C

O Modelo C modela o processo de aprendizado da taxa de inscrição $\tilde\lambda_{tt'}$ e da eficácia do medicamento $\tilde\rho_{tt'}$.

O Modelo C é quase idêntico ao modelo base, uma vez que estamos modelando todas as diferentes formas de incerteza. A única forma pela qual ele é um modelo de horizonte de previsão seria nossa introdução da política simplificada (nossa "aproximação de função de política") para interromper o ensaio e para determinar se o medicamento é um sucesso. No entanto, poderíamos ignorar essas políticas e formular todo o problema como um programa dinâmico, usando a variável de estado completa.

## O que aprendemos?

- Introduzimos o problema do ensaio clínico para ilustrar os desafios de um problema que envolve aprendizado ativo (há variáveis de estado de crença) ao mesmo tempo em que gerencia um recurso finito (o orçamento para testar pacientes).
- Ilustramos três tipos de incerteza: o processo de inscrição de pacientes, a probabilidade de o medicamento ser bem-sucedido e o processo de sucessos para pacientes individuais.
- Identificamos duas decisões: se devemos interromper o ensaio e declarar sucesso ou fracasso, e a admissão de pacientes no ensaio.
- Em seguida, projetamos três tipos de políticas de horizonte de previsão que se distinguem pela forma como aproximamos o modelo de horizonte de previsão e pela forma como aproximamos as políticas dentro do modelo de horizonte de previsão.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>A variável de estado $S^n$ inclui crenças sobre duas quantidades incertas. Quais são essas quantidades incertas, e como as crenças sobre elas são capturadas na variável de estado?</li>
<li>Explique as três decisões que precisam ser tomadas durante o teste clínico.</li>
<li>Explique os tipos de informação exógena, e como eles são afetados pelas decisões e pelo estado do sistema.</li>
<li>Explique a lógica da política de horizonte de previsão chamada Modelo A, e discuta seus pontos fortes e fracos.</li>
<li>Explique a lógica da política de horizonte de previsão chamada Modelo B, e discuta seus pontos fortes e fracos.</li>
<li>Explique a lógica da política de horizonte de previsão chamada Modelo C, e discuta seus pontos fortes e fracos.</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Acima, escrevemos a política de horizonte de previsão direto completa como</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

Se realmente pudéssemos computar isso, teríamos uma política ótima. Vamos explorar essa política, e então aplicá-la ao nosso problema de teste clínico.
  <ol type="a">
    <li>Assuma que cada variável aleatória $W_{t+1}, \ldots, W_T$ pode assumir apenas os resultados 0 ou 1. A seguir, assuma que a decisão $x_t, \ldots, x_T$ também pode assumir apenas os valores 0 ou 1. A política na equação $\eqref{eq:optDLAclinicaltrials2}$ pode ser ilustrada como uma árvore de decisão. Desenhe a árvore para o horizonte $t, t + 1, t + 2$.</li>
    <li>Qual é a estrutura da política $X^\pi_{t'}(S_{t'})$ representada pela árvore de decisão na parte (a)? Dito de outra forma, que tipo de função é $X^\pi_{t'}(S_{t'})$ quando dada por uma árvore de decisão?</li>
  </ol>
</li>
<li><p>Como geralmente não podemos computar a equação $\eqref{eq:optDLAclinicaltrials2}$, precisamos substituir o modelo de horizonte de previsão completo por um modelo de horizonte de previsão aproximado, que escrevemos como</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

onde a dinâmica do nosso modelo de horizonte de previsão aproximado é governada por

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>Imagine que nossa política no modelo de horizonte de previsão seja uma função paramétrica como "pare de inscrever pacientes quando $\rhobar_t$ ficar fora do intervalo $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$." Para os propósitos desta questão, também podemos substituir a política de inscrição por uma simples "inscreva $\thetatilde^{enroll}$ pacientes" (isso seria um parâmetro estático). Podemos escrever essa função como $X^{\tilde \pi}(\Stilde_{tt'})$ onde $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$. Como você reescreveria a equação $\eqref{eq:policiesapproximateDLA3}$ para refletir que a política no modelo de horizonte de previsão é uma função paramétrica?</li>
    <li>A parte (a) implica que precisamos encontrar o melhor $\thetatilde$ para um determinado estado $\Stilde_{t,t+1}$ no tempo $t$. Isso significa que a solução ótima é, na verdade, uma função $\thetatilde_{t+1}(\Stilde_{t,t+1})$. Isso teria que ser computado dado que estamos no estado simulado $\Stilde_{t,t+1}$ no modelo de horizonte de previsão aproximado.

    Na prática, encontrar a política ótima cada vez que avançamos um passo parece complicado (e caro), já que teríamos que parar e ajustar $\thetatilde$ para qualquer estado $\Stilde_{t,t+1}$ em que caíssemos.

    Imagine agora que gostaríamos de simplificar o processo encontrando apenas um $\theta$ que usamos para todos os tempos $t$, e qualquer estado $\Stilde_{t,t+1}$. Escreva o problema de otimização que você teria que resolver para encontrar esse valor de $\theta$.</li>
    <li>O que muda nas equações $\eqref{eq:policiesapproximateDLA3}$ e $\eqref{eq:policiesapproximateDLA4}$ se substituirmos a variável aleatória $\Wtilde_{t,t'+1}$ no modelo de horizonte de previsão por uma previsão pontual $f^W_{tt'}$? Continue assumindo que a política é a função paramétrica que introduzimos na parte (a).</li>
    <li>Descreva as aproximações feitas no Modelo B de horizonte de previsão para o problema do teste clínico.</li>
  </ol>
</li>
</ol>

**Questões de programação**

Esses exercícios usam o módulo Python *ClinicalTrialsDriverScript.py* em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Defina o tamanho do teste como $T = 50$, o horizonte de previsão como $H = 5$ e execute uma simulação do Modelo A. Registre o tempo de parada e explique por que o modelo de horizonte de previsão determinístico produz o mesmo número de novos pacientes potenciais $x^{enroll}_{t}$ em cada tempo $t$.</li>
<li>Agora defina o horizonte de previsão como $H = 50$. Modifique o módulo *ClinicalTrialsDriverScript.py* para incluir um laço for e execute 10 simulações (iterações de teste) do Modelo B. Calcule a receita média em todas as simulações.</li>
<li>Ao escolher $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ para nosso PFA para determinar quando parar, geralmente escolhemos um $\theta^{stop-high}$ suficientemente grande para garantir que o medicamento seja bem-sucedido. Por outro lado, escolhemos um $\theta^{stop-low}$ grande para que, se a verdadeira taxa de sucesso do medicamento for baixa, interrompamos o teste antecipadamente antes de perder muito dinheiro. No entanto, não podemos deixar $\theta^{stop-low}$ muito alto, ou corremos o risco de interromper o teste antes de termos informações suficientes sobre a verdadeira taxa de sucesso do medicamento.

Fixe $\theta^{stop-high} = 0.8$ e varie $\theta^{stop-low}$ no intervalo $[0.77, 0.79]$, em incrementos de 0,005. Para cada $(\theta^{stop-low}, \theta^{stop-high})$ resultante, execute 5 simulações do Modelo B e calcule a receita média. Plote as receitas resultantes em função dos valores de $\theta^{stop-low}$.</li>
<li>Os Modelos A e B resolvem cada um um problema de horizonte de previsão em que pelo menos uma das estimativas $\lambdabar_{tt'}$ e $\rhobar_{tt'}$ é fixada no tempo $t$ no modelo base. O Modelo C usa apenas o modelo base na forma de uma política híbrida de busca de política-VFA para modelar o processo de aprendizado tanto da taxa de inscrição $\lambdabar_{tt'}$ quanto de $\rhobar_{tt'}$. No entanto, podemos criar uma versão de horizonte de previsão do Modelo C (chamada Extensão do Modelo C) na qual as inscrições $\tilde\Rhat_{t,t'+1}$ são geradas a partir da distribuição de Poisson truncada com média

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

e a distribuição de $\tilde\Xhat_{t,t'+1}$ é a mesma do Modelo B.

Sua tarefa é implementar a Extensão do Modelo C adicionando o método *model_C_extension_value_fn* ao módulo Python *ClinicalTrialsPolicy.py*. O método usa a model_C_extension_policy (que já está no código) que chama o *model_C_extension_value_fn* para calcular a função de valor para a equação de Bellman. Para escrever o método *model_C_extension_value_fn*, copie o código de *model_B_value_fn* e adicione um laço for adicional para as novas inscrições em $[0, x^{enroll})$ em passos de $x^{enroll}/10$. Modifique o valor do passo e o custo de Bellman para levar em conta a Extensão do Modelo C (dica: use o método *trunc_probs*).

Defina o tamanho do teste como $T = 50$, o horizonte de previsão como $H = 5$ e execute uma simulação da Extensão do Modelo C. Relate o tempo de parada e a receita.</li>
</ol>
{% endraw %}
