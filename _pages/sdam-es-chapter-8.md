---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 8: Almacenamiento de energía I"
permalink: /sdam/es/chapter-8/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 46e5d45993dd1cd0
---

{% raw %}

## Descripción general del capítulo

Este capítulo considera lo que inicialmente parece ser un problema de inventario bastante simple que surge al almacenar energía que podemos comprar de la red o vender a la red, la cual presenta precios altamente estocásticos. En contraste con los primeros seis capítulos, utilizamos un conjunto mucho más rico de modelos para describir estos precios estocásticos, lo cual comienza a insinuar la complejidad que podemos encontrar al modelar la incertidumbre. Ofrecemos un recorrido por diferentes modelos para procesos de precios, incluyendo modelos clásicos de series de tiempo, modelos de difusión con saltos (para capturar picos), distribuciones cuantílicas y, finalmente, un híbrido que combina distribuciones cuantílicas con distribuciones normales estándar, abriendo la puerta al uso de métodos que dependen de la normalidad.

Luego describimos una serie de políticas, comenzando con una política básica de "comprar barato, vender caro" (una forma de aproximación de función de política) antes de pasar a varios métodos basados en aproximar la ecuación de Bellman, que vimos por primera vez en el [Capítulo 5](/sdam/es/chapter-5/). Comenzamos con una descripción básica de la ecuación de Bellman (que es computacionalmente inviable para casi todos los problemas), y luego ofrecemos un recorrido por variaciones conocidas como programación dinámica aproximada (ADP) hacia atrás, ADP hacia adelante, y una estrategia híbrida que usa ADP hacia adelante combinada con ajuste de parámetros.

## Narrativa

Nueva Jersey está buscando desarrollar 3,500 megavatios (MW) de generación de energía eólica marina. Un desafío es que el viento (y especialmente el viento marino) puede ser altamente variable. El efecto de esta variabilidad en la red eléctrica se ve magnificado por la propiedad de que la energía eólica (en rangos intermedios) aumenta con el cubo de la velocidad del viento. Esta variabilidad se muestra en la Figura 8.1.

<figure class="book-figure">
  <img src="/assets/images/sdam/windpower.png" alt="Energía de cinco niveles de capacidad de generación eólica." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.1.</span> Energía de cinco niveles de capacidad de generación eólica.</figcaption>
</figure>

La energía eólica se ha vuelto popular en regiones donde el viento es abundante, como el medio oeste de Estados Unidos, las regiones costeras de Europa, el noreste de Brasil, y las regiones del norte de China (por mencionar solo algunas). A veces las comunidades (y las empresas) han invertido en renovables (eólica o solar) para ayudar a reducir su huella de carbono y minimizar su dependencia de la red.

Sin embargo, es bastante raro que estos proyectos permitan a una comunidad eliminar la red de su cartera. La práctica común es dejar que la fuente renovable (eólica o solar) venda directamente a la red, mientras que una empresa puede comprar de la red. Esto puede ser útil como cobertura, ya que la empresa ganará mucho dinero durante los picos de precios (los precios pueden saltar de ＄20 por megavatio-hora (mwh) a ＄300 por mwh o más) que compensa el costo de comprar energía durante esos períodos.

La principal dificultad con las renovables es manejar la variabilidad. Si bien una solución es simplemente inyectar cualquier energía de una fuente renovable a la red y usar la capacidad de la red para manejar esta variabilidad, ha habido un interés considerable en usar almacenamiento (en particular, almacenamiento en baterías) para suavizar los picos y valles. Además de suavizar la variabilidad en la fuente renovable, también ha habido interés en usar baterías para aprovechar los picos de precios, comprando energía cuando es barata (los precios pueden incluso volverse negativos) y vendiéndola de vuelta cuando son altos. Aprovechar la variabilidad en los precios de la energía en la red para comprar cuando los precios son bajos y vender cuando son altos se conoce como arbitraje de baterías.

<figure class="book-figure">
  <img src="/assets/images/sdam/storagegrid.jpg" alt="Sistema de red a almacenamiento para estabilización de energía y arbitraje de baterías." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.2.</span> Sistema de red a almacenamiento para estabilización de energía y arbitraje de baterías.</figcaption>
</figure>

Vamos a usar la configuración mostrada en la Figura 8.2 para ilustrar varios problemas de modelado y algorítmicos en el almacenamiento de energía. Este problema proporcionará información sobre prácticamente cualquier problema de inventario/almacenamiento, incluyendo:

- Mantener efectivo en fondos mutuos – Un banco tiene que determinar cuánto de su capital de inversión mantener en efectivo para satisfacer solicitudes de reembolso, versus invertir el dinero en préstamos, acciones y bonos.
- Los minoristas (tanto en línea como tiendas físicas) tienen que gestionar inventarios de cientos de miles de productos.
- Los concesionarios de automóviles tienen que decidir cuántos autos mantener para satisfacer la demanda de los clientes.
- Las firmas de consultoría tienen que decidir cuántos empleados mantener en plantilla para satisfacer la demanda variable de diferentes proyectos de consultoría.

El almacenamiento de energía es una forma particularmente rica de problema de inventario. Si bien no vamos a considerar todas las variaciones posibles (que son interminables), nuestro problema exhibirá las siguientes características:

- Los precios de electricidad en la red pueden ser altamente volátiles. A principios de la década de 2000, los precios típicos de energía rondaban los ＄20-＄25 por mwh, pero a menudo alcanzaban picos de más de ＄300, y podían exceder los ＄1000, típicamente durante eventos climáticos extremos.
- La energía eólica puede pronosticarse, aunque no muy bien. Están disponibles pronósticos continuos para actualizar estas estimaciones.
- La energía solar exhibe tres tipos de variabilidad: el proceso altamente predecible del ciclo diurno de la salida y puesta del sol, la presencia de días muy soleados o muy nublados (estos típicamente pueden predecirse con un día o más de anticipación), y la variabilidad de nubes puntuales que son difíciles de predecir incluso una hora antes, pero que pueden crear severos picos de energía en la red.
- La demanda de energía es variable, pero relativamente predecible, ya que depende principalmente de la temperatura (y, en menor medida, de la humedad).
- La energía puede comprarse de o venderse a la red a los precios actuales de la red. De manera similar, la energía de la fuente renovable puede usarse para satisfacer la carga actual (demanda de energía), almacenarse, o venderse de vuelta a la red (dependiendo de la configuración).
- Hay una pérdida de aproximadamente 5 a 10 por ciento en la conversión de energía de CA (tal como llega a través de la red) a CD (requerida para almacenar energía en la batería).

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Deseamos minimizar el precio esperado que pagamos por la electricidad comprada de la red.
- **Decisiones:** La cantidad de energía que compramos en cada período de tiempo de la red, o vendemos de vuelta a la red.
- **Incertidumbres:** El precio de la electricidad en cada período de tiempo.

## Modelo básico

Usaremos una secuencia de variaciones de este problema para ilustrar diferentes problemas de modelado, comenzando con un sistema básico de usar una batería para comprar de y vender a la red para aprovechar la volatilidad de los precios. Para esta aplicación, avanzaremos en incrementos de tiempo de 5 minutos, ya que esta es la frecuencia con la que se actualizan los precios en la red (este incremento de tiempo varía dependiendo del operador de la red).

### Variables de estado

