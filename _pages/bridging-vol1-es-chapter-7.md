---
layout: book
title: "Capítulo 7: Notas finales"
permalink: /bridging-vol1/es/chapter-7/
date: 2026-07-17
book_home: /bridging-vol1/es/contents/
book_data: bridging_vol1_toc_es
lang: es
translated_from: en
translated_from_hash: 27ae8c37c9b69926
---


{% raw %}
<p class="book-byline"><em>Tendiendo puentes entre problemas de decisión, Volumen I — Enmarcando el problema</em> &middot; Warren B. Powell</p>

Este volumen se ha centrado en responder tres preguntas para ayudar a enmarcar prácticamente cualquier problema que involucre una decisión. Las preguntas son:

- **¿Cuáles son las métricas de desempeño?** Estas deben presentarse siguiendo las siguientes pautas:
  - Deben organizarse en pirámides como una forma informal de capturar el desempeño relativo.
  - Deben identificarse como objetivos (a minimizar o maximizar), metas o límites.
  - Finalmente, deben separarse entre métricas base y métricas de riesgo.
- **¿Qué tipos de decisiones se están tomando (y quién las toma)?** Estas deben identificarse mediante:
  - ¿Las decisiones actúan sobre recursos físicos, recursos financieros o información?
  - ¿Las decisiones son discretas o continuas, escalares o vectoriales?
  - ¿Con qué frecuencia se toman las decisiones y cuándo se implementan?
- **¿Cuáles son las fuentes de incertidumbre que afectan el desempeño?** Estas deben caracterizarse en función de:
  - ¿Cuáles de las 12 clases de incertidumbre son relevantes para el problema?
  - ¿Cómo impacta cada fuente de incertidumbre en la forma en que se toman las decisiones, y cómo impactan en las métricas de desempeño?
  - ¿Cómo se comporta cada fuente de incertidumbre? Esto debe capturar cómo se comportan a lo largo del tiempo, y cualquier correlación que necesite ser representada.

Por supuesto, estas preguntas suenan interesantes y relevantes, pero esto es todo lo que cubrimos en el Volumen I. Dimos un breve recorrido por las cuatro clases de políticas para tomar decisiones, pero no volveremos a este tema hasta el Volumen III. Antes de poder abordar la toma de decisiones, tenemos que completar otros detalles como identificar la información necesaria para tomar una decisión, y cómo evoluciona el sistema a lo largo del tiempo. Esto se cubre en el Volumen II, que también sienta las bases para evaluar las políticas que presentaremos en el Volumen III.

## Decisiones, decisiones

Tomamos tantas decisiones que a menudo vamos abriéndonos paso a través de los problemas sin siquiera reconocer que tenemos opciones. Podría decirse que la primera decisión que tenemos que tomar es qué tipo de análisis hacer para tomar una decisión. Cuatro categorías importantes de contextos de decisión incluyen:

1. **Decisiones donde existe el potencial de simplemente hacer un mejor trabajo:**
   - Una empresa de transporte de carga tiene que decidir qué cargas reservar para maximizar los ingresos mientras satisface las necesidades de sus conductores. Esto puede implicar decidir a qué cargadores debería ofrecer propuestas para intentar ganar su flete, lo que también requiere especificar qué precios cobrar, y si se deben hacer cambios en su flota.
   - Un fondo de cobertura quiere automatizar lo que había sido un proceso manual para seleccionar inversiones día a día. Los beneficios anticipados son un mejor desempeño con menos personal, reduciendo los costos administrativos.
   - Un fabricante quiere hacer un mejor trabajo administrando los inventarios de su cadena de suministro.
2. **Decisiones de alto volumen que requieren automatización:**
   - Un gran minorista tiene que gestionar inventarios de 50,000 artículos, lo que requiere revisiones diarias de inventario y decisiones de reabastecimiento.
   - Un hotel tiene que actualizar los precios de más de 10,000 ofertas diferentes de habitaciones/servicios en su sitio web.
   - La red eléctrica tiene que planificar los horarios de cientos de generadores de energía de manera continua.
   - Un gestor de fondos mutuos tiene que decidir en cuáles de 10,000 acciones invertir.
   - Un banco en línea podría tener que evaluar miles de solicitudes de préstamo cada día.

   Estas son decisiones que se toman en alto volumen, donde la toma manual de decisiones resulta engorrosa, y puede requerir capacitar a un gran número de personas.
