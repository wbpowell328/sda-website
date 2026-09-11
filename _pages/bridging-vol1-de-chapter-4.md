---
layout: book
title: "Kapitel 4: Entscheidungen"
permalink: /bridging-vol1/de/chapter-4/
date: 2026-07-17
book_home: /bridging-vol1/de/contents/
book_data: bridging_vol1_toc_de
lang: de
translated_from: en
translated_from_hash: b9d7338fb39168d1
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Dieses gesamte Buch basiert auf der Aussage:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="If you want to run a better {anything} you have to make better decisions.">
</figure>

Es versteht sich von selbst, dass man wissen muss, welche Entscheidungen man trifft, bevor man sich dem Problem der Identifizierung der besten Entscheidungen widmen kann.

Erinnern Sie sich aus Kapitel 1, dass es zwei Arten von "Problemen" gibt: metrikfokussierte und entscheidungsfokussierte. Beispiele für beide sind:

- **Metrikfokussierte Probleme:**
  - Lieferkettenmanagement – Bestände minimieren, Betriebsmarge maximieren.
  - Stromnetz – Energieerzeugungskosten minimieren.
  - Öffentliche Gesundheit – Todesfälle minimieren.
  - Management einer LKW-Flotte – Nettobetriebseinnahmen pro Fahrer pro Woche maximieren.
  - Management eines Hotels - Betriebsgewinn maximieren.
  - Durchführung eines Präsidentschaftswahlkampfs - Die Wahl gewinnen.
- **Entscheidungsfokussierte Probleme:**
  - Lieferkettenmanagement – Wie viel bestellt werden soll, welcher Lieferant genutzt werden soll.
  - Nachfragemanagement – Wie ein Produkt bepreist werden soll, welche Marketingkanäle genutzt werden sollen.
  - Stromnetz – Welche Generatoren für den Betrieb eingeplant werden sollen, welche Gasturbinen genutzt werden sollen.
  - Diabetesmanagement – Welche Medikation zur Blutzuckerkontrolle verwendet werden soll, welche Dosierung.
  - Cash-Management eines Investmentfonds – Wie viel Bargeld vorgehalten werden soll, um Rücknahmen zu bewältigen, in welche Aktien investiert werden soll.

Wenn wir mit einer Metrik beginnen, besteht unsere Herausforderung darin, die Entscheidungen zu identifizieren, die uns helfen, die Metrik zu verbessern. Wenn wir mit Entscheidungen beginnen, besteht das Problem darin, die Metrik zu entwerfen. Selbst wenn wir jedoch glauben, die Entscheidungen zu kennen, müssen wir sicherstellen, dass wir keine übersehen haben.

Es gibt eine umfangreiche mathematische Literatur zum Thema der Optimierung von Entscheidungen, doch selbst diesen Büchern fehlt eine standardisierte Definition dessen, was eine Entscheidung ist. Stattdessen führen die Bücher Notationen wie den Entscheidungsvektor "$x$" oder die Steuerung "$u$" oder die Aktion "$a$" ein, woraufhin sie Beispiele geben und hoffen, dass der Leser "es versteht". Während dies bei einfachen Problemen funktioniert, entsteht dadurch eine Barriere zwischen dem mathematischen Modell und realen Anwendungen.

Bei komplexen Anwendungen wie dem Management von Lieferketten oder der Lösung von Problemen im Bereich der öffentlichen Gesundheit ist die Identifizierung von Entscheidungen wesentlich anspruchsvoller als die Identifizierung von Metriken. Dies soll die Identifizierung von Metriken nicht trivialisieren, aber das Konzept der Metriken wird sowohl von Fachexperten als auch von Modellierern gut verstanden. Wenn man Geschäftsführer, medizinisches Fachpersonal, Ingenieure und Wissenschaftler fragt, welche Entscheidungen beteiligt sind, blicken sie oft ratlos drein. Während das Wort "Entscheidung" jedem vertraut ist, scheint es kein Begriff zu sein, den sie bei der täglichen Problemlösung verwenden, während jeder "Metriken" in der einen oder anderen Form versteht.

## Entscheidungen und die englische Sprache

Es scheint, als wäre ein guter Ausgangspunkt für ein Kapitel über "Entscheidungen", eine Definition anzubieten. Es hilft zu bemerken, dass Standarddefinitionen wie die von Webster die übliche Vielfalt an Bedeutungen für ein Wort enthalten, wie es in der englischen Sprache verwendet wird. Zum Beispiel wird der Gewinn eines Baseballspiels als "Entscheidung" bezeichnet. In diesem Buch verwenden wir "Entscheidung" nur für Situationen, in denen wir eine Reihe von Wahlmöglichkeiten haben und die beste Wahl treffen müssen, was natürlich die Identifizierung von Leistungsmetriken impliziert.

Wir beginnen mit der Feststellung, dass Entscheidungen immer eine Form von Information darstellen. Es hilft, alle Informationen in drei breite Klassen einzuteilen:

1. Informationen, die wir zu einem bestimmten Zeitpunkt bereits kennen. Wir bezeichnen diese Information als den Zustand unseres Systems (genauer gesagt, den Wissenszustand).
2. Informationen, die wir kontrollieren und die den Zustand verändern.
3. Neue Informationen, die eintreffen und die wir nicht kontrollieren (obwohl wir sie beeinflussen können).

Informationen in den Klassen (2) und (3) erzeugen eine aktualisierte Zustandsvariable (Klasse 1). Wir sind nun bereit, eine Entscheidung zu definieren:

**Definition (formal):** Eine **Entscheidung** ist eine endogen kontrollierbare Informationsklasse.

Entscheidungen (die in "Entscheidungsvariablen" enthalten sind) stellen also Informationen dar, die wir erzeugen, indem wir eine von mehreren Wahlmöglichkeiten benennen.

Unsere formale Definition erfordert einen erheblichen Aufwand für ein Konzept, das eigentlich sehr einfach sein sollte, daher bieten wir eine zweite Definition an:

**Definition (informell):** Eine **Entscheidung** ist etwas, das wir kontrollieren.

Diese Definition vermeidet "Informationsklasse", indem sie "etwas" verwendet, bringt aber den Punkt auf den Punkt.

Beide unsere Definitionen werfen die Frage auf, wer die Entscheidung trifft, was untrennbar mit dem Konzept einer Entscheidung verbunden ist. Klassische mathematische Modelle vermeiden diese Frage, doch sie ist für die Modellierung der meisten realen Systeme von zentraler Bedeutung.

Angesichts der Bedeutung von Entscheidungen in menschlichen Aktivitäten sollte es nicht überraschen, dass es im Englischen eine Reihe von Begriffen gibt, die das Konzept einer Wahl erfassen. Tabelle 4.1 listet eine Reihe von Wörtern auf, die eine Wahl in einem allgemeinen Kontext implizieren. Unter der Spalte "Informationssammlung" befinden sich Begriffe, die auftreten, wenn entschieden wird, welches Experiment durchgeführt, wem zugehört, was beobachtet werden soll (und so weiter). Die Spalte mit der Bezeichnung "Handeln bezüglich Ressourcen" listet eine Vielzahl von Begriffen auf, die im Kontext des Managements von Ressourcen (wie Personen) auftreten. Zum Beispiel impliziert "befördern" die Entscheidung, ob jemand befördert werden soll oder nicht (und auf welche Stufe).

