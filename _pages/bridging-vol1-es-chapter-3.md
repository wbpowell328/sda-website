---
layout: book
title: "Capítulo 3: Métricas de Desempeño"
permalink: /bridging-vol1/es/chapter-3/
date: 2026-07-17
book_home: /bridging-vol1/es/contents/
book_data: bridging_vol1_toc_es
lang: es
translated_from: en
translated_from_hash: 43d87c4ab16e5185
---


{% raw %}
<p class="book-byline"><em>Bridging Decision Problems, Volume I — Framing the Problem</em> &middot; Warren B. Powell</p>

Existe un viejo adagio en la gestión:

> "No se puede gestionar lo que no se puede medir."

Cada vez que deseamos mejorar el desempeño de un proceso o sistema, es importante que tengamos una métrica de desempeño claramente definida, reconociendo que a menudo existen múltiples métricas. Antes de comenzar a discutir los complejos problemas asociados con las métricas, primero debemos reconocer que no faltan problemas que no tienen métricas bien definidas, como con quién casarse, qué trabajo aceptar al graduarse de la universidad, o elegir qué pintar o qué escultura comprar. Si tiene problemas para identificar al menos una métrica claramente cuantificable, es probable que su problema pertenezca al dominio complejo de los problemas de decisión humana que no se beneficiarán del pensamiento analítico.

Pero si puede identificar al menos una métrica clara y cuantificable, siga leyendo.

## Categorías de métricas

Existe una amplia gama de métricas, por lo que ayuda intentar identificar las principales categorías de métricas. Algunas de las categorías más populares son:

1. **Métricas financieras** - Estas incluyen cualquier métrica medida en una moneda. Pueden medirse:
   - Cantidad total - Efectivo disponible, garantías de préstamos, inversiones.
   - Por unidad de tiempo (día, mes, trimestre, año), representando típicamente costo, ingresos o ganancias.
   - Por unidad de un recurso - Dólares por persona, máquina, instalación, o por acción.
2. **Métricas de productividad** - Estas son métricas no denominadas en dólares que también pueden medirse por unidad de tiempo (pacientes atendidos, unidades producidas, millas recorridas) y por unidad de un recurso (por persona, por máquina, por instalación).
3. **Métricas de efectividad** - Resistencia de un material, desempeño de un medicamento, rendimiento de un proceso de fabricación, tiempo medio entre fallas de una máquina.
4. **Desempeño de servicio** - Qué tan bien estamos atendiendo mercados o agentes externos, como la demanda cubierta, calificaciones de desempeño de los clientes, colocación de estudiantes.
5. **Calificaciones de desempeño externo** - La clasificación de una escuela, la confiabilidad de los productos fabricados por una empresa, la clasificación de ventas, la calificación de hospitales.
6. **Métricas de comportamiento** - Desviación entre las decisiones reales de las direcciones o directrices predeterminadas.
7. **Métricas de estimación** - Qué tan bien estimamos o predecimos cantidades (demanda futura, precipitación, cantidad en inventario) o parámetros (diagnósticos de pacientes, costo de producción). Estas asumen que tenemos alguna forma de comparar una estimación previa con una observación del desempeño real.

Hay dos formas de evaluar cada categoría de métrica:

- **Desempeño promedio** - Estos son totales o promedios a lo largo del tiempo, capturando lo que realmente se experimentaría.
- **Métricas de riesgo** - Estas miden eventos que no están adecuadamente representados por un promedio.

