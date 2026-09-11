---
layout: book
title: "Capítulo 4: Decisões"
permalink: /bridging-vol1/pt-BR/chapter-4/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: b9d7338fb39168d1
---


{% raw %}
<p class="book-byline"><em>Ligando Problemas de Decisão, Volume I — Enquadrando o Problema</em> &middot; Warren B. Powell</p>

Este livro inteiro é baseado na afirmação:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="If you want to run a better {anything} you have to make better decisions.">
</figure>

É evidente que, antes de podermos abordar o problema de identificar as melhores decisões, precisamos saber quais decisões estamos tomando.

Lembre-se, do Capítulo 1, que existem dois tipos de "problemas": focados em métricas e focados em decisões. Exemplos de cada um são:

- **Problemas focados em métricas:**
  - Gestão de cadeia de suprimentos – Minimizar estoques, maximizar a margem operacional.
  - Rede elétrica – Minimizar os custos de geração de energia.
  - Saúde pública – Minimizar mortes.
  - Gerenciamento de uma frota de caminhões – Maximizar a receita operacional líquida por motorista por semana.
  - Gerenciamento de um hotel - Maximizar o lucro operacional.
  - Conduzir uma campanha presidencial - Vencer a eleição.
- **Problemas focados em decisões:**
  - Gestão de cadeia de suprimentos – Quanto pedir, qual fornecedor usar.
  - Gestão de demanda – Como precificar um produto, quais canais de marketing usar.
  - Rede elétrica – Quais geradores programar para operação, quais turbinas a gás usar.
  - Gerenciamento de diabetes – Qual medicação usar para controlar o açúcar no sangue, em que dosagem.
  - Gestão de caixa de fundos mútuos – Quanto de caixa manter disponível para lidar com resgates, em quais ações investir.

Se começamos com uma métrica, nosso desafio é identificar as decisões que nos ajudarão a melhorar a métrica. Se começamos com decisões, então o problema é projetar a métrica. Contudo, mesmo quando achamos que conhecemos as decisões, precisamos ter certeza de que não deixamos nenhuma passar.

Existe uma extensa literatura matemática sobre o tema de otimização de decisões, mas mesmo esses livros carecem de uma definição padrão do que é uma decisão. Em vez disso, os livros introduzirão notação como o vetor de decisão "$x$," ou controle "$u$," ou ação "$a$," após o que darão exemplos e esperarão que o leitor "entenda". Embora isso funcione para problemas simples, cria uma barreira entre o modelo matemático e as aplicações reais.

Para aplicações complexas, como o gerenciamento de cadeias de suprimentos ou a solução de problemas de saúde pública, identificar decisões é muito mais desafiador do que identificar métricas. Isso não pretende trivializar a identificação de métricas, mas o conceito de métricas é bem compreendido tanto por especialistas do domínio quanto por modeladores. Quando perguntados sobre quais decisões estão envolvidas, executivos de negócios, profissionais médicos, engenheiros e cientistas frequentemente ficam sem resposta. Embora a palavra "decisão" seja familiar a todos, ela não parece ser um termo que usam na resolução de problemas do dia a dia, enquanto todos entendem "métricas" de alguma forma.

## Decisões e a língua inglesa

Parece que um bom ponto de partida para um capítulo sobre "decisões" seria oferecer uma definição. Ajuda notar que definições padrão, como as do dicionário Webster, incluem a variedade usual de significados para uma palavra conforme usada na língua inglesa. Por exemplo, vencer um jogo de beisebol é referido como uma "decision" (decisão). Neste livro, usamos "decisão" apenas para nos referirmos a situações em que temos um conjunto de escolhas e precisamos fazer a melhor escolha, o que, obviamente, implica a identificação de métricas de desempenho.

Começamos observando que decisões são sempre uma forma de informação. Ajuda colocar toda informação em três classes amplas:

1. Informação que já conhecemos em um determinado ponto no tempo. Referimo-nos a essa informação como o estado do nosso sistema (mais precisamente, o estado de conhecimento).
2. Informação que controlamos e que altera o estado.
3. Nova informação que chega e que não controlamos (embora possamos influenciá-la).

Informações das classes (2) e (3) produzem uma variável de estado atualizada (classe 1). Agora estamos prontos para definir uma decisão:

**Definição (formal):** Uma **decisão** é uma classe de informação endogenamente controlável.

Assim, decisões (que estão contidas em "variáveis de decisão") representam informações que criamos ao nomear uma escolha dentre um conjunto de opções.

Nossa definição formal exige muita sobrecarga para o que deveria ser um conceito muito simples, então oferecemos uma segunda definição:

**Definição (informal):** Uma **decisão** é algo que controlamos.

Essa definição evita "classe de informação" ao usar "algo", mas transmite a ideia.

Ambas as nossas definições levantam a questão de quem está tomando a decisão, que é inseparável do conceito de decisão. Modelos matemáticos clássicos evitam essa questão, mas ela é central para a modelagem da maioria dos sistemas reais.

Dada a importância das decisões nas atividades humanas, não deveria surpreender que existam vários termos em inglês que capturam o conceito de escolha. A Tabela 4.1 lista uma série de palavras que implicam fazer uma escolha em um contexto geral. Sob a coluna "Coletando informação" estão termos que surgem ao decidir qual experimento executar, a quem ouvir, o que observar (e assim por diante). A coluna rotulada "Agindo sobre recursos" lista uma variedade de termos que surgem no contexto de gerenciar recursos (como pessoas). Por exemplo, "promover" implica a decisão de promover ou não alguém (e a qual nível).

