---
layout: book
title: "Capítulo 5: Incertezas"
permalink: /bridging-vol1/pt-BR/chapter-5/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: cac007f7f894240f
---


{% raw %}
<p class="book-byline"><em>Conectando Problemas de Decisão, Volume I — Formulando o Problema</em> &middot; Warren B. Powell</p>

Problemas de decisão sequencial invariavelmente têm que lidar com incerteza, que é tipicamente a dimensão mais desafiadora de tomar decisões ao longo do tempo. Há três maneiras pelas quais a incerteza afeta o desempenho do nosso sistema:

1. A decisão que tomamos em um ponto no tempo não é implementada corretamente.
2. O desempenho do sistema dada nossa decisão não é o mesmo que estimamos quando tomamos a decisão.
3. O impacto de uma decisão agora sobre o futuro não é estimado corretamente devido a mudanças à medida que avançamos no tempo.

Embora listemos apenas três maneiras pelas quais a incerteza afeta o desempenho, a incerteza surge de muitas formas, razão pela qual algumas formas de incerteza são frequentemente negligenciadas no processo de modelagem. De fato, a maioria dos usos de ferramentas de otimização ignora todas as formas de incerteza, refletindo tipicamente o aumento dramático de incerteza introduzido ao modelar explicitamente qualquer forma de incerteza.

Um objetivo deste capítulo é destacar as diferentes maneiras pelas quais a incerteza pode surgir. Isso não significa que os modelos precisem incorporar todas as formas de incerteza. No entanto, a decisão de ignorar uma forma de incerteza deve ser uma escolha explícita, e não apenas porque um modelador a negligenciou.

## As 12 classes de incerteza {#12classesofuncertainty}

Uma maneira de abordar a identificação de fontes de incerteza é trabalhar de trás para frente a partir de um modelo matemático. Abaixo estão 12 classes de incerteza criadas a partir da perspectiva de como a incerteza pode entrar em um modelo. Problemas complexos, como gerenciar uma cadeia de suprimentos, um sistema de energia ou resolver um problema de saúde pública, envolverão todas as 12 classes, enquanto problemas simples como jogar xadrez podem envolver apenas uma.

Há certa sobreposição nas classes, então não se preocupe se houver alguma ambiguidade em termos de onde listar uma fonte de incerteza. O importante é identificar o maior número possível de diferentes formas de incerteza.

1. **Erros observacionais** – Estes representam erros em quantidades e parâmetros que temos que observar do ambiente. Alguns exemplos podem ser:
   - O estoque atual de um produto conforme representado no computador, que pode não corresponder ao que está realmente disponível.
   - Raios-X médicos de um paciente para detectar câncer.
   - A fração de eleitores que preferem um determinado candidato a um cargo político.
2. **Incerteza exógena** – Esta é a informação que chegará ao nosso sistema após tomar uma decisão, tal como:
   - A demanda por um produto sendo vendido no mercado.
   - A mudança no preço de uma ação.
   - O tempo necessário para dirigir de uma cidade para a próxima.
   - A quantidade de dinheiro que pode ser depositada ou retirada amanhã.
   - Como um paciente responde a um tipo de medicação.
3. **Incerteza prognóstica** – Esta é a incerteza em previsões de demandas, preços, tempos de viagem (qualquer quantidade que possamos estar prevendo).
4. **Incerteza inferencial** – Esta captura a incerteza em nossas estimativas do estado do mundo agora. Isso pode incluir:
   - Como o mercado pode responder a uma mudança de preço. Podemos pensar que há uma queda de 10 por cento na demanda para um aumento de 5 por cento no preço, mas o valor verdadeiro pode ser que a demanda caia 12 por cento.
   - Pensamos que um paciente com câncer está no estágio 2, mas pode estar no estágio 3. Podemos detectar câncer de mama, mas deixar de perceber que ele se espalhou para outros órgãos.
   - Uma campanha presidencial pode pensar que \$10 milhões em gastos com publicidade em um grande mercado podem produzir um aumento de 2 por cento na favorabilidade de um candidato, mas a realidade pode ser maior ou menor.
5. **Incerteza experimental** – Isso descreve a variação de executar experimentos repetidos seja em um laboratório, um simulador, ou no campo:
   - Um fabricante executa experimentos de um processo para fabricar wafers de silício. O teste pode ser repetido 10 vezes, produzindo uma variação de rendimentos entre 70 e 90 por cento.
   - Uma empresa está avaliando uma nova campanha de marketing executando-a em cinco mercados de teste diferentes. Haverá variações entre os mercados, e ao longo do tempo.
   - Um simulador de computador é usado para testar o desempenho de uma política de pedidos de estoque. Cada execução do simulador produzirá resultados diferentes.
