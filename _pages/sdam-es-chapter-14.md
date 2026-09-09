---
layout: book
book_data: sdam_toc_es
book_home: /sdam/es/contents/
title: "Capítulo 14: Optimización de ensayos clínicos"
permalink: /sdam/es/chapter-14/
date: 2026-07-17
lang: es
translated_from: en
translated_from_hash: d2f03f02e366eab2
---

{% raw %}
## Descripción general del capítulo

Para llevar un medicamento al mercado, las compañías farmacéuticas deben pasar por un proceso de pruebas de tres fases, terminando con la más costosa, la Fase III, donde el medicamento se administra a cientos o miles de pacientes. Cada semana, la compañía farmacéutica examina los resultados de los experimentos y debe tomar la decisión de si continuar las pruebas, detenerlas y salir al mercado, o detenerlas y cancelar el medicamento.

Existen varias fuentes de incertidumbre. La primera, por supuesto, es el desempeño del medicamento en sí. Sin embargo, para probar el medicamento tenemos que inscribir pacientes dispuestos a tomarlo (o un placebo), y esto introduce otra fuente de incertidumbre. Luego está la incertidumbre sobre la probabilidad de que un medicamento funcione en un paciente en particular, la cual es distinta del resultado real cuando se administra el medicamento a un paciente.

Usamos este entorno de problema para ilustrar tres políticas de anticipación directa diferentes, proponiendo distintas maneras de aproximar el problema, desde un modelo simple que nunca funcionaría hasta modelos más sofisticados que ofrecen mejor precisión a costa de mayor complejidad.

## Narrativa

