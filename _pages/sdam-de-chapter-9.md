---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "Kapitel 9: Energiespeicherung II"
permalink: /sdam/de/chapter-9/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: f45bf159515d3588
---


{% raw %}
<figure class="book-figure">
  <img src="/assets/images/sdam/renewablegridstorageload.jpg" alt="Energiesystem zur Versorgung einer Last (Gebäude) aus einem Windpark, dem Stromnetz und einem Batteriespeicher." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 9.1.</span> Energiesystem zur Versorgung einer Last (Gebäude) aus einem Windpark (mit variablen Windgeschwindigkeiten), dem Stromnetz (mit variablen Preisen) und einem Batteriespeicher.</figcaption>
</figure>

## Kapitelüberblick

Dieses Kapitel erweitert das Modell aus [Kapitel 8](/sdam/de/chapter-8/), indem es mit einem komplexeren Energiespeicherproblem beginnt, das Energie aus zwei Quellen (einem Windpark und dem Stromnetz) kombiniert, um eine zeitabhängige Last zu bedienen, unterstützt durch einen Speicher. Ein besonderes Merkmal dieses Problems ist, dass uns eine 24-Stunden-Prognose für Wind vorliegt, die stündlich aktualisiert wird. Diese Prognosen können sich im Laufe der Zeit erheblich ändern, was eine neue Quelle der Unsicherheit einführt – nicht nur, dass die Prognosen unvollkommen sind, sondern dass sich die Prognosen selbst verändern.

Wir beginnen mit der Untersuchung zweier Modelle zur Modellierung der Unsicherheit in Windprognosen. Das erste ist eine Methode, die als Gaußsche Prozessregression bekannt ist und nützlich ist, um kontinuierliche Prozesse zu modellieren, wie etwa die Menge an Windenergie, die wir über die nächsten 24 Stunden erwarten.

Die zweite Methode verwendet einen leistungsfähigen, jedoch überraschend einfachen Ansatz, der auf sogenannten "Hidden-State-Modellen" basiert. Diese erlauben es uns, eine Eigenschaft von Prognosen nachzubilden, die als *Kreuzungszeiten* bekannt ist. Damit ist die Zeitdauer gemeint, während der eine Prognose über oder unter dem tatsächlichen Wert liegt. Dies ist ein wichtiges Verhalten bei der Modellierung von Speicherproblemen.

Um unsere Politik zu entwerfen, passen wir die Technik an, die wir erstmals in [Kapitel 6](/sdam/de/chapter-6/) eingeführt haben, wo wir mit einer deterministischen Lookahead-Politik begannen und anschließend Parameter einführten, um sie im Laufe der Zeit besser funktionieren zu lassen. Für unser Energieproblem planen wir unter Verwendung unserer besten Schätzung der prognostizierten Windenergie, multipliziert mit Koeffizienten, die davon abhängen, wie viele Stunden wir in die Zukunft prognostizieren. Dies ergibt ein deterministisches Optimierungsmodell mit 24 Parametern, die abgestimmt werden müssen.

## Erzählung

Wir werden nun ein etwas komplexeres Energiespeicherproblem lösen, das in Abbildung 9.1 dargestellt ist. Im Gegensatz zu unserem vorherigen Speichersystem, das lediglich Energie aus dem Stromnetz kaufte und verkaufte, stehen wir nun vor der Aufgabe, eine zeitabhängige Last für ein Gebäude mithilfe von Energie aus einem Windpark und dem Stromnetz zu decken, wobei ein einzelner Energiespeicher hilft, die verschiedenen Prozesse zu glätten.

Dieses Problem wird zudem eine weitere charakteristische Eigenschaft aufweisen, nämlich dass alle exogenen Prozesse (Wind, Preise, Lasten und Temperatur) aus einem dynamischen Prozess stammen, der mit unterschiedlichen Arten von Vorhersagbarkeit variiert:

- Lasten – Die Last (also die Nachfrage nach Energie) folgt einem recht vorhersagbaren Muster, das von der Tageszeit abhängt (ein Gebäude muss um 8 Uhr morgens, wenn Menschen eintreffen, eine bestimmte Temperatur erreicht haben) sowie von der Temperatur.
- Temperatur – Die Temperatur ist ein einigermaßen vorhersagbarer Prozess, der von der Tageszeit und der Jahreszeit abhängt, aber auch lokale Wetterbedingungen widerspiegelt, die mit einiger Genauigkeit prognostiziert werden können.
- Wind – Es gibt Anbieter, die Prognosedienste für Wind erbringen, obwohl die Prognosen nicht sehr genau sind und sich sogar im Laufe eines Tages recht schnell verändern (siehe Abbildung 9.2).
- Preise – Der Strompreis im Netz spiegelt Angebot und Nachfrage wider, wobei der Stromversorger so ausgelegt ist, dass er sich schnell an die Nachfrage anpasst. Kurzfristige Engpässe können jedoch Spitzen verursachen, bei denen die Preise auf das 10- bis 100-Fache des Durchschnittspreises steigen können. Es kann auch Phasen geben, in denen die Last schneller sinkt, als Generatoren heruntergefahren werden können, was gelegentlich zu überschüssiger Energie führt, die zu sehr niedrigen, sogar negativen Preisen verkauft wird.

<figure class="book-figure">
  <img src="/assets/images/sdam/windforecasts.png" alt="Entwicklung der Windenergieprognosen über einen Zeitraum von 24 Stunden, stündlich aktualisiert." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 9.2.</span> Entwicklung der Windenergieprognosen über einen Zeitraum von 24 Stunden, stündlich aktualisiert. Die schwarze Linie zeigt den tatsächlichen Wert.</figcaption>
</figure>

