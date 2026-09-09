---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 7 : Applications, revisitées"
permalink: /sdam/fr/chapter-7/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 80dcb065dd6e7cae
---


{% raw %}
Maintenant que nous avons passé en revue une série de contextes de problèmes, nous allons nous arrêter et utiliser ces applications pour illustrer plus en profondeur certaines des questions de modélisation que nous avons abordées au [Chapitre 1](/sdam/fr/chapter-1/).

En partant des problèmes de stock du Chapitre 1, nous avons maintenant couvert six classes de problèmes de décision séquentielle. Pour chaque problème, nous avons illustré une ou deux stratégies de prise de décision :

- **Chapitre 1)** Problèmes de stock – Nous avons introduit les problèmes de décision séquentielle en utilisant des variations d'un problème de stock simple. Les politiques comprenaient la politique de recomplètement, ainsi qu'une politique basée sur des prévisions ajustées.
- **Chapitre 2)** Vendre un actif – Nous avons dû décider quand vendre un actif financier. Les politiques comprenaient des variations d'achat au plus bas, vente au plus haut.
- **Chapitre 3)** Planification adaptative de marché – Ce problème utilisait une recherche stochastique basée sur des dérivées, où le problème de décision séquentielle consistait à choisir un pas, ce que nous avons illustré à l'aide de fonctions paramétriques simples.
- **Chapitre 4)** Apprendre le meilleur traitement du diabète – Il s'agit d'un problème classique d'apprentissage actif connu comme le problème du bandit manchot à bras multiples (multiarmed bandit). Nous avons conçu des politiques basées sur des problèmes d'optimisation paramétrés.
- **Chapitre 5)** Plus courts chemins stochastiques statiques – Nous avons trouvé une solution optimale d'une version particulière d'un problème de plus court chemin stochastique en utilisant une récursion de programmation dynamique classique que nous pouvions résoudre exactement, puis nous avons introduit une version stochastique plus complexe que nous avons résolue en utilisant la programmation dynamique approximative, en exploitant une variable d'état post-décision.
- **Chapitre 6)** Plus courts chemins stochastiques dynamiques – Ici, nous passons à un problème de plus court chemin dynamique où les estimations des coûts de chemin attendus évoluent au fil du temps (dans le cas statique du Chapitre 5, nos estimations des coûts attendus ne changeaient pas). Nous avons utilisé cela pour illustrer une politique d'anticipation déterministe de base, ainsi qu'une politique d'anticipation paramétrée.

Plus tôt, nous avons introduit quatre classes de politiques. Dans les applications que nous avons passées en revue jusqu'à présent, nous avons vu des illustrations de chacune des quatre classes. Dans ce chapitre, nous allons revoir les quatre classes plus en profondeur, puis nous reviendrons à notre ensemble d'applications pour identifier la classe de chacune des politiques suggérées.

## Les quatre classes de politiques

Nous observons d'abord que les quatre classes de politiques peuvent être divisées en deux catégories : la classe de recherche de politique, et la classe d'anticipation. Chacune de celles-ci peut ensuite être subdivisée en deux classes, créant ainsi les quatre classes de politiques. Celles-ci sont décrites plus en détail ci-dessous.

### Recherche de politique

La classe de politiques de « recherche de politique » implique une recherche parmi un ensemble de fonctions de prise de décision afin de trouver la fonction qui fonctionne le mieux en moyenne, en utilisant l'objectif approprié au problème. La plupart du temps, cela signifiera rechercher la meilleure valeur d'un ensemble de paramètres qui caractérisent une politique paramétrée, mais cela signifie également que nous pourrions avoir à évaluer différentes paramétrisations.

Les politiques de recherche de politique peuvent être divisées en deux classes :

- **Approximations de fonction de politique (PFA)** – Ce sont des fonctions analytiques qui associent directement un état à une action. Voici quelques exemples :
    - Une fonction paramétrée telle que la politique « haut-bas » présentée au [Chapitre 2](/sdam/fr/chapter-2/), que nous répétons ici

    $$
    X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
    $$

    où $\theta^{sell-low} = (\theta^{low},\theta^{high})$. D'autres exemples sont la politique de recomplètement que nous avons vue au [Chapitre 1](/sdam/fr/chapter-1/), ainsi que la politique de prévision ajustée.
    - Une fonction linéaire, telle que

    $$
    X^\pi(S_t\vert \theta) = \theta_0 + \theta_1 \phi_1(S_t) + \theta_1 \phi_1(S_t) + \ldots + \theta_F \phi_F(S_t)
    $$

    où $(\phi_f(S_t)),~f=1, \ldots, F$ est un ensemble de caractéristiques (« linéaire » signifie linéaire par rapport au vecteur de paramètres $\theta$ – les caractéristiques $\phi_f(S_t)$ peuvent être fortement non linéaires par rapport à $S_t$). Par exemple, nous pourrions essayer de décider du montant à enchérir pour faire annoncer un film sur un site web, et une caractéristique pourrait être le genre du film ou le nom de l'acteur ou de l'actrice principal(e).

    Les fonctions linéaires (également appelées « politiques affines ») sont populaires, mais notez qu'on ne pourrait pas utiliser une fonction linéaire pour approximer des fonctions en escalier telles que les politiques d'achat au plus bas, vente au plus haut ou de recomplètement illustrées ci-dessus.
    - Des fonctions avancées telles que des fonctions localement linéaires ou des réseaux de neurones, bien que celles-ci comportent généralement un grand nombre de paramètres (les poids d'un réseau de neurones) qu'il faut ajuster.
- **Approximations de fonction de coût (CFA)** – Ce sont des politiques qui nécessitent de résoudre un problème d'optimisation paramétré, où nous pouvons paramétrer soit la fonction objectif, soit les contraintes. Les CFA ouvrent la voie à la résolution de problèmes de décision de haute dimension. Voici quelques exemples :
    - Un exemple simple d'approximation de fonction de coût paramétrée est la politique d'estimation par intervalle que nous avons introduite au [Chapitre 4](/sdam/fr/chapter-4/) et que nous répétons ici

    $$
    X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
    $$

    - Modèles d'optimisation paramétrés – Nous avons vu cela au [Chapitre 6](/sdam/fr/chapter-6/) lorsque nous avons choisi le $\theta$-ième percentile des coûts de liaison. C'est une heuristique largement utilisée dans l'industrie qui a été négligée par la littérature de recherche. Les compagnies aériennes utilisent cette idée pour optimiser le déplacement de leurs avions et de leurs équipages en présence de retards météorologiques importants. Les opérateurs de réseaux électriques planifiant la programmation des générateurs d'énergie insèrent une capacité de réserve pour s'assurer que la demande peut être couverte en cas de défaillance d'un générateur.

Les PFA et les CFA ont tous deux des paramètres qui doivent être ajustés. La seule différence est de savoir si la politique implique ou non un problème d'optimisation intégré. Les deux sont extrêmement puissants et sont largement utilisés dans différents contextes.

### Approximations d'anticipation

Les politiques basées sur des approximations d'anticipation sont construites en approximant les coûts (ou récompenses) en aval résultant d'une décision prise maintenant, qui sont ensuite pris en compte avec le coût (ou la récompense) initial de la décision initiale.

- **Politiques basées sur des approximations de fonction de valeur (VFA)** – Ce sont des politiques basées sur l'équation de Bellman. La forme la plus basique de l'équation de Bellman pour les problèmes déterministes a été présentée pour la première fois au [Chapitre 5](/sdam/fr/chapter-5/) sous la forme

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V_{t+1}(S_{t+1}) \big).
$$

  Il existe de nombreux problèmes où la transition vers $S_{t+1}$ implique une information (contenue dans $W_{t+1}$) qui n'est pas connue au temps $t$, ce qui signifie que $S_{t+1}$ est une variable aléatoire au temps $t$. Dans ce cas, nous devons insérer une espérance comme nous l'avons fait précédemment, ce qui nous donne

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  En pratique, nous devons généralement remplacer la fonction de valeur $V_{t+1}(S_{t+1})$ par une approximation $\Vbar_{t+1}(S_{t+1})$, comme nous l'avons fait dans la section de programmation dynamique approximative du [Chapitre 5](/sdam/fr/chapter-5/). Le domaine qui étudie ces approximations porte des noms tels que programmation dynamique approximative, apprentissage par renforcement (qui provient de l'informatique), et programmation dynamique adaptative (le terme utilisé dans la communauté des contrôles en ingénierie). Dans ce cas, la politique serait donnée par

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \E \{\Vbar_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  Si nous utilisons l'état post-décision $S^x_t$, nous pouvons écrire notre politique comme

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \Vbar^x_t(S^x_t) \big),
$$

  ce que nous avons illustré au [Chapitre 5](/sdam/fr/chapter-5/).

  Nous avons utilisé le problème de plus court chemin déterministe pour illustrer une application où les fonctions de valeur pouvaient être calculées exactement. Cela peut parfois se faire dans des problèmes stochastiques, mais dans la plupart des applications, cela doit être fait de manière approximative. Le défi consiste à effectuer des calculs de qualité suffisamment élevée pour produire des politiques efficaces.

  Une stratégie d'approximation populaire pour les fonctions de valeur consiste à utiliser un modèle linéaire donné par

$$
\begin{align}
\Vbar^x_t(S^x_t\vert \theta^{VFA}) = \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t), \label{eq:hybridlinearvfa}
\end{align}
$$

  où $(\phi_f(S^x_t))\_{f\in\Fcal}$ est un ensemble de caractéristiques défini par l'utilisateur et $\theta^{VFA}$ est un ensemble de paramètres choisis à l'aide d'algorithmes de programmation dynamique approximative.

  Nous ajustons le modèle linéaire en collectant des « observations » de la valeur $\vhat^n_t$ d'être dans l'état $S^n_t$ à la $n$-ième itération. Soit $\thetabar^{VFA,n-1}$ l'estimation de $\theta^{VFA}$ après $n-1$ mises à jour. Il existe des méthodes qui nous permettent d'utiliser $\vhat^n_t$ pour facilement mettre à jour $\thetabar^{VFA,n-1}$ et obtenir $\thetabar^{VFA,n}$. Cela nous donne une politique VFA que nous pouvons écrire comme

