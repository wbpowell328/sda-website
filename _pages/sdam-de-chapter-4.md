---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "**Kapitel 4: Erlernen der besten Diabetes-Medikation**"
permalink: /sdam/de/chapter-4/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 60758982728bf18e
---


{% raw %}
## Kapitelübersicht

Das Lernen der besten Diabetesmedikation setzt dort an, wo unser Zeitungsjungenproblem aufgehört hat, wo aufeinanderfolgende Zeitperioden durch das verbunden sind, was wir über unbekannte Parameter glauben. Hier versuchen wir, das beste aus einer Menge von Diabetesmedikamenten für einen bestimmten Patienten zu lernen. Wir probieren ein Medikament aus, beobachten, was wir als verrauschte Reaktion annehmen, und aktualisieren dann unsere Überzeugungen, um zu entscheiden, was wir als Nächstes ausprobieren sollen, wobei wir die Reduktion des Blutzuckers maximieren möchten. Diese Problemklasse wurde unter verschiedenen Namen untersucht, darunter Multiarmed-Bandit-Problem, ableitungsfreie stochastische Suche oder intelligentes Ausprobieren.

Im Kern dieses Problems stehen unsere Überzeugungen darüber, wie unterschiedliche Medikamente wirken werden. Um die Darstellung so einfach wie möglich zu halten, nehmen wir an, dass das, was wir bei einem Medikament beobachten, uns nichts über die Wirksamkeit anderer Medikamente sagt – eine Eigenschaft, die als unabhängige Überzeugungen bekannt ist. Ein interessanterer und relevanterer Fall würde korrelierte Überzeugungen erfassen, doch dies hätte die Darstellung verkompliziert.

Wir betrachten nur die einfachsten Arten von Politiken, die alle Formen von Politik-Funktionsapproximationen sind. Diese sind recht einfach zu verwenden, beinhalten jedoch alle abstimmbare Parameter, was in diesem Kapitel nicht behandelt wird.

Als Erweiterung betrachten wir den Fall, in dem wir das, was wir von einem Patienten lernen, für andere Patienten mit ähnlichen Attributen nutzen möchten. Dies führt die Attribute eines Patienten in die Zustandsvariable ein und erzeugt das, was als *kontextuelles Bandit-Problem* bekannt ist, was bedeutet, die Wirksamkeit des Medikaments im "Kontext" der Attribute des Patienten zu lernen. Wir kommen auf diese Fragen in einem viel reicheren Problemkontext in [Kapitel 12](/sdam/de/chapter-12/) zurück, für das Problem der Optimierung der Auswahl von URLs, die angezeigt werden sollen, um Anzeigenklicks zu maximieren.

## Einordnung des Problems

Die Antworten auf unsere drei Einordnungsfragen sind:

- **Metriken:** Wir möchten den Blutzucker des Patienten (gemessen durch den A1c-Wert) auf ein Zielniveau reduzieren.
- **Entscheidungen:** Für dieses Kapitel wählen wir lediglich die Art des zu verabreichenden Medikaments aus (normalerweise müssten wir auch die beste Dosierung finden, aber wir nehmen an, dass die Dosierung durch die Art des Medikaments und das Gewicht des Patienten bestimmt wird).
- **Unsicherheiten:** Wie stark ein Medikament den A1c-Wert des Patienten reduziert. Es kann vorkommen, dass der Patient ein Medikament nicht verträgt, in diesem Fall würden wir die A1c-Reduktion auf null setzen.

## Erzählung

Wenn Menschen feststellen, dass sie einen hohen Blutzucker haben, was typischerweise mithilfe einer Metrik namens "A1c" bewertet wird, gibt es mehrere Dutzend Medikamente, die in vier Hauptgruppen fallen:

- Sensitizer – Diese zielen auf Leber-, Muskel- und Fettzellen ab, um die Insulinsensitivität direkt zu erhöhen, können jedoch Flüssigkeitsretention verursachen und sollten daher nicht bei Patienten mit einer Vorgeschichte von Nierenversagen verwendet werden.
- Sekretagoga – Diese Medikamente erhöhen die Insulinsensitivität, indem sie auf die Bauchspeicheldrüse abzielen, verursachen jedoch oft Hypoglykämie und Gewichtszunahme.
- Alpha-Glukosidase-Hemmer – Diese verlangsamen die Rate des Stärkestoffwechsels im Darm, können jedoch Verdauungsprobleme verursachen.
- Peptidanaloga – Diese imitieren natürliche Hormone im Körper, die die Insulinproduktion stimulieren.

Das beliebteste Medikament ist ein Sensitizer namens Metformin, das fast immer das erste Medikament ist, das einem neuen Diabetiker verschrieben wird, aber das funktioniert nicht immer. Vor der Arbeit mit einem bestimmten Patienten kann ein Arzt eine Überzeugung über das Potenzial von Metformin sowie von Medikamenten aus jeder der vier Gruppen haben, den Blutzucker zu reduzieren, was in Abbildung 4.1 dargestellt ist.

<figure class="book-figure">
  <img src="/assets/images/sdam/diabeteslearning2.jpg" alt="Überzeugungen über das Potenzial, das jedes Medikament auf die Reduktion des Blutzuckers haben könnte." style="max-width: 420px;">
  <figcaption><span class="fig-num">Abbildung 4.1.</span> Überzeugungen über das Potenzial, das jedes Medikament auf die Reduktion des Blutzuckers haben könnte.</figcaption>
</figure>

Ein Arzt beginnt typischerweise mit Metformin, aber dies funktioniert nur bei etwa 70 Prozent der Patienten. Oft können Patienten ein Medikament einfach nicht vertragen (es kann schwere Verdauungsprobleme verursachen). In diesem Fall müssen Ärzte damit beginnen, mit unterschiedlichen Medikamenten zu experimentieren. Dies ist ein langsamer Prozess, da es mehrere Wochen dauert, bevor man die Wirkung eines Medikaments auf einen Patienten beurteilen kann. Nach dem Testen eines Medikaments an einem Patienten über einen bestimmten Zeitraum beobachten wir die Reduktion des A1c-Wertes und verwenden diese Beobachtung dann, um unsere Schätzung darüber zu aktualisieren, wie gut das Medikament bei dem Patienten wirkt.

Unsere Herausforderung besteht darin, eine Politik zu finden, um das Medikament zu identifizieren, das die größtmögliche Reduktion des A1c-Wertes eines Patienten erreicht.

