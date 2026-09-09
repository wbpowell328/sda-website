---
layout: book
book_data: sdam_toc_fr
book_home: /sdam/fr/contents/
title: "Chapitre 10 : Gestion de la chaîne d'approvisionnement I : le problème du vendeur de journaux à deux agents"
permalink: /sdam/fr/chapter-10/
date: 2026-07-17
lang: fr
translated_from: en
translated_from_hash: b16196f414f7b8a3
---


{% raw %}
## Aperçu du chapitre

Un problème courant qui se pose dans tout problème de gestion de chaîne d'approvisionnement est que l'on a des gestionnaires (« agents ») qui ont besoin de ressources et doivent les demander à des gestionnaires de niveau supérieur. En pratique, ces gestionnaires « de terrain » ne savent jamais exactement de combien ils auront besoin, et ont tendance à demander plus que nécessaire pour éviter les coûts importants liés à une pénurie. Les gestionnaires « centraux » veulent que les gestionnaires de terrain disposent de ce dont ils ont besoin, mais sont conscients de leur incitation à demander trop. Les gestionnaires centraux ont alors tendance à réduire ces demandes dans le but de ne donner aux gestionnaires de terrain que ce dont ils ont réellement besoin.

Ces deux gestionnaires ont chacun leur propre « problème du vendeur de journaux » que nous avons rencontré pour la première fois au [Chapitre 3](/sdam/fr/chapter-3/). Cependant, nous avons maintenant deux « vendeurs de journaux » qui interagissent l'un avec l'autre, puisque chacun doit créer une approximation du comportement de l'autre. Ce problème se rencontre dans de nombreuses entreprises, et pourtant il ne semble pas avoir retenu l'attention de la littérature de recherche.

Ce problème nous oblige à nous aventurer, ne serait-ce qu'un peu, dans la modélisation des problèmes multi-agents. Nous utilisons le cadre de modélisation standard que nous avons appliqué jusqu'à présent, avec la particularité que nous créons désormais une version de ces modèles pour chaque agent décisionnel. Cependant, hormis l'introduction d'un ensemble plus riche d'interactions, l'application du cadre de modélisation universel à chaque agent reste la même.

## Récit

Imaginez qu'un gestionnaire de terrain chez Amazon doive fournir des remorques pour transporter des marchandises hors de Chicago chaque semaine. Le gestionnaire de terrain a accès à des informations lui permettant d'estimer le nombre de remorques dont il aura besoin cette semaine-là, mais le chiffre réel peut être plus élevé ou plus faible. Le gestionnaire de terrain fait alors une demande de remorques auprès d'un gestionnaire central, qui porte ensuite son propre jugement sur le nombre de remorques à fournir, et prend la décision finale sur le nombre de remorques qui seront allouées.

Les deux gestionnaires travaillent tous deux pour la même entreprise, mais le gestionnaire de terrain est bien plus préoccupé par le risque de pénurie, puisqu'il doit recourir à des locations de court terme s'il vient à manquer de remorques. Le gestionnaire central, quant à elle, ne veut pas que le gestionnaire de terrain manque de remorques, mais elle ne veut pas non plus qu'il ait un excédent de remorques, puisqu'elle doit payer pour ces remorques.

Nous supposons que le processus se déroule comme suit :

**Étape 1 :** Le gestionnaire de terrain observe une estimation initiale du nombre de remorques nécessaires. Cette information est privée au gestionnaire de terrain.

**Étape 2 :** Le gestionnaire de terrain demande ensuite des remorques au gestionnaire central, en gonflant généralement sa demande pour réduire la probabilité de pénurie.

**Étape 3 :** Le gestionnaire central décide alors du nombre de remorques à accorder au gestionnaire de terrain, réduisant généralement la demande étant donné le schéma observé selon lequel le terrain demande plus que nécessaire.

**Étape 4 :** Le gestionnaire de terrain reçoit le nombre de remorques accordé par le gestionnaire central, puis observe le besoin réel de remorques.

