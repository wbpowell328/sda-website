---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 7: Anwendungen, erneut betrachtet"
permalink: /sdam/de/chapter-7/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 80dcb065dd6e7cae
---


{% raw %}
Nachdem wir nun eine Reihe von Problemstellungen betrachtet haben, werden wir innehalten und diese Anwendungen nutzen, um einige der Modellierungsfragen, die wir in [Kapitel 1](/sdam/de/chapter-1/) angesprochen haben, vertiefter zu veranschaulichen.

Ausgehend von den Bestandsproblemen in Kapitel 1 haben wir nun sechs Klassen sequentieller Entscheidungsprobleme behandelt. Für jedes Problem haben wir ein oder zwei Strategien zur Entscheidungsfindung veranschaulicht:

- **Kapitel 1)** Bestandsprobleme – Wir haben sequentielle Entscheidungsprobleme anhand von Varianten eines einfachen Bestandsproblems eingeführt. Zu den Politiken gehörten Order-up-to sowie eine Politik, die auf angepassten Prognosen basiert.
- **Kapitel 2)** Den Verkauf eines Vermögenswerts – Wir mussten entscheiden, wann ein Finanzvermögenswert verkauft werden soll. Zu den Politiken gehörten Varianten von Buy-low, Sell-high.
- **Kapitel 3)** Adaptive Marktplanung – Dieses Problem verwendete eine ableitungsbasierte stochastische Suche, bei der das sequentielle Entscheidungsproblem darin bestand, eine Schrittweite zu wählen, was wir anhand einfacher parametrischer Funktionen veranschaulicht haben.
- **Kapitel 4)** Das Erlernen der besten Diabetesbehandlung – Dies ist ein klassisches aktives Lernproblem, bekannt als Multiarmed-Bandit-Problem. Wir entwarfen Politiken, die auf parametrisierten Optimierungsproblemen basieren.
- **Kapitel 5)** Statische stochastische kürzeste Wege – Wir fanden eine optimale Lösung einer bestimmten Version eines stochastischen Kürzeste-Wege-Problems mithilfe einer klassischen Rekursion der dynamischen Programmierung, die wir exakt lösen konnten, und führten dann eine komplexere stochastische Version ein, die wir mithilfe approximativer dynamischer Programmierung lösten, wobei wir eine Post-Decision-Zustandsvariable ausnutzten.
- **Kapitel 6)** Dynamische stochastische kürzeste Wege – Hier wechseln wir zu einem dynamischen Kürzeste-Wege-Problem, bei dem sich die Schätzungen der erwarteten Wegkosten im Laufe der Zeit ändern (im statischen Fall in Kapitel 5 änderten sich unsere Schätzungen der erwarteten Kosten nicht). Wir nutzten dies, um eine grundlegende deterministische Lookahead-Politik sowie eine parametrisierte Lookahead-Politik zu veranschaulichen.

Zuvor haben wir vier Klassen von Politiken eingeführt. In den bisher betrachteten Anwendungen haben wir Veranschaulichungen jeder der vier Klassen gesehen. In diesem Kapitel werden wir die vier Klassen vertiefter betrachten und dann zu unserer Reihe von Anwendungen zurückkehren, um für jede der vorgeschlagenen Politiken die entsprechende Klasse zu identifizieren.

## Die vier Klassen von Politiken

Zunächst stellen wir fest, dass sich die vier Klassen von Politiken in zwei Kategorien einteilen lassen: die Klasse der Politik-Suche und die Klasse der Lookahead-Ansätze. Jede dieser Kategorien lässt sich wiederum in zwei Klassen unterteilen, wodurch sich die vier Klassen von Politiken ergeben. Diese werden im Folgenden genauer beschrieben.

### Politik-Suche

Die Klasse der "Politik-Suche"-Politiken beinhaltet die Suche über eine Menge von Funktionen zur Entscheidungsfindung, um diejenige Funktion zu finden, die im Durchschnitt am besten funktioniert, unter Verwendung des jeweils für das Problem geeigneten Ziels. Meistens bedeutet dies die Suche nach dem besten Wert eines Satzes von Parametern, die eine parametrisierte Politik charakterisieren, aber es kann auch bedeuten, dass wir verschiedene Parametrisierungen bewerten müssen.

Politik-Suche-Politiken lassen sich in zwei Klassen unterteilen:

- **Politik-Funktionsapproximationen (PFAs)** – Dies sind analytische Funktionen, die einen Zustand direkt auf eine Aktion abbilden. Einige Beispiele sind:
    - Eine parametrisierte Funktion wie die "High-Low"-Politik aus [Kapitel 2](/sdam/de/chapter-2/), die wir hier wiederholen

    $$
    X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
    $$

    wobei $\theta^{sell-low} = (\theta^{low},\theta^{high})$. Weitere Beispiele sind die Order-up-to-Politik, die wir in [Kapitel 1](/sdam/de/chapter-1/) gesehen haben, sowie die Politik der angepassten Prognose.
    - Eine lineare Funktion, wie

    $$
    X^\pi(S_t\vert \theta) = \theta_0 + \theta_1 \phi_1(S_t) + \theta_1 \phi_1(S_t) + \ldots + \theta_F \phi_F(S_t)
    $$

    wobei $(\phi_f(S_t)),~f=1, \ldots, F$ ein Satz von Merkmalen ist ("linear" bedeutet linear im Parametervektor $\theta$ – die Merkmale $\phi_f(S_t)$ können in $S_t$ stark nichtlinear sein). Wir könnten zum Beispiel versuchen zu entscheiden, wie viel wir bieten sollten, um einen Film auf einer Website beworben zu bekommen, und ein Merkmal könnte das Genre des Films oder der Name des Hauptdarstellers bzw. der Hauptdarstellerin sein.

    Lineare Funktionen (auch bekannt als "affine Politiken") sind beliebt, aber man beachte, dass man eine lineare Funktion nicht verwenden könnte, um Stufenfunktionen wie die oben veranschaulichten Buy-low-Sell-high- oder Order-up-to-Politiken zu approximieren.
    - Fortgeschrittene Funktionen wie lokal lineare Funktionen oder neuronale Netze, wobei diese in der Regel eine große Anzahl von Parametern (die Gewichte in einem neuronalen Netz) aufweisen, die abgestimmt werden müssen.
- **Kostenfunktionsapproximationen (CFAs)** – Dies sind Politiken, die die Lösung eines parametrisierten Optimierungsproblems erfordern, bei dem wir entweder die Zielfunktion oder die Nebenbedingungen parametrisieren können. CFAs öffnen die Tür zur Lösung hochdimensionaler Entscheidungsprobleme. Einige Beispiele sind:
    - Ein einfaches Beispiel für eine parametrisierte Kostenfunktionsapproximation ist die Interval-Estimation-Politik, die wir in [Kapitel 4](/sdam/de/chapter-4/) eingeführt haben und hier wiederholen

    $$
    X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
    $$

    - Parametrisierte Optimierungsmodelle – Wir sahen dies in [Kapitel 6](/sdam/de/chapter-6/), als wir das $\theta$-Perzentil der Verbindungskosten wählten. Dies ist eine in der Industrie weit verbreitete Heuristik, die in der Forschungsliteratur bislang übersehen wurde. Fluggesellschaften nutzen diese Idee, um die Bewegung ihrer Flugzeuge und Besatzungen bei erheblichen wetterbedingten Verzögerungen zu optimieren. Netzbetreiber, die die Einsatzplanung von Energieerzeugern planen, fügen Reservekapazität ein, um sicherzustellen, dass die Nachfrage gedeckt werden kann, falls ein Generator ausfällt.

Sowohl PFAs als auch CFAs besitzen Parameter, die abgestimmt werden müssen. Der einzige Unterschied besteht darin, ob die Politik ein eingebettetes Optimierungsproblem beinhaltet oder nicht. Beide sind außerordentlich leistungsfähig und werden in unterschiedlichen Kontexten weit verbreitet eingesetzt.

### Lookahead-Approximationen

Politiken, die auf Lookahead-Approximationen basieren, werden konstruiert, indem die nachgelagerten Kosten (oder Belohnungen) einer jetzt getroffenen Entscheidung approximiert werden, die dann zusammen mit den anfänglichen Kosten (oder Belohnungen) der ursprünglichen Entscheidung berücksichtigt werden.

- **Politiken basierend auf Wertfunktionsapproximationen (VFAs)** – Dies sind Politiken, die auf der Bellman-Gleichung basieren. Die grundlegendste Form der Bellman-Gleichung für deterministische Probleme wurde erstmals in [Kapitel 5](/sdam/de/chapter-5/) vorgestellt als

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V_{t+1}(S_{t+1}) \big).
$$

  Es gibt viele Probleme, bei denen der Übergang zu $S_{t+1}$ Informationen (enthalten in $W_{t+1}$) beinhaltet, die zum Zeitpunkt $t$ nicht bekannt sind, was bedeutet, dass $S_{t+1}$ zum Zeitpunkt $t$ eine Zufallsvariable ist. In diesem Fall müssen wir, wie zuvor, einen Erwartungswert einfügen, was uns Folgendes ergibt

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  In der Praxis müssen wir die Wertfunktion $V_{t+1}(S_{t+1})$ typischerweise durch eine Approximation $\Vbar_{t+1}(S_{t+1})$ ersetzen, wie wir es im Abschnitt zur approximativen dynamischen Programmierung in [Kapitel 5](/sdam/de/chapter-5/) getan haben. Das Fachgebiet, das sich mit diesen Approximationen befasst, trägt Bezeichnungen wie approximative dynamische Programmierung, bestärkendes Lernen (das seinen Ursprung in der Informatik hat) und adaptive dynamische Programmierung (der in der Regelungstechnik-Community verwendete Begriff). In diesem Fall wäre die Politik gegeben durch

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \E \{\Vbar_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  Wenn wir den Post-Decision-Zustand $S^x_t$ verwenden, können wir unsere Politik schreiben als

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \Vbar^x_t(S^x_t) \big),
$$

  was wir in [Kapitel 5](/sdam/de/chapter-5/) veranschaulicht haben.

  Wir haben das deterministische Kürzeste-Wege-Problem verwendet, um eine Anwendung zu veranschaulichen, bei der Wertfunktionen exakt berechnet werden konnten. Dies kann manchmal auch bei stochastischen Problemen erfolgen, aber in den meisten Anwendungen muss es approximativ geschehen. Die Herausforderung besteht darin, Berechnungen durchzuführen, die von ausreichend hoher Qualität sind, um wirksame Politiken zu erzeugen.

  Eine beliebte Approximationsstrategie für Wertfunktionen besteht in der Verwendung eines linearen Modells, gegeben durch

$$
\begin{align}
\Vbar^x_t(S^x_t\vert \theta^{VFA}) = \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t), \label{eq:hybridlinearvfa}
\end{align}
$$

  wobei $(\phi_f(S^x_t))\_{f\in\Fcal}$ ein vom Nutzer definierter Satz von Merkmalen ist und $\theta^{VFA}$ ein Satz von Parametern, die mithilfe von Algorithmen der approximativen dynamischen Programmierung gewählt werden.

  Wir passen das lineare Modell an, indem wir "Beobachtungen" des Werts $\vhat^n_t$ sammeln, sich im Zustand $S^n_t$ in der $n$-ten Iteration zu befinden. Sei $\thetabar^{VFA,n-1}$ die Schätzung von $\theta^{VFA}$ nach $n-1$ Aktualisierungen. Es gibt Methoden, die es uns erlauben, $\vhat^n_t$ zu verwenden, um $\thetabar^{VFA,n-1}$ leicht zu aktualisieren und $\thetabar^{VFA,n}$ zu erhalten. Dies liefert uns eine VFA-Politik, die wir schreiben können als

