---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 11: Gestión de la cadena de suministro II: El juego de la cerveza"
permalink: /sdam/es/chapter-11/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: f0d9a39d57818789
---

{% raw %}
## Resumen del capítulo

El juego de la cerveza es un clásico en la enseñanza de la gestión de la cadena de suministro. Lo abordamos como un problema multiagente general, donde cada proveedor en el juego de la cerveza se modela como un agente separado. Esta presentación extiende la base que establecimos en el [Capítulo 10](/sdam/es/chapter-10/), con la complicación añadida de que los agentes están enviando tanto información (pedidos de cerveza) como recursos físicos (cerveza).

El capítulo mantiene el modelado de la incertidumbre bastante simple. En cambio, exploramos una serie de políticas paramétricas simples, pero usamos esto como una oportunidad para introducir las creencias que un agente tiene sobre la información que otro agente puede tener (en este caso, sobre pedidos pendientes). Luego proporcionamos una ilustración de la conocida política de "anclaje y ajuste" introducida primero por dos reconocidos científicos de la decisión, Daniel Kahneman y Amos Tversky, adaptada al contexto del juego de la cerveza. Terminamos esbozando cómo podríamos diseñar una política de anticipación estocástica, explotando la propiedad de que nuestra decisión es un escalar.

El capítulo cierra proponiendo una extensa serie de extensiones, indicando la riqueza de las variaciones de los problemas de control que surgen en entornos de cadenas de suministro.

## Narrativa

Este capítulo cubre un famoso juego de la década de 1950 conocido como el "juego de la cerveza". Este fue diseñado originalmente por Jay Forrester, un profesor del MIT que creó el juego para ilustrar las inestabilidades de las cadenas de suministro. El problema involucra una cadena de suministro lineal donde varios proveedores mueven cerveza desde donde se fabrica (el fabricante) hacia el mercado (el minorista). La cerveza tiene que pasar por varios intermediarios en su camino desde el punto de fabricación hasta el mercado.

Hay dos tipos de flujos:

- El flujo de cerveza – Cada caja de cerveza se representa mediante una moneda de un centavo que se mueve del fabricante al minorista.
- El flujo de información – Cada punto de la cadena de suministro reabastece su inventario haciendo solicitudes de más cerveza al siguiente nivel hacia abajo.

Cada nivel de la cadena de suministro se conoce como un *escalón*. Normalmente hay entre cuatro y seis escalones por cada equipo. Las demandas en el minorista se fijan de antemano, pero ocultas, en una baraja de cartas. Cuando el minorista revela la demanda de esa semana, intenta satisfacerla a partir del inventario. El minorista, y cualquier otro proveedor en la cadena de suministro (excepto el fabricante), luego completa una hoja de papel solicitando más inventario.

Es posible que el minorista, o cualquiera de los proveedores intermedios, no pueda satisfacer la solicitud de más inventario (o la demanda del mercado a nivel minorista). En este caso, la demanda insatisfecha queda en un rezago de pedidos esperando a ser satisfecha cuando llegue nuevo inventario.

Después de completar los pedidos, todos (en esa cadena de suministro) deben detenerse y registrar ya sea su inventario (el número de cajas de cerveza que quedan en inventario) o su rezago de pedidos. El rezago de pedidos conlleva una penalización de ＄4 por caja. El exceso de inventario conlleva un costo de mantenimiento de ＄1 por caja.

Los pasos del proceso se ilustran en la Figura 11.1. Hay cinco pasos:

**Paso 0:** Cada semana, cada jugador tendrá un inventario (en centavos, cada uno representando una caja de cerveza), y un pedido, que podría ser la demanda minorista (para el escalón minorista) o un pedido colocado por el jugador a su izquierda.

**Paso 1:** Cada jugador intenta tomar tantas cajas de su inventario como pueda y moverlas hacia su izquierda a un punto *entre* él y el jugador de la izquierda (no agregue las monedas al inventario del jugador de la izquierda). Si no hay suficiente inventario para satisfacer el pedido, tache el pedido y reemplácelo con el número de cajas que quedan por satisfacer (esto es el rezago de pedidos).

**Paso 2:** Ahora escriba un pedido de cuántas cajas desea para reabastecer su inventario, y colóquelo en el área *entre* usted y el jugador a su derecha (el fabricante coloca un pedido sobre la pila de monedas de la cual se origina toda la cerveza).

