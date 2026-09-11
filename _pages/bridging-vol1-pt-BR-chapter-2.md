---
layout: book
title: "Capítulo 2: Aplicações"
permalink: /bridging-vol1/pt-BR/chapter-2/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: 021eb6b21e0b2ae0
---


{% raw %}
<p class="book-byline"><em>Conectando Problemas de Decisão, Volume I — Enquadrando o Problema</em> &middot; Warren B. Powell</p>

O primeiro passo para melhorar qualquer produto, processo ou serviço é fornecer uma descrição básica e, em seguida, identificar possíveis métricas de desempenho, tipos de decisões e fontes de incerteza. Vamos ilustrar esses primeiros passos usando uma variedade de contextos de aplicação. Em seguida, vamos recorrer a essas aplicações ao longo do restante do livro para ilustrar diferentes dispositivos de modelagem.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PowellApplications.png" alt="Uma ilustração dos muitos cenários para a tomada de decisões." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 2.1.</span> Uma ilustração dos muitos cenários para a tomada de decisões.</figcaption>
</figure>

A beleza dos problemas de decisão sequencial é que eles surgem em praticamente todas as atividades que envolvem pessoas. A Figura 2.1 é um retrato de alguns dos cenários de problemas que descrevem as atividades do autor, e que serviram como fundamento motivacional para o trabalho apresentado neste livro. Cada imagem representa um conjunto de problemas de decisão. Isso contrasta fortemente com classes de problemas como a programação linear, inteira e não linear, que são ferramentas importantes e poderosas, mas que resolvem apenas um subconjunto muito restrito de problemas de decisão.

Notamos que há uma tendência natural de focar na gestão de recursos físicos, uma vez que é isso que vemos. Certamente, a gestão de recursos físicos apresenta muitas oportunidades para a tomada de melhores decisões, mas existem outras decisões que tratam diretamente da coleta de informações, além do gerenciamento dos fluxos, muitas vezes significativos, de dinheiro necessários para sustentar essas operações.

Neste capítulo, vamos revisar os seguintes cenários de problemas:

- Planejamento de estoque
- Gestão de demanda
- Gestão de energia elétrica
- Gestão de receita hoteleira
- Aplicações na área de saúde
- Eleições presidenciais
- Gestão de frotas de caminhões
- Gestão de caixa de fundos mútuos
- Financiamento de cadeia de suprimentos
- Tentativa e erro inteligente (diversos cenários)

Muitos desses casos podem ser descritos como domínios de meta-problemas, pois contêm subáreas que, por si só, representam grandes campos da atividade humana. Nosso objetivo é criar um conjunto diversificado de aplicações, em parte para ilustrar a variedade de problemas que se enquadram sob o guarda-chuva dos problemas de decisão sequencial, e em parte para fornecer um conjunto diversificado de contextos de decisão que motivarão o arcabouço de modelagem que apresentaremos no restante do livro.

Nesta etapa, ainda não estamos prontos para descrever modelos completos – isso virá no Volume II. Para cada aplicação, vamos oferecer respostas às três perguntas do processo de enquadramento, reconhecendo que se trata apenas de uma amostra para fazer o leitor começar a pensar sobre o processo.

## Começando – enquadrando o problema

É muito comum discutir problemas complexos usando terminologia genérica. A Figura 2.2 (preparada pelo ChatGPT) responde à seguinte pergunta:

> *Prepare uma discussão de 1 página sobre como uma empresa deve reagir a um aumento repentino de tarifas que interromperá sua cadeia de suprimentos.*

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTrespondtoTariff.png" alt="A versão do ChatGPT de como uma cadeia de suprimentos deve reagir a aumentos de tarifas.">
  <figcaption><span class="fig-num">Figura 2.2.</span> A versão do ChatGPT de como uma cadeia de suprimentos deve reagir a aumentos de tarifas.</figcaption>
</figure>

O problema com essas discussões genéricas é que elas nunca fornecem um caminho claro para melhorar o processo. Tudo o que é dito na discussão é provavelmente verdadeiro, mas falta ações específicas que possam ser tomadas para resolver um problema. A resposta fornecida pelo ChatGPT (em 2025) reflete o tipo de conversa genérica amplamente encontrada em livros de negócios, que jamais poderia servir de base para um modelo formal.

Este capítulo ilustra a primeira etapa do enquadramento do problema, que consiste em quatro elementos:

- **A narrativa:** Trata-se de uma breve discussão que descreve um problema no estilo que poderia ser usado por alguém dentro do domínio do problema.
- **Métricas de desempenho:** Fornecemos uma lista de métricas de desempenho que precisarão ser priorizadas (isso é abordado no Capítulo 3).
- **Decisões:** Em seguida, fornecemos uma lista de decisões que impactam uma ou mais das métricas. As decisões são abordadas no Capítulo 4.
- **Incertezas:** Por fim, descrevemos as formas de incerteza que podem distorcer o efeito de uma decisão quando implementada, ou à medida que o processo avança no tempo. As incertezas são abordadas no Capítulo 5.

Neste ponto, ainda não vamos tentar descrever como poderíamos resolver o problema (ou seja, tomar as decisões). Para isso, precisamos de outros materiais que serão desenvolvidos mais adiante. O objetivo nesta etapa é usar uma variedade de cenários de problemas para ilustrar o processo de identificação de métricas, decisões e incertezas de forma geral. Identificar esses três elementos é a chave para resolver qualquer problema de decisão, portanto precisamos desenvolver primeiro o hábito de fazê-lo.

## Capturando interações {#capturinginteractions}

Embora a identificação de métricas, decisões e incertezas seja um ponto de partida valioso, também é importante entender como elas interagem.

- **O efeito das decisões sobre as métricas** – Cada decisão deve ter algum impacto sobre pelo menos uma métrica, e cada métrica deve ser afetada por pelo menos uma decisão.
- **Incerteza nas métricas de desempenho dadas as decisões** – Podemos querer o caminho mais curto, mas o tempo de viagem depende do congestionamento; podemos querer escolher um medicamento que reduza uma infecção, mas um paciente pode não responder a um determinado medicamento; um investidor não consegue prever o retorno exato ao comprar uma ação.
- **A incerteza pode restringir quais decisões podemos tomar** – Uma empresa de transporte rodoviário precisa movimentar cargas, mas estas são solicitadas de forma aleatória; um hotel pode reservar quartos para viajantes a negócios que podem ou não fazer reservas; uma concessionária de energia pode contar com energia eólica, mas a quantidade de energia que pode ser gerada é incerta.
- **A incerteza altera a dinâmica de como o sistema evolui ao longo do tempo** – A doença em uma população pode se espalhar de forma incerta; a economia pode evoluir de forma incerta, afetando o valor do dólar; o comportamento incerto dos concorrentes pode reduzir as vendas.

### Impacto das decisões sobre as métricas

Um exercício útil é criar uma planilha na qual diferentes decisões são listadas à esquerda e as métricas são listadas na parte superior. Em seguida, usando puramente o julgamento, insira uma das opções a seguir em cada célula para capturar o que você acredita descrever o impacto de cada decisão sobre cada métrica:

- **H** – A decisão tem alto impacto sobre a métrica.
- **M** – A decisão tem impacto médio sobre a métrica.
- **L** – A decisão tem baixo impacto sobre a métrica.
- **N** – A decisão não tem impacto sobre a métrica.