$$
\begin{align}
X^{VFA}_t(S_t\vert \theta^{VFA}) &= \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t\vert \theta^{VFA})\big) \nonumber \\
                            &= \argmax_x \left(C(S_t,x) + \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t)\right).
\label{eq:linearvfa}
\end{align}
$$

  L'approximation des fonctions de valeur à l'aide de modèles linéaires a été très populaire, mais il n'existe pratiquement aucune garantie théorique sur la qualité de la solution obtenue. Pire encore, il existe des preuves empiriques que les résultats peuvent être assez médiocres. Pourtant, cette approche reste populaire car elle constitue un moyen facile d'« obtenir un chiffre ».

  Il est également populaire aujourd'hui d'utiliser des réseaux de neurones (en particulier des réseaux de neurones profonds) pour approximer une fonction de valeur. Les réseaux de neurones sont attrayants car ils évitent la nécessité de concevoir l'ensemble de caractéristiques $(\phi_f(S_t))$ pour $f\in\Fcal$. Il faut faire preuve de prudence, en particulier lorsqu'il faut travailler avec des observations bruitées de la fonction de valeur, car la flexibilité massive des réseaux de neurones peut provoquer un surajustement.
- **Approximations d'anticipation directe (DLA)** – Les trois premières classes de politiques nécessitent de trouver une certaine forme d'approximation fonctionnelle : la politique (pour les PFA), la fonction optimisée (pour les CFA), ou la valeur d'être dans un état en aval (pour les VFA). Cependant, il existe de nombreux problèmes pour lesquels ces approximations fonctionnelles ne sont simplement pas possibles.

  La « bonne » façon de résoudre une DLA consiste à résoudre le véritable problème dans le futur, en partant de l'état $S_{t+1}$ produit en commençant dans l'état $S_t$, en prenant l'action $x_t$, et en observant ensuite l'information aléatoire $W_{t+1}$. La partie difficile est qu'en plus de modéliser les incertitudes futures $W_{t+1}, W_{t+2}, \ldots$, nous devons également prendre des décisions optimales $x_{t+1}, x_{t+2}, \ldots$, chacune dépendant de l'état futur $S_{t+1}, S_{t+2}, \ldots$, qui sont aléatoires.

  Bien que ce soit assez complexe (et peut-être intimidant), cette politique signifie résoudre

$$
\begin{align}
X^{\ast }(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\min_{\pi} \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesDLA}
\end{align}
$$

  Si nous pouvions calculer l'équation $\eqref{eq:policiesDLA}$, nous disposerions d'une politique optimale. Il est assez rare que l'équation $\eqref{eq:policiesDLA}$ puisse être résolue exactement. Le problème de plus court chemin stochastique de base du [Chapitre 5](/sdam/fr/chapter-5/) en est un exemple, mais c'est parce que l'incertitude y intervient de manière particulièrement simple.

  Dans la plupart des applications, nous abordons la résolution de $\eqref{eq:policiesDLA}$ en résolvant un modèle d'anticipation approximatif. Au lieu d'écrire notre séquence d'états, de décisions et d'informations sous la forme

$$
(S_0, x_0, W_1, \ldots, S_t, x_t, W_{t+1}, \ldots),
$$

  nous créons un ensemble simplifié d'états, de décisions et d'informations pour un modèle que nous résolvons au temps $t$ que nous représentons à l'aide de

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots),
$$

  où $\Stilde_{tt'}$ est généralement une variable d'état simplifiée pour le modèle d'anticipation que nous créons lors de la prise d'une décision au temps $t$, pour le temps $t'$ dans le modèle d'anticipation. $\xtilde_{tt'}$ est notre décision (éventuellement simplifiée) créée pour le temps $t'$ dans le modèle d'anticipation, et $\Wtilde_{tt'}$ est le processus d'information simplifié au temps $t'$ dans le modèle d'anticipation. Les décisions $\xtilde_{tt'}$ sont prises en utilisant une *politique d'anticipation* $\Xtilde^{\tilde \pi}\_t(\Stilde_{tt'})$ qui est généralement une politique simplifiée choisie parce qu'elle est facile à calculer.

  Notre politique basée sur notre modèle d'anticipation approximatif s'écrirait comme

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA}
\end{align}
$$

  L'équation $\eqref{eq:policiesapproximateDLA}$ est illustrée à l'aide de l'arbre de décision de la Figure 7.1, qui illustre l'utilisation d'états, de décisions et d'incertitudes approximatifs à mesure que nous regardons vers le futur. La création de ces approximations nécessite un mélange d'art et de science. Nous voulons trouver un équilibre entre modéliser le futur avec précision et gérer les exigences de calcul.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticdla.jpg" alt="A stochastic decision tree using approximations of states, decisions and uncertainties." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 7.1.</span> Un arbre de décision stochastique utilisant des approximations des états, des décisions et des incertitudes, en plus d'une politique approximative pour prendre des décisions dans le futur. Les nœuds carrés sont ceux où nous prenons des décisions, tandis que les cercles sont ceux où nous observons l'information exogène.</figcaption>
</figure>

  La conception de la politique d'anticipation $\tilde \pi$ (parfois appelée politique-au-sein-d'une-politique) est hautement dépendante du problème. En fait, nous pouvons utiliser n'importe laquelle de nos quatre classes de politiques. L'essentiel est qu'elle doit être simple sur le plan computationnel, car nous devrons la calculer de nombreuses fois. Rappelez-vous que le modèle d'anticipation n'a pas besoin d'être exact (dans la plupart des cas, nous ne pourrions jamais le résoudre si nous essayions d'utiliser un modèle d'anticipation exact). Nous choisissons plutôt des approximations que nous pensons produire de bonnes décisions maintenant, en approximant des décisions que nous *pourrions* prendre dans le futur.

Nous avons déjà vu des applications de cette approche. Pour le problème de plus court chemin dynamique du [Chapitre 6](/sdam/fr/chapter-6/), nous nous sommes tournés vers l'approche largement utilisée consistant à résoudre un modèle d'anticipation déterministe, où nous prenons la meilleure estimation de ce qui pourrait se produire dans le futur et résolvons un problème d'optimisation déterministe. Cette approche ignore l'effet des incertitudes futures, mais nous avons introduit l'idée d'utiliser un problème d'optimisation déterministe paramétré. Cependant, nous devons régler le paramètre.

Ces quatre classes de politiques (PFA, CFA, VFA et DLA) sont universelles, c'est-à-dire que toute politique choisie pour un problème de décision séquentielle (*n'importe quel* problème de décision séquentielle) appartiendra à l'une de ces quatre classes. Cependant, celles-ci peuvent également servir de blocs de construction pour des politiques hybrides.

Nous avons illustré les quatre classes de politiques, ce qui laisse la question suivante : comment savoir laquelle utiliser ? Parfois, cela semblera évident, comme trouver le meilleur chemin vers une destination. Pour des problèmes de ce type, une anticipation directe est un choix naturel. Mais il existe des problèmes où chacune des quatre classes est un candidat viable.

Deux problèmes pour lesquels nous avons démontré avec succès les quatre classes sont les problèmes de gestion de stock du [Chapitre 1](/sdam/fr/chapter-1/), et le problème d'apprentissage sur le diabète du [Chapitre 4](/sdam/fr/chapter-4/). La clé est de réfléchir attentivement aux quatre classes de politiques, plutôt que de se concentrer sur une seule, ce qui arrive si souvent aujourd'hui.

## Modèles, revisités

Dans cette section, nous allons faire un tour des différentes applications, en commençant d'abord par une revue des variables d'état. Ensuite, nous allons passer en revue les différentes politiques, et classer les politiques que nous avons vues dans les quatre classes.

### Variables d'état, revisitées

Il existe une confusion considérable dans la littérature académique sur ce que l'on entend par variable d'état, comme en témoigne l'absence notable de définitions de ce qu'est une variable d'état dans les ouvrages sur la programmation dynamique, la programmation stochastique et l'apprentissage par renforcement.

La seule exception à ce schéma, qui se démarque vraiment, est la littérature sur le contrôle optimal où les définitions des variables d'état sont assez courantes. Dans la communauté du contrôle, une variable d'état est généralement définie comme « toute l'information dont nous avons besoin au temps $t$ pour modéliser un système à partir du temps $t$ ». Ce qui manque cependant, c'est toute description de ce qu'est précisément l'information nécessaire pour modéliser le système à partir du temps $t$.

Nous définissons deux versions des variables d'état (tirées de *Reinforcement Learning and Stochastic Optimization*, Section 9.4) :

> **Une variable d'état est :**
>
> **a) Version dépendante de la politique** – Une fonction de l'historique qui, combinée à l'information exogène (et à une politique), est nécessaire et suffisante pour calculer la fonction de coût/contribution, la fonction de décision (la politique), et toute information requise par la fonction de transition pour modéliser l'information nécessaire aux fonctions de coût/contribution et de décision.
>
> **b) Version optimisation** – Une fonction de l'historique qui est nécessaire et suffisante pour calculer la fonction de coût/contribution, les contraintes, et toute information requise par la fonction de transition pour modéliser l'information nécessaire à la fonction de coût/contribution et aux contraintes.

Nous avons besoin des deux versions car si nous avons un système où nous avons spécifié la structure d'une politique, nous devons nous assurer d'inclure toute information nécessaire à la politique. Par exemple, nous pouvons avoir un problème de gestion de stock, où nous considérons deux politiques : l'une utilise une prévision des demandes futures, tandis que l'autre utilise simplement une politique de complément jusqu'à un seuil. Bien qu'une prévision semble certainement pertinente, si nous utilisons une politique de complément jusqu'à un seuil, nous n'utilisons pas la prévision, et par conséquent elle ne figurerait pas dans la variable d'état.

