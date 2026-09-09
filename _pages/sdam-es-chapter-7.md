---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 7: Aplicaciones, revisitadas"
permalink: /sdam/es/chapter-7/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 80dcb065dd6e7cae
---

{% raw %}

Ahora que hemos revisado una serie de contextos de problemas, vamos a hacer una pausa y usar estas aplicaciones para ilustrar con mayor profundidad algunos de los aspectos de modelado que abordamos en el [Capítulo 1](/sdam/es/chapter-1/).

Comenzando con los problemas de inventario del Capítulo 1, ahora hemos cubierto seis clases de problemas de decisión secuencial. Para cada problema, ilustramos una o dos estrategias para tomar decisiones:

- **Capítulo 1)** Problemas de inventario – Presentamos los problemas de decisión secuencial usando variaciones de un problema de inventario simple. Las políticas incluyeron la política de pedido hasta un nivel objetivo ("order-up-to"), y una política basada en pronósticos ajustados.
- **Capítulo 2)** Vender un activo – Tuvimos que decidir cuándo vender un activo financiero. Las políticas incluyeron variaciones de comprar-bajo, vender-alto.
- **Capítulo 3)** Planificación de mercado adaptativa – Este problema usó una búsqueda estocástica basada en derivadas, donde el problema de decisión secuencial consistía en elegir un tamaño de paso, lo cual ilustramos usando funciones paramétricas simples.
- **Capítulo 4)** Aprender el mejor tratamiento para la diabetes – Este es un problema clásico de aprendizaje activo conocido como el problema del bandido multibrazo. Diseñamos políticas basadas en problemas de optimización parametrizados.
- **Capítulo 5)** Rutas más cortas estocásticas estáticas – Encontramos una solución óptima de una versión particular de un problema de rutas más cortas estocásticas usando una recursión clásica de programación dinámica que pudimos resolver de manera exacta, y luego presentamos una versión estocástica más compleja que resolvimos usando programación dinámica aproximada, explotando una variable de estado posterior a la decisión.
- **Capítulo 6)** Rutas más cortas estocásticas dinámicas – Aquí cambiamos a un problema de ruta más corta dinámica donde las estimaciones de los costos esperados de las rutas evolucionan con el tiempo (en el caso estático del Capítulo 5, nuestras estimaciones de los costos esperados no cambiaban). Usamos esto para ilustrar una política de anticipación determinista básica, y una política de anticipación parametrizada.

Anteriormente, presentamos cuatro clases de políticas. En las aplicaciones que hemos revisado hasta ahora, hemos visto ilustraciones de cada una de las cuatro clases. En este capítulo, vamos a revisar las cuatro clases con mayor profundidad, y luego volveremos a nuestro conjunto de aplicaciones para identificar la clase de cada una de las políticas sugeridas.

## Las cuatro clases de políticas

Primero observamos que las cuatro clases de políticas pueden dividirse en dos categorías: la clase de búsqueda de políticas y la clase de anticipación. Cada una de estas puede, a su vez, subdividirse en dos clases, creando así las cuatro clases de políticas. Estas se describen con más detalle a continuación.

### Búsqueda de políticas

La clase de políticas de "búsqueda de políticas" implica buscar sobre un conjunto de funciones para tomar decisiones con el fin de encontrar la función que funcione mejor en promedio, usando el objetivo que sea apropiado para el problema. La mayoría de las veces esto significará buscar el mejor valor de un conjunto de parámetros que caracterizan una política parametrizada, pero también puede significar que debamos evaluar diferentes parametrizaciones.

Las políticas de búsqueda de políticas pueden dividirse en dos clases:

- **Aproximaciones de función de política (PFAs)** – Estas son funciones analíticas que mapean directamente un estado a una acción. Algunos ejemplos son:
    - Una función parametrizada como la política "alto-bajo" dada en el [Capítulo 2](/sdam/es/chapter-2/), que repetimos aquí

    $$
    X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
    $$

    donde $\theta^{sell-low} = (\theta^{low},\theta^{high})$. Otros ejemplos son la política de pedido hasta un nivel objetivo que vimos en el [Capítulo 1](/sdam/es/chapter-1/), y la política de pronóstico ajustado.
    - Una función lineal, como

    $$
    X^\pi(S_t\vert \theta) = \theta_0 + \theta_1 \phi_1(S_t) + \theta_1 \phi_1(S_t) + \ldots + \theta_F \phi_F(S_t)
    $$

    donde $(\phi_f(S_t)),~f=1, \ldots, F$ es un conjunto de características ("lineal" significa lineal en el vector de parámetros $\theta$ – las características $\phi_f(S_t)$ pueden ser altamente no lineales en $S_t$). Por ejemplo, podríamos estar tratando de decidir cuánto ofertar para que una película se anuncie en un sitio web, y una característica podría ser el género de la película o el nombre del actor o actriz principal.

    Las funciones lineales (también conocidas como "políticas afines") son populares, pero note que no podría usar una función lineal para aproximar funciones escalonadas como las políticas de comprar-bajo, vender-alto o pedido hasta un nivel objetivo ilustradas anteriormente.
    - Funciones avanzadas como funciones localmente lineales o redes neuronales, aunque estas típicamente tienen un gran número de parámetros (los pesos en una red neuronal) que deben ajustarse.
- **Aproximaciones de función de costo (CFAs)** – Estas son políticas que requieren resolver un problema de optimización parametrizado, donde podemos parametrizar ya sea la función objetivo o las restricciones. Las CFAs abren la puerta a resolver problemas de decisión de alta dimensión. Algunos ejemplos son:
    - Un ejemplo simple de una aproximación de función de costo parametrizada es la política de estimación por intervalos que presentamos en el [Capítulo 4](/sdam/es/chapter-4/) y repetimos aquí

    $$
    X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
    $$

    - Modelos de optimización parametrizados – Vimos esto en el [Capítulo 6](/sdam/es/chapter-6/) cuando elegimos el percentil $\theta$ de los costos de los enlaces. Esta es una heurística ampliamente usada en la industria que ha sido pasada por alto por la literatura de investigación. Las aerolíneas usan esta idea para optimizar el movimiento de sus aeronaves y tripulaciones en presencia de retrasos significativos por el clima. Los operadores de redes eléctricas que planifican la programación de generadores de energía insertarán capacidad de reserva para asegurar que la demanda pueda cubrirse si un generador falla.

Tanto las PFAs como las CFAs tienen parámetros que deben ajustarse. La única diferencia es si la política involucra o no un problema de optimización incorporado. Ambas son excepcionalmente poderosas y son ampliamente usadas en diferentes contextos.

### Aproximaciones de anticipación

Las políticas basadas en aproximaciones de anticipación se construyen aproximando los costos (o recompensas) posteriores derivados de tomar una decisión ahora, los cuales luego se consideran junto con el costo (o recompensa) inicial de la decisión inicial.

- **Políticas basadas en aproximaciones de función de valor (VFAs)** – Estas son políticas basadas en la ecuación de Bellman. La forma más básica de la ecuación de Bellman para problemas deterministas fue presentada por primera vez en el [Capítulo 5](/sdam/es/chapter-5/) como

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + V_{t+1}(S_{t+1}) \big).
$$

  Hay muchos problemas donde la transición a $S_{t+1}$ involucra información (contenida en $W_{t+1}$) que no se conoce en el momento $t$, lo que significa que $S_{t+1}$ es una variable aleatoria en el momento $t$. En este caso, tenemos que insertar una esperanza como hicimos anteriormente, lo que nos da

$$
V_t(S_t) = \min_{x\in\Xcal_s} \big(C(S_t,x) + \E \{V_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  En la práctica, típicamente tenemos que reemplazar la función de valor $V_{t+1}(S_{t+1})$ con una aproximación $\Vbar_{t+1}(S_{t+1})$, tal como hicimos en la sección de programación dinámica aproximada del [Capítulo 5](/sdam/es/chapter-5/). El campo que estudia estas aproximaciones se conoce bajo nombres como programación dinámica aproximada, aprendizaje por refuerzo (que se originó en las ciencias de la computación), y programación dinámica adaptativa (el término usado en la comunidad de controles de ingeniería). En este caso, la política estaría dada por

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \E \{\Vbar_{t+1}(S_{t+1})\vert S_t,x\} \big).
$$

  Si usamos el estado posterior a la decisión $S^x_t$, podemos escribir nuestra política como

$$
X^\pi(S_t) = \argmin_{x\in\Xcal_s} \big(C(S_t,x) + \Vbar^x_t(S^x_t) \big),
$$

  lo cual ilustramos en el [Capítulo 5](/sdam/es/chapter-5/).

  Usamos el problema de la ruta más corta determinista para ilustrar una aplicación donde las funciones de valor podían calcularse de manera exacta. Esto a veces puede hacerse en problemas estocásticos, pero en la mayoría de las aplicaciones, debe hacerse de manera aproximada. El desafío consiste en realizar cálculos de suficiente calidad como para producir políticas efectivas.

  Una estrategia de aproximación popular para las funciones de valor es usar un modelo lineal dado por

$$
\begin{align}
\Vbar^x_t(S^x_t\vert \theta^{VFA}) = \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t), \label{eq:hybridlinearvfa}
\end{align}
$$

  donde $(\phi_f(S^x_t))\_{f\in\Fcal}$ es un conjunto de características definidas por el usuario y $\theta^{VFA}$ es un conjunto de parámetros elegidos usando algoritmos de programación dinámica aproximada.

  Ajustamos el modelo lineal recopilando "observaciones" del valor $\vhat^n_t$ de estar en el estado $S^n_t$ en la $n$-ésima iteración. Sea $\thetabar^{VFA,n-1}$ la estimación de $\theta^{VFA}$ después de $n-1$ actualizaciones. Existen métodos que nos permiten usar $\vhat^n_t$ para actualizar fácilmente $\thetabar^{VFA,n-1}$ y obtener $\thetabar^{VFA,n}$. Esto nos da una política VFA que podemos escribir como

