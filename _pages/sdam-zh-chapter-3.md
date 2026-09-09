---
layout: book
book_data: sdam_toc_zh
book_home: /sdam/zh/contents/
title: "# 第3章:自适应市场规划"
permalink: /sdam/zh/chapter-3/
date: 2026-07-17
lang: zh
translated_from: en
translated_from_hash: 8d040048b8e28e95
---


{% raw %}
## 本章概述

我们用"适应性市场规划"这一术语来描述广为人知的报童问题，在这个问题中，我们必须选择一定数量的资源（"报纸"）进行销售，以满足未知的市场需求，其中未使用的资源在销售期结束时被丢弃。这意味着不同的时间周期之间并没有物理上的联系。

我们首先使用这个问题来说明一个基本的随机梯度算法，该算法已知会收敛到最优数量。这种方法克服了这样一个问题：如果我们分配的量太少，我们观察不到实际需求，而只能观察到我们能够销售出去的数量（这受限于我们所提供的库存）。

随机梯度算法在存在不确定性的优化中被广泛使用，前提是我们能够获得梯度。随机梯度算法最早于1951年提出，并具有已被充分理解的收敛特性。然而，鲜为人知的是，随机梯度算法本身就是一个序贯决策问题，其中的"决策"就是算法中所使用的步长。

关于随机梯度算法的经典文献关注的是这样一个性质：在极限情况下，它们会产生单周期问题的最优解（也就是说，它们会找到最优的分配数量）。几乎完全被忽视的是，当这一过程在实地环境中进行时——这意味着我们是在决策结果发生的同时经历它们——我们必须以最大化*累积奖励*（即随时间累加的奖励之和）作为目标。

在扩展部分，我们还引入了一个文献中被忽视的转折。在实践中，我们不仅不知道需求，甚至连需求的分布也不知道。在每个时间周期，我们观察到我们卖出了多少（这受限于我们所提供的资源数量），并从这一经验中学习，在决定下一个时间周期分配多少之前更新我们对分布的信念。这引入了一个将各时间周期联系在一起的信念状态，就如同我们将剩余库存保留到下一个时间周期一样。这是经典报童问题处理方式中所缺失的另一个视角。

这些问题为这个看似相当简单和优雅的序贯决策问题带来了相当丰富的内涵。

## 问题的构建

我们对三个构建性问题的回答是：

- **度量指标：** 在一个规划时域内，最大化满足需求所获得的预期收益，减去购买产品的成本。
- **决策：** 每个时间周期应购买多少产品。
- **不确定性：** 每个时间周期内对该产品的需求。

## 叙述

存在一大类问题涉及分配某种资源以满足不确定的（有时甚至是不可观测的）需求。例如：

- 储备易腐烂库存（例如鲜鱼）以满足需求，其中剩余库存无法保留到未来。
- 为高科技制造业（例如喷气发动机）储备零件，在这种情况下我们需要订购零件以满足已知需求，但这些零件可能不符合所要求的规格，因而必须被丢弃。因此，我们可能需要订购八个零件才能满足五个的需求，因为其中几个零件可能不符合所需的工程规格。
- 我们必须分配时间来完成一项任务（例如开车上班，或分配时间完成一个项目）。
- 我们必须为诸如市场营销之类的活动分配年度预算。剩余资金将退还给公司。

最简单的问题涉及在已知分布的不确定需求下做出这些决策，但最常见的应用涉及未知且需要学习的分布。可能还存在其他信息，例如需求预测的可用性，以及动态信息，例如鲜鱼的市场价格（在做出资源决策之前，这一价格可能已知或未知）。

自1950年代以来，这一问题已被广泛研究，最初被称为"单周期库存问题"，但目前主要被称为"报童问题"。它被广泛用作不确定性优化中的典范问题。

报童问题通常被表述为

$$
\begin{align}
\max_x \E F(x,W) = \E \big(p\min\{x,W\} - cx\big), \label{eq:newsvendorasymptotic}
\end{align}
$$

其中$x$是我们的决策变量，用于确定满足需求所需的资源数量，而$W$是对该资源的不确定需求。我们假设我们以单位成本$c$"购买"资源，并以价格$p$（我们假设它大于$c$）出售$x$和$W$中较小的一个。方程$\eqref{eq:newsvendorasymptotic}$中给出的目标函数被称为报童问题的*渐近*形式。

报童问题有两个重要的变体：

- 随机变量$W$的分布已知。
- $W$的分布未知。

未知的情形在实践中更为常见，这引入了这样一个维度：每次我们运行一次迭代，选择$x$，然后观察$x$和$W$中较小的一个，我们就能了解到关于$W$分布的一些信息。

