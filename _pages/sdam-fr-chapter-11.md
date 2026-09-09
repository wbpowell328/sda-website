---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 11 : Gestion de la chaîne d'approvisionnement II : Le jeu de la bière"
permalink: /sdam/fr/chapter-11/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: f0d9a39d57818789
---


{% raw %}
## Aperçu du chapitre

Le jeu de la bière est un classique dans l'enseignement de la gestion de la chaîne d'approvisionnement. Nous l'abordons ici comme un problème multi-agent général, où chaque fournisseur du jeu de la bière est modélisé comme un agent distinct. Cette présentation prolonge les fondements posés au [Chapitre 10](/sdam/fr/chapter-10/), avec la complication supplémentaire que les agents envoient à la fois de l'information (des commandes de bière) et des ressources physiques (de la bière).

Le chapitre garde une modélisation de l'incertitude relativement simple. En revanche, nous explorons une série de politiques paramétriques simples, mais nous en profitons pour introduire l'idée des croyances qu'un agent entretient au sujet de l'information qu'un autre agent pourrait détenir (dans ce cas, à propos des commandes en attente). Nous présentons ensuite une illustration de la célèbre politique d'« ancrage et ajustement », introduite pour la première fois par deux scientifiques de la décision bien connus, Daniel Kahneman et Amos Tversky, adaptée au contexte du jeu de la bière. Nous terminons en esquissant la manière dont on pourrait concevoir une politique d'anticipation stochastique, en exploitant le fait que notre décision est un scalaire.

Le chapitre se termine en proposant une longue série d'extensions, illustrant la richesse des variantes de problèmes de contrôle qui se posent dans le cadre des chaînes d'approvisionnement.

## Récit

Ce chapitre porte sur un célèbre jeu des années 1950 connu sous le nom de « jeu de la bière ». Il a été conçu à l'origine par Jay Forrester, professeur au MIT, qui a créé ce jeu pour illustrer les instabilités des chaînes d'approvisionnement. Le problème concerne une chaîne d'approvisionnement linéaire où différents fournisseurs font circuler de la bière depuis son lieu de fabrication (le fabricant) jusqu'au marché (le détaillant). La bière doit passer par plusieurs intermédiaires sur son chemin entre le point de fabrication et le marché.

Il existe deux types de flux :

- Le flux de bière – chaque caisse de bière est représentée par une pièce de monnaie qui se déplace du fabricant vers le détaillant.
- Le flux d'information – chaque point de la chaîne d'approvisionnement réapprovisionne son stock en effectuant des demandes de bière supplémentaire auprès du niveau suivant en aval.

Chaque niveau de la chaîne d'approvisionnement est appelé un *échelon*. Il y a généralement quatre à six échelons par équipe. Les demandes au niveau du détaillant sont fixées à l'avance, mais cachées, dans un jeu de cartes. Lorsque le détaillant révèle la demande de la semaine, il essaie de la satisfaire à partir de son stock. Le détaillant, comme tous les autres fournisseurs de la chaîne d'approvisionnement (à l'exception du fabricant), remplit ensuite une feuille de papier pour demander davantage de stock.

Il est possible que le détaillant, ou l'un des fournisseurs intermédiaires, ne puisse pas satisfaire la demande de réapprovisionnement (ou la demande du marché au niveau du détail). Dans ce cas, la demande non satisfaite reste dans un carnet de commandes en attente d'être honorée dès l'arrivée de nouveau stock.

