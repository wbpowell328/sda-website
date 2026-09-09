---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 12: Anzeigen-Klick-Optimierung"
permalink: /sdam/de/chapter-12/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 4ae8bcde1a247d20
---


{% raw %}
## Kapitelübersicht

Dieses Kapitel behandelt das Problem der Optimierung der Politik zur Platzierung von Geboten, um die Erträge auf E-Commerce-Plattformen wie Google und Facebook zu maximieren. Diese Plattformen führen ausgeklügelte Auktionen durch, um sicherzustellen, dass sie den vollen Marktwert für die von ihnen angezeigten Anzeigen erhalten. Das Modell des Problems und der Entwurf von Politiken werden durch die Notwendigkeit erschwert, drei Formen der Unsicherheit abzubilden: die Wahrscheinlichkeit, dass wir das Gebot gewinnen, das wir für eine Anzeige abgeben, das Ergebnis, ob wir das Gebot gewinnen oder nicht, und den Umsatz, der durch den Gewinn des Gebots erzielt wird.

Wir untersuchen drei Politiken. Die ersten beiden sind relativ einfach: eine gierige Politik (greedy policy), die das beste Gebot angesichts unserer aktuellen Schätzungen aller unsicheren Größen wählt, und eine randomisierte Version der gierigen Politik, die Exploration fördert. Die dritte ist anspruchsvoller: bekannt als "Knowledge Gradient", maximiert sie den Informationswert der Platzierung eines bestimmten Gebots. Dies erfordert die Berechnung eines Erwartungswerts der Verbesserung durch das, was wir aus einem gegebenen Gebot lernen. Der Knowledge Gradient beinhaltet relativ anspruchsvolle Wahrscheinlichkeitsberechnungen.

## Erzählung

Unternehmen, die auf Internetseiten wie Google werben, müssen bieten, um ihre Anzeigen in einer sichtbaren Position zu platzieren (das heißt, ganz oben in der Liste der gesponserten Anzeigen). Wenn ein Kunde einen Suchbegriff eingibt, identifiziert Google alle Bieter, die denselben (oder ähnlichen) Suchbegriff in ihrer Liste von Ad-Words aufgeführt haben. Google nimmt dann alle Übereinstimmungen, sortiert sie danach, wie viel jeder Teilnehmer geboten hat, und führt eine Auktion durch. Je höher das Gebot, desto wahrscheinlicher wird Ihre Anzeige weiter oben in der Liste der gesponserten Anzeigen platziert, was die Wahrscheinlichkeit eines Klicks erhöht. Abbildung 12.1 ist ein Beispiel dessen, was nach Eingabe der Suchbegriffe "hotels in baltimore md" erzeugt wird.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclicksponsoredlist.png" alt="Sample of displayed ads in response to an ad-word search." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 12.1.</span> Beispiel für angezeigte Anzeigen als Antwort auf eine Ad-Word-Suche.</figcaption>
</figure>

Wenn ein Kunde auf die Anzeige klickt, gibt es einen erwarteten Ertrag, der den durchschnittlichen Betrag widerspiegelt, den ein Kunde ausgibt, wenn er die Website des Unternehmens besucht. Das Problem ist, dass wir die Gebots-Antwortkurve nicht kennen. Abbildung 12.2 zeigt eine Familie möglicher Antwortkurven. Unsere Herausforderung besteht darin, verschiedene Gebote auszuprobieren, um herauszufinden, welche Kurve die richtige ist.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickresponse.png" alt="Possible instances of the probability of an ad getting a click given the bid." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 12.2.</span> Mögliche Ausprägungen der Wahrscheinlichkeit, dass eine Anzeige bei gegebenem Gebot einen Klick erhält.</figcaption>
</figure>

Wir beginnen mit der Annahme, dass wir das Gebot nach jeder Auktion anpassen können, was bedeutet, dass wir nur eine einzige Antwort erlernen (der Kunde hat auf den Link geklickt oder nicht). Es ist möglich, dass der Kunde einen angezeigten Link betrachtet und sich entschieden hat, nicht zu klicken, oder dass unser Gebot so niedrig war, dass wir nicht einmal in der Liste der angezeigten Anzeigen erschienen sind.

Unsere Herausforderung besteht darin, eine Politik für die Festlegung der Gebote zu entwerfen. Das Ziel ist es, den Nettoumsatz zu maximieren, einschließlich dessen, was wir durch den Verkauf unserer Produkte oder Dienstleistungen verdienen, abzüglich dessen, was wir für Anzeigenklicks ausgeben.

## Einordnung des Problems

Die Antworten auf unsere drei Einordnungsfragen sind:

- **Metriken:** Maximierung des erwarteten Nettoumsatzes aus dem Verkauf von Produkten, die auf der Plattform beworben werden, abzüglich des Betrags, der für den Betrieb der Anzeige gezahlt wird.
- **Entscheidungen:** Wie viel für die Anzeige geboten werden soll.
- **Unsicherheiten:** Ob ein Gebot erfolgreich ist, und die Höhe des Umsatzes, der aus einem erfolgreichen Gebot erzielt wird.

## Grundmodell

Wir werden annehmen, dass wir eine Art parametrisiertes Modell verwenden, um die Wahrscheinlichkeit zu erfassen, dass ein Kunde auf eine Anzeige klickt. Diese Wahrscheinlichkeit hängt zumindest davon ab, wie viel wir für eine Anzeige bieten – je höher unser Gebot, desto weiter oben erscheint die Anzeige in der Liste der gesponserten Anzeigen, was die Wahrscheinlichkeit erhöht, dass ein Kunde darauf klickt. Sei $K^n = 1$, wenn der $n$-te Kunde auf die Anzeige klickt. Sei

$$
P^{click}(\theta_k,x) = Prob[K^{n+1}=1\vert \theta=\theta_k,x]
$$

wobei $Prob[K^{n+1}=1\vert \theta=\theta_k,x]$ durch eine logistische Funktion beschrieben wird, gegeben durch

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,x^n, H^n] = \frac{e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}{1+e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}. \label{eq:adclicklogisticregression}
\end{align}
$$

