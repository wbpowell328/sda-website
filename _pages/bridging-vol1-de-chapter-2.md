---
layout: book
title: "Kapitel 2: Anwendungen"
permalink: /bridging-vol1/de/chapter-2/
date: 2026-07-17
book_home: /bridging-vol1/de/contents/
book_data: bridging_vol1_toc_de
lang: de
translated_from: en
translated_from_hash: 021eb6b21e0b2ae0
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Der erste Schritt bei der Verbesserung eines Produkts, Prozesses oder einer Dienstleistung besteht darin, eine grundlegende Beschreibung zu liefern und anschließend mögliche Leistungskennzahlen, Arten von Entscheidungen und Quellen der Unsicherheit zu identifizieren. Wir werden diese ersten Schritte anhand einer Vielzahl von Anwendungsszenarien veranschaulichen. Anschließend werden wir im weiteren Verlauf des Buches immer wieder auf diese Anwendungen zurückgreifen, um verschiedene Modellierungsinstrumente zu veranschaulichen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PowellApplications.png" alt="Eine Darstellung der vielen Kontexte, in denen Entscheidungen getroffen werden." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 2.1.</span> Eine Darstellung der vielen Kontexte, in denen Entscheidungen getroffen werden.</figcaption>
</figure>

Das Schöne an sequentiellen Entscheidungsproblemen ist, dass sie überall dort auftreten, wo Menschen tätig sind. Abbildung 2.1 zeigt eine Momentaufnahme einiger Problemstellungen, die die Tätigkeiten des Autors beschreiben und als motivierende Grundlage für die Arbeit in diesem Buch dienten. Jedes Bild steht dabei für eine Vielzahl von Entscheidungsproblemen. Dies steht in scharfem Kontrast zu Problemklassen wie der linearen, ganzzahligen und nichtlinearen Programmierung, die zwar wichtige und leistungsfähige Werkzeuge darstellen, aber nur einen sehr engen Ausschnitt von Entscheidungsproblemen lösen.

Wir weisen darauf hin, dass eine natürliche Tendenz besteht, sich auf das Management physischer Ressourcen zu konzentrieren, da dies das ist, was wir sehen. Sicherlich bietet das Management physischer Ressourcen viele Möglichkeiten, bessere Entscheidungen zu treffen, doch es gibt auch andere Entscheidungen, die sich direkt auf die Erhebung von Informationen sowie auf die Steuerung der oft erheblichen Geldflüsse beziehen, die zur Unterstützung dieser Abläufe erforderlich sind.

In diesem Kapitel werden wir die folgenden Problemstellungen behandeln:

- Bestandsplanung
- Nachfragemanagement
- Elektrizitätsmanagement
- Hotel-Revenue-Management
- Anwendungen im Gesundheitswesen
- Präsidentschaftswahlen
- Management von Lkw-Flotten (Truckload)
- Cash-Management bei Investmentfonds
- Supply-Chain-Finanzierung
- Intelligentes Trial-and-Error (viele Kontexte)

Viele dieser Themen lassen sich als Meta-Problembereiche bezeichnen, da sie Teilbereiche enthalten, die für sich genommen bereits bedeutende Felder menschlicher Tätigkeit darstellen. Unser Ziel ist es, eine vielfältige Sammlung von Anwendungen zu schaffen, um zum einen die Bandbreite der Probleme zu veranschaulichen, die unter den Oberbegriff der sequentiellen Entscheidungsprobleme fallen, und zum anderen eine vielfältige Sammlung von Entscheidungskontexten bereitzustellen, die den Rahmen für die Modellierung motivieren, den wir im weiteren Verlauf des Buches vorstellen werden.

An dieser Stelle sind wir noch nicht bereit, vollständige Modelle zu beschreiben – das folgt in Band II. Für jede Anwendung werden wir Antworten auf die drei Fragen des Rahmenbildungsprozesses geben, wobei zu bedenken ist, dass dies nur ein Beispiel ist, um den Leser zum Nachdenken über den Prozess anzuregen.

## Erste Schritte – die Rahmenbildung des Problems

Es ist sehr üblich, komplexe Probleme mit allgemeinen Begriffen zu diskutieren. Abbildung 2.2 (erstellt von ChatGPT) beantwortet die Frage:

> *Verfasse eine einseitige Diskussion darüber, wie ein Unternehmen auf einen plötzlichen Anstieg der Zölle reagieren sollte, der seine Lieferkette stören wird.*

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTrespondtoTariff.png" alt="ChatGPTs Version davon, wie eine Lieferkette auf Zollerhöhungen reagieren sollte.">
  <figcaption><span class="fig-num">Abbildung 2.2.</span> ChatGPTs Version davon, wie eine Lieferkette auf Zollerhöhungen reagieren sollte.</figcaption>
</figure>

Das Problem bei solchen allgemeinen Diskussionen ist, dass sie nie einen klaren Weg zur Verbesserung des Prozesses aufzeigen. Alles, was in der Diskussion steht, mag wahr sein, aber es fehlt an konkreten Maßnahmen, die zur Lösung eines Problems ergriffen werden können. Die von ChatGPT (im Jahr 2025) gelieferte Antwort spiegelt die Art von allgemeinem Gerede wider, das in Wirtschaftsbüchern weit verbreitet ist und niemals die Grundlage für ein formales Modell sein könnte.

Dieses Kapitel veranschaulicht die erste Phase der Rahmenbildung des Problems, die aus vier Elementen besteht:

- **Die Erzählung:** Dies ist eine kurze Diskussion, die ein Problem in der Art beschreibt, wie es jemand innerhalb des Problembereichs formulieren würde.
- **Leistungskennzahlen:** Wir liefern eine Liste von Leistungskennzahlen, die priorisiert werden müssen (dies wird in Kapitel 3 behandelt).
- **Entscheidungen:** Als Nächstes liefern wir eine Liste von Entscheidungen, die eine oder mehrere der Kennzahlen beeinflussen. Entscheidungen werden in Kapitel 4 behandelt.
- **Unsicherheiten:** Schließlich beschreiben wir die Formen von Unsicherheit, die die Wirkung einer Entscheidung bei ihrer Umsetzung oder im weiteren zeitlichen Verlauf des Prozesses verzerren können. Unsicherheiten werden in Kapitel 5 behandelt.

An dieser Stelle werden wir noch nicht versuchen zu beschreiben, wie wir das Problem lösen könnten (das heißt, wie die Entscheidungen getroffen werden). Dafür benötigen wir weiteres Material, das später entwickelt wird. Das Ziel in dieser Phase besteht darin, anhand einer Vielzahl von Problemstellungen den Prozess der Identifizierung von Kennzahlen, Entscheidungen und Unsicherheiten auf allgemeine Weise zu veranschaulichen. Die Identifizierung dieser drei Elemente ist der Schlüssel zur Lösung jedes Entscheidungsproblems, weshalb wir uns diese Gewohnheit zunächst aneignen müssen.

## Interaktionen erfassen {#capturinginteractions}

Die Identifizierung von Kennzahlen, Entscheidungen und Unsicherheiten ist zwar ein wertvoller Ausgangspunkt, es ist jedoch ebenso wichtig zu verstehen, wie diese miteinander interagieren.

- **Die Wirkung von Entscheidungen auf Kennzahlen** – Jede Entscheidung sollte mindestens eine Kennzahl beeinflussen, und jede Kennzahl sollte von mindestens einer Entscheidung beeinflusst werden.
- **Unsicherheit bei den Leistungskennzahlen in Abhängigkeit von den Entscheidungen** – Wir möchten vielleicht den kürzesten Weg wählen, aber die Reisezeit hängt vom Verkehrsaufkommen ab; wir möchten vielleicht ein Medikament wählen, das eine Infektion bekämpft, aber ein Patient spricht möglicherweise nicht auf ein bestimmtes Medikament an; ein Investor kann die genaue Rendite beim Kauf einer Aktie nicht vorhersagen.
- **Die Unsicherheit kann einschränken, welche Entscheidungen wir treffen können** – Eine Spedition muss Ladungen transportieren, doch diese werden zufällig angefordert; ein Hotel hält möglicherweise Zimmer für Geschäftsreisende zurück, die diese reservieren mögen oder auch nicht; ein Energieversorger verlässt sich möglicherweise auf Windenergie, doch die Menge der erzeugbaren Energie ist ungewiss.
- **Die Unsicherheit verändert die Dynamik, mit der sich das System im Zeitverlauf entwickelt** – Eine Krankheit in einer Bevölkerung kann sich auf unsichere Weise ausbreiten; die Wirtschaft kann sich auf ungewisse Weise entwickeln, was den Wert der Währung beeinflusst; unsicheres Verhalten von Wettbewerbern kann den Absatz verringern.

### Auswirkung von Entscheidungen auf Kennzahlen

Eine nützliche Übung besteht darin, eine Tabelle zu erstellen, in der auf der linken Seite verschiedene Entscheidungen und oben verschiedene Kennzahlen aufgelistet sind. Tragen Sie dann rein nach eigenem Ermessen in jede Zelle eines der folgenden Symbole ein, um festzuhalten, wie Sie die Wirkung jeder Entscheidung auf jede Kennzahl einschätzen:

- **H** – Die Entscheidung hat eine hohe Auswirkung auf die Kennzahl.
- **M** – Die Entscheidung hat eine mittlere Auswirkung auf die Kennzahl.
- **L** – Die Entscheidung hat eine geringe Auswirkung auf die Kennzahl.
- **N** – Die Entscheidung hat keine Auswirkung auf die Kennzahl.

Tabelle 2.1 veranschaulicht, wie dies für ein kleines Bestandsproblem aussehen könnte. Die Tabelle kann unter [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/) heruntergeladen werden.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.1.</span> Interaktionsmatrix für Entscheidungen und Kennzahlen für ein Bestandsproblem mit kurzen Vorlaufzeiten.</caption>
<thead>
<tr><th>Entscheidungen \ Kennzahlen</th><th>Umsatzerlöse</th><th>Produktkosten</th><th>Lagerhaltungskosten</th><th>Fehlbestände</th></tr>
</thead>
<tbody>
<tr><td>Wann/wie viel bestellt wird</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Währungsabsicherung kaufen?</td><td class="hml-n">N</td><td class="hml-l">L</td><td></td><td class="hml-n">N</td></tr>
<tr><td>Rabattierung</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Produkt in sozialen Medien bewerben</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

Beginnen Sie damit, die Kennzahlen von links nach rechts in der Reihenfolge ihrer Wichtigkeit aufzulisten. Anschließend nutzen wir die Matrix, um die wichtigsten Entscheidungen sowie die Kennzahlen zu identifizieren, die von den aufgelisteten Entscheidungen am stärksten beeinflusst werden.

Die Interaktionsmatrix kann auf zwei Arten genutzt werden:

1. Listen Sie alle Entscheidungen auf und bewerten Sie dann die Auswirkung jeder Entscheidung auf jede Kennzahl. Identifizieren Sie daraus die Entscheidungen, die den größten Einfluss auf die wichtigsten Kennzahlen zu haben scheinen.
2. Bei komplexen Problemen kann es unpraktisch sein, alle Entscheidungen aufzulisten. Nutzen Sie stattdessen die Menge der Kennzahlen, um die Entscheidungen zu identifizieren, die für das Problem am relevantesten sind. Kehren Sie dann zu (1) zurück, um bei der Priorisierung der wichtigsten Entscheidungen zu helfen.

Die Übung, Tabellen wie diese auszufüllen, kann helfen, den Prozess des Verständnisses der Rolle von Entscheidungen bei der Verbesserung der Leistung zu steuern, bevor man mit dem aufwendigen und komplexen Schritt der Datenerhebung und des Aufbaus eines Computermodells fortfährt.

### Auswirkung von Unsicherheit bei gegebener Entscheidung

Stellen Sie sich vor, wir hätten eine Entscheidung getroffen (das heißt, sie ist festgelegt). Wir müssen verstehen, welche Formen von Unsicherheit die durch die Entscheidung erzeugten Kennzahlen beeinflussen. Für unser einfaches Bestandsproblem (mit kurzen Vorlaufzeiten) könnten wir die in Tabelle 2.2 gezeigte Matrix erhalten.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.2.</span> Interaktionsmatrix für Unsicherheiten und Kennzahlen bei gegebener Entscheidung, für ein Bestandsproblem mit kurzen Vorlaufzeiten.</caption>
<thead>
<tr><th>Unsicherheit \ Kennzahlen</th><th>Umsatzerlöse</th><th>Stückkosten</th><th>Lagerhaltungskosten</th><th>Fehlbestände</th></tr>
</thead>
<tbody>
<tr><td>Verkäufe (verkaufte Einheiten)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Vorlaufzeiten</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Prognosefehler</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Bestandsschwund</td><td class="hml-m">M</td><td class="hml-n">N</td><td></td><td class="hml-n">N</td></tr>
</tbody>
</table>
</div>

