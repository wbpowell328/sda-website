---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "**Chapitre 13 : Problème de gestion des stocks de sang**"
permalink: /sdam/fr/chapter-13/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: 40aad1a1c3f43c6c
---


{% raw %}
## Vue d'ensemble du chapitre

Le problème de gestion des stocks de sang est un problème d'allocation de ressources multidimensionnel puisque nous devons gérer huit types de sang différents, tout en suivant la durée pendant laquelle le sang a été stocké (sauf s'il est congelé). C'est la première fois que nous devons recourir à des outils comme la programmation linéaire pour prendre des décisions à chaque instant.

Nous commençons par illustrer une politique myope qui consiste à résoudre un programme linéaire simple qui ignore la prise de décisions ne comprenant pas l'impact des décisions actuelles sur l'avenir. Pour la gestion du sang, cela peut survenir dans la gestion du sang de type $O-$, connu comme le donneur universel – il peut être utilisé pour tout patient. Il est utile de conserver des réserves de sang de type $O-$ en cas de pénurie d'autres types.

Nous démontrons ensuite l'utilisation de la programmation dynamique approximative pour équilibrer les récompenses actuelles avec les récompenses futures. Pour utiliser l'ADP sur un problème multidimensionnel, nous exploitons la structure du problème dans la conception d'une approximation de la valeur d'un ensemble de stocks de sang dans le futur. Cette idée fonctionne lorsque nous pouvons exploiter la structure du problème.

## Récit

Le problème de la gestion des stocks de sang constitue une illustration particulièrement élégante d'un problème d'allocation de ressources. Nous allons commencer par supposer que nous gérons des stocks dans un seul hôpital, où chaque semaine nous devons décider quels stocks de sang doivent être utilisés pour répondre aux demandes de la semaine à venir.

Il nous faut d'abord un peu de contexte sur le sang. Pour les besoins de la gestion des stocks de sang, nous nous intéressons principalement au type de sang et à son âge. Bien qu'il existe une vaste gamme de différences dans le sang de deux individus, pour la plupart des besoins les médecins se concentrent sur les huit principaux types de sang : $A+$ ("A positif"), $A-$ ("A négatif"), $B+$, $B-$, $AB+$, $AB-$, $O+$, et $O-$. Bien que la capacité à substituer différents types de sang puisse dépendre de la nature de l'opération, pour la plupart des besoins le sang peut être substitué selon le Tableau 13.1.

<div class="book-table-wrap">
<table class="book-table center-first-col">
<thead><tr><th>Donneur \ Receveur</th><th>$AB+$</th><th>$AB-$</th><th>$A+$</th><th>$A-$</th><th>$B+$</th><th>$B-$</th><th>$O+$</th><th>$O-$</th></tr></thead>
<tbody>
<tr><td>$AB+$</td><td>X</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>$AB-$</td><td>X</td><td>X</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>$A+$</td><td>X</td><td></td><td>X</td><td></td><td></td><td></td><td></td><td></td></tr>
<tr><td>$A-$</td><td>X</td><td>X</td><td>X</td><td>X</td><td></td><td></td><td></td><td></td></tr>
<tr><td>$B+$</td><td>X</td><td></td><td></td><td></td><td>X</td><td></td><td></td><td></td></tr>
<tr><td>$B-$</td><td>X</td><td>X</td><td></td><td></td><td>X</td><td>X</td><td></td><td></td></tr>
<tr><td>$O+$</td><td>X</td><td></td><td>X</td><td></td><td>X</td><td></td><td>X</td><td></td></tr>
<tr><td>$O-$</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 13.1.</span> Substitutions de sang autorisées pour la plupart des opérations, "X" signifie qu'une substitution est autorisée.</p>
</div>

Une deuxième caractéristique importante du sang est son âge. Le stockage du sang est limité à six semaines, après quoi il doit être jeté. Les hôpitaux doivent anticiper s'ils pensent pouvoir utiliser le sang avant qu'il n'atteigne cette limite, car il peut être transféré vers des centres de transfusion sanguine qui surveillent les stocks dans différents hôpitaux d'une région. Il est utile qu'un hôpital puisse identifier le sang dont il n'aura pas besoin dès que possible, afin que ce sang puisse être transféré vers des sites qui en manquent.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Maximiser la somme espérée des bonus moins les pénalités pour l'allocation de sang d'un type afin de satisfaire une demande d'un autre type.
- **Décisions :** Quelle quantité de sang d'un type affecter aux demandes de sang d'un autre type, ainsi que la quantité de sang à conserver en stock pour chaque type de sang.
- **Incertitudes :** Les demandes futures de sang de chaque type, ainsi que les dons de chaque type de sang.

## Modèle de base

### Variables d'état

Nous pouvons modéliser le problème du sang comme un problème d'allocation de ressources hétérogènes. Nous allons commencer par un modèle assez basique qui peut être facilement étendu sans presque aucun changement de notation. Nous commençons par décrire les attributs d'une unité de sang stockée en utilisant

$$
b = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix} = \begin{pmatrix} \text{blood type } (A+, A-, \ldots) \\ \text{age (in weeks)} \end{pmatrix},
$$

et soit $\Bcal$ l'ensemble de tous les types d'attributs de sang. Nous limiterons l'âge à la plage $0 \leq b_2 \leq 6$. Le sang avec $b_2 = 6$ (ce qui signifie un sang déjà âgé de six semaines) n'est plus utilisable. Nous supposons que les époques de décision se font par incréments d'une semaine. Les stocks de sang sont représentés en utilisant $R_{tb}$, les unités de sang de type $b$ disponibles pour être affectées ou conservées au temps $t$, avec $R_t = (R_{tb})\_{b\in\Bcal}$.

Les attributs de la demande de sang sont donnés par

$$
a = \begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix} = \begin{pmatrix} \text{blood type of patient} \\ \text{surgery type: urgent or elective} \\ \text{is substitution allowed?} \end{pmatrix},
$$

et soit $\Acal$ l'ensemble de tous les types d'attributs pour les demandes de sang. L'attribut $a_3$ capture le fait qu'il existe certaines opérations où un médecin n'autorisera aucune substitution. Un exemple est l'accouchement, car les nourrissons peuvent ne pas supporter un type de sang différent, même s'il s'agit d'un substitut autorisé. Pour notre modèle de base, nous ne permettons pas qu'une demande non satisfaite une semaine soit reportée à une semaine ultérieure.