Diese Funktion ist durch $\theta = (\theta^{const}, \theta^{bid})$ parametrisiert. Wir wissen nicht, was $\theta$ ist, aber wir werden annehmen, dass es sich um einen von mehreren gesampelten Werten $\Theta = \lbrace \theta_1, \ldots,\theta_K\rbrace $ handelt.

### Zustandsvariablen

Der Anfangszustand $S^0$ umfasst $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $, die Menge der möglichen Werte, die $\theta$ annehmen kann; sowie $\Rbar^0$, die anfängliche Schätzung des Umsatzes, der erzielt wird, wenn ein Kunde auf einen Link klickt.

Die dynamischen Zustandsvariablen $S^n$ umfassen $p^n_k$, die Wahrscheinlichkeit, dass das wahre $\theta = \theta_k$, mit $p^n = (p^n_k)\_{k=1}^K$; sowie $\Rbar^n$, die Schätzung des Umsatzes, der aus einem Anzeigenklick erzielt wird, nach $n$ Auktionen.

Unsere dynamische Zustandsvariable ist demnach

$$
S^n = (\Rbar^n, p^n).
$$

Man beachte, dass wir nach $n$ Beobachtungen eine Punktschätzung von $\theta$ erstellen können, indem wir

$$
\thetabar^n = \sum_{k=1}^K p^n_k \theta_k,
$$

verwenden, aber dies ist eine Statistik, die wir aus den in $S^n$ enthaltenen Informationen berechnen können, sodass wir $\thetabar^n$ nicht in die Zustandsvariable aufnehmen.

### Entscheidungsvariablen

Unsere einzige Entscheidungsvariable ist das Gebot, das wir als $x^n$ definieren, das Gebot (in ＄ pro Klick) für die $(n+1)$-te Auktion. Wie zuvor sei $X^\pi(S^n)$ unsere generische Politik, die uns das Gebot $x^n$ als Funktion der uns zur Verfügung stehenden Information, repräsentiert durch $S^n$, liefert, was bedeutet, dass wir schreiben würden

$$
x^n = X^\pi(S^n).
$$

Wir nehmen an, dass die Politik alle Beschränkungen durchsetzt, wie etwa sicherzustellen, dass das Gebot nicht negativ oder zu groß ist.

### Exogene Information

In unserem Anfangsmodell beobachten wir nur die Ergebnisse einer einzigen Auktion, die wir modellieren mit:

$$
K^{n+1} = \begin{cases} 1 & \text{if the customer clicks on our ad,} \\ 0 & \text{otherwise.} \end{cases}
$$

und $\Rhat^{n+1}$, dem Umsatz, der aus der $n+1$-ten Auktion erzielt wird. Das bedeutet, dass unsere vollständige exogene Informationsvariable

$$
W^{n+1} = (\Rhat^{n+1},K^{n+1}).
$$

ist.

### Übergangsfunktion

Die Übergangsfunktion für dieses Problem wird deutlich komplizierter erscheinen als andere in diesem Band, was daran liegt, dass wir Überzeugungen (Beliefs) über die Unsicherheit im Parametervektor $\theta$ aktualisieren. Wir müssen betonen, dass alle Übergangsgleichungen relativ leicht programmiert werden können.

Wir werden unsere geschätzte Umsatzhöhe aktualisieren, wenn ein Kunde auf die Anzeige klickt, unter Verwendung von:

$$
\begin{align}
\Rbar^{n+1} = \begin{cases} (1-\alpha^{lrn}) \Rbar^n + \alpha^{lrn} \Rhat^{n+1} & \text{if } K^{n+1} = 1, \\ \Rbar^n & \text{otherwise.} \end{cases} \label{eq:adclicktransition1}
\end{align}
$$

Somit aktualisieren wir unseren geschätzten Umsatz nur, wenn wir einen Klick erhalten. Der Parameter $\alpha^{lrn}$ ist ein Glättungsparameter (manchmal als "Lernrate" bezeichnet) zwischen 0 und 1, den wir im Voraus festlegen.

Als Nächstes befassen wir uns mit der Aktualisierung der Wahrscheinlichkeiten $p^n_k$. Sei $H^n$ die Historie der Zustände, Entscheidungen und exogenen Informationen

$$
H^n = (S^0,x^0,W^1, S^1, x^1, \ldots, W^n, S^n, x^n).
$$

Wir verwenden dies, um zu schreiben

$$
p^n_k = Prob[\theta=\theta_k\vert H^n].
$$

Die Art und Weise, wie die Bedingung auf die Historie $H^n$ gelesen werden soll, ist "$p^n_k$ ist die Wahrscheinlichkeit $\theta = \theta_k$ gegeben das, was wir nach $n$ Beobachtungen wissen." Wir verwenden dann das Bayes-Theorem, um zu schreiben

$$
\begin{align}
p^{n+1}_k &= Prob[\theta=\theta_k\vert W^{n+1}, H^n] \nonumber\\
          &= \frac{Prob[K^{n+1}\vert \theta=\theta_k,H^n]Prob[\theta=\theta_k\vert H^n]}{Prob[K^{n+1}\vert H^n]}. \label{eq:adclicktransition2}
\end{align}
$$

Man beachte, dass die Historie $H^n$ die Entscheidung $x^n$ umfasst, die, gegeben eine Politik zur Festlegung dieser Entscheidungen, direkt eine Funktion des Zustands $S^n$ ist (der wiederum eine Funktion der Historie $H^n$ ist). Wir verwenden nun unsere logistische Kurve in Gleichung $\eqref{eq:adclicklogisticregression}$, um zu schreiben

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,H^n] &= Prob[K^{n+1}=1\vert \theta=\theta_k, x^n]\nonumber\\
   &= \frac{e^{\theta^{const}_k + \theta^{bid}_k x^n}}{1+e^{\theta^{const}_k + \theta^{bid}_k x^n}}. \label{eq:adclicktransition2a}
\end{align}
$$

Wir stellen dann fest, dass

$$
\begin{align}
Prob[\theta=\theta_k\vert H^n]  = p^n_k. \label{eq:adclicktransition2b}
\end{align}
$$

Schließlich stellen wir fest, dass der Nenner berechnet werden kann mittels

