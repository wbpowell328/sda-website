---
layout: book
book_data: sdam_toc_de
book_home: /sdam/de/contents/
title: Vorwort und Danksagungen
permalink: /sdam/de/preface/
date: 2026-07-17
lang: de
translated_from: en
translated_from_hash: 71edd7ec18764999
---

{% raw %}
**Vorwort zur ersten Auflage**

Meine Arbeit an sequentiellen Entscheidungsproblemen entstand aus Forschungsarbeiten, die in den 1980er Jahren im Speditionswesen begannen, und erstreckte sich im Laufe meiner Karriere über die Bereiche Schiene, Energie, Gesundheit, Finanzen, E-Commerce, Lieferkettenmanagement und sogar Lernen für die Materialwissenschaft. Sequentielle Entscheidungsprobleme treten in alltäglichen Aktivitäten wie Sport, Kochen, Einkaufen und der Suche nach dem besten Weg zu einem Ziel auf. Sie treten auch bei der Entwicklung eines Produkts für ein Startup, der Einstellung von Mitarbeitern für das Startup und der Gestaltung von Marketingkampagnen auf.

Die frühe Arbeit an sequentiellen Entscheidungsproblemen (bekannt als dynamische Programme oder optimale Steuerungsprobleme) konzentrierte sich auf die Lösung einer berühmten und berüchtigt schwer lösbaren Gleichung, die als Bellman-Gleichung (oder Hamilton-Jacobi-Gleichungen für kontinuierliche Probleme) bekannt ist. Ich schloss mich einer Gemeinschaft an, die an Methoden zur Approximation dieser Gleichungen arbeitete; diese Arbeit brachte ein erfolgreiches Buch über approximative dynamische Programmierung hervor, das einen Durchbruch für eine Klasse von Ressourcenzuweisungsproblemen erzielte. Im Laufe der Zeit wurde mir jedoch klar, dass die approximative dynamische Programmierung eine leistungsstarke Methode zur Lösung eines sehr engen Problembereichs war — der sprichwörtliche Hammer, der auf der Suche nach einem Nagel ist.

Meine Arbeit an einer Vielzahl von Problemen machte mir die Bedeutung der Nutzung eines breiten Spektrums von Methoden bewusst, die in der Forschungsliteratur zu finden sind. Ich stellte fest, dass ich jedes sequentielle Entscheidungsproblem mit demselben Rahmenwerk modellieren konnte, das die Suche über Methoden zur Entscheidungsfindung umfasste, die in der Forschungsliteratur allgemein als „Politiken" bekannt sind. Anschließend konnte ich die enorme Bandbreite an Methoden in vier breite Klassen (Meta-Klassen) von Politiken organisieren, die *jede* Methode zur Entscheidungsfindung abdecken, einschließlich aller in der Literatur vorgeschlagenen oder in der Praxis verwendeten Methoden (einschließlich Methoden, die noch nicht erfunden wurden!).