**Étape 5 :** Les gestionnaires de terrain et central calculent leur performance en utilisant leurs propres coûts pour le surplus (les remorques inutilisées) et le déficit (la demande non couverte).

La tension dans ce problème provient d'abord du fait que l'estimation initiale des remorques nécessaires n'est qu'une estimation, que nous pouvons supposer non biaisée (c'est-à-dire vraie en moyenne). Le problème est que le gestionnaire de terrain supporte un coût élevé s'il manque de remorques, de sorte que sa stratégie consiste à surestimer ses besoins (rappelons le problème du vendeur de journaux au [Chapitre 3](/sdam/fr/chapter-3/)). Le gestionnaire central, en revanche, a probablement des coûts équilibrés pour le surplus et le déficit, et ne veut ni commander trop, ni trop peu.

Ce qui complique le problème, c'est l'estimation initiale donnée au gestionnaire de terrain. Bien qu'imparfaite, elle contient une information précieuse puisqu'elle indique si une journée connaîtra une demande forte ou faible. Cela signifie que le gestionnaire central doit prêter attention à la demande faite par le gestionnaire de terrain, tout en reconnaissant que celui-ci fera des demandes biaisées à la hausse. Sachant cela, le gestionnaire central aurait tendance à utiliser la demande du gestionnaire de terrain comme point de départ, mais à la réduire ensuite pour l'allocation finale. Sans surprise, le gestionnaire de terrain sait que le gestionnaire central agira ainsi, et compense en conséquence.

## Cadrage du problème

Les réponses à nos trois questions de cadrage sont les suivantes :

- **Métriques :** Chaque agent possède sa propre métrique, qui consiste à minimiser le coût espéré du déficit et du surplus.
- **Décisions :** L'agent de terrain décide de la quantité à demander à l'agent central. L'agent central décide de la part de la demande de l'agent de terrain qu'il va satisfaire.
- **Incertitudes :** L'incertitude fondamentale porte sur la demande réelle de ressources sur le terrain. Ensuite, l'agent de terrain doit composer avec l'incertitude quant à la manière dont l'agent central répondra à ses demandes, et l'agent central doit composer avec l'incertitude quant à la quantité que l'agent de terrain va demander, ce qui reflète une information privée.

## Modèle de base

Nous allons modéliser le problème pour les deux agents, puisque l'information n'est pas la même pour les deux joueurs. Tout au long du modèle, nous désignerons le gestionnaire de terrain par $q$ et le gestionnaire central par $q'$.

### Variables d'état

L'information initiale disponible pour le gestionnaire de terrain est l'estimation du nombre de remorques qui seront nécessaires, que nous représentons à l'aide de $R^{est}\_{tq}$, l'estimation initiale du nombre de remorques nécessaires. Cette estimation initiale peut être biaisée, nous introduisons donc une estimation de ce biais à l'aide de $\delta^{est}\_{tq}$, l'estimation initiale de la différence entre $R^{est}\_{tq}$ et la demande réelle. Nous devrons également estimer dans quelle mesure le gestionnaire central réduit la demande du gestionnaire de terrain, ce que nous représentons à l'aide de $\delta_{tq}$, l'estimation de la réduction que le gestionnaire central appliquera à la demande du gestionnaire de terrain. De même, le gestionnaire central apprendra la différence entre la demande faite par le gestionnaire de terrain et ce dont le gestionnaire de terrain a finalement besoin, ce que nous représentons par $\delta_{tq'}$, l'estimation de la différence entre ce que le gestionnaire de terrain demande et ce dont le terrain a finalement besoin.

La variable d'état pour chaque agent correspond à l'information dont il dispose avant de prendre une décision. Pour le gestionnaire de terrain, la variable d'état est

$$
S_{tq} = (R^{est}_{tq}, \delta^{est}_{tq}, \delta_{tq}).
$$

La variable d'état pour le gestionnaire central est

$$
S_{tq'} = (x_{tqq'}, \delta_{tq'}).
$$

où $x_{tqq'}$ est la demande faite par l'agent de terrain $q$ au gestionnaire central $q'$ (introduite ensuite).

### Variables de décision

Les décisions pour chaque agent sont données par $x_{tqq'}$, le nombre de remorques que l'agent $q$ demande à l'agent $q'$, et $x_{tq'q}$, le nombre de remorques que l'agent $q'$ donne à l'agent $q$, ce qui est ce qui est effectivement mis en œuvre sur le terrain.

### Information exogène

L'information exogène pour le gestionnaire de terrain peut être vue comme l'estimation initiale des remorques nécessaires (bien que nous l'ayons placée dans la variable d'état) : $R^{est}\_{tq}$, l'estimation initiale du nombre de remorques nécessaires. Cette estimation n'est connue que de l'agent de terrain $q$.

Après avoir pris la décision $x_{tqq'}$, nous recevons ensuite deux types d'information : ce que le gestionnaire central nous accorde, puis la demande réelle requise : $x_{tq'q}$, la décision prise par le gestionnaire central en réponse à la demande du gestionnaire de terrain ; et $\Rhat_{t+1}$, le nombre réel de remorques dont le gestionnaire de terrain $q$ finit par avoir besoin (cette information est également disponible pour le gestionnaire central).

L'information exogène pour l'agent $q$ est alors

$$
W_{t+1,q} = (x_{tq'q},\Rhat_{t+1}).
$$

Nous notons au passage que, bien que cette information soit indexée au temps $t+1$, la demande accordée par le gestionnaire central, $x_{tq'q}$, est indexée par $t$ puisqu'elle dépend de l'information disponible jusqu'au temps $t$ inclus. L'estimation initiale $R^{est}\_{tq}$ est une nouvelle information, mais elle arrive avant que la décision ne soit prise, de sorte qu'elle est capturée dans la variable d'état de l'agent de terrain.

Le gestionnaire central reçoit la demande initiale $x_{tqq'}$ qui arrive comme information exogène, mais parce qu'elle est reçue avant qu'elle ne prenne sa décision, elle entre par le biais de la variable d'état du gestionnaire central. La seule information exogène pour le gestionnaire central est la demande finale, qui pourrait ensuite être utilisée pour mettre à jour des croyances influençant les décisions futures. Cela signifie que

$$
W_{t+1,q'} = (\Rhat_{t+1}).
$$

### Fonction de transition

Pour le gestionnaire de terrain, il existe trois variables d'état : $R^{est}\_{tq}$, le biais $\delta^{est}\_{tq}$ entre l'estimation $R^{est}\_{tq}$ et la valeur réelle $\Rhat_{t+1}$, et le biais $\delta_{tq}$ introduit par le gestionnaire central lorsque le terrain fait une demande. La première variable d'état, $R^{est}\_{tq}$, arrive directement comme information exogène. Les biais $\delta^{est}\_{tq}$ et $\delta_{t,q}$ sont mis à jour à l'aide de

$$
\delta^{est}_{t+1,q} =  (1-\alpha) \delta^{est}_{tq}   + \alpha (\Rhat_{t+1} - R^{est}_{tq}), \qquad \delta_{t+1,q} = (1-\alpha) \delta_{tq}  + \alpha (x_{tqq'} - x_{tq'q}),
$$

où $0 < \alpha < 1$ est un facteur de lissage.

La fonction de transition pour le gestionnaire central est similaire. Là encore, la décision du gestionnaire de terrain, $x_{tqq'}$, arrive à la variable d'état de manière exogène. Ensuite, nous mettons à jour le biais que le gestionnaire central estime dans la demande du gestionnaire de terrain à l'aide de

$$
\delta_{t+1,q'} = (1-\alpha) \delta_{t,q'}  + \alpha (x_{tqq'} - \Rhat_{t+1}).
$$

### Fonction objectif

Nous commençons par définir $c^o_q$, le coût unitaire supporté par le gestionnaire de terrain pour chaque remorque excédentaire (ce que le terrain paie par jour pour chaque remorque), également appelé coût de surplus ; $c^u_q$, le coût unitaire supporté par le gestionnaire de terrain pour chaque remorque qui doit être louée pour compenser un manque de capacité, également appelé coût de déficit ; et $c^o_{q'}, c^u_{q'}$, le coût de surplus et de déficit pour le gestionnaire central.

Les coûts pour chaque agent sont donnés par

$$
C_{tq}(S_{tq},x_{tq'q}) = c^o_q \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q} \max\{\Rhat_{t+1} - x_{tq'q},0\},
$$

$$
C_{tq'}(S_{tq'},x_{tq'q}) = c^o_{q'} \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q'} \max\{\Rhat_{t+1} - x_{tq'q},0\}.
$$

La performance des gestionnaires de terrain et central dépend du nombre de remorques $x_{tq'q}$ que le gestionnaire central donne au terrain. Cette décision, cependant, dépend de la décision prise par le gestionnaire de terrain.

Les décisions du gestionnaire de terrain sont prises avec la politique $X_{tq}(S_t\vert \theta_q)$, où $\theta_q$ est un ou plusieurs paramètres ajustables utilisés pour résoudre

$$
\begin{align}
\min_{\theta_q}\E \left\{\sum_{t=0}^T C_{tq}(S_{tq},X_{tq}(S_t\vert \theta_q))\vert S_0\right\}.  \label{eq:fieldobjective}
\end{align}
$$

De même, les décisions du gestionnaire central sont prises avec la politique $X_{tq'}(S_t\vert \theta_{q'})$ où $\theta_{q'}$ est un ou plusieurs paramètres ajustables qui résolvent

$$
\begin{align}
\min_{\theta_{q'}}\E \left\{\sum_{t=0}^T C_{t{q'}}(S_{tq'},X_{tq'}(S_t\vert \theta_{q'}))\vert S_0\right\}. \label{eq:centralobjective}
\end{align}
$$

Les problèmes d'optimisation dans $\eqref{eq:fieldobjective}$ et $\eqref{eq:centralobjective}$ doivent être résolus simultanément, puisque les deux politiques doivent être simulées en même temps. Bien sûr, nous pourrions maintenir $\theta_{q'}$ constant pour le gestionnaire central tout en ajustant $\theta_q$ pour le gestionnaire de terrain, mais en fin de compte nous recherchons un minimum local stable.

## Modélisation de l'incertitude

Ce problème est piloté par les données, ce qui signifie que nous réagissons aux données au fur et à mesure qu'elles arrivent. Il existe trois types d'information, selon l'agent concerné :

- L'estimation initiale $R^{est}\_t$ des ressources nécessaires.
- La demande $x_{tqq'}$, faite par le gestionnaire de terrain, qui parvient au gestionnaire central. Cette décision comporte une logique introduite par le gestionnaire de terrain, qui peut inclure une part d'aléatoire. Cela constitue une information pour le gestionnaire central.
- La décision $x_{tq'q}$ prise par le gestionnaire central qui détermine le nombre de remorques données au gestionnaire de terrain. Cela constitue une information pour le gestionnaire de terrain.
- La réalisation finale $\Rhat_{t+1}$ du nombre de remorques réellement nécessaires, qui est révélée (dans ce modèle de base) aux deux agents.

Si nous souhaitons simuler le processus, nous n'avons besoin de modéliser que la génération de $R^{est}\_t$ et $\Rhat_t$. Plus précisément, il nous faudrait générer $R^{est}\_t$ à partir d'une distribution, et l'erreur $\Rhat_t - R^{est}\_t$ à partir d'une autre distribution.

## Conception des politiques

Pour notre problème du vendeur de journaux à deux agents, nous devons développer des politiques pour chaque agent. Nous commençons par la politique du gestionnaire de terrain.

### Gestionnaire de terrain

Le gestionnaire de terrain part d'une estimation $R^{est}\_t$, mais doit tenir compte de trois facteurs :

**1)** L'estimation $R^{est}\_t$ peut comporter un biais $\delta^{est}$ (nous ne pouvons pas être certains de la source de l'estimation $R^{est}\_{tq}$). Le biais est donné par

$$
\delta^{est}_{tq}= \E \Rhat_{t+1} - R^{est}_{tq}.
$$

Ainsi, si $\delta^{est}\_{tq} > 0$ alors cela signifie que $R^{est}\_t$ est biaisé à la hausse.

**2)** Le nombre réel de remorques nécessaires, $\Rhat_{t+1}$, est aléatoire même une fois le biais pris en compte. Le gestionnaire de terrain supporte un coût plus élevé en cas de pénurie de remorques qu'en cas d'excédent, il voudra donc introduire un biais à la hausse pour refléter le coût plus élevé d'être pris au dépourvu.

**3)** Le manager central a une attitude équilibrée face au risque d'avoir trop ou pas assez de ressources, et connaît le biais du manager de terrain. En conséquence, le manager central utilisera généralement la demande du manager de terrain, $x_{tqq'}$, tout comme le manager de terrain peut ajuster pour un biais possible entre l'estimation $R^{est}$ et la valeur réelle $\Rhat_t$. Le manager de terrain sait que le manager central va effectuer cet ajustement, et doit donc essayer de l'estimer et de le contrecarrer. Puisque le manager de terrain connaît à la fois sa propre demande $x_{tqq'}$ et voit ensuite ce que le manager central fournit, l'observation du biais au temps $t$ est donnée par

$$
\delta_{tq} =  x_{tq'q} - x_{tqq'}.
$$

Nous devons utiliser nos estimations des différences entre $R^{est}\_t$ et $\Rhat_t$, la différence entre $x_{tqq'}$ et $x_{tq'q}$, et la différence entre $x_{tqq'}$ et $\Rhat_t$. Nous proposons une politique pour le manager de terrain donnée par

$$
\begin{align}
X_{tqq'}(S_t\vert \theta_q) = R^{est}_t - \delta^{est}_{t-1,q} - \delta_{t-1,q}  + \theta_q. \label{eq:fieldpolicy}
\end{align}
$$

Cette politique commence avec l'estimation initiale $R^{est}\_t$, corrige pour le biais dans cette estimation initiale en utilisant $\delta^{est}\_{t-1,q}$, corrige ensuite pour le biais provenant du manager central $\delta_{t-1,q}$, puis introduit finalement un décalage qui peut capturer les différents coûts de surplus et de pénurie pour le manager de terrain. Le paramètre $\theta_q$ doit être calibré.

Puisqu'il n'y a pas de problème d'optimisation intégré (c'est-à-dire un $\argmax_x$ ou un $\argmin_x$), il s'agit d'une approximation de fonction de politique paramétrée (PFA) classique.

### Manager central

Notre politique pour le manager central est donnée par

$$
X_{tq'q}(S_t\vert \theta_{q'}) = x_{tqq'} - \delta_{t-1,q'} + \theta_{q'}.
$$

Ici, nous commençons avec la demande faite par le manager de terrain, soustrayons notre meilleure estimation de la différence entre la demande du manager de terrain et ce qui était finalement nécessaire, $\delta_{tq'}$, puis ajoutons $\theta_{q'}$ qui est un paramètre ajustable pour le manager central, où $\theta_{q'}$ peut être négatif.

### Recherche de politique

Nous avons maintenant deux politiques paramétrées. Le calibrage de la politique de terrain se ferait avec la fonction objectif dans $\eqref{eq:fieldobjective}$, tandis que le calibrage de la politique centrale se ferait avec la fonction objectif dans $\eqref{eq:centralobjective}$. L'astuce ici est que les deux objectifs doivent être simulés en parallèle, puisque les politiques sont interconnectées. Et pendant que les deux simulations tournent, nous gardons une trace des objectifs pour chaque agent.

La bonne façon d'aborder l'optimisation des paramètres de chaque agent est de simuler le comportement des deux agents simultanément, mais d'exécuter des algorithmes de recherche pour chaque agent comme s'ils étaient distincts. La performance de l'agent de terrain, par exemple, serait affectée par le comportement de l'agent central tout comme l'agent de terrain est affecté par les autres formes d'information exogène.

Cette simulation offre l'occasion d'explorer comment les décisions de chaque agent peuvent *changer* le comportement de l'autre agent. Nous approfondissons ce point dans les exercices.

## Qu'avons-nous appris ?

- Nous introduisons un problème multiagent de base que nous appelons le « problème du vendeur de journaux à deux agents » où un agent de terrain doit demander des ressources à un agent central. Bien que les deux agents soient censés travailler ensemble, chacun a ses propres coûts de surplus (avoir trop de ressources) et de pénurie (en avoir trop peu, produisant des demandes insatisfaites).
- Nous modélisons l'information qui est privée à l'agent de terrain et l'information qui est privée à l'agent central.
- Le problème introduit la dimension consistant à estimer et anticiper le comportement de l'agent central pour aider l'agent de terrain à prendre des décisions.
- À chaque instant, l'agent de terrain a une meilleure estimation de ce qu'il veut commander compte tenu de l'estimation $R^{est}\_{tq}$ et de l'historique des ajustements de la demande par l'agent central. Étant donné l'incertitude et le coût plus élevé de la pénurie par rapport à l'excédent, il est naturel de s'attendre à ce qu'une bonne politique consiste à commander ce que nous prévoyons d'avoir besoin plus une marge pour l'incertitude, nous commençons donc par suggérer des politiques de cette forme.
- Ce problème pose les bases pour intégrer une croyance sur la manière dont l'agent central répondra à l'ajustement effectué par l'agent de terrain, puisque nous supposons qu'elle constate finalement le surplus ou la pénurie.
- Bien que ce problème semble assez simple, il pose les bases de nombreux problèmes d'allocation de ressources multiagents plus complexes.

## Exercices

**Questions de révision**

<ol class="book-exercises">
<li>Qu'est-ce qui est connu par l'agent $q$ mais inconnu par l'agent $q'$ ? De même, qu'est-ce qui est connu par l'agent $q'$ mais inconnu par l'agent $q$ ?</li>
<li>Il existe une information qui est mise à disposition des deux agents. Quelle est-elle ?</li>
<li>Quelle est l'information exogène qui devient disponible pour l'agent de terrain ? Quelle est l'information exogène qui devient disponible pour l'agent central ?</li>
<li>Il y a trois sources d'incertitude dans notre système. Quelles sont-elles ?</li>
</ol>

**Questions de résolution de problèmes**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Écrivez les modèles dynamiques pour le manager de terrain et le manager central. Rappelez-vous que la décision d'un manager devient de l'information exogène pour l'autre.</li>
<li>Que se passerait-il si l'agent de terrain commandait simplement des quantités de plus en plus grandes ? Quel mécanisme pourrait être introduit dans le modèle pour minimiser cette instabilité ?</li>
<li>Créez une estimation de la manière dont la décision de l'agent de terrain, $x_{tqq'}$, pourrait affecter le comportement de l'agent central. Ensuite, concevez une politique qui capture cet effet afin que la décision prise par l'agent de terrain anticipe l'effet de sa décision.</li>
<li>Il n'existe qu'une seule information pouvant être utilisée pour créer une croyance sur la politique d'un autre agent. Quelle est cette information ?</li>
<li>Supposons maintenant que l'agent de terrain puisse vendre les ressources qu'il obtient de l'agent central à un prix $p_{tq}$ qui change aléatoirement d'un instant à l'autre. Cela signifie que l'agent de terrain pourrait conserver une partie ou la totalité de ses ressources pour une période ultérieure si le prix $p_{tq}$ est trop bas. Étendez le modèle de ce chapitre pour traiter ce contexte beaucoup plus riche. Vous devrez introduire une nouvelle variable de décision (quelle part de la demande satisfaire). Proposez une approximation de fonction de politique pour prendre cette décision.</li>
</ol>

**Questions de programmation**

Ces exercices utilisent le module Python *TwoNewsvendor* disponible sur [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Effectuez une recherche par grille sur le biais pour les managers de terrain et central. Effectuez la recherche sur la plage $[0,10]$ (par pas de 1) pour le manager de terrain, et $[-11,0]$ (par pas de 1) pour le manager central. Exécutez le jeu pendant $N = 30$ pas de temps, et répétez la simulation pour 1 000 échantillons (puis calculez une moyenne). Notez que vous additionnez les récompenses sur les 30 pas de temps, mais que vous faites la moyenne sur les 1 000 échantillons. Tracez trois cartes de chaleur pour ce qui suit :
  <ol type="a">
    <li>La récompense totale pour le manager de terrain, pour chacune des combinaisons des deux biais.</li>
    <li>La récompense totale pour le manager central, pour chacune des combinaisons des deux biais.</li>
    <li>La récompense totale pour l'entreprise (en additionnant le manager de terrain et le manager central), pour chacune des combinaisons des deux biais. Discutez des différences entre les combinaisons optimales selon chacune des trois perspectives. Chaque joueur veut maximiser sa propre récompense.</li>
  </ol>
</li>
<li>Nous allons maintenant utiliser la politique d'apprentissage par estimation d'intervalle pour apprendre chacun des biais (voir la discussion sur les politiques dans le [Chapitre 4](/sdam/fr/chapter-4/)). Soit $\theta^{IE}_q$ le paramètre de la politique IE pour le manager de terrain, et soit $\theta^{IE}_{q'}$ le paramètre de la politique IE pour le manager central. Au lieu de rechercher le meilleur biais, nous allons rechercher le meilleur paramètre pour guider la politique de recherche du biais.
  <ol type="a">
    <li>Exécutez le module Python en faisant varier chaque paramètre d'apprentissage sur la plage $(0, 1, 2, 3, 4, 5)$. Cela représente 36 simulations au total (sur un horizon $N = 20$, et pour 1 000 trajectoires échantillonnées). Tracez les trois mêmes cartes de chaleur que celles réalisées pour l'exercice 10.</li>
    <li>Comparez le comportement des cartes de chaleur de la partie (a) à celui des cartes de chaleur de l'exercice 10. Essayez d'expliquer le comportement des agents de terrain et central en écrivant les politiques et en réfléchissant à la manière dont ils devraient se comporter.</li>
    <li>Vérifiez que la recherche directe du biais donne la meilleure récompense globale. Quelles sont les forces et les faiblesses de chaque approche dans un contexte plus réaliste où les paramètres du problème peuvent évoluer au fil du temps ?</li>
  </ol>
</li>
<li>(Cet exercice nécessite quelques modifications du module Python.) Considérez maintenant un problème du vendeur de journaux à deux agents où le manager central dispose également de certaines informations externes sur la demande. Ce qu'il possède est une estimation beaucoup plus bruitée de la demande (disons que le bruit est, pour nos données de feuille de calcul où la demande est toujours comprise entre 20 et 40, trois fois plus grand que le bruit provenant de la source communiquant avec le manager de terrain).

Redéfinissez le biais du manager central comme la quantité qu'il ajoute à l'estimation qu'il reçoit. Essayez une approche d'apprentissage où le biais qu'il choisit est sélectionné dans l'intervalle $[-11, 0]$. Exécutez le programme et comparez les résultats avec l'ancien processus d'apprentissage. Comme précédemment, exécutez le jeu pendant $N = 30$ pas de temps, et répétez la simulation pour 1 000 échantillons (puis calculez une moyenne). Après $N = 30$ pas de temps, l'agent central accorde-t-il plus de poids à l'information provenant du terrain ou de son autre source d'information externe ? Pourquoi ?</li>
<li>Considérez le cas où le manager de terrain utilise une approche d'apprentissage et où le manager central utilise une stratégie punitive. Sachant que le terrain subit une pénalité plus élevée s'il fournit moins que la demande, le manager central calculera le biais précédent du terrain (pour le temps $t-1$) et si celui-ci est positif, au tour suivant, il appliquera un biais deux fois plus grand en magnitude et de signe opposé à la demande du terrain. Menez cette expérience et observez quel sera le biais du terrain après les 30 pas de temps. En comparant cette politique aux politiques précédentes, le manager central devrait-il employer cette stratégie ?</li>
</ol>
{% endraw %}