$$
\begin{align}
Prob[K^{n+1}\vert H^n] = \sum_{k=1}^K Prob[K^{n+1}\vert \theta=\theta_k,H^n] p^n_k. \label{eq:adclicktransition2c}
\end{align}
$$

Unsere Verwendung einer gesampelten Repräsentation der möglichen Ausprägungen von $\theta$ kommt uns hier zugute. Selbst wenn $\theta$ nur zwei Dimensionen hat (wie es hier der Fall ist, aber nur vorläufig), wäre die Durchführung eines zweidimensionalen Integrals über eine multivariate Verteilung für $\theta$ problematisch.

Die Gleichungen $\eqref{eq:adclicktransition2a}$–$\eqref{eq:adclicktransition2c}$ erlauben es uns, unsere Bayes'sche Aktualisierungsgleichung für die Wahrscheinlichkeiten in $\eqref{eq:adclicktransition2}$ zu berechnen. Die Gleichungen $\eqref{eq:adclicktransition1}$–$\eqref{eq:adclicktransition2}$ bilden unsere Übergangsfunktion

$$
S^{n+1} = S^M(S^n,x^n,W^{n+1}).
$$

### Zielfunktion

Wir beginnen damit, die Ein-Perioden-Gewinnfunktion zu schreiben als

$$
C(S^n,x^n,W^{n+1}) = (\Rhat^{n+1} - x^n) K^{n+1},
$$

was bedeutet, dass wir nichts verdienen, wenn der Kunde nicht auf die Anzeige klickt ($K^{n+1} = 0$). Klickt der Kunde auf die Anzeige ($K^{n+1} = 1$), erhalten wir den durch $\Rhat^{n+1}$ gegebenen Umsatz, müssen aber auch das bezahlen, was wir für den Anzeigenklick geboten haben, gegeben durch unser Gebot $x^n$.

Wir werden letztlich den erwarteten Beitrag berechnen, den wir schreiben als

$$
\E \{C(S^n,x^n,W^{n+1})\vert S^n\} = \E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Es gibt drei Zufallsvariablen, die in dem Erwartungswert verborgen sind:

- $\theta$, mit Verteilung $p^n = (p^n_1, \ldots, p^n_K)$ (enthalten in $S^n$).
- $K^{n+1}$, wobei $P^{click}(\theta,x) = Prob[K^{n+1}=1\vert \theta,x]$.
- $\Rhat^{n+1}$, das wir aus einer unbekannten Verteilung beobachten, falls $K^{n+1}=1$, und wobei $\Rhat^{n+1}=0$, falls $K^{n+1}=0$ (wir erhalten keinen Umsatz, wenn der Kunde nicht auf die Anzeige klickt).

Wir können den Erwartungswert dann in drei verschachtelte Erwartungswerte aufteilen:

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \E_{\Rhat} \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

Wir beginnen damit, den Erwartungswert über $\Rhat$ zu bilden, wobei wir einfach $\E \lbrace \Rhat^{n+1}\vert S^n\rbrace  = \Rbar^n$ verwenden (man beachte, dass $\Rbar^n$ in der Zustandsvariable $S^n$ enthalten ist), was es uns erlaubt zu schreiben

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Als Nächstes werden wir den Erwartungswert über $K^{n+1}$ für ein gegebenes $\theta$ bilden, indem wir

$$
\E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\} =  (\Rbar^n - x^n) P^{click}(\theta,x).
$$

verwenden, wobei wir die Tatsache genutzt haben, dass $(\Rbar^n - x^n) K^{n+1}=0$, falls $K^{n+1}=0$.

Schließlich bilden wir den Erwartungswert über $\theta$ mittels

$$
\E_{\theta}  \{(\Rbar^n - x^n) P^{click}(\theta,x^n) \vert S^n\} = \sum_{k=1}^K (\Rbar^n - x^n) P^{click}(\theta=\theta_k,x^n) p^n_k.
$$

Wir werden $\Cbar(S^n,x)$ als den erwarteten Beitrag definieren, das heißt

$$
\Cbar(S^n,x)   =  \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

Unsere Zielfunktion kann nun geschrieben werden als

$$
\max_\pi \E_{S^0} \E_{W^1, \ldots, W^n\vert S^0} \left\{\sum_{n=0}^N C(S^n,X^\pi(S^n),W^{n+1})\vert S_0\right\}.
$$

Man beachte, dass die Konditionierung auf $S_0$ die Art und Weise ist, wie wir unseren Prior $p^0\_k = Prob[\theta=\theta_k]$ an das Modell übermitteln. Wie zuvor würden wir den Erwartungswert approximieren, indem wir über simulierte Stichproben des wahren Werts von $\theta$ sowie der beobachteten Klicks $K^n$ und Umsätze $R^n$ mitteln.

## Modellierung der Unsicherheit

Wir haben drei Formen der Unsicherheit: den Anzeigenklick $K^{n+1}$, den Umsatz, den wir erhalten, $\Rhat^{n+1}$, falls $K^{n+1}=1$, und dann den wahren Wert von $\theta$. Wir werden annehmen, dass wir $\Rhat^{n+1}$ einfach aus einem realen Datenstrom beobachten, was bedeutet, dass wir für diese Zufallsvariablen kein formales Wahrscheinlichkeitsmodell benötigen. Wir nehmen an, dass $K^{n+1}$ durch unsere logistische Funktion beschrieben wird

$$
\begin{align}
P^{click}(\theta,x) &= P[K^{n+1} = 1\vert \theta,x=x^n] \nonumber \\
                   &= \frac{e^{\theta^{const} + \theta^{bid} x}}{1+e^{\theta^{const} + \theta^{bid} x}}, \label{eq:adclicklogistic}
\end{align}
$$

aber es ist wichtig zu erkennen, dass dies nur eine angepasste Kurve ist. Die Werte von $K^{n+1}$ werden aus Daten beobachtet, was bedeutet, dass wir keine Garantie dafür haben, dass die Verteilung genau mit unserer logistischen Regression übereinstimmt.

Schließlich nehmen wir an, dass $\theta \in \Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $, was ebenfalls eine Näherung ist. Es gibt Möglichkeiten, die Anforderung einer gesampelten Menge zu lockern, aber die Logik wird dadurch etwas komplizierter, ohne viel didaktischen Mehrwert zu bieten.