Après avoir traité les commandes, chacun (au sein de la chaîne d'approvisionnement concernée) doit s'arrêter et noter soit son stock (le nombre de caisses de bière en stock), soit son carnet de commandes en attente. Le carnet de commandes en attente entraîne une pénalité de 4 ＄ par caisse. L'excédent de stock entraîne un coût de possession de 1 ＄ par caisse.

Les étapes du processus sont illustrées dans la Figure 11.1. Il y a cinq étapes :

**Étape 0 :** Chaque semaine, chaque joueur dispose d'un stock (en pièces de monnaie, chacune représentant une caisse de bière) et d'une commande, qui peut être la demande du détail (pour l'échelon de détail) ou une commande passée par le joueur situé à sa gauche.

**Étape 1 :** Chaque joueur essaie de prélever autant de caisses que possible de son stock et de les déplacer vers sa gauche, jusqu'à une zone *entre* lui et le joueur de gauche (ne pas ajouter les pièces au stock du joueur de gauche). Si le stock ne suffit pas à satisfaire la commande, barrer la commande et la remplacer par le nombre de caisses restant à satisfaire (c'est le carnet de commandes en attente).

**Étape 2 :** Ensuite, rédiger une commande indiquant le nombre de caisses souhaitées pour réapprovisionner son stock, et la placer dans la zone *entre* soi et le joueur à sa droite (le fabricant passe une commande sur la pile de pièces d'où provient toute la bière).

**Étape 3 :** S'arrêter et noter sur sa feuille de stock la quantité de stock que l'on possède. Si l'on n'a pas pu satisfaire une commande, on n'aura plus de stock, et l'on aura des commandes dans son carnet de commandes en attente (les commandes non satisfaites). Le cas échéant, noter ce montant comme carnet de commandes en attente.

**Étape 4 :** Voici l'étape clé : tendre la main gauche pour tirer vers soi le bon de commande suivant dans sa pile de commandes (les feuilles de papier), et simultanément tendre la main droite pour tirer vers soi les pièces qui arrivent dans son stock. On revient alors à la situation de l'étape 0.

<figure class="book-figure">
  <img src="/assets/images/sdam/princetonbeergame2018.png" alt="Disposition de la version Princeton du jeu de la bière." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 11.1.</span> Disposition de la version Princeton du jeu de la bière.</figcaption>
</figure>

Il est très important que tout le monde effectue les mouvements en même temps, mais les joueurs n'ont pas le droit de partager des informations (et ils ne doivent pas regarder les stocks des autres joueurs de la même chaîne). C'est au détaillant qu'il revient de synchroniser l'ensemble des participants.

Les instructions complètes d'une version simplifiée du jeu de la bière classique peuvent être téléchargées à l'adresse [tinyurl.com/PrincetonBeerGame](https://tinyurl.com/PrincetonBeerGame). Cette version du jeu convient parfaitement aux cours dispensés autour de tables continues, avec une classe d'au moins 8 à 10 étudiants (les tables continues sont nécessaires pour que les joueurs puissent se faire passer papier et pièces de monnaie). Les équipes doivent compter cinq ou six joueurs (ce qui correspond à cinq ou six échelons intermédiaires plus le détaillant), mais jamais moins de quatre. La personne qui gère le stock le plus proche de l'usine peut cumuler les deux postes (puisque l'usine ne fait guère plus que remplir des commandes). Les équipes n'ont pas besoin d'être de taille identique, et il est assez facile d'allonger une chaîne pour intégrer un étudiant arrivé en retard. Il est possible de jouer la totalité du jeu en un cours de 50 minutes.

## Cadrage du problème

Il s'agit là encore d'un problème multi-agent. Les réponses à nos trois questions de cadrage, pour chaque agent, sont les suivantes :

- **Métriques :** minimiser l'espérance des coûts de possession de stock plus les coûts de rupture pour les commandes non satisfaites.
- **Décisions :** quelle quantité de nouveau produit demander à l'agent suivant le long de la chaîne d'approvisionnement.
- **Incertitudes :** quelle quantité le marché va demander (pour l'agent de détail qui satisfait directement le marché), ou la quantité que l'agent suivant, plus proche du marché, va commander, ainsi que la part des commandes demandées qui sera effectivement satisfaite par les agents en amont (plus proches de l'usine).

## Modèle de base

Nous allons modéliser un fournisseur autre que l'un des points terminaux (détaillant ou fabricant de bière). Ce modèle suivra de près le style du problème du vendeur de journaux à deux agents présenté au chapitre précédent, bien que certains ajustements soient nécessaires. Avant de commencer, nous devons introduire une nouvelle notation pour les systèmes multi-agents.

### Notation multi-agent

Avant de commencer, nous devons établir notre système de notation permettant de préciser qui sait quoi, ainsi que le processus de partage de l'information.

Nous allons désigner les différents agents décisionnels de la chaîne d'approvisionnement par $\Qcal = \lbrace 1, 2, \ldots, Q\rbrace $. Nous laisserons $q=0$ désigner le marché, qui est une source d'information mais ne prend pas de décisions. Nous laisserons $q=Q$ désigner l'usine de fabrication, dont nous supposons (du moins initialement) qu'elle peut toujours produire suffisamment pour satisfaire la demande.

Nous commençons par définir la variable d'état de l'agent $q$ à l'aide de $S_{tq}$, l'information connue de l'agent $q$ au temps $t$ (cela peut inclure des croyances). Si l'agent $q$ agit sur l'agent $q'$, nous utiliserons $x_{tqq'}$, l'action de l'agent $q$ sur l'agent $q'$. Nous notons que la décision $x_{tqq'}$ est déterminée par $q$, mais parvient à $q'$ sous forme d'information.

Une action de $q$ sur $q'$ au temps $t$ peut impliquer le mouvement de ressources physiques, mais peut aussi consister en l'envoi d'information. L'action de $q$ sur $q'$ parviendra à $q'$ sous forme d'un processus d'information exogène arrivant à $q'$ au temps $t+1$ (c'est là que seraient captées d'éventuelles distorsions), que nous notons $W_{t+1,q,q'}$, l'information parvenant à l'agent $q'$ au temps $t+1$ à partir des actions entreprises par l'agent $q$ (il peut s'agir d'information portant sur des ressources ou impliquant l'envoi ou le partage d'information provenant de $S_{tq}$).

Enfin, il y aura des moments où l'agent $q$ devra créer une estimation de quelque chose de connu par l'agent $q'$. Si nous laissons $S_{tq'}$ représenter quelque chose de connu par l'agent $q'$, nous laisserons $\overleftarrow{S}\_{t,q,q'}$ désigner l'estimation que l'agent $q$ construit de l'information contenue dans $S_{tq'}$.

### Variables d'état

Les variables d'état des agents $q=1, \ldots, Q-1$ sont : $R^{inv}\_{tq}$, le stock restant après l'itération $t$, une fois le produit livré au fournisseur en amont pour l'agent $q$ ; et $R^{back}\_{tq}$, la demande en carnet de commandes qui n'a pas encore été satisfaite à partir du stock.

Le fabricant $q=Q$ est supposé disposer toujours d'un stock illimité.

Nous verrons par la suite qu'il s'agit là d'une description incomplète de l'état du problème, mais c'est un bon point de départ.

### Variables de décision

L'agent $q$ doit prendre deux décisions. La première (et la plus importante) est de déterminer combien commander à l'agent en aval $q+1$, ce que nous notons $x^{req}\_{tq,q+1}$, la commande passée par le fournisseur $q$ pour être transmise au fournisseur $q+1$, effectuée au moment de la commande lors de l'itération $t$, et qui sera reçue par $q+1$ pour être honorée à l'itération $t+1$.

La seconde consiste à déterminer quelle part de la demande de l'agent en amont satisfaire à partir du stock. Nous notons cela $x^{fill}\_{tq,q-1}$, la quantité de demande non satisfaite $R^{back}\_{tq}$ à honorer au temps $t$ à partir du stock.

Ces décisions sont contraintes, pour $q=1, \ldots, Q-1$, par :

$$
\begin{align}
0 \leq x^{fill}_{tq,q-1}           &\leq R^{inv}_{tq},\label{eq:beergameconstraint1}\\
0 \leq x^{fill}_{tq,q-1}           &\leq R^{back}_{tq},\label{eq:beergameconstraint2}\\
x^{req}_{tq,q+1},x^{fill}_{tq,q-1} &\geq 0. \label{eq:beergameconstraint3}
\end{align}
$$

La contrainte $\eqref{eq:beergameconstraint1}$ traduit le fait que nous ne pouvons pas envoyer à l'agent $q-1$ un stock que nous ne possédons pas. La contrainte $\eqref{eq:beergameconstraint2}$ indique que nous ne pouvons pas envoyer à l'agent $q-1$ un stock qui n'a pas été demandé. Notez que $R^{back}\_{tq}$ inclut les nouvelles commandes qui n'ont pas encore été honorées.

Nous écrivons alors notre vecteur de décision sous la forme

$$
x_{tq} = (x^{req}_{tq,q+1},x^{fill}_{tq,q-1}),
$$

où nos décisions seront prises selon une politique $X^\pi(S_t)$ que nous concevrons plus tard.

Dans notre jeu de base, nous allons toujours satisfaire autant que possible la commande de $q-1$ à partir du stock, si bien que, techniquement, $x^{fill}\_{tq,q-1}$ n'est pas vraiment une décision puisque nous nous contenterons de poser $x^{fill}\_{tq,q-1} = \min\lbrace R^{back}\_{tq},R^{inv}\_{tq}\rbrace $. Il s'agit néanmoins toujours d'une action réalisée par $q$, ce qui ouvre la voie à des comportements plus riches par la suite.

Si nous sommes le marché de détail $q=0$, alors la demande $W_{t,0,1} = x^{req}\_{t,0,1}$ adressée à l'agent $q=1$ provient d'une source d'information exogène.

Si nous sommes l'usine $q=Q$, nous satisfaisons toujours la demande de $q=Q-1$, si bien que

$$
x^{fill}_{t+1,Q,Q-1} = x^{req}_{t,Q-1,Q}.
$$

### Information exogène

Il existe deux types d'information exogène pour le fournisseur $q$ : $W^{fill}\_{t+1,q+1,q}$, la quantité de produit reçue du fournisseur $q+1$ en réponse à la demande faite au temps $t$ mais arrivant au temps $t+1$ ; et $W^{req}\_{t+1,q-1,q}$, la commande passée par le fournisseur $q-1$ au temps $t$ auprès du fournisseur $q$, qui arriverait au temps $t+1$.

Il est important de reconnaître que les décisions prises par les agents $q+1$ et $q-1$ parviennent à l'agent $q$ sous forme d'information exogène. Cela signifie que nous pourrions écrire

$$
W^{fill}_{t+1,q+1,q} = x^{fill}_{t,q+1,q}, \qquad W^{req}_{t+1,q-1,q} = x^{req}_{t,q-1,q}.
$$

Nous pouvons représenter l'information exogène de l'agent $q$ arrivée jusqu'au temps $t+1$ à l'aide de

$$
W_{t+1,q} = (W^{fill}_{t+1,q+1,q},W^{req}_{t+1,q-1,q}).
$$

Ceci décrit le processus d'information pour les agents intermédiaires $q=1, \ldots, Q-1$. Le processus d'information $W_{t,0}$ se rapporte au marché, pour lequel nous supposons qu'il existe une source exogène de demandes $x^{req}\_{t,0,1} = W_{t,0,1}$ adressées à l'agent 1.

### Fonction de transition

Nos variables d'état $R^{inv}\_{tq}$ et $R^{back}\_{tq}$ pour $q=1, \ldots, Q-1$ évoluent selon

$$
\begin{align}
R^{inv}_{t+1,q} &= R^{inv}_{tq}-x^{fill}_{t,q,q-1} + W^{fill}_{t+1,q+1,q}, \label{eq:beergametrans1}\\
R^{back}_{t+1,q} &= R^{back}_{tq}-x^{fill}_{t,q,q-1} + W^{req}_{t+1,q-1,q}. \label{eq:beergametrans2}
\end{align}
$$

L'équation $\eqref{eq:beergametrans1}$ prélève la demande $x^{fill}\_{t,q,q-1}$ sur le stock (celui-ci n'est pas autorisé à devenir négatif), puis ajoute le stock entrant $W^{fill}\_{t+1,q+1,q}$ en provenance de l'agent en aval $q+1$ pour constituer le stock au temps $t+1$. L'équation $\eqref{eq:beergametrans2}$ honore les commandes demandées, conservées dans $R^{back}\_{tq}$, puis ajoute les nouvelles commandes $W^{req}\_{t+1,q-1,q}$ à honorer au cours de la période $t+1$.

### Fonction objectif

Notre fonction objectif pour l'agent $q$ évalue les pénalités liées au stock excédentaire $R^{inv}\_{tq}$ et à la demande non satisfaite $R^{back}\_{tq}$. Soit $c^{inv}\_q$ le coût unitaire de possession de stock pour l'agent $q$, et $c^{back}\_q$ le coût unitaire des commandes non satisfaites pour l'agent $q$.

Ces coûts sont évalués sur les stocks et les demandes en carnet de commandes après que les décisions de satisfaire une commande client ont été prises, mais avant l'arrivée de nouvelles commandes. Ainsi, notre fonction de coût pour l'agent $q$ est donnée par

$$
C(S_t,x_t) = c^{inv}(R^{inv}_{tq}-x^{fill}_{t,q,q-1}) + c^{back}(R^{back}_{tq}-x^{fill}_{t,q,q-1}).
$$

N'oubliez pas que $R^{inv}\_{tq}$ est le stock actuel, donc $R^{inv}\_{tq}-x^{fill}\_{t,q,q-1}$ est le stock restant après que nous avons rempli les commandes pour le temps $t$. De même, $R^{back}\_{tq}$ inclut les nouvelles commandes, ainsi que les commandes non remplies des périodes précédentes. Par conséquent, $R^{back}\_{tq}-x^{fill}\_{t,q,q-1}$ correspond aux commandes qui n'ont pas été remplies immédiatement.

Nous recherchons maintenant la meilleure politique en utilisant

$$
\min_\pi \E\left\{\sum_{t=0}^T C_q(S_t,X^\pi(S_t))\vert S_0\right\}.
$$

Cela doit être fait pour chaque agent $q$, en supposant que chacun s'auto-optimise. Un défi distinct consiste à choisir des politiques pour chaque agent, qui ne peuvent utiliser que l'information disponible pour chaque agent, mais où nous voulons néanmoins des politiques qui atteignent une optimalité globale. C'est une question qui dépasse le cadre de cet ouvrage.

## Modéliser l'incertitude

Chaque agent, à l'exception des agents situés aux extrémités, doit gérer deux sources d'incertitude :

- Les demandes faites par l'agent amont, qui peut être le marché, ou un autre agent qui répond de manière incertaine aux demandes auxquelles il fait face, et la capacité de la chaîne d'approvisionnement à répondre à ses demandes.
- La capacité de l'agent amont à remplir les commandes de l'agent.

En d'autres termes, les seules sources d'incertitude sont le marché et le comportement des agents. Les façons dont les agents (qui sont des personnes) interagissent entre eux introduisent une dynamique complexe (et incertaine). Généralement, le jeu se déroule avec une dynamique de marché plutôt modeste. Même lorsqu'il est joué ainsi, le comportement humain peut introduire des instabilités significatives qui ont été observées dans des chaînes d'approvisionnement réelles, où elles ont reçu le nom d'« effet coup de fouet » (bullwhip effect).

## Concevoir des politiques

Il existe une variété de politiques PFA de base que nous pourrions envisager. Nous commençons par supposer que nous remplissons toujours une demande jusqu'à concurrence de notre stock disponible, donc

$$
x^{fill}_{t,q,q-1} = \min\{x^{req}_{t,q-1,q}, R^{inv}_{tq}\}.
$$

Nous notons qu'au fur et à mesure que nous concevons différentes politiques, nous pourrions avoir à introduire des éléments supplémentaires aux variables d'état pour répondre aux besoins d'information de la politique.

### Quelques règles simples

Nous allons nous mettre en train avec quelques règles de commande simples :

- Demander à l'agent $q+1$ ce qui a été demandé à $q$ lors de la période précédente :

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = W^{req}_{t-1,q-1,q} + \theta_{q}.
$$

  Cette politique ignore la quantité que nous avons en stock ; c'est une politique de pur suivi. Cette politique exige que nous stockions la demande précédente $W^{req}\_{t-1,q-1,q}$ dans notre variable d'état, qui devient

$$
S_{tq} = (R^{inv}_{tq},R^{back}_{tq}, W_{t-1,q-1,q}).
$$

  Nous l'augmentons ensuite de $\theta$ pour nous protéger contre l'incertitude.
- Demander ce qui est nécessaire pour répondre aux demandes actuelles et passées :

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = R^{back}_{tq} + \theta_{q}.
$$

  Lorsqu'il reste des demandes non satisfaites, cette politique ferait un double comptage, ce qui signifie effectuer plusieurs demandes.
- Politique de stock cible :

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = \max\{0, \theta^{target}_{q}-R^{inv}_{tq}\}.
$$

  Cette politique vise à maintenir un stock cible spécifié $\theta^{target}$ qui ne varie pas au fur et à mesure que les conditions changent.

Il s'agit de PFA paramétrées de base, faciles à mettre en œuvre, mais qui nécessitent bien sûr un réglage. En même temps, elles sont assez simples et ignorent des facteurs tels que l'historique des commandes passées qui n'ont pas encore été remplies (en fait, chacune de ces politiques présente des défauts fondamentaux).

N'oubliez pas que $R^{back}\_{tq}$ correspond aux commandes passées par l'agent $q-1$ à l'agent $q$ que $q$ n'a pas encore remplies. Les commandes passées par $q$ à $q+1$ qui n'ont pas encore été remplies sont données par $R^{back}\_{t,q+1}$, mais cela n'est pas immédiatement connu de l'agent $q$. Soit $\overleftarrow{R}^{back}\_{tq,q+1}$ l'estimation de $R^{back}\_{t,q+1}$ faite par l'agent $q$ des demandes en souffrance connues par $q+1$. Ce sont les commandes non remplies que $q$ a passées à $q+1$, ce qui est une statistique normalement maintenue par $q+1$.

Normalement, l'information connue par un agent (comme $q+1$) ne peut pas être connue parfaitement par un autre agent (comme $q$), mais dans ce cas, il s'agit d'une statistique que $q$ peut maintenir par lui-même en utilisant

$$
\overleftarrow{R}^{back}_{t+1,q,q+1} = \max\{0,\overleftarrow{R}^{back}_{tq,q+1}+x^{req}_{t,q,q+1} - W^{fill}_{t+1,q+1,q}\}.
$$

Nous pouvons utiliser cette statistique pour suggérer une politique de stock cible ajustée, où nous ajoutons les commandes non remplies capturées par $\overleftarrow{R}^{back}\_{t+1,q,q+1}$ à notre stock actuel $R^{inv}\_{tq}$, que nous écrivons en utilisant :

- Politique de stock cible ajustée :

$$
x^{req}_{t,q,q+1} = \max\{0, \theta^{target}-(R^{inv}_{tq}+\overleftarrow{R}^{back}_{t+1,q,q+1})\}.
$$

Cette politique est une forme de PFA (il n'y a pas d'optimisation intégrée), mais elle reflète les approvisionnements qui arriveront à l'avenir.

### Une heuristique d'ancrage et d'ajustement

En 1989, John Sterman (professeur au MIT et expert en dynamique des affaires) a écrit un article appliquant le principe d'« ancrage et ajustement » développé par Tversky et Kahneman (1974) au jeu de la bière (« beer game »). Nous allons décrire cette idée ici.

Nous commençons par définir un ensemble de variables d'état. Les variables que nous utilisons réellement peuvent dépendre de la politique.

- **Variables d'état physique :** $R^{inv}\_{tq}$, stock actuel ; $R^{back}\_{tq}$, demande en souffrance ; et $R^{transit}\_{tq}$, stock actuel en transit (nous ne capturons pas depuis combien de temps le stock est en transit). L'état de ressource est alors $R_{tq} = (R^{inv}\_{tq},R^{back}\_{tq},R^{transit}\_{tq})$.
- **Variables d'information :** $F_{t-1,q,q-1}$, remplissage réel de $q$ à $q-1$ de la période précédente, donc $F_{t-1,q,q-1} = x^{fill}\_{t-1,q,q-1}$ ; et $A_{t-1,q+1,q}$, arrivées réelles à $q$ depuis $q+1$ lors de la période précédente, donc $A_{t-1,q+1,q} = x^{fill}\_{t-1,q+1,q}$. L'état d'information est alors $I_{tq} = (F_{t-1,q-1,q},A_{t-1,q-1,q})$. Avec ces variables, nous « mémorisons » une activité de la période précédente. Leur utilisation dépend de la politique.
- **Variables d'état de croyance :** $\Abar_{t,q+1,q}$, taux d'arrivée estimé du produit provenant de l'agent $q+1$ (il s'agit d'une estimation du taux auquel le produit arrive à $q$ depuis $q+1$) ; $\Fbar_{t,q,q-1}$, taux de remplissage estimé livré à l'agent $q-1$ (il s'agit d'une estimation du taux auquel le produit est expédié vers $q-1$) ; et $\Dbar_{t,q-1,q}$, taux de demande estimé provenant de $q-1$ (cela serait égal à $\Fbar_{t,q-1,q}$ si nous remplissions complètement chaque commande, ce qui signifie que $\Fbar_{t,q-1,q} \leq \Dbar_{t,q-1,q}$). L'état de croyance est alors $B_{tq} = (\Abar_{t,q+1,q},\Fbar_{t,q-1,q},\Dbar_{t,q-1,q})$. Comme pour $I_t$, l'utilisation de ces variables dépend de la politique. Plus loin, nous allons proposer différentes façons de calculer ces estimations.

Notre variable d'état complète est alors

$$
S_{tq} = (R_{tq}, I_{tq}, B_{tq}).
$$

Le taux de remplissage estimé $\Fbar_{t,q,q-1}$ peut être calculé de plusieurs manières :

- Réactive : $\Fbar_{t,q-1,q} = F_{t-1,q-1,q}$.
- Stable : $\Fbar_{t,q-1,q} = \theta^{trgt-fill}\_q$, où $\theta^{trgt-fill}\_q$ est un taux de remplissage cible fixé par l'agent $q$.
- Attentes régressives : $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \theta^{trgt-fill}\_q$ pour un facteur de lissage spécifié $0 \leq \gamma \leq 1$.
- Attentes adaptatives : $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \Fbar_{t,q-1,q}$.

Le principe d'« ancrage et ajustement » appliqué à ce contexte consiste à choisir un « ancre » qui indique combien nous nous attendons à devoir commander en moyenne, avec un « ajustement » pour refléter les conditions actuelles.

- **Politique de réapprovisionnement de base** – Nous pouvons utiliser n'importe laquelle des méthodes de calcul de $\Fbar$ pour obtenir la politique

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}) = \Fbar_{t,q-1,q}.
$$

- **Politique d'ancrage et d'ajustement** – Nous allons utiliser notre taux de commande estimé $\Fbar_{t,q-1,q}$ comme notre « ancre », qui est ce que nous nous attendons à devoir commander, mais nous allons faire des ajustements en fonction de notre stock disponible et du stock en transit. Nous représentons ces ajustements en utilisant $\delta R^{inv}\_{tq}$, l'ajustement basé sur le stock actuel $R^{inv}\_{tq}$ ; et $\delta R^{transit}\_{tq}$, l'ajustement basé sur le stock en transit actuel $R^{transit}\_{tq}$.

  Nous pouvons les utiliser pour créer une politique d'« ancrage et ajustement » donnée par

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta_q) = \max\{0,\Fbar_{t,q-1,q} + \delta R^{inv}_{tq} + \delta R^{transit}_{tq}\}.
$$

  Nous devons donc maintenant concevoir des mécanismes d'ajustement. Une stratégie possible pour $\delta R^{inv}\_t$ pourrait être

$$
\delta R^{inv}_{tq} = \theta^{inv}_q (R^{inv-trgt}_q - R^{inv}_{tq}),
$$

  où $\theta^{inv}\_q$ est un facteur de lissage et le stock cible $R^{inv-trgt}$ sont des paramètres ajustables.

  Une stratégie possible pour $\delta R^{transit}\_{tq}$ pourrait être

$$
\delta R^{transit}_{tq} = \theta^{transit} (R^{transit-trgt}_q - R^{transit}_{tq}).
$$

  Notre vecteur de paramètres ajustables serait alors

$$
\theta_q = (\theta^{inv}_q, R^{inv-trgt}_q, \theta^{transit}_q, R^{transit-trgt}_q).
$$

  Ces paramètres doivent être réglés pour chaque agent $q$.

La politique d'ancrage et d'ajustement a été motivée par le comportement humain, plutôt que par une justification qu'elle serait proche de l'optimalité. Un avantage est qu'elle est simple, transparente et intuitive. Le défi réside toujours dans les paramètres ajustables, et en particulier les cibles $R^{inv-trgt}$ et $R^{transit-trgt}$, car celles-ci sont présentées comme des paramètres statiques, alors qu'en réalité elles doivent réellement répondre aux conditions.

### Une politique d'anticipation

Nous avons d'abord posé une politique d'anticipation stochastique dans le [Chapitre 7](/sdam/fr/chapter-7/), mais nous la reproduisons ici pour faciliter la référence :

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA2}
\end{align}
$$

