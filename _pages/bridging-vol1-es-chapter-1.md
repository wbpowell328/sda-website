---
layout: book
title: "Capítulo 1: Los Fundamentos del Encuadre"
permalink: /bridging-vol1/es/chapter-1/
date: 2026-07-17
book_data: bridging_vol1_toc_es
book_home: /bridging-vol1/es/contents/
lang: es
translated_from: en
translated_from_hash: e55b91c9188391dc
---


{% raw %}
<p class="book-byline"><em>Tendiendo Puentes en Problemas de Decisión, Volumen I — Enmarcando el Problema</em> &middot; Warren B. Powell</p>

La humanidad está compuesta por una variedad de procesos, cada uno de los cuales abarca una serie de actividades que pueden evaluarse en términos de una o más métricas de desempeño. Parece ser una característica fundamental que las personas siempre quieren hacerlo mejor. Los atletas quieren ser más rápidos o más fuertes; las empresas quieren ser más rentables; los profesionales de la salud quieren salvar más vidas; la red eléctrica quiere proporcionar electricidad a menor costo.

Este libro se definirá mediante la siguiente afirmación:

<figure class="book-figure is-self-framed">
  <img src="/assets/images/bridging-vol1/Ifyouwantabetter.jpg" alt="Si quieres administrar mejor {cualquier cosa} tienes que tomar mejores decisiones.">
</figure>

Trabajamos bajo la premisa de que siempre estamos buscando mejorar las cosas, y solo podemos hacerlo manipulando los elementos que controlamos, conocidos también como *decisiones*.

<div class="book-table-wrap">
<table class="book-table is-list-table">
<caption><span class="fig-num">Tabla 1.1.</span> Una muestra de contextos de problemas con ejemplos de objetivos que capturan el desempeño.</caption>
<thead>
<tr><th>Aplicación</th><th>Objetivos</th></tr>
</thead>
<tbody>
<tr><td>Sistemas de energía</td><td>Reducir costos, minimizar interrupciones</td></tr>
<tr><td>Salud pública</td><td>Minimizar muertes, maximizar productividad</td></tr>
<tr><td>Aplicaciones empresariales</td><td>Maximizar utilidades, minimizar costos</td></tr>
<tr><td>Gestión de la cadena de suministro</td><td>Minimizar costos, maximizar ingresos/productividad</td></tr>
<tr><td>Manufactura</td><td>Minimizar costos, maximizar rendimiento, minimizar defectos</td></tr>
<tr><td>Economía</td><td>Minimizar la inflación, maximizar el crecimiento y el empleo</td></tr>
<tr><td>Finanzas</td><td>Maximizar rendimientos, minimizar riesgo</td></tr>
<tr><td>Sistemas de transporte (público)</td><td>Maximizar cobertura, minimizar costo</td></tr>
<tr><td>Transporte de carga</td><td>Minimizar costo, maximizar servicio, satisfacer necesidades de los conductores</td></tr>
<tr><td>Ingeniería</td><td>Maximizar resistencia, minimizar costo, maximizar desempeño</td></tr>
<tr><td>Descubrimiento de fármacos</td><td>Minimizar muertes, resultados negativos de salud, costo</td></tr>
<tr><td>Deportes</td><td>Maximizar victorias, minimizar nóminas de jugadores, maximizar asistencia</td></tr>
<tr><td>Entretenimiento</td><td>Maximizar visualizaciones, minimizar costos</td></tr>
</tbody>
</table>
</div>

La Tabla 1.1 enumera una serie de actividades humanas, cada una seguida de una breve lista de métricas que podrían usarse para evaluar el desempeño (la lista de métricas puede ser bastante extensa). Estas aplicaciones dan una idea del universo de problemas en los que "queremos hacerlo mejor", pero el desafío ha sido crear un camino paso a paso que conduzca a un mejor desempeño.

Todos los contextos de problemas del mundo real deben comenzar con una descripción no estructurada, en "lenguaje sencillo". En contraste, cualquier modelo matemático asume que el problema ya ha sido estructurado en una forma que puede ser comprendida por una computadora. Lo que falta son los aportes de personas que realmente entienden el problema, lo cual crea la brecha representada por el puente inconcluso que aparece en la portada del libro.

La práctica de modelado estándar actual generalmente involucra a alguien familiarizado con una "tecnología de decisión", que podría ser programación entera o no lineal, o podría ser aprendizaje automático, o simulación de Monte Carlo (hoy en día también podríamos incluir los modelos de lenguaje de gran escala, que técnicamente son una forma de aprendizaje automático). Cuando una empresa contacta a un experto (ya sea de la industria o del ámbito académico), este tendrá una tendencia inmediata a ver el problema desde la perspectiva de su propia especialidad.

El experto técnico entonces hará las preguntas que se ajustan a su conjunto de habilidades. El especialista en programación entera preguntará sobre las variables de decisión y una función de costo; el especialista en aprendizaje automático se enfocará en cantidades desconocidas que deben estimarse o pronosticarse; el experto en simulación puede identificar decisiones de diseño que deben evaluarse mediante simulación.

Este comportamiento es una forma de sesgo que llamamos *filtrado por especialidad*: aprender sobre el problema de una manera que refleja su especialidad. Esto ocurre prácticamente en todos los proyectos, ya que el experto del dominio no tendrá la especialidad necesaria para identificar al experto técnico más adecuado. Los expertos técnicos siempre suponen que su especialidad es relevante, y observan los problemas a través del lente de su formación. Esto no es un asunto de engaño; simplemente es naturaleza humana.

Nuestra postura es que todos los "problemas" están motivados por el deseo de mejorar un proceso de alguna manera. Mejorar un proceso requiere hacer cambios que son el resultado de decisiones, y quisiéramos tomar mejores decisiones. Esta perspectiva parece convertir todo problema en un problema de optimización, ya que siempre queremos tomar las mejores decisiones. Esto no significa que vayamos a usar herramientas de optimización. Ni siquiera presumimos que vayamos a realizar algún tipo de análisis formal, pero siempre mantendremos esta puerta abierta.

Vamos a utilizar un proceso mucho más integral para mejorar un proceso. Comenzamos reemplazando el paso inicial familiar en la comunidad de optimización llamado "modelado" (traducir problemas reales a modelos matemáticos) por un paso que llamamos "enmarcar el problema", el cual precede al modelado. "Enmarcar" es un término muy usado en la resolución de problemas empresariales, pero le daremos un significado mucho más preciso.

Nuestra versión de enmarcado será un proceso que requiere capacitar a las personas para hacer las preguntas correctas, que sean más fáciles de entender por los expertos del dominio (personas de negocios, profesionales de la salud, científicos, ingenieros), y que llenen elementos específicos de un modelo matemático *en caso de que se requiera uno para resolver el problema.* El enmarcado no debe ser realizado por un experto técnico precisamente por el riesgo de filtrado por especialidad. Sin embargo, nuestro enfoque dará como resultado responder preguntas que serían necesarias para el uso de cualquier herramienta analítica. Creemos que nuestro proceso de enmarcado, en muchas aplicaciones, introducirá claridad que puede ayudar a resolver el problema incluso sin una computadora.

## ¿Qué es un "problema"? {#whatisaproblem}

Antes de resolver un problema, ¿qué entendemos siquiera por "problema"? Aunque existen muchas variedades de problemas, desde la perspectiva de la toma de decisiones, identificaremos dos estilos:

- **Problemas centrados en decisiones** — Estos son problemas donde las decisiones que estamos tomando son claras:
  - Enrutar camiones
  - Ordenar inventarios
  - Fijar el precio de un producto
  - Elegir un tratamiento médico
  - Elegir una tecnología de almacenamiento de baterías
  - Ubicar una instalación
  - Dónde anunciar un producto, servicio o candidato
  - Elegir qué estado visitar (en campaña para un cargo)
- **Problemas centrados en métricas** — Estos generalmente surgen en situaciones más complejas donde sabemos lo que queremos lograr, aunque inicialmente podríamos no saber qué decisiones se pueden tomar para mejorar las métricas. Algunos ejemplos de contextos centrados en métricas son:
  - Reducir costos, aumentar ingresos o mejorar márgenes de utilidad.
  - Reducir inventarios
  - Mejorar el rendimiento de un proceso de manufactura
  - Reducir infecciones
  - Maximizar rendimientos financieros
  - Reducir el riesgo
  - Mejorar la utilización de personas, equipos e instalaciones
  - Maximizar el número de votos (en campaña para un cargo)

Los problemas centrados en métricas son generalmente más complejos, ya que las metas son más fáciles de enunciar que las decisiones necesarias para alcanzar una meta. A menudo, ni siquiera sabemos qué decisiones podrían usarse para ayudar a mejorar las métricas. De hecho, identificar las decisiones que tienen el mayor impacto en las métricas de desempeño es un paso importante para enmarcar un problema.

Al mismo tiempo, identificar las métricas correctas también puede ser un paso importante en el enmarcado de un problema. De hecho, en contextos con múltiples tomadores de decisiones (como sucedería en cualquier organización), un tipo importante de decisión por parte de un gerente puede ser elegir las métricas para evaluar a las personas y unidades de negocio ubicadas más abajo en la jerarquía organizacional.

## Contextos para problemas de decisión

Los problemas de decisión pueden surgir de varias formas:

- Necesitamos tomar decisiones para resolver un problema particular que se presenta y que solo necesita resolverse una vez.
- Tenemos un conjunto bien definido de decisiones, y simplemente queremos hacerlo mejor. En la mayoría de los casos, las decisiones las toman personas, y puede existir la esperanza de que las computadoras puedan hacerlo mejor.
- Queremos mejorar nuestro desempeño con el tiempo, especialmente cuando no estamos alcanzando los objetivos esperados. Para estos problemas, podríamos ni siquiera saber de antemano qué decisiones afectan el desempeño.
- Tenemos un conjunto bien definido de decisiones tomadas por personas, y quisiéramos automatizar el proceso para eliminar el componente manual, posiblemente como una forma de reducción de costos (al no tener que pagar a las personas), o para obtener mayor control sobre un proceso.
- Estamos simulando decisiones con el propósito de planificar el sistema en el futuro. Esto podría apoyar aplicaciones de planificación estratégica, o la comprensión del impacto de las decisiones tomadas ahora sobre el futuro.

Cualquiera de estas representa una motivación perfectamente válida para identificar un problema a resolver, o una oportunidad de mejora. Un desafío importante es asegurarse de estar prestando atención a las métricas correctas, y luego identificar todas las formas en que se puede influir en dichas métricas. Cualquier cosa que controlemos cae en la categoría de decisión.

## Las tres etapas de la automatización de decisiones {#three-stages}

