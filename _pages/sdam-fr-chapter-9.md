---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 9 : Stockage d'énergie II"
permalink: /sdam/fr/chapter-9/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: f45bf159515d3588
---


{% raw %}
<figure class="book-figure">
  <img src="/assets/images/sdam/renewablegridstorageload.jpg" alt="Système énergétique desservant une charge (bâtiment) à partir d'une ferme éolienne, du réseau, et d'un dispositif de stockage par batterie." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 9.1.</span> Système énergétique desservant une charge (bâtiment) à partir d'une ferme éolienne (avec vitesses de vent variables), du réseau (avec prix variables), et d'un dispositif de stockage par batterie.</figcaption>
</figure>

## Aperçu du chapitre

Ce chapitre étend le modèle du [Chapitre 8](/sdam/fr/chapter-8/) en commençant par un problème de stockage d'énergie plus complexe qui combine l'énergie provenant de deux sources (une ferme éolienne et le réseau) pour satisfaire une charge dépendante du temps, aidée par un dispositif de stockage. Une caractéristique distinctive de ce problème est que nous disposons d'une prévision de vent sur 24 heures qui est mise à jour toutes les heures. Ces prévisions peuvent changer considérablement au fil du temps, ce qui introduit une nouvelle source d'incertitude, non seulement parce que les prévisions ne sont pas parfaites, mais parce que les prévisions elles-mêmes évoluent.

Nous commençons par explorer deux méthodes pour modéliser l'incertitude dans les prévisions de vent. La première est une méthode connue sous le nom de régression par processus gaussien, qui est utile pour modéliser des processus continus tels que la quantité d'énergie éolienne que nous prévoyons de générer au cours des prochaines 24 heures.

La seconde méthode utilise une technique puissante, mais étonnamment simple, basée sur ce que l'on appelle des « modèles à états cachés » qui nous permettent de reproduire une propriété des prévisions connue sous le nom de *temps de croisement*. Ceux-ci font référence à la durée pendant laquelle une prévision est au-dessus, ou en dessous, de la valeur réelle. Il s'agit d'un comportement important lors de la modélisation des problèmes de stockage.

Pour concevoir notre politique, nous adaptons la technique que nous avons introduite pour la première fois dans le [Chapitre 6](/sdam/fr/chapter-6/), où nous avons commencé avec une politique d'anticipation déterministe, puis introduit des paramètres pour l'aider à mieux fonctionner au fil du temps. Pour notre problème énergétique, nous planifions en utilisant notre meilleure estimation de l'énergie éolienne prévue multipliée par des coefficients qui dépendent du nombre d'heures pour lesquelles nous faisons des prévisions dans le futur. Cela nous donne un modèle d'optimisation déterministe avec 24 paramètres qui doivent être ajustés.

## Récit

Nous allons maintenant résoudre un problème de stockage d'énergie quelque peu plus complexe, illustré à la Figure 9.1. Contrairement à notre système de stockage précédent qui se limitait à acheter et vendre de l'énergie sur le réseau, nous devons maintenant faire face au problème de satisfaire une charge dépendante du temps pour un bâtiment en utilisant l'énergie d'une ferme éolienne et du réseau, avec un seul dispositif de stockage d'énergie pour aider à lisser les différents processus.

Ce problème présentera également une autre propriété distinctive, à savoir que tous les processus exogènes (vent, prix, charges et température) vont provenir d'un processus dynamique qui varie selon différents types de prévisibilité :

- Charges – La charge (qui est la demande d'énergie) suit un schéma relativement prévisible qui dépend de l'heure de la journée (un bâtiment doit atteindre une température donnée avant 8h lorsque les gens commencent à arriver) ainsi que de la température.
- Température – La température est un processus raisonnablement prévisible qui dépend de l'heure de la journée et de la saison, mais qui reflète également les conditions météorologiques locales pouvant être prévues avec une certaine précision.
- Vent – Il existe des fournisseurs qui proposent des services de prévision du vent, bien que les prévisions ne soient pas très précises et évoluent assez rapidement, même au cours d'une même journée (voir Figure 9.2).
- Prix – Le prix de l'électricité sur le réseau reflète l'offre et la demande, où le fournisseur d'électricité est conçu pour s'ajuster rapidement à la demande. Cependant, des pénuries à court terme peuvent produire des pics où les prix peuvent augmenter de 10 à 100 fois le prix moyen. Il peut également y avoir des périodes où la charge diminue plus vite que les générateurs ne peuvent être réduits, produisant parfois un excès d'électricité vendu à des prix très bas, voire négatifs.

<figure class="book-figure">
  <img src="/assets/images/sdam/windforecasts.png" alt="Évolution des prévisions de puissance éolienne au cours d'une période de 24 heures, mises à jour chaque heure." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 9.2.</span> Évolution des prévisions de puissance éolienne au cours d'une période de 24 heures, mises à jour chaque heure. La ligne noire représente la valeur réelle.</figcaption>
</figure>

Chacun de ces processus peut être prévu avec des degrés de précision variables. La prévision de la puissance éolienne est la moins précise, et bien que le vent puisse être plus fort la nuit, les pics et les creux peuvent survenir à tout moment du jour ou de la nuit. Les charges sont fortement corrélées à l'heure de la journée, en grande partie en raison de l'activité humaine mais aussi de la température. Notez que les après-midis chauds peuvent créer des pics au milieu d'une journée d'été en raison de la climatisation, alors qu'ils peuvent en fait réduire la charge de chauffage (qui peut être desservie par un chauffage électrique) pendant l'hiver. La température présente également une forte composante liée à l'heure de la journée en raison du lever et du coucher du soleil, mais il peut y avoir des variations lorsque des fronts météorologiques traversent la région.

Notre problème consiste à décider combien acheter au réseau (ou revendre au réseau) et combien stocker à chaque instant (ces décisions peuvent être prises par incréments de 5 minutes pour certains opérateurs de réseau). Nous devons satisfaire la demande d'énergie, mais souhaitons par ailleurs maximiser le revenu que nous tirons de la vente d'énergie moins le coût d'achat de l'énergie au réseau ou à la ferme éolienne.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Nous voulons maximiser le profit total attendu, qui comprend le revenu reçu pour la satisfaction de la demande, moins le coût d'achat d'énergie au réseau.
- **Décisions :** Nous avons six décisions : le flux d'énergie du réseau vers le stockage, le flux d'énergie du réseau vers la charge, le flux d'énergie de la ferme éolienne vers le stockage, le flux d'énergie de la ferme éolienne vers la charge, le flux d'énergie du stockage vers le réseau, et le flux d'énergie du stockage vers la charge.
- **Incertitudes :** Nous disposons des processus d'information dynamique suivants : la charge (la demande d'énergie), la température (qui influence la charge), l'énergie de la ferme éolienne, le prix que nous recevons pour satisfaire la charge, et le coût d'achat d'énergie au réseau.

