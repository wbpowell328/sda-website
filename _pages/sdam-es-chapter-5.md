---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 5: Problemas de camino más corto estocástico - Estático"
permalink: /sdam/es/chapter-5/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 753d27ec659d4188
---

{% raw %}
## Descripción general del capítulo

Los problemas de ruta más corta sobre grafos son tanto un área de aplicación importante (que surge en el transporte, la logística y las comunicaciones), como también una clase de problema fundamental que aparece en muchos otros contextos. El problema de ruta más corta más conocido es el problema determinista clásico ilustrado en la Figura 5.1, donde debemos encontrar la mejor ruta del nodo 1 al nodo 11, en el que el costo de atravesar cada arco se conoce de antemano.

<figure class="book-figure">
  <img src="/assets/images/sdam/deterministicgraph.jpg" alt="Network for a deterministic shortest path problem." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.1.</span> Red para un problema de ruta más corta determinista.</figcaption>
</figure>

En este capítulo comenzaremos con un problema de ruta más corta donde los tiempos de viaje se conocen y son fijos. La versión determinista nos permitirá demostrar una forma particular de tomar decisiones utilizando la ecuación de Bellman. Luego introduciremos la incertidumbre de una manera muy específica que nos permitirá demostrar una estrategia de solución conocida como programación dinámica aproximada.

## Narrativa

Usted está tratando de crear un sistema de navegación que guiará a un vehículo autónomo hacia un destino a través de una red congestionada. Suponemos que nuestro sistema tiene acceso tanto a costos históricos como a costos de enlace en tiempo real, a partir de los cuales podemos crear estimaciones de la media y la varianza del costo de atravesar un enlace. Podemos pensar esto como un problema de ruta más corta donde vemos distribuciones en lugar de costos reales, como se representa en la Figura 5.2.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph1.jpg" alt="Network for a stochastic shortest path problem where distributions are known, but costs are not observed until after decisions are made." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.2.</span> Red para un problema de ruta más corta estocástico donde las distribuciones se conocen, pero los costos no se observan hasta después de tomar las decisiones.</figcaption>
</figure>

Comenzaremos suponiendo que debemos tomar decisiones sobre qué enlace atravesar basándonos en estas distribuciones. Después de atravesar un enlace de $i$ a $j$, experimentamos entonces una realización muestral de la distribución. Queremos elegir una ruta que minimice los costos esperados.

## Encuadre del problema

Las respuestas a nuestras tres preguntas de encuadre son:

- **Métricas:** Deseamos minimizar el tiempo de viaje esperado hasta el destino, desde el origen del viajero hasta un destino especificado.
- **Decisiones:** Cuando un viajero se encuentra en un nodo particular $i$, necesita tomar una decisión sobre a qué nodo aguas abajo $j$ desplazarse, llevándolo finalmente al destino final.
- **Incertidumbres:** Consideramos tanto un problema determinista, donde no hay incertidumbre, como una versión donde los tiempos de viaje son inciertos pero se revelan justo antes de que un viajero se comprometa a atravesar un enlace en particular.

## Modelo básico

Vamos a suponer que estamos tratando de atravesar la red de la Figura 5.2 comenzando en un nodo $q$ y terminando en un destino $r$.

### Notación

Los problemas de ruta más corta se basan en una recursión fundamental de programación dinámica. Sea $\Ncal$ el conjunto de todos los nodos en la red (los nodos $1, 2, \ldots, 11$), $\Ncal^+\_i$ el conjunto de todos los nodos que pueden alcanzarse directamente desde el nodo $i$, $\Ncal^-\_j$ el conjunto de todos los nodos que están conectados al nodo $j$, $\Lcal$ el conjunto de todos los enlaces $(i,j)$ en la red, y $c_{ij}$ el costo de atravesar el enlace $(i,j)$, donde se supone que $j$ está en el conjunto $\Ncal^+\_i$.

Sea $v_i$ el costo mínimo desde el nodo $i$ hasta el nodo destino 11. Los valores $v_i$ para todos los nodos $i\in\Ncal$ deben satisfacer

$$
\begin{align}
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j). \label{eq:shortestpathbellman1}
\end{align}
$$

Podemos ejecutar la ecuación $\eqref{eq:shortestpathbellman1}$ inicializando $v_{11}$ en cero, y estableciendo todos los demás valores en algún número grande. Si recorremos cada nodo $i$ y calculamos $v_i$ usando la ecuación $\eqref{eq:shortestpathbellman1}$ repetidamente, los valores $v_i$ convergerán al valor óptimo. Esta es una versión muy ineficiente de un algoritmo de ruta más corta.

Otra forma de ver nuestra red es suponer que cada nodo $i$ es un estado $S$, y sea $V_t(S_t)$ el valor de estar en el estado $S_t$ en el "tiempo" $t$. En nuestro problema de ruta más corta, vamos a usar $t$ para indexar el número de enlaces que hemos atravesado en nuestro camino desde el nodo 1 hasta el nodo representado por $S_t$.

Desde un estado (nodo) $S_t$, supongamos que tomamos una decisión que llamamos "$x$" que sería una decisión de atravesar un enlace que emana del nodo correspondiente al estado $S_t$. Podemos escribir este conjunto de decisiones como $\Xcal_s$ representando las decisiones $x$ que están disponibles para usar cuando estamos en el estado $S_t = s$.

A continuación, sea $C(s,x)$ el costo de estar en el estado $s$ y elegir la decisión $x$, lo que correspondería a nuestro costo de enlace $c_{ij}$ en la red anterior. Finalmente, vamos a usar una "función de transición de estado" que denotamos por $S^M(s,x)$ que nos indica a qué estado transicionamos si estamos en el estado $s$ y tomamos la acción $x\in\Xcal_s$.