$$
\begin{align}
X^{VFA}_t(S_t\vert \theta^{VFA}) &= \argmax_x \big(C(S_t,x) + \Vbar^x_t(S^x_t\vert \theta^{VFA})\big) \nonumber \\
                            &= \argmax_x \left(C(S_t,x) + \sum_{f\in\Fcal} \theta^{VFA}_f \phi_f(S^x_t)\right).
\label{eq:linearvfa}
\end{align}
$$

  Aproximar funciones de valor usando modelos lineales ha sido muy popular, pero prácticamente no existen garantías teóricas sobre la calidad de la solución resultante. Peor aún, hay evidencia empírica de que los resultados pueden ser bastante deficientes. Sin embargo, sigue siendo popular porque es una forma fácil de "obtener un número."

  También es popular hoy en día usar redes neuronales (especialmente redes neuronales profundas) para aproximar una función de valor. Las redes neuronales son atractivas ya que evitan la necesidad de diseñar el conjunto de características $(\phi_f(S_t))$ para $f\in\Fcal$. Se debe tener precaución, especialmente cuando tenemos que trabajar con observaciones ruidosas de la función de valor, ya que la enorme flexibilidad de las redes neuronales puede causar sobreajuste.
- **Aproximaciones de anticipación directa (DLAs)** – Las primeras tres clases de políticas requieren encontrar alguna forma de aproximación funcional: la política (para las PFAs), la función que se está optimizando (para las CFAs), o el valor de estar en un estado posterior (para las VFAs). Sin embargo, hay muchos problemas donde estas aproximaciones funcionales simplemente no son posibles.

  La forma "correcta" de resolver una DLA es resolver el problema real en el futuro, comenzando desde el estado $S_{t+1}$ producido al comenzar en el estado $S_t$, tomar la acción $x_t$, y luego observar la información aleatoria $W_{t+1}$. La parte difícil es que, además de modelar las incertidumbres futuras $W_{t+1}, W_{t+2}, \ldots$, también tenemos que tomar decisiones óptimas $x_{t+1}, x_{t+2}, \ldots$, cada una de las cuales depende del estado futuro $S_{t+1}, S_{t+2}, \ldots$, que son aleatorios.

  Aunque es bastante complicado (y quizás intimidante), esta política significa resolver

$$
\begin{align}
X^{\ast }(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\min_{\pi} \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesDLA}
\end{align}
$$

  Si pudiéramos calcular la ecuación $\eqref{eq:policiesDLA}$, tendríamos una política óptima. Es bastante raro que la ecuación $\eqref{eq:policiesDLA}$ pueda resolverse de manera exacta. El problema básico de la ruta más corta estocástica en el [Capítulo 5](/sdam/es/chapter-5/) es un ejemplo, pero esto se debe a que la incertidumbre surge de una manera particularmente simple.

  En la mayoría de las aplicaciones, abordamos la resolución de $\eqref{eq:policiesDLA}$ resolviendo un modelo de anticipación aproximado. En lugar de escribir nuestra secuencia de estados, decisiones e información como

$$
(S_0, x_0, W_1, \ldots, S_t, x_t, W_{t+1}, \ldots),
$$

  creamos un conjunto simplificado de estados, decisiones e información para un modelo que estamos resolviendo en el momento $t$ que representamos usando

$$
(\Stilde_{tt}, \xtilde_{tt}, \Wtilde_{t,t+1}, \ldots, \Stilde_{tt'}, \xtilde_{tt'}, \Wtilde_{t,t'+1}, \ldots),
$$

  donde $\Stilde_{tt'}$ es típicamente una variable de estado simplificada para el modelo de anticipación que creamos al tomar una decisión en el momento $t$, para el momento $t'$ en el modelo de anticipación. $\xtilde_{tt'}$ es nuestra decisión (posiblemente simplificada) creada para el momento $t'$ en el modelo de anticipación, y $\Wtilde_{tt'}$ es el proceso de información simplificado en el momento $t'$ en el modelo de anticipación. Las decisiones $\xtilde_{tt'}$ se toman usando una *política de anticipación* $\Xtilde^{\tilde \pi}\_t(\Stilde_{tt'})$ que típicamente es una política simplificada elegida porque es fácil de calcular.

  Nuestra política basada en nuestro modelo de anticipación aproximado se escribiría como

$$
\begin{align}
X^{DLA}(S_t) &= \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA}
\end{align}
$$

  La ecuación $\eqref{eq:policiesapproximateDLA}$ se ilustra usando el árbol de decisión en la Figura 7.1, que ilustra el uso de estados, decisiones e incertidumbres aproximados a medida que miramos hacia el futuro. Crear estas aproximaciones requiere una combinación de arte y ciencia. Queremos lograr un equilibrio entre modelar con precisión el futuro y equilibrar los requisitos computacionales.

<figure class="book-figure">
  <img src="/assets/images/sdam/stochasticdla.jpg" alt="Un árbol de decisión estocástico usando aproximaciones de estados, decisiones e incertidumbres." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 7.1.</span> Un árbol de decisión estocástico usando aproximaciones de estados, decisiones e incertidumbres, además de una política aproximada para tomar decisiones en el futuro. Los nodos cuadrados son donde tomamos decisiones, mientras que los círculos son donde observamos la información exógena.</figcaption>
</figure>

  El diseño de la política de anticipación $\tilde \pi$ (a veces llamada la política-dentro-de-una-política) depende en gran medida del problema. De hecho, podemos usar cualquiera de nuestras cuatro clases de políticas. La clave es que debe ser computacionalmente simple, ya que tendremos que calcularla muchas veces. Recuerde que el modelo de anticipación no tiene que ser exacto (en la mayoría de los casos nunca podríamos resolverlo si intentáramos usar un modelo de anticipación exacto). En cambio, estamos eligiendo aproximaciones que creemos producirán buenas decisiones ahora, aproximando decisiones que *podríamos* tomar en el futuro.

Ya hemos visto aplicaciones de este enfoque. Para el problema de la ruta más corta dinámica en el [Capítulo 6](/sdam/es/chapter-6/), recurrimos al enfoque ampliamente utilizado de resolver un modelo de anticipación determinista, donde tomamos la mejor estimación de lo que podría suceder en el futuro y resolvemos un problema de optimización determinista. Este enfoque ignora el efecto de las incertidumbres futuras, pero introdujimos la idea de usar un problema de optimización determinista parametrizado. Sin embargo, tenemos que ajustar el parámetro.

Estas cuatro clases de políticas (PFAs, CFAs, VFAs y DLAs) son universales, es decir, cualquier política elegida para un problema de decisión secuencial (*cualquier* problema de decisión secuencial) pertenecerá a una de estas cuatro clases. Sin embargo, estas también pueden ser bloques de construcción para políticas híbridas.

Hemos ilustrado las cuatro clases de políticas, lo que deja la pregunta: ¿cómo saber cuál usar? A veces parecerá obvio, como encontrar el mejor camino hacia un destino. Para problemas como este, una política de anticipación directa es una elección natural. Pero hay problemas donde cualquiera de las cuatro clases es un candidato viable.

Dos problemas donde hemos demostrado con éxito las cuatro clases son los problemas de inventario en el [Capítulo 1](/sdam/es/chapter-1/), y el problema de aprendizaje de diabetes en el [Capítulo 4](/sdam/es/chapter-4/). La clave es pensar cuidadosamente en las cuatro clases de políticas, en lugar de enfocarse solo en una, que es lo que ocurre con tanta frecuencia hoy en día.

## Modelos, revisitados

En esta sección haremos un recorrido por las diferentes aplicaciones, comenzando primero con una revisión de las variables de estado. Luego revisaremos las diferentes políticas, y clasificaremos las políticas que hemos visto en las cuatro clases.

### Variables de estado, revisitadas

Existe una considerable confusión en la literatura académica sobre lo que se entiende por una variable de estado, como lo evidencia la notable ausencia de definiciones de lo que es una variable de estado en libros sobre programación dinámica, programación estocástica y aprendizaje por refuerzo.

La única excepción a este patrón, que realmente destaca, es la literatura de control óptimo donde las definiciones de variables de estado son bastante comunes. En la comunidad de controles, una variable de estado se define comúnmente como "toda la información que necesitamos en el tiempo $t$ para modelar un sistema desde el tiempo $t$ en adelante." Sin embargo, lo que falta es cualquier descripción de precisamente qué información se necesita para modelar el sistema desde el tiempo $t$ en adelante.

Definimos dos versiones de variables de estado (de *Reinforcement Learning and Stochastic Optimization*, Sección 9.4):

> **Una variable de estado es:**
>
> **a) Versión dependiente de la política** – Una función de la historia que, combinada con la información exógena (y una política), es necesaria y suficiente para calcular la función de costo/contribución, la función de decisión (la política), y cualquier información requerida por la función de transición para modelar la información necesaria para las funciones de costo/contribución y decisión.
>
> **b) Versión de optimización** – Una función de la historia que es necesaria y suficiente para calcular la función de costo/contribución, las restricciones, y cualquier información requerida por la función de transición para modelar la información necesaria para la función de costo/contribución y las restricciones.

Necesitamos las dos versiones ya que si tenemos un sistema donde hemos especificado la estructura de una política, necesitamos asegurarnos de incluir cualquier información necesaria para la política. Por ejemplo, podemos tener un problema de inventario, donde consideramos dos políticas: una que usa un pronóstico de demandas futuras, mientras que la otra simplemente usa una política de pedido hasta un nivel objetivo. Si bien un pronóstico ciertamente parece relevante, si estamos usando una política de pedido hasta un nivel objetivo, no estamos usando el pronóstico, y como resultado no estaría en la variable de estado.

Es útil hacer un recorrido por nuestras aplicaciones hasta ahora y revisar las variables de estado de cada una. Para cada aplicación, resumiremos la variable de estado, que podríamos escribir como $S_t$ o $S^n$ dependiendo del contexto, y clasificaremos los elementos como variables de estado físico $R_t$, variables informacionales $I_t$, y variables de estado de creencia $B_t$.

**Capítulo 1 –** Este capítulo introdujo dos problemas de inventario que también fueron diseñados para resaltar diferentes matices de variables de estado. El problema de inventario simple se caracterizaba por una variable de estado $S_t$ que consiste solamente en el inventario $R^{inv}\_t$ en el tiempo $t$. Este problema es una de las aplicaciones más ampliamente utilizadas para ilustrar la programación dinámica.

El problema de inventario más complejo requería una variable de estado

$$
S_t = (\underbrace{R^{inv}_t}_{R_t},\underbrace{c_t}_{I_t},\underbrace{f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t}_{B_t}).
$$

Esta variable de estado ilustra las tres clases de información en variables de estado: las variables de estado físico $R_t = R^{inv}\_t$, otra información $I_t = c_t$, y las variables de estado de creencia $B_t = (f^D_{t,t+1}, \sigmabar^D_t, \sigmabar^f_t)$ donde $(f^D_{t,t+1},\sigmabar^D_t,\sigmabar^f_t)$ captura la media pronosticada y la desviación estándar del error de la demanda futura $\Dhat_{t+1}$, y la desviación estándar en el cambio de pronósticos desde el tiempo $t$ hasta $t+1$ (asumimos que el cambio en los pronósticos tiene media cero).

**Capítulo 2 –** Este capítulo introdujo un problema simple de venta de activos con la variable de estado

$$
S_t = (R^{asset}_t, p_t).
$$

donde la variable de estado físico $R_t$ captura si aún mantenemos el activo o no (también podría haber contenido cuántas acciones de la acción manteníamos), y el estado informacional $I_t = p_t$ es el precio al que vendemos la acción.

También introdujimos la idea de calcular una estimación suavizada del precio del activo usando

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

Luego diseñamos una política que tomaba decisiones basadas en cuánto se desviaba el precio $p_t$ de esta estimación suavizada. Ahora nuestra variable de estado se convierte en

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,\pbar_t)}_{I_t}\big).
$$

