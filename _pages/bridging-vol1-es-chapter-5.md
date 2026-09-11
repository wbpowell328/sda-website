---
layout: book
title: "Capítulo 5: Incertidumbres"
permalink: /bridging-vol1/es/chapter-5/
date: 2026-07-17
book_home: /bridging-vol1/es/contents/
book_data: bridging_vol1_toc_es
lang: es
translated_from: en
translated_from_hash: cac007f7f894240f
---


{% raw %}
<p class="book-byline"><em>Tendiendo puentes entre problemas de decisión, Volumen I — Enmarcando el problema</em> &middot; Warren B. Powell</p>

Los problemas de decisión secuencial invariablemente tienen que enfrentar la incertidumbre, que suele ser la dimensión más desafiante al tomar decisiones a lo largo del tiempo. Hay tres maneras en que la incertidumbre afecta el desempeño de nuestro sistema:

1. La decisión que tomamos en un punto en el tiempo no se implementa correctamente.
2. El desempeño del sistema dada nuestra decisión no es el mismo que estimamos cuando tomamos la decisión.
3. El impacto de una decisión tomada ahora sobre el futuro no se estima correctamente debido a cambios a medida que avanzamos en el tiempo.

Aunque solo enumeramos tres maneras en que la incertidumbre afecta el desempeño, la incertidumbre surge en muchas formas, razón por la cual algunas formas de incertidumbre a menudo se pasan por alto en el proceso de modelado. De hecho, la mayoría de los usos de herramientas de optimización ignoran todas las formas de incertidumbre, reflejando típicamente el aumento dramático de incertidumbre que introduce el modelado explícito de cualquier forma de incertidumbre.

Un objetivo de este capítulo es resaltar las diferentes maneras en que puede surgir la incertidumbre. Esto no significa que los modelos deban incorporar todas las formas de incertidumbre. Sin embargo, la decisión de ignorar una forma de incertidumbre debería ser una elección explícita, y no simplemente porque un modelador la pasó por alto.

## Las 12 clases de incertidumbre {#12classesofuncertainty}

Una manera de abordar la identificación de fuentes de incertidumbre es trabajar hacia atrás a partir de un modelo matemático. A continuación se presentan 12 clases de incertidumbre creadas desde la perspectiva de cómo la incertidumbre puede entrar en un modelo. Los problemas complejos, como gestionar una cadena de suministro, un sistema energético o resolver un problema de salud pública, involucrarán las 12 clases, mientras que problemas simples como jugar al ajedrez pueden involucrar solo una.

Existe cierta superposición entre las clases, así que no se preocupe si hay alguna ambigüedad respecto a dónde ubicar una fuente de incertidumbre. Lo importante es identificar tantas formas diferentes de incertidumbre como sea posible.

1. **Errores de observación** – Estos representan errores en cantidades y parámetros que tenemos que observar del entorno. Algunos ejemplos podrían ser:
   - El inventario actual de un producto tal como está representado en la computadora, que puede no coincidir con lo que realmente hay disponible.
   - Radiografías médicas de un paciente para detectar cáncer.
   - La fracción de votantes que prefiere a un candidato particular para un cargo político.
2. **Incertidumbre exógena** – Esta es información que llegará a nuestro sistema después de tomar una decisión, tal como:
   - La demanda de un producto que se vende en el mercado.
   - El cambio en el precio de una acción.
   - El tiempo requerido para conducir de una ciudad a la siguiente.
   - La cantidad de efectivo que puede depositarse o retirarse mañana.
   - Cómo responde un paciente a un tipo de medicación.
3. **Incertidumbre pronóstica** – Estos son errores en pronósticos de demandas, precios, tiempos de viaje (cualquier cantidad que pudiéramos estar pronosticando).
4. **Incertidumbre inferencial** – Esto captura la incertidumbre en nuestras estimaciones del estado del mundo en este momento. Esto podría incluir:
   - Cómo podría responder el mercado a un cambio de precio. Podríamos pensar que hay una caída del 10 por ciento en la demanda por un aumento del 5 por ciento en el precio, pero el valor real podría ser que la demanda caiga un 12 por ciento.
   - Pensamos que un paciente con cáncer está en etapa 2, pero podría estar en etapa 3. Podríamos detectar cáncer de mama, pero pasar por alto que se ha propagado a otros órganos.
   - Una campaña presidencial puede pensar que \$10 millones en gasto publicitario en un mercado importante podrían producir un aumento del 2 por ciento en la favorabilidad de un candidato, pero la realidad puede ser mayor o menor.
5. **Incertidumbre experimental** – Esto describe la variación al ejecutar experimentos repetidos, ya sea en un laboratorio, un simulador, o en el campo:
   - Un fabricante ejecuta experimentos de un proceso para fabricar obleas de silicio. La prueba puede repetirse 10 veces, produciendo una dispersión de rendimientos entre el 70 y el 90 por ciento.
   - Una empresa está evaluando una nueva campaña de marketing ejecutándola en cinco mercados de prueba diferentes. Habrá variaciones entre los mercados, y a lo largo del tiempo.
   - Se utiliza un simulador de computadora para probar el desempeño de una política de pedidos de inventario. Cada ejecución del simulador producirá resultados diferentes.
