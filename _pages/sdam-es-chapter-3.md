---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 3: Planificación de mercado adaptativa"
permalink: /sdam/es/chapter-3/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 8d040048b8e28e95
---

{% raw %}
## Descripción general del capítulo

Usamos el término "planificación adaptativa de mercado" para describir lo que se conoce ampliamente como el problema del vendedor de periódicos, en el que debemos elegir una cantidad de un recurso para vender (los "periódicos") con el fin de satisfacer una demanda de mercado desconocida, donde los recursos no utilizados se descartan al final del período de venta. Esto significa que los diferentes períodos de tiempo no están físicamente conectados.

Comenzamos usando este problema para ilustrar un algoritmo básico de gradiente estocástico que se sabe que converge a la cantidad óptima. Este enfoque supera el problema de que si asignamos muy poco, no observamos la demanda real, sino solamente cuánto podemos vender (lo cual está limitado por el inventario que pusimos disponible).

Los algoritmos de gradiente estocástico se usan ampliamente al optimizar bajo incertidumbre, cuando tenemos acceso a un gradiente. Los algoritmos de gradiente estocástico se introdujeron por primera vez en 1951 y disfrutan de propiedades de convergencia bien entendidas. Sin embargo, es menos conocida la idea de que un algoritmo de gradiente estocástico es en sí mismo un problema de decisión secuencial, donde la "decisión" es el tamaño de paso usado en el algoritmo.

La literatura clásica sobre algoritmos de gradiente estocástico se centra en la propiedad de que, en el límite, producirán la solución óptima a un problema de un solo período (es decir, encuentran la cantidad óptima a asignar). Lo que casi siempre se pasa por alto es que, cuando esto se hace en un entorno de campo, lo que significa que estamos experimentando los resultados a medida que ocurren, debemos usar como nuestro objetivo la tarea de maximizar la *recompensa acumulada*, que es la suma de las recompensas a lo largo del tiempo.

En las extensiones, también introducimos un giro que se pasa por alto en la literatura. En la práctica, no solo desconocemos la demanda, sino que ni siquiera conocemos la distribución de la demanda. En cada período de tiempo, observamos cuánto vendemos (lo cual está limitado por la cantidad de recurso que ponemos disponible), y aprendemos de esta experiencia para actualizar nuestra creencia sobre la distribución antes de decidir cuánto asignar en el siguiente período de tiempo. Esto introduce un estado de creencia que vincula los períodos de tiempo entre sí, tal como sucedería si conserváramos el inventario sobrante para el siguiente período de tiempo. Esta es otra perspectiva que falta en los tratamientos clásicos del problema del vendedor de periódicos.

Estos aspectos ofrecen una riqueza considerable a lo que sigue siendo un problema de decisión secuencial bastante simple y elegante.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Maximizar el ingreso esperado por satisfacer la demanda, menos el costo de comprar el producto, a lo largo de un horizonte de planificación.
- **Decisiones:** Cuánto producto comprar en cada período de tiempo.
- **Incertidumbres:** La demanda del producto en cada período de tiempo.

## Narrativa

Existe una amplia clase de problemas que implican asignar algún recurso para satisfacer una demanda incierta (y a veces no observable). Los ejemplos incluyen:

- Almacenar un inventario perecedero (por ejemplo, pescado fresco) para satisfacer una demanda donde el inventario sobrante no puede conservarse para el futuro.
- Almacenar piezas para manufactura de alta tecnología (por ejemplo, motores a reacción) donde necesitamos ordenar piezas para satisfacer una demanda conocida, pero donde las piezas pueden no cumplir con las especificaciones requeridas y deben descartarse. Por lo tanto, podríamos necesitar ordenar ocho piezas para satisfacer una demanda de cinco, porque varias de las piezas pueden no cumplir con las especificaciones de ingeniería requeridas.
- Debemos asignar tiempo para completar una tarea (como conducir al trabajo, o asignar tiempo para completar un proyecto).
- Debemos asignar presupuestos anuales para actividades como marketing. Los fondos sobrantes se devuelven a la empresa.

El problema más simple implica tomar estas decisiones para satisfacer una demanda incierta con una distribución conocida, pero las aplicaciones más comunes implican distribuciones que son desconocidas y necesitan ser aprendidas. Puede haber otra información, como la disponibilidad de pronósticos de la demanda, así como información dinámica como el precio de mercado del pescado fresco (que puede ser conocido o desconocido antes de que se tome la decisión sobre el recurso).

Este problema se ha estudiado ampliamente desde la década de 1950, conocido originalmente como el "problema de inventario de un solo período", pero actualmente se identifica principalmente como el "problema del vendedor de periódicos". Se usa ampliamente como el problema canónico en optimización bajo incertidumbre.

El problema del vendedor de periódicos se formula típicamente como

$$
\begin{align}
\max_x \E F(x,W) = \E \big(p\min\{x,W\} - cx\big), \label{eq:newsvendorasymptotic}
\end{align}
$$

donde $x$ es nuestra variable de decisión que determina la cantidad de recurso para satisfacer la demanda, y donde $W$ es la demanda incierta del recurso. Suponemos que "compramos" nuestro recurso a un costo unitario de $c$, y vendemos el menor de $x$ y $W$ a un precio $p$ (que suponemos es mayor que $c$). La función objetivo dada en la ecuación $\eqref{eq:newsvendorasymptotic}$ se denomina la forma *asintótica* del problema del vendedor de periódicos.

Hay dos variaciones importantes del problema del vendedor de periódicos:

- La distribución de la variable aleatoria $W$ es conocida.
- La distribución de $W$ es desconocida.

El caso desconocido es el que surge con mayor frecuencia en la práctica, lo cual introduce la dimensión de que cada vez que ejecutamos una iteración de elegir $x$ y luego observar el menor de $x$ y $W$, aprendemos algo sobre la distribución de $W$.

Si $W$ fuera determinista (y si $p > c$), entonces la solución se verifica fácilmente que es $x = W$. Ahora imagine que $W$ es una variable aleatoria con distribución de probabilidad $f^W(w)$ ($W$ puede ser discreta o continua). Sea $F^W(w) = Prob[W \leq w]$ la distribución acumulada de $W$. Si $W$ es continua, y si pudiéramos calcular $F(x) = \E F(x,W)$, entonces la solución óptima $x^\ast $ satisfaría

$$
\left.\frac{d F(x)}{dx}\right\vert _{x=x^\ast } = 0.
$$

Ahora consideremos lo que se conoce como el *gradiente estocástico*, donde tomamos la derivada de $F(x,W)$ suponiendo que conocemos $W$, dado por

$$
\begin{align}
\frac{d F(x,W)}{dx} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases} \label{eq:newsvendorstochasticgradient}
\end{align}
$$

Este es un gradiente (es decir, una derivada) de $F(x,W)$ dada la variable aleatoria $W$, que es "estocástico" porque depende de la variable aleatoria $W$, la cual se revela solo después de que elegimos $x$. Esta es la razón por la que $d F(x,W)/dx$ en la ecuación $\eqref{eq:newsvendorstochasticgradient}$ se llama "gradiente estocástico".

Tomando esperanzas en ambos lados de $\eqref{eq:newsvendorstochasticgradient}$ obtenemos

$$
\begin{align*}
\E \frac{d F(x,W)}{dx} &= (p-c) Prob[x \leq W] - c Prob[x > W] \\
&= (p-c) (1-F^W(x)) - c F^W(x) \\
&= (p-c) - pF^W(x) \\
&= 0 \quad \text{for } x = x^\ast .
\end{align*}
$$

Ahora podemos resolver para $F^W(x^\ast )$, obteniendo

$$
F^W(x^\ast ) = \frac{p-c}{p}.
$$

Por lo tanto, a medida que $c$ disminuye hacia 0, queremos ordenar una cantidad $x^\ast $ que satisfará la demanda con probabilidad 1. A medida que $c$ se aproxima a $p$, entonces la cantidad óptima de pedido satisfará la demanda con una probabilidad que se aproxima a 0.

Esto significa que calculamos $(p-c)/p$, que es un número entre 0 y 1, y luego encontramos la cantidad $x^\ast $ que corresponde a la cantidad de pedido donde la probabilidad de que la demanda aleatoria sea menor que $x^\ast $ es igual a $(p-c)/p$.

Acabamos de ver dos situaciones en las que podemos encontrar la cantidad de pedido exactamente: cuando conocemos $W$ de antemano (podríamos llamar a esto el pronóstico perfecto) o cuando conocemos la distribución de $W$. Este resultado se conoce desde la década de 1950, y ha impulsado varios artículos para estimar la distribución de $W$ a partir de datos observados, así como para manejar la situación en la que no podemos observar $W$ directamente cuando $x < W$ (es decir, solo observamos las ventas, en lugar de la demanda, una situación conocida como "demandas censuradas").

Vamos a abordar el problema en el que la distribución de la demanda es desconocida. Nuestro enfoque será usar un algoritmo de búsqueda secuencial dado por

$$
\begin{align}
x^{n+1} = \max\left\{0,x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n} \right\},  \label{eq:stochasticgradientalgorithm}
\end{align}
$$

donde $\alpha_n$ se conoce como un *tamaño de paso*. Nuestro desafío será elegir $\alpha_n$ en cada iteración.

## Modelo básico

### Variables de estado

La variable de estado captura la información que tenemos en el tiempo $n$ que necesitamos, junto con la política y la información exógena, para calcular el estado en el tiempo $n+1$. Para nuestro procedimiento de búsqueda en la ecuación $\eqref{eq:stochasticgradientalgorithm}$, nuestra variable de estado está dada por

$$
S^n = (x^n).
$$

### Variables de decisión

El truco con este problema es reconocer la variable de decisión. Es tentador pensar que $x^n$ es la decisión, pero en el contexto de este algoritmo, la verdadera decisión es el tamaño de paso $\alpha_n$. Como con todos nuestros problemas de decisión secuencial, la decisión (es decir, el tamaño de paso) se determina mediante lo que típicamente se conoce como una regla de tamaño de paso, pero a veces se denomina política de tamaño de paso, que denotamos por $\alpha^\pi(S^n)$.

Normalmente introducimos las políticas más adelante, pero para ayudar a entender el modelo, comenzaremos con una política básica de tamaño de paso llamada *regla de tamaño de paso armónica*, dada por

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

Esta es una regla de tamaño de paso determinista simple, lo que significa que conocemos de antemano el tamaño de paso $\alpha_n$ una vez que conocemos $n$. A continuación introducimos una política de tamaño de paso estocástica más interesante que requiere una variable de estado más rica.

También vamos a dejar que $X^\pi(S^n)$ sea el valor de $x^n$ determinado por la política de tamaño de paso $\alpha^\pi(S^n)$.

### Información exógena