## Grundmodell

Für unser Grundmodell nehmen wir an, dass wir fünf Auswahlmöglichkeiten von Medikamenten haben: Metformin oder ein Medikament (außer Metformin), das aus einer der vier Hauptmedikamentengruppen stammt. Sei $\Xcal = \lbrace x_1, x_2, x_3, x_4, x_5\rbrace $ die fünf Auswahlmöglichkeiten. Durch die Beobachtung der Wirksamkeit jedes Medikaments bei Hunderten oder Tausenden von Patienten ist es möglich, eine Wahrscheinlichkeitsverteilung der Reduktion der A1c-Werte über alle Patienten hinweg zu erstellen. Die Ergebnisse dieser Analyse sind in Tabelle 4.1 dargestellt, die die durchschnittliche Reduktion und die Standardabweichung über alle Patienten hinweg angibt. Wir nehmen an, dass die Verteilung der Reduktionen des A1c-Wertes über die Population normalverteilt ist, mit Mittelwerten und Standardabweichungen wie in der Tabelle angegeben.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medikament</th><th>A1c-Reduktion</th><th>Standardabw.</th></tr></thead>
<tbody>
<tr><td>Metformin</td><td>0.32</td><td>0.12</td></tr>
<tr><td>Sensitizer</td><td>0.28</td><td>0.09</td></tr>
<tr><td>Sekretagoga</td><td>0.30</td><td>0.17</td></tr>
<tr><td>Alpha-Glukosidase-Hemmer</td><td>0.26</td><td>0.15</td></tr>
<tr><td>Peptidanaloga</td><td>0.21</td><td>0.11</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 4.1.</span> Metformin und die vier Medikamentenklassen und die durchschnittliche Reduktion über die gesamte Population.</p>
</div>

Um ein Modell zu erstellen, sei $\mubar^0\_x$ die mittlere Reduktion des A1c-Wertes für die Medikamentenauswahl $x$ über die Population, und sei $\sigmabar^0\_x$ die Standardabweichung in der Reduktion des A1c-Wertes für Medikament $x$. Unser Interesse besteht darin, das beste Medikament für eine bestimmte Person zu lernen. Obwohl wir den Patienten mithilfe einer Menge von Attributen beschreiben können, nehmen wir vorerst nur an, dass die Eigenschaften des Patienten unsere Überzeugung über die Wirksamkeit jedes Medikaments für einen einzelnen Patienten nicht verändern.

Wir wissen nicht, welche Reduktion wir von jedem Medikament erwarten können, daher stellen wir sie als Zufallsvariable $\mu_x$ dar, wobei wir annehmen, dass $\mu_x$ normalverteilt ist, was wir schreiben als

$$
\mu_x \sim N(\mubar^0_x, (\sigmabar^0_x)^2).
$$

Wir bezeichnen die Normalverteilung $N(\mubar^0\_x, (\sigmabar^0\_x)^2)$ als die *Prior-Verteilung der Überzeugung* über $\mu_x$.

Wir indizieren jede Iteration der Verschreibung eines Medikaments mit $n$, das bei 0 beginnt, was sich auf die Zeit bezieht, bevor wir irgendwelche Experimente durchgeführt haben. Angenommen, wir beobachten einen Patienten stets über einen festen Zeitraum (sagen wir, einen Monat). Wenn wir ein Medikament $x$ an einem Patienten ausprobieren, machen wir eine verrauschte Beobachtung des wahren Wertes $\mu_x$ der Reaktion des Patienten auf ein Medikament. Angenommen, wir treffen eine Wahl des Medikaments $x^n$ mit dem, was wir nach $n$ Versuchen wissen, wonach wir das Ergebnis des $n+1$-ten Versuchs beobachten, das wir mit $W^{n+1}$ bezeichnen (dies ist die Reduktion des A1c-Wertes). Dies kann geschrieben werden als

$$
W^{n+1} = \mu_{x^n} + \varepsilon^{n+1}.
$$

Denken Sie daran, dass wir $\mu_x$ nicht kennen; dies ist eine Zufallsvariable, wobei $\mubar^n_x$ unsere aktuelle Schätzung des Mittelwerts von $\mu_x$ ist.

### Zustandsvariablen

Unsere Zustandsvariable ist unsere Überzeugung über die Zufallsvariable $\mu_x$, die die tatsächliche Wirkung jedes Medikaments auf einen bestimmten Patienten nach $n$ Versuchen darstellt. $S^0$ ist der Anfangszustand, den wir schreiben als

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal},
$$

wobei wir in $S^0$ auch die Annahme der Normalität einbeziehen, die während aller Experimente bestehen bleibt. Nach $n$ Experimenten ist der Zustand

$$
S^n = (\mubar^n_x, \sigmabar^n_x)_{x\in\Xcal},
$$

wobei wir die Normalitätsannahme nicht mehr einbeziehen, weil sie in unserem Anfangszustand erfasst ist (die Verteilung ist statisch, daher schließen wir sie konventionsgemäß nicht in die dynamische Zustandsvariable ein).

Später wird es sich als nützlich erweisen, mit der *Präzision* unserer Überzeugung zu arbeiten, die gegeben ist durch

$$
\beta^n_x = \frac{1}{(\sigmabar^n_x)^2}.
$$

Wir können dann unsere Zustandsvariable schreiben als

$$
S^n = (\mubar^n_x, \beta^n_x)_{x\in\Xcal}.
$$

Wir verwenden das, was als *Bayes'sches Überzeugungsmodell* bekannt ist. In diesem Modell behandeln wir den unbekannten Wert eines Medikaments, $\mu_x$, als Zufallsvariable mit einer anfänglichen Prior-Verteilung, die durch $S^0$ gegeben ist. Nach $n$ Experimenten mit unterschiedlichen Medikamenten erhalten wir die *Posterior*-Verteilung der Überzeugung $S^n$.

### Entscheidungsvariablen

Die Entscheidung ist die Wahl des Medikaments, das für einen Monat ausprobiert werden soll, die wir schreiben als $x^n$, die Wahl des Medikaments, wobei $x^n \in \Xcal = \lbrace x_1, \ldots, x_5\rbrace $. Wir werden $x^n$ mithilfe einer Politik $X^\pi(S^n)$ bestimmen, die nur von der Zustandsvariable $S^n$ abhängt (zusammen mit der Annahme der Normalverteilung in $S^0$).

### Exogene Information

