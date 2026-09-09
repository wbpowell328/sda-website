---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 3: Adaptive Marktplanung"
permalink: /sdam/de/chapter-3/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 8d040048b8e28e95
---


{% raw %}
## Kapitelüberblick

Wir verwenden den Begriff „adaptive Marktplanung", um zu beschreiben, was allgemein als das Zeitungsjungenproblem bekannt ist, bei dem wir eine Menge einer Ressource zum Verkauf auswählen müssen (die „Zeitungen"), um eine unbekannte Marktnachfrage zu decken, wobei nicht genutzte Ressourcen am Ende der Verkaufsperiode entsorgt werden. Das bedeutet, dass verschiedene Zeitperioden physisch nicht miteinander verbunden sind.

Wir beginnen damit, dieses Problem zu nutzen, um einen grundlegenden stochastischer Gradient Algorithmus zu veranschaulichen, von dem bekannt ist, dass er gegen die optimale Menge konvergiert. Dieser Ansatz überwindet das Problem, dass wir, wenn wir zu wenig zuteilen, nicht die tatsächliche Nachfrage beobachten, sondern nur, wie viel wir verkaufen können (was durch den Bestand begrenzt ist, den wir bereitgestellt haben).

Stochastische Gradientenalgorithmen werden häufig bei der Optimierung unter Unsicherheit eingesetzt, wenn wir Zugriff auf einen Gradienten haben. Stochastische Gradientenalgorithmen wurden erstmals 1951 eingeführt und besitzen gut verstandene Konvergenzeigenschaften. Weniger bekannt ist jedoch die Idee, dass ein stochastischer Gradientenalgorithmus selbst ein sequentielles Entscheidungsproblem ist, bei dem die „Entscheidung" die im Algorithmus verwendete Schrittweite ist.

Die klassische Literatur zu stochastischen Gradientenalgorithmen konzentriert sich auf die Eigenschaft, dass sie im Grenzwert die optimale Lösung für ein Einperiodenproblem liefern (das heißt, sie finden die optimale Menge, die zugeteilt werden soll). Fast vollständig übersehen wird, dass wir, wenn dies in einem Feldumfeld geschieht, was bedeutet, dass wir die Ergebnisse erleben, während sie eintreten, als Zielfunktion die Aufgabe verwenden müssen, die *kumulative Belohnung* zu maximieren, welche die Summe der Belohnungen über die Zeit darstellt.

In den Erweiterungen führen wir außerdem eine Wendung ein, die in der Literatur übersehen wird. In der Praxis kennen wir nicht nur die Nachfrage nicht, wir kennen nicht einmal die Verteilung der Nachfrage. In jedem Zeitschritt beobachten wir, wie viel wir verkaufen (was durch die von uns bereitgestellte Menge der Ressource begrenzt ist), und wir lernen aus dieser Erfahrung, um unsere Überzeugung über die Verteilung zu aktualisieren, bevor wir entscheiden, wie viel im nächsten Zeitschritt zugeteilt werden soll. Dies führt einen Belief-Zustand ein, der die Zeitperioden miteinander verknüpft, genau so, wie es geschehen würde, wenn wir den übrig gebliebenen Bestand für die nächste Zeitperiode aufbewahren würden. Dies ist eine weitere Perspektive, die in klassischen Behandlungen des Zeitungsjungenproblems fehlt.

Diese Aspekte bieten eine beträchtliche Fülle für das, was immer noch ein recht einfaches und elegantes sequentielles Entscheidungsproblem ist.

## Einordnung des Problems

Die Antworten auf unsere drei Einordnungsfragen lauten:

- **Metriken:** Maximierung des erwarteten Umsatzes aus der Deckung der Nachfrage, abzüglich der Kosten für den Einkauf des Produkts, über einen Planungshorizont.
- **Entscheidungen:** Wie viel Produkt in jedem Zeitschritt eingekauft werden soll.
- **Unsicherheiten:** Die Nachfrage nach dem Produkt in jedem Zeitschritt.

## Erzählung

Es gibt eine breite Klasse von Problemen, bei denen es darum geht, eine Ressource zuzuteilen, um eine unsichere (und manchmal nicht beobachtbare) Nachfrage zu decken. Beispiele hierfür sind:

- Die Bevorratung eines verderblichen Bestands (z. B. frischer Fisch), um eine Nachfrage zu decken, bei der übrig gebliebener Bestand nicht für die Zukunft aufbewahrt werden kann.
- Die Bevorratung von Teilen für die Hochtechnologie-Fertigung (z. B. Düsentriebwerke), bei der wir Teile bestellen müssen, um eine bekannte Nachfrage zu decken, wobei die Teile jedoch möglicherweise nicht den geforderten Spezifikationen entsprechen und ausgesondert werden müssen. So müssen wir möglicherweise acht Teile bestellen, um eine Nachfrage von fünf zu decken, da mehrere der Teile möglicherweise nicht den geforderten technischen Spezifikationen entsprechen.
- Wir müssen Zeit für die Erledigung einer Aufgabe einteilen (etwa für die Fahrt zur Arbeit oder für die Zuteilung von Zeit zur Fertigstellung eines Projekts).
- Wir müssen jährliche Budgets für Aktivitäten wie Marketing zuteilen. Übrig gebliebene Mittel werden an das Unternehmen zurückgegeben.

Das einfachste Problem besteht darin, diese Entscheidungen zu treffen, um eine unsichere Nachfrage mit bekannter Verteilung zu decken, aber die häufigsten Anwendungen betreffen Verteilungen, die unbekannt sind und erlernt werden müssen. Es können weitere Informationen vorliegen, etwa die Verfügbarkeit von Nachfrageprognosen, sowie dynamische Informationen wie der Marktpreis für den frischen Fisch (der vor der Ressourcenentscheidung bekannt oder unbekannt sein kann).

Dieses Problem wird seit den 1950er Jahren umfassend untersucht, ursprünglich bekannt als das „Einperioden-Bestandsproblem", heute jedoch hauptsächlich als „Zeitungsjungenproblem" bezeichnet. Es wird häufig als das kanonische Problem der Optimierung unter Unsicherheit verwendet.

Das Zeitungsjungenproblem wird typischerweise formuliert als

$$
\begin{align}
\max_x \E F(x,W) = \E \big(p\min\{x,W\} - cx\big), \label{eq:newsvendorasymptotic}
\end{align}
$$