L'équation $\eqref{eq:policiesapproximateDLA2}$ peut être particulièrement redoutable. La Figure 11.2 illustre chacun des éléments de la politique à l'aide d'un arbre de décision de base (tout cela concerne un seul agent $q$ que nous supprimons). Il y a un ensemble de décisions $x_t$ qui émanent du premier nœud de décision $S_t$, après quoi nous prenons une espérance sur l'information aléatoire dans $\Wtilde_{t,t+1}$. Après cela, nous utilisons une « politique d'anticipation » approximative $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$ pour chaque nœud de décision $\Stilde_{tt'}$ dans notre modèle d'anticipation, où nous simplifions généralement la variable d'état d'une manière ou d'une autre. Nous approximons également l'information arrivant dans le futur en utilisant $\Wtilde_{tt'}$, soit en utilisant un modèle d'anticipation déterministe, soit un ensemble simulé de résultats possibles.

<figure class="book-figure">
  <img src="/assets/images/sdam/lookaheadpolicytodecisiontree.jpg" alt="Illustration de la politique d'anticipation sous forme d'arbre de décision." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figure 11.2.</span> Illustration de la politique d'anticipation sous forme d'arbre de décision.</figcaption>
</figure>

Cette équation peut être considérée comme composée de deux éléments :

- Nous énumérons d'abord chaque décision possible $x_{tq}$.
- Ensuite, nous simulons les effets de cette décision à l'aide d'un échantillon d'information aléatoire, tout en prenant des décisions à l'aide d'une « politique d'anticipation » approximative désignée $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$.