**Paso 3:** Detenga y registre en su hoja de inventario cuánto inventario tiene. Si no ha podido satisfacer un pedido, no tendrá inventario, y tendrá pedidos en su rezago (los pedidos insatisfechos). Si este es el caso, registre esto como su rezago de pedidos.

**Paso 4:** Este es el paso clave: extienda su mano izquierda y jale el siguiente comprobante de pedido hacia su pila de pedidos (las hojas de papel), y al mismo tiempo extienda su mano derecha para jalar las monedas que le llegan hacia su inventario. Ahora está de vuelta donde estaba en el paso 0.

<figure class="book-figure">
  <img src="/assets/images/sdam/princetonbeergame2018.png" alt="Disposición de la versión de Princeton del juego de la cerveza." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 11.1.</span> Disposición de la versión de Princeton del juego de la cerveza.</figcaption>
</figure>

Es muy importante que todos hagan sus movimientos al mismo tiempo, pero no se les permite compartir información (y no deben mirar los inventarios de otros jugadores en la misma cadena). El minorista tiene que desempeñar el papel de mantener a todos sincronizados.

Las instrucciones completas para una versión simplificada del clásico juego de la cerveza se pueden descargar en [tinyurl.com/PrincetonBeerGame](https://tinyurl.com/PrincetonBeerGame). Esta versión del juego es ideal para clases impartidas en mesas continuas con una clase de al menos 8-10 estudiantes (las mesas continuas son necesarias para que los jugadores puedan empujar papel y monedas entre ellos). Los equipos deben tener cinco o seis jugadores (lo que significa cinco o seis escalones intermedios más el minorista), pero no menos de cuatro. La persona que maneja el inventario más cercano a la fábrica puede manejar ambas posiciones (ya que la fábrica hace poco más que completar pedidos). Los equipos no tienen que ser del mismo tamaño, y es bastante fácil extender una cadena para agregar a un estudiante que llegue tarde. Es posible ejecutar el juego completo en una clase de 50 minutos.

## Planteamiento del problema

Este es otro problema multiagente. Las respuestas a nuestras tres preguntas de planteamiento para cada agente son:

- **Métricas:** Minimizar los costos esperados de mantenimiento de inventario más los costos de pedidos pendientes por pedidos insatisfechos.
- **Decisiones:** Cuánto producto nuevo solicitar al siguiente agente a lo largo de la cadena de suministro.
- **Incertidumbres:** Cuánto solicitará el mercado (para el agente minorista que satisface directamente al mercado), o la cantidad que el siguiente agente más cercano al mercado ordenará, y la cantidad de pedidos solicitados que son satisfechos por los agentes anteriores (más cercanos a la fábrica).

## Modelo básico

Vamos a modelar un proveedor distinto de uno de los puntos finales (minorista o fabricante de cerveza). Este modelo seguirá de cerca el estilo del problema del vendedor de periódicos de dos agentes del capítulo anterior, aunque hay algunos ajustes. Antes de comenzar, tenemos que introducir alguna notación nueva para sistemas multiagente.

### Notación multiagente

Antes de comenzar, necesitamos establecer nuestro sistema de notación para quién sabe qué, y el proceso de compartir información.

Vamos a etiquetar los diferentes agentes de toma de decisiones en la cadena de suministro mediante $\Qcal = \lbrace 1, 2, \ldots, Q\rbrace $. Vamos a dejar que $q=0$ describa el mercado, que es una fuente de información pero no toma decisiones. Vamos a dejar que $q=Q$ se refiera a la planta de fabricación que asumimos (al menos inicialmente) que siempre puede producir suficiente producto para satisfacer la demanda.

Comenzamos definiendo la variable de estado para el agente $q$ usando $S_{tq}$, la información conocida por el agente $q$ en el tiempo $t$ (esto puede incluir creencias). Si el agente $q$ actúa sobre el agente $q'$, usaremos $x_{tqq'}$, la acción del agente $q$ sobre el agente $q'$. Notamos que la decisión $x_{tqq'}$ es determinada por $q$, pero llega a $q'$ como información.