Unsicherheit zu modellieren bedeutet schlicht, Informationen zu verstehen, die in der Zukunft auftreten könnten, die wir aber noch nicht kennen. Diese einfache Beobachtung wird bei Diskussionen über Unsicherheit häufig übersehen, die sich in anspruchsvoller Mathematik ("stochastische Modellierung") und der Quantifizierung von Risiko (die nur wenige verstehen) verlieren können.

Wie bei den Entscheidungen können wir damit beginnen, jede Quelle der Unsicherheit aufzulisten, die uns einfällt, und dann die Interaktionsmatrix nutzen, um die wichtigsten zu priorisieren. Alternativ können wir unsere Kennzahlen nutzen, um die Identifizierung wichtiger Unsicherheitsquellen zu steuern.

### Auswirkung von Unsicherheit auf Entscheidungen

<figure class="book-figure" style="float:right; max-width: 221px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/AssignmentProblemsimple.png" alt="Ein einfaches Zuordnungsproblem.">
  <figcaption><span class="fig-num">Abbildung 2.3.</span> Ein einfaches Zuordnungsproblem.</figcaption>
</figure>

Der häufigste Fall, in dem Unsicherheit beeinflusst, welche Entscheidungen wir treffen dürfen, tritt im Kontext von Ressourcenzuweisungsproblemen auf, bei denen wir bestimmte Ressourcen (Personen, Maschinen, Produktvorräte, Medikamente) verwalten, um Aufgaben (Aufträge, Patienten, Kunden) zu bedienen. In Abbildung 2.3 veranschaulichen wir die Zuordnung von Lkw (mit Fahrern) zum Transport von Frachtladungen. Die Hauptquelle der Unsicherheit ist der Zustrom von Ladungen, die von Verladern zum Transport angefordert werden, doch dies könnte auch jede andere Aufgabe sein. Wir könnten einem Fahrer eine Ladung zuweisen, die hinsichtlich der Rentabilität nicht attraktiv ist, den Fahrer aber mehrere Tage lang bindet und ihn dadurch daran hindert, für eine bessere Ladung eingesetzt zu werden, die möglicherweise später am Tag angefordert wird.

Der Zustrom von Kundenanfragen ist eine bedeutende Quelle der Unsicherheit, die auftritt bei:

- Lieferkettenmanagement (Nachfrage nach Produkten).
- Gesundheit (Patienten, die eine Behandlung benötigen).
- Hotels (Anfragen für zu mietende Zimmer).
- Energie (die Nachfrage nach Strom oder Gas zum Heizen).
- Finanzen (Ein- und Auszahlungen von Bargeld).

Ein wichtiges Merkmal des Flusses von Nachfragen, die bedient werden müssen, ist, wie diese Nachfragen dem System bekannt werden. Einige Varianten sind:

- Keine Vorankündigung, sofortige Bedienung (Verkauf beliebiger Einzelhandelsprodukte).
- Keine Vorankündigung, Rückstau möglich (Online-Käufe).
- Vorausbuchung, sofortige Verpflichtung erforderlich (Buchung von Hotelzimmern).
- Vorabverpflichtung mit Stornierungsbedingungen (teure Anschaffungen, wie Flugzeuge).

Es kann auch Unsicherheit in der Verfügbarkeit von Ressourcen geben, die zur Bedienung von Kunden eingesetzt werden:

- Ärzte, Pflegepersonal können krank sein.
- Maschinen können ausfallen.
- Ein Lkw-Fahrer kann eine Zuweisung zum Transport einer Ladung ablehnen.
- Ein Vermögenswert kann an Wert verlieren.

### Unsicherheit in der Systemdynamik

Was wir zu einem bestimmten Zeitpunkt wissen, kann sich ändern, wenn wir in der Zeit vorwärts schreiten, und wenn es sich ändert, sind wir uns typischerweise unsicher darüber, wie es sich ändert. Einige Beispiele für Unsicherheit in der Entwicklung des Systems sind:

- Veränderungen bei Kosten, Preisen und anderen Leistungskennzahlen.
- Veränderungen im Status von Personen, Ausrüstung und Einrichtungen im Laufe der Zeit. Personen können kündigen oder krank werden, Ausrüstung kann ausfallen, eine Einrichtung kann durch einen Sturm beschädigt werden.
- Veränderungen der Markteinstellungen, das Vorhandensein einer Krankheit in einer Bevölkerung, wie Menschen für einen Kandidaten stimmen könnten.

Es ist wichtig zu erkennen, dass die Unsicherheit darüber, wie sich das System im Laufe der Zeit entwickelt, in zwei Kategorien unterteilt werden kann:

- Unsicherheit in der *Funktion*, die die Entwicklung des Systems beschreibt. Manche bezeichnen dies als "Modellunsicherheit". Wenn wir die Verteilung von Impfstoffen verwalten, verwenden wir möglicherweise unterschiedliche Modelle dafür, wie sich die Krankheit im System ausbreitet. Wenn wir Evakuierungen für einen Hurrikan planen, können wir zwischen verschiedenen Modellen wählen, wie sich der Sturm entwickeln wird.
- Unsicherheit in den *Parametern*, die das Verhalten der Funktion bestimmen.

### Unsicherheit in Prognosen

Es gibt viele Probleme (aber nicht alle), bei denen eine jetzige Entscheidung eine Projektion dessen erfordert, was in Zukunft passieren könnte. Natürlich ist die Zukunft fast immer ungewiss, aber es ist unsere Wahl, ob wir eine "beste Schätzung" dessen verwenden, was passieren könnte, oder ob wir diese Unsicherheit explizit modellieren, um uns bei der jetzigen Entscheidung zu helfen. Wir kommen auf dieses Thema in Kapitel 4 zurück, wenn wir Möglichkeiten zur Entscheidungsfindung besprechen.

### Anmerkungen

Unsicherheit ist mit Abstand das subtilste Thema beim Verständnis eines Entscheidungsproblems. Oft haben Menschen ein intuitives Gefühl dafür, dass eine Art von Unsicherheit wichtig ist; dieser Abschnitt hilft dabei zu verfeinern, wie sich eine Form der Unsicherheit tatsächlich auf ein Entscheidungsproblem auswirkt.

## Bestandsplanung {#inventoryplanning}

### Erzählung

Eines der am weitesten untersuchten Probleme im Operations Research (sowie in der stochastischen Optimierung) ist das Bestandsproblem, das typischerweise als die Bestimmung dargestellt wird, wann eine Nachbestellung aufgegeben werden soll und wie groß die Bestellung sein sollte. Die klassische Lehrbuchbeschreibung eines Bestandsauffüllungsproblems ist in Abbildung 2.4 dargestellt, die den Anstieg der Bestände zeigt, wenn neue Produkte eintreffen, gefolgt vom Abbau, während das Produkt verbraucht wird. Ein Fehlbestand, bei dem der Bestand auf null fällt, ist dargestellt.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SimpleInventory.jpg" alt="Illustration of a classical inventory problem with short lead times." style="max-width: 485px;">
  <figcaption><span class="fig-num">Abbildung 2.4.</span> Illustration eines klassischen Bestandsproblems mit kurzen Vorlaufzeiten.</figcaption>
</figure>

Eine realistischere Version eines Bestandsproblems ist in Abbildung 2.5 dargestellt, die ein Bestandsproblem zeigt, das in einer Situation entstehen könnte, in der das Produkt von einem entfernten Ort kommt (z. B. von China an die Ostküste der USA). Wir müssen möglicherweise 6-8 Wochen warten, aber wetterbedingte Verzögerungen können dies noch weiter verlängern. Langstreckenversand umfasst typischerweise Bewegungen per Containerschiff für Hafen-zu-Hafen-Transporte, Schiene (in den USA üblich) und dann Lkw.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ComplexInventory.jpg" alt="Illustration of an inventory problem with long lead times.">
  <figcaption><span class="fig-num">Abbildung 2.5.</span> Illustration eines Bestandsproblems mit langen Vorlaufzeiten.</figcaption>
</figure>

Die Planung von Beständen muss mit Strategien zur Nachfragesteuerung koordiniert werden, die durch Preisgestaltung, Rabatte, Werbeaktionen und Marketing beeinflusst werden können. Das Bestandsmanagement muss mit einer Reihe von Unsicherheitsquellen umgehen, die von der üblichen tagtäglichen Schwankung der Nachfrage bis hin zu Marktverschiebungen aufgrund von Konkurrenzverhalten, neuen Technologien sowie dem Verlust von Lieferanten als auch dem Auftauchen neuer Bezugsquellen reichen. Darüber hinaus kann es erhebliche Schwankungen bei den Transportzeiten aufgrund von Wetter, mechanischen Ausfällen und Arbeitskampfmaßnahmen in Häfen geben. Übermäßige Verzögerungen können durch den Einsatz schneller Transportarten wie Luftfracht als Alternative zum Containerversand und Komplettladungs-Lkw-Transport als Alternative zur Schiene bewältigt werden.

### Kennzahlen

Wir unterscheiden zwischen "Basiskennzahlen", die durch routinemäßige Berichterstattung erfasst werden, und "Risikokennzahlen", die speziell bedeutende Ereignisse (typischerweise negativer Art) berücksichtigen, die nach Einschätzung des Managements in den Basiskennzahlen nicht angemessen erfasst werden.

- **Basiskennzahlen**
  - Bestandshaltungskosten, die eine Reihe von Posten abdecken, einschließlich der Kosten des im Bestand gebundenen Kapitals, Lagerkosten (Heizung/Klimaanlage, Personalaufwand für die Handhabung, Gemeinkosten für Lager und Ausrüstung), Versicherungskosten, Kosten durch Verderb, Diebstahl, Veralterung.
  - Versandkosten, einschließlich Verpackung, Transport und Versicherung.
  - Umsatz aus der Bedarfsdeckung, der etwaige Rabatte widerspiegeln muss.
  - Kennzahlen zur Prognosegenauigkeit.
  - Kundenservicekennzahlen, wie verzögerte oder verlorene Nachfrage, die aufgrund fehlender Bestände nicht bedient wird, und Produktretouren (z. B. aufgrund von Qualitätsproblemen).
  - Kosten für Werbeaktionen, Coupons, Marketing und Werbung.
  - Auslastung von Einrichtungen (sind sie voll?), Personal und Ausrüstung.
  - Arbeitskräftefragen, einschließlich Arbeitsproduktivität, Bedarf an Überstunden, Einstellungskosten und Entlassungen.
- **Risikokennzahlen**
  - Währungsrisiken, wenn das Produkt aus einem anderen Land in einer anderen Währung eingekauft wird.
  - Erhebliche Fehlbestände, die Kunden zu Konkurrenzprodukten zwingen.
  - Diebstahl, Cyberangriffe.
  - Erhebliche Störungen (Unterbrechungen bei einem Lieferanten, Schäden an Einrichtungen), die die Lieferung an Kunden oder die Beschäftigung verhindern.

### Entscheidungen

Es ist hilfreich, Entscheidungen danach zu ordnen, ob wir ein einzelnes Bestandsproblem lösen oder Fragen auf Netzwerkebene angehen. Lehrbuch-Bestandsmodelle konzentrieren sich typischerweise auf operative Entscheidungen wie den Zeitpunkt und die Menge einer Bestellung. Die Perspektive ändert sich jedoch, wenn wir lange Vorlaufzeiten haben, bei denen eine Entscheidung sich jetzt auf das System Monate in die Zukunft auswirkt.

