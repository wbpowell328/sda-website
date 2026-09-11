---
layout: book
title: "Kapitel 1: Die Grundlagen des Framings"
permalink: /bridging-vol1/de/chapter-1/
date: 2026-07-17
book_home: /bridging-vol1/de/contents/
book_data: bridging_vol1_toc_de
lang: de
translated_from: en
translated_from_hash: e55b91c9188391dc
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Die Menschheit besteht aus einer Vielzahl von Prozessen, von denen jeder eine Reihe von Aktivitäten umfasst, die anhand einer oder mehrerer Leistungskennzahlen bewertet werden können. Es scheint ein grundlegendes Merkmal zu sein, dass Menschen immer besser werden wollen. Sportler wollen schneller oder stärker sein; Unternehmen wollen profitabler sein; Angehörige der Gesundheitsberufe wollen mehr Leben retten; das Stromnetz möchte Elektrizität kostengünstiger bereitstellen.

Dieses Buch wird durch folgende Aussage definiert:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="Wenn Sie ein besseres {Beliebiges} betreiben wollen, müssen Sie bessere Entscheidungen treffen.">
</figure>

Wir gehen von der Prämisse aus, dass wir stets daran arbeiten, Dinge zu verbessern, und dass wir dies nur tun können, indem wir die Elemente manipulieren, die wir kontrollieren – auch bekannt als *Entscheidungen*.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabelle 1.1.</span> Eine Auswahl von Problemstellungen mit Beispielen für Zielsetzungen, die Leistung erfassen.</caption>
<thead>
<tr><th>Anwendung</th><th>Zielsetzungen</th></tr>
</thead>
<tbody>
<tr><td>Energiesysteme</td><td>Kosten senken, Ausfälle minimieren</td></tr>
<tr><td>Öffentliche Gesundheit</td><td>Todesfälle minimieren, Produktivität maximieren</td></tr>
<tr><td>Geschäftsanwendungen</td><td>Gewinne maximieren, Kosten minimieren</td></tr>
<tr><td>Management der Lieferkette</td><td>Kosten minimieren, Umsatz/Produktivität maximieren</td></tr>
<tr><td>Fertigung</td><td>Kosten minimieren, Ausbeute maximieren, Defekte minimieren</td></tr>
<tr><td>Wirtschaft</td><td>Inflation minimieren, Wachstum und Beschäftigung maximieren</td></tr>
<tr><td>Finanzen</td><td>Renditen maximieren, Risiko minimieren</td></tr>
<tr><td>Transportsysteme (öffentlich)</td><td>Abdeckung maximieren, Kosten minimieren</td></tr>
<tr><td>Frachttransport</td><td>Kosten minimieren, Service maximieren, Fahrerbedürfnisse erfüllen</td></tr>
<tr><td>Ingenieurwesen</td><td>Festigkeit maximieren, Kosten minimieren, Leistung maximieren</td></tr>
<tr><td>Arzneimittelforschung</td><td>Todesfälle, negative Gesundheitsfolgen und Kosten minimieren</td></tr>
<tr><td>Sport</td><td>Siege maximieren, Spielergehälter minimieren, Zuschauerzahlen maximieren</td></tr>
<tr><td>Unterhaltung</td><td>Aufrufe maximieren, Kosten minimieren</td></tr>
</tbody>
</table>
</div>

Tabelle 1.1 listet eine Reihe menschlicher Aktivitäten auf, jeweils gefolgt von einer kurzen Liste von Kennzahlen, die zur Bewertung der Leistung herangezogen werden könnten (die Liste der Kennzahlen kann recht lang sein). Diese Anwendungen deuten auf das Universum von Problemen hin, bei denen wir "besser werden wollen", aber die Herausforderung bestand darin, einen schrittweisen Weg zu schaffen, der zu verbesserter Leistung führt.

Alle realen Problemstellungen müssen mit einer unstrukturierten, "einfachsprachigen" Beschreibung beginnen. Im Gegensatz dazu setzt jedes mathematische Modell voraus, dass das Problem bereits in eine Form strukturiert wurde, die von einem Computer verstanden werden kann. Was fehlt, sind die Beiträge von Menschen, die das Problem tatsächlich verstehen – dies erzeugt die Lücke, die durch die unfertige Brücke auf dem Buchcover dargestellt wird.

Gängige Modellierungspraxis beinhaltet heute typischerweise eine Person, die mit einer "Entscheidungstechnologie" vertraut ist – dies kann ganzzahlige oder nichtlineare Programmierung sein, oder maschinelles Lernen, oder Monte-Carlo-Simulation (heute könnten wir auch große Sprachmodelle hinzunehmen, was technisch gesehen eine Form des maschinellen Lernens ist). Wenn ein Unternehmen sich an einen Experten wendet (sei es aus der Industrie oder der Wissenschaft), wird dieser sofort dazu neigen, das Problem aus der Perspektive seiner eigenen Expertise zu betrachten.

Der technische Experte wird dann die Fragen stellen, die zu seinem Kompetenzbereich passen. Der Experte für ganzzahlige Programmierung wird nach Entscheidungsvariablen und einer Kostenfunktion fragen; der Experte für maschinelles Lernen wird sich auf unbekannte Größen konzentrieren, die geschätzt oder prognostiziert werden müssen; der Simulationsexperte wird möglicherweise Designentscheidungen identifizieren, die mittels Simulation bewertet werden müssen.

Dieses Verhalten ist eine Form von Verzerrung, die wir *Expertise-Filterung* nennen: das Problem auf eine Weise kennenzulernen, die die eigene Expertise widerspiegelt. Dies geschieht praktisch bei jedem Projekt, da der Fachexperte nicht über die Expertise verfügt, den am besten geeigneten technischen Experten zu bestimmen. Die technischen Experten gehen stets davon aus, dass ihre Expertise relevant ist, und betrachten Probleme durch die Linse ihrer Ausbildung. Dies ist keine Frage der Täuschung; es liegt einfach in der menschlichen Natur.

Wir vertreten die Position, dass alle "Probleme" durch den Wunsch motiviert sind, einen Prozess auf irgendeine Weise zu verbessern. Um einen Prozess zu verbessern, sind Änderungen erforderlich, die das Ergebnis von Entscheidungen sind, und wir möchten bessere Entscheidungen treffen. Diese Perspektive scheint jedes Problem in ein Optimierungsproblem zu verwandeln, da wir immer die besten Entscheidungen treffen wollen. Das bedeutet nicht, dass wir Optimierungswerkzeuge einsetzen werden. Wir setzen nicht einmal voraus, dass wir überhaupt eine formale Analyse durchführen werden, aber wir werden diese Tür immer offenhalten.

Wir werden einen wesentlich ganzheitlicheren Prozess zur Verbesserung eines Prozesses verwenden. Wir beginnen damit, den ersten Schritt, der in der Optimierungsgemeinschaft als "Modellierung" bekannt ist (die Übersetzung realer Probleme in mathematische Modelle), durch einen Schritt zu ersetzen, den wir "Framing des Problems" nennen und der der Modellierung vorausgeht. "Framing" ist ein wohlbekannter Begriff bei der Lösung geschäftlicher Probleme, aber wir werden ihm eine wesentlich präzisere Bedeutung geben.

Unsere Version des Framings wird ein Prozess sein, der erfordert, Menschen darin zu schulen, die richtigen Fragen zu stellen, die für Fachexperten (Geschäftsleute, Angehörige der Gesundheitsberufe, Wissenschaftler, Ingenieure) leichter verständlich sind, und die spezifische Elemente eines mathematischen Modells ausfüllen – *falls ein solches zur Lösung des Problems benötigt werden sollte.* Framing sollte nicht von einem technischen Experten durchgeführt werden, gerade wegen des Risikos der Expertise-Filterung. Unser Ansatz wird jedoch dazu führen, dass Fragen beantwortet werden, die beim Einsatz jedes analytischen Werkzeugs benötigt würden. Wir glauben, dass unser Framing-Prozess bei vielen Anwendungen Klarheit schaffen wird, die dazu beitragen kann, das Problem sogar ohne Computer zu lösen.

## Was ist ein "Problem"? {#whatisaproblem}

Bevor wir ein Problem lösen, was verstehen wir überhaupt unter einem "Problem"? Obwohl es viele Arten von Problemen gibt, werden wir aus der Perspektive der Entscheidungsfindung zwei Stile identifizieren:

- **Entscheidungsorientierte Probleme** — Dies sind Probleme, bei denen die zu treffenden Entscheidungen klar sind:
  - Routenplanung für Lkw
  - Bestellung von Lagerbeständen
  - Preisgestaltung eines Produkts
  - Wahl einer medizinischen Behandlung
  - Wahl einer Batteriespeichertechnologie
  - Standortwahl einer Einrichtung
  - Wo für ein Produkt, eine Dienstleistung oder einen Kandidaten geworben werden soll
  - Wahl, welchen Bundesstaat man besucht (bei einer Wahlkampagne)
- **Kennzahlenorientierte Probleme** — Diese treten typischerweise in komplexeren Situationen auf, in denen wir wissen, was wir erreichen möchten, obwohl wir zunächst möglicherweise nicht wissen, welche Entscheidungen getroffen werden können, um die Kennzahlen zu verbessern. Einige Beispiele für kennzahlenorientierte Situationen sind:
  - Senkung von Kosten, Steigerung von Umsätzen oder Verbesserung von Gewinnmargen.
  - Reduzierung von Lagerbeständen
  - Verbesserung der Ausbeute eines Fertigungsprozesses
  - Reduzierung von Infektionen
  - Maximierung finanzieller Renditen
  - Reduzierung von Risiko
  - Verbesserung der Auslastung von Personal, Ausrüstung und Einrichtungen
  - Maximierung der Stimmenzahl (bei einer Wahlkampagne)

Kennzahlenorientierte Probleme sind im Allgemeinen komplexer, da Ziele leichter zu formulieren sind als die Entscheidungen, die zur Erreichung eines Ziels erforderlich sind. Oft wissen wir nicht einmal, welche Entscheidungen zur Verbesserung der Kennzahlen genutzt werden könnten. Tatsächlich ist die Identifizierung der Entscheidungen mit dem größten Einfluss auf die Leistungskennzahlen ein wichtiger Schritt beim Framing eines Problems.

Gleichzeitig kann auch die Identifizierung der richtigen Kennzahlen ein wichtiger Schritt beim Framing eines Problems sein. Tatsächlich kann in Situationen mit mehreren Entscheidungsträgern (wie es in jeder Organisation vorkommt) eine wichtige Art von Entscheidung eines Managers darin bestehen, die Kennzahlen auszuwählen, mit denen Personen und Geschäftseinheiten weiter unten in der Organisationshierarchie bewertet werden.

## Rahmenbedingungen für Entscheidungsprobleme

Entscheidungsprobleme können auf verschiedene Weise entstehen:

- Wir müssen Entscheidungen treffen, um ein bestimmtes, vorliegendes Problem zu lösen, das nur einmal gelöst werden muss.
- Wir verfügen über eine klar definierte Menge von Entscheidungen und möchten einfach besser werden. In den meisten Fällen werden die Entscheidungen von Menschen getroffen, und es könnte die Hoffnung bestehen, dass Computer dies besser könnten.
- Wir möchten unsere Leistung im Laufe der Zeit verbessern, insbesondere wenn wir die erwarteten Ziele nicht erreichen. Bei solchen Problemen wissen wir möglicherweise nicht einmal im Voraus, welche Entscheidungen die Leistung beeinflussen.
- Wir verfügen über eine klar definierte Menge von Entscheidungen, die von Menschen getroffen werden, und möchten den Prozess automatisieren, um die manuelle Komponente zu entfernen – möglicherweise als Form der Kostensenkung (keine Personalkosten mehr) oder um mehr Kontrolle über einen Prozess zu erlangen.
- Wir simulieren Entscheidungen zum Zweck der zukünftigen Planung des Systems. Dies könnte strategische Planungsanwendungen unterstützen oder das Verständnis der Auswirkungen heutiger Entscheidungen auf die Zukunft fördern.

Jedes dieser Szenarien stellt eine durchaus vernünftige Motivation dar, um ein zu lösendes Problem oder eine Verbesserungsmöglichkeit zu identifizieren. Eine große Herausforderung besteht darin, sicherzustellen, dass man den richtigen Kennzahlen Aufmerksamkeit schenkt, und dann alle Möglichkeiten zu identifizieren, wie man die Kennzahlen beeinflussen kann. Alles, was Sie kontrollieren, fällt in die Kategorie einer Entscheidung.

## Die drei Stufen der Entscheidungsautomatisierung {#three-stages}

<figure class="book-figure" style="float:right; max-width: 260px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/NotreDame.png" alt="Eine mittelalterliche Kathedrale.">
  <figcaption><span class="fig-num">Abbildung 1.1.</span> Eine mittelalterliche Kathedrale.</figcaption>
</figure>

Ein Artikel in der USA Today während der COVID-Pandemie beschrieb das Problem der Verteilung von Impfstoffen als "unfassbar komplex". Der Grund für diese Aussage ist, dass Menschen nicht wissen, wie sie über komplexe Probleme nachdenken sollen. Es hilft manchmal, sich daran zu erinnern, dass mittelalterliche Kathedralen von Menschen ohne formale Ausbildung entworfen und gebaut wurden; das Problem bei der Impfstoffverteilung ist nicht die Komplexität – es ist zu wissen, wie man darüber nachdenkt.