$$
\begin{align}
X^{VFA}_t(S_t\vert \theta^{VFA}) &= \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t\vert \theta^{VFA})\big) \nonumber \\
                            &= \argmax_x \left(C(S_t,x) + \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t)\right).
\label{eq:linearvfa}
\end{align}
$$

  Die Approximation von Wertfunktionen mithilfe linearer Modelle war sehr beliebt, aber es gibt praktisch keine theoretischen Garantien für die Qualität der resultierenden Lösung. Schlimmer noch, es gibt empirische Belege dafür, dass die Ergebnisse recht schlecht ausfallen können. Dennoch bleibt sie beliebt, weil sie eine einfache Möglichkeit darstellt, "eine Zahl zu bekommen".

  Ebenfalls heute beliebt ist die Verwendung neuronaler Netze (insbesondere tiefer neuronaler Netze) zur Approximation einer Wertfunktion. Neuronale Netze sind attraktiv, da sie die Notwendigkeit vermeiden, den Satz von Merkmalen $(\phi_f(S_t))$ für $f\in\Fcal$ zu entwerfen. Vorsicht ist geboten, insbesondere wenn wir mit verrauschten Beobachtungen der Wertfunktion arbeiten müssen, da die enorme Flexibilität neuronaler Netze zu Overfitting führen kann.
- **Direkte Lookahead-Approximationen (DLAs)** – Die ersten drei Klassen von Politiken erfordern das Auffinden irgendeiner Form von funktionaler Approximation: der Politik (bei PFAs), der zu optimierenden Funktion (bei CFAs) oder des Wertes, sich in einem nachgelagerten Zustand zu befinden (bei VFAs). Es gibt jedoch viele Probleme, bei denen diese funktionalen Approximationen schlicht nicht möglich sind.

  Der "richtige" Weg, ein DLA zu lösen, besteht darin, das wahre Problem in der Zukunft zu lösen, ausgehend von dem Zustand $S_{t+1}$, der entsteht, indem man im Zustand $S_t$ beginnt, die Aktion $x_t$ trifft und dann die zufällige Information $W_{t+1}$ beobachtet. Das Schwierige daran ist, dass wir zusätzlich zur Modellierung zukünftiger Unsicherheiten $W_{t+1}, W_{t+2}, \ldots$ auch optimale Entscheidungen $x_{t+1}, x_{t+2}, \ldots$ treffen müssen, von denen jede vom zukünftigen Zustand $S_{t+1}, S_{t+2}, \ldots$ abhängt, welcher zufällig ist.

  Obwohl es recht unübersichtlich (und vielleicht abschreckend) ist, bedeutet diese Politik, dass man Folgendes löst

$$
\begin{align}
X^{\ast }(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\min_{\pi} \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesDLA}
\end{align}
$$

  Könnten wir Gleichung $\eqref{eq:policiesDLA}$ berechnen, hätten wir eine optimale Politik. Es ist recht selten, dass Gleichung $\eqref{eq:policiesDLA}$ exakt gelöst werden kann. Das grundlegende stochastische Kürzeste-Wege-Problem in [Kapitel 5](/sdam/de/chapter-5/) ist ein Beispiel dafür, jedoch nur, weil die Unsicherheit auf besonders einfache Weise auftritt.

  In den meisten Anwendungen gehen wir bei der Lösung von $\eqref{eq:policiesDLA}$ so vor, dass wir ein approximatives Lookahead-Modell lösen. Anstatt unsere Abfolge von Zuständen, Entscheidungen und Informationen zu schreiben als

$$
(S_0, x_0, W_1, \ldots, S_t, x_t, W_{t+1}, \ldots),
$$

  erstellen wir eine vereinfachte Menge von Zuständen, Entscheidungen und Informationen für ein Modell, das wir zum Zeitpunkt $t$ lösen und das wir darstellen mit

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots),
$$

  wobei $\Stilde_{tt'}$ typischerweise eine vereinfachte Zustandsvariable für das Lookahead-Modell ist, das wir bei der Entscheidungsfindung zum Zeitpunkt $t$ für den Zeitpunkt $t'$ im Lookahead-Modell erstellen. $\xtilde_{tt'}$ ist unsere (möglicherweise vereinfachte) Entscheidung, die für den Zeitpunkt $t'$ im Lookahead-Modell erstellt wurde, und $\Wtilde_{tt'}$ ist der vereinfachte Informationsprozess zum Zeitpunkt $t'$ im Lookahead-Modell. Entscheidungen $\xtilde_{tt'}$ werden mithilfe einer *Lookahead-Politik* $\Xtilde^{\tilde \pi}\_t(\Stilde_{tt'})$ getroffen, die typischerweise eine vereinfachte Politik ist, die gewählt wird, weil sie leicht zu berechnen ist.

  Unsere Politik, die auf unserem approximativen Lookahead-Modell basiert, würde geschrieben als

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA}
\end{align}
$$

  Gleichung $\eqref{eq:policiesapproximateDLA}$ wird anhand des Entscheidungsbaums in Abbildung 7.1 veranschaulicht, der die Verwendung approximativer Zustände, Entscheidungen und Unsicherheiten beim Blick in die Zukunft darstellt. Das Erstellen dieser Approximationen erfordert eine Mischung aus Kunst und Wissenschaft. Wir wollen ein Gleichgewicht finden zwischen einer genauen Modellierung der Zukunft und den Anforderungen an die Rechenleistung.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticdla.jpg" alt="Ein stochastischer Entscheidungsbaum unter Verwendung von Approximationen von Zuständen, Entscheidungen und Unsicherheiten." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 7.1.</span> Ein stochastischer Entscheidungsbaum unter Verwendung von Approximationen von Zuständen, Entscheidungen und Unsicherheiten, zusätzlich zu einer approximativen Politik für die Entscheidungsfindung in der Zukunft. Quadratische Knoten sind Punkte, an denen wir Entscheidungen treffen, während Kreise Punkte sind, an denen wir die exogene Information beobachten.</figcaption>
</figure>

  Der Entwurf der Lookahead-Politik $\tilde \pi$ (manchmal auch "Politik-innerhalb-einer-Politik" genannt) ist in hohem Maße problemabhängig. Tatsächlich können wir jede unserer vier Klassen von Politiken verwenden. Entscheidend ist, dass sie rechnerisch einfach sein muss, da wir sie viele Male berechnen müssen. Man beachte, dass das Lookahead-Modell nicht exakt sein muss (in den meisten Fällen könnten wir es niemals lösen, wenn wir versuchten, ein exaktes Lookahead-Modell zu verwenden). Stattdessen wählen wir Approximationen, von denen wir glauben, dass sie jetzt gute Entscheidungen hervorbringen, indem wir Entscheidungen approximieren, die wir in der Zukunft *möglicherweise* treffen werden.

Wir haben bereits Anwendungen dieses Ansatzes kennengelernt. Für das dynamische Kürzeste-Wege-Problem in [Kapitel 6](/sdam/de/chapter-6/) griffen wir auf den weit verbreiteten Ansatz zurück, ein deterministisches Lookahead-Modell zu lösen, bei dem wir die beste Schätzung dessen, was in der Zukunft passieren könnte, nehmen und ein deterministisches Optimierungsproblem lösen. Dieser Ansatz ignoriert den Effekt zukünftiger Unsicherheiten, aber wir führten die Idee ein, ein parametrisiertes deterministisches Optimierungsproblem zu verwenden. Allerdings müssen wir den Parameter abstimmen.

Diese vier Klassen von Politiken (PFAs, CFAs, VFAs und DLAs) sind universell, das heißt, jede Politik, die für ein sequentielles Entscheidungsproblem (*jedes* sequentielle Entscheidungsproblem) gewählt wird, wird zu einer dieser vier Klassen gehören. Diese können jedoch auch als Bausteine für Hybrid-Politiken dienen.

Wir haben alle vier Klassen von Politiken veranschaulicht, was die Frage aufwirft: Woher weiß man, welche man verwenden soll? Manchmal scheint es offensichtlich zu sein, wie etwa beim Finden des besten Weges zu einem Ziel. Für solche Probleme ist ein direkter Lookahead eine naheliegende Wahl. Aber es gibt Probleme, bei denen jede der vier Klassen ein tragfähiger Kandidat ist.

Zwei Probleme, bei denen wir alle vier Klassen erfolgreich demonstriert haben, sind die Bestandsprobleme in [Kapitel 1](/sdam/de/chapter-1/) und das Diabetes-Lernproblem in [Kapitel 4](/sdam/de/chapter-4/). Der Schlüssel liegt darin, sorgfältig über alle vier Klassen von Politiken nachzudenken, anstatt sich nur auf eine zu konzentrieren, was heutzutage so oft geschieht.

## Modelle, erneut betrachtet

In diesem Abschnitt werden wir einen Rundgang durch die verschiedenen Anwendungen machen, beginnend zunächst mit einer Überprüfung der Zustandsvariablen. Danach werden wir die verschiedenen Politiken überprüfen und die von uns gesehenen Politiken in die vier Klassen einordnen.

### Zustandsvariablen, erneut betrachtet

In der akademischen Literatur herrscht erhebliche Verwirrung darüber, was unter einer Zustandsvariable zu verstehen ist, wie sich am auffälligen Fehlen von Definitionen dessen, was eine Zustandsvariable ist, in Büchern über dynamische Programmierung, stochastische Programmierung und bestärkendes Lernen zeigt.

Die einzige Ausnahme von diesem Muster, die wirklich hervorsticht, ist die Literatur zur optimalen Steuerung, wo Definitionen von Zustandsvariablen recht üblich sind. In der Regelungsgemeinschaft wird eine Zustandsvariable üblicherweise definiert als „alle Informationen, die wir zum Zeitpunkt $t$ benötigen, um ein System ab dem Zeitpunkt $t$ zu modellieren.“ Was jedoch fehlt, ist jegliche Beschreibung dessen, welche Information genau benötigt wird, um das System ab dem Zeitpunkt $t$ zu modellieren.

Wir definieren zwei Versionen von Zustandsvariablen (aus *Reinforcement Learning and Stochastic Optimization*, Abschnitt 9.4):

> **Eine Zustandsvariable ist:**
>
> **a) Politik-abhängige Version** – Eine Funktion der Historie, die, kombiniert mit der exogenen Information (und einer Politik), notwendig und hinreichend ist, um die Kosten-/Beitragsfunktion, die Entscheidungsfunktion (die Politik) und alle von der Übergangsfunktion benötigten Informationen zur Modellierung der für die Kosten-/Beitragsfunktion und die Entscheidungsfunktion benötigten Informationen zu berechnen.
>
> **b) Optimierungsversion** – Eine Funktion der Historie, die notwendig und hinreichend ist, um die Kosten-/Beitragsfunktion, die Nebenbedingungen und alle von der Übergangsfunktion benötigten Informationen zur Modellierung der für die Kosten-/Beitragsfunktion und die Nebenbedingungen benötigten Informationen zu berechnen.