## Entwurf von Politiken

Wir werden drei Politiken zum Lernen untersuchen:

- Reine Exploitation – Hier platzieren wir immer das Gebot, das angesichts unserer aktuellen Schätzungen am besten erscheint.
- Eine Anregungspolitik (Excitation Policy) – Wir führen Exploration in unsere Exploitationspolitik ein, indem wir einen zufälligen Störterm hinzufügen, der das System zwingt, in Regionen nahe den Bereichen zu explorieren, die wir für am besten halten (dies ist in der Technik beliebt, wo Zustände und Entscheidungen kontinuierlich sind).
- Eine Informationswert-Politik – Wir werden den Informationswert der Platzierung eines Gebots und des Erlernens des Ergebnisses maximieren.

### Reine Exploitation

Der Ausgangspunkt jeder Online-Politik sollte reine Exploitation sein, was bedeutet, das Beste zu tun, was wir können. Um dies zu berechnen, beginnen wir mit

$$
\E \{\Rhat^{n+1} K^{n+1}\} = \E \{\Rhat^{n+1}\vert K^{n+1} = 1\} Prob[K^{n+1}=1\vert \theta=\theta_k] = \Rbar^n P^{click}(\theta,x).
$$

Um das beste Gebot zu finden, ermitteln wir (nach einiger Algebra) die Ableitung nach dem Gebot $x$

$$
\frac{d \Cbar(x)}{d x} = (\Rbar^n - x)\frac{d P^{click}(\theta,x)}{d x} - P^{click}(\theta,x)
$$

wobei

$$
\frac{d P^{click}(\theta,x)}{d x} = \frac{\theta_1 e^{-\theta_0 - \theta_1 x}}{(1+e^{-\theta_0 - \theta_1 x})^2}.
$$

Nun wollen wir das Gebot $x^\ast $ finden, bei dem

$$
\left.\frac{d \Cbar(x)}{d x}\right\vert _{x=x^\ast } = 0.
$$

Abbildung 12.3 zeigt $\frac{d \Cbar(x\vert \theta)}{d x}$ gegenüber dem Gebot $x$ und veranschaulicht das Verhalten, dass es positiv beginnt und in negative Werte übergeht. Der Punkt, an dem es gleich Null ist, wäre das optimale Gebot, ein Punkt, der numerisch recht einfach gefunden werden kann. Sei $X^{explt}(S^n)$ das Gebot $x^\ast $, das $d \Cbar(x)/dx = 0$ erfüllt.

Das bedeutet, dass wir einen numerischen Algorithmus ausführen müssen, um die Politik zu berechnen. Dies ist eine gierige Politik, die in die CFA-Klasse fällt, jedoch ohne abstimmbare Parameter.

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickprofitderivative.png" alt="Derivative of ad-click profit function versus the bid." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 12.3.</span> Ableitung der Anzeigenklick-Gewinnfunktion gegenüber dem Gebot.</figcaption>
</figure>

### Eine Anregungspolitik

Eine potenzielle Einschränkung unserer reinen Exploitationspolitik besteht darin, dass sie den Wert des Ausprobierens einer breiteren Palette von Geboten ignoriert, um den Prozess des Erlernens der korrekten Werte von $\theta$ zu unterstützen. Eine beliebte Strategie besteht darin, einen Störterm hinzuzufügen, der in der Technik als "Excitation" bekannt ist, was uns die Politik

$$
X^{excite}(S^n\vert \rho) = X^{explt}(S^n) + \varepsilon(\rho)
$$

ergibt, wobei $\varepsilon(\rho) \sim N(0,\rho^2)$. In dieser Politik ist $\rho$ unser abstimmbarer Parameter, der das Ausmaß der Exploration in der Politik steuert. Ist er zu klein, gibt es möglicherweise nicht genug Exploration. Ist er zu groß, wählen wir Gebote, die weit vom Optimum entfernt sind, möglicherweise ohne jeglichen Nutzen aus dem Lernen.

### Eine Informationswert-Politik

Die reinen Exploitations- und Excitations-Politiken, die wir gerade eingeführt haben, sind beide relativ einfach. Nun werden wir eine Politik betrachten, die den Wert der Information in der Zukunft maximiert. Das erscheint als eine vernünftige Idee, erfordert aber, dass wir darüber nachdenken, wie Information jetzt beeinflusst, welche Entscheidung wir in der Zukunft *möglicherweise* treffen werden, und dies wird etwas schwieriger sein.

Unsere Exploitations-Politik nimmt an, dass die geschätzten Parameter $\theta^n$ nach $n$ Experimenten der korrekte Wert sind, und wählt ein Gebot basierend auf dieser Schätzung. Stellen wir uns nun vor, dass wir $x^n=x$ bieten und $K^{n+1}$ und $\Rhat^{n+1}$ beobachten und diese Information nutzen, um eine aktualisierte Schätzung von $\theta^{n+1}$ sowie $\Rbar^{n+1}$ zu erhalten. Wir können diese aktualisierten Schätzungen dann nutzen, um eine bessere Entscheidung zu treffen. Wir wollen das Gebot $x$ wählen, das uns die größte Verbesserung im Wert der Information aus einer Entscheidung liefert, wobei wir erkennen, dass wir das Ergebnis von $W^{n+1} = (\Rhat^{n+1},K^{n+1})$ nicht kennen, bis wir das Gebot tatsächlich abgeben.

Sei $\theta^{n+1}(x^n,W^{n+1})$ die aktualisierte Schätzung von $\theta$ unter der Annahme, dass wir $x^n=x$ bieten und $W^{n+1} = (\Rhat^{n+1},K^{n+1})$ beobachten. Dies ist eine Zufallsvariable, weil wir darüber nachdenken, ein Gebot $x^n=x$ für die $n+1$-te Auktion abzugeben, dieses aber noch nicht platziert haben, was bedeutet, dass wir $W^{n+1}$ noch nicht beobachtet haben.