Nous définissons ensuite la demande de sang en utilisant $D_{ta}$, le nombre d'unités de sang requises pour les patients ayant l'attribut $a$ au temps $t$, avec $D_t = (D_{ta})\_{a\in\Acal}$.

Les variables d'état sont données par

$$
S_t = (R_t,D_t).
$$

### Variables de décision

Nous agissons sur les ressources sanguines avec des décisions données par $d$, un type de décision, qui inclut les décisions de donner du sang à un patient ayant l'attribut $a\in\Acal$, ou de ne rien faire et de conserver le sang, ce que nous représentons par $d^\phi$ ; et $\Dcal$, l'ensemble de toutes les décisions possibles, $\Dcal = \Acal \cup d^\phi$.

Nous laissons ensuite $x_{tbd}$ être le nombre d'unités de sang ayant l'attribut $b$ sur lesquelles nous agissons avec une décision de type $d$ au temps $t$, avec $x_t = (x_{tbd})\_{b\in\Bcal,d\in\Dcal}$.

La région admissible $\Xcal_t$ est définie par les contraintes suivantes :

$$
\begin{align}
\sum_{d\in\Dcal} x_{tbd} &=  R_{tb}, \quad b\in\Bcal, \label{eq:blood1}\\
\sum_{b\in\Bcal} x_{tbd} &\leq \Dhat_{td}, \quad d\in\Dcal,\label{eq:blood2}\\
x_{tbd}                  &\geq 0. \label{eq:blood3}
\end{align}
$$

### Information exogène

L'information qui arrive après que nous ayons pris une décision est donnée par les dons de sang que nous représentons en utilisant $\Rhat_{t+1,b}$, le nombre de nouvelles unités de sang de type $b$ données entre $t$ et $t+1$, avec $\Rhat_{t+1} = (\Rhat_{t+1,b})\_{b\in\Bcal}$.

Les nouvelles demandes de sang sont modélisées en utilisant $\Dhat_{t+1,a}$, les unités de demande ayant l'attribut $a$ apparues entre $t$ et $t+1$, avec $\Dhat_{t+1} = (\Dhat_{t+1,a})\_{a\in\Acal}$.

Notre variable d'information exogène serait

$$
W_{t+1} = (\Rhat_{t+1}, \Dhat_{t+1}).
$$

### Fonction de transition

Le sang conservé vieillit simplement d'une semaine, mais nous limitons l'âge à six semaines. Le sang affecté pour satisfaire une demande peut être modélisé comme étant déplacé vers un puits de type sanguin, désigné, peut-être, en utilisant $b_{t,1} = \phi$ (le type de sang nul). La fonction de transition des attributs du sang $b^M(b_t,d_t)$ est donnée par

$$
b_{t+1} = \begin{pmatrix} b_{t+1,1} \\ b_{t+1,2} \end{pmatrix} = \begin{cases} \begin{pmatrix} b_{t,1} \\ \min\{6,b_{t,2}+1\} \end{pmatrix}, & d_t = d^\phi, \\[8pt] \begin{pmatrix} \phi \\ - \end{pmatrix}, & d_t \in\Dcal. \end{cases}
$$

Pour représenter la fonction de transition, il est utile de définir

