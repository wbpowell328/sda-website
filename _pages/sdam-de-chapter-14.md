---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "**Kapitel 14: Optimierung klinischer Studien**"
permalink: /sdam/de/chapter-14/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: d2f03f02e366eab2
---


{% raw %}
## Kapitelübersicht

Um ein Medikament auf den Markt zu bringen, müssen Pharmaunternehmen einen dreiphasigen Testprozess durchlaufen, der mit der teuersten Phase, der Phase III, endet, in der das Medikament Hunderten oder Tausenden von Patienten verabreicht wird. Jede Woche prüft das Pharmaunternehmen die Ergebnisse der Experimente und muss die Entscheidung treffen, ob die Tests fortgesetzt werden, ob gestoppt und zur Marktreife gebracht wird oder ob gestoppt und das Medikament aufgegeben wird.

Es gibt mehrere Quellen der Unsicherheit. Die erste ist natürlich die Wirksamkeit des Medikaments selbst. Um das Medikament jedoch zu testen, müssen wir Patienten anmelden, die bereit sind, das Medikament (oder ein Placebo) einzunehmen, und dies führt zu einer weiteren Quelle der Unsicherheit. Dann gibt es noch die Unsicherheit über die Wahrscheinlichkeit, dass ein Medikament bei einem bestimmten Patienten wirkt, die sich vom tatsächlichen Ergebnis unterscheidet, wenn einem Patienten das Medikament verabreicht wird.

Wir nutzen diese Problemstellung, um drei verschiedene direkte Lookahead-Politiken zu veranschaulichen, indem wir unterschiedliche Ansätze zur Approximation des Problems vorschlagen, von einem einfachen Modell, das niemals funktionieren würde, bis hin zu ausgefeilteren Modellen, die eine bessere Genauigkeit bieten – zum Preis höherer Komplexität.

## Erzählung

