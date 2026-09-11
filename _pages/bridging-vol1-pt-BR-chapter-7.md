---
layout: book
title: "Capítulo 7: Notas Finais"
permalink: /bridging-vol1/pt-BR/chapter-7/
date: 2026-07-17
book_home: /bridging-vol1/pt-BR/contents/
book_data: bridging_vol1_toc_pt_br
lang: pt-BR
translated_from: en
translated_from_hash: 27ae8c37c9b69926
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Este volume se concentrou em responder a três perguntas para ajudar na formulação de praticamente qualquer problema que envolva uma decisão. As perguntas são:

- **Quais são as métricas de desempenho?** Elas devem ser apresentadas seguindo as seguintes diretrizes:
  - Devem ser organizadas em pirâmides como uma forma informal de capturar o desempenho relativo.
  - Devem ser identificadas como objetivos (a serem minimizados ou maximizados), metas ou limites.
  - Por fim, devem ser separadas entre métricas base e métricas de risco.
- **Que tipos de decisões estão sendo tomadas (e quem as toma)?** Elas devem ser identificadas por:
  - As decisões atuam sobre recursos físicos, recursos financeiros ou informação?
  - As decisões são discretas ou contínuas, escalares ou vetoriais?
  - Com que frequência as decisões são tomadas e quando são implementadas?
- **Quais são as fontes de incerteza que afetam o desempenho?** Elas devem ser caracterizadas com base em:
  - Quais das 12 classes de incerteza são relevantes para o problema?
  - Como cada fonte de incerteza impacta a forma como as decisões são tomadas e como impactam as métricas de desempenho?
  - Como cada fonte de incerteza se comporta? Isso deve capturar como elas se comportam ao longo do tempo, e quaisquer correlações que precisem ser representadas.

Claro, essas perguntas parecem interessantes e relevantes, mas é tudo o que cobrimos no Volume I. Demos um breve tour pelas quatro classes de políticas para tomada de decisões, mas não voltaremos a esse tópico até o Volume III. Antes de podermos abordar a tomada de decisões, precisamos preencher outros detalhes, como identificar a informação necessária para tomar uma decisão e como o sistema evolui ao longo do tempo. Isso é abordado no Volume II, que também estabelece a base para avaliar as políticas que apresentaremos no Volume III.

## Decisões, decisões

Tomamos tantas decisões que muitas vezes seguimos em frente com os problemas sem nem reconhecer que temos escolhas a fazer. Pode-se argumentar que a primeira decisão que precisamos tomar é que tipo de análise fazer para tomar uma decisão. Quatro categorias importantes de contextos de decisão incluem:

1. **Decisões em que há potencial simplesmente para fazer um trabalho melhor:**
   - Uma empresa de transporte rodoviário precisa decidir quais cargas reservar para maximizar a receita, ao mesmo tempo em que atende às necessidades de seus motoristas. Isso pode envolver decidir para quais embarcadores fazer propostas para tentar ganhar sua carga, o que também exige especificar quais preços cobrar e se devem ser feitas mudanças em sua frota.
   - Um fundo de hedge quer automatizar o que vinha sendo um processo manual de seleção de investimentos no dia a dia. Os benefícios esperados são melhor desempenho com menos, reduzindo custos administrativos.
   - Um fabricante quer fazer um trabalho melhor no gerenciamento de estoques de sua cadeia de suprimentos.
2. **Decisões de alto volume que exigem automação:**
   - Um grande varejista precisa gerenciar estoques de 50.000 itens, exigindo revisões diárias de estoque e decisões de reposição.
   - Um hotel precisa atualizar os preços de mais de 10.000 ofertas diferentes de quartos/serviços em seu site.
   - A rede elétrica precisa planejar os cronogramas de centenas de geradores de energia de forma contínua.
   - O gestor de um fundo mútuo precisa decidir em quais das 10.000 ações investir.
   - Um banco online pode ter que avaliar milhares de solicitações de empréstimo por dia.

   Essas são decisões tomadas em alto volume, nas quais a tomada de decisão manual é trabalhosa e pode exigir o treinamento de um grande número de pessoas.
