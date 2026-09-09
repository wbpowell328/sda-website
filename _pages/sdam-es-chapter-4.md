---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 4: Aprendiendo el mejor medicamento para la diabetes"
permalink: /sdam/es/chapter-4/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: 60758982728bf18e
---

{% raw %}
## Descripción del capítulo

Aprender la mejor elección de medicación para la diabetes retoma donde dejamos nuestro problema del vendedor de periódicos, donde los períodos de tiempo sucesivos están vinculados por lo que creemos sobre parámetros desconocidos. Aquí, estamos tratando de aprender cuál es la mejor de un conjunto de medicaciones para la diabetes para un paciente en particular. Probamos una medicación, observamos lo que asumimos es una respuesta ruidosa, y luego actualizamos nuestras creencias para decidir qué probar a continuación, donde queremos maximizar la reducción del azúcar en la sangre. Esta clase de problema se ha estudiado bajo una variedad de nombres, incluyendo problema del bandido multibrazo, búsqueda estocástica libre de derivadas, o ensayo y error inteligente.

En el corazón de este problema están nuestras creencias sobre cómo se desempeñarán las diferentes medicaciones. Para mantener la presentación tan simple como sea posible, asumimos que lo que observamos de una medicación no nos dice nada sobre el desempeño de otras medicaciones, una propiedad conocida como creencias independientes. Un caso más interesante y relevante capturaría creencias correlacionadas, pero esto habría complicado la presentación.

Consideramos solo los tipos más simples de políticas, que son todas formas de aproximaciones de función de política. Estas son bastante simples de usar, pero todas involucran parámetros ajustables, lo cual no se aborda en este capítulo.

Consideramos como una extensión el caso donde queremos usar lo que aprendemos de un paciente para otros pacientes con atributos similares. Esto introduce los atributos de un paciente en la variable de estado, produciendo lo que se conoce como un *problema de bandido contextual*, lo que significa aprender el desempeño de la medicación en el "contexto" de los atributos del paciente. Retomamos estos temas en un contexto de problema mucho más rico en el [Capítulo 12](/sdam/chapter-12/) para el problema de optimizar la elección de URLs a mostrar para maximizar los clics en anuncios.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Deseamos reducir el azúcar en la sangre del paciente (medido por la A1c) hasta un nivel objetivo.
- **Decisiones:** Para este capítulo, solo estamos eligiendo el tipo de medicación a administrar (normalmente también necesitaríamos encontrar la mejor dosis, pero asumimos que la dosis está determinada por el tipo de medicación y el peso del paciente).
- **Incertidumbres:** Cuánto reduce una medicación la A1c del paciente. Puede ser el caso de que el paciente no tolere una medicación, en cuyo caso estableceríamos la reducción de A1c en cero.

## Narrativa

Cuando las personas descubren que tienen azúcar alta en la sangre, típicamente evaluada usando una métrica llamada "A1c," hay varias docenas de medicamentos que se dividen en cuatro grupos principales:

- Sensibilizadores – Estos actúan sobre las células del hígado, músculo y grasa para aumentar directamente la sensibilidad a la insulina, pero pueden causar retención de líquidos y por lo tanto no deben usarse en pacientes con antecedentes de insuficiencia renal.
- Secretagogos – Estos medicamentos aumentan la sensibilidad a la insulina actuando sobre el páncreas, pero a menudo causan hipoglucemia y aumento de peso.
- Inhibidores de la alfa-glucosidasa – Estos ralentizan la velocidad del metabolismo del almidón en el intestino, pero pueden causar problemas digestivos.
- Análogos de péptidos – Estos imitan las hormonas naturales del cuerpo que estimulan la producción de insulina.

El medicamento más popular es un tipo de sensibilizador llamado metformina, que es casi siempre el primer medicamento que se prescribe a un nuevo diabético, pero esto no siempre funciona. Antes de trabajar con un paciente en particular, un médico puede tener una creencia sobre el potencial de la metformina, y de los medicamentos de cada uno de los cuatro grupos, para reducir el azúcar en la sangre, lo cual se ilustra en la Figura 4.1.

<figure class="book-figure">
  <img src="/assets/images/sdam/diabeteslearning2.jpg" alt="Creencias sobre el potencial que cada medicamento podría tener en la reducción del azúcar en la sangre." style="max-width: 420px;">
  <figcaption><span class="fig-num">Figura 4.1.</span> Creencias sobre el potencial que cada medicamento podría tener en la reducción del azúcar en la sangre.</figcaption>
</figure>

Un médico típicamente comenzará con metformina, pero esto solo funciona para aproximadamente el 70 por ciento de los pacientes. A menudo, los pacientes simplemente no pueden tolerar una medicación (puede causar problemas digestivos severos). Cuando este es el caso, los médicos tienen que comenzar a experimentar con diferentes medicamentos. Este es un proceso lento, ya que se necesitan varias semanas antes de que sea posible evaluar el efecto que un medicamento está teniendo en un paciente. Después de probar un medicamento en un paciente durante un período de tiempo, observamos la reducción en el nivel de A1c, y luego usamos esta observación para actualizar nuestra estimación de qué tan bien funciona el medicamento en el paciente.

Nuestro desafío es encontrar una política para identificar la medicación que logra la mayor reducción posible en el nivel de A1c de un paciente.

## Modelo básico