Usando esta notación, podemos reescribir la ecuación $\eqref{eq:shortestpathbellman1}$ como

$$
\begin{align}
V_t(s) = \min_{x\in\Xcal_s} \big(C(s,x) + V_{t+1}(S_{t+1})\big). \label{eq:shortestpathbellman2}
\end{align}
$$

donde $S_{t+1} = S^M(s,x)$. Podemos ejecutar la ecuación $\eqref{eq:shortestpathbellman2}$ estableciendo $V_T(s) = 0$ para un valor suficientemente grande de $T$ (es decir, el mayor número de enlaces que podríamos atravesar en una ruta). Dado que podríamos establecer $T$ demasiado grande, tenemos que agregar al conjunto de opciones en $\Xcal_s$ la capacidad de permanecer en el nodo destino en el tiempo $T$. Luego establecemos $t=T-1$ y ejecutamos $\eqref{eq:shortestpathbellman2}$ para todos los estados $s$. Seguimos repitiendo esto hasta llegar a $t=0$. Cuando ejecutamos el sistema de esta manera, el índice de tiempo $t$ es en realidad un contador de cuántos enlaces hemos atravesado.

La ecuación $\eqref{eq:shortestpathbellman2}$ es una versión determinista de lo que se conoce como la ecuación de Bellman. En el resto de este capítulo, mostraremos cómo usar la ecuación de Bellman para manejar la incertidumbre en nuestro problema de ruta más corta.

### Variables de estado

En este problema básico, el estado $S_t=N_t$ es el nodo donde estamos ubicados después de $t$ recorridos de enlaces. Es tentador simplemente decir que el viajero está en el nodo $N_t$, pero como veremos en las extensiones, cambios menores producen una variable de estado más rica, y es importante reconocer el verdadero estado de nuestro viajero.

### Variables de decisión

Estamos modelando la decisión como el nodo $j$ hacia el cual nos desplazamos dado que estamos en el nodo $i$. Existe una gran comunidad que trabaja en problemas que encajan en esta clase donde la decisión se representa como una acción $a$, donde $a$ toma uno de un conjunto de valores discretos en el conjunto $\Acal_s$ cuando estamos en el estado $s$.

Una forma conveniente de representar las decisiones es definir

$$
x_{tij} = \begin{cases} 1 & \text{if we traverse link } i \text{ to } j \text{ when we are at } i, \\ 0 & \text{otherwise.} \end{cases}
$$

Esta notación resultará útil cuando escribamos nuestra función objetivo.

### Información exógena

Después de atravesar el enlace $(i,j)$, observamos $\chat_{tij}$, el costo que experimentamos al viajar de $i$ a $j$ durante el $t$-ésimo recorrido (que solo observamos después de atravesar el enlace). Por el momento, vamos a suponer que la nueva observación $\chat_{tij}$ se almacena en una base de datos muy grande. Luego podemos usar estas observaciones para estimar el costo promedio $\cbar_{ij}$ de atravesar el enlace $(i,j)$ (excluimos el índice $t$ para $\cbar_{ij}$ ya que este es el costo promedio independientemente de cuándo atravesemos el enlace $(i,j)$).

### Función de transición

Para nuestro problema básico de grafo, si tomamos la decisión $x_{tij}=1$, el estado $N_t = i$ evoluciona al estado $N_{t+1} = j$.

### Función objetivo

Podemos modelar nuestros costos usando la siguiente notación: $\chat_{tij}$ es una variable aleatoria que da el costo de viajar del nodo $i$ al nodo $j$; $\cbar_{ij}$ es una estimación del valor esperado de $\chat_{tij}$ calculada promediando sobre nuestra base de datos de costos de viaje pasados; y $\sigmabar_{ij}$ es nuestra estimación de la desviación estándar de $\cbar_{ij}$ calculada usando datos históricos.

Suponemos que debemos tomar la decisión de qué enlace atravesar al salir de un nodo $i$ antes de ver el valor real del costo aleatorio $\chat_{tij}$. Esto significa que debemos tomar nuestra decisión utilizando nuestra mejor estimación de $\chat_{tij}$, que sería $\cbar_{ij}$.

Podríamos escribir nuestra función objetivo usando

$$
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T \sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \chat_{tij}x_{tij},
$$

pero esta formulación requeriría que conociéramos las realizaciones $\chat_{tij}$. En su lugar, vamos a usar la esperanza, lo que nos da

$$
\begin{align}
\min_{x_{tij}, (i,j)\in\Lcal} \sum_{t=0}^T\sum_{i\in\Ncal} \sum_{j\in\Ncal^+_i} \cbar_{ij}x_{tij}.  \label{shortestpathobjective1}
\end{align}
$$

La solución óptima de este problema sería establecer todos los $x_{tij} = 0$, lo que significa que no obtenemos una ruta. Por esta razón, tenemos que introducir *restricciones* de la forma

$$
\begin{align}
\sum_{j\in\Ncal^+_q} x_{tqj} &= 1,  \label{shortestpathobjective2}\\
\sum_{i\in\Ncal^-_r} x_{t-1,ir} &= 1, \label{shortestpathobjective3}\\
\sum_{i\in\Ncal^-_j} x_{t-1,ij} - \sum_{k\in\Ncal^+_j} x_{tjk} &= 0, \quad \text{for } j \ne q, r,  \label{shortestpathobjective4}\\
x_{tij} &\geq 0, \quad (i,j) \in \Lcal,\ 0 \leq t \leq T.  \label{shortestpathobjective5}
\end{align}
$$