Jeder dieser Prozesse kann mit unterschiedlicher Genauigkeit prognostiziert werden. Die Prognose der Windenergie ist am ungenauesten, und obwohl der Wind nachts stärker sein kann, können Höchst- und Tiefstwerte zu jeder Tages- oder Nachtzeit auftreten. Lasten sind stark mit der Tageszeit korreliert, größtenteils aufgrund menschlicher Aktivität, aber auch aufgrund der Temperatur. Zu beachten ist, dass heiße Nachmittage an einem Sommertag durch Klimaanlagen Spitzen in der Mitte des Tages erzeugen können, während sie im Winter tatsächlich die Heizlast (die möglicherweise durch elektrische Heizung gedeckt wird) verringern können. Auch die Temperatur weist aufgrund von Sonnenauf- und -untergang eine starke Tageszeitkomponente auf, wobei es aber zu Schwankungen kommen kann, wenn Wetterfronten durchziehen.

Unser Problem besteht darin, zu entscheiden, wie viel vom Stromnetz gekauft (oder an das Stromnetz zurückverkauft) und wie viel zu jedem Zeitpunkt gespeichert werden soll (diese Entscheidungen könnten bei manchen Netzbetreibern in 5-Minuten-Schritten getroffen werden). Wir müssen die Nachfrage nach Energie decken, möchten aber ansonsten die Erlöse aus dem Verkauf von Energie abzüglich der Kosten für den Kauf der Energie vom Stromnetz oder Windpark maximieren.

## Einordnung des Problems

Die Antworten auf unsere drei einordnenden Fragen lauten:

- **Metriken:** Wir möchten den gesamten erwarteten Gewinn maximieren, der die Erlöse aus der Deckung der Nachfrage abzüglich der Kosten für den Kauf von Energie aus dem Stromnetz umfasst.
- **Entscheidungen:** Wir haben sechs Entscheidungen: den Energiefluss vom Stromnetz zum Speicher, den Energiefluss vom Stromnetz zur Last, den Energiefluss vom Windpark zum Speicher, den Energiefluss vom Windpark zur Last, den Energiefluss vom Speicher zum Stromnetz und den Energiefluss vom Speicher zur Last.
- **Unsicherheiten:** Wir haben die folgenden dynamischen Informationsprozesse: die Last (die Nachfrage nach Energie), die Temperatur (die die Last beeinflusst), die Energie aus dem Windpark, den Preis, den wir für die Deckung der Last erhalten, und die Kosten für den Kauf von Energie aus dem Stromnetz.

## Grundmodell

### Zustandsvariablen

Wir beginnen mit der Modellierung der Momentaufnahme des Systems zum Zeitpunkt $t$, die $R_t$ umfasst, die Menge an Energie (in MWh), die zum Zeitpunkt $t$ in der Batterie gespeichert ist; $L_t$, die Last (Nachfrage) nach Energie zum Zeitpunkt $t$ (in MW); $\tau_t$, die Temperatur zum Zeitpunkt $t$; $w_t$, die Windenergie zum Zeitpunkt $t$ (in MW); $p^{load}\_t$, den Betrag, den wir pro MWh für die Deckung der Last des Gebäudes zum Zeitpunkt $t$ bezahlt bekommen; und $c^{grid}\_t$, die Kosten für den Kauf von Strom aus dem Netz (dies ist der Preis, den wir bezahlt bekommen, wenn wir an das Netz zurückverkaufen).

