---
layout: book
book_data: sdam_toc_zh
book_home: /sdam/zh/contents/
title: 第9章：储能 II
permalink: /sdam/zh/chapter-9/
date: 2026-07-17
lang: zh
translated_from: en
translated_from_hash: f45bf159515d3588
---


{% raw %}
<figure class="book-figure">
  <img src="/assets/images/sdam/renewablegridstorageload.jpg" alt="从风电场、电网和电池存储设备为负荷（建筑物）供电的能源系统。" style="max-width: 500px;">
  <figcaption><span class="fig-num">图 9.1。</span> 从风电场（风速可变）、电网（价格可变）和电池存储设备为负荷（建筑物）供电的能源系统。</figcaption>
</figure>

## 本章概览

本章通过研究一个更复杂的能源存储问题，扩展了[第 8 章](/sdam/zh/chapter-8/)中的模型，该问题将来自两个来源（一个风电场和电网）的能源结合起来，通过存储设备的帮助来满足一个随时间变化的负荷。这一问题的一个显著特征是，我们获得了一个每小时更新的24小时风力预测。这些预测会随着时间发生相当大的变化，因此引入了一种新的不确定性来源——不仅在于预测本身不完美，还在于预测本身会不断变化。

我们首先探讨两种对风力预测中的不确定性进行建模的方法。第一种方法称为高斯过程回归，适用于对连续过程建模，例如我们预期在未来24小时内产生的风能数量。

第二种方法使用了一种强大却又出人意料地简单的方法，它基于所谓的"隐状态模型"，使我们能够重现一种称为*穿越时间*的预测特性。这指的是预测值高于或低于实际值所持续的时间长度。在对存储问题建模时，这是一个重要的行为特征。

为了设计我们的策略，我们借鉴了在[第 6 章](/sdam/zh/chapter-6/)中首次介绍的技术：我们从一个确定性前瞻策略开始，然后引入参数使其随时间表现得更好。对于我们的能源问题，我们使用对风能预测的最佳估计乘以取决于我们向未来展望多少小时的系数来进行规划。这给我们提供了一个具有24个需要调优参数的确定性优化模型。

## 叙述

我们现在要解决图 9.1 中描绘的一个更复杂一些的能源存储问题。与我们之前那个只是从电网买卖能源的存储系统不同，我们现在面临的问题是利用风电场和电网的能源，并借助单个储能设备来平滑不同的过程，从而满足建筑物随时间变化的负荷。

这一问题还将展现出另一个显著特性，即所有外源过程（风力、价格、负荷和温度）都来自一个具有不同可预测性的动态过程：

- 负荷 —— 负荷（即对能源的需求）遵循一种相当可预测的模式，该模式取决于一天中的时间（一栋建筑物需要在上午8点人们开始出现之前达到特定温度）以及温度。
- 温度 —— 温度是一个相当可预测的过程，取决于一天中的时间和季节，但也反映了可以在一定精度内预测的当地天气状况。
- 风力 —— 有供应商提供风力预测服务，但这些预测并不十分准确，甚至在一天之内也会相当快速地演变（见图 9.2）。
- 价格 —— 电网上的电价反映了供求关系，其中电力供应商被设计为能够快速响应需求。然而，短期短缺可能会产生价格峰值，价格可能上涨到平均价格的10到100倍。也可能出现负荷下降速度超过发电机组能够削减速度的时期，偶尔会产生过剩电力，以极低甚至负的价格出售。

<figure class="book-figure">
  <img src="/assets/images/sdam/windforecasts.png" alt="24小时期间内风电预测的演变，每小时更新一次。" style="max-width: 500px;">
  <figcaption><span class="fig-num">图 9.2。</span> 24小时期间内风电预测的演变，每小时更新一次。黑线为实际值。</figcaption>
</figure>

上述每个过程都可以以不同程度的准确性进行预测。风力预测的准确性最低，虽然风力在夜间可能更强，但高峰和低谷可以在白天或夜间的任何时候出现。负荷与一天中的时段高度相关，这主要是由于人类活动，但也因为温度的影响。请注意，炎热的午后可能会因空调使用而在夏季的一天中间产生用电高峰，而在冬季，它实际上可能会降低供暖负荷（供暖负荷可能由电加热来满足）。由于太阳的升起与落下，温度也具有很强的时段性成分，但随着天气锋面的移动也会出现变化。

