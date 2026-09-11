---
layout: book
title: "Chapitre 5 : Incertitudes"
permalink: /bridging-vol1/fr/chapter-5/
date: 2026-07-17
book_home: /bridging-vol1/fr/contents/
book_data: bridging_vol1_toc_fr
lang: fr
translated_from: en
translated_from_hash: cac007f7f894240f
---


{% raw %}
<p class="book-byline"><em>Établir le pont entre les problèmes de décision, Volume I — Cadrer le problème</em> &middot; Warren B. Powell</p>

Les problèmes de décision séquentielle doivent invariablement faire face à l'incertitude, qui est généralement la dimension la plus difficile de la prise de décision au fil du temps. Il existe trois façons dont l'incertitude affecte la performance de notre système :

1. La décision que nous prenons à un instant donné n'est pas mise en œuvre correctement.
2. La performance du système compte tenu de notre décision n'est pas la même que celle que nous avions estimée au moment de prendre la décision.
3. L'impact d'une décision actuelle sur le futur n'est pas estimé correctement en raison des changements survenant au fil de l'avancement dans le temps.

Bien que nous ne listions que trois façons dont l'incertitude affecte la performance, l'incertitude survient sous de nombreuses formes, ce qui explique pourquoi certaines formes d'incertitude sont souvent négligées dans le processus de modélisation. En fait, la plupart des utilisations des outils d'optimisation ignorent toutes les formes d'incertitude, reflétant typiquement l'augmentation spectaculaire de l'incertitude introduite par la modélisation explicite de toute forme d'incertitude.

Un des objectifs de ce chapitre est de mettre en évidence les différentes façons dont l'incertitude peut survenir. Cela ne signifie pas que les modèles doivent intégrer toutes les formes d'incertitude. Cependant, la décision d'ignorer une forme d'incertitude devrait être un choix explicite, et non simplement le résultat d'un oubli du modélisateur.

## Les 12 classes d'incertitude {#12classesofuncertainty}

Une façon d'aborder l'identification des sources d'incertitude consiste à partir d'un modèle mathématique et à remonter en arrière. Voici ci-dessous 12 classes d'incertitude créées du point de vue de la manière dont l'incertitude peut entrer dans un modèle. Les problèmes complexes, tels que la gestion d'une chaîne d'approvisionnement, d'un système énergétique ou la résolution d'un problème de santé publique, impliqueront les 12 classes, tandis que des problèmes simples comme jouer aux échecs peuvent n'en impliquer qu'une seule.

Il existe un certain chevauchement entre les classes, donc ne vous inquiétez pas s'il y a une certaine ambiguïté quant à l'endroit où répertorier une source d'incertitude. Ce qui importe, c'est d'identifier autant de formes différentes d'incertitude que possible.

1. **Erreurs d'observation** – Elles représentent des erreurs dans les quantités et paramètres que nous devons observer à partir de l'environnement. Voici quelques exemples :
   - Le stock actuel d'un produit tel que représenté dans l'ordinateur, qui peut ne pas correspondre à ce qui est réellement disponible.
   - Les radiographies médicales d'un patient pour détecter un cancer.
   - La fraction des électeurs qui préfèrent un candidat particulier à une fonction politique.
2. **Incertitude exogène** – Il s'agit d'informations qui arriveront à notre système après avoir pris une décision, telles que :
   - La demande pour un produit vendu sur le marché.
   - La variation du prix d'une action.
   - Le temps nécessaire pour conduire d'une ville à une autre.
   - Le montant d'argent qui pourrait être déposé ou retiré demain.
   - La façon dont un patient répond à un type de médicament.
3. **Incertitude pronostique** – Il s'agit des erreurs dans les prévisions de demandes, de prix, de temps de trajet (toute quantité que nous pourrions être en train de prévoir).
4. **Incertitude inférentielle** – Elle capture l'incertitude dans nos estimations de l'état du monde à l'instant présent. Cela pourrait inclure :
   - La façon dont le marché pourrait réagir à un changement de prix. Nous pourrions penser qu'il y a une baisse de 10 pour cent de la demande pour une augmentation de 5 pour cent du prix, mais la valeur réelle pourrait être que la demande baissera de 12 pour cent.
   - Nous pensons qu'un patient atteint de cancer est au stade 2, mais il pourrait être au stade 3. Nous pourrions détecter un cancer du sein, mais négliger le fait qu'il s'est propagé à d'autres organes.
   - Une campagne présidentielle pourrait penser que 10 millions de dollars de dépenses publicitaires dans un marché majeur pourraient produire une augmentation de 2 pour cent de la popularité d'un candidat, mais la réalité pourrait être supérieure ou inférieure.
5. **Incertitude expérimentale** – Elle décrit la variation résultant de l'exécution d'expériences répétées, soit dans un laboratoire, un simulateur, ou sur le terrain :
   - Un fabricant réalise des expériences sur un procédé de fabrication de plaquettes de silicium. Le test peut être répété 10 fois, produisant une dispersion de rendements entre 70 et 90 pour cent.
   - Une entreprise évalue une nouvelle campagne marketing en la déployant dans cinq marchés tests différents. Il y aura des variations entre les marchés, et au fil du temps.
   - Un simulateur informatique est utilisé pour tester la performance d'une politique de commande de stock. Chaque passage du simulateur produira des résultats différents.