<figure class="book-figure" style="float:right; max-width: 260px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/NotreDame.png" alt="Una catedral medieval.">
  <figcaption><span class="fig-num">Figura 1.1.</span> Una catedral medieval.</figcaption>
</figure>

Un artículo del USA Today durante la pandemia de COVID describió el problema de la distribución de vacunas como "asombrosamente complejo." La razón de esta afirmación es que las personas no saben cómo pensar en problemas complejos. A veces es útil recordar que las catedrales medievales fueron diseñadas y construidas por personas sin educación formal; el problema con la distribución de vacunas no es la complejidad, sino saber cómo pensar en ella.

Lo que ha faltado es una forma estructurada de pensar sobre cómo tomar decisiones a lo largo del tiempo. Nuestro proceso implica descomponer el proceso de automatización de decisiones en tres etapas, dadas por:

**Etapa I: Enmarcado** — Aquí identificamos los elementos centrales de un problema de decisión, lo cual comienza respondiendo primero las tres preguntas siguientes:

1. ¿Cuáles son las métricas de desempeño?
2. ¿Qué tipos de decisiones se están tomando, y quién las toma? Tomamos decisiones con un método al que llamamos la *política*.
3. ¿Cuáles son las fuentes de incertidumbre que afectan el desempeño?

**Etapa II: Modelado** — El siguiente paso es completar los detalles del proceso de modelado universal. Esto comienza respondiendo las siguientes preguntas:

4. ¿Cómo tomamos las decisiones? Esto se hace mediante una función que llamamos la "política". Estas se diseñarán a partir de cuatro clases de políticas (presentadas en el Volumen III).
5. ¿Qué información se necesita? Esto conforma los elementos de nuestra *variable de estado* (también llamada el "estado de conocimiento"), la cual consiste en la información necesaria para:
   - Tomar una decisión (lo cual depende de la política).
   - Calcular cualquier métrica de desempeño.
   - Calcular (a) y (b) en el futuro.

   La información puede dividirse entre:
   - Lo que conocemos perfectamente sobre cantidades de recursos físicos y financieros.
   - Parámetros y funciones utilizados para diversos propósitos.
   - Lo que tenemos que estimar y representar en forma de creencias.
6. ¿Cómo evoluciona la variable de estado con el tiempo?

**Etapa III: Implementación** — Esto abarca desde la obtención de la información necesaria hasta la implementación y evaluación de las decisiones. Esto incluye:

7. ¿Cómo adquirimos la información que se necesita? Existe información que está disponible de inmediato, información que debe adquirirse de otras fuentes, e información que debe estimarse (o pronosticarse).
8. ¿Cómo implementamos las decisiones que tomamos usando la política?
9. ¿Cómo evaluamos qué tan bien se desempeñan las decisiones en el terreno?

Describimos las tres etapas en las secciones que siguen.

### Etapa I: Enmarcar el problema {#framingtheproblem}

Nos referimos a la etapa inicial del proceso de automatización como "enmarcar el problema", la cual consiste en responder las siguientes preguntas:

1. ¿Cuáles son las métricas de desempeño?
2. ¿Qué tipos de decisiones se están tomando (y quién las toma)?
3. ¿Cuáles son las fuentes de incertidumbre que afectan la implementación de las decisiones y el desempeño del sistema?

Estas tres preguntas no son suficientes para resolver un problema, pero son el punto de partida de cualquier proceso que implique tomar e implementar decisiones.

<figure class="book-figure" style="float:right; max-width: 220px; margin-left: 1.5rem;">
  <img src="/assets/images/bridging-vol1/Chessboard.png" alt="Jugar ajedrez puede ser difícil, pero es muy sencillo de modelar.">
  <figcaption><span class="fig-num">Figura 1.2.</span> Jugar ajedrez puede ser difícil, pero es muy sencillo de modelar.</figcaption>
</figure>

Es útil ilustrar estas preguntas en el contexto de uno de los juegos más desafiantes jamás inventados: el ajedrez (véase la figura 1.2). La respuesta a nuestras tres preguntas de enmarcado es la siguiente:

1. **Métrica de desempeño** – Ganar la partida.
2. **Decisiones** – Movimientos permitidos.
3. **Incertidumbres** – Movimientos del oponente.

Por supuesto, que sea trivial de modelar no hace que jugar ajedrez sea fácil, pero el ajedrez se usó durante mucho tiempo como referencia para demostrar el poder de estrategias algorítmicas como el "aprendizaje por refuerzo".

Resolver el problema surge en el Paso 4 (Etapa II), y aunque esto es bastante difícil, los pasos restantes también son triviales.

Ahora consideremos algunos de los problemas que identificaremos en el [Capítulo 2](/bridging-vol1/es/chapter-2/):

- ¿Cómo reducimos las muertes causadas por el fentanilo?
- ¿Cómo diseñamos una cadena de suministro que minimice los costos y que sea robusta ante distintas fuentes de incertidumbre?
- ¿Cómo gestionamos una flota de camiones para maximizar las ganancias mientras se ofrece un servicio puntual?
- ¿Cuál es la mejor estrategia para reducir las emisiones de CO2?
- ¿Cómo debería un gran fabricante guardar e invertir su dinero para maximizar los rendimientos, gestionando el riesgo y cumpliendo con los requisitos de efectivo de corto y mediano plazo?

Responder nuestras tres preguntas de enmarcado para estos problemas es un ejercicio nada trivial. Por esta razón, dedicamos tres capítulos al proceso de responder cada pregunta:

- Capítulo 3 – Métricas de desempeño
- Capítulo 4 – Decisiones
- Capítulo 5 – Incertidumbres

Estos temas se ilustran usando las aplicaciones del [Capítulo 2](/bridging-vol1/es/chapter-2/). Ofrecemos un breve adelanto de estos tres elementos centrales describiendo diferentes tipos de métricas, decisiones e incertidumbres en las subsecciones que siguen.

#### Tipos de métricas

Las métricas se presentan en una variedad interminable y dependen completamente del contexto.

- **Negocios** – Las empresas se caracterizan por largas listas de métricas financieras, métricas de productividad, métricas de desempeño, métricas laborales y métricas que capturan cómo se está atendiendo al mercado.
- **Salud** – Enfermedad/muerte, curas, efectos secundarios, movilidad, fuerza, costo.
- **Energía** – Costo, cantidad de energía suministrada, interrupciones, reducción de la demanda.
- **Manufactura** - Rendimiento, desempeño del producto, velocidad, costo.
- **Descubrimiento de fármacos** - Desempeño, protección de patentes, potencial de mercado, efectos secundarios, riesgos para la salud.
- **Deportes** - Puntos anotados, consistencia, popularidad entre los aficionados, lesiones, consistencia.
- **Transporte de carga** - Ingresos, costo, servicio, requerimientos de mano de obra, exposición a la volatilidad del mercado.

Elegir las métricas correctas es un desafío en sí mismo, ya sea que se utilicen para guiar el comportamiento de un modelo computacional o para guiar el comportamiento de las personas.

Aparte de lo que mide una métrica, está la forma en que se utiliza para guiar el desempeño del sistema. Las métricas pueden usarse de tres maneras diferentes:

- **Objetivos** - Son métricas que queremos maximizar o minimizar.
- **Objetivos meta (targets)** - Podemos querer que la métrica se acerque lo más posible a un número objetivo, como la temperatura de un edificio o la presión arterial de un paciente.
- **Límites** - Podemos querer que una métrica se mantenga por debajo o por encima de cierto límite. Por ejemplo, podríamos querer mantener el nivel de azúcar en sangre de un paciente por debajo de un valor determinado; los desabastecimientos deberían mantenerse por debajo de cierto nivel; las carteras financieras necesitan mantener la volatilidad por debajo de un valor especificado.

#### Tipos de decisiones

Una lista inicial de diferentes tipos de decisiones es la siguiente:

- **Binarias** – Estas surgen cuando elegimos entre dos diseños de página web (conocido como pruebas A/B), o determinamos cuándo vender un activo (en cada momento podemos mantenerlo o venderlo).
- **Elecciones discretas** – Es útil dividir esta categoría en tres clases:
  - Un pequeño conjunto de elecciones discretas - Podríamos necesitar elegir el mejor fármaco, el mejor proveedor para un componente, o la mejor ubicación para una instalación.
  - Un conjunto de valores discretizados de un parámetro continuo – Ejemplos son los precios, las dosis de un fármaco, o las temperaturas para hornear una oblea de semiconductor.
  - En algunos casos, el número de elecciones discretas puede ser bastante grande, como elegir cuál de 30,000 moléculas diferentes podría usarse para un fármaco, o la elección de ubicaciones para diferentes instalaciones distribuidas entre 100 ubicaciones posibles.
- **Elecciones continuas** – Precios, concentraciones, dimensiones, temperaturas, … Estas pueden ser escalares (es decir, un solo parámetro), o vectores, en cuyo caso podríamos estar optimizando a través de múltiples (potencialmente muchos) parámetros continuos.
- **Vectores de elecciones discretas** – Podemos tener un conjunto de M conductores que estamos asignando a N cargas, donde debemos decidir si asignar al conductor m a la carga n.

Una segunda dimensión de las decisiones involucra el momento en que una decisión tomada ahora se implementa en el futuro. Por ejemplo:

- Un despachador asigna un conductor a una carga que debe moverse en este momento.
- Un médico puede recetar un medicamento para el azúcar en sangre que requiere varias horas para hacer efecto.
- Un operador de red planificará hoy qué generadores de vapor deberían estar en funcionamiento mañana.
- Un gerente de cadena de suministro realiza un pedido que puede tardar varias semanas o meses en llegar.
- Una aerolínea puede encargar nuevas aeronaves que pueden tardar dos años en entregarse.
- Una inversión con una firma de capital privado puede inmovilizar ese capital durante 8 a 10 años.

Una tercera dimensión de las decisiones implica identificar quién toma una decisión.

- La gestión de la distribución de vacunas involucra decisiones que comienzan con agencias federales y estatales, y se extienden a través de hospitales, médicos y enfermeras que administran la vacuna.
- La fabricación de motores automotrices involucra la participación de una secuencia de fabricantes que proporcionan los materiales y elaboran los diversos componentes del motor, que finalmente se mueven al mercado a través de concesionarios que controlan los pedidos de automóviles.
- Los ensayos clínicos de fármacos involucran decisiones de científicos, reguladores, empresas que proporcionan el financiamiento, hospitales y clínicas que administran el fármaco, y el paciente.
- Una empresa de transporte por camión realiza el despacho utilizando un equipo de despachadores y gestores de carga, que podría ser reemplazado por un único modelo computacional capaz de coordinar estas decisiones en toda la empresa.