La información exógena es la demanda aleatoria $W^{n+1}$ del recurso (producto, tiempo o dinero) que estamos tratando de satisfacer con nuestro suministro de producto $x^n$. Podemos suponer que observamos $W^{n+1}$ directamente, o podemos observar solo si $x^n \leq W^{n+1}$, o $x^n > W^{n+1}$.

### Función de transición

La ecuación de transición, para el entorno en el que $x$ no está restringida, está dada por

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n}.  \label{eq:stochasticgradientaltransition1}
\end{align}
$$

Notamos que es posible que la ecuación $\eqref{eq:stochasticgradientaltransition1}$ produzca un valor $x^{n+1} < 0$, que no se puede implementar. La solución aquí es simple: simplemente fijamos $x^{n+1} = 0$.

### Función objetivo

En cada iteración recibimos un beneficio neto dado por

$$
F(x^n,W^{n+1}) = p\min\{x^n,W^{n+1}\} - cx^n.
$$

Ahora debemos construir una función objetivo para encontrar la mejor política. Podemos abordar este entorno del problema de dos maneras. En la primera, suponemos que debemos aprender en el campo, mientras que la segunda supone que tenemos acceso a un simulador para aprender la política.

**Optimizando en el campo**

Si estamos experimentando nuestras decisiones en el campo, queremos maximizar la *recompensa acumulada* a lo largo de algún horizonte. Esto significa que necesitamos encontrar la mejor política (que en este entorno significa la mejor regla de tamaño de paso) resolviendo

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} F(X^\pi(S^n\vert \theta),W^{n+1})\vert S^0\right\}. \label{eq:newsvendorobjectivecumulativereward}
\end{align}
$$

donde $S^{n+1} = S^M(S^n,X^\pi(S^n),W^{n+1})$ describe la evolución del algoritmo (por ejemplo, la función de transición dada por la ecuación $\eqref{eq:stochasticgradientaltransition1}$). Aquí, $\pi$ se refiere al tipo de regla de tamaño de paso (consideramos varias a continuación), y cualquier parámetro ajustable (como $\theta^{step}$).

Curiosamente, la historia detrás del problema del vendedor de periódicos siempre implica aprender en el campo, y sin embargo, la recompensa acumulada en la ecuación $\eqref{eq:newsvendorobjectivecumulativereward}$ nunca se usa como función objetivo. Mencionamos esto para los lectores que realicen una búsqueda bibliográfica sobre el "problema del vendedor de periódicos".

**Optimizando usando un simulador**

Alternativamente, podríamos estar usando un simulador donde vamos a ejecutar nuestra búsqueda durante $N$ iteraciones, terminando con $x^N$. Vamos a renombrar esta solución final como $x^{\pi,N}$ para expresar la dependencia de la política de tamaño de paso $\alpha^\pi(S^n)$.

Nuestra solución final $x^{\pi,N}$ es una variable aleatoria ya que depende de la secuencia $W^1, \ldots, W^n$. Como antes, vamos a dejar que $\omega$ represente una realización muestral de $W^1(\omega), \ldots, W^n(\omega)$, y escribimos nuestra solución como $x^{\pi,N}(\omega)$ para indicar que esta es la solución que obtuvimos cuando usamos la trayectoria muestral $\omega$.

Dado que estamos usando un simulador, solo nos importa el desempeño de la solución final (también llamada la *recompensa final*), que escribimos como

$$
\begin{align}
F(x^{\pi,N},\What) = p\min\{x^{\pi,N},\What\} - cx^{\pi,N}, \label{eq:newsvendorxpiNobjective}
\end{align}
$$

donde $\What$ es una variable aleatoria que usamos para probar el desempeño de $x^{\pi,N}$.

Esto significa que tenemos dos variables aleatorias en nuestra función objetivo dada en $\eqref{eq:newsvendorxpiNobjective}$. Para un único conjunto de realizaciones de $W^1(\omega), \ldots, W^n(\omega)$, obtenemos una solución $x^{\pi,N}(\omega)$. Ahora dejemos que $\psi$ sea una realización muestral de $\What$. Así, si tenemos una realización muestral de la solución $x^{\pi,N}(\omega)$, y una realización muestral de nuestra variable de prueba $\What(\psi)$, nuestro desempeño sería

$$
\begin{align}
F(x^{\pi,N}(\omega),\What(\psi)) = p\min\{x^{\pi,N}(\omega),\What(\psi)\} - cx^{\pi,N}(\omega). \label{eq:newsvendorxpiNobjectivesample}
\end{align}
$$

Lo que realmente queremos hacer es tomar promedios sobre las posibles realizaciones tanto de $x^{\pi,N}(\omega)$ como de $\What(\psi)$, lo cual podemos escribir usando

$$
\begin{align}
\Fbar^\pi  = \frac{1}{N} \frac{1}{M} \sum_{\omega=1}^N \sum_{\psi=1}^M \left(p\min\{x^{\pi,N}(\omega^n),\What(\psi^m)\} - cx^{\pi,N}(\omega^n)\right). \label{eq:newsvendorxpiNobjectivesampleaverage}
\end{align}
$$

La estimación $\Fbar^\pi$ representa un promedio sobre $N$ muestras de la secuencia $W^1(\omega), \ldots, W^n(\omega)$, y $M$ muestras de la variable de prueba $\What(\psi)$.

## Modelado de la incertidumbre

Sea $f^W(w)$ la distribución de $W$ (esta puede ser discreta o continua), con función de distribución acumulada $F^W(w) = Prob[W \leq w]$. Podríamos suponer que la distribución es conocida con un parámetro desconocido. Por ejemplo, imagine que $W$ sigue una distribución de Poisson con media $\mu$ dada por