6. **Incertitude de modèle** – Il s'agit d'une catégorie générale qui peut couvrir plusieurs sources d'incertitude, mais l'une des plus importantes est l'incertitude dans le modèle de l'évolution d'un processus au fil du temps. Voici quelques exemples :
   - La façon dont le climat répond aux changements de politiques de contrôle du carbone.
   - La façon dont un patient répond à des injections d'insuline.
   - La façon dont une maladie se propage dans une population en réponse à des changements de politiques concernant la distribution de vaccins.
7. **Incertitude de transition** – Il s'agit du bruit dans la façon dont un système répond à une commande. L'exemple le plus simple serait le contrôle de la trajectoire d'une fusée ou d'un avion, qui est ballotté par le vent. Nous supposons généralement que l'évolution du système est connue et déterministe, mais qu'elle est affectée par un processus exogène (comme le vent).
8. **Incertitude de mise en œuvre** – Il peut y avoir une différence entre ce que nous décidons de faire et la décision qui est effectivement mise en œuvre sur le terrain. Par exemple :
   - Le médecin prescrit un médicament particulier, mais le patient ne le prend pas, ou prend une dose incorrecte.
   - Un scientifique souhaite tester une combinaison particulière de matériaux, mais le stagiaire commande un article incorrect (des erreurs comme celle-ci peuvent produire des avancées majeures !).
   - Le réseau électrique ordonne qu'un générateur soit mis en marche à 13h, mais l'opérateur local ne met en marche le générateur qu'à 14h.
9. **Erreurs de communication** – Les instructions transmises sur le terrain peuvent tout simplement être mal communiquées. La personne recevant l'instruction peut penser qu'elle fait ce qui est demandé, mais elle n'a simplement pas entendu ou compris une instruction.
10. **Instabilité algorithmique** – Il existe certains contextes où l'exécution répétée d'un algorithme peut renvoyer des solutions différentes :
    - Les problèmes complexes nécessitent souvent l'utilisation d'algorithmes sophistiqués qui introduisent un élément de variabilité, ce qui survient souvent lorsqu'un algorithme utilise le traitement parallèle. La vitesse des processeurs parallèles peut affecter qui termine en premier, ce qui peut affecter le cheminement global de l'algorithme.
    - Les algorithmes pour résoudre des problèmes d'optimisation stochastique dépendent souvent de l'échantillonnage Monte Carlo, qui produira des résultats différents chaque fois que l'algorithme est exécuté (cela s'observe lors de l'exécution de grands modèles de langage).
11. **Incertitude d'objectif** – Les entreprises qui nécessitent que des groupes de personnes prennent des décisions (répartition des camions, négociation d'actifs financiers, soumission d'offres pour des contrats énergétiques) peuvent présenter des variations car différentes personnes mettent l'accent sur différents indicateurs de performance.
12. **Incertitude environnementale** – Ici, « environnement » pourrait refléter le climat, ou un environnement politique (qui pourrait avoir un impact sur les politiques ou les tarifs douaniers), ou une nouvelle direction dans une entreprise (ce qui entraîne un changement de priorités).

## Exemples issus d'applications sélectionnées {#examples-from-selected-applications}

Il est utile de voir des exemples de chacune des 12 classes pour certaines des applications que nous avons présentées au Chapitre 2. Pour chaque application, nous décrivons un ou plusieurs exemples des incertitudes pour chaque classe, en notant que les applications plus simples n'auront pas d'incertitudes pour les 12 classes. Il est important de se rappeler que l'objectif réel ici est de reconnaître autant de sources d'incertitude que possible. La façon dont ces incertitudes se reflètent dans le processus de prise de décision viendra dans de futurs volumes.

### Gestion de la trésorerie pour un fonds commun de placement

Un fonds commun de placement doit déterminer combien de liquidités conserver pour répondre aux demandes de rachat, et à mesure que des dépôts sont effectués, à la fois par des investisseurs individuels et institutionnels.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.1.</span> Incertitudes survenant dans le problème du solde de trésorerie d'un fonds commun de placement.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Solde de trésorerie du fonds commun de placement</th></tr>
</thead>
<tbody>
<tr><td>1. Incertitude d'observation</td><td></td></tr>
<tr><td>2. Incertitude exogène</td><td>Dépôts, rachats, indices de marché</td></tr>
<tr><td>3. Incertitude pronostique</td><td>Prévisions des dépôts, rachats, indices de marché, taux d'intérêt</td></tr>
<tr><td>4. Incertitude inférentielle</td><td>Estimation de la façon dont les rachats évoluent avec la performance du marché</td></tr>
<tr><td>5. Variabilité expérimentale</td><td>Test de différentes politiques de détention de liquidités</td></tr>
<tr><td>6. Incertitude de modèle</td><td></td></tr>
<tr><td>7. Incertitude de transition</td><td>Mise à jour du montant de liquidités disponibles</td></tr>
<tr><td>8. Incertitude de mise en œuvre</td><td></td></tr>
<tr><td>9. Erreurs de communication</td><td></td></tr>
<tr><td>10. Instabilité algorithmique</td><td></td></tr>
<tr><td>11. Incertitude d'objectif</td><td>Équilibrer la maximisation des rendements d'investissement et la minimisation des ventes d'actions pour les rachats</td></tr>
<tr><td>12. Incertitude environnementale</td><td>Changements des taux d'intérêt</td></tr>
</tbody>
</table>
</div>