Una acción de $q$ sobre $q'$ en el tiempo $t$ puede involucrar el movimiento de recursos físicos, pero también podría incluir el envío de información. La acción de $q$ sobre $q'$ llegará a $q'$ como un proceso de información exógena que llega a $q'$ en el tiempo $t+1$ (que es donde se capturarían las distorsiones), lo cual escribimos como $W_{t+1,q,q'}$, información que llega al agente $q'$ en el tiempo $t+1$ desde acciones tomadas por el agente $q$ (esto puede ser información sobre recursos o involucrar el envío o compartición de información de $S_{tq}$).

Finalmente, habrá momentos en los que el agente $q$ necesitará crear una estimación de algo conocido por el agente $q'$. Si dejamos que $S_{tq'}$ represente algo conocido por el agente $q'$, dejaremos que $\overleftarrow{S}\_{t,q,q'}$ denote la estimación que el agente $q$ crea de la información en $S_{tq'}$.

### Variables de estado

Las variables de estado para los agentes $q=1, \ldots, Q-1$ son: $R^{inv}\_{tq}$, el inventario que queda después de la iteración $t$ tras entregar producto al proveedor aguas arriba para el agente $q$; y $R^{back}\_{tq}$, la demanda pendiente que aún no ha sido satisfecha desde el inventario.

Se asume que el fabricante $q=Q$ siempre tiene inventario ilimitado.

Con el tiempo aprenderemos que esta es una declaración incompleta del estado del problema, pero es un buen punto de partida.

### Variables de decisión

El agente $q$ tiene que tomar dos decisiones. La primera (y más importante) es cuánto pedir al agente aguas abajo $q+1$, lo cual escribimos como $x^{req}\_{tq,q+1}$, el pedido colocado por el proveedor $q$ para ser transmitido al proveedor $q+1$, hecho en el instante de pedido en la iteración $t$, que será recibido por $q+1$ para ser completado en la iteración $t+1$.

La segunda es cuánto de la solicitud del agente aguas arriba satisfacer desde el inventario. Escribimos esto como $x^{fill}\_{tq,q-1}$, cuánto de la demanda insatisfecha $R^{back}\_{tq}$ satisfacer en el tiempo $t$ desde el inventario.

Estas decisiones están restringidas para $q=1, \ldots, Q-1$ por:

$$
\begin{align}
0 \leq x^{fill}_{tq,q-1}           &\leq R^{inv}_{tq},\label{eq:beergameconstraint1}\\
0 \leq x^{fill}_{tq,q-1}           &\leq R^{back}_{tq},\label{eq:beergameconstraint2}\\
x^{req}_{tq,q+1},x^{fill}_{tq,q-1} &\geq 0. \label{eq:beergameconstraint3}
\end{align}
$$

La restricción $\eqref{eq:beergameconstraint1}$ refleja la realidad de que no podemos enviar inventario al agente $q-1$ que no tenemos disponible. La restricción $\eqref{eq:beergameconstraint2}$ dice que no podemos enviar inventario al agente $q-1$ que no ha sido solicitado. Note que $R^{back}\_{tq}$ incluye nuevos pedidos que aún no han sido completados.

Luego escribimos nuestro vector de decisión como

$$
x_{tq} = (x^{req}_{tq,q+1},x^{fill}_{tq,q-1}),
$$

donde nuestras decisiones serán tomadas mediante alguna política $X^\pi(S_t)$ que diseñaremos más adelante.

En nuestro juego básico, siempre vamos a satisfacer tanto del pedido de $q-1$ como podamos desde el inventario, así que técnicamente $x^{fill}\_{tq,q-1}$ no es realmente una decisión ya que simplemente estableceremos $x^{fill}\_{tq,q-1} = \min\lbrace R^{back}\_{tq},R^{inv}\_{tq}\rbrace $. Sin embargo, sigue siendo una acción tomada por $q$, y abre la puerta a comportamientos más ricos más adelante.

Si somos el mercado minorista $q=0$, entonces la solicitud $W_{t,0,1} = x^{req}\_{t,0,1}$ hecha al agente $q=1$ proviene de una fuente de información exógena.

Si somos la planta $q=Q$, siempre satisfacemos la solicitud de $q=Q-1$, así que

$$
x^{fill}_{t+1,Q,Q-1} = x^{req}_{t,Q-1,Q}.
$$

### Información exógena

Hay dos tipos de información exógena para el proveedor $q$: $W^{fill}\_{t+1,q+1,q}$, la cantidad de producto recibido del proveedor $q+1$ en respuesta a la solicitud hecha en el tiempo $t$ pero que llega en el tiempo $t+1$; y $W^{req}\_{t+1,q-1,q}$, el pedido hecho por el proveedor $q-1$ en el tiempo $t$ al proveedor $q$, el cual llegaría en el tiempo $t+1$.

Es importante reconocer que las decisiones tomadas por los agentes $q+1$ y $q-1$ llegan al agente $q$ como información exógena. Esto significa que podríamos escribir

$$
W^{fill}_{t+1,q+1,q} = x^{fill}_{t,q+1,q}, \qquad W^{req}_{t+1,q-1,q} = x^{req}_{t,q-1,q}.
$$

Podemos representar la información exógena para el agente $q$ que llega hasta el tiempo $t+1$ usando

$$
W_{t+1,q} = (W^{fill}_{t+1,q+1,q},W^{req}_{t+1,q-1,q}).
$$

Esto describe el proceso de información para los agentes intermedios $q=1, \ldots, Q-1$. El proceso de información $W_{t,0}$ se refiere al mercado donde asumimos que hay una fuente exógena de solicitudes $x^{req}\_{t,0,1} = W_{t,0,1}$ que se hacen al agente 1.

### Función de transición

Nuestras variables de estado $R^{inv}\_{tq}$ y $R^{back}\_{tq}$ para $q=1, \ldots, Q-1$ evolucionan según

$$
\begin{align}
R^{inv}_{t+1,q} &= R^{inv}_{tq}-x^{fill}_{t,q,q-1} + W^{fill}_{t+1,q+1,q}, \label{eq:beergametrans1}\\
R^{back}_{t+1,q} &= R^{back}_{tq}-x^{fill}_{t,q,q-1} + W^{req}_{t+1,q-1,q}. \label{eq:beergametrans2}
\end{align}
$$

La ecuación $\eqref{eq:beergametrans1}$ extrae la solicitud $x^{fill}\_{t,q,q-1}$ del inventario (no se le permite volverse negativa) y luego añade el inventario entrante $W^{fill}\_{t+1,q+1,q}$ desde el agente aguas abajo $q+1$ para crear el inventario en el tiempo $t+1$. La ecuación $\eqref{eq:beergametrans2}$ completa los pedidos que han sido solicitados, contenidos en $R^{back}\_{tq}$, y luego añade los nuevos pedidos $W^{req}\_{t+1,q-1,q}$ para ser completados en el periodo $t+1$.

### Función objetivo

Nuestra función objetivo para el agente $q$ evalúa penalizaciones por el inventario sobrante $R^{inv}\_{tq}$ y la demanda insatisfecha $R^{back}\_{tq}$. Sea $c^{inv}\_q$ el costo unitario de mantener inventario para el agente $q$, y $c^{back}\_q$ el costo unitario de los pedidos insatisfechos para el agente $q$.

Estos costos se evalúan sobre los inventarios y las demandas pendientes después de tomar decisiones para satisfacer un pedido del cliente pero antes de que hayan llegado nuevos pedidos. Entonces, nuestra función de costo para el agente $q$ está dada por

$$
C(S_t,x_t) = c^{inv}(R^{inv}_{tq}-x^{fill}_{t,q,q-1}) + c^{back}(R^{back}_{tq}-x^{fill}_{t,q,q-1}).
$$

Tenga en cuenta que $R^{inv}\_{tq}$ es el inventario actual, por lo que $R^{inv}\_{tq}-x^{fill}\_{t,q,q-1}$ es el inventario restante después de haber atendido los pedidos correspondientes al tiempo $t$. De manera similar, $R^{back}\_{tq}$ incluye los nuevos pedidos, así como los pedidos no atendidos de períodos anteriores. Como resultado, $R^{back}\_{tq}-x^{fill}\_{t,q,q-1}$ son los pedidos que no se atendieron de inmediato.

Ahora buscamos la mejor política usando

$$
\min_\pi \E\left\{\sum_{t=0}^T C_q(S_t,X^\pi(S_t))\vert S_0\right\}.
$$

Esto debe hacerse para cada agente $q$, suponiendo que cada uno se autooptimiza. Un desafío aparte es elegir políticas para cada agente, que solo pueden usar la información disponible para cada agente, pero donde aún queremos políticas que logren una optimalidad global. Esa es una cuestión que va más allá del alcance de este libro.

## Modelado de la incertidumbre

Cada agente, excepto los agentes en los extremos, debe gestionar dos fuentes de incertidumbre:

- Las solicitudes hechas por el agente aguas arriba, que puede ser el mercado, u otro agente que responde de manera incierta a las demandas que enfrenta, y la capacidad de la cadena de suministro para responder a sus solicitudes.
- La capacidad del agente aguas arriba para atender los pedidos del agente.

En otras palabras, las únicas fuentes de incertidumbre son el mercado y el comportamiento de los agentes. Las formas en que los agentes (que son personas) interactúan entre sí introducen dinámicas complejas (e inciertas). Normalmente, el juego se desarrolla de manera que la dinámica del mercado es bastante modesta. Incluso cuando se juega así, el comportamiento humano puede introducir inestabilidades significativas que se han observado en cadenas de suministro reales, donde se les ha dado el nombre de "efecto látigo" (bullwhip effect).

## Diseño de políticas

Existe una variedad de políticas básicas de estilo PFA que podríamos considerar. Comenzamos suponiendo que siempre atendemos una solicitud hasta el límite de nuestro inventario disponible, de modo que

$$
x^{fill}_{t,q,q-1} = \min\{x^{req}_{t,q-1,q}, R^{inv}_{tq}\}.
$$

Observamos que, a medida que diseñamos diferentes políticas, es posible que debamos introducir elementos adicionales a las variables de estado para satisfacer las necesidades de información de la política.

### Algunas reglas simples

Vamos a calentar motores con algunas reglas de pedido simples:

- Solicitar al agente $q+1$ lo mismo que se solicitó a $q$ en el período de tiempo anterior:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = W^{req}_{t-1,q-1,q} + \theta_{q}.
$$

  Esta política ignora cuánto tenemos en inventario; es una política de puro seguimiento (tracking). Esta política requiere que almacenemos la solicitud anterior $W^{req}\_{t-1,q-1,q}$ en nuestra variable de estado, que se convierte en

$$
S_{tq} = (R^{inv}_{tq},R^{back}_{tq}, W_{t-1,q-1,q}).
$$

  Luego la incrementamos en $\theta$ para protegernos contra la incertidumbre.
- Solicitar lo necesario para satisfacer las demandas actuales y pasadas:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = R^{back}_{tq} + \theta_{q}.
$$

  Cuando tenemos demandas pendientes, esta política implicaría un doble conteo, lo que significa hacer múltiples solicitudes.
- Política de inventario objetivo:

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta) = \max\{0, \theta^{target}_{q}-R^{inv}_{tq}\}.
$$

  Esta política busca mantener un inventario objetivo especificado $\theta^{target}$ que no varía a medida que cambian las condiciones.

