---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 11: Lieferkettenmanagement II: Das Beer Game"
permalink: /sdam/de/chapter-11/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: f0d9a39d57818789
---


{% raw %}
## Kapitelübersicht

Das Bierspiel ist ein Klassiker in der Lehre des Lieferkettenmanagements. Wir betrachten es als ein allgemeines Multiagentenproblem, bei dem jeder Zulieferer im Bierspiel als separater Agent modelliert wird. Diese Darstellung erweitert das Fundament, das wir in [Kapitel 10](/sdam/de/chapter-10/) gelegt haben, mit der zusätzlichen Komplikation, dass Agenten sowohl Informationen (Bestellungen für Bier) als auch physische Ressourcen (Bier) versenden.

Das Kapitel hält die Modellierung von Unsicherheit recht einfach. Stattdessen untersuchen wir eine Reihe einfacher parametrischer Politiken, nutzen dies aber als Gelegenheit, um Beliefs einzuführen, die ein Agent über Informationen hält, die ein anderer Agent besitzen könnte (in diesem Fall über Rückstände). Anschließend liefern wir eine Illustration der bekannten „Anchor-and-Adjustment"-Politik, die zuerst von zwei bekannten Entscheidungswissenschaftlern, Daniel Kahneman und Amos Tversky, eingeführt und an das Bierspiel-Szenario angepasst wurde. Wir schließen mit einer Skizze, wie wir eine stochastische Lookahead-Politik entwerfen könnten, die die Eigenschaft ausnutzt, dass unsere Entscheidung ein Skalar ist.

Das Kapitel endet mit einer umfangreichen Reihe von Erweiterungen, die den Facettenreichtum der Varianten von Steuerungsproblemen aufzeigen, die in Lieferketten-Szenarien auftreten.

## Erzählung

Dieses Kapitel behandelt ein berühmtes Spiel aus den 1950er Jahren, bekannt als das „Bierspiel". Es wurde ursprünglich von Jay Forrester entworfen, einem Professor am MIT, der das Spiel entwickelte, um die Instabilitäten von Lieferketten zu veranschaulichen. Das Problem betrifft eine lineare Lieferkette, in der verschiedene Zulieferer Bier vom Ort der Herstellung (dem Hersteller) zum Markt (dem Einzelhändler) transportieren. Das Bier muss auf seinem Weg vom Herstellungsort zum Markt mehrere Zwischenhändler durchlaufen.

Es gibt zwei Arten von Flüssen:

- Den Fluss des Bieres – Jede Kiste Bier wird durch einen Penny dargestellt, der vom Hersteller zum Einzelhändler wandert.
- Den Fluss der Information – Jeder Punkt der Lieferkette füllt seinen Bestand wieder auf, indem er Anfragen für mehr Bier an die nächste Ebene weiter unten stellt.

Jede Ebene der Lieferkette wird als *Echelon* bezeichnet. Typischerweise gibt es vier bis sechs Echelons pro Team. Die Nachfrage beim Einzelhändler ist im Voraus festgelegt, aber verdeckt, in einem Kartenstapel. Sobald der Einzelhändler die Nachfrage der jeweiligen Woche aufdeckt, versucht er, die Nachfrage aus dem Bestand zu decken. Der Einzelhändler und jeder andere Zulieferer in der Lieferkette (außer dem Hersteller) füllt dann ein Blatt Papier aus, um mehr Bestand anzufordern.

Es ist möglich, dass der Einzelhändler oder einer der mittleren Zulieferer die Anfrage nach mehr Bestand (oder die Marktnachfrage auf Einzelhandelsebene) nicht erfüllen kann. In diesem Fall verbleibt die unerfüllte Nachfrage in einem Auftragsrückstand, der darauf wartet, mit neu eintreffendem Bestand erfüllt zu werden.

Nach dem Erfüllen der Bestellungen muss jeder (für diese Lieferkette) innehalten und entweder seinen Bestand (die Anzahl der Bierkisten im Lager) oder seinen Auftragsrückstand erfassen. Der Auftragsrückstand kostet eine Strafe von ＄4 pro Kiste. Überschüssiger Bestand verursacht Lagerhaltungskosten von ＄1 pro Kiste.

Die Schritte des Prozesses sind in Abbildung 11.1 dargestellt. Es gibt fünf Schritte:

**Schritt 0:** Jede Woche verfügt jeder Spieler über einen Bestand (in Pennys, jeder repräsentiert eine Kiste Bier) und eine Bestellung, die entweder die Einzelhandelsnachfrage sein kann (für den Einzelhandels-Echelon) oder eine Bestellung, die vom Spieler links von ihm aufgegeben wurde.

**Schritt 1:** Jeder Spieler versucht, so viele Einheiten wie möglich aus seinem Bestand zu entnehmen und nach links in einen Bereich *zwischen* sich und dem Spieler links zu verschieben (die Pennys nicht dem Bestand des linken Spielers hinzufügen). Wenn der Bestand nicht ausreicht, um die Bestellung zu erfüllen, streichen Sie die Bestellung durch und ersetzen Sie sie durch die Anzahl der Kisten, die noch zu erfüllen sind (dies ist der Auftragsrückstand).

**Schritt 2:** Schreiben Sie nun eine Bestellung darüber, wie viele Kisten Sie zur Wiederauffüllung Ihres Bestands wünschen, und legen Sie sie in den Bereich *zwischen* Ihnen und dem Spieler rechts von Ihnen (der Hersteller gibt eine Bestellung auf den Pennystapel auf, aus dem alles Bier stammt).

