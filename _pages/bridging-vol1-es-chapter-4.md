---
layout: book
title: "Capítulo 4: Decisiones"
permalink: /bridging-vol1/es/chapter-4/
date: 2026-07-17
book_home: /bridging-vol1/es/contents/
book_data: bridging_vol1_toc_es
lang: es
translated_from: en
translated_from_hash: b9d7338fb39168d1
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Todo este libro se basa en la afirmación:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="If you want to run a better {anything} you have to make better decisions.">
</figure>

No hace falta decir que, antes de poder abordar el problema de identificar las mejores decisiones, hay que saber qué decisiones se están tomando.

Recuerde del Capítulo 1 que hay dos tipos de "problemas": los enfocados en métricas y los enfocados en decisiones. Ejemplos de cada uno son:

- **Problemas enfocados en métricas:**
  - Gestión de la cadena de suministro – Minimizar inventarios, maximizar el margen operativo.
  - Red eléctrica – Minimizar los costos de generación de energía.
  - Salud pública – Minimizar las muertes.
  - Gestión de una flota de camiones – Maximizar el ingreso operativo neto por conductor por semana.
  - Gestión de un hotel - Maximizar la ganancia operativa.
  - Dirigir una campaña presidencial - Ganar la elección.
- **Problemas enfocados en decisiones:**
  - Gestión de la cadena de suministro – Cuánto pedir, qué proveedor utilizar.
  - Gestión de la demanda – Cómo fijar el precio de un producto, qué canales de marketing utilizar.
  - Red eléctrica – Qué generadores programar para su operación, qué turbinas de gas utilizar.
  - Gestión de la diabetes – Qué medicación usar para controlar el azúcar en sangre, qué dosis.
  - Gestión de efectivo de un fondo mutuo – Cuánto efectivo mantener disponible para atender rescates, en qué acciones invertir.

Si comenzamos con una métrica, nuestro desafío es identificar las decisiones que nos ayudarán a mejorar la métrica. Si comenzamos con las decisiones, entonces el problema es diseñar la métrica. Sin embargo, incluso cuando creemos conocer las decisiones, debemos asegurarnos de no haber pasado por alto ninguna.

Existe una extensa literatura matemática sobre el tema de la optimización de decisiones, pero incluso estos libros carecen de una definición estándar de qué es una decisión. En su lugar, los libros introducen notación como el vector de decisión "$x$," o control "$u$," o acción "$a$," después de lo cual ofrecen ejemplos y esperan que el lector "lo entienda." Si bien esto funciona para problemas simples, crea una barrera entre el modelo matemático y las aplicaciones reales.

Para aplicaciones complejas como la gestión de cadenas de suministro o la resolución de problemas de salud pública, identificar las decisiones es mucho más desafiante que identificar las métricas. Esto no pretende trivializar la identificación de métricas, pero el concepto de métricas es bien comprendido tanto por los expertos del dominio como por los modeladores. Cuando se les pregunta qué decisiones están involucradas, los ejecutivos de negocios, profesionales médicos, ingenieros y científicos a menudo se quedan con una mirada en blanco. Si bien la palabra "decisión" es familiar para todos, no parece ser un término que utilicen en la resolución diaria de problemas, mientras que todos entienden "métricas" de una forma u otra.

## Las decisiones y el idioma inglés

Parece que un buen punto de partida para un capítulo sobre "decisiones" sería ofrecer una definición. Ayuda notar que las definiciones estándar, como las de Webster, incluirán la variedad habitual de significados de una palabra tal como se usa en el idioma inglés. Por ejemplo, ganar un partido de béisbol se denomina un "decision" (decisión). En este libro, solo usamos "decisión" para referirnos a situaciones en las que tenemos un conjunto de opciones, y debemos hacer la mejor elección, lo cual, por supuesto, implica la identificación de métricas de desempeño.

Comenzamos señalando que las decisiones son siempre una forma de información. Ayuda dividir toda la información en tres clases amplias:

1. Información que ya conocemos en un momento dado. Nos referimos a esta información como el estado de nuestro sistema (más precisamente, el estado de conocimiento).
2. Información que controlamos y que cambia el estado.
3. Nueva información que llega y que no controlamos (aunque podamos influir en ella).

La información de las clases (2) y (3) produce una variable de estado actualizada (clase 1). Ahora estamos listos para definir una decisión:

**Definición (formal):** Una **decisión** es una clase de información endógenamente controlable.

Así, las decisiones (que están contenidas en las "variables de decisión") representan información que creamos al nombrar una entre un conjunto de opciones.

Nuestra definición formal requiere mucha carga conceptual para lo que debería ser un concepto muy simple, así que ofrecemos una segunda definición:

**Definición (informal):** Una **decisión** es algo que controlamos.

Esta definición evita "clase de información" utilizando "algo," pero transmite la idea.

Ambas definiciones plantean la pregunta de quién está tomando la decisión, lo cual es inseparable del concepto de decisión. Los modelos matemáticos clásicos evitan esta pregunta, pero es central para el modelado de la mayoría de los sistemas reales.

Dada la importancia de las decisiones en las actividades humanas, no debería sorprender que haya numerosos términos en inglés que capturan el concepto de una elección. La Tabla 4.1 enumera varias palabras que implican hacer una elección en un contexto general. Bajo la columna "Recopilar información" se encuentran términos que surgen al decidir qué experimento realizar, a quién escuchar, qué observar (y así sucesivamente). La columna denominada "Actuar sobre recursos" enumera una variedad de términos que surgen en el contexto de la gestión de recursos (como las personas). Por ejemplo, "promover" implica la decisión de si promover o no a alguien (y a qué nivel).