Para nuestro modelo básico, solo necesitamos hacer seguimiento de dos variables: $R_t$, la cantidad de energía (medida en megavatios-hora, o mwh) almacenada en la batería en el tiempo $t$; y $p_t$, el precio de la energía en la red. Nuestra variable de estado es entonces

$$
S_t = (R_t, p_t).
$$

La variable de estado rápidamente se vuelve más compleja a medida que agregamos diferentes elementos al modelo. Por ejemplo, la variable de estado para representar los precios depende de cómo modelemos el proceso de precios, tal como se describe en la función de transición (ver más abajo).

### Variables de decisión

Nuestra única decisión es si comprar de o vender a la red: $x_t$, la cantidad de energía comprada de ($x_t > 0$) o vendida a ($x_t < 0$) la red.

Cuando transferimos energía hacia o desde la batería, vamos a asumir que solo obtenemos una fracción $\eta$ en la transferencia, lo que implica una pérdida de $1-\eta$. Por simplicidad, vamos a asumir que esta pérdida es la misma independientemente de si estamos cargando o descargando la batería.

La decisión está limitada por la capacidad de la batería, lo que significa que tenemos que observar las restricciones

$$
x_t \leq \frac{1}{\eta} (R^{max} - R_t), \qquad x_t \geq -\eta R_t,
$$

donde la primera restricción se aplica cuando estamos comprando de la red ($x_t > 0$) mientras que la segunda restricción se aplica cuando estamos vendiendo a la red ($x_t < 0$).

Como siempre, asumimos que las decisiones se toman con una política $X^\pi(S_t)$, que se determinará más adelante.

### Información exógena

En nuestro modelo básico, la única información exógena es el cambio en los precios. Podemos asumir que el precio en cada período de tiempo se revela, sin ningún modelo para predecir el precio basado en precios pasados. En este caso, nuestra información exógena $W_t$ sería

$$
W_{t+1} = p_{t+1}.
$$

Alternativamente, podemos asumir que observamos el cambio de precio $\phat_t = p_t - p_{t-1}$, en cuyo caso escribiríamos

$$
W_{t+1} = \phat_{t+1}.
$$

### Función de transición

La evolución de las variables de estado está dada por

$$
\begin{align}
R_{t+1} &= \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases} \label{eq:energytransition1}\\
p_{t+1} &= p_t + \phat_{t+1}. \label{eq:energytransition2}
\end{align}
$$

Este estilo de modelar el proceso de precios "observando" el cambio en el precio nos ayuda al escribir la función de transición. En la práctica, típicamente estaríamos observando $p_{t+1}$ directamente (en lugar del cambio), en cuyo caso no hay necesidad de una ecuación de transición explícita. Estas dos ecuaciones conforman nuestra función de transición $S_{t+1} = S^M(S_t,x_t,W_{t+1})$.

Más adelante, encontraremos útil modelar el estado posterior a la decisión $S^x_t$, que es el estado justo después de tomar una decisión $x_t$, pero antes de que llegue nueva información. El estado de recurso posterior a la decisión es

$$
R^x_t = \begin{cases} R_t + \eta x_t & x_t \geq 0, \\ R_t + \dfrac{x_t}{\eta} & x_t < 0. \end{cases}
$$

Debido a que la variable de almacenamiento evoluciona de manera determinista, la transición al siguiente estado previo a la decisión es simplemente

$$
R_{t+1} = R^x_t.
$$

El precio $p_t$, por otro lado, no se ve afectado por la decisión, por lo que el precio posterior a la decisión sería simplemente

$$
p^x_t = p_t.
$$

Esto significa que el estado posterior a la decisión es

$$
S^x_t = (R^x_t, p_t).
$$

### Función objetivo

En cualquier período, la cantidad de dinero que ganamos o perdemos está dada por

$$
C(S_t,x_t) = -p_t x_t.
$$

Nuestra función objetivo es entonces el problema canónico dado por

$$
\max_\pi \E \sum_{t=0}^T -p_t X^\pi(S_t),
$$

donde $S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$ está dado por las ecuaciones $\eqref{eq:energytransition1}$ y $\eqref{eq:energytransition2}$. También necesitamos especificar el estado inicial $S_0$ (es decir, $R_0$ y $p_0$) y tener un método para generar $W_1, W_2, \ldots$, que describimos a continuación.

## Modelando la incertidumbre

En nuestro problema de venta de activos en el [Capítulo 2](/sdam/es/chapter-2/), asumimos que podíamos modelar los precios según

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

donde luego asumimos que $\varepsilon_{t+1}$ estaba normalmente distribuido con media 0 y alguna varianza conocida. La Figura 8.3 muestra los precios de la red, conocidos como "precios marginales locacionales" (o LMPs en la terminología de la comunidad energética) a lo largo de un año, lo cual ilustra la tremenda volatilidad que exhiben los precios en la red. Esta volatilidad surge porque hay aumentos repentinos en la carga (o pérdidas en la energía) que pueden crear escaseces de corto plazo. Dado que la demanda es inelástica (se supone que la red debe satisfacer el 100 por ciento de la carga), los precios pueden saltar por un factor de 20 a 50 durante períodos cortos (los precios se actualizan en incrementos de 5 minutos).

<figure class="book-figure">
  <img src="/assets/images/sdam/pjmlmp.png" alt="Precios marginales locacionales para la red PJM (en intervalos de 5 minutos) para 2010." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 8.3.</span> Precios marginales locacionales para la red PJM (en intervalos de 5 minutos) para 2010.</figcaption>
</figure>

Existen varios métodos para modelar los precios de la electricidad. A continuación vamos a describir cuatro que se han utilizado para este problema.

### Modelos de series de tiempo

La literatura de series de tiempo es bastante rica, así que solo vamos a ilustrar un modelo básico que representa el precio $p_{t+1}$ como una función del historial reciente de precios. Para ilustrar, vamos a usar los últimos tres períodos de tiempo, lo que significa que escribiríamos nuestro modelo como

$$
\begin{align}
p_{t+1} &= \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}, \label{eq:energytimeseriesmodel}\\
        &= \thetabar^T_t \phi_t + \varepsilon_{t+1}, \nonumber
\end{align}
$$

donde

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \\ p_{t-2} \end{pmatrix}
$$

es nuestro vector de precios. Asumimos que el ruido $\varepsilon \sim N(0,\sigma^2\_\epsilon)$ para un $\sigma^2\_\epsilon$ dado.

El vector de coeficientes $\thetabar_t = (\thetabar_{t0},\thetabar_{t1},\thetabar_{t2})^T$ puede estimarse de manera recursiva. Supongamos que comenzamos con una estimación inicial $\thetabar_0$ del vector de coeficientes. También vamos a necesitar una matriz de tres por tres $M_0$ que por ahora podemos asumir que es una matriz identidad escalada (proporcionamos una mejor idea más abajo).

La ecuación básica de actualización para $\thetabar_t$ está dada por

$$
\thetabar_{t+1} = \thetabar_t - H_t\phi_t \varepsilon_{t+1},
$$

El error $\hat{\varepsilon}\_t$ se calcula usando

$$
\varepsilon_{t+1} = \thetabar^T_{t}\phi_t - p_{t+1}.
$$

La matriz de tres por tres $H_t$ se calcula usando

$$
H_t=\frac{1}{\gamma_t}M_t,
$$

donde la matriz $M_t$ se calcula de manera recursiva usando

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}).
$$

