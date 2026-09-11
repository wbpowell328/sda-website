---
layout: book
title: "Kapitel 5: Unsicherheiten"
permalink: /bridging-vol1/de/chapter-5/
date: 2026-07-17
book_home: /bridging-vol1/de/contents/
book_data: bridging_vol1_toc_de
lang: de
translated_from: en
translated_from_hash: cac007f7f894240f
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Sequentielle Entscheidungsprobleme müssen sich stets mit Unsicherheit auseinandersetzen, die typischerweise die anspruchsvollste Dimension bei Entscheidungen über die Zeit darstellt. Es gibt drei Arten, wie sich Unsicherheit auf die Leistung unseres Systems auswirkt:

1. Die Entscheidung, die wir zu einem Zeitpunkt treffen, wird nicht korrekt umgesetzt.
2. Die Leistung des Systems bei gegebener Entscheidung entspricht nicht dem, was wir zum Zeitpunkt der Entscheidung geschätzt haben.
3. Die Auswirkung einer aktuellen Entscheidung auf die Zukunft wird aufgrund von Veränderungen, die sich im weiteren Zeitverlauf ergeben, nicht korrekt eingeschätzt.

Obwohl wir nur drei Arten aufführen, wie sich Unsicherheit auf die Leistung auswirkt, tritt Unsicherheit in vielen Formen auf, weshalb manche Formen der Unsicherheit im Modellierungsprozess oft übersehen werden. Tatsächlich ignorieren die meisten Anwendungen von Optimierungswerkzeugen jegliche Form von Unsicherheit, was typischerweise den dramatischen Anstieg der Komplexität widerspiegelt, der durch die explizite Modellierung irgendeiner Form von Unsicherheit entsteht.

Ein Ziel dieses Kapitels ist es, die verschiedenen Arten hervorzuheben, wie Unsicherheit auftreten kann. Das bedeutet nicht, dass Modelle alle Formen von Unsicherheit berücksichtigen müssen. Die Entscheidung, eine Form von Unsicherheit zu ignorieren, sollte jedoch eine bewusste Wahl sein und nicht nur darauf zurückgehen, dass ein Modellierer sie übersehen hat.

## Die 12 Klassen von Unsicherheit {#12classesofuncertainty}

Ein Weg, sich der Identifikation von Unsicherheitsquellen zu nähern, besteht darin, von einem mathematischen Modell aus rückwärts zu arbeiten. Im Folgenden werden 12 Klassen von Unsicherheit vorgestellt, die aus der Perspektive erstellt wurden, wie Unsicherheit in ein Modell eingehen kann. Komplexe Probleme, wie die Steuerung einer Lieferkette, eines Energiesystems oder die Lösung eines Problems der öffentlichen Gesundheit, betreffen alle 12 Klassen, während einfache Probleme wie das Schachspielen möglicherweise nur eine einzige betreffen.

Es gibt gewisse Überlappungen zwischen den Klassen, machen Sie sich also keine Sorgen, wenn hinsichtlich der Zuordnung einer Unsicherheitsquelle eine gewisse Mehrdeutigkeit besteht. Wichtig ist, möglichst viele verschiedene Formen von Unsicherheit zu identifizieren.

1. **Beobachtungsfehler** – Diese stellen Fehler in Größen und Parametern dar, die wir aus der Umgebung beobachten müssen. Einige Beispiele könnten sein:
   - Der aktuelle Lagerbestand eines Produkts, wie er im Computer erfasst ist, der möglicherweise nicht mit dem tatsächlich vorhandenen Bestand übereinstimmt.
   - Medizinische Röntgenaufnahmen eines Patienten zur Krebserkennung.
   - Der Anteil der Wähler, die einen bestimmten Kandidaten für ein politisches Amt bevorzugen.
2. **Exogene Unsicherheit** – Dies ist Information, die nach dem Treffen einer Entscheidung in unserem System eintreffen wird, wie zum Beispiel:
   - Die Nachfrage nach einem auf dem Markt verkauften Produkt.
   - Die Preisänderung einer Aktie.
   - Die Zeit, die benötigt wird, um von einer Stadt zur nächsten zu fahren.
   - Der Betrag an Bargeld, der morgen eingezahlt oder abgehoben werden könnte.
   - Wie ein Patient auf eine Art von Medikation reagiert.
3. **Prognostische Unsicherheit** – Dies sind Fehler in Prognosen von Nachfragen, Preisen, Fahrzeiten (jede Größe, die wir prognostizieren könnten).
4. **Inferentielle Unsicherheit** – Dies erfasst die Unsicherheit in unseren Schätzungen des aktuellen Zustands der Welt. Dies könnte Folgendes umfassen:
   - Wie der Markt auf eine Preisänderung reagieren könnte. Wir könnten denken, dass es bei einer Preiserhöhung von 5 Prozent einen Nachfragerückgang von 10 Prozent gibt, aber der wahre Wert könnte ein Rückgang der Nachfrage um 12 Prozent sein.
   - Wir denken, dass ein Krebspatient sich im Stadium 2 befindet, aber es könnte Stadium 3 sein. Wir könnten Brustkrebs entdecken, aber übersehen, dass er sich auf andere Organe ausgebreitet hat.
   - Eine Präsidentschaftskampagne könnte denken, dass 10 Millionen Dollar Werbeausgaben in einem wichtigen Markt eine Steigerung der Beliebtheit eines Kandidaten um 2 Prozent bewirken könnten, aber die Realität könnte höher oder niedriger ausfallen.
5. **Experimentelle Unsicherheit** – Dies beschreibt die Variation aus wiederholten Experimenten, entweder in einem Labor, einem Simulator oder im Feld:
   - Ein Hersteller führt Experimente zu einem Prozess zur Herstellung von Silizium-Wafern durch. Der Test kann 10 Mal wiederholt werden, wobei sich eine Streuung der Ausbeuten zwischen 70 und 90 Prozent ergibt.
   - Ein Unternehmen evaluiert eine neue Marketingkampagne, indem es sie in fünf verschiedenen Testmärkten durchführt. Es wird Abweichungen zwischen den Märkten und über die Zeit geben.
   - Ein Computersimulator wird verwendet, um die Leistung einer Bestellpolitik für den Lagerbestand zu testen. Jeder Durchlauf des Simulators wird unterschiedliche Ergebnisse liefern.
