---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 10: Gestão da cadeia de suprimentos I: O problema do jornaleiro de dois agentes"
permalink: /sdam/pt-BR/chapter-10/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: b16196f414f7b8a3
---


{% raw %}
## Visão geral do capítulo

Um problema comum que surge em qualquer problema de gestão de cadeia de suprimentos é que você tem gestores ("agentes") que precisam de recursos, e têm que solicitar esses recursos a gestores de nível superior. Na prática, esses gestores de "campo" nunca sabem exatamente quanto vão precisar, e tendem a pedir a mais para evitar os custos significativos de ficar sem recursos. Os gestores "centrais" querem que os gestores de campo tenham o que precisam, mas estão cientes do incentivo que eles têm para pedir demais. Os gestores centrais, então, tendem a reduzir essas solicitações em um esforço para dar aos gestores de campo apenas o que eles precisam.

Ambos os gestores têm seu próprio "problema do jornaleiro", que vimos pela primeira vez no [Capítulo 3](/sdam/pt-BR/chapter-3/). Contudo, agora temos dois "jornaleiros" que estão competindo um contra o outro, já que cada um precisa criar uma aproximação de como o outro vai se comportar. Esse problema surge ao longo dos negócios, e ainda assim não parece ter atraído nenhuma atenção na literatura de pesquisa.

Esse problema exige que mergulhemos o pé na água da modelagem de problemas multiagentes. Usamos a estrutura de modelagem padrão que estivemos aplicando até agora, com a diferença de que agora criamos uma versão desses modelos para cada agente de tomada de decisão. Contudo, além de introduzir um conjunto mais rico de interações, a aplicação da estrutura de modelagem universal a cada agente permanece a mesma.

## Narrativa

Imagine que um gestor de campo da Amazon tem que fornecer reboques para transportar carga para fora de Chicago semanalmente. O gestor de campo tem acesso a informações que permitem estimar quantos reboques ele vai precisar naquela semana, mas o valor real pode ser maior ou menor. O gestor de campo então faz uma solicitação de reboques a um gestor central, que então faz um julgamento próprio sobre quantos reboques fornecer, e toma a decisão final sobre o número de reboques que serão fornecidos.

Os dois gestores trabalham para a mesma empresa, mas o gestor de campo está muito mais preocupado em ficar sem reboques, já que ele tem que fazer aluguéis de curto prazo se ficar sem reboques. O gestor central, por outro lado, não quer que o gestor de campo fique sem reboques, mas também não quer que ele tenha reboques em excesso, já que ela tem que pagar por esses reboques.

Assumimos que o processo se desenrola da seguinte forma:

**Passo 1:** O gestor de campo observa uma estimativa inicial de quantos reboques são necessários. Essa informação é privada ao gestor de campo.

**Passo 2:** O gestor de campo então solicita reboques ao gestor central, onde ele tipicamente infla sua solicitação para reduzir a probabilidade de ficar sem reboques.

**Passo 3:** O gestor central então decide quantos reboques dar ao gestor de campo, tipicamente reduzindo a solicitação dado o padrão de perceber que o campo pediu mais do que era necessário.

**Passo 4:** O gestor de campo recebe o número de reboques concedidos pelo gestor central, e então observa a necessidade real de reboques.

**Passo 5:** Os gestores de campo e central computam seu desempenho usando seus próprios custos de excesso (os reboques não utilizados) e falta (a demanda não coberta).

A tensão nesse problema surge primeiro porque a estimativa inicial de reboques necessários é apenas uma estimativa, que podemos assumir ser não-viesada (isto é, é verdadeira em média). O problema é que o gestor de campo tem um custo alto se ficar sem reboques, então sua estratégia é superestimar suas necessidades (lembre-se do problema do jornaleiro no [Capítulo 3](/sdam/pt-BR/chapter-3/)). O gestor central, por outro lado, provavelmente tem custos equilibrados por estar acima ou abaixo, e não quer pedir nem reboques demais nem de menos.