如果$W$是确定性的（并且如果$p > c$），那么很容易验证解为$x = W$。现在假设$W$是一个具有概率分布$f^W(w)$的随机变量（$W$可能是离散的或连续的）。设$F^W(w) = Prob[W \leq w]$为$W$的累积分布。如果$W$是连续的，并且如果我们能够计算$F(x) = \E F(x,W)$，那么最优解$x^\ast $将满足

$$
\left.\frac{d F(x)}{dx}\right\vert _{x=x^\ast } = 0.
$$

现在考虑所谓的*随机梯度*，即假设我们知道$W$，取$F(x,W)$的导数，其表达式为

$$
\begin{align}
\frac{d F(x,W)}{dx} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases} \label{eq:newsvendorstochasticgradient}
\end{align}
$$

这是给定随机变量$W$时$F(x,W)$的梯度（即导数），之所以称为"随机的"，是因为它依赖于随机变量$W$，而这个随机变量只有在我们选择$x$之后才会显现出来。这就是方程$\eqref{eq:newsvendorstochasticgradient}$中的$d F(x,W)/dx$被称为"随机梯度"的原因。

对$\eqref{eq:newsvendorstochasticgradient}$两边取期望得到

$$
\begin{align*}
\E \frac{d F(x,W)}{dx} &= (p-c) Prob[x \leq W] - c Prob[x > W] \\
&= (p-c) (1-F^W(x)) - c F^W(x) \\
&= (p-c) - pF^W(x) \\
&= 0 \quad \text{for } x = x^\ast .
\end{align*}
$$

我们现在可以求解$F^W(x^\ast )$，得到

$$
F^W(x^\ast ) = \frac{p-c}{p}.
$$

因此，随着$c$减小到0，我们希望订购一个数量$x^\ast $，使其能够以概率1满足需求。而当$c$接近$p$时，最优订购数量将以趋近于0的概率满足需求。

这意味着我们计算出$(p-c)/p$，这是一个介于0和1之间的数值，然后找到与该订购数量相对应的数量$x^\ast $，使得随机需求小于$x^\ast $的概率等于$(p-c)/p$。

我们刚刚看到了两种可以精确求出订购数量的情形：一是事先知道$W$（我们可以称之为完美预测），二是知道$W$的分布。这一结果自1950年代起就已为人所知，引发了大量论文致力于从观测数据中估计$W$的分布，并处理当$x < W$时我们无法直接观测$W$的情形（也就是说，我们只能观察到销量，而不是需求，这种情形被称为"截断需求"）。

我们将要处理需求分布未知的问题。我们的方法是使用如下所示的序贯搜索算法

$$
\begin{align}
x^{n+1} = \max\left\{0,x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n} \right\},  \label{eq:stochasticgradientalgorithm}
\end{align}
$$

其中$\alpha_n$被称为*步长*。我们面临的挑战是在每次迭代中选择$\alpha_n$。

## 基本模型

### 状态变量

状态变量捕捉的是我们在时间$n$所拥有的信息，这些信息与策略以及外源信息一起，用于计算时间$n+1$的状态。对于方程$\eqref{eq:stochasticgradientalgorithm}$中的搜索过程，我们的状态变量为

$$
S^n = (x^n).
$$

### 决策变量

这个问题的关键在于识别决策变量。人们很容易认为$x^n$就是决策，但在这个算法的语境下，真正的决策是步长$\alpha_n$。与我们所有的序贯决策问题一样，这个决策（即步长）是由通常所称的步长规则决定的，有时也被称为步长策略，我们用$\alpha^\pi(S^n)$表示。

通常我们会在稍后引入策略，但为了帮助理解模型，我们先从一个基本的步长策略——*调和步长规则*——开始，其表达式为

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

这是一个简单的确定性步长规则，这意味着一旦我们知道$n$，我们就能提前知道步长$\alpha_n$。下面我们将介绍一种更有趣的随机步长策略，它需要一个更丰富的状态变量。

我们还将令$X^\pi(S^n)$为由步长策略$\alpha^\pi(S^n)$确定的$x^n$的值。

### 外源信息

外源信息是我们试图用产品供应量$x^n$来满足的对资源（产品、时间或资金）的随机需求$W^{n+1}$。我们可以假设我们直接观测到$W^{n+1}$，或者我们可能只观测到$x^n \leq W^{n+1}$或$x^n > W^{n+1}$是否成立。

### 转移函数

对于$x$不受约束的情形，转移方程为

$$
\begin{align}
x^{n+1} = x^n + \alpha_n \left.\frac{d F(x,W^{n+1})}{dx}\right\vert _{x=x^n}.  \label{eq:stochasticgradientaltransition1}
\end{align}
$$

我们注意到，方程$\eqref{eq:stochasticgradientaltransition1}$可能产生一个无法实现的值$x^{n+1} < 0$。这里的修正方法很简单：只需设定$x^{n+1} = 0$即可。

### 目标函数

在每次迭代中，我们获得的净收益为

