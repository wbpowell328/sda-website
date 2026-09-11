---
layout: book
title: "Chapitre 3 : Métriques de performance"
permalink: /bridging-vol1/fr/chapter-3/
date: 2026-07-17
book_home: /bridging-vol1/fr/contents/
book_data: bridging_vol1_toc_fr
lang: fr
translated_from: en
translated_from_hash: 43d87c4ab16e5185
---


{% raw %}
<p class="book-byline"><em>Rapprocher les problèmes de décision, Volume I — Cadrer le problème</em> &middot; Warren B. Powell</p>

Il existe un vieil adage en management :

> « On ne peut pas gérer ce que l'on ne peut pas mesurer. »

Chaque fois que nous souhaitons améliorer la performance d'un processus ou d'un système, il est important de disposer d'une métrique de performance clairement définie, en reconnaissant qu'il existe souvent plusieurs métriques. Avant de nous engager dans la discussion des questions complexes liées aux métriques, nous devons d'abord reconnaître qu'il ne manque pas de problèmes qui n'ont pas de métriques bien définies, comme qui épouser, quel emploi accepter à la sortie de l'université, ou choisir quel tableau peindre ou quelle sculpture acheter. Si vous avez du mal à identifier au moins une métrique clairement quantifiable, il est probable que votre problème appartienne au domaine complexe des problèmes de décision humains, qui ne bénéficieront pas d'une réflexion analytique.

Mais si vous pouvez identifier au moins une métrique claire et quantifiable, poursuivez votre lecture.

## Catégories de métriques

Il existe une vaste gamme de métriques, il est donc utile d'essayer d'identifier les grandes catégories de métriques. Parmi les catégories les plus courantes, on trouve :

1. **Métriques financières** - Il s'agit de toute métrique mesurée en une devise. Elles peuvent être mesurées :
   - En quantité totale - Trésorerie disponible, garanties de prêt, investissements.
   - Par unité de temps (jour, mois, trimestre, année), représentant typiquement le coût, le chiffre d'affaires ou le profit.
   - Par unité de ressource - Dollars par personne, machine, installation, ou par action.
2. **Métriques de productivité** - Il s'agit de métriques non exprimées en dollars, qui peuvent également être mesurées par unité de temps (patients vus, unités produites, kilomètres parcourus) et par unité de ressource (par personne, par machine, par installation).
3. **Métriques d'efficacité** - Résistance d'un matériau, performance d'un médicament, rendement d'un processus de fabrication, temps moyen entre pannes d'une machine.
4. **Performance de service** - Dans quelle mesure nous servons les marchés ou les agents externes, tels que la demande couverte, les évaluations de performance par les clients, le placement des étudiants.
5. **Évaluations de performance externes** - Le classement d'une école, la fiabilité des produits fabriqués par une entreprise, le classement des ventes, l'évaluation des hôpitaux.
6. **Métriques comportementales** - Écart entre les décisions réelles et les directives ou orientations prédéterminées.
7. **Métriques d'estimation** - Dans quelle mesure estimons-nous ou prédisons-nous des quantités (demande future, précipitations, quantité en stock) ou des paramètres (diagnostics des patients, coût de production). Celles-ci supposent que nous disposions d'un moyen de comparer une estimation préalable à une observation de la performance réelle.

Il existe deux façons d'évaluer chaque catégorie de métrique :

- **Performance moyenne** - Il s'agit de totaux ou de moyennes dans le temps, capturant ce qui serait réellement vécu.
- **Métriques de risque** - Elles mesurent des événements qui ne sont pas correctement représentés par une moyenne.