La variable $\gamma_t$ es un escalar que se calcula usando

$$
\gamma_t = 1 + (\phi_t)^TM_{t-1}\phi_t.
$$

Estas ecuaciones necesitan estimaciones iniciales para $\thetabar_0$ y $M_0$. Una forma de hacerlo es recopilar algunos datos iniciales y luego resolver un problema de estimación estática. Suponga que observa $K$ precios. Sea $Y_0$ un vector columna de $K$ elementos de los precios observados $p_3, p_4, \ldots, p_{K+3-1}$ (tenemos que comenzar con el tercer precio debido a la necesidad de contar con los tres precios anteriores en nuestro modelo).

Luego sea $X_0$ una matriz con $K$ filas, donde cada fila consiste en $p_k, p_{k-1}, p_{k-2}$. Nuestra mejor estimación de $\thetabar$ está dada por las ecuaciones normales

$$
\thetabar_0 = [(X_0)^T X_0]^{-1} (X_0)^T Y_0.
$$

Finalmente sea $M_0 = [(X_0)^T X_0]^{-1}$, lo que muestra que la matriz $M_t$ es la estimación en el tiempo $t$ de $[(X_t)^T X_t]^{-1}$.

Existen familias enteras de modelos de series de tiempo que capturan la relación de las variables a lo largo del tiempo. Si aplicáramos estos métodos directamente a los datos de precios, los resultados serían bastante deficientes. Primero, los precios no se distribuyen normalmente. Segundo, aunque los precios pueden volverse negativos, esto es bastante raro. Sin embargo, una aplicación directa de este modelo probablemente produciría precios negativos si la varianza $\sigma^2\_\epsilon$ se calibrara con el alto ruido de este tipo de datos. Finalmente, el comportamiento de los saltos en los precios a lo largo del tiempo no sería realista.

### Difusión con saltos

Una crítica importante al modelo lineal anterior es que hace un mal trabajo al capturar los grandes picos que son familiares en el estudio de los precios de la electricidad. Una idea simple para superar esta limitación es usar lo que se conoce como *modelo de difusión con saltos*, donde agregamos otro término de ruido a la ecuación $\eqref{eq:energytimeseriesmodel}$ que nos da

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1} + \mathbb{I}_t \varepsilon^J_{t+1}.
$$

Aquí, la variable indicadora $\mathbb{I}\_t = 1$ con alguna probabilidad $p^{jump}$, y el ruido $\varepsilon^J_{t+1}$ se distribuye normalmente con media $\mu^{jump}$ (que típicamente es mucho mayor que cero) y varianza $(\sigma^{jump})^2$ que es bastante grande.

Debemos estimar la probabilidad de salto $p^{jump}$, y la media y varianza $(\mu^{jump}, (\sigma^{jump})^2)$. Esto se hace comenzando con un modelo básico donde $p^{jump} = 0$. Usamos este modelo básico para estimar $\sigma^2\_\epsilon$. Luego elegimos alguna tolerancia como tres desviaciones estándar (es decir, $3 \sigma_\epsilon$), y cualquier observación fuera de este rango se debe a una fuente diferente de ruido. Sea $p^{jump}$ la fracción de períodos de tiempo donde ocurren estas observaciones. Luego, calculamos la media y la desviación estándar de estas observaciones para obtener $(\mu^{jump}, (\sigma^{jump})^2)$.

No nos detenemos aquí. Después de extraer estas variaciones extremas de los datos, debemos volver a ajustar nuestro modelo lineal sin estas observaciones. La práctica estándar es repetir este proceso varias veces hasta que estas estimaciones dejen de cambiar.

Los modelos de difusión con saltos hacen un mejor trabajo al replicar las colas, pero aún depende del comportamiento de las colas de la distribución normal. Se puede obtener un mejor ajuste al reconocer que la varianza del ruido depende de la temperatura, y particularmente de las temperaturas extremas. Podríamos agrupar las temperaturas en tres rangos: por debajo del punto de congelación, por encima de los 90 grados F, y en el intermedio entre estos dos valores. Introducir la dependencia de la temperatura, aunque agrega otra variable al conjunto de variables de estado, sí introduce un grado adicional de complejidad (el efecto de esto depende de la clase de política).

### Distribuciones cuantílicas

Aunque puede ser posible ajustar otras distribuciones paramétricas, una estrategia poderosa es calcular numéricamente la distribución acumulada a partir de los datos, creando lo que a menudo se llama una *distribución cuantílica*. Para calcular esto, simplemente ordenamos los precios de menor a mayor. Denotamos esta secuencia ordenada como $\ptilde_t$, donde $\ptilde_{t-1} \leq \ptilde_t$. Sea $T = 105,210$ que es el número de períodos de 5 minutos en un año. El porcentaje de períodos de tiempo con un precio menor que $\ptilde_t$ es entonces $t/T$. Podemos crear una distribución acumulada usando

$$
F_P(\ptilde_t) = \frac{t}{T},
$$

lo cual se ilustra en la Figura 8.4.

<figure class="book-figure">
  <img src="/assets/images/sdam/cdfprices.png" alt="Distribución cuantílica de precios." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 8.4.</span> Distribución cuantílica de precios.</figcaption>
</figure>

Podemos crear una distribución continua $F_P(p)$ para cualquier $p$ encontrando el $\ptilde_t < p$ más grande y estableciendo que $F_P(p)$ sea igual a este valor, creando una función escalonada. La función $F_P(p)$ es una forma de distribución *no paramétrica*, ya que no estamos ajustando la distribución a ninguna forma paramétrica conocida. La buena noticia es que coincidirá perfectamente con los datos, lo que significa que representaremos con precisión las colas extremas que ocurren con los precios de la electricidad. La desventaja es que requerimos un buen conjunto de datos para crear estas distribuciones, y tenemos que conservar el conjunto de datos para calcular la distribución, en lugar de simplemente almacenar una pequeña cantidad de parámetros como haríamos si ajustáramos un modelo paramétrico para la distribución.

Podemos muestrear de esta distribución generando una variable aleatoria $U$ que se distribuye uniformemente entre 0 y 1. Digamos que generamos $U= 0.70$. Entonces queremos encontrar el precio $p^{.70}$ que corresponde a $F_P(p^{.70}) = 0.70$, como se ilustra en la Figura 8.4. Escribimos esto matemáticamente definiendo la función inversa $F^{-1}\_P(u)$ que devuelve el precio $p$ que produce $F_P(p) = u$. Podemos muestrear repetidamente de nuestra distribución de precios simplemente muestreando la variable aleatoria uniforme $U$ y luego observando un precio $p=F^{-1}\_P(U)$.

### Series de tiempo híbridas con datos transformados

Una estrategia poderosa es combinar el uso de distribuciones empíricas con métodos clásicos de series de tiempo. Comenzamos ajustando una distribución empírica a los datos de precios, lo que nos da la distribución acumulada $F_P(p)$. Ahora, sea $p_t$ un precio y calculemos $u_t = F_P(p_t)$, donde $0\leq u_t \leq 1$. A continuación, sea $\Phi(z)$ la distribución acumulada de una variable aleatoria normal estándar $Z \sim N(0,1)$, y sea $\Phi^{-1}(u)$ su inversa. Luego sea $z_t = \Phi^{-1}(u_t)$. El proceso de mapear $p_t \rightarrow u_t \rightarrow z_t$ se ilustra en la Figura 8.5.