**Schritt 3:** Halten Sie inne und erfassen Sie auf Ihrem Bestandsblatt, wie viel Bestand Sie haben. Wenn Sie eine Bestellung nicht erfüllen konnten, haben Sie keinen Bestand und Sie haben Bestellungen in Ihrem Rückstand (die unerfüllten Bestellungen). Falls dies der Fall ist, erfassen Sie dies als Ihren Auftragsrückstand.

**Schritt 4:** Dies ist der entscheidende Schritt: Greifen Sie mit der linken Hand aus und ziehen Sie den nächsten Bestellzettel in Ihren Bestellstapel (die Blätter Papier), und greifen Sie gleichzeitig mit der rechten Hand aus, um die zu Ihnen kommenden Pennys in Ihren Bestand zu ziehen. Nun sind Sie wieder an dem Punkt, an dem Sie bei Schritt 0 waren.

<figure class="book-figure">
  <img src="/assets/images/sdam/princetonbeergame2018.png" alt="Layout of the Princeton version of the beer game." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 11.1.</span> Aufbau der Princeton-Version des Bierspiels.</figcaption>
</figure>

Es ist sehr wichtig, dass alle gleichzeitig ihre Züge machen, aber es ist ihnen nicht erlaubt, Informationen auszutauschen (und sie sollten nicht auf die Bestände anderer Spieler in derselben Kette schauen). Der Einzelhändler muss die Rolle übernehmen, alle synchron zu halten.

Die vollständigen Anweisungen für eine schlanke Version des klassischen Bierspiels können unter [tinyurl.com/PrincetonBeerGame](https://tinyurl.com/PrincetonBeerGame) heruntergeladen werden. Diese Version des Spiels eignet sich ideal für Kurse, die an durchgehenden Tischen mit einer Klasse von mindestens 8-10 Studierenden unterrichtet werden (die durchgehenden Tische werden benötigt, damit Spieler Papier und Pennys zwischen sich hin- und herschieben können). Teams sollten fünf oder sechs Spieler haben (was fünf oder sechs mittlere Echelons plus den Einzelhändler bedeutet), aber nicht weniger als vier. Die Person, die den Bestand am nächsten zur Fabrik führt, kann beide Positionen übernehmen (da die Fabrik kaum mehr tut, als Bestellungen zu erfüllen). Die Teams müssen nicht gleich groß sein, und es ist recht einfach, eine Kette zu erweitern, um einen verspätet ankommenden Studierenden aufzunehmen. Es ist möglich, das vollständige Spiel in einer 50-minütigen Vorlesung durchzuführen.

## Einordnung des Problems

Dies ist ein weiteres Multiagentenproblem. Die Antworten auf unsere drei Einordnungsfragen für jeden Agenten sind:

- **Metriken:** Minimierung der erwarteten Bestandshaltungskosten zuzüglich der Rückstandskosten für unerfüllte Bestellungen.
- **Entscheidungen:** Wie viel neues Produkt beim nächsten Agenten entlang der Lieferkette angefordert werden soll.
- **Unsicherheiten:** Wie viel der Markt anfordern wird (für den Einzelhandelsagenten, der die Marktnachfrage direkt bedient), oder wie viel der nächste Agent näher am Markt bestellen wird, sowie der Anteil der angeforderten Bestellungen, der von vorgelagerten Agenten (näher an der Fabrik) erfüllt wird.

## Grundmodell

Wir werden einen Zulieferer modellieren, der nicht einer der Endpunkte (Einzelhändler oder Bierhersteller) ist. Dieses Modell folgt eng dem Stil des Zwei-Agenten-Newsvendor-Problems aus dem vorherigen Kapitel, wenngleich einige Anpassungen erforderlich sind. Bevor wir beginnen, müssen wir eine neue Notation für Multiagentensysteme einführen.

### Multiagenten-Notation

Bevor wir beginnen, müssen wir unser Notationssystem dafür festlegen, wer was weiß, und für den Prozess des Informationsaustauschs.

Wir werden die verschiedenen entscheidungstreffenden Agenten in der Lieferkette mit $\Qcal = \lbrace 1, 2, \ldots, Q\rbrace $ kennzeichnen. Wir lassen $q=0$ den Markt beschreiben, der eine Informationsquelle ist, aber keine Entscheidungen trifft. Wir lassen $q=Q$ die Fertigungsanlage bezeichnen, von der wir (zumindest anfänglich) annehmen, dass sie stets genug Produkt herstellen kann, um die Nachfrage zu decken.

Wir beginnen mit der Definition der Zustandsvariable für Agent $q$ mittels $S_{tq}$, der Information, die Agent $q$ zum Zeitpunkt $t$ bekannt ist (dies kann Beliefs einschließen). Wenn Agent $q$ auf Agent $q'$ einwirkt, verwenden wir $x_{tqq'}$, die Aktion von Agent $q$ auf Agent $q'$. Wir beachten, dass die Entscheidung $x_{tqq'}$ von $q$ bestimmt wird, aber bei $q'$ als Information ankommt.