Was gefehlt hat, ist eine strukturierte Herangehensweise, um darüber nachzudenken, wie man Entscheidungen im Zeitverlauf trifft. Unser Prozess beinhaltet die Aufteilung des Prozesses der Automatisierung von Entscheidungen in drei Stufen:

**Stufe I: Framing** — Hier identifizieren wir die Kernelemente eines Entscheidungsproblems, was damit beginnt, zunächst die folgenden drei Fragen zu beantworten:

1. Was sind die Leistungskennzahlen?
2. Welche Arten von Entscheidungen werden getroffen, und wer trifft sie? Wir treffen Entscheidungen mit einer Methode, die wir *Politik* nennen.
3. Welches sind die Quellen der Unsicherheiten, die die Leistung beeinflussen?

**Stufe II: Modellierung** — Der nächste Schritt besteht darin, die Details des universellen Modellierungsprozesses auszufüllen. Dies beginnt mit der Beantwortung der folgenden Fragen:

4. Wie treffen wir Entscheidungen? Dies geschieht mithilfe einer Funktion, die wir "Politik" nennen. Diese werden aus vier Klassen von Politiken entwickelt (dargestellt in Band III).
5. Welche Informationen werden benötigt? Diese bilden die Elemente unserer *Zustandsvariable* (alternativ auch "Wissensstand" genannt), die aus den Informationen besteht, die erforderlich sind, um:
   - eine Entscheidung zu treffen (was von der Politik abhängt).
   - beliebige Leistungskennzahlen zu berechnen.
   - (a) und (b) in der Zukunft zu berechnen.

   Informationen können unterteilt werden in:
   - was wir perfekt über Mengen physischer und finanzieller Ressourcen wissen.
   - Parameter und Funktionen, die für verschiedene Zwecke verwendet werden.
   - was wir schätzen und in Form von Überzeugungen (Beliefs) darstellen müssen.
6. Wie entwickelt sich die Zustandsvariable im Zeitverlauf?

**Stufe III: Implementierung** — Dies reicht von der Beschaffung der benötigten Informationen bis zur Umsetzung und Bewertung der Entscheidungen. Dies umfasst:

7. Wie beschaffen wir die benötigte Information? Es gibt Information, die sofort verfügbar ist, Information, die aus anderen Quellen beschafft werden muss, und Information, die geschätzt (oder prognostiziert) werden muss.
8. Wie setzen wir die Entscheidungen um, die wir mithilfe der Politik treffen?
9. Wie bewerten wir, wie gut sich die Entscheidungen in der Praxis bewähren?

Wir beschreiben die drei Phasen in den folgenden Abschnitten.

### Phase I: Das Problem einrahmen {#framingtheproblem}

Die anfängliche Phase des Automatisierungsprozesses bezeichnen wir als „das Problem einrahmen", die aus der Beantwortung der folgenden Fragen besteht:

1. Was sind die Leistungskennzahlen?
2. Welche Arten von Entscheidungen werden getroffen (und wer trifft sie)?
3. Was sind die Unsicherheitsquellen, die die Umsetzung der Entscheidungen und die Leistung des Systems beeinflussen?

Diese drei Fragen reichen nicht aus, um ein Problem zu lösen, aber sie sind der Ausgangspunkt für jeden Prozess, der das Treffen und Umsetzen von Entscheidungen beinhaltet.

<figure class="book-figure" style="float:right; max-width: 220px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/Chessboard.png" alt="Schachspielen mag schwierig sein, aber es ist sehr einfach zu modellieren.">
  <figcaption><span class="fig-num">Abbildung 1.2.</span> Schachspielen mag schwierig sein, aber es ist sehr einfach zu modellieren.</figcaption>
</figure>

Es hilft, diese Fragen anhand eines der anspruchsvollsten je erfundenen Spiele zu veranschaulichen: Schachspielen (siehe Abbildung 1.2). Die Beantwortung unserer drei Einrahmungsfragen ergibt sich wie folgt:

1. **Leistungskennzahl** – Das Spiel gewinnen.
2. **Entscheidungen** – Zulässige Züge.
3. **Unsicherheiten** – Die Züge des Gegners.

Natürlich macht die triviale Modellierbarkeit das Schachspielen nicht einfach, aber Schach diente lange als Benchmark, um die Leistungsfähigkeit algorithmischer Strategien wie „bestärkendes Lernen" zu demonstrieren.

Das Lösen des Problems erfolgt in Schritt 4 (Phase II), und obwohl dies recht schwierig ist, sind die verbleibenden Schritte ebenfalls trivial.

Betrachten wir nun einige der Probleme, die wir in [Kapitel 2](/bridging-vol1/de/chapter-2/) identifizieren werden:

- Wie reduzieren wir die Todesfälle durch Fentanyl?
- Wie gestalten wir eine Lieferkette, die die Kosten minimiert und robust gegenüber verschiedenen Unsicherheitsquellen ist?
- Wie verwalten wir eine Lkw-Flotte, um Gewinne zu maximieren und dabei einen pünktlichen Service zu gewährleisten?
- Was ist die beste Strategie zur Reduzierung der CO2-Emissionen?
- Wie sollte ein großer Hersteller sein Geld anlegen und investieren, um Renditen zu maximieren und dabei Risiken zu steuern und kurz- und mittelfristige Liquiditätsanforderungen zu erfüllen?

Die Beantwortung unserer drei Einrahmungsfragen für diese Probleme ist keine triviale Übung. Aus diesem Grund widmen wir drei Kapitel dem Prozess der Beantwortung jeder Frage:

- Kapitel 3 – Leistungskennzahlen
- Kapitel 4 – Entscheidungen
- Kapitel 5 – Unsicherheiten

Diese Themen werden anhand der Anwendungen in [Kapitel 2](/bridging-vol1/de/chapter-2/) veranschaulicht. Wir geben einen kurzen Einblick in diese drei Kernelemente, indem wir in den folgenden Unterabschnitten verschiedene Arten von Kennzahlen, Entscheidungen und Unsicherheiten beschreiben.

#### Arten von Kennzahlen

Kennzahlen kommen in einer endlosen Vielfalt vor und hängen vollständig vom Kontext ab.

- **Wirtschaft** – Unternehmen zeichnen sich durch lange Listen von Finanzkennzahlen, Produktivitätskennzahlen, Leistungskennzahlen, Arbeitskennzahlen und Kennzahlen aus, die erfassen, wie der Markt bedient wird.
- **Gesundheit** – Krankheit/Tod, Heilungen, Nebenwirkungen, Mobilität, Kraft, Kosten.
- **Energie** – Kosten, bereitgestellte Energiemenge, Ausfälle, Nachfragereduzierung.
- **Fertigung** - Ausbeute, Produktleistung, Geschwindigkeit, Kosten.
- **Arzneimittelforschung** - Leistung, Patentschutz, Marktpotenzial, Nebenwirkungen, Gesundheitsrisiken.
- **Sport** - Erzielte Punkte, Beständigkeit, Popularität bei Fans, Verletzungen, Beständigkeit.
- **Frachttransport** - Umsatz, Kosten, Service, Personalanforderungen, Marktvolatilitätsexposition.

Die Wahl der richtigen Kennzahlen ist eine eigene Herausforderung, unabhängig davon, ob sie zur Steuerung des Verhaltens eines Computermodells oder des Verhaltens von Menschen verwendet werden.

Unabhängig davon, was eine Kennzahl misst, ist die Frage, wie sie zur Steuerung der Systemleistung eingesetzt wird. Kennzahlen können auf drei verschiedene Arten verwendet werden:

- **Zielfunktionen** - Dies sind Kennzahlen, die wir maximieren oder minimieren wollen.
- **Zielwerte** - Wir möchten möglicherweise, dass die Kennzahl einer Zielzahl so nahe wie möglich kommt, etwa der Temperatur in einem Gebäude oder dem Blutdruck eines Patienten.
- **Grenzwerte** - Wir möchten möglicherweise, dass eine Kennzahl unter oder über einem bestimmten Grenzwert bleibt. Zum Beispiel möchten wir vielleicht den Blutzucker eines Patienten unter einem bestimmten Wert halten; Fehlbestände sollten unter einem bestimmten Niveau bleiben; Finanzportfolios müssen die Volatilität unter einem festgelegten Wert halten.

#### Arten von Entscheidungen

Eine erste Liste unterschiedlicher Arten von Entscheidungen ergibt sich wie folgt:

- **Binär** – Diese treten auf, wenn wir zwischen zwei Webseitendesigns wählen (bekannt als A/B-Test), oder festlegen, wann ein Vermögenswert verkauft werden soll (zu jedem Zeitpunkt können wir halten oder verkaufen).
- **Diskrete Auswahlmöglichkeiten** – Es hilft, diese Kategorie in drei Klassen zu unterteilen:
  - Eine kleine Menge diskreter Auswahlmöglichkeiten - Wir müssen möglicherweise das beste Medikament, den besten Lieferanten für eine Komponente oder den besten Standort für eine Anlage wählen.
  - Eine Menge diskretisierter Werte eines kontinuierlichen Parameters – Beispiele sind Preise, Dosierungen eines Medikaments oder Temperaturen zum Backen eines Halbleiterwafers.
  - In manchen Fällen kann die Anzahl der diskreten Auswahlmöglichkeiten recht groß sein, etwa bei der Wahl eines von 30.000 verschiedenen Molekülen, die für ein Medikament verwendet werden könnten, oder bei der Wahl von Standorten für verschiedene Anlagen, die auf 100 verschiedene mögliche Standorte verteilt sind.
- **Kontinuierliche Auswahlmöglichkeiten** – Preise, Konzentrationen, Abmessungen, Temperaturen, … Diese können Skalare sein (das heißt, ein einzelner Parameter) oder Vektoren, bei denen wir möglicherweise über mehrere (potenziell viele) kontinuierliche Parameter hinweg optimieren.
- **Vektoren diskreter Auswahlmöglichkeiten** – Wir haben möglicherweise eine Menge von M Fahrern, die wir N Ladungen zuweisen, wobei wir entscheiden müssen, ob wir Fahrer m der Ladung n zuweisen.

Eine zweite Dimension von Entscheidungen betrifft den Zeitpunkt, zu dem eine jetzt getroffene Entscheidung in der Zukunft umgesetzt wird. Zum Beispiel:

- Ein Disponent weist einem Fahrer eine Ladung zu, die sofort bewegt werden soll.
- Ein Arzt verschreibt möglicherweise ein Blutzuckermedikament, das mehrere Stunden benötigt, um zu wirken.
- Ein Netzbetreiber plant heute, welche Dampfgeneratoren morgen laufen sollen.
- Ein Lieferkettenmanager gibt eine Bestellung auf, die mehrere Wochen oder Monate bis zur Ankunft benötigen kann.
- Eine Fluggesellschaft bestellt möglicherweise neue Flugzeuge, deren Lieferung zwei Jahre dauern kann.
- Eine Investition bei einer Private-Equity-Firma kann dieses Kapital für 8 bis 10 Jahre binden.

Eine dritte Dimension von Entscheidungen betrifft die Identifizierung, wer eine Entscheidung trifft.

- Das Management der Impfstoffverteilung umfasst Entscheidungen, die bei Bundes- und Landesbehörden beginnen und sich über Krankenhäuser, Ärzte und Pflegepersonal erstrecken, die den Impfstoff verabreichen.
- Die Herstellung von Automotoren umfasst die Beteiligung einer Reihe von Herstellern, die die Materialien liefern und die verschiedenen Komponenten des Motors fertigen, die letztendlich über Händler, die die Bestellungen von Fahrzeugen kontrollieren, auf den Markt gebracht werden.
- Klinische Arzneimittelstudien umfassen Entscheidungen von Wissenschaftlern, Regulierungsbehörden, finanzierenden Unternehmen, Krankenhäusern und Kliniken, die das Medikament verabreichen, sowie dem Patienten.
- Ein Speditionsunternehmen führt die Disposition mit einem Team von Disponenten und Ladungsmanagern durch, das möglicherweise durch ein einziges Computermodell ersetzt werden könnte, das diese Entscheidungen im gesamten Unternehmen koordinieren kann.

#### Formen von Unsicherheiten

Der wohl subtilste Aspekt beim Treffen von Entscheidungen betrifft das Verständnis der Unsicherheiten, die unweigerlich bei der Umsetzung von Entscheidungen in der Praxis auftreten. Es überrascht nicht, dass die Formen der auftretenden Unsicherheiten stark vom Kontext abhängen. Einige Beispiele umfassen:

- **Finanzhandel** – Hier interessieren wir uns hauptsächlich für Veränderungen der Vermögenspreise, aber Händler interessieren sich auch für die Nachfrage nach Vermögenswerten und Veränderungen anderer Kennzahlen, die auf die Marktrichtung hindeuten könnten, wie Veränderungen bei der Arbeitslosigkeit, den Zinssätzen oder den Einzelhandelsumsätzen. Märkte bewegen sich oft mit Erwartungen, die notorisch schwer zu messen sind.
- **Lieferkettenmanagement** – Hier müssen wir mit Unsicherheiten bei der Marktnachfrage nach einem Produkt, den Strategien der Wettbewerber, der Leistung der Lieferanten und dem Verhalten der Arbeiter (besonders wenn gewerkschaftlich organisiert) umgehen. Zusätzlich gibt es äußere Einflüsse wie Wetter, Erdbeben und die Ausbreitung von Krankheiten.
- **Öffentliche Gesundheit** – Die Ausbreitung einer Krankheit hängt von der Quelle der Krankheit ab (dies kann eine einzelne Infektion sein oder von vielen infizierten Tieren stammen, aus denen sich ein menschlicher Stamm entwickelt hat), der Prävalenz der Krankheit, der Übertragungsrate, ihrer Auswirkung auf Patienten, der Entwicklung von Medikamenten, der Verteilung der Medikamente und der Reaktion der Öffentlichkeit auf die Akzeptanz der Medikamente.