6. **Modellunsicherheit** – Dies ist ein Oberbegriff, der mehrere Quellen von Unsicherheit abdecken kann, aber eine der wichtigsten ist die Unsicherheit im Modell, wie sich ein Prozess über die Zeit entwickelt. Beispiele könnten sein:
   - Wie das Klima auf Änderungen in Politiken zur Kontrolle von Kohlenstoff reagiert.
   - Wie ein Patient auf Insulininjektionen reagiert.
   - Wie sich eine Krankheit in einer Bevölkerung als Reaktion auf Änderungen in Politiken bezüglich der Verteilung von Impfstoffen ausbreitet.
7. **Übergangsunsicherheit** – Dies ist Rauschen darin, wie ein System auf eine Steuerung reagiert. Das einfachste Beispiel wäre die Steuerung des Flugpfads einer Rakete oder eines Flugzeugs, das vom Wind durchgeschüttelt wird. Wir nehmen typischerweise an, dass die Entwicklung des Systems bekannt und deterministisch ist, jedoch von einem exogenen Prozess (wie dem Wind) beeinflusst wird.
8. **Implementierungsunsicherheit** – Es kann einen Unterschied geben zwischen dem, was wir zu tun beschließen, und der Entscheidung, die tatsächlich im Feld umgesetzt wird. Zum Beispiel:
   - Der Arzt verordnet eine bestimmte Medikation, aber der Patient nimmt sie nicht ein oder nimmt die falsche Dosis.
   - Ein Wissenschaftler möchte eine bestimmte Materialkombination testen, aber der Praktikant bestellt einen falschen Artikel (Fehler wie dieser können zu bedeutenden Durchbrüchen führen!).
   - Das Stromnetz ordnet an, dass ein Generator um 13 Uhr eingeschaltet wird, aber der lokale Betreiber schaltet den Generator erst um 14 Uhr ein.
9. **Kommunikationsfehler** – Anweisungen an das Feld können schlicht falsch übermittelt werden. Die Person, die die Anweisung erhält, denkt möglicherweise, dass sie das Gewünschte tut, hat aber eine Anweisung einfach nicht gehört oder verstanden.
10. **Algorithmische Instabilität** – Es gibt einige Situationen, in denen das wiederholte Ausführen eines Algorithmus unterschiedliche Lösungen liefern kann:
    - Komplexe Probleme erfordern oft den Einsatz ausgeklügelter Algorithmen, die ein Element der Variabilität einführen, was häufig auftritt, wenn ein Algorithmus parallele Verarbeitung nutzt. Die Geschwindigkeit paralleler Prozessoren kann beeinflussen, wer zuerst fertig wird, was den Gesamtverlauf des Algorithmus beeinflussen kann.
    - Algorithmen zur Lösung stochastischer Optimierungsprobleme hängen oft von Monte-Carlo-Stichproben ab, die bei jedem Durchlauf des Algorithmus unterschiedliche Ergebnisse liefern (dies zeigt sich beim Ausführen großer Sprachmodelle).
11. **Zielunsicherheit** – Unternehmen, die Gruppen von Menschen benötigen, um Entscheidungen zu treffen (Disposition von Lastwagen, Handel mit Finanzanlagen, Gebote auf Energieverträge), können Variationen aufweisen, weil unterschiedliche Personen unterschiedliche Leistungskennzahlen betonen.
12. **Umgebungsunsicherheit** – Hier könnte „Umgebung“ Klima widerspiegeln, oder ein politisches Umfeld (das Politiken oder Zölle beeinflussen könnte), oder ein neues Management in einem Unternehmen (das zu einer Veränderung der Prioritäten führt).

## Beispiele aus ausgewählten Anwendungen {#examples-from-selected-applications}

Es hilft, Beispiele für jede der 12 Klassen bei einigen der Anwendungen zu betrachten, die wir in Kapitel 2 vorgestellt haben. Für jede Anwendung beschreiben wir ein oder mehrere Beispiele der Unsicherheiten für jede Klasse, wobei anzumerken ist, dass einfachere Anwendungen nicht Unsicherheiten für alle 12 Klassen aufweisen werden. Es ist wichtig, sich zu merken, dass das eigentliche Ziel hier darin besteht, so viele Unsicherheitsquellen wie möglich zu erkennen. Wie diese Unsicherheiten im Prozess der Entscheidungsfindung berücksichtigt werden, wird in zukünftigen Bänden behandelt.

### Cash-Management für einen Investmentfonds

Ein Investmentfonds muss bestimmen, wie viel Bargeld vorzuhalten ist, um Rückgabeanfragen zu erfüllen, sowie wie Einlagen sowohl von privaten als auch von institutionellen Anlegern getätigt werden.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.1.</span> Unsicherheiten im Problem des Cash-Bestands eines Investmentfonds.</caption>
<thead>
<tr><th>Klassen von Unsicherheit</th><th>Cash-Bestand des Investmentfonds</th></tr>
</thead>
<tbody>
<tr><td>1. Beobachtungsunsicherheit</td><td></td></tr>
<tr><td>2. Exogene Unsicherheit</td><td>Einlagen, Rückgaben, Marktindizes</td></tr>
<tr><td>3. Prognostische Unsicherheit</td><td>Prognosen von Einlagen, Rückgaben, Marktindizes, Zinssätzen</td></tr>
<tr><td>4. Inferentielle Unsicherheit</td><td>Schätzung, wie sich Rückgaben mit der Marktentwicklung ändern</td></tr>
<tr><td>5. Experimentelle Variabilität</td><td>Testen verschiedener Politiken zur Bargeldhaltung</td></tr>
<tr><td>6. Modellunsicherheit</td><td></td></tr>
<tr><td>7. Übergangsunsicherheit</td><td>Aktualisierung des vorhandenen Bargeldbestands</td></tr>
<tr><td>8. Implementierungsunsicherheit</td><td></td></tr>
<tr><td>9. Kommunikationsfehler</td><td></td></tr>
<tr><td>10. Algorithmische Instabilität</td><td></td></tr>
<tr><td>11. Zielunsicherheit</td><td>Abwägung zwischen Maximierung der Anlagerenditen und Minimierung von Aktienverkäufen für Rückgaben</td></tr>
<tr><td>12. Umgebungsunsicherheit</td><td>Änderungen der Zinssätze</td></tr>
</tbody>
</table>
</div>