Eine Aktion von $q$ auf $q'$ zum Zeitpunkt $t$ kann die Bewegung physischer Ressourcen beinhalten, könnte aber auch das Senden von Informationen umfassen. Die Aktion von $q$ auf $q'$ wird bei $q'$ als exogener Informationsprozess ankommen, der zum Zeitpunkt $t+1$ bei $q'$ eintrifft (wo etwaige Verzerrungen erfasst würden), was wir als $W_{t+1,q,q'}$ schreiben, die Information, die bei Agent $q'$ zum Zeitpunkt $t+1$ aus Aktionen von Agent $q$ eintrifft (dies kann Information über Ressourcen sein oder das Senden bzw. Teilen von Information von $S_{tq}$ betreffen).

Schließlich wird es Zeitpunkte geben, an denen Agent $q$ eine Schätzung von etwas erstellen muss, das Agent $q'$ bekannt ist. Wenn wir $S_{tq'}$ etwas repräsentieren lassen, das Agent $q'$ bekannt ist, lassen wir $\overleftarrow{S}\_{t,q,q'}$ die Schätzung bezeichnen, die Agent $q$ von der Information in $S_{tq'}$ erstellt.

### Zustandsvariablen

Die Zustandsvariablen für Agenten $q=1, \ldots, Q-1$ sind: $R^{inv}\_{tq}$, der verbleibende Bestand nach Iteration $t$, nachdem Produkt an den nachgelagerten Zulieferer für Agent $q$ geliefert wurde; und $R^{back}\_{tq}$, rückständige Nachfrage, die noch nicht aus dem Bestand befriedigt wurde.

Vom Hersteller $q=Q$ wird angenommen, dass er stets über unbegrenzten Bestand verfügt.

Mit der Zeit werden wir lernen, dass dies eine unvollständige Beschreibung des Zustands des Problems ist, doch es ist ein guter Ausgangspunkt.

### Entscheidungsvariablen

Agent $q$ muss zwei Entscheidungen treffen. Die erste (und wichtigste) betrifft, wie viel beim nachgelagerten Agenten $q+1$ bestellt werden soll, was wir als $x^{req}\_{tq,q+1}$ schreiben, die Bestellung, die von Zulieferer $q$ aufgegeben wird, um an Zulieferer $q+1$ weitergeleitet zu werden, aufgegeben zum Bestellzeitpunkt in Iteration $t$, die von $q+1$ empfangen wird, um in Iteration $t+1$ erfüllt zu werden.

Die zweite betrifft, wie viel von der Anfrage des vorgelagerten Agenten aus dem Bestand erfüllt werden soll. Wir schreiben dies als $x^{fill}\_{tq,q-1}$, wie viel der unerfüllten Nachfrage $R^{back}\_{tq}$ zum Zeitpunkt $t$ aus dem Bestand erfüllt werden soll.

Diese Entscheidungen sind für $q=1, \ldots, Q-1$ eingeschränkt durch:

$$
\begin{align}
0 \leq x^{fill}_{tq,q-1}           &\leq R^{inv}_{tq},\label{eq:beergameconstraint1}\\
0 \leq x^{fill}_{tq,q-1}           &\leq R^{back}_{tq},\label{eq:beergameconstraint2}\\
x^{req}_{tq,q+1},x^{fill}_{tq,q-1} &\geq 0. \label{eq:beergameconstraint3}
\end{align}
$$

Bedingung $\eqref{eq:beergameconstraint1}$ spiegelt die Realität wider, dass wir keinen Bestand an Agent $q-1$ senden können, den wir nicht auf Lager haben. Bedingung $\eqref{eq:beergameconstraint2}$ besagt, dass wir keinen Bestand an Agent $q-1$ senden können, der nicht angefordert wurde. Beachten Sie, dass $R^{back}\_{tq}$ neue Bestellungen einschließt, die noch nicht erfüllt wurden.

Wir schreiben dann unseren Entscheidungsvektor als

$$
x_{tq} = (x^{req}_{tq,q+1},x^{fill}_{tq,q-1}),
$$

wobei unsere Entscheidungen von einer Politik $X^\pi(S_t)$ getroffen werden, die wir später entwerfen werden.

In unserem Grundspiel werden wir stets so viel wie möglich der Bestellung von $q-1$ aus dem Bestand erfüllen, sodass $x^{fill}\_{tq,q-1}$ technisch gesehen keine echte Entscheidung ist, da wir einfach $x^{fill}\_{tq,q-1} = \min\lbrace R^{back}\_{tq},R^{inv}\_{tq}\rbrace $ setzen werden. Dennoch handelt es sich um eine Aktion, die von $q$ ausgeführt wird, und sie öffnet die Tür für reichhaltigere Verhaltensweisen später.

Wenn wir der Einzelhandelsmarkt $q=0$ sind, dann stammt die Anfrage $W_{t,0,1} = x^{req}\_{t,0,1}$, die an Agent $q=1$ gerichtet wird, aus einer exogenen Informationsquelle.

Wenn wir die Fabrik $q=Q$ sind, erfüllen wir stets die Anfrage von $q=Q-1$, sodass

$$
x^{fill}_{t+1,Q,Q-1} = x^{req}_{t,Q-1,Q}.
$$

### Exogene Information

Es gibt zwei Arten exogener Information für Zulieferer $q$: $W^{fill}\_{t+1,q+1,q}$, die Menge des Produkts, die von Zulieferer $q+1$ als Reaktion auf die zum Zeitpunkt $t$ aufgegebene, aber zum Zeitpunkt $t+1$ eintreffende Anfrage empfangen wird; und $W^{req}\_{t+1,q-1,q}$, die Bestellung, die von Zulieferer $q-1$ zum Zeitpunkt $t$ bei Zulieferer $q$ aufgegeben wird, die zum Zeitpunkt $t+1$ eintreffen würde.

Es ist wichtig zu erkennen, dass die von den Agenten $q+1$ und $q-1$ getroffenen Entscheidungen bei Agent $q$ als exogene Information ankommen. Dies bedeutet, wir könnten schreiben

$$
W^{fill}_{t+1,q+1,q} = x^{fill}_{t,q+1,q}, \qquad W^{req}_{t+1,q-1,q} = x^{req}_{t,q-1,q}.
$$

Wir können die exogene Information für Agent $q$, die bis zum Zeitpunkt $t+1$ eintrifft, darstellen mittels

$$
W_{t+1,q} = (W^{fill}_{t+1,q+1,q},W^{req}_{t+1,q-1,q}).
$$

Dies beschreibt den Informationsprozess für die mittleren Agenten $q=1, \ldots, Q-1$. Der Informationsprozess $W_{t,0}$ bezieht sich auf den Markt, bei dem wir annehmen, dass es eine exogene Quelle von Anfragen $x^{req}\_{t,0,1} = W_{t,0,1}$ gibt, die an Agent 1 gerichtet werden.

### Übergangsfunktion

Unsere Zustandsvariablen $R^{inv}\_{tq}$ und $R^{back}\_{tq}$ für $q=1, \ldots, Q-1$ entwickeln sich gemäß

$$
\begin{align}
R^{inv}_{t+1,q} &= R^{inv}_{tq}-x^{fill}_{t,q,q-1} + W^{fill}_{t+1,q+1,q}, \label{eq:beergametrans1}\\
R^{back}_{t+1,q} &= R^{back}_{tq}-x^{fill}_{t,q,q-1} + W^{req}_{t+1,q-1,q}. \label{eq:beergametrans2}
\end{align}
$$

Gleichung $\eqref{eq:beergametrans1}$ entnimmt die Anfrage $x^{fill}\_{t,q,q-1}$ aus dem Bestand (dieser darf nicht negativ werden) und addiert dann den eingehenden Bestand $W^{fill}\_{t+1,q+1,q}$ vom nachgelagerten Agenten $q+1$, um den Bestand zum Zeitpunkt $t+1$ zu erzeugen. Gleichung $\eqref{eq:beergametrans2}$ erfüllt angeforderte Bestellungen, die in $R^{back}\_{tq}$ vorgehalten werden, und addiert dann neue Bestellungen $W^{req}\_{t+1,q-1,q}$, die in Periode $t+1$ zu erfüllen sind.

### Zielfunktion

Unsere Zielfunktion für Agent $q$ bewertet Strafen für verbleibenden Bestand $R^{inv}\_{tq}$ und unerfüllte Nachfrage $R^{back}\_{tq}$. Sei $c^{inv}\_q$ die Einheitskosten der Bestandshaltung für Agent $q$ und $c^{back}\_q$ die Einheitskosten unerfüllter Bestellungen für Agent $q$.

Diese Kosten werden auf Bestände und rückständige Nachfrage angesetzt, nachdem Entscheidungen zur Erfüllung einer Kundenbestellung getroffen wurden, aber bevor neue Bestellungen eingetroffen sind. Somit ist unsere Kostenfunktion für Agent $q$ gegeben durch

$$
C(S_t,x_t) = c^{inv}(R^{inv}_{tq}-x^{fill}_{t,q,q-1}) + c^{back}(R^{back}_{tq}-x^{fill}_{t,q,q-1}).
$$

Beachten Sie, dass $R^{inv}\_{tq}$ der aktuelle Bestand ist, sodass $R^{inv}\_{tq}-x^{fill}\_{t,q,q-1}$ der verbleibende Bestand ist, nachdem wir die Bestellungen für den Zeitpunkt $t$ ausgeführt haben. Ebenso umfasst $R^{back}\_{tq}$ sowohl neue Bestellungen als auch nicht erfüllte Bestellungen aus vorherigen Perioden. Infolgedessen ist $R^{back}\_{tq}-x^{fill}\_{t,q,q-1}$ die Bestellungen, die nicht sofort erfüllt wurden.

Wir suchen nun nach der besten Politik unter Verwendung von

$$
\min_\pi \E\left\{\sum_{t=0}^T C_q(S_t,X^\pi(S_t))\vert S_0\right\}.
$$

Dies muss für jeden Agenten $q$ durchgeführt werden, unter der Annahme, dass jeder selbstoptimierend ist. Eine separate Herausforderung ist die Auswahl von Politiken für jeden Agenten, die nur die jedem Agenten verfügbaren Informationen nutzen können, wobei wir jedoch weiterhin Politiken anstreben, die eine globale Optimalität erreichen. Das ist eine Frage, die den Rahmen dieses Buches sprengt.

## Modellierung von Unsicherheit

Jeder Agent, mit Ausnahme der Agenten an den Endpunkten, muss zwei Quellen von Unsicherheit bewältigen:

- Die Anfragen des vorgeschalteten Agenten, der der Markt sein kann oder ein anderer Agent, der auf ungewisse Weise auf die an ihn gestellten Anforderungen reagiert, sowie die Fähigkeit der Lieferkette, auf ihre Anfragen zu reagieren.
- Die Fähigkeit des vorgeschalteten Agenten, die Bestellungen des Agenten zu erfüllen.

Mit anderen Worten, die einzigen Quellen von Unsicherheit sind der Markt und das Verhalten der Agenten. Die Art und Weise, wie Agenten (die Menschen sind) miteinander interagieren, führt zu komplexen (und ungewissen) Dynamiken. Typischerweise wird das Spiel so durchgeführt, dass die Dynamik des Marktes recht bescheiden ist. Selbst wenn es auf diese Weise durchgeführt wird, kann menschliches Verhalten erhebliche Instabilitäten hervorrufen, die in realen Lieferketten beobachtet wurden, wo sie den Namen "Bullwhip-Effekt" erhalten haben.

## Entwurf von Politiken

Es gibt eine Vielzahl grundlegender PFA-artiger Politiken, die wir in Betracht ziehen könnten. Wir beginnen mit der Annahme, dass wir eine Anfrage stets bis zu unserem verfügbaren Bestand erfüllen, sodass

$$
x^{fill}_{t,q,q-1} = \min\{x^{req}_{t,q-1,q}, R^{inv}_{tq}\}.
$$

Wir stellen fest, dass wir beim Entwurf verschiedener Politiken möglicherweise zusätzliche Elemente zu den Zustandsvariablen hinzufügen müssen, um die Informationsbedürfnisse der Politik zu erfüllen.

### Einige einfache Regeln

Wir werden uns mit einigen einfachen Bestellregeln aufwärmen:

- Fordern Sie von Agent $q+1$ das an, was in der vorherigen Zeitperiode von $q$ angefordert wurde:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = W^{req}_{t-1,q-1,q} + \theta_{q}.
$$

  Diese Politik ignoriert, wie viel wir im Bestand haben; es handelt sich um eine reine Tracking-Politik. Diese Politik erfordert, dass wir die vorherige Anfrage $W^{req}\_{t-1,q-1,q}$ in unserer Zustandsvariable speichern, die dadurch zu

$$
S_{tq} = (R^{inv}_{tq},R^{back}_{tq}, W_{t-1,q-1,q}).
$$

  wird. Wir erhöhen sie dann um $\theta$, um uns gegen Unsicherheit abzusichern.
- Fordern Sie an, was benötigt wird, um aktuelle und vergangene Anfragen zu erfüllen:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = R^{back}_{tq} + \theta_{q}.
$$

  Wenn wir übrig gebliebene Nachfragen haben, würde diese Politik eine Doppelzählung darstellen, was bedeutet, dass mehrere Anfragen gestellt werden.
- Zielbestandspolitik:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = \max\{0, \theta^{target}_{q}-R^{inv}_{tq}\}.
$$

  Diese Politik strebt danach, einen festgelegten Zielbestand $\theta^{target}$ aufrechtzuerhalten, der sich nicht ändert, wenn sich die Bedingungen ändern.

Dies sind grundlegende parametrisierte PFAs, die einfach zu implementieren sind, aber natürlich eine Abstimmung erfordern. Gleichzeitig sind sie recht einfach und ignorieren Faktoren wie die Historie vergangener Bestellungen, die noch nicht erfüllt wurden (tatsächlich weist jede dieser Politiken grundlegende Mängel auf).

Beachten Sie, dass $R^{back}\_{tq}$ die Bestellungen von Agent $q-1$ an Agent $q$ sind, die $q$ noch nicht erfüllt hat. Die von $q$ an $q+1$ gestellten Bestellungen, die noch nicht erfüllt wurden, sind durch $R^{back}\_{t,q+1}$ gegeben, aber dies ist Agent $q$ nicht unmittelbar bekannt. Sei $\overleftarrow{R}^{back}\_{tq,q+1}$ die Schätzung von $R^{back}\_{t,q+1}$, die Agent $q$ von den bei $q+1$ bekannten Rückstandsbeständen vornimmt. Dies sind die nicht erfüllten Bestellungen, die $q$ bei $q+1$ aufgegeben hat, was eine Statistik ist, die normalerweise von $q+1$ geführt wird.

Normalerweise können Informationen, die einem Agenten (wie $q+1$) bekannt sind, einem anderen Agenten (wie $q$) nicht perfekt bekannt sein, aber in diesem Fall handelt es sich um eine Statistik, die $q$ selbst führen kann, unter Verwendung von

$$
\overleftarrow{R}^{back}_{t+1,q,q+1} = \max\{0,\overleftarrow{R}^{back}_{tq,q+1}+x^{req}_{t,q,q+1} - W^{fill}_{t+1,q+1,q}\}.
$$

Wir können diese Statistik nutzen, um eine angepasste Zielbestandspolitik vorzuschlagen, bei der wir die durch $\overleftarrow{R}^{back}\_{t+1,q,q+1}$ erfassten nicht erfüllten Bestellungen zu unserem aktuellen Bestand $R^{inv}\_{tq}$ hinzufügen, was wir wie folgt schreiben:

- Angepasste Zielbestandspolitik:

$$
x^{req}_{t,q,q+1} = \max\{0, \theta^{target}-(R^{inv}_{tq}+\overleftarrow{R}^{back}_{t+1,q,q+1})\}.
$$

Diese Politik ist eine Form von PFA (es gibt keine eingebettete Optimierung), berücksichtigt jedoch Lieferungen, die in Zukunft eintreffen werden.

### Eine Anker-und-Anpassungs-Heuristik

Im Jahr 1989 schrieb John Sterman (Professor am MIT und Experte für Business-Dynamik) einen Aufsatz, in dem er das von Tversky und Kahneman (1974) entwickelte Prinzip des "Anker-und-Anpassung" auf das Bierspiel anwandte. Wir werden diese Idee hier skizzieren.

Wir beginnen mit der Definition einer Reihe von Zustandsvariablen. Die tatsächlich verwendeten Variablen können von der Politik abhängen.

- **Physische Zustandsvariablen:** $R^{inv}\_{tq}$, aktueller Bestand; $R^{back}\_{tq}$, rückständige Nachfrage; und $R^{transit}\_{tq}$, aktueller Bestand im Transit (wir erfassen nicht, wie lange sich der Bestand im Transit befunden hat). Der Ressourcenzustand ist dann $R_{tq} = (R^{inv}\_{tq},R^{back}\_{tq},R^{transit}\_{tq})$.
- **Informationsvariablen:** $F_{t-1,q,q-1}$, tatsächliche Erfüllung von $q$ an $q-1$ aus der vorherigen Zeitperiode, sodass $F_{t-1,q,q-1} = x^{fill}\_{t-1,q,q-1}$; und $A_{t-1,q+1,q}$, tatsächliche Ankünfte bei $q$ von $q+1$ in der vorherigen Zeitperiode, sodass $A_{t-1,q+1,q} = x^{fill}\_{t-1,q+1,q}$. Der Informationszustand ist dann $I_{tq} = (F_{t-1,q-1,q},A_{t-1,q-1,q})$. Mit diesen Variablen "erinnern" wir uns an eine Aktivität aus der vorherigen Zeitperiode. Ihre Verwendung hängt von der Politik ab.
- **Belief-Zustandsvariablen:** $\Abar_{t,q+1,q}$, geschätzte Ankunftsrate des Produkts von Agent $q+1$ (dies ist eine Schätzung der Rate, mit der Produkt von $q+1$ bei $q$ eintrifft); $\Fbar_{t,q,q-1}$, geschätzte Erfüllungsrate, die an Agent $q-1$ geliefert wird (dies ist eine Schätzung der Rate, mit der Produkt an $q-1$ versendet wird); und $\Dbar_{t,q-1,q}$, geschätzte Nachfragerate von $q-1$ (dies würde $\Fbar_{t,q-1,q}$ entsprechen, wenn wir jede Bestellung vollständig erfüllen würden, was bedeutet, dass $\Fbar_{t,q-1,q} \leq \Dbar_{t,q-1,q}$). Der Belief-Zustand ist dann $B_{tq} = (\Abar_{t,q+1,q},\Fbar_{t,q-1,q},\Dbar_{t,q-1,q})$. Wie bei $I_t$ hängt die Verwendung dieser Variablen von der Politik ab. Später werden wir verschiedene Möglichkeiten zur Berechnung dieser Schätzungen vorschlagen.

Unsere vollständige Zustandsvariable ist dann

$$
S_{tq} = (R_{tq}, I_{tq}, B_{tq}).
$$

Die geschätzte Erfüllungsrate $\Fbar_{t,q,q-1}$ kann auf verschiedene Arten berechnet werden:

- Reaktiv: $\Fbar_{t,q-1,q} = F_{t-1,q-1,q}$.
- Stabil: $\Fbar_{t,q-1,q} = \theta^{trgt-fill}\_q$, wobei $\theta^{trgt-fill}\_q$ eine von Agent $q$ festgelegte Ziel-Erfüllungsrate ist.
- Regressive Erwartungen: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \theta^{trgt-fill}\_q$ für einen festgelegten Glättungsfaktor $0 \leq \gamma \leq 1$.
- Adaptive Erwartungen: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \Fbar_{t,q-1,q}$.

Das Prinzip des "Anker-und-Anpassung", angewendet auf diese Situation, besteht darin, einen "Anker" zu wählen, der angibt, wie viel wir im Durchschnitt zu bestellen erwarten sollten, mit einer "Anpassung", um aktuelle Bedingungen widerzuspiegeln.

- **Grundlegende Auffüllpolitik** – Wir können jede der Methoden zur Berechnung von $\Fbar$ verwenden, um die Politik zu erhalten

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}) = \Fbar_{t,q-1,q}.
$$

