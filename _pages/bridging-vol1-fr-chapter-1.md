---
layout: book
title: "Chapitre 1 : Les Fondamentaux du Cadrage"
permalink: /bridging-vol1/fr/chapter-1/
date: 2026-07-17
book_home: /bridging-vol1/fr/contents/
book_data: bridging_vol1_toc_fr
lang: fr
translated_from: en
translated_from_hash: e55b91c9188391dc
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

L'humanité est constituée d'une variété de processus, chacun englobant un ensemble d'activités qui peuvent être évaluées à l'aune d'un ou plusieurs indicateurs de performance. Il semble s'agir d'une caractéristique fondamentale que les gens veulent toujours faire mieux. Les athlètes veulent être plus rapides ou plus forts ; les entreprises veulent être plus rentables ; les professionnels de la santé veulent sauver plus de vies ; le réseau électrique veut fournir de l'électricité à moindre coût.

Ce livre sera défini par l'affirmation suivante :

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="If you want to run a better {anything} you have to make better decisions.">
</figure>

Nous partons du principe que nous cherchons toujours à améliorer les choses, et que nous ne pouvons le faire qu'en manipulant les éléments que nous contrôlons, autrement appelés *décisions*.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 1.1.</span> Un échantillon de contextes de problèmes avec des exemples d'objectifs qui traduisent la performance.</caption>
<thead>
<tr><th>Application</th><th>Objectifs</th></tr>
</thead>
<tbody>
<tr><td>Systèmes énergétiques</td><td>Réduire les coûts, minimiser les coupures</td></tr>
<tr><td>Santé publique</td><td>Minimiser les décès, maximiser la productivité</td></tr>
<tr><td>Applications commerciales</td><td>Maximiser les profits, minimiser les coûts</td></tr>
<tr><td>Gestion de la chaîne d'approvisionnement</td><td>Minimiser les coûts, maximiser le revenu/la productivité</td></tr>
<tr><td>Industrie manufacturière</td><td>Minimiser le coût, maximiser le rendement, minimiser les défauts</td></tr>
<tr><td>Économie</td><td>Minimiser l'inflation, maximiser la croissance et l'emploi</td></tr>
<tr><td>Finance</td><td>Maximiser les rendements, minimiser le risque</td></tr>
<tr><td>Systèmes de transport (public)</td><td>Maximiser la couverture, minimiser le coût</td></tr>
<tr><td>Transport de marchandises</td><td>Minimiser le coût, maximiser le service, répondre aux besoins des chauffeurs</td></tr>
<tr><td>Ingénierie</td><td>Maximiser la résistance, minimiser le coût, maximiser la performance</td></tr>
<tr><td>Découverte de médicaments</td><td>Minimiser les décès, les conséquences négatives sur la santé, le coût</td></tr>
<tr><td>Sport</td><td>Maximiser les victoires, minimiser les salaires des joueurs, maximiser la fréquentation</td></tr>
<tr><td>Divertissement</td><td>Maximiser les vues, minimiser les coûts</td></tr>
</tbody>
</table>
</div>

Le Tableau 1.1 dresse la liste d'un ensemble d'activités humaines, chacune suivie d'une courte liste d'indicateurs susceptibles d'être utilisés pour évaluer la performance (la liste des indicateurs peut être assez longue). Ces applications donnent un aperçu de l'univers des problèmes où l'on « veut faire mieux », mais le défi a toujours été de créer un chemin, étape par étape, qui mène à une performance améliorée.

Tous les contextes de problèmes du monde réel doivent commencer par une description non structurée, en « langage courant ». En revanche, tout modèle mathématique suppose que le problème a déjà été structuré sous une forme compréhensible par un ordinateur. Ce qui manque, ce sont les apports des personnes qui comprennent réellement le problème, créant ainsi l'écart représenté par le pont inachevé qui figure sur la couverture du livre.

La pratique de modélisation standard aujourd'hui implique généralement une personne familière avec une « technologie de décision », qu'il s'agisse de la programmation en nombres entiers ou non linéaire, de l'apprentissage automatique, ou de la simulation de Monte Carlo (aujourd'hui, on pourrait aussi inclure les grands modèles de langage, qui constituent techniquement une forme d'apprentissage automatique). Lorsqu'une entreprise fait appel à un expert (qu'il vienne de l'industrie ou du monde universitaire), celui-ci aura immédiatement tendance à envisager le problème du point de vue de sa propre expertise.

L'expert technique posera alors les questions qui correspondent à son domaine de compétence. Le spécialiste de la programmation en nombres entiers s'intéressera aux variables de décision et à une fonction de coût ; le spécialiste de l'apprentissage automatique se concentrera sur les quantités inconnues qui doivent être estimées ou prévues ; l'expert en simulation pourra identifier des décisions de conception qui doivent être évaluées par simulation.

Ce comportement constitue une forme de biais que nous appelons le *filtrage par l'expertise* : apprendre à connaître le problème d'une manière qui reflète sa propre expertise. Cela se produit dans pratiquement tous les projets, car l'expert du domaine n'aura pas l'expertise nécessaire pour identifier l'expert technique le plus approprié. Les experts techniques présument toujours que leur expertise est pertinente, et examinent les problèmes à travers le prisme de leur formation. Il ne s'agit pas d'une tromperie ; c'est simplement la nature humaine.

Nous adoptons la position selon laquelle tous les « problèmes » sont motivés par le désir d'améliorer un processus d'une manière ou d'une autre. Améliorer un processus nécessite d'apporter des changements qui résultent de décisions, et nous souhaitons prendre de meilleures décisions. Cette perspective semble transformer chaque problème en un problème d'optimisation puisque nous voulons toujours prendre les meilleures décisions. Cela ne signifie pas que nous allons utiliser des outils d'optimisation. Nous ne présumons même pas que nous allons effectuer une quelconque analyse formelle, mais nous garderons toujours cette porte ouverte.

Nous allons utiliser un processus beaucoup plus holistique pour améliorer un processus. Nous commençons par remplacer l'étape initiale familière dans la communauté de l'optimisation, appelée « modélisation » (la traduction des problèmes réels en modèles mathématiques), par une étape que nous appelons « cadrage du problème », qui précède la modélisation. Le « cadrage » est un terme bien établi dans la résolution de problèmes commerciaux, mais nous allons lui donner un sens beaucoup plus précis.