Pour utiliser cela dans notre contexte de chaîne d'approvisionnement, nous devons simuler le comportement des autres agents, en réalisant que a) nous ne connaissons pas les conditions initiales $R_{tq'}$ pour $q' \ne q$, et b) nous ne savons pas comment les autres agents prennent leurs décisions.

Pour gérer notre manque de connaissance des conditions de départ, nous devons les considérer comme des variables aléatoires et échantillonner à partir d'une distribution (ceci est enfoui dans le premier $\Etilde_{\Wtilde_{t,t+1}}$). Nous notons qu'il est possible qu'un agent ait, par exemple, aucun stock et un arriéré substantiel. Nous pourrions être en mesure de deviner que c'est le cas si nous constatons que le temps de remplissage des commandes que nous passons prend beaucoup de temps à être rempli.

Nous devons ensuite simuler les politiques inconnues. Alors que nous essayons de construire une politique d'anticipation stochastique très sophistiquée pour l'agent $q$ au temps $t$, nous suggérons d'utiliser les politiques beaucoup plus simples que nous avons suggérées précédemment, non seulement pour les autres agents, mais aussi pour l'agent $q$ dans les périodes futures.

Ainsi, compte tenu de ces approximations, une politique d'anticipation stochastique surpasserait-elle une des politiques plus simples que nous avons esquissées ci-dessus ? Ce serait une bonne question de recherche, mais la politique d'anticipation surmonte une limitation majeure des politiques paramétriques plus simples. Plus précisément, la politique d'anticipation capture naturellement l'état complexe de ce système, tel que l'historique des commandes précédentes ainsi que toute prévision des événements futurs. Les politiques paramétriques sont adaptées aux problèmes stationnaires, tandis que l'anticipation s'adapte naturellement à des comportements qui peuvent être fortement non stationnaires.

