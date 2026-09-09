---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 8: Energiespeicherung I"
permalink: /sdam/de/chapter-8/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 46e5d45993dd1cd0
---


{% raw %}
## Kapitelüberblick

Dieses Kapitel betrachtet ein zunächst recht einfach erscheinendes Bestandsproblem, das bei der Speicherung von Energie entsteht, die wir vom Netz kaufen oder an das Netz verkaufen können, welches stark stochastische Preise aufweist. Im Gegensatz zu den ersten sechs Kapiteln verwenden wir eine wesentlich reichhaltigere Menge an Modellen zur Beschreibung dieser stochastischen Preise, was bereits einen Vorgeschmack auf die Komplexität gibt, die bei der Modellierung von Unsicherheit auftreten kann. Wir bieten einen Überblick über verschiedene Modelle für Preisprozesse, einschließlich klassischer Zeitreihenmodelle, Jump-Diffusion-Modelle (zur Erfassung von Preisspitzen), Quantilverteilungen und schließlich eines Hybridmodells, das Quantilverteilungen mit Standardnormalverteilungen kombiniert und so die Tür für Methoden öffnet, die auf Normalität beruhen.

Anschließend beschreiben wir eine Reihe von Politiken, beginnend mit einer einfachen "Kaufe niedrig, verkaufe hoch"-Politik (einer Form der Politikfunktionsapproximation), bevor wir zu mehreren Methoden übergehen, die auf der Approximation der Bellman-Gleichung basieren, die wir zuerst in [Kapitel 5](/sdam/de/chapter-5/) gesehen haben. Wir beginnen mit einer einfachen Beschreibung der Bellman-Gleichung (die für fast alle Probleme rechnerisch nicht durchführbar ist) und bieten dann einen Überblick über Varianten, die als rückwärtsgerichtete approximative dynamische Programmierung (ADP), vorwärtsgerichtete ADP und eine Hybridstrategie unter Verwendung vorwärtsgerichteter ADP in Kombination mit Parameteroptimierung bekannt sind.

## Erzählung

New Jersey plant die Entwicklung von 3.500 Megawatt (MW) Offshore-Windkraftleistung. Eine Herausforderung besteht darin, dass Wind (und insbesondere Offshore-Wind) sehr variabel sein kann. Die Auswirkung dieser Variabilität auf das Stromnetz wird durch die Eigenschaft verstärkt, dass die Windleistung (über mittlere Bereiche) mit der dritten Potenz der Windgeschwindigkeit zunimmt. Diese Variabilität ist in Abbildung 8.1 dargestellt.

<figure class="book-figure">
  <img src="/assets/images/sdam/windpower.png" alt="Leistung von fünf Stufen der Windenergieerzeugungskapazität." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 8.1.</span> Leistung von fünf Stufen der Windenergieerzeugungskapazität.</figcaption>
</figure>

Energie aus Windkraft ist in Regionen mit hohem Windaufkommen populär geworden, etwa im mittleren Westen der Vereinigten Staaten, in Küstenregionen vor Europa, im Nordosten Brasiliens und in nördlichen Regionen Chinas (um nur einige zu nennen). Manchmal haben Gemeinden (und Unternehmen) in erneuerbare Energien (Wind oder Solar) investiert, um ihren CO2-Fußabdruck zu reduzieren und ihre Abhängigkeit vom Netz zu minimieren.

Es ist jedoch recht selten, dass diese Projekte es einer Gemeinde ermöglichen, das Netz vollständig aus ihrem Portfolio zu eliminieren. Übliche Praxis ist es, die erneuerbare Quelle (Wind oder Solar) direkt an das Netz verkaufen zu lassen, während ein Unternehmen vom Netz einkaufen kann. Dies kann als Absicherung nützlich sein, da das Unternehmen während Preisspitzen (Preise können von ＄20 pro Megawattstunde (mwh) auf ＄300 pro mwh oder mehr springen) viel Geld verdient, was die Kosten für den Stromkauf während dieser Perioden ausgleicht.

Die größte Schwierigkeit bei erneuerbaren Energien besteht darin, mit der Variabilität umzugehen. Während eine Lösung darin besteht, jegliche Energie aus einer erneuerbaren Quelle einfach in das Netz einzuspeisen und die Kapazität des Netzes zur Bewältigung dieser Variabilität zu nutzen, besteht erhebliches Interesse daran, Speicher (insbesondere Batteriespeicher) einzusetzen, um die Spitzen und Talsohlen zu glätten. Neben der Glättung der Variabilität der erneuerbaren Quelle besteht auch Interesse daran, Batterien zu nutzen, um von Preisspitzen zu profitieren, indem Strom gekauft wird, wenn er billig ist (Preise können sogar negativ werden), und wieder verkauft wird, wenn sie hoch sind. Die Ausnutzung der Variabilität der Strompreise im Netz, um bei niedrigen Preisen zu kaufen und bei hohen Preisen zu verkaufen, wird als Batteriearbitrage bezeichnet.

<figure class="book-figure">
  <img src="/assets/images/sdam/storagegrid.jpg" alt="Netz-zu-Speicher-System zur Stromstabilisierung und Batteriearbitrage." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 8.2.</span> Netz-zu-Speicher-System zur Stromstabilisierung und Batteriearbitrage.</figcaption>
</figure>

Wir werden die in Abbildung 8.2 gezeigte Konfiguration verwenden, um eine Reihe von Modellierungs- und algorithmischen Fragestellungen bei der Energiespeicherung zu veranschaulichen. Dieses Problem wird Einblicke in praktisch jedes Bestands-/Speicherproblem liefern, einschließlich:

- Bargeldhaltung in Investmentfonds – Eine Bank muss bestimmen, wie viel von ihrem Anlagekapital sie als Bargeld halten muss, um Anfragen für Rücknahmen zu erfüllen, im Gegensatz zur Anlage des Geldes in Kredite, Aktien und Anleihen.
- Einzelhändler (sowohl online als auch stationäre Geschäfte) müssen Bestände von Hunderttausenden von Produkten verwalten.
- Autohändler müssen entscheiden, wie viele Fahrzeuge sie vorhalten, um die Kundennachfrage zu erfüllen.
- Beratungsunternehmen müssen entscheiden, wie viele Mitarbeiter sie beschäftigen, um die variable Nachfrage verschiedener Beratungsprojekte zu erfüllen.

Energiespeicherung ist eine besonders reichhaltige Form des Bestandsproblems. Während wir nicht alle möglichen Varianten (die endlos sind) betrachten werden, wird unser Problem die folgenden Merkmale aufweisen:

- Die Strompreise im Netz können sehr volatil sein. In den frühen 2000er Jahren lagen typische Energiepreise bei etwa ＄20-＄25 pro mwh, sprangen aber oft auf über ＄300 und konnten ＄1000 überschreiten, typischerweise während extremer Wetterereignisse.
- Energie aus Wind kann prognostiziert werden, allerdings nicht sehr gut. Rollierende Prognosen stehen zur Verfügung, um diese Schätzungen zu aktualisieren.
- Solarenergie weist drei Arten von Variabilität auf: den sehr vorhersehbaren Prozess des tageszeitlichen Zyklus von Sonnenauf- und -untergang, das Vorhandensein sehr sonniger oder sehr bewölkter Tage (diese können typischerweise einen Tag oder mehr im Voraus vorhergesagt werden) und die Variabilität lokaler Wolken, die selbst eine Stunde im Voraus schwer vorhersehbar ist, aber erhebliche Leistungsschwankungen im Netz verursachen kann.
- Die Nachfrage nach Energie ist variabel, aber relativ vorhersehbar, da sie hauptsächlich von der Temperatur (und in geringerem Maße von der Luftfeuchtigkeit) abhängt.
- Energie kann zu aktuellen Netzpreisen vom Netz gekauft oder an das Netz verkauft werden. Ebenso kann Energie aus der erneuerbaren Quelle verwendet werden, um die aktuelle Last (Nachfrage nach Strom) zu decken, gespeichert oder zurück an das Netz verkauft werden (je nach Konfiguration).
- Es gibt einen Verlust von etwa 5 bis 10 Prozent bei der Umwandlung von Strom von AC (wie er über das Netz ankommt) zu DC (erforderlich zur Speicherung von Strom in der Batterie).

## Einordnung des Problems

Die Antworten auf unsere drei Rahmenfragen sind:

- **Metriken:** Wir möchten den erwarteten Preis minimieren, den wir für vom Netz gekauften Strom zahlen.
- **Entscheidungen:** Die Menge an Energie, die wir in jeder Zeitperiode vom Netz kaufen oder an das Netz zurückverkaufen.
- **Unsicherheiten:** Der Strompreis in jeder Zeitperiode.

## Grundmodell