### Die beste Diabetesbehandlung finden

Diabetespatienten müssen ihren Blutzucker mit einer Kombination aus Medikamenten (möglicherweise unter Verwendung einer Insulinpumpe) und Ernährung steuern.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.2.</span> Unsicherheiten im Management des Blutzuckers.</caption>
<thead>
<tr><th>Klassen von Unsicherheit</th><th>Blutzuckermanagement</th></tr>
</thead>
<tbody>
<tr><td>Beobachtungsunsicherheit</td><td>Messung der A1c-Werte</td></tr>
<tr><td>Exogene Unsicherheit</td><td>Was ein Patient isst</td></tr>
<tr><td>Prognostische Unsicherheit</td><td>Antizipation von Veränderungen des Blutzuckerspiegels nach einer Mahlzeit</td></tr>
<tr><td>Inferentielle Unsicherheit</td><td>Schätzung, wie der Blutzucker eines Patienten auf Medikation reagiert</td></tr>
<tr><td>Experimentelle Variabilität</td><td>Veränderungen des Blutzuckers bei verschiedenen Medikationsarten</td></tr>
<tr><td>Modellunsicherheit</td><td>Modellierung, wie ein Patient auf eine Art von Medikation reagiert</td></tr>
<tr><td>Übergangsunsicherheit</td><td></td></tr>
<tr><td>Implementierungsunsicherheit</td><td>Ob ein Patient den Anweisungen seines Arztes folgt</td></tr>
<tr><td>Kommunikationsfehler</td><td>Ob ein Patient die Anweisungen des Arztes missversteht</td></tr>
<tr><td>Algorithmische Instabilität</td><td></td></tr>
<tr><td>Zielunsicherheit</td><td>Abwägung zwischen Blutzuckersenkung und Verdauungsproblemen</td></tr>
<tr><td>Umgebungsunsicherheit</td><td></td></tr>
</tbody>
</table>
</div>

### Lieferkettenmanagement

Lieferketten erfordern die Steuerung von Beständen, die systemübergreifend koordiniert werden müssen.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.3.</span> Unsicherheiten im Lieferkettenmanagement.</caption>
<thead>
<tr><th>Klassen der Unsicherheit</th><th>Lieferkettenmanagement</th></tr>
</thead>
<tbody>
<tr><td>1. Beobachtungsunsicherheit</td><td>Messung des Bestands</td></tr>
<tr><td>2. Exogene Unsicherheit</td><td>Marktnachfrage, Wetter, Transportzeiten</td></tr>
<tr><td>3. Prognoseunsicherheit</td><td>Vorhersage von Nachfrage, Produktion, Kündigungen</td></tr>
<tr><td>4. Inferenzunsicherheit</td><td>Marktreaktion auf Preise, Maschinenausfallraten</td></tr>
<tr><td>5. Experimentelle Variabilität</td><td>Simulationsfehler, Testen neuer Materialien, Testmarketing</td></tr>
<tr><td>6. Modellunsicherheit</td><td>Wie sich Informationen im Markt verbreiten, wie Mitarbeiter auf Anreize reagieren</td></tr>
<tr><td>7. Übergangsunsicherheit</td><td>Aktualisierung von Beständen</td></tr>
<tr><td>8. Umsetzungsunsicherheit</td><td>Nichtbefolgen von Anweisungen</td></tr>
<tr><td>9. Kommunikationsfehler</td><td>Falsche Anweisungen an Lieferanten</td></tr>
<tr><td>10. Algorithmische Instabilität</td><td>Abweichungen der optimalen Lösung bei Produktionsplänen</td></tr>
<tr><td>11. Zielunsicherheit</td><td>Unterschiede in den Prioritäten zwischen Produktionskosten und Nachfragedeckung</td></tr>
<tr><td>12. Umgebungsunsicherheit</td><td>Änderungen bei Zöllen, Wechselkursen, Zinssätzen</td></tr>
</tbody>
</table>
</div>

### Zuteilung von Naloxon-Kits

Staatliche Behörden müssen Naloxon-Kits zuteilen, um den Bedarf lokaler Kliniken und medizinischer Fachkräfte zu decken, die Patienten behandeln.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.4.</span> Unsicherheiten bei der Verwaltung von Naloxon-Kits.</caption>
<thead>
<tr><th>Klassen der Unsicherheit</th><th>Verwaltung von Naloxon-Kits</th></tr>
</thead>
<tbody>
<tr><td>Beobachtungsunsicherheit</td><td>Die Anzahl der Naloxon-Kits im Bestand</td></tr>
<tr><td>Exogene Unsicherheit</td><td>Die Anzahl der Ereignisse, die den Einsatz von Naloxon-Kits erfordern</td></tr>
<tr><td>Prognoseunsicherheit</td><td>Schätzungen von Veränderungen in den Mustern des Drogenkonsums</td></tr>
<tr><td>Inferenzunsicherheit</td><td>Schätzungen, wie die Verfügbarkeit von Kits deren Nutzung beeinflusst</td></tr>
<tr><td>Experimentelle Variabilität</td><td></td></tr>
<tr><td>Modellunsicherheit</td><td>Verständnis, wie sich Muster des Drogenkonsums im Laufe der Zeit verändern</td></tr>
<tr><td>Übergangsunsicherheit</td><td>Veränderungen der Naloxon-Kit-Bestände von Woche zu Woche</td></tr>
<tr><td>Umsetzungsunsicherheit</td><td>Ob Kits korrekt verwendet werden; ob Anweisungen zur Zuteilung befolgt werden</td></tr>
<tr><td>Kommunikationsfehler</td><td>Ob Außendienstmitarbeiter die Anweisungen zur Ausgabe der Kits befolgen</td></tr>
<tr><td>Algorithmische Instabilität</td><td></td></tr>
<tr><td>Zielunsicherheit</td><td>Priorisierung, wer mit Naloxon-Kits versorgt werden soll</td></tr>
<tr><td>Umgebungsunsicherheit</td><td>Verfügbarkeit von Finanzmitteln für Naloxon-Kits</td></tr>
</tbody>
</table>
</div>