6. **Incertidumbre del modelo** – Esta es un concepto general que puede abarcar múltiples fuentes de incertidumbre, pero una de las más importantes es la incertidumbre en el modelo de cómo evoluciona un proceso a lo largo del tiempo. Ejemplos podrían ser:
   - Cómo responde el clima a cambios en las políticas de control de carbono.
   - Cómo responde un paciente a inyecciones de insulina.
   - Cómo se propaga una enfermedad en una población en respuesta a cambios en las políticas relacionadas con la distribución de vacunas.
7. **Incertidumbre transicional** – Este es el ruido en cómo responde un sistema a un control. El ejemplo más simple sería controlar la trayectoria de un cohete o aeronave, que es sacudida por el viento. Típicamente asumimos que la evolución del sistema es conocida y determinista, pero se ve afectada por un proceso exógeno (como el viento).
8. **Incertidumbre de implementación** – Puede haber una diferencia entre lo que decidimos hacer, y la decisión que realmente se implementa en el campo. Por ejemplo:
   - El médico ordena una medicación particular, pero el paciente no la toma, o toma la dosis incorrecta.
   - Un científico quiere probar una combinación particular de materiales, pero el pasante pide un artículo incorrecto (¡errores como este pueden producir descubrimientos importantes!).
   - La red eléctrica ordena que se encienda un generador a la 1pm, pero el operador local no enciende el generador hasta las 2pm.
9. **Errores de comunicación** – Las instrucciones al campo pueden simplemente comunicarse mal. La persona que recibe la instrucción puede pensar que está haciendo lo solicitado, pero simplemente no escuchó o no entendió una instrucción.
10. **Inestabilidad algorítmica** – Hay algunas configuraciones en las que ejecutar un algoritmo repetidamente puede devolver soluciones diferentes:
    - Los problemas complejos a menudo requieren el uso de algoritmos sofisticados que introducen un elemento de variabilidad, que a menudo surge cuando un algoritmo utiliza procesamiento paralelo. La velocidad de los procesadores paralelos puede afectar quién termina primero, lo que puede afectar la trayectoria general del algoritmo.
    - Los algoritmos para resolver problemas de optimización estocástica a menudo dependen del muestreo de Monte Carlo, que producirá resultados diferentes cada vez que se ejecute el algoritmo (esto se observa al ejecutar modelos de lenguaje de gran escala).
11. **Incertidumbre de objetivos** – Las empresas que requieren que grupos de personas tomen decisiones (despachar camiones, negociar activos financieros, ofertar en contratos de energía) pueden exhibir variaciones porque diferentes personas enfatizan diferentes métricas de desempeño.
12. **Incertidumbre ambiental** – Aquí, "ambiente" podría reflejar el clima, o un entorno político (que podría impactar políticas o aranceles), o una nueva gerencia en una empresa (que resulta en un cambio de prioridades).

## Ejemplos de aplicaciones seleccionadas {#examples-from-selected-applications}

Es útil ver ejemplos de cada una de las 12 clases para algunas de las aplicaciones que presentamos en el Capítulo 2. Para cada aplicación, describimos uno o más ejemplos de las incertidumbres para cada clase, notando que las aplicaciones más simples no tendrán incertidumbres para las 12 clases. Es importante recordar que el verdadero objetivo aquí es reconocer tantas fuentes de incertidumbre como sea posible. Cómo se reflejan estas incertidumbres en el proceso de toma de decisiones vendrá en volúmenes futuros.

### Gestión de efectivo para un fondo mutuo

Un fondo mutuo tiene que determinar cuánto efectivo mantener disponible para satisfacer las solicitudes de rescate, y a medida que se realizan depósitos, tanto de inversionistas individuales como institucionales.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.1.</span> Incertidumbres que surgen en el problema del saldo de efectivo de un fondo mutuo.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Saldo de efectivo del fondo mutuo</th></tr>
</thead>
<tbody>
<tr><td>1. Incertidumbre observacional</td><td></td></tr>
<tr><td>2. Incertidumbre exógena</td><td>Depósitos, rescates, índices de mercado</td></tr>
<tr><td>3. Incertidumbre pronóstica</td><td>Pronósticos de depósitos, rescates, índices de mercado, tasas de interés</td></tr>
<tr><td>4. Incertidumbre inferencial</td><td>Estimar cómo cambian los rescates con el desempeño del mercado</td></tr>
<tr><td>5. Variabilidad experimental</td><td>Probar diferentes políticas para mantener efectivo</td></tr>
<tr><td>6. Incertidumbre del modelo</td><td></td></tr>
<tr><td>7. Incertidumbre transicional</td><td>Actualizar cuánto efectivo hay disponible</td></tr>
<tr><td>8. Incertidumbre de implementación</td><td></td></tr>
<tr><td>9. Errores de comunicación</td><td></td></tr>
<tr><td>10. Inestabilidad algorítmica</td><td></td></tr>
<tr><td>11. Incertidumbre de objetivos</td><td>Equilibrar maximizar los rendimientos de inversión, minimizar las ventas de acciones para rescates</td></tr>
<tr><td>12. Incertidumbre ambiental</td><td>Cambios en las tasas de interés</td></tr>
</tbody>
</table>
</div>

