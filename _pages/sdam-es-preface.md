---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: Prefacio y agradecimientos
permalink: /sdam/es/preface/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 71edd7ec18764999
---

{% raw %}
**Prefacio de la primera edición**

Mi trabajo en problemas de decisión secuencial surgió de una investigación que comenzó en la década de 1980 en el sector del transporte por camión, y a lo largo de mi carrera abarcó el ferrocarril, la energía, la salud, las finanzas, el comercio electrónico, la gestión de la cadena de suministro, e incluso el aprendizaje para la ciencia de materiales. Los problemas de decisión secuencial surgen en actividades cotidianas como los deportes, la cocina, las compras y la búsqueda del mejor camino hacia un destino. También surgen al diseñar un producto para una startup, contratar personal para dicha startup y diseñar campañas de marketing.

El trabajo inicial en problemas de decisión secuencial (conocidos como programas dinámicos o problemas de control óptimo) se centró en resolver una ecuación famosa, y famosamente intratable, conocida como la ecuación de Bellman (o las ecuaciones de Hamilton-Jacobi para problemas continuos). Me uní a una comunidad que trabajaba en métodos para aproximar estas ecuaciones; este trabajo produjo un libro exitoso sobre programación dinámica aproximada, generando un avance para una clase de problemas de asignación de recursos. Sin embargo, con el tiempo llegué a comprender que la programación dinámica aproximada era un método poderoso para resolver una gama muy estrecha de problemas: el proverbial martillo en busca de un clavo.

Mi trabajo en una amplia gama de problemas me hizo comprender la importancia de utilizar un amplio abanico de métodos que podían encontrarse en la literatura de investigación. Descubrí que podía modelar cualquier problema de decisión secuencial con el mismo marco, que consistía en buscar entre métodos para tomar decisiones, generalmente conocidos como "políticas" en la literatura de investigación. Luego pude organizar la vasta gama de métodos en cuatro amplias clases (meta-clases) de políticas que abarcan *cualquier* método para tomar decisiones, incluyendo cualquier cosa propuesta en la literatura o utilizada en la práctica (¡incluso métodos que aún no se han inventado!).