Ahora imaginemos que cuando decidimos vender nuestra acción en el tiempo $t$, vendemos a un precio desconocido $p_{t+1}$ que evoluciona según

$$
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1},
$$

donde $\varepsilon_{t+1}$ es un término de ruido de media 0. Ahora nuestra variable de estado se vería como

$$
S_t = \big(\underbrace{R^{asset}_t}_{R_t}, \underbrace{(p_t,p_{t-1},p_{t-2})}_{I_t}\big).
$$

**Capítulo 3 –** Aquí describimos un algoritmo de búsqueda basado en gradiente que evoluciona según una iteración clásica de búsqueda estocástica dada por

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \nabla_x F(x^n,W^{n+1}).  \label{eq:stochasticgradientaltransitionrevisited}
\end{align}
$$

Este procedimiento es un método para buscar el mejor valor de $x$, pero este es un problema de decisión secuencial donde el tamaño de paso $\alpha_n$ es la decisión. Si elegimos el tamaño de paso con una fórmula determinista tal como $\alpha_n =1/n$, entonces el "estado" de nuestro procedimiento de búsqueda es

$$
S^n = (x^n).
$$

Sin embargo, podríamos usar una fórmula de tamaño de paso adaptativa (estocástica) tal como

$$
\begin{align}
\alpha_n = \frac{\theta}{\theta + N^n - 1} \label{eq:adaptivealpharevisited}
\end{align}
$$

donde $N^n$ es el número de veces que el gradiente $\nabla_x F(x^n,W^{n+1})$ cambia de dirección, entonces necesitamos saber $N^n$, y nuestra variable de estado se convierte en

$$
S^n = (x^n,N^n).
$$

**Capítulo 4 –** Nuestro problema de diabetes es una instancia de un problema de aprendizaje puro, donde estamos tratando de aprender la verdadera respuesta $\mu_x$ de un paciente a un medicamento. Después de probar varios medicamentos, podríamos capturar nuestra creencia usando el estado

$$
S^n = (\underbrace{\mubar^n_x, \sigmabar^n_x}_{B^n})_{x\in\Xcal},
$$

donde asumimos que la verdadera respuesta $\mu_x \sim N(\mubar^n_x, (\sigmabar^n_x)^2)$.

Este modelo de creencia podría funcionar si tenemos una creencia diferente para cada paciente, pero presumiblemente comenzamos con un cuerpo de conocimiento sobre cómo funciona el medicamento en todos los pacientes. Podríamos capturar esto en un estado inicial

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal}.
$$

Ahora imaginemos que llega el $n$-ésimo paciente con atributos $a^n$ (género, peso, historial de tabaquismo, ...). La respuesta del paciente al medicamento $x$ dependería tanto del medicamento como de los atributos del paciente. Esto significa que nuestra variable de estado (es decir, la información que tenemos disponible para tomar la decisión) consiste en información que no controlamos (los atributos del paciente $a^n$), e información que sí controlamos (la elección del medicamento $x^n$). Así que escribiríamos nuestra variable de estado (la información que usamos para tomar la decisión) como

$$
S^n = (\underbrace{a^n}_{I^n}, \underbrace{(\mubar^n_x, \sigmabar^n_x)}_{B^n})_{x\in\Xcal},
$$

donde decidimos poner $a^n$ en nuestra variable de estado informacional $I^n$, y las variables $(\mubar^n_x, \sigmabar^n_x)$ en la variable de estado de creencia $B^n$.

**Capítulo 5 –** Para nuestro problema de ruta más corta estocástica, comenzamos con un problema básico donde un viajero incurre en un costo aleatorio al atravesar un enlace, pero solo conoce la media y la varianza de los costos antes de tomar una decisión en el nodo $i$ sobre qué enlace $(i,j)$ atravesar. Para este problema, el estado de nuestro viajero es simplemente el nodo $N_t$ donde está ubicado después de atravesar $t$ enlaces, dándonos

$$
S_t = N_t.
$$

Luego pasamos a un problema donde el viajero en el nodo $i$ puede ver los costos reales $\chat_{tij}$ en que incurriría si viajara por el enlace $(i,j)$. Con esta información adicional, la variable de estado se convierte en

$$
S_t = \left(\underbrace{N_t}_{R_t},(\underbrace{\chat_{t, N_t, j}}_{I_t})_{j\in\Ncal^+_i}\right).
$$

**Capítulo 6 –** Consideramos un problema de ruta más corta dinámica donde el costo estimado en el enlace $(i,j)$, $\cbar_{tij}$, evoluciona a lo largo del tiempo. Es decir, en el tiempo $t+1$, asumimos que se nos da un conjunto actualizado de estimaciones que denotaríamos $\cbar_{t+1}$. Imaginemos que nuestro viajero está en el nodo $N_t= i$. El estado de nuestro sistema (para nuestro viajero) estaría entonces dado por

$$
S_t = (\underbrace{N_t}_{R_t}, \underbrace{\cbar_t}_{I_t}).
$$

Ahora imaginemos que le mostramos al viajero un camino que designamos $p_t$ que es el conjunto de enlaces que planeamos usar para llegar desde su nodo actual $N_t$ hasta el destino. Digamos que acabamos de actualizar el camino, y le hemos preguntado al viajero si acepta el nuevo camino. Si dice que sí, el sistema de navegación continuará re-optimizando, pero introducirá una pequeña bonificación por mantenerse con el camino más reciente $p_t$ que el viajero acaba de aceptar (esto se hace para evitar que el sistema oscile entre dos caminos casi equivalentes).

Si $p_t$ es el camino aceptado más recientemente, entonces esta es información que necesitamos para tomar decisiones en el futuro. En este caso, nuestra variable de estado se convierte en

$$
S_t = (\underbrace{N_t}_{R_t}, (\underbrace{\cbar_t,p_t}_{I_t})).
$$

Estos problemas de decisión han ilustrado los tres tipos de variables de estado: variables de estado físico $R_t$, variables de estado informacional $I_t$, y variables de estado de creencia $B_t$. Hemos visto problemas que tienen solo $R_t$, o solo $B_t$, y combinaciones con $I_t$ tales como $(R_t, I_t)$ y $(I_t, B_t)$, así como las tres $(R_t, I_t, B_t)$. Enfatizamos que la distinción entre $R_t$ y $I_t$ puede a veces ser arbitraria, pero hay tantos problemas que involucran la gestión de recursos físicos o financieros (comprar, vender, mover, modificar), con decisiones que afectan (o están restringidas por) recursos físicos o financieros, que sentimos necesario crear una clase especial solo para recursos.

Pensamos que hay muchos problemas que involucran incertidumbre y que también involucran aprendizaje, y que pueden involucrar aprendizaje activo ya que las decisiones pueden afectar lo que observamos (como en el ejemplo de la diabetes). Sospechamos que, a medida que los modeladores se sientan cómodos incluyendo variables de estado de creencia en problemas de decisión secuencial, las veremos usarse con más frecuencia.

### Políticas, revisitadas

Nuestros seis contextos de aplicación (y en algunos casos las extensiones) fueron elegidos para exponer cada una de las cuatro clases de políticas. A continuación revisamos las diferentes políticas e identificamos la clase a la que pertenecen.

