---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 2: Un problema de venta de activos"
permalink: /sdam/es/chapter-2/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 0243c062a31cf107
---

{% raw %}
## Descripción general del capítulo

El problema de venta de activos es el más simple de nuestros problemas de decisión secuencial, y consiste puramente en un proceso estocástico de precios en el que debemos decidir cuándo vender un activo que estamos reteniendo. El problema consiste en determinar cuándo vender el activo de manera que se maximice el precio esperado que recibimos.

Este problema se conoce ampliamente como un *problema de parada óptima*, que normalmente se expresa mediante matemáticas bastante sofisticadas. Lo usamos para ilustrar algunas políticas básicas que caen en la primera de nuestras cuatro clases, las aproximaciones de función de política (PFA, por sus siglas en inglés). Presentamos varias PFA, cada una de las cuales requiere ajustar parámetros para obtener los mejores resultados.

Este ejercicio sirve como una ilustración simple y elegante de los cinco elementos del marco de modelado universal.

## Narrativa

Estamos reteniendo un bloque de acciones de una empresa, buscando un momento oportuno para vender. Comenzamos suponiendo que somos un jugador pequeño, lo que significa que no importa cuántas acciones vendamos, así que vamos a suponer que tenemos una sola acción. Si vendemos en el tiempo $t$, recibimos un precio que varía según algún proceso aleatorio a lo largo del tiempo, aunque no creemos que los precios tengan una tendencia al alza o a la baja. Una vez que vendemos la acción, el proceso se detiene.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Maximizar el precio esperado que recibimos al vender el activo.
- **Decisiones:** Si mantener o vender el activo.
- **Incertidumbres:** El precio de venta en periodos de tiempo futuros.

## Modelo básico

### Variables de estado

Nuestro proceso tiene dos variables de estado: el "estado físico", que captura si todavía estamos reteniendo el activo o no, y un "estado de información" que para este problema es el precio de la acción.

Nuestro "estado físico" está dado por

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

Si vendemos la acción, recibimos el precio por acción de $p_t$. Esto significa que nuestra variable de estado es

$$
S_t = (R^{asset}_t, p_t).
$$

### Variables de decisión

La variable de decisión es si mantener o vender la acción. Escribimos esto usando

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

Solo se nos permite vender la acción en este problema, por lo que debemos obedecer la restricción

$$
x_t \leq R^{asset}_t.
$$

Vamos a definir nuestra política $X^\pi(S_t)$ que determinará cómo tomamos las decisiones. En esta etapa, introducimos la notación para la política, pero posponemos el diseño de la política para más adelante. Esto es lo que queremos decir cuando afirmamos que "primero modelamos, luego resolvemos".

### Información exógena

El único proceso aleatorio en nuestro modelo básico es el cambio en el precio. Hay dos formas de escribir esto. Una es suponer que la información exógena es el cambio en el precio. Podemos escribir esto como

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

Esto significa que nuestro proceso de precios evoluciona de acuerdo con

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

Entonces escribiríamos nuestra información exógena $W_{t+1}$ como

$$
W_{t+1} = \phat_{t+1}.
$$

La segunda forma es suponer que simplemente observamos el siguiente precio, en cuyo caso escribiríamos

$$
W_{t+1} = p_{t+1}.
$$

### Función de transición

La función de transición consiste en las ecuaciones que describen cómo evoluciona el estado a lo largo del tiempo. La ecuación de transición para $R_t$ está dada por

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

donde tenemos la restricción de que $x_t \leq R^{asset}\_t$ para asegurar que no vendamos el activo cuando ya no lo poseamos.

A continuación tenemos que escribir cómo evoluciona el proceso de precios a lo largo del tiempo. Si usamos la notación $\phat_t$, la función de transición para el precio $p_t$ estaría dada por

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

Las ecuaciones $\eqref{eq:assetsellingR}$ y $\eqref{eq:assetsellingP}$ conforman lo que llamamos nuestra *función de transición*, que escribimos como

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

Si usamos nuestra política $X^\pi(S_t)$ para tomar decisiones, y si elegimos la trayectoria muestral $\omega$ que determina la secuencia $W_1, W_2, \ldots, W_T$, entonces podemos escribir una simulación de nuestro proceso como

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

Nótese que al escribir la secuencia, indexamos las variables según su contenido de información. Por ejemplo, $S_0$ es un estado inicial, y $x_0$ depende únicamente de $S_0$. En cambio, cualquier variable indexada por $t$ tiene permitido "ver" cualquiera de los resultados de nuestro proceso exógeno $W_1, \ldots, W_t$, pero no tiene permitido ver $W_{t+1}$.

### Función objetivo