### Trouver le meilleur traitement du diabète

Les patients diabétiques doivent gérer leur glycémie en utilisant une combinaison de médicaments (peut-être en utilisant une pompe à insuline) et de régime alimentaire.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.2.</span> Incertitudes survenant dans la gestion de la glycémie.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Gestion de la glycémie</th></tr>
</thead>
<tbody>
<tr><td>Incertitude d'observation</td><td>Mesure des niveaux d'A1c</td></tr>
<tr><td>Incertitude exogène</td><td>Ce que mange un patient</td></tr>
<tr><td>Incertitude pronostique</td><td>Anticipation des changements des niveaux de glycémie après un repas</td></tr>
<tr><td>Incertitude inférentielle</td><td>Estimation de la façon dont la glycémie d'un patient répond au médicament</td></tr>
<tr><td>Variabilité expérimentale</td><td>Variations de la glycémie pour différents types de médicaments</td></tr>
<tr><td>Incertitude de modèle</td><td>Modélisation de la façon dont un patient répond à un type de médicament</td></tr>
<tr><td>Incertitude de transition</td><td></td></tr>
<tr><td>Incertitude de mise en œuvre</td><td>Si un patient suit les instructions de son médecin</td></tr>
<tr><td>Erreurs de communication</td><td>Si un patient comprend mal les instructions du médecin</td></tr>
<tr><td>Instabilité algorithmique</td><td></td></tr>
<tr><td>Incertitude d'objectif</td><td>Équilibrer la réduction de la glycémie et les problèmes de digestion</td></tr>
<tr><td>Incertitude environnementale</td><td></td></tr>
</tbody>
</table>
</div>

### Gestion de la chaîne d'approvisionnement

Les chaînes d'approvisionnement nécessitent la gestion de stocks qui doivent être coordonnés à travers le système.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.3.</span> Incertitudes survenant dans la gestion de la chaîne d'approvisionnement.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Gestion de la chaîne d'approvisionnement</th></tr>
</thead>
<tbody>
<tr><td>1. Incertitude observationnelle</td><td>Mesure des stocks</td></tr>
<tr><td>2. Incertitude exogène</td><td>Demande du marché, météo, temps de transit</td></tr>
<tr><td>3. Incertitude pronostique</td><td>Prévision de la demande, de la production, des démissions</td></tr>
<tr><td>4. Incertitude inférentielle</td><td>Réaction du marché aux prix, taux de pannes des machines</td></tr>
<tr><td>5. Variabilité expérimentale</td><td>Erreurs de simulation, test de nouveaux matériaux, tests de marché</td></tr>
<tr><td>6. Incertitude de modèle</td><td>Comment l'information se propage sur le marché, comment les employés réagissent aux incitations</td></tr>
<tr><td>7. Incertitude transitionnelle</td><td>Mise à jour des stocks</td></tr>
<tr><td>8. Incertitude d'implémentation</td><td>Non-respect des instructions</td></tr>
<tr><td>9. Erreurs de communication</td><td>Instructions incorrectes aux fournisseurs</td></tr>
<tr><td>10. Instabilité algorithmique</td><td>Variations de la solution optimale par rapport aux plannings de production</td></tr>
<tr><td>11. Incertitude sur les objectifs</td><td>Différences de priorités entre coût de production et couverture de la demande</td></tr>
<tr><td>12. Incertitude environnementale</td><td>Changements des tarifs douaniers, des taux de change, des taux d'intérêt</td></tr>
</tbody>
</table>
</div>

### Allocation des kits de naloxone

