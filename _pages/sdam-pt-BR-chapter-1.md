---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: "Capítulo 1: Modelagem de problemas de decisão sequencial"
permalink: /sdam/pt-BR/chapter-1/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: c8dee8647c7936a6
---


{% raw %}
O processo de resolução de qualquer problema físico (e em particular qualquer problema de decisão sequencial) no computador exige a construção de um modelo matemático, como ilustrado na Figura 1.1. Durante décadas, a comunidade de pesquisa utilizou um arcabouço matemático padrão para problemas de decisão em que todos os dados são conhecidos com antecedência (conhecido como otimização determinística). Uma versão simples de um problema de otimização determinística, conhecida como programa linear, pode ser escrita

$$
\begin{align}
\min_x c^T x, \label{eq:linearprogram1}
\end{align}
$$

em que $x$ é um vetor de elementos que precisam satisfazer um conjunto de restrições que tipicamente são escritas

$$
\begin{align}
A x & =  b, \label{eq:linearprogram2}\\
x   & \geq 0. \label{eq:linearprogram3}
\end{align}
$$

<figure class="book-figure">
  <img src="/assets/images/sdam/modeling.png" alt="A ponte entre o mundo real e o computador é um modelo matemático." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 1.1.</span> A ponte entre o mundo real e o computador é um modelo matemático.</figcaption>
</figure>

Não é necessário entender as equações $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ (o que exige familiaridade básica com álgebra linear), mas milhares de estudantes se formam a cada ano em cursos onde aprendem essa notação, e também aprendem como traduzir uma ampla gama de problemas físicos para essa notação. Depois, existem pacotes de software que traduzem problemas nesse formato em uma solução. O mais importante é que essa linguagem notacional é falada em todo o mundo. A mesma afirmação pode ser feita sobre modelagem estatística/aprendizado de máquina, que hoje é uma comunidade muito maior do que as pessoas que entendem as equações $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$.

Não podemos fazer a mesma afirmação sobre problemas de decisão sequencial, que constituem uma classe de problemas estudada por pelo menos 15 comunidades diferentes, usando oito estilos notacionais fundamentalmente distintos, muitas vezes com uma matemática que exige treinamento avançado. Neste livro, usamos um estilo de ensino por exemplo para mostrar como modelar a classe incrivelmente rica de problemas que chamamos de problemas de decisão sequencial. Embora nos concentremos em problemas relativamente mais simples, nosso arcabouço pode ser usado para modelar *qualquer* problema de decisão sequencial. Além disso, o modelo resultante pode ser traduzido diretamente para software.

O fundamento analítico deste livro está contido em *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (RLSO), que é um texto de nível de pós-graduação centrado em metodologia. De tempos em tempos, faremos referência a material contido nesse livro para leitores que possam ter interesse em maior profundidade, e encorajamos os leitores com inclinação técnica a usar o RLSO como referência. No entanto, isso não é necessário. Este livro foi projetado para fornecer o embasamento contextual na forma de uma série de exemplos que devem permitir aos leitores pensar de forma clara e precisa sobre problemas de decisão sequencial, mesmo que nunca venham a escrever uma linha de código.

Este livro é voltado para estudantes de graduação ou de mestrado que tenham cursado uma disciplina de probabilidade e estatística (não é necessário conhecimento de programação linear, embora tenhamos um exemplo que exige a resolução de um programa linear). Todos os capítulos são construídos em torno de exemplos específicos, com exceção do capítulo 1, que fornece uma visão geral de todo o arcabouço de modelagem, e do capítulo 7, no qual fazemos uma pausa e usamos os seis primeiros capítulos para ilustrar alguns princípios importantes.

A apresentação não deve exigir matemática além do que seria esperado em um primeiro curso de probabilidade e estatística. Dito isso, o livro é centrado em mostrar como descrever problemas de decisão sequencial usando uma notação suficientemente precisa para servir de base a um software de computador.

Módulos em Python acompanham a maioria dos capítulos; esses módulos foram escritos em torno do arcabouço de modelagem que perpassa todo o livro. Ao mesmo tempo, qualquer pacote de software que simule um problema de decisão sequencial, independentemente de como está sendo resolvido, pode ser traduzido diretamente para o arcabouço de modelagem que usamos. Por essa razão, encorajamos os leitores a olhar para qualquer trecho de notação como uma variável em um programa de computador.

## Primeiros passos

Problemas de decisão sequencial sempre podem ser escritos como

$$
decision,\ information, \ decision, \ information, \ decision, \ldots
$$

Cada vez que tomamos uma decisão, incorremos em um custo ou recebemos uma contribuição ou recompensa (há muitas maneiras de medir o desempenho). As decisões são tomadas com um método que chamaremos de *política*. Um objetivo importante, que é o foco central deste livro, é projetar políticas eficazes que funcionem bem ao longo do tempo, na presença da incerteza de informações que ainda não chegaram.

Problemas de decisão sequencial são onipresentes, surgindo em praticamente todo processo humano. A Tabela 1.1 fornece uma amostra de campos, com exemplos de algumas das decisões que podem surgir. A maioria desses campos provavelmente tem muitos tipos diferentes de decisões, variando em complexidade desde quando vender um ativo ou adotar um novo design de site, até escolher o melhor medicamento, material ou instalação a projetar, ou gerenciar cadeias de suprimentos complexas ou despachar uma frota de caminhões.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Campo</th><th>Questões</th></tr></thead>
<tbody>
<tr><td>Negócios</td><td>Quais produtos devemos vender, com quais características? Quais fornecedores devemos usar? Que preço devemos cobrar?</td></tr>
<tr><td>Economia</td><td>Que taxa de juros o Federal Reserve deveria cobrar dado o estado da economia? Quais níveis de liquidez de mercado deveriam ser fornecidos?</td></tr>
<tr><td>Finanças</td><td>Em quais ações uma carteira deveria investir? Como um operador deveria proteger um contrato contra uma possível perda?</td></tr>
<tr><td>Internet</td><td>Quais anúncios devemos exibir para maximizar os cliques em anúncios? Quais filmes atraem mais atenção? Quando/como avisos em massa devem ser enviados?</td></tr>
<tr><td>Engenharia</td><td>Como projetar dispositivos, desde latas de aerossol até veículos elétricos, pontes até sistemas de transporte, transistores até computadores?</td></tr>
<tr><td>Saúde pública</td><td>Como devemos conduzir testes para estimar a progressão de uma doença? Como as vacinas devem ser alocadas? Quais grupos populacionais devem ser priorizados?</td></tr>
<tr><td>Pesquisa médica</td><td>Qual configuração molecular produzirá o medicamento que mata mais células cancerígenas? Que conjunto de etapas é necessário para produzir nanotubos de parede única?</td></tr>
<tr><td>Gestão da cadeia de suprimentos</td><td>Quando devemos fazer um pedido de estoque à China? Qual fornecedor deve ser usado?</td></tr>
<tr><td>Transporte de carga</td><td>Qual motorista deve mover uma carga? Quais cargas uma transportadora de carga completa deveria se comprometer a mover? Onde os motoristas devem ser domiciliados?</td></tr>
<tr><td>Coleta de informações</td><td>Para onde devemos enviar um drone para coletar informações sobre incêndios florestais ou espécies invasoras? Qual medicamento devemos testar para combater uma doença?</td></tr>
<tr><td>Sistemas multiagentes</td><td>Como uma grande empresa em um mercado oligopolista deveria licitar contratos, antecipando a resposta de seus concorrentes?</td></tr>
<tr><td>Algoritmos</td><td>Qual regra de passo (stepsize) devemos usar em um algoritmo de busca? Como determinamos o próximo ponto para avaliar uma função de custo elevado?</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 1.1.</span> Uma amostra de diferentes campos e decisões que precisam ser tomadas em cada campo.</p>
</div>

Ainda mais desafiador do que listar todos os tipos de decisões é identificar as diferentes fontes de incerteza que surgem em muitas aplicações. O comportamento humano, os mercados, os processos físicos, as redes de transporte, os sistemas de energia e a ampla gama de incertezas que surgem na área da saúde dão uma ideia da diversidade de diferentes fontes de incerteza.

No momento em que este livro está sendo escrito, a humanidade luta contra a disseminação de variantes da COVID-19. Lidar com essa pandemia foi descrito como "extremamente complexo" [USA Today, 8 de setembro de 2020], mas isso é, na verdade, resultado de uma falha em pensar sobre o problema de forma estruturada. Mostraremos ao leitor como decompor problemas em uma série de componentes básicos que levam a soluções práticas.

Nossa abordagem começa identificando alguns elementos centrais, como métricas de desempenho, decisões e fontes de incerteza, o que então leva à criação de um modelo matemático do problema. A próxima etapa costuma ser (mas nem sempre) implementar o modelo no computador, mas haverá muitos problemas em que o processo de construção de um modelo computacional é impraticável por diversas razões. Por essa razão, também consideraremos problemas em que precisamos testar e avaliar ideias no campo. Para melhorar o desempenho, primeiro precisamos aprender a tomar boas decisões ao longo do tempo (é assim que controlamos o sistema). Em seguida, voltamo-nos para o projeto do sistema.

Neste momento, a comunidade acadêmica não adotou um processo de modelagem padrão para problemas de decisão sequencial. Isso contrasta fortemente com a área dos problemas de otimização estáticos e determinísticos, que seguem um arcabouço rígido desde a década de 1950 (as equações $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ representam uma amostra desse arcabouço). Nosso processo de modelagem é baseado na apresentação do RLSO, um livro voltado a um público técnico, primordialmente interessado em desenvolver e implementar modelos no computador.

Em contraste, este livro é voltado a um público mais amplo, primordialmente interessado em aprender a *pensar* sobre problemas de decisão sequencial. Ele utiliza um estilo de ensino por exemplo que se concentra em comunicar o processo de modelagem, o qual acreditamos ser útil mesmo sem, ao final, criar modelos computacionais. Central à nossa abordagem é a criação de um modelo matemático que elimina a ambiguidade ao descrever problemas em inglês corrente (plain English). Para os leitores interessados em desenvolver modelos computacionais, a notação é o trampolim para a escrita de software. No entanto, usaremos a notação matemática principalmente para trazer clareza na descrição de um problema, mesmo que o leitor nunca pretenda escrever uma linha de código.

Nossa apresentação segue da seguinte forma:

- O Capítulo 1 fornece uma introdução leve ao arcabouço de modelagem universal, ilustrado usando dois problemas de estoque (um simples e outro ligeiramente mais complexo), seguido por uma breve discussão sobre a modelagem de incertezas. Em seguida, apresenta as quatro classes de políticas que abrangem todos os métodos para tomada de decisões.
- Os Capítulos 2–6 descrevem, cada um, um problema de decisão sequencial específico para ilustrar o arcabouço de modelagem usando um estilo de ensino por exemplo. Essas aplicações foram escolhidas para evidenciar cada uma das quatro classes de políticas.
- O Capítulo 7 retoma o arcabouço de modelagem universal com mais detalhes. É apresentada uma discussão muito mais cuidadosa das quatro classes de políticas, bem como dos diferentes tipos de variáveis de estado, usando os exemplos dos capítulos 2–6 para fornecer contexto.
- Os Capítulos 8–14 fornecem exemplos adicionais, usando contextos mais complexos para ilustrar conceitos de modelagem mais avançados, abrangendo tanto a modelagem de incertezas (em particular a modelagem de preços de eletricidade no [Capítulo 8](/sdam/pt-BR/chapter-8/)) quanto um conjunto mais rico de políticas.

Os capítulos de aplicação (2–6 e 8–14) seguem todos o mesmo esquema. Podem ser cobertos em qualquer ordem, tendo em mente que as aplicações dos capítulos 2–6 são mais simples e foram escolhidas para ilustrar cada uma das quatro classes de políticas. Leitores interessados em tópicos específicos de modelagem (como variáveis de estado, modelagem de incertezas, ou em ver diferentes exemplos de políticas) podem folhear os capítulos, pulando diretamente para os tópicos de seu interesse.

Cada capítulo termina com uma série de exercícios divididos em três categorias:

- Questões de revisão – São perguntas simples que podem ser usadas para reforçar uma compreensão básica a partir da leitura do capítulo.
- Questões de resolução de problemas – Estas introduzem desafios de modelagem que exigem habilidades de resolução de problemas.
- Questões de programação – A maioria dos capítulos possui exercícios de programação que se baseiam em um conjunto de módulos Python. Os módulos Python originais, escritos em Python 2, se beneficiaram de uma grande atualização feita pelo Professor Dennis Djanka, professor na Universidade de Karlsruhe, na Alemanha. A nova biblioteca pode ser baixada em [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). Algumas dessas questões exigem fazer modificações de programação no código Python.

## Afinal, o que é uma decisão?

Há uma longa história, que remonta a mais de 2.000 anos, aos tempos de Sócrates, Aristóteles e Platão, documentando o estudo de como as pessoas tomam decisões. Depois, há uma literatura substancial, principalmente desde a década de 1950 (mas com alguns trabalhos importantes anteriores), sobre a matemática de tomar decisões ótimas, consistindo em muitos milhares de artigos e livros. O que essa literatura parece negligenciar é a pergunta básica:

> *O que é uma decisão?*

Começamos com a observação de que uma decisão é uma forma de informação que afeta o comportamento de algum "sistema" que buscamos controlar. Implícita nesse sistema está uma ou mais medidas que quantificam o quão bem nosso sistema está funcionando. Precisamos então identificar um agente que controla algum aspecto do nosso sistema.