Diese Tabelle soll keine umfassende Liste von Wörtern sein, die eine Wahl implizieren, aber sie deutet darauf hin, dass "Entscheidungen" in der englischen Sprache auf viele Arten vorkommen.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 4.1.</span> Die englische Sprache bietet eine Vielzahl von Wörtern, die alle die Freiheit zu wählen bedeuten.</caption>
<thead>
<tr><th>Allgemeine Begriffe</th><th>Informationssammlung</th><th>Identifikationsentscheidungen</th><th>Handeln bezüglich Ressourcen</th></tr>
</thead>
<tbody>
<tr><td>Aktion</td><td>Experiment (welches?)</td><td>Identifizieren</td><td>Befördern (wer, wie viel)</td></tr>
<tr><td>Wahl</td><td>Zuhören (wem?)</td><td>Klassifizieren</td><td>Erwerben (welches, wie viel)</td></tr>
<tr><td>Kontrolle</td><td>Beobachten</td><td>Auffinden</td><td>Verkaufen (an wen, wie viel)</td></tr>
<tr><td>Entscheidung</td><td>Testen (welches)</td><td>Schlussfolgern</td><td>Belohnen (wie viel)</td></tr>
<tr><td>Design</td><td>Betrachten/Scannen</td><td>Beschriften</td><td>Kritisieren (wen, wie)</td></tr>
<tr><td>Intervention (medizinisch)</td><td></td><td></td><td>Bewegen (wohin)</td></tr>
<tr><td>Option</td><td></td><td></td><td>Handeln (was, mit wem)</td></tr>
<tr><td>Bewegung (wohin)</td><td></td><td></td><td>Behandlung (welche)</td></tr>
<tr><td>Reaktion (welche)</td><td></td><td></td><td>Annehmen/Ablehnen</td></tr>
<tr><td>Aufgabe</td><td></td><td></td><td>Empfehlen</td></tr>
<tr><td>Handel (Finanzen)</td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>

## Entscheidungen identifizieren

Das Verständnis all der verschiedenen Wörter, die eine Wahl implizieren (oder erfordern), ist wichtig bei der Identifizierung der Entscheidungen, die getroffen werden können. Es ist wichtig zu erkennen, dass Entscheidungen nicht mit auffälligen Etiketten versehen sind. Campbell's Soup Co. erkannte die Herausforderung, Verbraucher bewusst zu machen, dass sie Entscheidungen trafen, in einer berühmten Werbespot-Serie in den 1970er Jahren mit dem Titel "*I could have had a V8!*". Ihre Marketingabteilung erkannte, dass Menschen oft eine Dose Limonade griffen, ohne sich bewusst zu sein, dass sie sich stattdessen für einen V8 hätten entscheiden können. Die Werbespots trugen dazu bei, den Verbrauchern bewusst zu machen, dass das Trinken einer Limonade eine Entscheidung war.

Menschen in nahezu jedem Problemumfeld verfallen in die Gewohnheit, Probleme auf eine bestimmte Weise zu lösen, ohne zu erkennen, dass sie Wahlmöglichkeiten haben. Man könnte sagen, dass wir so durch den Tag kommen, da die Bewertung von Wahlmöglichkeiten, um die beste zu identifizieren, Zeit kostet. Die Herausforderung, vor der wir stehen, besteht darin, sich zunächst bewusst zu werden, wann wir eine Entscheidung treffen, und dann die Entscheidungen zu identifizieren, die den größten Einfluss auf die Leistung haben.

Das Verhalten des passiven Entscheidens ist absolut allgegenwärtig, doch dies schafft eine Chance. Stellen Sie sich vor, Sie befinden sich in einem beliebigen Problemumfeld (wie den in Abbildung 4.1 links dargestellten). Nehmen Sie nun an, Sie möchten die Leistung verbessern, sei es die Rentabilität, die Produktivität, verbesserte Gesundheitsergebnisse, bessere Medikamente oder eine Verbesserung der Landwirtschaft. Erinnern Sie sich dann an unseren Grundsatz:

> *Wenn Sie ein besseres {irgendetwas} betreiben möchten, müssen Sie bessere Entscheidungen treffen.*

Um eine bessere Entscheidung zu treffen, müssen Sie erkennen, wann Sie eine Entscheidung treffen. Eine gute Übung ist es, Ihr eigenes "Entscheidungsbuch" anzulegen und dann mentale Notizen zu machen, sobald Sie erkennen, dass eine Entscheidung getroffen wird (das heißt, es gab eine Wahlmöglichkeit, und unterschiedliche Entscheidungen hätten getroffen werden können).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/IdentifyingDecisions.jpg" alt="A challenge is to work in any of a variety of problem settings and identify the decisions that are being made." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 4.1.</span> Eine Herausforderung besteht darin, in einer Vielzahl von Problemumfeldern (wie den auf der rechten Seite dargestellten) zu arbeiten und die getroffenen Entscheidungen zu identifizieren.</figcaption>
</figure>

## Arten von Entscheidungen

Unser Ansatz zur Rahmengebung erfordert, in der Lage zu sein, alle Entscheidungen zu identifizieren, nicht nur solche, die von einer bestimmten Methodik behandelt werden können. Um diesen Prozess zu leiten, listen wir unten 10 Arten von Entscheidungen auf, die nach unserem Wissen jede Form von Information abdecken, die wir kontrollieren.

1. **Physische und finanzielle Entscheidungen** – Diese Entscheidungen entstehen bei der Verwaltung physischer und finanzieller Ressourcen, die Menschen, Ausrüstung, Einrichtungen, Produkte, Rohstoffe, Wasser, Energie sowie Bargeld, Investitionen, Kredite umfassen … Zu den Entscheidungen gehören der Kauf, Verkauf, die Bewegung und die Veränderung von Ressourcen. Diese Klasse ist das Gebiet des Operations Research, der technischen Regelungstechnik und der Finanzwirtschaft und stützt sich stark auf Werkzeuge wie lineare, ganzzahlige und nichtlineare Programmierung.
2. **Diskrete Entscheidungen mit unsicherem Ausgang** – Dies ist ein allgemeiner Begriff, der Aktivitäten abdecken soll, die komplexe Projekte umfassen können, wie die Einführung eines neuen Produkts, die Einreichung eines Medikaments zur klinischen Prüfung oder den Kauf eines Unternehmens. Manchmal als "Projekte" bezeichnet, können diese eine Reihe von Änderungen an Leistungsmetriken, Ressourcen, Finanzen und Systemdynamik beinhalten. Sonderfälle können einfachere Probleme sein, wie die Wahl eines Preises oder wer für eine Führungsposition eingestellt werden soll. Diese Probleme sind in der Literatur zur Entscheidungsanalyse beliebt und beinhalten typischerweise relativ kleine Mengen von Handlungen, die schwer zu bewerten sind.
3. **Entscheidungen zur Informationsbeschaffung/-beobachtung** – Diese umfassen Entscheidungen, Informationen durch die Durchführung von Experimenten im Labor, im Feld oder mit Computersimulationen zu beschaffen oder zu beobachten. Es hilft, zwei Kontexte zu unterscheiden, in denen wir Informationen beschaffen können:
   - Offline-Lernen - Dies sind Aktivitäten, die in einer Testumgebung durchgeführt werden. Die Offline-Informationsbeschaffung kann Forschungsbemühungen, Internetrecherchen oder das Anwerben von Fachexperten umfassen.
   - Online-Lernen - Dies umfasst Entscheidungen, Prozesse im Feld mithilfe eines "Lernen durch Handeln"-Ansatzes durchzuführen und zu beobachten, der die Beobachtung eines Prozesses beinhaltet, während er sich entwickelt, wie zum Beispiel wie ein Markt auf Werbung oder Preisgestaltung reagiert oder wie ein Patient auf eine Behandlung reagiert.

