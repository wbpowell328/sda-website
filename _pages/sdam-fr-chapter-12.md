---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 12 : Optimisation des clics publicitaires"
permalink: /sdam/fr/chapter-12/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 4ae8bcde1a247d20
---


{% raw %}
## Aperçu du chapitre

Ce chapitre traite du problème de l'optimisation de la politique de placement d'enchères pour maximiser les rendements sur les plateformes de commerce électronique telles que Google et Facebook. Ces plateformes exécutent des enchères sophistiquées pour s'assurer qu'elles sont payées à la pleine valeur marchande pour les publicités qu'elles affichent. Le modèle du problème, et la conception des politiques, sont complexifiés par la nécessité de représenter trois formes d'incertitude : la probabilité que nous remportions l'enchère que nous faisons sur une publicité, le résultat quant à savoir si nous remportons ou non l'enchère, et le revenu tiré du gain de l'enchère.

Nous explorons trois politiques. Les deux premières sont relativement simples : une politique gloutonne qui choisit la meilleure enchère compte tenu de nos estimations actuelles de toutes les quantités incertaines, et une version randomisée de la politique gloutonne qui encourage l'exploration. La troisième est plus sophistiquée : connue sous le nom de « gradient de connaissance », elle maximise la valeur de l'information issue du placement d'une enchère particulière. Cela nécessite de trouver une espérance de l'amélioration résultant de ce que nous apprenons d'une enchère donnée. Le gradient de connaissance implique des calculs de probabilité relativement sophistiqués.

## Récit

Les entreprises faisant de la publicité sur des sites internet comme Google doivent enchérir pour obtenir une position visible pour leurs publicités (c'est-à-dire, en haut de la liste des publicités sponsorisées). Lorsqu'un client saisit un terme de recherche, Google identifie tous les enchérisseurs qui ont répertorié le même terme de recherche (ou un terme similaire) dans leur liste de mots-clés publicitaires. Google prend alors toutes les correspondances, les classe en fonction du montant enchéri par chaque participant, et organise une enchère. Plus l'enchère est élevée, plus il est probable que votre publicité sera placée près du haut de la liste des publicités sponsorisées, ce qui augmente la probabilité d'un clic. La Figure 12.1 est un exemple de ce qui est produit après avoir saisi les termes de recherche « hôtels à baltimore md ».

<figure class="book-figure">
  <img src="/assets/images/sdam/adclicksponsoredlist.png" alt="Exemple de publicités affichées en réponse à une recherche par mot-clé publicitaire." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 12.1.</span> Exemple de publicités affichées en réponse à une recherche par mot-clé publicitaire.</figcaption>
</figure>

Si un client clique sur la publicité, il y a un rendement attendu qui reflète le montant moyen dépensé par un client lorsqu'il visite le site web de l'entreprise. Le problème est que nous ne connaissons pas la courbe de réponse à l'enchère. La Figure 12.2 illustre une famille de courbes de réponse possibles. Notre défi est d'essayer différentes enchères pour apprendre quelle courbe est correcte.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickresponse.png" alt="Instances possibles de la probabilité qu'une publicité obtienne un clic en fonction de l'enchère." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 12.2.</span> Instances possibles de la probabilité qu'une publicité obtienne un clic en fonction de l'enchère.</figcaption>
</figure>

Nous commençons par supposer que nous pouvons ajuster l'enchère après chaque enchère, ce qui signifie que nous n'apprenons qu'une seule réponse (le client a cliqué ou non sur le lien). Il est possible que le client ait regardé un lien affiché et décidé de ne pas cliquer, ou que notre enchère ait été si basse que nous n'étions même pas dans la liste des publicités affichées.

Notre défi est de concevoir une politique pour fixer les enchères. L'objectif est de maximiser le revenu net, incluant ce que nous gagnons en vendant nos produits ou services, moins ce que nous dépensons sur les clics publicitaires.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Maximiser le revenu net attendu de la vente de produits annoncés sur la plateforme, moins le montant payé pour diffuser la publicité.
- **Décisions :** Combien enchérir pour la publicité.
- **Incertitudes :** Si une enchère est réussie, et le montant du revenu reçu d'une enchère réussie.

## Modèle de base

Nous allons supposer que nous utilisons une sorte de modèle paramétré pour capturer la probabilité qu'un client clique sur une publicité. À tout le moins, cette probabilité dépendra du montant que nous enchérissons pour une publicité – plus nous enchérissons, plus la publicité apparaîtra haut dans la liste des publicités sponsorisées, ce qui augmente la probabilité qu'un client clique sur elle. Soit $K^n = 1$ si le $n$ème client clique sur la publicité. Soit

$$
P^{click}(\theta_k,x) = Prob[K^{n+1}=1\vert \theta=\theta_k,x]
$$

où $Prob[K^{n+1}=1\vert \theta=\theta_k,x]$ sera décrit par une fonction logistique donnée par

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,x^n, H^n] = \frac{e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}{1+e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}. \label{eq:adclicklogisticregression}
\end{align}
$$

Cette fonction est paramétrée par $\theta = (\theta^{const}, \theta^{bid})$. Nous ne savons pas ce qu'est $\theta$, mais nous allons supposer qu'il s'agit d'un ensemble échantillonné $\Theta = \lbrace \theta_1, \ldots,\theta_K\rbrace $.

### Variables d'état

