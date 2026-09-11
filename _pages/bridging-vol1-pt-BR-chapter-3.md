---
layout: book
title: "Capítulo 3: Métricas de Desempenho"
permalink: /bridging-vol1/pt-BR/chapter-3/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: 43d87c4ab16e5185
---


{% raw %}
<p class="book-byline"><em>Conectando Problemas de Decisão, Volume I — Enquadrando o Problema</em> &middot; Warren B. Powell</p>

Há um ditado antigo na gestão:

> "Você não pode gerenciar o que não pode medir."

Sempre que desejamos melhorar o desempenho de um processo ou sistema, é importante que tenhamos uma métrica de desempenho claramente definida, reconhecendo que frequentemente existem múltiplas métricas. Antes de começarmos a discutir as questões complexas associadas às métricas, precisamos primeiro reconhecer que não faltam problemas que não possuem métricas bem definidas, como com quem casar, qual emprego aceitar ao se formar na faculdade, ou escolher qual pintura ou escultura comprar. Se você tiver dificuldade em identificar pelo menos uma métrica claramente quantificável, é provável que seu problema pertença ao domínio complexo dos problemas de decisão humana que não se beneficiarão do pensamento analítico.

Mas se você conseguir identificar pelo menos uma métrica clara e quantificável, continue lendo.

## Categorias de métricas

Existe uma vasta gama de métricas, portanto ajuda tentar identificar as principais categorias de métricas. Algumas das categorias mais populares são:

1. **Métricas financeiras** - Estas incluem qualquer métrica medida em uma moeda. Elas podem ser medidas:
   - Quantidade total - Caixa disponível, garantias de empréstimo, investimentos.
   - Por unidade de tempo (dia, mês, trimestre, ano), tipicamente representando custo, receita ou lucro.
   - Por unidade de um recurso - Dólares por pessoa, máquina, instalação ou por ação.
2. **Métricas de produtividade** - Estas são métricas não denominadas em dólares que também podem ser medidas por unidade de tempo (pacientes atendidos, unidades produzidas, milhas percorridas) e por unidade de um recurso (por pessoa, por máquina, por instalação).
3. **Métricas de eficácia** - Resistência de um material, desempenho de um medicamento, rendimento de um processo de fabricação, tempo médio entre falhas de uma máquina.
4. **Desempenho de serviço** - O quão bem estamos atendendo mercados ou agentes externos, como demanda coberta, avaliações de desempenho por clientes, colocação de estudantes.
5. **Classificações de desempenho externas** - A classificação de uma escola, a confiabilidade de produtos fabricados por uma empresa, a classificação de vendas, a avaliação de hospitais.
6. **Métricas de comportamento** - Desvio entre as decisões reais e as diretrizes ou orientações predeterminadas.
7. **Métricas de estimação** - O quão bem estimamos ou prevemos quantidades (demanda futura, precipitação, quantidade em estoque) ou parâmetros (diagnósticos de pacientes, custo de produção). Estas assumem que temos alguma forma de comparar uma estimativa prévia com uma observação de desempenho real.

Há duas maneiras de avaliar cada categoria de métrica:

- **Desempenho médio** - São totais ou médias ao longo do tempo, capturando o que seria realmente experimentado.
- **Métricas de risco** - Estas medem eventos que não são adequadamente representados por uma média.