Um unsere Analyse zu vereinfachen, werden wir annehmen, dass die Zufallsvariable $K^{n+1} = 1$ mit Wahrscheinlichkeit $P^{click}(\theta,x)$ und $K^{n+1} = 0$ mit Wahrscheinlichkeit $1-P^{click}(\theta,x)$ ist. Wir werden dann annehmen, dass sich unsere Schätzung des Umsatzes, den wir von einem Ad-Click erhalten, stabilisiert hat, was bedeutet, dass $\Rbar^{n+1} \approx \Rbar^n$.

Wir können dies als ein approximatives Lookahead-Modell betrachten, bei dem sich $\Rbar^n$ nicht ändert. Wir würden dann unsere exogene Information in unserem Lookahead-Modell schreiben als

$$
\Wtilde^{n,n+1}=\Ktilde^{n,n+1},
$$

wobei der Doppel-Hochindex $(n,n+1)$ bedeutet, dass dies die Information in einem zum Zeitpunkt $n$ erstellten Lookahead-Modell ist, das betrachtet, was zum Zeitpunkt $n+1$ passieren könnte. Die Zufallsvariable $\Ktilde^{n,n+1}$ ist der Ad-Click, den wir in unserem Lookahead-Modell simulieren, dass er *möglicherweise* passiert, anstatt die tatsächliche Beobachtung, ob jemand auf die Anzeige geklickt hat. Denken Sie einfach daran, dass wir eine Tilde für jede Variable in unserem Lookahead-Modell verwenden, und diese Variablen werden indiziert durch $n$ (die Zeit, zu der wir das Lookahead-Modell initiieren) und $n+1$ (da wir eine Zeitperiode vorwärts im Lookahead-Modell schauen).

Als Nächstes verwenden wir unsere Aktualisierungsgleichung $\eqref{eq:adclicktransition2}$ für die Wahrscheinlichkeiten $p^n_k = Prob[\theta=\theta_k\vert H^n]$. Wir können diese aktualisierten Wahrscheinlichkeiten als $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$ schreiben, um die Abhängigkeit der Aktualisierung von $\Ktilde^{n,n+1}$ zu erfassen (Gleichung $\eqref{eq:adclicktransition2}$ ist für $\Ktilde^{n,n+1}=1$ geschrieben). Da $\Ktilde^{n,n+1}$ zwei Ergebnisse annehmen kann (0 oder 1), werden wir zwei mögliche Werte für $\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$ haben.

Stellen wir uns nun vor, wir führen unsere oben beschriebene reine Exploitations-Politik $X^{explt}(S^n\vert \theta^n)$ durch, tun dies jedoch in unserem approximativen Lookahead-Modell (hier ignorieren wir Änderungen in $\Rbar^n$). Sei $\Stilde^{n,n+1}$ unser Zustand im Lookahead-Modell, gegeben durch

$$
\Stilde^{n,n+1}(\Ktilde^{n,n+1}) = (\Rbar^n, \ptilde^{n,n+1}(\Ktilde^{n,n+1})).
$$

Denken Sie daran – da $\Ktilde^{n,n+1}$ eine Zufallsvariable ist (wir befinden uns noch zum Zeitpunkt $n$), ist $\Stilde^{n,n+1}(\Ktilde^{n,n+1})$ ebenfalls eine Zufallsvariable, weshalb wir ihre explizite Abhängigkeit vom Ergebnis $\Ktilde^{n,n+1}$ schreiben.

Man kann sich dieses Lookahead-Modell so vorstellen, als spiele man ein Spiel (wie etwa Schach), bei dem man über einen Zug nachdenkt (für uns wäre das das Gebot $x^n$) und dann, bevor man den Zug ausführt, darüber nachdenkt, was in der Zukunft passieren könnte. In diesem Problem hat unsere Zukunft nur zwei Ergebnisse (ob ein Kunde auf die Anzeige klickt oder nicht), was zwei mögliche Werte von $\Stilde^{n,n+1}$ bedeutet, die zwei Sätze aktualisierter Wahrscheinlichkeiten $\ptilde^{n,n+1}(K^{n+1})$ erzeugen.

Schließlich bedeutet dies, dass es zwei Werte des optimalen myopischen Gebots (unter Verwendung unserer reinen Exploitations-Politik) $X^{explt}(\Stilde^{n,n+1})$ geben wird. Der erwartete Beitrag, den wir in der Zukunft leisten würden, ist dann gegeben durch $\Ctilde(\Stilde^{n,n+1},\xtilde^{n,n+1})$, wobei $\xtilde^{n,n+1}$ (dies ist die Entscheidung, die wir in der Zukunft zu treffen erwägen) gegeben ist durch

$$
\xtilde^{n,n+1} = X^{explt}(\Stilde^{n,n+1}).
$$

Das bedeutet, dass es zwei mögliche optimale Entscheidungen gibt, was zwei unterschiedliche Werte des erwarteten Beitrags $\Ctilde(\Stilde^{n,n+1},X^{explt}(\Stilde^{n,n+1}))$ bedeutet. Nennen wir diese zur Kompaktheit $\Ctilde^{n,n+1}(1)$ (wenn $\Ktilde^{n,n+1} = 1$) und $\Ctilde^{n,n+1}(0)$ (wenn $\Ktilde^{n,n+1} = 0$). Betrachten Sie diese als die erwarteten Beiträge, die *möglicherweise* in der Zukunft eintreten werden, ausgehend von dem, was wir jetzt wissen. Schließlich können wir den Erwartungswert über $\Ktilde^{n,n+1}$ bilden, um den erwarteten Beitrag des jetzigen Platzierens eines Gebots $x^n=x$ zu erhalten, den wir berechnen können mit

$$
\Cbar^n(x) = \sum_{k=1}^K \big(P^{click}(\theta=\theta_k,x) \Ctilde^{n,n+1}(1) + (1-P^{click}(\theta=\theta_k,x)) \Ctilde^{n,n+1}(0)\big) p^n_k.
$$

Unsere Politik besteht dann darin, das Gebot $x$ zu wählen, das $\Cbar^n(x)$ maximiert. Angenommen, wir diskretisieren unsere Gebote in eine Menge $\Xcal = \lbrace x_1, \ldots, x_M\rbrace $. Unsere Politik des Werts der Information würde geschrieben werden als

$$
X^{VoI}(S^n) = \argmax_{x\in\Xcal} \Cbar^n(x).
$$