L'état initial $S^0$ comprend $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $, l'ensemble des valeurs possibles que $\theta$ peut prendre ; et $\Rbar^0$, l'estimation initiale du revenu gagné lorsqu'un client clique sur un lien.

Les variables d'état dynamiques $S^n$ comprennent $p^n_k$, la probabilité que le véritable $\theta = \theta_k$, avec $p^n = (p^n_k)\_{k=1}^K$ ; et $\Rbar^n$, l'estimation du revenu gagné à partir d'un clic publicitaire après $n$ enchères.

Notre variable d'état dynamique est donc

$$
S^n = (\Rbar^n, p^n).
$$

Notez que nous pouvons créer une estimation ponctuelle de $\theta$ après $n$ observations en utilisant

$$
\thetabar^n = \sum_{k=1}^K p^n_k \theta_k,
$$

mais il s'agit d'une statistique que nous pouvons calculer à partir de l'information contenue dans $S^n$, donc nous ne mettons pas $\thetabar^n$ dans la variable d'état.

### Variables de décision

Notre seule variable de décision est l'enchère que nous définissons comme $x^n$, l'enchère (en ＄ par clic) pour la $(n+1)$ème enchère. Comme précédemment, nous laissons $X^\pi(S^n)$ être notre politique générique qui nous donne l'enchère $x^n$ en fonction de l'information dont nous disposons, représentée par $S^n$, ce qui signifie que nous écririons

$$
x^n = X^\pi(S^n).
$$

Nous supposons que la politique impose toutes les contraintes, comme s'assurer que l'enchère n'est pas négative ou trop élevée.

### Information exogène

Dans notre modèle initial, nous observons uniquement les résultats d'une seule enchère, que nous modélisons en utilisant :

$$
K^{n+1} = \begin{cases} 1 & \text{if the customer clicks on our ad,} \\ 0 & \text{otherwise.} \end{cases}
$$

et $\Rhat^{n+1}$, le revenu gagné lors de la $n+1$ème enchère. Cela signifie que notre variable d'information exogène complète est

$$
W^{n+1} = (\Rhat^{n+1},K^{n+1}).
$$

### Fonction de transition

La fonction de transition pour ce problème semblera beaucoup plus compliquée que d'autres dans ce volume, car nous mettons à jour les croyances concernant l'incertitude sur le vecteur de paramètres $\theta$. Nous devons souligner que toutes les équations de transition peuvent être codées relativement facilement.

Nous allons mettre à jour notre revenu estimé lorsqu'un client clique sur la publicité en utilisant :

$$
\begin{align}
\Rbar^{n+1} = \begin{cases} (1-\alpha^{lrn}) \Rbar^n + \alpha^{lrn} \Rhat^{n+1} & \text{if } K^{n+1} = 1, \\ \Rbar^n & \text{otherwise.} \end{cases} \label{eq:adclicktransition1}
\end{align}
$$

Ainsi, nous ne mettons à jour notre revenu estimé que lorsque nous obtenons un clic. Le paramètre $\alpha^{lrn}$ est un paramètre de lissage (parfois appelé « taux d'apprentissage ») compris entre 0 et 1 que nous fixons à l'avance.

Nous abordons ensuite la mise à jour des probabilités $p^n_k$. Nous laissons $H^n$ être l'historique des états, décisions et information exogène

$$
H^n = (S^0,x^0,W^1, S^1, x^1, \ldots, W^n, S^n, x^n).
$$

Nous utilisons cela pour écrire

$$
p^n_k = Prob[\theta=\theta_k\vert H^n].
$$

La façon de lire le conditionnement sur l'historique $H^n$ est « $p^n_k$ est la probabilité $\theta = \theta_k$ étant donné ce que nous savons après $n$ observations. » Nous utilisons ensuite le théorème de Bayes pour écrire

$$
\begin{align}
p^{n+1}_k &= Prob[\theta=\theta_k\vert W^{n+1}, H^n] \nonumber\\
          &= \frac{Prob[K^{n+1}\vert \theta=\theta_k,H^n]Prob[\theta=\theta_k\vert H^n]}{Prob[K^{n+1}\vert H^n]}. \label{eq:adclicktransition2}
\end{align}
$$

Rappelez-vous que l'historique $H^n$ inclut la décision $x^n$ qui, étant donné une politique pour prendre ces décisions, est directement une fonction de l'état $S^n$ (qui à son tour est une fonction de l'historique $H^n$). Nous utilisons maintenant notre courbe logistique dans l'équation $\eqref{eq:adclicklogisticregression}$ pour écrire

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,H^n] &= Prob[K^{n+1}=1\vert \theta=\theta_k, x^n]\nonumber\\
   &= \frac{e^{\theta^{const}_k + \theta^{bid}_k x^n}}{1+e^{\theta^{const}_k + \theta^{bid}_k x^n}}. \label{eq:adclicktransition2a}
\end{align}
$$

Nous notons ensuite que

$$
\begin{align}
Prob[\theta=\theta_k\vert H^n]  = p^n_k. \label{eq:adclicktransition2b}
\end{align}
$$

Enfin, nous notons que le dénominateur peut être calculé en utilisant

$$
\begin{align}
Prob[K^{n+1}\vert H^n] = \sum_{k=1}^K Prob[K^{n+1}\vert \theta=\theta_k,H^n] p^n_k. \label{eq:adclicktransition2c}
\end{align}
$$

Notre utilisation d'une représentation échantillonnée des résultats possibles de $\theta$ nous aide grandement ici. Même si $\theta$ n'a que deux dimensions (comme c'est le cas ici, mais seulement pour l'instant), effectuer une intégrale bidimensionnelle sur une distribution multivariée pour $\theta$ serait problématique.

Les équations $\eqref{eq:adclicktransition2a}$–$\eqref{eq:adclicktransition2c}$ nous permettent de calculer notre équation de mise à jour bayésienne pour les probabilités dans $\eqref{eq:adclicktransition2}$. Les équations $\eqref{eq:adclicktransition1}$–$\eqref{eq:adclicktransition2}$ constituent notre fonction de transition

$$
S^{n+1} = S^M(S^n,x^n,W^{n+1}).
$$

### Fonction objectif

Nous commençons par écrire la fonction de profit à une seule période comme

$$
C(S^n,x^n,W^{n+1}) = (\Rhat^{n+1} - x^n) K^{n+1},
$$

ce qui signifie que nous ne gagnons rien si le client ne clique pas sur la publicité ($K^{n+1} = 0$). Si le client clique sur la publicité ($K^{n+1} = 1$), nous recevons un revenu donné par $\Rhat^{n+1}$, mais nous devons également payer ce que nous avons enchéri pour le clic publicitaire, donné par notre enchère $x^n$.

Nous allons finalement prendre la contribution attendue, que nous écrivons comme

$$
\E \{C(S^n,x^n,W^{n+1})\vert S^n\} = \E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Il y a trois variables aléatoires cachées dans l'espérance :

- $\theta$, avec distribution $p^n = (p^n_1, \ldots, p^n_K)$ (contenue dans $S^n$).
- $K^{n+1}$, où $P^{click}(\theta,x) = Prob[K^{n+1}=1\vert \theta,x]$.
- $\Rhat^{n+1}$, que nous observons à partir d'une distribution inconnue si $K^{n+1}=1$, et où $\Rhat^{n+1}=0$ si $K^{n+1}=0$ (nous n'obtenons aucun revenu si le client ne clique pas sur la publicité).