Terminamos nuestro modelo con una declaración de nuestra función objetivo, que luego se convierte en la base para evaluar políticas. Para comenzar, tenemos que contar con alguna métrica de desempeño, que para este problema sería cuánto ganamos al vender nuestra acción. Podemos definir una función de contribución genérica que escribimos como $C(S_t,x_t)$, la cual estaría dada por

$$
C(S_t,x_t) = p_tx_t.
$$

En nuestro problema, $x_t =0$ hasta que decidamos vender. Por ahora, supongamos que estamos vendiendo un único activo discreto (podríamos pensar en esto como vender todas nuestras acciones a la vez). En este caso, cuando vendamos haríamos $x_t = 1$, lo cual ocurrirá solo una vez a lo largo de nuestro horizonte. Escribimos la dependencia de $C(S_t,x_t)$ para capturar la dependencia del estado, que se debe a la presencia del precio $p_t$.

Ahora queremos formular nuestro problema de optimización. Si los precios nos fueran dados de antemano, escribiríamos

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

donde impondríamos las restricciones

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

Esto está bien cuando el problema es determinístico, pero ¿cómo modelamos el problema para manejar la incertidumbre en los precios? Lo que hacemos es imaginar que estamos simulando una política siguiendo una trayectoria muestral $\omega$ de precios $p_1(\omega), p_2(\omega), \ldots$. Usando una política $\pi$, generaríamos entonces una serie de estados usando

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

Escribimos $S_t(\omega)$ para expresar la dependencia de la trayectoria muestral. También podríamos haber escrito $S^\pi_t(\omega)$ para expresar la dependencia de la política $\pi$, pero tendemos a suprimir la dependencia de la política por simplicidad.

Si seguimos la política $\pi$ a lo largo de esta trayectoria muestral, podemos calcular el desempeño usando

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

Esto es para una trayectoria muestral. Nótese que obtenemos un conjunto de decisiones $x_t(\omega)$ para cada trayectoria muestral a partir de la política $x_t(\omega) = X^\pi(S_t(\omega))$. Esta notación comunica que $x_t$ es una variable aleatoria que depende de la trayectoria muestral $\omega$. Para cada trayectoria muestral, seguimos obteniendo $\sum_{t=0}^{T-1} x_t(\omega) =1$, lo cual es paralelo a nuestra restricción anterior para la versión determinística del problema. Existe un tiempo $\tau(\omega)$ que es el momento en que $x_t(\omega)=1$ para $t=\tau(\omega)$. Este tiempo se conoce como *tiempo de parada* para este problema de venta de activos.

Podemos simular sobre una muestra de $N$ muestras $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ y calcular un promedio usando

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

Finalmente, escribimos el problema de optimización en términos de encontrar la mejor política, lo cual podemos escribir como

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

Veremos que el problema de optimización planteado por $\eqref{eq:maxpifbarasset}$, donde nos gustaría encontrar la política óptima, es principalmente aspiracional. Si bien ciertamente nos gustaría contar con la política óptima, normalmente nos conformaremos con la mejor política que podamos encontrar (y calcular).

En la práctica, típicamente usamos promedios como en la ecuación $\eqref{eq:assetsellingfbarpi}$ para nuestro problema de optimización. Sin embargo, esto es solo una aproximación de tomar una expectativa real, la cual escribiremos como

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

Por convención, cuando escribimos la expectativa, eliminamos la indexación de $\omega$ y en su lugar consideramos $\Fhat^\pi$ como una variable aleatoria, mientras que $\Fhat^\pi(\omega)$ se trata como una realización muestral (esta es la notación estándar en la comunidad del modelado estocástico, así que hay que acostumbrarse a ella).

Usando nuestro operador de expectativa, escribiríamos nuestra función objetivo como

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

A menudo, vamos a escribir nuestra función objetivo como

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

La forma de la ecuación $\eqref{eq:assetsellingobjective}$ (o $\eqref{eq:assetsellingfpiexpectation}$ o $\eqref{eq:assetsellingexpectedsum}$) es agradable y compacta. Solo hay que recordar que casi nunca es el caso que podamos realmente calcular la expectativa, por lo que en general dependemos de ejecutar simulaciones y tomar un promedio como hacemos en la ecuación $\eqref{eq:assetsellingfbarpi}$.

Ahora nos queda el problema de buscar entre políticas. Siempre crearemos primero nuestro modelo, y luego pasaremos al problema de diseñar políticas. Antes de hacer esto, tenemos que pensar en cómo vamos a modelar cualquier incertidumbre en $S_0$ y el proceso de información exógena $W_1, \ldots, W_T$.

