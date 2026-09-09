---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 13: Blutmanagementproblem"
permalink: /sdam/de/chapter-13/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 40aad1a1c3f43c6c
---


{% raw %}
## Kapitelübersicht

Das Blutmanagementproblem ist ein multidimensionales Ressourcenallokationsproblem, da wir acht verschiedene Blutgruppen verwalten müssen, während wir gleichzeitig verfolgen müssen, wie lange Blut bereits gelagert wurde (sofern es nicht eingefroren ist). Dies ist das erste Mal, dass wir auf Werkzeuge wie lineare Programmierung zurückgreifen müssen, um zu jedem Zeitpunkt Entscheidungen zu treffen.

Wir beginnen mit der Veranschaulichung einer myopischen Politik, die das Lösen eines einfachen linearen Programms beinhaltet, das Entscheidungen ignoriert, die den Einfluss aktueller Entscheidungen auf die Zukunft nicht berücksichtigen. Beim Blutmanagement kann dies bei der Verwaltung von $O-$-Blut auftreten, das als Universalspender bekannt ist – es kann für jeden Patienten verwendet werden. Es hilft, Reserven an $O-$-Blut vorzuhalten, falls ein Mangel an anderen Blutgruppen besteht.

Anschließend zeigen wir die Verwendung von approximativer dynamischer Programmierung, um aktuelle Belohnungen mit zukünftigen Belohnungen abzuwägen. Um ADP für ein multidimensionales Problem zu nutzen, machen wir uns die Struktur des Problems bei der Gestaltung einer Approximation für den Wert eines Satzes von Blutbeständen in der Zukunft zunutze. Diese Idee funktioniert, wenn wir die Struktur des Problems ausnutzen können.

## Erzählung

Das Problem der Verwaltung von Blutbeständen dient als besonders elegante Illustration eines Ressourcenallokationsproblems. Wir gehen zunächst davon aus, dass wir Bestände in einem einzigen Krankenhaus verwalten, wo wir jede Woche entscheiden müssen, welche unserer Blutbestände zur Deckung des Bedarfs in der kommenden Woche verwendet werden sollen.

Wir müssen mit ein wenig Hintergrundwissen über Blut beginnen. Für die Zwecke der Verwaltung von Blutbeständen interessieren uns vor allem Blutgruppe und Alter. Obwohl es eine große Bandbreite an Unterschieden im Blut zweier Personen gibt, konzentrieren sich Ärzte für die meisten Zwecke auf die acht wichtigsten Blutgruppen: $A+$ ("A positiv"), $A-$ ("A negativ"), $B+$, $B-$, $AB+$, $AB-$, $O+$ und $O-$. Während die Möglichkeit, verschiedene Blutgruppen zu substituieren, von der Art der Operation abhängen kann, kann Blut für die meisten Zwecke gemäß Tabelle 13.1 substituiert werden.

<div class="book-table-wrap">
<table class="book-table center-first-col">
<thead><tr><th>Spender \ Empfänger</th><th>$AB+$</th><th>$AB-$</th><th>$A+$</th><th>$A-$</th><th>$B+$</th><th>$B-$</th><th>$O+$</th><th>$O-$</th></tr></thead>
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
<p class="book-table-caption"><span class="fig-num">Tabelle 13.1.</span> Zulässige Blutsubstitutionen für die meisten Operationen, "X" bedeutet, dass eine Substitution erlaubt ist.</p>
</div>

Ein zweites wichtiges Merkmal von Blut ist sein Alter. Die Lagerung von Blut ist auf sechs Wochen begrenzt, danach muss es verworfen werden. Krankenhäuser müssen antizipieren, ob sie glauben, das Blut vor Erreichen dieser Grenze verwenden zu können, da es an Blutzentren übertragen werden kann, die die Bestände verschiedener Krankenhäuser innerhalb einer Region überwachen. Es hilft, wenn ein Krankenhaus so schnell wie möglich erkennen kann, welches Blut es nicht benötigen wird, damit dieses Blut an Standorte übertragen werden kann, denen es knapp wird.

## Einordnung des Problems

Die Antworten auf unsere drei Rahmenfragen lauten:

- **Metriken:** Maximierung der erwarteten Summe aus Boni abzüglich Strafen für die Zuweisung von Blut einer Gruppe zur Deckung des Bedarfs einer anderen Gruppe.
- **Entscheidungen:** Wie viel Blut einer Gruppe dem Bedarf an Blut einer anderen Gruppe zugewiesen werden soll, sowie wie viel Blut jeder Blutgruppe im Bestand gehalten werden soll.
- **Unsicherheiten:** Der zukünftige Bedarf an Blut jeder Gruppe sowie die Spenden jeder Blutgruppe.

## Grundmodell

### Zustandsvariablen

Wir können das Blutproblem als heterogenes Ressourcenallokationsproblem modellieren. Wir beginnen mit einem recht einfachen Modell, das ohne nennenswerte Notationsänderungen leicht erweitert werden kann. Wir beginnen damit, die Attribute einer Einheit gelagerten Bluts mithilfe von

$$
b = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix} = \begin{pmatrix} \text{blood type } (A+, A-, \ldots) \\ \text{age (in weeks)} \end{pmatrix},
$$

zu beschreiben, und lassen $\Bcal$ die Menge aller Blutattributtypen sein. Wir werden das Alter auf den Bereich $0 \leq b_2 \leq 6$ beschränken. Blut mit $b_2 = 6$ (das bedeutet Blut, das bereits sechs Wochen alt ist) ist nicht mehr verwendbar. Wir nehmen an, dass Entscheidungszeitpunkte in Ein-Wochen-Schritten erfolgen. Blutbestände werden mithilfe von $R_{tb}$ dargestellt, den Einheiten von Blut des Typs $b$, die zum Zeitpunkt $t$ zur Zuweisung oder zum Halten verfügbar sind, mit $R_t = (R_{tb})\_{b\in\Bcal}$.

Die Attribute des Bedarfs an Blut sind gegeben durch

$$
a = \begin{pmatrix} a_1 \\ a_2 \\ a_3 \end{pmatrix} = \begin{pmatrix} \text{blood type of patient} \\ \text{surgery type: urgent or elective} \\ \text{is substitution allowed?} \end{pmatrix},
$$

und lassen $\Acal$ die Menge aller Attributtypen für Blutbedarfe sein. Das Attribut $a_3$ erfasst die Tatsache, dass es einige Operationen gibt, bei denen ein Arzt keine Substitution zulässt. Ein Beispiel ist die Geburt, da Säuglinge möglicherweise nicht mit einer anderen Blutgruppe zurechtkommen, selbst wenn diese eine zulässige Substitution wäre. Für unser Grundmodell erlauben wir nicht, dass unbedienter Bedarf einer Woche in eine spätere Woche übertragen wird.

Anschließend definieren wir den Bedarf an Blut mithilfe von $D_{ta}$, der Anzahl der Bluteinheiten, die für Patienten mit Attribut $a$ zum Zeitpunkt $t$ benötigt werden, mit $D_t = (D_{ta})\_{a\in\Acal}$.

Die Zustandsvariablen sind gegeben durch