Las ecuaciones $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$ representan un *programa lineal*, y existen paquetes potentes que pueden usarse para resolver este problema cuando se escribe de esta manera. Sin embargo, existen algoritmos especializados (conocidos simplemente como "algoritmos de ruta más corta") que aprovechan la estructura del problema para producir soluciones excepcionalmente rápidas.

Sin embargo, este enfoque no proporciona un método para manejar la incertidumbre. A continuación, describimos cómo resolver el problema de ruta más corta estocástico utilizando nuestro lenguaje de diseño de políticas, lo cual proporcionará una base para abordar la incertidumbre.

## Modelado de la incertidumbre

Para nuestro modelo básico solo estamos usando las estimaciones puntuales $\cbar_{ij}$ que suponemos es simplemente un promedio de observaciones previas recopiladas, por ejemplo, a partir de estimaciones de costos de viaje obtenidas de teléfonos inteligentes habilitados con GPS. Cuando las estimaciones se basan en observaciones de campo, el método se denomina *basado en datos* (*data-driven*), lo que significa que no necesitamos un modelo de incertidumbre — solo necesitamos observarla.

Por ejemplo, sea $\cbar_{ij}$ nuestra estimación actual del costo de viaje promedio para el enlace $(i,j)$ y supongamos que acabamos de observar un costo de $\chat_{tij}$. Podríamos actualizar nuestra estimación usando

$$
\cbar_{ij} \leftarrow (1-\alpha) \cbar_{ij} + \alpha \chat_{tij},
$$

donde $\alpha$ es un parámetro de suavizado (a veces llamado tasa de aprendizaje o tamaño de paso) que es menor que 1.

Si actualizamos nuestras estimaciones de esta manera, entonces significa que el vector de tiempos de viaje estimados $\cbar$ varía dinámicamente, aunque podríamos hacer las actualizaciones solo una vez al día, en lugar de dentro de un viaje. En nuestro marco de modelado, el vector de estimaciones de costo $\cbar$ se captura mediante el estado inicial $S_0$. Si dejamos que $n$ indexe el día del viaje, dejaríamos que $\cbar^n$ sean las estimaciones de costo usando los primeros $n$ días de datos, que luego se mantienen en el estado inicial $S^n_0$ al planificar para el día $n+1$.

## Diseño de políticas

Nuestra "política" para este problema determinista es una función que asigna el "estado" (es decir, en qué nodo estamos) a una acción (qué enlace recorremos). Podemos resolver este problema optimizando el programa lineal representado por las ecuaciones $\eqref{shortestpathobjective1}$–$\eqref{shortestpathobjective5}$, lo que nos da el vector $x^\ast \_{ij}$ para todos los enlaces $(i,j)$. Podemos pensar esto como una función donde, dado el estado (nodo $i$), elegimos una acción, que es el enlace $(i,j)$ para el cual $x_{ij} = 1$. Podemos escribir esta política como una función $X^\pi(S_t)$ usando

$$
X^\pi(S_t=N_t=i) = j \quad \text{if } x_{ij} = 1.
$$

Alternativamente, podemos resolver la ecuación de Bellman como lo hicimos inicialmente para nuestro problema de ruta más corta determinista usando la ecuación $\eqref{eq:shortestpathbellman1}$. Esto nos da un valor $v_i$ que es el costo de viaje mínimo desde cada nodo $i$ hasta el nodo destino $r$. Una vez que se calculan estos valores, podemos tomar decisiones usando la siguiente política

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\cbar_{ij} + v_j). \label{eq:shortestpathbellman3}
\end{align}
$$

Esto significa que nuestro problema de ruta más corta "estocástico" puede resolverse tal como resolvimos nuestro problema determinista. A continuación, en nuestras extensiones, mostramos que con un giro menor, la situación cambia drásticamente.

## Evaluación de la política

La evaluación de la política para este problema no es necesaria, porque la política es óptima. Aunque nuestros costos de enlace son estocásticos, siempre que no aprendamos nada sobre el costo real hasta después de tomar nuestra decisión, las decisiones óptimas implican resolver un problema de ruta más corta determinista. Esta será la última vez en este libro que veamos un problema como este.

En las extensiones, vamos a introducir la incertidumbre de una manera que nos permita presentar una poderosa estrategia algorítmica llamada *programación dinámica aproximada* (también conocida como *aprendizaje por refuerzo*).

## Extensión - Rutas más cortas estocásticas adaptativas

Vamos a cambiar la información que podemos usar mientras tomamos decisiones. En nuestro primer problema de ruta más corta estocástica, supusimos que teníamos que elegir el siguiente enlace a recorrer *antes* de ver el costo de viaje real sobre el enlace. Ahora supongamos que tomamos nuestra decisión *después* de observar los costos de los enlaces, lo que significa que tomamos nuestra decisión usando el costo real $\chat_{ij}$ en lugar de su esperanza (o promedio) $\cbar_{ij}$. Esto se ilustra en la Figura 5.3, donde un viajero en el nodo 6 llega a ver los costos reales sobre los enlaces que salen del nodo 6 (en lugar de solo tener conocimiento de las distribuciones).

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticgraph2.jpg" alt="Network for a stochastic shortest path problem where travelers get to see the link costs before making a decision." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.3.</span> Red para un problema de ruta más corta estocástica donde los viajeros llegan a ver los costos de los enlaces antes de tomar una decisión. Este gráfico muestra a un viajero que ha recorrido la ruta 1-3-6, y ahora ve los costos en los enlaces que salen del nodo 6.</figcaption>
</figure>