Jedes dieser Beispiele umfasst mehrere Unsicherheitsquellen. Diese weisen unterschiedliche Formen von Unsicherheit auf, wie zum Beispiel:

- Feinkörniges Rauschen wie tägliche zufällige Nachfragen.
- Preis- und Wetteränderungen weisen typischerweise Spitzen und Ausbrüche auf.
- Es kann unerwartete Verschiebungen zu neuen Plateaus geben, die Veränderungen in der Technologie, im Konsumentenverhalten oder bei Wettbewerberentscheidungen widerspiegeln.
- Einzelne, seltene Ereignisse wie ein Erdbeben oder die Erfindung einer bedeutenden neuen Technologie.
- Eventualitäten für Ereignisse, die eintreten könnten, aber noch nie tatsächlich eingetreten sind.

Die Berücksichtigung von Unsicherheit muss im Hinblick darauf erfolgen, wie sie sich auf die Leistungskennzahlen auswirkt. Wenn wir Entscheidungen unter Unsicherheit treffen, müssen wir Entscheidungen treffen, etwa wie eine Entscheidung getroffen werden soll, die im Durchschnitt gut funktionieren, obwohl wir nicht wissen, was in der Zukunft passieren wird.

Manche Formen der Unsicherheit führen jedoch eine neue Dimension namens Risiko ein, die Faktoren erfasst, die in den Leistungskennzahlen nicht vorhanden wären, wenn keine Unsicherheit existierte. Risiko ist ein sehr beliebtes Thema in Bereichen wie Finanzwesen, Lieferkettenmanagement und Gesundheit. Es gibt viele Bücher, die über Risiko sprechen, sowie sehr anspruchsvolle Arbeiten, die Risiko modellieren, ohne jemals eine formale Definition von Risiko zu liefern. Wir werden diese Definition in Kapitel 3 bereitstellen.

### Phase II: Modellierung {#universalmodelingframework}

Unsere anfänglichen drei Fragen (Leistungskennzahlen, Entscheidungen, Unsicherheiten) legen das Fundament für das, was wir unser *universelles Modellierungsframework* (oder UMF) nennen werden. Das UMF kann verwendet werden, um *jedes* Entscheidungsproblem zu modellieren, besonders wenn wir die erweiterte Version verwenden, um Multiagentenprobleme zu behandeln. Vorerst legen wir den Schwerpunkt darauf, die Entwicklung von Entscheidungen und Information über die Zeit zu erfassen. In Band II werden wir das UMF mit vollständiger mathematischer Notation beschreiben (was nicht so schlimm ist, wie es klingt), aber vorerst werden wir es in einfachem Englisch skizzieren.

Das Universal Modeling Framework besteht aus fünf Elementen:

1. **Zustandsvariablen** erfassen alle Informationen, die wir benötigen, um Entscheidungen zu treffen und unsere Leistungskennzahlen zu berechnen. Ein Verständnis der Elemente einer Zustandsvariable informiert den Prozess, welche Information benötigt wird, um Entscheidungen zu treffen.
2. **Entscheidungsvariablen** repräsentieren, welche Entscheidungen wir treffen könnten (aufbauend auf den Arten von Entscheidungen, die wir bei der Einrahmung des Problems beschrieben haben). Beachten Sie, dass wir davon ausgehen, dass wir Entscheidungen mit einer „Politik" treffen, *die später entworfen werden soll.*
3. **Exogene Information** ist jede neue Information, die eintrifft, nachdem wir eine Entscheidung getroffen haben, und bevor wir unsere nächste Entscheidung treffen.
4. **Die Übergangsfunktion** beschreibt, wie sich die Zustandsvariable ändert, gegeben welche Entscheidung wir getroffen haben und gegeben die exogene Information, die eintraf, nachdem wir eine Entscheidung getroffen haben.
5. **Die Zielfunktion** beschreibt, wie die Leistung des Systems anhand der Methode zu bewerten ist, die wir zum Treffen von Entscheidungen gewählt haben.

Die Identifikation der Zustandsvariablen erfordert die Wahl der Methode (genannt die Politik) zur Entscheidungsfindung, sodass dies zuerst erfolgen muss. Die Bewertung und Feinabstimmung von Politiken erfordert jedoch den gesamten universellen Modellierungsrahmen, wenn wir einen Simulator verwenden wollen. Letztlich sind der Entwurf von Politiken (der eine wichtige Rolle dabei spielt, zu bestimmen, welche Information wir in der Zustandsvariable benötigen) und die Bewertung der Politiken ein iterativer Prozess.

Der universelle Modellierungsrahmen wird in Band II wesentlich ausführlicher behandelt, wo wir eine sehr grundlegende mathematische Notation einführen.

Falls der universelle Modellierungsrahmen offensichtlich klingt, ist er es auch. Er ist kaum mehr als ein Rahmenwerk, das die Entwicklung dessen, was wir wissen (die Zustandsvariable), durch Entscheidungen (die wir kontrollieren) und die exogene Information (die wir nicht kontrollieren) beschreibt. Was vielleicht erstaunlich ist, ist, dass dies in der Forschungsliteratur nicht Standard ist, obwohl es Nischen gibt, in denen es zu finden ist.

Der wohl schwierigste Schritt ist der Entwurf der Politik zur Entscheidungsfindung. Wir trennen den Prozess der Bewertung einer Politik vom Entwurf der Politik, was unseren Ansatz von dem unterscheidet, der praktisch in jedem Buch über stochastische Optimierung verwendet wird. Glücklicherweise verfügen wir über eine Strategie, um diese Komplexität zu bewältigen.

### Stufe III: Umsetzung

Die mit Abstand am meisten übersehene Dimension beim Entwurf und der Lösung von Optimierungsmodellen ist der Prozess ihrer Umsetzung. Die akademische Literatur übersieht völlig, dass es nicht darauf ankommt, wie gut wir ein Problem im Computer lösen, sondern auf die Auswirkung von Entscheidungen, wenn sie umgesetzt werden.

Die Schlüsseldimensionen der Umsetzung decken drei Bereiche ab:

1. Die Beschaffung der Daten, die zur Ausfüllung der Zustandsvariable benötigt werden, was die Information bedeutet, die wir zur Entscheidungsfindung und zur Berechnung der Leistungskennzahlen benötigen (weitere Details werden in Band II bereitgestellt).
2. Die Umsetzung der Entscheidungen, was bedeuten könnte, Menschen dazu zu bringen, Anweisungen zu befolgen, oder die Anweisungen elektronisch zu übermitteln.
3. Die Bewertung der Leistung. Für komplexe Systeme kann es recht schwierig sein zu verstehen, wie gut das System funktioniert, was vermutlich durch die getroffenen Entscheidungen beeinflusst wird.

Für komplexe Probleme in der Industrie kann die Umsetzung ein außerordentlich anspruchsvoller Prozess sein. Selbst wenn dies als außerhalb des Anwendungsbereichs des Modellierungsprozesses betrachtet wird, ist es für Modellierer hilfreich, über diese Schritte nachzudenken. Es kann sein, dass bestimmte Entscheidungen schlicht niemals von einem Computer getroffen werden. Zum Beispiel beinhaltet die Zuteilung von Ressourcen im öffentlichen Gesundheitswesen Verhandlungen zwischen staatlichen, regionalen und lokalen Organisationen, die jeweils ihre eigenen verborgenen Prioritäten haben.

## Drei Arten von Information

Wir erkennen zunächst, dass jede Größe, die auf einem Computer dargestellt werden kann, eine Form von Information ist. Wir können drei Arten von Information aus der Perspektive identifizieren, wie sie sich über die Zeit entwickelt:

1. Die Information, die wir zum Zeitpunkt der Entscheidungsfindung kennen und die den Zustand unseres Systems bildet (genauer den Wissenszustand). Dies ist die Information, die benötigt wird, um Entscheidungen zu treffen und/oder die Leistungskennzahlen zu berechnen, jetzt oder möglicherweise in der Zukunft.
2. Neue Information, die wir kontrollieren. Wir definieren Entscheidungen formal in Kapitel 4 und beschreiben 10 verschiedene Arten von Entscheidungen, die bei der Identifikation von Entscheidungen helfen.
3. Neue Information, die von außerhalb unseres Systems eintrifft, außerhalb unserer Kontrolle, obwohl sie durch unseren aktuellen Zustand und/oder die von uns getroffenen Entscheidungen beeinflusst werden kann. Wir nennen dies exogene Information, und sie kann aus einer Reihe von Quellen stammen:
   - Naturphänomene wie Wetter und Erdbeben.
   - Märkte, wie die Nachfrage nach einem Produkt, Aktienkurse und Zinssätze.
   - Bevölkerungsdynamiken wie die Ausbreitung von Krankheiten.
   - Das Verhalten anderer Unternehmen oder Organisationen.
   - Entscheidungen, die von Menschen (allgemeiner: Agenten) außerhalb unseres Systems getroffen werden, wie zum Beispiel:
     - Die Produktionsentscheidungen von Zulieferern von Eingangsmaterialien für ein Fertigungswerk.
     - Andere Abteilungen innerhalb eines Unternehmens (wie Preisgestaltung und Marketing, wenn wir in der Fertigung oder Bestandsplanung tätig sind).
     - Das Verhalten eines Patienten (wenn Sie der Arzt sind).
     - Werbeanzeigen, die vom konkurrierenden Kandidaten bei einer Präsidentschaftswahl platziert werden.

   Exogene Information wird in Kapitel 5 ausführlicher beschrieben.

## Entscheidungsfindung als Prozess

Es gibt eine umfangreiche Literatur, die sich auf die Erstellung von „Optimierungsproblemen" konzentriert, die bestehen aus:

- Einer Entscheidung (oder einer Menge von Entscheidungen).
- Einer Zielfunktion, die minimiert oder maximiert werden soll.
- Nebenbedingungen, die die Menge der zulässigen Entscheidungen bestimmen.

Reale Entscheidungsfindung ist ein Prozess, und das Verständnis dieses Prozesses ist entscheidend für den Entwurf von Methoden zur Verbesserung von Entscheidungen. Wir beginnen mit der Identifikation der folgenden Elemente:

1. Sequentielle Entscheidungsprobleme, die den Prozess der Treffung einer bestimmten Menge von Entscheidungen über die Zeit durch einen einzelnen Agenten beschreiben.
2. Die „Informationskette", die den Prozess der Erzeugung der zur Entscheidungsfindung benötigten Information beschreibt.
3. Die Schritte, die bei der Umsetzung von Entscheidungen beteiligt sind.
4. Der Prozess der Bewertung der Leistung.

Außerhalb des Anwendungsbereichs dieser Monografie liegt die Herausforderung der Koordination zwischen mehreren Entscheidungsträgern.

### Sequentielle Entscheidungsprobleme

Wir sind nun bereit, in Worten ein sequentielles Entscheidungsproblem zu formulieren, das wir wie folgt ausdrücken können:

> *Zustand, Entscheidung, Information; Zustand, Entscheidung, Information; …, Zustand, Entscheidung, Information.*

Jedes Tripel {Zustand, Entscheidung, (exogene) Information} repräsentiert die Information, die mit einer bestimmten Zeitperiode verknüpft ist:

1. **„Zustand"** ist die Information, die wir zu Beginn der Zeitperiode kennen.
2. **„Entscheidung"** ist unsere endogen kontrollierbare Information.
3. **„(Exogene) Information"** ist die Information, die eintrifft, nachdem wir eine Entscheidung getroffen haben, und bevor wir die nächste Entscheidung treffen.

Nachdem wir eine Entscheidung getroffen haben (manchmal nachdem wir die exogene Information beobachtet haben), halten wir an und berechnen die Leistungskennzahlen.

Natürlich sind nicht alle Entscheidungsprobleme sequentielle Entscheidungsprobleme, obwohl die überwiegende Mehrheit der Entscheidungen wiederholt über die Zeit getroffen wird. Wir können jedoch mehrere Kategorien von sequentiellen Entscheidungsproblemen aus der Perspektive der Abfolge von Entscheidungen und Information identifizieren:

1. Entscheidung treffen, anhalten.
2. Entscheidung treffen, exogene Information beobachten, anhalten.
3. Entscheidung treffen, Information beobachten, eine weitere Entscheidung treffen, anhalten.
4. Entscheidung treffen, Information beobachten, Entscheidung treffen, Information beobachten, …, $T$-mal wiederholen, anhalten.
5. Entscheidung treffen, Information beobachten, unendlich wiederholt.

Einige Anmerkungen:

- **Kategorie 1** beschreibt statische, deterministische Entscheidungsprobleme, die die sogenannte Optimierungsgemeinschaft seit den 1950er Jahren dominiert haben. Die einfachste Version dieser Probleme könnte darin bestehen, die beste unter einer Menge von Auswahlmöglichkeiten zu finden, wie etwa den Kauf eines Artikels beim kostengünstigsten Lieferanten, solange wir annehmen, dass der Artikel genau so funktioniert, wie wir es erwarten.

  Komplexere Probleminstanzen könnten darin bestehen, die kostengünstigste Zuteilung von Lieferungen aus mehreren Quellen zur Bedienung verschiedener Bedarfe zu finden, oder verschiedene Personen oder Maschinen zur Durchführung verschiedener Aufgaben zuzuweisen, wodurch die Komplexität des Arbeitens in mehreren Dimensionen eingeführt wird. Die Komplexität dieser Probleme hat zu dem erstaunlichen Versäumnis geführt, dass die überwiegende Mehrheit der Anwendungen tatsächlich sequentielle Entscheidungsprobleme sind, eine Eigenschaft, die in der Literatur zu diesem Thema völlig ignoriert wurde.
- **Kategorie 2** beschreibt Probleme, die als stochastische Suche bekannt sind und eine der am weitesten untersuchten Problemklassen darstellen. Beispiele für stochastische Suchprobleme umfassen:
  - Die Auswahl einer Menge von Fertigungsanlagen und Lagerhäusern und die anschließende Durchführung einer Simulation zur Bewertung ihrer Leistung.
  - Die Auswahl eines Behandlungsschemas für einen Patienten und die anschließende Beobachtung, wie es sich entwickelt.
  - Die Festlegung einer Anlagestrategie für ein Aktienportfolio und die anschließende Beobachtung, wie gut sie funktioniert.

  All dies kann durch „eine Wahl treffen" und dann „beobachten, wie gut die Wahl funktioniert" beschrieben werden. Wenn dies in einem Simulator oder einem Labor durchgeführt wird, können wir diese Experimente möglicherweise immer wieder durchführen. In diesem Fall haben wir einen vollständig sequentiellen Suchprozess, der in Kategorie 4 fällt.
- **Kategorie 3** beschreibt eine allgemeinere Version von Kategorie 2, bei der wir möglicherweise eine erste Entscheidung treffen, etwa das Versenden von Produkten an eine Menge von Lagerhäusern. Anschließend werden die Bedarfe für das Produkt an Einzelhandelsstandorten aufgedeckt. Schließlich haben wir die Entscheidung, von den Lagerhäusern zu den Einzelhandelsstandorten zu versenden. Dieses Problem wurde unter dem Oberbegriff der stochastischen Programmierung ausführlich untersucht.
- **Kategorie 4** ist die häufigste Form des sequentiellen Entscheidungsproblems, da sie die wiederholte Natur des Treffens von Entscheidungen, gefolgt vom Erlernen neuer Information, erfasst, wobei wir jedoch nach einer bestimmten Anzahl von Zeitschritten anhalten, typischerweise aus dem praktischen Grund, dass wir eine Simulation durchführen, die einen vordefinierten Stopppunkt haben muss.
- **Kategorie 5** ist ein beliebtes Thema in Gemeinschaften wie der dynamischen Programmierung (insbesondere Markov-Entscheidungsprozesse) und der stochastischen Steuerung. Die Zielfunktion ist üblicherweise die unendliche diskontierte Summe von Kosten oder Belohnungen. Diese Literatur geht typischerweise davon aus, dass die in jeder Zeitperiode eintreffende Information aus derselben Verteilung stammt (dies ist als stationäre Verteilung bekannt) und ist nützlich zur Herleitung einer Vielzahl theoretischer Ergebnisse.

### Von der Optimierung von Entscheidungen zu Politiken

Wenn wir ein statisches, deterministisches Optimierungsproblem lösen, stellt praktisch jeder Autor die Entscheidung als eine Variable dar (typischerweise ein Vektor) „$x$", wobei wir einen Algorithmus entwerfen müssen, um das beste „$x$" zu finden. Im Gegensatz dazu besteht bei einem sequentiellen Entscheidungsproblem ein grundlegendes Unverständnis darüber, worüber wir eigentlich optimieren. Kurz gesagt: Bei deterministischen Problemen suchen wir die beste Entscheidung $x$, während wir bei sequentiellen Entscheidungsproblemen die beste Funktion (das heißt, die Politik) suchen, die eine Methode zur Entscheidungsfindung darstellt.

Die Idee, die beste Funktion zur Entscheidungsfindung zu finden, erscheint in der Optimierungsliteratur fremd. Im Gegensatz dazu ist dies genau das, was im maschinellen Lernen getan wird, wo die Herausforderung darin besteht, eine Funktion (oft als statistisches Modell bezeichnet) zu finden, die die Daten am besten anpasst. Im weiteren Verlauf werden wir die Funktionen zur Entscheidungsfindung als Politiken bezeichnen, ein Thema, das wir in Band II ausführlicher behandeln.

### Die Informationskette

Eine Entscheidung zu treffen weist gewisse Parallelen zur Herstellung physischer Produkte auf. Um ein Auto herzustellen (zum Beispiel), ist es notwendig, verschiedene Teile herzustellen, was oft mehrere Schritte erfordert. Dann müssen wir es, nachdem wir das Auto hergestellt haben, an den Kunden verteilen.

Entscheidungen werden aus Information „getroffen", die selbst durch eine Reihe von Schritten erzeugt (gesammelt oder geschätzt) werden muss. Die Entscheidung, wie viele und welche Arten von Autos hergestellt werden sollen, kann eine Prognose erfordern, die aus historischen Daten sowie wirtschaftlichen Vorhersagen und Schätzungen der Vertriebsmannschaft zusammengestellt wird. Diese Daten müssen dann eine Reihe von Methoden durchlaufen, die die Prognosen erstellen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/FlowofInformation.png" alt="An illustration of information flowing from initial source, through stages of processing and estimation, up to the point where it is used to make decisions.">
  <figcaption><span class="fig-num">Abbildung 1.3.</span> Eine Darstellung des Informationsflusses von der ursprünglichen Quelle über Stufen der Verarbeitung und Schätzung bis zu dem Punkt, an dem sie zur Entscheidungsfindung verwendet wird (eine weitere Form von Information).</figcaption>
</figure>

Der Informationsfluss ist in Abbildung 1.3 dargestellt. „Information" könnte beobachtete Bestände sein, eine aus der Historie erstellte Prognose, das Ergebnis einer Entscheidung, Information durch eine Marktumfrage zu sammeln, oder das Ergebnis eines Produktionsplanungsprozesses. Die Verarbeitungsknoten sind mathematische Funktionen – Gleichungssysteme, die auf die Eingaben wirken, um eine Ausgabe zu erzeugen. Die Funktionen können alles Mögliche tun, vom Aufsummieren von Zahlen über das Erstellen von Prognosen bis hin zum Treffen von Entscheidungen durch das Lösen eines Optimierungsproblems.

Genau wie bei physischen Prozessen bestehen Informationsprozesse typischerweise aus manuellen Schritten (wie der Eingabe von Beständen) kombiniert mit Schritten, die am Computer erledigt werden (und daher automatisiert sind), wie etwa das Durchführen einer Prognose.

Angesichts des umfangreichen Einsatzes von Computern liegt es nahe zu denken, dass Informationsprozesse fast vollständig automatisiert sein sollten. Es gibt jedoch immer noch viele Büroangestellte, und diese laden weder Lastwagen noch arbeiten sie am Fließband.

## Künstliche Intelligenz

Letztlich besteht das Ziel, ein komplexes Problem auf formale Weise zu durchdenken, darin, die Leistungsfähigkeit des Computers zu nutzen, um den Prozess zu verbessern. Die meisten Menschen werden sofort vorschlagen, „künstliche Intelligenz" (oft als „KI" bezeichnet) einzusetzen. Das Problem ist, dass „KI" ein Begriff ist, der seit den 1950er Jahren verwendet wird und sich im Laufe der Jahre stetig weiterentwickelt hat, wobei er typischerweise auf die neueste Erfindung aus dem Bereich der Informatik angewendet wurde.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/7levelsofAI.png" alt="Die 7 Ebenen der künstlichen Intelligenz." style="max-width: 485px;">
  <figcaption><span class="fig-num">Abbildung 1.4.</span> Die 7 Ebenen der künstlichen Intelligenz.</figcaption>
</figure>

Wir unterteilen die wichtigsten Formen der KI in sieben Ebenen, dargestellt in Abbildung 1.4. Nachdem wir diese sieben Ebenen beschrieben haben, ordnen wir sie in vier grundlegend verschiedene Klassen von Intelligenz ein.

### Die sieben Ebenen der KI

**Ebene 1: Regelbasierte Logik** - Diese entwickelte sich erstmals in den 1960er und 70er Jahren und trat in den 1980er Jahren (als Computer erstmals wesentlich weiter verfügbar wurden) als „Expertensysteme" hervor. Diese bestehen aus von Menschen festgelegten Regeln der Form „Wenn {Bedingung}, dann {Aktion}". Die Bedingung könnte zum Beispiel „rotes Fleisch essen" sein und die Aktion könnte „Rotwein trinken" sein. Oder die Bedingung könnte die Merkmale eines Patienten sein (Symptome, Geschlecht, Alter, Gewicht, Raucher?, Blutdruck, …) und die Aktion könnte eine medizinische Behandlung sein.

Diese Form der KI durchlief das, was als „Hype-Zyklus" bekannt geworden ist, bei dem Menschen sich vorstellten, wie Computer die Welt übernehmen würden.

Das Problem mit regelbasierten Systemen besteht darin, dass mit wachsender Anzahl der Elemente, die eine Bedingung bilden, die Anzahl der möglichen Bedingung/Aktion-Paare exponentiell zunahm (ein Verhalten, das als „Fluch der Dimensionalität" bekannt ist). In den 1990er Jahren wurde diese frühe Form der KI weithin als Fehlschlag angesehen, aber tatsächlich werden regelbasierte Systeme auch heute noch weit verbreitet eingesetzt. Der einzige Fehlschlag besteht darin, dass sie dem anfänglichen Hype nicht gerecht wurden. Regelbasierte Systeme werden heute weit verbreitet eingesetzt.

**Ebene 2 – Statistik/maschinelles Lernen** - Die Statistik (in der Informatik als maschinelles Lernen bekannt) wird seit Anfang des 20. Jahrhunderts entwickelt und ist die Wissenschaft, Daten zur Schätzung von Modellen zu nutzen. Wir könnten Beobachtungen unterschiedlicher Preise eines Hotelzimmers nutzen, um die Nachfrage zu schätzen, oder historische Nachfragen, um die Zukunft zu prognostizieren. Dieses Feld wuchs in den 1980er und 1990er Jahren explosionsartig (als Computer weit verbreitet verfügbar wurden).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ThreeCirclesofML.png" alt="Jede Art von Funktion für maschinelles Lernen fällt in drei überlappende Kreise." style="max-width: 310px;">
  <figcaption><span class="fig-num">Abbildung 1.5.</span> Jede Art von Funktion für maschinelles Lernen fällt in diese überlappenden Kreise, einschließlich 1) Nachschlagetabellen-Funktionen, 2) parametrischer Funktionen und 3) nichtparametrischer Funktionen (lokal parametrisch).</figcaption>
</figure>

Modelle des maschinellen Lernens gibt es in verschiedenen Stilrichtungen, die jedoch in drei breite Klassen eingeteilt werden können, wie in Abbildung 1.5 dargestellt:

- **Nachschlagetabellen** – Diese haben die Form „Wenn {Eingabe}, dann {Ausgabe}", ähnlich wie regelbasierte Systeme.
- **Parametrische Modelle** – Dies sind analytische Funktionen von Eingaben, die eine oder mehrere Ausgaben mittels einer mathematischen Funktion erzeugen, die von einer Reihe unbekannter Parameter abhängt. Wenn die Funktion linear in diesen Parametern ist, dann handelt es sich um ein lineares Modell. Allgemeinere Modelle verwenden Funktionen, die nichtlinear in den Parametern sind. Abbildung 1.6 veranschaulicht lineare und nichtlineare Modelle.

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/LinearandNonlinearFunctions.png" alt="Darstellungen linearer und nichtlinearer parametrischer Funktionen, die im maschinellen Lernen verwendet werden." style="max-width: 464px;">
    <figcaption><span class="fig-num">Abbildung 1.6.</span> Darstellungen linearer und nichtlinearer parametrischer Funktionen, die im maschinellen Lernen verwendet werden.</figcaption>
  </figure>

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/NeuralNetwork.jpg" alt="Darstellung eines kleinen neuronalen Netzes.">
    <figcaption><span class="fig-num">Abbildung 1.7.</span> Darstellung eines (sehr kleinen) neuronalen Netzes. Jede Verbindung trägt einen Parameter, der so eingestellt werden muss, dass die Ausgabe der Kennzeichnung, die den Eingaben in einem Trainingsdatensatz zugeordnet ist, so nahe wie möglich kommt.</figcaption>
  </figure>

  Eine wichtige Klasse parametrischer Modelle, die erstmals in den 1970er Jahren aufkam, sind neuronale Netze (siehe Abbildung 1.7). Neuronale Netze verfügen über eine Eingabeschicht, durch die jede Menge von Eingaben über die Eingabeknoten in das Netz gelangt. Diese Werte werden dann durch die Zwischenschichten transformiert, bevor sie eine oder mehrere Ausgaben erzeugen. Jede Verbindung im Netz ist mit einem Parameter verknüpft, wobei frühe neuronale Netze oft Tausende bis zu einer Million Parameter hatten.

  Es ist am besten, sich neuronale Netze als eine sehr hochdimensionale nichtlineare Funktion vorzustellen, die verwendet werden kann, um eine praktisch unbegrenzte Menge von Beziehungen anzupassen, allerdings um den Preis, dass große Trainingsdatensätze erforderlich sind. Zudem beschränkt ihre Flexibilität ihre Einsetzbarkeit bei Vorhandensein von Rauschen.