Nous pouvons alors décomposer l'espérance en trois espérances imbriquées :

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \E_{\Rhat} \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Nous commençons par prendre l'espérance sur $\Rhat$ où nous utilisons simplement $\E \lbrace \Rhat^{n+1}\vert S^n\rbrace  = \Rbar^n$ (rappelez-vous que $\Rbar^n$ est dans la variable d'état $S^n$), ce qui nous permet d'écrire

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Ensuite, nous allons prendre l'espérance sur $K^{n+1}$ pour un $\theta$ donné en utilisant

$$
\E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\} =  (\Rbar^n - x^n) P^{click}(\theta,x).
$$

où nous avons utilisé le fait que $(\Rbar^n - x^n) K^{n+1}=0$ si $K^{n+1}=0$.

Enfin, nous prenons l'espérance sur $\theta$ en utilisant

$$
\E_{\theta}  \{(\Rbar^n - x^n) P^{click}(\theta,x^n) \vert S^n\} = \sum_{k=1}^K (\Rbar^n - x^n) P^{click}(\theta=\theta_k,x^n) p^n_k.
$$

Nous allons laisser $\Cbar(S^n,x)$ être la contribution attendue, c'est-à-dire

$$
\Cbar(S^n,x)   =  \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Notre fonction objectif peut maintenant s'écrire comme

$$
\max_\pi \E_{S^0} \E_{W^1, \ldots, W^n\vert S^0} \left\{\sum_{n=0}^N C(S^n,X^\pi(S^n),W^{n+1})\vert S_0\right\}.
$$

Notez que le conditionnement sur $S_0$ est la façon dont nous communiquons notre prior $p^0\_k = Prob[\theta=\theta_k]$ au modèle. Comme précédemment, nous approximerions l'espérance en faisant la moyenne sur des échantillons simulés de la véritable valeur de $\theta$, ainsi que des clics observés $K^n$ et des revenus $R^n$.

## Modélisation de l'incertitude

Nous avons trois formes d'incertitude : le clic publicitaire $K^{n+1}$, le revenu que nous recevons $\Rhat^{n+1}$ si $K^{n+1}=1$, puis la véritable valeur de $\theta$. Nous allons supposer que nous observons simplement $\Rhat^{n+1}$ à partir d'un flux de données réel, ce qui signifie que nous n'avons pas besoin d'un modèle de probabilité formel pour ces variables aléatoires. Nous supposons que $K^{n+1}$ est décrit par notre fonction logistique

$$
\begin{align}
P^{click}(\theta,x) &= P[K^{n+1} = 1\vert \theta,x=x^n] \nonumber \\
                   &= \frac{e^{\theta^{const} + \theta^{bid} x}}{1+e^{\theta^{const} + \theta^{bid} x}}, \label{eq:adclicklogistic}
\end{align}
$$

mais il est important de reconnaître qu'il s'agit simplement d'une courbe ajustée. Les valeurs de $K^{n+1}$ sont observées à partir de données, ce qui signifie que nous n'avons aucune garantie que la distribution corresponde précisément à notre régression logistique.

Enfin, nous supposons que $\theta \in \Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $ ce qui est également une approximation. Il existe des façons d'assouplir l'exigence d'un ensemble échantillonné, mais la logique devient quelque peu plus compliquée sans ajouter beaucoup de valeur pédagogique.

## Conception des politiques

Nous allons explorer trois politiques pour l'apprentissage :