wobei $x$ unsere Entscheidungsvariable ist, die die Menge der Ressource zur Deckung der Nachfrage bestimmt, und wobei $W$ die unsichere Nachfrage nach der Ressource ist. Wir nehmen an, dass wir unsere Ressource zu einem Stückkostensatz von $c$ „einkaufen" und den kleineren Wert von $x$ und $W$ zu einem Preis $p$ verkaufen (von dem wir annehmen, dass er größer ist als $c$). Die in Gleichung $\eqref{eq:newsvendorasymptotic}$ angegebene Zielfunktion wird als *asymptotische* Form des Zeitungsjungenproblems bezeichnet.

Es gibt zwei wichtige Varianten des Zeitungsjungenproblems:

- Die Verteilung der Zufallsvariable $W$ ist bekannt.
- Die Verteilung von $W$ ist unbekannt.

Der unbekannte Fall tritt in der Praxis häufiger auf, was die Dimension einführt, dass wir bei jeder Ausführung einer Iteration der Wahl von $x$ und der anschließenden Beobachtung des kleineren Wertes von $x$ und $W$ etwas über die Verteilung von $W$ lernen.

Wäre $W$ deterministisch (und wenn $p > c$), so lässt sich leicht überprüfen, dass die Lösung $x = W$ lautet. Stellen wir uns nun vor, dass $W$ eine Zufallsvariable mit Wahrscheinlichkeitsverteilung $f^W(w)$ ist ($W$ kann diskret oder stetig sein). Sei $F^W(w) = Prob[W \leq w]$ die kumulative Verteilung von $W$. Ist $W$ stetig, und könnten wir $F(x) = \E F(x,W)$ berechnen, so würde die optimale Lösung $x^\ast $ folgender Gleichung genügen

$$
\left.\frac{d F(x)}{dx}\right\vert _{x=x^\ast } = 0.
$$

Betrachten wir nun das, was als *stochastischer Gradient* bekannt ist, bei dem wir die Ableitung von $F(x,W)$ unter der Annahme bilden, dass wir $W$ kennen, gegeben durch

$$
\begin{align}
\frac{d F(x,W)}{dx} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases} \label{eq:newsvendorstochasticgradient}
\end{align}
$$

Dies ist ein Gradient (das heißt eine Ableitung) von $F(x,W)$ bei gegebener Zufallsvariable $W$, der „stochastisch" ist, weil er von der Zufallsvariable $W$ abhängt, die erst offenbart wird, nachdem wir $x$ gewählt haben. Aus diesem Grund wird $d F(x,W)/dx$ in Gleichung $\eqref{eq:newsvendorstochasticgradient}$ als „stochastischer Gradient" bezeichnet.

Bildet man die Erwartungswerte auf beiden Seiten von $\eqref{eq:newsvendorstochasticgradient}$, so ergibt sich

$$
\begin{align*}
\E \frac{d F(x,W)}{dx} &= (p-c) Prob[x \leq W] - c Prob[x > W] \\
&= (p-c) (1-F^W(x)) - c F^W(x) \\
&= (p-c) - pF^W(x) \\
&= 0 \quad \text{for } x = x^\ast .
\end{align*}
$$

Wir können nun nach $F^W(x^\ast )$ auflösen, was ergibt

$$
F^W(x^\ast ) = \frac{p-c}{p}.
$$

Wenn also $c$ gegen 0 abnimmt, wollen wir eine Menge $x^\ast $ bestellen, die die Nachfrage mit Wahrscheinlichkeit 1 befriedigt. Nähert sich $c$ $p$ an, so wird die optimale Bestellmenge die Nachfrage mit einer Wahrscheinlichkeit befriedigen, die sich 0 annähert.

Das bedeutet, dass wir $(p-c)/p$ berechnen, eine Zahl zwischen 0 und 1, und dann die Menge $x^\ast $ finden, die der Bestellmenge entspricht, bei der die Wahrscheinlichkeit, dass die zufällige Nachfrage kleiner ist als $x^\ast $, gleich $(p-c)/p$ ist.

Wir haben nun zwei Situationen gesehen, in denen wir die Bestellmenge exakt bestimmen können: wenn wir $W$ im Voraus kennen (dies könnten wir die perfekte Prognose nennen) oder wenn wir die Verteilung von $W$ kennen. Dieses Ergebnis ist seit den 1950er Jahren bekannt und hat eine Reihe von Arbeiten angeregt, die die Verteilung von $W$ aus beobachteten Daten schätzen und die Situation behandeln, in der wir $W$ nicht direkt beobachten können, wenn $x < W$ (das heißt, wir beobachten nur Verkäufe statt Nachfrage, eine Situation, die als „zensierte Nachfrage" bekannt ist).

Wir werden uns nun dem Problem widmen, bei dem die Nachfrageverteilung unbekannt ist. Unser Ansatz besteht darin, einen sequentiellen Suchalgorithmus zu verwenden, gegeben durch

$$
\begin{align}
x^{n+1} = \max\left\{0,x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n} \right\},  \label{eq:stochasticgradientalgorithm}
\end{align}
$$

wobei $\alpha_n$ als *Schrittweite* bezeichnet wird. Unsere Herausforderung wird darin bestehen, $\alpha_n$ bei jeder Iteration zu wählen.

## Grundmodell

### Zustandsvariablen

Die Zustandsvariable erfasst die Information, die wir zum Zeitpunkt $n$ besitzen und die wir zusammen mit der Politik und der exogenen Information benötigen, um den Zustand zum Zeitpunkt $n+1$ zu berechnen. Für unser Suchverfahren in Gleichung $\eqref{eq:stochasticgradientalgorithm}$ ist unsere Zustandsvariable gegeben durch

$$
S^n = (x^n).
$$

### Entscheidungsvariablen

Der Knackpunkt bei diesem Problem besteht darin, die Entscheidungsvariable zu erkennen. Es liegt nahe zu denken, dass $x^n$ die Entscheidung ist, aber im Kontext dieses Algorithmus ist die eigentliche Entscheidung die Schrittweite $\alpha_n$. Wie bei all unseren sequentiellen Entscheidungsproblemen wird die Entscheidung (das heißt die Schrittweite) durch das bestimmt, was typischerweise als Schrittweitenregel bezeichnet wird, manchmal aber auch als Schrittweitenpolitik, die wir mit $\alpha^\pi(S^n)$ bezeichnen.

Normalerweise führen wir Politiken erst später ein, aber um das Verständnis des Modells zu erleichtern, werden wir mit einer grundlegenden Schrittweitenpolitik beginnen, die als *harmonische Schrittweitenregel* bezeichnet wird, gegeben durch

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

Dies ist eine einfache deterministische Schrittweitenregel, das heißt, wir kennen die Schrittweite $\alpha_n$ bereits im Voraus, sobald wir $n$ kennen. Im Folgenden führen wir eine interessantere stochastische Schrittweitenpolitik ein, die eine reichhaltigere Zustandsvariable erfordert.