#### Formas de incertidumbre

Posiblemente el aspecto más sutil de la toma de decisiones consiste en comprender las incertidumbres que invariablemente surgen al implementar decisiones en el terreno. No es de extrañar que las formas de incertidumbre que surgen dependan en gran medida del contexto. Algunos ejemplos incluyen:

- **Negociación financiera** – Aquí nos interesa principalmente los cambios en los precios de los activos, pero los operadores también están interesados en la demanda de activos, y en los cambios en otras métricas que puedan sugerir hacia dónde se dirigen los mercados, como los cambios en el desempleo, las tasas de interés y las ventas minoristas. Los mercados a menudo se mueven en función de las expectativas, las cuales son notoriamente difíciles de medir.
- **Gestión de la cadena de suministro** – Aquí debemos lidiar con incertidumbres en la demanda del mercado por un producto, las estrategias de los competidores, el desempeño de los proveedores y el comportamiento de los trabajadores (especialmente cuando están sindicalizados). Además, existen influencias externas como el clima, los terremotos y la propagación de enfermedades.
- **Salud pública** – La propagación de una enfermedad depende del origen de la enfermedad (puede ser una única infección, o proveniente de muchos animales infectados, a partir de los cuales evolucionó una cepa humana), la prevalencia de la enfermedad, la tasa de transmisión, cómo afecta a los pacientes, el desarrollo de fármacos, la distribución de los fármacos, y la respuesta del público en la aceptación de los fármacos.

Cada uno de estos ejemplos involucra múltiples fuentes de incertidumbre. Estas presentan diferentes formas de incertidumbre, tales como:

- Ruido de grano fino, como las demandas aleatorias diarias.
- Los cambios en precios y clima típicamente exhiben picos y ráfagas.
- Puede haber cambios inesperados hacia nuevas mesetas que reflejan cambios en la tecnología, el comportamiento del consumidor, o las decisiones de los competidores.
- Eventos únicos y poco frecuentes, como un terremoto o la invención de una nueva tecnología importante.
- Contingencias para eventos que podrían suceder, pero que nunca han ocurrido realmente.

La consideración de la incertidumbre debe evaluarse en términos de cómo afecta las métricas de desempeño. Cuando tomamos decisiones en presencia de incertidumbre, debemos hacer elecciones, como la forma de tomar una decisión, que funcionen bien en promedio dado que no sabemos qué va a suceder en el futuro.

Sin embargo, algunas formas de incertidumbre introducen una nueva dimensión llamada riesgo, que captura factores que no estarían presentes en las métricas de desempeño si la incertidumbre no existiera. El riesgo es un tema muy popular en campos como las finanzas, la gestión de la cadena de suministro y la salud. Existen muchos libros que hablan sobre el riesgo, junto con artículos muy sofisticados que lo modelan, sin llegar nunca a ofrecer una definición formal de riesgo. Nosotros proporcionaremos esta definición en el Capítulo 3.

### Etapa II: Modelado {#universalmodelingframework}

Nuestras tres preguntas iniciales (métricas de desempeño, decisiones, incertidumbres) sientan las bases de lo que llamaremos nuestro *marco de modelado universal* (o UMF, por sus siglas en inglés). El UMF puede usarse para modelar *cualquier* problema de decisión, especialmente cuando utilizamos la versión extendida para manejar problemas multiagente. Por ahora, ponemos énfasis en capturar la evolución de las decisiones y la información a lo largo del tiempo. En el Volumen II, describiremos el UMF utilizando notación matemática completa (que no es tan mala como suena), pero por ahora, lo esbozaremos en lenguaje sencillo.

El Marco de Modelado Universal consta de cinco elementos:

1. **Variables de estado** capturan toda la información que necesitamos para tomar decisiones y calcular nuestras métricas de desempeño. Comprender los elementos de una variable de estado nos informa sobre qué información se necesita para tomar decisiones.
2. **Variables de decisión** representan qué decisiones podríamos tomar (partiendo de los tipos de decisiones que describimos al enmarcar el problema). Nótese que asumimos que tomamos decisiones con alguna "política" *que se diseñará más adelante.*
3. **Información exógena** es cualquier información nueva que llega después de que tomamos una decisión, y antes de que tomemos nuestra próxima decisión.
4. **La función de transición** describe cómo cambia la variable de estado dado qué decisión hemos tomado, y dada la información exógena que llegó después de que tomamos una decisión.
5. **La función objetivo** describe cómo evaluar el desempeño del sistema utilizando el método que hemos elegido para tomar decisiones.

Identificar las variables de estado requiere elegir el método (llamado política) para tomar decisiones, por lo que esto debe hacerse primero. Sin embargo, evaluar y ajustar políticas requiere todo el marco de modelización universal si vamos a utilizar un simulador. En última instancia, el diseño de políticas (que juega un papel importante en determinar qué información necesitamos en la variable de estado) y la evaluación de las políticas es un proceso iterativo.

El marco de modelización universal se cubre con mucho más detalle en el Volumen II, donde introducimos una notación matemática muy básica.

Si el marco de modelización universal suena obvio, es porque lo es. No es más que un marco que describe la evolución de lo que sabemos (la variable de estado) mediante decisiones (que controlamos) y la información exógena (que no controlamos). Lo que resulta quizás sorprendente es que esto no sea estándar en la literatura de investigación, aunque existen algunos espacios donde puede encontrarse.

Podría decirse que el paso más difícil es diseñar la política para tomar decisiones. Separamos el proceso de evaluar una política del proceso de diseñarla, lo cual diferencia nuestro enfoque del que se utiliza prácticamente en todos los libros sobre optimización estocástica. Afortunadamente, contamos con una estrategia para superar esta complejidad.

### Etapa III: Implementación

Sin duda, la dimensión más ampliamente pasada por alto en el diseño y solución de modelos de optimización es el proceso de implementarlos. La literatura académica ignora por completo que lo que importa no es qué tan bien resolvemos un problema en la computadora, sino el impacto de las decisiones cuando se implementan.

Las dimensiones clave de la implementación cubren tres áreas:

1. Adquirir los datos necesarios para completar la variable de estado, es decir, la información que necesitamos para tomar decisiones y calcular las métricas de desempeño (se proporcionan más detalles en el Volumen II).
2. Implementar las decisiones, lo que podría significar lograr que las personas sigan instrucciones, o comunicar las instrucciones electrónicamente.
3. Evaluar el desempeño. Para sistemas complejos, entender qué tan bien está funcionando el sistema, lo cual presumiblemente se ve afectado por las decisiones que se toman, puede ser bastante difícil.

Para problemas complejos en la industria, la implementación puede ser un proceso excepcionalmente desafiante. Aunque esto se considere fuera del alcance del proceso de modelización, resulta útil que los modeladores piensen en estos pasos. Puede ser que algunas decisiones simplemente nunca vayan a ser tomadas por una computadora. Por ejemplo, la asignación de recursos en un contexto de salud pública implica negociar entre organizaciones estatales, regionales y locales, cada una con sus propias prioridades ocultas.

## Tres tipos de información

Primero reconocemos que cualquier cantidad que pueda representarse en una computadora es una forma de información. Podemos identificar tres tipos de información desde la perspectiva de cómo evoluciona con el tiempo:

1. La información que conocemos en el momento en que tomamos una decisión, la cual constituye el estado de nuestro sistema (más precisamente, el estado de conocimiento). Esta es la información necesaria para tomar decisiones y/o calcular las métricas de desempeño, ahora o posiblemente en el futuro.
2. Nueva información que controlamos. Definimos las decisiones formalmente en el Capítulo 4 y describimos 10 tipos diferentes de decisiones, lo cual ayuda en el proceso de identificar decisiones.
3. Nueva información que llega desde fuera de nuestro sistema y fuera de nuestro control, aunque puede verse influenciada por nuestro estado actual y/o las decisiones que tomamos. Llamamos a esto información exógena, y puede provenir de varias fuentes:
   - Fenómenos naturales como el clima y los terremotos.
   - Mercados, como la demanda de un producto, los precios de las acciones y las tasas de interés.
   - Dinámica poblacional, como la propagación de enfermedades.
   - El comportamiento de otras empresas u organizaciones.
   - Decisiones tomadas por personas (más generalmente, agentes) fuera de nuestro sistema, tales como:
     - Las decisiones de producción de los proveedores de insumos para una planta de manufactura.
     - Otras divisiones dentro de una empresa (como precios y marketing, si estamos en manufactura o planificación de inventario).
     - Las acciones de un paciente (si usted es el médico).
     - Los anuncios publicados por el candidato competidor en una elección presidencial.

   La información exógena se describe con mayor profundidad en el Capítulo 5.

## La toma de decisiones como proceso

Existe una vasta literatura enfocada en crear "problemas de optimización" que consisten en:

- Una decisión (o conjunto de decisiones).
- Un objetivo a minimizar o maximizar.
- Restricciones, que determinan el conjunto de decisiones permitidas.

La toma de decisiones real es un proceso, y entender este proceso es fundamental para diseñar métodos que permitan tomar mejores decisiones. Comenzamos identificando los siguientes elementos:

1. Problemas de decisión secuencial, que describen el proceso de tomar un conjunto particular de decisiones a lo largo del tiempo por parte de un único agente.
2. La "cadena de información", que describe el proceso de creación de la información necesaria para tomar una decisión.
3. Los pasos involucrados en la implementación de decisiones.
4. El proceso de evaluación del desempeño.

Fuera del alcance de esta monografía queda el desafío de coordinar entre múltiples tomadores de decisiones.

### Problemas de decisión secuencial

Ahora estamos listos para escribir, en español, un problema de decisión secuencial, que podemos expresar de la siguiente manera:

> *Estado, decisión, información; estado, decisión, información; …, estado, decisión, información.*

Cada tripleta {estado, decisión, información (exógena)} representa la información asociada con un período de tiempo particular:

1. **"Estado"** es la información que conocemos al inicio del período de tiempo.
2. **"Decisión"** es nuestra información controlable de manera endógena.
3. **"Información (exógena)"** es la información que llega después de que tomamos una decisión, y antes de que tomemos la siguiente decisión.

Después de tomar una decisión (a veces después de observar la información exógena) nos detenemos y calculamos las métricas de desempeño.

Por supuesto, no todos los problemas de decisión son problemas de decisión secuencial, aunque la gran mayoría de las decisiones se toman de manera repetida a lo largo del tiempo. Sin embargo, podemos identificar varias categorías de problemas de decisión secuencial desde la perspectiva de la secuenciación de decisiones e información:

1. Tomar una decisión, detenerse.
2. Tomar una decisión, observar la información exógena, detenerse.
3. Tomar una decisión, observar información, tomar una decisión más, detenerse.
4. Tomar una decisión, observar información, tomar una decisión, observar información, …, repetir $T$ veces, detenerse.
5. Tomar una decisión, observar información, repetir infinitamente.

Algunos comentarios:

- **La categoría 1** describe problemas de decisión estáticos y determinísticos que han dominado lo que se conoce como la comunidad de optimización desde la década de 1950. La versión más simple de estos problemas podría implicar encontrar la mejor de un conjunto de opciones, como comprar un artículo del proveedor con el costo más bajo, siempre que asumamos que el artículo funcionará exactamente como esperamos.

  Casos de problemas más complejos podrían implicar encontrar la asignación de menor costo de suministros desde múltiples fuentes para atender diferentes necesidades, o asignar diferentes personas o máquinas para realizar diferentes tareas, introduciendo la complejidad de trabajar en múltiples dimensiones. La complejidad de estos problemas ha llevado al asombroso descuido de que la gran mayoría de las aplicaciones son en realidad problemas de decisión secuencial, una propiedad que ha sido completamente ignorada en la literatura sobre este tema.
- **La categoría 2** describe problemas conocidos como búsqueda estocástica, que representa una de las clases de problemas más ampliamente estudiadas. Ejemplos de problemas de búsqueda estocástica incluyen:
  - Elegir un conjunto de instalaciones de manufactura y almacenes, y luego ejecutar una simulación para evaluar su desempeño.
  - Elegir un régimen de tratamiento para un paciente, y luego observar cómo se desarrolla.
  - Establecer una estrategia de inversión para una cartera de acciones, y luego observar qué tan bien funciona.

  Todos estos pueden describirse mediante "hacer una elección" y luego "observar qué tan bien funciona la elección." Si esto se realiza en un simulador o un laboratorio, podríamos ser capaces de ejecutar estos experimentos una y otra vez. En este caso tenemos un proceso de búsqueda completamente secuencial que cae dentro de la categoría 4.
- **La categoría 3** describe una versión más general de la categoría 2, donde podríamos tomar una decisión inicial, como enviar producto a un conjunto de almacenes. A continuación, se revelan las demandas del producto en los puntos de venta minorista. Finalmente, tenemos la decisión de enviar desde los almacenes hacia los puntos de venta minorista. Este problema ha sido ampliamente estudiado bajo el paraguas de la programación estocástica.
- **La categoría 4** es la forma más común de problema de decisión secuencial, ya que captura la naturaleza repetida de tomar decisiones seguidas de aprender nueva información, pero nos detenemos después de un número específico de pasos de tiempo, típicamente por la razón práctica de que estamos ejecutando una simulación que debe tener un punto de parada predefinido.
- **La categoría 5** es un tema popular en comunidades como la programación dinámica (específicamente los procesos de decisión de Markov) y el control estocástico. El objetivo suele ser la suma descontada infinita de costos o recompensas. Esta literatura típicamente asume que la información que llega en cada paso de tiempo proviene de la misma distribución (esto se conoce como una distribución estacionaria) y resulta útil para derivar una variedad de resultados teóricos.

### De optimizar decisiones a políticas

Cuando resolvemos un problema de optimización estático y determinístico, prácticamente todos los autores representan la decisión como una variable (típicamente un vector) "$x$" para la cual tenemos que diseñar un algoritmo que encuentre la mejor "$x$." Por el contrario, cuando tenemos un problema de decisión secuencial, existe una falta fundamental de comprensión sobre qué es lo que estamos optimizando. En pocas palabras, con problemas determinísticos buscamos la mejor decisión $x$, mientras que para los problemas de decisión secuencial buscamos la mejor función (es decir, la política) que represente un método para tomar decisiones.

La idea de encontrar la mejor función para tomar decisiones parece ajena a la literatura de optimización. Por el contrario, esto es exactamente lo que se hace en el aprendizaje automático, donde el desafío consiste en encontrar una función (a menudo llamada modelo estadístico) que haga el mejor trabajo posible al ajustarse a los datos. En adelante, nos referiremos a las funciones para tomar decisiones como políticas, un tema que abordamos con mayor detalle en el Volumen II.

### La cadena de información

Tomar una decisión guarda ciertos paralelismos con la fabricación de productos físicos. Para fabricar un automóvil (por ejemplo), es necesario fabricar diversas piezas, lo que a menudo requiere múltiples pasos. Luego, después de fabricar el automóvil, tenemos que distribuirlo al cliente.

Las decisiones se "toman" a partir de información, la cual a su vez puede necesitar ser creada (recopilada o estimada) a través de una serie de pasos. Decidir cuántos autos fabricar, y de qué tipos, puede requerir un pronóstico que se elabore a partir de datos históricos, así como de pronósticos económicos y estimaciones de un equipo de ventas. Estos datos luego deben pasar por un conjunto de métodos que generan los pronósticos.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/FlowofInformation.png" alt="An illustration of information flowing from initial source, through stages of processing and estimation, up to the point where it is used to make decisions.">
  <figcaption><span class="fig-num">Figura 1.3.</span> Una ilustración del flujo de información desde la fuente inicial, a través de etapas de procesamiento y estimación, hasta el punto en que se utiliza para tomar decisiones (otra forma de información).</figcaption>
</figure>

El flujo de información se representa en la figura 1.3. La "información" podría ser inventarios observados, un pronóstico creado a partir del historial, el resultado de una decisión de recopilar información mediante una encuesta de mercado, o el resultado de un proceso de planificación de la producción. Los nodos de procesamiento son funciones matemáticas: conjuntos de ecuaciones que actúan sobre las entradas para producir una salida. Las funciones pueden hacer cualquier cosa, desde sumar números hasta producir pronósticos o tomar decisiones resolviendo un problema de optimización.

Al igual que con los procesos físicos, los procesos de información típicamente consisten en pasos manuales (como ingresar los inventarios) combinados con pasos que se realizan en la computadora (y que, por lo tanto, están automatizados), como ejecutar un pronóstico.

Es fácil pensar que, dado el uso extensivo de las computadoras, los procesos de información deberían estar casi completamente automatizados. Sin embargo, todavía hay muchos trabajadores de oficina, y ellos no están cargando camiones ni trabajando en una línea de ensamblaje.

## Inteligencia artificial

En última instancia, el objetivo de pensar en un problema complejo de manera formal es utilizar el poder de la computadora para mejorar el proceso. La mayoría de las personas sugerirán inmediatamente el uso de "inteligencia artificial" (a menudo denominada "IA"). El problema es que "IA" es un término que se ha utilizado desde la década de 1950, y ha evolucionado constantemente a lo largo de los años, aplicándose típicamente al último invento que surge del campo de la informática.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/7levelsofAI.png" alt="Los 7 niveles de la inteligencia artificial." style="max-width: 485px;">
  <figcaption><span class="fig-num">Figura 1.4.</span> Los 7 niveles de la inteligencia artificial.</figcaption>
</figure>

Dividimos las principales formas de IA en siete niveles, representados en la figura 1.4. Después de describir estos siete niveles, los organizaremos en cuatro clases fundamentalmente diferentes de inteligencia.

### Los siete niveles de IA

**Nivel 1: Lógica basada en reglas** - Esta evolucionó por primera vez en las décadas de 1960 y 1970, y surgió en la década de 1980 (cuando las computadoras se volvieron mucho más ampliamente disponibles) como "sistemas expertos." Estos consisten en reglas especificadas por humanos de la forma "Si {condición} entonces {acción}." Por ejemplo, la condición podría ser "comer carne roja" y la acción podría ser "beber vino tinto." O la condición podría ser los atributos de un paciente (síntomas, género, edad, peso, ¿fumador?, presión arterial, …) y la acción podría ser un tratamiento médico.

Esta forma de IA atravesó lo que se ha conocido como el "ciclo de sobreexpectación" ("hype cycle"), donde la gente fantaseaba sobre cómo las computadoras iban a dominar el mundo.

El problema con los sistemas basados en reglas es que, a medida que crecía el número de elementos que componían una condición, el número de posibles pares condición/acción aumentaba exponencialmente (un comportamiento conocido como la "maldición de la dimensionalidad"). Para la década de 1990, esta forma temprana de IA era ampliamente considerada un fracaso, pero de hecho los sistemas basados en reglas siguen siendo ampliamente utilizados incluso hoy en día. El único fracaso es que no estuvieron a la altura del entusiasmo inicial. Los sistemas basados en reglas se utilizan ampliamente en la actualidad.

**Nivel 2 – Estadística/aprendizaje automático** - En desarrollo desde principios del siglo XX, la estadística (conocida como aprendizaje automático en informática) es la ciencia de usar datos para estimar modelos. Podríamos usar observaciones de diferentes precios de una habitación de hotel para estimar la demanda, o demandas históricas para pronosticar el futuro. Este campo creció de manera explosiva en las décadas de 1980 y 1990 (a medida que las computadoras se volvieron ampliamente disponibles).

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ThreeCirclesofML.png" alt="Todo tipo de función para el aprendizaje automático cae en tres círculos superpuestos." style="max-width: 310px;">
  <figcaption><span class="fig-num">Figura 1.5.</span> Todo tipo de función para el aprendizaje automático cae en estos círculos superpuestos, incluyendo 1) funciones de tabla de consulta, 2) funciones paramétricas, y 3) funciones no paramétricas (localmente paramétricas).</figcaption>
</figure>

Los modelos de aprendizaje automático vienen en una variedad de estilos, pero estos se pueden organizar en tres clases amplias como se ilustra en la figura 1.5:

- **Tablas de consulta** – Estas tienen la forma "Si {entrada} entonces {salida}," similar a los sistemas basados en reglas.
- **Modelos paramétricos** – Estas son funciones analíticas de entradas que producen una o más salidas usando una función matemática que depende de un conjunto de parámetros desconocidos. Si la función es lineal en estos parámetros, entonces sería un modelo lineal. Los modelos más generales usan funciones que son no lineales en los parámetros. La figura 1.6 ilustra modelos lineales y no lineales.

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/LinearandNonlinearFunctions.png" alt="Ilustraciones de funciones paramétricas lineales y no lineales usadas en el aprendizaje automático." style="max-width: 464px;">
    <figcaption><span class="fig-num">Figura 1.6.</span> Ilustraciones de funciones paramétricas lineales y no lineales usadas en el aprendizaje automático.</figcaption>
  </figure>

  <figure class="book-figure">
    <img src="/assets/images/bridging-vol1/NeuralNetwork.jpg" alt="Ilustración de una pequeña red neuronal.">
    <figcaption><span class="fig-num">Figura 1.7.</span> Ilustración de una red neuronal (muy pequeña). Cada enlace lleva un parámetro que debe ajustarse para que la salida se acerque lo más posible a la etiqueta asociada con las entradas en un conjunto de datos de entrenamiento.</figcaption>
  </figure>

  Una clase importante de modelos paramétricos que surgió por primera vez en la década de 1970 son las redes neuronales (véase la figura 1.7). Las redes neuronales tienen una capa de entrada, donde cualquier conjunto de entradas ingresa a la red a través de los nodos de entrada. Estos valores luego se transforman a través de las capas intermedias antes de producir una o más salidas. Cada enlace en la red tiene un parámetro asociado, donde las primeras redes neuronales a menudo tenían miles a un millón de parámetros.

  Es mejor pensar en las redes neuronales como una función no lineal de muy alta dimensión que puede usarse para ajustar un conjunto virtualmente ilimitado de relaciones, pero a costa de requerir grandes conjuntos de datos de entrenamiento. Además, su flexibilidad limita su capacidad de ser utilizadas en presencia de ruido.