Wir benötigen die beiden Versionen, denn wenn wir ein System haben, bei dem wir die Struktur einer Politik festgelegt haben, müssen wir sicherstellen, dass wir jede von der Politik benötigte Information einbeziehen. Wir könnten zum Beispiel ein Bestandsproblem haben, bei dem wir zwei Politiken betrachten: eine, die eine Prognose zukünftiger Nachfragen verwendet, während die andere lediglich eine Order-up-to-Politik verwendet. Während eine Prognose sicherlich relevant erscheint, verwenden wir sie nicht, wenn wir eine Order-up-to-Politik einsetzen, und folglich würde sie nicht in der Zustandsvariable enthalten sein.

Es ist hilfreich, einen Rundgang durch unsere bisherigen Anwendungen zu machen und die Zustandsvariablen für jede von ihnen zu überprüfen. Für jede Anwendung werden wir die Zustandsvariable zusammenfassen, die wir je nach Kontext als $S_t$ oder $S^n$ schreiben könnten, und wir werden die Elemente als physische Zustandsvariablen $R_t$, informationelle Variablen $I_t$ und Belief-Zustandsvariablen $B_t$ klassifizieren.

**Kapitel 1 –** Dieses Kapitel führte zwei Bestandsprobleme ein, die auch dazu konzipiert waren, unterschiedliche Ausprägungen von Zustandsvariablen hervorzubringen. Das einfache Bestandsproblem war durch eine Zustandsvariable $S_t$ gekennzeichnet, die lediglich aus dem Bestand $R^{inv}\_t$ zum Zeitpunkt $t$ besteht. Dieses Problem ist eine der am weitesten verbreiteten Anwendungen zur Veranschaulichung der dynamischen Programmierung.

Das komplexere Bestandsproblem erforderte eine Zustandsvariable

$$
S_t = (\underbrace{R^{inv}_t}_{R_t},\underbrace{c_t}_{I_t},\underbrace{f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t}_{B_t}).
$$

Diese Zustandsvariable veranschaulicht alle drei Klassen von Informationen in Zustandsvariablen: die physischen Zustandsvariablen $R_t = R^{inv}\_t$, weitere Informationen $I_t = c_t$ und Belief-Zustandsvariablen $B_t = (f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t)$, wobei $(f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t)$ den prognostizierten Mittelwert und die Standardabweichung des Fehlers der zukünftigen Nachfrage $\Dhat_{t+1}$ sowie die Standardabweichung der Änderung der Prognosen vom Zeitpunkt $t$ bis $t+1$ erfasst (wir nehmen an, dass die Änderung der Prognosen den Mittelwert null hat).

**Kapitel 2 –** Dieses Kapitel führte ein einfaches Problem des Verkaufs eines Vermögenswerts mit der Zustandsvariable

$$
S_t = (R^{asset}_t, p_t).
$$

ein, wobei die physische Zustandsvariable $R_t$ erfasst, ob wir den Vermögenswert noch halten oder nicht (sie hätte auch erfassen können, wie viele Aktien wir gehalten haben), und der Informationszustand $I_t = p_t$ der Preis ist, zu dem wir die Aktie verkaufen.

Wir führten auch die Idee ein, mithilfe von

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

eine geglättete Schätzung des Preises des Vermögenswerts zu berechnen. Wir entwarfen dann eine Politik, die Entscheidungen basierend darauf traf, wie stark der Preis $p_t$ von dieser geglätteten Schätzung abwich. Nun wird unsere Zustandsvariable zu

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,\pbar_t)}_{I_t}\big).
$$

Stellen wir uns nun vor, dass wir, wenn wir uns entscheiden, unsere Aktie zum Zeitpunkt $t$ zu verkaufen, zu einem unbekannten Preis $p_{t+1}$ verkaufen, der sich gemäß

$$
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1},
$$

entwickelt, wobei $\varepsilon_{t+1}$ ein Rauschterm mit Mittelwert null ist. Nun würde unsere Zustandsvariable wie folgt aussehen

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,p_{t-1},p_{t-2})}_{I_t}\big).
$$

**Kapitel 3 –** Hier beschrieben wir einen gradientenbasierten Suchalgorithmus, der sich gemäß einer klassischen stochastischen Suchiteration entwickelt, gegeben durch

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \nabla_x F(x^n,W^{n+1}).  \label{eq:stochasticgradientaltransitionrevisited}
\end{align}
$$

Dieses Verfahren ist eine Methode zur Suche nach dem besten Wert von $x$, aber dies ist ein sequentielles Entscheidungsproblem, bei dem die Schrittweite $\alpha_n$ die Entscheidung ist. Wenn wir die Schrittweite mit einer deterministischen Formel wie $\alpha_n =1/n$ wählen, dann ist der „Zustand“ unseres Suchverfahrens

$$
S^n = (x^n).
$$

Wir könnten jedoch eine adaptive (stochastische) Schrittweitenformel wie

$$
\begin{align}
\alpha_n = \frac{\theta}{\theta + N^n - 1} \label{eq:adaptivealpharevisited}
\end{align}
$$

verwenden, wobei $N^n$ die Anzahl der Male ist, die der Gradient $\nabla_x F(x^n,W^{n+1})$ die Richtung ändert, dann müssen wir $N^n$ kennen, und unsere Zustandsvariable wird zu

$$
S^n = (x^n,N^n).
$$

**Kapitel 4 –** Unser Diabetes-Problem ist eine Instanz eines reinen Lernproblems, bei dem wir versuchen, die wahre Reaktion $\mu_x$ eines Patienten auf ein Medikament zu erlernen. Nach dem Ausprobieren mehrerer Medikamente könnten wir unseren Belief mithilfe des Zustands

$$
S^n = (\underbrace{\mubar^n_x, \sigmabar^n_x}_{B^n})_{x\in\Xcal},
$$

erfassen, wobei wir annehmen, dass die wahre Reaktion $\mu_x \sim N(\mubar^n_x, (\sigmabar^n_x)^2)$ ist.

Dieses Belief-Modell könnte funktionieren, wenn wir für jeden Patienten einen anderen Belief haben, aber vermutlich beginnen wir mit einem Wissensbestand darüber, wie das Medikament bei allen Patienten wirkt. Wir könnten dies in einem Anfangszustand

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal}.
$$

erfassen. Stellen wir uns nun vor, dass der $n$-te Patient mit den Attributen $a^n$ (Geschlecht, Gewicht, Rauchergeschichte, ...) eintrifft. Die Reaktion des Patienten auf das Medikament $x$ würde sowohl vom Medikament als auch von den Attributen des Patienten abhängen. Das bedeutet, dass unsere Zustandsvariable (also die Information, die uns zur Verfügung steht, um die Entscheidung zu treffen) aus Informationen besteht, die wir nicht kontrollieren (die Attribute des Patienten $a^n$), und Informationen, die wir kontrollieren (die Wahl des Medikaments $x^n$). Wir würden also unsere Zustandsvariable (die Information, die wir zur Entscheidungsfindung verwenden) schreiben als

$$
S^n = (\underbrace{a^n}_{I^n}, \underbrace{(\mubar^n_x, \sigmabar^n_x)}_{B^n})_{x\in\Xcal},
$$

wobei wir uns entschieden haben, $a^n$ in unsere informationelle Zustandsvariable $I^n$ zu setzen, und die Variablen $(\mubar^n_x, \sigmabar^n_x)$ in die Belief-Zustandsvariable $B^n$.

**Kapitel 5 –** Für unser stochastisches Kürzeste-Wege-Problem begannen wir mit einem grundlegenden Problem, bei dem ein Reisender beim Durchqueren einer Verbindung zufällige Kosten anfällt, aber vor der Entscheidung am Knoten $i$, welche Verbindung $(i,j)$ zu durchqueren ist, nur den Mittelwert und die Varianz der Kosten kennt. Für dieses Problem ist der Zustand unseres Reisenden einfach der Knoten $N_t$, an dem er sich nach dem Durchqueren von $t$ Verbindungen befindet, was uns

$$
S_t = N_t.
$$

gibt. Wir gingen dann zu einem Problem über, bei dem der Reisende am Knoten $i$ die tatsächlichen Kosten $\chat_{tij}$ sehen kann, die anfallen würden, wenn er über die Verbindung $(i,j)$ reisen würde. Mit dieser zusätzlichen Information wird die Zustandsvariable zu

$$
S_t = \left(\underbrace{N_t}_{R_t},(\underbrace{\chat_{t, N_t, j}}_{I_t})_{j\in\Ncal^+_i}\right).
$$

**Kapitel 6 –** Wir betrachteten ein dynamisches Kürzeste-Wege-Problem, bei dem sich die geschätzten Kosten auf der Verbindung $(i,j)$, $\cbar_{tij}$, im Laufe der Zeit entwickeln. Das heißt, zum Zeitpunkt $t+1$ nehmen wir an, dass uns ein aktualisierter Satz von Schätzungen gegeben wird, den wir mit $\cbar_{t+1}$ bezeichnen würden. Stellen wir uns vor, dass sich unser Reisender am Knoten $N_t= i$ befindet. Der Zustand unseres Systems (für unseren Reisenden) wäre dann gegeben durch

$$
S_t = (\underbrace{N_t}_{R_t}, \underbrace{\cbar_t}_{I_t}).
$$

Stellen wir uns nun vor, dass wir dem Reisenden einen Pfad zeigen, den wir mit $p_t$ bezeichnen, welcher die Menge der Verbindungen ist, die wir planen, um von seinem aktuellen Knoten $N_t$ zum Ziel zu gelangen. Nehmen wir an, wir haben gerade den Pfad aktualisiert und den Reisenden gefragt, ob er den neuen Pfad akzeptiert. Wenn er ja sagt, wird das Navigationssystem weiterhin neu optimieren, aber einen kleinen Bonus dafür einführen, beim zuletzt akzeptierten Pfad $p_t$ zu bleiben, den der Reisende gerade akzeptiert hat (dies geschieht, um zu verhindern, dass das System zwischen zwei nahezu gleichwertigen Pfaden hin- und herspringt).

Wenn $p_t$ der zuletzt akzeptierte Pfad ist, dann ist dies eine Information, die wir benötigen, um zukünftige Entscheidungen zu treffen. In diesem Fall wird unsere Zustandsvariable zu

$$
S_t = (\underbrace{N_t}_{R_t}, (\underbrace{\cbar_t,p_t}_{I_t})).
$$

Diese Entscheidungsprobleme haben alle drei Arten von Zustandsvariablen veranschaulicht: physische Zustandsvariablen $R_t$, informationelle Zustandsvariablen $I_t$ und Belief-Zustandsvariablen $B_t$. Wir haben Probleme gesehen, die nur $R_t$ oder nur $B_t$ enthalten, sowie Kombinationen mit $I_t$ wie $(R_t, I_t)$ und $(I_t, B_t)$, ebenso wie alle drei $(R_t, I_t, B_t)$. Wir betonen, dass die Unterscheidung zwischen $R_t$ und $I_t$ manchmal willkürlich sein kann, aber es gibt so viele Probleme, die die Verwaltung physischer oder finanzieller Ressourcen betreffen (Kaufen, Verkaufen, Bewegen, Verändern), mit Entscheidungen, die physische oder finanzielle Ressourcen betreffen (oder durch sie eingeschränkt werden), dass wir es für notwendig hielten, eine eigene Klasse speziell für Ressourcen zu schaffen.

