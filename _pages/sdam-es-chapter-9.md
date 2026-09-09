---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 9: Almacenamiento de energía II"
permalink: /sdam/es/chapter-9/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: f45bf159515d3588
---

{% raw %}
<figure class="book-figure">
  <img src="/assets/images/sdam/renewablegridstorageload.jpg" alt="Energy system to serve a load (building) from a wind farm, the grid, and a battery storage device." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 9.1.</span> Energy system to serve a load (building) from a wind farm, the grid, and a battery storage device.</figcaption>
</figure>

## Panorama del capítulo

Este capítulo extiende el modelo presentado en el [Capítulo 8](/sdam/es/chapter-8/) comenzando con un problema de almacenamiento de energía más complejo que combina energía de dos fuentes (un parque eólico y la red eléctrica) para satisfacer una carga que depende del tiempo, ayudado por un dispositivo de almacenamiento. Una característica distintiva de este problema es que se nos proporciona un pronóstico de viento de 24 horas que se actualiza cada hora. Estos pronósticos pueden cambiar bastante con el tiempo, lo que introduce una nueva fuente de incertidumbre, que no es solo que los pronósticos sean imperfectos, sino que los propios pronósticos están cambiando.

Comenzamos explorando dos modelos para representar la incertidumbre en los pronósticos de viento. El primero es un método conocido como regresión de proceso gaussiano, útil para modelar procesos continuos como la cantidad de energía eólica que esperamos que se genere en las próximas 24 horas.

El segundo método utiliza una técnica poderosa, aunque sorprendentemente simple, basada en lo que se denominan "modelos de estado oculto" que nos permiten replicar una propiedad de los pronósticos conocida como *tiempos de cruce*. Estos se refieren a la cantidad de tiempo que un pronóstico permanece por encima, o por debajo, del valor real. Este es un comportamiento importante al modelar problemas de almacenamiento.

Para diseñar nuestra política adaptamos la técnica que introdujimos por primera vez en el [Capítulo 6](/sdam/es/chapter-6/), donde comenzamos con una política de anticipación determinista, y luego introdujimos parámetros para ayudarla a funcionar mejor con el tiempo. Para nuestro problema de energía, planificamos usando nuestra mejor estimación de la energía eólica pronosticada multiplicada por coeficientes que dependen de cuántas horas estamos pronosticando hacia el futuro. Esto nos da un modelo de optimización determinista con 24 parámetros que deben ser ajustados.

## Narrativa

Ahora vamos a resolver un problema de almacenamiento de energía algo más complejo, representado en la Figura 9.1. En contraste con nuestro sistema de almacenamiento anterior, que simplemente compraba y vendía energía de la red, ahora enfrentamos el problema de satisfacer una carga dependiente del tiempo para un edificio usando energía de un parque eólico y de la red, con un único dispositivo de almacenamiento de energía para ayudar a suavizar los distintos procesos.

Este problema también va a exhibir otra propiedad distintiva, y es que todos los procesos exógenos (viento, precios, cargas y temperatura) provienen de un proceso dinámico que varía con diferentes tipos de previsibilidad:

- Cargas – La carga (que es la demanda de energía) sigue un patrón bastante predecible que depende de la hora del día (un edificio necesita estar a una temperatura particular a las 8am cuando la gente empieza a llegar) así como de la temperatura.
- Temperatura – La temperatura es un proceso razonablemente predecible que depende de la hora del día y de la estación, pero también refleja condiciones climáticas locales que pueden pronosticarse con cierta precisión.
- Viento – Existen proveedores que ofrecen servicios de pronóstico de viento, aunque los pronósticos no son muy precisos y evolucionan con bastante rapidez incluso a lo largo del día (ver Figura 9.2).
- Precios – El precio de la electricidad en la red refleja la oferta y la demanda, donde el suministro de energía está diseñado para ajustarse rápidamente a la demanda. Sin embargo, las escaseces de corto plazo pueden producir picos donde los precios pueden subir de 10 a 100 veces el precio promedio. También puede haber períodos en los que la carga cae más rápido de lo que los generadores pueden reducirse, produciendo ocasionalmente un exceso de energía que se vende a precios muy bajos, incluso negativos.

<figure class="book-figure">
  <img src="/assets/images/sdam/windforecasts.png" alt="Evolution of forecasts of wind power over the course of a 24-hour period, updated each hour." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 9.2.</span> Evolución de los pronósticos de energía eólica a lo largo de un período de 24 horas, actualizados cada hora. La línea negra representa el valor real.</figcaption>
</figure>

Cada uno de estos procesos puede pronosticarse con distintos grados de precisión. Pronosticar la energía eólica es lo menos preciso, y aunque el viento puede ser más fuerte durante la noche, los máximos y mínimos pueden ocurrir en cualquier momento del día o de la noche. Las cargas están altamente correlacionadas con la hora del día, en gran parte debido a la actividad humana, pero también debido a la temperatura. Nótese que las tardes calurosas pueden crear picos a mitad del día en verano debido al aire acondicionado, mientras que en invierno puede en realidad reducir la carga de calefacción (que puede ser cubierta por calefacción eléctrica). La temperatura también tiene un fuerte componente asociado a la hora del día debido a la salida y puesta del sol, aunque puede haber variaciones a medida que pasan los frentes climáticos.