Esta tabela não pretende ser uma lista abrangente de palavras que implicam uma escolha, mas sugere que "decisões" surgem de muitas formas na língua inglesa.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 4.1.</span> A língua inglesa oferece uma variedade de palavras que significam a liberdade de escolher.</caption>
<thead>
<tr><th>Termos gerais</th><th>Coletando informação</th><th>Decisões de identificação</th><th>Agindo sobre recursos</th></tr>
</thead>
<tbody>
<tr><td>Action</td><td>Experiment (which?)</td><td>Identify</td><td>Promote (who, how much)</td></tr>
<tr><td>Choice</td><td>Listen (to what?)</td><td>Classify</td><td>Acquire (which, how much)</td></tr>
<tr><td>Control</td><td>Observe</td><td>Finding</td><td>Sell (to whom, how much)</td></tr>
<tr><td>Decision</td><td>Test (which one)</td><td>Conclude</td><td>Reward (how much)</td></tr>
<tr><td>Design</td><td>View/scan</td><td>Label</td><td>Criticize (who, how)</td></tr>
<tr><td>Intervention (medical)</td><td></td><td></td><td>Move (to where)</td></tr>
<tr><td>Option</td><td></td><td></td><td>Trade (which, to whom)</td></tr>
<tr><td>Move (where)</td><td></td><td></td><td>Treatment (which one)</td></tr>
<tr><td>Response (which one)</td><td></td><td></td><td>Accept/decline</td></tr>
<tr><td>Task</td><td></td><td></td><td>Recommend</td></tr>
<tr><td>Trade (finance)</td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>

## Identificando decisões

Compreender todas as diferentes palavras que implicam (ou exigem) fazer uma escolha é importante ao identificar as decisões que estão disponíveis para serem tomadas. É importante reconhecer que as decisões não vêm com etiquetas brilhantes coladas nelas. A Campbell's Soup Co. reconheceu o desafio de fazer os consumidores perceberem que estavam tomando decisões em uma famosa série de comerciais nos anos 1970, intitulada "*I could have had a V8!*" ("Eu poderia ter tomado um V8!"). O departamento de marketing da empresa percebeu que as pessoas frequentemente pegavam uma lata de refrigerante sem perceber que poderiam ter escolhido um V8 em vez disso. Os comerciais ajudaram a conscientizar os consumidores de que beber um refrigerante era uma decisão.

Pessoas em quase qualquer contexto de problema caem no hábito de resolver problemas de uma certa maneira, sem perceber que têm escolhas. Poder-se-ia dizer que é assim que conseguimos passar o dia, já que avaliar escolhas para identificar a melhor leva tempo. O desafio que enfrentamos é primeiro estar ciente de quando estamos tomando uma decisão e, em seguida, identificar as decisões que têm o maior impacto no desempenho.

O comportamento de tomar decisões passivamente é absolutamente disseminado, mas isso cria uma oportunidade. Imagine que você está em qualquer contexto de problema (como os ilustrados à esquerda na figura 4.1). Agora suponha que você queira melhorar o desempenho, seja lucratividade, produtividade, melhores resultados de saúde, medicamentos melhores, ou melhoria na agricultura. Então lembre-se da nossa afirmação básica:

> *Se você quer administrar melhor {qualquer coisa}, você precisa tomar melhores decisões.*

Para tomar uma decisão melhor, você precisa reconhecer quando está tomando uma decisão. Um bom exercício é criar seu "livro de decisões" e então fazer anotações mentais ao reconhecer quando uma decisão está sendo tomada (ou seja, havia uma escolha, e escolhas diferentes poderiam ser feitas).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/IdentifyingDecisions.jpg" alt="A challenge is to work in any of a variety of problem settings and identify the decisions that are being made." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.1.</span> Um desafio é trabalhar em qualquer um dentre uma variedade de contextos de problema (como os da direita) e identificar as decisões que estão sendo tomadas.</figcaption>
</figure>

## Tipos de decisões

Nossa abordagem de enquadramento requer a capacidade de identificar todas as decisões, não apenas decisões que possam ser tratadas por uma metodologia específica. Para orientar esse processo, listamos abaixo 10 tipos de decisões que, até onde sabemos, cobrem toda forma de informação que controlamos.

1. **Decisões físicas e financeiras** – Essas decisões surgem no gerenciamento de recursos físicos e financeiros, abrangendo pessoas, equipamentos, instalações, produtos, commodities, água, energia, além de caixa, investimentos, empréstimos, … As decisões incluem comprar, vender, mover e modificar recursos. Essa classe é o domínio da pesquisa operacional, do controle de engenharia e das finanças, e recorre fortemente a ferramentas como programação linear, inteira e não linear.
2. **Escolhas discretas com resultados incertos** – Este é um termo geral projetado para cobrir atividades que podem envolver projetos complexos, como o lançamento de um novo produto, submeter um medicamento a ensaios clínicos, ou adquirir uma empresa. Às vezes chamados de "projetos", estes podem envolver uma série de mudanças em métricas de desempenho, recursos, finanças e dinâmica do sistema. Casos especiais podem ser problemas mais simples, como escolher um preço ou quem contratar para uma posição de liderança. Esses problemas são populares na literatura de análise de decisão e normalmente envolvem conjuntos relativamente pequenos de ações que são difíceis de avaliar.
3. **Decisões de aquisição/observação de informação** – Essas incluem decisões de adquirir ou observar informações executando experimentos em laboratório, em campo, ou com simulações computacionais. Ajuda distinguir dois contextos nos quais podemos adquirir informação:
   - Aprendizado offline - São atividades conduzidas em um ambiente de teste. A aquisição de informação offline pode incluir esforços de pesquisa, buscas na internet, ou a contratação de especialistas do domínio.
   - Aprendizado online - Isso cobre decisões de executar e observar processos em campo usando uma abordagem de "aprender fazendo", que envolve observar um processo à medida que evolui, como a forma que um mercado responde à publicidade ou à precificação, ou como um paciente responde a um tratamento.

