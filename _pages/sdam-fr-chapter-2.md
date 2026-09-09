---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 2 : Un problème de vente d'actif"
permalink: /sdam/fr/chapter-2/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 0243c062a31cf107
---

{% raw %}
## Aperçu du chapitre

Le problème de vente d'un actif est le plus simple de nos problèmes de décision séquentielle, consistant purement en un processus de prix stochastique où nous devons décider du moment où vendre un actif que nous détenons. Le problème consiste à déterminer quand vendre l'actif afin de maximiser le prix espéré que nous recevons.

Ce problème est largement connu comme un *problème d'arrêt optimal*, qui est normalement exprimé à l'aide de mathématiques assez sophistiquées. Nous l'utilisons pour illustrer quelques politiques de base qui relèvent de la première de nos quatre classes, les approximations de fonctions de politique (PFA). Nous introduisons plusieurs PFA, chacune nécessitant des paramètres de réglage pour obtenir les meilleurs résultats.

Cet exercice constitue une illustration simple et élégante des cinq éléments du cadre de modélisation universel.

## Récit

Nous détenons un bloc d'actions boursières, à la recherche d'un moment opportun pour vendre. Nous commençons par supposer que nous sommes un petit acteur, ce qui signifie que le nombre d'actions vendues n'a pas d'importance, donc nous allons supposer que nous n'avons qu'une seule action. Si nous vendons au temps $t$, nous recevons un prix qui varie selon un certain processus aléatoire dans le temps, bien que nous ne pensions pas que les prix ont une tendance à la hausse ou à la baisse. Une fois que nous vendons l'action, le processus s'arrête.

## Formulation du problème

Les réponses à nos trois questions de formulation sont :

- **Métriques :** Maximiser le prix espéré que nous recevons lorsque nous vendons l'actif.
- **Décisions :** Décider de conserver ou de vendre l'actif.
- **Incertitudes :** Le prix de vente dans les périodes futures.

## Modèle de base

### Variables d'état

Notre processus comporte deux variables d'état : l'« état physique », qui indique si nous détenons toujours l'actif ou non, et un « état informationnel » qui, pour ce problème, correspond au prix de l'action.

Notre « état physique » est donné par

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

Si nous vendons l'action, nous recevons le prix par action de $p_t$. Cela signifie que notre variable d'état est

$$
S_t = (R^{asset}_t, p_t).
$$

### Variables de décision

La variable de décision est de savoir si l'on doit conserver ou vendre l'action. Nous l'écrivons à l'aide de

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

Il ne nous est permis que de vendre l'action dans ce problème, nous devons donc respecter la contrainte

$$
x_t \leq R^{asset}_t.
$$

Nous allons définir notre politique $X^\pi(S_t)$ qui déterminera la manière dont nous prenons les décisions. À ce stade, nous introduisons la notation de la politique, mais nous reportons sa conception à plus tard. C'est ce que nous voulons dire lorsque nous disons que nous « modélisons d'abord, puis résolvons ».

### Information exogène

Le seul processus aléatoire dans notre modèle de base est le changement de prix. Il existe deux façons de l'écrire. La première consiste à supposer que l'information exogène est le changement de prix. Nous pouvons l'écrire comme

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

Cela signifie que notre processus de prix évolue selon

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

Nous écririons alors notre information exogène $W_{t+1}$ comme

$$
W_{t+1} = \phat_{t+1}.
$$

La deuxième façon consiste à supposer que nous observons simplement le prix suivant, dans ce cas nous écririons

$$
W_{t+1} = p_{t+1}.
$$

### Fonction de transition

La fonction de transition consiste dans les équations qui décrivent comment l'état évolue dans le temps. L'équation de transition pour $R_t$ est donnée par

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

où nous avons la contrainte que $x_t \leq R^{asset}\_t$ afin de nous assurer que nous ne vendons pas l'actif lorsque nous ne le possédons plus.

Ensuite, nous devons écrire comment le processus de prix évolue dans le temps. Si nous utilisons la notation $\phat_t$, la fonction de transition pour le prix $p_t$ serait donnée par

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

Les équations $\eqref{eq:assetsellingR}$ et $\eqref{eq:assetsellingP}$ constituent ce que nous appelons notre *fonction de transition* que nous écrivons comme

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

Si nous utilisons notre politique $X^\pi(S_t)$ pour prendre des décisions, et si nous choisissons une trajectoire d'échantillon $\omega$ qui détermine la séquence $W_1, W_2, \ldots, W_T$, alors nous pouvons écrire une simulation de notre processus comme

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

