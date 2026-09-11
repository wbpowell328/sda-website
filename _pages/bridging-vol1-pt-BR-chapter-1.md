---
layout: book
title: "Capítulo 1: Os Fundamentos do Enquadramento"
permalink: /bridging-vol1/pt-BR/chapter-1/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: e55b91c9188391dc
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

A humanidade é composta por uma variedade de processos, cada um dos quais abrange uma gama de atividades que podem ser avaliadas em termos de uma ou mais métricas de desempenho. Parece ser uma característica fundamental que as pessoas sempre queiram fazer melhor. Atletas querem ser mais rápidos ou mais fortes; empresas querem ser mais lucrativas; profissionais de saúde querem salvar mais vidas; a rede elétrica quer fornecer eletricidade a um custo menor.

Este livro será definido pela seguinte afirmação:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="Se você quiser administrar melhor {qualquer coisa}, você precisa tomar melhores decisões.">
</figure>

Trabalhamos a partir da premissa de que estamos sempre tentando melhorar as coisas, e só podemos fazê-lo manipulando elementos que controlamos, também conhecidos como *decisões*.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 1.1.</span> Uma amostra de contextos de problemas com exemplos de objetivos que capturam o desempenho.</caption>
<thead>
<tr><th>Aplicação</th><th>Objetivos</th></tr>
</thead>
<tbody>
<tr><td>Sistemas de energia</td><td>Reduzir custo, minimizar interrupções</td></tr>
<tr><td>Saúde pública</td><td>Minimizar mortes, maximizar produtividade</td></tr>
<tr><td>Aplicações empresariais</td><td>Maximizar lucros, minimizar custos</td></tr>
<tr><td>Gestão da cadeia de suprimentos</td><td>Minimizar custos, maximizar receita/produtividade</td></tr>
<tr><td>Manufatura</td><td>Minimizar custo, maximizar rendimento, minimizar defeitos</td></tr>
<tr><td>Economia</td><td>Minimizar inflação, maximizar crescimento e emprego</td></tr>
<tr><td>Finanças</td><td>Maximizar retornos, minimizar risco</td></tr>
<tr><td>Sistemas de transporte (público)</td><td>Maximizar cobertura, minimizar custo</td></tr>
<tr><td>Transporte de cargas</td><td>Minimizar custo, maximizar serviço, atender às necessidades dos motoristas</td></tr>
<tr><td>Engenharia</td><td>Maximizar resistência, minimizar custo, maximizar desempenho</td></tr>
<tr><td>Descoberta de medicamentos</td><td>Minimizar mortes, resultados negativos de saúde, custo</td></tr>
<tr><td>Esportes</td><td>Maximizar vitórias, minimizar folha de pagamento dos jogadores, maximizar público</td></tr>
<tr><td>Entretenimento</td><td>Maximizar visualizações, minimizar custos</td></tr>
</tbody>
</table>
</div>

A Tabela 1.1 lista uma variedade de atividades humanas, cada uma seguida de uma breve lista de métricas que poderiam ser usadas para avaliar o desempenho (a lista de métricas pode ser bastante extensa). Essas aplicações sugerem o universo de problemas em que "queremos fazer melhor", mas o desafio tem sido criar um caminho passo a passo que leve à melhoria do desempenho.

Todos os contextos de problemas do mundo real precisam começar com uma descrição não estruturada, em "inglês simples". Em contraste, qualquer modelo matemático assume que o problema já foi estruturado em uma forma que pode ser compreendida por um computador. O que falta é a contribuição de pessoas que realmente entendem o problema, criando a lacuna representada pela ponte inacabada que aparece na capa do livro.

A prática padrão de modelagem hoje geralmente envolve alguém familiarizado com uma "tecnologia de decisão", que pode ser programação inteira ou não linear, ou pode ser aprendizado de máquina, ou simulação de Monte Carlo (hoje poderíamos incluir também os grandes modelos de linguagem, que tecnicamente são uma forma de aprendizado de máquina). Quando uma empresa procura um especialista (seja da indústria ou da academia), esse especialista terá uma tendência imediata a ver o problema a partir da perspectiva de sua própria especialidade.

O especialista técnico então fará as perguntas que se encaixam em seu conjunto de habilidades. O especialista em programação inteira perguntará sobre variáveis de decisão e uma função de custo; o especialista em aprendizado de máquina se concentrará em quantidades desconhecidas que precisam ser estimadas ou previstas; o especialista em simulação pode identificar decisões de projeto que precisam ser avaliadas por meio de simulação.

Esse comportamento é uma forma de viés que chamamos de *filtragem por especialidade*: aprender sobre o problema de uma maneira que reflete sua especialidade. Isso acontece em praticamente todo projeto, já que o especialista do domínio não terá a especialidade necessária para identificar o especialista técnico mais apropriado. Os especialistas técnicos sempre assumem que sua especialidade é relevante, e olham para os problemas através das lentes de sua formação. Isso não é uma questão de má-fé; é simplesmente a natureza humana.

Adotamos a posição de que todos os "problemas" são motivados pelo desejo de melhorar um processo de alguma forma. Melhorar um processo requer fazer mudanças que são o resultado de decisões, e gostaríamos de tomar melhores decisões. Essa perspectiva parece transformar todo problema em um problema de otimização, já que sempre queremos tomar as melhores decisões. Isso não significa que vamos usar ferramentas de otimização. Nem mesmo pressupomos que faremos qualquer análise formal, mas sempre manteremos essa porta aberta.

Vamos usar um processo muito mais holístico para melhorar um processo. Começamos substituindo o passo inicial familiar na comunidade de otimização chamado "modelagem" (traduzir problemas reais em modelos matemáticos) por um passo que chamamos de "enquadramento do problema", que precede a modelagem. "Enquadramento" é um termo bastante usado na resolução de problemas empresariais, mas vamos dar a ele um significado muito mais preciso.

Nossa versão de enquadramento será um processo que exige treinar pessoas para fazer as perguntas certas, que são mais fáceis de entender por especialistas de domínio (pessoas de negócios, profissionais de saúde, cientistas, engenheiros), e que preenchem elementos específicos de um modelo matemático *caso um venha a ser necessário para resolver o problema.* O enquadramento não deve ser feito por um especialista técnico, precisamente por causa do risco de filtragem por especialidade. No entanto, nossa abordagem resultará em respostas a perguntas que seriam necessárias no uso de qualquer ferramenta analítica. Acreditamos que nosso processo de enquadramento, para muitas aplicações, introduzirá clareza que pode ajudar a resolver o problema mesmo sem um computador.

## O que é um "problema"? {#whatisaproblem}

Antes de resolvermos um problema, o que sequer entendemos por "problema"? Embora existam muitas variedades de problemas, a partir da perspectiva de tomada de decisões, vamos identificar dois estilos:

- **Problemas focados em decisão** — São problemas em que as decisões que estamos tomando são claras:
  - Roteirização de caminhões
  - Pedidos de estoque
  - Precificação de um produto
  - Escolha de um tratamento médico
  - Escolha de uma tecnologia de armazenamento de bateria
  - Localização de uma instalação
  - Onde anunciar um produto, serviço ou candidato
  - Escolha de qual estado visitar (candidatura a um cargo)
- **Problemas focados em métricas** — Estes geralmente surgem em situações mais complexas, em que sabemos o que queremos alcançar, embora possamos não saber inicialmente quais decisões podem ser tomadas para melhorar as métricas. Alguns exemplos de contextos focados em métricas são:
  - Reduzir custos, aumentar receitas ou melhorar margens de lucro.
  - Reduzir estoques
  - Melhorar o rendimento de um processo de manufatura
  - Reduzir infecções
  - Maximizar retornos financeiros
  - Reduzir risco
  - Melhorar a utilização de pessoas, equipamentos e instalações
  - Maximizar a contagem de votos (candidatura a um cargo)

Os problemas focados em métricas são geralmente mais complexos, já que as metas são mais fáceis de declarar do que as decisões necessárias para alcançar uma meta. Muitas vezes, podemos nem saber quais decisões poderiam ser usadas para ajudar a melhorar as métricas. De fato, identificar as decisões que têm o maior impacto sobre as métricas de desempenho é um passo importante no enquadramento de um problema.

Ao mesmo tempo, identificar as métricas corretas também pode ser um passo importante no enquadramento de um problema. De fato, em contextos com múltiplos tomadores de decisão (como ocorreria em qualquer organização), um tipo importante de decisão de um gestor pode ser a escolha das métricas para avaliar pessoas e unidades de negócio em níveis inferiores da hierarquia organizacional.

## Contextos para problemas de decisão

Problemas de decisão podem surgir de várias maneiras:

- Precisamos tomar decisões para resolver um problema específico em questão que só precisa ser resolvido uma vez.
- Temos um conjunto bem definido de decisões e simplesmente queremos fazer melhor. Na maioria dos casos, as decisões estão sendo tomadas por pessoas, e pode haver a esperança de que computadores possam fazer melhor.
- Queremos melhorar nosso desempenho ao longo do tempo, especialmente quando não estamos atingindo as metas esperadas. Para esses problemas, talvez nem saibamos de antemão quais decisões afetam o desempenho.
- Temos um conjunto bem definido de decisões sendo tomadas por pessoas, e gostaríamos de automatizar o processo para remover o componente manual, possivelmente como uma forma de redução de custos (não precisar pagar pelas pessoas), ou para obter mais controle sobre um processo.
- Estamos simulando decisões com o propósito de planejar o sistema no futuro. Isso poderia apoiar aplicações de planejamento estratégico, ou entender o impacto de decisões tomadas agora sobre o futuro.

Qualquer uma dessas representa uma motivação perfeitamente sólida para identificar um problema a ser resolvido, ou uma oportunidade de melhoria. Um grande desafio é garantir que você esteja atento às métricas certas, e então identificar todas as maneiras pelas quais você pode influenciar as métricas. Qualquer coisa que você controle se enquadra na categoria de decisão.

## Os três estágios da automação de decisões {#three-stages}

<figure class="book-figure" style="float:right; max-width: 260px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/NotreDame.png" alt="Uma catedral medieval.">
  <figcaption><span class="fig-num">Figura 1.1.</span> Uma catedral medieval.</figcaption>
</figure>