Estas son PFAs parametrizadas básicas que son fáciles de implementar, pero por supuesto requieren ajuste (tuning). Al mismo tiempo, son bastante simples e ignoran factores como el historial de pedidos pasados que aún no se han atendido (de hecho, cada una de estas políticas tiene fallas fundamentales).

Tenga en cuenta que $R^{back}\_{tq}$ son los pedidos del agente $q-1$ hechos al agente $q$ que $q$ aún no ha atendido. Los pedidos realizados por $q$ a $q+1$ que aún no se han atendido están dados por $R^{back}\_{t,q+1}$, pero esto no es conocido de inmediato por el agente $q$. Sea $\overleftarrow{R}^{back}\_{tq,q+1}$ la estimación de $R^{back}\_{t,q+1}$ hecha por el agente $q$ de las demandas pendientes conocidas por $q+1$. Estos son los pedidos no atendidos que $q$ hizo a $q+1$, lo cual es una estadística normalmente mantenida por $q+1$.

Normalmente, la información conocida por un agente (como $q+1$) no puede ser conocida perfectamente por otro agente (como $q$), pero en este caso, se trata de una estadística que $q$ puede mantener por sí mismo usando

$$
\overleftarrow{R}^{back}_{t+1,q,q+1} = \max\{0,\overleftarrow{R}^{back}_{tq,q+1}+x^{req}_{t,q,q+1} - W^{fill}_{t+1,q+1,q}\}.
$$