## Modelando la incertidumbre

Vamos a necesitar alguna forma de muestrear observaciones de $W_t$ que, para este problema, significa modelar la evolución de los precios $p_t$ a lo largo del tiempo. Una forma es extraer muestras del historial. Imaginemos que estamos interesados en ejecutar nuestra simulación durante un periodo de un año. Podemos usar el historial del año anterior, pero esto es solo una trayectoria muestral.

La segunda estrategia, que usaremos con frecuencia, es estimar un modelo estadístico. Para nuestro modelo básico, podríamos suponer

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

donde $\phat_{t+1}$ se describe mediante alguna distribución de probabilidad. Un modelo simple sería suponer que $\phat_{t+1}$ se distribuye normalmente con media 0 y varianza $\sigma^2$. También podríamos comenzar suponiendo que los cambios en los precios $\phat_t$ y $\phat_{t+1}$ son independientes, y que $\phat_{t+1}$ es independiente del precio actual $p_t$ (este último supuesto es un poco fuerte, pero nos ayudará a comenzar).

La mayoría de los lenguajes de computadora tienen funciones para simular observaciones de una distribución normal. Por ejemplo, Excel proporciona la función `Norm.inv`$(p,\mu,\sigma)$, que devuelve el valor $w$ de una variable aleatoria $W$ con media $\mu$ y desviación estándar $\sigma$ donde $P[W \leq w] = p$. Un truco estándar es fijar $p=Rand()$, donde $Rand()$ es una función de Excel que devuelve una variable aleatoria distribuida uniformemente entre $0$ y $1$. Podemos entonces escribir

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

lo cual nos dará una observación aleatoria de $\phat_{t+1}$ que se distribuye normalmente con media $0$ y desviación estándar $\sigma$.

La Tabla 2.1 ilustra diez observaciones de variables aleatorias $U$ que se distribuyen uniformemente entre 0 y 1, y las muestras correspondientes de cambios de precio distribuidos normalmente $\phat$ con media 0 y varianza 1.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>$U$</th><th>$\phat$</th></tr></thead>
<tbody>
<tr><td>0.8287</td><td>0.9491</td></tr>
<tr><td>0.6257</td><td>0.3206</td></tr>
<tr><td>0.9343</td><td>1.5086</td></tr>
<tr><td>0.4879</td><td>-0.0303</td></tr>
<tr><td>0.3736</td><td>-0.3223</td></tr>
<tr><td>0.8145</td><td>0.8947</td></tr>
<tr><td>0.0385</td><td>-1.7685</td></tr>
<tr><td>0.0089</td><td>-2.3698</td></tr>
<tr><td>0.9430</td><td>1.5808</td></tr>
<tr><td>0.3693</td><td>-0.3336</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabla 2.1.</span> Diez variables aleatorias uniformes $U$, y diez muestras correspondientes de cambios de precio distribuidos normalmente $\phat$ con media 0 y varianza 1.</p>
</div>

La ecuación $\eqref{eq:assetsellingpricemodel1}$ es un modelo de precios bastante básico, pero ayudará a ilustrar nuestro marco de modelado. A continuación, vamos a presentar algunas extensiones que incluyen un modelo más enriquecido.

## Diseñando políticas

Podemos imaginar varias políticas distintas para este problema. Por ejemplo, una política simple podría ser vender si el precio cae por debajo de un punto límite que consideremos indicativo del inicio de una gran caída. Así, podríamos escribir esta política como

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

Otra política podría ser una política de venta "alto-bajo", donde queremos vender si el precio sube demasiado o baja demasiado. Sea $\theta^{high-low} = (\theta^{low}, \theta^{high})$. Esto podría escribirse

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

Una posible objeción a esta política podría ser que vende prematuramente una acción en alza. Quizás solo queramos vender cuando la acción suba por encima de una señal de seguimiento. Para abordar este problema, primero creemos una estimación suavizada del precio usando

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Ahora consideremos una política de seguimiento que podríamos escribir como

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

En todos los casos, solo podemos vender el activo (es decir, $X^{track}(S_t\vert \theta^{track}) =1$) si todavía lo estamos reteniendo (lo que significa $R^{asset}\_t = 1$).

Para esta política, vamos a necesitar ajustar nuestro modelo porque ahora necesitamos $\pbar_t$ para tomar una decisión. Esto significa que ahora escribiríamos nuestro estado como

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

Podemos escribir nuestras clases de políticas como el conjunto $\Fcal = \lbrace $"venta-baja", "alto-bajo", "seguimiento"$\rbrace $. Para cada una de estas clases, tenemos un conjunto de parámetros que podemos escribir como $\theta^f$ para $f\in\Fcal$. Para las políticas de "venta-baja" y "seguimiento" hay un único parámetro, mientras que $\theta^{high-low}$ tiene dos parámetros.