我们的问题涉及决定在每个时间点上从电网购买多少电力（或将多少电力卖回电网），以及存储多少电力（对某些电网运营商而言，这些决策可能是以5分钟为增量做出的）。我们需要满足对能源的需求，但除此之外，我们希望使我们从售电中获得的收入减去从电网或风电场购电成本后的收益最大化。

## 问题的框定

我们对三个框定问题的回答是：

- **指标：** 我们希望最大化总预期利润，其中包括满足需求所获得的收入，减去从电网购买能源的成本。
- **决策：** 我们有六个决策：从电网到存储设备的能量流、从电网到负荷的能量流、从风电场到存储设备的能量流、从风电场到负荷的能量流、从存储设备到电网的能量流，以及从存储设备到负荷的能量流。
- **不确定性：** 我们有以下动态信息过程：负荷（对能源的需求）、温度（影响负荷）、来自风电场的能量、我们因满足负荷而获得的价格，以及从电网购买能源的成本。

## 基本模型

### 状态变量

我们首先对系统在时刻 $t$ 的快照进行建模，其中包括：$R_t$，即时刻 $t$ 电池中存储的能量数量（单位：MWh）；$L_t$，即时刻 $t$ 对能源的负荷（需求）（单位：MW）；$\tau_t$，即时刻 $t$ 的温度；$w_t$，即时刻 $t$ 风能产生的能量（单位：MW）；$p^{load}\_t$，即在时刻 $t$ 为满足建筑物负荷而每MWh向我们支付的金额；以及 $c^{grid}\_t$，从电网购电的成本（这也是我们把电卖回电网时得到的价格）。