$$
F(x^n,W^{n+1}) = p\min\{x^n,W^{n+1}\} - cx^n.
$$

现在我们需要构建一个目标函数来找到最佳策略。我们可以用两种方式来处理这一问题设定。第一种假设我们必须在实地进行学习，第二种假设我们可以使用模拟器来学习该策略。

**在实地进行优化**

如果我们是在实地体验我们的决策，我们希望在某个时域内最大化*累积奖励*。这意味着我们需要通过求解以下问题来找到最佳策略（在这种情形下即最佳步长规则）

$$
\begin{align}
\max_\pi \E \left\{\sum_{n=0}^{N-1} F(X^\pi(S^n\vert \theta),W^{n+1})\vert S^0\right\}. \label{eq:newsvendorobjectivecumulativereward}
\end{align}
$$

其中$S^{n+1} = S^M(S^n,X^\pi(S^n),W^{n+1})$描述了算法的演化过程（例如，由方程$\eqref{eq:stochasticgradientaltransition1}$给出的转移函数）。这里，$\pi$指的是步长规则的类型（我们在下面考虑几种类型），以及任何可调参数（例如$\theta^{step}$）。

奇怪的是，报童问题背后的故事总是涉及在实地进行学习，然而方程$\eqref{eq:newsvendorobjectivecumulativereward}$中的累积奖励却从未被用作目标函数。我们在此提及这一点，是为了给那些在文献中检索"报童问题"的读者提供参考。

**使用模拟器进行优化**

另外，我们也可以使用模拟器，在其中运行$N$次迭代的搜索，最终得到$x^N$。我们将把这个最终解重新命名为$x^{\pi,N}$，以表达其对步长策略$\alpha^\pi(S^n)$的依赖关系。

我们的最终解$x^{\pi,N}$是一个随机变量，因为它依赖于序列$W^1, \ldots, W^n$。像之前一样，我们将令$\omega$表示$W^1(\omega), \ldots, W^n(\omega)$的一次样本实现，并将我们的解写作$x^{\pi,N}(\omega)$，以表示这是我们使用样本路径$\omega$所获得的解。

由于我们使用的是模拟器，我们只关心最终解的性能（也称为*最终奖励*），我们将其写作

$$
\begin{align}
F(x^{\pi,N},\What) = p\min\{x^{\pi,N},\What\} - cx^{\pi,N}, \label{eq:newsvendorxpiNobjective}
\end{align}
$$

其中$\What$是我们用于测试$x^{\pi,N}$性能的随机变量。

这意味着在方程$\eqref{eq:newsvendorxpiNobjective}$给出的目标函数中，我们有两个随机变量。对于$W^1(\omega), \ldots, W^n(\omega)$的单一实现集合，我们得到一个解$x^{\pi,N}(\omega)$。现在设$\psi$为$\What$的一次样本实现。因此，如果我们有解$x^{\pi,N}(\omega)$的一次样本实现，以及测试变量$\What(\psi)$的一次样本实现，我们的性能将是

$$
\begin{align}
F(x^{\pi,N}(\omega),\What(\psi)) = p\min\{x^{\pi,N}(\omega),\What(\psi)\} - cx^{\pi,N}(\omega). \label{eq:newsvendorxpiNobjectivesample}
\end{align}
$$

我们真正想做的是对$x^{\pi,N}(\omega)$和$\What(\psi)$的所有可能实现取平均值，我们可以将其写作

$$
\begin{align}
\Fbar^\pi  = \frac{1}{N} \frac{1}{M} \sum_{\omega=1}^N \sum_{\psi=1}^M \left(p\min\{x^{\pi,N}(\omega^n),\What(\psi^m)\} - cx^{\pi,N}(\omega^n)\right). \label{eq:newsvendorxpiNobjectivesampleaverage}
\end{align}
$$

估计值$\Fbar^\pi$代表对序列$W^1(\omega), \ldots, W^n(\omega)$的$N$个样本，以及测试变量$\What(\psi)$的$M$个样本所取的平均值。

## 不确定性建模

设$f^W(w)$为$W$的分布（可能是离散的或连续的），其累积分布函数为$F^W(w) = Prob[W \leq w]$。我们可以假设该分布的形式已知，但其中含有一个未知参数。例如，假设$W$服从均值为$\mu$的泊松分布，即

$$
f^W(w) = \frac{\mu^w e^{-\mu}}{w!}, \quad w=0, 1, 2, \ldots.
$$

我们可以假设已知 $\mu$，在这种情况下，我们可以使用本章开头给出的解析解来求解此问题。相反，假设 $\mu$ 未知，但具有已知分布 $p^\mu_k = Prob[\mu=\mu_k]$。请注意，这个分布 $p^\mu = (p^\mu_k)\_{k=1}^K$ 将会在我们的初始状态 $S^0$ 中建模。

## 设计策略