Ahora podemos escribir nuestra búsqueda sobre políticas $\pi$ de una manera más práctica como una búsqueda sobre clases de funciones $f\in\Fcal$, y luego una búsqueda sobre parámetros $\theta^f \in \Theta^f$, donde $\Theta^f$ nos indica el rango de valores posibles (capturando al mismo tiempo la dimensionalidad de $\theta^f$).

La forma en que diseñamos las políticas en esta sección puede parecer algo improvisada, pero de hecho es precisamente así como se diseñan muchas políticas (incluyendo las estrategias de compra-venta utilizadas por importantes fondos de cobertura). Son posibles muchos tipos de políticas, algunas de las cuales tendrán mejor desempeño que otras; nos enfocamos en estas como ejemplos ilustrativos. Existe un arte en el diseño de políticas que corre paralelo al arte de diseñar modelos estadísticos para la estimación.

## Evaluación de políticas

Indicamos anteriormente que podemos evaluar una política simulándola usando

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

donde $\omega$ se utiliza para representar una trayectoria muestral de realizaciones de cualquiera que sea la variable aleatoria exógena utilizada en el modelo. La Tabla 2.2 ilustra una serie de trayectorias muestrales de precios. Por ejemplo, imaginemos que estamos usando la política de "vender-bajo" con $\theta^{sell-low} = \Doll 42$. Ahora consideremos probarla en la trayectoria muestral $\omega^5$. El resultado sería

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

ya que $\Doll 41.53$ es el primer precio que cae por debajo de $\Doll 42$. Si ninguno de los precios cae por debajo de nuestro punto de venta, entonces todas nuestras políticas están diseñadas para vender al final.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th></th><th>$t=1$</th><th>$t=2$</th><th>$t=3$</th><th>$t=4$</th><th>$t=5$</th><th>$t=6$</th><th>$t=7$</th><th>$t=8$</th></tr></thead>
<tbody>
<tr><td>$\omega^n$</td><td>$p_1$</td><td>$p_2$</td><td>$p_3$</td><td>$p_4$</td><td>$p_5$</td><td>$p_6$</td><td>$p_7$</td><td>$p_8$</td></tr>
<tr><td>$\omega^1$</td><td>42.67</td><td>45.53</td><td>47.07</td><td>47.56</td><td>47.80</td><td>48.43</td><td>46.93</td><td>46.57</td></tr>
<tr><td>$\omega^2$</td><td>46.35</td><td>43.15</td><td>42.51</td><td>40.51</td><td>41.50</td><td>41.00</td><td>39.16</td><td>41.11</td></tr>
<tr><td>$\omega^3$</td><td>43.17</td><td>45.16</td><td>45.37</td><td>44.30</td><td>45.35</td><td>47.23</td><td>47.35</td><td>46.30</td></tr>
<tr><td>$\omega^4$</td><td>45.24</td><td>45.67</td><td>46.18</td><td>46.22</td><td>45.69</td><td>44.24</td><td>43.77</td><td>43.57</td></tr>
<tr><td>$\omega^5$</td><td>47.68</td><td>46.32</td><td>46.14</td><td>41.53</td><td>44.84</td><td>45.17</td><td>44.92</td><td>46.09</td></tr>
<tr><td>$\omega^6$</td><td>47.83</td><td>44.70</td><td>43.05</td><td>43.77</td><td>42.61</td><td>44.32</td><td>44.16</td><td>45.29</td></tr>
<tr><td>$\omega^7$</td><td>45.11</td><td>43.67</td><td>43.14</td><td>44.78</td><td>43.12</td><td>42.36</td><td>41.60</td><td>40.83</td></tr>
<tr><td>$\omega^8$</td><td>46.78</td><td>44.98</td><td>44.53</td><td>45.42</td><td>46.43</td><td>47.67</td><td>43.68</td><td>49.03</td></tr>
<tr><td>$\omega^9$</td><td>43.16</td><td>44.57</td><td>45.99</td><td>47.38</td><td>45.51</td><td>46.27</td><td>46.02</td><td>45.09</td></tr>
<tr><td>$\omega^{10}$</td><td>46.57</td><td>45.01</td><td>46.73</td><td>42.08</td><td>47.40</td><td>49.14</td><td>49.03</td><td>48.74</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabla 2.2.</span> Ilustración de un conjunto de trayectorias de precios.</p>
</div>

Luego podemos evaluar cada política (tanto la clase de política como los parámetros de esa clase) realizando simulaciones repetidas y tomando un promedio. Escribimos esto como

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