- **Modelos no paramétricos** – Estos se conciben más fácilmente como modelos que son aproximaciones locales de una función. Por ejemplo, podemos tener estimaciones de una función en un conjunto de puntos, y luego usamos extrapolaciones lineales de estos puntos para proporcionar estimaciones de puntos para los que no tenemos una estimación.

**Nivel 3 – Reconocimiento de patrones** - El siguiente nivel de IA surgió de la comunidad de investigación en 2010, abordando el problema del reconocimiento de patrones. El reconocimiento de patrones es solo otra forma de aprendizaje automático que vimos en el nivel 2, que involucra el uso de redes neuronales. Sin embargo, estas redes neuronales son mucho más grandes que las utilizadas en la década de 1990. En lugar de muchos miles a un millón de parámetros, estas redes neuronales podrían tener de 10 a 100 millones de parámetros. Estas se denominaron "redes neuronales profundas."

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/SunflowerTakemeHome.jpg" alt="Ilustración de la capacidad de una red neuronal para reconocer la imagen de un girasol, o el patrón de voz que dice Take me home.">
  <figcaption><span class="fig-num">Figura 1.8.</span> Ilustración de la capacidad de una red neuronal para reconocer la imagen de un girasol, o el patrón de voz que dice "Take me home."</figcaption>
</figure>

Las entradas serían los píxeles en una imagen (o las señales de un patrón de voz), lo cual es una entrada de dimensión mucho más alta. La parte difícil fue crear un conjunto de datos de entrenamiento lo suficientemente grande como para realizar el ajuste de parámetros. El conjunto de datos de entrenamiento tenía que consistir en millones de imágenes (que era fácil de encontrar en internet) con las "etiquetas" asociadas que identificaban la imagen, como "girasol" o "Take me home" en la figura 1.8. La parte difícil era obtener las etiquetas, que tenían que ser generadas por personas.

El gran avance en el entrenamiento llegó cuando una profesora de informática de Princeton, Fei-Fei Li, se dio cuenta de que un entorno de software creado por Amazon llamado "Mechanical Turk" hacía posible llegar a personas de todo el mundo dispuestas a trabajar por salarios muy bajos para crear estas etiquetas. En otras palabras, el gran avance no fue tanto la analítica subyacente (las redes neuronales se desarrollaron ya en la década de 1970), sino más bien el acceso a suficientes datos a bajo costo.

**Nivel 4 – Modelos de lenguaje de gran escala** - El nivel 4 es simplemente otro paso más allá del reconocimiento de imágenes, donde en lugar de estimar (o "predecir") la identidad de una imagen, la red neuronal tomaba como entrada una secuencia de palabras (desde unas pocas palabras hasta cientos o miles de palabras) para predecir la siguiente palabra (los modelos actúan sobre fragmentos de palabras conocidos como "tokens"). Esto lo hace creando una distribución de probabilidad de las palabras que podrían venir a continuación dada una secuencia de palabras, que podría ser un mensaje inicial (prompt) proporcionado por un usuario.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/ChatGPTPrompt.png" alt="Los Modelos de Lenguaje de Gran Escala como ChatGPT utilizan un conjunto de datos de entrenamiento para construir una distribución de palabras que podrían seguir a una secuencia de palabras.">
  <figcaption><span class="fig-num">Figura 1.9.</span> Los Modelos de Lenguaje de Gran Escala como ChatGPT utilizan un conjunto de datos de entrenamiento para construir una distribución de palabras que podrían seguir a una secuencia de palabras, iniciada con un mensaje (prompt), pero construyendo sobre la secuencia creada por el LLM.</figcaption>
</figure>

La figura 1.9 ilustra esto, comenzando con el mensaje "La mejor manera de mejorar la robustez de una cadena de suministro es…" La red neuronal luego produce una distribución de probabilidad de la palabra que podría venir a continuación, basada en el conjunto de datos de entrenamiento. El modelo de lenguaje de gran escala (o LLM) entonces muestrea de esta distribución, en proporción a la distribución. Si elige la palabra "diseñar" entonces la secuencia "La mejor manera de mejorar la robustez de una cadena de suministro es diseñar…" se ingresa a la red neuronal, que luego produce otra distribución de palabras. El proceso de muestrear una palabra, agregarla a la secuencia anterior de palabras para producir una nueva secuencia, se repite una y otra vez. Es por esto que el proceso se llama "IA generativa."

Las redes neuronales utilizadas para generar la distribución de "siguientes palabras" que siguen a una secuencia anterior son verdaderamente colosales. Mientras que una red neuronal profunda para reconocimiento de patrones (Nivel 3) podría tener de 10 a 100 millones de parámetros, las redes neuronales utilizadas para los LLM podrían variar entre 10 mil millones y 1 billón de parámetros.

De esta descripción debe quedar claro que los LLM no son inherentemente inteligentes; simplemente están imitando patrones de palabras de un conjunto de datos de entrenamiento. Suenan inteligentes porque están imitando patrones de palabras que provienen de una fuente inteligente (asumiendo que un humano escribió las palabras).

**Nivel 5 – Optimización determinista** – Esto cubre una biblioteca sustancial de herramientas para resolver problemas de decisión difíciles. Estos problemas se conocen como programas lineales, programas enteros y programas no lineales, y todos tienen la característica de que una "decisión" es un vector, lo que significa que es un conjunto de diferentes decisiones (un conjunto muy grande). Algunos ejemplos son:

- Podríamos querer decidir cuánto producto enviar desde un conjunto de 10 centros de distribución a 200 almacenes, creando un vector de 2,000 dimensiones que debe decidirse.
- Las aerolíneas tienen que programar sus aeronaves y las tripulaciones (tanto pilotos como personal de cabina) durante períodos extendidos (típicamente trimestrales) para maximizar la utilización mientras se observan las reglas para el mantenimiento de las aeronaves junto con las reglas para el uso del personal.
- Un gestor financiero puede estar constantemente haciendo malabares con la asignación de capital entre 10,000 inversiones diferentes, lo que nos da 10,000 decisiones de compra o venta que se toman diariamente.

A menudo estos problemas pueden representarse de forma pictórica, como se muestra a la izquierda en la figura 1.10, pero existe una forma estándar de escribirlos matemáticamente, a menudo comenzando con la notación de la derecha. Si bien esta notación matemática no será generalmente familiar, las universidades producen miles de estudiantes cada año que son entrenados para modelar problemas en este formato. Luego, existen muchos paquetes informáticos, algunos disponibles comercialmente mientras que otros están disponibles de forma gratuita, que pueden resolver eficientemente incluso problemas a gran escala.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/AssignmenttoLinearProgram.jpg" alt="Graphical illustration of an assignment problem and its mathematical representation as a linear program.">
  <figcaption><span class="fig-num">Figura 1.10.</span> Ilustración gráfica de un tipo de problema de decisión (asignar recursos a tareas), y su representación matemática como un programa lineal.</figcaption>
</figure>

**Nivel 6 – Problemas de decisión secuencial** – La gran mayoría de las decisiones se toman de manera repetida a lo largo del tiempo, ya sea cada pocos segundos, minutos u horas, diaria, semanal, trimestral o anualmente. Incluso nuestros problemas de optimización determinista del nivel 5 anterior se resuelven usualmente de manera repetida a lo largo del tiempo, pero la mayoría de las decisiones son mucho más simples. Algunos ejemplos de problemas de decisión secuencial son:

- Decidir cuándo vender un activo, y el valor esperado de mantener el activo frente a precios que cambian dinámicamente.
- Reponer inventario, posiblemente con plazos de entrega muy largos, para satisfacer demandas inciertas en un mercado dinámico.
- Determinar los parámetros de una política de trading financiero automatizado.
- Elegir las concentraciones correctas de materiales, la temperatura adecuada para la mezcla y el tiempo de exposición de la mezcla a cada temperatura para producir un material con la mayor resistencia.
- Elegir el mejor medicamento para tratar a un paciente con características específicas.
- Decidir cuánta energía almacenar a partir de una combinación de parques eólicos, parques solares y la red eléctrica para satisfacer las cargas (demandas) futuras al menor costo.
- El transporte de carga completa por camión requiere determinar qué conductores moverán qué cargas de mercancía.
- Elegir cuánto invertir en cada una de miles de acciones y otras inversiones.

Los problemas de decisión secuencial surgen a lo largo de los procesos humanos. Una decisión puede ser binaria (mantener o vender), discreta (qué medicamento), o vectores discretos y continuos. Elegir entre las mejores opciones de un conjunto discreto (o discretizado) de alternativas es, con facilidad, el problema de decisión secuencial más común, pero muchos involucran problemas operacionales complejos que surgen en la logística empresarial, los sistemas de energía y los problemas de distribución en el ámbito de la salud.

**Nivel 7 – Creatividad, razonamiento y juicio** – El nivel 7 representa el nivel más alto de inteligencia. Por ejemplo, si bien muchos de los problemas de los niveles 5 y 6 pueden ser bastante complejos, siempre involucran problemas bien estructurados con decisiones y objetivos claramente definidos. El nivel 7 es donde podemos plantear problemas complejos como reducir las emisiones de CO2, minimizar enfermedades y crear nuevos productos.

Es nuestra firme convicción de que, si bien muchos autores hablarán sobre el futuro de la "IA" en términos de reemplazar a las personas, la realidad es que las computadoras no podrán ir más allá de los problemas bien definidos. Una actividad que creemos está más allá de la capacidad de la inteligencia computacional (incluidas las habilidades sobredimensionadas de los grandes modelos de lenguaje) es enmarcar problemas de decisión complejos. Por esta razón, nos referimos al nivel 7 como ciencia ficción, algo divertido para hablar pero que en realidad nunca sucederá.