- **Anker-und-Anpassungspolitik** – Wir werden unsere geschätzte Bestellrate $\Fbar_{t,q-1,q}$ als unseren "Anker" verwenden, das ist, was wir erwarten, bestellen zu sollen, aber wir werden Anpassungen basierend auf unserem verfügbaren Bestand und dem Bestand im Transit vornehmen. Wir stellen diese Anpassungen dar mit $\delta R^{inv}\_{tq}$, der Anpassung basierend auf dem aktuellen Bestand $R^{inv}\_{tq}$; und $\delta R^{transit}\_{tq}$, der Anpassung basierend auf dem aktuellen Bestand im Transit $R^{transit}\_{tq}$.

  Wir können diese verwenden, um eine "Anker-und-Anpassungs"-Politik zu erstellen, die gegeben ist durch

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta_q) = \max\{0,\Fbar_{t,q-1,q} + \delta R^{inv}_{tq} + \delta R^{transit}_{tq}\}.
$$

  Nun müssen wir also Anpassungsmechanismen entwerfen. Eine mögliche Strategie für $\delta R^{inv}\_t$ könnte sein

$$
\delta R^{inv}_{tq} = \theta^{inv}_q (R^{inv-trgt}_q - R^{inv}_{tq}),
$$

  wobei $\theta^{inv}\_q$ ein Glättungsfaktor ist und der Zielbestand $R^{inv-trgt}$ abstimmbare Parameter sind.

  Eine mögliche Strategie für $\delta R^{transit}\_{tq}$ könnte sein

