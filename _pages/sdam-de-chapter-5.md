---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 5: Stochastische Kürzeste-Wege-Probleme - Statisch"
permalink: /sdam/de/chapter-5/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 753d27ec659d4188
---


{% raw %}
## Kapitelüberblick

Kürzeste-Wege-Probleme über Graphen sind sowohl ein wichtiges Anwendungsgebiet (das im Transportwesen, in der Logistik und der Kommunikation auftritt) als auch eine fundamentale Problemklasse, die in vielen anderen Zusammenhängen auftritt. Das bekannteste Kürzeste-Wege-Problem ist das klassische deterministische Problem, das in Abbildung 5.1 dargestellt ist, bei dem wir den besten Weg von Knoten 1 zu Knoten 11 finden müssen, wobei die Kosten für das Durchlaufen jedes Bogens im Voraus bekannt sind.

<figure class="book-figure">
  <img src="/assets/images/sdam/deterministicgraph.jpg" alt="Netzwerk für ein deterministisches Kürzeste-Wege-Problem." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 5.1.</span> Netzwerk für ein deterministisches Kürzeste-Wege-Problem.</figcaption>
</figure>

In diesem Kapitel werden wir mit einem Kürzeste-Wege-Problem beginnen, bei dem die Reisezeiten bekannt und fest sind. Die deterministische Version wird uns erlauben, eine bestimmte Art der Entscheidungsfindung mithilfe der Bellman-Gleichung zu demonstrieren. Anschließend führen wir Unsicherheit auf eine sehr spezifische Weise ein, die uns erlaubt, eine Lösungsstrategie zu demonstrieren, die als approximative dynamische Programmierung bekannt ist.

## Erzählung

Sie versuchen, ein Navigationssystem zu entwickeln, das ein fahrerloses Fahrzeug über ein überlastetes Netzwerk zu einem Ziel führt. Wir nehmen an, dass unser System sowohl auf historische als auch auf Echtzeit-Verbindungskosten zugreifen kann, aus denen wir Schätzungen des Mittelwerts und der Varianz der Kosten für das Durchlaufen einer Verbindung erstellen können. Wir können dies als ein Kürzeste-Wege-Problem betrachten, bei dem wir Verteilungen anstelle tatsächlicher Kosten sehen, wie in Abbildung 5.2 dargestellt.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph1.jpg" alt="Netzwerk für ein stochastisches Kürzeste-Wege-Problem, bei dem Verteilungen bekannt sind, die Kosten aber erst nach der Entscheidung beobachtet werden." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 5.2.</span> Netzwerk für ein stochastisches Kürzeste-Wege-Problem, bei dem Verteilungen bekannt sind, die Kosten aber erst nach der Entscheidung beobachtet werden.</figcaption>
</figure>

Wir werden zunächst annehmen, dass wir Entscheidungen darüber treffen müssen, welche Verbindung wir auf Basis dieser Verteilungen durchlaufen. Nachdem wir eine Verbindung von $i$ nach $j$ durchlaufen haben, erfahren wir dann eine Stichprobenrealisierung aus der Verteilung. Wir wollen einen Pfad wählen, der die erwarteten Kosten minimiert.

## Einordnung des Problems

Die Antworten auf unsere drei Einordnungsfragen sind:

- **Metriken:** Wir möchten die erwartete Reisezeit vom Ursprungsort des Reisenden zu einem bestimmten Ziel minimieren.
- **Entscheidungen:** Wenn sich ein Reisender an einem bestimmten Knoten $i$ befindet, muss er entscheiden, zu welchem nachgeordneten Knoten $j$ er sich bewegt, was letztlich zum endgültigen Ziel führt.
- **Unsicherheiten:** Wir betrachten sowohl ein deterministisches Problem, bei dem keine Unsicherheit besteht, als auch eine Version, bei der die Reisezeiten unsicher sind, aber unmittelbar bevor sich ein Reisender zum Durchlaufen einer bestimmten Verbindung entschließt, offenbart werden.

## Grundmodell

Wir nehmen an, dass wir versuchen, das Netzwerk in Abbildung 5.2 zu durchlaufen, beginnend an einem Knoten $q$ und endend an einem Ziel $r$.

### Notation

Kürzeste-Wege-Probleme bauen auf einer fundamentalen dynamischen Programmierungsrekursion auf. Sei $\Ncal$ die Menge aller Knoten im Netzwerk (die Knoten $1, 2, \ldots, 11$), $\Ncal^+\_i$ die Menge aller Knoten, die direkt von Knoten $i$ aus erreicht werden können, $\Ncal^-\_j$ die Menge aller Knoten, die mit Knoten $j$ verbunden sind, $\Lcal$ die Menge aller Verbindungen $(i,j)$ im Netzwerk, und $c_{ij}$ die Kosten für das Durchlaufen der Verbindung $(i,j)$, wobei angenommen wird, dass $j$ in der Menge $\Ncal^+\_i$ liegt.

Sei $v_i$ die minimalen Kosten von Knoten $i$ zum Zielknoten 11. Die Werte $v_i$ für alle Knoten $i\in\Ncal$ sollten erfüllen

$$
\begin{align}
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j). \label{eq:shortestpathbellman1}
\end{align}
$$

Wir können Gleichung $\eqref{eq:shortestpathbellman1}$ ausführen, indem wir $v_{11}$ auf null initialisieren und alle anderen Werte auf eine sehr große Zahl setzen. Wenn wir über jeden Knoten $i$ iterieren und $v_i$ mithilfe von Gleichung $\eqref{eq:shortestpathbellman1}$ wiederholt berechnen, konvergieren die Werte $v_i$ zum optimalen Wert. Dies ist eine sehr ineffiziente Version eines Kürzeste-Wege-Algorithmus.

Eine andere Möglichkeit, unser Netzwerk zu betrachten, besteht darin, anzunehmen, dass jeder Knoten $i$ ein Zustand $S$ ist, und $V_t(S_t)$ den Wert, sich zur "Zeit" $t$ im Zustand $S_t$ zu befinden. In unserem Kürzeste-Wege-Problem werden wir $t$ verwenden, um die Anzahl der Verbindungen zu indizieren, die wir auf unserem Weg von Knoten 1 zum durch $S_t$ repräsentierten Knoten durchlaufen haben.

Von einem Zustand (Knoten) $S_t$ aus nehmen wir an, dass wir eine Entscheidung treffen, die wir "$x$" nennen, was eine Entscheidung wäre, eine von dem Knoten, der dem Zustand $S_t$ entspricht, ausgehende Verbindung zu durchlaufen. Wir können diese Menge von Entscheidungen als $\Xcal_s$ schreiben, die die Entscheidungen $x$ repräsentiert, die uns zur Verfügung stehen, wenn wir uns im Zustand $S_t = s$ befinden.