Il est utile de faire un tour de nos applications jusqu'à présent et de revoir les variables d'état pour chacune d'elles. Pour chaque application, nous allons résumer la variable d'état, que nous pourrions écrire comme $S_t$ ou $S^n$ selon le contexte, et nous allons classer les éléments en variables d'état physiques $R_t$, variables informationnelles $I_t$, et variables d'état de croyance $B_t$.

**Chapitre 1 –** Ce chapitre a introduit deux problèmes de gestion de stock qui ont également été conçus pour faire ressortir différentes saveurs de variables d'état. Le problème de stock simple était caractérisé par une variable d'état $S_t$ qui consiste uniquement dans le stock $R^{inv}\_t$ au temps $t$. Ce problème est l'une des applications les plus largement utilisées pour illustrer la programmation dynamique.

Le problème de stock plus complexe nécessitait une variable d'état

$$
S_t = (\underbrace{R^{inv}_t}_{R_t},\underbrace{c_t}_{I_t},\underbrace{f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t}_{B_t}).
$$

Cette variable d'état illustre les trois classes d'information dans les variables d'état : les variables d'état physiques $R_t = R^{inv}\_t$, les autres informations $I_t = c_t$, et les variables d'état de croyance $B_t = (f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t)$ où $(f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t)$ capture la moyenne prévue et l'écart-type de l'erreur de la demande future $\Dhat_{t+1}$, ainsi que l'écart-type du changement des prévisions du temps $t$ au temps $t+1$ (nous supposons que le changement des prévisions a une moyenne nulle).

**Chapitre 2 –** Ce chapitre a introduit un problème simple de vente d'actif avec la variable d'état

$$
S_t = (R^{asset}_t, p_t).
$$

où la variable d'état physique $R_t$ capture si nous détenons encore l'actif ou non (elle aurait également pu contenir le nombre d'actions détenues), et l'état informationnel $I_t = p_t$ est le prix auquel nous vendons l'action.

Nous avons également introduit l'idée de calculer une estimation lissée du prix de l'actif en utilisant

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Nous avons ensuite conçu une politique qui prenait des décisions en fonction de l'écart entre le prix $p_t$ et cette estimation lissée. Maintenant notre variable d'état devient

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,\pbar_t)}_{I_t}\big).
$$

Maintenant imaginez que lorsque nous décidons de vendre notre action au temps $t$, nous vendons à un prix inconnu $p_{t+1}$ qui évolue selon

$$
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1},
$$

où $\varepsilon_{t+1}$ est un terme de bruit de moyenne nulle. Maintenant notre variable d'état ressemblerait à

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,p_{t-1},p_{t-2})}_{I_t}\big).
$$

**Chapitre 3 –** Ici, nous avons décrit un algorithme de recherche basé sur le gradient qui évolue selon une itération classique de recherche stochastique donnée par

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \nabla_x F(x^n,W^{n+1}).  \label{eq:stochasticgradientaltransitionrevisited}
\end{align}
$$

Cette procédure est une méthode de recherche de la meilleure valeur de $x$, mais il s'agit d'un problème de décision séquentielle où le pas $\alpha_n$ est la décision. Si nous choisissons le pas avec une formule déterministe telle que $\alpha_n =1/n$, alors l'« état » de notre procédure de recherche est

$$
S^n = (x^n).
$$

Cependant, nous pourrions utiliser une formule de pas adaptative (stochastique) telle que

$$
\begin{align}
\alpha_n = \frac{\theta}{\theta + N^n - 1} \label{eq:adaptivealpharevisited}
\end{align}
$$

où $N^n$ est le nombre de fois où le gradient $\nabla_x F(x^n,W^{n+1})$ change de direction, alors nous devons connaître $N^n$, et notre variable d'état devient

$$
S^n = (x^n,N^n).
$$

**Chapitre 4 –** Notre problème de diabète est une instance d'un problème d'apprentissage pur, où nous essayons d'apprendre la véritable réponse $\mu_x$ d'un patient à un médicament. Après avoir essayé plusieurs médicaments, nous pourrions capturer notre croyance en utilisant l'état

$$
S^n = (\underbrace{\mubar^n_x, \sigmabar^n_x}_{B^n})_{x\in\Xcal},
$$

où nous supposons que la véritable réponse $\mu_x \sim N(\mubar^n_x, (\sigmabar^n_x)^2)$.

Ce modèle de croyance pourrait fonctionner si nous avons une croyance différente pour chaque patient, mais nous partons probablement avec un ensemble de connaissances sur la façon dont le médicament agit sur l'ensemble des patients. Nous pourrions capturer cela dans un état initial

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal}.
$$

Maintenant imaginez que le $n$ème patient arrive avec des attributs $a^n$ (sexe, poids, antécédents tabagiques, ...). La réponse du patient au médicament $x$ dépendrait à la fois du médicament et des attributs du patient. Cela signifie que notre variable d'état (c'est-à-dire l'information dont nous disposons pour prendre la décision) est constituée d'informations que nous ne contrôlons pas (les attributs du patient $a^n$), et d'informations que nous contrôlons (le choix du médicament $x^n$). Nous écririons donc notre variable d'état (l'information que nous utilisons pour prendre la décision) comme

$$
S^n = (\underbrace{a^n}_{I^n}, \underbrace{(\mubar^n_x, \sigmabar^n_x)}_{B^n})_{x\in\Xcal},
$$

où nous avons décidé de placer $a^n$ dans notre variable d'état informationnelle $I^n$, et les variables $(\mubar^n_x, \sigmabar^n_x)$ dans la variable d'état de croyance $B^n$.

**Chapitre 5 –** Pour notre problème de plus court chemin stochastique, nous avons commencé par un problème de base où un voyageur encourt un coût aléatoire en traversant un lien, mais ne connaît que la moyenne et la variance des coûts avant de décider au nœud $i$ quel lien $(i,j)$ traverser. Pour ce problème, l'état de notre voyageur est simplement le nœud $N_t$ où il se trouve après avoir traversé $t$ liens, ce qui nous donne

$$
S_t = N_t.
$$

Nous sommes ensuite passés à un problème où le voyageur au nœud $i$ peut voir les coûts réels $\chat_{tij}$ qui seraient encourus s'il devait voyager sur le lien $(i,j)$. Avec cette information supplémentaire, la variable d'état devient

$$
S_t = \left(\underbrace{N_t}_{R_t},(\underbrace{\chat_{t, N_t, j}}_{I_t})_{j\in\Ncal^+_i}\right).
$$

**Chapitre 6 –** Nous avons considéré un problème de plus court chemin dynamique où le coût estimé sur le lien $(i,j)$, $\cbar_{tij}$, évolue dans le temps. C'est-à-dire qu'au temps $t+1$, nous supposons qu'un ensemble mis à jour d'estimations nous est donné, que nous noterions $\cbar_{t+1}$. Imaginez que notre voyageur soit au nœud $N_t= i$. L'état de notre système (pour notre voyageur) serait alors donné par

$$
S_t = (\underbrace{N_t}_{R_t}, \underbrace{\cbar_t}_{I_t}).
$$

Maintenant imaginez que nous montrons au voyageur un chemin que nous désignons par $p_t$, qui est l'ensemble des liens que nous prévoyons emprunter pour aller de son nœud actuel $N_t$ jusqu'à la destination. Disons que nous venons de mettre à jour le chemin, et que nous avons demandé au voyageur s'il accepte le nouveau chemin. S'il dit oui, le système de navigation continuera à se ré-optimiser, mais introduira un petit bonus pour rester avec le dernier chemin $p_t$ que le voyageur vient d'accepter (ceci est fait pour empêcher le système d'osciller entre deux chemins presque équivalents).

Si $p_t$ est le chemin le plus récemment accepté, alors ceci est une information dont nous avons besoin pour prendre des décisions dans le futur. Dans ce cas, notre variable d'état devient

$$
S_t = (\underbrace{N_t}_{R_t}, (\underbrace{\cbar_t,p_t}_{I_t})).
$$

Ces problèmes de décision ont illustré les trois types de variables d'état : les variables d'état physiques $R_t$, les variables d'état informationnelles $I_t$, et les variables d'état de croyance $B_t$. Nous avons vu des problèmes qui n'ont que $R_t$, ou seulement $B_t$, et des combinaisons avec $I_t$ telles que $(R_t, I_t)$ et $(I_t, B_t)$, ainsi que les trois ensemble $(R_t, I_t, B_t)$. Nous soulignons que la distinction entre $R_t$ et $I_t$ peut parfois être arbitraire, mais il existe tant de problèmes impliquant la gestion de ressources physiques ou financières (acheter, vendre, déplacer, modifier), avec des décisions qui affectent (ou sont contraintes par) des ressources physiques ou financières, que nous avons jugé nécessaire de créer une classe spéciale juste pour les ressources.

Nous pensons qu'il existe de nombreux problèmes impliquant de l'incertitude qui impliquent également de l'apprentissage, et qui peuvent impliquer un apprentissage actif puisque les décisions peuvent avoir un impact sur ce que nous observons (comme dans l'exemple du diabète). Nous soupçonnons qu'à mesure que les modélisateurs se familiariseront avec l'inclusion de variables d'état de croyance dans les problèmes de décision séquentielle, nous les verrons utilisées plus souvent.

### Politiques, revisitées

Nos six contextes d'application (et dans certains cas les extensions) ont été choisis pour exposer chacune des quatre classes de politiques. Ci-dessous, nous passons en revue les différentes politiques et identifions la classe à laquelle elles appartiennent.

**Chapitre 1 –** Nous avons introduit deux problèmes de gestion de stock. L'un utilisait une politique de complément jusqu'à un seuil de la forme

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases}
$$

tandis que le second utilisait une politique consistant à amener le stock jusqu'à la demande prévue plus une marge

$$
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta.
$$