6. **Incerteza do modelo** – Este é um termo abrangente que pode cobrir múltiplas fontes de incerteza, mas uma das mais importantes é a incerteza no modelo de como um processo evolui ao longo do tempo. Exemplos podem ser:
   - Como o clima responde a mudanças nas políticas de controle de carbono.
   - Como um paciente responde a injeções de insulina.
   - Como uma doença se espalha em uma população em resposta a mudanças nas políticas relativas à distribuição de vacinas.
7. **Incerteza transicional** – Este é o ruído em como um sistema responde a um controle. O exemplo mais simples seria controlar a trajetória de um foguete ou aeronave, que é afetada por vento. Normalmente assumimos que a evolução do sistema é conhecida e determinística, mas é afetada por um processo exógeno (como o vento).
8. **Incerteza de implementação** – Pode haver uma diferença entre o que decidimos fazer, e a decisão que é realmente implementada no campo. Por exemplo:
   - O médico prescreve uma medicação específica, mas o paciente não a toma, ou toma a dose errada.
   - Um cientista quer testar uma combinação específica de materiais, mas o estagiário solicita um item incorreto (erros como este podem produzir grandes avanços!).
   - A rede elétrica ordena que um gerador seja ligado às 13h, mas o operador local só liga o gerador às 14h.
9. **Erros de comunicação** – Instruções para o campo podem ser simplesmente mal comunicadas. A pessoa que recebe a instrução pode pensar que está fazendo o que foi solicitado, mas simplesmente não ouviu ou entendeu uma instrução.
10. **Instabilidade algorítmica** – Existem algumas configurações em que executar um algoritmo repetidamente pode retornar soluções diferentes:
    - Problemas complexos frequentemente requerem o uso de algoritmos sofisticados que introduzem um elemento de variabilidade, o que frequentemente surge quando um algoritmo usa processamento paralelo. A velocidade dos processadores paralelos pode afetar quem termina primeiro, o que pode afetar o caminho geral do algoritmo.
    - Algoritmos para resolver problemas de otimização estocástica frequentemente dependem de amostragem Monte Carlo, que produzirá resultados diferentes cada vez que o algoritmo for executado (isso é visto ao executar modelos de linguagem de grande escala).
11. **Incerteza de objetivo** – Empresas que exigem que grupos de pessoas tomem decisões (despachar caminhões, negociar ativos financeiros, dar lances em contratos de energia) podem exibir variações porque pessoas diferentes enfatizam métricas de desempenho diferentes.
12. **Incerteza ambiental** – Aqui, "ambiente" pode refletir o clima, ou um ambiente político (que pode impactar políticas ou tarifas), ou uma nova gestão em uma empresa (o que resulta em uma mudança de prioridades).

## Exemplos de aplicações selecionadas {#examples-from-selected-applications}

Ajuda ver exemplos de cada uma das 12 classes para algumas das aplicações que introduzimos no Capítulo 2. Para cada aplicação, descrevemos um ou mais exemplos das incertezas para cada classe, observando que aplicações mais simples não terão incertezas para todas as 12 classes. É importante lembrar que o verdadeiro objetivo aqui é reconhecer o maior número possível de fontes de incerteza. Como essas incertezas são refletidas no processo de tomada de decisão virá em volumes futuros.

### Gestão de caixa para um fundo mútuo

Um fundo mútuo tem que determinar quanto dinheiro manter disponível para atender solicitações de resgate, e à medida que depósitos são feitos, tanto por investidores individuais quanto institucionais.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.1.</span> Incertezas que surgem no problema de saldo de caixa do fundo mútuo.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Saldo de caixa do fundo mútuo</th></tr>
</thead>
<tbody>
<tr><td>1. Incerteza observacional</td><td></td></tr>
<tr><td>2. Incerteza exógena</td><td>Depósitos, resgates, índices de mercado</td></tr>
<tr><td>3. Incerteza prognóstica</td><td>Previsões de depósitos, resgates, índices de mercado, taxas de juros</td></tr>
<tr><td>4. Incerteza inferencial</td><td>Estimar como os resgates mudam com o desempenho do mercado</td></tr>
<tr><td>5. Variabilidade experimental</td><td>Testar diferentes políticas para manter caixa</td></tr>
<tr><td>6. Incerteza do modelo</td><td></td></tr>
<tr><td>7. Incerteza transicional</td><td>Atualizar quanto caixa está disponível</td></tr>
<tr><td>8. Incerteza de implementação</td><td></td></tr>
<tr><td>9. Erros de comunicação</td><td></td></tr>
<tr><td>10. Instabilidade algorítmica</td><td></td></tr>
<tr><td>11. Incerteza de objetivo</td><td>Equilibrar maximizar retornos de investimento, minimizar vendas de ações para resgates</td></tr>
<tr><td>12. Incerteza ambiental</td><td>Mudanças nas taxas de juros</td></tr>
</tbody>
</table>
</div>

