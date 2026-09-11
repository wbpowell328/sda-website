---
layout: book
title: "Capítulo 2: Aplicaciones"
permalink: /bridging-vol1/es/chapter-2/
date: 2026-07-17
book_home: /bridging-vol1/es/contents/
book_data: bridging_vol1_toc_es
lang: es
translated_from: en
translated_from_hash: 021eb6b21e0b2ae0
---


{% raw %}
El primer paso para mejorar cualquier producto, proceso o servicio es proporcionar una descripción básica, y luego identificar posibles métricas de desempeño, tipos de decisiones y fuentes de incertidumbre. Vamos a ilustrar estos primeros pasos utilizando una variedad de contextos de aplicación. Luego recurriremos a estas aplicaciones a lo largo del resto del libro para ilustrar diferentes dispositivos de modelado.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PowellApplications.png" alt="An illustration of the many settings for making decisions." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 2.1.</span> Una ilustración de los muchos contextos para la toma de decisiones.</figcaption>
</figure>

La belleza de los problemas de decisión secuencial es que surgen a lo largo de actividades que involucran personas. La Figura 2.1 es una instantánea de algunos de los contextos de problemas que describen las actividades del autor, y que sirvieron como fundamento motivacional para el trabajo de este libro. Cada imagen representa un conjunto numeroso de problemas de decisión. Esto contrasta fuertemente con clases de problemas como la programación lineal, entera y no lineal, que son herramientas importantes y poderosas, pero que resuelven solo un subconjunto muy limitado de problemas de decisión.

Notamos que existe un sesgo natural a enfocarse en la gestión de recursos físicos, ya que eso es lo que vemos. Sin duda, la gestión de recursos físicos ofrece muchas oportunidades para tomar mejores decisiones, pero hay otras decisiones que abordan directamente la recolección de información, junto con la gestión de los a menudo significativos flujos de dinero requeridos para respaldar estas operaciones.

En este capítulo revisaremos los siguientes contextos de problemas:

- Planificación de inventario
- Gestión de la demanda
- Gestión de energía eléctrica
- Gestión de ingresos hoteleros
- Aplicaciones de salud
- Elecciones presidenciales
- Gestión de flotas de camiones de carga completa
- Gestión de efectivo de fondos mutuos
- Financiamiento de la cadena de suministro
- Ensayo y error inteligente (muchos contextos)

Muchos de estos pueden describirse como dominios de meta-problemas, ya que contienen subáreas que por sí solas representan campos importantes de la actividad humana. Nuestro objetivo es crear un conjunto diverso de aplicaciones, en parte para ilustrar el rango de problemas que caen bajo el paraguas de los problemas de decisión secuencial, y en parte para proporcionar un conjunto diverso de contextos de decisión que motiven el marco de modelado que presentaremos en el resto del libro.

En esta etapa no estamos listos para describir modelos completos – eso llegará en el Volumen II. Para cada aplicación, ofreceremos respuestas a las tres preguntas del proceso de enmarcado, reconociendo que esto es solo una muestra para que el lector comience a pensar en el proceso.

## Primeros pasos – enmarcando el problema

Es muy común discutir problemas complejos utilizando terminología general. La Figura 2.2 (preparada por ChatGPT) responde a la pregunta:

> *Prepara una discusión de una página sobre cómo debería responder una empresa a un aumento repentino de aranceles que perturbará su cadena de suministro.*

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTrespondtoTariff.png" alt="ChatGPT's version of how a supply chain should respond to tariff increases.">
  <figcaption><span class="fig-num">Figura 2.2.</span> La versión de ChatGPT de cómo debería responder una cadena de suministro a los aumentos de aranceles.</figcaption>
</figure>

El problema con estas discusiones generales es que nunca proporcionan un camino claro para mejorar el proceso. Todo en la discusión probablemente sea cierto, pero carece de acciones específicas que puedan tomarse para resolver un problema. La respuesta proporcionada por ChatGPT (en 2025) refleja el tipo de charla genérica ampliamente encontrada en los libros de negocios, que nunca podría ser la base de un modelo formal.

Este capítulo ilustra la primera etapa del enmarcado del problema, que consta de cuatro elementos:

- **La narrativa:** Esta es una breve discusión que describe un problema en el estilo que podría usar alguien dentro del dominio del problema.
- **Métricas de desempeño:** Proporcionamos una lista de métricas de desempeño que deberán priorizarse (esto se cubre en el Capítulo 3).
- **Decisiones:** A continuación proporcionamos una lista de decisiones que impactan una o más de las métricas. Las decisiones se cubren en el Capítulo 4.
- **Incertidumbres:** Finalmente, describimos las formas de incertidumbre que pueden distorsionar el efecto de una decisión al implementarse, o a medida que el proceso avanza en el tiempo. Las incertidumbres se cubren en el Capítulo 5.

En este punto no vamos a intentar describir cómo podríamos resolver el problema (es decir, tomar las decisiones). Para esto, necesitamos otro material que se desarrollará más adelante. El objetivo en esta etapa es usar una variedad de contextos de problemas para ilustrar el proceso de identificación de métricas, decisiones e incertidumbres de manera general. Identificar estos tres elementos es la clave para resolver cualquier problema de decisión, así que debemos desarrollar el hábito de hacerlo primero.

## Capturando interacciones {#capturinginteractions}

Si bien la identificación de métricas, decisiones e incertidumbres es un punto de partida valioso, también es importante entender cómo interactúan.

- **El efecto de las decisiones sobre las métricas** – Cada decisión debería tener algún impacto en al menos una métrica, y cada métrica debería verse afectada por al menos una decisión.
- **Incertidumbre en las métricas de desempeño dadas las decisiones** – Podríamos querer el camino más corto, pero el tiempo de viaje depende de la congestión; podríamos querer elegir un medicamento que reduzca una infección, pero un paciente puede no responder a un medicamento en particular; un inversor no puede predecir el rendimiento exacto al comprar una acción.
- **La incertidumbre puede restringir qué decisiones podemos tomar** – Una empresa de transporte de camiones tiene que mover cargas, pero estas se solicitan de manera aleatoria; un hotel puede reservar habitaciones para viajeros de negocios que pueden o no reservar habitaciones; una empresa de servicios públicos puede contar con energía eólica, pero la cantidad de energía que se puede generar es incierta.
- **La incertidumbre cambia la dinámica de cómo el sistema evoluciona con el tiempo** – La enfermedad en una población puede propagarse de manera incierta; la economía puede evolucionar de manera incierta afectando el valor del dólar; el comportamiento incierto de la competencia puede disminuir las ventas.

### Impacto de las decisiones sobre las métricas

Un ejercicio útil es crear una hoja de cálculo donde diferentes decisiones se listan a la izquierda y las métricas se listan en la parte superior. Luego, utilizando puro juicio, ingrese uno de los siguientes valores en cada celda para capturar lo que cree que describe el impacto de cada decisión sobre cada métrica:

- **H** – La decisión tiene un impacto alto en la métrica.
- **M** – La decisión tiene un impacto medio en la métrica.
- **L** – La decisión tiene un impacto bajo en la métrica.
- **N** – La decisión no tiene impacto en la métrica.

