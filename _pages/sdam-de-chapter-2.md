---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "## Kapitel 2: Ein Problem des Verkaufs eines Vermögenswerts"
permalink: /sdam/de/chapter-2/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 0243c062a31cf107
---


{% raw %}
## Kapitelüberblick

Das Problem des Verkaufs eines Vermögenswerts ist das einfachste unserer sequentiellen Entscheidungsprobleme und besteht rein aus einem stochastischen Preisprozess, bei dem wir entscheiden müssen, wann wir einen gehaltenen Vermögenswert verkaufen. Das Problem besteht darin zu bestimmen, wann der Vermögenswert verkauft werden soll, um den erwarteten erzielten Preis zu maximieren.

Dieses Problem ist weithin bekannt als *optimales Stoppproblem*, das normalerweise mit recht anspruchsvoller Mathematik ausgedrückt wird. Wir nutzen es, um einige grundlegende Politiken zu illustrieren, die in die erste unserer vier Klassen fallen, die Politik-Funktionsapproximationen (PFAs). Wir führen mehrere PFAs ein, von denen jede Abstimmungsparameter benötigt, um die besten Ergebnisse zu erzielen.

Diese Übung dient als einfache und elegante Illustration aller fünf Elemente des universellen Modellierungsrahmens.

## Erzählung

Wir halten ein Aktienpaket und suchen nach einem geeigneten Zeitpunkt zum Verkauf. Wir gehen zunächst davon aus, dass wir ein kleiner Marktteilnehmer sind, was bedeutet, dass es keine Rolle spielt, wie viele Aktien wir verkaufen, sodass wir annehmen, dass wir nur eine Aktie besitzen. Wenn wir zum Zeitpunkt $t$ verkaufen, erhalten wir einen Preis, der gemäß einem zufälligen Prozess über die Zeit variiert, obwohl wir nicht davon ausgehen, dass die Preise auf- oder abwärts tendieren. Sobald wir die Aktie verkaufen, stoppt der Prozess.

## Formulierung des Problems

Die Antworten auf unsere drei Rahmenfragen sind:

- **Metriken:** Maximierung des erwarteten Preises, den wir beim Verkauf des Vermögenswerts erhalten.
- **Entscheidungen:** Ob wir den Vermögenswert halten oder verkaufen sollen.
- **Unsicherheiten:** Der Verkaufspreis in zukünftigen Zeitperioden.

## Grundmodell

### Zustandsvariablen

Unser Prozess hat zwei Zustandsvariablen: den "physischen Zustand", der erfasst, ob wir den Vermögenswert noch halten oder nicht, und einen "Informationszustand", der für dieses Problem der Preis der Aktie ist.

Unser "physischer Zustand" ist gegeben durch

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

Wenn wir die Aktie verkaufen, erhalten wir den Preis pro Aktie von $p_t$. Das bedeutet, dass unsere Zustandsvariable ist

$$
S_t = (R^{asset}_t, p_t).
$$

### Entscheidungsvariablen

Die Entscheidungsvariable ist, ob die Aktie gehalten oder verkauft werden soll. Wir schreiben dies mit

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

In diesem Problem dürfen wir nur Aktien verkaufen, sodass wir der Einschränkung

$$
x_t \leq R^{asset}_t.
$$

folgen müssen. Wir werden unsere Politik $X^\pi(S_t)$ definieren, die festlegt, wie wir Entscheidungen treffen. An dieser Stelle führen wir die Notation für die Politik ein, verschieben aber das Design der Politik auf später. Das ist es, was wir meinen, wenn wir sagen, dass wir "zuerst modellieren, dann lösen".

### Exogene Information

Der einzige zufällige Prozess in unserem Grundmodell ist die Preisänderung. Es gibt zwei Möglichkeiten, dies zu schreiben. Eine besteht darin anzunehmen, dass die exogene Information die Preisänderung ist. Wir können dies schreiben als

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

Das bedeutet, dass sich unser Preisprozess gemäß

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

entwickelt. Wir würden dann unsere exogene Information $W_{t+1}$ schreiben als

$$
W_{t+1} = \phat_{t+1}.
$$

Die zweite Möglichkeit besteht darin anzunehmen, dass wir einfach den nächsten Preis beobachten, in diesem Fall würden wir schreiben

$$
W_{t+1} = p_{t+1}.
$$

### Übergangsfunktion

Die Übergangsfunktion besteht aus den Gleichungen, die beschreiben, wie sich der Zustand über die Zeit entwickelt. Die Übergangsgleichung für $R_t$ ist gegeben durch

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

wobei wir die Einschränkung haben, dass $x_t \leq R^{asset}\_t$, um sicherzustellen, dass wir den Vermögenswert nicht verkaufen, wenn wir ihn nicht mehr besitzen.

Als Nächstes müssen wir beschreiben, wie sich der Preisprozess über die Zeit entwickelt. Wenn wir die $\phat_t$-Notation verwenden, wäre die Übergangsfunktion für den Preis $p_t$ gegeben durch

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

Die Gleichungen $\eqref{eq:assetsellingR}$ und $\eqref{eq:assetsellingP}$ bilden das, was wir *Übergangsfunktion* nennen, die wir schreiben als

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

Wenn wir unsere Politik $X^\pi(S_t)$ verwenden, um Entscheidungen zu treffen, und wenn wir einen Stichprobenpfad $\omega$ wählen, der die Sequenz $W_1, W_2, \ldots, W_T$ bestimmt, dann können wir eine Simulation unseres Prozesses schreiben als

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