Si por un momento suponemos que alguien puede darnos los valores $v_j$, que es el costo mínimo de viaje desde el nodo $j$ hasta nuestro nodo de destino $r$, una política óptima para elegir el siguiente nodo aguas abajo se escribiría

$$
\begin{align}
X^\pi(i) = \argmin_{j\in\Ncal^+_i} (\chat_{ij} + v_j). \label{eq:shortestpathbellman4}
\end{align}
$$

El problema aquí es que no podemos calcular $v_j$ como lo hicimos antes usando la ecuación $\eqref{eq:shortestpathbellman1}$. De hecho, el cambio a ver los costos antes de tomar una decisión requiere un cambio fundamental en nuestro modelo básico.

En nuestro modelo determinista, o modelo estocástico estático, la variable de estado $S_t$ después de "$t$" transiciones era el nodo $i$ donde se encontraba el viajero. Esta era la única información que necesitábamos en ese momento del tiempo.

En nuestro nuevo modelo estocástico, capturar simplemente el nodo donde se encuentra nuestro viajero ya no es suficiente. Recuerde que anteriormente introdujimos una variable de estado como "toda la información que necesitamos en el tiempo $t$ a partir de la historia para modelar el sistema desde el tiempo $t$ en adelante." Más adelante, en el [Capítulo 7](/sdam/chapter-7/), proporcionaremos una definición más precisa, pero por ahora esto servirá para nuestros propósitos.

Nuestro nuevo problema de ruta más corta estocástica introduce nueva información que se necesita para tomar una decisión: los costos que salen del nodo donde nos encontramos. Nos resultará conveniente introducir dos tipos de variables de estado: $N_t$, el estado físico del sistema, que generalmente se controla directamente mediante decisiones, y $I_t$, otra información que necesitamos para tomar una decisión. En nuestro problema de red, nuestro estado físico sería el nodo donde nos encontramos, mientras que la variable de "otra información" $I_t$ capturaría los costos en los enlaces que salen del nodo donde nos encontramos, lo cual escribimos como

$$
I_t = (\chat_{tij}), i=N_t, j\in\Ncal^+_i.
$$

Supongamos que en el tiempo $t$ tenemos que $N_t = i$. Vamos a agregar el tiempo $t$ a nuestro índice para los costos de enlace, lo que significa que reemplazaremos $\chat_{ij}$ por $\chat_{tij}$ para referirnos al costo cuando vamos de $i$ a $j$ en el tiempo $t$. Entonces podríamos escribir

$$
S_t = (N_t, I_t) = \big(i, (\chat_{tij})_{j\in\Ncal^+_i}\big).
$$

Para ver qué le hace esto a nuestra manera anterior de resolver nuestro problema de ruta más corta, echemos un nuevo vistazo a la ecuación de Bellman tal como la introdujimos por primera vez en la ecuación $\eqref{eq:shortestpathbellman2}$, que se convierte en

$$
\begin{align}
V_t(S_t) = \min_{x_t\in\Xcal_s} \big(C(S_t,x_t) + V_{t+1}(S_{t+1})\big), \label{eq:shortestpathbellman5}
\end{align}
$$

donde $S_{t+1}$ estaría dado por $S_{t+1} = (N_{t+1}, I_{t+1})$, donde $N_{t+1}$ es el nodo producido por nuestra decisión $x$, de modo que si $x_{ij} =1$, entonces $N_{t+1} = j$; y $I_{t+1}$ son los costos que se observan al salir del nodo $N_{t+1}$, que dependen de la decisión $x_t$. Si $x_t$ nos envía al nodo $j$ de modo que $N_{t+1} = j$, entonces $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$ (suponiendo que hay tres enlaces que salen del nodo $j$).

Supongamos que $N_t = i$. La función de costo $C(S_t,x)$ está dada por

$$
C(S_t,x) = \sum_{j\in\Ncal^+_i} \chat_{tij}x_{ij}.
$$

Recuerde que $S_t$ (donde $N_t = i$) contiene los costos $\chat_{tij}$ para los enlaces $(i,j)$ que salen de $i$, por lo que estos se conocen (y están contenidos en $S_t$).

La ecuación $\eqref{eq:shortestpathbellman5}$ es fácil de escribir pero difícil de resolver ahora que nuestra variable de estado es un vector (lo cual hace explotar el número de estados). Primero vamos a describir dos desafíos computacionales. Luego, vamos a introducir la idea del estado posterior a la decisión para resolver uno de los dos desafíos. Finalmente, proporcionaremos una breve introducción a una clase de métodos conocidos como programación dinámica aproximada (pero a menudo llamados aprendizaje por refuerzo) para manejar el segundo desafío.

### Desafíos computacionales

Comenzamos identificando dos desafíos computacionales:

- Los costos de enlace $I_{t+1}$ que salen del nodo aguas abajo $N_{t+1}$ (que está determinado por la decisión $x$) no se conocen. Dicho de otra manera, $I_{t+1}$ es una variable aleatoria en el tiempo $t$, lo que significa que ni siquiera podemos calcular $V_{t+1}(S_{t+1})$. Resolvemos esto tomando la esperanza, que escribimos como

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big). \label{eq:shortestpathbellman6}
\end{align}
$$

  El operador de esperanza $\E$ debe verse como el promedio sobre los posibles costos de enlace que un viajero podría encontrar una vez que llegue al nodo $N_{t+1}$ al tomar la decisión $x$ (que determina $N_{t+1}$).

  Para escribir esto de manera más explícita, supongamos que $x_t$ nos envía al nodo $j$ (lo que significa que $x_{tij} = 1$), y cuando llegamos vemos $I_{t+1} = (\chat_{t+1,jk_1}, \chat_{t+1,jk_2}, \chat_{t+1,jk_3})$. Aprendemos estos costos cuando llegamos al nodo $j$ en el tiempo $t+1$, pero son aleatorios cuando estamos en el nodo $i$ en el tiempo $t$ pensando en qué hacer.