$$
\delta R^{transit}_{tq} = \theta^{transit} (R^{transit-trgt}_q - R^{transit}_{tq}).
$$

  Unser Vektor abstimmbarer Parameter wäre dann

$$
\theta_q = (\theta^{inv}_q, R^{inv-trgt}_q, \theta^{transit}_q, R^{transit-trgt}_q).
$$

  Diese Parameter müssen für jeden Agenten $q$ abgestimmt werden.

Die Anker-und-Anpassungspolitik wurde durch menschliches Verhalten motiviert und nicht durch eine Begründung, dass sie nahezu optimal wäre. Ein Vorteil ist, dass sie einfach, transparent und intuitiv ist. Die Herausforderung sind stets die abstimmbaren Parameter, insbesondere die Zielwerte $R^{inv-trgt}$ und $R^{transit-trgt}$, da diese als statische Parameter präsentiert werden, obwohl sie tatsächlich auf Bedingungen reagieren müssten.

### Eine Lookahead-Politik

Wir haben erstmals eine stochastische Lookahead-Politik in [Kapitel 7](/sdam/de/chapter-7/) vorgestellt, wiederholen sie hier aber zur einfacheren Referenz:

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA2}
\end{align}
$$

Gleichung $\eqref{eq:policiesapproximateDLA2}$ kann besonders einschüchternd sein. Abbildung 11.2 veranschaulicht jedes der Elemente in der Politik anhand eines einfachen Entscheidungsbaums (all dies gilt für einen einzelnen Agenten $q$, den wir unterdrücken). Es gibt eine Menge von Entscheidungen $x_t$, die vom ersten Entscheidungsknoten $S_t$ ausgehen, wonach wir einen Erwartungswert über die zufälligen Informationen in $\Wtilde_{t,t+1}$ bilden. Danach verwenden wir eine approximative "Lookahead-Politik" $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$ für jeden Entscheidungsknoten $\Stilde_{tt'}$ in unserem Lookahead-Modell, wobei wir die Zustandsvariable typischerweise in irgendeiner Weise vereinfachen. Wir approximieren zudem zukünftig eintreffende Informationen mittels $\Wtilde_{tt'}$, entweder durch die Verwendung eines deterministischen Lookahead-Modells oder eines simulierten Satzes möglicher Ergebnisse.