Podemos usar esta estadística para sugerir una política de inventario objetivo ajustada, donde agregamos los pedidos no atendidos capturados por $\overleftarrow{R}^{back}\_{t+1,q,q+1}$ a nuestro inventario actual $R^{inv}\_{tq}$, lo cual escribimos usando:

- Política de inventario objetivo ajustado:

$$
x^{req}_{t,q,q+1} = \max\{0, \theta^{target}-(R^{inv}_{tq}+\overleftarrow{R}^{back}_{t+1,q,q+1})\}.
$$

Esta política es una forma de PFA (no hay optimización incorporada), pero refleja los suministros que llegarán en el futuro.

### Una heurística de anclaje y ajuste

En 1989, John Sterman (profesor del MIT y experto en dinámica empresarial) escribió un artículo aplicando el principio de "anclaje y ajuste" desarrollado por Tversky y Kahneman (1974) al juego de la cerveza. Vamos a esbozar esta idea aquí.

Comenzamos definiendo un conjunto de variables de estado. Las variables que realmente usamos pueden depender de la política.

- **Variables de estado físico:** $R^{inv}\_{tq}$, inventario actual; $R^{back}\_{tq}$, demanda atrasada; y $R^{transit}\_{tq}$, inventario en tránsito actual (no estamos capturando cuánto tiempo lleva el inventario en tránsito). El estado del recurso es entonces $R_{tq} = (R^{inv}\_{tq},R^{back}\_{tq},R^{transit}\_{tq})$.
- **Variables de información:** $F_{t-1,q,q-1}$, atención real de $q$ a $q-1$ del período de tiempo anterior, de modo que $F_{t-1,q,q-1} = x^{fill}\_{t-1,q,q-1}$; y $A_{t-1,q+1,q}$, llegadas reales a $q$ desde $q+1$ en el período de tiempo anterior, de modo que $A_{t-1,q+1,q} = x^{fill}\_{t-1,q+1,q}$. El estado de información es entonces $I_{tq} = (F_{t-1,q-1,q},A_{t-1,q-1,q})$. Con estas variables estamos "recordando" una actividad del período de tiempo anterior. Su uso depende de la política.
- **Variables de estado de creencia:** $\Abar_{t,q+1,q}$, tasa de llegada estimada de producto desde el agente $q+1$ (esta es una estimación de la tasa a la que el producto está llegando a $q$ desde $q+1$); $\Fbar_{t,q,q-1}$, tasa de atención estimada entregada al agente $q-1$ (esta es una estimación de la tasa a la que se está enviando producto a $q-1$); y $\Dbar_{t,q-1,q}$, tasa de demanda estimada de $q-1$ (esto sería igual a $\Fbar_{t,q-1,q}$ si atendiéramos completamente cada pedido, lo que significa que $\Fbar_{t,q-1,q} \leq \Dbar_{t,q-1,q}$). El estado de creencia es entonces $B_{tq} = (\Abar_{t,q+1,q},\Fbar_{t,q-1,q},\Dbar_{t,q-1,q})$. Al igual que con $I_t$, el uso de estas variables depende de la política. Más adelante propondremos diferentes formas de calcular estas estimaciones.