Dado esse fundamento, ajuda identificar três classes de informação:

1. O estado de conhecimento – Esta é a informação que temos agora e que é relevante para o desempenho do nosso sistema.
2. Informação que altera o estado de conhecimento que controlamos (isso exige identificar um agente controlador para nosso sistema).
3. Informação que chega ao nosso sistema e que altera o estado de conhecimento, mas que está além do nosso controle.

Referimo-nos à informação da classe 2 como *decisões*. Isso sugere uma definição formal de decisão, baseada em *Bridging Decision Problems, Volume I: Framing the Problem*:

> **Definição (formal):** Uma **decisão** é uma classe de informação endogenamente controlável.

Uma definição informal poderia ser:

> **Definição (informal):** Uma **decisão** é algo que controlamos.

Essas definições oferecem um ponto de partida, mas não aprendemos muito com elas. Muito mais interessante é identificar exemplos específicos de decisões, o que faremos a seguir.

## Tipos de decisões

Identificamos 10 tipos de decisões com base nos contextos e nas ferramentas que podemos usar para determinar as melhores decisões. São elas:

**1) Decisões físicas e financeiras** – Essas decisões surgem na gestão de recursos físicos e financeiros, como pessoas, equipamentos, instalações, produtos, água, energia, bem como recursos financeiros como caixa ou investimentos. As decisões incluem comprar, vender e modificar recursos, em que uma modificação pode significar movê-lo de um local para outro, reparar equipamentos, treinar uma pessoa ou combinar ingredientes para fazer um bolo.

**2) Decisões complexas/estratégicas** – São decisões que podem produzir múltiplas mudanças em um sistema (alterando recursos, parâmetros, crenças) e que tipicamente envolvem fontes significativas de incerteza. Essas decisões geralmente são avaliadas uma única vez, mas pode existir a opção de esperar e tomar a decisão mais tarde.

**3) Decisões de aquisição de informação/observação** – Incluem decisões como conduzir experimentos em laboratório, testes de campo ou simulações computacionais. Pode incluir fazer pesquisa de mercado, contratar um especialista, ou consultar um modelo de linguagem de grande porte.

**4) Decisões de comunicação/compartilhamento de informação** – Estas ocorrem em duas formas:

- a) Mensagens – Isso reflete o que dizemos em texto, vídeo e/ou áudio.
- b) Canais e momento – Isso cobre a escolha de como enviar a informação: texto/e-mails, publicação (impressa ou online), mídias sociais ou canais de publicidade. Também exige escolher o momento e a frequência.

**5) Métricas de desempenho e objetivos** – Estas representam a escolha crítica de quantificar o que estamos tentando alcançar, como maximizar receitas, minimizar custos, minimizar doenças ou maximizar votos recebidos.

**6) Escolha de funções** – Podem ser métodos para tomar decisões (políticas), a formulação de modelos de otimização, a escolha de métricas de desempenho, métodos de previsão ou estimação, ou o design de funções de transição (como a forma pela qual uma doença se espalha).

**7) Definição de parâmetros** – Frequentemente existem vários parâmetros que afetam o desempenho de um sistema. Podem ser preços, os coeficientes em um modelo estatístico, a temperatura usada em um processo de fabricação. Podem ser o peso atribuído a uma métrica de desempenho, ou metas de desempenho.

**8) Estimação ou identificação** – Podemos precisar identificar uma pessoa, prever a demanda ou nomear uma doença.

**9) Características e comportamentos** – Como projetar um produto, quais características um pacote de software deve ter, quais serviços devem ser fornecidos a um cliente, ou a área de estudo de um estudante, que determina quais habilidades ele terá ao se formar.

**10) Decidir o que decidir** – Embora geralmente não usemos análise formal para essa decisão final, é importante reconhecer quando estamos tomando uma decisão e se queremos abordá-la formalmente usando análise de dados e modelagem.

Implícita na identificação de decisões está a compreensão de como a decisão afeta o desempenho do sistema. Mover recursos físicos (tipo 1) tem um custo, enquanto satisfazer demandas traz receitas. Uma decisão pode ter um impacto imediato sobre uma ou mais métricas de desempenho (como frequentemente ocorre na gestão de recursos), mas muitas vezes as decisões precisam ser avaliadas ao longo do tempo, e dependem de informações que não são conhecidas no momento em que a decisão é tomada. Por essa razão, frequentemente estamos avaliando *como* estamos tomando decisões (ou seja, o método) em vez da decisão em si.

## Enquadrando o problema

O primeiro passo ao abordar um problema de decisão envolve responder a três perguntas:

- Quais são as métricas de desempenho?
- Que tipos de decisões estão sendo tomadas (e quem as toma)?
- Quais são as incertezas que afetam o desempenho?

Observe que as respostas a essas perguntas são fundamentais para qualquer problema de decisão. Neste livro, essas perguntas parecerão bastante simples, porque as respondemos no contexto dos modelos que já projetamos para resolver um problema. Em aplicações reais, as listas de métricas de desempenho, decisões e incertezas podem ser bastante extensas.

Como uma amostra da riqueza que o enquadramento de um problema pode assumir, encorajamos o leitor a consultar a monografia [*Framing the Problem*](/bridging-vol1/), dedicada exatamente a esse tópico. A monografia possui capítulos inteiros dedicados a cada uma dessas perguntas, ilustrados usando uma dúzia de aplicações diferentes.

O objetivo do processo de enquadramento é identificar o que importa, começando pelas métricas de desempenho, em que até mesmo um problema simples de estoque pode ser descrito com mais de 20 métricas de desempenho, 30 tipos diferentes de decisões e mais de 30 tipos de incertezas. A planilha listando esses itens pode ser encontrada em [tinyurl.com/PowellInventoryDecisions](https://tinyurl.com/PowellInventoryDecisions). Isso não significa que de fato construiremos um modelo com toda essa complexidade. Por essa razão, o livro apresenta um dispositivo chamado *matrizes de interação*, no qual um especialista do domínio prioriza as métricas e depois usa seu julgamento para identificar as decisões e incertezas que têm o maior impacto sobre as métricas mais importantes.

Este livro assume que já reduzimos um problema a um pequeno número de métricas, decisões e incertezas, e usa esses elementos para orientar o desenvolvimento de um modelo matemático.

## O processo de modelagem

Modelagem é uma arte, mas é uma arte guiada por uma estrutura matemática que garante que obtenhamos um problema bem definido, que podemos colocar no computador e resolver. Isso pode ser visto como a construção de uma ponte entre um problema do mundo real, confuso e mal definido, e algo com a clareza que um computador pode entender, mesmo que seu objetivo final não seja colocá-lo no computador.

Historicamente, se um esforço de modelagem envolvia tentar tomar decisões, as pessoas recorriam à estrutura bem conhecida da otimização determinística, que frequentemente se assemelha ao modelo dado pelas equações $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$, que consiste em variáveis de decisão $x$, uma função objetivo $cx$, e as restrições dadas por $\eqref{eq:linearprogram2}$–$\eqref{eq:linearprogram3}$.

O problema com essa estrutura clássica de modelagem é o que ela deixa de fora:

- Ela assume que todos os dados (contidos nas variáveis $A$, $b$ e $c$) que caracterizam o modelo são conhecidos perfeitamente.
- A maioria das decisões ocorre repetidamente ao longo do tempo, e ainda assim não há nenhum reconhecimento disso.
- Não há como representar o fluxo de informação para o sistema.
- Como subproduto, a solução ótima para esse modelo não pode antecipar eventos que afetam o desempenho de $x$ no campo.
- Não há como representar risco, uma questão importante em muitas aplicações.
- Ela assume um único tomador de decisão.

Os modelos matemáticos devem, antes de tudo, fornecer um caminho que nos diga como *pensar* sobre os problemas. Os modelos clássicos de otimização determinística que seguem o formato das equações $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ ignoram completamente qualquer coisa relacionada à evolução do nosso problema ao longo do tempo.

Este livro é inteiramente estruturado em torno de uma abordagem de modelagem chamada de *framework universal de modelagem*. Em resumo, ela aspira a representar *qualquer* aspecto de um sistema controlável. Nosso modelo padrão assumirá que o sistema evolui ao longo do tempo, à medida que novas informações chegam.

Nesta seção, apresentaremos uma versão bastante compacta do framework universal de modelagem. Em seguida, ilustraremos o framework, inicialmente usando um problema de estoque muito simples, mas depois introduzindo algumas extensões modestas. Após apresentar esses exemplos, voltaremos a uma apresentação mais detalhada do framework universal de modelagem.

### Uma apresentação compacta de um modelo dinâmico

Começamos observando que podemos modelar qualquer problema de decisão sequencial usando a sequência

$$
(S_0,x_0,W_1,S_1,x_1,W_2, \ldots, S_t, x_t, W_{t+1}, \ldots, S_T),
$$

onde:

- $S_t$ são as *variáveis de estado* que capturam tudo o que precisamos para:
    - a) Tomar uma decisão no tempo $t$.
    - b) Calcular as métricas de desempenho no tempo $t$.
    - c) Qualquer outra informação necessária para calcular (a) ou (b) em qualquer ponto no futuro.

  É melhor pensar em $S_t$ como o estado de informação ou, de forma mais geral, o estado de conhecimento, no tempo $t$.
- $x_t$ representa *variáveis de decisão* que capturam os elementos que controlamos, como se devemos vender uma casa, o caminho através de uma rede, a escolha de medicamento para um tratamento, o preço pelo qual vender um produto, ou a escolha de caminhão para mover uma carga de frete.
- $W_{t+1}$ é a informação que chega depois de tomarmos a decisão $x_t$, que pode ser o preço final de venda de uma casa, os tempos de viagem através de uma rede, como um paciente responde a um medicamento, as vendas de um produto a um preço, e as cargas de frete solicitadas após fazermos as atribuições iniciais. Vemos a informação em $W_{t+1}$ como vinda de fora do nosso sistema, o que significa que está fora do nosso controle. Por essa razão, nos referimos a ela como *informação exógena*.

  Há muitas situações em que é melhor pensar em $W_{t+1}$ como uma função $W_{t+1}(S_t,x_t)$ que depende do estado atual $S_t$ e/ou da decisão $x_t$. Discutimos isso em mais detalhes abaixo. Usaremos $W_{t+1}$ como nossa notação padrão, mas com o entendimento de que ela pode ser influenciada pelo estado $S_t$ ou pela decisão $x_t$.

A decisão $x_t$ é determinada por algum método que chamamos de *política*, que denotamos por $X^\pi(S_t)$. A notação $\pi$ carrega informação sobre a estrutura da função, que representamos por $f$ em um conjunto de funções potenciais $\Fcal$, e quaisquer parâmetros ajustáveis $\theta\in\Theta^f$, que são definidos pela estrutura da função. Por exemplo, uma política de estoque poderia ser pedir $\theta^{order}$ unidades sempre que o estoque cair abaixo de $\theta^{min}$, o que significa que os parâmetros ajustáveis são $\theta = (\theta^{order}, \theta^{min})$. A estrutura da função seria um exemplo de uma função $f$.

Assumimos que temos uma *função de transição* que recebe como entrada o estado $S_t$, a decisão $x_t$, e a informação exógena $W_{t+1}$, e nos fornece o estado atualizado $S_{t+1}$. Funções de transição são um conjunto de equações que atualizam cada elemento da variável de estado $S_t$, que pode ter apenas um elemento, ou dezenas de milhares (ou muito mais).

Incorremos em uma contribuição (ou custo) $C(S_t,x_t)$ quando tomamos a decisão $x_t=X^\pi(S_t)$ dada a informação no estado $S_t$. Nosso objetivo é encontrar a política que maximize algum objetivo que dependa das contribuições $C(S_t,x_t)$ onde $x_t=X^\pi(S_t)$. Para ambientes mais complexos, $C(S_t,x_t)$ pode, na verdade, ser um conjunto de métricas de desempenho, embora seja necessário combiná-las de alguma forma para identificar qual decisão $x_t$ escolher.

Esta é uma descrição bastante compacta de um problema de decisão sequencial. A seguir, descrevemos um conjunto de passos a seguir no processo de modelagem.

### Os passos no processo de modelagem

É possível dividir todo o processo de modelagem em sete passos (para os nossos propósitos). Precedendo esses passos (indicado abaixo como "Passo 0") há um breve resumo da complexidade técnica da aplicação para ajudar a orientar os leitores.

**Passo 0. Resumo do capítulo** – Abrimos cada capítulo com um resumo do que o capítulo vai abordar e, em alguns casos, como ele se relaciona com o material de outros capítulos. Os resumos indicam quais abordagens são usadas para modelar a incerteza e as políticas que são utilizadas.

**Passo 1. A narrativa** – Esta será uma descrição em inglês simples (ou, no nosso caso, em português simples) do problema. A narrativa não fornecerá todas as informações necessárias para criar um modelo matemático; em vez disso, é um primeiro passo que deve dar ao modelador a visão geral sem se perder na notação.

**Passo 2. Enquadrando o problema** – Isso consiste em responder a três perguntas:

- Quais são as métricas de desempenho?
- Que tipos de decisões estão sendo tomadas (e, em alguns casos, qual agente as está tomando)?
- Quais são as fontes de incerteza que afetam o desempenho?

**Passo 3. Identificando os elementos centrais do problema**, com ênfase especial em três dimensões de qualquer problema de decisão sequencial. Esses elementos são descritos sem o uso de matemática:

- Quais métricas estamos tentando impactar? Campos individuais (como gestão de cadeia de suprimentos, saúde, energia, finanças) serão, cada um, caracterizados por uma série de métricas que podem ser descritas usando termos como custos, receitas, lucros, recompensas, ganhos, perdas, desempenho e risco.
- Quais decisões estão sendo tomadas? Identificar decisões é bastante fácil para muitos problemas, como jogos de computador, mas se abordarmos um problema complexo, como responder a um processo de saúde pública, reduzir a pegada de carbono, ou gerenciar uma cadeia de suprimentos, então identificar todas as decisões pode ser bastante desafiador.
- Quais são as diferentes fontes de incerteza? Sobre o que estamos incertos antes de começar? Que informação chega exogenamente ao longo do tempo (isto é, chega depois de tomarmos uma decisão)? A Tabela 1.2 ilustra diferentes fontes de incerteza para um modelo de distribuição de vacinas contra a COVID (veja RLSO, Capítulo 10, para uma apresentação de 12 classes de incerteza).

Nos referimos ao processo de responder a essas três perguntas como *enquadrar o problema*.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Tipo de incerteza</th><th>Descrição</th></tr></thead>
<tbody>
<tr><td>1) Erros observacionais</td><td>Observar pessoas com sintomas; erros ao classificar pessoas com sintomas como tendo COVID</td></tr>
<tr><td>2) Incerteza exógena</td><td>Relatos de novos casos, mortes; disponibilidade de UTIs; produção real de vacinas</td></tr>
<tr><td>3) Incerteza prognóstica</td><td>Admissões hospitalares; desempenho futuro das vacinas; resposta da população às vacinas</td></tr>
<tr><td>4) Incerteza inferencial</td><td>Estimativas de taxas de infecção; estimativas de eficácia das vacinas</td></tr>
<tr><td>5) Incerteza experimental</td><td>Desempenho de medicamentos em um ensaio clínico; número de pessoas vacinadas</td></tr>
<tr><td>6) Incerteza de modelo</td><td>Taxas de transmissão da doença; disseminação geográfica das infecções</td></tr>
<tr><td>7) Incerteza transicional</td><td>Adições/retiradas dos estoques de vacinas</td></tr>
<tr><td>8) Incerteza de controle</td><td>Quais grupos populacionais foram vacinados; alocações de vacinas</td></tr>
<tr><td>9) Incerteza de implementação</td><td>Falha em vacinar</td></tr>
<tr><td>10) Erros de comunicação</td><td>Erros de relato do campo; falha em notificar quando ser vacinado</td></tr>
<tr><td>11) Incerteza de objetivo</td><td>Divergências sobre quem deveria ser vacinado</td></tr>
<tr><td>12) Incerteza ambiental</td><td>Se/quando uma vacina será aprovada; alocação de vacinas para diferentes estados, países</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 1.2.</span> Ilustração de diferentes tipos de incerteza que surgem na resposta de vacinação à pandemia de COVID.</p>
</div>

**Passo 4. O modelo matemático** – Aqui construímos a partir dos três primeiros elementos do Passo 2, mas agora precisamos criar um modelo matemático que consiste em cinco dimensões que se aplicam a todo problema de decisão sequencial:

- **Variáveis de estado $S_t$** – A variável de estado captura tudo o que você precisa saber no tempo $t$ para tomar uma decisão no tempo $t$, calcular custos e restrições, e, se necessário, simular seu caminho até o tempo $t+1$. Variáveis de estado podem incluir informações sobre recursos físicos (estoques ou a localização de um veículo, que entram no problema por meio de restrições), outras informações (como custos ou preços, que entram na função objetivo) e crenças sobre quantidades e parâmetros que não conhecemos perfeitamente (como previsões ou estimativas de como um paciente responderia a um medicamento).
- **Variáveis de decisão $x_t$** – Estas descrevem como vamos projetar ou controlar nosso sistema. As decisões precisam satisfazer restrições que escrevemos como $x_t \in \Xcal$ onde $\Xcal$ pode ser um conjunto de escolhas discretas, ou um conjunto de equações lineares. As decisões serão determinadas por *políticas*, que são funções (ou regras) que designamos por $X^\pi(S_t)$ e que determinam $x_t$ dado o que está na variável de estado. Políticas podem ser muito simples (comprar-na-baixa, vender-na-alta) ou bastante complexas.

  O índice $\pi$ carrega informação sobre o tipo de função que é usada para tomar decisões, e quaisquer parâmetros ajustáveis. Seja $f\in\Fcal$ a estrutura da função, $\Fcal$ o conjunto de funções possíveis, e seja $\theta\in\Theta^f$ quaisquer parâmetros ajustáveis para a função $f$. Nossa política seria então representada como $\pi = (f,\theta)$. Frequentemente escreveremos a política como $X^\pi(S_t\vert \theta)$ para indicar a dependência dos parâmetros ajustáveis.

  Voltaremos a isso com bastante detalhe mais adiante neste capítulo, e ao longo do livro. Cada um dos exemplos apresentados no livro foi escolhido para ajudar a ilustrar tipos específicos de políticas.
- **Informação exógena $W_{t+1}$** – Esta é a nova informação que chega depois que tomamos a decisão $x_t$ (mas antes de decidirmos $x_{t+1}$), como quanto vendemos após definir um preço, ou o tempo para completar o caminho escolhido. Quando tomamos uma decisão no tempo $t$, a informação em $W_{t+1}$ é desconhecida, então a tratamos como uma variável aleatória quando estamos escolhendo $x_t$.
- **A função de transição $S^M(S_t,x_t,W_{t+1})$** – Estas são as equações que descrevem como as variáveis de estado evoluem ao longo do tempo. Para muitos problemas reais, funções de transição capturam toda a dinâmica do problema, e podem ser bastante complexas. Em alguns casos, nem sequer conhecemos as equações, e temos que depender apenas das variáveis de estado que podemos observar. Escrevemos a evolução das variáveis de estado $S_t$ usando nossa função de transição como

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}),
$$

  onde $S^M(\cdot)$ é conhecido como o modelo de transição de estado (ou sistema) (daí o $M$ no sobrescrito). A função de transição descreve como cada elemento da variável de estado muda dadas as decisões $x_t$ e a informação exógena $W_{t+1}$. Em problemas complexos, a função de transição pode exigir milhares de linhas de código para ser implementada.
- **A função objetivo** – Isso captura as métricas de desempenho que usamos para avaliar nosso desempenho, e fornece a base para a busca sobre políticas. Deixamos $C(S_t,x_t)$ denotar a contribuição (se maximizando) ou o custo (se minimizando) da decisão $x_t$ que pode depender da informação em $S_t$. Em algumas configurações, é mais natural escrever a função de contribuição de período único como $C(S_t,x_t,W_{t+1})$, a função de contribuição avaliada no final do intervalo de tempo $(t,t+1)$, após $W_{t+1}$ ter sido observado. Por exemplo, podemos fazer um pedido de $x_t$ que chega imediatamente para atender a demanda incerta contida em $W_{t+1}$.

  Nosso objetivo é encontrar a melhor política $X^\pi(S_t)$ para otimizar alguma métrica, tal como:
    - Maximizar a soma esperada das contribuições ao longo de algum horizonte.
    - Maximizar o desempenho esperado de um projeto final que aprendemos ao longo de uma série de experimentos ou observações.
    - Minimizar o risco associado a um projeto final.

  Nossa forma mais comum de escrever a função objetivo é

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\},\label{eq:baseobjectivefunction}
\end{align}
$$

  onde "$\E$" é chamado de *operador de expectativa*, o que significa que estamos tirando uma média sobre qualquer coisa aleatória, o que pode incluir informação incerta no estado inicial $S_0$, assim como o processo de informação exógena $W_1, \ldots, W_T$. É padrão escrever o operador de expectativa, mas nunca conseguimos realmente calculá-lo. Mais adiante mostraremos como aproximá-lo executando uma série de simulações e tirando uma média, ou observando um processo em campo.

É preciso cautela ao interpretar o operador de expectativa "$\E$" na equação $\eqref{eq:baseobjectivefunction}$. O que esse operador literalmente significa é "tirar uma média sobre tudo que é incerto." A peça mais óbvia de incerteza é o processo de informação exógena $W_1, W_2, \ldots, W_t, \ldots, W_T$.

A transição do problema real (guiado pela narrativa) para os elementos do modelo matemático é talvez o passo mais difícil, pois frequentemente envolve solicitar informações de uma fonte não técnica.

Observamos que apresentamos o modelo inteiro sem especificar como tomamos decisões, o que é representado pela política $X^\pi(S_t)$. Chamamos isso de "*modelar primeiro, depois resolver*" e isso representa uma grande ruptura com a vasta literatura que trata de problemas de decisão sequencial. É difícil comunicar o quão importante é abordar problemas de decisão sequencial dessa forma.

**Passo 5. O modelo de incerteza** – Esta é a forma como modelamos os diferentes tipos de incerteza. Há duas maneiras de introduzir incerteza em nosso modelo:

1. Através do estado inicial $S_0$, que pode especificar uma distribuição de probabilidade para parâmetros incertos, como a forma como um paciente pode responder a um medicamento ou como o mercado pode responder a um preço.
2. Através do processo de informação exógena $W_1, \ldots, W_T$.

Temos três maneiras de modelar o processo de informação exógena:

- Criar um modelo matemático de $W_1, W_2, \ldots, W_T$.
- Usar observações históricas, como preços passados, vendas, ou eventos climáticos.
- Executar o sistema em campo, observando $W_t$ conforme acontecem.

**Passo 6. Projetando políticas** – Políticas são funções, então precisamos buscar a melhor função. (Sim, políticas são funções para escolher a melhor decisão, mas escolher a política também é uma decisão!) Fazemos isso identificando duas estratégias centrais para o projeto de políticas:

- Busca em uma família de funções para encontrar aquela que funciona melhor, em média, ao longo do tempo.
- Criar uma política estimando o custo ou contribuição imediata de uma decisão $x_t$, mais uma aproximação dos custos ou contribuições futuras, e então encontrando a escolha $x_t$ que otimiza a soma dos custos ou contribuições atuais e futuros. O Google Maps decide se deve virar à esquerda ou à direita otimizando sobre o tempo necessário para atravessar o próximo link na rede mais o tempo restante para chegar ao destino. Uma decisão de estoque pode otimizar sobre o custo de um pedido mais o valor estimado de manter uma certa quantidade de estoque no futuro.

Vamos ser muito mais explícitos sobre como identificar essas políticas. Uma seção posterior descreve quatro classes de políticas que incluirão *qualquer* método para tomar decisões (estas são metaclasses).

**Passo 7. Avaliando políticas** – Encontrar a melhor política significa avaliar políticas para determinar qual é a melhor. Há duas maneiras de avaliar uma política:

- Testar a política em um simulador de computador. Isso requer programar todas as equações no modelo de transição de estado $S^M(S_t,x_t,W_{t+1})$ necessárias para atualizar a variável de estado $S_t$. Também significa ser capaz de gerar amostras de $W_{t+1}$, o que muitas vezes é o aspecto mais sutil de um simulador.
- Observar como a política funciona na prática.

Simuladores podem ser complexos e difíceis de construir, e ainda estão sujeitos a aproximações de modelagem. Por esse motivo, a vasta maioria dos problemas práticos encontrados na prática tende a envolver testes em campo, o que é lento (leva um dia para simular um dia) e requer conviver com os resultados dos experimentos.

A única maneira de se familiarizar com um modelo matemático é vê-lo ilustrado usando um exemplo familiar. Começamos com um problema universal que todos nós encontramos no dia a dia: gerenciar estoques.

## Alguns problemas de estoque

Vamos ilustrar nosso framework de modelagem usando duas variações de um problema de estoque clássico, que é amplamente utilizado como aplicação para ilustrar certos métodos de resolução de problemas de decisão sequencial. Começamos com um exemplo simples de estoque que transmite os elementos centrais do nosso framework de modelagem, mas nos permite ignorar muitas das complexidades que exploraremos no restante do livro.

Em seguida, vamos fazer a transição para um problema de estoque *ligeiramente* mais complicado, que nos permitirá ilustrar alguns princípios de modelagem. Ao longo do livro, também vamos usar a ideia de começar com uma versão básica de um problema, e então introduzir extensões que sugerem os tipos de complicações que podem surgir em aplicações reais.

### Um problema simples de estoque

Um dos problemas de decisão sequencial mais familiares que todos nós vivenciamos cada vez que visitamos uma loja é um problema de estoque. Vamos usar uma versão simples desse problema para ilustrar os seis passos do nosso processo de modelagem que introduzimos acima:

**Passo 1: Narrativa** – Uma pizzaria precisa decidir quantas libras de linguiça pedir ao seu distribuidor de alimentos. O restaurante precisa tomar a decisão no final do dia $t$, comunicar o pedido que então chega na manhã seguinte para atender aos pedidos de amanhã. Se houver linguiça sobrando, ela pode ser mantida até o dia seguinte. O custo da linguiça, e o preço pelo qual será vendida no dia seguinte, são conhecidos com antecedência, mas a demanda não é.

**Passo 2: Os elementos centrais do problema são:**

- Métricas – Queremos maximizar os lucros dados pelas vendas de linguiça menos o custo de compra da linguiça.
- Decisões – Precisamos decidir quanto pedir no final de um dia, chegando no início do próximo.
- Fontes de incerteza – A única fonte de incerteza neste modelo simples é a demanda por linguiça no dia seguinte.

**Passo 3: O modelo matemático** – Isso consiste em cinco elementos.

