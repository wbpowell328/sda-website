---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: "## Kapitel 1: Modellierung sequentieller Entscheidungsprobleme"
permalink: /sdam/de/chapter-1/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: c8dee8647c7936a6
---

{% raw %}
Der Prozess der Lösung eines physischen Problems (und insbesondere eines sequentiellen Entscheidungsproblems) auf dem Computer erfordert den Aufbau eines mathematischen Modells, wie in Abbildung 1.1 dargestellt. Seit Jahrzehnten verwendet die Forschungsgemeinschaft ein Standard-Mathematikgerüst für Entscheidungsprobleme, bei denen alle Daten im Voraus bekannt sind (bekannt als deterministische Optimierung). Eine einfache Version eines deterministischen Optimierungsproblems, bekannt als lineares Programm, könnte geschrieben werden als

$$
\begin{align}
\min_x c^T x, \label{eq:linearprogram1}
\end{align}
$$

wobei $x$ ein Vektor von Elementen ist, die eine Reihe von Nebenbedingungen erfüllen müssen, die typischerweise geschrieben werden als

$$
\begin{align}
A x & =  b, \label{eq:linearprogram2}\\
x   & \geq 0. \label{eq:linearprogram3}
\end{align}
$$

<figure class="book-figure">
  <img src="/assets/images/sdam/modeling.png" alt="Die Brücke zwischen der realen Welt und dem Computer ist ein mathematisches Modell." style="max-width: 450px;">
  <figcaption><span class="fig-num">Abbildung 1.1.</span> Die Brücke zwischen der realen Welt und dem Computer ist ein mathematisches Modell.</figcaption>
</figure>

Es ist nicht notwendig, die Gleichungen $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ zu verstehen (was grundlegende Kenntnisse der linearen Algebra erfordert), aber jedes Jahr schließen Tausende von Studierenden Kurse ab, in denen sie diese Notation lernen und auch lernen, wie man eine breite Palette physischer Probleme in diese Notation übersetzt. Dann gibt es Softwarepakete, die Probleme in diesem Format in eine Lösung übersetzen. Am wichtigsten ist, dass diese Notationssprache weltweit gesprochen wird. Dieselbe Aussage lässt sich über statistische Modellierung/maschinelles Lernen treffen, was heute eine viel größere Gemeinschaft ist als diejenigen, die die Gleichungen $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ verstehen.

Dieselbe Aussage können wir nicht über sequentielle Entscheidungsprobleme treffen, eine Problemklasse, die von mindestens 15 verschiedenen Gemeinschaften mit acht grundlegend unterschiedlichen Notationsstilen untersucht wird, wobei oft Mathematik verwendet wird, die eine fortgeschrittene Ausbildung erfordert. In diesem Buch verwenden wir einen Lehr-durch-Beispiele-Stil, um zu zeigen, wie man die unglaublich reichhaltige Klasse von Problemen modelliert, die wir sequentielle Entscheidungsprobleme nennen. Während wir uns auf relativ einfachere Probleme konzentrieren, kann unser Rahmenwerk verwendet werden, um *jedes* sequentielle Entscheidungsproblem zu modellieren. Darüber hinaus kann das resultierende Modell direkt in Software übersetzt werden.

Die analytische Grundlage dieses Buches ist in *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (RLSO) enthalten, einem Lehrbuch auf Graduiertenniveau, das sich auf Methodik konzentriert. Von Zeit zu Zeit verweisen wir auf Material in diesem Buch für Leser, die an größerer Tiefe interessiert sein könnten, und wir ermutigen technisch interessierte Leser, RLSO als Referenz zu nutzen. Es wird jedoch nicht benötigt. Dieses Buch ist so konzipiert, dass es den kontextuellen Hintergrund in Form einer Reihe von Beispielen liefert, die es den Lesern ermöglichen sollten, klar und präzise über sequentielle Entscheidungsprobleme nachzudenken, selbst wenn sie nie eine Zeile Code schreiben werden.

Dieses Buch richtet sich an Bachelor- oder Masterstudierende, die einen Kurs in Wahrscheinlichkeitsrechnung und Statistik absolviert haben (Kenntnisse in linearer Programmierung sind nicht erforderlich, obwohl wir ein Beispiel haben, das die Lösung eines linearen Programms erfordert). Alle Kapitel sind um konkrete Beispiele herum aufgebaut, mit Ausnahme von Kapitel 1, das einen Überblick über das gesamte Modellierungsgerüst bietet, und Kapitel 7, in dem wir innehalten und die ersten sechs Kapitel nutzen, um einige wichtige Prinzipien zu veranschaulichen.

Die Darstellung sollte keine Mathematik erfordern, die über das hinausgeht, was in einem ersten Kurs zu Wahrscheinlichkeitsrechnung und Statistik erwartet würde. Dies vorausgeschickt, konzentriert sich das Buch darauf zu zeigen, wie man sequentielle Entscheidungsprobleme mit einer Notation beschreibt, die präzise genug ist, um die Grundlage für Computersoftware zu bilden.

Python-Module begleiten die meisten Kapitel; diese Module wurden um das Modellierungsgerüst herum geschrieben, das sich durch das gesamte Buch zieht. Gleichzeitig kann jedes Softwarepaket, das ein sequentielles Entscheidungsproblem simuliert, unabhängig davon, wie es gelöst wird, direkt in das von uns verwendete Modellierungsgerüst übersetzt werden. Aus diesem Grund ermutigen wir die Leser, jedes Stück Notation als eine Variable in einem Computerprogramm zu betrachten.

## Erste Schritte

Sequentielle Entscheidungsprobleme können immer geschrieben werden als

$$
decision,\ information, \ decision, \ information, \ decision, \ldots
$$

Jedes Mal, wenn wir eine Entscheidung treffen, entstehen uns Kosten oder wir erhalten einen Beitrag oder eine Belohnung (es gibt viele Möglichkeiten, die Leistung zu messen). Entscheidungen werden mit einer Methode getroffen, die wir als *Politik* bezeichnen werden. Ein zentrales Ziel, das im Mittelpunkt dieses Buches steht, ist die Gestaltung effektiver Politiken, die über die Zeit gut funktionieren, angesichts der Unsicherheit von Informationen, die noch nicht eingetroffen sind.

Sequentielle Entscheidungsprobleme sind allgegenwärtig und treten praktisch in jedem menschlichen Prozess auf. Tabelle 1.1 bietet eine Beispielliste von Bereichen mit Beispielen für einige der Entscheidungen, die auftreten könnten. Die meisten dieser Bereiche haben wahrscheinlich viele verschiedene Arten von Entscheidungen, die in ihrer Komplexität variieren – vom Zeitpunkt des Verkaufs eines Vermögenswerts oder der Einführung eines neuen Webdesigns bis zur Auswahl des besten Medikaments, Materials oder Bauwerks für ein Design oder der Verwaltung komplexer Lieferketten oder dem Disponieren einer LKW-Flotte.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Bereich</th><th>Fragen</th></tr></thead>
<tbody>
<tr><td>Wirtschaft</td><td>Welche Produkte sollten wir mit welchen Merkmalen verkaufen? Welche Zulieferungen sollten Sie verwenden? Welchen Preis sollten Sie verlangen?</td></tr>
<tr><td>Volkswirtschaft</td><td>Welchen Zinssatz sollte die Federal Reserve angesichts des Zustands der Wirtschaft verlangen? Welches Niveau an Marktliquidität sollte bereitgestellt werden?</td></tr>
<tr><td>Finanzen</td><td>In welche Aktien sollte ein Portfolio investieren? Wie sollte ein Trader einen Kontrakt gegen mögliche Verluste absichern?</td></tr>
<tr><td>Internet</td><td>Welche Anzeigen sollten wir zeigen, um Klicks zu maximieren? Welche Filme ziehen die meiste Aufmerksamkeit an? Wann/wie sollten Massenbenachrichtigungen versendet werden?</td></tr>
<tr><td>Ingenieurwesen</td><td>Wie gestaltet man Geräte von Aerosoldosen bis zu Elektrofahrzeugen, Brücken bis zu Verkehrssystemen, Transistoren bis zu Computern?</td></tr>
<tr><td>Öffentliche Gesundheit</td><td>Wie sollten wir Tests durchführen, um den Verlauf einer Krankheit abzuschätzen? Wie sollten Impfstoffe verteilt werden? Welche Bevölkerungsgruppen sollten angesprochen werden?</td></tr>
<tr><td>Medizinische Forschung</td><td>Welche molekulare Konfiguration wird das Medikament hervorbringen, das die meisten Krebszellen abtötet? Welche Schritte sind erforderlich, um einwandige Nanoröhren herzustellen?</td></tr>
<tr><td>Lieferkettenmanagement</td><td>Wann sollten wir eine Bestellung für Bestand aus China aufgeben? Welcher Lieferant sollte verwendet werden?</td></tr>
<tr><td>Frachttransport</td><td>Welcher Fahrer sollte eine Ladung transportieren? Welche Ladungen sollte ein Komplettladungstransporteur zu befördern zusagen? Wo sollten Fahrer stationiert sein?</td></tr>
<tr><td>Informationserfassung</td><td>Wohin sollten wir eine Drohne schicken, um Informationen über Waldbrände oder invasive Arten zu sammeln? Welches Medikament sollten wir testen, um eine Krankheit zu bekämpfen?</td></tr>
<tr><td>Multiagentensysteme</td><td>Wie sollte ein großes Unternehmen in einem oligopolistischen Markt auf Verträge bieten und dabei die Reaktion seiner Konkurrenten antizipieren?</td></tr>
<tr><td>Algorithmen</td><td>Welche Schrittweitenregel sollten wir in einem Suchalgorithmus verwenden? Wie bestimmen wir den nächsten Punkt zur Auswertung einer teuren Funktion?</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 1.1.</span> Eine Auswahl verschiedener Bereiche und der Entscheidungen, die innerhalb jedes Bereichs getroffen werden müssen.</p>
</div>

Noch anspruchsvoller als die Auflistung aller Arten von Entscheidungen ist die Identifizierung der verschiedenen Unsicherheitsquellen, die in vielen Anwendungen auftreten. Menschliches Verhalten, Märkte, physische Prozesse, Verkehrsnetze, Energiesysteme und das breite Spektrum an Unsicherheiten, die im Gesundheitswesen auftreten, deuten auf die Vielfalt der verschiedenen Unsicherheitsquellen hin.

Während dieses Buch geschrieben wird, kämpft die Menschheit mit der Ausbreitung von Varianten von COVID-19. Der Umgang mit dieser Pandemie wurde als „geistesverwirrend komplex" beschrieben [USA Today, 8. September 2020], aber dies ist eigentlich ein Nebenprodukt des Versäumnisses, das Problem strukturiert zu durchdenken. Wir werden dem Leser zeigen, wie man Probleme in eine Reihe grundlegender Komponenten zerlegt, die zu praktischen Lösungen führen.

Unser Ansatz beginnt mit der Identifizierung einiger Kernelemente wie Leistungskennzahlen, Entscheidungen und Unsicherheitsquellen, was dann zur Erstellung eines mathematischen Modells des Problems führt. Der nächste Schritt besteht in der Regel (aber nicht immer) darin, das Modell auf dem Computer zu implementieren, aber es wird viele Probleme geben, bei denen der Prozess des Aufbaus eines Computermodells aus einer Reihe von Gründen unpraktikabel ist. Aus diesem Grund werden wir auch Probleme betrachten, bei denen wir Ideen im Feld testen und bewerten müssen. Um die Leistung zu verbessern, müssen wir zunächst lernen, im Laufe der Zeit gute Entscheidungen zu treffen (so steuern wir das System). Dann wenden wir uns dem Design des Systems zu.

Zum gegenwärtigen Zeitpunkt hat die akademische Gemeinschaft keinen standardisierten Modellierungsprozess für sequentielle Entscheidungsprobleme angenommen. Dies steht in scharfem Kontrast zum Bereich statischer, deterministischer Optimierungsprobleme, die seit den 1950er Jahren einem strikten Rahmenwerk folgen (die Gleichungen $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ stellen eine Stichprobe dieses Rahmenwerks dar). Unser Modellierungsprozess basiert auf der Darstellung in RLSO, einem Buch, das sich an ein technisches Publikum richtet, das in erster Linie daran interessiert ist, Modelle zu entwickeln und auf dem Computer zu implementieren.

Im Gegensatz dazu richtet sich dieses Buch an ein breiteres Publikum, das vor allem daran interessiert ist zu lernen, wie man über sequentielle Entscheidungsprobleme *nachdenkt*. Es verwendet einen Lehr-durch-Beispiele-Stil, der sich auf die Vermittlung des Modellierungsprozesses konzentriert, den wir für nützlich halten, auch ohne letztendlich Computermodelle zu erstellen. Zentral für unseren Ansatz ist die Erstellung eines mathematischen Modells, das die Mehrdeutigkeit bei der Beschreibung von Problemen in einfachem Englisch beseitigt. Für Leser, die daran interessiert sind, Computermodelle zu entwickeln, ist Notation das Sprungbrett zum Schreiben von Software. Wir werden jedoch hauptsächlich mathematische Notation verwenden, um bei der Beschreibung eines Problems Klarheit zu schaffen, selbst wenn der Leser nie beabsichtigt, eine Zeile Code zu schreiben.

Unsere Darstellung verläuft wie folgt:

- Kapitel 1 bietet eine leichte Einführung in das universelle Modellierungsgerüst, veranschaulicht anhand von zwei Bestandsproblemen (einem einfachen und einem etwas komplexeren), gefolgt von einer kurzen Diskussion der Modellierung von Unsicherheit. Anschließend wird eine Einführung in die vier Klassen von Politiken gegeben, die jede Methode zur Entscheidungsfindung abdecken.
- Die Kapitel 2–6 beschreiben jeweils ein konkretes sequentielles Entscheidungsproblem, um das Modellierungsgerüst mit einem Lehr-durch-Beispiele-Stil zu veranschaulichen. Diese Anwendungen wurden ausgewählt, um jede der vier Klassen von Politiken hervorzuheben.
- Kapitel 7 kehrt ausführlicher zum universellen Modellierungsgerüst zurück. Es wird eine viel sorgfältigere Diskussion der vier Klassen von Politiken sowie verschiedener Arten von Zustandsvariablen gegeben, wobei die Beispiele aus den Kapiteln 2–6 den Kontext liefern.
- Die Kapitel 8–14 bieten zusätzliche Beispiele, die anspruchsvollere Einstellungen verwenden, um fortgeschrittenere Modellierungskonzepte zu veranschaulichen, wobei sowohl die Modellierung von Unsicherheit (insbesondere die Modellierung von Strompreisen in [Kapitel 8](/sdam/de/chapter-8/)) als auch ein reichhaltigeres Set von Politiken behandelt werden.

Die Anwendungskapitel (2–6 und 8–14) folgen alle demselben Aufbau. Sie können in beliebiger Reihenfolge behandelt werden, wobei zu beachten ist, dass die Anwendungen in den Kapiteln 2–6 einfacher sind und ausgewählt wurden, um jede der vier Klassen von Politiken zu veranschaulichen. Leser, die an bestimmten Modellierungsthemen interessiert sind (wie Zustandsvariablen, Modellierung von Unsicherheit oder verschiedene Beispiele von Politiken), können Kapitel überfliegen und direkt zu den Themen springen, die sie interessieren.

Jedes Kapitel endet mit einer Reihe von Übungen, die in drei Kategorien unterteilt sind:

- Wiederholungsfragen – Dies sind einfache Fragen, die genutzt werden können, um ein grundlegendes Verständnis aus der Lektüre des Kapitels zu festigen.
- Problemlösungsfragen – Diese führen Modellierungsherausforderungen ein, die Problemlösungsfähigkeiten erfordern.
- Programmieraufgaben – Die meisten Kapitel enthalten Programmierübungen, die auf eine Reihe von Python-Modulen zurückgreifen. Die ursprünglichen Python-Module, geschrieben in Python 2, profitierten von einem umfassenden Upgrade durch Professor Dennis Djanka, einen Professor an der Universität Karlsruhe in Deutschland. Die neue Bibliothek kann unter [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/) herunterladen werden. Einige dieser Fragen erfordern die Vornahme von Programmieränderungen am Python-Code.

## Was also ist eine Entscheidung?

Es gibt eine lange Geschichte, die über 2.000 Jahre bis in die Zeit von Sokrates, Aristoteles und Platon zurückreicht und die Untersuchung dokumentiert, wie Menschen Entscheidungen treffen. Dann gibt es eine umfangreiche Literatur, größtenteils seit den 1950er Jahren (aber mit einigen wichtigen Arbeiten davor), über die Mathematik des Treffens optimaler Entscheidungen, die aus vielen Tausenden von Aufsätzen und Büchern besteht. Was diese Literatur zu übersehen scheint, ist die grundlegende Frage:

> *Was ist eine Entscheidung?*