A veces necesitamos expresar un intervalo de confianza, ya que $\Fbar^\pi$ no es más que una estimación estadística. Primero calcularíamos una estimación de la varianza de nuestra variable aleatoria $\Fhat^\pi$, lo cual hacemos usando

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

Luego obtenemos nuestra estimación de la varianza de nuestro promedio $\Fbar^\pi$ usando

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

A partir de esto, podemos construir un intervalo de confianza para comparar dos políticas que podríamos llamar $\pi^A$ y $\pi^B$. Sea $\mu^\pi$ el desempeño verdadero de la política $\pi$, donde $\Fbar^\pi$ es nuestra estimación estadística de $\mu^\pi$. Nos gustaría obtener un intervalo de confianza para la diferencia $\mu^{\pi^A} - \mu^{\pi^B}$. Nuestra mejor estimación de esta diferencia es $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$. La varianza de esta diferencia es

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

donde asumimos que las estimaciones $\Fbar^{\pi^A}$ y $\Fbar^{\pi^B}$ son independientes, lo que significa que cada política se está probando en una muestra aleatoria diferente de precios. Cuando este es el caso, calcularíamos nuestro intervalo de confianza usando

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

donde $z_\alpha$ es el valor de $z$ tal que una variable aleatoria normalmente distribuida $Z$ es mayor que $z$ con probabilidad $\alpha$. Por ejemplo, $z_{.05} = 1.645$, lo cual significa $Prob[Z \geq 1.645] = .05$.

Un mejor enfoque es usar las mismas muestras para evaluar cada política. Por ejemplo, podríamos probar cada política en la misma trayectoria muestral $\omega$ elegida de la Tabla 2.2. Probando nuestras políticas de esta manera, obtendríamos $\Fhat^{\pi^A}(\omega)$ y $\Fhat^{\pi^B}(\omega)$ (usando el mismo conjunto de precios $p_t(\omega)$), y luego calcularíamos la diferencia

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

Ahora calculamos la diferencia promedio

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

y la varianza

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

Nótese que la varianza $(\delta \sigmabar^{A-B})^2$ será menor que la varianza cuando se usan muestras independientes. El intervalo de confianza para la diferencia sería entonces

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

Calcular intervalos de confianza puede ser útil al comparar diferentes clases de políticas. Alternativamente, podríamos estar comparando el desempeño de dos diseños físicos (por ejemplo, la velocidad de dos máquinas o las ubicaciones de una instalación). La elección de la política corre estrechamente paralela a cualquier decisión de diseño de un sistema.

## Extensiones

### Procesos de precios de series de tiempo

Imaginemos que queremos un proceso de precios algo más realista que capture la autocorrelación a través del tiempo. Podríamos proponer que

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

donde todavía asumimos que el ruido aleatorio $\varepsilon_t$ es independiente (e idénticamente distribuido) a través del tiempo. También vamos a asumir por el momento que conocemos los coeficientes $\eta = (\eta_0, \eta_1, \eta_2)$.

Este modelo de precios requiere un cambio sutil en nuestro modelo, específicamente en la variable de estado. Vamos a reemplazar nuestra antigua ecuación de transición para los precios, $\eqref{eq:assetsellingP}$, con nuestro nuevo modelo de series de tiempo dado en $\eqref{eq:assetsellingpricetimeseries}$. Para calcular $p_{t+1}$, ya no basta con conocer $p_t$, ahora también necesitamos conocer $p_{t-1}$ y $p_{t-2}$. Nuestra variable de estado ahora estaría dada por

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

Para las políticas que hemos considerado anteriormente, esto no complica mucho nuestro modelo. Más adelante, vamos a introducir políticas donde las variables adicionales representan una complicación importante.

### Proceso de precios de series de tiempo con aprendizaje

Ahora asumamos que nuestro proceso de precios de series de tiempo está dado por

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

donde $\varepsilon \sim N(0, 4^2)$ y donde $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ es nuestra *estimación* de $\eta$ dado lo que sabemos en el momento $t$ (en la sección anterior, asumimos que $\theta$ era conocido).

Existen fórmulas sencillas que rigen la actualización de $\etabar_t$ a $\etabar_{t+1}$ dadas nuestras estimaciones $\etabar_t$ y la observación del siguiente precio $p_{t+1}$.

Primero dejemos que

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

sea nuestra estimación de $p_{t+1}$ dado lo que sabemos en el momento $t$. El error en esta estimación está dado por

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

Ahora dejemos que el vector $\phi_t$ sea el vector de variables explicativas en nuestro proceso de precios, el cual está dado por

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

