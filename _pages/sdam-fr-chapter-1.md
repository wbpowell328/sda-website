---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "# Chapitre 1 : Modélisation des problèmes de décision séquentielle"
permalink: /sdam/fr/chapter-1/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: c8dee8647c7936a6
---

{% raw %}
Le processus de résolution de tout problème physique (et en particulier de tout problème de décision séquentielle) sur ordinateur nécessite la construction d'un modèle mathématique, comme illustré à la Figure 1.1. Depuis des décennies, la communauté de recherche utilise un cadre mathématique standard pour les problèmes de décision où toutes les données sont connues à l'avance (ce que l'on appelle l'optimisation déterministe). Une version simple d'un problème d'optimisation déterministe, connue sous le nom de programme linéaire, peut s'écrire

$$
\begin{align}
\min_x c^T x, \label{eq:linearprogram1}
\end{align}
$$

où $x$ est un vecteur d'éléments qui doivent satisfaire un ensemble de contraintes typiquement écrites

$$
\begin{align}
A x & =  b, \label{eq:linearprogram2}\\
x   & \geq 0. \label{eq:linearprogram3}
\end{align}
$$

<figure class="book-figure">
  <img src="/assets/images/sdam/modeling.png" alt="Le pont entre le monde réel et l'ordinateur est un modèle mathématique." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 1.1.</span> Le pont entre le monde réel et l'ordinateur est un modèle mathématique.</figcaption>
</figure>

Il n'est pas nécessaire de comprendre les équations $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ (ce qui exige une familiarité de base avec l'algèbre linéaire), mais des milliers d'étudiants sortent chaque année de cours où ils apprennent cette notation, et apprennent également comment traduire un large éventail de problèmes physiques dans cette notation. Ensuite, il existe des logiciels qui traduisent les problèmes formulés ainsi en une solution. Plus important encore, ce langage notationnel est parlé partout dans le monde. On peut faire la même remarque à propos de la modélisation statistique/de l'apprentissage automatique, qui constitue aujourd'hui une communauté bien plus large que celle des personnes qui comprennent les équations $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$.

Nous ne pouvons pas faire la même remarque concernant les problèmes de décision séquentielle, qui forment une classe de problèmes étudiée par au moins 15 communautés différentes utilisant huit styles notationnels fondamentalement distincts, s'appuyant souvent sur des mathématiques nécessitant une formation avancée. Dans ce livre, nous adoptons un style pédagogique par l'exemple pour montrer comment modéliser l'incroyablement riche classe de problèmes que nous appelons problèmes de décision séquentielle. Bien que nous nous concentrions sur des problèmes relativement plus simples, notre cadre peut être utilisé pour modéliser *n'importe quel* problème de décision séquentielle. De plus, le modèle résultant peut être traduit directement en logiciel.

Le fondement analytique de ce livre se trouve dans *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (RLSO), un ouvrage de niveau doctoral centré sur la méthodologie. De temps à autre, nous ferons référence à des éléments de cet ouvrage pour les lecteurs qui souhaiteraient approfondir le sujet, et nous encourageons les lecteurs à tendance technique à utiliser RLSO comme référence. Cependant, cela n'est pas nécessaire. Ce livre est conçu pour fournir le contexte, sous la forme d'une série d'exemples, permettant aux lecteurs de réfléchir de façon claire et précise aux problèmes de décision séquentielle, même s'ils n'écriront jamais une seule ligne de code.

Ce livre s'adresse aux étudiants de niveau licence ou master ayant suivi un cours de probabilités et de statistiques (une connaissance de la programmation linéaire n'est pas nécessaire, bien que nous ayons un exemple qui requiert la résolution d'un programme linéaire). Tous les chapitres sont construits autour d'exemples spécifiques, à l'exception du chapitre 1, qui offre un aperçu de l'ensemble du cadre de modélisation, et du chapitre 7, où nous faisons une pause et utilisons les six premiers chapitres pour illustrer certains principes importants.

La présentation ne devrait pas nécessiter de mathématiques allant au-delà de ce qui est attendu dans un premier cours de probabilités et de statistiques. Cela dit, le livre est centré sur la manière de décrire les problèmes de décision séquentielle à l'aide d'une notation suffisamment précise pour servir de base à un logiciel informatique.

Des modules Python accompagnent la plupart des chapitres ; ces modules ont été écrits autour du cadre de modélisation qui traverse tout le livre. En même temps, tout logiciel simulant un problème de décision séquentielle, quelle que soit la manière dont il est résolu, peut être traduit directement dans le cadre de modélisation que nous utilisons. C'est pourquoi nous encourageons les lecteurs à considérer tout élément de notation comme une variable dans un programme informatique.

## Pour commencer

Les problèmes de décision séquentielle peuvent toujours s'écrire sous la forme

$$
decision,\ information, \ decision, \ information, \ decision, \ldots
$$

Chaque fois que nous prenons une décision, nous encourons un coût ou recevons une contribution ou une récompense (il existe de nombreuses façons de mesurer la performance). Les décisions sont prises selon une méthode que nous appellerons une *politique*. Un objectif majeur, qui est au cœur de ce livre, est de concevoir des politiques efficaces qui fonctionnent bien dans le temps, en présence de l'incertitude liée aux informations qui ne sont pas encore arrivées.

Les problèmes de décision séquentielle sont omniprésents, apparaissant dans pratiquement tous les processus humains. Le Tableau 1.1 fournit une liste d'exemples de domaines, avec des exemples de certaines décisions qui pourraient s'y poser. La plupart de ces domaines comportent probablement de nombreux types de décisions différents, allant en complexité du moment de vendre un actif ou d'adopter une nouvelle conception de site web, jusqu'au choix du meilleur médicament, matériau ou installation à concevoir, ou encore à la gestion de chaînes d'approvisionnement complexes ou à la répartition d'une flotte de camions.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Domaine</th><th>Questions</th></tr></thead>
<tbody>
<tr><td>Entreprise</td><td>Quels produits devrions-nous vendre, avec quelles caractéristiques ? Quels fournisseurs devrions-nous utiliser ? Quel prix devrions-nous facturer ?</td></tr>
<tr><td>Économie</td><td>Quel taux d'intérêt la Réserve fédérale devrait-elle appliquer compte tenu de l'état de l'économie ? Quels niveaux de liquidité du marché devraient être assurés ?</td></tr>
<tr><td>Finance</td><td>Dans quelles actions un portefeuille devrait-il investir ? Comment un trader devrait-il couvrir un contrat contre un risque baissier potentiel ?</td></tr>
<tr><td>Internet</td><td>Quelles publicités devrions-nous afficher pour maximiser les clics publicitaires ? Quels films attirent le plus d'attention ? Quand/comment les avis de masse devraient-ils être envoyés ?</td></tr>
<tr><td>Ingénierie</td><td>Comment concevoir des dispositifs allant des bombes aérosols aux véhicules électriques, des ponts aux systèmes de transport, des transistors aux ordinateurs ?</td></tr>
<tr><td>Santé publique</td><td>Comment devrions-nous mener des tests pour estimer la progression d'une maladie ? Comment les vaccins devraient-ils être répartis ? Quels groupes de population devraient être ciblés ?</td></tr>
<tr><td>Recherche médicale</td><td>Quelle configuration moléculaire produira le médicament qui tue le plus de cellules cancéreuses ? Quelle série d'étapes est nécessaire pour produire des nanotubes monoparois ?</td></tr>
<tr><td>Gestion de la chaîne d'approvisionnement</td><td>Quand devrions-nous passer une commande d'approvisionnement en stock depuis la Chine ? Quel fournisseur devrait être utilisé ?</td></tr>
<tr><td>Transport de marchandises</td><td>Quel chauffeur devrait déplacer une charge ? Quelles charges un transporteur de camions complets devrait-il s'engager à déplacer ? Où les chauffeurs devraient-ils être domiciliés ?</td></tr>
<tr><td>Collecte d'information</td><td>Où devrions-nous envoyer un drone pour collecter des informations sur les feux de forêt ou les espèces envahissantes ? Quel médicament devrions-nous tester pour combattre une maladie ?</td></tr>
<tr><td>Systèmes multi-agents</td><td>Comment une grande entreprise sur un marché oligopolistique devrait-elle soumissionner pour des contrats, en anticipant la réaction de ses concurrents ?</td></tr>
<tr><td>Algorithmes</td><td>Quelle règle de pas devrions-nous utiliser dans un algorithme de recherche ? Comment déterminons-nous le prochain point à évaluer pour une fonction coûteuse ?</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 1.1.</span> Un échantillon de différents domaines et des décisions à prendre dans chacun d'eux.</p>
</div>

Plus difficile encore que de recenser tous les types de décisions est d'identifier les différentes sources d'incertitude qui apparaissent dans de nombreuses applications. Le comportement humain, les marchés, les processus physiques, les réseaux de transport, les systèmes énergétiques et le large éventail d'incertitudes qui surviennent dans le domaine de la santé donnent un aperçu de la diversité des différentes sources d'incertitude.

Au moment où ce livre est écrit, l'humanité lutte contre la propagation de variants de la COVID-19. Faire face à cette pandémie a été décrit comme « d'une complexité ahurissante » [USA Today, 8 septembre 2020], mais cela résulte en réalité d'une incapacité à réfléchir au problème de manière structurée. Nous allons montrer au lecteur comment décomposer les problèmes en une série de composantes de base menant à des solutions pratiques.

Notre approche commence par identifier certains éléments essentiels tels que les indicateurs de performance, les décisions et les sources d'incertitude, ce qui conduit ensuite à la création d'un modèle mathématique du problème. L'étape suivante consiste généralement (mais pas toujours) à implémenter le modèle sur ordinateur, mais il existera de nombreux problèmes pour lesquels le processus de construction d'un modèle informatique sera impraticable pour diverses raisons. C'est pourquoi nous allons également considérer des problèmes où il faut tester et évaluer des idées sur le terrain. Pour améliorer la performance, nous devons d'abord apprendre à prendre de bonnes décisions au fil du temps (c'est ainsi que nous contrôlons le système). Ensuite, nous nous tournons vers la conception du système.

À l'heure actuelle, la communauté académique n'a pas adopté de processus de modélisation standard pour les problèmes de décision séquentielle. Ceci contraste fortement avec le domaine des problèmes d'optimisation statiques et déterministes, qui suivent un cadre rigoureux depuis les années 1950 (les équations $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ représentent un échantillon de ce cadre). Notre processus de modélisation s'appuie sur la présentation faite dans RLSO, un livre destiné à un public technique principalement intéressé par le développement et la mise en œuvre de modèles sur ordinateur.

En revanche, ce livre s'adresse à un public plus large, avant tout intéressé à apprendre à *réfléchir* aux problèmes de décision séquentielle. Il adopte un style pédagogique par l'exemple axé sur la communication du processus de modélisation, ce que nous jugeons utile même sans aboutir finalement à la création de modèles informatiques. Au cœur de notre approche se trouve la création d'un modèle mathématique qui élimine l'ambiguïté propre à la description des problèmes en langage courant. Pour les lecteurs intéressés par le développement de modèles informatiques, la notation constitue le tremplin vers l'écriture de logiciels. Cependant, nous utiliserons principalement la notation mathématique pour apporter de la clarté dans la description d'un problème, même si le lecteur n'a jamais l'intention d'écrire une seule ligne de code.

Notre présentation se déroule comme suit :

- Le Chapitre 1 propose une introduction légère au cadre de modélisation universel, illustré à l'aide de deux problèmes de gestion des stocks (un simple, et un légèrement plus complexe), suivie d'une brève discussion sur la modélisation de l'incertitude. Il présente ensuite les quatre classes de politiques qui couvrent toutes les méthodes de prise de décision.
- Les Chapitres 2 à 6 décrivent chacun un problème de décision séquentielle spécifique afin d'illustrer le cadre de modélisation selon un style pédagogique par l'exemple. Ces applications ont été choisies pour faire ressortir chacune des quatre classes de politiques.
- Le Chapitre 7 revient de manière plus détaillée sur le cadre de modélisation universel. Une discussion beaucoup plus approfondie est présentée sur les quatre classes de politiques ainsi que sur les différents types de variables d'état, en s'appuyant sur les exemples des chapitres 2 à 6 pour fournir un contexte.
- Les Chapitres 8 à 14 fournissent des exemples supplémentaires, utilisant des contextes plus complexes pour illustrer des concepts de modélisation plus avancés, couvrant à la fois la modélisation de l'incertitude (en particulier la modélisation des prix de l'électricité au [Chapitre 8](/sdam/fr/chapter-8/)) et un ensemble plus riche de politiques.

Les chapitres d'application (2 à 6 et 8 à 14) suivent tous le même plan. Ils peuvent être abordés dans n'importe quel ordre, en gardant à l'esprit que les applications des chapitres 2 à 6 sont plus simples et ont été choisies pour illustrer chacune des quatre classes de politiques. Les lecteurs intéressés par des sujets de modélisation spécifiques (tels que les variables d'état, la modélisation de l'incertitude, ou la découverte de différents exemples de politiques) peuvent parcourir les chapitres en diagonale, en passant directement aux sujets qui les intéressent.

Chaque chapitre se termine par une série d'exercices répartis en trois catégories :

- Questions de révision – Il s'agit de questions simples qui peuvent être utilisées pour renforcer une compréhension de base à partir de la lecture du chapitre.
- Questions de résolution de problèmes – Elles introduisent des défis de modélisation qui nécessitent des compétences de résolution de problèmes.
- Questions de programmation – La plupart des chapitres comportent des exercices de programmation s'appuyant sur un ensemble de modules Python. Les modules Python originaux, écrits en Python 2, ont bénéficié d'une mise à niveau majeure réalisée par le professeur Dennis Djanka, professeur à l'université de Karlsruhe en Allemagne. La nouvelle bibliothèque peut être téléchargée à l'adresse [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). Certaines de ces questions nécessitent d'apporter des modifications de programmation au code Python.

## Alors, qu'est-ce qu'une décision ?

Il existe une longue histoire, remontant à plus de 2 000 ans à l'époque de Socrate, d'Aristote et de Platon, documentant l'étude de la façon dont les gens prennent des décisions. Il existe ensuite une littérature substantielle, principalement depuis les années 1950 (mais avec quelques travaux importants antérieurs), sur les mathématiques de la prise de décision optimale, constituée de plusieurs milliers d'articles et de livres. Ce que cette littérature semble négliger, c'est la question fondamentale :