<figure class="book-figure">
  <img src="/assets/images/sdam/lookaheadpolicytodecisiontree.jpg" alt="Veranschaulichung der Lookahead-Politik als Entscheidungsbaum." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 11.2.</span> Veranschaulichung der Lookahead-Politik als Entscheidungsbaum.</figcaption>
</figure>

Diese Gleichung kann als aus zwei Elementen bestehend betrachtet werden:

- Zunächst zählen wir jede mögliche Entscheidung $x_{tq}$ auf.
- Dann simulieren wir die Auswirkungen dieser Entscheidung anhand einer Stichprobe beliebiger zufälliger Informationen, während wir Entscheidungen mit einer approximativen "Lookahead-Politik" treffen, die als $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$ bezeichnet wird.

Um dies in unserem Lieferketten-Kontext zu nutzen, müssen wir das Verhalten der anderen Agenten simulieren, wobei uns bewusst sein muss, dass a) wir die Anfangsbedingungen $R_{tq'}$ für $q' \ne q$ nicht kennen, und b) wir nicht wissen, wie die anderen Agenten Entscheidungen treffen.

Um mit unserer fehlenden Kenntnis der Ausgangsbedingungen umzugehen, müssen wir diese als Zufallsvariablen betrachten und aus einer Verteilung ziehen (dies ist im ersten $\Etilde_{\Wtilde_{t,t+1}}$ verborgen). Wir stellen fest, dass es möglich ist, dass ein Agent beispielsweise keinen Bestand und einen erheblichen Rückstand hat. Wir könnten vermuten, dass dies der Fall ist, wenn wir feststellen, dass die Zeit bis zur Erfüllung der von uns aufgegebenen Bestellungen sehr lange dauert.