Wir werden eine Reihe von Varianten dieses Problems verwenden, um verschiedene Modellierungsfragen zu veranschaulichen, beginnend mit einem Grundsystem, das eine Batterie zum Kaufen von und Verkaufen an das Netz einsetzt, um die Preisvolatilität auszunutzen. Für diese Anwendung werden wir in 5-Minuten-Zeitschritten voranschreiten, da dies die Frequenz ist, mit der Preise im Netz aktualisiert werden (dieses Zeitintervall variiert je nach Netzbetreiber).

### Zustandsvariablen

Für unser Grundmodell müssen wir lediglich zwei Variablen verfolgen: $R_t$, die Menge an Energie (gemessen in Megawattstunden, oder mwh), die zum Zeitpunkt $t$ in der Batterie gespeichert ist; und $p_t$, den Preis von Energie im Netz. Unsere Zustandsvariable ist dann

$$
S_t = (R_t, p_t).
$$

Die Zustandsvariable wird schnell komplexer, wenn wir dem Modell verschiedene Elemente hinzufügen. Zum Beispiel hängt die Zustandsvariable zur Darstellung von Preisen davon ab, wie wir den Preisprozess modellieren, wie in der Übergangsfunktion beschrieben (siehe unten).

### Entscheidungsvariablen

Unsere einzige Entscheidung ist, ob wir vom Netz kaufen oder an das Netz verkaufen: $x_t$, die Menge an Strom, die vom Netz gekauft ($x_t > 0$) oder an das Netz verkauft ($x_t < 0$) wird.

Wenn wir Energie in die Batterie hinein- oder aus ihr heraustransferieren, werden wir annehmen, dass wir bei der Übertragung nur einen Anteil $\eta$ erhalten, was einen Verlust von $1-\eta$ impliziert. Zur Vereinfachung nehmen wir an, dass dieser Verlust unabhängig davon gleich ist, ob wir die Batterie laden oder entladen.

Die Entscheidung wird durch die Kapazität der Batterie begrenzt, was bedeutet, dass wir die Nebenbedingungen einhalten müssen

$$
x_t \leq \frac{1}{\eta} (R^{max} - R_t), \qquad x_t \geq -\eta R_t,
$$

wobei die erste Nebenbedingung gilt, wenn wir vom Netz kaufen ($x_t > 0$), während die zweite Nebenbedingung gilt, wenn wir an das Netz verkaufen ($x_t < 0$).

Wie immer nehmen wir an, dass Entscheidungen mit einer Politik $X^\pi(S_t)$ getroffen werden, die unten näher bestimmt wird.

### Exogene Information

In unserem Grundmodell ist die einzige exogene Information die Preisänderung. Wir können annehmen, dass der Preis in jeder Zeitperiode offengelegt wird, ohne ein Modell zur Vorhersage des Preises basierend auf vergangenen Preisen. In diesem Fall wäre unsere exogene Information $W_t$

$$
W_{t+1} = p_{t+1}.
$$

Alternativ können wir annehmen, dass wir die Preisänderung $\phat_t = p_t - p_{t-1}$ beobachten, in welchem Fall wir schreiben würden

$$
W_{t+1} = \phat_{t+1}.
$$

### Übergangsfunktion

Die Entwicklung der Zustandsvariablen ist gegeben durch

$$
\begin{align}
R_{t+1} &= \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases} \label{eq:energytransition1}\\
p_{t+1} &= p_t + \phat_{t+1}. \label{eq:energytransition2}
\end{align}
$$

Diese Art der Modellierung des Preisprozesses durch "Beobachtung" der Preisänderung hilft uns beim Schreiben der Übergangsfunktion. In der Praxis würden wir typischerweise $p_{t+1}$ direkt beobachten (statt der Änderung), in welchem Fall keine explizite Übergangsgleichung erforderlich ist. Diese beiden Gleichungen bilden unsere Übergangsfunktion $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.

Später wird es sich als nützlich erweisen, den Post-Entscheidungs-Zustand $S^x_t$ zu modellieren, der der Zustand direkt nach unserer Entscheidung $x_t$ ist, aber bevor neue Information eintrifft. Der Post-Entscheidungs-Ressourcenzustand ist

$$
R^x_t = \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases}
$$

Da sich die Speichervariable deterministisch entwickelt, ist der Übergang zum nächsten Prä-Entscheidungs-Zustand einfach

$$
R_{t+1} = R^x_t.
$$

Der Preis $p_t$ hingegen wird durch die Entscheidung nicht beeinflusst, sodass der Post-Entscheidungs-Preis einfach

$$
p^x_t = p_t.
$$

wäre. Dies bedeutet, dass der Post-Entscheidungs-Zustand

$$
S^x_t = (R^x_t, p_t).
$$

ist.

### Zielfunktion

In jeder Periode ist der Geldbetrag, den wir verdienen oder verlieren, gegeben durch

$$
C(S_t,x_t) = -p_t x_t.
$$

Unsere Zielfunktion ist dann das kanonische Problem, das gegeben ist durch

$$
\max_\pi \E \sum_{t=0}^T -p_t X^\pi(S_t),
$$

wobei $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ durch die Gleichungen $\eqref{eq:energytransition1}$ und $\eqref{eq:energytransition2}$ gegeben ist. Wir müssen dann auch den Anfangszustand $S_0$ (das heißt $R_0$ und $p_0$) festlegen und eine Methode zur Erzeugung von $W_1, W_2, \ldots$ haben, die wir als Nächstes beschreiben.

## Modellierung von Unsicherheit

In unserem Vermögenswert-Verkaufsproblem in [Kapitel 2](/sdam/de/chapter-2/) haben wir angenommen, dass wir Preise gemäß

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

modellieren können, wobei wir dann angenommen haben, dass $\varepsilon_{t+1}$ normalverteilt ist mit Mittelwert 0 und einer bekannten Varianz. Abbildung 8.3 zeigt Netzpreise, bekannt als "lokale Grenzpreise" (oder LMPs in der Terminologie der Energiewirtschaft), über ein Jahr, was die enorme Volatilität veranschaulicht, die Preise im Netz aufweisen. Diese Volatilität entsteht, weil es Lastspitzen (oder Leistungsverluste) gibt, die kurzfristige Engpässe verursachen können. Da die Nachfrage unelastisch ist (das Netz soll 100 Prozent der Last decken), können Preise für kurze Zeiträume um das 20- bis 50-fache springen (Preise werden in 5-Minuten-Schritten aktualisiert).

<figure class="book-figure">
  <img src="/assets/images/sdam/pjmlmp.png" alt="Lokale Grenzpreise für das PJM-Netz (in 5-Minuten-Intervallen) für 2010." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 8.3.</span> Lokale Grenzpreise für das PJM-Netz (in 5-Minuten-Intervallen) für 2010.</figcaption>
</figure>

Es gibt mehrere Methoden zur Modellierung von Strompreisen. Im Folgenden werden wir vier beschreiben, die für dieses Problem verwendet wurden.

### Zeitreihenmodelle

Die Zeitreihenliteratur ist recht umfangreich, daher werden wir nur ein Grundmodell veranschaulichen, das den Preis $p_{t+1}$ als Funktion der jüngsten Preishistorie darstellt. Zur Veranschaulichung werden wir die letzten drei Zeitperioden verwenden, was bedeutet, dass wir unser Modell schreiben würden als

$$
\begin{align}
p_{t+1} &= \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}, \label{eq:energytimeseriesmodel}\\
        &= \thetabar^T_t \phi_t + \varepsilon_{t+1}, \nonumber
\end{align}
$$

wobei

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \\ p_{t-2} \end{pmatrix}
$$

unser Vektor von Preisen ist. Wir nehmen an, dass das Rauschen $\varepsilon \sim N(0,\sigma^2\_\epsilon)$ für ein gegebenes $\sigma^2\_\epsilon$ ist.

Der Koeffizientenvektor $\thetabar_t = (\thetabar_{t0},\thetabar_{t1},\thetabar_{t2})^T$ kann rekursiv geschätzt werden. Angenommen, wir beginnen mit einer Anfangsschätzung $\thetabar_0$ des Koeffizientenvektors. Wir benötigen außerdem eine Drei-mal-drei-Matrix $M_0$, die wir vorerst als skalierte Einheitsmatrix annehmen können (eine bessere Vorstellung liefern wir unten).

Die grundlegende Aktualisierungsgleichung für $\thetabar_t$ ist gegeben durch

$$
\thetabar_{t+1} = \thetabar_t - H_t\phi_t \varepsilon_{t+1},
$$

Der Fehler $\hat{\varepsilon}\_t$ wird berechnet mit

$$
\varepsilon_{t+1} = \thetabar^T_{t}\phi_t - p_{t+1}.
$$