### Encontrar el mejor tratamiento para la diabetes

Los pacientes diabéticos tienen que gestionar su azúcar en la sangre usando una combinación de medicamentos (posiblemente usando una bomba de insulina) y dieta.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.2.</span> Incertidumbres que surgen en la gestión del azúcar en la sangre.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Gestión del azúcar en la sangre</th></tr>
</thead>
<tbody>
<tr><td>Incertidumbre observacional</td><td>Medición de los niveles de A1c</td></tr>
<tr><td>Incertidumbre exógena</td><td>Lo que come un paciente</td></tr>
<tr><td>Incertidumbre pronóstica</td><td>Anticipar cambios en los niveles de azúcar en la sangre después de una comida</td></tr>
<tr><td>Incertidumbre inferencial</td><td>Estimar cómo responde el azúcar en la sangre de un paciente a la medicación</td></tr>
<tr><td>Variabilidad experimental</td><td>Cambios en el azúcar en la sangre para diferentes tipos de medicación</td></tr>
<tr><td>Incertidumbre del modelo</td><td>Modelar cómo responde un paciente a un tipo de medicación</td></tr>
<tr><td>Incertidumbre transicional</td><td></td></tr>
<tr><td>Incertidumbre de implementación</td><td>Si un paciente sigue las instrucciones de su médico</td></tr>
<tr><td>Errores de comunicación</td><td>Si un paciente entiende mal las instrucciones del médico</td></tr>
<tr><td>Inestabilidad algorítmica</td><td></td></tr>
<tr><td>Incertidumbre de objetivos</td><td>Equilibrar la reducción del azúcar en la sangre frente a problemas digestivos</td></tr>
<tr><td>Incertidumbre ambiental</td><td></td></tr>
</tbody>
</table>
</div>

### Gestión de la cadena de suministro

Las cadenas de suministro requieren gestionar inventarios que tienen que coordinarse a través del sistema.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.3.</span> Incertidumbres que surgen en la gestión de la cadena de suministro.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Gestión de la cadena de suministro</th></tr>
</thead>
<tbody>
<tr><td>1. Incertidumbre observacional</td><td>Medición del inventario</td></tr>
<tr><td>2. Incertidumbre exógena</td><td>Demanda del mercado, clima, tiempos de tránsito</td></tr>
<tr><td>3. Incertidumbre pronóstica</td><td>Previsión de demandas, producción, renuncias</td></tr>
<tr><td>4. Incertidumbre inferencial</td><td>Respuesta del mercado al precio, tasas de fallo de maquinaria</td></tr>
<tr><td>5. Variabilidad experimental</td><td>Errores de simulación, prueba de nuevos materiales, mercadeo de prueba</td></tr>
<tr><td>6. Incertidumbre del modelo</td><td>Cómo se difunde la información en el mercado, cómo responden los empleados a los incentivos</td></tr>
<tr><td>7. Incertidumbre transicional</td><td>Actualización de inventarios</td></tr>
<tr><td>8. Incertidumbre de implementación</td><td>Falta de cumplimiento de las instrucciones</td></tr>
<tr><td>9. Errores de comunicación</td><td>Instrucciones incorrectas a los proveedores</td></tr>
<tr><td>10. Inestabilidad algorítmica</td><td>Variaciones en la solución óptima de los cronogramas de producción</td></tr>
<tr><td>11. Incertidumbre de objetivos</td><td>Diferencias en las prioridades hacia el costo de producción vs. cubrir la demanda</td></tr>
<tr><td>12. Incertidumbre ambiental</td><td>Cambios en aranceles, tipos de cambio de moneda, tasas de interés</td></tr>
</tbody>
</table>
</div>

### Asignación de kits de naloxona