$$
f^W(w) = \frac{\mu^w e^{-\mu}}{w!}, \quad w=0, 1, 2, \ldots.
$$

Podemos suponer que conocemos $\mu$, en cuyo caso podríamos resolver este problema utilizando la solución analítica dada al comienzo del capítulo. Supongamos, en cambio, que $\mu$ es desconocido, pero con una distribución conocida $p^\mu_k = Prob[\mu=\mu_k]$. Nótese que esta distribución $p^\mu = (p^\mu_k)\_{k=1}^K$ se modelaría en nuestro estado inicial $S^0$.

## Diseño de políticas

Ya hemos introducido dos opciones de políticas de tamaño de paso que escribimos como $\alpha^\pi(S^n)$ para imitar nuestro estilo en otros lugares al escribir políticas.

En la literatura se ha sugerido una amplia gama de políticas de tamaño de paso (a menudo llamadas reglas de tamaño de paso). Una de las más simples y populares es la política de tamaño de paso armónica, dada por

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

La Figura 3.1 ilustra el comportamiento de la regla de tamaño de paso armónica para diferentes valores de $\theta^{step}$.

<figure class="book-figure">
  <img src="/assets/images/sdam/harmonicstepsizes.png" alt="Tamaños de paso armónicos para diferentes valores de theta-step." style="max-width: 420px;">
  <figcaption><span class="fig-num">Figura 3.1.</span> Tamaños de paso armónicos para diferentes valores de $\theta^{step}$.</figcaption>
</figure>

La política de tamaño de paso armónica también se conoce como una política determinista, porque conocemos su valor para un $n$ dado de antemano. El desafío con las políticas deterministas es que no se les permite adaptarse a los datos. Por esta razón, a menudo resulta útil usar una regla estocástica. Uno de los primeros y más simples ejemplos es la regla de Kesten

$$
\alpha^{kesten}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+K^n-1},
$$

donde $K^n$ es un contador que cuenta cuántas veces el gradiente ha cambiado de dirección. Determinamos esto preguntando si el producto (o producto interno, si $x$ es un vector) $(\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0$. Si el gradiente está cambiando de dirección, significa que estamos cerca del óptimo y lo estamos sobrepasando al dar el paso, por lo que necesitamos reducir el tamaño de paso. Esta fórmula se escribe

$$
\begin{align}
K^{n+1} = \begin{cases} K^n + 1 & \text{if } (\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0, \\ K^n & \text{otherwise,} \end{cases} \label{eq:kestenupdate}
\end{align}
$$

donde $\nabla_x F(x^n,W^{n+1}) = \frac{d F(x,W^{n+1})}{dx}$.

Ahora tenemos un tamaño de paso que depende de una variable aleatoria $K^n$, razón por la cual la llamamos regla de tamaño de paso estocástica. Si usamos la regla de Kesten, tenemos que modificar nuestra variable de estado para incluir $K^n$, lo que nos da

$$
S^n = (x^n,K^n).
$$

También tenemos que agregar la ecuación $\eqref{eq:kestenupdate}$ a nuestra función de transición.

Otra regla de tamaño de paso, conocida como AdaGrad, es particularmente adecuada cuando $x$ es un vector con elemento $x_i,~i=1, \ldots, I$. Para simplificar un poco la notación, sea el gradiente estocástico con respecto al elemento $x_i$ dado por

$$
g^n_{i} = \nabla_{x_i} F(x^{n-1}, W^n).
$$

Ahora creemos una matriz diagonal $I \times I$ $G^n$ donde el $(i,i)$-ésimo elemento $G^n_{ii}$ está dado por

$$
G^n_{ii}  = \sum_{m=1}^n (g^n_{i})^2.
$$

Luego establecemos un tamaño de paso para la $i$-ésima dimensión usando

$$
\begin{align}
\alpha_{ni} = \frac{\theta}{(G^n_{ii})^2 + \epsilon}, \label{eq:adagrad}
\end{align}
$$

donde $\theta$ es un parámetro ajustable (comparable a $\theta^{step}$ en nuestra fórmula de tamaño de paso armónica) y $\epsilon$ es un número pequeño (por ejemplo, $10^{-8}$ para evitar la posibilidad de dividir por cero).

La Figura 3.2 ilustra diferentes tasas de convergencia para diferentes reglas de tamaño de paso, mostrando $F(x^n,W^{n+1})$ en función del número de iteraciones. Si estuviéramos optimizando la recompensa final en $\eqref{eq:newsvendorxpiNobjectivesampleaverage}$, simplemente podríamos elegir la línea que sea más alta, lo cual depende del presupuesto $N$. Si estamos optimizando la recompensa acumulada en la ecuación $\eqref{eq:newsvendorobjectivecumulativereward}$, entonces tenemos que centrarnos en el área bajo la curva, lo que favorece una convergencia inicial rápida.

<figure class="book-figure">
  <img src="/assets/images/sdam/newsvendorconvergence.png" alt="Gráfico de F(x^n, W^n+1) para diferentes reglas de tamaño de paso, ilustrando diferentes tasas de convergencia." style="max-width: 450px;">
  <figcaption><span class="fig-num">Figura 3.2.</span> Gráfico de $F(x^n,W^{n+1})$ para diferentes reglas de tamaño de paso, ilustrando diferentes tasas de convergencia.</figcaption>
</figure>

## Extensiones

**1)** Imaginemos que no conocemos $\mu$, pero supongamos que $\mu$ puede tomar uno de los valores $(\mu_1, \mu_2, \ldots, \mu_K)$. Sea $H^n$ la historia de observaciones hasta el $n$-ésimo experimento, y sea $H^0$ la historia inicial vacía. Suponemos que comenzamos con una probabilidad previa inicial sobre $\mu$ que escribimos como

$$
p^0_k = Prob[\mu = \mu_k\vert H^0].
$$

Después de haber observado $W^1, \ldots, W^n$, escribiríamos nuestra distribución actualizada como

$$
p^n_k = Prob[\mu = \mu_k\vert H^n].
$$

Podemos actualizar $p^n = (p^n_k)\_{k=1}^K$ usando el teorema de Bayes

$$
\begin{align}
p^{n+1}_k &= Prob[\mu=\mu_k\vert W^{n+1}=w,H^n] \\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k,H^n]Prob[\mu=\mu_k\vert H^n]}{Prob[W^{n+1}=w\vert H^n]}\\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k}{Prob[W^{n+1}=w\vert H^n]},
\end{align}
$$