$$
S_t = (R_t,D_t).
$$

### Entscheidungsvariablen

Wir wirken auf Blutressourcen mit Entscheidungen ein, die durch $d$ gegeben sind, eine Art von Entscheidung, die Entscheidungen umfasst, Blut an einen Patienten mit Attribut $a\in\Acal$ zu geben, oder nichts zu tun und das Blut zu halten, was wir mit $d^\phi$ darstellen; und $\Dcal$, die Menge aller möglichen Entscheidungen, $\Dcal = \Acal \cup d^\phi$.

Anschließend lassen wir $x_{tbd}$ die Anzahl der Bluteinheiten mit Attribut $b$ sein, auf die wir mit einer Entscheidung vom Typ $d$ zum Zeitpunkt $t$ einwirken, mit $x_t = (x_{tbd})\_{b\in\Bcal,d\in\Dcal}$.

Der zulässige Bereich $\Xcal_t$ wird durch die folgenden Nebenbedingungen definiert:

$$
\begin{align}
\sum_{d\in\Dcal} x_{tbd} &=  R_{tb}, \quad b\in\Bcal, \label{eq:blood1}\\
\sum_{b\in\Bcal} x_{tbd} &\leq \Dhat_{td}, \quad d\in\Dcal,\label{eq:blood2}\\
x_{tbd}                  &\geq 0. \label{eq:blood3}
\end{align}
$$

### Exogene Information

Die Information, die eintrifft, nachdem wir eine Entscheidung getroffen haben, ergibt sich aus den Blutspenden, die wir mithilfe von $\Rhat_{t+1,b}$ darstellen, der Anzahl neuer Einheiten von Blut des Typs $b$, die zwischen $t$ und $t+1$ gespendet wurden, mit $\Rhat_{t+1} = (\Rhat_{t+1,b})\_{b\in\Bcal}$.

Der neue Bedarf an Blut wird mithilfe von $\Dhat_{t+1,a}$ modelliert, den Einheiten des Bedarfs mit Attribut $a$, die zwischen $t$ und $t+1$ entstanden sind, mit $\Dhat_{t+1} = (\Dhat_{t+1,a})\_{a\in\Acal}$.

Unsere exogene Informationsvariable wäre

$$
W_{t+1} = (\Rhat_{t+1}, \Dhat_{t+1}).
$$

### Übergangsfunktion

Gehaltenes Blut altert einfach um eine Woche, wir begrenzen das Alter jedoch auf sechs Wochen. Blut, das zur Deckung eines Bedarfs zugewiesen wird, kann so modelliert werden, dass es zu einer Blutgruppen-Senke verschoben wird, die vielleicht mit $b_{t,1} = \phi$ (der Null-Blutgruppe) bezeichnet wird. Die Blutattribut-Übergangsfunktion $b^M(b_t,d_t)$ ist gegeben durch

$$
b_{t+1} = \begin{pmatrix} b_{t+1,1} \\ b_{t+1,2} \end{pmatrix} = \begin{cases} \begin{pmatrix} b_{t,1} \\ \min\{6,b_{t,2}+1\} \end{pmatrix}, & d_t = d^\phi, \\[8pt] \begin{pmatrix} \phi \\ - \end{pmatrix}, & d_t \in\Dcal. \end{cases}
$$

Um die Übergangsfunktion darzustellen, ist es nützlich, folgendes zu definieren

