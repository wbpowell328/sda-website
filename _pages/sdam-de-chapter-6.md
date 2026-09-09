---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 6: Stochastische Kürzeste-Wege-Probleme - Dynamische"
permalink: /sdam/de/chapter-6/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 0cd6be02e9b93c08
---


{% raw %}
## Kapitelüberblick

[Kapitel 5](/sdam/de/chapter-5/) stellte ein Kürzeste-Wege-Problem vor, bei dem wir davon ausgehen, dass wir entweder nichts über dynamisch veränderliche Reisezeiten auf Verbindungen wissen, oder dass wir die Zeiten auf Verbindungen beobachten können, die mit der Kreuzung verbunden sind, an der sich unser Reisender gerade befindet (aber nichts, was weiter in der Zukunft liegt).

Stellen wir uns nun vor, wir wären ein Dienst wie Google Maps, der Zugriff auf Echtzeitinformationen über das gesamte Netzwerk hat. Zudem werden diese Informationen in Echtzeit aktualisiert, was dazu führt, dass Google den empfohlenen Weg zum Ziel des Reisenden aktualisiert. Diese Information führt eine wesentliche Veränderung in das Modell ein, die jede Möglichkeit der Nutzung der in [Kapitel 5](/sdam/de/chapter-5/) vorgestellten Methoden vollständig ausschließt.

Der Ansatz, den wir für dieses Problem verwenden, gilt für jedes Problem, das wir lösen würden, indem wir mit sogenannten "besten Schätzungen" unsicherer Werte in die Zukunft planen. Dies bietet einen Rahmen für unsere erste Anwendung der vierten Klasse von Politiken, die wir direkte Lookahead-Approximationen nennen. Wir nutzen diesen Rahmen, um eine praktische und leistungsfähige Methode zur Entscheidungsfindung in einem dynamischen Umfeld (das heißt unter Unsicherheit) zu demonstrieren, bei der wir mit einem deterministischen Lookahead-Modell beginnen und dann Parameter einführen, damit es im Laufe der Zeit unter Unsicherheit besser funktioniert.

## Erzählung

Wir werden uns erneut mit stochastischen kürzesten Wegen befassen, diesmal jedoch genauso, wie es in Google Maps (oder jedem kommerziellen Navigationssystem) gemacht wird. Wir alle wissen, dass Verkehrsnetze oft vorhersehbare Staumuster aufweisen, zusammen mit zufälligen Schwankungen, die im natürlichen Verlauf der Ereignisse auftreten. Zum Beispiel könnte ein Unfall einen Rückstau verursachen, bei dem wir abschätzen könnten, wie sich die Reiseverzögerungen infolge des Unfalls entwickeln könnten.

Der Ausgangspunkt der Abweichung vom statischen Kürzeste-Wege-Problem ist, dass sich unsere Schätzungen der zukünftigen Kosten im Laufe der Zeit verändern. Wir werden zu dem Problem zurückkehren, bei dem die Kosten stochastisch sind, aber wenn wir an einem Knoten $i$ ankommen, sehen wir nicht die tatsächlichen Realisierungen der Kosten ausgehend von Knoten $i$. Wir werden jedoch annehmen, dass uns aktualisierte Kostenschätzungen für das gesamte Netzwerk zur Verfügung gestellt werden. Diese Schätzungen können als Prognose betrachtet werden; wir nehmen an, dass die tatsächlichen Kosten, die uns beim Durchlaufen eines Bogens entstehen, im Durchschnitt der Prognose entsprechen (das heißt, die Prognosen sind unverzerrt), aber diese Prognosen werden sich im Laufe der Zeit weiterentwickeln, wenn wir Aktualisierungen zum Status des Netzwerks erhalten.

## Einordnung des Problems

Die Antworten auf unsere drei Rahmenfragen lauten:

- **Metriken:** Wir möchten die erwartete Reisezeit minimieren, wobei wir auch eine Strafe für die Ankunft nach einer Zielankunftszeit einbeziehen können.
- **Entscheidungen:** Für einen Reisenden am Knoten $i$ möchten wir ihm mitteilen, zu welchem Knoten $j$ er als Nächstes weiterziehen soll.
- **Unsicherheiten:** Die geschätzten Reisezeiten ändern sich zufällig, jedes Mal wenn ein Reisender eine Verbindung zu einem nachgelagerten Knoten durchläuft. Die tatsächliche Zeit beim Durchlaufen einer Verbindung wird von der Schätzung abweichen.

## Grundmodell

Angenommen, wenn wir zum Zeitpunkt $t$ eine Entscheidung treffen müssen, verfügen wir über eine aktualisierte Schätzung der Reisekosten basierend auf den *aktuellen* Staugraden (indem wir die Geschwindigkeit verfolgen, mit der sich unsere Smartphones durch den Verkehr bewegen). Wir werden diese Zeiten mithilfe von $\cbar_{tk\ell}$ darstellen, den geschätzten Kosten für das Durchlaufen der Verbindung $(k,\ell)$ zum Zeitpunkt $t$, wobei die Schätzungen auf dem basieren, was wir zum Zeitpunkt $t$ wissen.

Vorerst werden wir nicht versuchen, die Kosten zu modellieren, wenn wir zu einem Zeitpunkt $t' > t$ ankommen, gegeben dem, was wir zum Zeitpunkt $t$ wissen. Wir schätzen also möglicherweise um 15 Uhr, dass wir um 17 Uhr an einer Verbindung ankommen werden, werden aber unsere Schätzung von 15 Uhr verwenden (wie Google es heute tut).

### Zustandsvariablen

Von einem Reisenden am Knoten $N_t = i$ zum Zeitpunkt $t$ wird angenommen, dass ihm ein Satz von Prognosen $\cbar_{t} = (\cbar_{ttk\ell})\_{k, \ell \in \Ncal}$ vorliegt, der Vektor der Kostenschätzungen für das Durchlaufen der Verbindung $(k, \ell)$ zum Zeitpunkt $t$, gegeben dem, was zum Zeitpunkt $t$ bekannt ist. Der Zustand $S_t$ des Reisenden zum Zeitpunkt $t$ ist dann

$$
S_t = (N_t, \cbar_t).
$$

Beachten Sie, dass diese Zustandsvariable *sehr* groß ist; sie besteht aus einem Vektor von Schätzungen der Verbindungskosten für *jede* Verbindung im Netzwerk.

### Entscheidungsvariablen

Die Entscheidungsvariablen sind dieselben wie beim statischen stochastischen Kürzeste-Wege-Problem

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i \text{ at time } t, \\ 0 & \text{otherwise.} \end{cases}
$$

Diese Entscheidung muss der Einschränkung genügen, dass wir *etwas* tun, wenn wir uns im Zustand $N_t = i$ befinden, solange $i$ nicht das Ziel ist. Wir schreiben diese Einschränkung als

$$
\begin{align}
\sum_j x_{t,i,j} = 1 \quad \text{for } N_t = i \text{ other than the destination.} \label{dynamicshorestpathconstraint}
\end{align}
$$

Wenn wir uns am Ziel befinden, tun wir nichts und schreiben stattdessen $x_{tij} = 0$ für $i$ gleich dem Ziel und $j$ für jeden anderen Knoten.

Wie zuvor lassen wir $X^\pi(S_t)$ unsere Politik zur Bestimmung des Vektors $x_t$ sein, von der wir annehmen, dass sie die Einschränkung $\eqref{dynamicshorestpathconstraint}$ erfüllen muss.

### Exogene Information