Wir stellen fest, dass dies eine Politik der Klasse der direkten Lookahead-Approximation (DLA) ist.

Politiken des Werts der Information sind sehr leistungsfähig. Sie sind schwerer zu berechnen, haben aber keine abstimmbaren Parameter. Stellen Sie sich zum Beispiel vor, diese Berechnung durchzuführen, wenn es mehr als zwei Ergebnisse gibt. Wenn wir zum Beispiel unsere Vereinfachung, $\Rbar^n$ konstant zu halten, nicht vorgenommen hätten, müssten wir erkennen, dass sich diese Zustandsvariable ebenfalls ändert.

Wir bemerken nur am Rande, dass wir viele Vergleiche verschiedener Lernpolitiken durchgeführt haben, und der Ein-Schritt-Lookahead-Wert der Information funktioniert oft recht gut. Wir haben diese Einstellung verwendet, weil sie die Herleitungen wesentlich vereinfachte.

Ein Wort der Vorsicht ist angebracht. Lernprobleme, bei denen das Ergebnis 0 oder 1 ist, sind Probleme, bei denen ein einzelnes Experiment sehr wenig Information liefert. Stattdessen ist es besser anzunehmen, dass wir unsere Entscheidung treffen (das heißt, das Gebot festlegen) und diese dann für, sagen wir, $M$ Auktionen beobachten. Das bedeutet, dass $\Ktilde^{n,n+1}$ nun eine Zahl zwischen 0 und $M$ sein könnte. Die Zahl $M$ wird zu einem abstimmbaren Parameter, und die Berechnungen werden dadurch etwas komplexer (wir müssen über $M+1$ Realisierungen summieren, anstatt nur über zwei), aber dieser Ansatz kann recht gut funktionieren.

## Erweiterung: Kunden mit einfachen Attributen

Angenommen, wir kennen den Standort eines Kunden bis auf eine Region oder die nächstgelegene Großstadt, die wir mit $L$ bezeichnen. Wenn wir denken, dass sich das Verhalten jeder Region unterscheidet, könnten wir $\theta$ durch $\theta_\ell$ indizieren, wenn der Kunde aus dem Standort $L=\ell$ stammt. Das bedeutet, wenn es 1.000 Standorte gibt, müssen wir 1.000 Modelle schätzen, was 1.000 Werte von $\theta = (\theta^{const},\theta^{bid})$ bedeutet.

Ein alternativer Ansatz wäre, ein Modell der Form

$$
Prob^n[K^{n+1}=1\vert \theta] = \frac{e^{U(x,L\vert \theta)}}{1+e^{U(x,L\vert \theta)}}.
$$

zu spezifizieren, wobei wir nun als Nutzenfunktion verwenden werden

$$
U(x,L\vert \theta) = \theta^{const} + \theta^{bid}x + \sum_{\ell=1}^L \theta^{loc}_\ell I_{\ell=L}.
$$

Dies ist ein kompakteres Modell, weil wir nun annehmen, dass der konstante Term $\theta^{const}$ und der Gebotskoeffizient $\theta^{bid}$ nicht vom Standort abhängen. Stattdessen fügen wir nur eine Verschiebung $\theta^{loc}\_\ell$ hinzu. Wir haben also immer noch 1.000 Parameter zu schätzen (die Standortkoeffizienten), aber vorher hatten wir 2.000 Parameter zu schätzen – $\theta^{const}\_\ell$ und $\theta^{bid}\_\ell$ für jeden Standort $\ell \in \lbrace 1, \ldots, L\rbrace $.

## Was haben wir gelernt?

- Dies ist ein weiteres reines Lernproblem (unser Diabetes-Problem in [Kapitel 4](/sdam/de/chapter-4/) war ein reines Lernproblem), aber diesmal verwenden wir ein nichtlineares Belief-Modell mit einem gesampelten Modell für den unbekannten Parameter $\theta$, der die Reaktion auf den Preis bestimmt.
- Die Übergangsfunktion beinhaltet die Bayes'sche Aktualisierung der Beliefs über die Wahrscheinlichkeiten $p^n_k$, dass der unbekannte Parameter $\theta$ gleich einem bestimmten Wert $\theta_k$ ist.
- Es gibt drei Formen der Unsicherheit: ob jemand angesichts des Gebotspreises auf eine Anzeige klicken wird; der Umsatz, der durch das Klicken auf die Anzeige erzielt wird (zum Beispiel, ob der Kunde das Produkt gekauft hat), und die Unsicherheit über die Marktreaktion, die durch den unbekannten Parameter $\theta$ erfasst wird.
- Wir veranschaulichen eine reine Exploitations-Politik, eine Excitations-Politik (die einfach den empfohlenen Preis aus der Exploitations-Politik randomisiert) und eine Knowledge-Gradient-Politik, die den Wert der Information maximiert.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Welches probabilistische Modell wird für die Zufallsvariable $K^n$ angenommen, die angibt, ob ein Kunde auf die Anzeige geklickt hat oder nicht?</li>
<li>Welches probabilistische Modell haben wir für den unbekannten (und daher unsicheren) Parametervektor $\theta$ angenommen?</li>
<li>Welche Wahrscheinlichkeitsverteilung haben wir für den Umsatz $\Rhat^{n+1}$ angenommen, den wir erhalten, wenn der Kunde auf eine Anzeige klickt?</li>
<li>Geben Sie die Gleichungsnummern der Gleichungen an, die die Übergangsfunktion bilden.</li>
<li>Welche probabilistische Information befindet sich im Anfangszustand $S^0$?</li>
<li>Was wird durch das Hinzufügen des Rauschterms $\varepsilon(\rho)$ erreicht, um die Excitations-Politik zu erzeugen? Welche spezifischen Parameter hilft uns dies zu identifizieren?</li>
<li>Beschreiben Sie in Worten die Logik hinter der Politik des Werts der Information. Was ist der Wert, wenn das Wissen darüber, ob ein Kunde auf die Anzeige klickt oder nicht, nicht ändert, was wir bieten werden?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li><p>Empfehlungssystem Teil I – Belief-Modell – Sie werden helfen, ein Empfehlungssystem zu entwerfen, das Produkte zur Werbung empfiehlt, wenn ein Kunde durch eine Website scrollt. Da sich der Kunde anmelden muss, können wir den $n$-ten Kunden durch einen Vektor von Attributen $a=a^n$ identifizieren, der Folgendes enthält:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$a_1$</td><td>Geschlecht (2 Typen).</td></tr>
<tr><td>$a_2$</td><td>Altersbereich $(0$–$10, 11$–$20, \ldots, 70$–$100)$ (8 Typen).</td></tr>
<tr><td>$a_3$</td><td>Gerätetyp (Smartphone, Laptop, Tablet) (3 Typen).</td></tr>
<tr><td>$a_4$</td><td>Region (200).</td></tr>
<tr><td>$a_5$</td><td>Eindeutige ID (E-Mail-Adresse) (100 Millionen).</td></tr>
</tbody>
</table>
</div>