donde

$$
Prob[W^{n+1}=w\vert H^n] = \sum_{k=1}^K Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k.
$$

Con esta extensión al modelo básico, tenemos dos distribuciones de probabilidad: la creencia sobre la media verdadera $\mu$, y la demanda aleatoria $W$ dada $\mu$. Para incluir esta extensión, tendríamos que insertar $p^n$ en nuestra variable de estado, por lo que escribiríamos

$$
S^n = (x^n, p^n).
$$

**2)** Imaginemos que nuestro problema consiste en comprar un producto básico (como petróleo o gas natural) en el mes $n$ para ser utilizado durante el mes $n+1$. Compramos el producto a un costo unitario $c$, y lo vendemos hasta una demanda desconocida $D^{n+1}$ a un precio desconocido $p^{n+1}$. Escribiríamos nuestro objetivo para este problema como

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^{n+1} \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension1}
\end{align}
$$

## ¿Qué aprendimos?

- Usamos el contexto de un problema del vendedor de periódicos para ilustrar un algoritmo de gradiente estocástico como un problema de decisión secuencial. Mostramos cómo modelar un algoritmo de gradiente estocástico usando los cinco elementos de un problema de decisión secuencial introducidos en el [Capítulo 1](/sdam/es/chapter-1/).
- Introdujimos varios ejemplos de políticas PFA para elegir los tamaños de paso.
- El problema del vendedor de periódicos se plantea clásicamente como un problema estático donde buscamos la mejor solución en la que solo nos interesa el desempeño de nuestra elección final de $x$. En este capítulo, introdujimos dos objetivos: la *recompensa acumulada* para el aprendizaje en línea (optimización) en el campo, y la *recompensa final* si estuviéramos utilizando un simulador para diseñar la mejor política de aprendizaje.
- Introducimos la idea de usar una distribución de probabilidad (en este caso una distribución de Poisson) para las demandas aleatorias de producto, donde la media de la distribución de Poisson es en sí misma una variable aleatoria.
- Introducimos la extensión de aprender adaptativamente la distribución de probabilidad para la media de la distribución de Poisson.
- También introducimos el tema de hacer que la decisión $x_t$ dependa de otras variables de estado como el precio $p_t$. Esto es lo mismo que crear una política $X^\pi(S_t)$ donde el estado $S_t$ depende (en este contexto) del precio $p_t$. Este es un cambio importante en la forma de pensar sobre el problema del vendedor de periódicos, pero cae dentro de la misma clase que todos nuestros problemas de decisión secuencial.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Cuál es la variable de decisión para nuestro algoritmo de búsqueda secuencial?</li>
<li>Dé ejemplos de búsqueda sobre clases de políticas (dos ejemplos) y los parámetros ajustables para cada clase de política.</li>
<li>Escriba lo que se entiende por un objetivo de *recompensa acumulada* y un objetivo de *recompensa final*.</li>
<li>Al buscar sobre el parámetro ajustable $\theta^{step}$ para la regla de tamaño de paso armónica, ¿cómo cree que se compararía el valor óptimo de $\theta^{step}$ obtenido usando una recompensa acumulada con el valor óptimo al usar una recompensa final?</li>
<li>Suponiendo que no conocemos la distribución de la demanda $W$, argumente por qué no tiene sentido encontrar el $x^\ast $ óptimo en un simulador. Dado esto, tiene más sentido usar el simulador para optimizar la política de aprendizaje. Si usamos un simulador para optimizar la política de aprendizaje, ¿qué función objetivo sería apropiada para este ejercicio de aprendizaje?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Una gran empresa de gases industriales tiene que comprar contratos de electricidad con un mes de anticipación usando un contrato de "tómalo o déjalo" (take or pay). Si la empresa contrata la compra de $x_t$ megavatios-hora para el mes $t+1$, paga un precio $p_t$ independientemente de si necesita la energía o no. Pero si la carga (demanda) $L_{t+1}$ en el mes $t+1$ supera $x_t$, entonces la empresa tiene que comprar energía de la red a un precio spot $p^{spot}_{t+1}$. El costo de satisfacer la carga en el mes $t+1$ es entonces

$$
C(S_t,W_{t+1}) = p_t x_t + p^{spot}_{t+1} \max\{0, L_{t+1}-x_t\}.
$$

Podemos observar los diferentes precios y cargas, pero no conocemos su distribución de probabilidad. Nuestro objetivo es minimizar los costos durante un año.