- Exploitation pure – Ici, nous plaçons toujours l'enchère qui semble être la meilleure compte tenu de nos estimations actuelles.
- Une politique d'excitation – Nous introduisons de l'exploration dans notre politique d'exploitation en ajoutant un terme de bruit aléatoire qui force le système à explorer dans les régions proches de celles que nous pensons être les meilleures (ceci est populaire en ingénierie où les états et décisions sont continus).
- Une politique de valeur de l'information – Nous allons maximiser la valeur de l'information issue du placement d'une enchère et de l'apprentissage du résultat.

### Exploitation pure

Le point de départ de toute politique en ligne devrait être l'exploitation pure, ce qui signifie faire le mieux que nous pouvons. Pour calculer cela, nous commençons par utiliser

$$
\E \{\Rhat^{n+1} K^{n+1}\} = \E \{\Rhat^{n+1}\vert K^{n+1} = 1\} Prob[K^{n+1}=1\vert \theta=\theta_k] = \Rbar^n P^{click}(\theta,x).
$$

Pour trouver la meilleure enchère, nous trouvons (après un peu d'algèbre) la dérivée par rapport à l'enchère $x$

$$
\frac{d \Cbar(x)}{d x} = (\Rbar^n - x)\frac{d P^{click}(\theta,x)}{d x} - P^{click}(\theta,x)
$$

où

$$
\frac{d P^{click}(\theta,x)}{d x} = \frac{\theta_1 e^{-\theta_0 - \theta_1 x}}{(1+e^{-\theta_0 - \theta_1 x})^2}.
$$

Nous voulons maintenant trouver l'enchère $x^\ast $ où

$$
\left.\frac{d \Cbar(x)}{d x}\right\vert _{x=x^\ast } = 0.
$$

La Figure 12.3 montre $\frac{d \Cbar(x\vert \theta)}{d x}$ en fonction de l'enchère $x$, montrant le comportement selon lequel elle commence positive et passe à négative. Le point où elle est égale à zéro serait l'enchère optimale, un point qui peut être trouvé numériquement assez facilement. Soit $X^{explt}(S^n)$ l'enchère $x^\ast $ satisfaisant $d \Cbar(x)/dx = 0$.

Cela signifie que nous devons exécuter un algorithme numérique pour calculer la politique. Il s'agit d'une politique gloutonne qui appartient à la classe CFA, mais sans aucun paramètre ajustable.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickprofitderivative.png" alt="Dérivée de la fonction de profit du clic publicitaire en fonction de l'enchère." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 12.3.</span> Dérivée de la fonction de profit du clic publicitaire en fonction de l'enchère.</figcaption>
</figure>

### Une politique d'excitation

Une limitation potentielle de notre politique d'exploitation pure est qu'elle ignore la valeur d'essayer une gamme plus large d'enchères pour aider au processus d'apprentissage des valeurs correctes de $\theta$. Une stratégie populaire consiste à ajouter un terme de bruit, connu en ingénierie sous le nom d'« excitation », nous donnant la politique

$$
X^{excite}(S^n\vert \rho) = X^{explt}(S^n) + \varepsilon(\rho)
$$

où $\varepsilon(\rho) \sim N(0,\rho^2)$. Dans cette politique, $\rho$ est notre paramètre ajustable qui contrôle la quantité d'exploration dans la politique. S'il est trop petit, il pourrait ne pas y avoir suffisamment d'exploration. S'il est trop grand, nous choisirons des enchères éloignées de l'optimum, possiblement sans aucun bénéfice de l'apprentissage.

### Une politique de valeur de l'information

Les politiques de pure exploitation et d'excitation que nous venons d'introduire sont toutes deux relativement simples. Nous allons maintenant considérer une politique qui maximise la valeur de l'information dans le futur. Cela semble être une idée raisonnable, mais cela requiert que nous réfléchissions à la manière dont l'information actuelle affecte la décision que nous *pourrions* prendre dans le futur, ce qui sera un peu plus difficile.

Notre politique d'exploitation suppose que les paramètres estimés $\theta^n$ après $n$ expériences constituent la valeur correcte, et choisit une offre sur la base de cette estimation. Imaginons maintenant que nous plaçons une offre $x^n=x$ et observons $K^{n+1}$ et $\Rhat^{n+1}$, et utilisons cette information pour obtenir une estimation actualisée de $\theta^{n+1}$ ainsi que de $\Rbar^{n+1}$. Nous pouvons ensuite utiliser ces estimations actualisées pour prendre une meilleure décision. Nous voulons choisir l'offre $x$ qui nous donne la plus grande amélioration de la valeur de l'information issue d'une décision, tout en reconnaissant que nous ne connaissons pas le résultat de $W^{n+1} = (\Rhat^{n+1},K^{n+1})$ tant que nous n'avons pas effectivement placé l'offre.

Soit $\theta^{n+1}(x^n,W^{n+1})$ l'estimation actualisée de $\theta$ en supposant que nous placions l'offre $x^n=x$ et observions $W^{n+1} = (\Rhat^{n+1},K^{n+1})$. Il s'agit d'une variable aléatoire, car nous envisageons de placer une offre $x^n=x$ pour la $n+1$ème enchère, mais nous n'avons pas encore placé l'offre, ce qui signifie que nous n'avons pas encore observé $W^{n+1}$.

Pour simplifier notre analyse, nous allons supposer que la variable aléatoire $K^{n+1} = 1$ avec probabilité $P^{click}(\theta,x)$ et $K^{n+1} = 0$ avec probabilité $1-P^{click}(\theta,x)$. Nous allons ensuite supposer que notre estimation du revenu que nous recevons d'un clic publicitaire s'est stabilisée, ce qui signifie que $\Rbar^{n+1} \approx \Rbar^n$.

Nous pouvons considérer ceci comme un modèle d'anticipation approché, où $\Rbar^n$ ne change pas. Nous écririons alors notre information exogène dans notre modèle d'anticipation comme

$$
\Wtilde^{n,n+1}=\Ktilde^{n,n+1},
$$

où le double exposant $(n,n+1)$ signifie qu'il s'agit de l'information dans un modèle d'anticipation créé au temps $n$, qui envisage ce qui pourrait se produire au temps $n+1$. La variable aléatoire $\Ktilde^{n,n+1}$ est le clic publicitaire que nous simulons *pourrait* se produire dans notre modèle d'anticipation, plutôt que l'observation réelle du fait que quelqu'un ait cliqué sur la publicité. Souvenez-vous simplement que nous utilisons un tilde pour toute variable dans notre modèle d'anticipation, et que ces variables seront indexées par $n$ (le temps auquel nous initions le modèle d'anticipation), et $n+1$ (puisque nous regardons une période de temps en avant dans le modèle d'anticipation).

Nous utilisons ensuite notre équation de mise à jour $\eqref{eq:adclicktransition2}$ pour les probabilités $p^n_k = Prob[\theta=\theta_k\vert H^n]$. Nous pouvons écrire ces probabilités actualisées comme $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$ pour capturer la dépendance de la mise à jour vis-à-vis de $\Ktilde^{n,n+1}$ (l'équation $\eqref{eq:adclicktransition2}$ est écrite pour $\Ktilde^{n,n+1}=1$). Puisque $\Ktilde^{n,n+1}$ peut prendre deux résultats (0 ou 1), nous aurons deux valeurs possibles pour $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$.

Imaginons maintenant que nous exécutions notre politique de pure exploitation $X^{explt}(S^n\vert \theta^n)$ que nous avons décrite plus haut, mais que nous le fassions dans notre modèle d'anticipation approché (c'est là où nous ignorons les changements de $\Rbar^n$). Soit $\Stilde^{n,n+1}$ représentant notre état dans le modèle d'anticipation, donné par

$$
\Stilde^{n,n+1}(\Ktilde^{n,n+1}) = (\Rbar^n, \ptilde^{n,n+1}(\Ktilde^{n,n+1})).
$$

Souvenez-vous – puisque $\Ktilde^{n,n+1}$ est une variable aléatoire (nous sommes toujours au temps $n$), $\Stilde^{n,n+1}(\Ktilde^{n,n+1})$ est également une variable aléatoire, ce qui explique pourquoi nous écrivons sa dépendance explicite vis-à-vis du résultat $\Ktilde^{n,n+1}$.

La façon d'envisager ce modèle d'anticipation est comme si vous jouiez à un jeu (tel que les échecs) où vous réfléchissez à un coup (pour nous, il s'agirait de l'offre $x^n$), puis, avant de faire le coup, réfléchissez à ce qui pourrait se produire dans le futur. Dans ce problème, notre futur n'a que deux issues possibles (selon qu'un client clique ou non sur la publicité), ce qui signifie deux valeurs possibles de $\Stilde^{n,n+1}$, qui produisent deux ensembles de probabilités actualisées $\ptilde^{n,n+1}(K^{n+1})$.