Als Nächstes sei $C(s,x)$ die Kosten dafür, im Zustand $s$ zu sein und die Entscheidung $x$ zu treffen, was unseren Verbindungskosten $c_{ij}$ in unserem obigen Netzwerk entsprechen würde. Schließlich werden wir eine "Zustandsübergangsfunktion" verwenden, die wir mit $S^M(s,x)$ bezeichnen und die uns sagt, in welchen Zustand wir übergehen, wenn wir uns im Zustand $s$ befinden und die Aktion $x\in\Xcal_s$ durchführen.

Mithilfe dieser Notation können wir Gleichung $\eqref{eq:shortestpathbellman1}$ umschreiben als

$$
\begin{align}
V_t(s) = \min_{x\in\Xcal_s} \big(C(s,x) + V_{t+1}(S_{t+1})\big). \label{eq:shortestpathbellman2}
\end{align}
$$

wobei $S_{t+1} = S^M(s,x)$. Wir können Gleichung $\eqref{eq:shortestpathbellman2}$ ausführen, indem wir $V_T(s) = 0$ für einen ausreichend großen Wert von $T$ setzen (das heißt, die größte Anzahl von Verbindungen, die wir möglicherweise in einem Pfad durchlaufen). Da wir $T$ möglicherweise zu groß gesetzt haben, müssen wir der Menge der Auswahlmöglichkeiten in $\Xcal_s$ die Möglichkeit hinzufügen, zum Zeitpunkt $T$ am Zielknoten zu bleiben. Wir setzen dann $t=T-1$ und führen $\eqref{eq:shortestpathbellman2}$ für alle Zustände $s$ aus. Wir wiederholen dies, bis wir $t=0$ erreichen. Wenn wir das System auf diese Weise ausführen, ist der Zeitindex $t$ tatsächlich ein Zähler dafür, wie viele Verbindungen wir durchlaufen haben.

Gleichung $\eqref{eq:shortestpathbellman2}$ ist eine deterministische Version der als Bellman-Gleichung bekannten Beziehung. Im weiteren Verlauf dieses Kapitels werden wir zeigen, wie man die Bellman-Gleichung verwenden kann, um mit Unsicherheit in unserem Kürzeste-Wege-Problem umzugehen.

### Zustandsvariablen

In diesem Grundproblem ist der Zustand $S_t=N_t$ der Knoten, an dem wir uns nach $t$ Verbindungsdurchläufen befinden. Es ist naheliegend, einfach zu sagen, der Reisende befinde sich am Knoten $N_t$, aber wie wir bei den Erweiterungen sehen, erzeugen geringfügige Änderungen eine reichhaltigere Zustandsvariable, und es ist wichtig, den wahren Zustand unseres Reisenden zu erkennen.

### Entscheidungsvariablen

Wir modellieren die Entscheidung als den Knoten $j$, zu dem wir uns bewegen, gegeben, dass wir uns am Knoten $i$ befinden. Es gibt eine große Community, die an Problemen arbeitet, die in diese Klasse fallen, bei denen die Entscheidung als Aktion $a$ dargestellt wird, wobei $a$ einen von mehreren diskreten Werten in der Menge $\Acal_s$ annimmt, wenn wir uns im Zustand $s$ befinden.

Eine praktische Möglichkeit, Entscheidungen darzustellen, besteht darin, Folgendes zu definieren

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i, \\ 0 & \text{otherwise.} \end{cases}
$$

Diese Notation wird sich als nützlich erweisen, wenn wir unsere Zielfunktion aufschreiben.

### Exogene Information

Nach dem Durchlaufen der Verbindung $(i,j)$ beobachten wir $\chat_{tij}$, die Kosten, die uns beim Durchlaufen von $i$ nach $j$ während des $t$-ten Durchlaufs entstehen (die wir erst nach dem Durchlaufen der Verbindung beobachten). Für den Moment werden wir annehmen, dass die neue Beobachtung $\chat_{tij}$ in einer sehr großen Datenbank gespeichert wird. Wir können diese dann verwenden, um die durchschnittlichen Kosten $\cbar_{ij}$ für das Durchlaufen der Verbindung $(i,j)$ zu schätzen (wir schließen den Index $t$ für $\cbar_{ij}$ aus, da dies die durchschnittlichen Kosten unabhängig davon sind, wann wir die Verbindung $(i,j)$ durchlaufen).

### Übergangsfunktion

Für unser grundlegendes Graphenproblem entwickelt sich der Zustand $N_t = i$, wenn wir die Entscheidung $x_{tij}=1$ treffen, zum Zustand $N_{t+1} = j$.

### Zielfunktion

Wir können unsere Kosten mit folgender Notation modellieren: $\chat_{tij}$ ist eine Zufallsvariable, die die Kosten für das Durchlaufen von Knoten $i$ zu Knoten $j$ angibt; $\cbar_{ij}$ ist eine Schätzung des Erwartungswerts von $\chat_{tij}$, berechnet durch Mittelung über unsere Datenbank vergangener Reisekosten; und $\sigmabar_{ij}$ ist unsere Schätzung der Standardabweichung von $\cbar_{ij}$, berechnet anhand historischer Daten.

Wir nehmen an, dass wir die Entscheidung, welche Verbindung wir aus einem Knoten $i$ durchlaufen, treffen müssen, bevor wir den tatsächlichen Wert der Zufallskosten $\chat_{tij}$ sehen. Das bedeutet, dass wir unsere Entscheidung anhand unserer besten Schätzung von $\chat_{tij}$ treffen müssen, welche $\cbar_{ij}$ wäre.

Wir könnten unsere Zielfunktion schreiben unter Verwendung von

$$
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T \sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \chat_{tij}x_{tij},
$$

aber diese Formulierung würde erfordern, dass wir die Realisierungen $\chat_{tij}$ kennen. Stattdessen werden wir den Erwartungswert verwenden, was uns ergibt

$$
\begin{align}
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T\sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \cbar_{ij}x_{tij}.  \label{shortestpathobjective1}
\end{align}
$$

Die optimale Lösung dieses Problems wäre, alle $x_{tij} = 0$ auf null zu setzen, was bedeutet, dass wir keinen Pfad erhalten. Aus diesem Grund müssen wir *Nebenbedingungen* der Form einführen

$$
\begin{align}
\sum_{j\in\Ncal^+_q} x_{tqj} &= 1,  \label{shortestpathobjective2}\\
\sum_{i\in\Ncal^-_r} x_{t-1,ir} &= 1, \label{shortestpathobjective3}\\
\sum_{i\in\Ncal^-_j} x_{t-1,ij} - \sum_{k\in\Ncal^+_j} x_{tjk} &= 0, \quad \text{for } j \ne q, r,  \label{shortestpathobjective4}\\
x_{tij} &\geq 0, \quad (i,j) \in \Lcal,\ 0 \leq t \leq T.  \label{shortestpathobjective5}
\end{align}
$$