### Encontrando o melhor tratamento para diabetes

Pacientes diabéticos têm que gerenciar seu açúcar no sangue usando uma combinação de medicações (talvez usando uma bomba de insulina) e dieta.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.2.</span> Incertezas que surgem na gestão do açúcar no sangue.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Gerenciando o açúcar no sangue</th></tr>
</thead>
<tbody>
<tr><td>Incerteza observacional</td><td>Medir níveis de A1c</td></tr>
<tr><td>Incerteza exógena</td><td>O que um paciente come</td></tr>
<tr><td>Incerteza prognóstica</td><td>Antecipar mudanças nos níveis de açúcar no sangue após uma refeição</td></tr>
<tr><td>Incerteza inferencial</td><td>Estimar como o açúcar no sangue de um paciente responde à medicação</td></tr>
<tr><td>Variabilidade experimental</td><td>Mudanças no açúcar no sangue para diferentes tipos de medicação</td></tr>
<tr><td>Incerteza do modelo</td><td>Modelar como um paciente responde a um tipo de medicação</td></tr>
<tr><td>Incerteza transicional</td><td></td></tr>
<tr><td>Incerteza de implementação</td><td>Se um paciente segue as instruções de seu médico</td></tr>
<tr><td>Erros de comunicação</td><td>Se um paciente entende mal as instruções do médico</td></tr>
<tr><td>Instabilidade algorítmica</td><td></td></tr>
<tr><td>Incerteza de objetivo</td><td>Equilibrar redução do açúcar no sangue vs. problemas de digestão</td></tr>
<tr><td>Incerteza ambiental</td><td></td></tr>
</tbody>
</table>
</div>

### Gestão da cadeia de suprimentos

Cadeias de suprimentos exigem o gerenciamento de estoques que têm que ser coordenados em todo o sistema.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.3.</span> Incertezas que surgem na gestão da cadeia de suprimentos.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Gestão da cadeia de suprimentos</th></tr>
</thead>
<tbody>
<tr><td>1. Incerteza observacional</td><td>Medição de estoque</td></tr>
<tr><td>2. Incerteza exógena</td><td>Demanda de mercado, clima, tempos de trânsito</td></tr>
<tr><td>3. Incerteza prognóstica</td><td>Previsão de demandas, produção, demissões</td></tr>
<tr><td>4. Incerteza inferencial</td><td>Resposta do mercado ao preço, taxas de falha de máquinas</td></tr>
<tr><td>5. Variabilidade experimental</td><td>Erros de simulação, teste de novos materiais, teste de mercado</td></tr>
<tr><td>6. Incerteza do modelo</td><td>Como a informação se propaga no mercado, como os funcionários respondem a incentivos</td></tr>
<tr><td>7. Incerteza transicional</td><td>Atualização de estoques</td></tr>
<tr><td>8. Incerteza de implementação</td><td>Falha em seguir instruções</td></tr>
<tr><td>9. Erros de comunicação</td><td>Instruções incorretas para fornecedores</td></tr>
<tr><td>10. Instabilidade algorítmica</td><td>Variações na solução ótima a partir dos cronogramas de produção</td></tr>
<tr><td>11. Incerteza de meta</td><td>Diferenças de prioridades entre custo de produção vs. atendimento da demanda</td></tr>
<tr><td>12. Incerteza ambiental</td><td>Mudanças em tarifas, taxas de câmbio, taxas de juros</td></tr>
</tbody>
</table>
</div>

### Alocação de kits de naloxona

Agências estatais precisam alocar kits de naloxona para atender às necessidades de clínicas locais e profissionais médicos que estão tratando pacientes.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.4.</span> Incertezas que surgem na gestão de kits de naloxona.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Gestão de kits de naloxona</th></tr>
</thead>
<tbody>
<tr><td>Incerteza observacional</td><td>O número de kits de naloxona em estoque</td></tr>
<tr><td>Incerteza exógena</td><td>O número de eventos que requerem o uso de kits de naloxona</td></tr>
<tr><td>Incerteza prognóstica</td><td>Estimativas de mudanças nos padrões de uso de drogas</td></tr>
<tr><td>Incerteza inferencial</td><td>Estimativas de como a disponibilidade dos kits afeta seu uso</td></tr>
<tr><td>Variabilidade experimental</td><td></td></tr>
<tr><td>Incerteza do modelo</td><td>Compreender como os padrões de uso de drogas mudam ao longo do tempo</td></tr>
<tr><td>Incerteza transicional</td><td>Mudanças nos estoques de kits de naloxona de semana para semana</td></tr>
<tr><td>Incerteza de implementação</td><td>Se os kits são usados corretamente; se as instruções de alocação são seguidas</td></tr>
<tr><td>Erros de comunicação</td><td>Se os representantes de campo seguem as instruções ao distribuir os kits</td></tr>
<tr><td>Instabilidade algorítmica</td><td></td></tr>
<tr><td>Incerteza de meta</td><td>Priorização de quem receber kits de naloxona</td></tr>
<tr><td>Incerteza ambiental</td><td>Disponibilidade de financiamento para kits de naloxona</td></tr>
</tbody>
</table>
</div>

