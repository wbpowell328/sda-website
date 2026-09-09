---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 14 : Optimiser les essais cliniques"
permalink: /sdam/fr/chapter-14/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: d2f03f02e366eab2
---


{% raw %}
## Aperçu du chapitre

Pour mettre un médicament sur le marché, les entreprises pharmaceutiques doivent passer par un processus de test en trois phases, se terminant par la plus coûteuse, la Phase III, où le médicament est administré à des centaines, voire des milliers de patients. Chaque semaine, l'entreprise pharmaceutique examine les résultats des expériences et doit prendre la décision de poursuivre les tests, d'arrêter et de commercialiser le médicament, ou d'arrêter et d'abandonner le médicament.

Il existe plusieurs sources d'incertitude. La première, bien sûr, est l'efficacité du médicament lui-même. Cependant, pour tester le médicament, il faut recruter des patients disposés à le prendre (ou un placebo), ce qui introduit une autre source d'incertitude. Il existe ensuite l'incertitude sur la probabilité qu'un médicament fonctionne sur un patient particulier, qui est distincte du résultat réel observé lorsque le médicament est administré à un patient.

Nous utilisons ce cadre pour illustrer trois politiques d'anticipation directe différentes, en proposant différentes façons d'approximer le problème, depuis un modèle simple qui ne fonctionnerait jamais jusqu'à des modèles plus sophistiqués offrant une meilleure précision au prix d'une plus grande complexité.

## Narration

À tout moment, les entreprises pharmaceutiques peuvent mener des centaines de milliers d'essais cliniques testant de nouveaux médicaments (voir [clinicaltrials.gov](https://clinicaltrials.gov)). Les tests de médicaments se déroulent en trois phases :

**Phase I** – Ce sont des tests menés auprès de 20 à 100 volontaires sur quelques mois pour déterminer la dose, identifier les effets secondaires et effectuer une évaluation initiale de la réponse au médicament et des effets secondaires.

**Phase II** – Ce sont des essais plus vastes impliquant plusieurs centaines de patients sur une période de deux ans. L'objectif est de déterminer si la maladie répond au traitement.

**Phase III** – Ce sont des essais impliquant des centaines, voire des milliers de patients, s'étendant souvent sur plusieurs années, pour évaluer l'efficacité et la sécurité. C'est à ce stade que l'on détermine si le traitement est meilleur que les traitements existants.

Les essais de Phase II et de Phase III nécessitent tous deux d'identifier des patients présentant les caractéristiques appropriées pour entrer dans l'essai, après quoi ils sont assignés aléatoirement à l'un des groupes de comparaison.

Dans notre exercice, nous supposons que nous recrutons un ensemble d'hôpitaux et de cliniques chaque semaine pour atteindre une population *potentielle*, à partir de laquelle les patients seront identifiés comme candidats à l'essai sur la base de dossiers papier. Il existe un coût administratif initial pour inscrire un hôpital ou une clinique à l'essai. Le coût administratif reflète le bassin de patients dont l'établissement pourrait disposer pour l'étude. Par exemple, il pourrait coûter 250 000 ＄ pour inscrire un groupe d'hôpitaux et de cliniques avec une population potentielle totale de 500 patients. Dans notre modèle, nous fixerons simplement un coût d'inscription de 500 ＄ par patient, en gardant à l'esprit qu'il s'agit d'une population potentielle totale, à partir de laquelle nous tirons les inscriptions réelles.

Une fois qu'un établissement est inscrit, nous faisons alors la publicité de l'essai clinique, à la suite de quoi des patients (ou leurs médecins) se présentent. À ce stade, un patient est soumis à une évaluation plus détaillée, qui détermine qui est accepté dans l'essai. Les patients non éligibles sont alors écartés.

Pour les besoins de cet exercice, nous allons supposer que chaque patient reçoit un traitement médicamenteux en début de semaine. À la fin de la semaine, nous savons si le patient répond ou non. Les patients qui répondent sont désignés comme des succès, les autres comme des échecs. Chaque semaine nécessite donc un tout nouvel ensemble de patients, mais ceux-ci sont tirés de la population de base que nous avons inscrite. Nous ne pouvons augmenter cette population qu'en ajoutant de la capacité supplémentaire à l'essai, et en payant le coût administratif initial.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont :

- **Métriques :** Maximiser le revenu espéré reçu lorsqu'un médicament est approuvé pour utilisation, moins le coût hebdomadaire de conduite d'un essai, moins le coût d'administration du médicament à chaque patient de l'étude.
- **Décisions :** Il existe trois types de décisions prises lors de la conduite d'un essai clinique : continuer à mener l'essai une semaine supplémentaire, ou l'arrêter ; si la décision est prise d'arrêter, il faut décider s'il faut abandonner le médicament ou procéder à sa commercialisation ; et si nous poursuivons l'essai, nous devons également décider du nombre de nouveaux patients à recruter.
- **Incertitudes :** Il existe deux sources d'incertitude : le nombre de patients qui s'inscrivent à l'essai chaque semaine, et les résultats de chaque patient dans l'essai, selon qu'ils ont reçu le médicament ou un placebo.

