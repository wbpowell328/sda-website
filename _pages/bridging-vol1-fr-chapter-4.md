---
layout: book
title: "Chapitre 4 : Décisions"
permalink: /bridging-vol1/fr/chapter-4/
date: 2026-07-17
book_home: /bridging-vol1/fr/contents/
book_data: bridging_vol1_toc_fr
lang: fr
translated_from: en
translated_from_hash: b9d7338fb39168d1
---


{% raw %}
<p class="book-byline"><em>Établir des ponts entre les problèmes de décision, Volume I — Cadrer le problème</em> &middot; Warren B. Powell</p>

Ce livre tout entier repose sur l'affirmation suivante :

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="If you want to run a better {anything} you have to make better decisions.">
</figure>

Il va sans dire qu'avant de pouvoir aborder le problème consistant à identifier les meilleures décisions, il faut savoir quelles décisions on prend.

Rappelez-vous du Chapitre 1 qu'il existe deux types de « problèmes » : ceux centrés sur les métriques et ceux centrés sur les décisions. Voici des exemples de chacun :

- **Problèmes centrés sur les métriques :**
  - Gestion de la chaîne d'approvisionnement – Minimiser les stocks, maximiser la marge opérationnelle.
  - Réseau électrique – Minimiser les coûts de production d'énergie.
  - Santé publique – Minimiser les décès.
  - Gestion d'une flotte de camions – Maximiser le revenu net d'exploitation par chauffeur et par semaine.
  - Gestion d'un hôtel - Maximiser le profit d'exploitation.
  - Diriger une campagne présidentielle - Gagner l'élection.
- **Problèmes centrés sur les décisions :**
  - Gestion de la chaîne d'approvisionnement – Combien commander, quel fournisseur utiliser.
  - Gestion de la demande – Comment fixer le prix d'un produit, quels canaux marketing utiliser.
  - Réseau électrique – Quels générateurs programmer pour fonctionner, quelles turbines à gaz utiliser.
  - Gestion du diabète – Quel médicament utiliser pour contrôler la glycémie, à quel dosage.
  - Gestion de trésorerie d'un fonds commun de placement – Combien de liquidités conserver pour faire face aux rachats, dans quelles actions investir.

Si nous partons d'une métrique, notre défi est d'identifier les décisions qui nous aideront à améliorer cette métrique. Si nous partons des décisions, le problème consiste alors à concevoir la métrique. Cependant, même lorsque nous pensons connaître les décisions, nous devons nous assurer que nous n'en avons oublié aucune.

Il existe une abondante littérature mathématique sur le thème de l'optimisation des décisions, mais même ces ouvrages ne proposent pas de définition standard de ce qu'est une décision. Au lieu de cela, les livres introduisent une notation telle que le vecteur de décision « $x$ », ou la commande « $u$ », ou l'action « $a$ », après quoi ils donnent des exemples en espérant que le lecteur « comprenne ». Si cela fonctionne pour des problèmes simples, cela crée une barrière entre le modèle mathématique et les applications réelles.

Pour des applications complexes telles que la gestion des chaînes d'approvisionnement ou la résolution de problèmes de santé publique, identifier les décisions est bien plus difficile qu'identifier les métriques. Ceci ne vise pas à minimiser l'identification des métriques, mais le concept de métrique est bien compris tant par les experts du domaine que par les modélisateurs. Lorsqu'on leur demande quelles décisions sont en jeu, les dirigeants d'entreprise, les professionnels de la santé, les ingénieurs et les scientifiques restent souvent perplexes. Bien que le mot « décision » soit familier à tous, il ne semble pas être un terme qu'ils utilisent dans la résolution quotidienne de problèmes, alors que tout le monde comprend les « métriques » sous une forme ou une autre.

## Les décisions et la langue française

Il semble qu'un bon point de départ pour un chapitre consacré aux « décisions » serait d'en proposer une définition. Il est utile de noter que les définitions standard, telles que celles de Webster, incluent la variété habituelle de sens qu'un mot peut avoir dans l'usage courant de la langue anglaise. Par exemple, remporter un match de baseball est désigné par le terme « decision ». Dans ce livre, nous n'utilisons « décision » que pour désigner les situations où nous disposons d'un ensemble de choix, et où nous devons faire le meilleur choix, ce qui implique bien sûr l'identification de métriques de performance.

Nous commençons par noter que les décisions sont toujours une forme d'information. Il est utile de répartir toute l'information en trois grandes classes :