Para nuestro modelo básico, vamos a asumir que tenemos cinco opciones de medicaciones: metformina, o un medicamento (distinto de la metformina) extraído de uno de los cuatro grupos principales de medicamentos. Sea $\Xcal = \lbrace x_1, x_2, x_3, x_4, x_5\rbrace $ las cinco opciones. A partir de la observación del desempeño de cada medicamento en cientos o miles de pacientes, es posible construir una distribución de probabilidad de la reducción en los niveles de A1c en todos los pacientes. Los resultados de este análisis se muestran en la Tabla 4.1, la cual reporta la reducción promedio y la desviación estándar en todos los pacientes. Asumimos que la distribución de las reducciones en A1c en la población está distribuida normalmente, con medias y desviaciones estándar como se dan en la tabla.

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medicamento</th><th>Reducción de A1c</th><th>Desv. estándar</th></tr></thead>
<tbody>
<tr><td>Metformina</td><td>0.32</td><td>0.12</td></tr>
<tr><td>Sensibilizadores</td><td>0.28</td><td>0.09</td></tr>
<tr><td>Secretagogos</td><td>0.30</td><td>0.17</td></tr>
<tr><td>Inhibidores de la alfa-glucosidasa</td><td>0.26</td><td>0.15</td></tr>
<tr><td>Análogos de péptidos</td><td>0.21</td><td>0.11</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabla 4.1.</span> Metformina y las cuatro clases de medicamentos y la reducción promedio en toda la población.</p>
</div>

Para crear un modelo, sea $\mubar^0\_x$ la reducción media en la A1c para la elección de medicamento $x$ en toda la población, y sea $\sigmabar^0\_x$ la desviación estándar en la reducción de A1c para el medicamento $x$. Nuestro interés es aprender el mejor medicamento para un individuo particular. Aunque podemos describir al paciente usando un conjunto de atributos, por ahora solo vamos a asumir que las características del paciente no cambian nuestra creencia sobre el desempeño de cada medicamento para un paciente individual.

No conocemos la reducción que podemos esperar de cada medicamento, así que la representamos como una variable aleatoria $\mu_x$, donde asumimos que $\mu_x$ está distribuida normalmente, lo cual escribimos como

$$
\mu_x \sim N(\mubar^0_x, (\sigmabar^0_x)^2).
$$

Nos referimos a la distribución normal $N(\mubar^0\_x, (\sigmabar^0\_x)^2)$ como la *distribución de creencia previa* sobre $\mu_x$.

Indexamos cada iteración de prescripción de una medicación mediante $n$ que comienza en 0, lo cual se refiere al tiempo antes de que hayamos realizado ningún experimento. Asumamos que siempre observamos a un paciente durante un período fijo de tiempo (digamos, un mes). Si probamos un medicamento $x$ en un paciente, hacemos una observación ruidosa del valor verdadero $\mu_x$ de la respuesta del paciente a una medicación. Asumamos que hacemos una elección de medicamento $x^n$ usando lo que sabemos después de $n$ pruebas, después de lo cual observamos el resultado de la prueba número $n+1$, la cual denotamos $W^{n+1}$ (esta es la reducción en el nivel de A1c). Esto puede escribirse

$$
W^{n+1} = \mu_{x^n} + \varepsilon^{n+1}.
$$

Recuerde que no conocemos $\mu_x$; esta es una variable aleatoria, donde $\mubar^n_x$ es nuestra estimación actual de la media de $\mu_x$.

### Variables de estado

Nuestra variable de estado es nuestra creencia sobre la variable aleatoria $\mu_x$ que es el efecto verdadero de cada medicamento en un paciente particular después de $n$ pruebas. $S^0$ es el estado inicial, el cual escribimos como

$$
S^0 = (\mubar^0_x, \sigmabar^0_x)_{x\in\Xcal},
$$

donde también incluimos en $S^0$ la suposición de normalidad, la cual permanece a lo largo de todos los experimentos. Después de $n$ experimentos, el estado es

$$
S^n = (\mubar^n_x, \sigmabar^n_x)_{x\in\Xcal},
$$

donde ya no incluimos la suposición de normalidad porque está capturada en nuestro estado inicial (la distribución es estática, así que por convención no la incluimos en la variable de estado dinámica).

Más adelante, encontraremos útil trabajar con la *precisión* de nuestra creencia, la cual está dada por

$$
\beta^n_x = \frac{1}{(\sigmabar^n_x)^2}.
$$

Podemos entonces escribir nuestra variable de estado como

$$
S^n = (\mubar^n_x, \beta^n_x)_{x\in\Xcal}.
$$

Estamos usando lo que se conoce como un *modelo de creencia bayesiano*. En este modelo, tratamos el valor desconocido de un medicamento, $\mu_x$, como una variable aleatoria con una distribución previa inicial dada por $S^0$. Después de $n$ experimentos con diferentes medicamentos, obtenemos la distribución de creencia *posterior* $S^n$.

### Variables de decisión

La decisión es la elección de medicación a probar durante un mes, la cual escribimos como $x^n$, la elección de medicación, donde $x^n \in \Xcal = \lbrace x_1, \ldots, x_5\rbrace $. Vamos a determinar $x^n$ usando una política $X^\pi(S^n)$ que depende solo de la variable de estado $S^n$ (junto con la suposición de la distribución normal en $S^0$).

### Información exógena