## Modèle de base

Nous supposons que nous prenons des décisions à la fin de chaque semaine $t$, à mettre en œuvre pendant la semaine $t+1$. Nous notons le temps $t$ pour désigner la fin de la semaine $t$.

### Variables d'état

Nous avons les variables d'état suivantes : $R_t$, la population potentielle de patients dans les hôpitaux et cliniques qui ont été inscrits ; $\alpha_t$, le nombre de succès du traitement à la semaine $t$ au cours de l'essai clinique ; $\beta_t$, le nombre d'échecs du traitement à la semaine $t$ ; et $\bar\lambda^{response}\_t$, la fraction estimée de patients potentiels qui choisissent de rejoindre l'essai compte tenu de ce que nous savons au temps $t$.

En utilisant cette information, nous pouvons estimer la probabilité que notre traitement soit un succès en utilisant $\rho_t$, la probabilité que le traitement soit un succès compte tenu de ce que nous savons à la fin de la semaine $t$, de sorte que

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Cela signifie que notre variable d'état serait

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

Il est raisonnable d'utiliser $R_0 = 0$ comme valeur initiale de $R_t$, mais il est utile d'utiliser des estimations initiales de la probabilité de succès basées sur des essais cliniques antérieurs.

### Variables de décision

Nous modélisons le nombre de patients potentiels inscrits en utilisant $x^{enroll}\_t$, l'augmentation de la population potentielle de patients acquise en ajoutant de nouveaux établissements hospitaliers. Le nombre de patients qui rejoignent réellement l'essai clinique sera tiré de cette population pendant la semaine $t+1$.

Nous avons également la décision du moment d'arrêter l'essai représentée par

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

Si $x^{trial}\_t = 0$, alors nous allons définir $R_{t+1} = 0$, ce qui arrête l'essai. Nous supposons qu'une fois l'essai arrêté, nous ne pouvons pas le redémarrer, ce qui signifie que nous exigerons que $x^{trial}\_t = 0$ si $R_t = 0$.

Si nous arrêtons l'essai, nous devons déclarer si le médicament est un succès ou un échec,

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

Nous allons créer des politiques $X^{\pi^{enroll}}(S_t)$, $X^{\pi^{trial}}(S_t)$ et $X^{\pi^{drug}}(S_t)$ qui déterminent $x^{enroll}\_t$, $x^{trial}\_t$ et $x^{drug}\_t$. Nous pouvons alors écrire

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

Comme toujours, nous concevons les politiques plus tard.

### Information exogène

Nous identifions d'abord les nouveaux patients et les retraits de patients de l'essai en utilisant $\Rhat_{t+1}$, le nombre de nouveaux patients rejoignant l'essai pendant la semaine $t+1$, qui dépend de la population potentielle de patients qui ont été inscrits, donnée par $R_{t+1} = R_t + x^{enroll}\_t$. Nous pourrions, par exemple, supposer que chaque patient de la population $R_{t+1}$ pourrait s'inscrire à l'essai clinique avec une certaine probabilité $\lambda^{response}$ qui doit être estimée à partir des données.

Nous suivons ensuite nos succès avec $\Xhat_{t+1}$, le nombre de succès pendant la semaine $t+1$, et $\Yhat_{t+1}$, le nombre d'échecs pendant la semaine $t+1$. Le nombre d'échecs pendant la semaine $t$ peut être calculé comme

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

Ces variables dépendent du nombre de patients $R_t$ dans le système à la fin de la semaine $t$. Comme toujours, nous renvoyons à la section sur la modélisation de l'incertitude le développement des modèles de probabilité sous-jacents pour ces variables aléatoires.

Notre processus d'information exogène est alors

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

où nous excluons $\Yhat_{t+1}$ car il peut être calculé à partir des autres variables.

### Fonction de transition

L'équation de transition pour le nombre de patients inscrits est donnée par

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

Nous mettons à jour la probabilité que le médicament soit un succès en comptant le nombre de succès et d'échecs en utilisant

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

Enfin, nous mettons à jour notre estimation du nombre de patients qui s'inscrivent à l'essai en lissant l'estimation actuelle $\bar\lambda^{response}\_t$ avec le dernier ratio du nombre de ceux qui se sont inscrits pendant la semaine $t+1$, $\Rhat_{t+1}$, et le nombre de ceux actuellement inscrits, $R_t + x^{enroll}\_t$.

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

Les équations $\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$ constituent la fonction de transition que nous représentons de façon générique en utilisant

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Fonction objectif