$$
\delta_{b'}(b,d) = \begin{cases} 1 & b^x_t = b' = b^M(b_t,d_t),\\ 0 & \text{otherwise,} \end{cases}
$$

und $\Delta$ als die Matrix mit $\delta_{b'}(b,d)$ in Zeile $b'$ und Spalte $(b,d)$ zu bezeichnen.

Wir bemerken, dass die Attribut-Übergangsfunktion deterministisch ist. Ein zufälliges Element würde beispielsweise auftreten, wenn Inspektionen des Blutes ergäben, dass Blut, das jünger als sechs Wochen ist, als abgelaufen beurteilt wird. Die Ressourcen-Übergangsfunktion kann nun geschrieben werden als

$$
R^x_{tb'}   = \sum_{b\in\Bcal}\sum_{d\in\Dcal} \delta_{b'}(b,d) x_{tbd}, \qquad R_{t+1,b'}   = R^x_{tb'} + \Rhat_{t+1,b'}.
$$

In Matrixform würden diese geschrieben als

$$
\begin{align}
R^x_t   &= \Delta x_t, \label{eq:bloodresourcetransition1}\\
R_{t+1} &= R^x_t + \Rhat_{t+1}. \label{eq:bloodresourcetransition2}
\end{align}
$$

Die Bedarfe $D_{t+1}$ werden einfach aus dem neuen Bedarf $\Dhat_{t+1}$ beobachtet, sodass wir dies schreiben als

$$
D_{t+1} = \Dhat_{t+1}.
$$

Abbildung 13.1 veranschaulicht die Übergänge, die in Woche $t$ auftreten. Wir müssen entweder entscheiden, welche Art von Blut zur Deckung eines Bedarfs verwendet werden soll (Abbildung 13.1a), oder das Blut bis zur folgenden Woche halten. Wenn wir Blut zur Deckung eines Bedarfs verwenden, wird angenommen, dass es dem System verloren geht. Wenn wir das Blut bis zur folgenden Woche halten, wird es in Blut umgewandelt, das eine Woche älter ist. Blut, das sechs Wochen alt ist, darf zur Deckung keines Bedarfs mehr verwendet werden, sodass wir den Bestand an sechs Wochen altem Blut als Senke für unbrauchbares Blut betrachten können (der Wert dieses Blutes wäre null). Beachten Sie, dass Blutspenden mit einem Alter von 0 angenommen werden.

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodnetworkdemands.jpg" alt="Assigning blood supplies to demands in week t." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 13.1a.</span> Zuweisung von Blutbeständen zu Bedarfen in Woche $t$. Durchgezogene Linien stellen die Zuweisung von Blut zu einem Bedarf dar, gepunktete Linien stellen das Halten von Blut dar.</figcaption>
</figure>

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodnetworkhold.jpg" alt="Holding blood supplies until week t+1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 13.1b.</span> Halten von Blutbeständen bis Woche $t+1$.</figcaption>
</figure>

Die durch Abbildung 13.1 dargestellten Modelle sind für Ressourcenallokationsprobleme sehr nützlich. Wir haben dieses Modell recht erfolgreich verwendet, um die Zuweisung von hergestellten Produkten an Vertriebszentren zu optimieren, sowie um die Zuweisung von Lkw, Güterwagen und Lokomotiven im Güterverkehr zu optimieren. Bei der Schätzung der Wertfunktionsapproximationen ist Sorgfalt geboten, aber sobald diese geschätzt sind, führt ihre Verwendung zu Folgen sehr kleiner Netzwerkprobleme, wie sie in der Abbildung dargestellt sind.

### Zielfunktion

Es gibt keine echten "Kosten" für die Zuweisung von Blut einer Gruppe zum Bedarf einer anderen Gruppe (wir betrachten keine Schritte wie den Einsatz von Geld zur Förderung zusätzlicher Spenden oder den Transport von Beständen von einem Krankenhaus zu einem anderen). Stattdessen verwenden wir die Beitragsfunktion, um die Präferenzen des Arztes zu erfassen. Wir möchten die natürliche Präferenz erfassen, dass es im Allgemeinen besser ist, nicht zu substituieren, und dass die Erfüllung eines dringenden Bedarfs wichtiger ist als eines elektiven Bedarfs.

Zum Beispiel könnten wir die in Tabelle 13.2 beschriebenen Beiträge verwenden. Wenn wir also $O-$-Blut verwenden, um den Bedarf eines elektiven Patienten mit $A+$-Blut zu decken, würden wir einen Beitrag von -＄10 (Strafe, da negativ) für die Substitution von Blut erhalten, +＄5 für die Verwendung von $O-$-Blut (etwas, das Krankenhäuser gerne fördern), und einen Beitrag von +＄20 für die Erfüllung eines elektiven Bedarfs, was einen Gesamtbeitrag von +＄15 ergibt.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<thead><tr><th>Bedingung</th><th>Beschreibung</th><th>Wert</th></tr></thead>
<tbody>
<tr><td>wenn $d = d^\phi$</td><td>Halten</td><td>0</td></tr>
<tr><td>wenn $b_1 = b_1$ bei $d\in\Dcal$</td><td>Keine Substitution</td><td>0</td></tr>
<tr><td>wenn $b_1 \neq b_1$ bei $d\in\Dcal$</td><td>Substitution</td><td>-10</td></tr>
<tr><td>wenn $b_1 = O-$ bei $d\in\Dcal$</td><td>$O-$-Substitution</td><td>5</td></tr>
<tr><td>wenn $d_2 = $ Dringend</td><td>Erfüllung eines dringenden Bedarfs</td><td>40</td></tr>
<tr><td>wenn $d_2 = $ Elektiv</td><td>Erfüllung eines elektiven Bedarfs</td><td>20</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 13.2.</span> Beiträge für verschiedene Arten von Blut und Entscheidungen.</p>
</div>

Der Gesamtbeitrag (zum Zeitpunkt $t$) ist schließlich gegeben durch

$$
C_t(S_t,x_t) = \sum_{b\in\Bcal}\sum_{d\in\Dcal} c_{tbd} x_{tbd}.
$$

Wie zuvor sei $X^\pi_t(S_t)$ eine Politik (eine Art Entscheidungsregel), die $x_t\in\Xcal_t$ in Abhängigkeit von $S_t$ bestimmt. Wir möchten die beste Politik finden, indem wir

$$
\begin{align}
\max_{\pi\in\Pi} \E \sum_{t=0}^T  C_t(S_t,X^\pi(S_t)),  \label{eq:bloodobjective}
\end{align}
$$

lösen, wobei $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$.

## Modellierung von Unsicherheit

Die Unsicherheitsquellen in diesem Problem sind Blutspenden und das Auftreten neuer Operationen, die Blutspenden erfordern. Einige Aspekte, die wir bei der Modellierung dieser Unsicherheit berücksichtigen müssen, sind:

- Es gibt nicht nur Zufälligkeit bei der Anzahl der gespendeten Bluteinheiten, sondern auch bei der Blutgruppe.
- Es gibt sowohl wochentagsspezifische als auch saisonale Muster bei Blutspenden, ebenso wie Reaktionen auf Aufrufe, die natürlich eine Entscheidung darstellen.
- Das Auftreten neuer Operationen kann aufgrund von Wetter oder Gewalt schubweise erfolgen.
- Es besteht eine durchgängige Diskrepanz zwischen den Arten von Personen, die Blut spenden, und den Arten von Personen, die Operationen benötigen, was sich in Unterschieden in der Verteilung der Blutgruppen zeigt.
- Ein wichtiges Thema ist die Verwaltung der Substitution von Blutgruppen. Der Möglichkeit, $O-$-Blut für jeden zu verwenden, wird viel Aufmerksamkeit gewidmet, aber es gibt unterschiedliche Arten von Substitutionen für alle Blutgruppen.

## Gestaltung von Politiken

Wir werden mit einer einfachen myopischen Politik beginnen und dann zu einer übergehen, die von der Approximation des Wertes zukünftiger Blutbestände abhängt.

### Eine myopische Politik

Der offensichtlichste Weg, dieses Problem zu lösen, ist eine einfache myopische Politik, bei der wir den Beitrag an jedem Zeitpunkt maximieren, ohne die Auswirkung unserer Entscheidungen auf die Zukunft zu berücksichtigen. Wir können eine Familie myopischer Politiken erhalten, indem wir die Ein-Perioden-Beiträge anpassen.

Zum Beispiel ist unser Bonus von 5 ＄ für die Verwendung von $O-$-Blut (in Tabelle 13.2) tatsächlich eine Art myopischer Politik. Wir fördern die Verwendung von $O-$-Blut, da es im Allgemeinen verfügbarer ist als andere Blutgruppen. Indem wir diesen Bonus ändern, erhalten wir verschiedene Arten myopischer Politiken, die wir durch die Menge $\Pi^M$ darstellen können, wobei für $\pi\in\Pi^M$ unsere Entscheidungsfunktion gegeben wäre durch

$$
\begin{align}
X^\pi_t(S_t) = \argmax_{x_t\in\Xcal_t} \sum_{b\in\Bcal} \sum_{d\in\Dcal} c_{tbd}x_{tbd}. \label{eq:bloodmyopic}
\end{align}
$$

Das Optimierungsproblem in $\eqref{eq:bloodmyopic}$ ist ein einfaches lineares Programm. Die Suche über Politiken im Optimierungsproblem, das durch Gleichung $\eqref{eq:bloodobjective}$ gegeben ist, bedeutet, über verschiedene Werte des Bonus für die Verwendung von $O-$-Blut zu suchen.

### Eine VFA-Politik

Als traditionelles dynamisches Programm ist das in Gleichung $\eqref{eq:bloodobjective}$ gestellte Optimierungsproblem ziemlich einschüchternd. Die Zustandsvariable $S_t$ hat $\vert \Acal\vert  + \vert \Bcal\vert  = 8 \times 6 + 8 \times 2 \times 2 = 80$ Dimensionen. Die Zufallsvariablen $\Rhat$ und $\Dhat$ haben ebenfalls zusammen 80 Dimensionen. Der Entscheidungsvektor $x_t$ hat $27 + 8 = 35$ Dimensionen.

Es ist naheliegend, Wertfunktionsapproximationen zu verwenden, um den Zuweisungsvektor $x_t$ zu bestimmen, unter Verwendung von

$$
\begin{align}
x^n_t =  \argmax_{x_t\in\Xcal^n_t} \big(C_t(S^n_t,x_t) + \Vbar^{x,n-1}_t(R^x_t) \big), \label{eq:adpblood}
\end{align}
$$

wobei $R^x_t = R^M(R_t,x_t)$ durch Gleichung $\eqref{eq:bloodresourcetransition1}$ gegeben ist und wobei $\Xcal^n_t$ durch die Nebenbedingungen $\eqref{eq:blood1}$–$\eqref{eq:blood3}$ definiert ist. Die entscheidende Nebenbedingung ist $\eqref{eq:blood1}$, welche die Verfügbarkeit von Blutvorräten jeder Blutgruppe begrenzt.

Die erste (und wichtigste) Herausforderung, mit der wir konfrontiert sind, ist die Identifizierung einer geeigneten Approximationsstrategie für $\Vbar^{x,n-1}\_t(R^x_t)$. Eine einfache und effektive Approximation ist die Verwendung separierbarer, stückweise linearer Approximationen, das heißt

$$
\Vbar^x_t(R^x_t) = \sum_{b\in\Bcal} \Vbar^x_{tb}(R^x_{tb}),
$$

wobei $\Vbar^x_{tb}(R^x_{tb})$ eine skalare, stückweise lineare Funktion im Nach-Entscheidungs-Bestand $R^x_{tb}$ für jede Blutgruppe $b$ ist.

Es lässt sich leicht zeigen, dass die Wertfunktion konkav ist (sowie stückweise linear), sodass jedes $\Vbar^x_{tb}(R^x_{tb})$ ebenfalls konkav sein sollte. Ohne Beschränkung der Allgemeinheit können wir annehmen, dass $\Vbar^x_{tb}(R^x_{tb}) = 0$ für $R^x_{tb} = 0$ gilt, was bedeutet, dass die Funktion vollständig durch ihre Menge von Steigungen charakterisiert ist. Wir können die Funktion schreiben unter Verwendung von

$$
\begin{align}
\Vbar^{n-1}_{tb}(R^x_{tb}) = \left(\sum_{r=1}^{\lfloor R^x_{tb}\rfloor} \vbar^{n-1}_{tb}(r-1)
    + (R^x_{tb} - \lfloor R^x_{tb}\rfloor) \vbar^{n-1}_{tb}(\lfloor R^x_{tb}\rfloor)\right), \label{eq:pwl}
\end{align}
$$

wobei $\lfloor R \rfloor$ die größte ganze Zahl kleiner oder gleich $R$ ist. Wie wir sehen können, wird diese Funktion durch die Menge der Steigungen $(\vbar^{n-1}\_{tb}(r))$ für $r = 0, 1, \ldots, R^{max}$ bestimmt, wobei $R^{max}$ eine obere Schranke für die Anzahl der Ressourcen eines bestimmten Typs ist.

Die Art und Weise, wie wir die Steigungen in $\Vbar_t(R_t)$ schätzen, besteht darin, die Zielfunktion für das Problem zum Zeitpunkt $t$ zu erstellen

$$
\begin{align}
\Vtilde_{t}(S_t) =  \max_{x_t\in\Xcal^n_t} \big(C_t(S^{n}_t,x_t) + \Vbar^{x,n-1}_t(R^x_t) \big). \label{eq:bloodvtile}
\end{align}
$$

Wenn wir dieses lineare Programm lösen, erhalten wir Schätzungen des Grenzwerts einer zusätzlichen Einheit Blut vom Typ $a$, gegeben durch $R^n_{ta}$. Nennen wir diesen Wert $\vhat^n_{ta}$, der unmittelbar aus jedem Softwarepaket für lineare Programmierung verfügbar ist (und wir erhalten diesen für jede Blutgruppe $a$ gleichzeitig).

Alternativ könnten wir den Grenzwert genauer berechnen, indem wir einen gestörten Ressourcenvektor $R^{n+}\_{ta} = R^n_{ta} +1$ erstellen. Sei $\Xcal^{n+}\_t(a)$ der zulässige Bereich (bestehend aus den Gleichungen $\eqref{eq:blood1}$–$\eqref{eq:blood3}$), bei dem wir $R^{n+}\_{ta}$ anstelle von $R^n_{ta}$ für ein einzelnes Attribut $a$ verwenden, und sei $\Vtilde^+\_{ta}(S_t)$ dasselbe wie $\Vtilde_t(S_t)$, außer mit dem zulässigen Bereich $\Xcal^{n+}\_{ta}$ mit der gestörten Ressource $R^{n+}\_{ta}$ anstelle von $R^n_{ta}$. Wir können dann die Grenzwerte $\vhat^n_{ta}$ finden, unter Verwendung von

$$
\vhat^n_{ta} = \Vtilde^+_{ta}(S_t) - \Vtilde_t(S_t).
$$

Beachten Sie, dass wir $\Vtilde^+\_{ta}(S_t)$ für jedes $a$ berechnen müssen (während wir mit dualen Variablen die gesamte Menge der Grenzwerte auf einmal erhalten).

Wir verwenden dann $\vhat^n_{ta}$, um die *vorherige Nach-Entscheidungs-Wertfunktionsapproximation* $\vbar^{x,n}\_{t-1,a}$ zu aktualisieren, was mit

$$
\vbar^{x,n}_{t-1,a}(R^{x,n}_{t-1,a}) = (1-\alpha) \vbar^{x,n-1}_{t-1,a}(R^{x,n}_{ta}) + \alpha \vhat^n_{ta}.
$$

geschieht. Wir können zeigen, dass die Steigungen $\vbar^{x,n}\_{ta}(R^{x,n}\_{ta})$ abnehmen, wenn $R^{x,n}\_{ta}$ zunimmt, sodass es hilfreich ist, dies beizubehalten. Wir können dies mit Methoden wie den CAVE- oder Leveling-Algorithmen tun (siehe *Reinforcement Learning and Stochastic Optimization*, Abschnitt 18.3).

Unter der Annahme, dass wir diese Funktion schätzen können, ist das Optimierungsproblem, das wir lösen müssen (Gleichung $\eqref{eq:adpblood}$), das recht bescheidene lineare Programm, das in Abbildung 13.2 dargestellt ist. Wie bei Abbildung 13.1 müssen wir sowohl die Zuweisung verschiedener Blutgruppen zu verschiedenen Arten von Nachfrage als auch die Entscheidung, Blut zurückzuhalten, berücksichtigen.

<figure class="book-figure">
  <img src="/assets/images/sdam/bloodadpnetwork.jpg" alt="Netzwerkmodell für Zeitschritt t mit separierbaren, stückweise linearen Wertfunktionsapproximationen." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 13.2.</span> Netzwerkmodell für Zeitschritt $t$ mit separierbaren, stückweise linearen Wertfunktionsapproximationen.</figcaption>
</figure>

Um die Abbildung zu vereinfachen, haben wir das Netzwerk der verschiedenen Nachfragetypen zu einer einzigen aggregierten Box mit Nachfrage $\Dhat_t$ zusammengefasst. Dieses Netzwerk würde tatsächlich genauso aussehen wie das Netzwerk in Abbildung 13.1a. Die Entscheidung, Blut zurückzuhalten, muss den Wert einer Blutgruppe (einschließlich ihres Alters) in der Zukunft berücksichtigen, den wir mithilfe separierbarer, stückweise linearer Wertfunktionen approximieren.

Hier verwenden wir einen Standard-Modellierungstrick, der die separierbaren, stückweise linearen Wertfunktionsapproximationen in eine Reihe paralleler Verbindungen von jedem Knoten, der ein Element von $R^x_t$ darstellt, zu einer Superrsenke umwandelt. Stückweise lineare Funktionen sind nicht nur leicht zu lösen (wir benötigen lediglich Zugang zu einem Solver für lineare Programmierung), sie sind auch leicht zu schätzen. Darüber hinaus wurde festgestellt, dass sie für viele Problemklassen (aber nicht alle) eine sehr schnelle Konvergenz mit qualitativ hochwertigen Lösungen erzeugen.

Mit dieser Entscheidungsfunktion werden wir eine Methode namens *approximative Wertiteration* verwenden, bei der wir vorwärts durch die Zeitperioden $t=0, \ldots, T$ iterativ simulieren. Sei $n = 1, \ldots, N$ der Iterationszähler, wobei wir einem Stichprobenpfad der exogenen Information $W^n_t,~t=0, \ldots, T$ folgen (diese könnten aus der Historie entnommen oder aus einer Verteilung gezogen werden). Zum Zeitpunkt $t$, Iteration $n$, verwenden wir Gleichung $\eqref{eq:adpblood}$, um eine Entscheidung $x^n_t$ zu treffen, wenn wir uns im Zustand $S^n_t$ befinden. Wir beobachten dann $W^n_{t+1}$ und verwenden unsere Übergangsfunktion (Gleichungen $\eqref{eq:bloodresourcetransition1}$–$\eqref{eq:bloodresourcetransition2}$) für den Übergang von $R^n_t$ zu $R^n_{t+1}$. Im Zustand $S^n_t = (R^n_t, \Dhat^n_t)$ verwenden wir unsere VFA-Politik in Gleichung $\eqref{eq:adpblood}$, um $x^n_t$ zu berechnen, und dann berechnen wir $\vhat^n_t$, um die Steigungen $\vbar^{x,n}\_{t-1}$ zu aktualisieren. Wir beobachten dann $W^n_{t+1}$ (welches $\Dhat^n_{t+1}$ enthält), um in den Zustand $S^n_{t+1}$ überzugehen.

Für die meisten operativen Anwendungen würde dieses Problem über einen endlichen Horizont (sagen wir, 10 Wochen) gelöst, was uns eine Empfehlung liefert, was jetzt zu tun ist. Wir können die Wertfunktionsapproximationen $\Vbar^x_t(R^x_t)$ verwenden, um die Politik mehrmals zu simulieren, was zur Erzeugung einer Art probabilistischer Prognose zukünftiger Bestände verwendet werden kann.

## Erweiterungen

Dies ist ein reichhaltiges und komplexes Ressourcenzuweisungsproblem, das auf verschiedene Weisen erweitert werden kann. Nachfolgend einige Beispiele.

**1)** Wir nehmen an, dass jede Nachfrage, die zum Zeitpunkt $t$ nicht befriedigt wird, verloren geht. Stellen Sie sich vor, wir haben Notoperationen, die erfüllt werden müssen, und Wahloperationen, die auf eine spätere Zeitperiode verschoben werden können. Schreiben Sie die Zustandsvariable für das neue Problem auf.

**2)** Nehmen Sie an, dass Wahloperationen verschoben werden können. Erwägen Sie die Verwendung einer Wertfunktionsapproximation, die stückweise linear und separierbar in den Blutbeständen ist (dies ist die oben vorgeschlagene VFA), zusammen mit stückweise linearen und separierbaren VFAs für den Umfang der zurückgehaltenen Nachfrage (nach Blutgruppe). Wir verwenden die dualen Variablen für den Blutbestand, um die VFA für Blutvorräte zu aktualisieren. Wie könnten wir die VFA für die zurückgehaltene Nachfrage aktualisieren?

**3)** Berücksichtigen Sie das Vorhandensein von eingefrorenem Blut sowie die Entscheidung, Blut einzufrieren, wobei eingefrorenes Blut, das nicht verwendet wird, entsorgt werden muss. Das bedeutet, wir müssen erkennen, dass die für eine Operation benötigte Blutmenge vor der Operation unbekannt ist, wenn die Entscheidung, das Blut aufzutauen, getroffen werden muss.