Die Gleichungen $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$ stellen ein *lineares Programm* dar, und es gibt leistungsstarke Softwarepakete, die zur Lösung dieses Problems verwendet werden können, wenn es auf diese Weise formuliert wird. Es gibt jedoch spezialisierte Algorithmen (schlicht als "Kürzeste-Wege-Algorithmen" bekannt), die die Struktur des Problems ausnutzen, um außergewöhnlich schnelle Lösungen zu erzeugen.

Dieser Ansatz bietet jedoch keine Methode zum Umgang mit Unsicherheit. Im Folgenden beschreiben wir, wie man das stochastische Kürzeste-Wege-Problem mithilfe unserer Sprache zur Gestaltung von Politiken löst, was eine Grundlage für die Behandlung von Unsicherheit bilden wird.

## Modellierung von Unsicherheit

Für unser Grundmodell verwenden wir nur die Punktschätzungen $\cbar_{ij}$, von denen wir annehmen, dass sie lediglich ein Durchschnitt früherer Beobachtungen sind, die zum Beispiel anhand von Reisekostenschätzungen aus GPS-fähigen Smartphones erhoben wurden. Wenn Schätzungen auf Felddaten basieren, wird die Methode als *datengetrieben* bezeichnet, was bedeutet, dass wir kein Modell der Unsicherheit brauchen — wir müssen sie nur beobachten.

Sei zum Beispiel $\cbar_{ij}$ unsere aktuelle Schätzung der durchschnittlichen Reisekosten für die Verbindung $(i,j)$, und nehmen wir an, wir hätten gerade Kosten von $\chat_{tij}$ beobachtet. Wir könnten unsere Schätzung aktualisieren mit

$$
\cbar_{ij} \leftarrow (1-\alpha) \cbar_{ij} + \alpha \chat_{tij},
$$

wobei $\alpha$ ein Glättungsparameter ist (manchmal auch Lernrate oder Schrittweite genannt), der kleiner als 1 ist.

Wenn wir unsere Schätzungen auf diese Weise aktualisieren, bedeutet dies, dass sich der Vektor der geschätzten Reisezeiten $\cbar$ dynamisch verändert, obwohl wir Aktualisierungen möglicherweise nur einmal täglich durchführen, im Gegensatz zu innerhalb einer Fahrt. In unserem Modellierungsrahmen wird der Vektor der Kostenschätzungen $\cbar$ durch den Anfangszustand $S_0$ erfasst. Wenn wir $n$ den Tag der Fahrt indizieren lassen, würden wir $\cbar^n$ als die Kostenschätzungen unter Verwendung der Daten der ersten $n$ Tage definieren, die dann im Anfangszustand $S^n_0$ bei der Planung für Tag $n+1$ gehalten werden.

## Gestaltung von Politiken

Unsere "Politik" für dieses deterministische Problem ist eine Funktion, die den "Zustand" (das heißt, an welchem Knoten wir uns befinden) auf eine Aktion (welche Verbindung wir überqueren) abbildet. Wir können dieses Problem lösen, indem wir das durch die Gleichungen $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$ dargestellte lineare Programm optimieren, was uns den Vektor $x^\ast \_{ij}$ für alle Verbindungen $(i,j)$ liefert. Wir können uns dies als eine Funktion vorstellen, bei der wir angesichts des Zustands (Knoten $i$) eine Aktion wählen, nämlich die Verbindung $(i,j)$, für die $x_{ij} = 1$. Wir können diese Politik als Funktion $X^\pi(S_t)$ schreiben mithilfe von

$$
X^\pi(S_t=N_t=i) = j \quad \text{if } x_{ij} = 1.
$$

Alternativ können wir die Bellman-Gleichung lösen, wie wir es zunächst für unser deterministisches Kürzeste-Wege-Problem mithilfe von Gleichung $\eqref{eq:shortestpathbellman1}$ getan haben. Dies liefert uns einen Wert $v_i$, der die minimalen Reisekosten von jedem Knoten $i$ zum Zielknoten $r$ darstellt. Sobald diese Werte berechnet sind, können wir Entscheidungen mithilfe der folgenden Politik treffen

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\cbar_{ij} + v_j). \label{eq:shortestpathbellman3}
\end{align}
$$

Dies bedeutet, dass unser "stochastisches" Kürzeste-Wege-Problem genauso gelöst werden kann, wie wir unser deterministisches Problem gelöst haben. Unten in unseren Erweiterungen zeigen wir, dass sich die Situation mit einer kleinen Wendung dramatisch ändert.

## Politikbewertung

Eine Politikbewertung ist für dieses Problem nicht erforderlich, da die Politik optimal ist. Obwohl unsere Verbindungskosten stochastisch sind, beinhalten die optimalen Entscheidungen, solange wir nichts über die tatsächlichen Kosten erfahren, bis wir unsere Entscheidung getroffen haben, die Lösung eines deterministischen Kürzeste-Wege-Problems. Dies wird das letzte Mal in diesem Buch sein, dass wir ein Problem wie dieses sehen.

Unter den Erweiterungen werden wir Unsicherheit auf eine Weise einführen, die es uns erlaubt, eine leistungsstarke algorithmische Strategie namens *approximative dynamische Programmierung* (auch bekannt als *bestärkendes Lernen*) einzuführen.

## Erweiterung - Adaptive stochastische kürzeste Wege

Wir werden nun die Information ändern, die wir bei der Entscheidungsfindung nutzen können. In unserem ersten stochastischen Kürzeste-Wege-Problem sind wir davon ausgegangen, dass wir die nächste zu durchlaufende Verbindung wählen müssen, *bevor* wir die tatsächlichen Reisekosten über die Verbindung sehen. Nehmen wir nun an, dass wir unsere Entscheidung *nachdem* wir die Verbindungskosten beobachtet haben treffen, was bedeutet, dass wir unsere Entscheidung anhand der tatsächlichen Kosten $\chat_{ij}$ statt ihres Erwartungswerts (oder Durchschnitts) $\cbar_{ij}$ treffen. Dies wird in Abbildung 5.3 veranschaulicht, wo ein Reisender an Knoten 6 die tatsächlichen Kosten auf den Verbindungen aus Knoten 6 sehen kann (statt nur Kenntnis der Verteilungen zu haben).

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph2.jpg" alt="Netzwerk für ein stochastisches Kürzeste-Wege-Problem, bei dem Reisende die Verbindungskosten sehen können, bevor sie eine Entscheidung treffen." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 5.3.</span> Netzwerk für ein stochastisches Kürzeste-Wege-Problem, bei dem Reisende die Verbindungskosten sehen können, bevor sie eine Entscheidung treffen. Dieser Graph zeigt einen Reisenden, der den Pfad 1-3-6 durchlaufen hat und nun die Kosten auf den Verbindungen aus Knoten 6 sieht.</figcaption>
</figure>

