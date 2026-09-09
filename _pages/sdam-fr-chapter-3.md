---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "**Chapitre 3 : Planification adaptative de marché**"
permalink: /sdam/fr/chapter-3/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 8d040048b8e28e95
---

{% raw %}
## Vue d'ensemble du chapitre

Nous utilisons le terme « planification adaptative de marché » pour décrire ce qui est largement connu comme le problème du vendeur de journaux, où nous devons choisir une quantité de ressource à vendre (les « journaux ») pour répondre à une demande de marché inconnue, où les ressources non utilisées sont jetées à la fin de la période de vente. Cela signifie que les différentes périodes de temps ne sont pas physiquement connectées.

Nous commençons par utiliser ce problème pour illustrer un algorithme de gradient stochastique de base, connu pour converger vers la quantité optimale. Cette approche surmonte le problème selon lequel, si nous allouons une quantité trop faible, nous n'observons pas la demande réelle, mais seulement la quantité que nous parvenons à vendre (qui est limitée par le stock que nous avons mis à disposition).

Les algorithmes de gradient stochastique sont largement utilisés lors de l'optimisation sous incertitude, lorsque nous avons accès à un gradient. Les algorithmes de gradient stochastique ont été introduits pour la première fois en 1951 et bénéficient de propriétés de convergence bien comprises. En revanche, on connaît moins l'idée qu'un algorithme de gradient stochastique constitue lui-même un problème de décision séquentielle, où la « décision » est le pas (stepsize) utilisé dans l'algorithme.

La littérature classique sur les algorithmes de gradient stochastique se concentre sur la propriété selon laquelle, à la limite, ils produiront la solution optimale à un problème mono-période (c'est-à-dire qu'ils trouvent la quantité optimale à allouer). Ce qui est presque entièrement négligé est que, lorsque cela est réalisé dans un cadre de terrain, ce qui signifie que nous vivons les résultats au fur et à mesure qu'ils se produisent, nous devons utiliser comme objectif la tâche consistant à maximiser la *récompense cumulée*, qui est la somme des récompenses au fil du temps.

Dans les extensions, nous introduisons également une variante négligée dans la littérature. En pratique, non seulement nous ne connaissons pas la demande, mais nous ne connaissons même pas la distribution de la demande. À chaque période de temps, nous observons combien nous vendons (ce qui est limité par la quantité de ressource que nous mettons à disposition), et nous apprenons de cette expérience pour mettre à jour notre croyance sur la distribution avant de décider combien allouer à la période suivante. Cela introduit un état de croyance qui relie les périodes de temps entre elles, tout comme cela se produirait si nous conservions le stock restant pour la période suivante. C'est une autre perspective absente des traitements classiques du problème du vendeur de journaux.

Ces enjeux offrent une richesse considérable à ce qui reste un problème de décision séquentielle relativement simple et élégant.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Maximiser le revenu attendu tiré de la satisfaction de la demande, moins le coût d'achat du produit, sur un horizon de planification.
- **Décisions :** Quelle quantité de produit acheter à chaque période de temps.
- **Incertitudes :** La demande pour le produit à chaque période de temps.

## Récit

Il existe une vaste classe de problèmes qui consistent à allouer une ressource pour répondre à une demande incertaine (et parfois inobservable). Voici quelques exemples :

- Stocker un inventaire périssable (par exemple, du poisson frais) pour répondre à une demande où le stock restant ne peut pas être conservé pour l'avenir.
- Stocker des pièces pour la fabrication de haute technologie (par exemple, des moteurs à réaction) où nous devons commander des pièces pour répondre à une demande connue, mais où les pièces peuvent ne pas répondre aux spécifications requises et doivent être écartées. Ainsi, nous pouvons avoir besoin de commander huit pièces pour répondre à une demande de cinq, car plusieurs pièces peuvent ne pas respecter les spécifications techniques requises.
- Nous devons allouer du temps pour accomplir une tâche (comme se rendre au travail en voiture, ou allouer du temps pour réaliser un projet).
- Nous devons allouer des budgets annuels pour des activités telles que le marketing. Les fonds non utilisés sont restitués à l'entreprise.

Le problème le plus simple consiste à prendre ces décisions pour répondre à une demande incertaine avec une distribution connue, mais les applications les plus courantes impliquent des distributions inconnues qui doivent être apprises. Il peut y avoir d'autres informations, comme la disponibilité de prévisions de la demande, ainsi que des informations dynamiques telles que le prix de marché du poisson frais (qui peut être connu ou inconnu avant que la décision de ressource ne soit prise).

Ce problème a été largement étudié depuis les années 1950, initialement connu sous le nom de « problème d'inventaire mono-période », mais actuellement identifié principalement comme le « problème du vendeur de journaux ». Il est largement utilisé comme le problème canonique en optimisation sous incertitude.

Le problème du vendeur de journaux est généralement formulé comme suit

$$
\begin{align}
\max_x \E F(x,W) = \E \big(p\min\{x,W\} - cx\big), \label{eq:newsvendorasymptotic}
\end{align}
$$

où $x$ est notre variable de décision qui déterminele la quantité de ressource pour répondre à la demande, et où $W$ est la demande incertaine pour la ressource. Nous supposons que nous « achetons » notre ressource à un coût unitaire de $c$, et que nous vendons le plus petit de $x$ et $W$ à un prix $p$ (que nous supposons supérieur à $c$). La fonction objectif donnée dans l'équation $\eqref{eq:newsvendorasymptotic}$ est appelée la forme *asymptotique* du problème du vendeur de journaux.

Il existe deux variantes importantes du problème du vendeur de journaux :

- La distribution de la variable aléatoire $W$ est connue.
- La distribution de $W$ est inconnue.