La performance moyenne et les métriques de risque sont examinées plus en détail dans la [section ci-dessous](#averagevvsrisk).

Il est utile de fournir des exemples spécifiques. Voici ci-dessous une liste de métriques issues de différentes catégories.

- **Métriques financières**
  - Métriques de rentabilité
    - Résultat net.
    - Marge brute.
    - Marge opérationnelle.
    - Rentabilité des actifs.
    - Rentabilité des capitaux propres.
    - EBITDA – bénéfice avant intérêts, impôts, dépréciation et amortissement.
  - Métriques de liquidité
    - Ratio de liquidité générale (actifs courants/passifs courants).
    - Ratio de liquidité immédiate (actifs courants-stocks/passifs courants).
  - Métriques d'efficacité
    - Ratio de rotation des actifs (chiffre d'affaires/total des actifs).
    - Rotation des stocks (coût des marchandises vendues/stock moyen).
  - Métriques de solvabilité
    - Ratio d'endettement (total des passifs/capitaux propres).
    - Ratio de couverture des intérêts (EBIT/charges d'intérêts).
  - Métriques de valorisation
    - Bénéfice par action (BPA) – résultat net/nombre moyen d'actions en circulation.
    - Ratio cours/bénéfice (P/E) – Prix du marché par action/bénéfice par action.
- **Métriques de productivité**
  - Fraction du temps pendant lequel l'actif est utilisé.
  - Nombre de tâches/travaux accomplis par semaine.
  - Nombre de tâches/travaux accomplis à temps ou en retard.
  - Temps moyen entre pannes (MTBF).
  - Temps moyen de réparation.
- **Métriques d'efficacité**
  - Les machines existent sous une vaste gamme de formes, des voitures aux climatiseurs en passant par les mixeurs. Dans tous les cas, on évalue si elles « fonctionnent », bien qu'une machinerie complexe comme une voiture puisse tomber en panne de diverses manières, du démarrage impossible à un pneu crevé en passant par le désembueur défectueux. Une voiture peut fonctionner, mais la consommation d'essence peut être inférieure aux attentes.
  - Un plastique peut devoir être chauffé à une température donnée sans fondre.
  - Un ordinateur portable peut devoir fonctionner à une certaine vitesse.
  - Performance d'un médicament (par exemple pour la perte de poids).
  - Résistance d'un matériau.
- **Évaluations de performance externes**
  - Ventes de produits (unités vendues ou chiffre d'affaires), taux de croissance.
  - Coût d'acquisition des clients.
  - Nombre d'avis positifs.
  - Taux de retour des produits.
  - Taux d'attrition des clients (clients refusant de renouveler leur contrat).
- **Performance du travail**
  - Nombre de pièces fixées/inspectées par heure (fabrication).
  - Ventes mensuelles dans la région ou la gamme de produits d'une personne (ventes).
  - Si un projet est achevé dans les délais et le budget (management).
  - Nombre d'appels traités/évaluation client (centres d'appels).
  - Rétention/rotation des employés.
  - Taux d'évaluations positives des employés dans les enquêtes RH annuelles.
  - Salaire nécessaire pour attirer et retenir le personnel.

## Les pyramides de métriques

Il est courant, notamment dans le monde des affaires, de dresser des listes de métriques, qui peuvent être assez longues. Il est très important de prioriser les métriques, ce qui peut se faire assez facilement en les organisant en pyramides, comme le montre la figure 3.1. La figure 3.1(a) illustre un ensemble potentiel de métriques pour quelqu'un travaillant aux plus hauts niveaux d'une entreprise (souvent appelé le « C-suite »), où l'objectif le plus important est de maximiser le cours de l'action trimestriel. Ces métriques, cependant, n'offrent pas beaucoup d'orientation pour quelqu'un travaillant dans une usine de fabrication où la métrique la plus importante pourrait être le coût, suivi de près par la production et la qualité. La figure 3.1(b) illustre comment une pyramide différente peut être créée pour quelqu'un travaillant dans la fabrication, où l'accent est davantage mis sur le coût.

L'organisation des métriques en pyramide est largement subjective, mais il devrait y avoir une seule métrique au sommet, considérée comme la plus importante. La métrique au sommet devrait être une métrique que l'on maximise ou minimise, mais ce n'est pas nécessairement le cas de toutes les autres métriques, une question que nous abordons ensuite.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidStockPrice.jpg" alt="A pyramid of metrics that might be used at the executive level of a publicly traded company.">
  <figcaption>(a)</figcaption>
</figure>
<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidCost.jpg" alt="A pyramid of metrics that might be used in a manufacturing plant.">
  <figcaption><span class="fig-num">Figure 3.1.</span> (b) — (a) Une pyramide de métriques susceptible d'être utilisée au niveau exécutif d'une entreprise cotée en bourse. (b) Une pyramide de métriques susceptible d'être utilisée dans une usine de fabrication.</figcaption>
</figure>

## Objectifs, cibles et limites

Nous devons ensuite préciser ce que nous cherchons à atteindre avec chaque métrique. Il existe trois façons d'utiliser les métriques pour évaluer la performance :

- **Maximiser/minimiser** – Nous voulons souvent maximiser ou minimiser une métrique lorsque plus grand (ou plus petit) est toujours préférable. Nous pouvons vouloir le matériau le plus résistant, ou la plus haute densité énergétique, ou le coût le plus bas.
- **Cibles** – Ici, nous essayons d'atteindre une valeur particulière, qui pourrait être la température corporelle d'un patient, ou la tension dans une ligne de transmission électrique. Les entreprises peuvent vouloir atteindre des objectifs projetés de chiffre d'affaires ou de rentabilité pour aider à contrôler la volatilité.
- **Limite supérieure/inférieure** – Un patient prédiabétique peut souhaiter maintenir son taux d'HbA1c (une mesure du taux de sucre dans le sang) en dessous de 6,0. Un détaillant de meubles peut souhaiter vendre son stock actuel (mais pas plus). Un transporteur de fret complet aimerait laisser chaque conducteur parcourir 2000 miles par semaine, mais pas plus, car le transporteur ne pourrait jamais soutenir un nombre plus élevé, et le conducteur pourrait être déçu si les semaines à haut kilométrage ne se répètent pas.

Bien qu'il puisse y avoir différentes façons de mesurer la performance, en fin de compte, un ordinateur doit être capable d'examiner un ensemble de décisions et de choisir laquelle est la meilleure.

## Gérer les objectifs multiples

Il existe souvent plusieurs objectifs à maximiser ou minimiser. Bien qu'il existe une littérature abondante sur l'optimisation multi-objectifs, il sera finalement nécessaire de combiner ces métriques en une seule fonction d'utilité, ce qui nécessite d'attribuer des poids à chaque métrique. La métrique au sommet de la pyramide (qui tend à être celle qu'il faut maximiser ou minimiser) sert typiquement de base, tandis que les autres métriques sont pondérées par rapport à la métrique de sommet.

Lorsque plusieurs métriques doivent être combinées en une seule fonction d'utilité, se pose la question de savoir comment les pondérer. Nous recommandons de fixer le poids de la métrique au sommet de la pyramide à 1,0, ce qui signifie que les poids des autres métriques (qui ne sont pas nécessairement dans les mêmes unités) doivent être mis à l'échelle par rapport à la métrique de sommet. Initialement, ces poids peuvent être fixés de manière subjective, mais cela finira par conduire à un ensemble de décisions qui produit un niveau de performance dans chacune des dimensions maximisées ou minimisées. Si un expert du domaine n'est pas satisfait de la performance dans une certaine dimension, la démarche habituelle consiste à ajuster le poids puis à réévaluer après avoir observé un nouvel ensemble de décisions.

## Performance moyenne vs. risque {#averagevvsrisk}

Si nous exécutons 20 simulations pour évaluer un processus de prise de décision, nous évaluons notre méthode sur la base de la performance moyenne. Nous pouvons le faire si nous avons accès à un simulateur, mais une alternative consiste simplement à observer son fonctionnement sur le terrain pendant une période donnée. Dans ce cas, nous suivons un seul échantillon d'observations et utilisons la performance réelle pour évaluer notre méthode. On pourrait dire qu'observer la performance réelle revient à prendre une moyenne d'une seule observation.

La performance réelle sur le terrain est ce que nous vivons. Pour les entreprises, cela se traduit par leurs comptes de résultat, ainsi que tout autre rapport résumant leurs autres métriques de performance, telles que les divers indicateurs clés de performance financiers, accompagnés de statistiques sur les stocks et l'utilisation des installations et des équipements. Dans un contexte de santé, nous pourrions examiner le taux moyen de nouvelles infections ou de décès par surdose. Un hôtel examinera l'utilisation des chambres et le chiffre d'affaires. Les flottes de camions de charge complète collecteront des statistiques sur le chiffre d'affaires par conducteur et les kilomètres parcourus à vide.

Considérons maintenant le problème d'une perturbation soudaine des opérations normales de l'entreprise. Il pourrait s'agir d'un tremblement de terre ou d'un tsunami détruisant une usine de fabrication majeure, ou de l'émergence d'une maladie comme la COVID perturbant les habitudes de consommation. Une guerre tarifaire pourrait éclater, perturbant gravement le commerce mondial.

Nous avons déjà reconnu la présence de différentes sources d'incertitude, comme nous l'avons fait tout au long du [Chapitre 2](/bridging-vol1/fr/chapter-2/), alors pourquoi attirons-nous l'attention sur ces nouvelles sources d'incertitude ? N'est-il pas vrai que si l'un de ces événements majeurs se produit, son effet sera capturé au fur et à mesure que nous accumulons nos métriques de performance dans le temps ?

La réponse simple est : non. Imaginez qu'il y ait une perturbation majeure dans une chaîne d'approvisionnement, de sorte que nous devions traverser une période pendant laquelle nous ne pouvons pas servir notre marché. Le plus important est que nous risquons de perdre des clients au profit de concurrents, car ils ne seront peut-être pas disposés à attendre que le problème soit résolu. De plus, nous pourrions devoir mettre en congé forcé un nombre important d'employés parce que nous ne disposons pas des pièces nécessaires pour faire fonctionner les usines. C'est une épreuve pour les employés, entraînant de l'insatisfaction, et les meilleurs employés pourraient trouver de meilleurs emplois.

Ces problèmes ne sont pas saisis par les processus comptables habituels qui suivent la performance de l'entreprise. C'est pour cette raison qu'il existe tout un ensemble de livres traitant de ce que l'on appelle communément le « risque » (ou la « résilience », qui désigne la capacité des entreprises à se relever après des événements majeurs), comme le montre la figure 3.2. Ces livres proposent généralement des descriptions qualitatives des différents types de risque, souvent (mais pas toujours) sans processus formel pour gérer le risque.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SupplyChainRiskBooks.png" alt="A sample of books on supply chain risk and resilience." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figure 3.2.</span> Un échantillon de livres sur le risque et la résilience dans la chaîne d'approvisionnement.</figcaption>
</figure>

Le risque est un terme généralement utilisé chaque fois que des décisions doivent être prises en présence d'incertitude. Voici quelques exemples de risque susceptibles d'apparaître dans le contexte des applications du Chapitre 2 :

- Bud Light a un jour lancé une campagne marketing destinée à la communauté LGBTQ. Ses ventes ont chuté de 25 pour cent, de nombreux clients conservateurs ayant mal réagi, ce qui a représenté une perturbation grave de l'ensemble de leur processus de production.
- La planification des générateurs électriques prend en compte la possibilité qu'un générateur (comme une centrale nucléaire) tombe en panne, mais elle ne pourrait pas gérer deux pannes de cette ampleur, ce qui entraînerait des coupures de courant tournantes.
- Un diagnostic incorrect pour un patient pourrait entraîner sa mort.
- L'absence de réserves de trésorerie suffisantes pour un fabricant pourrait entraîner la faillite en cas de forte baisse économique, comme cela s'est produit en 2008 avec l'industrie automobile.

Ces événements ne sont tout simplement pas correctement pris en compte par l'accumulation des statistiques de performance habituelles. C'est pourquoi il est nécessaire de comptabiliser ces événements, qui peuvent avoir une très faible probabilité, séparément de la performance moyenne ou réelle.

La gestion du réseau électrique en fournit une belle illustration. Les entreprises qui gèrent leurs réseaux sont tenues de planifier suffisamment d'électricité pour faire face à l'événement où leur plus grand générateur (qui serait une centrale nucléaire) tombe en panne, ce qui provoquerait des coupures de courant. Aucune tentative n'est faite pour quantifier l'impact économique d'une coupure de courant. Au lieu de cela, elles la placent simplement dans une catégorie distincte, et exigent de pouvoir gérer une panne majeure.

La littérature sur le risque peut être grossièrement divisée en deux catégories :

- Les discussions générales propres à un domaine, comme les livres de la figure 3.2 pour les applications de chaîne d'approvisionnement, qui fournissent généralement des listes d'événements que les personnes du domaine s'accorderaient à considérer comme constituant un « risque ».
- La littérature de recherche mathématique, largement centrée sur la finance, qui utilise des métriques de risque bien définies telles que la probabilité que le rendement financier tombe en dessous d'une certaine cible (typiquement représentée par « VaR » ou « CVaR »), ou simplement l'écart-type d'une métrique de performance (comme le rendement financier).

Le premier groupe, qui rassemble les types de livres présentés dans la figure 3.2, utilise un langage simple pour décrire des événements que la plupart des gens s'accorderaient généralement à considérer comme des exemples de risque à éviter. Le second groupe est constitué de livres et d'articles souvent hautement théoriques, mais qui limitent leurs caractérisations du risque aux valeurs extrêmes de distributions de probabilité bien définies.

Étonnamment, ni l'une ni l'autre de ces littératures ne fournit ce que l'on pourrait qualifier de définition formelle du risque, applicable de manière large à l'ensemble des contextes dans lesquels le risque semble poser problème. Nous proposons ici une telle définition, mais nous commençons par donner un nom formel à notre objectif initial, qui repose sur une simulation de notre processus, que ce soit dans un simulateur ou sur le terrain :

**L'objectif de base** – C'est la manière dont nous évaluerions notre processus de prise de décision au fil du temps sur le terrain, à travers l'accumulation normale de métriques de performance (incluant, sans s'y limiter, les comptes de résultats). Pour les entreprises, cela s'exprime généralement (mais pas toujours) en unités monétaires, mais il pourrait s'agir de décès dans un contexte de santé publique, de miles chargés par conducteur pour une entreprise de camionnage, ou de votes lors d'une élection présidentielle.

Nous sommes maintenant prêts à définir le risque :

**Le risque** – Le risque comporte deux dimensions :

- Les événements de risque – Ce sont des événements qui, selon le jugement subjectif d'experts du domaine (managers, médecins, politiciens), ne sont pas correctement pris en compte par l'objectif de base. Les événements de risque ne sont pas des mesures quantitatives – ce sont des caractérisations d'événements en langage naturel.
- Les métriques de risque – C'est ici que nous transformons un événement de risque en une ou plusieurs métriques quantifiant l'impact d'un événement sur la performance actuelle ou à long terme d'un système. Les métriques de risque ne sont pas nécessairement exprimées dans les mêmes unités que l'objectif de performance de base. Les métriques de risque peuvent être ajoutées à l'objectif à l'aide d'un facteur d'échelle, ou traitées comme des limites.

Dans la plupart des applications, le risque est saisi comme sa propre métrique, qui pourrait être des coupures de courant dépassant une certaine limite, une baisse des approvisionnements en pièces nécessitant un arrêt de production, ou des événements entraînant de graves conséquences sanitaires. La plupart du temps, l'objectif est de maintenir le risque en dessous d'une limite définie par l'utilisateur (nous supposons que nous cherchons toujours à réduire notre ou nos métriques de risque).

Il est intéressant de noter que la littérature mathématique sur le risque combine habituellement l'objectif de base et la métrique de risque en une seule fonction d'utilité, à l'aide d'un paramètre de risque ajustable. Bien que cela puisse éventuellement constituer une approche valable pour combiner deux métriques, nous ne sommes pas prêts à faire cette hypothèse.

Nous notons que si l'objectif de base est toujours une moyenne ou une estimation échantillonnée d'une moyenne, une métrique de risque est souvent calculée non pas comme une moyenne (ou une espérance), mais plutôt comme un événement susceptible de se produire, éventuellement avec une probabilité totalement inconnue.

## À un instant donné vs. dans le temps

Il existe une vaste littérature sur les problèmes qui impliquent de prendre des décisions dans le temps. La gestion des stocks est clairement un problème qui doit être résolu dans le temps, en équilibrant les coûts de détention des stocks avec la possibilité de ruptures de stock à mesure que de nouvelles commandes deviennent connues. Mais qu'en est-il d'un problème d'affectation des conducteurs aux chargements, d'équilibrage d'un portefeuille d'investissement, ou de décision quant à l'emplacement d'entrepôts ? Dans les années 1950, résoudre l'un quelconque de ces problèmes à un instant unique représentait un défi majeur.

Aujourd'hui, nous disposons de logiciels capables de résoudre très rapidement même des instances de grande taille de ces problèmes, mais cela nous laisse toujours face au défi de prendre des décisions qui fonctionnent bien dans le temps. Par exemple, affecter un conducteur à un chargement à destination du Montana, qui est très isolé, peut créer des problèmes lorsque le conducteur termine ce chargement et doit trouver un autre chargement. Nous devons réfléchir à la question de savoir si nous voulons même accepter la demande de déplacer ce chargement, et si oui, quel conducteur y affecter ? La résolution de séquences de problèmes d'affectation est représentée dans la figure 3.3. Nos portefeuilles boursiers doivent bien fonctionner même lorsque les prix des actifs varient dans le temps, et l'emplacement des entrepôts doit anticiper les schémas de demande futurs.

Au moment où ce livre est écrit, nous comprenons que les problèmes de stocks doivent être optimisés dans le temps. Cependant, la communauté spécialisée dans les modèles d'optimisation pour des problèmes complexes, tels que le problème d'affectation des conducteurs, le problème de gestion de portefeuille et le problème de localisation d'entrepôts, doit chacune refléter l'effet de nouvelles informations, ainsi que l'impact des décisions actuelles sur l'avenir. Nous disposons de logiciels puissants pour résoudre ces problèmes à un instant donné, mais de rien pour optimiser la performance dans le temps.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DynamicAssignmentProblem.jpg" alt="The assignment problem has to be solved repeatedly, and decisions made at one point in time have an impact on future problems.">
  <figcaption><span class="fig-num">Figure 3.3.</span> Nous illustrons ici le fait que le problème d'affectation doit être résolu de manière répétée. De plus, les décisions prises à un instant donné ont un impact sur les problèmes futurs.</figcaption>
</figure>

Lorsque nous avons des problèmes qui doivent être résolus de manière répétée, nous devons saisir :

- L'impact d'une décision actuelle sur les décisions ultérieures.
- L'arrivée de nouvelles informations que nous ne connaissions pas à l'avance.

L'arrivée de nouvelles informations introduit une complication importante lors de la prise de décisions dans le temps (et pratiquement tous les problèmes résolus dans le temps doivent le faire en présence de nouvelles informations). Par exemple, dans notre problème d'affectation, la nouvelle information pourrait être l'arrivée de nouveaux chargements à déplacer. Les nouveaux chargements à déplacer le mardi ne seraient pas connus lorsque nous prenons des décisions le lundi. Par conséquent, si nous affectons des conducteurs le lundi, les chargements qui pourraient être commandés le mardi sont incertains. Nous pourrions également dire que les chargements à commander dans le futur sont « aléatoires » (ou « stochastiques », un terme privilégié par la communauté de la modélisation mathématique).

Pour le problème d'optimisation de l'affectation des conducteurs aux chargements, nous devons saisir l'arrivée de nouveaux chargements, et la manière dont les affectations de conducteurs des jours précédents affectent le statut des conducteurs aujourd'hui. Pour évaluer la performance, nous exécuterions une simulation qui comporterait les étapes suivantes :

- Commencer par résoudre le problème le lundi avec les chargements connus à ce moment-là.
- Avancer jusqu'au mardi, puis observer les chargements qui se trouvent être commandés.
- Optimiser l'affectation des conducteurs aux chargements le mardi en utilisant ce qui est connu.
- Avancer jusqu'au mercredi et répéter le processus.
- Répéter jusqu'à atteindre la fin de notre période de simulation.

Imaginons maintenant que nous répétions tout ce processus en recommençant le lundi, mais qu'à mesure que nous avançons, nous échantillonnons différents ensembles de chargements commandés. Cela signifie que nous pourrions simuler la prise de décisions dans le temps, et nous obtiendrions des résultats complètement différents.

Il existe différentes façons de prendre des décisions pour affecter les conducteurs aux chargements qui pourraient tenir compte de l'impact des décisions actuelles sur l'avenir. Imaginons que nous ayons trois méthodes. Nous pourrions évaluer chaque méthode en exécutant des simulations répétées, puis en calculant une moyenne. Par exemple, nous pourrions effectuer 20 simulations de chaque méthode de prise de décision et utiliser cette moyenne pour évaluer les méthodes.

Les problèmes qui impliquent de prendre des décisions dans le temps sont monnaie courante ; en fait, il se pourrait qu'ils représentent la grande majorité des problèmes de décision. Chaque application du Chapitre 2 est un problème de décision séquentielle. Par exemple :

- Planification des stocks – Nous devons commander des stocks de manière répétée, lesquels arrivent après un délai de livraison (typiquement aléatoire), pendant lequel nous devons encore satisfaire les commandes qui arrivent. La règle que nous utilisons pour placer les commandes (typiquement connue comme une « politique de stock ») doit être évaluée dans le temps. Si les délais de livraison sont, disons, de trois mois, nous devrions simuler la politique pendant plusieurs années, et le faire de manière répétée.
- Les décisions de tarification et de publicité doivent être prises au fil du temps, à mesure que nous observons comment le marché répond à ces incitations. Une décision à un moment donné produit de l'information (comme la réponse du marché) qui peut être utilisée pour éclairer les choix publicitaires futurs. En même temps, ces décisions épuisent le budget publicitaire.
- Les décisions de production et de stockage d'électricité doivent être prises au fil du temps à mesure que nous observons les variations météorologiques, les pannes de générateurs, et comment le public répond aux changements météorologiques. Les décisions concernant quels générateurs allumer ou éteindre modifient l'état physique du système dans le futur.
- Les traitements médicaux impliquent des décisions concernant la réalisation de tests et l'expérimentation de différents traitements pour voir comment le patient répond.
- L'allocation de stylos de naloxone pour gérer les surdoses d'opioïdes doit être effectuée au fil du temps à mesure que nous observons comment les responsables de la santé et les usagers de drogues s'adaptent à la disponibilité de cette ressource.
- Les campagnes présidentielles doivent prendre des décisions concernant la publicité et la planification des visites des candidats tout en surveillant les sondages pour voir comment les électeurs réagissent.
- Les gestionnaires de fonds communs de placement doivent ajuster le montant de liquidités qu'ils détiennent en observant les changements du marché, ainsi que le rythme des dépôts et retraits effectués par leurs clients.

Il est quelque peu surprenant que, alors que la littérature sur la résolution des problèmes de décision statiques est incroyablement mature, la communauté de recherche académique qui travaille sur ces problèmes n'ait pas adopté de cadre standard pour modéliser et résoudre les problèmes séquentiels.

Nous reviendrons sur ces questions dans le Volume II lorsque nous commencerons à utiliser un peu de notation. Sans notation, la discussion se réduit à beaucoup de gesticulations verbales.

## Métriques de performance psychologiques

Pratiquement toute la littérature d'optimisation suppose qu'il existe une métrique de performance bien définie, appelée fonction objectif, qui peut être utilisée pour évaluer les décisions. La fonction objectif peut ne pas être connue exactement, mais nous supposons que l'incertitude peut être quantifiée ou au moins échantillonnée. En revanche, la majeure partie de la littérature sur la psychologie de la prise de décision se concentre sur la manière dont les gens évaluent des alternatives complexes, ce qui s'explique probablement par le fait que ce sont les problèmes de décision les plus intéressants et les plus difficiles.

Dans cette section, nous commencerons par identifier certaines métriques complexes, suivies d'un échantillon de théories sur la manière dont les gens gèrent ces métriques complexes. Nous terminerons par une brève discussion sur la façon dont le cerveau « optimise ».

### Métriques complexes

Voici quelques exemples de problèmes de décision complexes tirés des applications du Chapitre 2 :

- Quel est le meilleur fournisseur pour un composant complexe destiné à un moteur d'avion nécessitant une expertise particulière en matériaux ?
- Quelle est la meilleure façon de commercialiser un produit de consommation pour maximiser les ventes ?
- Quel est le meilleur traitement médical pour gérer un cancer du poumon de stade 3 ?
- Quelle est la meilleure allocation des ressources dans une élection présidentielle (marketing, déplacements pour donner des discours) ?
- Quelle est la meilleure stratégie pour commercialiser un système de répartition complexe auprès des transporteurs routiers longue distance ?

Chacun de ces exemples peut être présenté comme un cas d'« essai et erreur intelligent » (voir la [section Essai et erreur intelligent](/bridging-vol1/fr/chapter-2/#intelligenttrialanderror) du Chapitre 2) où il existe un ensemble de choix discrets. Ce qui rend ces choix difficiles, c'est a) qu'ils sont importants et b) que nous avons une incertitude considérable sur la performance de chacun.

Nous pouvons diviser les problèmes à alternatives complexes en trois classes :

- Nous connaissons les métriques que nous voulons utiliser, mais nous ne connaissons pas leurs valeurs.
- Il existe plusieurs métriques, mais nous ne connaissons pas (précisément) leur importance relative.
- Nous sommes même incapables d'articuler certaines ou toutes les métriques permettant d'évaluer chaque choix.

La première classe a attiré une attention considérable de la littérature d'optimisation, mais elle reste un contexte très courant auquel les gens font fréquemment face, où ils échouent à utiliser les meilleures méthodes pour gérer l'incertitude. La deuxième est un autre sujet courant et implique généralement de proposer différentes alternatives à un décideur qui est ensuite invité à faire un choix. La troisième est un problème courant dans la littérature psychologique, car il existe des problèmes (comme ceux énumérés ci-dessus) où quelqu'un peut avoir une intuition sur le choix qu'il souhaite faire, sans être capable d'articuler pourquoi ce choix est le meilleur.

### Quelques théories sur la formation des métriques

Voici des exemples de différentes théories pour évaluer les alternatives :

**La théorie des perspectives (prospect theory)** - Les principes clés de la théorie des perspectives incluent :

- L'aversion aux pertes – Les gens ressentent la douleur des pertes plus intensément que le plaisir de gains équivalents. Par exemple, perdre \$100 feels worse than the joy of gaining \$100.
- La dépendance au point de référence – Les décisions sont prises par rapport à un point de référence plutôt qu'à des résultats absolus. Les gains et les pertes sont perçus par rapport à ce point de référence.
- L'aversion au risque dans les gains, la recherche de risque dans les pertes – Face à des gains potentiels, les gens ont tendance à préférer les résultats certains aux résultats risqués. Cependant, face aux pertes, ils prennent souvent des risques plus importants pour éviter une perte certaine.
- La sensibilité décroissante – L'impact des changements de richesse diminue à mesure que les montants augmentent. La différence entre perdre \$100 and \$200 semble plus significative qu'entre perdre \$1,000 and \$1 100.
- La pondération des probabilités – Les gens surestiment la probabilité d'événements rares (par exemple, gagner à la loterie) et sous-estiment la probabilité d'événements courants.

**La théorie de la comptabilité mentale** - Cela fait référence à la manière dont les gens organisent, catégorisent et évaluent mentalement les décisions financières en créant des « comptes » séparés dans leur esprit, plutôt que de traiter l'argent comme entièrement interchangeable/fongible. Certains concepts clés incluent :

- Catégorisation : Les gens assignent l'argent à différents budgets mentaux (par exemple, loyer, courses, divertissement) et prennent souvent des décisions de dépenses en fonction de la catégorie plutôt que de la situation financière globale.
- Cadrage : Le même montant d'argent peut être valorisé différemment selon la façon dont il a été acquis — par exemple, \$100 windfall may be spent more freely than \$100 gagné au travail. Cela explique pourquoi certaines personnes peuvent se permettre des dépenses somptuaires avec un remboursement d'impôt tout en étant strictes concernant les dépenses quotidiennes.
- Le sophisme des coûts irrécupérables : Les gens continuent souvent une entreprise perdante (comme assister à un mauvais concert qu'ils ont payé) parce qu'ils ont mentalement « dépensé » l'argent, même s'il est irrécupérable.

**La théorie de l'attribution** - La théorie de l'attribution explique comment les gens interprètent les causes de leur propre comportement et de celui des autres, en particulier dans les contextes de réussite comme le succès ou l'échec. Par exemple, les consommateurs attribuent des raisons à leurs décisions d'achat, ce qui influence la perception et la fidélité à la marque. Trois dimensions des attributs causaux incluent :

- Le lieu (locus) – La cause est-elle interne (par exemple, la capacité, l'effort) ou externe (par exemple, la chance, la difficulté de la tâche) ?
- La stabilité – La cause est-elle stable (constante dans le temps) ou instable (variable) ?
- La contrôlabilité – La personne peut-elle contrôler la cause (comme l'effort), ou est-elle incontrôlable (comme la capacité innée ou la chance) ?

Ces attributions influencent les émotions et la motivation future. Par exemple :

- Attribuer le succès à des facteurs internes et contrôlables (comme l'effort) renforce la motivation et la fierté.
- Attribuer l'échec à des facteurs internes et incontrôlables (comme le manque de capacité) peut conduire à la honte et au découragement. La théorie de Weiner est largement utilisée dans l'éducation, le sport et les contextes organisationnels pour comprendre comment les croyances sur les causes façonnent le comportement et la performance.

### Comment le cerveau apprend à optimiser

Il existe une tendance très forte à attribuer l'intelligence aux réseaux de neurones utilisés pour apprendre les schémas de mots. Bien que la reconnaissance de schémas soit en fait une forme importante d'intelligence, elle est nettement différente du processus de prise de décision, que les humains sont tout à fait capables d'accomplir. Prendre des décisions nécessite la capacité de maximiser des récompenses spécifiques à l'atteinte d'un objectif qui pourrait être lié à l'alimentation, au confort, à l'évitement de la douleur, à la victoire dans une compétition, ou à la résolution d'un problème.

Il s'avère que le cerveau possède des fonctions très spécifiques qui aident à optimiser un objectif qui n'a rien à voir avec la simple correspondance à un schéma. Cela se fait grâce à des parties du cerveau connues comme des récepteurs de récompense, qui sont des protéines spécialisées qui répondent à des neurotransmetteurs, tels que la dopamine, pour aider le cerveau à ressentir du plaisir, de la motivation et un renforcement positif ou négatif. Les neurotransmetteurs sont comme des serrures moléculaires qui sont activées lorsque la bonne clé chimique s'y lie, ce qui déclenche alors des activités neuronales qui guident le comportement.

Les types de récepteurs de récompense sont :

- **Récepteurs de dopamine** – Ce sont les éléments les plus importants du système de récompense, qui existent sous différentes formes :
  - Les récepteurs D1, qui favorisent l'apprentissage par renforcement et aident à maintenir la motivation à long terme.
  - Les récepteurs D2, qui sont impliqués dans le lien social et la régulation de l'humeur.
  - Les récepteurs D3, qui jouent un rôle dans la motivation et le comportement dirigé vers un objectif.
- **Récepteurs opioïdes** – Ceux-ci répondent aux endorphines et à d'autres opioïdes naturels, contribuant aux sensations d'euphorie et au soulagement de la douleur.
- **Récepteurs de sérotonine** – Ceux-ci influencent l'humeur et la récompense émotionnelle et sont souvent utilisés comme cible par les antidépresseurs.
- **Récepteurs de glutamate** – Ceux-ci aident à encoder l'apprentissage et la mémoire liés à la récompense.

Évidemment, toute discussion sur ces mécanismes incroyablement complexes dépasse largement le cadre de ce livre. Le point que nous soulignons est que le cerveau possède des mécanismes spécifiques pour maximiser les récompenses, ce qui lui permet de choisir la meilleure décision. C'est un processus distinct des puissants mécanismes du cerveau pour identifier des schémas. En revanche, les réseaux de neurones utilisés par les grands modèles de langage sont entraînés à identifier des schémas ou du texte ; ceux-ci utilisent une seule fonction objectif, qui capture la similarité entre une fonction (le réseau de neurones) et l'ensemble de données d'entraînement.

## Fixer des objectifs de performance pour les autres

Une dimension importante des métriques est la fixation d'objectifs dans le but d'évaluer la performance de personnes ou de groupes. Cela implique intrinsèquement un contexte multi-agents, où un décideur a l'autorité de fixer des objectifs de performance pour une autre unité au sein d'une organisation. Dans un contexte multi-agents, l'objectif d'un agent peut être la décision prise par un autre agent (présumément de niveau supérieur).

La fixation d'objectifs est un domaine particulièrement riche dans le contexte des organisations comportant plusieurs unités de décision, typiquement organisées de manière hiérarchique. Nous reviendrons sur ce sujet dans un futur volume.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Nommez cinq exemples de métriques de performance.</li>
<li>Qu'entend-on par objectifs, cibles et limites ? Donnez un exemple de métriques qui entreraient dans chacune de ces trois catégories. Vous pouvez utiliser des métriques tirées de n'importe lequel des exemples du Chapitre 2 (elles ne doivent pas toutes provenir du même exemple).</li>
<li>Qu'est-ce qu'un événement de risque ? Donnez des exemples d'événements de risque si vous êtes :
  <ol type="a">
    <li>L'opérateur du réseau électrique d'une région.</li>
    <li>Un médecin travaillant avec un patient pour gérer son diabète.</li>
    <li>Le directeur financier d'une chaîne d'approvisionnement.</li>
  </ol>
</li>
<li>Nommez deux théories sur la manière dont les gens évaluent les choix.</li>
<li>Nommez quatre récepteurs que le cerveau utilise pour récompenser des comportements spécifiques.</li>
<li>Pour chacun des exemples d'événements de risque de l'exercice 3, concevez une métrique de risque pour cet événement.</li>
</ol>

**Questions de modélisation**

<p>Pour chaque question ci-dessous, concevez une pyramide de métriques en utilisant les métriques fournies pour l'application désignée, étant donné le décideur spécifié.</p>

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>Vous êtes responsable de la chaîne d'approvisionnement chargé de sélectionner les fournisseurs pour les composants d'un climatiseur. Les fournisseurs peuvent se trouver n'importe où dans le monde.</li>
<li>Vous devez réapprovisionner les stocks de différents types de meubles pour un magasin de vente au détail de mobilier.</li>
<li>Vous devez planifier des investissements dans de nouvelles capacités de production d'électricité (ces commandes sont passées jusqu'à cinq ans à l'avance).</li>
<li>Vous êtes le gestionnaire des revenus d'un hôtel.</li>
<li>Vous êtes le médecin qui choisit le traitement d'un patient diabétique.</li>
<li>Vous êtes le fonctionnaire de l'État chargé de répartir les kits de naloxone entre les comtés de votre État.</li>
<li>Vous êtes une entreprise pharmaceutique qui doit choisir quels médicaments soumettre aux essais de phase II.</li>
<li>Vous êtes le directeur de campagne d'une élection présidentielle.</li>
<li>Vous êtes le vice-président des opérations d'un transporteur de camions complets qui doit gérer les répartiteurs (qui assignent les conducteurs aux chargements) et les gestionnaires de chargement (qui déterminent quels chargements déplacer).</li>
<li>Vous êtes le gestionnaire de fonds commun de placement qui doit déterminer le montant de liquidités à conserver.</li>
</ol>
{% endraw %}