Nachdem wir die Entscheidung $x^n$ getroffen haben, beobachten wir $W^{n+1}\_x$, die Reduktion des A1c-Wertes, die aus dem Medikament $x=x^n$ resultiert, das wir für den $n+1$-ten Versuch verschrieben haben. Ein Leser mag sich fragen, warum wir die aus der Entscheidung $x^n$ gelernte Information als $W^{n+1}\_x$ schreiben und nicht als $W^n_x$. Wir tun dies, um die in jeder Variable verfügbare Information zu erfassen. So hängt die Entscheidung $x^0$ nur vom Anfangszustand $S^0$ ab. Der Zustand $S^n$ für $n\geq 1$ hängt von $S^0$ zusammen mit den Beobachtungen $W^1\_{x^0}, \ldots, W^n_{x^{n-1}}$ ab, jedoch nicht von $W^{n+1}\_{x^n}$, da wir das $n+1$-te Experiment, das $W^{n+1}\_{x^n}$ aufdecken würde, noch nicht abgeschlossen haben. Indem wir $W^{n+1}\_{x^n}$ als das Ergebnis der Verschreibung $x^n$ definieren, wissen wir, dass $x^n$ nicht von $W^{n+1}$ abhängen kann, was einem Blick in die Zukunft gleichkäme.

### Übergangsfunktion

Die Übergangsfunktion erfasst, wie die beobachtete Reduktion des A1c-Wertes, $W^{n+1}\_x$, unseren Belief-Zustand $S^n$ beeinflusst. Obwohl es etwas Algebra erfordert, lässt sich zeigen, dass wir, wenn wir Medikament $x=x^n$ ausprobieren und $W^{n+1}\_x$ beobachten, unsere Schätzung des Mittelwerts und der Präzision aktualisieren können mithilfe von

$$
\begin{align}
\mubar^{n+1}_x &= \frac{\beta^n_x\mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W},\label{eq:diabetestransition1}\\
\beta^{n+1}_x &= \beta^n_x + \beta^W.\label{eq:diabetestransition2}
\end{align}
$$

wobei $\beta^W$ die Präzision einer Beobachtung ist (wir können diese bei Bedarf von $x$ abhängig machen). Für alle $x\ne x^n$ bleiben $\mubar^n_x$ und $\beta^n_x$ unverändert.

Die Übergangsfunktion, die wir zuvor als generische Funktion $S^{n+1} = S^M(S^n,x^n,W^{n+1})$ geschrieben haben, ist durch die Gleichungen $\eqref{eq:diabetestransition1}$–$\eqref{eq:diabetestransition2}$ gegeben.

### Zielfunktion

Jedes Mal, wenn wir ein Medikament $x=x^n$ verschreiben, beobachten wir die durch $W^{n+1}\_{x^n}$ dargestellte Reduktion des A1c-Wertes. Wir möchten eine Politik finden, die ein Medikament $x^n = X^\pi(S^n)$ wählt, das die erwartete Gesamtreduktion des A1c-Wertes maximiert. Unser kanonisches Modell verwendete $C(S^n,x^n,W^{n+1})$ als unsere Leistungsmetrik. Für dieses Problem wäre dies

$$
C(S^n,x^n,W^{n+1}) = W^{n+1}_{x^n}.
$$

Wir schreiben das Problem, die beste Politik zu finden, als

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}, \label{eq:diabetesobjective1}
\end{align}
$$

wobei $x^n = X^\pi(S^n)$ und $S^{n+1} = S^M(S^n,x^n,W^{n+1})$. Hier ist die Bedingung auf $S_0$ besonders wichtig, da sie die Prior-Verteilung der Überzeugung trägt.

## Modellierung von Unsicherheit

Das Stichprobenziehen zufälliger Ergebnisse für unser Vermögenswert-Verkaufsproblem war relativ einfach. Für unser medizinisches Umfeld ist die Erzeugung von Ergebnissen der Zufallsvariablen $W^1, \ldots, W^n, \ldots$ etwas aufwändiger.

Beim Vermögenswert-Verkaufsproblem haben wir Zufallsvariablen mit Mittelwert 0 und einer gegebenen Varianz erzeugt, die wir als bekannt angenommen haben. In dieser medizinischen Anwendung ist die Reduktion des A1c-Wertes durch ein bestimmtes Medikament eine verrauschte Beobachtung des wahren Mittelwerts $\mu_x$ (für einen bestimmten Patienten), was wir schreiben können als

$$
W^{n+1} = \mu_x + \varepsilon^{n+1},
$$

wobei $\varepsilon^{n+1}$ normalverteilt ist mit Mittelwert 0 und einer Varianz (die wir als bekannt annehmen), die durch $(\sigma^W)^2$ gegeben ist. Das eigentliche Problem ist, dass wir $\mu_x$ nicht kennen. Angesichts dessen, was wir nach $n$ Experimenten mit unterschiedlichen Medikamenten wissen, nehmen wir an, dass $\mu_x$ normalverteilt ist mit Mittelwert $\mubar^n_x$ und Präzision $\beta^n_x$. Wir schreiben dies als

$$
\begin{align}
\mu_x\vert S^n \sim N(\mubar^n_x, \beta^n_x) \label{eq:mugivenS}
\end{align}
$$

wobei die rechte Seite von $\eqref{eq:mugivenS}$ gelesen wird als "der Mittelwert $\mu_x$ gegeben den Zustand $S^n$", was bedeutet, dass wir annehmen zu wissen, dass der Mittelwert $\mu_x$ durch $\mubar^n_x$ gegeben ist. Wir verwenden die Präzision $\beta^n_x$ (die eins über die Varianz ist) anstelle der gebräuchlicheren Varianz, wenn wir unsere Normalverteilung schreiben. Wir schreiben dann die Verteilung von $W^{n+1}$ als bedingt auf $\mu_x$ mithilfe von

$$
W^{n+1}\vert \mu_x \sim N(\mu_x, \beta^W_x).
$$

Das bedeutet, dass wir zwei Zufallsvariablen simulieren müssen: die wahre Leistung von Medikament $x$ bei unserem Patienten, gegeben durch $\mu_x$ (gegeben unsere Überzeugungen nach $n$ Experimenten), und dann das Rauschen $\varepsilon^{n+1}$, wenn wir versuchen, $\mu_x$ zu beobachten. Das bedeutet lediglich, dass wir statt einer normalverteilten Zufallsvariablen, wie wir es bei unserem Problem der Vermögenswertveräußerung getan haben, nun zwei generieren müssen.