### Verwaltung einer Lkw-Flotte

Speditionsunternehmen für Ganzladungstransporte müssen entscheiden, welche Ladungen mit welchem Fahrer bewegt werden.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.5.</span> Unsicherheiten bei der Verwaltung einer Lkw-Flotte.</caption>
<thead>
<tr><th>Klassen der Unsicherheit</th><th>Verwaltung einer Lkw-Flotte</th></tr>
</thead>
<tbody>
<tr><td>Beobachtungsunsicherheit</td><td></td></tr>
<tr><td>Exogene Unsicherheit</td><td>Neue Ladungen von Verladern; abgelehnte Aufträge durch Fahrer; Verkehrsverzögerungen</td></tr>
<tr><td>Prognoseunsicherheit</td><td>Prognosen künftiger Ladungen</td></tr>
<tr><td>Inferenzunsicherheit</td><td>Wie der Markt auf Änderungen der Spotpreise reagieren wird</td></tr>
<tr><td>Experimentelle Variabilität</td><td>Durchführung von Simulationen zu Änderungen der Fahrerzuteilungen</td></tr>
<tr><td>Modellunsicherheit</td><td></td></tr>
<tr><td>Übergangsunsicherheit</td><td>Veränderungen bei der Anzahl verfügbarer Ladungen; Aktualisierungen der Fahrerverfügbarkeit</td></tr>
<tr><td>Umsetzungsunsicherheit</td><td>Ob ein Disponent den Anweisungen des Modells folgt</td></tr>
<tr><td>Kommunikationsfehler</td><td>Ob Disponenten den Anweisungen ihrer Manager folgen</td></tr>
<tr><td>Algorithmische Instabilität</td><td>Veränderungen der Lösung durch Aktualisierungen der Schätzungen der Fahrerwerte</td></tr>
<tr><td>Zielunsicherheit</td><td>Abwägung zwischen Leerkilometern, Verladerverpflichtungen und der Heimkehr der Fahrer</td></tr>
<tr><td>Umgebungsunsicherheit</td><td>Änderungen der Lenk- und Ruhezeitenregelungen durch das Verkehrsministerium</td></tr>
</tbody>
</table>
</div>

### Planung eines Stromnetzes

Das Stromnetz muss mit Versorgungsunternehmen zusammenarbeiten, um zu bestimmen, welche Generatoren eingeschaltet werden sollen, um die erwartete Nachfrage im Netz zu decken.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 5.6.</span> Unsicherheiten bei der Verwaltung des Stromnetzes.</caption>
<thead>
<tr><th>Klassen der Unsicherheit</th><th>Verwaltung des Stromnetzes</th></tr>
</thead>
<tbody>
<tr><td>Beobachtungsunsicherheit</td><td>Schätzung von Temperatur, Wetter, Kundenverhalten</td></tr>
<tr><td>Exogene Unsicherheit</td><td>Wetteränderungen, Generatorausfälle</td></tr>
<tr><td>Prognoseunsicherheit</td><td>Vorhersagen von Temperatur, Wind, Bewölkung</td></tr>
<tr><td>Inferenzunsicherheit</td><td>Schätzung, wie sich die Stromnachfrage bei Änderungen der Netzpreise verändert</td></tr>
<tr><td>Experimentelle Variabilität</td><td>Variabilität der Reaktion auf Änderungen der Modellparameter</td></tr>
<tr><td>Modellunsicherheit</td><td>Fehler in der Entwicklung der Windgeschwindigkeiten über eine geografische Region</td></tr>
<tr><td>Übergangsunsicherheit</td><td>Unterschied zwischen erwarteter und tatsächlicher Windkraft</td></tr>
<tr><td>Umsetzungsunsicherheit</td><td>Unterschiede zwischen Anweisungen an Versorgungsunternehmen und deren tatsächlichem Handeln</td></tr>
<tr><td>Kommunikationsfehler</td><td>Fehler im Verständnis der an Versorgungsunternehmen übermittelten Anweisungen</td></tr>
<tr><td>Algorithmische Instabilität</td><td>Schwankungen in der Leistung des Algorithmus der ganzzahligen Programmierung</td></tr>
<tr><td>Zielunsicherheit</td><td>Abwägung zwischen Kernkraft, Kohle und erneuerbaren Energien</td></tr>
<tr><td>Umgebungsunsicherheit</td><td>Änderungen der Richtlinien zur Vergütung überschüssiger Solarerzeugung</td></tr>
</tbody>
</table>
</div>

## Wie Unsicherheit die Leistung beeinflusst

Wir haben zwar 12 Klassen der Unsicherheit identifiziert, doch es gibt nur drei Arten, wie Unsicherheit das Verhalten eines Modells beeinflusst:

1. Wie Entscheidungen getroffen werden.
2. Die Leistungskennzahlen der im Modell gewählten Entscheidungen.
3. Die Entwicklung des Systems im Modell nach einer Entscheidung und bevor die nächste Entscheidung getroffen werden muss.