Las agencias estatales tienen que asignar kits de naloxona para satisfacer las necesidades de las clínicas locales y los profesionales médicos que atienden a los pacientes.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.4.</span> Incertidumbres que surgen en la gestión de los kits de naloxona.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Gestión de los kits de naloxona</th></tr>
</thead>
<tbody>
<tr><td>Incertidumbre observacional</td><td>El número de kits de naloxona en inventario</td></tr>
<tr><td>Incertidumbre exógena</td><td>El número de eventos que requieren el uso de kits de naloxona</td></tr>
<tr><td>Incertidumbre pronóstica</td><td>Estimaciones de cambios en los patrones de consumo de drogas</td></tr>
<tr><td>Incertidumbre inferencial</td><td>Estimaciones de cómo la disponibilidad de los kits afecta su uso</td></tr>
<tr><td>Variabilidad experimental</td><td></td></tr>
<tr><td>Incertidumbre del modelo</td><td>Comprender cómo cambian con el tiempo los patrones de consumo de drogas</td></tr>
<tr><td>Incertidumbre transicional</td><td>Cambios en los inventarios de kits de naloxona de una semana a otra</td></tr>
<tr><td>Incertidumbre de implementación</td><td>Si los kits se usan correctamente; si se siguen las instrucciones de asignación</td></tr>
<tr><td>Errores de comunicación</td><td>Si los representantes de campo siguen las instrucciones al repartir los kits</td></tr>
<tr><td>Inestabilidad algorítmica</td><td></td></tr>
<tr><td>Incertidumbre de objetivos</td><td>Priorizar a quién suministrar los kits de naloxona</td></tr>
<tr><td>Incertidumbre ambiental</td><td>Disponibilidad de financiamiento para los kits de naloxona</td></tr>
</tbody>
</table>
</div>

### Gestión de una flota de camiones

Las empresas de transporte de carga completa deben determinar qué cargas mover, y con qué conductor.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.5.</span> Incertidumbres que surgen en la gestión de una flota de camiones.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Gestión de una flota de camiones</th></tr>
</thead>
<tbody>
<tr><td>Incertidumbre observacional</td><td></td></tr>
<tr><td>Incertidumbre exógena</td><td>Nuevas cargas de los transportistas; asignaciones rechazadas por los conductores; retrasos de tráfico</td></tr>
<tr><td>Incertidumbre pronóstica</td><td>Previsiones de cargas futuras</td></tr>
<tr><td>Incertidumbre inferencial</td><td>Cómo responderá el mercado a los cambios en los precios al contado</td></tr>
<tr><td>Variabilidad experimental</td><td>Ejecución de simulaciones de cambios en las asignaciones de conductores</td></tr>
<tr><td>Incertidumbre del modelo</td><td></td></tr>
<tr><td>Incertidumbre transicional</td><td>Cambios en el número de cargas disponibles; actualizaciones de la disponibilidad de los conductores</td></tr>
<tr><td>Incertidumbre de implementación</td><td>Si un despachador sigue las instrucciones del modelo</td></tr>
<tr><td>Errores de comunicación</td><td>Si los despachadores siguen las instrucciones de sus gerentes</td></tr>
<tr><td>Inestabilidad algorítmica</td><td>Cambios en la solución a partir de actualizaciones de las estimaciones del valor de los conductores</td></tr>
<tr><td>Incertidumbre de objetivos</td><td>Equilibrar las millas vacías con los compromisos con los transportistas y con llevar a los conductores a casa</td></tr>
<tr><td>Incertidumbre ambiental</td><td>Cambios en las reglas de horas de servicio por parte del Departamento de Transporte</td></tr>
</tbody>
</table>
</div>

### Planificación de una red eléctrica

La red eléctrica tiene que trabajar con las empresas de servicios públicos para determinar qué generadores deben encenderse para satisfacer las demandas previstas sobre la red.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 5.6.</span> Incertidumbres que surgen en la gestión de la red eléctrica.</caption>
<thead>
<tr><th>Clases de incertidumbre</th><th>Gestión de la red eléctrica</th></tr>
</thead>
<tbody>
<tr><td>Incertidumbre observacional</td><td>Estimación de la temperatura, el clima, las actitudes de los clientes</td></tr>
<tr><td>Incertidumbre exógena</td><td>Cambios en el clima, fallos de generadores</td></tr>
<tr><td>Incertidumbre pronóstica</td><td>Previsiones de temperatura, viento, nubosidad</td></tr>
<tr><td>Incertidumbre inferencial</td><td>Estimación de cómo cambia la demanda de energía a medida que cambian los precios de la red</td></tr>
<tr><td>Variabilidad experimental</td><td>Variabilidad en la respuesta a cambios en los parámetros del modelo</td></tr>
<tr><td>Incertidumbre del modelo</td><td>Errores en la evolución de las velocidades del viento en una región geográfica</td></tr>
<tr><td>Incertidumbre transicional</td><td>Diferencia entre la energía eólica esperada y la real</td></tr>
<tr><td>Incertidumbre de implementación</td><td>Diferencias entre las instrucciones a las empresas de servicios públicos y lo que hacen</td></tr>
<tr><td>Errores de comunicación</td><td>Errores en la comprensión de las instrucciones comunicadas a las empresas de servicios públicos</td></tr>
<tr><td>Inestabilidad algorítmica</td><td>Variaciones en el desempeño del algoritmo de programación entera</td></tr>
<tr><td>Incertidumbre de objetivos</td><td>Equilibrar el uso de energía nuclear vs. carbón vs. renovables</td></tr>
<tr><td>Incertidumbre ambiental</td><td>Cambios en las políticas de reembolso por generación solar excedente</td></tr>
</tbody>
</table>
</div>