Nuestra variable de estado completa es entonces

$$
S_{tq} = (R_{tq}, I_{tq}, B_{tq}).
$$

La tasa de atención estimada $\Fbar_{t,q,q-1}$ puede calcularse de varias maneras:

- Reactiva: $\Fbar_{t,q-1,q} = F_{t-1,q-1,q}$.
- Estable: $\Fbar_{t,q-1,q} = \theta^{trgt-fill}\_q$, donde $\theta^{trgt-fill}\_q$ es una tasa de atención objetivo establecida por el agente $q$.
- Expectativas regresivas: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \theta^{trgt-fill}\_q$ para un factor de suavizado especificado $0 \leq \gamma \leq 1$.
- Expectativas adaptativas: $\Fbar_{t,q-1,q} = (1-\gamma)\Fbar_{t-1,q-1,q} + \gamma \Fbar_{t,q-1,q}$.

El principio de "anclaje y ajuste" aplicado a este contexto consiste en elegir un "ancla" que especifique cuánto esperamos que deberíamos pedir en promedio, con un "ajuste" que refleje las condiciones actuales.

- **Política de reabastecimiento básica** – Podemos usar cualquiera de los métodos para calcular $\Fbar$ para obtener la política

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}) = \Fbar_{t,q-1,q}.
$$

- **Política de anclaje y ajuste** – Vamos a usar nuestra tasa de pedido estimada $\Fbar_{t,q-1,q}$ como nuestro "ancla", que es lo que esperamos que deberíamos pedir, pero vamos a hacer ajustes basados en nuestro inventario disponible e inventario en tránsito. Representamos estos ajustes usando $\delta R^{inv}\_{tq}$, el ajuste basado en el inventario actual $R^{inv}\_{tq}$; y $\delta R^{transit}\_{tq}$, el ajuste basado en el inventario en tránsito actual $R^{transit}\_{tq}$.

  Podemos usar estos para crear una política de "anclaje y ajuste" dada por

