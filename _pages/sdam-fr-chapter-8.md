---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 8 : Stockage d'énergie I"
permalink: /sdam/fr/chapter-8/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 46e5d45993dd1cd0
---


{% raw %}
## Vue d'ensemble du chapitre

Ce chapitre examine ce qui, à première vue, ressemble à un problème de stock assez simple qui se pose lors du stockage d'énergie que l'on peut acheter au réseau ou lui revendre, un réseau caractérisé par des prix fortement stochastiques. Contrairement aux six premiers chapitres, nous utilisons un ensemble beaucoup plus riche de modèles pour décrire ces prix stochastiques, ce qui commence à laisser entrevoir la complexité que l'on peut rencontrer lors de la modélisation de l'incertitude. Nous proposons un tour d'horizon des différents modèles de processus de prix, incluant les modèles classiques de séries temporelles, les modèles de diffusion avec sauts (pour capturer les pics), les distributions par quantiles, et enfin un modèle hybride qui combine les distributions par quantiles avec les distributions normales standard, ouvrant ainsi la voie à l'utilisation de méthodes qui reposent sur la normalité.

Nous décrivons ensuite une série de politiques, en commençant par une politique de base « acheter bas, vendre haut » (une forme d'approximation de fonction de politique) avant de passer à plusieurs méthodes fondées sur l'approximation de l'équation de Bellman, que nous avons vue pour la première fois au [Chapitre 5](/sdam/fr/chapter-5/). Nous commençons par une description élémentaire de l'équation de Bellman (qui est infaisable sur le plan computationnel pour presque tous les problèmes), puis nous proposons un tour d'horizon des variantes connues sous le nom de programmation dynamique approximative (ADP) rétrograde, d'ADP progressive, et d'une stratégie hybride utilisant l'ADP progressive combinée à un réglage des paramètres.

## Récit

Le New Jersey cherche à développer 3 500 mégawatts (MW) de capacité de production d'énergie éolienne en mer. Un défi réside dans le fait que le vent (et en particulier le vent en mer) peut être très variable. L'effet de cette variabilité sur le réseau électrique est amplifié par le fait que la puissance éolienne (sur des plages intermédiaires) augmente avec le cube de la vitesse du vent. Cette variabilité est illustrée à la Figure 8.1.

<figure class="book-figure">
  <img src="/assets/images/sdam/windpower.png" alt="Puissance produite par cinq niveaux de capacité de production éolienne." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 8.1.</span> Puissance produite par cinq niveaux de capacité de production éolienne.</figcaption>
</figure>

L'énergie éolienne est devenue populaire dans les régions où le vent est fort, comme le Midwest américain, les régions côtières d'Europe, le nord-est du Brésil et les régions du nord de la Chine (pour n'en citer que quelques-unes). Il arrive que des communautés (et des entreprises) investissent dans les énergies renouvelables (éolien ou solaire) pour réduire leur empreinte carbone et minimiser leur dépendance au réseau.

Il est cependant assez rare que ces projets permettent à une communauté d'éliminer totalement le réseau de son portefeuille énergétique. La pratique courante consiste à laisser la source renouvelable (éolienne ou solaire) vendre directement au réseau, tandis qu'une entreprise peut acheter au réseau. Cela peut être utile comme couverture, puisque l'entreprise gagnera beaucoup d'argent pendant les pics de prix (les prix peuvent passer de 20 ＄ par mégawattheure (mwh) à 300 ＄ par mwh, voire plus), ce qui compense le coût de l'achat d'énergie pendant ces périodes.

La principale difficulté avec les énergies renouvelables est la gestion de la variabilité. Bien qu'une solution consiste simplement à injecter toute l'énergie provenant d'une source renouvelable dans le réseau et à utiliser la capacité de ce dernier pour gérer cette variabilité, on s'intéresse de plus en plus au stockage (en particulier le stockage par batterie) pour lisser les pics et les creux. En plus de lisser la variabilité de la source renouvelable, on s'intéresse également à l'utilisation des batteries pour tirer parti des pics de prix, en achetant de l'énergie lorsqu'elle est bon marché (les prix peuvent même devenir négatifs) et en la revendant lorsqu'ils sont élevés. Exploiter la variabilité des prix de l'énergie sur le réseau pour acheter lorsque les prix sont bas et vendre lorsqu'ils sont élevés est connu sous le nom d'arbitrage sur batterie.

<figure class="book-figure">
  <img src="/assets/images/sdam/storagegrid.jpg" alt="Système réseau-vers-stockage pour la stabilisation de la puissance et l'arbitrage sur batterie." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 8.2.</span> Système réseau-vers-stockage pour la stabilisation de la puissance et l'arbitrage sur batterie.</figcaption>
</figure>

Nous allons utiliser la configuration illustrée à la Figure 8.2 pour illustrer un certain nombre de questions de modélisation et d'algorithmique liées au stockage d'énergie. Ce problème apportera des éclairages applicables à pratiquement tout problème de stock/stockage, notamment :

- Détenir des liquidités dans des fonds communs de placement – Une banque doit déterminer quelle part de son capital d'investissement conserver en liquidités pour répondre aux demandes de rachat, plutôt que d'investir cet argent dans des prêts, des actions et des obligations.
- Les détaillants (aussi bien en ligne que les magasins physiques) doivent gérer des stocks de centaines de milliers de produits.
- Les concessionnaires automobiles doivent décider du nombre de voitures à conserver pour répondre à la demande des clients.
- Les cabinets de conseil doivent décider du nombre d'employés à garder en poste pour répondre à la demande variable des différents projets de conseil.

Le stockage d'énergie est une forme particulièrement riche de problème de stock. Bien que nous n'allons pas considérer toutes les variantes possibles (qui sont innombrables), notre problème présentera les caractéristiques suivantes :

- Les prix de l'électricité sur le réseau peuvent être très volatils. Au début des années 2000, les prix de l'énergie se situaient généralement autour de 20 à 25 ＄ par mwh, mais grimpaient souvent à plus de 300 ＄, et pouvaient dépasser 1000 ＄, typiquement lors d'événements météorologiques extrêmes.
- L'énergie éolienne peut être prévue, bien que pas très bien. Des prévisions glissantes sont disponibles pour mettre à jour ces estimations.
- L'énergie solaire présente trois types de variabilité : le processus hautement prévisible du cycle diurne du lever et du coucher du soleil, la présence de journées très ensoleillées ou très nuageuses (celles-ci peuvent généralement être prévues un jour ou plus à l'avance), et la variabilité des nuages localisés qui sont difficiles à prévoir même une heure à l'avance, mais qui peuvent créer des surtensions importantes sur le réseau.
- La demande d'énergie est variable, mais relativement prévisible, car elle dépend principalement de la température (et, dans une moindre mesure, de l'humidité).
- L'énergie peut être achetée au réseau ou vendue au réseau aux prix courants du réseau. De même, l'énergie provenant de la source renouvelable peut être utilisée pour satisfaire la charge actuelle (demande de puissance), stockée, ou revendue au réseau (selon la configuration).
- Il y a une perte d'environ 5 à 10 pour cent lors de la conversion de la puissance du courant alternatif (CA, tel qu'il arrive via le réseau) en courant continu (CC, requis pour stocker l'énergie dans la batterie).

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont les suivantes :

- **Métriques :** Nous souhaitons minimiser le prix moyen que nous payons pour l'électricité achetée au réseau.
- **Décisions :** La quantité d'énergie que nous achetons à chaque pas de temps au réseau, ou que nous lui revendons.
- **Incertitudes :** Le prix de l'électricité à chaque pas de temps.

## Modèle de base

Nous allons utiliser une séquence de variantes de ce problème pour illustrer différentes questions de modélisation, en commençant par un système de base utilisant une batterie pour acheter au réseau et lui vendre afin de tirer parti de la volatilité des prix. Pour cette application, nous allons avancer par incréments de temps de 5 minutes, puisque c'est la fréquence à laquelle les prix sont mis à jour sur le réseau (cet incrément de temps varie selon l'opérateur du réseau).