Después de tomar la decisión $x^n$, observamos $W^{n+1}\_x$, la reducción en el nivel de A1c resultante del medicamento $x=x^n$ que prescribimos para la prueba número $n+1$. Un lector podría preguntarse por qué escribimos la información aprendida de la decisión $x^n$ como $W^{n+1}\_x$ en lugar de $W^n_x$. Hacemos esto para capturar la información disponible en cada variable. Así, la decisión $x^0$ depende solo del estado inicial $S^0$. El estado $S^n$ para $n\geq 1$ depende de $S^0$ junto con las observaciones $W^1\_{x^0}, \ldots, W^n_{x^{n-1}}$, pero no de $W^{n+1}\_{x^n}$, ya que aún no hemos completado la prueba número $n+1$ que revelaría $W^{n+1}\_{x^n}$. Al dejar que $W^{n+1}\_{x^n}$ sea el resultado de la prescripción $x^n$, sabemos que $x^n$ no puede depender de $W^{n+1}$, lo cual sería como ver hacia el futuro.

### Función de transición

La función de transición captura cómo la reducción observada en A1c, $W^{n+1}\_x$, afecta nuestro estado de creencia $S^n$. Aunque toma un poco de álgebra, es posible demostrar que si probamos el medicamento $x=x^n$ y observamos $W^{n+1}\_x$, podemos actualizar nuestra estimación de la media y la precisión usando

$$
\begin{align}
\mubar^{n+1}_x &= \frac{\beta^n_x\mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W},\label{eq:diabetestransition1}\\
\beta^{n+1}_x &= \beta^n_x + \beta^W.\label{eq:diabetestransition2}
\end{align}
$$

donde $\beta^W$ es la precisión de una observación (podemos hacer que esto dependa de $x$ si es necesario). Para todo $x\ne x^n$, $\mubar^n_x$ y $\beta^n_x$ permanecen sin cambios.

La función de transición, la cual anteriormente escribimos como una función genérica $S^{n+1} = S^M(S^n,x^n,W^{n+1})$, está dada por las ecuaciones $\eqref{eq:diabetestransition1}$–$\eqref{eq:diabetestransition2}$.

### Función objetivo

Cada vez que prescribimos un medicamento $x=x^n$, observamos la reducción en la A1c representada por $W^{n+1}\_{x^n}$. Queremos encontrar una política que elija un medicamento $x^n = X^\pi(S^n)$ que maximice la reducción total esperada en A1c. Nuestro modelo canónico usó $C(S^n,x^n,W^{n+1})$ como nuestra métrica de desempeño. Para este problema, esto sería

$$
C(S^n,x^n,W^{n+1}) = W^{n+1}_{x^n}.
$$

Escribimos el problema de encontrar la mejor política como

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}, \label{eq:diabetesobjective1}
\end{align}
$$

donde $x^n = X^\pi(S^n)$, y $S^{n+1} = S^M(S^n,x^n,W^{n+1})$. Aquí, la condicionalidad sobre $S_0$ es particularmente importante porque lleva consigo la distribución de creencia previa.

## Modelando la incertidumbre

Muestrear resultados aleatorios para nuestro problema de venta de activos fue relativamente simple. Para nuestro entorno médico, generar resultados de las variables aleatorias $W^1, \ldots, W^n, \ldots$ es un poco más complicado.

Con el problema de venta de activos, estábamos generando variables aleatorias con media 0 y una varianza dada que asumíamos conocida. En esta aplicación médica, la reducción en la A1c de un medicamento particular es una observación ruidosa de la media verdadera $\mu_x$ (para un paciente particular) la cual podemos escribir como

$$
W^{n+1} = \mu_x + \varepsilon^{n+1},
$$

donde $\varepsilon^{n+1}$ está distribuida normalmente con media 0 y una varianza (la cual asumimos conocida) dada por $(\sigma^W)^2$. El problema real es que no conocemos $\mu_x$. Dado lo que sabemos después de $n$ experimentos con diferentes medicamentos, asumimos que $\mu_x$ está distribuida normalmente con media $\mubar^n_x$ y precisión $\beta^n_x$. Escribimos esto como

$$
\begin{align}
\mu_x\vert S^n \sim N(\mubar^n_x, \beta^n_x) \label{eq:mugivenS}
\end{align}
$$

donde el lado derecho de $\eqref{eq:mugivenS}$ se lee "la media $\mu_x$ dado el estado $S^n$" lo cual significa que asumimos que sabemos que la media $\mu_x$ está dada por $\mubar^n_x$. Usamos la precisión $\beta^n_x$ (la cual es uno sobre la varianza) en lugar de la más habitual varianza cuando escribimos nuestra distribución normal. Luego escribimos la distribución de $W^{n+1}$ como condicionada en $\mu_x$ usando

$$
W^{n+1}\vert \mu_x \sim N(\mu_x, \beta^W_x).
$$

Esto significa que tenemos que simular dos variables aleatorias: el desempeño real del fármaco $x$ en nuestro paciente, dado por $\mu_x$ (dadas nuestras creencias después de $n$ experimentos), y luego el ruido $\varepsilon^{n+1}$ cuando intentamos observar $\mu_x$. Esto simplemente significa que, en lugar de generar una variable aleatoria normalmente distribuida, como hicimos en nuestro problema de venta de activos, tenemos que generar dos.

## Diseño de políticas

Una clase popular de políticas para esta clase de problemas cae en una categoría conocida como *acotamiento de confianza superior* (upper confidence bounding). Una de las primeras políticas UCB tiene la forma

$$
\begin{align}
X^{UCB}(S^n) = \argmax_{x\in\Xcal} \left(\mubar^n_x + 4 \sigma^W \sqrt{\frac{\log n}{N^n_x}}\right), \label{eq:diabetesUCB1}
\end{align}
$$