Dann gibt es die Arten, wie Unsicherheit die Leistung im Feld beeinflusst:

<ol start="4">
<li>Die Entscheidungen, die im Feld umgesetzt werden.</li>
<li>Die tatsächlichen Leistungskennzahlen für die im Feld umgesetzten Entscheidungen.</li>
<li>Die Entwicklung des Systems im Feld.</li>
</ol>

Es gibt viele Arten, wie Unsicherheit die Leistung beeinflusst, von zufälligen Kosten über die Reaktion eines Patienten auf ein Medikament bis hin zum Preis einer Investition. Für den Moment konzentrieren wir uns nur darauf, zu identifizieren, wie Unsicherheit die Leistung beeinflusst.

## Verschiedene Formen der Unsicherheit

Der erste Schritt zum Verständnis der Unsicherheit besteht darin, die verschiedenen Quellen der Unsicherheit aufzulisten, wie wir es oben getan haben. Der nächste Schritt besteht dann darin, die verschiedenen Formen zu beschreiben, in denen die Unsicherheit auftritt. Im Folgenden findet sich eine Auswahl davon:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Hourly energy output from solar over an entire year, demonstrating both with-day and seasonal variability." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 5.1.</span> Stündlicher Energieertrag aus Solarenergie über ein ganzes Jahr, der sowohl die Variabilität im Tagesverlauf als auch die saisonale Variabilität zeigt.</figcaption>
</figure>

- **Feingranulare Variabilität** – Diese kann auf Zeitskalen von Sekunden (sogar Sekundenbruchteilen), Minuten, Stunden oder Tagen auftreten. Beispiele für feingranulare Variabilität sind:
  - Hochfrequenzhandel im Finanzwesen – Diese Entscheidungen werden mehrmals pro Sekunde getroffen.
  - Frequenzregelung für das Stromnetz – Dies sind Signale, die alle zwei Sekunden an Generatoren gesendet werden, um Anpassungen vorzunehmen, damit die Netzspannung innerhalb eines engen Bereichs bleibt.
  - Stündliche Verkäufe verschiedener Restaurantgerichte, die möglicherweise eine gewisse Vorbereitung vor dem Servieren erfordern.
  - Die stündlichen Schwankungen der Windgeschwindigkeiten, dargestellt in Abbildung 5.1. Diese Abbildung würde auch stündliche bis tägliche Schwankungen der Bewölkung erfassen, alles im Kontext vorhersehbarer saisonaler Schwankungen.
  - Tägliche Verkäufe eines Einzelhandelsprodukts.
  - Tägliche bis wöchentliche Schwankungen bei Krankenhauseinweisungen wegen Grippe.

- **Verschiebungen** – Die feingranulare Variabilität eines Prozesses stellt typischerweise Schwankungen um einen Mittelwert dar, aber es gibt Zeiten, in denen sich der Mittelwert verschiebt. Beispiele sind:
  - Die zufällige Nachfrage nach einem Einzelhandelsprodukt kann sich als Folge einer Preisänderung entweder des Produkts selbst oder eines Konkurrenzprodukts verschieben.
  - Die Rate der Krankenhauseinweisungen wegen einer Infektionskrankheit verschiebt sich, wenn sich die Krankheit durch eine Bevölkerung in der Nähe des Krankenhauses ausbreitet.
  - Die Nachfrage nach Rücknahmen aus einem Investmentfonds, die minütlich schwankt, verschiebt sich, wenn der breitere Aktienmarkt auf eine sich verändernde Wirtschaft reagiert.
  - Die Anzahl der Personen, die Gebote auf Häuser abgeben (etwa für einen bestimmten Makler), verschiebt sich auf andere Niveaus, wenn sich die Zinssätze ändern.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/Bursts.png" alt="Illustration of bursts of activity." style="max-width: 485px;">
  <figcaption><span class="fig-num">Abbildung 5.2.</span> Darstellung von Aktivitätsschüben.</figcaption>
</figure>

- **Schübe, intermittierende Nachfragen** – Diese beschreiben Muster, bei denen es wenig oder keine Aktivität gibt, die dann jedoch einen Schub durchläuft, bis sie wieder abklingt (siehe Abbildung 5.2). Beispiele für Schübe sind:
  - Die Ausbreitung von Krankheiten wie Masern – Wenn eine Krankheit in eine Region eindringt, gibt es eine Phase erhöhter Infektionen, während sich die Krankheit durch den verletzlichsten Teil der Bevölkerung bewegt.
  - Ein Produkt verkauft sich möglicherweise nicht, bis jemand zufällig zugreift und dann, nachdem er eine gute Erfahrung gemacht hat, dies weitererzählt. Dies breitet sich durch dessen Netzwerk aus, bis es gesättigt ist.

- **Spitzen** – Ein Prozess kann zwei treibende Quellen widerspiegeln. Die eine erzeugt moderate Ergebnisse aus einer klar definierten Verteilung. Die zweite stellt seltene Ergebnisse dar, die viel größer sind als die der ersten Verteilung. Zum Beispiel:
  - Der Strompreis im Netz wird alle 5 Minuten aktualisiert. Abbildung 5.3 zeigt die Echtzeit-Netzpreise für den Monat Februar. Sie zeigt eine stetige Abfolge zufälliger Änderungen mit gelegentlichen Spitzen, die viel größer sind als die typischen Schwankungen.
  - Ein Sturm löst einen Ansturm von Käufen von Milch, Eiern und Toilettenpapier aus.
  - Ein Sturmsystem, das an einem Flughafen vorbeizieht, kann zu einer Reihe von Flugausfällen führen, was wiederum eine große Anzahl kurzfristiger Anfragen nach Hotelzimmern zur Folge haben kann.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/RealTimePricesFebruary.png" alt="Real-time electricity prices, updated every five minutes, in February, illustrating extreme volatility." style="max-width: 485px;">
  <figcaption><span class="fig-num">Abbildung 5.3.</span> Echtzeit-Strompreise, alle fünf Minuten aktualisiert, im Februar, die eine extreme Volatilität veranschaulichen.</figcaption>