**4)** Ein Krankenhaus könnte wöchentliche Blutlieferungen von einer Gemeinschaftsblutbank benötigen, um systematische Engpässe auszugleichen. Stellen Sie sich vor, eine feste Menge (z. B. 100 Einheiten) Blut kommt jede Woche an, aber die Menge an Blut jeder Gruppe und jedes Alters (das Blut könnte bereits mehrere Wochen auf Lager gewesen sein) könnte zufällig sein.

**5)** Wir haben ein Modell vorgestellt, das sich nur auf Blutbestände in einem einzigen Krankenhaus konzentriert. Wir können mehrere Krankenhäuser und Verteilzentren behandeln, indem wir einfach ein Standortattribut hinzufügen und eine Entscheidung ermöglichen, Blut (gegen Kosten) von einem Standort zu einem anderen zu bewegen.

Dieses Modell kann auch auf jedes Mehrprodukt-Bestandsproblem angewendet werden, bei dem es verschiedene Produkttypen und verschiedene Nachfragetypen gibt, solange wir die Möglichkeit haben, auszuwählen, welcher Produkttyp welchem Nachfragetyp zugewiesen wird. Wir nehmen auch an, dass Produkte nicht wiederverwendbar sind; sobald ein Produkt einer Nachfrage zugewiesen ist, geht es aus dem System verloren.