我们已经介绍了两种步长策略的选择，为了模仿我们在别处编写策略的风格，我们将其记为 $\alpha^\pi(S^n)$。

文献中提出了各种各样的步长策略（通常称为步长规则）。其中最简单也最流行的一种是调和步长策略，如下所示

$$
\alpha^{harmonic}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+n-1}.
$$

图 3.1 展示了不同 $\theta^{step}$ 取值下调和步长规则的表现。

<figure class="book-figure">
  <img src="/assets/images/sdam/harmonicstepsizes.png" alt="Harmonic stepsizes for different values of theta-step." style="max-width: 420px;">
  <figcaption><span class="fig-num">图 3.1。</span> 不同 $\theta^{step}$ 取值下的调和步长。</figcaption>
</figure>

调和步长策略也被称为确定性策略，因为对于给定的 $n$，我们提前就知道其值。确定性策略面临的挑战在于它们无法根据数据进行调整。因此，使用随机规则通常是有益的。最早也最简单的例子之一是 Kesten 规则

$$
\alpha^{kesten}(S^n\vert \theta^{step}) = \frac{\theta^{step}}{\theta^{step}+K^n-1},
$$

其中 $K^n$ 是一个计数器，用于统计梯度改变方向的次数。我们通过询问乘积（如果 $x$ 是向量，则为内积）$(\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0$ 来确定这一点。如果梯度正在改变方向，这意味着我们正处于最优点附近并跨过了它，因此需要减小步长。这个公式写为

$$
\begin{align}
K^{n+1} = \begin{cases} K^n + 1 & \text{if } (\nabla_x F(x^n,W^{n+1}))^T \nabla_x F(x^{n-1},W^n) < 0, \\ K^n & \text{otherwise,} \end{cases} \label{eq:kestenupdate}
\end{align}
$$

其中 $\nabla_x F(x^n,W^{n+1}) = \frac{d F(x,W^{n+1})}{dx}$。

现在我们有了一个依赖于随机变量 $K^n$ 的步长，这就是我们称之为随机步长规则的原因。如果我们使用 Kesten 规则，就必须修改状态变量以包含 $K^n$，从而得到

$$
S^n = (x^n,K^n).
$$

我们还必须将方程 $\eqref{eq:kestenupdate}$ 加入到我们的转移函数中。

另一种称为 AdaGrad 的步长规则特别适用于 $x$ 是带有元素 $x_i,~i=1, \ldots, I$ 的向量的情形。为了稍微简化符号，令关于元素 $x_i$ 的随机梯度记为

$$
g^n_{i} = \nabla_{x_i} F(x^{n-1}, W^n).
$$

现在创建一个 $I \times I$ 对角矩阵 $G^n$，其中第 $(i,i)$ 个元素 $G^n_{ii}$ 由下式给出

$$
G^n_{ii}  = \sum_{m=1}^n (g^n_{i})^2.
$$

然后我们使用下式为第 $i$ 维设置步长

$$
\begin{align}
\alpha_{ni} = \frac{\theta}{(G^n_{ii})^2 + \epsilon}, \label{eq:adagrad}
\end{align}
$$

其中 $\theta$ 是一个可调参数（相当于我们调和步长公式中的 $\theta^{step}$），$\epsilon$ 是一个很小的数（例如 $10^{-8}$，以避免除以零的可能性）。

图 3.2 展示了不同步长规则下的不同收敛速率，图中显示了 $F(x^n,W^{n+1})$ 随迭代次数的变化。如果我们要优化 $\eqref{eq:newsvendorxpiNobjectivesampleaverage}$ 中的最终奖励，我们可以直接选取最高的那条线，这取决于预算 $N$。如果我们要优化方程 $\eqref{eq:newsvendorobjectivecumulativereward}$ 中的累积奖励，那么就必须关注曲线下的面积，这更偏向于快速的初始收敛。

<figure class="book-figure">
  <img src="/assets/images/sdam/newsvendorconvergence.png" alt="Plot of F(x^n, W^n+1) for different stepsize rules, illustrating different rates of convergence." style="max-width: 450px;">
  <figcaption><span class="fig-num">图 3.2。</span> 不同步长规则下 $F(x^n,W^{n+1})$ 的图示，展示了不同的收敛速率。</figcaption>
</figure>

## 扩展

**1)** 设想我们不知道 $\mu$，但假设 $\mu$ 可以取值 $(\mu_1, \mu_2, \ldots, \mu_K)$ 中的一个。设 $H^n$ 为直到第 $n$ 次实验为止的观测历史，并令 $H^0$ 为初始的空历史。我们假设最初对 $\mu$ 有一个初始先验概率，记为

$$
p^0_k = Prob[\mu = \mu_k\vert H^0].
$$

在我们观测到 $W^1, \ldots, W^n$ 之后，我们可以将更新后的分布写为

$$
p^n_k = Prob[\mu = \mu_k\vert H^n].
$$