Wenn wir für einen Moment annehmen, dass uns jemand die Werte $v_j$ geben kann, welche die minimalen Reisekosten von Knoten $j$ zu unserem Zielknoten $r$ darstellen, würde eine optimale Politik zur Wahl des nächsten nachgelagerten Knotens geschrieben als

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\chat_{ij} + v_j). \label{eq:shortestpathbellman4}
\end{align}
$$

Das Problem hierbei ist, dass wir $v_j$ nicht wie zuvor mit Gleichung $\eqref{eq:shortestpathbellman1}$ berechnen können. Tatsächlich erfordert der Wechsel dahin, die Kosten zu sehen, bevor wir eine Entscheidung treffen, eine grundlegende Änderung unseres Basismodells.

In unserem deterministischen Modell oder statischen stochastischen Modell war die Zustandsvariable $S_t$ nach "$t$" Übergängen der Knoten $i$, an dem sich der Reisende befand. Dies war die einzige Information, die wir zu diesem Zeitpunkt benötigten.

In unserem neuen stochastischen Modell reicht es nicht mehr aus, nur den Knoten zu erfassen, an dem sich unser Reisender befindet. Erinnern Sie sich, dass wir oben eine Zustandsvariable als "alle Information, die wir zum Zeitpunkt $t$ aus der Historie benötigen, um das System ab dem Zeitpunkt $t$ zu modellieren" eingeführt haben. Später, in [Kapitel 7](/sdam/de/chapter-7/), werden wir eine präzisere Definition liefern, aber für den Moment wird dies unseren Zwecken dienen.

Unser neues stochastisches Kürzeste-Wege-Problem führt neue Information ein, die zur Entscheidungsfindung benötigt wird: die Kosten aus dem Knoten, an dem wir uns befinden. Wir werden es zweckmäßig finden, zwei Arten von Zustandsvariablen einzuführen: $N_t$, den physischen Zustand des Systems, der üblicherweise direkt durch Entscheidungen kontrolliert wird, und $I_t$, andere Information, die wir zur Entscheidungsfindung benötigen. In unserem Netzwerkproblem wäre unser physischer Zustand der Knoten, an dem wir uns befinden, während die "andere Information"-Variable $I_t$ die Kosten auf Verbindungen aus dem Knoten, an dem wir uns befinden, erfassen würde, die wir schreiben als

$$
I_t = (\chat_{tij}), i=N_t, j\in\Ncal^+_i.
$$

Nehmen wir an, dass zum Zeitpunkt $t$ gilt $N_t = i$. Wir werden die Zeit $t$ zu unserem Index für Verbindungskosten hinzufügen, was bedeutet, dass wir $\chat_{ij}$ durch $\chat_{tij}$ ersetzen werden, um die Kosten zu bezeichnen, wenn wir zum Zeitpunkt $t$ von $i$ nach $j$ gehen. Wir könnten dann schreiben

$$
S_t = (N_t, I_t) = \big(i, (\chat_{tij})_{j\in\Ncal^+_i}\big).
$$

Um zu sehen, was dies mit unserer vorherigen Art, unser Kürzeste-Wege-Problem zu lösen, macht, betrachten wir noch einmal die Bellman-Gleichung, wie wir sie erstmals in Gleichung $\eqref{eq:shortestpathbellman2}$ eingeführt haben, welche zu

$$
\begin{align}
V_t(S_t) = \min_{x_t\in\Xcal_s} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big), \label{eq:shortestpathbellman5}
\end{align}
$$

wird, wobei $S_{t+1}$ durch $S_{t+1} = (N_{t+1}, I_{t+1})$ gegeben wäre, wobei $N_{t+1}$ der Knoten ist, der durch unsere Entscheidung $x$ erzeugt wird, sodass wenn $x_{ij} =1$, dann $N_{t+1} = j$; und $I_{t+1}$ die Kosten sind, die aus Knoten $N_{t+1}$ beobachtet werden, die von der Entscheidung $x_t$ abhängen. Wenn $x_t$ uns zum Knoten $j$ schickt, sodass $N_{t+1} = j$, dann ist $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$ (unter der Annahme, dass es drei Verbindungen aus Knoten $j$ gibt).

Nehmen wir an, dass $N_t = i$. Die Kostenfunktion $C(S_t,x)$ ist gegeben durch

$$
C(S_t,x) = \sum_{j\in\Ncal^+_i} \chat_{tij}x_{ij}.
$$

Erinnern Sie sich, dass $S_t$ (wobei $N_t = i$) die Kosten $\chat_{tij}$ für die Verbindungen $(i,j)$ aus $i$ enthält, sodass diese bekannt sind (und in $S_t$ enthalten sind).

Gleichung $\eqref{eq:shortestpathbellman5}$ ist einfach zu schreiben, aber schwer zu lösen, nun da unsere Zustandsvariable ein Vektor ist (was die Anzahl der Zustände explodieren lässt). Wir werden zunächst zwei rechnerische Herausforderungen beschreiben. Dann werden wir die Idee des Nachentscheidungszustands einführen, um eine der beiden Herausforderungen zu lösen. Schließlich werden wir eine kurze Einführung in eine Klasse von Methoden geben, die als approximative dynamische Programmierung bekannt sind (aber häufig auch bestärkendes Lernen genannt werden), um die zweite Herausforderung zu bewältigen.

### Rechnerische Herausforderungen

Wir beginnen damit, zwei rechnerische Herausforderungen zu identifizieren:

- Die Verbindungskosten $I_{t+1}$ aus dem nachgelagerten Knoten $N_{t+1}$ (der durch die Entscheidung $x$ bestimmt wird) sind nicht bekannt. Anders ausgedrückt, $I_{t+1}$ ist zum Zeitpunkt $t$ eine Zufallsvariable, was bedeutet, dass wir nicht einmal $V_{t+1}(S_{t+1})$ berechnen können. Wir beheben dies, indem wir den Erwartungswert bilden, den wir schreiben als

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big). \label{eq:shortestpathbellman6}
\end{align}
$$

  Der Erwartungswertoperator $\E$ sollte als Mittelung über die möglichen Verbindungskosten betrachtet werden, denen ein Reisender begegnen könnte, sobald er bei Knoten $N_{t+1}$ ankommt, wenn er die Entscheidung $x$ trifft (die $N_{t+1}$ bestimmt).

  Um dies expliziter zu formulieren, nehmen wir an, dass $x_t$ uns zum Knoten $j$ schickt (was bedeutet, dass $x_{tij} = 1$), und wenn wir dort ankommen, sehen wir $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$. Wir erfahren diese Kosten, wenn wir zum Zeitpunkt $t+1$ am Knoten $j$ ankommen, aber sie sind zufällig, wenn wir uns zum Zeitpunkt $t$ am Knoten $i$ befinden und überlegen, was zu tun ist.