**1) A variável de estado $S_t$** – Distinguimos entre a variável de estado inicial $S_0$, e a variável de estado dinâmica $S_t$ para $t > 0$. A variável de estado inicial $S_0$ consiste em parâmetros fixos e valores iniciais de variáveis que mudam ao longo do tempo, dando-nos

$$
S_0 = (R^{inv}_0, (p, c), (\Dbar, \sigmabar^D)).
$$

Dividimos o estado inicial em três tipos de variáveis:

- Valores iniciais do estado de recurso $R^{inv}\_0$.
- Valores dos parâmetros constantes $c$ e $p$.
- Nossa crença sobre as demandas, dada por uma distribuição normal com média $\Dbar$ e desvio padrão $\sigmabar^D$.

A variável de estado dinâmica $S_t$ é nosso estoque, que vamos chamar de $R^{inv}\_t$. Por enquanto, este é o único elemento da variável de estado dinâmica, então

$$
S_t = R^{inv}_t.
$$

Mais adiante, vamos introduzir elementos adicionais à nossa variável de estado.

**2) A variável de decisão** $x_t$ é quanto pedimos no tempo $t$, o que assumimos (por enquanto) chega imediatamente. Tomamos nossas decisões com uma política $X^\pi(S_t)$ que projetamos mais adiante.

**3) A informação exógena** é a demanda aleatória por nosso produto, que vamos denotar $\Dhat_{t+1}$, então $W_{t+1} = \Dhat_{t+1}$.

**4) Nossa função de transição** captura como o estoque $R_t$ evolui ao longo do tempo, o que é dado por

$$
\begin{align}
R^{inv}_{t+1} = \max\{0, R^{inv}_t+x_t-\Dhat_{t+1}\}. \label{eq:inventoryexampleequation}
\end{align}
$$

**5) Nossa função objetivo.** Para nosso problema de estoque, é mais natural calcular a contribuição incluindo o custo de compra do produto $x_t$ e a receita da satisfação da demanda $\Dhat_{t+1}$, o que significa que nossa função de contribuição de período único seria escrita

$$
C(S_t,x_t,\Dhat_{t+1}) = -cx_t + p \min\{R^{inv}_t+x_t, \Dhat_{t+1}\},
$$

onde $x_t = X^\pi(S_t)$. Dada uma sequência de demandas $\Dhat_1, \ldots, \Dhat_T$, o valor de uma política $\Fhat^\pi$ seria

$$
\Fhat^\pi(S_0) = \sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1}).
$$

Nossos lucros $\Fhat^\pi(S_0)$ são aleatórios porque dependem de uma sequência particular de demandas aleatórias $\Dhat_1, \ldots, \Dhat_T$. Finalmente, fazemos a média sobre essas demandas aleatórias tomando a expectativa:

$$
\begin{align}
F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1})\vert S_0\right\}. \label{eq:inventoryobjective}
\end{align}
$$

Aqui, o condicionamento no estado inicial $S_0$ pode ser lido como dizendo "tome a expectativa dado o que sabemos inicialmente." O condicionamento em $S_0$ é implícito sempre que tomamos uma expectativa, e como resultado muitos autores o omitem. No entanto, vamos incluir o condicionamento em $S_0$ para deixar claro que, se nossos insumos iniciais (incluindo crenças) mudarem, isso pode ter um efeito sobre como uma política se comporta.

**Passo 4. O modelo de incerteza** – A abordagem mais simples para modelar a incerteza é simplesmente usar dados históricos. O problema que podemos encontrar é que, se ficarmos sem linguiça, podemos não observar a demanda completa por linguiça naquele dia. Se conseguirmos capturar essa demanda perdida, então essa é uma abordagem razoável.

Uma alternativa é construir um modelo matemático. Podemos assumir que nossa demanda é normalmente distribuída com alguma média $\Dbar$ e desvio padrão $\sigmabar^D$. Se assumirmos que ambos são conhecidos, podemos escrever nossa demanda como

$$
\Dhat_{t+1} \sim N(\Dbar,(\sigmabar^D)^2),
$$

e aproveitar pacotes que podem amostrar da distribuição normal (por exemplo, no Excel isso é chamado de `Norm.inv`$(Rand(),\Dbar,\sigmabar)$ para gerar uma observação aleatória com média $\Dbar$ e desvio padrão $\sigmabar$.

Usando este modelo, podemos criar um conjunto de demandas $(\Dhat_1, \Dhat_2, \ldots, \Dhat_T)$. Então, podemos repetir isso $N$ vezes para criar $N$ sequências de $T$ demandas, dando-nos a sequência $(\Dhat^n_1, \Dhat^n_2, \ldots, \Dhat^n_T)$ para $n=1, \ldots, N$ que precisamos para estimar o valor da política (usamos isso abaixo no Passo 6).

**Passo 5. Projetando políticas** – A seguir, precisamos projetar um método para determinar nossos pedidos. Uma estratégia comumente usada para problemas de estoque é conhecida como política "order-up-to" (pedir até o limite), que se parece com

$$
\begin{align}
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases} \label{eq:introorderupto}
\end{align}
$$

onde $\theta = (\theta^{min},\theta^{max})$ é um conjunto de parâmetros que precisam ser ajustados. É chamada de "order-up-to" já que fazemos um pedido para elevar o estoque "até" o limite superior $\theta^{max}$.

**Passo 6. Avaliando políticas** – Há uma variedade de estratégias que poderíamos usar. Na prática, não podemos calcular a expectativa na função objetivo na equação $\eqref{eq:inventoryobjective}$, então tomamos uma série de amostras de demandas. Seja $\Dhat^n_1, \ldots, \Dhat^n_T$ uma amostra de demandas ao longo de $t=1, \ldots, T$, e assumamos que podemos gerar $N$ dessas. Agora podemos estimar nossos lucros esperados a partir da política $X^\pi(S_t)$ fazendo a média sobre as amostras para $n=1, \ldots, N$, o que é calculado usando

$$
\Fbar^\pi(\theta\vert S_0) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

Em termos simples, estamos simulando a política $X^\pi(S_t\vert \theta)$ $N$ vezes usando as amostras simuladas (ou observadas a partir do histórico) de demandas $\Dhat^n_1, \ldots, \Dhat^n_T$, e então fazendo a média do desempenho para obter $\Fbar^\pi(\theta\vert S_0)$. Em seguida, enfrentamos o problema de encontrar o melhor valor de $\theta$. Uma estratégia simples seria gerar $K$ valores possíveis $\theta_1, \ldots, \theta_K$, simulando cada um para encontrar $\Fbar^\pi(\theta_k\vert S_0)$ para cada $k$, e então escolher o valor de $\theta_k$ que funciona melhor. Esta não é uma estratégia ótima, mas fornece um ponto de partida simples e prático.

### Um problema ligeiramente mais complicado

O problema simples de estoque acima é um cenário clássico para demonstrar um método particular de resolução de problemas de decisão sequencial conhecido como programação dinâmica, que depende de ter uma variável de estado simples que a) seja discreta e b) não tenha muitos valores possíveis. Em nosso problema de estoque ligeiramente mais complicado, vamos ilustrar três tipos diferentes de variáveis de estado que representariam uma complicação seria para um método popular de resolução de problemas de decisão sequencial, mas não tem efeito sobre a política que escolhemos.

**Passo 1: Narrativa** – Novamente temos nossa pizzaria que precisa pedir linguiça, mas agora vamos permitir que o preço que pagamos pela linguiça varie de dia para dia, onde assumimos que o preço em um dia é independente do preço no dia anterior. Além disso, vamos assumir que, embora a demanda por linguiça de amanhã seja aleatória, receberemos uma previsão da demanda de amanhã que, mesmo não sendo perfeita, é melhor do que não ter previsão nenhuma. Fora isso, tudo sobre nosso problema mais complicado é o mesmo de antes.

**Passo 2: Elementos centrais** – Estes são:

- Métricas – Queremos maximizar os lucros dados pelas vendas de linguiça menos o custo de compra da linguiça, onde o custo varia de dia para dia.
- Decisões – Assim como em nosso problema de estoque mais simples, precisamos decidir quanto pedir no final de um dia, chegando no início do próximo.
- Fontes de incerteza – Agora há três fontes de incerteza: a diferença entre a demanda real e a previsão, a evolução das previsões de um dia para o outro, e o preço que pagamos pela linguiça.

**Passo 3: Modelo matemático** – Ainda temos os mesmos cinco elementos, mas agora o problema é um pouco mais rico:

**1)** Para construir a variável de estado, precisamos listar a informação (especificamente, informação que evolui ao longo do tempo) que é necessária em três partes diferentes do modelo: (1) a função objetivo, (2) a política para tomar decisões (que inclui as restrições), e (3) a função de transição. É claro que ainda não introduzimos nenhuma dessas funções, então você precisa ler adiante e verificar que nossa variável de estado contém todas as informações necessárias para calcular cada uma dessas funções. Pense nisso como um dicionário das informações que vamos precisar.

Começamos com o estado inicial $S_0$ que consiste em parâmetros constantes, e valores iniciais de quantidades e parâmetros que mudam ao longo do tempo. Estes são:

- Estoque inicial – Começamos com um estoque inicial $R_0$.
- Custo de compra inicial – $c_0$.
- Preço – Assumimos que vendemos nossa linguiça a um preço fixo $p$.
- Previsão inicial – Assumimos que nossa primeira previsão $f^D_{0,1}$ é dada, onde $f^D_{0,1}$ é a previsão conhecida no tempo 0 para a demanda no tempo 1.
- Estimativa inicial do desvio padrão da demanda – $\sigmabar^D_0$.
- Estimativa inicial do desvio padrão da previsão – $\sigmabar^f_0$.

Isso significa que nossa variável de estado inicial é

$$
S_0 = (R_0,c_0, p, f^D_{0,1}, \sigmabar^D_0, \sigmabar^f_0).
$$

Temos então a informação que evolui ao longo do tempo, que compõe nossa variável de estado dinâmica $S_t$:

- Estoque atual $R^{inv}\_t$ – O estoque para o início do intervalo de tempo $(t,t+1)$.
- Custo de compra $c_t$ – Este é o custo da linguiça comprada no tempo $t$, que nos é dado no tempo $t$.
- Previsão de demanda $f^D_{t,t+1}$ – Esta é a previsão de $\Dhat_{t+1}$ dado o que sabemos no tempo $t$.
- Estimativa atual do desvio padrão da demanda – $\sigmabar^D_t$.
- Estimativa atual do desvio padrão da previsão – $\sigmabar^f_t$.

Nossa variável de estado dinâmica é então dada por

$$
S_t = (R^{inv}_t, c_t, f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t).
$$

**2)** A variável de decisão $x_t$ é quanto pedimos no tempo $t$, que assumimos (por ora) chegar imediatamente. Tomamos nossas decisões com uma política $X^\pi(S_t)$ que projetamos mais adiante.

**3)** A informação exógena agora consiste em:

- Custos de compra $\chat_{t+1}$ – Este é o custo de compra da salsicha no dia $t+1$, que é especificado exogenamente.
- Previsões – Em cada período de tempo, recebemos uma nova previsão. Seja $\varepsilon^f_{t+1}$ a mudança na previsão entre o tempo $t$ e $t+1$.
- Demandas – Por fim, assumimos que a demanda real é um desvio aleatório em relação à previsão, o que poderíamos escrever

$$
\Dhat_{t+1} = f^D_{t,t+1} + \varepsilon^D_{t+1}.
$$

Nosso conjunto completo de variáveis de informação exógena pode agora ser escrito

$$
W_{t+1} = \big(\chat_{t+1}, \varepsilon^f_{t+1}, \varepsilon^D_{t+1}\big).
$$

**4) Função de transição** – Isso especifica como cada uma das variáveis de estado (dinâmicas) $S_t$ evolui ao longo do tempo. Atualizamos nosso estoque usando:

$$
\begin{align}
R^{inv}_{t+1}       &= \max\{0, R^{inv}_t + x_t - \Dhat_{t+1}\}. \label{eq:introcomplexinventorytransition1}
\end{align}
$$

A demanda é a demanda prevista mais o desvio $\varepsilon^D_{t+1}$ em relação à previsão, o que nos dá a equação:

$$
\begin{align}
\Dhat_{t+1}   &= f^D_{t,t+1} + \varepsilon^D_{t+1}. \label{eq:introcomplexinventorytransition2}
\end{align}
$$

Assumimos que nossa previsão é atualizada usando

$$
\begin{align}
f^D_{t+1,t+2} &= f^D_{t,t+1} + \varepsilon^f_{t+1}. \label{eq:introcomplexinventorytransition3}
\end{align}
$$

A seguir, vamos estimar adaptativamente a variância na demanda e na previsão de demanda:

$$
\begin{align}
(\sigmabar^D_{t+1})^2 &= (1-\alpha)(\sigmabar^D_t)^2 + \alpha (f^D_{t,t+1} - \Dhat_{t+1})^2, \label{eq:introcomplexinventorytransition4}\\
(\sigmabar^f_{t+1})^2 &= (1-\alpha)(\sigmabar^f_t)^2 + \alpha (f^D_{t,t+1} - f^D_{t+1,t+2})^2, \label{eq:introcomplexinventorytransition5}
\end{align}
$$

onde $0 < \alpha < 1$ é um fator de suavização.

Por fim, atualizamos o custo $c_{t+1}$ com o "custo observado" $\chat_{t+1}$, o que escrevemos simplesmente como