### Variables d'état

Pour notre modèle de base, nous n'avons besoin de suivre que deux variables : $R_t$, la quantité d'énergie (mesurée en mégawattheures, ou mwh) stockée dans la batterie au temps $t$ ; et $p_t$, le prix de l'énergie sur le réseau. Notre variable d'état est alors

$$
S_t = (R_t, p_t).
$$

La variable d'état devient rapidement plus complexe à mesure que nous ajoutons différents éléments au modèle. Par exemple, la variable d'état représentant les prix dépend de la façon dont nous modélisons le processus de prix, comme décrit dans la fonction de transition (voir ci-dessous).

### Variables de décision

Notre seule décision est d'acheter au réseau ou de lui vendre : $x_t$, la quantité d'énergie achetée au ($x_t > 0$) ou vendue au ($x_t < 0$) réseau.

Lorsque nous transférons de l'énergie dans ou hors de la batterie, nous allons supposer que nous ne récupérons qu'une fraction $\eta$ lors du transfert, impliquant une perte de $1-\eta$. Par souci de simplicité, nous allons supposer que cette perte est la même, que nous soyons en train de charger ou de décharger la batterie.

La décision est limitée par la capacité de la batterie, ce qui signifie que nous devons respecter les contraintes

$$
x_t \leq \frac{1}{\eta} (R^{max} - R_t), \qquad x_t \geq -\eta R_t,
$$

où la première contrainte s'applique lorsque nous achetons au réseau ($x_t > 0$) tandis que la seconde contrainte s'applique lorsque nous vendons au réseau ($x_t < 0$).

Comme toujours, nous supposons que les décisions sont prises avec une politique $X^\pi(S_t)$, à déterminer ci-dessous.

### Information exogène

Dans notre modèle de base, la seule information exogène est le changement des prix. Nous pouvons supposer que le prix à chaque pas de temps est révélé, sans aucun modèle permettant de prédire le prix à partir des prix passés. Dans ce cas, notre information exogène $W_t$ serait

$$
W_{t+1} = p_{t+1}.
$$

Alternativement, nous pouvons supposer que nous observons le changement de prix $\phat_t = p_t - p_{t-1}$, auquel cas nous écririons

$$
W_{t+1} = \phat_{t+1}.
$$

### Fonction de transition

L'évolution des variables d'état est donnée par

$$
\begin{align}
R_{t+1} &= \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases} \label{eq:energytransition1}\\
p_{t+1} &= p_t + \phat_{t+1}. \label{eq:energytransition2}
\end{align}
$$

Cette manière de modéliser le processus de prix en « observant » le changement de prix nous aide lors de l'écriture de la fonction de transition. En pratique, nous observerions généralement $p_{t+1}$ directement (plutôt que le changement), auquel cas il n'est pas nécessaire d'avoir une équation de transition explicite. Ces deux équations constituent notre fonction de transition $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.

Plus tard, nous trouverons utile de modéliser l'état post-décision $S^x_t$, qui est l'état juste après avoir pris une décision $x_t$, mais avant l'arrivée de toute nouvelle information. L'état de ressource post-décision est

$$
R^x_t = \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases}
$$

Comme la variable de stockage évolue de manière déterministe, la transition vers l'état pré-décision suivant est simplement

$$
R_{t+1} = R^x_t.
$$

Le prix $p_t$, en revanche, n'est pas affecté par la décision, de sorte que le prix post-décision serait simplement

$$
p^x_t = p_t.
$$

Cela signifie que l'état post-décision est

$$
S^x_t = (R^x_t, p_t).
$$

### Fonction objectif

Au cours de n'importe quelle période, le montant d'argent que nous gagnons ou perdons est donné par

$$
C(S_t,x_t) = -p_t x_t.
$$

Notre fonction objectif est alors le problème canonique donné par

$$
\max_\pi \E \sum_{t=0}^T -p_t X^\pi(S_t),
$$

où $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ est donné par les équations $\eqref{eq:energytransition1}$ et $\eqref{eq:energytransition2}$. Nous devons également spécifier l'état initial $S_0$ (c'est-à-dire $R_0$ et $p_0$) et disposer d'une méthode pour générer $W_1, W_2, \ldots$, que nous décrivons ensuite.

## Modélisation de l'incertitude

Dans notre problème de vente d'actif au [Chapitre 2](/sdam/fr/chapter-2/), nous avons supposé que nous pouvions modéliser les prix selon

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

où nous avons ensuite supposé que $\varepsilon_{t+1}$ suivait une distribution normale de moyenne 0 et de variance connue. La Figure 8.3 montre les prix du réseau, connus sous le nom de « prix marginaux locaux » (ou LMP dans la terminologie du secteur de l'énergie) sur une année, ce qui illustre l'énorme volatilité que présentent les prix sur le réseau. Cette volatilité provient du fait qu'il existe des pics de charge (ou des pertes de puissance) pouvant créer des pénuries à court terme. Comme la demande est inélastique (le réseau est censé répondre à 100 pour cent de la charge), les prix peuvent être multipliés par un facteur de 20 à 50 pendant de courtes périodes (les prix sont mis à jour par incréments de 5 minutes).

<figure class="book-figure">
  <img src="/assets/images/sdam/pjmlmp.png" alt="Prix marginaux locaux pour le réseau PJM (par intervalles de 5 minutes) pour 2010." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 8.3.</span> Prix marginaux locaux pour le réseau PJM (par intervalles de 5 minutes) pour 2010.</figcaption>
</figure>

Il existe plusieurs méthodes pour modéliser les prix de l'électricité. Nous allons en décrire ci-dessous quatre qui ont été utilisées pour ce problème.

### Modèles de séries temporelles

La littérature sur les séries temporelles est assez riche, aussi allons-nous simplement illustrer un modèle de base qui représente le prix $p_{t+1}$ en fonction de l'historique récent des prix. À titre d'illustration, nous allons utiliser les trois dernières périodes, ce qui signifie que nous écririons notre modèle comme suit

$$
\begin{align}
p_{t+1} &= \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}, \label{eq:energytimeseriesmodel}\\
        &= \thetabar^T_t \phi_t + \varepsilon_{t+1}, \nonumber
\end{align}
$$

où

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \\ p_{t-2} \end{pmatrix}
$$

est notre vecteur de prix. Nous supposons que le bruit $\varepsilon \sim N(0,\sigma^2\_\epsilon)$ pour un $\sigma^2\_\epsilon$ donné.

Le vecteur de coefficients $\thetabar_t = (\thetabar_{t0},\thetabar_{t1},\thetabar_{t2})^T$ peut être estimé de manière récursive. Supposons que nous partions d'une estimation initiale $\thetabar_0$ du vecteur de coefficients. Nous aurons également besoin d'une matrice trois par trois $M_0$ que nous pouvons pour l'instant supposer être une matrice identité mise à l'échelle (nous donnons une meilleure idée ci-dessous).

L'équation de mise à jour de base pour $\thetabar_t$ est donnée par

$$
\thetabar_{t+1} = \thetabar_t - H_t\phi_t \varepsilon_{t+1},
$$

L'erreur $\hat{\varepsilon}\_t$ est calculée à l'aide de

