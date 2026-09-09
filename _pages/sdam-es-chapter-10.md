---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 10: Gestión de la cadena de suministro I: El problema del vendedor de periódicos de dos agentes"
permalink: /sdam/es/chapter-10/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: b16196f414f7b8a3
---

{% raw %}
## Descripción general del capítulo

Un problema común que surge en cualquier problema de gestión de cadena de suministro es que se tienen gerentes ("agentes") que necesitan recursos, y que deben solicitarlos a gerentes de nivel superior. En la práctica, estos gerentes de "campo" nunca saben exactamente cuánto necesitarán, y tienden a pedir de más para evitar los importantes costos negativos de quedarse sin recursos. Los gerentes "centrales" quieren que los gerentes de campo tengan lo que necesitan, pero son conscientes de su incentivo a pedir demasiado. Los gerentes centrales, entonces, tienden a recortar estas solicitudes en un esfuerzo por dar a los gerentes de campo solo lo que necesitan.

Ambos gerentes tienen su propio "problema del vendedor de periódicos" que vimos por primera vez en el [Capítulo 3](/sdam/es/chapter-3/). Sin embargo, ahora tenemos dos "vendedores de periódicos" que compiten entre sí, ya que cada uno necesita crear una aproximación de cómo se comportará el otro. Este problema surge en todo tipo de negocios, y sin embargo no parece haber atraído ninguna atención en la literatura de investigación.

Este problema requiere que nos adentremos, aunque sea superficialmente, en el modelado de problemas multiagente. Usamos el marco de modelado estándar que hemos estado aplicando hasta ahora, con la particularidad de que ahora creamos una versión de estos modelos para cada agente que toma decisiones. Sin embargo, aparte de introducir un conjunto más rico de interacciones, la aplicación del marco de modelado universal a cada agente sigue siendo la misma.

## Narrativa

Imagine que un gerente de campo de Amazon tiene que proporcionar remolques para transportar carga fuera de Chicago semanalmente. El gerente de campo tiene acceso a información que le permite estimar cuántos remolques necesitará esa semana, pero la cifra real podría ser mayor o menor. El gerente de campo entonces hace una solicitud de remolques a un gerente central, quien luego hace su propio juicio sobre cuántos remolques proporcionar, y toma la decisión final sobre el número de remolques que se proporcionarán.

Los dos gerentes trabajan para la misma empresa, pero el gerente de campo está mucho más preocupado por quedarse sin recursos, ya que tiene que hacer alquileres de corto plazo si se queda sin remolques. El gerente central, por otro lado, no quiere que el gerente de campo se quede sin recursos, pero tampoco quiere que tenga remolques en exceso, ya que ella tiene que pagar por esos remolques.

Suponemos que el proceso se desarrolla de la siguiente manera:

**Paso 1:** El gerente de campo observa una estimación inicial de cuántos remolques se necesitan. Esta información es privada del gerente de campo.

**Paso 2:** El gerente de campo entonces solicita remolques al gerente central, donde típicamente inflaría su solicitud para reducir la probabilidad de quedarse sin recursos.

**Paso 3:** El gerente central entonces decide cuántos remolques dar al gerente de campo, típicamente reduciendo la solicitud dado el patrón observado de que el campo pidió más de lo necesario.

**Paso 4:** El gerente de campo recibe el número de remolques concedidos por el gerente central, y luego observa la necesidad real de remolques.

**Paso 5:** Los gerentes de campo y central calculan su desempeño usando sus propios costos por exceso (los remolques no utilizados) y por déficit (la demanda no cubierta).

La tensión en este problema surge primero porque la estimación inicial de remolques necesarios es solo una estimación, la cual podemos suponer que no tiene sesgo (es decir, es cierta en promedio). El problema es que el gerente de campo tiene un costo elevado si se queda sin recursos, por lo que su estrategia es sobreestimar sus necesidades (recordemos el problema del vendedor de periódicos en el [Capítulo 3](/sdam/es/chapter-3/)). El gerente central, por otro lado, probablemente tiene costos equilibrados por exceso y por déficit, y no quiere pedir ni demasiados ni muy pocos.