### Gestão de uma frota de caminhões

Empresas de transporte de carga completa (truckload) precisam determinar quais cargas movimentar, com qual motorista.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.5.</span> Incertezas que surgem na gestão de uma frota de caminhões.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Gestão de uma frota de caminhões</th></tr>
</thead>
<tbody>
<tr><td>Incerteza observacional</td><td></td></tr>
<tr><td>Incerteza exógena</td><td>Novas cargas de embarcadores; atribuições recusadas por motoristas; atrasos no tráfego</td></tr>
<tr><td>Incerteza prognóstica</td><td>Previsões de cargas no futuro</td></tr>
<tr><td>Incerteza inferencial</td><td>Como o mercado responderá a mudanças nos preços spot</td></tr>
<tr><td>Variabilidade experimental</td><td>Execução de simulações de mudanças nas alocações de motoristas</td></tr>
<tr><td>Incerteza do modelo</td><td></td></tr>
<tr><td>Incerteza transicional</td><td>Mudanças no número de cargas disponíveis; atualizações na disponibilidade de motoristas</td></tr>
<tr><td>Incerteza de implementação</td><td>Se um despachante segue a instrução do modelo</td></tr>
<tr><td>Erros de comunicação</td><td>Se os despachantes seguem as instruções de seus gerentes</td></tr>
<tr><td>Instabilidade algorítmica</td><td>Mudanças na solução a partir de atualizações das estimativas de valor dos motoristas</td></tr>
<tr><td>Incerteza de meta</td><td>Equilibrar milhas vazias contra compromissos com embarcadores contra levar motoristas para casa</td></tr>
<tr><td>Incerteza ambiental</td><td>Mudanças nas regras de horas de serviço pelo Departamento de Transporte</td></tr>
</tbody>
</table>
</div>

### Planejamento de uma rede elétrica

A rede elétrica precisa trabalhar com concessionárias para determinar quais geradores devem ser ligados para atender às demandas previstas impostas à rede.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabela 5.6.</span> Incertezas que surgem na gestão da rede elétrica.</caption>
<thead>
<tr><th>Classes de incerteza</th><th>Gestão da rede elétrica</th></tr>
</thead>
<tbody>
<tr><td>Incerteza observacional</td><td>Estimativa de temperatura, clima, atitudes dos clientes</td></tr>
<tr><td>Incerteza exógena</td><td>Mudanças no clima, falhas de geradores</td></tr>
<tr><td>Incerteza prognóstica</td><td>Previsões de temperatura, vento, cobertura de nuvens</td></tr>
<tr><td>Incerteza inferencial</td><td>Estimativa de como a demanda de energia muda conforme os preços da rede mudam</td></tr>
<tr><td>Variabilidade experimental</td><td>Variabilidade na resposta a mudanças nos parâmetros do modelo</td></tr>
<tr><td>Incerteza do modelo</td><td>Erros na evolução das velocidades do vento sobre a região geográfica</td></tr>
<tr><td>Incerteza transicional</td><td>Diferença entre a energia eólica esperada e a real</td></tr>
<tr><td>Incerteza de implementação</td><td>Diferenças entre as instruções às concessionárias e o que elas fazem</td></tr>
<tr><td>Erros de comunicação</td><td>Erros na compreensão das instruções comunicadas às concessionárias</td></tr>
<tr><td>Instabilidade algorítmica</td><td>Variações no desempenho do algoritmo de programação inteira</td></tr>
<tr><td>Incerteza de meta</td><td>Equilibrar o uso de energia nuclear vs. carvão vs. renováveis</td></tr>
<tr><td>Incerteza ambiental</td><td>Mudanças nas políticas de reembolso pelo excesso de geração solar</td></tr>
</tbody>
</table>
</div>

## Como a incerteza afeta o desempenho

Embora tenhamos identificado 12 classes de incerteza, existem apenas três maneiras pelas quais a incerteza afeta o comportamento de um modelo:

1. Como as decisões são tomadas.
2. As métricas de desempenho resultantes das decisões escolhidas no modelo.
3. A evolução do sistema no modelo após uma decisão ser tomada, e antes que as próximas decisões precisem ser tomadas.