$$
\varepsilon_{t+1} = \thetabar^T_{t}\phi_t - p_{t+1}.
$$

La matrice trois par trois $H_t$ est calculée à l'aide de

$$
H_t=\frac{1}{\gamma_t}M_t,
$$

où la matrice $M_t$ est calculée récursivement en utilisant

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}).
$$

La variable $\gamma_t$ est un scalaire calculé en utilisant

$$
\gamma_t = 1 + (\phi_t)^TM_{t-1}\phi_t.
$$

Ces équations nécessitent des estimations initiales pour $\thetabar_0$ et $M_0$. Une façon de procéder consiste à collecter quelques données initiales, puis à résoudre un problème d'estimation statique. Supposons que vous observiez $K$ prix. Soit $Y_0$ un vecteur colonne à $K$ éléments des prix observés $p_3, p_4, \ldots, p_{K+3-1}$ (nous devons commencer par le troisième prix en raison de notre besoin des trois prix précédents dans notre modèle).

Soit ensuite $X_0$ une matrice à $K$ lignes, où chaque ligne consiste en $p_k, p_{k-1}, p_{k-2}$. Notre meilleure estimation de $\thetabar$ est donnée par les équations normales

$$
\thetabar_0 = [(X_0)^T X_0]^{-1} (X_0)^T Y_0.
$$

Enfin, soit $M_0 = [(X_0)^T X_0]^{-1}$, ce qui montre que la matrice $M_t$ est l'estimation au temps $t$ de $[(X_t)^T X_t]^{-1}$.

Il existe des familles entières de modèles de séries temporelles qui capturent la relation entre variables au fil du temps. Si nous devions simplement appliquer ces méthodes directement aux données de prix, les résultats seraient assez médiocres. Premièrement, les prix ne suivent pas une distribution normale. Deuxièmement, bien que les prix puissent devenir négatifs, cela reste assez rare. Cependant, une application directe de ce modèle produirait très probablement des prix négatifs si la variance $\sigma^2\_\epsilon$ était calibrée sur le bruit élevé de ce type de données. Enfin, le comportement des sauts de prix au fil du temps ne serait pas réaliste.

### Diffusion à sauts

Une critique majeure du modèle linéaire ci-dessus est qu'il rend mal compte des grands pics familiers dans l'étude des prix de l'électricité. Une idée simple pour surmonter cette limitation consiste à utiliser ce que l'on appelle un *modèle de diffusion à sauts* (jump diffusion model), où l'on ajoute un autre terme de bruit à l'équation $\eqref{eq:energytimeseriesmodel}$, ce qui nous donne

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1} + \mathbb{I}_t \varepsilon^J_{t+1}.
$$

Ici, la variable indicatrice $\mathbb{I}\_t = 1$ avec une certaine probabilité $p^{jump}$, et le bruit $\varepsilon^J_{t+1}$ suit une distribution normale de moyenne $\mu^{jump}$ (qui est généralement beaucoup plus grande que zéro) et de variance $(\sigma^{jump})^2$, laquelle est assez grande.