Les agences d'État doivent allouer des kits de naloxone pour répondre aux besoins des cliniques locales et des professionnels de santé qui traitent des patients.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.4.</span> Incertitudes survenant dans la gestion des kits de naloxone.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Gestion des kits de naloxone</th></tr>
</thead>
<tbody>
<tr><td>Incertitude observationnelle</td><td>Le nombre de kits de naloxone en stock</td></tr>
<tr><td>Incertitude exogène</td><td>Le nombre d'événements nécessitant l'utilisation de kits de naloxone</td></tr>
<tr><td>Incertitude pronostique</td><td>Estimations des changements dans les habitudes de consommation de drogue</td></tr>
<tr><td>Incertitude inférentielle</td><td>Estimations de la manière dont la disponibilité des kits affecte leur utilisation</td></tr>
<tr><td>Variabilité expérimentale</td><td></td></tr>
<tr><td>Incertitude de modèle</td><td>Comprendre comment les habitudes de consommation de drogue évoluent au fil du temps</td></tr>
<tr><td>Incertitude transitionnelle</td><td>Changements des stocks de kits de naloxone d'une semaine à l'autre</td></tr>
<tr><td>Incertitude d'implémentation</td><td>Si les kits sont utilisés correctement ; si les instructions d'allocation sont suivies</td></tr>
<tr><td>Erreurs de communication</td><td>Si les représentants sur le terrain suivent les instructions de distribution des kits</td></tr>
<tr><td>Instabilité algorithmique</td><td></td></tr>
<tr><td>Incertitude sur les objectifs</td><td>Prioriser qui approvisionner en kits de naloxone</td></tr>
<tr><td>Incertitude environnementale</td><td>Disponibilité du financement pour les kits de naloxone</td></tr>
</tbody>
</table>
</div>

### Gestion d'une flotte de camions

Les entreprises de camionnage à charge complète doivent déterminer quelles charges déplacer, avec quel conducteur.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.5.</span> Incertitudes survenant dans la gestion d'une flotte de camions.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Gestion d'une flotte de camions</th></tr>
</thead>
<tbody>
<tr><td>Incertitude observationnelle</td><td></td></tr>
<tr><td>Incertitude exogène</td><td>Nouvelles charges des expéditeurs ; affectations refusées par les conducteurs ; retards liés au trafic</td></tr>
<tr><td>Incertitude pronostique</td><td>Prévisions des charges futures</td></tr>
<tr><td>Incertitude inférentielle</td><td>Comment le marché réagira aux changements des prix spot</td></tr>
<tr><td>Variabilité expérimentale</td><td>Exécution de simulations de changements dans les affectations de conducteurs</td></tr>
<tr><td>Incertitude de modèle</td><td></td></tr>
<tr><td>Incertitude transitionnelle</td><td>Changements du nombre de charges disponibles ; mises à jour de la disponibilité des conducteurs</td></tr>
<tr><td>Incertitude d'implémentation</td><td>Si un répartiteur suit les instructions du modèle</td></tr>
<tr><td>Erreurs de communication</td><td>Si les répartiteurs suivent les instructions de leurs gestionnaires</td></tr>
<tr><td>Instabilité algorithmique</td><td>Changements de la solution issus des mises à jour des estimations des valeurs des conducteurs</td></tr>
<tr><td>Incertitude sur les objectifs</td><td>Équilibrer les kilomètres à vide, les engagements envers les expéditeurs et le retour des conducteurs chez eux</td></tr>
<tr><td>Incertitude environnementale</td><td>Changements des règles d'heures de service par le ministère des Transports</td></tr>
</tbody>
</table>
</div>

### Planification d'un réseau électrique

Le réseau électrique doit collaborer avec les services publics pour déterminer quels générateurs doivent être mis en marche afin de répondre à la demande anticipée sur le réseau.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tableau 5.6.</span> Incertitudes survenant dans la gestion du réseau électrique.</caption>
<thead>
<tr><th>Classes d'incertitude</th><th>Gestion du réseau électrique</th></tr>
</thead>
<tbody>
<tr><td>Incertitude observationnelle</td><td>Estimation de la température, de la météo, des attitudes des clients</td></tr>
<tr><td>Incertitude exogène</td><td>Changements météorologiques, pannes de générateurs</td></tr>
<tr><td>Incertitude pronostique</td><td>Prévisions de température, de vent, de couverture nuageuse</td></tr>
<tr><td>Incertitude inférentielle</td><td>Estimation de la variation de la demande électrique en fonction des prix du réseau</td></tr>
<tr><td>Variabilité expérimentale</td><td>Variabilité de la réaction aux changements des paramètres du modèle</td></tr>
<tr><td>Incertitude de modèle</td><td>Erreurs dans l'évolution des vitesses du vent sur une région géographique</td></tr>
<tr><td>Incertitude transitionnelle</td><td>Différence entre la puissance éolienne attendue et réelle</td></tr>
<tr><td>Incertitude d'implémentation</td><td>Différences entre les instructions données aux services publics et ce qu'ils font</td></tr>
<tr><td>Erreurs de communication</td><td>Erreurs de compréhension des instructions communiquées aux services publics</td></tr>
<tr><td>Instabilité algorithmique</td><td>Variations de la performance de l'algorithme de programmation en nombres entiers</td></tr>
<tr><td>Incertitude sur les objectifs</td><td>Équilibrer l'utilisation du nucléaire, du charbon et des énergies renouvelables</td></tr>
<tr><td>Incertitude environnementale</td><td>Changements des politiques de remboursement pour la production solaire excédentaire</td></tr>
</tbody>
</table>
</div>

## Comment l'incertitude affecte la performance

Bien que nous ayons identifié 12 classes d'incertitude, il n'existe que trois façons dont l'incertitude affecte le comportement d'un modèle :