**Capítulo 1 –** Introdujimos dos problemas de inventario. Uno usó una política de pedido hasta un nivel objetivo de la forma

$$
X^\pi(S_t\vert \theta) = \begin{cases} \theta^{max} - R_t & \text{if } R_t < \theta^{min}, \\ 0 & \text{otherwise,}\end{cases}
$$

mientras que el segundo usó una política de llevar el inventario hasta la demanda pronosticada más un margen

$$
X^\pi(S_t\vert \theta) = \max\{0,f^D_{t,t+1}-R_t\} + \theta.
$$

Ambas políticas involucran uno o dos parámetros ajustables. Ambas son funciones analíticas que no tienen un operador de optimización incorporado ($\min$ o $\max$). Estas son las características distintivas de una aproximación de función de política (PFA).

**Capítulo 2 –** Este capítulo abordó el problema de determinar cuándo vender un activo. Se sugirieron varias políticas, pero muestras representativas son la política de "venta baja" dada por

$$
X^{sell-low}(S_t\vert \theta^{low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ and } R_t = 1, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

y la "política de seguimiento"

$$
X^{track}(S_t\vert \theta^{track}) = \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

Ambas políticas son similares a nuestra política de ordenamiento de inventario "pedido hasta un nivel objetivo" en que son funciones paramétricas con parámetros ajustables, lo que significa que son ejemplos adicionales de aproximación de función de política (PFA). Aunque esta no es la única forma de resolver un problema de venta de activos, esta clase de política es bastante popular en Wall St.

Las PFAs son populares en la práctica debido a su simplicidad y transparencia, pero es importante tener en cuenta: *¡El precio de la simplicidad son los parámetros ajustables... y ajustarlos es difícil!*

**Capítulo 3 –** Planificación adaptativa de mercado – Este problema implica el uso de un método de búsqueda basado en gradientes muy popular (véase la ecuación $\eqref{eq:stochasticgradientaltransitionrevisited}$) donde el tamaño de paso $\alpha_n$ es la decisión. Si tuviéramos un problema determinista, calcularíamos $\alpha_n$ resolviendo el problema de optimización unidimensional

$$
\alpha_n = \argmax_{\alpha \geq 0} \big(F(x^n + \alpha \nabla_x F(x^n))\big),
$$

que es una forma de aproximación de anticipación directa (DLA). Sin embargo, cuando tenemos que lidiar con la incertidumbre, una búsqueda unidimensional significa que tenemos que ser capaces de calcular la esperanza $F(x) = \E F(x,W)$, lo cual generalmente no es posible en la práctica. En su lugar, podríamos usar una política determinista como

$$
\alpha^\pi_n(\theta) = \frac{\theta}{\theta+n-1},
$$

donde la hemos escrito como una función parametrizada (es decir, una forma de PFA). También ilustramos una política adaptativa (dependiente del estado) dada por la ecuación $\eqref{eq:adaptivealpharevisited}$ donde reemplazamos $n$ con un contador $N^n$ que cuenta cuántas veces el gradiente cambia de dirección (o podríamos contar cuántas veces la función objetivo no mejora). Escribiríamos esta política como

$$
\alpha^\pi_n(S^n\vert \theta) = \frac{\theta}{\theta+N^n-1},
$$

donde nuestro estado $S^n$ lleva la información $N^n$.

Nota al margen: las políticas de estilo PFA se usan universalmente en los algoritmos de gradiente estocástico. Aunque estas pueden ser, de hecho, las mejores, la realidad es que nadie ha intentado siquiera usar las otras tres clases de políticas. Podría valer la pena echarles un vistazo.

**Capítulo 4 –** Aprendizaje del mejor tratamiento para la diabetes – Este es un problema de aprendizaje puro que hemos abordado utilizando la clase de políticas muy popular conocida como límites de confianza superiores (upper confidence bounding). Quizás la política UCB más conocida está dada por

$$
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right).
$$

Otra variante que funciona muy bien fue introducida originalmente como estimación de intervalo, y está dada por

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right).
$$

Finalmente, una variante que fue descubierta originalmente en 1933 y luego redescubierta hace unos años es el muestreo de Thompson, dado por

$$
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x.
$$

donde $\muhat^n_x$ se muestrea aleatoriamente de una distribución normal con media $\mubar^n_x$ y varianza $\theta^{TS} \sigmabar^n_x$.

Nótese que las tres políticas comparten dos características: un operador de optimización (un $\argmax_x$ para estas políticas) y un parámetro ajustable. Estas pueden considerarse problemas de optimización parametrizados, que pertenecen a la clase de aproximación de función de costo paramétrica (o CFA).

Las políticas CFA se usan ampliamente en la práctica, pero han recibido muy poca atención en la literatura académica fuera de la aplicación específica de políticas de aprendizaje como nuestra aplicación de diabetes. Vamos a ver esta idea aplicada en un entorno muy diferente en capítulos posteriores.

**Capítulo 5 –** Rutas más cortas estocásticas estáticas – Nuestro primer problema de ruta más corta estocástica asumió que un viajero incurría en costos estocásticos, pero estos se conocían solo después de recorrer un enlace. Esta suposición nos permitió resolver el problema como un problema de ruta más corta determinista, que se resuelve fácilmente usando la ecuación de Bellman, dándonos una política dada por

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\cbar_{tij} + V_{t+1}(S_{t+1}=j)\big).
$$

donde $S_t = N_t = i$ es el nodo donde se encuentra el viajero. Las funciones de valor $V_t(S_t)$ se calculan retrocediendo en el tiempo, comenzando en $t=T$ donde establecemos $V_T(S_T) = 0$ para todos los nodos $S_T$. Esta es una forma de política basada en aproximaciones de función de valor, y este es un caso raro donde una política VFA es en realidad óptima.

Luego pasamos a un problema más difícil donde se permite al viajero ver los costos $\chat_{tij}$ que salen del nodo $i = N_t$. Para este problema, la variable de estado se convierte en $S_t = (N_t, (\chat_{t,N_t,j},~j\in\Ncal^+\_i))$. Para este problema tuvimos que aproximar la función de valor usando el estado post-decisión $S^x_t = N^x_t$ donde $N^x_t$ es el nodo al que hemos decidido ir después de tomar nuestra decisión $x_t$ cuando estamos en el nodo $N_t$. En este caso, nuestra política se veía así

$$
X^\pi_t(S_t=i) = \argmin_{j\in\Ncal^+_i} \big(\chat_{tij} + \Vbar^x_t(S^x_t)\big).
$$

Esta es nuevamente una política basada en VFA, pero esta vez ya no es óptima, ya que $\Vbar^x_t(S^x_t)$ es una aproximación que tuvimos que estimar a partir de datos. Sin embargo, con cierto cuidado, podemos diseñar una política asintóticamente óptima.

**Capítulo 6 –** Rutas más cortas estocásticas dinámicas – Aquí encontramos un problema donde el costo estimado en cada enlace $\cbar_{tij}$ está evolucionando con el tiempo. Así, en el tiempo $t$, $\cbar_t$ es el vector de costos de enlace estimados, que se convierte en $\cbar_{t+1}$ en el siguiente periodo. Esto significa que nuestra variable de estado pasa de $S_t = N_t$, que es simplemente el nodo donde se encuentra el viajero, a $S_t = (N_t, \cbar_t)$, que es una variable de estado de dimensión extremadamente alta. Este no es un problema que podamos abordar ni siquiera con programación dinámica aproximada (es difícil imaginar una VFA construida en torno a esta variable de estado).

En su lugar, proponemos la idea de usar un modelo de anticipación, donde ignoramos el hecho de que, a medida que el viajero avanza por la red, el vector de costos de enlace estimados $\cbar_t$ evolucionará con el tiempo. En cambio, podemos suponer que es fijo (y supongamos que determinista). Esto significa que ahora tenemos un modelo de anticipación que es, de hecho, un problema de ruta más corta determinista, pero debemos recordar que estamos optimizando un modelo de anticipación determinista, lo cual es una política DLA. Por supuesto, sabemos cómo hacer esto de manera óptima, ¡pero una solución óptima a un modelo de anticipación aproximado no es una política óptima!

Los modelos de anticipación deterministas son populares, pero hay una manera de hacerlos aún mejores, sin volverlos más complicados. Introdujimos esa idea cuando sugerimos usar el percentil $\theta$ del costo en lugar de la media $\cbar_t$. Sea $\ctilde_{tij}(\theta)$ el percentil $\theta$ del costo en el enlace $(i,j)$ dado lo que sabemos en el tiempo $t$. Ahora, resolvamos un modelo de anticipación determinista usando los costos $\ctilde_{tij}(\theta)$. Ahora tenemos un modelo de anticipación determinista parametrizado, que es un híbrido de un CFA paramétrico y un DLA.

## Objetivos en línea frente a fuera de línea

Hay dos perspectivas para evaluar el desempeño de una política:

- **Aprendizaje en línea** – Hay muchos entornos en los que tenemos que aprender sobre la marcha en el campo. Por ejemplo, podríamos estar tratando de aprender el mejor precio para un producto, la mejor ruta a través de una ciudad congestionada, o el mejor medicamento para que un paciente reduzca su presión arterial. En cada uno de estos casos, queremos hacerlo tan bien como sea posible dado lo que sabemos, pero seguimos aprendiendo para poder tomar mejores decisiones en el futuro. Esto significa que necesitamos maximizar la *recompensa acumulada* a lo largo del tiempo (o de las iteraciones) para capturar cómo lo estamos haciendo mientras aprendemos.
- **Aprendizaje fuera de línea** – En otros casos, podemos aprender en un entorno de laboratorio, que podría ser un laboratorio físico (para probar diferentes materiales u observar el desempeño de un medicamento en ratones), un simulador de computadora, o incluso un entorno de campo que se está ejecutando como un mercado de prueba (para evaluar un producto) o un ensayo clínico (para probar medicamentos). Si estamos aprendiendo en un entorno de laboratorio ("fuera de línea"), entonces estamos dispuestos a realizar ensayo y error sin preocuparnos por cuán bien lo hacemos. En cambio, lo único que nos importa es la calidad de la solución al final, lo que significa que queremos optimizar la *recompensa final*.