Le cas inconnu est celui qui se présente le plus souvent en pratique, ce qui introduit la dimension selon laquelle chaque fois que nous exécutons une itération en choisissant $x$ puis en observant le plus petit de $x$ et $W$, nous apprenons quelque chose sur la distribution de $W$.

Si $W$ était déterministe (et si $p > c$), alors la solution est facilement vérifiée comme étant $x = W$. Imaginons maintenant que $W$ est une variable aléatoire avec une distribution de probabilité $f^W(w)$ ($W$ peut être discrète ou continue). Soit $F^W(w) = Prob[W \leq w]$ la distribution cumulative de $W$. Si $W$ est continue, et si nous pouvions calculer $F(x) = \E F(x,W)$, alors la solution optimale $x^\ast $ satisferait

$$
\left.\frac{d F(x)}{dx}\right\vert _{x=x^\ast } = 0.
$$

Considérons maintenant ce que l'on appelle le *gradient stochastique*, où nous prenons la dérivée de $F(x,W)$ en supposant que nous connaissons $W$, qui est donnée par

$$
\begin{align}
\frac{d F(x,W)}{dx} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases} \label{eq:newsvendorstochasticgradient}
\end{align}
$$

Ceci est un gradient (c'est-à-dire une dérivée) de $F(x,W)$ compte tenu de la variable aléatoire $W$, qui est « stochastique » car elle dépend de la variable aléatoire $W$ qui n'est révélée qu'après avoir choisi $x$. C'est la raison pour laquelle $d F(x,W)/dx$ dans l'équation $\eqref{eq:newsvendorstochasticgradient}$ est appelé un « gradient stochastique ».

En prenant l'espérance des deux côtés de $\eqref{eq:newsvendorstochasticgradient}$, on obtient

$$
\begin{align*}
\E \frac{d F(x,W)}{dx} &= (p-c) Prob[x \leq W] - c Prob[x > W] \\
&= (p-c) (1-F^W(x)) - c F^W(x) \\
&= (p-c) - pF^W(x) \\
&= 0 \quad \text{for } x = x^\ast .
\end{align*}
$$

Nous pouvons maintenant résoudre pour $F^W(x^\ast )$, ce qui donne

$$
F^W(x^\ast ) = \frac{p-c}{p}.
$$

Ainsi, lorsque $c$ diminue vers 0, nous voulons commander une quantité $x^\ast $ qui satisfera la demande avec une probabilité de 1. Lorsque $c$ se rapproche de $p$, alors la quantité de commande optimale satisfera la demande avec une probabilité qui se rapproche de 0.

Cela signifie que nous calculons $(p-c)/p$, qui est un nombre entre 0 et 1, puis nous trouvons la quantité $x^\ast $ qui correspond à la quantité de commande où la probabilité que la demande aléatoire soit inférieure à $x^\ast $ est égale à $(p-c)/p$.

Nous venons de voir deux situations où nous pouvons trouver la quantité de commande exactement : lorsque nous connaissons $W$ à l'avance (on pourrait appeler cela la prévision parfaite) ou lorsque nous connaissons la distribution de $W$. Ce résultat est connu depuis les années 1950, suscitant un certain nombre d'articles visant à estimer la distribution de $W$ à partir de données observées, traitant la situation où nous ne pouvons pas observer $W$ directement lorsque $x < W$ (c'est-à-dire que nous observons seulement les ventes, plutôt que la demande, une situation connue sous le nom de « demandes censurées »).

Nous allons nous attaquer au problème où la distribution de la demande est inconnue. Notre approche consistera à utiliser un algorithme de recherche séquentielle donné par

$$
\begin{align}
x^{n+1} = \max\left\{0,x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n} \right\},  \label{eq:stochasticgradientalgorithm}
\end{align}
$$

où $\alpha_n$ est connu comme un *pas* (stepsize). Notre défi sera de choisir $\alpha_n$ à chaque itération.

## Modèle de base

### Variables d'état

La variable d'état capture l'information dont nous disposons au temps $n$ et dont nous avons besoin, en plus de la politique et de l'information exogène, pour calculer l'état au temps $n+1$. Pour notre procédure de recherche dans l'équation $\eqref{eq:stochasticgradientalgorithm}$, notre variable d'état est donnée par

$$
S^n = (x^n).
$$

### Variables de décision

La difficulté avec ce problème réside dans l'identification de la variable de décision. Il est tentant de penser que $x^n$ est la décision, mais dans le contexte de cet algorithme, la véritable décision est le pas $\alpha_n$. Comme pour tous nos problèmes de décision séquentielle, la décision (c'est-à-dire le pas) est déterminée par ce que l'on appelle généralement une règle de pas, mais que l'on appelle parfois une politique de pas, que nous désignons par $\alpha^\pi(S^n)$.

Normalement, nous introduisons les politiques plus tard, mais pour faciliter la compréhension du modèle, nous allons commencer par une politique de pas de base appelée *règle de pas harmonique*, donnée par

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

C'est une règle de pas déterministe simple, ce qui signifie que nous connaissons à l'avance le pas $\alpha_n$ dès que nous connaissons $n$. Ci-dessous, nous introduisons une politique de pas stochastique plus intéressante qui nécessite une variable d'état plus riche.

Nous allons également laisser $X^\pi(S^n)$ être la valeur de $x^n$ déterminée par la politique de pas $\alpha^\pi(S^n)$.

### Information exogène

L'information exogène est la demande aléatoire $W^{n+1}$ pour la ressource (produit, temps ou argent) que nous essayons de satisfaire avec notre offre de produit $x^n$. Nous pouvons supposer que nous observons $W^{n+1}$ directement, ou nous pouvons simplement observer si $x^n \leq W^{n+1}$, ou $x^n > W^{n+1}$.