- Der Zustandsraum – Selbst wenn wir annehmen, dass die Kosten $\chat_{t+1,j}$ diskret sind, ist der Zustandsraum drastisch gewachsen. Stellen wir uns vor, dass wir die Kosten in Blöcke von 20 Werten diskretisiert haben. Wenn es drei Verbindungen aus jedem Knoten gibt, ist unser Zustandsraum von der Anzahl der Knoten auf einen Zustandsraum gewachsen, der $20 \times 20 \times 20 = 8,000$ mal größer ist.

Um die Herausforderung der Berechnung des Erwartungswerts zu veranschaulichen, nehmen wir an, dass jede Kostengröße $\chat_{t+1,jk}$ die Werte $c_1, c_2, \ldots, c_L$ mit Wahrscheinlichkeiten $p_{jk}(c_{\ell})$ annehmen kann. Zum Beispiel könnte $c_1$ 1 Minute betragen, $c_2$ könnte 2 Minuten betragen, und so weiter. Die Wahrscheinlichkeit $p_{jk}(c_{\ell})$ ist die Wahrscheinlichkeit, dass $\chat_{t+1,jk} = c_\ell$.

Nehmen wir nun an, dass die Entscheidung $x$ uns zum Knoten $j$ bringt, wonach wir vor der Wahl stehen, über Verbindungen $(j,k_1), (j,k_2)$ oder $(j,k_3)$ zu reisen. Wir würden unseren Erwartungswert berechnen mit

$$
\begin{align}
\E \{V_{t+1}(S_{t+1})\vert S_t,x\} &= \sum_{\ell_1=1}^L p_{jk_1}(c_{\ell_1}) \sum_{\ell_2=1}^L p_{jk_2}(c_{\ell_2}) \sum_{\ell_3=1}^L p_{jk_3}(c_{\ell_3}) \nonumber \\
          & \quad \times V_{t+1}(S_{t+1} = (j, (c_{\ell_1},c_{\ell_2},c_{\ell_3}))). \label{eq:shortestpathexpectation}
\end{align}
$$

Um es unverblümt zu sagen: Gleichung $\eqref{eq:shortestpathexpectation}$ ist ziemlich unschön. Diese dreifachen Summationen werden schwer zu berechnen sein.

Das Problem wird durch die Größe des Zustandsraums verschärft. Um die Bellman-Gleichung in Gleichung $\eqref{eq:shortestpathbellman6}$ (oder $\eqref{eq:shortestpathbellman2}$) zu verwenden, müssen wir $V_t(S_t)$ für jeden möglichen Zustand $S_t$ berechnen. Als der Zustand nur ein Knoten war, war das nicht allzu schlimm, selbst wenn es Tausende (sogar Zehntausende) von Knoten gibt. Das Hinzufügen der Informationsvariable $I_t$ zum Zustand macht das Problem jedoch dramatisch schwieriger.

Um zu sehen, wie schnell dies den Zustandsraum wachsen lässt, stellen wir uns vor, dass es 20 mögliche Werte für jede Kostenvariable $\chat_{tij}$ gibt. Das bedeutet, es gibt 8.000 mögliche Werte von $I_t$. Wenn unser Netzwerk 10.000 Knoten hat (das heißt, $N_t$ kann 10.000 Werte annehmen), dann kann $S_t$ nun $10,000 \times 8,000 = 80,000,000$ Werte annehmen.

Dies ist unser erster Einblick in das, was passiert, wenn eine Zustandsvariable zu einem Vektor wird. Die Anzahl der möglichen Werte der Zustandsvariable wächst exponentiell, ein Prozess, der allgemein als *Fluch der Dimensionalität* bekannt ist.

### Verwendung des Nachentscheidungszustands

Für dieses Problem ist noch nicht alles verloren. Es gibt einen Trick, den wir nutzen können, um den Fluch der Dimensionalität für dieses spezielle Problem zu überwinden. Die wichtigste rechnerische Herausforderung bei der Bellman-Gleichung in Gleichung $\eqref{eq:shortestpathbellman6}$ ist der Erwartungswertoperator, der leicht die gefährlichste Notation beim Lösen sequentieller Entscheidungsprobleme ist.

Wir werden zwei leistungsstarke Strategien verwenden, um dieses Problem in diesem Kontext zu überwinden (und wir werden diese Strategien auch für andere Kontexte verwenden). Zunächst führen wir die Idee des *Nachentscheidungszustands* ein, den wir mit $S^x_t$ bezeichnen. Der Nachentscheidungszustand ist der Zustand des Systems unmittelbar *nachdem* wir eine Entscheidung getroffen haben, und bevor neue Information eintrifft, weshalb wir ihn mit $t$ indizieren.

Um Vor- und Nachentscheidungszustände zu sehen, kehren wir zu Abbildung 5.3 zurück. Wie wir zuvor gesehen haben, ist unser Vorentscheidungszustand (den wir "den Zustand" nennen) $S_t$

$$
S_t = (6, (12.7, 8.9, 13.5)).
$$

Sobald wir eine Entscheidung getroffen haben, befinden wir uns immer noch an Knoten 6, aber stellen wir uns vor, dass die von uns getroffene Entscheidung war, zu Knoten 9 zu gehen. Wir könnten unseren physischen Nachentscheidungszustand $R^x_t = 9$ beschreiben, was wir alternativ als "nach Knoten 9 gehen" formulieren könnten. Wir benötigen jedoch nicht mehr jene lästigen Beobachtungen der Kosten auf den Verbindungen aus Knoten 6, die durch $(\chat_{t+1,6,5}, \chat_{t+1,6,9}, \chat_{t+1,5,7}) = (12.7, 8.9, 13.5)$ gegeben sind. Das bedeutet, dass unser Nachentscheidungszustand

$$
S^x_t = (9).
$$

ist. Mithilfe des Nachentscheidungszustands werden wir die Bellman-Gleichung in zwei Schritte aufteilen. Statt von $S_t$ zu $S_{t+1}$ zu $S_{t+2}$ zu gehen, wie wir es in der Bellman-Gleichung $\eqref{eq:shortestpathbellman6}$ tun, werden wir zunächst vom Vorentscheidungszustand $S_t$ zum Nachentscheidungszustand $S^x_t$ übergehen, was wir tun, indem wir Gleichung $\eqref{eq:shortestpathbellman6}$ umschreiben als

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V^x_t(S^x_t) \big), \label{eq:shortestpathbellman6a}
\end{align}
$$