Beachten Sie, dass wir bei der Schreibweise der Sequenz Variablen nach ihrem Informationsgehalt indizieren. Zum Beispiel ist $S_0$ ein Ausgangszustand, und $x_0$ hängt nur von $S_0$ ab. Im Gegensatz dazu darf jede Variable, die mit $t$ indiziert ist, jedes der Ergebnisse unseres exogenen Prozesses $W_1, \ldots, W_t$ "sehen", darf jedoch $W_{t+1}$ nicht sehen.

### Zielfunktion

Wir schließen unser Modell mit einer Aussage zu unserer Zielfunktion ab, die dann die Grundlage für die Bewertung von Politiken bildet. Zunächst benötigen wir eine Leistungskennzahl, die für dieses Problem angibt, wie viel wir durch den Verkauf unserer Aktie verdienen. Wir können eine generische Beitragsfunktion definieren, die wir als $C(S_t,x_t)$ schreiben, welche gegeben ist durch

$$
C(S_t,x_t) = p_tx_t.
$$

In unserem Problem ist $x_t =0$, bis wir uns zum Verkauf entscheiden. Nehmen wir vorerst an, dass wir einen einzelnen diskreten Vermögenswert verkaufen (wir könnten uns dies so vorstellen, dass wir alle unsere Aktien auf einmal verkaufen). In diesem Fall würden wir beim Verkauf $x_t = 1$ setzen, was genau einmal über unseren Horizont geschieht. Wir schreiben die Abhängigkeit von $C(S_t,x_t)$, um die Abhängigkeit vom Zustand zu erfassen, die auf das Vorhandensein des Preises $p_t$ zurückzuführen ist.

Wir wollen nun unser Optimierungsproblem formulieren. Wenn uns die Preise im Voraus gegeben wären, würden wir schreiben

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

wobei wir die Einschränkungen

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

auferlegen würden. Das ist in Ordnung, wenn das Problem deterministisch ist, aber wie modellieren wir das Problem, um die Unsicherheit in den Preisen zu berücksichtigen? Was wir tun, ist uns vorzustellen, dass wir eine Politik entlang eines Stichprobenpfads $\omega$ von Preisen $p_1(\omega), p_2(\omega), \ldots$ simulieren. Mit einer Politik $\pi$ würden wir dann eine Reihe von Zuständen erzeugen mit

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

Wir schreiben $S_t(\omega)$, um die Abhängigkeit vom Stichprobenpfad auszudrücken. Wir hätten auch $S^\pi_t(\omega)$ schreiben können, um die Abhängigkeit von der Politik $\pi$ auszudrücken, aber wir unterdrücken die Abhängigkeit von der Politik in der Regel aus Gründen der Einfachheit.

Wenn wir der Politik $\pi$ entlang dieses Stichprobenpfads folgen, können wir die Leistung berechnen mit

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

Dies gilt für einen einzelnen Stichprobenpfad. Beachten Sie, dass wir für jeden Stichprobenpfad aus der Politik $x_t(\omega) = X^\pi(S_t(\omega))$ eine Reihe von Entscheidungen $x_t(\omega)$ erhalten. Diese Notation vermittelt, dass $x_t$ eine Zufallsvariable ist, die vom Stichprobenpfad $\omega$ abhängt. Für jeden Stichprobenpfad erhalten wir weiterhin $\sum_{t=0}^{T-1} x_t(\omega) =1$, was der obigen Einschränkung für die deterministische Version des Problems entspricht. Es gibt einen Zeitpunkt $\tau(\omega)$, der der Zeitpunkt ist, zu dem $x_t(\omega)=1$ für $t=\tau(\omega)$ gilt. Dieser Zeitpunkt wird als *Stoppzeit* für dieses Problem des Verkaufs eines Vermögenswerts bezeichnet.

Wir können über eine Stichprobe von $N$ Stichproben $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ simulieren und einen Durchschnitt bilden mit

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

Schließlich formulieren wir das Optimierungsproblem im Hinblick auf das Finden der besten Politik, das wir schreiben können als

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

Wir werden sehen, dass das durch $\eqref{eq:maxpifbarasset}$ formulierte Optimierungsproblem, bei dem wir gerne die optimale Politik finden würden, primär aspirativ ist. Während wir sicherlich die optimale Politik anstreben, werden wir uns typischerweise mit der besten Politik zufriedengeben, die wir finden (und berechnen) können.

In der Praxis verwenden wir typischerweise Durchschnittswerte wie in Gleichung $\eqref{eq:assetsellingfbarpi}$ für unser Optimierungsproblem. Dies ist jedoch lediglich eine Näherung für die tatsächliche Bildung eines Erwartungswerts, den wir schreiben als

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

Nach Konvention lassen wir beim Schreiben des Erwartungswerts die Indizierung von $\omega$ weg und betrachten stattdessen $\Fhat^\pi$ als Zufallsvariable, während $\Fhat^\pi(\omega)$ als Stichprobenrealisierung behandelt wird (dies ist eine Standardnotation in der Gemeinschaft der stochastischen Modellierung, also gewöhnen Sie sich einfach daran).

Mit unserem Erwartungswertoperator würden wir unsere Zielfunktion schreiben als

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

Häufig werden wir unsere Zielfunktion schreiben als

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