</figure>

- **Räumliche Ereignisse (Wetter, Krankheiten, regulatorisch)** – Es gibt zahlreiche Beispiele für zufällige Prozesse, die regionaler Natur sind. Einige Beispiele sind:
  - Wetter – Stürme können eine Reihe zufälliger Ereignisse in einer Region auslösen, die von schlechtem Wetter betroffen ist oder für die schlechtes Wetter vorhergesagt wird.
  - Krankheiten – Da die Ausbreitung von Krankheiten oft physischen Kontakt erfordert, folgen Ausbrüche typischerweise einem regionalen Muster.
  - Regulierungen – Änderungen in Vorschriften folgen typischerweise politischen Grenzen, die für ein Land oder einen Bundesstaat, Bezirk oder eine Provinz innerhalb eines Landes gelten können.
- **Systemische Ereignisse** – Dies sind Ereignisse, die ein gesamtes Unternehmen (über internationale Grenzen hinweg), ein ganzes Land oder sogar globale Auswirkungen haben können, wie zum Beispiel:
  - Cyberangriffe, die den Informationsfluss eines gesamten Unternehmens beeinträchtigen können.
  - Öffentliche Wahrnehmung – Öffentliche Ereignisse können schnell positive oder negative Wahrnehmungen eines Unternehmens hervorrufen. Zum Beispiel startete ein Bierunternehmen eine Kampagne zur Förderung der LGBTQ-Community, was einen plötzlichen Widerstand ihrer konservativen Kunden hervorrief, der sich auf die Verkäufe des gesamten Unternehmens auswirkte.
- **Seltene Ereignisse** – Seltene Ereignisse können aus einer Reihe von Quellen entstehen, wie Erdbeben, Krankheitsausbrüche oder Terroranschläge. Dies sind in der Regel anerkannte Ereignisse, die eher selten auftreten, aber erhebliche Auswirkungen auf eine Organisation haben können, wenn sie eintreten.
- **Eventualitäten** – Diese Kategorie bezieht sich auf Ereignisse, die eintreten könnten, für die es aber keine Historie gibt. Zum Beispiel planen Netzbetreiber für den Ausfall von Kernkraftwerken. Auch wenn dies innerhalb eines Landes noch nie vorgekommen sein mag, möchte der Netzbetreiber möglicherweise dennoch für den Fall vorbereitet sein, dass es eintritt.

## Saisonalität

Eine andere Form der Variabilität wird unter dem allgemeinen Begriff "Saisonalität" erfasst, die in verschiedenen Formen auftritt:

- **Tageszyklen** – Auch als diurnale Zyklen bekannt, lassen sich diese letztlich alle auf Sonnenzyklen zurückführen, können aber starke tägliche Muster im menschlichen Verhalten hervorrufen. Tageszyklen werden typischerweise in Stunden diskretisiert, aber feinere Diskretisierungen (5 Minuten, 1 Minute) können auftreten.
- **Wochentag** – Dies spiegelt die täglichen Muster im menschlichen Verhalten wider, die sich um die verschiedenen Wochentage herum ergeben.
- **Stunde der Woche** – Stündliche Muster können sowohl vom Wochentag als auch von der Tageszeit abhängen, um Effekte wie Montagmorgen, Freitagnachmittag sowie tägliche Muster an Wochentagen im Vergleich zu Wochenenden zu erfassen.
- **Woche des Monats** – In der Fertigung besteht oft der Drang, die Produktion pro Monat zu maximieren, was einen Anreiz schafft, Produkte vor Monatsende auszuliefern. Dies erzeugt einen Anstieg gegen Monatsende, gefolgt von einer Flaute.
- **Monat des Jahres** – Dies erfasst die bekannten saisonalen Muster von Winter, Frühling, Sommer und Herbst.
- **Woche des Jahres** – Saisonale Veränderungen können innerhalb eines Monats auftreten, was die Verwendung der Kalenderwoche als saisonale Zeiteinheit begünstigt.

Abbildung 5.4 (links) zeigt die Solarenergieerzeugung im Verlauf einer Woche und veranschaulicht sowohl das bekannte und hochgradig vorhersehbare Muster, das durch die Sonne erzeugt wird, welches durch die hochgradig stochastische Präsenz von Wolkenbedeckung gestört wird. Abbildung 5.4 (rechts) zeigt die stündliche Solarenergie über das gesamte Jahr, wobei wir deutlich die Reduzierung der Solarenergie während der Wintersaison erkennen können.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DailyAnnualSolarEnergy.jpg" alt="Daily solar energy over a week (left), and annual solar energy (right).">
  <figcaption><span class="fig-num">Abbildung 5.4.</span> Tägliche Solarenergie über eine Woche (links), und jährliche Solarenergie (rechts).</figcaption>
</figure>

## Erstellung von Beliefs

Wenn wir Unsicherheit auf dem Computer modellieren, müssen wir einen Weg finden, sie darzustellen. Im Folgenden werden mehrere gängige Strategien vorgestellt.

- Historische Daten können verwendet werden, um eine bekannte Wahrscheinlichkeitsverteilung anzupassen – Es gibt eine ganze Familie von Wahrscheinlichkeitsverteilungen, die wir verwenden können, um sie an historische Daten anzupassen, wobei die bekannteste die Normalverteilung ist. Wir kommen später auf dieses umfangreiche Thema zurück.
- Verwendung historischer Daten zur Erstellung eines gesampelten Belief-Modells – Stellen wir uns vor, wir haben Reisezeiten zwischen 50 und 80 Minuten für eine Fahrt, abhängig vom Verkehr. Wir können jede von mehreren Wahrscheinlichkeitsverteilungen verwenden, um diese Unsicherheit darzustellen, oder wir können einfach eine Stichprobe vergangener Beobachtungen verwenden, wie zum Beispiel:

  > (52, 63, 78, 59, 71, 68)