1. L'information que nous connaissons déjà à un instant donné. Nous appelons cette information l'état de notre système (plus précisément, l'état de connaissance).
2. L'information que nous contrôlons et qui modifie l'état.
3. La nouvelle information qui arrive et que nous ne contrôlons pas (bien que nous puissions l'influencer).

L'information des classes (2) et (3) produit une variable d'état mise à jour (classe 1). Nous sommes maintenant prêts à définir une décision :

**Définition (formelle) :** Une **décision** est une classe d'information contrôlable de manière endogène.

Ainsi, les décisions (contenues dans les « variables de décision ») représentent une information que nous créons en désignant un choix parmi un ensemble.

Notre définition formelle nécessite beaucoup d'appareillage pour ce qui devrait être un concept très simple, aussi proposons-nous une seconde définition :

**Définition (informelle) :** Une **décision** est quelque chose que nous contrôlons.

Cette définition évite l'expression « classe d'information » en utilisant « quelque chose », mais elle rend l'idée compréhensible.

Nos deux définitions soulèvent la question de savoir qui prend la décision, question indissociable du concept même de décision. Les modèles mathématiques classiques évitent cette question, mais elle est centrale dans la modélisation de la plupart des systèmes réels.

Étant donné l'importance des décisions dans les activités humaines, il n'est pas surprenant qu'il existe en anglais un certain nombre de termes qui traduisent le concept de choix. Le Tableau 4.1 dresse la liste de plusieurs mots qui impliquent de faire un choix dans un cadre général. Sous la colonne « Collecte d'information » figurent des termes qui apparaissent lorsqu'il s'agit de décider quelle expérience mener, qui écouter, quoi observer (et ainsi de suite). La colonne intitulée « Agir sur les ressources » énumère divers termes qui apparaissent dans le contexte de la gestion des ressources (comme les personnes). Par exemple, « promouvoir » implique la décision de promouvoir ou non quelqu'un (et à quel niveau).

Ce tableau ne prétend pas être une liste exhaustive des mots qui impliquent un choix, mais il donne un aperçu de la diversité des façons dont les « décisions » se manifestent dans la langue anglaise.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 4.1.</span> La langue anglaise offre une variété de mots qui signifient tous la liberté de choisir.</caption>
<thead>
<tr><th>Termes généraux</th><th>Collecte d'information</th><th>Décisions d'identification</th><th>Agir sur les ressources</th></tr>
</thead>
<tbody>
<tr><td>Action</td><td>Expérience (laquelle ?)</td><td>Identifier</td><td>Promouvoir (qui, de combien)</td></tr>
<tr><td>Choix</td><td>Écouter (quoi ?)</td><td>Classer</td><td>Acquérir (lequel, combien)</td></tr>
<tr><td>Contrôle</td><td>Observer</td><td>Trouver</td><td>Vendre (à qui, combien)</td></tr>
<tr><td>Décision</td><td>Tester (lequel)</td><td>Conclure</td><td>Récompenser (combien)</td></tr>
<tr><td>Concevoir</td><td>Regarder/scanner</td><td>Étiqueter</td><td>Critiquer (qui, comment)</td></tr>
<tr><td>Intervention (médicale)</td><td></td><td></td><td>Déplacer (vers où)</td></tr>
<tr><td>Option</td><td></td><td></td><td>Échanger (lequel, avec qui)</td></tr>
<tr><td>Déplacement (où)</td><td></td><td></td><td>Traitement (lequel)</td></tr>
<tr><td>Réponse (laquelle)</td><td></td><td></td><td>Accepter/refuser</td></tr>
<tr><td>Tâche</td><td></td><td></td><td>Recommander</td></tr>
<tr><td>Transaction (finance)</td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>

## Identifier les décisions

Comprendre les différents mots qui impliquent (ou nécessitent) de faire un choix est important lorsqu'il s'agit d'identifier les décisions disponibles. Il est important de reconnaître que les décisions ne se présentent pas avec des étiquettes voyantes. La société Campbell's Soup Co. a pris conscience du défi consistant à faire prendre conscience aux consommateurs qu'ils prenaient des décisions, dans une célèbre série de publicités des années 1970 intitulée « *I could have had a V8!* ». Leur service marketing avait compris que les gens prenaient souvent une canette de soda sans réaliser qu'ils auraient pu choisir un V8 à la place. Ces publicités ont contribué à faire comprendre aux consommateurs que boire un soda était une décision.

Dans presque tous les contextes de problèmes, les gens ont tendance à résoudre les problèmes d'une certaine manière, sans réaliser qu'ils ont des choix à faire. On pourrait dire que c'est ainsi que nous traversons la journée, car évaluer les choix pour identifier le meilleur prend du temps. Le défi auquel nous sommes confrontés est d'abord de prendre conscience du moment où nous prenons une décision, puis d'identifier les décisions qui ont le plus grand impact sur la performance.

Ce comportement consistant à prendre des décisions de manière passive est absolument omniprésent, mais cela crée une opportunité. Imaginez que vous vous trouviez dans n'importe quel contexte de problème (comme ceux illustrés à gauche dans la figure 4.1). Supposons maintenant que vous souhaitiez améliorer la performance, qu'il s'agisse de rentabilité, de productivité, de meilleurs résultats de santé, de meilleurs médicaments, ou d'amélioration de l'agriculture. Rappelez-vous alors notre phrase de base :

> *Si vous voulez mieux gérer {n'importe quoi}, vous devez prendre de meilleures décisions.*

Pour prendre une meilleure décision, vous devez reconnaître le moment où vous prenez une décision. Un bon exercice consiste à créer votre « livre des décisions », puis à prendre mentalement note à chaque fois que vous reconnaissez qu'une décision est en train d'être prise (c'est-à-dire qu'il existait un choix, et que différents choix auraient pu être faits).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/IdentifyingDecisions.jpg" alt="A challenge is to work in any of a variety of problem settings and identify the decisions that are being made." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 4.1.</span> Un défi consiste à travailler dans l'un ou l'autre d'une variété de contextes de problèmes (comme ceux à droite) et à identifier les décisions qui y sont prises.</figcaption>
</figure>

## Types de décisions

Notre approche du cadrage exige d'être capable d'identifier toutes les décisions, et pas seulement celles qui peuvent être traitées par une méthodologie particulière. Pour guider ce processus, nous listons ci-dessous 10 types de décisions qui, à notre connaissance, couvrent toute forme d'information que nous contrôlons.

1. **Décisions physiques et financières** – Ces décisions apparaissent dans la gestion des ressources physiques et financières, couvrant les personnes, les équipements, les installations, les produits, les matières premières, l'eau, l'énergie, ainsi que les liquidités, les investissements, les prêts, … Les décisions incluent l'achat, la vente, le déplacement et la modification des ressources. Cette classe relève du domaine de la recherche opérationnelle, du contrôle en ingénierie et de la finance, et s'appuie largement sur des outils tels que la programmation linéaire, entière et non linéaire.
2. **Choix discrets à résultats incertains** – Il s'agit d'un terme général destiné à couvrir des activités pouvant impliquer des projets complexes tels que le lancement d'un nouveau produit, la soumission d'un médicament à des essais cliniques, ou l'acquisition d'une entreprise. Parfois appelées « projets », ces décisions peuvent impliquer une série de changements dans les métriques de performance, les ressources, les finances et la dynamique du système. Des cas particuliers peuvent être des problèmes plus simples, comme fixer un prix ou choisir qui embaucher pour un poste de direction. Ces problèmes sont populaires dans la littérature sur l'analyse décisionnelle, et impliquent généralement des ensembles d'actions relativement restreints, mais difficiles à évaluer.
3. **Décisions d'acquisition/observation d'information** – Elles comprennent les décisions d'acquérir ou d'observer de l'information en menant des expériences en laboratoire, sur le terrain, ou par simulation informatique. Il est utile de distinguer deux contextes dans lesquels nous pouvons acquérir de l'information :
   - Apprentissage hors ligne - Ce sont des activités menées dans un environnement de test. L'acquisition d'information hors ligne peut inclure des efforts de recherche, des recherches sur internet, ou l'embauche d'experts du domaine.
   - Apprentissage en ligne - Cela couvre les décisions consistant à exécuter et observer des processus sur le terrain en utilisant une approche « d'apprentissage par la pratique », qui consiste à observer un processus au fur et à mesure de son évolution, comme la façon dont un marché réagit à la publicité ou à la tarification, ou la façon dont un patient réagit à un traitement.

Les deux styles d'acquisition d'information impliquent de prendre des décisions spécifiquement pour acquérir de l'information. L'acquisition d'information a été étudiée sous des noms tels que la conception d'expériences (statique ou séquentielle), la recherche stochastique, l'apprentissage actif (ou optimal), les bandits manchots (multiarmed bandits) et l'optimisation bayésienne.
4. **Décisions de communication/partage d'information** – Celles-ci se présentent sous deux formes :
   - La messagerie – Cela reflète ce que nous disons en texte, vidéo et/ou audio. Un exemple moderne de messagerie inclut l'optimisation des prompts.
   - Canaux et timing – Cela reflète le choix du canal (texte/emails, publication (imprimée ou en ligne), réseaux sociaux, ou canaux publicitaires) ainsi que le moment et la fréquence.
5. **Métriques de performance et objectifs** - Ceux-ci représentent le choix crucial de quantifier ce que nous cherchons à atteindre, comme maximiser les revenus, minimiser les coûts, maximiser la résistance d'un matériau ou la performance d'un médicament, ou minimiser les kilomètres à vide. Ceux-ci peuvent être incorporés dans la fonction objectif ou représentés sous forme de contraintes.
6. **Choix des fonctions** – Souvent négligées en tant que décision, les fonctions peuvent être des méthodes pour prendre des décisions (politiques), la formulation de modèles d'optimisation, le choix des métriques de performance, des méthodes de prévision ou d'estimation, ou des fonctions de transition (comme la manière dont une maladie se propage). Cette catégorie couvre le choix de la fonction, c'est-à-dire sa structure.
7. **Réglage des paramètres** – Les fonctions sont typiquement caractérisées par un ou plusieurs paramètres (généralement continus, mais pas toujours) qui peuvent être ajustés pour améliorer la précision prédictive (lors de l'ajustement de modèles statistiques) ou optimisés pour améliorer la performance (lors du réglage d'une politique de prise de décision). Les paramètres peuvent être associés à une fonction ; ils peuvent être le poids attribué à une métrique de performance, ou ils peuvent être une cible (ou une limite) pour une métrique de performance.
8. **Estimation ou identification** – On peut nous donner la photo d'une personne et nous demander de l'identifier, avec pour objectif de maximiser le nombre de fois où nous identifions correctement la personne. Un grand modèle de langage reçoit un ensemble de mots (en réalité des tokens), et il essaie d'identifier le mot (ou token) le plus probable qui vient ensuite.
9. **Caractéristiques et comportements** - Nous pourrions choisir les caractéristiques d'un nouveau logiciel, la conception d'un nouveau produit, ou la manière dont nous (en tant qu'individu, organisation ou instance politique) choisissons de nous comporter.
10. **Décider quoi décider** - Dans la plupart des applications réelles, le nombre de décisions potentielles (c'est-à-dire partout où nous sommes confrontés à un choix) peut être assez élevé. Nous devons prioriser les décisions qui ont la plus grande valeur économique afin de justifier la réalisation d'une analyse formelle.

## Les différents types de variables de décision

Les décisions se présentent sous différents styles, mais les variables de décision peuvent généralement être classées dans une (ou plusieurs) des catégories suivantes :

- **Binaire** – Ici, nous n'avons que deux choix, qui peuvent être :
  - Effectuer une action ou non.
  - Conserver ou vendre un actif.
  - Les tests A/B pour la conception d'une page web, où nous devons choisir entre une conception actuelle et une conception nouvelle ou modifiée.
  - Continuer à tester un médicament ou un traitement dans un essai clinique, ou terminer l'essai.
- **Ensemble discret de choix ou d'actions** – C'est de loin la forme la plus courante de problème de décision, et elle survient lorsque nous avons un ensemble de choix ou d'actions discrets, tels que :
  - Choisir un fournisseur pour une pièce.
  - Choisir un médicament ou un traitement médical.
  - Choisir un canal de marketing.
  - Choisir un emplacement pour une installation.
- **Scalaire continu** – Les exemples incluent :
  - Fixer le prix d'un produit.
  - Choisir le dosage d'un médicament.
  - Décider combien dépenser en publicité sur un marché pour une campagne présidentielle.
  - Choisir combien de liquidités conserver pour un fonds commun de placement.
- **Vecteurs discrets** – Il existe de nombreux problèmes qui impliquent la gestion de ressources discrètes telles que les personnes, les machines et les tâches. Lorsque nous avons un seul ensemble de choix discrets, comme où acheter un produit, il est facile d'énumérer tous les choix. Mais lorsque nous devons décider comment planifier, par exemple, 100 machines pour traiter des centaines de tâches, nous avons besoin d'algorithmes spécialisés.
- **Vecteurs continus** – Il existe des problèmes avec un petit nombre de décisions continues, comme le contrôle d'une voiture, d'un avion ou d'une fusée. Il existe aussi des problèmes avec un grand nombre de paramètres continus, comme l'allocation de fonds entre de nombreuses classes d'actifs, ou l'allocation d'un grand nombre de kits de naloxone à une centaine de comtés d'un État. Il existe de puissants algorithmes de recherche pour résoudre ces problèmes.

## Comment les décisions impactent le système

Il n'est pas pertinent de parler des « décisions » comme d'un concept abstrait. Nous reconnaissons d'abord qu'une décision modifie le système d'une manière ou d'une autre, mais comment ?

Il existe trois façons dont une décision peut impacter un système :

- **Ressources physiques** – C'est le cas où nous achetons, vendons ou modifions de quelque manière que ce soit quelque chose de physique, qu'il s'agisse de personnes, d'équipements, d'installations, de nourriture, d'eau ou d'énergie.
- **Financier** – Cela peut être des liquidités, des investissements et des prêts ; des contrats d'assurance et des couvertures de change ; et des prix.
- **Informationnel** – C'est une catégorie qui pourrait inclure une décision d'effectuer une expérience dans un laboratoire, une simulation informatique, ou un test sur le terrain qui est utilisé pour mettre à jour des estimations ou des croyances ; cela pourrait impliquer la fixation d'objectifs de performance, la conception de métriques, ou la spécification des termes d'un contrat de vente.

Il existe un certain chevauchement entre les catégories, comme la distinction entre les couvertures de change et les termes d'un contrat de vente. Ce qui importe, c'est l'étendue des façons dont nous pouvons affecter la manière dont un système évolue dans le temps.

Au fur et à mesure que nous progressons dans notre cadre de modélisation, nous devrons comprendre les points suivants concernant toute décision :

- Comment la décision affecte-t-elle nos métriques de performance maintenant ?
- Quel effet une décision maintenant aura-t-elle sur l'état du système avant de prendre la prochaine décision ?
- La décision aura-t-elle un impact sur les nouvelles informations qui arrivent après que la décision a été prise ?

Dans le Volume II, nous décrivons ces points à l'aide de la notation mathématique.

## Le moment des décisions

L'un des attributs les plus importants mais les plus difficiles des décisions concerne le temps, plus précisément :

- **La fréquence à laquelle les décisions sont prises** – Nous pouvons diviser les décisions en deux grandes classes :
  - Les décisions de conception, qui sont prises une seule fois (initialement) sur l'horizon de planification. En pratique, même les décisions de conception évoluent dans le temps, mais il est courant d'avoir des décisions qui ne sont prises qu'une seule fois dans ce qui est considéré comme un horizon de planification raisonnable.
  - Les décisions de contrôle – Ce sont des décisions qui sont prises de manière répétée dans le temps, mais il existe des systèmes complexes où une variété de décisions sont prises à différents intervalles de temps. Par exemple, les opérateurs de réseau électrique planifient l'ordonnancement des générateurs à vapeur une fois par jour ; les turbines à gaz sont planifiées à l'heure ; des ajustements de la vitesse de certains générateurs sont effectués toutes les 5 minutes ; et des signaux pour ajuster les niveaux de tension sont envoyés toutes les 2 secondes.
- **Délais** – Lorsqu'une décision est prise, il y a souvent un délai avant qu'elle n'impacte le système. Par exemple :
  - Commander du stock peut nécessiter des semaines ou des mois avant d'arriver.
  - Administrer un médicament peut prendre des minutes, des heures ou des jours avant d'affecter un patient.
  - Les opérateurs de réseau électrique planifient les horaires de fonctionnement des centrales à vapeur la veille, tandis que les décisions de mettre en marche des turbines à gaz nécessitent un préavis de 30 minutes.
  - Les changements de prix peuvent ne pas se refléter dans les ventes avant des jours ou des semaines, et peuvent affecter les marchés pendant des mois.
- **Planification anticipée des décisions différées** – En plus des dimensions du moment où une décision est prise et du moment où elle impacte le système, nous devons réfléchir au moment où nous planifions dans le futur. Par exemple :
  - Un fabricant peut faire face à des délais de livraison de huit mois lors de commandes en provenance d'Asie, mais peut obtenir des délais beaucoup plus rapides pour de plus petites quantités (à un coût plus élevé) en cas de pénurie. En réfléchissant à la quantité de stock à conserver, le fabricant devrait conserver des stocks beaucoup plus importants sans l'option de commander auprès du fournisseur plus coûteux mais plus proche. Cependant, lorsque cette option est disponible, le fabricant peut envisager l'option d'utiliser le fournisseur plus proche en cas de hausse soudaine de la demande.
  - Les compagnies aériennes doivent souvent planifier les achats d'avions jusqu'à 10 ans à l'avance, mais peuvent négocier des livraisons plus rapides à un coût plus élevé. Cela permet à la compagnie aérienne d'envisager cette option si les volumes de passagers augmentent plus rapidement que prévu. Ou elle peut annuler des contrats à un coût selon la durée pendant laquelle elle attend pour exercer cette option.

## Qui prend les décisions

Il existe de nombreux contextes où il y a plus d'un décideur (ou agent). Des exemples de contextes multi-agents incluent :

- Deux décideurs égaux (souvent appelés joueurs) comme cela peut se produire dans des négociations entre un fabricant et un fournisseur ou un client, ou dans des interactions entre un médecin et un patient.
- Deux décideurs où l'un occupe une position de contrôle. Par exemple, un « agent de terrain » peut demander des ressources à un « agent central » qui a le contrôle sur la quantité de la demande à satisfaire.
- Plusieurs agents, comme cela peut survenir lorsque quelques entreprises sont en concurrence les unes avec les autres (des exemples surviennent dans les industries qui vendent des voitures ou des produits chimiques industriels), ou lorsqu'il existe plusieurs unités organisationnelles au même niveau dans une entreprise.
- Plusieurs agents, comme cela survient dans une chaîne d'approvisionnement avec différents fabricants fournissant des composants pour fabriquer une pièce telle qu'un moteur ou une voiture entière.
- Un seul agent apprenant sur un environnement inconnu, ce qui est la manière dont nous pourrions modéliser tout problème impliquant de l'incertitude. L'environnement inconnu pourrait être la météo, la présence d'une maladie dans une population, ou un marché achetant un produit.

Nous reviendrons sur les problèmes multi-agents plus tard dans la série, où nous montrerons comment étendre la notation (présentée dans le Volume II) pour gérer plusieurs décideurs. Pour l'instant, nous allons nous concentrer sur un seul décideur, qui peut être l'un de deux décideurs ou plus.

Nous avons plusieurs raisons d'éviter l'identification explicite des décideurs à ce stade :

- L'organisation des décisions peut varier, même au sein de la même industrie (comme le transport routier ou la gestion de la chaîne d'approvisionnement) ou du même domaine de problème (comme la santé publique).
- Si votre objectif est de développer un modèle informatique, vous pourriez chercher à changer la manière dont les décisions sont organisées. Un modélisateur peut souhaiter traiter un ensemble de décisions comme si elles étaient prises par un seul agent, soit par simplification, soit parce que cela peut produire de meilleurs résultats.
- L'objectif de lister différents types de décisions n'est pas de les aborder tous dans un seul projet de modélisation. Il est plutôt nécessaire d'identifier les objectifs d'un modèle, puis de choisir les décisions qui sont pertinentes pour les objectifs du projet.
- Nous recommandons au lecteur d'aborder ces projets du point de vue d'un seul décideur, ce qui ne doit pas nécessairement correspondre à la manière dont les décisions sont réellement prises au sein d'une organisation. Ceci sera étayé par la présentation initiale du cadre de modélisation universel dans le Volume II.

Pour l'instant, face à un contexte multi-agent, nous recommandons de traiter chaque agent séparément afin d'identifier ses propres métriques et décisions. Les incertitudes affectent souvent l'environnement au sens large, bien que chaque agent puisse avoir des incertitudes qui sont pertinentes pour ses propres décisions et métriques de performance.

## Prendre des décisions avec des ordinateurs

Les ordinateurs ont une façon très simple de prendre des décisions. Cela commence par connaître les types de décisions et l'ensemble des décisions possibles (réalisables). Puis on utilise une méthode prédéfinie pour « prendre » la décision, c'est-à-dire un choix particulier parmi l'ensemble des décisions réalisables (ou admissibles).

Nous commençons par introduire la manière dont nous désignons ces méthodes de prise de décision :

**Définition :** Une **politique** est une méthode de choix d'une décision admissible en utilisant l'information disponible au moment où la décision est prise.

Il existe deux grandes stratégies pour concevoir des politiques, chacune pouvant être divisée en deux classes, ce qui crée quatre classes de politiques qui incluent *toute* méthode de prise de décision. Ce sont :

**La recherche de politique** - Cette stratégie crée des fonctions qui doivent être ajustées pour bien fonctionner dans le temps. Elles prennent des décisions sans planifier directement dans le futur. Elles peuvent être divisées en deux classes :

1. Les approximations de fonction de politique, ou PFA.
2. Les approximations de fonction de coût, ou CFA.

**Les politiques d'anticipation** - Cette stratégie tente de prendre la meilleure décision maintenant en optimisant à la fois la performance de la décision actuelle et une approximation de l'impact de cette décision sur le futur. Ces politiques peuvent également être divisées en deux classes :

<ol start="3">
<li>Les politiques basées sur des approximations de fonction de valeur, ou VFA.</li>
<li>Les approximations d'anticipation directe, ou DLA.</li>
</ol>

Chacune de ces politiques est décrite ci-dessous.

### Les approximations de fonction de politique (PFA)

Les approximations de fonction de politique (PFA) représentent toute fonction analytique qui, à partir d'entrées correspondant à ce que nous savons, produit en sortie l'action que nous devrions entreprendre. Voici quelques exemples :

- Les politiques de commande de stock passent souvent une commande lorsque le stock tombe en dessous d'un niveau « s », auquel cas elles passent une commande pour ramener le stock à « S ». « s » et « S » sont des paramètres qui doivent être ajustés.
- Un médecin peut prescrire des injections d'insuline lorsque le taux d'A1c d'un patient (qui reflète une moyenne glissante de la glycémie sur 3 à 5 mois) dépasse 6,5, et cesse lorsqu'il tombe en dessous de 6,0. Là encore, ces valeurs doivent être ajustées pour trouver celles qui fonctionnent le mieux.

Les PFA peuvent être n'importe quelle fonction analytique, linéaire ou non linéaire. Ce qu'une PFA ne peut pas inclure, contrairement à chacune des trois autres classes de politiques restantes, c'est un problème d'optimisation intégré. Les PFA peuvent être des règles simples, mais elles peuvent aussi être des fonctions non linéaires de très grande dimension, comme un réseau de neurones.

### Les approximations de fonction de coût (CFA)

Il existe de nombreux problèmes où la meilleure approche pour prendre des décisions consiste à utiliser une approximation déterministe à un instant donné, modifiée à l'aide de divers paramètres qui, une fois correctement ajustés, produisent des décisions qui fonctionnent bien dans le temps. C'est une approche largement utilisée en pratique, bien que souvent sans reconnaître a) la possibilité d'introduire des paramètres pour aider à améliorer les décisions et/ou b) le fait que ces paramètres peuvent être ajustés pour produire de meilleurs résultats.

L'exemple le plus simple de cette approche est illustré à la figure 4.2, où nous devons choisir quel produit promouvoir sur les réseaux sociaux (nous pourrions substituer n'importe quel problème à choix discrets répertorié dans la [section sur les essais-erreurs intelligents](/bridging-vol1/fr/chapter-2/#intelligenttrialanderror) du Chapitre 2). Nous disposons d'une estimation ponctuelle de la valeur de chaque produit basée sur l'expérience passée, dont nous avons appris qu'elle peut comporter beaucoup de bruit, entraînant certaines estimations médiocres. Nous pouvons également utiliser l'expérience passée pour estimer un écart-type, qui mesure l'étendue de l'incertitude. En général, nous sommes sûrs à 95 pour cent que la vérité se situe dans une fourchette de plus ou moins 2 écarts-types.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoiceMeanStdDev.jpg" alt="Face à un ensemble discret de choix, l'incertitude concernant la performance de chacun peut être décrite par sa valeur moyenne et son écart-type.">
  <figcaption><span class="fig-num">Figure 4.2.</span> Face à un ensemble discret de choix, l'incertitude concernant la performance de chacun peut être décrite par sa valeur moyenne, et l'écart-type qui capture l'étendue de la croyance.</figcaption>
</figure>

Ce que nous allons faire, c'est créer un « indice » pour chaque produit $x$ donné par :

$$
Index_x = \text{Avg.value}_x + \theta \,(\text{std.dev}_x)
$$

Nous allons ensuite choisir de promouvoir le produit $x$ qui présente la valeur la plus élevée de « $Index_x$ ». Nous trouvons le produit $x$ en résolvant le problème d'optimisation suivant (qui est déterministe) :

$$
\max_x \{\text{Avg.value}_x + \theta \,(\text{std.dev}_x)\}
$$

Résoudre ce problème d'optimisation est assez simple – il suffit de trier les valeurs $\text{Avg.value}_x + \theta (\text{std.dev}_x)$ et de trouver le produit $x$ qui présente la valeur la plus élevée (et vous pensiez que l'optimisation déterministe devait être difficile !).

Le défi consiste alors à choisir le paramètre ajustable $\theta$. Si nous utilisons $\theta = 0$, cela signifie que nous utilisons simplement notre estimation actuelle. Le problème est que si notre estimation « $\text{Avg.value}_x$ » est faible en raison d'une série de malchances, nous pourrions ne jamais réessayer de promouvoir le produit $x$. Si nous utilisons $\theta = 2$, alors nous utilisons une estimation très optimiste de la valeur du produit $x$, ce qui encouragera l'essai de produits présentant un niveau d'incertitude élevé (ce qui n'est pas nécessairement une mauvaise stratégie).

L'idée d'utiliser une approximation déterministe paramétrée est exceptionnellement puissante. Les compagnies aériennes l'utilisent lorsqu'elles optimisent leurs horaires, où elles doivent utiliser une estimation des retards météorologiques pour chaque vol. Si elles utilisent la médiane, alors la moitié du temps le retard sera supérieur à ce qui est anticipé par l'horaire, ce qui produira alors un grand nombre d'arrivées tardives d'avions, retardant les vols suivants. Cependant, si nous utilisons le 90e centile, nous risquons d'introduire trop de marge dans l'horaire, ce qui entraîne une mauvaise utilisation des avions.

Il est plus facile d'imaginer ajuster un ensemble de paramètres $\theta$ dans un simulateur, mais il arrive souvent (comme dans le problème de planification des horaires aériens) que le problème soit beaucoup trop complexe. Pour cette raison, il peut être nécessaire de procéder à un apprentissage en ligne, ce qui signifie tester différentes valeurs sur le terrain et observer la performance réelle.

### Les approximations de fonction de valeur (VFA)

Imaginez que nous répartissons une flotte de camions où nous devons assigner des conducteurs pour déplacer les chargements de fret d'un lieu de collecte à un lieu de livraison. La figure 4.3 illustre comment ce problème doit être résolu de manière répétée dans le temps. Ce que nous décidons de faire le lundi changera les emplacements des conducteurs le mardi et le mercredi. Chaque jour, les expéditeurs appellent pour de nouveaux ensembles de chargements qui ne sont pas connus à l'avance, de sorte que le transporteur doit prendre des décisions d'affectation le lundi sans savoir ce qui va se passer le mardi ou le mercredi.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentThreeDays.png" alt="Illustration du problème d'affectation de camions sur une période de trois jours." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 4.3.</span> Illustration du problème d'affectation de camions sur une période de trois jours.</figcaption>
</figure>

Optimiser sur un horizon de plusieurs jours en présence d'incertitudes est une tâche incroyablement complexe. À la place, nous pouvons approximer la valeur des conducteurs dans le futur, comme le montre la figure 4.4. Cela peut être fait en exécutant des simulations vers l'avenir, puis en calculant la valeur des conducteurs à différents emplacements. Lorsque nous incluons ces valeurs (appelées « approximations de fonction de valeur »), le problème que nous devons maintenant résoudre le lundi n'est pas plus compliqué que si nous ignorions complètement l'impact de l'envoi des conducteurs vers différents emplacements.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentwithDownstreamVFA.png" alt="Affectation des conducteurs aux chargements en utilisant des estimations de la valeur des conducteurs dans le futur." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 4.4.</span> Affectation des conducteurs aux chargements en utilisant des estimations de la valeur des conducteurs dans le futur.</figcaption>
</figure>

Approximer la valeur d'atterrir dans un état particulier est une stratégie très populaire dans la littérature de recherche, mais son succès dépend fortement de la structure d'un problème particulier, et elle a tendance à bien fonctionner pour un petit nombre de problèmes ayant une structure spécifique.

### Les approximations d'anticipation directe (DLA)

Il existe de nombreux problèmes où nous devons simplement planifier dans le futur pour prendre une décision maintenant. L'un des exemples les plus familiers d'une politique d'anticipation directe est lorsque nous utilisons Google Maps pour planifier un itinéraire vers la destination.

Les politiques DLA peuvent être divisées en deux sous-classes :

- Les anticipations déterministes – C'est le cas où nous utilisons des estimations ponctuelles de toute quantité incertaine, comme les retards liés au trafic.
- Les anticipations stochastiques – Ici, nous voulons modéliser explicitement l'incertitude à laquelle nous sommes confrontés, comme les retards potentiels de trafic qui peuvent survenir pendant que nous conduisons vers notre destination. Il est utile de subdiviser davantage cette classe en deux types :
  - Les problèmes à choix discrets - Ce sont des problèmes généralement résolus à l'aide d'arbres de décision.
  - Les problèmes où les décisions sont des vecteurs - Ici, nous devons utiliser les outils de la programmation mathématique pour explorer un espace multidimensionnel.

Notez que nous n'avons pas besoin de subdiviser les anticipations déterministes puisque, même si la décision à chaque pas de temps est un scalaire, l'ensemble du modèle d'anticipation nécessite d'optimiser sur le vecteur des décisions couvrant les pas de temps de l'horizon de planification.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/GoogleMapslookaheadHoriz.jpg" alt="Itinéraire planifié par Google Maps sur la base des temps de trajet estimés (à gauche) ; itinéraire alternatif basé sur le risque perçu de traverser la ville de New York (à droite).">
  <figcaption><span class="fig-num">Figure 4.5.</span> Itinéraire planifié par Google Maps sur la base des temps de trajet estimés (à gauche) ; itinéraire alternatif basé sur le risque perçu de traverser la ville de New York (à droite).</figcaption>
</figure>

La figure 4.5 (à gauche) montre un exemple de Google Maps planifiant un itinéraire de Hartford, Connecticut (en haut à droite) à Princeton, New Jersey (en bas à gauche), avec un départ à 16h l'après-midi. Notez que l'itinéraire traverse directement la ville de New York, ce qui se produirait vers 17h, moment où le trafic devrait être le plus dense. Google Maps utilise une estimation ponctuelle, et considère malgré tout qu'il s'agit du chemin le plus court.

Bien sûr, tout voyageur averti comprendrait qu'il existe une incertitude considérable entourant les temps de trajet réels à travers New York à 17h. La figure 4.5 (à droite) montre un itinéraire alternatif fourni par Google, donnant au voyageur la possibilité de choisir entre un chemin dont on prévoit qu'il sera plus court, mais avec un risque d'être beaucoup plus long, contre un chemin légèrement plus long dont on prévoit qu'il sera proche du temps estimé par Google.

Le premier chemin est donc un exemple d'anticipation déterministe, mais l'utilisateur peut introduire l'incertitude en évaluant la recommandation. En choisissant le second chemin, nous résolvons, d'une manière certes ad hoc, une anticipation stochastique.

Lorsque nous planifions dans un futur incertain, il existe un large éventail de stratégies pour modéliser ce processus afin d'aider à prendre une décision maintenant. Une stratégie consiste à utiliser une prévision ponctuelle (c'est-à-dire une anticipation déterministe) mais à introduire des paramètres ajustables qui peuvent rendre la solution plus robuste.

### Les politiques hybrides

En plus des quatre classes de politiques, nous pouvons créer une variété d'hybrides qui combinent deux, trois, voire les quatre classes. Voici quelques exemples utilisant un cadre de chaîne d'approvisionnement :

- CFA avec PFA - Choisir le fournisseur au coût le plus bas, mais avec des règles pour exclure les entreprises à haut risque.
- Anticipation (DLA) avec VFA - Optimiser le plan de production saisonnier, avec des fonctions capturant la valeur des stocks finaux.
- Anticipations directes déterministes paramétrées (DLA/CFA) - Planifier le plan de production saisonnier en utilisant des prévisions de demande au $\theta$-ième centile (disons, le 80e centile).
- Politique VFA utilisant une PFA - Planification de la distribution utilisant des VFA pour évaluer le stock à chaque entrepôt, mais en utilisant des règles (PFA) pour forcer les livraisons vers des emplacements spécifiques.
- VFA avec CFA - Commencer avec une politique basée sur une VFA avec un modèle linéaire, puis ajuster les paramètres de la VFA linéaire pour obtenir les meilleurs résultats à l'aide d'un simulateur.

Bien que ces politiques puissent sembler compliquées, il est possible de décrire des contextes spécifiques où la prise de décision humaine utilise chacune d'entre elles. Par exemple, la politique la plus complexe utilise une anticipation stochastique, que nous avons illustrée ci-dessus avec le problème de navigation utilisant Google Maps, où un chemin plus long a été choisi pour éviter le risque de congestion dans la ville de New York.

### Quelles politiques sont les plus largement utilisées ?

Discuter des politiques peut sembler compliqué et déroutant. Il est important de se rappeler que :

- Tout le monde prend des décisions. Nous sommes tous confrontés à des situations au quotidien, qu'il s'agisse de traverser la journée ou de décisions qui surviennent dans notre travail.
- Lorsque nous prenons des décisions, notre cerveau utilise une méthode qui appartient à l'une des quatre classes (et éventuellement à une hybride).

Commençons par diviser la quatrième classe, les DLA, en deux types : les anticipations déterministes et les anticipations stochastiques. Nous allons ensuite diviser le dernier type, les anticipations stochastiques, en deux sous-types : les problèmes où les décisions correspondent à un ensemble de choix discrets, et les problèmes où les décisions sont des vecteurs, comme les allocations d'actifs entre investissements, ou l'affectation de machines à des tâches.

Cela nous donne six types de politiques que nous répartissons en quatre catégories :

**Catégorie 1** - Cette catégorie comprend trois types de politiques :

- Les approximations de fonction politique (PFA), qui incluent toutes les règles simples telles que « quand il fait froid, mettez un manteau » ou « achetez un produit quand il est en solde ». Les PFA peuvent être fondées sur des règles « si dans cet état, prenez cette action » ou peuvent être une fonction analytique, un sujet auquel nous reviendrons au Volume III.
- Les approximations de fonction de coût (CFA), qui incluent toute méthode où l'on doit résoudre un problème d'optimisation déterministe (typiquement une approximation du problème réel qui implique de l'incertitude), tel que notre problème de choix discret de la figure 4.2.
- Les approximations d'anticipation directe déterministe (Det-DLA), où l'on planifie dans le futur comme le fait Google maps, en utilisant des estimations ponctuelles de toute quantité incertaine.

Les CFA et les Det-DLA impliquent toutes deux la résolution de problèmes d'optimisation déterministes ; la seule différence est que les CFA ne planifient pas dans le futur, tandis que les DLA le font.

**Catégorie 2** - Politiques d'anticipation stochastique où les décisions sont des choix discrets. Ici, nous modélisons explicitement l'incertitude dans l'évaluation de chaque choix. Ces politiques sont largement étudiées à l'aide du dispositif des arbres de décision.

**Catégorie 3** - Politiques fondées sur des approximations de fonction de valeur, où une décision prend en compte maintenant le coût ou la récompense immédiate plus une estimation de la valeur future résultant de la transition vers un certain état. Il s'agit d'une classe de politiques avancée et complexe sur le plan computationnel, nécessaire pour un petit ensemble de problèmes spécialisés.

**Catégorie 4** - Politiques d'anticipation stochastique où les décisions sont des vecteurs. Il s'agit d'une classe de problèmes très complexe qui requiert des stratégies élaborées, puisqu'une anticipation stochastique n'est qu'un autre problème d'optimisation stochastique, avec des simplifications introduites pour réduire la complexité computationnelle.

Les politiques de la catégorie 1 sont utilisées par tout le monde, indépendamment de toute formation formelle. Ces politiques sont les plus simples, mais cela nécessite l'introduction de paramètres qui doivent être calibrés, ce qui peut s'avérer difficile.

Les cerveaux humains ont développé la capacité naturelle d'utiliser les quatre classes de politiques, du moins dans le contexte des choix discrets. Nous savons même passer d'une classe à l'autre sans nous en rendre compte. Si nous jouons aux échecs (et que nous avons quelque expérience du jeu), nous exécutons probablement les premiers coups de mémoire (les joueurs experts sont capables d'exécuter un nombre considérable de coups de mémoire). Il s'agit d'une PFA pure. Cependant, à un certain moment, nous commençons à réfléchir à ce que notre adversaire pourrait faire, ce qui implique une politique d'anticipation directe, typiquement combinée avec des VFA capables de capturer la valeur de la perte de pièces majeures.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Donnez la définition formelle d'une décision, la définition informelle, et trois exemples de décisions.</li>
<li>Expliquez ce que l'on entend par « classe d'information contrôlable de manière endogène ». Quelles sont les deux autres classes d'information décrites dans le même contexte ?</li>
<li>Donnez des exemples de décisions relevant de chacune des catégories suivantes :
  <ol type="a">
    <li>Binaire.</li>
    <li>Un ensemble de choix discrets comportant au moins cinq choix.</li>
    <li>Il y a au moins 10 000 décisions différentes à prendre en même temps.</li>
  </ol>
</li>
<li>Nommez cinq exemples de décisions continues.</li>
<li>Donnez trois exemples de chacun des trois types de décisions :
  <ol type="a">
    <li>Les décisions ayant un impact sur les ressources physiques.</li>
    <li>Les décisions ayant un impact sur les ressources financières.</li>
    <li>Les décisions ayant un impact sur la collecte ou la distribution de l'information.</li>
  </ol>
</li>
<li>Nommez trois contextes où des décisions doivent être prises à différentes échelles de temps. Décrivez le contexte et le calendrier des décisions.</li>
<li>Résumez avec vos propres mots les quatre classes de politiques, et donnez un exemple de chacune pour un contexte de problème donné.</li>
</ol>

**Questions de modélisation**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Donnez un exemple de décision relevant de chaque catégorie :
  <ol type="a">
    <li>Une décision qui doit être prise chaque minute (ou plus fréquemment).</li>
    <li>Une décision qui doit être prise quotidiennement.</li>
    <li>Une décision qui doit être prise annuellement.</li>
  </ol>
</li>
<li>Identifiez les décisions impliquées dans chaque contexte, ainsi que le décideur responsable de chaque décision.
  <ol type="a">
    <li>Une personne doit prendre un médicament prescrit par son médecin, qui suit des protocoles élaborés par les développeurs du médicament.</li>
    <li>Le réseau électrique doit indiquer à une compagnie de service public quelles centrales à vapeur mettre en marche, et à quel moment. Les décisions de planification sont prises par un modèle informatique exécuté la veille.</li>
    <li>Un gestionnaire de fonds commun de placement doit décider du montant de liquidités à conserver pour répondre aux dépôts et demandes de rachat des investisseurs individuels (petits montants) et des investisseurs de détail (montants importants).</li>
  </ol>
</li>
<li>Donnez trois exemples d'approximations de fonction politique. Décrivez le contexte et la façon dont la PFA fonctionnerait.</li>
<li>Donnez un exemple d'approximation de fonction de coût pour un problème de choix discret.</li>
<li>Vous utilisez Google maps pour trouver un itinéraire afin d'arriver au travail à 8h30. Vous devez également décider du temps à prévoir pour arriver à l'heure. Décrivez les décisions prises, et quel type de politique est utilisé pour prendre chacune d'elles.</li>
<li>Décrivez autant de classes de politiques que possible que vous pourriez utiliser si vous deviez concevoir un programme informatique pour jouer aux échecs. Décrivez comment chaque classe de politique que vous avez identifiée serait appliquée.</li>
</ol>
{% endraw %}