Em seguida, há as maneiras pelas quais a incerteza afeta o desempenho no campo:

<ol start="4">
<li>As decisões que são implementadas no campo.</li>
<li>As métricas de desempenho reais para as decisões implementadas no campo.</li>
<li>A evolução do sistema no campo.</li>
</ol>

Há muitas maneiras pelas quais a incerteza afeta o desempenho, desde custos aleatórios até a forma como um paciente responde a um medicamento ou o preço de um investimento. Por ora, vamos apenas nos concentrar em identificar como a incerteza afeta o desempenho.

## Diferentes formas de incerteza

O primeiro passo para entender a incerteza requer listar as diferentes fontes de incerteza, como fizemos acima. O próximo passo, então, é descrever as diferentes formas em que a incerteza surge. Abaixo está uma amostra dessas formas:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Produção horária de energia solar ao longo de um ano completo, demonstrando variabilidade tanto intradiária quanto sazonal." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 5.1.</span> Produção horária de energia solar ao longo de um ano completo, demonstrando variabilidade tanto intradiária quanto sazonal.</figcaption>
</figure>

- **Variabilidade de granularidade fina** – Isso pode ocorrer em escalas de tempo de segundos (mesmo frações de segundo), minutos, horas ou diariamente. Exemplos de variabilidade de granularidade fina são:
  - Negociação de alta frequência em finanças - Essas decisões são tomadas várias vezes por segundo.
  - Regulação de frequência para a rede elétrica - Esses são sinais enviados a cada dois segundos aos geradores para fazer ajustes de modo que a tensão da rede permaneça dentro de uma faixa estreita.
  - Vendas horárias de diferentes opções de comida em restaurantes, que podem exigir algum preparo antes do serviço.
  - As variações horárias nas velocidades do vento, mostradas na figura 5.1. Esta figura também capturaria variações horárias a diárias na cobertura de nuvens, tudo no contexto de variações sazonais previsíveis.
  - Vendas diárias de um produto de varejo.
  - Variações diárias a semanais nas internações hospitalares por gripe.

- **Mudanças de nível (shifts)** – A variabilidade de granularidade fina de um processo tipicamente representa variações em torno de uma média, mas há momentos em que a média sofrerá uma mudança. Exemplos são:
  - As demandas aleatórias por um produto de varejo podem mudar como resultado de uma alteração no preço, seja do próprio produto ou de um produto concorrente.
  - A taxa de internações hospitalares por uma doença infecciosa mudará conforme a doença se propaga pela população próxima ao hospital.
  - As demandas por resgates de um fundo mútuo, que variam a cada minuto, mudarão quando o mercado de ações mais amplo responder a uma economia em transformação.
  - O número de pessoas fazendo ofertas por casas (digamos, para um determinado corretor) mudará para níveis diferentes conforme as taxas de juros mudam.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/Bursts.png" alt="Ilustração de rajadas de atividade." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.2.</span> Ilustração de rajadas de atividade.</figcaption>
</figure>

- **Rajadas, demandas intermitentes** – Estas descrevem padrões em que há pouca ou nenhuma atividade, mas que então passam por uma rajada até se dissiparem novamente (ver figura 5.2). Exemplos de rajadas incluem:
  - Propagação de doenças como o sarampo – Quando uma doença entra em uma região, haverá um período de aumento de infecções conforme a doença se move pela parte mais vulnerável da população.
  - Um produto pode não estar vendendo, até que alguém o compre por acaso e depois divulgue quando tiver uma boa experiência. Isso se propagará por sua rede até que ela esteja saturada.

- **Picos (spikes)** – Um processo pode refletir duas fontes motrizes. Uma produz resultados modestos a partir de uma distribuição bem definida. A segunda representa resultados infrequentes que são muito maiores do que os da primeira distribuição. Por exemplo:
  - O preço da eletricidade na rede é atualizado a cada 5 minutos. A figura 5.3 mostra os preços em tempo real da rede para o mês de fevereiro. Ela mostra uma sequência constante de mudanças aleatórias, com picos ocasionais que são muito maiores do que as variações típicas.
  - Uma tempestade provoca uma corrida de compras de leite, ovos e papel higiênico.
  - Um sistema de tempestade passando perto de um aeroporto pode resultar em vários cancelamentos de voos, o que, por sua vez, pode criar um grande número de solicitações de última hora por quartos de hotel.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/RealTimePricesFebruary.png" alt="Preços de eletricidade em tempo real, atualizados a cada cinco minutos, em fevereiro, ilustrando volatilidade extrema." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.3.</span> Preços de eletricidade em tempo real, atualizados a cada cinco minutos, em fevereiro, ilustrando volatilidade extrema.</figcaption>