Nuestro problema consiste en decidir cuánto comprar de la red (o vender de vuelta a la red) y cuánto almacenar en cada momento (estas decisiones podrían tomarse en incrementos de 5 minutos para algunos operadores de red). Necesitamos satisfacer la demanda de energía, pero por lo demás quisiéramos maximizar el ingreso que obtenemos al vender energía menos el costo de comprar la energía de la red o del parque eólico.

## Formulación del problema

Las respuestas a nuestras tres preguntas de formulación son:

- **Métricas:** Queremos maximizar la ganancia total esperada, que incluye el ingreso recibido por satisfacer la demanda, menos el costo de comprar energía de la red.
- **Decisiones:** Tenemos seis decisiones: el flujo de energía de la red al almacenamiento, el flujo de energía de la red a la carga, el flujo de energía del parque eólico al almacenamiento, el flujo de energía del parque eólico a la carga, el flujo de energía del almacenamiento a la red, y el flujo de energía del almacenamiento a la carga.
- **Incertidumbres:** Tenemos los siguientes procesos de información dinámica: la carga (la demanda de energía), la temperatura (que influye en la carga), la energía del parque eólico, el precio que recibimos por satisfacer la carga, y el costo de comprar energía de la red.

## Modelo básico

### Variables de estado

Comenzamos modelando la instantánea del sistema en el tiempo $t$, que incluye $R_t$, la cantidad de energía (en MWh) almacenada en la batería en el tiempo $t$; $L_t$, la carga (demanda) de energía en el tiempo $t$ (en MW); $\tau_t$, la temperatura en el tiempo $t$; $w_t$, la energía eólica en el tiempo $t$ (en MW); $p^{load}\_t$, la cantidad que se nos paga por MWh para satisfacer la carga del edificio en el tiempo $t$; y $c^{grid}\_t$, el costo de comprar energía de la red (este es el precio que se nos paga si vendemos de vuelta a la red).