O desempenho médio e as métricas de risco são discutidos mais adiante na [seção abaixo](#averagevvsrisk).

Ajuda fornecer exemplos específicos. Abaixo está uma lista de métricas de diferentes categorias.

- **Métricas financeiras**
  - Métricas de lucratividade
    - Lucro líquido.
    - Margem de lucro bruto.
    - Margem de lucro operacional.
    - Retorno sobre ativos.
    - Retorno sobre patrimônio líquido.
    - EBITDA – lucro antes de juros, impostos, depreciação e amortização.
  - Métricas de liquidez
    - Índice de liquidez corrente (ativo circulante/passivo circulante).
    - Índice de liquidez seca (ativo circulante-estoque/passivo circulante).
  - Métricas de eficiência
    - Índice de giro de ativos (receita/ativos totais).
    - Giro de estoque (custo das mercadorias vendidas/estoque médio).
  - Métricas de solvência
    - Índice de dívida sobre patrimônio líquido (passivo total/patrimônio líquido dos acionistas).
    - Índice de cobertura de juros (EBIT/despesa de juros).
  - Métricas de avaliação
    - Lucro por ação (LPA) – lucro líquido/ações médias em circulação.
    - Índice preço-lucro (P/L) – Preço de mercado por ação/lucro por ação.
- **Métricas de produtividade**
  - Fração do tempo em que o ativo está sendo utilizado.
  - Número de trabalhos/tarefas concluídos por semana.
  - Número de trabalhos/tarefas concluídos no prazo ou atrasados.
  - Tempo médio entre falhas (MTBF).
  - Tempo médio de reparo.
- **Métricas de eficácia**
  - As máquinas vêm em uma vasta variedade de estilos, de carros a aparelhos de ar-condicionado a liquidificadores. Em todos os casos, há uma avaliação de se ela "funciona", embora maquinário complexo como um carro possa falhar de várias maneiras, desde não ligar até um pneu furado ou o desembaçador não funcionar. Um carro pode funcionar, mas o consumo de combustível pode ser menor do que o esperado.
  - Um plástico pode precisar ser aquecido a uma determinada temperatura sem derreter.
  - Um laptop pode precisar ter desempenho a uma certa velocidade.
  - Desempenho de um medicamento (por exemplo, para redução de peso).
  - Resistência de um material.
- **Classificações de desempenho externas**
  - Vendas de produtos (vendas unitárias ou receita), taxa de crescimento.
  - Custo de aquisição de clientes.
  - Número de avaliações positivas.
  - Taxa de devolução de produtos.
  - Taxa de rotatividade de clientes (clientes que se recusam a renovar o contrato).
- **Desempenho da força de trabalho**
  - Número de peças fixadas/inspecionadas por hora (manufatura).
  - Vendas mensais dentro da região ou linha de produtos de alguém (vendas).
  - Se um projeto é concluído no prazo e dentro do orçamento (gestão).
  - Número de chamadas atendidas/avaliação do cliente (centrais de atendimento).
  - Retenção/rotatividade de funcionários.
  - Taxa de avaliações positivas de funcionários em pesquisas anuais de RH.
  - Salário necessário para atrair e reter pessoas.

## As pirâmides de métricas

É comum, especialmente nos negócios, compilar listas de métricas, e essas listas podem ser bastante longas. É muito importante priorizar as métricas, o que pode ser feito de forma relativamente fácil organizando-as em pirâmides, como mostrado na figura 3.1. A Figura 3.1(a) ilustra um possível conjunto de métricas para alguém que trabalha nos níveis mais altos de uma empresa (frequentemente chamado de "C-suite"), onde o objetivo mais importante é maximizar o preço trimestral das ações. Essas métricas, no entanto, não fornecem muita orientação para alguém que trabalha em uma planta de manufatura, onde a métrica mais importante pode ser o custo, seguida de perto pela produção e qualidade. A Figura 3.1(b) ilustra como uma pirâmide diferente pode ser criada para alguém que possa trabalhar na manufatura, onde há mais ênfase no custo.

A organização das métricas em uma pirâmide é em grande parte subjetiva, mas deve haver uma única métrica no topo que seja considerada a mais importante. A métrica do topo deve ser aquela que é maximizada ou minimizada, mas o mesmo não é necessariamente verdadeiro para todas as outras métricas, uma questão que abordamos a seguir.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidStockPrice.jpg" alt="A pyramid of metrics that might be used at the executive level of a publicly traded company.">
  <figcaption>(a)</figcaption>
</figure>
<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidCost.jpg" alt="A pyramid of metrics that might be used in a manufacturing plant.">
  <figcaption><span class="fig-num">Figura 3.1.</span> (b) — (a) Uma pirâmide de métricas que poderia ser usada no nível executivo de uma empresa de capital aberto. (b) Uma pirâmide de métricas que poderia ser usada em uma planta de manufatura.</figcaption>
</figure>

## Objetivos, metas e limites

Em seguida, precisamos especificar o que estamos tentando alcançar com cada métrica. Há três maneiras pelas quais podemos abordar o uso de métricas para avaliar desempenho:

- **Maximizar/minimizar** – Frequentemente queremos maximizar ou minimizar uma métrica onde maior (ou menor) é sempre melhor. Podemos querer o material mais resistente, ou a maior densidade de energia, ou o menor custo.
- **Metas** – Aqui estamos tentando atingir um valor específico, que pode ser a temperatura corporal de um paciente, ou a voltagem em uma linha de transmissão elétrica. Empresas podem querer atingir metas projetadas para receita ou lucratividade para ajudar a controlar a volatilidade.
- **Limite superior/inferior** – Um paciente pré-diabético pode desejar manter seu nível de A1c (uma medida de açúcar no sangue) abaixo de 6,0. Um varejista de móveis pode desejar vender seu estoque atual (mas não mais). Uma transportadora de cargas fechadas gostaria de permitir que cada motorista rodasse 2000 milhas por semana, mas não mais, já que a transportadora nunca conseguiria sustentar um número maior, e o motorista pode ficar decepcionado quando semanas de alta quilometragem não se repetem.

Embora possa haver diferentes maneiras de medir o desempenho, em última análise, um computador precisa ser capaz de examinar um conjunto de decisões e escolher qual é a melhor.

## Lidando com múltiplos objetivos

Frequentemente há múltiplos objetivos a serem maximizados ou minimizados. Embora haja uma extensa literatura sobre otimização multiobjetivo, em última análise será necessário combinar essas métricas em uma única função de utilidade que requer a atribuição de pesos a cada métrica. A métrica no topo da pirâmide (que tende a ser uma que precisa ser maximizada ou minimizada) tipicamente serve como base, enquanto outras métricas são ponderadas em relação à métrica do topo.

Quando múltiplas métricas precisam ser combinadas em uma única função de utilidade, isso levanta a questão de como ponderá-las. Recomendamos que o peso da métrica no topo da pirâmide seja definido como igual a 1,0, o que significa que os pesos de outras métricas (que não estão necessariamente nas mesmas unidades) precisam ser escalonados em relação à métrica do topo. Inicialmente, esses pesos podem ser definidos subjetivamente, mas eventualmente isso levará a um conjunto de decisões que produzem um nível de desempenho em cada uma das dimensões que está sendo maximizada ou minimizada. Se um especialista do domínio não estiver satisfeito com o desempenho em alguma dimensão, o caminho usual é ajustar o peso e depois reavaliar após observar um novo conjunto de decisões.

## Desempenho médio vs. risco {#averagevvsrisk}

Se executarmos 20 simulações para avaliar algum processo de tomada de decisão, estamos avaliando nosso método com base no desempenho médio. Podemos fazer isso se tivermos acesso a um simulador, mas uma alternativa é apenas observar como ele funciona no campo por um período de tempo. Nesse caso, estamos acompanhando uma única amostra de observações e usando o desempenho real para avaliar nosso método. Poderíamos dizer que observar o desempenho real é como fazer uma média de apenas uma observação.

O desempenho real em campo é o que experimentamos. Para as empresas, isso é capturado em suas demonstrações de lucros e perdas, bem como em quaisquer outros relatórios que resumam suas outras métricas de desempenho, como os vários KPIs financeiros, juntamente com estatísticas sobre estoques e a utilização de instalações e equipamentos. Em um ambiente de saúde, poderíamos estar observando a taxa média de novas infecções ou mortes por overdose. Um hotel observará a utilização de quartos e a receita. Frotas de cargas fechadas coletarão estatísticas sobre receita por motorista e milhas vazias.

Agora, considere o problema de uma interrupção repentina nas operações normais da empresa. Poderia ser um terremoto ou tsunami que destrói uma grande planta de manufatura, ou o surgimento de uma doença como a COVID interrompendo os padrões de consumo. Uma guerra tarifária poderia eclodir, perturbando severamente o comércio global.

Já reconhecemos a presença de diferentes fontes de incerteza, como fizemos ao longo do [Capítulo 2](/bridging-vol1/pt-BR/chapter-2/), então por que estamos chamando atenção para essas novas fontes de incerteza? Não é o caso de que, se um desses grandes eventos acontecer, seu efeito será capturado à medida que acumulamos nossas métricas de desempenho ao longo do tempo?

A resposta simples é: não. Imagine que há uma grande interrupção em uma cadeia de suprimentos, de modo que temos que passar por um período de tempo em que não podemos atender ao nosso mercado. O mais importante é que podemos perder clientes para concorrentes, já que eles podem não estar dispostos a esperar até que o problema seja resolvido. Além disso, podemos ter que dispensar temporariamente um número significativo de funcionários porque não temos as peças necessárias para operar as fábricas. Isso é uma dificuldade para os funcionários, levando à insatisfação, e os melhores funcionários podem encontrar empregos melhores.

Essas questões não são captadas pelos processos contábeis usuais que acompanham o desempenho corporativo. É por essa razão que existe uma série de livros abordando o que é amplamente chamado de "risco" (ou "resiliência", que se refere à capacidade das empresas de se recuperar de eventos importantes), como mostrado na figura 3.2. Esses livros são tipicamente descrições qualitativas de diferentes tipos de risco, frequentemente (mas nem sempre) sem um processo formal para lidar com o risco.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SupplyChainRiskBooks.png" alt="Uma amostra de livros sobre risco e resiliência de cadeia de suprimentos." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 3.2.</span> Uma amostra de livros sobre risco e resiliência de cadeia de suprimentos.</figcaption>
</figure>

Risco é um termo geralmente usado sempre que decisões precisam ser tomadas na presença de incerteza. Alguns exemplos de risco que podem surgir no contexto das aplicações do Capítulo 2 podem ser:

- A Bud Light uma vez lançou uma campanha de marketing voltada para a comunidade LGBTQ. Suas vendas caíram 25 por cento à medida que muitos de seus clientes conservadores reagiram mal, o que representou uma severa disrupção em todo o seu processo de produção.
- A programação de geradores de energia considera a possibilidade de que um gerador (como uma usina nuclear) possa falhar, mas eles não seriam capazes de lidar com duas falhas dessa magnitude, o que resultaria em apagões programados.
- Um diagnóstico incorreto para um paciente pode resultar na morte do paciente.
- A falha em fornecer reservas de caixa suficientes para um fabricante poderia resultar em falência diante de uma grande queda na economia, como ocorreu em 2008 com a indústria automotiva.

Esses eventos simplesmente não são adequadamente contabilizados pelo acúmulo das estatísticas de desempenho usuais. Por essa razão, é necessário contabilizar esses eventos, que podem ter probabilidade muito baixa, separadamente do desempenho médio ou real.

A gestão da rede elétrica fornece uma boa ilustração. As empresas que gerenciam suas redes são obrigadas a programar energia suficiente para lidar com o evento de que seu maior gerador (que seria uma usina nuclear) falhe, o que produziria apagões. Não há tentativa de quantificar o impacto econômico de um apagão. Em vez disso, elas simplesmente colocam isso em uma categoria separada e exigem que consigam lidar com uma grande interrupção.

A literatura sobre risco pode ser dividida grosseiramente em duas categorias:

- Discussões gerais específicas de domínio, como os livros na figura 3.2 para aplicações de cadeia de suprimentos, que tipicamente fornecem listas de eventos que as pessoas da área concordariam constituir "risco."
- A literatura de pesquisa matemática, amplamente focada em finanças, que usa métricas de risco bem definidas, como a probabilidade de que o retorno financeiro fique abaixo de alguma meta (tipicamente representada como "VaR" ou "CVaR"), ou simplesmente o desvio padrão de uma métrica de desempenho (como o retorno financeiro).

O primeiro grupo, que consiste nos tipos de livros mostrados na figura 3.2, usa linguagem simples para descrever eventos que a maioria geralmente concordaria representarem exemplos de risco que devem ser evitados. O segundo grupo consiste em livros e artigos que são frequentemente altamente teóricos, mas que limitam suas caracterizações de risco a valores extremos de distribuições de probabilidade bem definidas.

Surpreendentemente, nenhuma das literaturas fornece o que poderia ser descrito como uma definição formal de risco que se aplique amplamente à grande variedade de contextos em que o risco parece ser uma questão. Oferecemos aqui tal definição, mas começamos fornecendo um nome formal para nosso objetivo original, que é baseado em uma simulação de nosso processo, seja em um simulador ou em campo:

**O objetivo base** – É assim que avaliaríamos nosso processo de tomada de decisão ao longo do tempo em campo, através do acúmulo normal de métricas de desempenho (incluindo, mas não se limitando a, demonstrações de lucros e perdas). Para empresas, isso é tipicamente (mas nem sempre) em unidades monetárias, mas poderia ser mortes em um contexto de saúde pública, milhas carregadas por motorista para uma empresa de transporte rodoviário, e votos em uma eleição presidencial.

Agora estamos prontos para definir risco:

**Risco** – O risco consiste em duas dimensões:

- Eventos de risco – São eventos que, no julgamento subjetivo de especialistas do domínio (gestores, médicos, políticos), não são adequadamente capturados pelo objetivo base. Eventos de risco não são medidas quantitativas – são caracterizações de eventos em linguagem natural.
- Métricas de risco – É aqui que transformamos um evento de risco em uma ou mais métricas que quantificam o impacto de um evento no desempenho atual ou de longo prazo de um sistema. Métricas de risco não estão necessariamente nas mesmas unidades que o objetivo de desempenho base. Métricas de risco podem ser adicionadas ao objetivo usando um fator de escala, ou tratadas como limites.

Na maioria das aplicações, o risco é capturado como sua própria métrica, que pode ser apagões que excedam algum limite, uma queda no suprimento de peças que exigiria uma paralisação da produção, ou eventos que levam a desfechos graves de saúde. Na maioria das vezes, o objetivo é manter o risco abaixo de algum limite especificado pelo usuário (assumimos que estamos sempre tentando reduzir nossa(s) métrica(s) de risco).

Curiosamente, a literatura matemática sobre risco geralmente combina o objetivo base e a métrica de risco em uma única função de utilidade usando um parâmetro de risco ajustável. Embora isso possa ser uma abordagem válida para combinar duas métricas, ainda não estamos prontos para fazer essa suposição.

Observamos que, embora o objetivo base seja sempre uma média ou uma estimativa amostral de uma média, uma métrica de risco é frequentemente calculada não como uma média (ou expectativa), mas sim como um evento que pode acontecer, possivelmente com uma probabilidade completamente desconhecida.

## Em um ponto no tempo vs. ao longo do tempo

Existe uma vasta literatura sobre problemas que envolvem tomar decisões ao longo do tempo. A gestão de estoque é claramente um problema que precisa ser resolvido ao longo do tempo, equilibrando custos de manutenção de estoque com a possibilidade de rupturas de estoque à medida que novos pedidos se tornam conhecidos. Mas e se tivermos um problema de atribuição de motoristas a cargas, ou de balanceamento de uma carteira de investimentos, ou de decidir onde construir armazéns? Na década de 1950, resolver qualquer um desses problemas em um único ponto no tempo representava um grande desafio.

Hoje, temos pacotes de software que conseguem resolver até instâncias grandes desses problemas muito rapidamente, mas isso ainda nos deixa com o desafio de tomar decisões que funcionem bem ao longo do tempo. Por exemplo, atribuir um motorista a uma carga que vai para Montana, que é muito isolada, pode criar problemas quando o motorista termina a carga e precisa encontrar outra. Temos que pensar se sequer queremos aceitar a solicitação de mover essa carga, e, se aceitarmos, qual motorista atribuímos a ela? A resolução de sequências de problemas de atribuição está retratada na figura 3.3. Nossas carteiras de ações precisam funcionar bem mesmo à medida que os preços dos ativos variam ao longo do tempo, e as localizações de armazéns precisam antecipar padrões futuros de demanda.

No momento em que este livro está sendo escrito, entendemos que os problemas de estoque precisam ser otimizados ao longo do tempo. No entanto, a comunidade que se especializa em modelos de otimização para problemas complexos, como o problema de atribuição de motoristas, o problema de gestão de carteiras e o problema de localização de armazéns, cada um precisa refletir o efeito de novas informações e o impacto das decisões atuais sobre o futuro. Temos pacotes de software poderosos para resolver esses problemas em um ponto no tempo, mas nada para otimizar o desempenho ao longo do tempo.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DynamicAssignmentProblem.jpg" alt="O problema de atribuição precisa ser resolvido repetidamente, e as decisões tomadas em um ponto no tempo têm impacto sobre problemas futuros.">
  <figcaption><span class="fig-num">Figura 3.3.</span> Aqui ilustramos a realidade de que o problema de atribuição precisa ser resolvido repetidamente. Além disso, as decisões tomadas em um ponto no tempo têm impacto sobre problemas futuros.</figcaption>
</figure>

Quando temos problemas que precisam ser resolvidos repetidamente, precisamos capturar:

- O impacto de uma decisão agora sobre decisões posteriores.
- A chegada de novas informações que não conhecíamos previamente.

A chegada de novas informações introduz uma complicação significativa ao tomar decisões ao longo do tempo (e praticamente todos os problemas que são resolvidos ao longo do tempo têm que fazê-lo na presença de novas informações). Por exemplo, em nosso problema de atribuição, a nova informação pode ser a chegada de novas cargas a serem transportadas. As novas cargas a serem transportadas na terça-feira não seriam conhecidas quando estamos tomando decisões na segunda-feira. Como resultado, se estivermos atribuindo motoristas na segunda-feira, as cargas que podem ser solicitadas na terça-feira são incertas. Também poderíamos dizer que as cargas a serem solicitadas no futuro são "aleatórias" (ou "estocásticas," um termo preferido pela comunidade de modelagem matemática).

Para o problema de otimizar a atribuição de motoristas a cargas, precisamos capturar a chegada de novas cargas, e como as atribuições de motoristas em dias anteriores afetam o status dos motoristas hoje. Para avaliar o desempenho, executaríamos uma simulação que consistiria nas etapas:

- Começar resolvendo o problema na segunda-feira com as cargas conhecidas naquele momento.
- Avançar para a terça-feira e então observar as cargas que acabaram sendo solicitadas.
- Otimizar a atribuição de motoristas a cargas na terça-feira usando o que é conhecido.
- Avançar para a quarta-feira e repetir o processo.
- Repetir até atingirmos o final do nosso período de simulação.

Agora imagine que repetimos todo esse processo novamente começando na segunda-feira, mas, à medida que avançamos, amostramos diferentes conjuntos de cargas sendo solicitadas. Isso significa que poderíamos simular a tomada de decisões ao longo do tempo e obteríamos resultados completamente diferentes.

Existem diferentes maneiras de tomar decisões para atribuir motoristas a cargas que podem levar em conta o impacto das decisões atuais sobre o futuro. Imagine que temos três métodos. Poderíamos avaliar cada método executando simulações repetidas e depois tirando uma média. Por exemplo, poderíamos realizar 20 simulações de cada método de tomada de decisão e usar essa média para avaliar os métodos.

Problemas que envolvem tomar decisões ao longo do tempo são rotineiros; de fato, pode ser o caso de que eles representem a vasta maioria dos problemas de decisão. Todas as aplicações do Capítulo 2 são um problema de decisão sequencial. Por exemplo:

- Planejamento de estoque – Precisamos repetidamente pedir estoque que chega após algum tempo de espera (tipicamente aleatório), durante o qual ainda temos que atender pedidos que chegam. A regra que usamos para fazer pedidos (tipicamente conhecida como "política de estoque") precisa ser avaliada ao longo do tempo. Se os tempos de espera forem, digamos, de três meses, precisaríamos simular a política por vários anos, e fazer isso repetidamente.
- Decisões de preços e publicidade precisam ser tomadas ao longo do tempo, à medida que observamos como o mercado responde a esses incentivos. Uma decisão em um determinado momento gera informação (como a resposta do mercado) que pode ser usada para orientar futuras escolhas de publicidade. Ao mesmo tempo, essas decisões consomem o orçamento de publicidade.
- Decisões para geração e armazenamento de energia precisam ser tomadas ao longo do tempo à medida que observamos variações no clima, falhas de geradores e como o público responde às mudanças climáticas. Decisões sobre quais geradores ligar ou desligar mudam o estado físico do sistema no futuro.
- Tratamentos médicos envolvem decisões sobre realizar testes e experimentar diferentes tratamentos para ver como o paciente responde.
- A alocação de canetas de naloxona para lidar com overdoses de opioides precisa ser feita ao longo do tempo à medida que observamos como as autoridades de saúde e os usuários de drogas se adaptam à disponibilidade desse recurso.
- Campanhas presidenciais precisam tomar decisões sobre publicidade e agendamento de visitas de candidatos enquanto observam pesquisas para ver como os eleitores estão respondendo.
- Gestores de fundos mútuos precisam ajustar quanto caixa mantêm disponível enquanto observam mudanças no mercado e o padrão de depósitos e retiradas que seus clientes estão fazendo.

É de certa forma surpreendente que, embora a literatura sobre a resolução de problemas de decisão estáticos seja incrivelmente madura, a comunidade de pesquisa acadêmica que trabalha nesses problemas não tenha adotado uma estrutura padrão para modelar e resolver problemas sequenciais.

Voltaremos a essas questões no Volume II quando começarmos a usar um pouco de notação. Sem notação, a discussão se reduz a muita conversa vaga.

## Métricas de desempenho psicológicas

Praticamente toda a literatura de otimização assume que existe uma métrica de desempenho bem definida, chamada função objetivo, que pode ser usada para avaliar decisões. A função objetivo pode não ser conhecida com exatidão, mas assumimos que a incerteza pode ser quantificada ou pelo menos amostrada. Em contraste, a maior parte da literatura sobre a psicologia da tomada de decisão foca em como as pessoas avaliam alternativas complexas, o que provavelmente se explica pelo fato de que esses são os problemas de decisão mais interessantes e desafiadores.

Nesta seção, começaremos identificando algumas métricas complexas, seguidas de uma amostra de teorias sobre como as pessoas lidam com essas métricas complexas. Encerramos com uma breve discussão sobre como os cérebros "otimizam".

### Métricas complexas

Alguns exemplos de problemas de decisão complexos das aplicações no Capítulo 2 incluem:

- Qual é o melhor fornecedor para um componente complexo de um motor a jato que requer experiência especial em materiais?
- Qual é a melhor forma de comercializar um produto de consumo para maximizar as vendas?
- Qual é o melhor tratamento médico para lidar com câncer de pulmão em estágio 3?
- Qual é a melhor alocação de recursos em uma eleição presidencial (marketing, viagens para discursos)?
- Qual é a melhor estratégia para comercializar um sistema de despacho complexo para transportadoras rodoviárias de carga completa?

Cada um desses pode ser apresentado como um exemplo de um problema de "tentativa e erro inteligente" (veja a [seção Tentativa e erro inteligente](/bridging-vol1/pt-BR/chapter-2/#intelligenttrialanderror) do Capítulo 2) onde há um conjunto de escolhas discretas. O que torna essas escolhas difíceis é que a) elas são importantes e b) temos incerteza considerável sobre o quão bem cada uma delas terá desempenho.

Podemos dividir problemas com alternativas complexas em três classes:

- Sabemos quais métricas queremos usar, mas não sabemos seus valores.
- Existem múltiplas métricas, mas não sabemos (com precisão) sua importância relativa.
- Não somos capazes sequer de articular algumas ou todas as métricas para avaliar cada escolha.

A primeira classe atraiu atenção considerável da literatura de otimização, mas continua sendo um contexto muito comum que as pessoas enfrentam frequentemente, no qual elas deixam de usar os melhores métodos para lidar com a incerteza. A segunda é outro tópico comum e tipicamente envolve apresentar diferentes alternativas a um tomador de decisão, que então é solicitado a fazer uma escolha. A terceira é um problema comum na literatura de psicologia, já que existem problemas (como os listados acima) onde alguém pode ter uma intuição sobre qual escolha deseja fazer, sem conseguir articular por que ela é a melhor.

### Algumas teorias para formação de métricas

Exemplos de diferentes teorias para avaliar alternativas incluem:

**Teoria da perspectiva (prospect theory)** - Princípios-chave da teoria da perspectiva incluem:

- Aversão à perda – As pessoas sentem a dor das perdas de forma mais intensa do que o prazer de ganhos equivalentes. Por exemplo, perder \$100 feels worse than the joy of gaining \$100.
- Dependência de referência – As decisões são tomadas em relação a um ponto de referência, e não a resultados absolutos. Ganhos e perdas são percebidos em relação a essa referência.
- Aversão ao risco em ganhos, busca por risco em perdas – Diante de ganhos potenciais, as pessoas tendem a preferir resultados certos a resultados arriscados. No entanto, ao lidar com perdas, frequentemente assumem riscos maiores para evitar uma perda definitiva.
- Sensibilidade decrescente – O impacto das mudanças na riqueza diminui à medida que os valores aumentam. A diferença entre perder \$100 and \$200 parece mais significativa do que entre perder \$1,000 and \$1.100.
- Ponderação de probabilidade – As pessoas superestimam a probabilidade de eventos raros (por exemplo, ganhar na loteria) e subestimam a probabilidade de eventos comuns.

**Teoria da contabilidade mental** - Isso se refere à forma como as pessoas organizam, categorizam e avaliam mentalmente decisões financeiras, criando "contas" separadas em suas mentes, em vez de tratar o dinheiro como totalmente intercambiável/fungível. Alguns conceitos-chave incluem:

- Categorização: As pessoas atribuem dinheiro a diferentes orçamentos mentais (por exemplo, aluguel, mercado, entretenimento) e frequentemente tomam decisões de gastos com base na categoria, em vez da posição financeira geral.
- Enquadramento: A mesma quantidade de dinheiro pode ser valorizada de forma diferente dependendo de como foi adquirida — por exemplo, \$100 windfall may be spent more freely than \$100 ganhos com trabalho. Isso explica por que algumas pessoas podem se dar ao luxo de gastar com uma restituição de imposto de renda enquanto são rígidas em relação a despesas do dia a dia.
- Falácia do custo irrecuperável: As pessoas frequentemente continuam com um empreendimento perdedor (como assistir a um show ruim pelo qual pagaram) porque "gastaram" mentalmente o dinheiro, mesmo que ele seja irrecuperável.

**Teoria da atribuição** - A teoria da atribuição explica como as pessoas interpretam as causas de seu próprio comportamento e do comportamento de outros, especialmente em contextos de realização, como sucesso ou fracasso. Por exemplo, os consumidores atribuem razões às suas decisões de compra, influenciando a percepção e a lealdade à marca. Três dimensões dos atributos causais incluem:

- Lugar de controle (locus) – A causa é interna (por exemplo, habilidade, esforço) ou externa (por exemplo, sorte, dificuldade da tarefa)?
- Estabilidade – A causa é estável (consistente ao longo do tempo) ou instável (variável)?
- Controlabilidade – A pessoa pode controlar a causa (como o esforço), ou ela é incontrolável (como habilidade inata ou sorte)?

Essas atribuições influenciam emoções e motivação futura. Por exemplo:

- Atribuir o sucesso a fatores internos e controláveis (como o esforço) aumenta a motivação e o orgulho.
- Atribuir o fracasso a fatores internos e incontroláveis (como falta de habilidade) pode levar à vergonha e ao desânimo. A teoria de Weiner é amplamente usada em contextos educacionais, esportivos e organizacionais para entender como as crenças sobre as causas moldam o comportamento e o desempenho.

### Como o cérebro aprende a otimizar

Tem havido uma enorme tendência a atribuir inteligência às redes neurais que são usadas para aprender padrões de palavras. Embora reconhecer padrões seja, de fato, uma forma importante de inteligência, ela é claramente diferente do processo de tomar decisões, algo que os humanos são bastante capazes de fazer. Tomar decisões requer a capacidade de maximizar recompensas que sejam específicas para alcançar algum objetivo, que pode estar relacionado a comer, estar confortável, evitar dor, vencer uma competição ou resolver um problema.

Acontece que o cérebro possui funções muito específicas que ajudam a otimizar um objetivo que não tem nada a ver com simplesmente identificar um padrão. Isso é feito com partes do cérebro conhecidas como receptores de recompensa, que são proteínas especializadas que respondem a neurotransmissores, como a dopamina, para ajudar o cérebro a experimentar prazer, motivação e reforço positivo ou negativo. Os neurotransmissores são como fechaduras moleculares que são ativadas quando a chave química certa se liga a elas, o que então desencadeia atividades neurais que orientam o comportamento.

Tipos de receptores de recompensa são:

- **Receptores de dopamina** – Estes são os elementos mais importantes do sistema de recompensa, que existem em diferentes formas:
  - Receptores D1, que promovem o aprendizado por reforço e ajudam a manter a motivação de longo prazo.
  - Receptores D2, que estão envolvidos na ligação social e na regulação do humor.
  - Receptores D3, que desempenham um papel na motivação e no comportamento orientado a objetivos.
- **Receptores opioides** – Estes respondem a endorfinas e outros opioides naturais, contribuindo para sensações de euforia e alívio da dor.
- **Receptores de serotonina** – Estes influenciam o humor e a recompensa emocional e são frequentemente usados como alvo por antidepressivos.
- **Receptores de glutamato** – Estes ajudam a codificar o aprendizado e a memória relacionados à recompensa.

Obviamente, qualquer discussão sobre esses mecanismos incrivelmente complexos está muito além do escopo deste livro. O ponto que estamos destacando é que o cérebro possui mecanismos específicos para maximizar recompensas, que é como ele consegue escolher a melhor decisão. Esse é um processo distinto dos poderosos mecanismos do cérebro para identificar padrões. Em contraste, as redes neurais usadas por grandes modelos de linguagem são treinadas para identificar padrões em textos; elas usam uma única função objetivo, que captura a similaridade entre uma função (a rede neural) e o conjunto de dados de treinamento.

## Definindo metas de desempenho para outros

Uma dimensão importante das métricas é o estabelecimento de metas com o propósito de avaliar o desempenho de pessoas ou grupos. Isso implica inerentemente um ambiente multiagente, no qual um tomador de decisão tem a autoridade para estabelecer metas de desempenho para outra unidade em uma organização. Em um ambiente multiagente, a meta de um agente pode ser a decisão tomada por outro agente (presumivelmente de nível mais alto).

O estabelecimento de metas é uma área particularmente rica no contexto de organizações com múltiplas unidades de tomada de decisão, tipicamente organizadas de forma hierárquica. Voltaremos a esse tópico em um volume futuro.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Nomeie cinco exemplos de métricas de desempenho.</li>
<li>O que se entende por objetivos, metas e limites? Dê um exemplo de métricas que se enquadrariam em cada uma dessas três categorias. Você pode usar métricas de qualquer um dos exemplos do Capítulo 2 (elas não precisam vir todas do mesmo exemplo).</li>
<li>O que é um evento de risco? Dê exemplos de eventos de risco se você for:
  <ol type="a">
    <li>O operador da rede elétrica de uma região.</li>
    <li>Um médico trabalhando com um paciente para gerenciar seu diabetes.</li>
    <li>O diretor financeiro de uma cadeia de suprimentos.</li>
  </ol>
</li>
<li>Nomeie duas teorias sobre como as pessoas avaliam escolhas.</li>
<li>Nomeie quatro receptores que o cérebro usa para recompensar comportamentos específicos.</li>
<li>Para cada um dos exemplos de eventos de risco no exercício 3, projete uma métrica de risco para esse evento.</li>
</ol>

**Questões de modelagem**

<p>Para cada questão abaixo, projete uma pirâmide de métricas usando as métricas fornecidas para a aplicação designada, dado o tomador de decisão especificado.</p>

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>Você é um gerente de cadeia de suprimentos responsável por escolher fornecedores para os componentes de um ar-condicionado. Os fornecedores podem estar em qualquer lugar do mundo.</li>
<li>Você precisa reabastecer os estoques de diferentes tipos de móveis para uma loja de varejo de móveis.</li>
<li>Você precisa planejar investimentos em nova capacidade de geração de energia (esses pedidos são feitos com até cinco anos de antecedência).</li>
<li>Você é o gerente de receita de um hotel.</li>
<li>Você é o médico que escolhe o tratamento para um paciente diabético.</li>
<li>Você é o funcionário estadual que precisa alocar kits de naloxona entre os condados do seu estado.</li>
<li>Você é uma empresa farmacêutica que precisa escolher quais medicamentos colocar em ensaios de Fase II.</li>
<li>Você é o gerente de campanha de uma eleição presidencial.</li>
<li>Você é o vice-presidente de operações de uma transportadora de carga fechada que precisa gerenciar despachantes (que designam motoristas para as cargas) e gerentes de carga (que decidem quais cargas transportar).</li>
<li>Você é o gestor de um fundo mútuo que precisa determinar quanto dinheiro manter disponível.</li>
</ol>
{% endraw %}