## Cómo afecta la incertidumbre al desempeño

Aunque hemos identificado 12 clases de incertidumbre, solo hay tres formas en que la incertidumbre afecta el comportamiento de un modelo:

1. Cómo se toman las decisiones.
2. Las métricas de desempeño de las decisiones elegidas en el modelo.
3. La evolución del sistema en el modelo después de que se toma una decisión, y antes de que se deban tomar las siguientes decisiones.

Luego están las formas en que la incertidumbre afecta el desempeño en el terreno:

<ol start="4">
<li>Las decisiones que se implementan en el terreno.</li>
<li>Las métricas de desempeño reales de las decisiones que se implementan en el terreno.</li>
<li>La evolución del sistema en el terreno.</li>
</ol>

Hay muchas formas en que la incertidumbre afecta el desempeño, desde costos aleatorios hasta la forma en que un paciente responde a un medicamento o el precio de una inversión. Por ahora, nos vamos a centrar simplemente en identificar cómo la incertidumbre afecta el desempeño.

## Diferentes formas de incertidumbre

El primer paso para comprender la incertidumbre requiere enumerar las diferentes fuentes de incertidumbre, como hemos hecho anteriormente. El siguiente paso, entonces, es describir las diferentes formas en que surge la incertidumbre. A continuación se presenta una muestra de estas:

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AnnualSolarEnergy.png" alt="Producción horaria de energía solar durante todo un año, que demuestra tanto la variabilidad intradiaria como la estacional." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 5.1.</span> Producción horaria de energía solar durante todo un año, que demuestra tanto la variabilidad intradiaria como la estacional.</figcaption>
</figure>

- **Variabilidad de grano fino** – Esta puede surgir a escalas de tiempo de segundos (incluso fracciones de segundo), minutos, horas o diariamente. Ejemplos de variabilidad de grano fino son:
  - Negociación de alta frecuencia en finanzas - Estas decisiones se toman varias veces por segundo.
  - Regulación de frecuencia para la red eléctrica - Estas son señales enviadas cada dos segundos a los generadores para realizar ajustes de modo que el voltaje de la energía permanezca dentro de un rango estrecho.
  - Ventas horarias de diferentes opciones de comida de restaurante que pueden requerir cierta preparación antes del servicio.
  - Las variaciones horarias en las velocidades del viento, mostradas en la figura 5.1. Esta figura también capturaría las variaciones horarias a diarias en la nubosidad, todo ello en el contexto de variaciones estacionales predecibles.
  - Ventas diarias de un producto minorista.
  - Variaciones diarias a semanales en los ingresos hospitalarios por gripe.

- **Cambios de nivel** – La variabilidad de grano fino de un proceso normalmente representa variaciones alrededor de una media, pero hay ocasiones en que la media cambiará. Ejemplos son:
  - Las demandas aleatorias de un producto minorista pueden cambiar como resultado de un cambio en el precio del producto o de un producto competidor.
  - La tasa de ingresos hospitalarios por una enfermedad infecciosa cambiará a medida que la enfermedad se mueve a través de una población cercana al hospital.
  - Las demandas de rescates de un fondo mutuo, que varían minuto a minuto, cambiarán cuando el mercado de valores en general responda a una economía cambiante.
  - El número de personas que hacen ofertas por casas (digamos, para un agente inmobiliario dado) cambiará a diferentes niveles a medida que cambien las tasas de interés.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/Bursts.png" alt="Ilustración de estallidos de actividad." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.2.</span> Ilustración de estallidos de actividad.</figcaption>
</figure>

- **Estallidos, demandas intermitentes** – Estos describen patrones donde hay poca o ninguna actividad, pero luego experimentan un estallido hasta que vuelve a disminuir (ver figura 5.2). Ejemplos de estallidos incluyen:
  - Propagación de enfermedades como el sarampión – Cuando una enfermedad entra en una región, habrá un período de mayor número de infecciones mientras la enfermedad se mueve a través de la parte más vulnerable de la población.
  - Un producto puede no venderse, hasta que alguien lo compra por casualidad y luego difunde la noticia cuando tiene una buena experiencia. Esto se propagará por su red hasta que se sature.

- **Picos** – Un proceso puede reflejar dos fuentes impulsoras. Una produce resultados modestos a partir de una distribución bien definida. La segunda representa resultados poco frecuentes que son mucho mayores que los de la primera distribución. Por ejemplo:
  - El precio de la electricidad en la red se actualiza cada 5 minutos. La figura 5.3 muestra los precios de la red en tiempo real durante el mes de febrero. Muestra una secuencia constante de cambios aleatorios, con picos ocasionales que son mucho mayores que las variaciones típicas.
  - Una tormenta genera una avalancha de compras de leche, huevos y papel higiénico.
  - Un sistema de tormentas que pasa cerca de un aeropuerto puede resultar en un número de cancelaciones de vuelos, lo que a su vez puede generar una gran cantidad de solicitudes de última hora de habitaciones de hotel.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/RealTimePricesFebruary.png" alt="Precios de la electricidad en tiempo real, actualizados cada cinco minutos, en febrero, que ilustran una volatilidad extrema." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.3.</span> Precios de la electricidad en tiempo real, actualizados cada cinco minutos, en febrero, que ilustran una volatilidad extrema.</figcaption>