Wir denken, dass es viele Probleme gibt, die Unsicherheit beinhalten und auch das Lernen einbeziehen, und die möglicherweise aktives Lernen beinhalten, da Entscheidungen beeinflussen können, was wir beobachten (wie im Diabetes-Beispiel). Wir vermuten, dass wir, sobald Modellierer damit vertraut werden, Belief-Zustandsvariablen in sequentielle Entscheidungsprobleme einzubeziehen, sehen werden, dass sie häufiger verwendet werden.

### Politiken, erneut betrachtet

Unsere sechs Anwendungsszenarien (und in einigen Fällen die Erweiterungen) wurden ausgewählt, um jede der vier Klassen von Politiken aufzuzeigen. Im Folgenden überprüfen wir die verschiedenen Politiken und identifizieren die Klasse, zu der sie gehören.

**Kapitel 1 –** Wir führten zwei Bestandsprobleme ein. Eines verwendete eine Order-up-to-Politik der Form

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases}
$$

während das zweite eine Politik verwendete, den Bestand auf die prognostizierte Nachfrage plus einen Puffer aufzufüllen

$$
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta.
$$

Beide dieser Politiken beinhalten ein oder zwei abstimmbare Parameter. Beide sind analytische Funktionen, die keinen eingebetteten Optimierungsoperator ($\min$ oder $\max$) besitzen. Dies sind die unterscheidenden Merkmale einer Politikfunktionsapproximation (PFA).

**Kapitel 2 –** Dieses Kapitel behandelte das Problem, zu bestimmen, wann ein Vermögenswert zu verkaufen ist. Es wurden mehrere Politiken vorgeschlagen, aber repräsentative Beispiele sind die „Sell-low“-Politik, gegeben durch

$$
X^{sell-low}(S_t\vert \theta^{low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ and } R_t = 1, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

und die „Tracking-Politik“

$$
X^{track}(S_t\vert \theta^{track}) = \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Beide dieser Politiken ähneln unserer „Order-up-to“-Bestandsbestellpolitik insofern, als sie parametrische Funktionen mit abstimmbaren Parametern sind, was bedeutet, dass sie weitere Beispiele für Politikfunktionsapproximation (PFA) darstellen. Obwohl dies bei weitem nicht die einzige Möglichkeit ist, ein Problem des Verkaufs von Vermögenswerten zu lösen, ist diese Klasse von Politik an der Wall Street recht beliebt.

PFAs sind in der Praxis wegen ihrer Einfachheit und Transparenz beliebt, aber es ist wichtig, sich vor Augen zu halten: *Der Preis der Einfachheit sind abstimmbare Parameter... und das Abstimmen ist schwierig!*

**Kapitel 3 –** Adaptive Marktplanung – Dieses Problem beinhaltet die Verwendung einer populären gradientenbasierten Suchmethode (siehe Gleichung $\eqref{eq:stochasticgradientaltransitionrevisited}$), bei der die Schrittweite $\alpha_n$ die Entscheidung ist. Hätten wir ein deterministisches Problem, würden wir $\alpha_n$ berechnen, indem wir das eindimensionale Optimierungsproblem

$$
\alpha_n = \argmax_{\alpha \geq 0} \big(F(x^n + \alpha \nabla_x F(x^n))\big),
$$

lösen, was eine Form der direkten Lookahead-Approximation (DLA) darstellt. Wenn wir es jedoch mit Unsicherheit zu tun haben, bedeutet eine eindimensionale Suche, dass wir in der Lage sein müssen, den Erwartungswert $F(x) = \E F(x,W)$ zu berechnen, was in der Praxis im Allgemeinen nicht möglich ist. Stattdessen könnten wir eine deterministische Politik verwenden wie

$$
\alpha^\pi_n(\theta) = \frac{\theta}{\theta+n-1},
$$

wobei wir dies als eine parametrisierte Funktion geschrieben haben (also eine Form der PFA). Wir haben auch eine adaptive (zustandsabhängige) Politik veranschaulicht, die durch Gleichung $\eqref{eq:adaptivealpharevisited}$ gegeben ist, wobei wir $n$ durch einen Zähler $N^n$ ersetzt haben, der zählt, wie oft der Gradient die Richtung wechselt (oder wir könnten zählen, wie oft sich die Zielfunktion nicht verbessert). Wir würden diese Politik schreiben als

$$
\alpha^\pi_n(S^n\vert \theta) = \frac{\theta}{\theta+N^n-1},
$$

wobei unser Zustand $S^n$ die Information $N^n$ trägt.

Randbemerkung: Politiken vom PFA-Typ werden in stochastischen Gradientenalgorithmen universell eingesetzt. Während diese tatsächlich die besten sein mögen, hat in der Realität noch niemand die anderen drei Klassen von Politiken auch nur ausprobiert. Es könnte sich lohnen, dies genauer zu betrachten.

**Kapitel 4 –** Erlernen der besten Diabetesbehandlung – Dies ist ein reines Lernproblem, das wir mithilfe der äußerst populären Klasse von Politiken angegangen sind, die als Upper Confidence Bounding bekannt ist. Die vielleicht bekannteste UCB-Politik ist gegeben durch

$$
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right).
$$

Eine weitere Variante, die sehr gut funktioniert, wurde ursprünglich als Intervallschätzung eingeführt und ist gegeben durch

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
$$

Schließlich gibt es eine Variante, die ursprünglich 1933 entdeckt und einige Jahre später wiederentdeckt wurde: das Thompson-Sampling, das gegeben ist durch

$$
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x.
$$

wobei $\muhat^n_x$ zufällig aus einer Normalverteilung mit Mittelwert $\mubar^n_x$ und Varianz $\theta^{TS} \sigmabar^n_x$ gezogen wird.

Man beachte, dass alle drei Politiken zwei Merkmale gemeinsam haben: einen Optimierungsoperator (bei diesen Politiken ein $\argmax_x$) und einen abstimmbaren Parameter. Diese können als parametrisierte Optimierungsprobleme betrachtet werden, die zur Klasse der parametrischen Kostenfunktionsapproximation (oder CFA) gehören.

CFA-Politiken werden in der Praxis weit verbreitet eingesetzt, haben jedoch in der akademischen Literatur außerhalb der spezifischen Anwendung von Lernpolitiken wie unserer Diabetesanwendung nur sehr wenig Beachtung gefunden. Wir werden sehen, wie diese Idee in späteren Kapiteln in einem ganz anderen Kontext angewendet wird.

**Kapitel 5 –** Statische stochastische kürzeste Wege – Unser erstes Problem der stochastischen kürzesten Wege ging davon aus, dass einem Reisenden stochastische Kosten entstehen, die jedoch erst nach dem Durchqueren eines Streckenabschnitts bekannt wurden. Diese Annahme erlaubte es uns, das Problem als deterministisches Problem des kürzesten Weges zu lösen, das sich leicht mithilfe der Bellman-Gleichung lösen lässt und uns eine Politik liefert, die gegeben ist durch

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\cbar_{tij} + V_{t+1}(S_{t+1}=j)\big).
$$

wobei $S_t = N_t = i$ der Knoten ist, an dem sich der Reisende befindet. Die Wertfunktionen $V_t(S_t)$ werden berechnet, indem man rückwärts in der Zeit arbeitet, beginnend bei $t=T$, wo wir $V_T(S_T) = 0$ für alle Knoten $S_T$ setzen. Dies ist eine Form der Politik, die auf Wertfunktionsapproximationen basiert, und dies ist ein seltener Fall, in dem eine VFA-Politik tatsächlich optimal ist.

Wir sind dann zu einem schwierigeren Problem übergegangen, bei dem einem Reisenden erlaubt ist, die Kosten $\chat_{tij}$ aus Knoten $i = N_t$ zu sehen. Für dieses Problem wird die Zustandsvariable zu $S_t = (N_t, (\chat_{t,N_t,j},~j\in\Ncal^+\_i))$. Für dieses Problem mussten wir die Wertfunktion approximieren, wobei wir den Post-Decision-Zustand $S^x_t = N^x_t$ verwendet haben, wobei $N^x_t$ der Knoten ist, zu dem wir uns entschieden haben, nach dem Treffen unserer Entscheidung $x_t$ zu gehen, wenn wir uns am Knoten $N_t$ befinden. In diesem Fall sah unsere Politik so aus

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\chat_{tij} + \Vbar^x_t(S^x_t)\big).
$$

Dies ist wieder eine VFA-basierte Politik, aber diesmal ist sie nicht mehr optimal, da $\Vbar^x_t(S^x_t)$ eine Approximation ist, die wir aus Daten schätzen mussten. Mit einiger Sorgfalt können wir jedoch eine asymptotisch optimale Politik entwickeln.

**Kapitel 6 –** Dynamische stochastische kürzeste Wege – Hier stoßen wir auf ein Problem, bei dem sich die geschätzten Kosten auf jedem Streckenabschnitt $\cbar_{tij}$ im Laufe der Zeit ändern. Zum Zeitpunkt $t$ ist also $\cbar_t$ der Vektor der geschätzten Streckenkosten, der zur nächsten Zeitperiode zu $\cbar_{t+1}$ wird. Dies bedeutet, dass unsere Zustandsvariable von $S_t = N_t$, welche einfach der Knoten ist, an dem sich der Reisende befindet, zu $S_t = (N_t, \cbar_t)$ übergeht, was eine extrem hochdimensionale Zustandsvariable ist. Dies ist ein Problem, dem wir uns nicht einmal mit approximativer dynamischer Programmierung nähern können (es ist schwer vorstellbar, eine VFA um diese Zustandsvariable herum aufzubauen).

Stattdessen schlagen wir die Idee vor, ein Lookahead-Modell zu verwenden, bei dem wir die Tatsache ignorieren, dass sich der Vektor der geschätzten Streckenkosten $\cbar_t$ im Laufe der Zeit ändert, während der Reisende sich durch das Netzwerk bewegt. Stattdessen können wir annehmen, dass er fest ist (und nehmen wir an, deterministisch). Das bedeutet, dass wir jetzt ein Lookahead-Modell haben, das tatsächlich ein deterministisches Problem des kürzesten Weges ist, aber wir müssen bedenken, dass wir ein approximatives deterministisches Lookahead-Modell optimieren, was eine DLA-Politik ist. Natürlich wissen wir, wie man dies optimal löst, aber eine optimale Lösung für ein approximatives Lookahead-Modell ist keine optimale Politik!

Deterministische Lookaheads sind beliebt, aber es gibt eine Möglichkeit, sie noch besser zu machen, ohne sie komplizierter zu gestalten. Wir haben diese Idee eingeführt, als wir vorschlugen, das $\theta$-Perzentil der Kosten anstelle des Mittelwerts $\cbar_t$ zu verwenden. Sei $\ctilde_{tij}(\theta)$ das $\theta$-Perzentil der Kosten auf Streckenabschnitt $(i,j)$, gegeben das, was wir zum Zeitpunkt $t$ wissen. Nun lösen wir ein deterministisches Lookahead-Modell unter Verwendung der Kosten $\ctilde_{tij}(\theta)$. Jetzt haben wir ein parametrisiertes deterministisches Lookahead-Modell, das eine Hybridform aus einer parametrischen CFA und einer DLA ist.

## Online- versus Offline-Zielfunktionen

Es gibt zwei Perspektiven zur Bewertung der Leistung einer Politik:

- **Online-Lernen** – Es gibt viele Situationen, in denen wir im laufenden Betrieb lernen müssen. Zum Beispiel könnten wir versuchen, den besten Preis für ein Produkt, den besten Weg durch eine verstopfte Stadt oder das beste Medikament zur Senkung des Blutdrucks eines Patienten zu erlernen. In jedem dieser Fälle wollen wir so gut wie möglich abschneiden, ausgehend von dem, was wir wissen, aber wir lernen noch immer, damit wir in Zukunft bessere Entscheidungen treffen können. Das bedeutet, dass wir die *kumulative Belohnung* über die Zeit (oder Iterationen) maximieren müssen, damit wir erfassen, wie gut wir abschneiden, während wir lernen.
- **Offline-Lernen** – In anderen Fällen können wir in einer Laborumgebung lernen, bei der es sich um ein physisches Labor handeln kann (um verschiedene Materialien zu testen oder die Wirkung eines Medikaments an Mäusen zu beobachten), einen Computersimulator oder sogar eine Feldumgebung, die als Testmarkt betrieben wird (zur Bewertung eines Produkts) oder eine klinische Studie (zum Testen von Medikamenten). Wenn wir in einer Laborumgebung ("offline") lernen, sind wir bereit, Versuch und Irrtum durchzuführen, ohne uns Gedanken darüber zu machen, wie gut wir dabei abschneiden. Stattdessen interessiert uns nur die Qualität der Lösung am Ende, was bedeutet, dass wir die *finale Belohnung* optimieren wollen.

Ein Wort der Vorsicht bezüglich der Begriffe online und offline. In der Machine-Learning-Community bezieht sich "offline" auf die Schätzung von Modellen anhand eines einzelnen, festen Datensatzes (Batch). Im Gegensatz dazu wird Online-Lernen verwendet, um vollständig sequenzielle Situationen zu bezeichnen, in denen Daten im Laufe der Zeit eintreffen. Dies ist typischerweise in Feldsituationen der Fall, in denen Daten durch einen exogenen Prozess erzeugt werden (etwa die Beobachtung von Patienten, die in einer Arztpraxis eintreffen), was der gleichen Situation entspricht, die wir annehmen, wenn wir den Begriff "online" verwenden. Im maschinellen Lernen würde "online" jedoch weiterhin verwendet werden, um einen iterativen Algorithmus zu bezeichnen, der in einer Simulation eingesetzt wird.

Es gibt ganze Fachgebiete, die sich mit sequentiellen Entscheidungsproblemen befassen und danach unterschieden werden, ob sie sich auf die finale Belohnung oder die kumulative Belohnung konzentrieren. Zum Beispiel konzentrieren sich Communities, die sich mit "stochastischer Suche" befassen, tendenziell auf die finale Belohnung, während Communities, die sich mit "Multiarmed-Bandit-Problemen" befassen (eine Form des stochastischen Suchproblems), im Allgemeinen die kumulative Belohnung optimieren. Die Realität ist, dass man dieselbe Politik für beide Zielsetzungen verwenden kann, sie jedoch für die gewählte Zielsetzung abstimmen muss.

### Online-Optimierung (kumulative Belohnung)

Bei der Politiksuche ist es typischerweise der Fall, dass wir eine parametrisierte Politik haben, die wir als $X^\pi(S_t\vert \theta)$ schreiben können. Die Entscheidung $x_t = X^\pi(S_t\vert \theta)$ könnte der Preis eines Produkts, die Wahl eines Blutdruckmedikaments oder das Gebot sein, das platziert wird, um Werbeklicks zu maximieren. In all diesen Fällen müssen wir im laufenden Betrieb lernen, was bedeutet, dass wir die Leistung maximieren müssen, während wir lernen.

Sei $C(S_t,x_t)$ unsere Leistungskennzahl (Umsatz, Blutdrucksenkung oder Nettoerlös aus Werbeklicks). Wir wollen $\theta$ finden, das die Politik $X^\pi(S_t\vert \theta)$ erzeugt, welche das Optimierungsproblem

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S_0} \E_{W_1, \ldots, W_T\vert S_0} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}, \label{eq:derivativebasedonline}
\end{align}
$$

löst, wobei $S_{t+1} = S^M(S_t, X^\pi(S_t\vert \theta),W_{t+1})$. Der Erwartungswert in $\eqref{eq:derivativebasedonline}$ wird über alle möglichen Realisierungen von $W_1, \ldots, W_T$ gebildet, sowie über die möglichen Werte unsicherer Parameter (wie unsichere anfängliche Überzeugungen über Marktreaktionen oder darüber, wie jemand auf ein Medikament reagiert), die im Anfangszustand $S_0$ enthalten sind.

Gleichung $\eqref{eq:derivativebasedonline}$ ist ein Beispiel für eine "Online"- oder "kumulative Belohnungs"-Zielfunktion, da wir die Summe aller Belohnungen über einen gewissen Horizont maximieren wollen. Dies ist von besonderem Interesse bei Online-Lernproblemen, bei denen wir die Leistung erlernen müssen, wie etwa den Umsatz aus einem Preis oder die Wirksamkeit eines Medikaments bei einem bestimmten Patienten, was bedeutet, dass wir den Lernprozess mit dem Bestreben ausbalancieren müssen, gleichzeitig so gut wie möglich abzuschneiden.

### Offline-Optimierung (finale Belohnung)

In Offline-Umgebungen haben wir typischerweise ein Budget von $N$ Experimenten. Ein klassisches (wenn auch unpassendes) Problem, das häufig verwendet wird, um Offline-, ableitungsfreies Lernen zu veranschaulichen, ist das Zeitungsjungenproblem, das wir in [Kapitel 3](/sdam/de/chapter-3/) behandelt haben. Zur Erinnerung: Das Zeitungsjungenproblem wird geschrieben als

$$
F(x) = \E_W \big(p \min\{x,W\} - cx\big),
$$

wobei $x$ die Menge an Ressourcen ist, die wir zu einem Stückkostensatz $c$ bestellen, die dann verwendet wird, um die Nachfrage $W$ zu decken (die zum Zeitpunkt der Wahl von $x$ unbekannt ist). Wir nehmen an, dass die Verteilung von $W$ unbekannt ist.

Sei $x^n = X^\pi(S^n\vert \theta)$ unsere Wahl von $x$ gegeben das, was wir wissen, was durch $S^n$ erfasst wird, wobei unsere Politik $X^\pi(S^n\vert \theta)$ von einem oder mehreren Parametern in $\theta$ abhängt. Nachdem wir $x^n$ umgesetzt haben, beobachten wir $W^{n+1}$, aktualisieren $S^{n+1}$ und wiederholen dann den Prozess. Nach $N$ Iterationen erhalten wir ein finales Design, das wir mit $x^{\pi,N}(\theta)$ bezeichnen.

Nun müssen wir unser finales Design $x^{\pi,N}(\theta)$ bewerten. Um diese Bewertung durchzuführen, müssen wir zwei, möglicherweise drei, Quellen der Unsicherheit berücksichtigen. Die erste ist, dass wir Unsicherheit bei unbekannten Parametern haben können, wie etwa dem Mittelwert von $W$. Zum Beispiel könnte $W$ aus einer Poisson-Verteilung mit Mittelwert $\mu$ stammen, und wir könnten annehmen, dass $\mu \in \lbrace \mu_1, \ldots, \mu_K\rbrace $, wobei $p_k = Prob[\mu = \mu_k]$. Die Verteilung $(p_k)\_{k=1}^K$ ist im Anfangszustand $S_0$ enthalten.

Dann haben wir die zufälligen Ankünfte von Nachfragen $W^1, \ldots, W^N$, die aus einer Verteilung mit Mittelwert $\mu$ gezogen würden. Wir verwenden diese Beobachtungen sowie die Politik $X^\pi(S^n\vert \theta)$, um $x^{\pi,N}(\theta)$ zu berechnen. Es ist wichtig zu erkennen, dass $x^{\pi,N}(\theta)$ eine Zufallsvariable ist, die von jeglicher Information in $S^0$ abhängt (unabhängig davon, ob diese deterministisch oder zufällig ist).

Sobald wir $x^{\pi,N}(\theta)$ berechnet haben, müssen wir eine abschließende Reihe von Simulationen durchführen, um zu bewerten, wie gut es funktioniert. Wir führen eine neue Zufallsvariable, $\What$, ein, um Stichproben von $W$ darzustellen, die zur Bewertung unseres finalen Designs verwendet werden.

Diese Notation erlaubt es uns, unsere Zielfunktion für das Offline-Lernen zu schreiben als

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S^0} \E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(x^{\pi,N}(\theta),\What).\label{eq:derivativebasedoffline}
\end{align}
$$

Wir betonen, dass wir Erwartungswerte einfach schreiben, um anzudeuten, dass wir über zufällige Information mitteln müssen. Wir behandeln das Problem der Berechnung dieser Erwartungswerte im Folgenden.

### Politikbewertung

Die Zielfunktionen für die kumulative Belohnung (gegeben in $\eqref{eq:derivativebasedonline}$) und die finale Belohnung (gegeben in $\eqref{eq:derivativebasedoffline}$) wurden beide unter Verwendung von Erwartungswerten geschrieben, was unsere Art ist zu sagen, dass wir über alles, was zufällig ist, mitteln. Das ist mathematisch schön zu schreiben, aber diese sind praktisch nie berechenbar.

Immer wenn wir einen Erwartungswert bilden müssen, hilft es anzunehmen, dass wir diesen Erwartungswert durch Sampling schätzen werden. Wir veranschaulichen zunächst, wie dies für die kumulative Belohnungs-Zielfunktion gemäß $\eqref{eq:derivativebasedonline}$ funktioniert. Hier könnten wir eine unsichere Größe im Anfangszustand $S_0$ haben, etwa Unsicherheit darüber, wie ein Markt auf den Preis reagiert, die Methanproduktion einer Ölquelle, oder wie ein Patient auf ein Medikament reagieren könnte. Dann haben wir die exogene Information $W_1, \ldots, W_T$, bei der es sich um Beobachtungen von Verkäufen, die Veränderung der atmosphärischen Temperaturen, oder darum handeln könnte, wie ein Patient auf eine Medikation reagiert.

Sei $\omega$ eine Stichprobenrealisierung all dieser unsicheren Größen. Nehmen wir an, wir erzeugen eine Menge von Stichproben all dieser unsicheren Größen und speichern sie in einer Menge $\Omega = \lbrace \omega^1, \ldots, \omega^K\rbrace $. Immer wenn wir also $W_t(\omega)$ schreiben, ist dies eine Stichprobenrealisierung dessen, was wir zum Zeitpunkt $t$ beobachten. Wenn wir eine Politik $X^\pi(S_t\vert \theta)$ verwenden, dann würden wir dem Stichprobenpfad der Zustände $S_t(\omega)$, Entscheidungen $x_t(\omega) = X^\pi(S_t(\omega)\vert \theta)$ und exogenen Informationen $W_{t+1}(\omega)$ folgen, der durch unsere Übergangsfunktion bestimmt wird

$$
S_{t+1}(\omega) = S^M(S_t(\omega), x_t(\omega), W_{t+1}(\omega)).
$$

Mit unserer Menge von Stichprobenbeobachtungen $\Omega$ können wir unseren Erwartungswert $F^\pi(\theta)$ approximieren durch

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \sum_{k=1}^K \sum_{t=0}^T C(S_t(\omega^k),X^\pi(S_t(\omega^k)\vert \theta)). \label{eq:simulatedcumulativereward}
\end{align}
$$