- Verwendung historischer Daten zur Erstellung einer Quantilverteilung, aus der Stichproben gezogen werden können – Nehmen wir an, wir haben eine Stichprobe von 10 Beobachtungen von Strompreisen, dargestellt in Abbildung 5.5 (links). Nach dem Sortieren der Preise vom kleinsten zum größten zeigen wir dann die kumulative Wahrscheinlichkeit, die in Abbildung 5.5 (rechts) dargestellt ist. Wir würden also sagen, dass 60 Prozent der Beobachtungen bei 86,33 \$ oder darunter liegen. Diese werden dann in der kumulativen Verteilung auf der rechten Seite dargestellt.

  Es ist auch möglich, eine kumulative Verteilung manuell unter Verwendung von Einschätzungen zu erstellen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/EmpiricalCDF.png" alt="Computing an empirical CDF from a set of observations." style="max-width: 485px;">
  <figcaption><span class="fig-num">Abbildung 5.5.</span> Berechnung einer empirischen CDF aus einer Menge von Beobachtungen.</figcaption>
</figure>

- Verwendung manuell erstellter Ergebnisse zur Darstellung von Ereignissen, die eintreten könnten – Wenn wir keine Daten haben, können wir einfach mögliche Ergebnisse erfinden. Zum Beispiel könnten wir Produkte aus Taiwan verschiffen, was normalerweise vier Wochen dauert. Wir können uns jedoch verschiedene Formen von Verzögerungen vorstellen, von Hurrikanen bis hin zu Rückstaus im Suezkanal, Arbeitsproblemen in Häfen oder sogar Terroranschlägen. Wir könnten der Ansicht sein, dass wir die Möglichkeit berücksichtigen müssen, dass die Sendung bis zu neun Wochen dauern könnte, und dann für diese Eventualität planen.

## Das Problem der Korrelationen

Der vorherige Abschnitt ist ein kurzer Überblick über Möglichkeiten, die Unsicherheit einer Schätzung darzustellen. Sobald wir jedoch den Weg der Anerkennung von Unsicherheit einschlagen, müssen wir uns dem weitaus komplexeren Thema der Korrelationen stellen.

Es hilft, einige Beispiele von Informationsprozessen vor Augen zu haben, um verschiedene Formen der Korrelation zu veranschaulichen. Nehmen wir an, wir betrachten irgendeinen der folgenden Datenströme:

1. Kunden, die ein Einzelhandelsprodukt an vielen Verkaufsstandorten kaufen.
2. Die Vorlaufzeit von der Bestellaufgabe bis zum Erhalt.
3. Die von einem Windpark erzeugte Energie.
4. Die Rate neuer Infektionen durch den neuesten Grippestamm.
5. Die Anzahl der LKW-Ladungstransporte, die ein Kunde an verschiedene Standorte vergibt.

Dies sind nur eine kleine Auswahl der Arten von Informationsströmen, mit denen wir uns befassen müssen. Im Folgenden verwenden wir diese Beispiele, um über drei verschiedene Arten von Korrelationen zu sprechen:

- Korrelationen über die Zeit.
- Korrelationen über die Geografie.
- Korrelationen über Attribute.

### Korrelationen über die Zeit

Alle sequentiellen Entscheidungsprobleme beinhalten das Element der Zeit, das auf praktisch jeder Zeitskala liegen kann, von Sekunden, Minuten, Stunden und Tagen bis hin zu Wochen, Monaten und sogar Jahren.

Korrelation über die Zeit kann in jedem unserer fünf Problemkontexte wie folgt auftreten:

1. Ein herannahender Schneesturm kann einen Nachfrageanstieg nach Schneefräsen erzeugen; negative Publicity kann eine Periode reduzierter Nachfrage erzeugen.
2. Ein Hafenstreik kann Rückstände erzeugen, die die Entladezeiten über Monate hinweg erhöhen.
3. Regenstürme können Perioden erhöhter Winderzeugung erzeugen, die tagelang andauern können.
4. Wenn ein Virus in eine Region eindringt, erzeugt es eine Periode erhöhter Infektionen, die von Wochen bis Monaten andauern kann.
5. Wenn eine Anlage für Wartungsarbeiten geschlossen wird, kann es zu einem Rückgang der Auslastungen von einem Standort über eine Woche kommen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/CrossingTimes.png" alt="Actual vs. forecast, showing crossing times." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 5.6.</span> Tatsächlicher Wert vs. Prognose, mit Darstellung der Kreuzungszeiten.</figcaption>
</figure>

Abbildung 5.6 veranschaulicht, wie die aus Wind erzeugte Energie über einen Zeitraum hinweg die Prognose übersteigen oder unterschreiten kann, während Wettersysteme durch eine Region ziehen. Es ist wichtig, dass wir nicht nur den Fehler zwischen tatsächlichem Wert und Vorhersage replizieren, sondern auch die Zeitspanne, die wir über oder unter der Prognose bleiben, eine Größe, die als "Kreuzungszeit" bekannt ist.

Es ist recht üblich, zufällige Signale als Abweichungen von einem Basismittelwert zu betrachten, der üblicherweise als eine Konstante behandelt wird, die geschätzt werden muss. In Wirklichkeit kann der "Basismittelwert" ebenfalls variieren, jedoch auf einer anderen Zeitskala. Zum Beispiel stellen Kunden, die ein Einzelhandelsgeschäft betreten, zufällige Ergebnisse auf einer feinen Zeitskala dar, da das Verhalten jedes Kunden unabhängig ist. Sie könnten jedoch auf Marktsignale (Werbung, Mundpropaganda) reagieren, die sich ebenfalls ändern, jedoch langsamer.