</figure>

- **Eventos espaciales (clima, enfermedades, regulatorios)** – Existen numerosos ejemplos de procesos aleatorios que son de naturaleza regional. Algunos ejemplos son:
  - Clima – Las tormentas pueden crear una variedad de eventos aleatorios en una región que ha sido golpeada por mal clima, o donde se pronostica mal clima.
  - Enfermedades – Dado que la propagación de enfermedades a menudo requiere contacto físico, los brotes típicamente siguen un patrón regional.
  - Regulaciones – Los cambios en las regulaciones típicamente siguen fronteras políticas, que podrían ser de un país, o un estado, distrito o provincia dentro de un país.
- **Eventos sistémicos** – Estos son eventos que pueden afectar a toda una empresa (abarcando fronteras internacionales), un país entero, o incluso tener un impacto global, tales como:
  - Ciberataques, que pueden impactar los flujos de información de toda una empresa.
  - Percepción pública – Los eventos públicos pueden producir percepciones positivas o negativas rápidas de una empresa. Por ejemplo, una empresa cervecera emprendió una campaña para promover a la comunidad LGBTQ, lo que produjo una reacción repentina por parte de sus clientes conservadores que impactó las ventas en toda la empresa.
- **Eventos raros** – Los eventos raros pueden surgir de varias fuentes tales como terremotos, brotes de enfermedades, o ataques terroristas. Estos tienden a ser eventos reconocidos que ocurren muy raramente, pero que pueden tener un impacto importante en una organización cuando suceden.
- **Contingencias** – Esta categoría se refiere a eventos que podrían suceder, pero para los cuales no hay historial. Por ejemplo, los operadores de la red eléctrica planificarán para una falla de plantas de energía nuclear. Aunque esto puede que nunca haya sucedido dentro de un país, el operador de la red puede aún así querer prepararse para el evento en caso de que suceda.

## Estacionalidad

Una forma diferente de variabilidad se captura bajo el término general de "estacionalidad" que viene en varias formas:

- **Ciclos diarios** – También conocidos como ciclos diurnos, estos se remontan en última instancia a ciclos solares, pero pueden inducir patrones diarios fuertes en las actividades humanas. Los ciclos diarios típicamente se discretizan en horas, pero pueden surgir discretizaciones más finas (5 minutos, 1 minuto).
- **Día de la semana** – Esto refleja los patrones diarios en el comportamiento humano establecidos alrededor de los diferentes días de la semana.
- **Hora de la semana** – Los patrones horarios pueden fácilmente depender tanto del día de la semana como de la hora del día para capturar efectos como el lunes por la mañana, el viernes por la tarde, y los patrones diarios entre días laborables y fines de semana.
- **Semana del mes** – La manufactura a menudo tiene un impulso para maximizar la producción por mes, creando un incentivo para sacar el producto antes del fin de mes. Esto crea un aumento repentino hacia el final del mes, seguido de una calma.
- **Mes del año** – Esto captura los familiares patrones estacionales de invierno, primavera, verano y otoño.
- **Semana del año** – Los cambios estacionales pueden ocurrir dentro de un mes, favoreciendo el uso de la semana del año como un incremento de tiempo estacional.

La Figura 5.4 (izquierda) muestra la producción de energía solar durante el transcurso de una semana, ilustrando tanto el patrón familiar y altamente predecible creado por el sol, que es interferido por la presencia altamente estocástica de la cobertura de nubes. La Figura 5.4 (derecha) muestra la energía solar horaria a lo largo de todo el año, donde podemos ver claramente la reducción en la energía solar durante la temporada de invierno.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DailyAnnualSolarEnergy.jpg" alt="Energía solar diaria a lo largo de una semana (izquierda), y energía solar anual (derecha).">
  <figcaption><span class="fig-num">Figura 5.4.</span> Energía solar diaria a lo largo de una semana (izquierda), y energía solar anual (derecha).</figcaption>
</figure>

## Creación de creencias

Si estamos modelando la incertidumbre en la computadora, tenemos que encontrar una manera de representarla. A continuación se presentan varias estrategias populares.

- Los datos históricos pueden usarse para ajustar una distribución de probabilidad conocida – Existe toda una familia de distribuciones de probabilidad que podemos usar para ajustar a datos históricos, siendo la más conocida la distribución normal. Volveremos a este rico tema más adelante.
- Usar datos históricos para crear un modelo de creencia muestreado – Imaginemos que tenemos tiempos de viaje que van de 50 a 80 minutos para un viaje, dependiendo del tráfico. Podemos usar cualquiera de varias distribuciones de probabilidad para representar esta incertidumbre, o simplemente podemos usar una muestra de observaciones pasadas, tales como:

  > (52, 63, 78, 59, 71, 68)