Um artigo no USA Today durante a pandemia de COVID descreveu o problema da distribuição de vacinas como "assustadoramente complexo". A razão dessa afirmação é que as pessoas não sabem como pensar sobre problemas complexos. Às vezes é útil lembrar que as catedrais medievais foram projetadas e construídas por pessoas sem educação formal; o problema com a distribuição de vacinas não é a complexidade - é saber como pensar sobre ela.

O que tem faltado é uma maneira estruturada de pensar sobre como tomar decisões ao longo do tempo. Nosso processo envolve dividir o processo de automação de decisões em três estágios, dados por:

**Estágio I: Enquadramento** — Aqui identificamos os elementos centrais de um problema de decisão, o que começa respondendo primeiro a três perguntas:

1. Quais são as métricas de desempenho?
2. Que tipos de decisões estão sendo tomadas, e quem as toma? Tomamos decisões com um método que chamamos de *política*.
3. Quais são as fontes de incerteza que afetam o desempenho?

**Estágio II: Modelagem** — O próximo passo é preencher os detalhes do processo universal de modelagem. Isso começa respondendo às seguintes perguntas:

4. Como tomamos decisões? Isso é feito usando uma função que chamamos de "política". Estas serão projetadas a partir de quatro classes de políticas (apresentadas no Volume III).
5. Que informação é necessária? Isso compõe os elementos da nossa *variável de estado* (também chamada de "estado de conhecimento"), que consiste na informação necessária para:
   - Tomar uma decisão (o que depende da política).
   - Calcular quaisquer métricas de desempenho.
   - Calcular (a) e (b) no futuro.

   A informação pode ser dividida entre:
   - O que sabemos perfeitamente sobre quantidades de recursos físicos e financeiros.
   - Parâmetros e funções usados para vários propósitos.
   - O que temos que estimar e representar na forma de crenças.
6. Como a variável de estado evolui ao longo do tempo?

**Estágio III: Implementação** — Isso vai desde a aquisição da informação necessária até a implementação e avaliação das decisões. Isso inclui:

7. Como adquirimos a informação de que precisamos? Existe informação que está imediatamente disponível, informação que precisa ser adquirida de outras fontes e informação que precisa ser estimada (ou prevista).
8. Como implementamos as decisões que tomamos usando a política?
9. Como avaliamos o desempenho das decisões no campo?

Descrevemos os três estágios nas seções que se seguem.

### Estágio I: Enquadrando o problema {#framingtheproblem}

Referimo-nos ao estágio inicial do processo de automação como "enquadrando o problema", que consiste em responder às seguintes questões:

1. Quais são as métricas de desempenho?
2. Que tipos de decisões estão sendo tomadas (e quem as toma)?
3. Quais são as fontes de incertezas que afetam a implementação das decisões e o desempenho do sistema?

Essas três questões não são suficientes para resolver um problema, mas são o ponto de partida para qualquer processo que envolva tomar e implementar decisões.

<figure class="book-figure" style="float:right; max-width: 220px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/Chessboard.png" alt="Jogar xadrez pode ser difícil, mas é muito simples de modelar.">
  <figcaption><span class="fig-num">Figura 1.2.</span> Jogar xadrez pode ser difícil, mas é muito simples de modelar.</figcaption>
</figure>

Ajuda ilustrar essas questões para o cenário de um dos jogos mais desafiadores já inventados: o xadrez (veja a figura 1.2). A resposta às nossas três questões de enquadramento é dada por:

1. **Métrica de desempenho** – Vencer o jogo.
2. **Decisões** – Movimentos permitidos.
3. **Incertezas** – Movimentos do oponente.

É claro que ser trivial de modelar não torna o xadrez fácil, mas o xadrez foi por muito tempo usado como referência para demonstrar o poder de estratégias algorítmicas como o "aprendizado por reforço".

Resolver o problema surge no Passo 4 (Estágio II), e embora isso seja bastante difícil, os demais passos também são triviais.

Agora considere alguns dos problemas que identificaremos no [Capítulo 2](/bridging-vol1/pt-BR/chapter-2/):

- Como reduzimos as mortes causadas pelo fentanil?
- Como projetamos uma cadeia de suprimentos para minimizar custos que seja robusta a diferentes fontes de incerteza?
- Como gerenciamos uma frota de caminhões para maximizar lucros ao mesmo tempo em que oferecemos serviço pontual?
- Qual é a melhor estratégia para reduzir as emissões de CO2?
- Como um grande fabricante deve armazenar e investir seu dinheiro para maximizar retornos, ao mesmo tempo em que gerencia riscos e atende às necessidades de caixa de curto e médio prazo?

Responder às nossas três questões de enquadramento para esses problemas é um exercício não trivial. Por essa razão, temos três capítulos dedicados ao processo de responder cada questão:

- Capítulo 3 – Métricas de desempenho
- Capítulo 4 – Decisões
- Capítulo 5 – Incertezas

Essas questões são ilustradas usando as aplicações no [Capítulo 2](/bridging-vol1/pt-BR/chapter-2/). Oferecemos uma breve prévia desses três elementos centrais, descrevendo diferentes tipos de métricas, decisões e incertezas nas subseções que se seguem.

#### Tipos de métricas

As métricas surgem em uma variedade infinita e dependem completamente do contexto.

- **Negócios** – As empresas são caracterizadas por longas listas de métricas financeiras, métricas de produtividade, métricas de desempenho, métricas trabalhistas e métricas que capturam como o mercado está sendo atendido.
- **Saúde** – Doença/morte, curas, efeitos colaterais, mobilidade, força, custo.
- **Energia** – Custo, quantidade de energia fornecida, interrupções, redução de demanda.
- **Manufatura** - Rendimento, desempenho do produto, velocidade, custo.
- **Descoberta de medicamentos** - Desempenho, proteção de patente, potencial de mercado, efeitos colaterais, riscos à saúde.
- **Esportes** - Pontos marcados, consistência, popularidade entre fãs, lesões, consistência.
- **Transporte de cargas** - Receita, custo, serviço, requisitos de mão de obra, exposição à volatilidade do mercado.

Escolher as métricas certas é um desafio por si só, seja para guiar o comportamento de um modelo computacional, seja para guiar o comportamento de pessoas.

Separado do que uma métrica está medindo está o modo como ela é usada para guiar o desempenho do sistema. As métricas podem ser usadas de três maneiras diferentes:

- **Objetivos** - São métricas que queremos maximizar ou minimizar.
- **Metas (targets)** - Podemos querer que a métrica fique o mais próxima possível de um número-alvo, como a temperatura em um edifício ou a pressão arterial de um paciente.
- **Limites** - Podemos querer que uma métrica permaneça abaixo ou acima de algum limite. Por exemplo, podemos querer manter o açúcar no sangue de um paciente abaixo de um determinado valor; as faltas de estoque devem permanecer abaixo de certo nível; carteiras financeiras precisam manter a volatilidade abaixo de um valor especificado.

#### Tipos de decisões

Uma lista inicial de diferentes tipos de decisões é dada por:

- **Binárias** – Surgem quando estamos escolhendo entre dois designs de página web (conhecido como teste A/B), determinando quando vender um ativo (a cada ponto no tempo podemos manter ou vender).
- **Escolhas discretas** – Ajuda dividir essa categoria em três classes:
  - Um pequeno conjunto de escolhas discretas - Podemos precisar escolher o melhor medicamento, o melhor fornecedor para um componente, ou a melhor localização para uma instalação.
  - Um conjunto de valores discretizados de um parâmetro contínuo – Exemplos são preços, dosagens de um medicamento, ou temperaturas para assar um wafer de semicondutor.
  - Em alguns casos, o número de escolhas discretas pode ser bastante grande, como escolher qual entre 30.000 moléculas diferentes poderia ser usada para um medicamento, ou a escolha de localizações para diferentes instalações espalhadas entre 100 possíveis locais.
- **Escolhas contínuas** – Preços, concentrações, dimensões, temperaturas, … Estas podem ser escalares (ou seja, um único parâmetro), ou vetores, em que podemos estar otimizando ao longo de múltiplos (potencialmente muitos) parâmetros contínuos.
- **Vetores de escolhas discretas** – Podemos ter um conjunto de M motoristas que estamos atribuindo a N cargas, em que temos que decidir se atribuímos o motorista m à carga n.

Uma segunda dimensão das decisões envolve o momento (timing) de quando uma decisão tomada agora é implementada no futuro. Por exemplo:

- Um despachante atribui um motorista a uma carga a ser movida agora mesmo.
- Um médico pode prescrever um medicamento para açúcar no sangue que requer várias horas para fazer efeito.
- Um operador de rede elétrica planejará hoje quais geradores a vapor devem estar funcionando amanhã.
- Um gerente de cadeia de suprimentos faz um pedido que pode levar várias semanas ou meses para chegar.
- Uma companhia aérea pode encomendar novas aeronaves que podem levar dois anos para serem entregues.
- Um investimento com uma empresa de private equity pode manter esse capital indisponível por 8 a 10 anos.

Uma terceira dimensão das decisões envolve identificar quem toma uma decisão.

- A gestão da distribuição de vacinas envolve decisões que começam com agências federais e estaduais, estendendo-se por hospitais, médicos e enfermeiros que administram a vacina.
- A fabricação de motores automotivos envolve a participação de uma sequência de fabricantes que fornecem os materiais e fabricam os vários componentes do motor, sendo por fim levados ao mercado por meio de concessionárias que controlam os pedidos de carros.
- Os ensaios clínicos de medicamentos envolvem decisões de cientistas, reguladores, empresas que fornecem o financiamento, hospitais e clínicas que administram o medicamento, e o paciente.
- Uma empresa de transporte rodoviário realiza o despacho usando uma equipe de despachantes e gerentes de carga, que poderia ser substituída por um único modelo computacional capaz de coordenar essas decisões em toda a empresa.

#### Formas de incertezas

Sem dúvida, o aspecto mais sutil de tomar decisões envolve compreender as incertezas que inevitavelmente surgem ao implementar decisões no campo. Não é surpresa que as formas de incerteza que surgem dependam fortemente do contexto. Alguns exemplos incluem:

- **Negociação financeira** – Aqui estamos principalmente interessados em mudanças nos preços dos ativos, mas os traders também estão interessados na demanda por ativos, e em mudanças em outras métricas que possam sugerir para onde os mercados estão se dirigindo, como mudanças no desemprego, taxas de juros, vendas no varejo. Os mercados frequentemente se movem com base em expectativas, que são notoriamente difíceis de medir.
- **Gestão da cadeia de suprimentos** – Aqui temos que lidar com incertezas na demanda de mercado por um produto, as estratégias dos concorrentes, o desempenho dos fornecedores e o comportamento dos trabalhadores (especialmente quando sindicalizados). Além disso, há influências externas como clima, terremotos e a propagação de doenças.
- **Saúde pública** – A propagação de uma doença é função da origem da doença (pode ser uma única infecção, ou de muitos animais que foram infectados, a partir dos quais uma cepa humana evoluiu), da prevalência da doença, da taxa de transmissão, de como ela afeta os pacientes, do desenvolvimento de medicamentos, da distribuição dos medicamentos, e da resposta do público na aceitação dos medicamentos.

Cada um desses exemplos envolve múltiplas fontes de incerteza. Estas apresentam diferentes formas de incerteza, tais como:

- Ruído de granulação fina, como demandas aleatórias diárias.
- Mudanças em preços e no clima que tipicamente exibem picos e rajadas.
- Pode haver mudanças inesperadas para novos patamares, refletindo mudanças em tecnologia, comportamento do consumidor, ou decisões de concorrentes.
- Eventos únicos e raros, como um terremoto, ou a invenção de uma nova tecnologia importante.
- Contingências para eventos que podem acontecer, mas que nunca de fato aconteceram.

A consideração da incerteza deve ser feita em termos de como ela afeta as métricas de desempenho. Quando estamos tomando decisões na presença de incerteza, temos que fazer escolhas, como a forma de tomar uma decisão, que funcionem bem em média, dado que não sabemos o que vai acontecer no futuro.

No entanto, algumas formas de incerteza introduzem uma nova dimensão chamada risco, que captura fatores que não estariam presentes nas métricas de desempenho se a incerteza não existisse. O risco é um tópico muito popular em áreas como finanças, gestão da cadeia de suprimentos e saúde. Há muitos livros que falam sobre risco, junto com artigos muito sofisticados que modelam risco, sem nunca fornecer uma definição formal de risco. Forneceremos essa definição no Capítulo 3.

### Estágio II: Modelagem {#universalmodelingframework}

Nossas três questões iniciais (métricas de desempenho, decisões, incertezas) lançam as bases para o que vamos chamar de nosso *framework de modelagem universal* (ou UMF). O UMF pode ser usado para modelar *qualquer* problema de decisão, especialmente quando usamos a versão estendida para lidar com problemas multiagentes. Por ora, colocamos ênfase em capturar a evolução das decisões e da informação ao longo do tempo. No Volume II, descreveremos o UMF usando notação matemática completa (o que não é tão ruim quanto parece), mas por enquanto, vamos esboçá-lo em linguagem simples.

O Framework de Modelagem Universal consiste em cinco elementos:

1. **Variáveis de estado** capturam todas as informações de que precisamos para tomar decisões e calcular nossas métricas de desempenho. Uma compreensão dos elementos de uma variável de estado orienta o processo de determinar quais informações são necessárias para tomar decisões.
2. **Variáveis de decisão** representam quais decisões podemos tomar (com base nos tipos de decisões que descrevemos ao enquadrar o problema). Note que assumimos que tomamos decisões com alguma "política", *que será projetada mais adiante.*
3. **Informação exógena** é qualquer nova informação que chega depois de tomarmos uma decisão, e antes de tomarmos nossa próxima decisão.
4. **A função de transição** descreve como a variável de estado muda dado qual decisão tomamos, e dada a informação exógena que chegou depois de tomarmos uma decisão.
5. **A função objetivo** descreve como avaliar o desempenho do sistema usando o método que escolhemos para tomar decisões.

Identificar as variáveis de estado requer escolher o método (chamado de política) para tomar decisões, então isso precisa ser feito primeiro. Contudo, avaliar e ajustar políticas requer todo o framework universal de modelagem se pretendermos usar um simulador. Em última análise, o design de políticas (que desempenha um papel importante na determinação de qual informação precisamos na variável de estado), e a avaliação das políticas é um processo iterativo.

O framework universal de modelagem é abordado em muito mais detalhe no Volume II, onde introduzimos uma notação matemática bastante básica.

Se o framework universal de modelagem parece óbvio, é porque é mesmo. Não é mais do que um framework que descreve a evolução daquilo que sabemos (a variável de estado) por meio de decisões (que controlamos) e da informação exógena (que não controlamos). O que talvez seja surpreendente é que isso não é padrão na literatura de pesquisa, embora existam nichos onde isso pode ser encontrado.

Sem dúvida, o passo mais difícil é o design da política para tomar decisões. Separamos o processo de avaliação de uma política do design da política, o que diferencia nossa abordagem daquela usada em praticamente todos os livros sobre otimização estocástica. Felizmente, temos uma estratégia para superar essa complexidade.

### Estágio III: Implementação

Facilmente a dimensão mais amplamente negligenciada no design e na solução de modelos de otimização é o processo de implementá-los. A literatura acadêmica ignora completamente o fato de que o que importa não é quão bem resolvemos um problema no computador, mas sim o impacto das decisões quando elas são implementadas.

As dimensões-chave da implementação cobrem três áreas:

1. Adquirir os dados necessários para preencher a variável de estado, o que significa a informação que precisamos para tomar decisões e calcular as métricas de desempenho (mais detalhes são fornecidos no Volume II).
2. Implementar as decisões, o que pode significar fazer com que as pessoas sigam instruções, ou comunicar as instruções eletronicamente.
3. Avaliar o desempenho. Para sistemas complexos, entender o quão bem o sistema está performando, o que presumivelmente é afetado pelas decisões que estão sendo tomadas, pode ser bastante difícil.

Para problemas complexos na indústria, a implementação pode ser um processo excepcionalmente desafiador. Mesmo que isso seja visto como fora do escopo do processo de modelagem, é útil que os modeladores pensem sobre essas etapas. Pode ser que algumas decisões simplesmente nunca sejam tomadas por um computador. Por exemplo, alocar recursos em um contexto de saúde pública envolve negociação entre organizações estaduais, regionais e locais, cada uma com suas próprias prioridades ocultas.

## Três tipos de informação

Primeiro reconhecemos que qualquer quantidade que possa ser representada em um computador é uma forma de informação. Podemos identificar três tipos de informação a partir da perspectiva de como ela evolui ao longo do tempo:

1. A informação que conhecemos no momento em que tomamos uma decisão, que constitui o estado do nosso sistema (mais precisamente o estado de conhecimento). Esta é a informação necessária para tomar decisões e/ou calcular as métricas de desempenho, agora ou possivelmente no futuro.
2. Nova informação que controlamos. Definimos decisões formalmente no Capítulo 4 e descrevemos 10 tipos diferentes de decisões, o que ajuda no processo de identificação de decisões.
3. Nova informação que chega de fora do nosso sistema, além do nosso controle, embora possa ser influenciada pelo nosso estado atual e/ou pelas decisões que tomamos. Chamamos isso de informação exógena, e ela pode vir de várias fontes:
   - Fenômenos naturais como clima e terremotos.
   - Mercados, como a demanda por um produto, preços de ações e taxas de juros.
   - Dinâmica populacional, como a propagação de doenças.
   - O comportamento de outras empresas ou organizações.
   - Decisões tomadas por pessoas (mais geralmente, agentes) de fora do nosso sistema, tais como:
     - As decisões de produção de fornecedores de insumos para uma planta de manufatura.
     - Outras divisões dentro de uma empresa (como precificação e marketing, se estivermos em manufatura ou planejamento de estoque).
     - As ações de um paciente (se você for o médico).
     - Anúncios veiculados pelo candidato concorrente em uma eleição presidencial.

   A informação exógena é descrita em maior profundidade no Capítulo 5.

## Tomada de decisão como um processo

Existe uma vasta literatura que se concentra na criação de "problemas de otimização" que consistem em:

- Uma decisão (ou conjunto de decisões).
- Um objetivo a ser minimizado ou maximizado.
- Restrições, que determinam o conjunto de decisões permitidas.

A tomada de decisão real é um processo, e entender esse processo é fundamental para o design de métodos para tomar decisões melhores. Começamos identificando os seguintes elementos:

1. Problemas de decisão sequencial, que descrevem o processo de tomar um determinado conjunto de decisões ao longo do tempo por um único agente.
2. A "cadeia de informação", que descreve o processo de criação da informação necessária para tomar uma decisão.
3. As etapas envolvidas na implementação de decisões.
4. O processo de avaliação de desempenho.

Além do escopo desta monografia está o desafio de coordenar entre múltiplos tomadores de decisão.

### Problemas de decisão sequencial

Agora estamos prontos para escrever, em português, um problema de decisão sequencial, que podemos declarar usando:

> *Estado, decisão, informação; estado, decisão, informação; …, estado, decisão, informação.*

Cada tripla {estado, decisão, informação (exógena)} representa a informação associada a um determinado período de tempo:

1. **"Estado"** é a informação que conhecemos no início do período de tempo.
2. **"Decisão"** é nossa informação endogenamente controlável.
3. **"Informação (exógena)"** é a informação que chega depois que tomamos uma decisão, e antes de tomarmos a próxima decisão.

Depois de tomarmos uma decisão (às vezes depois de observarmos a informação exógena), paramos e calculamos as métricas de desempenho.

Obviamente, nem todos os problemas de decisão são problemas de decisão sequencial, embora a grande maioria das decisões seja tomada repetidamente ao longo do tempo. Contudo, podemos identificar várias categorias de problemas de decisão sequencial a partir da perspectiva do sequenciamento de decisões e informações:

1. Tomar decisão, parar.
2. Tomar decisão, ver informação exógena, parar.
3. Tomar decisão, ver informação, tomar mais uma decisão, parar.
4. Tomar decisão, ver informação, tomar decisão, ver informação, …, repetir $T$ vezes, parar.
5. Tomar decisão, ver informação, repetido infinitamente.

Alguns comentários:

- **Categoria 1** descreve problemas de decisão estáticos e determinísticos que dominaram o que é conhecido como a comunidade de otimização desde os anos 1950. A versão mais simples desses problemas pode envolver encontrar a melhor de um conjunto de escolhas, como comprar um item do fornecedor de menor custo, desde que assumamos que o item terá o desempenho exatamente como esperamos.

  Instâncias de problemas mais complexos podem envolver encontrar a alocação de menor custo de suprimentos de múltiplas fontes para atender diferentes necessidades, ou designar diferentes pessoas ou máquinas para realizar diferentes tarefas, introduzindo a complexidade de trabalhar em múltiplas dimensões. A complexidade desses problemas levou ao surpreendente descuido de que a grande maioria das aplicações são, na verdade, problemas de decisão sequencial, uma propriedade que tem sido completamente ignorada na literatura sobre esse assunto.