Wir lassen außerdem $X^\pi(S^n)$ den Wert von $x^n$ sein, der durch die Schrittweitenpolitik $\alpha^\pi(S^n)$ bestimmt wird.

### Exogene Information

Die exogene Information ist die zufällige Nachfrage $W^{n+1}$ nach der Ressource (Produkt, Zeit oder Geld), die wir mit unserem Angebot an Produkt $x^n$ zu decken versuchen. Wir können annehmen, dass wir $W^{n+1}$ direkt beobachten, oder wir beobachten lediglich, ob $x^n \leq W^{n+1}$ oder $x^n > W^{n+1}$ gilt.

### Übergangsfunktion

Die Übergangsgleichung, für den Fall, dass $x$ unbeschränkt ist, ist gegeben durch

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n}.  \label{eq:stochasticgradientaltransition1}
\end{align}
$$

Wir bemerken, dass es möglich ist, dass Gleichung $\eqref{eq:stochasticgradientaltransition1}$ einen Wert $x^{n+1} < 0$ liefert, der nicht umgesetzt werden kann. Die Abhilfe hierfür ist einfach: Wir setzen lediglich $x^{n+1} = 0$.

### Zielfunktion

Bei jeder Iteration erhalten wir einen Nettonutzen, gegeben durch

$$
F(x^n,W^{n+1}) = p\min\{x^n,W^{n+1}\} - cx^n.
$$

Nun müssen wir eine Zielfunktion konstruieren, um die beste Politik zu finden. Wir können diese Problemstellung auf zwei Arten angehen. Bei der ersten nehmen wir an, dass wir im Feld lernen müssen, während die zweite davon ausgeht, dass wir Zugriff auf einen Simulator zum Erlernen der Politik haben.

**Optimierung im Feld**

Wenn wir unsere Entscheidungen im Feld erleben, wollen wir die *kumulative Belohnung* über einen bestimmten Horizont maximieren. Das bedeutet, dass wir die beste Politik (was in diesem Zusammenhang die beste Schrittweitenregel bedeutet) finden müssen, indem wir

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} F(X^\pi(S^n\vert \theta),W^{n+1})\vert S^0\right\}. \label{eq:newsvendorobjectivecumulativereward}
\end{align}
$$

lösen, wobei $S^{n+1} = S^M(S^n,X^\pi(S^n),W^{n+1})$ die Entwicklung des Algorithmus beschreibt (zum Beispiel die durch Gleichung $\eqref{eq:stochasticgradientaltransition1}$ gegebene Übergangsfunktion). Hierbei bezieht sich $\pi$ auf die Art der Schrittweitenregel (wir betrachten im Folgenden mehrere) sowie auf etwaige einstellbare Parameter (wie $\theta^{step}$).

Merkwürdigerweise beinhaltet die Geschichte hinter dem Zeitungsjungenproblem stets das Lernen im Feld, und dennoch wird die kumulative Belohnung in Gleichung $\eqref{eq:newsvendorobjectivecumulativereward}$ nie als Zielfunktion verwendet. Wir erwähnen dies für Leser, die eine Literaturrecherche zum „Zeitungsjungenproblem" durchführen.

**Optimierung mithilfe eines Simulators**

Alternativ könnten wir einen Simulator verwenden, bei dem wir unsere Suche über $N$ Iterationen laufen lassen und mit $x^N$ enden. Wir werden diese endgültige Lösung $x^{\pi,N}$ umbenennen, um die Abhängigkeit von der Schrittweitenpolitik $\alpha^\pi(S^n)$ auszudrücken.

Unsere endgültige Lösung $x^{\pi,N}$ ist eine Zufallsvariable, da sie von der Sequenz $W^1, \ldots, W^n$ abhängt. Wie zuvor lassen wir $\omega$ eine Stichprobenrealisierung von $W^1(\omega), \ldots, W^n(\omega)$ darstellen und schreiben unsere Lösung als $x^{\pi,N}(\omega)$, um anzuzeigen, dass dies die Lösung ist, die wir erhalten haben, als wir den Stichprobenpfad $\omega$ verwendet haben.

Da wir einen Simulator verwenden, interessiert uns nur die Leistung der endgültigen Lösung (auch als *finale Belohnung* bezeichnet), die wir schreiben als

$$
\begin{align}
F(x^{\pi,N},\What) = p\min\{x^{\pi,N},\What\} - cx^{\pi,N}, \label{eq:newsvendorxpiNobjective}
\end{align}
$$

wobei $\What$ eine Zufallsvariable ist, die wir zur Prüfung der Leistung von $x^{\pi,N}$ verwenden.

Das bedeutet, dass wir zwei Zufallsvariablen in unserer in $\eqref{eq:newsvendorxpiNobjective}$ gegebenen Zielfunktion haben. Für einen einzelnen Satz von Realisierungen von $W^1(\omega), \ldots, W^n(\omega)$ erhalten wir eine Lösung $x^{\pi,N}(\omega)$. Sei nun $\psi$ eine Stichprobenrealisierung von $\What$. Haben wir also eine Stichprobenrealisierung der Lösung $x^{\pi,N}(\omega)$ sowie eine Stichprobenrealisierung unserer Testvariable $\What(\psi)$, so wäre unsere Leistung

$$
\begin{align}
F(x^{\pi,N}(\omega),\What(\psi)) = p\min\{x^{\pi,N}(\omega),\What(\psi)\} - cx^{\pi,N}(\omega). \label{eq:newsvendorxpiNobjectivesample}
\end{align}
$$

Was wir eigentlich tun wollen, ist Mittelwerte über die möglichen Realisierungen sowohl von $x^{\pi,N}(\omega)$ als auch von $\What(\psi)$ zu bilden, was wir mithilfe von

$$
\begin{align}
\Fbar^\pi  = \frac{1}{N} \frac{1}{M} \sum_{\omega=1}^N \sum_{\psi=1}^M \left(p\min\{x^{\pi,N}(\omega^n),\What(\psi^m)\} - cx^{\pi,N}(\omega^n)\right). \label{eq:newsvendorxpiNobjectivesampleaverage}
\end{align}
$$

schreiben können. Die Schätzung $\Fbar^\pi$ stellt einen Durchschnitt über $N$ Stichproben der Sequenz $W^1(\omega), \ldots, W^n(\omega)$ sowie $M$ Stichproben der Testvariable $\What(\psi)$ dar.

## Modellierung der Unsicherheit