Beide Formen der Informationsbeschaffung setzen voraus, dass Entscheidungen speziell zum Zweck der Informationsgewinnung getroffen werden. Informationsbeschaffung wurde unter Bezeichnungen wie Versuchsplanung (statisch oder sequenziell), stochastische Suche, aktives (oder optimales) Lernen, Multiarmed Bandits und Bayes'sche Optimierung untersucht.

4. **Entscheidungen zur Informationskommunikation/-weitergabe** – Diese treten in zwei Formen auf:
   - Botschaften – Dies spiegelt wider, was wir in Text, Video und/oder Audio sagen. Ein modernes Beispiel für Botschaften ist die Prompt-Optimierung.
   - Kanäle und Timing – Dies spiegelt die Wahl des Kanals (Text/E-Mails, Veröffentlichung (gedruckt oder online), soziale Medien oder Werbekanäle) sowie das Timing und die Häufigkeit wider.
5. **Leistungskennzahlen und Ziele** – Diese stellen die entscheidende Wahl dar, das zu quantifizieren, was wir zu erreichen versuchen, etwa die Maximierung von Einnahmen, die Minimierung von Kosten, die Maximierung der Festigkeit eines Materials oder der Wirksamkeit eines Medikaments, oder die Minimierung von Leerfahrten. Diese können in die Zielfunktion eingebunden oder als Nebenbedingungen dargestellt werden.
6. **Wahl von Funktionen** – Oft als Entscheidung übersehen, können Funktionen Methoden zum Treffen von Entscheidungen (Politiken), die Formulierung von Optimierungsmodellen, die Wahl von Leistungskennzahlen, Methoden zur Prognose oder Schätzung oder Übergangsfunktionen (etwa wie sich eine Krankheit ausbreitet) sein. Diese Kategorie umfasst die Wahl der Funktion, das heißt ihre Struktur.
7. **Festlegen von Parametern** – Funktionen werden typischerweise durch einen oder mehrere Parameter charakterisiert (üblicherweise kontinuierlich, aber nicht immer), die zur Verbesserung der Vorhersagegenauigkeit angepasst werden können (bei der Anpassung statistischer Modelle) oder zur Verbesserung der Leistung optimiert werden können (beim Abstimmen einer Politik zum Treffen von Entscheidungen). Parameter können mit einer Funktion verknüpft sein; sie können das Gewicht einer Leistungskennzahl sein, oder sie könnten ein Zielwert (oder eine Grenze) für eine Leistungskennzahl sein.
8. **Schätzung oder Identifikation** – Uns könnte das Bild einer Person gezeigt werden, mit der Aufgabe, diese zu identifizieren, wobei wir die Anzahl der korrekten Identifikationen maximieren möchten. Einem großen Sprachmodell wird eine Menge von Wörtern (genauer: Tokens) gegeben, und es versucht, das wahrscheinlichste als Nächstes folgende Wort (oder Token) zu identifizieren.
9. **Merkmale und Verhaltensweisen** – Wir könnten die Merkmale eines neuen Softwarepakets, das Design eines neuen Produkts oder die Art und Weise wählen, wie wir uns (als Individuum, Organisation oder politisches Gremium) verhalten.
10. **Entscheiden, was zu entscheiden ist** – In den meisten realen Anwendungen kann die Anzahl potenzieller Entscheidungen (das heißt, überall dort, wo wir vor einer Wahl stehen) sehr groß sein. Wir müssen priorisieren, welche Entscheidungen den größten wirtschaftlichen Wert haben, um eine formale Analyse überhaupt zu rechtfertigen.

## Ausprägungen von Entscheidungsvariablen

Entscheidungen treten in unterschiedlichen Formen auf, aber Entscheidungsvariablen lassen sich typischerweise in eine (oder mehrere) der folgenden Kategorien einordnen:

- **Binär** – Hier haben wir nur zwei Möglichkeiten, zum Beispiel:
  - Eine Aktion auszuführen oder nicht.
  - Einen Vermögenswert zu halten oder zu verkaufen.
  - A/B-Tests für Webseitendesign, bei denen wir zwischen einem aktuellen Design und einem neuen oder modifizierten Design wählen müssen.
  - Ob ein Medikament oder eine Behandlung in einer klinischen Studie weiter getestet oder die Studie beendet werden soll.
- **Diskrete Menge von Wahlmöglichkeiten oder Aktionen** – Dies ist bei weitem die häufigste Form eines Entscheidungsproblems und tritt auf, wenn wir eine Menge diskreter Wahlmöglichkeiten oder Aktionen haben, wie zum Beispiel:
  - Die Wahl eines Lieferanten für ein Teil.
  - Die Wahl eines Medikaments oder einer medizinischen Behandlung.
  - Die Wahl eines Marketingkanals.
  - Die Wahl eines Standorts für eine Anlage.
- **Kontinuierlich skalar** – Beispiele sind:
  - Die Festlegung des Preises eines Produkts.
  - Die Wahl der Dosierung eines Medikaments.
  - Die Entscheidung, wie viel für Werbung in einem Markt für eine Präsidentschaftskampagne ausgegeben werden soll.
  - Die Wahl, wie viel Bargeld ein Investmentfonds vorhalten soll.
- **Diskrete Vektoren** – Es gibt viele Probleme, die das Management diskreter Ressourcen wie Personen, Maschinen und Aufträge betreffen. Wenn wir eine einzelne Menge diskreter Wahlmöglichkeiten haben, etwa wo ein Produkt gekauft werden soll, lassen sich alle Möglichkeiten leicht aufzählen. Aber wenn wir entscheiden müssen, wie beispielsweise 100 Maschinen für die Bearbeitung hunderter Aufträge eingeplant werden sollen, benötigen wir spezialisierte Algorithmen.
- **Kontinuierliche Vektoren** – Es gibt Probleme mit einer kleinen Anzahl kontinuierlicher Entscheidungen, etwa der Steuerung eines Autos, Flugzeugs oder einer Rakete. Dann gibt es Probleme mit einer großen Anzahl kontinuierlicher Parameter, etwa der Zuweisung von Mitteln auf viele Anlageklassen oder der Verteilung großer Mengen von Naloxon-Sets auf hundert Bezirke eines Bundesstaats. Für die Lösung dieser Probleme gibt es leistungsstarke Suchalgorithmen.