Nous devons estimer la probabilité de saut $p^{jump}$, ainsi que la moyenne et la variance $(\mu^{jump}, (\sigma^{jump})^2)$. Pour cela, on commence par un modèle de base où $p^{jump} = 0$. Nous utilisons ce modèle de base pour estimer $\sigma^2\_\epsilon$. Nous choisissons ensuite une tolérance, par exemple trois écarts-types (c'est-à-dire $3 \sigma_\epsilon$), et toute observation en dehors de cette plage est due à une autre source de bruit. Soit $p^{jump}$ la fraction des pas de temps où ces observations se produisent. Ensuite, on calcule la moyenne et l'écart-type de ces observations pour obtenir $(\mu^{jump}, (\sigma^{jump})^2)$.

Nous ne nous arrêtons pas là. Après avoir retiré ces variations extrêmes des données, nous devrions réajuster notre modèle linéaire sans ces observations. La pratique standard consiste à répéter ce processus plusieurs fois jusqu'à ce que ces estimations cessent de changer.

Les modèles de diffusion à sauts reproduisent mieux les queues de distribution, mais cela dépend encore du comportement de queue de la distribution normale. On peut obtenir un meilleur ajustement en reconnaissant que la variance du bruit dépend de la température, et en particulier des températures extrêmes. Nous pourrions regrouper les températures en trois plages : en dessous du point de congélation, au-dessus de 90 degrés Fahrenheit, et entre ces deux valeurs. L'introduction d'une dépendance à la température, tout en ajoutant une nouvelle variable à l'ensemble des variables d'état, introduit un degré de complexité supplémentaire (l'effet de cela dépend de la classe de politique).

### Distributions par quantiles

S'il peut être possible d'ajuster d'autres distributions paramétriques, une stratégie puissante consiste à calculer numériquement la distribution cumulative à partir des données, créant ce que l'on appelle souvent une *distribution par quantiles*. Pour la calculer, il suffit de trier les prix du plus petit au plus grand. Notons cette séquence ordonnée $\ptilde_t$, où $\ptilde_{t-1} \leq \ptilde_t$. Soit $T = 105,210$ le nombre de périodes de 5 minutes dans une année. Le pourcentage de pas de temps avec un prix inférieur à $\ptilde_t$ est alors $t/T$. Nous pouvons créer une distribution cumulative en utilisant

$$
F_P(\ptilde_t) = \frac{t}{T},
$$

ce qui est illustré à la Figure 8.4.

<figure class="book-figure">
  <img src="/assets/images/sdam/cdfprices.png" alt="Distribution par quantiles des prix." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 8.4.</span> Distribution par quantiles des prix.</figcaption>
</figure>

Nous pouvons créer une distribution continue $F_P(p)$ pour tout $p$ en trouvant le plus grand $\ptilde_t < p$ et en fixant $F_P(p)$ à cette valeur, créant ainsi une fonction en escalier. La fonction $F_P(p)$ est une forme de distribution *non paramétrique*, puisque nous n'ajustons la distribution à aucune forme paramétrique connue. La bonne nouvelle est qu'elle correspondra parfaitement aux données, ce qui signifie que nous représenterons avec précision les queues extrêmes qui surviennent avec les prix de l'électricité. L'inconvénient est que nous avons besoin d'un bon jeu de données pour créer ces distributions, et nous devons conserver ce jeu de données pour calculer la distribution, plutôt que de simplement stocker un petit nombre de paramètres comme nous le ferions si nous ajustions un modèle paramétrique pour la distribution.

Nous pouvons échantillonner à partir de cette distribution en générant une variable aléatoire $U$ uniformément distribuée entre 0 et 1. Disons que nous générons $U= 0.70$. Nous voulons alors trouver le prix $p^{.70}$ qui correspond à $F_P(p^{.70}) = 0.70$, comme illustré à la Figure 8.4. Nous écrivons cela mathématiquement en définissant la fonction inverse $F^{-1}\_P(u)$ qui renvoie le prix $p$ produisant $F_P(p) = u$. Nous pouvons échantillonner de manière répétée à partir de notre distribution de prix en échantillonnant simplement la variable aléatoire uniforme $U$ puis en observant un prix $p=F^{-1}\_P(U)$.

### Séries temporelles hybrides avec données transformées

Une stratégie puissante consiste à combiner l'utilisation de distributions empiriques avec des méthodes classiques de séries temporelles. Nous commençons par ajuster une distribution empirique aux données de prix, ce qui nous donne la distribution cumulative $F_P(p)$. Maintenant, soit $p_t$ un prix et calculons $u_t = F_P(p_t)$, où $0\leq u_t \leq 1$. Ensuite, soit $\Phi(z)$ la distribution cumulative d'une variable aléatoire normale standard $Z \sim N(0,1)$, et soit $\Phi^{-1}(u)$ son inverse. Posons ensuite $z_t = \Phi^{-1}(u_t)$. Le processus de correspondance $p_t \rightarrow u_t \rightarrow z_t$ est illustré à la Figure 8.5.

<figure class="book-figure">
  <img src="/assets/images/sdam/normaltoanything.png" alt="Transformation d'une distribution empirique en distribution normale (et inversement)." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 8.5.</span> Transformation d'une distribution empirique en distribution normale (et inversement).</figcaption>
</figure>

Nous pouvons utiliser cette méthode pour transformer les prix fortement non normaux $p_t$ en la séquence $z_t$ de valeurs distribuées normalement avec une moyenne de 0 et une variance de 1, où nous pouvons également capturer les corrélations. Nous pouvons ensuite effectuer une modélisation de séries temporelles quelconque sur la séquence $z_t$. Après cela, toute estimation issue de ce modèle normalisé peut être retransformée en prix en parcourant le chemin de la Figure 8.5 dans le sens inverse : $u_t = \Phi(z_t)$, puis $p_t = F^{-1}\_P(u_t)$.

Cette stratégie est très efficace lorsqu'on traite des données qui ne sont pas distribuées normalement, et fonctionne bien mieux que le modèle de diffusion à sauts, qui est populaire en finance.

## Conception des politiques

Nous allons illustrer la résolution de ce problème en utilisant deux classes de politiques, plus une hybride :

- **Recherche de politique** – Nous allons utiliser une politique paramétrée simple d'achat bas, vente haut. Celle-ci appartient à la classe des politiques PFA (approximations de fonction de politique).
- **Politique d'anticipation** – Nous utiliserons l'équation de Bellman pour produire une approximation de fonction de valeur qui approxime l'impact d'une décision actuelle sur le futur. Celle-ci appartient à la classe des politiques VFA (politiques basées sur des approximations de fonction de valeur).
- **Politique hybride** – Enfin, nous allons introduire une classe de politique ajustable qui commence par une politique basée sur des fonctions de valeur, puis passe à la recherche de politique pour affiner davantage la politique. Celle-ci débutera comme une politique VFA, mais évoluera vers une approximation de fonction de coût paramétrique (CFA) lorsque nous utiliserons la recherche de politique pour ajuster les paramètres de ce qui a commencé comme une approximation de fonction de valeur.

Les politiques basées sur l'équation de Bellman nécessitent de calculer (ou d'approximer) la valeur $V_{t+1}(S_{t+1})$ résultant du fait d'être dans un état $S_t$, de prendre une décision $x_t$, puis d'observer une information exogène aléatoire $W_{t+1}$. Nous avons vu ces méthodes pour la première fois dans le contexte des problèmes de plus court chemin. Une différence significative maintenant est que l'état $S_{t+1}$ est aléatoire étant donné $S_t$ et $x_t$ (dans le problème de plus court chemin, seul le coût $\chat_t$ était aléatoire). De plus, notre variable d'état a maintenant deux dimensions continues, plutôt que le simple nœud discret.

Nous décrivons d'abord la politique d'achat bas, vente haut, puis introduisons trois méthodes basées sur l'approximation de l'équation de Bellman :

- La programmation dynamique rétrograde classique, qui produit une politique optimale.
- La programmation dynamique approximative rétrograde.
- La programmation dynamique approximative directe.

Nous terminons par une description d'une politique hybride qui combine des approximations de fonction de valeur issues de l'équation de Bellman avec une forme de recherche de politique.

### Achat bas, vente haut

Une politique d'achat bas, vente haut fonctionne sur le principe simple de charger la batterie lorsque le prix descend en dessous d'une limite inférieure, et de vendre lorsque le prix dépasse une limite supérieure. La politique peut s'écrire

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t \leq \theta^{buy}, \\ 0 & \text{if } \theta^{buy} < p_t < \theta^{sell}, \\ +1 & \text{if } p_t \geq \theta^{sell}. \end{cases}
$$

Nous devons maintenant ajuster $\theta = (\theta^{buy}, \theta^{sell})$. Nous évaluons notre politique en suivant une trajectoire d'échantillon de prix $p_t(\omega)$ (ou nous pouvons observer les variations de prix $\phat(\omega)$). En supposant que nous générons des trajectoires d'échantillon à partir d'un modèle mathématique, nous pouvons générer des trajectoires d'échantillon $\omega^1, \ldots, \omega^N$. Nous pouvons ensuite simuler la performance de la politique sur chaque trajectoire d'échantillon et faire une moyenne en utilisant

$$
\Fbar^{low-high} = \frac{1}{N} \sum_{n=1}^N C\big(S_t(\omega^n),X^{low-high}(S_t(\omega^n)\vert \theta)\big).
$$

L'ajustement de $\theta$ nécessite de résoudre le problème

$$
\begin{align}
\max_\theta \Fbar^{low-high}(\theta\vert S_0). \label{eq:buylowpolicysearch}
\end{align}
$$

Puisque $\theta$ n'a que deux dimensions, une stratégie consiste à effectuer une recherche exhaustive sur grille en discrétisant chaque dimension, puis en cherchant sur toutes les valeurs possibles des deux dimensions. Une discrétisation courante consiste à diviser une région en incréments de 5 pour cent. En incluant les bornes, cela signifie que nous devons représenter 21 valeurs pour chaque paramètre, créant une grille de 441 points, ce qui est gérable (bien que non trivial) pour la plupart des problèmes.

Nous notons qu'une recherche exhaustive sur grille ne fonctionne que si nous exécutons suffisamment de simulations $N$ pour que la variance de l'estimation $\Fbar^\pi(\theta)$ soit relativement faible. Cependant, nous disposons de méthodes pour effectuer la recherche de $\theta$ même avec des estimations bruitées de la performance de la politique, comme présenté au [Chapitre 7](/sdam/fr/chapter-7/).

Nous allons rencontrer de façon répétée le problème d'optimisation donné par $\eqref{eq:buylowpolicysearch}$, car les politiques les plus simples présentent toujours des paramètres ajustables. Le problème $\eqref{eq:buylowpolicysearch}$ peut être résolu à l'aide de méthodes basées sur les dérivées si nous sommes capables de calculer (ou d'approximer) les dérivées de $\Fbar^{low-high}(\theta\vert S_0)$ par rapport à $\theta$. Lorsque cela n'est pas possible, nous devons utiliser des méthodes sans dérivée, ce qui est précisément le problème auquel nous avons été confrontés au [Chapitre 2](/sdam/fr/chapter-2/).

### Programmation dynamique rétrograde

La programmation dynamique rétrograde consiste à résoudre directement l'équation de Bellman

$$
\begin{align}
V_t(s_t) = \max_{x_t} \left(C_t(s,x_t)+  \E\{V_{t+1}(S_{t+1})\vert S_t,x_t\} \right), \label{eq:energystoragebellman}
\end{align}
$$

où $S_{t+1} = S^M(s_t,x_t,W_{t+1})$, et où l'espérance porte sur la variable aléatoire $W_{t+1}$. Supposons que $W_{t+1}$ soit discrète, prenant des valeurs dans $\Wcal = \lbrace w_1, w_2, \ldots, W_M\rbrace $, et représentons la distribution de probabilité en utilisant

$$
f^W(w\vert s_t,x_t) = Prob[W_{t+1} = w\vert s_t,x_t].
$$

Nous écrivons la distribution comme dépendant de l'état $s_t$ et de la décision $x_t$, mais cela dépend du problème. Par exemple, nous pourrions raisonnablement supposer que la variation du prix $p_{t+1}-p_t$ dépend du prix actuel $p_t$ (si les prix sont très élevés, ils sont plus susceptibles de baisser), ce qui justifierait de conditionner sur $s_t$. Nous pourrions même avoir besoin de la dépendance à $x_t$ si l'achat d'une grande quantité d'électricité sur le réseau fait grimper les prix.

Nous pouvons alors réécrire l'équation $\eqref{eq:energystoragebellman}$ sous la forme

$$
V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right).
$$

Une implémentation basique de la programmation dynamique rétrograde présente quatre boucles :

1. La boucle reculant dans le temps de $T$ à l'instant $0$.
2. La boucle sur tous les états possibles $s_t\in\Scal$ (plus précisément, il s'agit de l'ensemble des valeurs possibles de la variable d'état $S_t$ à l'instant $t$).
3. La boucle qui serait nécessaire pour rechercher parmi toutes les décisions possibles $x_t$ afin de résoudre le problème de maximisation.
4. La boucle sur toutes les valeurs possibles de la variable aléatoire $W$ qui est prise en compte dans la sommation nécessaire pour calculer $V_t(s)$.

<div class="book-algorithm">
<p><strong>Programmation dynamique en arrière</strong></p>
<p><strong>Étape 0. Initialisation :</strong> Initialiser la contribution terminale $V_{T+1}(S_{T+1})=0$ pour tous les états $S_{t+1}$.</p>
<p><strong>Étape 1.</strong> Faire pour $t=T, T-1, \ldots, 1, 0$ :</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2.</strong> Pour tous $s\in\Scal$, calculer</p>
<p style="margin-left: 1.5rem;">$$V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right)$$</p>
</div>