## Modèle de base

### Variables d'état

Nous commençons par modéliser l'instantané du système au temps $t$, qui comprend $R_t$, la quantité d'énergie (en MWh) stockée dans la batterie au temps $t$ ; $L_t$, la charge (demande) d'énergie au temps $t$ (en MW) ; $\tau_t$, la température au temps $t$ ; $w_t$, l'énergie éolienne au temps $t$ (en MW) ; $p^{load}\_t$, le montant que nous sommes payés par MWh pour satisfaire la charge du bâtiment au temps $t$ ; et $c^{grid}\_t$, le coût d'achat d'électricité au réseau (c'est le prix qui nous est payé si nous revendons au réseau).

Puisque le problème sous-jacent est très dépendant du temps (en raison des cycles quotidiens), nous allons devoir utiliser des prévisions, à la fois pour modéliser la dynamique du problème mais aussi pour prendre des décisions qui doivent anticiper ce qui pourrait se produire dans le futur. Nous supposons que l'on nous fournit un ensemble glissant de prévisions comme illustré pour le vent à la Figure 9.2. Nous modélisons les prévisions de charge ($L$), de température ($\tau$), de vent ($w$), de prix de marché ($p$), et de prix du réseau ($G$) en utilisant : $f^L_{tt'}$, la prévision de la charge $L_t$ (en MW) au temps $t' > t$ compte tenu de ce que nous savons au temps $t$ ; $f^\tau_{tt'}$, la prévision de la température $\tau_t$ au temps $t' > t$ compte tenu de ce que nous savons au temps $t$ ; $f^w_{tt'}$, la prévision de la puissance éolienne $w_t$ (en MW) au temps $t' > t$ compte tenu de ce que nous savons au temps $t$ ; $f^p_{tt'}$, la prévision des prix de marché $p^{load}\_t$ (en ＄/MWh) à $t' > t$ compte tenu de ce que nous savons au temps $t$ ; et $f^G_{tt'}$, la prévision des prix du réseau $c^{grid}\_t$ (en ＄/MWh) à $t' > t$ compte tenu de ce que nous savons au temps $t$.

Toutes les prévisions sont des vecteurs sur l'horizon $t, t+1, \ldots, t+H$ où $H$ est un horizon spécifié (par exemple, 24 heures). Nous notons $f^X_t$ le vecteur des prévisions pour $X \in \Xcal = \lbrace L, T, W, P, G\rbrace $.

Notre variable d'état est alors

$$
S_t = (\underbrace{R_t}_{R_t}, \underbrace{(L_t, \tau_t, w_t, p^{load}_t, c^{grid}_t)}_{I_t}, \underbrace{(f^L_t, f^T_t, f^w_t, f^P_t, f^G_t )}_{B_t}).
$$