</figure>

- **Eventos espaciais (clima, doenças, regulatórios)** – Há inúmeros exemplos de processos aleatórios que são regionais por natureza. Alguns exemplos são:
  - Clima – Tempestades podem criar uma série de eventos aleatórios em uma região atingida por mau tempo, ou onde mau tempo é previsto.
  - Doenças – Como a propagação de doenças frequentemente requer contato físico, surtos tipicamente seguem um padrão regional.
  - Regulações – Mudanças em regulações tipicamente seguem fronteiras políticas, que podem ser de um país, ou de um estado, distrito ou província dentro de um país.
- **Eventos sistêmicos** – Estes são eventos que podem afetar uma empresa inteira (abrangendo fronteiras internacionais), um país inteiro, ou até ter impacto global, tais como:
  - Ataques cibernéticos, que podem impactar os fluxos de informação de uma empresa inteira.
  - Percepção pública – Eventos públicos podem produzir percepções positivas ou negativas rápidas sobre uma empresa. Por exemplo, uma empresa de cerveja realizou uma campanha para promover a comunidade LGBTQ, o que produziu uma reação repentina negativa de seus clientes conservadores, impactando as vendas em toda a empresa.
- **Eventos raros** – Eventos raros podem surgir de diversas fontes, como terremotos, surtos de doenças ou ataques terroristas. Estes tendem a ser eventos reconhecidos que ocorrem raramente, mas que podem ter um grande impacto em uma organização quando acontecem.
- **Contingências** – Esta categoria se refere a eventos que podem acontecer, mas para os quais não há histórico. Por exemplo, operadores de rede elétrica planejarão para uma falha de usinas nucleares. Embora isso possa nunca ter acontecido dentro de um país, o operador de rede pode ainda querer se preparar para o evento caso ele ocorra.

## Sazonalidade

Uma forma diferente de variabilidade é capturada sob o termo geral "sazonalidade", que aparece em várias formas:

- **Ciclos diários** – Também conhecidos como ciclos diurnos, estes são, em última análise, todos derivados de ciclos solares, mas podem induzir padrões diários fortes nas atividades humanas. Ciclos diários são tipicamente discretizados em horas, mas discretizações mais finas (5 minutos, 1 minuto) podem surgir.
- **Dia da semana** – Isso reflete os padrões diários no comportamento humano organizados em torno dos diferentes dias da semana.
- **Hora da semana** – Padrões horários podem facilmente depender tanto do dia da semana quanto da hora do dia para capturar efeitos como segunda-feira de manhã, sexta-feira à tarde, e padrões diários em dias úteis versus fins de semana.
- **Semana do mês** – A manufatura frequentemente tem um esforço para maximizar a produção por mês, criando um incentivo para escoar o produto antes do final do mês. Isso cria um surto em direção ao final do mês, seguido por uma calmaria.
- **Mês do ano** – Isso captura os padrões sazonais familiares de inverno, primavera, verão e outono.
- **Semana do ano** – Mudanças sazonais podem ocorrer dentro de um mês, incentivando o uso da semana-do-ano como um incremento de tempo sazonal.

A Figura 5.4 (esquerda) mostra a produção de energia solar ao longo de uma semana, ilustrando tanto o padrão familiar e altamente previsível criado pelo sol, quanto a interferência causada pela presença altamente estocástica de cobertura de nuvens. A Figura 5.4 (direita) mostra a energia solar horária ao longo de todo o ano, onde podemos ver claramente a redução na energia solar durante a estação de inverno.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DailyAnnualSolarEnergy.jpg" alt="Energia solar diária ao longo de uma semana (esquerda), e energia solar anual (direita).">
  <figcaption><span class="fig-num">Figura 5.4.</span> Energia solar diária ao longo de uma semana (esquerda), e energia solar anual (direita).</figcaption>
</figure>

## Criando crenças

Se estivermos modelando incerteza no computador, temos que encontrar uma forma de representá-la. Abaixo estão várias estratégias populares.

- Dados históricos podem ser usados para ajustar uma distribuição de probabilidade conhecida – Há uma família inteira de distribuições de probabilidade que podemos usar para ajustar a dados históricos, sendo a mais conhecida a distribuição normal. Retornaremos a este tópico rico mais adiante.
- Usar dados históricos para criar um modelo de crença amostrado – Imagine que temos tempos de viagem variando de 50 a 80 minutos para uma viagem, dependendo do tráfego. Podemos usar qualquer uma de várias distribuições de probabilidade para representar essa incerteza, ou podemos simplesmente usar uma amostra de observações passadas, tais como:

  > (52, 63, 78, 59, 71, 68)