### Fonction de transition

L'équation de transition, pour le cadre où $x$ est non contraint, est donnée par

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n}.  \label{eq:stochasticgradientaltransition1}
\end{align}
$$

Nous notons qu'il est possible que l'équation $\eqref{eq:stochasticgradientaltransition1}$ produise une valeur $x^{n+1} < 0$, qui ne peut pas être mise en œuvre. La correction ici est simple : il suffit de fixer $x^{n+1} = 0$.

### Fonction objectif

À chaque itération, nous recevons un bénéfice net donné par

$$
F(x^n,W^{n+1}) = p\min\{x^n,W^{n+1}\} - cx^n.
$$

Nous devons maintenant construire une fonction objectif pour trouver la meilleure politique. Nous pouvons aborder ce cadre du problème de deux manières. Dans la première, nous supposons que nous devons apprendre sur le terrain, tandis que la seconde suppose que nous avons accès à un simulateur pour apprendre la politique.

**Optimiser sur le terrain**

Si nous vivons nos décisions sur le terrain, nous voulons maximiser la *récompense cumulée* sur un certain horizon. Cela signifie que nous devons trouver la meilleure politique (ce qui, dans ce cadre, signifie la meilleure règle de pas) en résolvant

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} F(X^\pi(S^n\vert \theta),W^{n+1})\vert S^0\right\}. \label{eq:newsvendorobjectivecumulativereward}
\end{align}
$$

où $S^{n+1} = S^M(S^n,X^\pi(S^n),W^{n+1})$ décrit l'évolution de l'algorithme (par exemple, la fonction de transition donnée par l'équation $\eqref{eq:stochasticgradientaltransition1}$). Ici, $\pi$ fait référence au type de règle de pas (nous en considérons plusieurs ci-dessous), ainsi qu'à tout paramètre ajustable (tel que $\theta^{step}$).

Curieusement, l'histoire derrière le problème du vendeur de journaux implique toujours un apprentissage sur le terrain, et pourtant la récompense cumulée dans l'équation $\eqref{eq:newsvendorobjectivecumulativereward}$ n'est jamais utilisée comme fonction objectif. Nous mentionnons cela pour les lecteurs qui effectuent une recherche documentaire sur le « problème du vendeur de journaux ».

**Optimiser à l'aide d'un simulateur**

Alternativement, nous pourrions utiliser un simulateur où nous allons exécuter notre recherche pendant $N$ itérations, se terminant par $x^N$. Nous allons renommer cette solution finale $x^{\pi,N}$ pour exprimer la dépendance à la politique de pas $\alpha^\pi(S^n)$.

Notre solution finale $x^{\pi,N}$ est une variable aléatoire puisqu'elle dépend de la séquence $W^1, \ldots, W^n$. Comme précédemment, nous allons laisser $\omega$ représenter une réalisation d'échantillon de $W^1(\omega), \ldots, W^n(\omega)$, et nous écrivons notre solution comme $x^{\pi,N}(\omega)$ pour indiquer qu'il s'agit de la solution que nous avons obtenue lorsque nous avons utilisé le chemin d'échantillon $\omega$.

Puisque nous utilisons un simulateur, nous ne nous intéressons qu'à la performance de la solution finale (également appelée *récompense finale*), que nous écrivons comme

$$
\begin{align}
F(x^{\pi,N},\What) = p\min\{x^{\pi,N},\What\} - cx^{\pi,N}, \label{eq:newsvendorxpiNobjective}
\end{align}
$$

où $\What$ est une variable aléatoire que nous utilisons pour tester la performance de $x^{\pi,N}$.

Cela signifie que nous avons deux variables aléatoires dans notre fonction objectif donnée dans $\eqref{eq:newsvendorxpiNobjective}$. Pour un seul ensemble de réalisations de $W^1(\omega), \ldots, W^n(\omega)$, nous obtenons une solution $x^{\pi,N}(\omega)$. Maintenant, laissons $\psi$ être une réalisation d'échantillon de $\What$. Ainsi, si nous avons une réalisation d'échantillon de la solution $x^{\pi,N}(\omega)$, et une réalisation d'échantillon de notre variable de test $\What(\psi)$, notre performance serait

$$
\begin{align}
F(x^{\pi,N}(\omega),\What(\psi)) = p\min\{x^{\pi,N}(\omega),\What(\psi)\} - cx^{\pi,N}(\omega). \label{eq:newsvendorxpiNobjectivesample}
\end{align}
$$

Ce que nous voulons vraiment faire, c'est calculer des moyennes sur les réalisations possibles à la fois de $x^{\pi,N}(\omega)$ et de $\What(\psi)$, ce que nous pouvons écrire en utilisant

$$
\begin{align}
\Fbar^\pi  = \frac{1}{N} \frac{1}{M} \sum_{\omega=1}^N \sum_{\psi=1}^M \left(p\min\{x^{\pi,N}(\omega^n),\What(\psi^m)\} - cx^{\pi,N}(\omega^n)\right). \label{eq:newsvendorxpiNobjectivesampleaverage}
\end{align}
$$

L'estimation $\Fbar^\pi$ représente une moyenne sur $N$ échantillons de la séquence $W^1(\omega), \ldots, W^n(\omega)$, et $M$ échantillons de la variable de test $\What(\psi)$.

## Modélisation de l'incertitude

Soit $f^W(w)$ la distribution de $W$ (celle-ci peut être discrète ou continue), avec une fonction de distribution cumulative $F^W(w) = Prob[W \leq w]$. Nous pourrions supposer que la distribution est connue avec un paramètre inconnu. Par exemple, imaginons que $W$ suit une distribution de Poisson avec une moyenne $\mu$ donnée par

$$
f^W(w) = \frac{\mu^w e^{-\mu}}{w!}, \quad w=0, 1, 2, \ldots.
$$

Nous pouvons supposer que nous connaissons $\mu$, dans ce cas nous pourrions résoudre ce problème en utilisant la solution analytique donnée au début du chapitre. Supposons, au contraire, que $\mu$ soit inconnu, mais avec une distribution connue $p^\mu_k = Prob[\mu=\mu_k]$. Notez que cette distribution $p^\mu = (p^\mu_k)\_{k=1}^K$ serait modélisée dans notre état initial $S^0$.

## Concevoir des politiques

Nous avons déjà introduit deux choix de politiques de taille de pas que nous notons $\alpha^\pi(S^n)$ pour reprendre notre style utilisé ailleurs pour écrire les politiques.

Un large éventail de politiques de taille de pas (souvent appelées règles de taille de pas) a été proposé dans la littérature. Une des plus simples et des plus populaires est la politique de taille de pas harmonique donnée par

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

La Figure 3.1 illustre le comportement de la règle de taille de pas harmonique pour différentes valeurs de $\theta^{step}$.

<figure class="book-figure">
  <img src="/assets/images/sdam/harmonicstepsizes.png" alt="Harmonic stepsizes for different values of theta-step." style="max-width: 420px;">
  <figcaption><span class="fig-num">Figure 3.1.</span> Tailles de pas harmoniques pour différentes valeurs de $\theta^{step}$.</figcaption>
</figure>

La politique de taille de pas harmonique est également connue comme une politique déterministe, car nous connaissons sa valeur pour un $n$ donné à l'avance. Le défi avec les politiques déterministes est qu'elles ne peuvent pas s'adapter aux données. C'est pourquoi il est souvent utile d'utiliser une règle stochastique. Un des exemples les plus anciens et les plus simples est la règle de Kesten

$$
\alpha^{kesten}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+K^n-1},
$$