Ambos os estilos de aquisição de informação implicam tomar decisões especificamente para adquirir informação. A aquisição de informação tem sido estudada sob nomes como delineamento de experimentos (estático ou sequencial), busca estocástica, aprendizado ativo (ou ótimo), bandidos multibraços (multiarmed bandits) e otimização bayesiana.

4. **Decisões de comunicação/compartilhamento de informação** – Estas vêm em duas formas:
   - Mensagens – Isso reflete o que dizemos em texto, vídeo e/ou áudio. Um exemplo moderno de mensagem inclui a otimização de prompts.
   - Canais e timing – Isso reflete a escolha do canal (texto/e-mails, publicação (impressa ou online), mídias sociais ou canais publicitários) juntamente com o timing e a frequência.
5. **Métricas de desempenho e objetivos** - Estas representam a escolha crítica de quantificar o que estamos tentando alcançar, como maximizar receitas, minimizar custos, maximizar a resistência de um material ou o desempenho de um medicamento, ou minimizar milhas vazias. Estas podem ser incorporadas na função objetivo ou representadas como restrições.
6. **Escolha de funções** – Frequentemente negligenciadas como uma decisão, funções podem ser métodos para tomar decisões (políticas), a formulação de modelos de otimização, a escolha de métricas de desempenho, métodos de previsão ou estimação, ou funções de transição (como a forma como uma doença se espalha). Esta categoria cobre a escolha da função, o que significa sua estrutura.
7. **Definição de parâmetros** – Funções são tipicamente caracterizadas por um ou mais parâmetros (tipicamente contínuos, mas nem sempre) que podem ser ajustados para melhorar a acurácia preditiva (ao ajustar modelos estatísticos) ou otimizados para melhorar o desempenho (ao ajustar uma política para tomar decisões). Parâmetros podem estar associados a uma função; podem ser o peso em uma métrica de desempenho, ou podem ser uma meta (ou limite) para uma métrica de desempenho.
8. **Estimação ou identificação** – Podemos receber a foto de uma pessoa e ser solicitados a identificá-la, onde queremos maximizar o número de vezes que identificamos a pessoa corretamente. Um modelo de linguagem de grande porte recebe um conjunto de palavras (na verdade, tokens) e tenta identificar a palavra (ou token) mais provável que vem em seguida.
9. **Características e comportamentos** - Podemos escolher as características de um novo pacote de software, o design de um novo produto, ou como nós (como indivíduo, organização ou corpo político) escolhemos nos comportar.
10. **Decidindo o que decidir** - Na maioria das aplicações reais, o número de decisões potenciais (ou seja, qualquer lugar onde enfrentamos uma escolha) pode ser bastante grande. Temos que priorizar quais decisões têm o maior valor econômico para justificar a realização de qualquer análise formal.

## Tipos de variáveis de decisão

As decisões virão em diferentes estilos, mas as variáveis de decisão podem tipicamente ser colocadas em uma (ou mais) das seguintes categorias:

- **Binária** – Aqui temos apenas duas escolhas, que podem ser:
  - Realizar uma ação ou não.
  - Manter ou vender um ativo.
  - Teste A/B para design de página web, onde precisamos escolher entre um design atual e um novo ou modificado.
  - Se deve continuar testando um medicamento ou tratamento em um ensaio clínico, ou encerrar o ensaio.
- **Conjunto discreto de escolhas ou ações** – Esta é facilmente a forma mais comum de problema de decisão, e surge quando temos um conjunto de escolhas ou ações discretas, tais como:
  - Escolher um fornecedor para uma peça.
  - Escolher um medicamento ou tratamento médico.
  - Escolher um canal de marketing.
  - Escolher uma localização para uma instalação.
- **Escalar contínuo** – Exemplos são:
  - Definir o preço de um produto.
  - Escolher a dosagem de um medicamento.
  - Decidir quanto gastar em publicidade em um mercado para uma campanha presidencial.
  - Escolher quanto dinheiro manter disponível para um fundo mútuo.
- **Vetores discretos** – Existem muitos problemas que envolvem a gestão de recursos discretos como pessoas, máquinas e trabalhos. Quando temos um único conjunto de escolhas discretas, como onde comprar um produto, é fácil enumerar todas as escolhas. Mas quando temos que decidir como programar, digamos, 100 máquinas para lidar com centenas de trabalhos, então precisamos de algoritmos especializados.
- **Vetores contínuos** – Existem problemas com um pequeno número de decisões contínuas, como controlar um carro, aeronave ou foguete. Depois há problemas com grandes números de parâmetros contínuos, como alocar fundos entre muitas classes de ativos, ou alocar grandes quantidades de kits de naloxona para uma centena de condados em um estado. Existem algoritmos de busca poderosos para resolver esses problemas.