Wir beginnen mit der Beobachtung, dass eine Entscheidung eine Form von Information ist, die das Verhalten eines „Systems“ beeinflusst, das wir steuern wollen. Diesem System liegen implizit ein oder mehrere Maße zugrunde, die quantifizieren, wie gut unser System funktioniert. Wir müssen dann einen Agenten identifizieren, der einen bestimmten Aspekt unseres Systems steuert.

Auf dieser Grundlage ist es hilfreich, drei Klassen von Information zu unterscheiden:

1. Der Wissenszustand – Dies ist Information, die wir gerade jetzt besitzen und die für die Leistung unseres Systems relevant ist.
2. Information, die den Wissenszustand verändert und die wir kontrollieren (dies erfordert die Identifikation eines steuernden Agenten für unser System).
3. Information, die in unser System einströmt und den Wissenszustand verändert, aber außerhalb unserer Kontrolle liegt.

Wir bezeichnen Information der Klasse 2 als *Entscheidungen*. Dies legt eine formale Definition einer Entscheidung nahe, angelehnt an *Bridging Decision Problems, Volume I: Framing the Problem*:

> **Definition (formal):** Eine **Entscheidung** ist eine endogen kontrollierbare Informationsklasse.

Eine informelle Definition könnte lauten:

> **Definition (informell):** Eine **Entscheidung** ist etwas, das wir kontrollieren.

Diese Definitionen bieten einen Ausgangspunkt, lehren uns aber nicht sehr viel. Weitaus interessanter ist es, konkrete Beispiele für Entscheidungen zu identifizieren, was wir als Nächstes tun.

## Arten von Entscheidungen

Wir haben 10 Arten von Entscheidungen identifiziert, basierend auf den Rahmenbedingungen und den Werkzeugen, die wir zur Bestimmung der besten Entscheidungen verwenden könnten. Dies sind:

**1) Physische und finanzielle Entscheidungen** – Diese Entscheidungen entstehen im Management physischer und finanzieller Ressourcen, wie Personen, Ausrüstung, Anlagen, Produkte, Wasser, Energie sowie finanzielle Ressourcen wie Bargeld oder Investitionen. Zu den Entscheidungen zählen Kauf, Verkauf und Veränderung von Ressourcen, wobei eine Veränderung bedeuten kann, sie von einem Ort an einen anderen zu bewegen, Ausrüstung zu reparieren, eine Person zu schulen oder Zutaten zu einem Kuchen zu kombinieren.

**2) Komplexe/strategische Entscheidungen** – Dies sind Entscheidungen, die möglicherweise mehrere Veränderungen an einem System vornehmen (Änderung von Ressourcen, Parametern, Überzeugungen) und die typischerweise erhebliche Unsicherheitsquellen beinhalten. Diese Entscheidungen werden typischerweise einmal bewertet, wobei die Option besteht, abzuwarten und die Entscheidung später zu treffen.

**3) Entscheidungen zur Informationsbeschaffung/Beobachtung** – Dazu zählen Entscheidungen wie das Durchführen von Laborexperimenten, Feldtests oder Computersimulationen. Es könnte auch die Durchführung von Marktforschung, die Einstellung eines Experten oder das Befragen eines großen Sprachmodells umfassen.

**4) Entscheidungen zur Informationskommunikation/-weitergabe** – Diese kommen in zwei Formen vor:

- a) Botschaften – Dies spiegelt wider, was wir in Text, Video und/oder Audio sagen.
- b) Kanäle und Zeitpunkt – Dies umfasst die Wahl, wie die Information gesendet wird: Text/E-Mails, Veröffentlichung (gedruckt oder online), soziale Medien oder Werbekanäle. Es erfordert außerdem die Wahl des Zeitpunkts und der Häufigkeit.

**5) Leistungskennzahlen und Zielsetzungen** – Diese repräsentieren die kritische Wahl, das zu quantifizieren, was wir erreichen wollen, wie etwa die Maximierung von Umsätzen, die Minimierung von Kosten, die Minimierung von Krankheit oder die Maximierung erhaltener Stimmen.

**6) Auswahl von Funktionen** – Dies können Methoden zum Treffen von Entscheidungen (Politiken), die Formulierung von Optimierungsmodellen, die Wahl von Leistungskennzahlen, Methoden zur Prognose oder Schätzung oder das Design von Übergangsfunktionen (etwa wie sich eine Krankheit verbreitet) sein.

**7) Festlegung von Parametern** – Es gibt häufig eine Reihe von Parametern, die die Leistung eines Systems beeinflussen. Dies könnten Preise, die Koeffizienten in einem statistischen Modell oder die in einem Fertigungsprozess verwendete Temperatur sein. Es könnte sich um das Gewicht handeln, das einer Leistungskennzahl zugewiesen wird, oder um Leistungsziele.

**8) Schätzung oder Identifikation** – Wir müssen unter Umständen eine Person identifizieren, die Nachfrage prognostizieren oder eine Krankheit benennen.

**9) Merkmale und Verhaltensweisen** – Wie ein Produkt zu gestalten ist, welche Funktionen ein Softwarepaket haben sollte, welche Dienstleistungen einem Kunden angeboten werden sollten oder das Hauptfach eines Studierenden, das bestimmt, mit welchen Fähigkeiten er den Abschluss macht.

**10) Entscheiden, was zu entscheiden ist** – Zwar verwenden wir für diese letzte Entscheidung im Allgemeinen keine formale Analyse, aber es ist wichtig zu erkennen, wann wir eine Entscheidung treffen und ob wir sie formal mittels Datenanalyse und Modellierung angehen wollen.

Der Identifikation von Entscheidungen liegt implizit das Verständnis zugrunde, wie die Entscheidung die Leistung des Systems beeinflusst. Das Bewegen physischer Ressourcen (Typ 1) ist mit Kosten verbunden, während die Erfüllung von Bedarfen Umsätze einbringt. Eine Entscheidung kann eine unmittelbare Auswirkung auf eine oder mehrere Leistungskennzahlen haben (wie es oft bei der Verwaltung von Ressourcen vorkommt), aber häufig müssen Entscheidungen über die Zeit bewertet werden und hängen von Informationen ab, die zum Zeitpunkt der Entscheidung nicht bekannt sind. Aus diesem Grund bewerten wir häufig *wie* wir Entscheidungen treffen (das heißt die Methode) im Gegensatz zur Entscheidung selbst.

## Einrahmen des Problems

Der erste Schritt bei der Herangehensweise an ein Entscheidungsproblem besteht darin, drei Fragen zu beantworten:

- Was sind die Leistungskennzahlen?
- Welche Arten von Entscheidungen werden getroffen (und wer trifft sie)?
- Was sind die Unsicherheiten, die die Leistung beeinflussen?

Beachten Sie, dass die Antworten auf diese Fragen für jedes Entscheidungsproblem grundlegend sind. In diesem Buch werden diese Fragen recht einfach erscheinen, weil wir sie im Kontext der Modelle beantworten, die wir bereits zur Lösung eines Problems entworfen haben. In realen Anwendungen können die Listen der Leistungskennzahlen, Entscheidungen und Unsicherheiten recht lang sein.

Als Andeutung des Reichtums, den das Einrahmen eines Problems annehmen kann, ermutigen wir den Leser, sich die Monografie [*Framing the Problem*](/bridging-vol1/) anzusehen, die sich genau diesem Thema widmet. Die Monografie enthält ganze Kapitel, die jeder dieser Fragen gewidmet sind und die anhand von einem Dutzend verschiedener Anwendungen illustriert werden.

Das Ziel des Einrahmungsprozesses ist es, herauszufinden, was wichtig ist, beginnend mit den Leistungskennzahlen, wobei selbst ein einfaches Bestandsproblem mit über 20 Leistungskennzahlen, 30 verschiedenen Arten von Entscheidungen und über 30 Arten von Unsicherheiten beschrieben werden kann. Die Tabelle, die diese aufführt, findet sich unter [tinyurl.com/PowellInventoryDecisions](https://tinyurl.com/PowellInventoryDecisions). Das bedeutet nicht, dass wir tatsächlich ein Modell mit dieser gesamten Komplexität aufbauen werden. Aus diesem Grund führt das Buch ein Werkzeug namens *Interaktionsmatrizen* ein, bei dem ein Fachexperte die Kennzahlen priorisiert und dann anhand seines Urteils die Entscheidungen und Unsicherheiten identifiziert, die den größten Einfluss auf die wichtigsten Kennzahlen haben.

Dieses Buch geht davon aus, dass wir ein Problem bereits auf eine kleine Anzahl von Kennzahlen, Entscheidungen und Unsicherheiten reduziert haben, und nutzt diese, um die Entwicklung eines mathematischen Modells zu fokussieren.

## Der Modellierungsprozess

Modellierung ist eine Kunst, aber es ist eine Kunst, die von einem mathematischen Rahmenwerk geleitet wird, das sicherstellt, dass wir ein wohldefiniertes Problem erhalten, das wir auf den Computer bringen und lösen können. Dies kann man sich als den Bau einer Brücke von einem unübersichtlichen, schlecht definierten realen Problem zu etwas mit der Klarheit vorstellen, die ein Computer verstehen kann, selbst wenn Ihr Endziel nicht darin besteht, es auf den Computer zu bringen.

Historisch gesehen wandten sich Menschen, wenn ein Modellierungsvorhaben den Versuch beinhaltete, Entscheidungen zu treffen, dem bekannten Rahmenwerk der deterministischen Optimierung zu, das oft wie das durch die Gleichungen $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ gegebene Modell aussieht, welches aus den Entscheidungsvariablen $x$, einer Zielfunktion $cx$ und den durch $\eqref{eq:linearprogram2}$–$\eqref{eq:linearprogram3}$ gegebenen Nebenbedingungen besteht.

Das Problem mit diesem klassischen Modellierungsrahmenwerk ist das, was es außer Acht lässt:

- Es geht davon aus, dass alle Daten (enthalten in den Variablen $A$, $b$ und $c$), die das Modell charakterisieren, perfekt bekannt sind.
- Die meisten Entscheidungen treten wiederholt über die Zeit auf, und doch wird dies nicht anerkannt.
- Es gibt keine Möglichkeit, den Informationsfluss zum System darzustellen.
- Als Nebeneffekt kann die optimale Lösung dieses Modells keine Ereignisse antizipieren, die die Leistung von $x$ im Feld beeinflussen.
- Es gibt keine Möglichkeit, Risiko darzustellen, ein bedeutendes Thema in vielen Anwendungen.
- Es geht von einem einzigen Entscheidungsträger aus.

Mathematische Modelle sollten in erster Linie einen Weg bieten, der uns zeigt, wie wir über Probleme *nachdenken* sollen. Die klassischen deterministischen Optimierungsmodelle, die dem Format der Gleichungen $\eqref{eq:linearprogram1}$–$\eqref{eq:linearprogram3}$ folgen, ignorieren völlig alles, was mit der Entwicklung unseres Problems über die Zeit zusammenhängt.

Dieses Buch ist vollständig um einen Modellierungsansatz namens *universelles Modellierungsrahmenwerk* aufgebaut. Kurz gesagt, es strebt danach, *jeden* Aspekt eines steuerbaren Systems darzustellen. Unser Standardmodell wird annehmen, dass sich das System über die Zeit entwickelt, während neue Information eintrifft.

In diesem Abschnitt werden wir eine sehr kompakte Version des universellen Modellierungsrahmenwerks vorstellen. Anschließend werden wir das Rahmenwerk illustrieren, zunächst anhand eines sehr einfachen Bestandsproblems, dann aber einige moderate Erweiterungen einführen. Nach der Präsentation dieser Beispiele werden wir zu einer detaillierteren Darstellung des universellen Modellierungsrahmenwerks zurückkehren.

### Eine kompakte Darstellung eines dynamischen Modells

Wir beginnen mit der Beobachtung, dass wir jedes sequentielle Entscheidungsproblem mithilfe der Sequenz

$$
(S_0,x_0,W_1,S_1,x_1,W_2, \ldots, S_t, x_t, W_{t+1}, \ldots, S_T),
$$

modellieren können, wobei:

- $S_t$ die *Zustandsvariablen* sind, die alles erfassen, was wir benötigen, um:
    - a) Eine Entscheidung zum Zeitpunkt $t$ zu treffen.
    - b) Die Leistungskennzahlen zum Zeitpunkt $t$ zu berechnen.
    - c) Jede andere Information zu erfassen, die benötigt wird, um (a) oder (b) zu irgendeinem zukünftigen Zeitpunkt zu berechnen.

  Es ist am besten, sich $S_t$ als den Informationszustand oder allgemeiner den Wissenszustand zum Zeitpunkt $t$ vorzustellen.
- $x_t$ repräsentiert *Entscheidungsvariablen*, die die Elemente erfassen, die wir kontrollieren, etwa ob ein Haus verkauft werden soll, den Weg durch ein Netzwerk, die Wahl des Medikaments für eine Behandlung, den Preis, zu dem ein Produkt verkauft werden soll, oder die Wahl des Lkw für den Transport einer Frachtladung.
- $W_{t+1}$ ist die Information, die nach dem Treffen der Entscheidung $x_t$ eintrifft, was der endgültige Verkaufspreis eines Hauses, die Reisezeiten durch ein Netzwerk, wie ein Patient auf ein Medikament reagiert, die Verkäufe eines Produkts zu einem bestimmten Preis oder die nach der ursprünglichen Zuweisung eingegangenen Frachtladungen sein könnte. Wir betrachten die Information in $W_{t+1}$ als von außerhalb unseres Systems kommend, was bedeutet, dass sie außerhalb unserer Kontrolle liegt. Aus diesem Grund bezeichnen wir sie als *exogene Information*.

  Es gibt viele Situationen, in denen es am besten ist, sich $W_{t+1}$ als eine Funktion $W_{t+1}(S_t,x_t)$ vorzustellen, die vom aktuellen Zustand $S_t$ und/oder der Entscheidung $x_t$ abhängt. Wir erörtern dies weiter unten genauer. Wir werden $W_{t+1}$ als unsere Standardnotation verwenden, jedoch mit dem Verständnis, dass sie durch den Zustand $S_t$ oder die Entscheidung $x_t$ beeinflusst werden kann.

Die Entscheidung $x_t$ wird durch eine Methode bestimmt, die wir als *Politik* bezeichnen, welche wir mit $X^\pi(S_t)$ kennzeichnen. Die Notation $\pi$ trägt Information über die Struktur der Funktion, die wir durch $f$ in einer Menge potenzieller Funktionen $\Fcal$ repräsentieren, sowie über etwaige einstellbare Parameter $\theta\in\Theta^f$, die durch die Struktur der Funktion festgelegt sind. Zum Beispiel könnte eine Bestandspolitik lauten, $\theta^{order}$ Einheiten zu bestellen, sobald der Bestand unter $\theta^{min}$ fällt, was bedeutet, dass die einstellbaren Parameter $\theta = (\theta^{order}, \theta^{min})$ sind. Die Struktur der Funktion wäre ein Beispiel für eine Funktion $f$.

Wir nehmen an, dass wir über eine *Übergangsfunktion* verfügen, die den Zustand $S_t$, die Entscheidung $x_t$ und die exogene Information $W_{t+1}$ als Eingabe nimmt und uns den aktualisierten Zustand $S_{t+1}$ liefert. Übergangsfunktionen sind eine Menge von Gleichungen, die jedes Element der Zustandsvariable $S_t$ aktualisieren, welche nur ein Element haben kann oder zehntausende (oder noch viel mehr).

Wir erhalten einen Beitrag (oder eine Kosten) $C(S_t,x_t)$, wenn wir die Entscheidung $x_t=X^\pi(S_t)$ angesichts der Information im Zustand $S_t$ treffen. Unser Ziel ist es, die Politik zu finden, die ein Zielkriterium maximiert, das von den Beiträgen $C(S_t,x_t)$ abhängt, wobei $x_t=X^\pi(S_t)$. Für komplexere Fragestellungen kann $C(S_t,x_t)$ tatsächlich eine Menge von Leistungskennzahlen sein, obwohl wir sie auf eine Weise kombinieren müssen, um zu bestimmen, welche Entscheidung $x_t$ zu wählen ist.

Dies ist eine sehr knappe Beschreibung eines sequentiellen Entscheidungsproblems. Als Nächstes beschreiben wir eine Reihe von Schritten, die im Modellierungsprozess zu befolgen sind.

### Die Schritte im Modellierungsprozess

Es ist möglich, den gesamten Modellierungsprozess in sieben Schritte zu unterteilen (für unsere Zwecke). Diesen Schritten (im Folgenden als „Schritt 0“ bezeichnet) geht eine kurze Zusammenfassung der technischen Komplexität der Anwendung voraus, um den Lesern eine Orientierung zu geben.

**Schritt 0. Kapitelzusammenfassung** – Wir eröffnen jedes Kapitel mit einer Zusammenfassung dessen, was das Kapitel behandeln wird, und in manchen Fällen, wie es sich zum Material anderer Kapitel verhält. Die Zusammenfassungen zeigen an, welche Ansätze zur Modellierung von Unsicherheit und welche Politiken verwendet werden.