donde $N^n_x$ es el número de veces que hemos probado el fármaco $x$ (recordemos que "$\argmax_x$" devuelve el valor de $x$ que logra el máximo). Es una práctica estándar reemplazar el coeficiente $4 \sigma^W$ por un parámetro ajustable, lo que nos da

$$
\begin{align}
X^{UCB}(S^n\vert \theta^{UCB}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{UCB} \sqrt{\frac{\log n}{N^n_x}}\right). \label{eq:diabetesUCB2}
\end{align}
$$

Una variante popular que hemos encontrado que funciona sorprendentemente bien se introdujo originalmente bajo el nombre de *estimación de intervalo*, la cual está dada por

$$
\begin{align}
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} \left(\mubar^n_x + \theta^{IE} \sigmabar^n_x \right), \label{eq:diabetesIE}
\end{align}
$$

donde $\sigmabar^n_x$ es la desviación estándar de la estimación $\mubar^n_x$.

Las políticas $\eqref{eq:diabetesUCB2}$–$\eqref{eq:diabetesIE}$ comparten la estructura de elegir el fármaco $x$ que maximiza nuestra estimación de su desempeño $\mubar^n_x$ más un término que a menudo se denomina "bono de incertidumbre." La intuición detrás de estas políticas es que las estimaciones $\mubar^n_x$ pueden ser bajas debido a mala suerte. Sin el bono de incertidumbre, unos pocos resultados deficientes pueden significar que nunca volvamos a probar un fármaco. Estas políticas han atraído una atención considerable de la literatura de investigación, que puede derivar cotas teóricas sobre su desempeño, pero en última instancia todo depende de comparaciones experimentales usando datos realistas. Un paso importante en la evaluación de las políticas es el ajuste del parámetro $\theta^{UCB}$ o $\theta^{IE}$.

Una tercera estrategia que ha atraído una atención considerable se conoce como muestreo de Thompson. Este enfoque toma una muestra aleatoria de nuestra creencia sobre $\mu_x$ para cada fármaco $x$, y luego toma el mejor de estos. Más precisamente, sea

$$
\muhat^n_x \sim N(\mubar^n_x, \theta^{TS} \sigmabar^n_x)
$$

una muestra aleatoria extraída de una distribución normal con media $\mubar^n_x$ y desviación estándar $\sigmabar^n_x$, que es nuestra creencia actual sobre la respuesta real $\mu_x$. El parámetro $\theta^{TS}$ es un parámetro ajustable que influye en la incertidumbre que tenemos alrededor de la media estimada $\mubar^n_x$.

Ahora elija el fármaco a probar a continuación usando

$$
\begin{align}
X^{TS}(S^n\vert \theta^{TS}) = \argmax_{x\in\Xcal} \muhat^n_x. \label{eq:thompsonsampling}
\end{align}
$$

El muestreo de Thompson favorece las opciones donde el desempeño estimado $\mubar^n_x$, dado lo que sabemos después de $n$ observaciones (a través de todos los fármacos), pero aleatoriza el desempeño. La aleatorización fomenta la exploración, ya que los fármacos cuyo impacto estimado en la A1c puede no ser el más alto, aún tienen una posibilidad de resultar con el valor muestreado más alto $\muhat^n_x$.

Observamos que estas tres políticas, $X^{UCB}(S^n\vert \theta^{UCB})$, $X^{IE}(S^n\vert \theta^{IE})$, y $X^{TS}(S^n\vert \theta^{TS})$, comparten dos características: la política en sí requiere resolver un problema de optimización (el "$\argmax_x$"), y todas tienen parámetros ajustables. Por esta razón, todas estas son ejemplos de *aproximaciones de función de costo* (o CFAs).

## Evaluación de la política

Originalmente escribimos nuestra función objetivo como

$$
\max_\pi F^\pi(S_0) = \E \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\},
$$

pero escribir la esperanza de esta manera es un poco vago. Recordemos que tenemos dos conjuntos de variables aleatorias: los valores reales de $\mu_x$ para todos $x\in\Xcal$, y las observaciones $W^1, \ldots, W^N$ (o más precisamente, el ruido cuando intentamos observar $\mu_x$). Podemos expresar esta dependencia anidada escribiendo la función objetivo como

$$
\max_\pi F^\pi(S_0) = \E_\mu \E_{W^1, \ldots, W^N\vert \mu} \left\{\sum_{n=0}^{N-1} W^{n+1}_{x^n}\vert S_0\right\}.
$$

Hay dos formas de simular el valor de una política:

- **Muestreo anidado** – Primero simulamos el valor de la verdad $\mu_x$ para todos $x\in\Xcal$ donde dejamos que $\psi\in\Psi$ sea una realización muestral de $\mu$, que escribimos como $\mu(\psi)$. Luego simulamos las observaciones $W$, donde dejamos que $\omega\in\Omega$ sea una realización muestral de $W^1(\omega), \ldots, W^N(\omega)$, lo que significa que $\omega$ es un resultado de todas las observaciones posibles sobre todos los fármacos posibles $x\in\Xcal$, a través de todos los experimentos $n=1, \ldots, N$.
- **Muestreo simultáneo** – Aquí, dejamos que $\omega$ sea una realización muestral tanto de $\mu_x$ como de las observaciones $W^1, \ldots, W^N$.

Si usamos el muestreo anidado, supongamos que generamos $K$ muestras de los valores reales $\mu(\psi_k)$, y $L$ muestras de los errores $\varepsilon^1(\omega_\ell), \ldots, \varepsilon^N(\omega_\ell)$. Para la verdad muestreada $\mu(\psi_k)$ y el ruido $\varepsilon^n(\omega_\ell)$, el desempeño del fármaco $x^n$ en el $n+1$-ésimo experimento sería