Ces deux politiques impliquent un ou deux paramètres ajustables. Les deux sont des fonctions analytiques qui ne comportent pas d'opérateur d'optimisation intégré ($\min$ ou $\max$). Ce sont les caractéristiques distinctives d'une approximation de fonction de politique (PFA).

**Chapitre 2 –** Ce chapitre a abordé le problème consistant à déterminer quand vendre un actif. Plusieurs politiques ont été suggérées, mais des échantillons représentatifs sont la politique de « vente basse » donnée par

$$
X^{sell-low}(S_t\vert \theta^{low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ and } R_t = 1, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

et la « politique de suivi »

$$
X^{track}(S_t\vert \theta^{track}) = \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Ces deux politiques sont similaires à notre politique de commande de complément jusqu'à un seuil du stock en ce sens qu'elles sont des fonctions paramétriques avec des paramètres ajustables, ce qui signifie qu'elles sont des exemples supplémentaires d'approximation de fonction de politique (PFA). Bien que cela soit loin d'être la seule façon de résoudre un problème de vente d'actif, cette classe de politique est assez populaire à Wall St.

Les PFA sont populaires en pratique en raison de leur simplicité et de leur transparence, mais il est important de garder à l'esprit : *Le prix de la simplicité, ce sont des paramètres ajustables... et l'ajustement est difficile !*

**Chapitre 3 –** La planification adaptative des marchés – Ce problème implique l'utilisation d'une méthode de recherche par gradient très répandue (voir l'équation $\eqref{eq:stochasticgradientaltransitionrevisited}$) où le pas $\alpha_n$ est la décision. Si nous avions un problème déterministe, nous calculerions $\alpha_n$ en résolvant le problème d'optimisation unidimensionnel

$$
\alpha_n = \argmax_{\alpha \geq 0} \big(F(x^n + \alpha \nabla_x F(x^n))\big),
$$

qui est une forme d'approximation d'anticipation directe (DLA). Cependant, lorsqu'il faut composer avec l'incertitude, une recherche unidimensionnelle implique de pouvoir calculer l'espérance $F(x) = \E F(x,W)$, ce qui n'est généralement pas possible en pratique. Nous pourrions plutôt utiliser une politique déterministe telle que

$$
\alpha^\pi_n(\theta) = \frac{\theta}{\theta+n-1},
$$

où nous l'avons écrite sous forme de fonction paramétrée (c'est-à-dire une forme de PFA). Nous avons également illustré une politique adaptative (dépendante de l'état) donnée par l'équation $\eqref{eq:adaptivealpharevisited}$, où nous avons remplacé $n$ par un compteur $N^n$ qui comptabilise le nombre de fois où le gradient change de direction (ou nous pourrions compter le nombre de fois où la fonction objectif ne s'améliore pas). Nous écririons cette politique comme

$$
\alpha^\pi_n(S^n\vert \theta) = \frac{\theta}{\theta+N^n-1},
$$

où notre état $S^n$ porte l'information $N^n$.

Remarque : les politiques de type PFA sont universellement utilisées dans les algorithmes de gradient stochastique. Bien qu'elles soient peut-être effectivement les meilleures, la réalité est que personne n'a même essayé d'utiliser les trois autres classes de politiques. Cela pourrait valoir le coup d'y jeter un œil.

**Chapitre 4 –** Apprendre le meilleur traitement du diabète – Il s'agit d'un problème d'apprentissage pur que nous avons abordé en utilisant la classe de politiques très populaire connue sous le nom de bornes de confiance supérieures (upper confidence bounding). L'une des politiques UCB les plus connues est peut-être donnée par

$$
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right).
$$

Une autre variante qui fonctionne très bien a été introduite à l'origine sous le nom d'estimation par intervalle, donnée par

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
$$

Enfin, une variante initialement découverte en 1933 puis redécouverte quelques années plus tard est l'échantillonnage de Thompson, donné par

$$
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x.
$$

où $\muhat^n_x$ est échantillonné aléatoirement à partir d'une distribution normale de moyenne $\mubar^n_x$ et de variance $\theta^{TS} \sigmabar^n_x$.

Notez que ces trois politiques partagent deux caractéristiques : un opérateur d'optimisation (un $\argmax_x$ pour ces politiques) et un paramètre ajustable. Celles-ci peuvent être vues comme des problèmes d'optimisation paramétrés, qui appartiennent à la classe des approximations paramétriques de fonction de coût (ou CFA).

Les politiques CFA sont largement utilisées en pratique, mais elles ont reçu très peu d'attention dans la littérature académique en dehors de l'application spécifique des politiques d'apprentissage telles que notre application au diabète. Nous verrons cette idée appliquée dans un cadre très différent dans les chapitres suivants.

**Chapitre 5 –** Plus courts chemins stochastiques statiques – Notre premier problème de plus court chemin stochastique supposait qu'un voyageur encourait des coûts stochastiques, mais que ceux-ci n'étaient connus qu'après avoir traversé un lien. Cette hypothèse nous a permis de résoudre le problème comme un problème de plus court chemin déterministe, facilement résolu grâce à l'équation de Bellman, nous donnant une politique donnée par

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\cbar_{tij} + V_{t+1}(S_{t+1}=j)\big).
$$

où $S_t = N_t = i$ est le nœud où se trouve le voyageur. Les fonctions de valeur $V_t(S_t)$ sont calculées en remontant dans le temps, en partant de $t=T$ où nous fixons $V_T(S_T) = 0$ pour tous les nœuds $S_T$. Il s'agit d'une forme de politique basée sur des approximations de fonction de valeur, et c'est un cas rare où une politique VFA est effectivement optimale.

Nous sommes ensuite passés à un problème plus difficile où un voyageur est autorisé à voir les coûts $\chat_{tij}$ sortant du nœud $i = N_t$. Pour ce problème, la variable d'état devient $S_t = (N_t, (\chat_{t,N_t,j},~j\in\Ncal^+\_i))$. Pour ce problème, nous avons dû approximer la fonction de valeur en utilisant l'état post-décision $S^x_t = N^x_t$, où $N^x_t$ est le nœud vers lequel nous avons choisi de nous rendre après avoir pris notre décision $x_t$ lorsque nous sommes au nœud $N_t$. Dans ce cas, notre politique ressemblait à

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\chat_{tij} + \Vbar^x_t(S^x_t)\big).
$$

Il s'agit là encore d'une politique basée sur une VFA, mais cette fois elle n'est plus optimale puisque $\Vbar^x_t(S^x_t)$ est une approximation que nous avons dû estimer à partir des données. Avec un peu de soin, cependant, nous pouvons concevoir une politique asymptotiquement optimale.

**Chapitre 6 –** Plus courts chemins stochastiques dynamiques – C'est ici que nous rencontrons un problème où le coût estimé sur chaque lien $\cbar_{tij}$ évolue dans le temps. Ainsi, au temps $t$, $\cbar_t$ est le vecteur des coûts de lien estimés, qui devient $\cbar_{t+1}$ à la période suivante. Cela signifie que notre variable d'état passe de $S_t = N_t$, qui n'est que le nœud où se trouve le voyageur, à $S_t = (N_t, \cbar_t)$, qui est une variable d'état de très grande dimension. Ce n'est pas un problème que nous pouvons aborder même avec la programmation dynamique approchée (il est difficile d'envisager une VFA construite autour de cette variable d'état).

Nous proposons plutôt l'idée d'utiliser un modèle d'anticipation, où nous ignorons le fait qu'à mesure que le voyageur progresse dans le réseau, le vecteur des coûts de lien estimés $\cbar_t$ évoluera dans le temps. Nous pouvons plutôt supposer qu'il est fixe (et supposons qu'il est déterministe). Cela signifie que nous disposons désormais d'un modèle d'anticipation qui est, en fait, un problème de plus court chemin déterministe, mais il faut se rappeler que nous optimisons un modèle d'anticipation approché, ce qui constitue une politique DLA. Bien sûr, nous savons comment faire cela de manière optimale, mais une solution optimale à un modèle d'anticipation approché n'est pas une politique optimale !

Les anticipations déterministes sont populaires, mais il existe un moyen de les améliorer encore, sans les rendre plus compliquées. Nous avons introduit cette idée en suggérant d'utiliser le $\theta$-ième percentile du coût plutôt que la moyenne $\cbar_t$. Soit $\ctilde_{tij}(\theta)$ le $\theta$-ième percentile du coût sur le lien $(i,j)$ compte tenu de ce que nous savons au temps $t$. Résolvons maintenant un modèle d'anticipation déterministe en utilisant les coûts $\ctilde_{tij}(\theta)$. Nous avons désormais un modèle d'anticipation déterministe paramétré, qui est un hybride entre une CFA paramétrique et une DLA.

## Objectifs en ligne vs. hors ligne

Il existe deux perspectives pour évaluer la performance d'une politique :

- **Apprentissage en ligne** – Il existe de nombreux contextes où nous devons apprendre au fur et à mesure sur le terrain. Par exemple, nous pourrions essayer d'apprendre le meilleur prix pour un produit, le meilleur chemin à travers une ville congestionnée, ou le meilleur médicament pour un patient afin de faire baisser sa tension artérielle. Dans chacun de ces cas, nous voulons faire aussi bien que possible compte tenu de ce que nous savons, mais nous sommes encore en train d'apprendre afin de pouvoir prendre de meilleures décisions à l'avenir. Cela signifie que nous devons maximiser la *récompense cumulée* au fil du temps (ou des itérations) afin de refléter la qualité de nos performances pendant l'apprentissage.
- **Apprentissage hors ligne** – Dans d'autres cas, nous pouvons apprendre dans un cadre de laboratoire, qui peut être un laboratoire physique (pour tester différents matériaux ou observer la performance d'un médicament sur des souris), un simulateur informatique, ou même un contexte de terrain exploité comme un marché test (pour évaluer un produit) ou un essai clinique (pour tester des médicaments). Si nous apprenons dans un environnement de laboratoire (« hors ligne »), nous sommes disposés à procéder par essais et erreurs sans nous soucier de notre performance en cours de route. Tout ce qui nous importe alors, c'est la qualité de la solution finale, ce qui signifie que nous voulons optimiser la *récompense finale*.