$$
\begin{align}
c_{t+1} = \chat_{t+1}.\label{eq:introcomplexinventorytransition6}
\end{align}
$$

A equação $\eqref{eq:introcomplexinventorytransition6}$ é um exemplo de uma variável de estado que observamos em vez de calcular, como fizemos com o estoque $R^{inv}\_t$ em $\eqref{eq:introcomplexinventorytransition1}$. A equação $\eqref{eq:introcomplexinventorytransition1}$ é às vezes chamada de "baseada em modelo", pois reflete a física de como os estoques são atualizados, enquanto a equação $\eqref{eq:introcomplexinventorytransition6}$ é chamada de "livre de modelo", pois não fazemos nenhuma tentativa de modelar o processo subjacente que produz a mudança nos custos.

Nossa função de transição $S_{t+1} = S^M(S_t,x_t,W_{t+1})$ consiste nas equações $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$.

**5)** Por fim, nossa função de contribuição de período único seria agora escrita como

$$
C(S_t,x_t,\Dhat_{t+1}) = -c_tx_t + p \min\{R_t+x_t, \Dhat_{t+1}\},
$$

onde a única diferença em relação ao problema de estoque mais simples é que o custo $c$ agora depende do tempo $c_t$. Nós rompemos com nossa convenção de escrever a contribuição como $C(S_t,x_t)$ e permitimos que ela inclua receitas provenientes das demandas $\Dhat_{t+1}$.

Agora declaramos nossa função objetivo formalmente como

$$
\begin{align}
\max_{\pi=(f,\theta)} \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat_{t+1})\vert S_0\right\}. \label{eq:introcomplexinventoryobjective}
\end{align}
$$

A otimização $\max_\pi$ significa que estamos buscando entre todas as políticas possíveis representadas por $(f,\theta)$, o que literalmente significa buscar entre todas as diferentes funções que poderíamos usar para tomar uma decisão. Os exemplos neste livro vão demonstrar *como* vamos realizar essa busca entre funções.

Lembre-se de que anteriormente afirmamos que o índice $\pi$ carrega informação sobre o tipo de função $f\in\Fcal$, e quaisquer parâmetros ajustáveis $\theta\in\Theta^f$. Na prática, a busca entre os tipos de funções $f\in\Fcal$ tende a ser ad hoc (um analista experiente escolhe funções que fazem sentido para um problema), enquanto um algoritmo computacional realiza a busca pelo melhor valor de $\theta\in\Theta^f$.

**Passo 4. O modelo de incerteza** – Vamos assumir que as mudanças exógenas $\varepsilon^D_{t+1}$ e $\varepsilon^f_{t+1}$ são descritas por distribuições normais com média 0 e variâncias $(\sigmabar^D_t)^2$ e $(\sigmabar^f_t)^2$, o que expressamos escrevendo

$$
\varepsilon^D_t \sim N(0, (\sigmabar^D_t)^2), \quad \varepsilon^f_t \sim N(0, (\sigmabar^f_t)^2).
$$

Modelos de incerteza podem se tornar bastante complexos, mas isso servirá como ilustração.

**Passo 5. Projetando políticas** – A seguir, temos que projetar um método para determinar nossos pedidos. Em vez da política de "pedir até um nível" do nosso modelo mais simples, vamos sugerir a ideia de pedir o suficiente para atender à demanda esperada para o dia seguinte, com um ajuste. Poderíamos escrever isso como

$$
\begin{align}
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta. \label{eq:adjustedforecastpolicy}
\end{align}
$$

Se tivéssemos uma previsão perfeita, tudo o que teríamos que pedir seria $f^D_{t,t+1}$ (nossa previsão de $\Dhat_{t+1}$) menos o estoque disponível. No entanto, devido à incerteza, vamos adicionar um ajuste $\theta$ para que tenhamos algum amortecimento para evitar rupturas de estoque.

**Passo 6. Avaliando políticas** – Desta vez, temos que gerar amostras de todas as variáveis aleatórias na sequência $W_1, W_2, \ldots, W_T$. Novamente, podemos gerar $N$ amostras de toda a sequência para que possamos estimar o desempenho de uma política usando

$$
\Fbar^\pi(\theta) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

Novamente enfrentamos o problema de encontrar o melhor valor de $\theta$, mas retornaremos a esse desafio mais adiante.

## O arcabouço universal de modelagem

Estamos agora prontos para descrever com mais detalhes os elementos do arcabouço universal de modelagem (UMF, do inglês *universal modeling framework*). Notamos que o UMF pode modelar *qualquer* problema de decisão sequencial. Essa afirmação bastante ampla se tornará evidente conforme os elementos se desenrolam, já que estamos apenas aplicando notação à declaração geral de um problema de decisão sequencial.

### Os cinco elementos do UMF

O UMF consiste nos seguintes elementos:

1. As variáveis de estado $S_t$.
2. As variáveis de decisão $x_t$.
3. O processo de informação exógena $W_t$.
4. O modelo de transição de estado $S^M(S_t,x_t,W_{t+1})$.
5. A função objetivo.

Descrevemos estes com mais detalhes a seguir:

**Variáveis de estado** – O estado $S_t$ do sistema no tempo $t$ tem toda a informação que é necessária e suficiente para modelar nosso sistema a partir do tempo $t$ em diante. Mais especificamente, essa informação consiste em:

- a) A informação necessária para tomar uma decisão no tempo $t$.
- b) A informação necessária para calcular as métricas de desempenho no tempo $t$.
- c) Qualquer informação necessária agora para calcular (a) e (b) no futuro.

Há três tipos de informação em $S_t$:

- O estado físico, $R_t$, captura quantidades físicas como estoques, pessoas, máquinas disponíveis, instalações, água, medicamentos, energia e dinheiro (em suas várias formas). $R_t$ também incluirá solicitações de clientes por produtos ou serviços. Em muitas aplicações, $R_t$ descreve o recurso que está sendo gerenciado, e um erro bastante comum é equiparar "estado" a "estado físico".
- O estado de informação, $I_t$, que contém as funções sendo usadas (quando há uma escolha) e quaisquer parâmetros ajustáveis. $I_t$ pode especificar como estamos prevendo demandas, e os parâmetros usados para ajustar a previsão, além de quaisquer outros parâmetros que controlam a evolução do sistema.
- O estado de crença, $B_t$, que contém estimativas ou crenças sobre quantidades e parâmetros que não são perfeitamente conhecidos. Assim, $B_t$ poderia capturar a média e a variância estimadas de uma distribuição normal (como no nosso exemplo de previsão de demanda acima). Alternativamente, poderia ser um vetor de probabilidades que evolui ao longo do tempo.

O estado físico $R_t$ poderia ser a quantidade de dinheiro em uma conta, enquanto $I_t$ poderia ser o estado atual dos mercados de ações e bônus. Se estivermos viajando por uma rede dinâmica, $R_t$ poderia ser nossa localização na rede, enquanto $I_t$ poderia ser o que sabemos sobre os tempos de viagem em cada trecho. Se planejarmos um caminho e depois quisermos penalizar desvios do plano, então o plano seria incluído na variável de estado por meio de $I_t$.

As variáveis de estado tipicamente não são óbvias. Elas emergem durante o processo de modelagem, em vez de serem algo que você pode simplesmente escrever imediatamente. Apenas porque a escrevemos primeiro não significa que você sempre conseguirá listar todos os elementos da variável de estado de imediato. Mas, no final, é aqui que você armazena toda a informação necessária para modelar seu sistema a partir do tempo $t$ em diante.

**Variáveis de decisão** – Diferentes comunidades usam notações diferentes para decisão, como $a_t$ para uma ação (tipicamente discreta) ou $u_t$ para um controle (tipicamente contínuo) na engenharia. Usamos $x_t$ como nosso padrão, já que é amplamente usado pela comunidade de programação matemática.

As variáveis de decisão vêm em diferentes tipos:

- Binárias (por exemplo, para modelar se deve vender um ativo ou não, ou para testes A/B de diferentes designs de web).
- Discretas (por exemplo, escolha de medicamento, qual produto anunciar).
- Escalares contínuas (preços, temperaturas, concentrações).
- Vetores (discretos ou contínuos, como alocações de suprimentos de sangue entre hospitais).
- Categóricas (por exemplo, quais características destacar em um anúncio de produto).

Notamos que há classes de algoritmos determinadas pela natureza da variável de decisão.

Assumimos que as decisões são tomadas com uma política, que poderíamos denotar $X^\pi(S_t)$ se usarmos $x_t$ como nossa decisão. Assumimos que uma decisão $x_t = X^\pi(S_t)$ é viável no tempo $t$, o que significa $x_t \in \Xcal_t$ para algum conjunto (ou região) $\Xcal_t$, que pode depender de $S_t$.

Deixamos "$\pi$" carregar a informação sobre o tipo de função $f\in\Fcal$ (por exemplo, um modelo linear com variáveis explicativas específicas), e quaisquer parâmetros ajustáveis $\theta \in \Theta^f$.

**Informação exógena** – Deixamos $W_{t+1}$ ser qualquer nova informação que se torna conhecida primeiro no tempo $t+1$ (ou seja, entre $t$ e $t+1$), onde a fonte da informação é externa ao nosso sistema (por isso é "exógena"). Ao modelar variáveis específicas, usamos "chapéus" para indicar informação exógena. Assim, $\Dhat_{t+1}$ poderia ser a demanda que surge entre $t$ e $t+1$, ou poderíamos deixar $\phat_{t+1}$ ser a mudança no preço entre $t$ e $t+1$.

O processo de informação exógena pode ser estacionário ou não estacionário, puramente exógeno ou dependente do estado (e possivelmente da ação) (se decidirmos vender uma grande quantidade de ações, isso poderia pressionar os preços para baixo).

Deixamos $\omega$ representar uma trajetória amostral $W_1, \ldots, W_T$, que representa uma sequência de resultados de cada $W_t$. Frequentemente, criaremos um conjunto $\Omega$ de amostras discretas, onde cada amostra representa uma sequência particular dos resultados do nosso processo $W_t$, que poderíamos escrever como $W_1(\omega), \ldots, W_T(\omega)$. Se tivermos 20 trajetórias amostrais, podemos pensar em $\omega$ como consistindo em um número entre 1 e 20, o que nos permite consultar a trajetória amostral.

**Função de transição** – Denotamos a função de transição por

$$
\begin{align}
S_{t+1} = S^M(S_t,x_t,W_{t+1}), \label{eq:transition}
\end{align}
$$

onde $S^M(\cdot)$ também é conhecida por nomes como modelo de transição de estado, modelo de sistema, modelo de planta, equação de planta, equação de estado e função de transferência.

A equação $\eqref{eq:transition}$ é a forma clássica de uma função de transição que fornece as equações do estado $S_t$ para o estado $S_{t+1}$. A equação $\eqref{eq:inventoryexampleequation}$ foi a única equação de transição para nosso exemplo simples de estoque, enquanto as equações $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$ compuseram a função de transição para nosso exemplo mais complicado.

A função de transição pode capturar qualquer um dos seguintes tipos de atualizações:

- Mudanças em recursos físicos, como adicionar estoque, mover pessoas, ou modificar equipamentos.
- Atualizações de informação, como mudanças em preços e clima.
- Atualizações em nossas crenças sobre quantidades ou parâmetros incertos.

A função de transição pode ser um conjunto conhecido de equações, ou desconhecida, como quando descrevemos o comportamento humano ou a evolução do CO2 na atmosfera. Quando as equações são desconhecidas, o problema é frequentemente descrito como "livre de modelo" ou "orientado por dados", o que significa que só podemos observar mudanças em uma variável, em vez de usar um modelo físico. A equação $\eqref{eq:introcomplexinventorytransition6}$, onde "observamos" o custo $c_{t+1} = \chat_{t+1}$, sem nenhuma ideia de como evoluímos a partir de $c_t$, é um exemplo de uma transição livre de modelo.

Funções de transição podem ser lineares, não lineares contínuas ou funções escalonadas. Quando o estado $S_t$ inclui um estado de crença $B_t$, então a função de transição precisa incluir as equações de atualização (ilustramos isso mais adiante no livro).

Dada uma política $X^\pi(S_t)$, um processo exógeno $W_{t+1}$ e uma função de transição, podemos escrever nossa sequência de estados, decisões e informações como

$$
(S_0, x_0, W_1, S_1, x_1, W_2, \ldots, x_{T-1},  W_T, S_T).
$$

**Funções objetivo** – Há várias maneiras de escrever funções objetivo. Uma das mais comuns, que usaremos como padrão, maximiza contribuições totais esperadas ao longo de algum horizonte $t=0, \ldots, T$

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C_t(S_t,X^\pi_t(S_t\vert \theta))\vert S_0\right\}, \label{eq:objectivecumulativereward}
\end{align}
$$

onde

$$
\begin{align}
S_{t+1} = S^M(S_t,X^\pi_t(S_t),W_{t+1}). \label{eq:basetransition}
\end{align}
$$

O modelo está completamente especificado quando também temos um modelo do estado inicial $S_0$, e um modelo do processo exógeno $W_1, W_2, \ldots$. Escrevemos toda a informação exógena como

$$
\begin{align}
(S_0, W_1, W_2, \ldots, W_T). \label{eq:basestochasticmodel}
\end{align}
$$

As equações $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:basetransition}$ e $\eqref{eq:basestochasticmodel}$ constituem um modelo de um problema de decisão sequencial.

Seguindo adiante, por questão de compactação, vamos usar $\max_\pi$ para representar uma busca entre os tipos de funções $f\in\Fcal$ e parâmetros ajustáveis $\theta\in\Theta^f$.