Notez que lorsque nous écrivons la séquence, nous indexons les variables selon leur contenu informationnel. Par exemple, $S_0$ est un état initial, et $x_0$ ne dépend que de $S_0$. En revanche, toute variable indexée par $t$ est autorisée à « voir » n'importe quel résultat de notre processus exogène $W_1, \ldots, W_t$, mais n'est pas autorisée à voir $W_{t+1}$.

### Fonction objectif

Nous terminons notre modèle par un énoncé de notre fonction objectif, qui devient ensuite la base pour évaluer les politiques. Pour commencer, nous devons disposer d'une métrique de performance, qui pour ce problème correspondrait à ce que nous gagnons en vendant notre action. Nous pouvons définir une fonction de contribution générique que nous écrivons $C(S_t,x_t)$, qui serait donnée par

$$
C(S_t,x_t) = p_tx_t.
$$

Dans notre problème, $x_t =0$ jusqu'à ce que nous choisissions de vendre. Pour l'instant, supposons que nous vendons un actif discret unique (nous pourrions considérer cela comme la vente de toutes nos actions en une seule fois). Dans ce cas, lorsque nous vendons, nous poserions $x_t = 1$, ce qui ne se produira qu'une seule fois sur notre horizon. Nous notons la dépendance de $C(S_t,x_t)$ pour capturer la dépendance à l'état, ce qui s'explique par la présence du prix $p_t$.

Nous voulons maintenant formuler notre problème d'optimisation. Si les prix nous étaient donnés à l'avance, nous écririons

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

où nous imposerions les contraintes

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

Cela convient lorsque le problème est déterministe, mais comment modéliser le problème pour gérer l'incertitude sur les prix ? Ce que nous faisons, c'est imaginer que nous simulons une politique en suivant une trajectoire d'échantillon $\omega$ de prix $p_1(\omega), p_2(\omega), \ldots$. En utilisant une politique $\pi$, nous générerions alors une série d'états à l'aide de

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

Nous écrivons $S_t(\omega)$ pour exprimer la dépendance à la trajectoire d'échantillon. Nous aurions aussi pu écrire $S^\pi_t(\omega)$ pour exprimer la dépendance à la politique $\pi$, mais nous avons tendance à omettre la dépendance à la politique par souci de simplicité.

Si nous suivons la politique $\pi$ le long de cette trajectoire d'échantillon, nous pouvons calculer la performance à l'aide de

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

Ceci vaut pour une seule trajectoire d'échantillon. Notez que nous obtenons un ensemble de décisions $x_t(\omega)$ pour chaque trajectoire d'échantillon à partir de la politique $x_t(\omega) = X^\pi(S_t(\omega))$. Cette notation exprime que $x_t$ est une variable aléatoire qui dépend de la trajectoire d'échantillon $\omega$. Pour chaque trajectoire d'échantillon, nous obtenons toujours $\sum_{t=0}^{T-1} x_t(\omega) =1$, ce qui fait écho à notre contrainte ci-dessus pour la version déterministe du problème. Il existe un temps $\tau(\omega)$ qui est le moment où $x_t(\omega)=1$ pour $t=\tau(\omega)$. Ce temps est connu comme un *temps d'arrêt* pour ce problème de vente d'actif.

Nous pouvons effectuer une simulation sur un échantillon de $N$ échantillons $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ et prendre une moyenne à l'aide de

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

Enfin, nous écrivons le problème d'optimisation en termes de recherche de la meilleure politique, que nous pouvons écrire

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

Nous verrons que le problème d'optimisation énoncé par $\eqref{eq:maxpifbarasset}$, où nous souhaiterions trouver la politique optimale, est principalement aspirationnel. Bien que nous souhaitions certainement obtenir la politique optimale, nous nous contenterons généralement de la meilleure politique que nous puissions trouver (et calculer).

En pratique, nous utilisons généralement des moyennes telles que dans l'équation $\eqref{eq:assetsellingfbarpi}$ pour notre problème d'optimisation. Cependant, ce n'est là qu'une approximation du calcul d'une espérance réelle, que nous écrirons comme

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

Par convention, lorsque nous écrivons l'espérance, nous supprimons l'indexation sur $\omega$ et considérons plutôt $\Fhat^\pi$ comme une variable aléatoire, tandis que $\Fhat^\pi(\omega)$ est traité comme une réalisation d'échantillon (ceci est une notation standard dans la communauté de la modélisation stochastique, il faut donc simplement s'y habituer).

En utilisant notre opérateur d'espérance, nous écririons notre fonction objectif comme

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

Souvent, nous allons écrire notre fonction objectif comme

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