Die Form in Gleichung $\eqref{eq:assetsellingobjective}$ (oder $\eqref{eq:assetsellingfpiexpectation}$ oder $\eqref{eq:assetsellingexpectedsum}$) ist schön und kompakt. Man muss sich nur daran erinnern, dass es fast nie der Fall ist, dass wir den Erwartungswert tatsächlich berechnen können, sodass wir uns im Allgemeinen darauf verlassen, Simulationen durchzuführen und einen Durchschnitt zu bilden, wie wir es in Gleichung $\eqref{eq:assetsellingfbarpi}$ tun.

Nun bleibt uns das Problem der Suche über Politiken. Wir werden immer zuerst unser Modell erstellen und uns dann dem Problem des Entwerfens von Politiken zuwenden. Bevor wir dies tun, müssen wir darüber nachdenken, wie wir jegliche Unsicherheiten in $S_0$ und den exogenen Informationsprozess $W_1, \ldots, W_T$ modellieren werden.

## Modellierung von Unsicherheit

Wir benötigen eine Möglichkeit, Beobachtungen von $W_t$ zu sampeln, was für dieses Problem bedeutet, die Entwicklung der Preise $p_t$ über die Zeit zu modellieren. Eine Möglichkeit besteht darin, Stichproben aus der Historie zu ziehen. Stellen Sie sich vor, wir sind daran interessiert, unsere Simulation über einen Zeitraum von einem Jahr laufen zu lassen. Wir können die Historie des vorangegangenen Jahres verwenden, aber dies ist nur ein einzelner Stichprobenpfad.

Die zweite Strategie, die wir häufig verwenden werden, besteht darin, ein statistisches Modell zu schätzen. Für unser Grundmodell könnten wir annehmen

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

wobei $\phat_{t+1}$ durch eine Wahrscheinlichkeitsverteilung beschrieben wird. Ein einfaches Modell wäre die Annahme, dass $\phat_{t+1}$ normalverteilt ist mit Mittelwert 0 und Varianz $\sigma^2$. Wir könnten auch damit beginnen anzunehmen, dass die Preisänderungen $\phat_t$ und $\phat_{t+1}$ unabhängig sind, und dass $\phat_{t+1}$ unabhängig vom aktuellen Preis $p_t$ ist (die letztere Annahme ist etwas stark, aber sie wird uns helfen, anzufangen).

Die meisten Computersprachen verfügen über Funktionen zur Simulation von Beobachtungen aus einer Normalverteilung. Excel bietet zum Beispiel die Funktion `Norm.inv`$(p,\mu,\sigma)$, die den Wert $w$ einer Zufallsvariable $W$ mit Mittelwert $\mu$ und Standardabweichung $\sigma$ zurückgibt, wobei $P[W \leq w] = p$. Ein Standardtrick besteht darin, $p=Rand()$ zu setzen, wobei $Rand()$ eine Excel-Funktion ist, die eine Zufallsvariable zurückgibt, die gleichmäßig zwischen $0$ und $1$ verteilt ist. Wir können dann schreiben

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

was uns eine zufällige Beobachtung von $\phat_{t+1}$ liefert, die normalverteilt ist mit Mittelwert $0$ und Standardabweichung $\sigma$.

Tabelle 2.1 illustriert zehn Beobachtungen von Zufallsvariablen $U$, die gleichmäßig zwischen 0 und 1 verteilt sind, sowie die entsprechenden Stichproben normalverteilter Preisänderungen $\phat$ mit Mittelwert 0 und Varianz 1.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>$U$</th><th>$\phat$</th></tr></thead>
<tbody>
<tr><td>0.8287</td><td>0.9491</td></tr>
<tr><td>0.6257</td><td>0.3206</td></tr>
<tr><td>0.9343</td><td>1.5086</td></tr>
<tr><td>0.4879</td><td>-0.0303</td></tr>
<tr><td>0.3736</td><td>-0.3223</td></tr>
<tr><td>0.8145</td><td>0.8947</td></tr>
<tr><td>0.0385</td><td>-1.7685</td></tr>
<tr><td>0.0089</td><td>-2.3698</td></tr>
<tr><td>0.9430</td><td>1.5808</td></tr>
<tr><td>0.3693</td><td>-0.3336</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 2.1.</span> Zehn gleichverteilte Zufallsvariablen $U$, und zehn entsprechende Stichproben normalverteilter Preisänderungen $\phat$ mit Mittelwert 0 und Varianz 1.</p>
</div>

Gleichung $\eqref{eq:assetsellingpricemodel1}$ ist ein recht einfaches Preismodell, aber es wird helfen, unseren Modellierungsrahmen zu illustrieren. Im Folgenden werden wir einige Erweiterungen einführen, die ein reichhaltigeres Modell einschließen.

## Entwurf von Politiken

Wir können mehrere verschiedene Politiken für dieses Problem in Betracht ziehen. Zum Beispiel könnte eine einfache Politik darin bestehen, zu verkaufen, wenn der Preis unter einen Grenzpunkt fällt, der uns nahelegt, dass ein starker Rückgang beginnt. So könnten wir diese Politik schreiben als

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

Eine andere Politik könnte eine "Hoch-Tief"-Verkaufspolitik sein, bei der wir verkaufen wollen, wenn der Preis zu hoch oder zu niedrig ausschlägt. Sei $\theta^{high-low} = (\theta^{low}, \theta^{high})$. Dies könnte geschrieben werden als

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

