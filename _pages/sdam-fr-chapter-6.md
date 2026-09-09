---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 6 : Problèmes de plus court chemin stochastique - Dynamique"
permalink: /sdam/fr/chapter-6/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 0cd6be02e9b93c08
---

{% raw %}
## Aperçu du chapitre

Le [Chapitre 5](/sdam/fr/chapter-5/) a posé un problème de plus court chemin qui suppose que nous ne savons rien des temps de parcours variant dynamiquement sur les liens, ou que nous pouvons observer les temps sur les liens qui sont connectés à l'intersection où se trouve notre voyageur (mais rien de plus dans le futur).

Imaginons maintenant que nous sommes un service comme Google maps qui a accès à des informations en temps réel sur l'ensemble du réseau. De plus, ces informations sont mises à jour en temps réel, ce qui conduit Google à actualiser le chemin recommandé vers la destination du voyageur. Cette information introduit un changement majeur dans le modèle qui élimine complètement toute possibilité d'utiliser les méthodes que nous avons présentées au [Chapitre 5](/sdam/fr/chapter-5/).

L'approche que nous utilisons pour ce problème s'applique à tout problème que nous résoudrions en planifiant vers l'avenir en utilisant ce que l'on pourrait appeler les « meilleures estimations » de valeurs incertaines. Cela nous fournit un cadre pour notre première utilisation de la quatrième classe de politique que nous appelons approximations d'anticipation directe. Nous utilisons ce cadre pour démontrer une méthode pratique et puissante pour prendre des décisions dans un contexte dynamique (ce qui signifie sous incertitude) où nous partons d'un modèle d'anticipation déterministe, puis introduisons des paramètres pour le faire mieux fonctionner au fil du temps, sous incertitude.

## Récit

Nous allons de nouveau nous attaquer aux plus courts chemins stochastiques, mais cette fois-ci nous allons le faire exactement comme cela se fait dans Google maps (ou tout système de navigation commercial). Nous reconnaissons tous que les réseaux de transport présentent souvent des schémas prévisibles de congestion, ainsi que des variations aléatoires qui se produisent dans le cours naturel des événements. Par exemple, un accident pourrait créer un embouteillage dont nous pourrions estimer l'évolution des retards de trajet qui en résultent.