Die Drei-mal-drei-Matrix $H_t$ wird berechnet mit

$$
H_t=\frac{1}{\gamma_t}M_t,
$$

wobei die Matrix $M_t$ rekursiv berechnet wird mit

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}).
$$

Die Variable $\gamma_t$ ist ein Skalar, der berechnet wird mit

$$
\gamma_t = 1 + (\phi_t)^TM_{t-1}\phi_t.
$$

Diese Gleichungen benötigen Anfangsschätzungen für $\thetabar_0$ und $M_0$. Eine Möglichkeit hierfür besteht darin, zunächst einige Anfangsdaten zu sammeln und dann ein statisches Schätzproblem zu lösen. Angenommen, wir beobachten $K$ Preise. Sei $Y_0$ ein $K$-elementiger Spaltenvektor der beobachteten Preise $p_3, p_4, \ldots, p_{K+3-1}$ (wir müssen beim dritten Preis beginnen, da unser Modell die letzten drei Preise benötigt).

Dann sei $X_0$ eine Matrix mit $K$ Zeilen, wobei jede Zeile aus $p_k, p_{k-1}, p_{k-2}$ besteht. Unsere beste Schätzung von $\thetabar$ ist gegeben durch die Normalgleichungen

$$
\thetabar_0 = [(X_0)^T X_0]^{-1} (X_0)^T Y_0.
$$

Schließlich sei $M_0 = [(X_0)^T X_0]^{-1}$, was zeigt, dass die Matrix $M_t$ die zum Zeitpunkt $t$ ermittelte Schätzung von $[(X_t)^T X_t]^{-1}$ ist.

Es gibt ganze Familien von Zeitreihenmodellen, die die Beziehung von Variablen über die Zeit erfassen. Würden wir diese Methoden direkt auf Preisdaten anwenden, wären die Ergebnisse eher schlecht. Erstens sind die Preise nicht normalverteilt. Zweitens: Obwohl Preise negativ werden können, ist dies eher selten. Eine direkte Anwendung dieses Modells würde jedoch sehr wahrscheinlich negative Preise erzeugen, wenn die Varianz $\sigma^2\_\epsilon$ auf das hohe Rauschen dieser Art von Daten kalibriert wäre. Schließlich wäre auch das Verhalten der Preissprünge über die Zeit nicht realistisch.

### Sprungdiffusion

Ein wesentlicher Kritikpunkt am obigen linearen Modell ist, dass es die großen Ausschläge, die aus der Untersuchung von Strompreisen bekannt sind, nur schlecht erfasst. Eine einfache Idee zur Überwindung dieser Einschränkung besteht darin, ein sogenanntes *Sprungdiffusionsmodell* zu verwenden, bei dem wir der Gleichung $\eqref{eq:energytimeseriesmodel}$ einen weiteren Rauschterm hinzufügen, was uns

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1} + \mathbb{I}_t \varepsilon^J_{t+1}.
$$

liefert. Hier nimmt die Indikatorvariable $\mathbb{I}\_t = 1$ mit einer gewissen Wahrscheinlichkeit $p^{jump}$ den Wert an, und das Rauschen $\varepsilon^J_{t+1}$ ist normalverteilt mit Mittelwert $\mu^{jump}$ (der typischerweise deutlich größer als null ist) und Varianz $(\sigma^{jump})^2$, die recht groß ist.

Wir müssen die Sprungwahrscheinlichkeit $p^{jump}$ sowie den Mittelwert und die Varianz $(\mu^{jump}, (\sigma^{jump})^2)$ schätzen. Dies geschieht, indem wir mit einem Basismodell beginnen, bei dem $p^{jump} = 0$ gilt. Wir verwenden dieses Basismodell, um $\sigma^2\_\epsilon$ zu schätzen. Anschließend wählen wir eine gewisse Toleranz, etwa drei Standardabweichungen (das heißt $3 \sigma_\epsilon$), und alle Beobachtungen außerhalb dieses Bereichs sind auf eine andere Rauschquelle zurückzuführen. Sei $p^{jump}$ der Anteil der Zeitperioden, in denen diese Beobachtungen auftreten. Dann berechnen wir Mittelwert und Standardabweichung dieser Beobachtungen, um $(\mu^{jump}, (\sigma^{jump})^2)$ zu erhalten.

Hier hören wir nicht auf. Nachdem wir diese extremen Abweichungen aus den Daten entfernt haben, sollten wir unser lineares Modell ohne diese Beobachtungen erneut anpassen. Übliche Praxis ist es, diesen Prozess mehrmals zu wiederholen, bis sich diese Schätzungen nicht mehr ändern.

Sprungdiffusionsmodelle bilden die Ausläufer (Tails) besser ab, hängen aber weiterhin vom Tail-Verhalten der Normalverteilung ab. Eine bessere Anpassung lässt sich erreichen, wenn man erkennt, dass die Varianz des Rauschens von der Temperatur abhängt, insbesondere von extremen Temperaturen. Wir könnten Temperaturen in drei Bereiche einteilen: unter dem Gefrierpunkt, über 90 Grad Fahrenheit und dazwischen. Die Einführung der Temperaturabhängigkeit fügt zwar eine weitere Variable zur Menge der Zustandsvariablen hinzu, bringt jedoch auch einen zusätzlichen Grad an Komplexität mit sich (die Auswirkung hiervon hängt von der Klasse der Politik ab).

### Quantilverteilungen

Während es möglich sein mag, andere parametrische Verteilungen anzupassen, ist eine leistungsfähige Strategie, die kumulative Verteilung numerisch aus den Daten zu berechnen, wodurch eine sogenannte *Quantilverteilung* entsteht. Um dies zu berechnen, sortieren wir einfach die Preise vom kleinsten zum größten. Bezeichnen wir diese geordnete Folge mit $\ptilde_t$, wobei $\ptilde_{t-1} \leq \ptilde_t$. Sei $T = 105,210$, was der Anzahl der 5-Minuten-Zeitperioden in einem Jahr entspricht. Der Prozentsatz der Zeitperioden mit einem Preis kleiner als $\ptilde_t$ ist dann $t/T$. Wir können eine kumulative Verteilung erstellen mit

$$
F_P(\ptilde_t) = \frac{t}{T},
$$

was in Abbildung 8.4 dargestellt ist.

<figure class="book-figure">
  <img src="/assets/images/sdam/cdfprices.png" alt="Quantilverteilung der Preise." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 8.4.</span> Quantilverteilung der Preise.</figcaption>
</figure>

Wir können eine stetige Verteilung $F_P(p)$ für jedes $p$ erstellen, indem wir das größte $\ptilde_t < p$ finden und $F_P(p)$ gleich diesem Wert setzen, wodurch eine Treppenfunktion entsteht. Die Funktion $F_P(p)$ ist eine Form der *nichtparametrischen* Verteilung, da wir die Verteilung an keine bekannte parametrische Form anpassen. Die gute Nachricht ist, dass sie die Daten perfekt widerspiegelt, was bedeutet, dass wir die extremen Ausläufer, die bei Strompreisen auftreten, genau abbilden. Der Nachteil ist, dass wir einen guten Datensatz benötigen, um diese Verteilungen zu erstellen, und wir müssen den Datensatz aufbewahren, um die Verteilung zu berechnen, anstatt nur eine kleine Anzahl von Parametern zu speichern, wie wir es tun würden, wenn wir ein parametrisches Modell für die Verteilung anpassen würden.

Wir können aus dieser Verteilung samplen, indem wir eine Zufallsvariable $U$ erzeugen, die gleichmäßig zwischen 0 und 1 verteilt ist. Nehmen wir an, wir erzeugen $U= 0.70$. Dann möchten wir den Preis $p^{.70}$ finden, der $F_P(p^{.70}) = 0.70$ entspricht, wie in Abbildung 8.4 dargestellt. Mathematisch schreiben wir dies, indem wir die inverse Funktion $F^{-1}\_P(u)$ definieren, die den Preis $p$ zurückgibt, der $F_P(p) = u$ ergibt. Wir können wiederholt aus unserer Preisverteilung samplen, indem wir einfach die gleichmäßig verteilte Zufallsvariable $U$ samplen und anschließend einen Preis $p=F^{-1}\_P(U)$ beobachten.

### Hybride Zeitreihe mit transformierten Daten

Eine leistungsfähige Strategie besteht darin, die Verwendung empirischer Verteilungen mit klassischen Zeitreihenmethoden zu kombinieren. Wir beginnen damit, eine empirische Verteilung an die Preisdaten anzupassen, wodurch wir die kumulative Verteilung $F_P(p)$ erhalten. Sei nun $p_t$ ein Preis, und berechnen wir $u_t = F_P(p_t)$, wobei $0\leq u_t \leq 1$. Als Nächstes sei $\Phi(z)$ die kumulative Verteilung einer standardnormalverteilten Zufallsvariablen $Z \sim N(0,1)$, und sei $\Phi^{-1}(u)$ ihre Inverse. Als Nächstes sei $z_t = \Phi^{-1}(u_t)$. Der Prozess der Abbildung $p_t \rightarrow u_t \rightarrow z_t$ ist in Abbildung 8.5 dargestellt.