1. La manière dont les décisions sont prises.
2. Les indicateurs de performance issus des décisions choisies dans le modèle.
3. L'évolution du système dans le modèle après qu'une décision a été prise, et avant que les décisions suivantes ne doivent être prises.

Il existe ensuite les façons dont l'incertitude affecte la performance sur le terrain :

<ol start="4">
<li>Les décisions qui sont mises en œuvre sur le terrain.</li>
<li>Les indicateurs de performance réels pour les décisions mises en œuvre sur le terrain.</li>
<li>L'évolution du système sur le terrain.</li>
</ol>

Il existe de nombreuses façons dont l'incertitude affecte la performance, allant des coûts aléatoires à la façon dont un patient réagit à un médicament, en passant par le prix d'un investissement. Pour l'instant, nous allons simplement nous concentrer sur l'identification de la manière dont l'incertitude affecte la performance.

## Différentes formes d'incertitude

La première étape pour comprendre l'incertitude consiste à répertorier les différentes sources d'incertitude, comme nous l'avons fait ci-dessus. L'étape suivante consiste alors à décrire les différentes formes que prend l'incertitude. En voici un échantillon :

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Production horaire d'énergie solaire sur une année entière, démontrant à la fois la variabilité intra-journalière et saisonnière." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 5.1.</span> Production horaire d'énergie solaire sur une année entière, démontrant à la fois la variabilité intra-journalière et saisonnière.</figcaption>
</figure>

- **Variabilité à grain fin** – Celle-ci peut survenir à des échelles de temps de secondes (voire de fractions de seconde), de minutes, d'heures, ou de jours. Voici des exemples de variabilité à grain fin :
  - Le trading haute fréquence en finance - Ces décisions sont prises plusieurs fois par seconde.
  - La régulation de fréquence pour le réseau électrique - Il s'agit de signaux envoyés toutes les deux secondes aux générateurs pour effectuer des ajustements afin que la tension électrique reste dans une plage étroite.
  - Les ventes horaires de différents choix alimentaires de restaurant qui peuvent nécessiter une préparation avant le service.
  - Les variations horaires des vitesses du vent, illustrées dans la figure 5.1. Cette figure capturerait également les variations horaires à quotidiennes de la couverture nuageuse, le tout dans le contexte de variations saisonnières prévisibles.
  - Les ventes quotidiennes d'un produit de détail.
  - Les variations quotidiennes à hebdomadaires des admissions hospitalières pour la grippe.

- **Décalages** – La variabilité à grain fin d'un processus représente typiquement des variations autour d'une moyenne, mais il arrive que cette moyenne se décale. Exemples :
  - Les demandes aléatoires pour un produit de détail peuvent se décaler à la suite d'un changement de prix, soit pour le produit lui-même, soit pour un produit concurrent.
  - Le taux d'admissions hospitalières pour une maladie infectieuse se décalera à mesure que la maladie se propage dans la population proche de l'hôpital.
  - Les demandes de rachat d'un fonds commun de placement, qui varient d'une minute à l'autre, se décaleront lorsque le marché boursier plus large réagira à une économie changeante.
  - Le nombre de personnes faisant des offres sur des maisons (par exemple, pour un agent immobilier donné) se décalera vers différents niveaux à mesure que les taux d'intérêt évoluent.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/Bursts.png" alt="Illustration de rafales d'activité." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 5.2.</span> Illustration de rafales d'activité.</figcaption>
</figure>

- **Rafales, demandes intermittentes** – Celles-ci décrivent des motifs où il y a peu ou pas d'activité, mais qui connaissent ensuite une rafale jusqu'à ce qu'elle s'estompe à nouveau (voir figure 5.2). Voici des exemples de rafales :
  - La propagation de maladies telles que la rougeole – Lorsqu'une maladie pénètre dans une région, il y a une période d'augmentation des infections à mesure que la maladie se propage dans la partie la plus vulnérable de la population.
  - Un produit peut ne pas se vendre, jusqu'à ce que quelqu'un l'achète par hasard puis en parle après une bonne expérience. Cela se propagera à travers son réseau jusqu'à saturation.

- **Pics** – Un processus peut refléter deux sources motrices. L'une produit des résultats modestes issus d'une distribution bien définie. La seconde représente des résultats peu fréquents mais beaucoup plus importants que la première distribution. Par exemple :
  - Le prix de l'électricité sur le réseau est mis à jour toutes les 5 minutes. La figure 5.3 montre les prix du réseau en temps réel pour le mois de février. Elle montre une séquence stable de changements aléatoires, avec des pics occasionnels beaucoup plus importants que les variations habituelles.
  - Une tempête provoque une ruée d'achats de lait, d'œufs et de papier toilette.
  - Un système orageux passant près d'un aéroport peut entraîner un certain nombre d'annulations de vols, ce qui peut à son tour créer un grand nombre de demandes de dernière minute pour des chambres d'hôtel.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/RealTimePricesFebruary.png" alt="Prix de l'électricité en temps réel, mis à jour toutes les cinq minutes, en février, illustrant une volatilité extrême." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 5.3.</span> Prix de l'électricité en temps réel, mis à jour toutes les cinq minutes, en février, illustrant une volatilité extrême.</figcaption>