<figure class="book-figure">
  <img src="/assets/images/sdam/normaltoanything.png" alt="Transformación de una distribución empírica a una distribución normal (y viceversa)." style="max-width: 550px;">
  <figcaption><span class="fig-num">Figura 8.5.</span> Transformación de una distribución empírica a una distribución normal (y viceversa).</figcaption>
</figure>

Podemos usar este método para transformar los precios $p_t$, altamente no normales, en la secuencia $z_t$ de valores que se distribuyen normalmente con media 0 y varianza 1, donde también podemos capturar correlaciones. Luego podemos realizar cualquier modelado de series de tiempo sobre la secuencia $z_t$. Después de esto, cualquier estimación proveniente de este modelo normalizado se puede transformar de vuelta a precios trazando la trayectoria en la Figura 8.5 en la dirección inversa: $u_t = \Phi(z_t)$, y luego $p_t = F^{-1}\_P(u_t)$.

Esta estrategia es muy efectiva al tratar con datos que no se distribuyen normalmente, y funciona mucho mejor que el modelo de difusión con saltos, que es popular en finanzas.

## Diseño de políticas

Vamos a ilustrar la resolución de este problema usando dos clases de políticas, más una híbrida:

- **Búsqueda de políticas** – Vamos a usar una política parametrizada simple de comprar-bajo, vender-alto. Esto pertenece a la clase de políticas PFA (aproximaciones de función de política).
- **Política de anticipación** – Usaremos la ecuación de Bellman para producir una aproximación de función de valor que aproxima el impacto de una decisión ahora sobre el futuro. Esto pertenece a la clase de políticas VFA (políticas basadas en aproximaciones de función de valor).
- **Política híbrida** – Finalmente, vamos a introducir una clase de política ajustable que comienza con una política basada en funciones de valor, y luego cambia a la búsqueda de políticas para ajustar aún más la política. Esto comenzará como una política VFA, pero luego transicionará a una aproximación de función de costo paramétrica (CFA) cuando usemos la búsqueda de políticas para ajustar los parámetros de lo que comenzó como la aproximación de función de valor.

Las políticas basadas en la ecuación de Bellman requieren calcular (o aproximar) el valor $V_{t+1}(S_{t+1})$ que resulta de estar en un estado $S_t$, tomar una decisión $x_t$, y luego observar información exógena aleatoria $W_{t+1}$. Vimos estos métodos por primera vez en el contexto de problemas de ruta más corta. Una diferencia significativa ahora es que el estado $S_{t+1}$ es aleatorio dado $S_t$ y $x_t$ (en el problema de ruta más corta, solo el costo $\chat_t$ era aleatorio). Además, nuestra variable de estado ahora tiene dos dimensiones continuas, en lugar de solo el nodo discreto.

Primero describimos la política de comprar-bajo, vender-alto, y luego introducimos tres métodos basados en la aproximación de la ecuación de Bellman:

- Programación dinámica hacia atrás clásica, que produce una política óptima.
- Programación dinámica aproximada hacia atrás.
- Programación dinámica aproximada hacia adelante.

Terminamos con una descripción de una política híbrida que combina aproximaciones de función de valor de la ecuación de Bellman con una forma de búsqueda de políticas.

### Comprar-bajo, vender-alto

Una política de comprar-bajo, vender-alto funciona bajo el principio simple de cargar la batería cuando el precio cae por debajo de un límite inferior, y vender cuando el precio sube por encima de un límite superior. La política se puede escribir como

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t \leq \theta^{buy}, \\ 0 & \text{if } \theta^{buy} < p_t < \theta^{sell}, \\ +1 & \text{if } p_t \geq \theta^{sell}. \end{cases}
$$

Ahora tenemos que ajustar $\theta = (\theta^{buy}, \theta^{sell})$. Evaluamos nuestra política siguiendo una trayectoria muestral de precios $p_t(\omega)$ (o podemos estar observando los cambios en los precios $\phat(\omega)$). Suponiendo que estamos generando trayectorias muestrales a partir de un modelo matemático, podemos generar trayectorias muestrales $\omega^1, \ldots, \omega^N$. Luego podemos simular el desempeño de la política sobre cada trayectoria muestral y tomar un promedio usando

$$
\Fbar^{low-high} = \frac{1}{N} \sum_{n=1}^N C\big(S_t(\omega^n),X^{low-high}(S_t(\omega^n)\vert \theta)\big).
$$

Ajustar $\theta$ requiere resolver el problema

$$
\begin{align}
\max_\theta \Fbar^{low-high}(\theta\vert S_0). \label{eq:buylowpolicysearch}
\end{align}
$$

Dado que $\theta$ tiene solo dos dimensiones, una estrategia es hacer una búsqueda de rejilla completa discretizando cada dimensión, y luego buscar sobre todos los valores posibles de las dos dimensiones. Una discretización común es dividir una región en incrementos del 5 por ciento. Incluyendo los límites, esto significa que tenemos que representar 21 valores de cada parámetro, creando una rejilla de tamaño 441 puntos, lo cual es manejable (aunque no trivial) para la mayoría de los problemas.

Observamos que una búsqueda de rejilla por fuerza bruta solo funciona si ejecutamos suficientes simulaciones $N$ de manera que la varianza en la estimación $\Fbar^\pi(\theta)$ sea relativamente pequeña. Sin embargo, contamos con métodos para realizar la búsqueda de $\theta$ incluso con estimaciones ruidosas del desempeño de la política, como se presenta en el [Capítulo 7](/sdam/es/chapter-7/).

Vamos a ver el problema de optimización dado por $\eqref{eq:buylowpolicysearch}$ repetidamente, ya que las políticas más simples siempre presentan parámetros ajustables. El problema $\eqref{eq:buylowpolicysearch}$ se puede resolver usando métodos basados en derivadas si somos capaces de calcular (o aproximar) las derivadas de $\Fbar^{low-high}(\theta\vert S_0)$ con respecto a $\theta$. Cuando esto no es posible, tenemos que usar métodos libres de derivadas, que es precisamente el problema que enfrentamos en el [Capítulo 2](/sdam/es/chapter-2/).

### Programación dinámica hacia atrás

La programación dinámica hacia atrás implica resolver directamente la ecuación de Bellman

$$
\begin{align}
V_t(s_t) = \max_{x_t} \left(C_t(s,x_t)+  \E\{V_{t+1}(S_{t+1})\vert S_t,x_t\} \right), \label{eq:energystoragebellman}
\end{align}
$$

donde $S_{t+1} = S^M(s_t,x_t,W_{t+1})$, y donde la esperanza es sobre la variable aleatoria $W_{t+1}$. Suponga que $W_{t+1}$ es discreta, tomando valores en $\Wcal = \lbrace w_1, w_2, \ldots, W_M\rbrace $, y represente la distribución de probabilidad usando

$$
f^W(w\vert s_t,x_t) = Prob[W_{t+1} = w\vert s_t,x_t].
$$

Escribimos la distribución como dependiente del estado $s_t$ y la decisión $x_t$, pero esto depende del problema. Por ejemplo, podríamos razonablemente suponer que el cambio en el precio $p_{t+1}-p_t$ depende del precio actual $p_t$ (si los precios son muy altos es más probable que caigan), lo cual sería una razón para condicionar sobre $s_t$. Incluso podríamos necesitar la dependencia de $x_t$ si comprar una gran cantidad de electricidad de la red eleva los precios.