**Schritt 1. Die Erzählung** – Dies wird eine Beschreibung des Problems in einfachem Englisch (bzw. Deutsch) sein. Die Erzählung wird nicht alle Informationen liefern, die zur Erstellung eines mathematischen Modells erforderlich sind; sie ist vielmehr ein erster Schritt, der dem Modellierer das Gesamtbild vermitteln soll, ohne sich in Notation zu verlieren.

**Schritt 2. Einrahmung des Problems** – Dies besteht aus der Beantwortung dreier Fragen:

- Was sind die Leistungskennzahlen?
- Welche Arten von Entscheidungen werden getroffen (und in manchen Fällen, welcher Akteur trifft sie)?
- Was sind die Quellen der Unsicherheit, die die Leistung beeinflussen?

**Schritt 3. Identifizierung der Kernelemente des Problems**, mit besonderem Schwerpunkt auf drei Dimensionen jedes sequentiellen Entscheidungsproblems. Diese Elemente werden ohne Mathematik beschrieben:

- Welche Kennzahlen versuchen wir zu beeinflussen? Einzelne Fachgebiete (wie Lieferkettenmanagement, Gesundheitswesen, Energie, Finanzen) werden jeweils durch eine Reihe von Kennzahlen charakterisiert, die mit Begriffen wie Kosten, Erträge, Gewinne, Belohnungen, Gewinne, Verluste, Leistung und Risiko beschrieben werden können.
- Welche Entscheidungen werden getroffen? Die Identifizierung von Entscheidungen ist bei vielen Problemen wie Computerspielen recht einfach, aber wenn wir uns mit einem komplexen Problem befassen, wie etwa der Reaktion auf einen Prozess im öffentlichen Gesundheitswesen, der Reduzierung des CO2-Fußabdrucks oder der Verwaltung einer Lieferkette, kann die Identifizierung aller Entscheidungen recht anspruchsvoll sein.
- Was sind die verschiedenen Quellen der Unsicherheit? Worüber sind wir unsicher, bevor wir beginnen? Welche Information trifft exogen mit der Zeit ein (das heißt, sie trifft ein, nachdem wir eine Entscheidung getroffen haben)? Tabelle 1.2 veranschaulicht verschiedene Quellen der Unsicherheit für ein Modell der Verteilung von COVID-Impfstoffen (siehe RLSO, Kapitel 10, für eine Darstellung von 12 Klassen der Unsicherheit).

Wir bezeichnen den Prozess der Beantwortung dieser drei Fragen als *Einrahmung des Problems*.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Art der Unsicherheit</th><th>Beschreibung</th></tr></thead>
<tbody>
<tr><td>1) Beobachtungsfehler</td><td>Beobachtung von Personen mit Symptomen; Fehler bei der Einordnung von Personen mit Symptomen als an COVID erkrankt</td></tr>
<tr><td>2) Exogene Unsicherheit</td><td>Meldungen neuer Fälle, Todesfälle; Verfügbarkeit von Intensivbetten; tatsächliche Produktion von Impfstoffen</td></tr>
<tr><td>3) Prognostische Unsicherheit</td><td>Krankenhauseinweisungen; zukünftige Wirksamkeit von Impfstoffen; Reaktion der Bevölkerung auf Impfstoffe</td></tr>
<tr><td>4) Inferenzielle Unsicherheit</td><td>Schätzungen der Infektionsraten; Schätzungen der Wirksamkeit von Impfstoffen</td></tr>
<tr><td>5) Experimentelle Unsicherheit</td><td>Wirksamkeit eines Medikaments in einer klinischen Studie; Anzahl der geimpften Personen</td></tr>
<tr><td>6) Modellunsicherheit</td><td>Übertragungsraten der Krankheit; geografische Ausbreitung von Infektionen</td></tr>
<tr><td>7) Übergangsunsicherheit</td><td>Zugänge/Abgänge bei Impfstoffbeständen</td></tr>
<tr><td>8) Kontrollunsicherheit</td><td>Welche Bevölkerungsgruppen geimpft wurden; Zuteilung von Impfstoffen</td></tr>
<tr><td>9) Implementierungsunsicherheit</td><td>Versäumte Impfungen</td></tr>
<tr><td>10) Kommunikationsfehler</td><td>Meldefehler aus dem Feld; Versäumnis, über den Impftermin zu benachrichtigen</td></tr>
<tr><td>11) Zielunsicherheit</td><td>Uneinigkeit darüber, wer geimpft werden soll</td></tr>
<tr><td>12) Umgebungsunsicherheit</td><td>Ob/wann ein Impfstoff zugelassen wird; Zuteilung von Impfstoffen an verschiedene Bundesstaaten, Länder</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 1.2.</span> Veranschaulichung verschiedener Arten von Unsicherheit, die bei der Impfreaktion auf die COVID-Pandemie auftreten.</p>
</div>

**Schritt 4. Das mathematische Modell** – Hier bauen wir auf den ersten drei Elementen aus Schritt 2 auf, müssen aber nun ein mathematisches Modell erstellen, das aus fünf Dimensionen besteht, die auf jedes sequentielle Entscheidungsproblem zutreffen:

- **Zustandsvariablen $S_t$** – Die Zustandsvariable erfasst alles, was man zum Zeitpunkt $t$ wissen muss, um zum Zeitpunkt $t$ eine Entscheidung zu treffen, Kosten und Nebenbedingungen zu berechnen und, falls nötig, seinen Weg zum Zeitpunkt $t+1$ zu simulieren. Zustandsvariablen können Informationen über physische Ressourcen (Bestände oder den Standort eines Fahrzeugs, die über Nebenbedingungen in das Problem eingehen), andere Informationen (wie Kosten oder Preise, die in die Zielfunktion eingehen) sowie Überzeugungen (Beliefs) über Größen und Parameter, die wir nicht genau kennen (wie Prognosen oder Schätzungen, wie ein Patient auf ein Medikament reagieren würde), enthalten.
- **Entscheidungsvariablen $x_t$** – Diese beschreiben, wie wir unser System gestalten oder steuern werden. Entscheidungen müssen Nebenbedingungen erfüllen, die wir als $x_t \in \Xcal$ schreiben, wobei $\Xcal$ eine Menge diskreter Wahlmöglichkeiten oder eine Menge linearer Gleichungen sein könnte. Entscheidungen werden durch *Politiken* bestimmt, die Funktionen (oder Regeln) sind, die wir mit $X^\pi(S_t)$ bezeichnen und die $x_t$ in Abhängigkeit davon bestimmen, was in der Zustandsvariable enthalten ist. Politiken können sehr einfach sein (billig kaufen, teuer verkaufen) oder recht komplex.

  Der Index $\pi$ trägt Information über die Art der Funktion, die zur Entscheidungsfindung verwendet wird, sowie über etwaige einstellbare Parameter. Sei $f\in\Fcal$ die Struktur der Funktion, $\Fcal$ die Menge der möglichen Funktionen, und sei $\theta\in\Theta^f$ etwaige einstellbare Parameter für die Funktion $f$. Unsere Politik würde dann als $\pi = (f,\theta)$ dargestellt. Wir werden die Politik oft als $X^\pi(S_t\vert \theta)$ schreiben, um die Abhängigkeit von einstellbaren Parametern anzuzeigen.

  Wir kommen später in diesem Kapitel und im gesamten Buch ausführlich darauf zurück. Jedes der im Buch angeführten Beispiele wurde ausgewählt, um bestimmte Arten von Politiken zu veranschaulichen.
- **Exogene Information $W_{t+1}$** – Dies ist neue Information, die eintrifft, nachdem wir die Entscheidung $x_t$ getroffen haben (aber bevor wir $x_{t+1}$ entscheiden), etwa wie viel wir verkaufen, nachdem wir einen Preis festgelegt haben, oder die Zeit, um den gewählten Pfad zu vollenden. Wenn wir zum Zeitpunkt $t$ eine Entscheidung treffen, ist die Information in $W_{t+1}$ unbekannt, sodass wir sie beim Wählen von $x_t$ als Zufallsvariable behandeln.
- **Die Übergangsfunktion $S^M(S_t,x_t,W_{t+1})$** – Dies sind die Gleichungen, die beschreiben, wie sich die Zustandsvariablen über die Zeit entwickeln. Bei vielen realen Problemen erfassen Übergangsfunktionen die gesamte Dynamik des Problems und können recht komplex sein. In manchen Fällen kennen wir nicht einmal die Gleichungen und müssen uns auf die Zustandsvariablen verlassen, die wir beobachten können. Wir schreiben die Entwicklung der Zustandsvariablen $S_t$ mithilfe unserer Übergangsfunktion als

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}),
$$

  wobei $S^M(\cdot)$ als Zustands- (oder System-) Übergangsmodell bekannt ist (daher das $M$ im Hochindex). Die Übergangsfunktion beschreibt, wie sich jedes Element der Zustandsvariable angesichts der Entscheidungen $x_t$ und der exogenen Information $W_{t+1}$ verändert. Bei komplexen Problemen kann die Umsetzung der Übergangsfunktion Tausende von Codezeilen erfordern.
- **Die Zielfunktion** – Diese erfasst die Leistungskennzahlen, die wir zur Bewertung unserer Leistung verwenden, und bildet die Grundlage für die Suche über Politiken. Wir lassen $C(S_t,x_t)$ den Beitrag (bei Maximierung) oder die Kosten (bei Minimierung) der Entscheidung $x_t$ bezeichnen, welche von der Information in $S_t$ abhängen können. In manchen Fällen ist es natürlicher, die einperiodische Beitragsfunktion als $C(S_t,x_t,W_{t+1})$ zu schreiben, die Beitragsfunktion ausgewertet am Ende des Zeitintervalls $(t,t+1)$, nachdem $W_{t+1}$ beobachtet wurde. Zum Beispiel könnten wir eine Bestellung über $x_t$ aufgeben, die sofort eintrifft, um die unsichere Nachfrage in $W_{t+1}$ zu erfüllen.

  Unser Ziel ist es, die beste Politik $X^\pi(S_t)$ zu finden, um ein bestimmtes Kriterium zu optimieren, wie etwa:
    - Maximierung der erwarteten Summe der Beiträge über einen bestimmten Horizont.
    - Maximierung der erwarteten Leistung eines finalen Designs, das wir über eine Reihe von Experimenten oder Beobachtungen gelernt haben.
    - Minimierung des mit einem finalen Design verbundenen Risikos.

  Unsere gebräuchlichste Art, die Zielfunktion zu schreiben, ist

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\},\label{eq:baseobjectivefunction}
\end{align}
$$

  wobei „$\E$“ als *Erwartungswertoperator* bezeichnet wird, was bedeutet, dass ein Mittelwert über alles Zufällige gebildet wird, was ungewisse Information im Anfangszustand $S_0$ sowie den exogenen Informationsprozess $W_1, \ldots, W_T$ einschließen kann. Es ist üblich, den Erwartungswertoperator zu schreiben, aber wir können ihn nie tatsächlich berechnen. Später zeigen wir, wie man ihn approximiert, indem man eine Reihe von Simulationen durchführt und einen Mittelwert bildet, oder indem man einen Prozess in der Praxis beobachtet.

Bei der Interpretation des Erwartungswertoperators „$\E$“ in Gleichung $\eqref{eq:baseobjectivefunction}$ ist Vorsicht geboten. Was dieser Operator wörtlich bedeutet, ist, „einen Mittelwert über alles zu bilden, was ungewiss ist“. Der offensichtlichste Teil der Unsicherheit ist der exogene Informationsprozess $W_1, W_2, \ldots, W_t, \ldots, W_T$.

Der Übergang vom realen Problem (geleitet durch die Erzählung) zu den Elementen des mathematischen Modells ist wohl der schwierigste Schritt, da er häufig das Einholen von Informationen aus einer nicht-technischen Quelle erfordert.

Wir stellen fest, dass wir das gesamte Modell präsentiert haben, ohne festzulegen, wie wir Entscheidungen treffen, was durch die Politik $X^\pi(S_t)$ repräsentiert wird. Wir nennen dies „*erst modellieren, dann lösen*“, und es stellt einen bedeutenden Bruch mit der umfangreichen Literatur dar, die sich mit sequentiellen Entscheidungsproblemen befasst. Es ist schwer zu vermitteln, wie wichtig es ist, sequentielle Entscheidungsprobleme auf diese Weise anzugehen.

**Schritt 5. Das Unsicherheitsmodell** – Hier geht es darum, wie wir die verschiedenen Arten von Unsicherheit modellieren. Es gibt zwei Möglichkeiten, Unsicherheit in unser Modell einzuführen:

1. Durch den Anfangszustand $S_0$, der eine Wahrscheinlichkeitsverteilung für unsichere Parameter angeben könnte, etwa wie ein Patient auf ein Medikament reagieren könnte oder wie der Markt auf einen Preis reagieren könnte.
2. Durch den exogenen Informationsprozess $W_1, \ldots, W_T$.

Wir haben drei Möglichkeiten, den exogenen Informationsprozess zu modellieren:

- Ein mathematisches Modell von $W_1, W_2, \ldots, W_T$ erstellen.
- Beobachtungen aus der Vergangenheit verwenden, etwa vergangene Preise, Verkäufe oder Wetterereignisse.
- Das System in der Praxis betreiben und $W_t$ beobachten, während sie geschehen.

**Schritt 6. Entwurf von Politiken** – Politiken sind Funktionen, daher müssen wir nach der besten Funktion suchen. (Ja, Politiken sind Funktionen zur Auswahl der besten Entscheidung, aber die Wahl der Politik selbst ist auch eine Entscheidung!) Dies tun wir, indem wir zwei Kernstrategien für den Entwurf von Politiken identifizieren:

- Suche über eine Familie von Funktionen, um diejenige zu finden, die im Zeitverlauf im Durchschnitt am besten funktioniert.
- Erstellung einer Politik durch Schätzung der unmittelbaren Kosten oder des unmittelbaren Beitrags einer Entscheidung $x_t$, zuzüglich einer Approximation zukünftiger Kosten oder Beiträge, und anschließendes Auffinden der Wahl $x_t$, die die Summe aus aktuellen und zukünftigen Kosten oder Beiträgen optimiert. Google Maps entscheidet, ob links oder rechts abgebogen wird, indem über die Zeit optimiert wird, die zum Durchqueren der nächsten Verbindung im Netzwerk erforderlich ist, zuzüglich der verbleibenden Zeit bis zum Ziel. Eine Bestandsentscheidung könnte über die Kosten einer Bestellung zuzüglich des geschätzten Werts der Bevorratung einer bestimmten Menge für die Zukunft optimieren.

Wir werden viel expliziter darlegen, wie man diese Politiken identifiziert. Ein späterer Abschnitt beschreibt vier Klassen von Politiken, die *jede* Methode zur Entscheidungsfindung umfassen (dies sind Metaklassen).

**Schritt 7. Bewertung von Politiken** – Die beste Politik zu finden bedeutet, Politiken zu bewerten, um festzustellen, welche die beste ist. Es gibt zwei Möglichkeiten, eine Politik zu bewerten:

- Testen der Politik in einem Computersimulator. Dies erfordert die Programmierung aller Gleichungen im Zustandsübergangsmodell $S^M(S_t,x_t,W_{t+1})$, die zur Aktualisierung der Zustandsvariable $S_t$ erforderlich sind. Es bedeutet auch, in der Lage zu sein, Stichproben von $W_{t+1}$ zu erzeugen, was oft der subtilste Aspekt eines Simulators ist.
- Beobachtung, wie die Politik in der Praxis funktioniert.

Simulatoren können komplex und schwierig zu erstellen sein und unterliegen weiterhin Modellierungsapproximationen. Aus diesem Grund erfordert die überwiegende Mehrheit der in der Praxis auftretenden Probleme Tests im Feld, was langsam ist (es dauert einen Tag, um einen Tag zu simulieren) und erfordert, mit den Ergebnissen der Experimente zu leben.

Der einzige Weg, sich mit einem mathematischen Modell vertraut zu machen, besteht darin, es anhand eines vertrauten Beispiels illustriert zu sehen. Wir beginnen mit einem universellen Problem, dem wir alle im Alltag begegnen: der Bestandsverwaltung.

## Einige Bestandsprobleme

Wir werden unser Modellierungsrahmenwerk anhand zweier Varianten eines klassischen Bestandsproblems veranschaulichen, das häufig als Anwendung zur Illustration bestimmter Methoden zur Lösung sequentieller Entscheidungsprobleme verwendet wird. Wir beginnen mit einem einfachen Bestandsbeispiel, das die Kernelemente unseres Modellierungsrahmenwerks vermittelt, uns aber erlaubt, viele der Komplexitäten zu ignorieren, die wir im weiteren Verlauf des Buches erkunden werden.

Anschließend werden wir zu einem *etwas* komplizierteren Bestandsproblem übergehen, das es uns ermöglicht, einige Modellierungsprinzipien zu illustrieren. Im gesamten Buch werden wir auch die Idee verwenden, mit einer grundlegenden Version eines Problems zu beginnen und dann Erweiterungen einzuführen, die auf die Arten von Komplikationen hindeuten, die in realen Anwendungen auftreten können.

### Ein einfaches Bestandsproblem