</figure>

- **Événements spatiaux (météo, maladies, réglementaires)** – Il existe de nombreux exemples de processus aléatoires de nature régionale. Voici quelques exemples :
  - Météo – Les tempêtes peuvent créer une série d'événements aléatoires dans une région touchée par de mauvaises conditions météorologiques, ou où de mauvaises conditions météorologiques sont prévues.
  - Maladies – Comme la propagation des maladies nécessite souvent un contact physique, les épidémies suivent généralement un schéma régional.
  - Réglementations – Les changements de réglementation suivent généralement les frontières politiques, qui peuvent être celles d'un pays, ou d'un état, d'un district ou d'une province au sein d'un pays.
- **Événements systémiques** – Ce sont des événements qui peuvent affecter une entreprise entière (traversant les frontières internationales), un pays entier, ou même avoir un impact mondial, tels que :
  - Les cyberattaques, qui peuvent affecter les flux d'informations d'une entreprise entière.
  - Perception publique – Les événements publics peuvent produire rapidement des perceptions positives ou négatives d'une entreprise. Par exemple, une brasserie a lancé une campagne pour promouvoir la communauté LGBTQ, ce qui a produit un contrecoup soudain de la part de ses clients conservateurs, affectant les ventes de toute l'entreprise.
- **Événements rares** – Les événements rares peuvent provenir de nombreuses sources telles que les tremblements de terre, les épidémies de maladies ou les attaques terroristes. Il s'agit généralement d'événements reconnus qui se produisent assez rarement, mais qui peuvent avoir un impact majeur sur une organisation lorsqu'ils se produisent.
- **Contingences** – Cette catégorie fait référence à des événements qui pourraient se produire, mais pour lesquels il n'existe aucun historique. Par exemple, les opérateurs de réseau électrique planifient une défaillance des centrales nucléaires. Bien que cela ne se soit peut-être jamais produit au sein d'un pays, l'opérateur de réseau peut néanmoins vouloir se préparer à cet événement s'il devait se produire.

## Saisonnalité

Une forme différente de variabilité est saisie sous le terme général de « saisonnalité », qui se présente sous diverses formes :

- **Cycles quotidiens** – Également connus sous le nom de cycles diurnes, ils sont tous finalement liés aux cycles solaires, mais ceux-ci peuvent induire des schémas quotidiens marqués dans les activités humaines. Les cycles quotidiens sont généralement discrétisés en heures, mais des discrétisations plus fines (5 minutes, 1 minute) peuvent survenir.
- **Jour de la semaine** – Cela reflète les schémas quotidiens du comportement humain organisés autour des différents jours de la semaine.
- **Heure de la semaine** – Les schémas horaires peuvent facilement dépendre à la fois du jour de la semaine et de l'heure de la journée pour saisir des effets tels que le lundi matin, le vendredi après-midi, et les schémas quotidiens en semaine par rapport au week-end.
- **Semaine du mois** – L'industrie manufacturière a souvent une poussée pour maximiser la production par mois, créant une incitation à écouler le produit avant la fin du mois. Cela crée un pic vers la fin du mois, suivi d'une accalmie.
- **Mois de l'année** – Cela saisit les schémas saisonniers familiers de l'hiver, du printemps, de l'été et de l'automne.
- **Semaine de l'année** – Des changements saisonniers peuvent se produire au sein d'un mois, encourageant l'utilisation de la semaine de l'année comme incrément de temps saisonnier.

La figure 5.4 (gauche) montre la production d'énergie solaire au cours d'une semaine, illustrant à la fois le schéma familier et hautement prévisible créé par le soleil, qui est perturbé par la présence hautement stochastique de la couverture nuageuse. La figure 5.4 (droite) montre l'énergie solaire horaire sur toute l'année, où l'on peut clairement observer la réduction de l'énergie solaire pendant la saison hivernale.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DailyAnnualSolarEnergy.jpg" alt="Daily solar energy over a week (left), and annual solar energy (right).">
  <figcaption><span class="fig-num">Figure 5.4.</span> Énergie solaire quotidienne sur une semaine (gauche), et énergie solaire annuelle (droite).</figcaption>
</figure>

## Créer des croyances

Si nous modélisons l'incertitude sur ordinateur, nous devons trouver un moyen de la représenter. Voici plusieurs stratégies populaires.

- Les données historiques peuvent être utilisées pour ajuster une distribution de probabilité connue – Il existe toute une famille de distributions de probabilité que nous pouvons utiliser pour l'ajustement aux données historiques, la plus connue étant la distribution normale. Nous reviendrons plus tard sur ce sujet riche.
- Utiliser les données historiques pour créer un modèle de croyance échantillonné – Imaginons que nous ayons des temps de trajet allant de 50 à 80 minutes pour un déplacement, en fonction du trafic. Nous pouvons utiliser l'une de plusieurs distributions de probabilité pour représenter cette incertitude, ou nous pouvons simplement utiliser un échantillon d'observations passées, tel que :

  > (52, 63, 78, 59, 71, 68)