## Was haben wir gelernt?

- Wir führen ein mehrdimensionales Ressourcenzuweisungsproblem ein, das einen extrem großen Zustandsraum hat, aber die Struktur der Konkavität bietet, die wir bei der Approximation von Wertfunktionen nutzen können.
- Wir zeigen, wie man ein Multiattribut-Ressourcenzuweisungsproblem modelliert, was es recht einfach macht, zusätzliche Attribute einzuführen.
- Wir veranschaulichen eine einfache myopische Politik, bei der die nachgelagerten Auswirkungen jetzt getroffener Entscheidungen ignoriert werden.
- Wir beschreiben anschließend eine VFA-Politik, bei der wir die natürliche Konkavität des Problems ausnutzen, um eine Approximation vorzuschlagen, die auf separierbaren, stückweise linearen Wertfunktionsapproximationen basiert.
- Unsere VFA-Politik müsste rollierend implementiert werden, sodass unsere Politik tatsächlich eine stochastische DLA ist, die eine VFA-Politik für die Lookahead-Politik verwendet. Dies entspricht unserer Verwendung der dynamischen Programmierung zur Lösung des deterministischen kürzesten-Wege-Problems, das eine Approximation unseres stochastischen, dynamischen kürzesten-Wege-Problems in [Kapitel 6](/sdam/de/chapter-6/) darstellte.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Wie ist die Dimensionalität der Zustandsvariablen $S_t$?</li>
<li>Wie ist die Dimensionalität des Entscheidungsvektors $x_t$?</li>
<li>Was sind die Quelle(n) der Unsicherheit?</li>
<li>Beschreiben Sie die Natur der Kosten in der Zielfunktion. Woher stammen diese?</li>
<li>Was ist die Einschränkung einer rein myopischen Politik? Welches Verhalten würden Sie von einer besseren Politik erwarten?</li>
<li>Wie verbessert die Verwendung von Wertfunktionen die Lösung?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Blutmanagement - Teil I: Modellierung - Wir werden das Blutmanagementproblem betrachten, aber wir nehmen an, dass es nur eine Blutgruppe gibt, obwohl wir immer noch den Alterungsprozess modellieren werden, bei dem Blut 0 bis 5 Wochen alt sein kann. Jedes 5 Wochen alte Blut, das zurückgehalten wird, muss entsorgt werden. Wie im Buch gibt es zwei Arten von Patienten: dringend und wahlfrei. Sei:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$R_{t\tau}$</td><td>Anzahl der zum Zeitpunkt $t$ vorrätigen Bluteinheiten, die für $\tau$ Zeitperioden zurückgehalten wurden, $\tau = 0, \ldots, 5$.</td></tr>
<tr><td>$\Rhat_t$</td><td>Neue Blutspenden, die zwischen $t-1$ und $t$ eintreffen, wobei $\Rhat_t$ ein Skalar ist.</td></tr>
<tr><td>$\Dhat^{urgent}_t$</td><td>Neue dringende Bedarfe, die zum Zeitpunkt $t$ eintreffen.</td></tr>
<tr><td>$\Dhat^{elective}_t$</td><td>Neue wahlfreie Bedarfe, die zum Zeitpunkt $t$ eintreffen.</td></tr>
</tbody>
</table>
</div>