Lo que complica el problema es la estimación inicial dada al gerente de campo. Aunque no es perfecta, tiene información valiosa ya que indicará si un día tendrá alta o baja demanda. Esto significa que el gerente central tiene que prestar atención a la solicitud hecha por el gerente de campo, mientras reconoce que el gerente de campo hará solicitudes sesgadas al alza. Sabiendo esto, el gerente central tendería a usar la solicitud del gerente de campo como punto de partida, pero luego reducirla para la asignación final. No es de extrañar que el gerente de campo sepa que el gerente central hará esto, y compense en consecuencia.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Cada agente tiene su propia métrica que implica minimizar el costo esperado por déficit y por exceso.
- **Decisiones:** El agente de campo decide cuánto solicitar al agente central. El agente central decide cuánto de la solicitud del agente de campo satisfacer.
- **Incertidumbres:** La incertidumbre central es la demanda real de recursos en el campo. Luego, el agente de campo tiene que lidiar con la incertidumbre de cómo responderá el agente central a sus solicitudes, y el agente central tiene que lidiar con la incertidumbre de cuánto solicitará el agente de campo, lo que refleja información privada.

## Modelo básico

Modelaremos el problema para ambos agentes, ya que la información no es la misma para ambos jugadores. A lo largo del modelo, nos referiremos al gerente de campo como $q$ y al gerente central como $q'$.

### Variables de estado