- Usar datos históricos para crear una distribución de cuantiles a partir de la cual se pueden extraer muestras – Supongamos que tenemos una muestra de 10 observaciones de precios de electricidad, dada en la figura 5.5 (izquierda). Después de ordenar los precios de menor a mayor, luego mostramos la probabilidad acumulada dada en la figura 5.5 (derecha). Así, diríamos que el 60 por ciento de las observaciones son de \$86.33 o menos. Estas luego se grafican en la distribución acumulada a la derecha.

  También es posible crear manualmente una distribución acumulada usando juicio.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/EmpiricalCDF.png" alt="Calculando una CDF empírica a partir de un conjunto de observaciones." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 5.5.</span> Calculando una CDF empírica a partir de un conjunto de observaciones.</figcaption>
</figure>

- Usar resultados creados manualmente para representar eventos que podrían suceder – Cuando no tenemos datos, simplemente podemos inventar posibles resultados. Por ejemplo, podríamos estar enviando producto desde Taiwán, lo cual normalmente toma cuatro semanas. Sin embargo, podemos prever varias formas de retrasos, desde huracanes hasta represamientos en el Canal de Suez, problemas laborales en los puertos o incluso ataques terroristas. Podríamos sentir que tenemos que permitir la posibilidad de que el envío pueda tomar hasta nueve semanas, y luego planificar para esta contingencia.

## El problema de las correlaciones

La sección anterior es una breve instantánea de las formas de representar la incertidumbre en una estimación. Sin embargo, una vez que avanzamos por el camino de reconocer la incertidumbre, tenemos que enfrentar el problema mucho más complejo de las correlaciones.

Ayuda tener en mente algunos ejemplos de procesos de información para ilustrar diferentes formas de correlación. Supongamos que podríamos estar considerando cualquiera de los siguientes flujos de datos:

1. Clientes comprando un producto minorista en muchas ubicaciones de venta.
2. El tiempo de espera entre realizar un pedido y recibirlo.
3. La energía generada por un parque eólico.
4. La tasa de nuevas infecciones de la última cepa de gripe.
5. El número de movimientos de camiones completos ofrecidos por un cliente a diferentes ubicaciones.

Estos son solo un pequeño puñado de los tipos de flujos de información con los que tendremos que lidiar. A continuación usamos estos ejemplos para hablar sobre tres tipos diferentes de correlaciones:

- Correlaciones a través del tiempo.
- Correlaciones a través de la geografía.
- Correlaciones a través de atributos.

### Correlaciones a través del tiempo

Todos los problemas de decisión secuencial involucran el elemento del tiempo, que puede estar en prácticamente cualquier escala de tiempo, desde segundos, minutos, horas y días hasta semanas, meses e incluso años.

La correlación a través del tiempo puede surgir en cada uno de nuestros cinco escenarios de problemas de la siguiente manera:

1. Una tormenta de nieve entrante puede crear un aumento repentino en la demanda de sopladores de nieve; la publicidad negativa puede crear un período de demanda reducida.
2. Una huelga portuaria puede crear atrasos que aumenten los tiempos de descarga durante meses.
3. Las tormentas de lluvia pueden crear períodos de generación eólica aumentada que pueden durar días.
4. A medida que un virus entra en una región, creará un período de infecciones elevadas que puede durar de semanas a meses.
5. Si una planta se cierra por mantenimiento, puede haber una caída en las cargas que salen de una ubicación durante una semana.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/CrossingTimes.png" alt="Real vs. pronóstico, mostrando tiempos de cruce." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 5.6.</span> Real vs. pronóstico, mostrando tiempos de cruce.</figcaption>
</figure>

La Figura 5.6 ilustra cómo la energía generada por el viento puede exceder, o caer por debajo, del pronóstico durante un período de tiempo a medida que los sistemas climáticos se mueven a través de una región. Es importante que repliquemos no solo el error entre lo real y lo predicho, sino también la cantidad de tiempo que permanecemos por encima o por debajo del pronóstico, una cantidad conocida como el "tiempo de cruce."

Es bastante común que las señales aleatorias se vean como variaciones a partir de una media base, que usualmente se trata como una constante que hay que estimar. En realidad, la "media base" también puede estar variando, pero en una escala de tiempo diferente. Por ejemplo, los clientes que entran a una tienda minorista representan resultados aleatorios en una escala de tiempo fina, ya que el comportamiento de cada cliente es independiente. Pero pueden estar respondiendo a señales del mercado (publicidad, boca a boca) que también están cambiando, pero más lentamente.

Podría decirse que el mayor desafío con la correlación a través del tiempo es que puede ocurrir en múltiples escalas de tiempo, al mismo tiempo. Los eventos independientes (como cuántas personas entran a una tienda cada hora solicitando medicina para la tos) son bastante fáciles de modelar. Las variaciones que ocurren en escalas de tiempo más largas son más difíciles porque crean lo que parecen ser correlaciones a través del tiempo en escalas de tiempo más pequeñas.