Il est utile de considérer la plage de valeurs que chaque boucle peut prendre. Pour un problème énergétique, nous pourrions optimiser un dispositif de stockage par incréments horaires sur une journée, ce qui donne 24 pas de temps. Si nous utilisons des pas de temps de 5 minutes (certains opérateurs de réseau mettent à jour les prix toutes les 5 minutes), alors un horizon de 24 heures impliquerait 288 périodes de temps (à multiplier par sept si nous voulons planifier sur une semaine). Si nous faisons de la régulation de fréquence, nous devons alors prendre des décisions toutes les 2 secondes, ce qui se traduit par 43 200 périodes de temps sur une journée.

Notre variable d'état est composée de $S_t = (R_t,p_t)$, ce qui signifie que nous devons remplacer la boucle sur tous les états par des boucles imbriquées sur toutes les valeurs de $R_t$, puis sur toutes les valeurs de $p_t$. Puisque les deux sont continues, chacune devra être discrétisée. La variable de ressource $R_t$ devrait être divisée en incréments basés sur la quantité que nous pourrions charger ou décharger en un seul incrément de temps. Nous devons ensuite discrétiser le prix du réseau $p_t$. Les prix du réseau peuvent descendre jusqu'à -＄100, et monter jusqu'à ＄10 000 (dans des cas extrêmes). Une stratégie raisonnable pourrait consister à construire une distribution empirique, puis à représenter les prix correspondant, disons, à chaque incrément de deux pour cent de la distribution cumulative, ce qui nous donnerait 50 prix possibles.

Le nombre de décisions de charge-décharge pourrait être aussi faible que trois (charger, décharger ou ne rien faire), ou beaucoup plus important si nous pouvons charger ou décharger à différents taux.

Enfin, la distribution de probabilité $f^W(w)$ serait la distribution des changements aléatoires de prix, $\phat_{t+1}$. Là encore, nous recommandons de construire une distribution empirique des changements de $\phat_{t+1}$, puis de discrétiser la distribution cumulative en incréments de, disons, deux pour cent.

Si nous avons une variable d'état à deux dimensions (comme c'est le cas avec notre modèle de base), nous avons déjà cinq boucles (le temps, les deux variables d'état, l'opérateur max sur $x$, puis la sommation sur les issues de $W$). Cela peut devenir coûteux, et nous ne faisons que commencer. Imaginons maintenant que nous utilisions le modèle de série temporelle de l'équation $\eqref{eq:energytimeseriesmodel}$, où nous devons maintenant garder trace des prix $(p_t, p_{t-1}, p_{t-2})$. Dans ce cas, notre variable d'état serait

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Dans ce cas, nous aurions maintenant sept boucles imbriquées. Bien que la complexité dépende de la discrétisation des variables continues, exécuter cet algorithme de programmation dynamique en arrière pourrait facilement nécessiter une année (ou plus).

Étant donné la difficulté d'utiliser l'équation de Bellman, même pour ce problème relativement simple, il est surprenant que cette approche spécifique soit encore enseignée dans les cours. Compte tenu de cette complexité, des recherches approfondies ont été menées sur des méthodes qui approximent l'équation de Bellman, regroupées sous des noms comme la *programmation dynamique approximative* et l'*apprentissage par renforcement*. Nous allons décrire deux stratégies d'approximation de l'équation de Bellman connues sous le nom d'ADP en arrière et d'ADP en avant.

### Programmation dynamique approximative en arrière

Une stratégie algorithmique puissante est connue sous le nom de « programmation dynamique approximative en arrière ». Cette approche progresse exactement comme nous venons de le faire ci-dessus, avec une différence. Au lieu de boucler sur tous les états, nous choisissons un échantillon aléatoire $\Shat$. Nous calculons ensuite la valeur d'être dans l'état $s\in\Shat$ tout comme nous l'avons fait initialement, et calculons la valeur correspondante $\vhat$. Supposons que nous répétions cela $N$ fois, et acquérions un ensemble de données $(\shat^n, \vhat^n), n=1, \ldots, N$. Nous utilisons ensuite cela pour ajuster un modèle statistique, tel que le modèle linéaire donné par :

$$
\begin{align}
\Vbar(s) = \theta_0 + \theta_1 \phi_1(s) + \theta_2 \phi_2(s) + \ldots + \theta_F \phi_F(s), \label{eq:energylinearvfa}
\end{align}
$$

où $\phi_f(s), f=1, \ldots, F$ est un ensemble de caractéristiques choisies de manière appropriée. Des exemples de caractéristiques pourraient être

$$
\begin{align*}
\phi_1(s) &= R_t, \\
\phi_2(s) &= R^2_t, \\
\phi_3(s) &= p_t, \\
\phi_4(s) &= p^2_t, \\
\phi_5(s) &= p_{t-1}, \\
\phi_6(s) &= p_{t-2}, \\
\phi_7(s) &= R_t p_t.
\end{align*}
$$

Notez qu'avec un terme constant $\theta_0$, ce modèle n'a que huit coefficients à estimer. Échantillonner quelques centaines d'états devrait être plus que suffisant pour obtenir une bonne approximation statistique. Cette méthodologie est relativement insensible au nombre de variables d'état, et bien sûr il n'y a aucun problème si l'une des variables est continue.

Un défi lorsque nous utilisons un modèle paramétrique tel que le modèle linéaire ci-dessus est que nous devons spécifier les caractéristiques $\phi_f(S_t)$. À mesure que les réseaux de neurones sont devenus populaires, les chercheurs ont commencé à utiliser cette approche, y compris les réseaux de neurones profonds qui peuvent nécessiter l'estimation de millions de paramètres. L'avantage de cette approche est qu'elle élimine le besoin de spécifier la structure du modèle, mais le prix à payer est que vous avez besoin de beaucoup plus d'observations. Les réseaux de neurones profonds offrent la propriété attrayante de pouvoir approximer n'importe quelle fonction, mais cela signifie aussi qu'ils peuvent modéliser du bruit. Les réseaux de neurones ont également du mal à reproduire une structure de problème connue telle que la monotonicité (plus le stock est grand, plus la valeur est grande) ou la convexité.