我们可以使用贝叶斯定理更新 $p^n = (p^n_k)\_{k=1}^K$

$$
\begin{align}
p^{n+1}_k &= Prob[\mu=\mu_k\vert W^{n+1}=w,H^n] \\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k,H^n]Prob[\mu=\mu_k\vert H^n]}{Prob[W^{n+1}=w\vert H^n]}\\
          &= \frac{Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k}{Prob[W^{n+1}=w\vert H^n]},
\end{align}
$$

其中

$$
Prob[W^{n+1}=w\vert H^n] = \sum_{k=1}^K Prob[W^{n+1}=w\vert \mu=\mu_k]p^n_k.
$$

对基本模型进行这一扩展后，我们就有了两个概率分布：关于真实均值 $\mu$ 的信念，以及给定 $\mu$ 时的随机需求 $W$。为了纳入这个扩展，我们需要将 $p^n$ 插入到我们的状态变量中，因此我们会写为

$$
S^n = (x^n, p^n).
$$

**2)** 设想我们的问题是在第 $n$ 个月购买一种大宗商品（例如石油或天然气），以供第 $n+1$ 个月使用。我们以单位成本 $c$ 购买该商品，并按未知的价格 $p^{n+1}$ 出售给未知的需求 $D^{n+1}$。我们会将这个问题的目标函数写为

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^{n+1} \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension1}
\end{align}
$$

## 我们学到了什么？

- 我们借助新闻贩子问题的背景，将随机梯度算法作为一个序贯决策问题来说明。我们展示了如何使用 [第 1 章](/sdam/zh/chapter-1/) 中介绍的序贯决策问题的五个要素来对随机梯度算法建模。
- 我们介绍了几个用于选择步长的 PFA 策略示例。
- 新闻贩子问题传统上被表述为一个静态问题，我们在其中寻找最佳解，只关心我们最终选择的 $x$ 的表现。在本章中，我们引入了两个目标：用于在实地进行在线学习（优化）的*累积奖励*，以及在使用模拟器设计最佳学习策略时的*最终奖励*。
- 我们引入了使用概率分布（在本例中为泊松分布）来表示产品随机需求的思想，其中泊松分布的均值本身就是一个随机变量。
- 我们引入了自适应地学习泊松分布均值的概率分布这一扩展。
- 我们还引入了使决策 $x_t$ 依赖于其他状态变量（例如价格 $p_t$）的问题。这与创建一个策略 $X^\pi(S_t)$ 是一回事，其中状态 $S_t$（在此情形下）依赖于价格 $p_t$。这是新闻贩子问题思考方式上的一次重大转变，但仍属于我们所有序贯决策问题的同一类别。

## 习题

**复习题**

<ol class="book-exercises">
<li>我们的序贯搜索算法的决策变量是什么？</li>
<li>给出在策略类别上进行搜索的例子（给出两个例子）以及每个策略类别的可调参数。</li>
<li>写出<em>累积奖励</em>目标和<em>最终奖励</em>目标各自的含义。</li>
<li>在为调和步长规则搜索可调参数 $\theta^{step}$ 时，你认为使用累积奖励得到的最优值 $\theta^{step}$ 与使用最终奖励得到的最优值相比会如何？</li>
<li>假设我们不知道需求 $W$ 的分布，请论证为什么在模拟器中寻找最优的 $x^\ast $ 没有意义。鉴于此，使用模拟器来优化学习策略更为合理。如果我们使用模拟器来优化学习策略，什么样的目标函数适合这个学习练习？</li>
</ol>

**问题求解题**

<ol class="book-exercises" style="counter-reset: exercise 5;">
<li>一家大型工业气体公司必须提前一个月使用"照付不议"（take or pay）合同购买电力合同。如果该公司签订合同购买第 $t+1$ 个月的 $x_t$ 兆瓦时电力，无论是否需要该电力，都要支付价格 $p_t$。但如果第 $t+1$ 个月的负荷（需求）$L_{t+1}$ 超过 $x_t$，那么公司就必须以现货价格 $p^{spot}_{t+1}$ 从电网购买电力。第 $t+1$ 个月满足负荷的成本则为

$$
C(S_t,W_{t+1}) = p_t x_t + p^{spot}_{t+1} \max\{0, L_{t+1}-x_t\}.
$$

我们能够观察到不同的价格和负荷，但我们不知道它们的概率分布。我们的目标是在一年内使成本最小化。

假设 $x_t$ 是离散的，取值为 $x_1, \ldots, x_M$。设 $(\mubar_{tx}, \beta_{tx})$ 为我们对 $\E C(S_t,W_{t+1})$ 估计的均值和精度，并假设我们使用一种称为*区间估计*的策略 $X^{IE}(S_t\vert \theta)$ 来选择 $x_t$：