### Correlaciones a través de la geografía

Las decisiones de compra de los clientes, los brotes de enfermedades y el clima son todos ejemplos de procesos aleatorios que varían geográficamente. A veces las fronteras políticas pueden limitar las correlaciones, pero la mayoría de las veces es simplemente la distancia la que rige la fuerza de la correlación.

Los procesos distribuidos espacialmente típicamente ocurren en dimensiones muy altas (¡hay muchas ubicaciones espaciales!). Lo que simplifica las correlaciones geográficas es que típicamente es bastante fácil de capturar. La geografía puede ser una función pura de la distancia, pero también puede reflejar fronteras geográficas así como patrones de movimiento poblacional. Afortunadamente, existen herramientas matemáticas poderosas que ayudan a identificar y capturar estas correlaciones.

La correlación a través de la geografía puede surgir en cada uno de nuestros cinco escenarios de problemas de la siguiente manera:

1. El aumento repentino en la demanda de sopladores de nieve también será regional ya que está respondiendo a las tormentas de nieve (que son regionales).
2. Un retraso portuario puede producir suministros reducidos en la región servida por el puerto, con correlaciones más altas para puntos más cercanos al puerto.
3. Las tormentas de lluvia también son regionales, y crearán aumentos repentinos en la energía de los parques eólicos en las áreas afectadas por la tormenta. De manera similar, las olas de calor (que también son regionales) producirán períodos de viento bajo.
4. La propagación de la gripe será regional ya que pasa entre personas que están cerca unas de otras.
5. La carga se genera ya sea por cambios en una planta de manufactura (que se ubica en un punto) o cambios en la demanda, que pueden ser impulsados por fuerzas regionales.

### Correlaciones a través de atributos

La mayoría de nuestros ejemplos involucran actividades que se caracterizan por un conjunto de atributos:

1. La demanda de ropa tendrá correlaciones entre prendas con estilo similar pero diferentes colores.
2. Los productos que comparten insumos comunes (tales como materiales para ropa, chips para automóviles, tierras raras para motores) pueden exhibir retrasos similares en el tiempo de espera cuando hay escasez del insumo.
3. (No hay uso aparente de correlación a través de atributos para la energía eólica.)
4. Las nuevas infecciones pueden estar correlacionadas entre personas que comparten características como la edad o condiciones médicas.
5. El flujo de movimientos de camiones completos puede estar correlacionado cuando están transportando mercancías o productos comunes.

A menudo sucede que cuando expandimos todos los atributos, nos encontramos con tantas combinaciones que el número de observaciones para una combinación particular de atributos puede ser bastante pequeño, y posiblemente cero. Estos problemas se prestan para el uso de métodos de estimación jerárquica, donde creamos diferentes series de tiempo descuidando uno o más atributos, y luego usando combinaciones ponderadas.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>Nombre las 12 clases de incertidumbre, dando un ejemplo de cada una a partir de cualquier aplicación.</li>
<li>Nombre siete formas de incertidumbre que puedan describir procesos aleatorios, y describa un contexto que pudiera producir cada una.</li>
<li>¿Cuáles son las formas en que la incertidumbre puede afectar el desempeño de un sistema? Dé un ejemplo de cada una.</li>
<li>Nombre cuatro formas de estacionalidad.</li>
<li>Cree una distribución acumulada de velocidades del viento a partir de las siguientes observaciones:
<p>(17, 8, 2, 12, 9, 28, 10, 8, 35, 12, 15)</p>
</li>
</ol>

**Preguntas de modelado**

<p>Para cada una de las preguntas siguientes, intente encontrar tantas formas de incertidumbre dentro de cada una de las clases para los siguientes escenarios, siguiendo las tablas dadas en la <a href="#examples-from-selected-applications">sección anterior</a>.</p>

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>El problema de planificación de inventario en el <a href="/bridging-vol1/es/chapter-2/#inventoryplanning">Capítulo 2</a>.</li>
<li>El problema de gestión de demanda de muebles en el <a href="/bridging-vol1/es/chapter-2/#demandmanagementfurniture">Capítulo 2</a>.</li>
<li>La planificación de ensayos clínicos en el <a href="/bridging-vol1/es/chapter-2/#clinicaltrials">Capítulo 2</a>.</li>
<li>La realización de una elección presidencial en el <a href="/bridging-vol1/es/chapter-2/#presidentialelection">Capítulo 2</a>.</li>
<li>El financiamiento de la cadena de suministro en el <a href="/bridging-vol1/es/chapter-2/#supplychainfinance">Capítulo 2</a>.</li>
<li>Elija un escenario de problema propio, idealmente uno con cierta complejidad, e identifique tantos tipos de incertidumbre como sea posible usando las 12 clases como guía.</li>
</ol>
{% endraw %}
