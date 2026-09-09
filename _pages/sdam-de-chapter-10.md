---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 10: Lieferkettenmanagement I: Das Zwei-Agenten-Newsvendor-Problem"
permalink: /sdam/de/chapter-10/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: b16196f414f7b8a3
---


{% raw %}
## Kapitelüberblick

Ein häufiges Problem, das in jedem Lieferkettenmanagement-Problem auftritt, ist, dass Manager ("Agenten") Ressourcen benötigen und diese bei höherrangigen Managern anfragen müssen. In der Praxis wissen diese "Feld"-Manager nie genau, wie viel sie benötigen werden, und neigen dazu, mehr anzufordern, um die erheblichen Nachteilkosten eines Engpasses zu vermeiden. Die "zentralen" Manager möchten, dass die Feldmanager das haben, was sie brauchen, sind sich aber ihres Anreizes bewusst, zu viel anzufordern. Die zentralen Manager neigen dann dazu, diese Anfragen zu kürzen, um den Feldmanagern nur das zu geben, was sie tatsächlich benötigen.

Beide Manager haben ihr eigenes "Zeitungsjungenproblem" ("newsvendor problem"), das wir zuerst in [Kapitel 3](/sdam/de/chapter-3/) gesehen haben. Nun haben wir jedoch zwei "Zeitungsjungen", die sich gegenseitig ausspielen, da jeder eine Näherung dafür erstellen muss, wie sich der andere verhalten wird. Dieses Problem tritt in Unternehmen überall auf, scheint aber in der Forschungsliteratur bisher keine Aufmerksamkeit erregt zu haben.

Dieses Problem erfordert, dass wir einen Fuß in das Gewässer der Modellierung von Multiagentenproblemen setzen. Wir verwenden das Standard-Modellierungsframework, das wir bisher angewendet haben, mit der Besonderheit, dass wir nun eine Version dieser Modelle für jeden entscheidungstreffenden Agenten erstellen. Abgesehen von der Einführung eines reichhaltigeren Satzes an Interaktionen bleibt die Anwendung des universellen Modellierungsframeworks auf jeden Agenten jedoch gleich.

## Erzählung

Stellen Sie sich vor, ein Feldmanager von Amazon muss wöchentlich Anhänger bereitstellen, um Fracht aus Chicago zu transportieren. Der Feldmanager hat Zugang zu Informationen, die es ihm ermöglichen abzuschätzen, wie viele Anhänger er in dieser Woche benötigen wird, aber der tatsächliche Bedarf kann höher oder niedriger sein. Der Feldmanager stellt dann eine Anfrage an einen zentralen Manager für Anhänger, der dann selbst eine Einschätzung darüber trifft, wie viele Anhänger bereitgestellt werden, und die endgültige Entscheidung über die Anzahl der Anhänger trifft, die bereitgestellt werden.

Die beiden Manager arbeiten für dasselbe Unternehmen, aber der Feldmanager macht sich viel mehr Sorgen darüber, einen Engpass zu haben, da er Kurzzeitmieten vornehmen muss, wenn ihm die Anhänger ausgehen. Der zentrale Manager hingegen möchte nicht, dass dem Feldmanager die Anhänger ausgehen, möchte aber auch nicht, dass er überschüssige Anhänger hat, da sie für diese Anhänger bezahlen muss.

Wir nehmen an, dass der Prozess wie folgt abläuft:

**Schritt 1:** Der Feldmanager beobachtet eine anfängliche Schätzung, wie viele Anhänger benötigt werden. Diese Information ist privat für den Feldmanager.

**Schritt 2:** Der Feldmanager fordert dann Anhänger vom zentralen Manager an, wobei er typischerweise seine Anfrage aufbläht, um die Wahrscheinlichkeit eines Engpasses zu verringern.

**Schritt 3:** Der zentrale Manager entscheidet dann, wie viele Anhänger dem Feldmanager gegeben werden, wobei er die Anfrage typischerweise reduziert, da er das Muster erkennt, dass das Feld mehr angefordert hat, als notwendig war.