wobei $V^x_t$ der Wert des Befindens im Nachentscheidungszustand $S^x_t$ ist. Man beachte, dass wir den Erwartungswert nicht mehr haben, da der Nachentscheidungszustand konstruktionsbedingt eine gegebene Entscheidung $x_t$ (z. B. "gehe zu Knoten 9") beinhaltet, aber keine neue Information (die den zufälligen Teil darstellt). Man beachte, dass in diesem Fall der Nachentscheidungszustand $S^x_t$ nur aus dem Knoten besteht, was bedeutet, dass er viel einfacher ist als $S_t$.

Wir sind noch nicht aus dem Schneider. Wir müssen immer noch $V^x_t(S^x_t)$ berechnen, was mithilfe von

$$
\begin{align}
V^x_t(S^x_t) = \E \{V_{t+1}(S_{t+1})\vert S_t,x\}. \label{eq:shortestpathbellman6b}
\end{align}
$$

erfolgt. Wir müssen also immer noch diesen Erwartungswert berechnen, und es ist nicht einfacher geworden. Nehmen wir an, dass unsere Entscheidung $x$ darin besteht, zu Knoten $j$ zu gehen (was bedeutet, dass $x_{ij}=1$), und $\chat_{t+1,j} = (\chat_{t+1,jk},~k\in\Ncal^+\_j)$ sei die Menge der Verbindungskosten aus Knoten $j$. Unser nächster Vorentscheidungszustand $S_{t+1}$ wäre dann

$$
S_{t+1} = (j, \chat_{t+1,j}).
$$

Nehmen wir nun an, dass wir eine Möglichkeit haben, mögliche Werte von $\chat_{t+1,j}$ zu sampeln. Wir könnten dies anhand einer Datenbank historischer Beobachtungen von Verbindungskosten tun, oder wir könnten aus vergangenen Daten eine Wahrscheinlichkeitsverteilung erstellen und daraus sampeln. Nehmen wir an, wir werden dies iterativ tun, und $\chat^n_{t+1,ij}$ sei die $n$-te Stichprobe der Verbindungskosten von $i$ nach $j$. Wir können diese stichprobenbasierte Strategie verwenden, um eine Schätzung des Erwartungswerts zu erstellen, statt des exakten Wertes. Dies wird im nächsten Abschnitt behandelt.

### Approximative dynamische Programmierung

Die Verwendung von Nachentscheidungs-Zustandsvariablen löst das Problem der Berechnung des Erwartungswerts bei der Suche nach der besten Entscheidung $x_t$, aber wir haben immer noch das Problem, mit dem großen Zustandsraum umzugehen. Hierfür wenden wir uns den Methoden zu, die allgemein als *approximative dynamische Programmierung* bekannt sind, wobei wir die Nachentscheidungs-Wertfunktion $V^x_t(S^x_t)$ durch eine Approximation ersetzen.

Wir werden Approximationen $\Vbar^x_t(j)$ des Werts des Befindens am Knoten $j$ konstruieren, wobei

$$
\Vbar^{x,n}_t(S^x_t = j) \approx \E \{V_{t+1}(S_{t+1})\vert S^x_t\}.
$$

$\Vbar^{x,n}\_t(j)$ sei unsere Approximation von $\E \lbrace V_{t+1}(S_{t+1})\vert S^x_t\rbrace $ nach Beobachtung von $n$ Stichproben. Eine Möglichkeit, diese Approximation aufzubauen, besteht darin, Stichproben des Werts des Befindens am Knoten $j$ zu verwenden. Stellen wir uns vor, wir gehen vorwärts durch das Netzwerk und treffen Entscheidungen anhand von Approximationen $\Vbar^{x,n-1}\_t(S^x_t)$, die aus vorherigen Iterationen gewonnen wurden, zusammen mit gesampelten Kosten $\chat^n_{tij}$. Wir können eine gesampelte Schätzung des Werts des Befindens im Zustand $S_t$ erhalten mit

$$
\begin{align}
\vhat^{x,n}_t(i) = \min_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(S^x_t = j)\big). \label{eq:vhatsinglepass}
\end{align}
$$

Wir werden dann $\vhat^{x,n}\_t(i)$, welches der Wert des Befindens im Zustand $S_t$ ist (der sowohl den Knoten $i$ als auch die Kosten $\chat^n_{tij}$ für alle $j$ aus Knoten $i$ einschließt), verwenden, um den vorherigen Nachentscheidungszustand $S^x_{t-1}$ zu aktualisieren, was wir mit

$$
\begin{align}
\Vbar^{x,n}_{t-1}(i) = (1-\alpha_n) \Vbar^{x,n-1}_{t-1}(i) + \alpha_n \vhat^{x,n}_t(i). \label{eq:vhatsmoothing}
\end{align}
$$

tun. Hier ist $\alpha_n$ als Glättungsfaktor oder Lernrate bekannt, wird aber aus technischen Gründen auch als "Schrittweite" bezeichnet. Wir könnten eine Konstante wie $\alpha_n = .1$ oder $.05$ verwenden, aber eine gängige Strategie ist die Verwendung einer abnehmenden Formel wie

$$
\alpha_n = \frac{\theta^\alpha}{\theta^\alpha + n - 1},
$$

wobei $\theta^\alpha$ ein einstellbarer Parameter ist. Wenn wir zum Beispiel $\theta^\alpha = 1$ setzen, erhalten wir $\alpha_n = 1/n$. In diesem Fall lässt sich verifizieren, dass Gleichung $\eqref{eq:vhatsmoothing}$ über die Werte $\vhat^n_t(i)$ mittelt. In der Praxis wird diese Formel für dieses Problem wahrscheinlich nicht gut funktionieren, da die Schrittweite zu schnell gegen null geht.

Wir halten kurz inne, um zwei Vorteile der Verwendung des Nachentscheidungszustands $S^x_t$ festzuhalten:

- Wir müssen uns bei der Optimierung über die Wahl der Ausgangsverbindungen von einem Knoten nicht mehr mit dem Erwartungswert befassen (siehe Gleichung $\eqref{eq:vhatsinglepass}$).
- Die Approximation der Wertfunktion $\Vbar^{x,n}\_t(S^x_t = i)$ ist viel einfacher, da der Nachentscheidungszustand $S^x_t$ nun nur noch ein Skalar ist, was viel leichter zu schätzen ist als eine höherdimensionale Funktion.

Eine Herausforderung bei Gleichung $\eqref{eq:vhatsinglepass}$ besteht darin, dass wir Anfangswerte für $\Vbar^{x,0}\_t(i)$ benötigen. Eine natürliche Wahl wäre es, die deterministische Version dieses Problems zu lösen, bei der die Kosten $\chat_{tij}$ gleich Schätzungen ihrer Mittelwerte gesetzt werden, und dann Anfangsschätzungen der Kosten zu erhalten, die anfallen, um von jedem Knoten zum Zielort zu gelangen.