Sei $f^W(w)$ die Verteilung von $W$ (diese kann diskret oder stetig sein), mit kumulativer Verteilungsfunktion $F^W(w) = Prob[W \leq w]$. Wir könnten annehmen, dass die Verteilung mit einem unbekannten Parameter bekannt ist. Stellen wir uns beispielsweise vor, dass $W$ einer Poisson-Verteilung mit Mittelwert $\mu$ folgt, gegeben durch

$$
f^W(w) = \frac{\mu^w e^{-\mu}}{w!}, \quad w=0, 1, 2, \ldots.
$$

Wir dürfen annehmen, dass wir $\mu$ kennen; in diesem Fall könnten wir dieses Problem mit der analytischen Lösung lösen, die zu Beginn des Kapitels angegeben wurde. Nehmen Sie stattdessen an, dass $\mu$ unbekannt ist, aber mit einer bekannten Verteilung $p^\mu_k = Prob[\mu=\mu_k]$. Beachten Sie, dass diese Verteilung $p^\mu = (p^\mu_k)\_{k=1}^K$ in unserem Ausgangszustand $S^0$ modelliert würde.

## Entwurf von Politiken

Wir haben bereits zwei Auswahlmöglichkeiten für Schrittweitenpolitiken vorgestellt, die wir als $\alpha^\pi(S^n)$ schreiben, um unseren Stil an anderer Stelle für das Schreiben von Politiken nachzuahmen.

In der Literatur wurde eine Vielzahl von Schrittweitenpolitiken (oft auch Schrittweitenregeln genannt) vorgeschlagen. Eine der einfachsten und beliebtesten ist die harmonische Schrittweitenpolitik, die gegeben ist durch

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

Abbildung 3.1 veranschaulicht das Verhalten der harmonischen Schrittweitenregel für verschiedene Werte von $\theta^{step}$.

<figure class="book-figure">
  <img src="/assets/images/sdam/harmonicstepsizes.png" alt="Harmonic stepsizes for different values of theta-step." style="max-width: 420px;">
  <figcaption><span class="fig-num">Abbildung 3.1.</span> Harmonische Schrittweiten für verschiedene Werte von $\theta^{step}$.</figcaption>
</figure>

Die harmonische Schrittweitenpolitik wird auch als deterministische Politik bezeichnet, da wir ihren Wert für ein gegebenes $n$ im Voraus kennen. Die Herausforderung bei deterministischen Politiken besteht darin, dass sie sich nicht an die Daten anpassen können. Aus diesem Grund ist es oft sinnvoll, eine stochastische Regel zu verwenden. Eines der frühesten und einfachsten Beispiele ist Kestens Regel

$$
\alpha^{kesten}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+K^n-1},
$$

wobei $K^n$ ein Zähler ist, der zählt, wie oft der Gradient die Richtung gewechselt hat. Wir bestimmen dies, indem wir fragen, ob das Produkt (bzw. das innere Produkt, falls $x$ ein Vektor ist) $(\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0$. Wenn der Gradient die Richtung wechselt, bedeutet dies, dass wir uns in der Nähe des Optimums befinden und darüber hinausschießen, sodass wir die Schrittweite reduzieren müssen. Diese Formel wird geschrieben als

$$
\begin{align}
K^{n+1} = \begin{cases} K^n + 1 & \text{if } (\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0, \\ K^n & \text{otherwise,} \end{cases} \label{eq:kestenupdate}
\end{align}
$$

wobei $\nabla_x F(x^n,W^{n+1}) = \frac{d F(x,W^{n+1})}{dx}$.

Nun haben wir eine Schrittweite, die von einer Zufallsvariablen $K^n$ abhängt, weshalb wir sie eine stochastische Schrittweitenregel nennen. Wenn wir Kestens Regel verwenden, müssen wir unsere Zustandsvariable modifizieren, um $K^n$ einzuschließen, was uns

$$
S^n = (x^n,K^n).
$$

ergibt. Wir müssen auch Gleichung $\eqref{eq:kestenupdate}$ zu unserer Übergangsfunktion hinzufügen.

Eine weitere Schrittweitenregel, bekannt als AdaGrad, eignet sich besonders gut, wenn $x$ ein Vektor mit Element $x_i,~i=1, \ldots, I$ ist. Um die Notation etwas zu vereinfachen, sei der stochastische Gradient bezüglich des Elements $x_i$ gegeben durch

$$
g^n_{i} = \nabla_{x_i} F(x^{n-1}, W^n).
$$

Erstellen Sie nun eine $I \times I$-Diagonalmatrix $G^n$, bei der das $(i,i)$-te Element $G^n_{ii}$ gegeben ist durch

$$
G^n_{ii}  = \sum_{m=1}^n (g^n_{i})^2.
$$

Wir setzen dann eine Schrittweite für die $i$-te Dimension mit

$$
\begin{align}
\alpha_{ni} = \frac{\theta}{(G^n_{ii})^2 + \epsilon}, \label{eq:adagrad}
\end{align}
$$

wobei $\theta$ ein einstellbarer Parameter ist (vergleichbar mit $\theta^{step}$ in unserer harmonischen Schrittweitenformel) und $\epsilon$ eine kleine Zahl ist (z. B. $10^{-8}$, um die Möglichkeit einer Division durch Null zu vermeiden).

Abbildung 3.2 veranschaulicht unterschiedliche Konvergenzraten für verschiedene Schrittweitenregeln und zeigt $F(x^n,W^{n+1})$ als Funktion der Anzahl der Iterationen. Wenn wir die endgültige Belohnung in $\eqref{eq:newsvendorxpiNobjectivesampleaverage}$ optimieren würden, könnten wir einfach die Linie auswählen, die am höchsten liegt, was vom Budget $N$ abhängt. Wenn wir die kumulative Belohnung in Gleichung $\eqref{eq:newsvendorobjectivecumulativereward}$ optimieren, müssen wir uns auf die Fläche unter der Kurve konzentrieren, was eine schnelle anfängliche Konvergenz begünstigt.

<figure class="book-figure">
  <img src="/assets/images/sdam/newsvendorconvergence.png" alt="Plot of F(x^n, W^n+1) for different stepsize rules, illustrating different rates of convergence." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 3.2.</span> Diagramm von $F(x^n,W^{n+1})$ für verschiedene Schrittweitenregeln, das unterschiedliche Konvergenzraten veranschaulicht.</figcaption>
</figure>

## Erweiterungen

**1)** Stellen Sie sich vor, wir kennen $\mu$ nicht, aber nehmen wir an, dass $\mu$ einen der Werte $(\mu_1, \mu_2, \ldots, \mu_K)$ annehmen kann. Sei $H^n$ die Historie der Beobachtungen bis zum $n$-ten Experiment, und sei $H^0$ die anfängliche leere Historie. Wir nehmen an, dass wir mit einer anfänglichen Prior-Wahrscheinlichkeit auf $\mu$ beginnen, die wir schreiben als

$$
p^0_k = Prob[\mu = \mu_k\vert H^0].
$$

Nachdem wir $W^1, \ldots, W^n$ beobachtet haben, würden wir unsere aktualisierte Verteilung schreiben als

$$
p^n_k = Prob[\mu = \mu_k\vert H^n].
$$

Wir können $p^n = (p^n_k)\_{k=1}^K$ mithilfe des Satzes von Bayes aktualisieren

$$
\begin{align}
p^{n+1}_k &= Prob[\mu=\mu_k\vert W^{n+1}=w,H^n] \\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k,H^n]Prob[\mu=\mu_k\vert H^n]}{Prob[W^{n+1}=w\vert H^n]}\\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k}{Prob[W^{n+1}=w\vert H^n]},
\end{align}
$$