A continuación definimos la matriz $2 \times 2$ $M_t$, que se actualiza recursivamente usando

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

donde $\gamma_t$ es un escalar calculado usando

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

Ahora podemos actualizar $\etabar_t$ usando

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

El Ejercicio 6 profundizará en estas ecuaciones.

### Cesta de activos

Otra variante surge cuando estamos considerando una cesta de activos. Sea $p_{ti}$ el precio del activo $i$. Asumamos por el momento que cada precio evoluciona de acuerdo con el proceso básico

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

Podríamos asumir que los términos de ruido $\varepsilon_{t+1,i}$ son independientes entre los activos $i\in\Ical$, pero un modelo más realista sería asumir que los precios de diferentes activos están correlacionados. Sea $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ la covarianza de los precios aleatorios $p_{t+1,i}$ y $p_{t+1,j}$ para los activos $i$ y $j$ dado lo que sabemos en el momento $t$. Asumamos por el momento que conocemos la matriz de covarianza $\Sigma$, quizás usando un conjunto de datos históricos para estimarla (pero manteniéndola fija una vez estimada).

Podemos usar la matriz de covarianza para generar realizaciones muestrales de precios correlacionados usando una técnica llamada descomposición de Cholesky. Procede creando lo que llamamos la "raíz cuadrada" de la matriz de covarianza $\Sigma$, la cual almacenamos en una matriz triangular inferior $L$. En python, usando el paquete NumPy, usaríamos el comando de python

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

La matriz $L$ nos permite obtener la matriz $\Sigma$ usando $\Sigma = L^T L$.

Ahora dejemos que $Z$ sea un vector de variables aleatorias, una para cada activo, donde $Z_i \sim N(0,1)$ (prácticamente todos los lenguajes de programación tienen rutinas para crear muestras aleatorias a partir de distribuciones normales con media 0, varianza 1). Sean $p_t$, $p_{t+1}$ y $Z$ vectores columna (dimensionados por el número de activos). Primero creamos una muestra $\hat Z$ muestreando de $N(0,1)$ $\vert \Ical\vert $ veces. Nuestra muestra de precios $p_{t+1}$ está entonces dada por

$$
p_{t+1} = p_t + L \hat{Z}.
$$

Para este problema, nuestra variable de estado está dada por $S_t = (R_t,p_t)$ donde $R_t = (R_{ti})\_{i\in\Ical}$ captura cuántas acciones de cada activo poseemos, mientras que $p_t$ es nuestro vector actual de precios. La matriz de covarianza $\Sigma$ no está en la variable de estado porque asumimos que es estática (lo que significa que la ponemos en $S_0$). La respuesta cambia si actualizáramos la matriz de covarianza con cada nueva observación, en cuyo caso escribiríamos la matriz de covarianza como $\Sigma_t$ para capturar su dependencia del tiempo. Dado que ahora varía dinámicamente, la variable de estado sería $S_t = (R_t, p_t, \Sigma_t)$.

## ¿Qué aprendimos?

Usamos este problema para ilustrar diferentes tipos de políticas PFA:

- Usamos un problema simple de venta de un activo para ilustrar un problema de decisión secuencial con tanto un estado físico (si estamos manteniendo un activo, o cuánto), como el precio al que podríamos venderlo en el momento $t$.
- Mostramos cómo modelar la incertidumbre e introdujimos la noción de una trayectoria muestral $\omega$ para el proceso de información exógena $W_1, \ldots, W_T$.
- Ilustramos varias políticas simples en la clase PFA.
- Mostramos cómo simular una política.
- Introdujimos algo de complejidad en el proceso de precios (donde el precio $p_{t+1}$ depende del historial reciente de precios), y la situación donde el precio de venta depende de una cesta de activos, que es un proceso de información multidimensional más complejo. Nótese que esto no introduce ninguna complejidad significativa aparte de modelar el proceso. Crea una variable de estado de mucha mayor dimensión, pero eso no representa una forma significativa de complejidad para el problema de diseñar o evaluar políticas (esto no es cierto para todas las clases de políticas).
- Mostramos cómo actualizar un modelo lineal del proceso de precios.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>Escribimos la función de transición como $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.
  <ol type="a">
    <li>¿Por qué escribimos la información exógena como $W_{t+1}$ en lugar de $W_t$?</li>
    <li>¿En qué momento estaríamos calculando $S_{t+1}$ usando esta ecuación?</li>
  </ol>