## Wie Entscheidungen das System beeinflussen

Es ergibt keinen Sinn, über „Entscheidungen“ als abstraktes Konzept zu sprechen. Wir erkennen zunächst, dass eine Entscheidung das System auf irgendeine Weise verändert, aber wie?

Es gibt drei Arten, wie eine Entscheidung ein System beeinflussen kann:

- **Physische Ressourcen** – Hier kaufen, verkaufen oder verändern wir in irgendeiner Weise etwas Physisches, das Personen, Ausrüstung, Anlagen, Lebensmittel, Wasser oder Energie sein können.
- **Finanziell** – Dies kann Bargeld, Investitionen und Kredite; Versicherungsverträge und Währungsabsicherungen; sowie Preise umfassen.
- **Informationell** – Dies ist eine Kategorie, die die Entscheidung umfassen könnte, ein Experiment in einem Labor, eine Computersimulation oder einen Feldversuch durchzuführen, der zur Aktualisierung von Schätzungen oder Überzeugungen verwendet wird; sie könnte die Festlegung von Leistungszielen, die Gestaltung von Kennzahlen oder die Spezifizierung der Bedingungen eines Verkaufsvertrags beinhalten.

Es gibt gewisse Überschneidungen zwischen den Kategorien, etwa zwischen der Unterscheidung von Währungsabsicherungen und den Bedingungen eines Verkaufsvertrags. Wichtig ist die Bandbreite der Möglichkeiten, wie wir beeinflussen können, wie sich ein System im Zeitverlauf entwickelt.

Im weiteren Verlauf unseres Modellierungsrahmens müssen wir Folgendes über jede Entscheidung verstehen:

- Wie wirkt sich die Entscheidung jetzt auf unsere Leistungskennzahlen aus?
- Welche Auswirkung wird eine jetzt getroffene Entscheidung auf den Zustand des Systems haben, bevor die nächste Entscheidung getroffen wird?
- Wird die Entscheidung neue Informationen beeinflussen, die nach der Entscheidung eintreffen?

In Band II beschreiben wir diese Punkte mithilfe mathematischer Notation.

## Timing von Entscheidungen

Eines der wichtigsten, aber auch anspruchsvollsten Merkmale von Entscheidungen betrifft die Zeit, insbesondere:

- **Wie häufig Entscheidungen getroffen werden** – Wir können Entscheidungen in zwei breite Klassen einteilen:
  - Design-Entscheidungen, die nur einmal (zu Beginn) über den Planungshorizont hinweg getroffen werden. In der Praxis entwickeln sich selbst Design-Entscheidungen im Laufe der Zeit weiter, aber es ist üblich, dass Entscheidungen nur einmal innerhalb dessen getroffen werden, was als angemessener Planungshorizont gilt.
  - Kontrollentscheidungen – Dies sind Entscheidungen, die wiederholt über die Zeit hinweg getroffen werden, wobei es komplexe Systeme gibt, in denen verschiedene Entscheidungen in unterschiedlichen Zeitintervallen getroffen werden. Zum Beispiel planen Netzbetreiber die Einplanung von Dampfgeneratoren einmal täglich; Gasturbinen werden stündlich geplant; Anpassungen der Drehzahl bestimmter Generatoren erfolgen alle 5 Minuten; und Signale zur Anpassung der Spannungspegel werden alle 2 Sekunden gesendet.
- **Verzögerungszeiten** – Wenn eine Entscheidung getroffen wird, gibt es oft eine Verzögerung, bevor sie sich auf das System auswirkt. Zum Beispiel:
  - Die Bestellung von Bestand kann Wochen oder Monate benötigen, bis sie eintrifft.
  - Die Verabreichung eines Medikaments kann Minuten, Stunden oder Tage in Anspruch nehmen, bevor sie sich auf einen Patienten auswirkt.
  - Netzbetreiber planen die Zeitpläne für den Betrieb von Dampfkraftwerken bereits am Vortag, während Entscheidungen zum Einschalten von Gasturbinen eine Vorlaufzeit von 30 Minuten erfordern.
  - Preisänderungen zeigen sich möglicherweise erst nach Tagen oder Wochen in den Verkaufszahlen und können Märkte über Monate hinweg beeinflussen.
- **Vorausschauende Planung verzögerter Entscheidungen** – Zusätzlich zu den Dimensionen, wann eine Entscheidung getroffen wird und wann sie sich auf das System auswirkt, müssen wir über das Timing nachdenken, wenn wir in die Zukunft planen. Zum Beispiel:
  - Ein Hersteller kann bei Bestellungen aus Asien mit Vorlaufzeiten von acht Monaten konfrontiert sein, kann aber bei Engpässen für kleinere Mengen (zu höheren Kosten) deutlich schnellere Lieferzeiten erhalten. Bei der Überlegung, wie viel Bestand vorgehalten werden soll, müsste der Hersteller ohne die Option, beim teureren, aber näher gelegenen Lieferanten zu bestellen, deutlich größere Bestände vorhalten. Steht diese Option jedoch zur Verfügung, kann der Hersteller erwägen, im Falle eines Nachfrageanstiegs den näher gelegenen Lieferanten zu nutzen.
  - Fluggesellschaften müssen Flugzeugkäufe oft bis zu 10 Jahre im Voraus planen, können aber schnellere Lieferungen zu höheren Kosten aushandeln. Dies ermöglicht es der Fluggesellschaft, dies als Option in Betracht zu ziehen, falls die Passagierzahlen schneller als geplant steigen. Oder sie können Verträge zu einem Preis kündigen, der davon abhängt, wie lange sie warten, um diese Option auszuüben.

## Wer Entscheidungen trifft

Es gibt viele Situationen, in denen es mehr als einen Entscheidungsträger (oder Agenten) gibt. Beispiele für Multiagenten-Situationen umfassen:

- Zwei gleichberechtigte Entscheidungsträger (oft als Spieler bezeichnet), wie sie bei Verhandlungen zwischen einem Hersteller und einem Lieferanten oder einem Kunden auftreten können, oder bei Interaktionen zwischen einem Arzt und einem Patienten.
- Zwei Entscheidungsträger, bei denen einer eine kontrollierende Position innehat. Zum Beispiel kann ein „Außendienstmitarbeiter“ Ressourcen von einem „zentralen Agenten“ anfordern, der die Kontrolle darüber hat, wie viel von der Anfrage erfüllt wird.
- Mehrere Agenten, wie sie auftreten können, wenn einige Unternehmen miteinander konkurrieren (Beispiele finden sich in Branchen, die Autos oder Industriechemikalien verkaufen), oder wenn es mehrere Organisationseinheiten auf derselben Ebene eines Unternehmens gibt.
- Mehrere Agenten, wie sie in einer Lieferkette auftreten, in der verschiedene Hersteller Komponenten für die Fertigung eines Teils wie eines Motors oder eines ganzen Autos liefern.
- Ein einzelner Agent, der etwas über eine unbekannte Umgebung lernt, was der Art entspricht, wie wir jedes Problem mit Unsicherheit modellieren könnten. Die unbekannte Umgebung könnte das Wetter, das Vorhandensein einer Krankheit in einer Bevölkerung oder ein Markt sein, der ein Produkt kauft.