wobei

$$
Prob[W^{n+1}=w\vert H^n] = \sum_{k=1}^K Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k.
$$

Mit dieser Erweiterung des Grundmodells haben wir zwei Wahrscheinlichkeitsverteilungen: den Belief über den wahren Mittelwert $\mu$ und die zufällige Nachfrage $W$ gegeben $\mu$. Um diese Erweiterung einzubeziehen, müssten wir $p^n$ in unsere Zustandsvariable einfügen, sodass wir schreiben würden

$$
S^n = (x^n, p^n).
$$

**2)** Stellen Sie sich vor, unser Problem besteht darin, eine Ware (wie Öl oder Erdgas) im Monat $n$ zu kaufen, um sie während des Monats $n+1$ zu verwenden. Wir kaufen die Ware zu einem Stückkostensatz $c$ und verkaufen sie bis zu einer unbekannten Nachfrage $D^{n+1}$ zu einem unbekannten Preis $p^{n+1}$. Wir würden unsere Zielfunktion für dieses Problem schreiben als

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^{n+1} \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension1}
\end{align}
$$

## Was haben wir gelernt?

- Wir haben den Kontext eines Newsvendor-Problems verwendet, um einen stochastischen Gradientenalgorithmus als sequentielles Entscheidungsproblem zu veranschaulichen. Wir haben gezeigt, wie man einen stochastischen Gradientenalgorithmus mithilfe der fünf Elemente eines sequentiellen Entscheidungsproblems modelliert, die in [Kapitel 1](/sdam/de/chapter-1/) eingeführt wurden.
- Wir haben mehrere Beispiele für PFA-Politiken zur Auswahl der Schrittweiten vorgestellt.
- Das Newsvendor-Problem wird klassisch als statisches Problem formuliert, bei dem wir nach der besten Lösung suchen, wobei wir nur an der Leistung unserer endgültigen Wahl von $x$ interessiert sind. In diesem Kapitel haben wir zwei Zielfunktionen eingeführt: die *kumulative Belohnung* für Online-Lernen (Optimierung) im Feld und die *endgültige Belohnung*, wenn wir einen Simulator verwenden würden, um die beste Lernpolitik zu entwerfen.
- Wir führen die Idee ein, eine Wahrscheinlichkeitsverteilung (in diesem Fall eine Poisson-Verteilung) für die zufällige Nachfrage nach Produkten zu verwenden, wobei der Mittelwert der Poisson-Verteilung selbst eine Zufallsvariable ist.
- Wir führen die Erweiterung des adaptiven Erlernens der Wahrscheinlichkeitsverteilung für den Mittelwert der Poisson-Verteilung ein.
- Wir führen auch das Thema ein, die Entscheidung $x_t$ von anderen Zustandsvariablen wie dem Preis $p_t$ abhängig zu machen. Dies entspricht der Erstellung einer Politik $X^\pi(S_t)$, bei der der Zustand $S_t$ (in diesem Kontext) vom Preis $p_t$ abhängt. Dies ist ein bedeutender Wandel im Denken über das Newsvendor-Problem, fällt aber in dieselbe Klasse wie alle unsere sequentiellen Entscheidungsprobleme.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was ist die Entscheidungsvariable für unseren sequentiellen Suchalgorithmus?</li>
<li>Geben Sie Beispiele für die Suche über Klassen von Politiken (geben Sie zwei Beispiele an) und die einstellbaren Parameter für jede Klasse von Politik.</li>
<li>Schreiben Sie auf, was mit einer <em>kumulativen Belohnungs</em>-Zielfunktion und einer <em>endgültigen Belohnungs</em>-Zielfunktion gemeint ist.</li>
<li>Wenn Sie bei der Suche über den einstellbaren Parameter $\theta^{step}$ für die harmonische Schrittweitenregel vorgehen, wie würden Sie einschätzen, dass der optimale Wert von $\theta^{step}$, der mithilfe einer kumulativen Belohnung ermittelt wurde, im Vergleich zum optimalen Wert bei Verwendung einer endgültigen Belohnung abschneidet?</li>
<li>Nehmen Sie an, dass wir die Verteilung der Nachfrage $W$ nicht kennen, und argumentieren Sie, warum es keinen Sinn ergibt, das optimale $x^\ast $ in einem Simulator zu finden. Angesichts dessen ist es sinnvoller, den Simulator zu verwenden, um die Lernpolitik zu optimieren. Wenn wir einen Simulator verwenden, um die Lernpolitik zu optimieren, welche Zielfunktion wäre für diese Lernübung angemessen?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Ein großes Industriegasunternehmen muss einen Monat im Voraus Verträge für Elektrizität mittels eines "Take-or-Pay"-Vertrags abschließen. Wenn das Unternehmen sich verpflichtet, $x_t$ Megawattstunden für den Monat $t+1$ zu kaufen, zahlt es einen Preis $p_t$, unabhängig davon, ob es den Strom benötigt oder nicht. Wenn jedoch die Last (Nachfrage) $L_{t+1}$ im Monat $t+1$ $x_t$ übersteigt, muss das Unternehmen Strom zu einem Spotpreis $p^{spot}_{t+1}$ vom Netz kaufen. Die Kosten zur Deckung der Last im Monat $t+1$ betragen dann

$$
C(S_t,W_{t+1}) = p_t x_t + p^{spot}_{t+1} \max\{0, L_{t+1}-x_t\}.
$$

Wir können die verschiedenen Preise und Lasten beobachten, kennen aber ihre Wahrscheinlichkeitsverteilung nicht. Unser Ziel ist es, die Kosten über ein Jahr zu minimieren.