$$
X^{IE}(S_t\vert \theta^{IE}) = \argmin_x \left(\mubar_{tx} - \theta^{IE} \sqrt{\frac{1}{\beta_{tx}}}\right).
$$

  <ol type="a">
    <li>给出状态变量 $S_t$ 和外源信息 $W_{t+1}$。</li>
    <li>写出为使一年内累积成本最小化而寻找 $\theta^{IE}$ 的目标函数。通过将随机变量作为期望算子的下标（如 $\E_Y$ 中所示）来表示对每个随机变量的期望。然后展示假设你有每个随机变量的 $K$ 个样本时，如何将该期望写成一个模拟形式。</li>
    <li>给出使用数值导数求 (b) 中目标函数梯度的公式，并写出一个随机梯度算法，用于在 $N$ 次迭代内找到较优的 $\theta$ 值。</li>
    <li>现在假设价格按照 $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2}$ 演变。此时状态变量是什么，向状态变量增加维度会如何使上述寻找最优 $\eta$ 的问题变得更复杂？</li>
  </ol>
</li>
<li>考虑上面的扩展 2，其中价格 $p$ 现在随迭代而变化，并且我们在时间 $n$ 收到的价格在时间 $n$ 是未知的，因此我们将其记为 $p^{n+1}$。现在假设 $p^{n+1}$ 独立于 $p^n$，且 $D^{n+1}$ 独立于 $D^n$。
  <ol type="a">
    <li>对于方程 $\eqref{eq:newsvendorextension1}$ 中的模型，给出状态变量 $S^n$ 和外源信息变量 $W^n$。</li>
    <li>给出该问题的随机梯度算法，并说明它与价格恒定时的算法基本相同。</li>
  </ol>
</li>
<li>扩展习题 7，但现在假设价格按照以下方式演变

$$
p^{n+1} = \eta_0 p^n + \eta_1 p^{n-1} + \eta_2 p^{n-2} + \varepsilon^{n+1}
$$

其中 $\varepsilon^{n+1}$ 是一个均值为 0 的噪声项，独立于价格过程。
  <ol type="a">
    <li>对于方程 $\eqref{eq:newsvendorextension1}$ 中的模型，给出状态变量 $S^n$ 和外源信息变量 $W^n$。</li>
    <li>给出该问题的随机梯度算法。</li>
  </ol>
</li>
<li>现在假设我们的目标是优化

$$
\begin{align}
F^n(x^n,W^{n+1}) = p^n \min(x^n,D^{n+1})-cx^n.  \label{eq:newsvendorextension2}
\end{align}
$$

方程 $\eqref{eq:newsvendorextension2}$ 与 $\eqref{eq:newsvendorextension1}$ 之间的唯一区别在于，现在我们在选择决策 $x^n$ *之前*就能看到价格 $p^n$。我们可以从价格的下标方式知道这一点。
  <ol type="a">
    <li>对于方程 $\eqref{eq:newsvendorextension2}$ 中的模型，给出状态变量 $S^n$ 和外源信息变量 $W^n$。</li>
    <li>给出该问题的随机梯度算法。与之前的问题不同，这个梯度将是 $p^n$ 的函数。</li>
  </ol>

梯度依赖于价格 $p^n$ 的这种情形是一个相当重大的复杂化。这里发生的情况是，我们不再是试图寻找一个最优解 $x^\ast $（或更准确地说，$x^{\pi,N}$），而是试图寻找一个函数 $x^{\pi,N}(p)$。

这里的诀窍是为 $x^{\pi,N}(p)$ 选取一个函数形式。我们建议两种替代方案：

**查找表**——即使 $p$ 是连续的，我们也可以将其离散化为一系列离散价格 $p_1, \ldots, p_K$，选取最接近价格 $p^n$ 的值 $p_k$。将这个价格称为 $p^n_k$。现在设想一个由与 $p^n$ 最接近的任何 $p_k$ 索引的随机梯度算法。然后我们使用随机梯度来更新 $x^n(p^n_k)$，公式为

$$
x^{n+1}(p^n_k) = x^n(p^n_k) + \alpha_n \nabla_x F^n(x^n,W^{n+1}).
$$

当然，我们不希望将 $p$ 离散化得太细。如果我们将价格离散为比如说 100 个区间，这就意味着我们要寻找 100 个订购量 $x^{\pi,N}(p)$，这将相当困难。

**参数化模型**——现在设想我们认为可以将订购量 $x^{\pi,N}(p)$ 表示为一个参数化函数

$$
\begin{align}
x^{\pi,N}(p\vert \theta) = \theta_0 + \theta_1 p + \theta_2 p^{\theta_3}. \label{eq:parametricorderquantity}
\end{align}
$$

当我们使用这样一个参数化函数时，我们不再是试图寻找订购量 $x^{\pi,N}$；而是试图寻找决定该函数的 $\theta$（在此例中为 $\eqref{eq:parametricorderquantity}$）。我们的随机梯度算法现在变为