- Usar dados históricos para criar uma distribuição de quantis a partir da qual amostras podem ser extraídas – Suponha que temos uma amostra de 10 observações de preços de eletricidade, dadas na figura 5.5 (esquerda). Após ordenar os preços do menor para o maior, então mostramos a probabilidade cumulativa dada na figura 5.5 (direita). Assim, diríamos que 60 por cento das observações são de \$86,33 ou menos. Estas são então plotadas na distribuição cumulativa à direita.

  Também é possível criar manualmente uma distribuição cumulativa usando julgamento.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/EmpiricalCDF.png" alt="Computando uma CDF empírica a partir de um conjunto de observações." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.5.</span> Computando uma CDF empírica a partir de um conjunto de observações.</figcaption>
</figure>

- Usar resultados criados manualmente para representar eventos que possam acontecer – Quando não temos dados, podemos simplesmente inventar resultados possíveis. Por exemplo, podemos estar enviando produtos de Taiwan, o que normalmente leva quatro semanas. No entanto, podemos imaginar várias formas de atrasos, desde furacões até engarrafamentos no Canal de Suez, problemas trabalhistas em portos ou até ataques terroristas. Podemos achar que temos que considerar a possibilidade de que o envio possa levar até nove semanas, e então planejar para essa contingência.

## O problema das correlações

A seção anterior é um breve panorama de formas de representar a incerteza em uma estimativa. No entanto, uma vez que seguimos pelo caminho de reconhecer a incerteza, temos que enfrentar a questão muito mais complexa das correlações.

Ajuda ter alguns exemplos de processos de informação em mente para ilustrar diferentes formas de correlação. Suponha que possamos estar considerando quaisquer dos seguintes fluxos de dados:

1. Clientes comprando um produto de varejo em muitos pontos de venda.
2. O tempo de espera entre fazer um pedido e recebê-lo.
3. A energia gerada por um parque eólico.
4. A taxa de novas infecções pela cepa mais recente de gripe.
5. O número de movimentações de carga completa (truckload) oferecidas por um cliente para diferentes localidades.

Estes são apenas uma pequena amostra dos tipos de fluxos de informação com os quais teremos que lidar. Abaixo usamos estes exemplos para falar sobre três tipos diferentes de correlações:

- Correlações ao longo do tempo.
- Correlações ao longo da geografia.
- Correlações ao longo de atributos.

### Correlações ao longo do tempo

Todos os problemas de decisão sequencial envolvem o elemento tempo, que pode estar em praticamente qualquer escala de tempo, de segundos, minutos, horas e dias a semanas, meses e até anos.

A correlação ao longo do tempo pode surgir em cada um de nossos cinco cenários de problema da seguinte forma:

1. Uma tempestade de neve se aproximando pode criar um surto na demanda por sopradores de neve; publicidade negativa pode criar um período de demanda reduzida.
2. Uma greve portuária pode criar atrasos que aumentam os tempos de descarregamento por meses.
3. Tempestades de chuva podem criar períodos de aumento na geração eólica que podem durar dias.
4. À medida que um vírus entra em uma região, ele criará um período de infecções elevadas que pode durar de semanas a meses.
5. Se uma planta é fechada para manutenção, pode haver uma queda nas cargas saindo de um local por uma semana.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/CrossingTimes.png" alt="Real vs. previsão, mostrando tempos de cruzamento." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 5.6.</span> Real vs. previsão, mostrando tempos de cruzamento.</figcaption>
</figure>

A Figura 5.6 ilustra como a energia gerada pelo vento pode exceder, ou ficar abaixo, da previsão ao longo de um período de tempo à medida que sistemas climáticos se movem através de uma região. É importante que reproduzamos não apenas o erro entre o real e o previsto, mas também a quantidade de tempo em que permanecemos acima ou abaixo da previsão, uma quantidade conhecida como "tempo de cruzamento" (crossing time).

É bastante comum que sinais aleatórios sejam vistos como variações em torno de uma média-base, que é geralmente tratada como uma constante que precisa ser estimada. Na realidade, a "média-base" também pode estar variando, mas em uma escala de tempo diferente. Por exemplo, clientes entrando em uma loja de varejo representam resultados aleatórios em uma escala de tempo fina, já que o comportamento de cada cliente é independente. Mas eles podem estar respondendo a sinais de mercado (publicidade, boca-a-boca) que também estão mudando, porém mais lentamente.

Sem dúvida, o maior desafio com a correlação ao longo do tempo é que ela pode ocorrer em múltiplas escalas de tempo, simultaneamente. Eventos independentes (como quantas pessoas entram em uma loja a cada hora solicitando xarope para tosse) são bastante fáceis de modelar. As variações que ocorrem em escalas de tempo mais longas são mais difíceis porque criam o que parecem ser correlações ao longo do tempo em escalas de tempo menores.