Enfin, cela signifie qu'il y aura deux valeurs de l'offre myope optimale (en utilisant notre politique de pure exploitation) $X^{explt}(\Stilde^{n,n+1})$. La contribution attendue que nous ferions dans le futur est alors donnée par $\Ctilde(\Stilde^{n,n+1},\xtilde^{n,n+1})$ où $\xtilde^{n,n+1}$ (c'est la décision que nous envisageons de prendre dans le futur) est donnée par

$$
\xtilde^{n,n+1} = X^{explt}(\Stilde^{n,n+1}).
$$

Cela signifie qu'il existe deux décisions optimales possibles, ce qui signifie deux valeurs différentes de la contribution attendue $\Ctilde(\Stilde^{n,n+1},X^{explt}(\Stilde^{n,n+1}))$. Par souci de concision, appelons-les $\Ctilde^{n,n+1}(1)$ (si $\Ktilde^{n,n+1} = 1$) et $\Ctilde^{n,n+1}(0)$ (si $\Ktilde^{n,n+1} = 0$). Considérez-les comme les contributions attendues qui *pourraient* se produire dans le futur compte tenu de ce que nous savons maintenant. Enfin, nous pouvons prendre l'espérance sur $\Ktilde^{n,n+1}$ pour obtenir la contribution attendue de placer une offre $x^n=x$ maintenant, que nous pouvons calculer en utilisant

$$
\Cbar^n(x) = \sum_{k=1}^K \big(P^{click}(\theta=\theta_k,x) \Ctilde^{n,n+1}(1) + (1-P^{click}(\theta=\theta_k,x)) \Ctilde^{n,n+1}(0)\big) p^n_k.
$$

Notre politique consiste alors à choisir l'offre $x$ qui maximise $\Cbar^n(x)$. Supposons que nous discrétisions nos offres en un ensemble $\Xcal = \lbrace x_1, \ldots, x_M\rbrace $. Notre politique de valeur de l'information s'écrirait comme

$$
X^{VoI}(S^n) = \argmax_{x\in\Xcal} \Cbar^n(x).
$$

Nous notons qu'il s'agit d'une politique de classe d'approximation par anticipation directe (DLA).

Les politiques de valeur de l'information sont assez puissantes. Elles sont plus difficiles à calculer, mais n'ont aucun paramètre réglable. Imaginez, par exemple, effectuer ce calcul lorsqu'il y a plus de deux issues possibles. Par exemple, si nous n'avions pas fait notre simplification consistant à maintenir $\Rbar^n$ constant, nous devrions reconnaître que cette variable d'état change également.

Nous notons seulement en passant que nous avons effectué de nombreuses comparaisons entre différentes politiques d'apprentissage, et que la valeur de l'information à un pas d'anticipation fonctionne souvent assez bien. Nous avons utilisé ce cadre parce qu'il rendait les dérivations beaucoup plus simples.

Une mise en garde s'impose. Les problèmes d'apprentissage où le résultat est 0 ou 1 sont des problèmes où une seule expérience fournit très peu d'information. Il est préférable, à la place, de supposer que nous prenons notre décision (c'est-à-dire que nous fixons l'offre), puis l'observons pour, disons, $M$ enchères. Cela signifie que $\Ktilde^{n,n+1}$ pourrait maintenant être un nombre compris entre 0 et $M$. Le nombre $M$ devient un paramètre réglable, et les calculs deviennent un peu plus complexes (nous devons sommer sur $M+1$ réalisations plutôt que sur seulement deux), mais cette approche peut fonctionner assez bien.

## Extension : Clients avec des attributs simples

Supposons que nous connaissions la localisation d'un client jusqu'à la région ou la ville principale la plus proche, que nous désignons par $L$. Si nous pensons que le comportement de chaque région est différent, nous pourrions indexer $\theta$ par $\theta_\ell$ si le client provient de la localisation $L=\ell$. Cela signifie que s'il y a 1 000 localisations, nous devons estimer 1 000 modèles, ce qui signifie 1 000 valeurs de $\theta = (\theta^{const},\theta^{bid})$.

Une approche alternative consisterait à spécifier un modèle de la forme

$$
Prob^n[K^{n+1}=1\vert \theta] = \frac{e^{U(x,L\vert \theta)}}{1+e^{U(x,L\vert \theta)}}.
$$

où nous allons maintenant utiliser comme fonction d'utilité

$$
U(x,L\vert \theta) = \theta^{const} + \theta^{bid}x + \sum_{\ell=1}^L \theta^{loc}_\ell I_{\ell=L}.
$$

Il s'agit d'un modèle plus compact car nous supposons maintenant que le terme constant $\theta^{const}$ et le coefficient d'offre $\theta^{bid}$ ne dépendent pas de la localisation. Au lieu de cela, nous ajoutons simplement un décalage $\theta^{loc}\_\ell$. Ainsi, nous avons toujours 1 000 paramètres à estimer (les coefficients de localisation), alors qu'auparavant nous avions 2 000 paramètres à estimer – $\theta^{const}\_\ell$ et $\theta^{bid}\_\ell$ pour chaque localisation $\ell \in \lbrace 1, \ldots, L\rbrace $.

## Qu'avons-nous appris ?

- Il s'agit d'un autre problème de pur apprentissage (notre problème du diabète au [Chapitre 4](/sdam/fr/chapter-4/) était un problème de pur apprentissage), mais cette fois nous utilisons un modèle de croyance non linéaire, avec un modèle échantillonné pour le paramètre inconnu $\theta$ qui détermine la réponse au prix.
- La fonction de transition inclut la mise à jour bayésienne des croyances concernant les probabilités $p^n_k$ que le paramètre inconnu $\theta$ soit égal à une valeur spécifique $\theta_k$.
- Il existe trois formes d'incertitude : le fait qu'une personne clique ou non sur une publicité selon le prix de l'offre ; le revenu tiré du clic sur la publicité (par exemple, le client a-t-il acheté le produit) ; et l'incertitude concernant la réponse du marché capturée par le paramètre inconnu $\theta$.
- Nous illustrons une politique de pure exploitation, une politique d'excitation (qui randomise simplement le prix recommandé issu de la politique d'exploitation), et une politique de gradient de connaissance qui maximise la valeur de l'information.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quel modèle probabiliste est supposé pour la variable aléatoire $K^n$ indiquant si un client a cliqué ou non sur la publicité ?</li>
<li>Quel modèle probabiliste avons-nous supposé pour le vecteur de paramètres inconnu (et donc incertain) $\theta$ ?</li>
<li>Quelle distribution de probabilité avons-nous supposée pour le revenu $\Rhat^{n+1}$ que nous recevons lorsque le client clique sur une publicité ?</li>
<li>Donnez les numéros des équations qui composent la fonction de transition.</li>
<li>Quelle information probabiliste se trouve dans l'état initial $S^0$ ?</li>
<li>Qu'accomplit l'ajout du terme de bruit $\varepsilon(\rho)$ pour créer la politique d'excitation ? Quel(s) paramètre(s) spécifique(s) cela nous aide-t-il à identifier ?</li>
<li>Décrivez en mots la logique sous-jacente à la politique de valeur de l'information. Quelle est la valeur si le fait d'apprendre qu'un client clique ou non sur une publicité ne change pas ce que nous allons offrir ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li><p>Système de recommandation partie I - Modèle de croyance - Vous allez aider à concevoir un système de recommandation qui recommande des produits à annoncer lorsqu'un client fait défiler un site web. Puisque le client doit se connecter, nous pouvons identifier le $n$ème client par un vecteur d'attributs $a=a^n$ qui inclut :</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$a_1$</td><td>Genre (2 types).</td></tr>
<tr><td>$a_2$</td><td>Tranche d'âge $(0$–$10, 11$–$20, \ldots, 70$–$100)$ (8 types).</td></tr>
<tr><td>$a_3$</td><td>Type d'appareil (smartphone, ordinateur portable, tablette) (3 types).</td></tr>
<tr><td>$a_4$</td><td>Région (200).</td></tr>
<tr><td>$a_5$</td><td>Identifiant unique (adresse électronique) (100 millions).</td></tr>
</tbody>
</table>
</div>

