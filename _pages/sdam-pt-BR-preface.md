---
layout: book
book_data: sdam_toc_pt_br
book_home: /sdam/pt-BR/contents/
title: **Prefácio e agradecimentos**
permalink: /sdam/pt-BR/preface/
date: 2026-07-17
lang: pt-BR
translated_from: en
translated_from_hash: 71edd7ec18764999
---


{% raw %}
**Prefácio da primeira edição**

Meu trabalho em problemas de decisão sequencial nasceu de pesquisas iniciadas na década de 1980 no setor de transporte rodoviário e, ao longo da minha carreira, abrangeu ferrovias, energia, saúde, finanças, comércio eletrônico, gestão da cadeia de suprimentos e até aprendizado para ciência de materiais. Problemas de decisão sequencial surgem em atividades cotidianas como esportes, culinária, compras e na busca do melhor caminho até um destino. Eles também surgem ao projetar um produto para uma startup, contratar pessoas para essa startup e criar campanhas de marketing.

Os primeiros trabalhos em problemas de decisão sequencial (conhecidos como programas dinâmicos ou problemas de controle ótimo) concentravam-se em resolver uma equação famosa, e famosamente intratável, conhecida como equação de Bellman (ou equações de Hamilton-Jacobi para problemas contínuos). Ingressei em uma comunidade que trabalhava em métodos para aproximar essas equações; esse trabalho resultou em um livro bem-sucedido sobre programação dinâmica aproximada, gerando um avanço significativo para uma classe de problemas de alocação de recursos. Com o tempo, no entanto, percebi que a programação dinâmica aproximada era um método poderoso para resolver uma faixa muito estreita de problemas — o proverbial martelo em busca de um prego.

Meu trabalho em uma ampla gama de problemas me fez perceber a importância de usar um leque amplo de métodos que poderiam ser encontrados na literatura de pesquisa. Descobri que podia modelar qualquer problema de decisão sequencial com o mesmo arcabouço, que envolvia a busca por métodos de tomada de decisão, geralmente conhecidos como "políticas" na literatura de pesquisa. Fui então capaz de organizar a vasta gama de métodos em quatro classes amplas (metaclasses) de políticas que abrangem *qualquer* método de tomada de decisão, incluindo qualquer coisa proposta na literatura ou usada na prática (inclusive métodos que ainda não foram inventados!).