> *Qu'est-ce qu'une décision ?*

Nous commençons par observer qu'une décision est une forme d'information qui affecte le comportement d'un « système » que nous cherchons à contrôler. Ce système comporte implicitement une ou plusieurs mesures qui quantifient la performance de notre système. Nous devons ensuite identifier un agent qui contrôle un aspect de notre système.

Sur cette base, il est utile d'identifier trois classes d'information :

1. L'état de connaissance – Il s'agit de l'information dont nous disposons actuellement et qui est pertinente pour la performance de notre système.
2. L'information qui modifie l'état de connaissance que nous contrôlons (cela nécessite d'identifier un agent qui contrôle notre système).
3. L'information qui arrive à notre système et qui modifie l'état de connaissance sans que nous puissions la contrôler.

Nous désignons l'information de la classe 2 par le terme *décisions*. Cela suggère une définition formelle d'une décision, s'appuyant sur *Bridging Decision Problems, Volume I: Framing the Problem* :

> **Définition (formelle) :** Une **décision** est une classe d'information contrôlable de manière endogène.

Une définition informelle pourrait être :

> **Définition (informelle) :** Une **décision** est quelque chose que nous contrôlons.

Ces définitions offrent un point de départ, mais elles ne nous apprennent pas grand-chose. Il est bien plus intéressant d'identifier des exemples concrets de décisions, ce que nous faisons ensuite.

## Types de décisions

Nous avons identifié 10 types de décisions, sur la base des contextes et des outils que nous pourrions utiliser pour déterminer les meilleures décisions. Il s'agit de :

**1) Décisions physiques et financières** – Ces décisions surviennent dans la gestion des ressources physiques et financières, telles que les personnes, l'équipement, les installations, les produits, l'eau, l'énergie, ainsi que des ressources financières telles que les liquidités ou les investissements. Les décisions incluent l'achat, la vente et la modification de ressources, où une modification peut signifier déplacer une ressource d'un lieu à un autre, réparer un équipement, former une personne, ou combiner des ingrédients pour préparer un gâteau.

**2) Décisions complexes/stratégiques** – Ce sont des décisions qui peuvent apporter des changements multiples à un système (modification des ressources, des paramètres, des croyances), et qui impliquent typiquement des sources d'incertitude importantes. Ces décisions sont généralement évaluées une seule fois, mais l'option d'attendre et de prendre la décision plus tard peut exister.

**3) Décisions d'acquisition d'information/d'observation** – Elles incluent des décisions telles que la réalisation d'expériences en laboratoire, des essais sur le terrain, ou des simulations informatiques. Cela pourrait inclure la réalisation d'études de marché, l'embauche d'un expert, ou l'interrogation d'un grand modèle de langage.

**4) Décisions de communication/partage d'information** – Elles se présentent sous deux formes :

- a) Messagerie – Cela reflète ce que nous disons en texte, vidéo et/ou audio.
- b) Canaux et calendrier – Cela couvre le choix de la manière d'envoyer l'information : texte/courriels, publication (imprimée ou en ligne), médias sociaux, ou canaux publicitaires. Cela nécessite également de choisir le calendrier et la fréquence.

**5) Métriques de performance et objectifs** – Ils représentent le choix critique de quantifier ce que nous essayons d'atteindre, comme maximiser les revenus, minimiser les coûts, minimiser la maladie, ou maximiser les votes reçus.

**6) Choix de fonctions** – Ce peuvent être des méthodes pour prendre des décisions (politiques), la formulation de modèles d'optimisation, le choix des métriques de performance, des méthodes de prévision ou d'estimation, ou la conception de fonctions de transition (comme la façon dont une maladie se propage).

**7) Fixation de paramètres** – Il existe souvent un certain nombre de paramètres qui affectent la performance d'un système. Il pourrait s'agir de prix, des coefficients d'un modèle statistique, de la température utilisée dans un processus de fabrication. Il pourrait aussi s'agir du poids attribué à une métrique de performance, ou d'objectifs de performance.

**8) Estimation ou identification** – Nous pourrions avoir besoin d'identifier une personne, de prévoir une demande, ou de nommer une maladie.

**9) Caractéristiques et comportements** – Comment concevoir un produit, quelles caractéristiques un logiciel devrait avoir, quels services devraient être fournis à un client, ou la spécialisation d'un étudiant, qui déterminera avec quelles compétences il obtiendra son diplôme.

**10) Décider ce qu'il faut décider** – Bien que nous n'utilisions généralement pas l'analyse formelle pour cette dernière décision, il est important de reconnaître le moment où nous prenons une décision, et de déterminer si nous voulons l'aborder de manière formelle en utilisant l'analyse de données et la modélisation.

L'identification des décisions implique de comprendre comment la décision affecte la performance du système. Le déplacement de ressources physiques (type 1) entraîne un coût, tandis que la satisfaction des demandes génère des revenus. Une décision peut avoir un impact immédiat sur une ou plusieurs métriques de performance (comme c'est souvent le cas dans la gestion des ressources), mais souvent les décisions doivent être évaluées dans le temps, et dépendent d'informations qui ne sont pas connues au moment où la décision est prise. Pour cette raison, nous évaluons souvent *la façon* dont nous prenons les décisions (c'est-à-dire la méthode) plutôt que la décision elle-même.

## Cadrer le problème

La première étape lorsqu'on aborde un problème de décision consiste à répondre à trois questions :

- Quelles sont les métriques de performance ?
- Quels types de décisions sont prises (et qui les prend) ?
- Quelles sont les incertitudes qui affectent la performance ?

Notez que les réponses à ces questions sont fondamentales pour tout problème de décision. Dans ce livre, ces questions sembleront assez simples, car nous y répondons dans le contexte des modèles que nous avons déjà conçus pour résoudre un problème. Dans les applications réelles, les listes de métriques de performance, de décisions et d'incertitudes peuvent être assez longues.

Comme aperçu de la richesse que peut revêtir le cadrage d'un problème, nous encourageons le lecteur à consulter la monographie [*Framing the Problem*](/bridging-vol1/), qui est dédiée précisément à ce sujet. La monographie comporte des chapitres entiers dédiés à chacune de ces questions, illustrés à l'aide d'une douzaine d'applications différentes.

L'objectif du processus de cadrage est d'identifier ce qui compte, en commençant par les métriques de performance, où même un simple problème de stock peut être décrit avec plus de 20 métriques de performance, 30 types différents de décisions et plus de 30 types d'incertitudes. La feuille de calcul listant ceux-ci peut être trouvée à l'adresse [tinyurl.com/PowellInventoryDecisions](https://tinyurl.com/PowellInventoryDecisions). Cela ne signifie pas que nous allons réellement construire un modèle avec toute cette complexité. Pour cette raison, le livre introduit un dispositif appelé *matrices d'interaction* où un expert du domaine hiérarchise les métriques, puis utilise son jugement pour identifier les décisions et les incertitudes qui ont l'impact le plus important sur les métriques les plus importantes.

Ce livre suppose que nous avons déjà réduit un problème à un petit nombre de métriques, de décisions et d'incertitudes, et utilise celles-ci pour orienter le développement d'un modèle mathématique.

## Le processus de modélisation

La modélisation est un art, mais c'est un art guidé par un cadre mathématique qui garantit que nous obtenons un problème bien défini que nous pouvons mettre sur ordinateur et résoudre. Cela peut être vu comme la construction d'un pont entre un problème du monde réel désordonné et mal défini et quelque chose ayant la clarté qu'un ordinateur peut comprendre, même si votre objectif final n'est pas de le mettre sur ordinateur.

Historiquement, si un effort de modélisation impliquait de tenter de prendre des décisions, les gens se tournaient vers le cadre bien connu de l'optimisation déterministe qui ressemble souvent au modèle donné par les équations $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$, qui consiste en des variables de décision $x$, une fonction objectif $cx$, et les contraintes données par $\eqref{eq:linearprogram2}$–$\eqref{eq:linearprogram3}$.

Le problème avec ce cadre de modélisation classique réside dans ce qu'il omet :

- Il suppose que toutes les données (contenues dans les variables $A$, $b$ et $c$) caractérisant le modèle sont parfaitement connues.
- La plupart des décisions se produisent de manière répétée dans le temps, et pourtant cela n'est pas reconnu.
- Il n'y a aucun moyen de représenter le flux d'information vers le système.
- En conséquence, la solution optimale de ce modèle ne peut anticiper les événements qui affectent la performance de $x$ sur le terrain.
- Il n'y a aucun moyen de représenter le risque, un enjeu majeur dans de nombreuses applications.
- Il suppose un seul décideur.

Les modèles mathématiques devraient, avant tout, fournir une voie qui nous indique comment *penser* les problèmes. Les modèles classiques d'optimisation déterministe qui suivent le format des équations $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ ignorent complètement tout ce qui concerne l'évolution de notre problème dans le temps.

Ce livre est entièrement conçu autour d'une approche de modélisation appelée le *cadre de modélisation universel*. En bref, il aspire à représenter *tout* aspect d'un système contrôlable. Notre modèle par défaut supposera que le système évolue dans le temps, à mesure que de nouvelles informations arrivent.

Dans cette section, nous allons fournir une version très compacte du cadre de modélisation universel. Ensuite, nous allons illustrer le cadre, initialement en utilisant un problème de stock très simple, puis en introduisant quelques extensions modestes. Après avoir présenté ces exemples, nous reviendrons à une présentation plus détaillée du cadre de modélisation universel.

### Une présentation compacte d'un modèle dynamique

Nous commençons par observer que nous pouvons modéliser tout problème de décision séquentielle en utilisant la séquence

$$
(S_0,x_0,W_1,S_1,x_1,W_2, \ldots, S_t, x_t, W_{t+1}, \ldots, S_T),
$$

où :

- $S_t$ est constitué des *variables d'état* qui capturent tout ce dont nous avons besoin pour :
    - a) Prendre une décision au temps $t$.
    - b) Calculer les métriques de performance au temps $t$.
    - c) Toute autre information nécessaire pour calculer (a) ou (b) à tout moment futur.

  Il est préférable de considérer $S_t$ comme l'état d'information ou, plus généralement, l'état de connaissance, au temps $t$.
- $x_t$ représente les *variables de décision* qui capturent les éléments que nous contrôlons, tels que la décision de vendre une maison, le chemin à travers un réseau, le choix d'un médicament pour un traitement, le prix auquel vendre un produit, ou le choix du camion pour transporter une charge de marchandises.
- $W_{t+1}$ est l'information qui arrive après que nous ayons pris la décision $x_t$, qui pourrait être le prix de vente final d'une maison, les temps de trajet à travers un réseau, la façon dont un patient répond à un médicament, les ventes d'un produit à un prix donné, et les charges de marchandises annoncées après que nous ayons effectué les affectations initiales. Nous considérons que l'information dans $W_{t+1}$ provient de l'extérieur de notre système, ce qui signifie qu'elle est hors de notre contrôle. Pour cette raison, nous la désignons par le terme *information exogène*.

  Il existe de nombreux contextes où il est préférable de considérer $W_{t+1}$ comme une fonction $W_{t+1}(S_t,x_t)$ qui dépend de l'état actuel $S_t$ et/ou de la décision $x_t$. Nous discutons de cela plus en détail ci-dessous. Nous allons utiliser $W_{t+1}$ comme notre notation par défaut, mais avec la compréhension qu'elle peut être influencée par l'état $S_t$ ou la décision $x_t$.

La décision $x_t$ est déterminée par une méthode que nous appelons une *politique*, que nous notons $X^\pi(S_t)$. La notation $\pi$ porte l'information sur la structure de la fonction, que nous représentons par $f$ dans un ensemble de fonctions potentielles $\Fcal$, et sur les paramètres ajustables $\theta\in\Theta^f$, qui sont définis par la structure de la fonction. Par exemple, une politique de gestion de stock pourrait consister à commander $\theta^{order}$ unités chaque fois que le stock descend en dessous de $\theta^{min}$, ce qui signifie que les paramètres ajustables sont $\theta = (\theta^{order}, \theta^{min})$. La structure de la fonction serait un exemple de fonction $f$.

Nous supposons disposer d'une *fonction de transition* qui prend en entrée l'état $S_t$, la décision $x_t$, et l'information exogène $W_{t+1}$, et nous donne l'état mis à jour $S_{t+1}$. Les fonctions de transition sont un ensemble d'équations qui mettent à jour chaque élément de la variable d'état $S_t$, laquelle peut comporter un seul élément, ou des dizaines de milliers (voire beaucoup plus).

Nous encourons une contribution (ou un coût) $C(S_t,x_t)$ lorsque nous prenons la décision $x_t=X^\pi(S_t)$ compte tenu de l'information contenue dans l'état $S_t$. Notre objectif est de trouver la politique qui maximise un certain objectif dépendant des contributions $C(S_t,x_t)$ où $x_t=X^\pi(S_t)$. Pour des contextes plus complexes, $C(S_t,x_t)$ peut en réalité être un ensemble de métriques de performance, bien que nous devions les combiner d'une certaine manière pour déterminer quelle décision $x_t$ choisir.

Il s'agit là d'une description très condensée d'un problème de décision séquentielle. Nous décrivons ensuite un ensemble d'étapes à suivre dans le processus de modélisation.

### Les étapes du processus de modélisation

Il est possible de diviser l'ensemble du processus de modélisation en sept étapes (pour nos besoins). Avant ces étapes (désignées ci-dessous par « Étape 0 »), figure un bref résumé de la complexité technique de l'application afin de guider les lecteurs.

**Étape 0. Résumé du chapitre** – Nous ouvrons chaque chapitre par un résumé de ce qu'il va couvrir et, dans certains cas, de la manière dont il se rapporte au contenu d'autres chapitres. Les résumés indiquent quelles approches sont utilisées pour modéliser l'incertitude et quelles politiques sont employées.

**Étape 1. Le récit** – Il s'agira d'une description en anglais courant du problème (ou en français, selon le cas). Le récit ne fournira pas toute l'information nécessaire pour construire un modèle mathématique ; il constitue plutôt une première étape qui doit donner au modélisateur une vue d'ensemble sans se perdre dans les notations.

**Étape 2. Cadrage du problème** – Cela consiste à répondre à trois questions :

- Quelles sont les métriques de performance ?
- Quels types de décisions sont prises (et dans certains cas, quel agent les prend) ?
- Quelles sont les sources d'incertitude qui affectent la performance ?