Un mot de prudence concernant les termes en ligne et hors ligne. Dans la communauté de l'apprentissage automatique, « hors ligne » fait référence à l'estimation de modèles à partir d'un unique jeu de données par lots (batch). En revanche, l'apprentissage en ligne désigne des contextes entièrement séquentiels où les données arrivent au fil du temps. Il s'agit généralement de situations de terrain où les données sont générées par un processus exogène (comme l'observation de patients arrivant au cabinet d'un médecin), ce qui correspond au même contexte que celui que nous supposons en utilisant le terme « en ligne ». Cependant, en apprentissage automatique, le terme « en ligne » continuerait à être utilisé pour désigner un algorithme itératif employé dans une simulation.

Des domaines entiers traitant des problèmes de décision séquentielle se distinguent selon qu'ils se concentrent sur la récompense finale ou la récompense cumulée. Par exemple, les communautés travaillant sur la « recherche stochastique » ont tendance à se concentrer sur la récompense finale, tandis que les communautés travaillant sur les « problèmes de bandits multibras » (une forme de problème de recherche stochastique) optimisent généralement la récompense cumulée. En réalité, on peut utiliser la même politique pour l'un ou l'autre objectif, mais il faut l'ajuster en fonction de l'objectif choisi.

### Optimisation en ligne (récompense cumulée)

C'est généralement le cas, lors d'une recherche de politique, que nous disposons d'une politique paramétrée que nous pouvons écrire comme $X^\pi(S_t\vert \theta)$. La décision $x_t = X^\pi(S_t\vert \theta)$ pourrait être le prix d'un produit, le choix d'un médicament contre l'hypertension ou l'enchère placée pour maximiser les clics publicitaires. Dans tous ces cas, nous devons apprendre au fur et à mesure, ce qui signifie que nous devons maximiser la performance pendant que nous apprenons.

Soit $C(S_t,x_t)$ notre mesure de performance (revenu, réduction de la tension artérielle, ou revenu net des clics publicitaires). Nous voulons trouver $\theta$ qui produit la politique $X^\pi(S_t\vert \theta)$ résolvant le problème d'optimisation

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S_0} \E_{W_1, \ldots, W_T\vert S_0} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}, \label{eq:derivativebasedonline}
\end{align}
$$

où $S_{t+1} = S^M(S_t, X^\pi(S_t\vert \theta),W_{t+1})$. L'espérance dans $\eqref{eq:derivativebasedonline}$ porte sur toutes les réalisations possibles de $W_1, \ldots, W_T$, ainsi que sur les valeurs possibles des paramètres incertains (tels que des croyances initiales incertaines sur les réponses du marché ou sur la manière dont une personne répond à un médicament) contenus dans l'état initial $S_0$.

L'équation $\eqref{eq:derivativebasedonline}$ est un exemple de fonction objectif « en ligne » ou de « récompense cumulée », puisque nous voulons maximiser la somme de toutes les récompenses sur un certain horizon. Cela présente un intérêt particulier pour les problèmes d'apprentissage en ligne où nous devons apprendre la performance, comme le revenu généré par un prix ou l'efficacité d'un médicament pour un patient particulier, ce qui implique d'équilibrer le processus d'apprentissage tout en essayant de faire aussi bien que possible.

### Optimisation hors ligne (récompense finale)

Dans les contextes hors ligne, nous disposons généralement d'un budget de $N$ expériences. Un problème classique (bien qu'inapproprié) souvent utilisé pour illustrer l'apprentissage hors ligne sans dérivée est le problème du vendeur de journaux (newsvendor), que nous avons abordé au [Chapitre 3](/sdam/fr/chapter-3/). Pour rappel, le problème du vendeur de journaux s'écrit

$$
F(x) = \E_W \big(p \min\{x,W\} - cx\big),
$$

où $x$ est la quantité de ressource que nous commandons à un coût unitaire $c$, qui est ensuite utilisée pour satisfaire la demande $W$ (inconnue au moment où nous choisissons $x$). Nous supposons que la distribution de $W$ est inconnue.

Soit $x^n = X^\pi(S^n\vert \theta)$ notre choix de $x$ compte tenu de ce que nous savons, capturé par $S^n$, où notre politique $X^\pi(S^n\vert \theta)$ dépend d'un ou plusieurs paramètres contenus dans $\theta$. Après avoir mis en œuvre $x^n$, nous observons $W^{n+1}$, mettons à jour $S^{n+1}$, puis répétons le processus. Après $N$ itérations, nous obtenons une conception finale que nous notons $x^{\pi,N}(\theta)$.

Nous devons maintenant évaluer notre conception finale $x^{\pi,N}(\theta)$. Pour effectuer cette évaluation, nous devons considérer deux, voire trois, sources d'incertitude. La première est que nous pouvons avoir une incertitude sur des paramètres inconnus tels que la moyenne de $W$. Par exemple, $W$ pourrait provenir d'une distribution de Poisson de moyenne $\mu$, et nous pourrions supposer que $\mu \in \lbrace \mu_1, \ldots, \mu_K\rbrace $ où $p_k = Prob[\mu = \mu_k]$. La distribution $(p_k)\_{k=1}^K$ est contenue dans l'état initial $S_0$.

Nous avons ensuite les arrivées aléatoires des demandes $W^1, \ldots, W^N$, qui seraient échantillonnées à partir d'une distribution de moyenne $\mu$. Nous utilisons ces observations, ainsi que la politique $X^\pi(S^n\vert \theta)$, pour calculer $x^{\pi,N}(\theta)$. Il est important de reconnaître que $x^{\pi,N}(\theta)$ est une variable aléatoire qui dépend de toute information contenue dans $S^0$ (qu'elle soit déterministe ou aléatoire).

Une fois que nous avons calculé $x^{\pi,N}(\theta)$, nous devons exécuter une dernière série de simulations pour évaluer son efficacité. Nous introduisons une nouvelle variable aléatoire, $\What$, pour représenter des échantillons de $W$ utilisés pour évaluer notre conception finale.

Cette notation nous permet d'écrire notre fonction objectif pour l'apprentissage hors ligne comme

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S^0} \E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(x^{\pi,N}(\theta),\What).\label{eq:derivativebasedoffline}
\end{align}
$$

Nous soulignons que nous écrivons les espérances simplement comme une manière d'indiquer que nous devons faire une moyenne sur les informations aléatoires. Nous abordons ensuite le problème du calcul de ces espérances.

### Évaluation des politiques

Les fonctions objectif pour la récompense cumulée (donnée en $\eqref{eq:derivativebasedonline}$) et la récompense finale (donnée en $\eqref{eq:derivativebasedoffline}$) ont toutes deux été écrites à l'aide d'espérances, ce qui est notre façon d'indiquer que nous effectuons une moyenne sur tout ce qui est aléatoire. C'est agréable à écrire mathématiquement, mais ces expressions ne sont pratiquement jamais calculables.

Chaque fois que nous devons prendre une espérance, il est utile de supposer que nous allons estimer l'espérance par échantillonnage. Nous illustrons d'abord comment procéder pour la fonction objectif de récompense cumulative telle que donnée dans $\eqref{eq:derivativebasedonline}$. Ici, nous pourrions avoir une quantité incertaine dans l'état initial $S_0$, comme l'incertitude sur la façon dont un marché répond au prix, la production de méthane par un puits de pétrole, ou la façon dont un patient pourrait répondre à un médicament. Ensuite, nous avons l'information exogène $W_1, \ldots, W_T$, qui pourrait être des observations de ventes, le changement des températures atmosphériques, ou la façon dont un patient répond à un traitement médicamenteux.

Soit $\omega$ une réalisation d'échantillon de toutes ces quantités incertaines. Supposons que nous générions un ensemble d'échantillons de toutes ces quantités incertaines et que nous les stockions dans un ensemble $\Omega = \lbrace \omega^1, \ldots, \omega^K\rbrace $. Ainsi, chaque fois que nous écrivons $W_t(\omega)$, il s'agit d'une réalisation d'échantillon de ce que nous observons au temps $t$. Si nous utilisons une politique $X^\pi(S_t\vert \theta)$, alors nous suivrions le chemin d'échantillon des états $S_t(\omega)$, des décisions $x_t(\omega) = X^\pi(S_t(\omega)\vert \theta)$ et de l'information exogène $W_{t+1}(\omega)$ régi par notre fonction de transition

$$
S_{t+1}(\omega) = S^M(S_t(\omega), x_t(\omega), W_{t+1}(\omega)).
$$

En utilisant notre ensemble d'observations d'échantillon $\Omega$, nous pouvons approximer notre espérance $F^\pi(\theta)$ en utilisant

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \sum_{k=1}^K \sum_{t=0}^T C(S_t(\omega^k),X^\pi(S_t(\omega^k)\vert \theta)). \label{eq:simulatedcumulativereward}
\end{align}
$$

Si nous utilisons une fonction objectif de récompense finale, nous devons d'abord estimer $x^{\pi,N}(\theta)$. Si nous suivons le chemin d'échantillon $\omega$, alors nous écririons notre conception finale comme $x^{\pi,N}(\omega\vert \theta)$, où $\omega$ capture tout ce que nous avons utilisé pour réaliser l'entraînement donné par $(S_0(\omega), W_1(\omega), \ldots, W_T(\omega))$.