Esta tabla no pretende ser una lista exhaustiva de palabras que implican una elección, pero sugiere que las "decisiones" se presentan de muchas formas en el idioma inglés.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 4.1.</span> El idioma inglés ofrece una variedad de palabras que todas significan la libertad de elegir.</caption>
<thead>
<tr><th>Términos generales</th><th>Recopilar información</th><th>Decisiones de identificación</th><th>Actuar sobre recursos</th></tr>
</thead>
<tbody>
<tr><td>Acción</td><td>Experimento (¿cuál?)</td><td>Identificar</td><td>Promover (a quién, cuánto)</td></tr>
<tr><td>Elección</td><td>Escuchar (¿qué?)</td><td>Clasificar</td><td>Adquirir (cuál, cuánto)</td></tr>
<tr><td>Control</td><td>Observar</td><td>Hallazgo</td><td>Vender (a quién, cuánto)</td></tr>
<tr><td>Decisión</td><td>Probar (cuál)</td><td>Concluir</td><td>Recompensar (cuánto)</td></tr>
<tr><td>Diseño</td><td>Ver/escanear</td><td>Etiquetar</td><td>Criticar (a quién, cómo)</td></tr>
<tr><td>Intervención (médica)</td><td></td><td></td><td>Mover (a dónde)</td></tr>
<tr><td>Opción</td><td></td><td></td><td>Comerciar (cuál, con quién)</td></tr>
<tr><td>Mover (a dónde)</td><td></td><td></td><td>Tratamiento (cuál)</td></tr>
<tr><td>Respuesta (cuál)</td><td></td><td></td><td>Aceptar/rechazar</td></tr>
<tr><td>Tarea</td><td></td><td></td><td>Recomendar</td></tr>
<tr><td>Operación (finanzas)</td><td></td><td></td><td></td></tr>
</tbody>
</table>
</div>

## Identificación de decisiones

Comprender las diferentes palabras que implican (o requieren) hacer una elección es importante al identificar las decisiones que están disponibles para tomarse. Es importante reconocer que las decisiones no vienen con etiquetas brillantes adheridas a ellas. Campbell's Soup Co. reconoció el desafío de hacer que los consumidores fueran conscientes de que estaban tomando decisiones en una famosa serie de comerciales en los años 1970, con el eslogan "*¡Podría haber tomado un V8!*". Su departamento de marketing se dio cuenta de que las personas a menudo tomaban una lata de gaseosa sin darse cuenta de que podrían haber elegido tomar un V8 en su lugar. Los comerciales ayudaron a que los consumidores fueran conscientes de que beber una gaseosa era una decisión.

Las personas, en casi cualquier contexto de problema, caen en el hábito de resolver los problemas de una determinada manera, sin darse cuenta de que tienen opciones. Podría decirse que así es como logramos avanzar en el día, ya que evaluar las opciones para identificar la mejor toma tiempo. El desafío que enfrentamos es primero ser consciente de cuándo estamos tomando una decisión, y luego identificar las decisiones que tienen el mayor impacto en el desempeño.

El comportamiento de tomar decisiones de manera pasiva es absolutamente generalizado, pero esto crea una oportunidad. Imagine que se encuentra en cualquier contexto de problema (como los ilustrados a la izquierda en la figura 4.1). Ahora suponga que quiere mejorar el desempeño, ya sea la rentabilidad, la productividad, mejores resultados de salud, mejores medicamentos, o mejorar la agricultura. Entonces recuerde nuestra frase básica:

> *Si quiere dirigir un mejor {lo que sea}, tiene que tomar mejores decisiones.*

Para tomar una mejor decisión, hay que reconocer cuándo se está tomando una decisión. Un buen ejercicio es crear su "libro de decisiones" y luego tomar notas mentales a medida que reconoce cuándo se está tomando una decisión (es decir, hubo una elección, y podrían haberse tomado diferentes decisiones).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/IdentifyingDecisions.jpg" alt="A challenge is to work in any of a variety of problem settings and identify the decisions that are being made." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.1.</span> Un desafío es trabajar en cualquiera de una variedad de contextos de problemas (como los de la derecha) e identificar las decisiones que se están tomando.</figcaption>
</figure>

## Tipos de decisiones

Nuestro enfoque de encuadre requiere poder identificar todas las decisiones, no solo las decisiones que pueden ser abordadas por una metodología particular. Para guiar este proceso, enumeramos a continuación 10 tipos de decisiones que, según nuestro conocimiento, cubren toda forma de información que controlamos.