Eines der vertrautesten sequentiellen Entscheidungsprobleme, das wir alle bei jedem Besuch eines Geschäfts erleben, ist ein Bestandsproblem. Wir werden eine einfache Version dieses Problems verwenden, um die sechs Schritte unseres oben vorgestellten Modellierungsprozesses zu illustrieren:

**Schritt 1: Narrativ** – Eine Pizzeria muss entscheiden, wie viele Pfund Wurst sie bei ihrem Lebensmittelhändler bestellt. Das Restaurant muss die Entscheidung am Ende von Tag $t$ treffen und die Bestellung übermitteln, die dann am nächsten Morgen eintrifft, um die morgigen Bestellungen zu erfüllen. Wenn Wurst übrig bleibt, kann sie bis zum nächsten Tag aufbewahrt werden. Die Kosten der Wurst und der Preis, zu dem sie am nächsten Tag verkauft wird, sind im Voraus bekannt, aber die Nachfrage ist es nicht.

**Schritt 2: Die Kernelemente des Problems sind:**

- Metriken – Wir wollen die Gewinne maximieren, die sich aus den Verkäufen von Wurst abzüglich der Kosten für den Einkauf der Wurst ergeben.
- Entscheidungen – Wir müssen entscheiden, wie viel wir am Ende eines Tages bestellen, was zu Beginn des nächsten eintrifft.
- Unsicherheitsquellen – Die einzige Unsicherheitsquelle in diesem einfachen Modell ist die Nachfrage nach Wurst am nächsten Tag.

**Schritt 3: Das mathematische Modell** – Dieses besteht aus fünf Elementen.

**1) Die Zustandsvariable $S_t$** – Wir unterscheiden zwischen der anfänglichen Zustandsvariable $S_0$ und der dynamischen Zustandsvariable $S_t$ für $t > 0$. Die anfängliche Zustandsvariable $S_0$ besteht aus festen Parametern und Anfangswerten von Variablen, die sich im Zeitverlauf ändern, was uns Folgendes liefert

$$
S_0 = (R^{inv}_0, (p, c), (\Dbar, \sigmabar^D)).
$$

Wir haben den Anfangszustand in drei Arten von Variablen unterteilt:

- Anfangswerte des Ressourcenzustands $R^{inv}\_0$.
- Werte konstanter Parameter $c$ und $p$.
- Unser Glaube über die Nachfragen, gegeben durch eine Normalverteilung mit Mittelwert $\Dbar$ und Standardabweichung $\sigmabar^D$.

Die dynamische Zustandsvariable $S_t$ ist unser Bestand, den wir $R^{inv}\_t$ nennen werden. Vorerst ist dies das einzige Element der dynamischen Zustandsvariable, sodass

$$
S_t = R^{inv}_t.
$$

Später werden wir zusätzliche Elemente in unsere Zustandsvariable einführen.

**2) Die Entscheidungsvariable** $x_t$ ist die Menge, die wir zum Zeitpunkt $t$ bestellen, von der wir (vorerst) annehmen, dass sie sofort eintrifft. Wir treffen unsere Entscheidungen mit einer Politik $X^\pi(S_t)$, die wir später entwerfen.

**3) Die exogene Information** ist die zufällige Nachfrage nach unserem Produkt, die wir $\Dhat_{t+1}$ nennen werden, sodass $W_{t+1} = \Dhat_{t+1}$.

**4) Unsere Übergangsfunktion** erfasst, wie sich der Bestand $R_t$ im Zeitverlauf entwickelt, was gegeben ist durch

$$
\begin{align}
R^{inv}_{t+1} = \max\{0, R^{inv}_t+x_t-\Dhat_{t+1}\}. \label{eq:inventoryexampleequation}
\end{align}
$$

**5) Unsere Zielfunktion.** Für unser Bestandsproblem ist es am natürlichsten, den Beitrag einschließlich der Einkaufskosten des Produkts $x_t$ und des Umsatzes aus der Befriedigung der Nachfrage $\Dhat_{t+1}$ zu berechnen, was bedeutet, dass unsere einperiodige Beitragsfunktion geschrieben würde als

$$
C(S_t,x_t,\Dhat_{t+1}) = -cx_t + p \min\{R^{inv}_t+x_t, \Dhat_{t+1}\},
$$

wobei $x_t = X^\pi(S_t)$. Bei einer gegebenen Folge von Nachfragen $\Dhat_1, \ldots, \Dhat_T$ wäre der Wert einer Politik $\Fhat^\pi$

$$
\Fhat^\pi(S_0) = \sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1}).
$$

Unsere Gewinne $\Fhat^\pi(S_0)$ sind zufällig, da sie von einer bestimmten Folge zufälliger Nachfragen $\Dhat_1, \ldots, \Dhat_T$ abhängen. Schließlich mitteln wir über diese zufälligen Nachfragen, indem wir den Erwartungswert bilden:

$$
\begin{align}
F^\pi(S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t),\Dhat_{t+1})\vert S_0\right\}. \label{eq:inventoryobjective}
\end{align}
$$

Hier kann die Konditionierung auf den Anfangszustand $S_0$ so gelesen werden, dass sie besagt: „nimm den Erwartungswert gegeben das, was wir anfänglich wissen." Die Konditionierung auf $S_0$ ist implizit, wann immer wir einen Erwartungswert bilden, und daher lassen viele Autoren sie weg. Wir werden jedoch die Konditionierung auf $S_0$ einbeziehen, um deutlich zu machen, dass sich die Leistung einer Politik ändern kann, wenn sich unsere anfänglichen Inputs (einschließlich Überzeugungen) ändern.

**Schritt 4. Das Unsicherheitsmodell** – Der einfachste Ansatz zur Modellierung von Unsicherheit besteht darin, einfach historische Daten zu verwenden. Das Problem, auf das wir stoßen könnten, ist, dass wir, wenn uns die Wurst ausgeht, möglicherweise nicht die vollständige Nachfrage nach Wurst an diesem Tag beobachten. Wenn wir in der Lage sind, diese verlorene Nachfrage zu erfassen, dann ist dies ein vernünftiger Ansatz.

Eine Alternative besteht darin, ein mathematisches Modell zu erstellen. Wir könnten annehmen, dass unsere Nachfrage normalverteilt ist mit einem Mittelwert $\Dbar$ und einer Standardabweichung $\sigmabar^D$. Wenn wir annehmen, dass beide bekannt sind, können wir unsere Nachfrage schreiben als

$$
\Dhat_{t+1} \sim N(\Dbar,(\sigmabar^D)^2),
$$

und Pakete nutzen, die aus der Normalverteilung Stichproben ziehen können (in Excel heißt dies zum Beispiel `Norm.inv`$(Rand(),\Dbar,\sigmabar)$), um eine zufällige Beobachtung mit Mittelwert $\Dbar$ und Standardabweichung $\sigmabar$ zu erzeugen.

Mit diesem Modell können wir eine Menge von Nachfragen $(\Dhat_1, \Dhat_2, \ldots, \Dhat_T)$ erstellen. Dann können wir dies $N$ Mal wiederholen, um $N$ Folgen von $T$ Nachfragen zu erstellen, was uns die Folge $(\Dhat^n_1, \Dhat^n_2, \ldots, \Dhat^n_T)$ für $n=1, \ldots, N$ liefert, die wir benötigen, um den Wert der Politik zu schätzen (wir nutzen dies unten in Schritt 6).

**Schritt 5. Entwurf von Politiken** – Als Nächstes müssen wir eine Methode zur Bestimmung unserer Bestellungen entwerfen. Eine häufig verwendete Strategie für Bestandsprobleme ist als „Order-up-to"-Politik bekannt, die wie folgt aussieht

$$
\begin{align}
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases} \label{eq:introorderupto}
\end{align}
$$

wobei $\theta = (\theta^{min},\theta^{max})$ eine Menge von Parametern ist, die abgestimmt werden müssen. Sie wird „Order-up-to" genannt, da wir eine Bestellung aufgeben, um den Bestand „bis auf" die Obergrenze $\theta^{max}$ zu bringen.

**Schritt 6. Bewertung von Politiken** – Es gibt eine Vielzahl von Strategien, die wir verwenden könnten. In der Praxis können wir den Erwartungswert in der Zielfunktion in Gleichung $\eqref{eq:inventoryobjective}$ nicht berechnen, sodass wir eine Reihe von Stichproben von Nachfragen nehmen. Sei $\Dhat^n_1, \ldots, \Dhat^n_T$ eine Stichprobe von Nachfragen über $t=1, \ldots, T$, und nehmen wir an, dass wir $N$ solcher Stichproben erzeugen können. Nun können wir unsere erwarteten Gewinne aus der Politik $X^\pi(S_t)$ schätzen, indem wir über die Stichproben für $n=1, \ldots, N$ mitteln, was berechnet wird mittels

$$
\Fbar^\pi(\theta\vert S_0) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

In einfachen Worten simulieren wir die Politik $X^\pi(S_t\vert \theta)$ $N$ Mal unter Verwendung der simulierten (oder aus der Historie beobachteten) Stichproben von Nachfragen $\Dhat^n_1, \ldots, \Dhat^n_T$ und mitteln dann die Leistung, um $\Fbar^\pi(\theta\vert S_0)$ zu erhalten. Wir stehen dann vor dem Problem, den besten Wert von $\theta$ zu finden. Eine einfache Strategie wäre, $K$ mögliche Werte $\theta_1, \ldots, \theta_K$ zu erzeugen, jeden zu simulieren, um $\Fbar^\pi(\theta_k\vert S_0)$ für jedes $k$ zu finden, und dann den Wert von $\theta_k$ auszuwählen, der am besten funktioniert. Dies ist keine optimale Strategie, bietet aber einen einfachen, praktischen Ausgangspunkt.

### Ein etwas komplizierteres Problem

Das obige einfache Bestandsproblem ist eine klassische Einstellung zur Demonstration einer bestimmten Methode zur Lösung sequentieller Entscheidungsprobleme, die als dynamische Programmierung bekannt ist und von einer einfachen Zustandsvariable abhängt, die a) diskret ist und b) nicht zu viele mögliche Werte hat. In unserem etwas komplizierteren Bestandsproblem werden wir drei verschiedene Varianten von Zustandsvariablen illustrieren, die für eine populäre Methode zur Lösung sequentieller Entscheidungsprobleme eine ernsthafte Komplikation darstellen würden, aber keine Auswirkung auf die Politik haben, die wir gewählt haben.

**Schritt 1: Narrativ** – Wir haben wieder unsere Pizzeria, die Wurst bestellen muss, aber wir werden zulassen, dass der Preis, den wir für Wurst zahlen, von Tag zu Tag variiert, wobei wir annehmen, dass der Preis an einem Tag unabhängig vom Preis am Vortag ist. Dann werden wir auch annehmen, dass, während die Nachfrage nach Wurst morgen zufällig ist, uns eine Prognose der morgigen Nachfrage gegeben wird, die zwar nicht perfekt ist, aber besser ist, als keine Prognose zu haben. Ansonsten ist alles an unserem komplizierteren Problem gleich wie zuvor.

**Schritt 2: Kernelemente** – Diese sind:

- Metriken – Wir wollen die Gewinne maximieren, die sich aus den Verkäufen von Wurst abzüglich der Kosten für den Einkauf der Wurst ergeben, wobei die Kosten von Tag zu Tag variieren.
- Entscheidungen – Wie bei unserem einfacheren Bestandsproblem müssen wir entscheiden, wie viel wir am Ende eines Tages bestellen, was zu Beginn des nächsten eintrifft.
- Unsicherheitsquellen – Es gibt nun drei Unsicherheitsquellen: die Differenz zwischen der tatsächlichen Nachfrage und der Prognose, die Entwicklung der Prognosen von einem Tag zum nächsten und den Preis, den wir für die Wurst zahlen.

**Schritt 3: Mathematisches Modell** – Wir haben immer noch dieselben fünf Elemente, aber nun ist das Problem etwas reichhaltiger:

**1)** Um die Zustandsvariable zu konstruieren, müssen wir die Informationen auflisten (insbesondere Informationen, die sich im Zeitverlauf entwickeln), die in drei verschiedenen Teilen des Modells benötigt werden: (1) die Zielfunktion, (2) die Politik zur Entscheidungsfindung (die die Nebenbedingungen einschließt) und (3) die Übergangsfunktion. Natürlich haben wir noch keine dieser Funktionen eingeführt, sodass Sie vorausblättern und überprüfen müssen, ob unsere Zustandsvariable alle Informationen enthält, die zur Berechnung jeder dieser Funktionen benötigt werden. Betrachten Sie dies als ein Wörterbuch der Informationen, die wir benötigen werden.

Wir beginnen mit dem Anfangszustand $S_0$, der aus konstanten Parametern und Anfangswerten von Größen und Parametern besteht, die sich im Zeitverlauf ändern. Diese sind:

- Anfangsbestand – Wir beginnen mit einem Anfangsbestand $R_0$.
- Anfängliche Einkaufskosten – $c_0$.
- Preis – Wir nehmen an, dass wir unsere Wurst zu einem festen Preis $p$ verkaufen.
- Anfängliche Prognose – Wir nehmen an, dass unsere erste Prognose $f^D_{0,1}$ gegeben ist, wobei $f^D_{0,1}$ die zum Zeitpunkt 0 bekannte Prognose für die Nachfrage zum Zeitpunkt 1 ist.
- Anfängliche Schätzung der Standardabweichung der Nachfrage – $\sigmabar^D_0$.
- Anfängliche Schätzung der Standardabweichung der Prognose – $\sigmabar^f_0$.

Das bedeutet, dass unsere anfängliche Zustandsvariable ist

$$
S_0 = (R_0,c_0, p, f^D_{0,1}, \sigmabar^D_0, \sigmabar^f_0).
$$

Wir haben dann die Informationen, die sich im Zeitverlauf entwickeln und unsere dynamische Zustandsvariable $S_t$ ausmachen:

- Aktueller Bestand $R^{inv}\_t$ – Der Bestand zu Beginn des Zeitintervalls $(t,t+1)$.
- Einkaufskosten $c_t$ – Dies sind die Kosten der zum Zeitpunkt $t$ gekauften Wurst, die uns zum Zeitpunkt $t$ mitgeteilt werden.
- Nachfrageprognose $f^D_{t,t+1}$ – Dies ist die Prognose von $\Dhat_{t+1}$ gegeben, was wir zum Zeitpunkt $t$ wissen.
- Aktuelle Schätzung der Standardabweichung der Nachfrage – $\sigmabar^D_t$.
- Aktuelle Schätzung der Standardabweichung der Prognose – $\sigmabar^f_t$.

Unsere dynamische Zustandsvariable ist dann gegeben durch

$$
S_t = (R^{inv}_t, c_t, f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t).
$$

**2)** Die Entscheidungsvariable $x_t$ ist die Menge, die wir zum Zeitpunkt $t$ bestellen, wobei wir (vorerst) annehmen, dass sie sofort eintrifft. Wir treffen unsere Entscheidungen mit einer Politik $X^\pi(S_t)$, die wir später gestalten.

**3)** Die exogene Information besteht nun aus:

- Einkaufskosten $\chat_{t+1}$ – Dies sind die Einkaufskosten für Wurst am Tag $t+1$, die exogen festgelegt werden.
- Prognosen – In jeder Zeitperiode erhalten wir eine neue Prognose. Sei $\varepsilon^f_{t+1}$ die Änderung der Prognose zwischen Zeitpunkt $t$ und $t+1$.
- Nachfragen – Schließlich nehmen wir an, dass die tatsächliche Nachfrage eine zufällige Abweichung von der Prognose ist, die wir schreiben könnten als

$$
\Dhat_{t+1} = f^D_{t,t+1} + \varepsilon^D_{t+1}.
$$

Unsere vollständige Menge exogener Informationsvariablen kann nun geschrieben werden als

$$
W_{t+1} = \big(\chat_{t+1}, \varepsilon^f_{t+1}, \varepsilon^D_{t+1}\big).
$$

**4) Übergangsfunktion** – Diese legt fest, wie sich jede der (dynamischen) Zustandsvariablen $S_t$ über die Zeit entwickelt. Wir aktualisieren unseren Bestand mit:

$$
\begin{align}
R^{inv}_{t+1}       &= \max\{0, R^{inv}_t + x_t - \Dhat_{t+1}\}. \label{eq:introcomplexinventorytransition1}
\end{align}
$$

Die Nachfrage ist die prognostizierte Nachfrage plus die Abweichung $\varepsilon^D_{t+1}$ von der Prognose, was uns die Gleichung liefert:

$$
\begin{align}
\Dhat_{t+1}   &= f^D_{t,t+1} + \varepsilon^D_{t+1}. \label{eq:introcomplexinventorytransition2}
\end{align}
$$

Wir nehmen an, dass unsere Prognose aktualisiert wird mit

$$
\begin{align}
f^D_{t+1,t+2} &= f^D_{t,t+1} + \varepsilon^f_{t+1}. \label{eq:introcomplexinventorytransition3}
\end{align}
$$

Als Nächstes werden wir die Varianz der Nachfrage und der Nachfrageprognose adaptiv schätzen:

$$
\begin{align}
(\sigmabar^D_{t+1})^2 &= (1-\alpha)(\sigmabar^D_t)^2 + \alpha (f^D_{t,t+1} - \Dhat_{t+1})^2, \label{eq:introcomplexinventorytransition4}\\
(\sigmabar^f_{t+1})^2 &= (1-\alpha)(\sigmabar^f_t)^2 + \alpha (f^D_{t,t+1} - f^D_{t+1,t+2})^2, \label{eq:introcomplexinventorytransition5}
\end{align}
$$

wobei $0 < \alpha < 1$ ein Glättungsfaktor ist.

Schließlich aktualisieren wir die Kosten $c_{t+1}$ mit den "beobachteten Kosten" $\chat_{t+1}$, die wir schlicht schreiben als

$$
\begin{align}
c_{t+1} = \chat_{t+1}.\label{eq:introcomplexinventorytransition6}
\end{align}
$$

Gleichung $\eqref{eq:introcomplexinventorytransition6}$ ist ein Beispiel für eine Zustandsvariable, die wir beobachten, statt sie zu berechnen, wie wir es beim Bestand $R^{inv}\_t$ in $\eqref{eq:introcomplexinventorytransition1}$ getan haben. Gleichung $\eqref{eq:introcomplexinventorytransition1}$ wird manchmal als "modellbasiert" bezeichnet, da sie die Physik widerspiegelt, wie Bestände aktualisiert werden, während Gleichung $\eqref{eq:introcomplexinventorytransition6}$ als "modellfrei" bezeichnet wird, da wir keinen Versuch unternehmen, den zugrunde liegenden Prozess zu modellieren, der die Kostenänderung erzeugt.

Unsere Übergangsfunktion $S_{t+1} = S^M(S_t,x_t,W_{t+1})$ besteht aus den Gleichungen $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$.

**5)** Schließlich würde unsere Einperioden-Beitragsfunktion nun geschrieben werden als

$$
C(S_t,x_t,\Dhat_{t+1}) = -c_tx_t + p \min\{R_t+x_t, \Dhat_{t+1}\},
$$

wobei der einzige Unterschied zum einfacheren Bestandsproblem darin besteht, dass die Kosten $c$ nun zeitabhängig sind $c_t$. Wir brechen mit unserer Konvention, den Beitrag als $C(S_t,x_t)$ zu schreiben, und lassen ihn Einnahmen aus den Nachfragen $\Dhat_{t+1}$ einbeziehen.

Wir formulieren nun unsere Zielfunktion formal als

$$
\begin{align}
\max_{\pi=(f,\theta)} \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat_{t+1})\vert S_0\right\}. \label{eq:introcomplexinventoryobjective}
\end{align}
$$

Die Optimierung $\max_\pi$ bedeutet, dass wir über alle möglichen Politiken suchen, die durch $(f,\theta)$ repräsentiert werden, was buchstäblich bedeutet, über alle verschiedenen Funktionen zu suchen, die wir zur Entscheidungsfindung nutzen könnten. Die Beispiele in diesem Buch werden zeigen, *wie* wir über Funktionen suchen werden.

Erinnern Sie sich, dass wir oben festgestellt haben, dass der Index $\pi$ Information über den Typ der Funktion $f\in\Fcal$ trägt, sowie über beliebige einstellbare Parameter $\theta\in\Theta^f$. In der Praxis erfolgt die Suche über die Funktionstypen $f\in\Fcal$ meist ad hoc (ein sachkundiger Analyst wählt Funktionen aus, die für ein Problem sinnvoll sind), während ein Computeralgorithmus die Suche nach dem besten Wert von $\theta\in\Theta^f$ durchführt.

**Schritt 4. Das Unsicherheitsmodell** – Wir nehmen an, dass die exogenen Änderungen $\varepsilon^D_{t+1}$ und $\varepsilon^f_{t+1}$ durch Normalverteilungen mit Mittelwert 0 und Varianzen $(\sigmabar^D_t)^2$ und $(\sigmabar^f_t)^2$ beschrieben werden, was wir schreiben als

$$
\varepsilon^D_t \sim N(0, (\sigmabar^D_t)^2), \quad \varepsilon^f_t \sim N(0, (\sigmabar^f_t)^2).
$$

Unsicherheitsmodelle können recht komplex werden, aber dies soll als Illustration dienen.

**Schritt 5. Gestaltung von Politiken** – Als Nächstes müssen wir eine Methode zur Bestimmung unserer Bestellungen entwerfen. Anstelle der Order-up-to-Politik unseres einfacheren Modells schlagen wir die Idee vor, so viel zu bestellen, dass die erwartete Nachfrage für morgen gedeckt wird, mit einer Anpassung. Wir könnten dies schreiben als

$$
\begin{align}
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta. \label{eq:adjustedforecastpolicy}
\end{align}
$$

Hätten wir eine perfekte Prognose, müssten wir lediglich $f^D_{t,t+1}$ (unsere Prognose von $\Dhat_{t+1}$) minus den vorhandenen Bestand bestellen. Aufgrund der Unsicherheit fügen wir jedoch eine Anpassung $\theta$ hinzu, damit wir einen Puffer haben, um Fehlbestände zu vermeiden.

**Schritt 6. Bewertung von Politiken** – Diesmal müssen wir Stichproben aller Zufallsvariablen in der Sequenz $W_1, W_2, \ldots, W_T$ erzeugen. Wieder könnten wir $N$ Stichproben der gesamten Sequenz erzeugen, sodass wir die Leistung einer Politik schätzen können mit

$$
\Fbar^\pi(\theta) = \frac{1}{N} \sum_{n=1}^N \sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta),\Dhat^n_{t+1}).
$$

Wir stehen erneut vor der Aufgabe, den besten Wert von $\theta$ zu finden, doch dieser Herausforderung wenden wir uns später zu.

## Der universelle Modellierungsrahmen

Wir sind nun bereit, die Elemente des universellen Modellierungsrahmens (UMF) genauer zu beschreiben. Wir stellen fest, dass der UMF *jedes* sequentielle Entscheidungsproblem modellieren kann. Diese recht weitreichende Behauptung wird deutlich werden, sobald sich die Elemente entfalten, da wir lediglich Notation auf die allgemeine Formulierung eines sequentiellen Entscheidungsproblems anwenden.

### Die fünf Elemente des UMF

Der UMF besteht aus den folgenden Elementen:

1. Den Zustandsvariablen $S_t$.
2. Den Entscheidungsvariablen $x_t$.
3. Dem exogenen Informationsprozess $W_t$.
4. Dem Zustandsübergangsmodell $S^M(S_t,x_t,W_{t+1})$.
5. Der Zielfunktion.

Wir beschreiben diese im Folgenden genauer:

**Zustandsvariablen** – Der Zustand $S_t$ des Systems zum Zeitpunkt $t$ enthält alle notwendigen und hinreichenden Informationen, um unser System von Zeitpunkt $t$ an zu modellieren. Genauer gesagt besteht diese Information aus:

- a) Der Information, die zum Zeitpunkt $t$ zur Entscheidungsfindung benötigt wird.
- b) Der Information, die zum Zeitpunkt $t$ zur Berechnung der Leistungskennzahlen benötigt wird.
- c) Jeder Information, die jetzt benötigt wird, um (a) und (b) in der Zukunft zu berechnen.

Es gibt drei Arten von Information in $S_t$:

- Der physische Zustand, $R_t$, erfasst physische Größen wie Bestände, Personen, verfügbare Maschinen, Anlagen, Wasser, Medikamente, Energie und Geld (in seinen verschiedenen Formen). $R_t$ umfasst auch Kundenanfragen nach Produkten oder Dienstleistungen. In vielen Anwendungen beschreibt $R_t$ die verwaltete Ressource, und ein recht häufiger Fehler ist es, "Zustand" mit "physischem Zustand" gleichzusetzen.
- Der Informationszustand, $I_t$, welcher die verwendeten Funktionen (sofern eine Wahl besteht) und beliebige einstellbare Parameter enthält. $I_t$ könnte festlegen, wie wir Nachfragen prognostizieren, und die Parameter, die zur Anpassung der Prognose verwendet werden, zusätzlich zu jeglichen anderen Parametern, die die Entwicklung des Systems steuern.
- Der Belief-Zustand, $B_t$, welcher Schätzungen oder Überzeugungen über Größen und Parameter enthält, die nicht genau bekannt sind. So könnte $B_t$ den geschätzten Mittelwert und die Varianz einer Normalverteilung erfassen (wie bei unserer Nachfrageprognose oben). Alternativ könnte es ein Vektor von Wahrscheinlichkeiten sein, die sich über die Zeit entwickeln.

Der physische Zustand $R_t$ könnte der Geldbetrag auf einem Konto sein, während $I_t$ der aktuelle Zustand der Aktien- und Anleihemärkte sein könnte. Wenn wir uns über ein dynamisches Netzwerk bewegen, könnte $R_t$ unser Standort im Netzwerk sein, während $I_t$ das sein könnte, was wir über die Reisezeiten auf jedem Streckenabschnitt wissen. Wenn wir einen Plan aufstellen und dann Abweichungen vom Plan bestrafen möchten, würde der Plan über $I_t$ in die Zustandsvariable einbezogen.

Zustandsvariablen sind typischerweise nicht offensichtlich. Sie entstehen während des Modellierungsprozesses, statt etwas zu sein, das man einfach sofort aufschreiben kann. Nur weil wir es zuerst aufschreiben, heißt das nicht, dass Sie immer sofort alle Elemente der Zustandsvariable auflisten können. Am Ende ist dies jedoch der Ort, an dem Sie alle Informationen speichern, die Sie benötigen, um Ihr System von Zeitpunkt $t$ an zu modellieren.

**Entscheidungsvariablen** – Verschiedene Communities verwenden unterschiedliche Notationen für Entscheidungen, etwa $a_t$ für eine (typischerweise diskrete) Aktion oder $u_t$ für eine (typischerweise kontinuierliche) Steuerung im Ingenieurwesen. Wir verwenden $x_t$ als unseren Standard, da es von der mathematischen Programmierungsgemeinschaft weit verbreitet genutzt wird.

Entscheidungsvariablen kommen in verschiedenen Varianten:

- Binär (z. B. zur Modellierung, ob ein Vermögenswert verkauft werden soll oder nicht, oder für A/B-Tests unterschiedlicher Webdesigns).
- Diskret (z. B. Wahl des Medikaments, welches Produkt beworben werden soll).
- Kontinuierlich skalar (Preise, Temperaturen, Konzentrationen).
- Vektoren (diskret oder kontinuierlich, wie etwa Zuteilungen von Blutkonserven an Krankenhäuser).
- Kategorial (z. B. welche Merkmale in einer Produktwerbung hervorgehoben werden sollen).

Wir stellen fest, dass es Klassen von Algorithmen gibt, die durch die Art der Entscheidungsvariable bestimmt werden.

Wir nehmen an, dass Entscheidungen mit einer Politik getroffen werden, die wir mit $X^\pi(S_t)$ bezeichnen könnten, wenn wir $x_t$ als unsere Entscheidung verwenden. Wir nehmen an, dass eine Entscheidung $x_t = X^\pi(S_t)$ zum Zeitpunkt $t$ zulässig ist, was $x_t \in \Xcal_t$ für eine bestimmte Menge (oder einen Bereich) $\Xcal_t$ bedeutet, die von $S_t$ abhängen kann.

Wir lassen "$\pi$" die Information über den Typ der Funktion $f\in\Fcal$ (zum Beispiel ein lineares Modell mit spezifischen erklärenden Variablen) sowie beliebige einstellbare Parameter $\theta \in \Theta^f$ tragen.

**Exogene Information** – Wir bezeichnen mit $W_{t+1}$ jede neue Information, die zum Zeitpunkt $t+1$ erstmals bekannt wird (das heißt zwischen $t$ und $t+1$), wobei die Informationsquelle außerhalb unseres Systems liegt (deshalb ist sie "exogen"). Bei der Modellierung spezifischer Variablen verwenden wir "Hüte", um exogene Information zu kennzeichnen. So könnte $\Dhat_{t+1}$ die Nachfrage sein, die zwischen $t$ und $t+1$ entsteht, oder wir könnten $\phat_{t+1}$ als die Preisänderung zwischen $t$ und $t+1$ bezeichnen.

Der exogene Informationsprozess kann stationär oder nichtstationär, rein exogen oder zustands- (und möglicherweise aktions-)abhängig sein (wenn wir uns entscheiden, viele Aktien zu verkaufen, könnte dies die Preise nach unten drücken).

Wir lassen $\omega$ einen Stichprobenpfad $W_1, \ldots, W_T$ repräsentieren, der eine Sequenz von Ergebnissen jedes $W_t$ darstellt. Häufig werden wir eine Menge $\Omega$ diskreter Stichproben erzeugen, wobei jede Stichprobe eine bestimmte Sequenz der Ergebnisse unseres $W_t$-Prozesses repräsentiert, die wir schreiben könnten als $W_1(\omega), \ldots, W_T(\omega)$. Wenn wir 20 Stichprobenpfade haben, können wir uns $\omega$ als eine Zahl zwischen 1 und 20 vorstellen, die es uns erlaubt, den Stichprobenpfad nachzuschlagen.

**Übergangsfunktion** – Wir bezeichnen die Übergangsfunktion mit

$$
\begin{align}
S_{t+1} = S^M(S_t,x_t,W_{t+1}), \label{eq:transition}
\end{align}
$$

wobei $S^M(\cdot)$ auch unter Namen wie Zustandsübergangsmodell, Systemmodell, Anlagenmodell (plant model), Anlagengleichung (plant equation), Zustandsgleichung und Transferfunktion bekannt ist.

Gleichung $\eqref{eq:transition}$ ist die klassische Form einer Übergangsfunktion, die die Gleichungen vom Zustand $S_t$ zum Zustand $S_{t+1}$ liefert. Gleichung $\eqref{eq:inventoryexampleequation}$ war die einzige Übergangsgleichung für unser einfaches Bestandsbeispiel, während die Gleichungen $\eqref{eq:introcomplexinventorytransition1}$–$\eqref{eq:introcomplexinventorytransition6}$ die Übergangsfunktion für unser komplizierteres Beispiel bildeten.

Die Übergangsfunktion könnte jede der folgenden Arten von Aktualisierungen erfassen:

- Änderungen physischer Ressourcen, wie das Hinzufügen von Bestand, das Umziehen von Personen oder das Modifizieren von Ausrüstung.
- Aktualisierungen von Information, wie Änderungen von Preisen und Wetter.
- Aktualisierungen unserer Überzeugungen über unsichere Größen oder Parameter.

Die Übergangsfunktion kann eine bekannte Menge von Gleichungen sein oder unbekannt, etwa wenn wir menschliches Verhalten oder die Entwicklung von CO2 in der Atmosphäre beschreiben. Wenn die Gleichungen unbekannt sind, wird das Problem oft als "modellfrei" oder "datengetrieben" beschrieben, was bedeutet, dass wir nur Änderungen einer Variable beobachten können, statt ein physisches Modell zu verwenden. Gleichung $\eqref{eq:introcomplexinventorytransition6}$, bei der wir die Kosten $c_{t+1} = \chat_{t+1}$ "beobachten", ohne eine Vorstellung davon zu haben, wie wir uns von $c_t$ aus entwickelt haben, ist ein Beispiel für einen modellfreien Übergang.

Übergangsfunktionen können linear, kontinuierlich nichtlinear oder Stufenfunktionen sein. Wenn der Zustand $S_t$ einen Belief-Zustand $B_t$ enthält, muss die Übergangsfunktion die Aktualisierungsgleichungen enthalten (wir illustrieren dies später im Buch).

Gegeben eine Politik $X^\pi(S_t)$, einen exogenen Prozess $W_{t+1}$ und eine Übergangsfunktion, können wir unsere Sequenz von Zuständen, Entscheidungen und Informationen schreiben als

$$
(S_0, x_0, W_1, S_1, x_1, W_2, \ldots, x_{T-1},  W_T, S_T).
$$

**Zielfunktionen** – Es gibt eine Reihe von Möglichkeiten, Zielfunktionen zu schreiben. Eine der häufigsten, die wir als Standard verwenden werden, maximiert die gesamten erwarteten Beiträge über einen Horizont $t=0, \ldots, T$

$$
\begin{align}
\max_{\pi=(f,\theta)} F^\pi(S_0) = \E \left\{\sum_{t=0}^T C_t(S_t,X^\pi_t(S_t\vert \theta))\vert S_0\right\}, \label{eq:objectivecumulativereward}
\end{align}
$$

wobei

$$
\begin{align}
S_{t+1} = S^M(S_t,X^\pi_t(S_t),W_{t+1}). \label{eq:basetransition}
\end{align}
$$

Das Modell ist vollständig spezifiziert, wenn wir auch ein Modell des Anfangszustands $S_0$ und ein Modell des exogenen Prozesses $W_1, W_2, \ldots$ haben. Wir schreiben alle exogenen Informationen als