### Tres clases de inteligencia computacional

Los primeros seis niveles de inteligencia artificial representan diferentes formas de inteligencia que pueden implementarse en una computadora, mientras que el séptimo, en nuestra opinión, sigue siendo dominio exclusivo de los seres humanos. Los primeros seis niveles pueden dividirse en tres clases distintas:

**Clase 1 – Comportamientos especificados por humanos** – Esta clase incluye el nivel 1 de los siete niveles de IA, y puede usarse para dos propósitos diferentes:

- Reconocimiento de patrones – Una regla puede especificar que si un paciente tiene un conjunto específico de condiciones, entonces significa que tiene una enfermedad específica.
- Decisiones – De manera similar, un paciente con un conjunto específico de condiciones debería tomar un medicamento en particular (lo cual es una forma de decisión).

La lógica basada en reglas no distingue entre si la regla está haciendo una afirmación sobre el estado del mundo, o una acción que debe tomarse. Las condiciones detrás de la regla y su resultado (ya sea una afirmación del estado o una decisión) deben especificarse manualmente.

Una característica importante de la inteligencia artificial de Clase 1 es lo que no utiliza:

- No utiliza un conjunto de datos de entrenamiento.
- No requiere un modelo del problema de decisión subyacente.

Las reglas deben ser especificadas directamente por personas, aunque es posible que las reglas se especifiquen en un conjunto de datos. Por ejemplo, podríamos tener un conjunto de datos que enumere protocolos médicos, donde para cada condición del paciente se especifica un tratamiento. Sin embargo, imaginemos que tenemos un conjunto de datos compilado a partir de decisiones reales de médicos que pueden entrar en conflicto: diferentes médicos pueden ordenar tratamientos contradictorios a pesar de tener pacientes con condiciones idénticas. Si usamos este conjunto de datos para aprender tratamientos, eso sería un ejemplo de aprendizaje automático.

**Clase 2 – Aprendizaje automático** – Esta clase incluye los niveles 2, 3 y 4. El aprendizaje automático se refiere al uso de funciones matemáticas que consisten en entradas y un conjunto de parámetros ajustables que pueden modificarse de modo que la función se ajuste lo mejor posible a un conjunto de respuestas, también llamadas etiquetas (entre muchos otros nombres). El aprendizaje automático requiere una función especificada por el usuario, junto con un conjunto de datos de entrenamiento que consiste en entradas y respuestas (etiquetas).

Mientras que la lógica basada en reglas está limitada en cuanto a la complejidad de las entradas, el aprendizaje automático puede manejar entradas muy complejas usando modelos que tienen un gran número de parámetros. Los modelos lineales pueden tener desde docenas hasta cientos de miles de variables. Las redes neuronales se han entrenado para aplicaciones de lenguaje a gran escala con más de un billón de variables. Por supuesto, los modelos más grandes requieren conjuntos de datos grandes, lo cual ha demostrado ser la principal barrera que limita el uso de redes neuronales para la tarea altamente compleja del procesamiento del lenguaje.

**Clase 3 – Optimización** – Esta clase incluye los niveles 5 y 6, que abordan el problema de elegir la mejor decisión de un conjunto de opciones, que puede ser un conjunto discreto o un espacio vectorial de alta dimensión. El nivel 5 se limita a problemas estáticos (deterministas) donde todos los datos son conocidos, y buscamos la mejor decisión (que a menudo es un vector). El nivel 6 aborda el complejo problema de elegir las mejores decisiones a lo largo del tiempo, lo cual abarca una gama absolutamente vasta de problemas.

La clase de optimización no utiliza un conjunto de datos de entrenamiento. En cambio, es necesario especificar una métrica de desempeño (a menudo llamada función objetivo) junto con un conjunto de ecuaciones que describen qué decisiones son permitidas. Para los problemas de decisión secuencial, también necesitamos ecuaciones que nos indiquen cómo evoluciona la información a lo largo del tiempo.

### Resumen

Los métodos de la clase 2, el aprendizaje automático, apuntan a entrenar funciones matemáticas para que se comporten como un conjunto de datos de entrenamiento. Si el conjunto de datos de entrenamiento consiste en imágenes tales como radiografías de mama junto con "etiquetas" generadas por humanos sobre si el seno muestra evidencia de cáncer, el modelo entrenado nunca podrá desempeñarse mejor que las habilidades de los radiólogos que proporcionaron las etiquetas. Por esta razón, es posible decir que los métodos de Clase 2 (aprendizaje automático) enseñan a las computadoras a comportarse como humanos (más precisamente, a comportarse como el conjunto de datos de entrenamiento).

Por el contrario, los métodos de la Clase 3 (optimización) están diseñados para producir decisiones que superen a los humanos. El precio de este desempeño de nivel superior es que debemos proporcionar lo que se conoce como un modelo del problema. En particular, estos métodos requieren un modelo matemático, que consiste en:

- Un conjunto bien definido de decisiones.
- Una métrica de desempeño clara que permita evaluar si una decisión es mejor que otra.
- La física del problema que describe:
  - Qué decisiones pueden tomarse en un momento dado.
  - Cómo evoluciona el sistema a lo largo del tiempo.
  - Cómo llega nueva información al sistema.

Este libro aborda la clase 3, ya que esto cubre los métodos que abordan la toma de decisiones. En particular, nos vamos a enfocar en los problemas de decisión secuencial, ya que estos son los más generalizados: prácticamente todos toman decisiones, y las tomamos a lo largo del tiempo, lo que las convierte en decisiones secuenciales. Los problemas estáticos (deterministas) son solo un caso especial de los problemas de decisión secuencial, y la solución de los problemas de decisión secuencial se apoyará en gran medida en las herramientas desarrolladas para los problemas estáticos y deterministas.

Los problemas de decisión secuencial representan una clase de problemas increíblemente rica. Invariablemente, estas herramientas dependen de los métodos de los primeros cinco niveles de inteligencia artificial. Al igual que con las herramientas del nivel 5 (optimización determinista), necesitamos un modelo del problema subyacente. Sin embargo, dado que los problemas de decisión secuencial son mucho más ricos que los problemas estáticos del nivel 5, los modelos deben ser mucho más ricos y complejos, pero esta es un área donde el modelado matemático clásico se ha quedado corto.

## Marcos de modelado tradicionales

Es útil dividir los marcos de modelado para la toma de decisiones en dos categorías amplias:

- Modelos estáticos y deterministas que asumen que toda la información es conocida, donde nos esforzamos por elegir las decisiones que funcionan mejor.
- Modelos de decisión secuencial que capturan el flujo de decisiones e información. Dado que modelamos explícitamente la información que llega después de tomar una decisión, esto significa que las decisiones deben tomarse antes de que llegue la información (presumiblemente relevante para el desempeño de la decisión).

En este volumen, todos los problemas de decisión secuencial capturan explícitamente el flujo de información, lo que significa que estamos tomando decisiones en cada punto del tiempo antes de conocer la información que puede llegar en el futuro. Por esta razón, los problemas de decisión secuencial son fundamentalmente *estocásticos* (el término elegante para decir que la información futura es aleatoria).

### Modelos estáticos y deterministas

La literatura para modelar problemas estáticos y deterministas está bastante madura, con una base sustancial de software construido en torno a variaciones de un modelo de optimización que puede escribirse:

$$
\begin{align}
\min_{x,y} \quad & C(x,y) \tag{1}\\
\text{subject to:}\\
& g(x,y) = 0, \tag{2}\\
& x \geq 0, \tag{3}\\
& y \in \{0,1\}. \tag{4}
\end{align}
$$

Hemos permitido la presencia tanto de variables continuas $x$ (que podrían tomar un valor como 0.56) como de variables discretas $y$ que deben ser 0 o 1.

Lo que sucede al modelar problemas de optimización determinista (nivel 5) es que tomamos el modelo matemático dado por las ecuaciones (1)–(4), y luego vamos al problema físico y completamos los elementos del modelo, lo que requiere identificar las variables de decisión, la función objetivo y las restricciones. Imagine tener un martillo y buscar clavos. La herramienta es útil, pero el proceso requiere encajar el problema dentro del marco de modelado.

La optimización determinista ha enfatizado durante mucho tiempo el desafío de diseñar herramientas para encontrar las decisiones óptimas dado un modelo, con atención secundaria dada a la creación del modelo en sí. Nótese que el marco de modelado no proporciona ningún mecanismo para capturar la evolución de las decisiones y la información, ni nada relacionado con cómo se organizan las decisiones.

### Modelos de decisión secuencial

Tradicionalmente, la literatura sobre problemas de decisión secuencial ha intentado seguir el mismo enfoque, pero ha fracasado por completo. En contraste con el marco de modelado bien definido para la optimización determinista representado por las ecuaciones (1)–(4), la literatura de optimización no ha adoptado un marco de modelado estándar para los problemas de decisión secuencial. Al momento de escribir esto, hay más de una docena de comunidades diferentes que utilizan ocho sistemas de notación distintos, con estilos fundamentalmente diferentes para expresar qué problema se está resolviendo, o qué se está buscando resolver. Por ejemplo, algunas comunidades escriben una función objetivo tal como se hace en la optimización determinista, otras escriben una política, y otras escriben una condición de optimalidad.