$$
\delta_{b'}(b,d) = \begin{cases} 1 & b^x_t = b' = b^M(b_t,d_t),\\ 0 & \text{otherwise,} \end{cases}
$$

et soit $\Delta$ la matrice ayant $\delta_{b'}(b,d)$ à la ligne $b'$ et à la colonne $(b,d)$.

Nous notons que la fonction de transition des attributs est déterministe. Un élément aléatoire pourrait apparaître, par exemple, si des inspections du sang révélaient que du sang de moins de six semaines était jugé périmé. La fonction de transition des ressources peut maintenant s'écrire comme suit

$$
R^x_{tb'}   = \sum_{b\in\Bcal}\sum_{d\in\Dcal} \delta_{b'}(b,d) x_{tbd}, \qquad R_{t+1,b'}   = R^x_{tb'} + \Rhat_{t+1,b'}.
$$

Sous forme matricielle, celles-ci s'écriraient

$$
\begin{align}
R^x_t   &= \Delta x_t, \label{eq:bloodresourcetransition1}\\
R_{t+1} &= R^x_t + \Rhat_{t+1}. \label{eq:bloodresourcetransition2}
\end{align}
$$

Les demandes $D_{t+1}$ sont simplement observées à partir des nouvelles demandes $\Dhat_{t+1}$, nous écrivons donc ceci comme

$$
D_{t+1} = \Dhat_{t+1}.
$$

La Figure 13.1 illustre les transitions qui se produisent au cours de la semaine $t$. Nous devons soit décider quel type de sang utiliser pour satisfaire une demande (Figure 13.1a), soit conserver le sang jusqu'à la semaine suivante. Si nous utilisons du sang pour satisfaire une demande, il est considéré comme perdu pour le système. Si nous conservons le sang jusqu'à la semaine suivante, il est transformé en sang plus âgé d'une semaine. Le sang âgé de six semaines ne peut satisfaire aucune demande, nous pouvons donc considérer le compartiment de sang âgé de six semaines comme un puits pour le sang inutilisable (la valeur de ce sang serait nulle). Notez que les dons de sang sont supposés arriver avec un âge de 0.

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodnetworkdemands.jpg" alt="Assigning blood supplies to demands in week t." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 13.1a.</span> Affectation des approvisionnements en sang aux demandes durant la semaine $t$. Les lignes continues représentent l'affectation du sang à une demande, les lignes pointillées représentent la conservation du sang.</figcaption>
</figure>

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodnetworkhold.jpg" alt="Holding blood supplies until week t+1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figure 13.1b.</span> Conservation des approvisionnements en sang jusqu'à la semaine $t+1$.</figcaption>
</figure>

Les modèles représentés par la Figure 13.1 sont très utiles pour les problèmes d'allocation de ressources. Nous avons utilisé ce modèle avec beaucoup de succès pour optimiser l'allocation de produits manufacturés à travers des centres de distribution, et pour optimiser l'allocation de camions, wagons de marchandises et locomotives dans le transport de marchandises. Il faut faire preuve de prudence lors de l'estimation des approximations de la fonction de valeur, mais une fois qu'elles sont estimées, leur utilisation produit des séquences de très petits problèmes de réseau tels que ceux montrés dans la figure.

### Fonction objectif

Il n'y a pas de véritable « coût » à affecter du sang d'un type à une demande d'un autre type (nous ne considérons pas d'étapes telles que dépenser de l'argent pour encourager des dons supplémentaires, ou transporter des stocks d'un hôpital à un autre). Au lieu de cela, nous utilisons la fonction de contribution pour capturer les préférences du médecin. Nous souhaitons capturer la préférence naturelle selon laquelle il est généralement préférable de ne pas substituer, et que satisfaire une demande urgente est plus important qu'une demande élective.

Par exemple, nous pourrions utiliser les contributions décrites dans le Tableau 13.2. Ainsi, si nous utilisons du sang $O-$ pour satisfaire les besoins d'un patient électif nécessitant du sang $A+$, nous obtiendrions une contribution de -＄10 (pénalité puisqu'elle est négative) pour la substitution de sang, une contribution de +＄5 pour l'utilisation de sang $O-$ (quelque chose que les hôpitaux aiment encourager), et une contribution de +＄20 pour satisfaire une demande élective, pour une contribution totale de +＄15.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<thead><tr><th>Condition</th><th>Description</th><th>Valeur</th></tr></thead>
<tbody>
<tr><td>si $d = d^\phi$</td><td>Conservation</td><td>0</td></tr>
<tr><td>si $b_1 = b_1$ lorsque $d\in\Dcal$</td><td>Aucune substitution</td><td>0</td></tr>
<tr><td>si $b_1 \neq b_1$ lorsque $d\in\Dcal$</td><td>Substitution</td><td>-10</td></tr>
<tr><td>si $b_1 = O-$ lorsque $d\in\Dcal$</td><td>Substitution $O-$</td><td>5</td></tr>
<tr><td>si $d_2 = $ Urgent</td><td>Satisfaction d'une demande urgente</td><td>40</td></tr>
<tr><td>si $d_2 = $ Électif</td><td>Satisfaction d'une demande élective</td><td>20</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tableau 13.2.</span> Contributions pour différents types de sang et décisions.</p>
</div>

La contribution totale (au temps $t$) est finalement donnée par

$$
C_t(S_t,x_t) = \sum_{b\in\Bcal}\sum_{d\in\Dcal} c_{tbd} x_{tbd}.
$$

Comme précédemment, soit $X^\pi_t(S_t)$ une politique (une sorte de règle de décision) qui détermine $x_t\in\Xcal_t$ en fonction de $S_t$. Nous souhaitons trouver la meilleure politique en résolvant

$$
\begin{align}
\max_{\pi\in\Pi} \E \sum_{t=0}^T  C_t(S_t,X^\pi(S_t)),  \label{eq:bloodobjective}
\end{align}
$$

où $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$.

## Modélisation de l'incertitude

Les sources d'incertitude dans ce problème sont les dons de sang, et l'arrivée de nouvelles interventions chirurgicales nécessitant des transfusions sanguines. Certains points à considérer lors de la modélisation de cette incertitude incluent :

- Il n'y a pas seulement de l'aléa dans le nombre d'unités de sang données, mais aussi dans le type de sang.
- Il existe des schémas à la fois hebdomadaires et saisonniers dans les dons de sang, ainsi que des réponses à des appels qui, bien sûr, représentent une décision.
- L'arrivée de nouvelles interventions chirurgicales peut survenir en rafales à cause des conditions météorologiques ou de la violence.
- Il existe un décalage constant entre les types de personnes qui donnent du sang et les types de personnes qui ont besoin d'interventions chirurgicales, ce qui se traduit par des différences dans la distribution des types de sang.
- Un enjeu majeur est la gestion de la substitution des types de sang. Une grande attention est accordée à la capacité d'utiliser le sang de type $O-$ pour n'importe qui, mais il existe différents types de substitution pour tous les types de sang.

## Conception de politiques

Nous allons commencer par une politique myope de base, puis passer à une politique qui dépend de l'approximation de la valeur des stocks de sang dans le futur.

### Une politique myope

La façon la plus évidente de résoudre ce problème est une simple politique myope, où nous maximisons la contribution à chaque instant sans tenir compte de l'effet de nos décisions sur le futur. Nous pouvons obtenir une famille de politiques myopes en ajustant les contributions à une période.

Par exemple, notre bonus de 5 ＄ pour l'utilisation du sang $O-$ (dans le Tableau 13.2) est en réalité un type de politique myope. Nous encourageons l'utilisation du sang $O-$ car il est généralement plus disponible que les autres types de sang. En modifiant ce bonus, nous obtenons différents types de politiques myopes que nous pouvons représenter par l'ensemble $\Pi^M$, où pour $\pi\in\Pi^M$ notre fonction de décision serait donnée par

$$
\begin{align}
X^\pi_t(S_t) = \argmax_{x_t\in\Xcal_t} \sum_{b\in\Bcal} \sum_{d\in\Dcal} c_{tbd}x_{tbd}. \label{eq:bloodmyopic}
\end{align}
$$

Le problème d'optimisation dans $\eqref{eq:bloodmyopic}$ est un simple programme linéaire. Chercher parmi les politiques dans le problème d'optimisation donné par l'équation $\eqref{eq:bloodobjective}$ signifie rechercher différentes valeurs du bonus pour l'utilisation du sang $O-$.

### Une politique VFA

En tant que programme dynamique traditionnel, le problème d'optimisation posé dans l'équation $\eqref{eq:bloodobjective}$ est assez redoutable. La variable d'état $S_t$ a $\vert \Acal\vert  + \vert \Bcal\vert  = 8 \times 6 + 8 \times 2 \times 2 = 80$ dimensions. Les variables aléatoires $\Rhat$ et $\Dhat$ ont également un total combiné de 80 dimensions. Le vecteur de décision $x_t$ a $27 + 8 = 35$ dimensions.

Il est naturel d'utiliser des approximations de fonction de valeur pour déterminer le vecteur d'allocation $x_t$ en utilisant

$$
\begin{align}
x^n_t =  \argmax_{x_t\in\Xcal^n_t} \big(C_t(S^n_t,x_t) + \Vbar^{x,n-1}_t(R^x_t) \big), \label{eq:adpblood}
\end{align}
$$

où $R^x_t = R^M(R_t,x_t)$ est donné par l'équation $\eqref{eq:bloodresourcetransition1}$ et où $\Xcal^n_t$ est défini par les contraintes $\eqref{eq:blood1}$–$\eqref{eq:blood3}$. La contrainte clé est $\eqref{eq:blood1}$ qui limite la disponibilité des réserves de sang de chaque type.

Le premier (et le plus important) défi auquel nous sommes confrontés est d'identifier une stratégie d'approximation appropriée pour $\Vbar^{x,n-1}\_t(R^x_t)$. Une approximation simple et efficace consiste à utiliser des approximations séparables, linéaires par morceaux, c'est-à-dire

$$
\Vbar^x_t(R^x_t) = \sum_{b\in\Bcal} \Vbar^x_{tb}(R^x_{tb}),
$$

où $\Vbar^x_{tb}(R^x_{tb})$ est une fonction scalaire, linéaire par morceaux, du stock post-décision $R^x_{tb}$ pour chaque type de sang $b$.

Il est facile de montrer que la fonction de valeur est concave (ainsi que linéaire par morceaux), donc chaque $\Vbar^x_{tb}(R^x_{tb})$ devrait également être concave. Sans perte de généralité, nous pouvons supposer que $\Vbar^x_{tb}(R^x_{tb}) = 0$ pour $R^x_{tb} = 0$, ce qui signifie que la fonction est entièrement caractérisée par son ensemble de pentes. Nous pouvons écrire la fonction en utilisant

$$
\begin{align}
\Vbar^{n-1}_{tb}(R^x_{tb}) = \left(\sum_{r=1}^{\lfloor R^x_{tb}\rfloor} \vbar^{n-1}_{tb}(r-1)
    + (R^x_{tb} - \lfloor R^x_{tb}\rfloor) \vbar^{n-1}_{tb}(\lfloor R^x_{tb}\rfloor)\right), \label{eq:pwl}
\end{align}
$$

où $\lfloor R \rfloor$ est le plus grand entier inférieur ou égal à $R$. Comme nous pouvons le voir, cette fonction est déterminée par l'ensemble des pentes $(\vbar^{n-1}\_{tb}(r))$ pour $r = 0, 1, \ldots, R^{max}$, où $R^{max}$ est une borne supérieure sur le nombre de ressources d'un type particulier.

La façon dont nous estimons les pentes dans $\Vbar_t(R_t)$ consiste à créer la fonction objectif pour le problème au temps $t$

$$
\begin{align}
\Vtilde_{t}(S_t) =  \max_{x_t\in\Xcal^n_t} \big(C_t(S^{n}_t,x_t) + \Vbar^{x,n-1}_t(R^x_t) \big). \label{eq:bloodvtile}
\end{align}
$$

Lorsque nous résolvons ce programme linéaire, nous obtenons des estimations de la valeur marginale d'une unité supplémentaire de sang de type $a$ données par $R^n_{ta}$. Appelons cette valeur $\vhat^n_{ta}$, qui est immédiatement disponible à partir de n'importe quel logiciel de programmation linéaire (et nous l'obtenons pour chaque type de sang $a$ simultanément).

Alternativement, nous pourrions calculer la valeur marginale de manière plus précise en créant un vecteur de ressources perturbé $R^{n+}\_{ta} = R^n_{ta} +1$. Soit $\Xcal^{n+}\_t(a)$ la région faisable (constituée des équations $\eqref{eq:blood1}$–$\eqref{eq:blood3}$) où nous utilisons $R^{n+}\_{ta}$ au lieu de $R^n_{ta}$ pour un seul attribut $a$, et soit $\Vtilde^+\_{ta}(S_t)$ identique à $\Vtilde_t(S_t)$ sauf avec la région faisable $\Xcal^{n+}\_{ta}$ avec la ressource perturbée $R^{n+}\_{ta}$ au lieu de $R^n_{ta}$. Nous pouvons alors trouver les valeurs marginales $\vhat^n_{ta}$ en utilisant

$$
\vhat^n_{ta} = \Vtilde^+_{ta}(S_t) - \Vtilde_t(S_t).
$$

Notez que nous devons calculer $\Vtilde^+\_{ta}(S_t)$ pour chaque $a$ (alors qu'avec les variables duales, nous obtenons l'ensemble complet des valeurs marginales en une seule fois).

Nous utilisons ensuite $\vhat^n_{ta}$ pour mettre à jour l'*approximation de la fonction de valeur post-décision précédente* $\vbar^{x,n}\_{t-1,a}$, ce qui se fait avec

$$
\vbar^{x,n}_{t-1,a}(R^{x,n}_{t-1,a}) = (1-\alpha) \vbar^{x,n-1}_{t-1,a}(R^{x,n}_{ta}) + \alpha \vhat^n_{ta}.
$$

Nous pouvons montrer que les pentes $\vbar^{x,n}\_{ta}(R^{x,n}\_{ta})$ diminuent lorsque $R^{x,n}\_{ta}$ augmente, il est donc utile de maintenir cette propriété. Nous pouvons y parvenir avec des méthodes telles que les algorithmes CAVE ou Leveling (voir *Reinforcement Learning and Stochastic Optimization*, Section 18.3).

En supposant que nous puissions estimer cette fonction, le problème d'optimisation que nous devons résoudre (équation $\eqref{eq:adpblood}$) est le programme linéaire relativement modeste illustré dans la Figure 13.2. Comme pour la Figure 13.1, nous devons considérer à la fois l'affectation des différents types de sang aux différents types de demande, et la décision de conserver le sang.

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodadpnetwork.jpg" alt="Modèle de réseau pour le temps t avec des approximations de fonction de valeur séparables, linéaires par morceaux." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figure 13.2.</span> Modèle de réseau pour le temps $t$ avec des approximations de fonction de valeur séparables, linéaires par morceaux.</figcaption>
</figure>

Pour simplifier la figure, nous avons regroupé le réseau des différents types de demande en une seule boîte agrégée avec la demande $\Dhat_t$. Ce réseau ressemblerait en réalité exactement au réseau de la Figure 13.1a. La décision de conserver du sang doit prendre en compte la valeur d'un type de sang (y compris son âge) dans le futur, que nous approximons en utilisant des fonctions de valeur séparables, linéaires par morceaux.

Ici, nous utilisons une astuce de modélisation standard qui convertit les approximations de fonction de valeur séparables, linéaires par morceaux, en une série de liens parallèles allant de chaque nœud représentant un élément de $R^x_t$ vers un super-puits. Les fonctions linéaires par morceaux ne sont pas seulement faciles à résoudre (il suffit d'avoir accès à un solveur de programmation linéaire), elles sont également faciles à estimer. De plus, pour de nombreuses classes de problèmes (mais pas toutes), on a constaté qu'elles produisent une convergence très rapide avec des solutions de haute qualité.

Avec cette fonction de décision, nous allons utiliser une méthode appelée *itération sur les valeurs approchée* où nous simulons de manière itérative en avant à travers les périodes de temps $t=0, \ldots, T$. Soit $n = 1, \ldots, N$ le compteur d'itération, où nous suivons une trajectoire échantillonnée de l'information exogène $W^n_t,~t=0, \ldots, T$ (celles-ci peuvent être tirées de l'historique, ou échantillonnées à partir d'une distribution). Au temps $t$, itération $n$, nous utilisons l'équation $\eqref{eq:adpblood}$ pour prendre une décision $x^n_t$ lorsque nous sommes dans l'état $S^n_t$. Nous observons ensuite $W^n_{t+1}$ et utilisons notre fonction de transition (équations $\eqref{eq:bloodresourcetransition1}$–$\eqref{eq:bloodresourcetransition2}$) pour la transition de $R^n_t$ vers $R^n_{t+1}$. Lorsque nous sommes dans l'état $S^n_t = (R^n_t, \Dhat^n_t)$, nous utilisons notre politique VFA dans l'équation $\eqref{eq:adpblood}$ pour calculer $x^n_t$, puis nous calculons $\vhat^n_t$ pour mettre à jour les pentes $\vbar^{x,n}\_{t-1}$. Nous observons ensuite $W^n_{t+1}$ (qui contient $\Dhat^n_{t+1}$) pour effectuer la transition vers l'état $S^n_{t+1}$.

Pour la plupart des applications opérationnelles, ce problème serait résolu sur un horizon fini (disons, 10 semaines), ce qui nous donnerait une recommandation sur ce qu'il faut faire immédiatement. Nous pouvons utiliser les approximations de fonction de valeur $\Vbar^x_t(R^x_t)$ pour simuler la politique un certain nombre de fois, ce qui peut être utilisé pour produire une forme de prévision probabiliste des stocks futurs.

## Extensions

Ceci est un problème d'allocation de ressources riche et complexe qui peut être étendu de plusieurs façons. En voici quelques exemples.

**1)** Nous supposons que toute demande non satisfaite au temps $t$ est perdue. Imaginez que nous ayons des chirurgies d'urgence qui doivent être satisfaites, et des chirurgies électives qui peuvent être reportées à une période ultérieure. Écrivez la variable d'état pour le nouveau problème.

**2)** Supposons que les chirurgies électives puissent être reportées. Envisagez d'utiliser une approximation de fonction de valeur qui soit linéaire par morceaux et séparable dans les stocks de sang (c'est la VFA suggérée ci-dessus), ainsi que des VFA linéaires par morceaux et séparables pour la quantité de demande en attente (par type de sang). Nous utilisons les variables duales pour le stock de sang afin de mettre à jour la VFA pour les réserves de sang. Comment pourrions-nous mettre à jour la VFA pour la demande en attente ?