$$
W^{n+1}_{x^n}(\psi_k,\omega_\ell) = \mu(\psi_k) + \varepsilon^n(\omega_\ell).
$$

Luego podemos calcular una estimación simulada del desempeño esperado de una política usando

$$
\Fbar^\pi(S_0) = \frac{1}{K} \sum_{k=1}^K \left(\frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\psi_k,\omega_\ell)\right),
$$

donde $x^n = X^\pi(S^n)$ y

$$
S^{n+1}(\psi_k,\omega_\ell) = S^M(S^n(\psi_k,\omega_\ell), X^\pi(S^n(\psi_k,\omega_\ell)), W^{n+1}(\psi_k,\omega_\ell)).
$$

Si usamos el muestreo simultáneo, entonces una muestra $\omega$ determina tanto la verdad $\mu(\omega)$ como el ruido $\varepsilon(\omega)$, lo que nos permite escribir una estimación muestreada de nuestra observación $W^{n+1}\_{x^n}$ como

$$
W^{n+1}_{x^n}(\omega_\ell) = \mu(\omega_\ell) + \varepsilon^n(\omega_\ell).
$$

El valor estimado de una política está dado por

$$
\Fbar^\pi(S_0) = \frac{1}{L}\sum_{\ell=1}^L \sum_{n=0}^{N-1} W^{n+1}_{x^n}(\omega_\ell).
$$

Si usamos una de nuestras políticas parametrizadas donde $\theta$ es el parámetro ajustable, podríamos escribir el desempeño esperado como $\Fbar^\pi(\theta\vert S_0)$. Entonces, el problema de optimización sería

$$
\begin{align}
\max_\theta \Fbar^\pi(\theta\vert S_0), \label{eq:diabetestuningpolicy}
\end{align}
$$

el cual podemos resolver usando una variedad de procedimientos de búsqueda, como los métodos que presentamos en este capítulo o en el [Capítulo 3](/sdam/chapter-3/). Revisamos los métodos de búsqueda con mayor profundidad en el [Capítulo 7](/sdam/chapter-7/).

## Extensiones

Hemos estado describiendo un problema que se aplica a un solo paciente. Esto significa que tendríamos que resolver este problema desde cero para cada paciente. Si tenemos un millón de pacientes diabéticos, entonces tendríamos un millón de modelos.

Imagine que nos gustaría usar información de diferentes pacientes para aprender un solo modelo. Podemos hacer esto caracterizando a cada paciente mediante un conjunto de atributos $a = (a_1, \ldots, a_K)$. Supongamos por el momento que cada elemento $a_k$ es discreto (por ejemplo, género) o discretizado (por ejemplo, edad, dividida en rangos). De hecho, vamos a comenzar suponiendo que hay un solo atributo, el género. Sea $G^n$ el género del $n$-ésimo paciente. Ahora tenemos dos formas de información exógena: el género $G^n$ del $n$-ésimo paciente, y el resultado $W^n$ del tratamiento del $n$-ésimo paciente.

Comenzamos con un estado de conocimiento $K^0$ que es nuestro vector $(\mubar^0, \beta^0)$ introducido anteriormente en el capítulo. El primer paciente tendrá el género $G^1$, lo que significa que nuestra variable de estado (es decir, todo lo que sabemos) después de que llega el primer paciente es $S^1 = (K^0,G^1)$. Luego tomamos una decisión $x^1$ respecto al tratamiento del paciente 1, después de lo cual observamos un resultado $W^1$ que describe cómo funcionó el tratamiento. Usamos esta información para obtener un estado de conocimiento actualizado $K^1$, después de lo cual el proceso se repite:

$$
\begin{align*}
&(K^0, G^1, S^1=(K^0,G^1), x^1, W^1, K^{1}, G^2, S^2=(K^1,G^2), \ldots, \\
&\hspace{0.75in} K^{n-1}, G^n, S^n=(K^{n-1},G^n), x^n, W^{n}, K^{n}, G^{n+1}, \ldots)
\end{align*}
$$

Nos detenemos un momento y notamos que nuestra indexación es diferente de la que usamos en el modelo básico. En nuestro modelo básico, el índice $n$ se refería a las visitas de un paciente. Tomamos una decisión $x^n$ *después* de la $n$-ésima visita usando lo que se conoce a partir de las primeras $n$ visitas. Dejamos que $W^{n+1}$ sea el resultado de este tratamiento, incrementando $n$ a $n+1$ para enfatizar que $x^n$ se calculó sin conocer $W^{n+1}$.

Con nuestro nuevo modelo, sin embargo, $n$ se refiere a un paciente. Tiene más sentido dejar que $G^n$ sea el género del $n$-ésimo paciente, momento en el cual tomamos una decisión para el $n$-ésimo paciente, y dejamos que $W^n$ sea el resultado del tratamiento para el $n$-ésimo paciente. No incrementamos $n$ hasta que vemos al $n+1$-ésimo paciente, momento en el cual vemos el género del $n+1$-ésimo paciente.

## ¿Qué aprendimos?