Nehmen Sie an, dass $x_t$ diskret ist mit Werten $x_1, \ldots, x_M$. Sei $(\mubar_{tx}, \beta_{tx})$ der Mittelwert und die Präzision unserer Schätzung von $\E C(S_t,W_{t+1})$, und nehmen Sie an, dass wir eine Politik namens *Intervallschätzung*, $X^{IE}(S_t\vert \theta)$, verwenden, um $x_t$ zu wählen:

$$
X^{IE}(S_t\vert \theta^{IE}) = \argmin_x \left(\mubar_{tx} - \theta^{IE} \sqrt{\frac{1}{\beta_{tx}}}\right).
$$

  <ol type="a">
    <li>Geben Sie die Zustandsvariable $S_t$ und die exogene Information $W_{t+1}$ an.</li>
    <li>Schreiben Sie die Zielfunktion, um $\theta^{IE}$ zur Minimierung der kumulativen Kosten über ein Jahr zu finden. Zeigen Sie den Erwartungswert über jede Zufallsvariable, indem Sie die Zufallsvariable als Index des Erwartungswertoperators schreiben (wie in $\E_Y$). Zeigen Sie dann, wie man den Erwartungswert als Simulation schreibt, unter der Annahme, dass Sie $K$ Stichproben jeder Zufallsvariable haben.</li>
    <li>Geben Sie die Formel zur Bestimmung des Gradienten der Zielfunktion in (b) mithilfe einer numerischen Ableitung an, und schreiben Sie einen stochastischen Gradientenalgorithmus zur Ermittlung eines guten Wertes von $\theta$ innerhalb von $N$ Iterationen.</li>
    <li>Nehmen Sie nun an, dass sich die Preise gemäß $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2}$ entwickeln. Was ist nun die Zustandsvariable, und wie erschwert das Hinzufügen von Dimensionen zur Zustandsvariable das Problem, das obige optimale $\eta$ zu finden?</li>
  </ol>
</li>
<li>Betrachten Sie die obige Erweiterung 2, bei der sich der Preis $p$ nun mit den Iterationen ändert und bei der der Preis, den wir zum Zeitpunkt $n$ erhalten, zum Zeitpunkt $n$ nicht bekannt ist, sodass wir ihn mit $p^{n+1}$ bezeichnen. Nehmen Sie vorerst an, dass $p^{n+1}$ unabhängig von $p^n$ ist, und dass $D^{n+1}$ unabhängig von $D^n$ ist.
  <ol type="a">
    <li>Geben Sie für das Modell in Gleichung $\eqref{eq:newsvendorextension1}$ die Zustandsvariable $S^n$ und die exogene Informationsvariable $W^n$ an.</li>
    <li>Geben Sie den stochastischen Gradientenalgorithmus für dieses Problem an, und zeigen Sie, dass er im Wesentlichen derselbe ist wie derjenige, bei dem der Preis konstant war.</li>
  </ol>
</li>
<li>Erweitern Sie Übung 7, nehmen Sie aber nun an, dass sich die Preise gemäß

$$
p^{n+1} = \eta_0 p^n + \eta_1 p^{n-1} + \eta_2 p^{n-2} + \varepsilon^{n+1}
$$

entwickeln, wobei $\varepsilon^{n+1}$ ein Rauschterm mit Mittelwert 0 ist, der unabhängig vom Preisprozess ist.
  <ol type="a">
    <li>Geben Sie für das Modell in Gleichung $\eqref{eq:newsvendorextension1}$ die Zustandsvariable $S^n$ und die exogene Informationsvariable $W^n$ an.</li>
    <li>Geben Sie den stochastischen Gradientenalgorithmus für dieses Problem an.</li>
  </ol>
</li>
<li>Nehmen Sie nun an, dass unser Ziel darin besteht, zu optimieren

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^n \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension2}
\end{align}
$$

Der einzige Unterschied zwischen den Gleichungen $\eqref{eq:newsvendorextension2}$ und $\eqref{eq:newsvendorextension1}$ besteht darin, dass wir nun den Preis $p^n$ sehen können, *bevor* wir unsere Entscheidung $x^n$ treffen. Wir wissen dies anhand der Indizierung des Preises.
  <ol type="a">
    <li>Geben Sie für das Modell in Gleichung $\eqref{eq:newsvendorextension2}$ die Zustandsvariable $S^n$ und die exogene Informationsvariable $W^n$ an.</li>
    <li>Geben Sie den stochastischen Gradientenalgorithmus für dieses Problem an. Im Gegensatz zum vorherigen Problem wird dieser Gradient eine Funktion von $p^n$ sein.</li>
  </ol>

Die Situation, in der der Gradient vom Preis $p^n$ abhängt, ist eine ziemlich bedeutende Komplikation. Was hier passiert, ist, dass wir anstatt zu versuchen, eine optimale Lösung $x^\ast $ (oder genauer gesagt $x^{\pi,N}$) zu finden, versuchen, eine Funktion $x^{\pi,N}(p)$ zu finden.

Der Trick besteht hier darin, eine funktionale Form für $x^{\pi,N}(p)$ zu wählen. Wir schlagen zwei Alternativen vor:

**Nachschlagetabelle** – Selbst wenn $p$ kontinuierlich ist, können wir es in eine Reihe diskreter Preise $p_1, \ldots, p_K$ diskretisieren, wobei wir den Wert $p_k$ wählen, der einem Preis $p^n$ am nächsten liegt. Nennen wir diesen Preis $p^n_k$. Denken Sie nun an einen stochastischen Gradientenalgorithmus, der indiziert ist durch das $p_k$, das $p^n$ am nächsten liegt. Wir verwenden dann den stochastischen Gradienten, um $x^n(p^n_k)$ zu aktualisieren mit

$$
x^{n+1}(p^n_k) = x^n(p^n_k) + \alpha_n \nabla_x F^n(x^n,W^{n+1}).
$$

Natürlich möchten wir $p$ nicht zu fein diskretisieren. Wenn wir Preise beispielsweise in 100 Bereiche diskretisieren, bedeutet dies, dass wir versuchen, 100 Bestellmengen $x^{\pi,N}(p)$ zu finden, was ziemlich schwierig wäre.

**Parametrisches Modell** – Stellen Sie sich nun vor, dass wir denken, die Bestellmenge $x^{\pi,N}(p)$ als parametrische Funktion darstellen zu können

$$
\begin{align}
x^{\pi,N}(p\vert \theta) = \theta_0 + \theta_1 p + \theta_2 p^{\theta_3}. \label{eq:parametricorderquantity}
\end{align}
$$