1. **Decisiones físicas y financieras** – Estas decisiones surgen en la gestión de recursos físicos y financieros, abarcando personas, equipos, instalaciones, productos, materias primas, agua, energía, además de efectivo, inversiones, préstamos, … Las decisiones incluyen comprar, vender, mover y modificar recursos. Esta clase es el dominio de la investigación de operaciones, el control de ingeniería y las finanzas, y se basa en gran medida en herramientas como la programación lineal, entera y no lineal.
2. **Elecciones discretas con resultados incertidos** – Este es un término general diseñado para cubrir actividades que pueden involucrar proyectos complejos como lanzar un nuevo producto, presentar un medicamento para ensayos clínicos, o adquirir una empresa. A veces llamados "proyectos," estos pueden involucrar una serie de cambios en las métricas de desempeño, los recursos, las finanzas y la dinámica del sistema. Los casos especiales pueden ser problemas más simples, como elegir un precio o a quién contratar para un puesto de liderazgo. Estos problemas son populares en la literatura de análisis de decisiones, y típicamente involucran conjuntos relativamente pequeños de acciones que son difíciles de evaluar.
3. **Decisiones de adquisición/observación de información** – Estas incluyen decisiones para adquirir u observar información mediante la realización de experimentos en el laboratorio, en el campo, o con simulaciones informáticas. Ayuda distinguir dos contextos en los que podemos adquirir información:
   - Aprendizaje fuera de línea (offline) - Estas son actividades que se llevan a cabo en un entorno de prueba. La adquisición de información fuera de línea puede incluir esfuerzos de investigación, búsquedas en internet, o la contratación de expertos del dominio.
   - Aprendizaje en línea (online) - Esto cubre decisiones para ejecutar y observar procesos en el campo utilizando un enfoque de "aprender haciendo," que implica observar un proceso a medida que evoluciona, como la forma en que un mercado responde a la publicidad o a los precios, o cómo un paciente responde a un tratamiento.

Ambos estilos de adquisición de información implican tomar decisiones específicamente para adquirir información. La adquisición de información se ha estudiado bajo nombres como diseño de experimentos (estático o secuencial), búsqueda estocástica, aprendizaje activo (u óptimo), bandidos multibrazo (multiarmed bandits) y optimización bayesiana.
4. **Decisiones de comunicación/compartición de información** – Estas se presentan en dos formas:
   - Mensajería – Esto refleja lo que decimos en texto, video y/o audio. Un ejemplo moderno de mensajería incluye la optimización de prompts.
   - Canales y momento – Esto refleja la elección del canal (texto/correos electrónicos, publicación (impresa o en línea), redes sociales, o canales publicitarios) junto con el momento y la frecuencia.
5. **Métricas de desempeño y objetivos** - Estas representan la elección crítica de cuantificar lo que estamos tratando de lograr, como maximizar los ingresos, minimizar los costos, maximizar la resistencia de un material o el desempeño de un medicamento, o minimizar las millas vacías. Estas se pueden incorporar en la función objetivo o representarse como restricciones.
6. **Elección de funciones** – A menudo pasada por alto como una decisión, las funciones pueden ser métodos para tomar decisiones (políticas), la formulación de modelos de optimización, la elección de métricas de desempeño, métodos para pronosticar o estimar, o funciones de transición (como la manera en que se propaga una enfermedad). Esta categoría cubre la elección de la función, lo que significa su estructura.
7. **Fijación de parámetros** – Las funciones típicamente se caracterizan por uno o más parámetros (generalmente continuos, pero no siempre) que pueden ajustarse para mejorar la precisión predictiva (al ajustar modelos estadísticos) u optimizarse para mejorar el desempeño (al afinar una política para tomar decisiones). Los parámetros pueden estar asociados con una función; pueden ser el peso de una métrica de desempeño, o pueden ser un objetivo (o límite) para una métrica de desempeño.
8. **Estimación o identificación** – Se nos puede dar la imagen de una persona y pedirnos que la identifiquemos, donde queremos maximizar el número de veces que identificamos correctamente a la persona. A un modelo de lenguaje grande se le da un conjunto de palabras (en realidad, tokens), y trata de identificar la palabra (o token) más probable que sigue a continuación.
9. **Características y comportamientos** - Podríamos elegir las características de un nuevo paquete de software, el diseño de un nuevo producto, o cómo elegimos comportarnos (como individuo, organización o cuerpo político).
10. **Decidir qué decidir** - En la mayoría de las aplicaciones reales, el número de decisiones potenciales (es decir, cualquier lugar donde enfrentamos una elección) puede ser bastante grande. Debemos priorizar qué decisiones tienen el mayor valor económico para justificar la realización de cualquier análisis formal.

## Tipos de variables de decisión

Las decisiones vendrán en diferentes estilos, pero las variables de decisión típicamente se pueden ubicar en una (o más) de las siguientes categorías:

- **Binaria** – Aquí tenemos solo dos opciones, que podrían ser:
  - Realizar una acción o no.
  - Retener o vender un activo.
  - Pruebas A/B para el diseño de páginas web, donde debemos elegir entre un diseño actual y un diseño nuevo o modificado.
  - Si continuar probando un medicamento o tratamiento en un ensayo clínico, o terminar el ensayo.
- **Conjunto discreto de opciones o acciones** – Esta es fácilmente la forma más común de problema de decisión, y surge cuando tenemos un conjunto de opciones o acciones discretas, tales como:
  - Elegir un proveedor para una pieza.
  - Elegir un medicamento o tratamiento médico.
  - Elegir un canal de marketing.
  - Elegir una ubicación para una instalación.
- **Escalar continuo** – Los ejemplos son:
  - Fijar el precio de un producto.
  - Elegir la dosis de un medicamento.
  - Decidir cuánto gastar en publicidad en un mercado para una campaña presidencial.
  - Elegir cuánto efectivo mantener disponible para un fondo mutuo.
- **Vectores discretos** – Hay muchos problemas que involucran la gestión de recursos discretos como personas, máquinas y trabajos. Cuando tenemos un único conjunto de opciones discretas, como dónde comprar un producto, es fácil enumerar todas las opciones. Pero cuando tenemos que decidir cómo programar, digamos, 100 máquinas para manejar cientos de trabajos, entonces necesitamos algoritmos especializados.
- **Vectores continuos** – Hay problemas con un pequeño número de decisiones continuas, como controlar un automóvil, una aeronave o un cohete. Luego están los problemas con grandes números de parámetros continuos, como asignar fondos entre muchas clases de activos, o asignar grandes cantidades de kits de naloxona a cien condados en un estado. Existen potentes algoritmos de búsqueda para resolver estos problemas.