**3)** Incluez la présence de sang congelé, et la décision de congeler le sang, où le sang congelé qui n'est pas utilisé doit être jeté. Cela signifie que nous devons reconnaître que la quantité de sang nécessaire pour une chirurgie est inconnue avant la chirurgie, au moment où la décision de décongeler le sang doit être prise.

**4)** Un hôpital pourrait exiger des livraisons hebdomadaires de sang provenant d'une banque de sang communautaire pour compenser des pénuries systématiques. Imaginez qu'une quantité fixe (par exemple, 100 unités) de sang arrive chaque semaine, mais que la quantité de sang de chaque type et âge (le sang peut déjà avoir été conservé en stock pendant plusieurs semaines) pourrait être aléatoire.

**5)** Nous avons présenté un modèle qui se concentrait uniquement sur les stocks de sang dans un seul hôpital. Nous pouvons gérer plusieurs hôpitaux et centres de distribution en ajoutant simplement un attribut de localisation, et en prévoyant une décision de déplacer du sang (à un coût) d'un lieu à un autre.

Ce modèle peut également être appliqué à tout problème de stock multiproduit où il existe différents types de produits et différents types de demandes, tant que nous avons la capacité de choisir quel type de produit est affecté à chaque type de demande. Nous supposons également que les produits ne sont pas réutilisables ; une fois qu'un produit est affecté à une demande, il est perdu pour le système.