- Introdujimos la idea de un problema de decisión secuencial que es un problema puramente de aprendizaje, donde la variable de estado consiste únicamente en variables de estado de creencia.
- Vimos un ejemplo de un problema donde la incertidumbre estaba en el valor real del desempeño de una elección, como el medicamento para la diabetes.
- Introdujimos un ejemplo de una política de aproximación de función de costo que es una forma de problema de optimización parametrizado, e ilustramos esta idea usando tres tipos de políticas: acotamiento de confianza superior (que es una clase general de políticas), estimación de intervalo, y muestreo de Thompson.
- Observamos que cada política involucra un parámetro ajustable y formulamos el problema de ajustar dicho parámetro como su propio problema de optimización.
- Mostramos cómo modelar la presencia de variables de información exógena (como el género del paciente) como un problema de decisión secuencial completamente formulado, conocido en la literatura de aprendizaje como un "problema de bandido contextual" (el contexto es el género). En lugar de encontrar el mejor $x$, ahora buscamos el mejor $x(G)$ en función del género (podríamos ampliar esto con otros atributos de los pacientes).

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>¿Cuál es la diferencia fundamental, desde una perspectiva algorítmica, entre el problema de diabetes que resolvimos en este capítulo y el problema resuelto en el [Capítulo 3](/sdam/chapter-3/)?</li>
<li>Cuando dejamos que $\mubar^n_x$ sea la estimación de qué tan bien funciona el fármaco en un paciente después de $n$ pruebas, ¿qué mide $n$? ¿Es el número de veces que hemos probado el fármaco $x$?</li>
<li>¿Cuál es la variable de estado para este problema?</li>
<li>Anteriormente introdujimos una política de acotamiento de confianza superior, una política de estimación de intervalo, y una política basada en muestreo de Thompson. ¿Qué características tenían en común estas políticas?</li>
<li>¿Nuestra función objetivo optimizaba la recompensa acumulada o la recompensa final? ¿Por qué usamos esa versión? ¿Qué cambia si cambiamos a la otra función objetivo en términos de la búsqueda de una buena política?</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>Está tratando de determinar la dosis de un medicamento para la diabetes que produce la mayor reducción en el azúcar en sangre. Actualmente está experimentando con tres dosis que designamos por $d_1$, $d_2$ y $d_3$. Sea $\mu_i$ la reducción real en el azúcar en sangre producida por la dosis $i$. Después de $n$ experimentos con diferentes fármacos, sea $\mubar^n_i$ la estimación de la reducción producida por la dosis $d_i$. Deseamos explotar la observación de que nuestras creencias sobre $\mu_i$ están correlacionadas. Sea $\sigma_{ii'} = Cov(\mu_i, \mu_{i'})$ la covarianza en nuestra creencia sobre $\mu_i$ y $\mu_{i'}$.

Suponga que después de $n$ pruebas de diferentes dosis se nos da el vector actual de estimaciones

$$
\mubar^{n} = \begin{bmatrix} 32 \\ 42 \\ 20 \end{bmatrix}.
$$

Suponga que la varianza de un solo experimento es $16$ y que nuestra matriz de covarianza $\Sigma^n$ está dada por

$$
\Sigma^n = \begin{bmatrix} 8 & 4 & 2 \\ 4 & 8 & 4 \\ 2 & 4 & 8 \end{bmatrix}.
$$

  <ol type="a">
    <li>Escriba las ecuaciones para encontrar las estimaciones actualizadas $\mubar^{n+1}$ y la matriz de covarianza $\Sigma^{n+1}$ dada una observación $W^{n+1}$.</li>
    <li>Suponga que probamos la dosis $d_2$ y obtenemos una observación $W^{n+1} = 50$. Calcule las estimaciones actualizadas $\mubar^{n+1}$ y la matriz de covarianza $\Sigma^{n+1}$.</li>
  </ol>
</li>
<li>Muestre cómo adaptar la política presentada anteriormente a nuestro problema donde el género es el único atributo del paciente, usando una representación de tabla de búsqueda, lo que significa que en lugar de aprender $\mubar^n_x$, aprendemos $\mubar^n_{a,x}$ donde $a=$ género. Entonces, en lugar de aprender una estimación $\mubar^n_x$ para cada tratamiento $x$, tenemos que aprender una estimación $\mubar^n_{a,x}$ para cada combinación de género $a = G^n$ y tratamiento $x=x^n$.</li>
<li>Esboce una estrategia para aplicar las ideas de este capítulo al problema de planificación de mercado en el [Capítulo 3](/sdam/chapter-3/).</li>
<li>¿Es posible aplicar los métodos del [Capítulo 3](/sdam/chapter-3/) al problema de la diabetes? Explique.</li>
<li>Ahora imagine que, en lugar de solo el género, capturamos la edad por década $(0$–$9, 10$–$19, \ldots, 80^+)$, si fuma o no, y la raza (suponga ocho categorías de etnia), lo que nos da un vector de atributos $a = (a_{gender}, a_{age}, a_{smoker}, a_{race})$. Si $a\in\Acal$, ¿cuántos elementos tiene $\Acal$? ¿Cómo afectaría esto a su solución propuesta en el ejercicio 7?</li>
<li>Imagine que cada elemento $a_k$ en el vector de atributos $a$ tiene $L$ valores posibles, y que $a$ tiene $K$ elementos, lo que significa que $\Acal$ tiene $L^K$ elementos. Si $L = 10$, ¿cuál es el mayor valor de $K$ de modo que aprender nuestro modelo basado en atributos sea más fácil que aprender un modelo para cada uno de los 7 millones de pacientes diabéticos?</li>
<li>Ahora imagine que nuestro espacio de atributos $\Acal$ es simplemente demasiado grande para ser práctico. Lo que hemos hecho hasta ahora es una representación de tabla de búsqueda donde encontramos una estimación $\mubar^n_{a,x}$, lo cual se vuelve problemático cuando el número de valores posibles de $a$ se vuelve grande. Un enfoque alternativo es usar un modelo paramétrico. El más simple sería un modelo lineal donde escribiríamos

$$
\mubar_{a,x} = \sum_{f\in\Fcal} \theta_f \phi_f(a,x),
$$

donde $\phi_f(a,x)$ para $f\in\Fcal$ es un conjunto de características que nosotros (como analistas) tendríamos que definir. Por ejemplo, una característica podría ser simplemente un indicador de género, o rango de edad, o raza. En este caso, habría una característica para cada género posible, cada rango de edad posible, y así sucesivamente.
  <ol type="a">
    <li>Si hay $L$ valores posibles de cada uno de $K$ atributos, ¿cuál es el número mínimo de características que necesitaríamos?</li>
    <li>Sugiera características más complejas además de aquellas que simplemente indican el valor de cada atributo.</li>
    <li>Contraste las fortalezas y debilidades de una representación de tabla de consulta frente a nuestro modelo lineal.</li>
  </ol>
</li>
<li>Vamos a evaluar diferentes políticas para encontrar el mejor medicamento para reducir el azúcar en sangre. Suponemos que nuestra distribución de creencia previa para cada medicamento se da en la Tabla 4.1.

Comenzamos con una política de aprendizaje conocida como estimación de intervalo dada por

$$
X^{IE}(S^n\vert \theta^{IE}) = \argmax_{x\in\Xcal} (\mubar^n_x + \theta^{IE} \sigmabar^n_x).
$$

Usamos un modelo de creencia bayesiano donde es conveniente usar el concepto de *precisión*, que es simplemente uno sobre la varianza. Entonces, la precisión en nuestra estimación inicial del valor verdadero $\mu_x$ está dada por

$$
\beta^0_x = \frac{1}{(\sigma^0_x)^2},
$$

donde $\sigma^0_x$ se da en la Tabla 4.1.

Después de $n$ experimentos, vamos a usar nuestra política para tomar una decisión $x^n$ que es el medicamento a probar para el experimento $n+1$-ésimo. No conocemos el desempeño verdadero $\mu_x$ del medicamento $x$, pero podemos observarlo usando una observación ruidosa del valor verdadero $\mu_x$ que escribimos usando

$$
W^{n+1}_x = \mu_x + \varepsilon^{n+1}_x.
$$

Suponga que la desviación estándar de un solo experimento es $\sigma^W = 5$. Usamos la observación de $W^{n+1}_x$ para actualizar nuestras creencias usando:

  <ol type="i">
    <li>Si probamos el medicamento $x$:

    $$
    \mubar^{n+1}_x = \frac{\beta^n_x \mubar^n_x + \beta^W W^{n+1}_x}{\beta^n_x + \beta^W}, \qquad \beta^{n+1}_x = \beta^n_x + \beta^W.
    $$</li>
    <li>Si $x$ es un medicamento que no probamos, entonces:

    $$
    \mubar^{n+1}_x = \mubar^n_x, \qquad \beta^{n+1}_x = \beta^n_x.
    $$</li>
  </ol>

Responda lo siguiente:
  <ol type="a">
    <li>Usando un modelo de creencia bayesiano, ¿cuál es la variable de estado?</li>
    <li>¿Cuál es la función de transición para el modelo de creencia?</li>
    <li>Escriba el valor esperado de una política $X^\pi(S^n)$ usando el operador de esperanza $\E$. Asegúrese de indexar el operador para indicar qué variables aleatorias están involucradas, como en $\E_\mu$ o $\E_W$ (o $\E_{W_1,\ldots,M}$). Puede mostrar el condicionamiento usando $\E_{W\vert \mu}$ (esta es la esperanza sobre la reducción observada $W$ dado que conocemos la media verdadera $\mu$).</li>
  </ol>
</li>
<li>Podríamos pensar razonablemente que el parámetro $\theta^{IE}$ debería depender del número de experimentos restantes en nuestro presupuesto, lo que significa que $\theta^{IE}$ necesita ser una función de $n$ (o de manera equivalente, sería una función de los experimentos restantes $N-n$). Hay dos formas de representar esta función. Discuta (sin programación alguna) las fortalezas de cada enfoque, y los desafíos computacionales que estarían involucrados.
  <ol type="a">
    <li>Tabla de consulta – En lugar de buscar sobre un escalar $\theta^{IE}$, tendríamos que buscar sobre un vector $\theta^{IE}_n$.</li>
    <li>Paramétrico – Podríamos asumir una forma funcional como $\theta^{IE} = \theta^{slope}(N-n)$, donde ahora solo tenemos que ajustar el escalar $\theta^{slope}$.</li>
  </ol>
</li>
<li>Hemos abordado este problema como si estuviéramos resolviéndolo para cada paciente. Imagine que tenemos $I$ pacientes indexados por $i = 1, \ldots, I$, recordando que $I$ podría ser 10 millones de pacientes. Encontrar un vector de estimaciones $\mubar = (\mubar_x)_{x\in\Xcal}$ para cada paciente se escribiría $\mubar = (\mubar_{i})_{i=1}^I$ donde cada $\mubar_i = (\mubar_{ix})_{x\in\Xcal}$. Crear 10 millones de estimaciones parece un poco engorroso.

Imagine en cambio que cada paciente tiene un vector de atributos $a = (a_1,\ldots, a_M)$ donde $a \in \Acal$. Puede haber muchos atributos, en cuyo caso el conjunto $\Acal$ sería bastante grande, pero podemos elegir un subconjunto pequeño de manera que $\Acal$ no sea tan grande, tal como género y si fuman. Podemos usar de nuevo dos representaciones diferentes de $\mubar_{ax}$. Como antes, discuta las fortalezas y los desafíos computacionales de cada una de las siguientes formas de modelar $\mubar_{ax}$:
  <ol type="a">
    <li>Tabla de consulta – Enumeraríamos cada uno de los atributos $a \in \Acal$, y crearíamos una estimación $\mubar_{ax}$ del desempeño de cada medicamento $x$ y para cada atributo $a$. Este podría ser un conjunto grande, pero debería ser más pequeño que 10 millones.</li>
    <li>Paramétrico – Esto requiere proponer una forma paramétrica para $\mubar_{ax}$ para cada medicamento $x$. Una podría ser

    $$
    \mubar_{ax} = \sum_{f\in\Fcal} \thetabar_{fx} \phi_f(a).
    $$

    Las funciones $\phi_f(a)$ a veces se llaman funciones base (otros términos son variables independientes o covariables). Estas podrían ser variables indicadoras que capturan, por ejemplo, el género del paciente o si son fumadores. Esta representación reemplaza el cálculo de $\mubar_{ax}$ para cada atributo $a$ con el cálculo de un vector de coeficientes $\mubar_{ax}$ para un conjunto de características. El conjunto $\Fcal$ es presumiblemente mucho más pequeño que el conjunto de atributos (si este no es el caso, entonces deberíamos usar la representación de tabla de consulta).</li>
  </ol>
</li>
</ol>

**Preguntas de programación**

Estos ejercicios usan el módulo de Python *AdaptiveMarketPlanning* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 15;">
<li>Realice $L = 1000$ simulaciones de la política de estimación de intervalo sobre un presupuesto de $N = 20$ experimentos usando $\theta^{IE} = 1$. Sea $\Fhat^{IE}$ el desempeño de la política IE para una trayectoria de muestra particular. Suponga que el desempeño verdadero de un medicamento, $\mu_x$, se da en la Tabla 4.2, y use los supuestos para la desviación estándar de cada creencia de la Tabla 4.1. Use también la desviación estándar $\sigma^W = 5$ para la variación experimental como lo hicimos en el ejercicio 13.
  <ol type="a">
    <li>Calcule la media y la desviación estándar del valor de la política $\Fbar^{IE}(\theta^{IE})$ con $\theta^{IE}=1$.</li>
    <li>Evalúe la política IE para $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ y grafique $\Fbar^{IE}(\theta)$. ¿Qué aprende de este gráfico?</li>
  </ol>
</li>
<li>Evalúe la política IE dado un presupuesto $N = 20$ sobre los valores $\theta^{IE} = (0, 0.2, 0.4, \ldots, 2.0)$ para dos conjuntos diferentes de verdades:
  <ol type="a">
    <li>Primero suponga que la previa es $\mu^0_x = 0.3$ para todos los medicamentos $x$ y donde la desviación estándar inicial $\sigma^0_x = 0.10$. Esto significa que estamos suponiendo que la verdad $\mu_x \sim N(\mubar^0_x,(\sigmabar^0_x)^2)$. Sin embargo, vamos a muestrear nuestra verdad usando

    $$
    \muhat_x = .3 + \varepsilon
    $$

    donde $\varepsilon$ está distribuido uniformemente en el intervalo $[-0.15,+0.15]$. Este es un ejemplo de tener una distribución de creencia previa (en este caso, que está distribuida normalmente alrededor de 0.3) pero muestreando la verdad desde una distribución diferente (que está distribuida uniformemente alrededor de la media 0.3).

    Realice 10,000 repeticiones de cada valor de $\theta^{IE}$ para calcular el desempeño promedio. ¿Qué conclusiones puede extraer del gráfico resultante sobre los 11 valores de $\theta^{IE}$?</li>
    <li>Para este ejercicio vamos a simular nuestra verdad a partir de la previa usando

    $$
    \mu_x = \mubar^0_x + \varepsilon
    $$

    donde $\mubar^0$ se da en la Tabla 4.2 ("Reducción de A1c") y donde $\varepsilon$ está distribuido uniformemente en el intervalo $[-.5\mubar^0_x, +.5\mubar^0_x]$. Realice 10,000 repeticiones de cada valor de $\theta^{IE}$ para calcular el desempeño promedio. ¿Qué conclusiones puede extraer del gráfico?</li>
  </ol>
</li>
</ol>

<div class="book-table-wrap">
<table class="book-table">
<thead><tr><th>Medicamento</th><th>Reducción de A1c</th><th>Verdad</th></tr></thead>
<tbody>
<tr><td>Metformina</td><td>0.32</td><td>0.25</td></tr>
<tr><td>Sensibilizadores</td><td>0.28</td><td>0.30</td></tr>
<tr><td>Secretagogos</td><td>0.30</td><td>0.28</td></tr>
<tr><td>Inhibidores de la alfa-glucosidasa</td><td>0.26</td><td>0.34</td></tr>
<tr><td>Análogos peptídicos</td><td>0.21</td><td>0.24</td></tr>
</tbody>
</table>
<p class="book-table-caption"><span class="fig-num">Tabla 4.2.</span> Valores verdaderos para un paciente particular.</p>
</div>
{% endraw %}