由于潜在问题非常依赖于时间（由于日周期的存在），我们将需要使用预测，一方面用来对问题的动态进行建模，另一方面用来做出需要预判未来可能发生情况的决策。我们假设我们获得了一组滚动预测集，如图 9.2 中风力预测所展示的那样。我们使用以下符号对负荷（$L$）、温度（$\tau$）、风力（$w$）、市场价格（$p$）和电网价格（$G$）的预测进行建模：$f^L_{tt'}$，即在已知时刻 $t$ 信息的情况下，对时刻 $t' > t$ 负荷 $L_t$（单位：MW）的预测；$f^\tau_{tt'}$，即在已知时刻 $t$ 信息的情况下，对时刻 $t' > t$ 温度 $\tau_t$ 的预测；$f^w_{tt'}$，即在已知时刻 $t$ 信息的情况下，对时刻 $t' > t$ 风电功率 $w_t$（单位：MW）的预测；$f^p_{tt'}$，即在已知时刻 $t$ 信息的情况下，对时刻 $t' > t$ 市场价格 $p^{load}\_t$（单位：＄/MWh）的预测；以及 $f^G_{tt'}$，即在已知时刻 $t$ 信息的情况下，对时刻 $t' > t$ 电网价格 $c^{grid}\_t$（单位：＄/MWh）的预测。

所有预测都是在时域 $t, t+1, \ldots, t+H$ 上的向量，其中 $H$ 是一个指定的时域（例如24小时）。我们令 $f^X_t$ 为 $X \in \Xcal = \lbrace L, T, W, P, G\rbrace $ 的预测向量。

我们的状态变量则为

$$
S_t = (\underbrace{R_t}_{R_t}, \underbrace{(L_t, \tau_t, w_t, p^{load}_t, c^{grid}_t)}_{I_t}, \underbrace{(f^L_t, f^T_t, f^w_t, f^P_t, f^G_t )}_{B_t}).
$$

在这里，我们将可控资源 $R_t$（我们的物理状态变量）、负荷、温度、风电功率和价格的快照（我们可以将其归类为信息变量 $I_t$），以及预测（代表关于未来的一种信念形式 $B_t$）进行了分组。

我们很快就会看到，我们拥有一个相对高维的状态变量。如果我们以5分钟为增量进行规划，那么一个滚动的24小时预测将有288个元素。这就暗示了任何想要估计处于状态 $S_t$ 时的值 $V_t(S_t)$ 的人将面临的挑战。

### 决策变量

我们系统中的决策变量现在是：$x^{wr}\_t$，即时刻 $t$ 从风电场转移到电池的电量；$x^{w\ell}\_t$，即时刻 $t$ 从风电场转移到负荷（建筑物）的电量；$x^{gr}\_t$，即时刻 $t$ 从电网转移到电池的电量；$x^{rg}\_t$，即时刻 $t$ 从电池转移到电网的电量；$x^{g\ell}\_t$，即时刻 $t$ 从电网转移到负荷的电量；$x^{r\ell}\_t$，即时刻 $t$ 从电池转移到负荷的电量；以及 $x^{loss}\_t$，未被覆盖的负荷（称为"甩负荷"）。

这些变量必须在以下约束条件下确定：

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

方程 $\eqref{eq:energysystem1}$ 将用于满足负荷（建筑物）的电力限制在负荷量之内（我们不能使建筑物过载）。变量 $x^{loss}$ 表示我们未能覆盖负荷的数量。该约束体现了从电池中取出能量时的转换损耗。方程 $\eqref{eq:energysystem2}$ 表示我们从电池存储中移出的电量不能超过电池中经转换损耗调整后的存量。方程 $\eqref{eq:energysystem3}$ 则将我们能够转入电池的电量限制在经转换损耗调整后的可用容量范围内。方程 $\eqref{eq:energysystem3a}$ 限制了我们能从存储设备转回电网的电量。方程 $\eqref{eq:energysystem4}$ 将来自风电场的电量限制在该时刻风电场实际产生的电量之内。方程 $\eqref{eq:energysystem5}$–$\eqref{eq:energysystem6}$ 将进出电池的流量限制在充放电速率之内。方程 $\eqref{eq:energysystem7}$ 对每个变量施加非负性约束。

### 外源信息

我们外源信息的第一个来源是任何过程"$X$"实际值与预测值之间的差异，其中

$$
X = (L, \tau, w, p^{load}, c^{grid}).
$$

设 $X_t$ 为该过程，$\varepsilon^X_{t+1}$ 为实际值与预测值之间的差异。于是我们令

$$
\varepsilon^X_{t+1} = X_{t+1} - f^X_{t,t+1}.
$$

我们可以使用从历史数据中抽取的样本，或者假设它遵循某个假定的分布来对 $\varepsilon^X_{t+1}$ 进行建模。

外源信息的第二个来源是我们随时间前进时预测值的变化。我们再次令 $f^X_t$ 为每个信息过程 $X$ 的预测向量，其中 $f^X_{tt}$ 是时刻 $t$ 的实际值。设 $\fhat^X_{t+1,t'}$ 为时刻 $t'$ 的预测在 $t$ 和 $t+1$ 之间的变化，于是

$$
\fhat^X_{t+1,t'} = f^X_{t+1,t'} - f^X_{tt'},~ t'=t, t+1, \ldots, t+H.
$$

外源变化 $\fhat^X_{t+1,t'}$ 在时间段 $t'$ 之间是相关的。如果不是这样的话，那么在时域 $t'=t, \ldots, t+H$ 上绘制出的预测将不再呈现出我们在图 9.2 中的风力预测中所看到的那种平滑性。我们将在下文回到关于预测不确定性建模的这一问题。

这意味着我们可以将外源信息写作

$$
W_{t+1,X} = (\varepsilon^X_{t+1}, \fhat^X_{t+1,t'}), t' > t,
$$

其中 $X$ 等于不同的变量（负荷、温度、风力、市场价格和电网价格）。

### 转移函数

资源状态变量的演化由以下方式给出：

$$
\begin{align}
R_{t+1} = R_t + \eta (x^{wr}_t + x^{gr}_t) - \frac{1}{\eta} (x^{rg}_t + x^{r\ell}_t).\label{eq:energytransitionII1}
\end{align}
$$

变量 $L_t$、$\tau_t$、$w_t$、$p^{load}\_t$ 和 $c^{grid}\_t$ 均使用预测进行演化。例如，我们可以用以下方式写出负荷 $L_t$ 的演化：

$$
\begin{align}
L_{t+1} = f^L_{t,t+1} + \varepsilon^L_{t+1}, \label{eq:energytransitionII2}
\end{align}
$$

我们可以为 $\tau_t$、$w_t$、$p^{load}\_t$ 和 $c^{grid}\_t$ 创建类似的方程。

我们使用以下方式写出预测的演化：

$$
\begin{align}
f^X_{t+1,t'} = f^X_{tt'} + \fhat^X_{t+1,t'}, ~X\in\Xcal, ~t'=t+1, \ldots, t+1+H,  \label{eq:energytransitionII3}
\end{align}
$$

其中 $X=L, \tau, w, p^{load}$ 且 $c^{grid}$。方程 $\eqref{eq:energytransitionII3}$ 在文献中被称为"预测演化的马丁格尔模型"。"马丁格尔"一词指的是我们所做的假设，即 $f^X_{tt'}$ 是 $f^X_{t+1,t'}$ 的无偏估计，因为我们假设随机偏差 $\fhat^X_{t+1,t'}$ 平均为零。

方程 $\eqref{eq:energytransitionII1}$、$\eqref{eq:energytransitionII2}$ 和 $\eqref{eq:energytransitionII3}$（对所有预测 $X$ 而言）共同构成了转移函数

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### 目标函数

我们在时刻 $t$ 的利润函数由以下方式给出：

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

其中市场价格$p^{load}\_t$和电网价格$c^{grid}\_t$包含在状态变量$S_t$中。我们的目标函数仍然是由下式给出的典型问题

$$
\max_\pi \E \sum_{t=0}^T  C(S_t,X^\pi(S_t))
$$

和之前一样，$S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$由方程$\eqref{eq:energytransitionII1}$、$\eqref{eq:energytransitionII2}$和$\eqref{eq:energytransitionII3}$给出。

## 对不确定性建模

下面我们描述两种随时间对不确定性建模的方式。首先，我们介绍一种对预测误差随时间演化的相关性进行建模的方法，这种技术有时被称为*高斯过程回归*。这种方法确保随着时间推移，预测向量以一种自然的方式演化。

然后，我们描述一个隐状态马尔可夫模型，我们发现该模型能够为随机过程提供异常真实的样本路径。这种模型能够很好地复现误差分布，同时也能很好地捕捉*穿越时间*，即实际过程（例如风速）保持在基准（如预测值）之上或之下的时长。如果我们能够正确捕捉预测值高于或低于实际值的时长，那就意味着我们捕捉到了随时间的相关性。

本节将介绍几种强大的随机建模方法，它们应当是任何用于不确定性建模的工具箱中的必备内容。随机建模在技术上可能相当复杂，本节也反映了这一点。提醒读者，本节比我们其他关于不确定性建模的章节更为深入复杂。

### 用于预测误差的高斯过程回归

高斯过程回归（简称GPR）是一种生成相关的正态分布随机变量序列的简单方法。当我们试图估计一个连续曲面时，GPR特别有用，因为如果曲面中某一点高于预期，那么附近的点也会高于预期。

设$X_{t'}$为我们任一外源过程（价格、负荷、温度、风能）在时间$t'$的实际结果，设$f^X_{tt'}$为在时间$t < t'$对$X_{t'}$做出的预测。通常假设存在某种误差$\varepsilon_{t'-t}$描述$X_{t'}$与预测$f^X_{tt'}$之间的差异。然后我们会对$\varepsilon^X_{t'-t}$假设某种模型，例如

$$
\varepsilon^X_{t'-t} \sim N(0, (t'-t) \sigma^2_X).
$$

我们将采取一种略有不同的方法，假设预测变化量$\fhat^X_{t+1,t'}$的分布由下式描述

$$
\fhat^X_{t+1,t'} \sim N(0, \sigma^2_X).
$$

然后我们假设预测变化量$\fhat^X_{t+1,t'}$在不同时间$t'$之间是相关的，具有如下协方差函数

$$
\begin{align}
Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''}) = \sigma^2_X e^{-\beta\vert t''-t'\vert }. \label{eq:forecastcovariancefunction}
\end{align}
$$

方程$\eqref{eq:forecastcovariancefunction}$中的协方差函数$Cov(\fhat^X_{t+1,t'},\fhat^X_{t+1,t''})$捕捉了这样一个性质：随时间的协方差表现出随两个时间点差值增大而递减的相关性。这个简单模型引入了一个可调参数$\beta$，需要根据数据估计，或者也可以凭经验判断。例如，可以尝试绘制$\beta$不同取值下的协方差数值，并选择一个看起来合理的值。

我们可以利用这个协方差函数创建一个协方差矩阵$\Sigma^X$，其元素为$\Sigma^X_{t't''} = \sigma^2\_X e^{-\beta\vert t''-t'\vert }$。有一种简单的方法可以利用称为*Cholesky分解*的方法生成预测变化量的相关样本。首先创建协方差矩阵的所谓“平方根”$\Sigma^X$，将其存储在一个下三角矩阵$L$中。在python中，使用NumPy包，我们可以使用如下python命令

```
L = scipy.linalg.cholesky(Sigma_X, lower=True)
```

我们注意到$\Sigma^X = L^T L$，这就是为什么我们将$L$视为$\Sigma^X$的平方根。

接下来，生成一系列独立随机变量$Z_{\tau}$，对于$\tau =  1, \ldots, H$，它们服从均值为0、方差为1的正态分布。现在令$Z=(Z_{t+1}, Z_{t+2}, \ldots, Z_{t+H})^T$为由这些独立分布的标准正态随机变量组成的列向量。我们可以利用下式生成预测变化量的相关样本

$$
\begin{pmatrix} \fhat^X_{t+1,t+1} \\ \fhat^X_{t+1,t+2} \\ \vdots \\ \fhat^X_{t+1,t+H} \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 0 \end{pmatrix} + L Z.
$$

这个公式为我们给出了一组采样的预测变化量$\fhat^X_{t+1,t+1}, \ldots, \fhat^X_{t+1,t+H}$，它们根据方程$\eqref{eq:forecastcovariancefunction}$中的指数衰减函数呈现相关性。其结果是一组演化中的预测，其中预测误差的方差随时间线性增长，如下式所示

$$
Var(\varepsilon^X_{t'-t}) = (t'-t) \sigma^2_X.
$$

演化的预测$f^X_{t,t'}, f^X_{t+1,t'}, \ldots$将表现出我们在图9.2中演化的风力预测中所看到的行为。

### 隐状态马尔可夫模型

在能源领域开发随机模型时的一个挑战是捕捉一种称为*穿越时间*的性质。这是指实际过程（例如价格或风速）高于或低于某个基准（如预测值）的时长。图9.3展示了风力过程的一个上穿时间。

<figure class="book-figure">
  <img src="/assets/images/sdam/upcrossingtime.png" alt="预测和实际风力，展示了一个上穿时间。" style="max-width: 550px;">
  <figcaption><span class="fig-num">图9.3。</span> 预测（黑色）与实际风力，展示了实际值高于预测值的一段时期。这段处于高于状态的时期长度被称为上穿时间。</figcaption>
</figure>

使用标准时间序列建模来复现穿越时间的尝试并未成功。真正有效的是开发了一个带有隐状态变量$S^C_t$的马尔可夫模型，该模型经过校准以捕捉过程高于或低于基准的动态变化。该过程使用以下步骤：

**步骤1** – 将实际过程与基准进行比较，找出实际过程高于或低于基准的时刻，并输出一个数据集，记录该过程是处于高于（A）还是低于（B）状态，以及持续时长。将这些时段汇总为短/中/长（S/M/L）三个类别，并用A或B以及S/M/L标注每个片段，从而创建六个状态。之所以称为“隐状态”，是因为虽然我们在时间$t$会知道实际过程是高于还是低于基准，但直到过程穿越基准之后，我们才会知道该时段的长度是短、中还是长。

**步骤2** – 利用$S^C_t$的历史序列，计算一步转移矩阵$P^C[S^C_{t+1}\vert S^C_t]$，即在当前处于状态$S^C_t$的条件下，穿越过程取值为$S^C_{t+1}$的概率。

**步骤3** – 根据经验累积分布，将实际过程（例如风速）汇总为例如五个类别。令$W^g_t$为汇总后的风速（从1到5的数字）。

**步骤4** – 从历史数据中，计算给定$W^g_t$和$S^C_t$条件下风速的条件分布$F^W[W_{t+1}\vert W^g_t, S^C_t]$，即给定$W^g_t$和$S^C_t$条件下风速$W_{t+1}$的经验累积分布。

利用一步转移矩阵$P^C[S^C_{t+1}\vert S^C_t]$和条件累积分布$F^W[W_{t+1}\vert W^g_t, S^C_t]$，我们现在可以通过首先根据$S^C_t$模拟隐状态变量$S^C_{t+1}$来模拟我们的随机过程（注意这样的状态只有30个）。然后，从某个风速$W_t$出发，我们可以找到汇总后的风速$W^g_t$，进而从条件累积分布$F^W[W_{t+1}\vert W^g_t, S^C_t]$中抽样得到实际风速$W_{t+1}$。

已发现该逻辑能够在建模风力以及电网价格的一系列数据集上准确复现误差分布（实际值与基准值之间的分布），以及上穿和下穿分布。图9.4展示了这些分布在某个特定数据集上的表现。

<figure class="book-figure">
  <img src="/assets/images/sdam/crossingtimedistributions.jpg" alt="实际预测误差分布与预测的预测误差分布、上穿时间分布以及下穿时间分布的比较。" style="max-width: 550px;">
  <figcaption><span class="fig-num">图9.4。</span> 实际与预测的预测误差分布比较（上）、上穿时间分布（左下）以及下穿时间分布（右下）。</figcaption>
</figure>

## 设计策略

这个问题最大的复杂之处在于，预测是状态变量的一部分，这使我们能够明确地对预测的滚动演化进行建模。困难之处在于，这使得状态变量变成高维的。

处理预测最常见的方法是使用一种通过固定预测来近似未来的前瞻模型。两种最流行的策略是：

- 确定性前瞻，将预测纳入前瞻模型的构建之中。
- 带潜变量的随机前瞻——我们可以利用预测建立一个随机前瞻模型，然后使用经典动态规划求解该模型。在前瞻模型中，我们将预测固定到模型中，而不是对其随时间的演化进行建模。当我们在模型（包括前瞻模型）中忽略某个变量时，该变量被称为*潜变量*。

这两种方法都将预测用作潜变量，因为它们都没有在前瞻模型内对预测的演化进行建模。随机前瞻模型的难点在于求解难度更大。如果我们正在以短时间增量（可能是5分钟甚至更短）优化我们的储能问题，那么这可能会给诸如精确或近似动态规划这样的技术带来问题。

正因如此，处理带有预测的时间依赖性问题时最流行的策略，是像我们求解动态最短路径问题那样求解一个确定性前瞻模型。我们下面描述这样一个模型，然后引入一个参数化版本，使确定性模型能够更好地处理不确定性。

我们在此暂停一下，指出使用滚动预测进行规划在运营管理中相当常见。奇怪的是，教科书几乎普遍忽略了对滚动预测的正确建模。例如，几乎每一本关于库存规划的书都将状态变量等同于库存。只有极少数认识到，如果预测在每个时间段都被更新，那么我们就必须在状态变量中表示更新预测所需的信息。如果我们忽略这一信息，那么实际上我们就是在创建一个将预测保持不变的前瞻模型。

### 确定性前瞻

我们将使用与[第6章](/sdam/zh/chapter-6/)中首次介绍的相同的记号风格，即将我们试图求解的问题（*基础模型*）与作为求解基础模型的一种策略形式而求解的*前瞻模型*区分开来。

回想一下，我们基础模型的典型表述为

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t,X^\pi(S_t))\vert S_0\right\},
$$

其中$S_{t+1} = S^M(S_t,X^\pi(S_t),W_{t+1})$，并且我们有一个外源信息过程$(S_0, W_1, W_2, \ldots, W_T)$。请注意，变量$W_t$可能依赖于状态$S_t$和/或决策$x_t$；如果是这种情况，那么变量$W_{t+1}$必须在我们知道$S_t$和$x_t$之后即时生成。

我们将通过构建一个确定性前瞻模型来创建一个策略，其中所有变量都用波浪号标注，并同时以我们做出决策的时间$t$和前瞻模型内的时间变量$t'$为索引进行标记。因此我们定义$\xtilde_{tt'}$，即在时间$t$生成的前瞻模型中，时间$t'$处的决策；$\ctilde_{tt'}$，即$\xtilde_{tt'}$的成本系数；以及$\Rtilde_{tt'}$，即在时间$t$生成的前瞻模型中，时间$t'$处电池中的电量。

注意，$x_t = \xtilde_{tt}$、$c_t = \ctilde_{tt}$，依此类推。

我们将确定性前瞻策略$X^{DLA}\_t(S_t)$构建为如下线性规划：

$$
\begin{align}
X^{DLA}_t(S_t) = \argmax_{x_t, (\xtilde_{tt'},t'=t+1, \ldots, t+H)} \left(C(S_t,x_t) + \sum_{t'=t+1}^{t+H} C(\Stilde_{tt'},\xtilde_{tt'})\right),  \label{eq:energydetlookahead0}
\end{align}
$$

其中

$$
C(S_t,x_t) = (x^{w\ell}_t + x^{g\ell}_t + \eta x^{r\ell}_t) p^{load}_t - (x^{g\ell}_t + x^{gr}_t)c^{grid}_t,
$$

$$
C(\Stilde_{tt'},\xtilde_{tt'}) = (\xtilde^{w\ell}_{tt'} + \xtilde^{g\ell}_{tt'} + \eta \xtilde^{r\ell}_{tt'}) \ptilde^{load}_{tt'} - (\xtilde^{g\ell}_{tt'} + \xtilde^{gr}_{tt'})\ctilde^{grid}_{tt'}.
$$

该问题必须在约束$\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$（对$x_t$）以及以下针对所有$t' = t+1, \ldots, t+H$的$\xtilde_{tt'}$的约束条件下求解：

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

这些方程与基础约束$\eqref{eq:energysystem1}$–$\eqref{eq:energysystem7}$中的方程相对应，唯一的变化是我们使用了前瞻变量，如$\xtilde_{tt'}$、$\Rtilde_{tt'}$，以及预测值，如$f^W_{tt'}$，而不是实际风力$W_t$。

由方程$\eqref{eq:energydetlookahead0}$–$\eqref{eq:energydetlookahead8}$描述的模型是一个相对简单的线性规划，如今在Matlab或python等语言中都已有相应的求解包可用。

像$X^{DLA}\_t(S_t)$这样的前瞻策略被广泛用于此类动态、时变的问题中。它们必须以滚动方式求解，正如我们最初为确定性最短路径问题所展示的那样。正因如此，这类方法有时被称为"滚动时域方法"或"后退时域方法"。还有一个完整的研究领域被称为"模型预测控制"，正是基于这些前瞻策略而建立的。

对于像这个能源存储问题这样的应用，使用确定性前瞻模型引发了一个担忧：我们没有考虑不确定性。例如，我们可能希望在电池中多存储一些能量，以防风力突然下降或电网价格突然上涨。在下一节中，我们将描述如何使用确定性前瞻模型来处理不确定性。

### 参数化前瞻

有一个非常简单的方法可以解决确定性前瞐无法处理不确定性的问题。我们需要做的是思考如何因不确定性而修改模型（或其解）。例如，我们可能希望在*未来*为额外的存储付出代价，以应对意外的变化。当然，我们不能强迫模型在当前就保留能量，以备将来可能需要之用。我们也可能希望对可能不太准确的预测打折。

我们可以通过将约束$\eqref{eq:energydetlookahead1}$–$\eqref{eq:energydetlookahead8}$替换为以下内容来引入这些变化

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

请注意，我们引入了参数来修改约束$\eqref{eq:energydetlookaheadmod2}$和$\eqref{eq:energydetlookaheadmod5}$的右侧，其中我们引入了系数$\theta^L_{t'-t}$和$\theta^W_{t'-t}$来修改负荷和风力的预测，这些系数按我们向未来预测的时间段数进行索引。然后，我们修改了约束$\eqref{eq:energydetlookaheadmod3}$，其思路是我们可能希望限制我们使用存储中全部能量的能力，以维持一定的储备。

设$X^{DLA-P}(S_t\vert \theta)$表示在参数化约束$\eqref{eq:energydetlookaheadmod1}$–$\eqref{eq:energydetlookaheadmod8}$下求解的前瞻策略。一旦我们确定了如何引入这些参数化（这是任何参数化模型背后的艺术），接下来就是为$\theta$寻找最佳值的问题。这正是我们在[第7章](/sdam/zh/chapter-7/)中讨论的参数搜索问题。

我们计算了使用经过优化的参数化确定性前瞻（即我们搜索向量$\theta=(\theta^L, \theta^W)$的最佳值）相对于将这些参数设为1.0的基本策略的相对改进。在我们的实验中，我们设定$\theta^L_{t'-t} = 1$，仅优化风力预测的系数$\theta^W_{t'-t}$。

结果如图9.5所示，显示我们平均将性能提升了约30%。重要的是，这种改进在实地做决策时并未带来任何额外的复杂性。唯一的步骤——我们在此未加描述——是我们必须调整参数向量$\theta$。遗憾的是，优化$\theta$的过程并不容易。

<figure class="book-figure">
  <img src="/assets/images/sdam/cfaenergyperformance.png" alt="Relative improvement of the deterministic lookahead with optimized theta versus using theta=1." style="max-width: 450px;">
  <figcaption><span class="fig-num">图9.5。</span> 采用优化后的$\theta_\tau$与使用$\theta_\tau = 1$相比，确定性前瞻的相对改进。</figcaption>
</figure>

## 我们学到了什么？

- 在本章中，我们引入了一个更为复杂的、带有滚动预测的能源存储问题。
- 我们引入了"预测演化的马丁格尔模型"，该模型假设未来预测随时间演化，其中预测的期望变化为零（但实际变化可能为正或为负）。
- 然后我们描述了一个隐藏半马尔可夫模型，帮助我们复现"穿越时间"，即捕捉预测高于或低于实际值的持续时间。
- 我们引入了确定性前瞻策略，然后引入了参数化确定性前瞻，其中我们为每个预测引入系数（这是DLA/CFA混合策略的另一个例子）。
- 我们展示了经过调优的DLA/CFA策略比纯（未调优）确定性前瞻策略的表现高出约30%。

## 习题

**复习题**

<ol class="book-exercises">
<li>"预测演化的马丁格尔模型"是什么意思？</li>
<li>在时刻$t$对每个量（如负荷$L_t$、$f^L_{tt'}$，对于$t'=t, \ldots, t+H$）的整个预测都包含在状态变量中。为什么？［提示：查看预测的转移方程以及它们所预测的变量。］</li>
<li>变量$x_t$、$t=0, \ldots, T$与变量$\xtilde_{tt'}$（对于$t' = t, \ldots, t+H$）之间有什么区别？</li>
<li>什么是"穿越时间"？</li>
<li>什么是"Cholesky分解"，它有什么用途？</li>
<li>在风能的隐状态马尔可夫模型中，隐藏的是什么状态？解释为什么它是隐藏的。</li>
<li>上述参数化前瞻策略属于哪一类策略？用什么目标函数来寻找最佳的调优参数集？</li>
</ol>

**问题求解题**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>尝试为本章问题的条件设计一个参数化策略，用于做出决策。你可以使用任何形式的规则或参数化函数。唯一的限制是不允许对任何内容进行优化（也就是说，你的策略中不能使用$\argmax_x$）。</li>
<li>我们的参数化前瞻仅限于在预测前引入系数。你还可以引入加法调整，例如防止能源存储设备过于接近其容量上限（这样你就能存储超出预测的风力突增）或防止其过于接近零（以防风力出现骤降）。请提出一种替代的参数化方案，并论证为什么你的结构可能会增加价值。</li>
</ol>
{% endraw %}