Nous devons prendre en compte les coûts suivants : $c^{enroll}$, le coût de maintien d'un patient dans l'essai par période de temps ; $c^{trial}$, les frais généraux administratifs continus liés à la poursuite de l'essai (qui cessent lorsque nous arrêtons les tests) ; et $p^{success}$, le revenu (important) obtenu si nous arrêtons et déclarons un succès, ce qui signifie généralement la vente du brevet à un fabricant.

Le profit (contribution) au cours d'une période de temps serait alors donné par

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

Notre fonction objectif serait alors notre objectif canonique que nous formulons comme

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

où nous reconnaissons que notre politique est une composition de la politique de recrutement de patients $X^{\pi^{enroll}}(S_t)$, de la politique de poursuite de l'essai $X^{\pi^{trial}}(S_t)$, et de la politique de succès/échec du médicament $X^{\pi^{drug}}(S_t)$.

## Modélisation de l'incertitude

Il existe deux raisons potentielles de développer un modèle formel d'incertitude. La première est pour le modèle de base, que nous pouvons utiliser à la fois pour concevoir des politiques et pour mener des études. La seconde est que nous pourrions vouloir modéliser l'incertitude dans une politique d'anticipation stochastique.

Nous commençons par développer un modèle de base probabiliste, ce qui signifie que nous allons faire de notre mieux pour modéliser le problème réel, en reconnaissant que tous les modèles mathématiques sont des approximations du monde réel.

Nous devons modéliser trois variables aléatoires :

- Le nombre de clients $\Rhat_{t+1}$ qui s'inscrivent à l'essai.
- Le taux de succès (inobservable) $\rho^{true}$.
- Le nombre de succès $\Xhat_{t+1}$, que nous observons effectivement.

Nous traitons chacune d'elles ci-dessous.

### Le processus de recrutement des patients

Nous allons utiliser le modèle simple selon lequel nous faisons des choix (par exemple en inscrivant des hôpitaux et des cliniques) qui nous permettent d'espérer inscrire $x^{enroll}\_t$ patients pour la semaine $t+1$, ce qui nous donne une population totale de $R_{t+1} = R_t + x^{enroll}\_t$. La réalité sera différente. Nous proposons de modéliser le nombre réel d'arrivées en supposant qu'elles suivent une loi de Poisson de moyenne $\bar\lambda^{response} (R_t + x^{enroll}\_t)$ où $0 < \bar\lambda^{response} < 1$ est la fraction de patients potentiels qui choisissent de rejoindre l'essai (qui est inconnue). Cela signifie que nous pouvons écrire

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

Nous pouvons utiliser une distribution de Poisson tronquée pour $\Rhat_{t+1}$, où nous devons reconnaître que le nombre de patients qui rejoignent l'essai est limité par le nombre de patients potentiels donné par $R_{t+1} = R_t + x^{enroll}\_t$. Soit

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

le nombre attendu de patients qui se porteront volontaires pour l'essai (compte tenu de $R_t$) et

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

Nous écrivons $P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$ en fonction de $x^{enroll}\_t$ et $\Rbar_t$ pour refléter sa dépendance à la décision et au nombre $R_{t+1} = R_t + x^{enroll}\_t$.

La distribution de Poisson tronquée est alors donnée par

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

Pour un processus de population tel que celui-ci, un processus de Poisson constitue un bon point de départ. Il présente la propriété que la moyenne est égale à la variance, laquelle est égale à $\Rbar_t$.

### La probabilité de succès

Les succès sont déterminés par la probabilité sous-jacente, mais inobservable, que le traitement produise un succès chez un patient au cours d'une semaine. Nous utilisons le style bayésien consistant à attribuer une distribution de probabilité à $\rho^{true}$. Il existe trois façons de représenter la distribution de notre croyance sur $\rho^{true}$ :

- Une loi a priori uniforme, où nous supposerions que $\rho^{true}$ est uniformément distribué entre $0$ et $1$.
- Une distribution bêta avec les paramètres $(\alpha_0,\beta_0)$.
- Une distribution échantillonnée, où nous supposons que $\rho^{true}$ prend l'une des valeurs de l'ensemble $(\rho_1, \ldots, \rho_K)$, où nous fixons notre distribution initiale comme $p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$. Nous pourrions poser $p_{0k} = 1/K$ (cela serait comparable à l'utilisation de la loi a priori uniforme). Alternativement, nous pourrions estimer ces valeurs à partir de la distribution bêta.

Pour l'instant, nous allons utiliser notre distribution échantillonnée car c'est la plus facile à manipuler.

### Le processus de succès

Le nombre aléatoire de succès $\Xhat_{t+1}$, compte tenu de ce que nous savons au temps $t$, dépend d'abord de la variable aléatoire $\Rhat_{t+1}$ donnant le nombre de patients qui sont entrés dans l'essai, et de la probabilité inconnue $\rho^{true}$ de succès dans l'essai. La façon de créer la distribution de $\Xhat_{t+1}$ consiste à utiliser la puissance du conditionnement. Nous supposons que $\Rhat_{t+1} = r$ et que $\rho^{true} = \rho_k$.

Étant donné que $r$ patients entrent dans l'essai et en supposant que la probabilité de succès est $\rho_k$, le nombre de succès $\Xhat_{t+1}$ est la somme de $r$ variables aléatoires de Bernoulli (c'est-à-dire 0/1). La somme de $r$ variables aléatoires de Bernoulli est donnée par une distribution binomiale, ce qui signifie

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