<p>Zum Zeitpunkt $t$ müssen wir entscheiden:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$x^{urgent}_t$</td><td>Menge an Blut, die dringenden Patienten zugewiesen werden soll.</td></tr>
<tr><td>$x^{elective}_t$</td><td>Menge an Blut, die wahlfreien Patienten zugewiesen werden soll.</td></tr>
<tr><td>$x^{hold}_t$</td><td>Menge an Blut, die zurückgehalten werden soll.</td></tr>
<tr><td>$x_t$</td><td>$(x^{urgent}_t,x^{elective}_t,x^{hold}_t)$.</td></tr>
</tbody>
</table>
</div>

<p>Bedarfe müssen nicht gedeckt werden, obwohl die eigentliche Frage darin besteht, ob ein wahlfreier Bedarf jetzt gedeckt werden soll (unter der Annahme, dass genug Blut vorhanden ist, um alle dringenden Bedarfe zu decken) oder ob das Blut für einen potenziellen dringenden Bedarf in der Zukunft zurückgehalten werden soll. Nehmen Sie wie zuvor an, dass jede nicht bediente Nachfrage das System verlässt.</p>

<p>Ihr Ziel ist es, eine Nutzenfunktion zu maximieren, die für jeden versorgten dringenden Patienten eine Gutschrift von 10 und für jeden versorgten elektiven Patienten eine Gutschrift von 5 vergibt.</p>
  <ol type="a">
    <li>Was ist die Zustandsvariable für dieses Problem?</li>
    <li>Was sind die Entscheidungsvariablen und die exogene Information?</li>
    <li>Was ist die Übergangsfunktion?</li>
    <li>Was ist die Zielfunktion? Nehmen Sie an, dass wir die Politik in einem Simulator simulieren können.</li>
    <li>Erstellen Sie eine parametrisierte Kostenfunktionsapproximation, die jeder Entscheidung die folgenden Kosten zuordnet: $c^{urgent}$, Strafe dafür, dass ein dringender Patient nicht versorgt wird; $c^{elective}$, Strafe dafür, dass ein elektiver Patient nicht versorgt wird; und $c^{discard}$, Strafe für das Entsorgen von Blut, das älter als 5 Wochen ist.

    Nehmen Sie als Ihre Politik an, dass Sie diese Kosten in jeder Zeitperiode minimieren werden. Behandeln Sie den Vektor $c=(c^{urgent},c^{elective},c^{discard})$ als eine Menge abstimmbarer Parameter. Beschreiben Sie, wie der Vektor $c$ mithilfe eines stochastischen Gradientenalgorithmus optimiert werden kann. Geben Sie unbedingt die Gleichung zur Berechnung des stochastischen Gradienten an.</li>
  </ol>
</li>
<li>Blutmanagement - Teil II: Rückwärts-approximative dynamische Programmierung - Wir werden nun eine Politik entwerfen, die auf der Idee basiert, die Wertfunktion mithilfe der rückwärts-approximativen dynamischen Programmierung zu approximieren. Das bedeutet, dass Sie ein lineares Modell zur Approximation von $V^x_t(S^x_t)$ angeben müssen. Die Details dieses Modells sind nicht besonders wichtig, aber Sie könnten etwas Ähnliches wie

$$
\Vbar^x_t(S^x_t) = \thetabar_{t0} + \sum_{age=0}^5 \theta_{t1,age} R^{urgent,x}_{t,age} +  \sum_{age=0}^5 \theta_{t2,age} R^{elective,x}_{t,age}.
$$

verwenden. Für die Zwecke dieser Übung können Sie einfach $\Vbar^x_t(S^x_t) = (\theta_t)^T \phi(S^x_t)$ schreiben, wobei $\theta_t$ ein Spaltenvektor von Koeffizienten und $\phi(S^x_t)$ ein Spaltenvektor von Merkmalen ist.
  <ol type="a">
    <li>Definieren Sie den Post-Entscheidungs-Zustand und verwenden Sie diesen, um die Bellman-Gleichung zu formulieren, die eine optimale Politik charakterisiert. Sie müssen einen Ausdruck für den Wert $V_t(S_t)$, sich im Prä-Entscheidungs-Zustand $S_t$ zum Zeitpunkt $t$ zu befinden, in Bezug auf den Wert $V^x_t(S^x_t)$, sich im Post-Entscheidungs-Zustand $S^x_t$ zu befinden, angeben. Anschließend müssen Sie einen Ausdruck für $V^x_t(S^x_t)$ in Bezug auf $V_{t+1}(S_{t+1})$ angeben. Nehmen Sie an, dass Bluteinheiten immer ganzzahlig sind.</li>
    <li>Wie hoch ist die Dimensionalität der Prä- und Post-Entscheidungs-Zustandsvariablen? Ist es für uns von Bedeutung, wie groß der Zustandsraum ist?</li>
    <li>Schreiben Sie einen detaillierten Pseudocode, der beschreibt, wie die Wertfunktionsapproximationen für dieses Problem über einen endlichen Horizont $0, \ldots, T$ geschätzt werden. Betrachten Sie dies als eine Programmierübung ohne die eigentliche Programmierung. Sie muss detailliert genug sein, dass Sie sie einem Kommilitonen im Kurs (der mit dem Stoff vertraut ist) geben könnten, der dann den Code schreiben könnte.</li>
    <li>Schreiben Sie die Politik unter Verwendung Ihres Ausdrucks für die approximative Wertfunktion auf.</li>
  </ol>