Una palabra de advertencia sobre los términos en línea y fuera de línea. En la comunidad de aprendizaje automático, "fuera de línea" se refiere a la estimación de modelos usando un único conjunto de datos por lotes. Por el contrario, el aprendizaje en línea se usa para referirse a entornos completamente secuenciales donde los datos llegan con el tiempo. Esto ocurre típicamente en situaciones de campo donde los datos son generados por algún proceso exógeno (como observar a los pacientes que llegan al consultorio de un médico), que es el mismo entorno que asumimos al usar el término "en línea". Sin embargo, en el aprendizaje automático "en línea" todavía se usaría para referirse a un algoritmo iterativo utilizado en una simulación.

Hay campos enteros que tratan problemas de decisión secuencial y que se distinguen según si se centran en la recompensa final o en la recompensa acumulada. Por ejemplo, las comunidades que trabajan en "búsqueda estocástica" tienden a centrarse en la recompensa final, mientras que las comunidades que trabajan en "problemas de bandidos multibrazo" (una forma de problema de búsqueda estocástica) generalmente optimizan la recompensa acumulada. La realidad es que se puede usar la misma política para cualquiera de los dos objetivos, pero hay que ajustarla según el objetivo que se elija.

### Optimización en línea (recompensa acumulada)

Es típico, al hacer búsqueda de políticas, tener una política parametrizada que podemos escribir como $X^\pi(S_t\vert \theta)$. La decisión $x_t = X^\pi(S_t\vert \theta)$ podría ser el precio de un producto, la elección de un medicamento para la presión arterial o la oferta realizada para maximizar los clics en anuncios. En todos estos casos, tenemos que aprender sobre la marcha, lo que significa que necesitamos maximizar el desempeño mientras estamos aprendiendo.

Sea $C(S_t,x_t)$ nuestra métrica de desempeño (ingresos, reducción de la presión arterial, o ingreso neto de clics en anuncios). Queremos encontrar $\theta$ que produzca la política $X^\pi(S_t\vert \theta)$ que resuelva el problema de optimización

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S_0} \E_{W_1, \ldots, W_T\vert S_0} \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t\vert \theta))\vert S_0\right\}, \label{eq:derivativebasedonline}
\end{align}
$$

donde $S_{t+1} = S^M(S_t, X^\pi(S_t\vert \theta),W_{t+1})$. La esperanza en $\eqref{eq:derivativebasedonline}$ es sobre todas las posibles realizaciones de $W_1, \ldots, W_T$, así como sobre los posibles valores de parámetros incertos (como creencias iniciales incertas sobre las respuestas del mercado o cómo responde alguien a un medicamento) que están contenidos en el estado inicial $S_0$.

La ecuación $\eqref{eq:derivativebasedonline}$ es un ejemplo de una función objetivo "en línea" o de "recompensa acumulada", ya que queremos maximizar la suma de todas las recompensas a lo largo de cierto horizonte. Esto es de particular interés en problemas de aprendizaje en línea donde tenemos que aprender el desempeño, como los ingresos por un precio o el desempeño de un medicamento para un paciente particular, lo que significa equilibrar el proceso de aprendizaje mientras también tratamos de hacerlo tan bien como sea posible.

### Optimización fuera de línea (recompensa final)

En entornos fuera de línea, típicamente tenemos un presupuesto de $N$ experimentos. Un problema clásico (aunque poco apropiado) que se usa a menudo para ilustrar el aprendizaje fuera de línea sin derivadas es el problema del vendedor de periódicos, que abordamos en el [Capítulo 3](/sdam/es/chapter-3/). Como recordatorio, el problema del vendedor de periódicos se escribe como

$$
F(x) = \E_W \big(p \min\{x,W\} - cx\big),
$$

donde $x$ es la cantidad de recurso que pedimos a un costo unitario $c$, que luego se usa para satisfacer la demanda $W$ (que es desconocida cuando elegimos $x$). Suponemos que la distribución de $W$ es desconocida.

Sea $x^n = X^\pi(S^n\vert \theta)$ nuestra elección de $x$ dado lo que sabemos, lo cual está capturado por $S^n$, donde nuestra política $X^\pi(S^n\vert \theta)$ depende de uno o más parámetros en $\theta$. Después de implementar $x^n$, observamos $W^{n+1}$, actualizamos $S^{n+1}$ y luego repetimos el proceso. Después de $N$ iteraciones, obtenemos un diseño final que denotamos $x^{\pi,N}(\theta)$.

Ahora tenemos que evaluar nuestro diseño final $x^{\pi,N}(\theta)$. Para realizar esta evaluación, tenemos que considerar dos, y posiblemente tres, fuentes de incertidumbre. La primera es que podemos tener incertidumbre en parámetros desconocidos como la media de $W$. Por ejemplo, $W$ podría provenir de una distribución de Poisson con media $\mu$, y podemos suponer que $\mu \in \lbrace \mu_1, \ldots, \mu_K\rbrace $ donde $p_k = Prob[\mu = \mu_k]$. La distribución $(p_k)\_{k=1}^K$ está contenida en el estado inicial $S_0$.

Luego tenemos las llegadas aleatorias de demandas $W^1, \ldots, W^N$ que se muestrearían de una distribución con media $\mu$. Usamos estas observaciones, y la política $X^\pi(S^n\vert \theta)$, para calcular $x^{\pi,N}(\theta)$. Es importante reconocer que $x^{\pi,N}(\theta)$ es una variable aleatoria que depende de cualquier información en $S^0$ (independientemente de si es determinista o aleatoria).

Una vez que hemos calculado $x^{\pi,N}(\theta)$, tenemos que ejecutar un conjunto final de simulaciones para evaluar qué tan bien funciona. Introducimos una nueva variable aleatoria, $\What$, para representar muestras de $W$ utilizadas para evaluar nuestro diseño final.

Esta notación nos permite escribir nuestra función objetivo para el aprendizaje fuera de línea como

$$
\begin{align}
\max_\theta F^\pi(\theta) = \E_{S^0} \E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(x^{\pi,N}(\theta),\What).\label{eq:derivativebasedoffline}
\end{align}
$$

Hacemos hincapié en que escribimos las esperanzas simplemente como una manera de indicar que tenemos que promediar sobre información aleatoria. Abordamos el problema de calcular estas esperanzas a continuación.

### Evaluación de políticas

Las funciones objetivo para la recompensa acumulada (dada en $\eqref{eq:derivativebasedonline}$) y la recompensa final (dada en $\eqref{eq:derivativebasedoffline}$) se escribieron ambas usando esperanzas, que es nuestra manera de decir que estamos promediando sobre lo que sea aleatorio. Esto es agradable de escribir matemáticamente, pero estas casi nunca son computables.

Cuando debemos tomar una esperanza, resulta útil suponer que vamos a estimar la esperanza mediante muestreo. Primero ilustramos cómo hacer esto para el objetivo de recompensa acumulada dado en $\eqref{eq:derivativebasedonline}$. Aquí, podríamos tener una cantidad incierta en el estado inicial $S_0$, como la incertidumbre en cómo un mercado responde al precio, la producción de metano de un pozo petrolero, o cómo un paciente podría responder a un medicamento. Luego, tenemos la información exógena $W_1, \ldots, W_T$, que podría ser observaciones de ventas, el cambio en las temperaturas atmosféricas, o cómo responde un paciente a la medicación.

Sea $\omega$ una realización muestral de todas estas cantidades inciertas. Supongamos que generamos un conjunto de muestras de todas estas cantidades inciertas y las almacenamos en un conjunto $\Omega = \lbrace \omega^1, \ldots, \omega^K\rbrace $. Así, cada vez que escribimos $W_t(\omega)$, esto es una realización muestral de lo que observamos en el tiempo $t$. Si estamos usando una política $X^\pi(S_t\vert \theta)$, entonces seguiríamos la trayectoria muestral de estados $S_t(\omega)$, decisiones $x_t(\omega) = X^\pi(S_t(\omega)\vert \theta)$ e información exógena $W_{t+1}(\omega)$ gobernada por nuestra función de transición

$$
S_{t+1}(\omega) = S^M(S_t(\omega), x_t(\omega), W_{t+1}(\omega)).
$$

Usando nuestro conjunto de observaciones muestrales $\Omega$, podemos aproximar nuestra esperanza $F^\pi(\theta)$ usando

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \sum_{k=1}^K \sum_{t=0}^T C(S_t(\omega^k),X^\pi(S_t(\omega^k)\vert \theta)). \label{eq:simulatedcumulativereward}
\end{align}
$$

Si estamos usando un objetivo de recompensa final, primero necesitamos estimar $x^{\pi,N}(\theta)$. Si seguimos la trayectoria muestral $\omega$, entonces escribiríamos nuestro diseño final como $x^{\pi,N}(\omega\vert \theta)$, donde $\omega$ captura todo lo que usamos para realizar el entrenamiento dado por $(S_0(\omega), W_1(\omega), \ldots, W_T(\omega))$.