## Como as decisões impactam o sistema

Não faz sentido falar sobre "decisões" como um conceito abstrato. Primeiro reconhecemos que uma decisão muda o sistema de alguma forma, mas como?

Existem três formas pelas quais uma decisão pode impactar um sistema:

- **Recursos físicos** – Aqui é onde compramos, vendemos ou modificamos de qualquer forma algo físico, o que poderia ser pessoas, equipamentos, instalações, alimentos, água ou energia.
- **Financeiro** – Isso pode ser dinheiro, investimentos e empréstimos; contratos de seguro e hedges cambiais; e preços.
- **Informacional** – Esta é uma categoria que pode incluir uma decisão de realizar um experimento em um laboratório, simulação computacional, ou um teste de campo que é usado para atualizar estimativas ou crenças; pode envolver definir metas de desempenho, projetar métricas, ou especificar os termos de um contrato de vendas.

Há alguma sobreposição nas categorias, como a distinção entre hedges cambiais e os termos de um contrato de vendas. O que é importante é a amplitude de formas pelas quais podemos afetar como um sistema evolui ao longo do tempo.

Conforme avançamos em nossa estrutura de modelagem, precisaremos entender o seguinte sobre qualquer decisão:

- Como a decisão afeta nossas métricas de desempenho agora?
- Que efeito uma decisão agora terá sobre o estado do sistema antes de tomar a próxima decisão?
- A decisão impactará nova informação que chega após a decisão ser tomada?

No Volume II descrevemos esses pontos usando notação matemática.

## Timing das decisões

Um dos atributos mais importantes, mas desafiadores, das decisões envolve o tempo, especificamente:

- **Com que frequência as decisões são tomadas** – Podemos dividir as decisões em duas classes amplas:
  - Decisões de design, que são tomadas apenas uma vez (inicialmente) ao longo do horizonte de planejamento. Na prática, mesmo decisões de design evoluem ao longo do tempo, mas é comum ter decisões que são tomadas apenas uma vez dentro do que é considerado um horizonte de planejamento razoável.
  - Decisões de controle – Estas são decisões que são tomadas repetidamente ao longo do tempo, mas há sistemas complexos onde uma variedade de decisões está sendo tomada em diferentes intervalos de tempo. Por exemplo, operadores de rede planejam o agendamento de geradores a vapor uma vez por dia; turbinas a gás são planejadas por hora; ajustes na velocidade de certos geradores são feitos a cada 5 minutos; e sinais para ajustar os níveis de voltagem são enviados a cada 2 segundos.
- **Tempos de defasagem** – Quando uma decisão é tomada, geralmente há uma defasagem antes que ela impacte o sistema. Por exemplo:
  - Pedir estoque pode exigir semanas ou meses para chegar.
  - Administrar um medicamento pode levar minutos, horas ou dias antes de afetar um paciente.
  - Operadores de rede planejam os cronogramas para operar usinas a vapor no dia anterior, enquanto decisões de ligar turbinas a gás requerem aviso prévio de 30 minutos.
  - Mudanças de preço podem não ser vistas nas vendas por dias ou semanas, e podem afetar os mercados por meses.
- **Planejamento antecipado de decisões defasadas** – Além das dimensões de quando uma decisão é tomada e quando ela impacta o sistema, temos que pensar sobre o timing quando estamos planejando para o futuro. Por exemplo:
  - Um fabricante pode enfrentar prazos de entrega de oito meses ao fazer pedidos da Ásia, mas pode obter entregas muito mais rápidas para quantidades menores (a custo mais alto) quando há escassez. Ao pensar em quanto estoque manter disponível, o fabricante teria que manter estoques muito maiores sem a opção de fazer pedidos ao fornecedor de alto custo, mas mais próximo. No entanto, quando esta opção está disponível, o fabricante pode considerar a opção de usar o fornecedor mais próximo no caso de um aumento repentino na demanda.
  - Companhias aéreas frequentemente precisam planejar compras de aeronaves com até 10 anos de antecedência, mas podem negociar entregas mais rápidas a um custo mais alto. Isso permite que a companhia aérea considere esta opção caso os volumes de passageiros aumentem mais rápido do que planejado. Ou elas podem cancelar contratos a um custo dependendo de quanto tempo esperam para exercer esta opção.

## Quem toma decisões

Existem muitos cenários onde há mais de um tomador de decisão (ou agente). Exemplos de cenários multiagente incluem:

- Dois tomadores de decisão iguais (frequentemente chamados de jogadores) como pode acontecer em negociações entre um fabricante e um fornecedor ou um cliente, ou em interações entre um médico e um paciente.
- Dois tomadores de decisão onde um tem uma posição de controle. Por exemplo, um "agente de campo" pode solicitar recursos de um "agente central" que tem controle sobre quanto da solicitação atender.
- Vários agentes, como pode surgir quando algumas empresas estão competindo entre si (exemplos surgem em setores que vendem carros ou produtos químicos industriais), ou quando há múltiplas unidades organizacionais no mesmo nível em uma empresa.
- Múltiplos agentes, como surge em uma cadeia de suprimentos com diferentes fabricantes fornecendo componentes para fazer uma peça como um motor ou um carro inteiro.
- Um único agente aprendendo sobre um ambiente desconhecido, que é como podemos modelar qualquer problema envolvendo incerteza. O ambiente desconhecido poderia ser o clima, a presença de uma doença em uma população, ou um mercado adquirindo um produto.