Notre version du cadrage sera un processus qui nécessite de former les gens à poser les bonnes questions, plus faciles à comprendre pour les experts du domaine (les gens d'affaires, les professionnels de la santé, les scientifiques, les ingénieurs), et qui renseignent des éléments spécifiques d'un modèle mathématique *si un tel modèle devait être nécessaire pour résoudre le problème.* Le cadrage ne devrait pas être effectué par un expert technique, précisément à cause du risque de filtrage par l'expertise. Cependant, notre approche aboutira à répondre à des questions qui seraient nécessaires dans l'utilisation de tout outil analytique. Nous pensons que notre processus de cadrage apportera, pour de nombreuses applications, une clarté qui pourra aider à résoudre le problème même sans ordinateur.

## Qu'est-ce qu'un « problème » ? {#whatisaproblem}

Avant de résoudre un problème, que voulons-nous même dire par un « problème » ? Bien qu'il existe de nombreuses variétés de problèmes, du point de vue de la prise de décision, nous allons identifier deux styles :

- **Problèmes centrés sur les décisions** — Ce sont des problèmes où les décisions que nous prenons sont claires :
  - Acheminer des camions
  - Commander des stocks
  - Fixer le prix d'un produit
  - Choisir un traitement médical
  - Choisir une technologie de stockage par batterie
  - Localiser une installation
  - Où faire de la publicité pour un produit, un service ou un candidat
  - Choisir quel état visiter (dans le cadre d'une campagne électorale)
- **Problèmes centrés sur les indicateurs** — Ceux-ci surviennent généralement dans des situations plus complexes où l'on sait ce que l'on veut atteindre, bien que l'on ne sache pas nécessairement au départ quelles décisions peuvent être prises pour améliorer les indicateurs. Voici quelques exemples de contextes centrés sur les indicateurs :
  - Réduire les coûts, augmenter les revenus ou améliorer les marges bénéficiaires.
  - Réduire les stocks
  - Améliorer le rendement d'un processus de fabrication
  - Réduire les infections
  - Maximiser les rendements financiers
  - Réduire le risque
  - Améliorer l'utilisation des personnes, des équipements et des installations
  - Maximiser le nombre de voix (dans le cadre d'une campagne électorale)

Les problèmes centrés sur les indicateurs sont généralement plus complexes, car les objectifs sont plus faciles à énoncer que les décisions nécessaires pour les atteindre. Souvent, nous ne savons même pas quelles décisions pourraient être utilisées pour aider à améliorer les indicateurs. En effet, identifier les décisions qui ont l'impact le plus important sur les indicateurs de performance est une étape importante du cadrage d'un problème.

Dans le même temps, identifier les bons indicateurs peut également constituer une étape importante du cadrage d'un problème. En fait, dans des contextes comportant plusieurs décideurs (comme cela se produit dans toute organisation), un type important de décision qu'un gestionnaire peut prendre consiste à choisir les indicateurs permettant d'évaluer les personnes et les unités opérationnelles situées plus bas dans la hiérarchie organisationnelle.

## Contextes des problèmes de décision

Les problèmes de décision peuvent surgir de plusieurs façons :

- Nous devons prendre des décisions pour résoudre un problème particulier qui doit simplement être résolu une seule fois.
- Nous disposons d'un ensemble bien défini de décisions, et nous voulons simplement faire mieux. Dans la plupart des cas, les décisions sont prises par des personnes, et il peut y avoir l'espoir que les ordinateurs puissent faire mieux.
- Nous voulons améliorer notre performance au fil du temps, en particulier lorsque nous n'atteignons pas les objectifs attendus. Pour ces problèmes, nous ne savons peut-être même pas à l'avance quelles décisions affectent la performance.
- Nous disposons d'un ensemble bien défini de décisions prises par des personnes, et nous souhaitons automatiser le processus pour éliminer la composante manuelle, éventuellement comme une forme de réduction des coûts (ne pas avoir à payer les personnes), ou pour obtenir plus de contrôle sur un processus.
- Nous simulons des décisions dans le but de planifier le système pour l'avenir. Cela pourrait soutenir des applications de planification stratégique, ou permettre de comprendre l'impact des décisions prises aujourd'hui sur l'avenir.

Chacun de ces cas représente une motivation parfaitement valable pour identifier un problème à résoudre, ou une opportunité d'amélioration. Un défi majeur consiste à s'assurer que l'on prête attention aux bons indicateurs, puis à identifier toutes les façons dont on peut influencer ces indicateurs. Tout ce que vous contrôlez relève de la catégorie de la décision.

## Les trois étapes de l'automatisation des décisions {#three-stages}

<figure class="book-figure" style="float:right; max-width: 260px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/NotreDame.png" alt="A medieval cathedral.">
  <figcaption><span class="fig-num">Figure 1.1.</span> Une cathédrale médiévale.</figcaption>
</figure>

Un article du USA Today paru pendant la pandémie de COVID décrivait le problème de la distribution des vaccins comme « d'une complexité à donner le vertige ». La raison de cette affirmation est que les gens ne savent pas comment penser les problèmes complexes. Il est parfois utile de se rappeler que les cathédrales médiévales ont été conçues et construites par des personnes sans formation officielle ; le problème de la distribution des vaccins n'est pas la complexité en soi - c'est de savoir comment y réfléchir.

Ce qui manquait, c'était une manière structurée de penser à la façon de prendre des décisions au fil du temps. Notre processus consiste à décomposer le processus d'automatisation des décisions en trois étapes, données par :

**Étape I : Le cadrage** — Ici, nous identifions les éléments fondamentaux d'un problème de décision, ce qui commence par répondre d'abord aux trois questions suivantes :

1. Quels sont les indicateurs de performance ?
2. Quels types de décisions sont prises, et qui les prend ? Nous prenons des décisions à l'aide d'une méthode que nous appelons la *politique*.
3. Quelles sont les sources d'incertitude qui affectent la performance ?

**Étape II : La modélisation** — L'étape suivante consiste à préciser les détails du processus universel de modélisation. Cela commence par répondre aux questions suivantes :

4. Comment prenons-nous les décisions ? Cela se fait à l'aide d'une fonction que nous appelons la « politique ». Celles-ci seront conçues à partir de quatre classes de politiques (présentées dans le Volume III).
5. Quelles informations sont nécessaires ? Cela constitue les éléments de notre *variable d'état* (également appelée « état de connaissance ») qui comprend les informations nécessaires pour :
   - Prendre une décision (ce qui dépend de la politique).
   - Calculer tout indicateur de performance.
   - Calculer (a) et (b) dans le futur.

   L'information peut être divisée entre :
   - Ce que nous connaissons parfaitement sur les quantités de ressources physiques et financières.
   - Les paramètres et fonctions utilisés à différentes fins.
   - Ce que nous devons estimer et représenter sous forme de croyances.
6. Comment la variable d'état évolue-t-elle au fil du temps ?

**Étape III : La mise en œuvre** — Celle-ci va de l'acquisition des informations nécessaires jusqu'à la mise en œuvre et l'évaluation des décisions. Cela comprend :

7. Comment acquérons-nous l'information dont nous avons besoin ? Il existe de l'information immédiatement disponible, de l'information qui doit être acquise auprès d'autres sources, et de l'information qui doit être estimée (ou prévue).
8. Comment mettons-nous en œuvre les décisions que nous prenons à l'aide de la politique ?
9. Comment évaluons-nous la performance des décisions sur le terrain ?

Nous décrivons les trois étapes dans les sections qui suivent.

### Étape I : Cadrer le problème {#framingtheproblem}

Nous désignons l'étape initiale du processus d'automatisation comme le « cadrage du problème », qui consiste à répondre aux questions suivantes :

1. Quels sont les indicateurs de performance ?
2. Quels types de décisions sont prises (et qui les prend) ?
3. Quelles sont les sources d'incertitudes qui affectent la mise en œuvre des décisions et la performance du système ?

Ces trois questions ne suffisent pas à résoudre un problème, mais elles constituent le point de départ de tout processus impliquant la prise et la mise en œuvre de décisions.

<figure class="book-figure" style="float:right; max-width: 220px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/Chessboard.png" alt="Playing chess may be hard, but it is very simple to model.">
  <figcaption><span class="fig-num">Figure 1.2.</span> Jouer aux échecs peut être difficile, mais il est très simple à modéliser.</figcaption>
</figure>

Il est utile d'illustrer ces questions dans le contexte d'un des jeux les plus exigeants jamais inventés : le jeu d'échecs (voir figure 1.2). La réponse à nos trois questions de cadrage est la suivante :

1. **Indicateur de performance** – Gagner la partie.
2. **Décisions** – Coups autorisés.
3. **Incertitudes** – Coups de l'adversaire.

Bien sûr, le fait d'être trivial à modéliser ne rend pas le jeu d'échecs facile, mais les échecs ont longtemps servi de référence pour démontrer la puissance de stratégies algorithmiques telles que l'« apprentissage par renforcement ».

La résolution du problème intervient à l'Étape 4 (Étape II), et bien que celle-ci soit assez difficile, les autres étapes sont également triviales.

Considérons maintenant certains des problèmes que nous identifierons au [Chapitre 2](/bridging-vol1/fr/chapter-2/) :

- Comment réduire les décès dus au fentanyl ?
- Comment concevoir une chaîne d'approvisionnement qui minimise les coûts et soit robuste face à différentes sources d'incertitude ?
- Comment gérer une flotte de camions afin de maximiser les profits tout en assurant un service ponctuel ?
- Quelle est la meilleure stratégie pour réduire les émissions de CO2 ?
- Comment un grand fabricant devrait-il stocker et investir son argent afin de maximiser les rendements, tout en gérant le risque et en répondant à des besoins de trésorerie à court et moyen terme ?

Répondre à nos trois questions de cadrage pour ces problèmes est un exercice non trivial. C'est pourquoi nous consacrons trois chapitres au processus de réponse à chacune de ces questions :

- Chapitre 3 – Indicateurs de performance
- Chapitre 4 – Décisions
- Chapitre 5 – Incertitudes

Ces questions sont illustrées à l'aide des applications présentées au [Chapitre 2](/bridging-vol1/fr/chapter-2/). Nous donnons un bref aperçu de ces trois éléments fondamentaux en décrivant différents types d'indicateurs, de décisions et d'incertitudes dans les sous-sections qui suivent.

#### Types d'indicateurs

Les indicateurs présentent une variété infinie et dépendent entièrement du contexte.

- **Entreprise** – Les entreprises se caractérisent par de longues listes d'indicateurs financiers, d'indicateurs de productivité, d'indicateurs de performance, d'indicateurs de main-d'œuvre, et d'indicateurs mesurant la manière dont le marché est servi.
- **Santé** – Maladie/décès, guérisons, effets secondaires, mobilité, force, coût.
- **Énergie** – Coût, quantité d'énergie fournie, pannes, réduction de la demande.
- **Fabrication** - Rendement, performance du produit, vitesse, coût.
- **Découverte de médicaments** - Performance, protection par brevet, potentiel de marché, effets secondaires, risques pour la santé.
- **Sports** - Points marqués, régularité, popularité auprès des fans, blessures, régularité.
- **Transport de marchandises** - Revenus, coûts, service, besoins en main-d'œuvre, exposition à la volatilité du marché.

Choisir les bons indicateurs constitue un défi en soi, que ce soit pour guider le comportement d'un modèle informatique ou celui de personnes.

Indépendamment de ce qu'un indicateur mesure, il y a la question de la manière dont il est utilisé pour orienter la performance du système. Les indicateurs peuvent être utilisés de trois façons différentes :

- **Objectifs** - Ce sont des indicateurs que nous voulons maximiser ou minimiser.
- **Cibles** - Nous pouvons vouloir que l'indicateur se rapproche le plus possible d'un chiffre cible, comme la température dans un bâtiment ou la pression artérielle d'un patient.
- **Limites** - Nous pouvons vouloir qu'un indicateur reste sous ou au-dessus d'une certaine limite. Par exemple, nous pouvons vouloir maintenir la glycémie d'un patient sous une valeur particulière ; les ruptures de stock devraient rester sous un certain niveau ; les portefeuilles financiers doivent maintenir la volatilité sous une valeur spécifiée.

#### Types de décisions

Une liste initiale des différents types de décisions est donnée par :

- **Binaires** – Elles apparaissent lorsque nous choisissons entre deux conceptions de page web (connu sous le nom de test A/B), ou lorsque nous déterminons quand vendre un actif (à chaque instant, nous pouvons conserver ou vendre).
- **Choix discrets** – Il est utile de diviser cette catégorie en trois classes :
  - Un petit ensemble de choix discrets - Nous pourrions avoir besoin de choisir le meilleur médicament, le meilleur fournisseur pour un composant, ou le meilleur emplacement pour une installation.
  - Un ensemble de valeurs discrétisées d'un paramètre continu – Les prix, les dosages d'un médicament, ou les températures pour la cuisson d'une plaquette de semi-conducteur en sont des exemples.
  - Dans certains cas, le nombre de choix discrets peut être assez important, comme choisir laquelle parmi 30 000 molécules différentes pourrait être utilisée pour un médicament, ou le choix des emplacements pour différentes installations réparties parmi 100 emplacements possibles.
- **Choix continus** – Prix, concentrations, dimensions, températures, … Ceux-ci peuvent être des scalaires (c'est-à-dire un seul paramètre), ou des vecteurs, où nous pourrions optimiser sur plusieurs paramètres continus (potentiellement nombreux).
- **Vecteurs de choix discrets** – Nous pourrions avoir un ensemble de M chauffeurs que nous affectons à N charges, et devoir décider s'il faut affecter le chauffeur m à la charge n.

Une deuxième dimension des décisions concerne le moment où une décision prise maintenant est mise en œuvre dans le futur. Par exemple :

- Un répartiteur affecte un chauffeur à une charge à déplacer immédiatement.
- Un médecin peut prescrire un médicament contre la glycémie qui nécessite plusieurs heures pour agir.
- Un opérateur de réseau planifiera aujourd'hui quels générateurs à vapeur devraient fonctionner demain.
- Un gestionnaire de chaîne d'approvisionnement passe une commande qui peut prendre plusieurs semaines ou mois pour arriver.
- Une compagnie aérienne peut commander de nouveaux avions dont la livraison peut prendre deux ans.
- Un investissement auprès d'une société de capital-investissement peut immobiliser ce capital pendant 8 à 10 ans.

Une troisième dimension des décisions concerne l'identification de la personne qui prend une décision.

- La gestion de la distribution des vaccins implique des décisions qui commencent par les agences fédérales et étatiques, s'étendent aux hôpitaux, aux médecins et aux infirmières qui administrent le vaccin.
- La fabrication de moteurs automobiles implique la participation d'une succession de fabricants qui fournissent les matériaux et fabriquent les divers composants du moteur, finalement acheminés vers le marché par des concessionnaires qui contrôlent les commandes de voitures.
- Les essais cliniques de médicaments impliquent des décisions prises par des scientifiques, des régulateurs, des entreprises fournissant le financement, des hôpitaux et cliniques qui administrent le médicament, et le patient.
- Une entreprise de transport routier effectue la répartition à l'aide d'une équipe de répartiteurs et de gestionnaires de charges, qui pourrait être remplacée par un unique modèle informatique capable de coordonner ces décisions dans toute l'entreprise.

#### Formes d'incertitudes

L'aspect sans doute le plus subtil de la prise de décision concerne la compréhension des incertitudes qui surgissent invariablement lors de la mise en œuvre des décisions sur le terrain. Il n'est pas surprenant que les formes d'incertitudes qui apparaissent dépendent fortement du contexte. Voici quelques exemples :

- **Négociation financière** – Ici, nous nous intéressons principalement aux variations des prix des actifs, mais les traders s'intéressent également à la demande pour les actifs, et aux variations d'autres indicateurs qui pourraient suggérer l'orientation des marchés, comme les changements du chômage, des taux d'intérêt, des ventes au détail. Les marchés évoluent souvent selon les anticipations, qui sont notoirement difficiles à mesurer.
- **Gestion de la chaîne d'approvisionnement** – Ici, nous devons faire face aux incertitudes concernant la demande du marché pour un produit, les stratégies des concurrents, la performance des fournisseurs, et le comportement des travailleurs (en particulier lorsqu'ils sont syndiqués). En outre, il existe des influences extérieures telles que la météo, les tremblements de terre et la propagation des maladies.
- **Santé publique** – La propagation d'une maladie dépend de la source de la maladie (il peut s'agir d'une infection unique, ou provenant de nombreux animaux infectés, à partir desquels une souche humaine a évolué), de la prévalence de la maladie, du taux de transmission, de la manière dont elle affecte les patients, du développement de médicaments, de la distribution des médicaments, et de la réaction du public quant à l'acceptation des médicaments.

Chacun de ces exemples implique de multiples sources d'incertitude. Elles présentent différentes formes d'incertitude, telles que :

- Un bruit à grain fin, comme des demandes quotidiennes aléatoires.
- Les variations de prix et de météo présentent typiquement des pics et des sursauts.
- Il peut y avoir des glissements inattendus vers de nouveaux paliers reflétant des changements technologiques, de comportement des consommateurs, ou des décisions des concurrents.
- Des événements uniques et rares comme un tremblement de terre, ou l'invention d'une nouvelle technologie majeure.
- Des éventualités pour des événements qui pourraient se produire, mais qui ne s'est jamais réellement produit.

La prise en compte de l'incertitude doit être considérée en fonction de la manière dont elle affecte les indicateurs de performance. Lorsque nous prenons des décisions en présence d'incertitude, nous devons faire des choix, comme la manière de prendre une décision, qui fonctionnent bien en moyenne, étant donné que nous ne savons pas ce qui va se produire dans le futur.

Cependant, certaines formes d'incertitude introduisent une nouvelle dimension appelée risque, qui capture des facteurs qui ne seraient pas présents dans les indicateurs de performance si l'incertitude n'existait pas. Le risque est un sujet très populaire dans des domaines tels que la finance, la gestion de la chaîne d'approvisionnement et la santé. Il existe de nombreux ouvrages qui traitent du risque, ainsi que des articles très sophistiqués qui le modélisent, sans jamais fournir de définition formelle du risque. Nous fournirons cette définition au Chapitre 3.

### Étape II : Modélisation {#universalmodelingframework}

Nos trois questions initiales (indicateurs de performance, décisions, incertitudes) posent les fondations de ce que nous allons appeler notre *cadre de modélisation universel* (ou UMF). L'UMF peut être utilisé pour modéliser *n'importe quel* problème de décision, en particulier lorsque nous utilisons la version étendue pour traiter les problèmes multi-agents. Pour l'instant, nous mettons l'accent sur la capture de l'évolution des décisions et de l'information au fil du temps. Dans le Volume II, nous décrirons l'UMF à l'aide d'une notation mathématique complète (ce qui n'est pas aussi terrible que cela puisse paraître), mais pour l'instant, nous allons l'esquisser en langage courant.

Le Cadre de Modélisation Universel se compose de cinq éléments :

1. Les **variables d'état** capturent toute l'information dont nous avons besoin pour prendre des décisions et calculer nos indicateurs de performance. Une compréhension des éléments d'une variable d'état éclaire le processus permettant de déterminer quelle information est nécessaire pour prendre des décisions.
2. Les **variables de décision** représentent les décisions que nous pourrions prendre (en s'appuyant sur les types de décisions que nous avons décrits lors du cadrage du problème). Notons que nous supposons prendre des décisions à l'aide d'une « politique » *qui reste à concevoir ultérieurement.*
3. L'**information exogène** correspond à toute nouvelle information qui arrive après que nous ayons pris une décision, et avant que nous prenions notre décision suivante.
4. **La fonction de transition** décrit comment la variable d'état change en fonction de la décision que nous avons prise, et de l'information exogène qui est arrivée après cette décision.
5. **La fonction objectif** décrit comment évaluer la performance du système en utilisant la méthode que nous avons choisie pour prendre les décisions.

Identifier les variables d'état nécessite de choisir la méthode (appelée la politique) pour prendre les décisions, ce qui doit donc être fait en premier. Cependant, évaluer et ajuster les politiques nécessite l'ensemble du cadre de modélisation universel si nous voulons utiliser un simulateur. En définitive, la conception des politiques (qui joue un rôle majeur dans la détermination de l'information dont nous avons besoin dans la variable d'état) et l'évaluation des politiques constituent un processus itératif.

Le cadre de modélisation universel est traité de manière beaucoup plus détaillée dans le Volume II, où nous introduisons une notation mathématique très élémentaire.

Si le cadre de modélisation universel semble évident, c'est qu'il l'est. Ce n'est guère plus qu'un cadre décrivant l'évolution de ce que nous savons (la variable d'état) sous l'effet des décisions (que nous contrôlons) et de l'information exogène (que nous ne contrôlons pas). Ce qui est peut-être stupéfiant, c'est que cela n'est pas standard dans la littérature de recherche, bien qu'il existe des poches où on peut le trouver.

L'étape sans doute la plus difficile est la conception de la politique de prise de décision. Nous séparons le processus d'évaluation d'une politique de celui de la conception de la politique, ce qui différencie notre approche de celle utilisée dans pratiquement tous les ouvrages sur l'optimisation stochastique. Heureusement, nous disposons d'une stratégie pour surmonter cette complexité.

### Étape III : Mise en œuvre

La dimension la plus largement négligée dans la conception et la résolution des modèles d'optimisation est sans doute le processus de leur mise en œuvre. La littérature académique passe totalement sous silence le fait que ce qui compte n'est pas la qualité avec laquelle nous résolvons un problème dans l'ordinateur, mais plutôt l'impact des décisions lorsqu'elles sont mises en œuvre.

Les dimensions clés de la mise en œuvre couvrent trois domaines :

1. L'acquisition des données nécessaires pour renseigner la variable d'état, c'est-à-dire l'information dont nous avons besoin pour prendre des décisions et calculer les indicateurs de performance (plus de détails sont fournis dans le Volume II).
2. La mise en œuvre des décisions, ce qui peut signifier amener des personnes à suivre des instructions, ou communiquer les instructions par voie électronique.
3. L'évaluation de la performance. Pour les systèmes complexes, comprendre à quel point le système fonctionne bien, ce qui est présumément affecté par les décisions prises, peut être assez difficile.

Pour les problèmes complexes en industrie, la mise en œuvre peut être un processus exceptionnellement difficile. Même si cela est considéré comme hors du champ du processus de modélisation, il est utile pour les modélisateurs de réfléchir à ces étapes. Il se peut que certaines décisions ne soient tout simplement jamais destinées à être prises par un ordinateur. Par exemple, l'allocation de ressources dans un contexte de santé publique implique une négociation entre des organisations étatiques, régionales et locales, chacune ayant ses propres priorités cachées.

## Trois types d'information

Nous reconnaissons d'abord que toute quantité qui peut être représentée sur un ordinateur est une forme d'information. Nous pouvons identifier trois types d'information du point de vue de leur évolution dans le temps :

1. L'information que nous connaissons au moment où nous prenons une décision, qui constitue l'état de notre système (plus précisément l'état de connaissance). C'est l'information nécessaire pour prendre des décisions et/ou pour calculer les indicateurs de performance, maintenant ou éventuellement dans le futur.
2. La nouvelle information que nous contrôlons. Nous définissons les décisions de manière formelle au Chapitre 4 et décrivons 10 types différents de décisions, ce qui aide dans le processus d'identification des décisions.
3. La nouvelle information qui arrive depuis l'extérieur de notre système, hors de notre contrôle, bien qu'elle puisse être influencée par notre état actuel et/ou les décisions que nous prenons. Nous appelons cela l'information exogène, et elle peut provenir de plusieurs sources :
   - Des phénomènes naturels tels que la météo et les tremblements de terre.
   - Des marchés, comme la demande pour un produit, les cours des actions et les taux d'intérêt.
   - La dynamique des populations, comme la propagation des maladies.
   - Le comportement d'autres entreprises ou organisations.
   - Les décisions prises par des personnes (plus généralement, des agents) extérieures à notre système, telles que :
     - Les décisions de production des fournisseurs d'intrants pour une usine de fabrication.
     - D'autres divisions au sein d'une entreprise (comme la tarification et le marketing, si nous travaillons dans la fabrication ou la planification des stocks).
     - Les actions d'un patient (si vous êtes le médecin).
     - Les publicités placées par le candidat concurrent lors d'une élection présidentielle.

   L'information exogène est décrite plus en profondeur au Chapitre 5.

## La prise de décision comme processus

Il existe une vaste littérature qui se concentre sur la création de « problèmes d'optimisation » composés de :

- Une décision (ou un ensemble de décisions).
- Un objectif à minimiser ou à maximiser.
- Des contraintes, qui déterminent l'ensemble des décisions admissibles.

La prise de décision réelle est un processus, et comprendre ce processus est essentiel pour concevoir des méthodes permettant de prendre de meilleures décisions. Nous commençons par identifier les éléments suivants :

1. Les problèmes de décision séquentielle, qui décrivent le processus de prise d'un ensemble particulier de décisions au fil du temps par un seul agent.
2. La « chaîne d'information » qui décrit le processus de création de l'information nécessaire pour prendre une décision.
3. Les étapes impliquées dans la mise en œuvre des décisions.
4. Le processus d'évaluation de la performance.

Au-delà du champ de cette monographie se trouve le défi de la coordination entre plusieurs décideurs.

### Problèmes de décision séquentielle

Nous sommes maintenant prêts à écrire, en anglais, un problème de décision séquentielle, que nous pouvons énoncer ainsi :

> *État, décision, information ; état, décision, information ; …, état, décision, information.*

Chaque triplet {état, décision, information (exogène)} représente l'information associée à une période temporelle particulière :

1. **« État »** est l'information que nous connaissons au début de la période temporelle.
2. **« Décision »** est notre information contrôlable de manière endogène.
3. **« Information (exogène) »** est l'information qui arrive après que nous ayons pris une décision, et avant que nous prenions la décision suivante.

Après avoir pris une décision (parfois après avoir observé l'information exogène), nous nous arrêtons et calculons les indicateurs de performance.

Bien entendu, tous les problèmes de décision ne sont pas des problèmes de décision séquentielle, bien que la grande majorité des décisions soient prises de manière répétée au fil du temps. Cependant, nous pouvons identifier plusieurs catégories de problèmes de décision séquentielle du point de vue de l'ordonnancement des décisions et de l'information :

1. Prendre une décision, arrêter.
2. Prendre une décision, voir l'information exogène, arrêter.
3. Prendre une décision, voir l'information, prendre une décision de plus, arrêter.
4. Prendre une décision, voir l'information, prendre une décision, voir l'information, …, répéter $T$ fois, arrêter.
5. Prendre une décision, voir l'information, répéter indéfiniment.

Quelques remarques :

- **La catégorie 1** décrit les problèmes de décision statiques et déterministes qui dominent ce que l'on appelle la communauté de l'optimisation depuis les années 1950. La version la plus simple de ces problèmes pourrait consister à trouver le meilleur d'un ensemble de choix, comme acheter un article auprès du fournisseur au coût le plus bas, tant que nous supposons que l'article se comportera exactement comme prévu.

  Des instances de problèmes plus complexes pourraient impliquer de trouver l'allocation au coût le plus bas des approvisionnements provenant de plusieurs sources pour répondre à différents besoins, ou d'affecter différentes personnes ou machines pour accomplir différentes tâches, introduisant la complexité de travailler dans plusieurs dimensions. La complexité de ces problèmes a conduit à l'oubli étonnant que la grande majorité des applications sont en réalité des problèmes de décision séquentielle, une propriété qui a été complètement ignorée dans la littérature sur ce sujet.
- **La catégorie 2** décrit des problèmes connus sous le nom de recherche stochastique, qui représente l'une des classes de problèmes les plus largement étudiées. Voici des exemples de problèmes de recherche stochastique :
  - Choisir un ensemble d'installations de fabrication et d'entrepôts, puis exécuter une simulation pour évaluer sa performance.
  - Choisir un protocole de traitement pour un patient, puis observer comment il se déroule.
  - Fixer une stratégie d'investissement pour un portefeuille d'actions, puis observer son efficacité.

  Tous ces exemples peuvent être décrits par « faire un choix », puis « voir à quel point le choix fonctionne bien ». Si cela est fait dans un simulateur ou un laboratoire, nous pourrions être en mesure d'exécuter ces expériences encore et encore. Dans ce cas, nous avons un processus de recherche entièrement séquentiel qui relève de la catégorie 4.
- **La catégorie 3** décrit une version plus générale de la catégorie 2, où nous pourrions prendre une décision initiale, comme envoyer du produit vers un ensemble d'entrepôts. Ensuite, les demandes pour le produit dans les points de vente au détail sont révélées. Enfin, nous avons la décision d'expédier des entrepôts vers les points de vente au détail. Ce problème a été largement étudié sous le terme générique de programmation stochastique.
- **La catégorie 4** est la forme la plus courante de problème de décision séquentielle puisqu'elle capture la nature répétée de la prise de décisions suivie de l'apprentissage de nouvelles informations, mais nous arrêtons après un nombre spécifique de pas de temps, généralement pour la raison pratique que nous exécutons une simulation qui doit avoir un point d'arrêt prédéfini.
- **La catégorie 5** est un sujet populaire dans des communautés telles que la programmation dynamique (spécifiquement les processus de décision markoviens) et le contrôle stochastique. L'objectif est généralement la somme infinie actualisée des coûts ou des récompenses. Cette littérature suppose généralement que l'information arrivant à chaque pas de temps provient de la même distribution (ce qui est connu comme une distribution stationnaire) et est utile pour dériver une variété de résultats théoriques.

### Des décisions optimisées aux politiques

Lorsque nous résolvons un problème d'optimisation statique et déterministe, pratiquement tous les auteurs représentent la décision comme une variable (typiquement un vecteur) « $x$ » où nous devons concevoir un algorithme pour trouver le meilleur « $x$ ». En revanche, lorsque nous avons un problème de décision séquentielle, il existe un manque de compréhension fondamental de ce sur quoi nous optimisons. En résumé, avec les problèmes déterministes, nous recherchons la meilleure décision $x$, tandis que pour les problèmes de décision séquentielle, nous recherchons la meilleure fonction (c'est-à-dire la politique) qui représente une méthode de prise de décision.

L'idée de trouver la meilleure fonction pour prendre des décisions semble étrangère à la littérature sur l'optimisation. En revanche, c'est exactement ce qui est fait en apprentissage par renforcement, où le défi consiste à trouver une fonction (souvent appelée modèle statistique) qui fait le meilleur travail possible pour ajuster les données. Par la suite, nous désignerons les fonctions de prise de décision par le terme de politiques, un sujet que nous abordons plus en détail dans le Volume II.

### La chaîne d'information

Prendre une décision présente certains parallèles avec la fabrication de produits physiques. Pour fabriquer une voiture (par exemple), il est nécessaire de fabriquer diverses pièces, ce qui nécessite souvent plusieurs étapes. Ensuite, après avoir fabriqué la voiture, nous devons la distribuer au client.

Les décisions sont « prises » à partir d'information, qui elle-même peut avoir besoin d'être créée (collectée ou estimée) à travers une série d'étapes. Décider combien, et quels types, de voitures fabriquer peut nécessiter une prévision compilée à partir de données historiques, ainsi que de prévisions économiques et d'estimations émanant d'une force de vente. Ces données doivent ensuite passer par un ensemble de méthodes qui créent les prévisions.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/FlowofInformation.png" alt="An illustration of information flowing from initial source, through stages of processing and estimation, up to the point where it is used to make decisions.">
  <figcaption><span class="fig-num">Figure 1.3.</span> Une illustration de l'information circulant depuis sa source initiale, à travers des étapes de traitement et d'estimation, jusqu'au point où elle est utilisée pour prendre des décisions (une autre forme d'information).</figcaption>
</figure>

Le flux d'information est illustré à la figure 1.3. L'« information » peut être des stocks observés, une prévision créée à partir de l'historique, le résultat d'une décision de collecter de l'information à travers une étude de marché, ou le résultat d'un processus de planification de la production. Les nœuds de traitement sont des fonctions mathématiques – des ensembles d'équations qui agissent sur les entrées pour produire une sortie. Les fonctions peuvent faire n'importe quoi, depuis additionner des nombres jusqu'à produire des prévisions ou prendre des décisions en résolvant un problème d'optimisation.

Tout comme pour les processus physiques, les processus d'information consistent généralement en des étapes manuelles (comme la saisie des stocks) combinées à des étapes réalisées par ordinateur (et donc automatisées), telles que l'exécution d'une prévision.

Il est facile de penser que, compte tenu de l'utilisation intensive des ordinateurs, les processus d'information devraient être presque entièrement automatisés. Pourtant, il existe encore un grand nombre de travailleurs de bureau, et ceux-ci ne chargent pas de camions ni ne travaillent sur une chaîne de montage.

## Intelligence artificielle

En définitive, l'objectif de réfléchir à un problème complexe de façon formelle est d'utiliser la puissance de l'ordinateur pour améliorer le processus. La plupart des gens suggéreront immédiatement d'utiliser l'« intelligence artificielle » (souvent désignée par « IA »). Le problème est que « IA » est un terme utilisé depuis les années 1950, et qui a évolué constamment au fil des années, s'appliquant généralement à la dernière invention issue du domaine de l'informatique.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/7levelsofAI.png" alt="Les 7 niveaux de l'intelligence artificielle." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 1.4.</span> Les 7 niveaux de l'intelligence artificielle.</figcaption>
</figure>

Nous divisons les principales formes d'IA en sept niveaux, illustrés à la figure 1.4. Après avoir décrit ces sept niveaux, nous les organiserons en quatre classes d'intelligence fondamentalement différentes.

### Les sept niveaux de l'IA

**Niveau 1 : Logique à base de règles** - Cette approche a d'abord émergé dans les années 1960 et 1970, puis s'est développée dans les années 1980 (alors que les ordinateurs devenaient beaucoup plus largement disponibles) sous la forme de « systèmes experts ». Ceux-ci consistent en des règles spécifiées par des humains de la forme « Si {condition} alors {action} ». Par exemple, la condition pourrait être « consommer de la viande rouge » et l'action pourrait être « boire du vin rouge ». Ou bien la condition pourrait être les attributs d'un patient (symptômes, sexe, âge, poids, fumeur ?, tension artérielle, …) et l'action pourrait être un traitement médical.

Cette forme d'IA a traversé ce qu'on appelle désormais le « cycle du battage médiatique », où les gens fantasmaient sur la manière dont les ordinateurs allaient prendre le contrôle du monde.

Le problème des systèmes à base de règles est que, à mesure que le nombre d'éléments constituant une condition augmentait, le nombre de paires condition/action possibles croissait de manière exponentielle (un comportement connu sous le nom de « malédiction de la dimensionnalité »). Dans les années 1990, cette première forme d'IA était largement considérée comme un échec, mais en réalité, les systèmes à base de règles restent largement utilisés encore aujourd'hui. Le seul échec est qu'ils n'ont pas été à la hauteur du battage médiatique initial. Les systèmes à base de règles sont aujourd'hui largement utilisés.

**Niveau 2 – Statistiques/apprentissage automatique** - En développement depuis le début des années 1900, les statistiques (connues sous le nom d'apprentissage automatique en informatique) constituent la science consistant à utiliser des données pour estimer des modèles. Nous pourrions utiliser des observations de différents prix d'une chambre d'hôtel pour estimer la demande, ou des demandes historiques pour prévoir l'avenir. Ce domaine a connu une croissance explosive dans les années 1980 et 1990 (à mesure que les ordinateurs devenaient largement disponibles).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ThreeCirclesofML.png" alt="Chaque type de fonction pour l'apprentissage automatique se situe dans trois cercles qui se chevauchent." style="max-width: 310px;">
  <figcaption><span class="fig-num">Figure 1.5.</span> Chaque type de fonction pour l'apprentissage automatique se situe dans ces cercles qui se chevauchent, incluant 1) les fonctions de type table de correspondance, 2) les fonctions paramétriques, et 3) les fonctions non paramétriques (localement paramétriques).</figcaption>
</figure>

Les modèles d'apprentissage automatique se présentent sous divers styles, mais peuvent être organisés en trois grandes classes, comme illustré à la figure 1.5 :

- **Tables de correspondance** – Elles sont de la forme « Si {entrée} alors {sortie} », similaires aux systèmes à base de règles.
- **Modèles paramétriques** – Ce sont des fonctions analytiques des entrées qui produisent une ou plusieurs sorties à l'aide d'une fonction mathématique dépendant d'un ensemble de paramètres inconnus. Si la fonction est linéaire par rapport à ces paramètres, il s'agit alors d'un modèle linéaire. Des modèles plus généraux utilisent des fonctions non linéaires par rapport aux paramètres. La figure 1.6 illustre des modèles linéaires et non linéaires.

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/LinearandNonlinearFunctions.png" alt="Illustrations de fonctions paramétriques linéaires et non linéaires utilisées en apprentissage automatique." style="max-width: 464px;">
    <figcaption><span class="fig-num">Figure 1.6.</span> Illustrations de fonctions paramétriques linéaires et non linéaires utilisées en apprentissage automatique.</figcaption>
  </figure>

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/NeuralNetwork.jpg" alt="Illustration d'un petit réseau de neurones.">
    <figcaption><span class="fig-num">Figure 1.7.</span> Illustration d'un (très petit) réseau de neurones. Chaque lien porte un paramètre qui doit être ajusté afin que la sortie se rapproche le plus possible de l'étiquette associée aux entrées dans un jeu de données d'entraînement.</figcaption>
  </figure>

  Une classe importante de modèles paramétriques, apparue pour la première fois dans les années 1970, est celle des réseaux de neurones (voir figure 1.7). Les réseaux de neurones possèdent une couche d'entrée, par laquelle n'importe quel ensemble d'entrées pénètre dans le réseau via les nœuds d'entrée. Ces valeurs sont ensuite transformées à travers les couches intermédiaires avant de produire une ou plusieurs sorties. Chaque lien du réseau possède un paramètre qui lui est associé, et les premiers réseaux de neurones comptaient souvent de quelques milliers à un million de paramètres.

  Il est préférable de considérer les réseaux de neurones comme une fonction non linéaire de très grande dimension pouvant être utilisée pour ajuster un ensemble pratiquement illimité de relations, mais au prix de la nécessité de disposer de vastes jeux de données d'entraînement. En outre, leur flexibilité limite leur capacité à être utilisés en présence de bruit.
- **Modèles non paramétriques** – Ils sont plus facilement envisagés comme des modèles constituant des approximations locales d'une fonction. Par exemple, nous pouvons disposer d'estimations d'une fonction en un ensemble de points, puis utiliser des extrapolations linéaires de ces points pour fournir des estimations en des points pour lesquels nous ne disposons pas d'estimation.

**Niveau 3 – Reconnaissance de formes** - Le niveau suivant de l'IA a émergé de la communauté de recherche en 2010, s'attaquant au problème de la reconnaissance de formes. La reconnaissance de formes n'est qu'une autre forme d'apprentissage automatique, telle que nous l'avons vue au niveau 2, qui implique l'utilisation de réseaux de neurones. Cependant, ces réseaux de neurones sont beaucoup plus grands que ceux utilisés dans les années 1990. Au lieu de plusieurs milliers à un million de paramètres, ces réseaux de neurones peuvent compter de 10 à 100 millions de paramètres. On les appelait des « réseaux de neurones profonds ».

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SunflowerTakemeHome.jpg" alt="Illustration de la capacité d'un réseau de neurones à reconnaître l'image d'un tournesol, ou le motif vocal disant Take me home.">
  <figcaption><span class="fig-num">Figure 1.8.</span> Illustration de la capacité d'un réseau de neurones à reconnaître l'image d'un tournesol, ou le motif vocal disant « Take me home ».</figcaption>
</figure>

Les entrées seraient les pixels d'une image (ou les signaux d'un motif vocal), ce qui constitue une entrée de dimension bien plus élevée. La partie difficile consistait à créer un jeu de données d'entraînement suffisamment vaste pour effectuer l'ajustement des paramètres. Le jeu de données d'entraînement devait comprendre des millions d'images (ce qui était facile à trouver sur internet) accompagnées des « étiquettes » associées identifiant l'image, telles que « tournesol » ou « Take me home » à la figure 1.8. La partie difficile consistait à obtenir les étiquettes, qui devaient être générées par des personnes.

La percée dans l'entraînement est survenue lorsqu'une professeure d'informatique de Princeton, Fei-Fei Li, a compris qu'un environnement logiciel créé par Amazon appelé « Mechanical Turk » permettait de faire appel à des personnes du monde entier disposées à travailler pour de très faibles salaires afin de créer ces étiquettes. Autrement dit, la percée ne résidait pas tant dans l'analytique sous-jacente (les réseaux de neurones avaient été développés dès les années 1970) que dans l'accès à suffisamment de données à faible coût.

**Niveau 4 – Grands modèles de langage** - Le niveau 4 n'est qu'une étape supplémentaire au-delà de la reconnaissance d'images, où, au lieu d'estimer (ou de « prédire ») l'identité d'une image, le réseau de neurones prenait en entrée une séquence de mots (allant de quelques mots à des centaines, voire des milliers de mots) pour prédire le mot suivant (les modèles agissent sur des fragments de mots appelés « tokens »). Il procède ainsi en créant une distribution de probabilité des mots susceptibles de suivre une séquence de mots donnée, laquelle pourrait être une invite initiale fournie par un utilisateur.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTPrompt.png" alt="Les grands modèles de langage tels que ChatGPT utilisent un jeu de données d'entraînement pour construire une distribution de mots susceptibles de suivre une séquence de mots.">
  <figcaption><span class="fig-num">Figure 1.9.</span> Les grands modèles de langage tels que ChatGPT utilisent un jeu de données d'entraînement pour construire une distribution de mots susceptibles de suivre une séquence de mots, initiée avec une invite, mais s'appuyant sur la séquence créée par le LLM.</figcaption>
</figure>

La figure 1.9 illustre cela, en commençant par l'invite « La meilleure façon d'améliorer la robustesse d'une chaîne d'approvisionnement est de… ». Le réseau de neurones produit alors une distribution de probabilité du mot susceptible de venir ensuite, sur la base du jeu de données d'entraînement. Le grand modèle de langage (ou LLM) échantillonne ensuite à partir de cette distribution, proportionnellement à celle-ci. S'il choisit le mot « concevoir », alors la séquence « La meilleure façon d'améliorer la robustesse d'une chaîne d'approvisionnement est de concevoir… » est fournie en entrée au réseau de neurones, qui produit alors une nouvelle distribution de mots. Le processus consistant à échantillonner un mot, à l'ajouter à la séquence de mots précédente pour produire une nouvelle séquence, est répété encore et encore. C'est pourquoi ce processus est appelé « IA générative ».

Les réseaux de neurones utilisés pour générer la distribution des « mots suivants » qui suivent une séquence précédente sont véritablement colossaux. Alors qu'un réseau de neurones profond pour la reconnaissance de formes (niveau 3) pourrait compter de 10 à 100 millions de paramètres, les réseaux de neurones utilisés pour les LLM peuvent compter entre 10 milliards et 1 000 milliards de paramètres.

Il doit être clair, à partir de cette description, que les LLM ne sont pas intrinsèquement intelligents ; ils ne font qu'imiter des schémas de mots à partir d'un jeu de données d'entraînement. Ils semblent intelligents parce qu'ils imitent des schémas de mots provenant d'une source intelligente (à condition qu'un humain ait écrit les mots).

**Niveau 5 – Optimisation déterministe** – Ce niveau couvre une vaste bibliothèque d'outils permettant de résoudre des problèmes de décision difficiles. Ces problèmes sont connus sous le nom de programmes linéaires, de programmes en nombres entiers et de programmes non linéaires, et ils ont tous la caractéristique qu'une « décision » est un vecteur, ce qui signifie qu'il s'agit d'un ensemble de décisions différentes (un ensemble très vaste). En voici quelques exemples :

- Nous pourrions vouloir décider quelle quantité de produit envoyer depuis un ensemble de 10 centres de distribution vers 200 entrepôts, créant ainsi un vecteur de 2 000 dimensions à déterminer.
- Les compagnies aériennes doivent planifier leurs avions et leurs équipages (pilotes et personnel navigant commercial) sur de longues périodes (généralement trimestrielles) afin de maximiser l'utilisation tout en respectant les règles de maintenance des avions ainsi que les règles d'utilisation du personnel.
- Un gestionnaire financier peut constamment jongler avec l'allocation de capital parmi 10 000 investissements différents, ce qui nous donne 10 000 décisions d'achat ou de vente prises quotidiennement.

Souvent, ces problèmes peuvent être représentés de façon graphique, comme le montre le côté gauche de la figure 1.10, mais il existe une manière standard de les écrire mathématiquement, en partant généralement de la notation présentée à droite. Bien que cette notation mathématique ne soit pas d'un usage courant, les universités forment chaque année des milliers d'étudiants à modéliser des problèmes selon ce formalisme. Ensuite, il existe de nombreux logiciels, certains disponibles commercialement et d'autres gratuitement, capables de résoudre efficacement des problèmes de grande envergure.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmenttoLinearProgram.jpg" alt="Graphical illustration of an assignment problem and its mathematical representation as a linear program.">
  <figcaption><span class="fig-num">Figure 1.10.</span> Illustration graphique d'un type de problème de décision (l'affectation de ressources à des tâches), et sa représentation mathématique sous forme de programme linéaire.</figcaption>
</figure>

**Niveau 6 – Problèmes de décision séquentielle** – La grande majorité des décisions sont prises de façon répétée dans le temps, que ce soit toutes les quelques secondes, minutes ou heures, quotidiennement, hebdomadairement, trimestriellement ou annuellement. Même nos problèmes d'optimisation déterministe du niveau 5 ci-dessus sont généralement résolus de manière répétée dans le temps, mais la plupart des décisions sont beaucoup plus simples. Voici quelques exemples de problèmes de décision séquentielle :

- Décider quand vendre un actif, et la valeur espérée de conserver l'actif face à des prix évoluant dynamiquement.
- Réapprovisionner les stocks, éventuellement avec des délais de livraison très longs, pour satisfaire une demande incertaine dans un marché dynamique.
- Déterminer les paramètres d'une politique de trading financier automatisée.
- Choisir les bonnes concentrations de matériaux, la bonne température de mélange et la durée d'exposition du mélange à chaque température pour produire un matériau ayant la résistance la plus élevée.
- Choisir le meilleur médicament pour traiter un patient présentant des caractéristiques spécifiques.
- Décider combien d'énergie stocker à partir d'une combinaison de parcs éoliens, de parcs solaires et du réseau électrique pour répondre aux charges (demandes) futures au moindre coût.
- Le transport routier par camion complet nécessite de déterminer quels conducteurs doivent transporter quels chargements de fret.
- Choisir combien investir dans chacune des milliers d'actions et autres placements.

Les problèmes de décision séquentielle se rencontrent tout au long des processus humains. Une décision peut être binaire (conserver ou vendre), discrète (quel médicament), ou constituée de vecteurs discrets et continus. Choisir la meilleure option parmi un ensemble discret (ou discrétisé) de choix est de loin le problème de décision séquentielle le plus courant, mais beaucoup impliquent des problèmes opérationnels complexes qui se posent dans la logistique commerciale, les systèmes énergétiques et les problèmes de distribution dans le domaine de la santé.

**Niveau 7 – Créativité, raisonnement et jugement** – Le niveau 7 représente le plus haut niveau d'intelligence. Par exemple, bien que de nombreux problèmes des niveaux 5 et 6 puissent être assez complexes, ils impliquent toujours des problèmes bien structurés avec des décisions et des objectifs clairement définis. Le niveau 7 est celui où l'on peut poser des problèmes complexes tels que la réduction des émissions de CO2, la minimisation des maladies et la création de nouveaux produits.

Nous sommes fermement convaincus que, bien que de nombreux auteurs évoquent l'avenir de « l'IA » en termes de remplacement des personnes, la réalité est que les ordinateurs ne pourront pas dépasser les problèmes bien définis. Une activité que nous jugeons hors de portée de l'intelligence informatique (y compris les compétences surmédiatisées des grands modèles de langage) est la formulation de problèmes de décision complexes. C'est pourquoi nous qualifions le niveau 7 de science-fiction, quelque chose d'amusant à évoquer mais qui ne se réalisera jamais réellement.

### Trois classes d'intelligence informatique

Les six premiers niveaux d'intelligence artificielle représentent différentes formes d'intelligence pouvant être mises en œuvre sur un ordinateur, tandis que le septième, selon nous, demeure le seul domaine des humains. Les six premiers niveaux peuvent être divisés en trois classes distinctes :

**Classe 1 – Comportements spécifiés par l'humain** – Cette classe comprend le niveau 1 des sept niveaux d'IA, et peut être utilisée à deux fins différentes :

- Reconnaissance de formes – Une règle peut spécifier que si un patient présente un ensemble particulier de conditions, alors il est atteint d'une maladie spécifique.
- Décisions – De même, un patient présentant un ensemble particulier de conditions devrait prendre un médicament particulier (ce qui constitue une forme de décision).

La logique fondée sur des règles ne fait pas de distinction entre le fait qu'une règle énonce un constat sur l'état du monde ou une action à entreprendre. Les conditions sous-jacentes à la règle et son résultat (qu'il s'agisse d'un énoncé sur l'état ou d'une décision) doivent être spécifiés manuellement.

Une caractéristique importante de l'intelligence artificielle de Classe 1 est ce qu'elle n'utilise pas :

- Elle n'utilise pas de jeu de données d'entraînement.
- Elle ne nécessite pas de modèle du problème de décision sous-jacent.

Les règles doivent être directement spécifiées par des personnes, bien qu'il soit possible que des règles soient spécifiées dans un jeu de données. Par exemple, nous pourrions disposer d'un jeu de données répertoriant des protocoles médicaux, où un traitement est spécifié pour chaque condition du patient. Toutefois, imaginons que nous disposions d'un jeu de données compilé à partir de décisions réelles de médecins, lesquelles peuvent être contradictoires : différents médecins peuvent prescrire des traitements contradictoires malgré des patients présentant des conditions identiques. Si nous utilisons ce jeu de données pour apprendre des traitements, il s'agirait d'un exemple d'apprentissage automatique.

**Classe 2 – Apprentissage automatique** – Cette classe comprend les niveaux 2, 3 et 4. L'apprentissage automatique désigne l'utilisation de fonctions mathématiques constituées d'entrées et d'un ensemble de paramètres ajustables pouvant être réglés de sorte que la fonction corresponde le mieux possible à un ensemble de réponses, également appelées étiquettes (parmi bien d'autres appellations). L'apprentissage automatique nécessite une fonction spécifiée par l'utilisateur, ainsi qu'un jeu de données d'entraînement constitué d'entrées et de réponses (étiquettes).

Alors que la logique fondée sur des règles est limitée en termes de complexité des entrées, l'apprentissage automatique peut traiter des entrées très complexes à l'aide de modèles comportant un grand nombre de paramètres. Les modèles linéaires peuvent comporter de quelques dizaines à plusieurs centaines de milliers de variables. Des réseaux de neurones ont été entraînés pour des applications de grands modèles de langage avec plus d'un billion de variables. Bien entendu, des modèles plus grands nécessitent des jeux de données volumineux, ce qui s'est avéré être le principal obstacle limitant l'utilisation des réseaux de neurones pour la tâche extrêmement complexe du traitement du langage.

**Classe 3 – Optimisation** – Cette classe comprend les niveaux 5 et 6, qui traitent du problème consistant à choisir la meilleure décision parmi un ensemble de choix, lequel peut être un ensemble discret ou un espace vectoriel de grande dimension. Le niveau 5 se limite aux problèmes statiques (déterministes) où toutes les données sont connues, et où l'on cherche la meilleure décision (souvent un vecteur). Le niveau 6 s'attaque au problème complexe consistant à choisir les meilleures décisions au fil du temps, ce qui couvre un éventail absolument vaste de problèmes.

La classe optimisation n'utilise pas de jeu de données d'entraînement. Il est plutôt nécessaire de spécifier une mesure de performance (souvent appelée fonction objectif) ainsi qu'un ensemble d'équations décrivant les décisions admissibles. Pour les problèmes de décision séquentielle, nous avons également besoin d'équations qui nous indiquent comment l'information évolue dans le temps.

### Résumé

Les méthodes de la classe 2, l'apprentissage automatique, visent à entraîner des fonctions mathématiques pour qu'elles se comportent comme un jeu de données d'entraînement. Si le jeu de données d'entraînement est constitué d'images telles que des radiographies mammaires accompagnées d'« étiquettes » générées par des humains indiquant si le sein présente des signes de cancer, le modèle entraîné ne pourra jamais performer mieux que les compétences des radiologues ayant fourni les étiquettes. C'est pourquoi on peut dire que les méthodes de Classe 2 (apprentissage automatique) apprennent aux ordinateurs à se comporter comme des humains (plus précisément, à se comporter comme le jeu de données d'entraînement).

En revanche, les méthodes de la Classe 3 (optimisation) sont conçues pour produire des décisions surpassant celles des humains. Le prix de cette performance de plus haut niveau est que nous devons fournir ce que l'on appelle un modèle du problème. En particulier, ces méthodes nécessitent un modèle mathématique, constitué de :

- Un ensemble de décisions bien défini.
- Une mesure de performance claire permettant d'évaluer si une décision est meilleure qu'une autre.
- La physique du problème qui décrit :
  - Quelles décisions peuvent être prises à un moment donné.
  - Comment le système évolue dans le temps.
  - Comment de nouvelles informations parviennent au système.

Cet ouvrage traite de la classe 3, car elle couvre les méthodes qui portent sur la prise de décision. En particulier, nous allons nous concentrer sur les problèmes de décision séquentielle, car ce sont les plus répandus – pratiquement tout le monde prend des décisions, et nous les prenons dans le temps, ce qui en fait des décisions séquentielles. Les problèmes statiques (déterministes) ne sont qu'un cas particulier des problèmes de décision séquentielle, et la résolution des problèmes de décision séquentielle s'appuiera fortement sur les outils développés pour les problèmes statiques déterministes.

Les problèmes de décision séquentielle représentent une classe de problèmes incroyablement riche. Ces outils dépendent invariablement des méthodes des cinq premiers niveaux d'intelligence artificielle. Comme pour les outils de niveau 5 (optimisation déterministe), nous avons besoin d'un modèle du problème sous-jacent. Cependant, comme les problèmes de décision séquentielle sont beaucoup plus riches que les problèmes statiques du niveau 5, les modèles doivent être beaucoup plus riches et complexes, mais c'est là un domaine où la modélisation mathématique classique s'est révélée insuffisante.

## Cadres de modélisation traditionnels

Il est utile de diviser les cadres de modélisation pour la prise de décision en deux grandes catégories :

- Les modèles statiques et déterministes qui supposent que toute l'information est connue, où nous nous efforçons de choisir les décisions les plus performantes.
- Les modèles de décision séquentielle qui capturent le flux des décisions et de l'information. Puisque nous modélisons explicitement l'information qui arrive après la prise d'une décision, cela signifie que les décisions doivent être prises avant que l'information (vraisemblablement pertinente pour la performance de la décision) ne soit arrivée.

Dans ce volume, tous les problèmes de décision séquentielle capturent explicitement le flux d'information, ce qui signifie que nous prenons des décisions à chaque instant avant de connaître l'information qui pourrait arriver dans le futur. Pour cette raison, les problèmes de décision séquentielle sont fondamentalement *stochastiques* (le terme savant pour dire que l'information future est aléatoire).

### Modèles statiques et déterministes

La littérature consacrée à la modélisation des problèmes statiques et déterministes est assez mature, avec une base logicielle substantielle construite autour de variations d'un modèle d'optimisation qui peut s'écrire :

$$
\begin{align}
\min_{x,y} \quad & C(x,y) \tag{1}\\
\text{subject to:}\\
& g(x,y) = 0, \tag{2}\\
& x \geq 0, \tag{3}\\
& y \in \{0,1\}. \tag{4}
\end{align}
$$

Nous avons prévu la présence à la fois de variables continues $x$ (qui peuvent prendre une valeur telle que 0,56) et de variables discrètes $y$ qui doivent valoir 0 ou 1.

Ce qui se passe lors de la modélisation de problèmes d'optimisation déterministe (niveau 5), c'est que l'on prend le modèle mathématique donné par les équations (1)–(4), puis on se tourne vers le problème physique et on remplit les éléments du modèle, ce qui nécessite d'identifier les variables de décision, la fonction objectif et les contraintes. Imaginez que vous ayez un marteau et que vous cherchiez des clous. L'outil est utile, mais le processus nécessite d'adapter le problème au cadre de modélisation.

L'optimisation déterministe a longtemps mis l'accent sur le défi consistant à concevoir des outils permettant de trouver les décisions optimales à partir d'un modèle donné, en accordant une attention secondaire à la création du modèle lui-même. Notez que le cadre de modélisation ne fournit aucun mécanisme permettant de capturer l'évolution des décisions et de l'information, ni quoi que ce soit lié à la manière dont les décisions sont organisées.

### Modèles de décision séquentielle

Traditionnellement, la littérature consacrée aux problèmes de décision séquentielle a tenté de suivre la même approche, mais elle a complètement échoué. Contrairement au cadre de modélisation bien défini pour l'optimisation déterministe représenté par les équations (1)–(4), la littérature en optimisation n'a pas adopté de cadre de modélisation standard pour les problèmes de décision séquentielle. Au moment de la rédaction de ce texte, on compte plus d'une douzaine de communautés différentes utilisant huit systèmes de notation distincts, avec des styles fondamentalement différents pour exprimer quel problème est résolu, ou ce que l'on cherche à déterminer. Par exemple, certaines communautés écrivent une fonction objectif comme cela se fait en optimisation déterministe, d'autres écrivent une politique, et d'autres encore écrivent une condition d'optimalité.

Notre approche repose sur le cadre de modélisation universel esquissé dans la [section ci-dessus](#universalmodelingframework), qui peut être utilisé pour modéliser *n'importe quel* problème de décision séquentielle. Ce cadre de modélisation est décrit en détail dans *Reinforcement Learning and Stochastic Optimization* [chapitre 9]. Cet ouvrage présente le modèle avant de décrire les politiques permettant de prendre des décisions, ce qui est fait au chapitre 11 (le chapitre 10 se concentre sur la modélisation de l'incertitude).

Le Volume II de cette série couvrira également les dimensions du cadre de modélisation universel de manière beaucoup plus détaillée que nous ne pouvons le faire dans ce volume, en utilisant des niveaux de notation modestes. Cependant, le cadre de modélisation universel ne peut être utilisé sans répondre aux trois questions abordées dans ce volume.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoicewithUncertainty.jpg" alt="A decision problem with discrete choices, and uncertainty about the value of each choice.">
  <figcaption><span class="fig-num">Figure 1.11.</span> Un problème de décision avec des choix discrets, et une incertitude sur la valeur de chaque choix.</figcaption>
</figure>

### Le problème de décision le plus courant

Les problèmes de décision, et en particulier les problèmes de décision séquentielle, constituent une classe de problèmes exceptionnellement riche. Cependant, ce qui est souvent négligé dans la littérature sur l'optimisation, c'est que la grande majorité des problèmes de décision sont décrits par la figure 1.11, où nous pouvons avoir deux choix (entreprendre une action ou non), ou un petit ensemble de choix (quel médicament utiliser, où acheter une pièce), ou un grand nombre de choix (quel produit promouvoir, quelle molécule utiliser lors de la création d'un nouveau médicament).

Une caractéristique distinctive de cette classe de problèmes est que, bien que nous puissions disposer d'une estimation de la performance de chaque choix, nous sommes généralement incertains quant à la performance qui se manifestera après avoir fait un choix. Il se peut que nous n'ayons qu'une seule chance de faire le meilleur choix, mais souvent nous prenons cette décision de manière répétée, et pouvons tirer des enseignements des expériences passées. Il existe de nombreuses variantes de ce problème :

- Que nous réalisions des expériences hors ligne dans un laboratoire ou un simulateur, ou que nous devions apprendre en agissant.
- Le nombre de fois où nous répétons le choix.
- Ce que nous apprenons d'un choix peut affecter nos croyances concernant d'autres choix, reflétant un modèle de croyance sous-jacent.
- La structure du modèle de croyance qui capture d'éventuelles relations structurelles sous-jacentes.
- La présence de ressources physiques qui sont consommées ou gérées, comme la mise en place d'une machine pour réaliser une expérience, la consommation de fournitures, ou le besoin de personnel qualifié.
- Le temps et les dépenses nécessaires pour faire et mettre en œuvre un choix.

L'approche la plus courante utilisée par les personnes lorsqu'elles choisissent parmi un ensemble discret de choix consiste simplement à sélectionner celui qui semble être le meilleur. Cela ignore la capacité d'apprendre du choix effectué pour prendre une meilleure décision à l'avenir. La valeur de l'apprentissage actuel sur les décisions futures dépendra fortement du nombre de fois où nous serons confrontés au même ensemble de choix. Cela peut également ignorer des risques qui pourraient être associés au fait de faire un choix qui pourrait s'avérer très médiocre.

Il existe de nombreux contextes où les décisions sont particulièrement importantes, et où nous devons vivre avec la décision pendant un certain temps. Des exemples pourraient être la décision de développer un médicament particulier, ou le choix d'un fournisseur avec lequel nous devons composer pendant au moins un an. Pour ces problèmes, il est particulièrement important de consacrer du temps à élaborer le meilleur ensemble de croyances concernant la performance possible de chaque choix.

Les modèles de croyance sont généralement compliqués par les corrélations. Choisir quel médicament développer peut nécessiter de comparer différents types de médicaments anticancéreux qui desservent un marché similaire. Nous pourrions avoir à choisir parmi un certain nombre de fournisseurs regroupés par pays qui partagent les mêmes risques d'augmentation des tarifs douaniers, d'épidémies, et de variations monétaires.

### Problèmes de décision statiques versus séquentiels

Dans la littérature académique, il existe un fort sentiment de compétition entre la communauté pratiquant l'optimisation déterministe et les communautés fragmentées pratiquant l'optimisation sous incertitude. La plupart des modèles d'optimisation déterministe sont des approximations déterministes de problèmes stochastiques, et un effet secondaire est que les personnes utilisant l'optimisation déterministe peuvent être particulièrement sur la défensive lorsqu'elles sont confrontées à la manière dont l'incertitude affecte leur problème.

Nous invitons les lecteurs à garder à l'esprit ce qui suit :

- Un modèle d'optimisation statique et déterministe n'est qu'un cas particulier d'un problème de décision séquentielle.
- Nous montrerons (dans le Volume II) que les outils d'optimisation déterministe sont largement utilisés dans la résolution de problèmes de décision séquentielle généraux.
- De loin, le problème de décision le plus courant qui se présente dans les applications pratiques est celui représenté à la figure 1.11, où nous devons choisir le meilleur parmi un ensemble de choix. Même lorsque nous capturons l'incertitude dans nos croyances concernant les choix, les différentes méthodes pour résoudre ce problème se réduisent tout de même à résoudre des séquences de problèmes d'optimisation déterministe.
- Le problème n'est pas qu'une approximation déterministe soit utilisée ; l'erreur réside dans la manière dont les décisions sont évaluées. La performance des décisions doit être évaluée dans le temps à mesure que de nouvelles informations arrivent.

L'erreur la plus courante commise dans l'utilisation des modèles d'optimisation déterministe est de négliger le fait que le problème doit être résolu de manière répétée dans le temps. Un exemple de cela se présente dans une classe de problèmes appelée « problème d'affectation », où nous affectons des « ressources » (personnes, camions, machines) à des « tâches » (affectations de travail, charges à déplacer, travaux à accomplir). Ceux-ci ne sont jamais résolus une seule fois ; à mesure que le temps avance, les ressources progressent dans l'achèvement des tâches, de nouvelles tâches sont signalées, et les machines peuvent subir des pannes modifiant le temps nécessaire pour terminer une tâche.

La figure 1.12(a) représente le problème comme un problème statique et déterministe. Lorsque ce problème a été résolu pour la première fois par George Dantzig dans les années 1950, cela a été considéré comme une percée majeure (ce qui était le cas). Cependant, même 70 ans plus tard, les meilleurs professionnels ignorent que le problème n'est jamais résolu une seule fois ; il doit être résolu de manière répétée dans le temps, et il est presque toujours vrai que la solution à un moment donné affecte les problèmes qui devront être résolus dans un avenir (incertain).

<figure class="book-figure">
  <div class="book-figure-row">
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/StaticAssignment.jpg" alt="Static assignment problem.">
      <figcaption>(a)</figcaption>
    </figure>
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/DynamicAssignment.jpg" alt="Dynamic assignment problem.">
      <figcaption>(b)</figcaption>
    </figure>
  </div>
  <figcaption><span class="fig-num">Figure 1.12.</span> (a) Problème d'affectation statique ; (b) problème d'affectation dynamique.</figcaption>
</figure>

Le véritable problème est représenté à la figure 1.12(b), où nous illustrons le problème résolu de manière séquentielle dans le temps. Nous notons qu'il est impossible de déterminer si un problème d'optimisation déterministe doit être résolu de manière séquentielle simplement en examinant les mathématiques du modèle ; cela requiert de comprendre le problème en langage naturel.

## Étapes de la modélisation

Nous commençons par reconnaître trois manières différentes d'envisager un problème :

- **Le monde réel** – C'est là où les décisions sont mises en œuvre, et où nous recueillons des informations décrivant la performance réelle de notre système.
- **Le modèle de base** – Il s'agit généralement d'un simulateur conçu pour imiter le monde réel aussi fidèlement que possible. Les simulateurs (parfois appelés « jumeaux numériques ») sont puissants, mais ils peuvent être très coûteux à développer, ce qui explique pourquoi nous devons souvent concevoir des méthodes de prise de décision sans bénéficier d'un simulateur pour tester la performance de notre politique.
- **Un modèle d'anticipation** – Les modèles d'anticipation ne sont utilisés que pour la prise de décision lorsque nous devons approximer l'impact d'une décision prise maintenant sur l'avenir. Les modèles d'anticipation sont largement utilisés sous une certaine forme (Google Maps utilise un modèle d'anticipation approximatif pour planifier un itinéraire vers la destination), mais ils ne sont pas utilisés universellement.

Dans la [discussion sur le cadrage du problème ci-dessus](#framingtheproblem), nous avons décrit trois étapes impliquées dans la compréhension des différentes dimensions d'un problème de décision. Dans cette section, nous allons nous concentrer spécifiquement sur le développement d'un modèle informatique, si nécessaire.

1. **Cadrer le problème :** – Toute tentative de modéliser un problème de décision nécessite les éléments identifiés dans notre processus de cadrage :
   - Un récit en langage clair – Il est important de toujours commencer une description avec les mots d'un expert du domaine sans aucune formation, même dans le processus de modélisation.
   - Répondre aux trois questions de cadrage :
     - Quelles sont les métriques de performance ? Si vous ne pouvez pas formuler de métriques de performance quantifiables, vous êtes peut-être confronté à l'un de ces problèmes complexes et non structurés qui ne se prêtent pas à un processus d'analyse formel.
     - Quels types de décisions sont prises (et éventuellement qui les prend) ? À ce stade, le simple fait de lister les décisions potentielles rend-il évident le choix que vous devriez faire ?
     - Quels sont les types d'incertitudes qui peuvent affecter la performance du système ? Cela peut être une question complexe qui nécessitera du temps pour être formulée puis analysée afin de comprendre l'effet de ces incertitudes sur la performance des différentes décisions.

   À ce stade, vous pourriez sentir que le choix que vous devriez faire est évident. Si ce n'est pas le cas, passez à l'étape suivante.
2. **Le cadre de modélisation universel** – Comprendre les différents éléments du cadre de modélisation universel (décrit [ci-dessus](#universalmodelingframework)) peut vous permettre d'appréhender votre problème de manière plus complète. Plus précisément :
   - Vous devrez réunir les informations dont vous avez besoin pour prendre une décision et calculer vos métriques de performance (également appelées variables d'état). Comme cela dépend de la manière dont vous allez prendre les décisions (la politique), vous ne pourrez généralement pas identifier tous les éléments des variables d'état immédiatement.

Prêtez attention aux informations que vous souhaiteriez avoir, mais que vous ne pouvez pas observer directement (du moins pas avec précision). Celles-ci peuvent représenter des opportunités d'utiliser l'estimation statistique/l'apprentissage automatique.
   - Comprenez quelles décisions vous êtes autorisé à prendre. Plus tard, vous aborderez le problème de la prise de décisions (la conception de la politique).
   - Listez les types d'informations qui arriveront après que vous ayez pris une décision.
   - Vous devrez réfléchir à la façon dont l'information contenue dans la variable d'état évolue dans le temps. Bien entendu, cela évolue en fonction de notre compréhension des informations dont nous avons besoin. C'est la fonction de transition.
   - Enfin, vous devrez comprendre comment vous allez évaluer la performance de votre système. Cela constitue votre fonction objectif.
3. **Modéliser l'incertitude** – Il s'agit souvent de la dimension la plus subtile de la modélisation d'un problème de décision séquentielle, souvent parce que les quantités incertaines ne sont pas immédiatement évidentes. Bien qu'il existe de nombreuses sources potentielles d'incertitude, il n'y a que deux façons pour elle d'entrer dans le modèle :
   - L'incertitude sur les quantités et paramètres au sein de la variable d'état, qui porte l'information nécessaire pour prendre une décision et/ou calculer des indicateurs de performance.
   - L'incertitude sur l'information qui peut arriver après qu'une décision a été prise, mais avant que la décision suivante ne soit prise (nous avons appelé cela le processus d'information exogène).

   Il existe différentes façons de capturer l'incertitude :
   - Utiliser des observations historiques de quantités incertaines (prix, demandes, temps de trajet), et utiliser ces échantillons pour calibrer et ajuster notre modèle.
   - Créer un modèle mathématique de l'incertitude, puis générer des échantillons à partir de ce modèle mathématique.

   Nous traitons l'incertitude de manière beaucoup plus approfondie au Chapitre 5, où nous identifierons un certain nombre de sources d'incertitude différentes comme guide pour nommer les incertitudes qui s'appliquent à votre application spécifique.
4. **Concevoir des politiques** – Ici, nous abordons le défi très riche de la conception de méthodes pour prendre des décisions. Le Chapitre 4 décrit quatre classes de politiques, qui capturent des méthodes fondamentalement différentes pour prendre des décisions, mais nous renvoyons au Volume III une discussion complète du processus de conception des politiques.

   Notez que si nous introduisons l'idée d'une variable d'état dans le cadre de modélisation universel, la variable d'état est en partie définie par l'information nécessaire à la politique.
5. **Implémentation informatique** – Une fois que nous avons conçu des politiques, nous devons décider comment nous allons les tester. Les choix sont :
   - Test sur le terrain – Dans ce cas, tout ce que nous avons à faire est d'implémenter la politique sur un ordinateur, ce qui implique également de réunir les données nécessaires pour prendre une décision.
   - Simulation informatique – La façon dont nous testons les politiques sur ordinateur dépend de la complexité du système. En général, nous choisissons entre :
     - Implémentation dans une feuille de calcul – La plupart des problèmes sont relativement simples, ce qui nous permet de tester des idées dans une feuille de calcul. Les feuilles de calcul peuvent même constituer la base d'un système de production.
     - Environnements de programmation généraux – Si le problème est trop complexe pour une feuille de calcul, nous devrons nous tourner vers l'un des nombreux environnements de programmation disponibles. Cela requiert les compétences de programmeurs experts.
6. **Évaluer et calibrer les modèles et les politiques** – À ce stade, nous devons décider si nous pouvons développer un simulateur pour évaluer la politique, ou si nous devons implémenter la politique afin qu'elle puisse être utilisée sur le terrain :
   - Développer un simulateur informatique – À ce stade, nous avons tout ce dont nous avons besoin pour simuler la performance de la politique. Un simulateur informatique n'est rien de plus qu'une implémentation logicielle des éléments du cadre de modélisation universel. Nous pouvons ensuite exécuter ce simulateur soit sur des données historiques, soit sur des données générées à partir d'un modèle mathématique.
   - Test sur le terrain – Il arrive souvent que nous n'ayons pas le temps ou les ressources nécessaires pour développer un simulateur. Nous implémentons alors la politique et surveillons ensuite son efficacité en pratique.

   Créer un simulateur informatique offre des avantages significatifs, mais introduit la dimension difficile de la calibration du modèle. À l'inverse, implémenter une politique directement sur le terrain signifie que nous la testons dans un environnement qui ne nécessite aucune calibration. Le problème d'une implémentation sur le terrain est que la recherche parmi différentes classes de politiques, et en particulier l'ajustement de paramètres quelconques, peut être extrêmement lente. L'ajustement des politiques sur le terrain a reçu très peu d'attention dans la littérature de recherche.

## Types d'analytique

Si nous résolvons des problèmes d'optimisation déterministe, nous pouvons nous appuyer sur une importante famille de solveurs, allant de progiciels commerciaux tels que Gurobi ou FICO Xpress à un large éventail de logiciels téléchargeables gratuitement. Par exemple, Google propose sa « OR Toolbox » gratuitement, même pour les utilisateurs commerciaux.

Il existe très peu d'outils commerciaux pour optimiser des décisions dans le temps, comme cela serait nécessaire dans un problème de décision séquentielle. Cependant, nous nous appuierons généralement sur plusieurs boîtes à outils lorsque nous construirons des systèmes personnalisés pour des problèmes spécifiques. Celles-ci comprennent :

- **Optimisation déterministe** – Le simple fait que nous essayions de prendre des décisions dans le temps, sous incertitude, ne signifie pas que les outils de l'optimisation déterministe ne sont plus utilisés. En fait, la plupart des problèmes de décision séquentielle (mais pas tous) impliquent la résolution de séquences de problèmes d'optimisation résolus à l'aide de solveurs déterministes.
- **Simulation** – Il s'agit généralement de la simulation Monte Carlo, qui est un ensemble d'outils et de techniques pour estimer des fonctions de variables aléatoires. Les outils Monte Carlo sont particulièrement bien adaptés aux problèmes complexes et de grande dimension, ce qui en fait l'un des outils les plus puissants pour modéliser l'évolution de l'information.
- **Estimation statistique/apprentissage automatique** – Les outils Stat/ML, qui comprennent la régression linéaire ou non linéaire, la régression par arbres, les modèles localement paramétriques, et les réseaux de neurones de tailles diverses. Le Stat/ML peut être décrit comme un ensemble d'outils pour estimer quelque chose que nous ne connaissons pas, en utilisant des informations que nous connaissons.

Ces outils sont généralement décrits comme provenant de communautés différentes, dont une seule (l'optimisation déterministe) est considérée comme résolvant des problèmes de décision. Et pourtant, il est important de comprendre le rôle de chacun aux fins de la prise de décision.

Les modèles de simulation, par exemple, sont presque toujours construits pour aider à comprendre le comportement d'un processus, qui peut être n'importe quoi, d'une usine de fabrication à la propagation d'une maladie dans une population. Dans ces deux exemples, nous chercherons à voir comment la conception du système (l'agencement de l'usine, l'endroit où sont stockés les stocks de vaccins) ou le contrôle du système (comment les tâches sont acheminées, le placement des commandes de réapprovisionnement de vaccins) influence les résultats. Nous pourrions aussi simuler la trajectoire des ouragans, et bien que nous ne puissions pas modifier leurs trajectoires, cette information peut être utilisée pour aider à guider les évacuations, qui devraient elles aussi être simulées.

En bref, il est utile de considérer les modèles de simulation comme des fonctions objectifs, ou des prévisions d'événements futurs à utiliser pour prendre des décisions.

Qu'en est-il alors de l'estimation statistique/l'apprentissage automatique ? Bien que ces domaines utilisent l'optimisation pour ajuster un modèle, l'objectif est simplement d'estimer une quantité ou un paramètre. Mais pourquoi créons-nous ces estimations ?

Nous pourrions estimer la nature d'une tumeur, ou combien de personnes approuvent la performance d'un président, ou la probabilité qu'un circuit fonctionne. Ou bien nous pourrions estimer des événements futurs, comme le nombre de personnes susceptibles d'acheter un produit, ou la production d'énergie d'un parc éolien. Dans tous ces cas, nous créons une estimation ou une prévision pour aider à prendre une décision maintenant.

Chacun de ces outils peut également fournir des services ayant une valeur intrinsèque au-delà de l'aide à la prise de meilleures décisions. Cela se voit le plus facilement avec les grands modèles de langage qui évoluent rapidement au moment de la rédaction de ce texte. Par exemple, les LLM peuvent aider dans un ensemble croissant de tâches telles que la réalisation de recherches, le traitement de requêtes et la création d'images, mais pas la prise de décisions.

## Remarques finales

Ce chapitre a posé les bases pour réfléchir à l'ensemble complexe de problèmes connus sous le nom de problèmes de décision séquentielle. Nous partons de la prémisse suivante :

> « Si vous voulez mieux gérer {n'importe quoi}, vous devez prendre de meilleures décisions. »

La grande majorité des situations impliquant la prise de décisions relèvent de la vaste catégorie des problèmes de décision séquentielle, où nous prenons des décisions de manière répétée dans le temps à mesure que de nouvelles informations arrivent (notez qu'un cas particulier de problème de décision séquentielle est un problème où l'on ne fait qu'une seule décision).

L'objectif de ce volume est de construire des ponts entre tout problème où l'on souhaite améliorer la performance (probablement en prenant de meilleures décisions), et les logiciels informatiques qui peuvent aider à ces décisions. Les ordinateurs nécessitent des modèles mathématiques capturant le problème, et ces modèles doivent comprendre le problème, exprimé en anglais, mais en utilisant des termes qui capturent le problème d'une manière pouvant être traduite dans le langage des modèles.

Une caractéristique essentielle de ce processus est l'utilisation d'une stratégie de modélisation générale que nous appelons le cadre de modélisation universel. Nous affirmons, sur la base de décennies de travail sur une très large classe de problèmes issus de nombreux contextes, que ce cadre de modélisation peut capturer les caractéristiques de tout problème où les ordinateurs peuvent être utiles. Il s'agit d'une réserve importante, car il existe des problèmes dont les métriques sont mal définies, voire inexistantes : Faut-il épouser quelqu'un ? Quelle filière choisir comme spécialité à l'université ? Quel restaurant choisir pour recevoir un visiteur ?

Le cadre de modélisation universel formalise des choix tels que la façon de prendre une décision (appelée politique), ce qui permet ensuite de répondre à la question de savoir quelle information est nécessaire. Le CMU fournit également une base pour comparer les politiques qui n'ont pas besoin de prévision (acheter bas, vendre haut en finance, politiques de stock de réapprovisionnement jusqu'à un niveau cible) avec celles qui en ont besoin, et pour évaluer la valeur de prévisions plus précises.

L'utilisation des ordinateurs pour prendre des décisions ouvre la porte à l'usage de « l'intelligence artificielle », un terme largement employé dans la presse grand public sans être correctement défini. Nous couvrons les sept niveaux de l'intelligence artificielle qui différencient clairement les outils fondés sur l'apprentissage automatique, tels que les grands modèles de langage (comme ChatGPT), des outils de prise de décision, tels que l'optimisation déterministe (niveau 5) et les problèmes de décision séquentielle (niveau 6).

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quelles sont les trois étapes de l'automatisation des décisions ?</li>
<li>Quelles sont les trois questions posées à l'Étape 1 du cadrage du problème ? Illustrez-les dans un contexte de problème de votre choix.</li>
<li>Quels sont les cinq éléments du cadre de modélisation universel ?</li>
<li>Quelle est la définition d'une décision ? Donnez trois exemples dans différents contextes que vous rencontrez dans vos activités personnelles.</li>
<li>Décrivez brièvement les sept niveaux de l'intelligence artificielle, répartis en quatre classes différentes telles qu'organisées dans le chapitre.</li>
<li>Quelles sont les trois classes de modèles statistiques ?</li>
<li>Quelle est la différence entre un modèle de base et un modèle d'anticipation ? Utilisez le contexte d'un long trajet en voiture avec Google Maps pour illustrer ces deux notions.</li>
<li>Quelles sont les six étapes de la modélisation ?</li>
</ol>

**Questions de modélisation**

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Donnez un exemple de problème de décision séquentielle que vous rencontrez dans vos activités quotidiennes et faites ce qui suit :
  <ol type="a">
    <li>Identifiez au moins un indicateur de performance que vous aimeriez améliorer.</li>
    <li>Proposez au moins une décision qui affecte l'indicateur de performance.</li>
    <li>Décrivez les incertitudes susceptibles d'interférer avec la performance de la décision lorsqu'elle est mise en œuvre.</li>
  </ol>
</li>
<li>Donnez trois exemples de problèmes impliquant des ressources physiques et identifiez les décisions qui se posent dans chaque cas.</li>
<li>Vous allez jouer 15 parties de morpion où l'objectif est de forcer l'adversaire à obtenir trois symboles alignés (auquel cas vous gagnez). Aucun de vous deux n'a jamais joué à ce jeu, et vous souhaitez saisir la manière dont l'autre joueur apprend votre stratégie de jeu. Rappelez-vous que le morpion se termine généralement par une égalité, il sera donc nécessaire d'amener votre adversaire à croire que vous allez commettre une erreur. Répondez aux questions ci-dessous en français (aucune formule mathématique n'est autorisée).
  <ol type="a">
    <li>Concevez un indicateur de performance qui capture les résultats des 15 parties.</li>
    <li>Quelles décisions devez-vous prendre ?</li>
    <li>Quelles sont les incertitudes ?</li>
    <li>Décrivez les informations que vous auriez après avoir joué plusieurs parties et dont vous auriez besoin pour concevoir une politique.</li>
  </ol>
</li>
</ol>

{% endraw %}