$$
\begin{align}
(S_0, W_1, W_2, \ldots, W_T). \label{eq:basestochasticmodel}
\end{align}
$$

Die Gleichungen $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:basetransition}$ und $\eqref{eq:basestochasticmodel}$ stellen ein Modell eines sequentiellen Entscheidungsproblems dar.

Der Kompaktheit wegen werden wir im weiteren Verlauf $\max_\pi$ verwenden, um eine Suche über die Funktionstypen $f\in\Fcal$ und einstellbare Parameter $\theta\in\Theta^f$ darzustellen.

Gleichung $\eqref{eq:objectivecumulativereward}$ verwendet einen Erwartungswert $\E$, was bedeutet, einen Durchschnitt über alle möglichen Ergebnisse von $W_1, \ldots, W_T$ zu bilden. Dies ist rechnerisch praktisch nie möglich. Stattdessen lassen wir $\omega$ ein einzelnes Ergebnis der Sequenz $W_1, \ldots, W_T$ repräsentieren, das wir schreiben könnten als $W_1(\omega), \ldots, W_T(\omega)$. Nehmen wir an, wir könnten $N$ mögliche Ergebnisse dieser Sequenz erzeugen, und lassen wir $\omega^n$ darstellen, wie wir die $n^{th}$-Sequenz indizieren.

Wenn wir einem Sample-Pfad $\omega$ folgen, würden wir unsere Übergangsfunktion in $\eqref{eq:basetransition}$ umschreiben, indem wir

$$
\begin{align}
S_{t+1}(\omega) = S^M(S_t(\omega),X^\pi_t(S_t(\omega)),W_{t+1}(\omega)). \label{eq:basetransition2}
\end{align}
$$

verwenden.

Wir indizieren jede Variable in Gleichung $\eqref{eq:basetransition2}$ mit $\omega$, um anzuzeigen, dass wir einem einzelnen Sample-Pfad von Werten von $W_t$ folgen.

Wir können nun unser erwartungswertbasiertes Ziel durch einen Durchschnitt ersetzen, den wir schreiben können als

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0) = \frac{1}{N}\sum_{n=1}^N \sum_{t=0}^T C_t(S_t(\omega^n),X^\pi_t(S_t(\omega^n))). \label{eq:objectivecumulativerewardaverage}
\end{align}
$$

Oft arbeiten wir nur mit einem einzelnen Sample-Pfad, möglicherweise aus der Historie. In diesem Fall approximieren wir die Performance der Politik anhand dieses einzelnen Sample-Pfads, was wir schreiben können als

$$
\begin{align}
\max_\pi \Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))). \label{eq:objectivecumulativerewardsample}
\end{align}
$$

Wann immer wir ein Ziel mithilfe eines Erwartungswerts wie in $\eqref{eq:objectivecumulativereward}$ formulieren, sollte man sich vor Augen halten, dass wir in der Praxis eigentlich einen Durchschnitt verwenden würden, wie in $\eqref{eq:objectivecumulativerewardaverage}$, oder eine Stichprobe, wie in $\eqref{eq:objectivecumulativerewardsample}$.

Der Erwartungswert muss möglicherweise auch die Unsicherheit im Ausgangszustand $S_0$ widerspiegeln, die Überzeugungen über unsichere Prognosen oder unsichere Schätzungen über den Krankheitszustand eines Patienten erfassen könnte. In diesem Fall muss der Sample-Pfad $\omega$ Stichproben aus diesen Anfangsverteilungen enthalten.

Es gibt Situationen, in denen es sinnvoller ist, einen Zähler $n$ anstelle der Zeit zu verwenden. In diesem Fall sei $S^n$ der Zustand nach $n$ Beobachtungen (dies können Experimente, Kundenankünfte oder Iterationen eines Algorithmus sein). Wir werden die Zeit $t$ als unseren Standardindex verwenden.

### Die Anfangszustandsvariablen $S_0$

Wir müssen zwischen dem Anfangszustand $S_0$ und den nachfolgenden Zuständen $S_t$ für $t > 0$ unterscheiden:

- **$S_0$** – Der Anfangszustand $S_0$ erfasst i) deterministische Parameter, die sich nie ändern, ii) Anfangswerte von Größen oder Parametern, die sich ändern (möglicherweise durch Entscheidungen), und iii) Überzeugungen über Größen oder Parameter, die wir nicht perfekt kennen (dies könnten die Parameter einer Wahrscheinlichkeitsverteilung sein), etwa wie wir auf einen Impfstoff reagieren oder wie der Markt auf den Preis reagieren wird. Die Überzeugungen können statisch bleiben, oder wir aktualisieren sie, wenn wir aus Beobachtungen lernen.
- **$S_t$** – Dies sind alle Informationen, die wir zum Zeitpunkt $t$ aus der Historie benötigen, um das System ab dem Zeitpunkt $t$ zu modellieren. $S_t$ für $t > 0$ enthält nur Variablen, die sich mit der Zeit ändern, was bedeutet, dass wir zum Zeitpunkt $t$ auch statische Informationen verwenden können, die in $S_0$ enthalten sind.

Wir schreiben die explizite Abhängigkeit der Performance der Politik vom Anfangszustand $S_0$, unabhängig davon, ob wir $F^\pi(S_0)$, $\Fbar^\pi(S_0)$ oder $\Fhat^\pi(\omega\vert S_0)$ verwenden. Obwohl dies offensichtlich sein sollte, wird es oft übersehen. Der Anfangszustand umfasst Elemente wie:

- Anfangswerte der Mengen physischer oder finanzieller Ressourcen $R_0$ – Dies könnten Anfangsbestände, der Anfangsstandort eines Fahrzeugs, die verfügbaren Maschinen und die anfängliche Menge an Einrichtungen sein. Es umfasst auch alle statischen Werte, wie ein Transportnetzwerk, die Größe eines Lagers (die sich nicht ändert) und die Anzahl der Lastwagen in einer Flotte.
- Anfangswerte von Parametern, zusammen mit allen Funktionen, die zur Modellierung des Problems verwendet werden $I_0$ – Dies könnte ein Anfangspreis sein, der Medikamentenspiegel bei einem Patienten, zusammen mit der Wahl der Funktionen zur Durchführung von Prognosen oder zur Modellierung der Krankheitsentwicklung in einer Population.
- Anfängliche Überzeugungen oder Schätzungen einer beliebigen Größe oder eines Parameters $B_0$ – Dies könnte eine Nachfrageprognose sein, die Schätzung, wie Märkte auf Preise reagieren, wie ein Präsidentschaftskandidat in Umfragen abschneidet, oder Überzeugungen über die Performance eines Fertigungsprozesses.

Es sei angemerkt, dass es hilfreich ist, Anfangswerte, die sich nie ändern, von solchen zu trennen, die sich im Laufe der Zeit entwickeln – entweder direkt als Ergebnis von Entscheidungen oder durch exogene Information. Werte, die sich nie ändern, werden in $S_0$ gespeichert, werden aber nicht in $S_t$ für $t > 0$ dargestellt. Der Grund dafür ist der Wunsch, $S_t$ so kompakt wie möglich zu halten.

Angenommen, unsere Politik $X^\pi(S_t\vert \theta)$ hat abstimmbare Parameter. Zum Beispiel könnten wir ein Bestandssystem verwalten, bei dem wir die bekannte "Order-up-to"-Politik verwenden (in der Bestandsliteratur als $(s,S)$-Politik bekannt), gegeben durch

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & R_t < \theta^{min},\\ 0 & \text{otherwise.}\end{cases}
$$

wobei $\theta = (\theta^{min},\theta^{max})$. Zur Vereinfachung könnten wir annehmen, dass eine Bestellung, wenn wir sie aufgeben, sofort eintrifft (eine Standardannahme aus Lehrbüchern, die in der Praxis nie zutrifft), was es uns erlaubt, die Entwicklung unseres physischen Zustands $R_t$ (der Bestandsmenge unmittelbar bevor wir unsere sofortige Bestellung aufgeben) zu schreiben mit

$$
R_{t+1} = \max\{0,R_t + x_t - \Dhat_{t+1}\}
$$

wobei $x_t = X^\pi(S_t\vert \theta)$ und $\Dhat_{t+1}$ die Nachfrage nach unserem Produkt über das Intervall $(t,t+1)$ ist (dies ist unsere exogene Information $W_{t+1}$). Schließlich sei $C(S_t,x_t,W_{t+1})$ unser Nettogewinn über das Intervall $(t,t+1)$ (was momentan nicht wichtig ist).

Stellen wir uns nun vor, wir haben einen historischen Nachfrageprozess $W_1, W_2, \ldots, W_t, \ldots, W_T$, der es uns ermöglicht, eine Simulation unseres Systems durchzuführen. Sei $\omega$ diese historische Sequenz von Nachfragen (oder jeder exogenen Information). Wir würden das Problem, den besten Satz von Bestellparametern $\theta$ zu finden, schreiben mit

$$
\begin{align}
\max_\theta \Fhat^\pi(\omega,\theta\vert S_0) = \sum_{t=0}^T C_t(S_t(\omega),X^\pi_t(S_t(\omega))), \label{eq:optimizingtheta}
\end{align}
$$

wobei sich die Zustandsvariable entwickelt gemäß

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi_t(S_t(\omega)), W_{t+1}(\omega)).
$$

Sei $\theta^\ast $ der Wert von $\theta$, den wir durch die Optimierung von $\eqref{eq:optimizingtheta}$ gefunden haben. Die korrekte Art, diesen optimalen Wert zu schreiben, ist als Funktion $\theta^\ast (S_0)$, die von den Informationen in $S_0$ abhängt (sie hängt auch vom Sample-Pfad $\omega$ ab). Dies hilft zu verdeutlichen, dass eine Änderung der Eingabedaten für unser Problem, dargestellt durch $S_0$, Auswirkungen auf die besten Werte unserer Politikparameter $\theta$ haben kann. Tatsächlich müssten wir vielleicht sogar unsere Wahl der Politik ändern!

### Varianten

Es gibt zwei wichtige Varianten unseres grundlegenden mathematischen Modells:

- **Von Zeit $t$ zu Iteration $n$** – Es gibt Problemstellungen, in denen es natürlicher ist, einen Zähler $n$ statt der Zeit $t$ zu verwenden. Wir tun mehr, als nur $t$ in $n$ zu ändern, da wir Variablen, die sich mit Iterationen ändern, anders betrachten als eine Entwicklung über die Zeit. Konkret setzen wir den Index $n$ in den Exponenten (hochgestellt), wie $S^n$, $x^n$ und $W^{n+1}$.

  Ein Grund dafür ist, dass wir eine Menge von Variablen über die Zeit $x_1, x_2, \ldots, x_t, \ldots, x_T$ als Vektor $x=(x_1, x_2, \ldots, x_t, \ldots, x_T)$ betrachten, was nützlich ist, wenn wir deterministische Probleme modellieren (wir könnten über den gesamten Vektor $x$ auf einmal optimieren). Im Gegensatz dazu betrachten wir $x^n$ als eine Funktion, die sich über die Zeit entwickelt.

  Praktischer gesehen erlaubt es uns, $n$ hochgestellt zu setzen, iterative Simulationen zu schreiben. So würden wir den Informationsprozess über die Zeit für Iteration $n$ schreiben mit

$$
\omega^n = (W^n_1, \ldots, W^n_t, \ldots, W^n_T).
$$

  Wenn wir iterativ nach der besten Politik suchen, könnten wir unsere Politik für Iteration $n$ mit $X^{\pi,n}(S_t)$ schreiben, was dann ergibt

$$
S^n_0, x^n_0, W^n_1, \ldots, S^n_t, x^n_t, W^N_{t+1}, \ldots, S^N_T,
$$

  wobei $x^n_t = X^{\pi,n}(S^n_t\vert \theta)$.
- **Optimierung der finalen Belohnung** – Eine gängige Situation ist die, in der wir eine stochastische Suche durchführen, wie es der Fall wäre, wenn wir nach der besten Politik suchen. Jede Iteration zur Bewertung des Algorithmus könnte eine Simulation über die Zeit erfordern, obwohl dies nicht immer der Fall ist.

  Nehmen wir nun an, dass unsere Entscheidungsvariable der Parameter $\theta$ ist und dass wir einen Algorithmus $\Theta^\pi(S^{\theta,n})$ haben, der genau wie eine Politik $X^\pi(S_t\vert \theta)$ funktioniert, wobei $S^{\theta,n}$ den "Zustand" des Algorithmus in der $n$-ten Iteration erfasst.

  Suchalgorithmen sind allesamt sequentielle Entscheidungsprobleme, aber im Gegensatz zu den meisten sequentiellen Entscheidungsproblemen über die Zeit möchten wir $N$ Iterationen durchführen und interessieren uns nur für unsere Lösung am Ende. Sei $\theta^{\pi,N}$ der Wert von $\theta^n$ nach $N$ Iterationen, während wir dem "Algorithmus" (Politik) $\pi$ folgen.

  Der Wert $\theta^{\pi,N}$ hängt von der spezifischen Sequenz unseres Informationsprozesses $W^1, \ldots, W^t, \ldots, W^N$ ab, aber wir müssen ihn dann anhand eines neuen Satzes von Stichproben bewerten, die wir $\What$ nennen werden.

  Wir bewerten die Performance unseres Algorithmus mithilfe eines finalen Belohnungsziels, das wir schreiben als

$$
\begin{align}
\max_\pi \Fhat^\pi(S^\theta_0) &  = \E_{\What} F(\theta^{\pi,N}, \What)  \label{eq:objectivefinalreward1} \\
                                &\approx \frac{1}{M} \sum_{m=1}^M F(\theta^{\pi,N}, \What^m). \label{eq:objectivefinalreward2}
\end{align}
$$

  Einfach ausgedrückt: Wir bewerten unsere Lernpolitik für $\theta$, die wir mit $\Theta^\pi(S^{\theta,N})$ bezeichnet haben, indem wir durch $N$ Iterationen mithilfe von Beobachtungen von $W^n$ simulieren (was eine gesamte Simulation über die Zeit $t$ sein kann). Wenn wir unsere finale Schätzung des Parameters $\theta$ erhalten, die wir $\theta^{\pi,N}$ nennen, bewerten wir die Performance dieses Wertes anhand einer separaten Simulation, bei der wir $\theta = \theta^{\pi,N}$ festhalten und dann einen neuen Satz zufälliger Beobachtungen erzeugen, die wir $\What^m$ für $m=1, \ldots, M$ nennen.

## Modellierung von Unsicherheit

Bei vielen komplexen Problemen (Lieferketten, Energiesysteme und öffentliche Gesundheit sind nur einige Beispiele) kann das Identifizieren und Modellieren der verschiedenen Formen von Unsicherheit eine umfangreiche und komplexe Übung sein. Wir werden auf die auftretenden Fragestellungen hinweisen, aber keine erschöpfende Diskussion dieser Dimension versuchen.

Unsicherheit wird unserem Modell über zwei Mechanismen mitgeteilt: den Anfangszustand $S_0$, in dem wir die Parameter von Wahrscheinlichkeitsverteilungen modellieren würden, die Größen und Parameter beschreiben, die wir nicht perfekt kennen, und den exogenen Informationsprozess $W_1, \ldots, W_T$.

### Unsicherheit im Anfangszustand

Die Anfangszustandsvariable kann deterministische Parameter oder Anfangswerte dynamisch variierender Größen und Parameter enthalten. Wenn dies alles ist, was im Anfangszustand enthalten ist, dann erfasst er keine Form von Unsicherheit.

Es gibt viele Probleme, bei denen wir bestimmte Größen oder Parameter nicht kennen, aber das, was wir wissen, durch die Parameter einer Wahrscheinlichkeitsverteilung darstellen können. Einige Beispiele sind:

- Die Reaktion eines Patienten auf ein neues Medikament.
- Wie ein Markt auf eine Preisänderung reagieren wird.
- Wie viele verkaufsfähige Salatköpfe wir im Bestand haben (eine unbekannte Anzahl könnte verwelkt sein und nicht mehr verkaufsfähig sein).
- Der Zeitpunkt, an dem eine zuvor aus China bestellte Bestandsbox eintrifft.
- Die Höhe der Einlagen in einen Investmentfonds variiert zufällig um einen Mittelwert $\lambda$, aber wir wissen nicht, wie hoch $\lambda$ ist.

Dies sind einige Möglichkeiten, wie wir ein Modell mit Unsicherheit in einigen der Eingabegrößen initialisieren können.

Eine anfängliche probabilistische Überzeugung kann aus subjektivem Urteil oder aus früheren Beobachtungen oder Experimenten stammen.

### Der exogene Informationsprozess

Der zweite Weg, auf dem Unsicherheit in unser Modell einfließt, ist der exogene Informationsprozess. Die Variable $W_t$ enthält Informationen, die erst zum Zeitpunkt $t$ bekannt werden. Das bedeutet, wir müssen eine Entscheidung $x_t$ zum Zeitpunkt $t$ treffen, bevor wir das Ergebnis von $W_{t+1}$ kennen.

Nachfolgend eine Liste von Beispielen für $W_{t+1}$, die offenbart werden, nachdem eine Entscheidung $x_t$ getroffen wurde:

- Wir wählen einen Weg und beobachten dann die Reisezeit auf diesem Weg.
- Wir wählen ein Medikament und beobachten dann, wie der Patient reagiert.
- Wir wählen einen Katalysator und beobachten dann die Festigkeit des Materials, das er erzeugt.
- Wir wählen ein Produkt für die Werbung in einem Online-Markt aus und beobachten dann die Verkäufe.
- Wir wählen ein Webinterface-Design aus und beobachten dann die Anzahl der Klicks, die es generieren kann.
- Wir weisen Mittel einer Investition zu und beobachten dann die Preisänderung der Investition.

In jedem Fall beeinflussen die Informationen, die wir nach der Entscheidung beobachten, die Performance der Entscheidung (und welche Entscheidung die beste gewesen wäre).

Der Leser hat inzwischen wahrscheinlich erkannt, dass $W_{t+1}$ üblicherweise eine Sammlung verschiedener Informationstypen ist. Stellen wir uns beispielsweise vor, wir behandeln einen Patienten mit erhöhtem Blutzucker. Der Arzt möchte mit unterschiedlichen Strategien experimentieren, von Diät und Bewegung über Medikamente zur Gewichtsreduktion bis hin zu Medikamenten, die gezielt auf den Blutzucker abzielen. Die Informationsquellen, die der Arzt verarbeiten muss, könnten Folgendes umfassen:

- Bereitschaft des Patienten, eine Diät zu machen.
- Einhaltung der Diätanweisungen durch den Patienten.
- Bereitschaft des Patienten, tägliche Injektionen zur Gewichtsabnahme zu akzeptieren.
- Tatsächlicher Gewichtsverlust (aus jedem Programm).
- Tatsächliche Veränderung des Blutzuckers.

Jede dieser Informationen stellt einen separaten Informationsfluss dar. Wir können diese modellieren, indem wir die Menge $\Ical_t$ einführen, die Menge der Informationsprozesse zum Zeitpunkt $t$ (die Menge kann sich ändern, wenn wir Strategien ändern und neue Informationsflüsse eröffnen). Wir können nun die verschiedenen Ausprägungen der Information mit $W_{t+1,i}$ ausdrücken, der Realisierung der Information aus Quelle $i\in\Ical_t$, sodass $W_{t+1} = (W_{t+1,i})\_{i\in\Ical_t}$.

Wir werden weiterhin $W_{t+1}$ verwenden, um die neu eintreffende Information darzustellen, aber der Leser muss sich vor Augen halten, dass dies in realen Anwendungen typischerweise eine ganze Reihe von Informationsquellen umfasst, jede mit ihrem eigenen Verhalten.

### Zustands-/entscheidungsabhängige Prozesse

Es gibt viele Anwendungen, bei denen die Information $W_{t+1}$ vom aktuellen Zustand $S_t$ und/oder der Entscheidung $x_t$ abhängt. Einige Beispiele umfassen:

- Ein Mangel an Bestand kann Kunden abschrecken und die Nachfrage verringern.
- Der Kauf einer großen Menge an Aktien kann deren Preise erhöhen.
- Die Entscheidung, Impfstoffe zu empfehlen, kann den Verlauf einer Krankheit beeinflussen.
- Die Anzahl der online befindlichen Stromgeneratoren kann die Preise im Stromnetz verändern.

Aus diesem Grund ist es hilfreich, die exogene Information als eine Funktion $W_{t+1}(S_t,x_t)$ darzustellen, die exogene Informationsfunktion, die die im Intervall $(t,t+1)$ ankommende Information angibt.

Stellen wir uns beispielsweise vor, dass wir Aktien in großen Mengen kaufen oder verkaufen, was den zukünftigen Preis beeinflussen könnte. Die Dynamik könnte wie folgt geschrieben werden

$$
\begin{align}
p_{t+1} = \theta^p_0 p_t + \theta^p_1 p_{t-1} + \theta^p_2 p_{t-2} + W_{t+1}(S_t,x_t). \label{eq:statedependentprice}
\end{align}
$$

Der Zustand dieses Preisprozesses würde geschrieben als

$$
S_t = (p_t, p_{t-1}, p_{t-2}).
$$

Die zufällige Preisänderung, gegeben durch $W_{t+1}(S_t,x_t)$, spiegelt unsere Annahme wider, dass die Preisänderung sowohl vom aktuellen Preis abhängen könnte (wenn der Preis hoch ist, sind zukünftige Änderungen wahrscheinlich negativ) als auch von der Menge, die wir kaufen ($x_t > 0$) oder verkaufen ($x_t < 0$).

Natürlich möchten wir historische Daten nutzen, um zu versuchen, jeden strukturellen Einfluss von $S_t$ und $x_t$ auf zukünftige Preise vom tatsächlich exogenen Rauschen zu trennen. Daher könnten wir ein Modell vorschlagen

$$
W_{t+1}(S_t,x_t) = \theta^x x_t + \varepsilon_{t+1},
$$

wobei wir annehmen könnten, dass

$$
\varepsilon_{t+1} \sim N(0, \vert x_t\vert  \sigma^2_t),
$$

Dieses Modell nimmt an, dass $\varepsilon_{t+1}$ einen Mittelwert von 0 hat und eine Varianz, die mit dem Absolutwert von $x_t$ wächst. Die Information $W_{t+1}(S_t,x_t)$ hätte dann den Mittelwert $\theta^x x_t$, der positiv ist, wenn wir Anteile kaufen ($x_t > 0$), und negativ, wenn wir in den Markt verkaufen ($x_t < 0$).

Dieses Buch wird weiterhin $W_{t+1}$ als Standardnotation verwenden, aber der Leser sollte sich bewusst sein, dass sie vom aktuellen Zustand und/oder der gegebenen Zustandsentscheidung abhängen kann.

### Arten von Unsicherheit

Die Identifizierung der Informationsarten ist der erste Schritt zum Verständnis von Unsicherheit. Der nächste Schritt besteht darin, die verschiedenen Arten von Unsicherheit zu charakterisieren. Eine Zusammenfassung einiger der wichtigsten Verhaltensweisen von Informationsprozessen umfasst:

- Feinkörnige Variabilität – Diese kann auf Zeitskalen von Sekunden (sogar Sekundenbruchteilen), Minuten, Stunden oder täglich auftreten.
- Verschiebungen – Die feinkörnige Variabilität eines Prozesses stellt typischerweise Schwankungen um einen Mittelwert dar, aber es gibt Zeiten, in denen sich der Mittelwert periodisch auf ein neues Niveau verschiebt. Dies könnte neue Technologien, Anpassungen der Konkurrenz oder Veränderungen in der Wirtschaft widerspiegeln.
- Ausbrüche und intermittierende Nachfragen – Die Ausbreitung von Krankheiten kann einen Anstieg von Infektionen verursachen, da sich Ausbrüche lokal ausbreiten können. Ein Kunde könnte ein Produkt aufnehmen und es seinen Freunden empfehlen, die es wiederum ihren Freunden weitersagen.
- Spitzen – Ein herannahender Schneesturm kann einen sprunghaften Anstieg der Nachfrage nach Milch, Eiern und Toilettenpapier verursachen; der Ausfall eines Stromgenerators kann einen Spitzenwert bei den Strompreisen verursachen.
- Räumliche Ereignisse – Wetter, Krankheiten und Änderungen in der Regulierung können zufällige Veränderungen verursachen, die regionaler Natur sind.
- Systemische Ereignisse – Dies sind Ereignisse, die ein ganzes Unternehmen betreffen können (über internationale Grenzen hinweg), ein ganzes Land, oder sogar globale Auswirkungen haben können. Dies kann durch einen Cyberangriff auf Kommunikationssysteme, Veränderungen in der öffentlichen Wahrnehmung und negative Werbung entstehen.
- Seltene Ereignisse – Seltene Ereignisse können aus einer Reihe von Quellen entstehen, wie Erdbeben, Krankheitsausbrüche oder terroristische Anschläge. Dies sind tendenziell Ereignisse, die recht selten auftreten, aber wenn sie eintreten, erhebliche Auswirkungen auf eine Organisation haben können.
- Eventualitäten – Diese Kategorie bezieht sich auf Ereignisse, die eintreten könnten, für die es jedoch keine Historie gibt. Zum Beispiel werden Netzbetreiber einen Ausfall von Kernkraftwerken einplanen. Auch wenn dies innerhalb eines Landes vielleicht noch nie vorgekommen ist, möchte der Netzbetreiber sich dennoch auf das Ereignis vorbereiten, falls es eintritt.

Diese Verhaltensweisen können sich auf die Wahl der Politik zur Entscheidungsfindung auswirken, ein Thema, mit dem wir uns als Nächstes befassen.

Unsicherheit wird weithin als ein Problem anerkannt, auf das sich Unternehmen, Organisationen und sogar Regierungen einstellen müssen. Häufig wird übersehen, dass der Grund für die Modellierung von Unsicherheit darin besteht zu verstehen, wie sie Entscheidungen beeinflusst. Unsicherheit ist immer mit Informationsprozessen verbunden, die in der Zukunft eintreffen, sodass wir darüber nachdenken müssen, wie eine jetzt getroffene Entscheidung durch diese zukünftige Information beeinflusst wird.

## Entwurf von Politiken

> *Eine Politik ist eine Methode zur Entscheidungsfindung … jede Methode.*

Politiken sind Funktionen, die die Information in der Zustandsvariable nutzen, um eine Entscheidung zu treffen. Dies klingt nach einem gut definierten Problem; schließlich baut sich die Machine-Learning-Community vollständig um die Herausforderung auf, Funktionen zu finden, die zu einem Trainingsdatensatz passen. Der Entwurf von Politiken ist jedoch weit vielschichtiger, wie die Vielfalt der Communities zeigt, die in diesem Bereich arbeiten.

Abbildung 1.2 zeigt die Titelseiten von Büchern, die etwa 15 unterschiedliche Fachgebiete repräsentieren, die sich alle mit sequentiellen Entscheidungen unter Unsicherheit befassen. Sie verwenden acht verschiedene Notationssysteme und grundlegend unterschiedliche Ansätze zur Modellierung. Manche verwechseln Politiken (die eingebettete Optimierungsprobleme beinhalten) mit Zielfunktionen.

<figure class="book-figure">
  <img src="/assets/images/sdam/junglestochasticoptimization.png" alt="Eine Auswahl bedeutender Bücher, die verschiedene Fachgebiete der stochastischen Optimierung repräsentieren." style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 1.2.</span> Eine Auswahl bedeutender Bücher, die verschiedene Fachgebiete der stochastischen Optimierung repräsentieren.</figcaption>
</figure>

### Leistungskennzahlen von Politiken

Deterministische Optimierung wird durch eine Zielfunktion charakterisiert, die bestimmt, ob eine Entscheidung besser ist als eine andere. Bei sequentiellen Entscheidungsproblemen werden wir typischerweise eine Zielfunktion haben, die die Leistung einer Politik bewertet, wie wir es bei den Gleichungen $\eqref{eq:objectivecumulativereward}$, $\eqref{eq:objectivecumulativerewardaverage}$ und $\eqref{eq:objectivecumulativerewardsample}$ getan haben.

In der Praxis werden Politiken jedoch anhand einer Reihe konkurrierender Kriterien ausgewählt:

- Lösungsqualität – Wir betrachten typischerweise die Leistung (z. B. Kosten, Gewinne, Gesundheitsergebnisse) über einen bestimmten Zeitraum, wie in der abgetasteten Version der Zielfunktion in Gleichung $\eqref{eq:objectivecumulativerewardsample}$ ausgedrückt. Da dies zufällig ist, müssen wir die durchschnittliche Leistung und die Leistung im schlimmsten Fall berücksichtigen.
- Rechenaufwand – In betrieblichen Umgebungen spielen Laufzeiten eine Rolle. Wie bei der Zielfunktion ist die Zeit, die zur Berechnung einer Politik benötigt wird, zufällig, sodass wir die durchschnittliche Ausführungszeit und die Worst-Case-Ausführungszeit berücksichtigen müssen.
- Transparenz – Wie leicht sich eine Entscheidung auf Eingabedaten zurückführen lässt, die fehlerhaft sein könnten.
- Flexibilität/Anpassungsfähigkeit – Reale Probleme können kompliziert sein, und wir müssen uns oft an komplexe Situationen anpassen.
- Methodische Komplexität – Wenn eine Politik beispielsweise von einer internen Analytikgruppe implementiert wird, müssen diese die Wahrscheinlichkeit berücksichtigen, dass sie eine Methode tatsächlich zum Laufen bringen können.
- Datenanforderungen – Unterschiedliche Politiken haben unterschiedliche Datenanforderungen.

Die in Abbildung 1.2 dargestellten mathematischen Optimierungsgemeinschaften sprechen möglicherweise von optimalen Politiken, was die Optimierung des Erwartungswerts in Gleichung $\eqref{eq:objectivecumulativereward}$ impliziert. Es ist jedoch wichtig, all diese Eigenschaften zu berücksichtigen.

### Die vier Klassen von Politiken

Die Bücher in Abbildung 1.2 zeigen eine Vielzahl von Möglichkeiten, im Laufe der Zeit Entscheidungen zu treffen. Es stellt sich heraus, dass sie sich alle in wohldefinierte Klassen von Politiken einteilen lassen. Es gibt zwei grundlegende Strategien zur Erstellung von Politiken, von denen jede wiederum in zwei Klassen unterteilt werden kann, sodass vier Klassen von Politiken entstehen:

**Politiksuche** – Hierbei durchsucht man Methoden (Funktionen) zur Entscheidungsfindung, simuliert deren Leistung (wie wir es in Gleichung $\eqref{eq:objectivecumulativereward}$ tun), um die Methode zu finden, die im Durchschnitt über die Zeit am besten funktioniert. Dies kann die Suche über verschiedene Methodenklassen sowie über etwaige einstellbare Parameter einer gegebenen Methode umfassen. Diese Idee eröffnet zwei Klassen von Politiken:

- **1) Politikfunktionsapproximationen (PFAs)** – Dies sind analytische Funktionen eines Zustands, die direkt eine Aktion spezifizieren. Die Order-up-to-Politik in Gleichung $\eqref{eq:introorderupto}$ ist ein gutes Beispiel dafür, ebenso wie unsere Politik, eine angepasste Prognose in Gleichung $\eqref{eq:adjustedforecastpolicy}$ zu verwenden.
- **2) Kostenfunktionsapproximationen (CFAs)** – Dies sind Politiken, die die Lösung eines Optimierungsproblems beinhalten, das typischerweise eine Vereinfachung des ursprünglichen Problems darstellt, wobei Parameter eingeführt werden, um die Politik im Laufe der Zeit besser funktionieren zu lassen. Dies ist eine besonders leistungsfähige Idee, die in der Industrie weit verbreitet ist. Wir haben später im Buch mehrere Beispiele für CFAs (beginnend mit [Kapitel 4](/sdam/de/chapter-4/), um die beste Medikation für Diabetes zu erlernen).

**Lookahead-Politiken** – Wir können effektive Politiken erstellen, indem wir über den Beitrag (oder die Kosten) einer Entscheidung sowie eine Approximation der nachgelagerten Beiträge (oder Kosten) optimieren, die sich aus der jetzt getroffenen Entscheidung ergeben. Auch hier können wir diese in zwei weitere Klassen von Politiken unterteilen:

- **3) Wertfunktionsapproximationen (VFAs)** – Stellen wir uns vor, wir durchqueren ein in Abbildung 1.3 dargestelltes Netzwerk, in dem wir einen Pfad von Knoten 1 zu Knoten 11 finden möchten. Nehmen wir nun an, wir befinden uns an Knoten $S_t = i = 2$, wobei $t$ zählt, wie viele Verbindungen wir bereits durchquert haben. Sei $V_{t+1}(S_{t+1})$ der Wert (unter der Annahme, dass wir maximieren) des Pfades von Knoten $S_{t+1}$ (wie etwa Knoten 4 oder 5) zu Knoten 11 (machen Sie sich keine Gedanken darüber, wie wir $V_{t+1}(S_{t+1})$ erhalten haben). Sei eine Entscheidung $x_t$ die Verbindung, die wir aus Knoten $S_t = i$ heraus durchqueren. Der Wert, sich an Knoten $S_t$ zu befinden, wäre gegeben durch

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big). \label{eq:bellmangraph}
\end{align}
$$

  Gleichung $\eqref{eq:bellmangraph}$ ist als *Bellman-Gleichung* bekannt. Wenn sie verwendet wird, um den besten Pfad in einem deterministischen Netzwerk wie dem in Abbildung 1.3 dargestellten zu finden, lässt sie sich recht leicht veranschaulichen.

<figure class="book-figure">
  <img src="/assets/images/sdam/bellmangraph.png" alt="Einfacher deterministischer Graph zur Durchquerung von Knoten 1 zu Knoten 11." style="max-width: 320px;">
  <figcaption><span class="fig-num">Abbildung 1.3.</span> Einfacher deterministischer Graph zur Durchquerung von Knoten 1 zu Knoten 11.</figcaption>