Nous devons ensuite évaluer notre conception $x^{\pi,N}(\omega\vert \theta)$ en utilisant les données de test capturées dans $\What$. Soit $\psi$ une réalisation d'échantillon de $\What$, et tout comme nous avons supposé disposer d'un ensemble d'échantillons $\Omega$ pour $\omega$, supposons que nous créions un ensemble de résultats d'échantillon de $\What$ donné par $\Psi = \lbrace \psi^1, \ldots, \psi^L\rbrace $. Gardez à l'esprit que $\What$ représente toute information simulée dont nous avons besoin pour évaluer notre conception $x^{\pi,N}$. Il peut s'agir d'un ensemble de variables aléatoires (attributs des patients, météo, conditions de marché), et cela peut même représenter une information qui évolue dans le temps. En d'autres termes... n'importe quoi.

Nous pouvons maintenant écrire l'estimation de la performance de la politique dans un cadre de récompense finale comme

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \frac{1}{L} \sum_{k=1}^K \sum_{\ell=1}^L F(x^{\pi,N}(\omega^k),\What(\psi^\ell)). \label{eq:simulatedfinalreward}
\end{align}
$$

### Les réunir

L'équation $\eqref{eq:derivativebasedonline}$ illustre une fonction objectif en ligne, ou de récompense cumulative, où nous devons maximiser la performance totale pendant le processus d'apprentissage. L'équation $\eqref{eq:derivativebasedoffline}$ illustre la fonction objectif hors ligne, ou de récompense finale, où nous devons rechercher la meilleure conception qui fonctionnera au mieux en moyenne après avoir fixé la conception. Ce qui est important pour l'instant, c'est que les deux problèmes impliquent de résoudre

$$
\begin{align}
\max_\theta F^\pi(\theta), \label{eq:searchovertheta}
\end{align}
$$

où $F(\theta)$ est une fonction inconnue que nous pouvons échantillonner de manière bruitée.

Nous pouvons élargir la fonction objectif dans $\eqref{eq:searchovertheta}$ pour inclure une recherche sur différentes classes de politiques. Soit $\Fcal$ l'ensemble de tous les types possibles de politiques, y compris les grandes classes (PFA, CFA, VFA et DLA), ainsi que les différentes fonctions au sein de chacune de ces classes. Puis soit $\Theta^f$ l'ensemble de tous les vecteurs de paramètres possibles $\theta$ correspondant à la classe de politique $f\in\Fcal$ que nous avons choisie. Dans ce cas, nous pouvons écrire notre problème d'optimisation comme

$$
\max_{\pi=(f\in\Fcal, \theta\in\Theta^f)} F^\pi(\theta).
$$

En pratique, nous avons tendance à choisir la classe de politique $f\in\Fcal$ en utilisant l'intuition et une compréhension de la structure du problème, mais cela n'est pas toujours évident. Nous encourageons les lecteurs à être prêts à utiliser l'intuition et le bon sens, mais à être conscients des quatre classes. Cela ne signifie pas que vous devez tester les quatre classes, mais vous devriez être prêt à défendre le choix que vous avez fait.

Nous nous tournons ensuite vers le problème de l'optimisation sur $\theta$, que nous supposons continu et, dans la plupart des cas, vectoriel. Il existe deux grandes classes de méthodes de recherche que nous pouvons appliquer pour trouver $\theta$ : celles basées sur les dérivées, et celles sans dérivées.

### Dépendance à l'état initial

Que nous utilisions une fonction objectif de récompense cumulative (comme l'équation $\eqref{eq:derivativebasedonline}$) ou de récompense finale (comme l'équation $\eqref{eq:derivativebasedoffline}$), notre optimisation de $\theta$ dépendra de l'état initial $S_0$. Cela signifie que le changement d'information dans $S_0$ a le potentiel de changer nos résultats, y compris le choix de la politique.

L'état initial $S_0$ contient toute information qui affecte de quelque manière que ce soit le comportement du système. Il peut inclure des paramètres déterministes, des distributions sur des paramètres incertains, et même la position de départ de l'algorithme de recherche.

La dépendance des solutions optimales à l'information dans $S_0$ est largement négligée dans la littérature algorithmique. Il serait agréable de pouvoir calculer la fonction $\theta(S_0)$ pour capturer cette dépendance, mais l'estimation de cette fonction est intraitable. Cela signifie que si $S_0$ change, nous devrons peut-être réoptimiser $\theta$. Cela serait acceptable, sauf qu'il existe de nombreuses situations où $S_0$ change, et où nous ne réoptimisons pas $\theta$ simplement parce que cela peut être assez difficile.

C'est quelque chose dont le lecteur doit être conscient.

## Recherche de politique basée sur les dérivées

Supposons que nous essayons de résoudre le problème

$$
\begin{align}
\max_\theta F(\theta),  \label{eq:maxFtheta}
\end{align}
$$

où $F(\theta)$ est une fonction paramétrique en $\theta$. Supposons en outre que $\theta$ soit un vecteur et que nous puissions calculer le gradient

$$
\nabla_\theta F(\theta) = \begin{pmatrix} \frac{\partial F(\theta)}{\partial \theta_1} \\ \frac{\partial F(\theta)}{\partial \theta_2} \\ \vdots \\ \frac{\partial F(\theta)}{\partial \theta_K} \end{pmatrix}.
$$

En pratique, le calcul exact des dérivées n'est souvent pas possible.

Une méthode utile pour gérer des vecteurs de paramètres de dimension supérieure est *l'approximation stochastique par perturbation simultanée* (ou SPSA) développée par Spall (2003), qui approxime les gradients comme suit. Soit $Z_p, p=1, \ldots, P$, un échantillon de réalisations de variables aléatoires (elles peuvent être distribuées normalement) de moyenne 0. Soit $Z^n$ le vecteur de dimension $p$ contenant les réalisations pour l'itération $n$. Nous approximons le gradient en perturbant $x^n$ par le vecteur $Z$ en utilisant $x^n+\eta^nZ^n$ et $x^n-\eta^nZ^n$, où $\eta^n$ est un paramètre d'échelle qui peut être constant sur les itérations, ou peut varier (typiquement, il diminuera).

Soit maintenant $W^{n+1,+}$ et $W^{n+1,-}$ deux échantillons différents des variables aléatoires pilotant la simulation (ceux-ci peuvent être générés à l'avance ou à la volée). Nous exécutons ensuite notre simulation deux fois : une fois pour trouver $F(x^n + \eta^nZ^n,W^{n+1,+})$, et une fois pour trouver $F(x^n - \eta^nZ^n,W^{n+1,-})$. L'estimation du gradient est alors donnée par

$$
\begin{align}
\nabla_\theta F(\theta^n,W^{n+1}) \approx \begin{bmatrix}
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_1} \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_2} \\[6pt]
\vdots \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_P}
\end{bmatrix}. \label{eq:SPSAgradient}
\end{align}
$$

Notez que le numérateur de chaque élément du gradient dans l'équation $\eqref{eq:SPSAgradient}$ est le même, ce qui signifie que nous n'avons besoin que de deux évaluations de fonction : $F(x^n + \eta^nZ^n,W^{n+1,+})$ et $F(x^n - \eta^nZ^n,W^{n+1,-})$. La seule différence est le $Z^n_p$ au dénominateur pour chaque dimension $p$ (c'est là toute la magie du SPSA). (Voir *Reinforcement Learning and Stochastic Optimization*, Chapitre 5, section 5.4.4 pour une présentation du SPSA.)

Un bref mot de prudence concernant la « magie » du SPSA : les gradients peuvent être assez bruités. Pour cette raison, une stratégie courante consiste à exécuter plusieurs simulations (appelées mini-lots dans la littérature) de chaque simulation perturbée et à les moyenner. La taille appropriée des mini-lots dépend des caractéristiques du problème, alors attendez-vous à passer du temps à ajuster ce paramètre.

Quelle que soit la façon dont nous calculons le gradient, notre algorithme de recherche (que nous avons vu dans le [Chapitre 3](/sdam/fr/chapter-3/)) est donné par

$$
\theta^{n+1} = \theta^n + \alpha_n \nabla_\theta F(\theta^n,W^{n+1}).
$$

Nous devons maintenant choisir une politique pour le pas $\alpha_n$, que nous avons abordée dans le [Chapitre 3](/sdam/fr/chapter-3/), mais voir *Reinforcement Learning and Stochastic Optimization*, Chapitre 6, pour une discussion approfondie des politiques de pas. Nous rappelons au lecteur qu'un algorithme de gradient stochastique est lui-même un problème de décision séquentielle (comme nous l'avons vu dans le [Chapitre 3](/sdam/fr/chapter-3/)).

## Recherche de politique sans dérivées

La recherche de politique sans dérivées est simplement un autre exemple de problème de décision séquentielle qui est au cœur de tout ce volume, avec la principale différence que la seule variable d'état sera la croyance sur la fonction que nous maximisons (ce qui est identique à notre application sur le diabète dans le [Chapitre 4](/sdam/fr/chapter-4/)).

Nous pouvons former des croyances en utilisant l'une des méthodes suivantes :

- **Tables de correspondance (lookup tables)** – Supposons que nous puissions discrétiser l'ensemble des valeurs possibles de $\theta$ en un ensemble $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $. Définissons une variable aléatoire $\mu_\theta = F(\theta) = \E F(\theta,W)$ qui est une variable aléatoire parce que nous ne connaissons pas $F(\theta)$ (ou $\mu_\theta$). Supposons que nous puissions exécuter des expériences pour échantillonner $\Fhat^{n+1} = F(\theta^n, W^{n+1})$. Nous pouvons utiliser ces échantillons pour créer des estimations $\mubar^n_\theta$ pour chaque valeur discrète de $\theta \in \Theta$. Ce serait un modèle de croyance de type table de correspondance.

  Le modèle de croyance le plus simple est une table de correspondance avec des croyances indépendantes, que nous avons vue pour la première fois dans le [Chapitre 4](/sdam/fr/chapter-4/) avec notre application sur le diabète. Soit $\mubar^n_\theta$ notre estimation de $\E F(\theta)$ pour un certain $\theta \in \lbrace \theta_1, \ldots, \theta_K\rbrace $ après $n$ échantillons (à travers toutes les expériences). Soit $\sigmabar^n_{\theta_k}$ l'écart-type de l'estimation $\mubar^n_{\theta_k}$ et soit $\beta^n_{\theta_k}$ la précision donnée par

  $$
  \beta^n_{\theta_k} = \frac{1}{(\sigmabar^n_{\theta_k})^2}.
  $$