## Entwurf von Politiken

Eine beliebte Klasse von Politiken für diese Problemklasse fällt in eine Kategorie, die als *upper confidence bounding* bekannt ist. Eine der ersten UCB-Politiken hat die Form

$$
\begin{align}
X^{UCB}(S^n) = \argmax_{x\in\Xcal} \left(\mubar^n_x + 4 \sigma^W \sqrt{\frac{\log n}{N^n_x}}\right), \label{eq:diabetesUCB1}
\end{align}
$$

wobei $N^n_x$ die Anzahl der Male ist, die wir Medikament $x$ ausprobiert haben (man erinnere sich, dass „$\argmax_x$" den Wert von $x$ zurückgibt, der das Maximum erreicht). Es ist gängige Praxis, den Koeffizienten $4 \sigma^W$ durch einen einstellbaren Parameter zu ersetzen, was uns

$$
\begin{align}
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right). \label{eq:diabetesUCB2}
\end{align}
$$

ergibt. Eine beliebte Variante, von der wir festgestellt haben, dass sie überraschend gut funktioniert, wurde ursprünglich unter dem Namen *interval estimation* eingeführt und ist gegeben durch

$$
\begin{align}
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right), \label{eq:diabetesIE}
\end{align}
$$

wobei $\sigmabar^n_x$ die Standardabweichung der Schätzung $\mubar^n_x$ ist.

Die Politiken $\eqref{eq:diabetesUCB2}$–$\eqref{eq:diabetesIE}$ teilen beide die Struktur, das Medikament $x$ auszuwählen, das unsere Schätzung seiner Leistung $\mubar^n_x$ zuzüglich eines Terms maximiert, der oft als „Unsicherheitsbonus" bezeichnet wird. Die Intuition hinter diesen Politiken ist, dass die Schätzungen $\mubar^n_x$ aufgrund von Pech niedrig sein können. Ohne den Unsicherheitsbonus könnten einige schlechte Ergebnisse dazu führen, dass wir ein Medikament nie wieder ausprobieren. Diese Politiken haben in der Forschungsliteratur erhebliche Aufmerksamkeit erregt, die theoretische Schranken für ihre Leistung ableiten kann, aber letztlich hängt alles von experimentellen Vergleichen mit realistischen Daten ab. Ein wichtiger Schritt bei der Bewertung der Politiken ist die Abstimmung des Parameters $\theta^{UCB}$ oder $\theta^{IE}$.

Eine dritte Strategie, die erhebliche Aufmerksamkeit erregt hat, ist als Thompson-Sampling bekannt. Dieser Ansatz zieht für jedes Medikament $x$ eine Zufallsstichprobe aus unserem Belief über $\mu_x$ und wählt dann das Beste davon aus. Genauer gesagt, sei

$$
\muhat^n_x \sim N(\mubar^n_x, \theta^{TS} \sigmabar^n_x)
$$

eine Zufallsstichprobe, die aus einer Normalverteilung mit Mittelwert $\mubar^n_x$ und Standardabweichung $\sigmabar^n_x$ gezogen wird, was unser aktueller Belief über die wahre Reaktion $\mu_x$ ist. Der Parameter $\theta^{TS}$ ist ein einstellbarer Parameter, der die Unsicherheit beeinflusst, die wir um den geschätzten Mittelwert $\mubar^n_x$ haben.

Nun wählen wir das als Nächstes auszuprobierende Medikament mithilfe von

$$
\begin{align}
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x. \label{eq:thompsonsampling}
\end{align}
$$

Thompson-Sampling bevorzugt Entscheidungen, bei denen die geschätzte Leistung $\mubar^n_x$, gegeben was wir nach $n$ Beobachtungen (über alle Medikamente hinweg) wissen, randomisiert die Leistung jedoch. Die Randomisierung fördert die Exploration, da Medikamente, deren geschätzte Auswirkung auf A1c möglicherweise nicht die höchste ist, dennoch die Chance haben, mit dem höchsten gestichprobten Wert $\muhat^n_x$ hervorzugehen.

Wir stellen fest, dass alle drei dieser Politiken, $X^{UCB}(S^n\vert \theta^{UCB})$, $X^{IE}(S^n\vert \theta^{IE})$ und $X^{TS}(S^n\vert \theta^{TS})$, zwei Eigenschaften gemeinsam haben: Die Politik selbst erfordert das Lösen eines Optimierungsproblems (das „$\argmax_x$"), und sie alle haben einstellbare Parameter. Aus diesem Grund sind dies alles Beispiele für *Kostenfunktionsapproximationen* (oder CFAs).

## Politikbewertung

Wir haben unsere Zielfunktion ursprünglich geschrieben als

$$
\max_\pi F^\pi(S_0) = \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\},
$$

aber den Erwartungswert auf diese Weise zu schreiben, ist etwas vage. Man erinnere sich, dass wir zwei Sätze von Zufallsvariablen haben: die wahren Werte von $\mu_x$ für alle $x\in\Xcal$ und die Beobachtungen $W^1, \ldots, W^N$ (oder genauer gesagt das Rauschen, wenn wir versuchen, $\mu_x$ zu beobachten). Wir können diese verschachtelte Abhängigkeit ausdrücken, indem wir die Zielfunktion schreiben als

$$
\max_\pi F^\pi(S_0) = \E_\mu \E_{W^1, \ldots, W^N\vert \mu} \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}.
$$

Es gibt zwei Möglichkeiten, den Wert einer Politik zu simulieren:

- **Verschachteltes Sampling (Nested Sampling)** – Zuerst simulieren wir den Wert der Wahrheit $\mu_x$ für alle $x\in\Xcal$, wobei wir $\psi\in\Psi$ als Stichprobenrealisierung von $\mu$ auffassen, die wir als $\mu(\psi)$ schreiben. Anschließend simulieren wir die Beobachtungen $W$, wobei wir $\omega\in\Omega$ als Stichprobenrealisierung von $W^1(\omega), \ldots, W^N(\omega)$ auffassen, was bedeutet, dass $\omega$ ein Ausgang aller möglichen Beobachtungen über alle möglichen Medikamente $x\in\Xcal$, über alle Experimente $n=1, \ldots, N$ hinweg ist.
- **Simultanes Sampling** – Hier lassen wir $\omega$ eine Stichprobenrealisierung sowohl von $\mu_x$ als auch der Beobachtungen $W^1, \ldots, W^N$ sein.