**Étape 3. Identification des éléments centraux du problème**, en mettant particulièrement l'accent sur trois dimensions de tout problème de décision séquentielle. Ces éléments sont décrits sans recourir aux mathématiques :

- Quelles métriques cherchons-nous à influencer ? Chaque domaine particulier (comme la gestion de la chaîne d'approvisionnement, la santé, l'énergie, la finance) sera caractérisé par un certain nombre de métriques qui peuvent être décrites à l'aide de termes tels que coûts, revenus, profits, récompenses, gains, pertes, performance et risque.
- Quelles décisions sont prises ? Identifier les décisions est assez facile pour de nombreux problèmes tels que les jeux vidéo, mais si nous abordons un problème complexe comme la réponse à un processus de santé publique, la réduction de l'empreinte carbone, ou la gestion d'une chaîne d'approvisionnement, alors identifier l'ensemble des décisions peut se révéler tout à fait délicat.
- Quelles sont les différentes sources d'incertitude ? Sur quoi sommes-nous incertains avant de commencer ? Quelle information arrive de manière exogène au fil du temps (c'est-à-dire arrive après que nous ayons pris une décision) ? Le tableau 1.2 illustre différentes sources d'incertitude pour un modèle de distribution de vaccins contre la COVID (voir RLSO, Chapitre 10, pour une présentation de 12 classes d'incertitude).

Nous désignons le processus de réponse à ces trois questions comme *le cadrage du problème*.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Type d'incertitude</th><th>Description</th></tr></thead>
<tbody>
<tr><td>1) Erreurs d'observation</td><td>Observation de personnes présentant des symptômes ; erreurs de classification de personnes symptomatiques comme atteintes de la COVID</td></tr>
<tr><td>2) Incertitude exogène</td><td>Rapports de nouveaux cas, décès ; disponibilité des unités de soins intensifs ; production réelle de vaccins</td></tr>
<tr><td>3) Incertitude pronostique</td><td>Admissions hospitalières ; performance future des vaccins ; réponse de la population aux vaccins</td></tr>
<tr><td>4) Incertitude inférentielle</td><td>Estimations des taux d'infection ; estimations de l'efficacité des vaccins</td></tr>
<tr><td>5) Incertitude expérimentale</td><td>Performance d'un médicament dans un essai clinique ; nombre de personnes vaccinées</td></tr>
<tr><td>6) Incertitude de modèle</td><td>Taux de transmission de la maladie ; propagation géographique des infections</td></tr>
<tr><td>7) Incertitude transitionnelle</td><td>Ajouts/retraits aux/des stocks de vaccins</td></tr>
<tr><td>8) Incertitude de contrôle</td><td>Quels groupes de population ont été vaccinés ; allocations de vaccins</td></tr>
<tr><td>9) Incertitude de mise en œuvre</td><td>Échec de la vaccination</td></tr>
<tr><td>10) Erreurs de communication</td><td>Erreurs de reporting depuis le terrain ; échec de notification du moment où se faire vacciner</td></tr>
<tr><td>11) Incertitude des objectifs</td><td>Désaccords sur qui devrait être vacciné</td></tr>
<tr><td>12) Incertitude environnementale</td><td>Si/quand un vaccin sera approuvé ; allocation des vaccins aux différents États, pays</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 1.2.</span> Illustration des différents types d'incertitude survenant dans la réponse vaccinale à la pandémie de COVID.</p>
</div>

**Étape 4. Le modèle mathématique** – Ici, nous nous appuyons sur les trois premiers éléments de l'Étape 2, mais nous devons maintenant construire un modèle mathématique qui comporte cinq dimensions applicables à tout problème de décision séquentielle :

- **Variables d'état $S_t$** – La variable d'état capture tout ce que vous devez savoir au temps $t$ pour prendre une décision au temps $t$, calculer les coûts et les contraintes, et si nécessaire, simuler l'évolution jusqu'au temps $t+1$. Les variables d'état peuvent inclure de l'information sur les ressources physiques (stocks ou localisation d'un véhicule qui interviennent dans le problème par le biais des contraintes), d'autres informations (comme les coûts ou les prix qui interviennent dans la fonction objectif), et des croyances sur des quantités et des paramètres que nous ne connaissons pas parfaitement (comme des prévisions ou des estimations de la réponse d'un patient à un médicament).
- **Variables de décision $x_t$** – Elles décrivent comment nous allons concevoir ou contrôler notre système. Les décisions doivent satisfaire des contraintes que nous écrivons $x_t \in \Xcal$ où $\Xcal$ peut être un ensemble de choix discrets, ou un ensemble d'équations linéaires. Les décisions seront déterminées par des *politiques*, qui sont des fonctions (ou des règles) que nous désignons par $X^\pi(S_t)$ et qui déterminent $x_t$ à partir de ce que contient la variable d'état. Les politiques peuvent être très simples (acheter bas, vendre haut) ou tout à fait complexes.

  L'indice $\pi$ porte l'information sur le type de fonction utilisée pour prendre les décisions, ainsi que sur les paramètres ajustables éventuels. Soit $f\in\Fcal$ la structure de la fonction, $\Fcal$ l'ensemble des fonctions possibles, et soit $\theta\in\Theta^f$ les paramètres ajustables éventuels de la fonction $f$. Notre politique serait alors représentée par $\pi = (f,\theta)$. Nous écrirons souvent la politique sous la forme $X^\pi(S_t\vert \theta)$ pour indiquer sa dépendance aux paramètres ajustables.

  Nous reviendrons sur ce point de manière approfondie plus loin dans ce chapitre, et tout au long du livre. Chacun des exemples donnés dans le livre a été choisi pour aider à illustrer des types spécifiques de politiques.
- **Information exogène $W_{t+1}$** – Il s'agit d'une nouvelle information qui arrive après que nous avons pris la décision $x_t$ (mais avant que nous décidions $x_{t+1}$), comme la quantité que nous vendons après avoir fixé un prix, ou le temps nécessaire pour parcourir le chemin choisi. Lorsque nous prenons une décision au temps $t$, l'information contenue dans $W_{t+1}$ est inconnue, nous la traitons donc comme une variable aléatoire au moment où nous choisissons $x_t$.
- **La fonction de transition $S^M(S_t,x_t,W_{t+1})$** – Ce sont les équations qui décrivent comment les variables d'état évoluent dans le temps. Pour de nombreux problèmes réels, les fonctions de transition capturent toute la dynamique du problème, et peuvent être assez complexes. Dans certains cas, nous ne connaissons même pas les équations, et devons nous appuyer uniquement sur les variables d'état que nous pouvons observer. Nous écrivons l'évolution des variables d'état $S_t$ à l'aide de notre fonction de transition sous la forme

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}),
$$

  où $S^M(\cdot)$ est connu sous le nom de modèle de transition d'état (ou de système) (d'où le $M$ en exposant). La fonction de transition décrit comment chaque élément de la variable d'état change en fonction des décisions $x_t$ et de l'information exogène $W_{t+1}$. Dans les problèmes complexes, la fonction de transition peut nécessiter des milliers de lignes de code pour être mise en œuvre.
- **La fonction objectif** – Elle capture les métriques de performance que nous utilisons pour évaluer notre performance, et fournit la base de la recherche parmi les politiques. Nous notons $C(S_t,x_t)$ la contribution (si l'on maximise) ou le coût (si l'on minimise) de la décision $x_t$, qui peut dépendre de l'information contenue dans $S_t$. Dans certains contextes, il est plus naturel d'écrire la fonction de contribution pour une seule période sous la forme $C(S_t,x_t,W_{t+1})$, la fonction de contribution évaluée à la fin de l'intervalle de temps $(t,t+1)$, après que $W_{t+1}$ a été observé. Par exemple, nous pourrions passer une commande de $x_t$ qui arrive immédiatement pour satisfaire la demande incertaine contenue dans $W_{t+1}$.

  Notre objectif est de trouver la meilleure politique $X^\pi(S_t)$ pour optimiser une certaine métrique telle que :
    - Maximiser la somme espérée des contributions sur un certain horizon.
    - Maximiser la performance espérée d'une conception finale que nous avons apprise à travers un certain nombre d'expériences ou d'observations.
    - Minimiser le risque associé à une conception finale.

  Notre manière la plus courante d'écrire la fonction objectif est

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\},\label{eq:baseobjectivefunction}
\end{align}
$$

  où « $\E$ » est appelé l'*opérateur d'espérance*, ce qui signifie qu'il s'agit de calculer une moyenne sur tout ce qui est aléatoire, ce qui peut inclure l'information incertaine dans l'état initial $S_0$, ainsi que le processus d'information exogène $W_1, \ldots, W_T$. Il est d'usage d'écrire l'opérateur d'espérance, mais nous ne pouvons jamais réellement le calculer. Nous montrerons plus loin comment l'approximer en exécutant une série de simulations et en calculant une moyenne, ou en observant un processus sur le terrain.

Il convient d'être prudent lors de l'interprétation de l'opérateur d'espérance « $\E$ » dans l'équation $\eqref{eq:baseobjectivefunction}$. Ce que cet opérateur signifie littéralement, c'est « faire une moyenne sur tout ce qui est incertain ». L'élément d'incertitude le plus évident est le processus d'information exogène $W_1, W_2, \ldots, W_t, \ldots, W_T$.

Le passage du problème réel (guidé par le récit) aux éléments du modèle mathématique est peut-être l'étape la plus difficile, car elle implique souvent de recueillir de l'information auprès d'une source non technique.

Notons que nous avons présenté l'ensemble du modèle sans préciser comment nous prenons les décisions, ce qui est représenté par la politique $X^\pi(S_t)$. Nous appelons cela « *d'abord modéliser, puis résoudre* » et cela représente un écart majeur par rapport à la vaste littérature qui traite des problèmes de décision séquentielle. Il est difficile de communiquer à quel point il est important d'aborder les problèmes de décision séquentielle de cette manière.

**Étape 5. Le modèle d'incertitude** – Il s'agit de la manière dont nous modélisons les différents types d'incertitude. Il existe deux façons d'introduire l'incertitude dans notre modèle :

1. Par le biais de l'état initial $S_0$, qui peut spécifier une distribution de probabilité pour des paramètres incertains, comme la manière dont un patient pourrait répondre à un médicament ou dont le marché pourrait réagir au prix.
2. Par le biais du processus d'information exogène $W_1, \ldots, W_T$.

Nous disposons de trois manières de modéliser le processus d'information exogène :

- Créer un modèle mathématique de $W_1, W_2, \ldots, W_T$.
- Utiliser des observations tirées de l'historique, comme les prix passés, les ventes, ou les événements météorologiques.
- Faire fonctionner le système sur le terrain, en observant $W_t$ au fur et à mesure qu'ils se produisent.

**Étape 6. Conception des politiques** – Les politiques sont des fonctions, nous devons donc chercher la meilleure fonction. (Oui, les politiques sont des fonctions permettant de choisir la meilleure décision, mais choisir la politique est également une décision !) Nous procédons ainsi en identifiant deux stratégies fondamentales pour la conception des politiques :

- Chercher parmi une famille de fonctions celle qui fonctionne le mieux, en moyenne, dans le temps.
- Créer une politique en estimant le coût ou la contribution immédiate d'une décision $x_t$, plus une approximation des coûts ou contributions futurs, puis en trouvant le choix $x_t$ qui optimise la somme des coûts ou contributions présents et futurs. Google Maps décide de tourner à gauche ou à droite en optimisant le temps nécessaire pour parcourir le prochain tronçon du réseau plus le temps restant pour arriver à destination. Une décision de stock pourrait optimiser le coût d'une commande plus la valeur estimée du fait de conserver une certaine quantité de stock à l'avenir.

Nous allons être beaucoup plus explicites sur la façon d'identifier ces politiques. Une section ultérieure décrit quatre classes de politiques qui incluront *toute* méthode de prise de décision (ce sont des méta-classes).

**Étape 7. Évaluation des politiques** – Trouver la meilleure politique signifie évaluer les politiques afin de déterminer laquelle est la meilleure. Il existe deux façons d'évaluer une politique :

- Tester la politique dans un simulateur informatique. Cela nécessite de programmer toutes les équations du modèle de transition d'état $S^M(S_t,x_t,W_{t+1})$ requises pour mettre à jour la variable d'état $S_t$. Cela implique également d'être capable de générer des échantillons de $W_{t+1}$, ce qui constitue souvent l'aspect le plus subtil d'un simulateur.
- Observer comment la politique fonctionne sur le terrain.

Les simulateurs peuvent être complexes et difficiles à construire, et restent soumis à des approximations de modélisation. Pour cette raison, la grande majorité des problèmes pratiques rencontrés en pratique tendent à impliquer des tests sur le terrain, ce qui est lent (il faut une journée pour simuler une journée) et nécessite de vivre avec les résultats des expériences.

La seule façon de se familiariser avec un modèle mathématique est de le voir illustré à l'aide d'un exemple familier. Nous commençons par un problème universel que nous rencontrons tous dans la vie quotidienne : la gestion des stocks.

## Quelques problèmes de gestion des stocks

Nous allons illustrer notre cadre de modélisation à l'aide de deux variantes d'un problème classique de gestion des stocks, largement utilisé comme application pour illustrer certaines méthodes de résolution des problèmes de décision séquentielle. Nous commençons par un exemple simple de gestion des stocks qui reprend les éléments essentiels de notre cadre de modélisation, tout en nous permettant d'ignorer de nombreuses complexités que nous explorerons dans le reste du livre.

Ensuite, nous allons passer à un problème de gestion des stocks *légèrement* plus compliqué qui nous permettra d'illustrer certains principes de modélisation. Tout au long du livre, nous allons également utiliser l'idée de commencer par une version basique d'un problème, puis d'introduire des extensions qui laissent entrevoir les types de complications pouvant survenir dans des applications réelles.

### Un problème simple de gestion des stocks

L'un des problèmes de décision séquentielle les plus familiers que nous vivons tous chaque fois que nous visitons un magasin est un problème de gestion des stocks. Nous allons utiliser une version simple de ce problème pour illustrer les six étapes de notre processus de modélisation que nous avons présenté ci-dessus :

**Étape 1 : Récit** – Un restaurant de pizzas doit décider du nombre de livres de saucisse à commander auprès de son distributeur alimentaire. Le restaurant doit prendre la décision à la fin du jour $t$, communiquer la commande qui arrive ensuite le lendemain matin pour satisfaire les commandes du lendemain. S'il reste de la saucisse, elle peut être conservée jusqu'au jour suivant. Le coût de la saucisse, ainsi que le prix auquel elle sera vendue le lendemain, sont connus à l'avance, mais la demande ne l'est pas.