- **Nichtparametrische Modelle** – Diese lassen sich am einfachsten als Modelle vorstellen, die lokale Näherungen einer Funktion darstellen. Wir könnten zum Beispiel Schätzungen einer Funktion an einer Reihe von Punkten haben und dann lineare Extrapolationen dieser Punkte verwenden, um Schätzungen für Punkte bereitzustellen, für die wir keine Schätzung haben.

**Ebene 3 – Mustererkennung** - Die nächste Ebene der KI entstand 2010 aus der Forschungsgemeinschaft, die sich mit dem Problem der Mustererkennung befasste. Mustererkennung ist nur eine weitere Form des maschinellen Lernens, das wir in Ebene 2 gesehen haben, bei der neuronale Netze zum Einsatz kommen. Diese neuronalen Netze sind jedoch weitaus größer als jene, die in den 1990er Jahren verwendet wurden. Statt vieler Tausend bis zu einer Million Parameter könnten diese neuronalen Netze 10 bis 100 Millionen Parameter haben. Diese wurden als „tiefe neuronale Netze" bezeichnet.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SunflowerTakemeHome.jpg" alt="Darstellung der Fähigkeit eines neuronalen Netzes, das Bild einer Sonnenblume oder das Sprachmuster von Take me home zu erkennen.">
  <figcaption><span class="fig-num">Abbildung 1.8.</span> Darstellung der Fähigkeit eines neuronalen Netzes, das Bild einer Sonnenblume oder das Sprachmuster von „Take me home" zu erkennen.</figcaption>
</figure>

Die Eingaben wären die Pixel in einem Bild (oder die Signale eines Sprachmusters), was eine viel höherdimensionale Eingabe darstellt. Der schwierige Teil bestand darin, einen Trainingsdatensatz zu erstellen, der groß genug für die Durchführung der Parameteranpassung war. Der Trainingsdatensatz musste aus Millionen von Bildern bestehen (die leicht im Internet zu finden waren) mit den zugehörigen „Kennzeichnungen", die das Bild identifizierten, wie etwa „Sonnenblume" oder „Take me home" in Abbildung 1.8. Der schwierige Teil bestand darin, die Kennzeichnungen zu erhalten, die von Menschen erstellt werden mussten.

Der Durchbruch beim Training kam, als eine Informatikprofessorin an der Princeton University, Fei-Fei Li, erkannte, dass eine von Amazon geschaffene Softwareumgebung namens „Mechanical Turk" es ermöglichte, Menschen auf der ganzen Welt zu erreichen, die bereit waren, für sehr geringe Löhne zu arbeiten, um diese Kennzeichnungen zu erstellen. Mit anderen Worten: Der Durchbruch lag nicht so sehr in der zugrundeliegenden Analytik (neuronale Netze wurden bereits in den 1970er Jahren entwickelt), sondern vielmehr im Zugang zu ausreichend Daten zu geringen Kosten.

**Ebene 4 – Große Sprachmodelle** - Ebene 4 ist einfach eine weitere Stufe über der Bilderkennung, bei der das neuronale Netz statt der Identität eines Bildes zu schätzen (oder zu „prognostizieren"), eine Wortfolge (von wenigen Wörtern bis zu Hunderten oder Tausenden von Wörtern) als Eingabe nimmt, um das nächste Wort vorherzusagen (die Modelle arbeiten auf Wortfragmenten, die als „Tokens" bekannt sind). Dies geschieht durch das Erstellen einer Wahrscheinlichkeitsverteilung der Wörter, die als Nächstes folgen könnten, gegeben eine Wortfolge, bei der es sich um einen anfänglichen Prompt handeln könnte, der von einem Benutzer bereitgestellt wird.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTPrompt.png" alt="Große Sprachmodelle wie ChatGPT verwenden einen Trainingsdatensatz, um eine Verteilung von Wörtern zu konstruieren, die auf eine Wortfolge folgen könnten.">
  <figcaption><span class="fig-num">Abbildung 1.9.</span> Große Sprachmodelle wie ChatGPT verwenden einen Trainingsdatensatz, um eine Verteilung von Wörtern zu konstruieren, die auf eine Wortfolge folgen könnten, ausgehend von einem Prompt, aber aufbauend auf der vom LLM erzeugten Folge.</figcaption>
</figure>

Abbildung 1.9 veranschaulicht dies, beginnend mit dem Prompt „Der beste Weg, die Robustheit einer Lieferkette zu verbessern, besteht darin, …" Das neuronale Netz erzeugt dann basierend auf dem Trainingsdatensatz eine Wahrscheinlichkeitsverteilung des Wortes, das als Nächstes folgen könnte. Das große Sprachmodell (oder LLM) zieht dann eine Stichprobe aus dieser Verteilung, proportional zur Verteilung. Wenn es das Wort „gestalten" wählt, dann wird die Folge „Der beste Weg, die Robustheit einer Lieferkette zu verbessern, besteht darin, zu gestalten…" in das neuronale Netz eingegeben, das dann eine weitere Verteilung von Wörtern erzeugt. Der Prozess des Ziehens eines Wortes und dessen Hinzufügen zur vorherigen Wortfolge, um eine neue Folge zu erzeugen, wird immer wieder wiederholt. Aus diesem Grund wird der Prozess als „generative KI" bezeichnet.

Die neuronalen Netze, die zur Erzeugung der Verteilung der „nächsten Wörter" verwendet werden, die auf eine vorherige Folge folgen, sind wahrhaft riesig. Während ein tiefes neuronales Netz zur Mustererkennung (Ebene 3) 10 bis 100 Millionen Parameter haben könnte, könnten die für LLMs verwendeten neuronalen Netze zwischen 10 Milliarden und 1 Billion Parameter umfassen.

Aus dieser Beschreibung sollte klar hervorgehen, dass LLMs nicht von Natur aus intelligent sind; sie ahmen lediglich Wortmuster aus einem Trainingsdatensatz nach. Sie klingen intelligent, weil sie Wortmuster nachahmen, die aus einer intelligenten Quelle stammen (vorausgesetzt, ein Mensch hat die Wörter geschrieben).

**Ebene 5 – Deterministische Optimierung** – Diese umfasst eine umfangreiche Bibliothek von Werkzeugen zur Lösung schwieriger Entscheidungsprobleme. Diese Probleme sind als lineare Programme, ganzzahlige Programme und nichtlineare Programme bekannt, und sie alle weisen die Eigenschaft auf, dass eine „Entscheidung" ein Vektor ist, was bedeutet, dass es sich um eine Menge unterschiedlicher Entscheidungen (eine sehr große Menge) handelt. Einige Beispiele sind:

- Wir möchten vielleicht entscheiden, wie viel Produkt von einer Reihe von 10 Verteilzentren zu 200 Lagerhäusern gesendet werden soll, wodurch ein 2.000-dimensionaler Vektor entsteht, der bestimmt werden muss.
- Fluggesellschaften müssen ihre Flugzeuge und die Besatzungen (sowohl Piloten als auch Kabinenpersonal) über längere Zeiträume (typischerweise vierteljährlich) einplanen, um die Auslastung zu maximieren, während Regeln für die Wartung von Flugzeugen sowie Regeln für den Personaleinsatz eingehalten werden.
- Ein Finanzmanager muss möglicherweise ständig die Kapitalallokation zwischen 10.000 verschiedenen Investitionen jonglieren, was uns 10.000 Kauf- oder Verkaufsentscheidungen liefert, die täglich getroffen werden.

Oft lassen sich diese Probleme bildlich darstellen, wie links in Abbildung 1.10 gezeigt, doch gibt es eine Standardweise, sie mathematisch zu schreiben, häufig beginnend mit der Notation auf der rechten Seite. Auch wenn diese mathematische Notation im Allgemeinen nicht vertraut sein wird, bringen Universitäten jedes Jahr Tausende von Studierenden hervor, die darin ausgebildet werden, Probleme in diesem Format zu modellieren. Darüber hinaus gibt es viele Computerprogramme, manche kommerziell erhältlich, andere kostenlos, die selbst großskalige Probleme effizient lösen können.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmenttoLinearProgram.jpg" alt="Graphical illustration of an assignment problem and its mathematical representation as a linear program.">
  <figcaption><span class="fig-num">Abbildung 1.10.</span> Grafische Darstellung eines Typs von Entscheidungsproblem (Zuordnung von Ressourcen zu Aufgaben) und seine mathematische Darstellung als lineares Programm.</figcaption>
</figure>

**Stufe 6 – Sequentielle Entscheidungsprobleme** – Die überwiegende Mehrheit der Entscheidungen wird wiederholt über die Zeit getroffen, sei es alle paar Sekunden, Minuten oder Stunden, täglich, wöchentlich, vierteljährlich oder jährlich. Selbst unsere deterministischen Optimierungsprobleme in Stufe 5 oben werden üblicherweise wiederholt über die Zeit gelöst, aber die meisten Entscheidungen sind wesentlich einfacher. Einige Beispiele für sequentielle Entscheidungsprobleme sind:

- Die Entscheidung, wann ein Vermögenswert verkauft werden soll, und der erwartete Wert des Haltens des Vermögenswerts angesichts sich dynamisch ändernder Preise.
- Die Auffüllung von Beständen, möglicherweise mit sehr langen Vorlaufzeiten, um unsichere Nachfragen in einem dynamischen Markt zu befriedigen.
- Die Bestimmung der Parameter für eine automatisierte Finanzhandelspolitik.
- Die Wahl der richtigen Materialkonzentrationen, der richtigen Temperatur zum Mischen und der Zeit, die Mischung jeder Temperatur auszusetzen, um ein Material mit der höchsten Festigkeit herzustellen.
- Die Wahl des besten Medikaments zur Behandlung eines Patienten mit spezifischen Merkmalen.
- Die Entscheidung, wie viel Energie aus einer Kombination von Windparks, Solarparks und dem Stromnetz gespeichert werden soll, um zukünftige Lasten (Nachfragen) zu geringsten Kosten zu decken.
- Der Lkw-Ladungsverkehr erfordert die Bestimmung, welche Fahrer welche Frachtladungen bewegen sollen.
- Die Wahl, wie viel in jede von Tausenden von Aktien und anderen Anlagen investiert werden soll.

Sequentielle Entscheidungsprobleme treten in menschlichen Prozessen überall auf. Eine Entscheidung kann binär sein (halten oder verkaufen), diskret (welches Medikament) oder aus diskreten und kontinuierlichen Vektoren bestehen. Die Wahl unter den besten Optionen einer diskreten (oder diskretisierten) Menge von Möglichkeiten ist mit Abstand das häufigste sequentielle Entscheidungsproblem, aber viele betreffen komplexe operative Probleme, die in der Geschäftslogistik, in Energiesystemen und bei Verteilungsproblemen im Gesundheitswesen auftreten.

**Stufe 7 – Kreativität, Schlussfolgern und Urteilsvermögen** – Stufe 7 stellt die höchste Stufe der Intelligenz dar. Während viele der Probleme in den Stufen 5 und 6 durchaus komplex sein können, beinhalten sie beispielsweise stets gut strukturierte Probleme mit klar definierten Entscheidungen und Zielen. In Stufe 7 können wir komplexe Probleme formulieren, wie etwa die Reduzierung von CO2-Emissionen, die Minimierung von Krankheiten und die Schaffung neuer Produkte.

Es ist unsere feste Überzeugung, dass, während viele Autoren über die Zukunft der „KI" im Sinne der Ersetzung von Menschen sprechen werden, die Realität so ist, dass Computer nicht in der Lage sein werden, über gut definierte Probleme hinauszugehen. Eine Tätigkeit, von der wir glauben, dass sie jenseits der Fähigkeiten der Computerintelligenz liegt (einschließlich der viel gepriesenen Fertigkeiten großer Sprachmodelle), ist das Formulieren komplexer Entscheidungsprobleme. Aus diesem Grund bezeichnen wir Stufe 7 als Science-Fiction – etwas, worüber es Spaß macht zu sprechen, das aber niemals tatsächlich eintreten wird.

### Drei Klassen von Computerintelligenz

Die ersten sechs Stufen der künstlichen Intelligenz stellen unterschiedliche Formen der Intelligenz dar, die auf einem Computer implementiert werden können, während die siebte unserer Meinung nach die alleinige Domäne der Menschen bleibt. Die ersten sechs Stufen lassen sich in drei unterschiedliche Klassen einteilen:

**Klasse 1 – Menschlich spezifizierte Verhaltensweisen** – Diese Klasse umfasst Stufe 1 der sieben Stufen der KI und kann für zwei unterschiedliche Zwecke verwendet werden:

- Mustererkennung – Eine Regel kann festlegen, dass, wenn ein Patient über eine bestimmte Menge von Bedingungen verfügt, dies bedeutet, dass er eine bestimmte Krankheit hat.
- Entscheidungen – Ebenso sollte ein Patient mit einer bestimmten Menge von Bedingungen ein bestimmtes Medikament einnehmen (was eine Form der Entscheidung darstellt).

Regelbasierte Logik unterscheidet nicht, ob die Regel eine Aussage über den Zustand der Welt trifft oder eine Handlung, die vorgenommen werden sollte. Die Bedingungen, die hinter der Regel stehen, und ihr Ergebnis (ob es sich um eine Zustandsaussage oder eine Entscheidung handelt) müssen manuell festgelegt werden.