Luego necesitamos evaluar nuestro diseño $x^{\pi,N}(\omega\vert \theta)$ usando los datos de prueba capturados en $\What$. Sea $\psi$ una realización muestral de $\What$, y así como asumimos que tenemos un conjunto muestral $\Omega$ para $\omega$, supongamos que creamos un conjunto de resultados muestrales de $\What$ dado por $\Psi = \lbrace \psi^1, \ldots, \psi^L\rbrace $. Tenga en cuenta que $\What$ representa cualquier información simulada que necesitemos para evaluar nuestro diseño $x^{\pi,N}$. Puede ser un conjunto de variables aleatorias (atributos del paciente, clima, condiciones de mercado), e incluso puede representar información que evoluciona con el tiempo. En otras palabras... cualquier cosa.

Ahora escribiríamos la estimación del desempeño de la política en un entorno de recompensa final como

$$
\begin{align}
\Fbar^\pi(\theta) = \frac{1}{K} \frac{1}{L} \sum_{k=1}^K \sum_{\ell=1}^L F(x^{\pi,N}(\omega^k),\What(\psi^\ell)). \label{eq:simulatedfinalreward}
\end{align}
$$

### Reuniéndolos

La ecuación $\eqref{eq:derivativebasedonline}$ ilustra una función objetivo en línea, o de recompensa acumulada, donde debemos maximizar el desempeño total durante el proceso de aprendizaje. La ecuación $\eqref{eq:derivativebasedoffline}$ ilustra la función objetivo fuera de línea, o de recompensa final, donde debemos buscar el mejor diseño que funcione mejor en promedio después de fijar el diseño. Lo importante en este momento es que ambos problemas implican resolver

$$
\begin{align}
\max_\theta F^\pi(\theta), \label{eq:searchovertheta}
\end{align}
$$

donde $F(\theta)$ es una función desconocida que podemos muestrear de manera ruidosa.

Podemos expandir el objetivo en $\eqref{eq:searchovertheta}$ para incluir una búsqueda sobre diferentes clases de políticas. Sea $\Fcal$ el conjunto de todos los tipos posibles de políticas, incluyendo las clases principales (PFAs, CFAs, VFAs y DLAs), así como diferentes funciones dentro de cada una de estas clases. Luego sea $\Theta^f$ el conjunto de todos los vectores de parámetros posibles $\theta$ que corresponden a cualquier clase de política $f\in\Fcal$ que hayamos elegido. En este caso, podemos escribir nuestro problema de optimización como

$$
\max_{\pi=(f\in\Fcal, \theta\in\Theta^f)} F^\pi(\theta).
$$

En la práctica, tendemos a elegir la clase de política $f\in\Fcal$ usando la intuición y una comprensión de la estructura del problema, pero esto no siempre es obvio. Instamos a los lectores a estar dispuestos a usar la intuición y el sentido común, pero a tener en cuenta las cuatro clases. Esto no significa que deba probar las cuatro clases, pero debe estar preparado para defender por qué hizo la elección que hizo.

A continuación abordamos el problema de optimizar sobre $\theta$, que suponemos es continuo y, en la mayoría de los casos, de valor vectorial. Existen dos grandes clases de métodos de búsqueda que podemos aplicar para encontrar $\theta$: basados en derivadas, y sin derivadas.

### Dependencia del estado inicial

Independientemente de si estamos usando un objetivo de recompensa acumulada (como la ecuación $\eqref{eq:derivativebasedonline}$) o un objetivo de recompensa final (como la ecuación $\eqref{eq:derivativebasedoffline}$), nuestra optimización de $\theta$ dependerá del estado inicial $S_0$. Esto significa que cambiar la información en $S_0$ tiene el potencial de cambiar nuestros resultados, incluyendo la elección de la política.

El estado inicial $S_0$ contiene toda la información que afecta el comportamiento del sistema de cualquier manera. Puede incluir parámetros determinísticos, distribuciones sobre parámetros inciertos, e incluso la posición inicial del algoritmo de búsqueda.

La dependencia de las soluciones óptimas de la información en $S_0$ es ampliamente pasada por alto en la literatura algorítmica. Sería bueno si pudiéramos calcular la función $\theta(S_0)$ para capturar esta dependencia, pero estimar esta función es intratable. Esto significa que si $S_0$ cambia, es posible que tengamos que reoptimizar $\theta$. Eso estaría bien, salvo que hay muchas situaciones en las que $S_0$ cambia, y no reoptimizamos $\theta$ simplemente porque puede ser bastante difícil.

Esto es algo que el lector debe tener presente.

## Búsqueda de política basada en derivadas

Supongamos que estamos tratando de resolver el problema

$$
\begin{align}
\max_\theta F(\theta),  \label{eq:maxFtheta}
\end{align}
$$

donde $F(\theta)$ es alguna función paramétrica en $\theta$. Además, supongamos que $\theta$ es un vector y que podemos calcular el gradiente

$$
\nabla_\theta F(\theta) = \begin{pmatrix} \frac{\partial F(\theta)}{\partial \theta_1} \\ \frac{\partial F(\theta)}{\partial \theta_2} \\ \vdots \\ \frac{\partial F(\theta)}{\partial \theta_K} \end{pmatrix}.
$$

En la práctica, calcular derivadas exactamente a menudo no es posible.

Un método útil para manejar vectores de parámetros de mayor dimensión es la *aproximación estocástica de perturbación simultánea* (o SPSA, por sus siglas en inglés) desarrollada por Spall (2003), que aproxima los gradientes de la siguiente manera. Sea $Z_p, p=1, \ldots, P$ una muestra de realizaciones de variables aleatorias (podrían estar distribuidas normalmente) con media 0. Sea $Z^n$ el vector de dimensión $p$ con las realizaciones para la iteración $n$. Aproximamos el gradiente perturbando $x^n$ por el vector $Z$ usando $x^n+\eta^nZ^n$ y $x^n-\eta^nZ^n$, donde $\eta^n$ es un parámetro de escala que puede ser constante a lo largo de las iteraciones, o puede variar (típicamente irá disminuyendo).

Ahora sean $W^{n+1,+}$ y $W^{n+1,-}$ dos muestras diferentes de las variables aleatorias que impulsan la simulación (estas pueden generarse de antemano o sobre la marcha). Luego ejecutamos nuestra simulación dos veces: una para encontrar $F(x^n + \eta^nZ^n,W^{n+1,+})$, y otra para encontrar $F(x^n - \eta^nZ^n,W^{n+1,-})$. La estimación del gradiente viene dada entonces por

$$
\begin{align}
\nabla_\theta F(\theta^n,W^{n+1}) \approx \begin{bmatrix}
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_1} \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_2} \\[6pt]
\vdots \\[6pt]
\dfrac{F(x^n + \eta^nZ^n,W^{n+1,+}) - F(x^n - \eta^nZ^n,W^{n+1,-})}{2\eta^nZ^n_P}
\end{bmatrix}. \label{eq:SPSAgradient}
\end{align}
$$

Observe que el numerador de cada elemento del gradiente en la ecuación $\eqref{eq:SPSAgradient}$ es el mismo, lo que significa que solo necesitamos dos evaluaciones de la función: $F(x^n + \eta^nZ^n,W^{n+1,+})$ y $F(x^n - \eta^nZ^n,W^{n+1,-})$. La única diferencia es el $Z^n_p$ en el denominador para cada dimensión $p$ (esa es la magia de SPSA). (Véase *Reinforcement Learning and Stochastic Optimization*, Capítulo 5, sección 5.4.4, para una presentación sobre SPSA).

Una breve advertencia sobre la "magia" de SPSA es que los gradientes pueden ser bastante ruidosos. Por esta razón, una estrategia común es ejecutar múltiples simulaciones (llamadas mini-lotes en la literatura) de cada simulación perturbada y promediarlas. El tamaño apropiado de los mini-lotes depende de las características del problema, así que anticipe dedicar algo de tiempo a ajustar este parámetro.

Sea cual sea la forma en que calculemos el gradiente, nuestro algoritmo de búsqueda (que vimos en el [Capítulo 3](/sdam/es/chapter-3/)), viene dado por

$$
\theta^{n+1} = \theta^n + \alpha_n \nabla_\theta F(\theta^n,W^{n+1}).
$$

Ahora debemos elegir una política para el tamaño de paso $\alpha_n$, lo cual hemos discutido en el [Capítulo 3](/sdam/es/chapter-3/), pero véase *Reinforcement Learning and Stochastic Optimization*, Capítulo 6, para una discusión exhaustiva de las políticas de tamaño de paso. Recordamos al lector que un algoritmo de gradiente estocástico es en sí mismo un problema de decisión secuencial (como vimos en el [Capítulo 3](/sdam/es/chapter-3/)).

## Búsqueda de política sin derivadas

La búsqueda de política sin derivadas es simplemente otro ejemplo de un problema de decisión secuencial que es el foco de todo este volumen, con la principal diferencia de que la única variable de estado será la creencia sobre la función que estamos maximizando (que es lo mismo que en nuestra aplicación de diabetes en el [Capítulo 4](/sdam/es/chapter-4/)).

Podemos formar creencias usando cualquiera de las siguientes:

- **Tablas de búsqueda (lookup tables)** – Supongamos que podemos discretizar el conjunto de valores posibles de $\theta$ en un conjunto $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $. Defina una variable aleatoria $\mu_\theta = F(\theta) = \E F(\theta,W)$ que es una variable aleatoria porque no conocemos $F(\theta)$ (o $\mu_\theta$). Supongamos que podemos ejecutar experimentos para muestrear $\Fhat^{n+1} = F(\theta^n, W^{n+1})$. Podemos usar estas muestras para crear estimaciones $\mubar^n_\theta$ para cada valor discreto de $\theta \in \Theta$. Esto sería un modelo de creencia de tabla de búsqueda.

  El modelo de creencia más simple es una tabla de búsqueda con creencias independientes, que vimos por primera vez en el [Capítulo 4](/sdam/es/chapter-4/) con nuestra aplicación de diabetes. Sea $\mubar^n_\theta$ nuestra estimación de $\E F(\theta)$ para algún $\theta \in \lbrace \theta_1, \ldots, \theta_K\rbrace $ después de $n$ muestras (a través de todos los experimentos). Sea $\sigmabar^n_{\theta_k}$ la desviación estándar de la estimación $\mubar^n_{\theta_k}$ y sea $\beta^n_{\theta_k}$ la precisión dada por

  $$
  \beta^n_{\theta_k} = \frac{1}{(\sigmabar^n_{\theta_k})^2}.
  $$