On peut trouver la distribution inconditionnelle de $\Xhat_{t+1}$ en sommant simplement sur $r$ et $k$ et en multipliant par les probabilités appropriées, ce qui nous donne

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

Utiliser des distributions de probabilité explicites telles que celle pour $\Xhat_{t+1}$ dans l'équation $\eqref{eq:clinicaltrialsuccessdist}$ est pratique lorsqu'on peut les trouver (et les calculer), mais il existe de nombreux problèmes complexes où cela n'est pas possible. Par exemple, même l'équation $\eqref{eq:clinicaltrialsuccessdist}$ a nécessité l'astuce consistant à utiliser une représentation échantillonnée de la variable aléatoire continue $\rho^{true}$. Sans cela, nous aurions dû introduire une intégrale sur la densité de $\rho^{true}$.

Une autre approche, beaucoup plus simple et qui s'étend à des situations encore plus compliquées, utilise l'échantillonnage de Monte Carlo pour générer $\Rhat_{t+1}$ et $\Xhat_{t+1}$. Ce processus est décrit ci-dessous, et produit un échantillon $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ (et le $\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$ correspondant). Nous pouvons désormais approximer la variable aléatoire $\Xhat_{t+1}$ par l'ensemble des résultats $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$, chacun pouvant se produire avec une probabilité égale.

<div class="book-algorithm">
<p><strong>Un modèle basé sur Monte Carlo du processus d'essai clinique</strong></p>
<p><strong>Étape 1.</strong> Boucler sur les itérations $n=1, \ldots, N$ :</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2a.</strong> Générer un échantillon de Monte Carlo $r^n \sim \Rhat_{t+1}(x^{enroll})$ à partir de la distribution de Poisson donnée par l'équation $\eqref{eq:clinicaltrialpoisson2}$.</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2b.</strong> Générer un échantillon de Monte Carlo de la véritable probabilité de succès $\rho^n \sim \rho^{true}$.</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2c.</strong> Étant donné $r^n$ et $\rho^n$, boucler sur nos $r^n$ patients et générer une variable aléatoire 0/1 qui vaut 1 (c'est-à-dire que le médicament a été un succès) avec une probabilité $\rho^n$.</p>
<p style="margin-left: 1.5rem;"><strong>Étape 2d.</strong> Sommer les succès et considérer cela comme une réalisation échantillonnée de $\Xhat^n_{t+1}$.</p>
<p><strong>Étape 3.</strong> Produire l'échantillon $\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$.</p>
</div>

## Conception des politiques

Nous allons utiliser ce problème pour bien comprendre notre politique d'anticipation stochastique complète, que nous avons introduite pour la première fois dans le [Chapitre 7](/sdam/fr/chapter-7/), donnée par

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