où $K^n$ est un compteur qui compte le nombre de fois où le gradient a changé de direction. Nous déterminons cela en demandant si le produit (ou produit scalaire, si $x$ est un vecteur) $(\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0$. Si le gradient change de direction, cela signifie que nous sommes au voisinage de l'optimum et que nous le dépassons en avançant, donc nous devons réduire la taille de pas. Cette formule s'écrit

$$
\begin{align}
K^{n+1} = \begin{cases} K^n + 1 & \text{if } (\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0, \\ K^n & \text{otherwise,} \end{cases} \label{eq:kestenupdate}
\end{align}
$$

où $\nabla_x F(x^n,W^{n+1}) = \frac{d F(x,W^{n+1})}{dx}$.

Nous avons maintenant une taille de pas qui dépend d'une variable aléatoire $K^n$, c'est pourquoi nous l'appelons une règle de taille de pas stochastique. Si nous utilisons la règle de Kesten, nous devons modifier notre variable d'état pour inclure $K^n$, ce qui nous donne

$$
S^n = (x^n,K^n).
$$

Nous devons également ajouter l'équation $\eqref{eq:kestenupdate}$ à notre fonction de transition.

Une autre règle de taille de pas, connue sous le nom d'AdaGrad, est particulièrement bien adaptée lorsque $x$ est un vecteur dont l'élément est $x_i,~i=1, \ldots, I$. Pour simplifier un peu la notation, notons le gradient stochastique par rapport à l'élément $x_i$ par

$$
g^n_{i} = \nabla_{x_i} F(x^{n-1}, W^n).
$$

Créons maintenant une matrice diagonale $I \times I$ $G^n$ où le $(i,i)$ème élément $G^n_{ii}$ est donné par

$$
G^n_{ii}  = \sum_{m=1}^n (g^n_{i})^2.
$$

Nous fixons ensuite une taille de pas pour la $i$ème dimension en utilisant

$$
\begin{align}
\alpha_{ni} = \frac{\theta}{(G^n_{ii})^2 + \epsilon}, \label{eq:adagrad}
\end{align}
$$

où $\theta$ est un paramètre ajustable (comparable à $\theta^{step}$ dans notre formule de taille de pas harmonique) et $\epsilon$ est un petit nombre (par exemple $10^{-8}$ pour éviter la possibilité d'une division par zéro).

La Figure 3.2 illustre différentes vitesses de convergence pour différentes règles de taille de pas, montrant $F(x^n,W^{n+1})$ en fonction du nombre d'itérations. Si nous optimisions la récompense finale dans $\eqref{eq:newsvendorxpiNobjectivesampleaverage}$, nous pourrions simplement choisir la courbe la plus haute, ce qui dépend du budget $N$. Si nous optimisons la récompense cumulée dans l'équation $\eqref{eq:newsvendorobjectivecumulativereward}$, alors nous devons nous concentrer sur l'aire sous la courbe, ce qui favorise une convergence initiale rapide.

<figure class="book-figure">
  <img src="/assets/images/sdam/newsvendorconvergence.png" alt="Plot of F(x^n, W^n+1) for different stepsize rules, illustrating different rates of convergence." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 3.2.</span> Tracé de $F(x^n,W^{n+1})$ pour différentes règles de taille de pas, illustrant différentes vitesses de convergence.</figcaption>
</figure>

## Extensions

**1)** Imaginons que nous ne connaissions pas $\mu$, mais supposons que $\mu$ puisse prendre l'une des valeurs $(\mu_1, \mu_2, \ldots, \mu_K)$. Soit $H^n$ l'historique des observations jusqu'à la $n$ème expérience, et soit $H^0$ l'historique initial vide. Nous supposons que nous commençons avec une probabilité a priori initiale sur $\mu$ que nous notons

$$
p^0_k = Prob[\mu = \mu_k\vert H^0].
$$

Après avoir observé $W^1, \ldots, W^n$, nous écririons notre distribution mise à jour comme

$$
p^n_k = Prob[\mu = \mu_k\vert H^n].
$$

Nous pouvons mettre à jour $p^n = (p^n_k)\_{k=1}^K$ en utilisant le théorème de Bayes

$$
\begin{align}
p^{n+1}_k &= Prob[\mu=\mu_k\vert W^{n+1}=w,H^n] \\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k,H^n]Prob[\mu=\mu_k\vert H^n]}{Prob[W^{n+1}=w\vert H^n]}\\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k}{Prob[W^{n+1}=w\vert H^n]},
\end{align}
$$