A equação $\eqref{eq:objectivecumulativereward}$ usa uma esperança $\E$, o que significa tirar uma média sobre todos os resultados possíveis de $W_1, \ldots, W_T$. Isso praticamente nunca é possível de fazer computacionalmente. Em vez disso, deixe $\omega$ representar um único resultado da sequência $W_1, \ldots, W_T$, que poderíamos escrever $W_1(\omega), \ldots, W_T(\omega)$. Assuma que podemos criar $N$ resultados possíveis dessa sequência, e deixe $\omega^n$ representar como indexamos a sequência $n^{th}$.

Se estivermos seguindo uma trajetória amostral $\omega$, então reescreveríamos nossa função de transição em $\eqref{eq:basetransition}$ usando

$$
\begin{align}
S_{t+1}(\omega) = S^M(S_t(\omega),X^\pi_t(S_t(\omega)),W_{t+1}(\omega)). \label{eq:basetransition2}
\end{align}
$$

Indexamos cada variável na equação $\eqref{eq:basetransition2}$ por $\omega$ para indicar que estamos seguindo uma única trajetória amostral de valores de $W_t$.

Podemos agora substituir nossa função objetivo baseada em expectativa por uma média que podemos escrever

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0) = \frac{1}{N}\sum_{n=1}^N \sum_{t=0}^T C_t(S_t(\omega^n),X^\pi_t(S_t(\omega^n))). \label{eq:objectivecumulativerewardaverage}
\end{align}
$$

Frequentemente, estamos trabalhando apenas com uma única trajetória amostral, possivelmente do histórico. Nesse caso, estamos aproximando o desempenho da política usando essa única trajetória amostral, o que podemos escrever como

$$
\begin{align}
\max_\pi \Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))). \label{eq:objectivecumulativerewardsample}
\end{align}
$$

Sempre que escrevermos uma função objetivo usando uma expectativa como em $\eqref{eq:objectivecumulativereward}$, lembre-se de que o que realmente faríamos é usar uma média como fazemos em $\eqref{eq:objectivecumulativerewardaverage}$ ou uma amostra como em $\eqref{eq:objectivecumulativerewardsample}$.

A expectativa também pode precisar refletir a incerteza no estado inicial $S_0$, o que pode capturar crenças sobre previsões incertas, ou estimativas incertas sobre o estado da doença em um paciente. Nesse caso, a trajetória amostral $\omega$ precisa incluir amostras dessas distribuições iniciais.

Haverá algumas configurações em que faz mais sentido usar um contador $n$ em vez do tempo. Nesse caso, deixamos $S^n$ ser o estado após $n$ observações (estas podem ser experimentos, chegadas de clientes, iterações de um algoritmo). Usaremos o tempo $t$ como nosso índice padrão.

### As variáveis de estado iniciais $S_0$

Precisamos distinguir entre o estado inicial $S_0$ e os estados subsequentes $S_t$ para $t > 0$:

- **$S_0$** – O estado inicial $S_0$ captura i) parâmetros determinísticos que nunca mudam, ii) valores iniciais de quantidades ou parâmetros que mudam (possivelmente devido a decisões), e iii) crenças sobre quantidades ou parâmetros que não conhecemos perfeitamente (isso pode ser os parâmetros de uma distribuição de probabilidade), como respondemos a uma vacina ou como o mercado responderá ao preço. As crenças podem permanecer estáticas, ou podemos atualizá-las à medida que aprendemos com as observações.
- **$S_t$** – Esta é toda a informação de que precisamos no tempo $t$ do histórico para modelar o sistema a partir do tempo $t$ em diante. $S_t$ para $t > 0$ inclui apenas variáveis que estão mudando ao longo do tempo, o que significa que no tempo $t$ também podemos estar usando informação estática contida em $S_0$.

Escrevemos a dependência explícita do desempenho da política em relação ao estado inicial $S_0$, seja usando $F^\pi(S_0)$, $\Fbar^\pi(S_0)$ ou $\Fhat^\pi(\omega\vert S_0)$. Embora isso deva ser óbvio, é frequentemente negligenciado. O estado inicial inclui elementos como:

- Valores iniciais das quantidades de recursos físicos ou financeiros $R_0$ – Isso pode ser estoques iniciais, a localização inicial de um veículo, as máquinas disponíveis e o conjunto inicial de instalações. Também inclui quaisquer valores estáticos, como uma rede de transporte, o tamanho de um armazém (que não muda) e o número de caminhões em uma frota.
- Valores iniciais de parâmetros, junto com quaisquer funções usadas para modelar o problema $I_0$ – Isso pode ser um preço inicial, o nível de medicação em um paciente, junto com a escolha de funções para realizar previsões ou modelar a evolução de doenças em uma população.
- Crenças ou estimativas iniciais de qualquer quantidade ou parâmetro $B_0$ – Isso pode ser uma previsão de demanda, a estimativa de como os mercados respondem a preços, como um candidato presidencial está nas pesquisas, ou crenças no desempenho de um processo de fabricação.

Notamos que ajuda separar valores iniciais que nunca mudam daqueles que evoluem ao longo do tempo, seja diretamente como resultado de decisões ou de informação exógena. Valores que nunca mudam são armazenados em $S_0$, mas não são representados em $S_t$ para $t > 0$. A razão para isso é o desejo de manter $S_t$ o mais compacto possível.

Suponha que nossa política $X^\pi(S_t\vert \theta)$ tenha parâmetros ajustáveis. Por exemplo, podemos estar gerenciando um sistema de estoque em que usamos a familiar política "pedir até completar" (conhecida na literatura de estoque como uma política $(s,S)$) dada por

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & R_t < \theta^{min},\\ 0 & \text{otherwise.}\end{cases}
$$

onde $\theta = (\theta^{min},\theta^{max})$. Por simplicidade, podemos assumir que, quando fazemos um pedido, ele chega imediatamente (uma suposição padrão de livro-texto que nunca é verdadeira na prática), o que nos permite escrever a evolução do nosso estado físico $R_t$ (a quantidade em estoque logo antes de fazermos nosso pedido instantâneo) usando

$$
R_{t+1} = \max\{0,R_t + x_t - \Dhat_{t+1}\}
$$

onde $x_t = X^\pi(S_t\vert \theta)$ e $\Dhat_{t+1}$ é a demanda pelo nosso produto ao longo do intervalo $(t,t+1)$ (esta é nossa informação exógena $W_{t+1}$). Finalmente, seja $C(S_t,x_t,W_{t+1})$ nosso lucro líquido ao longo do intervalo $(t,t+1)$ (o que não é importante agora).

Agora imagine que temos um processo de demanda histórica $W_1, W_2, \ldots, W_t, \ldots, W_T$ que nos permite executar uma simulação do nosso sistema. Seja $\omega$ representando essa sequência histórica de demandas (ou qualquer informação exógena). Escreveríamos o problema de encontrar o melhor conjunto de parâmetros de pedido $\theta$ usando

$$
\begin{align}
\max_\theta \Fhat^\pi(\omega,\theta\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))), \label{eq:optimizingtheta}
\end{align}
$$

onde a variável de estado evolui de acordo com

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi_t(S_t(\omega)), W_{t+1}(\omega)).
$$

Seja $\theta^\ast $ o valor de $\theta$ que encontramos otimizando $\eqref{eq:optimizingtheta}$. A forma correta de escrever esse valor ótimo é como uma função $\theta^\ast (S_0)$ que depende da informação em $S_0$ (também depende da trajetória amostral $\omega$). Isso ajuda a comunicar a realidade de que, se mudarmos os dados de entrada do nosso problema, representados por $S_0$, isso pode ter um impacto nos melhores valores dos nossos parâmetros de política $\theta$. Na verdade, podemos até ter que mudar nossa escolha de política!

### Variações

Existem duas variações importantes do nosso modelo matemático básico:

- **Do tempo $t$ para a iteração $n$** – Existem configurações de problemas em que é mais natural usar um contador $n$ do que o tempo $t$. Fazemos mais do que apenas mudar $t$ para $n$, já que vemos variáveis que mudam com iterações de forma diferente de uma evolução ao longo do tempo. Especificamente, colocamos o índice $n$ no sobrescrito, como $S^n$, $x^n$ e $W^{n+1}$.

  Uma razão para isso é que vemos um conjunto de variáveis ao longo do tempo $x_1, x_2, \ldots, x_t, \ldots, x_T$ como um vetor $x=(x_1, x_2, \ldots, x_t, \ldots, x_T)$, o que é útil ao modelar problemas determinísticos (podemos otimizar sobre todo o vetor $x$ de uma vez). Em contraste, vemos $x^n$ como uma função que está evoluindo ao longo do tempo.

  Mais praticamente, colocar $n$ no sobrescrito nos permite escrever simulações iterativas. Assim, escreveríamos o processo de informação ao longo do tempo para a iteração $n$ usando

$$
\omega^n = (W^n_1, \ldots, W^n_t, \ldots, W^n_T).
$$

  Se estamos buscando iterativamente pela melhor política, podemos escrever nossa política para a iteração $n$ usando $X^{\pi,n}(S_t)$, o que então produz

$$
S^n_0, x^n_0, W^n_1, \ldots, S^n_t, x^n_t, W^N_{t+1}, \ldots, S^N_T,
$$

  onde $x^n_t = X^{\pi,n}(S^n_t\vert \theta)$.
- **Otimizando a recompensa final** – Uma configuração comum é aquela em que estamos realizando busca estocástica, como aconteceria ao procurar pela melhor política. Cada iteração para avaliar o algoritmo pode exigir uma simulação ao longo do tempo, embora isso nem sempre seja o caso.

  Agora vamos assumir que nossa variável de decisão é o parâmetro $\theta$, e que temos um algoritmo $\Theta^\pi(S^{\theta,n})$ que funciona exatamente como uma política $X^\pi(S_t\vert \theta)$, mas onde $S^{\theta,n}$ captura o "estado" do algoritmo na $n$-ésima iteração.

  Algoritmos de busca são todos problemas de decisão sequencial, mas, ao contrário da maioria dos problemas de decisão sequencial ao longo do tempo, queremos executar $N$ iterações, e nos importamos apenas com nossa solução no final. Seja $\theta^{\pi,N}$ o valor de $\theta^n$ após $N$ iterações, enquanto seguimos o "algoritmo" (política) $\pi$.

  O valor $\theta^{\pi,N}$ depende da sequência específica do nosso processo de informação $W^1, \ldots, W^t, \ldots, W^N$, mas então temos que avaliá-lo usando um novo conjunto de amostras que vamos chamar de $\What$.

  Avaliamos o desempenho do nosso algoritmo usando uma função objetivo de recompensa final, que escrevemos como

$$
\begin{align}
\max_\pi \Fhat^\pi(S^\theta_0) &  = \E_{\What} F(\theta^{\pi,N}, \What)  \label{eq:objectivefinalreward1} \\
                                &\approx \frac{1}{M} \sum_{m=1}^M F(\theta^{\pi,N}, \What^m). \label{eq:objectivefinalreward2}
\end{align}
$$

  Dito de forma simples, avaliamos nossa política de aprendizado para $\theta$, que denotamos $\Theta^\pi(S^{\theta,N})$, simulando por $N$ iterações usando observações de $W^n$ (que pode ser uma simulação inteira ao longo do tempo $t$). Quando obtemos nossa estimativa final do parâmetro $\theta$, que chamamos de $\theta^{\pi,N}$, avaliamos o desempenho desse valor usando uma simulação separada em que fixamos $\theta = \theta^{\pi,N}$ e então criamos um novo conjunto de observações aleatórias que chamamos de $\What^m$ para $m=1, \ldots, M$.

## Modelando a incerteza

Para muitos problemas complexos (cadeias de suprimentos, sistemas de energia e saúde pública são apenas alguns exemplos), identificar e modelar as diferentes formas de incerteza pode ser um exercício rico e complexo. Vamos apontar as questões que surgem, mas não vamos tentar uma discussão completa dessa dimensão.

A incerteza é comunicada ao nosso modelo através de dois mecanismos: o estado inicial $S_0$, onde modelaríamos os parâmetros de distribuições de probabilidade descrevendo quantidades e parâmetros que não conhecemos perfeitamente, e o processo de informação exógena $W_1, \ldots, W_T$.

### Incerteza no estado inicial

A variável de estado inicial pode conter parâmetros determinísticos ou valores iniciais de quantidades e parâmetros que variam dinamicamente. Se isso é tudo que está no estado inicial, então ele não está capturando nenhuma forma de incerteza.

Existem muitos problemas em que não conhecemos algumas quantidades ou parâmetros, mas podemos representar o que sabemos através dos parâmetros de uma distribuição de probabilidade. Alguns exemplos são:

- A resposta de um paciente a um novo medicamento.
- Como um mercado responderá a uma mudança de preço.
- Quantas cabeças de alface vendáveis temos em estoque (um número incerto pode ter murchado e não ser mais vendável).
- O momento em que uma caixa de estoque previamente encomendada da China chegará.
- O valor de depósitos em um fundo mútuo varia aleatoriamente em torno de uma média $\lambda$, mas não sabemos qual é $\lambda$.

Estas são várias maneiras pelas quais podemos inicializar um modelo com incerteza em algumas das entradas.

Uma crença probabilística inicial pode vir de julgamento subjetivo, ou de observações ou experimentos anteriores.

### O processo de informação exógena