Ein möglicher Einwand gegen diese Politik könnte sein, dass sie eine steigende Aktie vorzeitig verkauft. Vielleicht möchten wir einfach verkaufen, wenn die Aktie über ein Trendsignal steigt. Um dieses Problem zu behandeln, erstellen wir zunächst eine geglättete Preisschätzung mit

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Betrachten wir nun eine Trendfolge-Politik, die wir schreiben könnten als

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

In allen Fällen können wir den Vermögenswert nur verkaufen (das heißt, $X^{track}(S_t\vert \theta^{track}) =1$), wenn wir den Vermögenswert noch halten (was bedeutet, dass $R^{asset}\_t = 1$).

Für diese Politik müssen wir unser Modell etwas anpassen, da wir nun $\pbar_t$ benötigen, um eine Entscheidung zu treffen. Das bedeutet, dass wir unseren Zustand nun schreiben würden als

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

Wir können unsere Klassen von Politiken als die Menge $\Fcal = \lbrace $"sell-low", "high-low", "track"$\rbrace $ schreiben. Für jede dieser Klassen haben wir einen Satz von Parametern, die wir als $\theta^f$ für $f\in\Fcal$ schreiben können. Für die "sell-low"- und "track"-Politiken gibt es einen einzelnen Parameter, während $\theta^{high-low}$ zwei Parameter hat.

Nun können wir unsere Suche über Politiken $\pi$ praktischer formulieren als eine Suche über Funktionsklassen $f\in\Fcal$, gefolgt von einer Suche über Parameter $\theta^f \in \Theta^f$, wobei $\Theta^f$ uns den Bereich der möglichen Werte angibt (und dabei gleichzeitig die Dimensionalität von $\theta^f$ erfasst).

Die Art und Weise, wie wir die Politiken in diesem Abschnitt entworfen haben, mag etwas ad hoc erscheinen, aber genau so werden tatsächlich viele Politiken entworfen (einschließlich der Kauf-Verkauf-Strategien großer Hedgefonds). Viele Arten von Politiken sind möglich, von denen einige besser abschneiden werden als andere; wir konzentrieren uns auf diese als illustrative Beispiele. Es gibt eine Kunst des Entwerfens von Politiken, die der Kunst des Entwerfens statistischer Modelle zur Schätzung ähnelt.

## Politikbewertung

Wir haben oben darauf hingewiesen, dass wir eine Politik durch Simulation bewerten können, indem wir

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

verwenden, wobei $\omega$ dazu verwendet wird, einen Stichpfad von Realisierungen der exogenen Zufallsvariablen darzustellen, die im Modell verwendet werden. Tabelle 2.2 illustriert eine Reihe von Stichpfaden von Preisen. Stellen wir uns beispielsweise vor, dass wir die "sell-low"-Politik mit $\theta^{sell-low} = \Doll 42$ verwenden. Betrachten wir nun, wie diese auf dem Stichpfad $\omega^5$ getestet wird. Das Ergebnis wäre

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

da $\Doll 41.53$ der erste Preis ist, der unter $\Doll 42$ fällt. Wenn keiner der Preise unter unseren Verkaufspunkt fällt, sind alle unsere Politiken so gestaltet, dass sie am Ende verkaufen.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>42.67</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>46.35</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>43.17</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.24</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>47.68</td><td>46.32</td><td>46.14</td><td>41.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>47.83</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.11</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>46.78</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>43.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>43.16</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>46.57</td><td>45.01</td><td>46.73</td><td>42.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 2.2.</span> Illustration einer Menge von Preispfaden.</p>
</div>

Wir können dann jede Politik (sowohl die Klasse der Politik als auch die Parameter für diese Klasse) bewerten, indem wir wiederholte Simulationen durchführen und einen Durchschnitt bilden. Wir schreiben dies als

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

Manchmal müssen wir ein Konfidenzintervall angeben, da $\Fbar^\pi$ nichts anderes als eine statistische Schätzung ist. Wir würden zunächst eine Schätzung der Varianz unserer Zufallsvariable $\Fhat^\pi$ berechnen, wofür wir

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

verwenden. Anschließend erhalten wir unsere Schätzung der Varianz unseres Durchschnitts $\Fbar^\pi$ mit

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

Daraus können wir ein Konfidenzintervall konstruieren, um zwei Politiken zu vergleichen, die wir $\pi^A$ und $\pi^B$ nennen könnten. Sei $\mu^\pi$ die wahre Leistung der Politik $\pi$, wobei $\Fbar^\pi$ unsere statistische Schätzung von $\mu^\pi$ ist. Wir möchten ein Konfidenzintervall für die Differenz $\mu^{\pi^A} - \mu^{\pi^B}$ erhalten. Unsere beste Schätzung dieser Differenz ist $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$. Die Varianz dieser Differenz ist

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

wobei wir annehmen, dass die Schätzungen $\Fbar^{\pi^A}$ und $\Fbar^{\pi^B}$ unabhängig sind, was bedeutet, dass jede Politik an einer anderen Zufallsstichprobe von Preisen getestet wird. Ist dies der Fall, würden wir unser Konfidenzintervall mit

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

berechnen, wobei $z_\alpha$ der Wert von $z$ ist, so dass eine normalverteilte Zufallsvariable $Z$ mit Wahrscheinlichkeit $\alpha$ größer als $z$ ist. Zum Beispiel gilt $z_{.05} = 1.645$, was $Prob[Z \geq 1.645] = .05$ bedeutet.

