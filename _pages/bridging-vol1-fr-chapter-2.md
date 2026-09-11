---
layout: book
title: "Chapitre 2 : Applications"
permalink: /bridging-vol1/fr/chapter-2/
date: 2026-07-17
book_home: /bridging-vol1/fr/contents/
book_data: bridging_vol1_toc_fr
lang: fr
translated_from: en
translated_from_hash: 021eb6b21e0b2ae0
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

La première étape pour améliorer un produit, un processus ou un service consiste à en fournir une description de base, puis à identifier les indicateurs de performance possibles, les types de décisions et les sources d'incertitude. Nous allons illustrer ces premières étapes à l'aide d'une variété de contextes d'application. Nous nous appuierons ensuite sur ces applications tout au long du reste du livre pour illustrer différents dispositifs de modélisation.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PowellApplications.png" alt="Une illustration des nombreux contextes de prise de décision." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 2.1.</span> Une illustration des nombreux contextes de prise de décision.</figcaption>
</figure>

La beauté des problèmes de décision séquentielle réside dans le fait qu'ils surgissent dans toutes les activités impliquant des personnes. La Figure 2.1 est un aperçu de quelques-uns des contextes de problèmes qui décrivent les activités de l'auteur, et qui ont servi de fondement motivationnel pour le travail présenté dans ce livre. Chaque image représente une multitude de problèmes de décision. Cela contraste fortement avec des classes de problèmes telles que la programmation linéaire, en nombres entiers et non linéaire, qui sont des outils importants et puissants, mais qui ne résolvent qu'un sous-ensemble très restreint de problèmes de décision.

Nous notons qu'il existe un biais naturel à se focaliser sur la gestion des ressources physiques, car c'est ce que nous voyons. Certes, la gestion des ressources physiques offre de nombreuses opportunités de prendre de meilleures décisions, mais il existe d'autres décisions qui portent directement sur la collecte d'informations, ainsi que sur la gestion des flux financiers, souvent considérables, nécessaires pour soutenir ces opérations.

Dans ce chapitre, nous allons passer en revue les contextes de problèmes suivants :

- Planification des stocks
- Gestion de la demande
- Gestion de l'énergie électrique
- Gestion des revenus hôteliers
- Applications en santé
- Élections présidentielles
- Gestion de flotte de camions complets
- Gestion de trésorerie de fonds communs de placement
- Financement de la chaîne d'approvisionnement
- Essai-erreur intelligent (nombreux contextes)

Beaucoup de ces domaines peuvent être décrits comme des méta-domaines de problèmes, puisqu'ils contiennent des sous-domaines qui, à eux seuls, représentent des champs majeurs de l'activité humaine. Notre objectif est de créer un ensemble diversifié d'applications, en partie pour illustrer l'étendue des problèmes qui relèvent du parapluie des problèmes de décision séquentielle, et en partie pour fournir un ensemble diversifié de contextes de décision qui motiveront le cadre de modélisation que nous présenterons dans le reste du livre.

À ce stade, nous ne sommes pas encore prêts à décrire des modèles complets – cela viendra dans le Volume II. Pour chaque application, nous allons proposer des réponses aux trois questions du processus de cadrage, en reconnaissant qu'il ne s'agit là que d'un échantillon destiné à amener le lecteur à réfléchir au processus.

## Pour commencer – cadrer le problème

Il est très courant de discuter de problèmes complexes en utilisant une terminologie générale. La Figure 2.2 (préparée par ChatGPT) répond à la question :

> *Préparez une discussion d'une page sur la manière dont une entreprise devrait réagir à une hausse soudaine des tarifs douaniers qui perturbera sa chaîne d'approvisionnement.*

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTrespondtoTariff.png" alt="La version de ChatGPT sur la manière dont une chaîne d'approvisionnement devrait répondre aux hausses de tarifs douaniers.">
  <figcaption><span class="fig-num">Figure 2.2.</span> La version de ChatGPT sur la manière dont une chaîne d'approvisionnement devrait répondre aux hausses de tarifs douaniers.</figcaption>
</figure>

Le problème avec ces discussions générales est qu'elles ne fournissent jamais de voie claire pour améliorer le processus. Tout ce qui est dit est probablement vrai, mais cela manque d'actions spécifiques pouvant être entreprises pour résoudre un problème. La réponse fournie par ChatGPT (en 2025) reflète le type de discours générique largement répandu dans les livres d'affaires, qui ne pourrait jamais constituer la base d'un modèle formel.

Ce chapitre illustre la première étape du cadrage du problème, qui comprend quatre éléments :

- **Le récit :** Il s'agit d'une courte discussion qui décrit un problème dans le style que pourrait utiliser une personne évoluant dans le domaine du problème.
- **Les indicateurs de performance :** Nous fournissons une liste d'indicateurs de performance qui devront être hiérarchisés (ce point est traité au Chapitre 3).
- **Les décisions :** Nous fournissons ensuite une liste de décisions qui ont un impact sur un ou plusieurs indicateurs. Les décisions sont traitées au Chapitre 4.
- **Les incertitudes :** Enfin, nous décrivons les formes d'incertitude qui peuvent altérer l'effet d'une décision lors de sa mise en œuvre, ou au fur et à mesure que le processus progresse dans le temps. Les incertitudes sont traitées au Chapitre 5.

À ce stade, nous n'allons pas essayer de décrire comment nous pourrions résoudre le problème (c'est-à-dire prendre les décisions). Pour cela, nous avons besoin d'autres éléments qui seront développés plus loin. L'objectif à ce stade est d'utiliser une variété de contextes de problèmes pour illustrer, de manière générale, le processus d'identification des indicateurs, des décisions et des incertitudes. L'identification de ces trois éléments est la clé pour résoudre tout problème de décision, il faut donc d'abord développer l'habitude de les identifier.

## Capturer les interactions {#capturinginteractions}

Bien que l'identification des indicateurs, des décisions et des incertitudes constitue un point de départ précieux, il est également important de comprendre comment ils interagissent.

- **L'effet des décisions sur les indicateurs** – Chaque décision devrait avoir un impact sur au moins un indicateur, et chaque indicateur devrait être affecté par au moins une décision.
- **L'incertitude dans les indicateurs de performance compte tenu des décisions** – Nous pourrions vouloir le chemin le plus court, mais le temps de trajet dépend de la congestion ; nous pourrions vouloir choisir un médicament qui réduira une infection, mais un patient peut ne pas répondre à un traitement particulier ; un investisseur ne peut pas prédire le rendement exact lors de l'achat d'une action.
- **L'incertitude peut contraindre les décisions que nous pouvons prendre** – Une entreprise de camionnage doit déplacer des chargements, mais ceux-ci sont annoncés de manière aléatoire ; un hôtel peut conserver des chambres pour les voyageurs d'affaires qui peuvent réserver ou non ; un service public peut compter sur l'énergie éolienne, mais la quantité d'énergie qui peut être produite est incertaine.
- **L'incertitude modifie la dynamique de l'évolution du système dans le temps** – La maladie au sein d'une population peut se propager de manière incertaine ; l'économie peut évoluer de manière incertaine, affectant la valeur du dollar ; un comportement incertain des concurrents peut réduire les ventes.

### Impact des décisions sur les indicateurs

Un exercice utile consiste à créer une feuille de calcul où différentes décisions sont listées à gauche et les indicateurs sont listés en haut. Ensuite, en s'appuyant uniquement sur le jugement, on entre l'une des valeurs suivantes dans chaque cellule pour représenter ce que l'on pense être l'impact de chaque décision sur chaque indicateur :

- **H** – La décision a un impact élevé sur l'indicateur.
- **M** – La décision a un impact moyen sur l'indicateur.
- **L** – La décision a un impact faible sur l'indicateur.
- **N** – La décision n'a aucun impact sur l'indicateur.

Le Tableau 2.1 illustre à quoi cela pourrait ressembler pour un petit problème de stock. La feuille de calcul peut être téléchargée à l'adresse [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.1.</span> Matrice d'interaction entre décisions et indicateurs pour un problème de stock avec des délais courts.</caption>
<thead>
<tr><th>Décisions \ Indicateurs</th><th>Revenus des ventes</th><th>Coûts des produits</th><th>Coûts de stockage</th><th>Ruptures de stock</th></tr>
</thead>
<tbody>
<tr><td>Quand/combien commander</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Acheter une couverture de change ?</td><td class="hml-n">N</td><td class="hml-l">L</td><td></td><td class="hml-n">N</td></tr>
<tr><td>Remise</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Faire la promotion du produit sur les réseaux sociaux</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

Commencez par lister les indicateurs de gauche à droite par ordre d'importance. Nous allons ensuite utiliser la matrice pour identifier les décisions les plus importantes, ainsi que les indicateurs les plus affectés par les décisions que vous avez listées.

La matrice d'interaction peut être utilisée de deux manières :

1. Lister toutes les décisions, puis évaluer l'impact de chaque décision sur chaque indicateur. À partir de là, identifier les décisions qui semblent avoir l'impact le plus important sur les indicateurs les plus importants.
2. Pour les problèmes complexes, lister toutes les décisions peut s'avérer peu pratique. Utilisez plutôt l'ensemble des indicateurs pour aider à identifier les décisions les plus pertinentes pour le problème. Revenez ensuite au point (1) pour hiérarchiser les décisions les plus importantes.

L'exercice consistant à remplir des tableaux comme celui-ci peut aider à guider le processus de compréhension du rôle que jouent les décisions dans l'amélioration de la performance, avant de passer à l'étape coûteuse et complexe de la collecte de données et de la construction d'un modèle informatique.

### Impact de l'incertitude compte tenu de la décision