<figure class="book-figure">
  <img src="/assets/images/sdam/normaltoanything.png" alt="Transformation einer empirischen Verteilung in eine Normalverteilung (und zurück)." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 8.5.</span> Transformation einer empirischen Verteilung in eine Normalverteilung (und zurück).</figcaption>
</figure>

Wir können diese Methode verwenden, um die stark nicht-normalen Preise $p_t$ in die Folge $z_t$ von Werten zu transformieren, die normalverteilt sind mit Mittelwert 0 und Varianz 1, wobei wir auch Korrelationen erfassen können. Wir können dann jede Art von Zeitreihenmodellierung auf die Folge $z_t$ anwenden. Danach können alle aus diesem normalisierten Modell stammenden Schätzungen zurück in Preise transformiert werden, indem man den Pfad in Abbildung 8.5 in umgekehrter Richtung nachvollzieht: $u_t = \Phi(z_t)$, und dann $p_t = F^{-1}\_P(u_t)$.

Diese Strategie ist sehr wirksam beim Umgang mit Daten, die nicht normalverteilt sind, und funktioniert deutlich besser als das Sprungdiffusionsmodell, das in der Finanzwelt beliebt ist.

## Entwurf von Politiken

Wir werden die Lösung dieses Problems anhand zweier Politikklassen sowie einer Hybridvariante veranschaulichen:

- **Politiksuche** – Wir verwenden eine einfache parametrisierte Kaufe-niedrig-verkaufe-hoch-Politik. Diese gehört zur PFA-Klasse von Politiken (Policy Function Approximations).
- **Lookahead-Politik** – Wir verwenden die Bellman-Gleichung, um eine Wertfunktionsapproximation zu erzeugen, die die Auswirkung einer aktuellen Entscheidung auf die Zukunft approximiert. Diese gehört zur VFA-Klasse von Politiken (Politiken basierend auf Wertfunktionsapproximationen).
- **Hybride Politik** – Schließlich führen wir eine anpassbare Politikklasse ein, die mit einer auf Wertfunktionen basierenden Politik beginnt und dann zur Politiksuche übergeht, um die Politik weiter zu verfeinern. Diese beginnt als VFA-Politik, geht dann aber zu einer parametrischen Kostenfunktionsapproximation (CFA) über, wenn wir die Politiksuche verwenden, um die Parameter der ursprünglich als Wertfunktionsapproximation gestarteten Politik anzupassen.

Politiken, die auf der Bellman-Gleichung basieren, erfordern die Berechnung (oder Approximation) des Werts $V_{t+1}(S_{t+1})$, der sich daraus ergibt, dass man sich in einem Zustand $S_t$ befindet, eine Entscheidung $x_t$ trifft und anschließend zufällige exogene Information $W_{t+1}$ beobachtet. Wir haben diese Methoden erstmals im Kontext von Kürzeste-Wege-Problemen kennengelernt. Ein wesentlicher Unterschied ist nun, dass der Zustand $S_{t+1}$ bei gegebenem $S_t$ und $x_t$ zufällig ist (beim Kürzeste-Wege-Problem war nur die Kostengröße $\chat_t$ zufällig). Außerdem hat unsere Zustandsvariable jetzt zwei kontinuierliche Dimensionen statt nur den diskreten Knoten.

Wir beschreiben zunächst die Kaufe-niedrig-verkaufe-hoch-Politik und führen dann drei Methoden ein, die auf der Approximation der Bellman-Gleichung basieren:

- Klassische rückwärtsgerichtete dynamische Programmierung, die eine optimale Politik liefert.
- Rückwärtsgerichtete approximative dynamische Programmierung.
- Vorwärtsgerichtete approximative dynamische Programmierung.

Wir schließen mit der Beschreibung einer hybriden Politik ab, die Wertfunktionsapproximationen aus der Bellman-Gleichung mit einer Form der Politiksuche kombiniert.

### Kaufe-niedrig-verkaufe-hoch

Eine Kaufe-niedrig-verkaufe-hoch-Politik basiert auf dem einfachen Prinzip, die Batterie zu laden, wenn der Preis unter eine untere Grenze fällt, und zu verkaufen, wenn der Preis über eine obere Grenze steigt. Die Politik lässt sich schreiben als

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t \leq \theta^{buy}, \\ 0 & \text{if } \theta^{buy} < p_t < \theta^{sell}, \\ +1 & \text{if } p_t \geq \theta^{sell}. \end{cases}
$$

Nun müssen wir $\theta = (\theta^{buy}, \theta^{sell})$ abstimmen. Wir bewerten unsere Politik, indem wir einem Stichprobenpfad von Preisen $p_t(\omega)$ folgen (oder wir beobachten möglicherweise die Preisänderungen $\phat(\omega)$). Unter der Annahme, dass wir Stichprobenpfade aus einem mathematischen Modell erzeugen, können wir Stichprobenpfade $\omega^1, \ldots, \omega^N$ generieren. Wir können dann die Leistung der Politik über jeden Stichprobenpfad simulieren und einen Durchschnitt bilden mit

$$
\Fbar^{low-high} = \frac{1}{N} \sum_{n=1}^N C\big(S_t(\omega^n),X^{low-high}(S_t(\omega^n)\vert \theta)\big).
$$

Die Abstimmung von $\theta$ erfordert die Lösung des Problems

$$
\begin{align}
\max_\theta \Fbar^{low-high}(\theta\vert S_0). \label{eq:buylowpolicysearch}
\end{align}
$$

Da $\theta$ nur zwei Dimensionen hat, besteht eine Strategie darin, eine vollständige Gittersuche durchzuführen, indem man jede Dimension diskretisiert und dann über alle möglichen Werte der beiden Dimensionen sucht. Eine gängige Diskretisierung besteht darin, einen Bereich in Schritte von 5 Prozent zu unterteilen. Einschließlich der Grenzwerte bedeutet dies, dass wir 21 Werte je Parameter darstellen müssen, wodurch ein Gitter mit 441 Punkten entsteht, was für die meisten Probleme handhabbar ist (wenn auch nicht trivial).

Wir weisen darauf hin, dass eine Brute-Force-Gittersuche nur dann funktioniert, wenn wir genügend Simulationen $N$ durchführen, sodass die Varianz der Schätzung $\Fbar^\pi(\theta)$ relativ klein ist. Wir verfügen jedoch über Methoden, um die Suche nach $\theta$ auch bei verrauschten Schätzungen der Leistung der Politik durchzuführen, wie in [Kapitel 7](/sdam/de/chapter-7/) dargestellt.

Wir werden das durch $\eqref{eq:buylowpolicysearch}$ gegebene Optimierungsproblem wiederholt begegnen, da die einfachsten Politiken stets abstimmbare Parameter aufweisen. Das Problem $\eqref{eq:buylowpolicysearch}$ lässt sich mit ableitungsbasierten Methoden lösen, wenn wir Ableitungen von $\Fbar^{low-high}(\theta\vert S_0)$ nach $\theta$ berechnen (oder approximieren) können. Ist dies nicht möglich, müssen wir ableitungsfreie Methoden verwenden, was genau das Problem ist, dem wir in [Kapitel 2](/sdam/de/chapter-2/) begegnet sind.

### Rückwärtsgerichtete dynamische Programmierung

Die rückwärtsgerichtete dynamische Programmierung besteht darin, die Bellman-Gleichung direkt zu lösen

$$
\begin{align}
V_t(s_t) = \max_{x_t} \left(C_t(s,x_t)+  \E\{V_{t+1}(S_{t+1})\vert S_t,x_t\} \right), \label{eq:energystoragebellman}
\end{align}
$$

wobei $S_{t+1} = S^M(s_t,x_t,W_{t+1})$ gilt und der Erwartungswert über die Zufallsvariable $W_{t+1}$ gebildet wird. Nehmen wir an, $W_{t+1}$ ist diskret und nimmt Werte in $\Wcal = \lbrace w_1, w_2, \ldots, W_M\rbrace $ an, und stellen wir die Wahrscheinlichkeitsverteilung dar mit

$$
f^W(w\vert s_t,x_t) = Prob[W_{t+1} = w\vert s_t,x_t].
$$