El desempeño promedio y las métricas de riesgo se discuten más adelante en la [sección a continuación](#averagevvsrisk).

Ayuda proporcionar ejemplos específicos. A continuación se presenta una lista de métricas de diferentes categorías.

- **Métricas financieras**
  - Métricas de rentabilidad
    - Ingreso neto.
    - Margen de utilidad bruta.
    - Margen de utilidad operativa.
    - Rendimiento sobre activos.
    - Rendimiento sobre capital.
    - EBITDA – ganancias antes de intereses, impuestos, depreciación y amortización.
  - Métricas de liquidez
    - Razón corriente (activos corrientes/pasivos corrientes).
    - Razón rápida (activos corrientes-inventario/pasivos corrientes).
  - Métricas de eficiencia
    - Razón de rotación de activos (ingresos/activos totales).
    - Rotación de inventario (costo de bienes vendidos/inventario promedio).
  - Métricas de solvencia
    - Razón deuda a capital (pasivos totales/capital de los accionistas).
    - Razón de cobertura de intereses (EBIT/gastos por intereses).
  - Métricas de valoración
    - Ganancias por acción (EPS) – ingreso neto/acciones promedio en circulación.
    - Razón precio-ganancia (P/E) – precio de mercado por acción/ganancias por acción.
- **Métricas de productividad**
  - Fracción del tiempo que se utiliza el activo.
  - Número de trabajos/tareas completadas por semana.
  - Número de trabajos/tareas completadas a tiempo o tarde.
  - Tiempo medio entre fallas (MTBF).
  - Tiempo medio de reparación.
- **Métricas de efectividad**
  - Las máquinas vienen en una amplia variedad de estilos, desde automóviles hasta aires acondicionados y licuadoras. En todos los casos, hay una evaluación de si "funciona", aunque maquinaria compleja como un automóvil puede fallar de diversas maneras, desde no arrancar hasta una llanta pinchada o el desempañador no funcionando. Un automóvil puede funcionar, pero el rendimiento de combustible puede ser menor de lo esperado.
  - Puede requerirse que un plástico se caliente a una temperatura determinada sin derretirse.
  - Una laptop puede necesitar funcionar a cierta velocidad.
  - Desempeño de un medicamento (por ejemplo, para la reducción de peso).
  - Resistencia de un material.
- **Calificaciones de desempeño externo**
  - Ventas de productos (ventas unitarias o ingresos), tasa de crecimiento.
  - Costo de adquisición de clientes.
  - Número de reseñas positivas.
  - Tasa de devoluciones de productos.
  - Tasa de abandono de clientes (clientes que se niegan a renovar el contrato).
- **Desempeño laboral**
  - Número de piezas ensambladas/inspeccionadas por hora (manufactura).
  - Ventas mensuales dentro de la región o línea de productos de alguien (ventas).
  - Si un proyecto se termina a tiempo y dentro del presupuesto (gestión).
  - Número de llamadas atendidas/calificación del cliente (centros de llamadas).
  - Retención/rotación de empleados.
  - Tasa de evaluaciones positivas de empleados en encuestas anuales de RR.HH.
  - Salario requerido para atraer y retener personal.

## Las pirámides de métricas

Es común, especialmente en los negocios, compilar listas de métricas, donde estas listas pueden ser bastante extensas. Es muy importante priorizar las métricas, lo cual se puede hacer con bastante facilidad organizándolas en pirámides, como se muestra en la figura 3.1. La figura 3.1(a) ilustra un posible conjunto de métricas para alguien que trabaja en los niveles más altos de una empresa (a menudo llamado el "C-suite") donde el objetivo más importante es maximizar el precio trimestral de las acciones. Sin embargo, estas métricas no proporcionan mucha orientación para alguien que trabaja en una planta de manufactura donde la métrica más importante podría ser el costo, seguida de cerca por la producción y la calidad. La figura 3.1(b) ilustra cómo se puede crear una pirámide diferente para alguien que podría trabajar en manufactura, donde hay más énfasis en el costo.

La organización de las métricas en una pirámide es en gran medida subjetiva, pero debe haber una única métrica en la cima que se considere la más importante. La métrica principal debe ser una que se maximice o minimice, pero esto no es necesariamente cierto para todas las demás métricas, un tema que abordamos a continuación.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidStockPrice.jpg" alt="Una pirámide de métricas que podría usarse a nivel ejecutivo de una empresa que cotiza en bolsa.">
  <figcaption>(a)</figcaption>
</figure>
<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/PyramidCost.jpg" alt="Una pirámide de métricas que podría usarse en una planta de manufactura.">
  <figcaption><span class="fig-num">Figura 3.1.</span> (b) — (a) Una pirámide de métricas que podría usarse a nivel ejecutivo de una empresa que cotiza en bolsa. (b) Una pirámide de métricas que podría usarse en una planta de manufactura.</figcaption>
</figure>

## Objetivos, metas y límites

A continuación, necesitamos especificar qué estamos tratando de lograr con cada métrica. Hay tres formas en que podemos abordar el uso de métricas para evaluar el desempeño:

- **Maximizar/minimizar** – A menudo queremos maximizar o minimizar una métrica donde más grande (o más pequeño) siempre es mejor. Podemos querer el material más resistente, o la mayor densidad de energía, o el costo más bajo.
- **Metas** – Aquí estamos tratando de alcanzar un valor particular, que podría ser la temperatura corporal de un paciente, o el voltaje en una línea de transmisión eléctrica. Las empresas pueden querer alcanzar las metas proyectadas de ingresos o rentabilidad para ayudar a controlar la volatilidad.
- **Límite superior/inferior** – Un paciente prediabético puede desear mantener su nivel de A1c (una medida del azúcar en sangre) por debajo de 6.0. Un minorista de muebles puede desear vender su inventario actual (pero no más). Una empresa de transporte de carga completa desearía que cada conductor recorra 2000 millas por semana, pero no más, ya que la empresa nunca podría sostener un número mayor, y el conductor puede sentirse decepcionado cuando las semanas de alto kilometraje no se repiten.

Aunque puede haber diferentes formas de medir el desempeño, en última instancia una computadora tiene que poder observar un conjunto de decisiones y elegir cuál es la mejor.

## Manejo de múltiples objetivos

A menudo hay múltiples objetivos que se deben maximizar o minimizar. Aunque existe una extensa literatura sobre optimización multiobjetivo, en última instancia será necesario combinar estas métricas en una única función de utilidad que requiere asignar pesos a cada métrica. La métrica en la cima de la pirámide (que tiende a ser una que necesita ser maximizada o minimizada) generalmente sirve como base, mientras que otras métricas se ponderan en relación con la métrica principal.

Cuando se deben combinar múltiples métricas en una única función de utilidad, surge la cuestión de cómo ponderarlas. Recomendamos que el peso de la métrica en la cima de la pirámide se fije igual a 1.0, lo que significa que los pesos de las otras métricas (que no necesariamente están en las mismas unidades) deben escalarse en relación con la métrica principal. Inicialmente estos pesos pueden establecerse subjetivamente, pero eventualmente esto conducirá a un conjunto de decisiones que producen un nivel de desempeño en cada una de las dimensiones que se está maximizando o minimizando. Si un experto del dominio no está satisfecho con el desempeño en alguna dimensión, el camino habitual es ajustar el peso y luego reevaluar después de ver un nuevo conjunto de decisiones.

## Desempeño promedio vs. riesgo {#averagevvsrisk}

Si ejecutamos 20 simulaciones para evaluar algún proceso de toma de decisiones, estamos evaluando nuestro método basándonos en el desempeño promedio. Podemos hacer esto si tenemos acceso a un simulador, pero una alternativa es simplemente observar cómo funciona en el campo durante un período de tiempo. En este caso, estamos siguiendo una única muestra de observaciones y usando el desempeño real para evaluar nuestro método. Podríamos decir que observar el desempeño real es como tomar un promedio de una sola observación.

El desempeño real en el campo es lo que experimentamos. Para las empresas, esto se captura en sus estados de pérdidas y ganancias, así como en cualquier otro informe que resuma sus demás métricas de desempeño, como los diversos KPI financieros, junto con estadísticas sobre inventarios y la utilización de instalaciones y equipos. En un entorno de salud, podríamos estar observando la tasa promedio de nuevas infecciones o muertes por sobredosis. Un hotel observará la utilización de habitaciones y los ingresos. Las flotas de transporte de carga completa recopilarán estadísticas sobre ingresos por conductor y millas vacías.

Ahora, consideremos el problema de una interrupción repentina en las operaciones normales de la empresa. Podría ser un terremoto o tsunami que destruye una planta de manufactura importante, o la aparición de una enfermedad como el COVID que interrumpe los patrones de consumo. Podría estallar una guerra de aranceles, alterando gravemente el comercio mundial.

Ya hemos reconocido la presencia de diferentes fuentes de incertidumbre, como hicimos a lo largo del [Capítulo 2](/bridging-vol1/es/chapter-2/), entonces, ¿por qué estamos llamando la atención sobre estas nuevas fuentes de incertidumbre? ¿No es el caso que si ocurre uno de estos eventos importantes, su efecto se capturará a medida que acumulamos nuestras métricas de desempeño a lo largo del tiempo?

La respuesta simple es: no. Imagine que hay una interrupción importante en una cadena de suministro de manera que tenemos que atravesar un período de tiempo en el que no podemos atender a nuestro mercado. Lo más importante es que podemos perder clientes ante la competencia, ya que es posible que no estén dispuestos a esperar hasta que se solucione el problema. Además, es posible que tengamos que suspender temporalmente a un número significativo de empleados porque no tenemos las piezas necesarias para operar las fábricas. Esto representa una dificultad para los empleados, lo que genera insatisfacción, y los mejores empleados pueden encontrar mejores trabajos.

Estos problemas no son capturados por los procesos contables habituales que rastrean el desempeño corporativo. Es por esta razón que existe una amplia variedad de libros que abordan lo que se conoce comúnmente como "riesgo" (o "resiliencia," que se refiere a la capacidad de las empresas para recuperarse de eventos importantes) como se muestra en la figura 3.2. Estos libros son típicamente descripciones cualitativas de diferentes tipos de riesgo, a menudo (pero no siempre) sin un proceso formal para manejar el riesgo.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SupplyChainRiskBooks.png" alt="Una muestra de libros sobre riesgo y resiliencia en la cadena de suministro." style="max-width: 515px;">
  <figcaption><span class="fig-num">Figura 3.2.</span> Una muestra de libros sobre riesgo y resiliencia en la cadena de suministro.</figcaption>
</figure>

El riesgo es un término que generalmente se utiliza siempre que se deben tomar decisiones en presencia de incertidumbre. Algunos ejemplos de riesgo que podrían surgir en el contexto de las aplicaciones del Capítulo 2 podrían ser:

- Bud Light lanzó en una ocasión una campaña de marketing dirigida a la comunidad LGBTQ. Sus ventas cayeron un 25 por ciento cuando muchos de sus clientes conservadores reaccionaron negativamente, lo que representó una severa disrupción para todo su proceso de producción.
- La programación de generadores eléctricos considera la posibilidad de que un generador (como una planta de energía nuclear) falle, pero no podrían manejar dos fallas de esta magnitud, lo que resultaría en apagones rotativos.
- Un diagnóstico incorrecto para un paciente podría resultar en la muerte del paciente.
- La falta de proporcionar suficientes reservas de efectivo para un fabricante podría resultar en bancarrota ante una caída importante de la economía, como ocurrió en 2008 con la industria automotriz.

Estos eventos simplemente no son debidamente contabilizados al acumular las estadísticas de desempeño habituales. Por esta razón, es necesario contabilizar estos eventos, que pueden tener una probabilidad muy baja, por separado del desempeño promedio o real.

La gestión de la red eléctrica ofrece una buena ilustración. Las empresas que administran sus redes están obligadas a programar suficiente energía para manejar el evento de que su generador más grande (que sería una planta de energía nuclear) falle, lo que produciría apagones. No se intenta cuantificar el impacto económico de un apagón. En cambio, simplemente lo colocan en una categoría separada, y exigen poder manejar una interrupción importante.

La literatura sobre riesgo puede dividirse aproximadamente en dos categorías:

- Discusiones generales específicas de dominio, como los libros de la figura 3.2 para aplicaciones de cadena de suministro, que típicamente proporcionan listas de eventos que las personas del campo estarían de acuerdo en que constituyen "riesgo."
- La literatura de investigación matemática, en gran parte centrada en finanzas, que utiliza métricas de riesgo bien definidas como la probabilidad de que el rendimiento financiero caiga por debajo de cierto objetivo (típicamente representado como "VaR" o "CVaR"), o simplemente la desviación estándar de una métrica de desempeño (como el rendimiento financiero).

El primer grupo, que consiste en los tipos de libros mostrados en la figura 3.2, utiliza inglés sencillo para describir eventos que la mayoría generalmente estaría de acuerdo en que representan ejemplos de riesgo que deberían evitarse. El segundo grupo consiste en libros y artículos que a menudo son altamente teóricos, pero que limitan sus caracterizaciones del riesgo a valores extremos de distribuciones de probabilidad bien definidas.

Sorprendentemente, ninguna de las dos literaturas proporciona lo que podría describirse como una definición formal de riesgo que se aplique ampliamente a la amplia gama de contextos en los que el riesgo parece ser un problema. Ofrecemos aquí tal definición, pero comenzamos proporcionando un nombre formal para nuestro objetivo original, que se basa en una simulación de nuestro proceso, ya sea en un simulador o en el campo:

**El objetivo base** – Esta es la forma en que evaluaríamos nuestro proceso de toma de decisiones a lo largo del tiempo en el campo mediante la acumulación normal de métricas de desempeño (incluyendo, pero no limitado a, estados de pérdidas y ganancias). Para las empresas esto es típicamente (pero no siempre) en unidades monetarias, pero podrían ser muertes en un entorno de salud pública, millas cargadas por conductor para una empresa de transporte, y votos en una elección presidencial.

Ahora estamos listos para definir el riesgo:

**Riesgo** – El riesgo consiste en dos dimensiones:

- Eventos de riesgo – Estos son eventos que, en el juicio subjetivo de expertos del dominio (gerentes, médicos, políticos), no son debidamente capturados por el objetivo base. Los eventos de riesgo no son medidas cuantitativas – son caracterizaciones de eventos en lenguaje natural.
- Métricas de riesgo – Aquí es donde convertimos un evento de riesgo en una o más métricas que cuantifican el impacto de un evento en el desempeño actual o a largo plazo de un sistema. Las métricas de riesgo no están necesariamente en las mismas unidades que el objetivo de desempeño base. Las métricas de riesgo pueden añadirse al objetivo utilizando un factor de escala, o manejarse como límites.

En la mayoría de las aplicaciones, el riesgo se captura como su propia métrica, que podría ser apagones que excedan cierto límite, una caída en el suministro de piezas que requeriría un cierre de producción, o eventos que conduzcan a resultados de salud graves. La mayoría de las veces el objetivo es mantener el riesgo por debajo de un límite especificado por el usuario (asumimos que siempre estamos tratando de reducir nuestra(s) métrica(s) de riesgo).

Curiosamente, la literatura matemática sobre riesgo usualmente combina el objetivo base y la métrica de riesgo en una única función de utilidad utilizando un parámetro de riesgo ajustable. Si bien esto puede ser posiblemente un enfoque válido para combinar dos métricas, no estamos listos para hacer esta suposición.

Notamos que mientras el objetivo base siempre es un promedio o una estimación muestreada de un promedio, una métrica de riesgo a menudo se calcula no como un promedio (o esperanza), sino más bien como un evento que puede ocurrir, posiblemente con una probabilidad completamente desconocida.

## En un punto en el tiempo vs. a lo largo del tiempo

Existe una vasta literatura sobre problemas que toman decisiones a lo largo del tiempo. La gestión de inventario es claramente un problema que debe resolverse a lo largo del tiempo, equilibrando los costos de mantener inventario con la posibilidad de desabastecimientos a medida que se conocen nuevos pedidos. Pero, ¿qué sucede si tenemos un problema de asignación de conductores a cargas, o de equilibrio de una cartera de inversiones, o de decidir dónde construir almacenes? En la década de 1950, resolver cualquiera de estos problemas en un único punto en el tiempo representaba un desafío importante.

Hoy en día, contamos con paquetes de software que pueden resolver incluso instancias grandes de estos problemas muy rápidamente, pero esto todavía nos deja con el desafío de tomar decisiones que funcionen bien a lo largo del tiempo. Por ejemplo, asignar un conductor a una carga que va a Montana, que está muy aislada, puede crear problemas cuando el conductor termina la carga y necesita encontrar otra carga. Tenemos que pensar si siquiera queremos aceptar la solicitud de mover esta carga, y si lo hacemos, ¿qué conductor le asignamos? La resolución de secuencias de problemas de asignación se representa en la figura 3.3. Nuestras carteras de acciones tienen que funcionar bien incluso a medida que los precios de los activos varían con el tiempo, y las ubicaciones de los almacenes tienen que anticipar patrones de demanda futuros.

En el momento en que se está escribiendo este libro, entendemos que los problemas de inventario deben optimizarse a lo largo del tiempo. Sin embargo, la comunidad que se especializa en modelos de optimización para problemas complejos, como el problema de asignación de conductores, el problema de gestión de carteras, y el problema de ubicación de almacenes, cada uno tiene que reflejar el efecto de la nueva información, y el impacto de las decisiones actuales sobre el futuro. Tenemos potentes paquetes de software para resolver estos problemas en un punto en el tiempo, pero nada para optimizar el desempeño a lo largo del tiempo.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DynamicAssignmentProblem.jpg" alt="El problema de asignación tiene que resolverse repetidamente, y las decisiones tomadas en un punto en el tiempo tienen un impacto en problemas futuros.">
  <figcaption><span class="fig-num">Figura 3.3.</span> Aquí ilustramos la realidad de que el problema de asignación tiene que resolverse repetidamente. Además, las decisiones tomadas en un punto en el tiempo tienen un impacto en problemas futuros.</figcaption>
</figure>

Cuando tenemos problemas que deben resolverse repetidamente, tenemos que capturar:

- El impacto de una decisión actual sobre decisiones posteriores.
- La llegada de nueva información que no conocíamos de antemano.

La llegada de nueva información introduce una complicación importante al tomar decisiones a lo largo del tiempo (y prácticamente todos los problemas que se resuelven a lo largo del tiempo tienen que hacerlo en presencia de nueva información). Por ejemplo, en nuestro problema de asignación, la nueva información podría ser la llegada de nuevas cargas para mover. Las nuevas cargas para mover el martes no se conocerían cuando estamos tomando decisiones el lunes. Como resultado, si estamos asignando conductores el lunes, las cargas que podrían solicitarse el martes son inciertas. También podríamos decir que las cargas que se solicitarán en el futuro son "aleatorias" (o "estocásticas," un término preferido por la comunidad de modelado matemático).

Para el problema de optimizar la asignación de conductores a cargas, tenemos que capturar la llegada de nuevas cargas, y cómo las asignaciones de conductores en días anteriores afectan el estado de los conductores hoy. Para evaluar el desempeño, ejecutaríamos una simulación que consistiría en los siguientes pasos:

- Comenzar resolviendo el problema el lunes con las cargas que se conocen en ese momento.
- Avanzar hasta el martes, y luego observar las cargas que resultan solicitadas.
- Optimizar la asignación de conductores a cargas el martes utilizando lo que se conoce.
- Avanzar hasta el miércoles y repetir el proceso.
- Repetir hasta que lleguemos al final de nuestro período de simulación.

Ahora imaginemos que repetimos todo este proceso de nuevo comenzando el lunes, pero a medida que avanzamos, muestreamos diferentes conjuntos de cargas que son solicitadas. Esto significa que podríamos simular la toma de decisiones a lo largo del tiempo, y obtendríamos resultados completamente diferentes.

Existen diferentes formas de tomar decisiones para asignar conductores a cargas que podrían tener en cuenta el impacto de las decisiones actuales sobre el futuro. Imaginemos que tenemos tres métodos. Podríamos evaluar cada método ejecutando simulaciones repetidas y luego tomando un promedio. Por ejemplo, podríamos realizar 20 simulaciones de cada método para tomar decisiones y usar este promedio para evaluar los métodos.

Los problemas que implican tomar decisiones a lo largo del tiempo son rutinarios; de hecho, podría ser el caso de que representen la gran mayoría de los problemas de decisión. Cada una de las aplicaciones del Capítulo 2 es un problema de decisión secuencial. Por ejemplo:

- Planificación de inventario – Tenemos que ordenar inventario de manera repetida, el cual llega después de un tiempo de espera (típicamente aleatorio), durante el cual todavía debemos satisfacer los pedidos que van llegando. La regla que utilizamos para colocar pedidos (típicamente conocida como una "política de inventario") debe evaluarse a lo largo del tiempo. Si los tiempos de espera son, digamos, de tres meses, necesitaríamos simular la política durante varios años, y hacer esto repetidamente.
- Las decisiones de precios y publicidad deben tomarse a lo largo del tiempo, mientras observamos cómo responde el mercado a estos incentivos. Una decisión en un momento dado genera información (como la respuesta del mercado) que puede usarse para orientar futuras decisiones publicitarias. Al mismo tiempo, estas decisiones consumen el presupuesto de publicidad.
- Las decisiones para generar y almacenar energía deben tomarse a lo largo del tiempo mientras observamos variaciones en el clima, fallas de generadores y cómo responde el público a los cambios climáticos. Las decisiones sobre qué generadores encender o apagar cambian el estado físico del sistema en el futuro.
- Los tratamientos médicos involucran decisiones sobre realizar pruebas y experimentar con diferentes tratamientos para ver cómo responde el paciente.
- La asignación de plumas de naloxona para manejar sobredosis de opioides debe hacerse a lo largo del tiempo mientras observamos cómo los funcionarios de salud y los consumidores de drogas se adaptan a la disponibilidad de este recurso.
- Las campañas presidenciales deben tomar decisiones sobre publicidad y programación de visitas de candidatos mientras observan las encuestas para ver cómo responden los votantes.
- Los gestores de fondos mutuos deben ajustar cuánto efectivo mantienen disponible mientras observan cambios en el mercado, y el patrón de depósitos y retiros que hacen sus clientes.

Resulta un poco sorprendente que, si bien la literatura sobre la resolución de problemas de decisión estáticos es increíblemente madura, la comunidad de investigación académica que trabaja en estos problemas no haya adoptado un marco estándar para modelar y resolver problemas secuenciales.

Volveremos a estos temas en el Volumen II cuando comencemos a utilizar algo de notación. Sin notación, la discusión se reduce a mucho hablar sin fundamento.

## Métricas de desempeño psicológicas

Prácticamente toda la literatura de optimización asume que existe una métrica de desempeño bien definida, llamada función objetivo, que puede usarse para evaluar decisiones. La función objetivo puede no conocerse con exactitud, pero asumimos que la incertidumbre puede cuantificarse o al menos muestrearse. Por el contrario, la mayor parte de la literatura sobre la psicología de la toma de decisiones se enfoca en cómo las personas evalúan alternativas complejas, lo cual probablemente se explica por el hecho de que estos son los problemas de decisión más interesantes y desafiantes.

En esta sección comenzaremos identificando algunas métricas complejas, seguidas de una muestra de teorías sobre cómo las personas manejan estas métricas complejas. Cerramos con una breve discusión sobre cómo los cerebros "optimizan".

### Métricas complejas

Algunos ejemplos de problemas de decisión complejos de las aplicaciones del Capítulo 2 incluyen:

- ¿Cuál es el mejor proveedor para un componente complejo de un motor a reacción que requiere experiencia especial en materiales?
- ¿Cuál es la mejor manera de comercializar un producto de consumo para maximizar las ventas?
- ¿Cuál es el mejor tratamiento médico para manejar el cáncer de pulmón en etapa 3?
- ¿Cuál es la mejor asignación de recursos en una elección presidencial (marketing, viajes para dar discursos)?
- ¿Cuál es la mejor estrategia para comercializar un sistema de despacho complejo a transportistas de camiones completos?

Cada una de estas puede presentarse como un ejemplo de un problema de "ensayo y error inteligente" (ver la [sección de Ensayo y error inteligente](/bridging-vol1/es/chapter-2/#intelligenttrialanderror) del Capítulo 2) donde hay un conjunto de opciones discretas. Lo que hace que estas opciones sean difíciles es a) que son importantes y b) que tenemos una incertidumbre considerable sobre qué tan bien se desempeñará cada una.

Podemos dividir los problemas con alternativas complejas en tres clases:

- Conocemos las métricas que queremos usar, pero no conocemos sus valores.
- Existen múltiples métricas, pero no conocemos (con precisión) su importancia relativa.
- Ni siquiera somos capaces de articular algunas o todas las métricas para evaluar cada opción.

La primera clase ha atraído considerable atención de la literatura de optimización, pero sigue siendo un contexto muy común que las personas enfrentan con frecuencia, donde no logran utilizar los mejores métodos para manejar la incertidumbre. La segunda es otro tema común y típicamente involucra plantear diferentes alternativas a un tomador de decisiones, quien luego debe hacer una elección. La tercera es un problema común en la literatura de psicología, ya que existen problemas (como los mencionados anteriormente) donde alguien puede tener una intuición sobre qué opción quiere elegir, sin poder articular por qué es la mejor.

### Algunas teorías para la formación de métricas

Ejemplos de diferentes teorías para evaluar alternativas incluyen:

**Teoría de las perspectivas (Prospect theory)** - Los principios clave de la teoría de las perspectivas incluyen:

- Aversión a la pérdida – Las personas sienten el dolor de las pérdidas más intensamente que el placer de ganancias equivalentes. Por ejemplo, perder \$100 feels worse than the joy of gaining \$100.
- Dependencia de referencia – Las decisiones se toman en relación con un punto de referencia en lugar de resultados absolutos. Las ganancias y pérdidas se perciben en relación con este punto de referencia.
- Aversión al riesgo en las ganancias, búsqueda de riesgo en las pérdidas – Cuando se enfrentan a ganancias potenciales, las personas tienden a preferir resultados certeros sobre los arriesgados. Sin embargo, cuando se trata de pérdidas, con frecuencia asumen mayores riesgos para evitar una pérdida definitiva.
- Sensibilidad decreciente – El impacto de los cambios en la riqueza disminuye a medida que aumentan las cantidades. La diferencia entre perder \$100 and \$200 se siente más significativa que entre perder \$1,000 and \$1,100.
- Ponderación de probabilidad – Las personas sobreestiman la probabilidad de eventos raros (por ejemplo, ganar la lotería) y subestiman la probabilidad de eventos comunes.

**Teoría de la contabilidad mental** - Esto se refiere a la manera en que las personas organizan, categorizan y evalúan mentalmente las decisiones financieras al crear "cuentas" separadas en sus mentes, en lugar de tratar el dinero como completamente intercambiable/fungible. Algunos conceptos clave incluyen:

- Categorización: Las personas asignan dinero a diferentes presupuestos mentales (por ejemplo, alquiler, comestibles, entretenimiento) y con frecuencia toman decisiones de gasto basadas en la categoría en lugar de la posición financiera general.
- Encuadre (framing): La misma cantidad de dinero puede valorarse de manera diferente según cómo se haya adquirido — por ejemplo, \$100 windfall may be spent more freely than \$100 ganados en el trabajo. Esto explica por qué algunas personas podrían derrochar con una devolución de impuestos mientras son estrictas con los gastos cotidianos.
- Falacia del costo hundido: Las personas con frecuencia continúan con un esfuerzo perdedor (como asistir a un mal concierto que ya pagaron) porque han "gastado" mentalmente el dinero, aunque sea irrecuperable.

**Teoría de la atribución** - La teoría de la atribución explica cómo las personas interpretan las causas de su propio comportamiento y el de otros, especialmente en contextos de logro como el éxito o el fracaso. Por ejemplo, los consumidores asignan razones a sus decisiones de compra, lo que influye en la percepción y lealtad hacia la marca. Tres dimensiones de los atributos causales incluyen:

- Locus – ¿La causa es interna (por ejemplo, habilidad, esfuerzo) o externa (por ejemplo, suerte, dificultad de la tarea)?
- Estabilidad – ¿La causa es estable (constante a lo largo del tiempo) o inestable (variable)?
- Controlabilidad – ¿La persona puede controlar la causa (como el esfuerzo), o es incontrolable (como la habilidad innata o la suerte)?

Estas atribuciones influyen en las emociones y en la motivación futura. Por ejemplo:

- Atribuir el éxito a factores internos y controlables (como el esfuerzo) aumenta la motivación y el orgullo.
- Atribuir el fracaso a factores internos e incontrolables (como la falta de habilidad) puede conducir a la vergüenza y al desánimo. La teoría de Weiner es ampliamente utilizada en la educación, los deportes y los entornos organizacionales para entender cómo las creencias sobre las causas moldean el comportamiento y el desempeño.

### Cómo el cerebro aprende a optimizar

Ha existido una tremenda tendencia a atribuir inteligencia a las redes neuronales que se utilizan para aprender patrones de palabras. Si bien el reconocimiento de patrones es, de hecho, una forma importante de inteligencia, es claramente diferente del proceso de tomar decisiones, algo que los humanos son bastante capaces de hacer. Tomar decisiones requiere la capacidad de maximizar recompensas que son específicas para lograr algún objetivo que podría estar relacionado con comer, estar cómodo, evitar el dolor, ganar una competencia o resolver un problema.

Resulta que el cerebro tiene funciones muy específicas que ayudan a optimizar un objetivo que no tiene nada que ver con simplemente igualar un patrón. Esto se realiza con partes del cerebro conocidas como receptores de recompensa, que son proteínas especializadas que responden a neurotransmisores, como la dopamina, para ayudar al cerebro a experimentar placer, motivación y refuerzo positivo o negativo. Los neurotransmisores son como cerraduras moleculares que se activan cuando la llave química correcta se une a ellos, lo que luego desencadena actividades neuronales que guían el comportamiento.

Los tipos de receptores de recompensa son:

- **Receptores de dopamina** – Estos son los elementos más importantes del sistema de recompensa, que vienen en diferentes formas:
  - Receptores D1, que promueven el aprendizaje por refuerzo y ayudan a mantener la motivación a largo plazo.
  - Receptores D2, que están involucrados en el vínculo social y la regulación del estado de ánimo.
  - Receptores D3, que desempeñan un papel en la motivación y el comportamiento dirigido a objetivos.
- **Receptores de opioides** – Estos responden a las endorfinas y otros opioides naturales, contribuyendo a las sensaciones de euforia y alivio del dolor.
- **Receptores de serotonina** – Estos influyen en el estado de ánimo y la recompensa emocional, y con frecuencia se utilizan como objetivo por los antidepresivos.
- **Receptores de glutamato** – Estos ayudan a codificar el aprendizaje y la memoria relacionados con la recompensa.

Obviamente, cualquier discusión sobre estos mecanismos increíblemente complejos está muy fuera del alcance de este libro. El punto que estamos planteando es que el cerebro tiene mecanismos específicos para maximizar recompensas, que es cómo puede elegir la mejor decisión. Este es un proceso distinto de los poderosos mecanismos del cerebro para identificar patrones. Por el contrario, las redes neuronales utilizadas por los grandes modelos de lenguaje se entrenan para identificar patrones de texto; estas utilizan una única función objetivo, que captura la similitud entre una función (la red neuronal) y el conjunto de datos de entrenamiento.

## Establecimiento de metas de desempeño para otros

Una dimensión importante de las métricas es el establecimiento de metas con el propósito de evaluar el desempeño de personas o grupos. Esto implica inherentemente un entorno multiagente, donde un tomador de decisiones tiene la autoridad de establecer metas de desempeño para otra unidad en una organización. En un entorno multiagente, una meta de un agente puede ser la decisión tomada por otro agente (presumiblemente de nivel superior).

El establecimiento de metas es un área particularmente rica en el contexto de organizaciones con múltiples unidades de toma de decisiones, típicamente organizadas de manera jerárquica. Volveremos a este tema en un futuro volumen.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>Nombre cinco ejemplos de métricas de desempeño.</li>
<li>¿Qué se entiende por objetivos, metas y límites? Dé un ejemplo de métricas que encajarían en cada una de estas tres categorías. Puede usar métricas de cualquiera de los ejemplos del Capítulo 2 (no todas tienen que provenir del mismo ejemplo).</li>
<li>¿Qué es un evento de riesgo? Dé ejemplos de eventos de riesgo si usted es:
  <ol type="a">
    <li>El operador de la red eléctrica para una región.</li>
    <li>Un médico que trabaja con un paciente para gestionar su diabetes.</li>
    <li>El director financiero de una cadena de suministro.</li>
  </ol>
</li>
<li>Nombre dos teorías sobre cómo las personas evalúan las opciones.</li>
<li>Nombre cuatro receptores que el cerebro utiliza para recompensar comportamientos específicos.</li>
<li>Para cada uno de los ejemplos de eventos de riesgo del ejercicio 3, diseñe una métrica de riesgo para ese evento.</li>
</ol>

**Preguntas de modelado**

<p>Para cada pregunta a continuación, diseñe una pirámide de métricas utilizando las métricas proporcionadas para la aplicación designada, dado el tomador de decisiones especificado.</p>

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>Usted es un gerente de cadena de suministro encargado de seleccionar proveedores para los componentes de un aire acondicionado. Los proveedores pueden estar en cualquier parte del mundo.</li>
<li>Usted tiene que reabastecer los inventarios de diferentes tipos de muebles para una tienda minorista de muebles.</li>
<li>Usted tiene que planificar inversiones en nueva capacidad de generación eléctrica (estos pedidos se colocan hasta cinco años en el futuro).</li>
<li>Usted es el gerente de ingresos de un hotel.</li>
<li>Usted es el médico que elige el tratamiento para un paciente diabético.</li>
<li>Usted es el funcionario estatal que debe asignar kits de naloxona entre los condados de su estado.</li>
<li>Usted es una compañía farmacéutica que debe elegir qué medicamentos incluir en los ensayos de Fase II.</li>
<li>Usted es el gerente de campaña de una elección presidencial.</li>
<li>Usted es el vicepresidente de operaciones de una empresa de transporte de carga completa que debe gestionar a los despachadores (quienes asignan conductores a las cargas) y a los gerentes de carga (quienes deciden qué cargas mover).</li>
<li>Usted es el gerente de un fondo mutuo que debe determinar cuánto efectivo mantener disponible.</li>
</ol>
{% endraw %}