## Qu'avons-nous appris ?

- Nous introduisons un problème d'allocation de ressources multidimensionnel qui présente un espace d'état extrêmement vaste, mais qui offre la structure de concavité que nous pouvons exploiter dans l'approximation des fonctions de valeur.
- Nous montrons comment modéliser un problème d'allocation de ressources multi-attributs, ce qui rend assez facile l'introduction d'attributs supplémentaires.
- Nous illustrons une politique myope de base où l'impact en aval des décisions prises maintenant est ignoré.
- Nous décrivons ensuite une politique VFA où nous exploitons la concavité naturelle du problème pour proposer une approximation basée sur des approximations de fonction de valeur séparables, linéaires par morceaux.
- Notre politique VFA devrait être mise en œuvre de manière glissante, donc notre politique est en réalité un DLA stochastique, utilisant une politique VFA pour la politique d'anticipation. Cela fait écho à notre utilisation de la programmation dynamique pour résoudre le problème du plus court chemin déterministe, qui représentait une approximation de notre problème de plus court chemin stochastique et dynamique dans le [Chapitre 6](/sdam/fr/chapter-6/).

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Quelle est la dimensionnalité de la variable d'état $S_t$ ?</li>
<li>Quelle est la dimensionnalité du vecteur de décision $x_t$ ?</li>
<li>Quelles sont les source(s) d'incertitude ?</li>
<li>Décrivez la nature des coûts dans la fonction objectif. D'où proviennent-ils ?</li>
<li>Quelle est la limitation d'une politique purement myope ? Quel comportement rechercheriez-vous d'une meilleure politique ?</li>
<li>Comment l'utilisation des fonctions de valeur améliore-t-elle la solution ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Gestion du sang - Partie I : Modélisation - Nous allons considérer le problème de gestion du sang, mais nous allons supposer qu'il n'existe qu'un seul type de sang, bien que nous allons toujours modéliser le processus de vieillissement, où le sang peut avoir de 0 à 5 semaines. Tout sang âgé de 5 semaines qui est conservé doit être jeté. Comme dans le livre, il existe deux types de patients : urgents et électifs. Soit :</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$R_{t\tau}$</td><td>Nombre d'unités de sang disponibles au temps $t$ qui ont été conservées pendant $\tau$ périodes de temps, $\tau = 0, \ldots, 5$.</td></tr>
<tr><td>$\Rhat_t$</td><td>Nouveaux dons de sang qui arrivent entre $t-1$ et $t$, où $\Rhat_t$ est un scalaire.</td></tr>
<tr><td>$\Dhat^{urgent}_t$</td><td>Nouvelles demandes urgentes qui arrivent au temps $t$.</td></tr>
<tr><td>$\Dhat^{elective}_t$</td><td>Nouvelles demandes électives qui arrivent au temps $t$.</td></tr>
</tbody>
</table>
</div>