où

$$
Prob[W^{n+1}=w\vert H^n] = \sum_{k=1}^K Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k.
$$

Avec cette extension du modèle de base, nous avons deux distributions de probabilité : la croyance sur la moyenne vraie $\mu$, et la demande aléatoire $W$ étant donné $\mu$. Pour inclure cette extension, nous devrions insérer $p^n$ dans notre variable d'état, nous écririons donc

$$
S^n = (x^n, p^n).
$$

**2)** Imaginons que notre problème consiste à acheter une matière première (comme le pétrole ou le gaz naturel) au mois $n$ pour être utilisée durant le mois $n+1$. Nous achetons la matière première à un coût unitaire $c$, et la vendons jusqu'à une demande inconnue $D^{n+1}$ à un prix inconnu $p^{n+1}$. Nous écririons notre objectif pour ce problème comme

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^{n+1} \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension1}
\end{align}
$$

## Qu'avons-nous appris ?

- Nous avons utilisé le contexte d'un problème de vendeur de journaux pour illustrer un algorithme de gradient stochastique en tant que problème de décision séquentielle. Nous avons montré comment modéliser un algorithme de gradient stochastique en utilisant les cinq éléments d'un problème de décision séquentielle introduits au [Chapitre 1](/sdam/fr/chapter-1/).
- Nous avons introduit plusieurs exemples de politiques PFA pour choisir les tailles de pas.
- Le problème du vendeur de journaux est classiquement énoncé comme un problème statique où nous recherchons la meilleure solution en ne nous intéressant qu'à la performance de notre choix final de $x$. Dans ce chapitre, nous avons introduit deux objectifs : la *récompense cumulée* pour l'apprentissage en ligne (optimisation) sur le terrain, et la *récompense finale* si nous utilisions un simulateur pour concevoir la meilleure politique d'apprentissage.
- Nous introduisons l'idée d'utiliser une distribution de probabilité (dans ce cas une distribution de Poisson) pour les demandes aléatoires de produit, où la moyenne de la distribution de Poisson est elle-même une variable aléatoire.
- Nous introduisons l'extension consistant à apprendre de manière adaptative la distribution de probabilité pour la moyenne de la distribution de Poisson.
- Nous introduisons également la question de faire dépendre la décision $x_t$ d'autres variables d'état telles que le prix $p_t$. Cela équivaut à créer une politique $X^\pi(S_t)$ où l'état $S_t$ dépend (dans ce contexte) du prix $p_t$. Il s'agit d'un changement majeur dans la façon de penser le problème du vendeur de journaux, mais qui reste dans la même classe que tous nos problèmes de décision séquentielle.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quelle est la variable de décision pour notre algorithme de recherche séquentielle ?</li>
<li>Donnez des exemples de recherche sur des classes de politiques (donnez deux exemples) et les paramètres ajustables pour chaque classe de politique.</li>
<li>Expliquez ce que l'on entend par un objectif de <em>récompense cumulée</em> et un objectif de <em>récompense finale</em>.</li>
<li>Lors de la recherche sur le paramètre ajustable $\theta^{step}$ pour la règle de taille de pas harmonique, comment pensez-vous que la valeur optimale de $\theta^{step}$ obtenue en utilisant une récompense cumulée se comparerait à la valeur optimale obtenue en utilisant une récompense finale ?</li>
<li>En supposant que nous ne connaissons pas la distribution de la demande $W$, expliquez pourquoi il n'est pas judicieux de trouver le $x^\ast $ optimal dans un simulateur. Étant donné cela, il est plus judicieux d'utiliser le simulateur pour optimiser la politique d'apprentissage. Si nous utilisons un simulateur pour optimiser la politique d'apprentissage, quelle fonction objectif serait appropriée pour cet exercice d'apprentissage ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Une grande entreprise de gaz industriels doit acheter des contrats d'électricité un mois à l'avance en utilisant un contrat de type « take or pay ». Si l'entreprise s'engage à acheter $x_t$ mégawattheures pour le mois $t+1$, elle paie un prix $p_t$ que la puissance soit nécessaire ou non. Mais si la charge (demande) $L_{t+1}$ au mois $t+1$ dépasse $x_t$, alors l'entreprise doit acheter de l'électricité sur le réseau à un prix spot $p^{spot}_{t+1}$. Le coût pour satisfaire la charge au mois $t+1$ est alors

$$
C(S_t,W_{t+1}) = p_t x_t + p^{spot}_{t+1} \max\{0, L_{t+1}-x_t\}.
$$

Nous sommes en mesure d'observer les différents prix et charges, mais nous ne connaissons pas leur distribution de probabilité. Notre objectif est de minimiser les coûts sur une année.