**Schritt 4:** Der Feldmanager erhält die Anzahl der vom zentralen Manager bewilligten Anhänger und beobachtet dann den tatsächlichen Bedarf an Anhängern.

**Schritt 5:** Die Feld- und zentralen Manager berechnen ihre Leistung anhand ihrer eigenen Kosten für Überschuss (die ungenutzten Anhänger) und Unterdeckung (die ungedeckte Nachfrage).

Die Spannung in diesem Problem entsteht zunächst dadurch, dass die anfängliche Schätzung der benötigten Anhänger nur eine Schätzung ist, von der wir annehmen können, dass sie unverzerrt ist (das heißt, sie stimmt im Durchschnitt). Das Problem besteht darin, dass der Feldmanager hohe Kosten hat, wenn ihm die Anhänger ausgehen, sodass seine Strategie darin besteht, seinen Bedarf zu überschätzen (erinnern Sie sich an das Zeitungsjungenproblem in [Kapitel 3](/sdam/de/chapter-3/)). Der zentrale Manager hingegen hat wahrscheinlich ausgeglichene Kosten für Über- und Unterdeckung und möchte weder zu viel noch zu wenig bestellen.

Was das Problem kompliziert macht, ist die anfängliche Schätzung, die dem Feldmanager gegeben wird. Obwohl sie nicht perfekt ist, hat sie wertvolle Informationen, da sie anzeigt, ob ein Tag eine hohe oder niedrige Nachfrage haben wird. Das bedeutet, dass der zentrale Manager auf die Anfrage des Feldmanagers achten muss, während er erkennt, dass der Feldmanager Anfragen stellen wird, die nach oben verzerrt sind. In Kenntnis dessen würde der zentrale Manager die Anfrage des Feldmanagers als Ausgangspunkt verwenden, diese dann aber für die endgültige Zuteilung reduzieren. Nicht überraschend weiß der Feldmanager, dass der zentrale Manager dies tun wird, und passt sich entsprechend an.

## Einordnung des Problems

Die Antworten auf unsere drei Rahmenfragen lauten:

- **Kennzahlen:** Jeder Agent hat seine eigene Kennzahl, die darin besteht, die erwarteten Kosten für Unter- und Überdeckung zu minimieren.
- **Entscheidungen:** Der Feldagent entscheidet, wie viel er beim zentralen Agenten anfordert. Der zentrale Agent entscheidet, wie viel von der Anfrage des Feldagenten er erfüllt.
- **Unsicherheiten:** Die zentrale Unsicherheit ist die tatsächliche Nachfrage nach Ressourcen im Feld. Dann muss der Feldagent mit der Unsicherheit umgehen, wie der zentrale Agent auf seine Anfragen reagieren wird, und der zentrale Agent muss mit der Unsicherheit umgehen, wie viel der Feldagent anfordern wird, was private Informationen widerspiegelt.

## Grundmodell

Wir werden das Problem für beide Agenten modellieren, da die Informationen für beide Spieler nicht dieselben sind. Im gesamten Modell werden wir uns auf den Feldmanager als $q$ und auf den zentralen Manager als $q'$ beziehen.

### Zustandsvariablen