**Étape 2 : Les éléments essentiels du problème sont :**

- Métriques – Nous voulons maximiser les profits donnés par les ventes de saucisse moins le coût d'achat de la saucisse.
- Décisions – Nous devons décider de la quantité à commander à la fin d'une journée, celle-ci arrivant au début de la suivante.
- Sources d'incertitude – La seule source d'incertitude dans ce modèle simple est la demande de saucisse le lendemain.

**Étape 3 : Le modèle mathématique** – Celui-ci comprend cinq éléments.

**1) La variable d'état $S_t$** – Nous distinguons la variable d'état initiale $S_0$ et la variable d'état dynamique $S_t$ pour $t > 0$. La variable d'état initiale $S_0$ est constituée de paramètres fixes et de valeurs initiales de variables qui changent dans le temps, ce qui nous donne

$$
S_0 = (R^{inv}_0, (p, c), (\Dbar, \sigmabar^D)).
$$

Nous avons divisé l'état initial en trois types de variables :

- Valeurs initiales de l'état de la ressource $R^{inv}\_0$.
- Valeurs des paramètres constants $c$ et $p$.
- Notre croyance sur les demandes, donnée par une distribution normale de moyenne $\Dbar$ et d'écart type $\sigmabar^D$.

La variable d'état dynamique $S_t$ est notre stock que nous allons appeler $R^{inv}\_t$. Pour l'instant, c'est le seul élément de la variable d'état dynamique, donc

$$
S_t = R^{inv}_t.
$$

Nous allons ensuite introduire des éléments supplémentaires à notre variable d'état.

**2) La variable de décision** $x_t$ est la quantité que nous commandons au temps $t$, dont nous supposons (pour l'instant) qu'elle arrive immédiatement. Nous prenons nos décisions avec une politique $X^\pi(S_t)$ que nous concevrons plus tard.

**3) L'information exogène** est la demande aléatoire pour notre produit que nous allons noter $\Dhat_{t+1}$, donc $W_{t+1} = \Dhat_{t+1}$.

**4) Notre fonction de transition** capture la façon dont le stock $R_t$ évolue dans le temps, ce qui est donné par

$$
\begin{align}
R^{inv}_{t+1} = \max\{0, R^{inv}_t+x_t-\Dhat_{t+1}\}. \label{eq:inventoryexampleequation}
\end{align}
$$

**5) Notre fonction objectif.** Pour notre problème de gestion des stocks, il est plus naturel de calculer la contribution en incluant le coût d'achat du produit $x_t$ et le revenu provenant de la satisfaction de la demande $\Dhat_{t+1}$, ce qui signifie que notre fonction de contribution à une seule période s'écrirait

$$
C(S_t,x_t,\Dhat_{t+1}) = -cx_t + p \min\{R^{inv}_t+x_t, \Dhat_{t+1}\},
$$

où $x_t = X^\pi(S_t)$. Étant donné une séquence de demandes $\Dhat_1, \ldots, \Dhat_T$, la valeur d'une politique $\Fhat^\pi$ serait

$$
\Fhat^\pi(S_0) = \sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1}).
$$

Nos profits $\Fhat^\pi(S_0)$ sont aléatoires car ils dépendent d'une séquence particulière de demandes aléatoires $\Dhat_1, \ldots, \Dhat_T$. Enfin, nous faisons la moyenne sur ces demandes aléatoires en prenant l'espérance :

$$
\begin{align}
F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1})\vert S_0\right\}. \label{eq:inventoryobjective}
\end{align}
$$

Ici, le conditionnement sur l'état initial $S_0$ peut être lu comme signifiant « prendre l'espérance étant donné ce que nous savons initialement ». Le conditionnement sur $S_0$ est implicite chaque fois que nous prenons une espérance, et par conséquent de nombreux auteurs l'omettent. Cependant, nous allons inclure le conditionnement sur $S_0$ pour bien montrer que si nos entrées initiales (y compris les croyances) changent, cela peut avoir un effet sur la façon dont une politique se comporte.

**Étape 4. Le modèle d'incertitude** – L'approche la plus simple pour modéliser l'incertitude consiste simplement à utiliser des données historiques. Le problème que nous pourrions rencontrer est que si nous manquons de saucisse, nous risquons de ne pas observer la demande totale de saucisse ce jour-là. Si nous sommes en mesure de capturer cette demande perdue, alors il s'agit d'une approche raisonnable.

Une alternative consiste à construire un modèle mathématique. Nous pourrions supposer que notre demande suit une distribution normale de moyenne $\Dbar$ et d'écart type $\sigmabar^D$. Si nous supposons que ces deux valeurs sont connues, nous pouvons écrire notre demande comme

$$
\Dhat_{t+1} \sim N(\Dbar,(\sigmabar^D)^2),
$$

et tirer parti de logiciels capables d'échantillonner à partir de la distribution normale (par exemple, dans Excel, cela s'appelle `Norm.inv`$(Rand(),\Dbar,\sigmabar)$ pour générer une observation aléatoire de moyenne $\Dbar$ et d'écart type $\sigmabar$.

En utilisant ce modèle, nous pouvons créer un ensemble de demandes $(\Dhat_1, \Dhat_2, \ldots, \Dhat_T)$. Ensuite, nous pouvons répéter cela $N$ fois pour créer $N$ séquences de $T$ demandes, ce qui nous donne la séquence $(\Dhat^n_1, \Dhat^n_2, \ldots, \Dhat^n_T)$ pour $n=1, \ldots, N$ dont nous avons besoin pour estimer la valeur de la politique (nous utilisons cela ci-dessous à l'étape 6).

**Étape 5. Concevoir des politiques** – Ensuite, nous devons concevoir une méthode pour déterminer nos commandes. Une stratégie couramment utilisée pour les problèmes de gestion des stocks est connue sous le nom de politique « order-up-to » (commande jusqu'à un seuil), qui ressemble à

$$
\begin{align}
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases} \label{eq:introorderupto}
\end{align}
$$

où $\theta = (\theta^{min},\theta^{max})$ est un ensemble de paramètres qui doivent être ajustés. Elle est appelée « order-up-to » car nous passons une commande pour amener le stock « jusqu'à » la limite supérieure $\theta^{max}$.

**Étape 6. Évaluer les politiques** – Il existe une variété de stratégies que nous pourrions utiliser. En pratique, nous ne pouvons pas calculer l'espérance dans la fonction objectif de l'équation $\eqref{eq:inventoryobjective}$, nous prenons donc une série d'échantillons de demandes. Soit $\Dhat^n_1, \ldots, \Dhat^n_T$ un échantillon de demandes sur $t=1, \ldots, T$, et supposons que nous pouvons en générer $N$. Nous pouvons maintenant estimer nos profits attendus à partir de la politique $X^\pi(S_t)$ en faisant la moyenne sur les échantillons pour $n=1, \ldots, N$, ce qui est calculé à l'aide de

$$
\Fbar^\pi(\theta\vert S_0) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

En termes simples, nous simulons la politique $X^\pi(S_t\vert \theta)$ $N$ fois en utilisant les échantillons simulés (ou observés à partir de l'historique) de demandes $\Dhat^n_1, \ldots, \Dhat^n_T$, puis nous faisons la moyenne des performances pour obtenir $\Fbar^\pi(\theta\vert S_0)$. Nous devons ensuite trouver la meilleure valeur de $\theta$. Une stratégie simple consisterait à générer $K$ valeurs possibles $\theta_1, \ldots, \theta_K$, à simuler chacune d'elles pour trouver $\Fbar^\pi(\theta_k\vert S_0)$ pour chaque $k$, puis à choisir la valeur de $\theta_k$ qui fonctionne le mieux. Ce n'est pas une stratégie optimale, mais elle constitue un point de départ simple et pratique.

### Un problème légèrement plus compliqué

Le problème simple de gestion des stocks ci-dessus est un cadre classique pour démontrer une méthode particulière de résolution des problèmes de décision séquentielle connue sous le nom de programmation dynamique, qui dépend du fait d'avoir une variable d'état simple, à la fois a) discrète et b) ne possédant pas trop de valeurs possibles. Dans notre problème de gestion des stocks légèrement plus compliqué, nous allons illustrer trois variantes différentes de variables d'état qui représenteraient une complication sérieuse pour une méthode populaire de résolution des problèmes de décision séquentielle, mais qui n'a aucun effet sur la politique que nous avons choisie.

**Étape 1 : Récit** – Nous retrouvons notre restaurant de pizzas qui doit commander de la saucisse, mais nous allons permettre au prix que nous payons pour la saucisse de varier d'un jour à l'autre, en supposant que le prix d'un jour est indépendant du prix du jour précédent. Ensuite, nous allons également supposer que si la demande de saucisse pour le lendemain est aléatoire, nous disposerons d'une prévision de la demande du lendemain qui, bien qu'imparfaite, vaut mieux que l'absence de prévision. Sinon, tout le reste de notre problème plus compliqué reste identique à ce qu'il était auparavant.

**Étape 2 : Éléments essentiels** – Ce sont :

- Métriques – Nous voulons maximiser les profits donnés par les ventes de saucisse moins le coût d'achat de la saucisse, où le coût varie d'un jour à l'autre.
- Décisions – Comme pour notre problème de gestion des stocks plus simple, nous devons décider de la quantité à commander à la fin d'une journée, celle-ci arrivant au début de la suivante.
- Sources d'incertitude – Il existe maintenant trois sources d'incertitude : la différence entre la demande réelle et la prévision, l'évolution des prévisions d'un jour à l'autre, et le prix que nous payons pour la saucisse.

**Étape 3 : Modèle mathématique** – Nous avons toujours les mêmes cinq éléments, mais maintenant le problème est un peu plus riche :

**1)** Pour construire la variable d'état, nous devons lister les informations (plus précisément, les informations qui évoluent dans le temps) nécessaires dans trois parties différentes du modèle : (1) la fonction objectif, (2) la politique de prise de décision (qui inclut les contraintes), et (3) la fonction de transition. Bien entendu, nous n'avons pas encore introduit aucune de ces fonctions, vous devez donc lire la suite et vérifier que notre variable d'état contient toutes les informations nécessaires pour calculer chacune de ces fonctions. Considérez cela comme un dictionnaire des informations dont nous aurons besoin.

Nous commençons par l'état initial $S_0$ qui est constitué de paramètres constants, et de valeurs initiales de quantités et de paramètres qui changent dans le temps. Ce sont :

- Stock initial – Nous partons avec un stock initial $R_0$.
- Coût d'achat initial – $c_0$.
- Prix – Nous supposons que nous vendons notre saucisse à un prix fixe $p$.
- Prévision initiale – Nous supposons que notre première prévision $f^D_{0,1}$ est donnée, où $f^D_{0,1}$ est la prévision connue au temps 0 pour la demande au temps 1.
- Estimation initiale de l'écart type de la demande – $\sigmabar^D_0$.
- Estimation initiale de l'écart type de la prévision – $\sigmabar^f_0$.

Cela signifie que notre variable d'état initiale est

$$
S_0 = (R_0,c_0, p, f^D_{0,1}, \sigmabar^D_0, \sigmabar^f_0).
$$

Nous avons ensuite les informations qui évoluent dans le temps et qui composent notre variable d'état dynamique $S_t$ :

- Stock actuel $R^{inv}\_t$ – Le stock au début de l'intervalle de temps $(t,t+1)$.
- Coût d'achat $c_t$ – Il s'agit du coût de la saucisse achetée au temps $t$ qui nous est communiqué au temps $t$.
- Prévision de la demande $f^D_{t,t+1}$ – Il s'agit de la prévision de $\Dhat_{t+1}$ compte tenu de ce que nous savons au temps $t$.
- Estimation actuelle de l'écart type de la demande – $\sigmabar^D_t$.
- Estimation actuelle de l'écart type de la prévision – $\sigmabar^f_t$.

Notre variable d'état dynamique est alors donnée par

$$
S_t = (R^{inv}_t, c_t, f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t).
$$

**2)** La variable de décision $x_t$ est la quantité que nous commandons au temps $t$, que nous supposons (pour l'instant) arrive immédiatement. Nous prenons nos décisions avec une politique $X^\pi(S_t)$ que nous concevrons plus tard.

**3)** L'information exogène comprend désormais :

- Les coûts d'achat $\chat_{t+1}$ – Il s'agit du coût d'achat de la saucisse au jour $t+1$, qui est spécifié de manière exogène.
- Les prévisions – À chaque période, nous recevons une nouvelle prévision. Soit $\varepsilon^f_{t+1}$ le changement de la prévision entre le temps $t$ et $t+1$.
- Les demandes – Enfin, nous supposons que la demande réelle est un écart aléatoire par rapport à la prévision, que nous pouvons écrire

$$
\Dhat_{t+1} = f^D_{t,t+1} + \varepsilon^D_{t+1}.
$$

Notre ensemble complet de variables d'information exogène peut maintenant s'écrire

$$
W_{t+1} = \big(\chat_{t+1}, \varepsilon^f_{t+1}, \varepsilon^D_{t+1}\big).
$$

**4) Fonction de transition** – Celle-ci spécifie comment chacune des variables d'état (dynamiques) $S_t$ évolue dans le temps. Nous mettons à jour notre stock en utilisant :

$$
\begin{align}
R^{inv}_{t+1}       &= \max\{0, R^{inv}_t + x_t - \Dhat_{t+1}\}. \label{eq:introcomplexinventorytransition1}
\end{align}
$$

La demande est la demande prévue plus l'écart $\varepsilon^D_{t+1}$ par rapport à la prévision, ce qui nous donne l'équation :

$$
\begin{align}
\Dhat_{t+1}   &= f^D_{t,t+1} + \varepsilon^D_{t+1}. \label{eq:introcomplexinventorytransition2}
\end{align}
$$

Nous supposons que notre prévision est mise à jour en utilisant

$$
\begin{align}
f^D_{t+1,t+2} &= f^D_{t,t+1} + \varepsilon^f_{t+1}. \label{eq:introcomplexinventorytransition3}
\end{align}
$$

Ensuite, nous allons estimer de manière adaptative la variance de la demande et de la prévision de demande :