Nous avons ici regroupé la ressource contrôlable $R_t$ (notre variable d'état physique), l'instantané de la charge, de la température, de la puissance éolienne et du prix (que nous pourrions regrouper comme variables d'information $I_t$), puis les prévisions (qui représentent une forme de croyance $B_t$ à propos du futur).

Nous constatons rapidement que nous disposons d'une variable d'état de dimension relativement élevée. Si nous planifions par incréments de 5 minutes, une prévision glissante sur 24 heures comporterait 288 éléments. Cela laisse présager le défi qui attend quiconque souhaite estimer la valeur $V_t(S_t)$ d'être dans l'état $S_t$.

### Variables de décision

Les variables de décision de notre système sont maintenant $x^{wr}\_t$, la quantité d'électricité déplacée de la ferme éolienne vers la batterie au temps $t$ ; $x^{w\ell}\_t$, la quantité d'électricité déplacée de la ferme éolienne vers la charge (le bâtiment) au temps $t$ ; $x^{gr}\_t$, la quantité d'électricité déplacée du réseau vers la batterie au temps $t$ ; $x^{rg}\_t$, la quantité d'électricité déplacée de la batterie vers le réseau au temps $t$ ; $x^{g\ell}\_t$, la quantité d'électricité déplacée du réseau vers la charge au temps $t$ ; $x^{r\ell}\_t$, la quantité d'électricité déplacée de la batterie vers la charge au temps $t$ ; et $x^{loss}\_t$, la charge non couverte (connue sous le nom de « délestage de charge »).

Ces variables doivent être déterminées sous réserve des contraintes

$$
\begin{align}
x^{w\ell}_t + x^{g\ell}_t + \frac{1}{\eta} x^{r\ell}_t + x^{loss}_t &=  L_t, \label{eq:energysystem1}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta R_t, \label{eq:energysystem2}
\end{align}
$$

$$
\begin{align}
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} (R^{max} - R_t), \label{eq:energysystem3}\\
x^{rg}_t                                     &\leq  \eta R_t, \label{eq:energysystem3a}\\
x^{w\ell}_t +  x^{wr}_t                      &\leq  w_t, \label{eq:energysystem4}\\
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energysystem5}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta u^{discharge}, \label{eq:energysystem6}\\
x^{wr}_t, x^{w\ell}_t, x^{gr}_t, x^{rg}_t, x^{g\ell}_t, x^{r\ell}_t &\geq  0.  \label{eq:energysystem7}
\end{align}
$$

L'équation $\eqref{eq:energysystem1}$ limite la puissance servant à satisfaire la charge (le bâtiment) au montant de la charge (nous ne pouvons pas surcharger le bâtiment). La variable $x^{loss}$ capture le montant par lequel nous n'avons pas couvert la charge. La contrainte capture les pertes de conversion pour l'énergie prélevée de la batterie. L'équation $\eqref{eq:energysystem2}$ indique que nous ne pouvons pas déplacer plus d'électricité hors de notre stockage par batterie que ce qui se trouve dans la batterie, ajusté des pertes de conversion. L'équation $\eqref{eq:energysystem3}$ limite ensuite la quantité que nous pouvons déplacer vers la batterie au montant de la capacité disponible, à nouveau ajustée des pertes de conversion. L'équation $\eqref{eq:energysystem3a}$ limite la quantité que nous pouvons déplacer du stockage vers le réseau. L'équation $\eqref{eq:energysystem4}$ limite la quantité provenant de la ferme éolienne à ce que la ferme éolienne génère à cet instant. Les équations $\eqref{eq:energysystem5}$–$\eqref{eq:energysystem6}$ limitent les flux entrant et sortant de la batterie aux taux de charge et de décharge. L'équation $\eqref{eq:energysystem7}$ impose la non-négativité de chaque variable.

### Information exogène

Notre première source d'information exogène est la différence entre la valeur réelle et la valeur prévue pour tout processus « $X$ » où

$$
X = (L, \tau, w, p^{load}, c^{grid}).
$$

Soit $X_t$ le processus et $\varepsilon^X_{t+1}$ la différence entre les valeurs réelles et prévues. Nous posons alors

$$
\varepsilon^X_{t+1} = X_{t+1} - f^X_{t,t+1}.
$$

Nous pourrions modéliser $\varepsilon^X_{t+1}$ en utilisant des échantillons tirés de données historiques, ou en supposant qu'elle suit une distribution supposée.