- **Modèle paramétrique** – Nous pourrions estimer un modèle linéaire de la forme

  $$
  F(\theta\vert \eta) \approx \eta_0 + \eta_1 \phi_1(\theta) + \eta_2 \phi_2(\theta) + \ldots
  $$

  où $\phi_f(\theta)$ sont des caractéristiques (features) calculées à partir du vecteur $\theta$, qui pourrait consister en des termes tels que $\theta,$ $\theta^2$, ou $\ln \theta$. Notez qu'un « modèle linéaire » signifie qu'il est linéaire dans les coefficients $\eta$ ; les caractéristiques $\phi_f(\theta)$ peuvent être des fonctions non linéaires de $\theta$.

  Bien que les modèles linéaires soient populaires, ils ne constituent probablement guère plus qu'une approximation locale. Ce n'est pas un problème si nous ajustons le modèle linéaire autour du bon point. Le problème est de trouver le bon point !
- **Modèles non paramétriques** – Les modèles non paramétriques sont mieux compris comme des approximations locales des fonctions autour d'un ensemble de points (peut-être choisis au hasard). L'estimation peut être une constante (ce qui est le plus typique) ou peut-être une approximation localement linéaire.

  Il existe de nombreuses façons de créer des modèles non paramétriques. La plus courante serait peut-être de créer une estimation $\mubar_\theta$ en moyennant sur $\mubar_{\theta_1}, \ldots, \mubar_{\theta_K}$ pour des valeurs $\theta_k$ proches de $\theta$. Nous n'allons pas faire appel aux méthodes non paramétriques dans ce livre, principalement parce qu'elles nécessitent beaucoup de données et sont quelque peu lourdes à utiliser.

*Reinforcement Learning and Stochastic Optimization*, Chapitre 3, décrit un certain nombre de méthodes pour estimer récursivement des fonctions, couvrant plusieurs modèles de croyance pour les tables de correspondance, les modèles linéaires et les modèles non linéaires. Le chapitre couvre également à la fois les modèles bayésiens et fréquentistes. Nous avons déjà vu les équations récursives pour une table de correspondance dans notre exemple sur le diabète, où la mise à jour était donnée par les équations de transition dans le [Chapitre 4](/sdam/fr/chapter-4/) (ces équations supposent un modèle de croyance bayésien). Plus tard, nous illustrerons la mise à jour récursive des modèles linéaires et non linéaires.

Nous pouvons modéliser le processus de recherche sans dérivées en utilisant les cinq éléments du cadre de modélisation universel :

- **Variables d'état** – Ce serait la croyance sur $\E F(x,W)$, que nous pouvons écrire comme $S^n = B^n$. La façon dont nous stockons l'état de croyance dépend du fait que nous utilisions des tables de correspondance (et de quel type de table de correspondance), des modèles linéaires ou non linéaires. Si nous utilisons notre modèle de croyance de type table de correspondance, nous utiliserions

  $$
  B^n = (\mubar^n_\theta,\beta^n_\theta),~\theta \in \{\theta_1, \ldots, \theta_K\}.
  $$