La información inicial disponible para el gerente de campo es la estimación del número de remolques que se necesitarán, que representamos usando $R^{est}\_{tq}$, la estimación inicial de cuántos remolques se necesitan. Esta estimación inicial puede tener sesgo, así que introducimos una estimación de este sesgo usando $\delta^{est}\_{tq}$, la estimación inicial de la diferencia entre $R^{est}\_{tq}$ y la demanda real. También tendremos que estimar cuánto reduce el gerente central la solicitud del gerente de campo, lo cual representamos usando $\delta_{tq}$, la estimación de cuánto reducirá el gerente central la solicitud del gerente de campo. De manera similar, el gerente central aprenderá la diferencia entre la solicitud hecha por el gerente de campo y lo que el gerente de campo eventualmente necesita, lo cual representamos por $\delta_{tq'}$, la estimación de la diferencia entre lo que el gerente de campo solicita y lo que el campo eventualmente necesita.

La variable de estado para cada agente es la información que tienen antes de tomar una decisión. Para el gerente de campo, la variable de estado es

$$
S_{tq} = (R^{est}_{tq}, \delta^{est}_{tq}, \delta_{tq}).
$$

La variable de estado para el gerente central es

$$
S_{tq'} = (x_{tqq'}, \delta_{tq'}).
$$

donde $x_{tqq'}$ es la solicitud hecha por el agente de campo $q$ al gerente central $q'$ (que se introduce a continuación).

### Variables de decisión

Las decisiones para cada agente están dadas por $x_{tqq'}$, el número de remolques que el agente $q$ pide al agente $q'$, y $x_{tq'q}$, el número de remolques que el agente $q'$ da al agente $q$, que es lo que se implementa en el campo.

### Información exógena

La información exógena para el gerente de campo puede pensarse como la estimación inicial de los remolques necesarios (aunque la colocamos en la variable de estado): $R^{est}\_{tq}$, la estimación inicial de cuántos remolques se necesitan. Esta estimación es conocida solo por el agente de campo $q$.

Después de tomar la decisión $x_{tqq'}$, recibimos entonces dos tipos de información: lo que el gerente central nos concede, y luego la demanda real requerida: $x_{tq'q}$, la decisión tomada por el gerente central en respuesta a la solicitud del gerente de campo; y $\Rhat_{t+1}$, el número real de remolques que el gerente de campo $q$ termina necesitando (esta información también está disponible para el gerente central).

La información exógena para el agente $q$ es entonces

$$
W_{t+1,q} = (x_{tq'q},\Rhat_{t+1}).
$$

Notamos de paso que aunque esta información está indexada en el tiempo $t+1$, la solicitud concedida por el gerente central, $x_{tq'q}$, está indexada por $t$ ya que depende de la información disponible hasta el tiempo $t$. La estimación inicial $R^{est}\_{tq}$ es información nueva, pero llega antes de que se tome la decisión, por lo que se captura en la variable de estado del agente de campo.

El gerente central recibe la solicitud inicial $x_{tqq'}$ que llega como información exógena, pero debido a que se recibe antes de que ella tome su decisión, entra a través de la variable de estado del gerente central. La única información exógena para el gerente central es la demanda final, que podría entonces usarse para actualizar creencias que influyen en decisiones futuras. Esto significa

$$
W_{t+1,q'} = (\Rhat_{t+1}).
$$

### Función de transición

Para el gerente de campo, hay tres variables de estado: $R^{est}\_{tq}$, el sesgo $\delta^{est}\_{tq}$ entre la estimación $R^{est}\_{tq}$ y el valor real $\Rhat_{t+1}$, y el sesgo $\delta_{tq}$ introducido por el gerente central cuando el campo hace una solicitud. La primera variable de estado, $R^{est}\_{tq}$, llega directamente como información exógena. Los sesgos $\delta^{est}\_{tq}$ y $\delta_{t,q}$ se actualizan usando

$$
\delta^{est}_{t+1,q} =  (1-\alpha) \delta^{est}_{tq}   + \alpha (\Rhat_{t+1} - R^{est}_{tq}), \qquad \delta_{t+1,q} = (1-\alpha) \delta_{tq}  + \alpha (x_{tqq'} - x_{tq'q}),
$$

donde $0 < \alpha < 1$ es un factor de suavizamiento.

La función de transición para el gerente central es similar. Nuevamente, la decisión del gerente de campo, $x_{tqq'}$, llega a la variable de estado de manera exógena. Luego, actualizamos el sesgo que el gerente central estima en la solicitud del gerente de campo usando

$$
\delta_{t+1,q'} = (1-\alpha) \delta_{t,q'}  + \alpha (x_{tqq'} - \Rhat_{t+1}).
$$

### Función objetivo

Comenzamos definiendo $c^o_q$, el costo unitario incurrido por el gerente de campo por cada remolque en exceso (lo que el campo paga por día por cada remolque), también conocido como el costo de exceso; $c^u_q$, el costo unitario incurrido por el gerente de campo por cada remolque que debe alquilarse para compensar la falta de capacidad, también conocido como el costo de déficit; y $c^o_{q'}, c^u_{q'}$, el costo de exceso y déficit para el gerente central.

Los costos para cada agente están dados por

$$
C_{tq}(S_{tq},x_{tq'q}) = c^o_q \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q} \max\{\Rhat_{t+1} - x_{tq'q},0\},
$$

$$
C_{tq'}(S_{tq'},x_{tq'q}) = c^o_{q'} \max\{x_{tq'q}-\Rhat_{t+1},0\} + c^u_{q'} \max\{\Rhat_{t+1} - x_{tq'q},0\}.
$$

El desempeño tanto del gerente de campo como del gerente central depende del número de remolques $x_{tq'q}$ que el gerente central da al campo. Esta decisión, sin embargo, depende de la decisión tomada por el gerente de campo.

Las decisiones del gerente de campo se toman con la política $X_{tq}(S_t\vert \theta_q)$, donde $\theta_q$ es uno o más parámetros ajustables que se usan para resolver

$$
\begin{align}
\min_{\theta_q}\E \left\{\sum_{t=0}^T C_{tq}(S_{tq},X_{tq}(S_t\vert \theta_q))\vert S_0\right\}.  \label{eq:fieldobjective}
\end{align}
$$

De manera similar, las decisiones del gerente central se toman con la política $X_{tq'}(S_t\vert \theta_{q'})$ donde $\theta_{q'}$ es uno o más parámetros ajustables que resuelven

$$
\begin{align}
\min_{\theta_{q'}}\E \left\{\sum_{t=0}^T C_{t{q'}}(S_{tq'},X_{tq'}(S_t\vert \theta_{q'}))\vert S_0\right\}. \label{eq:centralobjective}
\end{align}
$$

Los problemas de optimización en $\eqref{eq:fieldobjective}$ y $\eqref{eq:centralobjective}$ deben resolverse simultáneamente, ya que ambas políticas tienen que simularse al mismo tiempo. Por supuesto, podríamos mantener $\theta_{q'}$ constante para el gerente central mientras ajustamos $\theta_q$ para el gerente de campo, pero en última instancia estamos buscando un mínimo local estable.

## Modelado de la incertidumbre

Este problema está impulsado por datos, lo que significa que reaccionamos a los datos a medida que llegan. Hay tres tipos de información, dependiendo de qué agente esté involucrado:

- La estimación inicial $R^{est}\_t$ de los recursos requeridos.
- La solicitud $x_{tqq'}$, hecha por el gerente de campo, que llega al gerente central. Esta decisión involucra la lógica introducida por el gerente de campo, que puede incluir aleatorización. Esto llega como información al gerente central.
- La decisión $x_{tq'q}$ tomada por el gerente central que determina el número de remolques dados al gerente de campo. Esto llega como información al gerente de campo.
- La realización final $\Rhat_{t+1}$ del número de remolques realmente requeridos, que se revela (en este modelo básico) a ambos agentes.

Si deseamos simular el proceso, solo necesitamos modelar la generación de $R^{est}\_t$ y $\Rhat_t$. Más precisamente, tendríamos que generar $R^{est}\_t$ a partir de una distribución, y el error $\Rhat_t - R^{est}\_t$ a partir de otra distribución.

## Diseño de políticas

Para nuestro problema del vendedor de periódicos con dos agentes, tenemos que desarrollar políticas para cada agente. Comenzamos con la política para el gerente de campo.

### Gerente de campo

El gerente de campo comienza con una estimación $R^{est}\_t$, pero tiene que tener en cuenta tres factores:

**1)** La estimación $R^{est}\_t$ puede tener un sesgo $\delta^{est}$ (no podemos estar seguros sobre la fuente de la estimación $R^{est}\_{tq}$). El sesgo está dado por

$$
\delta^{est}_{tq}= \E \Rhat_{t+1} - R^{est}_{tq}.
$$

Entonces, si $\delta^{est}\_{tq} > 0$ esto significa que $R^{est}\_t$ tiene un sesgo al alza.

**2)** El número real de remolques necesarios, $\Rhat_{t+1}$, es aleatorio incluso una vez que se ha tenido en cuenta el sesgo. El gerente de campo tiene un costo más alto por tener muy pocos remolques que por tener demasiados, por lo que querrá introducir un sesgo al alza para reflejar el costo más alto de quedarse corto.

**3)** El gerente central tiene una actitud equilibrada frente a tener demasiado o muy poco, y conoce el sesgo del gerente de campo. Como resultado, el gerente central típicamente usará la solicitud del gerente de campo, $x_{tqq'}$, al igual que el gerente de campo puede estar ajustando por un posible sesgo entre la estimación $R^{est}$ y la real $\Rhat_t$. El gerente de campo sabe que el gerente central hará este ajuste, y como resultado tiene que tratar de estimarlo y contrarrestarlo. Dado que el gerente de campo conoce tanto su solicitud $x_{tqq'}$ como luego ve lo que el gerente central proporciona, la observación en el tiempo $t$ del sesgo está dada por

$$
\delta_{tq} =  x_{tq'q} - x_{tqq'}.
$$

Necesitamos usar nuestras estimaciones de las diferencias entre $R^{est}\_t$ y $\Rhat_t$, la diferencia entre $x_{tqq'}$ y $x_{tq'q}$, y la diferencia entre $x_{tqq'}$ y $\Rhat_t$. Proponemos una política para el gerente de campo dada por

$$
\begin{align}
X_{tqq'}(S_t\vert \theta_q) = R^{est}_t - \delta^{est}_{t-1,q} - \delta_{t-1,q}  + \theta_q. \label{eq:fieldpolicy}
\end{align}
$$

Esta política comienza con la estimación inicial $R^{est}\_t$, corrige el sesgo en esta estimación inicial usando $\delta^{est}\_{t-1,q}$, luego corrige el sesgo del gerente central $\delta_{t-1,q}$, y finalmente introduce un desplazamiento que puede capturar los diferentes costos de exceso y de déficit para el gerente de campo. El parámetro $\theta_q$ debe ajustarse.

Dado que no hay un problema de optimización embebido (es decir, un $\argmax_x$ o $\argmin_x$), esta es una clásica aproximación de función de política (PFA) parametrizada.

### Gerente central

Nuestra política para el gerente central está dada por

$$
X_{tq'q}(S_t\vert \theta_{q'}) = x_{tqq'} - \delta_{t-1,q'} + \theta_{q'}.
$$

Aquí, comenzamos con la solicitud hecha por el gerente de campo, restamos nuestra mejor estimación de la diferencia entre la solicitud del gerente de campo y lo que finalmente se necesitó, $\delta_{tq'}$, y luego agregamos $\theta_{q'}$, que es un parámetro ajustable para el gerente central, donde $\theta_{q'}$ puede ser negativo.

### Búsqueda de políticas

Ahora tenemos dos políticas parametrizadas. El ajuste de la política de campo se haría con la función objetivo en $\eqref{eq:fieldobjective}$, mientras que el ajuste de la política central se haría con la función objetivo en $\eqref{eq:centralobjective}$. El truco aquí es que ambos objetivos deben simularse en paralelo, ya que las políticas están interconectadas. Y mientras ambas simulaciones se ejecutan, mantenemos un registro de los objetivos para cada agente.

La forma correcta de abordar la optimización de los parámetros de cada agente es simular el comportamiento de ambos agentes simultáneamente, pero ejecutar algoritmos de búsqueda para cada agente como si fueran separados. El desempeño del agente de campo, por ejemplo, se vería afectado por el comportamiento del agente central, tal como el agente de campo se ve afectado por las otras formas de información exógena.

Esta simulación brinda una oportunidad para explorar cómo las decisiones de cada agente pueden *cambiar* el comportamiento del otro agente. Profundizamos en esto en los ejercicios.

## ¿Qué aprendimos?

- Presentamos un problema multiagente básico que llamamos el "problema del vendedor de periódicos de dos agentes", donde un agente de campo tiene que solicitar recursos a un agente central. Aunque se supone que ambos agentes trabajan juntos, cada uno tiene sus propios costos de exceso (tener demasiados recursos) y de déficit (tener muy pocos, produciendo demandas insatisfechas).
- Modelamos información que es privada para el agente de campo e información que es privada para el agente central.
- El problema introduce la dimensión de estimar y anticipar el comportamiento del agente central para ayudar al agente de campo a tomar decisiones.
- En cada punto en el tiempo, el agente de campo tiene una mejor estimación de lo que quiere pedir dada la estimación $R^{est}\_{tq}$ y el historial del agente central ajustando la solicitud. Dada la incertidumbre y el mayor costo de quedarse sin recursos que de tener excedentes, es natural esperar que una buena política sea pedir lo que esperamos necesitar más un colchón para la incertidumbre, así que comenzamos sugiriendo políticas de esta forma.
- Este problema sienta las bases para incorporar una creencia sobre cómo responderá el agente central al ajuste que hace el agente de campo, ya que suponemos que ella finalmente ve el exceso o el déficit.
- Aunque este problema parece bastante simple, sienta las bases para muchos problemas de asignación de recursos multiagente más complejos.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Qué es conocido por el agente $q$ pero desconocido por el agente $q'$? De manera similar, ¿qué es conocido por el agente $q'$ pero desconocido por el agente $q$?</li>
<li>Hay una pieza de información que se pone a disposición de ambos agentes. ¿Cuál es?</li>
<li>¿Cuál es la información exógena que se pone a disposición del agente de campo? ¿Cuál es la información exógena que se pone a disposición del agente central?</li>
<li>Hay tres fuentes de incertidumbre en nuestro sistema. ¿Cuáles son?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Escriba los modelos dinámicos tanto para el gerente de campo como para el gerente central. Recuerde que la decisión de un gerente se convierte en información exógena para el otro.</li>
<li>¿Qué pasaría si el agente de campo simplemente pidiera cantidades cada vez mayores? ¿Qué mecanismo podría introducirse en el modelo para minimizar esta inestabilidad?</li>
<li>Cree una estimación de cómo la decisión del agente de campo, $x_{tqq'}$, podría afectar el comportamiento del agente central. Luego, diseñe una política que capture este efecto de modo que la decisión tomada por el agente de campo anticipe el efecto de su decisión.</li>
<li>Hay solo una pieza de información que puede usarse para crear una creencia sobre la política de otro agente. ¿Cuál es esa información?</li>
<li>Ahora suponga que el agente de campo puede vender los recursos que obtiene del agente central a un precio $p_{tq}$ que cambia aleatoriamente de un momento a otro. Esto significa que el agente de campo podría retener parte o la totalidad de sus recursos hasta un período posterior si el precio $p_{tq}$ es demasiado bajo. Amplíe el modelo de este capítulo para manejar este entorno mucho más rico. Necesitará introducir una nueva variable de decisión (cuánta demanda satisfacer). Sugiera una aproximación de función de política para tomar la decisión.</li>
</ol>

**Preguntas de programación**

Estos ejercicios usan el módulo de Python *TwoNewsvendor* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 9;">
<li>Realice una búsqueda en cuadrícula sobre el sesgo para los gerentes de campo y central. Busque en el rango $[0,10]$ (en pasos de 1) para el gerente de campo, y $[-11,0]$ (en pasos de 1) para el gerente central. Ejecute el juego durante $N = 30$ períodos de tiempo, y repita la simulación para 1,000 muestras (y tome un promedio). Note que está sumando recompensas a lo largo de los 30 períodos de tiempo, pero promediando sobre las 1,000 muestras. Grafique tres mapas de calor para lo siguiente:
  <ol type="a">
    <li>La recompensa total para el gerente de campo, para cada una de las combinaciones de los dos sesgos.</li>
    <li>La recompensa total para el gerente central, para cada una de las combinaciones de los dos sesgos.</li>
    <li>La recompensa total para la empresa (sumando el gerente de campo y el gerente central), para cada una de las combinaciones de los dos sesgos. Discuta las diferencias en las combinaciones óptimas desde cada una de las tres perspectivas. Cada jugador quiere maximizar su recompensa.</li>
  </ol>
</li>
<li>Ahora vamos a usar la política de aprendizaje de estimación de intervalos para aprender cada uno de los sesgos (vea la discusión de políticas en el [Capítulo 4](/sdam/es/chapter-4/)). Sea $\theta^{IE}_q$ el parámetro para la política IE del gerente de campo, y sea $\theta^{IE}_{q'}$ el parámetro para la política IE del gerente central. En lugar de buscar el mejor sesgo, vamos a buscar el mejor parámetro para guiar la política de búsqueda del sesgo.
  <ol type="a">
    <li>Ejecute el módulo de Python variando cada parámetro de aprendizaje sobre el rango $(0, 1, 2, 3, 4, 5)$. Esto significa 36 simulaciones en total (sobre un horizonte $N = 20$, y para 1,000 trayectorias de muestra). Grafique los mismos tres mapas de calor que hizo para el ejercicio 10.</li>
    <li>Compare el comportamiento de los mapas de calor de la parte (a), con los mapas de calor del ejercicio 10. Trate de explicar el comportamiento de los agentes de campo y central escribiendo las políticas y pensando en cómo debería comportarse.</li>
    <li>Verifique que la búsqueda directa del sesgo dé la mayor recompensa global. ¿Cuáles son las fortalezas y debilidades de cada enfoque en un entorno más realista donde los parámetros del problema pueden cambiar con el tiempo?</li>
  </ol>
</li>
<li>(Este ejercicio requiere algunas modificaciones al módulo de Python.) Considere ahora un problema del vendedor de periódicos de dos agentes donde el gerente central también tiene alguna información externa sobre la demanda. Lo que tiene es una estimación mucho más ruidosa de la demanda (digamos que el ruido es, para nuestros datos de hoja de cálculo donde la demanda siempre está entre 20 y 40, tres veces mayor que el ruido de la fuente que se comunica con el gerente de campo).

Redefina el sesgo del gerente central como la cantidad que agrega a la estimación que recibe. Pruebe un enfoque de aprendizaje donde el sesgo que selecciona se elige en el intervalo $[-11, 0]$. Ejecute el programa y compare los resultados con el proceso de aprendizaje anterior. Como antes, ejecute el juego durante $N = 30$ períodos de tiempo, y repita la simulación para 1,000 muestras (y tome un promedio). Después de $N = 30$ períodos de tiempo, ¿el agente central está poniendo más peso en la información proveniente del campo o de su otra fuente externa de información? ¿Por qué?</li>
<li>Considere el caso en que el gerente de campo está usando un enfoque de aprendizaje y el gerente central está usando una estrategia de castigo. Dado que sabe que el campo recibe una penalización mayor por proporcionar menos que la demanda, el gerente central calculará el sesgo de campo anterior (para el tiempo $t-1$) y si es positivo, en la siguiente ronda, aplicará un sesgo del doble de magnitud y de signo opuesto a la solicitud del campo. Ejecute este experimento y observe cuál será el sesgo del campo después de los 30 períodos de tiempo. Comparando esta política con las políticas anteriores, ¿debería el gerente central emplear esta estrategia?</li>
</ol>
{% endraw %}