</li>
<li>¿Cuál es la diferencia entre $p_t$ y $p_t(\omega)$?</li>
<li>Al probar diferentes políticas, ¿cambia la estructura de la función de transición?</li>
<li>La función objetivo en la ecuación $\eqref{eq:deterministicobjassetselling}$ está escrita para una versión determinista del problema. Si resolvemos este problema de optimización, ¿depende la decisión $x_t$ en el momento $t$ de los precios $p_{t'}$ para $t' > t$?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>Usando los precios de la Tabla 2.2, use la política de que venderá cuando el precio caiga por debajo de ＄44.00. Calcule la función objetivo $\Fhat(\omega^n)$ para $n=1,\ldots, 10$. Calcule el precio de venta promedio y su varianza.</li>
<li>Las preguntas a continuación lo guían a través de los pasos para modelar la venta de un activo (digamos, una sola acción de una empresa).
  <ol type="a">
    <li>Asuma que está simulando sus precios usando datos de un modelo matemático dado por $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$, donde $\varepsilon \sim N(0, 6^2)$.

    No conocemos el valor de $\eta = (\eta_0, \eta_1)$, pero nuestra creencia sobre el verdadero valor de $\eta$ es que es normal multivariada, con $\eta \sim MVN({\bar \eta}, \Sigma)$ donde

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    Asuma que la matriz de covarianza $\Sigma_t$ está dada por

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    donde $\Sigma_{tij} = Cov(\eta_i,\eta_j)$ para $i,j \in (0,1)$. Asuma que en el momento $t$, $p_t = 20$, $p_{t-1} = 24$ y observamos $p_{t+1} = 18.2$.

Utilizando las ecuaciones de la sección sobre el proceso de precios en serie de tiempo con aprendizaje, ¿cuáles son las estimaciones actualizadas de $\etabar_{t+1}$ y $\Sigma_{t+1}$? Proporcione la ecuación de actualización y calcule $\etabar_{t+1}$ y $\Sigma_{t+1}$ numéricamente.</li>
    <li>¿Cuál es la variable de estado para este problema? Proporcione la lista de variables. Note que puede que tenga que agregar variables a medida que avanza en el ejercicio (no cuenta con toda la información en este punto). Asegúrese de incluir toda la información que necesita para actualizar $\etabar_{t+1}$ a partir de $\etabar_t$. ¿Cuántas dimensiones tiene su variable de estado (esto es lo mismo que preguntar cuántas variables hay en $S_t$)?</li>
    <li>Nuestro operador toma decisiones de negociación basándose en un promedio móvil de 7 días de los precios. Suponga que estamos en el día $t$, y el promedio móvil de 7 días se calcula usando

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    El operador venderá un activo si $p_t < \pbar_t - \theta^{sell}$. Escriba la regla de decisión como una política $X^\pi(S_t\vert \theta^{sell})$ que devuelve 1 si vendemos el activo y 0 en caso contrario.</li>
    <li>¿Cuál es la información exógena?</li>
    <li>Escriba las ecuaciones de transición. Necesita una ecuación para cada elemento de $S_t$.</li>
    <li>Escriba la función objetivo (y recuerde usar un operador de esperanza para cada variable aleatoria como se describe en las instrucciones). Asegúrese de especificar sobre qué está optimizando dado la clase de política especificada en la parte (c). Suponga que está entrenando su política con datos históricos en un entorno fuera de línea (offline).</li>
  </ol>
</li>
<li>Necesita ejecutar una simulación de precios de electricidad, que son notoriamente de colas pesadas. Recopila los datos que se muestran en la tabla a continuación.

<div class="book-table-wrap">
<table class="book-table is-narrow">
<thead><tr><th>Tiempo</th><th>Precio</th></tr></thead>
<tbody>
<tr><td>1</td><td>20</td></tr>
<tr><td>2</td><td>32</td></tr>
<tr><td>3</td><td>26</td></tr>
<tr><td>4</td><td>180</td></tr>
<tr><td>5</td><td>30</td></tr>
<tr><td>6</td><td>45</td></tr>
<tr><td>7</td><td>18</td></tr>
<tr><td>8</td><td>120</td></tr>
<tr><td>9</td><td>57</td></tr>
<tr><td>10</td><td>15</td></tr>
</tbody>
</table>
</div>

  <ol type="a">
    <li>Use los datos de la tabla para producir una función de distribución acumulada. Necesitará graficar la función de distribución acumulada, que se parece a una función escalonada con cinco escalones.</li>
    <li>Ahora observa tres realizaciones de precios: 25, 18, 160. Use la función de distribución acumulada de (a) para crear tres realizaciones de una variable aleatoria uniformemente distribuida entre 0 y 1 (llame a esta variable aleatoria $U$).</li>
    <li>Ahora use estas observaciones de $U$ para crear tres observaciones de una variable aleatoria $Z$ que está normalmente distribuida con media 0, varianza 1. Asegúrese de que su método para generar estas variables aleatorias sea claro. [Pista: use la función de distribución acumulada de una variable aleatoria normal (0,1) tal como usó la función de distribución acumulada que creó en la parte (a) para crear variables aleatorias uniformes en la parte (b).]</li>
    <li>Suponga que usó este método para crear una secuencia de variables aleatorias normales (0,1) para ajustar un modelo lineal de la forma $Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$ donde $\varepsilon_{t+1}$ está normalmente distribuida con media 0 y varianza 1 (sabemos esto porque estamos simulando variables aleatorias normales (0,1)). Comenzando con $t=1$ y $Z_0 = 0.5$ y $Z_1 = -0.3$, genere $Z_2, Z_3, Z_4$ suponiendo que $\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$. Luego, use su distribución acumulada de la parte (a) para generar observaciones de $P_2, P_3$ y $P_4$.</li>
  </ol>
</li>
</ol>

**Preguntas de programación**

Estos ejercicios utilizan el módulo de Python *AssetSelling* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Nuestra política básica de venta "high-low" venía dada por

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Además del módulo *AssetSelling*, también necesitará descargar la hoja de cálculo "Chapter2_asset_selling_policy" de [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements), que proporciona los parámetros que debe usar el módulo de python.
  <ol type="a">
    <li>Simule la política durante 200 periodos de tiempo usando los parámetros:

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>Realice una búsqueda del mejor valor de $\theta^{min}$ y $\theta^{max}$ fijando $\theta^{max} = 13$, y luego buscando en incrementos de 1 el mejor $\theta^{min}$. Luego, fije ese valor de $\theta^{min}$ y realice una búsqueda similar para $\theta^{max}$ (imponga la restricción de que $\theta^{max} = \theta^{min}+2$).</li>
  </ol>
</li>
<li>Considere una política que entiende que el precio del activo podría estar aumentando, lo que significa que los límites estáticos de compra-venta podrían no ser efectivos. Suponga que pronosticamos el precio para el tiempo $t+1$ usando el modelo de serie de tiempo ajustado

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

Vamos a usar $\pbar_t$ como pronóstico de $p_{t+1}$ dado lo que sabemos en el tiempo $t$.
  <ol type="a">
    <li>¿Cuál es la variable de estado para este problema? Si los precios se discretizan a la décima más cercana, y se supone que los precios varían entre 0 y 100, ¿cuál es el tamaño del espacio de estados?</li>
    <li>Suponga que introducimos la política

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    En esta versión de la política, estamos buscando desviaciones repentinas del precio esperado. Grafique la función objetivo (contribución) frente a $\theta$. Comente su gráfico. Note que, aunque el espacio de estados es bastante grande, no hay ningún cambio en la complejidad de encontrar la mejor política dentro de esta clase.

    (Pista: necesitaría cambiar la variable de estado, cambiar la política high-low y crear un bucle externo sobre diferentes valores de $\theta$ en el módulo *DriverScript*. Se le anima a experimentar con su código y elegir sus propios rangos de valores. Incluya cuánto tiempo tardó en ejecutar su código con la elección de valores que hizo.)</li>
  </ol>
</li>
<li>(Continuación del ejercicio 9) Imagine que nuestra acción sigue un patrón estacional, lo que sugiere que nuestras señales de compra-venta deberían depender del tiempo. Esto significa que necesitamos reemplazar $\theta$ con $\theta_t$. Analice cómo esto complicaría nuestro proceso de búsqueda de políticas.</li>
<li>(Continuación del ejercicio 9) Podríamos pensar a continuación que nuestra señal de compra-venta debería depender del precio. Por ejemplo, si los precios son más altos, podríamos considerar que buscamos una desviación mayor con respecto a $\pbar_t$ en la ecuación $\eqref{eq:assetsellingpolicytimeseries}$ que si los precios fueran más bajos. Esto significa que reemplazaríamos el vector constante $\theta$ por una función $\theta(\pbar_t)$.
  <ol type="a">
    <li>Describa una representación de tabla de consulta (lookup table) de $\theta(\pbar_t)$, y dibuje una gráfica que represente cómo cree que podría verse esta función. Esto requeriría discretizar $\pbar_t$ en, digamos, 10 rangos. ¿Cómo complica esto el problema de buscar políticas?</li>
    <li>Sugiera una forma paramétrica para $\theta(\pbar_t)$ que capture su intuición de que $\theta$ debería ser mayor si $\pbar_t$ es mayor. ¿Sobre qué parámetros tiene que buscar ahora?</li>
  </ol>
</li>
</ol>
{% endraw %}