Eine alternative Methode besteht darin, die Schätzungen $\Vbar^{x,n-1}(i)$ zu verwenden, um Entscheidungen mithilfe von

$$
\begin{align}
x^n_t(i) = \argmin_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(j)\big). \label{eq:stochasticpath}
\end{align}
$$

zu treffen. Die Entscheidung $i^n_t = x^n_t(i)$ liefert uns den nächsten Knoten nach Knoten $i$ basierend auf den abgetasteten Kosten $\chat^n_{tij}$ und den Schätzungen der Kosten $\Vbar^{x,n-1}\_t(j)$, um von Knoten $j$ zum Zielknoten $r$ zu gelangen. Wenn wir bei $r$ ankommen, haben wir einen gesamten Pfad, der aus den Knoten

$$
(q, i^n_1, i^n_2, \ldots, r).
$$

besteht. Wir haben außerdem die abgetasteten Kosten $\chat^n_{t,i^n_t,i^n_{t+1}}$ über den gesamten Pfad. Angenommen, es gibt $T$ Verbindungen im Pfad. Wir durchlaufen den Pfad dann rückwärts, beginnend mit $\vhat^n_T(r) = 0$, und berechnen

$$
\begin{align}
\vhat^n_t(i^n_t) = \chat^n_{t,i^n_t,i^n_{t+1}} + \vhat^n_{t+1}(i^n_{t+1}).  \label{eq:vhatdoublepass}
\end{align}
$$

Wir verwenden diese Schätzungen dann in unserem Glättungsprozess in Gleichung $\eqref{eq:vhatsmoothing}$.

Dieses Verfahren ist eine Form der *approximativen dynamischen Programmierung* (auch bekannt als *bestärkendes Lernen*). Genauer gesagt handelt es sich um eine Form der *vorwärtsgerichteten approximativen dynamischen Programmierung*, da sie voranschreitet, indem sie zeitlich vorwärts schreitet. Wir haben ein reines Vorwärtsdurchlauf-Verfahren mithilfe von Gleichung $\eqref{eq:vhatsinglepass}$ veranschaulicht, das einmalige Durchläufe durch das Netzwerk erfordert, sowie ein Doppel-Durchlauf-Verfahren mithilfe von Gleichung $\eqref{eq:vhatdoublepass}$, das zunächst vorwärts durch den Graphen schreitet, um Entscheidungen zu simulieren, und dann rückwärts, um den Wert des Aufenthalts in jedem Zustand zu aktualisieren.

Diese Methode ist sehr robust gegenüber komplexen Vor-Entscheidungszuständen. Zum Beispiel spielt es keine Rolle, wie viele Verbindungen von jedem Knoten ausgehen könnten, aber wir nutzen die Tatsache, dass unsere Nach-Entscheidungszustandsvariable recht einfach ist (in diesem Fall ist es lediglich der Knoten, an dem wir uns befinden).

## Was haben wir gelernt?

- Dies ist das erste (und einzige) Mal, dass wir ein Problem haben, bei dem wir die optimale Politik für ein sequentielles Entscheidungsproblem finden können. Obwohl wir über einem stochastischen Netzwerk optimieren, erhält der Reisende keine Vorabinformation über eine Verbindung, bevor er diese durchläuft, was bedeutet, dass er seine Wahl auf Basis erwarteter Kosten treffen muss.
- Da sich das Basismodell auf ein deterministisches Shortest-Path-Problem reduziert, können wir es optimal lösen, was ein seltenes Beispiel dafür ist, das Basisproblem optimal lösen zu können (tatsächlich ist dies das einzige Mal, dass dies in diesem Buch geschieht).
- Wir führen dann die Dimension ein, dass Kosten offenbart werden, bevor der Reisende die Verbindung durchläuft. Wir formulieren das Problem neu und zeigen, dass die Zustandsvariable nun deutlich komplexer wird und aus dem Knoten, an dem sich der Reisende befindet, und den Kosten der vom Knoten ausgehenden Verbindungen besteht. Dieses Problem kann mit dynamischer Programmierung nicht mehr exakt gelöst werden.
- Wir führen einen approximativen dynamischen Programmierungsalgorithmus ein und beschreiben ihn, der das Konzept einer Nach-Entscheidungszustandsvariable verwendet, die den in der Bellman-Gleichung eingebetteten Erwartungswert eliminiert und den Zustandsraum wieder auf die bloße Menge der Knoten reduziert.
- Dies ist ein Beispiel für eine VFA-Politik. Da wir die Wertfunktionen nicht exakt berechnen können, können wir nicht garantieren, dass es sich um eine optimale Politik handelt.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Erklären Sie im ursprünglichen stochastischen Shortest-Path-Problem, bei dem wir die tatsächlichen Kosten erst beobachten, nachdem wir die Verbindung durchlaufen haben, warum dies exakt als einfaches deterministisches Shortest-Path-Problem gelöst werden kann.</li>
<li>Geben Sie für die Version, bei der wir die tatsächlichen Kosten über eine Verbindung beobachten, bevor wir wählen, in welche Richtung wir uns bewegen, die Vor-Entscheidungs- und Nach-Entscheidungszustandsvariablen an.</li>
<li>In Gleichung $\eqref{eq:vhatsmoothing}$ verwenden wir den abgetasteten Wert $\vhat^{x,n}_t(i)$ des Aufenthalts im Zustand $S_t$, um den geschätzten Wert des Aufenthalts im vorherigen Nach-Entscheidungszustand, gegeben durch $\Vbar^{x,n}_{t-1}(i)$, zu aktualisieren. Erstellen Sie ein kleines numerisches Beispiel, um diese Gleichung zu veranschaulichen.</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Ein Reisender muss den in Abbildung 5.4 gezeigten Graphen von Knoten 1 nach Knoten 11 durchlaufen. Es gibt eine Wahrscheinlichkeit, dass jede Verbindung durchlaufen werden kann, die im Graphen dargestellt ist (diese Wahrscheinlichkeiten sind im Voraus bekannt). Wenn der Reisende an Knoten $i$ ankommt, sieht er, welche Verbindungen (falls vorhanden) von Knoten $i$ aus durchlaufen werden können. Wenn keine Verbindungen durchlaufen werden können, endet die Reise mit einem Fehlschlag. Das Ziel ist es, einen Pfad zu wählen, der das Produkt dieser Wahrscheinlichkeiten maximiert, wobei sie jedoch darauf beschränkt ist, über verfügbare Verbindungen zu reisen.
  <ol type="a">
    <li>Beschreiben Sie eine geeignete Zustandsvariable für dieses Problem (mit Notation).</li>
    <li>Stellen Sie sich vor, der Reisende befindet sich an Knoten 6, nachdem er dem Pfad 1-2-6 gefolgt ist, und sieht dann, dass die Verbindungen 6-9 und 6-10 verfügbar sind (aber 6-8 nicht verfügbar ist); was ist ihr (Vor-Entscheidungs-)Zustand? Ich suche nach den numerischen Werten der Zustandsvariablen, die Sie in Teil (a) angegeben haben.</li>
    <li>Angenommen, der Reisende kann sich zu Knoten 9 bewegen und entscheidet sich dafür, dies zu tun. Was ist der Nach-Entscheidungszustand nach dieser Entscheidung?</li>
    <li>Schreiben Sie die Bellman-Gleichung auf, die den Wert des Aufenthalts im Vor-Entscheidungszustand nach Durchlaufen des Pfades 1-2-6 in Bezug auf die nachgeordneten Vor-Entscheidungszustände charakterisiert. Berechnen Sie numerisch den Wert des Aufenthalts im Zustand nach Durchlaufen von 1-2-6 und der Beobachtung, dass 6-9 und 6-10 verfügbar sind (aber 6-8 nicht).</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariableminproductprobability.jpg" alt="Ein Shortest-Path-Problem zur Maximierung der Wahrscheinlichkeit, einen Pfad zu vervollständigen." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 5.4.</span> Ein Shortest-Path-Problem zur Maximierung der Wahrscheinlichkeit, einen Pfad zu vervollständigen.</figcaption>