Zu jedem Zeitpunkt führen Pharmaunternehmen möglicherweise Hunderttausende klinischer Studien durch, in denen neue Medikamente getestet werden (siehe [clinicaltrials.gov](https://clinicaltrials.gov)). Die Medikamentenprüfung erfolgt in drei Phasen:

**Phase I** – Dies sind Tests, die mit 20 bis 100 Freiwilligen über einige Monate durchgeführt werden, um die Dosierung zu bestimmen, Nebenwirkungen zu identifizieren und eine erste Bewertung der Wirkung und Nebenwirkungen des Medikaments vorzunehmen.

**Phase II** – Dies sind größere Studien mit mehreren hundert Patienten über einen Zeitraum von zwei Jahren. Das Ziel besteht darin, festzustellen, ob die Krankheit auf die Behandlung anspricht.

**Phase III** – Dies sind Studien mit Hunderten bis Tausenden von Patienten, die sich oft über mehrere Jahre erstrecken, um Wirksamkeit und Sicherheit zu bewerten. Hier wird festgestellt, ob die Behandlung besser ist als bestehende Behandlungen.

Sowohl Phase-II- als auch Phase-III-Studien erfordern die Identifizierung von Patienten mit den geeigneten Merkmalen für die Teilnahme an der Studie, wobei sie dann zufällig einer der Vergleichsgruppen zugeordnet werden.

In unserer Übung nehmen wir an, dass wir jede Woche eine Reihe von Krankenhäusern und Kliniken anmelden, um eine *potenzielle* Population zu erreichen, aus der Patienten anhand von Papierunterlagen als Kandidaten für die Studie identifiziert werden. Es gibt vorab anfallende Verwaltungskosten für die Anmeldung eines Krankenhauses oder einer Klinik zur Studie. Die Verwaltungskosten spiegeln den Patientenpool wider, den die Einrichtung möglicherweise für die Studie zur Verfügung hat. Es könnte beispielsweise ＄250.000 kosten, eine Gruppe von Krankenhäusern und Kliniken mit einer potenziellen Gesamtpopulation von 500 Patienten anzumelden. In unserem Modell werden wir einfach eine Anmeldegebühr von ＄500 pro Patient festlegen, wobei zu berücksichtigen ist, dass diese sich auf eine potenzielle Gesamtpopulation bezieht, aus der wir tatsächliche Anmeldungen ziehen.

Sobald wir eine Einrichtung angemeldet haben, werben wir für die klinische Studie, woraufhin Patienten (oder deren Ärzte) sich melden. Zu diesem Zeitpunkt wird ein Patient dann einer detaillierteren Bewertung unterzogen, die bestimmt, wer in die Studie aufgenommen wird. Nicht geeignete Patienten werden dann ausgeschlossen.

Für den Zweck dieser Übung gehen wir davon aus, dass jedem Patienten zu Beginn der Woche ein Medikament verabreicht wird. Am Ende der Woche wissen wir, ob der Patient darauf ansprich oder nicht. Patienten, die ansprechen, werden als Erfolge bezeichnet, die übrigen als Fehlschläge. Jede Woche benötigt dann eine völlig neue Gruppe von Patienten, die jedoch aus der von uns angemeldeten Basispopulation gezogen werden. Wir können diese Population nur vergrößern, indem wir mehr Kapazität in die Studie einbringen und die vorab anfallenden Verwaltungskosten bezahlen.

## Rahmung des Problems

Die Antworten auf unsere drei Rahmenfragen sind:

- **Metriken:** Maximierung des erwarteten Umsatzes, der erzielt wird, wenn ein Medikament zur Anwendung zugelassen wird, abzüglich der wöchentlichen Kosten für die Durchführung einer Studie und abzüglich der Kosten für die Verabreichung des Medikaments an jeden Patienten der Studie.
- **Entscheidungen:** Bei der Durchführung einer klinischen Studie werden drei Arten von Entscheidungen getroffen: ob die Studie eine weitere Woche fortgesetzt oder gestoppt werden soll; wenn die Entscheidung zum Stoppen fällt, muss entschieden werden, ob das Medikament aufgegeben oder zur Marktreife gebracht wird; und wenn die Studie fortgesetzt wird, muss zudem entschieden werden, wie viele neue Patienten angemeldet werden.
- **Unsicherheiten:** Es gibt zwei Quellen der Unsicherheit: wie viele Patienten sich jede Woche für die Studie anmelden, und die Ergebnisse jedes Patienten in der Studie, unabhängig davon, ob er das Medikament oder ein Placebo erhalten hat.

## Grundmodell

Wir gehen davon aus, dass wir am Ende jeder Woche $t$ Entscheidungen treffen, die während der Woche $t+1$ umgesetzt werden. Wir bezeichnen mit der Zeit $t$ das Ende der Woche $t$.

### Zustandsvariablen

Wir haben folgende Zustandsvariablen: $R_t$, die potenzielle Population von Patienten in den angemeldeten Krankenhäusern und Kliniken; $\alpha_t$, die Anzahl der Erfolge der Behandlung bis Woche $t$ im Verlauf der klinischen Studie; $\beta_t$, die Anzahl der Fehlschläge der Behandlung bis Woche $t$; und $\bar\lambda^{response}\_t$, den geschätzten Anteil potenzieller Patienten, die sich entscheiden, an der Studie teilzunehmen, gegeben unser Wissensstand zum Zeitpunkt $t$.

Mithilfe dieser Informationen können wir die Wahrscheinlichkeit schätzen, dass unsere Behandlung erfolgreich ist, unter Verwendung von $\rho_t$, der Wahrscheinlichkeit, dass die Behandlung erfolgreich ist, gegeben unser Wissensstand am Ende der Woche $t$, so dass

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Das bedeutet, dass unsere Zustandsvariable lautet

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

Es ist sinnvoll, $R_0 = 0$ als Anfangswert von $R_t$ zu verwenden, wobei es jedoch hilfreich ist, Anfangsschätzungen der Erfolgswahrscheinlichkeit auf Grundlage vorheriger klinischer Studien zu verwenden.

### Entscheidungsvariablen

Wir modellieren die Anzahl der angemeldeten potenziellen Patienten mit $x^{enroll}\_t$, dem Zuwachs an der potenziellen Population von Patienten, der durch die Aufnahme neuer Krankenhauseinrichtungen erreicht wird. Die Anzahl der Patienten, die tatsächlich der klinischen Studie beitreten, wird während der Woche $t+1$ aus dieser Population gezogen.

Wir haben außerdem die Entscheidung, wann die Studie gestoppt werden soll, dargestellt durch

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

Falls $x^{trial}\_t = 0$, dann setzen wir $R_{t+1} = 0$, wodurch die Studie beendet wird. Wir gehen davon aus, dass wir die Studie, nachdem sie einmal gestoppt wurde, nicht wieder aufnehmen können, was bedeutet, dass wir fordern, dass $x^{trial}\_t = 0$ gilt, wenn $R_t = 0$.

Wenn wir die Studie stoppen, müssen wir erklären, ob das Medikament ein Erfolg oder ein Fehlschlag ist,

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

Wir werden Politiken $X^{\pi^{enroll}}(S_t)$, $X^{\pi^{trial}}(S_t)$ und $X^{\pi^{drug}}(S_t)$ erstellen, die $x^{enroll}\_t$, $x^{trial}\_t$ und $x^{drug}\_t$ bestimmen. Wir können dann schreiben

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

Wie immer entwerfen wir die Politiken später.

### Exogene Information

Wir identifizieren zunächst neue Patienten und Patientenabgänge zur und von der Studie mithilfe von $\Rhat_{t+1}$, der Anzahl neuer Patienten, die während der Woche $t+1$ der Studie beitreten, was von der potenziellen Population der angemeldeten Patienten abhängt, gegeben durch $R_{t+1} = R_t + x^{enroll}\_t$. Wir könnten beispielsweise annehmen, dass jeder Patient in der Population $R_{t+1}$ mit einer Wahrscheinlichkeit $\lambda^{response}$, die aus Daten geschätzt werden muss, an der klinischen Studie teilnimmt.

Als nächstes verfolgen wir unsere Erfolge mit $\Xhat_{t+1}$, der Anzahl der Erfolge während der Woche $t+1$, und $\Yhat_{t+1}$, der Anzahl der Fehlschläge während der Woche $t+1$. Die Anzahl der Fehlschläge während der Woche $t$ kann berechnet werden als

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

Diese Variablen hängen von der Anzahl der Patienten $R_t$ im System am Ende der Woche $t$ ab. Wie immer verweisen wir für die Entwicklung der zugrunde liegenden Wahrscheinlichkeitsmodelle für diese Zufallsvariablen auf den Abschnitt über Unsicherheitsmodellierung.

Unser exogener Informationsprozess ist dann

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

wobei wir $\Yhat_{t+1}$ ausschließen, da es aus den anderen Variablen berechnet werden kann.

### Übergangsfunktion

Die Übergangsgleichung für die Anzahl der angemeldeten Patienten ist gegeben durch

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

Wir aktualisieren die Wahrscheinlichkeit, dass das Medikament erfolgreich ist, indem wir die Anzahl der Erfolge und Fehlschläge zählen, unter Verwendung von

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

Schließlich aktualisieren wir unsere Schätzung der Anzahl der Patienten, die sich für die Studie anmelden, indem wir die aktuelle Schätzung $\bar\lambda^{response}\_t$ mit dem neuesten Verhältnis aus der Anzahl derjenigen, die sich während der Woche $t+1$ angemeldet haben, $\Rhat_{t+1}$, und der Anzahl der derzeit angemeldeten Personen, $R_t + x^{enroll}\_t$, glätten.

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

Die Gleichungen $\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$ bilden die Übergangsfunktion, die wir generisch mit

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

darstellen.

### Zielfunktion

Wir müssen folgende Kosten berücksichtigen: $c^{enroll}$, die Kosten für die Betreuung eines Patienten in der Studie pro Zeitperiode; $c^{trial}$, die laufenden Verwaltungskosten für die Fortführung der Studie (diese entfallen, wenn wir die Tests beenden); und $p^{success}$, den (hohen) Umsatz, der erzielt wird, wenn wir stoppen und einen Erfolg erklären, was in der Regel bedeutet, dass das Patent an einen Hersteller verkauft wird.

Der Gewinn (Beitrag) in einer Zeitperiode ergibt sich dann aus

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

Unsere Zielfunktion wäre dann unsere kanonische Zielfunktion, die wir folgendermaßen formulieren

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

wobei wir erkennen, dass unsere Politik eine Zusammensetzung der Patientenanmeldungspolitik $X^{\pi^{enroll}}(S_t)$, der Studienfortführungspolitik $X^{\pi^{trial}}(S_t)$ und der Erfolgs-/Fehlschlagspolitik des Medikaments $X^{\pi^{drug}}(S_t)$ ist.

## Modellierung der Unsicherheit

Es gibt zwei mögliche Gründe, ein formales Unsicherheitsmodell zu entwickeln. Der erste betrifft das Grundmodell, das wir sowohl zum Entwurf von Politiken als auch zur Durchführung von Studien verwenden können. Der zweite besteht darin, dass wir möglicherweise die Unsicherheit in einer stochastischen Lookahead-Politik modellieren möchten.

Wir beginnen mit der Entwicklung eines probabilistischen Grundmodells, was bedeutet, dass wir uns nach besten Kräften bemühen, das reale Problem zu modellieren, wobei wir anerkennen, dass alle mathematischen Modelle Näherungen der realen Welt sind.

Wir müssen drei Zufallsvariablen modellieren:

- Die Anzahl der Kunden $\Rhat_{t+1}$, die sich für die Studie anmelden.
- Die (nicht beobachtbare) Erfolgsrate $\rho^{true}$.
- Die Anzahl der Erfolge $\Xhat_{t+1}$, die wir tatsächlich beobachten.

Wir behandeln jede dieser Variablen im Folgenden.

### Der Patientenanmeldungsprozess

Wir werden das einfache Modell verwenden, bei dem wir Entscheidungen treffen (z. B. durch die Anmeldung von Krankenhäusern und Kliniken), die es uns ermöglichen, damit zu rechnen, $x^{enroll}\_t$ Patienten für die Woche $t+1$ anzumelden, wodurch wir eine Gesamtpopulation von $R_{t+1} = R_t + x^{enroll}\_t$ erhalten. Die Realität wird davon abweichen. Wir schlagen vor, die tatsächliche Anzahl der Ankünfte zu modellieren, indem wir annehmen, dass sie poissonverteilt sind mit einem Mittelwert von $\bar\lambda^{response} (R_t + x^{enroll}\_t)$, wobei $0 < \bar\lambda^{response} < 1$ der Anteil der potenziellen Patienten ist, die sich entscheiden, an der Studie teilzunehmen (der unbekannt ist). Das bedeutet, dass wir schreiben können

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

Wir können eine trunkierte Poisson-Verteilung für $\Rhat_{t+1}$ verwenden, wobei wir berücksichtigen müssen, dass die Anzahl der Patienten, die der Studie beitreten, durch die Anzahl der potenziellen Patienten, gegeben durch $R_{t+1} = R_t + x^{enroll}\_t$, begrenzt ist. Sei

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

die erwartete Anzahl der Patienten, die sich freiwillig für die Studie melden werden (gegeben $R_t$), und

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

Wir schreiben $P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$ als Funktion von $x^{enroll}\_t$ und $\Rbar_t$, um seine Abhängigkeit von der Entscheidung und von der Anzahl $R_{t+1} = R_t + x^{enroll}\_t$ widerzuspiegeln.

Die trunkierte Poisson-Verteilung ist dann gegeben durch

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

Für einen Populationsprozess wie diesen ist ein Poisson-Prozess ein guter Ausgangspunkt. Er weist die Eigenschaft auf, dass der Mittelwert gleich der Varianz ist, was gleich $\Rbar_t$ ist.

### Die Erfolgswahrscheinlichkeit

Die Erfolge werden durch die zugrunde liegende, jedoch nicht beobachtbare, Wahrscheinlichkeit bestimmt, dass die Behandlung bei einem Patienten während einer Woche zu einem Erfolg führt. Wir verwenden den Bayesschen Stil, indem wir $\rho^{true}$ eine Wahrscheinlichkeitsverteilung zuweisen. Es gibt drei Möglichkeiten, die Verteilung unserer Überzeugung über $\rho^{true}$ darzustellen:

- Eine gleichmäßige (uniforme) Priorverteilung, bei der wir annehmen würden, dass $\rho^{true}$ gleichmäßig zwischen $0$ und $1$ verteilt ist.
- Eine Beta-Verteilung mit Parametern $(\alpha_0,\beta_0)$.
- Eine gesampelte Verteilung, bei der wir annehmen, dass $\rho^{true}$ einen der Werte aus der Menge $(\rho_1, \ldots, \rho_K)$ annimmt, wobei wir unsere Anfangsverteilung als $p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$ festlegen. Wir könnten $p_{0k} = 1/K$ setzen (dies wäre vergleichbar mit der Verwendung der uniformen Priorverteilung). Alternativ könnten wir diese aus der Beta-Verteilung schätzen.

Vorerst werden wir unsere gesampelte Verteilung verwenden, da sie am einfachsten zu handhaben ist.

### Der Erfolgsprozess

Die zufällige Anzahl der Erfolge $\Xhat_{t+1}$, gegeben unser Wissensstand zum Zeitpunkt $t$, hängt zunächst von der Zufallsvariable $\Rhat_{t+1}$ ab, die die Anzahl der Patienten angibt, die der Studie beigetreten sind, sowie von der unbekannten Erfolgswahrscheinlichkeit $\rho^{true}$ in der Studie. Die Methode zur Erstellung der Verteilung von $\Xhat_{t+1}$ besteht darin, die Kraft der Konditionierung zu nutzen. Wir nehmen an, dass $\Rhat_{t+1} = r$ und dass $\rho^{true} = \rho_k$.

Unter der Annahme, dass $r$ Patienten der Studie beitreten und dass die Erfolgswahrscheinlichkeit $\rho_k$ beträgt, ist die Anzahl der Erfolge $\Xhat_{t+1}$ die Summe von $r$ Bernoulli-Zufallsvariablen (d. h. 0/1-Zufallsvariablen). Die Summe von $r$ Bernoulli-Zufallsvariablen ist durch eine Binomialverteilung gegeben, was bedeutet

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

Wir können die unbedingte Verteilung von $\Xhat_{t+1}$ finden, indem wir einfach über $r$ und $k$ summieren und mit den entsprechenden Wahrscheinlichkeiten multiplizieren, was uns Folgendes liefert

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

Die Verwendung expliziter Wahrscheinlichkeitsverteilungen wie derjenigen für $\Xhat_{t+1}$ in Gleichung $\eqref{eq:clinicaltrialsuccessdist}$ ist schön, wenn wir sie finden (und berechnen) können, aber es gibt viele komplexe Probleme, bei denen dies nicht möglich ist. Selbst Gleichung $\eqref{eq:clinicaltrialsuccessdist}$ erforderte beispielsweise, dass wir den Kniff verwendeten, eine gesampelte Repräsentation der stetigen Zufallsvariable $\rho^{true}$ zu nutzen. Ohne dies hätten wir ein Integral über die Dichte für $\rho^{true}$ einführen müssen.

Ein anderer Ansatz, der viel einfacher ist und sich auf noch kompliziertere Situationen erweitern lässt, verwendet Monte-Carlo-Sampling, um $\Rhat_{t+1}$ und $\Xhat_{t+1}$ zu erzeugen. Dieser Prozess wird nachfolgend beschrieben, der eine Stichprobe $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ (und die entsprechende $\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$) erzeugt. Wir können nun die Zufallsvariable $\Xhat_{t+1}$ mit der Menge der Ergebnisse $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ approximieren, von denen jedes mit gleicher Wahrscheinlichkeit auftreten kann.

<div class="book-algorithm">
<p><strong>Ein Monte-Carlo-basiertes Modell des klinischen Studienprozesses</strong></p>
<p><strong>Schritt 1.</strong> Schleife über Iterationen $n=1, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2a.</strong> Erzeuge eine Monte-Carlo-Stichprobe $r^n \sim \Rhat_{t+1}(x^{enroll})$ aus der Poisson-Verteilung gemäß Gleichung $\eqref{eq:clinicaltrialpoisson2}$.</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2b.</strong> Erzeuge eine Monte-Carlo-Stichprobe der wahren Erfolgswahrscheinlichkeit $\rho^n \sim \rho^{true}$.</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2c.</strong> Gegeben $r^n$ und $\rho^n$, durchlaufe unsere $r^n$ Patienten und erzeuge eine 0/1-Zufallsvariable, die mit Wahrscheinlichkeit $\rho^n$ den Wert 1 annimmt (das heißt, das Medikament war ein Erfolg).</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2d.</strong> Summiere die Erfolge und lasse dies eine Stichprobenrealisierung von $\Xhat^n_{t+1}$ sein.</p>
<p><strong>Schritt 3.</strong> Gib die Stichprobe $\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$ aus.</p>
</div>

## Entwurf von Politiken

Wir werden dieses Problem nutzen, um unsere vollständige stochastische Lookahead-Politik wirklich zu verstehen, die wir erstmals in [Kapitel 7](/sdam/de/chapter-7/) eingeführt haben, gegeben durch

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

Wir werden uns darauf konzentrieren, was mit dieser Maximierung über Politiken $\pi$ gemeint ist, die innerhalb der Politik eingebettet ist (dies könnte man die "Politik-innerhalb-der-Politik" nennen).

Für unsere Anwendung klinischer Studien müssen wir Politiken für die drei verschiedenen Entscheidungen entwerfen: die Anzahl der einzuschreibenden Patienten, ob die Studie fortgesetzt werden soll oder nicht, und ob das Medikament bei Abbruch der Studie als Erfolg erklärt wird. Wir beginnen damit, einfache Politik-Funktionsapproximationen für die Entscheidungen zu entwerfen, ob abgebrochen oder fortgesetzt werden soll, und falls wir abbrechen, ob wir das Medikament als Erfolg oder Misserfolg erklären. Anschließend behandeln wir die schwierigere Entscheidung, wie viele Patienten in die Studie eingeschrieben werden sollen.

### Abbruch der Studie

Wir beginnen mit unserem Glauben über $\rho^{true}$, gegeben durch die Beta-Verteilung mit den Parametern $(\alpha_t,\beta_t)$, was uns eine Schätzung liefert von

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Nun führen wir die Parameter $\theta^{stop-low}$ und $\theta^{stop-high}$ ein, wobei wir die Studie abbrechen und Erfolg erklären, wenn $\bar\rho_t > \theta^{stop-high}$, während wir die Studie abbrechen und Misserfolg erklären, wenn $\bar\rho_t < \theta^{stop-low}$. Sei $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$. Wir verwenden diese Regeln, um die Politik für den Abbruch der Studie zu definieren als

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

Wenn wir die Studie abbrechen, dann ist die Politik zur Erklärung von Erfolg (1) oder Misserfolg (0) gegeben durch

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### Die Politik zur Patienteneinschreibung

Es ist häufig der Fall, dass Probleme mit einem physischen Zustand (wie $R_t$) eine Lookahead-Politik benötigen, genau wie wir sie bei unserem stochastischen Kürzeste-Wege-Problem verwendet haben. Aber, wie wir bei dem stochastischen Kürzeste-Wege-Problem gesehen haben, können wir wählen, was wir in unser stochastisches Lookahead-Modell aufnehmen.

Eine Wahl, die wir treffen müssen, ist die Abbruch-Politik $X^{trial}(S_t\vert \theta^{stop})$ und die Erfolg/Misserfolg-Politik $X^{drug}(S_t\vert \theta^{stop})$, wobei wir vorschlagen, denselben Parametervektor $\theta^{stop}$ in unserem Lookahead-Modell zu verwenden wie in unserem Basismodell. Wir können diese als $\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$ und $\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$ bezeichnen, da sie nun nur auf das Lookahead-Modell angewendet werden.

Das Problem, zu bestimmen, wie viele neue potenzielle Patienten eingeschrieben werden sollen, ist etwas schwieriger, da im Voraus Kosten für die Gewinnung weiterer potenzieller Patienten anfallen und wir dies unter Unsicherheit über die Bereitschaft der Patienten tun müssen, sich der Studie anzuschließen (gegeben durch den unbekannten Parameter $\lambda^{response}$).

Um ein vollständiges Lookahead-Modell zu erstellen, wie wir es oben beschrieben haben, würden wir Variablen wie $\tilde\lambda_{tt'}$ für die Lookahead-Version von $\bar\lambda^{response}\_t$, $\tilde\rho_{tt'}$ für $\bar\rho_t$ und $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ für $(\alpha_t, \beta_t)$ erstellen. Ansonsten wäre die gesamte Logik dieselbe wie beim ursprünglichen Unsicherheitsmodell.

Während wir das vollständige Unsicherheitsmodell verwenden können, können wir das Modell auf unterschiedliche Weise vereinfachen. Diese Möglichkeiten umfassen:

- Die Einschreibungsrate $\bar\lambda^{response}\_t$ – Wir haben zwei Optionen: Wir können weiterhin $\bar\lambda^{response}\_t$ schätzen, wobei wir die Notation $\tilde\lambda^{response}\_{tt'}$ als die Schätzung zum Zeitpunkt $t'$ im Lookahead-Modell der Einschreibungsrate $\lambda$ einführen würden; oder wir könnten $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$ fixieren, was unsere Schätzung zum Zeitpunkt $t$ im Basismodell ist.
- Die Erfolgsrate des Medikaments $\rho^{true}$ – Wir haben wiederum zwei Optionen: Wir können weiterhin die Erfolgsrate schätzen, wofür wir die Variablen $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ zur Akkumulation von Erfolgen und Misserfolgen im Lookahead-Modell definieren würden; oder alternativ könnten wir $(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$ innerhalb des Lookahead-Modells fixieren.

Anhand unserer Wahlmöglichkeiten zur Modellierung von Unsicherheit können wir drei verschiedene Strategien zum Entwurf eines Lookahead-Modells vorschlagen:

**Modell A** – Deterministisches Lookahead-Modell. Hier nehmen wir an, dass die Einschreibungsrate $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, was bedeutet, dass die Einschreibungsrate auf die Schätzung zum Zeitpunkt $t$ fixiert ist, wenn wir das Lookahead-Modell erstellen. Wir nehmen dann an, dass die wahre Erfolgswahrscheinlichkeit des Medikaments fixiert ist bei

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

was unsere Schätzung zum Zeitpunkt $t$ im Basismodell ist.

**Modell B** – Wir fixieren unsere Schätzung der Einschreibungsrate bei $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, nehmen jedoch an, dass wir weiterhin über die Wirksamkeit des Medikaments lernen.

**Modell C** – Wir modellieren den Prozess des Erlernens der Einschreibungsrate $\tilde\lambda_{tt'}$ und der Medikamentenwirksamkeit $\tilde\rho_{tt'}$.

Beachten Sie, dass wir das potenzielle vierte Modell nicht einbezogen haben, bei dem wir die Medikamentenwirksamkeit fixieren, aber weiterhin die Patienteneinschreibungsrate lernen (wir werden gleich sehen, wie unsinnig dieses Modell wäre).

Wir werden diese drei Modelle verwenden, um den Prozess des Entwurfs eines Lookahead-Modells zu veranschaulichen.

### Modell A

Modell A ist ein deterministisches Problem, da wir sowohl die geschätzte Einschreibungsrate $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$ als auch $\tilde\rho_{tt'} = \bar\rho_t$ fixieren. Die gute Nachricht ist, dass dies im Wesentlichen ein deterministisches Kürzeste-Wege-Problem ist, bei dem die Anzahl der Patienten, die wir eingeschrieben haben (im Lookahead-Modell), gegeben durch $\Rtilde_{tt'}$, wie ein Knoten in einem Netzwerk ist, und die Entscheidung $\xtilde^{enroll}\_{tt'}$ eine Kante ist, die uns zum Knoten $\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$ führt.

Um dies zu sehen, erinnern Sie sich an Gleichung $\eqref{eq:shortestpathbellman1}$ für unser deterministisches Kürzeste-Wege-Problem, die wir hier wiederholen

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

Nun ersetzen wir einfach $v_i$ für den Wert am Knoten $i$ durch $\Vtilde_{tt'}(\Rtilde_{tt'})$, was der Wert ist, $\Rtilde_{tt'}$ eingeschriebene Patienten zu haben (denken Sie daran, dass wir uns in unserem Lookahead-Modell befinden). Die Entscheidung, zum Knoten $j$ zu gehen, wird durch die Entscheidung ersetzt, $\xtilde^{enroll}\_{tt'}$ Patienten einzuschreiben. Anstatt uns dies zum Knoten $j$ zu führen, führt es uns zum Knoten $\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$. Somit wird die Bellman-Gleichung zu

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

Die Einperioden-Gewinnfunktion $\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$ wird von derselben Funktion für unser Basismodell übernommen (siehe Gleichung $\eqref{eq:clinicaltrialprofit}$).

Es gibt nur ein Problem mit unserem deterministischen Lookahead-Modell: Wir würden niemals abbrechen, da unsere Abbruch-Politik erfordert, dass sich unsere Schätzung von $\tilde\rho_{tt'}$ in die Bereiche "Erfolg" oder "Misserfolg" bewegt (sie müsste im Bereich "fortsetzen" beginnen, da wir das Basismodell sonst bereits abgebrochen hätten). Dies bedeutet jedoch nicht, dass wir das deterministische Lookahead-Modell nicht verwenden können: Wir müssen lediglich einen Horizont $H$ festlegen und abbrechen, wenn $t' = t+H$.

Mit dieser Strategie lösen wir unser deterministisches Kürzeste-Wege-Problem über den Horizont $t'=t, \ldots, t+H$ und finden daraus dann $\xtilde^\ast \_{tt}$. Unsere Einschreibungspolitik ist dann

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

Wir behaupten nicht, dass dies eine wirksame Politik sein wird. Wir veranschaulichen in erster Linie die Arten von Modellierungsapproximationen, die in einem Lookahead-Modell vorgenommen werden können.

### Modell B

Nun werden wir unsere Schätzung der Ansprechrate $\tilde\lambda_{tt'}$ auf unsere Schätzung $\bar\lambda^{response}\_t$ zum Zeitpunkt $t$ im Basismodell fixieren. Um unser Modell zu vereinfachen, nehmen wir an, dass die Anzahl der Einschreibungen $\tilde\Rhat_{t,t'+1}$ der erwarteten Anzahl von Patienten entspricht, die sich freiwillig melden werden $\tilde\Rbar_{tt'}$. Die Einschreibungen $\tilde\Rhat_{t,t'+1}$ werden deterministisch erzeugt aus

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

wobei $\lfloor x \rfloor$ bedeutet, $x$ auf die nächste ganze Zahl abzurunden. Wir berechnen dann die Verteilung von $\tilde\Xhat_{t,t'+1}$ mithilfe von $Prob[\Xhat_{t+1} = s\vert \Rbar_t]$, wobei wir jedoch $\Rbar_t$ durch $\tilde\Rbar_{tt'}$ ersetzen.

Wir müssen dennoch die Anzahl der Erfolge $\tilde\Xhat_{t,t'+1}$ aus einer simulierten Wahrheit $\tilde\rho_{tt'}$ erzeugen, aus der wir $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ aktualisieren, was wir mithilfe von

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

tun. Wir modellieren die Verteilung von $\tilde\Xhat_{t,t'+1}$ mithilfe von $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ in Gleichung $\eqref{eq:clinicaltrialsuccessdist}$, aber unter Bedingung auf $\tilde\Rbar_{tt'}$ anstatt $\Rbar_t$ (denken Sie daran, dass wir statt der Poisson-Verteilung auch die gesampelte Verteilung mittels der oben beschriebenen Monte-Carlo-Methode verwenden können).

Wir können das Lookahead-Modell lösen, indem wir die Bellman-Gleichung für Modell A in Gleichung $\eqref{eq:clinicaltrialbellmanModelA}$ für $t'=t, \ldots, t+H$ anpassen:

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

wobei $\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$ auf die Anzahl der Erfolge $\tilde\Xhat_{t,t'+1} = s$ konditioniert ist, und wobei $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ aus Gleichung $\eqref{eq:clinicaltrialsuccessdist}$ stammt. Wir müssen dabei berücksichtigen, dass die Entwicklung von $\Rtilde_{tt'}$ widerspiegeln muss, ob wir entschieden haben, die Studie im Lookahead-Modell abzubrechen oder fortzusetzen.

Unsere physische Zustandsvariable (Gesamtzahl potenzieller Patienten) $\Rtilde_{t,t'+1}$ ist gegeben durch

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

Beachten Sie, dass, wie bei unserem Basismodell, die Anzahl der potenziellen Patienten auf null sinkt, wenn wir die Studie im Lookahead-Modell abbrechen.

Unsere aktuelle Schätzung des Erfolgs des Medikaments (im Lookahead-Modell) wird berechnet mithilfe von

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

Im Erwartungswert gilt: Wenn wir auf die Anzahl der Erfolge $\tilde\Xhat_{t,t'+1} = s$ konditionieren, dann ist der aktualisierte Belief-Zustand $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

Wir müssen nun das Lookahead-Modell mithilfe der Bellman-Gleichung in <span style="white-space: nowrap;">Gleichung $\eqref{eq:clinicaltrialbellmanModelB}$</span> lösen. Für dieses Problem ist es sinnvoll, einen ausreichend großen Horizont $H$ zu verwenden, sodass wir zuversichtlich annehmen können, dass wir die Studie bis dahin abgebrochen hätten (das heißt $\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$). Dies bedeutet, dass wir $\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$ annehmen können und von dort rückwärts bis zum Zeitpunkt $t$ arbeiten können. Sobald wir das dynamische Programm gelöst haben, können wir unsere Einschreibungsentscheidung mithilfe von

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

extrahieren.

### Modell C

Modell C modelliert den Prozess des Erlernens der Einschreibungsrate $\tilde\lambda_{tt'}$ und der Medikamentenwirksamkeit $\tilde\rho_{tt'}$.

Modell C ist nahezu identisch mit dem Basismodell, da wir alle verschiedenen Formen der Unsicherheit modellieren. Der einzige Aspekt, der es zu einem Lookahead-Modell macht, wäre unsere Einführung der vereinfachten Politik (unsere "Politik-Funktionsapproximation") für den Abbruch der Studie und für die Bestimmung, ob das Medikament ein Erfolg ist. Wir könnten diese Politiken jedoch ignorieren und das gesamte Problem als dynamisches Programm formulieren, wobei wir die vollständige Zustandsvariable verwenden.

## Was haben wir gelernt?

- Wir führen das Problem der klinischen Studie ein, um die Herausforderungen eines Problems zu veranschaulichen, das aktives Lernen beinhaltet (es gibt Belief-Zustandsvariablen), während gleichzeitig eine begrenzte Ressource verwaltet wird (das Budget für die Testung von Patienten).
- Wir veranschaulichen drei Arten von Unsicherheit: den Prozess der Patienteneinschreibung, die Wahrscheinlichkeit, dass das Medikament erfolgreich ist, und den Prozess der Erfolge für einzelne Patienten.
- Wir identifizieren zwei Entscheidungen: ob die Studie abgebrochen und Erfolg oder Misserfolg erklärt werden soll, und die Aufnahme von Patienten in die Studie.
- Wir entwerfen dann drei Arten von Lookahead-Politiken, die sich dadurch unterscheiden, wie wir das Lookahead-Modell approximieren und wie wir Politiken im Lookahead-Modell approximieren.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Die Zustandsvariable $S^n$ enthält Beliefs über zwei unsichere Größen. Um welche unsicheren Größen handelt es sich, und wie werden die Beliefs über sie in der Zustandsvariable erfasst?</li>
<li>Erläutern Sie die drei Entscheidungen, die während der klinischen Studie getroffen werden müssen.</li>
<li>Erläutern Sie die Arten der exogenen Information und wie sie von Entscheidungen und dem Zustand des Systems beeinflusst werden.</li>
<li>Erläutern Sie die Logik der Lookahead-Politik namens Modell A, und diskutieren Sie ihre Stärken und Schwächen.</li>
<li>Erläutern Sie die Logik der Lookahead-Politik namens Modell B, und diskutieren Sie ihre Stärken und Schwächen.</li>
<li>Erläutern Sie die Logik der Lookahead-Politik namens Modell C, und diskutieren Sie ihre Stärken und Schwächen.</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Oben haben wir die vollständige direkte Lookahead-Politik geschrieben als</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

Wenn wir dies tatsächlich berechnen könnten, hätten wir eine optimale Politik. Wir werden diese Politik untersuchen und sie anschließend auf unser Problem der klinischen Studie anwenden.
  <ol type="a">
    <li>Nehmen Sie an, dass jede Zufallsvariable $W_{t+1}, \ldots, W_T$ nur die Ausprägungen 0 oder 1 annehmen kann. Nehmen Sie ferner an, dass die Entscheidung $x_t, \ldots, x_T$ ebenfalls nur die Werte 0 oder 1 annehmen kann. Die Politik in Gleichung $\eqref{eq:optDLAclinicaltrials2}$ lässt sich als Entscheidungsbaum darstellen. Zeichnen Sie den Baum für den Horizont $t, t + 1, t + 2$.</li>
    <li>Welche Struktur hat die durch den Entscheidungsbaum in Teil (a) dargestellte Politik $X^\pi_{t'}(S_{t'})$? Anders gefragt: Um welche Art von Funktion handelt es sich bei $X^\pi_{t'}(S_{t'})$, wenn sie durch einen Entscheidungsbaum gegeben ist?</li>
  </ol>
</li>
<li><p>Da wir Gleichung $\eqref{eq:optDLAclinicaltrials2}$ im Allgemeinen nicht berechnen können, müssen wir das vollständige Lookahead-Modell durch ein approximatives Lookahead-Modell ersetzen, das wir schreiben als</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

wobei die Dynamik unseres approximativen Lookahead-Modells bestimmt wird durch

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>Stellen Sie sich vor, dass unsere Politik im Lookahead-Modell eine parametrische Funktion ist, wie zum Beispiel „Beende die Rekrutierung von Patienten, wenn $\rhobar_t$ außerhalb des Bereichs $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$ liegt.“ Für die Zwecke dieser Frage können wir die Rekrutierungspolitik auch durch ein einfaches „Rekrutiere $\thetatilde^{enroll}$ Patienten“ ersetzen (dies wäre ein statischer Parameter). Wir können diese Funktion als $X^{\tilde \pi}(\Stilde_{tt'})$ schreiben, wobei $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$. Wie würden Sie Gleichung $\eqref{eq:policiesapproximateDLA3}$ umschreiben, um widerzuspiegeln, dass die Politik im Lookahead-Modell eine parametrische Funktion ist?</li>
    <li>Teil (a) impliziert, dass wir den besten Wert von $\thetatilde$ für einen gegebenen Zustand $\Stilde_{t,t+1}$ zum Zeitpunkt $t$ finden müssen. Das bedeutet, dass die optimale Lösung tatsächlich eine Funktion $\thetatilde_{t+1}(\Stilde_{t,t+1})$ ist. Diese müsste berechnet werden, gegeben, dass wir uns im simulierten Zustand $\Stilde_{t,t+1}$ im approximativen Lookahead-Modell befinden.

    In der Praxis erscheint es kompliziert (und teuer), die optimale Politik jedes Mal zu finden, wenn wir einen Schritt vorwärts gehen, da wir anhalten und $\thetatilde$ für jeden Zustand $\Stilde_{t,t+1}$, in dem wir landen, abstimmen müssten.

    Stellen Sie sich nun vor, dass Sie den Prozess vereinfachen möchten, indem Sie nur ein einziges $\theta$ finden, das Sie für alle Zeitpunkte $t$ und jeden Zustand $\Stilde_{t,t+1}$ verwenden. Formulieren Sie das Optimierungsproblem, das Sie lösen müssten, um diesen Wert von $\theta$ zu finden.</li>
    <li>Was ändert sich in den Gleichungen $\eqref{eq:policiesapproximateDLA3}$ und $\eqref{eq:policiesapproximateDLA4}$, wenn wir die Zufallsvariable $\Wtilde_{t,t'+1}$ im Lookahead-Modell durch eine Punktprognose $f^W_{tt'}$ ersetzen? Nehmen Sie weiterhin an, dass die Politik die parametrische Funktion ist, die wir in Teil (a) eingeführt haben.</li>
    <li>Beschreiben Sie die Näherungen, die im Lookahead-Modell B für das Problem der klinischen Studie vorgenommen werden.</li>
  </ol>
</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *ClinicalTrialsDriverScript.py* unter [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Setzen Sie die Studiengröße auf $T = 50$, den Lookahead-Horizont auf $H = 5$ und führen Sie eine Simulation von Modell A durch. Notieren Sie den Stoppzeitpunkt und erklären Sie, warum das deterministische Lookahead-Modell zu jedem Zeitpunkt $t$ dieselbe Anzahl neuer potenzieller Patienten $x^{enroll}_{t}$ liefert.</li>
<li>Setzen Sie nun den Lookahead-Horizont auf $H = 50$. Modifizieren Sie das Modul *ClinicalTrialsDriverScript.py*, um eine for-Schleife einzufügen, und führen Sie 10 Simulationen (Testiterationen) von Modell B durch. Berechnen Sie den durchschnittlichen Umsatz über alle Simulationen.</li>
<li>Bei der Wahl von $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ für unsere PFA zur Bestimmung des Stoppzeitpunkts wählen wir üblicherweise ein ausreichend großes $\theta^{stop-high}$, um sicherzustellen, dass das Medikament erfolgreich ist. Umgekehrt wählen wir ein großes $\theta^{stop-low}$, damit wir, falls die tatsächliche Erfolgsrate des Medikaments gering ist, die Studie frühzeitig abbrechen, bevor wir zu viel Geld verlieren. Wir dürfen $\theta^{stop-low}$ jedoch nicht zu hoch ansetzen, da wir sonst riskieren, die Studie zu beenden, bevor wir ausreichend Informationen über die tatsächliche Erfolgsrate des Medikaments haben.

Fixieren Sie $\theta^{stop-high} = 0.8$ und variieren Sie $\theta^{stop-low}$ im Intervall $[0.77, 0.79]$ in Schritten von 0,005. Führen Sie für jedes resultierende $(\theta^{stop-low}, \theta^{stop-high})$ 5 Simulationen von Modell B durch und berechnen Sie den durchschnittlichen Umsatz. Tragen Sie die resultierenden Umsätze gegen die Werte von $\theta^{stop-low}$ auf.</li>
<li>Die Modelle A und B lösen jeweils ein Lookahead-Problem, bei dem mindestens eine der Schätzungen $\lambdabar_{tt'}$ und $\rhobar_{tt'}$ zum Zeitpunkt $t$ im Basismodell fixiert ist. Modell C verwendet ausschließlich das Basismodell in Form einer hybriden Politiksuche-VFA-Politik, um den Prozess des Lernens sowohl der Rekrutierungsrate $\lambdabar_{tt'}$ als auch von $\rhobar_{tt'}$ zu modellieren. Wir können jedoch eine Lookahead-Version von Modell C erstellen (genannt Modell-C-Erweiterung), bei der die Rekrutierungen $\tilde\Rhat_{t,t'+1}$ aus der trunkierten Poisson-Verteilung mit Mittelwert

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

erzeugt werden und die Verteilung von $\tilde\Xhat_{t,t'+1}$ dieselbe ist wie in Modell B.

Ihre Aufgabe ist es, die Modell-C-Erweiterung zu implementieren, indem Sie die Methode *model_C_extension_value_fn* zum Python-Modul *ClinicalTrialsPolicy.py* hinzufügen. Die Methode wird von model_C_extension_policy (die bereits im Code vorhanden ist) aufgerufen, um mittels *model_C_extension_value_fn* die Wertfunktion für die Bellman-Gleichung zu berechnen. Um die Methode *model_C_extension_value_fn* zu schreiben, kopieren Sie den Code aus *model_B_value_fn* und fügen Sie eine zusätzliche for-Schleife für die neuen Rekrutierungen in $[0, x^{enroll})$ in Schritten von $x^{enroll}/10$ hinzu. Ändern Sie den Schrittwert und die Bellman-Kosten, um die Modell-C-Erweiterung zu berücksichtigen (Hinweis: verwenden Sie die Methode *trunc_probs*).

Setzen Sie die Studiengröße auf $T = 50$, den Lookahead-Horizont auf $H = 5$ und führen Sie eine Simulation der Modell-C-Erweiterung durch. Berichten Sie den Stoppzeitpunkt und den Umsatz.</li>
</ol>
{% endraw %}