La forme de l'équation $\eqref{eq:assetsellingobjective}$ (ou $\eqref{eq:assetsellingfpiexpectation}$ ou $\eqref{eq:assetsellingexpectedsum}$) est agréable et compacte. Il faut simplement se rappeler qu'il n'est presque jamais possible de calculer réellement l'espérance, si bien que nous dépendons généralement de l'exécution de simulations et de la prise d'une moyenne comme nous le faisons dans l'équation $\eqref{eq:assetsellingfbarpi}$.

Il nous reste maintenant le problème de la recherche parmi les politiques. Nous allons toujours créer notre modèle d'abord, puis nous tourner vers le problème de la conception des politiques. Avant de faire cela, nous devons réfléchir à la manière dont nous allons modéliser toute incertitude dans $S_0$ et le processus d'information exogène $W_1, \ldots, W_T$.

## Modélisation de l'incertitude

Nous allons avoir besoin d'un moyen d'échantillonner des observations de $W_t$ ce qui, pour ce problème, signifie modéliser l'évolution des prix $p_t$ dans le temps. Une façon consiste à tirer des échantillons de l'historique. Imaginons que nous souhaitions exécuter notre simulation sur une période d'un an. Nous pouvons utiliser l'historique de l'année précédente, mais ce n'est là qu'une seule trajectoire d'échantillon.

La deuxième stratégie, que nous utiliserons souvent, consiste à estimer un modèle statistique. Pour notre modèle de base, nous pourrions supposer

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

où $\phat_{t+1}$ est décrit par une certaine distribution de probabilité. Un modèle simple consisterait à supposer que $\phat_{t+1}$ suit une distribution normale de moyenne 0 et de variance $\sigma^2$. Nous pourrions également commencer par supposer que les changements de prix $\phat_t$ et $\phat_{t+1}$ sont indépendants, et que $\phat_{t+1}$ est indépendant du prix actuel $p_t$ (cette dernière hypothèse est un peu forte, mais elle nous aidera à démarrer).

La plupart des langages informatiques disposent de fonctions permettant de simuler des observations issues d'une distribution normale. Par exemple, Excel fournit la fonction `Norm.inv`$(p,\mu,\sigma)$, qui renvoie la valeur $w$ d'une variable aléatoire $W$ de moyenne $\mu$ et d'écart type $\sigma$ où $P[W \leq w] = p$. Une astuce classique consiste à poser $p=Rand()$, où $Rand()$ est une fonction Excel qui renvoie une variable aléatoire uniformément distribuée entre $0$ et $1$. Nous pouvons alors écrire

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

ce qui nous donnera une observation aléatoire de $\phat_{t+1}$ suivant une distribution normale de moyenne $0$ et d'écart type $\sigma$.

Le Tableau 2.1 illustre dix observations de variables aléatoires $U$ uniformément distribuées entre 0 et 1, ainsi que les échantillons correspondants de changements de prix normalement distribués $\phat$ de moyenne 0 et de variance 1.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>$U$</th><th>$\phat$</th></tr></thead>
<tbody>
<tr><td>0.8287</td><td>0.9491</td></tr>
<tr><td>0.6257</td><td>0.3206</td></tr>
<tr><td>0.9343</td><td>1.5086</td></tr>
<tr><td>0.4879</td><td>-0.0303</td></tr>
<tr><td>0.3736</td><td>-0.3223</td></tr>
<tr><td>0.8145</td><td>0.8947</td></tr>
<tr><td>0.0385</td><td>-1.7685</td></tr>
<tr><td>0.0089</td><td>-2.3698</td></tr>
<tr><td>0.9430</td><td>1.5808</td></tr>
<tr><td>0.3693</td><td>-0.3336</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 2.1.</span> Dix variables aléatoires uniformes $U$, et dix échantillons correspondants de changements de prix normalement distribués $\phat$ de moyenne 0 et de variance 1.</p>
</div>

L'équation $\eqref{eq:assetsellingpricemodel1}$ est un modèle de prix assez basique, mais il nous aidera à illustrer notre cadre de modélisation. Ci-dessous, nous allons introduire quelques extensions qui incluent un modèle plus riche.

## Conception des politiques

Nous pouvons envisager plusieurs politiques différentes pour ce problème. Par exemple, une politique simple pourrait consister à vendre si le prix descend en dessous d'un point limite que nous pensons annonciateur d'un déclin important. Ainsi, nous pourrions écrire cette politique comme

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

Une autre politique pourrait être une politique de vente « haut-bas », où nous voulons vendre si le prix monte trop haut ou descend trop bas. Soit $\theta^{high-low} = (\theta^{low}, \theta^{high})$. Cela pourrait s'écrire

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

