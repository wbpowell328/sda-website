---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 6: Problemas de la ruta más corta estocástica - Dinámica"
permalink: /sdam/es/chapter-6/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 0cd6be02e9b93c08
---

{% raw %}
## Descripción general del capítulo

El [Capítulo 5](/sdam/chapter-5/) planteó un problema de ruta más corta que asume que o bien no sabemos nada sobre los tiempos de viaje que cambian dinámicamente en los enlaces, o bien podemos observar los tiempos en los enlaces que están conectados a la intersección donde se encuentra nuestro viajero (pero nada más en el futuro).

Ahora imaginemos que somos un servicio como Google maps que tiene acceso a información en tiempo real sobre toda la red. Además, esta información se está actualizando en tiempo real, lo que lleva a que Google actualice la ruta recomendada hacia el destino del viajero. Esta información introduce un cambio importante en el modelo que elimina por completo cualquier posibilidad de usar los métodos que presentamos en el [Capítulo 5](/sdam/chapter-5/).

El enfoque que usamos para este problema se aplica a cualquier problema que resolveríamos planificando hacia el futuro utilizando lo que podríamos llamar "mejores estimaciones" de valores incierto. Esto proporciona un entorno para nuestro primer uso de la cuarta clase de política, que llamamos aproximaciones de anticipación directa. Usamos este entorno para demostrar un método práctico y poderoso para tomar decisiones en un entorno dinámico (lo que significa bajo incertidumbre), donde comenzamos con un modelo de anticipación determinista y luego introducimos parámetros para que funcione mejor a lo largo del tiempo, bajo incertidumbre.

## Narrativa

Vamos a abordar de nuevo las rutas más cortas estocásticas, pero esta vez lo vamos a hacer tal como se hace en Google maps (o en cualquier sistema comercial de navegación). Todos reconocemos que las redes de transporte a menudo tienen patrones predecibles de congestión, junto con variaciones aleatorias que ocurren en el curso natural de los eventos. Por ejemplo, un accidente podría crear un atasco donde podríamos estimar cómo podrían evolucionar los retrasos en el viaje como resultado del accidente.

El punto de partida respecto al problema estático de ruta más corta es que nuestras estimaciones de costos en el futuro están evolucionando con el tiempo. Vamos a volver al problema donde los costos son estocásticos, pero cuando llegamos a un nodo $i$, no vemos las realizaciones reales de los costos que salen del nodo $i$. Sin embargo, vamos a asumir que se nos dan estimaciones actualizadas de los costos en toda la red. Estas estimaciones pueden verse como un pronóstico; vamos a asumir que el costo real en el que incurrimos al atravesar un arco será, en promedio, igual al pronóstico (es decir, los pronósticos son insesgados), pero estos pronósticos evolucionarán con el tiempo a medida que obtengamos actualizaciones sobre el estado de la red.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Deseamos minimizar el tiempo de viaje esperado, donde también podemos incluir una penalización por llegar después de una hora de llegada objetivo.
- **Decisiones:** Para un viajero en el nodo $i$, queremos indicarle a qué nodo $j$ desplazarse a continuación.
- **Incertidumbres:** Los tiempos de viaje estimados cambian aleatoriamente cada vez que un viajero atraviesa un enlace hacia un nodo posterior. El tiempo real al atravesar un enlace diferirá de la estimación.

## Modelo básico

Supongamos que cuando tenemos que tomar una decisión en el tiempo $t$, tenemos una estimación actualizada de los costos de viaje basada en los niveles de congestión *actuales* (rastreando la velocidad a la que se mueven nuestros teléfonos inteligentes en el tráfico). Vamos a representar estos tiempos usando $\cbar_{tk\ell}$, el costo estimado de atravesar el enlace $(k,\ell)$ en el tiempo $t$, usando estimaciones basadas en lo que sabemos en el tiempo $t$.

Por ahora, no vamos a intentar modelar el costo si llegamos a un punto en el tiempo $t' > t$ dado lo que sabemos en el tiempo $t$. Así que podemos estimar, a las 3pm, que vamos a llegar a un enlace a las 5pm, pero vamos a usar nuestra estimación de las 3pm (como lo hace Google actualmente).

### Variables de estado