Wir kommen später in der Reihe auf Multiagenten-Probleme zurück, wo wir zeigen, wie die (in Band II vorgestellte) Notation erweitert werden kann, um mehrere Entscheidungsträger zu handhaben. Für den Moment werden wir uns auf einen einzelnen Entscheidungsträger konzentrieren, der einer von zwei oder mehr Entscheidungsträgern sein kann.

Wir haben mehrere Gründe dafür, in diesem Stadium auf die explizite Identifizierung von Entscheidungsträgern zu verzichten:

- Die Organisation von Entscheidungen kann variieren, selbst innerhalb derselben Branche (wie dem Transportwesen oder dem Lieferkettenmanagement) oder desselben Problembereichs (wie der öffentlichen Gesundheit).
- Wenn Ihr Ziel darin besteht, ein Computermodell zu entwickeln, möchten Sie möglicherweise ändern, wie Entscheidungen organisiert sind. Ein Modellierer möchte möglicherweise eine Reihe von Entscheidungen so behandeln, als würden sie von einem einzigen Agenten getroffen, entweder als Vereinfachung oder weil dies möglicherweise bessere Ergebnisse liefert.
- Das Ziel, verschiedene Arten von Entscheidungen aufzulisten, besteht nicht darin, alle in einem einzigen Modellierungsprojekt zu bearbeiten. Vielmehr ist es notwendig, die Ziele eines Modells zu identifizieren und dann die Entscheidungen auszuwählen, die für die Ziele des Projekts relevant sind.
- Wir empfehlen dem Leser, diese Projekte aus der Perspektive eines einzelnen Entscheidungsträgers anzugehen, was nicht notwendigerweise damit übereinstimmen muss, wie Entscheidungen innerhalb einer Organisation tatsächlich getroffen werden. Dies wird durch die anfängliche Darstellung des universellen Modellierungsrahmens in Band II unterstützt.

Für den Moment empfehlen wir bei einer Multiagenten-Situation, jeden Agenten separat zu behandeln, um dessen eigene Kennzahlen und Entscheidungen zu identifizieren. Unsicherheiten betreffen oft die breitere Umgebung, obwohl jeder Agent Unsicherheiten haben kann, die für seine eigenen Entscheidungen und Leistungskennzahlen relevant sind.

## Entscheidungen mit Computern treffen

Computer haben eine sehr unkomplizierte Art, Entscheidungen zu treffen. Sie beginnt damit, die Arten von Entscheidungen und die Menge möglicher (zulässiger) Entscheidungen zu kennen. Dann wird eine vorgegebene Methode verwendet, um die Entscheidung zu „treffen“, was eine bestimmte Wahl aus der Menge der zulässigen (oder erlaubten) Entscheidungen bedeutet.

Wir beginnen damit, einzuführen, wie wir uns auf diese Entscheidungsmethoden beziehen:

**Definition:** Eine **Politik** ist eine Methode zur Auswahl einer zulässigen Entscheidung unter Verwendung der Information, die zum Zeitpunkt der Entscheidung verfügbar ist.

Es gibt zwei grundlegende Strategien zur Gestaltung von Politiken, die jeweils in zwei Klassen unterteilt werden können, wodurch vier Klassen von Politiken entstehen, die *jede* Methode zum Treffen von Entscheidungen umfassen. Dies sind:

**Politiksuche** – Diese Strategie erstellt Funktionen, die im Laufe der Zeit so abgestimmt werden müssen, dass sie gut funktionieren. Sie treffen Entscheidungen, ohne direkt in die Zukunft zu planen. Diese können in zwei Klassen unterteilt werden:

1. Politikfunktionsapproximationen, oder PFAs.
2. Kostenfunktionsapproximationen, oder CFAs.

**Lookahead-Politiken** – Diese Strategie versucht, jetzt die beste Entscheidung zu treffen, indem über die Leistung der aktuellen Entscheidung plus einer Näherung der Auswirkung der aktuellen Entscheidung auf die Zukunft optimiert wird. Diese können ebenfalls in zwei Klassen unterteilt werden:

<ol start="3">
<li>Politiken basierend auf Wertfunktionsapproximationen, oder VFAs.</li>
<li>Direkte Lookahead-Approximationen, oder DLAs.</li>
</ol>

Jede dieser Politiken wird im Folgenden beschrieben.

### Politikfunktionsapproximationen (PFAs)

Politikfunktionsapproximationen (PFAs) stellen jede analytische Funktion dar, die anhand von Eingaben aus dem, was wir wissen, als Ausgabe die Aktion liefert, die wir durchführen sollten. Einige Beispiele sind:

- Bestandsbestellpolitiken geben oft eine Bestellung auf, wenn der Bestand unter ein Niveau "s" fällt, an welchem Punkt eine Bestellung aufgegeben wird, um den Bestand auf "S" zu bringen. "s" und "S" sind Parameter, die abgestimmt werden müssen.
- Ein Arzt kann Insulininjektionen verschreiben, wenn der A1c-Wert eines Patienten (der einen 3-5-monatigen rollierenden Durchschnitt des Blutzuckers widerspiegelt) über 6,5 steigt, und stoppt, wenn er unter 6,0 fällt. Auch hier müssen diese Zahlen variiert werden, um die Werte zu finden, die am besten funktionieren.

PFAs können jede analytische Funktion sein, wie eine lineare oder nichtlineare Funktion. Was eine PFA nicht enthalten kann, was bei jeder der drei verbleibenden Klassen von Politiken zu finden ist, ist ein eingebettetes Optimierungsproblem. PFAs können einfache Regeln sein, aber sie können auch sehr hochdimensionale nichtlineare Funktionen sein, wie ein neuronales Netz.

### Kostenfunktionsapproximationen (CFAs)

Es gibt viele Probleme, bei denen der beste Ansatz zur Entscheidungsfindung darin besteht, eine deterministische Approximation zu einem bestimmten Zeitpunkt zu verwenden, die mit verschiedenen Parametern modifiziert wurde, welche, wenn richtig abgestimmt, Entscheidungen erzeugen, die im Laufe der Zeit gut funktionieren. Dies ist ein Ansatz, der in der Praxis weit verbreitet ist, allerdings oft ohne a) die Fähigkeit zu erkennen, Parameter einzuführen, um die Entscheidungen zu verbessern, und/oder b) das Versäumnis zu erkennen, dass die Parameter abgestimmt werden können, um bessere Ergebnisse zu erzielen.