Wir müssen dann die unbekannten Politiken simulieren. Während wir versuchen, eine sehr ausgefeilte stochastische Lookahead-Politik für Agent $q$ zum Zeitpunkt $t$ zu erstellen, empfehlen wir, die zuvor von uns vorgeschlagenen viel einfacheren Politiken zu verwenden, nicht nur für die anderen Agenten, sondern auch für Agent $q$ in zukünftigen Zeitperioden.

Würde also, angesichts dieser Approximationen, eine stochastische Lookahead-Politik eine der oben skizzierten einfacheren Politiken übertreffen? Dies wäre eine schöne Forschungsfrage, aber die Lookahead-Politik überwindet eine wesentliche Einschränkung der einfacheren parametrischen Politiken. Konkret erfasst die Lookahead-Politik auf natürliche Weise den komplexen Zustand dieses Systems, wie etwa die Historie vergangener Bestellungen sowie beliebige Prognosen zukünftiger Ereignisse. Die parametrischen Politiken sind für stationäre Probleme geeignet, während sich die Lookahead-Politik auf natürliche Weise an Verhalten anpasst, das stark nichtstationär sein kann.

## Erweiterungen

Es gibt viele Möglichkeiten, dieses Problem zu modifizieren. Einige Ideen umfassen:

**1)** Wir müssen Situationen bewältigen, in denen die Bestellungen der vorgeschalteten Agenten viel größer (oder vielleicht kleiner) sind als das, was wir in der Vergangenheit gesehen haben, was auf eine systematische Änderung der Nachfrage hindeutet. Wir können Schätzungen des potenziellen Wachstums zukünftiger Nachfragen einführen, um mit unerwarteten Änderungen der vorgeschalteten Nachfrage umzugehen.