$$
\begin{align}
(\sigmabar^D_{t+1})^2 &= (1-\alpha)(\sigmabar^D_t)^2 + \alpha (f^D_{t,t+1} - \Dhat_{t+1})^2, \label{eq:introcomplexinventorytransition4}\\
(\sigmabar^f_{t+1})^2 &= (1-\alpha)(\sigmabar^f_t)^2 + \alpha (f^D_{t,t+1} - f^D_{t+1,t+2})^2, \label{eq:introcomplexinventorytransition5}
\end{align}
$$

où $0 < \alpha < 1$ est un facteur de lissage.

Enfin, nous mettons à jour le coût $c_{t+1}$ avec le « coût observé » $\chat_{t+1}$ que nous écrivons simplement comme

$$
\begin{align}
c_{t+1} = \chat_{t+1}.\label{eq:introcomplexinventorytransition6}
\end{align}
$$

L'équation $\eqref{eq:introcomplexinventorytransition6}$ est un exemple de variable d'état que nous observons plutôt que calculons, comme nous l'avons fait avec le stock $R^{inv}\_t$ dans $\eqref{eq:introcomplexinventorytransition1}$. L'équation $\eqref{eq:introcomplexinventorytransition1}$ est parfois appelée « basée sur un modèle », car elle reflète la physique de la manière dont les stocks sont mis à jour, tandis que l'équation $\eqref{eq:introcomplexinventorytransition6}$ est appelée « sans modèle », car nous ne tentons pas de modéliser le processus sous-jacent qui produit le changement de coûts.

Notre fonction de transition $S_{t+1} = S^M(S_t,x_t,W_{t+1})$ est constituée des équations $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$.

**5)** Enfin, notre fonction de contribution pour une seule période s'écrirait désormais

$$
C(S_t,x_t,\Dhat_{t+1}) = -c_tx_t + p \min\{R_t+x_t, \Dhat_{t+1}\},
$$

où la seule différence avec le problème de stock plus simple est que le coût $c$ dépend maintenant du temps $c_t$. Nous nous écartons de notre convention consistant à écrire la contribution comme $C(S_t,x_t)$ et lui permettons d'inclure les revenus provenant des demandes $\Dhat_{t+1}$.

Nous énonçons maintenant formellement notre fonction objectif comme

$$
\begin{align}
\max_{\pi=(f,\theta)} \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat_{t+1})\vert S_0\right\}. \label{eq:introcomplexinventoryobjective}
\end{align}
$$

L'optimisation $\max_\pi$ signifie que nous recherchons parmi toutes les politiques possibles représentées par $(f,\theta)$, ce qui signifie littéralement rechercher parmi toutes les différentes fonctions que nous pourrions utiliser pour prendre une décision. Les exemples de ce livre vont démontrer *comment* nous allons effectuer cette recherche sur les fonctions.

Rappelons que nous avons indiqué plus haut que l'indice $\pi$ porte l'information sur le type de fonction $f\in\Fcal$, et sur les paramètres ajustables $\theta\in\Theta^f$. En pratique, la recherche sur les types de fonctions $f\in\Fcal$ tend à être ad hoc (un analyste expérimenté choisit des fonctions qui ont du sens pour un problème donné), tandis qu'un algorithme informatique effectue la recherche de la meilleure valeur de $\theta\in\Theta^f$.

**Étape 4. Le modèle d'incertitude** – Nous allons supposer que les changements exogènes $\varepsilon^D_{t+1}$ et $\varepsilon^f_{t+1}$ sont décrits par des distributions normales de moyenne 0 et de variances $(\sigmabar^D_t)^2$ et $(\sigmabar^f_t)^2$, ce que nous exprimons en écrivant

$$
\varepsilon^D_t \sim N(0, (\sigmabar^D_t)^2), \quad \varepsilon^f_t \sim N(0, (\sigmabar^f_t)^2).
$$

Les modèles d'incertitude peuvent devenir assez complexes, mais celui-ci servira d'illustration.

**Étape 5. Conception des politiques** – Ensuite, nous devons concevoir une méthode pour déterminer nos commandes. Au lieu de la politique de commande jusqu'à un seuil de notre modèle plus simple, nous allons suggérer l'idée de commander suffisamment pour satisfaire la demande attendue pour le lendemain, avec un ajustement. Nous pourrions écrire ceci comme

$$
\begin{align}
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta. \label{eq:adjustedforecastpolicy}
\end{align}
$$

Si nous disposions d'une prévision parfaite, alors tout ce que nous aurions à commander serait $f^D_{t,t+1}$ (notre prévision de $\Dhat_{t+1}$) moins le stock disponible. Cependant, en raison de l'incertitude, nous allons ajouter un ajustement $\theta$ afin de disposer d'une certaine marge pour éviter les ruptures de stock.

**Étape 6. Évaluation des politiques** – Cette fois, nous devons générer des échantillons de toutes les variables aléatoires dans la séquence $W_1, W_2, \ldots, W_T$. Encore une fois, nous pourrions générer $N$ échantillons de l'ensemble de la séquence afin de pouvoir estimer la performance d'une politique en utilisant

$$
\Fbar^\pi(\theta) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

Nous sommes à nouveau confrontés au problème de trouver la meilleure valeur de $\theta$, mais nous reviendrons sur ce défi plus tard.

## Le cadre de modélisation universel

Nous sommes maintenant prêts à décrire plus en détail les éléments du cadre de modélisation universel (UMF). Nous notons que l'UMF peut modéliser *tout* problème de décision séquentielle. Cette affirmation assez large deviendra évidente à mesure que les éléments se déploieront, car nous ne faisons qu'appliquer une notation à l'énoncé général d'un problème de décision séquentielle.

### Les cinq éléments de l'UMF

L'UMF est constitué des éléments suivants :

1. Les variables d'état $S_t$.
2. Les variables de décision $x_t$.
3. Le processus d'information exogène $W_t$.
4. Le modèle de transition d'état $S^M(S_t,x_t,W_{t+1})$.
5. La fonction objectif.

Nous décrivons ceux-ci plus en détail comme suit :

**Variables d'état** – L'état $S_t$ du système au temps $t$ contient toute l'information nécessaire et suffisante pour modéliser notre système à partir du temps $t$. Plus précisément, cette information est constituée de :

- a) L'information nécessaire pour prendre une décision au temps $t$.
- b) L'information nécessaire pour calculer les métriques de performance au temps $t$.
- c) Toute information nécessaire maintenant pour calculer (a) et (b) dans le futur.

Il existe trois types d'information dans $S_t$ :

- L'état physique, $R_t$, capture des quantités physiques telles que les stocks, les personnes, les machines disponibles, les installations, l'eau, les médicaments, l'énergie et l'argent (sous ses différentes formes). $R_t$ inclura également les demandes des clients pour des produits ou services. Dans de nombreuses applications, $R_t$ décrit la ressource qui est gérée, et une erreur assez courante consiste à assimiler « état » à « état physique ».
- L'état d'information, $I_t$, qui contient les fonctions utilisées (lorsqu'un choix est possible) et tout paramètre ajustable. $I_t$ pourrait spécifier comment nous prévoyons les demandes, et les paramètres utilisés pour ajuster la prévision, en plus de tout autre paramètre qui contrôle l'évolution du système.
- L'état de croyance, $B_t$, qui contient des estimations ou des croyances concernant des quantités et des paramètres qui ne sont pas connus parfaitement. Ainsi, $B_t$ pourrait capturer la moyenne et la variance estimées d'une distribution normale (comme avec notre prévision de demande ci-dessus). Alternativement, il pourrait s'agir d'un vecteur de probabilités qui évolue dans le temps.

L'état physique $R_t$ pourrait être le montant d'argent dans un compte de trésorerie, tandis que $I_t$ pourrait être l'état actuel des marchés des actions et des obligations. Si nous voyageons sur un réseau dynamique, $R_t$ pourrait être notre emplacement sur le réseau, tandis que $I_t$ pourrait être ce que nous savons des temps de trajet sur chaque liaison. Si nous planifions un trajet puis souhaitons pénaliser les écarts par rapport au plan, alors le plan serait inclus dans la variable d'état via $I_t$.

Les variables d'état ne sont généralement pas évidentes. Elles émergent au cours du processus de modélisation, plutôt que d'être quelque chose que l'on peut immédiatement écrire. Le simple fait que nous l'écrivions en premier ne signifie pas que vous serez toujours capable de lister immédiatement tous les éléments de la variable d'état. Mais en fin de compte, c'est là que vous stockez toutes les informations dont vous avez besoin pour modéliser votre système à partir du temps $t$.

**Variables de décision** – Différentes communautés utilisent des notations différentes pour la décision, comme $a_t$ pour une action (typiquement discrète) ou $u_t$ pour une commande (typiquement continue) en ingénierie. Nous utilisons $x_t$ par défaut car elle est largement utilisée par la communauté de la programmation mathématique.

Les variables de décision se présentent sous différentes formes :

- Binaire (par exemple pour modéliser s'il faut vendre un actif ou non, ou pour les tests A/B de différentes conceptions de sites web).
- Discrète (par exemple choix de médicament, quel produit annoncer).
- Scalaire continue (prix, températures, concentrations).
- Vecteurs (discrets ou continus, comme les allocations d'approvisionnements sanguins entre hôpitaux).
- Catégorielle (par exemple quelles caractéristiques mettre en avant dans une publicité produit).

Nous notons qu'il existe des classes d'algorithmes déterminées par la nature de la variable de décision.

Nous supposons que les décisions sont prises avec une politique, que nous pourrions noter $X^\pi(S_t)$ si nous utilisons $x_t$ comme notre décision. Nous supposons qu'une décision $x_t = X^\pi(S_t)$ est réalisable au temps $t$, ce qui signifie $x_t \in \Xcal_t$ pour un certain ensemble (ou région) $\Xcal_t$, qui peut dépendre de $S_t$.

Nous laissons « $\pi$ » porter l'information sur le type de fonction $f\in\Fcal$ (par exemple, un modèle linéaire avec des variables explicatives spécifiques), et tout paramètre ajustable $\theta \in \Theta^f$.

**Information exogène** – Nous notons $W_{t+1}$ toute nouvelle information qui devient connue pour la première fois au temps $t+1$ (c'est-à-dire entre $t$ et $t+1$), où la source de l'information provient de l'extérieur de notre système (c'est pourquoi elle est « exogène »). Lors de la modélisation de variables spécifiques, nous utilisons des « chapeaux » pour indiquer l'information exogène. Ainsi, $\Dhat_{t+1}$ pourrait être la demande qui survient entre $t$ et $t+1$, ou nous pourrions laisser $\phat_{t+1}$ être le changement de prix entre $t$ et $t+1$.

Le processus d'information exogène peut être stationnaire ou non stationnaire, purement exogène ou dépendant de l'état (et éventuellement de l'action) (si nous décidons de vendre beaucoup d'actions, cela pourrait faire baisser les prix).

Nous notons $\omega$ un chemin d'échantillon $W_1, \ldots, W_T$, qui représente une séquence de résultats de chaque $W_t$. Souvent, nous créerons un ensemble $\Omega$ d'échantillons discrets, où chaque échantillon représente une séquence particulière des résultats de notre processus $W_t$, que nous pourrions écrire comme $W_1(\omega), \ldots, W_T(\omega)$. Si nous avons 20 chemins d'échantillons, nous pouvons considérer $\omega$ comme consistant en un nombre entre 1 et 20, ce qui nous permet de rechercher le chemin d'échantillon.

**Fonction de transition** – Nous notons la fonction de transition par

$$
\begin{align}
S_{t+1} = S^M(S_t,x_t,W_{t+1}), \label{eq:transition}
\end{align}
$$

où $S^M(\cdot)$ est également connue sous des noms tels que modèle de transition d'état, modèle système, modèle d'installation, équation d'installation, équation d'état et fonction de transfert.

L'équation $\eqref{eq:transition}$ est la forme classique d'une fonction de transition qui donne les équations de l'état $S_t$ à l'état $S_{t+1}$. L'équation $\eqref{eq:inventoryexampleequation}$ était la seule équation de transition pour notre exemple simple de stock, tandis que les équations $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$ constituaient la fonction de transition pour notre exemple plus compliqué.

La fonction de transition pourrait capturer l'un ou l'autre des types de mises à jour suivants :

- Changements dans les ressources physiques tels que l'ajout de stock, le déplacement de personnes ou la modification d'équipements.
- Mises à jour de l'information telles que les changements de prix et de météo.
- Mises à jour de nos croyances concernant des quantités ou des paramètres incertains.

La fonction de transition peut être un ensemble d'équations connu, ou inconnu, comme lorsque nous décrivons le comportement humain ou l'évolution du CO2 dans l'atmosphère. Lorsque les équations sont inconnues, le problème est souvent décrit comme « sans modèle » ou « piloté par les données », ce qui signifie que nous pouvons seulement observer les changements d'une variable, plutôt que d'utiliser un modèle physique. L'équation $\eqref{eq:introcomplexinventorytransition6}$, où nous « observons » le coût $c_{t+1} = \chat_{t+1}$, sans idée de comment nous avons évolué à partir de $c_t$, est un exemple de transition sans modèle.

Les fonctions de transition peuvent être linéaires, non linéaires continues ou des fonctions en escalier. Lorsque l'état $S_t$ inclut un état de croyance $B_t$, alors la fonction de transition doit inclure les équations de mise à jour (nous illustrons ceci plus loin dans le livre).

Étant donné une politique $X^\pi(S_t)$, un processus exogène $W_{t+1}$ et une fonction de transition, nous pouvons écrire notre séquence d'états, de décisions et d'information comme

$$
(S_0, x_0, W_1, S_1, x_1, W_2, \ldots, x_{T-1},  W_T, S_T).
$$

**Fonctions objectif** – Il existe plusieurs façons d'écrire les fonctions objectif. L'une des plus courantes, que nous utiliserons par défaut, maximise les contributions totales attendues sur un certain horizon $t=0, \ldots, T$

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C_t(S_t,X^\pi_t(S_t\vert \theta))\vert S_0\right\}, \label{eq:objectivecumulativereward}
\end{align}
$$

où

$$
\begin{align}
S_{t+1} = S^M(S_t,X^\pi_t(S_t),W_{t+1}). \label{eq:basetransition}
\end{align}
$$

Le modèle est entièrement spécifié lorsque nous disposons également d'un modèle de l'état initial $S_0$, et d'un modèle du processus exogène $W_1, W_2, \ldots$. Nous écrivons toute l'information exogène comme

$$
\begin{align}
(S_0, W_1, W_2, \ldots, W_T). \label{eq:basestochasticmodel}
\end{align}
$$

Les équations $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:basetransition}$ et $\eqref{eq:basestochasticmodel}$ constituent un modèle d'un problème de décision séquentielle.

Pour la suite, par souci de concision, nous allons utiliser $\max_\pi$ pour représenter une recherche sur les types de fonctions $f\in\Fcal$ et les paramètres ajustables $\theta\in\Theta^f$.

L'équation $\eqref{eq:objectivecumulativereward}$ utilise une espérance $\E$ qui signifie prendre une moyenne sur tous les résultats possibles de $W_1, \ldots, W_T$. Ceci n'est pratiquement jamais possible à faire de manière computationnelle. Au lieu de cela, laissons $\omega$ représenter un résultat unique de la séquence $W_1, \ldots, W_T$ que nous pourrions écrire $W_1(\omega), \ldots, W_T(\omega)$. Supposons que nous puissions créer $N$ résultats possibles de cette séquence, et laissons $\omega^n$ représenter comment nous indexons la séquence $n^{th}$.

Si nous suivons une trajectoire d'échantillon $\omega$, nous réécririons alors notre fonction de transition dans $\eqref{eq:basetransition}$ en utilisant

$$
\begin{align}
S_{t+1}(\omega) = S^M(S_t(\omega),X^\pi_t(S_t(\omega)),W_{t+1}(\omega)). \label{eq:basetransition2}
\end{align}
$$

Nous indexons chaque variable de l'équation $\eqref{eq:basetransition2}$ par $\omega$ pour indiquer que nous suivons une seule trajectoire d'échantillon de valeurs de $W_t$.

Nous pouvons maintenant remplacer notre objectif basé sur l'espérance par une moyenne que nous pouvons écrire

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0) = \frac{1}{N}\sum_{n=1}^N \sum_{t=0}^T C_t(S_t(\omega^n),X^\pi_t(S_t(\omega^n))). \label{eq:objectivecumulativerewardaverage}
\end{align}
$$