Nous avons constaté que l'ADP en arrière fonctionne exceptionnellement bien sur un petit ensemble de problèmes (voir *Reinforcement Learning and Stochastic Optimization*, Section 15.4, pour un résumé des comparaisons de l'ADP en arrière par rapport aux références), mais il n'existe aucune garantie, et sa performance dépend clairement du choix d'un ensemble efficace de caractéristiques. Dans une application, nous avons réduit un temps d'exécution de 30 jours pour un algorithme MDP en arrière standard, à 20 minutes, avec une solution qui était à moins de 5 pour cent de l'optimum (produit par l'exécution d'un mois). Mais là encore, il n'y a aucune garantie de cette performance.

### Programmation dynamique approximative en avant

La programmation dynamique approximative en avant fonctionne de manière intuitive. Imaginons que nous commencions avec une approximation de la fonction de valeur $\Vbar^{x,n-1}\_t(S^x_t)$ autour de l'état post-décision $S^x_t$ que nous avons calculé à partir des premières $n-1$ itérations de notre algorithme. Nous avons introduit pour la première fois l'idée des états post-décision dans le [Chapitre 1](/sdam/fr/chapter-1/), mais il s'agit de l'état immédiatement après avoir pris une décision, mais avant l'arrivée de toute nouvelle information.

Maintenant, imaginons que nous sommes dans un état particulier $S^n_t$ pendant la $n$ème itération de notre algorithme, en suivant un chemin d'échantillon $\omega^n$ qui guide l'échantillonnage au fur et à mesure que nous avançons dans le temps. Supposons que nous avons une fonction $S^{x,n}\_t = S^{M,x}(S^n_t,x)$ qui nous amène à l'état post-décision. Pour notre problème énergétique où $S^n_t = (R^n_t,p^n_t)$, l'état post-décision serait

$$
S^{x,n} = (R^n_t+x^n_t, p^n_t).
$$

Nous prenons ensuite une décision en utilisant

$$
x^n_t = \argmax_x \big(C(S^n_t,x) + \Vbar^{x,n-1}_t(S^{x,n}) \big).
$$

Étant donné $S^n_t$ et notre décision $x^n_t$, nous échantillonnons ensuite $W_{t+1}(\omega^n)$ qui se traduit par le changement des prix $\phat^n_{t+1}$. Nous simulons ensuite notre chemin vers l'état suivant

$$
S^n_{t+1} = (R^n_t+x^n_t, p^n_t + \phat^n_{t+1}(\omega)).
$$

Ainsi, nous ne faisons que simuler notre progression dans le temps, ce qui signifie que nous n'avons pas à nous soucier de la complexité de la variable d'état. Il existe différentes stratégies pour ensuite mettre à jour l'approximation de la fonction de valeur $\Vbar^{n-1}\_t$ :

<div class="book-algorithm">
<p><strong>Programmation dynamique approximative en avant</strong></p>
<p><strong>Étape 0. Initialisation :</strong> Initialiser $V^{\pi,0}_t,~t\in\Tcal$. Poser $n = 1$. Initialiser $S^1_0$.</p>
<p><strong>Étape 1.</strong> Faire pour $n = 1, 2, \ldots, N$ :</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2.</strong> Faire pour $m = 1, 2, \ldots, M$ :</p>
<p style="margin-left: 3rem;"><strong>Étape 3.</strong> Choisir un chemin d'échantillon $\omega^m$.</p>
<p style="margin-left: 3rem;"><strong>Étape 4.</strong> Initialiser $\vhat^m = 0$.</p>
<p style="margin-left: 3rem;"><strong>Étape 5.</strong> Faire pour $t = 0, 1, \ldots, T$ :</p>
<p style="margin-left: 4.5rem;"><strong>Étape 5a.</strong> Résoudre :</p>
<p style="margin-left: 4.5rem;">$$x^{n,m}_t = \argmax_{x_t\in\Xcal^{n,m}_t} \big(C_t(S^{n,m}_t,x_t) + V^{\pi,n-1}_t(S^{M,x}(S^{n,m}_t,x_t))\big)$$</p>
<p style="margin-left: 4.5rem;"><strong>Étape 5b.</strong> Calculer :</p>
<p style="margin-left: 4.5rem;">$$S^{x,n,m}_t = S^{M,x}(S^{n,m}_t,x^{n,m}_t), \qquad S^{n,m}_{t+1} = S^M(S^{x,n,m}_t,x^{n,m},W_{t+1}(\omega^m)).$$</p>
<p style="margin-left: 3rem;"><strong>Étape 6.</strong> Faire pour $t = T-1,\ldots, 0$ :</p>
<p style="margin-left: 4.5rem;"><strong>Étape 6a.</strong> Accumuler le coût du chemin (avec $\vhat^m_{T} = 0$) :</p>
<p style="margin-left: 4.5rem;">$$\vhat^m_t = C_t(S^{n,m}_t,x^m_t) + \vhat^m_{t+1}$$</p>
<p style="margin-left: 4.5rem;"><strong>Étape 6b.</strong> Mettre à jour la valeur approximative de la politique commençant au temps $t$ :</p>
<p style="margin-left: 4.5rem;">$$\Vbar^{n,m}_{t-1} \leftarrow U^V(\Vbar^{n,m-1}_{t-1}, S^{x,n,m}_{t-1}, \vhat^m_t)$$</p>
<p style="margin-left: 4.5rem;">où nous utilisons typiquement $\step_{m-1} = 1/m$.</p>
<p style="margin-left: 1.5rem;"><strong>Étape 7.</strong> Mettre à jour la fonction de valeur de la politique $V^{\pi,n}_t(S^x_t) = \Vbar^{n,M}_t(S^x_t)$ pour tous $t = 0, 1, \ldots, T$.</p>
<p><strong>Étape 8.</strong> Retourner les fonctions de valeur $(V^{\pi,N}_t)_{t=1}^T$.</p>
</div>

Ceci laisse la mise à jour effective dans une fonction de mise à jour $U^V(\cdot)$ puisque cela dépend de la façon dont nous approximons la fonction de valeur.

La programmation dynamique approximative en avant est attrayante car elle passe à l'échelle pour des problèmes de grande dimension. À aucun moment nous ne bouclons sur tous les états ou issues possibles. En fait, nous pouvons même gérer des décisions de haute dimension $x$ si nous approximons la fonction de valeur de manière appropriée afin de pouvoir tirer parti d'algorithmes puissants. Cependant, l'ADP en avant (tout comme l'ADP en arrière) possède peu de garanties de performance.

### Une politique hybride recherche de politique-VFA

Quelle que soit la manière dont nous choisissons d'approximer la fonction de valeur, notre politique est donnée par

$$
X^{VFA}(S_t) = \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t)\big).
$$

Nous simulons la politique en avant, où nous laissons $\omega^n$ représenter un chemin d'échantillon de l'information exogène (c'est-à-dire, l'ensemble des changements de prix). Il arrive fréquemment que nous testions notre politique sur des données historiques, auquel cas il n'y a qu'un seul chemin d'échantillon. Cependant, si nous avons développé un modèle mathématique des prix incertains, nous pouvons créer un chemin d'échantillon $\omega$ que nous utilisons pour approximer la valeur d'une politique (nous pourrions aussi créer plusieurs chemins d'échantillon et prendre une moyenne) :

$$
\Fbar^{VFA}(\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega))\big).
$$