Es gibt zwei Arten von exogener Information für dieses Problem. Die erste Art sind die beobachteten Kosten: $\chat_{t+1,ij}$, die tatsächlichen Kosten für das Durchlaufen der Verbindung $(i,j)$, nachdem der Reisende zum Zeitpunkt $t$ die Entscheidung getroffen hat, diese Verbindung zu durchlaufen. Beachten Sie, dass wir $\chat_{t+1,ij}$ nur beobachten, wenn der Reisende die Verbindung $(i,j)$ durchläuft (wir können für Verbindungen, die wir nicht durchlaufen, einfach 0 einsetzen, da wir diese Werte nicht verwenden werden).

Die zweite Art neuer Information sind die Aktualisierungen der Schätzungen $\cbar_t$ der Verbindungskosten. Wir werden die exogene Information als die Veränderung der Schätzungen modellieren:

$$
\delta \cbar_{t+1,k\ell} = \begin{cases} \cbar_{t+1,k\ell} - \cbar_{tk\ell} & \text{if } x_{tk\ell}=1, \\ 0 & \text{otherwise.} \end{cases}
$$

$$
\delta \cbar_{t+1} = (\delta \cbar_{t+1,k\ell})_{(k,\ell)\in\Ncal}.
$$

Unsere exogene Informationsvariable ist dann gegeben durch

$$
W_{t+1} = (\chat_{t+1}, \delta \cbar_{t+1}).
$$

### Übergangsfunktion

Wir gehen davon aus, dass $\chat_{t+1}$ als exogene Information eintrifft (wir hätten die exogene Information auch als die Veränderung der Kosten definieren können, aber dies ist natürlicher).

Die Übergangsfunktion für die Prognosen entwickelt sich gemäß

$$
\begin{align}
\cbar_{t+1,k\ell} = \cbar_{tk\ell} + \delta \cbar_{t+1,k\ell}. \label{eq:shortestpathdynamictransition1}
\end{align}
$$

Schließlich aktualisieren wir den physischen Zustand $N_t$ mithilfe von

$$
\begin{align}
N_{t+1} = \{j\vert x_{t,N_t,j} = 1\}. \label{eq:shortestpathdynamictransition2}
\end{align}
$$

Mit anderen Worten: Wenn wir uns am Knoten $i=N_t$ befinden und die Entscheidung $x_{tij}= 1$ treffen (was voraussetzt, dass wir uns am Knoten $i$ befinden, da sonst $x_{tij} = 0$), dann gilt $N_{t+1} = j$.

Die Aktualisierung von $\chat_{t+1}$, Gleichung $\eqref{eq:shortestpathdynamictransition1}$ für die Prognosen $\cbar_{t+1}$ und Gleichung $\eqref{eq:shortestpathdynamictransition2}$ für unseren physischen Zustand $R_t$, bilden zusammen unsere Übergangsfunktion

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

### Zielfunktion

Wir schreiben nun unsere Zielfunktion als

$$
\begin{align}
\min_\pi F^\pi(S_0) = \E \left\{\sum_{t=0}^T \sum_{(i,j)\in\Ncal} \chat_{t+1,i,j}X^\pi(S_t)\vert S_0 \right\}. \label{eq:shortestpathdynamicobjective}
\end{align}
$$

Beachten Sie, dass unsere Politik $X^\pi(S_t)$ die Wahl der nächsten Verbindung, zu der wir uns bewegen, basierend auf dem, was wir zum Zeitpunkt $t$ wissen, trifft, erfasst durch $S_t$.

## Modellierung von Unsicherheit

In der Praxis stammt die dynamische Aktualisierung von Kosten (und Prognosen) aus realen Systemen, was bedeutet, dass sie *datengetrieben* sind. Wenn dies der Fall ist, verwenden wir kein mathematisches Modell der Verbindungskosten. Die Alternative besteht darin, ein mathematisches Modell der Zufallsinformation $W^{n+1}$ zu haben.