Ein besserer Ansatz besteht darin, dieselben Stichproben zu verwenden, um jede Politik zu bewerten. Zum Beispiel könnten wir jede Politik auf demselben Stichpfad $\omega$ testen, der aus Tabelle 2.2 ausgewählt wurde. Wenn wir unsere Politiken auf diese Weise testen, würden wir $\Fhat^{\pi^A}(\omega)$ und $\Fhat^{\pi^B}(\omega)$ erhalten (unter Verwendung derselben Preismenge $p_t(\omega)$) und dann die Differenz

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

berechnen. Nun berechnen wir die durchschnittliche Differenz

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

und die Varianz

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

Beachten Sie, dass die Varianz $(\delta \sigmabar^{A-B})^2$ kleiner sein wird als die Varianz, wenn unabhängige Stichproben verwendet werden. Das Konfidenzintervall für die Differenz würde dann

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

lauten. Die Berechnung von Konfidenzintervallen kann beim Vergleich verschiedener Klassen von Politiken nützlich sein. Alternativ könnten wir die Leistung zweier physischer Entwürfe vergleichen (z. B. die Geschwindigkeit zweier Maschinen oder die Standorte einer Anlage). Die Wahl der Politik ähnelt eng jeder Entwurfsentscheidung für ein System.

## Erweiterungen

### Preiszeitreihenprozesse

Stellen wir uns vor, dass wir einen etwas realistischeren Preisprozess wollen, der die Autokorrelation über die Zeit erfasst. Wir könnten vorschlagen, dass

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

wobei wir weiterhin annehmen, dass das zufällige Rauschen $\varepsilon_t$ über die Zeit unabhängig ist (und identisch verteilt). Wir werden für den Moment auch annehmen, dass wir die Koeffizienten $\eta = (\eta_0, \eta_1, \eta_2)$ kennen.

Dieses Preismodell erfordert eine subtile Änderung in unserem Modell, insbesondere bei der Zustandsvariable. Wir werden unsere alte Übergangsgleichung für Preise, $\eqref{eq:assetsellingP}$, durch unser neues Zeitreihenmodell ersetzen, das in $\eqref{eq:assetsellingpricetimeseries}$ angegeben ist. Um $p_{t+1}$ zu berechnen, reicht es nicht mehr aus, $p_t$ zu kennen, wir müssen jetzt auch $p_{t-1}$ und $p_{t-2}$ kennen. Unsere Zustandsvariable wäre nun gegeben durch

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Für die oben betrachteten Politiken verkompliziert dies unser Modell nicht sehr. Später werden wir Politiken einführen, bei denen die zusätzlichen Variablen eine erhebliche Komplikation darstellen.

### Preiszeitreihenprozess mit Lernen

Nehmen wir nun an, dass unser Preiszeitreihenprozess durch

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

gegeben ist, wobei $\varepsilon \sim N(0, 4^2)$ und wobei $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ unsere *Schätzung* von $\eta$ ist, gegeben das, was wir zum Zeitpunkt $t$ wissen (im vorherigen Abschnitt haben wir angenommen, dass $\theta$ bekannt war).

Es gibt einfache Formeln, die die Aktualisierung von $\etabar_t$ zu $\etabar_{t+1}$ anhand unserer Schätzungen $\etabar_t$ und der Beobachtung des nächsten Preises $p_{t+1}$ steuern.

Wir lassen zunächst

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

unsere Schätzung von $p_{t+1}$ sein, gegeben das, was wir zum Zeitpunkt $t$ wissen. Der Fehler in dieser Schätzung ist gegeben durch

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

Nun sei der Vektor $\phi_t$ der Vektor der erklärenden Variablen in unserem Preisprozess, der gegeben ist durch

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

Als Nächstes definieren wir die $2 \times 2$-Matrix $M_t$, die rekursiv aktualisiert wird mit

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

wobei $\gamma_t$ ein Skalar ist, der berechnet wird mit

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

Wir können nun $\etabar_t$ aktualisieren mit

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

Übung 6 wird diese Gleichungen genauer betrachten.

### Korb von Vermögenswerten

Eine weitere Wendung ergibt sich, wenn wir einen Korb von Vermögenswerten betrachten. Sei $p_{ti}$ der Preis des Vermögenswertes $i$. Nehmen wir für den Moment an, dass sich jeder Preis gemäß dem grundlegenden Prozess

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

entwickelt. Wir könnten annehmen, dass die Rauschterme $\varepsilon_{t+1,i}$ über die Vermögenswerte $i\in\Ical$ unabhängig sind, aber ein realistischeres Modell würde annehmen, dass die Preise verschiedener Vermögenswerte korreliert sind. Sei $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ die Kovarianz der zufälligen Preise $p_{t+1,i}$ und $p_{t+1,j}$ für die Vermögenswerte $i$ und $j$, gegeben das, was wir zum Zeitpunkt $t$ wissen. Nehmen wir für den Moment an, dass wir die Kovarianzmatrix $\Sigma$ kennen, vielleicht indem wir einen historischen Datensatz zur Schätzung verwenden (sie aber fixieren, sobald sie geschätzt ist).