- Utiliser les données historiques pour créer une distribution de quantiles à partir de laquelle des échantillons peuvent être tirés – Supposons que nous ayons un échantillon de 10 observations de prix de l'électricité, donné dans la figure 5.5 (gauche). Après avoir trié les prix du plus petit au plus grand, nous montrons ensuite la probabilité cumulative donnée dans la figure 5.5 (droite). Ainsi, nous pourrions dire que 60 pour cent des observations sont de 86,33 \$ ou moins. Celles-ci sont ensuite tracées dans la distribution cumulative de droite.

  Il est également possible de créer manuellement une distribution cumulative en utilisant le jugement.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/EmpiricalCDF.png" alt="Computing an empirical CDF from a set of observations." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 5.5.</span> Calcul d'une fonction de répartition empirique à partir d'un ensemble d'observations.</figcaption>
</figure>

- Utiliser des résultats créés manuellement pour représenter des événements qui pourraient se produire – Lorsque nous n'avons pas de données, nous pouvons simplement imaginer des résultats possibles. Par exemple, nous pourrions expédier un produit depuis Taïwan, ce qui prend normalement quatre semaines. Cependant, nous pouvons envisager diverses formes de retards, des ouragans aux embouteillages au canal de Suez, aux problèmes de main-d'œuvre dans les ports, voire aux attaques terroristes. Nous pourrions estimer devoir tenir compte de la possibilité que l'expédition prenne jusqu'à neuf semaines, et planifier alors cette éventualité.

## Le problème des corrélations

La section précédente est un bref aperçu des moyens de représenter l'incertitude dans une estimation. Cependant, une fois que nous nous engageons sur la voie de la reconnaissance de l'incertitude, nous devons faire face à la question bien plus complexe des corrélations.

Il est utile d'avoir à l'esprit quelques exemples de processus d'information pour illustrer différentes formes de corrélation. Supposons que nous pourrions considérer l'un des flux de données suivants :

1. Les clients achetant un produit de vente au détail à travers de nombreux points de vente.
2. Le délai entre la passation d'une commande et sa réception.
3. L'énergie générée par un parc éolien.
4. Le taux de nouvelles infections dues à la dernière souche de grippe.
5. Le nombre de mouvements de camions complets soumis par un client vers différents lieux.

Ce ne sont là qu'une petite poignée des types de flux d'informations que nous devrons traiter. Nous utilisons ci-dessous ces exemples pour parler de trois types différents de corrélations :

- Corrélations dans le temps.
- Corrélations géographiques.
- Corrélations entre attributs.

### Corrélations dans le temps

Tous les problèmes de décision séquentielle impliquent l'élément temps, qui peut se situer à pratiquement n'importe quelle échelle de temps, des secondes, minutes, heures et jours aux semaines, mois et même années.

La corrélation dans le temps peut survenir dans chacun de nos cinq contextes de problème comme suit :

1. Une tempête de neige imminente peut créer une poussée de la demande de souffleuses à neige ; une publicité négative peut créer une période de demande réduite.
2. Une grève portuaire peut créer des arriérés qui augmentent les temps de déchargement pendant des mois.
3. Les tempêtes de pluie peuvent créer des périodes de production éolienne accrue qui peuvent durer des jours.
4. Lorsqu'un virus pénètre dans une région, il crée une période d'infections élevées qui peut durer de quelques semaines à plusieurs mois.
5. Si une usine est fermée pour maintenance, il peut y avoir une baisse des charges sortant d'un site pendant une semaine.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/CrossingTimes.png" alt="Actual vs. forecast, showing crossing times." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 5.6.</span> Réel vs. prévision, montrant les temps de croisement.</figcaption>
</figure>

La figure 5.6 illustre comment l'énergie générée par le vent peut dépasser, ou tomber en dessous, de la prévision sur une période de temps lorsque des systèmes météorologiques traversent une région. Il est important que nous reproduisions non seulement l'erreur entre le réel et le prévu, mais aussi la durée pendant laquelle nous restons au-dessus ou en dessous de la prévision, une quantité connue sous le nom de « temps de croisement ».

Il est assez courant que les signaux aléatoires soient perçus comme des variations par rapport à une moyenne de base, qui est habituellement traitée comme une constante devant être estimée. En réalité, la « moyenne de base » peut également varier, mais à une échelle de temps différente. Par exemple, les clients entrant dans un magasin de détail représentent des résultats aléatoires à une échelle de temps fine, puisque le comportement de chaque client est indépendant. Mais ils peuvent répondre à des signaux du marché (publicité, bouche-à-oreille) qui changent également, mais plus lentement.

Le plus grand défi de la corrélation dans le temps est sans doute qu'elle peut se produire à plusieurs échelles de temps, simultanément. Les événements indépendants (comme le nombre de personnes entrant dans un magasin chaque heure pour demander du sirop contre la toux) sont assez faciles à modéliser. Les variations qui se produisent à des échelles de temps plus longues sont plus difficiles car elles créent ce qui apparaît comme des corrélations dans le temps à des échelles de temps plus petites.