<p>Stellen Sie sich vor, wir empfehlen Textartikel. Angenommen, der Artikel, den wir für den $n$-ten Kunden empfehlen, hat Attribute $b=b^n$, die Folgendes umfassen:</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$b_1$</td><td>Nachrichten, Sport, Kunst, Wirtschaft, Kochen, Immobilien (6 Typen).</td></tr>
<tr><td>$b_2$</td><td>Unterkategorie: falls Nachrichten, dann international, national (nach Land), regional (Region innerhalb eines Landes); falls Sport, dann nach Sportart und dann nach Team (oder Athlet); und so weiter (insgesamt 500).</td></tr>
<tr><td>$b_3$</td><td>Quelle (Website, Zeitung, ...) (5 Quellen).</td></tr>
<tr><td>$b_4$</td><td>Autor (2.000).</td></tr>
<tr><td>$b_5$</td><td>Eindeutige ID für Artikel (6 Millionen).</td></tr>
</tbody>
</table>
</div>

<p>Wir möchten Folgendes schätzen:</p>

<p style="margin-left: 2rem;">$P(b^n\vert a^n)$ = Wahrscheinlichkeit, dass der $n$-te Kunde mit Attribut $a^n$ auf den Link eines Artikels mit Attribut $b^n$ klickt.</p>

<p>Wenn Kunde $a^n$ eintrifft, werden wir annehmen, dass wir einen Nachrichtenartikel aus einer Menge $\Bcal^n$ auswählen müssen, welche die Menge der Artikel ist, die verfügbar sind, wenn der $n$-te Kunde eintrifft (diese Menge ändert sich mit der Zeit). Wir möchten einen Artikel mit Attribut $b\in\Bcal^n$ wählen, der die Wahrscheinlichkeit maximiert, dass unser Kunde auf diesen Nachrichtenartikel klickt. Unsere Politik muss einen bestimmten Artikel mit Attribut $b^n$ auswählen.</p>

<p>Idealerweise wollen wir $P(b^n_5\vert a^n_5)$, was die Wahrscheinlichkeit ist, dass Nutzer $a^n_5$ Artikel $b^n_5$ auswählen würde, aber es gibt zu viele Nutzer und zu viele Artikel, um vernünftige Schätzungen dieser Wahrscheinlichkeit zu erhalten. Wenn wir nur die Elemente $a_1, a_2, a_3$ und $a_4$ berücksichtigen, gäbe es 9.600 Kombinationen mit durchschnittlich etwa 10.000 Personen für jedes dieser ersten vier Elemente. Im Folgenden werden wir annehmen, dass wir nur $a_1$ und $a_2$ verwenden, was 16 Typen von Personen bedeutet.</p>

<p>Wir werden eine Menge von Merkmalen $\Fcal$ erstellen, die aus den Elementen von $a$ und $b$ konstruiert werden, die wir betrachten möchten. Wir werden nur die Elemente $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $ verwenden, aus denen wir eine Menge von Merkmalsvariablen $\phi_f(a,b),~f\in\Fcal$ konstruieren werden. Da diese fünf Elemente alle kategorial sind, sind die elementarsten Merkmale Indikatorvariablen. Zum Beispiel haben wir für das Geschlechtsattribut $a_1$ zwei Geschlechter, aus denen wir zwei Merkmale erstellen:</p>

$$
\phi_{male}(a) = \begin{cases} 1 & \text{if } a_1 = male, \\ 0 & \text{otherwise.} \end{cases} \qquad \phi_{female}(a) = \begin{cases} 1 & \text{if } a_1 = female, \\ 0 & \text{otherwise.} \end{cases}
$$

<p>Wenn wir uns auf diese elementaren Merkmale beschränken, hätten wir ein Merkmal für jeden möglichen Wert jedes Elements der Attribute $a_1,a_2,b_1,b_2,b_3$.</p>

<p>Unser Prozess beginnt, wenn sich der erste Kunde mit Attributvektor $a^1$ anmeldet, an welchem Punkt wir uns für die Attribute eines Artikels $b^1$ entscheiden müssen, der diesem Nutzer angezeigt werden soll, und dann $Y^1$ beobachten, wobei $Y^1 = 1$, falls der Kunde auf den Artikel klickt, oder 0 andernfalls. Diese Information wird verwendet, um einen aktualisierten Zustand $S^1$ zu erstellen, wonach wir Kunde $a^2$ beobachten.</p>

<p>Wenn $a^n$ die Attribute des $n$-ten Kunden sind, dann besteht unsere Entscheidung darin, $b^n$ mithilfe des Wissens auszuwählen, das wir mit $S^n$ bezeichnen. Unser Ziel ist es, dieses Problem zu modellieren und eine Politik $B^\pi(S^n)$ zu entwerfen, die $b^n$ bestimmt.</p>