Wir schreiben die Verteilung als abhängig vom Zustand $s_t$ und der Entscheidung $x_t$, dies hängt jedoch vom Problem ab. Wir könnten beispielsweise vernünftigerweise annehmen, dass die Änderung des Preises $p_{t+1}-p_t$ vom aktuellen Preis $p_t$ abhängt (sind die Preise sehr hoch, ist es wahrscheinlicher, dass sie fallen), was ein Grund wäre, auf $s_t$ zu bedingen. Wir könnten sogar die Abhängigkeit von $x_t$ benötigen, wenn der Kauf einer großen Menge Strom aus dem Netz die Preise nach oben treibt.

Wir können Gleichung $\eqref{eq:energystoragebellman}$ dann umschreiben als

$$
V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right).
$$

Eine unmittelbare Implementierung der rückwärtsgerichteten dynamischen Programmierung weist vier Schleifen auf:

1. Die Schleife, die rückwärts in der Zeit von $T$ bis zum Zeitpunkt $0$ läuft.
2. Die Schleife über alle möglichen Zustände $s_t\in\Scal$ (genauer gesagt handelt es sich um die Menge der möglichen Werte der Zustandsvariable $S_t$ zum Zeitpunkt $t$).
3. Die Schleife, die erforderlich wäre, um alle möglichen Entscheidungen $x_t$ zu durchsuchen, um das Maximierungsproblem zu lösen.
4. Die Schleife über alle möglichen Werte der Zufallsvariable $W$, die in der Summation erfasst wird, die zur Berechnung von $V_t(s)$ erforderlich ist.

<div class="book-algorithm">
<p><strong>Rückwärtsgerichtete dynamische Programmierung</strong></p>
<p><strong>Schritt 0. Initialisierung:</strong> Initialisiere den terminalen Beitrag $V_{T+1}(S_{T+1})=0$ für alle Zustände $S_{t+1}$.</p>
<p><strong>Schritt 1.</strong> Führe aus für $t=T, T-1, \ldots, 1, 0$:</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2.</strong> Berechne für alle $s\in\Scal$</p>
<p style="margin-left: 1.5rem;">$$V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right)$$</p>
</div>

Es ist hilfreich, den Wertebereich zu betrachten, den jede Schleife annehmen könnte. Bei einem Energieproblem könnten wir eine Speichereinrichtung in stündlichen Schritten über einen Tag optimieren, was uns 24 Zeitschritte liefert. Verwenden wir 5-Minuten-Zeitschritte (manche Netzbetreiber aktualisieren die Preise alle 5 Minuten), dann würde ein 24-Stunden-Horizont 288 Zeitperioden bedeuten (mal sieben, wenn wir über eine Woche planen wollen). Führen wir Frequenzregelung durch, müssen wir alle 2 Sekunden eine Entscheidung treffen, was 43.200 Zeitperioden über einen Tag ergibt.

Unsere Zustandsvariable besteht aus $S_t = (R_t,p_t)$, was bedeutet, dass wir die Schleife über alle Zustände durch verschachtelte Schleifen über alle Werte von $R_t$ und dann alle Werte von $p_t$ ersetzen müssen. Da beide kontinuierlich sind, muss jede diskretisiert werden. Die Ressourcenvariable $R_t$ müsste basierend darauf, wie viel wir in einem einzelnen Zeitschritt laden oder entladen könnten, in Schritte unterteilt werden. Anschließend müssen wir den Netzpreis $p_t$ diskretisieren. Netzpreise können bis auf -＄100 fallen und (in Extremfällen) bis auf ＄10.000 steigen. Eine sinnvolle Strategie könnte sein, eine empirische Verteilung zu konstruieren und dann Preise darzustellen, die zum Beispiel jedem Schritt von zwei Prozent der kumulativen Verteilung entsprechen, was uns 50 mögliche Preise liefert.

Die Anzahl der Lade-Entlade-Entscheidungen könnte so gering wie drei sein (laden, entladen oder nichts tun), oder deutlich größer, wenn wir mit unterschiedlichen Raten laden oder entladen können.

Schließlich wäre die Wahrscheinlichkeitsverteilung $f^W(w)$ die Verteilung der zufälligen Preisänderungen $\phat_{t+1}$. Auch hier empfehlen wir, eine empirische Verteilung der Änderungen von $\phat_{t+1}$ zu konstruieren und dann die kumulative Verteilung in Schritte von, sagen wir, zwei Prozent zu diskretisieren.

Wenn wir eine zweidimensionale Zustandsvariable haben (wie es bei unserem Grundmodell der Fall ist), haben wir bereits fünf Schleifen (Zeit, die beiden Zustandsvariablen, den Max-Operator über $x$ und dann die Summation über die Ergebnisse von $W$). Das kann teuer werden, und wir haben gerade erst angefangen. Stellen wir uns nun vor, wir verwenden das Zeitreihenmodell in Gleichung $\eqref{eq:energytimeseriesmodel}$, bei dem wir nun die Preise $(p_t, p_{t-1}, p_{t-2})$ verfolgen müssen. In diesem Fall wäre unsere Zustandsvariable

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

In diesem Fall hätten wir nun sieben verschachtelte Schleifen. Obwohl die Komplexität von der Diskretisierung der kontinuierlichen Variablen abhängt, könnte die Ausführung dieses rückwärtsgerichteten dynamischen Programmierungsalgorithmus leicht ein Jahr (oder mehr) erfordern.

Angesichts der Schwierigkeit, die Bellman-Gleichung zu verwenden, selbst für dieses relativ einfache Problem, ist es überraschend, dass genau dieser Ansatz noch immer in Kursen gelehrt wird. Angesichts der Komplexität gab es umfangreiche Forschung zu Methoden, die die Bellman-Gleichung approximieren, die unter Bezeichnungen wie *approximative dynamische Programmierung* und *bestärkendes Lernen* zusammengefasst wurden. Wir werden zwei Strategien zur Approximation der Bellman-Gleichung beschreiben, die als rückwärtsgerichtete ADP und vorwärtsgerichtete ADP bekannt sind.

### Rückwärtsgerichtete approximative dynamische Programmierung

Eine leistungsstarke algorithmische Strategie ist als "rückwärtsgerichtete approximative dynamische Programmierung" bekannt. Dieser Ansatz verläuft genau wie oben beschrieben, mit einem Unterschied. Anstatt über alle Zustände zu iterieren, wählen wir eine Zufallsstichprobe $\Shat$. Wir berechnen dann den Wert, im Zustand $s\in\Shat$ zu sein, genau wie ursprünglich, und berechnen den entsprechenden Wert $\vhat$. Angenommen, wir wiederholen dies $N$ Mal und erhalten einen Datensatz $(\shat^n, \vhat^n), n=1, \ldots, N$. Diesen verwenden wir dann, um ein statistisches Modell anzupassen, etwa das lineare Modell gegeben durch:

$$
\begin{align}
\Vbar(s) = \theta_0 + \theta_1 \phi_1(s) + \theta_2 \phi_2(s) + \ldots + \theta_F \phi_F(s), \label{eq:energylinearvfa}
\end{align}
$$

wobei $\phi_f(s), f=1, \ldots, F$ eine Menge geeignet gewählter Merkmale ist. Beispiele für Merkmale könnten sein

$$
\begin{align*}
\phi_1(s) &= R_t, \\
\phi_2(s) &= R^2_t, \\
\phi_3(s) &= p_t, \\
\phi_4(s) &= p^2_t, \\
\phi_5(s) &= p_{t-1}, \\
\phi_6(s) &= p_{t-2}, \\
\phi_7(s) &= R_t p_t.
\end{align*}
$$

Beachten Sie, dass dieses Modell mit einem konstanten Term $\theta_0$ nur acht zu schätzende Koeffizienten hat. Die Stichprobenziehung von einigen hundert Zuständen sollte mehr als ausreichend sein, um eine gute statistische Näherung zu erhalten. Diese Methodik ist relativ unempfindlich gegenüber der Anzahl der Zustandsvariablen, und natürlich gibt es kein Problem, wenn einige der Variablen kontinuierlich sind.

Eine Herausforderung bei der Verwendung eines parametrischen Modells wie dem obigen linearen Modell besteht darin, dass wir die Merkmale $\phi_f(S_t)$ festlegen müssen. Mit der zunehmenden Beliebtheit neuronaler Netze begannen Forscher, diesen Ansatz zu verwenden, einschließlich tiefer neuronaler Netze, die möglicherweise die Schätzung von Millionen von Parametern erfordern. Der Vorteil dieses Ansatzes besteht darin, dass die Notwendigkeit entfällt, die Struktur des Modells festzulegen, aber der Preis dafür ist, dass man deutlich mehr Beobachtungen benötigt. Tiefe neuronale Netze bieten die attraktive Eigenschaft, jede Funktion approximieren zu können, aber das bedeutet auch, dass sie Rauschen modellieren können. Neuronale Netze haben zudem Schwierigkeiten, bekannte Problemstrukturen wie Monotonie (je größer der Bestand, desto größer der Wert) oder Konvexität nachzubilden.