Le point de départ par rapport au problème statique de plus court chemin est que nos estimations des coûts futurs évoluent dans le temps. Nous allons revenir au problème où les coûts sont stochastiques, mais lorsque nous arrivons à un nœud $i$, nous ne voyons pas les réalisations réelles des coûts au départ du nœud $i$. Cependant, nous allons supposer que l'on nous fournit des estimations mises à jour des coûts sur l'ensemble du réseau. Ces estimations peuvent être vues comme une prévision ; nous allons supposer que le coût réel que nous engageons lorsque nous traversons un arc sera, en moyenne, égal à la prévision (c'est-à-dire que les prévisions sont non biaisées), mais ces prévisions évolueront dans le temps à mesure que nous recevons des mises à jour sur l'état du réseau.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Nous souhaitons minimiser le temps de trajet espéré, où nous pouvons également inclure une pénalité pour une arrivée après une heure d'arrivée cible.
- **Décisions :** Pour un voyageur au nœud $i$, nous voulons lui indiquer vers quel nœud $j$ se diriger ensuite.
- **Incertitudes :** Les temps de trajet estimés changent aléatoirement chaque fois qu'un voyageur traverse un lien vers un nœud en aval. Le temps réel lors de la traversée d'un lien différera de l'estimation.

## Modèle de base

Supposons que lorsque nous devons prendre une décision au temps $t$, nous disposons d'une estimation mise à jour des coûts de trajet basée sur les niveaux de congestion *actuels* (en suivant la vitesse à laquelle nos smartphones se déplacent dans le trafic). Nous allons représenter ces temps en utilisant $\cbar_{tk\ell}$, le coût estimé de traversée du lien $(k,\ell)$ au temps $t$, en utilisant des estimations basées sur ce que nous savons au temps $t$.

Pour l'instant, nous n'allons pas essayer de modéliser le coût si nous arrivons à un point dans le temps $t' > t$ compte tenu de ce que nous savons au temps $t$. Ainsi, nous pouvons estimer, à 15h, que nous allons arriver à un lien à 17h, mais nous allons utiliser notre estimation de 15h (comme le fait Google actuellement).

### Variables d'état

Un voyageur au nœud $N_t = i$ au temps $t$ est supposé recevoir un ensemble de prévisions $\cbar_{t} = (\cbar_{ttk\ell})\_{k, \ell \in \Ncal}$, le vecteur des estimations du coût de traversée du lien $(k, \ell)$ au temps $t$, compte tenu de ce qui est connu au temps $t$. L'état du voyageur $S_t$ au temps $t$ est alors

$$
S_t = (N_t, \cbar_t).
$$

Notez que cette variable d'état est *très* grande ; elle consiste en un vecteur d'estimations des coûts des liens pour *chaque* lien du réseau.

### Variables de décision

Les variables de décision sont les mêmes que dans le problème statique de plus court chemin stochastique

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i \text{ at time } t, \\ 0 & \text{otherwise.} \end{cases}
$$

Cette décision doit obéir à la contrainte que nous faisons *quelque chose* lorsque nous sommes dans l'état $N_t = i$ tant que $i$ n'est pas la destination. Nous écrivons cette contrainte comme

$$
\begin{align}
\sum_j x_{t,i,j} = 1 \quad \text{for } N_t = i \text{ other than the destination.} \label{dynamicshorestpathconstraint}
\end{align}
$$

Si nous sommes à la destination, alors nous ne faisons rien, et écrivons plutôt $x_{tij} = 0$ pour $i$ égal à la destination, et $j$ tout autre nœud.

Comme précédemment, nous laissons $X^\pi(S_t)$ être notre politique pour déterminer le vecteur $x_t$ qui doit, selon nos hypothèses, satisfaire la contrainte $\eqref{dynamicshorestpathconstraint}$.

### Information exogène

Il existe deux types d'information exogène pour ce problème. Le premier type concerne les coûts observés : $\chat_{t+1,ij}$, le coût réel de traversée du lien $(i,j)$ après que le voyageur a pris la décision au temps $t$ de traverser ce lien. Notez que nous n'observons $\chat_{t+1,ij}$ que si le voyageur traverse le lien $(i,j)$ (nous pouvons simplement insérer 0 pour les liens que nous ne traversons pas, puisque nous n'utiliserons pas ces valeurs).

Le second type de nouvelle information concerne les mises à jour des estimations $\cbar_t$ des coûts des liens. Nous allons modéliser l'information exogène comme le changement des estimations :

$$
\delta \cbar_{t+1,k\ell} = \begin{cases} \cbar_{t+1,k\ell} - \cbar_{tk\ell} & \text{if } x_{tk\ell}=1, \\ 0 & \text{otherwise.} \end{cases}
$$

$$
\delta \cbar_{t+1} = (\delta \cbar_{t+1,k\ell})_{(k,\ell)\in\Ncal}.
$$

Notre variable d'information exogène est alors donnée par

$$
W_{t+1} = (\chat_{t+1}, \delta \cbar_{t+1}).
$$

### Fonction de transition

Nous supposons que $\chat_{t+1}$ arrive comme information exogène (nous aurions pu faire en sorte que l'information exogène soit le changement des coûts, mais c'est plus naturel ainsi).

La fonction de transition pour les prévisions évolue selon

$$
\begin{align}
\cbar_{t+1,k\ell} = \cbar_{tk\ell} + \delta \cbar_{t+1,k\ell}. \label{eq:shortestpathdynamictransition1}
\end{align}
$$

Enfin, nous mettons à jour l'état physique $N_t$ en utilisant

$$
\begin{align}
N_{t+1} = \{j\vert x_{t,N_t,j} = 1\}. \label{eq:shortestpathdynamictransition2}
\end{align}
$$

Autrement dit, si nous sommes au nœud $i=N_t$ et que nous prenons la décision $x_{tij}= 1$ (qui exige que nous soyons au nœud $i$, puisque sinon $x_{tij} = 0$), alors $N_{t+1} = j$.

La mise à jour de $\chat_{t+1}$, équation $\eqref{eq:shortestpathdynamictransition1}$ pour les prévisions $\cbar_{t+1}$ et équation $\eqref{eq:shortestpathdynamictransition2}$ pour notre état physique $R_t$, constituent notre fonction de transition

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

### Fonction objectif

Nous écrivons maintenant notre fonction objectif comme

$$
\begin{align}
\min_\pi F^\pi(S_0) = \E \left\{\sum_{t=0}^T \sum_{(i,j)\in\Ncal} \chat_{t+1,i,j}X^\pi(S_t)\vert S_0 \right\}. \label{eq:shortestpathdynamicobjective}
\end{align}
$$

Notez que notre politique $X^\pi(S_t)$ effectue le choix du prochain lien vers lequel nous nous déplaçons compte tenu de ce que nous savons au temps $t$, capturé par $S_t$.

## Modélisation de l'incertitude

En pratique, la mise à jour dynamique des coûts (et des prévisions) provient de systèmes réels, ce qui signifie qu'elle est *pilotée par les données*. Dans ce cas, nous n'utilisons pas de modèle mathématique des coûts des liens. L'alternative consiste à disposer d'un modèle mathématique de l'information aléatoire $W^{n+1}$.

Si nous souhaitons exécuter des simulations, nous sommes alors confrontés au défi de modéliser la réalisation des coûts capturée par $\chat_t$, ainsi que la séquence des prévisions. Une attention considérable doit être accordée à ce modèle. Premièrement, le changement de l'estimation de $\ctilde_t$, que nous représentons par $\delta \ctilde_{t+1}$, doit être tiré d'une distribution de moyenne $0$. De plus, les réalisations $\chat_{t+1}$ doivent être tirées d'une distribution de moyenne $\ctilde_t$.

Nous ne voulons pas minimiser le défi que représente la création d'un modèle stochastique réaliste. Les changements dans les coûts des liens proviennent de différentes sources, allant des variations naturelles du trafic, de la météo, des accidents, aux déplacements de flux dus aux conducteurs réagissant à la congestion ailleurs dans le réseau. Les variations stochastiques des coûts des liens sont non stationnaires, et ne sont indépendantes ni dans le temps ni entre les liens. Cependant, au-delà de la reconnaissance de ces défis difficiles, un modèle plus réaliste dépasse le cadre de notre discussion.

## Conception des politiques

Un indice rapide que nous n'allons pas utiliser l'équation de Bellman (même de manière approchée) est la taille de la variable d'état, qui inclut maintenant des prévisions des coûts de trajet sur chaque lien du réseau.

Au lieu de cela, nous allons baser notre politique sur un modèle spécial que nous appelons un *modèle d'anticipation*. Par exemple, au temps $t$, nous pouvons créer un modèle constitué d'états $S_t$, de décisions $x_t$ et d'information exogène $W_{t+1}$, mais dans notre problème de base la variable d'état $S_t = (N_t, \cbar_t)$, qui est assez compliquée.

Au lieu de cela, nous allons créer un modèle plus simple où nous créons d'abord un nouvel ensemble de variables qui sont typiquement des approximations des variables du modèle de base. Nous différencions un nouvel ensemble de variables pour nos modèles d'anticipation en plaçant des tildes sur les variables du modèle d'anticipation, et nous les indexons par deux indices temporels : le temps $t$, qui est le moment où une décision est prise, et un second indice $t'$ qui est le temps au sein du modèle d'anticipation.

La séquence des états, décisions et informations exogènes dans le modèle d'anticipation s'écrirait alors

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots ).
$$

Notre vecteur de coûts $\cbar_t$ serait alors remplacé par le vecteur $\ctilde_{tt'}$. Nous sommes maintenant confrontés au défi de concevoir une politique d'anticipation que nous pourrions appeler $\Xtilde_{tt'}(\Stilde_{tt'})$ qui détermine $\xtilde_{tt'}$ au sein du modèle d'anticipation. Ci-dessous, nous proposons deux stratégies, toutes deux pouvant être résolues à l'aide d'un simple algorithme de plus court chemin.

### Une politique d'anticipation déterministe

Nous approximons le problème en supposant que les coûts dans le modèle d'anticipation, $\ctilde_{tt'}$, sont fixes et égaux aux estimations actuelles, ce qui signifie que nous posons

$$
\ctilde_{tt'k\ell} = \cbar_{tk\ell}.
$$

Cela signifie que nous n'avons plus les variables d'information exogène $\Wtilde_{tt'}$, ce qui nous donne un modèle d'anticipation déterministe.

Cela nous permet de résoudre notre modèle d'anticipation de manière déterministe, en traitant les estimations de coûts $\ctilde_{tt',k\ell}$ comme le coût correct plutôt que comme des variables aléatoires. Dans ce cas, notre variable d'état est de nouveau simplement le nœud où se trouve le voyageur (au sein du modèle d'anticipation).

Nous pouvons résoudre ce problème avec un algorithme standard de plus court chemin qui, comme nous l'avons vu au [Chapitre 5](/sdam/fr/chapter-5/), est un programme dynamique déterministe que nous pouvons résoudre avec l'équation de Bellman, ce que nous faisons en trouvant d'abord la « valeur » d'être au nœud $i$ au temps $t'$ dans notre modèle d'anticipation. Nous pouvons calculer ces valeurs en fixant les valeurs à la fin de notre modèle d'anticipation pour le temps $t$ égales à zéro

$$
\Vtilde_{t,t+H}(i) = 0,\ \text{for all } i.
$$

Ensuite, nous remontons dans le temps (dans le modèle d'anticipation) pour $t' = t+H-1, t+H-2, \ldots, t$ et calculons, pour chaque nœud $i$ :

$$
\begin{align}
\Vtilde_{tt'}(i) = \min_{j\in\Ncal^+_i} (\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(j)). \label{eq:shortestpathdetlookahead}
\end{align}
$$

Notre politique d'anticipation est alors donnée par

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmandetlookahead}
\end{align}
$$

Enfin, la politique que nous allons mettre en œuvre dans le modèle de base, si nous sommes au nœud $i$, serait

$$
X^\pi_t(S_t = i) = \Xtilde^\pi_{tt}(S_t = i).
$$

C'est la politique que nous utilisons lorsque nous suivons un système de navigation. Prendre des décisions basées sur un modèle d'anticipation déterministe est l'une des méthodes les plus largement utilisées pour prendre des décisions dans les problèmes de décision séquentielle sous incertitude.

<figure class="book-figure">
  <img src="/assets/images/sdam/rhpdeterministic123.jpg" alt="Illustration de la simulation d'une politique d'anticipation directe, en utilisant un modèle déterministe du futur." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 6.1.</span> Illustration de la simulation d'une politique d'anticipation directe, en utilisant un modèle déterministe du futur.</figcaption>
</figure>

La Figure 6.1 illustre un processus d'anticipation glissante. Aux temps $t$, $t+1$, $t+2$, $\ldots$, nous créons et résolvons un modèle d'anticipation en utilisant les estimations des coûts telles que nous les connaissons. Nous résolvons ensuite notre problème de plus court chemin, qui est représenté dans les décisions $\xtilde_{tt'}(j)$ pour tous les nœuds $j$, mais nous ne mettons ensuite en œuvre que la décision $\xtilde_{tt}(i)$ pour le nœud $i$ où nous sommes situés au temps $t$.

Lorsque nous maintenons constante une variable évoluant dynamiquement dans un modèle d'anticipation, nous désignons cette variable comme une *variable latente* dans le modèle d'anticipation. Le terme « variable latente » signifie techniquement variable cachée ; dans ce contexte, il désigne une variable qui ne change pas dans le temps (au sein du modèle d'anticipation), auquel cas nous la retirons de la variable d'état, ce qui signifie qu'elle est cachée (là encore, dans le modèle d'anticipation).

C'est l'un des nombreux types différents d'approximations qui peuvent être faites dans un modèle d'anticipation. L'approximation la plus évidente que nous faisons est que nous utilisons un futur déterministe, ce qui signifie que les estimations des coûts des liens sont maintenues constantes au sein du modèle d'anticipation, alors même qu'elles changent dans le modèle de base.

Le modèle d'anticipation est donc son propre modèle avec ses propres caractéristiques, ce qui est la raison pour laquelle nous utilisons des variables avec des tildes — c'est ainsi que nous établissons la distinction entre notre modèle de base, qui utilise des variables telles que $S_t$ et $x_t$, et le modèle d'anticipation, où nous utilisons des variables telles que $\Stilde_{tt'}$ et $\xtilde_{tt'}$.

Ensuite, nous allons proposer un ajustement mineur pour faire mieux fonctionner cette approche en présence d'incertitude.

### Une politique d'anticipation déterministe paramétrée

Une stratégie simple pour gérer l'incertitude dans notre problème de plus court chemin dynamique consisterait à remplacer notre estimation ponctuelle $\ctilde_{tt'k\ell}=\cbar_{tk\ell}$ du coût de traversée du lien $(k,\ell)$ au temps $t$ par, disons, le $\theta$-percentile des coûts, ce qui suggère d'écrire les coûts sous la forme $\ctilde_{tt',k\ell}(\theta) = \cbar_{tij}(\theta)$. Cette logique pourrait, par exemple, permettre d'éviter un chemin traversant une zone qui devient parfois très congestionnée, où le coût *pourrait* être assez élevé.

Cette politique produit toujours un problème de plus court chemin déterministe, tout aussi facile à résoudre que lorsque nous utilisions les estimations ponctuelles $\cbar_t$. Nous modifions simplement les équations $\eqref{eq:shortestpathdetlookahead}$–$\eqref{eq:shortestpathbellmandetlookahead}$ ci-dessus en utilisant les coûts de lien au $\theta$-percentile. Nous désignons alors les fonctions de valeur $\Vtilde_{tt'}(i\vert \theta)$ pour indiquer la dépendance au paramètre $\theta$, qui est calculé à l'aide de

$$
\begin{align}
\Vtilde_{tt'}(i\vert \theta) = \min_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{t,t'+1}(j\vert \theta)\big). \label{eq:shortestpaththetalookahead}
\end{align}
$$

Notre politique d'anticipation est alors donnée par

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i\vert \theta) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{tt'}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmanthetalookahead}
\end{align}
$$

Nous écrivons ensuite notre politique paramétrée pour le modèle de base (qui donne les décisions réellement mises en œuvre) à l'aide de

$$
X^\pi_t(S_t = i\vert \theta) = \Xtilde_{tt}(S_t = i\vert \theta).
$$

Ceci est équivalent à notre modèle d'anticipation déterministe original, à une exception majeure près : nous devons ajuster $\theta$ en optimisant

$$
\begin{align}
\min_\theta F^\pi(\theta\vert S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}. \label{eq:tuneshortestpathcfa}
\end{align}
$$

où $S_{t+1} = S^M(S_t,X^\pi(S_t\vert \theta), W_{t+1})$ (voir les équations $\eqref{eq:shortestpathdynamictransition1}$–$\eqref{eq:shortestpathdynamictransition2}$) en utilisant une méthode permettant de générer des réalisations aléatoires de $W_1, \ldots, W_T$.

Le problème d'optimisation dans $\eqref{eq:tuneshortestpathcfa}$ est lui-même un problème difficile, mais il est facilité par le fait que $\theta$ est un scalaire compris entre 0 et 1. Les algorithmes pratiques pour optimiser la fonction objectif dans $\eqref{eq:tuneshortestpathcfa}$ impliquent généralement l'exécution de simulations pour obtenir des observations bruitées de la fonction.

Une question évidente est de savoir si l'utilisation d'un percentile différent de $\theta = 0.5$ améliorerait les résultats. Notre expérience montre que c'est le cas lorsqu'il existe une pénalité pour les arrivées tardives (par exemple, nous voulons arriver à un rendez-vous à 9h).

## Qu'avons-nous appris ?

- Nous avons montré comment modéliser un problème de réseau dynamique, où les estimations des coûts évoluent dans le temps. Cette fois, l'état du système est constitué de la position du voyageur ainsi que des estimations des coûts sur chaque lien du réseau.
- Nous avons introduit l'idée d'un modèle d'anticipation approché, en l'occurrence une anticipation déterministe, qui peut être résolu comme un problème de plus court chemin. Bien qu'il s'agisse d'une solution optimale, résoudre un modèle d'anticipation approché, même de façon optimale, ne constitue pas une politique optimale.
- Nous décrivons les variables latentes, qui sont des variables dynamiques (les coûts sur les liens) maintenues constantes dans le modèle d'anticipation (c'est pourquoi elles ne figurent plus dans la variable d'état).
- Nous montrons comment transformer notre anticipation déterministe en une anticipation déterministe paramétrée. Au lieu d'utiliser le coût espéré sur chaque lien, nous pourrions utiliser le $\theta$-percentile afin de tenir compte de l'ampleur *possible* du coût d'un lien. Le paramètre $\theta$ doit être ajusté, ce qui fait de cette approche un hybride entre une approximation par anticipation déterministe (une politique DLA) paramétrée, ce qui en fait une forme de politique CFA, donnant ainsi une politique hybride DLA/CFA.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Pourquoi ne pouvions-nous pas utiliser les méthodes de programmation dynamique approchée du [Chapitre 5](/sdam/fr/chapter-5/) pour résoudre notre problème dynamique ?</li>
<li>Comment modélisons-nous le processus exogène $W_t$ dans le modèle d'anticipation ?</li>
<li>Décrivez en mots ce que nous entendons par politique d'anticipation.</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Nous résolvons un modèle d'anticipation déterministe en guise de politique. Ceci résout le problème déterministe de façon optimale. Pourquoi cela ne constitue-t-il pas une politique optimale ?</li>
<li>Nous résolvons notre modèle d'anticipation déterministe (éventuellement avec des coûts modifiés $\cbar_{ij}(\theta)$) comme un programme dynamique déterministe à l'aide de l'équation de Bellman. Pourquoi ne dirions-nous pas alors que nous résolvons notre modèle de base par programmation dynamique ?</li>
<li>Imaginez que nous souhaitions partir le plus tard possible du nœud d'origine, mais qu'il existe une forte pénalité pour une arrivée tardive au nœud de destination. Si nous optimisons sur le $\theta$-percentile des coûts $\cbar_{tij}(\theta)$, en quoi cette logique pourrait-elle nous aider à éviter les arrivées tardives ?</li>
<li>Compte tenu des enseignements tirés de l'exercice 6, en quoi pensez-vous que l'utilisation des coûts au $\theta$-percentile serait utile pour un problème où l'on cherche simplement à minimiser le temps de trajet total sans se soucier d'une possible arrivée tardive ?</li>
<li>Fournissez le modèle complet (variables d'état, variables de décision, ...) pour le cas où les coûts $\chat_{tij}$ des liens sortant du nœud $i$ sont révélés lorsque le voyageur arrive au nœud $i$ et avant qu'il ne décide quel lien traverser. Rappelez-vous que vous minimisez les coûts cumulés le long du chemin. Vous n'avez pas à concevoir une politique ; suivez notre pratique habituelle en introduisant une politique $X^\pi(S_t)$ sans la spécifier.</li>
<li>Imaginez que nous souhaitions résoudre notre problème de plus court chemin où nous voulons partir le plus tard possible de l'origine, mais devons arriver à destination avant 9h. Nous imposons une pénalité $\eta$ pour chaque minute d'arrivée après 9h. Décrivez un modèle de base et une politique d'anticipation paramétrée pour résoudre ce problème. Quelle est la variable d'état du modèle de base ? Quelle est la variable d'état du modèle d'anticipation ?</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *StochasticShortestPath_Dynamic* disponible sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Nous allons utiliser un modèle d'anticipation déterministe comme cela a été fait dans les notes, mais au lieu d'utiliser le coût espéré sur chaque lien, nous allons utiliser un percentile que nous désignons par $\theta^{cost}$. Par exemple, si $\theta^{cost} = 0.8$, alors nous utiliserions le 80e percentile du coût (pensez-y comme l'utilisation d'une estimation de l'ampleur possible du coût). Soit $\cbar_{tij}(\theta^{cost})$ le coût au $\theta^{cost}$-percentile du lien $(i,j)$ compte tenu de ce que nous savons au temps $t$.
  <ol type="a">
    <li>Écrivez le modèle d'anticipation, qui serait un plus court chemin déterministe utilisant les coûts $\cbar_{tij}(\theta^{cost})$ (comme cela est fait dans le livre). Utilisez ce modèle pour définir formellement une politique d'anticipation $X^{DLA}(S_{tj}\vert \theta^{cost})$.</li>
    <li>Quelle est la variable d'état du problème dynamique ? Rappelez-vous que la variable d'état inclut toutes les informations dynamiquement variables utilisées pour prendre une décision (ce qui inclut le calcul des coûts et des contraintes), ainsi que le calcul de la transition de $t$ à $t + 1$.</li>
    <li>Écrivez la fonction objectif utilisée pour évaluer notre politique d'anticipation.</li>
    <li>Nous disposons maintenant d'une politique $X^{DLA}(S_{tj}\vert \theta^{cost})$ paramétrée par $\theta^{cost}$. À l'aide du module Python <em>StochasticShortestPath_Dynamic</em>, simulez la politique pour $\theta^{cost} = (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0)$. Simulez chaque version de la politique 100 fois et calculez la moyenne du coût réel total (et non le $\theta^{cost}$-percentile). Considérez également le risque d'être « en retard », c'est-à-dire que le coût réel total dépasse un seuil donné. Tracez les résultats et comparez-les.</li>
  </ol>
</li>
</ol>
{% endraw %}