O que complica o problema é a estimativa inicial dada ao gestor de campo. Embora não seja perfeita, ela tem informação valiosa, já que indicará se um dia terá alta ou baixa demanda. Isso significa que o gestor central tem que prestar atenção à solicitação feita pelo gestor de campo, enquanto reconhece que o gestor de campo fará solicitações que são viesadas para cima. Sabendo disso, o gestor central tenderia a usar a solicitação do gestor de campo como ponto de partida, mas então reduzir isso para a alocação final. Não surpreendentemente, o gestor de campo sabe que o gestor central fará isso, e compensa de acordo.

## Enquadrando o problema

As respostas às nossas três perguntas de enquadramento são:

- **Métricas:** Cada agente tem sua própria métrica, que envolve minimizar o custo esperado de estar abaixo e acima.
- **Decisões:** O agente de campo decide quanto solicitar ao agente central. O agente central decide quanto da solicitação do agente de campo satisfazer.
- **Incertezas:** A incerteza central é a demanda real por recursos no campo. Então, o agente de campo tem que lidar com a incerteza de como o agente central vai responder às suas solicitações, e o agente central tem que lidar com a incerteza de quanto o agente de campo vai solicitar, o que reflete informação privada.

## Modelo básico

Vamos modelar o problema para ambos os agentes, já que a informação não é a mesma para os dois jogadores. Ao longo do modelo, estaremos nos referindo ao gestor de campo como $q$ e ao gestor central como $q'$.

### Variáveis de estado