- El espacio de estados – Incluso si suponemos que los costos $\chat_{t+1,j}$ son discretos, el espacio de estados acaba de crecer dramáticamente. Imagine que hemos discretizado los costos en cubos de 20 valores. Si hay tres enlaces que salen de cada nodo, nuestro espacio de estados ha crecido del número de nodos a uno que es $20 \times 20 \times 20 = 8,000$ veces más grande.

Para ilustrar el desafío de calcular la esperanza, supongamos que cada costo $\chat_{t+1,jk}$ puede tomar valores $c_1, c_2, \ldots, c_L$ con probabilidades $p_{jk}(c_{\ell})$. Por ejemplo, $c_1$ podría ser 1 minuto, $c_2$ podría ser 2 minutos, y así sucesivamente. La probabilidad $p_{jk}(c_{\ell})$ es la probabilidad de que $\chat_{t+1,jk} = c_\ell$.

Ahora supongamos que la decisión $x$ nos lleva al nodo $j$, después de lo cual enfrentamos una elección de viajar sobre los enlaces $(j,k_1), (j,k_2)$ o $(j,k_3)$. Calcularíamos nuestra esperanza usando

$$
\begin{align}
\E \{V_{t+1}(S_{t+1})\vert S_t,x\} &= \sum_{\ell_1=1}^L p_{jk_1}(c_{\ell_1}) \sum_{\ell_2=1}^L p_{jk_2}(c_{\ell_2}) \sum_{\ell_3=1}^L p_{jk_3}(c_{\ell_3}) \nonumber \\
          & \quad \times V_{t+1}(S_{t+1} = (j, (c_{\ell_1},c_{\ell_2},c_{\ell_3}))). \label{eq:shortestpathexpectation}
\end{align}
$$

Para decirlo sin rodeos, la ecuación $\eqref{eq:shortestpathexpectation}$ es bastante fea. Esas triples sumatorias van a ser difíciles de calcular.

Agravando el problema está el tamaño del espacio de estados. Para usar la ecuación de Bellman en la ecuación $\eqref{eq:shortestpathbellman6}$ (o $\eqref{eq:shortestpathbellman2}$), tenemos que calcular $V_t(S_t)$ para cada estado posible $S_t$. Cuando el estado era simplemente un nodo, eso no era tan malo, incluso si hay miles (o incluso decenas de miles) de nodos. Sin embargo, agregar la variable de información $I_t$ al estado hace que el problema sea dramáticamente más difícil.

Para ver qué tan rápido crece esto el espacio de estados, imagine que hay 20 valores posibles para cada variable de costo $\chat_{tij}$. Eso significa que hay 8.000 valores posibles de $I_t$. Si nuestra red tiene 10.000 nodos (es decir, $N_t$ puede tomar 10.000 valores), entonces $S_t$ ahora puede tomar $10,000 \times 8,000 = 80,000,000$ valores.

Este es nuestro primer vistazo a lo que sucede cuando una variable de estado se convierte en un vector. El número de valores posibles de la variable de estado crece exponencialmente, un proceso ampliamente conocido como la *maldición de la dimensionalidad*.

### Uso del estado posterior a la decisión

No todo está perdido para este problema. Existe un truco que podemos usar que nos permite superar la maldición de la dimensionalidad para este problema en particular. El principal desafío computacional con la ecuación de Bellman en la ecuación $\eqref{eq:shortestpathbellman6}$ es el operador de esperanza, que es fácilmente la pieza de notación más peligrosa al resolver problemas de decisión secuencial.

Vamos a usar dos estrategias poderosas para superar este problema en este contexto (y usaremos estas estrategias para otros contextos). Primero, introducimos la idea del *estado posterior a la decisión*, que designamos $S^x_t$. El estado posterior a la decisión es el estado del sistema inmediatamente *después* de que tomamos una decisión, y antes de que llegue cualquier información nueva, razón por la cual lo indexamos con $t$.

Para ver los estados previos y posteriores a la decisión, volvamos a la Figura 5.3. Como vimos antes, nuestro estado previo a la decisión (que llamamos "el estado") $S_t$ es

$$
S_t = (6, (12.7, 8.9, 13.5)).
$$

Una vez que hemos tomado una decisión, seguimos en el nodo 6, pero imaginemos que la decisión que tomamos fue ir al nodo 9. Podríamos describir nuestro estado físico posterior a la decisión $R^x_t = 9$, lo cual podríamos alternativamente expresar como "ir al nodo 9." Sin embargo, ya no necesitamos esas problemáticas observaciones de costos en los enlaces que salen del nodo 6, dadas por $(\chat_{t+1,6,5}, \chat_{t+1,6,9}, \chat_{t+1,5,7}) = (12.7, 8.9, 13.5)$. Esto significa que nuestro estado posterior a la decisión es

$$
S^x_t = (9).
$$

Usando el estado posterior a la decisión, vamos a dividir la ecuación de Bellman en dos pasos. En lugar de ir de $S_t$ a $S_{t+1}$ a $S_{t+2}$ como hacemos en la ecuación de Bellman $\eqref{eq:shortestpathbellman6}$, primero vamos a dar un paso desde el estado previo a la decisión $S_t$ hasta el estado posterior a la decisión $S^x_t$, lo cual hacemos reescribiendo la ecuación $\eqref{eq:shortestpathbellman6}$ como