Entonces podemos reescribir la ecuación $\eqref{eq:energystoragebellman}$ como

$$
V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right).
$$

Una implementación básica de la programación dinámica hacia atrás exhibe cuatro bucles:

1. El bucle que retrocede en el tiempo desde $T$ hasta el tiempo $0$.
2. El bucle sobre todos los estados posibles $s_t\in\Scal$ (más precisamente, este es el conjunto de valores posibles de la variable de estado $S_t$ en el tiempo $t$).
3. El bucle que se requeriría para buscar sobre todas las decisiones posibles $x_t$ con el fin de resolver el problema de maximización.
4. El bucle sobre todos los valores posibles de la variable aleatoria $W$ que se captura en la sumatoria requerida para calcular $V_t(s)$.

<div class="book-algorithm">
<p><strong>Programación dinámica hacia atrás</strong></p>
<p><strong>Paso 0. Inicialización:</strong> Inicialice la contribución terminal $V_{T+1}(S_{T+1})=0$ para todos los estados $S_{t+1}$.</p>
<p><strong>Paso 1.</strong> Hacer para $t=T, T-1, \ldots, 1, 0$:</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2.</strong> Para todos $s\in\Scal$, calcule</p>
<p style="margin-left: 1.5rem;">$$V_t(s_t) = \max_{x_t} \left(C_t(s_t,x_t)+  \sum_{w\in\Wcal} f^W(w\vert s_t,x_t)V_{t+1}(S^M(s_t,x_t,w)) \right)$$</p>
</div>

Es útil considerar el rango de valores que podría tomar cada ciclo. Para un problema de energía, podríamos optimizar un dispositivo de almacenamiento en incrementos horarios durante un día, lo que nos da 24 pasos de tiempo. Si usamos incrementos de tiempo de 5 minutos (algunos operadores de red actualizan los precios cada 5 minutos), entonces un horizonte de 24 horas implicaría 288 períodos de tiempo (multiplicar por siete si queremos planificar durante una semana). Si estamos haciendo regulación de frecuencia, entonces tenemos que tomar decisiones cada 2 segundos, lo que se traduce en 43,200 períodos de tiempo durante un día.

Nuestra variable de estado consiste en $S_t = (R_t,p_t)$, lo que significa que tenemos que reemplazar el ciclo sobre todos los estados, con ciclos anidados sobre todos los valores de $R_t$, y luego todos los valores de $p_t$. Dado que ambos son continuos, cada uno tendrá que ser discretizado. La variable de recurso $R_t$ tendría que dividirse en incrementos basados en cuánto podríamos cargar o descargar en un solo incremento de tiempo. Luego tenemos que discretizar el precio de la red $p_t$. Los precios de la red pueden llegar a ser tan bajos como -＄100, y tan altos como ＄10,000 (en casos extremos). Una estrategia razonable podría ser construir una distribución empírica, y luego representar los precios correspondientes a, digamos, cada incremento de dos por ciento de la distribución acumulada, dándonos 50 precios posibles.

El número de decisiones de carga-descarga podría ser tan pequeño como tres (cargar, descargar o no hacer nada), o mucho más grande si podemos cargar o descargar a diferentes tasas.

Finalmente, la distribución de probabilidad $f^W(w)$ sería la distribución de los cambios aleatorios en los precios, $\phat_{t+1}$. Nuevamente, recomendamos construir una distribución empírica de los cambios en $\phat_{t+1}$ y luego discretizar la distribución acumulada en incrementos de, digamos, dos por ciento.

Si tenemos una variable de estado bidimensional (como es el caso con nuestro modelo básico), entonces ya tenemos cinco ciclos (tiempo, las dos variables de estado, el operador máximo sobre $x$, y luego la sumatoria sobre resultados de $W$). Esto puede volverse costoso, y apenas hemos empezado. Ahora imagine que estamos usando el modelo de series de tiempo en la ecuación $\eqref{eq:energytimeseriesmodel}$, donde ahora tenemos que llevar registro de los precios $(p_t, p_{t-1}, p_{t-2})$. En este caso, nuestra variable de estado sería

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

En este caso, ahora tendríamos siete ciclos anidados. Aunque la complejidad depende de la discretización de las variables continuas, ejecutar este algoritmo de programación dinámica hacia atrás fácilmente podría requerir un año (o más).

Dado lo difícil que es usar la ecuación de Bellman, incluso para este problema relativamente simple, es sorprendente que este enfoque específico todavía se enseñe en las clases. Dada la complejidad, ha habido una extensa investigación sobre métodos que aproximan la ecuación de Bellman, que han sido agrupados bajo nombres como *programación dinámica aproximada* y *aprendizaje por refuerzo*. Vamos a describir dos estrategias para aproximar la ecuación de Bellman conocidas como ADP hacia atrás y ADP hacia adelante.

### Programación dinámica aproximada hacia atrás

Una poderosa estrategia algorítmica se conoce como "programación dinámica aproximada hacia atrás." Este enfoque procede exactamente como lo hicimos arriba, con una diferencia. En lugar de recorrer todos los estados, elegimos una muestra aleatoria $\Shat$. Luego calculamos el valor de estar en el estado $s\in\Shat$ tal como lo hicimos originalmente, y calculamos el valor correspondiente $\vhat$. Suponga que repetimos esto $N$ veces, y adquirimos un conjunto de datos $(\shat^n, \vhat^n), n=1, \ldots, N$. Luego usamos esto para ajustar un modelo estadístico, como el modelo lineal dado por:

$$
\begin{align}
\Vbar(s) = \theta_0 + \theta_1 \phi_1(s) + \theta_2 \phi_2(s) + \ldots + \theta_F \phi_F(s), \label{eq:energylinearvfa}
\end{align}
$$

donde $\phi_f(s), f=1, \ldots, F$ es un conjunto de características apropiadamente elegidas. Ejemplos de características podrían ser

$$
\begin{align*}
\phi_1(s) &= R_t, \\
\phi_2(s) &= R^2_t, \\
\phi_3(s) &= p_t, \\
\phi_4(s) &= p^2_t, \\
\phi_5(s) &= p_{t-1}, \\
\phi_6(s) &= p_{t-2}, \\
\phi_7(s) &= R_t p_t.
\end{align*}
$$

Note que con un término constante $\theta_0$, este modelo tiene solo ocho coeficientes por estimar. Muestrear unos cientos de estados debería ser más que suficiente para obtener una buena aproximación estadística. Esta metodología es relativamente insensible al número de variables de estado, y por supuesto no hay problema si alguna de las variables es continua.

Un desafío cuando usamos un modelo paramétrico como el modelo lineal anterior es que tenemos que especificar las características $\phi_f(S_t)$. A medida que las redes neuronales se hicieron populares, los investigadores comenzaron a usar este enfoque, incluyendo redes neuronales profundas que podrían requerir estimar millones de parámetros. La ventaja de este enfoque es que elimina la necesidad de especificar la estructura del modelo, pero el precio es que se necesitan muchas más observaciones. Las redes neuronales profundas ofrecen la propiedad atractiva de poder aproximar cualquier función, pero esto también significa que pueden modelar ruido. Las redes neuronales también luchan para replicar la estructura conocida del problema, como la monotonicidad (cuanto más grande es el inventario, más grande es el valor) o la convexidad.