Supposons que $x_t$ soit discret avec des valeurs $x_1, \ldots, x_M$. Soit $(\mubar_{tx}, \beta_{tx})$ la moyenne et la précision de notre estimation de $\E C(S_t,W_{t+1})$ et supposons que nous utilisons une politique appelée *estimation par intervalle*, $X^{IE}(S_t\vert \theta)$, pour choisir $x_t$ :

$$
X^{IE}(S_t\vert \theta^{IE}) = \argmin_x \left(\mubar_{tx} - \theta^{IE} \sqrt{\frac{1}{\beta_{tx}}}\right).
$$

  <ol type="a">
    <li>Donnez la variable d'état $S_t$ et l'information exogène $W_{t+1}$.</li>
    <li>Écrivez la fonction objectif pour trouver $\theta^{IE}$ afin de minimiser les coûts cumulés sur une année. Montrez l'espérance sur chaque variable aléatoire en écrivant la variable aléatoire en indice de l'opérateur d'espérance (comme dans $\E_Y$). Montrez ensuite comment écrire l'espérance sous forme de simulation en supposant que vous disposez de $K$ échantillons de chaque variable aléatoire.</li>
    <li>Donnez la formule pour trouver le gradient de la fonction objectif en (b) en utilisant une dérivée numérique, et écrivez un algorithme de gradient stochastique pour trouver une bonne valeur de $\theta$ en $N$ itérations.</li>
    <li>Supposons maintenant que les prix évoluent selon $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2}$. Quelle est la variable d'état maintenant, et comment l'ajout de dimensions à la variable d'état complique-t-il le problème de recherche du $\eta$ optimal ci-dessus ?</li>
  </ol>
</li>
<li>Considérez l'extension 2 ci-dessus, où le prix $p$ change désormais avec les itérations, et où le prix que nous recevons au temps $n$ n'est pas connu au temps $n$, nous le désignons donc par $p^{n+1}$. Pour l'instant, supposons que $p^{n+1}$ est indépendant de $p^n$, et que $D^{n+1}$ est indépendant de $D^n$.
  <ol type="a">
    <li>Pour le modèle de l'équation $\eqref{eq:newsvendorextension1}$, donnez la variable d'état $S^n$ et la variable d'information exogène $W^n$.</li>
    <li>Donnez l'algorithme de gradient stochastique pour ce problème, et montrez qu'il est essentiellement le même que celui obtenu lorsque le prix était constant.</li>
  </ol>
</li>
<li>Étendez l'exercice 7, mais supposons maintenant que les prix évoluent selon

$$
p^{n+1} = \eta_0 p^n + \eta_1 p^{n-1} + \eta_2 p^{n-2} + \varepsilon^{n+1}
$$

où $\varepsilon^{n+1}$ est un terme de bruit de moyenne 0 indépendant du processus de prix.
  <ol type="a">
    <li>Pour le modèle de l'équation $\eqref{eq:newsvendorextension1}$, donnez la variable d'état $S^n$ et la variable d'information exogène $W^n$.</li>
    <li>Donnez l'algorithme de gradient stochastique pour ce problème.</li>
  </ol>
</li>
<li>Supposons maintenant que notre objectif est d'optimiser

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^n \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension2}
\end{align}
$$

La seule différence entre les équations $\eqref{eq:newsvendorextension2}$ et $\eqref{eq:newsvendorextension1}$ est que maintenant nous voyons le prix $p^n$ *avant* de choisir notre décision $x^n$. Nous le savons par la façon dont le prix est indexé.
  <ol type="a">
    <li>Pour le modèle de l'équation $\eqref{eq:newsvendorextension2}$, donnez la variable d'état $S^n$ et la variable d'information exogène $W^n$.</li>
    <li>Donnez l'algorithme de gradient stochastique pour ce problème. Contrairement au problème précédent, ce gradient sera une fonction de $p^n$.</li>
  </ol>

La situation où le gradient dépend du prix $p^n$ constitue une complication assez importante. Ce qui se passe ici est qu'au lieu de chercher à trouver une solution optimale $x^\ast $ (ou plus précisément, $x^{\pi,N}$), nous essayons de trouver une fonction $x^{\pi,N}(p)$.

L'astuce ici consiste à choisir une forme fonctionnelle pour $x^{\pi,N}(p)$. Nous suggérons deux alternatives :

**Table de correspondance (lookup table)** – Même si $p$ est continu, nous pouvons le discrétiser en une série de prix discrets $p_1, \ldots, p_K$, où nous choisissons la valeur $p_k$ la plus proche d'un prix $p^n$. Appelons ce prix $p^n_k$. Pensons maintenant à un algorithme de gradient stochastique indexé par la valeur de $p_k$ la plus proche de $p^n$. Nous utilisons ensuite le gradient stochastique pour mettre à jour $x^n(p^n_k)$ en utilisant

$$
x^{n+1}(p^n_k) = x^n(p^n_k) + \alpha_n \nabla_x F^n(x^n,W^{n+1}).
$$

Bien entendu, nous ne voulons pas discrétiser $p$ trop finement. Si nous discrétisons les prix en, disons, 100 plages, cela signifie que nous essayons de trouver 100 quantités commandées $x^{\pi,N}(p)$, ce qui serait assez difficile.

**Modèle paramétrique** – Imaginons maintenant que nous pensons pouvoir représenter la quantité commandée $x^{\pi,N}(p)$ comme une fonction paramétrique

$$
\begin{align}
x^{\pi,N}(p\vert \theta) = \theta_0 + \theta_1 p + \theta_2 p^{\theta_3}. \label{eq:parametricorderquantity}
\end{align}
$$

Lorsque nous utilisons une fonction paramétrique telle que celle-ci, nous n'essayons plus de trouver la quantité commandée $x^{\pi,N}$ ; nous essayons plutôt de trouver $\theta$ qui déterminent la fonction (dans ce cas, $\eqref{eq:parametricorderquantity}$). Notre algorithme de gradient stochastique devient alors