## Cómo las decisiones impactan el sistema

No tiene sentido hablar de "decisiones" como un concepto abstracto. Primero reconocemos que una decisión cambia el sistema de alguna manera, pero ¿cómo?

Hay tres formas en que una decisión puede impactar un sistema:

- **Recursos físicos** – Aquí es donde compramos, vendemos o modificamos de cualquier manera cualquier cosa física, que podría ser personas, equipos, instalaciones, alimentos, agua o energía.
- **Financiero** – Esto puede ser efectivo, inversiones y préstamos; contratos de seguros y coberturas de divisas; y precios.
- **Informativo** – Esta es una categoría que podría incluir una decisión de realizar un experimento en un laboratorio, una simulación por computadora, o una prueba de campo que se utiliza para actualizar estimaciones o creencias; podría involucrar la fijación de metas de desempeño, el diseño de métricas, o la especificación de los términos de un contrato de venta.

Hay algo de superposición en las categorías, como la distinción entre las coberturas de divisas y los términos de un contrato de venta. Lo importante es la amplitud de formas en que podemos afectar cómo evoluciona un sistema a lo largo del tiempo.

A medida que avanzamos en nuestro marco de modelado, necesitaremos entender lo siguiente sobre cualquier decisión:

- ¿Cómo afecta la decisión a nuestras métricas de desempeño ahora?
- ¿Qué efecto tendrá una decisión ahora sobre el estado del sistema antes de tomar la siguiente decisión?
- ¿La decisión impactará la nueva información que llega después de que se toma la decisión?

En el Volumen II describimos estos puntos usando notación matemática.

## Momento de las decisiones

Uno de los atributos más importantes pero desafiantes de las decisiones involucra el tiempo, específicamente:

- **Con qué frecuencia se toman las decisiones** – Podemos dividir las decisiones en dos clases amplias:
  - Decisiones de diseño, que se toman una sola vez (inicialmente) durante el horizonte de planificación. En la práctica, incluso las decisiones de diseño evolucionan con el tiempo, pero es común tener decisiones que se toman solo una vez dentro de lo que se considera un horizonte de planificación razonable.
  - Decisiones de control – Estas son decisiones que se toman repetidamente a lo largo del tiempo, pero hay sistemas complejos donde se toman una variedad de decisiones en diferentes intervalos de tiempo. Por ejemplo, los operadores de la red planifican la programación de los generadores de vapor una vez al día; las turbinas de gas se planifican por hora; los ajustes a la velocidad de ciertos generadores se hacen cada 5 minutos; y las señales para ajustar los niveles de voltaje se envían cada 2 segundos.
- **Tiempos de retraso** – Cuando se toma una decisión, a menudo hay un retraso antes de que impacte el sistema. Por ejemplo:
  - Ordenar inventario puede requerir semanas o meses para llegar.
  - Administrar un medicamento podría tomar minutos, horas o días antes de que afecte a un paciente.
  - Los operadores de la red planifican los horarios para operar las plantas de vapor el día anterior, mientras que las decisiones de encender las turbinas de gas requieren un aviso de 30 minutos.
  - Los cambios de precios podrían no verse en las ventas durante días o semanas, y pueden afectar a los mercados durante meses.
- **Planificación anticipada de decisiones con retraso** – Además de las dimensiones de cuándo se toma una decisión y cuándo impacta al sistema, tenemos que pensar en el momento en que estamos planificando hacia el futuro. Por ejemplo:
  - Un fabricante puede enfrentar tiempos de entrega de ocho meses al ordenar desde Asia, pero puede obtener plazos de entrega mucho más rápidos para cantidades más pequeñas (a un costo más alto) cuando hay escasez. Al pensar en cuánto inventario mantener disponible, el fabricante tendría que mantener inventarios mucho más grandes sin la opción de ordenar al proveedor de mayor costo pero más cercano. Sin embargo, cuando esta opción está disponible, el fabricante puede considerar la opción de usar al proveedor más cercano en caso de un aumento repentino en la demanda.
  - Las aerolíneas a menudo necesitan planificar las compras de aeronaves hasta 10 años en el futuro, pero pueden negociar entregas más rápidas a un costo más alto. Esto permite que la aerolínea considere esto como una opción si el volumen de pasajeros aumenta más rápido de lo planeado. O pueden cancelar contratos a un costo dependiendo de cuánto tiempo esperen para ejercer esta opción.

## Quién toma las decisiones

Hay muchos entornos donde hay más de un tomador de decisiones (o agente). Ejemplos de entornos multiagente incluyen:

- Dos tomadores de decisiones iguales (a menudo llamados jugadores) como podría ocurrir en negociaciones entre un fabricante y un proveedor o un cliente, o en interacciones entre un médico y un paciente.
- Dos tomadores de decisiones donde uno tiene una posición de control. Por ejemplo, un "agente de campo" puede solicitar recursos a un "agente central" que tiene control sobre cuánto de la solicitud satisfacer.
- Varios agentes, como podría surgir cuando algunas empresas están compitiendo entre sí (los ejemplos surgen en industrias que venden automóviles o químicos industriales), o cuando hay múltiples unidades organizacionales en el mismo nivel dentro de una empresa.
- Múltiples agentes, como surge en una cadena de suministro con diferentes fabricantes que proporcionan componentes para fabricar una pieza como un motor o un automóvil completo.
- Un único agente que aprende sobre un entorno desconocido, que es cómo podríamos modelar cualquier problema que involucre incertidumbre. El entorno desconocido podría ser el clima, la presencia de una enfermedad en una población, o un mercado que compra un producto.