Imaginons que nous ayons pris une décision (ce qui signifie qu'elle est fixée). Nous devons comprendre les formes d'incertitude qui affectent les indicateurs produits par la décision. Pour notre problème de stock simple (avec délai court), nous pourrions obtenir la matrice donnée au Tableau 2.2.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.2.</span> Matrice d'interaction entre incertitudes et indicateurs compte tenu d'une décision, pour un problème de stock avec des délais courts.</caption>
<thead>
<tr><th>Incertitude \ Indicateurs</th><th>Revenus des ventes</th><th>Coûts unitaires</th><th>Coûts de stockage</th><th>Ruptures de stock</th></tr>
</thead>
<tbody>
<tr><td>Ventes (unités vendues)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Délais</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Erreurs de prévision</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Démarque des stocks</td><td class="hml-m">M</td><td class="hml-n">N</td><td></td><td class="hml-n">N</td></tr>
</tbody>
</table>
</div>

Modéliser l'incertitude signifie simplement comprendre les informations qui pourraient survenir dans le futur et que nous ne connaissons pas encore. Cette observation simple est souvent négligée dans les discussions sur l'incertitude, qui peuvent se retrouver noyées dans des mathématiques sophistiquées (« modélisation stochastique ») et dans la quantification du risque (que peu de gens comprennent).

Comme pour les décisions, nous pouvons commencer par lister toutes les sources d'incertitude auxquelles nous pouvons penser, puis utiliser la matrice d'interaction pour hiérarchiser celles qui sont les plus importantes. Alternativement, nous pouvons utiliser notre ensemble d'indicateurs pour orienter l'identification des sources d'incertitude importantes.

### Impact de l'incertitude sur les décisions

<figure class="book-figure" style="float:right; max-width: 221px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/AssignmentProblemsimple.png" alt="Un problème d'affectation simple.">
  <figcaption><span class="fig-num">Figure 2.3.</span> Un problème d'affectation simple.</figcaption>
</figure>

Le contexte le plus courant où l'incertitude a un impact sur les décisions que vous êtes autorisé à prendre survient dans le cadre des problèmes d'allocation de ressources, où nous gérons une ressource (personnes, machines, approvisionnements en produits, médicaments) pour servir des tâches (emplois, patients, clients). Dans la Figure 2.3, nous illustrons l'affectation de camions (avec conducteurs) pour déplacer des chargements de fret. La principale source d'incertitude est le flux de chargements annoncés par les expéditeurs à transporter, mais il pourrait s'agir de n'importe quelle tâche. Nous pourrions affecter un conducteur à un chargement peu attractif en termes de rentabilité, mais qui immobilise le conducteur pendant plusieurs jours, l'empêchant d'être utilisé pour un meilleur chargement qui pourrait être annoncé plus tard dans la journée.

Le flux de demandes des clients est une source majeure d'incertitude qui apparaît dans :

- Gestion de la chaîne d'approvisionnement (demande de produits).
- Santé (patients nécessitant un traitement).
- Hôtellerie (demandes de chambres à louer).
- Énergie (la demande d'électricité ou de gaz pour le chauffage).
- Finance (dépôts et retraits d'espèces).

Une caractéristique importante du flux de demandes à servir est la manière dont ces demandes deviennent connues du système. Certaines variations incluent :

- Aucun préavis, service immédiat (ventes de tout produit de détail).
- Aucun préavis, report possible (achats en ligne).
- Demande anticipée, engagement immédiat requis (réservation de chambres d'hôtel).
- Engagement anticipé avec conditions d'annulation (achats coûteux, comme les avions).

Il peut également exister une incertitude sur la disponibilité des ressources utilisées pour satisfaire les clients :

- Les médecins, les infirmiers/infirmières peuvent être malades.
- Les machines peuvent tomber en panne.
- Un chauffeur de camion peut refuser une affectation pour déplacer une charge.
- Un investissement peut perdre de la valeur.

### Incertitude dans la dynamique du système

Tout ce que nous savons à un instant donné peut changer lorsque nous avançons dans le temps, et si cela change, nous sommes généralement incertains quant à la façon dont cela évolue. Voici quelques exemples d'incertitude dans l'évolution du système :

- Changements dans les coûts, les prix et d'autres indicateurs de performance.
- Changements dans le statut des personnes, des équipements et des installations au fil du temps. Les personnes peuvent démissionner ou tomber malades, les équipements peuvent tomber en panne, une installation peut être endommagée lors d'une tempête.
- Changements dans les attitudes du marché, la présence d'une maladie dans une population, la façon dont les gens pourraient voter pour un candidat.

Il est important de reconnaître que l'incertitude sur la façon dont le système évolue dans le temps peut être divisée en deux catégories :

- L'incertitude dans la *fonction* décrivant l'évolution du système. Certains appellent cela « l'incertitude du modèle ». Si nous gérons la distribution de vaccins, nous pouvons utiliser différents modèles pour décrire la propagation de la maladie dans le système. Lorsque nous planifions des évacuations pour un ouragan, nous pouvons choisir parmi différents modèles de progression de la tempête.
- L'incertitude dans les *paramètres* qui déterminent le comportement de la fonction.

### Incertitude dans les prévisions

Il existe de nombreux problèmes (mais pas tous) où prendre une décision maintenant nécessite de projeter ce qui pourrait se passer à l'avenir. Bien sûr, l'avenir est presque toujours incertain, mais c'est à nous de choisir d'utiliser une « meilleure estimation » de ce qui pourrait se passer à l'avenir, ou de modéliser explicitement cette incertitude pour nous aider à prendre une décision maintenant. Nous revenons sur cette question au Chapitre 4 lorsque nous discutons des façons de prendre des décisions.

### Commentaires

L'incertitude est sans doute la question la plus subtile lorsqu'il s'agit de comprendre un problème de décision. Souvent, les gens ont une intuition qu'un type d'incertitude est important ; cette section aide à affiner la manière dont une forme d'incertitude affecte réellement un problème de décision.

## Planification des stocks {#inventoryplanning}

### Récit

L'un des problèmes les plus largement étudiés en recherche opérationnelle (ainsi qu'en optimisation stochastique) est le problème de gestion des stocks, généralement posé comme la détermination du moment où passer une commande de réapprovisionnement, et de la taille que devrait avoir cette commande. La description classique de manuel d'un problème de réapprovisionnement des stocks est illustrée à la figure 2.4, qui montre l'augmentation des stocks lorsque de nouveaux produits arrivent, suivie de leur épuisement à mesure que le produit est consommé. Une rupture de stock, où le stock tombe à zéro, est représentée.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SimpleInventory.jpg" alt="Illustration of a classical inventory problem with short lead times." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figure 2.4.</span> Illustration d'un problème de gestion des stocks classique avec des délais courts.</figcaption>
</figure>

Une version plus réaliste d'un problème de gestion des stocks est illustrée à la figure 2.5, qui représente un problème de stocks qui pourrait survenir dans un contexte où le produit provient d'un lieu éloigné (par exemple de Chine vers l'est des États-Unis). Il peut nous falloir attendre 6 à 8 semaines, mais les retards liés aux conditions météorologiques peuvent encore prolonger ce délai. Le transport longue distance implique généralement des mouvements par porte-conteneurs pour les trajets port à port, par rail (courant aux États-Unis), puis par camion.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ComplexInventory.jpg" alt="Illustration of an inventory problem with long lead times.">
  <figcaption><span class="fig-num">Figure 2.5.</span> Illustration d'un problème de gestion des stocks avec des délais longs.</figcaption>
</figure>

La planification des stocks doit être coordonnée avec les stratégies de gestion de la demande, qui peuvent être influencées par la tarification, les remises, les promotions et le marketing. La gestion des stocks doit faire face à un certain nombre de sources d'incertitude, allant de la variabilité habituelle au jour le jour de la demande, aux changements du marché dus au comportement des concurrents, aux nouvelles technologies, ainsi qu'à la perte de fournisseurs et à l'émergence de nouvelles sources d'approvisionnement. De plus, il peut y avoir des variations importantes dans les délais de transport dues aux conditions météorologiques, aux pannes mécaniques et aux actions syndicales dans les ports. Les retards excessifs peuvent être gérés en utilisant des modes rapides tels que le fret aérien comme alternative au transport par conteneurs, et le camionnage en charge complète comme alternative au rail.

### Indicateurs

Nous séparons les indicateurs entre « indicateurs de base », qui sont saisis par le biais d'un reporting de routine, et les « indicateurs de risque » qui rendent compte spécifiquement d'événements significatifs (généralement négatifs) qui, de l'avis de la direction, ne sont pas correctement pris en compte dans les indicateurs de base.

- **Indicateurs de base**
  - Coûts de détention des stocks, qui couvrent une gamme d'éléments incluant le coût du capital immobilisé dans les stocks, les coûts d'entreposage (chauffage/climatisation, main-d'œuvre de manutention, frais généraux de l'entrepôt et de l'équipement), les coûts d'assurance, les coûts liés à la détérioration, au vol, à l'obsolescence.
  - Coûts d'expédition, incluant l'emballage, le transport et l'assurance.
  - Revenus liés à la satisfaction de la demande, qui doivent refléter toute remise.
  - Indicateurs de précision des prévisions.
  - Indicateurs de service client, tels que la demande retardée ou perdue non satisfaite en raison d'un manque de stock, et les retours de produits (par exemple, en raison de problèmes de qualité).
  - Coûts des promotions, coupons, marketing et publicité.
  - Utilisation des installations (sont-elles pleines ?), du personnel et de l'équipement.
  - Questions de main-d'œuvre, incluant la productivité de la main-d'œuvre, le besoin d'heures supplémentaires, les coûts d'embauche et les licenciements.
- **Indicateurs de risque**
  - Risques de change lorsque le produit est acheté auprès d'un autre pays dans une devise différente.
  - Ruptures de stock importantes qui poussent les clients vers des produits concurrents.
  - Vol, cyberattaques.
  - Perturbations importantes (interruptions chez un fournisseur, dommages aux installations) empêchant la livraison aux clients ou l'emploi.

### Décisions

Il est utile d'organiser les décisions selon que l'on résout un problème de stock unique, ou que l'on traite des questions au niveau du réseau. Les modèles de gestion des stocks des manuels se concentrent généralement sur des décisions opérationnelles telles que le moment de passer une commande et sa quantité. Cependant, la perspective change lorsque nous avons de longs délais, où une décision prise maintenant a un impact sur le système plusieurs mois plus tard.

La liste des décisions pertinentes pour la planification des stocks est assez longue. Dans la [section sur les interactions ci-dessous](#inventorydecisioninteractions), nous allons utiliser un outil que nous appelons « matrices d'interaction » pour identifier les décisions les plus importantes.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.3.</span> Décisions opérationnelles en matière de stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financière</th><th>Informationnelle</th></tr>
</thead>
<tbody>
<tr><td>S'il faut observer/vérifier le stock</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>À qui, parmi l'ensemble des fournisseurs disponibles, passer la commande (s'il y a plusieurs fournisseurs)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Quand passer une commande de réapprovisionnement.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Quelle quantité commander.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Comment l'emballer (conteneur maritime, demi-conteneur, palettes, boîtes).</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Comment financer la commande (transfert de fonds, prêt bancaire, ...)</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Le choix des modalités de transport pour les produits de l'étranger vers les installations de stockage intermédiaires</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Le choix des modalités de transport pour la distribution nationale vers les clients</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.4.</span> Décisions tactiques en matière de stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financière</th><th>Informationnelle</th></tr>
</thead>
<tbody>
<tr><td>S'il faut acheter des couvertures de change pour les produits venant de l'étranger.</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Remises/promotions (pour réduire les stocks)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Tarification des produits.</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Marketing/présentoirs (espace en rayon, présentoir en tête de gondole, publicité (diverses formes))</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Réalisation de tests de marché pour les caractéristiques, le design, ...</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Conception et mise en œuvre d'une campagne marketing</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Choix du fournisseur (pour chaque matériau ou composant), y compris s'il faut avoir plusieurs fournisseurs. Cela détermine les fournisseurs possibles.</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Maintenance des équipements (augmente le temps d'arrêt planifié, diminue le temps d'arrêt non planifié)</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.5.</span> Décisions stratégiques en matière de stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financière</th><th>Informationnelle</th></tr>
</thead>
<tbody>
<tr><td>Contrats avec des plateformes de visibilité des stocks (où se trouve mon envoi) ?</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Choix de la méthodologie de prévision de la demande (méthodes statistiques, implication de différentes personnes à travers l'organisation).</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Conception du produit (qui détermine les matériaux et composants requis)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Identification du marché (à qui vendons-nous)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Quel niveau de connectivité (partage d'information) rechercher avec les partenaires de la chaîne d'approvisionnement de fabrication</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

#### Problème de stock unique

Ces décisions sont prises à différentes échelles de temps : opérationnelle (horaire, quotidienne, hebdomadaire), tactique (mensuelle), et stratégique (trimestrielle, annuelle).

- **Opérationnelle** - Il s'agit de décisions qui pourraient être prises en temps réel, mais qui sont généralement prises quotidiennement ou hebdomadairement (tableau 2.3).
- **Tactique** - Décisions prises sur une base mensuelle (tableau 2.4).
- **Stratégique** - Décisions prises sur une base trimestrielle ou annuelle (tableau 2.5).

#### Conception de la chaîne d'approvisionnement

Il existe des décisions liées à la conception des réseaux de chaîne d'approvisionnement qui traversent de nombreuses (des dizaines à des milliers) décisions individuelles en matière de stocks. Ce sont des décisions qui sont généralement prises à des échelles de temps plus longues. Le tableau 2.6 fournit quelques exemples de décisions au niveau du réseau pour la conception de la chaîne d'approvisionnement.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.6.</span> Décisions de conception de la chaîne d'approvisionnement au niveau du réseau et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financier</th><th>Informationnel</th></tr>
</thead>
<tbody>
<tr><td>Où localiser les stocks tampons et comment les rééquilibrer</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Fermeture d'installations existantes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Où acheter/louer/construire/agrandir des installations de fabrication</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Quelles installations de fabrication fermer/vendre, résilier les baux</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Où acheter/louer/construire/agrandir des entrepôts et centres de distribution</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Faut-il introduire l'automatisation de la manutention des matériaux dans les centres de distribution et entrepôts</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Investissement dans les technologies de l'information pour le partage d'informations et la coordination</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Mettre en place une ligne de crédit importante ou une autre source de financement de secours</td><td></td><td>&#10003;</td><td></td></tr>
</tbody>
</table>
</div>

### Incertitudes

Les incertitudes surviennent également à différentes échelles temporelles. Nous incluons une catégorie spéciale pour les perturbations majeures qui peuvent survenir, mais pas de manière régulière.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.7.</span> Incertitudes horaires-à-quotidiennes sur les stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financier</th><th>Informationnel</th></tr>
</thead>
<tbody>
<tr><td>Variations quotidiennes de la demande des clients</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erreurs de mesure des stocks</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>« Rétrécissement » des stocks (vol, perte, détérioration, casse, ...)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Rendement de l'expédition (combien d'articles/quelle quantité de matériel respectait les spécifications)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Retards de transport dus aux conditions météorologiques, aux pannes d'équipement</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erreurs de prévision</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Coût des matières premières</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Coût des intrants provenant des fournisseurs</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Coupures d'électricité (énergie, carburants)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Erreurs de communication, erreurs d'exécution humaine</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Variations quotidiennes du cours de l'action de l'entreprise</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Fraude financière dans les transactions individuelles</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Disponibilité quotidienne de la capacité disponible à l'allocation</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.8.</span> Incertitudes hebdomadaires sur les stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financier</th><th>Informationnel</th></tr>
</thead>
<tbody>
<tr><td>Déplacements de la demande moyenne dus aux évolutions technologiques, au comportement des concurrents, aux évolutions du marché</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements du prix de vente d'un produit (affecte la demande et les flux de profit)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Changements des prix des matières premières</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Comment le marché réagit aux changements de prix</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Retards dus aux grèves dans les ports, les gares de triage, les points de passage internationaux</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements de comportement des grands clients</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements d'attitude à Wall Street (par exemple, passage de la « croissance » à la « stabilité » puis à la « récession »)</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.9.</span> Incertitudes mensuelles-à-annuelles sur les stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financier</th><th>Informationnel</th></tr>
</thead>
<tbody>
<tr><td>Émergence de nouvelles technologies de l'information (AWS, IA, plateformes de visibilité)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Émergence de nouvelles technologies de fabrication/manutention des matériaux (par exemple, la robotique)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Émergence de nouveaux concurrents</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements dans les schémas démographiques (par exemple, la croissance de l'immigration)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements dans les schémas de demande (augmentation de la demande pour des produits haut de gamme)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Traités régissant le commerce</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Changements dans la disponibilité de la main-d'œuvre</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.10.</span> Incertitudes liées aux perturbations majeures sur les stocks et catégorie de ressource principalement affectée par chacune.</caption>
<thead>
<tr><th></th><th>Physique</th><th>Financier</th><th>Informationnel</th></tr>
</thead>
<tbody>
<tr><td>Émergence de nouvelles technologies de l'information (AWS, IA, plateformes de visibilité)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Émergence de nouvelles technologies de fabrication/manutention des matériaux (par exemple, la robotique)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Émergence de nouveaux concurrents</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements dans les schémas démographiques (par exemple, la croissance de l'immigration)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Changements dans les schémas de demande (augmentation de la demande pour des produits haut de gamme)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Traités régissant le commerce</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Changements dans la disponibilité de la main-d'œuvre</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

*(Note : la figure source du tableau 2.10 s'affiche de manière identique au tableau 2.9 — signalé pour vérification par rapport au manuscrit ; le contenu de la ligne « perturbations majeures » pourrait devoir être remplacé à partir d'un autre fichier source.)*

L'identification des différentes sources d'incertitude constitue un domaine particulièrement riche pour des problèmes complexes tels que les chaînes d'approvisionnement. Non seulement il existe un large éventail d'incertitudes, mais elles se présentent sous différentes formes telles que la volatilité à grain fin, les changements de régime, les pics, les rafales et les événements rares. Nous examinons ces comportements plus en détail au Chapitre 5.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.11.</span> Matrice d'interaction pour les décisions et les métriques d'un problème de stock avec de longs délais de livraison.</caption>
<thead>
<tr><th>Décisions \ Métriques</th><th>Chiffre d'affaires des ventes</th><th>Coûts des produits</th><th>Coûts de détention</th><th>Ruptures de stock</th><th>Rotations des stocks</th><th>Marge opérationnelle</th><th>Croissance des ventes</th></tr>
</thead>
<tbody>
<tr><td>Quand/combien commander</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Acheter une couverture de change ?</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-n">N</td></tr>
<tr><td>Remise</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Commercialiser le produit sur les réseaux sociaux</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Choix du fournisseur</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Tarification</td><td class="hml-h">H</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Couvertures de change ?</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Capteurs de stock</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Utiliser des plateformes de visibilité pour suivre les produits entrants ?</td><td></td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Conception du produit</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
</tbody>
</table>
</div>

### Interactions {#inventorydecisioninteractions}

Un exercice puissant qui aide à développer une compréhension des différents éléments des problèmes de décision consiste à évaluer subjectivement l'intensité des différents types d'interactions, une idée que nous avons introduite pour la première fois dans la [section sur la capture des interactions ci-dessus](#capturinginteractions). Nous commençons par décrire les interactions entre les décisions et les métriques pour un problème de stock avec de longs délais de livraison, présenté dans le tableau 2.11. Nous soulignons que le remplissage de cette matrice est entièrement subjectif, car il nous aide à identifier les décisions les plus importantes, ainsi que les métriques que nous avons le plus de chances d'améliorer.

Ce que nous faisons, c'est remplacer ce qui est souvent une étape totalement invisible consistant à choisir sur quelles décisions se concentrer, par un processus qui rend ce choix explicite, même s'il est effectué subjectivement.

La matrice d'interaction pour les incertitudes et les métriques étant donné une décision pourrait ressembler à celle présentée dans le tableau 2.12. Ici, nous prenons soin de maintenir une décision fixe afin d'éviter de mélanger l'effet que l'incertitude a sur la décision que nous prenons.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tableau 2.12.</span> Matrice d'interaction pour les incertitudes et les métriques étant donné une décision pour un problème de stock avec de longs délais d'approvisionnement.</caption>
<thead>
<tr><th>Incertitude \ Métriques</th><th>Chiffre d'affaires des ventes</th><th>Coûts unitaires</th><th>Coûts de possession</th><th>Ruptures de stock</th><th>Rotation des stocks</th><th>Marge opérationnelle</th><th>Croissance des ventes</th></tr>
</thead>
<tbody>
<tr><td>Ventes (unités vendues)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Délais d'approvisionnement</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Erreurs de prévision</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-l">L</td></tr>
<tr><td>Démarque des stocks</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Changements dans les prix des matières premières</td><td class="hml-n">N</td><td class="hml-h">H</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">L</td></tr>
<tr><td>Réponse du marché au prix</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Arrêts de travail</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Comportement tarifaire des concurrents</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

## Gestion de la demande – vente de meubles {#demandmanagementfurniture}

### Narratif

L'autre facette de la gestion du flux de marchandises à travers les différentes étapes de fabrication et de distribution est le défi de la gestion de la demande. Les plus grands producteurs de meubles sont la Chine (de loin), les États-Unis (principalement pour la consommation domestique), l'Allemagne (principalement pour l'Europe), l'Italie (meubles haut de gamme) et la Pologne (meubles à coût réduit). Les vendeurs de meubles doivent composer avec de longs délais d'approvisionnement, une demande fortement saisonnière et la personnalisation, ainsi qu'un marché concurrentiel. Bien qu'ils utilisent tous les outils habituels pour gérer le flux de produits physiques, il est important d'utiliser diverses stratégies de gestion de la demande pour aider à équilibrer l'offre avec le marché.

Parmi les problématiques liées à la demande auxquelles les vendeurs de meubles doivent faire face, on trouve :

- Une demande fortement variable, due en partie aux variations dans le nombre de personnes emménageant dans de nouveaux logements.
- L'évolution des préférences des clients, qui répondent aux tendances de design et aux styles changeants, ainsi qu'aux nouveaux produits et matériaux.
- La sensibilité au prix, qui reflète à la fois l'état de l'économie et la concurrence.
- La réponse du marché à la publicité et à la visibilité sur les réseaux sociaux.
- Les stratégies d'optimisation pour les moteurs de recherche.
- Les partenariats avec des influenceurs en décoration intérieure qui peuvent mettre en valeur les produits.
- La capacité à offrir des remises et des promotions pour réduire les stocks excédentaires.

### Métriques

Les métriques dépendent toujours de la perspective de la personne évaluée, mais certaines de celles que l'on pourrait attendre dans ce contexte sont :

- Les ventes (en unités, et chiffre d'affaires total).
- Le revenu net – les ventes, moins le coût des marchandises et de la publicité.
- Les ruptures de stock, les retards dans l'exécution des commandes.
- Le trafic web – il existe un certain nombre de métriques utilisées pour évaluer les portails de commerce électronique, telles que les visites, les taux de clics, les taux de rebond, le temps passé sur le site, et les conversions.
- Le nombre de mentions « j'aime », de partages, de commentaires, ainsi que les mentions de marque et l'analyse de sentiment dans les discussions en ligne.
- L'engagement – l'utilisation d'aperçus en réalité virtuelle.

### Décisions

Nous nous imaginons être le gérant de magasin d'un magasin de meubles :

- Quels articles de meubles stocker.
- La tarification.
- Les promotions et remises – par exemple, une remise pour un ensemble de meubles.
- Les canaux marketing à utiliser – réseaux sociaux, télévision, publipostage, marketing en magasin.
- Les budgets marketing pour chaque canal.
- Les tests A/B des conceptions de pages web.
- La réalisation d'enquêtes de marché – proposer des offres spécifiques dans un sous-ensemble de magasins.
- Les décisions de dotation en personnel (combien, quelles compétences).

### Incertitudes

Voici quelques exemples d'incertitudes pouvant survenir dans la vente de meubles :

- Les écarts entre la demande réelle et la prévision pour les meubles à différents niveaux d'agrégation.
- Les délais d'approvisionnement.
- Les problèmes de qualité des produits.
- La réponse du marché au prix, aux remises et aux promotions.
- La volonté des clients de substituer des produits de qualité supérieure ou inférieure.
- Les variations des préférences des consommateurs.
- Les variations du trafic web et des taux de conversion.

## Gestion du réseau électrique

### Narratif

Les systèmes énergétiques constituent un terme générique désignant le vaste réseau qui fournit l'énergie soutenant la société moderne. Nous allons concentrer notre attention sur le flux d'électricité, qui inclut la production d'électricité pouvant provenir de différentes sources, principalement le gaz (mais aussi encore un peu de charbon et de pétrole), le nucléaire, et une présence croissante de l'énergie éolienne, solaire et hydroélectrique.

L'épine dorsale de tout système électrique est le réseau électrique, qui se compose de lignes de transmission à haute capacité qui déplacent l'électricité sur de longues distances à haute tension, de 69 kV (c'est-à-dire 69 000 volts) jusqu'à 345 kV, avec des lignes à très haute tension pouvant atteindre 765 kV. L'électricité est ensuite acheminée vers les entreprises et les résidences à l'aide de réseaux de distribution locaux avec des tensions comprises entre 4 kV et 14 kV.

L'électricité provient d'une « flotte » de générateurs d'énergie pouvant inclure le nucléaire, le charbon, les générateurs à vapeur et les turbines à gaz, ainsi que l'énergie hydroélectrique (on retrouve une forte empreinte du vocabulaire naval en raison de la présence de l'énergie nucléaire). Ces générateurs se distinguent par la rapidité avec laquelle ils peuvent être mis en marche (« dispatchés ») ou arrêtés, et par la facilité avec laquelle ils peuvent fonctionner plus vite ou plus lentement. Les autres caractéristiques importantes sont le coût fixe et les coûts d'exploitation. Par exemple, l'énergie nucléaire présente un coût fixe élevé et un faible coût d'exploitation, et ces centrales doivent fonctionner en continu sauf pendant les périodes de maintenance. Les turbines à gaz ont des coûts fixes bien plus faibles mais des coûts d'exploitation plus élevés, et elles peuvent être mises en marche en moins d'une heure. Les générateurs à vapeur, quant à eux, nécessitent 8 à 12 heures pour chauffer, et sont donc généralement planifiés une journée à l'avance.

L'utilisation croissante de l'énergie éolienne et solaire a introduit un degré de variabilité incontrôlable auquel les réseaux électriques n'avaient jamais été exposés auparavant. Cette variabilité peut être gérée grâce au stockage, qui prend différentes formes, mais la plus visible est le stockage sur batteries au niveau du réseau. L'Australie et la Floride sont deux régions qui ont investi massivement dans le stockage sur batteries, mais cela devient de plus en plus un investissement courant accompagnant le développement de grands champs solaires et de parcs éoliens.

Le stockage se décline toutefois sous d'autres formes, notamment :

- Le stockage par pompage-turbinage, où l'eau est pompée vers le haut, puis utilisée à la demande pour produire de l'électricité en s'écoulant vers le bas.
- Le stockage de véhicule à réseau (« battery-to-grid »), où les batteries des voitures et des résidences sont utilisées comme une forme de stockage sur batteries.
- Le stockage thermique, où l'énergie est stockée en chauffant un liquide dans une grande cuve.
- La gestion de la demande (ou réponse à la demande) – nous pouvons « stocker » le besoin en électricité en différant certaines activités telles que le fonctionnement des lave-linge et sèche-linge, ou le refroidissement de pièces (comme les bibliothèques) pour utiliser l'air frais plus tard.

L'énergie est un domaine de problème particulièrement riche en termes de gestion des différentes formes d'incertitude, utilisant différentes technologies de production d'électricité qui nécessitent des délais de préavis radicalement différents (littéralement de 2 secondes pour faire varier la production d'une turbine à gaz, à un an pour les changements dans les calendriers de maintenance des centrales nucléaires).

Au moment de la rédaction de ce livre, le réseau électrique subit une pression pour répondre à la demande croissante liée à l'utilisation des outils d'« IA », qui nécessitent d'immenses centres de calcul pour gérer les besoins de calcul des réseaux de neurones comportant des dizaines de milliards de paramètres, en utilisant des types de puces spécialisées provenant d'entreprises comme Nvidia. On observe également une croissance de l'utilisation de la climatisation pour faire face à l'augmentation des températures, ainsi que des besoins de calcul liés aux cryptomonnaies.

### Métriques

Parmi le riche ensemble de métriques pour la production d'électricité, on trouve :

- **Le coût de l'électricité** – il s'agit sans doute de la métrique la plus importante utilisée pour évaluer les systèmes énergétiques, bien que cela concerne les sociétés qui peuvent compter sur une disponibilité de l'électricité 24 heures sur 24. Il est important de distinguer le coût fixe d'un investissement (les centrales nucléaires sont très différentes des turbines à gaz et des panneaux solaires) des coûts d'exploitation.
- **La couverture de la demande/les pannes** – certaines régions du monde n'ont accès à l'électricité que pendant une partie de la journée.
- **L'atteinte des cibles de température** – les gens aiment vivre dans des environnements où la température reste dans une plage étroite. Un gestionnaire d'immeuble peut faire face à des pénalités pour les périodes où la température d'un appartement sort d'une plage spécifiée. Certains aliments et médicaments doivent être réfrigérés à certaines températures, avec des pénalités en cas de non-respect.
- **L'impact sur l'environnement**, allant des émissions nettes de CO2, au réchauffement de l'eau, à la consommation de terres, à l'impact sur la flore et la faune locales (la liste est assez longue).
- **La fiabilité** – la fréquence et la gravité des pannes.

### Décisions

Les décisions dans le secteur de l'énergie couvrent des horizons temporels allant de la seconde (pour lisser les variations de tension) à plusieurs années, pour les accords à long terme d'achat d'électricité :

- L'ajustement des générateurs d'électricité pour la régulation de fréquence, qui se produit à des intervalles de 2 secondes.
- Les décisions d'achat d'électricité (généralement à des intervalles de 5 minutes) qui peuvent impliquer l'achat d'électricité au réseau ou la revente d'électricité au réseau.
- Les décisions d'achat ou de vente d'électricité en fonction des prix actuels du réseau.
- L'achat et le stockage de gaz, de pétrole et de charbon (dans certains cas, d'hydrogène).
- L'installation de capteurs sur le réseau pour comprendre l'état des lignes de transmission.
- Les accords d'achat d'électricité, qui sont des contrats d'achat ou de vente d'électricité sur des périodes pluriannuelles.
- L'emplacement, le type et la capacité des générateurs d'énergie, des turbines à gaz et des centrales nucléaires aux parcs éoliens et aux champs solaires.
- L'emplacement, le type et la capacité du stockage d'énergie.
- La capacité de transmission du réseau, qui contrôle la quantité d'électricité pouvant être transmise à un moment donné.

### Incertitudes

Les systèmes énergétiques offrent un ensemble exceptionnellement riche d'incertitudes qui affectent à la fois les investissements en infrastructure et l'exploitation quotidienne du système énergétique.

- Le climat, en particulier la température et l'humidité, affecte la demande dans une région.
- La direction et la vitesse du vent pour les éoliennes.
- La couverture nuageuse, qui peut modifier l'intensité solaire.
- Les défaillances des générateurs dues à des événements météorologiques, à des pannes mécaniques et au sabotage.
- Les prix du réseau, qui peuvent varier à la fois par intervalles de 5 minutes (la fréquence de mise à jour des prix du réseau) et de 2 secondes (pour la régulation de puissance).
- Les activités humaines telles qu'un match de football ou un concert.
- Les changements réglementaires qui peuvent affecter les incitations fiscales, les pénalités et les restrictions pures et simples (par exemple sur l'éolien offshore, ou la construction de nouveaux pipelines).
- Le coût des équipements (panneaux solaires, éoliennes, batteries, turbines à gaz et centrales nucléaires) évolue continuellement dans le temps.
- L'émergence de nouvelles technologies, telles que les petites centrales nucléaires et les nouvelles technologies de batteries.

L'accent mis sur les énergies renouvelables a accru la visibilité des incertitudes. La Figure 2.6 montre la production solaire sur une base horaire, sur une année entière, ce qui communique à la fois les variations saisonnières, les cycles quotidiens familiers, et les effets de la couverture nuageuse. Un élément particulièrement important est la prévisibilité des différentes formes d'incertitude. Nous savons quand le soleil se couchera des décennies dans le futur, mais la couverture nuageuse est particulièrement difficile à prévoir même sur des horizons temporels très courts.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Production horaire d'énergie solaire sur une année entière." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 2.6.</span> Production horaire d'énergie solaire sur une année entière.</figcaption>
</figure>

## Gestion des revenus hôteliers

### Narratif

Les hôtels doivent gérer les réservations de chambres jusqu'à un an à l'avance, bien que la plupart des réservations arrivent dans les derniers mois, et dans certains cas, les dernières semaines. Au fil du temps, les hôtels peuvent augmenter les tarifs à mesure que l'hôtel se remplit. Normalement, l'hôtel commencera par proposer des tarifs plus bas, mais ces tarifs doivent refléter la possibilité que l'hôtel puisse se remplir, ce qui signifie qu'il faudra peut-être refuser des personnes voyageant pour affaires ayant une volonté de payer beaucoup plus élevée.

La gestion des hôtels ne se limite pas au prix facturé pour une chambre. Les hôtels peuvent offrir une variété de services, du petit-déjeuner gratuit, à l'accès aux salles de sport et aux piscines, en passant par des billets pour des services locaux tels que les pistes de ski ou les excursions touristiques.

Un canal publicitaire important se trouve sur les réseaux sociaux tels que Google et Facebook. Ces plateformes organisent des enchères sophistiquées où les annonceurs doivent enchérir de manière dynamique pour obtenir le droit d'afficher des liens vers leur page web pendant une certaine période.

### Métriques

Certaines des métriques pour la gestion des revenus hôteliers incluent :

- Revenu total pour chaque jour de réservation, moins les coûts des services offerts.
- Montant dépensé en recherches publicitaires sur internet (Google, Facebook, …).
- Taux d'utilisation des chambres.
- Clients refusés.
- Chambres inutilisées.

### Décisions

Les décisions qui pourraient être prises par un directeur d'hôtel incluent généralement :

- Combien facturer pour une chambre à $\tau$ jours dans le futur.
- Sur quelles plateformes de commerce électronique faire de la publicité.
- Combien enchérir pour que leurs publicités soient publiées sur chaque plateforme de commerce électronique.
- Quels services offrir à différents tarifs.
- Comment concevoir la page web.

### Incertitudes

Les directeurs d'hôtel doivent faire face à plusieurs sources d'incertitude :

- Total des réservations chaque jour pour une date de séjour particulière.
- Le taux d'acceptation pour une chambre étant donné le prix et les offres de services.
- La fréquence à laquelle une offre publicitaire est acceptée en fonction de la taille de l'offre (ou de la politique d'enchère).
- Le taux de succès pour les clients qui voient une conception de page web.

## Applications dans le domaine de la santé

La santé est un sujet massif qui touche littéralement chaque être humain. Nous avons une forte incitation à prendre des décisions qui maintiennent ou améliorent notre santé, tout en respectant les budgets. Les sujets ci-dessous ne sont qu'un minuscule aperçu de l'ensemble riche des problèmes de décision qui se posent dans ce contexte.

### Gestion du diabète de type 2

#### Narratif

Environ 10 pour cent de la population mondiale souffre de diabète de type 2, qui reflète une incapacité à contrôler les niveaux de sucre (glucose) dans le sang. Le diabète de type 2 survient lorsque le pancréas ne produit pas suffisamment d'insuline, ou lorsque le corps devient résistant à l'insuline. Un défaut de contrôle des niveaux élevés de sucre dans le sang qui en résultent peut produire une multitude de conditions médicales, notamment une insuffisance cardiaque et rénale, des dommages aux vaisseaux sanguins dans les yeux pouvant entraîner un glaucome et la cécité, des problèmes de pieds dus à une mauvaise circulation (nécessitant parfois une amputation), et une incidence accrue de démence.

Les pics à court terme de sucre dans le sang (connus sous le nom d'hyperglycémie), qui peuvent survenir peu après avoir consommé certains types d'aliments, peuvent produire une vision floue, des maux de tête, de la fatigue et des difficultés de concentration. Les chutes de sucre dans le sang (hypoglycémie) peuvent produire des étourdissements, une accélération du rythme cardiaque, des évanouissements, des convulsions, et même un coma.

Le diabète est donc une maladie qui doit être gérée à la fois sur le long terme et à court terme. Un taux élevé de sucre dans le sang sur de longues périodes peut produire des dommages permanents aux organes, tandis que les variations à court terme peuvent créer des conditions médicales nécessitant un traitement immédiat.

#### Métriques

Comme pour la plupart des conditions médicales, un certain nombre de métriques capturent l'état du patient, mais il y en a d'autres.

- Le sucre dans le sang, mesuré en mg/dL (la plage typique est de 70-130), ou en mmol/L (plage typique de 3,9-7,2), qui est une mesure instantanée souvent prise après les repas.
- Sucre sanguin à jeun – Il s'agit du niveau de sucre dans le sang après 8 heures de jeûne.
- Temps dans la plage cible (TIR) – Ceci est utilisé avec les moniteurs continus de glycémie et mesure le temps pendant lequel le taux de sucre dans le sang reste dans une plage acceptable.
- Temps au-dessus de la plage (TAR) et temps en dessous de la plage (TBR) – Pourcentage de temps où le taux de glucose sanguin est au-dessus ou en dessous de la plage acceptable.
- Hémoglobine A1c (HbA1c) – Ce test reflète une moyenne mobile de 2-3 mois, où les valeurs souhaitables sont inférieures à 6,5 à 7 pour cent.
- Variabilité du glucose – L'écart type du taux de sucre dans le sang.
- Le coût du traitement (visites médicales et médicaments).
- Fréquence du besoin de consulter un médecin.
- Conséquences médicales du diabète, allant de la douleur au pied (neuropathie), à la perte de vision, l'amputation et la mort.

#### Décisions

Nous nous écartons de notre style habituel consistant à simplement lister les décisions, et listons séparément les décisions médicales prises par le médecin des décisions prises par le patient.

**Décisions médicales (prises par le médecin)**

- Choix des médicaments, niveaux de dosage et calendrier. La metformine est le médicament de choix standard, utilisé par 50 à 80 pour cent des patients sous médication. Cependant, de nombreux patients ne peuvent pas la tolérer, et doivent se tourner vers une gamme d'autres médicaments, notamment l'insuline, les sulfonylurées, les méglitinides, les inhibiteurs de la DPP-4, et ainsi de suite.
- Prescription de traitements assistés par la technologie, tels que
  - Dispositifs de surveillance continue du glucose.
  - Pompes à insuline, qui fournissent une administration précise d'insuline.
  - Systèmes automatisés d'administration d'insuline.
- Interventions chirurgicales, telles que la chirurgie bariatrique et la transplantation d'îlots pancréatiques.

**Décisions du patient**

- Consulter un médecin.
- Suivre les instructions du médecin.
- Se soumettre à des tests, investir dans des équipements de test à domicile.
- Administrer des médicaments.
- Choix alimentaires – Cela représente bien sûr une large gamme de décisions affectant le type d'aliment et la quantité.
- Choix d'exercice – Quel type, à quelle fréquence, avec quelle intensité.

#### Incertitudes

- Effets secondaires d'un médicament.
- Dans quelle mesure un patient répond-il bien à un médicament (changement du niveau de glucose sanguin).
- Dans quelle mesure un patient adhère-t-il à un programme de régime alimentaire et d'exercice.
- Capacité (et volonté) du patient à suivre les instructions de traitement.
- Progression à long terme de la maladie à mesure que le patient vieillit.
- Disponibilité de nouveaux médicaments.

### Santé publique – Gestion des kits de naloxone

#### Narratif

Bien que la consommation de drogues et les surdoses aient été un problème depuis des décennies, il y a eu une augmentation dramatique des décès par surdose due aux opioïdes synthétiques à partir d'environ 2013, dépassant rapidement de loin les décès dus à toutes les autres drogues. Une grande partie de cette augmentation était due à l'introduction de l'Oxycontin par Purdue Pharmaceuticals en 1996. L'Oxycontin contenait de l'oxycodone, qui était moins addictive que d'autres analgésiques.

L'oxycodone avait une formulation à action prolongée qui ne procurait pas la « montée » rapide que les consommateurs de drogues recherchaient. Cependant, le public a découvert que le médicament pouvait être écrasé et détourné, une pratique qui a explosé après 2013. Ci-dessous nous résumons les métriques, décisions et incertitudes du point de vue d'un responsable de la santé publique travaillant pour le gouvernement d'État ou municipal.

#### Métriques

- Nombre de surdoses d'opioïdes où :
  - Personne présente n'avait de naloxone (la personne a survécu ou est décédée).
  - La naloxone était présente, mais elle n'a pas été administrée (la personne a survécu ou est décédée).
  - La naloxone a été administrée (la personne a survécu ou est décédée).
- Nombre de surdoses où les services d'urgence médicale (EMS) sont intervenus.
- Nombre de surdoses où la personne a dû être transportée à l'hôpital.
- Coût des kits de naloxone.
- Coût pour le système de santé.
  - La surdose est traitée en dehors de l'hôpital (par exemple par les services d'urgence médicale).
  - La surdose nécessite le transport de la personne à l'hôpital (très coûteux).
- Coûts d'application de la loi.

#### Décisions

Les décisions ci-dessous sont présentées du point de vue du gouvernement de l'État :

- Combien de kits de naloxone devraient être alloués à différents types d'organisations :
  - Agences de réduction des risques, fournisseurs de traitement.
  - Organisations de services directs.
  - Premiers intervenants (services d'urgence médicale, forces de l'ordre, pompiers).
  - Autres organisations communautaires qui interagissent avec les personnes qui consomment des drogues (organisations confessionnelles, fournisseurs de logement, banques alimentaires, etc.).
  - Pharmacies, hôpitaux.
  - Prisons et centres de détention.
- Combien de kits devraient être alloués aux programmes d'échange de seringues par région :
  - Points chauds de surdose.
  - Zones rurales vs urbaines.
  - Différents comtés/régions.
  - Populations à risque, telles que les terres tribales.
- Qui former à la reconnaissance et à l'inversion d'une surdose ? Qui former à l'utilisation des kits ?
- Comment faire connaître la disponibilité des kits de naloxone ?
- Comment financer la stratégie de distribution de naloxone ?
- À qui soumettre des propositions pour obtenir un financement ?

#### Incertitudes

- Taux et schémas d'utilisation par les personnes/patients. Ceci est affecté par :
  - Sensibilisation – les personnes peuvent ne pas savoir que la naloxone est disponible.
  - Confiance – les personnes peuvent ne pas être à l'aise de révéler qu'elles en ont besoin.
  - Comment les personnes réagissent à la consommation d'opioïdes et au traitement.
  - Disponibilité des drogues sur le marché.
  - Barrières de transport – les personnes peuvent ne pas être en mesure de se rendre à un point de distribution.
- Contaminants dans l'approvisionnement ayant un impact inconnu sur la naloxone et les inversions de surdose.
- Budget alloué aux mesures préventives telles que les kits de naloxone et la capacité du personnel à les distribuer.

### Réalisation d'essais cliniques pour les tests de médicaments {#clinicaltrials}

#### Narratif

En 2024, il y avait près de 500 000 essais cliniques testant divers médicaments et traitements pour leur efficacité. Il existe trois phases d'un essai clinique :

- **Phase I : Test de sécurité et de dosage** ($5–$10 millions) – Un petit groupe de personnes en bonne santé est utilisé pour tester la toxicité à différents niveaux de dosage et identifier les effets secondaires possibles. Les chercheurs peuvent également comparer différentes méthodes d'administration d'un médicament, telles que les comprimés, les patchs ou les injections.
- **Phase II : Évaluation de l'efficacité et des effets secondaires** ($20–$100 millions) - Le traitement est appliqué à un groupe plus large de patients atteints de la maladie ou de la condition ciblée par le traitement. Guidée par ce qui a été appris en Phase I, cette phase fournit une indication initiale de l'efficacité du traitement. Les effets secondaires sont observés, et les résultats seront comparés aux traitements existants.
- **Phase III : Tests à grande échelle** (100+ millions $) – En utilisant des groupes de centaines, souvent de milliers, de patients provenant de différentes régions, le traitement est comparé à des thérapies concurrentes pour évaluer son efficacité et observer davantage les réactions indésirables. Des données supplémentaires sont recueillies pour l'examen réglementaire.

Les essais cliniques ne sont pas seulement très coûteux, ils prennent aussi beaucoup de temps. Pendant cette évaluation, l'horloge de 20 ans sur les brevets tourne, créant une incitation à tirer une conclusion (espérons-le positive) pour aller sur le marché.

Le processus de réalisation des essais pose un problème logistique à grande échelle pour administrer les essais et nécessite un financement substantiel, ce qui signifie également un risque financier considérable. L'ensemble du processus doit être mené en présence d'une incertitude considérable sur la performance d'un médicament ou d'un traitement à grande échelle.

Les essais cliniques peuvent échouer à l'un des trois niveaux en raison de :

- Manque d'efficacité – Le médicament ne fonctionne pas comme espéré.
- Préoccupations de sécurité – Il peut y avoir des effets secondaires significatifs.
- Obstacles réglementaires – Le médicament peut rencontrer des problèmes réglementaires.
- Raisons commerciales ou stratégiques – Une entreprise peut ne pas poursuivre un médicament en raison de projections financières, de risque financier, ou de questions concurrentielles.

Les taux de réussite typiques sont :

- Transition de la Phase I à la Phase II : ~60 pour cent.
- Transition de la Phase II à la Phase III : ~30 pour cent.
- Transition de la Phase III à l'approbation : 50-60 pour cent.

Le taux de réussite global sur l'ensemble du processus est d'environ 10 pour cent.

#### Métriques

Il existe une variété de métriques qui entrent dans l'évaluation d'un médicament :

- Les transitions réussies de chacune des trois phases vers l'étape suivante.
- Le coût de chaque phase.
- Le coût de l'obtention de l'approbation réglementaire à chaque étape.
- L'efficacité du médicament ou du traitement.
- La présence d'effets secondaires.
- Le coût de fabrication du médicament.
- Le coût de distribution du médicament (il peut nécessiter une réfrigération).
- Le coût d'administration du médicament. (Par voie orale ? Par injection ?)
- Les coûts de marketing.

#### Décisions

Nous décrivons les décisions du point de vue de l'entreprise qui possède le médicament et qui souhaite le commercialiser :

- À chaque phase, chaque semaine, il y a une décision de poursuivre les essais, d'arrêter et de mettre fin à l'examen (le médicament échoue), ou d'arrêter et de passer à l'étape suivante (succès).
- Combien de patients interroger et inviter à participer à l'essai.
- Le choix des hôpitaux à utiliser comme sites de tests cliniques.
- La décision d'ouvrir des sites de tests (par exemple, dans un centre commercial).
- La tarification du médicament.
- Les stratégies de marketing : vers le médecin ? Directement vers le marché ?

#### Incertitudes

Les décisions doivent être prises en tenant compte des incertitudes suivantes :

- Le taux auquel les personnes éligibles peuvent être identifiées.
- La réponse des personnes au traitement.
- Les décisions des comités réglementaires.
- L'acceptation anticipée du médicament par les médecins.
- Les décisions prises par les concurrents qui peuvent affecter les ventes du médicament.

## Gérer une élection présidentielle {#presidentialelection}

### Récit

Quiconque a regardé la série « West Wing » (ou suit attentivement les élections présidentielles) a pu constater le défi que représente la gestion d'une campagne présidentielle. Il s'agit invariablement d'un problème opérationnel complexe qui nécessite de gérer les candidats et le personnel, souvent en collectant des informations (comme la réalisation de sondages) ou en diffusant des informations (par des discours), et toujours dans un environnement contraint par le budget.

### Métriques

Parmi les métriques les plus importantes figurent :

- Si le candidat remporte l'élection ou non.
- Le nombre de voix du collège électoral.
- Les sondages dans chaque état (en particulier les états pivots).
- Le montant des liquidités disponibles chaque semaine.
- Les dons chaque semaine.
- Les dons en réponse aux publications sur les réseaux sociaux.
- Les dépenses hebdomadaires.

### Décisions

Le directeur de campagne doit prendre un certain nombre de décisions, notamment :

- Où prononcer des discours chaque jour.
- Quels thèmes mettre en avant.
- Le choix du candidat à la vice-présidence.
- Quels canaux publicitaires utiliser (télévision, réseaux sociaux, panneaux d'affichage) et les taux de dépenses.
- Les dépenses en matériel promotionnel imprimé (panneaux, envois postaux, brochures).
- Combien de personnes embaucher à différents niveaux, par région.
- Où installer des bureaux de terrain.
- Quand et où réaliser des sondages, et quelles questions poser.

### Incertitudes

Les élections présidentielles doivent être gérées en présence d'un certain nombre d'incertitudes :

- Le nombre de voix que recevra le candidat.
- L'évolution des taux de popularité au fil du temps, et après des événements majeurs (par exemple, la convention nationale).
- L'évolution des taux de popularité après la mise en avant de différents thèmes.
- Les dons dans l'ensemble, et en réponse à des appels spécifiques aux dons (par exemple, par message texte).
- Les biais anticipés dans les sondages.
- Les événements d'actualité qui influencent la perception du public (favorablement ou défavorablement) des politiques du candidat.
- Les publicités d'attaque des opposants.
- Les dons importants à des super-PACs favorables ou concurrents.
- Les événements de santé défavorables affectant le candidat.

## Gestion de flotte de camions complets

### Récit

Aux États-Unis, le fret se déplace principalement sous une forme connue sous le nom de transport par camion complet (« full truckload »), où un expéditeur remplit ce qui est typiquement une remorque de 53 pieds pouvant transporter jusqu'à 46 000 livres (selon le type de fret) d'un endroit à un autre. Ils fonctionnent de manière similaire aux taxis – le chauffeur du camion (avec un tracteur) se déplace à vide pour récupérer une charge de fret à un endroit, puis la conduit vers un autre endroit où la remorque est déchargée ou déposée pour être déchargée plus tard. Un chauffeur peut effectuer un ou deux chargements en une seule journée, mais la plupart des chargements prennent de 1 à 5 jours.

Une fois qu'un chauffeur dépose un chargement, le défi consiste à minimiser le nombre de miles que le chauffeur doit parcourir à vide pour récupérer un autre chargement. Trois problèmes compliquent réellement la gestion d'un transporteur de camions complets :

- Le mouvement du fret n'est pas équilibré. Il existe des régions du pays qui produisent plus de fret qu'elles n'en consomment (c'est particulièrement vrai dans le Midwest américain) et des régions qui sont principalement consommatrices (typiquement les côtes et les grandes villes). Par conséquent, le marché est prêt à payer beaucoup plus pour déplacer le fret des régions productrices vers les régions consommatrices, alors que les chargements en provenance des régions consommatrices peuvent même ne pas rapporter assez pour faire fonctionner le camion (mais c'est mieux que de rouler à vide).
- Les chauffeurs de camion doivent respecter des règles strictes sur le nombre d'heures qu'ils peuvent conduire chaque jour et chaque semaine. De plus, ils doivent rentrer chez eux, soit quotidiennement, soit hebdomadairement, soit, pour les chauffeurs longue distance, une ou deux fois par mois.
- La réservation du fret est très dynamique. La plupart des chargements sont réservés un à trois jours à l'avance. Une entreprise de transport peut devoir mobiliser des chauffeurs pour répondre aux besoins d'un expéditeur important qui ne commande des chargements qu'un jour à l'avance.

Il y a plus de 2 millions de chauffeurs travaillant dans l'industrie du camion complet. La plupart des entreprises de transport routier fonctionnent avec moins de cinq chauffeurs, tandis que d'autres en comptent 10 000 ou plus.

### Métriques

Les métriques de performance les plus couramment rapportées comprennent :

- Le bénéfice d'exploitation par semaine ou par mile.
- Le revenu par chauffeur par semaine ou par mile.
- Les miles à vide en pourcentage du total des miles.
- Les miles par chauffeur par semaine.
- La fraction du temps où les chauffeurs rentrent chez eux à l'heure.
- Le pourcentage de temps où les chargements sont récupérés et livrés à l'heure.
- Le taux de rotation des chauffeurs (nombre de chauffeurs démissionnant par semaine).

### Décisions

Les décisions du point de vue du responsable chargé de la répartition et de la planification des chargements pourraient inclure :

- À quel chargement un chauffeur doit être affecté.
- S'il faut accepter un chargement proposé pour un ramassage futur.
- Si un chargement doit être géré par les propres chauffeurs du transporteur ou par une division de courtage (qui trouve des propriétaires-exploitants pouvant déplacer le chargement).
- Quel prix l'entreprise de transport devrait-elle proposer pour déplacer du fret pour un expéditeur sur une voie de circulation particulière (paire origine-destination) pour l'année à venir ? Cela fait partie d'un processus annuel d'« appel d'offres » qui détermine le transporteur préféré pour chaque expéditeur pour chaque voie.
- Combien de chauffeurs embaucher qui vivent dans un endroit particulier (appelé domicile de chauffeur).
- Combien de tracteurs et de remorques la flotte devrait-elle exploiter.

### Incertitudes

Certaines des incertitudes rencontrées dans le transport de camions complets comprennent :

- Combien de chargements seront proposés chaque jour, sur chaque voie, par les principaux expéditeurs desservis par le transporteur ?
- Combien de chargements seront disponibles à être déplacés, et à quel prix, sur les « tableaux de chargement » publics auxquels tout transporteur peut avoir accès ?
- Un chauffeur acceptera-t-il une affectation à un chargement particulier ?
- Les volumes de fret sont-ils en hausse ou en baisse ?
- Quels sont les prix courants au comptant ?
- Un chargement sur un tableau de chargement externe sera-t-il réellement disponible si le transporteur choisit de le déplacer ?

## Gestion de trésorerie d'un fonds commun de placement

### Récit

Un gestionnaire de fonds commun de placement qui avait suivi un cours de planification des opérations pour son MBA a été initié à un problème classique connu sous le nom de « problème du vendeur de journaux » (newsvendor problem). Les problèmes de vendeur de journaux surviennent lorsqu'on doit décider d'une quantité de ressource (par exemple, des journaux) à allouer pour satisfaire une demande qui n'est pas connue au moment où l'on prend sa décision. Si l'on alloue trop, il restera des ressources, dont on suppose qu'elles ne peuvent pas être conservées pour l'avenir (tout comme les journaux d'aujourd'hui n'ont aucune valeur demain). Si l'on en alloue trop peu, on aura une demande insatisfaite.

Après avoir terminé son MBA (dans une grande école de commerce), le gestionnaire du fonds commun de placement a été confronté au problème de décider combien de liquidités conserver pour faire face aux demandes de rachat. Le problème est résumé dans l'email présenté à la figure 2.7, mais les éléments essentiels sont les suivants :

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/MutualFundemail.png" alt="Email d'un gestionnaire de fonds commun de placement et ancien étudiant en MBA demandant conseil sur la manière de gérer le solde de trésorerie.">
  <figcaption><span class="fig-num">Figure 2.7.</span> Email d'un gestionnaire de fonds commun de placement et ancien étudiant en MBA demandant conseil sur la manière de gérer le solde de trésorerie.</figcaption>
</figure>

- Le fonds commun de placement doit maintenir suffisamment de liquidités pour répondre aux demandes de rachat. S'il n'y a pas assez de liquidités disponibles lorsqu'une demande de rachat arrive, il devra liquider des actions, encourant des coûts de transaction, et pouvant éventuellement être contraint de vendre à un prix plus bas. S'il détient trop de liquidités, il manque alors la croissance potentielle des investissements sur le marché.
- Il existe deux types de clients : les investisseurs particuliers et les investisseurs institutionnels. Les rachats des investisseurs particuliers peuvent prendre plusieurs jours pour être réglés, tandis que les demandes de rachat plus importantes des investisseurs institutionnels doivent être réglées le jour même.
- Les dépôts et les demandes de rachat sont corrélés avec la performance du marché. La croissance du marché peut attirer de nouveaux dépôts, tandis que les baisses peuvent déclencher des demandes soudaines de rachat.

### Métriques

Les métriques impliquées dans cet exercice comprennent :

- Le rendement global du portefeuille chaque jour, net des coûts d'exploitation (frais de transaction, dépenses de rachat).
- Le montant des liquidités détenues.
- Les ventes nécessaires pour couvrir les demandes de rachat.

### Décisions

Les décisions auxquelles le gestionnaire du fonds commun de placement est confronté sont :

- Combien de liquidités détenir.
- Quels actifs vendre pour lever des liquidités.
- Quels actifs acheter lorsqu'il y a trop de liquidités disponibles.

### Incertitudes

Les décisions doivent être prises face aux incertitudes suivantes :

- Les dépôts des investisseurs particuliers ou institutionnels.
- Les demandes de rachat des investisseurs particuliers ou institutionnels.
- Les variations des indices de marché.
- Les variations des taux d'intérêt.

## Finance de la chaîne d'approvisionnement {#supplychainfinance}

### Récit

Chaque transaction de la chaîne d'approvisionnement impliquant l'achat ou la vente de matières premières, de composants et de produits finis implique un flux d'argent, créant un réseau complexe de flux entre acheteurs et vendeurs (à tous les niveaux de la chaîne d'approvisionnement), ainsi que des partenaires financiers tiers qui peuvent fournir du financement et de l'assurance.

Les étapes d'une transaction financière comprennent typiquement :

- Le fournisseur envoie les marchandises et les factures à l'acheteur.
- L'acheteur approuve la facture dans son système ERP.
- Une fois approuvée, le fournisseur peut choisir d'être payé plus tôt par le financier (qui pourrait être une banque).
- Le financier paie le fournisseur (typiquement à un tarif réduit).
- L'acheteur paie le financier à l'échéance de la facture (peut-être 60 ou 90 jours plus tard).

Il existe une variété de transactions financières qui peuvent se produire, telles que :

- Approbation de la facture – L'acheteur confirme que la facture est valide et due pour paiement.
- Cession de créance – Le fournisseur cède la facture au financier.
- Paiement anticipé – Le financier paie le fournisseur avant la date d'échéance.
- Paiement à l'échéance – L'acheteur paie le financier à la date d'échéance convenue.
- Frais de transaction/escomptes – Le financier gagne des frais sur la transaction.

Il existe un certain nombre de sources d'incertitude dans la gestion de la chaîne d'approvisionnement qui ont un impact sur les finances. Les entreprises peuvent se protéger en utilisant différentes formes d'assurance. En voici quelques exemples :

- Assurance des stocks - Protège les biens détenus dans des entrepôts ou en transit (y compris dans des centres logistiques tiers) contre le vol, les dommages ou la perte.
- Couvertures de change pour se protéger contre les variations de la valeur relative des différentes devises lors d'importations depuis d'autres pays.
- Assurance-crédit commercial - Protège les fournisseurs ou les prêteurs contre le risque de non-paiement de l'acheteur en raison d'une insolvabilité, d'un défaut prolongé, ou d'événements politiques.
- Assurance cargo maritime - Couvre la perte physique ou les dommages aux marchandises en transit — par voie terrestre, maritime ou aérienne — lors d'une expédition internationale ou nationale.
- Assurance risque politique - Protège contre les pertes dues à l'instabilité politique, telles que l'expropriation, l'inconvertibilité des devises, les restrictions d'importation/exportation, la guerre ou les troubles civils.
- Assurance cautionnement d'exécution - Garantit qu'un fournisseur ou un entrepreneur respectera ses obligations contractuelles. Assure les acheteurs contre la défaillance du fournisseur.
- Swaps sur défaillance de crédit - Utilisés par les institutions financières pour se couvrir contre le risque de crédit de contrepartie.

### Indicateurs

Il existe une liste assez longue d'indicateurs financiers utilisés par les grandes entreprises. Un échantillon de ceux qui sont directement liés à la gestion financière d'une chaîne d'approvisionnement comprend :

- EBITDA – Bénéfice avant intérêts, impôts, dépréciation et amortissement. Il s'agit d'un indicateur de haut niveau qui capture le coût des marchandises vendues (COGS), les revenus, et tous les coûts engagés pour gérer les flux de trésorerie et de capital.
- Rendement des capitaux propres (ROE) et bénéfice par action (EPS).
- Flux de trésorerie disponible.
- Fonds de roulement et réserves de trésorerie.
- Ratio d'endettement.
- Charges d'intérêts.

### Décisions

Un échantillon de décisions prises par un directeur financier comprend :

- Choix des stratégies de financement pour différentes transactions.
- Choix des formes d'assurance (voir liste ci-dessus).
- Combien de liquidités maintenir, et dans quels comptes.
- Paiements de dividendes.
- Allocation du capital.
- Financement par dette ou par capitaux propres.

### Incertitudes

Encore une fois, un petit échantillon des différentes formes d'incertitude apparaissant dans la finance de la chaîne d'approvisionnement comprend :

- Les défauts de paiement des acheteurs et des vendeurs.
- Les variations de devises.
- Les changements dans les tarifs douaniers et les restrictions commerciales.
- Le risque de récession, les changements dans les ventes globales (à la hausse ou à la baisse).
- La volatilité des taux d'intérêt.
- La volatilité des marchés de crédit.

## Essais et erreurs intelligents {#intelligenttrialanderror}

### Récit

Il existe une classe de problèmes massive en prise de décision qui peut être décrite le mieux comme des « essais et erreurs intelligents ». Ceux-ci apparaissent lorsqu'il existe un ensemble de choix discrets, et où la performance de chaque choix est incertaine. Des exemples de contextes de problèmes où cela survient incluent :

- **Science des matériaux**
  - Quels produits chimiques mélanger pour créer un nouveau matériau.
  - À quelle température faire fonctionner un procédé.
  - Quelles étapes suivre dans le processus de fabrication.
- **Santé**
  - Quel médicament essayer pour traiter une condition.
  - S'il faut effectuer un test (imagerie, analyse de sang).
  - Où localiser une clinique pour la distribution de kits de naloxone.
- **Commerce électronique**
  - Laquelle de deux conceptions de pages web utiliser.
  - Quel produit annoncer sur une page web pour maximiser les revenus.
  - Quel prix facturer pour un produit (parmi un ensemble de prix possibles).
- **Fabrication**
  - Optimiser un processus de fabrication de semi-conducteurs (températures, temps dans un bain chimique, concentrations chimiques, diamètre de la plaquette de silicium).
- **Finance**
  - Trouver les meilleurs réglages pour les paramètres d'une politique de trading.
  - Quel fournisseur utiliser, étant donné le risque de défaillance.
  - Quelle quantité de capital de réserve maintenir.
- **Gestion de la chaîne d'approvisionnement**
  - Quel fournisseur utiliser pour un produit étant donné l'incertitude sur la qualité du produit.
  - Fixer les points de réapprovisionnement pour le renouvellement des stocks.
  - Quels canaux publicitaires utiliser.
- **Choix des personnes**
  - Baseball – Qui devrait frapper en quatrième position, ou jouer catcher.
  - Basketball – Qui devrait jouer à chaque poste.
  - Gestionnaires de portefeuille – Qui obtient les meilleurs résultats en gérant un portefeuille.

Chacun de ces contextes implique de choisir parmi un ensemble de choix. Nous voulons choisir celui qui fonctionne le mieux, mais nous ne sommes pas certains de la performance de chacun. La situation est représentée dans la figure 2.8. Il peut y avoir deux choix, des dizaines, des centaines, ou plusieurs milliers.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoices2.jpg" alt="Un ensemble de choix discrets.">
  <figcaption><span class="fig-num">Figure 2.8.</span> Un ensemble de choix discrets.</figcaption>
</figure>

Ce problème de base se présente sous diverses formes :

- **Modèle de croyance**
  - Croyances indépendantes – C'est le cas où notre croyance concernant un choix n'est pas liée aux croyances concernant les autres choix. Dans les applications réelles, cela est relativement rare.
  - Croyances corrélées – Les choix peuvent partager des caractéristiques, comme des médicaments de la même famille, un style de chemise avec différentes couleurs, ou la « proximité » de deux choix, notamment s'ils représentent un prix discrétisé, une concentration, ou un emplacement géographique.
  - Modèles paramétriques – Nous pouvons construire nos croyances en utilisant un modèle paramétrique, comme un modèle linéaire reliant différents prix à des demandes estimées.
- **Coût de la réalisation d'un test**
  - Expériences peu coûteuses – Observer combien de fois une publicité est cliquée sur une page web est un moyen très peu coûteux de mener une expérience. Les échelles de temps peuvent aller de la microseconde à la seconde ou à la minute.
  - Expériences coûteuses – Une expérience en laboratoire peut prendre un jour à une semaine (ou plus). Des simulations informatiques complexes peuvent prendre des heures à une semaine ou plus.
- **Niveau de bruit**
  - Les expériences à faible bruit produisent des estimations précises à partir d'un seul essai.
  - Les expériences à fort bruit produisent des résultats très bruités, nécessitant plusieurs tests avec les mêmes choix ou des choix similaires.
- **Apprentissage hors ligne vs en ligne**
  - L'apprentissage hors ligne décrit des expériences effectuées en laboratoire ou en simulation informatique, où nous pouvons tolérer une mauvaise performance issue d'une expérience.
  - L'apprentissage en ligne décrit un apprentissage effectué sur le terrain, où nous devons vivre avec le résultat d'une expérience (comme tester le prix d'un produit, ou l'effet d'un médicament sur un patient).
- **Présence de ressources physiques ou financières** – Les problèmes d'apprentissage de base sont liés d'une expérience à l'autre uniquement sur la base de ce que nous apprenons. Cependant, il est possible que les problèmes soient liés par une ressource physique (ou financière) :
  - Il peut y avoir un budget fixe pour mener des expériences. Chaque expérience consomme une partie du budget.
  - Les expériences physiques peuvent nécessiter des stocks d'ingrédients qui doivent être disponibles.
  - Une expérience peut nécessiter une machine configurée pour effectuer une tâche spécifique, ce qui signifie qu'il est plus facile d'effectuer d'autres expériences nécessitant la même configuration.
- **Expériences séquentielles ou parallèles**
  - Expériences séquentielles :
    - Un patient peut être utilisé pour tester un médicament à la fois afin de déterminer lequel fonctionne le mieux sur ce patient.
    - Un fabricant peut être en mesure de tester un procédé à la fois pour déterminer lequel produit le rendement le plus élevé.
  - Expériences parallèles :
    - Un détaillant peut mener plusieurs campagnes promotionnelles (par exemple, la publicité en magasin) dans différents magasins pour apprendre laquelle fonctionne le mieux.
    - Un scientifique peut tester des dizaines ou des centaines de composés différents sur une seule plaque pour voir comment ils réagissent à un type particulier de cellule cancéreuse.
- **Apprentissage instantané vs différé**
  - Apprentissage instantané - Nous faisons un choix (par exemple, mener une expérience) et apprenons les résultats immédiatement.
  - Apprentissage différé - Il y a un délai entre le moment où nous menons une expérience et celui où nous apprenons le résultat. Les délais peuvent être de quelques minutes dans des contextes à grande vitesse, jusqu'à un an ou plus, comme cela se produit lorsqu'une banque accorde un prêt et doit attendre des années pour savoir si le bénéficiaire du prêt manque des paiements ou fait défaut.

Chacun de ces contextes peut encore être décrit par notre trio d'indicateurs, de décisions et d'incertitudes.

### Indicateurs

On suppose que toute « expérience » renvoie une observation de performance, qu'il s'agisse du nombre de clics sur une publicité, de la réponse d'un patient à un médicament, ou du rendement d'un procédé de fabrication de semi-conducteurs. Bien sûr, il peut y avoir plus d'un indicateur pour décrire la performance, que nous pourrions souhaiter optimiser selon une certaine combinaison. Cependant, nous devrions distinguer deux dimensions importantes de la performance :

- Le coût d'essayer chaque choix.
- La performance moyenne sur un certain horizon.
- La variabilité autour de la moyenne, qui capture la fiabilité d'un processus.
- La probabilité de résultats « médiocres ».
- D'autres indicateurs de performance, tels que les effets secondaires d'un médicament, ou le potentiel de pertes significatives de parts de marché.

### Décisions

Ceci est simple – c'est l'ensemble des choix. Ceux-ci pourraient être :

- **Binaires** – Tels que
  - S'il faut entreprendre une action (vendre une entreprise, lancer un nouveau produit, envoyer un médicament en essais cliniques) ou non.
  - S'il faut conserver ou vendre un actif.
  - Laquelle de deux conceptions de pages web utiliser (souvent appelée test A/B).
  - S'il faut donner un médicament à un patient, ou non.
- **Ensemble discret** – Cela pourrait être un ensemble de fournisseurs, un choix de différents traitements médicamenteux, différents canaux marketing pour annoncer un produit, ou n'importe lequel d'un ensemble de milliers de composés moléculaires à tester dans le développement de médicaments.
- **Un ensemble discrétisé de valeurs d'un paramètre continu**, comme le prix d'un produit, la concentration d'un produit chimique, la température de cuisson pour un semi-conducteur.

Il existe des problèmes où l'ensemble des choix n'est pas évident. Par exemple, nous pourrions rechercher un fournisseur capable de fabriquer un composant spécialisé à partir d'un nouveau matériau qui nécessite de travailler à des températures élevées. Ou nous avons besoin d'un produit chimique très spécial pour fabriquer un nouveau vaccin, ou d'une forme extrêmement pure d'un gaz nécessaire au processus de fabrication des dernières puces semi-conductrices. Trouver des fournisseurs, ou des matériaux, ou des produits chimiques, pour répondre à un besoin peut être extrêmement difficile.

Ensuite, il y aura des problèmes où nous connaissons notre indicateur de performance, mais ne savons pas comment l'améliorer. Un fabricant de ciment peut avoir besoin de réduire les coûts pour être compétitif, mais n'a pas de stratégie claire pour y parvenir. Un médecin veut traiter une condition chez un patient mais ne sait pas quel traitement poursuivre.

### Incertitudes

Les incertitudes pour les problèmes de choix discret (essais et erreurs) peuvent se présenter sous deux formes :

- La performance d'un choix, qui diffère généralement de la manière dont nous pensions qu'il performerait au moment où nous avons décidé d'utiliser ce choix. Nous pouvons avoir une estimation ponctuelle du ou des indicateurs pour chaque choix, ou une certaine forme de distribution. La performance réelle est généralement différente de l'estimation ponctuelle, et si l'on nous donne une distribution des résultats possibles, le résultat réel ne provient pas nécessairement d'une distribution supposée.
- Si le choix est disponible – Voici quelques exemples :
  - Le choix peut être un fournisseur, qui est incapable de répondre à un appel d'offres.
  - Le choix peut être une personne pour occuper un poste, mais elle pourrait ne pas être disposée à accepter le poste.
  - Nous pourrions vouloir utiliser un type de matériau, mais des problèmes de chaîne d'approvisionnement peuvent restreindre sa disponibilité.

## Exercices

Lorsqu'un exercice demande une matrice d'interaction, vous pouvez utiliser le modèle de la « Matrice d'interaction de cadrage » qui peut être téléchargé depuis [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<ol class="book-exercises">
<li>Pour le problème de stock, choisissez un produit qui vous est familier (par exemple des produits alimentaires, des vêtements, des articles ménagers, des médicaments ou du matériel) et répondez aux questions suivantes :
  <ol type="a">
    <li>Identifiez les métriques, les décisions et les incertitudes qui semblent pertinentes pour votre problème, en utilisant les listes de chaque dimension de la section sur les stocks comme guide.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de gestion de la demande :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées par un directeur de magasin dans un point de vente de meubles au détail.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème du réseau électrique :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées lors de la planification quotidienne des générateurs électriques.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de gestion des revenus hôteliers :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées lors de la gestion des réservations de chambres sur un horizon de planification de deux mois.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de la gestion du diabète de type 2 :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées par un médecin prenant des décisions concernant un patient atteint de diabète de type 2.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de gestion des kits de naloxone :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées par un gouvernement d'État planifiant l'allocation de kits de naloxone à différents comtés en utilisant un financement du gouvernement fédéral.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de la gestion d'une élection présidentielle :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées par le directeur de campagne d'un candidat se présentant à la présidence.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Pour le problème de la gestion d'une flotte de camions complets :
  <ol type="a">
    <li>Choisissez un ensemble de métriques, de décisions et d'incertitudes que vous pensez être rencontrées lors de la planification du problème consistant à accepter quelles charges déplacer (généralement effectuée jusqu'à sept jours dans le futur).</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Considérez le problème du solde de trésorerie d'un fonds mutuel :
  <ol type="a">
    <li>L'e-mail du gestionnaire du fonds mutuel suggère une façon de décider combien d'argent conserver en trésorerie. Écrivez cette formule.</li>
    <li>Utilisez la Matrice d'Interaction de Cadrage pour créer des matrices d'interaction capturant votre meilleure estimation de l'impact de chaque type de décision sur chaque métrique de performance.</li>
    <li>Répétez (b) pour capturer votre meilleure estimation de l'impact de chaque type d'incertitude sur chaque métrique de performance.</li>
  </ol>
</li>
<li>Nommez un exemple de problème « d'essais et erreurs » que vous rencontrez dans votre propre expérience, où vous devez faire le même choix de manière répétée.
  <ol type="a">
    <li>Décrivez le contexte du problème d'essais et erreurs, et ce qui déclenche la nécessité de reprendre la décision.</li>
    <li>Décrivez les métriques (une ou plusieurs si nécessaire), l'ensemble des choix, et toutes les formes d'incertitude qui surviennent dans le processus de prise de décision.</li>
    <li>Suggérez comment vous procéderiez pour faire un choix.</li>
  </ol>
</li>
</ol>

{% endraw %}