Hemos encontrado que el ADP hacia atrás funciona excepcionalmente bien en un pequeño conjunto de problemas (vea *Reinforcement Learning and Stochastic Optimization*, Sección 15.4, para un resumen de comparaciones del ADP hacia atrás contra puntos de referencia), pero no hay garantías, y su desempeño claramente depende de elegir un conjunto efectivo de características. En una aplicación, redujimos un tiempo de ejecución de 30 días para un algoritmo estándar de MDP hacia atrás, a 20 minutos, con una solución que estaba dentro del 5 por ciento de la óptima (producida por el tiempo de ejecución de un mes). Pero de nuevo, no hay garantías de este desempeño.

### Programación dinámica aproximada hacia adelante

La programación dinámica aproximada hacia adelante funciona de una manera intuitiva. Imagine que comenzamos con una aproximación de función de valor $\Vbar^{x,n-1}\_t(S^x_t)$ alrededor del estado post-decisión $S^x_t$ que calculamos a partir de las primeras $n-1$ iteraciones de nuestro algoritmo. Introdujimos por primera vez la idea de estados post-decisión en el [Capítulo 1](/sdam/es/chapter-1/), pero este es el estado inmediatamente después de que tomamos una decisión, pero antes de que llegue nueva información.

Ahora, imagine que estamos en un estado particular $S^n_t$ durante la $n$-ésima iteración de nuestro algoritmo, siguiendo una trayectoria muestral $\omega^n$ que guía el muestreo a medida que avanzamos en el tiempo. Suponga que tenemos una función $S^{x,n}\_t = S^{M,x}(S^n_t,x)$ que nos lleva al estado post-decisión. Para nuestro problema de energía donde $S^n_t = (R^n_t,p^n_t)$, el estado post-decisión sería

$$
S^{x,n} = (R^n_t+x^n_t, p^n_t).
$$

Luego tomamos una decisión usando

$$
x^n_t = \argmax_x \big(C(S^n_t,x) + \Vbar^{x,n-1}_t(S^{x,n}) \big).
$$

Dado $S^n_t$ y nuestra decisión $x^n_t$, luego muestreamos $W_{t+1}(\omega^n)$ lo que se traduce en el cambio en los precios $\phat^n_{t+1}$. Luego simulamos nuestro camino hacia el siguiente estado

$$
S^n_{t+1} = (R^n_t+x^n_t, p^n_t + \phat^n_{t+1}(\omega)).
$$

Así, simplemente estamos simulando nuestro camino hacia adelante en el tiempo, lo que significa que no nos importa cuán compleja sea la variable de estado. Hay diferentes estrategias para luego actualizar la aproximación de la función de valor $\Vbar^{n-1}\_t$:

<div class="book-algorithm">
<p><strong>Programación dinámica aproximada hacia adelante</strong></p>
<p><strong>Paso 0. Inicialización:</strong> Inicialice $V^{\pi,0}_t,~t\in\Tcal$. Establezca $n = 1$. Inicialice $S^1_0$.</p>
<p><strong>Paso 1.</strong> Hacer para $n = 1, 2, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2.</strong> Hacer para $m = 1, 2, \ldots, M$:</p>
<p style="margin-left: 3rem;"><strong>Paso 3.</strong> Elija una trayectoria muestral $\omega^m$.</p>
<p style="margin-left: 3rem;"><strong>Paso 4.</strong> Inicialice $\vhat^m = 0$.</p>
<p style="margin-left: 3rem;"><strong>Paso 5.</strong> Hacer para $t = 0, 1, \ldots, T$:</p>
<p style="margin-left: 4.5rem;"><strong>Paso 5a.</strong> Resolver:</p>
<p style="margin-left: 4.5rem;">$$x^{n,m}_t = \argmax_{x_t\in\Xcal^{n,m}_t} \big(C_t(S^{n,m}_t,x_t) + V^{\pi,n-1}_t(S^{M,x}(S^{n,m}_t,x_t))\big)$$</p>
<p style="margin-left: 4.5rem;"><strong>Paso 5b.</strong> Calcular:</p>
<p style="margin-left: 4.5rem;">$$S^{x,n,m}_t = S^{M,x}(S^{n,m}_t,x^{n,m}_t), \qquad S^{n,m}_{t+1} = S^M(S^{x,n,m}_t,x^{n,m},W_{t+1}(\omega^m)).$$</p>
<p style="margin-left: 3rem;"><strong>Paso 6.</strong> Hacer para $t = T-1,\ldots, 0$:</p>
<p style="margin-left: 4.5rem;"><strong>Paso 6a.</strong> Acumule el costo de la trayectoria (con $\vhat^m_{T} = 0$):</p>
<p style="margin-left: 4.5rem;">$$\vhat^m_t = C_t(S^{n,m}_t,x^m_t) + \vhat^m_{t+1}$$</p>
<p style="margin-left: 4.5rem;"><strong>Paso 6b.</strong> Actualice el valor aproximado de la política que comienza en el tiempo $t$:</p>
<p style="margin-left: 4.5rem;">$$\Vbar^{n,m}_{t-1} \leftarrow U^V(\Vbar^{n,m-1}_{t-1}, S^{x,n,m}_{t-1}, \vhat^m_t)$$</p>
<p style="margin-left: 4.5rem;">donde típicamente usamos $\step_{m-1} = 1/m$.</p>
<p style="margin-left: 1.5rem;"><strong>Paso 7.</strong> Actualice la función de valor de la política $V^{\pi,n}_t(S^x_t) = \Vbar^{n,M}_t(S^x_t)$ para todo $t = 0, 1, \ldots, T$.</p>
<p><strong>Paso 8.</strong> Devuelva las funciones de valor $(V^{\pi,N}_t)_{t=1}^T$.</p>
</div>

Esto deja la actualización real en una función de actualización $U^V(\cdot)$ ya que esto depende de cómo estamos aproximando la función de valor.

La programación dinámica aproximada hacia adelante es atractiva porque escala a problemas de alta dimensión. En ningún momento estamos recorriendo todos los estados o resultados posibles. De hecho, incluso podemos manejar decisiones de alta dimensión $x$ si aproximamos la función de valor apropiadamente de manera que podamos aprovechar algoritmos poderosos. Sin embargo, el ADP hacia adelante (como con el ADP hacia atrás) posee pocas garantías de desempeño.

### Una política híbrida de búsqueda de políticas-VFA

Cualquiera que sea la forma en que elijamos aproximar la función de valor, nuestra política está dada por

$$
X^{VFA}(S_t) = \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t)\big).
$$

Simulamos la política hacia adelante, donde dejamos que $\omega^n$ represente una trayectoria muestral de la información exógena (es decir, el conjunto de cambios en los precios). Frecuentemente sucede que vamos a probar nuestra política con datos históricos, en cuyo caso solo hay una única trayectoria muestral. Sin embargo, si hemos desarrollado un modelo matemático de los precios incertidumbre, podemos crear una trayectoria muestral $\omega$ que usamos para aproximar el valor de una política (también podríamos crear múltiples trayectorias muestrales y tomar un promedio):

$$
\Fbar^{VFA}(\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega))\big).
$$

Esto significa que el método está bien adaptado para aproximar incluso problemas de alta dimensión que podrían surgir en logística.