Die Liste der Entscheidungen, die für die Bestandsplanung relevant sind, ist recht lang. Im [Abschnitt über Interaktionen unten](#inventorydecisioninteractions) werden wir ein Werkzeug verwenden, das wir "Interaktionsmatrizen" nennen, um die wichtigsten Entscheidungen zu identifizieren.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.3.</span> Operative Bestandsentscheidungen und welche Ressourcenkategorie jede davon primär betrifft.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Ob der Bestand beobachtet/überprüft werden soll</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Bei wem aus der Menge der verfügbaren Lieferanten die Bestellung aufgegeben werden soll (falls mehrere Lieferanten vorhanden sind)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Wann eine Nachbestellung aufgegeben werden soll.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Wie viel bestellt werden soll.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Wie es verpackt werden soll (Überseecontainer, Halbcontainer, Paletten, Kartons).</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Wie die Bestellung finanziert werden soll (Bargeldtransfer, Bankkredit, ...)</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Die Wahl der Transportmodalitäten für Produkte aus dem Ausland zu Zwischenlagern</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Die Wahl der Transportmodalitäten für die inländische Verteilung an Kunden</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.4.</span> Taktische Bestandsentscheidungen und welche Ressourcenkategorie jede davon primär betrifft.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Ob Währungsabsicherungen für Produkte aus dem Ausland erworben werden sollen.</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Rabatte/Werbeaktionen (zur Reduzierung des Bestands)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Produktpreisgestaltung.</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Marketing/Displays (Regalplatz, End-Cap-Display, Werbung (verschiedene Formen))</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Durchführung von Markttests für Merkmale, Design, ...</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Entwurf und Umsetzung einer Marketingkampagne</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Wahl des Lieferanten (für jedes Material oder jede Komponente), einschließlich der Frage, ob mehrere Lieferanten genutzt werden sollen. Dies bestimmt die möglichen Lieferanten.</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Wartung der Ausrüstung (erhöht geplante Stillstandszeiten, verringert ungeplante Stillstandszeiten)</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.5.</span> Strategische Bestandsentscheidungen und welche Ressourcenkategorie jede davon primär betrifft.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Verträge mit Plattformen zur Bestandssichtbarkeit (wo befindet sich meine Sendung)?</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Wahl der Methodik zur Nachfrageprognose (statistische Methoden, Einbeziehung verschiedener Personen aus der gesamten Organisation).</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Produktdesign (das die erforderlichen Materialien und Komponenten bestimmt)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Marktidentifikation (an wen verkaufen wir)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Wie viel Konnektivität (Informationsaustausch) mit Partnern der Fertigungslieferkette angestrebt werden soll</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

#### Einzelnes Bestandsproblem

Diese Entscheidungen werden auf unterschiedlichen Zeitskalen getroffen: operativ (stündlich, täglich, wöchentlich), taktisch (monatlich) und strategisch (vierteljährlich, jährlich).

- **Operativ** - Dies sind Entscheidungen, die in Echtzeit getroffen werden könnten, aber typischerweise täglich oder wöchentlich erfolgen (Tabelle 2.3).
- **Taktisch** - Entscheidungen, die auf monatlicher Basis getroffen werden (Tabelle 2.4).
- **Strategisch** - Entscheidungen, die auf vierteljährlicher oder jährlicher Basis getroffen werden (Tabelle 2.5).

#### Gestaltung der Lieferkette

Es gibt Entscheidungen im Zusammenhang mit der Gestaltung von Lieferkettennetzwerken, die sich über viele (Dutzende bis Tausende) einzelne Bestandsentscheidungen erstrecken. Dies sind Entscheidungen, die typischerweise auf längeren Zeitskalen getroffen werden. Tabelle 2.6 gibt einige Beispiele für Entscheidungen auf Netzwerkebene zur Gestaltung der Lieferkette.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.6.</span> Entscheidungen zur Gestaltung der Lieferkette auf Netzwerkebene und welche Ressourcenkategorie jeweils primär betroffen ist.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Wo Pufferbestände zu lokalisieren sind und wie sie neu ausbalanciert werden</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Schließung bestehender Anlagen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Wo Produktionsanlagen gekauft/gemietet/gebaut/erweitert werden sollen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Welche Produktionsanlagen geschlossen/verkauft werden sollen, Mietverträge kündigen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Wo Lagerhäuser und Vertriebszentren gekauft/gemietet/gebaut/erweitert werden sollen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Ob Materialhandhabungsautomatisierung in Vertriebszentren und Lagerhäusern eingeführt werden soll</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Investition in Informationstechnologien für Informationsaustausch und Koordination</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Vereinbarung einer bedeutenden Kreditlinie oder anderer Backup-Finanzierungsquellen</td><td></td><td>&#10003;</td><td></td></tr>
</tbody>
</table>
</div>

### Unsicherheiten

Unsicherheiten treten auch auf unterschiedlichen Zeitskalen auf. Wir führen eine besondere Kategorie für größere Störungen ein, die auftreten können, aber nicht regelmäßig.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.7.</span> Stündliche bis tägliche Bestandsunsicherheiten und welche Ressourcenkategorie jeweils primär betroffen ist.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Tägliche Schwankungen der Kundennachfrage</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Fehler bei der Bestandsmessung</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Bestands-„Schwund" (Diebstahl, Verlust, Verderb, Bruch, ...)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Ausbeute aus der Lieferung (wie viele Artikel/wie viel Material den Spezifikationen entsprachen)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Transportverzögerungen aufgrund von Wetter, Ausrüstungsausfällen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Prognosefehler</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Kosten für Rohstoffe</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Kosten für Inputs von Lieferanten</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Stromausfälle (Elektrizität, Kraftstoffe)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Kommunikationsfehler, menschliche Ausführungsfehler</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Tägliche Schwankungen des Aktienkurses des Unternehmens</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Finanzbetrug bei einzelnen Transaktionen</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Tägliche Verfügbarkeit von zuteilbarer Kapazität</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.8.</span> Wöchentliche Bestandsunsicherheiten und welche Ressourcenkategorie jeweils primär betroffen ist.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Verschiebungen der durchschnittlichen Nachfrage aufgrund von Technologiewandel, Konkurrenzverhalten, Marktverschiebungen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Änderungen des Verkaufspreises eines Produkts (beeinflusst Nachfrage und Gewinnströme)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Änderungen der Rohstoffpreise</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Wie der Markt auf Preisänderungen reagiert</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verzögerungen durch Streiks in Häfen, Bahnhöfen, internationalen Grenzübergängen</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verschiebungen im Verhalten großer Kunden</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Stimmungsverschiebungen an der Wall Street (z.B. von „Wachstum" zu „stabil" zu „Rezession")</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.9.</span> Monatliche bis jährliche Bestandsunsicherheiten und welche Ressourcenkategorie jeweils primär betroffen ist.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Aufkommen neuer Informationstechnologien (AWS, KI, Sichtbarkeitsplattformen)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Aufkommen neuer Produktions-/Materialhandhabungstechnologien (z.B. Robotik)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Aufkommen neuer Konkurrenten</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verschiebungen in Bevölkerungsmustern (z.B. Wachstum der Einwanderung)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verschiebungen in Nachfragemustern (Zunahme der Nachfrage nach hochwertigen Produkten)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Handelsabkommen</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Änderungen der Arbeitskräfteverfügbarkeit</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.10.</span> Bestandsunsicherheiten durch größere Störungen und welche Ressourcenkategorie jeweils primär betroffen ist.</caption>
<thead>
<tr><th></th><th>Physisch</th><th>Finanziell</th><th>Informationell</th></tr>
</thead>
<tbody>
<tr><td>Aufkommen neuer Informationstechnologien (AWS, KI, Sichtbarkeitsplattformen)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Aufkommen neuer Produktions-/Materialhandhabungstechnologien (z.B. Robotik)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Aufkommen neuer Konkurrenten</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verschiebungen in Bevölkerungsmustern (z.B. Wachstum der Einwanderung)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Verschiebungen in Nachfragemustern (Zunahme der Nachfrage nach hochwertigen Produkten)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Handelsabkommen</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Änderungen der Arbeitskräfteverfügbarkeit</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