$$
\begin{align}
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V^x_t(S^x_t) \big), \label{eq:shortestpathbellman6a}
\end{align}
$$

donde $V^x_t$ es el valor de estar en el estado posterior a la decisión $S^x_t$. Note que ya no tenemos la esperanza, porque por construcción el estado posterior a la decisión involucra una decisión dada $x_t$ (por ejemplo, "ir al nodo 9") pero ninguna información nueva (que es la parte aleatoria). Note que en este caso, el estado posterior a la decisión $S^x_t$ consiste solo en el nodo, lo que significa que es mucho más simple que $S_t$.

No hemos salido del bosque todavía. Todavía tenemos que calcular $V^x_t(S^x_t)$, lo cual se hace usando

$$
\begin{align}
V^x_t(S^x_t) = \E \{V_{t+1}(S_{t+1})\vert S_t,x\}. \label{eq:shortestpathbellman6b}
\end{align}
$$

Así que todavía tenemos que calcular esa esperanza, y no se ha vuelto más fácil. Supongamos que nuestra decisión $x$ es ir al nodo $j$ (lo que significa que $x_{ij}=1$), y sea $\chat_{t+1,j} = (\chat_{t+1,jk},~k\in\Ncal^+\_j)$ el conjunto de costos de enlace que salen del nodo $j$. Nuestro siguiente estado previo a la decisión $S_{t+1}$ sería entonces

$$
S_{t+1} = (j, \chat_{t+1,j}).
$$

Ahora supongamos que tenemos una manera de muestrear posibles valores de $\chat_{t+1,j}$. Podríamos hacer esto a partir de una base de datos de observaciones históricas de costos de enlace, o podríamos construir una distribución de probabilidad a partir de datos pasados y muestrear a partir de esta. Supongamos que vamos a hacer esto iterativamente, y sea $\chat^n_{t+1,ij}$ la $n$-ésima muestra del costo de enlace de $i$ a $j$. Podemos usar esta estrategia basada en muestreo para crear una estimación de la esperanza, en lugar del valor exacto. Esto se hace en la siguiente sección.

### Programación dinámica aproximada

Usar variables de estado posteriores a la decisión resuelve el problema de calcular la esperanza mientras encontramos la mejor decisión $x_t$, pero todavía tenemos el problema de lidiar con el gran espacio de estados. Para esto, vamos a recurrir a los métodos ampliamente conocidos como *programación dinámica aproximada*, donde reemplazamos la función de valor posterior a la decisión $V^x_t(S^x_t)$ con una aproximación.

Vamos a construir aproximaciones $\Vbar^x_t(j)$ del valor de estar en el nodo $j$, donde

$$
\Vbar^{x,n}_t(S^x_t = j) \approx \E \{V_{t+1}(S_{t+1})\vert S^x_t\}.
$$

Sea $\Vbar^{x,n}\_t(j)$ nuestra aproximación de $\E \lbrace V_{t+1}(S_{t+1})\vert S^x_t\rbrace $ después de observar $n$ muestras. Una manera de construir esta aproximación es usar muestras del valor de estar en el nodo $j$. Imagine que vamos a pasar hacia adelante a través de la red, tomando decisiones usando aproximaciones $\Vbar^{x,n-1}\_t(S^x_t)$ obtenidas de iteraciones anteriores, junto con costos muestreados $\chat^n_{tij}$. Podemos obtener una estimación muestreada del valor de estar en el estado $S_t$ usando

$$
\begin{align}
\vhat^{x,n}_t(i) = \min_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(S^x_t = j)\big). \label{eq:vhatsinglepass}
\end{align}
$$

Luego vamos a usar $\vhat^{x,n}\_t(i)$, que es el valor de estar en el estado $S_t$ (que incluye tanto el nodo $i$ como los costos $\chat^n_{tij}$ para todo $j$ que sale del nodo $i$), para actualizar el estado posterior a la decisión anterior $S^x_{t-1}$, lo cual hacemos usando

$$
\begin{align}
\Vbar^{x,n}_{t-1}(i) = (1-\alpha_n) \Vbar^{x,n-1}_{t-1}(i) + \alpha_n \vhat^{x,n}_t(i). \label{eq:vhatsmoothing}
\end{align}
$$

Aquí, $\alpha_n$ se conoce como factor de suavizado o tasa de aprendizaje, pero por razones técnicas también se conoce como un "tamaño de paso" (stepsize). Podríamos usar una constante como $\alpha_n = .1$ o $.05$, pero una estrategia común es usar una fórmula decreciente como

$$
\alpha_n = \frac{\theta^\alpha}{\theta^\alpha + n - 1},
$$

donde $\theta^\alpha$ es un parámetro ajustable. Por ejemplo, si establecemos $\theta^\alpha = 1$, obtenemos $\alpha_n = 1/n$. En este caso, es posible verificar que la ecuación $\eqref{eq:vhatsmoothing}$ está promediando sobre los valores $\vhat^n_t(i)$. En la práctica, es poco probable que esta fórmula funcione bien para este problema porque el tamaño de paso se acerca a cero demasiado rápido.

Nos detenemos para señalar dos ventajas del uso del estado posterior a la decisión $S^x_t$:

- Ya no tenemos que lidiar con la esperanza al optimizar sobre la elección de enlaces de salida desde un nodo (véase la ecuación $\eqref{eq:vhatsinglepass}$).
- Aproximar la función de valor $\Vbar^{x,n}\_t(S^x_t = i)$ es mucho más simple ya que el estado posterior a la decisión $S^x_t$ es ahora solo un escalar, lo cual es mucho más fácil de estimar que una función de mayor dimensión.