Se asume que a un viajero en el nodo $N_t = i$ en el tiempo $t$ se le da un conjunto de pronósticos $\cbar_{t} = (\cbar_{ttk\ell})\_{k, \ell \in \Ncal}$, el vector de estimaciones del costo de atravesar el enlace $(k, \ell)$ en el tiempo $t$, dado lo que se conoce en el tiempo $t$. El estado del viajero $S_t$ en el tiempo $t$ es entonces

$$
S_t = (N_t, \cbar_t).
$$

Nótese que esta variable de estado es *muy* grande; consiste en un vector de estimaciones de costos de enlace para *cada* enlace de la red.

### Variables de decisión

Las variables de decisión son las mismas que en el problema estático de ruta más corta estocástica

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i \text{ at time } t, \\ 0 & \text{otherwise.} \end{cases}
$$

Esta decisión tiene que obedecer la restricción de que hagamos *algo* cuando estemos en el estado $N_t = i$ siempre que $i$ no sea el destino. Escribimos esta restricción como

$$
\begin{align}
\sum_j x_{t,i,j} = 1 \quad \text{for } N_t = i \text{ other than the destination.} \label{dynamicshorestpathconstraint}
\end{align}
$$

Si estamos en el destino, entonces no hacemos nada, y en cambio escribimos $x_{tij} = 0$ para $i$ igual al destino, y $j$ para cualquier otro nodo.

Como arriba, dejamos que $X^\pi(S_t)$ sea nuestra política para determinar el vector $x_t$ que asumimos debe satisfacer la restricción $\eqref{dynamicshorestpathconstraint}$.

### Información exógena

Hay dos tipos de información exógena para este problema. El primer tipo son los costos observados: $\chat_{t+1,ij}$, el costo real de atravesar el enlace $(i,j)$ después de que el viajero tomó la decisión en el tiempo $t$ de atravesar este enlace. Nótese que solo observamos $\chat_{t+1,ij}$ si el viajero atraviesa el enlace $(i,j)$ (podemos simplemente insertar 0 para los enlaces que no atravesamos, ya que no usaremos estos valores).

El segundo tipo de nueva información son las actualizaciones a las estimaciones $\cbar_t$ de los costos de enlace. Vamos a modelar la información exógena como el cambio en las estimaciones:

$$
\delta \cbar_{t+1,k\ell} = \begin{cases} \cbar_{t+1,k\ell} - \cbar_{tk\ell} & \text{if } x_{tk\ell}=1, \\ 0 & \text{otherwise.} \end{cases}
$$

$$
\delta \cbar_{t+1} = (\delta \cbar_{t+1,k\ell})_{(k,\ell)\in\Ncal}.
$$

Nuestra variable de información exógena, entonces, viene dada por

$$
W_{t+1} = (\chat_{t+1}, \delta \cbar_{t+1}).
$$

### Función de transición

Estamos asumiendo que $\chat_{t+1}$ llega como información exógena (podríamos haber dejado que la información exógena fuera el cambio en los costos, pero esto es más natural).

La función de transición para los pronósticos evoluciona según

$$
\begin{align}
\cbar_{t+1,k\ell} = \cbar_{tk\ell} + \delta \cbar_{t+1,k\ell}. \label{eq:shortestpathdynamictransition1}
\end{align}
$$

Finalmente, actualizamos el estado físico $N_t$ usando

$$
\begin{align}
N_{t+1} = \{j\vert x_{t,N_t,j} = 1\}. \label{eq:shortestpathdynamictransition2}
\end{align}
$$

En otras palabras, si estamos en el nodo $i=N_t$ y tomamos la decisión $x_{tij}= 1$ (lo cual requiere que estemos en el nodo $i$, ya que de otra manera $x_{tij} = 0$), entonces $N_{t+1} = j$.

La actualización de $\chat_{t+1}$, la ecuación $\eqref{eq:shortestpathdynamictransition1}$ para los pronósticos $\cbar_{t+1}$ y la ecuación $\eqref{eq:shortestpathdynamictransition2}$ para nuestro estado físico $R_t$, conforman nuestra función de transición

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

### Función objetivo

Ahora escribimos nuestra función objetivo como

