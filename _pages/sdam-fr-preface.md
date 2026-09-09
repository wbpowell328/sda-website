---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: Préface et remerciements
permalink: /sdam/fr/preface/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 71edd7ec18764999
---

{% raw %}
**Préface pour la première édition**

Mon travail sur les problèmes de décision séquentielle est né de recherches qui ont débuté dans les années 1980 dans le secteur du transport routier, et a couvert, au fil de ma carrière, le rail, l'énergie, la santé, la finance, le e-commerce, la gestion de la chaîne d'approvisionnement, et même l'apprentissage pour la science des matériaux. Les problèmes de décision séquentielle apparaissent dans des activités quotidiennes comme le sport, la cuisine, le shopping, et la recherche du meilleur chemin vers une destination. Ils apparaissent également lors de la conception d'un produit pour une startup, de l'embauche de personnel pour cette startup, et de la conception de campagnes marketing.

Les premiers travaux sur les problèmes de décision séquentielle (connus sous le nom de programmes dynamiques ou de problèmes de contrôle optimal) se concentraient sur la résolution d'une équation célèbre, et notoirement intraitable, connue sous le nom d'équation de Bellman (ou d'équations de Hamilton-Jacobi pour les problèmes continus). J'ai rejoint une communauté qui travaillait sur des méthodes pour approximer ces équations ; ce travail a donné lieu à un livre à succès sur la programmation dynamique approximative, produisant une avancée majeure pour une classe de problèmes d'allocation de ressources. Avec le temps, cependant, j'ai fini par réaliser que la programmation dynamique approximative était une méthode puissante pour résoudre un éventail très restreint de problèmes — le proverbial marteau à la recherche d'un clou.

Mon travail sur un large éventail de problèmes m'a fait réaliser l'importance d'utiliser un vaste ensemble de méthodes que l'on pouvait trouver dans la littérature de recherche. J'ai découvert que je pouvais modéliser tout problème de décision séquentielle avec le même cadre, qui impliquait de chercher parmi des méthodes pour prendre des décisions, généralement appelées « politiques » dans la littérature de recherche. J'ai alors pu organiser le vaste ensemble de méthodes en quatre grandes classes (méta-classes) de politiques qui couvrent *toute* méthode de prise de décision, y compris tout ce qui a été proposé dans la littérature ou utilisé en pratique (y compris des méthodes qui n'ont pas encore été inventées !).

Ce cadre est le fondement d'un ouvrage de niveau doctoral que j'ai terminé en 2022, intitulé *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (voir [tinyurl.com/RLandSO](https://tinyurl.com/RLandSO/)). En écrivant ce livre, j'ai réalisé que les problèmes de décision séquentielle sont universels, présents dans toute activité humaine. De plus, ces idées pouvaient (et devaient) être enseignées à un large public, et non seulement au public habituel, analytiquement sophistiqué, que l'on trouve en recherche opérationnelle, en informatique, en économie, et dans certaines branches de l'ingénierie.

L'objectif de ce livre est de permettre aux lecteurs de comprendre comment aborder, modéliser et résoudre un problème de décision séquentielle, même s'ils ne sont jamais destinés à écrire une seule ligne de code. Bien que ce livre soit analytique, le véritable objectif est d'enseigner aux lecteurs à *penser* les problèmes de décision séquentielle, en les décomposant selon les cinq éléments fondamentaux d'un modèle de décision séquentielle, en modélisant l'incertitude, puis en concevant des politiques.

Tout comme il existe de nombreux styles d'enseignement des statistiques selon les communautés, je pense qu'une évolution similaire se produira pour l'enseignement de ces idées à différents publics. Les exemples de ce livre proviennent de la recherche opérationnelle, que j'aime appeler les mathématiques de la vie quotidienne. Je pense que les lecteurs trouveront la plupart des exemples familiers, indépendamment de leur domaine professionnel. En même temps, je peux facilement imaginer des versions de ce livre conçues spécifiquement pour différents domaines d'application tels que la santé, la finance, l'énergie, la robotique et la gestion de la chaîne d'approvisionnement (et cette liste est loin d'être exhaustive).

**Remerciements pour la première édition**

Toute reconnaissance appropriée du travail derrière ce livre devrait mentionner toutes les personnes ayant contribué à l'ouvrage de niveau doctoral, *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*. Il y a simplement trop de personnes à énumérer ici, et je demande aux lecteurs de consulter la section des Remerciements de cet ouvrage pour découvrir mes meilleurs efforts pour reconnaître le travail de tant de personnes qui ont contribué à ma compréhension des problèmes de décision séquentielle.

Cela dit, je souhaite reconnaître quelques personnes qui ont contribué à ce livre. Il y eut d'abord un groupe enthousiaste de stagiaires qui ont écrit tous les modules Python utilisés dans les exercices de ce livre : Raluca Cobzaru, Andrei Grauer, Joy Hii, John Nguyen et Robert Raveaunu. Je suis particulièrement reconnaissant envers Dennis Djanka, professeur à l'université de Karlsruhe en Allemagne, qui a mis à jour les modules Python originaux de Python 2 vers Python 3, et a apporté des révisions rendant la bibliothèque plus facile à utiliser.

Ensuite, je remercie chaleureusement les efforts du Dr Juliana Nascimento, qui a parcouru chaque ligne de ce code Python, corrigeant les bugs, nettoyant la logique, et m'aidant à rédiger les séries d'exercices basées sur ces exemples.

Enfin, et surtout, je remercie ma classe de premier cycle, ORF 411 : Sequential Decision Analytics and Modeling, qui s'est inscrite au cours et a participé au premier cours spécifiquement consacré à « l'analytique de décision séquentielle » enseigné n'importe où. Ils m'ont aidé à peaufiner les cours, disponibles à [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses/) (faites défiler jusqu'à « Undergraduate/masters course in sequential decision analytics » pour les diapositives).

Warren B. Powell<br>
Princeton, New Jersey<br>
Août 2022

**Préface pour la deuxième édition**

En 2026, j'ai pris la décision de m'engager dans la voie de la publication via Kindle Direct Publishing, que j'ai choisie pour ma nouvelle série de monographies *Bridging Decision Problems*. Lorsque j'ai constaté à quel point cela était facile, j'ai réalisé que je pouvais faire de même avec *Sequential Decision Analytics and Modeling*. KDP me permettra d'effectuer des mises à jour mineures ainsi que de nouvelles éditions sans la lourdeur administrative liée au travail avec un éditeur. Cela me permet de proposer une édition Kindle à un prix minime, ainsi qu'une édition reliée à un prix beaucoup plus raisonnable.

La deuxième édition contient le même ensemble de chapitres d'application. Les changements les plus importants concernent le chapitre 1, où j'ai intégré mes idées sur la définition des différents types de décisions. Chaque chapitre d'application commence désormais par un « Aperçu du chapitre » qui aide les lecteurs à comprendre le sujet du chapitre. L'ensemble du livre a également bénéficié d'une relecture bien nécessaire pour corriger des modifications mineures et quelques erreurs occasionnelles.

Cette édition adopte également un processus que j'appelle « cadrer le problème », qui consiste à commencer par identifier (en anglais) les indicateurs de performance, les types de décisions prises, et les sources d'incertitude. Ma nouvelle monographie, [*Bridging Decision Problems, Volume I: Framing the Problem*](/bridging-vol1/), traite ces trois questions sur 150 pages, car elles ne sont pas aussi simples qu'elles le paraissent, même sans la modélisation mathématique.

Chaque chapitre comprend désormais une brève section, juste après le récit, intitulée « Cadrer le problème », qui prépare le terrain pour la section de modélisation mathématique en énumérant les indicateurs, les décisions et les incertitudes. Notre application du cadrage rendra le processus beaucoup plus simple qu'il ne l'est en réalité pour la plupart des problèmes réels, puisque je n'illustre pas le processus consistant à partir d'une liste complète d'indicateurs, de décisions et d'incertitudes, qui sont ensuite réduits à ceux représentés dans le modèle.

<figure class="book-figure">
  <img src="/assets/images/sdam/geography-2025.png" alt="Répartition géographique des téléchargements de la première édition en 2025" style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 0.1.</span> Répartition géographique des téléchargements de la première édition en 2025</figcaption>
</figure>

**Remerciements pour la deuxième édition**

Je souhaite tout d'abord remercier les nombreux milliers de lecteurs qui ont téléchargé ce livre. Au moment de cette rédaction, le livre a bénéficié de près de 18 000 téléchargements provenant du monde entier (voir Figure 0.1). Les retours ont été tout simplement réconfortants.

Une caractéristique importante de ce livre est constituée des modules Python qui accompagnent la plupart des chapitres. Quelques années après la publication de la première édition, j'ai appris avec une déception considérable que Python était passé de la version 2 à la version 3, et que les modules originaux ne fonctionnaient plus (et j'ai abandonné la programmation en 1990, une décision qui a été essentielle à mon succès).

Vous pouvez imaginer ma sincère gratitude lorsque Dennis Djanka, professeur à l'université de Karlsruhe en Allemagne, m'a contacté pour m'informer qu'il avait entièrement réécrit la bibliothèque en Python 3. De plus, il a apporté les ajouts suivants (comme il l'a résumé dans son courriel) :

- Introduction de classes de base abstraites SDPModel et SDPPolicy qui facilitent la mise en place de nouveaux modèles et politiques avec un minimum de code.
- Réécriture complète du code des modules *AssetSelling*, *MedicalDecisionDiabetes* et *StochasticShortestPath_static*, et création d'un Jupyter Notebook pour chacun des problèmes, guidant l'utilisateur depuis la création d'un modèle et d'une politique jusqu'à l'ajustement des politiques et l'interprétation des résultats.

J'avais précédemment créé une URL pour la version de Dennis du répertoire à l'adresse [tinyurl.com/sdagithubnew](https://tinyurl.com/sdagithubnew/), tout en conservant mon répertoire original à l'adresse [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). Avec la publication de la 2e édition, j'ai modifié l'URL originale afin qu'elle pointe également vers la nouvelle bibliothèque de Dennis.

Warren B. Powell<br>
Princeton, New Jersey<br>
Février 2026
{% endraw %}