Cuando estamos construyendo una aproximación de función de valor (que pertenece a la clase de políticas de anticipación), típicamente ya no tenemos un paso donde ajustamos la política. Sin embargo, esto no significa que no podamos intentarlo. Suponga que nuestra función de valor está dada por el modelo lineal en la ecuación $\eqref{eq:energylinearvfa}$. Ahora podemos escribir nuestra política usando

$$
X^{VFA}(S_t\vert \theta) = \argmax_x \left(C(S_t,x) + \sum_{f=1}^F \theta_f \phi_f(S_t)\right).
$$

Tiene sentido usar uno de nuestros algoritmos de ADP hacia atrás o hacia adelante para obtener una estimación inicial de $\theta$, pero como notamos anteriormente, no hay garantía de que la política resultante sea de alta calidad. Sin embargo, siempre podemos mejorarla usando esto como punto de partida,

$$
\Fhat^{VFA}(\theta,\omega\vert S_0) = \sum_{t=0}^T C\big(S_t(\omega),X^{VFA}(S_t(\omega)\vert \theta)\big).
$$

Ahora, solo tenemos que resolver el problema de búsqueda de política que podríamos plantear como

$$
\begin{align}
\max_\theta \Fbar^{VFA}(\theta,\omega\vert S_0).  \label{eq:optthetavfa}
\end{align}
$$

En nuestros ejemplos anteriores de búsqueda de política, $\theta$ era un escalar, lo que hace que este problema sea relativamente fácil. Ahora, $\theta$ es un vector que podría tener docenas de dimensiones. Vamos a volver a este problema más adelante.

### Algunas notas de precaución sobre ADP

Hemos usado este contexto de problema para proporcionar un recorrido relativamente profundo de métodos que se basan en la idea de aproximar el valor de estar en un estado. Esto se ha estudiado bajo términos como "programación dinámica aproximada" o "aprendizaje por refuerzo." Estos métodos han atraído considerable atención de las comunidades de investigación académica, pero en la práctica, los métodos no son fáciles. Los problemas de decisión secuencial están en todas partes, pero las aplicaciones exitosas en la práctica son relativamente raras.

Las aproximaciones de tabla de consulta, donde estimamos el valor para cada estado discreto (o discretizado), no escalan cuando la variable de estado tiene más de tres dimensiones. Usar estrategias de aproximación como nuestra aproximación lineal típicamente no funciona ya que estas aproximaciones tienen que ser globalmente precisas, dado que podemos visitar cualquier estado. Al mismo tiempo, las aproximaciones locales (que son formas de modelos no paramétricos) pueden tener dificultades porque la flexibilidad de las aproximaciones locales introduce inestabilidad.

Complicando el proceso está el hecho de que dependemos de nuestra función de valor aproximada para tomar decisiones, lo que crea un círculo vicioso. Nuestras aproximaciones iniciales no son muy buenas, y como resultado conducen a malas decisiones. Estas malas decisiones se usan luego para actualizar la aproximación de la función de valor, y a partir de ahí se puede ver la espiral descendente.

La idea de ajustar una aproximación de función de valor, como hicimos en la ecuación $\eqref{eq:optthetavfa}$, es prometedora porque optimiza directamente el desempeño de la política. Curiosamente, esta idea no es ampliamente utilizada. Solo señalamos que ajustar $\theta$ usando estas simulaciones no es fácil. Por lo tanto, instamos a la precaución a cualquier lector que decida probar estos enfoques.

## ¿Qué aprendimos?

- Revisamos un problema de inventario simple del [Capítulo 1](/sdam/es/chapter-1/), pero en el contexto del almacenamiento de energía, con variables tanto físicas como informativas.
- Describimos una variedad de modelos estocásticos para precios de electricidad para ilustrar la riqueza del modelado de incertidumbre.
- Describimos una gama de políticas: una PFA (comprar-bajo, vender-alto), una política VFA (basada en programación dinámica aproximada hacia atrás), así como programación dinámica aproximada hacia adelante.
- Finalmente, introducimos la idea de estimar un modelo lineal para una aproximación de función de valor utilizando las técnicas de programación dinámica aproximada, y luego realizar una búsqueda directa de políticas sobre los coeficientes del modelo lineal. Por lo tanto, esta es una política basada en VFA inicialmente, y luego se convierte en una forma de política CFA con una función objetivo parametrizada.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>Dada la naturaleza de colas pesadas de los precios de electricidad, ¿qué está mal con usar un modelo de series de tiempo?</li>
<li>Esboce brevemente cómo separamos los precios que caen dentro de variaciones normales (tres desviaciones estándar) de las observaciones más extremas.</li>
<li>Usar datos históricos para ajustar una distribución empírica debería darnos una distribución de probabilidad que coincida con la historia. ¿Qué otros errores podrían aún estar presentes en el modelo estocástico de precios?</li>
<li>Describa en palabras qué está logrando la transformación de los datos en la sección de series de tiempo híbridas.</li>
<li>La programación dinámica hacia atrás clásica rápidamente explota debido a la maldición de la dimensionalidad. Describa en palabras cómo la programación dinámica aproximada hacia atrás supera la maldición de la dimensionalidad. Por ejemplo, si duplicáramos el número de dimensiones en la variable de estado, describa cómo esto complica la ADP hacia atrás.</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Escriba los cinco elementos del modelo básico para el problema de almacenamiento de energía tal como se dan en el texto. Escriba la función objetivo suponiendo que la política es la política de comprar-bajo, vender-alto

$$
X^{low-high}(S_t\vert \theta) = \begin{cases} -1 & \text{if } p_t < \theta^{buy}, \\ 0 & \text{if } \theta^{buy} \leq p_t \leq \theta^{sell}, \\ +1 & \text{if } p_t > \theta^{sell}. \end{cases}
$$

Escriba la función objetivo en términos de buscar sobre los parámetros de la política. Además, escriba la esperanza en la función objetivo usando la forma anidada que refleja cada variable aleatoria.</li>
<li>En la sección sobre el modelado de la incertidumbre, introducimos un modelo de series de tiempo para precios dado por

$$
p_{t+1} = \thetabar_{t0} p_t + \thetabar_{t1} p_{t-1} + \thetabar_{t2} p_{t-2} + \varepsilon_{t+1}.
$$

El libro describe las ecuaciones de actualización para el vector de coeficientes $\thetabar_t = (\thetabar_{t0},\thetabar_{t1}, \thetabar_{t2})$. Recordando que el estado $S_t$ consiste en *toda* la información necesaria para modelar el sistema desde el tiempo $t$ en adelante, dé la variable de estado actualizada y la función de transición para manejar este proceso de precios.</li>
</ol>

**Preguntas de programación**

Estos ejercicios utilizan el módulo de Python *EnergyStorage_I* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>Usando el módulo de python ejecute una búsqueda en cuadrícula para el vector de parámetros $\theta = (\theta^{buy}, \theta^{sell})$ variando $\theta^{sell}$ en el rango de 1.0 a 100.0 en incrementos de ＄1 para los precios, y variando $\theta^{buy}$ en el rango de 1.0 a $\theta^{sell}$, también en incrementos de ＄1. Los precios serán precios históricos reales por hora para un período de 8 días.</li>
<li>Resuelva para una política óptima utilizando la estrategia de programación dinámica hacia atrás descrita anteriormente (el algoritmo ya ha sido implementado en el módulo de python). Suponga que el proceso de precios evoluciona de acuerdo con