Retornaremos aos problemas multiagente mais adiante na série, onde mostraremos como estender a notação (apresentada no Volume II) para lidar com múltiplos tomadores de decisão. Por enquanto, vamos focar em um único tomador de decisão, que pode ser um de dois ou mais tomadores de decisão.

Temos várias razões para evitar a identificação explícita de tomadores de decisão nesta fase:

- A organização das decisões pode variar, mesmo dentro da mesma indústria (como transporte rodoviário ou gestão da cadeia de suprimentos) ou domínio de problema (como saúde pública).
- Se o seu objetivo é desenvolver um modelo computacional, você pode estar buscando mudar como as decisões são organizadas. Um modelador pode desejar tratar um conjunto de decisões como se estivessem sendo tomadas por um único agente, seja como uma simplificação, ou porque isso pode produzir melhores resultados.
- O objetivo de listar diferentes tipos de decisões não é abordar todas elas em um único projeto de modelagem. Em vez disso, é necessário identificar os objetivos de um modelo e então escolher as decisões que são relevantes para os objetivos do projeto.
- Recomendamos que o leitor aborde esses projetos a partir da perspectiva de um único tomador de decisão, o que não precisa necessariamente se alinhar com a forma como as decisões são realmente tomadas dentro de uma organização. Isso será apoiado pela apresentação inicial da estrutura de modelagem universal no Volume II.

Por enquanto, ao enfrentar um cenário multiagente, recomendamos tratar cada agente separadamente para identificar suas próprias métricas e decisões. As incertezas frequentemente afetam o ambiente mais amplo, embora cada agente possa ter incertezas que são relevantes para suas próprias decisões e métricas de desempenho.

## Tomando decisões com computadores

Computadores têm uma forma muito direta de tomar decisões. Começa por conhecer os tipos de decisões e o conjunto de decisões possíveis (viáveis). Em seguida, usa um método pré-especificado para "tomar" a decisão, o que significa uma escolha particular do conjunto de decisões viáveis (ou permitidas).

Começamos apresentando como nos referimos a esses métodos de tomada de decisão:

**Definição:** Uma **política** é um método para escolher uma decisão permitida usando a informação que está disponível no momento em que a decisão é tomada.

Existem duas estratégias amplas para projetar políticas, cada uma das quais pode ser dividida em duas classes, criando quatro classes de políticas que incluem *qualquer* método para tomar decisões. São elas:

**Busca de política (policy search)** - Essa estratégia cria funções que precisam ser ajustadas para funcionar bem ao longo do tempo. Elas tomam decisões sem planejar diretamente para o futuro. Essas podem ser divididas em duas classes:

1. Aproximações de função de política, ou PFAs.
2. Aproximações de função de custo, ou CFAs.

**Políticas de horizonte de previsão** - Essa estratégia tenta tomar a melhor decisão agora otimizando o desempenho da decisão no presente, somado a uma aproximação do impacto da decisão presente sobre o futuro. Essas também podem ser divididas em duas classes:

<ol start="3">
<li>Políticas baseadas em aproximações de função de valor, ou VFAs.</li>
<li>Aproximações diretas de horizonte de previsão, ou DLAs.</li>
</ol>

Cada uma dessas políticas é descrita abaixo.

### Aproximações de função de política (PFAs)

Aproximações de função de política (PFAs) representam qualquer função analítica que, a partir das entradas do que sabemos, produz como saída a ação que devemos tomar. Alguns exemplos são:

- Políticas de pedido de estoque frequentemente fazem um pedido quando o estoque cai abaixo de um nível "s", momento em que é feito um pedido para elevar o estoque até "S". "s" e "S" são parâmetros que precisam ser ajustados.
- Um médico pode prescrever injeções de insulina quando o A1c de um paciente (que reflete uma média móvel de 3 a 5 meses de açúcar no sangue) ultrapassa 6,5, e interrompe quando ele cai abaixo de 6,0. Novamente, esses números precisam ser variados para encontrar os valores que funcionam melhor.

PFAs podem ser qualquer função analítica, como uma função linear ou não linear. O que uma PFA não pode incluir, o que será encontrado em cada uma das três classes restantes de políticas, é um problema de otimização embutido. PFAs podem ser regras simples, mas também podem ser funções não lineares de dimensão muito alta, como uma rede neural.

### Aproximações de função de custo (CFAs)

Há muitos problemas em que a melhor abordagem para tomar decisões é usar uma aproximação determinística em um ponto no tempo, que foi modificada usando vários parâmetros que, quando devidamente ajustados, produzem decisões que funcionam bem ao longo do tempo. Essa é uma abordagem amplamente utilizada na prática, embora frequentemente sem o reconhecimento a) da capacidade de introduzir parâmetros para ajudar a melhorar as decisões e/ou b) de que os parâmetros podem ser ajustados para produzir melhores resultados.