Une objection possible à cette politique pourrait être qu'elle vend prématurément une action en hausse. Peut-être voulons-nous simplement vendre lorsque l'action dépasse un signal de suivi. Pour traiter ce problème, créons d'abord une estimation lissée du prix à l'aide de

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Considérons maintenant une politique de suivi que nous pourrions écrire comme

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

Dans tous les cas, nous ne pouvons vendre l'actif (c'est-à-dire $X^{track}(S_t\vert \theta^{track}) =1$) que si nous détenons encore l'actif (ce qui signifie $R^{asset}\_t = 1$).

Pour cette politique, nous allons devoir ajuster notre modèle, car nous avons désormais besoin de $\pbar_t$ pour prendre une décision. Cela signifie que nous écririons désormais notre état comme

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

Nous pouvons écrire nos classes de politiques comme l'ensemble $\Fcal = \lbrace $« vente-basse », « haut-bas », « suivi »$\rbrace $. Pour chacune de ces classes, nous disposons d'un ensemble de paramètres que nous pouvons écrire comme $\theta^f$ pour $f\in\Fcal$. Pour les politiques « vente-basse » et « suivi », il n'y a qu'un seul paramètre, alors que $\theta^{high-low}$ en possède deux.

Nous pouvons maintenant écrire notre recherche parmi les politiques $\pi$ de manière plus pratique comme une recherche parmi les classes de fonctions $f\in\Fcal$, puis une recherche parmi les paramètres $\theta^f \in \Theta^f$, où $\Theta^f$ nous indique la plage des valeurs possibles (capturant en même temps la dimensionnalité de $\theta^f$).

La façon dont nous avons conçu les politiques dans cette section peut sembler quelque peu empirique, mais c'est en fait exactement ainsi que de nombreuses politiques sont conçues (y compris les stratégies d'achat-vente utilisées par les principaux fonds spéculatifs). De nombreux types de politiques sont possibles, dont certains seront plus performants que d'autres ; nous nous concentrons sur ceux-ci à titre d'exemples illustratifs. Il existe un art de concevoir les politiques qui rappelle l'art de concevoir des modèles statistiques pour l'estimation.

## Évaluation d'une politique

Nous avons indiqué plus haut que nous pouvons évaluer une politique en la simulant à l'aide de

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

où $\omega$ est utilisé pour représenter une trajectoire d'échantillon de réalisations des variables aléatoires exogènes utilisées dans le modèle. Le Tableau 2.2 illustre une série de trajectoires d'échantillons de prix. Par exemple, imaginons que nous utilisions la politique « vendre-bas » avec $\theta^{sell-low} = \Doll 42$. Considérons maintenant son test sur la trajectoire d'échantillon $\omega^5$. Le résultat serait

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

puisque $\Doll 41.53$ est le premier prix qui tombe en dessous de $\Doll 42$. Si aucun des prix ne descend en dessous de notre point de vente, alors toutes nos politiques sont conçues pour vendre à la fin.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>42.67</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>46.35</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>43.17</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.24</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>47.68</td><td>46.32</td><td>46.14</td><td>41.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>47.83</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.11</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>46.78</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>43.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>43.16</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>46.57</td><td>45.01</td><td>46.73</td><td>42.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 2.2.</span> Illustration d'un ensemble de trajectoires de prix.</p>
</div>

Nous pouvons ensuite évaluer chaque politique (à la fois la classe de politique et les paramètres de cette classe) en effectuant des simulations répétées et en calculant une moyenne. Nous écrivons cela comme suit

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

Il est parfois nécessaire d'exprimer un intervalle de confiance, puisque $\Fbar^\pi$ n'est rien d'autre qu'une estimation statistique. Nous calculerions d'abord une estimation de la variance de notre variable aléatoire $\Fhat^\pi$, ce que nous faisons à l'aide de

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

Nous obtenons ensuite notre estimation de la variance de notre moyenne $\Fbar^\pi$ à l'aide de

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

À partir de là, nous pouvons construire un intervalle de confiance pour comparer deux politiques que nous pourrions appeler $\pi^A$ et $\pi^B$. Soit $\mu^\pi$ la performance réelle de la politique $\pi$, où $\Fbar^\pi$ est notre estimation statistique de $\mu^\pi$. Nous aimerions obtenir un intervalle de confiance pour la différence $\mu^{\pi^A} - \mu^{\pi^B}$. Notre meilleure estimation de cette différence est $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$. La variance de cette différence est

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

où nous supposons que les estimations $\Fbar^{\pi^A}$ et $\Fbar^{\pi^B}$ sont indépendantes, ce qui signifie que chaque politique est testée sur un échantillon aléatoire différent de prix. Dans ce cas, nous calculerions notre intervalle de confiance à l'aide de

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