Wenn wir eine Zielfunktion mit finaler Belohnung verwenden, müssen wir zunächst $x^{\pi,N}(\theta)$ schätzen. Wenn wir dem Stichprobenpfad $\omega$ folgen, dann würden wir unser finales Design als $x^{\pi,N}(\omega\vert \theta)$ schreiben, wobei $\omega$ alles erfasst, was wir für die Durchführung des Trainings gemäß $(S_0(\omega), W_1(\omega), \ldots, W_T(\omega))$ verwendet haben.

Wir müssen dann unser Design $x^{\pi,N}(\omega\vert \theta)$ anhand der in $\What$ erfassten Testdaten bewerten. Sei $\psi$ eine Stichprobenrealisierung von $\What$, und genau wie wir angenommen haben, dass wir eine Stichprobenmenge $\Omega$ für $\omega$ haben, nehmen wir an, dass wir eine Menge von Stichprobenausgängen von $\What$ erstellen, gegeben durch $\Psi = \lbrace \psi^1, \ldots, \psi^L\rbrace $. Man beachte, dass $\What$ jede simulierte Information darstellt, die wir benötigen, um unser Design $x^{\pi,N}$ zu bewerten. Es kann sich um eine Menge von Zufallsvariablen handeln (Patientenmerkmale, Wetter, Marktbedingungen), und es kann sogar Informationen darstellen, die sich im Zeitverlauf entwickeln. Mit anderen Worten... alles Mögliche.

Nun würden wir die Schätzung der Leistung der Politik in einem Setting mit finaler Belohnung schreiben als

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \frac{1}{L} \sum_{k=1}^K \sum_{\ell=1}^L F(x^{\pi,N}(\omega^k),\What(\psi^\ell)). \label{eq:simulatedfinalreward}
\end{align}
$$

### Zusammenführung

Gleichung $\eqref{eq:derivativebasedonline}$ veranschaulicht eine Online- bzw. kumulative Belohnungs-Zielfunktion, bei der wir die Gesamtleistung während des Lernprozesses maximieren müssen. Gleichung $\eqref{eq:derivativebasedoffline}$ veranschaulicht die Offline- bzw. finale Belohnungs-Zielfunktion, bei der wir nach dem besten Design suchen müssen, das im Durchschnitt am besten funktioniert, nachdem wir das Design festgelegt haben. Was im Moment wichtig ist, ist, dass beide Probleme die Lösung von

$$
\begin{align}
\max_\theta F^\pi(\theta), \label{eq:searchovertheta}
\end{align}
$$

beinhalten, wobei $F(\theta)$ eine unbekannte Funktion ist, die wir auf verrauschte Weise abtasten können.

Wir können die Zielfunktion in $\eqref{eq:searchovertheta}$ erweitern, um eine Suche über verschiedene Klassen von Politiken einzuschließen. Sei $\Fcal$ die Menge aller möglichen Arten von Politiken, einschließlich der Hauptklassen (PFAs, CFAs, VFAs und DLAs), sowie verschiedener Funktionen innerhalb jeder dieser Klassen. Sei dann $\Theta^f$ die Menge aller möglichen Parametervektoren $\theta$, die zu welcher Politikklasse $f\in\Fcal$ auch immer wir gewählt haben, passen. In diesem Fall können wir unser Optimierungsproblem schreiben als

$$
\max_{\pi=(f\in\Fcal, \theta\in\Theta^f)} F^\pi(\theta).
$$

In der Praxis tendieren wir dazu, die Politikklasse $f\in\Fcal$ mithilfe von Intuition und einem Verständnis der Struktur des Problems zu wählen, aber dies ist nicht immer offensichtlich. Wir bitten die Leser eindringlich, bereit zu sein, Intuition und gesunden Menschenverstand einzusetzen, aber sich aller vier Klassen bewusst zu sein. Dies bedeutet nicht, dass Sie alle vier Klassen testen müssen, aber Sie sollten bereit sein zu begründen, warum Sie die getroffene Wahl gewählt haben.

Als Nächstes wenden wir uns dem Problem der Optimierung über $\theta$ zu, von dem wir annehmen, dass es kontinuierlich und in den meisten Fällen vektorwertig ist. Es gibt zwei breite Klassen von Suchmethoden, die wir zum Auffinden von $\theta$ anwenden können: ableitungsbasierte und ableitungsfreie.

### Abhängigkeit vom Anfangszustand

Unabhängig davon, ob wir eine kumulative Belohnungs-Zielfunktion (wie Gleichung $\eqref{eq:derivativebasedonline}$) oder eine finale Belohnungs-Zielfunktion (wie Gleichung $\eqref{eq:derivativebasedoffline}$) verwenden, wird unsere Optimierung von $\theta$ vom Anfangszustand $S_0$ abhängen. Dies bedeutet, dass eine Änderung der Information in $S_0$ das Potenzial hat, unsere Ergebnisse zu verändern, einschließlich der Wahl der Politik.

Der Anfangszustand $S_0$ enthält jegliche Information, die das Verhalten des Systems in irgendeiner Weise beeinflusst. Er kann deterministische Parameter, Verteilungen über unsichere Parameter, und sogar die Startposition des Suchalgorithmus enthalten.

Die Abhängigkeit optimaler Lösungen von der Information in $S_0$ wird in der algorithmischen Literatur weitgehend übersehen. Es wäre schön, wenn wir die Funktion $\theta(S_0)$ berechnen könnten, um diese Abhängigkeit zu erfassen, aber die Schätzung dieser Funktion ist nicht praktikabel. Dies bedeutet, dass wir $\theta$ neu optimieren müssen, wenn sich $S_0$ ändert. Das wäre in Ordnung, außer dass es viele Situationen gibt, in denen sich $S_0$ ändert, und wir $\theta$ nicht neu optimieren, einfach weil es ziemlich schwierig sein kann.

Dessen sollte sich der Leser bewusst sein.

## Ableitungsbasierte Politiksuche

Nehmen wir an, wir versuchen, das Problem

$$
\begin{align}
\max_\theta F(\theta),  \label{eq:maxFtheta}
\end{align}
$$

zu lösen, wobei $F(\theta)$ eine parametrische Funktion in $\theta$ ist. Nehmen wir ferner an, dass $\theta$ ein Vektor ist und dass wir den Gradienten

$$
\nabla_\theta F(\theta) = \begin{pmatrix} \frac{\partial F(\theta)}{\partial \theta_1} \\ \frac{\partial F(\theta)}{\partial \theta_2} \\ \vdots \\ \frac{\partial F(\theta)}{\partial \theta_K} \end{pmatrix}.
$$

berechnen können. In der Praxis ist es oft nicht möglich, Ableitungen exakt zu berechnen.

Eine nützliche Methode zur Handhabung höherdimensionaler Parametervektoren ist die *simultane Störungs-stochastische Approximation* (oder SPSA), entwickelt von Spall (2003), die Gradienten wie folgt approximiert. Sei $Z_p, p=1, \ldots, P$ eine Stichprobe von Realisierungen von Zufallsvariablen (sie könnten normalverteilt sein) mit Mittelwert 0. Sei $Z^n$ der $p$-dimensionale Vektor mit den Realisierungen für Iteration $n$. Wir approximieren den Gradienten, indem wir $x^n$ um den Vektor $Z$ mittels $x^n+\eta^nZ^n$ und $x^n-\eta^nZ^n$ stören, wobei $\eta^n$ ein Skalierungsparameter ist, der über Iterationen hinweg konstant sein kann oder variieren kann (typischerweise wird er abnehmen).

Seien nun $W^{n+1,+}$ und $W^{n+1,-}$ zwei verschiedene Stichproben der die Simulation antreibenden Zufallsvariablen (diese können im Voraus oder während der Laufzeit erzeugt werden). Wir führen dann unsere Simulation zweimal durch: einmal, um $F(x^n + \eta^nZ^n,W^{n+1,+})$ zu finden, und einmal, um $F(x^n - \eta^nZ^n,W^{n+1,-})$ zu finden. Die Schätzung des Gradienten ist dann gegeben durch

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

Beachten Sie, dass der Zähler jedes Elements des Gradienten in Gleichung $\eqref{eq:SPSAgradient}$ derselbe ist, was bedeutet, dass wir nur zwei Funktionsauswertungen benötigen: $F(x^n + \eta^nZ^n,W^{n+1,+})$ und $F(x^n - \eta^nZ^n,W^{n+1,-})$. Der einzige Unterschied ist das $Z^n_p$ im Nenner für jede Dimension $p$ (das ist die Magie von SPSA). (Siehe *Reinforcement Learning and Stochastic Optimization*, Kapitel 5, Abschnitt 5.4.4, für eine Darstellung von SPSA.)

Eine kurze Warnung bezüglich der "Magie" von SPSA: Die Gradienten können recht verrauscht sein. Aus diesem Grund besteht eine gängige Strategie darin, mehrere Simulationen (in der Literatur als Mini-Batches bezeichnet) jeder gestörten Simulation durchzuführen und diese zu mitteln. Die geeignete Größe der Mini-Batches hängt von den Problemcharakteristiken ab, rechnen Sie also damit, einige Zeit mit der Feinabstimmung dieses Parameters zu verbringen.

Wie auch immer wir den Gradienten berechnen, unser Suchalgorithmus (den wir in [Kapitel 3](/sdam/de/chapter-3/) gesehen haben) ist gegeben durch

$$
\theta^{n+1} = \theta^n + \alpha_n \nabla_\theta F(\theta^n,W^{n+1}).
$$

Wir müssen nun eine Politik für die Schrittweite $\alpha_n$ wählen, die wir in [Kapitel 3](/sdam/de/chapter-3/) besprochen haben, aber siehe *Reinforcement Learning and Stochastic Optimization*, Kapitel 6, für eine gründliche Diskussion von Schrittweiten-Politiken. Wir erinnern den Leser daran, dass ein stochastischer Gradienten-Algorithmus selbst ein sequentielles Entscheidungsproblem ist (wie wir in [Kapitel 3](/sdam/de/chapter-3/) gesehen haben).

## Ableitungsfreie Politiksuche

Die ableitungsfreie Politiksuche ist einfach ein weiteres Beispiel für ein sequentielles Entscheidungsproblem, das im Mittelpunkt dieses gesamten Bandes steht, wobei der Hauptunterschied darin besteht, dass die einzige Zustandsvariable der Belief über die Funktion sein wird, die wir maximieren (was dasselbe ist wie bei unserer Diabetes-Anwendung in [Kapitel 4](/sdam/de/chapter-4/)).

Wir können Beliefs mithilfe von Folgendem bilden:

- **Nachschlagetabellen** – Nehmen wir an, wir können die Menge der möglichen Werte von $\theta$ in eine Menge $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $ diskretisieren. Definieren Sie eine Zufallsvariable $\mu_\theta = F(\theta) = \E F(\theta,W)$, die eine Zufallsvariable ist, weil wir $F(\theta)$ (oder $\mu_\theta$) nicht kennen. Nehmen wir an, wir können Experimente durchführen, um $\Fhat^{n+1} = F(\theta^n, W^{n+1})$ abzutasten. Wir können diese Stichproben verwenden, um Schätzungen $\mubar^n_\theta$ für jeden diskreten Wert von $\theta \in \Theta$ zu erstellen. Dies wäre ein Nachschlagetabellen-Belief-Modell.

  Das einfachste Belief-Modell ist eine Nachschlagetabelle mit unabhängigen Beliefs, die wir zuerst in [Kapitel 4](/sdam/de/chapter-4/) bei unserer Diabetes-Anwendung gesehen haben. Sei $\mubar^n_\theta$ unsere Schätzung von $\E F(\theta)$ für ein bestimmtes $\theta \in \lbrace \theta_1, \ldots, \theta_K\rbrace $ nach $n$ Stichproben (über alle Experimente hinweg). Sei $\sigmabar^n_{\theta_k}$ die Standardabweichung der Schätzung $\mubar^n_{\theta_k}$ und sei $\beta^n_{\theta_k}$ die Präzision, gegeben durch

  $$
  \beta^n_{\theta_k} = \frac{1}{(\sigmabar^n_{\theta_k})^2}.
  $$