Cela signifie que la méthode est bien adaptée pour approximer même des problèmes de haute dimension qui pourraient se poser en logistique.

Lorsque nous construisons une approximation de la fonction de valeur (qui appartient à la classe des politiques d'anticipation), nous n'avons généralement plus d'étape où nous réglons la politique. Cependant, cela ne signifie pas que nous ne pouvons pas essayer. Supposons que notre fonction de valeur soit donnée par le modèle linéaire de l'équation $\eqref{eq:energylinearvfa}$. Nous pouvons maintenant écrire notre politique en utilisant

$$
X^{VFA}(S_t\vert \theta) = \argmax_x \left(C(S_t,x) + \sum_{f=1}^F \theta_f \phi_f(S_t)\right).
$$

Il est logique d'utiliser l'un de nos algorithmes ADP en arrière ou en avant pour obtenir une estimation initiale de $\theta$, mais comme nous l'avons noté ci-dessus, il n'y a aucune garantie que la politique résultante soit de haute qualité. Cependant, nous pouvons toujours l'améliorer en utilisant cela comme point de départ,

$$
\Fhat^{VFA}(\theta,\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega)\vert \theta)\big).
$$

Maintenant, il nous suffit de résoudre le problème de recherche de politique que nous pourrions poser comme

$$
\begin{align}
\max_\theta \Fbar^{VFA}(\theta,\omega\vert S_0).  \label{eq:optthetavfa}
\end{align}
$$

Dans nos exemples précédents pour la recherche de politique, $\theta$ était un scalaire, ce qui rend ce problème relativement facile. Maintenant, $\theta$ est un vecteur qui pourrait avoir des dizaines de dimensions. Nous allons revenir sur ce problème plus tard.

### Quelques mises en garde sur l'ADP

Nous avons utilisé ce cadre de problème pour offrir une tournée relativement approfondie des méthodes basées sur l'idée d'approximer la valeur d'être dans un état. Cela a été étudié sous des termes tels que « programmation dynamique approximative » ou « apprentissage par renforcement ». Ces méthodes ont attiré une attention considérable des communautés de recherche académique, mais en pratique, les méthodes ne sont pas faciles à mettre en œuvre. Les problèmes de décision séquentielle sont partout, mais les applications réussies en pratique sont relativement rares.

Les approximations par table de correspondance, où nous estimons la valeur pour chaque état discret (ou discrétisé), ne passent pas à l'échelle lorsque la variable d'état a plus de trois dimensions. L'utilisation de stratégies d'approximation telles que notre approximation linéaire ne fonctionne généralement pas car ces approximations doivent être globalement précises, puisque nous pouvons visiter n'importe quel état. En même temps, les approximations locales (qui sont des formes de modèles non paramétriques) peuvent être problématiques car la flexibilité des approximations locales introduit de l'instabilité.

Ce qui complique le processus est que nous dépendons de notre fonction de valeur approximative pour prendre des décisions, ce qui crée un cercle vicieux. Nos approximations initiales ne sont pas très bonnes, et cela conduit par conséquent à de mauvaises décisions. Ces mauvaises décisions sont ensuite utilisées pour mettre à jour l'approximation de la fonction de valeur, et à partir de là, on peut voir la spirale descendante.

L'idée d'ajuster une approximation de fonction de valeur, comme nous l'avons fait dans l'équation $\eqref{eq:optthetavfa}$, est prometteuse car elle optimise directement la performance de la politique. Curieusement, cette idée n'est pas largement utilisée. Nous notons simplement qu'ajuster $\theta$ à l'aide de ces simulations n'est pas facile. Nous invitons donc à la prudence tout lecteur qui déciderait d'essayer ces approches.

## Qu'avons-nous appris ?

- Nous revisitons un problème de stock simple du [Chapitre 1](/sdam/fr/chapter-1/), mais dans le contexte du stockage d'énergie, avec des variables à la fois physiques et informationnelles.
- Nous décrivons une variété de modèles stochastiques pour les prix de l'électricité afin d'illustrer la richesse de la modélisation de l'incertitude.
- Nous décrivons un ensemble de politiques : une PFA (acheter bas, vendre haut), une politique VFA (basée sur la programmation dynamique approchée en arrière) ainsi que la programmation dynamique approchée en avant.
- Enfin, nous introduisons l'idée d'estimer un modèle linéaire pour une approximation de fonction de valeur à l'aide des techniques de programmation dynamique approchée, puis d'effectuer une recherche directe de politique sur les coefficients du modèle linéaire. Il s'agit donc initialement d'une politique basée sur VFA, qui se transforme ensuite en une forme de politique CFA avec une fonction objectif paramétrée.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Étant donné la nature à queue lourde des prix de l'électricité, qu'est-ce qui ne va pas avec l'utilisation d'un modèle de série temporelle ?</li>
<li>Esquissez brièvement comment nous séparons les prix qui se situent dans les variations normales (trois écarts-types) des observations plus extrêmes.</li>
<li>L'utilisation de données historiques pour ajuster une distribution empirique devrait nous donner une distribution de probabilité qui correspond à l'histoire. Quelles autres erreurs pourraient encore être présentes dans le modèle stochastique des prix ?</li>
<li>Décrivez en mots ce qu'accomplit la transformation des données dans la section sur la série temporelle hybride.</li>
<li>La programmation dynamique classique en arrière explose rapidement à cause de la malédiction de la dimensionnalité. Décrivez en mots comment la programmation dynamique approchée en arrière surmonte la malédiction de la dimensionnalité. Par exemple, si nous devions doubler le nombre de dimensions dans la variable d'état, décrivez comment cela complique la PDA en arrière.</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Écrivez les cinq éléments du modèle de base pour le problème de stockage d'énergie tels qu'ils sont donnés dans le texte. Écrivez la fonction objectif en supposant que la politique est la politique acheter bas, vendre haut

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t < \theta^{buy}, \\ 0 & \text{if } \theta^{buy} \leq p_t \leq \theta^{sell}, \\ +1 & \text{if } p_t > \theta^{sell}. \end{cases}
$$

Écrivez la fonction objectif en termes de recherche sur les paramètres de la politique. Écrivez également l'espérance dans la fonction objectif en utilisant la forme imbriquée qui reflète chaque variable aléatoire.</li>
<li>Dans la section sur la modélisation de l'incertitude, nous introduisons un modèle de série temporelle pour les prix donné par

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}.
$$