où $z_\alpha$ est la valeur de $z$ telle qu'une variable aléatoire normalement distribuée $Z$ soit supérieure à $z$ avec une probabilité $\alpha$. Par exemple, $z_{.05} = 1.645$, ce qui signifie $Prob[Z \geq 1.645] = .05$.

Une meilleure approche consiste à utiliser les mêmes échantillons pour évaluer chaque politique. Par exemple, nous pourrions tester chaque politique sur la même trajectoire d'échantillon $\omega$ choisie dans le Tableau 2.2. En testant nos politiques de cette manière, nous obtiendrions $\Fhat^{\pi^A}(\omega)$ et $\Fhat^{\pi^B}(\omega)$ (en utilisant le même ensemble de prix $p_t(\omega)$), puis nous calculerions la différence

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

Nous calculons maintenant la différence moyenne

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

et la variance

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

Notez que la variance $(\delta \sigmabar^{A-B})^2$ sera plus petite que la variance obtenue lorsque des échantillons indépendants sont utilisés. L'intervalle de confiance pour la différence serait alors

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

Le calcul d'intervalles de confiance peut être utile lors de la comparaison de différentes classes de politiques. Alternativement, nous pouvons comparer la performance de deux conceptions physiques (par exemple la vitesse de deux machines ou l'emplacement d'une installation). Le choix d'une politique s'apparente étroitement à toute décision de conception pour un système.

## Extensions

### Processus de prix en série temporelle

Imaginons que nous voulions un processus de prix un peu plus réaliste qui capture l'autocorrélation dans le temps. Nous pourrions proposer que

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

où nous supposons toujours que le bruit aléatoire $\varepsilon_t$ est indépendant (et identiquement distribué) dans le temps. Nous allons également supposer pour le moment que nous connaissons les coefficients $\eta = (\eta_0, \eta_1, \eta_2)$.

Ce modèle de prix nécessite un changement subtil dans notre modèle, en particulier la variable d'état. Nous allons remplacer notre ancienne équation de transition pour les prix, $\eqref{eq:assetsellingP}$, par notre nouveau modèle de série temporelle donné dans $\eqref{eq:assetsellingpricetimeseries}$. Pour calculer $p_{t+1}$, il ne suffit plus de connaître $p_t$, nous devons maintenant également connaître $p_{t-1}$ et $p_{t-2}$. Notre variable d'état serait maintenant donnée par

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Pour les politiques que nous avons examinées ci-dessus, cela ne complique pas beaucoup notre modèle. Plus tard, nous allons introduire des politiques où les variables supplémentaires représentent une complication majeure.

### Processus de prix en série temporelle avec apprentissage

Supposons maintenant que notre processus de prix en série temporelle soit donné par

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

où $\varepsilon \sim N(0, 4^2)$ et où $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ est notre *estimation* de $\eta$ compte tenu de ce que nous savons au temps $t$ (dans la section précédente, nous avons supposé que $\theta$ était connu).

Il existe des formules simples qui régissent la mise à jour de $\etabar_t$ vers $\etabar_{t+1}$ compte tenu de nos estimations $\etabar_t$ et de l'observation du prix suivant $p_{t+1}$.

Nous laissons d'abord

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

être notre estimation de $p_{t+1}$ compte tenu de ce que nous savons au temps $t$. L'erreur dans cette estimation est donnée par

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

Maintenant, soit le vecteur $\phi_t$ le vecteur des variables explicatives dans notre processus de prix, donné par

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

Ensuite, nous définissons la matrice $2 \times 2$ $M_t$ qui est mise à jour de manière récursive à l'aide de

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

où $\gamma_t$ est un scalaire calculé à l'aide de

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

Nous pouvons maintenant mettre à jour $\etabar_t$ à l'aide de

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

L'Exercice 6 approfondira ces équations.

### Panier d'actifs

Une autre complexité apparaît lorsque nous considérons un panier d'actifs. Soit $p_{ti}$ le prix de l'actif $i$. Supposons pour le moment que chaque prix évolue selon le processus de base

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

Nous pourrions supposer que les termes de bruit $\varepsilon_{t+1,i}$ sont indépendants entre les actifs $i\in\Ical$, mais un modèle plus réaliste consisterait à supposer que les prix des différents actifs sont corrélés. Soit $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ la covariance des prix aléatoires $p_{t+1,i}$ et $p_{t+1,j}$ pour les actifs $i$ et $j$ compte tenu de ce que nous savons au temps $t$. Supposons pour le moment que nous connaissions la matrice de covariance $\Sigma$, peut-être en utilisant un ensemble de données historiques pour l'estimer (mais en la maintenant fixe une fois estimée).