Wenn wir eine solche parametrische Funktion verwenden, versuchen wir nicht mehr, die Bestellmenge $x^{\pi,N}$ zu finden; stattdessen versuchen wir, $\theta$ zu finden, das die Funktion bestimmt (in diesem Fall $\eqref{eq:parametricorderquantity}$). Unser stochastischer Gradientenalgorithmus wird nun zu

$$
\begin{align*}
\theta^{n+1} &= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d \theta} \\
&= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta},
\end{align*}
$$

Denken Sie daran, dass $\theta^n$ ein Spaltenvektor mit vier Elementen ist, während $x^n$ ein Skalar ist. Die erste Ableitung ist unser ursprünglicher stochastischer Gradient

$$
\frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases}
$$

Die zweite Ableitung wird direkt aus der Politik $\eqref{eq:parametricorderquantity}$ berechnet, die gegeben ist durch

$$
\frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta} = \begin{pmatrix} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_0} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_1} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_2} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_3} \end{pmatrix} = \begin{pmatrix} 1 \\ p^n \\ (p^n)^{\theta_3} \\ \theta_2(p^n)^{\theta_3} \ln{p^n} \end{pmatrix}.
$$

Die Verwendung des parametrischen Modells kann sehr effektiv sein, wenn die parametrische Form mit der wahren Form der Funktion übereinstimmt $x^{\pi,N}(p)$. Die Repräsentation als Lookup-Tabelle ist allgemeiner, was ein Vorteil sein kann, aber wenn die Diskretisierung zu fein ist, dann wird eine wesentlich größere Anzahl von Iterationen benötigt, um das Problem zu lösen.

Vor diesem Hintergrund betrachten Sie die folgenden drei Erweiterungen:</li>
<li>Kehren Sie zur Zielfunktion in Gleichung $\eqref{eq:newsvendorextension1}$ zurück, bei der der Preis erst nach der Bestellentscheidung offengelegt wird, wobei $p^{n+1}$ nun von der Historie abhängt, wie in

$$
p^{n+1} = p^n + \varepsilon^{n+1}.
$$

Diskutieren Sie, wie Sie dieses Problem angehen würden, ausgehend von dem, was wir oben dargestellt haben.</li>
<li>Wiederholen Sie Übung 10, aber nehmen Sie nun an, dass

$$
p^{n+1} = 0.5 p^n + 0.5 p^{n-1} + \varepsilon^{n+1}.
$$</li>
<li>Wiederholen Sie Übung 10, aber nun wird die Menge $x^n$ unter der Nebenbedingung $0 \leq x \leq R^n$ gewählt, wobei

$$
R^{n+1} = \max\{0, R^n + x^n - W^{n+1}\},
$$

und wobei der Preis $p=p^n$ offengelegt wird, bevor wir eine Entscheidung treffen. Mit diesem Übergang wird unser Problem zu einem traditionellen Bestandsproblem.</li>
<li>Ein Flexible Spending Account (FSA) ist ein Buchhaltungsinstrument, das es Menschen ermöglicht, Geld vor Steuern zurückzulegen, um medizinische Ausgaben zu decken. Sie müssen festlegen, wie viel Ihnen im Jahr $t+1$ zur Verfügung stehen soll, und zwar am Ende des Jahres $t$. Die Herausforderung besteht darin, dass Sie, wenn Sie zu viel auf das Konto einzahlen, den übrigbleibenden Betrag verlieren.

Sei $M_{t+1}$ Ihre medizinischen Ausgaben im Jahr $t+1$, und sei $x_t$ der Betrag, den Sie am Ende des Jahres $t$ für das Jahr $t+1$ zuweisen. Sei $r$ Ihr Grenzsteuersatz, wobei $0 < r < 1$. Ihre Gesamtausgaben im Jahr $t+1$ ergeben sich aus

$$
C(x_t,M_{t+1}) = x_t + \frac{1}{1-r}\max\{0,M_{t+1} - x_t\}.
$$

Sie möchten einen stochastischen Gradientenalgorithmus der Form

$$
x_{t+1} = x_t + \alpha_t \gbar_{t+1},
$$

verwenden, wobei

$$
\gbar_{t+1} = (1-\eta)\gbar_t + \eta \frac{dC(x_t,M_{t+1})}{dx_t}
$$

und wobei $0 < \eta < 1$ ein Glättungsfaktor ist. Verwenden Sie für die Schrittweite

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + K_t -1},
$$

wobei $K_t$ zählt, wie oft die Ableitung der Kostenfunktion das Vorzeichen gewechselt hat. Das heißt

$$
K_{t+1} = \begin{cases} K_t +1 & \text{if } \frac{dC(x_t,M_{t+1})}{dx_t} \frac{dC(x_{t-1},M_t)}{dx_{t-1}} < 0. \\ K_t & \text{otherwise.} \end{cases}
$$

Ihre Aufgabe besteht darin, den Schrittweitenparameter $\theta^{step}$ und den Glättungsparameter $\eta$ zu bestimmen, indem Sie dieses Problem als sequentielles Entscheidungsproblem formulieren. Nehmen Sie an, dass Sie Zugriff auf einen Simulator haben, um die Leistung der Schrittweitenregel zu bewerten.

Wir werden zunächst die optimale Lösung finden, unter der Annahme, dass wir die Verteilung von $M_{t+1}$ kennen:
  <ol type="a">
    <li>Was ist $\frac{dC(x_t,M_{t+1})}{dx_t}$? Denken Sie daran, dass dies berechnet wird, nachdem $M_{t+1}$ bekannt wird.</li>
    <li>Finden Sie die optimale statische Lösung, indem Sie die Ableitung (aus Teil (a)) gleich null setzen und dann nach $x^\ast $ auflösen. Nehmen Sie an, dass die kumulative Verteilungsfunktion $F^M(m) = Prob(M_{t+1} \leq m)$ bekannt ist.</li>
  </ol>

Nun werden wir das sequentielle Lernproblem modellieren, wobei wir nicht annehmen, dass die Verteilung von $M_{t+1}$ bekannt ist:
  <ol type="a" start="3">
    <li>Was ist die Zustandsvariable für dieses dynamische System?</li>
    <li>Was ist(sind) die Entscheidungsvariable(n)?</li>
    <li>Was ist die exogene Information?</li>
    <li>Was ist die Übergangsfunktion? Denken Sie daran, dass Sie für jedes Element der Zustandsvariable eine Gleichung benötigen.</li>
    <li>Was ist die Zielfunktion? Worüber optimieren Sie?</li>
  </ol>