La Tabla 2.1 ilustra cómo podría verse esto para un pequeño problema de inventario. La hoja de cálculo puede descargarse desde [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.1.</span> Matriz de interacción para decisiones y métricas en un problema de inventario con tiempos de espera cortos.</caption>
<thead>
<tr><th>Decisiones \ Métricas</th><th>Ingresos por ventas</th><th>Costos del producto</th><th>Costos de mantenimiento</th><th>Faltantes de existencias</th></tr>
</thead>
<tbody>
<tr><td>Cuándo/cuánto pedir</td><td class="hml-h">H</td><td class="hml-h">H</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>¿Comprar cobertura cambiaria?</td><td class="hml-n">N</td><td class="hml-l">L</td><td></td><td class="hml-n">N</td></tr>
<tr><td>Descuentos</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
<tr><td>Comercializar el producto en redes sociales</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

Comience listando las métricas de izquierda a derecha en orden de importancia. Luego utilizaremos la matriz para identificar las decisiones más importantes, y las métricas más impactadas por las decisiones que ha listado.

La matriz de interacción puede utilizarse de dos maneras:

1. Listar todas las decisiones, y luego evaluar el impacto de cada decisión sobre cada métrica. A partir de esto, identificar las decisiones que parecen tener el mayor impacto en las métricas más importantes.
2. Para problemas complejos, listar todas las decisiones puede ser poco práctico. En su lugar, use el conjunto de métricas para ayudar a identificar las decisiones más relevantes para el problema. Luego regrese a (1) para ayudar a priorizar las decisiones más importantes.

El ejercicio de completar tablas como esta puede ayudar a guiar el proceso de comprensión del papel que juegan las decisiones en la mejora del desempeño, antes de avanzar con el costoso y complejo paso de recolectar datos y construir un modelo computacional.

### Impacto de la incertidumbre dada la decisión

Imagine que hemos tomado una decisión (lo que significa que está fija). Necesitamos entender las formas de incertidumbre que afectan las métricas producidas por la decisión. Para nuestro simple problema de inventario (con tiempo de espera corto), podríamos obtener la matriz dada en la tabla 2.2.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.2.</span> Matriz de interacción para incertidumbres y métricas dada una decisión, para un problema de inventario con tiempos de espera cortos.</caption>
<thead>
<tr><th>Incertidumbre \ Métricas</th><th>Ingresos por ventas</th><th>Costos unitarios</th><th>Costos de mantenimiento</th><th>Faltantes de existencias</th></tr>
</thead>
<tbody>
<tr><td>Ventas (unidades vendidas)</td><td class="hml-h">H</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Tiempos de espera</td><td class="hml-l">L</td><td class="hml-l">L</td><td class="hml-m">M</td><td class="hml-h">H</td></tr>
<tr><td>Errores de pronóstico</td><td class="hml-l">L</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Merma de inventario</td><td class="hml-m">M</td><td class="hml-n">N</td><td></td><td class="hml-n">N</td></tr>
</tbody>
</table>
</div>

Modelar la incertidumbre simplemente significa comprender información que puede surgir en el futuro y que aún no conocemos. Esta observación sencilla a menudo se pasa por alto en las discusiones sobre incertidumbre, que pueden quedar sepultadas en matemáticas sofisticadas ("modelado estocástico") y la cuantificación del riesgo (que pocos entienden).

Al igual que con las decisiones, podemos comenzar listando cada fuente de incertidumbre que se nos ocurra, y luego usar la matriz de interacción para priorizar las que son más importantes. Alternativamente, podemos usar nuestro conjunto de métricas para ayudar a guiar la identificación de fuentes importantes de incertidumbre.

### Impacto de la incertidumbre sobre las decisiones

<figure class="book-figure" style="float:right; max-width: 221px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/AssignmentProblemsimple.png" alt="A simple assignment problem.">
  <figcaption><span class="fig-num">Figura 2.3.</span> Un problema de asignación simple.</figcaption>
</figure>

El contexto más común donde la incertidumbre impacta qué decisiones se le permite tomar surge en el contexto de los problemas de asignación de recursos, donde gestionamos algún recurso (personas, máquinas, suministros de productos, medicamentos) para atender tareas (trabajos, pacientes, clientes). En la figura 2.3 ilustramos la asignación de camiones (con conductores) para mover cargas de flete. La principal fuente de incertidumbre es el flujo de cargas solicitadas por los remitentes para ser transportadas, pero esto podría ser cualquier tarea. Podríamos asignar un conductor a una carga que no es atractiva en términos de rentabilidad, pero que ocupa al conductor durante varios días, impidiendo que sea utilizado en una mejor carga que podría solicitarse más tarde ese mismo día.

El flujo de solicitudes de clientes es una fuente importante de incertidumbre que surge en:

- Gestión de la cadena de suministro (demanda de productos).
- Salud (pacientes que necesitan tratamiento).
- Hoteles (solicitudes de habitaciones para alquilar).
- Energía (la demanda de electricidad o gas para calefacción).
- Finanzas (depósitos y retiros de efectivo).

Una característica importante del flujo de demandas que necesitan ser atendidas es cómo estas demandas se hacen conocidas para el sistema. Algunas variaciones incluyen:

- Sin aviso previo, servicio inmediato (ventas de cualquier producto minorista).
- Sin aviso previo, backlogging posible (compras en línea).
- Solicitud anticipada, compromiso inmediato requerido (reserva de habitaciones de hotel).
- Compromiso anticipado con términos de cancelación (compras costosas, como aeronaves).

También puede haber incertidumbre en la disponibilidad de los recursos utilizados para satisfacer a los clientes:

- Los médicos, enfermeras pueden estar enfermos.
- La maquinaria puede fallar.
- Un conductor de camión puede rechazar una asignación para mover una carga.
- Una inversión puede disminuir de valor.

### Incertidumbre en la dinámica del sistema

Lo que sabemos en un momento dado puede cambiar a medida que avanzamos en el tiempo, y si cambia, típicamente no estamos seguros de cómo está cambiando. Algunos ejemplos de incertidumbre en la evolución del sistema incluyen:

- Cambios en costos, precios y otras métricas de desempeño.
- Cambios en el estado de las personas, equipos e instalaciones a lo largo del tiempo. Las personas pueden renunciar o enfermarse, el equipo puede averiarse, una instalación puede resultar dañada en una tormenta.
- Cambios en las actitudes del mercado, la presencia de enfermedades en una población, cómo las personas podrían votar por un candidato.

Es importante reconocer que la incertidumbre sobre cómo evoluciona el sistema a lo largo del tiempo puede dividirse en dos categorías:

- Incertidumbre en la *función* que describe la evolución del sistema. Algunos se refieren a esto como "incertidumbre del modelo". Si estamos gestionando la distribución de vacunas, podemos usar diferentes modelos de cómo se propaga la enfermedad a través del sistema. Cuando estamos planificando evacuaciones para un huracán, podemos elegir entre diferentes modelos de cómo progresará la tormenta.
- Incertidumbre en los *parámetros* que determinan el comportamiento de la función.

### Incertidumbre en los pronósticos

Hay muchos problemas (pero no todos) donde tomar una decisión ahora requiere proyectar lo que podría suceder en el futuro. Por supuesto, el futuro es casi siempre incierto, pero es nuestra elección si usar una "mejor estimación" de lo que podría suceder en el futuro, o modelar explícitamente esta incertidumbre para ayudarnos a tomar una decisión ahora. Volvemos a este tema en el Capítulo 4 cuando discutamos formas de tomar decisiones.

### Comentarios

La incertidumbre es fácilmente el tema más sutil al entender un problema de decisión. A menudo las personas tienen un sentido intuitivo de que un tipo de incertidumbre es importante; esta sección ayuda a refinar cómo una forma de incertidumbre realmente impacta un problema de decisión.

## Planificación de inventarios {#inventoryplanning}

### Narrativa

Uno de los problemas más ampliamente estudiados en investigación de operaciones (así como en optimización estocástica) es el problema de inventario, que típicamente se plantea como determinar cuándo colocar un pedido para reabastecer, y qué tan grande debería ser el pedido. La descripción clásica de un problema de reabastecimiento de inventario en los libros de texto se representa en la figura 2.4, que muestra el aumento en los inventarios cuando llega nuevo producto, seguido del agotamiento a medida que se consume el producto. Se representa un desabastecimiento, donde el inventario cae a cero.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SimpleInventory.jpg" alt="Ilustración de un problema clásico de inventario con tiempos de espera cortos." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 2.4.</span> Ilustración de un problema clásico de inventario con tiempos de espera cortos.</figcaption>
</figure>

Una versión más realista de un problema de inventario se ilustra en la figura 2.5, que representa un problema de inventario que podría surgir en un entorno donde el producto proviene de una ubicación distante (como de China al este de EE. UU.). Podríamos tener que esperar de 6 a 8 semanas, pero los retrasos por el clima pueden extender esto aún más. El envío a larga distancia típicamente involucra movimiento por buques de contenedores oceánicos para traslados puerto a puerto, ferrocarril (común dentro de EE. UU.) y luego camión.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ComplexInventory.jpg" alt="Ilustración de un problema de inventario con tiempos de espera largos.">
  <figcaption><span class="fig-num">Figura 2.5.</span> Ilustración de un problema de inventario con tiempos de espera largos.</figcaption>
</figure>

La planificación de inventarios debe coordinarse con estrategias para gestionar la demanda, que pueden influenciarse mediante precios, descuentos, promociones y marketing. La gestión de inventarios tiene que lidiar con varias fuentes de incertidumbre, que van desde la variabilidad habitual del día a día en la demanda, hasta cambios de mercado debido al comportamiento de los competidores, nuevas tecnologías, y tanto la pérdida de proveedores como la aparición de nuevas fuentes de suministros. Además, puede haber variaciones significativas en los tiempos de transporte debido al clima, fallas mecánicas y acciones laborales en los puertos. Los retrasos excesivos pueden gestionarse utilizando modos rápidos como el transporte aéreo como alternativa al envío en contenedores, y el transporte por camión completo como alternativa al ferrocarril.

### Métricas

Separamos las métricas entre "métricas base", que se capturan mediante informes rutinarios, y "métricas de riesgo" que específicamente tienen en cuenta eventos significativos (típicamente negativos) que, a juicio de la gerencia, no están adecuadamente capturados en las métricas base.

- **Métricas base**
  - Costos de mantenimiento de inventario, que cubren una gama de elementos que incluyen el costo del capital inmovilizado en el inventario, costos de almacenamiento (calefacción/aire acondicionado, manejo de personal, gastos generales del almacén y equipos), costos de seguro, costo por deterioro, robo, obsolescencia.
  - Costos de envío, incluyendo empaque, transporte y seguro.
  - Ingresos por satisfacer la demanda, que necesitan reflejar cualquier descuento.
  - Métricas de precisión de pronósticos.
  - Métricas de servicio al cliente, tales como demanda retrasada o perdida que no se satisface por falta de inventario, y devoluciones de productos (por ejemplo, debido a problemas de calidad).
  - Costo de promociones, cupones, marketing y publicidad.
  - Utilización de instalaciones (¿están llenas?), personas y equipos.
  - Cuestiones laborales, incluyendo productividad laboral, necesidad de horas extra, costos de contratación y despidos.
- **Métricas de riesgo**
  - Riesgos cambiarios cuando el producto se compra de otro país en una moneda diferente.
  - Desabastecimientos significativos que obligan a los clientes a recurrir a productos de la competencia.
  - Robo, ciberataques.
  - Interrupciones significativas (interrupciones en un proveedor, daños a las instalaciones) que impiden la entrega a los clientes o el empleo.

### Decisiones

Ayuda organizar las decisiones según si estamos resolviendo un único problema de inventario, o abordando cuestiones a nivel de red. Los modelos de inventario de los libros de texto típicamente se centran en decisiones operativas tales como cuándo colocar un pedido y cuánto. Sin embargo, la perspectiva cambia cuando tenemos tiempos de espera largos, donde una decisión ahora impacta el sistema meses hacia el futuro.

La lista de decisiones que son relevantes para la planificación de inventarios es bastante larga. En la [sección de interacciones a continuación](#inventorydecisioninteractions) vamos a usar una herramienta que llamamos "matrices de interacción" para identificar las decisiones más importantes.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.3.</span> Decisiones operativas de inventario y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Si observar/verificar el inventario</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>A quién del conjunto de proveedores disponibles hacerle el pedido (si hay múltiples proveedores)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Cuándo colocar un pedido de reabastecimiento.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cuánto pedir.</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cómo empacarlo (contenedor oceánico, medio contenedor, tarimas, cajas).</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cómo financiar el pedido (transferencia de efectivo, préstamo bancario, ...)</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>La elección de modalidades de transporte para productos del extranjero a instalaciones de almacenamiento intermedias</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>La elección de modalidades de transporte para la distribución nacional a los clientes</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.4.</span> Decisiones tácticas de inventario y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Si comprar coberturas cambiarias para productos del extranjero.</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Descuentos/promociones (para reducir inventario)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Fijación de precios de productos.</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Marketing/exhibiciones (espacio en estantes, exhibición en cabecera de góndola, publicidad (varias formas))</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Realizar pruebas de mercado para características, diseño, ...</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Diseñar e implementar la campaña de marketing</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Elección de proveedor (para cada material o componente), incluyendo si tener múltiples proveedores. Esto determina los posibles proveedores.</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Mantenimiento de equipos (aumenta el tiempo de inactividad programado, disminuye el tiempo de inactividad no programado)</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.5.</span> Decisiones estratégicas de inventario y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Contratos con plataformas de visibilidad de inventario (¿dónde está mi envío)?</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Elección de la metodología de pronóstico de demanda (métodos estadísticos, participación de diferentes personas en toda la organización).</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Diseño del producto (que determina los materiales y componentes requeridos)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Identificación de mercado (a quién le estamos vendiendo)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Cuánta conectividad (intercambio de información) buscar con los socios de la cadena de suministro de manufactura</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

#### Problema de inventario único

Estas decisiones se toman en diferentes escalas de tiempo: operativa (por hora, diaria, semanal), táctica (mensual) y estratégica (trimestral, anual).

- **Operativa** - Estas son decisiones que podrían tomarse en tiempo real, pero típicamente se toman ya sea diaria o semanalmente (tabla 2.3).
- **Táctica** - Decisiones tomadas mensualmente (tabla 2.4).
- **Estratégica** - Decisiones tomadas trimestral o anualmente (tabla 2.5).

#### Diseño de la cadena de suministro

Hay decisiones relacionadas con el diseño de redes de cadena de suministro que atraviesan muchas (desde decenas hasta miles) de decisiones de inventario individuales. Estas son decisiones que típicamente se toman en escalas de tiempo más largas. La tabla 2.6 proporciona algunos ejemplos de decisiones a nivel de red para diseñar la cadena de suministro.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.6.</span> Decisiones de diseño de la cadena de suministro a nivel de red y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Dónde ubicar existencias de reserva y cómo reequilibrarlas</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cierre de instalaciones existentes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Dónde comprar/arrendar/construir/expandir instalaciones de fabricación</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Qué instalaciones de fabricación cerrar/vender, terminar arrendamientos</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Dónde comprar/arrendar/construir/expandir almacenes y centros de distribución</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Si introducir automatización de manejo de materiales en CDs y almacenes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Inversión en tecnologías de información para el intercambio de información y la coordinación</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Organizar una línea de crédito significativa u otra fuente de financiamiento de respaldo</td><td></td><td>&#10003;</td><td></td></tr>
</tbody>
</table>
</div>

### Incertidumbres

Las incertidumbres también ocurren en diferentes escalas de tiempo. Incluimos una categoría especial para las principales interrupciones que pueden ocurrir, pero no de manera regular.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.7.</span> Incertidumbres de inventario de hora a día y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Variaciones diarias en las demandas de los clientes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Errores en la medición de inventarios</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>"Merma" de inventario (robo, pérdida, deterioro, rotura, ...)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Rendimiento del envío (cuántos artículos/cuánto material cumplió con las especificaciones)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Retrasos en el transporte debido al clima, fallos de equipos</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Errores de pronóstico</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Costo de materias primas</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Costo de insumos de proveedores</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Cortes de energía (electricidad, combustibles)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Errores de comunicación, errores de ejecución humana</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Variaciones diarias en el precio de las acciones de la empresa</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Fraude financiero en transacciones individuales</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Disponibilidad diaria de capacidad disponible para asignar</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.8.</span> Incertidumbres de inventario semanales y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Cambios en la demanda media debido a cambios tecnológicos, comportamiento de la competencia, cambios de mercado</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en el precio de venta de un producto (afecta la demanda y los flujos de ganancias)</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Cambios en los precios de las materias primas</td><td></td><td>&#10003;</td><td></td></tr>
<tr><td>Cómo responde el mercado a los cambios de precios</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Retrasos debido a huelgas en puertos, patios ferroviarios, puntos de cruce internacionales</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en el comportamiento de grandes clientes</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en las actitudes en Wall St (por ejemplo, de "crecimiento" a "estable" a "recesión")</td><td></td><td></td><td>&#10003;</td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.9.</span> Incertidumbres de inventario mensuales a anuales y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Aparición de nuevas tecnologías de la información (AWS, IA, plataformas de visibilidad)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Aparición de nuevas tecnologías de fabricación/manejo de materiales (por ejemplo, robótica)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Aparición de nuevos competidores</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en los patrones de población (por ejemplo, crecimiento de la inmigración)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en los patrones de demanda (aumento en la demanda de productos de alta gama)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Tratados que rigen el comercio</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Cambios en la disponibilidad de mano de obra</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.10.</span> Incertidumbres de inventario por interrupciones mayores y qué categoría de recurso afecta principalmente cada una.</caption>
<thead>
<tr><th></th><th>Físico</th><th>Financiero</th><th>Informacional</th></tr>
</thead>
<tbody>
<tr><td>Aparición de nuevas tecnologías de la información (AWS, IA, plataformas de visibilidad)</td><td></td><td></td><td>&#10003;</td></tr>
<tr><td>Aparición de nuevas tecnologías de fabricación/manejo de materiales (por ejemplo, robótica)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Aparición de nuevos competidores</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en los patrones de población (por ejemplo, crecimiento de la inmigración)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Cambios en los patrones de demanda (aumento en la demanda de productos de alta gama)</td><td>&#10003;</td><td></td><td></td></tr>
<tr><td>Tratados que rigen el comercio</td><td>&#10003;</td><td>&#10003;</td><td></td></tr>
<tr><td>Cambios en la disponibilidad de mano de obra</td><td>&#10003;</td><td></td><td></td></tr>
</tbody>
</table>
</div>

*(Nota: la figura fuente de la tabla 2.10 se renderiza de forma idéntica a la tabla 2.9 — marcado para que lo verifique con el manuscrito; el contenido de la fila de "interrupciones mayores" puede necesitar ser sustituido desde un archivo fuente diferente.)*

Identificar las diferentes fuentes de incertidumbre es un área particularmente rica para problemas complejos como las cadenas de suministro. No solo hay una amplia gama de incertidumbres, sino que también se presentan en diferentes estilos, como volatilidad de grano fino, cambios de régimen, picos, ráfagas y eventos raros. Discutimos estos comportamientos con más detalle en el Capítulo 5.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.11.</span> Matriz de interacción para decisiones y métricas de un problema de inventario con tiempos de espera largos.</caption>
<thead>
<tr><th>Decisiones \ Métricas</th><th>Ingresos por ventas</th><th>Costos del producto</th><th>Costos de mantenimiento</th><th>Faltantes de existencias</th><th>Rotaciones de inventario</th><th>Margen operativo</th><th>Crecimiento de ventas</th></tr>
</thead>
<tbody>
<tr><td>Cuándo/cuánto ordenar</td><td class="hml-h">A</td><td class="hml-h">A</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">B</td></tr>
<tr><td>¿Comprar cobertura de divisas?</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-n">N</td></tr>
<tr><td>Descuentos</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>Comercializar producto en redes sociales</td><td class="hml-h">A</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-m">M</td></tr>
<tr><td>Elección de proveedor</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td></tr>
<tr><td>Fijación de precios</td><td class="hml-h">A</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
<tr><td>¿Coberturas de divisas?</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Sensores de inventario</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>¿Usar plataformas de visibilidad para rastrear el producto entrante?</td><td></td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Diseño del producto</td><td class="hml-m">M</td><td class="hml-h">A</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">A</td></tr>
</tbody>
</table>
</div>

### Interacciones {#inventorydecisioninteractions}

Un ejercicio poderoso que ayuda a desarrollar una comprensión de los diferentes elementos de los problemas de decisión es evaluar subjetivamente la fuerza de diferentes tipos de interacciones, una idea que presentamos por primera vez en la [sección de captura de interacciones anterior](#capturinginteractions). Comenzamos describiendo las interacciones entre decisiones y métricas para un problema de inventario con tiempos de espera largos, mostrado en la tabla 2.11. Enfatizamos que completar esta matriz es completamente subjetivo, ya que nos ayuda a identificar las decisiones más importantes, así como las métricas que tenemos mayor probabilidad de mejorar.

Lo que estamos haciendo es reemplazar lo que a menudo es un paso completamente invisible de elegir en qué decisiones enfocarnos, con un proceso que hace explícita esta elección, aunque se haga de forma subjetiva.

La matriz de interacción para incertidumbres y métricas dada una decisión podría verse como la que se muestra en la tabla 2.12. Aquí, nos aseguramos de mantener fija una decisión para evitar mezclar el efecto que tiene la incertidumbre sobre qué decisión tomamos.

<div class="book-table-wrap">
<table class="book-table">
<caption><span class="fig-num">Tabla 2.12.</span> Matriz de interacción para incertidumbres y métricas dada una decisión para un problema de inventario con tiempos de espera largos.</caption>
<thead>
<tr><th>Incertidumbre \ Métricas</th><th>Ingresos por ventas</th><th>Costos unitarios</th><th>Costos de mantenimiento</th><th>Desabastecimientos</th><th>Rotación de inventario</th><th>Margen operativo</th><th>Crecimiento de ventas</th></tr>
</thead>
<tbody>
<tr><td>Ventas (unidades vendidas)</td><td class="hml-h">A</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">A</td><td class="hml-m">M</td><td class="hml-h">A</td></tr>
<tr><td>Tiempos de espera</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-h">A</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-m">M</td></tr>
<tr><td>Errores de pronóstico</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-m">M</td><td class="hml-h">A</td><td class="hml-l">B</td></tr>
<tr><td>Merma de inventario</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Cambios en los precios de las materias primas</td><td class="hml-n">N</td><td class="hml-h">A</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-l">B</td></tr>
<tr><td>Respuesta del mercado al precio</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">B</td></tr>
<tr><td>Paros laborales</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-n">N</td><td class="hml-m">M</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-n">N</td></tr>
<tr><td>Comportamiento de precios de la competencia</td><td class="hml-m">M</td><td class="hml-n">N</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-l">B</td><td class="hml-m">M</td><td class="hml-m">M</td></tr>
</tbody>
</table>
</div>

## Gestión de la demanda – venta de muebles {#demandmanagementfurniture}

### Narrativa

La otra cara de la gestión del flujo de bienes a través de las diferentes etapas de fabricación y distribución es el desafío de gestionar la demanda. Los mayores productores de muebles son China (por amplio margen), Estados Unidos (principalmente para consumo doméstico), Alemania (principalmente para Europa), Italia (muebles de alta gama) y Polonia (muebles de menor costo). Los vendedores de muebles deben trabajar con tiempos de espera largos, demanda altamente estacional y personalización, además de un mercado competitivo. Aunque utilizarán todas las herramientas habituales para gestionar el flujo del producto físico, es importante emplear diversas estrategias para gestionar la demanda y ayudar a equilibrar la oferta con el mercado.

Algunos de los problemas del lado de la demanda que deben enfrentar los vendedores de muebles incluyen:

- Demanda altamente variable, debido en parte a las variaciones en las personas que se mudan a viviendas nuevas.
- Preferencias cambiantes de los clientes, a medida que responden a tendencias de diseño y estilos cambiantes, junto con nuevos productos y materiales.
- Sensibilidad al precio, que refleja tanto el estado de la economía como la competencia.
- Respuesta del mercado a la publicidad y visibilidad en redes sociales.
- Estrategias para la optimización en motores de búsqueda.
- Colaboración con influencers de decoración de interiores que puedan mostrar los productos.
- La capacidad de ofrecer descuentos y promociones para reducir el exceso de inventario.

### Métricas

Las métricas siempre dependen de la perspectiva de quién esté siendo evaluado, pero algunas que esperaríamos en este contexto podrían ser:

- Ventas (en unidades y en ingresos totales).
- Ingresos netos – Ventas, menos el costo de los bienes y la publicidad.
- Desabastecimientos, retrasos en el cumplimiento de pedidos.
- Tráfico web – Existen varias métricas usadas para evaluar los portales de comercio electrónico, como visitas, tasas de clics, tasas de rebote, tiempo en el sitio y conversiones.
- Número de me gusta, compartidos, comentarios, así como menciones de marca y análisis de sentimiento en discusiones en línea.
- Interacción – Uso de vistas previas de realidad virtual.

### Decisiones

Imaginemos que somos el gerente de un local de venta de muebles:

- Qué artículos de mobiliario mantener en existencia.
- Fijación de precios.
- Promociones y descuentos – por ejemplo, descuento para un conjunto de muebles.
- Qué canales de marketing utilizar – redes sociales, TV, correspondencia impresa, marketing en tienda.
- Presupuestos de marketing para cada canal.
- Pruebas A/B de diseños de páginas web.
- Realización de encuestas de mercado – ofrecer paquetes específicos en un subconjunto de tiendas.
- Decisiones de dotación de personal (cuántos, con qué habilidades).

### Incertidumbres

Algunos ejemplos de incertidumbres que pueden surgir al vender muebles incluyen:

- Desviaciones entre la demanda real y el pronóstico de muebles en diferentes niveles de agregación.
- Tiempos de espera del suministro.
- Problemas de calidad del producto.
- Respuesta del mercado al precio, los descuentos y las promociones.
- Disposición del cliente a sustituir productos de mayor o menor calidad.
- Variaciones en las preferencias del consumidor.
- Variaciones en el tráfico web y las tasas de conversión.

## Gestión de la red eléctrica

### Narrativa

Los sistemas de energía son un término general que abarca la vasta red que suministra la energía que sustenta a la sociedad moderna. Vamos a centrar nuestra atención en el flujo de electricidad, pero esto incluye la generación de energía que puede provenir de diferentes fuentes, principalmente gas (pero también algo de carbón y petróleo), nuclear y una presencia creciente de energía eólica, solar e hidroeléctrica.

La columna vertebral de cualquier sistema eléctrico es la red eléctrica, que consiste en líneas de transmisión de alta capacidad que trasladan energía a largas distancias con voltajes elevados, desde 69kv (es decir, 69.000 voltios) hasta 345kv, con líneas de ultra alto voltaje que alcanzan hasta 765kv. Luego, la energía se envía a negocios y residencias mediante redes de distribución local con voltajes entre 4kv y 14kv.

La energía proviene de una "flota" de generadores de energía que pueden incluir plantas nucleares, de carbón, generadores de vapor y turbinas de gas, junto con energía hidroeléctrica (existe una fuerte huella del vocabulario naval debido a la presencia de la energía nuclear). Estos generadores se diferencian por la velocidad con la que pueden encenderse ("despacharse") o apagarse, y con qué facilidad pueden funcionar más rápido o más lento. Las otras características importantes son el costo fijo y los costos operativos. Por ejemplo, la energía nuclear tiene un costo fijo alto y un costo operativo bajo, y debe funcionar de manera continua excepto durante los períodos de mantenimiento. Las turbinas de gas tienen costos fijos mucho más bajos pero costos operativos más altos, y pueden encenderse en menos de una hora. Los generadores de vapor, por otro lado, necesitan entre 8 y 12 horas para calentarse, por lo que generalmente se planifican un día antes.

El uso creciente de energía eólica y solar ha introducido un grado de variabilidad incontrolable al que las redes eléctricas no habían estado expuestas antes. La forma en que se puede manejar esta variabilidad es mediante el almacenamiento, que existe en diferentes formas, pero la más visible es el almacenamiento en baterías a nivel de red. Australia y Florida son dos regiones que han invertido fuertemente en almacenamiento en baterías, pero esto está comenzando a convertirse en una inversión común que acompaña el desarrollo de grandes campos solares y parques eólicos.

Sin embargo, el almacenamiento existe en otras variantes, entre ellas:

- Almacenamiento hidroeléctrico por bombeo, donde el agua se bombea cuesta arriba y luego se utiliza según demanda para generar electricidad al fluir cuesta abajo.
- Almacenamiento de batería a red, donde las baterías de los automóviles y las residencias se utilizan como una forma de almacenamiento en baterías.
- Almacenamiento térmico, donde la energía se almacena calentando un líquido en un tanque grande.
- Gestión de la demanda (o respuesta a la demanda) – Podemos "almacenar" la necesidad de electricidad postergando actividades como el uso de lavadoras y secadoras, o enfriando habitaciones (como bibliotecas) para usar el aire frío más tarde.

La energía es un dominio de problemas particularmente rico en términos de la gestión de diferentes formas de incertidumbre, utilizando distintas tecnologías para generar energía que requieren marcos de tiempo drásticamente diferentes en términos de notificación previa (literalmente, desde 2 segundos para variar la salida de una turbina de gas hasta un año para cambios en los cronogramas de mantenimiento de las plantas de energía nuclear).

Mientras se escribe este libro, la red eléctrica ha estado bajo presión para satisfacer las crecientes demandas derivadas del uso de herramientas de "IA", que requieren centros de cómputo masivos para manejar las demandas de calcular redes neuronales con decenas de miles de millones de parámetros utilizando los tipos de chips especializados de empresas como Nvidia. También hay un crecimiento en el uso del aire acondicionado para hacer frente al aumento de las temperaturas, junto con las demandas de cómputo de las criptomonedas.

### Métricas

Entre el rico conjunto de métricas para la generación de energía se incluirían:

- **El costo de la electricidad** – Esta es, sin duda, la métrica más importante utilizada para evaluar los sistemas de energía, aunque esto es válido para sociedades que pueden asumir disponibilidad de electricidad las 24 horas. Es importante distinguir entre el costo fijo de una inversión (las plantas de energía nuclear son muy diferentes de las turbinas de gas y los paneles solares) y los costos operativos.
- **Cobertura de la demanda/interrupciones** – Existen algunas regiones del mundo que tienen acceso a electricidad solo durante una parte de cada día.
- **Cumplimiento de objetivos de temperatura** – A las personas les gusta vivir en entornos donde la temperatura se mantenga dentro de un rango estrecho. Un gerente de edificio puede enfrentar sanciones por los períodos en que la temperatura de un apartamento cae fuera de un rango especificado. Algunos alimentos y medicamentos deben refrigerarse a ciertas temperaturas, con sanciones cuando esto no se cumple.
- **Impacto en el medio ambiente**, que abarca desde las emisiones netas de CO2, el calentamiento del agua, el consumo de tierra, el impacto en la flora y fauna locales (la lista es bastante extensa).
- **Confiabilidad** – La frecuencia y gravedad de las interrupciones.

### Decisiones

Las decisiones en el sector energético abarcan marcos de tiempo desde segundos (para suavizar las variaciones de voltaje) hasta años, para acuerdos a largo plazo de compra de energía:

- Ajuste de los generadores de energía para la regulación de frecuencia, que ocurre en intervalos de 2 segundos.
- Decisiones de compra de energía (típicamente en intervalos de 5 minutos) que pueden implicar comprar energía de la red o venderla de vuelta a la red.
- Decisiones de comprar o vender energía según los precios actuales de la red.
- Compra y almacenamiento de gas, petróleo y carbón (en algunos casos, hidrógeno).
- Instalación de sensores de red para comprender el estado de las líneas de transmisión.
- Acuerdos de compra de energía, que son contratos para comprar o vender energía durante períodos de varios años.
- La ubicación, el tipo y la capacidad del generador de energía, desde turbinas de gas y plantas de energía nuclear hasta parques eólicos y campos solares.
- La ubicación, el tipo y la capacidad del almacenamiento de energía.
- La capacidad de transmisión de la red, que controla cuánta energía se puede transmitir en un momento dado.

### Incertidumbres

Los sistemas de energía ofrecen un conjunto excepcionalmente rico de incertidumbres que afectan tanto las inversiones en infraestructura como la operación diaria del sistema energético.

- El clima, especialmente la temperatura y la humedad, afecta la demanda en una región.
- La dirección y velocidad del viento para las turbinas eólicas.
- La cobertura de nubes que puede cambiar la intensidad solar.
- Fallas de los generadores debido a eventos climáticos, fallas mecánicas y sabotaje.
- Los precios de la red, que pueden variar tanto en intervalos de 5 minutos (la frecuencia de actualización de los precios de la red) como en intervalos de 2 segundos (para la regulación de energía).
- Actividades humanas como un partido de fútbol o un concierto.
- Cambios regulatorios que pueden afectar desde incentivos fiscales hasta sanciones y restricciones absolutas (por ejemplo, sobre la energía eólica marina, o la construcción de nuevos gasoductos).
- El costo del equipamiento (paneles solares, turbinas eólicas, baterías, turbinas de gas y plantas de energía nuclear) evoluciona continuamente con el tiempo.
- La aparición de nuevas tecnologías, como pequeñas plantas de energía nuclear y nuevas tecnologías de baterías.

El énfasis en las energías renovables ha aumentado la visibilidad de las incertidumbres. La Figura 2.6 muestra la generación solar sobre una base horaria, durante todo un año, lo cual comunica tanto las variaciones estacionales, los ciclos diarios familiares, y los efectos de la cobertura de nubes. De particular importancia es la predictibilidad de las diferentes formas de incertidumbre. Sabemos cuándo se pondrá el sol dentro de décadas en el futuro, pero la cobertura de nubes es particularmente difícil de predecir incluso en horizontes de tiempo muy cortos.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Generación horaria de energía solar durante todo un año." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 2.6.</span> Generación horaria de energía solar durante todo un año.</figcaption>
</figure>

## Gestión de ingresos hotelera

### Narrativa

Los hoteles enfrentan la necesidad de gestionar reservas de habitaciones hasta con un año de anticipación, aunque la mayoría de las reservas llegan en los últimos meses, y en algunos casos, en las últimas semanas. A medida que pasa el tiempo, los hoteles pueden aumentar las tarifas conforme el hotel se va llenando. Normalmente el hotel comenzará ofreciendo tarifas más bajas, pero estas tarifas deben reflejar la posibilidad de que el hotel se llene, lo cual significa posiblemente rechazar a personas que viajan por negocios con una disposición a pagar mucho mayor.

Hay más en la gestión de hoteles que solo el precio cobrado por una habitación. Los hoteles pueden ofrecer una variedad de servicios, desde desayuno gratuito, acceso a gimnasios y piscinas, hasta entradas a servicios locales como pistas de esquí o tours turísticos.

Un canal de publicidad importante son las plataformas de redes sociales como Google y Facebook. Estas plataformas ejecutan subastas sofisticadas donde los anunciantes tienen que pujar dinámicamente por el derecho de publicar enlaces a su página web durante un período de tiempo.

### Métricas

Algunas de las métricas para la gestión de ingresos hotelera incluyen:

- Ingresos totales de cada día de reserva, menos los costos de los servicios ofrecidos.
- Cantidad gastada en búsquedas publicitarias en internet (Google, Facebook, …).
- Utilización de habitaciones.
- Clientes rechazados.
- Habitaciones sin usar.

### Decisiones

Las decisiones que podría tomar un gerente de hotel típicamente incluyen:

- Cuánto cobrar por una habitación $\tau$ días en el futuro.
- En qué plataformas de comercio electrónico anunciarse.
- Cuánto pujar para que sus anuncios se publiquen en cada plataforma de comercio electrónico.
- Qué servicios ofrecer a diferentes tarifas.
- Cómo diseñar la página web.

### Incertidumbres

Los gerentes de hotel deben enfrentar varias fuentes de incertidumbre:

- Reservas totales cada día para una fecha de estadía en particular.
- La tasa de aceptación de una habitación dado el precio y las ofertas de servicios.
- Con qué frecuencia se acepta una puja para anunciarse dado el tamaño de la puja (o la política de pujas).
- La tasa de éxito para los clientes que ven un diseño de página web.

## Aplicaciones de salud

La salud es un tema masivo que literalmente afecta a todo ser humano. Tenemos un fuerte incentivo para tomar decisiones que mantengan o mejoren nuestra salud, mientras nos mantenemos dentro de presupuestos. Los temas a continuación son solo una pequeña muestra del rico conjunto de problemas de decisión que surgen en este contexto.

### Gestión de la diabetes tipo 2

#### Narrativa

Aproximadamente el 10 por ciento de la población mundial tiene diabetes tipo 2, la cual refleja una incapacidad para controlar los niveles de azúcar (glucosa) en la sangre. La diabetes tipo 2 surge cuando el páncreas no produce suficiente insulina, o cuando el cuerpo se vuelve resistente a la insulina. Un fallo en controlar los niveles elevados resultantes de azúcar en la sangre puede producir una serie de condiciones de salud, incluyendo insuficiencia cardíaca y renal, daño a los vasos sanguíneos en los ojos que puede conducir a glaucoma y ceguera, problemas en los pies por mala circulación (a veces requiriendo amputación), y una mayor incidencia de demencia.

Los picos a corto plazo en el azúcar en la sangre (conocidos como hiperglucemia), que pueden ocurrir poco después de comer ciertos tipos de alimentos, pueden producir visión borrosa, dolores de cabeza, fatiga y dificultad para concentrarse. Las caídas en el azúcar en la sangre (hipoglucemia) pueden producir mareos, ritmo cardíaco acelerado, desmayos, convulsiones e incluso coma.

La diabetes, entonces, es una enfermedad que debe ser gestionada tanto a largo plazo como a corto plazo. El azúcar en la sangre elevado durante largos períodos de tiempo puede producir daño permanente a los órganos, mientras que las variaciones a corto plazo pueden crear condiciones médicas que requieren tratamiento inmediato.

#### Métricas

Como con la mayoría de las condiciones médicas, varias de las métricas capturan el estado del paciente, pero hay otras.

- Azúcar en la sangre, medido en mg/dL (el rango típico es 70-130), o mmol/L (rango típico 3.9-7.2), que es una medición instantánea a menudo tomada después de las comidas.
- Azúcar en la sangre en ayunas – Este es el nivel de azúcar en la sangre después de 8 horas de ayuno.
- Tiempo en rango (TIR) – Esto se usa con monitores continuos de azúcar en la sangre y mide el tiempo que el azúcar en la sangre permanece dentro de un rango aceptable.
- Tiempo por encima del rango (TAR) y tiempo por debajo del rango (TBR) – Porcentaje de tiempo que el nivel de glucosa en sangre está por encima o por debajo del rango aceptable.
- Hemoglobina A1c (HbA1c) – Esta prueba refleja un promedio móvil de 2-3 meses, donde los valores deseables están por debajo de 6.5 a 7 por ciento.
- Variabilidad de la glucosa – La desviación estándar del azúcar en la sangre.
- El costo del tratamiento (visitas al médico y medicamentos).
- Frecuencia de necesidad de visitar a un médico.
- Consecuencias médicas de la diabetes, que abarcan dolor en los pies (neuropatía), pérdida de visión, amputación y muerte.

#### Decisiones

Nos desviamos de nuestro estilo habitual de simplemente listar decisiones, y listamos las decisiones médicas tomadas por el médico separadamente de las decisiones tomadas por el paciente.

**Decisiones médicas (tomadas por el médico)**

- Elección de fármacos, niveles de dosificación y momento de administración. La metformina es el fármaco estándar de elección, usado por el 50 a 80 por ciento de los pacientes que toman medicación. Sin embargo, muchos pacientes no la toleran, y tienen que recurrir a una variedad de otros medicamentos incluyendo insulina, sulfonilureas, meglitinidas, inhibidores de DPP-4, y así sucesivamente.
- Prescribir tratamientos asistidos por tecnología, tales como
  - Dispositivos de monitoreo continuo de glucosa.
  - Bombas de insulina, que proporcionan una entrega precisa de insulina.
  - Sistemas automatizados de administración de insulina.
- Intervenciones quirúrgicas, tales como la cirugía bariátrica y el trasplante de islotes pancreáticos.

**Decisiones del paciente**

- Consultar a un médico.
- Seguir las instrucciones del médico.
- Someterse a pruebas, invertir en equipo de pruebas en casa.
- Administrar fármacos.
- Elecciones de dieta – Esto por supuesto representa una amplia gama de decisiones que afectan el tipo de alimento y cantidad.
- Elecciones de ejercicio – Qué tipo, con qué frecuencia, con qué intensidad.

#### Incertidumbres

- Efectos secundarios de un medicamento.
- Qué tan bien responde un paciente a un medicamento (cambio en el nivel de glucosa en sangre).
- Qué tan bien se adhiere un paciente a un programa de dieta y ejercicio.
- Capacidad (y disposición) del paciente para seguir las instrucciones de tratamiento.
- Progresión a largo plazo de la enfermedad a medida que el paciente envejece.
- Disponibilidad de nuevos medicamentos.

### Salud pública – Gestión de kits de naloxona

#### Narrativa

Si bien el uso de drogas y las sobredosis han sido un problema durante décadas, hubo un aumento dramático en las muertes por sobredosis debido a los opioides sintéticos a partir de aproximadamente 2013, superando rápidamente por un amplio margen las muertes por todas las demás drogas. Gran parte de este aumento se debió a la introducción de Oxycontin por parte de Purdue Pharmaceuticals en 1996. Oxycontin contenía oxicodona, que era menos adictiva que otros analgésicos.

La oxicodona tenía una formulación de larga duración que no proporcionaba el "golpe" rápido que los consumidores de drogas buscaban. Sin embargo, el público descubrió que el fármaco podía triturarse y usarse indebidamente, una práctica que se disparó en uso después de 2013. A continuación resumimos las métricas, decisiones e incertidumbres desde la perspectiva de un funcionario de salud pública que trabaja para el gobierno estatal o municipal.

#### Métricas

- Número de sobredosis de opioides donde:
  - Nadie presente tenía naloxona (la persona sobrevivió o murió).
  - La naloxona estaba presente, pero no se administró (la persona sobrevivió o murió).
  - Se administró naloxona (la persona sobrevivió o murió).
- Número de sobredosis donde respondió el servicio de emergencias médicas (EMS).
- Número de sobredosis donde la persona tuvo que ser trasladada al hospital.
- Costo de los kits de naloxona.
- Costo para el sistema de salud.
  - La sobredosis se maneja fuera del hospital (por ejemplo, por EMS).
  - La sobredosis requiere trasladar a la persona al hospital (muy costoso).
- Costos de cumplimiento de la ley.

#### Decisiones

Las decisiones a continuación son desde la perspectiva del gobierno estatal:

- ¿Cuántos kits de naloxona deberían asignarse a diferentes tipos de organizaciones?:
  - Agencias de reducción de daños, proveedores de tratamiento.
  - Organizaciones de servicios directos.
  - Primeros respondedores (EMS, policía, bomberos).
  - Otras organizaciones comunitarias que interactúan con personas que usan drogas (organizaciones religiosas, proveedores de vivienda, bancos de alimentos, etc).
  - Farmacias, hospitales.
  - Cárceles y prisiones.
- ¿Cuántos kits deberían asignarse a los programas de intercambio de agujas por región?:
  - Puntos críticos de sobredosis.
  - Rural vs urbano.
  - Diferentes condados/regiones.
  - Poblaciones en riesgo, como tierras tribales.
- ¿A quién capacitar sobre cómo reconocer y revertir una sobredosis? ¿A quién capacitar sobre cómo usar los kits?
- ¿Cómo anunciar la disponibilidad de los kits de naloxona?
- ¿Cómo financiar la estrategia de distribución de naloxona?
- ¿A quién presentar propuestas para obtener financiamiento?

#### Incertidumbres

- Tasas y patrones de uso por parte de las personas/pacientes. Esto está afectado por:
  - Conciencia – las personas pueden no saber que la naloxona está disponible.
  - Confianza – las personas pueden no sentirse cómodas revelando que la necesitan.
  - Cómo responden las personas al uso de opioides y al tratamiento.
  - Disponibilidad de drogas en el mercado.
  - Barreras de transporte – las personas pueden no poder llegar a un punto de distribución.
- Contaminantes en el suministro que tienen un impacto desconocido en la naloxona y las reversiones de sobredosis.
- Presupuesto asignado para medidas preventivas como los kits de naloxona y la capacidad del personal para distribuirlos.

### Ejecución de ensayos clínicos para pruebas de fármacos {#clinicaltrials}

#### Narrativa

A partir de 2024, había casi 500,000 ensayos clínicos probando varios fármacos y tratamientos para determinar su efectividad. Hay tres fases de un ensayo clínico:

- **Fase I: Pruebas de seguridad y dosificación** ($5–$10 millones) – Se usa un pequeño grupo de personas sanas para probar la toxicidad en diferentes niveles de dosificación e identificar posibles efectos secundarios. Los investigadores también pueden comparar diferentes métodos de administración de un fármaco, tales como pastillas, parches o inyecciones.
- **Fase II: Evaluación de eficacia y efectos secundarios** ($20–$100 millones) - El tratamiento se aplica a un grupo más grande de pacientes que tienen la enfermedad o condición que es el objetivo del tratamiento. Guiada por lo que se aprendió en la Fase I, esta fase proporciona una indicación inicial de la efectividad del tratamiento. Se observan los efectos secundarios, y los resultados se compararán con los tratamientos existentes.
- **Fase III: Pruebas a gran escala** (más de $100 millones) – Usando grupos de cientos, a menudo miles, de pacientes reclutados de diferentes regiones, el tratamiento se compara con terapias competidoras para evaluar la efectividad y observar más a fondo las reacciones adversas. Se recopilan datos adicionales para la revisión regulatoria.

Los ensayos clínicos no solo son muy costosos, también toman mucho tiempo. Durante esta evaluación, el reloj de 20 años de las patentes sigue corriendo, creando un incentivo para llegar a una conclusión (esperanzadamente positiva) para salir al mercado.

El proceso de ejecutar ensayos plantea un gran problema logístico a gran escala para administrar los ensayos y requiere un financiamiento sustancial, lo cual también significa un riesgo financiero considerable. Todo el proceso debe llevarse a cabo en presencia de una incertidumbre considerable sobre el desempeño de un fármaco o tratamiento a gran escala.

Los ensayos clínicos pueden fallar en cualquiera de los tres niveles debido a:

- Falta de eficacia – El fármaco no funciona como se esperaba.
- Preocupaciones de seguridad – Puede haber efectos secundarios significativos.
- Obstáculos regulatorios – El fármaco puede encontrar problemas regulatorios.
- Razones comerciales o estratégicas – Una empresa puede no continuar con un fármaco debido a proyecciones financieras, riesgo financiero, o problemas competitivos.

Las tasas de éxito típicas son:

- Transición de la Fase I a la Fase II: ~60 por ciento.
- Transición de la Fase II a la Fase III: ~30 por ciento.
- Transición de la Fase III a la aprobación: 50-60 por ciento.

La tasa de éxito global a lo largo de todo el proceso es de alrededor del 10 por ciento.

#### Métricas

Existe una variedad de métricas que intervienen en la evaluación de un medicamento:

- Transiciones exitosas de cada una de las tres fases a la siguiente etapa.
- El costo de cada fase.
- El costo de obtener la aprobación regulatoria en cada etapa.
- La efectividad del medicamento o tratamiento.
- La presencia de efectos secundarios.
- Costo de fabricación del medicamento.
- Costo de distribución del medicamento (puede requerir refrigeración).
- Costo de administración del medicamento. (¿Por vía oral? ¿Inyección?)
- Costos de mercadeo.

#### Decisiones

Describimos las decisiones desde la perspectiva de la empresa que posee el medicamento y tiene interés en llevarlo al mercado:

- En cada fase, cada semana existe la decisión de continuar las pruebas, detenerse y terminar la revisión (el medicamento falla), o detenerse y pasar a la siguiente etapa (éxito).
- Cuántos pacientes entrevistar e invitar a formar parte del ensayo.
- Elección de hospitales para usar como sitios de pruebas clínicas.
- Decisión de abrir sitios de pruebas (por ejemplo, en un centro comercial).
- Fijación de precios del medicamento.
- Estrategias de mercadeo: ¿Dirigido al médico? ¿Directo al mercado?

#### Incertidumbres

Las decisiones deben tomarse teniendo en cuenta las siguientes incertidumbres:

- La tasa a la que se pueden identificar personas elegibles.
- La respuesta de las personas al tratamiento.
- Las decisiones de los comités regulatorios.
- La aceptación anticipada del medicamento por parte de los médicos.
- Las decisiones tomadas por competidores que pueden afectar las ventas del medicamento.

## Gestión de una elección presidencial {#presidentialelection}

### Narrativa

Cualquiera que haya visto la serie "West Wing" (o siga de cerca las elecciones presidenciales) ha sido testigo del desafío de gestionar una campaña presidencial. Invariablemente se trata de un problema operativo complejo que requiere gestionar candidatos y personal, a menudo recopilando información (como la realización de encuestas) o difundiendo información (dando discursos), y siempre en un entorno con restricciones presupuestarias.

### Métricas

Algunas de las métricas más importantes incluyen:

- Si el candidato gana o no la elección.
- El número de votos del colegio electoral.
- Encuestas en cada estado (especialmente en los estados indecisos).
- La cantidad de dinero disponible cada semana.
- Donaciones cada semana.
- Donaciones en respuesta a publicaciones en redes sociales.
- Gastos semanales.

### Decisiones

El gerente de campaña debe tomar una serie de decisiones, entre ellas:

- Dónde dar discursos cada día.
- Qué temas enfatizar.
- Elección del candidato a vicepresidente.
- Qué canales publicitarios utilizar (televisión, redes sociales, vallas publicitarias) y las tasas de gasto.
- Gastos en material promocional impreso (carteles, correspondencia, folletos).
- Cuántas personas contratar en distintos niveles, por región.
- Dónde establecer oficinas de campo.
- Cuándo y dónde realizar encuestas, qué preguntas formular.

### Incertidumbres

Las elecciones presidenciales deben gestionarse en presencia de una serie de incertidumbres:

- Cuántos votos recibirá el candidato.
- Cambio en las calificaciones de favorabilidad a lo largo del tiempo, y después de eventos importantes (por ejemplo, la convención nacional).
- Cambio en las calificaciones de favorabilidad después de destacar diferentes temas.
- Donaciones en general, y en respuesta a llamados específicos a donar (por ejemplo, a través de mensajes de texto).
- Sesgos anticipados en las encuestas.
- Eventos en las noticias que impactan la percepción pública (favorable o desfavorablemente) de las políticas del candidato.
- Anuncios de ataque por parte de los oponentes.
- Grandes donaciones a super-PACs favorables o competidores.
- Eventos de salud adversos que afectan al candidato.

## Gestión de flotas de camiones de carga completa

### Narrativa

En los EE. UU., el transporte de carga se mueve principalmente en la modalidad conocida como transporte de carga completa (truckload trucking), donde un cargador llena lo que típicamente es un remolque de 53 pies que puede transportar hasta 46,000 libras (dependiendo del tipo de carga) de una ubicación a otra. Operan de manera similar a los taxis: el conductor del camión (con un tractor) se desplaza vacío para recoger una carga en una ubicación y luego la transporta a otra donde el remolque se descarga o se deja para ser descargado más tarde. Un conductor puede mover una o dos cargas en un solo día, pero la mayoría de las cargas toman entre 1 y 5 días.

Una vez que un conductor entrega una carga, el desafío es minimizar el número de millas que el conductor debe recorrer vacío para recoger otra carga. Tres cuestiones complican realmente la operación de una empresa de transporte de carga completa:

- El movimiento de carga no está equilibrado. Hay regiones del país que producen más carga de la que se consume (esto es particularmente cierto en el medio oeste de EE. UU.) y regiones que son principalmente consumidoras (típicamente las costas y las grandes ciudades). Como resultado, el mercado está dispuesto a pagar mucho más por transportar carga desde regiones productoras hacia regiones consumidoras, mientras que las cargas que salen de regiones consumidoras pueden incluso no pagar lo suficiente para cubrir el costo de operar el camión (pero es mejor que moverse vacío).
- Los conductores de camiones deben cumplir reglas estrictas sobre cuántas horas pueden conducir cada día y cada semana. Además, deben regresar a casa, ya sea diariamente, semanalmente o, en el caso de los conductores de larga distancia, una o dos veces al mes.
- La reserva de carga es altamente dinámica. La mayoría de las cargas se reservan de uno a tres días antes. Una empresa de transporte puede tener que mantener conductores disponibles para satisfacer las necesidades de un cargador importante que solo informa las cargas con un día de anticipación.

Hay más de 2 millones de conductores trabajando en la industria del transporte de carga completa. La mayoría de las empresas de transporte operan con menos de cinco conductores, mientras que otras tienen 10,000 conductores o más.

### Métricas

Las métricas de desempeño más comúnmente reportadas incluyen:

- Beneficio operativo por semana o por milla.
- Ingresos por conductor por semana o por milla.
- Millas vacías como porcentaje del total de millas.
- Millas por conductor por semana.
- Fracción de tiempo en que los conductores regresan a casa a tiempo.
- Porcentaje de veces que las cargas se recogen y entregan a tiempo.
- Rotación de conductores (número de conductores que renuncian por semana).

### Decisiones

Las decisiones desde la perspectiva del gerente encargado del despacho y la planificación de cargas podrían incluir:

- A qué carga debe asignarse un conductor.
- Si se debe aceptar una carga que se ofrece para ser recogida en el futuro.
- Si una carga debe ser manejada por los propios conductores del transportista o por una división de corretaje (que encuentra operadores propietarios que pueden mover la carga).
- Qué precio debe ofrecer la empresa de transporte para mover carga para un cargador en un carril de tráfico particular (par origen-destino) durante el próximo año. Esto es parte de un proceso anual de "licitación" que determina el transportista preferido para cada cargador en cada carril.
- Cuántos conductores contratar que vivan en una ubicación particular (llamada domicilio del conductor).
- Cuántos tractores y remolques debe operar la flota.

### Incertidumbres

Algunas de las incertidumbres que enfrenta el transporte de carga completa incluyen:

- Cuántas cargas se ofrecerán cada día, en cada carril, por parte de los principales cargadores a los que el transportista presta servicio.
- Cuántas cargas estarán disponibles para ser transportadas, y a qué precio, en los "tableros de carga" públicos de los que cualquier transportista puede elegir.
- Si un conductor aceptará la asignación a una carga particular.
- Si los volúmenes de carga están en tendencia ascendente o descendente.
- Cuáles son los precios spot actuales.
- Si una carga en un tablero de carga externo estará realmente disponible si el transportista decide moverla.

## Gestión de efectivo en un fondo mutuo

### Narrativa

Un gerente de un fondo mutuo que había tomado un curso de planificación de operaciones para su MBA se encontró con un problema clásico conocido como el "problema del vendedor de periódicos" (newsvendor problem). Los problemas del vendedor de periódicos surgen cuando se debe decidir sobre una cantidad de un recurso (por ejemplo, periódicos) para asignar y así atender una demanda que no se conoce en el momento de tomar la decisión. Si se asigna demasiado, quedarán recursos sobrantes, asumiendo que estos no pueden guardarse para el futuro (tal como los periódicos de hoy no tienen valor mañana). Si se asigna muy poco, entonces se tendrá demanda insatisfecha.

Después de terminar su MBA (en una escuela de negocios de primer nivel), el gerente del fondo mutuo enfrentó el problema de decidir cuánto efectivo mantener disponible para atender las solicitudes de rescate. El problema se resume en el correo electrónico que se muestra en la figura 2.7, pero los elementos centrales son los siguientes:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/MutualFundemail.png" alt="Correo electrónico de un gerente de fondo mutuo y antiguo estudiante de MBA en busca de consejo sobre cómo gestionar el saldo de efectivo.">
  <figcaption><span class="fig-num">Figura 2.7.</span> Correo electrónico de un gerente de fondo mutuo y antiguo estudiante de MBA en busca de consejo sobre cómo gestionar el saldo de efectivo.</figcaption>
</figure>

- El fondo mutuo debe mantener suficiente efectivo para atender las solicitudes de rescate. Si no hay suficiente efectivo disponible cuando llega una solicitud de rescate, tendrán que liquidar acciones, incurriendo en costos de transacción, y posiblemente verse forzados a vender a un precio más bajo. Si mantienen demasiado efectivo, entonces están perdiendo la oportunidad de crecimiento potencial de las inversiones en el mercado.
- Existen dos tipos de clientes: inversores minoristas e institucionales. Los rescates para inversores minoristas pueden tardar varios días en liquidarse, mientras que las solicitudes de rescate más grandes de los inversores institucionales deben liquidarse el mismo día.
- Los depósitos y las solicitudes de rescate están correlacionados con el desempeño del mercado. El crecimiento en el mercado puede atraer nuevos depósitos, mientras que las caídas pueden desencadenar solicitudes súbitas de rescate.

### Métricas

Las métricas involucradas en este ejercicio incluyen:

- Rendimiento general de la cartera cada día, neto de los costos operativos (costos de transacción, gastos de rescate).
- Cantidad de efectivo que se mantiene.
- Ventas requeridas para cubrir las solicitudes de rescate.

### Decisiones

Las decisiones que enfrenta el gerente del fondo mutuo son:

- Cuánto efectivo mantener.
- Qué activos vender para obtener efectivo.
- Qué activos comprar cuando hay demasiado efectivo disponible.

### Incertidumbres

Las decisiones deben tomarse frente a las siguientes incertidumbres:

- Depósitos de inversores minoristas o institucionales.
- Solicitudes de rescate de inversores minoristas o institucionales.
- Cambios en los índices de mercado.
- Cambios en las tasas de interés.

## Finanzas de la cadena de suministro {#supplychainfinance}

### Narrativa

Cada transacción de la cadena de suministro que involucra la compra o venta de materias primas, componentes y productos finales implica un flujo de dinero, creando una red compleja de flujos entre compradores y vendedores (en todos los niveles de la cadena de suministro), junto con socios financieros externos que pueden proporcionar financiamiento y seguros.

Los pasos en una transacción financiera típicamente incluyen:

- El proveedor envía bienes y facturas al comprador.
- El comprador aprueba la factura en su sistema ERP.
- Una vez aprobada, el proveedor puede optar por recibir el pago anticipado por parte del financista (que podría ser un banco).
- El financista paga al proveedor (típicamente con un descuento).
- El comprador paga al financista al vencimiento de la factura (quizás 60 o 90 días después).

Existe una variedad de transacciones financieras que pueden ocurrir, tales como:

- Aprobación de factura: el comprador confirma que la factura es válida y está pendiente de pago.
- Cesión de cuentas por cobrar: el proveedor cede la factura al financista.
- Pago anticipado: el financista paga al proveedor antes de la fecha de vencimiento.
- Pago al vencimiento: el comprador paga al financista en la fecha de vencimiento acordada.
- Tarifas/descuentos de transacción: el financista obtiene una tarifa de la transacción.

Existen varias fuentes de incertidumbre en la gestión de la cadena de suministro que tienen un impacto en las finanzas. Las empresas pueden protegerse utilizando diferentes formas de seguro. Algunos ejemplos son:

- Seguro de inventario - Protege los bienes almacenados en bodegas o en tránsito (incluyendo centros de logística de terceros) contra robo, daño o pérdida.
- Coberturas de divisas para proteger contra cambios en el valor relativo de diferentes monedas al importar desde otros países.
- Seguro de crédito comercial - Protege a proveedores o prestamistas contra el riesgo de impago del comprador debido a insolvencia, incumplimiento prolongado, o eventos políticos.
- Seguro de carga marítima - Cubre la pérdida física o daño a bienes en tránsito—por tierra, mar o aire—durante el envío internacional o doméstico.
- Seguro de riesgo político - Protege contra pérdidas debidas a inestabilidad política, tales como expropiación, inconvertibilidad de moneda, restricciones de importación/exportación, guerra o disturbios civiles.
- Seguro de fianza de cumplimiento - Garantiza que un proveedor o contratista cumplirá con las obligaciones contractuales. Asegura a los compradores contra el fallo del proveedor.
- Swaps de incumplimiento crediticio - Utilizados por instituciones financieras para cubrirse contra el riesgo crediticio de contraparte.

### Métricas

Existe una lista bastante larga de métricas financieras utilizadas por las grandes empresas. Una muestra de aquellas directamente relacionadas con la gestión financiera de una cadena de suministro incluye:

- EBITDA – Ganancias antes de intereses, impuestos, depreciación y amortización. Esta es una métrica de alto nivel que captura el costo de bienes vendidos (COGS), los ingresos, y todos los costos incurridos para gestionar el flujo de efectivo y capital.
- Retorno sobre el patrimonio (ROE) y ganancias por acción (EPS).
- Flujo de caja libre.
- Capital de trabajo y reservas de efectivo.
- Ratio de deuda a patrimonio.
- Gasto por intereses.

### Decisiones

Una muestra de decisiones tomadas por un director financiero incluye:

- Elección de estrategias de financiamiento para diferentes transacciones.
- Elección de formas de seguro (ver lista anterior).
- Cuánto efectivo mantener, y en qué cuentas.
- Pagos de dividendos.
- Asignación de capital.
- Financiamiento mediante deuda vs. patrimonio.

### Incertidumbres

Nuevamente, una pequeña muestra de diferentes formas de incertidumbre que surgen en las finanzas de la cadena de suministro incluye:

- Incumplimientos de pago por parte de compradores y vendedores.
- Variaciones cambiarias.
- Cambios en aranceles y restricciones comerciales.
- Riesgo de recesión, cambios en las ventas generales (al alza o a la baja).
- Volatilidad de las tasas de interés.
- Volatilidad del mercado crediticio.

## Ensayo y error inteligente {#intelligenttrialanderror}

### Narrativa

Existe una enorme clase de problemas en la toma de decisiones que se puede describir mejor como "ensayo y error inteligente." Estos surgen cuando hay un conjunto de opciones discretas, y donde el desempeño de cada opción es incierto. Ejemplos de contextos de problemas donde esto surge incluyen:

- **Ciencia de materiales**
  - Qué químicos combinar para crear un nuevo material.
  - A qué temperatura ejecutar un proceso.
  - Qué pasos seguir en el proceso de fabricación.
- **Salud**
  - Qué medicamento probar para tratar una condición.
  - Si realizar una prueba (imágenes, análisis de sangre).
  - Dónde ubicar una clínica para distribuir kits de naloxona.
- **Comercio electrónico**
  - Cuál de dos diseños de página web usar.
  - Qué producto anunciar en una página web para maximizar los ingresos.
  - Qué precio cobrar por un producto (de un conjunto de precios posibles).
- **Manufactura**
  - Optimizar un proceso de fabricación de semiconductores (temperaturas, tiempo en un baño químico, concentraciones químicas, diámetro de la oblea de silicio).
- **Finanzas**
  - Encontrar los mejores ajustes para los parámetros de una política de negociación.
  - Qué proveedor utilizar, dado el riesgo de incumplimiento.
  - Cuánto capital de reserva mantener.
- **Gestión de la cadena de suministro**
  - Qué proveedor utilizar para un producto dada la incertidumbre sobre la calidad del producto.
  - Establecer los puntos de reorden para el reabastecimiento de existencias.
  - Qué canales publicitarios utilizar.
- **Elección de personas**
  - Béisbol – Quién debería batear cuarto, o jugar de receptor.
  - Baloncesto – Quién debería jugar cada posición.
  - Gestores de portafolio – Quién obtiene los mejores resultados gestionando un portafolio.

Cada uno de estos contextos implica elegir entre un conjunto de opciones. Queremos elegir la que funcione mejor, pero no estamos seguros de qué tan bien se desempeñará cada una. La situación se representa en la figura 2.8. Puede haber dos opciones, docenas, cientos, y muchos miles.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoices2.jpg" alt="A set of discrete choices.">
  <figcaption><span class="fig-num">Figura 2.8.</span> Un conjunto de opciones discretas.</figcaption>
</figure>

Este problema básico se presenta en una variedad de formas:

- **Modelo de creencia**
  - Creencias independientes – Esto es cuando nuestra creencia sobre una opción no está relacionada con las creencias sobre otras opciones. En aplicaciones reales, esto es relativamente raro.
  - Creencias correlacionadas – Las opciones pueden compartir características, como medicamentos de la misma familia, un estilo de camisa con diferentes colores, o la "cercanía" de dos opciones, especialmente si representan un precio discretizado, o una concentración, o una ubicación geográfica.
  - Modelos paramétricos – Podemos construir nuestras creencias utilizando un modelo paramétrico, como un modelo lineal que relaciona diferentes precios con las demandas estimadas.
- **Costo de realizar una prueba**
  - Experimentos económicos – Observar cuántas veces se hace clic en un anuncio en una página web es una forma muy económica de realizar un experimento. Los marcos de tiempo pueden abarcar desde microsegundos hasta segundos y minutos.
  - Experimentos costosos – Un experimento de laboratorio puede tomar de un día a una semana (o más). Simulaciones computacionales complejas pueden tomar de horas a una semana o más.
- **Nivel de ruido**
  - Los experimentos de bajo ruido producen estimaciones precisas a partir de una sola prueba.
  - Los experimentos de alto ruido producen resultados muy ruidosos, requiriendo múltiples pruebas con la misma opción o opciones similares.
- **Aprendizaje fuera de línea vs. en línea**
  - El aprendizaje fuera de línea describe experimentos realizados en un laboratorio o simulación computacional, donde podemos tolerar un desempeño deficiente de un experimento.
  - El aprendizaje en línea describe el aprendizaje realizado en campo, donde tenemos que vivir con el resultado de un experimento (como probar el precio de un producto, o cómo funciona un medicamento en un paciente).
- **Presencia de recursos físicos o financieros** – Los problemas básicos de aprendizaje se vinculan de un experimento a otro puramente sobre la base de lo que aprendemos. Sin embargo, es posible que los problemas estén vinculados por un recurso físico (o financiero):
  - Puede haber un presupuesto fijo para realizar experimentos. Cada experimento consume una porción del presupuesto.
  - Los experimentos físicos pueden requerir inventarios de ingredientes que deben estar disponibles.
  - Un experimento puede requerir una máquina que esté configurada para realizar una tarea específica, lo que significa que es más fácil hacer otros experimentos que necesiten la misma configuración.
- **Experimentos secuenciales o paralelos**
  - Experimentos secuenciales:
    - Un paciente puede ser utilizado para probar un medicamento a la vez para determinar cuál funciona mejor en ese paciente.
    - Un fabricante puede ser capaz de probar un proceso a la vez para determinar cuál produce el mayor rendimiento.
  - Experimentos paralelos:
    - Un minorista puede ejecutar múltiples campañas promocionales (por ejemplo, publicidad en tienda) en diferentes tiendas para aprender cuál funciona mejor.
    - Un científico puede probar docenas o cientos de compuestos diferentes en una sola placa para ver cómo reaccionan a un tipo particular de célula cancerosa.
- **Aprendizaje instantáneo vs. con retraso**
  - Aprendizaje instantáneo - Hacemos una elección (por ejemplo, ejecutar un experimento) y aprendemos los resultados de inmediato.
  - Aprendizaje con retraso - Hay un retraso temporal entre cuándo ejecutamos un experimento y cuándo aprendemos el resultado. Los retrasos pueden ser de minutos en entornos de alta velocidad, hasta un año o más, como ocurriría cuando un banco ofrece un préstamo, y tiene que esperar años para saber si el receptor del préstamo incumple los pagos o entra en default.

Cualquiera de estos entornos aún puede describirse mediante nuestro trío de métricas, decisiones e incertidumbres.

### Métricas

Se asume que cualquier "experimento" devuelve una observación de desempeño, ya sea el número de clics en un anuncio, o la respuesta de un paciente a un medicamento, o el rendimiento de un proceso de fabricación de semiconductores. Por supuesto, puede haber más de una métrica para describir el desempeño, la cual podríamos desear optimizar en alguna combinación. Sin embargo, debemos distinguir dos dimensiones importantes del desempeño:

- El costo de probar cada opción.
- El desempeño promedio en algún horizonte.
- La variabilidad alrededor del promedio, que captura la confiabilidad de un proceso.
- La probabilidad de resultados "deficientes".
- Otras métricas de desempeño, como los efectos secundarios de un medicamento, o el potencial de pérdidas significativas en la cuota de mercado.

### Decisiones

Esto es simple – es el conjunto de opciones. Estas podrían ser:

- **Binarias** – Tales como
  - Si tomar una acción (vender una empresa, lanzar un nuevo producto, enviar un medicamento a ensayos clínicos) o no.
  - Si mantener o vender un activo.
  - Cuál de dos diseños de página web usar (a menudo llamado pruebas A/B).
  - Si darle un medicamento a un paciente, o no.
- **Conjunto discreto** – Esto podría ser un conjunto de proveedores, una elección de diferentes tratamientos médicos, diferentes canales de marketing para anunciar un producto, o cualquiera de un conjunto de miles de compuestos moleculares a ser probados en el desarrollo de medicamentos.
- **Un conjunto discretizado de valores de un parámetro continuo**, como el precio de un producto, la concentración de un químico, la temperatura para hornear un semiconductor.

Hay problemas donde el conjunto de opciones no es obvio. Por ejemplo, podríamos estar buscando un proveedor que pueda fabricar un componente especializado a partir de un nuevo material que requiere trabajar a altas temperaturas. O necesitamos un químico muy especial para fabricar una nueva vacuna, o una forma extremadamente pura de un gas que se necesita en el proceso de fabricación de los últimos chips semiconductores. Encontrar proveedores, o materiales, o químicos, que se ajusten a una necesidad puede ser extremadamente desafiante.

Luego habrá problemas en los que conocemos nuestra métrica de desempeño, pero no sabemos cómo mejorarla. Un fabricante de cemento puede necesitar reducir costos para ser competitivo, pero no tiene una estrategia clara sobre cómo lograrlo. Un médico quiere tratar una condición en un paciente pero no sabe qué tratamiento seguir.

### Incertidumbres

Las incertidumbres para los problemas de elección discreta (ensayo y error) pueden presentarse en dos formas:

- El desempeño de una opción, que típicamente difiere de cómo pensamos que se desempeñaría cuando decidimos usar esa opción. Podemos tener una estimación puntual de la(s) métrica(s) para cada opción, o alguna forma de distribución. El desempeño real típicamente es diferente de la estimación puntual, y si se nos da una distribución de posibles resultados, el resultado real puede no necesariamente provenir de una distribución asumida.
- Si la opción está disponible – Algunos ejemplos son:
  - La opción puede ser un proveedor, quien no puede ofertar en un contrato.
  - La opción puede ser una persona para ocupar un puesto de trabajo, pero puede no estar dispuesta a aceptar el trabajo.
  - Podríamos querer usar un tipo de material, pero problemas en la cadena de suministro pueden restringir su disponibilidad.

## Ejercicios

Cuando un ejercicio solicite una matriz de interacción, puede usar la plantilla para la "Matriz de Interacción de Framing" que se puede descargar de [tinyurl.com/InteractionMatrix/](https://tinyurl.com/InteractionMatrix/).

<ol class="book-exercises">
<li>Para el problema de inventario, elija un producto que le resulte familiar (por ejemplo, alimentos, ropa, artículos del hogar, medicamentos o herramientas) y responda lo siguiente:
  <ol type="a">
    <li>Identifique métricas, decisiones e incertidumbres que parezcan relevantes para su problema, usando las listas de cada dimensión de la sección de inventario como guía.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de gestión de la demanda:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que enfrentaría un gerente de tienda en un establecimiento minorista de muebles.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de la red eléctrica:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que se enfrentarían al realizar la planificación diaria de los generadores de energía.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de gestión de ingresos hoteleros:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que se enfrentarían al gestionar las reservas de habitaciones a lo largo de un horizonte de planificación de dos meses.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de manejo de la diabetes tipo 2:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que enfrentaría un médico al tomar decisiones sobre un paciente con diabetes tipo 2.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de gestión de kits de naloxona:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que enfrentaría un gobierno estatal al planificar la asignación de kits de naloxona a distintos condados utilizando fondos del gobierno federal.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de llevar a cabo una elección presidencial:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que enfrentaría el jefe de campaña de un candidato que se postula para presidente.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Para el problema de gestionar una flota de camiones de carga completa:
  <ol type="a">
    <li>Elija un conjunto de métricas, decisiones e incertidumbres que usted considere que se enfrentarían al planificar el problema de aceptar qué cargas mover (típicamente realizado hasta siete días en el futuro).</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Considere el problema del saldo de efectivo de un fondo mutuo:
  <ol type="a">
    <li>El correo electrónico del gerente del fondo mutuo sugiere una manera de decidir cuánto dinero mantener en efectivo. Escriba esa fórmula.</li>
    <li>Utilice la Matriz de Interacción de Encuadre para crear matrices de interacción que capturen su mejor estimación del impacto de cada tipo de decisión sobre cada métrica de desempeño.</li>
    <li>Repita (b) para capturar su mejor estimación del impacto de cada tipo de incertidumbre sobre cada métrica de desempeño.</li>
  </ol>
</li>
<li>Nombre un ejemplo de un problema de "ensayo y error" que usted encuentre en su propia experiencia, donde tenga que tomar la misma decisión repetidamente.
  <ol type="a">
    <li>Describa el contexto del problema de ensayo y error, y qué desencadena la necesidad de tomar la decisión nuevamente.</li>
    <li>Describa las métricas (una o más si es necesario), el conjunto de opciones y todas las formas de incertidumbre que surgen en el proceso de toma de decisiones.</li>
    <li>Sugiera cómo procedería usted para tomar una decisión.</li>
  </ol>
</li>
</ol>

{% endraw %}