Das einfachste Beispiel dieses Ansatzes wird in Abbildung 4.2 veranschaulicht, wo wir wählen müssen, welches Produkt wir in sozialen Medien bewerben sollen (wir könnten jedes Problem mit diskreten Wahlmöglichkeiten einsetzen, die im [Abschnitt zum intelligenten Trial-and-Error](/bridging-vol1/de/chapter-2/#intelligenttrialanderror) von Kapitel 2 aufgeführt sind). Wir haben eine Punktschätzung für den Wert jedes Produkts basierend auf vergangenen Erfahrungen, von denen wir gelernt haben, dass sie viel Rauschen enthalten können, was zu einigen schlechten Schätzungen führt. Wir können vergangene Erfahrungen auch nutzen, um eine Standardabweichung zu schätzen, die ein Maß für die Streuung der Unsicherheit ist. Typischerweise sind wir zu 95 Prozent sicher, dass die Wahrheit innerhalb von plus oder minus 2 Standardabweichungen liegt.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoiceMeanStdDev.jpg" alt="When faced with a discrete set of choices, the uncertainty in the belief about how each performs may be described by its average value and standard deviation.">
  <figcaption><span class="fig-num">Abbildung 4.2.</span> Wenn man mit einer diskreten Menge von Wahlmöglichkeiten konfrontiert ist, kann die Unsicherheit im Belief darüber, wie gut jede Option funktioniert, durch ihren Durchschnittswert und die Standardabweichung, die die Streuung des Beliefs erfasst, beschrieben werden.</figcaption>
</figure>

Was wir nun tun werden, ist, einen "Index" für jedes Produkt $x$ zu erstellen, gegeben durch:

$$
Index_x = \text{Avg.value}_x + \theta \,(\text{std.dev}_x)
$$

Wir werden dann wählen, das Produkt $x$ zu bewerben, das den höchsten Wert von "$Index_x$" hat. Wir finden Produkt $x$, indem wir folgendes Optimierungsproblem lösen (welches deterministisch ist):

$$
\max_x \{\text{Avg.value}_x + \theta \,(\text{std.dev}_x)\}
$$

Die Lösung dieses Optimierungsproblems ist recht einfach – wir müssen nur die Werte $\text{Avg.value}_x + \theta (\text{std.dev}_x)$ sortieren und das Produkt $x$ finden, das den höchsten Wert hat (und hier dachten Sie, deterministische Optimierung müsse schwierig sein!).

Die Herausforderung besteht dann darin, den abstimmbaren Parameter $\theta$ zu wählen. Wenn wir $\theta = 0$ verwenden, bedeutet das, dass wir nur unsere aktuelle Schätzung verwenden. Das Problem ist, dass, wenn unsere Schätzung "$\text{Avg.value}_x$" aufgrund einer Pechserie niedrig ist, wir möglicherweise nie wieder versuchen, Produkt $x$ zu bewerben. Wenn wir $\theta = 2$ verwenden, nutzen wir eine sehr optimistische Schätzung des Wertes von Produkt $x$, was dazu ermutigt, Produkte auszuprobieren, bei denen ein hohes Maß an Unsicherheit besteht (was nicht unbedingt eine schlechte Strategie ist).

Die Idee, eine parametrisierte deterministische Approximation zu verwenden, ist außerordentlich leistungsfähig. Fluggesellschaften nutzen sie, wenn sie ihre Flugpläne optimieren, wobei sie eine Schätzung der Wetterverzögerungen für jeden Flug verwenden müssen. Wenn sie den Median verwenden, wird die Verzögerung in der Hälfte der Fälle größer sein als vom Flugplan vorgesehen, was dann zu einer großen Anzahl von verspäteten Ankünften von Flugzeugen führt und nachfolgende Flüge verzögert. Wenn wir jedoch das 90. Perzentil verwenden, führen wir möglicherweise zu viel Puffer in den Flugplan ein, was zu einer schlechten Auslastung der Flugzeuge führt.

Es ist am einfachsten, sich das Abstimmen einer Menge von Parametern $\theta$ in einem Simulator vorzustellen, aber es ist oft der Fall (wie beim Problem der Flugplanung), dass das Problem viel zu kompliziert ist. Aus diesem Grund kann es notwendig sein, Online-Lernen durchzuführen, was bedeutet, verschiedene Werte im Feld zu testen und die tatsächliche Leistung zu beobachten.

### Wertfunktionsapproximationen (VFAs)

Stellen Sie sich vor, wir disponieren eine Flotte von Lastwagen, bei der wir Fahrer zuweisen müssen, um Frachtladungen von einem Abholort zu einem Zielort zu bewegen. Abbildung 4.3 veranschaulicht, wie dieses Problem im Laufe der Zeit wiederholt gelöst werden muss. Was wir am Montag zu tun beschließen, wird die Standorte der Fahrer am Dienstag und Mittwoch verändern. Jeden Tag rufen Verlader neue Sätze von Ladungen an, die nicht im Voraus bekannt sind, sodass der Frachtführer Zuweisungsentscheidungen am Montag treffen muss, ohne zu wissen, was am Dienstag oder Mittwoch geschehen wird.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentThreeDays.png" alt="Illustration of the problem of assigning trucks over a three day period." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 4.3.</span> Veranschaulichung des Problems der Zuweisung von Lastwagen über einen Zeitraum von drei Tagen.</figcaption>
</figure>

Die Optimierung über einen mehrtägigen Horizont bei Vorhandensein der Unsicherheiten ist eine unglaublich komplexe Aufgabe. Stattdessen können wir den Wert von Fahrern in der Zukunft approximieren, wie in Abbildung 4.4 gezeigt. Dies kann durch das Ausführen von Simulationen in die Zukunft und die anschließende Berechnung des Wertes von Fahrern an verschiedenen Standorten erfolgen. Wenn wir diese Werte (genannt "Wertfunktionsapproximationen") einbeziehen, ist das Problem, das wir nun am Montag lösen müssen, nicht komplizierter, als wenn wir die Auswirkung des Sendens von Fahrern an verschiedene Standorte vollständig ignoriert hätten.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentwithDownstreamVFA.png" alt="Assigning drivers to loads using estimates of the value of drivers in the future." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 4.4.</span> Zuweisung von Fahrern zu Ladungen anhand von Schätzungen des Wertes von Fahrern in der Zukunft.</figcaption>
</figure>

Die Approximation des Wertes des Landens in einem bestimmten Zustand ist eine Strategie, die in der Forschungsliteratur sehr populär ist, deren Erfolg jedoch stark von der Struktur eines bestimmten Problems abhängt, und sie funktioniert tendenziell gut für eine kleine Anzahl speziell strukturierter Probleme.

### Direkte Lookahead-Approximationen (DLAs)

Es gibt viele Probleme, bei denen wir einfach in die Zukunft planen müssen, um jetzt eine Entscheidung zu treffen. Eines der bekanntesten Beispiele für eine direkte Lookahead-Politik ist die Verwendung von Google Maps, um einen Weg zum Zielort zu planen.

DLA-Politiken können in zwei Unterklassen unterteilt werden:

- Deterministische Lookaheads – Hierbei verwenden wir Punktschätzungen für alle unsicheren Größen wie Verkehrsverzögerungen.
- Stochastische Lookaheads – Hier wollen wir die Unsicherheit, mit der wir konfrontiert sind, explizit modellieren, wie zum Beispiel die potenziellen Verkehrsverzögerungen, die auftreten können, während wir zu unserem Ziel fahren. Es hilft, diese Klasse weiter in zwei Typen zu unterteilen:
  - Probleme mit diskreten Wahlmöglichkeiten – Dies sind Probleme, die typischerweise mit Entscheidungsbäumen gelöst werden.
  - Probleme, bei denen Entscheidungen Vektoren sind – Hier müssen wir die Werkzeuge der mathematischen Programmierung verwenden, um einen mehrdimensionalen Raum zu durchsuchen.

Beachten Sie, dass wir deterministische Lookaheads nicht weiter unterteilen müssen, da, selbst wenn die Entscheidung in jeder Zeitperiode ein Skalar ist, das gesamte Lookahead-Modell eine Optimierung über den Vektor der Entscheidungen erfordert, die die Zeitperioden über den Planungshorizont umfassen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/GoogleMapslookaheadHoriz.jpg" alt="Path planned by Google maps based on estimated travel times (left); alternative path based on perceived risk of driving through New York city (right).">
  <figcaption><span class="fig-num">Abbildung 4.5.</span> Von Google Maps geplanter Weg basierend auf geschätzten Reisezeiten (links); alternativer Weg basierend auf dem wahrgenommenen Risiko des Durchfahrens von New York City (rechts).</figcaption>
</figure>

Abbildung 4.5 (links) zeigt ein Beispiel dafür, wie Google Maps einen Weg von Hartford, Connecticut (oben rechts) nach Princeton, New Jersey (unten links), plant, mit Abfahrt um 16 Uhr nachmittags. Beachten Sie, dass der Weg direkt durch New York City führt, was genau gegen 17 Uhr geschehen würde, wenn der Verkehr am dichtesten erwartet wird. Google Maps verwendet eine Punktschätzung und ist trotzdem der Ansicht, dass dies der kürzeste Weg ist.

Natürlich würde jeder sachkundige Reisende verstehen, dass es enorme Unsicherheit bezüglich der tatsächlichen Reisezeiten durch New York um 17 Uhr gibt. Abbildung 4.5 (rechts) zeigt eine alternative Route, die Google anbietet und einem Reisenden die Möglichkeit gibt, zwischen einem Weg zu wählen, der voraussichtlich kürzer ist, aber mit dem Risiko, wesentlich länger zu sein, gegenüber einem etwas längeren Weg, der voraussichtlich nahe an der von Google geschätzten Zeit liegt.

Der erste Weg ist somit ein Beispiel für einen deterministischen Lookahead, aber der Nutzer kann die Unsicherheit einführen, während er die Empfehlung bewertet. Indem wir den zweiten Weg wählen, lösen wir, zugegebenermaßen auf ad-hoc Weise, einen stochastischen Lookahead.

Wenn wir in eine unsichere Zukunft planen, gibt es eine breite Palette von Strategien zur Modellierung dieses Prozesses, um bei der Entscheidungsfindung jetzt zu helfen. Eine Strategie besteht darin, eine Punktprognose zu verwenden (das heißt, einen deterministischen Lookahead), aber abstimmbare Parameter einzuführen, die die Lösung robuster machen können.

### Hybride Politiken

Neben den vier Klassen von Politiken können wir eine Vielzahl von Hybriden erstellen, die zwei, drei oder sogar alle vier Klassen kombinieren. Einige Beispiele unter Verwendung eines Lieferketten-Kontexts sind:

- CFAs mit PFAs – Auswahl des kostengünstigsten Lieferanten, aber mit Regeln zum Ausschluss von Hochrisikounternehmen.
- Lookahead (DLA) mit VFA – Optimierung des saisonalen Produktionsplans, mit Funktionen, die den Wert der Endbestände erfassen.
- Parametrisierte deterministische direkte Lookaheads (DLA/CFA) – Planung des saisonalen Produktionsplans unter Verwendung von $\theta$-Perzentil-Nachfrageprognosen (sagen wir, dem 80. Perzentil).
- VFA-Politik mit PFA – Distributionsplanung unter Verwendung von VFAs zur Bewertung des Bestands in jedem Lager, aber unter Verwendung von Regeln (PFAs), um Lieferungen an bestimmte Standorte zu erzwingen.
- VFA mit CFA – Beginn mit einer VFA-basierten Politik mit einem linearen Modell und anschließende Abstimmung der Parameter des linearen VFA, um die besten Ergebnisse mit einem Simulator zu erzielen.

Obwohl diese Politiken kompliziert klingen mögen, ist es möglich, spezifische Einstellungen zu beschreiben, in denen menschliche Entscheidungsfindung jede von ihnen verwendet. Zum Beispiel verwendet die komplexeste Politik einen stochastischen Lookahead, den wir oben anhand des Navigationsproblems mit Google Maps veranschaulicht haben, bei dem ein längerer Weg gewählt wurde, um das Risiko von Verkehrsstaus in New York City zu vermeiden.

### Welche Politiken werden am häufigsten verwendet?

Die Diskussion von Politiken kann kompliziert und verwirrend erscheinen. Es ist wichtig, sich daran zu erinnern, dass:

- Jeder trifft Entscheidungen. Wir alle stehen tagtäglich vor Situationen, sei es, um durch den Tag zu kommen, oder Entscheidungen, die in unserem Beruf anfallen.
- Wenn wir Entscheidungen treffen, verwendet unser Gehirn eine Methode, die zu einer der vier Klassen gehört (und möglicherweise zu einer Hybridform).

Beginnen wir damit, die vierte Klasse, DLAs, in zwei Typen zu unterteilen: deterministische Lookaheads und stochastische Lookaheads. Anschließend unterteilen wir den letzten Typ, stochastische Lookaheads, in zwei Untertypen: Probleme, bei denen Entscheidungen aus einer Menge diskreter Wahlmöglichkeiten bestehen, und Probleme, bei denen Entscheidungen Vektoren sind, wie etwa die Allokation von Vermögenswerten auf Investitionen oder die Zuweisung von Maschinen zu Aufgaben.

Damit erhalten wir sechs Typen von Politiken, die wir in vier Kategorien einteilen:

**Kategorie 1** - Diese Kategorie umfasst drei Typen von Politiken:

- Politikfunktionsapproximationen (PFAs), zu denen alle einfachen Regeln gehören, wie etwa „wenn es kalt ist, ziehe einen Mantel an" oder „kaufe ein Produkt, wenn es im Angebot ist." PFAs können regelbasiert sein, „wenn Zustand X vorliegt, führe Aktion Y aus", oder sie können eine analytische Funktion sein, ein Thema, auf das wir in Band III zurückkommen.
- Kostenfunktionsapproximationen (CFAs), zu denen jede Methode gehört, bei der wir ein deterministisches Optimierungsproblem lösen müssen (typischerweise eine Approximation des tatsächlichen Problems, das Unsicherheit beinhaltet), wie etwa unser Problem diskreter Entscheidungen in Abbildung 4.2.
- Deterministische Direct-Lookahead-Approximationen (Det-DLAs), bei denen wir in die Zukunft planen, wie es Google Maps tut, indem Punktschätzungen für jede unsichere Größe verwendet werden.

CFAs und Det-DLAs beinhalten beide das Lösen deterministischer Optimierungsprobleme; der einzige Unterschied besteht darin, dass CFAs nicht in die Zukunft planen, während DLAs dies tun.

**Kategorie 2** - Stochastische Lookahead-Politiken, bei denen Entscheidungen diskrete Wahlmöglichkeiten sind. Hier modellieren wir die Unsicherheit bei der Bewertung jeder Wahlmöglichkeit explizit. Diese werden häufig unter Verwendung von Entscheidungsbäumen untersucht.

**Kategorie 3** - Politiken, die auf Wertfunktionsapproximationen basieren, bei denen eine Entscheidung sowohl die unmittelbaren Kosten oder Erträge als auch eine Schätzung des zukünftigen Werts berücksichtigt, der sich aus dem Übergang in einen bestimmten Zustand ergibt. Dies ist eine fortgeschrittene und rechnerisch schwierige Klasse von Politiken, die für eine kleine Gruppe spezialisierter Probleme benötigt werden.

**Kategorie 4** - Stochastische Lookahead-Politiken, bei denen Entscheidungen Vektoren sind. Dies ist eine sehr komplexe Klasse von Problemen, die komplexe Strategien erfordert, da ein stochastischer Lookahead lediglich ein weiteres stochastisches Optimierungsproblem darstellt, bei dem Vereinfachungen eingeführt werden, um die Rechenkomplexität zu reduzieren.

Die Politiken in Kategorie 1 werden von jedem verwendet, unabhängig von formaler Ausbildung. Diese Politiken sind die einfachsten, erfordern jedoch die Einführung von Parametern, die abgestimmt werden müssen, was schwierig sein kann.

Menschliche Gehirne haben die natürliche Fähigkeit entwickelt, alle vier Klassen von Politiken zu nutzen, zumindest im Kontext diskreter Wahlmöglichkeiten. Wir wissen sogar, wie man zwischen den Klassen wechselt, ohne es zu merken. Wenn wir Schach spielen (und einige Erfahrung mit dem Spiel haben), führen wir die ersten Züge wahrscheinlich aus dem Gedächtnis aus (erfahrene Spieler sind in der Lage, ziemlich viele Züge aus dem Gedächtnis auszuführen). Dies ist eine reine PFA. Irgendwann jedoch beginnen wir darüber nachzudenken, was unser Gegner tun könnte, was eine Direct-Lookahead-Politik beinhaltet, typischerweise kombiniert mit VFAs, die den Wert des Verlusts wichtiger Figuren erfassen können.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Geben Sie die formale Definition einer Entscheidung, die informelle Definition und drei Beispiele für Entscheidungen an.</li>
<li>Erklären Sie, was mit einer „endogen kontrollierbaren Informationsklasse" gemeint ist. Welches sind die beiden anderen Informationsklassen, die im selben Kontext beschrieben werden?</li>
<li>Geben Sie Beispiele für Entscheidungen an, die in jede der folgenden Kategorien fallen:
  <ol type="a">
    <li>Binär.</li>
    <li>Eine Menge diskreter Wahlmöglichkeiten mit mindestens fünf Optionen.</li>
    <li>Es müssen mindestens 10.000 verschiedene Entscheidungen zu einem Zeitpunkt getroffen werden.</li>
  </ol>
</li>
<li>Nennen Sie fünf Beispiele für kontinuierliche Entscheidungen.</li>
<li>Geben Sie drei Beispiele für jeden der drei Entscheidungstypen an:
  <ol type="a">
    <li>Entscheidungen wirken sich auf physische Ressourcen aus.</li>
    <li>Entscheidungen wirken sich auf finanzielle Ressourcen aus.</li>
    <li>Entscheidungen wirken sich auf die Erhebung oder Verteilung von Information aus.</li>
  </ol>
</li>
<li>Nennen Sie drei Beispiele für Situationen, in denen Entscheidungen auf unterschiedlichen Zeitskalen getroffen werden müssen. Beschreiben Sie die Situation und den zeitlichen Ablauf der Entscheidungen.</li>
<li>Fassen Sie in eigenen Worten die vier Klassen von Politiken zusammen und geben Sie für jede ein Beispiel in einem bestimmten Problemkontext an.</li>
</ol>

**Modellierungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Geben Sie ein Beispiel für eine Entscheidung an, die in jede Kategorie fällt:
  <ol type="a">
    <li>Eine Entscheidung, die jede Minute (oder häufiger) getroffen werden muss.</li>
    <li>Eine Entscheidung, die täglich getroffen werden muss.</li>
    <li>Eine Entscheidung, die jährlich getroffen werden muss.</li>
  </ol>
</li>
<li>Identifizieren Sie die implizierten Entscheidungen in jeder Situation sowie den Entscheidungsträger, der jede Entscheidung trifft.
  <ol type="a">
    <li>Eine Person muss Medikamente einnehmen, die von ihrem Arzt verschrieben wurden, der Protokollen folgt, die von den Arzneimittelentwicklern erarbeitet wurden.</li>
    <li>Das Stromnetz muss einem Versorgungsunternehmen mitteilen, welche Dampfkraftwerke wann eingeschaltet werden sollen. Die Planungsentscheidungen werden von einem Computermodell getroffen, das am Vortag ausgeführt wird.</li>
    <li>Ein Fondsmanager muss entscheiden, wie viel Bargeld vorgehalten werden soll, um auf Einzahlungen und Rücknahmeanträge einzelner Anleger (kleine Beträge) und institutioneller Anleger (große Beträge) reagieren zu können.</li>
  </ol>
</li>
<li>Geben Sie drei Beispiele für Politikfunktionsapproximationen an. Beschreiben Sie den Kontext und wie die PFA funktionieren würde.</li>
<li>Geben Sie ein Beispiel für eine Kostenfunktionsapproximation für ein Problem diskreter Entscheidungen an.</li>
<li>Sie verwenden Google Maps, um einen Weg zu finden, damit Sie um 8:30 Uhr bei der Arbeit ankommen. Sie müssen auch entscheiden, wie viel Zeit Sie einplanen, um pünktlich anzukommen. Beschreiben Sie die getroffenen Entscheidungen und welcher Politiktyp für jede verwendet wird.</li>
<li>Beschreiben Sie so viele Klassen von Politiken, wie Sie verwenden würden, wenn Sie ein Computerprogramm zum Schachspielen entwerfen würden. Beschreiben Sie, wie jede von Ihnen identifizierte Politikklasse angewendet würde.</li>
</ol>
{% endraw %}