- **Modelo paramétrico** – Podríamos estimar un modelo lineal de la forma

  $$
  F(\theta\vert \eta) \approx \eta_0 + \eta_1 \phi_1(\theta) + \eta_2 \phi_2(\theta) + \ldots
  $$

  donde $\phi_f(\theta)$ son características calculadas a partir del vector $\theta$, que podría consistir en términos como $\theta,$ $\theta^2$, o $\ln \theta$. Note que un "modelo lineal" significa que es lineal en los coeficientes $\eta$; las características $\phi_f(\theta)$ pueden ser funciones no lineales de $\theta$.

  Si bien los modelos lineales son populares, es probable que sean poco más que una aproximación local. Esto no es un problema si ajustamos el modelo lineal alrededor del punto correcto. ¡El problema es encontrar el punto correcto!
- **Modelos no paramétricos** – Los modelos no paramétricos se entienden mejor como aproximaciones locales de las funciones alrededor de algún conjunto de puntos (quizás elegidos al azar). La estimación podría ser una constante (lo más típico) o quizás una aproximación localmente lineal.

  Existen muchas formas de crear modelos no paramétricos. Quizás la más común sería crear una estimación $\mubar_\theta$ promediando sobre $\mubar_{\theta_1}, \ldots, \mubar_{\theta_K}$ para valores $\theta_k$ que están cerca de $\theta$. No vamos a recurrir a métodos no paramétricos en este libro, principalmente porque requieren muchos datos y son algo engorrosos de usar.

*Reinforcement Learning and Stochastic Optimization*, Capítulo 3, describe una serie de métodos para estimar funciones de forma recursiva, cubriendo varios modelos de creencia para tablas de búsqueda, modelos lineales y modelos no lineales. El capítulo también cubre tanto modelos bayesianos como frecuentistas. Ya vimos las ecuaciones recursivas para una tabla de búsqueda en nuestro ejemplo de diabetes, donde la actualización venía dada por las ecuaciones de transición en el [Capítulo 4](/sdam/es/chapter-4/) (estas ecuaciones asumen un modelo de creencia bayesiano). Más adelante ilustraremos la actualización recursiva de modelos lineales y no lineales.

Podemos modelar el proceso de realizar una búsqueda sin derivadas usando los cinco elementos del marco de modelado universal:

- **Variables de estado** – Esta sería la creencia sobre $\E F(x,W)$, que podemos escribir como $S^n = B^n$. La forma en que almacenamos el estado de creencia depende de si estamos usando tablas de búsqueda (y qué tipo de tabla de búsqueda), modelos lineales o no lineales. Si estamos usando nuestro modelo de creencia de tabla de búsqueda, usaríamos

  $$
  B^n = (\mubar^n_\theta,\beta^n_\theta),~\theta \in \{\theta_1, \ldots, \theta_K\}.
  $$
- **Variable de decisión** – La decisión es la elección $\theta^n$ de qué valor de $\theta$ evaluar en la función para obtener $\Fhat^{n+1} = F(x^n,W^{n+1})$. Hacemos nuestra elección $\theta^n = \Theta^\pi(S^n)$ usando una política $\Theta^\pi(S^n)$ que necesitamos diseñar.
- **Información exógena** – Normalmente pensamos en la información exógena como la observación muestreada $\Fhat^{n+1} = F(\theta^n,W^{n+1})$. Sea $\beta^W_\theta$ la precisión (uno sobre la varianza) del ruido al observar la función $F(\theta^n,W^{n+1})$ en un punto $\theta$.
- **Función de transición** – La función de transición viene en forma de las ecuaciones recursivas para actualizar nuestras creencias. Por ejemplo, las ecuaciones de actualización para las creencias de tabla de búsqueda en el [Capítulo 4](/sdam/es/chapter-4/) donde buscábamos el mejor medicamento para la diabetes. Nuevamente usando nuestro modelo de creencia de tabla de búsqueda, la función de transición sería

  $$
  \begin{align}
  \mubar^{n+1}_\theta &= \frac{\beta^n_\theta \mubar^n_\theta + \beta^W_\theta W^{n+1}_\theta}{\beta^n_\theta + \beta^W_\theta},\label{eq:thetatransition1}\\
  \beta^{n+1}_\theta &= \beta^n_\theta + \beta^W.\label{eq:thetatransition2}
  \end{align}
  $$
- **Función objetivo** – Lo más común es que usemos un simulador fuera de línea para buscar el mejor valor de $\theta$, lo que significa un objetivo de recompensa final. Sea $\theta^{\pi,N}$ el mejor valor del vector de parámetros $\theta$ derivado de nuestro modelo de creencia después de $N$ muestras. Por ejemplo, si estuviéramos usando un modelo de creencia de tabla de búsqueda, y obtuviéramos estimaciones $\mubar^N_\theta$ para cada elección $\theta$ después de $N$ experimentos, elegiríamos

  $$
  \theta^{\pi,N} = \argmax_{\theta\in\Theta} \mubar^N_\theta,
  $$

  donde el superíndice "$\pi$" en $\theta^{\pi,N}$ refleja el tipo de política de búsqueda $\pi$ usada al estimar $\mubar^N_x$. El problema de optimización para buscar la mejor política $\pi$ se escribiría

  $$
  \max_{\pi} \E_{S^0}\E_{W^1, \ldots, W^N\vert S^0} \E_{\What\vert S^0} F(\theta^{\pi,N},\What).
  $$

Recuerde que calculamos esperanzas usando simulación, tal como mostramos arriba, en la ecuación $\eqref{eq:simulatedcumulativereward}$ para la recompensa acumulada, o $\eqref{eq:simulatedfinalreward}$ para la recompensa final.

Esto nos deja con la pregunta: ¿Cómo diseñamos la política de búsqueda $\Theta^\pi(S^n)$? Esperamos que no sea una sorpresa que podamos elegir entre cualquiera de las cuatro clases de políticas. Las cuatro clases se discuten en profundidad en *Reinforcement Learning and Stochastic Optimization*, Capítulo 7, pero también nos referiríamos a la discusión de búsqueda de políticas en el Capítulo 12 de ese libro.

Para nuestros propósitos, vamos a ilustrar dos políticas que son relativamente simples y naturales.

- **Políticas de estimación de intervalos para modelos de creencia de tabla de búsqueda** – Repasamos varias políticas para el entorno de diabetes, pero una que es particularmente efectiva es la política de estimación de intervalos, dada por

  $$
  \begin{align}
  \Theta^{IE}(S^n\vert \theta^{IE}) = \argmax_{\theta\in\Theta} \left(\mubar^n_\theta + \theta^{IE} \sigmabar^n_\theta \right). \label{eq:thetaIE}
  \end{align}
  $$

  Ahora tenemos que buscar el mejor valor de $\theta^{IE}$. Piense en esto como un problema de decisión secuencial (encontrar el mejor $\theta^{IE}$) para resolver un problema de decisión secuencial (encontrar el mejor $\theta$ para nuestra política $X^\pi(S_t\vert \theta)$). Notamos que en la comunidad de búsqueda, el ajuste del parámetro $\theta^{IE}$ típicamente se pasa por alto en la literatura de investigación, pero los profesionales son conscientes de que hay que hacerlo.
- **Métodos clásicos de superficie de respuesta** – Para problemas donde $x$ es continuo, tiene sentido ajustar un modelo paramétrico a la función $\E F(x,W)$. Si bien hoy puede ser tentador usar redes neuronales, tenga en cuenta que estos son modelos de alta dimensionalidad que tienden a sobreajustar cualquier ruido. Hay muchos problemas donde $F(x,W)$ es costoso; por ejemplo, podría ser una simulación por computadora que podría tomar una hora o más, o podría requerir experimentos de campo.

  Por estas razones, una estrategia popular es usar un modelo lineal de la forma

  $$
  \Fbar(x) = \sum_f \theta_f \phi_f(x),
  $$

  donde $\phi_f(x)$ es una característica extraída del vector de entrada $x$. Suponga que hemos ejecutado $n$ experimentos usando entradas $x^0, \ldots, x^{n-1}$ a partir de las cuales hemos observado las respuestas $\Fhat^1, \ldots, \Fhat^n$. A partir de estos datos, podemos usar las técnicas de regresión lineal para ajustar nuestro modelo lineal con estimaciones $\theta \approx \thetabar^n$, lo que nos da la aproximación

  $$
  \Fbar^n(x) = \sum_f \thetabar^n_f \phi_f(x).
  $$

  La literatura sobre superficies de respuesta ha usado durante mucho tiempo la estrategia voraz de optimizar $\Fbar^n(x)$ para encontrar el siguiente punto a observar, lo que significa que escribiríamos

  $$
  \begin{align}
  x^n = \argmax_x \Fbar^n(x). \label{eq:responsesurfacegreedy}
  \end{align}
  $$

  Si bien esta idea es intuitivamente atractiva, resulta que usar lo que parece ser la mejor estimación del óptimo basada en nuestra aproximación $\Fbar^n(x)$ es en realidad una pésima manera de aprender la mejor aproximación de $\E F(x)$.

  La Figura 7.2 ilustra los desafíos de aprender una función paramétrica. Aquí mostramos tres curvas lineales de respuesta de demanda que dan la demanda como función del precio con la forma $D(p) = \theta_0 - \theta_1 p$. Nuestro objetivo es maximizar el ingreso $R(p) = pD(p)$. La Figura 7.2(a) muestra tres posibles curvas de demanda y las curvas de ingreso correspondientes.