Wenn wir verschachteltes Sampling verwenden, nehmen wir an, dass wir $K$ Stichproben der wahren Werte $\mu(\psi_k)$ und $L$ Stichproben der Fehler $\varepsilon^1(\omega_\ell), \ldots, \varepsilon^N(\omega_\ell)$ generieren. Für die gestichprobte Wahrheit $\mu(\psi_k)$ und das Rauschen $\varepsilon^n(\omega_\ell)$ wäre die Leistung von Medikament $x^n$ im $n+1$ten Experiment

$$
W^{n+1}_{x^n}(\psi_k,\omega_\ell) = \mu(\psi_k) + \varepsilon^n(\omega_\ell).
$$

Wir können dann eine simulierte Schätzung der erwarteten Leistung einer Politik berechnen mithilfe von

$$
\Fbar^\pi(S_0) = \frac{1}{K} \sum_{k=1}^K \left(\frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\psi_k,\omega_\ell)\right),
$$

wobei $x^n = X^\pi(S^n)$ und

$$
S^{n+1}(\psi_k,\omega_\ell) = S^M(S^n(\psi_k,\omega_\ell), X^\pi(S^n(\psi_k,\omega_\ell)), W^{n+1}(\psi_k,\omega_\ell)).
$$

Wenn wir simultanes Sampling verwenden, dann bestimmt eine Stichprobe $\omega$ sowohl die Wahrheit $\mu(\omega)$ als auch das Rauschen $\varepsilon(\omega)$, was uns erlaubt, eine gestichprobte Schätzung unserer Beobachtung $W^{n+1}\_{x^n}$ zu schreiben als

$$
W^{n+1}_{x^n}(\omega_\ell) = \mu(\omega_\ell) + \varepsilon^n(\omega_\ell).
$$

Der geschätzte Wert einer Politik ist gegeben durch

$$
\Fbar^\pi(S_0) = \frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\omega_\ell).
$$

Wenn wir eine unserer parametrisierten Politiken verwenden, bei der $\theta$ der einstellbare Parameter ist, könnten wir die erwartete Leistung schreiben als $\Fbar^\pi(\theta\vert S_0)$. Dann wäre das Optimierungsproblem

$$
\begin{align}
\max_\theta \Fbar^\pi(\theta\vert S_0), \label{eq:diabetestuningpolicy}
\end{align}
$$

das wir mit einer Vielzahl von Suchverfahren lösen können, wie etwa den Methoden, die wir in diesem Kapitel oder in [Kapitel 3](/sdam/de/chapter-3/) vorgestellt haben. Wir behandeln Suchmethoden in [Kapitel 7](/sdam/de/chapter-7/) ausführlicher.

## Erweiterungen

Wir haben bisher ein Problem beschrieben, das für einen einzelnen Patienten gilt. Das bedeutet, dass wir dieses Problem für jeden Patienten von Grund auf neu lösen müssten. Wenn wir eine Million Diabetes-Patienten haben, dann hätten wir eine Million Modelle.

Stellen wir uns vor, wir möchten Informationen von verschiedenen Patienten nutzen, um ein einziges Modell zu erlernen. Wir können dies erreichen, indem wir jeden Patienten mithilfe einer Menge von Attributen $a = (a_1, \ldots, a_K)$ charakterisieren. Nehmen wir vorerst an, dass jedes Element $a_k$ diskret (z. B. Geschlecht) oder diskretisiert (z. B. Alter, unterteilt in Bereiche) ist. Tatsächlich werden wir zunächst annehmen, dass es ein einziges Attribut gibt: Geschlecht. Sei $G^n$ das Geschlecht des $n$ten Patienten. Nun haben wir zwei Formen exogener Information: das Geschlecht $G^n$ des $n$ten Patienten und das Ergebnis $W^n$ der Behandlung des $n$ten Patienten.

Wir beginnen mit einem Wissenszustand $K^0$, der unser zuvor im Kapitel eingeführter Vektor $(\mubar^0, \beta^0)$ ist. Der erste Patient wird das Geschlecht $G^1$ haben, was bedeutet, dass unsere Zustandsvariable (das heißt, alles, was wir wissen), nachdem der erste Patient eintrifft, $S^1 = (K^0,G^1)$ ist. Wir treffen dann eine Entscheidung $x^1$ bezüglich der Behandlung von Patient 1, wonach wir ein Ergebnis $W^1$ beobachten, das beschreibt, wie die Behandlung wirkte. Wir nutzen diese Information, um einen aktualisierten Wissenszustand $K^1$ zu erhalten, wonach sich der Prozess wiederholt:

$$
\begin{align*}
&(K^0, G^1, S^1=(K^0,G^1), x^1, W^1, K^{1}, G^2, S^2=(K^1,G^2), \ldots, \\
&\hspace{0.75in} K^{n-1}, G^n, S^n=(K^{n-1},G^n), x^n, W^{n}, K^{n}, G^{n+1}, \ldots)
\end{align*}
$$

Wir halten kurz inne und stellen fest, dass unsere Indizierung sich von der unterscheidet, die wir im Grundmodell verwendet haben. In unserem Grundmodell bezog sich der Index $n$ auf Besuche eines Patienten. Wir treffen eine Entscheidung $x^n$ *nach* dem $n$ten Besuch unter Verwendung dessen, was aus den ersten $n$ Besuchen bekannt ist. Wir lassen $W^{n+1}$ das Ergebnis dieser Behandlung sein, wobei wir $n$ auf $n+1$ erhöhen, um zu betonen, dass $x^n$ berechnet wurde, ohne $W^{n+1}$ zu kennen.

Bei unserem neuen Modell bezieht sich $n$ jedoch auf einen Patienten. Es ist sinnvoller, $G^n$ als das Geschlecht des $n$ten Patienten festzulegen, woraufhin wir eine Entscheidung für den $n$ten Patienten treffen und $W^n$ das Ergebnis der Behandlung für den $n$ten Patienten sein lassen. Wir erhöhen $n$ erst, wenn wir den $n+1$sten Patienten sehen, an welchem Punkt wir das Geschlecht des $n+1$sten Patienten sehen.

## Was haben wir gelernt?