Souvent, nous travaillons avec une seule trajectoire d'échantillon, éventuellement issue de l'historique. Dans ce cas, nous approximons la performance de la politique en utilisant cette seule trajectoire d'échantillon, que nous pouvons écrire comme

$$
\begin{align}
\max_\pi \Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))). \label{eq:objectivecumulativerewardsample}
\end{align}
$$

Chaque fois que nous écrivons un objectif à l'aide d'une espérance comme dans $\eqref{eq:objectivecumulativereward}$, rappelons-nous que ce que nous ferions réellement est d'utiliser une moyenne comme dans $\eqref{eq:objectivecumulativerewardaverage}$ ou un échantillon comme dans $\eqref{eq:objectivecumulativerewardsample}$.

L'espérance peut également devoir refléter l'incertitude dans l'état initial $S_0$, qui pourrait capturer des croyances sur des prévisions incertaines, ou des estimations incertaines sur l'état de la maladie d'un patient. Dans ce cas, la trajectoire d'échantillon $\omega$ doit inclure des échantillons issus de ces distributions initiales.

Il existera certains contextes où il sera plus judicieux d'utiliser un compteur $n$ plutôt que le temps. Dans ce cas, nous notons $S^n$ l'état après $n$ observations (celles-ci peuvent être des expériences, des arrivées de clients, des itérations d'un algorithme). Nous utiliserons le temps $t$ comme index par défaut.

### Les variables d'état initiales $S_0$

Nous devons distinguer entre l'état initial $S_0$ et les états subséquents $S_t$ pour $t > 0$ :

- **$S_0$** – L'état initial $S_0$ capture i) les paramètres déterministes qui ne changent jamais, ii) les valeurs initiales de quantités ou de paramètres qui changent (éventuellement en raison de décisions), et iii) les croyances sur des quantités ou des paramètres que nous ne connaissons pas parfaitement (cela pourrait être les paramètres d'une distribution de probabilité) tels que notre réaction à un vaccin ou la façon dont le marché répondra au prix. Les croyances peuvent rester statiques, ou nous pouvons les mettre à jour à mesure que nous apprenons à partir d'observations.
- **$S_t$** – Il s'agit de toute l'information dont nous avons besoin au temps $t$ issue de l'historique pour modéliser le système à partir du temps $t$. $S_t$ pour $t > 0$ n'inclut que les variables qui changent au fil du temps, ce qui signifie qu'au temps $t$ nous pouvons aussi utiliser l'information statique contenue dans $S_0$.

Nous écrivons la dépendance explicite de la performance de la politique par rapport à l'état initial $S_0$, que nous utilisions $F^\pi(S_0)$, $\Fbar^\pi(S_0)$ ou $\Fhat^\pi(\omega\vert S_0)$. Bien que cela devrait être évident, c'est souvent négligé. L'état initial comprend des éléments tels que :

- Les valeurs initiales des quantités de ressources physiques ou financières $R_0$ – Cela pourrait être les stocks de départ, l'emplacement initial d'un véhicule, les machines disponibles, et l'ensemble initial d'installations. Cela inclut aussi toute valeur statique, comme un réseau de transport, la taille d'un entrepôt (qui ne change pas), et le nombre de camions dans une flotte.
- Les valeurs initiales des paramètres, ainsi que toute fonction utilisée pour modéliser le problème $I_0$ – Cela pourrait être un prix initial, le niveau de médicament chez un patient, ainsi que le choix des fonctions pour effectuer des prévisions ou modéliser l'évolution de la maladie dans une population.
- Les croyances ou estimations initiales de toute quantité ou paramètre $B_0$ – Cela pourrait être une prévision de demande, l'estimation de la manière dont les marchés répondent aux prix, la façon dont un candidat présidentiel se positionne dans les sondages, ou les croyances sur la performance d'un processus de fabrication.

Nous notons qu'il est utile de séparer les valeurs initiales qui ne changent jamais de celles qui évoluent au fil du temps, soit directement en raison de décisions, soit à partir d'information exogène. Les valeurs qui ne changent jamais sont stockées dans $S_0$, mais ne sont pas représentées dans $S_t$ pour $t > 0$. La raison en est le souci de garder $S_t$ aussi compact que possible.

Supposons que notre politique $X^\pi(S_t\vert \theta)$ possède des paramètres ajustables. Par exemple, nous pourrions gérer un système de stock où nous utilisons la politique familière du « point de commande » (connue dans la littérature sur les stocks comme une politique $(s,S)$) donnée par

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & R_t < \theta^{min},\\ 0 & \text{otherwise.}\end{cases}
$$

où $\theta = (\theta^{min},\theta^{max})$. Pour simplifier, nous pourrions supposer que lorsque nous passons une commande, elle arrive immédiatement (une hypothèse classique de manuel qui n'est jamais vraie en pratique), ce qui nous permet d'écrire l'évolution de notre état physique $R_t$ (la quantité en stock juste avant que nous passions notre commande instantanée) en utilisant

$$
R_{t+1} = \max\{0,R_t + x_t - \Dhat_{t+1}\}
$$

où $x_t = X^\pi(S_t\vert \theta)$ et $\Dhat_{t+1}$ est la demande pour notre produit sur l'intervalle $(t,t+1)$ (c'est notre information exogène $W_{t+1}$). Enfin, soit $C(S_t,x_t,W_{t+1})$ notre profit net sur l'intervalle $(t,t+1)$ (ce qui n'est pas important pour l'instant).

Imaginons maintenant que nous disposions d'un processus de demande historique $W_1, W_2, \ldots, W_t, \ldots, W_T$ qui nous permette d'exécuter une simulation de notre système. Soit $\omega$ représentant cette séquence historique de demandes (ou toute information exogène). Nous écririons le problème consistant à trouver le meilleur ensemble de paramètres de commande $\theta$ en utilisant

$$
\begin{align}
\max_\theta \Fhat^\pi(\omega,\theta\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))), \label{eq:optimizingtheta}
\end{align}
$$

où la variable d'état évolue selon

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi_t(S_t(\omega)), W_{t+1}(\omega)).
$$