Supongamos que $x_t$ es discreto con valores $x_1, \ldots, x_M$. Sea $(\mubar_{tx}, \beta_{tx})$ la media y la precisión de nuestra estimación de $\E C(S_t,W_{t+1})$ y supongamos que usamos una política llamada *estimación de intervalos*, $X^{IE}(S_t\vert \theta)$, para elegir $x_t$:

$$
X^{IE}(S_t\vert \theta^{IE}) = \argmin_x \left(\mubar_{tx} - \theta^{IE} \sqrt{\frac{1}{\beta_{tx}}}\right).
$$

  <ol type="a">
    <li>Dé la variable de estado $S_t$ y la información exógena $W_{t+1}$.</li>
    <li>Escriba la función objetivo para encontrar $\theta^{IE}$ que minimice los costos acumulados durante un año. Muestre la esperanza sobre cada variable aleatoria escribiendo la variable aleatoria como subíndice del operador de esperanza (como en $\E_Y$). Luego muestre cómo escribir la esperanza como una simulación suponiendo que tiene $K$ muestras de cada variable aleatoria.</li>
    <li>Dé la fórmula para encontrar el gradiente de la función objetivo en (b) usando una derivada numérica, y escriba un algoritmo de gradiente estocástico para encontrar un buen valor de $\theta$ en $N$ iteraciones.</li>
    <li>Suponga ahora que los precios evolucionan según $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2}$. ¿Cuál es la variable de estado ahora, y cómo complica agregar dimensiones a la variable de estado el problema de encontrar el $\eta$ óptimo mencionado anteriormente?</li>
  </ol>
</li>
<li>Considere la extensión 2 anterior, donde el precio $p$ ahora cambia con las iteraciones, y donde el precio que recibimos en el momento $n$ no se conoce en el momento $n$, por lo que lo designamos como $p^{n+1}$. Por ahora, suponga que $p^{n+1}$ es independiente de $p^n$, y que $D^{n+1}$ es independiente de $D^n$.
  <ol type="a">
    <li>Para el modelo en la ecuación $\eqref{eq:newsvendorextension1}$, dé la variable de estado $S^n$ y la variable de información exógena $W^n$.</li>
    <li>Dé el algoritmo de gradiente estocástico para este problema, y muestre que es básicamente el mismo que cuando el precio era constante.</li>
  </ol>
</li>
<li>Extienda el ejercicio 7, pero ahora suponga que los precios evolucionan según

$$
p^{n+1} = \eta_0 p^n + \eta_1 p^{n-1} + \eta_2 p^{n-2} + \varepsilon^{n+1}
$$

donde $\varepsilon^{n+1}$ es un término de ruido de media 0 que es independiente del proceso de precios.
  <ol type="a">
    <li>Para el modelo en la ecuación $\eqref{eq:newsvendorextension1}$, dé la variable de estado $S^n$ y la variable de información exógena $W^n$.</li>
    <li>Dé el algoritmo de gradiente estocástico para este problema.</li>
  </ol>
</li>
<li>Ahora suponga que nuestro objetivo es optimizar

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^n \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension2}
\end{align}
$$

La única diferencia entre las ecuaciones $\eqref{eq:newsvendorextension2}$ y $\eqref{eq:newsvendorextension1}$ es que ahora podemos ver el precio $p^n$ *antes* de elegir nuestra decisión $x^n$. Sabemos esto por cómo está indexado el precio.
  <ol type="a">
    <li>Para el modelo en la ecuación $\eqref{eq:newsvendorextension2}$, dé la variable de estado $S^n$ y la variable de información exógena $W^n$.</li>
    <li>Dé el algoritmo de gradiente estocástico para este problema. A diferencia del problema anterior, este gradiente será una función de $p^n$.</li>
  </ol>

La situación en la que el gradiente depende del precio $p^n$ es una complicación bastante significativa. Lo que está ocurriendo aquí es que, en lugar de intentar encontrar una solución óptima $x^\ast $ (o más precisamente, $x^{\pi,N}$), estamos tratando de encontrar una función $x^{\pi,N}(p)$.

El truco aquí es elegir una forma funcional para $x^{\pi,N}(p)$. Sugerimos dos alternativas:

**Tabla de consulta (Lookup table)** – Aunque $p$ sea continuo, podemos discretizarlo en una serie de precios discretos $p_1, \ldots, p_K$, donde elegimos el valor $p_k$ más cercano a un precio $p^n$. Llamemos a este precio $p^n_k$. Ahora pensemos en un algoritmo de gradiente estocástico indexado por el $p_k$ que esté más cercano a $p^n$. Luego usamos el gradiente estocástico para actualizar $x^n(p^n_k)$ usando

$$
x^{n+1}(p^n_k) = x^n(p^n_k) + \alpha_n \nabla_x F^n(x^n,W^{n+1}).
$$

Por supuesto, no queremos discretizar $p$ demasiado finamente. Si discretizamos los precios en, digamos, 100 rangos, esto significa que estamos tratando de encontrar 100 cantidades de pedido $x^{\pi,N}(p)$, lo cual sería bastante difícil.

**Modelo paramétrico** – Ahora imaginemos que creemos poder representar la cantidad de pedido $x^{\pi,N}(p)$ como una función paramétrica

$$
\begin{align}
x^{\pi,N}(p\vert \theta) = \theta_0 + \theta_1 p + \theta_2 p^{\theta_3}. \label{eq:parametricorderquantity}
\end{align}
$$