## Extensions

Il existe de nombreuses façons de modifier ce problème. Voici quelques idées :

**1)** Nous devons gérer les situations où les commandes des agents amont sont beaucoup plus importantes (ou peut-être plus petites) que ce que nous avons observé dans le passé, ce qui suggère un changement systématique de la demande. Nous pouvons introduire des estimations de la croissance potentielle des demandes futures pour gérer les changements inattendus de la demande amont.

**2)** Nous pouvons maintenir des croyances sur la façon dont les agents amont pourraient se comporter. Par exemple, cela aide l'agent $q$ si l'agent $q+1$ maintient des stocks généreux. Nous pouvons encourager la constitution de stocks en introduisant du bruit dans nos propres demandes, ce qui augmente ensuite l'estimation que l'agent $q+1$ a de l'incertitude dans les commandes passées par l'agent $q$.

**3)** Chaque agent réagit aux ruptures de stock, et répond en maintenant des stocks plus élevés. Un agent $q$ pourrait introduire du bruit dans ses commandes à $q+1$ afin que $q+1$ maintienne des stocks plus élevés, de sorte que les commandes de $q$ soient plus susceptibles d'être remplies.

**4)** Une grande partie de la sensibilité du jeu est due à la pénalité élevée pour rupture de stock par rapport à la détention de stock (rappelez-vous qu'il coûte 4 ＄ par caisse par jour de commandes en souffrance, et 1 ＄ par caisse par jour pour détenir du stock). Essayez de modifier le coût de rupture de stock de 4 ＄ à 1 ＄, puis à 0,50 ＄.

## Qu'avons-nous appris ?

- Nous décrivons un problème multiagent simple appelé le « jeu de la bière » (« beer game »), inventé dans les années 1950. Pour modéliser ce problème, nous introduisons une notation supplémentaire permettant de capturer la connaissance de chaque agent, ainsi que le transfert d'information entre agents. Cela peut être vu comme une série de problèmes de vendeur de journaux (« newsvendor ») à deux agents, avec cette particularité que le stock excédentaire est conservé jusqu'à la période suivante, tout comme les demandes non satisfaites.
- Les lecteurs sont invités à consulter une version simplifiée du jeu de la bière classique développée par l'auteur à Princeton University.
- Nous introduisons une notation qui capture ce que chaque agent connaît, y compris une estimation par un agent d'une information connue d'un autre agent.
- Nous modélisons une décision prise par un agent comme une information exogène pour un autre agent.
- Nous commençons par quelques politiques PFA simples où les agents s'adaptent à des informations basiques sur la quantité qu'ils doivent commander.
- Nous résumons ensuite une célèbre politique d'« ancrage et ajustement » suggérée par deux psychologues, qui constitue une autre forme de PFA.
- Enfin, nous esquissons une politique d'anticipation directe qui dépend d'un agent $q$ simulant le comportement des autres agents.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quel est l'état d'un agent intermédiaire ?</li>
<li>Quelles décisions peuvent être prises par chaque agent ?</li>
<li>Quelles sont les sources d'information exogène pour chaque agent intermédiaire ?</li>
<li>Quelles sources d'incertitude affectent le comportement du jeu ?</li>
<li>Expliquez en quelques mots ce que l'on entend par une politique d'« ancrage et ajustement ». Ses concepteurs s'attendaient-ils à ce qu'il s'agisse d'une bonne politique ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Proposez une critique des règles simples suggérées ci-dessus.</li>
<li>Imaginez qu'il existe des variations occasionnelles, mais peu fréquentes, de la demande du marché vers des niveaux beaucoup plus élevés ou plus bas. Concevez une politique qui tienne compte du fait que de telles variations peuvent se produire, ce qui signifie que le reste de la chaîne d'approvisionnement doit également s'adapter. Comment votre politique réagirait-elle aux périodes inévitables de pénuries de produits ?</li>
<li>La section sur la politique d'anticipation ci-dessus propose une esquisse sommaire d'une telle politique. Complétez les détails en rédigeant une implémentation détaillée.</li>
</ol>
{% endraw %}