Wenn wir Simulationen durchführen möchten, stehen wir vor der Herausforderung, die Realisierung der durch $\chat_t$ erfassten Kosten sowie die Abfolge der Prognosen zu modellieren. Diesem Modell muss beträchtliche Sorgfalt gewidmet werden. Erstens muss die Veränderung der Schätzung von $\ctilde_t$, die wir durch $\delta \ctilde_{t+1}$ darstellen, aus einer Verteilung mit dem Mittelwert $0$ gezogen werden. Darüber hinaus müssen die Realisierungen $\chat_{t+1}$ aus einer Verteilung mit dem Mittelwert $\ctilde_t$ gezogen werden.

Wir wollen die Herausforderung, ein realistisches stochastisches Modell zu erstellen, nicht verharmlosen. Veränderungen der Verbindungskosten ergeben sich aus verschiedenen Quellen, aus natürlichen Verkehrsschwankungen, Wetter, Unfällen und Verschiebungen in den Flüssen aufgrund von Fahrern, die auf Staus an anderer Stelle im Netzwerk reagieren. Stochastische Schwankungen der Verbindungskosten sind nichtstationär und weder über die Zeit noch zwischen den Verbindungen unabhängig. Über die Anerkennung dieser schwierigen Herausforderungen hinaus geht ein realistischeres Modell jedoch über den Rahmen unserer Diskussion hinaus.

## Entwurf von Politiken

Ein deutlicher Hinweis darauf, dass wir die Bellman-Gleichung (auch nicht annäherungsweise) nicht verwenden werden, ist die Größe der Zustandsvariable, die nun Prognosen der Reisekosten für jede Verbindung im Netzwerk umfasst.

Stattdessen werden wir unsere Politik auf ein spezielles Modell stützen, das wir *Lookahead-Modell* nennen. Zum Zeitpunkt $t$ können wir beispielsweise ein Modell erstellen, das aus Zuständen $S_t$, Entscheidungen $x_t$ und exogener Information $W_{t+1}$ besteht, aber in unserem Basisproblem ist die Zustandsvariable $S_t = (N_t, \cbar_t)$ recht kompliziert.

Stattdessen werden wir ein einfacheres Modell erstellen, bei dem wir zunächst einen neuen Satz von Variablen erstellen, die typischerweise Approximationen der Variablen im Basismodell sind. Wir unterscheiden einen neuen Satz von Variablen für unsere Lookahead-Modelle, indem wir die Variablen im Lookahead-Modell mit Tilden versehen und sie mit zwei Zeitindizes indizieren: der Zeit $t$, zu der eine Entscheidung getroffen wird, und einem zweiten Index $t'$, der die Zeit innerhalb des Lookahead-Modells angibt.

Die Abfolge von Zuständen, Entscheidungen und exogener Information im Lookahead-Modell würde dann geschrieben als

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots ).
$$