Cuando usamos una función paramétrica como esta, ya no estamos tratando de encontrar la cantidad de pedido $x^{\pi,N}$; en cambio, estamos tratando de encontrar $\theta$ que determine la función (en este caso, $\eqref{eq:parametricorderquantity}$). Nuestro algoritmo de gradiente estocástico ahora se convierte en

$$
\begin{align*}
\theta^{n+1} &= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d \theta} \\
&= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta},
\end{align*}
$$

Recuerde que $\theta^n$ es un vector columna de cuatro elementos, mientras que $x^n$ es un escalar. La primera derivada es nuestro gradiente estocástico original

$$
\frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases}
$$

La segunda derivada se calcula directamente a partir de la política $\eqref{eq:parametricorderquantity}$, que está dada por

$$
\frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta} = \begin{pmatrix} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_0} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_1} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_2} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_3} \end{pmatrix} = \begin{pmatrix} 1 \\ p^n \\ (p^n)^{\theta_3} \\ \theta_2(p^n)^{\theta_3} \ln{p^n} \end{pmatrix}.
$$

El uso del modelo paramétrico puede ser muy efectivo si la forma paramétrica coincide con la forma real de la función $x^{\pi,N}(p)$. La representación de tabla de búsqueda es más general, lo cual puede ser una característica, pero si la discretización es demasiado fina, entonces se requerirá un número mucho mayor de iteraciones para resolver.

Con estas estrategias en mente, considere las siguientes tres extensiones:</li>
<li>Vuelva a la función objetivo en la ecuación $\eqref{eq:newsvendorextension1}$ donde el precio solo se revela después de que tomamos la decisión de pedido, pero ahora $p^{n+1}$ depende de la historia, como en

$$
p^{n+1} = p^n + \varepsilon^{n+1}.
$$

Discuta cómo podría abordar este problema, dado lo que presentamos anteriormente.</li>
<li>Repita el ejercicio 10, pero ahora asuma que

$$
p^{n+1} = 0.5 p^n + 0.5 p^{n-1} + \varepsilon^{n+1}.
$$</li>
<li>Repita el ejercicio 10, pero ahora la cantidad $x^n$ se elige sujeta a la restricción $0 \leq x \leq R^n$ donde

$$
R^{n+1} = \max\{0, R^n + x^n - W^{n+1}\},
$$

y donde el precio $p=p^n$ se revela antes de que tomemos una decisión. Con esta transición, nuestro problema se convierte en un problema de inventario tradicional.</li>
<li>Una cuenta de gastos flexibles (FSA) es un dispositivo contable que permite a las personas ahorrar dinero antes de impuestos con el propósito de cubrir gastos médicos. Usted debe asignar cuánto quiere tener disponible en el año $t+1$ al final del año $t$. El desafío es que si coloca demasiado en la cuenta, pierde lo que quede sin usar.

Sea $M_{t+1}$ sus gastos médicos en el año $t+1$, y sea $x_t$ la cantidad que asigna al final del año $t$ para gastar en el año $t+1$. Sea $r$ su tasa de impuesto marginal donde $0 < r < 1$. Su gasto total en el año $t+1$ está dado por

$$
C(x_t,M_{t+1}) = x_t + \frac{1}{1-r}\max\{0,M_{t+1} - x_t\}.
$$

Le gustaría usar un algoritmo de gradiente estocástico de la forma

$$
x_{t+1} = x_t + \alpha_t \gbar_{t+1},
$$

donde

$$
\gbar_{t+1} = (1-\eta)\gbar_t + \eta \frac{dC(x_t,M_{t+1})}{dx_t}
$$

y donde $0 < \eta < 1$ es un factor de suavizado. Para el tamaño de paso, use

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + K_t -1},
$$

donde $K_t$ cuenta cuántas veces la derivada de la función de costo ha cambiado de signo. Es decir

$$
K_{t+1} = \begin{cases} K_t +1 & \text{if } \frac{dC(x_t,M_{t+1})}{dx_t} \frac{dC(x_{t-1},M_t)}{dx_{t-1}} < 0. \\ K_t & \text{otherwise.} \end{cases}
$$

Su desafío es decidir el parámetro de tamaño de paso $\theta^{step}$ y el parámetro de suavizado $\eta$ formulando este problema como un problema de decisión secuencial. Asuma que tiene acceso a un simulador para evaluar el desempeño de la regla de tamaño de paso.

Vamos a comenzar encontrando la solución óptima asumiendo que conocemos la distribución de $M_{t+1}$:
  <ol type="a">
    <li>¿Qué es $\frac{dC(x_t,M_{t+1})}{dx_t}$? Recuerde que esto se calcula después de que $M_{t+1}$ se conoce.</li>
    <li>Encuentre la solución estática óptima igualando a cero la derivada (de la parte (a)), y luego resolviendo para $x^\ast $. Asuma que la función de distribución acumulada $F^M(m) = Prob(M_{t+1} \leq m)$ es conocida.</li>
  </ol>

Ahora vamos a modelar el problema de aprendizaje secuencial donde no asumiremos que la distribución de $M_{t+1}$ es conocida:
  <ol type="a" start="3">
    <li>¿Cuál es la variable de estado para este sistema dinámico?</li>
    <li>¿Cuál(es) es(son) la(s) variable(s) de decisión?</li>
    <li>¿Cuál es la información exógena?</li>
    <li>¿Cuál es la función de transición? Recuerde que necesita una ecuación para cada elemento de la variable de estado.</li>
    <li>¿Cuál es la función objetivo? ¿Sobre qué está optimizando?</li>
  </ol>