Wohl die größte Herausforderung bei der Korrelation über die Zeit besteht darin, dass sie gleichzeitig auf mehreren Zeitskalen auftreten kann. Unabhängige Ereignisse (wie z. B. wie viele Menschen jede Stunde in ein Geschäft kommen und Hustensaft verlangen) sind recht leicht zu modellieren. Die Variationen, die auf längeren Zeitskalen auftreten, sind schwieriger, da sie das erzeugen, was wie Korrelationen über die Zeit auf kleineren Zeitskalen aussieht.

### Korrelationen über die Geografie

Kaufentscheidungen von Kunden, Krankheitsausbrüche und Wetter sind alles Beispiele für zufällige Prozesse, die geografisch variieren. Manchmal können politische Grenzen die Korrelationen begrenzen, aber meistens ist es einfach die Entfernung, die die Stärke der Korrelation bestimmt.

Räumlich verteilte Prozesse treten typischerweise in sehr hohen Dimensionen auf (es gibt viele räumliche Standorte!). Was geografische Korrelationen vereinfacht, ist, dass sie sich typischerweise ziemlich leicht erfassen lassen. Geografie kann eine reine Funktion der Entfernung sein, aber auch geografische Grenzen sowie Bevölkerungsbewegungsmuster widerspiegeln. Glücklicherweise gibt es leistungsstarke mathematische Werkzeuge, die helfen, diese Korrelationen zu identifizieren und zu erfassen.

Korrelation über die Geografie kann in jedem unserer fünf Problemkontexte wie folgt auftreten:

1. Der Nachfrageanstieg nach Schneefräsen wird ebenfalls regional sein, da er auf Schneestürme reagiert (die regional sind).
2. Eine Hafenverzögerung kann reduzierte Versorgung in der vom Hafen bedienten Region erzeugen, mit höheren Korrelationen für Punkte, die näher am Hafen liegen.
3. Regenstürme sind ebenfalls regional und erzeugen Energieschübe von Windparks in den vom Sturm betroffenen Gebieten. Ebenso werden Hitzeperioden (die ebenfalls regional sind) Perioden mit wenig Wind erzeugen.
4. Die Ausbreitung der Grippe wird regional sein, da sie zwischen Menschen weitergegeben wird, die sich nahe beieinander befinden.
5. Fracht entsteht entweder durch Veränderungen in einer Fertigungsanlage (die sich an einem Standort befindet) oder durch Nachfrageänderungen, die durch regionale Kräfte angetrieben werden können.

### Korrelationen über Attribute

Die meisten unserer Beispiele beinhalten Aktivitäten, die durch eine Reihe von Attributen gekennzeichnet sind:

1. Die Nachfrage nach Kleidung wird Korrelationen zwischen Kleidungsstücken mit ähnlichem Stil, aber unterschiedlichen Farben aufweisen.
2. Produkte, die gemeinsame Vorleistungen teilen (wie Materialien für Kleidung, Chips für Autos, seltene Erden für Motoren), können bei Knappheit des Inputs ähnliche Verzögerungen bei den Vorlaufzeiten aufweisen.
3. (Keine erkennbare Verwendung von Korrelation über Attribute für Windenergie.)
4. Neue Infektionen können bei Menschen korreliert sein, die gemeinsame Merkmale wie Alter oder medizinische Bedingungen teilen.
5. Der Fluss von LKW-Ladungstransporten kann korreliert sein, wenn sie gemeinsame Güter oder Produkte transportieren.

Es kommt häufig vor, dass wir uns, wenn wir alle Attribute erweitern, mit so vielen Kombinationen wiederfinden, dass die Anzahl der Beobachtungen für eine bestimmte Attributkombination sehr gering und möglicherweise null sein kann. Diese Probleme eignen sich für die Verwendung hierarchischer Schätzmethoden, bei denen wir verschiedene Zeitreihen erstellen, indem wir ein oder mehrere Attribute vernachlässigen, und diese dann mithilfe gewichteter Kombinationen verwenden.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Nennen Sie die 12 Klassen von Unsicherheit und geben Sie für jede ein Beispiel aus einer beliebigen Anwendung.</li>
<li>Nennen Sie sieben Formen von Unsicherheit, die Zufallsprozesse beschreiben können, und beschreiben Sie jeweils einen Kontext, der diese hervorbringen könnte.</li>
<li>Auf welche Weisen kann Unsicherheit die Leistung eines Systems beeinträchtigen? Geben Sie für jede ein Beispiel.</li>
<li>Nennen Sie vier Formen von Saisonalität.</li>
<li>Erstellen Sie eine kumulative Verteilung von Windgeschwindigkeiten aus den folgenden Beobachtungen:
<p>(17, 8, 2, 12, 9, 28, 10, 8, 35, 12, 15)</p>
</li>
</ol>

**Modellierungsfragen**

<p>Versuchen Sie für jede der folgenden Fragen, für die untenstehenden Settings möglichst viele Formen von Unsicherheit innerhalb jeder Klasse zu finden, orientiert an den Tabellen im <a href="#examples-from-selected-applications">obigen Abschnitt</a>.</p>

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Das Bestandsplanungsproblem in <a href="/bridging-vol1/de/chapter-2/#inventoryplanning">Kapitel 2</a>.</li>
<li>Das Nachfragemanagementproblem für Möbel in <a href="/bridging-vol1/de/chapter-2/#demandmanagementfurniture">Kapitel 2</a>.</li>
<li>Die Planung klinischer Studien in <a href="/bridging-vol1/de/chapter-2/#clinicaltrials">Kapitel 2</a>.</li>
<li>Die Durchführung einer Präsidentschaftswahl in <a href="/bridging-vol1/de/chapter-2/#presidentialelection">Kapitel 2</a>.</li>
<li>Lieferkettenfinanzierung in <a href="/bridging-vol1/de/chapter-2/#supplychainfinance">Kapitel 2</a>.</li>
<li>Wählen Sie ein eigenes Problem-Setting, idealerweise mit einer gewissen Komplexität, und identifizieren Sie so viele Arten von Unsicherheit wie möglich anhand der 12 Klassen als Leitfaden.</li>
</ol>
{% endraw %}