</li>
<li>Blutmanagement - Teil III: Lookahead-Politik - Diesmal nehmen wir an, dass uns rollierende Prognosen für Angebot und Nachfrage vorliegen. Sei $f^R_{tt'}$ die Prognose der Blutspenden zum Zeitpunkt $t'$, erstellt anhand dessen, was wir zum Zeitpunkt $t$ wissen. Seien $f^{D,urgent}_{tt'}$ und $f^{D,elective}_{tt'}$ die Prognosen der zum Zeitpunkt $t'$ neu eintreffenden dringenden und elektiven Nachfragen, gegeben das, was wir zum Zeitpunkt $t$ wissen. Nehmen Sie an, dass Prognosen exogen bereitgestellt werden (das heißt, wir müssen nicht modellieren, wie sich die Prognosen von $t$ zu $t+1$ entwickeln). Sie können

$$
\begin{align*}
f^R_t &= (f^R_{tt'})_{t'=t+1}^T, \\
f^{D,urgent}_t &= (f^{D,urgent}_{tt'})_{t'=t+1}^T, \\
f^{D,elective}_t &= (f^{D,elective}_{tt'})_{t'=t+1}^T, \\
f_t &= (f^R_t,f^{D,urgent}_t,f^{D,elective}_t).
\end{align*}
$$

verwenden. Sei $\sigma^R_{t'-t}$ die Standardabweichung des Fehlers zwischen den tatsächlichen Spenden $\Rhat_{tt'}$, von der wir annehmen, dass sie aufgrund vergangener Leistung bekannt ist. Wir nehmen an, dass dies rein eine Funktion davon ist, wie weit in die Zukunft wir planen, gegeben durch $t'-t$. Ebenso seien $\sigma^{D,urgent}_{t'-t}$ und $\sigma^{D,elective}_{t'-t}$ die Standardabweichungen der Fehler in den Prognosen der neuen dringenden und elektiven Nachfragen.
  <ol type="a">
    <li>Modellieren Sie die fünf Elemente eines sequentiellen Entscheidungsproblems für dieses Szenario. Sie sollten in der Lage sein, Elemente aus einem der vorherigen Teile für dieses Problem zu übernehmen. Zögern Sie nicht, auf beliebige Gleichungen anhand ihrer Nummer zu verweisen, die Sie wiederverwenden möchten. Die wesentliche Änderung ist die Einbeziehung der Prognosen.</li>
    <li>Schreiben Sie eine DLA-Politik unter Verwendung eines deterministischen Lookaheads mit Prognosen als Punktschätzungen für zukünftige Spenden und Nachfragen auf.</li>
    <li>Entwerfen Sie nun eine parametrisierte Politik, bei der Sie jede Prognose durch eine ersetzen, die um eine bestimmte Anzahl von Standardabweichungen über (oder unter) der Punktprognose liegt. Verwenden Sie drei Parameter, die Sie mit $\theta = (\theta^R, \theta^{urgent}, \theta^{elective})$ bezeichnen könnten. Formulieren Sie das Problem, den besten Wert für $\theta$ zu finden, als Optimierungsproblem. Erklären Sie alle Annahmen, die Sie in Ihrer Formulierung treffen müssen.</li>
    <li>Ihre Zielfunktion in Teil (c) beinhaltet die Approximation eines Erwartungswerts. Sie können dies mittels Simulation tun, wobei Sie einen Stichprobenpfad $\omega$ über einen Horizont von $T$ Zeitschritten simulieren würden. Was ist mit $\omega$ gemeint?</li>
    <li>Geben Sie die Formeln zur Berechnung des Mittelwerts und der Stichprobenvarianz der Leistung einer Politik aus $L$ Simulationen unter Verwendung der Stichprobenpfade $\omega^1, \ldots, \omega^L$ an.</li>
    <li>Nehmen Sie an, Sie repräsentieren die Menge der möglichen Werte des Vektors $\theta$ durch die Stichprobe $\theta^1, \ldots, \theta^K$. Beschreiben Sie eine Suchmethode unter Verwendung der Intervallschätzung, parametrisiert durch $\lambda^{IE}$ (im Buch haben wir $\theta^{IE}$ verwendet, aber das erzeugt zu viele $\theta$'s). Sie müssen Ihr Belief-Modell beschreiben und wie es nach jeder Ausführung einer Simulation mit $\theta = \theta^k$ aktualisiert wird. Nehmen Sie an, Sie haben ein Budget von $N$ Simulationen und dass $\lambda^{IE}$ bekannt ist.</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *BloodManagement* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li><p>Unser Ziel ist es, die Zuordnung verschiedener Blutgruppen zu verschiedenen Patienten zu verwalten, die zunächst durch ihre eigene Blutgruppe und zweitens dadurch charakterisiert werden, ob die Operation dringend oder elektiv ist.</p>

<p>In dieser Übung werden Sie mit zwei Klassen von Politiken arbeiten: einer myopischen parametrischen Kostenfunktionsapproximation und einer Politik, die auf Wertfunktionsapproximationen basiert.</p>

<p>Wir beginnen mit der Annahme, dass Sie lediglich verschiedene Blutgruppen verschiedenen Bedarfen zuordnen. Blut wird durch Blutgruppe (von denen es acht gibt) und Alter beschrieben, das von 0 bis 2 Wochen reicht (3 Wochen altes Blut wird entsorgt). Patienten werden durch Blutgruppe beschrieben und dadurch, ob die Operation dringend oder elektiv ist. Es gibt verschiedene Boni und Strafen, die die Zuordnungen steuern. Zum Beispiel gibt es positive Boni für die Versorgung dringender Patienten (dieser ist am höchsten). Es gibt außerdem einen Bonus für die exakte Übereinstimmung der Blutgruppen (z.B. A-positives Blut mit einem A-positiven Patienten) sowie eine Strafe für das Entsorgen von Blut, wenn es zu alt wird.</p>

<p>Wenn wir die Auswirkung heutiger Entscheidungen auf die Zukunft ignorieren, erhalten wir ein einfaches lineares Programm, das Angebot und Nachfrage zuordnet, mit Kosten, die durch diese Menge von Boni gegeben sind. Das Problem ist, dass wir, indem wir die Auswirkung heutiger Entscheidungen auf die Zukunft ignorieren, möglicherweise feststellen, dass wir nicht das Bestmögliche tun. Ein Problem, das auftritt, ist, dass wir, wenn wir jetzt Blut für elektive Operationen verwenden, ignorieren, dass dies möglicherweise nützlich wäre, es aufzubewahren, falls uns später Blut für dringende Operationen ausgeht. Alternativ könnten wir jetzt O-negatives Blut verwenden, anstatt es für die Zukunft aufzubewahren, wenn uns möglicherweise andere Blutgruppen ausgehen.</p>

<p>Sei $R_{ta}$ das Angebot an Blut mit Attribut $a$ für Woche $t$, und sei $R_t = (R_{ta})_{a\in\Acal}$, wobei $\Acal$ die Menge aller verschiedenen Blutattribute (Blutgruppe und Alter) ist. Seien ähnlich $D_{tb}$ die Attribute eines Patienten, wobei $b$ die Blutgruppe erfasst und ob die Operation dringend oder elektiv ist, und sei $D_t = (D_{tb})_{b\in\Bcal}$. Der Zustand unseres Systems ist $S_t = (R_t,D_t)$.</p>

<p>Sei nun $\Rhat_{t+1,a}$ die Anzahl der Bluteinheiten mit Attribut $a$, die zwischen den Wochen $t$ und $t+1$ gespendet wurden. Sei ähnlich $\Dhat_{t+1,b}$ die Anzahl der neuen Patientenankünfte mit Attribut $b$. Wir würden schreiben</p>

$$
W_{t+1} = (\Rhat_{t+1,a},\Dhat_{t+1,b}).
$$

<p>Schließlich sei $\omega$ ein Stichprobenpfad $W_1(\omega), \ldots, W_T(\omega)$ von Spenden und neuen Patienten über unseren $T$-Wochen-Horizont. Nehmen Sie an, dass wir eine Menge von Simulationen von $W_t$ erstellt haben, und sei $\Omega=(\omega_1, \ldots, \omega_N)$ diese Menge von Stichprobenrealisierungen.</p>
  <ol type="a">
    <li>Wie viele Dimensionen hat die Zustandsvariable $S_t$?</li>
    <li>Sei $X^\pi(S_t\vert \theta)$ das Ergebnis der Lösung des linearen Programms gegeben den Zustand $S_t$, wobei $\theta$ der Vektor aller Boni und Strafen für verschiedene Zuordnungen ist. Sei $D^{urgent}_t(x_t)$ die Anzahl der dringenden Patienten, die gegeben den Entscheidungsvektor $x_t$ versorgt wurden, und sei $D^{elective}_t(x_t)$ die Anzahl der versorgten elektiven Patienten. Formulieren Sie das Problem, den besten Wert von $\theta$ zu finden, als Optimierungsproblem, wobei Sie es anstelle unseres üblichen Erwartungswerts als Durchschnitt über die Stichprobenpfade in $\Omega$ schreiben.</li>
    <li>Wir betrachten nun einen Datensatz, bei dem es eine Wahrscheinlichkeit gibt, dass die Nachfrage gelegentlich sprunghaft ansteigt. Sie können diese Wahrscheinlichkeit in der Tabellenkalkulation einstellen. Setzen Sie diese Sprungwahrscheinlichkeit auf 50 Prozent. Es gibt eine besondere Strafe für die Verwendung von Blut zur Versorgung elektiver Operationen, um das myopische Modell zu ermutigen, Blut für dringende Operationen aufzusparen, bei denen die Nachfrage später ansteigen könnte. Finden Sie den besten Wert für diese Strafe aus der Menge $\lbrace -4,-9,-14,-19,-24\rbrace $ nach 20 Testiterationen.</li>
    <li>Stellen Sie sich nun, ohne weitere numerische Arbeit zu leisten, vor, dass die Strafe für O-negatives Blut von der Woche abhängen muss, um saisonale Schwankungen zu berücksichtigen. Da Sie 15 Wochen simulieren, beschreiben Sie eine Methode zur Optimierung über einen 15-dimensionalen Vektor (wir haben zwei zentrale Strategien in früheren Aufgaben beschrieben - Sie können eine auswählen oder eine neue erfinden).</li>
  </ol>
</li>
<li><p>Nun wechseln wir zu einer VFA-basierten Politik, bei der wir den Grenzwert jeder Blutgruppe (und jedes Alters) verwenden, die für die Zukunft aufbewahrt wird. Dies wird mit einem adaptiven Lernalgorithmus durchgeführt, der im obigen Abschnitt zur VFA-Politik beschrieben wurde (und unserer ADP-Strategie für das Kürzeste-Wege-Problem sehr ähnlich ist, außer dass wir dies nun für ein Problem tun, bei dem die Entscheidung ein Vektor ist).</p>

<p>Setzen Sie die Strafe für die Verwendung von Blut für elektive Operationen auf 0. Bei Verwendung einer VFA-basierten Politik sollte die VFA lernen, dass dringendes Blut, das das Angebot übersteigt, in Zukunft benötigt werden könnte. Wenn Sie die VFA-Politik verwenden, müssen Sie 20 Trainingsiterationen durchführen, um die Wertfunktionen zu schätzen. Nachdem diese geschätzt wurden, führen Sie dann 20 Testiterationen durch, um die Qualität der Politik zu bewerten.</p>

<p>Wir werden unsere Politiken für einen Datensatz testen, bei dem eine Wahrscheinlichkeit besteht, dass die Nachfrage gelegentlich sprunghaft ansteigt. Sie können diese Wahrscheinlichkeit in der Tabellenkalkulation einstellen. Beginnen Sie damit, diese Sprungwahrscheinlichkeit auf 0,7 zu setzen.</p>
  <ol type="a">
    <li>Der adaptive Lernalgorithmus erfordert die Schätzung des Grenzwerts jeder Blutgruppe. Sei $\vhat^n_{ta}$ unsere Schätzung des Grenzwerts der Blutgruppe $a$ für Woche $t$ während der Simulation des Stichprobenpfads $\omega^n$.

    Sei $\Vbar^{n-1}_t(R_{ta})$ unsere Schätzung, nach $n-1$ Iterationen, des Grenzwerts der $r$-ten Einheit Blut, wobei $r = R^x_{ta}$ am Ende von Woche $t$ (dies ist unsere „Post-Entscheidungs"-Zustandsvariable). Denken Sie daran, dass wir $\vhat^n_{ta}$ verwenden, um die Wertfunktionsapproximation um die vorherige Post-Entscheidungs-Zustandsvariable zu aktualisieren. Wir schreiben diesen Aktualisierungsprozess als

    $$
    \Vbar^n_{t-1,a}(R^{x,n}_{t-1,a}) = (1-\alpha) \Vbar^{n-1}_{t-1,a}(R^{x,n}_{t-1,a}) + \alpha \vhat^n_{ta}.
    $$

    Unsere erste Aufgabe besteht darin, dass wir $\alpha$ abstimmen müssen. Führen Sie den approximativen dynamischen Programmierungsalgorithmus für 20 Iterationen aus (so ist die Tabellenkalkulation eingerichtet) für $\alpha \in  \lbrace 0, 0.05, 0.1, 0.2, 0.3\rbrace $ und berichten Sie die Ergebnisse. Beachten Sie, dass eine Schrittweite $\alpha = 0$ dasselbe ist wie das Beibehalten der Wertfunktionsapproximation gleich null (mit anderen Worten die myopische Politik). Wenn $\alpha = 0$, müssen Sie die VFAs nicht trainieren, sondern müssen nur die 20 Testiterationen durchführen, um die Politik zu bewerten.

    Wie gut schneidet die VFA-Politik im Vergleich zur myopischen Politik ab (entsprechend $\alpha = 0$)?</li>
    <li>Wechseln Sie nun die Sprungwahrscheinlichkeit auf null und vergleichen Sie die myopische Politik mit der VFA-Politik unter Verwendung einer Schrittweite von $\alpha = 0.2$. Wie schneiden diese im Vergleich ab? Können Sie das Verhalten für diesen Datensatz im Vergleich zu dem Fall erklären, in dem es Nachfragesprünge gab?</li>
  </ol>
</li>
</ol>
{% endraw %}