- **Categoria 2** descreve problemas conhecidos como busca estocástica, que representa uma das classes de problemas mais amplamente estudadas. Exemplos de problemas de busca estocástica incluem:
  - Escolher um conjunto de instalações de manufatura e armazéns, e então executar uma simulação para avaliar seu desempenho.
  - Escolher um regime de tratamento para um paciente, e então observar como ele se desenrola.
  - Definir uma estratégia de investimento para uma carteira de ações, e então observar o quão bem ela funciona.

  Todos esses casos podem ser descritos por "fazer uma escolha" e depois "ver o quão bem a escolha funciona." Se isso for feito em um simulador ou em um laboratório, podemos ser capazes de executar esses experimentos repetidamente. Nesse caso, temos um processo de busca totalmente sequencial que se enquadra na categoria 4.
- **Categoria 3** descreve uma versão mais geral da categoria 2, na qual podemos tomar uma decisão inicial, como enviar produto para um conjunto de armazéns. Em seguida, as demandas pelo produto nos pontos de venda são reveladas. Finalmente, temos a decisão de enviar dos armazéns para os pontos de venda. Este problema tem sido amplamente estudado sob o guarda-chuva da programação estocástica.
- **Categoria 4** é a forma mais comum de problema de decisão sequencial, já que captura a natureza repetida de tomar decisões seguidas de aprender nova informação, mas paramos após um número específico de períodos de tempo, tipicamente pela razão prática de que estamos executando uma simulação que precisa ter um ponto de parada predefinido.
- **Categoria 5** é um tópico popular em comunidades como programação dinâmica (especificamente processos de decisão de Markov) e controle estocástico. O objetivo é geralmente a soma infinita descontada de custos ou recompensas. Essa literatura tipicamente assume que a informação que chega em cada período de tempo vem da mesma distribuição (isso é conhecido como distribuição estacionária) e é útil para derivar uma variedade de resultados teóricos.

### De otimizar decisões a políticas

Quando estamos resolvendo um problema de otimização estático e determinístico, praticamente todo autor representa a decisão como uma variável (tipicamente um vetor) "$x$" onde temos que projetar um algoritmo para encontrar o melhor "$x$." Em contraste, quando temos um problema de decisão sequencial, há uma falta fundamental de compreensão sobre o que exatamente estamos otimizando. Em resumo, com problemas determinísticos estamos procurando a melhor decisão $x$, enquanto para problemas de decisão sequencial estamos buscando a melhor função (isto é, a política) que representa um método para tomar decisões.

A ideia de encontrar a melhor função para tomar decisões parece estranha na literatura de otimização. Em contraste, isso é exatamente o que se faz em aprendizado por reforço... na verdade, em aprendizado de máquina, onde o desafio é encontrar uma função (frequentemente chamada de modelo estatístico) que faça o melhor trabalho de ajustar os dados. Seguindo em frente, nos referiremos às funções para tomar decisões como políticas, um tópico que abordamos em maior detalhe no Volume II.

### A cadeia de informação

Tomar uma decisão guarda certos paralelos com a fabricação de produtos físicos. Para fazer um carro (por exemplo), é necessário fazer várias peças, o que frequentemente exige múltiplas etapas. Depois, após fazermos o carro, temos que distribuí-lo ao cliente.

Decisões são "tomadas" a partir de informação, que ela própria pode precisar ser criada (coletada ou estimada) por meio de uma série de etapas. Decidir quantos, e quais tipos, de carros fabricar pode requerer uma previsão compilada a partir de dados históricos, bem como previsões econômicas e estimativas de uma força de vendas. Esses dados então precisam passar por um conjunto de métodos que criam as previsões.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/FlowofInformation.png" alt="Uma ilustração do fluxo de informação desde a fonte inicial, passando por estágios de processamento e estimação, até o ponto em que é usada para tomar decisões.">
  <figcaption><span class="fig-num">Figura 1.3.</span> Uma ilustração do fluxo de informação desde a fonte inicial, passando por estágios de processamento e estimação, até o ponto em que é usada para tomar decisões (outra forma de informação).</figcaption>
</figure>

O fluxo de informação é representado na figura 1.3. "Informação" pode ser estoques observados, uma previsão criada a partir do histórico, o resultado de uma decisão de coletar informação por meio de uma pesquisa de mercado, ou o resultado de um processo de planejamento de produção. Os nós de processamento são funções matemáticas – conjuntos de equações que atuam sobre as entradas para produzir uma saída. As funções podem fazer qualquer coisa, desde somar números até produzir previsões ou tomar decisões resolvendo um problema de otimização.

Assim como acontece com os processos físicos, os processos de informação normalmente consistem em etapas manuais (como registrar estoques) combinadas com etapas realizadas no computador (e, portanto, automatizadas), como executar uma previsão.

É fácil pensar que, dado o uso extensivo de computadores, os processos de informação deveriam ser quase completamente automatizados. No entanto, ainda há muitos trabalhadores de colarinho branco, e eles não estão carregando caminhões nem trabalhando em uma linha de montagem.

## Inteligência artificial

Em última análise, o objetivo de pensar sobre um problema complexo de forma formal é usar o poder do computador para melhorar o processo. A maioria das pessoas sugerirá imediatamente o uso de "inteligência artificial" (frequentemente referida como "IA"). O problema é que "IA" é um termo que vem sendo usado desde a década de 1950 e evoluiu de forma constante ao longo dos anos, sendo tipicamente aplicado à mais recente invenção proveniente do campo da ciência da computação.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/7levelsofAI.png" alt="Os 7 níveis de inteligência artificial." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 1.4.</span> Os 7 níveis de inteligência artificial.</figcaption>
</figure>

Dividimos as principais formas de IA em sete níveis, representados na figura 1.4. Depois de descrevermos esses sete níveis, iremos organizá-los em quatro classes fundamentalmente diferentes de inteligência.

### Os sete níveis de IA

**Nível 1: Lógica baseada em regras** - Isso evoluiu pela primeira vez nas décadas de 1960 e 70, e surgiu na década de 1980 (à medida que os computadores se tornaram muito mais amplamente disponíveis) como "sistemas especialistas". Estes consistem em regras especificadas por humanos na forma "Se {condição} então {ação}." Por exemplo, a condição poderia ser "comer carne vermelha" e a ação poderia ser "beber vinho tinto". Ou a condição poderia ser os atributos de um paciente (sintomas, gênero, idade, peso, fumante?, pressão arterial, …) e a ação poderia ser um tratamento médico.

Essa forma de IA passou pelo que ficou conhecido como o "ciclo do hype", em que as pessoas fantasiavam sobre como os computadores iriam dominar o mundo.

O problema com os sistemas baseados em regras é que, à medida que o número de elementos que compõem uma condição crescia, o número de possíveis pares condição/ação aumentava exponencialmente (um comportamento conhecido como "maldição da dimensionalidade"). Na década de 1990, essa forma inicial de IA era amplamente vista como um fracasso, mas, na verdade, os sistemas baseados em regras continuam amplamente utilizados até hoje. O único fracasso foi não corresponder ao entusiasmo inicial. Os sistemas baseados em regras são amplamente utilizados atualmente.

**Nível 2 – Estatística/aprendizado de máquina** - Em desenvolvimento desde o início do século XX, a estatística (conhecida como aprendizado de máquina na ciência da computação) é a ciência de usar dados para estimar modelos. Podemos usar observações de diferentes preços de um quarto de hotel para estimar a demanda, ou demandas históricas para prever o futuro. Esse campo cresceu explosivamente nas décadas de 1980 e 1990 (à medida que os computadores se tornaram amplamente disponíveis).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ThreeCirclesofML.png" alt="Todo tipo de função para aprendizado de máquina se enquadra em três círculos sobrepostos." style="max-width: 310px;">
  <figcaption><span class="fig-num">Figura 1.5.</span> Todo tipo de função para aprendizado de máquina se enquadra nestes círculos sobrepostos, incluindo 1) funções de tabela de consulta, 2) funções paramétricas, e 3) funções não paramétricas (localmente paramétricas).</figcaption>
</figure>

Os modelos de aprendizado de máquina vêm em uma variedade de estilos, mas podem ser organizados em três grandes classes, conforme ilustrado na figura 1.5:

- **Tabelas de consulta** – Estas têm a forma "Se {entrada} então {saída}," semelhante aos sistemas baseados em regras.
- **Modelos paramétricos** – Estas são funções analíticas das entradas que produzem uma ou mais saídas usando uma função matemática que depende de um conjunto de parâmetros desconhecidos. Se a função for linear nesses parâmetros, então isso seria um modelo linear. Modelos mais gerais usam funções que são não lineares nos parâmetros. A figura 1.6 ilustra modelos lineares e não lineares.

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/LinearandNonlinearFunctions.png" alt="Ilustrações de funções paramétricas lineares e não lineares usadas em aprendizado de máquina." style="max-width: 464px;">
    <figcaption><span class="fig-num">Figura 1.6.</span> Ilustrações de funções paramétricas lineares e não lineares usadas em aprendizado de máquina.</figcaption>
  </figure>

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/NeuralNetwork.jpg" alt="Ilustração de uma pequena rede neural.">
    <figcaption><span class="fig-num">Figura 1.7.</span> Ilustração de uma rede neural (muito pequena). Cada ligação carrega um parâmetro que precisa ser ajustado para que a saída fique o mais próxima possível do rótulo associado às entradas em um conjunto de dados de treinamento.</figcaption>
  </figure>

  Uma classe importante de modelos paramétricos que surgiu pela primeira vez na década de 1970 são as redes neurais (ver figura 1.7). As redes neurais têm uma camada de entrada, onde qualquer conjunto de entradas entra na rede por meio dos nós de entrada. Esses valores são então transformados por meio das camadas intermediárias antes de produzir uma ou mais saídas. Cada ligação na rede tem um parâmetro associado a ela, sendo que as primeiras redes neurais frequentemente tinham de milhares a um milhão de parâmetros.

  É melhor pensar nas redes neurais como uma função não linear de dimensão muito alta que pode ser usada para ajustar um conjunto virtualmente ilimitado de relações, mas ao custo de exigir grandes conjuntos de dados de treinamento. Além disso, sua flexibilidade limita sua capacidade de ser usada na presença de ruído.