$$
\begin{align*}
\theta^{n+1} &= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d \theta} \\
&= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta},
\end{align*}
$$

Rappelez-vous que $\theta^n$ est un vecteur colonne à quatre éléments, tandis que $x^n$ est un scalaire. La première dérivée est notre gradient stochastique d'origine

$$
\frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases}
$$

La seconde dérivée est calculée directement à partir de la politique $\eqref{eq:parametricorderquantity}$, qui est donnée par

$$
\frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta} = \begin{pmatrix} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_0} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_1} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_2} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_3} \end{pmatrix} = \begin{pmatrix} 1 \\ p^n \\ (p^n)^{\theta_3} \\ \theta_2(p^n)^{\theta_3} \ln{p^n} \end{pmatrix}.
$$

L'utilisation du modèle paramétrique peut être très efficace si la forme paramétrique correspond à la forme véritable de la fonction $x^{\pi,N}(p)$. La représentation par table de correspondance est plus générale, ce qui peut être un avantage, mais si la discrétisation est trop fine, elle nécessitera un nombre beaucoup plus important d'itérations pour résoudre le problème.

Avec ces stratégies à l'esprit, considérez les trois extensions suivantes :</li>
<li>Revenez à la fonction objectif de l'équation $\eqref{eq:newsvendorextension1}$ où le prix n'est révélé qu'après que nous avons pris la décision de commande, mais maintenant $p^{n+1}$ dépend de l'historique, comme dans

$$
p^{n+1} = p^n + \varepsilon^{n+1}.
$$

Discutez de la façon dont vous pourriez aborder ce problème, compte tenu de ce que nous avons présenté ci-dessus.</li>
<li>Reprenez l'exercice 10, mais supposez maintenant que

$$
p^{n+1} = 0.5 p^n + 0.5 p^{n-1} + \varepsilon^{n+1}.
$$</li>
<li>Reprenez l'exercice 10, mais maintenant la quantité $x^n$ est choisie sous la contrainte $0 \leq x \leq R^n$ où

$$
R^{n+1} = \max\{0, R^n + x^n - W^{n+1}\},
$$

et où le prix $p=p^n$ est révélé avant que nous prenions une décision. Avec cette transition, notre problème devient un problème d'inventaire traditionnel.</li>
<li>Un compte de dépenses flexible (FSA) est un dispositif comptable qui permet aux personnes de mettre de côté de l'argent avant impôt afin de couvrir des frais médicaux. Vous devez allouer le montant que vous souhaitez avoir disponible pour l'année $t+1$ à la fin de l'année $t$. Le défi est que si vous placez trop d'argent sur le compte, vous perdez ce qui reste.

Soit $M_{t+1}$ vos frais médicaux pour l'année $t+1$, et soit $x_t$ le montant que vous allouez à la fin de l'année $t$ pour dépenser pendant l'année $t+1$. Soit $r$ votre taux marginal d'imposition où $0 < r < 1$. Vos dépenses totales pour l'année $t+1$ sont données par

$$
C(x_t,M_{t+1}) = x_t + \frac{1}{1-r}\max\{0,M_{t+1} - x_t\}.
$$

Vous souhaitez utiliser un algorithme de gradient stochastique de la forme

$$
x_{t+1} = x_t + \alpha_t \gbar_{t+1},
$$

où

$$
\gbar_{t+1} = (1-\eta)\gbar_t + \eta \frac{dC(x_t,M_{t+1})}{dx_t}
$$

et où $0 < \eta < 1$ est un facteur de lissage. Pour le pas, utilisez

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + K_t -1},
$$

où $K_t$ compte le nombre de fois où la dérivée de la fonction de coût a changé de signe. C'est-à-dire

$$
K_{t+1} = \begin{cases} K_t +1 & \text{if } \frac{dC(x_t,M_{t+1})}{dx_t} \frac{dC(x_{t-1},M_t)}{dx_{t-1}} < 0. \\ K_t & \text{otherwise.} \end{cases}
$$

Votre défi consiste à déterminer le paramètre de pas $\theta^{step}$ et le paramètre de lissage $\eta$ en formulant ce problème comme un problème de décision séquentielle. Supposez que vous disposez d'un simulateur pour évaluer la performance de la règle de pas.

Nous allons commencer par trouver la solution optimale en supposant que nous connaissons la distribution de $M_{t+1}$ :
  <ol type="a">
    <li>Qu'est-ce que $\frac{dC(x_t,M_{t+1})}{dx_t}$ ? Rappelez-vous que ceci est calculé après que $M_{t+1}$ devient connu.</li>
    <li>Trouvez la solution statique optimale en posant la dérivée (de la partie (a)) égale à zéro, puis en résolvant pour $x^\ast $. Supposez que la fonction de répartition $F^M(m) = Prob(M_{t+1} \leq m)$ est connue.</li>
  </ol>

Nous allons maintenant modéliser le problème d'apprentissage séquentiel où nous ne supposerons pas que la distribution de $M_{t+1}$ est connue :
  <ol type="a" start="3">
    <li>Quelle est la variable d'état pour ce système dynamique ?</li>
    <li>Quelle(s) est(sont) la (les) variable(s) de décision ?</li>
    <li>Qu'est-ce que l'information exogène ?</li>
    <li>Qu'est-ce que la fonction de transition ? Rappelez-vous que vous avez besoin d'une équation pour chaque élément de la variable d'état.</li>
    <li>Qu'est-ce que la fonction objectif ? Sur quoi optimisez-vous ?</li>
  </ol>