Un desafío con la ecuación $\eqref{eq:vhatsinglepass}$ es que vamos a necesitar valores iniciales para $\Vbar^{x,0}\_t(i)$. Una elección natural sería resolver la versión determinista de este problema, donde los costos $\chat_{tij}$ se fijan iguales a estimaciones de sus medias, y luego obtener estimaciones iniciales del costo incurrido para llegar desde cada nodo hasta el destino.

Un método alternativo es usar las estimaciones $\Vbar^{x,n-1}(i)$ para tomar decisiones utilizando

$$
\begin{align}
x^n_t(i) = \argmin_{j\in\Ncal^+_i} \big(\chat^n_{tij} + \Vbar^{x,n-1}_t(j)\big). \label{eq:stochasticpath}
\end{align}
$$

La decisión $i^n_t = x^n_t(i)$ nos da el siguiente nodo después del nodo $i$ con base en los costos muestreados $\chat^n_{tij}$ y en las estimaciones del costo $\Vbar^{x,n-1}\_t(j)$ para llegar desde el nodo $j$ hasta el nodo de destino $r$. Cuando llegamos a $r$, tenemos una trayectoria completa compuesta por los nodos

$$
(q, i^n_1, i^n_2, \ldots, r).
$$

También tenemos los costos muestreados $\chat^n_{t,i^n_t,i^n_{t+1}}$ a lo largo de toda la trayectoria. Supongamos que hay $T$ enlaces en la trayectoria. Luego recorremos hacia atrás la trayectoria comenzando con $\vhat^n_T(r) = 0$, y calculando

$$
\begin{align}
\vhat^n_t(i^n_t) = \chat^n_{t,i^n_t,i^n_{t+1}} + \vhat^n_{t+1}(i^n_{t+1}).  \label{eq:vhatdoublepass}
\end{align}
$$

Después usamos estas estimaciones en nuestro proceso de suavizamiento en la ecuación $\eqref{eq:vhatsmoothing}$.

Este procedimiento es una forma de *programación dinámica aproximada* (también conocida como *aprendizaje por refuerzo*). Más específicamente, es una forma de *programación dinámica aproximada hacia adelante*, ya que avanza dando pasos hacia adelante en el tiempo. Hemos ilustrado un procedimiento de paso hacia adelante puro usando la ecuación $\eqref{eq:vhatsinglepass}$, que requiere pasadas únicas por la red, y un procedimiento de doble paso usando la ecuación $\eqref{eq:vhatdoublepass}$, que consiste en primero avanzar por el grafo simulando decisiones, y luego retroceder para actualizar el valor de estar en cada estado.

Este método es muy robusto respecto a estados de pre-decisión complejos. Por ejemplo, no nos importa cuántos enlaces puedan salir de cada nodo, ya que estamos aprovechando el hecho de que nuestra variable de estado post-decisión es bastante simple (en este caso, es solamente el nodo en el que estamos situados).

## ¿Qué aprendimos?

- Esta es la primera (y única) vez que tenemos un problema en el que podemos encontrar la política óptima para un problema de decisión secuencial. Aunque estamos optimizando sobre una red estocástica, el viajero no recibe ninguna información anticipada sobre un enlace antes de recorrerlo, lo que significa que debe tomar su decisión basándose en costos esperados.
- Dado que el modelo básico se reduce a un problema de ruta más corta determinista, podemos resolverlo de manera óptima, lo cual es un ejemplo poco común de poder resolver el problema base de forma óptima (de hecho, esta es la única vez que esto ocurrirá en este libro).
- Luego introducimos la dimensión de que los costos se revelan antes de que el viajero recorra el enlace. Reformulamos el problema, mostrando que la variable de estado ahora se vuelve mucho más compleja, consistiendo en el nodo donde se encuentra el viajero y los costos de los enlaces que salen del nodo. Este problema ya no se puede resolver exactamente usando programación dinámica.
- Introducimos y describimos un algoritmo de programación dinámica aproximada usando el concepto de una variable de estado post-decisión, que elimina la esperanza incorporada en la ecuación de Bellman, y reduce el espacio de estados nuevamente al conjunto de nodos.
- Este es un ejemplo de una política VFA. Dado que no podemos calcular las funciones de valor exactamente, no podemos garantizar que sea una política óptima.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>En el problema original de ruta más corta estocástica, donde solo observamos el costo real después de recorrer el enlace, explique por qué esto se puede resolver exactamente como un simple problema de ruta más corta determinista.</li>
<li>Para la versión en la que observamos el costo real de un enlace antes de elegir en qué dirección movernos, dé las variables de estado de pre-decisión y post-decisión.</li>
<li>En la ecuación $\eqref{eq:vhatsmoothing}$, usamos el valor muestreado $\vhat^{x,n}_t(i)$ de estar en el estado $S_t$ para actualizar el valor estimado de estar en el estado post-decisión anterior dado por $\Vbar^{x,n}_{t-1}(i)$. Cree un pequeño ejemplo numérico para ilustrar esta ecuación.</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 3;">
<li>Un viajero necesita atravesar el grafo mostrado en la Figura 5.4 desde el nodo 1 hasta el nodo 11. Existe una probabilidad de que se pueda recorrer cada enlace, la cual se muestra en el grafo (estas probabilidades se conocen de antemano). Cuando el viajero llega al nodo $i$, puede ver qué enlaces (si los hay) se pueden recorrer desde el nodo $i$. Si no se puede recorrer ningún enlace, entonces el viaje termina en fracaso. El objetivo es elegir una trayectoria que maximice el producto de estas probabilidades, pero está limitado a viajar por los enlaces disponibles.
  <ol type="a">
    <li>Describa una variable de estado apropiada para este problema (con notación).</li>
    <li>Imagine que el viajero está en el nodo 6 tras seguir la trayectoria 1-2-6 y luego ve que los enlaces 6-9 y 6-10 están disponibles (pero 6-8 no está disponible); ¿cuál es su estado (de pre-decisión)? Estoy buscando los valores numéricos de las variables de estado que proporcionó en la parte (a).</li>
    <li>Suponga que el viajero puede moverse al nodo 9, y decide hacerlo. ¿Cuál es el estado post-decisión después de tomar esta decisión?</li>
    <li>Escriba la ecuación de Bellman que caracteriza el valor de estar en el estado de pre-decisión después de recorrer la trayectoria 1-2-6 en términos de los estados de pre-decisión posteriores. Calcule numéricamente el valor de estar en el estado tras recorrer 1-2-6 y observar que 6-9 y 6-10 están disponibles (pero 6-8 no).</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariableminproductprobability.jpg" alt="Un problema de ruta más corta para maximizar la probabilidad de completar una trayectoria." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.4.</span> Un problema de ruta más corta para maximizar la probabilidad de completar una trayectoria.</figcaption>