- **Modelos não paramétricos** – Estes são mais facilmente visualizados como modelos que são aproximações locais de uma função. Por exemplo, podemos ter estimativas de uma função em um conjunto de pontos e, então, usamos extrapolações lineares desses pontos para fornecer estimativas de pontos para os quais não temos uma estimativa.

**Nível 3 – Reconhecimento de padrões** - O próximo nível de IA surgiu da comunidade de pesquisa em 2010, abordando o problema de reconhecimento de padrões. O reconhecimento de padrões é apenas outra forma de aprendizado de máquina que vimos no nível 2, que envolve o uso de redes neurais. No entanto, essas redes neurais são muito maiores do que as usadas na década de 1990. Em vez de muitos milhares a um milhão de parâmetros, essas redes neurais podem ter de 10 a 100 milhões de parâmetros. Estas foram chamadas de "redes neurais profundas".

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SunflowerTakemeHome.jpg" alt="Ilustração da capacidade de uma rede neural de reconhecer a imagem de um girassol, ou o padrão de voz dizendo Take me home.">
  <figcaption><span class="fig-num">Figura 1.8.</span> Ilustração da capacidade de uma rede neural de reconhecer a imagem de um girassol, ou o padrão de voz dizendo "Take me home."</figcaption>
</figure>

As entradas seriam os pixels em uma imagem (ou os sinais de um padrão de voz), o que é uma entrada de dimensão muito mais alta. A parte difícil era criar um conjunto de dados de treinamento grande o suficiente para realizar o ajuste dos parâmetros. O conjunto de dados de treinamento tinha que consistir em milhões de imagens (o que era fácil de encontrar na internet) com os "rótulos" associados que identificavam a imagem, como "girassol" ou "Take me home" na figura 1.8. A parte difícil era obter os rótulos, que precisavam ser gerados por pessoas.

O avanço no treinamento veio quando uma professora de ciência da computação de Princeton, Fei-Fei Li, percebeu que um ambiente de software criado pela Amazon chamado "Mechanical Turk" tornava possível alcançar pessoas ao redor do mundo dispostas a trabalhar por salários muito baixos para criar esses rótulos. Em outras palavras, o avanço não foi tanto a análise subjacente (as redes neurais foram desenvolvidas ainda na década de 1970), mas sim o acesso a dados suficientes a baixo custo.

**Nível 4 – Modelos de linguagem de grande escala** - O nível 4 é simplesmente mais um passo além do reconhecimento de imagens, em que, em vez de estimar (ou "prever") a identidade de uma imagem, a rede neural recebia como entrada uma sequência de palavras (variando de algumas palavras a centenas ou milhares de palavras) para prever a próxima palavra (os modelos operam sobre fragmentos de palavras conhecidos como "tokens"). Ela faz isso criando uma distribuição de probabilidade das palavras que poderiam vir a seguir, dada uma sequência de palavras que poderia ser um prompt inicial fornecido por um usuário.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTPrompt.png" alt="Modelos de Linguagem de Grande Escala como o ChatGPT usam um conjunto de dados de treinamento para construir uma distribuição de palavras que podem seguir uma sequência de palavras.">
  <figcaption><span class="fig-num">Figura 1.9.</span> Modelos de Linguagem de Grande Escala como o ChatGPT usam um conjunto de dados de treinamento para construir uma distribuição de palavras que podem seguir uma sequência de palavras, iniciada com um prompt, mas construindo sobre a sequência criada pelo LLM.</figcaption>
</figure>

A figura 1.9 ilustra isso, começando com o prompt "A melhor maneira de melhorar a robustez de uma cadeia de suprimentos é…" A rede neural então produz uma distribuição de probabilidade da palavra que poderia vir a seguir, com base no conjunto de dados de treinamento. O modelo de linguagem de grande escala (ou LLM) então amostra a partir dessa distribuição, em proporção à distribuição. Se ele escolher a palavra "projetar" então a sequência "A melhor maneira de melhorar a robustez de uma cadeia de suprimentos é projetar…" é inserida na rede neural, que então produz outra distribuição de palavras. O processo de amostrar uma palavra, adicioná-la à sequência anterior de palavras para produzir uma nova sequência, é repetido várias vezes. É por isso que o processo é chamado de "IA generativa".

As redes neurais usadas para gerar a distribuição de "próximas palavras" que seguem uma sequência anterior são verdadeiramente colossais. Enquanto uma rede neural profunda para reconhecimento de padrões (Nível 3) poderia ter de 10 a 100 milhões de parâmetros, as redes neurais usadas para LLMs podem variar entre 10 bilhões e 1 trilhão de parâmetros.

É preciso ficar claro, a partir dessa descrição, que os LLMs não são inerentemente inteligentes; eles apenas imitam padrões de palavras a partir de um conjunto de dados de treinamento. Eles soam inteligentes porque estão imitando padrões de palavras que vêm de uma fonte inteligente (assumindo que um humano escreveu as palavras).

**Nível 5 – Otimização determinística** – Isso cobre uma extensa biblioteca de ferramentas para resolver problemas de decisão difíceis. Esses problemas são conhecidos como programas lineares, programas inteiros e programas não lineares, e todos têm a característica de que uma "decisão" é um vetor, o que significa que é um conjunto de diferentes decisões (um conjunto muito grande). Alguns exemplos são:

- Podemos querer decidir quanto produto enviar de um conjunto de 10 centros de distribuição para 200 armazéns, criando um vetor de 2.000 dimensões que precisa ser decidido.
- As companhias aéreas precisam programar suas aeronaves e as tripulações (tanto pilotos quanto comissários de bordo) por períodos prolongados (tipicamente trimestrais) para maximizar a utilização, respeitando as regras de manutenção das aeronaves, bem como as regras de utilização das pessoas.
- Um gestor financeiro pode estar constantemente ajustando a alocação de capital entre 10.000 investimentos diferentes, o que nos dá 10.000 decisões de compra ou venda que são tomadas diariamente.

Frequentemente esses problemas podem ser representados pictoricamente, como mostrado à esquerda na figura 1.10, mas existe uma maneira padrão de escrevê-los matematicamente, geralmente começando pela notação à direita. Embora essa notação matemática não seja geralmente familiar, as universidades formam milhares de estudantes a cada ano treinados para modelar problemas nesse formato. Além disso, existem muitos pacotes de computador, alguns disponíveis comercialmente enquanto outros são gratuitos, que conseguem resolver de forma eficiente até mesmo problemas em grande escala.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmenttoLinearProgram.jpg" alt="Ilustração gráfica de um problema de atribuição e sua representação matemática como um programa linear.">
  <figcaption><span class="fig-num">Figura 1.10.</span> Ilustração gráfica de um tipo de problema de decisão (atribuição de recursos a tarefas), e sua representação matemática como um programa linear.</figcaption>
</figure>

**Nível 6 – Problemas de decisão sequencial** – A grande maioria das decisões é tomada repetidamente ao longo do tempo, seja a cada poucos segundos, minutos ou horas, diariamente, semanalmente, trimestralmente ou anualmente. Mesmo nossos problemas de otimização determinística no nível 5 acima são geralmente resolvidos repetidamente ao longo do tempo, mas a maioria das decisões é muito mais simples. Alguns exemplos de problemas de decisão sequencial são:

- Decidir quando vender um ativo, e o valor esperado de manter o ativo diante de preços que mudam dinamicamente.
- Reabastecer estoque, possivelmente com prazos de entrega muito longos, para satisfazer demandas incertas em um mercado dinâmico.
- Determinar os parâmetros de uma política de negociação financeira automatizada.
- Escolher as concentrações corretas de materiais, a temperatura correta para a mistura e o tempo de exposição da mistura a cada temperatura para produzir um material com a maior resistência.
- Escolher o melhor medicamento para tratar um paciente com características específicas.
- Decidir quanta energia armazenar a partir de uma combinação de parques eólicos, parques solares e da rede elétrica para atender às cargas futuras (demandas) ao menor custo.
- O transporte rodoviário de cargas completas requer determinar quais motoristas devem transportar quais cargas de frete.
- Escolher quanto investir em cada uma de milhares de ações e outros investimentos.

Problemas de decisão sequencial surgem em todos os processos humanos. Uma decisão pode ser binária (manter ou vender), discreta (qual medicamento), ou vetores discretos e contínuos. Escolher entre as melhores opções de um conjunto discreto (ou discretizado) de escolhas é, de longe, o problema de decisão sequencial mais comum, mas muitos envolvem problemas operacionais complexos que surgem na logística empresarial, em sistemas de energia e em problemas de distribuição na área da saúde.

**Nível 7 – Criatividade, raciocínio e julgamento** – O nível 7 representa o mais alto nível de inteligência. Por exemplo, embora muitos dos problemas nos níveis 5 e 6 possam ser bastante complexos, eles sempre envolvem problemas bem estruturados, com decisões e objetivos claramente definidos. O nível 7 é onde podemos formular problemas complexos, como reduzir as emissões de CO2, minimizar doenças e criar novos produtos.

Acreditamos firmemente que, embora muitos autores falem sobre o futuro da "IA" em termos de substituição de pessoas, a realidade é que os computadores não conseguirão ir além de problemas bem definidos. Uma atividade que acreditamos estar além da capacidade da inteligência computacional (incluindo as habilidades supervalorizadas dos grandes modelos de linguagem) é a formulação de problemas de decisão complexos. Por essa razão, nos referimos ao nível 7 como ficção científica, algo divertido de se discutir, mas que nunca realmente acontecerá.

### Três classes de inteligência computacional

Os primeiros seis níveis de inteligência artificial representam diferentes formas de inteligência que podem ser implementadas em um computador, enquanto o sétimo, em nossa opinião, permanece exclusivamente no domínio dos humanos. Os primeiros seis níveis podem ser divididos em três classes distintas:

**Classe 1 – Comportamentos especificados por humanos** – Esta classe inclui o Nível 1 nos sete níveis de IA, e pode ser usada para dois propósitos diferentes:

- Reconhecimento de padrões – Uma regra pode especificar que, se um paciente apresenta um conjunto específico de condições, então isso significa que ele tem uma doença específica.
- Decisões – Da mesma forma, um paciente com um conjunto específico de condições deve tomar um medicamento específico (o que é uma forma de decisão).

A lógica baseada em regras não distingue se a regra está fazendo uma afirmação sobre o estado do mundo, ou sobre uma ação que deve ser tomada. As condições por trás da regra e seu resultado (seja uma afirmação de estado ou uma decisão) devem ser especificados manualmente.

Uma característica importante da inteligência artificial de Classe 1 é o que ela não utiliza:

- Não utiliza um conjunto de dados de treinamento.
- Não requer um modelo do problema de decisão subjacente.

As regras precisam ser especificadas diretamente por pessoas, embora seja possível que regras sejam especificadas em um conjunto de dados. Por exemplo, poderíamos ter um conjunto de dados listando protocolos médicos, em que, para cada condição do paciente, é especificado um tratamento. No entanto, imagine que temos um conjunto de dados compilado a partir de decisões reais de médicos que podem estar em conflito: diferentes médicos podem prescrever tratamentos conflitantes apesar de terem pacientes com condições idênticas. Se usarmos esse conjunto de dados para aprender tratamentos, isso seria um exemplo de aprendizado por máquina.

**Classe 2 – Aprendizado por máquina** – Esta classe inclui os níveis 2, 3 e 4. O aprendizado por máquina se refere ao uso de funções matemáticas que consistem em entradas e um conjunto de parâmetros ajustáveis que podem ser calibrados para que a função corresponda da melhor forma possível a um conjunto de respostas, também chamadas de rótulos (entre muitos outros nomes). O aprendizado por máquina requer uma função especificada pelo usuário, juntamente com um conjunto de dados de treinamento que consiste em entradas e respostas (rótulos).

Enquanto a lógica baseada em regras é limitada em termos da complexidade das entradas, o aprendizado por máquina consegue lidar com entradas muito complexas usando modelos que possuem um grande número de parâmetros. Modelos lineares podem ter de dezenas a centenas de milhares de variáveis. Redes neurais já foram treinadas para aplicações de grandes modelos de linguagem com mais de um trilhão de variáveis. É claro que modelos maiores exigem grandes conjuntos de dados, o que tem se mostrado a principal barreira que limita o uso de redes neurais para a tarefa altamente complexa do processamento de linguagem.

**Classe 3 – Otimização** – Esta classe inclui os níveis 5 e 6, que tratam do problema de escolher a melhor decisão dentro de um conjunto de opções, que pode ser um conjunto discreto ou um espaço vetorial de alta dimensão. O nível 5 se limita a problemas estáticos (determinísticos) em que todos os dados são conhecidos, e buscamos a melhor decisão (que frequentemente é um vetor). O nível 6 aborda o problema complexo de escolher as melhores decisões ao longo do tempo, o que abrange uma gama absolutamente vasta de problemas.

A classe de otimização não utiliza um conjunto de dados de treinamento. Em vez disso, é necessário especificar uma métrica de desempenho (frequentemente chamada de função objetivo), juntamente com um conjunto de equações que descrevem quais decisões são permitidas. Para problemas de decisão sequencial, também precisamos de equações que nos digam como a informação evolui ao longo do tempo.

### Resumo

Os métodos da classe 2, aprendizado por máquina, visam treinar funções matemáticas para se comportarem como um conjunto de dados de treinamento. Se o conjunto de dados de treinamento consiste em imagens, como radiografias de mama, juntamente com "rótulos" gerados por humanos indicando se a mama apresenta evidências de câncer, o modelo treinado nunca conseguirá ter um desempenho melhor do que as habilidades dos radiologistas que forneceram os rótulos. Por essa razão, é possível afirmar que os métodos de Classe 2 (aprendizado por máquina) ensinam os computadores a se comportarem como humanos (mais precisamente, a se comportarem como o conjunto de dados de treinamento).

Em contrapartida, os métodos da Classe 3 (otimização) são projetados para produzir decisões que superam as humanas. O preço desse desempenho superior é que precisamos fornecer o que é conhecido como um modelo do problema. Em particular, esses métodos exigem um modelo matemático, composto por:

- Um conjunto bem definido de decisões.
- Uma métrica de desempenho clara que permita avaliar se uma decisão é melhor do que outra.
- A física do problema, que descreve:
  - Quais decisões podem ser tomadas em um determinado ponto no tempo.
  - Como o sistema evolui ao longo do tempo.
  - Como novas informações estão chegando ao sistema.

Este livro aborda a classe 3, já que ela cobre os métodos que tratam da tomada de decisões. Em particular, vamos nos concentrar em problemas de decisão sequencial, já que estes são os mais difundidos – praticamente todo mundo toma decisões, e as tomamos ao longo do tempo, tornando-as decisões sequenciais. Problemas estáticos (determinísticos) são apenas um caso especial de problemas de decisão sequencial, e a solução de problemas de decisão sequencial se baseará fortemente nas ferramentas desenvolvidas para problemas estáticos e determinísticos.

Problemas de decisão sequencial representam uma classe de problemas incrivelmente rica. Invariavelmente, essas ferramentas dependem dos métodos dos primeiros cinco níveis de inteligência artificial. Assim como as ferramentas do nível 5 (otimização determinística), precisamos de um modelo do problema subjacente. No entanto, como os problemas de decisão sequencial são muito mais ricos do que os problemas estáticos do nível 5, os modelos precisam ser muito mais ricos e complexos, mas essa é uma área em que a modelagem matemática clássica tem se mostrado insuficiente.

## Estruturas de modelagem tradicionais

É útil dividir as estruturas de modelagem para a tomada de decisões em duas categorias amplas:

- Modelos estáticos e determinísticos que assumem que todas as informações são conhecidas, em que nos esforçamos para escolher as decisões que funcionam melhor.
- Modelos de decisão sequencial que capturam o fluxo de decisões e informações. Como modelamos explicitamente a informação que chega após tomarmos uma decisão, isso significa que as decisões precisam ser tomadas antes que a informação (presumivelmente relevante para o desempenho da decisão) tenha chegado.

Neste volume, todos os problemas de decisão sequencial capturam explicitamente o fluxo de informação, o que significa que estamos tomando decisões em cada ponto no tempo antes de conhecermos a informação que pode chegar no futuro. Por essa razão, os problemas de decisão sequencial são fundamentalmente *estocásticos* (o termo elegante para dizer que a informação futura é aleatória).

### Modelos estáticos e determinísticos

A literatura para a modelagem de problemas estáticos e determinísticos é bastante madura, com uma base substancial de software construída em torno de variações de um modelo de otimização que pode ser escrito:

$$
\begin{align}
\min_{x,y} \quad & C(x,y) \tag{1}\\
\text{subject to:}\\
& g(x,y) = 0, \tag{2}\\
& x \geq 0, \tag{3}\\
& y \in \{0,1\}. \tag{4}
\end{align}
$$

Permitimos a presença tanto de variáveis contínuas $x$ (que podem assumir um valor como 0,56) quanto de variáveis discretas $y$ que devem ser 0 ou 1.

O que acontece ao modelar problemas de otimização determinística (nível 5) é que pegamos o modelo matemático dado pelas equações (1)–(4), e então vamos ao problema físico e preenchemos os elementos do modelo, o que exige identificar as variáveis de decisão, a função objetivo e as restrições. Imagine ter um martelo e procurar por pregos. A ferramenta é útil, mas o processo exige encaixar o problema na estrutura de modelagem.

A otimização determinística há muito tempo enfatiza o desafio de projetar ferramentas para encontrar as decisões ótimas dado um modelo, com atenção secundária dada à criação do próprio modelo. Observe que a estrutura de modelagem não fornece nenhum mecanismo para capturar a evolução das decisões e informações, ou qualquer coisa relacionada à forma como as decisões são organizadas.

### Modelos de decisão sequencial

Tradicionalmente, a literatura para problemas de decisão sequencial tentou seguir a mesma abordagem, mas isso falhou completamente. Em contraste com o arcabouço de modelagem bem definido para otimização determinística representado pelas equações (1)–(4), a literatura de otimização não adotou um arcabouço de modelagem padrão para problemas de decisão sequencial. No momento em que este texto é escrito, há mais de uma dúzia de comunidades diferentes usando oito sistemas notacionais diferentes, com estilos fundamentalmente distintos para expressar qual problema está sendo resolvido, ou o que estamos resolvendo. Por exemplo, algumas comunidades escrevem uma função objetivo, como se faz na otimização determinística, outras escrevem uma política, e outras ainda escrevem uma condição de otimalidade.