Volvemos a los problemas multiagente más adelante en la serie, donde mostramos cómo extender la notación (presentada en el Volumen II) para manejar múltiples tomadores de decisiones. Por ahora, nos vamos a enfocar en un único tomador de decisiones, que puede ser uno de dos o más tomadores de decisiones.

Tenemos varias razones para evitar la identificación explícita de los tomadores de decisiones en esta etapa:

- La organización de las decisiones puede variar, incluso dentro de la misma industria (como el transporte por camión o la gestión de la cadena de suministro) o dominio del problema (como la salud pública).
- Si su objetivo es desarrollar un modelo computacional, es posible que esté buscando cambiar cómo se organizan las decisiones. Un modelador puede desear tratar un conjunto de decisiones como si estuvieran siendo tomadas por un único agente, ya sea como una simplificación, o porque puede producir mejores resultados.
- El objetivo de enumerar diferentes tipos de decisiones no es abordar todos ellos en un solo proyecto de modelado. Más bien, es necesario identificar los objetivos de un modelo y luego elegir las decisiones que son relevantes para los objetivos del proyecto.
- Recomendamos que el lector aborde estos proyectos desde la perspectiva de un único tomador de decisiones, lo cual no necesariamente tiene que alinearse con cómo se toman realmente las decisiones dentro de una organización. Esto se apoyará con la presentación inicial del marco de modelado universal en el Volumen II.

Por ahora, cuando se enfrenta a un entorno multiagente recomendamos tratar cada agente por separado para identificar sus propias métricas y decisiones. Las incertidumbres a menudo afectan al entorno más amplio, aunque cada agente puede tener incertidumbres que son relevantes para sus propias decisiones y métricas de desempeño.

## Tomar decisiones con computadoras

Las computadoras tienen una forma muy directa de tomar decisiones. Comienza conociendo los tipos de decisiones y el conjunto de decisiones posibles (factibles). Luego utiliza un método preespecificado para "tomar" la decisión, lo que significa una elección particular del conjunto de decisiones factibles (o permitidas).

Comenzamos presentando cómo nos referimos a estos métodos de toma de decisiones:

**Definición:** Una **política** es un método para elegir una decisión permitida usando la información que está disponible en el momento en que se toma la decisión.

Hay dos estrategias amplias para diseñar políticas, cada una de las cuales se puede dividir en dos clases, creando cuatro clases de políticas que incluyen *cualquier* método para tomar decisiones. Estas son:

**Búsqueda de políticas** - Esta estrategia crea funciones que deben ajustarse para funcionar bien a lo largo del tiempo. Toman decisiones sin planificar directamente hacia el futuro. Estas pueden dividirse en dos clases:

1. Aproximaciones de función de política, o PFAs.
2. Aproximaciones de función de costo, o CFAs.

**Políticas de anticipación** - Esta estrategia intenta tomar la mejor decisión ahora optimizando sobre el desempeño de la decisión actual, más una aproximación del impacto de la decisión actual sobre el futuro. Estas también pueden dividirse en dos clases:

<ol start="3">
<li>Políticas basadas en aproximaciones de función de valor, o VFAs.</li>
<li>Aproximaciones de anticipación directa, o DLAs.</li>
</ol>

Cada una de estas políticas se describe a continuación.

### Aproximaciones de función de política (PFAs)

Las aproximaciones de función de política (PFAs) representan cualquier función analítica que, dadas las entradas de lo que sabemos, produce como salida la acción que debemos tomar. Algunos ejemplos son:

- Las políticas de pedido de inventario a menudo colocan un pedido cuando el inventario cae por debajo de un nivel "s", momento en el cual se realiza un pedido para llevar el inventario hasta "S". "s" y "S" son parámetros que deben ajustarse.
- Un médico puede recetar inyecciones de insulina cuando el A1c de un paciente (que refleja un promedio móvil de 3-5 meses del azúcar en sangre) supera 6.5, y las detiene cuando cae por debajo de 6.0. Nuevamente, estos números deben variarse para encontrar los valores que funcionen mejor.

Las PFAs pueden ser cualquier función analítica, como una función lineal o no lineal. Lo que una PFA no puede incluir, lo cual se encontrará en cada una de las tres clases restantes de políticas, es un problema de optimización incrustado. Las PFAs pueden ser reglas simples, pero también pueden ser funciones no lineales de muy alta dimensionalidad, como una red neuronal.

### Aproximaciones de función de costo (CFAs)

Existen muchos problemas donde el mejor enfoque para tomar decisiones es utilizar una aproximación determinista en un momento dado que ha sido modificada usando varios parámetros que, cuando se ajustan adecuadamente, producen decisiones que funcionan bien a lo largo del tiempo. Este es un enfoque ampliamente utilizado en la práctica, aunque a menudo sin reconocer a) la capacidad de introducir parámetros para ayudar a mejorar las decisiones y/o b) el hecho de no reconocer que los parámetros pueden ajustarse para producir mejores resultados.