Nous pouvons utiliser la matrice de covariance pour générer des réalisations d'échantillons de prix corrélés à l'aide d'une technique appelée décomposition de Cholesky. Elle procède en créant ce que nous appelons la « racine carrée » de la matrice de covariance $\Sigma$ que nous stockons dans une matrice triangulaire inférieure $L$. En python, en utilisant le package NumPy, nous utiliserions la commande python

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

La matrice $L$ nous permet d'obtenir la matrice $\Sigma$ à l'aide de $\Sigma = L^T L$.

Maintenant, soit $Z$ un vecteur de variables aléatoires, une pour chaque actif, où $Z_i \sim N(0,1)$ (pratiquement tous les langages de programmation disposent de routines permettant de créer des échantillons aléatoires à partir de distributions normales de moyenne 0 et de variance 1). Soit $p_t$, $p_{t+1}$ et $Z$ des vecteurs colonnes (dimensionnés selon le nombre d'actifs). Nous créons d'abord un échantillon $\hat Z$ en échantillonnant à partir de $N(0,1)$ $\vert \Ical\vert $ fois. Notre échantillon de prix $p_{t+1}$ est alors donné par

$$
p_{t+1} = p_t + L \hat{Z}.
$$

Pour ce problème, notre variable d'état est donnée par $S_t = (R_t,p_t)$ où $R_t = (R_{ti})\_{i\in\Ical}$ capture le nombre d'actions de chaque actif que nous possédons, tandis que $p_t$ est notre vecteur de prix actuel. La matrice de covariance $\Sigma$ ne figure pas dans la variable d'état car nous supposons qu'elle est statique (ce qui signifie que nous la plaçons dans $S_0$). La réponse change si nous devions mettre à jour la matrice de covariance à chaque nouvelle observation, auquel cas nous écririons la matrice de covariance comme $\Sigma_t$ pour capturer sa dépendance au temps. Puisqu'elle varie désormais dynamiquement, la variable d'état serait $S_t = (R_t, p_t, \Sigma_t)$.

## Qu'avons-nous appris ?

Nous avons utilisé ce problème pour illustrer différents types de politiques PFA :

- Nous avons utilisé un problème simple de vente d'actif pour illustrer un problème de décision séquentielle comportant à la fois un état physique (si nous détenons un actif, ou en quelle quantité), et le prix auquel nous pourrions le vendre au temps $t$.
- Nous avons montré comment modéliser l'incertitude et introduit la notion de trajectoire d'échantillon $\omega$ pour le processus d'information exogène $W_1, \ldots, W_T$.
- Nous avons illustré plusieurs politiques simples de la classe PFA.
- Nous avons montré comment simuler une politique.
- Nous avons introduit une certaine complexité dans le processus de prix (où le prix $p_{t+1}$ dépend de l'historique récent des prix), ainsi que la situation où le prix de vente dépend d'un panier d'actifs, ce qui constitue un processus d'information multidimensionnel plus complexe. Notez que cela n'introduit aucune complexité significative autre que la modélisation du processus. Cela crée une variable d'état de dimension beaucoup plus élevée, mais cela ne représente pas une forme significative de complexité pour le problème de conception ou d'évaluation des politiques (ce qui n'est pas vrai pour toutes les classes de politiques).
- Nous avons montré comment mettre à jour un modèle linéaire du processus de prix.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Nous écrivons la fonction de transition comme $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.
  <ol type="a">
    <li>Pourquoi écrivons-nous l'information exogène comme $W_{t+1}$ plutôt que $W_t$ ?</li>
    <li>À quel moment calculerions-nous $S_{t+1}$ à l'aide de cette équation ?</li>
  </ol>
</li>
<li>Quelle est la différence entre $p_t$ et $p_t(\omega)$ ?</li>
<li>Lorsque vous testez différentes politiques, la structure de la fonction de transition change-t-elle ?</li>
<li>La fonction objectif dans l'équation $\eqref{eq:deterministicobjassetselling}$ est écrite pour une version déterministe du problème. Si nous résolvons ce problème d'optimisation, la décision $x_t$ au temps $t$ dépend-elle des prix $p_{t'}$ pour $t' > t$ ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>En utilisant les prix du Tableau 2.2, utilisez la politique selon laquelle vous vendrez lorsque le prix tombera en dessous de 44,00 ＄. Calculez la fonction objectif $\Fhat(\omega^n)$ pour $n=1,\ldots, 10$. Calculez le prix de vente moyen et sa variance.</li>
<li>Les questions ci-dessous vous guident à travers les étapes de la modélisation de la vente d'un actif (disons, une seule action d'un titre).
  <ol type="a">
    <li>Supposons que vous simulez vos prix à l'aide de données provenant d'un modèle mathématique donné par $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$, où $\varepsilon \sim N(0, 6^2)$.

    Nous ne connaissons pas la valeur de $\eta = (\eta_0, \eta_1)$, mais notre croyance quant à la vraie valeur de $\eta$ est qu'elle est multivariée normale, avec $\eta \sim MVN({\bar \eta}, \Sigma)$ où

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    Supposons que la matrice de covariance $\Sigma_t$ soit donnée par

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    où $\Sigma_{tij} = Cov(\eta_i,\eta_j)$ pour $i,j \in (0,1)$. Supposons qu'au temps $t$, $p_t = 20$, $p_{t-1} = 24$ et que nous observions $p_{t+1} = 18.2$.

En utilisant les équations de la section sur le processus de prix en série temporelle avec apprentissage, quelles sont les estimations mises à jour de $\etabar_{t+1}$ et $\Sigma_{t+1}$ ? Donnez l'équation de mise à jour et calculez numériquement $\etabar_{t+1}$ et $\Sigma_{t+1}$.</li>
    <li>Quelle est la variable d'état pour ce problème ? Donnez la liste des variables. Notez que vous devrez peut-être ajouter des variables au fur et à mesure de votre progression dans l'exercice (vous ne disposez pas de toutes les informations à ce stade). Assurez-vous d'inclure toutes les informations nécessaires pour mettre à jour $\etabar_{t+1}$ à partir de $\etabar_t$. Combien de dimensions comporte votre variable d'état (c'est la même chose que de demander combien de variables sont contenues dans $S_t$).</li>
    <li>Notre trader prend ses décisions de trading sur la base d'une moyenne mobile sur 7 jours des prix. Supposons que nous soyons au jour $t$, et que la moyenne mobile sur 7 jours soit calculée à l'aide de

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    Le trader vendra un actif si $p_t < \pbar_t - \theta^{sell}$. Écrivez la règle de décision sous la forme d'une politique $X^\pi(S_t\vert \theta^{sell})$ qui renvoie 1 si nous vendons l'actif et 0 sinon.</li>
    <li>Quelle est l'information exogène ?</li>
    <li>Écrivez les équations de transition. Vous avez besoin d'une équation pour chaque élément de $S_t$.</li>
    <li>Écrivez la fonction objectif (et n'oubliez pas d'utiliser un opérateur d'espérance pour chaque variable aléatoire comme décrit dans les instructions). Veillez à préciser sur quoi vous optimisez étant donné la classe de politique spécifiée à la partie (c). Supposez que vous entraînez votre politique sur des données historiques dans un cadre hors ligne.</li>
  </ol>
</li>
<li>Vous devez exécuter une simulation des prix de l'électricité, qui sont notoirement à queue lourde. Vous recueillez les données présentées dans le tableau ci-dessous.

<div class="book-table-wrap">
<table class="book-table is-narrow">
<thead><tr><th>Temps</th><th>Prix</th></tr></thead>
<tbody>
<tr><td>1</td><td>20</td></tr>
<tr><td>2</td><td>32</td></tr>
<tr><td>3</td><td>26</td></tr>
<tr><td>4</td><td>180</td></tr>
<tr><td>5</td><td>30</td></tr>
<tr><td>6</td><td>45</td></tr>
<tr><td>7</td><td>18</td></tr>
<tr><td>8</td><td>120</td></tr>
<tr><td>9</td><td>57</td></tr>
<tr><td>10</td><td>15</td></tr>
</tbody>
</table>
</div>

  <ol type="a">
    <li>Utilisez les données du tableau pour produire une fonction de répartition cumulative. Vous devrez tracer la fonction de répartition, qui ressemble à une fonction en escalier à cinq marches.</li>
    <li>Vous observez maintenant trois réalisations de prix : 25, 18, 160. Utilisez la fonction de répartition cumulative de (a) pour créer trois réalisations d'une variable aléatoire uniformément distribuée entre 0 et 1 (appelons cette variable aléatoire $U$).</li>
    <li>Utilisez maintenant ces observations de $U$ pour créer trois observations d'une variable aléatoire $Z$ distribuée selon une loi normale de moyenne 0 et de variance 1. Assurez-vous que votre méthode de génération de ces variables aléatoires soit claire. [Indice : utilisez la fonction de répartition d'une variable aléatoire normale (0,1) tout comme vous avez utilisé la fonction de répartition créée à la partie (a) pour créer des variables aléatoires uniformes à la partie (b).]</li>
    <li>Supposons que vous ayez utilisé cette méthode pour créer une séquence de variables aléatoires normales (0,1) afin d'ajuster un modèle linéaire de la forme $Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$ où $\varepsilon_{t+1}$ est distribuée selon une loi normale de moyenne 0 et de variance 1 (nous le savons car nous simulons des variables aléatoires normales (0,1)). En partant de $t=1$ et de $Z_0 = 0.5$ et $Z_1 = -0.3$, générez $Z_2, Z_3, Z_4$ en supposant que $\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$. Ensuite, utilisez votre fonction de répartition cumulative de la partie (a) pour générer des observations de $P_2, P_3$ et $P_4$.</li>
  </ol>
</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *AssetSelling* disponible sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Notre politique de vente « high-low » de base était donnée par

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

En plus du module *AssetSelling*, vous devrez également télécharger la feuille de calcul « Chapter2_asset_selling_policy » depuis [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements), qui fournit les paramètres à utiliser par le module python.
  <ol type="a">
    <li>Simulez la politique sur 200 pas de temps en utilisant les paramètres :

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>Effectuez une recherche de la meilleure valeur de $\theta^{min}$ et $\theta^{max}$ en fixant $\theta^{max} = 13$, puis en cherchant par incréments de 1 la meilleure valeur de $\theta^{min}$. Fixez ensuite cette valeur de $\theta^{min}$ et effectuez une recherche similaire pour $\theta^{max}$ (en imposant la contrainte que $\theta^{max} = \theta^{min}+2$).</li>
  </ol>
</li>
<li>Considérez une politique qui tient compte du fait que le prix de l'actif pourrait être en hausse, ce qui signifie que des limites d'achat-vente statiques pourraient ne pas être efficaces. Supposons que nous prévoyions le prix pour le temps $t+1$ à l'aide du modèle de série temporelle ajusté

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

Nous allons utiliser $\pbar_t$ comme prévision de $p_{t+1}$ compte tenu de ce que nous savons au temps $t$.
  <ol type="a">
    <li>Quelle est la variable d'état pour ce problème ? Si les prix sont discrétisés au dixième près et sont supposés varier entre 0 et 100, quelle est la taille de l'espace d'état ?</li>
    <li>Supposons que nous introduisions la politique

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    Dans cette version de la politique, nous recherchons des écarts soudains par rapport au prix attendu. Tracez le graphique de la fonction objectif (contribution) en fonction de $\theta$. Commentez votre graphique. Notez que même si l'espace d'état est assez grand, il n'y a aucun changement dans la complexité de la recherche de la meilleure politique dans cette classe.

    (Indice : vous devrez modifier la variable d'état, modifier la politique high-low, et créer une boucle externe sur différentes valeurs de $\theta$ dans le module *DriverScript*. Vous êtes encouragé à expérimenter avec votre code et à choisir vos propres plages de valeurs. Indiquez combien de temps il vous a fallu pour exécuter votre code avec les valeurs choisies.)</li>
  </ol>
</li>
<li>(Suite de l'exercice 9) Imaginez que notre action suive un schéma saisonnier, ce qui suggère que nos signaux d'achat-vente devraient dépendre du temps. Cela signifie que nous devons remplacer $\theta$ par $\theta_t$. Discutez de la manière dont cela compliquerait notre processus de recherche de politique.</li>
<li>(Suite de l'exercice 9) Nous pourrions ensuite estimer que notre signal d'achat-vente devrait dépendre du prix. Par exemple, si les prix sont plus élevés, nous pourrions estimer qu'il faut rechercher un écart plus important par rapport à $\pbar_t$ dans l'équation $\eqref{eq:assetsellingpolicytimeseries}$ que si les prix étaient plus faibles. Cela signifie que nous remplacerions le vecteur constant $\theta$ par une fonction $\theta(\pbar_t)$.
  <ol type="a">
    <li>Décrivez une représentation par table de correspondance de $\theta(\pbar_t)$, et dessinez un graphique représentant l'allure que pourrait avoir cette fonction selon vous. Cela nécessiterait de discrétiser $\pbar_t$ en, disons, 10 plages. En quoi cela complique-t-il le problème de la recherche de politiques ?</li>
    <li>Proposez une forme paramétrique pour $\theta(\pbar_t)$ qui traduit votre intuition selon laquelle $\theta$ devrait être plus grand si $\pbar_t$ est plus grand ? Sur quels paramètres devez-vous maintenant effectuer une recherche ?</li>
  </ol>
</li>
</ol>
{% endraw %}