$$
X^{\pi,req}_{t,q,q+1}(S_{tq}\vert \theta_q) = \max\{0,\Fbar_{t,q-1,q} + \delta R^{inv}_{tq} + \delta R^{transit}_{tq}\}.
$$

  Así que ahora tenemos que diseñar mecanismos de ajuste. Una posible estrategia para $\delta R^{inv}\_t$ podría ser

$$
\delta R^{inv}_{tq} = \theta^{inv}_q (R^{inv-trgt}_q - R^{inv}_{tq}),
$$

  donde $\theta^{inv}\_q$ es un factor de suavizado y el inventario objetivo $R^{inv-trgt}$ son parámetros ajustables.

  Una posible estrategia para $\delta R^{transit}\_{tq}$ podría ser

$$
\delta R^{transit}_{tq} = \theta^{transit} (R^{transit-trgt}_q - R^{transit}_{tq}).
$$

  Nuestro vector de parámetros ajustables sería entonces

$$
\theta_q = (\theta^{inv}_q, R^{inv-trgt}_q, \theta^{transit}_q, R^{transit-trgt}_q).
$$

  Estos parámetros deben ajustarse para cada agente $q$.

La política de anclaje y ajuste estuvo motivada por el comportamiento humano, más que por alguna justificación de que sería casi óptima. Una ventaja es que es simple, transparente e intuitiva. El desafío son siempre los parámetros ajustables, y en particular los objetivos $R^{inv-trgt}$ y $R^{transit-trgt}$, ya que se presentan como parámetros estáticos, cuando en realidad necesitan responder a las condiciones.

### Una política de anticipación

Planteamos por primera vez una política de anticipación estocástica en el [Capítulo 7](/sdam/es/chapter-7/), pero la reproducimos aquí para facilitar la referencia:

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA2}
\end{align}
$$

La ecuación $\eqref{eq:policiesapproximateDLA2}$ puede resultar particularmente abrumadora. La Figura 11.2 ilustra cada uno de los elementos de la política usando un árbol de decisión básico (todo esto es para un único agente $q$ que suprimimos). Hay un conjunto de decisiones $x_t$ que emanan del primer nodo de decisión $S_t$, después de lo cual tomamos una esperanza sobre la información aleatoria en $\Wtilde_{t,t+1}$. Después de eso, usamos una "política de anticipación" aproximada $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$ para cada nodo de decisión $\Stilde_{tt'}$ en nuestro modelo de anticipación, donde típicamente simplificamos la variable de estado de alguna manera. También aproximamos la información que llegará en el futuro usando $\Wtilde_{tt'}$, ya sea mediante un modelo de anticipación determinista, o un conjunto simulado de posibles resultados.

<figure class="book-figure">
  <img src="/assets/images/sdam/lookaheadpolicytodecisiontree.jpg" alt="Ilustración de la política de anticipación como un árbol de decisión." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 11.2.</span> Ilustración de la política de anticipación como un árbol de decisión.</figcaption>
</figure>

Esta ecuación puede pensarse como compuesta por dos elementos:

- Primero enumeramos cada decisión posible $x_{tq}$.
- Luego, simulamos los efectos de esta decisión usando una muestra de cualquier información aleatoria, mientras tomamos decisiones usando una "política de anticipación" aproximada que se designa $\Xtilde^{\tilde \pi}(\Stilde_{tt'})$.

Para usar esto en nuestro contexto de cadena de suministro, tenemos que simular el comportamiento de los otros agentes, teniendo en cuenta que a) no conocemos las condiciones iniciales $R_{tq'}$ para $q' \ne q$, y b) no sabemos cómo están tomando decisiones los otros agentes.

Para manejar nuestro desconocimiento de las condiciones iniciales, tenemos que considerarlas como variables aleatorias y muestrear de una distribución (esto está implícito en el primer $\Etilde_{\Wtilde_{t,t+1}}$). Observamos que es posible que un agente tenga, por ejemplo, ningún inventario y un atraso sustancial de pedidos pendientes. Podríamos suponer que este es el caso si vemos que el tiempo para atender los pedidos que estamos realizando está tardando mucho en cumplirse.

Luego tenemos que simular las políticas desconocidas. Aunque estamos tratando de construir una política de anticipación estocástica muy sofisticada para el agente $q$ en el tiempo $t$, sugerimos usar las políticas mucho más simples que hemos sugerido anteriormente, no solo para los otros agentes, sino también para el agente $q$ en períodos de tiempo futuros.

Entonces, dadas estas aproximaciones, ¿superaría una política de anticipación estocástica a una de las políticas más simples que esbozamos anteriormente? Esta sería una buena pregunta de investigación, pero la política de anticipación supera una limitación importante de las políticas paramétricas más simples. Específicamente, la política de anticipación captura naturalmente el estado complejo de este sistema, como el historial de pedidos anteriores, así como cualquier pronóstico de eventos futuros. Las políticas paramétricas son adecuadas para problemas estacionarios, mientras que la anticipación se adapta naturalmente a un comportamiento que puede ser altamente no estacionario.

## Extensiones

Hay muchas maneras en que podemos modificar este problema. Algunas ideas incluyen:

**1)** Tenemos que manejar situaciones donde los pedidos de los agentes aguas arriba son mucho más grandes (o quizás más pequeños) que lo que hemos visto en el pasado, lo que insinúa un cambio sistemático en la demanda. Podemos introducir estimaciones del posible crecimiento en las demandas futuras para manejar cambios inesperados en la demanda aguas arriba.