Soit $\theta^\ast $ la valeur de $\theta$ que nous avons trouvée en optimisant $\eqref{eq:optimizingtheta}$. La bonne façon d'écrire cette valeur optimale est comme une fonction $\theta^\ast (S_0)$ qui dépend de l'information contenue dans $S_0$ (elle dépend aussi de la trajectoire d'échantillon $\omega$). Cela aide à communiquer la réalité selon laquelle si nous changeons les données d'entrée de notre problème, représentées par $S_0$, cela peut avoir un impact sur les meilleures valeurs de nos paramètres de politique $\theta$. En fait, nous pourrions même devoir changer notre choix de politique !

### Variations

Il existe deux variations importantes de notre modèle mathématique de base :

- **Du temps $t$ à l'itération $n$** – Il existe des contextes de problèmes où il est plus naturel d'utiliser un compteur $n$ plutôt que le temps $t$. Nous faisons plus que simplement changer $t$ en $n$, car nous considérons les variables qui changent avec les itérations différemment d'une évolution au fil du temps. Plus précisément, nous plaçons l'indice $n$ en exposant, comme $S^n$, $x^n$ et $W^{n+1}$.

  Une raison à cela est que nous considérons un ensemble de variables au fil du temps $x_1, x_2, \ldots, x_t, \ldots, x_T$ comme un vecteur $x=(x_1, x_2, \ldots, x_t, \ldots, x_T)$, ce qui est utile pour modéliser des problèmes déterministes (nous pourrions optimiser sur l'ensemble du vecteur $x$ à la fois). En revanche, nous considérons $x^n$ comme une fonction qui évolue au fil du temps.

  Plus concrètement, placer $n$ en exposant nous permet d'écrire des simulations itératives. Ainsi, nous écririons le processus d'information au fil du temps pour l'itération $n$ en utilisant

$$
\omega^n = (W^n_1, \ldots, W^n_t, \ldots, W^n_T).
$$

  Si nous recherchons de manière itérative la meilleure politique, nous pourrions écrire notre politique pour l'itération $n$ en utilisant $X^{\pi,n}(S_t)$, ce qui produit alors

$$
S^n_0, x^n_0, W^n_1, \ldots, S^n_t, x^n_t, W^N_{t+1}, \ldots, S^N_T,
$$

  où $x^n_t = X^{\pi,n}(S^n_t\vert \theta)$.
- **Optimisation de la récompense finale** – Un contexte courant est celui où nous effectuons une recherche stochastique, comme cela se produirait lors de la recherche de la meilleure politique. Chaque itération pour évaluer l'algorithme peut nécessiter une simulation au fil du temps, bien que ce ne soit pas toujours le cas.

  Supposons maintenant que notre variable de décision soit le paramètre $\theta$, et que nous disposions d'un algorithme $\Theta^\pi(S^{\theta,n})$ qui fonctionne exactement comme une politique $X^\pi(S_t\vert \theta)$, mais où $S^{\theta,n}$ capture l'« état » de l'algorithme à la $n$ème itération.

  Les algorithmes de recherche sont tous des problèmes de décision séquentielle, mais contrairement à la plupart des problèmes de décision séquentielle au fil du temps, nous voulons exécuter $N$ itérations, et nous ne nous préoccupons de notre solution qu'à la fin. Soit $\theta^{\pi,N}$ la valeur de $\theta^n$ après $N$ itérations, en suivant l'« algorithme » (politique) $\pi$.

  La valeur $\theta^{\pi,N}$ dépend de la séquence spécifique de notre processus d'information $W^1, \ldots, W^t, \ldots, W^N$, mais nous devons ensuite l'évaluer en utilisant un nouvel ensemble d'échantillons que nous allons appeler $\What$.

  Nous évaluons la performance de notre algorithme en utilisant un objectif de récompense finale, que nous écrivons comme

$$
\begin{align}
\max_\pi \Fhat^\pi(S^\theta_0) &  = \E_{\What} F(\theta^{\pi,N}, \What)  \label{eq:objectivefinalreward1} \\
                                &\approx \frac{1}{M} \sum_{m=1}^M F(\theta^{\pi,N}, \What^m). \label{eq:objectivefinalreward2}
\end{align}
$$

  Autrement dit, nous évaluons notre politique d'apprentissage pour $\theta$, que nous avons notée $\Theta^\pi(S^{\theta,N})$, en simulant à travers $N$ itérations en utilisant des observations de $W^n$ (ce qui peut être une simulation entière au fil du temps $t$). Lorsque nous obtenons notre estimation finale du paramètre $\theta$, que nous appelons $\theta^{\pi,N}$, nous évaluons la performance de cette valeur en utilisant une simulation distincte où nous fixons $\theta = \theta^{\pi,N}$ et créons ensuite un nouvel ensemble d'observations aléatoires que nous appelons $\What^m$ pour $m=1, \ldots, M$.

## Modéliser l'incertitude

Pour de nombreux problèmes complexes (les chaînes d'approvisionnement, les systèmes énergétiques et la santé publique n'en sont que quelques exemples), identifier et modéliser les différentes formes d'incertitude peut être un exercice riche et complexe. Nous allons évoquer les questions qui se posent, mais nous n'allons pas tenter une discussion approfondie de cette dimension.

L'incertitude est communiquée à notre modèle par deux mécanismes : l'état initial $S_0$, où nous modéliserions les paramètres des distributions de probabilité décrivant des quantités et des paramètres que nous ne connaissons pas parfaitement, et le processus d'information exogène $W_1, \ldots, W_T$.

### Incertitude dans l'état initial

La variable d'état initiale peut contenir des paramètres déterministes ou des valeurs initiales de quantités et de paramètres variant dynamiquement. Si c'est tout ce que contient l'état initial, alors il ne capture aucune forme d'incertitude.

Il existe de nombreux problèmes où nous ne connaissons pas certaines quantités ou paramètres, mais pouvons représenter ce que nous savons à travers les paramètres d'une distribution de probabilité. Quelques exemples sont :

- La réponse d'un patient à un nouveau médicament.
- La façon dont un marché répondra à un changement de prix.
- Le nombre de têtes de laitue vendables que nous avons en stock (un nombre incertain peut avoir fané et n'est plus vendable).
- Le moment où une boîte de stock précédemment commandée en Chine arrivera.
- Le montant des dépôts dans un fonds commun de placement varie de manière aléatoire autour d'une moyenne $\lambda$, mais nous ne savons pas quelle est $\lambda$.

Voici un certain nombre de manières dont nous pouvons initialiser un modèle avec de l'incertitude dans certaines des entrées.

Une croyance probabiliste initiale peut provenir d'un jugement subjectif, ou d'observations ou d'expériences précédentes.

### Le processus d'information exogène

La seconde façon dont l'incertitude entre dans notre modèle est à travers le processus d'information exogène. La variable $W_t$ contient une information qui n'est pas connue avant la période $t$. Cela signifie que nous devons prendre une décision $x_t$ au temps $t$ avant de connaître le résultat de $W_{t+1}$.

Ci-dessous se trouve une liste d'exemples de $W_{t+1}$ qui sont révélés après qu'une décision $x_t$ soit prise :

- Nous choisissons un chemin, puis observons le temps de trajet sur ce chemin.
- Nous choisissons un médicament, puis observons comment le patient répond.
- Nous choisissons un catalyseur, puis observons la résistance du matériau qu'il produit.
- Nous choisissons un produit à annoncer sur un marché en ligne, puis observons les ventes.
- Nous sélectionnons une conception d'interface web, puis observons le nombre de clics qu'elle peut générer.
- Nous allouons des fonds à un investissement, puis observons le changement de prix de l'investissement.

Dans chaque cas, l'information que nous observons après avoir pris la décision affecte la performance de la décision (et quelle décision aurait été la meilleure).

À ce stade, le lecteur a probablement réalisé que $W_{t+1}$ est habituellement une collection de différents types d'information. Par exemple, imaginons que nous traitons un patient présentant une glycémie élevée. Le médecin souhaite expérimenter différentes stratégies, allant du régime alimentaire et de l'exercice ou de médicaments pour réduire le poids, jusqu'à des médicaments qui ciblent spécifiquement la glycémie. Les sources d'information que le médecin doit traiter pourraient inclure :

- La volonté du patient de suivre un régime.
- La conformité du patient aux instructions diététiques.
- La volonté du patient d'accepter des injections quotidiennes pour la perte de poids.
- La perte de poids réelle (issue de tout programme).
- Le changement réel de la glycémie.

Chacun de ces éléments constitue un flux d'information distinct. Nous pouvons modéliser cela en introduisant l'ensemble $\Ical_t$, l'ensemble des processus d'information au temps $t$ (l'ensemble peut changer lorsque nous changeons de stratégies, ouvrant de nouveaux flux d'information). Nous pouvons maintenant exprimer les différentes saveurs d'information en utilisant $W_{t+1,i}$, la réalisation de l'information provenant de la source $i\in\Ical_t$, de sorte que $W_{t+1} = (W_{t+1,i})\_{i\in\Ical_t}$.

Nous allons continuer à utiliser $W_{t+1}$ pour représenter la nouvelle information arrivant, mais le lecteur doit se rappeler que dans les applications réelles, cela inclura typiquement tout un ensemble de sources d'information, chacune avec ses propres comportements.

### Processus dépendants de l'état/de la décision

Il existe de nombreuses applications où l'information $W_{t+1}$ dépend de l'état actuel $S_t$ et/ou de la décision $x_t$. Voici quelques exemples :

- Un manque de stock peut décourager les clients, réduisant la demande.
- Acheter une grande quantité d'actions peut faire augmenter leurs prix.
- La décision de recommander des vaccins peut influencer la progression d'une maladie.
- Le nombre de générateurs électriques en ligne peut modifier les prix du réseau électrique.

Pour cette raison, il est utile de représenter l'information exogène comme une fonction $W_{t+1}(S_t,x_t)$, la fonction d'information exogène donnant l'information arrivant dans l'intervalle $(t,t+1)$.

Par exemple, imaginons que nous achetions ou vendions des actions en grande quantité, ce qui peut influencer le prix futur. La dynamique pourrait s'écrire

$$
\begin{align}
p_{t+1} = \theta^p_0 p_t + \theta^p_1 p_{t-1} + \theta^p_2 p_{t-2} + W_{t+1}(S_t,x_t). \label{eq:statedependentprice}
\end{align}
$$

L'état de ce processus de prix s'écrirait

$$
S_t = (p_t, p_{t-1}, p_{t-2}).
$$

Le changement aléatoire de prix, donné par $W_{t+1}(S_t,x_t)$, reflète notre croyance selon laquelle le changement de prix pourrait dépendre du prix actuel (si le prix est élevé, les changements futurs sont susceptibles d'être négatifs) ainsi que du montant que nous achetons ($x_t > 0$) ou vendons ($x_t < 0$).

Bien sûr, nous voudrions utiliser des données historiques pour essayer de séparer toute influence structurelle de $S_t$ et $x_t$ sur les prix futurs du véritable bruit exogène. Ainsi, nous pourrions proposer un modèle

$$
W_{t+1}(S_t,x_t) = \theta^x x_t + \varepsilon_{t+1},
$$

où nous pourrions supposer que

$$
\varepsilon_{t+1} \sim N(0, \vert x_t\vert  \sigma^2_t),
$$

Ce modèle suppose que $\varepsilon_{t+1}$ a une moyenne de 0, et une variance qui augmente avec la valeur absolue de $x_t$. L'information $W_{t+1}(S_t,x_t)$ aurait alors une moyenne $\theta^x x_t$ qui est positive si nous achetons des actions ($x_t > 0$), et négative si nous vendons sur le marché ($x_t < 0$).

Ce livre continuera d'utiliser $W_{t+1}$ comme notation par défaut, mais le lecteur doit être conscient qu'elle peut dépendre de l'état actuel et/ou de la décision prise étant donné l'état.

### Styles d'incertitude

Identifier les types d'information est la première étape pour comprendre l'incertitude. L'étape suivante consiste à caractériser les différents styles d'incertitude. Un résumé de certaines des façons les plus importantes dont les processus d'information peuvent se comporter comprend :

- Variabilité à grain fin – Celle-ci peut survenir à des échelles de temps de secondes (même des fractions de seconde), de minutes, d'heures, ou quotidiennement.
- Décalages – La variabilité à grain fin d'un processus représente généralement des variations autour d'une moyenne, mais il y a des moments où la moyenne va périodiquement se décaler vers un nouveau niveau. Cela peut refléter une nouvelle technologie, des ajustements des concurrents, ou des changements dans l'économie.
- Poussées et demandes intermittentes – La propagation d'une maladie peut créer une vague d'infections car les foyers épidémiques peuvent se propager localement. Un client peut découvrir un produit et le recommander à ses amis qui le disent ensuite à leurs amis.
- Pics – Une tempête de neige à venir peut créer un bond dans la demande de lait, d'œufs et de papier toilette ; une panne d'un générateur électrique peut créer un pic dans les prix de l'électricité.
- Événements spatiaux – La météo, les maladies et les changements de réglementation peuvent créer des changements aléatoires de nature régionale.
- Événements systémiques – Ce sont des événements qui peuvent affecter une entreprise entière (s'étendant au-delà des frontières internationales), un pays entier, ou même avoir un impact mondial. Cela peut survenir en raison d'une cyberattaque sur les communications, de changements dans la perception publique, et de publicité négative.
- Événements rares – Les événements rares peuvent provenir de plusieurs sources telles que les tremblements de terre, les épidémies de maladies, ou les attaques terroristes. Il s'agit généralement d'événements qui surviennent assez rarement, mais qui peuvent avoir un impact majeur sur une organisation lorsqu'ils se produisent.
- Éventualités – Cette catégorie fait référence à des événements qui pourraient survenir, mais pour lesquels il n'existe pas d'historique. Par exemple, les opérateurs de réseau électrique planifieront pour une panne des centrales nucléaires. Bien que cela ne se soit peut-être jamais produit dans un pays donné, l'opérateur de réseau peut néanmoins vouloir se préparer à l'éventualité si elle se produit.

Ces comportements peuvent avoir un impact sur le choix de la politique pour prendre des décisions, un sujet que nous traitons ensuite.

L'incertitude est largement reconnue comme un problème auquel les entreprises, les organisations et même les gouvernements doivent se préparer. Ce qui est souvent négligé est que la raison de modéliser l'incertitude est de comprendre comment elle affecte les décisions. L'incertitude est toujours associée à des processus d'information qui arrivent dans le futur, donc nous devons réfléchir à la façon dont une décision prise maintenant est affectée par cette information future.

## Conception des politiques

> *Une politique est une méthode pour prendre une décision … n'importe quelle méthode.*

Les politiques sont des fonctions qui utilisent l'information contenue dans la variable d'état pour prendre une décision. Cela semble être un problème bien défini ; après tout, la communauté de l'apprentissage automatique est entièrement construite autour du défi de trouver des fonctions qui correspondent à un ensemble de données d'entraînement. Cependant, la conception de politiques est bien plus riche, comme le montre la diversité des communautés qui travaillent dans ce domaine.

La Figure 1.2 montre les couvertures de livres représentant environ 15 domaines distincts qui traitent tous de décisions séquentielles sous incertitude. Ils utilisent huit systèmes de notation différents, et adoptent des approches fondamentalement différentes quant à la façon d'aborder la modélisation. Certains confondent les politiques (qui impliquent des problèmes d'optimisation intégrés) avec des fonctions objectif.

<figure class="book-figure">
  <img src="/assets/images/sdam/junglestochasticoptimization.png" alt="Un échantillon de livres majeurs représentant différents domaines de l'optimisation stochastique." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 1.2.</span> Un échantillon de livres majeurs représentant différents domaines de l'optimisation stochastique.</figcaption>
</figure>

### Métriques de performance des politiques

L'optimisation déterministe est caractérisée par une fonction objectif qui déterminre si une décision est meilleure qu'une autre. Avec les problèmes de décision séquentielle, nous aurons typiquement une fonction objectif qui évalue la performance d'une politique, comme nous l'avons fait avec les équations $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:objectivecumulativerewardaverage}$ et $\eqref{eq:objectivecumulativerewardsample}$.

En pratique, cependant, les politiques sont choisies en fonction de plusieurs critères concurrents :

- Qualité de la solution – Nous examinons typiquement la performance (par exemple, les coûts, les profits, les résultats de santé) sur une certaine période de temps, comme exprimé dans la version échantillonnée de l'objectif dans l'équation $\eqref{eq:objectivecumulativerewardsample}$. Comme celle-ci est aléatoire, nous devons considérer la performance moyenne et la performance dans le pire cas.
- Exigences de calcul – Dans les contextes opérationnels, les temps d'exécution comptent. Comme pour l'objectif, le temps nécessaire pour calculer une politique est aléatoire, donc nous devons considérer le temps d'exécution moyen et les temps d'exécution dans le pire cas.
- Transparence – La facilité avec laquelle on peut retracer une décision jusqu'aux données d'entrée, qui peuvent contenir des erreurs.
- Flexibilité/adaptabilité – Les problèmes du monde réel peuvent être compliqués, et nous devons souvent nous adapter à des situations complexes.
- Complexité méthodologique – Si une politique est mise en œuvre par un groupe d'analytique interne (par exemple), celui-ci devra considérer la probabilité qu'il puisse effectivement faire fonctionner une méthode.
- Exigences en matière de données – Différentes politiques ont différentes exigences en matière de données.

Les communautés d'optimisation mathématique illustrées dans la Figure 1.2 pourraient parler de politiques optimales, ce qui implique d'optimiser l'espérance dans l'équation $\eqref{eq:objectivecumulativereward}$. Cependant, il est important de prêter attention à toutes ces caractéristiques.

### Les quatre classes de politiques

Les livres de la Figure 1.2 présentent une variété de façons de prendre des décisions au fil du temps. Il s'avère qu'ils peuvent tous être divisés en classes de politiques bien définies. Il existe deux stratégies fondamentales pour créer des politiques, chacune pouvant ensuite être subdivisée en deux classes, créant ainsi quatre classes de politiques :

**Recherche de politique** – C'est le cas où l'on effectue une recherche parmi des méthodes (fonctions) pour prendre des décisions, en simulant leur performance (comme nous le faisons dans l'équation $\eqref{eq:objectivecumulativereward}$), afin de trouver la méthode qui fonctionne le mieux en moyenne au fil du temps. Cela peut impliquer une recherche parmi différentes classes de méthodes, ainsi que tout paramètre ajustable pour une méthode donnée. Cette idée ouvre la voie à deux classes de politiques :

- **1) Approximations de fonction de politique (PFA)** – Ce sont des fonctions analytiques d'un état qui spécifient directement une action. La politique de commande jusqu'à un niveau cible dans l'équation $\eqref{eq:introorderupto}$ en est un bon exemple, ainsi que notre politique consistant à utiliser une prévision ajustée dans l'équation $\eqref{eq:adjustedforecastpolicy}$.
- **2) Approximations de fonction de coût (CFA)** – Ce sont des politiques qui impliquent de résoudre un problème d'optimisation qui est typiquement une simplification du problème original, avec des paramètres introduits pour aider à faire fonctionner la politique mieux au fil du temps. C'est une idée particulièrement puissante qui est largement utilisée dans l'industrie. Nous avons plusieurs illustrations de CFA plus loin dans le livre (à commencer par le [Chapitre 4](/sdam/fr/chapter-4/), pour apprendre le meilleur médicament pour le diabète).

**Politiques d'anticipation** – Nous pouvons construire des politiques efficaces en optimisant à travers la contribution (ou le coût) d'une décision, plus une approximation des contributions (ou coûts) en aval résultant de la décision prise maintenant. Là encore, nous pouvons diviser celles-ci en deux classes supplémentaires de politiques :

- **3) Approximations de fonction de valeur (VFA)** – Imaginons que nous traversons un réseau représenté dans la Figure 1.3 où nous souhaitons trouver un chemin du nœud 1 au nœud 11. Maintenant, imaginons que nous sommes au nœud $S_t = i = 2$, où $t$ compte combien de liens nous avons traversés. Soit $V_{t+1}(S_{t+1})$ la valeur (en supposant que nous maximisons) du chemin du nœud $S_{t+1}$ (comme les nœuds 4 ou 5) au nœud 11 (ne vous inquiétez pas de la façon dont nous avons obtenu $V_{t+1}(S_{t+1})$). Soit une décision $x_t$ le lien que nous traversons hors du nœud $S_t = i$. La valeur d'être au nœud $S_t$ serait donnée par

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big). \label{eq:bellmangraph}
\end{align}
$$

  L'équation $\eqref{eq:bellmangraph}$ est connue sous le nom d'*équation de Bellman*. Lorsqu'elle est utilisée pour trouver le meilleur chemin dans un réseau déterministe tel que celui que nous avons représenté dans la Figure 1.3, elle est assez facile à visualiser.