$$
\begin{align*}
\theta^{n+1} &= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d \theta} \\
&= \theta^n + \alpha_n \frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta},
\end{align*}
$$

请记住，$\theta^n$ 是一个四元列向量，而 $x^n$ 是一个标量。第一个导数就是我们原来的随机梯度

$$
\frac{d F^n(x^{\pi,N}(p^n\vert \theta^n),W^{n+1})}{d x} = \begin{cases} p-c & x \leq W, \\ -c & x > W. \end{cases}
$$

第二个导数直接由策略 $\eqref{eq:parametricorderquantity}$ 计算得出，其表达式为

$$
\frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta} = \begin{pmatrix} \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_0} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_1} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_2} \\ \frac{d x^{\pi,N}(p^n\vert \theta^n)}{d \theta_3} \end{pmatrix} = \begin{pmatrix} 1 \\ p^n \\ (p^n)^{\theta_3} \\ \theta_2(p^n)^{\theta_3} \ln{p^n} \end{pmatrix}.
$$

使用参数模型如果参数形式与函数$x^{\pi,N}(p)$的真实形式相匹配，可能会非常有效。查找表表示更为通用，这可以是一个优点，但如果离散化过于精细，就需要更多的迭代次数才能求解。

牢记这些策略，考虑以下三个扩展：</li>
<li>回到方程$\eqref{eq:newsvendorextension1}$中的目标函数，其中价格只有在我们做出订购决策之后才会揭示，但现在$p^{n+1}$依赖于历史，如下所示

$$
p^{n+1} = p^n + \varepsilon^{n+1}.
$$

讨论一下根据我们上面介绍的内容，你会如何处理这个问题。</li>
<li>重复习题10，但现在假设

$$
p^{n+1} = 0.5 p^n + 0.5 p^{n-1} + \varepsilon^{n+1}.
$$</li>
<li>重复习题10，但现在数量$x^n$的选择要满足约束$0 \leq x \leq R^n$，其中

$$
R^{n+1} = \max\{0, R^n + x^n - W^{n+1}\},
$$

并且价格$p=p^n$是在我们做出决策之前揭示的。经过这一转变，我们的问题就变成了一个传统的库存问题。</li>
<li>弹性支出账户（FSA）是一种会计手段，允许人们将税前资金存起来用于支付医疗费用。你必须在第$t$年年末就分配好第$t+1$年可用的金额。这里的难点在于，如果你存入的钱太多，剩余部分就会损失掉。

设$M_{t+1}$为你在第$t+1$年的医疗费用，设$x_t$为你在第$t$年年末为第$t+1$年分配的金额。设$r$为你的边际税率，其中$0 < r < 1$。你在第$t+1$年的总支出由下式给出

$$
C(x_t,M_{t+1}) = x_t + \frac{1}{1-r}\max\{0,M_{t+1} - x_t\}.
$$

你想使用如下形式的随机梯度算法

$$
x_{t+1} = x_t + \alpha_t \gbar_{t+1},
$$

其中

$$
\gbar_{t+1} = (1-\eta)\gbar_t + \eta \frac{dC(x_t,M_{t+1})}{dx_t}
$$

而$0 < \eta < 1$是一个平滑因子。对于步长，使用

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + K_t -1},
$$

其中$K_t$统计成本函数导数变号的次数。也就是说

$$
K_{t+1} = \begin{cases} K_t +1 & \text{if } \frac{dC(x_t,M_{t+1})}{dx_t} \frac{dC(x_{t-1},M_t)}{dx_{t-1}} < 0. \\ K_t & \text{otherwise.} \end{cases}
$$

你的任务是通过将这个问题表述为一个序贯决策问题，来确定步长参数$\theta^{step}$和平滑参数$\eta$。假设你可以使用一个模拟器来评估步长规则的性能。

我们首先要在假设已知$M_{t+1}$分布的情况下，找到最优解：
  <ol type="a">
    <li>$\frac{dC(x_t,M_{t+1})}{dx_t}$是什么？记住这是在$M_{t+1}$变为已知之后计算的。</li>
    <li>通过令（(a)部分的）导数等于零，然后求解$x^\ast $，来找到最优静态解。假设累积分布函数$F^M(m) = Prob(M_{t+1} \leq m)$是已知的。</li>
  </ol>

现在我们要对序贯学习问题进行建模，此时我们将不再假设$M_{t+1}$的分布是已知的：
  <ol type="a" start="3">
    <li>这个动态系统的状态变量是什么？</li>
    <li>决策变量是什么？</li>
    <li>外源信息是什么？</li>
    <li>转移函数是什么？记住你需要为状态变量的每个元素写出一个方程。</li>
    <li>目标函数是什么？你正在对什么进行优化？</li>
  </ol>