$$
\begin{align}
\min_\pi F^\pi(S_0) = \E \left\{\sum_{t=0}^T \sum_{(i,j)\in\Ncal} \chat_{t+1,i,j}X^\pi(S_t)\vert S_0 \right\}. \label{eq:shortestpathdynamicobjective}
\end{align}
$$

Nótese que nuestra política $X^\pi(S_t)$ hace la elección del siguiente enlace al que nos movemos dado lo que sabemos en el tiempo $t$, capturado por $S_t$.

## Modelando la incertidumbre

En la práctica, la actualización dinámica de los costos (y pronósticos) proviene de sistemas reales, lo que significa que están *impulsados por datos*. Cuando este es el caso, no usamos un modelo matemático de los costos de enlace. La alternativa es tener un modelo matemático de la información aleatoria $W^{n+1}$.

Si deseamos ejecutar simulaciones, entonces enfrentamos el desafío de modelar la realización de los costos capturados por $\chat_t$, así como la secuencia de pronósticos. Hay que tener bastante cuidado con este modelo. Primero, el cambio en la estimación de $\ctilde_t$, que representamos por $\delta \ctilde_{t+1}$, tiene que extraerse de una distribución con media $0$. Además, las realizaciones $\chat_{t+1}$ tienen que extraerse de una distribución con media $\ctilde_t$.

No queremos minimizar el desafío de crear un modelo estocástico realista. Los cambios en los costos de enlace surgen de diferentes fuentes, desde variaciones naturales del tráfico, el clima, accidentes, y cambios en los flujos debido a que los conductores responden a la congestión en otras partes de la red. Las variaciones estocásticas en los costos de enlace son no estacionarias, y no son independientes, ni en el tiempo ni entre enlaces. Sin embargo, más allá de reconocer los difíciles desafíos, un modelo más realista está fuera del alcance de nuestra discusión.

## Diseñando políticas

Un indicio rápido de que no vamos a usar la ecuación de Bellman (ni siquiera de forma aproximada) es el tamaño de la variable de estado, que ahora incluye pronósticos de costos de viaje en cada enlace de la red.

En cambio, vamos a basar nuestra política en un modelo especial que llamamos un *modelo de anticipación*. Por ejemplo, en el tiempo $t$ podemos crear un modelo que consiste en estados $S_t$, decisiones $x_t$ e información exógena $W_{t+1}$, pero en nuestro problema base la variable de estado $S_t = (N_t, \cbar_t)$, que es bastante complicada.

En cambio, vamos a crear un modelo más simple donde primero creamos un nuevo conjunto de variables que típicamente son aproximaciones de las variables en el modelo base. Diferenciamos un nuevo conjunto de variables para nuestros modelos de anticipación colocando tildes sobre las variables en el modelo de anticipación, y las indexamos con dos índices de tiempo: el tiempo $t$, que es el momento en el que se está tomando una decisión, y un segundo índice $t'$ que es el tiempo dentro del modelo de anticipación.

La secuencia de estados, decisiones e información exógena en el modelo de anticipación se escribiría entonces

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots ).
$$