<p>Au temps $t$, nous devons décider :</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$x^{urgent}_t$</td><td>Quantité de sang à affecter aux patients urgents.</td></tr>
<tr><td>$x^{elective}_t$</td><td>Quantité de sang à affecter aux patients électifs.</td></tr>
<tr><td>$x^{hold}_t$</td><td>Quantité de sang à conserver.</td></tr>
<tr><td>$x_t$</td><td>$(x^{urgent}_t,x^{elective}_t,x^{hold}_t)$.</td></tr>
</tbody>
</table>
</div>

<p>Les demandes n'ont pas nécessairement besoin d'être couvertes, bien que la véritable question soit de savoir s'il faut couvrir une demande élective maintenant (en supposant qu'il y ait suffisamment de sang pour couvrir toutes les demandes urgentes) ou conserver le sang pour une demande urgente potentielle dans le futur. Comme précédemment, supposez que toute demande non servie quitte le système.</p>

<p>Votre objectif est de maximiser une fonction d'utilité qui accorde un crédit de 10 pour chaque patient urgent couvert et de 5 pour chaque patient électif couvert.</p>
  <ol type="a">
    <li>Quelle est la variable d'état pour ce problème ?</li>
    <li>Quelles sont les variables de décision et l'information exogène ?</li>
    <li>Quelle est la fonction de transition ?</li>
    <li>Quelle est la fonction objectif ? Supposez que nous puissions simuler la politique dans un simulateur.</li>
    <li>Créez une fonction de coût paramétrée qui attribue les coûts suivants à chaque décision : $c^{urgent}$, pénalité pour ne pas avoir couvert un patient urgent ; $c^{elective}$, pénalité pour ne pas avoir couvert un patient électif ; et $c^{discard}$, pénalité pour avoir jeté du sang dépassant l'âge de 5 semaines.

    Comme politique, supposez que vous allez minimiser ces coûts à chaque période. Traitez le vecteur $c=(c^{urgent},c^{elective},c^{discard})$ comme un ensemble de paramètres ajustables. Décrivez comment optimiser le vecteur $c$ à l'aide d'un algorithme de gradient stochastique. Veillez à donner l'équation permettant de calculer le gradient stochastique.</li>
  </ol>
</li>
<li>Gestion des stocks de sang - Partie II : programmation dynamique approchée en arrière - Nous allons maintenant concevoir une politique fondée sur l'idée d'approximer la fonction de valeur en utilisant la programmation dynamique approchée en arrière. Cela signifie que vous devez spécifier un modèle linéaire pour approximer $V^x_t(S^x_t)$. Les détails de ce modèle n'ont pas vraiment d'importance, mais vous pourriez utiliser quelque chose comme

$$
\Vbar^x_t(S^x_t) = \thetabar_{t0} + \sum_{age=0}^5 \theta_{t1,age} R^{urgent,x}_{t,age} +  \sum_{age=0}^5 \theta_{t2,age} R^{elective,x}_{t,age}.
$$

Pour les besoins de cet exercice, vous pouvez simplement écrire $\Vbar^x_t(S^x_t) = (\theta_t)^T \phi(S^x_t)$ où $\theta_t$ est un vecteur colonne de coefficients et $\phi(S^x_t)$ est un vecteur colonne de caractéristiques.
  <ol type="a">
    <li>Définissez l'état post-décision, et utilisez-le pour écrire l'équation de Bellman caractérisant une politique optimale. Vous devrez écrire une expression pour la valeur $V_t(S_t)$ d'être dans l'état pré-décision $S_t$ au temps $t$ en fonction de la valeur $V^x_t(S^x_t)$ d'être dans l'état post-décision $S^x_t$. Vous devrez ensuite écrire une expression pour $V^x_t(S^x_t)$ en fonction de $V_{t+1}(S_{t+1})$. Supposez que les unités de sang sont toujours entières.</li>
    <li>Quelle est la dimensionnalité des variables d'état pré-décision et post-décision ? Nous préoccupons-nous de la taille de l'espace d'état ?</li>
    <li>Rédigez un pseudo-code détaillé décrivant comment estimer les approximations de la fonction de valeur pour ce problème sur un horizon fini $0, \ldots, T$. Considérez cela comme un exercice de programmation sans la programmation réelle. Il doit être suffisamment détaillé pour que vous puissiez le remettre à un camarade de classe du cours (familier avec la matière) qui pourrait ensuite écrire le code.</li>
    <li>Rédigez la politique en utilisant votre expression pour la fonction de valeur approchée.</li>
  </ol>