Dado que el problema subyacente depende fuertemente del tiempo (debido a los ciclos diarios), vamos a necesitar usar pronósticos, tanto para modelar la dinámica del problema como para tomar decisiones que necesiten anticipar lo que podría suceder en el futuro. Asumimos que se nos proporciona un conjunto continuo de pronósticos como se ilustra para el viento en la Figura 9.2. Modelamos los pronósticos de carga ($L$), temperatura ($\tau$), viento ($w$), precios de mercado ($p$), y precios de la red ($G$) usando: $f^L_{tt'}$, el pronóstico de la carga $L_t$ (en MW) en el tiempo $t' > t$ dado lo que sabemos en el tiempo $t$; $f^\tau_{tt'}$, el pronóstico de la temperatura $\tau_t$ en el tiempo $t' > t$ dado lo que sabemos en el tiempo $t$; $f^w_{tt'}$, el pronóstico de la energía eólica $w_t$ (en MW) en el tiempo $t' > t$ dado lo que sabemos en el tiempo $t$; $f^p_{tt'}$, el pronóstico de los precios de mercado $p^{load}\_t$ (en ＄/MWh) en $t' > t$ dado lo que sabemos en el tiempo $t$; y $f^G_{tt'}$, el pronóstico de los precios de la red $c^{grid}\_t$ (en ＄/MWh) en $t' > t$ dado lo que sabemos en el tiempo $t$.

Todos los pronósticos son vectores sobre el horizonte $t, t+1, \ldots, t+H$ donde $H$ es un horizonte especificado (por ejemplo, 24 horas). Dejamos que $f^X_t$ sea el vector de pronósticos para $X \in \Xcal = \lbrace L, T, W, P, G\rbrace $.

Nuestra variable de estado es entonces

$$
S_t = (\underbrace{R_t}_{R_t}, \underbrace{(L_t, \tau_t, w_t, p^{load}_t, c^{grid}_t)}_{I_t}, \underbrace{(f^L_t, f^T_t, f^w_t, f^P_t, f^G_t )}_{B_t}).
$$

Aquí hemos agrupado el recurso controlable $R_t$ (nuestra variable de estado física), la instantánea de carga, temperatura, energía eólica y precio (que podríamos agrupar como variables de información $I_t$), y luego los pronósticos (que representan una forma de creencia $B_t$ sobre el futuro).

Rápidamente vemos que tenemos una variable de estado de dimensión relativamente alta. Si estamos planificando en incrementos de 5 minutos, un pronóstico continuo de 24 horas tendría 288 elementos. Esto anticipa el desafío que enfrenta cualquiera que quiera estimar el valor $V_t(S_t)$ de estar en el estado $S_t$.

### Variables de decisión

Las variables de decisión de nuestro sistema son ahora $x^{wr}\_t$, la cantidad de energía movida del parque eólico a la batería en el tiempo $t$; $x^{w\ell}\_t$, la cantidad de energía movida del parque eólico a la carga (el edificio) en el tiempo $t$; $x^{gr}\_t$, la cantidad de energía movida de la red a la batería en el tiempo $t$; $x^{rg}\_t$, la cantidad de energía movida de la batería a la red en el tiempo $t$; $x^{g\ell}\_t$, la cantidad de energía movida de la red a la carga en el tiempo $t$; $x^{r\ell}\_t$, la cantidad de energía movida de la batería a la carga en el tiempo $t$; y $x^{loss}\_t$, la carga no cubierta (conocida como "deslastre de carga").

Estas variables deben determinarse sujetas a las restricciones

$$
\begin{align}
x^{w\ell}_t + x^{g\ell}_t + \frac{1}{\eta} x^{r\ell}_t + x^{loss}_t &=  L_t, \label{eq:energysystem1}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta R_t, \label{eq:energysystem2}
\end{align}
$$

$$
\begin{align}
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} (R^{max} - R_t), \label{eq:energysystem3}\\
x^{rg}_t                                     &\leq  \eta R_t, \label{eq:energysystem3a}\\
x^{w\ell}_t +  x^{wr}_t                      &\leq  w_t, \label{eq:energysystem4}\\
x^{wr}_t + x^{gr}_t                          &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energysystem5}\\
x^{r\ell}_t + x^{rg}_t                       &\leq  \eta u^{discharge}, \label{eq:energysystem6}\\
x^{wr}_t, x^{w\ell}_t, x^{gr}_t, x^{rg}_t, x^{g\ell}_t, x^{r\ell}_t &\geq  0.  \label{eq:energysystem7}
\end{align}
$$

La ecuación $\eqref{eq:energysystem1}$ limita la energía para servir la carga (el edificio) a la cantidad de la carga (no podemos sobrecargar el edificio). La variable $x^{loss}$ captura la cantidad por la cual no hemos cubierto la carga. La restricción captura las pérdidas de conversión de la energía tomada de la batería. La ecuación $\eqref{eq:energysystem2}$ dice que no podemos mover más energía fuera de nuestro almacenamiento de batería que la que hay en la batería, ajustada por las pérdidas de conversión. La ecuación $\eqref{eq:energysystem3}$ limita entonces cuánta energía podemos mover hacia la batería a la cantidad de capacidad disponible, nuevamente ajustada por las pérdidas de conversión. La ecuación $\eqref{eq:energysystem3a}$ limita cuánta energía podemos mover del almacenamiento de vuelta a la red. La ecuación $\eqref{eq:energysystem4}$ limita la cantidad proveniente del parque eólico a lo que el parque eólico está generando en ese momento. Las ecuaciones $\eqref{eq:energysystem5}$–$\eqref{eq:energysystem6}$ limitan los flujos de entrada y salida de la batería a las tasas de carga y descarga. La ecuación $\eqref{eq:energysystem7}$ impone la no negatividad de cada variable.

### Información exógena

Nuestra primera fuente de información exógena es la diferencia entre el valor real y el valor pronosticado para cualquier proceso "$X$" donde

$$
X = (L, \tau, w, p^{load}, c^{grid}).
$$

Sea $X_t$ el proceso y $\varepsilon^X_{t+1}$ la diferencia entre los valores real y pronosticado. Entonces dejamos que

$$
\varepsilon^X_{t+1} = X_{t+1} - f^X_{t,t+1}.
$$

Podríamos modelar $\varepsilon^X_{t+1}$ usando muestras extraídas de datos históricos, o asumiendo que sigue alguna distribución supuesta.

La segunda fuente de información exógena es el cambio en los pronósticos a medida que avanzamos en el tiempo. Nuevamente dejamos que $f^X_t$ sea un vector de pronósticos para cada proceso de información $X$, donde $f^X_{tt}$ es el valor real en el tiempo $t$. Sea $\fhat^X_{t+1,t'}$ el cambio en el pronóstico para el tiempo $t'$ entre $t$ y $t+1$, de modo que

$$
\fhat^X_{t+1,t'} = f^X_{t+1,t'} - f^X_{tt'},~ t'=t, t+1, \ldots, t+H.
$$

Los cambios exógenos $\fhat^X_{t+1,t'}$ están correlacionados entre los períodos de tiempo $t'$. Si este no fuera el caso, entonces los pronósticos, al graficarse a lo largo del horizonte $t'=t, \ldots, t+H$, ya no exhibirían la suavidad que vemos en los pronósticos de viento en la Figura 9.2. Volvemos a la cuestión de modelar la incertidumbre en los pronósticos más adelante.

Esto significa que podemos escribir nuestra información exógena como

$$
W_{t+1,X} = (\varepsilon^X_{t+1}, \fhat^X_{t+1,t'}), t' > t,
$$

para $X$ igual a las diferentes variables (carga, temperatura, viento, precios de mercado y precios de la red).

### Función de transición

La evolución de la variable de estado del recurso está dada por

$$
\begin{align}
R_{t+1} = R_t + \eta (x^{wr}_t + x^{gr}_t) - \frac{1}{\eta} (x^{rg}_t + x^{r\ell}_t).\label{eq:energytransitionII1}
\end{align}
$$

Cada una de las variables $L_t$, $\tau_t$, $w_t$, $p^{load}\_t$, y $c^{grid}\_t$ evoluciona usando los pronósticos. Por ejemplo, escribiríamos la evolución de la carga $L_t$ usando

$$
\begin{align}
L_{t+1} = f^L_{t,t+1} + \varepsilon^L_{t+1}, \label{eq:energytransitionII2}
\end{align}
$$

Podríamos crear ecuaciones similares para $\tau_t$, $w_t$, $p^{load}\_t$, y $c^{grid}\_t$.

Escribimos la evolución de los pronósticos usando

$$
\begin{align}
f^X_{t+1,t'} = f^X_{tt'} + \fhat^X_{t+1,t'}, ~X\in\Xcal, ~t'=t+1, \ldots, t+1+H,  \label{eq:energytransitionII3}
\end{align}
$$

para $X=L, \tau, w, p^{load}$ y $c^{grid}$. La ecuación $\eqref{eq:energytransitionII3}$ se conoce en la literatura como el "modelo de martingala de evolución de pronósticos." El término "martingala" se refiere a nuestra suposición de que $f^X_{tt'}$ es un estimador insesgado de $f^X_{t+1,t'}$ ya que asumimos que las desviaciones aleatorias $\fhat^X_{t+1,t'}$ son, en promedio, cero.

Las ecuaciones $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ y $\eqref{eq:energytransitionII3}$ (para todos los pronósticos $X$) conforman la función de transición

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Función objetivo

Nuestra función de ganancia en el tiempo $t$ está dada por

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

donde el precio de mercado $p^{load}\_t$ y el precio de la red $c^{grid}\_t$ están contenidos en la variable de estado $S_t$. Nuestra función objetivo sigue siendo el problema canónico dado por

$$
\max_\pi \E \sum_{t=0}^T  C(S_t,X^\pi(S_t))
$$

Como antes, $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ que está dado por las ecuaciones $\eqref{eq:energytransitionII1}$, $\eqref{eq:energytransitionII2}$ y $\eqref{eq:energytransitionII3}$.

## Modelado de la incertidumbre

Describimos a continuación dos estilos para modelar la incertidumbre a lo largo del tiempo. Primero describimos un método para modelar las correlaciones en los errores de los pronósticos a lo largo del tiempo utilizando una técnica que a veces se denomina *regresión de proceso Gaussiano*. Este método garantiza que, a medida que avanzamos en el tiempo, un vector de pronósticos evolucione de manera natural.

Luego describimos un modelo de Markov de estado oculto que hemos encontrado que proporciona trayectorias de muestra excepcionalmente realistas para procesos estocásticos. Este modelo replica de cerca las distribuciones de error, pero también hace un muy buen trabajo capturando los *tiempos de cruce*, que es el tiempo que el proceso real (por ejemplo, la velocidad del viento) permanece por encima o por debajo de un punto de referencia como un pronóstico. Si podemos capturar adecuadamente el tiempo que un pronóstico está por encima o por debajo del valor real, entonces significa que estamos capturando las correlaciones a lo largo del tiempo.

Esta sección ilustrará varios métodos poderosos para el modelado estocástico que deberían estar en cualquier caja de herramientas para modelar la incertidumbre. El modelado estocástico puede ser técnicamente sofisticado, y esta sección refleja esto. Se advierte al lector que esta sección es mucho más compleja que nuestras otras secciones sobre modelado de la incertidumbre.

### Regresión de proceso Gaussiano para errores de pronóstico

La regresión de proceso Gaussiano (GPR, por sus siglas en inglés) es un método simple para generar secuencias correlacionadas de variables aleatorias normalmente distribuidas. GPR es particularmente útil cuando se intenta estimar una superficie continua, donde si un punto en la superficie es más alto de lo esperado, entonces significa que los puntos cercanos también serán más altos de lo esperado.

Sea $X_{t'}$ el resultado real de cualquiera de nuestros procesos exógenos (precios, cargas, temperatura, energía eólica) en el tiempo $t'$, y sea $f^X_{tt'}$ el pronóstico de $X_{t'}$ hecho en el tiempo $t < t'$. Es común asumir algún error $\varepsilon_{t'-t}$ que describe la diferencia entre $X_{t'}$ y el pronóstico $f^X_{tt'}$. Luego asumiríamos algún modelo para $\varepsilon^X_{t'-t}$ como

$$
\varepsilon^X_{t'-t} \sim N(0, (t'-t) \sigma^2_X).
$$

Vamos a adoptar un enfoque algo diferente asumiendo que la distribución en el cambio de un pronóstico $\fhat^X_{t+1,t'}$ se describe mediante

$$
\fhat^X_{t+1,t'} \sim N(0, \sigma^2_X).
$$

Luego asumimos que los cambios en los pronósticos $\fhat^X_{t+1,t'}$ están correlacionados entre los tiempos $t'$ con una función de covarianza

$$
\begin{align}
Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''}) = \sigma^2_X e^{-\beta\vert t''-t'\vert }. \label{eq:forecastcovariancefunction}
\end{align}
$$

La función de covarianza $Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''})$ en la ecuación $\eqref{eq:forecastcovariancefunction}$ captura la propiedad de que la covarianza a lo largo del tiempo exhibe correlaciones que disminuyen con la diferencia entre los dos puntos en el tiempo. Este modelo simple introduce el parámetro ajustable $\beta$ que debe estimarse a partir de datos, o posiblemente mediante juicio. Por ejemplo, podría ser posible graficar los valores de covarianza para diferentes valores de $\beta$ y elegir uno que parezca razonable.

Podemos usar esta función de covarianza para crear una matriz de covarianza $\Sigma^X$ con elemento $\Sigma^X_{t't''} = \sigma^2\_X e^{-\beta\vert t''-t'\vert }$. Hay una forma simple de crear una muestra correlacionada de cambios en los pronósticos utilizando un método llamado *descomposición de Cholesky*. Comienza creando lo que podríamos llamar la "raíz cuadrada" de la matriz de covarianza $\Sigma^X$ que almacenamos en una matriz triangular inferior $L$. En python, usando el paquete NumPy, usaríamos el comando de python

```
L = scipy.linalg.cholesky(Sigma_X, lower=True)
```

Notamos que $\Sigma^X = L^T L$, razón por la cual pensamos en $L$ como la raíz cuadrada de $\Sigma^X$.

A continuación, generamos una secuencia de variables aleatorias independientes $Z_{\tau}$ para $\tau =  1, \ldots, H$ que están normalmente distribuidas con media 0 y varianza 1. Ahora sea $Z=(Z_{t+1}, Z_{t+2}, \ldots, Z_{t+H})^T$ un vector columna compuesto por estas variables aleatorias normales estándar distribuidas de manera independiente. Podemos crear una muestra correlacionada de cambios en los pronósticos usando

$$
\begin{pmatrix} \fhat^X_{t+1,t+1} \\ \fhat^X_{t+1,t+2} \\ \vdots \\ \fhat^X_{t+1,t+H} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} + L Z.
$$

Esta fórmula nos da un conjunto muestreado de cambios en los pronósticos $\fhat^X_{t+1,t+1}, \ldots, \fhat^X_{t+1,t+H}$ que están correlacionados de acuerdo con nuestra función de decaimiento exponencial en la ecuación $\eqref{eq:forecastcovariancefunction}$. El resultado será un conjunto evolutivo de pronósticos donde la varianza en los errores de los pronósticos crece linealmente en el tiempo de acuerdo con

$$
Var(\varepsilon^X_{t'-t}) = (t'-t) \sigma^2_X.
$$

Los pronósticos evolutivos $f^X_{t,t'}, f^X_{t+1,t'}, \ldots$ exhibirán el comportamiento que vimos en nuestros pronósticos evolutivos de viento en la Figura 9.2.

### Modelo de Markov de estado oculto

Un desafío al desarrollar modelos estocásticos en energía es capturar una propiedad conocida como *tiempo de cruce*. Este es el tiempo que un proceso real (por ejemplo, precio o velocidad del viento) está por encima o por debajo de algún punto de referencia como un pronóstico. La Figura 9.3 ilustra un tiempo de cruce ascendente para un proceso de viento.

<figure class="book-figure">
  <img src="/assets/images/sdam/upcrossingtime.png" alt="Energía eólica pronosticada y real, ilustrando un tiempo de cruce ascendente." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 9.3.</span> Energía eólica pronosticada (negro) y real, ilustrando un período en el que el valor real está por encima del pronóstico. La duración de este período por encima se llama tiempo de cruce ascendente.</figcaption>
</figure>

Replicar los tiempos de cruce utilizando el modelado estándar de series temporales resultó infructuoso. Lo que sí funcionó fue el desarrollo de un modelo de Markov con una variable de estado oculta $S^C_t$ que se calibra para capturar la dinámica del proceso al moverse por encima o por debajo del punto de referencia. El proceso utiliza los siguientes pasos:

**Paso 1** – Comparando el proceso real con el punto de referencia, encontrar los tiempos en los que el proceso real se mueve por encima o por debajo del punto de referencia, y generar un conjunto de datos que capture si el proceso estuvo por encima (A) o por debajo (B) y durante cuánto tiempo. Agregar estos períodos en tres categorías (S/M/L) para corto/mediano/largo, y etiquetar cada segmento con A o B y S/M/L, creando seis estados. Estos se denominan "estados ocultos" porque, si bien sabremos en el tiempo $t$ si el proceso real está por encima o por debajo del punto de referencia, no sabremos si la duración es corta, mediana o larga hasta después de que el proceso cruce el punto de referencia.

**Paso 2** – Utilizando la secuencia histórica de $S^C_t$, calcular una matriz de transición en un paso $P^C[S^C_{t+1}\vert S^C_t]$, la probabilidad de que el proceso de cruce tome el valor $S^C_{t+1}$ dado que actualmente se encuentra en el estado $S^C_t$.

**Paso 3** – Agregar el proceso real (por ejemplo, la velocidad del viento) en, digamos, cinco categorías basadas en la distribución acumulada empírica. Sea $W^g_t$ la velocidad del viento agregada (un número del 1 al 5).

**Paso 4** – A partir del historial, calcular la distribución condicional de la velocidad del viento dado $W^g_t$ y $S^C_t$, $F^W[W_{t+1}\vert W^g_t, S^C_t]$, la distribución acumulada empírica de la velocidad del viento $W_{t+1}$ dado $W^g_t$ y $S^C_t$.

Utilizando la matriz de transición en un paso $P^C[S^C_{t+1}\vert S^C_t]$ y la distribución acumulada condicional $F^W[W_{t+1}\vert W^g_t, S^C_t]$, ahora podemos simular nuestro proceso estocástico simulando primero la variable de estado oculta $S^C_{t+1}$ dado $S^C_t$ (notar que solo hay 30 de estas). Luego, a partir de una velocidad del viento $W_t$, podemos encontrar la velocidad del viento agregada $W^g_t$, y luego muestrear la velocidad del viento real $W_{t+1}$ a partir de la distribución acumulada condicional $F^W[W_{t+1}\vert W^g_t, S^C_t]$.

Se ha comprobado que esta lógica reproduce con precisión tanto la distribución de errores (real vs. punto de referencia), como las distribuciones de tiempos de cruce ascendente y descendente en una variedad de conjuntos de datos que modelan tanto el viento como los precios de la red. La Figura 9.4 ilustra estas distribuciones en un conjunto de datos particular.

<figure class="book-figure">
  <img src="/assets/images/sdam/crossingtimedistributions.jpg" alt="Comparación de las distribuciones de error de pronóstico real vs. predicho, distribuciones de tiempo de cruce ascendente y distribuciones de tiempo de cruce descendente." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 9.4.</span> Comparación de las distribuciones de error de pronóstico real vs. predicho (arriba), distribuciones de tiempo de cruce ascendente (abajo a la izquierda) y distribuciones de tiempo de cruce descendente (abajo a la derecha).</figcaption>
</figure>

## Diseño de políticas

La complicación más grande de este problema es que los pronósticos son parte de la variable de estado, lo que nos permite modelar explícitamente la evolución continua del pronóstico. La dificultad es que esto hace que la variable de estado sea de alta dimensionalidad.

Los enfoques más comunes para manejar los pronósticos utilizan un modelo de anticipación que aproxima el futuro fijando el pronóstico. Las dos estrategias más populares son:

- Anticipación determinística con el pronóstico capturado en la formulación de la anticipación.
- Anticipación estocástica con variables latentes – Podemos usar el pronóstico para desarrollar un modelo de anticipación estocástica que luego resolvemos utilizando la programación dinámica clásica. En el modelo de anticipación, fijamos los pronósticos dentro del modelo, en lugar de modelar su evolución a lo largo del tiempo. Cuando ignoramos una variable en un modelo (incluido un modelo de anticipación), se le llama una *variable latente*.

Ambos métodos utilizan el pronóstico como una variable latente en el sentido de que no modelan la evolución del pronóstico dentro del modelo de anticipación. La dificultad con el modelo de anticipación estocástica es que es más difícil de resolver. Si estamos optimizando nuestro problema de almacenamiento de energía en incrementos de tiempo cortos (esto podría ser de 5 minutos, o incluso menos), entonces esto puede crear problemas para técnicas como la programación dinámica exacta o incluso la aproximada.

Por esta razón, la estrategia más popular para manejar problemas dependientes del tiempo con un pronóstico es resolver un modelo de anticipación determinística, tal como lo hicimos para nuestro problema de la ruta más corta dinámica. Describimos a continuación un modelo de este tipo, y luego presentamos una versión parametrizada que permite que el modelo determinístico maneje mejor la incertidumbre.

Nos detenemos para señalar que la planificación utilizando pronósticos continuos es bastante común en la gestión de operaciones. Curiosamente, los libros de texto casi uniformemente ignoran el modelado adecuado de los pronósticos continuos. Prácticamente todos los libros sobre planificación de inventario, por ejemplo, equiparan la variable de estado con el inventario. Solo un pequeño número reconoce que si los pronósticos se actualizan en cada período de tiempo, entonces tenemos que representar la información necesaria para actualizar los pronósticos en la variable de estado. Si ignoramos esta información, entonces estamos creando efectivamente un modelo de anticipación donde el pronóstico se mantiene constante.

### Anticipación determinística

Vamos a utilizar el mismo estilo de notación que presentamos por primera vez en el [Capítulo 6](/sdam/es/chapter-6/), donde distinguimos nuestro *modelo base*, que es el problema que estamos tratando de resolver, del *modelo de anticipación* que resolvemos como una forma de política para resolver el modelo base.

Recordemos que la formulación canónica de nuestro modelo base es

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))\vert S_0\right\},
$$

donde $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$, y donde tenemos un proceso de información exógena $(S_0, W_1, W_2, \ldots, W_T)$. Nótese que las variables $W_t$ pueden depender del estado $S_t$ y/o de la decisión $x_t$; si este es el caso, entonces la variable $W_{t+1}$ tiene que generarse sobre la marcha después de que conozcamos $S_t$ y $x_t$.

Vamos a crear una política formulando un modelo de anticipación determinística, donde todas las variables están etiquetadas con tildes, e indexadas tanto por el tiempo $t$ en el que estamos tomando nuestra decisión, como por el tiempo $t'$ que es la variable de tiempo dentro del modelo de anticipación. Así definiríamos $\xtilde_{tt'}$, la decisión en el tiempo $t'$ en el modelo de anticipación que se genera en el tiempo $t$; $\ctilde_{tt'}$, el coeficiente de costo para $\xtilde_{tt'}$; y $\Rtilde_{tt'}$, la energía en la batería en el tiempo $t'$ en el modelo de anticipación generado en el tiempo $t$.

Nótese que $x_t = \xtilde_{tt}$, $c_t = \ctilde_{tt}$ y así sucesivamente.

Creamos nuestra política de anticipación determinística $X^{DLA}\_t(S_t)$ como el siguiente programa lineal:

$$
\begin{align}
X^{DLA}_t(S_t) = \argmax_{x_t, (\xtilde_{tt'},t'=t+1, \ldots, t+H)} \left(C(S_t,x_t) + \sum_{t'=t+1}^{t+H} C(\Stilde_{tt'},\xtilde_{tt'})\right),  \label{eq:energydetlookahead0}
\end{align}
$$

donde

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

$$
C(\Stilde_{tt'},\xtilde_{tt'}) = (\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \eta \xtilde^{r\ell}_{tt'}) \ptilde^{load}_{tt'} - (\xtilde^{g\ell}_{tt'} + \xtilde^{gr}_{tt'})\ctilde^{grid}_{tt'}.
$$

Este problema debe resolverse sujeto a las restricciones $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$ para $x_t$, y las siguientes restricciones para $\xtilde_{tt'}$ para todo $t' = t+1, \ldots, t+H$:

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookahead1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}   &\leq  f^L_{tt'}, \label{eq:energydetlookahead2} \\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookahead3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookahead4}
\end{align}
$$

$$
\begin{align}
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookahead4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{wr}_{tt'}   &\leq  f^W_{tt'}, \label{eq:energydetlookahead5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} u^{charge}, \label{eq:energydetlookahead6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookahead7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookahead8}
\end{align}
$$

Estas ecuaciones reflejan las de las restricciones base $\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$, con el único cambio de que usamos variables de anticipación tales como $\xtilde_{tt'}$, $\Rtilde_{tt'}$, y pronósticos tales como $f^W_{tt'}$ en lugar del viento real $W_t$.

El modelo descrito por las ecuaciones $\eqref{eq:energydetlookahead0}$–$\eqref{eq:energydetlookahead8}$ es un programa lineal relativamente simple, para el cual ya hay paquetes disponibles en lenguajes como Matlab o python.

Las políticas de anticipación como $X^{DLA}\_t(S_t)$ se usan ampliamente en problemas dinámicos y variables en el tiempo como este. Deben resolverse de forma continua, tal como ilustramos primero para nuestro problema de la ruta más corta determinista. Por esta razón, a veces se les llama "procedimientos de horizonte deslizante" o "procedimientos de horizonte retráctil." Existe un campo completo conocido como "control predictivo basado en modelos" que se basa en estas políticas de anticipación.

Para aplicaciones como este problema de almacenamiento de energía, el uso de un modelo de anticipación determinista plantea la preocupación de que no estamos considerando las incertidumbres. Por ejemplo, podríamos querer almacenar energía adicional en la batería para protegernos de una caída súbita del viento o de un aumento repentino en los precios de la red. En la siguiente sección, describiremos cómo usar un modelo de anticipación determinista para manejar la incertidumbre.

### Anticipación parametrizada

Existe una forma muy simple de abordar el problema de que nuestra anticipación determinista no maneja la incertidumbre. Lo que necesitamos hacer es pensar en cómo podríamos modificar el modelo (o la solución) debido a la incertidumbre. Por ejemplo, podríamos querer pagar por almacenamiento adicional *en el futuro* para manejar variaciones inesperadas. Por supuesto, no podemos forzar al modelo a mantener energía almacenada justo ahora cuando podríamos necesitarla. También podríamos querer descontar pronósticos que no sean muy precisos.

Podemos introducir estos cambios reemplazando las restricciones $\eqref{eq:energydetlookahead1}$–$\eqref{eq:energydetlookahead8}$ con las siguientes

$$
\begin{align}
\Rtilde_{t,t'+1} -\Big(R_{tt'}+\eta (x^{wr}_{tt'} + x^{gr}_{tt'}) - \frac{1}{\eta} (x^{r\ell}_{tt'} + x^{rg}_{tt'})\Big) &= 0, \label{eq:energydetlookaheadmod1}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \frac{1}{\eta} \xtilde^{r\ell}_{tt'} + \xtilde^{loss}_{tt'}     &=     \theta^L_{t'-t} f^L_{tt'}, \label{eq:energydetlookaheadmod2}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta \Rtilde_{tt'}, \label{eq:energydetlookaheadmod3}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta} (R^{max} - \Rtilde_{tt'}), \label{eq:energydetlookaheadmod4}\\
\xtilde^{rg}_t                               &\leq  \eta \Rtilde_{tt'} \label{eq:energydetlookaheadmod4a}\\
\xtilde^{w\ell}_{tt'} + \xtilde^{w\ell}_{tt'}&\leq  \theta^W_{t'-t} f^W_{tt'}, \label{eq:energydetlookaheadmod5}\\
\xtilde^{wr}_{tt'} + \xtilde^{gr}_{tt'}      &\leq  \frac{1}{\eta}u^{charge}, \label{eq:energydetlookaheadmod6}\\
\xtilde^{r\ell}_{tt'} + \xtilde^{rg}_{tt'}   &\leq  \eta u^{discharge}, \label{eq:energydetlookaheadmod7}\\
\xtilde_{tt'}                                &\geq  0. \label{eq:energydetlookaheadmod8}
\end{align}
$$

Observe que hemos introducido parámetros para modificar el lado derecho de las restricciones $\eqref{eq:energydetlookaheadmod2}$ y $\eqref{eq:energydetlookaheadmod5}$, donde hemos introducido los coeficientes $\theta^L_{t'-t}$ y $\theta^W_{t'-t}$ para modificar los pronósticos de carga y viento, donde los coeficientes están indexados por cuántos períodos de tiempo estamos pronosticando hacia el futuro. Luego, modificamos la restricción $\eqref{eq:energydetlookaheadmod3}$ con la idea de que podríamos querer restringir nuestra capacidad de usar toda la energía en almacenamiento para mantener una reserva.

Sea $X^{DLA-P}(S_t\vert \theta)$ la política de anticipación que se resuelve sujeta a las restricciones parametrizadas $\eqref{eq:energydetlookaheadmod1}$–$\eqref{eq:energydetlookaheadmod8}$. Una vez que hemos decidido cómo introducir estas parametrizaciones (esto es el arte detrás de cualquier modelo paramétrico), queda el problema de encontrar el mejor valor para $\theta$. Este es el problema de búsqueda de parámetros que abordamos en el [Capítulo 7](/sdam/es/chapter-7/).

Calculamos la mejora relativa al usar una anticipación determinista parametrizada y optimizada, donde buscamos los mejores valores del vector $\theta=(\theta^L, \theta^W)$, frente a una política básica que fija estos parámetros en 1.0. En nuestros experimentos, fijamos $\theta^L_{t'-t} = 1$, y solo optimizamos el coeficiente del pronóstico de viento, $\theta^W_{t'-t}$.

Los resultados se muestran en la Figura 9.5, que muestran que mejoramos el desempeño en promedio en alrededor de un 30 por ciento. Lo importante es que esta mejora no viene acompañada de ninguna complejidad adicional al tomar decisiones en el campo. El único paso, que no hemos descrito aquí, es que debemos ajustar el vector de parámetros $\theta$. El proceso de optimizar $\theta$ es, desafortunadamente, no es fácil.

<figure class="book-figure">
  <img src="/assets/images/sdam/cfaenergyperformance.png" alt="Relative improvement of the deterministic lookahead with optimized theta versus using theta=1." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 9.5.</span> Mejora relativa de la anticipación determinista con $\theta_\tau$ optimizado frente al uso de $\theta_\tau = 1$.</figcaption>
</figure>

## ¿Qué aprendimos?

- En este capítulo introducimos un problema de almacenamiento de energía mucho más complejo con pronósticos continuos.
- Introducimos el "modelo de martingala de evolución de pronósticos" que asume que los pronósticos del futuro evolucionan con el tiempo, donde el cambio esperado en un pronóstico es cero (pero el cambio real es positivo o negativo).
- Luego describimos un modelo semi-Markov oculto que nos ayuda a replicar los "tiempos de cruce" que capturan el tiempo en que un pronóstico está por encima o por debajo del valor real.
- Introducimos una política de anticipación determinista, y luego una anticipación determinista parametrizada, donde introducimos coeficientes para cada pronóstico (otro ejemplo de un híbrido DLA/CFA).
- Mostramos que la política DLA/CFA ajustada supera a la anticipación determinista pura (sin ajustar) en alrededor de un 30 por ciento.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Qué se entiende por el "modelo de martingala de evolución de pronósticos"?</li>
<li>El pronóstico completo en el tiempo $t$ para cada cantidad, como la carga $L_t$, $f^L_{tt'}$ para $t'=t, \ldots, t+H$, están en la variable de estado. ¿Por qué? [Pista: mire las ecuaciones de transición para los pronósticos y las variables que están pronosticando.]</li>
<li>¿Cuál es la diferencia entre las variables $x_t$, $t=0, \ldots, T$, y las variables $\xtilde_{tt'}$ para $t' = t, \ldots, t+H$?</li>
<li>¿Qué es un "tiempo de cruce"?</li>
<li>¿Qué es una "descomposición de Cholesky" y para qué se usa?</li>
<li>¿Qué estado está oculto en el modelo de Markov de estado oculto de la energía eólica? Explique por qué está oculto.</li>
<li>¿A qué clase de política pertenece la política de anticipación parametrizada anterior? ¿Qué función objetivo se usa para encontrar el mejor conjunto de parámetros de ajuste?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Intente diseñar una política parametrizada para tomar decisiones bajo las condiciones del problema en este capítulo. Puede usar cualquier cosa en forma de reglas o funciones parametrizadas. La única limitación es que no se le permite optimizar sobre nada (es decir, no puede usar un $\argmax_x$ dentro de su política).</li>
<li>Nuestra anticipación parametrizada se limitó a introducir coeficientes frente a los pronósticos. También puede introducir ajustes aditivos, como evitar que el dispositivo de almacenamiento de energía se acerque demasiado a su capacidad (esto le permitiría almacenar una ráfaga de viento que exceda el pronóstico) o que se acerque demasiado a cero (en caso de que tenga una caída en el viento). Sugiera una parametrización alternativa y argumente por qué su estructura podría agregar valor.</li>
</ol>
{% endraw %}