<p>Unsere erste Herausforderung besteht darin, ein Belief-Modell zu entwickeln:</p>
  <ol type="a">
    <li>Wenn wir ein Lookup-Table-Belief-Modell für $P(b\vert a)$ unter Verwendung der Attribute $\lbrace a_1,a_2, b_1,b_2,b_3\rbrace $ verwenden, wie viele Parameter versuchen wir zu schätzen?</li>
    <li>Betrachten Sie stattdessen die Verwendung einer logistischen Regression. Definieren Sie zunächst eine Nutzenfunktion

    $$
    U(a,b\vert \theta) = \sum_{f\in\Fcal} \theta_f \phi_f(b\vert a),
    $$

    wobei $\Fcal$ die Menge der elementaren Merkmale ist, die wir aus den Elementen $\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $ konstruieren können. Erstellen Sie nun ein logistisches Regressionsmodell für die Wahrscheinlichkeit, auf einen Artikel zu klicken, unter Verwendung von

    $$
    P(Y=1\vert a,b,\theta) = \frac{e^{U(a,b\vert \theta)}}{1+e^{U(a,b\vert \theta)}}.
    $$

    Wie groß ist die Dimensionalität des Vektors $\theta$, wenn wir lediglich elementare Indikatorvariablen verwenden?</li>
    <li>Da die Anzahl der Parameter im parametrischen Modell aus Teil (b) viel geringer ist als die Anzahl der Parameter im Lookup-Table-Modell aus Teil (a), warum sollte jemand ein Lookup-Table-Belief-Modell anstelle eines parametrischen Modells wie der logistischen Regression verwenden? Diskutieren Sie die Vor- und Nachteile jedes Belief-Modelltyps.</li>
    <li>Wir müssen nun $\theta$ schätzen. Angenommen, wir erzeugen eine Stichprobe möglicher Werte des Vektors $\theta$, die wir als $\lbrace \theta_1, \ldots, \theta_k, \ldots, \theta_K\rbrace $ darstellen, wobei jedes $\theta_k$ ein Vektor mit dem Element $\theta_{kf},~f\in\Fcal$ ist. Beginnen Sie mit der Vorwahrscheinlichkeit $p^0_k = 1/K$. Nehmen Sie als Nächstes an, dass wir die Attribute des ersten Kunden $a^1$ beobachten und dann die Entscheidung treffen, einen Artikel mit Attribut $b^1$ anzuzeigen (dies ist unsere Entscheidungsvariable). Angenommen, Sie kennen $p^n_k$, schreiben Sie das Bayes-Theorem auf, um $p^{n+1}_k$ zu berechnen, nachdem ein Kunde mit Attribut $a^{n+1}$ beobachtet wurde und anschließend ein Artikel mit Attribut $b^{n+1}$ ausgewählt wurde, nach dem Sie das Ergebnis $Y^{n+1} = 1$ beobachten.</li>
  </ol>
</li>
<li>Empfehlungssystem Teil II - Systemmodell - Nun werden wir alle fünf Elemente des Problems modellieren.
  <ol type="a">
    <li>Geben Sie die Elemente des Vor-Entscheidungszustands $S^n$ und des Nach-Entscheidungszustands $S^{b,n}$ an.</li>
    <li>Es gibt zwei Formen exogener Information in diesem Prozess. Welche sind das?</li>
    <li>Schreiben Sie die Sequenz von Zuständen (vor und nach der Entscheidung), Entscheidungen und den verschiedenen Formen exogener Information auf, beginnend mit dem, was wir zum Zeitpunkt 0 wissen, bis (aber ausschließlich) zur Ankunft des dritten Kunden. Schreiben Sie sie in der Reihenfolge auf, in der sie auftreten, mit korrekter Indizierung (z. B. $n$ versus $n+1$).</li>
    <li>Schreiben Sie die Gleichungen auf, die die Übergangsfunktion darstellen.</li>
    <li>Schreiben Sie die Zielfunktion auf, um die beste Politik $B^\pi(S^n)$ zu finden (ohne den Typ der Politik zu spezifizieren).</li>
  </ol>
</li>
<li>Empfehlungssystem Teil III - Politikentwurf - Schließlich werden wir versuchen, Politiken zu entwerfen. Angenommen, wir haben $K=20$ mögliche Werte von $\theta$.
  <ol type="a">
    <li>Nehmen Sie zunächst an, dass wir wissen, dass $\theta = \theta_k$. Schreiben Sie eine reine Exploitations-Politik auf, bei der wir das Attribut $b\in\Bcal^n$ wählen, das die Wahrscheinlichkeit maximiert, ausgewählt zu werden, gegeben dass $\theta = \theta_k$.</li>
    <li>Nehmen Sie als Nächstes an, dass wir nicht wissen, dass $\theta=\theta_k$. Stattdessen gilt $\theta=\theta_k$ mit Wahrscheinlichkeit $p^n_k$. Schreiben Sie Ihre Politik aus Teil (a) um, wobei Sie $\theta$ als Zufallsvariable behandeln müssen. Sie müssen irgendwo einen Erwartungswert einfügen.</li>
    <li>Die Politik in (b) könnte als zu rechenaufwändig angesehen werden. Sie können sie vereinfachen, indem Sie die Zufallsvariable $\theta$ durch ihren Erwartungswert ersetzen

    $$
    \thetabar^n = \E^n \theta_k = \sum_{k=1}^K \theta_k p^n_k.
    $$

    Schreiben Sie Ihre Politik aus Teil (b) unter Verwendung dieser Punktschätzung um. Nehmen Sie an, dass Sie sich nur mit Artikeln befassen, bei denen die Wahrscheinlichkeit, auf einen Artikel zu klicken, größer als 0,5 ist. Wie denken Sie, würde die mit der Punktschätzung in (c) berechnete Wahrscheinlichkeit, auf einen Artikel zu klicken, im Vergleich zu der mit dem Erwartungswert in (b) bereitgestellten Schätzung ausfallen?</li>
    <li>Die Intervallschätzungs-Politik verwendet beispielsweise das 95. Perzentil der Schätzung des Werts einer Wahl. Sei $\rho$ das gewünschte Perzentil, und nehmen Sie an, dass es auf 0,05 gerundet werden muss (da wir $K=20$ mögliche Werte für $\theta$ gewählt haben). Zeigen Sie, wie eine Politik entworfen werden kann, die den Attributvektor $b$ wählt, der die $\rho$-te Wahrscheinlichkeit maximiert (anstelle der Punktschätzung), und geben Sie die Zielfunktion an, um den besten Wert von $\rho$ zu finden, um die Gesamtzahl der Anzeigenklicks zu maximieren.</li>
  </ol>
</li>
</ol>
{% endraw %}