Este marco es el fundamento de un libro de nivel de posgrado que terminé en 2022 titulado *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions* (véase [tinyurl.com/RLandSO](https://tinyurl.com/RLandSO/)). Mientras escribía ese libro, me di cuenta de que los problemas de decisión secuencial son universales, y surgen en toda actividad humana. Además, estas ideas podían (y debían) enseñarse a un público amplio, y no solo al típico grupo analíticamente sofisticado que encontramos en investigación de operaciones, ciencias de la computación, economía y algunos sectores de la ingeniería.

El objetivo de este libro es permitir a los lectores comprender cómo abordar, modelar y resolver un problema de decisión secuencial, incluso si nunca van a escribir una línea de código. Si bien este libro es analítico, el verdadero objetivo es enseñar a los lectores a *pensar* sobre los problemas de decisión secuencial, descomponiéndolos en los cinco elementos centrales de un modelo de decisión secuencial, modelando la incertidumbre y luego diseñando políticas.

Así como existen muchos estilos para enseñar estadística dentro de diferentes comunidades, creo que habrá una evolución similar en la enseñanza de estas ideas a distintos públicos. Los ejemplos de este libro provienen de la investigación de operaciones, que me gusta llamar la matemática de la vida cotidiana. Creo que la mayoría de los lectores encontrarán los ejemplos familiares, independientemente de su campo profesional. Al mismo tiempo, puedo imaginar fácilmente versiones del libro diseñadas exclusivamente para diferentes dominios de problemas, como la salud, las finanzas, la energía, la robótica y la gestión de la cadena de suministro (y esta lista no es en absoluto exhaustiva).

**Agradecimientos de la primera edición**

Cualquier reconocimiento adecuado del trabajo detrás de este libro debería incluir a todos los que contribuyeron al texto de nivel de posgrado *Reinforcement Learning and Stochastic Optimization: A unified framework for sequential decisions*. Simplemente hay demasiadas personas para nombrarlas todas aquí, y pido a los lectores que consulten la sección de Agradecimientos de ese libro para ver mi mejor esfuerzo por reconocer las contribuciones de tantas personas que aportaron a mi comprensión de los problemas de decisión secuencial.

Dicho esto, quisiera reconocer a algunas personas que contribuyeron a este libro. En primer lugar, hubo un entusiasta grupo de becarios que escribieron todos los módulos de Python utilizados en los ejercicios de este libro: Raluca Cobzaru, Andrei Grauer, Joy Hii, John Nguyen y Robert Raveaunu. Estoy especialmente agradecido con Dennis Djanka, profesor de la Universidad de Karlsruhe en Alemania, quien actualizó los módulos originales de Python de Python 2 a Python 3, e hizo revisiones que facilitan el uso de la biblioteca.

En segundo lugar, agradezco cálidamente los esfuerzos de la Dra. Juliana Nascimento, quien revisó cada línea de este código en Python, corrigiendo errores, depurando la lógica y ayudándome a escribir los conjuntos de problemas basados en estos ejercicios.

Finalmente, y lo más importante, fue mi clase de pregrado, ORF 411: Sequential Decision Analytics and Modeling, que se inscribió y participó en el primer curso dedicado específicamente a la "analítica de decisiones secuenciales" impartido en cualquier lugar. Me ayudaron a refinar las clases, que pueden encontrarse en [tinyurl.com/RLSOcourses](https://tinyurl.com/RLSOcourses/) (desplácese hasta "Undergraduate/masters course in sequential decision analytics" para ver las diapositivas).

Warren B. Powell<br>
Princeton, Nueva Jersey<br>
Agosto de 2022

**Prefacio de la segunda edición**

En 2026 tomé la decisión de seguir el camino de publicar a través de Kindle Direct Publishing, que elegí para mi nueva serie de monografías *Bridging Decision Problems*. Cuando vi lo sencillo que resultaba, me di cuenta de que podía hacer lo mismo con *Sequential Decision Analytics and Modeling*. KDP me permitirá realizar actualizaciones menores junto con nuevas ediciones sin la carga de trabajar a través de una editorial. Me permite ofrecer una edición para Kindle a un precio mínimo, junto con una edición de tapa dura a un precio mucho más razonable.

La segunda edición contiene el mismo conjunto de capítulos de aplicación. Los mayores cambios están en el capítulo 1, donde incorporé mis ideas sobre la definición de diferentes tipos de decisiones. Cada uno de los capítulos de aplicación ahora comienza con una "Visión general del capítulo" que ayuda a los lectores a comprender de qué trata el capítulo. Todo el libro también se benefició de una revisión de pruebas muy necesaria para corregir pequeñas ediciones y algunos errores ocasionales.

Esta edición también adopta un proceso que denomino "enmarcar el problema" (framing the problem), que consiste en comenzar identificando (en inglés) las métricas de desempeño, los tipos de decisiones que se toman y las fuentes de incertidumbre. Mi nueva monografía, [*Bridging Decision Problems, Volume I: Framing the Problem*](/bridging-vol1/), aborda estas tres preguntas a lo largo de 150 páginas, por lo que no son tan simples como parecen, incluso sin el modelado matemático.

Cada capítulo incluye ahora una breve sección, justo después de la narrativa, llamada "Enmarcando el problema" que prepara el terreno para la sección de modelado matemático enumerando las métricas, decisiones e incertidumbres. Nuestra aplicación del enmarcado hará que el proceso parezca mucho más simple de lo que es en la mayoría de los problemas reales, ya que no ilustro el proceso de comenzar con una lista completa de métricas, decisiones e incertidumbres que luego se reducen a las representadas en el modelo.

<figure class="book-figure">
  <img src="/assets/images/sdam/geography-2025.png" alt="Geographical distribution of downloads of first edition as of 2025" style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 0.1.</span> Distribución geográfica de las descargas de la primera edición al año 2025</figcaption>
</figure>

**Agradecimientos de la segunda edición**

En primer lugar, quisiera agradecer a los muchos miles de lectores que han descargado este libro. Al momento de escribir esto, el libro ha disfrutado de cerca de 18,000 descargas de todo el mundo (véase la Figura 0.1). La retroalimentación ha sido simplemente conmovedora.

Una característica importante de este libro son los módulos de Python que acompañan a la mayoría de los capítulos. Unos años después de publicarse la primera edición, descubrí con considerable decepción que Python se había actualizado de la versión 2 a la versión 3, y los módulos originales ya no funcionaban (y yo abandoné la programación en 1990, una decisión que fue fundamental para mi éxito).

Pueden imaginar mi profunda gratitud cuando Dennis Djanka, profesor de la Universidad de Karlsruhe en Alemania, se puso en contacto conmigo con la noticia de que había reescrito por completo la biblioteca en Python 3. Además, hizo las siguientes incorporaciones (como él lo resumió en su correo electrónico):

- Introducción de clases base abstractas SDPModel y SDPPolicy que facilitan la configuración de nuevos modelos y políticas con una cantidad mínima de código.
- Reescritura completa del código de los módulos *AssetSelling*, *MedicalDecisionDiabetes* y *StochasticShortestPath_static*, y creación de un Jupyter Notebook para cada uno de los problemas que guía al usuario desde la creación de un modelo y una política hasta el ajuste de políticas y la interpretación de los resultados.

Anteriormente creé una URL para la versión de Dennis del directorio usando [tinyurl.com/sdagithubnew](https://tinyurl.com/sdagithubnew/), manteniendo mi directorio original en [tinyurl.com/sdagithub](https://tinyurl.com/sdagithub/). Con el lanzamiento de la 2.ª edición, he modificado la URL original para que también apunte a la nueva biblioteca de Dennis.

Warren B. Powell<br>
Princeton, Nueva Jersey<br>
Febrero de 2026
{% endraw %}