A segunda forma pela qual a incerteza entra em nosso modelo é através do processo de informação exógena. A variável $W_t$ contém informação que não é conhecida até o período de tempo $t$. Isso significa que temos que tomar uma decisão $x_t$ no tempo $t$ antes de sabermos o resultado de $W_{t+1}$.

Abaixo está uma lista de exemplos de $W_{t+1}$ que são revelados após uma decisão $x_t$ ser tomada:

- Escolhemos um caminho e, então, observamos o tempo de viagem no caminho.
- Escolhemos um medicamento e, então, observamos como o paciente responde.
- Escolhemos um catalisador e, então, observamos a resistência do material que ele produz.
- Escolhemos um produto para anunciar em um mercado on-line e, então, observamos as vendas.
- Selecionamos um design de interface web e, então, observamos o número de cliques que ele pode gerar.
- Alocamos fundos em um investimento e, então, observamos a mudança no preço do investimento.

Em cada caso, a informação que observamos após tomarmos a decisão afeta o desempenho da decisão (e qual decisão teria sido a melhor).

A esta altura, o leitor provavelmente já percebeu que $W_{t+1}$ é geralmente uma coleção de diferentes tipos de informação. Por exemplo, imagine que estamos tratando um paciente que está apresentando açúcar elevado no sangue. O médico quer experimentar diferentes estratégias, variando de dieta e exercício ou medicamentos para reduzir o peso, até medicamentos que visam especificamente o açúcar no sangue. As fontes de informação que o médico precisa processar podem incluir:

- Disposição do paciente para fazer uma dieta.
- Adesão do paciente às instruções da dieta.
- Disposição do paciente para aceitar injeções diárias para perda de peso.
- Perda de peso real (de qualquer programa).
- Mudança real no açúcar no sangue.

Cada um desses é um fluxo separado de informação. Podemos modelá-los introduzindo o conjunto $\Ical_t$, o conjunto de processos de informação no tempo $t$ (o conjunto pode mudar à medida que mudamos de estratégias, abrindo novos fluxos de informação). Podemos agora expressar os diferentes tipos de informação usando $W_{t+1,i}$, a realização da informação da fonte $i\in\Ical_t$, de modo que $W_{t+1} = (W_{t+1,i})\_{i\in\Ical_t}$.

Continuaremos usando $W_{t+1}$ para representar a nova informação chegando, mas o leitor deve lembrar que, em aplicações reais, isso normalmente vai incluir um conjunto inteiro de fontes de informação, cada uma com seus próprios comportamentos.

### Processos dependentes de estado/decisão

Existem muitas aplicações em que a informação $W_{t+1}$ depende do estado atual $S_t$ e/ou da decisão $x_t$. Alguns exemplos incluem:

- A falta de estoque pode desestimular clientes, reduzindo a demanda.
- Comprar uma grande quantidade de ações pode aumentar seus preços.
- A decisão de recomendar vacinas pode influenciar a progressão de uma doença.
- O número de geradores de energia em operação pode alterar os preços na rede elétrica.

Por esse motivo, é útil representar a informação exógena como uma função $W_{t+1}(S_t,x_t)$, a função de informação exógena que fornece a informação que chega no intervalo $(t,t+1)$.

Por exemplo, imagine que estamos comprando ou vendendo ações em grandes quantidades, o que pode influenciar o preço futuro. A dinâmica poderia ser escrita como

$$
\begin{align}
p_{t+1} = \theta^p_0 p_t + \theta^p_1 p_{t-1} + \theta^p_2 p_{t-2} + W_{t+1}(S_t,x_t). \label{eq:statedependentprice}
\end{align}
$$

O estado desse processo de preços seria escrito como

$$
S_t = (p_t, p_{t-1}, p_{t-2}).
$$

A variação aleatória no preço, dada por $W_{t+1}(S_t,x_t)$, reflete nossa crença de que a mudança no preço pode depender do preço atual (se o preço estiver alto, as mudanças futuras provavelmente serão negativas), bem como da quantidade que estamos comprando ($x_t > 0$) ou vendendo ($x_t < 0$).

É claro que gostaríamos de usar dados históricos para tentar separar qualquer influência estrutural de $S_t$ e $x_t$ sobre os preços futuros do ruído verdadeiramente exógeno. Assim, poderíamos propor um modelo

$$
W_{t+1}(S_t,x_t) = \theta^x x_t + \varepsilon_{t+1},
$$

em que poderíamos supor que

$$
\varepsilon_{t+1} \sim N(0, \vert x_t\vert  \sigma^2_t),
$$

Esse modelo assume que $\varepsilon_{t+1}$ tem média 0 e variância que cresce com o valor absoluto de $x_t$. A informação $W_{t+1}(S_t,x_t)$ teria então média $\theta^x x_t$, que é positiva se estivermos comprando ações ($x_t > 0$) e negativa se estivermos vendendo no mercado ($x_t < 0$).

Este livro continuará a usar $W_{t+1}$ como notação padrão, mas o leitor deve estar atento ao fato de que ela pode depender do estado atual e/ou da decisão tomada dado o estado.

### Estilos de incerteza

Identificar os tipos de informação é o primeiro passo para entender a incerteza. O próximo passo é caracterizar os diferentes estilos de incerteza. Um resumo de algumas das formas mais importantes pelas quais os processos de informação podem se comportar inclui:

- Variabilidade de granulação fina – Isso pode ocorrer em escalas de tempo de segundos (até mesmo frações de segundo), minutos, horas ou diariamente.
- Deslocamentos – A variabilidade de granulação fina de um processo normalmente representa variações em torno de uma média, mas há momentos em que a média mudará periodicamente para um novo nível. Isso pode refletir novas tecnologias, ajustes de concorrentes ou mudanças na economia.
- Explosões e demandas intermitentes – A propagação de uma doença pode criar uma onda de infecções, já que surtos podem se espalhar localmente. Um cliente pode adquirir um produto e recomendá-lo a amigos, que então contam a outros amigos.
- Picos – Uma tempestade de neve se aproximando pode criar um salto na demanda por leite, ovos e papel higiênico; a falha de um gerador de energia pode criar um pico nos preços de eletricidade.
- Eventos espaciais – Clima, doenças e mudanças em regulamentações podem criar variações aleatórias de natureza regional.
- Eventos sistêmicos – São eventos que podem afetar toda uma empresa (abrangendo fronteiras internacionais), um país inteiro, ou até mesmo ter impacto global. Isso pode surgir devido a um ataque cibernético às comunicações, mudanças na percepção pública e propaganda negativa.
- Eventos raros – Eventos raros podem surgir de diversas fontes, como terremotos, surtos de doenças ou ataques terroristas. Costumam ser eventos que ocorrem muito raramente, mas que podem ter um impacto significativo em uma organização quando de fato acontecem.
- Contingências – Essa categoria se refere a eventos que podem acontecer, mas para os quais não há histórico. Por exemplo, operadores de rede elétrica planejam para uma falha em usinas nucleares. Embora isso possa nunca ter ocorrido dentro de um país, o operador da rede ainda pode querer se preparar para o evento, caso ele venha a acontecer.

Esses comportamentos podem impactar a escolha da política para a tomada de decisões, tema que trataremos a seguir.

A incerteza é amplamente reconhecida como um problema para o qual empresas, organizações e até governos precisam se planejar. Frequentemente ignorado é o fato de que a razão para modelar a incerteza é entender como ela afeta as decisões. A incerteza está sempre associada a processos de informação que chegam no futuro, portanto precisamos pensar em como uma decisão tomada agora é afetada por essa informação futura.

## Projetando políticas

> *Uma política é um método para tomar uma decisão... qualquer método.*

Políticas são funções que usam a informação contida na variável de estado para tomar uma decisão. Isso parece ser um problema bem definido; afinal, a comunidade de aprendizado de máquina é construída inteiramente em torno do desafio de encontrar funções que se ajustem a um conjunto de dados de treinamento. Entretanto, projetar políticas é muito mais rico, como evidenciado pela diversidade de comunidades que trabalham nessa área.

A Figura 1.2 mostra as capas de livros representando aproximadamente 15 campos distintos que lidam com decisões sequenciais sob incerteza. Eles usam oito sistemas notacionais diferentes e adotam abordagens fundamentalmente distintas em relação à modelagem. Alguns confundem políticas (que envolvem problemas de otimização embutidos) com funções objetivo.

<figure class="book-figure">
  <img src="/assets/images/sdam/junglestochasticoptimization.png" alt="Uma amostra dos principais livros representando diferentes campos em otimização estocástica." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 1.2.</span> Uma amostra dos principais livros representando diferentes campos em otimização estocástica.</figcaption>
</figure>

### Métricas de desempenho de políticas

A otimização determinística é caracterizada por uma função objetivo que determina se uma decisão é melhor do que outra. Com problemas de decisão sequencial, normalmente teremos uma função objetivo que avalia o desempenho de uma política, como fizemos com as equações $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:objectivecumulativerewardaverage}$ e $\eqref{eq:objectivecumulativerewardsample}$.

Na prática, entretanto, as políticas são escolhidas com base em vários critérios concorrentes:

- Qualidade da solução – Normalmente estamos analisando o desempenho (por exemplo, custos, lucros, resultados de saúde) durante um determinado período, conforme expresso na versão amostrada do objetivo na equação $\eqref{eq:objectivecumulativerewardsample}$. Como isso é aleatório, precisamos considerar o desempenho médio e o desempenho no pior caso.
- Requisitos computacionais – Em contextos operacionais, o tempo de execução importa. Assim como no objetivo, o tempo necessário para calcular uma política é aleatório, portanto precisamos considerar o tempo médio de execução e o tempo de execução no pior caso.
- Transparência – Quão fácil é rastrear uma decisão até os dados de entrada, que podem conter erros.
- Flexibilidade/adaptabilidade – Problemas do mundo real podem ser complicados, e frequentemente precisamos nos adaptar a situações complexas.
- Complexidade metodológica – Se uma política está sendo implementada por um grupo interno de análise (por exemplo), eles precisarão considerar a probabilidade de conseguirem fazer um método realmente funcionar.
- Requisitos de dados – Diferentes políticas têm diferentes requisitos de dados.

As comunidades de otimização matemática ilustradas na Figura 1.2 podem falar sobre políticas ótimas, o que implica otimizar a esperança na equação $\eqref{eq:objectivecumulativereward}$. No entanto, é importante prestar atenção a todas essas características.

### As quatro classes de políticas

Os livros na Figura 1.2 apresentam uma variedade de formas de tomar decisões ao longo do tempo. Acontece que todas elas podem ser divididas em classes bem definidas de políticas. Existem duas estratégias fundamentais para criar políticas, cada uma das quais pode ser subdividida em duas classes, criando quatro classes de políticas:

**Busca de política** – É quando você pesquisa entre métodos (funções) para tomar decisões, simulando seu desempenho (como fazemos na equação $\eqref{eq:objectivecumulativereward}$), para encontrar o método que funciona melhor, em média, ao longo do tempo. Isso pode envolver a busca entre diferentes classes de métodos, bem como quaisquer parâmetros ajustáveis para um determinado método. Essa ideia abre duas classes de políticas:

- **1) Aproximações de função de política (PFAs)** – São funções analíticas de um estado que especificam diretamente uma ação. A política de reposição até um nível-alvo (order-up-to) na equação $\eqref{eq:introorderupto}$ é um bom exemplo, assim como nossa política de usar uma previsão ajustada na equação $\eqref{eq:adjustedforecastpolicy}$.
- **2) Aproximações de função de custo (CFAs)** – São políticas que envolvem resolver um problema de otimização que normalmente é uma simplificação do problema original, com parâmetros introduzidos para ajudar a política a funcionar melhor ao longo do tempo. Essa é uma ideia particularmente poderosa e amplamente utilizada na indústria. Temos diversas ilustrações de CFAs mais adiante no livro (começando pelo [Capítulo 4](/sdam/pt-BR/chapter-4/), para aprender o melhor medicamento para diabetes).

**Políticas de horizonte de previsão** – Podemos construir políticas eficazes otimizando a contribuição (ou custo) de uma decisão, mais uma aproximação das contribuições (ou custos) futuras resultantes da decisão tomada agora. Novamente, podemos dividi-las em mais duas classes de políticas:

- **3) Aproximações de função de valor (VFAs)** – Imagine que estamos percorrendo uma rede representada na Figura 1.3, na qual desejamos encontrar um caminho do nó 1 ao nó 11. Agora imagine que estamos no nó $S_t = i = 2$, onde $t$ conta quantos links já percorremos. Seja $V_{t+1}(S_{t+1})$ o valor (supondo que estamos maximizando) do caminho do nó $S_{t+1}$ (como os nós 4 ou 5) até o nó 11 (não se preocupe em como obtivemos $V_{t+1}(S_{t+1})$). Seja uma decisão $x_t$ o link que percorremos ao saírmos do nó $S_t = i$. O valor de estar no nó $S_t$ seria dado por

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big). \label{eq:bellmangraph}
\end{align}
$$

  A equação $\eqref{eq:bellmangraph}$ é conhecida como a *equação de Bellman*. Quando é usada para encontrar o melhor caminho em uma rede determinística como a que representamos na Figura 1.3, é bastante fácil visualizá-la.

<figure class="book-figure">
  <img src="/assets/images/sdam/bellmangraph.png" alt="Grafo determinístico simples para percorrer do nó 1 ao nó 11." style="max-width: 320px;">
  <figcaption><span class="fig-num">Figura 1.3.</span> Grafo determinístico simples para percorrer do nó 1 ao nó 11.</figcaption>