Da das zugrunde liegende Problem sehr zeitabhängig ist (aufgrund täglicher Zyklen), müssen wir Prognosen verwenden, sowohl um die Dynamik des Problems zu modellieren als auch um Entscheidungen zu treffen, die vorwegnehmen müssen, was in Zukunft geschehen könnte. Wir gehen davon aus, dass uns eine rollierende Reihe von Prognosen zur Verfügung steht, wie in Abbildung 9.2 für den Wind dargestellt. Wir modellieren die Prognosen für Last ($L$), Temperatur ($\tau$), Wind ($w$), Marktpreise ($p$) und Netzpreise ($G$) mithilfe von: $f^L_{tt'}$, der Prognose der Last $L_t$ (in MW) zum Zeitpunkt $t' > t$, gegeben das, was wir zum Zeitpunkt $t$ wissen; $f^\tau_{tt'}$, der Prognose der Temperatur $\tau_t$ zum Zeitpunkt $t' > t$, gegeben das, was wir zum Zeitpunkt $t$ wissen; $f^w_{tt'}$, der Prognose der Windenergie $w_t$ (in MW) zum Zeitpunkt $t' > t$, gegeben das, was wir zum Zeitpunkt $t$ wissen; $f^p_{tt'}$, der Prognose der Marktpreise $p^{load}\_t$ (in ＄/MWh) zum Zeitpunkt $t' > t$, gegeben das, was wir zum Zeitpunkt $t$ wissen; und $f^G_{tt'}$, der Prognose der Netzpreise $c^{grid}\_t$ (in ＄/MWh) zum Zeitpunkt $t' > t$, gegeben das, was wir zum Zeitpunkt $t$ wissen.

Alle Prognosen sind Vektoren über den Horizont $t, t+1, \ldots, t+H$, wobei $H$ ein festgelegter Horizont ist (z.B. 24 Stunden). Wir setzen $f^X_t$ als den Vektor der Prognosen für $X \in \Xcal = \lbrace L, T, W, P, G\rbrace $.

Unsere Zustandsvariable ist dann

$$
S_t = (\underbrace{R_t}_{R_t}, \underbrace{(L_t, \tau_t, w_t, p^{load}_t, c^{grid}_t)}_{I_t}, \underbrace{(f^L_t, f^T_t, f^w_t, f^P_t, f^G_t )}_{B_t}).
$$

Hier haben wir die steuerbare Ressource $R_t$ (unsere physische Zustandsvariable), die Momentaufnahme von Last, Temperatur, Windenergie und Preis (die wir als Informationsvariablen $I_t$ zusammenfassen könnten) sowie die Prognosen (die eine Form von Belief $B_t$ über die Zukunft darstellen) gruppiert.

Wir stellen schnell fest, dass wir eine relativ hochdimensionale Zustandsvariable haben. Wenn wir in 5-Minuten-Schritten planen, würde eine rollierende 24-Stunden-Prognose 288 Elemente umfassen. Dies deutet auf die Herausforderung hin, die jeden erwartet, der den Wert $V_t(S_t)$, sich im Zustand $S_t$ zu befinden, schätzen möchte.

### Entscheidungsvariablen

Die Entscheidungsvariablen für unser System sind nun $x^{wr}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ vom Windpark zur Batterie bewegt wird; $x^{w\ell}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ vom Windpark zur Last (dem Gebäude) bewegt wird; $x^{gr}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ vom Netz zur Batterie bewegt wird; $x^{rg}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ von der Batterie zum Netz bewegt wird; $x^{g\ell}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ vom Netz zur Last bewegt wird; $x^{r\ell}\_t$, die Menge an Strom, die zum Zeitpunkt $t$ von der Batterie zur Last bewegt wird; und $x^{loss}\_t$, ungedeckte Last (bekannt als "Lastabwurf").

Diese Variablen müssen unter Berücksichtigung der Nebenbedingungen bestimmt werden

$$
\begin{align}
x^{w\ell}_t + x^{g\ell}_t + \frac{1}{\eta} x^{r\ell}_t + x^{loss}_t &=  L_t, \label{eq:energysystem1}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta R_t, \label{eq:energysystem2}
\end{align}
$$

$$
\begin{align}
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} (R^{max} - R_t), \label{eq:energysystem3}\\
x^{rg}_t                                     &\leq  \eta R_t, \label{eq:energysystem3a}\\
x^{w\ell}_t +  x^{wr}_t                      &\leq  w_t, \label{eq:energysystem4}\\
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energysystem5}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta u^{discharge}, \label{eq:energysystem6}\\
x^{wr}_t, x^{w\ell}_t, x^{gr}_t, x^{rg}_t, x^{g\ell}_t, x^{r\ell}_t &\geq  0.  \label{eq:energysystem7}
\end{align}
$$

Gleichung $\eqref{eq:energysystem1}$ begrenzt die Leistung zur Deckung der Last (des Gebäudes) auf die Menge der Last (wir dürfen das Gebäude nicht überlasten). Die Variable $x^{loss}$ erfasst den Betrag, um den wir die Last nicht gedeckt haben. Die Nebenbedingung erfasst Umwandlungsverluste bei Energie, die der Batterie entnommen wird. Gleichung $\eqref{eq:energysystem2}$ besagt, dass wir nicht mehr Strom aus unserem Batteriespeicher entnehmen können, als in der Batterie vorhanden ist, angepasst um Umwandlungsverluste. Gleichung $\eqref{eq:energysystem3}$ begrenzt dann, wie viel wir in die Batterie einspeisen können, auf die Menge der verfügbaren Kapazität, wiederum angepasst um die Umwandlungsverluste. Gleichung $\eqref{eq:energysystem3a}$ begrenzt, wie viel wir vom Speicher zurück ins Netz einspeisen können. Gleichung $\eqref{eq:energysystem4}$ begrenzt die Menge vom Windpark auf das, was der Windpark zu diesem Zeitpunkt erzeugt. Die Gleichungen $\eqref{eq:energysystem5}$–$\eqref{eq:energysystem6}$ begrenzen die Ein- und Ausflüsse der Batterie auf die Lade- und Entladeraten. Gleichung $\eqref{eq:energysystem7}$ erzwingt Nichtnegativität für jede Variable.

### Exogene Information

Unsere erste Quelle exogener Information ist die Differenz zwischen dem tatsächlichen und dem prognostizierten Wert für einen beliebigen Prozess "$X$", wobei

$$
X = (L, \tau, w, p^{load}, c^{grid}).
$$

Sei $X_t$ der Prozess und $\varepsilon^X_{t+1}$ die Differenz zwischen den tatsächlichen und den prognostizierten Werten. Wir setzen dann

$$
\varepsilon^X_{t+1} = X_{t+1} - f^X_{t,t+1}.
$$

Wir könnten $\varepsilon^X_{t+1}$ modellieren, indem wir Stichproben aus historischen Daten ziehen, oder indem wir annehmen, dass es einer bestimmten angenommenen Verteilung folgt.

Die zweite Quelle exogener Information ist die Änderung der Prognosen, während wir uns zeitlich vorwärts bewegen. Wir setzen erneut $f^X_t$ als Vektor von Prognosen für jeden Informationsprozess $X$, wobei $f^X_{tt}$ der tatsächliche Wert zum Zeitpunkt $t$ ist. Sei $\fhat^X_{t+1,t'}$ die Änderung der Prognose für den Zeitpunkt $t'$ zwischen $t$ und $t+1$, sodass

$$
\fhat^X_{t+1,t'} = f^X_{t+1,t'} - f^X_{tt'},~ t'=t, t+1, \ldots, t+H.
$$

Die exogenen Änderungen $\fhat^X_{t+1,t'}$ sind über die Zeitperioden $t'$ hinweg korreliert. Wäre dies nicht der Fall, würden die Prognosen, wenn sie über den Horizont $t'=t, \ldots, t+H$ aufgetragen werden, die Glätte, die wir bei den Windprognosen in Abbildung 9.2 sehen, nicht mehr aufweisen. Wir kommen weiter unten auf die Frage der Modellierung der Unsicherheit in Prognosen zurück.

Das bedeutet, dass wir unsere exogene Information schreiben können als

$$
W_{t+1,X} = (\varepsilon^X_{t+1}, \fhat^X_{t+1,t'}), t' > t,
$$

für $X$ gleich den verschiedenen Variablen (Last, Temperatur, Wind, Marktpreise und Netzpreise).

### Übergangsfunktion

Die Entwicklung der Ressourcen-Zustandsvariable ist gegeben durch

$$
\begin{align}
R_{t+1} = R_t + \eta (x^{wr}_t + x^{gr}_t) - \frac{1}{\eta} (x^{rg}_t + x^{r\ell}_t).\label{eq:energytransitionII1}
\end{align}
$$

Jede der Variablen $L_t$, $\tau_t$, $w_t$, $p^{load}\_t$ und $c^{grid}\_t$ entwickelt sich anhand der Prognosen. Zum Beispiel würden wir die Entwicklung der Last $L_t$ schreiben als

$$
\begin{align}
L_{t+1} = f^L_{t,t+1} + \varepsilon^L_{t+1}, \label{eq:energytransitionII2}
\end{align}
$$

Wir könnten ähnliche Gleichungen für $\tau_t$, $w_t$, $p^{load}\_t$ und $c^{grid}\_t$ aufstellen.

Wir schreiben die Entwicklung der Prognosen als

$$
\begin{align}
f^X_{t+1,t'} = f^X_{tt'} + \fhat^X_{t+1,t'}, ~X\in\Xcal, ~t'=t+1, \ldots, t+1+H,  \label{eq:energytransitionII3}
\end{align}
$$

für $X=L, \tau, w, p^{load}$ und $c^{grid}$. Gleichung $\eqref{eq:energytransitionII3}$ ist in der Literatur als "Martingal-Modell der Prognoseentwicklung" bekannt. Der Begriff "Martingal" bezieht sich auf unsere Annahme, dass $f^X_{tt'}$ eine unverzerrte Schätzung von $f^X_{t+1,t'}$ ist, da wir annehmen, dass die zufälligen Abweichungen $\fhat^X_{t+1,t'}$ im Durchschnitt null sind.

Die Gleichungen $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ und $\eqref{eq:energytransitionII3}$ (für alle Prognosen $X$) bilden zusammen die Übergangsfunktion

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Zielfunktion

Unsere Gewinnfunktion zum Zeitpunkt $t$ ist gegeben durch

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

wobei der Marktpreis $p^{load}\_t$ und der Netzpreis $c^{grid}\_t$ in der Zustandsvariable $S_t$ enthalten sind. Unsere Zielfunktion ist weiterhin das kanonische Problem, das durch

$$
\max_\pi \E \sum_{t=0}^T  C(S_t,X^\pi(S_t))
$$

gegeben ist. Wie zuvor gilt $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$, was durch die Gleichungen $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ und $\eqref{eq:energytransitionII3}$ gegeben ist.

## Modellierung von Unsicherheit

Im Folgenden beschreiben wir zwei Stile zur Modellierung von Unsicherheit im Zeitverlauf. Zunächst beschreiben wir eine Methode zur Modellierung der Korrelationen in den Fehlern der Prognosen über die Zeit unter Verwendung einer Technik, die manchmal als *Gaußprozess-Regression* bezeichnet wird. Diese Methode stellt sicher, dass sich ein Vektor von Prognosen beim Voranschreiten in der Zeit auf natürliche Weise entwickelt.

Anschließend beschreiben wir ein Hidden-State-Markov-Modell, das sich als außergewöhnlich realistisch für die Erzeugung von Stichprobenpfaden stochastischer Prozesse erwiesen hat. Dieses Modell repliziert Fehlerverteilungen sehr genau, erfasst aber auch sehr gut *Kreuzungszeiten* (crossing times), also die Zeit, während der der tatsächliche Prozess (z. B. die Windgeschwindigkeit) über oder unter einem Referenzwert wie einer Prognose bleibt. Wenn wir die Zeit, in der eine Prognose über oder unter dem tatsächlichen Wert liegt, korrekt erfassen können, bedeutet dies, dass wir Korrelationen über die Zeit erfassen.

Dieser Abschnitt wird mehrere leistungsfähige Methoden der stochastischen Modellierung veranschaulichen, die in keinem Werkzeugkasten zur Modellierung von Unsicherheit fehlen sollten. Stochastische Modellierung kann technisch anspruchsvoll sein, und dieser Abschnitt spiegelt dies wider. Der Leser sei gewarnt, dass dieser Abschnitt deutlich aufwendiger ist als unsere anderen Abschnitte zur Modellierung von Unsicherheit.

### Gaußprozess-Regression für Prognosefehler

Die Gaußprozess-Regression (kurz GPR) ist eine einfache Methode zur Erzeugung korrelierter Sequenzen normalverteilter Zufallsvariablen. GPR ist besonders nützlich, wenn man versucht, eine kontinuierliche Fläche zu schätzen, bei der, wenn ein Punkt auf der Fläche höher als erwartet ist, auch benachbarte Punkte höher als erwartet sein werden.

Sei $X_{t'}$ das tatsächliche Ergebnis eines beliebigen unserer exogenen Prozesse (Preise, Lasten, Temperatur, Windenergie) zum Zeitpunkt $t'$, und sei $f^X_{tt'}$ die zum Zeitpunkt $t < t'$ erstellte Prognose von $X_{t'}$. Es ist üblich, einen Fehler $\varepsilon_{t'-t}$ anzunehmen, der die Differenz zwischen $X_{t'}$ und der Prognose $f^X_{tt'}$ beschreibt. Wir würden dann ein Modell für $\varepsilon^X_{t'-t}$ annehmen, etwa

$$
\varepsilon^X_{t'-t} \sim N(0, (t'-t) \sigma^2_X).
$$

Wir werden einen etwas anderen Ansatz verfolgen, indem wir annehmen, dass die Verteilung der Änderung einer Prognose $\fhat^X_{t+1,t'}$ durch

$$
\fhat^X_{t+1,t'} \sim N(0, \sigma^2_X).
$$

beschrieben wird. Wir nehmen dann an, dass die Änderungen der Prognosen $\fhat^X_{t+1,t'}$ über die Zeiten $t'$ mit einer Kovarianzfunktion

$$
\begin{align}
Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''}) = \sigma^2_X e^{-\beta\vert t''-t'\vert }. \label{eq:forecastcovariancefunction}
\end{align}
$$

korreliert sind.

Die Kovarianzfunktion $Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''})$ in Gleichung $\eqref{eq:forecastcovariancefunction}$ erfasst die Eigenschaft, dass die Kovarianz über die Zeit Korrelationen aufweist, die mit der Differenz zwischen den beiden Zeitpunkten abnehmen. Dieses einfache Modell führt den einstellbaren Parameter $\beta$ ein, der aus Daten geschätzt oder möglicherweise nach Ermessen festgelegt werden muss. So könnte man beispielsweise die Kovarianzwerte für unterschiedliche Werte von $\beta$ auftragen und einen Wert wählen, der plausibel erscheint.

Wir können diese Kovarianzfunktion nutzen, um eine Kovarianzmatrix $\Sigma^X$ mit dem Element $\Sigma^X_{t't''} = \sigma^2\_X e^{-\beta\vert t''-t'\vert }$ zu erzeugen. Es gibt eine einfache Möglichkeit, eine korrelierte Stichprobe von Prognoseänderungen mit einer Methode zu erzeugen, die *Cholesky-Zerlegung* genannt wird. Sie beginnt damit, das zu erzeugen, was man die „Quadratwurzel“ der Kovarianzmatrix $\Sigma^X$ nennen könnte, die wir in einer unteren Dreiecksmatrix $L$ speichern. In Python würden wir unter Verwendung des NumPy-Pakets den folgenden Python-Befehl verwenden

```
L = scipy.linalg.cholesky(Sigma_X, lower=True)
```

Wir bemerken, dass $\Sigma^X = L^T L$ gilt, weshalb wir $L$ als die Quadratwurzel von $\Sigma^X$ betrachten.

Als Nächstes erzeugen wir eine Sequenz unabhängiger Zufallsvariablen $Z_{\tau}$ für $\tau =  1, \ldots, H$, die normalverteilt mit Mittelwert 0 und Varianz 1 sind. Sei nun $Z=(Z_{t+1}, Z_{t+2}, \ldots, Z_{t+H})^T$ ein Spaltenvektor, der aus diesen unabhängig verteilten standardnormalen Zufallsvariablen besteht. Wir können eine korrelierte Stichprobe der Prognoseänderungen erzeugen mit

$$
\begin{pmatrix} \fhat^X_{t+1,t+1} \\ \fhat^X_{t+1,t+2} \\ \vdots \\ \fhat^X_{t+1,t+H} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} + L Z.
$$

Diese Formel liefert uns eine Stichprobe von Prognoseänderungen $\fhat^X_{t+1,t+1}, \ldots, \fhat^X_{t+1,t+H}$, die gemäß unserer exponentiellen Abklingfunktion in Gleichung $\eqref{eq:forecastcovariancefunction}$ korreliert sind. Das Ergebnis ist eine sich entwickelnde Menge von Prognosen, bei der die Varianz der Fehler in den Prognosen gemäß

$$
Var(\varepsilon^X_{t'-t}) = (t'-t) \sigma^2_X.
$$

linear mit der Zeit wächst.

Die sich entwickelnden Prognosen $f^X_{t,t'}, f^X_{t+1,t'}, \ldots$ werden das Verhalten zeigen, das wir bei unseren sich entwickelnden Windprognosen in Abbildung 9.2 gesehen haben.

### Hidden-State-Markov-Modell

Eine Herausforderung bei der Entwicklung stochastischer Modelle im Energiebereich besteht darin, eine Eigenschaft zu erfassen, die als *Kreuzungszeit* (crossing time) bekannt ist. Dies ist die Zeit, während der ein tatsächlicher Prozess (z. B. Preis oder Windgeschwindigkeit) über oder unter einem Referenzwert wie einer Prognose liegt. Abbildung 9.3 veranschaulicht eine Aufwärtskreuzungszeit (up-crossing time) für einen Windprozess.

<figure class="book-figure">
  <img src="/assets/images/sdam/upcrossingtime.png" alt="Forecasted and actual wind power, illustrating an up-crossing time." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 9.3.</span> Prognostizierte (schwarz) und tatsächliche Windleistung, die einen Zeitraum veranschaulicht, in dem der tatsächliche Wert über der Prognose liegt. Die Länge dieses Zeitraums, in dem der Wert darüber liegt, wird als Aufwärtskreuzungszeit (up-crossing time) bezeichnet.</figcaption>
</figure>

Der Versuch, Kreuzungszeiten mit klassischer Zeitreihenmodellierung zu replizieren, erwies sich als erfolglos. Was funktionierte, war die Entwicklung eines Markov-Modells mit einer versteckten Zustandsvariable $S^C_t$, die so kalibriert ist, dass sie die Dynamik des Prozesses beim Über- oder Unterschreiten des Referenzwerts erfasst. Der Prozess verwendet die folgenden Schritte:

**Schritt 1** – Durch Vergleich des tatsächlichen Prozesses mit dem Referenzwert werden die Zeitpunkte ermittelt, an denen der tatsächliche Prozess über oder unter den Referenzwert wechselt, und es wird ein Datensatz ausgegeben, der erfasst, ob der Prozess darüber (A) oder darunter (B) lag und wie lange. Diese Zeiträume werden in drei Kategorien (S/M/L) für kurz/mittel/lang zusammengefasst, und jedes Segment wird mit A oder B sowie S/M/L gekennzeichnet, wodurch sechs Zustände entstehen. Diese werden „versteckte Zustände“ genannt, weil wir zwar zum Zeitpunkt $t$ wissen, ob der tatsächliche Prozess über oder unter dem Referenzwert liegt, aber erst nach dem Kreuzen des Referenzwerts wissen, ob die Länge kurz, mittel oder lang ist.

**Schritt 2** – Anhand der historischen Sequenz von $S^C_t$ wird eine einstufige Übergangsmatrix $P^C[S^C_{t+1}\vert S^C_t]$ berechnet, also die Wahrscheinlichkeit, dass der Kreuzungsprozess den Wert $S^C_{t+1}$ annimmt, gegeben dass er sich derzeit im Zustand $S^C_t$ befindet.

**Schritt 3** – Der tatsächliche Prozess (z. B. Windgeschwindigkeit) wird anhand der empirischen Verteilungsfunktion in beispielsweise fünf Kategorien zusammengefasst. Sei $W^g_t$ die aggregierte Windgeschwindigkeit (eine Zahl von 1 bis 5).

**Schritt 4** – Aus den historischen Daten wird die bedingte Verteilung der Windgeschwindigkeit gegeben $W^g_t$ und $S^C_t$ berechnet, $F^W[W_{t+1}\vert W^g_t, S^C_t]$, also die empirische Verteilungsfunktion der Windgeschwindigkeit $W_{t+1}$ gegeben $W^g_t$ und $S^C_t$.

Unter Verwendung der einstufigen Übergangsmatrix $P^C[S^C_{t+1}\vert S^C_t]$ und der bedingten Verteilungsfunktion $F^W[W_{t+1}\vert W^g_t, S^C_t]$ können wir nun unseren stochastischen Prozess simulieren, indem wir zunächst die versteckte Zustandsvariable $S^C_{t+1}$ gegeben $S^C_t$ simulieren (man beachte, dass es hiervon nur 30 gibt). Dann können wir aus einer Windgeschwindigkeit $W_t$ die aggregierte Windgeschwindigkeit $W^g_t$ bestimmen und anschließend die tatsächliche Windgeschwindigkeit $W_{t+1}$ aus der bedingten Verteilungsfunktion $F^W[W_{t+1}\vert W^g_t, S^C_t]$ ziehen.

Diese Logik hat sich als geeignet erwiesen, sowohl die Fehlerverteilung (tatsächlicher Wert vs. Referenzwert) als auch die Verteilungen der Aufwärts- und Abwärtskreuzungszeiten über eine Reihe von Datensätzen hinweg, die sowohl Wind als auch Netzpreise modellieren, genau wiederzugeben. Abbildung 9.4 veranschaulicht diese Verteilungen an einem bestimmten Datensatz.

<figure class="book-figure">
  <img src="/assets/images/sdam/crossingtimedistributions.jpg" alt="Comparison of actual vs predicted forecast error distributions, up-crossing time distributions, and down-crossing time distributions." style="max-width: 550px;">
  <figcaption><span class="fig-num">Abbildung 9.4.</span> Vergleich von tatsächlichen und prognostizierten Prognosefehlerverteilungen (oben), Aufwärtskreuzungszeit-Verteilungen (unten links) und Abwärtskreuzungszeit-Verteilungen (unten rechts).</figcaption>
</figure>

## Entwurf von Politiken

Die größte Schwierigkeit dieses Problems besteht darin, dass die Prognosen Teil der Zustandsvariable sind, was es uns ermöglicht, die rollierende Entwicklung der Prognose explizit zu modellieren. Die Schwierigkeit liegt darin, dass dies die Zustandsvariable hochdimensional macht.

Die gängigsten Ansätze für den Umgang mit Prognosen verwenden ein Lookahead-Modell, das die Zukunft approximiert, indem die Prognose fixiert wird. Die beiden beliebtesten Strategien sind:

- Deterministischer Lookahead, wobei die Prognose in der Formulierung des Lookaheads erfasst wird.
- Stochastischer Lookahead mit latenten Variablen – Wir können die Prognose nutzen, um ein stochastisches Lookahead-Modell zu entwickeln, das wir dann mittels klassischer dynamischer Programmierung lösen. Im Lookahead-Modell fixieren wir die Prognosen im Modell, anstatt ihre Entwicklung über die Zeit zu modellieren. Wenn wir eine Variable in einem Modell (einschließlich eines Lookahead-Modells) ignorieren, spricht man von einer *latenten Variable*.

Beide Methoden verwenden die Prognose als latente Variable, da sie die Entwicklung der Prognose innerhalb des Lookahead-Modells nicht modellieren. Die Schwierigkeit beim stochastischen Lookahead-Modell besteht darin, dass es schwerer zu lösen ist. Wenn wir unser Energiespeicherproblem in kurzen Zeitschritten optimieren (dies könnten 5 Minuten oder sogar weniger sein), kann dies Probleme für Techniken wie exakte oder sogar approximative dynamische Programmierung verursachen.

Aus diesem Grund besteht die gängigste Strategie zur Behandlung zeitabhängiger Probleme mit einer Prognose darin, ein deterministisches Lookahead-Modell zu lösen, genau wie wir es für unser dynamisches Kürzeste-Wege-Problem getan haben. Wir beschreiben ein solches Modell im Folgenden und führen anschließend eine parametrisierte Version ein, die es dem deterministischen Modell ermöglicht, Unsicherheit besser zu handhaben.

An dieser Stelle sei angemerkt, dass die Planung mit rollierenden Prognosen im Operations Management durchaus üblich ist. Seltsamerweise ignorieren Lehrbücher fast einheitlich die korrekte Modellierung rollierender Prognosen. Praktisch jedes Buch zur Bestandsplanung setzt beispielsweise die Zustandsvariable mit dem Bestand gleich. Nur eine kleine Handvoll erkennt, dass wir, wenn Prognosen in jeder Zeitperiode aktualisiert werden, die für die Aktualisierung der Prognosen benötigten Informationen in der Zustandsvariable darstellen müssen. Wenn wir diese Information ignorieren, erzeugen wir effektiv ein Lookahead-Modell, in dem die Prognose konstant gehalten wird.

### Deterministischer Lookahead

Wir werden denselben Notationsstil verwenden, den wir erstmals in [Kapitel 6](/sdam/de/chapter-6/) eingeführt haben, bei dem wir unser *Basismodell*, also das Problem, das wir zu lösen versuchen, vom *Lookahead-Modell* unterscheiden, das wir als eine Form von Politik zur Lösung des Basismodells lösen.

Man erinnere sich, dass die kanonische Formulierung unseres Basismodells

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))\vert S_0\right\},
$$

lautet, wobei $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ und wobei wir einen exogenen Informationsprozess $(S_0, W_1, W_2, \ldots, W_T)$ haben. Man beachte, dass die Variablen $W_t$ vom Zustand $S_t$ und/oder von der Entscheidung $x_t$ abhängen können; ist dies der Fall, muss die Variable $W_{t+1}$ „on the fly“ erzeugt werden, nachdem wir $S_t$ und $x_t$ kennen.

Wir werden eine Politik erzeugen, indem wir ein deterministisches Lookahead-Modell formulieren, bei dem alle Variablen mit Tilden versehen sind und sowohl nach dem Zeitpunkt $t$, zu dem wir unsere Entscheidung treffen, als auch nach der Zeit $t'$, die die Zeitvariable innerhalb des Lookahead-Modells ist, indiziert werden. So würden wir $\xtilde_{tt'}$ definieren, die Entscheidung zum Zeitpunkt $t'$ im Lookahead-Modell, das zum Zeitpunkt $t$ erzeugt wird; $\ctilde_{tt'}$, den Kostenkoeffizienten für $\xtilde_{tt'}$; sowie $\Rtilde_{tt'}$, die Energie in der Batterie zum Zeitpunkt $t'$ im Lookahead-Modell, das zum Zeitpunkt $t$ erzeugt wird.

Man beachte, dass $x_t = \xtilde_{tt}$, $c_t = \ctilde_{tt}$ und so weiter gilt.

Wir erzeugen unsere deterministische Lookahead-Politik $X^{DLA}\_t(S_t)$ als das folgende lineare Programm:

$$
\begin{align}
X^{DLA}_t(S_t) = \argmax_{x_t, (\xtilde_{tt'},t'=t+1, \ldots, t+H)} \left(C(S_t,x_t) + \sum_{t'=t+1}^{t+H} C(\Stilde_{tt'},\xtilde_{tt'})\right),  \label{eq:energydetlookahead0}
\end{align}
$$

wobei

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

$$
C(\Stilde_{tt'},\xtilde_{tt'}) = (\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \eta \xtilde^{r\ell}_{tt'}) \ptilde^{load}_{tt'} - (\xtilde^{g\ell}_{tt'} + \xtilde^{gr}_{tt'})\ctilde^{grid}_{tt'}.
$$

Dieses Problem muss unter den Nebenbedingungen $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$ für $x_t$ sowie den folgenden Nebenbedingungen für $\xtilde_{tt'}$ für alle $t' = t+1, \ldots, t+H$ gelöst werden:

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookahead1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}   &\leq  f^L_{tt'}, \label{eq:energydetlookahead2} \\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookahead3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookahead4}
\end{align}
$$

$$
\begin{align}
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookahead4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{wr}_{tt'}   &\leq  f^W_{tt'}, \label{eq:energydetlookahead5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energydetlookahead6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookahead7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookahead8}
\end{align}
$$

Diese Gleichungen spiegeln jene in den Basis-Nebenbedingungen $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$ wider, mit dem einzigen Unterschied, dass wir Lookahead-Variablen wie $\xtilde_{tt'}$, $\Rtilde_{tt'}$ und Prognosen wie $f^W_{tt'}$ anstelle des tatsächlichen Windes $W_t$ verwenden.

Das durch die Gleichungen $\eqref{eq:energydetlookahead0}$–$\eqref{eq:energydetlookahead8}$ beschriebene Modell ist ein relativ einfaches lineares Programm, für das inzwischen Pakete in Sprachen wie Matlab oder Python verfügbar sind.

Lookahead-Politiken wie $X^{DLA}\_t(S_t)$ werden häufig in dynamischen, zeitvariablen Problemen wie diesem verwendet. Sie müssen auf rollierender Basis gelöst werden, wie wir zuerst für unser deterministisches Kürzeste-Wege-Problem veranschaulicht haben. Aus diesem Grund werden diese manchmal "rolling horizon procedures" oder "receding horizon procedures" genannt. Es gibt ein ganzes Forschungsgebiet, das als "model predictive control" bekannt ist und auf diesen Lookahead-Politiken basiert.

Bei Anwendungen wie diesem Energiespeicherproblem wirft die Verwendung eines deterministischen Lookahead-Modells die Sorge auf, dass wir Unsicherheiten nicht berücksichtigen. Zum Beispiel könnten wir zusätzliche Energie in der Batterie speichern wollen, um uns vor einem plötzlichen Rückgang des Winds oder einem Preisanstieg im Netz zu schützen. Im nächsten Abschnitt werden wir beschreiben, wie man ein deterministisches Lookahead-Modell verwenden kann, um mit Unsicherheit umzugehen.

### Parametrisierter Lookahead

Es gibt eine sehr einfache Möglichkeit, das Problem anzugehen, dass unser deterministischer Lookahead keine Unsicherheit berücksichtigt. Wir müssen darüber nachdenken, wie wir das Modell (oder die Lösung) aufgrund von Unsicherheit modifizieren könnten. Zum Beispiel könnten wir bereit sein, *in der Zukunft* für zusätzliche Speicherung zu zahlen, um unerwartete Schwankungen zu bewältigen. Natürlich können wir das Modell nicht dazu zwingen, jetzt Energie in der Speicherung zu behalten, wenn wir sie möglicherweise benötigen. Wir könnten auch Prognosen abwerten wollen, die möglicherweise nicht sehr genau sind.

Wir können diese Änderungen einführen, indem wir die Nebenbedingungen $\eqref{eq:energydetlookahead1}$–$\eqref{eq:energydetlookahead8}$ durch die folgenden ersetzen

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookaheadmod1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}     &=     \theta^L_{t'-t} f^L_{tt'}, \label{eq:energydetlookaheadmod2}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookaheadmod3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookaheadmod4}\\
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookaheadmod4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{w\ell}_{tt'}&\leq  \theta^W_{t'-t} f^W_{tt'}, \label{eq:energydetlookaheadmod5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta}u^{charge}, \label{eq:energydetlookaheadmod6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookaheadmod7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookaheadmod8}
\end{align}
$$

Beachten Sie, dass wir Parameter eingeführt haben, um die rechte Seite der Nebenbedingungen $\eqref{eq:energydetlookaheadmod2}$ und $\eqref{eq:energydetlookaheadmod5}$ zu modifizieren, wobei wir Koeffizienten $\theta^L_{t'-t}$ und $\theta^W_{t'-t}$ eingeführt haben, um die Prognosen von Last und Wind zu modifizieren, wobei die Koeffizienten danach indiziert sind, wie viele Zeitperioden wir in die Zukunft prognostizieren. Anschließend haben wir die Nebenbedingung $\eqref{eq:energydetlookaheadmod3}$ mit der Überlegung modifiziert, dass wir unsere Fähigkeit einschränken möchten, die gesamte Energie in der Speicherung zu nutzen, um eine Reserve zu erhalten.

Sei $X^{DLA-P}(S_t\vert \theta)$ die Lookahead-Politik, die unter den parametrisierten Nebenbedingungen $\eqref{eq:energydetlookaheadmod1}$–$\eqref{eq:energydetlookaheadmod8}$ gelöst wird. Sobald wir entschieden haben, wie wir diese Parametrisierungen einführen (dies ist die Kunst hinter jedem parametrischen Modell), stellt sich das Problem, den besten Wert für $\theta$ zu finden. Dies ist das Problem der Parametersuche, das wir in [Kapitel 7](/sdam/de/chapter-7/) behandelt haben.

Wir haben die relative Verbesserung durch die Verwendung eines optimierten, parametrisierten deterministischen Lookaheads berechnet, bei dem wir nach den besten Werten des Vektors $\theta=(\theta^L, \theta^W)$ suchen, im Vergleich zu einer einfachen Politik, die diese Parameter gleich 1,0 setzt. In unseren Experimenten haben wir $\theta^L_{t'-t} = 1$ gesetzt und lediglich den Koeffizienten der Windprognose, $\theta^W_{t'-t}$, optimiert.

Die Ergebnisse sind in Abbildung 9.5 dargestellt, die zeigen, dass wir die Leistung im Durchschnitt um etwa 30 Prozent verbessern. Wichtig ist, dass diese Verbesserung ohne zusätzliche Komplexität bei der Entscheidungsfindung im Feld einhergeht. Der einzige Schritt, den wir hier nicht beschrieben haben, ist, dass wir den Parametervektor $\theta$ abstimmen müssen. Der Prozess der Optimierung von $\theta$ ist leider nicht einfach.

<figure class="book-figure">
  <img src="/assets/images/sdam/cfaenergyperformance.png" alt="Relative improvement of the deterministic lookahead with optimized theta versus using theta=1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 9.5.</span> Relative Verbesserung des deterministischen Lookaheads mit optimiertem $\theta_\tau$ im Vergleich zur Verwendung von $\theta_\tau = 1$.</figcaption>
</figure>

## Was haben wir gelernt?

- In diesem Kapitel führen wir ein wesentlich komplexeres Energiespeicherproblem mit rollierenden Prognosen ein.
- Wir führen das "Martingal-Modell der Prognoseentwicklung" ein, das davon ausgeht, dass sich Prognosen der Zukunft im Laufe der Zeit entwickeln, wobei die erwartete Änderung einer Prognose null ist (die tatsächliche Änderung jedoch positiv oder negativ sein kann).
- Anschließend beschreiben wir ein verstecktes semi-Markov-Modell, das uns hilft, "Kreuzungszeiten" nachzubilden, die die Zeit erfassen, in der eine Prognose über oder unter dem tatsächlichen Wert liegt.
- Wir führen eine deterministische Lookahead-Politik ein und anschließend einen parametrisierten deterministischen Lookahead, bei dem wir Koeffizienten für jede Prognose einführen (ein weiteres Beispiel für eine Hybrid-DLA/CFA).
- Wir zeigen, dass die abgestimmte DLA/CFA-Politik die reine (nicht abgestimmte) deterministische Lookahead-Politik um etwa 30 Prozent übertrifft.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was versteht man unter dem "Martingal-Modell der Prognoseentwicklung"?</li>
<li>Die gesamte Prognose zum Zeitpunkt $t$ für jede Größe wie die Last $L_t$, $f^L_{tt'}$ für $t'=t, \ldots, t+H$, befindet sich in der Zustandsvariablen. Warum? [Hinweis: Betrachten Sie die Übergangsgleichungen für Prognosen und die Variablen, die sie prognostizieren.]</li>
<li>Was ist der Unterschied zwischen den Variablen $x_t$, $t=0, \ldots, T$ und den Variablen $\xtilde_{tt'}$ für $t' = t, \ldots, t+H$?</li>
<li>Was ist eine "Kreuzungszeit"?</li>
<li>Was ist eine "Cholesky-Zerlegung" und wofür wird sie verwendet?</li>
<li>Welcher Zustand ist im versteckten Markov-Modell der Windenergie verborgen? Erklären Sie, warum er verborgen ist.</li>
<li>Zu welcher Politikklasse gehört die oben beschriebene parametrisierte Lookahead-Politik? Welche Zielfunktion wird verwendet, um den besten Satz von Abstimmungsparametern zu finden?</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Versuchen Sie, eine parametrisierte Politik für die Entscheidungsfindung unter den Bedingungen des Problems in diesem Kapitel zu entwerfen. Sie können alles in Form von Regeln oder parametrisierten Funktionen verwenden. Die einzige Einschränkung ist, dass Sie nicht über irgendetwas optimieren dürfen (das heißt, Sie dürfen innerhalb Ihrer Politik kein $\argmax_x$ verwenden).</li>
<li>Unser parametrisierter Lookahead beschränkte sich darauf, Koeffizienten vor Prognosen einzuführen. Sie könnten auch additive Anpassungen einführen, wie zum Beispiel zu verhindern, dass der Energiespeicher zu nah an seine Kapazität gerät (dies würde Ihnen erlauben, einen Windstoß zu speichern, der die Prognose übersteigt) oder zu nah an null gerät (falls es einen Einbruch im Wind gibt). Schlagen Sie eine alternative Parametrisierung vor und argumentieren Sie, warum Ihre Struktur einen Mehrwert bieten könnte.</li>
</ol>
{% endraw %}