</figure>
</li>
<li>(Esta pregunta se aplica a la extensión de ruta más corta estocástica adaptativa anterior.) Escriba los pasos involucrados en ajustar una aproximación de función de valor para los estados post-decisión respondiendo:
  <ol type="a">
    <li>Escriba los estados de pre-decisión y post-decisión. Si la red tiene $N$ nodos, y si los costos en cada enlace se discretizan en 20 valores (suponga como máximo $L$ enlaces que salen de cualquier nodo), ¿cuál es el tamaño de los espacios de estado de pre-decisión y post-decisión?</li>
    <li>Dé la ecuación para calcular $\vhat^n_t(i)$. ¿Es esta la estimación de estar en un estado de pre-decisión o en un estado post-decisión? Explique.</li>
    <li>¿A qué se refiere el índice de "tiempo" $t$?</li>
    <li>Dé la ecuación de actualización para actualizar el valor de estar en un estado post-decisión.</li>
    <li>¿Por qué necesitamos el valor de estar en un estado post-decisión en lugar de un estado de pre-decisión?</li>
  </ol>
</li>
<li>La Figura 5.5 ilustra las opciones que podría enfrentar un conductor de Uber. En el nodo 1, tiene la opción de los viajes (2-4) y (3-5). Suponga que los viajes duran al menos 15 minutos, y se espera que los viajes se atiendan dentro de los 10 minutos o se pierden. Esto significa que los viajes que salen de los nodos 6, 7 y 8 solo se conocen después de que los viajes (2-4) y (3-5) se hayan completado.

<figure class="book-figure">
  <img src="/assets/images/sdam/uber_driver.jpg" alt="Un árbol de decisión que ilustra las opciones que enfrenta un conductor de Uber." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 5.5.</span> Un árbol de decisión que ilustra las opciones que enfrenta un conductor de Uber.</figcaption>
</figure>

Suponga que nuestra conductora primero elige (3-5) y luego elige (7-10). Después de completar (7-10), debe dirigirse a una estación de recarga para cargar su batería antes de regresar a casa (suponga que elige la estación de recarga de menor costo).

Junto a cada movimiento se indica cuánto gana (denote esto por $c_{ij}$), que es positivo por atender a un cliente y negativo por moverse vacía. Por supuesto, está tratando de maximizar las ganancias durante todo su turno.

El estado de nuestra conductora es su ubicación (número de nodo) o el número de nodo hacia el cual se dirige, junto con cualquier otra información disponible en ese momento relevante para su decisión.
  <ol type="a">
    <li>Dado que inicialmente está en el nodo 1, ¿cuál es su estado (de pre-decisión)? ¿Cuál es su estado post-decisión después de decidir aceptar el viaje (3-5)?</li>
    <li>Sea $s_1$ el estado (de pre-decisión) después de atender el viaje (3-5). Sea $\vhat_1(s_1)$ el valor de estar en el estado $s_1$. ¿Cuál es $\vhat_1(s_1)$?</li>
    <li>Sea $s^x_0$ el estado post-decisión anterior antes de $s_1$, y sea $\vhat^x_0(s^x_0)$ el valor de estar en $s^x_0$. ¿Cuál es $\vhat^x_0(s^x_0)$?</li>
    <li>¿Cuál es la ventaja computacional de usar estados post-decisión en lugar de estados de pre-decisión en términos de calcular una política? Esto debería ser una respuesta de una sola oración.</li>
  </ol>
</li>
</ol>

**Preguntas de programación**

Estos ejercicios usan el módulo de Python *StochasticShortestPath_Static* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li>(Esta pregunta se aplica a la extensión de ruta más corta estocástica adaptativa anterior.) Actualmente, el algoritmo tiene un factor de suavizamiento fijo para estimar las aproximaciones de la función de valor al resolver el problema modificado en la extensión. Implemente un tamaño de paso decreciente, de la siguiente manera:

$$
\alpha_n = \frac{\theta^{step}}{\theta^{step} + n-1}.
$$

Ejecute el módulo de python para $\theta^{step} = (1, 5, 10, 20, 50)$ durante 100 iteraciones, y compare el desempeño tanto en términos de la tasa de convergencia como de la solución final. ¿Cuál elegiría?</li>
</ol>
{% endraw %}