</figure>

  Há muitos problemas em que a transição do estado $S_t$ para $S_{t+1}$ envolve informação aleatória que não é conhecida no instante $t$. Vimos um exemplo simples de aleatoriedade em nosso primeiro problema de estoque, e um exemplo mais complicado em nosso segundo problema de estoque.

  Para esses problemas mais gerais, se estamos em um estado $S_t$, tomamos uma decisão $x_t$ e então observamos uma nova informação $W_{t+1}$ (que não é conhecida no instante $t$), isso nos levará a um novo estado $S_{t+1}$ de acordo com nossa função de transição

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

  Isso significa que, no instante $t$, quando precisamos escolher $x_t$, $W_{t+1}$ é uma variável aleatória, o que significa que $S_{t+1}$ também é uma variável aleatória. Nesse caso, precisamos inserir uma esperança na equação de Bellman e escrever a equação $\eqref{eq:bellmangraph}$ como

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \left\{V_{t+1}(S_{t+1})\vert S_t,x_t\right\}\big). \label{eq:bellmanstochastic}
\end{align}
$$

  Aqui inserimos a esperança $\E_{W_{t+1}}\lbrace \cdot\rbrace $, que literalmente significa fazer a média sobre todos os resultados aleatórios de $W_{t+1}$.

  A versão estocástica da equação de Bellman em $\eqref{eq:bellmanstochastic}$ é extremamente geral. O estado $S_t$ não significa apenas um nó em um grafo; ele captura toda (e qualquer) informação relevante para o problema. A dificuldade é que não podemos mais calcular a função de valor $V_t(S_t)$, o que, por sua vez, significa que não teremos acesso a $V_{t+1}(S_{t+1})$, que supomos conhecer nas equações $\eqref{eq:bellmangraph}$ e $\eqref{eq:bellmanstochastic}$.

  A estratégia que a comunidade de pesquisa tem usado ao tentar aplicar a equação de Bellman é recorrer ao campo do aprendizado de máquina para estimar uma aproximação estatística que vamos chamar de $\Vbar_t(S_t)$. Supondo que possamos chegar a uma aproximação razoável $\Vbar_{t+1}(S_{t+1})$, escreveríamos nossa política (nosso método para tomar uma decisão) usando

$$
\begin{align}
X^\pi(S_t) = \argmax_{x_t\in\Xcal_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \{\Vbar_{t+1}(S_{t+1})\vert S_t,x_t\}\big). \label{eq:introvbarpolicy}
\end{align}
$$

  A notação "$\argmax_x f(x)$" significa o valor de $x$ que maximiza a função $f(x)$. O índice $\pi$ carrega a informação que especifica a estrutura da função $f$, e quaisquer parâmetros ajustáveis $\theta$ que precisaríamos na aproximação $\Vbar_{t+1}(S_{t+1})$.

  Essa classe de política se encaixa em categorias como programação dinâmica aproximada e, mais frequentemente, aprendizado por reforço. Embora seja uma ideia poderosa, não é fácil de aplicar e depende de nossa capacidade de criar uma aproximação precisa $\Vbar_{t+1}(S_{t+1})$.

Existe uma literatura muito rica sobre métodos para aproximar funções de valor, mas isso não é uma panaceia. Este livro ilustrará essa ideia em alguns pontos, mas os leitores devem ficar atentos ao fato de que essa classe de políticas é bastante difícil de usar.

- **4) Aproximações de horizonte de previsão direto (DLAs)** – Existem muitos problemas em que simplesmente não conseguimos desenvolver políticas eficazes usando qualquer uma das três primeiras classes, e quando isso acontece, temos que recorrer às aproximações de horizonte de previsão direto. Vamos escrever isso em sua forma matemática completa mais adiante, mas por ora, vamos descrever as DLAs como sendo aquelas que tomam uma decisão agora ao mesmo tempo em que otimizam sobre um modelo (tipicamente aproximado) que se estende por um horizonte de planejamento.

  Uma DLA comum é criar um modelo aproximado que seja determinístico. É isso que fazemos quando usamos um sistema de navegação que encontra o caminho mais curto até o destino assumindo que conhecemos o tempo de viagem ao longo de cada elo da rede. Como regra geral, resolver um modelo estocástico exato do futuro é quase sempre impossível, então vamos investigar diferentes estratégias para aproximar o problema.

Ilustramos nosso arcabouço de modelagem usando dois problemas de estoque, e sugerimos duas políticas simples (formas de PFAs) com as equações $\eqref{eq:introorderupto}$ e $\eqref{eq:adjustedforecastpolicy}$, mas fizemos isso apenas para ter um exemplo concreto de política. Embora as PFAs sejam amplamente usadas na tomada de decisão do dia a dia, esses são exemplos especializados.

Em contraste, vamos afirmar que as quatro classes de políticas que acabamos de descrever (PFAs, CFAs, VFAs e DLAs) são universais, no sentido de que cobrem *qualquer* método que possamos usar para resolver *qualquer* problema de decisão sequencial. Para deixar claro, essas são metaclasses. Isto é, se pensarmos que um problema se presta a uma classe específica, ainda não terminamos, pois ainda precisamos projetar a política específica dentro dessa classe. Da mesma forma, sentimos que essas quatro classes fornecem um roteiro para orientar o processo de projeto de políticas.

### Testando políticas

Para testar o valor de uma política, vamos usar a equação $\eqref{eq:objectivecumulativerewardsample}$, que simula uma política sobre uma única trajetória amostral do processo de informação $W_t$. A parte mais difícil ao simular uma política é, tipicamente, criar o processo de informação exógena.

Seja $\omega$ uma trajetória amostral, onde $W_1(\omega), \ldots, W_T(\omega)$ representa uma trajetória amostral específica. A Tabela 1.3 ilustra 10 trajetórias amostrais de preços que são indexadas de $\omega^1$ a $\omega^{10}$. Se escolhermos $\omega^6$, então $W_7(\omega^6) = 44.16$.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>45.00</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>45.00</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>45.00</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.00</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>45.00</td><td>46.32</td><td>46.14</td><td>46.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>45.00</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.00</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>45.00</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>47.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>45.00</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>45.00</td><td>45.01</td><td>46.73</td><td>46.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabela 1.3.</span> Ilustração de um conjunto de trajetórias amostrais de preços, todas começando em $45.00.</p>
</div>

A questão é: como criamos uma amostra de observações como as retratadas na Tabela 1.3? Existem três estratégias típicas:

- Criar amostras a partir de dados históricos. Como há apenas um resultado em cada ponto no tempo, podemos criar múltiplas trajetórias amostrais combinando observações de diferentes períodos de tempo. Podemos escolher preços de anos diferentes, demandas de meses diferentes, ou tempos de viagem observados em dias diferentes. Essa abordagem não é possível quando a informação exógena depende do estado $S_t$ ou das decisões $x_t$.
- Simular a partir de um modelo matemático. Essa abordagem oferece a vantagem de conseguir gerar grandes amostras para obter estimativas estatisticamente confiáveis do desempenho de uma política. Esses modelos podem ser bastante sofisticados, mas é bem fácil criar modelos (mesmo sofisticados) que não reproduzem o comportamento de dados reais. O maior desafio é capturar correlações, seja ao longo do tempo, seja entre amostras (por exemplo, as demandas de diferentes produtos, os preços de diferentes ações, ou a velocidade do vento em diferentes localidades).
- Podemos testar uma ideia no campo, usando observações conforme elas realmente ocorrem. A vantagem disso é que estamos trabalhando com dados reais (o histórico pode não ser igual ao futuro). A desvantagem é que leva um dia para observar um dia de dados novos (e podemos precisar de muito mais do que um único dia de observações).

Se $W_{t+1}$ depende do estado $S_t$ e/ou da decisão $x_t$, então temos que conceber uma forma de refletir essa dependência. Criar um modelo matemático torna possível realizar muitas simulações no computador, mas criar amostras do processo de informação também requer recriar correlações ao longo do tempo, assim como no espaço. Encaminhamos o leitor para RLSO, Capítulo 10, para uma discussão mais detalhada sobre modelagem de incerteza.

## Próximos passos

Os próximos cinco capítulos do livro vão aplicar nosso arcabouço de modelagem a cinco problemas diferentes:

- [Capítulo 2](/sdam/pt-BR/chapter-2/) – Um problema de venda de ativos
- [Capítulo 3](/sdam/pt-BR/chapter-3/) – Planejamento adaptativo de mercado
- [Capítulo 4](/sdam/pt-BR/chapter-4/) – Aprendendo o melhor medicamento para diabetes
- [Capítulo 5](/sdam/pt-BR/chapter-5/) – Problemas de caminho mais curto estocástico - Estático
- [Capítulo 6](/sdam/pt-BR/chapter-6/) – Problemas de caminho mais curto estocástico - Dinâmico

Cada um desses capítulos seguirá o mesmo roteiro que usamos acima para descrever os dois problemas de estoque. Esse roteiro consiste em:

- Narrativa – Uma descrição em português simples do problema.
- O modelo universal – Este modelo seguirá nosso formato de descrever os cinco elementos de um problema de decisão sequencial: variáveis de estado, variáveis de decisão, variáveis de informação exógena, a função de transição e a função objetivo.
- Modelo de incerteza – Aqui fornecemos um possível modelo para quaisquer incertezas no problema.
- Projetando políticas – Vamos sugerir possíveis políticas para tomar decisões. Escolhemos nossos problemas de modo que os cinco contextos de aplicação nos deem um passeio por todas as quatro classes de políticas. Por ora, vamos deixar que o leitor tente reconhecer qual das quatro classes estamos escolhendo.
- Extensão – Por fim, podemos sugerir uma ou mais possíveis extensões do nosso problema básico que possam exigir a mudança da política.

Em seguida, retornamos às quatro classes de políticas no [Capítulo 7](/sdam/pt-BR/chapter-7/) e discutimos nosso arcabouço geral de modelagem, usando os problemas dos Capítulos 2–6 para ilustrar diferentes ideias de modelagem.

Após essa discussão, retornamos ao nosso padrão de capítulos de ensino por exemplo, mas usando problemas mais complexos. Nossos capítulos restantes cobrem os seguintes problemas:

- [Capítulo 8](/sdam/pt-BR/chapter-8/) – Armazenamento de energia I
- [Capítulo 9](/sdam/pt-BR/chapter-9/) – Armazenamento de energia II
- [Capítulo 10](/sdam/pt-BR/chapter-10/) – Gestão da cadeia de suprimentos I: O vendedor de jornais de dois agentes
- [Capítulo 11](/sdam/pt-BR/chapter-11/) – Gestão da cadeia de suprimentos II: O jogo da cerveja
- [Capítulo 12](/sdam/pt-BR/chapter-12/) – Otimização de cliques em anúncios
- [Capítulo 13](/sdam/pt-BR/chapter-13/) – Problema de gestão de sangue
- [Capítulo 14](/sdam/pt-BR/chapter-14/) – Otimização de ensaios clínicos

## O que aprendemos?

- Para começar, aprendemos o que é uma decisão!
- Apresentamos um modelo geral, chamado arcabouço de modelagem universal, para qualquer problema de decisão sequencial.
- Ilustramos o modelo usando primeiro um problema de estoque clássico, no qual o estado do sistema é a quantidade em estoque.
- Depois passamos a um problema de estoque um pouco mais complicado, no qual a variável de estado inclui o estado do recurso $R_t$ de estoque, uma variável de estado informacional na forma de preço $p_t$, e finalmente um estado de crença sobre a demanda futura $\Dhat_{t+1}$ na forma de uma média e variância estimadas.
- Aprendemos como modelar o fluxo de informação exógena que pode chegar de várias fontes diferentes. A informação exógena é representada como uma função que pode depender do estado e/ou da decisão.
- Ilustramos duas formas de uma classe simples de política conhecida como aproximação de função de política (ou PFA).
- Aprendemos que as políticas podem ser avaliadas de várias maneiras diferentes, que dependem do contexto e de como as decisões são usadas.
- Encerramos com uma breve visão geral das quatro classes de políticas. Ilustrações de todas as quatro classes serão fornecidas nos Capítulos 2–6, ponto em que fazemos uma pausa no [Capítulo 7](/sdam/pt-BR/chapter-7/) para discutir as políticas com maior profundidade, preparando o terreno para os problemas mais complexos dos Capítulos 8–14.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Quais são os cinco elementos do modelo matemático de um problema de decisão sequencial?</li>
<li>Qual é a diferença entre as variáveis no estado inicial $S_0$ e aquelas no estado dinâmico $S_t$ para $t > 0$?</li>
<li>Qual é a diferença entre uma decisão e a informação exógena?</li>
<li>Quais são as duas grandes categorias de políticas, e como elas são diferentes?</li>
<li>Compare as variáveis de estado do problema de estoque simples com as do problema de estoque mais complicado.</li>
</ol>

**Questões de resolução de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Compare as políticas dos dois problemas de estoque em termos de como elas tratariam um comportamento dependente do tempo. Por exemplo, nossa pizzaria pode ter demandas muito mais altas nos fins de semana do que nos dias de semana. Comente sobre o valor de tornar o parâmetro ajustável $\theta$ dependente do tempo (ou do dia da semana) em termos de como isso poderia melhorar a solução.</li>
<li>Contraste como você abordaria o ajuste do parâmetro $\theta$ para os problemas de estoque:
  <ol type="a">
    <li>Em um simulador.</li>
    <li>No campo.</li>
  </ol>
  Discuta as vantagens e desvantagens de cada abordagem.</li>
</ol>
{% endraw %}