- **Parametrisches Modell** – Wir könnten ein lineares Modell der Form

  $$
  F(\theta\vert \eta) \approx \eta_0 + \eta_1 \phi_1(\theta) + \eta_2 \phi_2(\theta) + \ldots
  $$

  schätzen, wobei $\phi_f(\theta)$ Merkmale sind, die aus dem Vektor $\theta$ berechnet werden, der aus Termen wie $\theta,$ $\theta^2$, oder $\ln \theta$ bestehen könnte. Beachten Sie, dass ein "lineares Modell" bedeutet, dass es linear in den Koeffizienten $\eta$ ist; die Merkmale $\phi_f(\theta)$ können nichtlineare Funktionen von $\theta$ sein.

  Während lineare Modelle beliebt sind, werden sie wahrscheinlich nicht viel mehr als eine lokale Approximation darstellen. Dies ist kein Problem, wenn wir das lineare Modell um den richtigen Punkt herum anpassen. Das Problem besteht darin, den richtigen Punkt zu finden!
- **Nichtparametrische Modelle** – Nichtparametrische Modelle werden am besten als lokale Approximationen der Funktionen um eine Menge von Punkten herum betrachtet (die vielleicht zufällig gewählt werden). Die Schätzung könnte eine Konstante sein (was am typischsten ist) oder vielleicht eine lokal lineare Approximation.

  Es gibt viele Möglichkeiten, nichtparametrische Modelle zu erstellen. Am gebräuchlichsten wäre vielleicht, eine Schätzung $\mubar_\theta$ zu erstellen, indem man über $\mubar_{\theta_1}, \ldots, \mubar_{\theta_K}$ für Werte $\theta_k$ mittelt, die nahe an $\theta$ liegen. Wir werden in diesem Buch nicht auf nichtparametrische Methoden zurückgreifen, hauptsächlich weil sie datenintensiv und in der Anwendung etwas umständlich sind.

*Reinforcement Learning and Stochastic Optimization*, Kapitel 3, beschreibt eine Reihe von Methoden zur rekursiven Schätzung von Funktionen und behandelt mehrere Belief-Modelle für Nachschlagetabellen, lineare Modelle und nichtlineare Modelle. Das Kapitel behandelt sowohl Bayes'sche als auch frequentistische Modelle. Wir haben bereits die rekursiven Gleichungen für eine Nachschlagetabelle für unser Diabetes-Beispiel gesehen, wobei die Aktualisierung durch die Übergangsgleichungen in [Kapitel 4](/sdam/de/chapter-4/) gegeben war (diese Gleichungen setzen ein Bayes'sches Belief-Modell voraus). Später werden wir die rekursive Aktualisierung von linearen und nichtlinearen Modellen veranschaulichen.

Wir können den Prozess der ableitungsfreien Suche mithilfe der fünf Elemente des universellen Modellierungsrahmens modellieren:

- **Zustandsvariablen** – Dies wäre der Belief über $\E F(x,W)$, den wir als $S^n = B^n$ schreiben können. Wie wir den Belief-Zustand speichern, hängt davon ab, ob wir Nachschlagetabellen (und welche Art von Nachschlagetabelle), lineare oder nichtlineare Modelle verwenden. Wenn wir unser Nachschlagetabellen-Belief-Modell verwenden, würden wir

  $$
  B^n = (\mubar^n_\theta,\beta^n_\theta),~\theta \in \{\theta_1, \ldots, \theta_K\}.
  $$

  verwenden.
- **Entscheidungsvariable** – Die Entscheidung ist die Wahl $\theta^n$, welchen Wert von $\theta$ wir bewerten, um die Funktion auszuwerten und $\Fhat^{n+1} = F(x^n,W^{n+1})$ zu erhalten. Wir treffen unsere Wahl $\theta^n = \Theta^\pi(S^n)$ mithilfe einer Politik $\Theta^\pi(S^n)$, die wir entwerfen müssen.
- **Exogene Information** – Wir denken normalerweise an die exogene Information als die abgetastete Beobachtung $\Fhat^{n+1} = F(\theta^n,W^{n+1})$. Sei $\beta^W_\theta$ die Präzision (eins über die Varianz) des Rauschens bei der Beobachtung der Funktion $F(\theta^n,W^{n+1})$ an einem Punkt $\theta$.
- **Übergangsfunktion** – Die Übergangsfunktion kommt in Form der rekursiven Gleichungen zur Aktualisierung unserer Beliefs vor. Zum Beispiel die Aktualisierungsgleichungen für die Nachschlagetabellen-Beliefs in [Kapitel 4](/sdam/de/chapter-4/), wo wir nach der besten Diabetes-Medikation gesucht haben. Wieder unter Verwendung unseres Nachschlagetabellen-Belief-Modells wäre die Übergangsfunktion

  $$
  \begin{align}
  \mubar^{n+1}_\theta &= \frac{\beta^n_\theta \mubar^n_\theta + \beta^W_\theta W^{n+1}_\theta}{\beta^n_\theta + \beta^W_\theta},\label{eq:thetatransition1}\\
  \beta^{n+1}_\theta &= \beta^n_\theta + \beta^W.\label{eq:thetatransition2}
  \end{align}
  $$
- **Zielfunktion** – Es ist am gebräuchlichsten, dass wir einen Simulator offline verwenden, um nach dem besten Wert von $\theta$ zu suchen, was eine Zielfunktion mit finaler Belohnung bedeutet. Sei $\theta^{\pi,N}$ der beste Wert des Parametervektors $\theta$, abgeleitet aus unserem Belief-Modell nach $N$ Stichproben. Wenn wir zum Beispiel ein Nachschlagetabellen-Belief-Modell verwenden würden und Schätzungen $\mubar^N_\theta$ für jede Wahl $\theta$ nach $N$ Experimenten erhalten würden, würden wir

  $$
  \theta^{\pi,N} = \argmax_{\theta\in\Theta} \mubar^N_\theta,
  $$

  wählen, wobei der hochgestellte Index "$\pi$" in $\theta^{\pi,N}$ die Art der Suchpolitik $\pi$ widerspiegelt, die bei der Schätzung von $\mubar^N_x$ verwendet wurde. Das Optimierungsproblem zur Suche nach der besten Politik $\pi$ würde geschrieben als

  $$
  \max_{\pi} \E_{S^0}\E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(\theta^{\pi,N},\What).
  $$

Erinnern wir uns daran, dass wir Erwartungswerte mittels Simulation berechnen, wie wir oben gezeigt haben, in Gleichung $\eqref{eq:simulatedcumulativereward}$ für die kumulative Belohnung, oder $\eqref{eq:simulatedfinalreward}$ für die finale Belohnung.

Damit bleibt uns die Frage: Wie entwerfen wir die Suchpolitik $\Theta^\pi(S^n)$? Wir hoffen, dass es keine Überraschung darstellt, dass wir aus allen vier Klassen von Politiken wählen können. Alle vier Klassen werden in *Reinforcement Learning and Stochastic Optimization*, Kapitel 7, ausführlich behandelt, wir verweisen aber auch auf die Diskussion der Politiksuche in Kapitel 12 dieses Buches.

Für unsere Zwecke werden wir zwei Politiken veranschaulichen, die relativ einfach und natürlich sind.

- **Interval-Estimation-Politiken für Nachschlagetabellen-Belief-Modelle** – Wir haben mehrere Politiken für das Diabetes-Setting betrachtet, aber eine besonders effektive ist die Interval-Estimation-Politik, gegeben durch

  $$
  \begin{align}
  \Theta^{IE}(S^n\vert \theta^{IE}) = \argmax_{\theta\in\Theta} \left(\mubar^n_\theta + \theta^{IE} \sigmabar^n_\theta \right). \label{eq:thetaIE}
  \end{align}
  $$

  Nun müssen wir nach dem besten Wert von $\theta^{IE}$ suchen. Man kann sich dies als ein sequentielles Entscheidungsproblem vorstellen (das Finden des besten $\theta^{IE}$), um ein sequentielles Entscheidungsproblem zu lösen (um das beste $\theta$ für unsere Politik $X^\pi(S_t\vert \theta)$ zu finden). Wir bemerken, dass in der Suchgemeinschaft die Feinabstimmung des Parameters $\theta^{IE}$ in der Forschungsliteratur typischerweise übersehen wird, Praktiker aber wissen, dass sie durchgeführt werden muss.
- **Klassische Antwortoberflächenmethoden** – Für Probleme, bei denen $x$ kontinuierlich ist, ist es sinnvoll, ein parametrisches Modell an die Funktion $\E F(x,W)$ anzupassen. Auch wenn es heute verlockend sein mag, neuronale Netze zu verwenden, sollte man bedenken, dass dies hochdimensionale Modelle sind, die dazu neigen, jedes Rauschen zu überanpassen. Es gibt viele Probleme, bei denen $F(x,W)$ teuer ist; zum Beispiel könnte es sich um eine Computersimulation handeln, die eine Stunde oder länger dauern könnte, oder es könnten Feldexperimente erforderlich sein.

  Aus diesen Gründen ist eine beliebte Strategie die Verwendung eines linearen Modells der Form

  $$
  \Fbar(x) = \sum_f \theta_f \phi_f(x),
  $$

  wobei $\phi_f(x)$ ein aus dem Eingabevektor $x$ extrahiertes Merkmal ist. Angenommen, wir haben $n$ Experimente mit Eingaben $x^0, \ldots, x^{n-1}$ durchgeführt, aus denen wir die Antworten $\Fhat^1, \ldots, \Fhat^n$ beobachtet haben. Aus diesen Daten können wir die Techniken der linearen Regression verwenden, um unser lineares Modell mit Schätzungen $\theta \approx \thetabar^n$ anzupassen, was uns die Approximation liefert

  $$
  \Fbar^n(x) = \sum_f \thetabar^n_f \phi_f(x).
  $$

  Die Literatur zu Antwortoberflächen verwendet seit langem die gierige Strategie, $\Fbar^n(x)$ zu optimieren, um den nächsten zu beobachtenden Punkt zu finden, was bedeutet, dass wir schreiben würden

  $$
  \begin{align}
  x^n = \argmax_x \Fbar^n(x). \label{eq:responsesurfacegreedy}
  \end{align}
  $$

  Obwohl diese Idee intuitiv ansprechend ist, stellt sich heraus, dass die Verwendung dessen, was als beste Schätzung des Optimums basierend auf unserer Approximation $\Fbar^n(x)$ erscheint, tatsächlich eine schreckliche Methode ist, um die beste Approximation von $\E F(x)$ zu lernen.

  Abbildung 7.2 veranschaulicht die Herausforderungen beim Erlernen einer parametrischen Funktion. Hier zeigen wir drei lineare Nachfragereaktionskurven, die die Nachfrage als Funktion des Preises in der Form $D(p) = \theta_0 - \theta_1 p$ angeben. Unser Ziel ist es, den Umsatz $R(p) = pD(p)$ zu maximieren. Abbildung 7.2(a) zeigt drei mögliche Nachfragekurven und die entsprechenden Umsatzkurven.