- Wir haben die Idee eines sequentiellen Entscheidungsproblems eingeführt, das ein reines Lernproblem ist, bei dem die Zustandsvariable nur aus Belief-Zustandsvariablen besteht.
- Wir haben ein Beispiel für ein Problem gesehen, bei dem die Unsicherheit im wahren Wert der Leistung einer Wahl lag, wie etwa der Diabetes-Medikation.
- Wir haben ein Beispiel für eine Kostenfunktionsapproximations-Politik eingeführt, die eine Form eines parametrisierten Optimierungsproblems ist, und haben diese Idee anhand von drei Arten von Politiken veranschaulicht: upper confidence bounding (eine allgemeine Klasse von Politiken), interval estimation und Thompson-Sampling.
- Wir stellen fest, dass jede Politik einen einstellbaren Parameter beinhaltet, und formulieren das Problem der Abstimmung als eigenständiges Optimierungsproblem.
- Wir haben gezeigt, wie man das Vorhandensein exogener Informationsvariablen (wie das Geschlecht des Patienten) als vollständig sequentielles Entscheidungsproblem modelliert, das in der Lernliteratur als „kontextuelles Bandit-Problem" bekannt ist (der Kontext ist das Geschlecht). Anstatt das beste $x$ zu finden, suchen wir nun nach dem besten $x(G)$ als Funktion des Geschlechts (wir könnten dies um weitere Attribute der Patienten erweitern).

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was ist der grundlegende Unterschied aus algorithmischer Perspektive zwischen dem Diabetes-Problem, das wir in diesem Kapitel gelöst haben, und dem Problem, das in [Kapitel 3](/sdam/de/chapter-3/) gelöst wurde?</li>
<li>Wenn wir $\mubar^n_x$ als die Schätzung dafür festlegen, wie gut das Medikament bei einem Patienten nach $n$ Versuchen wirkt, was misst $n$? Ist es die Anzahl der Male, die wir Medikament $x$ ausprobiert haben?</li>
<li>Was ist die Zustandsvariable für dieses Problem?</li>
<li>Oben haben wir eine upper-confidence-bounding-Politik, eine interval-estimation-Politik und eine auf Thompson-Sampling basierende Politik vorgestellt. Welche Eigenschaften hatten diese Politiken gemeinsam?</li>
<li>Hat unsere Zielfunktion kumulative Belohnung oder finale Belohnung optimiert? Warum haben wir diese Version verwendet? Was ändert sich, wenn wir zur anderen Zielfunktion wechseln, im Hinblick auf die Suche nach einer guten Politik?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Sie versuchen, die Dosierung eines Diabetes-Medikaments zu bestimmen, die die größte Senkung des Blutzuckers bewirkt. Sie experimentieren derzeit mit drei Dosierungen, die wir mit $d_1$, $d_2$ und $d_3$ bezeichnen. Sei $\mu_i$ die wahre Senkung des Blutzuckers, die durch Dosierung $i$ erzeugt wird. Nach $n$ Experimenten mit verschiedenen Medikamenten sei $\mubar^n_i$ die Schätzung der durch Dosierung $d_i$ erzeugten Senkung. Wir möchten die Beobachtung ausnutzen, dass unsere Überzeugungen über $\mu_i$ korreliert sind. Sei $\sigma_{ii'} = Cov(\mu_i, \mu_{i'})$ die Kovarianz in unserem Belief über $\mu_i$ und $\mu_{i'}$.

Nehmen wir an, nach $n$ Tests verschiedener Dosierungen erhalten wir den aktuellen Vektor von Schätzungen

$$
\mubar^{n} = \begin{bmatrix} 32 \\ 42 \\ 20 \end{bmatrix}.
$$

Nehmen wir an, die Varianz eines einzelnen Experiments beträgt $16$ und unsere Kovarianzmatrix $\Sigma^n$ ist gegeben durch

$$
\Sigma^n = \begin{bmatrix} 8 & 4 & 2 \\ 4 & 8 & 4 \\ 2 & 4 & 8 \end{bmatrix}.
$$

  <ol type="a">
    <li>Schreiben Sie die Gleichungen zur Bestimmung der aktualisierten Schätzungen $\mubar^{n+1}$ und der Kovarianzmatrix $\Sigma^{n+1}$ bei gegebener Beobachtung $W^{n+1}$ auf.</li>
    <li>Nehmen Sie an, dass wir Dosierung $d_2$ ausprobieren und eine Beobachtung $W^{n+1} = 50$ erhalten. Berechnen Sie die aktualisierten Schätzungen $\mubar^{n+1}$ und die Kovarianzmatrix $\Sigma^{n+1}$.</li>
  </ol>
</li>
<li>Zeigen Sie, wie die zuvor vorgestellte Politik an unser Problem angepasst werden kann, bei dem das Geschlecht das einzige Patientenattribut ist, indem Sie eine Lookup-Table-Darstellung verwenden, was bedeutet, dass wir anstatt $\mubar^n_x$ zu lernen, $\mubar^n_{a,x}$ lernen, wobei $a=$ Geschlecht ist. Anstatt also für jede Behandlung $x$ eine Schätzung $\mubar^n_x$ zu lernen, müssen wir für jede Kombination aus Geschlecht $a = G^n$ und Behandlung $x=x^n$ eine Schätzung $\mubar^n_{a,x}$ lernen.</li>
<li>Skizzieren Sie eine Strategie zur Anwendung der Ideen dieses Kapitels auf das Marktplanungsproblem in [Kapitel 3](/sdam/de/chapter-3/).</li>
<li>Ist es möglich, die Methoden aus [Kapitel 3](/sdam/de/chapter-3/) auf das Diabetes-Problem anzuwenden? Erklären Sie.</li>
<li>Stellen Sie sich nun vor, dass wir anstelle des Geschlechts nur das Alter nach Jahrzehnt $(0$–$9, 10$–$19, \ldots, 80^+)$, Raucher oder Nichtraucher, sowie die ethnische Zugehörigkeit (nehmen Sie acht Kategorien der Ethnizität an) erfassen, was uns einen Attributvektor $a = (a_{gender}, a_{age}, a_{smoker}, a_{race})$ ergibt. Wenn $a\in\Acal$, wie viele Elemente hat $\Acal$? Wie würde sich dies auf Ihre vorgeschlagene Lösung in Übung 7 auswirken?</li>
<li>Stellen Sie sich vor, jedes Element $a_k$ im Attributvektor $a$ hat $L$ mögliche Werte, und $a$ hat $K$ Elemente, was bedeutet, dass $\Acal$ $L^K$ Elemente hat. Wenn $L = 10$, was ist der größte Wert von $K$, sodass das Lernen unseres attributbasierten Modells einfacher ist als das Lernen eines Modells für jeden der 7 Millionen Diabetes-Patienten?</li>
<li>Stellen Sie sich nun vor, dass unser Attributraum $\Acal$ schlicht zu groß ist, um praktikabel zu sein. Was wir bisher getan haben, ist eine Lookup-Table-Darstellung, bei der wir eine Schätzung $\mubar^n_{a,x}$ finden, was problematisch wird, wenn die Anzahl der möglichen Werte von $a$ groß wird. Ein alternativer Ansatz besteht darin, ein parametrisches Modell zu verwenden. Das einfachste wäre ein lineares Modell, bei dem wir schreiben würden

$$
\mubar_{a,x} = \sum_{f\in\Fcal} \theta_f \phi_f(a,x),
$$

wobei $\phi_f(a,x)$ für $f\in\Fcal$ eine Menge von Merkmalen ist, die wir (als Analysten) definieren müssten. Ein Merkmal könnte beispielsweise einfach ein Indikator für Geschlecht, Altersgruppe oder ethnische Zugehörigkeit sein. In diesem Fall gäbe es ein Merkmal für jedes mögliche Geschlecht, jede mögliche Altersgruppe und so weiter.
  <ol type="a">
    <li>Wenn es $L$ mögliche Werte für jedes von $K$ Attributen gibt, wie viele Merkmale bräuchten wir mindestens?</li>
    <li>Schlagen Sie komplexere Merkmale vor, die über die reine Angabe des Wertes jedes Attributs hinausgehen.</li>
    <li>Vergleichen Sie die Stärken und Schwächen einer Nachschlagetabellen-Darstellung mit unserem linearen Modell.</li>
  </ol>
</li>
<li>Wir werden verschiedene Politiken zur Ermittlung des besten Medikaments zur Senkung des Blutzuckers evaluieren. Wir nehmen an, dass unsere Prior-Verteilung des Glaubens für jedes Medikament in Tabelle 4.1 gegeben ist.

Wir beginnen mit einer Lernpolitik, die als Intervallschätzung bekannt ist und gegeben ist durch

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} (\mubar^n_x + \theta^{IE} \sigmabar^n_x).
$$