O exemplo mais simples dessa abordagem é ilustrado na figura 4.2, onde precisamos escolher qual produto anunciar nas redes sociais (poderíamos substituir por qualquer problema com escolhas discretas listadas na [seção de tentativa e erro inteligente](/bridging-vol1/pt-BR/chapter-2/#intelligenttrialanderror) do Capítulo 2). Temos uma estimativa pontual para o valor de cada produto com base em experiências passadas, que aprendemos que pode envolver muito ruído, resultando em algumas estimativas ruins. Também podemos usar a experiência passada para estimar um desvio padrão, que é uma medida da dispersão da incerteza. Tipicamente, temos 95 por cento de certeza de que a verdade está dentro de mais ou menos 2 desvios padrão.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoiceMeanStdDev.jpg" alt="When faced with a discrete set of choices, the uncertainty in the belief about how each performs may be described by its average value and standard deviation.">
  <figcaption><span class="fig-num">Figura 4.2.</span> Quando confrontados com um conjunto discreto de escolhas, a incerteza na crença sobre o desempenho de cada uma pode ser descrita pelo seu valor médio, e o desvio padrão que captura a dispersão da crença.</figcaption>
</figure>

O que vamos fazer é criar um "índice" para cada produto $x$ dado por:

$$
Index_x = \text{Avg.value}_x + \theta \,(\text{std.dev}_x)
$$

Em seguida, vamos escolher anunciar o produto $x$ que tem o valor mais alto de "$Index_x$". Encontramos o produto $x$ resolvendo o seguinte problema de otimização (que é determinístico):

$$
\max_x \{\text{Avg.value}_x + \theta \,(\text{std.dev}_x)\}
$$

Resolver esse problema de otimização é bastante simples – basta ordenar os valores $\text{Avg.value}_x + \theta (\text{std.dev}_x)$ e encontrar o produto $x$ que tem o valor mais alto (e você pensava que a otimização determinística tinha que ser difícil!).

O desafio, então, é escolher o parâmetro ajustável $\theta$. Se usarmos $\theta = 0$, isso significa que estamos apenas usando nossa estimativa atual. O problema é que, se nossa estimativa "$\text{Avg.value}_x$" for baixa por causa de uma sequência de má sorte, talvez nunca mais tentemos anunciar o produto $x$. Se usarmos $\theta = 2$, então estamos usando uma estimativa muito otimista do valor do produto $x$, o que incentivará tentar produtos onde há um alto nível de incerteza (o que não é necessariamente uma estratégia ruim).

A ideia de usar uma aproximação determinística parametrizada é excepcionalmente poderosa. As companhias aéreas a utilizam quando otimizam suas programações, onde precisam usar uma estimativa dos atrasos climáticos para cada voo. Se usarem a mediana, então metade das vezes o atraso será maior do que o previsto pela programação, o que produzirá um grande número de chegadas atrasadas de aeronaves, atrasando os voos subsequentes. Entretanto, se usarmos o percentil 90, podemos estar introduzindo folga demais na programação, resultando em má utilização das aeronaves.

É mais fácil pensar em ajustar um conjunto de parâmetros $\theta$ em um simulador, mas frequentemente ocorre (como no problema de programação de companhias aéreas) que o problema é complicado demais. Por essa razão, pode ser necessário fazer aprendizado online, o que significa testar diferentes valores em campo e observar o desempenho real.

### Aproximações de função de valor (VFAs)

Imagine que estamos despachando uma frota de caminhões onde precisamos atribuir motoristas para mover cargas de frete de um local de coleta para um local de entrega. A figura 4.3 ilustra como esse problema precisa ser resolvido repetidamente ao longo do tempo. O que decidirmos fazer na segunda-feira mudará as localizações dos motoristas na terça e na quarta-feira. Todo dia, embarcadores ligam solicitando novos conjuntos de cargas que não são conhecidos com antecedência, então a transportadora precisa tomar decisões de atribuição na segunda-feira sem saber o que vai acontecer na terça ou na quarta-feira.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentThreeDays.png" alt="Illustration of the problem of assigning trucks over a three day period." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.3.</span> Ilustração do problema de atribuição de caminhões ao longo de um período de três dias.</figcaption>
</figure>

Otimizar em um horizonte de múltiplos dias na presença das incertezas é uma tarefa incrivelmente complexa. Em vez disso, podemos aproximar o valor dos motoristas no futuro, como mostrado na figura 4.4. Isso pode ser feito executando simulações para o futuro, e então calculando o valor dos motoristas em diferentes localizações. Quando incluímos esses valores (chamados de "aproximações de função de valor"), o problema que agora precisamos resolver na segunda-feira não é mais complicado do que se ignorássemos completamente o impacto de enviar motoristas para diferentes localizações.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentwithDownstreamVFA.png" alt="Assigning drivers to loads using estimates of the value of drivers in the future." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.4.</span> Atribuição de motoristas a cargas usando estimativas do valor dos motoristas no futuro.</figcaption>
</figure>

Aproximar o valor de chegar a um determinado estado é uma estratégia muito popular na literatura de pesquisa, mas seu sucesso depende fortemente da estrutura de um problema específico, e tende a funcionar bem para um pequeno número de problemas com estrutura especial.

### Aproximações diretas de horizonte de previsão (DLAs)

Há muitos problemas em que simplesmente precisamos planejar para o futuro para tomar uma decisão agora. Um dos exemplos mais familiares de uma política de horizonte de previsão direto é quando usamos o Google Maps para planejar um caminho até o destino.

As políticas DLA podem ser divididas em duas subclasses:

- Horizontes de previsão determinísticos – É quando usamos estimativas pontuais de quaisquer quantidades incertas, como atrasos no trânsito.
- Horizontes de previsão estocásticos – Aqui queremos modelar explicitamente a incerteza que enfrentamos, como os potenciais atrasos no trânsito que podem surgir enquanto dirigimos até nosso destino. É útil dividir ainda mais essa classe em dois tipos:
  - Problemas com escolhas discretas - São problemas tipicamente resolvidos com árvores de decisão.
  - Problemas em que as decisões são vetores - Aqui precisamos usar as ferramentas da programação matemática para buscar em um espaço multidimensional.

Observe que não precisamos subdividir os horizontes de previsão determinísticos já que, mesmo que a decisão em cada período de tempo seja um escalar, o modelo de horizonte de previsão completo requer a otimização sobre o vetor de decisões que abrange os períodos de tempo ao longo do horizonte de planejamento.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/GoogleMapslookaheadHoriz.jpg" alt="Path planned by Google maps based on estimated travel times (left); alternative path based on perceived risk of driving through New York city (right).">
  <figcaption><span class="fig-num">Figura 4.5.</span> Caminho planejado pelo Google Maps com base em tempos de viagem estimados (esquerda); caminho alternativo baseado no risco percebido de dirigir pela cidade de Nova York (direita).</figcaption>
</figure>

A figura 4.5 (esquerda) mostra um exemplo do Google Maps planejando um caminho de Hartford, Connecticut (canto superior direito) até Princeton, Nova Jersey (canto inferior esquerdo), partindo às 16h da tarde. Observe que o caminho passa bem pelo meio da cidade de Nova York, o que ocorreria por volta das 17h, quando se espera que o trânsito esteja mais intenso. O Google Maps usa uma estimativa pontual, e ainda assim considera esse o caminho mais curto.

Naturalmente, qualquer viajante experiente entenderia que há uma incerteza tremenda em torno dos tempos reais de viagem por Nova York às 17h. A figura 4.5 (direita) mostra uma rota alternativa que o Google fornece, dando ao viajante a oportunidade de escolher entre um caminho que se espera ser mais curto, mas com o risco de ser muito mais longo, versus um caminho um pouco mais longo, mas cujo tempo se espera que fique próximo do estimado pelo Google.

O primeiro caminho, então, é um exemplo de horizonte de previsão determinístico, mas o usuário pode introduzir a incerteza ao avaliar a recomendação. Ao escolher o segundo caminho, estamos resolvendo, de forma admitidamente ad hoc, um horizonte de previsão estocástico.

Quando estamos planejando para um futuro incerto, há uma ampla gama de estratégias para modelar esse processo a fim de ajudar a tomar uma decisão agora. Uma estratégia é usar uma previsão pontual (ou seja, um horizonte de previsão determinístico), mas introduzir parâmetros ajustáveis que possam tornar a solução mais robusta.

### Políticas híbridas

Além das quatro classes de políticas, podemos criar uma variedade de híbridos que combinam duas, três ou até mesmo todas as quatro classes. Alguns exemplos usando um contexto de cadeia de suprimentos são:

- CFAs com PFAs - Escolher o fornecedor de menor custo, mas com regras para excluir empresas de alto risco.
- Horizonte de previsão (DLA) com VFA - Otimizar o plano de produção sazonal, com funções capturando o valor dos estoques finais.
- Horizontes de previsão diretos determinísticos parametrizados (DLA/CFA) - Planejar o plano de produção sazonal usando previsões de demanda do percentil $\theta$ (digamos, o percentil 80).
- Política VFA usando PFA - Planejamento de distribuição usando VFAs para avaliar o estoque em cada armazém, mas usando regras (PFAs) para forçar entregas a locais específicos.
- VFA com CFA - Começar com uma política baseada em VFA com um modelo linear, e então ajustar os parâmetros do VFA linear para obter os melhores resultados usando um simulador.

Embora essas políticas possam parecer complicadas, é possível descrever contextos específicos em que a tomada de decisão humana está usando cada uma delas. Por exemplo, a política mais complexa usa um horizonte de previsão estocástico, que ilustramos acima usando o problema de navegação com o Google Maps, onde um caminho mais longo foi escolhido para evitar o risco de congestionamento na cidade de Nova York.

### Quais políticas são mais amplamente utilizadas?

Discutir políticas pode soar complicado e confuso. É importante lembrar que:

- Todos tomam decisões. Todos enfrentamos situações no dia a dia, seja para atravessar o dia ou decisões que surgem em nossos trabalhos.
- Quando tomamos decisões, nosso cérebro está usando algum método que pertence a uma das quatro classes (e possivelmente um híbrido).

Comece dividindo a quarta classe, DLAs, em dois tipos: horizontes de previsão determinísticos e horizontes de previsão estocásticos. Vamos então dividir o último tipo, horizontes de previsão estocásticos, em dois subtipos: problemas em que as decisões são uma de um conjunto de escolhas discretas, e problemas em que as decisões são vetores, como alocações de ativos entre investimentos, ou atribuição de máquinas a tarefas.

Isso nos dá seis tipos de políticas que dividimos em quatro categorias:

**Categoria 1** - Esta categoria inclui três tipos de políticas:

- Aproximações de função de política (PFAs), que incluem todas as regras simples como "quando estiver frio, vista um casaco" ou "compre um produto quando ele estiver em promoção". As PFAs podem ser baseadas em regras "se neste estado, tome esta ação" ou pode ser uma função analítica, um tópico ao qual voltaremos no Volume III.
- Aproximações de função de custo (CFAs), que incluem qualquer método em que temos que resolver um problema de otimização determinístico (tipicamente uma aproximação do problema real que envolve incerteza), como nosso problema de escolha discreta na figura 4.2.
- Aproximações de horizonte de previsão direto determinístico (Det-DLAs), em que planejamos o futuro como é feito pelo Google maps, usando estimativas pontuais de qualquer quantidade incerta.

CFAs e Det-DLAs envolvem ambos a resolução de problemas de otimização determinísticos; a única diferença é que as CFAs não planejam o futuro, enquanto as DLAs sim.

**Categoria 2** - Políticas de horizonte de previsão estocástico em que as decisões são escolhas discretas. Aqui modelamos explicitamente a incerteza na avaliação de cada escolha. Estas são amplamente estudadas usando o recurso das árvores de decisão.

**Categoria 3** - Políticas baseadas em aproximações de função de valor, em que uma decisão agora considera o custo ou a recompensa imediatos mais uma estimativa do valor futuro decorrente da transição para algum estado. Esta é uma classe de políticas avançada e computacionalmente difícil, necessária para um pequeno conjunto de problemas especializados.

**Categoria 4** - Políticas de horizonte de previsão estocástico em que as decisões são vetores. Esta é uma classe de problemas muito complexa que exige estratégias complexas, já que um horizonte de previsão estocástico é apenas outro problema de otimização estocástica, com simplificações introduzidas para reduzir a complexidade computacional.

As políticas na categoria 1 são usadas por todos, independentemente de treinamento formal. Essas políticas são as mais simples, mas isso exige a introdução de parâmetros que precisam ser ajustados, o que pode ser difícil.

Os cérebros humanos desenvolveram a capacidade natural de usar todas as quatro classes de políticas, pelo menos no contexto de escolhas discretas. Sabemos até alternar entre as classes sem perceber. Se estivermos jogando xadrez (e tivermos alguma experiência com o jogo), provavelmente estamos fazendo os primeiros movimentos de memória (jogadores especialistas conseguem executar bastante movimentos de memória). Isso é uma PFA pura. No entanto, em algum momento começamos a pensar sobre o que nosso oponente pode fazer, o que envolve uma política de horizonte de previsão direto, tipicamente combinada com VFAs, que podem capturar o valor de perder peças importantes.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Dê a definição formal de uma decisão, a definição informal e três exemplos de decisões.</li>
<li>Explique o que se entende por uma "classe de informação endogenamente controlável". Quais são as outras duas classes de informação descritas no mesmo contexto?</li>
<li>Dê exemplos de decisões que se enquadram em cada uma das seguintes categorias:
  <ol type="a">
    <li>Binária.</li>
    <li>Um conjunto de escolhas discretas com pelo menos cinco opções.</li>
    <li>Há pelo menos 10.000 decisões diferentes que precisam ser tomadas em um determinado momento.</li>
  </ol>
</li>
<li>Cite cinco exemplos de decisões contínuas.</li>
<li>Dê três exemplos de cada um dos três tipos de decisões:
  <ol type="a">
    <li>Decisões que impactam recursos físicos.</li>
    <li>Decisões que impactam recursos financeiros.</li>
    <li>Decisões que impactam a coleta ou distribuição de informação.</li>
  </ol>
</li>
<li>Cite três cenários em que decisões precisam ser tomadas em diferentes escalas de tempo. Descreva o cenário e a periodicidade das decisões.</li>
<li>Resuma com suas próprias palavras as quatro classes de políticas, e dê um exemplo de cada uma para algum contexto de problema.</li>
</ol>

**Questões de modelagem**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Dê um exemplo de decisão que se enquadre em cada categoria:
  <ol type="a">
    <li>Uma decisão que precisa ser tomada a cada minuto (ou mais rapidamente).</li>
    <li>Uma decisão que precisa ser tomada diariamente.</li>
    <li>Uma decisão que precisa ser tomada anualmente.</li>
  </ol>
</li>
<li>Identifique as decisões implícitas em cada cenário, e o tomador de decisão responsável por cada uma delas.
  <ol type="a">
    <li>Um indivíduo precisa tomar medicamentos prescritos por seu médico, que segue protocolos elaborados pelos desenvolvedores do medicamento.</li>
    <li>A rede elétrica precisa informar a uma concessionária quais usinas a vapor ligar, e quando. As decisões de programação são tomadas por um modelo computacional executado no dia anterior.</li>
    <li>Um gestor de fundo mútuo precisa decidir quanto dinheiro manter disponível para responder a depósitos e solicitações de resgate de investidores individuais (valores pequenos) e investidores de varejo (valores grandes).</li>
  </ol>
</li>
<li>Dê três exemplos de aproximações de função de política. Descreva o cenário e como a PFA funcionaria.</li>
<li>Dê um exemplo de uma aproximação de função de custo para um problema de escolha discreta.</li>
<li>Você está usando o Google maps para encontrar um caminho para chegar ao trabalho até às 8h30. Você também precisa decidir quanto tempo reservar para chegar no horário. Descreva as decisões sendo tomadas, e qual tipo de política está sendo usado para tomar cada uma delas.</li>
<li>Descreva quantas classes de políticas você usaria se fosse projetar um programa de computador para jogar xadrez. Descreva como cada classe de política identificada seria aplicada.</li>
</ol>
{% endraw %}