</li>
<li>Wir gehen davon aus, dass sich der Preis, zu dem wir unser Gas verkaufen, von Monat zu Monat ändert. Die monatliche Gewinnfunktion wäre gegeben durch

$$
F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t,
$$

wobei $D_{t+1}$ die Nachfrage nach Elektrizität (in Megawattstunden) für Monat $t + 1$ ist.

Nehmen Sie der Einfachheit halber an, dass sich der Preisprozess wie folgt entwickelt:

$$
p_{t+1} = \begin{cases} p_t - 1 & \text{with probability 0.2,} \\ p_t & \text{with probability 0.6,} \\ p_t + 1 & \text{with probability 0.1.} \end{cases}
$$

  <ol type="a">
    <li>Schreiben Sie die fünf Elemente des Modells, das Sie ursprünglich in Übung 15, Teil (a), angegeben haben, neu auf. Beachten Sie, dass Sie anstelle von $x_t$ nun nach $x_t(p_t)$ suchen. Das bedeutet, dass wir anstelle eines Skalars nun nach einer Funktion suchen.</li>
    <li>Wir werden zunächst $x_t(p_t)$ als Lookup-Tabellenfunktion darstellen, was bedeutet, dass wir $p_t$ in eine Menge diskreter Preise $(0, 1, 2, \ldots, 50)$ diskretisieren. Beschreiben Sie, ohne irgendeinen Code zu schreiben, die Schritte der Methode, die Sie verwenden würden, um die Funktion $x_t(p_t)$ zu schätzen (Ihre Beschreibung muss so sorgfältig sein, dass jemand daraus Code schreiben könnte). Vergleichen Sie die Komplexität dieses Problems mit dem Basismodell.</li>
    <li>Wiederholen Sie (b), aber approximieren Sie anstelle einer Lookup-Tabelle für $x_t(p_t)$ die funktionale Form der Politik mit Hilfe von

    $$
    x_t(p_t\vert \theta) = \theta_0 + \theta_1 p_t + \theta_2 \ln{p_t} + \theta_3 \exp{\{\theta_4 p_t\}}.
    $$

    Beschreiben Sie erneut die Schritte eines adaptiven Algorithmus, um $\theta$ zu finden.</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *AdaptiveMarketPlanning* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 14;">
<li>Ein bedeutendes Industriegasunternehmen, das Luft in flüssigen Sauerstoff und Stickstoff umwandelt, muss Verträge für Erdgas zur Stromerzeugung abschließen. Die Verträge liefern eine Gasmenge für den kommenden Monat, wobei der Vertrag einen Monat im Voraus unterzeichnet wird. Sei $W_{t+1}$ die Nachfrage nach Elektrizität (in Megawattstunden) für Monat $t+1$, und sei $x_t$ die Gasmenge, die zu Beginn des Monats $t$ festgelegt wird und im Monat $t + 1$ gekauft werden soll (wir hätten dies auch als $x_{t,t+1}$ indizieren können).

Nehmen Sie an, dass wir Gas (normalerweise gemessen in Einheiten von Millionen btu) zu einem Preis von ＄20 pro äquivalenter Megawattstunde (mwh) kaufen und es zu einem Preis von ＄26 pro äquivalenter mwh verkaufen (später werden wir Unsicherheit in diese Preise einführen).

Der Einfachheit halber nehmen wir an, dass die Zufallsvariablen $W_1,W_2, \ldots, W_t,$ stationär sind, was bedeutet, dass sie alle dieselbe Verteilung haben, die Verteilung jedoch unbekannt ist. Ihre Gewinne für Monat $t$ sind gegeben durch

$$
F_t(x_t,W_{t+1}) = p \min\{x_t,W_{t+1}\} - cx_t.
$$

Nehmen Sie ferner an, dass Sie einen stochastischen Gradientenalgorithmus zur Bestimmung der Bestellmengen $x_t$ verwenden werden, gegeben durch

$$
x_{t+1} = x_t + \alpha_t \nabla F_t(x_t,W_{t+1}).
$$

Nehmen Sie schließlich an, dass die Schrittweite gegeben ist durch

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + N_t - 1},
$$

wobei $N_t$ zählt, wie oft der Gradient das Vorzeichen wechselt. Wir schreiben die Aktualisierungsgleichung für $N_t$ mit Hilfe von

$$
N_{t+1} = \begin{cases} N_t + 1 & \text{if } \nabla F_{t-1}(x_{t-1},W_t)\nabla F_t(x_t,W_{t+1}) < 0, \\ N_t & \text{otherwise.} \end{cases}
$$

  <ol type="a">
    <li>Schreiben Sie die fünf Elemente des Modells für dieses Problem auf. Für die Zielfunktion wollen Sie die beste Politik (dies wird ein Algorithmus sein) finden, um den Gesamtgewinn aus Kauf und Verkauf von Erdgas über einen Horizont von $T = 24$ Monaten zu maximieren. Beachten Sie, dass sich die Suche über Politiken auf die Suche nach dem besten Wert von $\theta^{step}$ bezieht.</li>
    <li>Verwenden Sie das Python-Paket <em>AdaptiveMarketPlanning</em> unter <a href="https://tinyurl.com/sdagithub/">tinyurl.com/sdagithub</a>, um $\theta^{step} = (2,5,10,20,50)$ für das Modell in Teil (a) zu evaluieren.</li>
    <li>Wie würde sich Ihre Zielfunktion ändern, wenn Sie die terminale Belohnung anstelle der kumulativen Belohnung optimieren würden? Achten Sie darauf, den Erwartungswert in seiner verschachtelten Form aufzuschreiben (das heißt, mit einer Notation wie $\E_W$, wenn Sie einen Erwartungswert über $W$ bilden).</li>
    <li>Wiederholen Sie die Suche nach dem besten $\theta^{step}$ (unter Verwendung derselben Werte), aber verwenden Sie nun die Formulierung der finalen Belohnung, die Sie in Teil (c) angegeben haben.</li>
    <li>Nehmen Sie nun an, dass Ihre Zielfunktion gegeben ist durch

    $$
    F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t.
    $$

    wobei wir nun annehmen, dass wir unseren Vertrag für eine Menge $x_t$ abschließen müssen, ohne den Preis zu kennen, den wir für die Elektrizität erhalten werden, die wir auf dem Markt verkaufen. Stattdessen wird der Preis $p_{t+1}$ während des Monats $t + 1$ offengelegt. Wie würde sich diese Änderung auf Ihr Modell und Ihre Lösungsstrategie auswirken?</li>
  </ol>
</li>
</ol>
{% endraw %}