Wir können die Kovarianzmatrix verwenden, um Stichprobenrealisierungen korrelierter Preise mit einer Technik namens Cholesky-Zerlegung zu erzeugen. Sie geht vor, indem sie das erzeugt, was wir die "Quadratwurzel" der Kovarianzmatrix $\Sigma$ nennen, die wir in einer unteren Dreiecksmatrix $L$ speichern. In Python, unter Verwendung des NumPy-Pakets, würden wir den Python-Befehl

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

verwenden. Die Matrix $L$ ermöglicht es uns, die Matrix $\Sigma$ mittels $\Sigma = L^T L$ zu erhalten.

Nun sei $Z$ ein Vektor von Zufallsvariablen, eine für jeden Vermögenswert, wobei $Z_i \sim N(0,1)$ (praktisch jede Programmiersprache verfügt über Routinen zur Erzeugung von Zufallsstichproben aus Normalverteilungen mit Mittelwert 0 und Varianz 1). Seien $p_t$, $p_{t+1}$ und $Z$ Spaltenvektoren (dimensioniert nach der Anzahl der Vermögenswerte). Wir erzeugen zunächst eine Stichprobe $\hat Z$, indem wir $\vert \Ical\vert $-mal aus $N(0,1)$ ziehen. Unsere Preisstichprobe $p_{t+1}$ ist dann gegeben durch

$$
p_{t+1} = p_t + L \hat{Z}.
$$

Für dieses Problem ist unsere Zustandsvariable gegeben durch $S_t = (R_t,p_t)$, wobei $R_t = (R_{ti})\_{i\in\Ical}$ erfasst, wie viele Anteile jedes Vermögenswertes wir besitzen, während $p_t$ unser aktueller Preisvektor ist. Die Kovarianzmatrix $\Sigma$ ist nicht in der Zustandsvariable enthalten, da wir annehmen, dass sie statisch ist (was bedeutet, dass wir sie in $S_0$ einordnen). Die Antwort ändert sich, wenn wir die Kovarianzmatrix bei jeder neuen Beobachtung aktualisieren würden, in welchem Fall wir die Kovarianzmatrix als $\Sigma_t$ schreiben würden, um ihre Zeitabhängigkeit zu erfassen. Da sie sich nun dynamisch ändert, wäre die Zustandsvariable $S_t = (R_t, p_t, \Sigma_t)$.

## Was haben wir gelernt?

Wir haben dieses Problem verwendet, um verschiedene Arten von PFA-Politiken zu veranschaulichen:

- Wir haben ein einfaches Problem des Verkaufs eines Vermögenswertes verwendet, um ein sequentielles Entscheidungsproblem zu veranschaulichen, das sowohl einen physischen Zustand (ob wir einen Vermögenswert halten, oder wie viel) als auch den Preis, zu dem wir ihn zum Zeitpunkt $t$ verkaufen könnten, umfasst.
- Wir haben gezeigt, wie man Unsicherheit modelliert und den Begriff eines Stichpfads $\omega$ für den exogenen Informationsprozess $W_1, \ldots, W_T$ einführt.
- Wir haben mehrere einfache Politiken der PFA-Klasse illustriert.
- Wir haben gezeigt, wie man eine Politik simuliert.
- Wir haben eine gewisse Komplexität in den Preisprozess eingeführt (bei dem der Preis $p_{t+1}$ von der jüngsten Preisgeschichte abhängt) sowie die Situation, in der der Verkaufspreis von einem Korb von Vermögenswerten abhängt, was einen komplexeren, mehrdimensionalen Informationsprozess darstellt. Beachten Sie, dass dies außer der Modellierung des Prozesses keine wesentliche Komplexität einführt. Es erzeugt eine viel höherdimensionale Zustandsvariable, aber das stellt keine bedeutende Form von Komplexität für das Problem des Entwerfens oder Bewertens von Politiken dar (dies gilt nicht für alle Klassen von Politiken).
- Wir haben gezeigt, wie man ein lineares Modell des Preisprozesses aktualisiert.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Wir schreiben die Übergangsfunktion als $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.
  <ol type="a">
    <li>Warum schreiben wir die exogene Information als $W_{t+1}$ und nicht als $W_t$?</li>
    <li>Zu welchem Zeitpunkt würden wir mit dieser Gleichung $S_{t+1}$ berechnen?</li>
  </ol>