</figure>
</li>
<li>(Diese Frage bezieht sich auf die oben beschriebene adaptive stochastische Shortest-Path-Erweiterung.) Schreiben Sie die Schritte auf, die bei der Anpassung einer Wertfunktionsapproximation für die Nach-Entscheidungszustände erforderlich sind, indem Sie Folgendes beantworten:
  <ol type="a">
    <li>Schreiben Sie die Vor- und Nach-Entscheidungszustände auf. Wenn das Netzwerk $N$ Knoten hat und die Kosten auf jeder Verbindung in 20 Werte diskretisiert werden (nehmen Sie höchstens $L$ Verbindungen von einem beliebigen Knoten an), wie groß ist der Vor- und Nach-Entscheidungszustandsraum?</li>
    <li>Geben Sie die Gleichung zur Berechnung von $\vhat^n_t(i)$ an. Handelt es sich hierbei um die Schätzung des Aufenthalts in einem Vor-Entscheidungszustand oder in einem Nach-Entscheidungszustand? Erklären Sie.</li>
    <li>Worauf bezieht sich der "Zeit"-Index $t$?</li>
    <li>Geben Sie die Aktualisierungsgleichung zur Aktualisierung des Wertes des Aufenthalts in einem Nach-Entscheidungszustand an.</li>
    <li>Warum benötigen wir den Wert des Aufenthalts in einem Nach-Entscheidungszustand und nicht in einem Vor-Entscheidungszustand?</li>
  </ol>
</li>
<li>Abbildung 5.5 veranschaulicht die Wahlmöglichkeiten, denen sich eine Uber-Fahrerin gegenübersehen könnte. An Knoten 1 hat sie die Wahl zwischen den Fahrten (2-4) und (3-5). Nehmen Sie an, dass Fahrten mindestens 15 Minuten dauern und Fahrten innerhalb von 10 Minuten bedient werden sollen, sonst gehen sie verloren. Das bedeutet, dass die Fahrten von den Knoten 6, 7 und 8 erst bekannt werden, nachdem die Fahrten (2-4) und (3-5) abgeschlossen worden wären.

<figure class="book-figure">
  <img src="/assets/images/sdam/uber_driver.jpg" alt="Ein Entscheidungsbaum, der die Wahlmöglichkeiten veranschaulicht, denen sich eine Uber-Fahrerin gegenübersieht." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 5.5.</span> Ein Entscheidungsbaum, der die Wahlmöglichkeiten veranschaulicht, denen sich eine Uber-Fahrerin gegenübersieht.</figcaption>
</figure>

Angenommen, unsere Fahrerin wählt zunächst (3-5) und dann (7-10). Nach Abschluss von (7-10) muss sie sich zu einer Ladestation bewegen, um ihre Batterie aufzuladen, bevor sie nach Hause zurückkehrt (nehmen Sie an, dass sie die kostengünstigste Ladestation wählt).

Neben jeder Bewegung steht, wie viel sie verdient (bezeichnen Sie dies mit $c_{ij}$), was positiv ist, wenn sie einen Kunden bedient, und negativ, wenn sie leer fährt. Natürlich versucht sie, die Gewinne über ihre gesamte Schicht zu maximieren.

Der Zustand unserer Fahrerin ist ihr Standort (Knotennummer) oder die Knotennummer, zu der sie sich begibt, zusammen mit allen anderen zu diesem Zeitpunkt verfügbaren Informationen, die für ihre Entscheidung relevant sind.
  <ol type="a">
    <li>Angenommen, sie befindet sich anfangs an Knoten 1, was ist ihr (Vor-Entscheidungs-)Zustand? Was ist ihr Nach-Entscheidungszustand, nachdem sie sich entschieden hat, die Fahrt (3-5) anzunehmen?</li>
    <li>Sei $s_1$ der (Vor-Entscheidungs-)Zustand nach Bedienung der Fahrt (3-5). Sei $\vhat_1(s_1)$ der Wert des Aufenthalts im Zustand $s_1$. Was ist $\vhat_1(s_1)$?</li>
    <li>Sei $s^x_0$ der vorherige Nach-Entscheidungszustand vor $s_1$, und sei $\vhat^x_0(s^x_0)$ der Wert des Aufenthalts in $s^x_0$. Was ist $\vhat^x_0(s^x_0)$?</li>
    <li>Was ist der rechnerische Vorteil der Verwendung von Nach-Entscheidungszuständen gegenüber Vor-Entscheidungszuständen im Hinblick auf die Berechnung einer Politik? Dies sollte eine Ein-Satz-Antwort sein.</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *StochasticShortestPath_Static* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>(Diese Frage bezieht sich auf die oben beschriebene adaptive stochastische Shortest-Path-Erweiterung.) Derzeit hat der Algorithmus einen festen Glättungsfaktor zur Schätzung der Wertfunktionsapproximationen bei der Lösung des modifizierten Problems in der Erweiterung. Implementieren Sie eine abnehmende Schrittweite wie folgt:

$$
\alpha_n = \frac{\theta^{step}}{\theta^{step} + n-1}.
$$

Führen Sie das Python-Modul für $\theta^{step} = (1, 5, 10, 20, 50)$ über 100 Iterationen aus und vergleichen Sie die Leistung sowohl hinsichtlich der Konvergenzgeschwindigkeit als auch der endgültigen Lösung. Welche würden Sie wählen?</li>
</ol>
{% endraw %}