3. **Decisiones de alto valor y alto riesgo** - Estas son decisiones que requieren análisis porque las opciones son de alto valor, con alta incertidumbre, lo que significa que existe un riesgo considerable:
   - ¿Debería una empresa comprar otra empresa? Hay mucho dinero involucrado, e incertidumbre en el desempeño de los nuevos mercados que están adquiriendo, y qué tan bien se combinarán las culturas corporativas.
   - ¿Debería una empresa farmacéutica llevar un medicamento a ensayos clínicos? Los costos totales pueden superar los 100 millones de dólares, y en promedio solo hay una probabilidad del 10 por ciento de que el medicamento finalmente sea exitoso.
   - Un paciente sufre una enfermedad grave, pero el único tratamiento pone en riesgo la vida del paciente.

   Estos son el tipo de problemas que típicamente son objeto de análisis cuidadosos utilizando árboles de decisión, a veces con la ayuda de consultores externos.
4. **Decisiones tomadas sin ningún análisis** - Estas son a menudo decisiones que afectan actividades complejas donde es poco probable que el análisis formal sea de valor, y las personas tienen una fuerte intuición sobre qué opciones tomar:
   - Una startup necesita aumentar las ventas. Después de una reunión del equipo ejecutivo, deciden aumentar el presupuesto de marketing, agregar dos vendedores, e incluir un paquete promocional para permitir que la gente pruebe el software a un costo muy bajo.
   - Una experta en salud pública está tratando de abordar un aumento en las sobredosis de drogas. Ella decide emprender una campaña de información, proporciona financiamiento adicional a grupos de reducción de daños, y habla con la policía local y las autoridades de salud.
   - Como fabricante de ropa en los Estados Unidos, obtiene la mayor parte de su tela de Bangladesh, que está siendo amenazado con un aumento drástico en los aranceles. Si estos se llevan a cabo, no podrá operar de manera rentable. ¿Qué hace?
   - El gerente de campaña de una campaña presidencial tiene que decidir dónde programar los discursos de un candidato durante las próximas dos semanas.

   En cada uno de estos casos, quien toma la decisión avanza guiándose por instinto, sin siquiera hacer una lista de las opciones alternativas que puedan requerirse. Si bien se puede argumentar que la decisión se basa en la experiencia pasada, típicamente hay incertidumbre y debería dedicarse algo de reflexión a pensar en estrategias dados diferentes resultados.

Nosotros argumentaríamos que todas las decisiones se benefician simplemente de comprender las métricas para evaluar el desempeño (incluyendo el riesgo), qué tipos de decisiones pueden tomarse, y las incertidumbres que pueden afectar el desempeño. Si estas se someten luego a un análisis más formal será una decisión de criterio de quien toma la decisión, que es la primera decisión que debe tomarse para un proyecto.

El objetivo de este volumen es evitar caer en la trampa de enmarcar un problema basándose en la familiaridad de la persona (o equipo) que hace el encuadre con herramientas específicas, ya sean árboles de decisión o grandes programas de enteros. El encuadre debe ser completamente independiente de cualquier caja de herramientas.

## Próximos pasos

Enmarcar un problema en términos de métricas, decisiones e incertidumbres es un primer paso crítico, uno que puede contribuir con claridad adicional para ayudar a comprender un problema, incluso si no hay un uso posterior de análisis cuantitativo. Sin embargo, habrá problemas que requieran un análisis más cuidadoso, o que exista una clara necesidad de automatización (como en los ejemplos anteriores).

Cuando hay interés en pasar a la computadora para la toma de decisiones, tenemos que anticipar los siguientes pasos:

1. **Identificar las métricas, decisiones e incertidumbres** que queremos incluir en nuestro modelo para abordar el objetivo o los objetivos últimos del proyecto. En este punto hay que tomar una decisión: usar la comprensión mejorada para tomar una decisión, o avanzar con un análisis adicional.
2. **Modelar matemáticamente** el problema elegido usando el marco de modelado universal, incluyendo el modelado de la incertidumbre. Esto se cubre en el Volumen II.
3. **Diseñar las políticas** para determinar las decisiones identificadas en el Paso 2, y ajustarlas usando el modelo desarrollado en el Paso 3. Este paso ayudará a identificar la información que se necesita. Esto se cubre en el Volumen III.
4. **Diseñar los procesos** para recopilar la información necesaria para tomar decisiones (calcular la política) y evaluar el desempeño.
5. **Implementar decisiones en el campo.** Esto requiere comunicar instrucciones y diseñar los procesos para implementar decisiones. Aquí es donde observamos y gestionamos el cumplimiento.
6. **Evaluar el desempeño** del proceso.

Es posible simular todos estos pasos en la computadora, lo que puede servir como un entorno de prueba. Los simuladores (a veces conocidos como "gemelos digitales") pueden ser útiles para evaluar y comparar políticas, pero pueden ser difíciles de construir y validar. Como implementación en campo, existen pasos significativos para crear procesos de recopilación de datos, así como sistemas para la implementación y el monitoreo del cumplimiento.
{% endraw %}