Wir verwenden ein Bayes'sches Belief-Modell, bei dem es sich als praktisch erweist, das Konzept der *Präzision* zu verwenden, die einfach eins durch die Varianz ist. Die Präzision in unserer anfänglichen Schätzung des wahren Wertes $\mu_x$ ist also gegeben durch

$$
\beta^0_x = \frac{1}{(\sigma^0_x)^2},
$$

wobei $\sigma^0_x$ in Tabelle 4.1 angegeben ist.

Nach $n$ Experimenten werden wir unsere Politik verwenden, um eine Entscheidung $x^n$ zu treffen, welches Medikament für das $n+1$-te Experiment ausprobiert werden soll. Wir kennen die wahre Leistung $\mu_x$ des Medikaments $x$ nicht, können sie aber mittels einer verrauschten Beobachtung des wahren Wertes $\mu_x$ beobachten, die wir schreiben als

$$
W^{n+1}_x = \mu_x + \varepsilon^{n+1}_x.
$$

Nehmen Sie an, dass die Standardabweichung eines einzelnen Experiments $\sigma^W = 5$ ist. Wir verwenden die Beobachtung von $W^{n+1}_x$, um unsere Überzeugungen zu aktualisieren mittels:

  <ol type="i">
    <li>Wenn wir Medikament $x$ ausprobieren:

    $$
    \mubar^{n+1}_x = \frac{\beta^n_x \mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W}, \qquad \beta^{n+1}_x = \beta^n_x + \beta^W.
    $$</li>
    <li>Wenn $x$ ein Medikament ist, das wir nicht ausprobieren, dann:

    $$
    \mubar^{n+1}_x = \mubar^n_x, \qquad \beta^{n+1}_x = \beta^n_x.
    $$</li>
  </ol>

Beantworten Sie Folgendes:
  <ol type="a">
    <li>Was ist bei Verwendung eines Bayes'schen Belief-Modells die Zustandsvariable?</li>
    <li>Was ist die Übergangsfunktion für das Belief-Modell?</li>
    <li>Schreiben Sie den Erwartungswert einer Politik $X^\pi(S^n)$ mit Hilfe des Erwartungswertoperators $\E$ aus. Achten Sie darauf, den Operator zu indizieren, um anzugeben, welche Zufallsvariablen beteiligt sind, wie in $\E_\mu$ oder $\E_W$ (oder $\E_{W_1,\ldots,M}$). Sie können die Bedingtheit anzeigen, indem Sie $\E_{W\vert \mu}$ verwenden (dies ist der Erwartungswert über die beobachtete Reduktion $W$, gegeben wir kennen den wahren Mittelwert $\mu$).</li>
  </ol>
</li>
<li>Man könnte vernünftigerweise annehmen, dass der Parameter $\theta^{IE}$ von der Anzahl der verbleibenden Experimente in unserem Budget abhängen sollte, was bedeutet, dass $\theta^{IE}$ eine Funktion von $n$ sein muss (oder äquivalent dazu eine Funktion der verbleibenden Experimente $N-n$ wäre). Es gibt zwei Möglichkeiten, diese Funktion darzustellen. Diskutieren Sie (ohne jegliche Programmierung) die Stärken jedes Ansatzes sowie die damit verbundenen rechnerischen Herausforderungen.
  <ol type="a">
    <li>Nachschlagetabelle – Anstatt über einen Skalar $\theta^{IE}$ zu suchen, müssten wir über einen Vektor $\theta^{IE}_n$ suchen.</li>
    <li>Parametrisch – Wir könnten eine Funktionsform annehmen wie $\theta^{IE} = \theta^{slope}(N-n)$, wobei wir nun nur noch den Skalar $\theta^{slope}$ abstimmen müssen.</li>
  </ol>
</li>
<li>Wir haben dieses Problem so behandelt, als würden wir es für jeden Patienten separat lösen. Stellen Sie sich vor, wir haben $I$ Patienten, indiziert durch $i = 1, \ldots, I$, wobei zu bedenken ist, dass $I$ 10 Millionen Patienten sein könnten. Das Finden eines Vektors von Schätzungen $\mubar = (\mubar_x)_{x\in\Xcal}$ für jeden Patienten würde geschrieben als $\mubar = (\mubar_{i})_{i=1}^I$, wobei jedes $\mubar_i = (\mubar_{ix})_{x\in\Xcal}$. Die Erstellung von 10 Millionen Schätzungen erscheint etwas umständlich.