A Tabela 2.1 ilustra como isso pode se apresentar para um pequeno problema de estoque. A planilha pode ser baixada em [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.1.</span> Matriz de interação entre decisões e métricas para um problema de estoque com pequenos tempos de espera.</caption>
<thead>
<tr><th>Decisões \ Métricas</th><th>Receita de vendas</th><th>Custos do produto</th><th>Custos de manutenção de estoque</th><th>Faltas de estoque</th></tr>
</thead>
<tbody>
<tr><td>Quando/quanto pedir</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Comprar proteção cambial?</td><td class="hml-n">N</td><td class="hml-l">L</td><td></td><td class="hml-n">N</td></tr>
<tr><td>Desconto</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Divulgar o produto nas redes sociais</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

Comece listando as métricas da esquerda para a direita em ordem de importância. Em seguida, vamos usar a matriz para identificar as decisões mais importantes, e as métricas mais impactadas pelas decisões que você listou.

A matriz de interação pode ser usada de duas maneiras:

1. Liste todas as decisões e, em seguida, avalie o impacto de cada decisão sobre cada métrica. A partir disso, identifique as decisões que parecem ter o maior impacto sobre as métricas mais importantes.
2. Para problemas complexos, listar todas as decisões pode ser impraticável. Em vez disso, use o conjunto de métricas para ajudar a identificar as decisões mais relevantes para o problema. Depois, retorne ao item (1) para ajudar a priorizar as decisões mais importantes.

O exercício de preencher tabelas como esta pode ajudar a orientar o processo de compreensão do papel que as decisões desempenham na melhoria do desempenho, antes de avançar para a etapa cara e complexa de coletar dados e construir um modelo computacional.

### Impacto da incerteza dada a decisão

Imagine que tomamos uma decisão (o que significa que ela está fixada). Precisamos entender as formas de incerteza que afetam as métricas produzidas pela decisão. Para o nosso problema simples de estoque (com tempo de espera curto), poderíamos obter a matriz apresentada na tabela 2.2.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.2.</span> Matriz de interação entre incertezas e métricas dada uma decisão, para um problema de estoque com pequenos tempos de espera.</caption>
<thead>
<tr><th>Incerteza \ Métricas</th><th>Receita de vendas</th><th>Custos unitários</th><th>Custos de manutenção de estoque</th><th>Faltas de estoque</th></tr>
</thead>
<tbody>
<tr><td>Vendas (unidades vendidas)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Tempos de espera</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Erros de previsão</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Perdas de estoque</td><td class="hml-m">M</td><td class="hml-n">N</td><td></td><td class="hml-n">N</td></tr>
</tbody>
</table>
</div>

Modelar a incerteza significa simplesmente compreender informações que podem surgir no futuro e que ainda não conhecemos. Essa observação simples é frequentemente negligenciada nas discussões sobre incerteza, que podem ficar soterradas em matemática sofisticada ("modelagem estocástica") e na quantificação de risco (que poucos entendem).

Assim como com as decisões, podemos começar listando todas as fontes de incerteza que conseguirmos imaginar e, em seguida, usar a matriz de interação para priorizar as mais importantes. Alternativamente, podemos usar nosso conjunto de métricas para ajudar a orientar a identificação das fontes de incerteza mais importantes.

### Impacto da incerteza sobre as decisões

<figure class="book-figure" style="float:right; max-width: 221px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/AssignmentProblemsimple.png" alt="Um problema simples de atribuição.">
  <figcaption><span class="fig-num">Figura 2.3.</span> Um problema simples de atribuição.</figcaption>
</figure>

O cenário mais comum em que a incerteza impacta quais decisões você tem permissão para tomar surge no contexto de problemas de alocação de recursos, nos quais estamos gerenciando algum recurso (pessoas, máquinas, suprimentos de produtos, medicamentos) para atender tarefas (trabalhos, pacientes, clientes). Na figura 2.3, estamos ilustrando a atribuição de caminhões (com motoristas) para movimentar cargas de frete. A principal fonte de incerteza é o fluxo de cargas solicitadas pelos embarcadores para serem transportadas, mas isso poderia ser qualquer tarefa. Poderíamos atribuir um motorista a uma carga que não é atraente em termos de lucratividade, mas que o mantém ocupado por vários dias, impedindo que ele seja utilizado em uma carga melhor que possa ser solicitada mais tarde no mesmo dia.

O fluxo de solicitações de clientes é uma importante fonte de incerteza que surge em:

- Gestão da cadeia de suprimentos (demanda por produtos).
- Saúde (pacientes que precisam de tratamento).
- Hotéis (solicitações de quartos para aluguel).
- Energia (a demanda por eletricidade ou gás para aquecimento).
- Finanças (depósitos e retiradas de dinheiro).

Uma característica importante do fluxo de demandas que precisam ser atendidas é como essas demandas se tornam conhecidas pelo sistema. Algumas variações incluem:

- Sem aviso prévio, serviço imediato (vendas de qualquer produto de varejo).
- Sem aviso prévio, backlog possível (compras on-line).
- Solicitação prévia, compromisso imediato exigido (reserva de quartos de hotel).
- Compromisso prévio com termos de cancelamento (compras caras, como aeronaves).

Também pode haver incerteza na disponibilidade de recursos usados para atender os clientes:

- Médicos, enfermeiros podem ficar doentes.
- Máquinas podem falhar.
- Um motorista de caminhão pode recusar uma atribuição para transportar uma carga.
- Um investimento pode desvalorizar.

### Incerteza na dinâmica do sistema

O que sabemos em um determinado ponto no tempo pode mudar conforme avançamos no tempo, e, se mudar, tipicamente estamos incertos sobre como está mudando. Alguns exemplos de incerteza na evolução do sistema incluem:

- Mudanças em custos, preços e outras métricas de desempenho.
- Mudanças no status de pessoas, equipamentos e instalações ao longo do tempo. Pessoas podem se demitir ou ficar doentes, equipamentos podem quebrar, uma instalação pode ser danificada em uma tempestade.
- Mudanças nas atitudes do mercado, na presença de doenças em uma população, em como as pessoas podem votar em um candidato.

É importante reconhecer que a incerteza sobre como o sistema evolui ao longo do tempo pode ser dividida em duas categorias:

- Incerteza na *função* que descreve a evolução do sistema. Alguns se referem a isso como "incerteza de modelo". Se estamos gerenciando a distribuição de vacinas, podemos usar diferentes modelos de como a doença se propaga pelo sistema. Quando estamos planejando evacuações para um furacão, podemos escolher entre diferentes modelos de como a tempestade vai progredir.
- Incerteza nos *parâmetros* que determinam o comportamento da função.

### Incerteza em previsões

Existem muitos problemas (mas não todos) em que tomar uma decisão agora exige projetar o que pode acontecer no futuro. É claro que o futuro é quase sempre incerto, mas é nossa escolha usar uma "melhor estimativa" do que pode acontecer no futuro, ou modelar explicitamente essa incerteza para nos ajudar a tomar uma decisão agora. Voltamos a essa questão no Capítulo 4, quando discutimos formas de tomar decisões.

### Comentários

A incerteza é, de longe, a questão mais sutil ao entender um problema de decisão. Frequentemente, as pessoas têm uma percepção intuitiva de que um tipo de incerteza é importante; esta seção ajuda a refinar como uma forma de incerteza realmente impacta um problema de decisão.

## Planejamento de estoque {#inventoryplanning}

### Narrativa

Um dos problemas mais amplamente estudados em pesquisa operacional (assim como em otimização estocástica) é o problema de estoque, que é tipicamente formulado como determinar quando fazer um pedido de reabastecimento e quão grande esse pedido deve ser. A descrição clássica de livro-texto de um problema de reabastecimento de estoque é apresentada na figura 2.4, que mostra o aumento nos estoques quando um novo produto chega, seguido pela depleção conforme o produto é consumido. Uma ruptura de estoque, em que o estoque cai a zero, é mostrada.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SimpleInventory.jpg" alt="Illustration of a classical inventory problem with short lead times." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 2.4.</span> Ilustração de um problema clássico de estoque com prazos de entrega curtos.</figcaption>
</figure>

Uma versão mais realista de um problema de estoque é ilustrada na figura 2.5, que retrata um problema de estoque que pode surgir em um cenário em que o produto vem de um local distante (como da China para a costa leste dos EUA). Podemos ter que esperar de 6 a 8 semanas, mas atrasos climáticos podem estender esse prazo ainda mais. O transporte de longa distância normalmente envolve movimento por navios porta-contêineres para deslocamentos porto a porto, ferrovia (comum dentro dos EUA) e depois caminhão.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ComplexInventory.jpg" alt="Illustration of an inventory problem with long lead times.">
  <figcaption><span class="fig-num">Figura 2.5.</span> Ilustração de um problema de estoque com prazos de entrega longos.</figcaption>
</figure>

O planejamento de estoques precisa ser coordenado com estratégias de gestão de demanda, que podem ser influenciadas por meio de precificação, descontos, promoções e marketing. A gestão de estoque precisa lidar com uma série de fontes de incerteza, desde a variabilidade usual do dia a dia na demanda, até mudanças de mercado devido ao comportamento de concorrentes, novas tecnologias, e tanto a perda de fornecedores quanto o surgimento de novas fontes de fornecimento. Além disso, pode haver variações significativas nos tempos de transporte devido ao clima, falhas mecânicas e ações trabalhistas nos portos. Atrasos excessivos podem ser gerenciados usando modais rápidos, como frete aéreo, como alternativa ao transporte em contêineres, e transporte rodoviário com carga completa como alternativa à ferrovia.

### Métricas

Separamos as métricas entre "métricas básicas", que são capturadas por meio de relatórios de rotina, e "métricas de risco" que consideram especificamente eventos significativos (tipicamente negativos) que, no julgamento da gestão, não são adequadamente capturados nas métricas básicas.

- **Métricas básicas**
  - Custos de manutenção de estoque, que cobrem uma gama de itens, incluindo o custo do capital imobilizado em estoque, custos de armazenagem (aquecimento/ar-condicionado, mão de obra de manuseio, despesas gerais do armazém e equipamentos), custos de seguro, custo por deterioração, roubo, obsolescência.
  - Custos de transporte, incluindo embalagem, transporte e seguro.
  - Receita proveniente do atendimento à demanda, que precisa refletir qualquer desconto.
  - Métricas de acurácia de previsão.
  - Métricas de atendimento ao cliente, como demanda atrasada ou perdida que não é atendida por falta de estoque, e devoluções de produtos (por exemplo, devido a problemas de qualidade).
  - Custo de promoções, cupons, marketing e publicidade.
  - Utilização de instalações (estão cheias?), pessoas e equipamentos.
  - Questões de mão de obra, incluindo produtividade da mão de obra, necessidade de horas extras, custos de contratação e demissões.
- **Métricas de risco**
  - Riscos cambiais quando o produto é comprado de outro país em uma moeda diferente.
  - Rupturas de estoque significativas que forçam os clientes a produtos concorrentes.
  - Roubo, ataques cibernéticos.
  - Interrupções significativas (interrupções em um fornecedor, danos a instalações) que impedem a entrega aos clientes ou o emprego.

### Decisões

Ajuda organizar as decisões com base em se estamos resolvendo um único problema de estoque, ou abordando questões em nível de rede. Modelos de estoque de livros-texto tipicamente se concentram em decisões operacionais, como quando fazer um pedido e em qual quantidade. No entanto, a perspectiva muda quando temos prazos de entrega longos, em que uma decisão agora impacta o sistema meses no futuro.

A lista de decisões relevantes para o planejamento de estoque é bastante longa. Na [seção de interações abaixo](#inventorydecisioninteractions), vamos usar uma ferramenta que chamamos de "matrizes de interação" para identificar as decisões mais importantes.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.3.</span> Decisões operacionais de estoque e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Se deve observar/verificar o estoque</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>De qual fornecedor, dentre o conjunto de fornecedores disponíveis, fazer o pedido (se houver múltiplos fornecedores)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Quando fazer um pedido de reabastecimento.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Quanto pedir.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Como embalá-lo (contêiner marítimo, meio contêiner, paletes, caixas).</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Como financiar o pedido (transferência de dinheiro, empréstimo bancário, ...)</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>A escolha das modalidades de transporte para produtos do exterior até instalações de armazenamento intermediárias</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>A escolha das modalidades de transporte para distribuição doméstica aos clientes</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.4.</span> Decisões táticas de estoque e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Se deve comprar hedges cambiais para produtos do exterior.</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Descontos/promoções (para reduzir estoque)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Precificação de produtos.</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Marketing/exposições (espaço em prateleira, exposição em ponta de gôndola, publicidade (várias formas))</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Realização de testes de mercado para características, design, ...</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Elaborar e implementar campanha de marketing</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Escolha do fornecedor (para cada material ou componente), incluindo se deve haver múltiplos fornecedores. Isso determina os possíveis fornecedores.</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Manutenção de equipamentos (aumenta o tempo de inatividade programado, diminui o tempo de inatividade não programado)</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.5.</span> Decisões estratégicas de estoque e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Contratos com plataformas de visibilidade de estoque (onde está minha remessa)?</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Escolha da metodologia de previsão de demanda (métodos estatísticos, envolvimento de diferentes pessoas em toda a organização).</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Design do produto (que determina os materiais e componentes necessários)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Identificação de mercado (para quem estamos vendendo)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Quanto de conectividade (compartilhamento de informações) buscar com parceiros da cadeia de suprimentos de fabricação</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

#### Problema de estoque único

Essas decisões são tomadas em diferentes escalas de tempo: operacional (horária, diária, semanal), tática (mensal) e estratégica (trimestral, anual).

- **Operacional** - São decisões que podem ser tomadas em tempo real, mas tipicamente são tomadas diária ou semanalmente (tabela 2.3).
- **Tática** - Decisões tomadas mensalmente (tabela 2.4).
- **Estratégica** - Decisões tomadas trimestralmente ou anualmente (tabela 2.5).

#### Design da cadeia de suprimentos

Existem decisões relacionadas ao design de redes de cadeia de suprimentos que atravessam muitas (dezenas a milhares) de decisões individuais de estoque. Essas são decisões tipicamente tomadas em escalas de tempo mais longas. A tabela 2.6 fornece alguns exemplos de decisões em nível de rede para o design da cadeia de suprimentos.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.6.</span> Decisões de design da cadeia de suprimentos em nível de rede e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Onde localizar estoques de segurança e como rebalanceá-los</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Fechamento de instalações existentes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Onde comprar/alugar/construir/expandir instalações de manufatura</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Quais instalações de manufatura fechar/vender, encerrar contratos de aluguel</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Onde comprar/alugar/construir/expandir armazéns e centros de distribuição</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Se deve introduzir automação de manuseio de materiais em CDs e armazéns</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Investimento em tecnologias de informação para compartilhamento de informações e coordenação</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Providenciar linha de crédito significativa ou outra fonte de financiamento de reserva</td><td></td><td>&#10003;</td><td></td></tr>
</tbody>
</table>
</div>

### Incertezas

Incertezas também ocorrem em diferentes escalas de tempo. Incluímos uma categoria especial para grandes disrupções que podem ocorrer, mas não de forma regular.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.7.</span> Incertezas de estoque de hora em hora a diárias e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Variações dia a dia nas demandas dos clientes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erros na medição de estoques</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>"Encolhimento" de estoque (roubo, perda, deterioração, quebra, ...)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Rendimento do carregamento (quantos itens/quanto material atendeu às especificações)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Atrasos de transporte devido ao clima, falhas de equipamentos</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erros de previsão</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Custo de commodities brutas</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Custo de insumos de fornecedores</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Interrupções de energia (eletricidade, combustíveis)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erros de comunicação, erros de execução humana</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Variações dia a dia no preço das ações da empresa</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Fraude financeira em transações individuais</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Disponibilidade dia a dia de capacidade disponível para alocação</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.8.</span> Incertezas de estoque semanais e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Mudanças na demanda média devido a mudanças tecnológicas, comportamento de concorrentes, mudanças de mercado</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças no preço de venda de um produto (afeta demanda e fluxos de lucro)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Mudanças nos preços de commodities</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Como o mercado responde a mudanças de preços</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Atrasos devido a greves em portos, pátios ferroviários, pontos de cruzamento internacional</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças no comportamento de grandes clientes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças de atitudes em Wall St (por exemplo, de "crescimento" para "estável" para "recessão")</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.9.</span> Incertezas de estoque mensais a anuais e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Surgimento de novas tecnologias de informação (AWS, IA, plataformas de visibilidade)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Surgimento de novas tecnologias de manufatura/manuseio de materiais (por exemplo, robótica)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Surgimento de novos concorrentes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças nos padrões populacionais (por exemplo, crescimento da imigração)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças nos padrões de demanda (aumento da demanda por produtos premium)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Tratados que regem o comércio</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Mudanças na disponibilidade de mão de obra</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.10.</span> Incertezas de estoque de grandes disrupções e qual categoria de recurso cada uma afeta principalmente.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financeiro</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Surgimento de novas tecnologias de informação (AWS, IA, plataformas de visibilidade)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Surgimento de novas tecnologias de manufatura/manuseio de materiais (por exemplo, robótica)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Surgimento de novos concorrentes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças nos padrões populacionais (por exemplo, crescimento da imigração)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Mudanças nos padrões de demanda (aumento da demanda por produtos premium)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Tratados que regem o comércio</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Mudanças na disponibilidade de mão de obra</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

*(Nota: a figura de origem da tabela 2.10 é renderizada de forma idêntica à tabela 2.9 — sinalizado para você verificar em relação ao manuscrito; o conteúdo da linha de "grandes disrupções" pode precisar ser substituído por um arquivo de origem diferente.)*

Identificar as diferentes fontes de incerteza é uma área particularmente rica para problemas complexos como cadeias de suprimentos. Não apenas há uma ampla gama de incertezas, elas também surgem em diferentes estilos, como volatilidade de granularidade fina, mudanças de regime, picos, surtos e eventos raros. Discutimos esses comportamentos em mais detalhes no Capítulo 5.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.11.</span> Matriz de interação para decisões e métricas para um problema de estoque com longos prazos de entrega.</caption>
<thead>
<tr><th>Decisões \ Métricas</th><th>Receita de vendas</th><th>Custos do produto</th><th>Custos de manutenção de estoque</th><th>Rupturas de estoque</th><th>Giro de estoque</th><th>Margem operacional</th><th>Crescimento de vendas</th></tr>
</thead>
<tbody>
<tr><td>Quando/quanto pedir</td><td class="hml-h">A</td><td class="hml-h">A</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">B</td></tr>
<tr><td>Comprar hedge de moeda?</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-n">N</td></tr>
<tr><td>Desconto</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Divulgar produto em mídias sociais</td><td class="hml-h">A</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-m">M</td></tr>
<tr><td>Escolha do fornecedor</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td></tr>
<tr><td>Precificação</td><td class="hml-h">A</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Hedges de moeda?</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Sensores de estoque</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Usar plataformas de visibilidade para rastrear produto de entrada?</td><td></td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Design do produto</td><td class="hml-m">M</td><td class="hml-h">A</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">A</td></tr>
</tbody>
</table>
</div>

### Interações {#inventorydecisioninteractions}

Um exercício poderoso que ajuda a desenvolver uma compreensão dos diferentes elementos dos problemas de decisão é avaliar subjetivamente a força de diferentes tipos de interações, uma ideia que introduzimos primeiro na [seção de captura de interações acima](#capturinginteractions). Começamos descrevendo as interações entre decisões e métricas para um problema de estoque com longos prazos de entrega, mostrado na tabela 2.11. Enfatizamos que preencher essa matriz é completamente subjetivo, já que isso nos ajuda a identificar as decisões mais importantes, bem como as métricas que temos maior chance de melhorar.

O que estamos fazendo é substituir o que muitas vezes é uma etapa completamente invisível de escolher em quais decisões focar, por um processo que torna essa escolha explícita, ainda que seja feita subjetivamente.

A matriz de interação para incertezas e métricas dada uma decisão pode ser semelhante à apresentada na tabela 2.12. Aqui, fazemos um ponto de manter uma decisão fixa para evitar misturar o efeito que a incerteza tem sobre qual decisão tomamos.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabela 2.12.</span> Matriz de interação para incertezas e métricas dada uma decisão para um problema de estoque com longos prazos de entrega.</caption>
<thead>
<tr><th>Incerteza \ Métricas</th><th>Receita de vendas</th><th>Custos unitários</th><th>Custos de manutenção de estoque</th><th>Faltas de estoque</th><th>Giros de estoque</th><th>Margem operacional</th><th>Crescimento de vendas</th></tr>
</thead>
<tbody>
<tr><td>Vendas (unidades vendidas)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Prazos de entrega</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Erros de previsão</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-l">L</td></tr>
<tr><td>Perdas de estoque</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Mudanças nos preços de commodities</td><td class="hml-n">N</td><td class="hml-h">H</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">L</td></tr>
<tr><td>Resposta do mercado ao preço</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Paralisações de trabalho</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Comportamento de precificação dos concorrentes</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

## Gestão de demanda – venda de móveis {#demandmanagementfurniture}

### Narrativa

O outro lado da gestão do fluxo de produtos ao longo das diferentes etapas de fabricação e distribuição é o desafio de gerenciar a demanda. Os maiores produtores de móveis são a China (de longe o maior), os Estados Unidos (principalmente para consumo doméstico), a Alemanha (principalmente para a Europa), a Itália (móveis de alto padrão) e a Polônia (para móveis de menor custo). Os vendedores de móveis precisam lidar com longos prazos de entrega, demanda altamente sazonal e customização, além de um mercado competitivo. Embora utilizem todas as ferramentas usuais para gerenciar o fluxo do produto físico, é importante empregar diversas estratégias para gerenciar a demanda e ajudar a equilibrar a oferta com o mercado.

Algumas das questões relacionadas à demanda que os vendedores de móveis devem enfrentar incluem:

- Demanda altamente variável, devido em parte a variações no número de pessoas se mudando para novas casas.
- Preferências dos clientes em evolução, à medida que respondem a tendências de design e mudanças de estilo, além de novos produtos e materiais.
- Sensibilidade a preços, que reflete tanto o estado da economia quanto a concorrência.
- Resposta do mercado à publicidade e à visibilidade nas redes sociais.
- Estratégias de otimização para mecanismos de busca (SEO).
- Parcerias com influenciadores de decoração de interiores que podem exibir produtos.
- A capacidade de oferecer descontos e promoções para reduzir estoques excedentes.

### Métricas

As métricas sempre dependem da perspectiva de quem está sendo avaliado, mas algumas que esperaríamos nesse contexto poderiam ser:

- Vendas (em unidades e receita total).
- Receita líquida – Vendas, menos custo dos produtos vendidos e publicidade.
- Faltas de estoque, atrasos no cumprimento de pedidos.
- Tráfego web – Existem diversas métricas usadas para avaliar portais de e-commerce, como visitas, taxas de cliques (click-through rates), taxas de rejeição (bounce rates), tempo no site e conversões.
- Número de curtidas, compartilhamentos, comentários, além de menções à marca e análise de sentimento em discussões online.
- Engajamento – Uso de prévias em realidade virtual.

### Decisões

Estamos imaginando que somos o gerente de uma loja de móveis:

- Quais itens de móveis manter em estoque.
- Precificação.
- Promoções e descontos – por exemplo, desconto para um conjunto de móveis.
- Quais canais de marketing utilizar – redes sociais, TV, mala direta impressa, marketing dentro da loja.
- Orçamentos de marketing para cada canal.
- Testes A/B de design de páginas web.
- Realização de pesquisas de mercado – oferecendo pacotes específicos em um subconjunto de lojas.
- Decisões de contratação de pessoal (quantos, quais habilidades).

### Incertezas

Alguns exemplos de incertezas que podem surgir na venda de móveis incluem:

- Desvios entre a demanda real e a prevista para móveis em diferentes níveis de agregação.
- Prazos de entrega do fornecedor.
- Problemas de qualidade do produto.
- Resposta do mercado a preço, descontos e promoções.
- Disposição do cliente em substituir produtos por versões de qualidade superior ou inferior.
- Variações nas preferências dos consumidores.
- Variações no tráfego web e nas taxas de conversão.

## Gestão da rede elétrica

### Narrativa

Sistemas de energia é um termo abrangente que engloba a vasta rede que fornece a energia que sustenta a sociedade moderna. Vamos concentrar nossa atenção no fluxo de eletricidade, que inclui a geração de energia proveniente de diferentes fontes, principalmente gás (mas ainda algum carvão e petróleo), energia nuclear e uma presença crescente de energia eólica, solar e hidrelétrica.

A espinha dorsal de qualquer sistema elétrico é a rede elétrica, que consiste em linhas de transmissão de alta capacidade que transportam energia por longas distâncias em altas tensões, de 69kv (ou seja, 69.000 volts) até 345kv, com linhas de ultra-alta tensão chegando a 765kv. A energia é então enviada para empresas e residências usando redes de distribuição locais com tensões entre 4kv e 14kv.

A energia vem de uma "frota" de geradores de energia que pode incluir usinas nucleares, a carvão, geradores a vapor e turbinas a gás, além de energia hidrelétrica (há uma forte marca do vocabulário naval devido à presença da energia nuclear). Esses geradores se diferenciam pela velocidade com que podem ser ligados ("despachados") ou desligados, e pela facilidade com que podem operar mais rápido ou mais devagar. As outras características importantes são o custo fixo e os custos operacionais. Por exemplo, a energia nuclear tem alto custo fixo e baixo custo operacional, e precisa operar continuamente, exceto durante períodos de manutenção. As turbinas a gás têm custos fixos muito menores, mas custos operacionais mais altos, e podem ser ligadas em menos de uma hora. Os geradores a vapor, por outro lado, precisam de 8 a 12 horas para aquecer e, como resultado, são tipicamente planejados com um dia de antecedência.

O crescente uso de energia eólica e solar introduziu um grau de variabilidade incontrolável ao qual as redes elétricas não estavam expostas anteriormente. A forma de lidar com essa variabilidade é através do armazenamento, que existe em diferentes formas, mas a mais visível é o armazenamento em baterias em nível de rede. Austrália e Flórida são duas regiões que investiram pesadamente em armazenamento em baterias, mas isso está começando a se tornar um investimento comum que acompanha o desenvolvimento de grandes parques solares e eólicos.

O armazenamento, no entanto, existe em outras variantes, incluindo:

- Armazenamento por bombeamento hidráulico (pumped-hydro), no qual a água é bombeada morro acima e depois utilizada sob demanda para gerar eletricidade fluindo morro abaixo.
- Armazenamento de bateria para rede (battery-to-grid), no qual as baterias de carros e residências são usadas como uma forma de armazenamento em bateria.
- Armazenamento térmico, no qual a energia é armazenada aquecendo um líquido em um grande tanque.
- Gestão de demanda (ou resposta à demanda) – Podemos "armazenar" a necessidade de eletricidade adiando atividades como o funcionamento de máquinas de lavar e secadoras ou o resfriamento de ambientes (como bibliotecas) para usar o ar frio posteriormente.

A energia é um domínio de problema particularmente rico em termos de gestão de diferentes formas de incerteza, usando diferentes tecnologias para gerar energia que exigem prazos de aviso prévio drasticamente diferentes (literalmente, de 2 segundos para variar a produção de uma turbina a gás até um ano para mudanças nos cronogramas de manutenção de usinas nucleares).

No momento em que este livro está sendo escrito, a rede elétrica tem sofrido pressão para atender às crescentes demandas do uso de ferramentas de "IA", que exigem enormes centros de computação para lidar com as demandas de cálculo de redes neurais com dezenas de bilhões de parâmetros, usando os tipos de chips especializados de empresas como a Nvidia. Há também um crescimento no uso de ar condicionado para lidar com o aumento das temperaturas, além das demandas computacionais das criptomoedas.

### Métricas

Entre o rico conjunto de métricas para geração de energia estariam incluídas:

- **O custo da eletricidade** – Esta é, sem dúvida, a métrica mais importante usada para avaliar sistemas de energia, embora isso valha para sociedades que podem assumir a disponibilidade de eletricidade 24 horas por dia. É importante distinguir entre o custo fixo de um investimento (usinas nucleares são muito diferentes de turbinas a gás e painéis solares) e os custos operacionais.
- **Cobertura de demanda/interrupções** – Existem algumas regiões do mundo que têm acesso à eletricidade apenas por uma parte de cada dia.
- **Cumprimento de metas de temperatura** – As pessoas gostam de viver em ambientes onde a temperatura permanece em uma faixa estreita. Um gestor de edifício pode enfrentar penalidades pelos períodos em que a temperatura em um apartamento fica fora de uma faixa especificada. Alguns alimentos e medicamentos precisam ser refrigerados a certas temperaturas, com penalidades quando essas condições são violadas.
- **Impacto no meio ambiente**, variando desde emissões líquidas de CO2, aquecimento da água, consumo de terra, impacto na flora e fauna locais (a lista é bastante longa).
- **Confiabilidade** – A frequência e a gravidade das interrupções.

### Decisões

As decisões no setor de energia abrangem prazos que vão de segundos (para suavizar variações de tensão) a anos, para acordos de longo prazo para compra de energia:

- Ajuste dos geradores de energia para regulação de frequência, que ocorre em intervalos de 2 segundos.
- Decisões de compra de energia (tipicamente em intervalos de 5 minutos) que podem envolver a compra de energia da rede ou a venda de energia de volta para a rede.
- Decisões de compra ou venda de energia dados os preços atuais da rede.
- Compra e armazenamento de gás, petróleo e carvão (em alguns casos, hidrogênio).
- Instalação de sensores de rede para entender o estado das linhas de transmissão.
- Acordos de compra de energia, que são contratos para comprar ou vender energia ao longo de períodos plurianuais.
- A localização, tipo e capacidade do gerador de energia, desde turbinas a gás e usinas nucleares até parques eólicos e campos solares.
- A localização, tipo e capacidade do armazenamento de energia.
- Capacidade de transmissão da rede, que controla quanta energia pode ser transmitida em um dado momento.

### Incertezas

Os sistemas de energia oferecem um conjunto excepcionalmente rico de incertezas que afetam tanto os investimentos em infraestrutura quanto a operação diária do sistema de energia.

- O clima, especialmente temperatura e umidade, afeta a demanda em uma região.
- Direção e velocidade do vento para turbinas eólicas.
- Cobertura de nuvens que pode alterar a intensidade solar.
- Falhas de geradores devido a eventos climáticos, falhas mecânicas e sabotagem.
- Preços da rede, que podem variar tanto em intervalos de 5 minutos (a frequência de atualizações dos preços da rede) quanto em intervalos de 2 segundos (para regulação de energia).
- Atividades humanas, como um jogo de futebol ou um show.
- Mudanças regulatórias que podem afetar incentivos fiscais, penalidades e restrições diretas (por exemplo, em energia eólica offshore, ou na construção de novos gasodutos).
- O custo dos equipamentos (painéis solares, turbinas eólicas, baterias, turbinas a gás e usinas nucleares) evolui continuamente ao longo do tempo.
- O surgimento de novas tecnologias, como pequenas usinas nucleares e novas tecnologias de baterias.

A ênfase em energias renováveis aumentou a visibilidade das incertezas. A Figura 2.6 mostra a produção solar em base horária, ao longo de um ano inteiro, o que comunica tanto variações sazonais, ciclos diários familiares, quanto os efeitos da cobertura de nuvens. De particular importância é a previsibilidade das diferentes formas de incerteza. Sabemos quando o sol se porá décadas no futuro, mas a cobertura de nuvens é particularmente difícil de prever mesmo em horizontes de tempo muito curtos.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Geração de energia solar por hora ao longo de um ano inteiro." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 2.6.</span> Geração de energia solar por hora ao longo de um ano inteiro.</figcaption>
</figure>

## Gestão de receita hoteleira

### Narrativa

Hotéis enfrentam a necessidade de gerenciar reservas de quartos com até um ano de antecedência, embora a maioria das reservas chegue nos últimos meses e, em alguns casos, nas últimas semanas. Com o passar do tempo, os hotéis podem aumentar as tarifas conforme o hotel se enche. Normalmente, o hotel começará oferecendo tarifas mais baixas, mas essas tarifas precisam refletir a possibilidade de o hotel encher, o que significa possivelmente recusar pessoas em viagem de negócios com uma disposição a pagar muito maior.

Há mais na gestão de hotéis do que apenas o preço cobrado por um quarto. Os hotéis podem oferecer uma variedade de serviços, desde café da manhã gratuito, acesso a academias e piscinas, até passagens para serviços locais, como pistas de esqui ou passeios turísticos.

Um canal de publicidade importante são as redes sociais, como Google e Facebook. Esses canais realizam leilões sofisticados nos quais os anunciantes precisam dar lances de forma dinâmica pelo direito de publicar links para sua página da web por um determinado período.

### Métricas

Algumas das métricas para gestão de receita hoteleira incluem:

- Receita total em cada dia de reserva, menos os custos dos serviços oferecidos.
- Valor gasto em pesquisas de anúncios na internet (Google, Facebook, …).
- Utilização de quartos.
- Clientes recusados.
- Quartos não utilizados.

### Decisões

As decisões que podem ser tomadas por um gerente de hotel geralmente incluem:

- Quanto cobrar por um quarto $\tau$ dias no futuro.
- Em quais canais de e-commerce anunciar.
- Quanto dar de lance para que seus anúncios sejam publicados em cada canal de e-commerce.
- Quais serviços oferecer a diferentes tarifas.
- Como projetar a página da web.

### Incertezas

Os gerentes de hotel precisam enfrentar diversas fontes de incerteza:

- Total de reservas em cada dia para uma determinada data de estadia.
- A taxa de aceitação de um quarto dado o preço e as ofertas de serviços.
- Com que frequência um lance para anunciar é aceito, dado o tamanho do lance (ou a política de lances).
- A taxa de sucesso para clientes que veem um design de página da web.

## Aplicações em saúde

Saúde é um tópico massivo que literalmente toca todo ser humano. Temos um forte incentivo para tomar decisões que mantenham ou melhorem nossa saúde, ao mesmo tempo em que permanecemos dentro de orçamentos. Os tópicos abaixo são apenas uma pequena amostra do rico conjunto de problemas de decisão que surgem neste contexto.

### Gestão do diabetes tipo 2

#### Narrativa

Aproximadamente 10 por cento da população global tem diabetes tipo 2, que reflete uma incapacidade de controlar os níveis de açúcar (glicose) no sangue. O diabetes tipo 2 surge quando o pâncreas não produz insulina suficiente, ou quando o corpo se torna resistente à insulina. A incapacidade de controlar os níveis elevados resultantes de açúcar no sangue pode produzir uma série de condições de saúde, incluindo insuficiência cardíaca e renal, danos aos vasos sanguíneos nos olhos que podem levar a glaucoma e cegueira, problemas nos pés decorrentes de má circulação (às vezes exigindo amputação), e aumento da incidência de demência.

Picos de curto prazo no açúcar no sangue (conhecidos como hiperglicemia), que podem ocorrer pouco depois de comer certos tipos de alimentos, podem produzir visão turva, dores de cabeça, fadiga e dificuldade de concentração. Quedas no açúcar no sangue (hipoglicemia) podem produzir tontura, frequência cardíaca acelerada, desmaios, convulsões e até mesmo coma.

O diabetes, portanto, é uma doença que precisa ser administrada tanto no longo prazo quanto no curto prazo. O açúcar no sangue elevado por longos períodos de tempo pode produzir danos permanentes aos órgãos, enquanto variações de curto prazo podem criar condições médicas que exigem tratamento imediato.

#### Métricas

Como na maioria das condições médicas, várias métricas capturam o estado do paciente, mas há outras.

- Açúcar no sangue, medido em mg/dL (faixa típica é 70-130), ou mmol/L (faixa típica 3,9-7,2), que é uma medição instantânea frequentemente tomada após as refeições.
- Açúcar no sangue em jejum – Este é o nível de açúcar no sangue após 8 horas de jejum.
- Tempo na faixa (TIR) – Isso é usado com monitores contínuos de açúcar no sangue e mede o tempo em que o açúcar no sangue permanece dentro de uma faixa aceitável.
- Tempo acima da faixa (TAR) e tempo abaixo da faixa (TBR) – Percentual de tempo em que o nível de glicose no sangue está acima ou abaixo da faixa aceitável.
- Hemoglobina A1c (HbA1c) – Este teste reflete uma média móvel de 2-3 meses, onde valores desejáveis estão abaixo de 6,5 a 7 por cento.
- Variabilidade da glicose – O desvio padrão do açúcar no sangue.
- O custo do tratamento (consultas médicas e medicamentos).
- Frequência da necessidade de consultar um médico.
- Consequências médicas do diabetes, abrangendo dor no pé (neuropatia), perda de visão, amputação e morte.

#### Decisões

Nós nos desviamos do nosso estilo normal de apenas listar decisões, e listamos as decisões médicas tomadas pelo médico separadamente das decisões tomadas pelo paciente.

**Decisões médicas (tomadas pelo médico)**

- Escolha de medicamentos, níveis de dosagem e momento de administração. A metformina é o medicamento padrão de escolha, usado por 50 a 80 por cento dos pacientes que tomam medicação. No entanto, muitos pacientes não conseguem tolerá-la e precisam recorrer a uma série de outros medicamentos, incluindo insulina, sulfonilureias, meglitinidas, inibidores de DPP-4, entre outros.
- Prescrição de tratamentos assistidos por tecnologia, tais como
  - Dispositivos de monitoramento contínuo de glicose.
  - Bombas de insulina, que fornecem entrega precisa de insulina.
  - Sistemas automatizados de entrega de insulina.
- Intervenções cirúrgicas, como cirurgia bariátrica e transplante de ilhotas pancreáticas.

**Decisões do paciente**

- Consultar um médico.
- Seguir as instruções médicas.
- Submeter-se a testes, investindo em equipamento de teste doméstico.
- Administrar medicamentos.
- Escolhas alimentares – Isso, é claro, representa uma ampla gama de decisões que afetam o tipo de alimento e a quantidade.
- Escolhas de exercício – Que tipo, com que frequência, com que intensidade.

#### Incertezas

- Efeitos colaterais de um medicamento.
- Quão bem um paciente responde a um medicamento (mudança no nível de glicose no sangue).
- Quão bem um paciente adere a um programa de dieta e exercícios.
- Capacidade (e disposição) do paciente para seguir as instruções de tratamento.
- Progressão de longo prazo da doença conforme o paciente envelhece.
- Disponibilidade de novos medicamentos.

### Saúde pública – Gestão de kits de naloxona

#### Narrativa

Embora o uso de drogas e as overdoses tenham sido um problema por décadas, houve um aumento dramático nas mortes por overdose devido a opioides sintéticos a partir de aproximadamente 2013, rapidamente superando as mortes de todas as outras drogas por uma grande margem. Grande parte desse aumento se deveu à introdução do Oxycontin pela Purdue Pharmaceuticals em 1996. O Oxycontin contém oxicodona, que era menos aditiva do que outros analgésicos.

A oxicodona tinha uma formulação de longa duração que não proporcionava o "efeito rápido" que os usuários de drogas buscavam. No entanto, o público descobriu que o medicamento podia ser triturado e usado de forma indevida, uma prática que explodiu em uso após 2013. Abaixo resumimos as métricas, decisões e incertezas a partir da perspectiva de um oficial de saúde pública trabalhando para o governo estadual ou municipal.

#### Métricas

- Número de overdoses de opioides onde:
  - Nenhuma pessoa presente tinha naloxona (a pessoa sobreviveu ou morreu).
  - A naloxona estava presente, mas não foi administrada (a pessoa sobreviveu ou morreu).
  - A naloxona foi administrada (a pessoa sobreviveu ou morreu).
- Número de overdoses em que o serviço de emergência (EMS) atendeu.
- Número de overdoses em que a pessoa precisou ser transportada ao hospital.
- Custo dos kits de naloxona.
- Custo para o sistema de saúde.
  - Overdose é tratada fora do hospital (por exemplo, pelo serviço de emergência).
  - Overdose exige transporte da pessoa ao hospital (muito caro).
- Custos de fiscalização.

#### Decisões

As decisões abaixo são a partir da perspectiva do governo estadual:

- Quantos kits de naloxona devem ser alocados a diferentes tipos de organizações:
  - Agências de redução de danos, provedores de tratamento.
  - Organizações de serviços diretos.
  - Primeiros socorristas (serviço de emergência, policiamento, corpo de bombeiros).
  - Outras organizações comunitárias que interagem com pessoas que usam drogas (organizações religiosas, provedores de moradia, despensas de alimentos, etc).
  - Farmácias, hospitais.
  - Cadeias e prisões.
- Quantos kits devem ser alocados a programas de troca de agulhas por região:
  - Pontos críticos de overdose.
  - Rural versus urbano.
  - Diferentes condados/regiões.
  - Populações em risco, como terras tribais.
- Quem treinar sobre como reconhecer e reverter uma overdose? Quem treinar sobre como usar os kits?
- Como divulgar a disponibilidade dos kits de naloxona?
- Como financiar a estratégia de distribuição de naloxona?
- A quem submeter propostas para obter financiamento?

#### Incertezas

- Taxas e padrões de uso por pessoas/pacientes. Isso é afetado por:
  - Consciência – as pessoas podem não saber que a naloxona está disponível.
  - Confiança – as pessoas podem não se sentir confortáveis em revelar que precisam dela.
  - Como as pessoas respondem ao uso de opioides e ao tratamento.
  - Disponibilidade de drogas no mercado.
  - Barreiras de transporte – as pessoas podem não conseguir chegar a um ponto de distribuição.
- Contaminantes no suprimento que têm um impacto desconhecido sobre a naloxona e as reversões de overdose.
- Orçamento alocado para medidas preventivas, como kits de naloxona, e a capacidade da equipe para distribuí-los.

### Realizando ensaios clínicos para testes de medicamentos {#clinicaltrials}

#### Narrativa

Em 2024, havia quase 500.000 ensaios clínicos testando vários medicamentos e tratamentos quanto à eficácia. Há três fases de um ensaio clínico:

- **Fase I: Testes de segurança e dosagem** ($5–$10 milhões) – Um pequeno grupo de pessoas saudáveis é usado para testar a toxicidade em diferentes níveis de dosagem e identificar possíveis efeitos colaterais. Os pesquisadores também podem comparar diferentes métodos de administração de um medicamento, como comprimidos, adesivos ou injeções.
- **Fase II: Avaliação de eficácia e efeitos colaterais** ($20–$100 milhões) - O tratamento é aplicado a um grupo maior de pacientes que têm a doença ou condição que é o alvo do tratamento. Guiada pelo que é aprendido na Fase I, esta fase fornece uma indicação inicial da eficácia do tratamento. Os efeitos colaterais são observados, e os resultados serão comparados aos tratamentos existentes.
- **Fase III: Testes em grande escala** (mais de $100 milhões) – Usando grupos de centenas, frequentemente milhares, de pacientes provenientes de diferentes regiões, o tratamento é comparado a terapias concorrentes para avaliar a eficácia e observar ainda mais reações adversas. Dados adicionais são coletados para revisão regulatória.

Os ensaios clínicos não são apenas muito caros, também consomem muito tempo. Durante essa avaliação, o relógio de 20 anos das patentes está correndo, criando um incentivo para chegar a uma conclusão (idealmente positiva) para lançar no mercado.

O processo de realização de ensaios apresenta um grande problema logístico para administrar os testes e requer financiamento substancial, o que também significa um risco financeiro considerável. Todo o processo precisa ser conduzido na presença de incerteza considerável sobre o desempenho de um medicamento ou tratamento em grande escala.

Os ensaios clínicos podem falhar em qualquer um dos três níveis devido a:

- Falta de eficácia – O medicamento não funciona como esperado.
- Preocupações de segurança – Podem existir efeitos colaterais significativos.
- Obstáculos regulatórios – O medicamento pode encontrar problemas regulatórios.
- Razões comerciais ou estratégicas – Uma empresa pode não seguir adiante com um medicamento devido a projeções financeiras, risco financeiro ou questões competitivas.

Taxas de sucesso típicas são:

- Transição da Fase I para a Fase II: ~60 por cento.
- Transição da Fase II para a Fase III: ~30 por cento.
- Transição da Fase III para a aprovação: 50-60 por cento.

A taxa de sucesso geral ao longo de todo o processo é de aproximadamente 10 por cento.

#### Métricas

Há uma variedade de métricas que entram na avaliação de um medicamento:

- Transições bem-sucedidas de cada uma das três fases para a etapa seguinte.
- O custo de cada fase.
- O custo de obter a aprovação regulatória em cada etapa.
- A eficácia do medicamento ou tratamento.
- A presença de efeitos colaterais.
- Custo de fabricação do medicamento.
- Custo de distribuição do medicamento (pode exigir refrigeração).
- Custo de administração do medicamento. (Via oral? Injeção?)
- Custos de marketing.

#### Decisões

Descrevemos as decisões a partir da perspectiva da empresa que detém o medicamento e tem interesse em trazê-lo ao mercado:

- Em cada fase, a cada semana há uma decisão de continuar os testes, interromper e encerrar a revisão (o medicamento falha), ou interromper e passar para a próxima etapa (sucesso).
- Quantos pacientes entrevistar e convidar para fazer parte do ensaio clínico.
- Escolha dos hospitais a serem usados como locais de testes clínicos.
- Decisão de abrir locais de teste (por exemplo, em um centro comercial).
- Precificação do medicamento.
- Estratégias de marketing: Para o médico? Diretamente para o mercado?

#### Incertezas

As decisões precisam ser tomadas levando em consideração as seguintes incertezas:

- A taxa na qual pessoas elegíveis podem ser identificadas.
- A resposta das pessoas ao tratamento.
- As decisões dos comitês regulatórios.
- A aceitação antecipada do medicamento pelos médicos.
- Decisões tomadas por concorrentes que podem afetar as vendas do medicamento.

## Conduzindo uma eleição presidencial {#presidentialelection}

### Narrativa

Qualquer pessoa que tenha assistido à série "West Wing" (ou que acompanhe atentamente as eleições presidenciais) já viu o desafio de gerenciar uma campanha presidencial. Invariavelmente, trata-se de um problema operacional complexo que exige gerenciar candidatos e equipe, frequentemente coletando informações (como a realização de pesquisas de opinião) ou disseminando informações (fazendo discursos), e sempre em um ambiente com restrições orçamentárias.

### Métricas

Algumas das métricas mais importantes incluem:

- Se o candidato vence ou não a eleição.
- O número de votos do colégio eleitoral.
- Pesquisas de opinião em cada estado (especialmente nos estados decisivos).
- A quantidade de dinheiro disponível a cada semana.
- Doações a cada semana.
- Doações em resposta a publicações em redes sociais.
- Despesas semanais.

### Decisões

O gerente de campanha precisa tomar várias decisões, incluindo:

- Onde fazer discursos a cada dia.
- Quais temas enfatizar.
- Escolha do candidato a vice-presidente.
- Quais canais de publicidade usar (televisão, redes sociais, outdoors) e taxas de gastos.
- Despesas com material promocional impresso (placas, mala direta, panfletos).
- Quantas pessoas contratar em diferentes níveis, por região.
- Onde estabelecer escritórios de campo.
- Quando e onde realizar pesquisas de opinião, quais perguntas fazer.

### Incertezas

As eleições presidenciais precisam ser gerenciadas na presença de várias incertezas:

- Quantos votos o candidato recebe.
- Mudança nas taxas de favorabilidade ao longo do tempo, e após eventos importantes (por exemplo, convenção nacional).
- Mudança nas taxas de favorabilidade após destacar diferentes temas.
- Doações no geral, e em resposta a pedidos específicos de doação (por exemplo, por mensagens de texto).
- Vieses antecipados nas pesquisas de opinião.
- Eventos noticiosos que impactam a percepção pública (favorável ou desfavoravelmente) das políticas do candidato.
- Anúncios de ataque de oponentes.
- Grandes doações a super-PACs favoráveis ou concorrentes.
- Eventos de saúde adversos que impactam o candidato.

## Gestão de frota de caminhões de carga completa

### Narrativa

Nos EUA, o transporte de cargas ocorre principalmente na forma conhecida como transporte de carga completa (truckload trucking), na qual um embarcador preenche o que tipicamente é um reboque de 53 pés que pode puxar até 46.000 libras (dependendo do tipo de carga) de um local para outro. Eles operam de forma semelhante a táxis – o motorista do caminhão (com um trator) se desloca vazio para pegar uma carga em um local e depois a leva para outro, onde o reboque é descarregado ou deixado para ser descarregado posteriormente. Um motorista pode mover uma ou duas cargas em um único dia, mas a maioria das cargas leva de 1 a 5 dias.

Depois que um motorista descarrega uma carga, o desafio é minimizar o número de milhas que o motorista precisa percorrer vazio para pegar outra carga. Três questões complicam bastante a operação de uma transportadora de carga completa:

- O movimento de cargas não é equilibrado. Há regiões do país que produzem mais carga do que consomem (isso é particularmente verdadeiro no meio-oeste dos EUA) e regiões que são principalmente consumidoras (tipicamente as costas e as grandes cidades). Como resultado, o mercado está disposto a pagar muito mais para mover cargas de regiões produtoras para regiões consumidoras, enquanto as cargas que saem de regiões consumidoras podem nem sequer pagar o suficiente para operar o caminhão (mas ainda é melhor do que se deslocar vazio).
- Os motoristas de caminhão precisam observar regras rígidas sobre quantas horas podem dirigir por dia e por semana. Além disso, precisam retornar para casa, seja diariamente, semanalmente ou, no caso de motoristas de longa distância, uma ou duas vezes por mês.
- A reserva de cargas é altamente dinâmica. A maioria das cargas é reservada de um a três dias antes. Uma empresa de transporte pode precisar manter motoristas disponíveis para atender às necessidades de um grande embarcador que só solicita cargas com um dia de antecedência.

Há mais de 2 milhões de motoristas trabalhando no setor de transporte de carga completa. A maioria das empresas de transporte opera com menos de cinco motoristas, enquanto outras têm 10.000 motoristas ou mais.

### Métricas

As métricas de desempenho mais comumente relatadas incluem:

- Lucro operacional por semana ou por milha.
- Receita por motorista por semana ou por milha.
- Milhas vazias como porcentagem do total de milhas.
- Milhas por motorista por semana.
- Fração de tempo em que os motoristas chegam em casa no horário.
- Porcentagem de vezes em que as cargas são coletadas e entregues no prazo.
- Rotatividade de motoristas (número de motoristas que se demitem por semana).

### Decisões

As decisões, do ponto de vista do gerente responsável pelo despacho e planejamento de cargas, podem incluir:

- A qual carga um motorista deve ser designado.
- Se deve aceitar uma carga que é oferecida para coleta no futuro.
- Se uma carga deve ser tratada pelos próprios motoristas da transportadora ou por uma divisão de corretagem (que encontra motoristas autônomos que podem transportar a carga).
- Que preço a empresa de transporte deve oferecer para transportar carga para um embarcador em um determinado trecho de tráfego (par origem-destino) no próximo ano? Isso faz parte de um "processo de licitação" anual que determina a transportadora preferencial para cada embarcador em cada trecho.
- Quantos motoristas contratar que residam em um determinado local (chamado de domicílio do motorista).
- Quantos tratores e reboques a frota deve operar.

### Incertezas

Algumas das incertezas enfrentadas no transporte de carga completa incluem:

- Quantas cargas serão oferecidas a cada dia, em cada trecho, pelos principais embarcadores que a transportadora atende?
- Quantas cargas estarão disponíveis para transporte, e a que preço, em "quadros de cargas" públicos que qualquer transportadora pode escolher?
- Um motorista aceitará uma designação para uma determinada carga?
- Os volumes de carga estão em tendência de alta ou de baixa?
- Quais são os preços spot atuais?
- Uma carga em um quadro de cargas externo estará realmente disponível se a transportadora decidir transportá-la?

## Gestão de caixa de fundo mútuo

### Narrativa

Um gestor de fundo mútuo que havia feito um curso de planejamento de operações em seu MBA foi apresentado a um problema clássico conhecido como "problema do jornaleiro" (newsvendor problem). Problemas do tipo newsvendor surgem quando você precisa decidir sobre uma quantidade de um recurso (por exemplo, jornais) para alocar a fim de atender a uma demanda que não é conhecida no momento em que a decisão é tomada. Se você alocar demais, sobrarão recursos, considerando que eles não podem ser guardados para o futuro (assim como os jornais de hoje não têm valor amanhã). Se alocarmos de menos, então teremos demanda insatisfeita.

Depois de concluir seu MBA (em uma renomada escola de negócios), o gestor de fundo mútuo enfrentou o problema de decidir quanto dinheiro em caixa manter disponível para atender a pedidos de resgate. O problema é resumido no e-mail mostrado na figura 2.7, mas os elementos centrais são os seguintes:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/MutualFundemail.png" alt="E-mail de um gestor de fundo mútuo e ex-aluno de MBA buscando aconselhamento sobre como gerenciar o saldo de caixa.">
  <figcaption><span class="fig-num">Figura 2.7.</span> E-mail de um gestor de fundo mútuo e ex-aluno de MBA buscando aconselhamento sobre como gerenciar o saldo de caixa.</figcaption>
</figure>

- O fundo mútuo precisa manter dinheiro suficiente em caixa para atender aos pedidos de resgate. Se não houver dinheiro suficiente disponível quando chegar um pedido de resgate, será necessário liquidar ações, incorrendo em custos de transação, e possivelmente sendo forçado a vender a um preço mais baixo. Se mantiverem dinheiro em excesso, estarão perdendo o potencial de crescimento dos investimentos no mercado.
- Há dois tipos de clientes: investidores de varejo e institucionais. Os resgates para investidores de varejo podem levar vários dias para serem liquidados, enquanto os pedidos de resgate maiores de investidores institucionais precisam ser liquidados no mesmo dia.
- Depósitos e pedidos de resgate são correlacionados com o desempenho do mercado. O crescimento no mercado pode atrair novos depósitos, enquanto quedas podem desencadear pedidos repentinos de resgate.

### Métricas

As métricas envolvidas neste exercício incluem:

- Retorno geral da carteira a cada dia, líquido dos custos operacionais (custos de transação, despesas de resgate).
- Quantidade de dinheiro em caixa sendo mantida.
- Vendas necessárias para cobrir os pedidos de resgate.

### Decisões

As decisões enfrentadas pelo gestor de fundo mútuo são:

- Quanto dinheiro manter em caixa.
- Quais ativos vender para levantar dinheiro.
- Quais ativos comprar quando há dinheiro em excesso disponível.

### Incertezas

As decisões precisam ser tomadas diante das seguintes incertezas:

- Depósitos de investidores de varejo ou institucionais.
- Pedidos de resgate de investidores de varejo ou institucionais.
- Mudanças nos índices de mercado.
- Mudanças nas taxas de juros.

## Financiamento da cadeia de suprimentos {#supplychainfinance}

### Narrativa

Toda transação da cadeia de suprimentos envolvendo a compra ou venda de commodities, componentes e produtos finais implica um fluxo de dinheiro, criando uma rede complexa de fluxos entre compradores e vendedores (em todos os níveis da cadeia de suprimentos), juntamente com parceiros financeiros terceirizados que podem fornecer financiamento e seguro.

As etapas em uma transação financeira tipicamente incluem:

- O fornecedor envia mercadorias e faturas ao comprador.
- O comprador aprova a fatura em seu sistema ERP.
- Uma vez aprovada, o fornecedor pode optar por ser pago antecipadamente pelo financiador (que pode ser um banco).
- O financiador paga o fornecedor (tipicamente com desconto).
- O comprador paga o financiador no vencimento da fatura (talvez 60 ou 90 dias depois).

Há uma variedade de transações financeiras que podem ocorrer, tais como:

- Aprovação da fatura – O comprador confirma que a fatura é válida e está devida para pagamento.
- Cessão de recebíveis – O fornecedor cede a fatura ao financiador.
- Pagamento antecipado – O financiador paga o fornecedor antes da data de vencimento.
- Pagamento no vencimento – O comprador paga o financiador na data de vencimento acordada.
- Taxas/descontos de transação – O financiador ganha uma taxa pela transação.

Há uma série de fontes de incerteza na gestão da cadeia de suprimentos que têm impacto sobre as finanças. As empresas podem se proteger usando diferentes formas de seguro. Alguns exemplos são:

- Seguro de estoque - Protege mercadorias mantidas em armazéns ou em trânsito (incluindo centros de logística de terceiros) contra roubo, dano ou perda.
- Hedges cambiais para proteger contra mudanças no valor relativo de diferentes moedas ao importar de outros países.
- Seguro de crédito comercial - Protege fornecedores ou credores contra o risco de inadimplência do comprador devido à insolvência, atraso prolongado ou eventos políticos.
- Seguro de carga marítima - Cobre perda física ou dano a mercadorias em trânsito—por terra, mar ou ar—durante o transporte internacional ou doméstico.
- Seguro de risco político - Protege contra perdas devido à instabilidade política, como expropriação, inconversibilidade de moeda, restrições de importação/exportação, guerra ou tumulto civil.
- Seguro de garantia de desempenho - Garante que um fornecedor ou contratado cumprirá as obrigações contratuais. Protege compradores contra a falha do fornecedor.
- Swaps de crédito (credit default swaps) - Usados por instituições financeiras para se proteger contra o risco de crédito de contraparte.

### Métricas

Existe uma lista bastante longa de métricas financeiras usadas por grandes empresas. Uma amostra daquelas diretamente relacionadas à gestão financeira de uma cadeia de suprimentos inclui:

- EBITDA – Lucros antes de juros, impostos, depreciação e amortização. Esta é uma métrica de alto nível que captura o custo dos produtos vendidos (COGS), receitas e todos os custos incorridos para gerenciar o fluxo de caixa e capital.
- Retorno sobre o patrimônio líquido (ROE) e lucro por ação (EPS).
- Fluxo de caixa livre.
- Capital de giro e reservas de caixa.
- Índice dívida/patrimônio líquido.
- Despesa com juros.

### Decisões

Uma amostra de decisões tomadas por um diretor financeiro inclui:

- Escolha de estratégias de financiamento para diferentes transações.
- Escolha de formas de seguro (veja a lista acima).
- Quanto caixa manter, e em quais contas.
- Pagamentos de dividendos.
- Alocação de capital.
- Financiamento por dívida vs. patrimônio líquido.

### Incertezas

Novamente, uma pequena amostra de diferentes formas de incerteza que surgem no financiamento da cadeia de suprimentos inclui:

- Inadimplências de pagamento por compradores e vendedores.
- Variações cambiais.
- Mudanças em tarifas e restrições comerciais.
- Risco de recessão, mudanças nas vendas gerais (para cima ou para baixo).
- Volatilidade da taxa de juros.
- Volatilidade do mercado de crédito.

## Tentativa e erro inteligente {#intelligenttrialanderror}

### Narrativa

Existe uma classe massiva de problemas na tomada de decisão que pode ser melhor descrita como "tentativa e erro inteligente." Estes surgem quando há um conjunto de escolhas discretas, e onde o desempenho de cada escolha é incerto. Exemplos de contextos de problemas onde isso surge incluem:

- **Ciência dos materiais**
  - Quais produtos químicos misturar para fazer um novo material.
  - A que temperatura executar um processo.
  - Quais etapas no processo de fabricação.
- **Saúde**
  - Qual medicamento tentar para tratar uma condição.
  - Se deve realizar um teste (imagem, exame de sangue).
  - Onde localizar uma clínica para distribuir kits de naloxona.
- **Comércio eletrônico**
  - Qual dos dois designs de página web usar.
  - Qual produto anunciar em uma página web para maximizar a receita.
  - Que preço cobrar por um produto (dentre um conjunto de preços possíveis).
- **Manufatura**
  - Otimizar um processo de fabricação de semicondutores (temperaturas, tempo em um banho químico, concentrações químicas, diâmetro da bolacha de silício).
- **Finanças**
  - Encontrar as melhores configurações para os parâmetros de uma política de negociação.
  - Qual fornecedor usar, dado o risco de inadimplência.
  - Quanto capital de reserva manter.
- **Gestão da cadeia de suprimentos**
  - Qual fornecedor usar para um produto dada a incerteza sobre a qualidade do produto.
  - Definir os pontos de reposição para o reabastecimento de estoque.
  - Quais canais de publicidade usar.
- **Escolha de pessoas**
  - Beisebol – Quem deve rebater em quarto lugar, ou jogar como catcher.
  - Basquete – Quem deve jogar em cada posição.
  - Gestores de portfólio – Quem obtém os melhores resultados gerenciando um portfólio.

Cada um desses contextos envolve escolher dentre um conjunto de opções. Queremos escolher aquela que funciona melhor, mas não temos certeza de quão bem cada uma terá desempenho. A situação é retratada na figura 2.8. Pode haver duas escolhas, dezenas, centenas, e muitos milhares.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoices2.jpg" alt="A set of discrete choices.">
  <figcaption><span class="fig-num">Figura 2.8.</span> Um conjunto de escolhas discretas.</figcaption>
</figure>

Este problema básico vem em uma variedade de formas:

- **Modelo de crença**
  - Crenças independentes – Isto é quando nossa crença sobre uma escolha não está relacionada às crenças sobre outras escolhas. Em aplicações reais, isto é relativamente raro.
  - Crenças correlacionadas – Escolhas podem compartilhar características, como medicamentos da mesma família, um estilo de camisa com cores diferentes, ou a "proximidade" de duas escolhas, especialmente se representarem um preço discretizado, ou concentração, ou localização geográfica.
  - Modelos paramétricos – Podemos construir nossas crenças usando um modelo paramétrico, como um modelo linear relacionando diferentes preços a demandas estimadas.
- **Custo de realizar um teste**
  - Experimentos baratos – Observar quantas vezes um anúncio recebe clique em uma página web é uma forma muito barata de conduzir um experimento. Os intervalos de tempo podem variar de microssegundos a segundos a minutos.
  - Experimentos caros – Um experimento laboratorial pode levar de um dia a uma semana (ou mais). Simulações computacionais complexas podem levar de horas a uma semana ou mais.
- **Nível de ruído**
  - Experimentos de baixo ruído produzem estimativas precisas a partir de um único teste.
  - Experimentos de alto ruído produzem resultados muito ruidosos, exigindo múltiplos testes com escolhas iguais ou semelhantes.
- **Aprendizado offline vs. online**
  - Aprendizado offline descreve experimentos realizados em um laboratório ou simulação computacional, onde podemos tolerar um desempenho ruim de um experimento.
  - Aprendizado online descreve o aprendizado feito em campo, onde temos que conviver com o resultado de um experimento (como testar o preço de um produto, ou como um medicamento funciona em um paciente).
- **Presença de recursos físicos ou financeiros** – Problemas básicos de aprendizado estão ligados de um experimento a outro puramente com base no que aprendemos. No entanto, é possível que problemas estejam ligados por um recurso físico (ou financeiro):
  - Pode haver um orçamento fixo para realizar experimentos. Cada experimento consome uma parte do orçamento.
  - Experimentos físicos podem exigir estoques de ingredientes que precisam estar disponíveis.
  - Um experimento pode exigir uma máquina que está configurada para realizar uma tarefa específica, o que significa que é mais fácil fazer outros experimentos que precisam da mesma configuração.
- **Experimentos sequenciais ou paralelos**
  - Experimentos sequenciais:
    - Um paciente pode ser usado para testar um medicamento por vez para determinar qual funciona melhor nesse paciente.
    - Um fabricante pode ser capaz de testar um processo por vez para determinar qual produz o maior rendimento.
  - Experimentos paralelos:
    - Um varejista pode executar múltiplas campanhas promocionais (por exemplo, publicidade na loja) em diferentes lojas para aprender qual funciona melhor.
    - Um cientista pode testar dezenas ou centenas de compostos diferentes em uma única placa para ver como reagem a um tipo particular de célula cancerígena.
- **Aprendizado instantâneo vs. defasado**
  - Aprendizado instantâneo - Fazemos uma escolha (por exemplo, executar um experimento) e aprendemos os resultados imediatamente.
  - Aprendizado defasado - Há um atraso de tempo entre quando executamos um experimento e quando aprendemos o resultado. Os atrasos podem ser de minutos em contextos de alta velocidade, até um ano ou mais, como ocorreria quando um banco oferece um empréstimo, e tem que esperar anos para saber se o beneficiário do empréstimo perde pagamentos ou entra em inadimplência.

Qualquer um desses contextos ainda pode ser descrito pelo nosso trio de métricas, decisões e incertezas.

### Métricas

Qualquer "experimento" é assumido como retornando uma observação de desempenho, seja o número de cliques em anúncios, ou a resposta de um paciente a um medicamento, ou o rendimento de um processo de fabricação de semicondutores. Claro, pode haver mais de uma métrica para descrever o desempenho, que podemos desejar otimizar em alguma combinação. No entanto, devemos distinguir duas dimensões importantes de desempenho:

- O custo de tentar cada escolha.
- Desempenho médio ao longo de algum horizonte.
- A variabilidade em torno da média, que captura a confiabilidade de um processo.
- A probabilidade de resultados "ruins".
- Outras métricas de desempenho, como efeitos colaterais de um medicamento, ou o potencial de perdas significativas na participação de mercado.

### Decisões

Isso é simples – é o conjunto de escolhas. Estas podem ser:

- **Binárias** – Tais como
  - Se tomar uma ação (vender uma empresa, lançar um novo produto, enviar um medicamento para ensaios clínicos) ou não.
  - Se manter ou vender um ativo.
  - Qual de dois designs de página web usar (frequentemente chamado de teste A/B).
  - Se dar um medicamento a um paciente, ou não.
- **Conjunto discreto** – Isso poderia ser um conjunto de fornecedores, uma escolha de diferentes tratamentos medicamentosos, diferentes canais de marketing para anunciar um produto, ou qualquer um de um conjunto de milhares de compostos moleculares a serem testados no desenvolvimento de medicamentos.
- **Um conjunto discretizado de valores de um parâmetro contínuo**, como o preço de um produto, a concentração de um produto químico, a temperatura para assar um semicondutor.

Existem problemas onde o conjunto de escolhas não é óbvio. Por exemplo, podemos estar procurando um fornecedor que possa fazer um componente especializado a partir de um novo material que requer trabalhar em altas temperaturas. Ou precisamos de um produto químico muito especial para fazer uma nova vacina, ou uma forma extremamente pura de um gás necessário no processo de fabricação dos mais recentes chips semicondutores. Encontrar fornecedores, ou materiais, ou produtos químicos, para atender a uma necessidade pode ser extremamente desafiador.

Então há problemas onde conhecemos nossa métrica de desempenho, mas não sabemos como melhorá-la. Um fabricante de cimento pode precisar cortar custos para ser competitivo, mas não tem uma estratégia clara de como alcançar isso. Um médico quer tratar uma condição em um paciente mas não sabe qual tratamento seguir.

### Incertezas

Incertezas para problemas de escolha discreta (tentativa e erro) podem vir em duas formas:

- O desempenho de uma escolha, que tipicamente difere de como pensávamos que ela teria desempenho quando decidimos usar a escolha. Podemos ter uma estimativa pontual da(s) métrica(s) para cada escolha, ou alguma forma de distribuição. O desempenho real é tipicamente diferente da estimativa pontual, e se recebermos uma distribuição de resultados possíveis, o resultado real pode não ser necessariamente extraído de uma distribuição assumida.
- Se a escolha está disponível – Alguns exemplos são:
  - A escolha pode ser um fornecedor, que não é capaz de fazer uma proposta para um contrato.
  - A escolha pode ser uma pessoa para preencher uma vaga, mas ela pode não estar disposta a aceitar o emprego.
  - Podemos querer usar um tipo de material, mas problemas na cadeia de suprimentos podem restringir sua disponibilidade.

## Exercícios

Quando um exercício pedir uma matriz de interação, você pode usar o modelo da "Matriz de Interação de Enquadramento" que pode ser baixado em [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<ol class="book-exercises">
<li>Para o problema de estoque, escolha um produto com o qual você esteja familiarizado (por exemplo, alimentos, roupas, itens domésticos, medicamentos ou ferragens) e responda ao seguinte:
  <ol type="a">
    <li>Identifique métricas, decisões e incertezas que parecem relevantes para o seu problema, usando as listas de cada dimensão da seção de estoque como guia.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de gestão de demanda:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas por um gerente de loja em um estabelecimento de móveis de varejo.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema da rede elétrica:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas ao realizar o planejamento diário de geradores de energia.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de gestão de receita hoteleira:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas ao gerenciar reservas de quartos ao longo de um horizonte de planejamento de dois meses.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de gestão do diabetes tipo 2:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas por um médico ao tomar decisões sobre um paciente com diabetes tipo 2.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de gestão de kits de naloxona:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas por um governo estadual ao planejar a alocação de kits de naloxona para diferentes condados usando financiamento do governo federal.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de conduzir uma eleição presidencial:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas pelo gerente de campanha de um candidato concorrendo à presidência.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Para o problema de gestão de uma frota de caminhões de carga completa:
  <ol type="a">
    <li>Escolha um conjunto de métricas, decisões e incertezas que você acredita que seriam enfrentadas ao planejar o problema de aceitar quais cargas transportar (tipicamente realizado até sete dias no futuro).</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Considere o problema de saldo de caixa de um fundo mútuo:
  <ol type="a">
    <li>O email do gestor do fundo mútuo sugere uma forma de decidir quanto dinheiro manter em caixa. Escreva essa fórmula.</li>
    <li>Use a Matriz de Interação de Enquadramento para criar matrizes de interação que capturem sua melhor estimativa do impacto de cada tipo de decisão sobre cada métrica de desempenho.</li>
    <li>Repita (b) para capturar sua melhor estimativa do impacto de cada tipo de incerteza sobre cada métrica de desempenho.</li>
  </ol>
</li>
<li>Cite um exemplo de um problema de "tentativa e erro" que você encontra em sua própria experiência, no qual você precisa fazer a mesma escolha repetidamente.
  <ol type="a">
    <li>Descreva o contexto do problema de tentativa e erro, e o que desencadeia a necessidade de tomar a decisão novamente.</li>
    <li>Descreva as métricas (uma ou mais, se necessário), o conjunto de escolhas e todas as formas de incerteza que surgem no processo de tomada de decisão.</li>
    <li>Sugira como você procederia para fazer uma escolha.</li>
  </ol>
</li>
</ol>

{% endraw %}