En cualquier momento dado, las compañías farmacéuticas pueden estar ejecutando cientos de miles de ensayos clínicos que prueban nuevos medicamentos (véase [clinicaltrials.gov](https://clinicaltrials.gov)). Las pruebas de medicamentos ocurren en tres fases:

**Fase I** – Estas son pruebas realizadas con 20 a 100 voluntarios durante unos meses para determinar la dosis, identificar efectos secundarios y realizar una evaluación inicial de la respuesta al medicamento y sus efectos secundarios.

**Fase II** – Estos son ensayos más grandes con varios cientos de pacientes que abarcan dos años. El objetivo es determinar si la enfermedad responde al tratamiento.

**Fase III** – Estos son ensayos que involucran cientos o miles de pacientes, a menudo abarcando varios años, para evaluar la eficacia y la seguridad. Aquí es donde se determina si el tratamiento es mejor que los tratamientos existentes.

Tanto los ensayos de Fase II como los de Fase III requieren identificar pacientes con las características adecuadas para ingresar al ensayo, momento en el cual se les asigna aleatoriamente a uno de los grupos para su comparación.

En nuestro ejercicio, suponemos que inscribimos un conjunto de hospitales y clínicas cada semana para alcanzar una población *potencial*, de la cual se identificarán pacientes como candidatos para el ensayo con base en registros en papel. Existe un costo administrativo inicial para inscribir un hospital o clínica en el ensayo. El costo administrativo refleja el conjunto de pacientes que la institución podría aportar para el estudio. Por ejemplo, podría costar ＄250,000 inscribir a un grupo de hospitales y clínicas con una población potencial total de 500 pacientes. En nuestro modelo, simplemente estableceremos un costo de inscripción de ＄500 por paciente, teniendo en cuenta que esto corresponde a una población potencial total, de la cual extraemos las inscripciones reales.

Una vez que hemos inscrito una institución, anunciamos el ensayo clínico, a partir de lo cual los pacientes (o sus médicos) se presentan voluntariamente. En ese momento, el paciente es sometido a una evaluación más detallada, que determina quién es aceptado en el ensayo. Los pacientes no elegibles son entonces descartados.

Para efectos de este ejercicio, vamos a suponer que a cada paciente se le administra un medicamento al inicio de la semana. Al final de la semana, sabemos si el paciente está respondiendo o no. Los pacientes que responden se designan como éxitos, y el resto como fracasos. Cada semana, entonces, requiere un conjunto completamente nuevo de pacientes, pero estos se extraen de la población base que hemos inscrito. Solo podemos aumentar esta población incorporando más capacidad al ensayo y pagando el costo administrativo inicial.

## Enmarcando el problema

Las respuestas a nuestras tres preguntas de enmarcado son:

- **Métricas:** Maximizar el ingreso esperado recibido cuando un medicamento es aprobado para su uso, menos el costo semanal de ejecutar un ensayo, menos el costo de administrar el medicamento a cada paciente en el estudio.
- **Decisiones:** Hay tres tipos de decisiones que se toman al ejecutar un ensayo clínico: si continuar ejecutando el ensayo otra semana, o detenerlo; si se toma la decisión de detenerlo, debemos decidir si cancelar el medicamento o proceder al mercado; y si continuamos el ensayo, también debemos decidir cuántos pacientes nuevos inscribir.
- **Incertidumbres:** Hay dos fuentes de incertidumbre: cuántos pacientes se inscriben en el ensayo cada semana, y los resultados de cada paciente en el ensayo, ya sea que hayan recibido el medicamento o un placebo.

## Modelo básico

Suponemos que tomamos decisiones al final de cada semana $t$, para ser implementadas durante la semana $t+1$. Dejamos que el tiempo $t$ denote el final de la semana $t$.

### Variables de estado

Tenemos las siguientes variables de estado: $R_t$, la población potencial de pacientes que se encuentran en los hospitales y clínicas que se han inscrito; $\alpha_t$, el número de éxitos del tratamiento hasta la semana $t$ en el transcurso del ensayo clínico; $\beta_t$, el número de fracasos del tratamiento hasta la semana $t$; y $\bar\lambda^{response}\_t$, la fracción estimada de pacientes potenciales que eligen unirse al ensayo dado lo que sabemos en el tiempo $t$.

Usando esta información, podemos estimar la probabilidad de que nuestro tratamiento sea exitoso usando $\rho_t$, la probabilidad de que el tratamiento sea exitoso dado lo que sabemos al final de la semana $t$, de modo que

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Esto significa que nuestra variable de estado sería

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

Es razonable usar $R_0 = 0$ como el valor inicial de $R_t$, pero ayuda usar estimaciones iniciales de la probabilidad de éxito basadas en ensayos clínicos previos.

### Variables de decisión

Modelamos el número de pacientes potenciales que se inscriben usando $x^{enroll}\_t$, el incremento en la población potencial de pacientes que se adquiere al agregar nuevas instalaciones hospitalarias. El número de pacientes que realmente se unen al ensayo clínico se extraerá de esta población durante la semana $t+1$.

También tenemos la decisión de cuándo detener el ensayo, representada por

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

Si $x^{trial}\_t = 0$, entonces vamos a establecer $R_{t+1} = 0$, lo que cierra el ensayo. Suponemos que una vez que hemos detenido el ensayo, no podemos reiniciarlo, lo que significa que requeriremos que $x^{trial}\_t = 0$ si $R_t = 0$.

Si detenemos el ensayo, tenemos que declarar si el medicamento es un éxito o un fracaso,

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

Crearemos políticas $X^{\pi^{enroll}}(S_t)$, $X^{\pi^{trial}}(S_t)$ y $X^{\pi^{drug}}(S_t)$ que determinan $x^{enroll}\_t$, $x^{trial}\_t$ y $x^{drug}\_t$. Entonces podemos escribir

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

Como siempre, diseñamos las políticas más adelante.

### Información exógena

Primero identificamos a los nuevos pacientes y las bajas de pacientes hacia y desde el ensayo usando $\Rhat_{t+1}$, el número de nuevos pacientes que se unen al ensayo durante la semana $t+1$, que depende de la población potencial de pacientes que se inscribieron, dada por $R_{t+1} = R_t + x^{enroll}\_t$. Podríamos, por ejemplo, suponer que cada paciente en la población $R_{t+1}$ podría inscribirse en el ensayo clínico con cierta probabilidad $\lambda^{response}$ que debe estimarse a partir de los datos.

A continuación, hacemos seguimiento de nuestros éxitos con $\Xhat_{t+1}$, el número de éxitos durante la semana $t+1$, y $\Yhat_{t+1}$, el número de fracasos durante la semana $t+1$. El número de fracasos durante la semana $t$ puede calcularse como

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

Estas variables dependen del número de pacientes $R_t$ en el sistema al final de la semana $t$. Como siempre, dejamos para la sección sobre modelado de incertidumbre el desarrollo de los modelos de probabilidad subyacentes para estas variables aleatorias.

Nuestro proceso de información exógena es entonces

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

donde excluimos $\Yhat_{t+1}$ porque puede calcularse a partir de las otras variables.

### Función de transición

La ecuación de transición para el número de pacientes inscritos está dada por

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

Actualizamos la probabilidad de que el medicamento sea un éxito contando el número de éxitos y fracasos usando

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

Finalmente, actualizamos nuestra estimación del número de pacientes que se inscriben en el ensayo suavizando la estimación actual $\bar\lambda^{response}\_t$ con la última razón entre el número que se inscribió durante la semana $t+1$, $\Rhat_{t+1}$, y el número que está actualmente inscrito, $R_t + x^{enroll}\_t$.

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

Las ecuaciones $\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$ conforman la función de transición que representamos genéricamente usando

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### Función objetivo

Tenemos que considerar los siguientes costos: $c^{enroll}$, el costo de mantener a un paciente en el ensayo por período de tiempo; $c^{trial}$, los costos administrativos continuos de mantener el ensayo en marcha (esto se detiene cuando dejamos de hacer pruebas); y $p^{success}$, el (gran) ingreso obtenido si detenemos y declaramos éxito, lo que típicamente significa vender la patente a un fabricante.

La ganancia (contribución) en un período de tiempo estaría entonces dada por

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

Nuestra función objetivo, entonces, sería nuestra función objetivo canónica que expresamos como

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

donde reconocemos que nuestra política es una composición de la política de inscripción de pacientes $X^{\pi^{enroll}}(S_t)$, la política de continuación del ensayo $X^{\pi^{trial}}(S_t)$, y la política de éxito/fracaso del medicamento $X^{\pi^{drug}}(S_t)$.

## Modelado de la incertidumbre

Hay dos razones potenciales para desarrollar un modelo formal de incertidumbre. La primera es para el modelo base, que podemos usar tanto para diseñar políticas como para ejecutar estudios. La segunda es que podríamos querer modelar la incertidumbre en una política de anticipación estocástica.

Comenzamos desarrollando un modelo base probabilístico, lo que significa que haremos el mejor esfuerzo posible para modelar el problema real, reconociendo que todos los modelos matemáticos son aproximaciones del mundo real.

Necesitamos modelar tres variables aleatorias:

- El número de clientes $\Rhat_{t+1}$ que se inscriben en el ensayo.
- La tasa de éxito (no observable) $\rho^{true}$.
- El número de éxitos $\Xhat_{t+1}$, que sí observamos.

Abordamos cada una de estas a continuación.

### El proceso de inscripción de pacientes

Vamos a usar el modelo simple en el que tomamos decisiones (por ejemplo, al inscribir hospitales y clínicas) que nos permiten esperar inscribir $x^{enroll}\_t$ pacientes para la semana $t+1$, lo que nos da una población total de $R_{t+1} = R_t + x^{enroll}\_t$. La realidad será diferente. Proponemos modelar el número real de llegadas suponiendo que son Poisson con una media de $\bar\lambda^{response} (R_t + x^{enroll}\_t)$ donde $0 < \bar\lambda^{response} < 1$ es la fracción de pacientes potenciales que eligen unirse al ensayo (que es desconocida). Esto significa que podemos escribir

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

Podemos usar una distribución Poisson truncada para $\Rhat_{t+1}$, donde tenemos que reconocer que el número de pacientes que se unen al ensayo está limitado por el número de pacientes potenciales dado por $R_{t+1} = R_t + x^{enroll}\_t$. Sea

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

el número esperado de pacientes que se ofrecerán como voluntarios para el ensayo (dado $R_t$) y

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

Escribimos $P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$ como una función de $x^{enroll}\_t$ y $\Rbar_t$ para reflejar su dependencia de la decisión y del número $R_{t+1} = R_t + x^{enroll}\_t$.

La distribución Poisson truncada está entonces dada por

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

Para un proceso de población como este, un proceso de Poisson es un buen punto de partida. Tiene la propiedad de que la media es igual a la varianza, la cual es igual a $\Rbar_t$.

### La probabilidad de éxito

Los éxitos están impulsados por la probabilidad subyacente, pero no observable, de que el tratamiento produzca un éxito en un paciente durante una semana. Usamos el estilo bayesiano de asignar una distribución de probabilidad a $\rho^{true}$. Hay tres formas de representar la distribución de nuestra creencia sobre $\rho^{true}$:

- Una distribución previa uniforme, donde supondríamos que $\rho^{true}$ se distribuye uniformemente entre $0$ y $1$.
- Una distribución beta con parámetros $(\alpha_0,\beta_0)$.
- Una distribución muestreada, donde suponemos que $\rho^{true}$ toma uno de los valores del conjunto $(\rho_1, \ldots, \rho_K)$, donde dejamos que nuestra distribución inicial sea $p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$. Podríamos establecer $p_{0k} = 1/K$ (esto sería comparable a usar la distribución previa uniforme). Alternativamente, podríamos estimar estos valores a partir de la distribución beta.

Por ahora, vamos a usar nuestra distribución muestreada ya que es la más fácil de manejar.

### El proceso de éxito

El número aleatorio de éxitos $\Xhat_{t+1}$, dado lo que sabemos en el tiempo $t$, depende primero de la variable aleatoria $\Rhat_{t+1}$ que da el número de pacientes que ingresaron al ensayo, y de la probabilidad desconocida $\rho^{true}$ de éxito en el ensayo. La manera de crear la distribución de $\Xhat_{t+1}$ es usar el poder del condicionamiento. Suponemos que $\Rhat_{t+1} = r$ y que $\rho^{true} = \rho_k$.

Dado que $r$ pacientes ingresan al ensayo y suponiendo que la probabilidad de éxito es $\rho_k$, el número de éxitos $\Xhat_{t+1}$ es la suma de $r$ variables aleatorias de Bernoulli (es decir, 0/1). La suma de $r$ variables aleatorias de Bernoulli está dada por una distribución binomial, lo que significa

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

Podemos encontrar la distribución incondicional de $\Xhat_{t+1}$ simplemente sumando sobre $r$ y $k$ y multiplicando por las probabilidades correspondientes, lo que nos da

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

Usar distribuciones de probabilidad explícitas como la de $\Xhat_{t+1}$ en la ecuación $\eqref{eq:clinicaltrialsuccessdist}$ es conveniente cuando podemos encontrarlas (y calcularlas), pero existen muchos problemas complejos en los que esto no es posible. Por ejemplo, incluso la ecuación $\eqref{eq:clinicaltrialsuccessdist}$ requirió que usáramos el truco de utilizar una representación muestreada de la variable aleatoria continua $\rho^{true}$. Sin esto, habríamos tenido que introducir una integral sobre la densidad de $\rho^{true}$.

Otro enfoque, mucho más sencillo y que se extiende incluso a situaciones más complicadas, utiliza el muestreo de Monte Carlo para generar $\Rhat_{t+1}$ y $\Xhat_{t+1}$. Este proceso se describe a continuación, y produce una muestra $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$ (y el correspondiente $\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$). Ahora podemos aproximar la variable aleatoria $\Xhat_{t+1}$ con el conjunto de resultados $\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$, cada uno de los cuales puede ocurrir con igual probabilidad.

<div class="book-algorithm">
<p><strong>Un modelo basado en Monte Carlo del proceso de ensayo clínico</strong></p>
<p><strong>Paso 1.</strong> Repetir sobre las iteraciones $n=1, \ldots, N$:</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2a.</strong> Generar una muestra de Monte Carlo $r^n \sim \Rhat_{t+1}(x^{enroll})$ a partir de la distribución de Poisson dada por la ecuación $\eqref{eq:clinicaltrialpoisson2}$.</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2b.</strong> Generar una muestra de Monte Carlo de la probabilidad de éxito verdadera $\rho^n \sim \rho^{true}$.</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2c.</strong> Dados $r^n$ y $\rho^n$, iterar sobre nuestros $r^n$ pacientes y generar una variable aleatoria 0/1 que sea 1 (es decir, el fármaco fue un éxito) con probabilidad $\rho^n$.</p>
<p style="margin-left: 1.5rem;"><strong>Paso 2d.</strong> Sumar los éxitos y sea esto una realización muestral de $\Xhat^n_{t+1}$.</p>
<p><strong>Paso 3.</strong> Generar como salida la muestra $\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$.</p>
</div>

## Diseño de políticas

Vamos a usar este problema para comprender realmente a fondo nuestra política de anticipación estocástica completa, que presentamos por primera vez en el [Capítulo 7](/sdam/es/chapter-7/), dada por

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

Nos vamos a centrar en lo que significa esa maximización sobre políticas $\pi$ incrustada dentro de la política (esto podría llamarse la "política dentro de la política").

Para nuestra aplicación de ensayos clínicos, tenemos que diseñar políticas para las tres decisiones diferentes: el número de pacientes a inscribir, si continuar o no el ensayo, y si el fármaco se declara exitoso o no cuando se detiene el ensayo. Vamos a comenzar diseñando aproximaciones de función de política simples para las decisiones de si detener o continuar, y si detenemos, si declaramos el fármaco un éxito o un fracaso. Luego abordaremos la decisión más difícil de cuántos pacientes inscribir en el ensayo.

### Detener el ensayo

Comenzamos usando nuestra creencia sobre $\rho^{true}$ dada por la distribución beta con parámetros $(\alpha_t,\beta_t)$, lo que nos da una estimación de

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

Ahora introducimos los parámetros $\theta^{stop-low}$ y $\theta^{stop-high}$, donde vamos a detener el ensayo y declarar éxito si $\bar\rho_t > \theta^{stop-high}$, mientras que detendremos el ensayo y declararemos fracaso si $\bar\rho_t < \theta^{stop-low}$. Sea $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$. Usamos estas reglas para definir la política para detener el ensayo como

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

Si detenemos el ensayo, entonces la política para declarar éxito (1) o fracaso (0) está dada por

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### La política de inscripción de pacientes

Con frecuencia sucede que los problemas con un estado físico (como $R_t$) necesitan una política de anticipación, tal como usamos con nuestro problema de la ruta más corta estocástica. Pero, como vimos con el problema de la ruta más corta estocástica, podemos elegir qué incluir en nuestro modelo de anticipación estocástico.

Una decisión que tenemos que tomar es la política de detención $X^{trial}(S_t\vert \theta^{stop})$ y la política de éxito/fracaso $X^{drug}(S_t\vert \theta^{stop})$, donde proponemos usar el mismo vector de parámetros $\theta^{stop}$ en nuestro modelo de anticipación que en nuestro modelo base. Podemos referirnos a estos como $\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$ y $\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$, ya que ahora se aplican solo al modelo de anticipación.

El problema de determinar cuántos pacientes potenciales nuevos inscribir es algo más difícil, ya que es necesario pagar un costo inicial para adquirir más pacientes potenciales, y tenemos que hacer esto bajo incertidumbre sobre la disposición de los pacientes a unirse al ensayo (dada por el parámetro desconocido $\lambda^{response}$).

Para crear un modelo de anticipación completo como el que describimos anteriormente, crearíamos variables tales como $\tilde\lambda_{tt'}$ para la versión de anticipación de $\bar\lambda^{response}\_t$, $\tilde\rho_{tt'}$ para $\bar\rho_t$, y $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ para $(\alpha_t, \beta_t)$. Por lo demás, toda la lógica sería la misma que la del modelo de incertidumbre original.

Si bien podemos usar el modelo de incertidumbre completo, podemos optar por simplificar el modelo de diferentes maneras. Estas opciones incluyen:

- La tasa de inscripción $\bar\lambda^{response}\_t$ – Tenemos dos opciones: podemos continuar estimando $\bar\lambda^{response}\_t$, donde introduciríamos la notación $\tilde\lambda^{response}\_{tt'}$ como la estimación en el tiempo $t'$ en el modelo de anticipación de la tasa de inscripción $\lambda$; o podríamos fijar $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, que es nuestra estimación en el tiempo $t$ en el modelo base.
- La tasa de éxito del fármaco $\rho^{true}$ – Nuevamente tenemos dos opciones: podemos continuar estimando la tasa de éxito, para lo cual definiríamos las variables $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ para acumular éxitos y fracasos en el modelo de anticipación; o alternativamente podríamos fijar $(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$ dentro del modelo de anticipación.

Usando nuestras opciones para modelar la incertidumbre, podemos sugerir tres estrategias diferentes para diseñar un modelo de anticipación:

**Modelo A** – Modelo de anticipación determinista. Aquí, vamos a suponer que la tasa de inscripción $\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$, lo que significa que la tasa de inscripción está fija en la estimación en el tiempo $t$ cuando creamos el modelo de anticipación. Luego suponemos que la probabilidad de éxito verdadera del fármaco está fija en

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

que es nuestra estimación en el tiempo $t$ en el modelo base.

**Modelo B** – Fijamos nuestra estimación de la tasa de inscripción en $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$, pero suponemos que continuamos aprendiendo sobre la eficacia del fármaco.

**Modelo C** – Modelamos el proceso de aprendizaje de la tasa de inscripción $\tilde\lambda_{tt'}$ y la eficacia del fármaco $\tilde\rho_{tt'}$.

Observe que no incluimos el potencial cuarto modelo en el que fijamos la eficacia del fármaco pero continuamos aprendiendo la tasa de inscripción de pacientes (veremos en un momento qué tan absurdo sería este modelo).

Vamos a usar estos tres modelos para ilustrar el proceso de diseño de un modelo de anticipación.

### Modelo A

El Modelo A es un problema determinista, ya que estamos fijando tanto la tasa de inscripción estimada $\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$ como $\tilde\rho_{tt'} = \bar\rho_t$. La buena noticia es que esto es básicamente un problema de la ruta más corta determinista, donde el número de pacientes que hemos inscrito (en el modelo de anticipación), dado por $\Rtilde_{tt'}$, es como un nodo en una red, y la decisión $\xtilde^{enroll}\_{tt'}$ es un enlace que nos lleva al nodo $\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$.

Para ver esto, recordemos la ecuación $\eqref{eq:shortestpathbellman1}$ de nuestro problema de la ruta más corta determinista, que repetimos aquí

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

Ahora simplemente reemplazamos $v_i$ por el valor en el nodo $i$, con $\Vtilde_{tt'}(\Rtilde_{tt'})$, que es el valor de tener $\Rtilde_{tt'}$ pacientes inscritos (recuerde que estamos en nuestro modelo de anticipación). La decisión de ir al nodo $j$ se reemplaza por la decisión de inscribir a $\xtilde^{enroll}\_{tt'}$ pacientes. En lugar de que esto nos lleve al nodo $j$, nos lleva al nodo $\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$. Así, la ecuación de Bellman se convierte en

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

La función de ganancia de un período $\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$ se adapta de la misma función de nuestro modelo base (véase la ecuación $\eqref{eq:clinicaltrialprofit}$).

Solo hay un problema con nuestro modelo de anticipación determinista: nunca nos detendríamos, porque nuestra política para detener requiere que nuestra estimación de $\tilde\rho_{tt'}$ se mueva hacia las regiones de "éxito" o "fracaso" (tendría que comenzar en la región de "continuar", ya que de otro modo habríamos detenido el modelo base). Sin embargo, esto no significa que no podamos usar el modelo de anticipación determinista: solo tenemos que fijar un horizonte $H$ y detenernos cuando $t' = t+H$.

Usando esta estrategia, resolvemos nuestro problema de la ruta más corta determinista sobre el horizonte $t'=t, \ldots, t+H$, y luego a partir de esto encontramos $\xtilde^\ast \_{tt}$. Nuestra política de inscripción es entonces

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

No estamos afirmando que esta será una política efectiva. Estamos ilustrando principalmente los tipos de aproximaciones de modelado que se pueden hacer en un modelo de anticipación.

### Modelo B

Ahora vamos a fijar nuestra estimación de la tasa de respuesta $\tilde\lambda_{tt'}$ en nuestra estimación $\bar\lambda^{response}\_t$ en el tiempo $t$ en el modelo base. Para simplificar nuestro modelo, vamos a suponer que el número de inscripciones $\tilde\Rhat_{t,t'+1}$ es igual al número esperado de pacientes que se ofrecerán como voluntarios $\tilde\Rbar_{tt'}$. Las inscripciones $\tilde\Rhat_{t,t'+1}$ se generan de manera determinista a partir de

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

donde $\lfloor x \rfloor$ significa redondear $x$ hacia abajo al entero más cercano. Luego calculamos la distribución de $\tilde\Xhat_{t,t'+1}$ usando $Prob[\Xhat_{t+1} = s\vert \Rbar_t]$ pero donde reemplazamos $\Rbar_t$ con $\tilde\Rbar_{tt'}$.

Todavía tenemos que generar el número de éxitos $\tilde\Xhat_{t,t'+1}$ a partir de una verdad simulada $\tilde\rho_{tt'}$, a partir de la cual actualizaremos $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$, lo cual hacemos usando

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

Modelamos la distribución de $\tilde\Xhat_{t,t'+1}$ usando $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ en la ecuación $\eqref{eq:clinicaltrialsuccessdist}$ pero condicionando sobre $\tilde\Rbar_{tt'}$ en lugar de $\Rbar_t$ (recuerde que también podemos usar la distribución muestreada mediante el método de Monte Carlo anterior en lugar de la distribución de Poisson).

Podemos resolver el modelo de anticipación adaptando la ecuación de Bellman para el Modelo A en la ecuación $\eqref{eq:clinicaltrialbellmanModelA}$ para $t'=t, \ldots, t+H$:

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

donde $\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$ está condicionado al número de éxitos $\tilde\Xhat_{t,t'+1} = s$, y donde $Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$ proviene de la ecuación $\eqref{eq:clinicaltrialsuccessdist}$. Tenemos que tener en cuenta que la evolución de $\Rtilde_{tt'}$ debe reflejar si hemos decidido detener o continuar el ensayo dentro del modelo de anticipación.

Nuestra variable de estado físico (total de pacientes potenciales) $\Rtilde_{t,t'+1}$ está dada por

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

Observe que, como en nuestro modelo base, el número de pacientes potenciales cae a cero si detenemos el ensayo en el modelo de anticipación.

Nuestra estimación actual del éxito del fármaco (en el modelo de anticipación) se calcula usando

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

En la esperanza, si condicionamos sobre que el número de éxitos sea $\tilde\Xhat_{t,t'+1} = s$, entonces el estado de creencia actualizado $(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$ es

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

Ahora tenemos que resolver el modelo de anticipación usando la ecuación de Bellman en la <span style="white-space: nowrap;">ecuación $\eqref{eq:clinicaltrialbellmanModelB}$.</span> Para este problema, tiene sentido usar un horizonte $H$ suficientemente grande de manera que podamos suponer con confianza que habríamos detenido el ensayo para entonces (es decir, $\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$). Esto significa que podemos suponer que $\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$, y trabajar hacia atrás desde ahí hasta el tiempo $t$. Una vez que hemos resuelto el programa dinámico, podemos extraer nuestra decisión de inscripción usando

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### Modelo C

El Modelo C modela el proceso de aprendizaje de la tasa de inscripción $\tilde\lambda_{tt'}$ y la eficacia del fármaco $\tilde\rho_{tt'}$.

El Modelo C es casi igual al modelo base, ya que estamos modelando todas las distintas formas de incertidumbre. La única forma en que es un modelo de anticipación sería nuestra introducción de la política simplificada (nuestra "aproximación de función de política") para detener el ensayo, y para determinar si el fármaco es un éxito. Sin embargo, podríamos ignorar estas políticas y formular todo el problema como un programa dinámico, usando la variable de estado completa.

## ¿Qué aprendimos?

- Presentamos el problema del ensayo clínico para ilustrar los desafíos de un problema que involucra aprendizaje activo (hay variables de estado de creencia) mientras también se gestiona un recurso finito (el presupuesto para probar pacientes).
- Ilustramos tres tipos de incertidumbre: el proceso de inscripción de pacientes, la probabilidad de que el fármaco sea exitoso, y el proceso de éxitos para pacientes individuales.
- Identificamos dos decisiones: si detener el ensayo y declarar éxito o fracaso, y la admisión de pacientes en el ensayo.
- Luego diseñamos tres tipos de políticas de anticipación que se distinguen por la forma en que aproximamos el modelo de anticipación, y por cómo aproximamos las políticas dentro del modelo de anticipación.

## Ejercicios

**Preguntas de repaso**

<ol class="book-exercises">
<li>La variable de estado $S^n$ incluye creencias sobre dos cantidades incertidumbre. ¿Cuáles son estas cantidades incertidumbre, y cómo se capturan las creencias sobre ellas en la variable de estado?</li>
<li>Explique las tres decisiones que deben tomarse durante el ensayo clínico.</li>
<li>Explique los tipos de información exógena, y cómo se ven afectados por las decisiones y el estado del sistema.</li>
<li>Explique la lógica de la política de anticipación llamada Modelo A, y discuta sus fortalezas y debilidades.</li>
<li>Explique la lógica de la política de anticipación llamada Modelo B, y discuta sus fortalezas y debilidades.</li>
<li>Explique la lógica de la política de anticipación llamada Modelo C, y discuta sus fortalezas y debilidades.</li>
</ol>

**Preguntas de resolución de problemas**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>Arriba, escribimos la política de anticipación directa completa como</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

Si pudiéramos calcular esto realmente, tendríamos una política óptima. Vamos a explorar esta política, y luego aplicarla a nuestro problema de ensayo clínico.
  <ol type="a">
    <li>Suponga que cada variable aleatoria $W_{t+1}, \ldots, W_T$ solo puede tomar los resultados 0 o 1. A continuación, suponga que la decisión $x_t, \ldots, x_T$ también puede tomar solo los valores 0 o 1. La política en la ecuación $\eqref{eq:optDLAclinicaltrials2}$ puede ilustrarse como un árbol de decisión. Dibuje el árbol para el horizonte $t, t + 1, t + 2$.</li>
    <li>¿Cuál es la estructura de la política $X^\pi_{t'}(S_{t'})$ representada por el árbol de decisión en la parte (a)? Dicho de otro modo, ¿qué tipo de función es $X^\pi_{t'}(S_{t'})$ cuando se da mediante un árbol de decisión?</li>
  </ol>
</li>
<li><p>Dado que generalmente no podemos calcular la ecuación $\eqref{eq:optDLAclinicaltrials2}$, tenemos que reemplazar el modelo de anticipación completo por un modelo de anticipación aproximado que escribimos como</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

donde la dinámica de nuestro modelo de anticipación aproximado está gobernada por

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>Imagine que nuestra política en el modelo de anticipación es una función paramétrica tal como "dejar de inscribir pacientes cuando $\rhobar_t$ cae fuera del rango $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$." Para el propósito de esta pregunta, también podemos reemplazar la política de inscripción con una simple "inscribir $\thetatilde^{enroll}$ pacientes" (esto sería un parámetro estático). Podemos escribir esta función como $X^{\tilde \pi}(\Stilde_{tt'})$ donde $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$. ¿Cómo reescribiría la ecuación $\eqref{eq:policiesapproximateDLA3}$ para reflejar que la política en el modelo de anticipación es una función paramétrica?</li>
    <li>La parte (a) implica que tenemos que encontrar el mejor $\thetatilde$ para un estado dado $\Stilde_{t,t+1}$ en el tiempo $t$. Esto significa que la solución óptima es en realidad una función $\thetatilde_{t+1}(\Stilde_{t,t+1})$. Esto tendría que calcularse dado que estamos en el estado simulado $\Stilde_{t,t+1}$ en el modelo de anticipación aproximado.

    En la práctica, encontrar la política óptima cada vez que avanzamos un paso parece complicado (y costoso), ya que tendríamos que detenernos y ajustar $\thetatilde$ para cualquier estado $\Stilde_{t,t+1}$ en el que caigamos.

    Imagine ahora que quisiéramos simplificar el proceso encontrando solo un $\theta$ que usamos para todos los tiempos $t$, y cualquier estado $\Stilde_{t,t+1}$. Escriba el problema de optimización que tendría que resolver para encontrar este valor de $\theta$.</li>
    <li>¿Qué cambia en las ecuaciones $\eqref{eq:policiesapproximateDLA3}$ y $\eqref{eq:policiesapproximateDLA4}$ si reemplazamos la variable aleatoria $\Wtilde_{t,t'+1}$ en el modelo de anticipación con un pronóstico puntual $f^W_{tt'}$? Continúe suponiendo que la política es la función paramétrica que introdujimos en la parte (a).</li>
    <li>Describa las aproximaciones realizadas en el modelo de anticipación Modelo B para el problema del ensayo clínico.</li>
  </ol>
</li>
</ol>

**Preguntas de programación**

Estos ejercicios utilizan el módulo de Python *ClinicalTrialsDriverScript.py* en [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/).

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>Establezca el tamaño del ensayo en $T = 50$, el horizonte de anticipación en $H = 5$ y ejecute una simulación del Modelo A. Registre el tiempo de parada y explique por qué el modelo de anticipación determinista produce el mismo número de nuevos pacientes potenciales $x^{enroll}_{t}$ en cada tiempo $t$.</li>
<li>Ahora establezca el horizonte de anticipación en $H = 50$. Modifique el módulo *ClinicalTrialsDriverScript.py* para incluir un bucle for y ejecute 10 simulaciones (iteraciones de prueba) del Modelo B. Calcule el ingreso promedio sobre todas las simulaciones.</li>
<li>Al elegir $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ para nuestro PFA para determinar cuándo detenerse, normalmente elegimos un $\theta^{stop-high}$ suficientemente grande para asegurarnos de que el medicamento sea exitoso. Por el contrario, elegimos un $\theta^{stop-low}$ grande de modo que, si la tasa de éxito real del medicamento es baja, detengamos el ensayo temprano antes de perder demasiado dinero. Sin embargo, no podemos hacer que $\theta^{stop-low}$ sea demasiado alto, o de lo contrario corremos el riesgo de detener el ensayo antes de tener suficiente información sobre la tasa de éxito real del medicamento.

Fije $\theta^{stop-high} = 0.8$ y varíe $\theta^{stop-low}$ en el intervalo $[0.77, 0.79]$, en incrementos de 0.005. Para cada $(\theta^{stop-low}, \theta^{stop-high})$ resultante, ejecute 5 simulaciones del Modelo B y calcule el ingreso promedio. Grafique los ingresos resultantes contra los valores de $\theta^{stop-low}$.</li>
<li>Los Modelos A y B resuelven cada uno un problema de anticipación en el que al menos una de las estimaciones $\lambdabar_{tt'}$ y $\rhobar_{tt'}$ se fija en el tiempo $t$ en el modelo base. El Modelo C utiliza únicamente el modelo base en la forma de una política híbrida de búsqueda de políticas-VFA para modelar el proceso de aprendizaje tanto de la tasa de inscripción $\lambdabar_{tt'}$ como de $\rhobar_{tt'}$. Sin embargo, podemos crear una versión de anticipación del Modelo C (llamada Extensión del Modelo C) en la que las inscripciones $\tilde\Rhat_{t,t'+1}$ se generan a partir de la distribución de Poisson truncada con media

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

y la distribución de $\tilde\Xhat_{t,t'+1}$ es la misma que en el Modelo B.

Su tarea es implementar la Extensión del Modelo C agregando el método *model_C_extension_value_fn* al módulo de Python *ClinicalTrialsPolicy.py*. El método utiliza la model_C_extension_policy (que ya está en el código) que llama a *model_C_extension_value_fn* para calcular la función de valor para la ecuación de Bellman. Para escribir el método *model_C_extension_value_fn*, copie el código de *model_B_value_fn* y agregue un bucle for adicional para las nuevas inscripciones en $[0, x^{enroll})$ en pasos de $x^{enroll}/10$. Modifique el valor del paso y el costo de Bellman para tener en cuenta la Extensión del Modelo C (pista: use el método *trunc_probs*).

Establezca el tamaño del ensayo en $T = 50$, el horizonte de anticipación en $H = 5$ y ejecute una simulación de la Extensión del Modelo C. Reporte el tiempo de parada y el ingreso.</li>
</ol>
{% endraw %}