Wir haben festgestellt, dass rückwärtsgerichtete ADP bei einer kleinen Gruppe von Problemen außergewöhnlich gut funktioniert (siehe *Reinforcement Learning and Stochastic Optimization*, Abschnitt 15.4, für eine Zusammenfassung von Vergleichen der rückwärtsgerichteten ADP mit Benchmarks), aber es gibt keine Garantien, und ihre Leistung hängt eindeutig davon ab, eine effektive Menge von Merkmalen auszuwählen. In einer Anwendung haben wir eine Laufzeit von 30 Tagen für einen Standard-Rückwärts-MDP-Algorithmus auf 20 Minuten reduziert, mit einer Lösung, die innerhalb von 5 Prozent des Optimums lag (erzeugt durch den einmonatigen Lauf). Aber auch hier gibt es keine Garantien für diese Leistung.

### Vorwärtsgerichtete approximative dynamische Programmierung

Vorwärtsgerichtete approximative dynamische Programmierung funktioniert auf intuitive Weise. Stellen wir uns vor, wir beginnen mit einer Wertfunktionsapproximation $\Vbar^{x,n-1}\_t(S^x_t)$ um den Nach-Entscheidungs-Zustand $S^x_t$, die wir aus den ersten $n-1$ Iterationen unseres Algorithmus berechnet haben. Wir haben die Idee von Nach-Entscheidungs-Zuständen erstmals in [Kapitel 1](/sdam/de/chapter-1/) eingeführt, aber dies ist der Zustand unmittelbar nachdem wir eine Entscheidung getroffen haben, aber bevor neue Information eingetroffen ist.

Stellen wir uns nun vor, wir befinden uns in einem bestimmten Zustand $S^n_t$ während der $n$-ten Iteration unseres Algorithmus, wobei wir einem Stichprobenpfad $\omega^n$ folgen, der die Stichprobenziehung leitet, während wir uns in der Zeit vorwärts bewegen. Angenommen, wir haben eine Funktion $S^{x,n}\_t = S^{M,x}(S^n_t,x)$, die uns zum Nach-Entscheidungs-Zustand führt. Für unser Energieproblem, bei dem $S^n_t = (R^n_t,p^n_t)$, wäre der Nach-Entscheidungs-Zustand

$$
S^{x,n} = (R^n_t+x^n_t, p^n_t).
$$

Wir treffen dann eine Entscheidung unter Verwendung von

$$
x^n_t = \argmax_x \big(C(S^n_t,x) + \Vbar^{x,n-1}_t(S^{x,n}) \big).
$$

Gegeben $S^n_t$ und unsere Entscheidung $x^n_t$, ziehen wir dann $W_{t+1}(\omega^n)$, was der Änderung der Preise $\phat^n_{t+1}$ entspricht. Wir simulieren uns dann weiter zum nächsten Zustand

$$
S^n_{t+1} = (R^n_t+x^n_t, p^n_t + \phat^n_{t+1}(\omega)).
$$

Somit simulieren wir uns lediglich in der Zeit vorwärts, was bedeutet, dass es uns nicht kümmert, wie komplex die Zustandsvariable ist. Es gibt verschiedene Strategien, um die Wertfunktionsapproximation $\Vbar^{n-1}\_t$ anschließend zu aktualisieren:

<div class="book-algorithm">
<p><strong>Vorwärtsgerichtete approximative dynamische Programmierung</strong></p>
<p><strong>Schritt 0. Initialisierung:</strong> Initialisiere $V^{\pi,0}_t,~t\in\Tcal$. Setze $n = 1$. Initialisiere $S^1_0$.</p>
<p><strong>Schritt 1.</strong> Führe aus für $n = 1, 2, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 2.</strong> Führe aus für $m = 1, 2, \ldots, M$:</p>
<p style="margin-left: 3rem;"><strong>Schritt 3.</strong> Wähle einen Stichprobenpfad $\omega^m$.</p>
<p style="margin-left: 3rem;"><strong>Schritt 4.</strong> Initialisiere $\vhat^m = 0$.</p>
<p style="margin-left: 3rem;"><strong>Schritt 5.</strong> Führe aus für $t = 0, 1, \ldots, T$:</p>
<p style="margin-left: 4.5rem;"><strong>Schritt 5a.</strong> Löse:</p>
<p style="margin-left: 4.5rem;">$$x^{n,m}_t = \argmax_{x_t\in\Xcal^{n,m}_t} \big(C_t(S^{n,m}_t,x_t) + V^{\pi,n-1}_t(S^{M,x}(S^{n,m}_t,x_t))\big)$$</p>
<p style="margin-left: 4.5rem;"><strong>Schritt 5b.</strong> Berechne:</p>
<p style="margin-left: 4.5rem;">$$S^{x,n,m}_t = S^{M,x}(S^{n,m}_t,x^{n,m}_t), \qquad S^{n,m}_{t+1} = S^M(S^{x,n,m}_t,x^{n,m},W_{t+1}(\omega^m)).$$</p>
<p style="margin-left: 3rem;"><strong>Schritt 6.</strong> Führe aus für $t = T-1,\ldots, 0$:</p>
<p style="margin-left: 4.5rem;"><strong>Schritt 6a.</strong> Akkumuliere die Pfadkosten (mit $\vhat^m_{T} = 0$):</p>
<p style="margin-left: 4.5rem;">$$\vhat^m_t = C_t(S^{n,m}_t,x^m_t) + \vhat^m_{t+1}$$</p>
<p style="margin-left: 4.5rem;"><strong>Schritt 6b.</strong> Aktualisiere den approximativen Wert der Politik beginnend zum Zeitpunkt $t$:</p>
<p style="margin-left: 4.5rem;">$$\Vbar^{n,m}_{t-1} \leftarrow U^V(\Vbar^{n,m-1}_{t-1}, S^{x,n,m}_{t-1}, \vhat^m_t)$$</p>
<p style="margin-left: 4.5rem;">wobei wir typischerweise $\step_{m-1} = 1/m$ verwenden.</p>
<p style="margin-left: 1.5rem;"><strong>Schritt 7.</strong> Aktualisiere die Politik-Wertfunktion $V^{\pi,n}_t(S^x_t) = \Vbar^{n,M}_t(S^x_t)$ für alle $t = 0, 1, \ldots, T$.</p>
<p><strong>Schritt 8.</strong> Gib die Wertfunktionen $(V^{\pi,N}_t)_{t=1}^T$ zurück.</p>
</div>

Dies überlässt die eigentliche Aktualisierung einer Aktualisierungsfunktion $U^V(\cdot)$, da dies davon abhängt, wie wir die Wertfunktion approximieren.

Vorwärtsgerichtete approximative dynamische Programmierung ist attraktiv, weil sie auf hochdimensionale Probleme skaliert. Zu keinem Zeitpunkt iterieren wir über alle möglichen Zustände oder Ergebnisse. Tatsächlich können wir sogar hochdimensionale Entscheidungen $x$ handhaben, wenn wir die Wertfunktion angemessen approximieren, sodass wir leistungsstarke Algorithmen nutzen können. Allerdings besitzen sowohl vorwärtsgerichtete ADP als auch rückwärtsgerichtete ADP kaum Leistungsgarantien.

### Eine hybride Politiksuche-VFA-Politik

Wie auch immer wir uns entscheiden, die Wertfunktion zu approximieren, unsere Politik ist gegeben durch

$$
X^{VFA}(S_t) = \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t)\big).
$$

Wir simulieren die Politik vorwärts, wobei wir $\omega^n$ einen Stichprobenpfad der exogenen Information darstellen lassen (das heißt, die Menge der Preisänderungen). Es ist häufig der Fall, dass wir unsere Politik an historischen Daten testen, in welchem Fall es nur einen einzigen Stichprobenpfad gibt. Haben wir jedoch ein mathematisches Modell der unsicheren Preise entwickelt, können wir einen Stichprobenpfad $\omega$ erzeugen, den wir verwenden, um den Wert einer Politik zu approximieren (wir könnten auch mehrere Stichprobenpfade erzeugen und einen Durchschnitt bilden):

$$
\Fbar^{VFA}(\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega))\big).
$$

Das bedeutet, dass die Methode gut geeignet ist, um sogar hochdimensionale Probleme zu approximieren, die in der Logistik auftreten könnten.

Wenn wir eine Wertfunktionsapproximation aufbauen (die zur Klasse der Lookahead-Politiken gehört), haben wir typischerweise keinen Schritt mehr, in dem wir die Politik abstimmen. Das bedeutet jedoch nicht, dass wir es nicht versuchen können. Angenommen, unsere Wertfunktion ist durch das lineare Modell in Gleichung $\eqref{eq:energylinearvfa}$ gegeben. Wir können nun unsere Politik schreiben unter Verwendung von