El ejemplo más simple de este enfoque se ilustra en la figura 4.2, donde necesitamos elegir qué producto anunciar en redes sociales (podríamos sustituir cualquier problema con opciones discretas listadas en la [sección de prueba y error inteligente](/bridging-vol1/es/chapter-2/#intelligenttrialanderror) del Capítulo 2). Tenemos una estimación puntual del valor de cada producto basada en la experiencia pasada, la cual hemos aprendido que puede involucrar mucho ruido, resultando en algunas estimaciones deficientes. También podemos usar la experiencia pasada para estimar una desviación estándar, que es una medida de la dispersión de la incertidumbre. Típicamente estamos 95 por ciento seguros de que la verdad está dentro de más o menos 2 desviaciones estándar.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoiceMeanStdDev.jpg" alt="Cuando se enfrenta a un conjunto discreto de opciones, la incertidumbre en la creencia sobre el desempeño de cada una puede describirse mediante su valor promedio y su desviación estándar.">
  <figcaption><span class="fig-num">Figura 4.2.</span> Cuando se enfrenta a un conjunto discreto de opciones, la incertidumbre en la creencia sobre el desempeño de cada una puede describirse mediante su valor promedio, y la desviación estándar que captura la dispersión de la creencia.</figcaption>
</figure>

Lo que vamos a hacer es crear un "índice" para cada producto $x$ dado por:

$$
Index_x = \text{Avg.value}_x + \theta \,(\text{std.dev}_x)
$$

Luego vamos a elegir anunciar el producto $x$ que tenga el valor más alto de "$Index_x$". Encontramos el producto $x$ resolviendo el siguiente problema de optimización (que es determinista):

$$
\max_x \{\text{Avg.value}_x + \theta \,(\text{std.dev}_x)\}
$$

Resolver este problema de optimización es bastante simple: solo tenemos que ordenar los valores $\text{Avg.value}_x + \theta (\text{std.dev}_x)$ y encontrar el producto $x$ que tenga el valor más alto (¡y aquí pensabas que la optimización determinista tenía que ser difícil!).

El desafío, entonces, es elegir el parámetro ajustable $\theta$. Si usamos $\theta = 0$, eso significa que simplemente estamos usando nuestra estimación actual. El problema es que si nuestra estimación "$\text{Avg.value}_x$" es baja debido a una racha de mala suerte, podríamos nunca volver a intentar anunciar el producto $x$. Si usamos $\theta = 2$, entonces estamos usando una estimación muy optimista del valor del producto $x$, lo cual fomentará probar productos donde hay un alto nivel de incertidumbre (lo cual no es necesariamente una mala estrategia).

La idea de usar una aproximación determinista parametrizada es excepcionalmente poderosa. Las aerolíneas la usan cuando optimizan sus horarios, donde tienen que usar una estimación de los retrasos por clima para cada vuelo. Si usan la mediana, entonces la mitad de las veces el retraso será mayor de lo anticipado por el horario, lo cual producirá un gran número de llegadas tardías de aeronaves, retrasando los vuelos subsiguientes. Sin embargo, si usamos el percentil 90, entonces podríamos estar introduciendo demasiada holgura en el horario, resultando en una mala utilización de las aeronaves.

Es más fácil pensar en ajustar un conjunto de parámetros $\theta$ en un simulador, pero a menudo ocurre (como en el problema de programación de horarios de aerolíneas) que el problema es demasiado complicado. Por esta razón, puede ser necesario hacer aprendizaje en línea, lo que significa probar diferentes valores en el campo y observar el desempeño real.

### Aproximaciones de función de valor (VFAs)

Imagine que estamos despachando una flota de camiones donde tenemos que asignar conductores para mover las cargas de mercancía desde un lugar de recogida hasta un lugar de entrega. La figura 4.3 ilustra cómo este problema debe resolverse repetidamente a lo largo del tiempo. Lo que decidamos hacer el lunes cambiará las ubicaciones de los conductores el martes y el miércoles. Cada día, los transportistas llaman con nuevos conjuntos de cargas que no se conocen de antemano, por lo que la empresa transportista debe tomar decisiones de asignación el lunes sin saber qué sucederá el martes o el miércoles.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentThreeDays.png" alt="Ilustración del problema de asignar camiones durante un período de tres días." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.3.</span> Ilustración del problema de asignar camiones durante un período de tres días.</figcaption>
</figure>

Optimizar sobre un horizonte de múltiples días en presencia de las incertidumbres es una tarea increíblemente compleja. En su lugar, podemos aproximar el valor de los conductores en el futuro, como se muestra en la figura 4.4. Esto puede hacerse ejecutando simulaciones hacia el futuro, y luego calculando el valor de los conductores en diferentes ubicaciones. Cuando incluimos estos valores (llamados "aproximaciones de función de valor"), el problema que ahora tenemos que resolver el lunes no es más complicado que si ignoráramos por completo el impacto de enviar conductores a diferentes ubicaciones.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmentwithDownstreamVFA.png" alt="Asignación de conductores a cargas utilizando estimaciones del valor de los conductores en el futuro." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 4.4.</span> Asignación de conductores a cargas utilizando estimaciones del valor de los conductores en el futuro.</figcaption>
</figure>

Aproximar el valor de aterrizar en un estado particular es una estrategia muy popular en la literatura de investigación, pero su éxito depende en gran medida de la estructura de un problema particular, y tiende a funcionar bien para un pequeño número de problemas con estructuras especiales.

### Aproximaciones de anticipación directa (DLAs)

Existen muchos problemas donde simplemente tenemos que planificar hacia el futuro para tomar una decisión ahora. Uno de los ejemplos más familiares de una política de anticipación directa es cuando usamos Google maps para planificar una ruta hacia el destino.

Las políticas DLA pueden dividirse en dos subclases:

- Anticipaciones deterministas – Aquí usamos estimaciones puntuales de cualquier cantidad incierta, como los retrasos de tráfico.
- Anticipaciones estocásticas – Aquí queremos modelar explícitamente la incertidumbre que enfrentamos, como los posibles retrasos de tráfico que puedan surgir mientras conducimos hacia nuestro destino. Es útil dividir aún más esta clase en dos tipos:
  - Problemas con opciones discretas - Estos son problemas que típicamente se resuelven con árboles de decisión.
  - Problemas donde las decisiones son vectores - Aquí necesitamos usar las herramientas de la programación matemática para buscar en un espacio multidimensional.

Note que no necesitamos subdividir las anticipaciones deterministas ya que, incluso si la decisión en cada período de tiempo es un escalar, todo el modelo de anticipación requiere optimizar sobre el vector de decisiones que abarca los períodos de tiempo a lo largo del horizonte de planificación.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/GoogleMapslookaheadHoriz.jpg" alt="Ruta planificada por Google maps basada en tiempos de viaje estimados (izquierda); ruta alternativa basada en el riesgo percibido de conducir a través de la ciudad de Nueva York (derecha).">
  <figcaption><span class="fig-num">Figura 4.5.</span> Ruta planificada por Google maps basada en tiempos de viaje estimados (izquierda); ruta alternativa basada en el riesgo percibido de conducir a través de la ciudad de Nueva York (derecha).</figcaption>
</figure>

La figura 4.5 (izquierda) muestra un ejemplo de Google maps planificando una ruta desde Hartford, Connecticut (arriba a la derecha) hasta Princeton, Nueva Jersey (abajo a la izquierda), saliendo a las 4pm de la tarde. Note que la ruta pasa justo por la ciudad de Nueva York, lo cual ocurriría justo alrededor de las 5pm cuando se espera que el tráfico sea más intenso. Google maps usa una estimación puntual, y aun así considera que esta es la ruta más corta.

Por supuesto, cualquier viajero con conocimiento entendería que existe una tremenda incertidumbre en torno a los tiempos de viaje reales a través de Nueva York a las 5pm. La figura 4.5 (derecha) muestra una ruta alternativa que Google proporciona, dándole al viajero la oportunidad de elegir entre una ruta que se espera sea más corta, pero con el riesgo de ser mucho más larga, frente a una ruta ligeramente más larga que se espera esté cerca del tiempo que Google estima.

La primera ruta, entonces, es un ejemplo de una anticipación determinista, pero el usuario puede introducir la incertidumbre al evaluar la recomendación. Al elegir la segunda ruta, estamos resolviendo, de una manera admitidamente ad hoc, una anticipación estocástica.

Cuando estamos planificando hacia un futuro incierto, existe una amplia gama de estrategias para modelar este proceso y ayudar a tomar una decisión ahora. Una estrategia es usar un pronóstico puntual (es decir, una anticipación determinista) pero introducir parámetros ajustables que puedan hacer la solución más robusta.

### Políticas híbridas

Además de las cuatro clases de políticas, podemos crear una variedad de híbridos que combinan dos, tres o incluso las cuatro clases. Algunos ejemplos usando un entorno de cadena de suministro son:

- CFAs con PFAs - Elegir el proveedor de menor costo, pero con reglas para excluir empresas de alto riesgo.
- Anticipación (DLA) con VFA - Optimizar el plan de producción estacional, con funciones que capturan el valor de los inventarios finales.
- Anticipaciones directas deterministas parametrizadas (DLA/CFA) - Planificar el plan de producción estacional usando pronósticos de demanda del percentil $\theta$ (por ejemplo, el percentil 80).
- Política VFA usando PFA - Planificación de distribución usando VFAs para valorar el inventario en cada almacén, pero usando reglas (PFAs) para forzar entregas a ubicaciones específicas.
- VFA con CFA - Comenzar con una política basada en VFA con un modelo lineal, y luego ajustar los parámetros de la VFA lineal para obtener los mejores resultados usando un simulador.

Si bien estas políticas pueden sonar complicadas, es posible describir escenarios específicos donde la toma de decisiones humanas está usando cada una de ellas. Por ejemplo, la política más compleja usa una anticipación estocástica, la cual ilustramos anteriormente usando el problema de navegación con Google maps, donde se eligió una ruta más larga para evitar el riesgo de congestión en la ciudad de Nueva York.

### ¿Qué políticas son las más utilizadas?

Discutir sobre políticas puede sonar complicado y confuso. Es importante recordar que:

- Todos tomamos decisiones. Todos enfrentamos situaciones día a día, ya sea para salir adelante o decisiones que surgen en nuestros trabajos.
- Cuando tomamos decisiones, nuestro cerebro está usando algún método que pertenece a una de las cuatro clases (y posiblemente un híbrido).

Comencemos dividiendo la cuarta clase, DLAs, en dos tipos: anticipaciones determinísticas y anticipaciones estocásticas. Luego vamos a dividir el último tipo, anticipaciones estocásticas, en dos subtipos: problemas donde las decisiones son una de un conjunto de opciones discretas, y problemas donde las decisiones son vectores, tales como asignaciones de activos entre inversiones, o la asignación de máquinas a tareas.

Esto nos da seis tipos de políticas que dividimos en cuatro categorías:

**Categoría 1** - Esta categoría incluye tres tipos de políticas:

- Aproximaciones de función de política (PFAs), que incluyen todas las reglas simples como "cuando hace frío, ponte un abrigo" o "compra un producto cuando esté en oferta." Las PFAs pueden estar basadas en reglas "si estás en este estado, toma esta acción" o pueden ser una función analítica, un tema al que volveremos en el Volumen III.
- Aproximaciones de función de costo (CFAs), que incluyen cualquier método donde tengamos que resolver un problema de optimización determinístico (típicamente una aproximación del problema real que involucra incertidumbre) como nuestro problema de elección discreta en la figura 4.2.
- Aproximaciones de anticipación directa determinística (Det-DLAs), donde planificamos hacia el futuro tal como lo hace Google maps, usando estimaciones puntuales de cualquier cantidad incierta.

Las CFAs y las Det-DLAs implican ambas resolver problemas de optimización determinísticos; la única diferencia es que las CFAs no planifican hacia el futuro, mientras que las DLAs sí lo hacen.

**Categoría 2** - Políticas de anticipación estocástica donde las decisiones son opciones discretas. Aquí modelamos explícitamente la incertidumbre en la evaluación de cada opción. Estas se estudian ampliamente usando el recurso de los árboles de decisión.

**Categoría 3** - Políticas basadas en aproximaciones de función de valor, donde una decisión ahora considera el costo o recompensa inmediata más una estimación del valor futuro de transicionar a algún estado. Esta es una clase avanzada y computacionalmente difícil de políticas que se necesitan para un pequeño conjunto de problemas especializados.

**Categoría 4** - Políticas de anticipación estocástica donde las decisiones son vectores. Esta es una clase de problemas muy compleja que requiere estrategias complejas, ya que una anticipación estocástica es simplemente otro problema de optimización estocástica, con simplificaciones introducidas para reducir la complejidad computacional.

Las políticas de la categoría 1 son usadas por todos, independientemente de su formación formal. Estas políticas son las más simples, pero esto requiere la introducción de parámetros que hay que ajustar, lo cual puede ser difícil.

Los cerebros humanos han desarrollado la capacidad natural de usar las cuatro clases de políticas, al menos en el contexto de opciones discretas. Incluso sabemos cómo cambiar entre las clases sin darnos cuenta. Si estamos jugando ajedrez (y tenemos algo de experiencia con el juego), probablemente estamos haciendo los primeros movimientos de memoria (los jugadores expertos son capaces de ejecutar bastantes movimientos de memoria). Esto es una PFA pura. Sin embargo, en algún momento empezamos a pensar en lo que podría hacer nuestro oponente, lo cual implica una política de anticipación directa, típicamente combinada con VFAs que pueden capturar el valor de perder piezas importantes.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>Dé la definición formal de una decisión, la definición informal, y tres ejemplos de decisiones.</li>
<li>Explique qué se entiende por una "clase de información controlable endógenamente." ¿Cuáles son las otras dos clases de información que se describen en el mismo contexto?</li>
<li>Dé ejemplos de decisiones que caigan en cada una de las siguientes categorías:
  <ol type="a">
    <li>Binaria.</li>
    <li>Un conjunto de opciones discretas con al menos cinco opciones.</li>
    <li>Hay al menos 10,000 decisiones diferentes que deben tomarse en un momento dado.</li>
  </ol>
</li>
<li>Nombre cinco ejemplos de decisiones continuas.</li>
<li>Dé tres ejemplos de cada uno de los tres tipos de decisiones:
  <ol type="a">
    <li>Decisiones que impactan recursos físicos.</li>
    <li>Decisiones que impactan recursos financieros.</li>
    <li>Decisiones que impactan la recolección o distribución de información.</li>
  </ol>
</li>
<li>Nombre tres contextos donde las decisiones deben tomarse en diferentes escalas de tiempo. Describa el contexto y el momento de las decisiones.</li>
<li>Resuma con sus propias palabras las cuatro clases de políticas, y dé un ejemplo de cada una para algún contexto de problema.</li>
</ol>

**Preguntas de modelado**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Dé un ejemplo de una decisión que caiga en cada categoría:
  <ol type="a">
    <li>Una decisión que debe tomarse cada minuto (o más rápido).</li>
    <li>Una decisión que debe tomarse diariamente.</li>
    <li>Una decisión que debe tomarse anualmente.</li>
  </ol>
</li>
<li>Identifique las decisiones implícitas en cada contexto, y el tomador de decisiones que toma cada decisión.
  <ol type="a">
    <li>Un individuo tiene que tomar la medicación prescrita por su médico, quien sigue protocolos elaborados por los desarrolladores del medicamento.</li>
    <li>La red eléctrica tiene que indicarle a una compañía de servicios públicos qué plantas de vapor encender, y cuándo. Las decisiones de programación se toman mediante un modelo de computadora ejecutado el día anterior.</li>
    <li>El gestor de un fondo mutuo tiene que decidir cuánto efectivo mantener disponible para responder a depósitos y solicitudes de rescate de inversionistas individuales (montos pequeños) e inversionistas minoristas (montos grandes).</li>
  </ol>
</li>
<li>Dé tres ejemplos de aproximaciones de función de política. Describa el contexto y cómo funcionaría la PFA.</li>
<li>Dé un ejemplo de una aproximación de función de costo para un problema de elección discreta.</li>
<li>Está usando Google maps para encontrar una ruta que le permita llegar al trabajo a las 8:30am. También tiene que decidir cuánto tiempo dejar de margen para llegar a tiempo. Describa las decisiones que se están tomando, y qué tipo de política se está usando para tomar cada una.</li>
<li>Describa tantas clases de políticas como se le ocurran que podría usar si fuera a diseñar un programa de computadora para jugar ajedrez. Describa cómo se aplicaría cada clase de política que haya identificado.</li>
</ol>
{% endraw %}