### Correlações ao longo da geografia

Decisões de compra de clientes, surtos de doenças, e clima são todos exemplos de processos aleatórios que variam geograficamente. Às vezes, fronteiras políticas podem limitar as correlações, mas na maioria das vezes é simplesmente a distância que governa a força da correlação.

Processos distribuídos espacialmente tipicamente ocorrem em dimensões muito altas (há muitas localizações espaciais!). O que simplifica as correlações geográficas é que tipicamente é bastante fácil capturá-las. A geografia pode ser uma função pura da distância, mas também pode refletir fronteiras geográficas assim como padrões de movimento populacional. Felizmente, há ferramentas matemáticas poderosas que ajudam a identificar e capturar essas correlações.

A correlação ao longo da geografia pode surgir em cada um de nossos cinco cenários de problema da seguinte forma:

1. O surto na demanda por sopradores de neve também será regional, já que está respondendo a tempestades de neve (que são regionais).
2. Um atraso portuário pode produzir suprimentos reduzidos na região atendida pelo porto, com correlações mais altas para pontos mais próximos do porto.
3. Tempestades de chuva também são regionais, e criarão surtos de energia eólica nas áreas afetadas pela tempestade. Da mesma forma, ondas de calor (que também são regionais) produzirão períodos de baixa geração eólica.
4. A propagação da gripe será regional, já que ela passa entre pessoas que estão próximas umas das outras.
5. O frete é gerado ou por mudanças em uma planta de manufatura (que está localizada em um ponto) ou por mudanças na demanda, que podem ser impulsionadas por forças regionais.

### Correlações ao longo de atributos

A maioria de nossos exemplos envolve atividades que são caracterizadas por um conjunto de atributos:

1. A demanda por roupas terá correlações entre peças com estilo similar mas cores diferentes.
2. Produtos que compartilham insumos comuns (como materiais para roupas, chips para carros, terras raras para motores) podem exibir atrasos similares no tempo de espera quando há escassez do insumo.
3. (Nenhum uso aparente de correlação ao longo de atributos para energia eólica.)
4. Novas infecções podem estar correlacionadas entre pessoas que compartilham características como idade ou condições médicas.
5. O fluxo de movimentações de carga completa pode estar correlacionado quando estão transportando mercadorias ou produtos comuns.

É frequentemente o caso de que, quando expandimos todos os atributos, nos vemos com tantas combinações que o número de observações para uma combinação particular de atributos pode ser bastante pequeno, e possivelmente zero. Esses problemas se prestam ao uso de métodos de estimação hierárquica, onde criamos diferentes séries temporais negligenciando um ou mais atributos, e então usando combinações ponderadas.

## Exercícios

**Questões de revisão**

<ol class="book-exercises">
<li>Nomeie as 12 classes de incerteza, dando um exemplo de cada uma a partir de qualquer aplicação.</li>
<li>Nomeie sete formas de incerteza que podem descrever processos aleatórios, e descreva um contexto que possa produzir cada uma.</li>
<li>Quais são as formas pelas quais a incerteza pode impactar o desempenho de um sistema, e dê um exemplo de cada uma.</li>
<li>Nomeie quatro formas de sazonalidade.</li>
<li>Crie uma distribuição cumulativa de velocidades do vento a partir das seguintes observações:
<p>(17, 8, 2, 12, 9, 28, 10, 8, 35, 12, 15)</p>
</li>
</ol>

**Questões de modelagem**

<p>Para cada uma das questões abaixo, tente encontrar o máximo de formas de incerteza dentro de cada uma das classes para as seguintes situações, seguindo as tabelas apresentadas na <a href="#examples-from-selected-applications">seção acima</a>.</p>

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>O problema de planejamento de estoque no <a href="/bridging-vol1/pt-BR/chapter-2/#inventoryplanning">Capítulo 2</a>.</li>
<li>O problema de gestão de demanda de móveis no <a href="/bridging-vol1/pt-BR/chapter-2/#demandmanagementfurniture">Capítulo 2</a>.</li>
<li>Planejamento de ensaios clínicos no <a href="/bridging-vol1/pt-BR/chapter-2/#clinicaltrials">Capítulo 2</a>.</li>
<li>Condução de uma eleição presidencial no <a href="/bridging-vol1/pt-BR/chapter-2/#presidentialelection">Capítulo 2</a>.</li>
<li>Financiamento de cadeia de suprimentos no <a href="/bridging-vol1/pt-BR/chapter-2/#supplychainfinance">Capítulo 2</a>.</li>
<li>Escolha uma situação-problema própria, idealmente uma com alguma complexidade, e identifique o máximo de tipos de incerteza possível usando as 12 classes como guia.</li>
</ol>
{% endraw %}