Nossa abordagem depende do arcabouço de modelagem universal esboçado na [seção acima](#universalmodelingframework), que pode ser usado para modelar *qualquer* problema de decisão sequencial. Esse arcabouço de modelagem é descrito em detalhes em *Reinforcement Learning and Stochastic Optimization* [capítulo 9]. Este livro apresenta o modelo antes de descrever políticas para tomar decisões, o que é feito no capítulo 11 (o capítulo 10 concentra-se na modelagem da incerteza).

O Volume II desta série também abordará as dimensões do arcabouço de modelagem universal com muito mais detalhes do que podemos apresentar neste volume, usando níveis modestos de notação. Contudo, o arcabouço de modelagem universal não pode ser usado sem responder às três perguntas tratadas neste volume.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoicewithUncertainty.jpg" alt="Um problema de decisão com escolhas discretas, e incerteza sobre o valor de cada escolha.">
  <figcaption><span class="fig-num">Figura 1.11.</span> Um problema de decisão com escolhas discretas, e incerteza sobre o valor de cada escolha.</figcaption>
</figure>

### O problema de decisão mais comum

Problemas de decisão, e em particular problemas de decisão sequencial, são uma classe de problemas excepcionalmente rica. Contudo, algo frequentemente negligenciado na literatura sobre otimização é que a vasta maioria dos problemas de decisão é descrita pela figura 1.11, em que podemos ter duas escolhas (realizar uma ação ou não), ou um pequeno conjunto de escolhas (qual medicamento usar, onde comprar uma peça), ou um grande número de escolhas (qual produto anunciar, qual molécula usar ao criar um novo medicamento).

Uma característica distintiva dessa classe de problemas é que, embora possamos ter uma estimativa sobre o desempenho de cada escolha, geralmente estamos incertos quanto ao desempenho que surgirá depois que fizermos uma escolha. Podemos ter apenas uma chance de fazer a melhor escolha, mas frequentemente tomamos essa decisão repetidamente, podendo aprender com experiências passadas. Há muitas variações desse problema:

- Se estamos realizando experimentos offline em um laboratório ou simulador, ou se precisamos aprender enquanto agimos.
- O número de vezes que repetimos a escolha.
- O que aprendemos com uma escolha pode afetar nossas crenças sobre outras escolhas, refletindo um modelo de crença subjacente.
- A estrutura do modelo de crença que captura quaisquer relações estruturais subjacentes.
- A presença de recursos físicos que estão sendo consumidos ou gerenciados, como configurar uma máquina para realizar um experimento, consumir suprimentos, ou exigir pessoal especializado.
- O tempo e o custo necessários para fazer e implementar uma escolha.

A abordagem mais comum que as pessoas usam ao escolher entre um conjunto discreto de opções é simplesmente selecionar aquela que parece ser a melhor. Isso ignora a capacidade de aprender com a escolha para tomar uma decisão melhor no futuro. O valor de aprender agora para decisões futuras dependerá fortemente de quantas vezes enfrentaremos o mesmo conjunto de escolhas. Isso também pode estar ignorando riscos que podem estar associados a fazer uma escolha que pode ter um desempenho muito ruim.

Há muitos contextos em que as decisões são bastante importantes, e temos que conviver com a decisão por um tempo. Exemplos podem ser decidir desenvolver um determinado medicamento, ou escolher um fornecedor com o qual teremos que conviver por pelo menos um ano. Para esses problemas, é particularmente importante dedicar algum tempo a desenvolver o melhor conjunto de crenças sobre o possível desempenho de cada escolha.

Os modelos de crença são geralmente complicados por correlações. Escolher qual medicamento desenvolver pode exigir a comparação entre diferentes tipos de medicamentos contra o câncer que atendem a um mercado semelhante. Podemos ter que escolher entre vários fornecedores agrupados por país, que compartilham os mesmos riscos de aumento de tarifas, surtos de doenças e mudanças cambiais.

### Problemas de decisão estáticos versus sequenciais

Na literatura acadêmica, há um forte senso de competição entre a comunidade que faz otimização determinística e as comunidades fragmentadas que fazem otimização sob incerteza. A maioria dos modelos de otimização determinística são aproximações determinísticas de problemas estocásticos, e um subproduto disso é que as pessoas que usam otimização determinística podem ficar bastante defensivas quando confrontadas com as formas pelas quais a incerteza afeta seu problema.

Recomendamos aos leitores que tenham em mente o seguinte:

- Um modelo de otimização estático e determinístico é apenas um caso particular de um problema de decisão sequencial.
- Mostraremos (no Volume II) que as ferramentas de otimização determinística são amplamente usadas na solução de problemas de decisão sequencial gerais.
- De longe, o problema de decisão mais comum que surge em aplicações práticas é aquele retratado na figura 1.11, em que temos que escolher a melhor de um conjunto de opções. Mesmo quando capturamos a incerteza em nossas crenças sobre as escolhas, os diferentes métodos para resolver esse problema ainda se reduzem a resolver sequências de problemas de otimização determinística.
- O problema não é que uma aproximação determinística seja usada; o erro está em como as decisões são avaliadas. O desempenho das decisões precisa ser avaliado ao longo do tempo, à medida que novas informações chegam.

O erro mais comum cometido no uso de modelos de otimização determinística é negligenciar quando o problema precisa ser resolvido repetidamente ao longo do tempo. Um exemplo disso surge em uma classe de problemas chamada "problema de atribuição" (assignment problem), em que atribuímos "recursos" (pessoas, caminhões, máquinas) a "tarefas" (atribuições de trabalho, cargas a serem transportadas, trabalhos a serem concluídos). Esses problemas nunca são resolvidos apenas uma vez; à medida que o tempo avança, os recursos progridem na conclusão das tarefas, novas tarefas surgem, e as máquinas podem sofrer falhas que alteram o tempo necessário para concluir uma tarefa.

A figura 1.12(a) retrata o problema como um problema estático e determinístico. Quando esse problema foi resolvido pela primeira vez por George Dantzig na década de 1950, foi considerado um grande avanço (o que de fato foi). No entanto, mesmo 70 anos depois, profissionais de ponta ignoram que o problema nunca é resolvido apenas uma vez; ele precisa ser resolvido repetidamente ao longo do tempo, e é quase sempre o caso que a solução em um determinado momento afeta os problemas que precisarão ser resolvidos no futuro (incerto).

<figure class="book-figure">
  <div class="book-figure-row">
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/StaticAssignment.jpg" alt="Problema de atribuição estático.">
      <figcaption>(a)</figcaption>
    </figure>
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/DynamicAssignment.jpg" alt="Problema de atribuição dinâmico.">
      <figcaption>(b)</figcaption>
    </figure>
  </div>
  <figcaption><span class="fig-num">Figura 1.12.</span> (a) Problema de atribuição estático; (b) problema de atribuição dinâmico.</figcaption>
</figure>

O problema real é retratado na figura 1.12(b), em que ilustramos o problema sendo resolvido sequencialmente ao longo do tempo. Observamos que é impossível determinar se um problema de otimização determinística precisa ser resolvido sequencialmente apenas olhando para a matemática do modelo; é necessário entender o problema em linguagem natural.

## Estágios da modelagem

Começamos reconhecendo três maneiras diferentes de visualizar um problema:

- **O mundo real** – É onde as decisões são implementadas, e onde coletamos informações que descrevem o verdadeiro desempenho do nosso sistema.
- **O modelo base** – Geralmente assume a forma de um simulador projetado para imitar o mundo real da forma mais fiel possível. Simuladores (às vezes chamados de "gêmeos digitais") são poderosos, mas podem ser muito caros de desenvolver, razão pela qual frequentemente precisamos projetar métodos para tomar decisões sem o benefício de um simulador para testar o desempenho de nossa política.
- **Um modelo de horizonte de previsão** – Modelos de horizonte de previsão são usados apenas para tomar decisões em que precisamos aproximar o impacto de uma decisão tomada agora sobre o futuro. Modelos de horizonte de previsão são amplamente usados em alguma forma (o Google Maps usa um modelo aproximado de horizonte de previsão para planejar um trajeto até o destino), mas não são usados universalmente.

Na [discussão sobre a formulação do problema acima](#framingtheproblem), descrevemos três estágios envolvidos no entendimento das diferentes dimensões de um problema de decisão. Nesta seção, vamos nos concentrar especificamente no desenvolvimento de um modelo computacional, caso seja necessário.

1. **Formulando o problema:** – Qualquer tentativa de modelar um problema de decisão requer os elementos identificados em nosso processo de formulação:
   - Uma narrativa em linguagem simples – É importante sempre começar uma descrição nas palavras de um especialista de domínio sem nenhum treinamento sequer no processo de modelagem.
   - Responda às três perguntas de formulação:
     - Quais são as métricas de desempenho? Se você não conseguir articular métricas de desempenho quantificáveis, pode estar diante de um daqueles problemas complexos e não estruturados que não se prestam a um processo de análise formal.
     - Que tipos de decisões estão sendo tomadas (e possivelmente por quem)? Nesse ponto, o simples fato de listar as decisões potenciais já torna evidente qual escolha você deve fazer?
     - Quais são os tipos de incertezas que podem afetar o desempenho do sistema? Essa pode ser uma questão complexa, que levará tempo para ser articulada e, em seguida, analisada, a fim de compreender o efeito dessas incertezas sobre o desempenho das diferentes decisões.

   Nesse ponto, você pode sentir que a escolha que deve fazer é óbvia. Caso contrário, prossiga para a próxima etapa.
2. **O arcabouço de modelagem universal** – Compreender os diferentes elementos do arcabouço de modelagem universal (descrito [acima](#universalmodelingframework)) pode proporcionar um entendimento mais completo do seu problema. Especificamente:
   - Você precisará reunir as informações necessárias para tomar uma decisão e calcular suas métricas de desempenho (também conhecidas como variáveis de estado). Como isso depende de como você vai tomar decisões (a política), normalmente você não conseguirá identificar todos os elementos das variáveis de estado de imediato.

Preste atenção às informações que você gostaria de ter, mas não consegue observar diretamente (pelo menos não com precisão alguma). Elas podem representar oportunidades para o uso de estimação estatística/aprendizado por reforço.
   - Entenda quais decisões você tem permissão para tomar. Mais adiante você abordará o problema de tomar decisões (projetando a política).
   - Liste os tipos de informação que chegarão depois que você tomar uma decisão.
   - Você precisará pensar em como a informação em sua variável de estado muda ao longo do tempo. É claro que isso evolui conforme nossa compreensão do que informação precisamos. Isso é a função de transição.
   - Por fim, você precisará entender como vai avaliar o desempenho do seu sistema. Isso constitui sua função objetivo.
3. **Modelando a incerteza** – Essa é frequentemente a dimensão mais sutil de modelar um problema de decisão sequencial, muitas vezes porque quantidades incertas podem não ser imediatamente óbvias. Embora existam muitas fontes potenciais de incerteza, há apenas duas maneiras pelas quais ela entra no modelo:
   - Incerteza em quantidades e parâmetros dentro da variável de estado, que carrega a informação necessária para tomar uma decisão e/ou calcular métricas de desempenho.
   - Incerteza na informação que pode chegar depois que uma decisão é tomada, mas antes que a próxima decisão seja tomada (temos chamado isso de processo de informação exógena).

   Existem diferentes maneiras de capturar a incerteza:
   - Usar observações de quantidades incertas (preços, demandas, tempos de viagem) do histórico, e usar essas amostras para calibrar e ajustar nosso modelo.
   - Criar um modelo matemático da incerteza, e então gerar amostras a partir do modelo matemático.

   Tratamos a incerteza com muito mais profundidade no Capítulo 5, onde identificaremos várias fontes diferentes de incerteza como guia para nomear as incertezas que se aplicam à sua aplicação específica.
4. **Projetando políticas** – Aqui abordamos o desafio muito rico de projetar métodos para tomar decisões. O Capítulo 4 descreve quatro classes de políticas, que capturam métodos fundamentalmente diferentes de tomar decisões, mas deixamos para o Volume III uma discussão completa do processo de projeto de políticas.

   Observe que, embora introduzamos a ideia de uma variável de estado na estrutura universal de modelagem, a variável de estado é parcialmente definida pela informação necessária para a política.
5. **Implementação computacional** – Uma vez que projetamos as políticas, precisamos decidir como vamos testá-las. As opções são:
   - Teste em campo – Nesse caso, tudo o que precisamos fazer é implementar a política em um computador, o que também significa reunir os dados necessários para tomar uma decisão.
   - Simulação computacional – Como testamos políticas no computador depende da complexidade do sistema. Normalmente estamos escolhendo entre:
     - Implementação em planilha – A maioria dos problemas é relativamente simples, permitindo que testemos ideias em uma planilha. Planilhas podem até ser a base de um sistema de produção.
     - Ambientes de programação de propósito geral – Se o problema for complexo demais para uma planilha, precisaremos recorrer a qualquer um dos diversos ambientes de programação. Isso requer as habilidades de programadores especialistas.
6. **Avaliando e calibrando modelos e políticas** – Neste ponto, precisamos decidir se podemos desenvolver um simulador para avaliar a política, ou se precisamos implementar a política para que ela possa ser usada em campo:
   - Desenvolvendo um simulador computacional – Neste ponto temos tudo o que precisamos para simular o desempenho da política. Um simulador computacional é simplesmente uma implementação em software dos elementos da estrutura universal de modelagem. Podemos então executar esse simulador tanto com dados históricos quanto com dados gerados a partir de um modelo matemático.
   - Teste em campo – É frequentemente o caso de não termos tempo ou recursos para desenvolver um simulador. Em vez disso, implementamos a política e depois monitoramos o quão bem ela funciona na prática.

   Criar um simulador computacional oferece vantagens significativas, mas introduz a difícil dimensão da calibração do modelo. Em contraste, implementar uma política diretamente em campo significa que estamos testando-a em um ambiente que não requer calibração. O problema com uma implementação em campo é que buscar entre diferentes classes de políticas, e em particular ajustar quaisquer parâmetros, pode ser dolorosamente lento. O ajuste de políticas em campo recebeu muito pouca atenção na literatura de pesquisa.

## Tipos de análise

Se estamos resolvendo problemas de otimização determinística, podemos recorrer a uma família substancial de solucionadores, desde pacotes comerciais como Gurobi ou FICO Xpress até qualquer um dos diversos pacotes que podem ser baixados gratuitamente. Por exemplo, o Google oferece seu "OR Toolbox" sem custo, mesmo para usuários comerciais.

Há muito pouco em termos de ferramentas comerciais para otimizar decisões ao longo do tempo, como seria necessário em um problema de decisão sequencial. No entanto, tipicamente recorreremos a diversas caixas de ferramentas ao construir sistemas personalizados para problemas específicos. Estas incluem:

- **Otimização determinística** – Só porque estamos tentando tomar decisões ao longo do tempo, sob incerteza, não significa que as ferramentas de otimização determinística não sejam mais usadas. De fato, a maioria (mas não todos) dos problemas de decisão sequencial envolve resolver sequências de problemas de otimização que são resolvidos usando solucionadores determinísticos.
- **Simulação** – Tipicamente isso se refere à simulação de Monte Carlo, que é um conjunto de ferramentas e técnicas para estimar funções de variáveis aleatórias. As ferramentas de Monte Carlo são particularmente adequadas para problemas complexos de alta dimensão, tornando-as uma das ferramentas mais poderosas para modelar a evolução da informação.
- **Estimação estatística/aprendizado de máquina** – Ferramentas de Estatística/AM, que incluem regressão linear ou não linear, regressão em árvore, modelos localmente paramétricos, e redes neurais em uma variedade de tamanhos. Estatística/AM pode ser descrita como um conjunto de ferramentas para estimar algo que não sabemos, usando informação que sabemos.

Essas ferramentas são tipicamente descritas como vindas de comunidades diferentes, das quais apenas uma (otimização determinística) é vista como resolvendo problemas de decisão. E, no entanto, é importante entender o papel de cada uma para o propósito de tomar decisões.

Modelos de simulação, por exemplo, são quase sempre construídos para ajudar a entender o comportamento de algum processo, que pode ser qualquer coisa, desde uma planta de manufatura até a propagação de uma doença em uma população. Em ambos os exemplos, estamos buscando ver como o design do sistema (o layout da planta, onde os estoques de vacinas são mantidos) ou o controle do sistema (como os trabalhos são roteados, colocando pedidos de reabastecimento de vacinas). Também podemos simular a trajetória de furacões, e embora não possamos mudar suas trajetórias, essa informação pode ser usada para ajudar a orientar evacuações, que também teriam que ser simuladas.

Em resumo, ajuda pensar em modelos de simulação como funções objetivo, ou previsões de eventos futuros a serem usadas para tomar decisões.

Então, e quanto à estimação estatística/aprendizado de máquina? Embora esses campos usem otimização para ajustar um modelo, o objetivo é simplesmente estimar uma quantidade ou parâmetro. Mas por que estamos criando essas estimativas?

Podemos estar estimando a natureza de um tumor, ou quantas pessoas aprovam o desempenho de um presidente, ou a probabilidade de um circuito funcionar. Ou podemos estar estimando eventos no futuro, como quantas pessoas podem comprar um produto, ou a geração de energia em um parque eólico. Em todos esses casos, estamos criando uma estimativa ou previsão para ajudar a tomar uma decisão agora.

Cada uma dessas ferramentas também pode fornecer serviços com valor intrínseco além de ajudar a tomar melhores decisões. Isso é mais facilmente observado com os grandes modelos de linguagem que estão evoluindo rapidamente no momento em que este texto é escrito. Por exemplo, os LLMs podem ajudar com um conjunto crescente de tarefas, como fazer pesquisas, processar solicitações e criar imagens, mas não tomar decisões.

## Notas finais

Este capítulo estabeleceu a base para pensar sobre o conjunto complexo de problemas conhecidos como problemas de decisão sequencial. Partimos da seguinte premissa:

> "Se você quer administrar melhor {qualquer coisa}, você precisa tomar melhores decisões."

A vasta maioria dos cenários que envolvem tomar decisões se enquadra na ampla categoria de problemas de decisão sequencial, onde tomamos decisões repetidamente ao longo do tempo à medida que novas informações chegam (observe que um caso especial de um problema de decisão sequencial é um problema em que tomamos apenas uma decisão).

O objetivo do volume é construir pontes entre qualquer problema em que haja interesse em ter um desempenho melhor (presumivelmente tomando melhores decisões) e software de computador que possa ajudar com essas decisões. Computadores requerem modelos matemáticos que capturem o problema, e esses modelos precisam entender o problema, expresso em inglês, mas usando termos que capturam o problema de uma forma que possa ser traduzida para a linguagem dos modelos.

Uma característica crítica desse processo é o uso de uma estratégia geral de modelagem que chamamos de estrutura universal de modelagem. É nossa afirmação, baseada em décadas de trabalho em uma classe muito ampla de problemas de muitos cenários, que essa estrutura de modelagem pode capturar as características de qualquer problema em que computadores possam ser úteis. Essa é uma ressalva importante, já que existem problemas com métricas mal definidas, ou inexistentes: Casar-se com alguém? Que área escolher como graduação na faculdade? Que restaurante escolher ao hospedar um visitante?

A estrutura universal de modelagem formaliza escolhas como como tomar uma decisão (chamada de política), o que então ajuda a responder qual informação é necessária. A UMF também fornece uma base para comparar políticas que não precisam de uma previsão (comprar na baixa, vender na alta em finanças, políticas de estoque de repor-até-o-nível) contra aquelas que precisam, e para avaliar o valor de previsões mais precisas.

Usar computadores para tomar decisões abre a porta para o uso de "inteligência artificial", que é um termo amplamente usado na imprensa pública sem ser adequadamente definido. Cobrimos os sete níveis de inteligência artificial, que diferenciam claramente entre ferramentas baseadas em aprendizado de máquina, como grandes modelos de linguagem (tais como o ChatGPT), e ferramentas para tomar decisões, como a otimização determinística (nível 5) e problemas de decisão sequencial (nível 6).

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Quais são os três estágios da automação de decisões?</li>
<li>Quais são as três perguntas apresentadas no Estágio 1 de enquadramento do problema? Ilustre-as em um cenário de problema de sua escolha.</li>
<li>Quais são os cinco elementos da estrutura universal de modelagem?</li>
<li>Qual é a definição de uma decisão? Dê três exemplos em diferentes cenários que você encontra em suas atividades pessoais.</li>
<li>Descreva brevemente os sete níveis de inteligência artificial, divididos nas quatro classes diferentes conforme organizado no capítulo.</li>
<li>Quais são as três classes de modelos estatísticos?</li>
<li>Qual é a diferença entre um modelo base e um modelo de horizonte de previsão? Use o contexto de fazer uma longa viagem de carro usando o Google Maps para ilustrar ambos.</li>
<li>Quais são os seis estágios da modelagem?</li>
</ol>

**Questões de modelagem**

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Dê um exemplo de um problema de decisão sequencial que você encontra em suas atividades diárias e faça o seguinte:
  <ol type="a">
    <li>Identifique pelo menos uma métrica de desempenho que você gostaria de melhorar.</li>
    <li>Forneça pelo menos uma decisão que afete a métrica de desempenho.</li>
    <li>Descreva quaisquer incertezas que possam interferir no desempenho da decisão quando ela for implementada.</li>
  </ol>
</li>
<li>Dê três exemplos de problemas envolvendo recursos físicos e identifique as decisões que surgem em cada cenário.</li>
<li>Você vai jogar 15 partidas de jogo-da-velha, onde o objetivo é forçar o jogador adversário a formar três em linha (momento em que você vence). Nenhum de vocês dois já jogou esse jogo antes, e você quer capturar como o outro jogador aprende sua estratégia de jogo. Lembre-se de que o jogo-da-velha geralmente termina em empate, então será necessário fazer seu oponente acreditar que você vai cometer um erro. Responda às perguntas abaixo em inglês (não é permitido usar matemática).
  <ol type="a">
    <li>Projete uma métrica de desempenho que capture os resultados das 15 partidas.</li>
    <li>Quais decisões você precisa tomar?</li>
    <li>Quais são as incertezas?</li>
    <li>Descreva a informação que você teria após jogar várias partidas que gostaria de ter para projetar uma política.</li>
  </ol>
</li>
</ol>

{% endraw %}