3. **Decisões de alto valor e alto risco** - Essas são decisões que exigem análise porque as escolhas envolvem alto valor, com alta incerteza, o que significa que há um risco considerável:
   - Uma empresa deveria comprar outra empresa? Há muito dinheiro envolvido, além de incerteza sobre o desempenho dos novos mercados que estão sendo adquiridos e sobre o quanto as culturas corporativas se combinarão.
   - Uma empresa farmacêutica deveria colocar um medicamento em testes clínicos? Os custos totais podem passar de 100 milhões de dólares, e há, em média, apenas 10 por cento de probabilidade de o medicamento ser bem-sucedido no final.
   - Um paciente está sofrendo de uma doença grave, mas o único tratamento coloca a vida do paciente em risco.

   Esses são os tipos de problemas que costumam ser objeto de análises cuidadosas usando árvores de decisão, às vezes com a ajuda de consultores externos.
4. **Decisões tomadas sem qualquer análise** - Estas são frequentemente decisões que afetam atividades complexas em que a análise formal provavelmente não terá valor, e as pessoas têm forte intuição sobre quais escolhas fazer:
   - Uma startup precisa aumentar as vendas. Após uma reunião da equipe executiva, decidem aumentar o orçamento de marketing, contratar dois vendedores e incluir um pacote promocional para permitir que as pessoas experimentem o software a um custo muito baixo.
   - Uma especialista em saúde pública está tentando lidar com um surto de overdoses de drogas. Ela decide realizar uma campanha de informação, fornece financiamento adicional a grupos de redução de danos e conversa com a polícia e autoridades de saúde locais.
   - Como fabricante de roupas nos EUA, você obtém a maior parte de seu tecido de Bangladesh, que está ameaçado por um aumento dramático nas tarifas. Se isso acontecer, você não conseguirá operar de forma lucrativa. O que fazer?
   - O gerente de campanha de uma candidatura presidencial precisa decidir onde agendar os discursos de um candidato nas próximas duas semanas.

   Em cada um desses casos, o tomador de decisão avança por instinto, sem sequer fazer uma lista das alternativas de escolha que poderiam ser necessárias. Embora se possa argumentar que a decisão se baseia na experiência passada, geralmente há incerteza, e algum esforço deveria ser dedicado a pensar em estratégias diante de diferentes resultados.

Argumentaríamos que todas as decisões se beneficiam simplesmente de entender as métricas para avaliar o desempenho (incluindo o risco), quais tipos de decisões podem ser tomadas e as incertezas que podem afetar o desempenho. Se essas questões serão então submetidas a uma análise mais formal será uma decisão de julgamento do tomador de decisão, que é a primeira decisão que precisa ser tomada em um projeto.

O objetivo deste volume é evitar cair na armadilha de formular um problema com base na familiaridade da pessoa (ou equipe) que faz a formulação com ferramentas específicas, sejam elas árvores de decisão ou grandes programas inteiros. A formulação precisa ser completamente independente de qualquer caixa de ferramentas.

## Próximos passos

Formular um problema em termos de métricas, decisões e incertezas é um primeiro passo crítico, que pode contribuir com clareza adicional para ajudar a entender um problema, mesmo que não haja uso subsequente de análise quantitativa. No entanto, haverá problemas que exigirão uma análise mais cuidadosa, ou que apresentarão uma necessidade clara de automação (como nos exemplos acima).

Quando há interesse em avançar para o uso do computador na tomada de decisões, precisamos antecipar os seguintes passos:

1. **Identificar as métricas, decisões e incertezas** que queremos incluir em nosso modelo para atender ao(s) objetivo(s) final(is) do projeto. Nesse ponto, uma escolha precisa ser feita: usar o entendimento aprimorado para tomar uma decisão, ou seguir em frente com uma análise mais aprofundada.
2. **Modelagem matemática** do problema escolhido usando a estrutura de modelagem universal, incluindo a modelagem da incerteza. Isso é abordado no Volume II.
3. **Projetar as políticas** para determinar as decisões identificadas na Etapa 2, e ajustá-las usando o modelo desenvolvido na Etapa 3. Esta etapa ajudará a identificar a informação necessária. Isso é abordado no Volume III.
4. **Projetar os processos** para coletar a informação necessária para tomar decisões (calcular a política) e avaliar o desempenho.
5. **Implementar decisões em campo.** Isso exige comunicar instruções e projetar os processos para implementar as decisões. É aqui que observamos e gerenciamos a conformidade.
6. **Avaliar o desempenho** do processo.

É possível simular todos esses passos no computador, o que pode servir como um ambiente de teste. Simuladores (às vezes conhecidos como "gêmeos digitais") podem ser úteis para avaliar e comparar políticas, mas podem ser difíceis de construir e validar. Como implementação em campo, há etapas significativas para a criação de processos de coleta de dados, bem como sistemas para implementação e monitoramento de conformidade.
{% endraw %}