Ein wichtiges Merkmal der künstlichen Intelligenz der Klasse 1 ist das, was sie nicht verwendet:

- Sie verwendet keinen Trainingsdatensatz.
- Sie erfordert kein Modell des zugrunde liegenden Entscheidungsproblems.

Regeln müssen direkt von Menschen festgelegt werden, obwohl es möglich ist, dass Regeln in einem Datensatz spezifiziert werden. Zum Beispiel könnten wir einen Datensatz haben, der medizinische Protokolle auflistet, wobei für jeden Patientenzustand eine Behandlung festgelegt wird. Man stelle sich jedoch vor, wir hätten einen Datensatz zusammengestellt aus tatsächlichen Arztentscheidungen, die im Widerspruch zueinander stehen können: Verschiedene Ärzte könnten widersprüchliche Behandlungen anordnen, obwohl die Patienten identische Bedingungen aufweisen. Wenn wir diesen Datensatz verwenden, um Behandlungen zu erlernen, wäre dies ein Beispiel für maschinelles Lernen.

**Klasse 2 – Maschinelles Lernen** – Diese Klasse umfasst die Stufen 2, 3 und 4. Maschinelles Lernen bezieht sich auf die Verwendung mathematischer Funktionen, die aus Eingaben und einer Menge abstimmbarer Parameter bestehen, die so angepasst werden können, dass die Funktion am besten zu einer Menge von Antworten passt, die auch als Labels (unter vielen anderen Namen) bezeichnet werden. Maschinelles Lernen erfordert eine benutzerdefinierte Funktion zusammen mit einem Trainingsdatensatz, der aus Eingaben und Antworten (Labels) besteht.

Während regelbasierte Logik hinsichtlich der Komplexität der Eingaben begrenzt ist, kann maschinelles Lernen sehr komplexe Eingaben mithilfe von Modellen mit großen Mengen an Parametern verarbeiten. Lineare Modelle können Dutzende bis Hunderttausende von Variablen aufweisen. Neuronale Netze wurden für großskalige Sprachanwendungen mit über einer Billion Variablen trainiert. Natürlich erfordern größere Modelle große Datensätze, was sich als das Haupthindernis erwiesen hat, das die Nutzung neuronaler Netze für die hochkomplexe Aufgabe der Sprachverarbeitung begrenzt.

**Klasse 3 – Optimierung** – Diese Klasse umfasst die Stufen 5 und 6, die sich mit dem Problem befassen, die beste Entscheidung aus einer Menge von Möglichkeiten auszuwählen, wobei es sich um eine diskrete Menge oder einen hochdimensionalen Vektorraum handeln kann. Stufe 5 beschränkt sich auf statische (deterministische) Probleme, bei denen alle Daten bekannt sind und wir die beste Entscheidung suchen (die oft ein Vektor ist). Stufe 6 befasst sich mit dem komplexen Problem, die besten Entscheidungen über die Zeit zu treffen, was ein absolut riesiges Spektrum an Problemen umfasst.

Die Klasse der Optimierung verwendet keinen Trainingsdatensatz. Stattdessen ist es notwendig, eine Leistungskennzahl (oft als Zielfunktion bezeichnet) zusammen mit einer Menge von Gleichungen anzugeben, die beschreiben, welche Entscheidungen zulässig sind. Für sequentielle Entscheidungsprobleme benötigen wir zudem Gleichungen, die uns mitteilen, wie sich Information im Laufe der Zeit entwickelt.

### Zusammenfassung

Die Methoden der Klasse 2, des maschinellen Lernens, zielen darauf ab, mathematische Funktionen darauf zu trainieren, sich wie ein Trainingsdatensatz zu verhalten. Wenn der Trainingsdatensatz aus Bildern wie Brust-Röntgenaufnahmen zusammen mit von Menschen erzeugten „Labels" darüber besteht, ob die Brust Anzeichen von Krebs aufweist, wird das trainierte Modell niemals besser abschneiden können als die Fähigkeiten der Radiologen, die die Labels bereitgestellt haben. Aus diesem Grund lässt sich sagen, dass Methoden der Klasse 2 (maschinelles Lernen) Computern beibringen, sich wie Menschen zu verhalten (genauer gesagt, sich wie der Trainingsdatensatz zu verhalten).

Im Gegensatz dazu sind die Methoden der Klasse 3 (Optimierung) darauf ausgelegt, Entscheidungen hervorzubringen, die Menschen übertreffen. Der Preis für diese höherwertige Leistung besteht darin, dass wir das bereitstellen müssen, was als Modell des Problems bekannt ist. Insbesondere erfordern diese Methoden ein mathematisches Modell, bestehend aus:

- Einer klar definierten Menge von Entscheidungen.
- Einer klaren Leistungskennzahl, die es ermöglicht zu beurteilen, ob eine Entscheidung besser ist als eine andere.
- Der Physik des Problems, die beschreibt:
  - Welche Entscheidungen zu einem bestimmten Zeitpunkt getroffen werden können.
  - Wie sich das System im Laufe der Zeit entwickelt.
  - Wie neue Informationen in das System eintreffen.

Dieses Buch behandelt Klasse 3, da diese die Methoden abdeckt, die sich mit dem Treffen von Entscheidungen befassen. Insbesondere werden wir uns auf sequentielle Entscheidungsprobleme konzentrieren, da diese am weitesten verbreitet sind – praktisch jeder trifft Entscheidungen, und wir treffen sie über die Zeit hinweg, was sie zu sequentiellen Entscheidungen macht. Statische (deterministische) Probleme sind lediglich ein Spezialfall sequentieller Entscheidungsprobleme, und die Lösung sequentieller Entscheidungsprobleme wird stark auf die für statische, deterministische Probleme entwickelten Werkzeuge zurückgreifen.

Sequentielle Entscheidungsprobleme stellen eine unglaublich reichhaltige Problemklasse dar. Diese Werkzeuge hängen unweigerlich von den Methoden der ersten fünf Stufen der künstlichen Intelligenz ab. Wie bei den Werkzeugen der Stufe 5 (deterministische Optimierung) benötigen wir ein Modell des zugrunde liegenden Problems. Da sequentielle Entscheidungsprobleme jedoch wesentlich reichhaltiger sind als die statischen Probleme in Stufe 5, müssen die Modelle wesentlich reichhaltiger und komplexer sein, aber dies ist ein Bereich, in dem die klassische mathematische Modellierung unzureichend war.

## Traditionelle Modellierungsrahmen

Es ist hilfreich, die Modellierungsrahmen für das Treffen von Entscheidungen in zwei breite Kategorien zu unterteilen:

- Statische, deterministische Modelle, die davon ausgehen, dass alle Informationen bekannt sind, wobei wir bestrebt sind, die Entscheidungen zu wählen, die am besten funktionieren.
- Sequentielle Entscheidungsmodelle, die den Fluss von Entscheidungen und Informationen erfassen. Da wir explizit Informationen modellieren, die eintreffen, nachdem wir eine Entscheidung getroffen haben, bedeutet dies, dass die Entscheidungen getroffen werden müssen, bevor Informationen (die vermutlich für die Leistung der Entscheidung relevant sind) eingetroffen sind.

In diesem Band erfassen alle sequentiellen Entscheidungsprobleme explizit den Fluss von Informationen, was bedeutet, dass wir zu jedem Zeitpunkt Entscheidungen treffen, bevor wir die Informationen kennen, die in der Zukunft eintreffen könnten. Aus diesem Grund sind sequentielle Entscheidungsprobleme grundsätzlich *stochastisch* (der Fachbegriff dafür, dass zukünftige Informationen zufällig sind).

### Statische, deterministische Modelle

Die Literatur zur Modellierung statischer, deterministischer Probleme ist recht ausgereift, mit einer beträchtlichen Basis an Software, die um Variationen eines Optimierungsmodells herum aufgebaut ist, das wie folgt geschrieben werden kann:

$$
\begin{align}
\min_{x,y} \quad & C(x,y) \tag{1}\\
\text{subject to:}\\
& g(x,y) = 0, \tag{2}\\
& x \geq 0, \tag{3}\\
& y \in \{0,1\}. \tag{4}
\end{align}
$$

Wir haben sowohl das Vorhandensein kontinuierlicher Variablen $x$ (die einen Wert wie 0,56 annehmen könnten) als auch diskreter Variablen $y$, die 0 oder 1 sein müssen, zugelassen.

Was bei der Modellierung deterministischer Optimierungsprobleme (Stufe 5) geschieht, ist, dass wir das mathematische Modell nehmen, das durch die Gleichungen (1)–(4) gegeben ist, und uns dann dem physischen Problem zuwenden und die Elemente des Modells ausfüllen, was die Identifizierung der Entscheidungsvariablen, der Zielfunktion und der Nebenbedingungen erfordert. Man stelle sich vor, einen Hammer zu haben und nach Nägeln zu suchen. Das Werkzeug ist nützlich, aber der Prozess erfordert, dass das Problem in den Modellierungsrahmen eingepasst wird.

Die deterministische Optimierung hat seit langem den Schwerpunkt auf die Herausforderung gelegt, Werkzeuge zu entwerfen, um die optimalen Entscheidungen bei gegebenem Modell zu finden, wobei der Erstellung des Modells selbst sekundäre Aufmerksamkeit geschenkt wurde. Zu beachten ist, dass der Modellierungsrahmen keinerlei Mechanismus bereitstellt, um die Entwicklung von Entscheidungen und Informationen zu erfassen, oder irgendetwas, das damit zusammenhängt, wie Entscheidungen organisiert sind.

### Sequentielle Entscheidungsmodelle

Traditionell hat die Literatur zu sequentiellen Entscheidungsproblemen versucht, dem gleichen Ansatz zu folgen, ist damit aber vollständig gescheitert. Im Gegensatz zu dem klar definierten Modellierungsrahmen für deterministische Optimierung, der durch die Gleichungen (1)–(4) repräsentiert wird, hat die Optimierungsliteratur keinen einheitlichen Modellierungsrahmen für sequentielle Entscheidungsprobleme übernommen. Zum Zeitpunkt dieser Niederschrift gibt es mehr als ein Dutzend unterschiedliche Communities, die acht verschiedene Notationssysteme verwenden, mit grundlegend unterschiedlichen Stilen, um auszudrücken, welches Problem gelöst wird oder wofür wir eine Lösung suchen. Zum Beispiel schreiben manche Communities eine Zielfunktion aus, wie es in der deterministischen Optimierung üblich ist, andere formulieren eine Politik, und wieder andere geben eine Optimalitätsbedingung an.