Nuestro enfoque depende del marco de modelado universal esbozado en la [sección anterior](#universalmodelingframework), que puede utilizarse para modelar *cualquier* problema de decisión secuencial. Este marco de modelado se describe en detalle en *Reinforcement Learning and Stochastic Optimization* [capítulo 9]. Este libro expone el modelo antes de describir las políticas para tomar decisiones, lo cual se hace en el capítulo 11 (el capítulo 10 se centra en el modelado de la incertidumbre).

El Volumen II de esta serie también cubrirá las dimensiones del marco de modelado universal con mucho más detalle del que podemos ofrecer en este volumen, utilizando niveles modestos de notación. Sin embargo, el marco de modelado universal no puede utilizarse sin responder a las tres preguntas abordadas en este volumen.

<figure class="book-figure">
  <img src="/assets/images/bridging-vol1/DiscreteChoicewithUncertainty.jpg" alt="A decision problem with discrete choices, and uncertainty about the value of each choice.">
  <figcaption><span class="fig-num">Figura 1.11.</span> Un problema de decisión con opciones discretas, e incertidumbre sobre el valor de cada opción.</figcaption>
</figure>

### El problema de decisión más común

Los problemas de decisión, y en particular los problemas de decisión secuencial, son una clase de problemas excepcionalmente rica. Sin embargo, algo que a menudo se pasa por alto en la literatura sobre optimización es que la gran mayoría de los problemas de decisión se describen mediante la figura 1.11, donde podríamos tener dos opciones (tomar una acción o no), o un pequeño conjunto de opciones (qué medicamento usar, dónde comprar una pieza), o un gran número de opciones (qué producto anunciar, qué molécula usar al crear un nuevo medicamento).

Una característica distintiva de esta clase de problemas es que, si bien podemos tener una estimación sobre el desempeño de cada opción, típicamente somos inciertos sobre el desempeño que surgirá después de hacer una elección. Puede que tengamos solo una oportunidad de tomar la mejor decisión, pero a menudo tomamos esta decisión de manera repetida, y podemos aprender de experiencias pasadas. Hay muchas variaciones de este problema:

- Si estamos ejecutando experimentos fuera de línea en un laboratorio o simulador, o si tenemos que aprender mientras actuamos.
- El número de veces que repetimos la elección.
- Lo que aprendemos de una elección puede afectar nuestras creencias sobre otras opciones, reflejando un modelo de creencia subyacente.
- La estructura del modelo de creencia que captura cualquier relación estructural subyacente.
- La presencia de recursos físicos que se están consumiendo o gestionando, como configurar una máquina para realizar un experimento, consumir suministros, o requerir personal capacitado.
- El tiempo y el gasto necesarios para tomar e implementar una elección.

El enfoque más común que utilizan las personas al elegir entre un conjunto discreto de opciones es simplemente elegir la que parece ser la mejor. Esto ignora la capacidad de aprender de la elección para tomar una mejor decisión en el futuro. El valor de aprender ahora sobre decisiones futuras dependerá en gran medida de cuántas veces nos enfrentaremos al mismo conjunto de opciones. También podría estar ignorando riesgos que puedan estar asociados con hacer una elección que podría tener un desempeño muy pobre.

Hay muchos entornos en los que las decisiones son bastante importantes, y tenemos que vivir con la decisión durante un tiempo. Ejemplos podrían ser decidir desarrollar un medicamento en particular, o elegir un proveedor con el que tendremos que trabajar durante al menos un año. Para estos problemas, es particularmente importante dedicar tiempo a desarrollar el mejor conjunto de creencias sobre el posible desempeño de cada opción.

Los modelos de creencia típicamente se complican por las correlaciones. Elegir qué medicamento desarrollar puede requerir comparar diferentes tipos de medicamentos contra el cáncer que sirven a un mercado similar. Podríamos tener que elegir entre varios proveedores agrupados por país que comparten los mismos riesgos de aumento de aranceles, brotes de enfermedades, y cambios de divisas.

### Problemas de decisión estáticos versus secuenciales

En la literatura académica, existe una fuerte sensación de competencia entre la comunidad que se dedica a la optimización determinista, y las comunidades fragmentadas que trabajan en optimización bajo incertidumbre. La mayoría de los modelos de optimización determinista son aproximaciones deterministas de problemas estocásticos, y un subproducto de esto es que las personas que utilizan la optimización determinista pueden ser bastante defensivas cuando se enfrentan a las formas en que la incertidumbre afecta su problema.

Instamos a los lectores a tener en cuenta lo siguiente:

- Un modelo de optimización estático y determinista es solo un caso especial de un problema de decisión secuencial.
- Mostraremos (en el Volumen II) que las herramientas de optimización determinista se utilizan ampliamente en la solución de problemas de decisión secuencial generales.
- Con diferencia, el problema de decisión más común que surge en aplicaciones prácticas es el que se representa en la figura 1.11, donde tenemos que elegir la mejor de un conjunto de opciones. Incluso cuando capturamos la incertidumbre en nuestras creencias sobre las opciones, los diferentes métodos para resolver este problema aún se reducen a resolver secuencias de problemas de optimización determinista.
- El problema no es que se utilice una aproximación determinista; el error está en cómo se evalúan las decisiones. El desempeño de las decisiones tiene que evaluarse a lo largo del tiempo a medida que llega nueva información.

El error más común que se comete al utilizar modelos de optimización determinista es pasar por alto cuándo el problema tiene que resolverse repetidamente a lo largo del tiempo. Un ejemplo de esto surge en una clase de problemas llamada "problema de asignación", donde estamos asignando "recursos" (personas, camiones, máquinas) a "tareas" (asignaciones de trabajo, cargas a mover, trabajos por completar). Estos nunca se resuelven una sola vez; a medida que avanza el tiempo, los recursos hacen progresos completando las tareas, se solicitan nuevas tareas, y las máquinas pueden sufrir fallos que cambian cuánto tiempo necesitan para terminar una tarea.

La figura 1.12(a) representa el problema como un problema estático y determinista. Cuando este problema fue resuelto por primera vez por George Dantzig en la década de 1950, se consideró un gran avance (y lo fue). Sin embargo, incluso 70 años después, los principales profesionales pasan por alto que el problema nunca se resuelve una sola vez; tiene que resolverse repetidamente a lo largo del tiempo, y prácticamente siempre es el caso que la solución en un momento dado afecta los problemas que deben resolverse en el futuro (incierto).

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
  <figcaption><span class="fig-num">Figura 1.12.</span> (a) Problema de asignación estático; (b) problema de asignación dinámico.</figcaption>
</figure>

El problema real se representa en la figura 1.12(b), donde ilustramos el problema siendo resuelto secuencialmente a lo largo del tiempo. Notamos que es imposible determinar si un problema de optimización determinista necesita resolverse secuencialmente con solo observar las matemáticas del modelo; se requiere entender el problema en lenguaje natural.

## Etapas del modelado

Comenzamos reconociendo tres formas diferentes de ver un problema:

- **El mundo real** – Aquí es donde se implementan las decisiones, y donde recopilamos información que describe el verdadero desempeño de nuestro sistema.
- **El modelo base** – Este típicamente tiene la forma de un simulador diseñado para imitar el mundo real de la manera más fiel posible. Los simuladores (a veces llamados "gemelos digitales") son poderosos, pero pueden ser muy costosos de desarrollar, razón por la cual a menudo necesitamos diseñar métodos para tomar decisiones sin el beneficio de un simulador para probar el desempeño de nuestra política.
- **Un modelo de anticipación** – Los modelos de anticipación se utilizan únicamente para tomar decisiones cuando tenemos que aproximar el impacto de una decisión tomada ahora sobre el futuro. Los modelos de anticipación se utilizan ampliamente de alguna forma (Google Maps utiliza un modelo de anticipación aproximado para planificar una ruta hacia el destino), pero no se usan de manera universal.

En la [discusión sobre el encuadre del problema anterior](#framingtheproblem), describimos tres etapas involucradas en la comprensión de las diferentes dimensiones de un problema de decisión. En esta sección, nos vamos a enfocar específicamente en desarrollar un modelo computacional, en caso de que se necesite uno.

1. **Encuadrar el problema:** – Cualquier intento de modelar un problema de decisión requiere los elementos identificados en nuestro proceso de encuadre:
   - Una narrativa en lenguaje sencillo – Es importante comenzar siempre una descripción con las palabras de un experto del dominio sin ninguna formación, ni siquiera en el proceso de modelado.
   - Responder las tres preguntas de encuadre:
     - ¿Cuáles son las métricas de desempeño? Si no puede articular métricas de desempeño cuantificables, puede que tenga uno de esos problemas complejos y no estructurados que no se prestan a un proceso de análisis formal.
     - ¿Qué tipos de decisiones se están tomando (y posiblemente quién las toma)? En este punto, ¿el simple hecho de enumerar las posibles decisiones hace evidente qué elección debería tomar?
     - ¿Cuáles son los tipos de incertidumbres que pueden afectar el desempeño del sistema? Esta puede ser una pregunta compleja que llevará tiempo articular y luego analizar para comprender el efecto de estas incertidumbres sobre el desempeño de las diferentes decisiones.

   En este punto, puede que sienta que la elección que debería hacer es obvia. Si no es así, continúe con el siguiente paso.
2. **El marco de modelado universal** – Comprender los diferentes elementos del marco de modelado universal (descrito [anteriormente](#universalmodelingframework)) puede proporcionar una comprensión más completa de su problema. Específicamente:
   - Necesitará reunir la información que necesita para tomar una decisión y calcular sus métricas de desempeño (también conocidas como las variables de estado). Dado que esto depende de cómo va a tomar las decisiones (la política), típicamente no podrá identificar todos los elementos de las variables de estado de inmediato.

Preste atención a la información que le gustaría tener, pero que no puede observar directamente (al menos no con ninguna precisión). Estas pueden representar oportunidades para usar la estimación estadística/aprendizaje automático.
   - Comprenda qué decisiones se le permite tomar. Más adelante abordará el problema de tomar decisiones (diseñando la política).
   - Enumere los tipos de información que llegarán después de que tome una decisión.
   - Necesitará pensar en cómo cambia con el tiempo la información en su variable de estado. Por supuesto, esto evoluciona conforme evoluciona nuestra comprensión de qué información necesitamos. Esta es la función de transición.
   - Finalmente, necesitará entender cómo va a evaluar el desempeño de su sistema. Esto constituye su función objetivo.
3. **Modelado de la incertidumbre** – Esta suele ser la dimensión más sutil al modelar un problema de decisión secuencial, a menudo porque las cantidades inciertas pueden no ser inmediatamente obvias. Aunque hay muchas fuentes potenciales de incertidumbre, solo hay dos maneras en que esta entra en el modelo:
   - Incertidumbre en cantidades y parámetros dentro de la variable de estado, que porta la información necesaria para tomar una decisión y/o calcular métricas de desempeño.
   - Incertidumbre en la información que puede llegar después de que se toma una decisión, pero antes de que se tome la siguiente decisión (a esto lo hemos venido llamando el proceso de información exógena).

   Hay diferentes maneras de capturar la incertidumbre:
   - Usar observaciones de cantidades inciertas (precios, demandas, tiempos de viaje) provenientes de la historia, y usar estas muestras para calibrar y afinar nuestro modelo.
   - Crear un modelo matemático de la incertidumbre, y luego generar muestras a partir del modelo matemático.

   Abordamos la incertidumbre con mucha mayor profundidad en el Capítulo 5, donde identificaremos varias fuentes diferentes de incertidumbre como guía para nombrar las incertidumbres que se aplican a su aplicación específica.
4. **Diseño de políticas** – Aquí abordamos el desafío muy rico de diseñar métodos para tomar decisiones. El Capítulo 4 describe cuatro clases de políticas, que capturan métodos fundamentalmente diferentes para tomar decisiones, pero dejamos para el Volumen III una discusión completa del proceso de diseño de políticas.

   Note que, si bien introducimos la idea de una variable de estado en el marco de modelado universal, la variable de estado está parcialmente definida por la información que necesita la política.
5. **Implementación computacional** – Una vez que hemos diseñado las políticas, tenemos que decidir cómo las vamos a probar. Las opciones son:
   - Prueba en campo – En este caso todo lo que tenemos que hacer es implementar la política en una computadora, lo que también significa reunir los datos necesarios para tomar una decisión.
   - Simulación por computadora – Cómo probamos las políticas en la computadora depende de la complejidad del sistema. Típicamente estamos eligiendo entre:
     - Implementación en hoja de cálculo – La mayoría de los problemas son relativamente simples, lo que nos permite probar ideas en una hoja de cálculo. Las hojas de cálculo pueden incluso ser la base de un sistema de producción.
     - Entornos de programación de propósito general – Si el problema es demasiado complejo para una hoja de cálculo, necesitaremos recurrir a cualquiera de una amplia gama de entornos de programación. Esto requiere las habilidades de programadores expertos.
6. **Evaluación y calibración de modelos y políticas** – En este punto tenemos que decidir si podemos desarrollar un simulador para evaluar la política, o si necesitamos implementar la política para que se pueda usar en campo:
   - Desarrollar un simulador basado en computadora – En este punto tenemos todo lo que necesitamos para simular el desempeño de la política. Un simulador de computadora es simplemente una implementación de software de los elementos del marco de modelado universal. Luego podemos ejecutar este simulador ya sea con datos históricos, o con datos generados a partir de un modelo matemático.
   - Prueba en campo – Con frecuencia sucede que no tenemos el tiempo o los recursos para desarrollar un simulador. En cambio, implementamos la política y luego monitoreamos cómo funciona en la práctica.

   Crear un simulador basado en computadora ofrece ventajas significativas, pero introduce la difícil dimensión de la calibración del modelo. En cambio, implementar una política directamente en campo significa que la estamos probando en un entorno que no requiere calibración. El problema con una implementación en campo es que buscar entre diferentes clases de políticas, y en particular afinar cualquier parámetro, puede ser dolorosamente lento. Afinar políticas en campo ha recibido muy poca atención en la literatura de investigación.

## Tipos de analítica

Si estamos resolviendo problemas de optimización determinista, podemos recurrir a una familia sustancial de solucionadores, desde paquetes comerciales como Gurobi o FICO Xpress hasta cualquiera de una amplia gama de paquetes que se pueden descargar gratis. Por ejemplo, Google ofrece su "OR Toolbox" sin costo, incluso para usuarios comerciales.

Hay muy poco en cuanto a herramientas comerciales para optimizar decisiones a lo largo del tiempo, como sería necesario en un problema de decisión secuencial. Sin embargo, típicamente recurriremos a varias cajas de herramientas mientras construimos sistemas personalizados para problemas específicos. Estas incluyen:

- **Optimización determinista** – Solo porque estamos tratando de tomar decisiones a lo largo del tiempo, bajo incertidumbre, no significa que las herramientas de la optimización determinista ya no se usen. De hecho, la mayoría (pero no todos) de los problemas de decisión secuencial implican resolver secuencias de problemas de optimización que se resuelven usando solucionadores deterministas.
- **Simulación** – Típicamente esto se refiere a la simulación de Monte Carlo, que es un cuerpo de herramientas y técnicas para estimar funciones de variables aleatorias. Las herramientas de Monte Carlo son particularmente adecuadas para problemas complejos y de alta dimensionalidad, lo que las convierte en una de las herramientas más poderosas para modelar la evolución de la información.
- **Estimación estadística/aprendizaje automático** – Herramientas de Estad./AA, que incluyen regresión lineal o no lineal, regresión de árboles, modelos localmente paramétricos, y redes neuronales en una variedad de tamaños. El Estad./AA se puede describir como un conjunto de herramientas para estimar algo que no conocemos, usando información que sí conocemos.

Estas herramientas típicamente se describen como provenientes de diferentes comunidades, de las cuales solo una (la optimización determinista) se considera que resuelve problemas de decisión. Y, sin embargo, es importante comprender el papel de cada una con el propósito de tomar decisiones.

Los modelos de simulación, por ejemplo, casi siempre se construyen para ayudar a comprender el comportamiento de algún proceso, que podría ser cualquier cosa desde una planta de manufactura hasta la propagación de una enfermedad en una población. En ambos ejemplos estamos buscando ver cómo el diseño del sistema (el diseño de la planta, dónde se mantienen los inventarios de vacunas) o el control del sistema (cómo se enrutan los trabajos, colocar pedidos de reabastecimiento de vacunas). También podríamos simular la trayectoria de los huracanes, y aunque no podemos cambiar sus trayectorias, esta información se puede usar para ayudar a guiar las evacuaciones, las cuales también tendrían que ser simuladas.

En resumen, ayuda pensar en los modelos de simulación como funciones objetivo, o pronósticos de eventos futuros que se usarán para tomar decisiones.

Entonces, ¿qué pasa con la estimación estadística/aprendizaje automático? Si bien estos campos usan la optimización para ajustar un modelo, el objetivo es simplemente estimar una cantidad o parámetro. Pero, ¿por qué estamos creando estas estimaciones?

Podríamos estar estimando la naturaleza de un tumor, o cuántas personas aprueban el desempeño de un presidente, o la probabilidad de que un circuito funcione. O podríamos estar estimando eventos en el futuro, como cuántas personas podrían comprar un producto, o la generación de energía en un parque eólico. En todos estos casos, estamos creando una estimación o pronóstico para ayudar a tomar una decisión ahora.

Cada una de estas herramientas también puede proporcionar servicios con valor intrínseco más allá de ayudar a tomar mejores decisiones. Esto se ve más fácilmente con los grandes modelos de lenguaje que están evolucionando rápidamente al momento de escribir esto. Por ejemplo, los LLM pueden ayudar con un conjunto creciente de tareas, como hacer investigación, procesar solicitudes y crear imágenes, pero no tomar decisiones.

## Notas de cierre

Este capítulo ha establecido las bases para pensar en el complejo conjunto de problemas conocidos como problemas de decisión secuencial. Partimos de la siguiente premisa:

> "Si quiere manejar mejor {cualquier cosa}, tiene que tomar mejores decisiones."

La gran mayoría de los entornos que implican tomar decisiones caen en la amplia categoría de problemas de decisión secuencial, donde tomamos decisiones repetidamente a lo largo del tiempo a medida que llega nueva información (note que un caso especial de un problema de decisión secuencial es un problema donde solo tomamos una decisión).

El objetivo del volumen es construir puentes desde cualquier problema donde exista interés en desempeñarse mejor (presumiblemente tomando mejores decisiones), y el software de computadora que pueda ayudar con esas decisiones. Las computadoras requieren modelos matemáticos que capturen el problema, y estos modelos necesitan comprender el problema, expresado en inglés (o español), pero usando términos que capturen el problema de una manera que se pueda traducir al lenguaje de los modelos.

Una característica crítica de este proceso es el uso de una estrategia de modelado general que llamamos el marco de modelado universal. Es nuestra afirmación, basada en décadas de trabajo en una clase muy amplia de problemas de muchos entornos, que este marco de modelado puede capturar las características de cualquier problema donde las computadoras puedan ser útiles. Esta es una advertencia importante, ya que hay problemas con métricas mal definidas, o inexistentes: ¿Casarse con alguien? ¿Qué carrera elegir como especialización en la universidad? ¿Qué restaurante elegir al recibir a un visitante?

El marco de modelado universal formaliza decisiones tales como cómo tomar una decisión (llamada política), lo cual luego ayuda a responder qué información se necesita. El MMU también proporciona una base para comparar políticas que no necesitan un pronóstico (comprar-barato, vender-caro en finanzas, políticas de inventario de pedido hasta un nivel) contra aquellas que sí lo necesitan, y para evaluar el valor de pronósticos más precisos.

Usar computadoras para tomar decisiones abre la puerta al uso de la "inteligencia artificial", que es un término ampliamente usado en la prensa pública sin estar propiamente definido. Cubrimos los siete niveles de inteligencia artificial que diferencian claramente entre herramientas basadas en aprendizaje automático, como los grandes modelos de lenguaje (tales como ChatGPT), y herramientas para tomar decisiones, como la optimización determinista (nivel 5) y los problemas de decisión secuencial (nivel 6).

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Cuáles son las tres etapas de la automatización de decisiones?</li>
<li>¿Cuáles son las tres preguntas planteadas en la Etapa 1 del planteamiento del problema? Ilustre estas en un entorno de problema de su elección.</li>
<li>¿Cuáles son los cinco elementos del marco de modelado universal?</li>
<li>¿Cuál es la definición de una decisión? Dé tres ejemplos en diferentes entornos que encuentre en sus actividades personales.</li>
<li>Describa brevemente los siete niveles de inteligencia artificial, divididos en las cuatro clases diferentes como se organizan en el capítulo.</li>
<li>¿Cuáles son las tres clases de modelos estadísticos?</li>
<li>¿Cuál es la diferencia entre un modelo base y un modelo de anticipación? Use el contexto de hacer un viaje largo en automóvil usando Google Maps para ilustrar ambos.</li>
<li>¿Cuáles son las seis etapas del modelado?</li>
</ol>

**Preguntas de modelado**

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Dé un ejemplo de un problema de decisión secuencial que encuentre en sus actividades diarias y haga lo siguiente:
  <ol type="a">
    <li>Identifique al menos una métrica de desempeño que le gustaría mejorar.</li>
    <li>Proporcione al menos una decisión que afecte la métrica de desempeño.</li>
    <li>Describa cualquier incertidumbre que pudiera interferir con el desempeño de la decisión cuando se implemente.</li>
  </ol>
</li>
<li>Dé tres ejemplos de problemas que involucren recursos físicos e identifique las decisiones que surgen en cada contexto.</li>
<li>Va a jugar 15 partidas de tres en raya (tic-tac-toe), donde el objetivo es forzar al jugador contrario a lograr tres en línea (momento en el cual usted gana). Ninguno de los dos ha jugado antes este juego, y usted quiere capturar cómo el otro jugador aprende su estrategia de juego. Recuerde que el tres en raya normalmente termina en empate, por lo que será necesario hacer creer a su oponente que va a cometer un error. Responda las siguientes preguntas en español (no se permiten matemáticas).
  <ol type="a">
    <li>Diseñe una métrica de desempeño que capture los resultados de las 15 partidas.</li>
    <li>¿Qué decisiones tiene que tomar?</li>
    <li>¿Cuáles son las incertidumbres?</li>
    <li>Describa la información que tendría después de jugar varias partidas que querría tener para diseñar una política.</li>
  </ol>
</li>
</ol>

{% endraw %}