</figure>

  Es gibt viele Probleme, bei denen der Übergang vom Zustand $S_t$ zu $S_{t+1}$ zufällige Information beinhaltet, die zum Zeitpunkt $t$ noch nicht bekannt ist. Wir haben ein einfaches Beispiel für Zufälligkeit in unserem ersten Bestandsproblem gesehen, und ein komplizierteres Beispiel in unserem zweiten Bestandsproblem.

  Für diese allgemeineren Probleme gilt: Wenn wir uns in einem Zustand $S_t$ befinden, eine Entscheidung $x_t$ treffen und dann neue Information $W_{t+1}$ beobachten (die zum Zeitpunkt $t$ nicht bekannt ist), führt uns dies gemäß unserer Übergangsfunktion zu einem neuen Zustand $S_{t+1}$

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

  Das bedeutet, dass zum Zeitpunkt $t$, wenn wir $x_t$ wählen müssen, $W_{t+1}$ eine Zufallsvariable ist, was wiederum bedeutet, dass $S_{t+1}$ ebenfalls eine Zufallsvariable ist. In diesem Fall müssen wir in die Bellman-Gleichung einen Erwartungswert einfügen und Gleichung $\eqref{eq:bellmangraph}$ schreiben als

$$
\begin{align}
V_t(S_t) = \max_{x_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \left\{V_{t+1}(S_{t+1})\vert S_t,x_t\right\}\big). \label{eq:bellmanstochastic}
\end{align}
$$

  Hier haben wir den Erwartungswert $\E_{W_{t+1}}\lbrace \cdot\rbrace $ eingefügt, der buchstäblich bedeutet, über alle zufälligen Ausgänge von $W_{t+1}$ zu mitteln.

  Die stochastische Version der Bellman-Gleichung in $\eqref{eq:bellmanstochastic}$ ist äußerst allgemein. Der Zustand $S_t$ bedeutet nicht nur einen Knoten in einem Graphen; er erfasst jede (und alle) für das Problem relevante Information. Die Schwierigkeit besteht darin, dass wir die Wertfunktion $V_t(S_t)$ nicht mehr berechnen können, was wiederum bedeutet, dass wir keinen Zugriff auf $V_{t+1}(S_{t+1})$ haben werden, von dem wir in den Gleichungen $\eqref{eq:bellmangraph}$ und $\eqref{eq:bellmanstochastic}$ angenommen hatten, dass wir es kennen.

  Die Strategie, die die Forschungsgemeinschaft beim Versuch, die Bellman-Gleichung anzuwenden, verfolgt hat, besteht darin, auf das Gebiet des maschinellen Lernens zurückzugreifen, um eine statistische Approximation zu schätzen, die wir $\Vbar_t(S_t)$ nennen werden. Unter der Annahme, dass wir eine vernünftige Approximation $\Vbar_{t+1}(S_{t+1})$ finden können, würden wir unsere Politik (unsere Methode zur Entscheidungsfindung) schreiben unter Verwendung von

$$
\begin{align}
X^\pi(S_t) = \argmax_{x_t\in\Xcal_t} \big(C(S_t,x_t) + \E_{W_{t+1}} \{\Vbar_{t+1}(S_{t+1})\vert S_t,x_t\}\big). \label{eq:introvbarpolicy}
\end{align}
$$

  Die Notation „$\argmax_x f(x)$" bedeutet den Wert von $x$, der die Funktion $f(x)$ maximiert. Der Index $\pi$ trägt die Information, die die Struktur der Funktion $f$ spezifiziert, sowie etwaige einstellbare Parameter $\theta$, die wir in der Approximation $\Vbar_{t+1}(S_{t+1})$ benötigen würden.

  Diese Klasse von Politik fällt unter Überschriften wie approximative dynamische Programmierung und, am häufigsten, bestärkendes Lernen. Obwohl es sich um eine leistungsfähige Idee handelt, ist sie nicht leicht anzuwenden und hängt von unserer Fähigkeit ab, eine genaue Approximation $\Vbar_{t+1}(S_{t+1})$ zu erstellen.

Es gibt eine sehr reichhaltige Literatur zu Methoden der Approximation von Wertfunktionen, aber sie ist kein Allheilmittel. Dieses Buch wird diese Idee an einigen Stellen veranschaulichen, aber die Leser werden gewarnt, dass diese Klasse von Politiken recht schwierig zu verwenden ist.

- **4) Direkte Lookahead-Approximationen (DLAs)** – Es gibt viele Probleme, bei denen wir mit keiner der ersten drei Klassen effektive Politiken entwickeln können, und wenn dies der Fall ist, müssen wir uns direkten Lookahead-Approximationen zuwenden. Wir werden dies später in vollständiger mathematischer Form ausschreiben, aber für den Moment werden wir DLAs so beschreiben, dass sie jetzt eine Entscheidung treffen, während sie über ein (typischerweise approximatives) Modell optimieren, das sich über einen bestimmten Planungshorizont erstreckt.

  Ein gängiges DLA besteht darin, ein approximatives Modell zu erstellen, das deterministisch ist. Genau das tun wir, wenn wir ein Navigationssystem verwenden, das den kürzesten Weg zum Ziel findet, unter der Annahme, dass wir die Reisezeit entlang jedes Streckenabschnitts des Netzwerks kennen. Als allgemeine Regel gilt, dass das Lösen eines exakten stochastischen Modells der Zukunft fast immer unmöglich ist, sodass wir verschiedene Strategien zur Approximation des Problems untersuchen werden.

Wir haben unseren Modellierungsrahmen anhand von zwei Bestandsproblemen veranschaulicht und zwei einfache Politiken (Formen von PFAs) mit den Gleichungen $\eqref{eq:introorderupto}$ und $\eqref{eq:adjustedforecastpolicy}$ vorgeschlagen, aber wir haben dies nur getan, um ein konkretes Beispiel für eine Politik zu haben. Obwohl PFAs im alltäglichen Entscheidungsprozess weit verbreitet sind, handelt es sich hierbei um spezialisierte Beispiele.

Im Gegensatz dazu werden wir behaupten, dass die vier gerade skizzierten Klassen von Politiken (PFAs, CFAs, VFAs und DLAs) universell sind, in dem Sinne, dass sie *jede* Methode abdecken, die wir zur Lösung *jedes* sequentiellen Entscheidungsproblems verwenden könnten. Um dies klarzustellen: Es handelt sich um Meta-Klassen. Das heißt, wenn wir denken, dass sich ein Problem für eine bestimmte Klasse eignet, sind wir noch nicht fertig, da wir immer noch die spezifische Politik innerhalb der Klasse entwerfen müssen. Dennoch sind wir der Meinung, dass diese vier Klassen einen Fahrplan bieten, der den Prozess des Entwurfs von Politiken leitet.

### Testen von Politiken

Um den Wert einer Politik zu testen, werden wir die Gleichung $\eqref{eq:objectivecumulativerewardsample}$ verwenden, die eine Politik über einen einzelnen Stichprobenpfad des Informationsprozesses $W_t$ simuliert. Der schwierigste Teil bei der Simulation einer Politik besteht typischerweise darin, den exogenen Informationsprozess zu erstellen.

Sei $\omega$ ein Stichprobenpfad, wobei $W_1(\omega), \ldots, W_T(\omega)$ einen bestimmten Stichprobenpfad darstellt. Tabelle 1.3 veranschaulicht 10 Stichprobenpfade von Preisen, die von $\omega^1$ bis $\omega^{10}$ indiziert sind. Wenn wir $\omega^6$ wählen, dann gilt $W_7(\omega^6) = 44.16$.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>45.00</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>45.00</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>45.00</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.00</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>45.00</td><td>46.32</td><td>46.14</td><td>46.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>45.00</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.00</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>45.00</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>47.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>45.00</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>45.00</td><td>45.01</td><td>46.73</td><td>46.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabelle 1.3.</span> Illustration einer Reihe von Stichprobenpfaden für Preise, die alle bei $45,00 beginnen.</p>
</div>

Die Frage ist: Wie erstellen wir eine Stichprobe von Beobachtungen wie den in Tabelle 1.3 dargestellten? Es gibt drei typische Strategien:

- Erstellung von Stichproben aus historischen Daten. Da es zu jedem Zeitpunkt nur ein Ergebnis gibt, können wir mehrere Stichprobenpfade erstellen, indem wir Beobachtungen aus verschiedenen Zeiträumen kombinieren. Wir könnten Preise aus verschiedenen Jahren, Nachfragen aus verschiedenen Monaten oder beobachtete Reisezeiten an verschiedenen Tagen auswählen. Dieser Ansatz ist nicht möglich, wenn die exogene Information vom Zustand $S_t$ oder von Entscheidungen $x_t$ abhängt.
- Simulation anhand eines mathematischen Modells. Dieser Ansatz bietet den Vorteil, dass große Stichproben erzeugt werden können, um statistisch zuverlässige Schätzungen der Leistung einer Politik zu erhalten. Diese Modelle können sehr ausgefeilt sein, aber es ist recht einfach, Modelle (selbst ausgefeilte) zu erstellen, die das Verhalten realer Daten nicht wiedergeben. Die größte Herausforderung besteht darin, Korrelationen zu erfassen, sei es über die Zeit oder zwischen Stichproben (etwa die Nachfragen nach verschiedenen Produkten, die Preise verschiedener Aktien oder die Windgeschwindigkeit an verschiedenen Orten).
- Wir können eine Idee im Feld testen, indem wir Beobachtungen so verwenden, wie sie tatsächlich auftreten. Der Vorteil dabei ist, dass wir mit echten Daten arbeiten (die Vergangenheit ist möglicherweise nicht dieselbe wie die Zukunft). Der Nachteil ist, dass es einen Tag dauert, um einen Tag neuer Daten zu beobachten (und wir benötigen möglicherweise weit mehr als nur einen einzigen Tag an Beobachtungen).

Wenn $W_{t+1}$ vom Zustand $S_t$ und/oder der Entscheidung $x_t$ abhängt, müssen wir eine Möglichkeit finden, diese Abhängigkeit widerzuspiegeln. Die Erstellung eines mathematischen Modells ermöglicht es, viele Simulationen am Computer durchzuführen, aber die Erstellung von Stichproben des Informationsprozesses erfordert auch die Rekonstruktion von Korrelationen über die Zeit sowie über den Raum. Wir verweisen den Leser auf RLSO, Kapitel 10, für eine eingehendere Diskussion der Unsicherheitsmodellierung.

## Nächste Schritte

Die nächsten fünf Kapitel des Buches werden unseren Modellierungsrahmen auf fünf verschiedene Probleme anwenden:

- [Kapitel 2](/sdam/de/chapter-2/) – Ein Vermögensverkaufsproblem
- [Kapitel 3](/sdam/de/chapter-3/) – Adaptive Marktplanung
- [Kapitel 4](/sdam/de/chapter-4/) – Erlernen der besten Diabetes-Medikation
- [Kapitel 5](/sdam/de/chapter-5/) – Stochastische kürzeste-Wege-Probleme – Statisch
- [Kapitel 6](/sdam/de/chapter-6/) – Stochastische kürzeste-Wege-Probleme – Dynamisch

Jedes dieser Kapitel wird der gleichen Gliederung folgen, die wir oben zur Beschreibung der beiden Bestandsprobleme verwendet haben. Diese Gliederung umfasst:

- Erzählung – Eine allgemeinverständliche Beschreibung des Problems.
- Das universelle Modell – Dieses Modell folgt unserem Format zur Beschreibung der fünf Elemente eines sequentiellen Entscheidungsproblems: Zustandsvariablen, Entscheidungsvariablen, exogene Informationsvariablen, die Übergangsfunktion und die Zielfunktion.
- Unsicherheitsmodell – Hier werden wir ein mögliches Modell für etwaige Unsicherheiten im Problem bereitstellen.
- Entwurf von Politiken – Wir werden mögliche Politiken zur Entscheidungsfindung vorschlagen. Wir haben unsere Probleme so ausgewählt, dass uns die fünf Anwendungsfälle durch alle vier Klassen von Politiken führen. Für den Moment überlassen wir es dem Leser, zu erkennen, welche der vier Klassen wir jeweils wählen.
- Erweiterung – Schließlich schlagen wir möglicherweise eine oder mehrere mögliche Erweiterungen unseres grundlegenden Problems vor, die eine Änderung der Politik erfordern könnten.

Wir kehren dann in [Kapitel 7](/sdam/de/chapter-7/) zu den vier Klassen von Politiken zurück und besprechen unseren allgemeinen Modellierungsrahmen, wobei wir die Probleme aus den Kapiteln 2–6 verwenden, um verschiedene Modellierungsideen zu veranschaulichen.

Nach dieser Diskussion kehren wir zu unserem Muster von Kapiteln zurück, die anhand von Beispielen lehren, verwenden jedoch komplexere Probleme. Unsere verbleibenden Kapitel behandeln die folgenden Probleme:

- [Kapitel 8](/sdam/de/chapter-8/) – Energiespeicherung I
- [Kapitel 9](/sdam/de/chapter-9/) – Energiespeicherung II
- [Kapitel 10](/sdam/de/chapter-10/) – Lieferkettenmanagement I: Der Zwei-Agenten-Zeitungsjunge
- [Kapitel 11](/sdam/de/chapter-11/) – Lieferkettenmanagement II: Das Bierspiel
- [Kapitel 12](/sdam/de/chapter-12/) – Ad-Click-Optimierung
- [Kapitel 13](/sdam/de/chapter-13/) – Blutmanagementproblem
- [Kapitel 14](/sdam/de/chapter-14/) – Optimierung klinischer Studien

## Was haben wir gelernt?

- Zunächst haben wir gelernt, was eine Entscheidung ist!
- Wir haben ein allgemeines Modell vorgestellt, das sogenannte universelle Modellierungsframework, für jedes sequentielle Entscheidungsproblem.
- Wir haben das Modell veranschaulicht, indem wir zunächst ein klassisches Bestandsproblem verwendet haben, bei dem der Zustand des Systems die im Bestand vorhandene Menge ist.
- Anschließend sind wir zu einem etwas komplizierteren Bestandsproblem übergegangen, bei dem die Zustandsvariable den Ressourcenzustand $R_t$ des Bestands, eine informationelle Zustandsvariable in Form des Preises $p_t$ und schließlich einen Belief-Zustand über die bevorstehende Nachfrage $\Dhat_{t+1}$ in Form eines geschätzten Mittelwerts und einer geschätzten Varianz umfasst.
- Wir haben gelernt, wie man den Fluss exogener Informationen modelliert, die aus mehreren verschiedenen Quellen stammen können. Exogene Information wird als eine Funktion dargestellt, die vom Zustand und/oder der Entscheidung abhängen kann.
- Wir haben zwei Formen einer einfachen Klasse von Politik veranschaulicht, die als Politikfunktionsapproximation (oder PFA) bekannt ist.
- Wir haben gelernt, dass Politiken auf verschiedene Weisen bewertet werden können, die vom Kontext und davon abhängen, wie Entscheidungen verwendet werden.
- Wir haben mit einem kurzen Überblick über vier Klassen von Politiken abgeschlossen. Illustrationen aller vier Klassen werden in den Kapiteln 2–6 bereitgestellt, an welchem Punkt wir in [Kapitel 7](/sdam/de/chapter-7/) innehalten, um die Politiken eingehender zu besprechen und damit die Weichen für die komplexeren Probleme in den Kapiteln 8–14 zu stellen.

## Übungen

**Wiederholungsfragen**

<ol class="book-exercises">
<li>Was sind die fünf Elemente des mathematischen Modells eines sequentiellen Entscheidungsproblems?</li>
<li>Was ist der Unterschied zwischen den Variablen im Anfangszustand $S_0$ und denen im dynamischen Zustand $S_t$ für $t > 0$?</li>
<li>Was ist der Unterschied zwischen einer Entscheidung und der exogenen Information?</li>
<li>Was sind die zwei Hauptkategorien von Politiken, und wie unterscheiden sie sich?</li>
<li>Vergleichen Sie die Zustandsvariablen für das einfache Bestandsproblem mit dem komplizierteren Bestandsproblem.</li>
</ol>

**Problemlösungsfragen**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Vergleichen Sie die Politiken für die beiden Bestandsprobleme im Hinblick darauf, wie sie mit zeitabhängigem Verhalten umgehen würden. Zum Beispiel könnte unsere Pizzeria an Wochenenden eine viel höhere Nachfrage haben als an Wochentagen. Kommentieren Sie den Wert, den es hätte, den einstellbaren Parameter $\theta$ zeitabhängig (oder wochentagsabhängig) zu machen, im Hinblick darauf, wie dies die Lösung verbessern könnte.</li>
<li>Vergleichen Sie, wie Sie vorgehen würden, um den Parameter $\theta$ für die Bestandsprobleme abzustimmen:
  <ol type="a">
    <li>In einem Simulator.</li>
    <li>Im Feld.</li>
  </ol>
  Diskutieren Sie die Vor- und Nachteile jedes Ansatzes.</li>
</ol>
{% endraw %}