$$
X^{VFA}(S_t\vert \theta) = \argmax_x \left(C(S_t,x) + \sum_{f=1}^F \theta_f \phi_f(S_t)\right).
$$

Es ist sinnvoll, einen unserer rückwärts- oder vorwärtsgerichteten ADP-Algorithmen zu verwenden, um eine erste Schätzung von $\theta$ zu erhalten, aber wie wir oben festgestellt haben, gibt es keine Garantie, dass die resultierende Politik von hoher Qualität ist. Wir können sie jedoch immer verbessern, indem wir dies als Ausgangspunkt verwenden,

$$
\Fhat^{VFA}(\theta,\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega)\vert \theta)\big).
$$

Nun müssen wir lediglich das Politiksuchproblem lösen, das wir formulieren könnten als

$$
\begin{align}
\max_\theta \Fbar^{VFA}(\theta,\omega\vert S_0).  \label{eq:optthetavfa}
\end{align}
$$

In unseren früheren Beispielen zur Politiksuche war $\theta$ ein Skalar, was dieses Problem relativ einfach macht. Nun ist $\theta$ ein Vektor, der möglicherweise Dutzende von Dimensionen aufweisen könnte. Wir werden später auf dieses Problem zurückkommen.

### Einige mahnende Anmerkungen zu ADP

Wir haben diese Problemstellung genutzt, um eine relativ eingehende Tour durch Methoden zu bieten, die auf der Idee basieren, den Wert des Sich-Befindens in einem Zustand zu approximieren. Dies wurde unter Begriffen wie "approximative dynamische Programmierung" oder "bestärkendes Lernen" untersucht. Diese Methoden haben in den akademischen Forschungsgemeinschaften erhebliche Aufmerksamkeit erregt, aber in der Praxis sind die Methoden nicht einfach anzuwenden. Sequentielle Entscheidungsprobleme sind allgegenwärtig, aber erfolgreiche Anwendungen in der Praxis sind relativ selten.

Nachschlagetabellen-Approximationen, bei denen wir den Wert für jeden diskreten (oder diskretisierten) Zustand schätzen, skalieren nicht, wenn die Zustandsvariable mehr als drei Dimensionen hat. Die Verwendung von Approximationsstrategien wie unserer linearen Approximation funktioniert typischerweise nicht, da diese Approximationen global genau sein müssen, da wir jeden beliebigen Zustand besuchen könnten. Gleichzeitig können lokale Approximationen (die Formen nichtparametrischer Modelle sind) Schwierigkeiten haben, weil die Flexibilität lokaler Approximationen Instabilität mit sich bringt.

Erschwerend kommt hinzu, dass wir uns auf unsere approximative Wertfunktion verlassen, um Entscheidungen zu treffen, was einen Teufelskreis erzeugt. Unsere anfänglichen Approximationen sind nicht sehr gut und führen dadurch zu schlechten Entscheidungen. Diese schlechten Entscheidungen werden dann verwendet, um die Wertfunktionsapproximation zu aktualisieren, und von dort aus lässt sich die Abwärtsspirale erkennen.

Die Idee, eine Wertfunktionsapproximation zu justieren, wie wir es in Gleichung $\eqref{eq:optthetavfa}$ getan haben, ist vielversprechend, weil sie die Leistung der Politik direkt optimiert. Seltsamerweise wird diese Idee nicht weit verbreitet genutzt. Wir merken nur an, dass die Justierung von $\theta$ mithilfe dieser Simulationen nicht einfach ist. Daher raten wir jedem Leser, der diese Ansätze ausprobieren möchte, zur Vorsicht.

## Was haben wir gelernt?

- Wir greifen ein einfaches Bestandsproblem aus [Kapitel 1](/sdam/de/chapter-1/) erneut auf, diesmal jedoch im Kontext der Energiespeicherung, mit sowohl physischen als auch informationellen Variablen.
- Wir beschreiben eine Vielzahl stochastischer Modelle für Strompreise, um die Vielfalt der Unsicherheitsmodellierung zu veranschaulichen.
- Wir beschreiben eine Reihe von Politiken: eine PFA (Buy-Low, Sell-High), eine VFA-Politik (basierend auf rückwärtsgerichteter approximativer dynamischer Programmierung) sowie vorwärtsgerichtete approximative dynamische Programmierung.
- Schließlich führen wir die Idee ein, mithilfe der Techniken der approximativen dynamischen Programmierung ein lineares Modell für eine Wertfunktionsapproximation zu schätzen und anschließend eine direkte Politiksuche über die Koeffizienten des linearen Modells durchzuführen. Es handelt sich also zunächst um eine VFA-basierte Politik, die sich dann in eine Form der CFA-Politik mit einer parametrisierten Zielfunktion verwandelt.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was spricht angesichts der ausgeprägten Fat-Tail-Natur von Strompreisen gegen die Verwendung eines Zeitreihenmodells?</li>
<li>Skizzieren Sie kurz, wie wir die Preise, die innerhalb normaler Schwankungen liegen (drei Standardabweichungen), von den extremeren Beobachtungen trennen.</li>
<li>Die Verwendung historischer Daten zur Anpassung einer empirischen Verteilung sollte uns eine Wahrscheinlichkeitsverteilung liefern, die mit der Historie übereinstimmt. Welche anderen Fehler könnten dennoch im stochastischen Preismodell vorhanden sein?</li>
<li>Beschreiben Sie in Worten, was die Transformation der Daten im Abschnitt über das hybride Zeitreihenmodell bewirkt.</li>
<li>Die klassische rückwärtsgerichtete dynamische Programmierung stößt schnell an den Fluch der Dimensionalität. Beschreiben Sie in Worten, wie die rückwärtsgerichtete approximative dynamische Programmierung den Fluch der Dimensionalität überwindet. Beschreiben Sie beispielsweise, wie sich die rückwärtsgerichtete ADP verkompliziert, wenn wir die Anzahl der Dimensionen der Zustandsvariable verdoppeln würden.</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Schreiben Sie die fünf Elemente des Grundmodells für das Energiespeicherproblem auf, wie sie im Text angegeben sind. Schreiben Sie die Zielfunktion unter der Annahme, dass die Politik die Buy-Low, Sell-High-Politik ist

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t < \theta^{buy}, \\ 0 & \text{if } \theta^{buy} \leq p_t \leq \theta^{sell}, \\ +1 & \text{if } p_t > \theta^{sell}. \end{cases}
$$

Schreiben Sie die Zielfunktion so, dass über die Parameter der Politik gesucht wird. Schreiben Sie außerdem den Erwartungswert in der Zielfunktion in der geschachtelten Form, die jede Zufallsvariable widerspiegelt.</li>
<li>Im Abschnitt zur Modellierung von Unsicherheit führen wir ein Zeitreihenmodell für Preise ein, gegeben durch

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}.
$$

Das Buch beschreibt die Aktualisierungsgleichungen für den Koeffizientenvektor $\thetabar_t = (\thetabar_{t0},\thetabar_{t1}, \thetabar_{t2})$. Denken Sie daran, dass der Zustand $S_t$ *alle* Informationen enthält, die zur Modellierung des Systems ab Zeitpunkt $t$ benötigt werden, und geben Sie die aktualisierte Zustandsvariable und Übergangsfunktion an, um diesen Preisprozess zu handhaben.</li>
</ol>

**Programmieraufgaben**