Die anfängliche Information, die dem Feldmanager zur Verfügung steht, ist die Schätzung der Anzahl der benötigten Anhänger, die wir mit $R^{est}\_{tq}$ darstellen, der anfänglichen Schätzung, wie viele Anhänger benötigt werden. Diese anfängliche Schätzung kann verzerrt sein, daher führen wir eine Schätzung dieser Verzerrung mit $\delta^{est}\_{tq}$ ein, der anfänglichen Schätzung der Differenz zwischen $R^{est}\_{tq}$ und der tatsächlichen Nachfrage. Wir müssen auch abschätzen, wie stark der zentrale Manager die Anfrage des Feldmanagers reduziert, was wir mit $\delta_{tq}$ darstellen, der Schätzung, wie stark der zentrale Manager die Anfrage des Feldmanagers reduzieren wird. Ähnlich wird der zentrale Manager die Differenz zwischen der vom Feldmanager gestellten Anfrage und dem, was der Feldmanager letztendlich benötigt, erfahren, was wir mit $\delta_{tq'}$ darstellen, der Schätzung der Differenz zwischen dem, was der Feldmanager anfordert, und dem, was das Feld letztendlich benötigt.

Die Zustandsvariable für jeden Agenten ist die Information, die er hat, bevor er eine Entscheidung trifft. Für den Feldmanager ist die Zustandsvariable

$$
S_{tq} = (R^{est}_{tq}, \delta^{est}_{tq}, \delta_{tq}).
$$

Die Zustandsvariable für den zentralen Manager ist

$$
S_{tq'} = (x_{tqq'}, \delta_{tq'}).
$$

wobei $x_{tqq'}$ die Anfrage ist, die der Feldagent $q$ an den zentralen Agenten $q'$ stellt (als Nächstes eingeführt).

### Entscheidungsvariablen

Die Entscheidungen für jeden Agenten sind gegeben durch $x_{tqq'}$, die Anzahl der Anhänger, die Agent $q$ von Agent $q'$ anfordert, und $x_{tq'q}$, die Anzahl der Anhänger, die Agent $q'$ Agent $q$ gibt, was letztlich im Feld umgesetzt wird.

### Exogene Information

Die exogene Information für den Feldmanager kann als die anfängliche Schätzung der benötigten Anhänger betrachtet werden (obwohl wir diese in die Zustandsvariable aufgenommen haben): $R^{est}\_{tq}$, die anfängliche Schätzung, wie viele Anhänger benötigt werden. Diese Schätzung ist nur dem Feldagenten $q$ bekannt.

Nachdem wir die Entscheidung $x_{tqq'}$ getroffen haben, erhalten wir zwei Arten von Informationen: was der zentrale Manager uns gewährt, und dann den tatsächlichen Bedarf: $x_{tq'q}$, die vom zentralen Manager als Reaktion auf die Anfrage des Feldmanagers getroffene Entscheidung; und $\Rhat_{t+1}$, die tatsächliche Anzahl der Anhänger, die der Feldmanager $q$ letztendlich benötigt (diese Information steht auch dem zentralen Manager zur Verfügung).

Die exogene Information für Agent $q$ ist dann

$$
W_{t+1,q} = (x_{tq'q},\Rhat_{t+1}).
$$

Wir bemerken nebenbei, dass diese Information zwar zum Zeitpunkt $t+1$ indiziert ist, die vom zentralen Manager gewährte Anfrage $x_{tq'q}$ jedoch mit $t$ indiziert wird, da sie von den bis zum Zeitpunkt $t$ verfügbaren Informationen abhängt. Die anfängliche Schätzung $R^{est}\_{tq}$ ist eine neue Information, trifft aber vor der Entscheidungsfindung ein, sodass sie in der Zustandsvariable des Feldagenten erfasst wird.

Der zentrale Manager erhält die anfängliche Anfrage $x_{tqq'}$, die als exogene Information eintrifft, aber da sie vor ihrer Entscheidung eingeht, fließt sie über die Zustandsvariable des zentralen Managers ein. Die einzige exogene Information für den zentralen Manager ist die endgültige Nachfrage, die dann verwendet werden könnte, um Überzeugungen zu aktualisieren, die zukünftige Entscheidungen beeinflussen. Das bedeutet

$$
W_{t+1,q'} = (\Rhat_{t+1}).
$$

### Übergangsfunktion

Für den Feldmanager gibt es drei Zustandsvariablen: $R^{est}\_{tq}$, die Verzerrung $\delta^{est}\_{tq}$ zwischen der Schätzung $R^{est}\_{tq}$ und dem tatsächlichen Wert $\Rhat_{t+1}$, und die Verzerrung $\delta_{tq}$, die der zentrale Manager einführt, wenn das Feld eine Anfrage stellt. Die erste Zustandsvariable, $R^{est}\_{tq}$, trifft direkt als exogene Information ein. Die Verzerrungen $\delta^{est}\_{tq}$ und $\delta_{t,q}$ werden mit

$$
\delta^{est}_{t+1,q} =  (1-\alpha) \delta^{est}_{tq}   + \alpha (\Rhat_{t+1} - R^{est}_{tq}), \qquad \delta_{t+1,q} = (1-\alpha) \delta_{tq}  + \alpha (x_{tqq'} - x_{tq'q}),
$$

aktualisiert, wobei $0 < \alpha < 1$ ein Glättungsfaktor ist.

Die Übergangsfunktion für den zentralen Manager ist ähnlich. Auch hier trifft die Entscheidung des Feldmanagers, $x_{tqq'}$, exogen in der Zustandsvariable ein. Dann aktualisieren wir die Verzerrung, die der zentrale Manager in der Anfrage des Feldmanagers schätzt, mit

$$
\delta_{t+1,q'} = (1-\alpha) \delta_{t,q'}  + \alpha (x_{tqq'} - \Rhat_{t+1}).
$$

### Zielfunktion

Wir beginnen mit der Definition von $c^o_q$, den Stückkosten, die dem Feldmanager für jeden überschüssigen Anhänger entstehen (was das Feld pro Tag für jeden Anhänger zahlt), auch bekannt als Überdeckungskosten; $c^u_q$, den Stückkosten, die dem Feldmanager für jeden Anhänger entstehen, der gemietet werden muss, um mangelnde Kapazität auszugleichen, auch bekannt als Unterdeckungskosten; und $c^o_{q'}, c^u_{q'}$, den Kosten für Über- und Unterdeckung für den zentralen Manager.

Die Kosten für jeden Agenten sind gegeben durch

$$
C_{tq}(S_{tq},x_{tq'q}) = c^o_q \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q} \max\{\Rhat_{t+1} - x_{tq'q},0\},
$$

$$
C_{tq'}(S_{tq'},x_{tq'q}) = c^o_{q'} \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q'} \max\{\Rhat_{t+1} - x_{tq'q},0\}.
$$

Die Leistung sowohl des Feld- als auch des zentralen Managers hängt von der Anzahl der Anhänger $x_{tq'q}$ ab, die der zentrale Manager dem Feld gibt. Diese Entscheidung hängt jedoch von der Entscheidung ab, die der Feldmanager trifft.

Die Entscheidungen des Feldmanagers werden mit der Politik $X_{tq}(S_t\vert \theta_q)$ getroffen, wobei $\theta_q$ ein oder mehrere abstimmbare Parameter sind, die verwendet werden, um

$$
\begin{align}
\min_{\theta_q}\E \left\{\sum_{t=0}^T C_{tq}(S_{tq},X_{tq}(S_t\vert \theta_q))\vert S_0\right\}.  \label{eq:fieldobjective}
\end{align}
$$

zu lösen. Ähnlich werden die Entscheidungen des zentralen Managers mit der Politik $X_{tq'}(S_t\vert \theta_{q'})$ getroffen, wobei $\theta_{q'}$ ein oder mehrere abstimmbare Parameter sind, die

$$
\begin{align}
\min_{\theta_{q'}}\E \left\{\sum_{t=0}^T C_{t{q'}}(S_{tq'},X_{tq'}(S_t\vert \theta_{q'}))\vert S_0\right\}. \label{eq:centralobjective}
\end{align}
$$

lösen.

Die Optimierungsprobleme in $\eqref{eq:fieldobjective}$ und $\eqref{eq:centralobjective}$ müssen gleichzeitig gelöst werden, da beide Politiken gleichzeitig simuliert werden müssen. Natürlich könnten wir $\theta_{q'}$ für den zentralen Manager konstant halten, während wir $\theta_q$ für den Feldmanager abstimmen, aber letztlich suchen wir nach einem stabilen lokalen Minimum.

## Modellierung der Unsicherheit

Dieses Problem ist datengetrieben, was bedeutet, dass wir auf eintreffende Daten reagieren. Es gibt drei Arten von Informationen, je nachdem, welcher Agent beteiligt ist:

- Die anfängliche Schätzung $R^{est}\_t$ der benötigten Ressourcen.
- Die Anfrage $x_{tqq'}$, die vom Feldmanager gestellt wird und beim zentralen Manager eintrifft. Diese Entscheidung beinhaltet Logik, die vom Feldmanager eingeführt wird, was auch Randomisierung umfassen kann. Dies gelangt als Information zum zentralen Manager.
- Die Entscheidung $x_{tq'q}$, die der zentrale Manager trifft und die die Anzahl der Anhänger bestimmt, die dem Feldmanager gegeben werden. Dies gelangt als Information zum Feldmanager.
- Die endgültige Realisierung $\Rhat_{t+1}$ der tatsächlich benötigten Anzahl von Anhängern, die (in diesem Grundmodell) beiden Agenten offenbart wird.

Wenn wir den Prozess simulieren möchten, müssen wir nur die Erzeugung von $R^{est}\_t$ und $\Rhat_t$ modellieren. Genauer gesagt müssten wir $R^{est}\_t$ aus einer Verteilung und den Fehler $\Rhat_t - R^{est}\_t$ aus einer anderen Verteilung erzeugen.

## Entwurf von Politiken

Für unser Zwei-Agenten-Zeitungsjungenproblem müssen wir Politiken für jeden Agenten entwickeln. Wir beginnen mit der Politik für den Feldmanager.

### Feldmanager

Der Feldmanager beginnt mit einer Schätzung $R^{est}\_t$, muss aber drei Faktoren berücksichtigen:

**1)** Die Schätzung $R^{est}\_t$ kann eine Verzerrung $\delta^{est}$ aufweisen (wir können uns über die Quelle der Schätzung $R^{est}\_{tq}$ nicht sicher sein). Die Verzerrung ist gegeben durch

$$
\delta^{est}_{tq}= \E \Rhat_{t+1} - R^{est}_{tq}.
$$

Wenn also $\delta^{est}\_{tq} > 0$ gilt, bedeutet dies, dass $R^{est}\_t$ nach oben verzerrt ist.

**2)** Die tatsächlich benötigte Anzahl von Anhängern, $\Rhat_{t+1}$, ist zufällig, selbst wenn man die Verzerrung berücksichtigt hat. Der Feldmanager hat höhere Kosten dafür, zu wenige Anhänger zu haben, als zu viele, sodass er eine Aufwärtsverzerrung einführen möchte, um die höheren Kosten widerzuspiegeln, die entstehen, wenn er unerwartet zu wenig hat.

**3)** Der zentrale Manager hat eine ausgeglichene Haltung gegenüber zu vielen oder zu wenigen Ressourcen und weiß um die Verzerrung des Feldmanagers. Infolgedessen wird der zentrale Manager typischerweise die Anfrage des Feldmanagers, $x_{tqq'}$, verwenden, ebenso wie der Feldmanager möglicherweise eine mögliche Verzerrung zwischen der Schätzung $R^{est}$ und dem tatsächlichen Wert $\Rhat_t$ anpasst. Der Feldmanager weiß, dass der zentrale Manager diese Anpassung vornehmen wird, und muss daher versuchen, sie abzuschätzen und ihr entgegenzuwirken. Da der Feldmanager sowohl seine eigene Anfrage $x_{tqq'}$ kennt als auch anschließend sieht, was der zentrale Manager bereitstellt, ist die zum Zeitpunkt $t$ gemachte Beobachtung der Verzerrung gegeben durch

$$
\delta_{tq} =  x_{tq'q} - x_{tqq'}.
$$

Wir müssen unsere Schätzungen der Differenzen zwischen $R^{est}\_t$ und $\Rhat_t$, der Differenz zwischen $x_{tqq'}$ und $x_{tq'q}$ sowie der Differenz zwischen $x_{tqq'}$ und $\Rhat_t$ verwenden. Wir schlagen für den Feldmanager eine Politik vor, die gegeben ist durch

$$
\begin{align}
X_{tqq'}(S_t\vert \theta_q) = R^{est}_t - \delta^{est}_{t-1,q} - \delta_{t-1,q}  + \theta_q. \label{eq:fieldpolicy}
\end{align}
$$

Diese Politik beginnt mit der anfänglichen Schätzung $R^{est}\_t$, korrigiert die Verzerrung in dieser anfänglichen Schätzung mithilfe von $\delta^{est}\_{t-1,q}$, korrigiert dann die Verzerrung durch den zentralen Manager $\delta_{t-1,q}$ und führt schließlich eine Verschiebung ein, die die unterschiedlichen Kosten von Über- und Unterversorgung für den Feldmanager erfassen kann. Der Parameter $\theta_q$ muss abgestimmt werden.

Da hier kein eingebettetes Optimierungsproblem vorliegt (das heißt, kein $\argmax_x$ oder $\argmin_x$), handelt es sich um eine klassische parametrisierte Politik-Funktionsapproximation (PFA).

### Zentraler Manager

Unsere Politik für den zentralen Manager ist gegeben durch

$$
X_{tq'q}(S_t\vert \theta_{q'}) = x_{tqq'} - \delta_{t-1,q'} + \theta_{q'}.
$$

Hier beginnen wir mit der Anfrage des Feldmanagers, subtrahieren unsere beste Schätzung der Differenz zwischen der Anfrage des Feldmanagers und dem letztlich Benötigten, $\delta_{tq'}$, und addieren dann $\theta_{q'}$ hinzu, welches ein abstimmbarer Parameter für den zentralen Manager ist, wobei $\theta_{q'}$ negativ sein kann.

### Politiksuche

Wir haben nun zwei parametrisierte Politiken. Die Abstimmung der Feldpolitik würde mit der Zielfunktion in $\eqref{eq:fieldobjective}$ erfolgen, während die Abstimmung der zentralen Politik mit der Zielfunktion in $\eqref{eq:centralobjective}$ erfolgen würde. Der Trick besteht hier darin, dass beide Zielfunktionen parallel simuliert werden müssen, da die Politiken miteinander verbunden sind. Und während beide Simulationen laufen, verfolgen wir die Zielfunktionen für jeden Agenten.

Der richtige Weg zur Optimierung der Parameter jedes Agenten besteht darin, das Verhalten beider Agenten simultan zu simulieren, aber Suchalgorithmen für jeden Agenten so auszuführen, als wären sie getrennt. Die Leistung des Feldagenten würde beispielsweise durch das Verhalten des zentralen Agenten beeinflusst, genau so, wie der Feldagent von anderen Formen exogener Information beeinflusst wird.

Diese Simulation bietet die Möglichkeit zu untersuchen, wie die Entscheidungen jedes Agenten das Verhalten des anderen Agenten *verändern* können. Wir vertiefen dies weiter in den Übungen.

## Was haben wir gelernt?

- Wir führen ein grundlegendes Multiagentenproblem ein, das wir das „Zwei-Agenten-Zeitungsverkäufer-Problem" nennen, bei dem ein Feldagent Ressourcen von einem zentralen Agenten anfordern muss. Obwohl beide Agenten zusammenarbeiten sollen, haben sie jeweils eigene Kosten für Überschuss (zu viele Ressourcen) und Mangel (zu wenige, was unbefriedigte Nachfrage erzeugt).
- Wir modellieren Information, die privat für den Feldagenten ist, und Information, die privat für den zentralen Agenten ist.
- Das Problem führt die Dimension der Schätzung und Antizipation des Verhaltens des zentralen Agenten ein, um dem Feldagenten bei Entscheidungen zu helfen.
- Zu jedem Zeitpunkt hat der Feldagent eine beste Schätzung dessen, was er bestellen möchte, gegeben die Schätzung $R^{est}\_{tq}$ und die Historie der Anpassungen der Anfrage durch den zentralen Agenten. Angesichts der Unsicherheit und der höheren Kosten für Knappheit gegenüber Überschuss ist es natürlich zu erwarten, dass eine gute Politik darin besteht, das zu bestellen, was wir voraussichtlich benötigen werden, plus einen Puffer für Unsicherheit, sodass wir zunächst Politiken dieser Form vorschlagen.
- Dieses Problem legt die Grundlage für die Einbindung eines Belief-Zustands darüber, wie der zentrale Agent auf die vom Feldagenten vorgenommene Anpassung reagieren wird, da wir davon ausgehen, dass sie letztlich den Überschuss oder Mangel sieht.
- Obwohl dieses Problem recht einfach erscheint, legt es die Grundlage für viele komplexere Multiagenten-Ressourcenallokationsprobleme.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was ist Agent $q$ bekannt, aber Agent $q'$ unbekannt? Was ist entsprechend Agent $q'$ bekannt, aber Agent $q$ unbekannt?</li>
<li>Es gibt eine Information, die beiden Agenten zur Verfügung gestellt wird. Was ist das?</li>
<li>Was ist die exogene Information, die dem Feldagenten zur Verfügung steht? Was ist die exogene Information, die dem zentralen Agenten zur Verfügung steht?</li>
<li>Es gibt drei Unsicherheitsquellen in unserem System. Welche sind das?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Schreiben Sie die dynamischen Modelle sowohl für den Feldmanager als auch für den zentralen Manager auf. Denken Sie daran, dass die Entscheidung eines Managers zur exogenen Information für den anderen wird.</li>
<li>Was würde passieren, wenn der Feldagent einfach immer größere Mengen bestellt? Welcher Mechanismus könnte in das Modell eingeführt werden, um diese Instabilität zu minimieren?</li>
<li>Erstellen Sie eine Schätzung, wie die Entscheidung des Feldagenten, $x_{tqq'}$, das Verhalten des zentralen Agenten beeinflussen könnte. Entwerfen Sie dann eine Politik, die diesen Effekt erfasst, sodass die vom Feldagenten getroffene Entscheidung den Effekt seiner Entscheidung antizipiert.</li>
<li>Es gibt genau eine Information, die genutzt werden kann, um einen Belief über die Politik eines anderen Agenten zu erstellen. Was ist diese Information?</li>
<li>Nehmen Sie nun an, dass der Feldagent die von ihm vom zentralen Agenten erhaltenen Ressourcen zu einem Preis $p_{tq}$ verkaufen kann, der sich von einem Zeitpunkt zum nächsten zufällig ändert. Das bedeutet, dass der Feldagent einen Teil oder alle seine Ressourcen bis zu einem späteren Zeitraum halten könnte, wenn der Preis $p_{tq}$ zu niedrig ist. Erweitern Sie das Modell in diesem Kapitel, um dieses viel reichhaltigere Setting zu behandeln. Sie müssen eine neue Entscheidungsvariable einführen (wie viel der Nachfrage befriedigt werden soll). Schlagen Sie eine Politik-Funktionsapproximation für die Entscheidungsfindung vor.</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *TwoNewsvendor* unter [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Führen Sie eine Rastersuche über die Verzerrung für den Feld- und den zentralen Manager durch. Suchen Sie über den Bereich $[0,10]$ (in Schritten von 1) für den Feldmanager und $[-11,0]$ (in Schritten von 1) für den zentralen Manager. Führen Sie das Spiel für $N = 30$ Zeitschritte aus und wiederholen Sie die Simulation für 1.000 Stichproben (und bilden Sie einen Durchschnitt). Beachten Sie, dass Sie die Belohnungen über die 30 Zeitschritte aufsummieren, aber über die 1.000 Stichproben mitteln. Zeichnen Sie drei Heatmaps für Folgendes:
  <ol type="a">
    <li>Die Gesamtbelohnung für den Feldmanager, für jede der Kombinationen der beiden Verzerrungen.</li>
    <li>Die Gesamtbelohnung für den zentralen Manager, für jede der Kombinationen der beiden Verzerrungen.</li>
    <li>Die Gesamtbelohnung für das Unternehmen (Addition von Feldmanager und zentralem Manager), für jede der Kombinationen der beiden Verzerrungen. Diskutieren Sie die Unterschiede in den optimalen Kombinationen aus jeder der drei Perspektiven. Jeder Akteur möchte seine Belohnung maximieren.</li>
  </ol>
</li>
<li>Nun werden wir die Interval-Estimation-Lernpolitik verwenden, um jede der Verzerrungen zu lernen (siehe die Diskussion der Politiken in [Kapitel 4](/sdam/de/chapter-4/)). Sei $\theta^{IE}_q$ der Parameter für die IE-Politik des Feldmanagers, und sei $\theta^{IE}_{q'}$ der Parameter für die IE-Politik des zentralen Managers. Anstatt nach der besten Verzerrung zu suchen, werden wir nach dem besten Parameter suchen, der die Politik zum Finden der Verzerrung anleitet.
  <ol type="a">
    <li>Führen Sie das Python-Modul aus, wobei jeder Lernparameter über den Bereich $(0, 1, 2, 3, 4, 5)$ variiert wird. Dies bedeutet insgesamt 36 Simulationen (über einen Horizont $N = 20$ und für 1.000 Stichprobenpfade). Zeichnen Sie die gleichen drei Heatmaps, die Sie für Übung 10 erstellt haben.</li>
    <li>Vergleichen Sie das Verhalten der Heatmaps aus Teil (a) mit den Heatmaps aus Übung 10. Versuchen Sie, das Verhalten des Feld- und des zentralen Agenten zu erklären, indem Sie die Politiken aufschreiben und darüber nachdenken, wie sie sich verhalten sollten.</li>
    <li>Überprüfen Sie, dass die direkte Suche nach der Verzerrung die höchste Gesamtbelohnung liefert. Welche Stärken und Schwächen hat jeder Ansatz in einem realistischeren Setting, in dem sich die Parameter des Problems im Laufe der Zeit ändern können?</li>
  </ol>
</li>
<li>(Diese Übung erfordert einige Anpassungen am Python-Modul.) Betrachten Sie nun ein Zwei-Agenten-Zeitungsverkäufer-Problem, bei dem der zentrale Manager auch über einige externe Informationen zur Nachfrage verfügt. Was er hat, ist eine viel verrauschtere Schätzung der Nachfrage (nehmen wir an, das Rauschen ist bei unseren Tabellenkalkulationsdaten, bei denen die Nachfrage immer zwischen 20 und 40 liegt, dreimal größer als das Rauschen aus der Quelle, die mit dem Feldmanager kommuniziert).

Definieren Sie die Verzerrung durch den zentralen Manager neu als die Größe, die er zu der Schätzung, die er erhält, hinzufügt. Versuchen Sie einen Lernansatz, bei dem die von ihm gewählte Verzerrung im Intervall $[-11, 0]$ gewählt wird. Führen Sie das Programm aus und vergleichen Sie die Ergebnisse mit dem alten Lernprozess. Wie zuvor führen Sie das Spiel für $N = 30$ Zeitschritte aus und wiederholen die Simulation für 1.000 Stichproben (und bilden einen Durchschnitt). Legt der zentrale Agent nach $N = 30$ Zeitschritten mehr Gewicht auf die Information vom Feld oder auf seine andere externe Informationsquelle? Warum?</li>
<li>Betrachten Sie den Fall, dass der Feldmanager einen Lernansatz verwendet und der zentrale Manager eine Bestrafungsstrategie anwendet. Da er weiß, dass das Feld eine größere Strafe erhält, wenn es weniger als die Nachfrage liefert, wird der zentrale Manager die vorherige Feldverzerrung (für den Zeitpunkt $t-1$) berechnen, und wenn diese positiv ist, wird er in der nächsten Runde eine Verzerrung anwenden, die doppelt so groß im Betrag und entgegengesetzt im Vorzeichen zur Anfrage des Feldes ist. Führen Sie dieses Experiment durch und beobachten Sie, welche Verzerrung das Feld nach den 30 Zeitschritten haben wird. Sollte der zentrale Manager diese Strategie im Vergleich zu den vorherigen Politiken anwenden?</li>
</ol>
{% endraw %}