Dieses Rahmenwerk bildet die Grundlage für ein Buch auf Graduiertenniveau, das ich 2022 fertigstellte, mit dem Titel *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (siehe [tinyurl.com/RLandSO](https://tinyurl.com/RLandSO/)). Während ich dieses Buch schrieb, wurde mir klar, dass sequentielle Entscheidungsprobleme universell sind und in jeder menschlichen Aktivität auftreten. Darüber hinaus könnten (und sollten) diese Ideen einem breiten Publikum vermittelt werden, nicht nur der typischen, analytisch versierten Gruppe, die wir im Operations Research, in der Informatik, den Wirtschaftswissenschaften und in Teilbereichen des Ingenieurwesens finden.

Das Ziel dieses Buches ist es, den Lesern zu ermöglichen zu verstehen, wie man ein sequentielles Entscheidungsproblem angeht, modelliert und löst, selbst wenn sie nie eine Zeile Code schreiben werden. Obwohl dieses Buch analytisch ist, besteht das eigentliche Ziel darin, den Lesern beizubringen, wie man über sequentielle Entscheidungsprobleme *nachdenkt*, indem man sie in die fünf Kernelemente eines sequentiellen Entscheidungsmodells zerlegt, Unsicherheit modelliert und dann Politiken entwirft.

So wie es in verschiedenen Gemeinschaften viele Stile für die Vermittlung von Statistik gibt, glaube ich, dass es eine ähnliche Entwicklung bei der Vermittlung dieser Ideen an unterschiedliche Zielgruppen geben wird. Die Beispiele in diesem Buch stammen aus dem Operations Research, das ich gerne die Mathematik des Alltags nenne. Ich denke, die Leser werden die meisten Beispiele als vertraut empfinden, unabhängig von ihrem beruflichen Umfeld. Gleichzeitig kann ich mir leicht Versionen des Buches vorstellen, die rein für unterschiedliche Problembereiche wie Gesundheit, Finanzen, Energie, Robotik und Lieferkettenmanagement konzipiert sind (und dies ist bei Weitem keine vollständige Liste).

**Danksagungen zur ersten Auflage**

Eine angemessene Würdigung der Arbeit hinter diesem Buch müsste jeden anerkennen, der zu dem Text auf Graduiertenniveau, *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*, beigetragen hat. Es gibt einfach zu viele Menschen, um sie hier alle aufzulisten, und ich bitte die Leser, den Abschnitt „Danksagungen" in jenem Buch zu konsultieren, in dem ich mein Bestes versucht habe, die Bemühungen der vielen Menschen zu würdigen, die zu meinem Verständnis sequentieller Entscheidungsprobleme beigetragen haben.

Dies gesagt, möchte ich einige Personen würdigen, die zu diesem Buch beigetragen haben. Zunächst gab es eine begeisterte Gruppe von Praktikanten, die alle Python-Module geschrieben haben, die in den Übungen dieses Buches verwendet werden: Raluca Cobzaru, Andrei Grauer, Joy Hii, John Nguyen und Robert Raveaunu. Ich bin besonders dankbar für Dennis Djanka, einen Professor an der Universität Karlsruhe in Deutschland, der die ursprünglichen Python-Module von Python 2 auf Python 3 aktualisiert und Überarbeitungen vorgenommen hat, die die Bibliothek benutzerfreundlicher machen.

Zweitens danke ich herzlich Dr. Juliana Nascimento, die jede Zeile dieses Python-Codes durchgegangen ist, Fehler behoben, die Logik bereinigt und mir geholfen hat, die Aufgabensammlungen zu schreiben, die auf diesen Übungen basierten.

Schließlich und vor allem gilt mein Dank meinem Grundstudiumskurs, ORF 411: Sequential Decision Analytics and Modeling, der sich für den Kurs anmeldete und an dem ersten Kurs teilnahm, der jemals speziell zum Thema „sequenzielle Entscheidungsanalytik" gehalten wurde. Sie halfen mir, die Vorlesungen zu verfeinern, die unter [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses/) zu finden sind (scrollen Sie nach unten zu „Undergraduate/masters course in sequential decision analytics" für die Folien).

Warren B. Powell<br>
Princeton, New Jersey<br>
August 2022

**Vorwort zur zweiten Auflage**

Im Jahr 2026 entschied ich mich für den Weg der Veröffentlichung über Kindle Direct Publishing, den ich für meine neue Monografienreihe *Bridging Decision Problems* gewählt hatte. Als ich sah, wie einfach das war, wurde mir klar, dass ich dasselbe mit *Sequential Decision Analytics and Modeling* tun könnte. KDP wird es mir ermöglichen, kleinere Aktualisierungen zusammen mit neuen Auflagen vorzunehmen, ohne den Aufwand, mit einem Verlag zusammenzuarbeiten. Dies erlaubt es mir, eine Kindle-Ausgabe zu einem minimalen Preis anzubieten, zusammen mit einer wesentlich günstigeren gebundenen Ausgabe.

Die zweite Auflage enthält denselben Satz an Anwendungskapiteln. Die größten Änderungen finden sich in Kapitel 1, wo ich meine Ideen zur Definition verschiedener Arten von Entscheidungen eingearbeitet habe. Jedes der Anwendungskapitel beginnt nun mit einem „Kapitelüberblick", der den Lesern hilft zu verstehen, worum es in dem Kapitel geht. Das gesamte Buch profitierte zudem von einem dringend benötigten Korrekturlesen, um kleinere Bearbeitungen und gelegentliche Fehler zu beheben.

Diese Auflage übernimmt auch einen Prozess, den ich „Rahmung des Problems" nenne und der damit beginnt, (in Textform) die Leistungskennzahlen, die Arten der zu treffenden Entscheidungen und die Quellen der Unsicherheit zu identifizieren. Meine neue Monografie, [*Bridging Decision Problems, Volume I: Framing the Problem*](/bridging-vol1/), behandelt diese drei Fragen auf 150 Seiten, sodass sie nicht so einfach sind, wie sie klingen, selbst ohne die mathematische Modellierung.

Jedes Kapitel enthält nun direkt nach der Erzählung einen kurzen Abschnitt mit dem Titel „Rahmung des Problems", der die Bühne für den Abschnitt zur mathematischen Modellierung bereitet, indem er die Kennzahlen, Entscheidungen und Unsicherheiten auflistet. Unsere Anwendung der Rahmung wird den Prozess viel einfacher erscheinen lassen, als er bei den meisten realen Problemen tatsächlich ist, da ich nicht den Prozess veranschauliche, der mit einer vollständigen Liste von Kennzahlen, Entscheidungen und Unsicherheiten beginnt, die dann auf die im Modell dargestellten reduziert werden.

<figure class="book-figure">
  <img src="/assets/images/sdam/geography-2025.png" alt="Geographische Verteilung der Downloads der ersten Auflage im Jahr 2025" style="max-width: 500px;">
  <figcaption><span class="fig-num">Abbildung 0.1.</span> Geographische Verteilung der Downloads der ersten Auflage im Jahr 2025</figcaption>
</figure>

**Danksagungen zur zweiten Auflage**

Zunächst möchte ich den vielen Tausend Lesern danken, die dieses Buch heruntergeladen haben. Zum Zeitpunkt dieser Niederschrift verzeichnet das Buch nahezu 18.000 Downloads aus der ganzen Welt (siehe Abbildung 0.1). Die Rückmeldungen waren einfach herzerwärmend.

Ein wichtiges Merkmal dieses Buches sind die Python-Module, die die meisten Kapitel begleiten. Einige Jahre nach der Veröffentlichung der ersten Auflage musste ich zu meiner erheblichen Enttäuschung feststellen, dass Python von Version 2 auf Version 3 aktualisiert worden war und die ursprünglichen Module nicht mehr funktionierten (und ich hatte das Programmieren 1990 aufgegeben, eine Entscheidung, die für meinen Erfolg von zentraler Bedeutung war).

Sie können sich meine tief empfundene Dankbarkeit vorstellen, als sich Dennis Djanka, ein Professor an der Universität Karlsruhe in Deutschland, mit der Information an mich wandte, dass er die Bibliothek vollständig in Python 3 neu geschrieben hatte. Darüber hinaus nahm er die folgenden Ergänzungen vor (wie er es in seiner E-Mail zusammenfasste):

- Einführung abstrakter Basisklassen SDPModel und SDPPolicy, die es einfach machen, neue Modelle und Politiken mit minimalem Codeaufwand einzurichten.
- Vollständige Neufassung des Codes für die Module *AssetSelling*, *MedicalDecisionDiabetes* und *StochasticShortestPath_static* sowie die Erstellung eines Jupyter Notebooks für jedes der Probleme, das den Benutzer von der Erstellung eines Modells und einer Politik über die Feinabstimmung der Politiken bis hin zur Interpretation der Ergebnisse führt.

Ich hatte zuvor eine URL für Dennis' Version des Verzeichnisses unter [tinyurl.com/sdagithubnew](https://tinyurl.com/sdagithubnew/) erstellt, während ich mein ursprüngliches Verzeichnis unter [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/) beibehielt. Mit der Veröffentlichung der 2. Auflage habe ich die ursprüngliche URL so geändert, dass sie ebenfalls auf Dennis' neue Bibliothek verweist.

Warren B. Powell<br>
Princeton, New Jersey<br>
Februar 2026
{% endraw %}