Stellen Sie sich stattdessen vor, dass jeder Patient einen Vektor von Attributen $a = (a_1,\ldots, a_M)$ hat, wobei $a \in \Acal$. Es kann eine Vielzahl von Attributen geben, in welchem Fall die Menge $\Acal$ recht groß wäre, aber wir können eine kleine Teilmenge wählen, sodass $\Acal$ nicht so groß ist, wie beispielsweise Geschlecht und ob die Person raucht. Wir können erneut zwei verschiedene Darstellungen von $\mubar_{ax}$ verwenden. Diskutieren Sie wie zuvor die Stärken und rechnerischen Herausforderungen jeder der folgenden Modellierungsarten von $\mubar_{ax}$:
  <ol type="a">
    <li>Nachschlagetabelle – Wir würden jedes der Attribute $a \in \Acal$ aufzählen und eine Schätzung $\mubar_{ax}$ der Leistung jedes Medikaments $x$ und für jedes Attribut $a$ erstellen. Dies könnte eine große Menge sein, sollte aber kleiner als 10 Millionen sein.</li>
    <li>Parametrisch – Dies erfordert das Aufstellen einer parametrischen Form für $\mubar_{ax}$ für jedes Medikament $x$. Eine Möglichkeit wäre

    $$
    \mubar_{ax} = \sum_{f\in\Fcal} \thetabar_{fx} \phi_f(a).
    $$

    Die Funktionen $\phi_f(a)$ werden manchmal Basisfunktionen genannt (andere Begriffe sind unabhängige Variablen oder Kovariaten). Dies könnten Indikatorvariablen sein, die beispielsweise das Geschlecht des Patienten oder ob er Raucher ist, erfassen. Diese Darstellung ersetzt die Berechnung von $\mubar_{ax}$ für jedes Attribut $a$ durch die Berechnung eines Koeffizientenvektors $\mubar_{ax}$ für eine Menge von Merkmalen. Die Menge $\Fcal$ ist vermutlich viel kleiner als die Menge der Attribute (ist dies nicht der Fall, sollten wir die Nachschlagetabellen-Darstellung verwenden).</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *AdaptiveMarketPlanning* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 15;">
<li>Führen Sie $L = 1000$ Simulationen der Intervallschätzungs-Politik über ein Budget von $N = 20$ Experimenten mit $\theta^{IE} = 1$ durch. Sei $\Fhat^{IE}$ die Leistung der IE-Politik für einen bestimmten Stichprobenpfad. Nehmen Sie an, dass die wahre Leistung eines Medikaments, $\mu_x$, in Tabelle 4.2 gegeben ist, und verwenden Sie die Annahmen für die Standardabweichung jedes Beliefs aus Tabelle 4.1. Verwenden Sie außerdem die Standardabweichung $\sigma^W = 5$ für die experimentelle Variation, wie wir es in Übung 13 getan haben.
  <ol type="a">
    <li>Berechnen Sie den Mittelwert und die Standardabweichung des Wertes der Politik $\Fbar^{IE}(\theta^{IE})$ mit $\theta^{IE}=1$.</li>
    <li>Evaluieren Sie die IE-Politik für $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ und stellen Sie $\Fbar^{IE}(\theta)$ grafisch dar. Was lernen Sie aus diesem Diagramm?</li>
  </ol>
</li>
<li>Evaluieren Sie die IE-Politik bei einem Budget $N = 20$ über die Werte $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ für zwei verschiedene Sätze von Wahrheiten:
  <ol type="a">
    <li>Nehmen Sie zunächst an, dass die Prior $\mu^0_x = 0.3$ für alle Medikamente $x$ ist und dass die anfängliche Standardabweichung $\sigma^0_x = 0.10$ beträgt. Dies bedeutet, dass wir annehmen, dass die Wahrheit $\mu_x \sim N(\mubar^0_x,(\sigmabar^0_x)^2)$ ist. Wir werden jedoch unsere Wahrheit stichprobenartig ermitteln mittels

    $$
    \muhat_x = .3 + \varepsilon
    $$

    wobei $\varepsilon$ gleichverteilt im Intervall $[-0.15,+0.15]$ ist. Dies ist ein Beispiel dafür, eine Prior-Verteilung des Glaubens zu haben (in diesem Fall ist diese normalverteilt um 0,3), aber die Wahrheit aus einer anderen Verteilung zu ziehen (die gleichverteilt um den Mittelwert 0,3 ist).

    Führen Sie 10.000 Wiederholungen für jeden Wert von $\theta^{IE}$ durch, um die durchschnittliche Leistung zu berechnen. Welche Schlussfolgerungen können Sie aus dem resultierenden Diagramm über die 11 Werte von $\theta^{IE}$ ziehen?</li>
    <li>Für diese Übung werden wir unsere Wahrheit aus der Prior simulieren mittels

    $$
    \mu_x = \mubar^0_x + \varepsilon
    $$

    wobei $\mubar^0$ in Tabelle 4.2 ("A1c-Reduktion") angegeben ist und wobei $\varepsilon$ gleichverteilt im Intervall $[-.5\mubar^0_x, +.5\mubar^0_x]$ ist. Führen Sie 10.000 Wiederholungen für jeden Wert von $\theta^{IE}$ durch, um die durchschnittliche Leistung zu berechnen. Welche Schlussfolgerungen können Sie aus dem Diagramm ziehen?</li>
  </ol>
</li>
</ol>

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medikament</th><th>A1c-Reduktion</th><th>Wahrheit</th></tr></thead>
<tbody>
<tr><td>Metformin</td><td>0.32</td><td>0.25</td></tr>
<tr><td>Sensitizer</td><td>0.28</td><td>0.30</td></tr>
<tr><td>Secretagoga</td><td>0.30</td><td>0.28</td></tr>
<tr><td>Alpha-Glucosidase-Hemmer</td><td>0.26</td><td>0.34</td></tr>
<tr><td>Peptidanaloga</td><td>0.21</td><td>0.24</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 4.2.</span> Wahre Werte für einen bestimmten Patienten.</p>
</div>
{% endraw %}