La seconde source d'information exogène est le changement des prévisions à mesure que nous avançons dans le temps. Nous notons à nouveau $f^X_t$ un vecteur de prévisions pour chaque processus d'information $X$, où $f^X_{tt}$ est la valeur réelle au temps $t$. Soit $\fhat^X_{t+1,t'}$ le changement de la prévision pour le temps $t'$ entre $t$ et $t+1$, de sorte que

$$
\fhat^X_{t+1,t'} = f^X_{t+1,t'} - f^X_{tt'},~ t'=t, t+1, \ldots, t+H.
$$

Les changements exogènes $\fhat^X_{t+1,t'}$ sont corrélés entre les périodes de temps $t'$. Si ce n'était pas le cas, alors les prévisions, lorsqu'elles sont tracées sur l'horizon $t'=t, \ldots, t+H$, ne présenteraient plus la régularité que nous observons dans les prévisions de vent à la Figure 9.2. Nous reviendrons ci-dessous sur la question de la modélisation de l'incertitude dans les prévisions.

Cela signifie que nous pouvons écrire notre information exogène comme

$$
W_{t+1,X} = (\varepsilon^X_{t+1}, \fhat^X_{t+1,t'}), t' > t,
$$

pour $X$ égal aux différentes variables (charge, température, vent, prix de marché et prix du réseau).

### Fonction de transition

L'évolution de la variable d'état de ressource est donnée par

$$
\begin{align}
R_{t+1} = R_t + \eta (x^{wr}_t + x^{gr}_t) - \frac{1}{\eta} (x^{rg}_t + x^{r\ell}_t).\label{eq:energytransitionII1}
\end{align}
$$

Chacune des variables $L_t$, $\tau_t$, $w_t$, $p^{load}\_t$, et $c^{grid}\_t$ évolue en utilisant les prévisions. Par exemple, nous écririons l'évolution de la charge $L_t$ en utilisant

$$
\begin{align}
L_{t+1} = f^L_{t,t+1} + \varepsilon^L_{t+1}, \label{eq:energytransitionII2}
\end{align}
$$

Nous pourrions créer des équations similaires pour $\tau_t$, $w_t$, $p^{load}\_t$, et $c^{grid}\_t$.

Nous écrivons l'évolution des prévisions en utilisant

$$
\begin{align}
f^X_{t+1,t'} = f^X_{tt'} + \fhat^X_{t+1,t'}, ~X\in\Xcal, ~t'=t+1, \ldots, t+1+H,  \label{eq:energytransitionII3}
\end{align}
$$

pour $X=L, \tau, w, p^{load}$ et $c^{grid}$. L'équation $\eqref{eq:energytransitionII3}$ est connue dans la littérature comme le « modèle martingale de l'évolution des prévisions ». Le terme « martingale » fait référence à notre hypothèse selon laquelle $f^X_{tt'}$ est une estimation non biaisée de $f^X_{t+1,t'}$ puisque nous supposons que les déviations aléatoires $\fhat^X_{t+1,t'}$ sont, en moyenne, nulles.

Les équations $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ et $\eqref{eq:energytransitionII3}$ (pour toutes les prévisions $X$) constituent la fonction de transition

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Fonction objectif

Notre fonction de profit au temps $t$ est donnée par

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

où le prix de marché $p^{load}\_t$ et le prix du réseau $c^{grid}\_t$ sont contenus dans la variable d'état $S_t$. Notre fonction objectif reste le problème canonique donné par

$$
\max_\pi \E \sum_{t=0}^T  C(S_t,X^\pi(S_t))
$$

Comme précédemment, $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ qui est donné par les équations $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ et $\eqref{eq:energytransitionII3}$.

## Modélisation de l'incertitude

Nous décrivons ci-dessous deux styles de modélisation de l'incertitude au fil du temps. Nous décrivons d'abord une méthode pour modéliser les corrélations dans les erreurs de prévision au fil du temps en utilisant une technique parfois appelée *régression par processus gaussien*. Cette méthode garantit que lorsque nous avançons dans le temps, un vecteur de prévisions évolue de manière naturelle.

Ensuite, nous décrivons un modèle de Markov à état caché qui, selon notre expérience, fournit des trajectoires échantillonnées exceptionnellement réalistes pour les processus stochastiques. Ce modèle reproduit fidèlement les distributions d'erreurs, mais capture également très bien les *temps de croisement*, c'est-à-dire le temps pendant lequel le processus réel (par exemple, la vitesse du vent) reste au-dessus ou en dessous d'une référence telle qu'une prévision. Si nous pouvons correctement capturer le temps pendant lequel une prévision est au-dessus ou en dessous de la valeur réelle, cela signifie que nous capturons les corrélations dans le temps.

Cette section illustrera plusieurs méthodes puissantes de modélisation stochastique qui devraient figurer dans toute boîte à outils de modélisation de l'incertitude. La modélisation stochastique peut être techniquement sophistiquée, et cette section en est le reflet. Le lecteur est prévenu que cette section est beaucoup plus poussée que nos autres sections sur la modélisation de l'incertitude.

### Régression par processus gaussien pour les erreurs de prévision

La régression par processus gaussien (GPR en abrégé) est une méthode simple pour générer des séquences corrélées de variables aléatoires normalement distribuées. La GPR est particulièrement utile lorsqu'on essaie d'estimer une surface continue, où si un point de la surface est plus élevé que prévu, cela signifie que les points voisins seront également plus élevés que prévu.

Soit $X_{t'}$ le résultat réel de l'un de nos processus exogènes (prix, charges, température, énergie éolienne) au temps $t'$, et soit $f^X_{tt'}$ la prévision de $X_{t'}$ faite au temps $t < t'$. Il est courant de supposer une certaine erreur $\varepsilon_{t'-t}$ qui décrit la différence entre $X_{t'}$ et la prévision $f^X_{tt'}$. Nous supposerions alors un modèle pour $\varepsilon^X_{t'-t}$ tel que

$$
\varepsilon^X_{t'-t} \sim N(0, (t'-t) \sigma^2_X).
$$

Nous allons adopter une approche quelque peu différente en supposant que la distribution du changement dans une prévision $\fhat^X_{t+1,t'}$ est décrite par

$$
\fhat^X_{t+1,t'} \sim N(0, \sigma^2_X).
$$

Nous supposons ensuite que les changements dans les prévisions $\fhat^X_{t+1,t'}$ sont corrélés à travers les temps $t'$ avec une fonction de covariance

$$
\begin{align}
Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''}) = \sigma^2_X e^{-\beta\vert t''-t'\vert }. \label{eq:forecastcovariancefunction}
\end{align}
$$

La fonction de covariance $Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''})$ dans l'équation $\eqref{eq:forecastcovariancefunction}$ capture la propriété selon laquelle la covariance à travers le temps présente des corrélations qui diminuent avec la différence entre les deux instants. Ce modèle simple introduit le paramètre ajustable $\beta$ qui doit être estimé à partir des données, ou éventuellement par jugement. Par exemple, il pourrait être possible de tracer les valeurs de covariance pour différentes valeurs de $\beta$ et de choisir celle qui semble raisonnable.

Nous pouvons utiliser cette fonction de covariance pour créer une matrice de covariance $\Sigma^X$ avec l'élément $\Sigma^X_{t't''} = \sigma^2\_X e^{-\beta\vert t''-t'\vert }$. Il existe une manière simple de créer un échantillon corrélé de changements dans les prévisions en utilisant une méthode appelée *décomposition de Cholesky*. Elle commence par créer ce que nous pourrions appeler la « racine carrée » de la matrice de covariance $\Sigma^X$ que nous stockons dans une matrice triangulaire inférieure $L$. En python, en utilisant le paquet NumPy, nous utiliserions la commande python

```
L = scipy.linalg.cholesky(Sigma_X, lower=True)
```

Nous notons que $\Sigma^X = L^T L$, ce qui explique pourquoi nous considérons $L$ comme la racine carrée de $\Sigma^X$.

Ensuite, générons une séquence de variables aléatoires indépendantes $Z_{\tau}$ pour $\tau =  1, \ldots, H$ qui sont normalement distribuées avec une moyenne de 0 et une variance de 1. Maintenant, soit $Z=(Z_{t+1}, Z_{t+2}, \ldots, Z_{t+H})^T$ un vecteur colonne composé de ces variables aléatoires normales standard distribuées de manière indépendante. Nous pouvons créer un échantillon corrélé de changements dans les prévisions en utilisant

$$
\begin{pmatrix} \fhat^X_{t+1,t+1} \\ \fhat^X_{t+1,t+2} \\ \vdots \\ \fhat^X_{t+1,t+H} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} + L Z.
$$

Cette formule nous donne un ensemble échantillonné de changements dans les prévisions $\fhat^X_{t+1,t+1}, \ldots, \fhat^X_{t+1,t+H}$ qui sont corrélés selon notre fonction de décroissance exponentielle dans l'équation $\eqref{eq:forecastcovariancefunction}$. Le résultat sera un ensemble évolutif de prévisions où la variance des erreurs de prévision croît linéairement dans le temps selon

$$
Var(\varepsilon^X_{t'-t}) = (t'-t) \sigma^2_X.
$$

Les prévisions évolutives $f^X_{t,t'}, f^X_{t+1,t'}, \ldots$ présenteront le comportement que nous avons observé dans nos prévisions éoliennes évolutives à la Figure 9.2.

### Modèle de Markov à état caché

Un défi lors du développement de modèles stochastiques en énergie est de capturer une propriété connue sous le nom de *temps de croisement*. C'est le temps pendant lequel un processus réel (par exemple, le prix ou la vitesse du vent) est au-dessus ou en dessous d'une certaine référence telle qu'une prévision. La Figure 9.3 illustre un temps de croisement ascendant pour un processus éolien.

<figure class="book-figure">
  <img src="/assets/images/sdam/upcrossingtime.png" alt="Forecasted and actual wind power, illustrating an up-crossing time." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 9.3.</span> Puissance éolienne prévue (noir) et réelle, illustrant une période où la valeur réelle est supérieure à la prévision. La durée de cette période au-dessus est appelée un temps de croisement ascendant.</figcaption>
</figure>

La reproduction des temps de croisement à l'aide de la modélisation classique des séries temporelles s'est avérée infructueuse. Ce qui a fonctionné, c'est le développement d'un modèle de Markov avec une variable d'état caché $S^C_t$ qui est calibrée pour capturer la dynamique du processus se déplaçant au-dessus ou en dessous de la référence. Le processus utilise les étapes suivantes :

**Étape 1** – En comparant le processus réel à la référence, trouver les moments où le processus réel passe au-dessus ou en dessous de la référence, et produire un ensemble de données qui capture si le processus était au-dessus (A) ou en dessous (B) et pendant combien de temps. Regrouper ces périodes en trois catégories (S/M/L) pour court/moyen/long, et étiqueter chaque segment avec A ou B et S/M/L, créant six états. Ceux-ci sont appelés « états cachés » car, bien que nous sachions au temps $t$ si le processus réel est au-dessus ou en dessous de la référence, nous ne saurons pas si la durée est courte, moyenne ou longue avant que le processus n'ait franchi la référence.

**Étape 2** – En utilisant la séquence historique de $S^C_t$, calculer une matrice de transition à un pas $P^C[S^C_{t+1}\vert S^C_t]$, la probabilité que le processus de croisement prenne la valeur $S^C_{t+1}$ étant donné qu'il est actuellement dans l'état $S^C_t$.

**Étape 3** – Regrouper le processus réel (par exemple, la vitesse du vent) en, disons, cinq catégories basées sur la distribution cumulative empirique. Soit $W^g_t$ la vitesse du vent agrégée (un nombre de 1 à 5).

**Étape 4** – À partir de l'historique, calculer la distribution conditionnelle de la vitesse du vent étant donné $W^g_t$ et $S^C_t$, $F^W[W_{t+1}\vert W^g_t, S^C_t]$, la distribution cumulative empirique de la vitesse du vent $W_{t+1}$ étant donné $W^g_t$ et $S^C_t$.

En utilisant la matrice de transition à un pas $P^C[S^C_{t+1}\vert S^C_t]$ et la distribution cumulative conditionnelle $F^W[W_{t+1}\vert W^g_t, S^C_t]$, nous pouvons maintenant simuler notre processus stochastique en simulant d'abord la variable d'état caché $S^C_{t+1}$ étant donné $S^C_t$ (notons qu'il n'y en a que 30). Ensuite, à partir d'une vitesse du vent $W_t$, nous pouvons trouver la vitesse du vent agrégée $W^g_t$, puis échantillonner la vitesse du vent réelle $W_{t+1}$ à partir de la distribution cumulative conditionnelle $F^W[W_{t+1}\vert W^g_t, S^C_t]$.

Il a été constaté que cette logique reproduit fidèlement à la fois la distribution des erreurs (réel vs référence), ainsi que les distributions des temps de croisement ascendants et descendants, sur une gamme de jeux de données modélisant le vent ainsi que les prix du réseau. La Figure 9.4 illustre ces distributions sur un jeu de données particulier.

<figure class="book-figure">
  <img src="/assets/images/sdam/crossingtimedistributions.jpg" alt="Comparison of actual vs predicted forecast error distributions, up-crossing time distributions, and down-crossing time distributions." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 9.4.</span> Comparaison des distributions d'erreurs de prévision réelles vs prédites (haut), des distributions de temps de croisement ascendants (bas gauche) et des distributions de temps de croisement descendants (bas droite).</figcaption>
</figure>

## Conception de politiques

La plus grande complication de ce problème est que les prévisions font partie de la variable d'état, ce qui nous permet de modéliser explicitement l'évolution glissante de la prévision. La difficulté est que cela rend la variable d'état de haute dimension.

Les approches les plus courantes pour gérer les prévisions utilisent un modèle d'anticipation qui approxime le futur en fixant la prévision. Les deux stratégies les plus populaires sont :

- Anticipation déterministe avec la prévision capturée dans la formulation de l'anticipation.
- Anticipation stochastique avec variables latentes – Nous pouvons utiliser la prévision pour développer un modèle d'anticipation stochastique que nous résolvons ensuite en utilisant la programmation dynamique classique. Dans le modèle d'anticipation, nous fixons les prévisions dans le modèle, plutôt que de modéliser leur évolution dans le temps. Lorsque nous ignorons une variable dans un modèle (y compris un modèle d'anticipation), elle est appelée une *variable latente*.

Ces deux méthodes utilisent la prévision comme une variable latente dans la mesure où elles ne modélisent pas l'évolution de la prévision au sein du modèle d'anticipation. La difficulté avec le modèle d'anticipation stochastique est qu'il est plus difficile à résoudre. Si nous optimisons notre problème de stockage d'énergie par incréments de temps courts (cela pourrait être 5 minutes, ou même moins), cela peut créer des problèmes pour des techniques telles que la programmation dynamique exacte ou même approximative.

Pour cette raison, la stratégie la plus populaire pour gérer les problèmes dépendants du temps avec une prévision consiste à résoudre un modèle d'anticipation déterministe, tout comme nous l'avons fait pour notre problème de plus court chemin dynamique. Nous décrivons un tel modèle ci-dessous, puis introduisons une version paramétrée qui permet au modèle déterministe de mieux gérer l'incertitude.

Nous nous arrêtons pour noter que la planification à l'aide de prévisions glissantes est assez courante dans la gestion des opérations. Curieusement, les manuels ignorent presque uniformément la modélisation correcte des prévisions glissantes. Pratiquement tous les livres sur la planification des stocks, par exemple, assimilent la variable d'état au stock. Seule une petite poignée reconnaît que si les prévisions sont mises à jour à chaque période, alors nous devons représenter dans la variable d'état l'information nécessaire pour mettre à jour les prévisions. Si nous ignorons cette information, alors nous créons effectivement un modèle d'anticipation où la prévision est maintenue constante.

### Anticipation déterministe

Nous allons utiliser le même style notationnel que nous avons introduit pour la première fois au [Chapitre 6](/sdam/fr/chapter-6/), où nous distinguons notre *modèle de base*, qui est le problème que nous essayons de résoudre, du *modèle d'anticipation* que nous résolvons comme une forme de politique pour résoudre le modèle de base.

Rappelons que la formulation canonique de notre modèle de base est

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))\vert S_0\right\},
$$

où $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$, et où nous avons un processus d'information exogène $(S_0, W_1, W_2, \ldots, W_T)$. Notons que les variables $W_t$ peuvent dépendre de l'état $S_t$ et/ou de la décision $x_t$ ; si c'est le cas, alors la variable $W_{t+1}$ doit être générée à la volée après que nous connaissons $S_t$ et $x_t$.

Nous allons créer une politique en formulant un modèle d'anticipation déterministe, où toutes les variables sont étiquetées avec des tildes, et indexées à la fois par le temps $t$ auquel nous prenons notre décision, et le temps $t'$ qui est la variable de temps au sein du modèle d'anticipation. Nous définirions donc $\xtilde_{tt'}$, la décision au temps $t'$ dans le modèle d'anticipation étant générée au temps $t$ ; $\ctilde_{tt'}$, le coefficient de coût pour $\xtilde_{tt'}$ ; et $\Rtilde_{tt'}$, l'énergie dans la batterie au temps $t'$ dans le modèle d'anticipation généré au temps $t$.

Notons que $x_t = \xtilde_{tt}$, $c_t = \ctilde_{tt}$ et ainsi de suite.

Nous créons notre politique d'anticipation déterministe $X^{DLA}\_t(S_t)$ comme le programme linéaire suivant :

$$
\begin{align}
X^{DLA}_t(S_t) = \argmax_{x_t, (\xtilde_{tt'},t'=t+1, \ldots, t+H)} \left(C(S_t,x_t) + \sum_{t'=t+1}^{t+H} C(\Stilde_{tt'},\xtilde_{tt'})\right),  \label{eq:energydetlookahead0}
\end{align}
$$

où

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

$$
C(\Stilde_{tt'},\xtilde_{tt'}) = (\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \eta \xtilde^{r\ell}_{tt'}) \ptilde^{load}_{tt'} - (\xtilde^{g\ell}_{tt'} + \xtilde^{gr}_{tt'})\ctilde^{grid}_{tt'}.
$$

Ce problème doit être résolu sous réserve des contraintes $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$ pour $x_t$, et les contraintes suivantes pour $\xtilde_{tt'}$ pour tout $t' = t+1, \ldots, t+H$ :

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookahead1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}   &\leq  f^L_{tt'}, \label{eq:energydetlookahead2} \\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookahead3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookahead4}
\end{align}
$$

$$
\begin{align}
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookahead4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{wr}_{tt'}   &\leq  f^W_{tt'}, \label{eq:energydetlookahead5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energydetlookahead6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookahead7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookahead8}
\end{align}
$$

Ces équations reflètent celles des contraintes de base $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$, avec pour seule différence que nous utilisons les variables d'anticipation telles que $\xtilde_{tt'}$, $\Rtilde_{tt'}$, et les prévisions telles que $f^W_{tt'}$ au lieu du vent réel $W_t$.

Le modèle décrit par les équations $\eqref{eq:energydetlookahead0}$–$\eqref{eq:energydetlookahead8}$ est un programme linéaire relativement simple, pour lequel des paquets sont maintenant disponibles dans des langages tels que Matlab ou python.

Les politiques d'anticipation telles que $X^{DLA}\_t(S_t)$ sont largement utilisées dans les problèmes dynamiques et variables dans le temps comme celui-ci. Elles doivent être résolues de manière glissante, comme nous l'avons illustré pour la première fois avec notre problème de plus court chemin déterministe. C'est pourquoi on les appelle parfois « procédures à horizon glissant » ou « procédures à horizon fuyant ». Il existe tout un domaine appelé « commande prédictive » (model predictive control) qui repose sur ces politiques d'anticipation.

Pour des applications comme ce problème de stockage d'énergie, l'utilisation d'un modèle d'anticipation déterministe soulève la préoccupation que nous ne tenons pas compte des incertitudes. Par exemple, nous pourrions vouloir stocker de l'énergie supplémentaire dans la batterie pour nous protéger d'une chute soudaine du vent ou d'une hausse des prix sur le réseau. Dans la section suivante, nous allons décrire comment utiliser un modèle d'anticipation déterministe pour gérer l'incertitude.

### Anticipation paramétrée

Il existe un moyen très simple de résoudre le problème selon lequel notre anticipation déterministe ne gère pas l'incertitude. Ce que nous devons faire, c'est réfléchir à la manière dont nous pourrions modifier le modèle (ou la solution) en raison de l'incertitude. Par exemple, nous pourrions vouloir payer pour un stockage supplémentaire *dans le futur* afin de gérer des variations inattendues. Bien entendu, nous ne pouvons pas forcer le modèle à conserver de l'énergie en stock dès maintenant alors que nous pourrions en avoir besoin. Nous pourrions également vouloir pondérer à la baisse des prévisions qui pourraient ne pas être très précises.

Nous pouvons introduire ces changements en remplaçant les contraintes $\eqref{eq:energydetlookahead1}$–$\eqref{eq:energydetlookahead8}$ par ce qui suit

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookaheadmod1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}     &=     \theta^L_{t'-t} f^L_{tt'}, \label{eq:energydetlookaheadmod2}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookaheadmod3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookaheadmod4}\\
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookaheadmod4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{w\ell}_{tt'}&\leq  \theta^W_{t'-t} f^W_{tt'}, \label{eq:energydetlookaheadmod5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta}u^{charge}, \label{eq:energydetlookaheadmod6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookaheadmod7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookaheadmod8}
\end{align}
$$

Notez que nous avons introduit des paramètres pour modifier le membre de droite des contraintes $\eqref{eq:energydetlookaheadmod2}$ et $\eqref{eq:energydetlookaheadmod5}$, où nous avons introduit les coefficients $\theta^L_{t'-t}$ et $\theta^W_{t'-t}$ pour modifier les prévisions de charge et de vent, ces coefficients étant indexés selon le nombre de pas de temps de prévision dans le futur. Ensuite, nous avons modifié la contrainte $\eqref{eq:energydetlookaheadmod3}$ avec l'idée que nous pourrions vouloir restreindre notre capacité à utiliser toute l'énergie en stock afin de maintenir une réserve.

Soit $X^{DLA-P}(S_t\vert \theta)$ représentant la politique d'anticipation qui est résolue sous les contraintes paramétrées $\eqref{eq:energydetlookaheadmod1}$–$\eqref{eq:energydetlookaheadmod8}$. Une fois que nous avons décidé comment introduire ces paramétrisations (c'est là l'art de tout modèle paramétrique), se pose le problème de trouver la meilleure valeur pour $\theta$. Il s'agit du problème de recherche de paramètres que nous avons traité au [Chapitre 7](/sdam/fr/chapter-7/).

Nous avons calculé l'amélioration relative obtenue en utilisant une anticipation déterministe paramétrée et optimisée, où nous recherchons les meilleures valeurs du vecteur $\theta=(\theta^L, \theta^W)$, par rapport à une politique de base qui fixe ces paramètres à 1,0. Dans nos expériences, nous avons fixé $\theta^L_{t'-t} = 1$, et nous avons seulement optimisé le coefficient de la prévision de vent, $\theta^W_{t'-t}$.

Les résultats sont présentés dans la Figure 9.5, qui montrent que nous améliorons la performance en moyenne d'environ 30 pour cent. Ce qui est important, c'est que cette amélioration ne s'accompagne d'aucune complexité supplémentaire lors de la prise de décisions sur le terrain. La seule étape, que nous n'avons pas décrite ici, est que nous devons calibrer le vecteur de paramètres $\theta$. Le processus d'optimisation de $\theta$ n'est malheureusement pas facile.

<figure class="book-figure">
  <img src="/assets/images/sdam/cfaenergyperformance.png" alt="Relative improvement of the deterministic lookahead with optimized theta versus using theta=1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 9.5.</span> Amélioration relative de l'anticipation déterministe avec $\theta_\tau$ optimisé par rapport à l'utilisation de $\theta_\tau = 1$.</figcaption>
</figure>

## Qu'avons-nous appris ?

- Dans ce chapitre, nous introduisons un problème de stockage d'énergie beaucoup plus complexe avec des prévisions glissantes.
- Nous introduisons le « modèle de martingale de l'évolution des prévisions », qui suppose que les prévisions futures évoluent au fil du temps, où la variation attendue d'une prévision est nulle (mais la variation réelle est positive ou négative).
- Nous décrivons ensuite un modèle de Markov semi-caché qui nous aide à reproduire les « temps de croisement », qui capturent le temps pendant lequel une prévision est au-dessus ou en dessous de la valeur réelle.
- Nous introduisons une politique d'anticipation déterministe, puis une anticipation déterministe paramétrée, où nous introduisons des coefficients pour chaque prévision (un autre exemple d'hybride DLA/CFA).
- Nous montrons que la politique DLA/CFA calibrée surpasse l'anticipation déterministe pure (non calibrée) d'environ 30 pour cent.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Qu'entend-on par « modèle de martingale de l'évolution des prévisions » ?</li>
<li>L'ensemble de la prévision au temps $t$ pour chaque quantité telle que la charge $L_t$, $f^L_{tt'}$ pour $t'=t, \ldots, t+H$, se trouve dans la variable d'état. Pourquoi ? [Indice : examinez les équations de transition pour les prévisions et les variables qu'elles prévoient.]</li>
<li>Quelle est la différence entre les variables $x_t$, $t=0, \ldots, T$, et les variables $\xtilde_{tt'}$ pour $t' = t, \ldots, t+H$ ?</li>
<li>Qu'est-ce qu'un « temps de croisement » ?</li>
<li>Qu'est-ce qu'une « décomposition de Cholesky » et à quoi sert-elle ?</li>
<li>Quel état est caché dans le modèle de Markov à état caché de l'énergie éolienne ? Expliquez pourquoi il est caché.</li>
<li>À quelle classe de politique appartient la politique d'anticipation paramétrée ci-dessus ? Quelle fonction objectif est utilisée pour trouver le meilleur ensemble de paramètres de calibration ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Essayez de concevoir une politique paramétrée pour prendre des décisions dans les conditions du problème présenté dans ce chapitre. Vous pouvez utiliser tout type de règles ou de fonctions paramétrées. La seule limitation est que vous n'êtes pas autorisé à optimiser quoi que ce soit (c'est-à-dire que vous ne pouvez pas utiliser un $\argmax_x$ dans votre politique).</li>
<li>Notre anticipation paramétrée se limitait à l'introduction de coefficients devant les prévisions. Vous pouvez également introduire des ajustements additifs, comme empêcher le dispositif de stockage d'énergie de trop s'approcher de sa capacité (ce qui vous permettrait de stocker un surplus de vent dépassant la prévision) ou de trop s'approcher de zéro (en cas de baisse du vent). Proposez une paramétrisation alternative et argumentez pourquoi votre structure pourrait apporter de la valeur.</li>
</ol>
{% endraw %}