<figure class="book-figure">
  <img src="/assets/images/sdam/bellmangraph.png" alt="Graphe déterministe simple pour se déplacer du nœud 1 au nœud 11." style="max-width: 320px;">
  <figcaption><span class="fig-num">Figure 1.3.</span> Graphe déterministe simple pour se déplacer du nœud 1 au nœud 11.</figcaption>
</figure>

  Il existe de nombreux problèmes où la transition de l'état $S_t$ vers $S_{t+1}$ implique une information aléatoire qui n'est pas connue au temps $t$. Nous avons vu un exemple simple d'aléa dans notre premier problème de stock, et un exemple plus compliqué dans notre second problème de stock.

  Pour ces problèmes plus généraux, si nous sommes dans un état $S_t$, prenons une décision $x_t$, puis observons une nouvelle information $W_{t+1}$ (qui n'est pas connue au temps $t$), cela nous amènera à un nouvel état $S_{t+1}$ selon notre fonction de transition

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

  Cela signifie qu'au temps $t$ lorsque nous devons choisir $x_t$, $W_{t+1}$ est une variable aléatoire, ce qui signifie que $S_{t+1}$ est également une variable aléatoire. Dans ce cas, nous devons insérer une espérance dans l'équation de Bellman et écrire l'équation $\eqref{eq:bellmangraph}$ comme

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \left\{V_{t+1}(S_{t+1})\vert S_t,x_t\right\}\big). \label{eq:bellmanstochastic}
\end{align}
$$

  Ici, nous avons inséré l'espérance $\E_{W_{t+1}}\lbrace \cdot\rbrace $ qui signifie littéralement faire la moyenne sur tous les résultats aléatoires de $W_{t+1}$.

  La version stochastique de l'équation de Bellman dans $\eqref{eq:bellmanstochastic}$ est extrêmement générale. L'état $S_t$ ne signifie pas simplement un nœud dans un graphe ; il capture toute (et chaque) information pertinente pour le problème. La difficulté est que nous ne pouvons plus calculer la fonction de valeur $V_t(S_t)$, ce qui signifie à son tour que nous n'aurons pas accès à $V_{t+1}(S_{t+1})$ que nous supposions connaître dans les équations $\eqref{eq:bellmangraph}$ et $\eqref{eq:bellmanstochastic}$.

  La stratégie que la communauté de recherche a utilisée en essayant d'appliquer l'équation de Bellman consiste à s'appuyer sur le domaine de l'apprentissage automatique pour estimer une approximation statistique que nous allons appeler $\Vbar_t(S_t)$. En supposant que nous puissions trouver une approximation raisonnable $\Vbar_{t+1}(S_{t+1})$, nous écririons notre politique (notre méthode pour prendre une décision) en utilisant

$$
\begin{align}
X^\pi(S_t) = \argmax_{x_t\in\Xcal_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \{\Vbar_{t+1}(S_{t+1})\vert S_t,x_t\}\big). \label{eq:introvbarpolicy}
\end{align}
$$

  La notation « $\argmax_x f(x)$ » signifie la valeur de $x$ qui maximise la fonction $f(x)$. L'indice $\pi$ porte l'information qui spécifie la structure de la fonction $f$, et tout paramètre ajustable $\theta$ dont nous aurions besoin dans l'approximation $\Vbar_{t+1}(S_{t+1})$.

  Cette classe de politique relève de rubriques telles que la programmation dynamique approximative et, le plus souvent, l'apprentissage par renforcement. Bien qu'il s'agisse d'une idée puissante, elle n'est pas facile à appliquer et dépend de notre capacité à créer une approximation précise $\Vbar_{t+1}(S_{t+1})$.

Il existe une littérature très riche sur les méthodes d'approximation des fonctions de valeur, mais ce n'est pas une panacée. Ce livre illustrera cette idée à quelques endroits, mais le lecteur est averti que cette classe de politiques est assez difficile à utiliser.

- **4) Approximations d'anticipation directe (DLAs)** – Il existe de nombreux problèmes pour lesquels nous ne pouvons simplement pas développer de politiques efficaces en utilisant l'une des trois premières classes, et lorsque cela se produit, nous devons nous tourner vers les approximations d'anticipation directe. Nous écrirons cela sous sa forme mathématique complète plus tard, mais pour l'instant, nous allons décrire les DLAs comme le fait de prendre une décision maintenant tout en optimisant sur un modèle (typiquement approximatif) qui s'étend sur un certain horizon de planification.

  Une DLA courante consiste à créer un modèle approximatif qui est déterministe. C'est ce que nous faisons lorsque nous utilisons un système de navigation qui trouve le plus court chemin vers la destination en supposant que nous connaissons le temps de trajet le long de chaque lien du réseau. En règle générale, résoudre un modèle stochastique exact du futur est presque toujours impossible, donc nous allons étudier différentes stratégies pour approximer le problème.

Nous avons illustré notre cadre de modélisation en utilisant deux problèmes de stock, et suggéré deux politiques simples (formes de PFAs) avec les équations $\eqref{eq:introorderupto}$ et $\eqref{eq:adjustedforecastpolicy}$, mais nous avons fait cela juste pour avoir un exemple concret de politique. Bien que les PFAs soient largement utilisées dans la prise de décision quotidienne, ce sont des exemples spécialisés.

En revanche, nous allons affirmer que les quatre classes de politiques que nous venons d'exposer (PFAs, CFAs, VFAs et DLAs) sont universelles, en ce sens qu'elles couvrent *toute* méthode que nous pourrions utiliser pour résoudre *tout* problème de décision séquentielle. Pour être clair, ce sont des méta-classes. C'est-à-dire que si nous pensons qu'un problème se prête à une classe particulière, nous n'avons pas terminé, car nous devons encore concevoir la politique spécifique au sein de cette classe. Néanmoins, nous estimons que ces quatre classes fournissent une feuille de route pour guider le processus de conception des politiques.

### Tester les politiques

Pour tester la valeur d'une politique, nous allons utiliser l'équation $\eqref{eq:objectivecumulativerewardsample}$ qui simule une politique sur une seule trajectoire échantillon du processus d'information $W_t$. La partie la plus difficile lors de la simulation d'une politique consiste généralement à créer le processus d'information exogène.

Soit $\omega$ une trajectoire échantillon, où $W_1(\omega), \ldots, W_T(\omega)$ représente une trajectoire échantillon particulière. Le Tableau 1.3 illustre 10 trajectoires échantillons de prix qui sont indexées de $\omega^1$ à $\omega^{10}$. Si nous choisissons $\omega^6$, alors $W_7(\omega^6) = 44.16$.

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
<p class="book-table-caption"><span class="fig-num">Tableau 1.3.</span> Illustration d'un ensemble de trajectoires échantillons de prix commençant toutes à 45,00 $.</p>
</div>

La question est la suivante : comment créons-nous un échantillon d'observations telles que celles représentées dans le Tableau 1.3 ? Il existe trois stratégies typiques :

- Créer des échantillons à partir de données historiques. Puisqu'il n'y a qu'un seul résultat à un moment donné, nous pouvons créer plusieurs trajectoires échantillons en combinant des observations provenant de différentes périodes de temps. Nous pourrions choisir des prix de différentes années, ou des demandes de différents mois, ou des temps de trajet observés lors de différents jours. Cette approche n'est pas possible lorsque l'information exogène dépend de l'état $S_t$ ou des décisions $x_t$.
- Simuler à partir d'un modèle mathématique. Cette approche offre l'avantage de pouvoir générer de grands échantillons pour obtenir des estimations statistiquement fiables de la performance d'une politique. Ces modèles peuvent être très sophistiqués, mais il est assez facile de créer des modèles (même sophistiqués) qui ne reproduisent pas le comportement des données réelles. Le plus grand défi consiste à capturer les corrélations, soit dans le temps, soit entre les échantillons (par exemple les demandes de différents produits, les prix de différentes actions, ou la vitesse du vent à différents endroits).
- Nous pouvons tester une idée sur le terrain, en utilisant les observations telles qu'elles se produisent réellement. L'avantage de cette approche est que nous travaillons avec des données réelles (l'histoire peut ne pas être identique au futur). L'inconvénient est qu'il faut une journée pour observer une journée de nouvelles données (et nous pourrions avoir besoin de bien plus qu'une seule journée d'observations).

Si $W_{t+1}$ dépend de l'état $S_t$ et/ou de la décision $x_t$, alors nous devons trouver une façon de refléter cette dépendance. Créer un modèle mathématique permet d'effectuer de nombreuses simulations sur ordinateur, mais créer des échantillons du processus d'information nécessite également de recréer les corrélations dans le temps, ainsi que dans l'espace. Nous renvoyons le lecteur à RLSO, Chapitre 10, pour une discussion plus approfondie de la modélisation de l'incertitude.

## Prochaines étapes

Les cinq prochains chapitres du livre vont appliquer notre cadre de modélisation à cinq problèmes différents :

- [Chapitre 2](/sdam/fr/chapter-2/) – Un problème de vente d'actif
- [Chapitre 3](/sdam/fr/chapter-3/) – Planification adaptative de marché
- [Chapitre 4](/sdam/fr/chapter-4/) – Apprendre le meilleur médicament pour le diabète
- [Chapitre 5](/sdam/fr/chapter-5/) – Problèmes de plus court chemin stochastique - Statique
- [Chapitre 6](/sdam/fr/chapter-6/) – Problèmes de plus court chemin stochastique - Dynamique

Chacun de ces chapitres suivra le même plan que celui que nous avons utilisé ci-dessus pour décrire les deux problèmes de stock. Ce plan comprend :

- Récit – Une description en anglais courant du problème.
- Le modèle universel – Ce modèle suivra notre format de description des cinq éléments d'un problème de décision séquentielle : variables d'état, variables de décision, variables d'information exogène, la fonction de transition et la fonction objectif.
- Modèle d'incertitude – Ici nous fournirons un modèle possible de toute incertitude dans le problème.
- Conception des politiques – Nous allons suggérer des politiques possibles pour prendre des décisions. Nous avons choisi nos problèmes de sorte que les cinq contextes d'application nous fassent parcourir les quatre classes de politiques. Pour l'instant, nous allons laisser le lecteur essayer de reconnaître laquelle des quatre classes nous choisissons.
- Extension – Enfin, nous pourrons suggérer une ou plusieurs extensions possibles de notre problème de base qui pourraient nécessiter de modifier la politique.

Nous revenons ensuite aux quatre classes de politiques dans le [Chapitre 7](/sdam/fr/chapter-7/) et discutons de notre cadre de modélisation général, en utilisant les problèmes des Chapitres 2 à 6 pour illustrer différentes idées de modélisation.

Après cette discussion, nous revenons à notre schéma de chapitres d'apprentissage par l'exemple, mais en utilisant des problèmes plus complexes. Nos chapitres restants couvrent les problèmes suivants :

- [Chapitre 8](/sdam/fr/chapter-8/) – Stockage d'énergie I
- [Chapitre 9](/sdam/fr/chapter-9/) – Stockage d'énergie II
- [Chapitre 10](/sdam/fr/chapter-10/) – Gestion de la chaîne d'approvisionnement I : Le newsvendor à deux agents
- [Chapitre 11](/sdam/fr/chapter-11/) – Gestion de la chaîne d'approvisionnement II : Le jeu de la bière
- [Chapitre 12](/sdam/fr/chapter-12/) – Optimisation des clics publicitaires
- [Chapitre 13](/sdam/fr/chapter-13/) – Problème de gestion du sang
- [Chapitre 14](/sdam/fr/chapter-14/) – Optimisation des essais cliniques

## Qu'avons-nous appris ?

- Pour commencer, nous avons appris ce qu'est une décision !
- Nous avons présenté un modèle général, appelé le cadre de modélisation universel, pour tout problème de décision séquentielle.
- Nous avons illustré le modèle en utilisant d'abord un problème de stock classique, où l'état du système est la quantité en stock.
- Nous sommes ensuite passés à un problème de stock légèrement plus compliqué où la variable d'état inclut l'état de ressource $R_t$ du stock, une variable d'état informationnelle sous la forme du prix $p_t$, et enfin un état de croyance sur la demande à venir $\Dhat_{t+1}$ sous la forme d'une moyenne et d'une variance estimées.
- Nous avons appris comment modéliser le flux d'information exogène qui peut provenir de plusieurs sources différentes. L'information exogène est représentée comme une fonction qui peut dépendre de l'état et/ou de la décision.
- Nous avons illustré deux formes d'une classe simple de politique connue sous le nom d'approximation de fonction de politique (ou PFA).
- Nous avons appris que les politiques peuvent être évaluées de plusieurs manières différentes qui dépendent du contexte et de la façon dont les décisions sont utilisées.
- Nous avons conclu avec un bref aperçu des quatre classes de politiques. Des illustrations des quatre classes seront fournies dans les Chapitres 2 à 6, moment auquel nous nous arrêtons dans le [Chapitre 7](/sdam/fr/chapter-7/) pour discuter des politiques plus en profondeur, préparant le terrain pour les problèmes plus complexes des Chapitres 8 à 14.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quels sont les cinq éléments du modèle mathématique d'un problème de décision séquentielle ?</li>
<li>Quelle est la différence entre les variables de l'état initial $S_0$ et celles de l'état dynamique $S_t$ pour $t > 0$ ?</li>
<li>Quelle est la différence entre une décision et l'information exogène ?</li>
<li>Quelles sont les deux grandes catégories de politiques, et en quoi diffèrent-elles ?</li>
<li>Comparez les variables d'état du problème de stock simple à celles du problème de stock plus compliqué.</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Comparez les politiques des deux problèmes de stock en termes de la façon dont elles gèreraient un comportement dépendant du temps. Par exemple, notre pizzeria peut avoir une demande beaucoup plus élevée les week-ends que les jours de semaine. Commentez la valeur de rendre le paramètre ajustable $\theta$ dépendant du temps (ou dépendant du jour de la semaine) en termes de la façon dont cela pourrait améliorer la solution.</li>
<li>Comparez la façon dont vous pourriez procéder pour ajuster le paramètre $\theta$ pour les problèmes de stock :
  <ol type="a">
    <li>Dans un simulateur.</li>
    <li>Sur le terrain.</li>
  </ol>
  Discutez des avantages et des inconvénients de chaque approche.</li>
</ol>
{% endraw %}