- **Variable de décision** – La décision est le choix $\theta^n$ de la valeur de $\theta$ pour laquelle évaluer la fonction afin d'obtenir $\Fhat^{n+1} = F(x^n,W^{n+1})$. Nous faisons notre choix $\theta^n = \Theta^\pi(S^n)$ en utilisant une politique $\Theta^\pi(S^n)$ que nous devons concevoir.
- **Information exogène** – Nous considérons normalement l'information exogène comme étant l'observation échantillonnée $\Fhat^{n+1} = F(\theta^n,W^{n+1})$. Soit $\beta^W_\theta$ la précision (l'inverse de la variance) du bruit résultant de l'observation de la fonction $F(\theta^n,W^{n+1})$ en un point $\theta$.
- **Fonction de transition** – La fonction de transition se présente sous la forme des équations récursives pour mettre à jour nos croyances. Par exemple, les équations de mise à jour pour les croyances de type table de correspondance dans le [Chapitre 4](/sdam/fr/chapter-4/) où nous recherchions le meilleur médicament contre le diabète. En utilisant à nouveau notre modèle de croyance de type table de correspondance, la fonction de transition serait

  $$
  \begin{align}
  \mubar^{n+1}_\theta &= \frac{\beta^n_\theta \mubar^n_\theta + \beta^W_\theta W^{n+1}_\theta}{\beta^n_\theta + \beta^W_\theta},\label{eq:thetatransition1}\\
  \beta^{n+1}_\theta &= \beta^n_\theta + \beta^W.\label{eq:thetatransition2}
  \end{align}
  $$
- **Fonction objectif** – Il est le plus courant que nous utilisions un simulateur hors ligne pour rechercher la meilleure valeur de $\theta$, ce qui correspond à une fonction objectif de récompense finale. Soit $\theta^{\pi,N}$ la meilleure valeur du vecteur de paramètres $\theta$ dérivée de notre modèle de croyance après $N$ échantillons. Par exemple, si nous utilisions un modèle de croyance de type table de correspondance, et que nous obtenions des estimations $\mubar^N_\theta$ pour chaque choix $\theta$ après $N$ expériences, nous choisirions

  $$
  \theta^{\pi,N} = \argmax_{\theta\in\Theta} \mubar^N_\theta,
  $$

  où l'exposant « $\pi$ » dans $\theta^{\pi,N}$ reflète le type de politique de recherche $\pi$ utilisée lors de l'estimation de $\mubar^N_x$. Le problème d'optimisation pour rechercher la meilleure politique $\pi$ s'écrirait

  $$
  \max_{\pi} \E_{S^0}\E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(\theta^{\pi,N},\What).
  $$

Rappelons que nous calculons les espérances par simulation, comme nous l'avons montré ci-dessus, dans l'équation $\eqref{eq:simulatedcumulativereward}$ pour la récompense cumulative, ou $\eqref{eq:simulatedfinalreward}$ pour la récompense finale.

Cela nous laisse avec la question suivante : comment concevoir la politique de recherche $\Theta^\pi(S^n)$ ? Nous espérons qu'il n'est pas surprenant que nous puissions choisir parmi l'une quelconque des quatre classes de politiques. Les quatre classes sont discutées en profondeur dans *Reinforcement Learning and Stochastic Optimization*, Chapitre 7, mais nous renvoyons également à la discussion sur la recherche de politique au Chapitre 12 de ce livre.

Pour nos besoins, nous allons illustrer deux politiques relativement simples et naturelles.

- **Politiques d'estimation par intervalle pour les modèles de croyance à table de correspondance** – Nous avons passé en revue plusieurs politiques pour le contexte du diabète, mais l'une d'elles, particulièrement efficace, est la politique d'estimation par intervalle, donnée par

  $$
  \begin{align}
  \Theta^{IE}(S^n\vert \theta^{IE}) = \argmax_{\theta\in\Theta} \left(\mubar^n_\theta + \theta^{IE} \sigmabar^n_\theta \right). \label{eq:thetaIE}
  \end{align}
  $$

  Maintenant nous devons rechercher la meilleure valeur de $\theta^{IE}$. Pensez à ceci comme un problème de décision séquentielle (trouver le meilleur $\theta^{IE}$) pour résoudre un problème de décision séquentielle (trouver le meilleur $\theta$ pour notre politique $X^\pi(S_t\vert \theta)$). Nous notons que dans la communauté de la recherche, le réglage du paramètre $\theta^{IE}$ est généralement négligé dans la littérature de recherche, mais les praticiens savent qu'il doit être effectué.
- **Méthodes classiques de surface de réponse** – Pour les problèmes où $x$ est continu, il est judicieux d'ajuster un modèle paramétrique à la fonction $\E F(x,W)$. Bien qu'il puisse être tentant aujourd'hui d'utiliser des réseaux de neurones, gardez à l'esprit que ce sont des modèles de haute dimension qui ont tendance à surajuster tout bruit. Il existe de nombreux problèmes où $F(x,W)$ est coûteux ; par exemple, il pourrait s'agir d'une simulation informatique pouvant prendre une heure ou plus, ou cela pourrait nécessiter des expériences de terrain.

  Pour ces raisons, une stratégie populaire consiste à utiliser un modèle linéaire de la forme

  $$
  \Fbar(x) = \sum_f \theta_f \phi_f(x),
  $$

  où $\phi_f(x)$ est une caractéristique extraite du vecteur d'entrée $x$. Supposons que nous ayons mené $n$ expériences utilisant des entrées $x^0, \ldots, x^{n-1}$ à partir desquelles nous avons observé les réponses $\Fhat^1, \ldots, \Fhat^n$. À partir de ces données, nous pouvons utiliser les techniques de régression linéaire pour ajuster notre modèle linéaire avec des estimations $\theta \approx \thetabar^n$, ce qui nous donne l'approximation

  $$
  \Fbar^n(x) = \sum_f \thetabar^n_f \phi_f(x).
  $$

  La littérature sur les surfaces de réponse utilise depuis longtemps la stratégie gloutonne consistant à optimiser $\Fbar^n(x)$ pour trouver le prochain point à observer, ce qui signifie que nous écririons

  $$
  \begin{align}
  x^n = \argmax_x \Fbar^n(x). \label{eq:responsesurfacegreedy}
  \end{align}
  $$

  Bien que cette idée soit intuitivement séduisante, il s'avère qu'utiliser ce qui semble être la meilleure estimation de l'optimum basée sur notre approximation $\Fbar^n(x)$ est en réalité une très mauvaise façon d'apprendre la meilleure approximation de $\E F(x)$.

  La Figure 7.2 illustre les difficultés de l'apprentissage d'une fonction paramétrique. Nous montrons ici trois courbes de réponse de demande linéaires donnant la demande en fonction du prix sous la forme $D(p) = \theta_0 - \theta_1 p$. Notre objectif est de maximiser le revenu $R(p) = pD(p)$. La Figure 7.2(a) montre trois courbes de demande possibles et les courbes de revenu correspondantes.

<figure class="book-figure">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-width: 560px; margin: 0 auto;">
    <div><img src="/assets/images/sdam/learningrevenue1.png" alt="Panneau (a) : trois droites de réponse des ventes possibles et courbes de revenu correspondantes" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(a)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue2.png" alt="Panneau (b) : combinaisons prix-ventes observées si nous utilisons des prix qui semblent maximiser le revenu" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(b)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue3.png" alt="Panneau (c) : observation de prix extrêmes pour améliorer l'apprentissage de la réponse des ventes" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(c)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue4.png" alt="Panneau (d) : équilibrer apprentissage et gain" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(d)</p></div>
  </div>
  <figcaption><span class="fig-num">Figure 7.2.</span> Apprentissage actif d'une fonction de réponse de demande : (a) Trois droites de réponse des ventes possibles et courbes de revenu correspondantes, (b) Combinaisons prix-ventes observées si nous utilisons des prix qui semblent maximiser le revenu, (c) Observation de prix extrêmes (haut et bas) pour améliorer l'apprentissage de la réponse des ventes, et (d) Équilibrer l'apprentissage (observer loin du milieu) et le gain (observer des prix proches du milieu).</figcaption>
</figure>

  Il est tentant de vouloir proposer des prix qui optimisent le revenu comme nous le faisons dans la Figure 7.2(b), mais cela produit un ensemble de points regroupés en une boule qui rend difficile l'estimation de la courbe de demande. La meilleure façon d'estimer la courbe de demande est de proposer des prix proches des extrêmes comme nous le faisons dans la Figure 7.2(c), mais le revenu est très faible à ces points, de sorte que nous ne gagnons pas d'argent pendant que nous apprenons.

  Une bonne approche consiste à tester des points sur les « épaules », c'est-à-dire non pas à l'optimum, mais pas trop loin non plus, comme nous le faisons dans la Figure 7.2(d), un comportement que nous obtenons avec une politique que nous décrivons ensuite.
- **Méthodes de surface de réponse avec perturbation** – Une politique qui surmonte le compromis exploration/exploitation illustré dans la Figure 7.2 utilise une politique d'anticipation à un pas appelée le gradient de connaissance, qui choisit $x^n$ comme étant la valeur qui produit la valeur maximale de l'information. Il s'avère que les points qui maximisent la valeur de l'information nous donnent le schéma d'échantillonnage illustré dans la Figure 7.2(d).

  Le gradient de connaissance est trop complexe pour notre présentation ici, mais il existe un moyen très simple d'obtenir le même comportement. Au lieu de prendre notre estimation actuelle de l'optimum apparent $x^n$ comme nous le faisons dans $\eqref{eq:responsesurfacegreedy}$, nous la perturbons d'une quantité $\rho$, mais il existe deux façons de procéder :

    - **Une politique de déviation par rapport à l'optimum** – L'idée ici est de choisir un point $x^n$ situé à une distance $\rho$ de l'optimum $\xbar^n = \argmax_x \Fbar^n(x\vert \thetabar^n)$. Si $x$ est un vecteur de dimension $k$, cette déviation peut être créée en échantillonnant $k$ variables aléatoires normalement distribuées $Z_1, \ldots, Z_K$, chacune de moyenne 0 et de variance 1, puis en les normalisant de sorte que

      $$
      \sqrt{\sum_{k=1}^K Z^2_k} = \rho.
      $$

      Soit $\Zbar^n$ le vecteur de dimension $k$ résultant. Calculez maintenant le point d'échantillonnage en utilisant

      $$
      x^n_k = \xbar^n_k + \Zbar^n_k.
      $$

      Notez qu'en une dimension, nous aurions $\Zbar^n = \pm \rho$.
    - **Une politique d'excitation** – Ici, nous générons à nouveau un vecteur de perturbation de dimension $k$, $Z^n$, où chaque élément a une moyenne 0 et une variance 1, puis nous posons

      $$
      x^n_k = \Xbar^n_k + \rho Z^n_k.
      $$

      Alors que la politique de déviation par rapport à l'optimum force $x^n$ à être à une distance $\rho$ de l'optimum $\xbar^n$, une politique d'excitation introduit simplement une perturbation aléatoire de moyenne 0, ce qui signifie que le point le plus probable à échantillonner est l'optimum de $\fbar^n(x\vert \thetabar^n)$.

  Nous suggérons que la politique de déviation par rapport à l'optimum est mieux adaptée aux objectifs de récompense finale hors ligne, tandis que la politique d'excitation est préférable lorsque nous sommes dans un contexte en ligne optimisant la récompense cumulative.

## Qu'avons-nous appris ?

- Nous passons en revue les quatre classes de politiques.
- Nous utilisons toutes les applications introduites dans les six chapitres précédents pour contraster les différents styles de variables d'état, et pour illustrer chacune des quatre classes de politiques.
- Nous décrivons également les objectifs de récompense finale et de récompense cumulative. Les objectifs de récompense finale apparaissent lorsque nous effectuons des observations dans un contexte expérimental (en laboratoire ou sur le terrain), où seule la performance de la conception finale nous importe. Les objectifs de récompense cumulative sont utilisés lorsque nous apprenons en faisant.
- Nous décrivons à la fois les méthodes de recherche basées sur les dérivées et sans dérivées pour effectuer la recherche de paramètres.
- Nous notons que la recherche stochastique basée sur les dérivées et sans dérivées constituent toutes deux des problèmes de décision séquentielle.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Qu'est-ce qui distingue les PFA des trois autres classes de politiques ?</li>
<li>Qu'est-ce qui distingue les VFA et les DLA des PFA et des CFA ?</li>
<li>Au Chapitre 1, la variable d'état du problème de stock plus complexe se compose de variables d'état physiques $R_t$, de variables d'état informationnelles $I_t$, et de variables d'état de croyance $B_t$. Qu'est-ce qui distingue une variable d'état de croyance d'une variable d'état informationnelle ?</li>
<li>Quelle est la différence entre les fonctions objectif pour l'apprentissage en ligne et hors ligne ?</li>
<li>Nous avons décrit la recherche stochastique basée sur les dérivées et sans dérivées comme des problèmes de décision séquentielle. Laquelle de ces deux stratégies utilise un état de croyance, et pourquoi est-ce nécessaire ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>La Figure 7.3 montre un graphe déterministe, où nous essayons de trouver un chemin du nœud 1 au nœud 11 en utilisant différents objectifs.
  <ol type="a">
    <li>Si notre voyageur souhaite simplement minimiser le temps de trajet total du nœud 1 au nœud 11, et a actuellement parcouru le chemin 1-2-6-9, quel est son état ?</li>
    <li>Supposons maintenant que notre voyageur doive arriver au nœud 11 avant l'instant 45. Si elle arrive après l'instant 45, une pénalité égale au carré du retard lui est infligée. Quel est l'état du voyageur qui a suivi le chemin 1-2-6-9 jusqu'à présent ?</li>
    <li>Quel est l'état si le voyageur ayant suivi le chemin 1-2-6-9 souhaite minimiser le deuxième coût le plus élevé parmi tous les liens de son chemin ?</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariablemaxarccost.jpg" alt="Un graphe déterministe." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 7.3.</span> Un graphe déterministe.</figcaption>
</figure>
</li>
<li>Histoire vraie : une entreprise de technologie financière (« fintech ») dispose d'un système de trading algorithmique pour le trading à haute fréquence. À l'instant $t$, alors qu'un actif se négocie au prix $p_t$, l'entreprise estime si le prix va monter ou descendre en utilisant une série de prévisions sur la manière dont le prix pourrait évoluer sur un horizon glissant au cours de la journée. Ici, le temps est mesuré par incréments de 15 minutes. Soit $f_{tt'}$ le prix estimé de l'actif à l'instant $t'$, calculé à partir de l'information disponible à l'instant $t$. Créons maintenant un prix estimé en utilisant

$$
\fbar_t(\theta) = \sum_{t'=t+1}^{t+H} \theta_{t'-t} f_{tt'},
$$

où $\theta = (\theta_1, \theta_2, \ldots, \theta_H)$ est le vecteur de poids pour chaque incrément de 15 minutes sur six heures dans le futur (24 incréments). Soit $x_t = 1$ indiquant une décision de vendre à l'instant $t$, $x_t = -1$ une décision d'acheter, et $x_t = 0$ une décision de conserver, où la politique est

$$
X^\pi(S_t\vert \theta) = \begin{cases} +1 & \text{if } \fbar_t(\theta) \geq p_t + 1.0, \\ 0 & \text{if } p_t - 1.0 < \fbar_t(\theta) < p_t + 1.0, \\ -1 & \text{if } \fbar_t(\theta) \leq p_t - 1.0. \end{cases}
$$

Le défi consiste à optimiser le vecteur de poids $\theta$.
  <ol type="a">
    <li>À l'instant $t$, quel est l'état de ce système ?</li>
    <li>Dans quelle classe de politique $X^\pi(S_t\vert \theta)$ s'inscrirait-elle ? Expliquez.</li>
    <li>Supposons que vous puissiez simuler la politique en utilisant des données historiques dans un simulateur. Soit $F(\theta)$ la performance attendue de la politique étant donné le vecteur de paramètres $\theta$. Écrivez cet objectif en supposant que vous allez simuler la politique en utilisant un seul échantillon d'historique.</li>
    <li>Décrivez comment calculer une dérivée numérique à l'aide de votre simulateur. Écrivez simplement la dérivée numérique pour un seul élément $\theta_\tau$.</li>
  </ol>
</li>
</ol>
{% endraw %}