**2)** Podemos mantener creencias sobre cómo podrían comportarse los agentes aguas arriba. Por ejemplo, le ayuda al agente $q$ si el agente $q+1$ mantiene inventarios generosos. Podemos fomentar la acumulación de inventario introduciendo ruido en nuestras propias solicitudes, lo que luego aumenta la estimación que el agente $q+1$ tiene de la incertidumbre en los pedidos realizados por el agente $q$.

**3)** Cada agente reacciona ante las faltas de existencias, y responde manteniendo inventarios más altos. Un agente $q$ podría introducir algo de ruido en sus pedidos a $q+1$ para que $q+1$ mantenga inventarios más altos, de modo que los pedidos de $q$ tengan más probabilidades de ser atendidos.

**4)** Gran parte de la sensibilidad del juego se debe a la alta penalización por quedarse sin existencias en comparación con mantener inventario (recuerde que cuesta ＄4 por caja por día de pedidos atrasados, y ＄1 por caja por día por mantener inventario). Intente cambiar el costo por falta de existencias de ＄4 a ＄1, y luego a ＄0,50.

## ¿Qué aprendimos?

- Describimos un problema multiagente simple llamado el "juego de la cerveza" que fue inventado en la década de 1950. Para modelar el problema, introducimos notación adicional para capturar el conocimiento de cada agente, y la transferencia de información entre agentes. Esto puede pensarse como una serie de problemas de vendedor de periódicos de dos agentes, con la particularidad de que el inventario excedente se conserva hasta el siguiente periodo de tiempo, al igual que las demandas insatisfechas.
- Se remite a los lectores a una versión simplificada del clásico juego de la cerveza desarrollada por el autor en la Universidad de Princeton.
- Introducimos notación que captura lo que sabe cada agente, incluyendo una estimación por parte de un agente de la información conocida por otro agente.
- Modelamos una decisión de un agente como información exógena para otro agente.
- Comenzamos con algunas políticas PFA simples donde los agentes se adaptan a información básica sobre cuánto necesitan ordenar.
- Luego resumimos una famosa política de "anclaje y ajuste" sugerida por dos psicólogos, que es otra forma de PFA.
- Finalmente esbozamos una política de anticipación directa que depende de que un agente $q$ simule el comportamiento de otros agentes.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Cuál es el estado de un agente intermedio?</li>
<li>¿Qué decisiones puede tomar cada agente?</li>
<li>¿Cuáles son las fuentes de información exógena para cada agente intermedio?</li>
<li>¿Qué fuentes de incertidumbre afectan el comportamiento del juego?</li>
<li>Explique con palabras qué se entiende por una política de "anclaje y ajuste". ¿Era la expectativa de sus diseñadores que esta pudiera ser una buena política?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Ofrezca una crítica a las reglas simples sugeridas anteriormente.</li>
<li>Imagine que ocurren cambios ocasionales, pero poco frecuentes, en la demanda del mercado hacia niveles mucho más altos o más bajos. Diseñe una política que entienda que estos cambios pueden ocurrir, lo que significa que el resto de la cadena de suministro también debe adaptarse. ¿Cómo respondería su política a los inevitables periodos de escasez de producto?</li>
<li>La sección de la política de anticipación anterior proporciona un esbozo aproximado de una política de anticipación. Complete los detalles escribiendo una implementación detallada.</li>
</ol>
{% endraw %}