Nuestro vector de costos $\cbar_t$ sería entonces reemplazado por el vector $\ctilde_{tt'}$. Ahora enfrentamos el desafío de diseñar una política de anticipación que podríamos llamar $\Xtilde_{tt'}(\Stilde_{tt'})$ que determina $\xtilde_{tt'}$ dentro del modelo de anticipación. A continuación proponemos dos estrategias, ambas de las cuales pueden resolverse usando un algoritmo simple de ruta más corta.

### Una política de anticipación determinista

Aproximamos el problema asumiendo que los costos en el modelo de anticipación, $\ctilde_{tt'}$, son fijos e iguales a las estimaciones actuales, lo que significa que dejamos que

$$
\ctilde_{tt'k\ell} = \cbar_{tk\ell}.
$$

Esto significa que ya no tenemos las variables de información exógena $\Wtilde_{tt'}$, lo que nos da un modelo de anticipación determinista.

Esto nos permite resolver nuestro modelo de anticipación de manera determinista, tratando las estimaciones de costos $\ctilde_{tt',k\ell}$ como el costo correcto en lugar de variables aleatorias. En este caso, nuestra variable de estado es una vez más simplemente el nodo donde se encuentra el viajero (dentro del modelo de anticipación).

Podemos resolver este problema con un algoritmo estándar de ruta más corta que, como vimos en el [Capítulo 5](/sdam/chapter-5/), es un programa dinámico determinista que podemos resolver con la ecuación de Bellman, lo cual hacemos encontrando primero el "valor" de estar en el nodo $i$ en el tiempo $t'$ en nuestro modelo de anticipación. Podemos calcular estos valores estableciendo los valores al final de nuestro modelo de anticipación para el tiempo $t$ igual a cero

$$
\Vtilde_{t,t+H}(i) = 0,\ \text{for all } i.
$$

Luego, retrocedemos en el tiempo (en el modelo de anticipación) para $t' = t+H-1, t+H-2, \ldots, t$ y calculamos, para cada nodo $i$:

$$
\begin{align}
\Vtilde_{tt'}(i) = \min_{j\in\Ncal^+_i} (\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(j)). \label{eq:shortestpathdetlookahead}
\end{align}
$$

Nuestra política de anticipación viene entonces dada por

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij} + \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmandetlookahead}
\end{align}
$$

Finalmente, la política que vamos a implementar en el modelo base, si estamos en el nodo $i$, sería

$$
X^\pi_t(S_t = i) = \Xtilde^\pi_{tt}(S_t = i).
$$

Esta es la política que estamos usando cuando seguimos un sistema de navegación. Tomar decisiones basadas en un modelo de anticipación determinista es uno de los métodos más ampliamente utilizados para tomar decisiones en problemas de decisión secuencial bajo incertidumbre.

<figure class="book-figure">
  <img src="/assets/images/sdam/rhpdeterministic123.jpg" alt="Ilustración de la simulación de una política de anticipación directa, usando un modelo determinista del futuro." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 6.1.</span> Ilustración de la simulación de una política de anticipación directa, usando un modelo determinista del futuro.</figcaption>
</figure>

La Figura 6.1 ilustra un proceso de anticipación de horizonte deslizante. En los tiempos $t$, $t+1$, $t+2$, $\ldots$, creamos y resolvemos un modelo de anticipación usando estimaciones de costos tal como las conocemos. Luego resolvemos nuestro problema de ruta más corta, que se representa en las decisiones $\xtilde_{tt'}(j)$ para todos los nodos $j$, pero luego solo implementamos la decisión $\xtilde_{tt}(i)$ para el nodo $i$ donde estamos ubicados en el tiempo $t$.

Cuando mantenemos constante una variable que cambia dinámicamente en un modelo de anticipación, nos referimos a esta variable como una *variable latente* en el modelo de anticipación. El término "variable latente" técnicamente significa variable oculta; en este contexto se refiere a una variable que no cambia con el tiempo (dentro del modelo de anticipación), en cuyo caso la eliminamos de la variable de estado, lo que significa que está oculta (nuevamente, en el modelo de anticipación).

Este es uno de varios tipos diferentes de aproximaciones que se pueden hacer en un modelo de anticipación. La aproximación más obvia que estamos haciendo es que usamos un futuro determinista, lo que significa que las estimaciones de los costos de enlace se mantienen constantes dentro del modelo de anticipación, incluso mientras están cambiando en el modelo base.

El modelo de anticipación, entonces, es su propio modelo con sus propias características, que es la razón por la cual usamos variables con tildes — así es como hacemos la distinción entre nuestro modelo base, que usa variables como $S_t$ y $x_t$, y el modelo de anticipación, donde usamos variables como $\Stilde_{tt'}$ y $\xtilde_{tt'}$.

A continuación, vamos a proponer un pequeño ajuste para hacer que este enfoque funcione mejor bajo incertidumbre.

### Una política de anticipación determinista parametrizada

Una estrategia simple para manejar la incertidumbre en nuestro problema de la ruta más corta dinámica sería reemplazar nuestra estimación puntual $\ctilde_{tt'k\ell}=\cbar_{tk\ell}$ para el costo de recorrer el enlace $(k,\ell)$ en el momento $t$ con, digamos, el percentil $\theta$ de los costos, sugiriendo que escribamos los costos como $\ctilde_{tt',k\ell}(\theta) = \cbar_{tij}(\theta)$. Esta lógica podría, por ejemplo, evitar una ruta que pasa por un área que a veces se congestiona mucho, donde el costo *podría* ser bastante alto.

Esta política sigue produciendo un problema de ruta más corta determinista que es tan fácil de resolver como cuando usamos las estimaciones puntuales $\cbar_t$. Simplemente modificamos las ecuaciones $\eqref{eq:shortestpathdetlookahead}$–$\eqref{eq:shortestpathbellmandetlookahead}$ anteriores usando los costos de enlace del percentil $\theta$. Luego designamos las funciones de valor $\Vtilde_{tt'}(i\vert \theta)$ para indicar la dependencia del parámetro $\theta$, el cual se calcula usando

$$
\begin{align}
\Vtilde_{tt'}(i\vert \theta) = \min_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{t,t'+1}(j\vert \theta)\big). \label{eq:shortestpaththetalookahead}
\end{align}
$$

Nuestra política de anticipación está entonces dada por

$$
\begin{align}
\Xtilde^\pi_{tt'}(\Stilde_{tt'}=i\vert \theta) = \argmin_{j\in\Ncal^+_i} \big(\ctilde_{tt',ij}(\theta) + \Vtilde_{tt'}(\Stilde_{t,t'+1}=j)\big). \label{eq:shortestpathbellmanthetalookahead}
\end{align}
$$

Luego escribimos nuestra política parametrizada para el modelo base (que da las decisiones que realmente se implementan) usando

$$
X^\pi_t(S_t = i\vert \theta) = \Xtilde_{tt}(S_t = i\vert \theta).
$$

Esto es equivalente a nuestro modelo de anticipación determinista original, con una excepción importante: necesitamos calibrar $\theta$ optimizando

$$
\begin{align}
\min_\theta F^\pi(\theta\vert S_0) = \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}. \label{eq:tuneshortestpathcfa}
\end{align}
$$

donde $S_{t+1} = S^M(S_t,X^\pi(S_t\vert \theta), W_{t+1})$ (ver ecuaciones $\eqref{eq:shortestpathdynamictransition1}$–$\eqref{eq:shortestpathdynamictransition2}$) usando algún método para generar realizaciones aleatorias de $W_1, \ldots, W_T$.

El problema de optimización en $\eqref{eq:tuneshortestpathcfa}$ es en sí mismo un problema desafiante, pero se ve facilitado porque $\theta$ es un escalar entre 0 y 1. Los algoritmos prácticos para optimizar la función objetivo en $\eqref{eq:tuneshortestpathcfa}$ típicamente involucran ejecutar simulaciones para obtener observaciones ruidosas de la función.

Una pregunta obvia es si el uso de un percentil diferente de $\theta = 0.5$ mejoraría los resultados. Nuestra experiencia es que esto es cierto cuando hay una penalización por llegadas tardías (por ejemplo, queremos llegar a una cita a las 9am).

## ¿Qué aprendimos?

- Mostramos cómo modelar un problema de red dinámico, donde las estimaciones de costos evolucionan con el tiempo. Esta vez, el estado del sistema es la ubicación del viajero junto con las estimaciones de costos en cada enlace de la red.
- Introdujimos la idea de un modelo de anticipación aproximado, en este caso una anticipación determinista, que puede resolverse como un problema de ruta más corta. Aunque esto es una solución óptima, resolver un modelo de anticipación aproximado, incluso de manera óptima, no es una política óptima.
- Describimos variables latentes, que son variables dinámicas (los costos en los enlaces) que se mantienen constantes en el modelo de anticipación (por lo cual ya no están en la variable de estado).
- Mostramos cómo podemos modificar nuestra anticipación determinista en una anticipación determinista parametrizada. En lugar de usar el costo esperado en cada enlace, podríamos usar el percentil $\theta$ para considerar qué tan malo *podría* ser un enlace. El parámetro $\theta$ debe ser calibrado, lo que convierte esto en un híbrido de una aproximación de anticipación determinista (una política DLA) que está parametrizada, lo cual la convierte en una forma de política CFA, dándonos una política híbrida DLA/CFA.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Por qué no podríamos usar los métodos de programación dinámica aproximada del [Capítulo 5](/sdam/chapter-5/) para resolver nuestro problema dinámico?</li>
<li>¿Cómo estamos modelando el proceso exógeno $W_t$, en el modelo de anticipación?</li>
<li>Describa con palabras qué queremos decir con una política de anticipación.</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Resolvemos un modelo de anticipación determinista como nuestra política. Esto resuelve el problema determinista de manera óptima. ¿Por qué esto no es una política óptima?</li>
<li>Resolvemos nuestro modelo de anticipación determinista (posiblemente con costos modificados $\cbar_{ij}(\theta)$) como un programa dinámico determinista usando la ecuación de Bellman. ¿Por qué no diríamos entonces que estamos resolviendo nuestro modelo base usando programación dinámica?</li>
<li>Imagine que queremos salir lo más tarde posible del nodo de origen, pero hay una alta penalización por llegar tarde al nodo de destino. Si optimizamos sobre el percentil $\theta$ de los costos $\cbar_{tij}(\theta)$, ¿cómo podría ayudarnos esta lógica a evitar llegadas tardías?</li>
<li>Dadas las percepciones del ejercicio 6, ¿cómo cree que el uso de los costos del percentil $\theta$ ayudaría en un problema donde simplemente estamos tratando de minimizar el tiempo total de viaje sin importar la posibilidad de llegar tarde?</li>
<li>Proporcione el modelo completo (variables de estado, variables de decisión, ...) para el escenario donde los costos $\chat_{tij}$ de los enlaces que salen del nodo $i$ se revelan cuando el viajero llega al nodo $i$ y antes de que tome la decisión de qué enlace recorrer. Recuerde que está minimizando los costos acumulados a lo largo de la ruta. No tiene que diseñar una política; siga nuestra práctica estándar de introducir una política $X^\pi(S_t)$ sin especificar la política.</li>
<li>Imagine que queremos resolver nuestro problema de la ruta más corta donde queremos partir lo más tarde posible desde el origen, pero necesitamos llegar al destino antes de las 9am. Asignamos una penalización $\eta$ por cada minuto que lleguemos después de las 9am. Describa un modelo base y una política de anticipación parametrizada para resolver este problema. ¿Cuál es la variable de estado para el modelo base? ¿Cuál es la variable de estado para el modelo de anticipación?</li>
</ol>

**Preguntas de programación**

Estos ejercicios usan el módulo de Python *StochasticShortestPath_Dynamic* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Vamos a usar un modelo de anticipación determinista como se hizo en las notas, pero en lugar de usar el costo esperado en cada enlace, vamos a usar un percentil que designamos por $\theta^{cost}$. Por ejemplo, si $\theta^{cost} = 0.8$, entonces usaríamos el percentil 80 del costo (piense en esto como usar una estimación de cuán grande podría ser el costo). Sea $\cbar_{tij}(\theta^{cost})$ el costo del percentil $\theta^{cost}$ del enlace $(i,j)$ dado lo que sabemos en el momento $t$.
  <ol type="a">
    <li>Escriba el modelo de anticipación, que sería una ruta más corta determinista usando costos $\cbar_{tij}(\theta^{cost})$ (como se hace en el libro). Use este modelo para definir formalmente una política de anticipación $X^{DLA}(S_{tj}\vert \theta^{cost})$.</li>
    <li>¿Cuál es la variable de estado para el problema dinámico? Recuerde que la variable de estado incluye toda la información dinámicamente variable usada para tomar una decisión (lo cual incluye calcular costos y restricciones), así como calcular la transición de $t$ a $t + 1$.</li>
    <li>Escriba la función objetivo usada para evaluar nuestra política de anticipación.</li>
    <li>Ahora tenemos una política $X^{DLA}(S_{tj}\vert \theta^{cost})$ parametrizada por $\theta^{cost}$. Usando el módulo de Python <em>StochasticShortestPath_Dynamic</em>, simule la política para $\theta^{cost} = (0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0)$. Simule cada versión de la política 100 veces y tome un promedio del costo real total (no el percentil $\theta^{cost}$). Considere también el riesgo de estar "atrasado," es decir, que el costo real total sea mayor que un umbral dado. Grafique los resultados y compárelos.</li>
  </ol>
</li>
</ol>
{% endraw %}