<p>Imaginons que nous recommandons des articles textuels. Supposons que l'article que nous recommandons pour le $n$ème client possède des attributs $b=b^n$ qui incluent :</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$b_1$</td><td>Actualités, sports, arts, affaires, cuisine, immobilier (6 types).</td></tr>
<tr><td>$b_2$</td><td>Sous-catégorie : s'il s'agit d'actualités, alors international, national (par pays), régional (région au sein d'un pays) ; s'il s'agit de sports, alors par sport, puis par équipe (ou athlète) ; et ainsi de suite (500 au total).</td></tr>
<tr><td>$b_3$</td><td>Source (site web, journal, ...) (5 sources).</td></tr>
<tr><td>$b_4$</td><td>Auteur (2 000).</td></tr>
<tr><td>$b_5$</td><td>Identifiant unique pour l'article (6 millions).</td></tr>
</tbody>
</table>
</div>

<p>Nous souhaiterions estimer :</p>

<p style="margin-left: 2rem;">$P(b^n\vert a^n)$ = Probabilité que le $n$ème client ayant l'attribut $a^n$ clique sur le lien d'un article ayant l'attribut $b^n$.</p>

<p>Lorsque le client $a^n$ arrive, nous allons supposer que nous devons choisir un article d'actualité parmi un ensemble $\Bcal^n$, qui est l'ensemble des articles disponibles au moment où le $n$ème client arrive (cet ensemble change au fil du temps). Nous souhaiterions choisir un article ayant l'attribut $b\in\Bcal^n$ qui maximise la probabilité que notre client clique sur cet article d'actualité. Notre politique doit choisir un article particulier ayant l'attribut $b^n$.</p>