</li>
<li>Gestion des stocks de sang - Partie III : politique d'anticipation - Cette fois, nous allons supposer que nous disposons de prévisions glissantes des approvisionnements et des demandes. Soit $f^R_{tt'}$ la prévision des dons de sang au temps $t'$ établie à partir de ce que nous savons au temps $t$. Soit $f^{D,urgent}_{tt'}$ et $f^{D,elective}_{tt'}$ les prévisions des nouvelles demandes urgentes et électives arrivant au temps $t'$ compte tenu de ce que nous savons au temps $t$. Supposez que les prévisions sont fournies de manière exogène (c'est-à-dire que nous n'avons pas à modéliser comment les prévisions évoluent de $t$ à $t+1$). Vous pouvez utiliser

$$
\begin{align*}
f^R_t &= (f^R_{tt'})_{t'=t+1}^T, \\
f^{D,urgent}_t &= (f^{D,urgent}_{tt'})_{t'=t+1}^T, \\
f^{D,elective}_t &= (f^{D,elective}_{tt'})_{t'=t+1}^T, \\
f_t &= (f^R_t,f^{D,urgent}_t,f^{D,elective}_t).
\end{align*}
$$

Soit $\sigma^R_{t'-t}$ l'écart type de l'erreur entre les dons réels $\Rhat_{tt'}$, que nous supposons connu sur la base des performances passées. Nous supposons que cela dépend uniquement de la distance dans le futur pour laquelle nous planifions, donnée par $t'-t$. De même, soit $\sigma^{D,urgent}_{t'-t}$ et $\sigma^{D,elective}_{t'-t}$ les écarts types des erreurs dans les prévisions des nouvelles demandes urgentes et électives.
  <ol type="a">
    <li>Modélisez les cinq éléments d'un problème de décision séquentielle pour ce contexte. Vous devriez pouvoir reprendre des éléments de l'une des parties précédentes pour ce problème. N'hésitez pas à référencer toute équation par son numéro que vous souhaitez réutiliser. Le changement majeur est l'inclusion des prévisions.</li>
    <li>Rédigez une politique DLA utilisant une anticipation déterministe avec des prévisions comme estimations ponctuelles de tout don ou demande futurs.</li>
    <li>Concevez maintenant une politique paramétrée où vous remplacez chaque prévision par une valeur qui se situe à un certain nombre d'écarts types au-dessus (ou au-dessous) de la prévision ponctuelle. Utilisez trois paramètres, que vous pourriez désigner $\theta = (\theta^R, \theta^{urgent}, \theta^{elective})$. Écrivez le problème consistant à trouver la meilleure valeur pour $\theta$ comme un problème d'optimisation. Expliquez toutes les hypothèses que vous devez faire dans votre formulation.</li>
    <li>Votre fonction objectif dans la partie (c) implique d'approximer une espérance. Vous pouvez le faire par simulation, où vous simuleriez une trajectoire échantillon $\omega$ sur un horizon de $T$ périodes de temps. Que signifie $\omega$ ?</li>
    <li>Donnez les formules permettant de calculer la moyenne et la variance échantillon de la performance d'une politique à partir de $L$ simulations utilisant les trajectoires échantillons $\omega^1, \ldots, \omega^L$.</li>
    <li>Supposez que vous représentiez l'ensemble des valeurs possibles du vecteur $\theta$ par l'échantillon $\theta^1, \ldots, \theta^K$. Décrivez une méthode de recherche utilisant l'estimation par intervalles paramétrée par $\lambda^{IE}$ (dans le livre nous avons utilisé $\theta^{IE}$, mais cela crée trop de $\theta$). Vous devrez décrire votre modèle de croyance et comment il est mis à jour chaque fois que vous exécutez une simulation utilisant $\theta = \theta^k$. Supposez que vous disposez d'un budget de $N$ simulations, et que $\lambda^{IE}$ est connu.</li>
  </ol>
</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *BloodManagement* disponible sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li><p>Notre objectif est de gérer l'affectation de différents types de sang à différents patients, qui sont caractérisés d'abord par leur propre type sanguin, et ensuite par le fait que la chirurgie est urgente ou élective.</p>

<p>Cet exercice vous fera travailler avec deux classes de politiques : une fonction de coût paramétrique myope, et une politique fondée sur des approximations de la fonction de valeur.</p>

<p>Nous allons commencer par supposer que vous allez simplement associer différents types de sang à différentes demandes. Le sang est décrit par son type sanguin (dont il existe huit) et son âge, qui variera de 0 à 2 semaines (le sang âgé de 3 semaines est jeté). Les patients sont décrits par leur type sanguin et le fait que la chirurgie soit urgente ou élective. Il existe divers bonus et pénalités qui orientent les affectations. Par exemple, il y a des bonus positifs pour couvrir les patients urgents (c'est le plus élevé). Il y a également un bonus pour faire correspondre exactement les types sanguins (par exemple, du sang A-positif avec un patient A-positif), et une pénalité pour avoir jeté du sang lorsqu'il devient trop vieux.</p>

<p>Si nous ignorons l'impact des décisions actuelles sur l'avenir, nous obtenons un programme linéaire simple qui associe les approvisionnements et les demandes, avec des coûts donnés par cet ensemble de bonus. Le problème est qu'en ignorant l'impact des décisions actuelles sur l'avenir, nous pouvons constater que nous ne faisons pas le mieux possible. Un problème se pose lorsque nous utilisons du sang maintenant pour une chirurgie élective, car nous ignorons que cela pourrait être utile de le conserver au cas où nous manquerions de sang pour une chirurgie urgente plus tard. Alternativement, nous pouvons utiliser du sang O- maintenant plutôt que de le conserver pour l'avenir, moment où nous pourrions manquer d'autres types de sang.</p>

<p>Soit $R_{ta}$ l'approvisionnement en sang avec l'attribut $a$ pour la semaine $t$, et soit $R_t = (R_{ta})_{a\in\Acal}$ où $\Acal$ est l'ensemble de tous les différents attributs de sang (type sanguin et âge). De même, soit $D_{tb}$ les attributs d'un patient où $b$ capture le type sanguin et le fait que la chirurgie soit urgente ou élective, et soit $D_t = (D_{tb})_{b\in\Bcal}$. L'état de notre système est $S_t = (R_t,D_t)$.</p>

<p>Maintenant, soit $\Rhat_{t+1,a}$ le nombre d'unités de sang avec l'attribut $a$ qui ont été données entre les semaines $t$ et $t+1$. De même, soit $\Dhat_{t+1,b}$ le nombre de nouvelles arrivées de patients avec l'attribut $b$. Nous écririons</p>

$$
W_{t+1} = (\Rhat_{t+1,a},\Dhat_{t+1,b}).
$$

<p>Enfin, soit $\omega$ représentant une trajectoire échantillon $W_1(\omega), \ldots, W_T(\omega)$ des dons et des nouveaux patients sur notre horizon de $T$ semaines. Supposez que nous avons créé un ensemble de simulations de $W_t$, et soit $\Omega=(\omega_1, \ldots, \omega_N)$ cet ensemble de réalisations échantillons.</p>
  <ol type="a">
    <li>Combien de dimensions la variable d'état $S_t$ possède-t-elle ?</li>
    <li>Soit $X^\pi(S_t\vert \theta)$ le résultat de la résolution du programme linéaire compte tenu de l'état $S_t$, où $\theta$ est le vecteur de tous les bonus et pénalités pour les différentes affectations. Soit $D^{urgent}_t(x_t)$ le nombre de patients urgents qui ont été couverts compte tenu du vecteur de décision $x_t$, et soit $D^{elective}_t(x_t)$ le nombre de patients électifs qui ont été couverts. Écrivez le problème consistant à trouver la meilleure valeur de $\theta$ comme un problème d'optimisation, où au lieu de notre espérance habituelle vous allez l'écrire comme une moyenne sur les trajectoires échantillons dans $\Omega$.</li>
    <li>Nous allons considérer un jeu de données où il existe une probabilité que la demande connaisse occasionnellement des pics. Vous pouvez définir cette probabilité dans la feuille de calcul. Fixez cette probabilité de pic à 50 pour cent. Il existe une pénalité spéciale pour l'utilisation de sang afin de couvrir une chirurgie élective, destinée à encourager le modèle myope à conserver du sang pour une chirurgie urgente qui pourrait connaître une augmentation de la demande ultérieurement. Trouvez la meilleure valeur de cette pénalité dans l'ensemble $\lbrace -4,-9,-14,-19,-24\rbrace $ après avoir exécuté 20 itérations de test.</li>
    <li>Sans effectuer de travail numérique supplémentaire, imaginez maintenant que la pénalité sur le sang O-négatif doive dépendre de la semaine afin de tenir compte des variations saisonnières. Puisque vous simulez 15 semaines, décrivez une méthode d'optimisation sur un vecteur à 15 dimensions (nous avons décrit deux stratégies fondamentales dans les devoirs précédents - vous pouvez en choisir une, ou en inventer une nouvelle).</li>
  </ol>
</li>
<li><p>Nous allons maintenant passer à une politique fondée sur une VFA, où nous utilisons la valeur marginale de chaque type de sang (et âge) qui est conservé pour l'avenir. Cela sera fait à l'aide d'un algorithme d'apprentissage adaptatif décrit dans la section sur la politique VFA ci-dessus (et très similaire à notre stratégie ADP pour le problème du plus court chemin, sauf que nous le faisons maintenant pour un problème où la décision est un vecteur).</p>

<p>Fixez la pénalité pour l'utilisation de sang sur des chirurgies électives à 0. Lorsque vous utilisez une politique fondée sur une VFA, la VFA devrait apprendre que du sang urgent excédant l'approvisionnement pourrait être nécessaire à l'avenir. Lorsque vous utilisez la politique VFA, vous devrez exécuter 20 itérations d'entraînement pour estimer les fonctions de valeur. Après leur estimation, vous exécuterez ensuite 20 itérations de test pour évaluer la qualité de la politique.</p>

<p>Nous allons tester nos politiques pour un jeu de données où il existe une probabilité que la demande connaisse occasionnellement des pics. Vous pouvez définir cette probabilité dans la feuille de calcul. Commencez par fixer cette probabilité de pic à 0,7.</p>
  <ol type="a">
    <li>L'algorithme d'apprentissage adaptatif nécessite d'estimer la valeur marginale de chaque type de sang. Soit $\vhat^n_{ta}$ notre estimation de la valeur marginale du type de sang $a$ pour la semaine $t$ lors de la simulation de la trajectoire échantillon $\omega^n$.

    Soit $\Vbar^{n-1}_t(R_{ta})$ notre estimation, après $n-1$ itérations, de la valeur marginale de la $r$e unité de sang où $r = R^x_{ta}$ à la fin de la semaine $t$ (ceci est notre variable d'état « post-décision »). Rappelez-vous que nous utilisons $\vhat^n_{ta}$ pour mettre à jour l'approximation de la fonction de valeur autour de la variable d'état post-décision précédente. Nous écrivons ce processus de mise à jour comme

    $$
    \Vbar^n_{t-1,a}(R^{x,n}_{t-1,a}) = (1-\alpha) \Vbar^{n-1}_{t-1,a}(R^{x,n}_{t-1,a}) + \alpha \vhat^n_{ta}.
    $$

    Notre première tâche consiste à régler $\alpha$. Exécutez l'algorithme de programmation dynamique approchée sur 20 itérations (c'est ainsi que la feuille de calcul est configurée) pour $\alpha \in  \lbrace 0, 0.05, 0.1, 0.2, 0.3\rbrace $ et rapportez les résultats. Notez qu'un pas $\alpha = 0$ équivaut à maintenir l'approximation de la fonction de valeur égale à zéro (en d'autres termes, la politique myope). Si $\alpha = 0$, vous n'avez pas besoin d'entraîner les VFA, il vous suffit donc d'exécuter les 20 itérations de test pour évaluer la politique.

    Quelle est la performance de la politique VFA par rapport à la politique myope (correspondant à $\alpha = 0$) ?</li>
    <li>Passez maintenant la probabilité de pic à zéro, et comparez la politique myope à la politique VFA en utilisant un pas de $\alpha = 0.2$. Comment ces politiques se comparent-elles ? Pouvez-vous expliquer le comportement pour ce jeu de données par rapport à celui où il y avait des pics ?</li>
  </ol>
</li>
</ol>
{% endraw %}