A informação inicial disponível ao gestor de campo é a estimativa do número de reboques que serão necessários, que representamos usando $R^{est}\_{tq}$, a estimativa inicial de quantos reboques são necessários. Essa estimativa inicial pode ser viesada, então introduzimos uma estimativa desse viés usando $\delta^{est}\_{tq}$, a estimativa inicial da diferença entre $R^{est}\_{tq}$ e a demanda verdadeira. Também teremos que estimar o quanto o gestor central reduz a solicitação do gestor de campo, que representamos usando $\delta_{tq}$, a estimativa de quanto o gestor central vai reduzir a solicitação do gestor de campo. De forma similar, o gestor central vai aprender a diferença entre a solicitação feita pelo gestor de campo e o que o gestor de campo eventualmente precisa, que representamos por $\delta_{tq'}$, a estimativa da diferença entre o que o gestor de campo solicita e o que o campo eventualmente precisa.

A variável de estado para cada agente é a informação que eles têm antes de tomar uma decisão. Para o gestor de campo, a variável de estado é

$$
S_{tq} = (R^{est}_{tq}, \delta^{est}_{tq}, \delta_{tq}).
$$

A variável de estado para o gestor central é

$$
S_{tq'} = (x_{tqq'}, \delta_{tq'}).
$$

onde $x_{tqq'}$ é a solicitação feita pelo agente de campo $q$ ao gestor central $q'$ (introduzido a seguir).

### Variáveis de decisão

As decisões para cada agente são dadas por $x_{tqq'}$, o número de reboques que o agente $q$ pede ao agente $q'$, e $x_{tq'q}$, o número de reboques que o agente $q'$ dá ao agente $q$, que é o que é implementado no campo.

### Informação exógena

A informação exógena para o gestor de campo pode ser pensada como a estimativa inicial dos reboques necessários (embora coloquemos isso na variável de estado): $R^{est}\_{tq}$, a estimativa inicial de quantos reboques são necessários. Essa estimativa é conhecida apenas pelo agente de campo $q$.

Depois de tomar a decisão $x_{tqq'}$, então recebemos dois tipos de informação: o que o gestor central concede a nós, e então a demanda real requerida: $x_{tq'q}$, a decisão feita pelo gestor central em resposta à solicitação do gestor de campo; e $\Rhat_{t+1}$, o número real de reboques que o gestor de campo $q$ acaba precisando (essa informação também está disponível ao gestor central).

A informação exógena para o agente $q$ é então

$$
W_{t+1,q} = (x_{tq'q},\Rhat_{t+1}).
$$

Notamos de passagem que, embora essa informação seja indexada no tempo $t+1$, a solicitação concedida pelo gestor central, $x_{tq'q}$, é indexada por $t$ já que depende de informação disponível até o tempo $t$. A estimativa inicial $R^{est}\_{tq}$ é informação nova, mas chega antes que a decisão seja tomada, então ela é capturada na variável de estado para o agente de campo.

O gestor central recebe a solicitação inicial $x_{tqq'}$ que chega como informação exógena, mas como isso é recebido antes de ela tomar sua decisão, entra através da variável de estado para o gestor central. A única informação exógena para o gestor central é a demanda final, que pode então ser usada para atualizar crenças que influenciam decisões futuras. Isso significa

$$
W_{t+1,q'} = (\Rhat_{t+1}).
$$

### Função de transição

Para o gestor de campo, há três variáveis de estado: $R^{est}\_{tq}$, o viés $\delta^{est}\_{tq}$ entre a estimativa $R^{est}\_{tq}$ e o valor real $\Rhat_{t+1}$, e o viés $\delta_{tq}$ introduzido pelo gestor central quando o campo faz uma solicitação. A primeira variável de estado, $R^{est}\_{tq}$, chega diretamente como informação exógena. Os vieses $\delta^{est}\_{tq}$ e $\delta_{t,q}$ são atualizados usando

$$
\delta^{est}_{t+1,q} =  (1-\alpha) \delta^{est}_{tq}   + \alpha (\Rhat_{t+1} - R^{est}_{tq}), \qquad \delta_{t+1,q} = (1-\alpha) \delta_{tq}  + \alpha (x_{tqq'} - x_{tq'q}),
$$

onde $0 < \alpha < 1$ é um fator de suavização.

A função de transição para o gestor central é similar. Novamente, a decisão do gestor de campo, $x_{tqq'}$, chega à variável de estado exogenamente. Então, atualizamos o viés que o gestor central estima na solicitação do gestor de campo usando

$$
\delta_{t+1,q'} = (1-\alpha) \delta_{t,q'}  + \alpha (x_{tqq'} - \Rhat_{t+1}).
$$

### Função objetivo

Começamos definindo $c^o_q$, o custo unitário incorrido pelo gestor de campo para cada reboque em excesso (o que o campo paga por dia para cada reboque), também conhecido como o custo de excesso; $c^u_q$, o custo unitário incorrido pelo gestor de campo para cada reboque que tem que ser alugado para compensar a falta de capacidade, também conhecido como o custo de falta; e $c^o_{q'}, c^u_{q'}$, o custo de excesso e falta para o gestor central.

Os custos para cada agente são dados por

$$
C_{tq}(S_{tq},x_{tq'q}) = c^o_q \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q} \max\{\Rhat_{t+1} - x_{tq'q},0\},
$$

$$
C_{tq'}(S_{tq'},x_{tq'q}) = c^o_{q'} \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q'} \max\{\Rhat_{t+1} - x_{tq'q},0\}.
$$

O desempenho tanto do gestor de campo quanto do gestor central depende do número de reboques $x_{tq'q}$ que o gestor central dá ao campo. Essa decisão, entretanto, depende da decisão feita pelo gestor de campo.

As decisões do gestor de campo são tomadas com a política $X_{tq}(S_t\vert \theta_q)$, onde $\theta_q$ é um ou mais parâmetros ajustáveis que são usados para resolver

$$
\begin{align}
\min_{\theta_q}\E \left\{\sum_{t=0}^T C_{tq}(S_{tq},X_{tq}(S_t\vert \theta_q))\vert S_0\right\}.  \label{eq:fieldobjective}
\end{align}
$$

De forma similar, as decisões do gestor central são tomadas com a política $X_{tq'}(S_t\vert \theta_{q'})$ onde $\theta_{q'}$ é um ou mais parâmetros ajustáveis que resolvem

$$
\begin{align}
\min_{\theta_{q'}}\E \left\{\sum_{t=0}^T C_{t{q'}}(S_{tq'},X_{tq'}(S_t\vert \theta_{q'}))\vert S_0\right\}. \label{eq:centralobjective}
\end{align}
$$

Os problemas de otimização em $\eqref{eq:fieldobjective}$ e $\eqref{eq:centralobjective}$ têm que ser resolvidos simultaneamente, já que ambas as políticas têm que ser simuladas ao mesmo tempo. Claro que poderíamos manter $\theta_{q'}$ constante para o gestor central enquanto ajustamos $\theta_q$ para o gestor de campo, mas em última análise estamos procurando um mínimo local estável.

## Modelando a incerteza

Esse problema é orientado por dados, o que significa que reagimos aos dados à medida que chegam. Há três tipos de informação, dependendo de qual agente está envolvido:

- A estimativa inicial $R^{est}\_t$ dos recursos necessários.
- A solicitação $x_{tqq'}$, feita pelo gestor de campo, que chega ao gestor central. Essa decisão envolve lógica introduzida pelo gestor de campo, que pode incluir aleatorização. Isso chega como informação ao gestor central.
- A decisão $x_{tq'q}$ feita pelo gestor central que determina o número de reboques dados ao gestor de campo. Isso chega como informação ao gestor de campo.
- A realização final $\Rhat_{t+1}$ do número de reboques efetivamente necessários, que é revelada (neste modelo básico) a ambos os agentes.

Se desejarmos simular o processo, precisamos apenas modelar a geração de $R^{est}\_t$ e $\Rhat_t$. Mais precisamente, teríamos que gerar $R^{est}\_t$ a partir de uma distribuição, e o erro $\Rhat_t - R^{est}\_t$ a partir de outra distribuição.

## Projetando políticas

Para nosso problema do jornaleiro de dois agentes, temos que desenvolver políticas para cada agente. Começamos com a política para o gestor de campo.

### Gestor de campo

O gestor de campo começa com uma estimativa $R^{est}\_t$, mas tem que levar em conta três fatores:

**1)** A estimativa $R^{est}\_t$ pode ter um viés $\delta^{est}$ (não podemos ter certeza sobre a fonte da estimativa $R^{est}\_{tq}$). O viés é dado por

$$
\delta^{est}_{tq}= \E \Rhat_{t+1} - R^{est}_{tq}.
$$

Assim, se $\delta^{est}\_{tq} > 0$ então isso significa que $R^{est}\_t$ está viesado para cima.

**2)** O número verdadeiro de reboques necessários, $\Rhat_{t+1}$, é aleatório mesmo depois de você ter levado em conta o viés. O gestor de campo tem um custo maior por ter poucos reboques do que por ter reboques demais, então ele vai querer introduzir um viés para cima para refletir o custo mais alto de ser pego sem recursos suficientes.

**3)** O gerente central tem uma atitude equilibrada em relação a ter demais ou de menos, e conhece o viés do gerente de campo. Como resultado, o gerente central normalmente usará o pedido do gerente de campo, $x_{tqq'}$, assim como o gerente de campo pode estar ajustando um possível viés entre a estimativa $R^{est}$ e o valor real $\Rhat_t$. O gerente de campo sabe que o gerente central fará esse ajuste e, como resultado, precisa tentar estimá-lo e contrapô-lo. Como o gerente de campo conhece tanto seu pedido $x_{tqq'}$ quanto vê o que o gerente central fornece, a observação do viés no tempo $t$ é dada por

$$
\delta_{tq} =  x_{tq'q} - x_{tqq'}.
$$

Precisamos usar nossas estimativas das diferenças entre $R^{est}\_t$ e $\Rhat_t$, a diferença entre $x_{tqq'}$ e $x_{tq'q}$, e a diferença entre $x_{tqq'}$ e $\Rhat_t$. Propomos uma política para o gerente de campo dada por

$$
\begin{align}
X_{tqq'}(S_t\vert \theta_q) = R^{est}_t - \delta^{est}_{t-1,q} - \delta_{t-1,q}  + \theta_q. \label{eq:fieldpolicy}
\end{align}
$$

Esta política começa com a estimativa inicial $R^{est}\_t$, corrige o viés nesta estimativa inicial usando $\delta^{est}\_{t-1,q}$, então corrige o viés proveniente do gerente central $\delta_{t-1,q}$, e finalmente introduz um deslocamento que pode capturar os diferentes custos de excesso e falta para o gerente de campo. O parâmetro $\theta_q$ precisa ser ajustado.

Como não há um problema de otimização embutido (ou seja, um $\argmax_x$ ou $\argmin_x$), esta é uma clássica aproximação de função de política (PFA) parametrizada.

### Gerente central

Nossa política para o gerente central é dada por

$$
X_{tq'q}(S_t\vert \theta_{q'}) = x_{tqq'} - \delta_{t-1,q'} + \theta_{q'}.
$$

Aqui, começamos com o pedido feito pelo gerente de campo, subtraímos nossa melhor estimativa da diferença entre o pedido do gerente de campo e o que era efetivamente necessário, $\delta_{tq'}$, e então somamos $\theta_{q'}$, que é um parâmetro ajustável para o gerente central, onde $\theta_{q'}$ pode ser negativo.

### Busca de política

Agora temos duas políticas parametrizadas. O ajuste da política de campo seria feito com a função objetivo em $\eqref{eq:fieldobjective}$, enquanto o ajuste da política central seria feito com a função objetivo em $\eqref{eq:centralobjective}$. O truque aqui é que ambos os objetivos precisam ser simulados em paralelo, já que as políticas estão interconectadas. E enquanto ambas as simulações estão em execução, mantemos o registro dos objetivos de cada agente.

A forma correta de abordar a otimização dos parâmetros de cada agente é simular o comportamento de ambos os agentes simultaneamente, mas executar algoritmos de busca para cada agente como se fossem separados. O desempenho do agente de campo, por exemplo, seria afetado pelo comportamento do agente central, assim como o agente de campo é afetado por outras formas de informação exógena.

Esta simulação oferece uma oportunidade de explorar como as decisões de cada agente podem *mudar* o comportamento do outro agente. Exploramos isso mais a fundo nos exercícios.

## O que aprendemos?

- Apresentamos um problema multiagente básico que chamamos de "problema do jornaleiro de dois agentes", em que um agente de campo precisa solicitar recursos de um agente central. Embora ambos os agentes devam trabalhar juntos, cada um tem seus próprios custos de excesso (ter recursos demais) e falta (ter poucos, gerando demandas insatisfeitas).
- Modelamos informações privadas ao agente de campo e informações privadas ao agente central.
- O problema introduz a dimensão de estimar e antecipar o comportamento do agente central para ajudar o agente de campo a tomar decisões.
- Em cada instante, o agente de campo tem uma melhor estimativa do que deseja pedir dada a estimativa $R^{est}\_{tq}$ e o histórico de ajustes do pedido feitos pelo agente central. Dada a incerteza e o custo mais alto de ficar sem recursos do que ter excesso, é natural esperar que uma boa política seja pedir o que esperamos precisar mais uma margem para a incerteza, então começamos sugerindo políticas dessa forma.
- Este problema estabelece a base para incorporar uma crença sobre como o agente central responderá ao ajuste feito pelo agente de campo, já que assumimos que ela eventualmente vê o excesso ou a falta.
- Embora este problema pareça bastante simples, ele estabelece a base para muitos problemas de alocação de recursos multiagente mais complexos.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>O que é conhecido pelo agente $q$ mas desconhecido pelo agente $q'$? Da mesma forma, o que é conhecido pelo agente $q'$ mas desconhecido pelo agente $q$?</li>
<li>Há uma informação disponibilizada para ambos os agentes. Qual é ela?</li>
<li>Qual é a informação exógena que se torna disponível para o agente de campo? Qual é a informação exógena que se torna disponível para o agente central?</li>
<li>Existem três fontes de incerteza em nosso sistema. Quais são elas?</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Escreva os modelos dinâmicos tanto para o gerente de campo quanto para o gerente central. Lembre-se de que a decisão de um gerente se torna informação exógena para o outro.</li>
<li>O que aconteceria se o agente de campo simplesmente pedisse quantidades cada vez maiores? Que mecanismo poderia ser introduzido no modelo para minimizar essa instabilidade?</li>
<li>Crie uma estimativa de como a decisão do agente de campo, $x_{tqq'}$, pode afetar o comportamento do agente central. Em seguida, projete uma política que capture esse efeito, de modo que a decisão tomada pelo agente de campo antecipe o efeito de sua decisão.</li>
<li>Há apenas uma informação que pode ser usada para criar uma crença sobre a política de outro agente. Qual é essa informação?</li>
<li>Agora suponha que o agente de campo possa vender os recursos que obtém do agente central a um preço $p_{tq}$ que muda aleatoriamente de um período para outro. Isso significa que o agente de campo poderia reter parte ou a totalidade de seus recursos para um período posterior se o preço $p_{tq}$ estiver muito baixo. Expanda o modelo deste capítulo para lidar com esse cenário muito mais rico. Você precisará introduzir uma nova variável de decisão (quanto da demanda atender). Sugira uma aproximação de função de política para tomar a decisão.</li>
</ol>

**Questões de programação**

Estes exercícios usam o módulo Python *TwoNewsvendor* em [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Realize uma busca em grade sobre o viés dos gerentes de campo e central. Faça a busca no intervalo $[0,10]$ (em passos de 1) para o gerente de campo, e $[-11,0]$ (em passos de 1) para o gerente central. Execute o jogo por $N = 30$ períodos de tempo, e repita a simulação para 1.000 amostras (e tire uma média). Observe que você está somando as recompensas ao longo dos 30 períodos de tempo, mas tirando a média sobre as 1.000 amostras. Plote três mapas de calor para o seguinte:
  <ol type="a">
    <li>A recompensa total para o gerente de campo, para cada uma das combinações dos dois vieses.</li>
    <li>A recompensa total para o gerente central, para cada uma das combinações dos dois vieses.</li>
    <li>A recompensa total para a empresa (somando o gerente de campo e o gerente central), para cada uma das combinações dos dois vieses. Discuta as diferenças nas combinações ótimas de cada uma das três perspectivas. Cada jogador quer maximizar sua recompensa.</li>
  </ol>
</li>
<li>Agora vamos usar a política de aprendizado de estimativa de intervalo para aprender cada um dos vieses (veja a discussão de políticas no [Capítulo 4](/sdam/pt-BR/chapter-4/)). Seja $\theta^{IE}_q$ o parâmetro para a política IE do gerente de campo, e seja $\theta^{IE}_{q'}$ o parâmetro para a política IE do gerente central. Em vez de buscar o melhor viés, vamos buscar o melhor parâmetro para guiar a política de descoberta do viés.
  <ol type="a">
    <li>Execute o módulo Python variando cada parâmetro de aprendizado no intervalo $(0, 1, 2, 3, 4, 5)$. Isso significa 36 simulações no total (ao longo de um horizonte $N = 20$, e para 1.000 trajetórias amostrais). Plote os mesmos três mapas de calor que você fez para o exercício 10.</li>
    <li>Compare o comportamento dos mapas de calor da parte (a) com os mapas de calor do exercício 10. Tente explicar o comportamento dos agentes de campo e central escrevendo as políticas e pensando em como elas deveriam se comportar.</li>
    <li>Verifique que a busca direta pelo viés fornece a maior recompensa total. Quais são os pontos fortes e fracos de cada abordagem em um cenário mais realista, em que os parâmetros do problema podem mudar ao longo do tempo?</li>
  </ol>
</li>
<li>(Este exercício requer algumas modificações no módulo Python.) Considere agora um problema do jornaleiro de dois agentes em que o gerente central também possui alguma informação externa sobre a demanda. O que ele tem é uma estimativa muito mais ruidosa da demanda (digamos que o ruído seja, para nossos dados de planilha em que a demanda está sempre entre 20 e 40, três vezes maior do que o ruído da fonte que se comunica com o gerente de campo).

Redefina o viés do gerente central como a quantidade que ele adiciona à estimativa que recebe. Experimente uma abordagem de aprendizado em que o viés que ele seleciona é escolhido no intervalo $[-11, 0]$. Execute o programa e compare os resultados com o processo de aprendizado anterior. Como antes, execute o jogo por $N = 30$ períodos de tempo, e repita a simulação para 1.000 amostras (e tire uma média). Após $N = 30$ períodos de tempo, o agente central está dando mais peso à informação vinda do campo ou de sua outra fonte externa de informação? Por quê?</li>
<li>Considere o caso em que o gerente de campo está usando uma abordagem de aprendizado e o gerente central está usando uma estratégia punitiva. Como ele sabe que o campo recebe uma penalidade maior por fornecer menos do que a demanda, o gerente central calculará o viés anterior do campo (para o tempo $t-1$) e, se for positivo, na próxima rodada, aplicará um viés duas vezes maior em magnitude e de sinal oposto ao pedido do campo. Execute esse experimento e veja qual será o viés do campo após os 30 períodos de tempo. Comparando esta política com as políticas anteriores, o gerente central deveria empregar essa estratégia?</li>
</ol>
{% endraw %}