</li>
<li>Nous allons supposer que le prix auquel nous vendons notre gaz change d'un mois à l'autre. La fonction de profit mensuel serait donnée par

$$
F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t,
$$

où $D_{t+1}$ est la demande d'électricité (en mégawattheures) pour le mois $t + 1$.

Supposez pour simplifier que le processus de prix évolue comme suit :

$$
p_{t+1} = \begin{cases} p_t - 1 & \text{with probability 0.2,} \\ p_t & \text{with probability 0.6,} \\ p_t + 1 & \text{with probability 0.1.} \end{cases}
$$

  <ol type="a">
    <li>Réécrivez les cinq éléments du modèle que vous avez initialement fournis dans l'exercice 15, partie (a). Notez qu'au lieu de rechercher $x_t$, vous recherchez maintenant $x_t(p_t)$. Cela signifie qu'au lieu de rechercher un scalaire, nous recherchons maintenant une fonction.</li>
    <li>Nous allons commencer par représenter $x_t(p_t)$ comme une fonction en table de correspondance, ce qui signifie que nous allons discrétiser $p_t$ en un ensemble de prix discrets $(0, 1, 2, \ldots, 50)$. Sans faire de programmation, décrivez les étapes de la méthode que vous utiliseriez pour estimer la fonction $x_t(p_t)$ (votre description doit être suffisamment précise pour que quelqu'un puisse écrire du code à partir de celle-ci). Comparez la complexité de ce problème à celle du modèle de base.</li>
    <li>Reprenez (b), mais au lieu d'une table de correspondance pour $x_t(p_t)$, approximez la forme fonctionnelle de la politique en utilisant

    $$
    x_t(p_t\vert \theta) = \theta_0 + \theta_1 p_t + \theta_2 \ln{p_t} + \theta_3 \exp{\{\theta_4 p_t\}}.
    $$

    Décrivez à nouveau les étapes d'un algorithme adaptatif pour trouver $\theta$.</li>
  </ol>
</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *AdaptiveMarketPlanning* sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 14;">
<li>Une grande entreprise de gaz industriel, qui convertit l'air en oxygène et azote liquéfiés, doit signer des contrats de gaz naturel pour la production d'électricité. Les contrats fournissent une quantité de gaz pour le mois à venir, signés un mois à l'avance. Soit $W_{t+1}$ la demande d'électricité (en mégawattheures) pour le mois $t+1$, et soit $x_t$ la quantité de gaz, décidée au début du mois $t$, à acheter pendant le mois $t + 1$ (nous aurions pu indexer ceci $x_{t,t+1}$).

Supposez que nous achetons du gaz (normalement mesuré en unités de millions de btu) à un prix de 20 ＄ par mégawattheure équivalent (mwh), et que nous le vendons à un prix de 26 ＄ par mwh équivalent (plus tard, nous allons introduire de l'incertitude dans ces prix).

Pour simplifier, nous allons supposer que les variables aléatoires $W_1,W_2, \ldots, W_t,$ sont stationnaires, ce qui signifie qu'elles ont toutes la même distribution, mais que la distribution est inconnue. Vos profits pour le mois $t$ sont donnés par

$$
F_t(x_t,W_{t+1}) = p \min\{x_t,W_{t+1}\} - cx_t.
$$

Supposez en outre que vous allez utiliser un algorithme de gradient stochastique pour trouver les quantités de commande $x_t$, donné par

$$
x_{t+1} = x_t + \alpha_t \nabla F_t(x_t,W_{t+1}).
$$

Enfin, supposez que le pas est donné par

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + N_t - 1},
$$

où $N_t$ compte le nombre de fois où le gradient a changé de signe. Nous écrivons l'équation de mise à jour pour $N_t$ en utilisant

$$
N_{t+1} = \begin{cases} N_t + 1 & \text{if } \nabla F_{t-1}(x_{t-1},W_t)\nabla F_t(x_t,W_{t+1}) < 0, \\ N_t & \text{otherwise.} \end{cases}
$$

  <ol type="a">
    <li>Écrivez les cinq éléments du modèle pour ce problème. Pour la fonction objectif, vous voulez trouver la meilleure politique (ce sera un algorithme) pour maximiser les profits totaux issus de l'achat et de la vente de gaz naturel sur un horizon de $T = 24$ mois. Notez que la recherche sur les politiques fait référence à la recherche de la meilleure valeur de $\theta^{step}$.</li>
    <li>Utilisez le package python <em>AdaptiveMarketPlanning</em> à l'adresse <a href="https://tinyurl.com/sdagithub/">tinyurl.com/sdagithub</a> pour évaluer $\theta^{step} = (2,5,10,20,50)$ pour le modèle de la partie (a).</li>
    <li>Comment votre fonction objectif changerait-elle si vous deviez optimiser la récompense terminale plutôt que la récompense cumulée ? Veillez à écrire l'espérance sous sa forme imbriquée (c'est-à-dire, en utilisant une notation comme $\E_W$ si vous prenez une espérance sur $W$).</li>
    <li>Reprenez la recherche du meilleur $\theta^{step}$ (en utilisant les mêmes valeurs), mais maintenant en utilisant la formulation de la récompense finale que vous avez donnée dans la partie (c).</li>
    <li>Supposez maintenant que votre fonction objectif est donnée par

    $$
    F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t.
    $$

    où nous supposons maintenant que nous devons signer notre contrat pour une quantité $x_t$ sans connaître le prix que nous recevrons pour l'électricité que nous vendons sur le marché. Au lieu de cela, le prix $p_{t+1}$ est révélé pendant le mois $t + 1$. Comment ce changement affecterait-il votre modèle et votre stratégie de résolution ?</li>
  </ol>
</li>
</ol>
{% endraw %}