Diese Übungen verwenden das Python-Modul *EnergyStorage_I* auf [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Führen Sie mithilfe des Python-Moduls eine Gittersuche für den Parametervektor $\theta = (\theta^{buy}, \theta^{sell})$ durch, indem Sie $\theta^{sell}$ im Bereich von 1,0 bis 100,0 in Schritten von 1 $ für Preise variieren und $\theta^{buy}$ im Bereich von 1,0 bis $\theta^{sell}$, ebenfalls in Schritten von 1 $. Die Preise entsprechen tatsächlichen historischen stündlichen Preisen für einen Zeitraum von 8 Tagen.</li>
<li>Lösen Sie eine optimale Politik mithilfe der oben beschriebenen rückwärtsgerichteten dynamischen Programmierungsstrategie (der Algorithmus wurde bereits im Python-Modul implementiert). Nehmen Sie an, dass sich der Preisprozess gemäß

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

entwickelt, wobei $\varepsilon_{t+1}$ einer empirischen Verteilung folgt, die auf den Preisdifferenzen der tatsächlichen historischen Preise basiert.
  <ol type="a">
    <li>Führen Sie den Algorithmus aus, wobei die Preise in Schritten von 1 $, dann 0,50 $ und schließlich 0,25 $ diskretisiert werden. Berechnen Sie die Größe des Zustandsraums für jede der drei Diskretisierungsstufen und tragen Sie die Laufzeiten gegen die Größe des Zustandsraums auf.</li>
    <li>Verwenden Sie die optimale Wertfunktion für die Diskretisierung von 1 $ und vergleichen Sie die Leistung mit der besten Buy-Sell-Politik, die Sie in Teil (a) gefunden haben.</li>
  </ol>
</li>
<li>Laden Sie die Tabellenkalkulation „Chapter8_electricity_prices“ von [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements/) herunter. Verwenden Sie die Daten im Tab „electricity prices“ für die folgenden Fragen:
  <ol type="a">
    <li>Erstellen Sie eine empirische kumulative Verteilung $F_P(p) = Prob[P \leq p]$, wobei $P$ ein zufällig gewählter Preis für eine bestimmte Stunde über den einwöchigen Zeitraum im Datensatz ist.</li>
    <li>Sei $F^{-1}_P(u)$ die inverse kumulative Verteilung, wobei $u$ zwischen 0 und 1 liegt. Finden Sie den Preis $p(u) = F^{-1}_P(u)$, der $u = 0, 0.1, 0.2, \ldots, 0.9, 1.0$ entspricht. Geben Sie jedem dieser Preise eine Wahrscheinlichkeit von 1/11, finden Sie die kumulative Verteilung und vergleichen Sie sie mit der kumulativen Verteilung, die Sie in Teil (a) erstellt haben. Scheinen diese übereinzustimmen?</li>
  </ol>
</li>
<li>Passen Sie mithilfe der Tabellenkalkulation „Chapter8_electricity_prices“ ein Mean-Reversion-Modell der Form

$$
\begin{align}
p_{t+1} = p_t + \beta (\mubar_t - p_t) + \varepsilon_{t+1} \label{eq:priceexercise}
\end{align}
$$

an, wobei

$$
\mubar_t = (1-\alpha)\mubar_{t-1} + \alpha p_t.
$$

Nehmen Sie $\alpha = 0.15$ an. Finden Sie $\beta$, das

$$
G(\beta) = \sum_{t=0}^T \big(p_{t+1} - (p_t + \beta (\mubar^t-p_t))\big)^2.
$$

minimiert.

  <ol type="a">
    <li>Passen Sie das Mean-Reversion-Modell durch eine einfache eindimensionale Suche an (versuchen Sie z. B. Werte zwischen 0 und 1 in Schritten von 0,1).</li>
    <li>Berechnen Sie die Standardabweichung $\sigma$ von $\varepsilon$ aus Ihrer Stichprobe (wir nehmen an, dass der Mittelwert 0 ist). Beachten Sie, dass wir von einer einzigen, konstanten Standardabweichung ausgehen, obwohl wir zulassen, dass sich der Mittelwert $\mubar_t$ im Zeitverlauf ändert.</li>
    <li>Erzeugen Sie mithilfe des in (a) gefundenen Werts von $\beta$ 10 Stichprobenpfade unter Verwendung von Gleichung $\eqref{eq:priceexercise}$, indem Sie $\varepsilon_{t+1}$ aus einer Normalverteilung mit Mittelwert 0 und Standardabweichung $\sigma$ ziehen. Tragen Sie die Stichprobenpfade in einem Diagramm auf und vergleichen Sie das Verhalten Ihrer Stichprobenpfade mit den historischen Preisen. Erscheinen sie ähnlich?</li>
  </ol>
</li>
<li>Nun werden Sie ein Jump-Diffusion-Modell anpassen, das gegeben ist durch

$$
p_{t+1} = p_t + \beta(\mubar_t - p_t) + \varepsilon_{t+1} + J_{t+1} \varepsilon_{t+1},
$$

wobei $J_{t+1} = 1$ mit einer bestimmten Sprungwahrscheinlichkeit (die wir unten berechnen) und ansonsten 0 gilt, und $\varepsilon^J_{t+1}$ die zufällige Größe des Sprungs ist, wenn er auftritt.

Folgen Sie den untenstehenden Schritten, um das Jump-Diffusion-Modell anzupassen und die Ergebnisse mit der Historie zu vergleichen.
  <ol type="a">
    <li>Verwenden Sie den Wert von $\beta$ aus Übung 11, durchlaufen Sie die Daten und identifizieren Sie alle Datenpunkte, die außerhalb des Bereichs $[\mubar_t \pm 3 \sigma]$ liegen.</li>
    <li>Führen Sie mit demselben Wert von $\beta$, den Sie in Übung 11 gefunden haben, die Mean-Reversion-Anpassung ein zweites Mal über die Daten durch, wobei diesmal nur die Datenpunkte einbezogen werden, die in Teil (a) nicht ausgeschlossen wurden. Bestimmen Sie den neuen Mittelwert und die neue Standardabweichung von $\sigma$ für die nicht ausgeschlossenen Daten.</li>
    <li>Wiederholen Sie (b) noch einmal für die beibehaltenen Datenpunkte, wobei Sie erneut Datenpunkte außerhalb des $\pm 3 \sigma$-Bereichs ausschließen.</li>
    <li>Berechnen Sie die Sprungwahrscheinlichkeit als den Anteil der Punkte, die bis zum Abschluss von Teil (c) ausgeschlossen wurden (Sie haben nun den Prozess des Ausschließens von Datenpunkten zweimal durchgeführt). Berechnen Sie außerdem den Mittelwert und die Standardabweichung der ausgeschlossenen Punkte.</li>
    <li>Führen Sie nun 10 Simulationen Ihres Jump-Diffusion-Modells durch, wobei Sie den endgültigen Mittelwert und die Varianz für die beibehaltenen und ausgeschlossenen Punkte verwenden und Sprünge anhand der Jump-Diffusion-Wahrscheinlichkeit ziehen. Vergleichen Sie diese Simulationen mit der Historie und diskutieren Sie, ob die resultierenden Preispfade realistischer sind als die, die Sie in Übung 11 gefunden haben, und vergleichen Sie die Preispfade mit der tatsächlichen Historie.</li>
  </ol>
</li>
<li>Wir werden erneut versuchen, eine gute Anpassung der Preise zu erhalten, indem wir Teile der Übungen 11 und 12 mit transformierten Preisen wiederholen.
  <ol type="a">
    <li>Wandeln Sie mithilfe der kumulativen Verteilung aus Übung 10 jeden der Preise mit der Identität $U_t = F_P(p_t)$ in eine gleichverteilte Zufallsvariable um.</li>
    <li>Wandeln Sie als Nächstes Ihre gleichverteilten Zufallsvariablen $U_t$ mithilfe von $Z_t = \Phi^{-1}(U_t)$ in normalverteilte Zufallsvariablen mit Mittelwert 0 und Varianz 1 um, wobei $\Phi(z)$ die kumulative Verteilung der Standardnormalverteilung und $\Phi^{-1}(U_t)$ die Umkehrung dieser Verteilung ist. Dies wird durch die Funktion norm.s.inv(p) in Excel erfasst, die den $Z$-Wert zurückgibt, der einer Wahrscheinlichkeit $p$ (die durch die Variable $U_t$ gegeben ist) entspricht.</li>
    <li>Wir müssen nun $\beta$ in der Mean-Reversion-Gleichung aus Übung 11 neu anpassen. Diesmal verwenden wir anstelle des Preises $p_t$ die normalisierte Größe $Z_t$; ansonsten bleibt alles gleich (Sie können also einfach dem Verfahren folgen, das Sie bei der Anpassung von $\beta$ für die Rohpreise verwendet haben).</li>
    <li>Verwenden Sie nun Ihr Modell aus (c) (mit dem neuen Wert für $\beta$), um einen Stichprobenpfad von $Z_t$-Werten zu erzeugen. Verwenden Sie dann $U_t = \text{norm.s.dist}(Z_t,1)$, um die Wahrscheinlichkeit zu erhalten, dass $Z_t \leq z$ (das gleichverteilt zwischen 0 und 1 ist). Bilden Sie schließlich den $U_t$-Wert mithilfe der in Übung 11 gefundenen kumulativen Verteilung wieder auf einen Preis ab. Zeichnen Sie einen Stichprobenpfad (dies ist nicht allzu schwer, wenn Sie mit Excel vertraut sind — ansonsten ist der mühsame Teil dieser letzte Schritt).</li>
    <li>Vergleichen Sie das Verhalten des resultierenden Stichprobenpfads mit der historischen Verteilung. Beachten Sie, dass die Preisverteilung perfekt sein sollte, die Preisreihe jedoch möglicherweise dennoch keine gute Anpassung zu sein scheint. Welche Fehler könnten wir immer noch machen?</li>
  </ol>
</li>
</ol>
{% endraw %}