</li>
<li>我们将假设我们出售天然气的价格会逐月变化。月度利润函数由下式给出

$$
F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t,
$$

其中$D_{t+1}$是第$t + 1$月的电力需求（以兆瓦时为单位）。

为简单起见，假设价格过程按如下方式演变：

$$
p_{t+1} = \begin{cases} p_t - 1 & \text{with probability 0.2,} \\ p_t & \text{with probability 0.6,} \\ p_t + 1 & \text{with probability 0.1.} \end{cases}
$$

  <ol type="a">
    <li>重新写出你在习题15第(a)部分最初给出的模型的五个要素。请注意，现在不再是寻找$x_t$，而是寻找$x_t(p_t)$。这意味着我们现在不是在寻找一个标量，而是在寻找一个函数。</li>
    <li>我们将首先把$x_t(p_t)$表示为一个查找表函数，这意味着我们要将$p_t$离散化为一组离散价格$(0, 1, 2, \ldots, 50)$。请在不编写任何代码的情况下，描述你将用来估计函数$x_t(p_t)$的方法步骤（你的描述必须足够细致，使得别人可以据此编写代码）。将这个问题的复杂度与基本模型进行比较。</li>
    <li>重复(b)，但不再对$x_t(p_t)$使用查找表，而是使用以下方式近似策略的函数形式

    $$
    x_t(p_t\vert \theta) = \theta_0 + \theta_1 p_t + \theta_2 \ln{p_t} + \theta_3 \exp{\{\theta_4 p_t\}}.
    $$

    再次描述用于寻找$\theta$的自适应算法的步骤。</li>
  </ol>
</li>
</ol>

**编程题**

这些习题使用[tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/)上的Python模块*AdaptiveMarketPlanning*。

<ol class="book-exercises" style="counter-reset: exercise 14;">
<li>一家大型工业气体公司，将空气转化为液态氧和液态氮，必须签订天然气合同用于发电。这些合同为下一个月提供一定数量的天然气，提前一个月签订。设$W_{t+1}$为第$t+1$月的电力需求（以兆瓦时为单位），设$x_t$为在第$t$月初决定、在第$t + 1$月购买的天然气数量（我们本可以将其索引为$x_{t,t+1}$）。

假设我们以每等效兆瓦时（mwh）20美元的价格购买天然气（通常以百万btu为单位计量），并以每等效mwh 26美元的价格出售（稍后我们将在这些价格中引入不确定性）。

为简单起见，我们将假设随机变量$W_1,W_2, \ldots, W_t,$是平稳的，这意味着它们都具有相同的分布，但该分布是未知的。你在第$t$月的利润由下式给出

$$
F_t(x_t,W_{t+1}) = p \min\{x_t,W_{t+1}\} - cx_t.
$$

进一步假设你将使用随机梯度算法来求解订购数量$x_t$，如下所示

$$
x_{t+1} = x_t + \alpha_t \nabla F_t(x_t,W_{t+1}).
$$

最后，假设步长由下式给出

$$
\alpha_t = \frac{\theta^{step}}{\theta^{step} + N_t - 1},
$$

其中$N_t$统计梯度变号的次数。我们使用以下方式写出$N_t$的更新方程

$$
N_{t+1} = \begin{cases} N_t + 1 & \text{if } \nabla F_{t-1}(x_{t-1},W_t)\nabla F_t(x_t,W_{t+1}) < 0, \\ N_t & \text{otherwise.} \end{cases}
$$

  <ol type="a">
    <li>写出这个问题模型的五个要素。对于目标函数，你想要找到最佳策略（这将是一个算法），以最大化在$T = 24$个月的时域内买卖天然气的总利润。请注意，对策略的搜索指的是寻找$\theta^{step}$的最佳值。</li>
    <li>使用<a href="https://tinyurl.com/sdagithub/">tinyurl.com/sdagithub</a>上的python包<em>AdaptiveMarketPlanning</em>来评估(a)部分模型中的$\theta^{step} = (2,5,10,20,50)$。</li>
    <li>如果你要优化终端奖励而不是累积奖励，你的目标函数会如何变化？请务必以嵌套形式写出期望（即如果你要对$W$求期望，使用类似$\E_W$的记号）。</li>
    <li>重复对最佳$\theta^{step}$的搜索（使用相同的值），但现在使用你在(c)部分给出的最终奖励表述。</li>
    <li>现在假设你的目标函数由下式给出

    $$
    F_t(x_t,W_{t+1}) = p_{t+1} \min(x_t,W_{t+1}) - cx_t.
    $$

    其中我们现在假设我们必须在不知道我们卖给市场的电力将获得的价格的情况下，就数量$x_t$签订合同。相反，价格$p_{t+1}$是在第$t + 1$月期间揭示的。这一变化将如何影响你的模型和求解策略？</li>
  </ol>
</li>
</ol>
{% endraw %}