### Corrélations à travers la géographie

Les décisions d'achat des clients, les épidémies de maladies et la météo sont tous des exemples de processus aléatoires qui varient géographiquement. Parfois, les frontières politiques peuvent limiter les corrélations, mais la plupart du temps, c'est simplement la distance qui gouverne la force de la corrélation.

Les processus répartis spatialement se produisent généralement à très haute dimension (il y a beaucoup d'emplacements spatiaux !). Ce qui simplifie les corrélations géographiques, c'est qu'elles sont généralement assez faciles à saisir. La géographie peut être une pure fonction de la distance, mais elle peut aussi refléter des frontières géographiques ainsi que des schémas de mouvement de population. Heureusement, il existe de puissants outils mathématiques pour aider à identifier et à saisir ces corrélations.

La corrélation à travers la géographie peut survenir dans chacun de nos cinq contextes de problème comme suit :

1. La poussée de la demande de souffleuses à neige sera également régionale puisqu'elle répond aux tempêtes de neige (qui sont régionales).
2. Un retard portuaire peut produire une réduction des approvisionnements dans la région desservie par le port, avec des corrélations plus élevées pour les points plus proches du port.
3. Les tempêtes de pluie sont également régionales, et créeront des poussées d'énergie provenant des parcs éoliens dans les zones touchées par la tempête. De même, les vagues de chaleur (également régionales) produiront des périodes de faible vent.
4. La propagation de la grippe sera régionale puisqu'elle se transmet entre personnes proches les unes des autres.
5. Le fret est généré soit par des changements dans une usine de fabrication (qui est située en un point donné), soit par des changements de la demande, qui peuvent être motivés par des forces régionales.

### Corrélations entre attributs

La plupart de nos exemples impliquent des activités caractérisées par un ensemble d'attributs :

1. La demande de vêtements aura des corrélations entre des vêtements de style similaire mais de couleurs différentes.
2. Les produits qui partagent des intrants communs (comme les matériaux pour les vêtements, les puces pour les voitures, les terres rares pour les moteurs) peuvent présenter des retards de délai similaires en cas de pénurie de l'intrant.
3. (Aucune utilisation apparente de la corrélation entre attributs pour l'énergie éolienne.)
4. Les nouvelles infections peuvent être corrélées entre les personnes qui partagent des caractéristiques telles que l'âge ou des conditions médicales.
5. Le flux de mouvements de camions complets peut être corrélé lorsqu'ils transportent des matières premières ou des produits communs.

Il arrive souvent que, lorsque nous développons tous les attributs, nous nous retrouvions avec tant de combinaisons que le nombre d'observations pour une combinaison particulière d'attributs peut être assez faible, voire nul. Ces problèmes se prêtent bien à l'utilisation de méthodes d'estimation hiérarchiques, où nous créons différentes séries temporelles en négligeant un ou plusieurs attributs, puis en utilisant des combinaisons pondérées.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Nommez les 12 classes d'incertitude, en donnant un exemple de chacune tiré d'une application quelconque.</li>
<li>Nommez sept formes d'incertitude pouvant décrire des processus aléatoires, et décrivez un contexte susceptible de produire chacune d'elles.</li>
<li>Quelles sont les façons dont l'incertitude peut affecter la performance d'un système, et donnez un exemple de chacune.</li>
<li>Nommez quatre formes de saisonnalité.</li>
<li>Créez une distribution cumulative des vitesses du vent à partir des observations suivantes :
<p>(17, 8, 2, 12, 9, 28, 10, 8, 35, 12, 15)</p>
</li>
</ol>

**Questions de modélisation**

<p>Pour chacune des questions ci-dessous, essayez de trouver autant de formes d'incertitude que possible au sein de chacune des classes pour les situations suivantes, en suivant les tableaux présentés dans la <a href="#examples-from-selected-applications">section ci-dessus</a>.</p>

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Le problème de planification des stocks au <a href="/bridging-vol1/fr/chapter-2/#inventoryplanning">Chapitre 2</a>.</li>
<li>Le problème de gestion de la demande de meubles au <a href="/bridging-vol1/fr/chapter-2/#demandmanagementfurniture">Chapitre 2</a>.</li>
<li>La planification des essais cliniques au <a href="/bridging-vol1/fr/chapter-2/#clinicaltrials">Chapitre 2</a>.</li>
<li>La tenue d'une élection présidentielle au <a href="/bridging-vol1/fr/chapter-2/#presidentialelection">Chapitre 2</a>.</li>
<li>Le financement de la chaîne d'approvisionnement au <a href="/bridging-vol1/fr/chapter-2/#supplychainfinance">Chapitre 2</a>.</li>
<li>Choisissez une problématique de votre choix, idéalement présentant une certaine complexité, et identifiez autant de types d'incertitude que possible en utilisant les 12 classes comme guide.</li>
</ol>
{% endraw %}