Esse arcabouço é a base de um livro de pós-graduação que terminei em 2022 chamado *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (veja [tinyurl.com/RLandSO](https://tinyurl.com/RLandSO/)). Enquanto escrevia esse livro, percebi que os problemas de decisão sequencial são universais, surgindo em toda atividade humana. Além disso, essas ideias poderiam (e deveriam) ser ensinadas a um público amplo, e não apenas ao público analiticamente sofisticado que costumamos encontrar em pesquisa operacional, ciência da computação, economia e alguns nichos da engenharia.

O objetivo deste livro é permitir que os leitores entendam como abordar, modelar e resolver um problema de decisão sequencial, mesmo que nunca venham a escrever uma linha de código. Embora este livro seja analítico, o real objetivo é ensinar os leitores a *pensar* sobre problemas de decisão sequencial, decompondo-os nos cinco elementos centrais de um modelo de decisão sequencial, modelando a incerteza e, então, projetando políticas.

Assim como existem muitos estilos de ensino de estatística em diferentes comunidades, acredito que haverá uma evolução semelhante no ensino dessas ideias para públicos diferentes. Os exemplos deste livro vêm da pesquisa operacional, que gosto de chamar de a matemática da vida cotidiana. Acredito que os leitores acharão a maioria dos exemplos familiares, independentemente de sua área profissional. Ao mesmo tempo, consigo facilmente imaginar versões do livro projetadas exclusivamente para diferentes domínios de problemas, como saúde, finanças, energia, robótica e gestão da cadeia de suprimentos (e esta está longe de ser uma lista exaustiva).

**Agradecimentos da primeira edição**

Qualquer reconhecimento adequado do trabalho por trás deste livro deveria mencionar todos que contribuíram para o texto de pós-graduação *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*. Há simplesmente pessoas demais para listar aqui, e peço aos leitores que consultem a seção de Agradecimentos daquele livro para ver meu melhor esforço em reconhecer o trabalho de tantos que contribuíram para minha compreensão dos problemas de decisão sequencial.

Dito isso, gostaria de reconhecer algumas pessoas que contribuíram para este livro. Primeiramente, houve um grupo entusiasmado de estagiários que escreveram todos os módulos em Python usados nos exercícios deste livro: Raluca Cobzaru, Andrei Grauer, Joy Hii, John Nguyen e Robert Raveaunu. Sou especialmente grato a Dennis Djanka, professor da Universidade de Karlsruhe, na Alemanha, que atualizou os módulos originais em Python de Python 2 para Python 3, e fez revisões que tornam a biblioteca mais fácil de usar.

Em segundo lugar, agradeço calorosamente os esforços da Dra. Juliana Nascimento, que revisou cada linha desse código em Python, corrigindo erros, limpando a lógica e me ajudando a escrever os conjuntos de problemas baseados nesses exercícios.

Por fim, e mais importante, foi minha turma de graduação, ORF 411: Sequential Decision Analytics and Modeling, que se inscreveu e participou do primeiro curso especificamente sobre "análise de decisão sequencial" ministrado em qualquer lugar. Eles me ajudaram a refinar as aulas, que podem ser encontradas em [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses/) (role para baixo até "Undergraduate/masters course in sequential decision analytics" para acessar os slides).

Warren B. Powell<br>
Princeton, Nova Jersey<br>
Agosto de 2022

**Prefácio da segunda edição**

Em 2026, tomei a decisão de seguir o caminho da publicação pela Kindle Direct Publishing, que escolhi para minha nova série de monografias *Bridging Decision Problems*. Quando vi como era fácil, percebi que poderia fazer o mesmo com *Sequential Decision Analytics and Modeling*. A KDP me permitirá fazer pequenas atualizações, além de novas edições, sem a sobrecarga de trabalhar por meio de uma editora tradicional. Ela me permite oferecer uma edição para Kindle a um preço mínimo, junto com uma edição de capa dura a um preço muito mais razoável.

A segunda edição contém o mesmo conjunto de capítulos de aplicação. As maiores mudanças estão no capítulo 1, onde incorporei minhas ideias sobre a definição de diferentes tipos de decisões. Cada um dos capítulos de aplicação agora começa com uma "Visão Geral do Capítulo" que ajuda os leitores a entender do que se trata o capítulo. O livro inteiro também se beneficiou de uma revisão muito necessária, para corrigir pequenas edições e alguns erros ocasionais.

Esta edição também adota um processo que estou chamando de "enquadramento do problema" ("framing the problem"), que envolve começar identificando (em português ou inglês) as métricas de desempenho, os tipos de decisões sendo tomadas e as fontes de incerteza. Minha nova monografia, [*Bridging Decision Problems, Volume I: Framing the Problem*](/bridging-vol1/), aborda essas três questões ao longo de 150 páginas, portanto elas não são tão simples quanto parecem, mesmo sem a modelagem matemática.

Cada capítulo agora inclui uma breve seção, logo após a narrativa, chamada "Enquadrando o Problema", que prepara o terreno para a seção de modelagem matemática, listando as métricas, decisões e incertezas. Nossa aplicação do enquadramento fará com que o processo pareça muito mais simples do que realmente é para a maioria dos problemas reais, já que não ilustro o processo de começar com uma lista completa de métricas, decisões e incertezas, que são então reduzidas àquelas representadas no modelo.

<figure class="book-figure">
  <img src="/assets/images/sdam/geography-2025.png" alt="Distribuição geográfica dos downloads da primeira edição em 2025" style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 0.1.</span> Distribuição geográfica dos downloads da primeira edição em 2025</figcaption>
</figure>

**Agradecimentos da segunda edição**

Gostaria primeiramente de agradecer aos muitos milhares de leitores que baixaram este livro. No momento em que escrevo isto, o livro já contabiliza cerca de 18.000 downloads de todo o mundo (veja a Figura 0.1). O retorno recebido tem sido simplesmente emocionante.

Uma característica importante deste livro são os módulos em Python que acompanham a maioria dos capítulos. Alguns anos depois da publicação da primeira edição, descobri, para meu considerável desapontamento, que o Python havia sido atualizado da versão 2 para a versão 3, e que os módulos originais não funcionavam mais (e eu abandonei a programação em 1990, uma decisão que foi fundamental para meu sucesso).

Podem imaginar minha profunda gratidão quando Dennis Djanka, professor da Universidade de Karlsruhe, na Alemanha, entrou em contato comigo informando que havia reescrito completamente a biblioteca em Python 3. Além disso, ele fez as seguintes adições (como ele mesmo resumiu em seu e-mail):

- Introdução de classes base abstratas SDPModel e SDPPolicy que facilitam a criação de novos modelos e políticas com a quantidade mínima de código.
- Reescrita completa do código dos módulos *AssetSelling*, *MedicalDecisionDiabetes* e *StochasticShortestPath_static*, e criação de um Jupyter Notebook para cada um dos problemas, que conduz o usuário desde a criação de um modelo e política até o ajuste das políticas e a interpretação dos resultados.

Anteriormente, criei uma URL para a versão de Dennis do diretório usando [tinyurl.com/sdagithubnew](https://tinyurl.com/sdagithubnew/), mantendo meu diretório original em [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). Com o lançamento da 2ª edição, alterei a URL original para que também aponte para a nova biblioteca de Dennis.

Warren B. Powell<br>
Princeton, Nova Jersey<br>
Fevereiro de 2026
{% endraw %}