</li>
<li>Vamos a asumir que el precio al que vendemos nuestro gas cambia de mes a mes. La función de ganancia mensual estaría dada por

$$
F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t,
$$

donde $D_{t+1}$ es la demanda de electricidad (en megavatios-hora) para el mes $t + 1$.

Asuma por simplicidad que el proceso de precios evoluciona de la siguiente manera:

$$
p_{t+1} = \begin{cases} p_t - 1 & \text{with probability 0.2,} \\ p_t & \text{with probability 0.6,} \\ p_t + 1 & \text{with probability 0.1.} \end{cases}
$$

  <ol type="a">
    <li>Reescriba los cinco elementos del modelo que proporcionó originalmente en el ejercicio 15, parte (a). Note que en lugar de buscar $x_t$, ahora está buscando $x_t(p_t)$. Esto significa que en lugar de buscar un escalar, ahora estamos buscando una función.</li>
    <li>Vamos a comenzar representando $x_t(p_t)$ como una función de tabla de búsqueda, lo que significa que vamos a discretizar $p_t$ en un conjunto de precios discretos $(0, 1, 2, \ldots, 50)$. Sin hacer ninguna programación, describa los pasos del método que usaría para estimar la función $x_t(p_t)$ (su descripción debe ser lo suficientemente cuidadosa como para que alguien pueda escribir código a partir de ella). Compare la complejidad de este problema con el modelo básico.</li>
    <li>Repita (b), pero en lugar de una tabla de búsqueda para $x_t(p_t)$, aproxime la forma funcional de la política usando

    $$
    x_t(p_t\vert \theta) = \theta_0 + \theta_1 p_t + \theta_2 \ln{p_t} + \theta_3 \exp{\{\theta_4 p_t\}}.
    $$

    Nuevamente describa los pasos de un algoritmo adaptativo para encontrar $\theta$.</li>
  </ol>
</li>
</ol>

**Preguntas de programación**

Estos ejercicios usan el módulo Python *AdaptiveMarketPlanning* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 14;">
<li>Una importante empresa de gases industriales, que convierte aire en oxígeno y nitrógeno licuados, tiene que firmar contratos de gas natural para la producción de electricidad. Los contratos proporcionan una cantidad de gas para el próximo mes, firmados con un mes de anticipación. Sea $W_{t+1}$ la demanda de electricidad (en megavatios-hora) para el mes $t+1$, y sea $x_t$ la cantidad de gas, decidida al comienzo del mes $t$, para ser comprada en el mes $t + 1$ (podríamos haberla indexado como $x_{t,t+1}$).

Asuma que compramos gas (normalmente medido en unidades de millones de btus) a un precio de ＄20 por mwh equivalente, y lo vendemos a un precio de ＄26 por mwh equivalente (más adelante vamos a introducir incertidumbre en estos precios).

Por simplicidad, vamos a asumir que las variables aleatorias $W_1,W_2, \ldots, W_t,$ son estacionarias, lo que significa que todas tienen la misma distribución, pero la distribución es desconocida. Sus ganancias para el mes $t$ están dadas por

$$
F_t(x_t,W_{t+1}) = p \min\{x_t,W_{t+1}\} - cx_t.
$$

Además, asuma que va a usar un algoritmo de gradiente estocástico para encontrar las cantidades de pedido $x_t$, dado por

$$
x_{t+1} = x_t + \alpha_t \nabla F_t(x_t,W_{t+1}).
$$

Finalmente, asuma que el tamaño de paso está dado por

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + N_t - 1},
$$

donde $N_t$ cuenta el número de veces que el gradiente cambia de signo. Escribimos la ecuación de actualización para $N_t$ usando

$$
N_{t+1} = \begin{cases} N_t + 1 & \text{if } \nabla F_{t-1}(x_{t-1},W_t)\nabla F_t(x_t,W_{t+1}) < 0, \\ N_t & \text{otherwise.} \end{cases}
$$

  <ol type="a">
    <li>Escriba los cinco elementos del modelo para este problema. Para la función objetivo, quiere encontrar la mejor política (esto será un algoritmo) para maximizar las ganancias totales de comprar y vender gas natural durante un horizonte de $T = 24$ meses. Note que la búsqueda sobre políticas se refiere a encontrar el mejor valor de $\theta^{step}$.</li>
    <li>Use el paquete de python <em>AdaptiveMarketPlanning</em> en <a href="https://tinyurl.com/sdagithub/">tinyurl.com/sdagithub</a> para evaluar $\theta^{step} = (2,5,10,20,50)$ para el modelo en la parte (a).</li>
    <li>¿Cómo cambiaría su función objetivo si tuviera que optimizar la recompensa terminal en lugar de la recompensa acumulada? Asegúrese de escribir la esperanza en su forma anidada (es decir, usando notación como $\E_W$ si está tomando una esperanza sobre $W$).</li>
    <li>Repita la búsqueda para el mejor $\theta^{step}$ (usando los mismos valores), pero ahora usando la formulación de recompensa final que dio en la parte (c).</li>
    <li>Ahora asuma que su función objetivo está dada por

    $$
    F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t.
    $$

    donde ahora asumimos que tenemos que firmar nuestro contrato por una cantidad $x_t$ sin conocer el precio que recibiremos por la electricidad que vendemos al mercado. En cambio, el precio $p_{t+1}$ se revela durante el mes $t + 1$. ¿Cómo afectaría este cambio a su modelo y estrategia de solución?</li>
  </ol>
</li>
</ol>
{% endraw %}