Unser Ansatz stützt sich auf den universellen Modellierungsrahmen, der im [Abschnitt oben](#universalmodelingframework) skizziert wurde und der verwendet werden kann, um *jedes* sequentielle Entscheidungsproblem zu modellieren. Dieser Modellierungsrahmen wird ausführlich in *Reinforcement Learning and Stochastic Optimization* [Kapitel 9] beschrieben. Dieses Buch legt das Modell dar, bevor es Politiken zur Entscheidungsfindung beschreibt, was in Kapitel 11 geschieht (Kapitel 10 konzentriert sich auf die Modellierung von Unsicherheit).

Band II dieser Reihe wird die Dimensionen des universellen Modellierungsrahmens ebenfalls in weitaus größerer Ausführlichkeit behandeln, als wir es in diesem Band können, wobei ein moderates Notationsniveau verwendet wird. Der universelle Modellierungsrahmen kann jedoch nicht angewendet werden, ohne die drei Fragen zu beantworten, die in diesem Band behandelt werden.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoicewithUncertainty.jpg" alt="A decision problem with discrete choices, and uncertainty about the value of each choice.">
  <figcaption><span class="fig-num">Abbildung 1.11.</span> Ein Entscheidungsproblem mit diskreten Wahlmöglichkeiten und Unsicherheit über den Wert jeder Wahlmöglichkeit.</figcaption>
</figure>

### Das häufigste Entscheidungsproblem

Entscheidungsprobleme, und insbesondere sequentielle Entscheidungsprobleme, bilden eine außergewöhnlich reichhaltige Problemklasse. In der Literatur zur Optimierung wird jedoch oft übersehen, dass die überwiegende Mehrheit der Entscheidungsprobleme durch Abbildung 1.11 beschrieben wird, wobei wir möglicherweise zwei Wahlmöglichkeiten haben (eine Handlung ausführen oder nicht), oder eine kleine Menge an Wahlmöglichkeiten (welches Medikament verwendet werden soll, wo ein Teil beschafft werden soll), oder eine große Anzahl an Wahlmöglichkeiten (welches Produkt beworben werden soll, welches Molekül bei der Entwicklung eines neuen Medikaments verwendet werden soll).

Ein Unterscheidungsmerkmal dieser Problemklasse ist, dass wir zwar eine Schätzung über die Leistung jeder Wahlmöglichkeit haben können, aber typischerweise unsicher sind über die Leistung, die sich nach unserer Wahl zeigen wird. Wir haben möglicherweise nur eine einzige Chance, die beste Wahl zu treffen, aber oft treffen wir diese Entscheidung wiederholt und können aus vergangenen Erfahrungen lernen. Es gibt viele Varianten dieses Problems:

- Ob wir Offline-Experimente in einem Labor oder Simulator durchführen, oder ob wir während des Handelns lernen müssen.
- Die Anzahl der Wiederholungen der Wahl.
- Was wir aus einer Wahl lernen, kann unsere Überzeugungen über andere Wahlmöglichkeiten beeinflussen, was ein zugrunde liegendes Belief-Modell widerspiegelt.
- Die Struktur des Belief-Modells, das etwaige zugrunde liegende strukturelle Beziehungen erfasst.
- Das Vorhandensein physischer Ressourcen, die verbraucht oder verwaltet werden, wie etwa das Einrichten einer Maschine zur Durchführung eines Experiments, der Verbrauch von Vorräten oder der Bedarf an qualifiziertem Personal.
- Die Zeit und die Kosten, die für die Wahl und deren Umsetzung erforderlich sind.

Der häufigste Ansatz, den Menschen bei der Wahl aus einer diskreten Menge von Möglichkeiten verwenden, besteht darin, einfach diejenige auszuwählen, die am besten erscheint. Dies ignoriert die Möglichkeit, aus der Wahl zu lernen, um in Zukunft eine bessere Entscheidung zu treffen. Der Wert des jetzigen Lernens für zukünftige Entscheidungen hängt stark davon ab, wie oft wir mit derselben Menge an Wahlmöglichkeiten konfrontiert werden. Es kann auch bedeuten, dass Risiken ignoriert werden, die mit einer Wahl verbunden sein könnten, die sich als sehr schlecht erweisen könnte.

Es gibt viele Situationen, in denen die Entscheidungen ziemlich wichtig sind und wir eine Weile mit der Entscheidung leben müssen. Beispiele könnten die Entscheidung sein, ein bestimmtes Medikament zu entwickeln, oder die Wahl eines Lieferanten, mit dem wir mindestens ein Jahr lang zusammenarbeiten müssen. Bei diesen Problemen ist es besonders wichtig, einige Zeit darauf zu verwenden, die bestmögliche Menge an Überzeugungen über die mögliche Leistung jeder Wahlmöglichkeit zu entwickeln.

Belief-Modelle werden typischerweise durch Korrelationen verkompliziert. Die Entscheidung, welches Medikament entwickelt werden soll, kann den Vergleich verschiedener Arten von Krebsmedikamenten erfordern, die einen ähnlichen Markt bedienen. Wir müssen möglicherweise unter einer Reihe von Lieferanten wählen, die nach Land geclustert sind und dieselben Risiken erhöhter Zölle, Krankheitsausbrüche und Währungsänderungen teilen.

### Statische versus sequentielle Entscheidungsprobleme

In der akademischen Literatur besteht ein starkes Gefühl der Konkurrenz zwischen der Community, die deterministische Optimierung betreibt, und den fragmentierten Communities, die Optimierung unter Unsicherheit betreiben. Die meisten deterministischen Optimierungsmodelle sind deterministische Näherungen stochastischer Probleme, und ein Nebeneffekt ist, dass Personen, die deterministische Optimierung verwenden, recht abwehrend reagieren können, wenn sie mit der Art und Weise konfrontiert werden, wie Unsicherheit ihr Problem beeinflusst.

Wir bitten die Leser, Folgendes zu beachten:

- Ein statisches, deterministisches Optimierungsmodell ist nur ein Spezialfall eines sequentiellen Entscheidungsproblems.
- Wir werden (in Band II) zeigen, dass Werkzeuge der deterministischen Optimierung weithin bei der Lösung allgemeiner sequentieller Entscheidungsprobleme eingesetzt werden.
- Das mit Abstand häufigste Entscheidungsproblem, das in praktischen Anwendungen auftritt, ist das in Abbildung 1.11 dargestellte, bei dem wir das Beste aus einer Menge von Wahlmöglichkeiten auswählen müssen. Selbst wenn wir die Unsicherheit in unseren Überzeugungen über die Wahlmöglichkeiten erfassen, reduzieren sich die verschiedenen Methoden zur Lösung dieses Problems immer noch darauf, Sequenzen deterministischer Optimierungsprobleme zu lösen.
- Das Problem besteht nicht darin, dass eine deterministische Näherung verwendet wird; der Fehler liegt darin, wie die Entscheidungen bewertet werden. Die Leistung der Entscheidungen muss im Laufe der Zeit bewertet werden, wenn neue Informationen eintreffen.

Der häufigste Fehler bei der Verwendung deterministischer Optimierungsmodelle besteht darin, zu übersehen, dass das Problem im Laufe der Zeit wiederholt gelöst werden muss. Ein Beispiel hierfür findet sich in einer Problemklasse namens „Zuweisungsproblem" (assignment problem), bei der wir „Ressourcen" (Personen, Lastwagen, Maschinen) „Aufgaben" (Arbeitszuweisungen, zu transportierende Ladungen, zu erledigende Jobs) zuordnen. Diese werden niemals nur einmal gelöst; während die Zeit voranschreitet, machen die Ressourcen Fortschritte bei der Erledigung der Aufgaben, neue Aufgaben werden gemeldet, und die Maschinen können Ausfälle erleiden, die verändern, wie lange sie zur Fertigstellung einer Aufgabe benötigen.

Abbildung 1.12(a) stellt das Problem als statisches, deterministisches Problem dar. Als dieses Problem erstmals in den 1950er Jahren von George Dantzig gelöst wurde, galt es als großer Durchbruch (was es auch war). Doch selbst 70 Jahre später übersehen Spitzenfachleute, dass das Problem niemals nur einmal gelöst wird; es muss im Laufe der Zeit wiederholt gelöst werden, und es ist praktisch immer der Fall, dass die Lösung zu einem Zeitpunkt die Probleme beeinflusst, die in der (ungewissen) Zukunft gelöst werden müssen.

<figure class="book-figure">
  <div class="book-figure-row">
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/StaticAssignment.jpg" alt="Static assignment problem.">
      <figcaption>(a)</figcaption>
    </figure>
    <figure class="book-figure">
      <img src="/assets/images/bridging-vol1/DynamicAssignment.jpg" alt="Dynamic assignment problem.">
      <figcaption>(b)</figcaption>
    </figure>
  </div>
  <figcaption><span class="fig-num">Abbildung 1.12.</span> (a) Statisches Zuweisungsproblem; (b) dynamisches Zuweisungsproblem.</figcaption>
</figure>

Das eigentliche Problem wird in Abbildung 1.12(b) dargestellt, wo wir veranschaulichen, wie das Problem sequentiell im Laufe der Zeit gelöst wird. Wir weisen darauf hin, dass es unmöglich ist, allein durch Betrachtung der Mathematik des Modells festzustellen, ob ein deterministisches Optimierungsproblem sequentiell gelöst werden muss; dies erfordert ein Verständnis des Problems in natürlicher Sprache.

## Phasen der Modellierung

Wir beginnen damit, drei verschiedene Betrachtungsweisen eines Problems zu erkennen:

- **Die reale Welt** – Hier werden Entscheidungen umgesetzt, und hier sammeln wir Informationen, die die tatsächliche Leistung unseres Systems beschreiben.
- **Das Basismodell** – Dies liegt typischerweise in Form eines Simulators vor, der so konzipiert ist, dass er die reale Welt möglichst genau nachbildet. Simulatoren (manchmal auch „digitale Zwillinge" genannt) sind leistungsfähig, können aber sehr teuer in der Entwicklung sein, weshalb wir oft Methoden zur Entscheidungsfindung entwickeln müssen, ohne dass ein Simulator zur Verfügung steht, um die Leistung unserer Politik zu testen.
- **Ein Lookahead-Modell** – Lookahead-Modelle werden nur zur Entscheidungsfindung verwendet, wenn wir die Auswirkung einer jetzt getroffenen Entscheidung auf die Zukunft annähern müssen. Lookahead-Modelle werden in irgendeiner Form weithin eingesetzt (Google Maps verwendet ein approximatives Lookahead-Modell, um eine Route zum Ziel zu planen), sind aber nicht universell im Einsatz.

In der [Diskussion zur Rahmung des Problems oben](#framingtheproblem) haben wir drei Phasen beschrieben, die beim Verständnis der verschiedenen Dimensionen eines Entscheidungsproblems eine Rolle spielten. In diesem Abschnitt werden wir uns speziell auf die Entwicklung eines Computermodells konzentrieren, falls ein solches benötigt wird.

1. **Rahmung des Problems:** – Jeder Versuch, ein Entscheidungsproblem zu modellieren, erfordert die in unserem Rahmungsprozess identifizierten Elemente:
   - Eine Erzählung in einfacher Alltagssprache – Es ist wichtig, eine Beschreibung stets mit den Worten eines Fachexperten zu beginnen, der keinerlei Ausbildung, nicht einmal im Modellierungsprozess selbst, hat.
   - Beantworten Sie die drei Rahmungsfragen:
     - Was sind die Leistungskennzahlen? Wenn Sie keine quantifizierbaren Leistungskennzahlen formulieren können, haben Sie möglicherweise eines jener komplexen, unstrukturierten Probleme, das sich nicht für einen formalen Analyseprozess eignet.
     - Welche Arten von Entscheidungen werden getroffen (und möglicherweise, wer sie trifft)? Wird an dieser Stelle schon durch das bloße Auflisten möglicher Entscheidungen deutlich, welche Wahl Sie treffen sollten?
     - Welche Arten von Unsicherheiten könnten die Leistung des Systems beeinflussen? Dies kann eine komplexe Frage sein, deren Formulierung und anschließende Analyse Zeit in Anspruch nimmt, um die Auswirkung dieser Unsicherheiten auf die Leistung verschiedener Entscheidungen zu verstehen.

   An dieser Stelle könnten Sie das Gefühl haben, dass die zu treffende Wahl offensichtlich ist. Falls nicht, fahren Sie mit dem nächsten Schritt fort.
2. **Der universelle Modellierungsrahmen** – Das Verständnis der verschiedenen Elemente des universellen Modellierungsrahmens (beschrieben [oben](#universalmodelingframework)) kann ein vollständigeres Verständnis Ihres Problems vermitteln. Konkret:
   - Sie müssen die Informationen zusammentragen, die Sie benötigen, um eine Entscheidung zu treffen und Ihre Leistungskennzahlen zu berechnen (auch bekannt als die Zustandsvariablen). Da dies davon abhängt, wie Sie Entscheidungen treffen werden (die Politik), werden Sie in der Regel nicht in der Lage sein, alle Elemente der Zustandsvariablen sofort zu identifizieren.

Achten Sie auf Informationen, die Sie gerne hätten, aber nicht direkt (zumindest nicht mit einiger Genauigkeit) beobachten können. Diese können Gelegenheiten darstellen, statistische Schätzung/maschinelles Lernen einzusetzen.
   - Verstehen Sie, welche Entscheidungen Sie treffen dürfen. Später werden Sie sich mit dem Problem befassen, Entscheidungen zu treffen (Entwurf der Politik).
   - Listen Sie die Arten von Informationen auf, die eintreffen werden, nachdem Sie eine Entscheidung getroffen haben.
   - Sie müssen sich überlegen, wie sich Ihre Information in der Zustandsvariable im Laufe der Zeit ändert. Dies entwickelt sich natürlich mit unserem Verständnis dafür, welche Information wir benötigen. Dies ist die Übergangsfunktion.
   - Schließlich müssen Sie verstehen, wie Sie die Leistung Ihres Systems bewerten wollen. Dies bildet Ihre Zielfunktion.
3. **Modellierung von Unsicherheit** – Dies ist oft die subtilste Dimension bei der Modellierung eines sequentiellen Entscheidungsproblems, häufig weil unsichere Größen nicht sofort offensichtlich sein mögen. Obwohl es viele potenzielle Quellen von Unsicherheit gibt, gibt es nur zwei Wege, wie sie in das Modell eingeht:
   - Unsicherheit in Größen und Parametern innerhalb der Zustandsvariable, die die Information trägt, die zum Treffen einer Entscheidung und/oder zur Berechnung von Leistungskennzahlen benötigt wird.
   - Unsicherheit in der Information, die nach einer Entscheidung eintreffen kann, aber bevor die nächste Entscheidung getroffen wird (wir haben dies den Prozess der exogenen Information genannt).

   Es gibt verschiedene Wege, Unsicherheit zu erfassen:
   - Verwenden Sie Beobachtungen unsicherer Größen (Preise, Nachfragen, Reisezeiten) aus der Vergangenheit und nutzen Sie diese Stichproben, um unser Modell zu kalibrieren und abzustimmen.
   - Erstellen Sie ein mathematisches Modell der Unsicherheit und generieren Sie dann Stichproben aus diesem mathematischen Modell.

   Wir behandeln Unsicherheit deutlich ausführlicher in Kapitel 5, wo wir eine Reihe verschiedener Quellen von Unsicherheit identifizieren werden, als Leitfaden zur Benennung der Unsicherheiten, die für Ihre spezifische Anwendung gelten.
4. **Entwurf von Politiken** – Hier befassen wir uns mit der sehr umfangreichen Herausforderung, Methoden zum Treffen von Entscheidungen zu entwerfen. Kapitel 4 beschreibt vier Klassen von Politiken, die grundlegend unterschiedliche Methoden zum Treffen von Entscheidungen erfassen, aber wir verschieben eine vollständige Diskussion des Prozesses des Entwurfs von Politiken auf Band III.

   Beachten Sie, dass wir zwar die Idee einer Zustandsvariable im universellen Modellierungsrahmen einführen, die Zustandsvariable jedoch teilweise durch die von der Politik benötigte Information definiert wird.
5. **Computerimplementierung** – Sobald wir Politiken entworfen haben, müssen wir entscheiden, wie wir sie testen wollen. Die Möglichkeiten sind:
   - Tests im Feld – In diesem Fall müssen wir lediglich die Politik auf einem Computer implementieren, was auch bedeutet, die zum Treffen einer Entscheidung benötigten Daten zusammenzustellen.
   - Computersimulation – Wie wir Politiken am Computer testen, hängt von der Komplexität des Systems ab. Typischerweise wählen wir zwischen:
     - Tabellenkalkulationsimplementierung – Die meisten Probleme sind relativ einfach, sodass wir Ideen in einer Tabellenkalkulation testen können. Tabellenkalkulationen können sogar die Grundlage eines Produktionssystems sein.
     - Allgemeine Programmierumgebungen – Wenn das Problem für eine Tabellenkalkulation zu komplex ist, müssen wir uns an eine der vielen verfügbaren Programmierumgebungen wenden. Dies erfordert die Fähigkeiten erfahrener Programmierer.
6. **Bewertung und Kalibrierung von Modellen und Politiken** – An diesem Punkt müssen wir entscheiden, ob wir einen Simulator zur Bewertung der Politik entwickeln können, oder ob wir die Politik implementieren müssen, damit sie im Feld eingesetzt werden kann:
   - Entwicklung eines computerbasierten Simulators – An diesem Punkt haben wir alles, was wir brauchen, um die Leistung der Politik zu simulieren. Ein Computersimulator ist einfach eine Softwareimplementierung der Elemente des universellen Modellierungsrahmens. Wir können diesen Simulator dann entweder mit historischen Daten oder mit aus einem mathematischen Modell generierten Daten laufen lassen.
   - Feldtests – Es kommt häufig vor, dass wir nicht die Zeit oder die Ressourcen haben, einen Simulator zu entwickeln. Stattdessen implementieren wir die Politik und überwachen dann, wie gut sie in der Praxis funktioniert.

   Die Erstellung eines computerbasierten Simulators bietet erhebliche Vorteile, führt aber die schwierige Dimension der Modellkalibrierung ein. Im Gegensatz dazu bedeutet die direkte Implementierung einer Politik im Feld, dass wir sie in einer Umgebung testen, die keine Kalibrierung erfordert. Das Problem bei einer Feldimplementierung ist, dass die Suche über verschiedene Klassen von Politiken, und insbesondere die Abstimmung von Parametern, quälend langsam sein kann. Die Abstimmung von Politiken im Feld hat in der Forschungsliteratur sehr wenig Aufmerksamkeit erhalten.

## Arten von Analytik

Wenn wir deterministische Optimierungsprobleme lösen, können wir auf eine beträchtliche Familie von Lösern zurückgreifen, von kommerziellen Paketen wie Gurobi oder FICO Xpress bis hin zu einer Vielzahl kostenlos herunterladbarer Pakete. Zum Beispiel bietet Google seine "OR Toolbox" kostenlos an, auch für kommerzielle Nutzer.

Es gibt sehr wenige kommerzielle Werkzeuge zur Optimierung von Entscheidungen über die Zeit, wie sie bei einem sequentiellen Entscheidungsproblem notwendig wären. Wir werden jedoch typischerweise auf mehrere Werkzeugkästen zurückgreifen, während wir maßgeschneiderte Systeme für spezifische Probleme aufbauen. Dazu gehören:

- **Deterministische Optimierung** – Nur weil wir versuchen, Entscheidungen über die Zeit, unter Unsicherheit, zu treffen, heißt das nicht, dass die Werkzeuge der deterministischen Optimierung nicht mehr verwendet werden. Tatsächlich beinhalten die meisten (aber nicht alle) sequentiellen Entscheidungsprobleme das Lösen von Sequenzen von Optimierungsproblemen, die mit deterministischen Lösern gelöst werden.
- **Simulation** – Typischerweise bezieht sich dies auf die Monte-Carlo-Simulation, ein Bestand an Werkzeugen und Techniken zur Schätzung von Funktionen von Zufallsvariablen. Monte-Carlo-Werkzeuge eignen sich besonders gut für hochdimensionale, komplexe Probleme, was sie zu einem der leistungsfähigsten Werkzeuge zur Modellierung der Entwicklung von Information macht.
- **Statistische Schätzung/maschinelles Lernen** – Stat/ML-Werkzeuge, zu denen lineare oder nichtlineare Regression, Baumregression, lokal parametrische Modelle und neuronale Netze in verschiedenen Größen gehören. Stat/ML kann als eine Reihe von Werkzeugen beschrieben werden, um etwas zu schätzen, das wir nicht kennen, unter Verwendung von Information, die wir kennen.

Diese Werkzeuge werden typischerweise als aus unterschiedlichen Gemeinschaften stammend beschrieben, von denen nur eine (deterministische Optimierung) als Lösung von Entscheidungsproblemen betrachtet wird. Und dennoch ist es wichtig, die Rolle jedes einzelnen für den Zweck des Treffens von Entscheidungen zu verstehen.

Simulationsmodelle beispielsweise werden fast immer gebaut, um das Verständnis des Verhaltens irgendeines Prozesses zu unterstützen, der von einer Fertigungsanlage bis zur Ausbreitung einer Krankheit in einer Bevölkerung reichen kann. In beiden Beispielen versuchen wir zu sehen, wie der Entwurf des Systems (die Anlagengestaltung, wo Impfstoffbestände gelagert werden) oder die Steuerung des Systems (wie Aufträge geleitet werden, das Aufgeben von Impfstoff-Nachbestellungen) sich auswirkt. Wir könnten auch den Pfad von Hurrikanen simulieren, und obwohl wir ihre Pfade nicht ändern können, kann diese Information verwendet werden, um Evakuierungen zu steuern, die ebenfalls simuliert werden müssten.

Kurz gesagt hilft es, Simulationsmodelle als Zielfunktionen oder Prognosen zukünftiger Ereignisse zu betrachten, die zum Treffen von Entscheidungen verwendet werden sollen.

Wie steht es also mit statistischer Schätzung/maschinellem Lernen? Während diese Felder Optimierung verwenden, um ein Modell anzupassen, besteht das Ziel lediglich darin, eine Größe oder einen Parameter zu schätzen. Aber warum erstellen wir diese Schätzungen?

Wir könnten die Natur eines Tumors schätzen, oder wie viele Menschen die Leistung eines Präsidenten billigen, oder die Wahrscheinlichkeit, dass eine Schaltung funktioniert. Oder wir könnten zukünftige Ereignisse schätzen, etwa wie viele Menschen ein Produkt kaufen könnten, oder die Energieerzeugung in einem Windpark. In all diesen Fällen erstellen wir eine Schätzung oder Prognose, um jetzt eine Entscheidung zu treffen.

Jedes dieser Werkzeuge kann auch Dienste mit intrinsischem Wert bieten, der über die Unterstützung beim Treffen besserer Entscheidungen hinausgeht. Dies zeigt sich am deutlichsten bei den großen Sprachmodellen, die sich zum Zeitpunkt dieser Niederschrift rasant weiterentwickeln. LLMs können beispielsweise bei einer wachsenden Anzahl von Aufgaben helfen, wie etwa Forschung betreiben, Anfragen bearbeiten und Bilder erstellen, aber nicht beim Treffen von Entscheidungen.

## Abschließende Bemerkungen

Dieses Kapitel hat das Fundament für das Nachdenken über das komplexe Feld von Problemen gelegt, das als sequentielle Entscheidungsprobleme bekannt ist. Wir gehen von folgender Prämisse aus:

> "Wenn Sie {irgendetwas} besser betreiben wollen, müssen Sie bessere Entscheidungen treffen."

Die überwiegende Mehrheit der Situationen, die das Treffen von Entscheidungen beinhalten, fällt in die breite Kategorie der sequentiellen Entscheidungsprobleme, bei denen wir wiederholt Entscheidungen über die Zeit treffen, während neue Information eintrifft (beachten Sie, dass ein Sonderfall eines sequentiellen Entscheidungsproblems ein Problem ist, bei dem wir nur eine einzige Entscheidung treffen).

Das Ziel des Bandes ist es, Brücken zu bauen von jedem Problem, bei dem Interesse besteht, bessere Leistung zu erzielen (vermutlich durch das Treffen besserer Entscheidungen), zu Computersoftware, die bei diesen Entscheidungen helfen kann. Computer benötigen mathematische Modelle, die das Problem erfassen, und diese Modelle müssen das Problem verstehen, das in Englisch ausgedrückt wird, jedoch unter Verwendung von Begriffen, die das Problem so erfassen, dass es in die Sprache der Modelle übersetzt werden kann.

Ein entscheidendes Merkmal dieses Prozesses ist die Verwendung einer allgemeinen Modellierungsstrategie, die wir den universellen Modellierungsrahmen nennen. Es ist unsere Behauptung, basierend auf jahrzehntelanger Arbeit an einer sehr breiten Klasse von Problemen aus vielen Bereichen, dass dieser Modellierungsrahmen die Merkmale jedes Problems erfassen kann, bei dem Computer nützlich sein könnten. Dies ist ein wichtiger Vorbehalt, da es Probleme mit schlecht definierten oder nicht existierenden Kennzahlen gibt: Ob man jemanden heiraten soll? Welches Fach man als Hauptfach am College wählen soll? Welches Restaurant man wählen soll, wenn man einen Besucher empfängt?

Der universelle Modellierungsrahmen formalisiert Entscheidungen wie die Frage, wie eine Entscheidung getroffen werden soll (genannt eine Politik), was dann hilft zu beantworten, welche Information benötigt wird. Der UMF bietet auch eine Grundlage, um Politiken, die keine Prognose benötigen (Kaufe-niedrig-Verkaufe-hoch in der Finanzwirtschaft, Auffüll-Bestandspolitiken), mit solchen zu vergleichen, die eine benötigen, und um den Wert genauerer Prognosen zu bewerten.

Der Einsatz von Computern zum Treffen von Entscheidungen öffnet die Tür zur Nutzung von "künstlicher Intelligenz", ein Begriff, der in der öffentlichen Presse weit verbreitet ist, ohne ordnungsgemäß definiert zu sein. Wir behandeln die sieben Stufen künstlicher Intelligenz, die klar zwischen Werkzeugen unterscheiden, die auf maschinellem Lernen basieren, wie großen Sprachmodellen (wie ChatGPT), und Werkzeugen zum Treffen von Entscheidungen, wie deterministischer Optimierung (Stufe 5) und sequentiellen Entscheidungsproblemen (Stufe 6).

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was sind die drei Stufen der Entscheidungsautomatisierung?</li>
<li>Was sind die drei Fragen, die in Stufe 1 der Problemformulierung gestellt werden? Veranschaulichen Sie diese anhand eines Problemumfelds Ihrer Wahl.</li>
<li>Was sind die fünf Elemente des universellen Modellierungsrahmens?</li>
<li>Was ist die Definition einer Entscheidung? Geben Sie drei Beispiele in unterschiedlichen Situationen, denen Sie in Ihren persönlichen Aktivitäten begegnen.</li>
<li>Beschreiben Sie kurz die sieben Stufen künstlicher Intelligenz, unterteilt in die vier verschiedenen Klassen, wie sie im Kapitel organisiert sind.</li>
<li>Was sind die drei Klassen statistischer Modelle?</li>
<li>Was ist der Unterschied zwischen einem Basismodell und einem Lookahead-Modell? Verwenden Sie den Kontext einer langen Autoreise mit Google Maps, um beide zu veranschaulichen.</li>
<li>Was sind die sechs Stufen der Modellierung?</li>
</ol>

**Modellierungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Geben Sie ein Beispiel für ein sequentielles Entscheidungsproblem, dem Sie in Ihren täglichen Aktivitäten begegnen, und gehen Sie wie folgt vor:
  <ol type="a">
    <li>Identifizieren Sie mindestens eine Leistungskennzahl, die Sie verbessern möchten.</li>
    <li>Nennen Sie mindestens eine Entscheidung, die die Leistungskennzahl beeinflusst.</li>
    <li>Beschreiben Sie etwaige Unsicherheiten, die beeinträchtigen könnten, wie sich die Entscheidung bei ihrer Umsetzung auswirkt.</li>
  </ol>
</li>
<li>Nennen Sie drei Beispiele für Probleme, die physische Ressourcen betreffen, und identifizieren Sie die Entscheidungen, die in jedem Umfeld auftreten.</li>
<li>Sie werden 15 Partien Tic-Tac-Toe spielen, bei denen das Ziel darin besteht, den gegnerischen Spieler dazu zu zwingen, drei in einer Reihe zu bekommen (wodurch Sie gewinnen). Keiner von Ihnen beiden hat dieses Spiel je zuvor gespielt, und Sie möchten erfassen, wie der andere Spieler Ihre Strategie erlernt. Denken Sie daran, dass Tic-Tac-Toe normalerweise unentschieden endet, sodass es notwendig sein wird, Ihren Gegner glauben zu lassen, dass Sie einen Fehler machen werden. Beantworten Sie die untenstehenden Fragen auf Englisch (keine Mathematik erlaubt).
  <ol type="a">
    <li>Entwerfen Sie eine Leistungskennzahl, die die Ergebnisse der 15 Partien erfasst.</li>
    <li>Welche Entscheidungen müssen Sie treffen?</li>
    <li>Was sind die Unsicherheiten?</li>
    <li>Beschreiben Sie die Informationen, die Sie nach mehreren gespielten Partien hätten und die Sie benötigen würden, um eine Politik zu entwerfen.</li>
  </ol>
</li>
</ol>

{% endraw %}