$$
p_{t+1} = p_t + \varepsilon_{t+1},
$$

donde $\varepsilon_{t+1}$ sigue una distribución empírica basada en las diferencias de precios de los precios históricos reales.
  <ol type="a">
    <li>Ejecute el algoritmo donde los precios se discretizan en incrementos de ＄1, luego ＄0.50 y finalmente ＄0.25. Calcule el tamaño del espacio de estados para cada uno de los tres niveles de discretización, y grafique los tiempos de ejecución contra el tamaño del espacio de estados.</li>
    <li>Usando la función de valor óptima para la discretización de ＄1 y compare el desempeño con la mejor política de compra-venta que encontró en la parte (a).</li>
  </ol>
</li>
<li>Descargue la hoja de cálculo "Chapter8_electricity_prices" desde [tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements/). Use los datos en la pestaña "electricity prices" para las siguientes preguntas:
  <ol type="a">
    <li>Construya una distribución acumulativa empírica $F_P(p) = Prob[P \leq p]$ donde $P$ es un precio elegido aleatoriamente para una hora particular durante el período de una semana en el conjunto de datos.</li>
    <li>Sea $F^{-1}_P(u)$ la distribución acumulativa inversa, donde $u$ está entre 0 y 1. Encuentre el precio $p(u) = F^{-1}_P(u)$ correspondiente a $u = 0, 0.1, 0.2, \ldots, 0.9, 1.0$. Dando a cada uno de estos precios una probabilidad de 1/11, encuentre la distribución acumulativa, y compárela con la distribución acumulativa que creó en la parte (a). ¿Parecen coincidir?</li>
  </ol>
</li>
<li>Usando la hoja de cálculo "Chapter8_electricity_prices," ajuste un modelo de reversión a la media de la forma

$$
\begin{align}
p_{t+1} = p_t + \beta (\mubar_t - p_t) + \varepsilon_{t+1} \label{eq:priceexercise}
\end{align}
$$

donde

$$
\mubar_t = (1-\alpha)\mubar_{t-1} + \alpha p_t.
$$

Suponga $\alpha = 0.15$. Encuentre $\beta$ que minimiza

$$
G(\beta) = \sum_{t=0}^T \big(p_{t+1} - (p_t + \beta (\mubar^t-p_t))\big)^2.
$$

  <ol type="a">
    <li>Ajuste el modelo de reversión a la media realizando una simple búsqueda unidimensional (por ejemplo, pruebe valores entre 0 y 1 en incrementos de 0.1).</li>
    <li>Calcule la desviación estándar $\sigma$ de $\varepsilon$ a partir de su muestra (suponemos que la media es 0). Note que suponemos que hay una única desviación estándar constante, aunque permitimos que la media $\mubar_t$ varíe con el tiempo.</li>
    <li>Usando el valor de $\beta$ que encontró en (a), genere 10 trayectorias de muestra usando la ecuación $\eqref{eq:priceexercise}$ muestreando $\varepsilon_{t+1}$ de una distribución normal con media 0 y desviación estándar $\sigma$. Grafique las trayectorias de muestra, y compare el comportamiento de sus trayectorias de muestra con los precios históricos. ¿Parecen similares?</li>
  </ol>
</li>
<li>Ahora va a ajustar un modelo de difusión con saltos que está dado por

$$
p_{t+1} = p_t + \beta(\mubar_t - p_t) + \varepsilon_{t+1} + J_{t+1} \varepsilon_{t+1},
$$

donde $J_{t+1} = 1$ con alguna probabilidad de salto (que calculamos a continuación) y 0 en caso contrario, y $\varepsilon^J_{t+1}$ es el tamaño aleatorio del salto cuando ocurren.

Siga los pasos a continuación para ajustar el modelo de difusión con saltos y comparar los resultados con la historia.
  <ol type="a">
    <li>Usando el valor de $\beta$ del ejercicio 11, recorra los datos e identifique todos los puntos de datos que caen fuera del rango $[\mubar_t \pm 3 \sigma]$.</li>
    <li>Usando el mismo valor de $\beta$ que encontró en el ejercicio 11, ejecute la reversión a la media sobre los datos una segunda vez, pero esta vez incluya solo los puntos de datos que no fueron excluidos en la parte (a). Encuentre la nueva media y desviación estándar de $\sigma$ en los datos que no fueron excluidos.</li>
    <li>Repita (b) una vez más en los puntos de datos que fueron retenidos, excluyendo nuevamente los puntos de datos fuera del rango $\pm 3 \sigma$.</li>
    <li>Calcule la probabilidad de un salto como la fracción de puntos que fueron excluidos para cuando termine la parte (c) (a estas alturas ya ha ejecutado el proceso de exclusión de puntos de datos dos veces). Además, calcule la media y desviación estándar de los puntos que fueron excluidos.</li>
    <li>Ahora, ejecute 10 simulaciones de su modelo de difusión con saltos, usando la media y varianza finales para los puntos retenidos y excluidos, y donde muestree los saltos usando la probabilidad de difusión con saltos. Compare estas simulaciones con la historia, y discuta si las trayectorias de precios resultantes son más realistas que lo que encontró en el ejercicio 11, y compare las trayectorias de precios con la historia real.</li>
  </ol>
</li>
<li>Vamos a intentar de nuevo obtener un buen ajuste de los precios repitiendo partes de los ejercicios 11 y 12 usando precios transformados.
  <ol type="a">
    <li>Usando la distribución acumulativa del ejercicio 10, convierta cada uno de los precios en una variable aleatoria uniformemente distribuida usando la identidad $U_t = F_P(p_t)$.</li>
    <li>A continuación, convierta sus variables aleatorias uniformemente distribuidas $U_t$ en variables aleatorias normalmente distribuidas con media 0 y varianza 1 usando $Z_t = \Phi^{-1}(U_t)$ donde $\Phi(z)$ es la distribución acumulativa de la distribución normal estándar, y $\Phi^{-1}(U_t)$ es la inversa de esta distribución. Esto se captura mediante la función norm.s.inv(p) en Excel, que devuelve el valor $Z$ correspondiente a una probabilidad $p$ (que está dada por la variable $U_t$).</li>
    <li>Ahora tenemos que reajustar $\beta$ en la ecuación de reversión a la media del ejercicio 11. Esta vez, en lugar de usar el precio $p_t$, usamos la cantidad normalizada $Z_t$; por lo demás todo es igual (así que puede simplemente seguir el proceso cuando ajustó $\beta$ para los precios sin procesar).</li>
    <li>Ahora use su modelo de (c) (con el nuevo valor para $\beta$) para crear una trayectoria de muestra de valores $Z_t$. Luego, use $U_t = \text{norm.s.dist}(Z_t,1)$ para obtener la probabilidad de que $Z_t \leq z$ (que está uniformemente distribuida entre 0 y 1). Finalmente, mapee el valor $U_t$ de vuelta a un precio usando la distribución acumulativa que encontró en el ejercicio 11. Grafique una trayectoria de muestra (esto no es demasiado difícil si es competente en Excel; de otro modo, la parte más tediosa es este último paso).</li>
    <li>Compare el comportamiento de la trayectoria de muestra resultante con la distribución histórica. Note que la distribución de precios debería ser perfecta, pero la serie de precios aún puede no parecer un buen ajuste. ¿Qué errores podríamos seguir cometiendo?</li>
  </ol>
</li>
</ol>
{% endraw %}