Le livre décrit les équations de mise à jour pour le vecteur de coefficients $\thetabar_t = (\thetabar_{t0},\thetabar_{t1}, \thetabar_{t2})$. En se rappelant que l'état $S_t$ contient *toute* l'information nécessaire pour modéliser le système à partir du temps $t$, donnez la variable d'état mise à jour et la fonction de transition permettant de gérer ce processus de prix.</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *EnergyStorage_I* sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>À l'aide du module python, exécutez une recherche par grille pour le vecteur de paramètres $\theta = (\theta^{buy}, \theta^{sell})$ en faisant varier $\theta^{sell}$ sur la plage de 1,0 à 100,0 par incréments de 1 ＄ pour les prix, et en faisant varier $\theta^{buy}$ sur la plage de 1,0 à $\theta^{sell}$, également par incréments de 1 ＄. Les prix seront les prix horaires historiques réels pour une période de 8 jours.</li>
<li>Résolvez pour une politique optimale en utilisant la stratégie de programmation dynamique en arrière décrite ci-dessus (l'algorithme a déjà été implémenté dans le module python). Supposez que le processus de prix évolue selon

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

où $\varepsilon_{t+1}$ suit une distribution empirique basée sur les différences de prix des prix historiques réels.
  <ol type="a">
    <li>Exécutez l'algorithme où les prix sont discrétisés par incréments de 1 ＄, puis de 0,50 ＄ et enfin de 0,25 ＄. Calculez la taille de l'espace d'état pour chacun des trois niveaux de discrétisation, et tracez les temps d'exécution en fonction de la taille de l'espace d'état.</li>
    <li>En utilisant la fonction de valeur optimale pour la discrétisation de 1 ＄, comparez la performance à la meilleure politique d'achat-vente que vous avez trouvée à la partie (a).</li>
  </ol>
</li>
<li>Téléchargez la feuille de calcul « Chapter8_electricity_prices » depuis [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements/). Utilisez les données de l'onglet « electricity prices » pour les questions suivantes :
  <ol type="a">
    <li>Construisez une distribution cumulative empirique $F_P(p) = Prob[P \leq p]$ où $P$ est un prix choisi aléatoirement pour une heure particulière sur la période d'une semaine dans le jeu de données.</li>
    <li>Soit $F^{-1}_P(u)$ la distribution cumulative inverse, où $u$ est compris entre 0 et 1. Trouvez le prix $p(u) = F^{-1}_P(u)$ correspondant à $u = 0, 0.1, 0.2, \ldots, 0.9, 1.0$. En attribuant à chacun de ces prix une probabilité de 1/11, trouvez la distribution cumulative, et comparez-la à la distribution cumulative que vous avez créée à la partie (a). Semblent-elles correspondre ?</li>
  </ol>
</li>
<li>À l'aide de la feuille de calcul « Chapter8_electricity_prices », ajustez un modèle de retour à la moyenne de la forme

$$
\begin{align}
p_{t+1} = p_t + \beta (\mubar_t - p_t) + \varepsilon_{t+1} \label{eq:priceexercise}
\end{align}
$$

où

$$
\mubar_t = (1-\alpha)\mubar_{t-1} + \alpha p_t.
$$

Supposez $\alpha = 0.15$. Trouvez $\beta$ qui minimise

$$
G(\beta) = \sum_{t=0}^T \big(p_{t+1} - (p_t + \beta (\mubar^t-p_t))\big)^2.
$$

  <ol type="a">
    <li>Ajustez le modèle de retour à la moyenne en effectuant une simple recherche unidimensionnelle (par exemple, essayez des valeurs entre 0 et 1 par incréments de 0,1).</li>
    <li>Calculez l'écart-type $\sigma$ de $\varepsilon$ à partir de votre échantillon (nous supposons que la moyenne est 0). Notez que nous supposons qu'il existe un écart-type unique et constant, bien que nous permettions à la moyenne $\mubar_t$ de varier dans le temps.</li>
    <li>En utilisant la valeur de $\beta$ que vous avez trouvée en (a), générez 10 trajectoires échantillons à l'aide de l'équation $\eqref{eq:priceexercise}$ en échantillonnant $\varepsilon_{t+1}$ à partir d'une distribution normale de moyenne 0 et d'écart-type $\sigma$. Tracez les trajectoires échantillons dans un graphique, et comparez le comportement de vos trajectoires échantillons aux prix historiques. Semblent-elles similaires ?</li>
  </ol>
</li>
<li>Vous allez maintenant ajuster un modèle de diffusion avec sauts, donné par

$$
p_{t+1} = p_t + \beta(\mubar_t - p_t) + \varepsilon_{t+1} + J_{t+1} \varepsilon_{t+1},
$$

où $J_{t+1} = 1$ avec une certaine probabilité de saut (que nous calculons ci-dessous) et 0 sinon, et $\varepsilon^J_{t+1}$ est la taille aléatoire du saut lorsqu'il se produit.

Suivez les étapes ci-dessous pour ajuster le modèle de diffusion avec sauts et comparer les résultats à l'histoire.
  <ol type="a">
    <li>En utilisant la valeur de $\beta$ de l'exercice 11, parcourez les données et identifiez tous les points de données qui se situent en dehors de la plage $[\mubar_t \pm 3 \sigma]$.</li>
    <li>En utilisant la même valeur de $\beta$ que vous avez trouvée à l'exercice 11, exécutez le retour à la moyenne sur les données une seconde fois, mais cette fois en n'incluant que les points de données qui n'ont pas été exclus à la partie (a). Trouvez la nouvelle moyenne et le nouvel écart-type de $\sigma$ sur les données qui n'ont pas été exclues.</li>
    <li>Répétez (b) une fois de plus sur les points de données conservés, en excluant à nouveau les points de données en dehors de la plage $\pm 3 \sigma$.</li>
    <li>Calculez la probabilité d'un saut comme la fraction des points qui ont été exclus une fois que vous avez terminé la partie (c) (à ce stade, vous avez exécuté le processus d'exclusion des points de données deux fois). Calculez également la moyenne et l'écart-type des points qui ont été exclus.</li>
    <li>Maintenant, exécutez 10 simulations de votre modèle de diffusion avec sauts, en utilisant la moyenne et la variance finales pour les points conservés et exclus, et où vous échantillonnez les sauts à l'aide de la probabilité de diffusion avec sauts. Comparez ces simulations à l'histoire, et discutez si les trajectoires de prix résultantes sont plus réalistes que ce que vous avez trouvé à l'exercice 11, et comparez les trajectoires de prix à l'histoire réelle.</li>
  </ol>
</li>
<li>Nous allons essayer à nouveau d'obtenir un bon ajustement des prix en répétant des parties des exercices 11 et 12 en utilisant des prix transformés.
  <ol type="a">
    <li>À l'aide de la distribution cumulative de l'exercice 10, convertissez chacun des prix en une variable aléatoire uniformément distribuée à l'aide de l'identité $U_t = F_P(p_t)$.</li>
    <li>Convertissez ensuite vos variables aléatoires uniformément distribuées $U_t$ en variables aléatoires normalement distribuées de moyenne 0 et de variance 1 à l'aide de $Z_t = \Phi^{-1}(U_t)$ où $\Phi(z)$ est la distribution cumulative de la distribution normale standard, et $\Phi^{-1}(U_t)$ en est l'inverse. Ceci est capturé par la fonction norm.s.inv(p) dans Excel, qui renvoie la valeur $Z$ correspondant à une probabilité $p$ (qui est donnée par la variable $U_t$).</li>
    <li>Nous devons maintenant réajuster $\beta$ dans l'équation de retour à la moyenne de l'exercice 11. Cette fois, au lieu d'utiliser le prix $p_t$, nous utilisons la quantité normalisée $Z_t$ ; sinon tout reste identique (vous pouvez donc simplement suivre le processus utilisé pour ajuster $\beta$ pour les prix bruts).</li>
    <li>Utilisez maintenant votre modèle de (c) (avec la nouvelle valeur pour $\beta$) pour créer une trajectoire échantillon de valeurs $Z_t$. Ensuite, utilisez $U_t = \text{norm.s.dist}(Z_t,1)$ pour obtenir la probabilité que $Z_t \leq z$ (qui est uniformément distribuée entre 0 et 1). Enfin, ramenez la valeur $U_t$ à un prix à l'aide de la distribution cumulative que vous avez trouvée à l'exercice 11. Tracez une trajectoire échantillon (ce n'est pas trop difficile si vous êtes à l'aise avec Excel — sinon la partie pénible est cette dernière étape).</li>
    <li>Comparez le comportement de la trajectoire échantillon résultante à la distribution historique. Notez que la distribution des prix devrait être parfaite, mais que la série de prix pourrait quand même ne pas sembler bien ajustée. Quelles erreurs pourrions-nous encore commettre ?</li>
  </ol>
</li>
</ol>
{% endraw %}