Unser Kostenvektor $\cbar_t$ würde dann durch den Vektor $\ctilde_{tt'}$ ersetzt. Wir stehen nun vor der Herausforderung, eine Lookahead-Politik zu entwerfen, die wir $\Xtilde_{tt'}(\Stilde_{tt'})$ nennen könnten, die $\xtilde_{tt'}$ innerhalb des Lookahead-Modells bestimmt. Im Folgenden schlagen wir zwei Strategien vor, die beide mit einem einfachen Kürzeste-Wege-Algorithmus gelöst werden können.

### Eine deterministische Lookahead-Politik

Wir approximieren das Problem, indem wir annehmen, dass die Kosten im Lookahead-Modell, $\ctilde_{tt'}$, fest sind und den aktuellen Schätzungen entsprechen, was bedeutet, dass wir festlegen

$$
\ctilde_{tt'k\ell} = \cbar_{tk\ell}.
$$

Dies bedeutet, dass wir die exogenen Informationsvariablen $\Wtilde_{tt'}$ nicht mehr haben, was uns ein deterministisches Lookahead-Modell liefert.

Dies erlaubt es uns, unser Lookahead-Modell deterministisch zu lösen, wobei wir die Kostenschätzungen $\ctilde_{tt',k\ell}$ als die korrekten Kosten behandeln, anstatt als Zufallsvariablen. In diesem Fall ist unsere Zustandsvariable erneut einfach der Knoten, an dem sich der Reisende (innerhalb des Lookahead-Modells) befindet.

Wir können dieses Problem mit einem Standard-Kürzeste-Wege-Algorithmus lösen, der, wie wir in [Kapitel 5](/sdam/de/chapter-5/) gesehen haben, ein deterministisches dynamisches Programm ist, das wir mit der Bellman-Gleichung lösen können, indem wir zunächst den "Wert" ermitteln, sich am Knoten $i$ zum Zeitpunkt $t'$ in unserem Lookahead-Modell zu befinden. Wir können diese Werte berechnen, indem wir die Werte am Ende unseres Lookahead-Modells für den Zeitpunkt $t$ gleich null setzen

$$
\Vtilde_{t,t+H}(i) = 0,\ \text{for all } i.
$$

Dann gehen wir (im Lookahead-Modell) für $t' = t+H-1, t+H-2, \ldots, t$ zeitlich zurück und berechnen für jeden Knoten $i$:

$$
\begin{align}
\Vtilde_{tt'}(i) = \min_{j\in\Ncal^+_i} (\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(j)). \label{eq:shortestpathdetlookahead}
\end{align}
$$

Unsere Lookahead-Politik ist dann gegeben durch

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmandetlookahead}
\end{align}
$$

Schließlich lautet die Politik, die wir im Basismodell umsetzen werden, wenn wir uns am Knoten $i$ befinden:

$$
X^\pi_t(S_t = i) = \Xtilde^\pi_{tt}(S_t = i).
$$

Dies ist die Politik, die wir verwenden, wenn wir einem Navigationssystem folgen. Entscheidungen auf der Grundlage eines deterministischen Lookahead-Modells zu treffen, ist eine der am weitesten verbreiteten Methoden zur Entscheidungsfindung bei sequentiellen Entscheidungsproblemen unter Unsicherheit.

<figure class="book-figure">
  <img src="/assets/images/sdam/rhpdeterministic123.jpg" alt="Illustration of simulating a direct lookahead policy, using a deterministic model of the future." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 6.1.</span> Illustration der Simulation einer direkten Lookahead-Politik unter Verwendung eines deterministischen Modells der Zukunft.</figcaption>
</figure>

Abbildung 6.1 veranschaulicht einen rollierenden Lookahead-Prozess. Zu den Zeitpunkten $t$, $t+1$, $t+2$, $\ldots$ erstellen und lösen wir ein Lookahead-Modell unter Verwendung von Kostenschätzungen, wie wir sie kennen. Wir lösen dann unser Kürzeste-Wege-Problem, das durch die Entscheidungen $\xtilde_{tt'}(j)$ für alle Knoten $j$ dargestellt wird, setzen aber nur die Entscheidung $\xtilde_{tt}(i)$ für den Knoten $i$ um, an dem wir uns zum Zeitpunkt $t$ befinden.

Wenn wir eine sich dynamisch verändernde Variable in einem Lookahead-Modell konstant halten, bezeichnen wir diese Variable im Lookahead-Modell als *latente Variable*. Der Begriff "latente Variable" bedeutet technisch verborgene Variable; in diesem Zusammenhang bezieht er sich auf eine Variable, die sich (innerhalb des Lookahead-Modells) im Laufe der Zeit nicht verändert, in diesem Fall lassen wir sie aus der Zustandsvariable heraus, was bedeutet, dass sie verborgen ist (wiederum im Lookahead-Modell).

Dies ist eine von mehreren verschiedenen Arten von Approximationen, die in einem Lookahead-Modell vorgenommen werden können. Die offensichtlichste Approximation, die wir vornehmen, ist, dass wir eine deterministische Zukunft verwenden, was bedeutet, dass die Schätzungen der Verbindungskosten innerhalb des Lookahead-Modells konstant gehalten werden, während sie sich im Basismodell verändern.

Das Lookahead-Modell ist somit ein eigenes Modell mit eigenen Merkmalen, was der Grund dafür ist, dass wir Variablen mit Tilden verwenden — so unterscheiden wir zwischen unserem Basismodell, das Variablen wie $S_t$ und $x_t$ verwendet, und dem Lookahead-Modell, in dem wir Variablen wie $\Stilde_{tt'}$ und $\xtilde_{tt'}$ verwenden.

Als Nächstes werden wir eine kleine Anpassung vorschlagen, damit dieser Ansatz unter Unsicherheit besser funktioniert.

### Eine parametrisierte deterministische Lookahead-Politik

Eine einfache Strategie zum Umgang mit Unsicherheit in unserem dynamischen Kürzeste-Wege-Problem bestünde darin, unseren Punktschätzer $\ctilde_{tt'k\ell}=\cbar_{tk\ell}$ für die Kosten der Durchquerung von Link $(k,\ell)$ zur Zeit $t$ durch beispielsweise das $\theta$-Perzentil der Kosten zu ersetzen, was nahelegt, die Kosten als $\ctilde_{tt',k\ell}(\theta) = \cbar_{tij}(\theta)$ zu schreiben. Diese Logik könnte beispielsweise vermeiden, einen Weg durch ein Gebiet zu wählen, das manchmal sehr überlastet wird, wo die Kosten *möglicherweise* recht hoch sind.

Diese Politik erzeugt weiterhin ein deterministisches Kürzeste-Wege-Problem, das genauso einfach zu lösen ist wie bei Verwendung der Punktschätzer $\cbar_t$. Wir modifizieren einfach die Gleichungen $\eqref{eq:shortestpathdetlookahead}$–$\eqref{eq:shortestpathbellmandetlookahead}$ oben, indem wir die $\theta$-Perzentil-Linkkosten verwenden. Wir bezeichnen dann die Wertfunktionen $\Vtilde_{tt'}(i\vert \theta)$, um die Abhängigkeit vom Parameter $\theta$ anzuzeigen, der berechnet wird mit

$$
\begin{align}
\Vtilde_{tt'}(i\vert \theta) = \min_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{t,t'+1}(j\vert \theta)\big). \label{eq:shortestpaththetalookahead}
\end{align}
$$

Unsere Lookahead-Politik ist dann gegeben durch

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i\vert \theta) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{tt'}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmanthetalookahead}
\end{align}
$$

Wir schreiben dann unsere parametrisierte Politik für das Basismodell (die die tatsächlich implementierten Entscheidungen liefert) unter Verwendung von

$$
X^\pi_t(S_t = i\vert \theta) = \Xtilde_{tt}(S_t = i\vert \theta).
$$

Dies ist äquivalent zu unserem ursprünglichen deterministischen Lookahead-Modell, mit einer wesentlichen Ausnahme: Wir müssen $\theta$ durch Optimierung von

$$
\begin{align}
\min_\theta F^\pi(\theta\vert S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}. \label{eq:tuneshortestpathcfa}
\end{align}
$$

abstimmen, wobei $S_{t+1} = S^M(S_t,X^\pi(S_t\vert \theta), W_{t+1})$ (siehe Gleichungen $\eqref{eq:shortestpathdynamictransition1}$–$\eqref{eq:shortestpathdynamictransition2}$) unter Verwendung einer Methode zur Erzeugung von Zufallsrealisierungen von $W_1, \ldots, W_T$ berechnet wird.

Das Optimierungsproblem in $\eqref{eq:tuneshortestpathcfa}$ ist selbst ein anspruchsvolles Problem, wird aber dadurch erleichtert, dass $\theta$ ein Skalar zwischen 0 und 1 ist. Praktische Algorithmen zur Optimierung der Zielfunktion in $\eqref{eq:tuneshortestpathcfa}$ beinhalten typischerweise das Ausführen von Simulationen, um verrauschte Beobachtungen der Funktion zu erhalten.

Eine naheliegende Frage ist, ob die Verwendung eines anderen Perzentils als $\theta = 0.5$ die Ergebnisse verbessern würde. Unsere Erfahrung zeigt, dass dies zutrifft, wenn es eine Strafe für verspätete Ankünfte gibt (zum Beispiel, wenn wir pünktlich zu einem Termin um 9 Uhr morgens erscheinen wollen).

## Was haben wir gelernt?

- Wir haben gezeigt, wie man ein dynamisches Netzwerkproblem modelliert, bei dem sich die Kostenschätzungen im Laufe der Zeit entwickeln. Diesmal besteht der Zustand des Systems aus dem Standort des Reisenden zusammen mit den Kostenschätzungen für jeden Link im Netzwerk.
- Wir haben die Idee eines approximativen Lookahead-Modells eingeführt, in diesem Fall ein deterministisches Lookahead, das als Kürzeste-Wege-Problem gelöst werden kann. Obwohl dies eine optimale Lösung ist, ist das Lösen eines approximativen Lookahead-Modells, selbst optimal, keine optimale Politik.
- Wir beschreiben latente Variablen, das sind dynamische Variablen (die Kosten auf den Links), die im Lookahead-Modell konstant gehalten werden (weshalb sie nicht mehr in der Zustandsvariable enthalten sind).
- Wir zeigen, wie wir unser deterministisches Lookahead in ein parametrisiertes deterministisches Lookahead umwandeln können. Anstatt die erwarteten Kosten für jeden Link zu verwenden, könnten wir das $\theta$-Perzentil verwenden, sodass wir berücksichtigen, wie schlecht ein Link *möglicherweise* sein könnte. Der Parameter $\theta$ muss abgestimmt werden, wodurch dies zu einem Hybrid aus einer deterministischen Lookahead-Approximation (einer DLA-Politik) wird, die parametrisiert ist, was sie zu einer Form der CFA-Politik macht und uns eine hybride DLA/CFA-Politik gibt.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Warum konnten wir die approximativen dynamischen Programmierungsmethoden aus [Kapitel 5](/sdam/de/chapter-5/) nicht verwenden, um unser dynamisches Problem zu lösen?</li>
<li>Wie modellieren wir den exogenen Prozess $W_t$ im Lookahead-Modell?</li>
<li>Beschreiben Sie in Worten, was wir unter einer Lookahead-Politik verstehen.</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Wir lösen ein deterministisches Lookahead-Modell als unsere Politik. Dies löst das deterministische Problem optimal. Warum ist dies keine optimale Politik?</li>
<li>Wir lösen unser deterministisches Lookahead-Modell (möglicherweise mit modifizierten Kosten $\cbar_{ij}(\theta)$) als ein deterministisches dynamisches Programm mithilfe der Bellman-Gleichung. Warum würden wir dann nicht sagen, dass wir unser Basismodell mittels dynamischer Programmierung lösen?</li>
<li>Stellen Sie sich vor, wir möchten so spät wie möglich vom Ausgangsknoten abfahren, aber es gibt eine hohe Strafe für eine verspätete Ankunft am Zielknoten. Wenn wir über das $\theta$-Perzentil der Kosten $\cbar_{tij}(\theta)$ optimieren, wie könnte diese Logik uns helfen, verspätete Ankünfte zu vermeiden?</li>
<li>Wie, glauben Sie, würde die Verwendung der $\theta$-Perzentil-Kosten angesichts der Erkenntnisse aus Übung 6 bei einem Problem helfen, bei dem wir einfach versuchen, die Gesamtreisezeit zu minimieren, ohne die Möglichkeit einer verspäteten Ankunft zu berücksichtigen?</li>
<li>Geben Sie das vollständige Modell (Zustandsvariablen, Entscheidungsvariablen, ...) für die Einstellung an, bei der die Kosten $\chat_{tij}$ auf Links, die von Knoten $i$ ausgehen, offengelegt werden, wenn der Reisende am Knoten $i$ ankommt und bevor er eine Entscheidung trifft, welchen Link er durchqueren soll. Denken Sie daran, dass Sie die kumulativen Kosten entlang des Pfades minimieren. Sie müssen keine Politik entwerfen; folgen Sie unserer üblichen Praxis, eine Politik $X^\pi(S_t)$ einzuführen, ohne die Politik zu spezifizieren.</li>
<li>Stellen Sie sich vor, wir möchten unser Kürzeste-Wege-Problem lösen, bei dem wir so spät wie möglich vom Ausgangspunkt abfahren möchten, aber bis 9 Uhr morgens am Ziel ankommen müssen. Wir veranschlagen eine Strafe $\eta$ für jede Minute, die wir nach 9 Uhr morgens ankommen. Beschreiben Sie ein Basismodell und eine parametrisierte Lookahead-Politik zur Lösung dieses Problems. Was ist die Zustandsvariable für das Basismodell? Was ist die Zustandsvariable für das Lookahead-Modell?</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *StochasticShortestPath_Dynamic* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Wir werden ein deterministisches Lookahead-Modell verwenden, wie es in den Notizen getan wurde, aber anstatt die erwarteten Kosten für jeden Link zu verwenden, werden wir ein Perzentil verwenden, das wir mit $\theta^{cost}$ bezeichnen. Wenn beispielsweise $\theta^{cost} = 0.8$, dann würden wir das 80. Perzentil der Kosten verwenden (denken Sie daran als Verwendung einer Schätzung dafür, wie groß die Kosten sein könnten). Sei $\cbar_{tij}(\theta^{cost})$ das $\theta^{cost}$-Perzentil-Kosten von Link $(i,j)$ gegeben dem, was wir zur Zeit $t$ wissen.
  <ol type="a">
    <li>Schreiben Sie das Lookahead-Modell auf, das ein deterministisches Kürzeste-Wege-Problem mit Kosten $\cbar_{tij}(\theta^{cost})$ wäre (wie im Buch beschrieben). Verwenden Sie dieses Modell, um formal eine Lookahead-Politik $X^{DLA}(S_{tj}\vert \theta^{cost})$ zu definieren.</li>
    <li>Was ist die Zustandsvariable für das dynamische Problem? Denken Sie daran, dass die Zustandsvariable alle dynamisch variierenden Informationen umfasst, die zur Entscheidungsfindung verwendet werden (einschließlich der Berechnung von Kosten und Nebenbedingungen), sowie zur Berechnung des Übergangs von $t$ zu $t + 1$.</li>
    <li>Schreiben Sie die Zielfunktion auf, die zur Bewertung unserer Lookahead-Politik verwendet wird.</li>
    <li>Wir haben nun eine Politik $X^{DLA}(S_{tj}\vert \theta^{cost})$, parametrisiert durch $\theta^{cost}$. Simulieren Sie mithilfe des Python-Moduls <em>StochasticShortestPath_Dynamic</em> die Politik für $\theta^{cost} = (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0)$. Simulieren Sie jede Version der Politik 100 Mal und bilden Sie einen Durchschnitt der gesamten tatsächlichen Kosten (nicht das $\theta^{cost}$-Perzentil). Berücksichtigen Sie auch das Risiko, "zu spät" zu sein, d. h., dass die gesamten tatsächlichen Kosten größer als ein vorgegebener Schwellenwert sind. Stellen Sie die Ergebnisse grafisch dar und vergleichen Sie sie.</li>
  </ol>
</li>
</ol>
{% endraw %}