<figure class="book-figure">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; max-width: 560px; margin: 0 auto;">
    <div><img src="/assets/images/sdam/learningrevenue1.png" alt="Panel (a): tres posibles líneas de respuesta de ventas y las curvas de ingreso correspondientes" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(a)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue2.png" alt="Panel (b): combinaciones observadas de precio-ventas si usamos precios que parecen maximizar el ingreso" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(b)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue3.png" alt="Panel (c): observación de precios extremos para mejorar el aprendizaje de la respuesta de ventas" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(c)</p></div>
    <div><img src="/assets/images/sdam/learningrevenue4.png" alt="Panel (d): equilibrio entre aprendizaje y ganancia" style="width: 100%;"><p style="text-align:center; margin: 0.25rem 0;">(d)</p></div>
  </div>
  <figcaption><span class="fig-num">Figura 7.2.</span> Aprendizaje activo de una función de respuesta de demanda: (a) Tres posibles líneas de respuesta de ventas y las curvas de ingreso correspondientes, (b) Combinaciones observadas de precio-ventas si usamos precios que parecen maximizar el ingreso, (c) Observación de precios extremos (altos y bajos) para mejorar el aprendizaje de la respuesta de ventas, y (d) Equilibrio entre el aprendizaje (observando lejos del medio) y la ganancia (observando precios cercanos al medio).</figcaption>
</figure>

  Es tentador querer cotizar precios que optimicen el ingreso como hacemos en la Figura 7.2(b), pero esto produce un conjunto de puntos en una bola que dificulta estimar la curva de demanda. La mejor manera de estimar la curva de demanda es cotizar precios cerca de los extremos como hacemos en la Figura 7.2(c), pero el ingreso es muy bajo en estos puntos, por lo que no ganamos dinero mientras aprendemos.

  Un buen enfoque es probar puntos en los "hombros", lo que significa no en el óptimo, pero tampoco demasiado lejos, como hacemos en la Figura 7.2(d), un comportamiento que logramos con una política que describimos a continuación.
- **Métodos de superficie de respuesta con perturbación** – Una política que supera el equilibrio entre exploración y explotación ilustrado en la Figura 7.2 usa una política de anticipación de un paso llamada el gradiente de conocimiento que elige $x^n$ como el valor que produce el máximo valor de información. Resulta que los puntos que maximizan el valor de información nos dan el patrón de muestreo ilustrado en la Figura 7.2(d).

  El gradiente de conocimiento es demasiado complejo para nuestra presentación aquí, pero hay una forma muy simple de obtener el mismo comportamiento. En lugar de tomar nuestra estimación actual del óptimo aparente $x^n$ como hacemos en $\eqref{eq:responsesurfacegreedy}$, lo perturbamos en una cantidad $\rho$, pero hay dos formas de hacer esto:

    - **Una política de desviación óptima** – La idea aquí es elegir un punto $x^n$ que esté a una distancia $\rho$ del óptimo $\xbar^n = \argmax_x \Fbar^n(x\vert \thetabar^n)$. Si $x$ es un vector $k$-dimensional, esta desviación puede crearse muestreando $k$ variables aleatorias distribuidas normalmente $Z_1, \ldots, Z_K$, cada una con media 0 y varianza 1, y luego normalizándolas de modo que

      $$
      \sqrt{\sum_{k=1}^K Z^2_k} = \rho.
      $$

      Sea $\Zbar^n$ el vector $k$-dimensional resultante. Ahora calcule el punto de muestreo usando

      $$
      x^n_k = \xbar^n_k + \Zbar^n_k.
      $$

      Note que en una dimensión, tendríamos $\Zbar^n = \pm \rho$.
    - **Una política de excitación** – Aquí nuevamente generamos un vector de perturbación $k$-dimensional $Z^n$, donde cada elemento tiene media 0 y varianza 1, y luego establecemos

      $$
      x^n_k = \Xbar^n_k + \rho Z^n_k.
      $$

      Mientras que la política de desviación óptima obliga a $x^n$ a estar a una distancia $\rho$ del óptimo $\xbar^n$, una política de excitación simplemente introduce una perturbación aleatoria con media 0, lo que significa que el punto más probable a muestrear es el óptimo de $\fbar^n(x\vert \thetabar^n)$.

  Sugerimos que la política de desviación óptima es más adecuada para objetivos de recompensa final fuera de línea, mientras que la política de excitación es mejor cuando estamos en un entorno en línea optimizando la recompensa acumulada.

## ¿Qué aprendimos?

- Repasamos las cuatro clases de políticas.
- Usamos todas las aplicaciones presentadas en los seis capítulos anteriores para contrastar los diferentes estilos de variables de estado, e ilustrar cada una de las cuatro clases de políticas.
- También describimos los objetivos de recompensa final y recompensa acumulada. Los objetivos de recompensa final surgen cuando estamos haciendo observaciones en un entorno experimental (en el laboratorio o en el campo), donde solo nos importa el desempeño del diseño final. Los objetivos de recompensa acumulada se usan cuando estamos aprendiendo mientras hacemos.
- Describimos tanto los métodos de búsqueda basados en derivadas como los libres de derivadas para realizar la búsqueda de parámetros.
- Notamos que tanto la búsqueda estocástica basada en derivadas como la libre de derivadas son problemas de decisión secuencial.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Qué distingue a las PFA de las otras tres clases de políticas?</li>
<li>¿Qué distingue a las VFA y las DLA de las PFA y las CFA?</li>
<li>En el Capítulo 1, la variable de estado para el problema de inventario más complicado consiste en variables de estado físico $R_t$, variables de estado de información $I_t$, y variables de estado de creencia $B_t$. ¿Qué distingue a una variable de estado de creencia de una variable de estado de información?</li>
<li>¿Cuál es la diferencia en las funciones objetivo para el aprendizaje en línea y fuera de línea?</li>
<li>Describimos la búsqueda estocástica basada en derivadas y la libre de derivadas como problemas de decisión secuencial. ¿Cuál de estas dos estrategias usa un estado de creencia, y por qué es esto necesario?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>La Figura 7.3 muestra un grafo determinista, donde estamos tratando de encontrar un camino desde el nodo 1 hasta el nodo 11 usando diferentes objetivos.
  <ol type="a">
    <li>Si nuestro viajero simplemente quiere minimizar el tiempo total de viaje del nodo 1 al 11, y actualmente ha recorrido el camino 1-2-6-9, ¿cuál es su estado?</li>
    <li>Ahora suponga que nuestro viajero debe llegar al nodo 11 antes del tiempo 45. Si llega después del tiempo 45, se le aplica una penalización igual al cuadrado del retraso. ¿Cuál es el estado del viajero que ha seguido el camino 1-2-6-9 hasta ahora?</li>
    <li>¿Cuál es el estado si el viajero que ha seguido el camino 1-2-6-9 quiere minimizar el segundo costo más alto en cualquiera de los enlaces a lo largo de su camino?</li>
  </ol>

<figure class="book-figure">
  <img src="/assets/images/sdam/statevariablemaxarccost.jpg" alt="Un grafo determinista." style="max-width: 500px;">
  <figcaption><span class="fig-num">Figura 7.3.</span> Un grafo determinista.</figcaption>
</figure>
</li>
<li>Historia real: una empresa de tecnología financiera ("fintech") tiene un sistema de negociación algorítmica para negociación de alta frecuencia. En el tiempo $t$, cuando un activo se negocia al precio $p_t$, estiman si el precio va a subir o bajar usando una serie de pronósticos de cómo podría cambiar el precio a lo largo de un horizonte deslizante dentro del día. Aquí, el tiempo se mide en incrementos de 15 minutos. Sea $f_{tt'}$ el precio estimado del activo en el tiempo $t'$ hecho dada la información en el tiempo $t$. Ahora cree un precio estimado usando

$$
\fbar_t(\theta) = \sum_{t'=t+1}^{t+H} \theta_{t'-t} f_{tt'},
$$

donde $\theta = (\theta_1, \theta_2, \ldots, \theta_H)$ es el vector de pesos para cada incremento de 15 minutos hasta seis horas hacia el futuro (24 incrementos). Sea $x_t = 1$ una decisión de vender en el tiempo $t$, $x_t = -1$ es una decisión de comprar, y $x_t = 0$ es mantener, donde la política es

$$
X^\pi(S_t\vert \theta) = \begin{cases} +1 & \text{if } \fbar_t(\theta) \geq p_t + 1.0, \\ 0 & \text{if } p_t - 1.0 < \fbar_t(\theta) < p_t + 1.0, \\ -1 & \text{if } \fbar_t(\theta) \leq p_t - 1.0. \end{cases}
$$

El desafío es optimizar el vector de pesos $\theta$.
  <ol type="a">
    <li>En el tiempo $t$, ¿cuál es el estado de este sistema?</li>
    <li>¿En qué clase de política estaría $X^\pi(S_t\vert \theta)$? Explique.</li>
    <li>Suponga que puede simular la política usando datos históricos en un simulador. Sea $F(\theta)$ el desempeño esperado de la política dado el vector de parámetros $\theta$. Escriba este objetivo suponiendo que va a simular la política usando una única muestra de historia.</li>
    <li>Describa cómo calcular una derivada numérica usando su simulador. Simplemente escriba la derivada numérica para un solo elemento $\theta_\tau$.</li>
  </ol>
</li>
</ol>
{% endraw %}