<figure class="book-figure">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-width: 560px; margin: 0 auto;">
    <div><img src="/assets/images/sdam/learningrevenue1.png" alt="Panel (a): drei mögliche Absatzreaktionslinien und entsprechende Umsatzkurven" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(a)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue2.png" alt="Panel (b): beobachtete Preis-Absatz-Kombinationen, wenn wir Preise verwenden, die den Umsatz zu maximieren scheinen" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(b)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue3.png" alt="Panel (c): Beobachtung extremer Preise zur Verbesserung des Lernens der Absatzreaktion" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(c)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue4.png" alt="Panel (d): Ausgleich zwischen Lernen und Verdienen" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(d)</p></div>
  </div>
  <figcaption><span class="fig-num">Abbildung 7.2.</span> Aktives Erlernen einer Nachfragereaktionsfunktion: (a) Drei mögliche Absatzreaktionslinien und entsprechende Umsatzkurven, (b) Beobachtete Preis-Absatz-Kombinationen, wenn wir Preise verwenden, die den Umsatz zu maximieren scheinen, (c) Beobachtung extremer Preise (hoch und niedrig) zur Verbesserung des Lernens der Absatzreaktion, und (d) Ausgleich zwischen Lernen (Beobachtung abseits der Mitte) und Verdienen (Beobachtung von Preisen nahe der Mitte).</figcaption>
</figure>

  Es ist verlockend, Preise anbieten zu wollen, die den Umsatz optimieren, wie wir es in Abbildung 7.2(b) tun, aber dies erzeugt eine Menge von Punkten in einer Kugel, die es schwierig macht, die Nachfragekurve zu schätzen. Der beste Weg, die Nachfragekurve zu schätzen, besteht darin, Preise nahe den Extremen anzugeben, wie wir es in Abbildung 7.2(c) tun, aber der Umsatz ist an diesen Punkten sehr niedrig, sodass wir während des Lernens kein Geld verdienen.

  Ein guter Ansatz besteht darin, Punkte an den "Schultern" zu testen, was bedeutet, nicht am Optimum, aber auch nicht zu weit davon entfernt, wie wir es in Abbildung 7.2(d) tun, ein Verhalten, das wir mit einer Politik erreichen, die wir als Nächstes beschreiben.
- **Antwortoberflächenmethoden mit Perturbation** – Eine Politik, die den in Abbildung 7.2 veranschaulichten Kompromiss zwischen Exploration und Exploitation überwindet, verwendet eine Ein-Schritt-Lookahead-Politik namens Knowledge Gradient, die $x^n$ als den Wert wählt, der den maximalen Informationswert erzeugt. Es stellt sich heraus, dass die Punkte, die den Informationswert maximieren, uns das in Abbildung 7.2(d) veranschaulichte Stichprobenmuster liefern.

  Der Knowledge Gradient ist für unsere Darstellung hier zu komplex, aber es gibt eine sehr einfache Möglichkeit, dasselbe Verhalten zu erzielen. Anstatt unsere aktuelle Schätzung des scheinbaren Optimums $x^n$ zu nehmen, wie wir es in $\eqref{eq:responsesurfacegreedy}$ tun, stören wir sie um einen Betrag $\rho$, wobei es zwei Möglichkeiten gibt, dies zu tun:

    - **Eine Optimum-Abweichungs-Politik** – Die Idee hierbei ist, einen Punkt $x^n$ zu wählen, der einen Abstand $\rho$ vom Optimum $\xbar^n = \argmax_x \Fbar^n(x\vert \thetabar^n)$ hat. Wenn $x$ ein $k$-dimensionaler Vektor ist, kann diese Abweichung erzeugt werden, indem $k$ normalverteilte Zufallsvariablen $Z_1, \ldots, Z_K$, jede mit Mittelwert 0 und Varianz 1, gezogen und anschließend normalisiert werden, sodass

      $$
      \sqrt{\sum_{k=1}^K Z^2_k} = \rho.
      $$

      Sei $\Zbar^n$ der resultierende $k$-dimensionale Vektor. Nun berechnen wir den Stichprobenpunkt mittels

      $$
      x^n_k = \xbar^n_k + \Zbar^n_k.
      $$

      Man beachte, dass wir in einer Dimension $\Zbar^n = \pm \rho$ hätten.
    - **Eine Anregungspolitik** – Hier erzeugen wir wiederum einen $k$-dimensionalen Perturbationsvektor $Z^n$, wobei jedes Element den Mittelwert 0 und die Varianz 1 hat, und setzen dann

      $$
      x^n_k = \Xbar^n_k + \rho Z^n_k.
      $$

      Während die Optimum-Abweichungs-Politik erzwingt, dass $x^n$ einen Abstand $\rho$ vom Optimum $\xbar^n$ hat, führt eine Anregungspolitik einfach eine zufällige Störung mit Mittelwert 0 ein, was bedeutet, dass der wahrscheinlichste zu beobachtende Punkt das Optimum von $\fbar^n(x\vert \thetabar^n)$ ist.

  Wir schlagen vor, dass die Optimum-Abweichungs-Politik besser für Offline-Zielfunktionen mit finaler Belohnung geeignet ist, während die Anregungspolitik besser geeignet ist, wenn wir uns in einer Online-Umgebung befinden, in der wir die kumulative Belohnung optimieren.

## Was haben wir gelernt?

- Wir betrachten die vier Klassen von Politiken.
- Wir verwenden alle Anwendungen, die in den vorangegangenen sechs Kapiteln eingeführt wurden, um die unterschiedlichen Stile von Zustandsvariablen zu kontrastieren und jede der vier Klassen von Politiken zu veranschaulichen.
- Wir beschreiben auch Zielfunktionen für finale Belohnung und kumulative Belohnung. Zielfunktionen für finale Belohnung treten auf, wenn wir Beobachtungen in einer experimentellen Umgebung (im Labor oder im Feld) machen, bei der uns nur die Leistung des endgültigen Designs interessiert. Zielfunktionen für kumulative Belohnung werden verwendet, wenn wir während des Handelns lernen.
- Wir beschreiben sowohl ableitungsbasierte als auch ableitungsfreie Suchmethoden zur Durchführung der Parametersuche.
- Wir bemerken, dass sowohl ableitungsbasierte als auch ableitungsfreie stochastische Suche sequentielle Entscheidungsprobleme sind.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was unterscheidet PFAs von den anderen drei Klassen von Politiken?</li>
<li>Was unterscheidet VFAs und DLAs von PFAs und CFAs?</li>
<li>In Kapitel 1 besteht die Zustandsvariable für das komplexere Bestandsproblem aus physischen Zustandsvariablen $R_t$, informationellen Zustandsvariablen $I_t$ und Belief-Zustandsvariablen $B_t$. Was unterscheidet eine Belief-Zustandsvariable von einer informationellen Zustandsvariable?</li>
<li>Was ist der Unterschied in den Zielfunktionen für Online- und Offline-Lernen?</li>
<li>Wir haben ableitungsbasierte und ableitungsfreie stochastische Suche als sequentielle Entscheidungsprobleme beschrieben. Welche dieser beiden Strategien verwendet einen Belief-Zustand, und warum ist dies notwendig?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Abbildung 7.3 zeigt einen deterministischen Graphen, in dem wir versuchen, einen Pfad von Knoten 1 zu Knoten 11 mithilfe unterschiedlicher Zielfunktionen zu finden.
  <ol type="a">
    <li>Wenn unser Reisender einfach die gesamte Reisezeit von Knoten 1 zu 11 minimieren möchte und bisher den Pfad 1-2-6-9 durchlaufen hat, was ist ihr Zustand?</li>
    <li>Nehmen wir nun an, dass unser Reisender bis zur Zeit 45 an Knoten 11 ankommen muss. Kommt sie nach Zeit 45 an, wird ihr eine Strafe in Höhe des Quadrats der Verzögerung auferlegt. Was ist der Zustand des Reisenden, der bisher dem Pfad 1-2-6-9 gefolgt ist?</li>
    <li>Was ist der Zustand, wenn der Reisende, der dem Pfad 1-2-6-9 gefolgt ist, die zweithöchsten Kosten auf einer der Kanten entlang seines Pfades minimieren möchte?</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariablemaxarccost.jpg" alt="Ein deterministischer Graph." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 7.3.</span> Ein deterministischer Graph.</figcaption>
</figure>
</li>
<li>Wahre Geschichte: Ein Finanztechnologieunternehmen ("Fintech") verfügt über ein algorithmisches Handelssystem für Hochfrequenzhandel. Zur Zeit $t$, wenn ein Vermögenswert zum Preis $p_t$ gehandelt wird, schätzen sie mithilfe einer Reihe von Prognosen, wie sich der Preis über einen rollierenden Horizont innerhalb des Tages verändern könnte, ob der Preis steigt oder fällt. Hier wird die Zeit in 15-Minuten-Schritten gemessen. Sei $f_{tt'}$ der geschätzte Preis des Vermögenswerts zur Zeit $t'$, gegeben die Information zur Zeit $t$. Nun erstellen wir einen geschätzten Preis mittels

$$
\fbar_t(\theta) = \sum_{t'=t+1}^{t+H} \theta_{t'-t} f_{tt'},
$$

wobei $\theta = (\theta_1, \theta_2, \ldots, \theta_H)$ der Gewichtsvektor für jeden 15-Minuten-Schritt für sechs Stunden in die Zukunft (24 Schritte) ist. Sei $x_t = 1$ eine Entscheidung, zur Zeit $t$ zu verkaufen, $x_t = -1$ ist eine Entscheidung zu kaufen, und $x_t = 0$ bedeutet zu halten, wobei die Politik lautet

$$
X^\pi(S_t\vert \theta) = \begin{cases} +1 & \text{if } \fbar_t(\theta) \geq p_t + 1.0, \\ 0 & \text{if } p_t - 1.0 < \fbar_t(\theta) < p_t + 1.0, \\ -1 & \text{if } \fbar_t(\theta) \leq p_t - 1.0. \end{cases}
$$

Die Herausforderung besteht darin, den Gewichtsvektor $\theta$ zu optimieren.
  <ol type="a">
    <li>Was ist zur Zeit $t$ der Zustand dieses Systems?</li>
    <li>In welche Klasse von Politik würde $X^\pi(S_t\vert \theta)$ fallen? Erklären Sie.</li>
    <li>Nehmen Sie an, Sie können die Politik mithilfe historischer Daten in einem Simulator simulieren. Sei $F(\theta)$ die erwartete Leistung der Politik bei gegebenem Parametervektor $\theta$. Schreiben Sie diese Zielfunktion unter der Annahme, dass Sie die Politik mithilfe einer einzelnen Stichprobe der Historie simulieren werden.</li>
    <li>Beschreiben Sie, wie man mithilfe Ihres Simulators eine numerische Ableitung berechnet. Schreiben Sie einfach die numerische Ableitung für ein einzelnes Element $\theta_\tau$.</li>
  </ol>
</li>
</ol>
{% endraw %}