Nous allons nous concentrer sur ce que signifie cette maximisation sur les politiques $\pi$ intégrée dans la politique (ce que l'on pourrait appeler la « politique-dans-la-politique »).

Pour notre application d'essais cliniques, nous devons concevoir des politiques pour les trois décisions différentes : le nombre de patients à recruter, la poursuite ou non de l'essai, et la décision de déclarer ou non le médicament comme un succès lorsque l'essai est arrêté. Nous allons commencer par concevoir des approximations de fonctions politiques simples pour les décisions d'arrêter ou de continuer, et, si nous arrêtons, de déclarer le médicament comme un succès ou un échec. Nous aborderons ensuite la décision plus difficile du nombre de patients à recruter dans l'essai.

### Arrêter l'essai

Nous commençons par utiliser notre croyance concernant $\rho^{true}$ donnée par la distribution bêta de paramètres $(\alpha_t,\beta_t)$, ce qui nous donne une estimation de

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Introduisons maintenant les paramètres $\theta^{stop-low}$ et $\theta^{stop-high}$, où nous allons arrêter l'essai et déclarer un succès si $\bar\rho_t > \theta^{stop-high}$, tandis que nous arrêterons l'essai et déclarerons un échec si $\bar\rho_t < \theta^{stop-low}$. Soit $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$. Nous utilisons ces règles pour définir la politique d'arrêt de l'essai comme

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

Si nous arrêtons l'essai, alors la politique pour déclarer un succès (1) ou un échec (0) est donnée par

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### La politique de recrutement des patients

Il arrive souvent que les problèmes comportant un état physique (tel que $R_t$) nécessitent une politique d'anticipation, tout comme nous l'avons utilisé avec notre problème de plus court chemin stochastique. Mais, comme nous l'avons vu avec le problème de plus court chemin stochastique, nous pouvons choisir ce que nous plaçons dans notre modèle d'anticipation stochastique.

Un choix que nous devons faire concerne la politique d'arrêt $X^{trial}(S_t\vert \theta^{stop})$ et la politique de succès/échec $X^{drug}(S_t\vert \theta^{stop})$, où nous proposons d'utiliser le même vecteur de paramètres $\theta^{stop}$ dans notre modèle d'anticipation que dans notre modèle de base. Nous pouvons désigner celles-ci par $\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$ et $\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$, puisqu'elles ne s'appliquent désormais qu'au modèle d'anticipation.

Le problème consistant à déterminer combien de nouveaux patients potentiels recruter est quelque peu plus difficile, car il faut payer un coût initial pour recruter davantage de patients potentiels, et nous devons le faire dans l'incertitude quant à la disposition des patients à rejoindre l'essai (donnée par le paramètre inconnu $\lambda^{response}$).

Pour créer un modèle d'anticipation complet comme nous l'avons décrit ci-dessus, nous créerions des variables telles que $\tilde\lambda_{tt'}$ pour la version d'anticipation de $\bar\lambda^{response}\_t$, $\tilde\rho_{tt'}$ pour $\bar\rho_t$, et $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ pour $(\alpha_t, \beta_t)$. Sinon, toute la logique serait la même que celle du modèle d'incertitude original.

Bien que nous puissions utiliser le modèle d'incertitude complet, nous pouvons choisir de simplifier le modèle de différentes manières. Ces choix incluent :

- Le taux de recrutement $\bar\lambda^{response}\_t$ – Nous avons deux options : nous pouvons continuer à estimer $\bar\lambda^{response}\_t$, où nous introduirions la notation $\tilde\lambda^{response}\_{tt'}$ comme l'estimation au temps $t'$ dans le modèle d'anticipation du taux de recrutement $\lambda$ ; ou bien nous pourrions fixer $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, qui est notre estimation au temps $t$ dans le modèle de base.
- Le taux de succès du médicament $\rho^{true}$ – Nous avons de nouveau deux options : nous pouvons continuer à estimer le taux de succès, pour lequel nous définirions les variables $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ pour cumuler les succès et les échecs dans le modèle d'anticipation ; ou bien nous pourrions fixer $(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$ à l'intérieur du modèle d'anticipation.

En utilisant nos choix de modélisation de l'incertitude, nous pouvons proposer trois stratégies différentes pour concevoir un modèle d'anticipation :

**Modèle A** – Modèle d'anticipation déterministe. Ici, nous allons supposer que le taux de recrutement $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, ce qui signifie que le taux de recrutement est fixé à l'estimation au temps $t$ lorsque nous créons le modèle d'anticipation. Nous supposons ensuite que la véritable probabilité de succès du médicament est fixée à

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

qui est notre estimation au temps $t$ dans le modèle de base.

**Modèle B** – Nous fixons notre estimation du taux de recrutement à $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, mais supposons que nous continuons à apprendre sur l'efficacité du médicament.

**Modèle C** – Nous modélisons le processus d'apprentissage du taux de recrutement $\tilde\lambda_{tt'}$ et de l'efficacité du médicament $\tilde\rho_{tt'}$.

Notons que nous n'avons pas inclus le quatrième modèle potentiel où nous fixerions l'efficacité du médicament tout en continuant à apprendre le taux de recrutement des patients (nous verrons dans un instant à quel point ce modèle serait absurde).

Nous allons utiliser ces trois modèles pour illustrer le processus de conception d'un modèle d'anticipation.

### Modèle A

Le modèle A est un problème déterministe, puisque nous fixons à la fois le taux de recrutement estimé $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, et $\tilde\rho_{tt'} = \bar\rho_t$. La bonne nouvelle, c'est qu'il s'agit essentiellement d'un problème de plus court chemin déterministe, où le nombre de patients que nous avons inscrits (dans le modèle d'anticipation), donné par $\Rtilde_{tt'}$, s'apparente à un nœud dans un réseau, et la décision $\xtilde^{enroll}\_{tt'}$ est un lien qui nous conduit au nœud $\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$.

Pour le voir, rappelons l'équation $\eqref{eq:shortestpathbellman1}$ pour notre problème de plus court chemin déterministe, que nous reprenons ici

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

Il suffit maintenant de remplacer $v_i$ par la valeur au nœud $i$, par $\Vtilde_{tt'}(\Rtilde_{tt'})$ qui est la valeur du fait d'avoir $\Rtilde_{tt'}$ patients inscrits (rappelons que nous sommes dans notre modèle d'anticipation). La décision de se rendre au nœud $j$ est remplacée par la décision d'inscrire $\xtilde^{enroll}\_{tt'}$ patients. Au lieu de nous conduire au nœud $j$, elle nous conduit au nœud $\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$. L'équation de Bellman devient ainsi

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

La fonction de profit à une période $\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$ est adaptée de la même fonction pour notre modèle de base (voir l'équation $\eqref{eq:clinicaltrialprofit}$).

Il n'y a qu'un seul problème avec notre modèle d'anticipation déterministe : nous ne nous arrêterions jamais, car notre politique d'arrêt exige que notre estimation de $\tilde\rho_{tt'}$ entre dans les régions de « succès » ou d'« échec » (elle devrait commencer dans la région « continuer », car sinon nous aurions arrêté le modèle de base). Cela ne signifie toutefois pas que nous ne pouvons pas utiliser le modèle d'anticipation déterministe : il suffit de fixer un horizon $H$ et de s'arrêter lorsque $t' = t+H$.

En utilisant cette stratégie, nous résolvons notre problème de plus court chemin déterministe sur l'horizon $t'=t, \ldots, t+H$, puis nous en déduisons $\xtilde^\ast \_{tt}$. Notre politique de recrutement est alors

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

Nous n'affirmons pas qu'il s'agira d'une politique efficace. Nous illustrons principalement les types d'approximations de modélisation qui peuvent être réalisées dans un modèle d'anticipation.

### Modèle B

Nous allons maintenant fixer notre estimation du taux de réponse $\tilde\lambda_{tt'}$ à notre estimation $\bar\lambda^{response}\_t$ au temps $t$ dans le modèle de base. Pour simplifier notre modèle, nous allons supposer que le nombre d'inscriptions $\tilde\Rhat_{t,t'+1}$ est égal au nombre attendu de patients qui se porteront volontaires $\tilde\Rbar_{tt'}$. Les inscriptions $\tilde\Rhat_{t,t'+1}$ sont générées de manière déterministe à partir de

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

où $\lfloor x \rfloor$ signifie arrondir $x$ à l'entier inférieur le plus proche. Nous calculons ensuite la distribution de $\tilde\Xhat_{t,t'+1}$ en utilisant $Prob[\Xhat_{t+1} = s\vert \Rbar_t]$ mais en remplaçant $\Rbar_t$ par $\tilde\Rbar_{tt'}$.

Nous devons toujours générer le nombre de succès $\tilde\Xhat_{t,t'+1}$ à partir d'une vérité simulée $\tilde\rho_{tt'}$, à partir de laquelle nous mettrons à jour $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$, ce que nous faisons en utilisant

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

Nous modélisons la distribution de $\tilde\Xhat_{t,t'+1}$ en utilisant $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ dans l'équation $\eqref{eq:clinicaltrialsuccessdist}$ mais en conditionnant sur $\tilde\Rbar_{tt'}$ au lieu de $\Rbar_t$ (rappelons que nous pouvons aussi utiliser la distribution échantillonnée à l'aide de la méthode de Monte Carlo décrite ci-dessus au lieu de la distribution de Poisson).

Nous pouvons résoudre le modèle d'anticipation en adaptant l'équation de Bellman du modèle A dans l'équation $\eqref{eq:clinicaltrialbellmanModelA}$ pour $t'=t, \ldots, t+H$ :

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

où $\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$ est conditionné sur le nombre de succès $\tilde\Xhat_{t,t'+1} = s$, et où $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ provient de l'équation $\eqref{eq:clinicaltrialsuccessdist}$. Nous devons garder à l'esprit que l'évolution de $\Rtilde_{tt'}$ doit refléter si nous avons décidé d'arrêter ou de poursuivre l'essai au sein du modèle d'anticipation.

Notre variable d'état physique (nombre total de patients potentiels) $\Rtilde_{t,t'+1}$ est donnée par

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

Notons que, comme pour notre modèle de base, le nombre de patients potentiels retombe à zéro si nous arrêtons l'essai dans le modèle d'anticipation.

Notre estimation actuelle du succès du médicament (dans le modèle d'anticipation) est calculée en utilisant

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

Dans l'espérance, si l'on conditionne sur le fait que le nombre de succès soit $\tilde\Xhat_{t,t'+1} = s$, alors l'état de croyance mis à jour $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ est

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

Nous devons maintenant résoudre le modèle d'anticipation en utilisant l'équation de Bellman de <span style="white-space: nowrap;">l'équation $\eqref{eq:clinicaltrialbellmanModelB}$.</span> Pour ce problème, il est judicieux d'utiliser un horizon $H$ suffisamment grand pour pouvoir supposer avec confiance que nous aurions arrêté l'essai d'ici là (c'est-à-dire $\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$). Cela signifie que nous pouvons supposer que $\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$, et remonter dans le temps à partir de là jusqu'au temps $t$. Une fois le programme dynamique résolu, nous pouvons en extraire notre décision de recrutement en utilisant

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### Modèle C

Le modèle C modélise le processus d'apprentissage du taux de recrutement $\tilde\lambda_{tt'}$ et de l'efficacité du médicament $\tilde\rho_{tt'}$.

Le modèle C est presque identique au modèle de base, puisque nous modélisons toutes les différentes formes d'incertitude. La seule chose qui en fait un modèle d'anticipation serait l'introduction de la politique simplifiée (notre « approximation de fonction politique ») pour l'arrêt de l'essai, et pour déterminer si le médicament est un succès. Cependant, nous pourrions ignorer ces politiques et formuler l'ensemble du problème comme un programme dynamique, en utilisant la variable d'état complète.

## Qu'avons-nous appris ?

- Nous introduisons le problème des essais cliniques pour illustrer les défis d'un problème impliquant un apprentissage actif (il y a des variables d'état de croyance) tout en gérant une ressource finie (le budget pour tester des patients).
- Nous illustrons trois types d'incertitude : le processus de recrutement des patients, la probabilité que le médicament soit un succès, et le processus de succès pour les patients individuels.
- Nous identifions deux décisions : arrêter ou non l'essai et déclarer un succès ou un échec, et l'admission des patients dans l'essai.
- Nous concevons ensuite trois types de politiques d'anticipation qui se distinguent par la manière dont nous approximons le modèle d'anticipation, et la manière dont nous approximons les politiques dans le modèle d'anticipation.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>La variable d'état $S^n$ inclut des croyances sur deux quantités incertaines. Quelles sont ces quantités incertaines, et comment les croyances à leur sujet sont-elles saisies dans la variable d'état ?</li>
<li>Expliquez les trois décisions qui doivent être prises pendant l'essai clinique.</li>
<li>Expliquez les types d'information exogène, et comment ils sont affectés par les décisions et l'état du système.</li>
<li>Expliquez la logique de la politique d'anticipation appelée Modèle A, et discutez de ses forces et de ses faiblesses.</li>
<li>Expliquez la logique de la politique d'anticipation appelée Modèle B, et discutez de ses forces et de ses faiblesses.</li>
<li>Expliquez la logique de la politique d'anticipation appelée Modèle C, et discutez de ses forces et de ses faiblesses.</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Plus haut, nous avons écrit la politique d'anticipation directe complète comme suit</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

Si nous pouvions effectivement calculer ceci, nous aurions une politique optimale. Nous allons explorer cette politique, puis l'appliquer à notre problème d'essai clinique.
  <ol type="a">
    <li>Supposez que chaque variable aléatoire $W_{t+1}, \ldots, W_T$ ne puisse prendre que les valeurs 0 ou 1. Supposez ensuite que la décision $x_t, \ldots, x_T$ puisse également ne prendre que les valeurs 0 ou 1. La politique de l'équation $\eqref{eq:optDLAclinicaltrials2}$ peut être illustrée sous forme d'arbre de décision. Dessinez l'arbre pour l'horizon $t, t + 1, t + 2$.</li>
    <li>Quelle est la structure de la politique $X^\pi_{t'}(S_{t'})$ représentée par l'arbre de décision de la partie (a) ? Autrement dit, quel type de fonction est $X^\pi_{t'}(S_{t'})$ lorsqu'elle est donnée par un arbre de décision ?</li>
  </ol>
</li>
<li><p>Comme nous ne pouvons généralement pas calculer l'équation $\eqref{eq:optDLAclinicaltrials2}$, nous devons remplacer le modèle d'anticipation complet par un modèle d'anticipation approché que nous écrivons comme</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

où la dynamique de notre modèle d'anticipation approché est régie par

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>Imaginez que notre politique dans le modèle d'anticipation soit une fonction paramétrique telle que « arrêter d'enrôler des patients lorsque $\rhobar_t$ sort de la plage $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$ ». Pour les besoins de cette question, nous pouvons également remplacer la politique d'enrôlement par un simple « enrôler $\thetatilde^{enroll}$ patients » (ceci serait un paramètre statique). Nous pouvons écrire cette fonction comme $X^{\tilde \pi}(\Stilde_{tt'})$ où $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$. Comment réécririez-vous l'équation $\eqref{eq:policiesapproximateDLA3}$ pour refléter le fait que la politique dans le modèle d'anticipation est une fonction paramétrique ?</li>
    <li>La partie (a) implique que nous devons trouver le meilleur $\thetatilde$ pour un état donné $\Stilde_{t,t+1}$ au temps $t$. Cela signifie que la solution optimale est en fait une fonction $\thetatilde_{t+1}(\Stilde_{t,t+1})$. Celle-ci devrait être calculée étant donné que nous sommes dans l'état simulé $\Stilde_{t,t+1}$ du modèle d'anticipation approché.

    En pratique, trouver la politique optimale à chaque fois que nous avançons d'un pas semble compliqué (et coûteux), puisqu'il faudrait s'arrêter et ajuster $\thetatilde$ pour chaque état $\Stilde_{t,t+1}$ dans lequel nous nous retrouvons.

    Imaginez maintenant que nous souhaitions simplifier le processus en trouvant un seul $\theta$ que nous utiliserions pour tous les temps $t$, et pour tout état $\Stilde_{t,t+1}$. Écrivez le problème d'optimisation qu'il faudrait résoudre pour trouver cette valeur de $\theta$.</li>
    <li>Que change-t-il dans les équations $\eqref{eq:policiesapproximateDLA3}$ et $\eqref{eq:policiesapproximateDLA4}$ si nous remplaçons la variable aléatoire $\Wtilde_{t,t'+1}$ dans le modèle d'anticipation par une prévision ponctuelle $f^W_{tt'}$ ? Continuez à supposer que la politique est la fonction paramétrique que nous avons introduite dans la partie (a).</li>
    <li>Décrivez les approximations faites dans le modèle d'anticipation Modèle B pour le problème de l'essai clinique.</li>
  </ol>
</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *ClinicalTrialsDriverScript.py* sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Fixez la taille de l'essai à $T = 50$, l'horizon d'anticipation à $H = 5$ et exécutez une simulation du Modèle A. Notez le temps d'arrêt et expliquez pourquoi le modèle d'anticipation déterministe produit le même nombre de nouveaux patients potentiels $x^{enroll}_{t}$ à chaque instant $t$.</li>
<li>Fixez maintenant l'horizon d'anticipation à $H = 50$. Modifiez le module *ClinicalTrialsDriverScript.py* pour inclure une boucle for et exécutez 10 simulations (itérations de test) du Modèle B. Calculez le revenu moyen sur l'ensemble des simulations.</li>
<li>Lors du choix de $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ pour notre PFA déterminant quand arrêter, nous choisissons habituellement un $\theta^{stop-high}$ suffisamment grand pour nous assurer que le médicament est efficace. Inversement, nous choisissons un $\theta^{stop-low}$ élevé afin que, si le taux de réussite réel du médicament est faible, nous arrêtions l'essai tôt avant de perdre trop d'argent. Cependant, nous ne pouvons pas rendre $\theta^{stop-low}$ trop élevé, sinon nous risquons d'arrêter l'essai avant d'avoir suffisamment d'informations sur le taux de réussite réel du médicament.

Fixez $\theta^{stop-high} = 0.8$ et faites varier $\theta^{stop-low}$ dans l'intervalle $[0.77, 0.79]$, par incréments de 0,005. Pour chaque $(\theta^{stop-low}, \theta^{stop-high})$ ainsi obtenu, exécutez 5 simulations du Modèle B et calculez le revenu moyen. Tracez les revenus obtenus en fonction des valeurs de $\theta^{stop-low}$.</li>
<li>Les Modèles A et B résolvent chacun un problème d'anticipation dans lequel au moins l'une des estimations $\lambdabar_{tt'}$ et $\rhobar_{tt'}$ est fixée au temps $t$ dans le modèle de base. Le Modèle C utilise uniquement le modèle de base sous la forme d'une politique hybride de recherche de politique-VFA pour modéliser le processus d'apprentissage à la fois du taux d'enrôlement $\lambdabar_{tt'}$ et de $\rhobar_{tt'}$. Cependant, nous pouvons créer une version d'anticipation du Modèle C (appelée Extension du Modèle C) dans laquelle les enrôlements $\tilde\Rhat_{t,t'+1}$ sont générés à partir de la distribution de Poisson tronquée de moyenne

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

et la distribution de $\tilde\Xhat_{t,t'+1}$ est la même que dans le Modèle B.

Votre tâche consiste à implémenter l'Extension du Modèle C en ajoutant la méthode *model_C_extension_value_fn* au module Python *ClinicalTrialsPolicy.py*. La méthode utilise le model_C_extension_policy (déjà présent dans le code) qui appelle *model_C_extension_value_fn* pour calculer la fonction de valeur de l'équation de Bellman. Pour écrire la méthode *model_C_extension_value_fn*, copiez le code de *model_B_value_fn* et ajoutez une boucle for supplémentaire pour les nouveaux enrôlements dans $[0, x^{enroll})$ par pas de $x^{enroll}/10$. Modifiez la valeur du pas et le coût de Bellman pour tenir compte de l'Extension du Modèle C (indice : utilisez la méthode *trunc_probs*).

Fixez la taille de l'essai à $T = 50$, l'horizon d'anticipation à $H = 5$ et exécutez une simulation de l'Extension du Modèle C. Rapportez le temps d'arrêt et le revenu.</li>
</ol>
{% endraw %}