*(Hinweis: Die Quellabbildung von Tabelle 2.10 wird identisch zu Tabelle 2.9 dargestellt — dies wurde zur Überprüfung anhand des Manuskripts markiert; der Inhalt der Zeile „größere Störungen" muss möglicherweise aus einer anderen Quelldatei übernommen werden.)*

Die Identifizierung der unterschiedlichen Unsicherheitsquellen ist ein besonders ergiebiger Bereich für komplexe Probleme wie Lieferketten. Es gibt nicht nur ein breites Spektrum an Unsicherheiten, sie treten auch in unterschiedlichen Erscheinungsformen auf, wie feinkörnige Volatilität, Regimewechsel, Spitzen, Ausbrüche und seltene Ereignisse. Wir besprechen dieses Verhalten ausführlicher in Kapitel 5.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.11.</span> Interaktionsmatrix für Entscheidungen und Metriken für ein Bestandsproblem mit langen Vorlaufzeiten.</caption>
<thead>
<tr><th>Entscheidungen \ Metriken</th><th>Verkaufserlös</th><th>Produktkosten</th><th>Lagerhaltungskosten</th><th>Fehlbestände</th><th>Lagerumschlag</th><th>Betriebsmarge</th><th>Umsatzwachstum</th></tr>
</thead>
<tbody>
<tr><td>Wann/wie viel bestellt werden soll</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Währungsabsicherung beim Kauf?</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-n">N</td></tr>
<tr><td>Rabattierung</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Produktvermarktung in sozialen Medien</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Wahl des Lieferanten</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Preisgestaltung</td><td class="hml-h">H</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Währungsabsicherungen?</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Bestandssensoren</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Sichtbarkeitsplattformen zur Verfolgung eingehender Produkte nutzen?</td><td></td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Produktdesign</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
</tbody>
</table>
</div>

### Interaktionen {#inventorydecisioninteractions}

Eine wirkungsvolle Übung, die dabei hilft, ein Verständnis für die verschiedenen Elemente von Entscheidungsproblemen zu entwickeln, besteht darin, die Stärke unterschiedlicher Arten von Interaktionen subjektiv zu bewerten – eine Idee, die wir bereits im [Abschnitt zur Erfassung von Interaktionen weiter oben](#capturinginteractions) eingeführt haben. Wir beginnen mit der Beschreibung der Interaktionen zwischen Entscheidungen und Metriken für ein Bestandsproblem mit langen Vorlaufzeiten, dargestellt in Tabelle 2.11. Wir betonen, dass das Ausfüllen dieser Matrix völlig subjektiv ist, da es uns hilft, die wichtigsten Entscheidungen sowie die Metriken zu identifizieren, bei denen wir die größte Chance auf Verbesserung haben.

Was wir hier tun, ist, einen oft völlig unsichtbaren Schritt bei der Auswahl der Entscheidungen, auf die wir uns konzentrieren, durch einen Prozess zu ersetzen, der diese Auswahl explizit macht, auch wenn sie subjektiv getroffen wird.

Die Interaktionsmatrix für Unsicherheiten und Metriken bei gegebener Entscheidung könnte wie in Tabelle 2.12 aussehen. Hier legen wir Wert darauf, eine Entscheidung festzuhalten, um zu vermeiden, dass sich der Effekt der Unsicherheit darauf, welche Entscheidung wir treffen, vermischt.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabelle 2.12.</span> Interaktionsmatrix für Unsicherheiten und Metriken bei einer Entscheidung für ein Bestandsproblem mit langen Vorlaufzeiten.</caption>
<thead>
<tr><th>Unsicherheit \ Metriken</th><th>Umsatzerlöse</th><th>Stückkosten</th><th>Lagerhaltungskosten</th><th>Fehlbestände</th><th>Bestandsumschlag</th><th>Operative Marge</th><th>Umsatzwachstum</th></tr>
</thead>
<tbody>
<tr><td>Absatz (verkaufte Einheiten)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Vorlaufzeiten</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Prognosefehler</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">H</td><td class="hml-l">L</td></tr>
<tr><td>Bestandsschwund</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Veränderungen der Rohstoffpreise</td><td class="hml-n">N</td><td class="hml-h">H</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">L</td></tr>
<tr><td>Marktreaktion auf Preise</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td></tr>
<tr><td>Arbeitsniederlegungen</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-n">N</td></tr>
<tr><td>Preisverhalten der Wettbewerber</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

## Nachfragemanagement – Verkauf von Möbeln {#demandmanagementfurniture}

### Erzählung

Die Kehrseite der Steuerung des Warenflusses durch die verschiedenen Stufen von Herstellung und Distribution ist die Herausforderung, die Nachfrage zu managen. Die größten Möbelproduzenten sind China (mit weitem Abstand), die Vereinigten Staaten (überwiegend für den Inlandsverbrauch), Deutschland (überwiegend für Europa), Italien (hochwertige Möbel) und Polen (kostengünstigere Möbel). Möbelverkäufer müssen mit langen Vorlaufzeiten, stark saisonaler Nachfrage und Individualisierung sowie einem wettbewerbsintensiven Markt zurechtkommen. Zwar nutzen sie alle üblichen Werkzeuge zur Steuerung des physischen Warenflusses, doch ist es ebenso wichtig, verschiedene Strategien zum Management der Nachfrage einzusetzen, um Angebot und Markt in Einklang zu bringen.

Zu den nachfrageseitigen Herausforderungen, mit denen Möbelverkäufer umgehen müssen, gehören unter anderem:

- Stark schwankende Nachfrage, die teilweise auf Schwankungen beim Einzug in neue Wohnungen zurückzuführen ist.
- Sich wandelnde Kundenpräferenzen, da Kunden auf Designtrends und sich ändernde Stile sowie neue Produkte und Materialien reagieren.
- Preissensibilität, die sowohl den Zustand der Wirtschaft als auch die Konkurrenzsituation widerspiegelt.
- Marktreaktion auf Werbung und Sichtbarkeit in sozialen Medien.
- Strategien zur Suchmaschinenoptimierung.
- Partnerschaften mit Wohndeko-Influencern, die Produkte präsentieren können.
- Die Möglichkeit, Rabatte und Sonderaktionen anzubieten, um überschüssige Bestände abzubauen.

### Metriken

Metriken hängen stets von der Perspektive dessen ab, wer bewertet wird, aber einige, die in diesem Kontext zu erwarten wären, sind:

- Absatz (in Einheiten und Gesamtumsatz).
- Nettoumsatz – Umsatz abzüglich Wareneinsatzkosten und Werbekosten.
- Fehlbestände, verzögerte Auftragsabwicklung.
- Web-Traffic – Es gibt eine Reihe von Metriken zur Bewertung von E-Commerce-Portalen wie Besuche, Klickraten, Absprungraten, Verweildauer auf der Website und Conversions.
- Anzahl der Likes, Shares, Kommentare sowie Markenerwähnungen und Sentiment-Analyse in Online-Diskussionen.
- Engagement – Nutzung von Virtual-Reality-Vorschauen.

### Entscheidungen

Wir stellen uns vor, dass wir der Filialleiter eines Möbelgeschäfts sind:

- Welche Möbelstücke vorrätig gehalten werden sollen.
- Preisgestaltung.
- Sonderaktionen und Rabatte – z. B. Rabatt für ein Möbelensemble.
- Welche Marketingkanäle genutzt werden sollen – soziale Medien, TV, Printwerbung, In-Store-Marketing.
- Marketingbudgets für jeden Kanal.
- A/B-Tests von Webseitendesigns.
- Durchführung von Marktumfragen – Angebot spezifischer Pakete in einer Teilmenge von Filialen.
- Personalentscheidungen (wie viele, welche Qualifikationen).

### Unsicherheiten

Einige Beispiele für Unsicherheiten, die beim Verkauf von Möbeln auftreten können, sind:

- Abweichungen zwischen tatsächlicher Nachfrage und Prognose für Möbel auf unterschiedlichen Aggregationsebenen.
- Lieferzeiten.
- Produktqualitätsprobleme.
- Marktreaktion auf Preise, Rabatte und Sonderaktionen.
- Bereitschaft der Kunden, Produkte höherer oder niedrigerer Qualität zu substituieren.
- Schwankungen in den Kundenpräferenzen.
- Schwankungen im Web-Traffic und in den Conversion-Raten.

## Management des Stromnetzes

### Erzählung

Energiesysteme ist ein Oberbegriff für das riesige Netzwerk, das die moderne Gesellschaft mit Energie versorgt. Wir konzentrieren uns hier auf den Stromfluss, der jedoch die Stromerzeugung aus unterschiedlichen Quellen umfasst, vor allem Gas (aber auch noch etwas Kohle und Öl), Kernkraft sowie einen wachsenden Anteil an Energie aus Wind-, Solar- und Wasserkraftanlagen.

Das Rückgrat jedes Stromsystems ist das Stromnetz, das aus Hochspannungs-Übertragungsleitungen besteht, die Strom über große Entfernungen bei hohen Spannungen transportieren, von 69 kV (das heißt 69.000 Volt) bis zu 345 kV, mit Ultrahochspannungsleitungen von bis zu 765 kV. Der Strom wird anschließend über lokale Verteilnetze mit Spannungen zwischen 4 kV und 14 kV an Unternehmen und Haushalte weitergeleitet.

Der Strom stammt aus einer „Flotte" von Stromerzeugern, zu denen Kernkraftwerke, Kohlekraftwerke, Dampferzeuger und Gasturbinen sowie Wasserkraft gehören können (aufgrund der Präsenz der Kernkraft ist der Einfluss der Marineterminologie deutlich spürbar). Diese Generatoren unterscheiden sich in der Geschwindigkeit, mit der sie ein- ("zugeschaltet") oder ausgeschaltet werden können, sowie darin, wie leicht sie schneller oder langsamer betrieben werden können. Weitere wichtige Merkmale sind die Fixkosten und die Betriebskosten. Kernkraft beispielsweise hat hohe Fixkosten und niedrige Betriebskosten, und sie muss – abgesehen von Wartungsperioden – kontinuierlich betrieben werden. Gasturbinen haben deutlich geringere Fixkosten, aber höhere Betriebskosten, und sie können innerhalb einer Stunde eingeschaltet werden. Dampferzeuger hingegen benötigen 8–12 Stunden zum Aufheizen und werden daher typischerweise einen Tag im Voraus eingeplant.

Der zunehmende Einsatz von Wind- und Solarenergie hat ein Maß an unkontrollierbarer Variabilität eingeführt, dem Stromnetze bisher nicht ausgesetzt waren. Diese Variabilität lässt sich durch Speicherung bewältigen, die in verschiedenen Formen vorkommt, wobei die auffälligste die Batteriespeicherung auf Netzebene ist. Australien und Florida sind zwei Regionen, die stark in Batteriespeicherung investiert haben, doch dies wird zunehmend zu einer üblichen Begleitinvestition beim Ausbau großer Solarfelder und Windparks.

Speicherung gibt es jedoch in weiteren Varianten, darunter:

- Pumpspeicherkraftwerke, bei denen Wasser bergauf gepumpt und bei Bedarf durch Herabfließen zur Stromerzeugung genutzt wird.
- Batterie-Netz-Speicherung, bei der die Batterien in Autos und Haushalten als eine Form der Batteriespeicherung genutzt werden.
- Thermische Speicherung, bei der Energie durch das Erhitzen einer Flüssigkeit in einem großen Tank gespeichert wird.
- Nachfragemanagement (oder Demand Response) – Wir können den Strombedarf „speichern", indem wir Aktivitäten wie das Betreiben von Waschmaschinen und Trocknern oder das Herunterkühlen von Räumen (etwa Bibliotheken) verschieben, um die kühle Luft später zu nutzen.

Energie ist ein besonders reichhaltiges Problemfeld im Hinblick auf das Management verschiedener Formen von Unsicherheit, da unterschiedliche Technologien zur Stromerzeugung eingesetzt werden, die dramatisch unterschiedliche Vorlaufzeiten für Ankündigungen erfordern (buchstäblich von 2 Sekunden für die Anpassung der Leistung einer Gasturbine bis zu einem Jahr für Änderungen an Wartungsplänen von Kernkraftwerken).

Während dieses Buch geschrieben wird, steht das Stromnetz unter zunehmendem Druck, die wachsenden Anforderungen durch den Einsatz von „KI"-Werkzeugen zu erfüllen, die massive Rechenzentren erfordern, um die Berechnungen neuronaler Netze mit zig Milliarden Parametern unter Verwendung spezialisierter Chips von Unternehmen wie Nvidia zu bewältigen. Zudem wächst der Einsatz von Klimaanlagen zur Bewältigung steigender Temperaturen, ebenso wie die Rechenanforderungen von Kryptowährungen.

### Metriken

Zu der reichhaltigen Sammlung von Metriken für die Stromerzeugung gehören:

- **Die Stromkosten** – Dies ist mit Abstand die wichtigste Metrik zur Bewertung von Energiesystemen, allerdings gilt dies für Gesellschaften, die von einer 24-Stunden-Verfügbarkeit von Strom ausgehen können. Es ist wichtig, zwischen den Fixkosten einer Investition (Kernkraftwerke unterscheiden sich stark von Gasturbinen und Solaranlagen) und den Betriebskosten zu unterscheiden.
- **Bedarfsdeckung/Ausfälle** – Es gibt Regionen der Welt, in denen nur für einen Teil des Tages Zugang zu Strom besteht.
- **Erreichen von Temperaturzielen** – Menschen möchten in Umgebungen leben, in denen die Temperatur in einem engen Bereich bleibt. Ein Gebäudeverwalter kann mit Strafen für Zeiträume konfrontiert werden, in denen die Temperatur in einer Wohnung außerhalb eines festgelegten Bereichs liegt. Manche Lebensmittel und Medikamente müssen bei bestimmten Temperaturen gekühlt werden, wobei bei Verstößen Strafen fällig werden.
- **Auswirkungen auf die Umwelt**, die von Netto-CO2-Emissionen über die Erwärmung von Wasser und den Landverbrauch bis hin zu Auswirkungen auf die lokale Flora und Fauna reichen (die Liste ist recht lang).
- **Zuverlässigkeit** – Häufigkeit und Schwere von Ausfällen.

### Entscheidungen

Entscheidungen im Energiesektor umfassen Zeitrahmen von Sekunden (zum Ausgleich von Spannungsschwankungen) bis hin zu Jahren, für langfristige Vereinbarungen zum Stromeinkauf:

- Anpassung von Stromerzeugern zur Frequenzregelung, die in 2-Sekunden-Intervallen erfolgt.
- Stromkaufentscheidungen (typischerweise in 5-Minuten-Intervallen), die den Kauf von Strom aus dem Netz oder den Verkauf von Strom an das Netz betreffen können.
- Entscheidungen über den Kauf oder Verkauf von Strom angesichts der aktuellen Netzpreise.
- Kauf und Lagerung von Gas, Öl und Kohle (in manchen Fällen Wasserstoff).
- Installation von Netzsensoren, um den Zustand der Übertragungsleitungen zu erfassen.
- Stromabnahmeverträge, bei denen es sich um Verträge zum Kauf oder Verkauf von Strom über mehrjährige Zeiträume handelt.
- Standort, Typ und Kapazität des Energieerzeugers, von Gasturbinen und Kernkraftwerken bis hin zu Windparks und Solarfeldern.
- Standort, Typ und Kapazität der Energiespeicherung.
- Übertragungskapazität des Netzes, die steuert, wie viel Strom zu einem bestimmten Zeitpunkt übertragen werden kann.

### Unsicherheiten

Energiesysteme bieten eine außergewöhnlich reichhaltige Palette von Unsicherheiten, die sowohl Infrastrukturinvestitionen als auch den täglichen Betrieb des Energiesystems beeinflussen.

- Das Wetter, insbesondere Temperatur und Luftfeuchtigkeit, beeinflusst die Nachfrage in einer Region.
- Windrichtung und -geschwindigkeit für Windturbinen.
- Bewölkung, die die Sonneneinstrahlung verändern kann.
- Ausfälle von Generatoren aufgrund von Wetterereignissen, mechanischen Defekten und Sabotage.
- Netzpreise, die sowohl in 5-Minuten-Intervallen (der Häufigkeit von Aktualisierungen der Netzpreise) als auch in 2-Sekunden-Intervallen (für die Leistungsregelung) schwanken können.
- Menschliche Aktivitäten wie ein Fußballspiel oder ein Konzert.
- Regulatorische Änderungen, die von Steueranreizen über Strafen bis hin zu regelrechten Einschränkungen reichen können (z. B. bei Offshore-Windkraft oder dem Bau neuer Pipelines).
- Die Kosten für Ausrüstung (Solarpaneele, Windturbinen, Batterien, Gasturbinen und Kernkraftwerke) verändern sich kontinuierlich über die Zeit.
- Das Aufkommen neuer Technologien, wie kleiner Kernkraftwerke und neuer Batterietechnologien.

Der Fokus auf erneuerbare Energien hat die Sichtbarkeit von Unsicherheiten erhöht. Abbildung 2.6 zeigt die Solarleistung auf Stundenbasis über ein gesamtes Jahr, was sowohl saisonale Schwankungen als auch die vertrauten täglichen Zyklen und die Auswirkungen der Wolkendecke verdeutlicht. Von besonderer Bedeutung ist die Vorhersagbarkeit der unterschiedlichen Formen von Unsicherheit. Wir wissen, wann die Sonne noch Jahrzehnte in der Zukunft untergehen wird, aber die Wolkendecke ist selbst auf sehr kurzen Zeithorizonten besonders schwer vorherzusagen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Stündliche Solarenergieerzeugung über ein gesamtes Jahr." style="max-width: 515px;">
  <figcaption><span class="fig-num">Abbildung 2.6.</span> Stündliche Solarenergieerzeugung über ein gesamtes Jahr.</figcaption>
</figure>

## Hotel-Ertragsmanagement

### Erzählung

Hotels müssen Reservierungen für Zimmer bis zu einem Jahr im Voraus verwalten, obwohl die meisten Buchungen in den letzten Monaten und in manchen Fällen sogar erst in den letzten Wochen eingehen. Mit fortschreitender Zeit können Hotels die Preise erhöhen, je mehr sich das Hotel füllt. Normalerweise beginnt das Hotel damit, niedrigere Preise anzubieten, aber diese Preise müssen die Möglichkeit widerspiegeln, dass das Hotel voll ausgebucht sein könnte, was bedeuten kann, Geschäftsreisende mit einer wesentlich höheren Zahlungsbereitschaft abzulehnen.

Beim Hotelmanagement geht es um mehr als nur den Zimmerpreis. Hotels können eine Vielzahl von Leistungen anbieten, von kostenlosem Frühstück über Zugang zu Fitnessstudios und Schwimmbädern bis hin zu Tickets für lokale Angebote wie Skipisten oder Ausflüge.

Ein wichtiger Werbekanal sind soziale Medien wie Google und Facebook. Diese Plattformen betreiben ausgeklügelte Auktionen, bei denen Werbetreibende dynamisch bieten müssen, um für einen bestimmten Zeitraum Links zu ihrer Webseite platzieren zu dürfen.

### Kennzahlen

Zu den Kennzahlen für das Hotel-Ertragsmanagement gehören unter anderem:

- Gesamteinnahmen pro Buchungstag, abzüglich der Kosten für angebotene Leistungen.
- Ausgaben für Internet-Anzeigensuchen (Google, Facebook, …).
- Zimmerauslastung.
- Abgelehnte Kunden.
- Nicht genutzte Zimmer.

### Entscheidungen

Die Entscheidungen, die ein Hotelmanager typischerweise trifft, umfassen unter anderem:

- Wie viel für ein Zimmer $\tau$ Tage in der Zukunft berechnet werden soll.
- Auf welchen E-Commerce-Plattformen geworben werden soll.
- Wie viel geboten werden soll, damit die eigenen Anzeigen auf jeder E-Commerce-Plattform geschaltet werden.
- Welche Leistungen zu welchen Preisen angeboten werden sollen.
- Wie die Webseite gestaltet werden soll.

### Unsicherheiten

Hotelmanager müssen sich mit mehreren Unsicherheitsquellen auseinandersetzen:

- Gesamtbuchungen pro Tag für ein bestimmtes Aufenthaltsdatum.
- Die Annahmequote für ein Zimmer in Abhängigkeit von Preis und Leistungsangebot.
- Wie oft ein Werbegebot akzeptiert wird, abhängig von der Höhe des Gebots (oder der Gebotsstrategie).
- Die Erfolgsquote bei Kunden, die ein bestimmtes Webseitendesign sehen.

## Gesundheitsanwendungen

Gesundheit ist ein riesiges Thema, das buchstäblich jeden Menschen betrifft. Wir haben einen starken Anreiz, Entscheidungen zu treffen, die unsere Gesundheit erhalten oder verbessern, während wir gleichzeitig im Rahmen unseres Budgets bleiben. Die folgenden Themen sind nur ein winziger Ausschnitt aus der Fülle von Entscheidungsproblemen, die in diesem Bereich auftreten.

### Management von Typ-2-Diabetes

#### Erzählung

Etwa 10 Prozent der Weltbevölkerung leiden an Typ-2-Diabetes, was eine Unfähigkeit widerspiegelt, den Blutzuckerspiegel (Glukose) im Blut zu kontrollieren. Typ-2-Diabetes entsteht, wenn die Bauchspeicheldrüse nicht genügend Insulin produziert oder wenn der Körper insulinresistent wird. Eine unzureichende Kontrolle der daraus resultierenden erhöhten Blutzuckerwerte kann eine Vielzahl von Gesundheitsproblemen verursachen, darunter Herz- und Nierenversagen, Schäden an den Blutgefäßen der Augen, die zu Glaukom und Erblindung führen können, Fußprobleme durch schlechte Durchblutung (die manchmal eine Amputation erfordern) sowie ein erhöhtes Auftreten von Demenz.

Kurzfristige Blutzuckerspitzen (bekannt als Hyperglykämie), die kurz nach dem Verzehr bestimmter Lebensmittel auftreten können, können verschwommenes Sehen, Kopfschmerzen, Müdigkeit und Konzentrationsschwierigkeiten verursachen. Blutzuckerabfälle (Hypoglykämie) können Schwindel, schnellen Herzschlag, Ohnmacht, Krampfanfälle und sogar ein Koma auslösen.

Diabetes ist somit eine Krankheit, die sowohl langfristig als auch kurzfristig gemanagt werden muss. Erhöhte Blutzuckerwerte über lange Zeiträume können dauerhafte Organschäden verursachen, während kurzfristige Schwankungen medizinische Zustände hervorrufen können, die eine sofortige Behandlung erfordern.

#### Kennzahlen

Wie bei den meisten medizinischen Zuständen erfassen zahlreiche Kennzahlen den Zustand des Patienten, es gibt jedoch auch weitere.

- Blutzucker, gemessen in mg/dL (typischer Bereich 70-130) oder mmol/L (typischer Bereich 3,9-7,2), eine Momentanmessung, die oft nach Mahlzeiten erfolgt.
- Nüchternblutzucker – Dies ist der Blutzuckerspiegel nach 8 Stunden Fasten.
- Time in Range (TIR) – Wird bei kontinuierlichen Blutzuckermessgeräten verwendet und misst die Zeit, in der der Blutzucker innerhalb eines akzeptablen Bereichs bleibt.
- Time above Range (TAR) und Time below Range (TBR) – Prozentanteil der Zeit, in der der Blutzuckerspiegel über oder unter dem akzeptablen Bereich liegt.
- Hämoglobin A1c (HbA1c) – Dieser Test spiegelt einen gleitenden 2-3-monatigen Durchschnitt wider, wobei wünschenswerte Werte unter 6,5 bis 7 Prozent liegen.
- Glukosevariabilität – Die Standardabweichung des Blutzuckers.
- Die Behandlungskosten (Arztbesuche und Medikamente).
- Häufigkeit der notwendigen Arztbesuche.
- Medizinische Folgen von Diabetes, von Fußschmerzen (Neuropathie) über Sehverlust und Amputation bis hin zum Tod.

#### Entscheidungen

Wir weichen von unserem gewohnten Stil ab, Entscheidungen einfach nur aufzulisten, und trennen die medizinischen Entscheidungen des Arztes von den Entscheidungen des Patienten.

**Medizinische Entscheidungen (getroffen vom Arzt)**

- Wahl der Medikamente, Dosierungshöhe und Zeitpunkt. Metformin ist das gängige Mittel der Wahl und wird von 50 bis 80 Prozent der Patienten unter medikamentöser Behandlung verwendet. Viele Patienten vertragen es jedoch nicht und müssen auf eine Reihe anderer Medikamente zurückgreifen, darunter Insulin, Sulfonylharnstoffe, Meglitinide, DPP-4-Hemmer usw.
- Verschreibung technologiegestützter Behandlungen, wie zum Beispiel:
  - Kontinuierliche Blutzuckermessgeräte.
  - Insulinpumpen, die eine präzise Insulinabgabe ermöglichen.
  - Automatisierte Insulinabgabesysteme.
- Chirurgische Eingriffe, wie bariatrische Chirurgie und Transplantation von Pankreasinseln.

**Patientenentscheidungen**

- Einen Arzt aufsuchen.
- Den ärztlichen Anweisungen folgen.
- Sich testen lassen, in Heimtestgeräte investieren.
- Medikamente verabreichen.
- Ernährungsentscheidungen – Dies umfasst natürlich eine breite Palette von Entscheidungen bezüglich Art und Menge der Nahrung.
- Bewegungsentscheidungen – Welche Art, wie oft, wie intensiv.

#### Unsicherheiten

- Nebenwirkungen eines Medikaments.
- Wie gut ein Patient auf ein Medikament anspricht (Veränderung des Blutzuckerspiegels).
- Wie gut ein Patient ein Ernährungs- und Bewegungsprogramm einhält.
- Fähigkeit (und Bereitschaft) des Patienten, den Behandlungsanweisungen zu folgen.
- Langfristiger Verlauf der Krankheit mit zunehmendem Alter des Patienten.
- Verfügbarkeit neuer Medikamente.

### Öffentliche Gesundheit – Verwaltung von Naloxon-Kits

#### Erzählung

Während Drogenkonsum und Überdosierungen seit Jahrzehnten ein Problem darstellen, kam es ab etwa 2013 zu einem dramatischen Anstieg der Todesfälle durch Überdosierungen aufgrund synthetischer Opioide, der die Todesfälle durch alle anderen Drogen schnell mit großem Abstand übertraf. Ein Großteil dieses Anstiegs war auf die Einführung von Oxycontin durch Purdue Pharmaceuticals im Jahr 1996 zurückzuführen. Oxycontin enthielt Oxycodon, das weniger süchtig machend war als andere Schmerzmittel.

Oxycodon hatte eine langwirksame Formulierung, die nicht den schnellen "Kick" bot, nach dem Drogenkonsumenten suchten. Die Öffentlichkeit stellte jedoch fest, dass das Medikament zerkleinert und missbraucht werden konnte – eine Praxis, die nach 2013 sprunghaft zunahm. Im Folgenden fassen wir die Kennzahlen, Entscheidungen und Unsicherheiten aus der Perspektive eines für die Landes- oder Kommunalregierung tätigen Beamten des öffentlichen Gesundheitswesens zusammen.

#### Kennzahlen

- Anzahl der Opioid-Überdosierungen, bei denen:
  - Niemand vor Ort Naloxon hatte (Person überlebte oder starb).
  - Naloxon vorhanden war, aber nicht verabreicht wurde (Person überlebte oder starb).
  - Naloxon verabreicht wurde (Person überlebte oder starb).
- Anzahl der Überdosierungen, bei denen der Rettungsdienst (EMS) reagierte.
- Anzahl der Überdosierungen, bei denen die Person ins Krankenhaus transportiert werden musste.
- Kosten der Naloxon-Kits.
- Kosten für das Gesundheitssystem.
  - Überdosis wird außerhalb des Krankenhauses behandelt (z. B. durch den Rettungsdienst).
  - Überdosis erfordert Transport der Person ins Krankenhaus (sehr kostspielig).
- Durchsetzungskosten.

#### Entscheidungen

Die folgenden Entscheidungen werden aus der Perspektive der Landesregierung betrachtet:

- Wie viele Naloxon-Kits sollen verschiedenen Arten von Organisationen zugeteilt werden:
  - Schadensminderungsstellen, Behandlungsanbieter.
  - Organisationen für direkte Dienstleistungen.
  - Ersthelfer (Rettungsdienst, Polizei, Feuerwehr).
  - Andere gemeindebasierte Organisationen, die mit Drogenkonsumenten in Kontakt stehen (glaubensbasierte Organisationen, Wohnungsanbieter, Lebensmittelbanken usw.).
  - Apotheken, Krankenhäuser.
  - Gefängnisse und Justizvollzugsanstalten.
- Wie viele Kits sollen Nadelaustauschprogrammen nach Region zugeteilt werden:
  - Überdosis-Brennpunkte.
  - Ländlich vs. städtisch.
  - Verschiedene Landkreise/Regionen.
  - Gefährdete Bevölkerungsgruppen, wie z. B. Stammesgebiete.
- Wer soll darin geschult werden, eine Überdosis zu erkennen und rückgängig zu machen? Wer soll im Gebrauch der Kits geschult werden?
- Wie soll die Verfügbarkeit von Naloxon-Kits beworben werden?
- Wie soll die Naloxon-Verteilungsstrategie finanziert werden?
- Bei wem sollen Anträge zur Mittelbeschaffung eingereicht werden?

#### Unsicherheiten

- Nutzungsraten und -muster durch Personen/Patienten. Dies wird beeinflusst durch:
  - Bewusstsein – Menschen wissen möglicherweise nicht, dass Naloxon verfügbar ist.
  - Vertrauen – Menschen fühlen sich möglicherweise nicht wohl dabei, offenzulegen, dass sie es benötigen.
  - Wie Menschen auf Opioidkonsum und Behandlung reagieren.
  - Verfügbarkeit von Drogen auf dem Markt.
  - Transportbarrieren – Menschen können möglicherweise keine Verteilungsstelle erreichen.
- Verunreinigungen in der Versorgung mit unbekannten Auswirkungen auf Naloxon und die Rückgängigmachung von Überdosierungen.
- Für Präventivmaßnahmen wie Naloxon-Kits bereitgestelltes Budget und Personalkapazität für deren Verteilung.

### Durchführung klinischer Studien zur Arzneimittelprüfung {#clinicaltrials}

#### Erzählung

Im Jahr 2024 gab es fast 500.000 klinische Studien, die verschiedene Medikamente und Behandlungen auf ihre Wirksamkeit hin testeten. Eine klinische Studie umfasst drei Phasen:

- **Phase I: Sicherheits- und Dosierungstests** ($5–$10 Millionen) – Eine kleine Gruppe gesunder Personen wird verwendet, um die Toxizität bei verschiedenen Dosierungsstufen zu testen und mögliche Nebenwirkungen zu identifizieren. Forscher können auch verschiedene Verabreichungsmethoden eines Medikaments vergleichen, wie Tabletten, Pflaster oder Injektionen.
- **Phase II: Bewertung von Wirksamkeit und Nebenwirkungen** ($20–$100 Millionen) – Die Behandlung wird an einer größeren Gruppe von Patienten angewendet, die an der Krankheit oder dem Zustand leiden, der Ziel der Behandlung ist. Geleitet von den Erkenntnissen aus Phase I liefert diese Phase einen ersten Hinweis auf die Wirksamkeit der Behandlung. Nebenwirkungen werden beobachtet, und die Ergebnisse werden mit bestehenden Behandlungen verglichen.
- **Phase III: Großangelegte Tests** (100+ Millionen $) – Unter Verwendung von Pools mit Hunderten, oft Tausenden von Patienten aus verschiedenen Regionen wird die Behandlung mit konkurrierenden Therapien verglichen, um die Wirksamkeit zu bewerten und weiterhin auf unerwünschte Reaktionen zu achten. Zusätzliche Daten werden für die behördliche Prüfung gesammelt.

Klinische Studien sind nicht nur sehr teuer, sie nehmen auch viel Zeit in Anspruch. Während dieser Bewertung läuft die 20-jährige Uhr des Patentschutzes weiter, was einen Anreiz schafft, zu einem (hoffentlich positiven) Ergebnis zu kommen, um auf den Markt zu gehen.

Der Prozess der Durchführung von Studien stellt ein umfangreiches logistisches Problem bei der Verwaltung der Studien dar und erfordert eine erhebliche Finanzierung, was auch ein beträchtliches finanzielles Risiko bedeutet. Der gesamte Prozess muss unter erheblicher Unsicherheit hinsichtlich der Leistung eines Medikaments oder einer Behandlung im großen Maßstab durchgeführt werden.

Klinische Studien können auf jeder der drei Ebenen scheitern, aus Gründen wie:

- Mangelnde Wirksamkeit – Das Medikament wirkt nicht wie erhofft.
- Sicherheitsbedenken – Es können erhebliche Nebenwirkungen auftreten.
- Regulatorische Hürden – Das Medikament kann auf regulatorische Probleme stoßen.
- Kommerzielle oder strategische Gründe – Ein Unternehmen verfolgt ein Medikament möglicherweise aufgrund von Finanzprognosen, finanziellen Risiken oder Wettbewerbsfragen nicht weiter.

Typische Erfolgsraten sind:

- Übergang von Phase I zu Phase II: ~60 Prozent.
- Übergang von Phase II zu Phase III: ~30 Prozent.
- Übergang von Phase III zur Zulassung: 50-60 Prozent.

Die Gesamterfolgsrate über den gesamten Prozess liegt bei etwa 10 Prozent.

#### Metriken

Es gibt eine Vielzahl von Metriken, die in die Bewertung eines Medikaments einfließen:

- Erfolgreiche Übergänge von jeder der drei Phasen zur nächsten Stufe.
- Die Kosten jeder Phase.
- Die Kosten für den Erhalt der behördlichen Zulassung in jeder Stufe.
- Die Wirksamkeit des Medikaments oder der Behandlung.
- Das Vorhandensein von Nebenwirkungen.
- Herstellungskosten des Medikaments.
- Kosten für den Vertrieb des Medikaments (es kann Kühlung erfordern).
- Kosten für die Verabreichung des Medikaments. (Oral? Injektion?)
- Marketingkosten.

#### Entscheidungen

Wir beschreiben Entscheidungen aus der Perspektive des Unternehmens, dem das Medikament gehört und das ein Interesse daran hat, es auf den Markt zu bringen:

- In jeder Phase gibt es jede Woche eine Entscheidung, die Tests fortzusetzen, die Prüfung abzubrechen und zu beenden (das Medikament scheitert), oder abzubrechen und zur nächsten Stufe überzugehen (Erfolg).
- Wie viele Patienten befragt und eingeladen werden sollen, an der Studie teilzunehmen.
- Auswahl der Krankenhäuser als klinische Teststandorte.
- Entscheidung, Teststandorte zu eröffnen (z. B. in einem Einkaufszentrum).
- Preisgestaltung des Medikaments.
- Marketingstrategien: An Ärzte? Direkt an den Markt?

#### Unsicherheiten

Entscheidungen müssen unter Berücksichtigung folgender Unsicherheiten getroffen werden:

- Die Rate, mit der geeignete Personen identifiziert werden können.
- Die Reaktion der Personen auf die Behandlung.
- Die Entscheidungen der Zulassungsbehörden.
- Die erwartete Akzeptanz des Medikaments durch Ärzte.
- Entscheidungen von Wettbewerbern, die den Absatz des Medikaments beeinflussen können.

## Durchführung einer Präsidentschaftswahl {#presidentialelection}

### Erzählung

Jeder, der die Serie "West Wing" gesehen hat (oder Präsidentschaftswahlen genau verfolgt), hat die Herausforderung gesehen, eine Präsidentschaftskampagne zu leiten. Es handelt sich stets um ein komplexes operatives Problem, das die Verwaltung von Kandidaten und Mitarbeitern erfordert, oft entweder durch das Sammeln von Informationen (z. B. Durchführung von Umfragen) oder das Verbreiten von Informationen (Halten von Reden), und stets in einem budgetbeschränkten Umfeld.

### Metriken

Zu den wichtigsten Metriken gehören:

- Ob der Kandidat die Wahl gewinnt oder nicht.
- Die Anzahl der Stimmen des Wahlmännerkollegiums.
- Umfragen in jedem Bundesstaat (besonders in den Swing States).
- Der verfügbare Geldbetrag jede Woche.
- Spenden jede Woche.
- Spenden als Reaktion auf Social-Media-Beiträge.
- Wöchentliche Ausgaben.

### Entscheidungen

Der Kampagnenmanager muss eine Reihe von Entscheidungen treffen, darunter:

- Wo jeden Tag Reden gehalten werden sollen.
- Welche Themen betont werden sollen.
- Auswahl des Vizepräsidentschaftskandidaten.
- Welche Werbekanäle genutzt werden sollen (Fernsehen, Social Media, Plakatwände) und mit welchen Ausgabenraten.
- Ausgaben für gedrucktes Werbematerial (Schilder, Postwurfsendungen, Broschüren).
- Wie viele Personen auf verschiedenen Ebenen, nach Region, eingestellt werden sollen.
- Wo Wahlkampfbüros eingerichtet werden sollen.
- Wann und wo Umfragen durchgeführt werden sollen und welche Fragen gestellt werden sollen.

### Unsicherheiten

Präsidentschaftswahlen müssen im Angesicht einer Reihe von Unsicherheiten verwaltet werden:

- Wie viele Stimmen der Kandidat erhält.
- Veränderung der Beliebtheitswerte im Laufe der Zeit und nach wichtigen Ereignissen (z. B. Parteitag).
- Veränderung der Beliebtheitswerte nach der Hervorhebung unterschiedlicher Themen.
- Spenden insgesamt und als Reaktion auf spezifische Spendenaufrufe (z. B. per SMS).
- Erwartete Verzerrungen in den Umfragen.
- Ereignisse in den Nachrichten, die die öffentliche Wahrnehmung (positiv oder negativ) der Politik des Kandidaten beeinflussen.
- Angriffswerbung von Gegnern.
- Große Spenden an günstige oder konkurrierende Super-PACs.
- Gesundheitliche Zwischenfälle, die den Kandidaten betreffen.

## Flottenmanagement für Komplettladungen

### Erzählung

In den USA wird Fracht hauptsächlich in einer Form transportiert, die als Komplettladungs-Trucking (full truckload trucking) bekannt ist, bei der ein Verlader einen typischerweise 53 Fuß langen Anhänger füllt, der bis zu 46.000 Pfund (abhängig von der Frachtart) von einem Ort zum anderen transportieren kann. Sie funktionieren ähnlich wie Taxis – der Lkw-Fahrer (mit einer Zugmaschine) fährt leer, um an einem Ort eine Frachtladung abzuholen, und fährt sie dann zu einem anderen Ort, an dem der Anhänger entweder entladen oder abgestellt wird, um später entladen zu werden. Ein Fahrer kann an einem einzigen Tag ein oder zwei Ladungen bewegen, aber die meisten Ladungen benötigen zwischen 1 und 5 Tagen.

Sobald ein Fahrer eine Ladung abgesetzt hat, besteht die Herausforderung darin, die Anzahl der Meilen zu minimieren, die der Fahrer leer fahren muss, um eine weitere Ladung abzuholen. Drei Themen erschweren den Betrieb eines Komplettladungs-Transportunternehmens wirklich:

- Die Bewegung von Fracht ist nicht ausgeglichen. Es gibt Regionen des Landes, die mehr Fracht produzieren, als verbraucht wird (dies gilt besonders für den mittleren Westen der USA), und Regionen, die hauptsächlich Fracht verbrauchen (typischerweise die Küsten und Großstädte). Infolgedessen ist der Markt bereit, deutlich mehr dafür zu zahlen, Fracht aus Produktionsregionen in Verbrauchsregionen zu transportieren, während Ladungen aus Verbrauchsregionen möglicherweise nicht einmal genug einbringen, um den Lkw zu betreiben (aber es ist besser, als leer zu fahren).
- Lkw-Fahrer müssen strenge Regeln einhalten, wie viele Stunden sie täglich und wöchentlich fahren dürfen. Zudem müssen sie nach Hause zurückkehren, entweder täglich, wöchentlich oder, bei Fernfahrern, ein- oder zweimal im Monat.
- Die Buchung von Fracht ist hochgradig dynamisch. Die meisten Ladungen werden ein bis drei Tage im Voraus gebucht. Ein Transportunternehmen muss möglicherweise Fahrer bereithalten, um die Bedürfnisse eines wichtigen Verladers zu erfüllen, der Ladungen nur einen Tag im Voraus anmeldet.

Es gibt über 2 Millionen Fahrer, die in der Komplettladungsbranche tätig sind. Die meisten Transportunternehmen betreiben weniger als fünf Fahrer, während andere 10.000 Fahrer oder mehr haben.

### Metriken

Zu den am häufigsten gemeldeten Leistungsmetriken gehören:

- Betriebsgewinn pro Woche oder pro Meile.
- Umsatz pro Fahrer pro Woche oder pro Meile.
- Leerfahrten als Prozentsatz der Gesamtmeilen.
- Meilen pro Fahrer pro Woche.
- Anteil der Zeit, in der Fahrer pünktlich nach Hause kommen.
- Prozentsatz der pünktlich abgeholten und gelieferten Ladungen.
- Fahrerfluktuation (Anzahl der Fahrer, die pro Woche kündigen).

### Entscheidungen

Entscheidungen aus der Perspektive des für Disposition und Ladungsplanung verantwortlichen Managers könnten Folgendes umfassen:

- Welcher Ladung ein Fahrer zugewiesen werden soll.
- Ob eine Ladung angenommen werden soll, die für eine zukünftige Abholung angeboten wird.
- Ob eine Ladung von den eigenen Fahrern des Transportunternehmens oder von einer Vermittlungsabteilung (die Owner-Operator findet, die die Ladung transportieren können) übernommen werden soll.
- Welchen Preis das Transportunternehmen anbieten sollte, um Fracht für einen Verlader auf einer bestimmten Verkehrsstrecke (Ursprungs-Ziel-Paar) im kommenden Jahr zu transportieren? Dies ist Teil eines jährlichen "Ausschreibungsprozesses", der den bevorzugten Frachtführer für jeden Verlader auf jeder Strecke bestimmt.
- Wie viele Fahrer eingestellt werden sollen, die an einem bestimmten Ort wohnen (als Fahrerdomizil bezeichnet).
- Wie viele Zugmaschinen und Anhänger die Flotte betreiben sollte.

### Unsicherheiten

Zu einigen der Unsicherheiten, denen sich das Komplettladungs-Trucking gegenübersieht, gehören:

- Wie viele Ladungen werden jeden Tag, auf jeder Strecke, von den wichtigsten Verladern angeboten, die der Frachtführer bedient?
- Wie viele Ladungen werden zum Transport verfügbar sein, und zu welchem Preis, auf öffentlichen "Ladungsbörsen", aus denen jeder Frachtführer wählen kann?
- Wird ein Fahrer die Zuweisung zu einer bestimmten Ladung akzeptieren?
- Sind die Frachtvolumina steigend oder fallend?
- Wie sind die aktuellen Spotpreise?
- Wird eine Ladung auf einer externen Ladungsbörse tatsächlich verfügbar sein, wenn der Frachtführer sich entscheidet, sie zu transportieren?

## Bargeldmanagement bei Investmentfonds

### Erzählung

Ein Investmentfondsmanager, der einen Kurs zur Betriebsplanung für seinen MBA belegt hatte, wurde mit einem klassischen Problem konfrontiert, das als "Zeitungsjungen-Problem" (newsvendor problem) bekannt ist. Zeitungsjungen-Probleme entstehen, wenn man über eine Menge einer Ressource entscheiden muss (zum Beispiel Zeitungen), die einer Nachfrage zugeteilt werden soll, die zum Zeitpunkt der Entscheidung nicht bekannt ist. Wenn man zu viel zuteilt, bleiben Ressourcen übrig, wobei wir annehmen, dass sie nicht für die Zukunft aufbewahrt werden können (genau wie die heutigen Zeitungen morgen keinen Wert mehr haben). Wenn wir zu wenig zuteilen, dann haben wir unbefriedigte Nachfrage.

Nach Abschluss seines MBA (an einer Top-Business-School) stand der Investmentfondsmanager vor dem Problem, zu entscheiden, wie viel Bargeld vorgehalten werden soll, um Rückgabeanfragen zu bearbeiten. Das Problem wird in der in Abbildung 2.7 gezeigten E-Mail zusammengefasst, aber die Kernelemente sind wie folgt:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/MutualFundemail.png" alt="E-Mail eines Investmentfondsmanagers und ehemaligen MBA-Studenten, der um Rat bittet, wie der Bargeldbestand verwaltet werden soll.">
  <figcaption><span class="fig-num">Abbildung 2.7.</span> E-Mail eines Investmentfondsmanagers und ehemaligen MBA-Studenten, der um Rat bittet, wie der Bargeldbestand verwaltet werden soll.</figcaption>
</figure>

- Der Investmentfonds muss genügend Bargeld vorhalten, um Rückgabeanfragen zu erfüllen. Wenn nicht genügend Bargeld vorhanden ist, wenn eine Rückgabeanfrage eingeht, müssen Aktien liquidiert werden, wodurch Transaktionskosten entstehen und möglicherweise ein Verkauf zu einem niedrigeren Preis erzwungen wird. Wenn zu viel Bargeld gehalten wird, dann verpasst man das potenzielle Wachstum von Investitionen am Markt.
- Es gibt zwei Arten von Kunden: Privatanleger und institutionelle Anleger. Rückgaben von Privatanlegern können mehrere Tage bis zur Abwicklung dauern, während die größeren Rückgabeanfragen institutioneller Anleger noch am selben Tag beglichen werden müssen.
- Einzahlungen und Rückgabeanfragen korrelieren mit der Marktentwicklung. Wachstum am Markt kann neue Einzahlungen anziehen, während Rückgänge plötzliche Rückgabeanfragen auslösen können.

### Metriken

Zu den in dieser Übung enthaltenen Metriken gehören:

- Gesamtrendite des Portfolios pro Tag, netto nach Betriebskosten (Transaktionskosten, Rückgabekosten).
- Höhe des gehaltenen Bargelds.
- Verkäufe, die erforderlich sind, um Rückgabeanfragen zu decken.

### Entscheidungen

Die Entscheidungen, vor denen der Investmentfondsmanager steht, sind:

- Wie viel Bargeld gehalten werden soll.
- Welche Vermögenswerte verkauft werden sollen, um Bargeld zu beschaffen.
- Welche Vermögenswerte gekauft werden sollen, wenn zu viel Bargeld vorhanden ist.

### Unsicherheiten

Die Entscheidungen müssen angesichts folgender Unsicherheiten getroffen werden:

- Einzahlungen durch Privatanleger oder institutionelle Anleger.
- Rückgabeanfragen durch Privatanleger oder institutionelle Anleger.
- Veränderungen der Marktindizes.
- Veränderungen der Zinssätze.

## Lieferkettenfinanzierung {#supplychainfinance}

### Erzählung

Jede Transaktion in der Lieferkette, die den Kauf oder Verkauf von Rohstoffen, Komponenten und Endprodukten beinhaltet, impliziert einen Geldfluss und schafft ein komplexes Netzwerk von Flüssen zwischen Käufern und Verkäufern (auf allen Ebenen der Lieferkette) sowie Finanzpartnern von Drittanbietern, die möglicherweise Finanzierung und Versicherung bereitstellen.

Die Schritte einer Finanztransaktion umfassen typischerweise:

- Der Lieferant sendet Waren und Rechnungen an den Käufer.
- Der Käufer genehmigt die Rechnung in seinem ERP-System.
- Nach der Genehmigung kann der Lieferant sich dafür entscheiden, vorzeitig vom Finanzierer (der eine Bank sein könnte) bezahlt zu werden.
- Der Finanzierer zahlt den Lieferanten (typischerweise mit einem Abschlag).
- Der Käufer zahlt den Finanzierer bei Fälligkeit der Rechnung (vielleicht 60 oder 90 Tage später).

Es gibt eine Vielzahl von Finanztransaktionen, die auftreten können, wie zum Beispiel:

- Rechnungsgenehmigung – Der Käufer bestätigt, dass die Rechnung gültig und zur Zahlung fällig ist.
- Forderungsabtretung – Der Lieferant überträgt die Rechnung auf den Finanzierer.
- Vorzeitige Zahlung – Der Finanzierer zahlt den Lieferanten vor dem Fälligkeitsdatum.
- Fälligkeitszahlung – Der Käufer zahlt den Finanzierer zum vereinbarten Fälligkeitstermin.
- Transaktionsgebühren/Abschläge – Der Finanzierer verdient eine Gebühr aus der Transaktion.

Es gibt eine Reihe von Unsicherheitsquellen im Lieferkettenmanagement, die sich auf die Finanzen auswirken. Unternehmen können sich mit verschiedenen Formen der Versicherung schützen. Einige Beispiele sind:

- Bestandsversicherung - Schützt Waren, die in Lagerhäusern oder auf dem Transportweg (einschließlich Logistikzentren von Drittanbietern) gelagert werden, vor Diebstahl, Beschädigung oder Verlust.
- Währungsabsicherungen zum Schutz vor Veränderungen im relativen Wert unterschiedlicher Währungen beim Import aus anderen Ländern.
- Handelskreditversicherung - Schützt Lieferanten oder Kreditgeber vor dem Risiko der Zahlungsunfähigkeit des Käufers aufgrund von Insolvenz, langwierigem Zahlungsverzug oder politischen Ereignissen.
- Seetransportversicherung - Deckt physischen Verlust oder Beschädigung von Waren während des Transports - auf dem Land-, See- oder Luftweg - bei internationalen oder inländischen Sendungen ab.
- Politische Risikoversicherung - Schützt vor Verlusten aufgrund politischer Instabilität, wie Enteignung, Inkonvertibilität von Währungen, Import-/Exportbeschränkungen, Krieg oder zivile Unruhen.
- Erfüllungsbürgschaft - Garantiert, dass ein Lieferant oder Auftragnehmer seinen vertraglichen Verpflichtungen nachkommt. Versichert Käufer gegen den Ausfall von Lieferanten.
- Credit Default Swaps - Werden von Finanzinstituten zur Absicherung gegen das Kreditrisiko der Gegenpartei eingesetzt.

### Kennzahlen

Es gibt eine recht lange Liste an Finanzkennzahlen, die von größeren Unternehmen verwendet werden. Eine Auswahl derjenigen, die direkt mit dem Finanzmanagement einer Lieferkette zusammenhängen, umfasst:

- EBITDA – Gewinn vor Zinsen, Steuern, Abschreibungen auf Sachanlagen und Abschreibungen auf immaterielle Vermögenswerte. Dies ist eine übergeordnete Kennzahl, die die Herstellungskosten der verkauften Waren (COGS), Umsätze und alle Kosten erfasst, die zur Steuerung des Cash- und Kapitalflusses anfallen.
- Eigenkapitalrendite (ROE) und Gewinn je Aktie (EPS).
- Freier Cashflow.
- Working Capital und Barreserven.
- Verschuldungsgrad (Fremdkapital-Eigenkapital-Verhältnis).
- Zinsaufwand.

### Entscheidungen

Eine Auswahl an Entscheidungen, die von einem Finanzvorstand getroffen werden, umfasst:

- Wahl der Finanzierungsstrategien für unterschiedliche Transaktionen.
- Wahl der Versicherungsformen (siehe obige Liste).
- Wie viel Bargeld vorgehalten werden soll und auf welchen Konten.
- Dividendenzahlungen.
- Kapitalallokation.
- Fremd- vs. Eigenkapitalfinanzierung.

### Unsicherheiten

Auch hier eine kleine Auswahl unterschiedlicher Formen von Unsicherheit, die in der Lieferkettenfinanzierung auftreten:

- Zahlungsausfälle durch Käufer und Verkäufer.
- Währungsschwankungen.
- Änderungen bei Zöllen und Handelsbeschränkungen.
- Rezessionsrisiko, Verschiebungen bei den Gesamtumsätzen (nach oben oder unten).
- Zinsvolatilität.
- Volatilität der Kreditmärkte.

## Intelligentes Ausprobieren {#intelligenttrialanderror}

### Erzählung

Es gibt eine gewaltige Problemklasse bei der Entscheidungsfindung, die am besten als "intelligentes Ausprobieren" (intelligent trial and error) beschrieben werden kann. Diese entstehen, wenn es eine Menge diskreter Wahlmöglichkeiten gibt und die Leistung jeder Wahlmöglichkeit ungewiss ist. Beispiele für Problemstellungen, in denen dies auftritt, umfassen:

- **Materialwissenschaft**
  - Welche Chemikalien gemischt werden sollen, um ein neues Material herzustellen.
  - Bei welcher Temperatur ein Prozess ablaufen soll.
  - Welche Schritte im Herstellungsprozess durchzuführen sind.
- **Gesundheit**
  - Welches Medikament zur Behandlung einer Erkrankung ausprobiert werden soll.
  - Ob ein Test (Bildgebung, Bluttest) durchgeführt werden soll.
  - Wo eine Klinik zur Verteilung von Naloxon-Kits angesiedelt werden soll.
- **E-Commerce**
  - Welches von zwei Webseitendesigns verwendet werden soll.
  - Welches Produkt auf einer Webseite beworben werden soll, um den Umsatz zu maximieren.
  - Welcher Preis (aus einer Menge möglicher Preise) für ein Produkt verlangt werden soll.
- **Fertigung**
  - Optimierung eines Halbleiterfertigungsprozesses (Temperaturen, Zeit in einem chemischen Bad, chemische Konzentrationen, Durchmesser des Siliziumwafers).
- **Finanzen**
  - Finden der besten Einstellungen für die Parameter einer Handelspolitik.
  - Welcher Lieferant angesichts des Ausfallrisikos genutzt werden soll.
  - Wie viel Reservekapital vorgehalten werden soll.
- **Lieferkettenmanagement**
  - Welcher Lieferant für ein Produkt genutzt werden soll, angesichts der Unsicherheit über die Produktqualität.
  - Festlegung der Bestellpunkte für die Bestandsauffüllung.
  - Welche Werbekanäle genutzt werden sollen.
- **Auswahl von Personen**
  - Baseball – Wer sollte an vierter Stelle schlagen oder als Catcher spielen.
  - Basketball – Wer sollte auf welcher Position spielen.
  - Portfoliomanager – Wer erzielt die besten Ergebnisse bei der Verwaltung eines Portfolios.

Jeder dieser Kontexte beinhaltet die Auswahl aus einer Menge von Wahlmöglichkeiten. Wir möchten diejenige wählen, die am besten funktioniert, sind uns aber nicht sicher, wie gut jede einzelne abschneiden wird. Die Situation ist in Abbildung 2.8 dargestellt. Es kann zwei Wahlmöglichkeiten geben, Dutzende, Hunderte oder viele Tausende.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoices2.jpg" alt="A set of discrete choices.">
  <figcaption><span class="fig-num">Abbildung 2.8.</span> Eine Menge diskreter Wahlmöglichkeiten.</figcaption>
</figure>

Dieses grundlegende Problem tritt in einer Vielzahl von Varianten auf:

- **Belief-Modell**
  - Unabhängige Beliefs – Hierbei steht unser Belief über eine Wahlmöglichkeit in keinem Zusammenhang mit den Beliefs über andere Wahlmöglichkeiten. In realen Anwendungen ist dies relativ selten.
  - Korrelierte Beliefs – Wahlmöglichkeiten können Merkmale teilen, wie z. B. Medikamente aus derselben Familie, ein Hemdstil mit unterschiedlichen Farben oder die "Nähe" zweier Wahlmöglichkeiten, insbesondere wenn diese einen diskretisierten Preis, eine Konzentration oder einen geografischen Standort darstellen.
  - Parametrische Modelle – Wir können unsere Beliefs mithilfe eines parametrischen Modells konstruieren, etwa eines linearen Modells, das unterschiedliche Preise mit geschätzten Nachfragen in Beziehung setzt.
- **Kosten der Durchführung eines Tests**
  - Kostengünstige Experimente – Zu beobachten, wie oft auf eine Anzeige auf einer Webseite geklickt wird, ist eine sehr kostengünstige Möglichkeit, ein Experiment durchzuführen. Zeiträume können von Mikrosekunden über Sekunden bis zu Minuten reichen.
  - Teure Experimente – Ein Laborexperiment kann einen Tag bis eine Woche (oder mehr) dauern. Komplexe Computersimulationen können Stunden bis eine Woche oder mehr in Anspruch nehmen.
- **Rauschpegel**
  - Experimente mit geringem Rauschen liefern präzise Schätzungen aus einem einzigen Versuch.
  - Experimente mit hohem Rauschen liefern sehr verrauschte Ergebnisse, die mehrere Tests mit derselben oder ähnlichen Wahlmöglichkeiten erfordern.
- **Offline- vs. Online-Lernen**
  - Offline-Lernen beschreibt Experimente, die in einem Labor oder einer Computersimulation durchgeführt werden, bei denen wir eine schlechte Leistung eines Experiments tolerieren können.
  - Online-Lernen beschreibt das Lernen im Feld, bei dem wir mit dem Ergebnis eines Experiments leben müssen (z. B. beim Testen eines Produktpreises oder der Wirkung eines Medikaments bei einem Patienten).
- **Vorhandensein physischer oder finanzieller Ressourcen** – Grundlegende Lernprobleme sind von einem Experiment zum nächsten allein aufgrund dessen verknüpft, was wir lernen. Es ist jedoch möglich, dass Probleme durch eine physische (oder finanzielle) Ressource verknüpft sind:
  - Es kann ein festes Budget für die Durchführung von Experimenten geben. Jedes Experiment verbraucht einen Teil des Budgets.
  - Physische Experimente können Bestände an Zutaten erfordern, die verfügbar sein müssen.
  - Ein Experiment kann eine Maschine erfordern, die für eine bestimmte Aufgabe eingerichtet ist, wodurch es einfacher wird, andere Experimente durchzuführen, die dieselbe Einrichtung benötigen.
- **Sequenzielle oder parallele Experimente**
  - Sequenzielle Experimente:
    - Bei einem Patienten kann jeweils ein Medikament getestet werden, um festzustellen, welches bei diesem Patienten am besten wirkt.
    - Ein Hersteller kann jeweils einen Prozess testen, um festzustellen, welcher die höchste Ausbeute erzielt.
  - Parallele Experimente:
    - Ein Einzelhändler kann mehrere Werbekampagnen (z. B. In-Store-Werbung) in verschiedenen Filialen gleichzeitig durchführen, um zu lernen, welche am besten funktioniert.
    - Ein Wissenschaftler kann Dutzende oder Hunderte unterschiedlicher Verbindungen auf einer einzigen Platte testen, um zu sehen, wie sie auf einen bestimmten Krebszelltyp reagieren.
- **Sofortiges vs. verzögertes Lernen**
  - Sofortiges Lernen - Wir treffen eine Wahl (z. B. ein Experiment durchzuführen) und erfahren die Ergebnisse unmittelbar.
  - Verzögertes Lernen - Es gibt eine zeitliche Verzögerung zwischen der Durchführung eines Experiments und dem Erfahren des Ergebnisses. Verzögerungen können in Umgebungen mit hoher Geschwindigkeit Minuten betragen, bis hin zu einem Jahr oder mehr, wie es der Fall ist, wenn eine Bank einen Kredit vergibt und Jahre warten muss, um zu erfahren, ob der Kreditnehmer Zahlungen versäumt oder ausfällt.

Jede dieser Situationen kann weiterhin durch unser Trio aus Kennzahlen, Entscheidungen und Unsicherheiten beschrieben werden.

### Kennzahlen

Bei jedem "Experiment" wird angenommen, dass es eine Beobachtung der Leistung liefert, sei es die Anzahl der Anzeigenklicks, die Reaktion eines Patienten auf ein Medikament oder die Ausbeute eines Prozesses zur Herstellung von Halbleitern. Natürlich kann es mehr als eine Kennzahl zur Beschreibung der Leistung geben, die wir möglicherweise in einer bestimmten Kombination optimieren möchten. Wir sollten jedoch zwei wichtige Dimensionen der Leistung unterscheiden:

- Die Kosten für das Ausprobieren jeder Wahlmöglichkeit.
- Die durchschnittliche Leistung über einen bestimmten Horizont.
- Die Variabilität um den Durchschnitt, welche die Zuverlässigkeit eines Prozesses erfasst.
- Die Wahrscheinlichkeit "schlechter" Ergebnisse.
- Andere Leistungskennzahlen, wie Nebenwirkungen eines Medikaments oder das Potenzial für erhebliche Marktanteilsverluste.

### Entscheidungen

Dies ist einfach – es handelt sich um die Menge der Wahlmöglichkeiten. Diese könnten sein:

- **Binär** – Beispielsweise
  - Ob eine Handlung ausgeführt werden soll (ein Unternehmen verkaufen, ein neues Produkt einführen, ein Medikament in klinische Studien schicken) oder nicht.
  - Ob ein Vermögenswert gehalten oder verkauft werden soll.
  - Welches von zwei Webseitendesigns verwendet werden soll (häufig als A/B-Testing bezeichnet).
  - Ob einem Patienten ein Medikament gegeben werden soll oder nicht.
- **Diskrete Menge** – Dies könnte eine Menge von Lieferanten sein, eine Auswahl unterschiedlicher Medikamentenbehandlungen, unterschiedliche Marketingkanäle zur Bewerbung eines Produkts, oder eine beliebige Menge von Tausenden molekularer Verbindungen, die in der Arzneimittelentwicklung getestet werden sollen.
- **Eine diskretisierte Menge von Werten eines kontinuierlichen Parameters**, wie der Preis eines Produkts, die Konzentration einer Chemikalie, die Temperatur zum Brennen eines Halbleiters.

Es gibt Probleme, bei denen die Menge der Wahlmöglichkeiten nicht offensichtlich ist. Zum Beispiel könnten wir nach einem Lieferanten suchen, der eine spezialisierte Komponente aus einem neuen Material herstellen kann, das die Arbeit bei hohen Temperaturen erfordert. Oder wir benötigen eine ganz spezielle Chemikalie zur Herstellung eines neuen Impfstoffs, oder eine extrem reine Form eines Gases, das im Prozess der Herstellung der neuesten Halbleiterchips benötigt wird. Lieferanten, Materialien oder Chemikalien zu finden, die einen Bedarf erfüllen, kann äußerst herausfordernd sein.

Dann gibt es Probleme, bei denen wir unsere Leistungskennzahl kennen, aber nicht wissen, wie wir sie verbessern können. Ein Zementhersteller muss möglicherweise Kosten senken, um wettbewerbsfähig zu bleiben, hat aber keine klare Strategie, wie dies zu erreichen ist. Ein Arzt möchte eine Erkrankung bei einem Patienten behandeln, weiß aber nicht, welche Behandlung er verfolgen soll.

### Unsicherheiten

Unsicherheiten bei Problemen mit diskreter Wahl (Trial-and-Error) können in zwei Formen auftreten:

- Die Leistung einer Wahlmöglichkeit, die sich typischerweise davon unterscheidet, wie wir dachten, dass sie abschneiden würde, als wir uns für diese Wahlmöglichkeit entschieden. Wir haben möglicherweise eine Punktschätzung der Kennzahl(en) für jede Wahlmöglichkeit oder eine Form von Verteilung. Die tatsächliche Leistung unterscheidet sich typischerweise von der Punktschätzung, und wenn uns eine Verteilung möglicher Ergebnisse vorliegt, muss das tatsächliche Ergebnis nicht zwangsläufig aus einer angenommenen Verteilung stammen.
- Ob die Wahlmöglichkeit verfügbar ist – Einige Beispiele sind:
  - Die Wahlmöglichkeit kann ein Lieferant sein, der nicht in der Lage ist, ein Angebot für einen Auftrag abzugeben.
  - Die Wahlmöglichkeit kann eine Person zur Besetzung einer Stelle sein, die jedoch möglicherweise nicht bereit ist, die Stelle anzunehmen.
  - Wir möchten möglicherweise eine Art von Material verwenden, aber Probleme in der Lieferkette könnten dessen Verfügbarkeit einschränken.

## Übungen

Wenn eine Übung nach einer Interaktionsmatrix fragt, können Sie die Vorlage für die "Framing Interaction Matrix" verwenden, die unter [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/) heruntergeladen werden kann.

<ol class="book-exercises">
<li>Wählen Sie für das Bestandsproblem ein Produkt, mit dem Sie vertraut sind (zum Beispiel Lebensmittel, Kleidung, Haushaltswaren, Medikamente oder Baumaterialien), und beantworten Sie Folgendes:
  <ol type="a">
    <li>Identifizieren Sie Metriken, Entscheidungen und Unsicherheiten, die für Ihr Problem relevant erscheinen, wobei Sie die Listen der einzelnen Dimensionen aus dem Abschnitt zum Bestand als Orientierung nutzen.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Nachfragemanagement-Problem:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen sich Ihrer Meinung nach ein Filialleiter eines Möbeleinzelhandelsgeschäfts gegenübersehen würde.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Stromnetz-Problem:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen man sich Ihrer Meinung nach bei der täglichen Planung von Stromgeneratoren gegenübersieht.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Hotel-Revenue-Management-Problem:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen man sich Ihrer Meinung nach bei der Verwaltung von Zimmerbuchungen über einen Planungshorizont von zwei Monaten gegenübersieht.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Problem der Behandlung von Typ-2-Diabetes:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen sich Ihrer Meinung nach ein Arzt gegenübersieht, der Entscheidungen über einen Patienten mit Typ-2-Diabetes trifft.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Problem der Verwaltung von Naloxon-Kits:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen sich Ihrer Meinung nach eine Landesregierung gegenübersieht, die die Zuteilung von Naloxon-Kits an verschiedene Landkreise mit Mitteln der Bundesregierung plant.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Problem der Durchführung einer Präsidentschaftswahl:
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen sich Ihrer Meinung nach der Wahlkampfleiter eines Präsidentschaftskandidaten gegenübersieht.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Für das Problem der Verwaltung einer Lkw-Flotte (Truckload-Flotte):
  <ol type="a">
    <li>Wählen Sie eine Reihe von Metriken, Entscheidungen und Unsicherheiten, denen man sich Ihrer Meinung nach bei der Planung der Entscheidung stellt, welche Ladungen transportiert werden sollen (typischerweise bis zu sieben Tage im Voraus durchgeführt).</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Betrachten Sie das Problem des Kassenbestands eines Investmentfonds:
  <ol type="a">
    <li>Die E-Mail des Investmentfondsmanagers schlägt eine Möglichkeit vor, zu entscheiden, wie viel Geld in bar gehalten werden soll. Schreiben Sie diese Formel auf.</li>
    <li>Verwenden Sie die Framing-Interaktionsmatrix, um Interaktionsmatrizen zu erstellen, die Ihre beste Einschätzung der Auswirkung jeder Art von Entscheidung auf jede Leistungsmetrik erfassen.</li>
    <li>Wiederholen Sie (b), um Ihre beste Einschätzung der Auswirkung jeder Art von Unsicherheit auf jede Leistungsmetrik zu erfassen.</li>
  </ol>
</li>
<li>Nennen Sie ein Beispiel für ein "Trial-and-Error"-Problem, dem Sie in Ihrer eigenen Erfahrung begegnen, bei dem Sie wiederholt dieselbe Entscheidung treffen müssen.
  <ol type="a">
    <li>Beschreiben Sie den Kontext des Trial-and-Error-Problems und was die Notwendigkeit auslöst, die Entscheidung erneut zu treffen.</li>
    <li>Beschreiben Sie die Metriken (eine oder mehrere, falls erforderlich), die Menge der Auswahlmöglichkeiten und alle Formen von Unsicherheit, die im Verlauf des Entscheidungsprozesses auftreten.</li>
    <li>Schlagen Sie vor, wie Sie bei der Entscheidungsfindung vorgehen würden.</li>
  </ol>
</li>
</ol>

{% endraw %}