<p>Idéalement, nous voulons $P(b^n_5\vert a^n_5)$ qui est la probabilité que l'utilisateur $a^n_5$ sélectionne l'article $b^n_5$, mais il y a trop d'utilisateurs et trop d'articles pour obtenir des estimations raisonnables de cette probabilité. Si nous ne considérons que les éléments $a_1, a_2, a_3$ et $a_4$, il y aurait 9 600 combinaisons, avec en moyenne environ 10 000 personnes pour chacun de ces quatre premiers éléments. Ci-dessous, nous allons supposer que nous utilisons seulement $a_1$ et $a_2$, ce qui signifie 16 types de personnes.</p>

<p>Nous allons créer un ensemble de caractéristiques $\Fcal$ qui sont construites à partir des éléments de $a$ et $b$ que nous souhaitons considérer. Nous allons simplement utiliser les éléments $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $ à partir desquels nous allons construire un ensemble de variables caractéristiques $\phi_f(a,b),~f\in\Fcal$. Puisque ces cinq éléments sont tous catégoriels, les caractéristiques les plus élémentaires sont des variables indicatrices. Par exemple, pour l'attribut de genre $a_1$, nous avons deux genres à partir desquels nous créons deux caractéristiques :</p>

$$
\phi_{male}(a) = \begin{cases} 1 & \text{if } a_1 = male, \\ 0 & \text{otherwise.} \end{cases} \qquad \phi_{female}(a) = \begin{cases} 1 & \text{if } a_1 = female, \\ 0 & \text{otherwise.} \end{cases}
$$

<p>Si nous nous restreignons à ces caractéristiques élémentaires, nous aurions une caractéristique pour chaque valeur possible de chaque élément des attributs $a_1,a_2,b_1,b_2,b_3$.</p>

<p>Notre processus commence lorsque le premier client se connecte avec un vecteur d'attributs $a^1$, moment auquel nous devons décider des attributs d'un article $b^1$ à afficher à cet utilisateur, puis observer $Y^1$, où $Y^1 = 1$ si le client clique sur l'article ou 0 sinon. Cette information est utilisée pour créer un état actualisé $S^1$, après quoi nous observons le client $a^2$.</p>

<p>Si $a^n$ correspond aux attributs du $n$ème client, alors notre décision consiste à choisir $b^n$ en utilisant ce que nous savons, que nous désignons par $S^n$. Notre objectif est de modéliser ce problème et de concevoir une politique $B^\pi(S^n)$ qui détermine $b^n$.</p>