</li>
<li>Was ist der Unterschied zwischen $p_t$ und $p_t(\omega)$?</li>
<li>Ändert sich die Struktur der Übergangsfunktion, wenn Sie verschiedene Politiken testen?</li>
<li>Die Zielfunktion in Gleichung $\eqref{eq:deterministicobjassetselling}$ ist für eine deterministische Version des Problems geschrieben. Wenn wir dieses Optimierungsproblem lösen, hängt die Entscheidung $x_t$ zum Zeitpunkt $t$ von den Preisen $p_{t'}$ für $t' > t$ ab?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Verwenden Sie die Preise aus Tabelle 2.2 und die Politik, dass Sie verkaufen, wenn der Preis unter ＄44,00 fällt. Berechnen Sie die Zielfunktion $\Fhat(\omega^n)$ für $n=1,\ldots, 10$. Berechnen Sie den durchschnittlichen Verkaufspreis und seine Varianz.</li>
<li>Die folgenden Fragen führen Sie durch die Schritte der Modellierung des Verkaufs eines Vermögenswertes (etwa einer einzelnen Aktie).
  <ol type="a">
    <li>Nehmen Sie an, dass Sie Ihre Preise anhand von Daten aus einem mathematischen Modell simulieren, das durch $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$ gegeben ist, wobei $\varepsilon \sim N(0, 6^2)$. 

    Wir kennen den Wert von $\eta = (\eta_0, \eta_1)$ nicht, aber unser Glaube über den wahren Wert von $\eta$ ist, dass er multivariat normalverteilt ist, mit $\eta \sim MVN({\bar \eta}, \Sigma)$, wobei

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    Nehmen Sie an, dass die Kovarianzmatrix $\Sigma_t$ gegeben ist durch

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    wobei $\Sigma_{tij} = Cov(\eta_i,\eta_j)$ für $i,j \in (0,1)$. Nehmen Sie an, dass zum Zeitpunkt $t$, $p_t = 20$, $p_{t-1} = 24$ gilt und wir $p_{t+1} = 18.2$ beobachten.

Verwenden Sie die Gleichungen aus dem Abschnitt über den Zeitreihen-Preisprozess mit Lernen: Wie lauten die aktualisierten Schätzungen von $\etabar_{t+1}$ und $\Sigma_{t+1}$? Geben Sie die Aktualisierungsgleichung an und berechnen Sie $\etabar_{t+1}$ und $\Sigma_{t+1}$ numerisch.</li>
    <li>Was ist die Zustandsvariable für dieses Problem? Geben Sie die Liste der Variablen an. Beachten Sie, dass Sie im Verlauf der Übung möglicherweise Variablen hinzufügen müssen (Sie haben zu diesem Zeitpunkt noch nicht alle Informationen). Achten Sie darauf, alle Informationen einzubeziehen, die Sie benötigen, um $\etabar_{t+1}$ aus $\etabar_t$ zu aktualisieren. Wie viele Dimensionen hat Ihre Zustandsvariable (das ist dieselbe Frage wie: wie viele Variablen sind in $S_t$ enthalten).</li>
    <li>Unser Trader trifft Handelsentscheidungen basierend auf einem gleitenden 7-Tage-Durchschnitt der Preise. Nehmen Sie an, wir befinden uns am Tag $t$, und der gleitende 7-Tage-Durchschnitt wird berechnet mit

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    Der Trader wird einen Vermögenswert verkaufen, wenn $p_t < \pbar_t - \theta^{sell}$. Schreiben Sie die Entscheidungsregel als Politik $X^\pi(S_t\vert \theta^{sell})$ auf, die 1 zurückgibt, wenn wir den Vermögenswert verkaufen, und 0 andernfalls.</li>
    <li>Was ist die exogene Information?</li>
    <li>Schreiben Sie die Übergangsgleichungen auf. Sie benötigen eine Gleichung für jedes Element von $S_t$.</li>
    <li>Schreiben Sie die Zielfunktion auf (und denken Sie daran, für jede Zufallsvariable einen Erwartungswertoperator zu verwenden, wie in den Anweisungen beschrieben). Achten Sie darauf, genau anzugeben, worüber Sie optimieren, gegeben die in Teil (c) angegebene Politikklasse. Nehmen Sie an, dass Sie Ihre Politik in einer Offline-Umgebung anhand historischer Daten trainieren.</li>
  </ol>
</li>
<li>Sie müssen eine Simulation von Strompreisen durchführen, die bekanntermaßen stark schwerfällige Verteilungsränder (heavy-tailed) aufweisen. Sie sammeln die in der folgenden Tabelle gezeigten Daten.

<div class="book-table-wrap">
<table class="book-table is-narrow">
<thead><tr><th>Zeit</th><th>Preis</th></tr></thead>
<tbody>
<tr><td>1</td><td>20</td></tr>
<tr><td>2</td><td>32</td></tr>
<tr><td>3</td><td>26</td></tr>
<tr><td>4</td><td>180</td></tr>
<tr><td>5</td><td>30</td></tr>
<tr><td>6</td><td>45</td></tr>
<tr><td>7</td><td>18</td></tr>
<tr><td>8</td><td>120</td></tr>
<tr><td>9</td><td>57</td></tr>
<tr><td>10</td><td>15</td></tr>
</tbody>
</table>
</div>

  <ol type="a">
    <li>Verwenden Sie die Daten in der Tabelle, um eine kumulative Verteilungsfunktion zu erstellen. Sie müssen die kumulative Verteilungsfunktion (cdf) grafisch darstellen, die wie eine Stufenfunktion mit fünf Stufen aussieht.</li>
    <li>Sie beobachten nun drei Realisierungen von Preisen: 25, 18, 160. Verwenden Sie die kumulative Verteilungsfunktion aus (a), um drei Realisierungen einer Zufallsvariablen zu erzeugen, die zwischen 0 und 1 gleichverteilt ist (nennen Sie diese Zufallsvariable $U$).</li>
    <li>Verwenden Sie nun diese Beobachtungen von $U$, um drei Beobachtungen einer Zufallsvariablen $Z$ zu erzeugen, die normalverteilt ist mit Mittelwert 0 und Varianz 1. Achten Sie darauf, dass Ihre Methode zur Erzeugung dieser Zufallsvariablen klar nachvollziehbar ist. [Hinweis: Verwenden Sie die kumulative Verteilungsfunktion einer Normal(0,1)-Zufallsvariablen genauso, wie Sie die in Teil (a) erstellte kumulative Verteilungsfunktion verwendet haben, um in Teil (b) gleichverteilte Zufallsvariablen zu erzeugen.]</li>
    <li>Nehmen Sie an, Sie hätten diese Methode zur Erzeugung einer Folge von Normal(0,1)-Zufallsvariablen verwendet, um ein lineares Modell der Form $Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$ anzupassen, wobei $\varepsilon_{t+1}$ normalverteilt ist mit Mittelwert 0 und Varianz 1 (das wissen wir, weil wir Normal(0,1)-Zufallsvariablen simulieren). Erzeugen Sie, ausgehend von $t=1$ und $Z_0 = 0.5$ und $Z_1 = -0.3$, $Z_2, Z_3, Z_4$ unter der Annahme, dass $\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$. Verwenden Sie dann Ihre kumulative Verteilungsfunktion aus Teil (a), um Beobachtungen von $P_2, P_3$ und $P_4$ zu erzeugen.</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *AssetSelling* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Unsere grundlegende "High-Low"-Verkaufspolitik war gegeben durch

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Zusätzlich zum Modul *AssetSelling* müssen Sie auch die Tabellenkalkulation "Chapter2_asset_selling_policy" von [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements) herunterladen, die Parameter für die Verwendung durch das Python-Modul bereitstellt.
  <ol type="a">
    <li>Simulieren Sie die Politik für 200 Zeitperioden mit den Parametern:

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>Führen Sie eine Suche nach dem besten Wert von $\theta^{min}$ und $\theta^{max}$ durch, indem Sie $\theta^{max} = 13$ festlegen und dann in Schritten von 1 nach dem besten $\theta^{min}$ suchen. Legen Sie diesen dann auf den entsprechenden Wert von $\theta^{min}$ fest und führen Sie eine ähnliche Suche für $\theta^{max}$ durch (erzwingen Sie dabei die Nebenbedingung, dass $\theta^{max} = \theta^{min}+2$).</li>
  </ol>
</li>
<li>Betrachten Sie eine Politik, die berücksichtigt, dass der Preis des Vermögenswerts steigen könnte, was bedeutet, dass statische Kauf-Verkauf-Grenzen möglicherweise nicht wirksam sind. Nehmen Sie an, dass wir den Preis für den Zeitpunkt $t+1$ mithilfe des angepassten Zeitreihenmodells vorhersagen

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

Wir werden $\pbar_t$ als Vorhersage für $p_{t+1}$ verwenden, gegeben das, was wir zum Zeitpunkt $t$ wissen.
  <ol type="a">
    <li>Was ist die Zustandsvariable für dieses Problem? Wenn Preise auf die nächsten 0,1 diskretisiert werden und angenommen wird, dass Preise zwischen 0 und 100 liegen, wie groß ist dann der Zustandsraum?</li>
    <li>Nehmen Sie an, wir führen die Politik ein

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    In dieser Version der Politik suchen wir nach plötzlichen Abweichungen vom erwarteten Preis. Zeichnen Sie den Graphen der Zielfunktion (Beitrag) gegenüber $\theta$. Kommentieren Sie Ihren Graphen. Beachten Sie, dass sich zwar der Zustandsraum stark vergrößert, sich aber die Komplexität der Suche nach der besten Politik in dieser Klasse nicht ändert.

    (Hinweis: Sie müssten die Zustandsvariable ändern, die High-Low-Politik ändern und eine äußere Schleife über verschiedene Werte von $\theta$ im Modul *DriverScript* erstellen. Es wird empfohlen, mit Ihrem Code zu experimentieren und eigene Wertebereiche zu wählen. Geben Sie an, wie lange die Ausführung Ihres Codes mit Ihrer Werteauswahl gedauert hat.)</li>
  </ol>
</li>
<li>(Fortsetzung von Übung 9) Stellen Sie sich vor, unsere Aktie folgt einem saisonalen Muster, was darauf hindeutet, dass unsere Kauf-Verkauf-Signale zeitabhängig sein sollten. Das bedeutet, dass wir $\theta$ durch $\theta_t$ ersetzen müssen. Diskutieren Sie, wie dies unseren Politiksuchprozess komplizierter machen würde.</li>
<li>(Fortsetzung von Übung 9) Wir könnten als Nächstes der Ansicht sein, dass unser Kauf-Verkauf-Signal vom Preis abhängen sollte. Wenn die Preise beispielsweise höher sind, könnten wir der Meinung sein, dass wir nach einer größeren Abweichung von $\pbar_t$ in Gleichung $\eqref{eq:assetsellingpolicytimeseries}$ suchen sollten, als wenn die Preise niedriger wären. Das bedeutet, dass wir den konstanten Vektor $\theta$ durch eine Funktion $\theta(\pbar_t)$ ersetzen würden.
  <ol type="a">
    <li>Beschreiben Sie eine Nachschlagetabellen-Darstellung von $\theta(\pbar_t)$ und zeichnen Sie einen Graphen, der zeigt, wie diese Funktion Ihrer Meinung nach aussehen könnte. Dies würde erfordern, $\pbar_t$ in beispielsweise 10 Bereiche zu diskretisieren. Wie kompliziert wird dadurch das Problem der Suche nach Politiken?</li>
    <li>Schlagen Sie eine parametrische Form für $\theta(\pbar_t)$ vor, die Ihre Intuition erfasst, dass $\theta$ größer sein sollte, wenn $\pbar_t$ größer ist? Über welche Parameter müssen Sie jetzt suchen?</li>
  </ol>
</li>
</ol>
{% endraw %}