**2)** Wir können Beliefs darüber aufrechterhalten, wie sich vorgeschaltete Agenten verhalten könnten. Zum Beispiel hilft es Agent $q$, wenn Agent $q+1$ großzügige Bestände unterhält. Wir können den Bestandsaufbau fördern, indem wir Rauschen in unsere eigenen Anfragen einführen, was dann die Schätzung erhöht, die Agent $q+1$ von der Unsicherheit der von Agent $q$ aufgegebenen Bestellungen hat.

**3)** Jeder Agent reagiert auf Ausfälle und antwortet darauf, indem er höhere Bestände unterhält. Ein Agent $q$ könnte etwas Rauschen in seine Bestellungen an $q+1$ einführen, damit $q+1$ höhere Bestände unterhält, sodass die Bestellungen von $q$ mit größerer Wahrscheinlichkeit erfüllt werden.

**4)** Ein Großteil der Sensitivität des Spiels ist auf die hohe Strafe für Fehlbestände im Vergleich zur Bestandshaltung zurückzuführen (denken Sie daran, dass rückständige Bestellungen 4 ＄ pro Kiste und Tag kosten und die Bestandshaltung 1 ＄ pro Kiste und Tag). Versuchen Sie, die Fehlbestandskosten von 4 ＄ auf 1 ＄ und dann auf 0,50 ＄ zu ändern.

## Was haben wir gelernt?

- Wir beschreiben ein einfaches Multiagenten-Problem namens "Bierspiel" ("beer game"), das in den 1950er Jahren erfunden wurde. Um das Problem zu modellieren, führen wir zusätzliche Notation ein, um das Wissen jedes Agenten und den Informationsaustausch zwischen Agenten zu erfassen. Dies kann man sich als eine Reihe von Zwei-Agenten-Zeitschriftenhändlerproblemen ("newsvendor problems") vorstellen, mit dem Unterschied, dass überschüssiger Bestand in die nächste Periode übertragen wird, ebenso wie unbefriedigte Nachfragen.
- Interessierte Leser werden auf eine vereinfachte Version des klassischen Bierspiels verwiesen, die vom Autor an der Princeton University entwickelt wurde.
- Wir führen eine Notation ein, die erfasst, was jeder Agent weiß, einschließlich einer Schätzung eines Agenten über Informationen, die einem anderen Agenten bekannt sind.
- Wir modellieren eine Entscheidung eines Agenten als exogene Information für einen anderen Agenten.
- Wir beginnen mit einigen einfachen PFA-Politiken, bei denen sich Agenten an grundlegende Informationen darüber anpassen, wie viel sie bestellen müssen.
- Anschließend fassen wir eine berühmte "Anker-und-Anpassungs"-Politik zusammen, die von zwei Psychologen vorgeschlagen wurde und eine weitere Form der PFA darstellt.
- Abschließend skizzieren wir eine direkte Lookahead-Politik, die davon abhängt, dass ein Agent $q$ das Verhalten anderer Agenten simuliert.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was ist der Zustand eines Zwischenagenten?</li>
<li>Welche Entscheidungen kann jeder Agent treffen?</li>
<li>Was sind die Quellen exogener Information für jeden Zwischenagenten?</li>
<li>Welche Unsicherheitsquellen beeinflussen das Verhalten des Spiels?</li>
<li>Erklären Sie in eigenen Worten, was unter einer "Anker-und-Anpassungs"-Politik zu verstehen ist. Erwarteten ihre Entwickler, dass dies eine gute Politik sein könnte?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Üben Sie Kritik an den oben vorgeschlagenen einfachen Regeln.</li>
<li>Stellen Sie sich vor, es gäbe gelegentliche, aber seltene Verschiebungen der Nachfrage vom Markt zu deutlich höheren oder niedrigeren Niveaus. Entwerfen Sie eine Politik, die berücksichtigt, dass solche Verschiebungen auftreten können, was bedeutet, dass sich auch der Rest der Lieferkette anpassen muss. Wie würde Ihre Politik auf die unvermeidlichen Perioden von Produktknappheit reagieren?</li>
<li>Der obige Abschnitt zur Lookahead-Politik bietet eine grobe Skizze einer Lookahead-Politik. Füllen Sie die Details aus, indem Sie eine detaillierte Implementierung ausarbeiten.</li>
</ol>
{% endraw %}