<p>Notre premier défi est de développer un modèle de croyance :</p>
  <ol type="a">
    <li>Si nous utilisons un modèle de croyance à table de correspondance pour $P(b\vert a)$ en utilisant les attributs $\lbrace a_1,a_2, b_1,b_2,b_3\rbrace $, combien de paramètres cherchons-nous à estimer ?</li>
    <li>Envisageons plutôt d'utiliser une régression logistique. Définissons d'abord une fonction d'utilité

    $$
    U(a,b\vert \theta) = \sum_{f\in\Fcal} \theta_f \phi_f(b\vert a),
    $$

    où $\Fcal$ est l'ensemble des caractéristiques élémentaires que nous pouvons construire à partir des éléments $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $. Créons maintenant un modèle de régression logistique pour la probabilité de cliquer sur un article en utilisant

    $$
    P(Y=1\vert a,b,\theta) = \frac{e^{U(a,b\vert \theta)}}{1+e^{U(a,b\vert \theta)}}.
    $$

    Quelle est la dimensionnalité du vecteur $\theta$ en supposant que nous utilisons simplement des variables indicatrices élémentaires ?</li>
    <li>Sachant que le nombre de paramètres dans le modèle paramétrique de la partie (b) est bien plus faible que le nombre de paramètres dans le modèle à table de correspondance de la partie (a), pourquoi utiliserait-on un modèle de croyance à table de correspondance plutôt qu'un modèle paramétrique tel que la régression logistique ? Discutez des avantages et des inconvénients de chaque type de modèle de croyance.</li>
    <li>Nous devons maintenant estimer $\theta$. Supposons que nous générions un échantillon de valeurs possibles du vecteur $\theta$ que nous représentons par $\lbrace \theta_1, \ldots, \theta_k, \ldots, \theta_K\rbrace $, où chaque $\theta_k$ est un vecteur avec l'élément $\theta_{kf},~f\in\Fcal$. Commençons avec la probabilité a priori $p^0_k = 1/K$. Supposons ensuite que nous observions les attributs du premier client $a^1$, puis que nous prenions la décision d'afficher un article avec l'attribut $b^1$ (ceci est notre variable de décision). En supposant que vous connaissiez $p^n_k$, écrivez le théorème de Bayes pour calculer $p^{n+1}_k$ après avoir observé un client avec l'attribut $a^{n+1}$, puis choisi un article avec l'attribut $b^{n+1}$ après quoi vous observez le résultat $Y^{n+1} = 1$.</li>
  </ol>
</li>
<li>Système de recommandation partie II - Modèle du système - Nous allons maintenant modéliser les cinq éléments du problème.
  <ol type="a">
    <li>Donnez les éléments de l'état pré-décisionnel $S^n$ et de l'état post-décisionnel $S^{b,n}$.</li>
    <li>Il existe deux formes d'information exogène dans ce processus. Quelles sont-elles ?</li>
    <li>Écrivez la séquence des états (pré- et post-décisionnels), des décisions et des différentes formes d'information exogène en commençant par ce que vous savez au temps 0 et en poursuivant jusqu'à (mais sans inclure) l'arrivée du troisième client. Écrivez-les dans l'ordre où ils se produisent, avec une indexation appropriée (par exemple $n$ par rapport à $n+1$).</li>
    <li>Écrivez les équations représentant la fonction de transition.</li>
    <li>Écrivez la fonction objectif permettant de trouver la meilleure politique $B^\pi(S^n)$ (sans préciser le type de politique).</li>
  </ol>
</li>
<li>Système de recommandation partie III - Conception de la politique - Enfin, nous allons essayer de concevoir des politiques. Supposons que nous ayons $K=20$ valeurs possibles de $\theta$.
  <ol type="a">
    <li>Commencez par supposer que nous savons que $\theta = \theta_k$. Écrivez une politique d'exploitation pure où nous choisissons l'attribut $b\in\Bcal^n$ qui maximise la probabilité d'être choisi, étant donné que $\theta = \theta_k$.</li>
    <li>Supposons ensuite que nous ne savons pas que $\theta=\theta_k$. Au lieu de cela, $\theta=\theta_k$ avec probabilité $p^n_k$. Réécrivez votre politique de la partie (a) où vous devez traiter $\theta$ comme une variable aléatoire. Vous devrez insérer une espérance quelque part.</li>
    <li>La politique en (b) pourrait être considérée comme trop coûteuse à calculer. Vous pouvez la simplifier en remplaçant la variable aléatoire $\theta$ par son espérance

    $$
    \thetabar^n = \E^n \theta_k = \sum_{k=1}^K \theta_k p^n_k.
    $$

    Réécrivez votre politique de la partie (b) en utilisant cette estimation ponctuelle. Supposez que vous ne considérez que les articles pour lesquels la probabilité de cliquer sur un article est supérieure à 0,5. Selon vous, comment la probabilité de cliquer sur un article calculée à l'aide de l'estimation ponctuelle en (c) se comparerait-elle à l'estimation fournie en utilisant l'espérance en (b) ?</li>
    <li>La politique d'estimation par intervalle utilise, par exemple, le 95ème centile de l'estimation de la valeur d'un choix. Soit $\rho$ le centile souhaité, et supposons qu'il doive être arrondi à 0,05 (car nous avons choisi $K=20$ valeurs possibles pour $\theta$). Montrez comment concevoir une politique qui choisit le vecteur d'attributs $b$ qui maximise la $\rho$ème probabilité (plutôt que l'estimation ponctuelle), et donnez la fonction objectif permettant de trouver la meilleure valeur de $\rho$ pour maximiser le nombre total de clics publicitaires.</li>
  </ol>
</li>
</ol>
{% endraw %}
