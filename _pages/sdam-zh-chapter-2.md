---
layout: book
book_data: sdam_toc_zh
book_home: /sdam/zh/contents/
title: "第2章:资产出售问题"
permalink: /sdam/zh/chapter-2/
date: 2026-07-17
lang: zh
translated_from: en
translated_from_hash: 0243c062a31cf107
---


{% raw %}
## 本章概览

资产出售问题是我们所研究的序贯决策问题中最简单的一种，它纯粹涉及一个随机价格过程，我们必须决定何时卖出所持有的资产。这个问题就是要确定何时出售资产，以最大化我们所获得的期望价格。

这个问题被广泛称为*最优停止问题*，通常用相当复杂的数学来表述。我们用它来说明属于我们四大类策略中第一类的一些基本策略，即策略函数近似（PFAs）。我们将介绍若干种PFA，每一种都需要调整参数才能获得最佳效果。

这个练习是对通用建模框架全部五个要素的一个简单而优雅的说明。

## 叙述

我们持有一批股票，正在寻找合适的出售时机。首先我们假设自己是一个小散户，这意味着我们卖出多少股份并不重要，因此我们将假设只持有一股股票。如果我们在时间 $t$ 卖出，我们会收到一个随时间按某种随机过程变化的价格，尽管我们并不认为价格存在上涨或下跌的趋势。一旦我们卖出股票，该过程就会终止。

## 问题的建模框架

我们三个建模问题的答案是：

- **指标：** 最大化我们出售资产时所获得的期望价格。
- **决策：** 是持有还是出售资产。
- **不确定性：** 未来各时间段的出售价格。

## 基本模型

### 状态变量

我们的过程有两个状态变量：一个是"物理状态"，用来表示我们是否仍持有该资产；另一个是"信息状态"，在本问题中即为股票的价格。

我们的"物理状态"由下式给出

$$
R^{asset}_t = \begin{cases} 1 & \text{if we are holding the stock at time } t,\\ 0 & \text{if we are no longer holding the stock at time } t.\end{cases}
$$

如果我们卖出股票，就会收到每股 $p_t$ 的价格。这意味着我们的状态变量为

$$
S_t = (R^{asset}_t, p_t).
$$

### 决策变量

决策变量是指是否持有或出售股票。我们用下式表示

$$
x_t = \begin{cases} 1 & \text{if we sell the stock at time } t,\\ 0 & \text{if we do not sell the stock at time } t.\end{cases}
$$

在这个问题中我们只允许卖出股票，因此必须满足约束

$$
x_t \leq R^{asset}_t.
$$

我们将定义策略 $X^\pi(S_t)$，它将决定我们如何做出决策。在这个阶段，我们先引入策略的记号，而将策略的设计留待后面进行。这正是我们所说的"先建模，后求解"的含义。

### 外源信息

我们基本模型中唯一的随机过程就是价格的变化。有两种方式来表示这一点。一种是假设外源信息即为价格的变化。我们可以将其写为

$$
\phat_{t+1} = p_{t+1} - p_t.
$$

这意味着我们的价格过程按下式演化

$$
p_{t+1} = p_t + \phat_{t+1}.
$$

我们随后可将外源信息 $W_{t+1}$ 写为

$$
W_{t+1} = \phat_{t+1}.
$$

第二种方式是假设我们直接观察到下一时刻的价格，此时我们可以写成

$$
W_{t+1} = p_{t+1}.
$$

### 转移函数

转移函数由描述状态如何随时间演化的方程组成。$R_t$ 的转移方程由下式给出

$$
\begin{align}
R^{asset}_{t+1} = R^{asset}_t - x_t,  \label{eq:assetsellingR}
\end{align}
$$

其中我们有约束 $x_t \leq R^{asset}\_t$，以确保当我们不再持有该资产时不会将其卖出。

接下来我们需要写出价格过程如何随时间演化。如果我们使用 $\phat_t$ 记号，那么价格 $p_t$ 的转移函数将由下式给出

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1}.\label{eq:assetsellingP}
\end{align}
$$

方程 $\eqref{eq:assetsellingR}$ 和 $\eqref{eq:assetsellingP}$ 共同构成了我们所称的*转移函数*，我们将其写为

$$
S_{t+1} = S^M(S_t, X^\pi(S_t), W_{t+1}).
$$

如果我们用策略 $X^\pi(S_t)$ 来做决策，并选取样本路径 $\omega$ 来确定序列 $W_1, W_2, \ldots, W_T$，那么我们可以将该过程的一次模拟写为

$$
(S_0, x_0 = X^\pi(S_0), W_1(\omega), S_1, x_1=X^\pi(S_1), W_2(\omega), \ldots, x_{T-1}, W_T(\omega), S_T).
$$

请注意，在写出该序列时，我们是按变量所包含的信息内容来索引它们的。例如，$S_0$ 是一个初始状态，$x_0$ 只依赖于 $S_0$。相比之下，任何以 $t$ 为下标的变量都可以"看到"外源过程 $W_1, \ldots, W_t$ 的任何结果，但不能看到 $W_{t+1}$。

### 目标函数

我们以目标函数的表述来完成模型构建，这将成为评估策略的基础。首先，我们需要有一个绩效指标，在本问题中即为我们出售股票所获得的收益。我们可以定义一个通用的贡献函数，记为 $C(S_t,x_t)$，由下式给出

$$
C(S_t,x_t) = p_tx_t.
$$

在我们的问题中，在我们决定卖出之前，$x_t =0$。目前，先假设我们出售的是单一的离散资产（我们可以把这想象成一次性卖出所有股份）。在这种情况下，当我们卖出时，我们令 $x_t = 1$，这在整个时域中只会发生一次。我们写出 $C(S_t,x_t)$ 对状态的依赖关系，是因为价格 $p_t$ 的存在。

现在我们想要将优化问题表述出来。如果价格是预先给定的，我们可以写成

$$
\begin{align}
\max_{x_0, \ldots, x_{T-1}} \sum_{t=0}^{T-1} p_tx_t, \label{eq:deterministicobjassetselling}
\end{align}
$$

其中我们施加约束

$$
\sum_{t=0}^{T-1} x_t = 1, \quad x_t \leq 1, \quad x_t \geq 0.
$$

当问题是确定性的时，这样处理没有问题，但我们该如何建模以应对价格中的不确定性呢？我们的做法是设想我们正沿着价格 $p_1(\omega), p_2(\omega), \ldots$ 的一条样本路径 $\omega$ 来模拟一个策略。使用策略 $\pi$，我们随后会用下式生成一系列状态

$$
S_{t+1}(\omega) = S^M(S_t(\omega), X^\pi(S_t(\omega)), W_{t+1}(\omega)).
$$

我们写出 $S_t(\omega)$ 以表达对样本路径的依赖关系。我们也可以写成 $S^\pi_t(\omega)$ 以表达对策略 $\pi$ 的依赖关系，但为了简洁起见，我们通常省略对策略的依赖表示。

如果我们沿这条样本路径遵循策略 $\pi$，就可以用下式计算其绩效

$$
\Fhat^\pi(\omega\vert S_0) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)).
$$

这是针对单一样本路径而言的。请注意，对于每条样本路径，我们都会从策略 $x_t(\omega) = X^\pi(S_t(\omega))$ 得到一组决策 $x_t(\omega)$。这种记法表明 $x_t$ 是一个依赖于样本路径 $\omega$ 的随机变量。对于每条样本路径，我们仍然有 $\sum_{t=0}^{T-1} x_t(\omega) =1$，这与我们上面针对该问题确定性版本所给出的约束相对应。存在一个时间 $\tau(\omega)$，即对于 $t=\tau(\omega)$ 而言 $x_t(\omega)=1$ 成立的时刻。这一时间在本资产出售问题中被称为*停止时间*。

我们可以对 $N$ 个样本 $\omega^1, \ldots, \omega^n, \ldots, \omega^N$ 进行模拟，并用下式取平均

$$
\begin{align}
\Fbar^\pi(S_0) = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n\vert S_0). \label{eq:assetsellingfbarpi}
\end{align}
$$

最后，我们把寻找最佳策略的优化问题写出来，即

$$
\begin{align}
\max_\pi \Fbar^\pi(S_0). \label{eq:maxpifbarasset}
\end{align}
$$

我们将会看到，由 $\eqref{eq:maxpifbarasset}$ 所表述的、寻求最优策略的优化问题主要具有理想化的性质。虽然我们当然希望找到最优策略，但通常我们只能满足于我们所能找到（且可计算）的最佳策略。

在实践中，我们通常在优化问题中使用如方程 $\eqref{eq:assetsellingfbarpi}$ 那样的平均值。然而，这只是对实际求期望的一种近似，我们将其写为

$$
\begin{align}
F^\pi(S_0) = \E \Fhat^\pi(S_0) \approx \Fbar^\pi(S_0). \label{eq:assetsellingfpiexpectation}
\end{align}
$$

按照惯例，当我们写出期望时，会去掉 $\omega$ 上的下标，转而将 $\Fhat^\pi$ 视为一个随机变量，而 $\Fhat^\pi(\omega)$ 则被视为一次样本实现（这是随机建模领域的标准记法，你只需习惯它即可）。

利用期望算子，我们可以将目标函数写为

$$
\begin{align}
\max_\pi  \E \Fhat^\pi(S_0). \label{eq:assetsellingobjective}
\end{align}
$$

通常，我们会将目标函数写为

$$
\begin{align}
\max_\pi \E \left\{\sum_{t=0}^{T-1} p_tX^\pi(S_t)\vert S_0 \right\}. \label{eq:assetsellingexpectedsum}
\end{align}
$$

方程 $\eqref{eq:assetsellingobjective}$（或 $\eqref{eq:assetsellingfpiexpectation}$、$\eqref{eq:assetsellingexpectedsum}$）的形式简洁明了。你只需记住，几乎从来都无法真正计算出这个期望值，因此我们通常依赖于运行仿真并像方程 $\eqref{eq:assetsellingfbarpi}$ 那样取平均值。

现在剩下的问题就是在各种策略中进行搜索。我们始终会先建立模型，然后再转向设计策略这一问题。在此之前，我们必须考虑如何对 $S_0$ 中的任何不确定性以及外源信息过程 $W_1, \ldots, W_T$ 进行建模。

## 不确定性建模

我们需要某种方式来抽样获得 $W_t$ 的观测值，在本问题中，这意味着要对价格 $p_t$ 随时间的演化进行建模。一种方式是从历史数据中抽取样本。设想我们希望在一年的时间段内运行仿真。我们可以使用前一年的历史数据，但这仅仅是一条样本路径。

第二种策略，也是我们经常会使用的，是估计一个统计模型。对于我们的基本模型，我们可以假设

$$
\begin{align}
p_{t+1} = p_t + \phat_{t+1},\label{eq:assetsellingpricemodel1}
\end{align}
$$

其中 $\phat_{t+1}$ 由某个概率分布来描述。一个简单的模型可以假设 $\phat_{t+1}$ 服从均值为0、方差为 $\sigma^2$ 的正态分布。我们还可以首先假设价格变化 $\phat_t$ 与 $\phat_{t+1}$ 相互独立，且 $\phat_{t+1}$ 与当前价格 $p_t$ 相互独立（后一个假设有点强，但它有助于我们入手研究）。

大多数计算机语言都提供了用于模拟正态分布观测值的函数。例如，Excel提供了函数`Norm.inv`$(p,\mu,\sigma)$，它返回均值为 $\mu$、标准差为 $\sigma$（其中 $P[W \leq w] = p$）的随机变量 $W$ 的取值 $w$。一个标准的技巧是令 $p=Rand()$，其中 $Rand()$ 是Excel中一个返回在 $0$ 和 $1$ 之间均匀分布的随机变量的函数。然后我们可以写出

$$
\phat_{t+1} = \text{Norm.inv}(Rand(),0,\sigma),
$$

这样就能得到均值为 $0$、标准差为 $\sigma$ 的正态分布的 $\phat_{t+1}$ 的一个随机观测值。

表2.1展示了十个在0到1之间均匀分布的随机变量 $U$ 的观测值，以及相应的均值为0、方差为1的正态分布价格变化样本 $\phat$。

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
<p class="book-table-caption"><span class="fig-num">表2.1.</span> 十个均匀分布随机变量 $U$，以及十个相应的均值为0、方差为1的正态分布价格变化样本 $\phat$。</p>
</div>

方程 $\eqref{eq:assetsellingpricemodel1}$ 是一个相当基础的价格模型，但它有助于说明我们的建模框架。在下文中，我们将引入一些包含更丰富模型的扩展内容。

## 策略设计

我们可以为这个问题设想若干不同的策略。例如，一个简单的策略可能是当价格跌破我们认为预示着即将大幅下跌的某个限价点时就卖出。因此，我们可以将该策略写为

$$
\begin{align}
X^{sell-low}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy1}
\end{align}
$$

另一种策略可能是"高低"出售策略，即当价格上涨过高或下跌过低时我们都想卖出。令 $\theta^{high-low} = (\theta^{low}, \theta^{high})$。这可以写成

$$
\begin{align}
X^{high-low}(S_t\vert \theta^{high-low}) &= \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicy2}
\end{align}
$$

对该策略的一个可能异议是，它可能会过早地卖出一只正在上涨的股票。也许我们只想在股票价格突破一个跟踪信号时才卖出。为了解决这个问题，首先用下式建立价格的平滑估计

$$
\pbar_t = (1-\alpha) \pbar_{t-1} + \alpha \phat_t.
$$

现在考虑一个跟踪策略，我们可以将其写为

$$
\begin{align}
X^{track}(S_t\vert \theta^{track}) &= \begin{cases} 1 & \text{if } p_t \geq \pbar_t + \theta^{track}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:trackingpolicy}
\end{align}
$$

在所有这些情形中，我们只有在仍持有该资产（即 $R^{asset}\_t = 1$）的情况下，才能卖出该资产（即 $X^{track}(S_t\vert \theta^{track}) =1$）。

对于这个策略，我们需要对模型稍作调整，因为现在我们需要 $\pbar_t$ 才能做出决策。这意味着我们现在会将状态写为

$$
S_t = (R^{asset}_t, p_t, \pbar_t).
$$

我们可以将策略的各个类别写成集合 $\Fcal = \lbrace $"卖低"、"高低"、"跟踪"$\rbrace $。对于每一类策略，我们都有一组参数，可以写为 $\theta^f$（其中 $f\in\Fcal$）。对于"卖低"和"跟踪"策略只有一个参数，而 $\theta^{high-low}$ 有两个参数。

现在我们可以用一种更实用的方式来表述对策略 $\pi$ 的搜索——即先在函数类 $f\in\Fcal$ 中搜索，然后再在参数 $\theta^f \in \Theta^f$ 中搜索，其中 $\Theta^f$ 给出了可能取值的范围（同时也刻画了 $\theta^f$ 的维数）。

这一节中我们设计策略的方式可能显得有些随意，但事实上，许多策略（包括大型对冲基金所使用的买卖策略）正是以这种方式设计出来的。策略有许多种类型，其中有些表现会优于其他类型；我们以这些为示例来加以说明。设计策略是一门艺术，这与为估计而设计统计模型的艺术相仿。

## 策略评估

我们在上面指出，可以通过使用如下方式对策略进行仿真来评估它

$$
\Fhat^\pi(\omega) = \sum_{t=0}^{T-1} p_t(\omega)X^\pi(S_t(\omega)),
$$

其中 $\omega$ 用于表示模型中所使用的外源随机变量的一条样本路径的实现值。表 2.2 展示了一组价格样本路径。例如，假设我们正在使用 $\theta^{sell-low} = \Doll 42$ 的“低价卖出”策略。现在考虑在样本路径 $\omega^5$ 上对其进行测试。结果将是

$$
\Fhat^{sell-low}(\omega^5) = \$41.53,
$$

因为 $\Doll 41.53$ 是第一个低于 $\Doll 42$ 的价格。如果所有价格都没有跌破我们的卖出点，那么我们所有的策略都被设计为在最后卖出。

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
<p class="book-table-caption"><span class="fig-num">表 2.2。</span> 一组价格路径示例。</p>
</div>

然后我们可以通过反复仿真并取平均值来评估每个策略（既包括策略类别，也包括该类别的参数）。我们将其写为

$$
\Fbar^\pi = \frac{1}{N} \sum_{n=1}^N \Fhat^\pi(\omega^n).
$$

有时我们需要给出一个置信区间，因为 $\Fbar^\pi$ 只不过是一个统计估计值。我们首先要计算随机变量 $\Fhat^\pi$ 的方差估计，方法是使用

$$
(\sigmahat^\pi)^2 = \frac{1}{N-1} \sum_{n=1}^N (\Fhat^\pi(\omega^n)-\Fbar^\pi)^2.
$$

然后我们使用下式得到平均值 $\Fbar^\pi$ 的方差估计

$$
(\sigmabar^\pi)^2 = \frac{1}{N} (\sigmahat^\pi)^2.
$$

由此，我们可以构造一个置信区间，用来比较我们可能称之为 $\pi^A$ 和 $\pi^B$ 的两个策略。设 $\mu^\pi$ 为策略 $\pi$ 的真实表现，其中 $\Fbar^\pi$ 是我们对 $\mu^\pi$ 的统计估计。我们希望得到差值 $\mu^{\pi^A} - \mu^{\pi^B}$ 的置信区间。这个差值的最佳估计是 $(\Fbar^{\pi^A} - \Fbar^{\pi^B})$。该差值的方差为

$$
\Var(\Fbar^{\pi^A} - \Fbar^{\pi^B}) = (\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2,
$$

其中我们假设估计值 $\Fbar^{\pi^A}$ 和 $\Fbar^{\pi^B}$ 是独立的，这意味着每个策略都是在不同的随机价格样本上进行测试的。在这种情况下，我们将使用如下方式计算置信区间

$$
\mu^{\pi^A} - \mu^{\pi^B} \in \left(\Fbar^{\pi^A} - \Fbar^{\pi^B} + z_\alpha \sqrt{(\sigmabar^{\pi^A})^2+(\sigmabar^{\pi^B})^2}\right),
$$

其中 $z_\alpha$ 是 $z$ 的值，满足服从正态分布的随机变量 $Z$ 大于 $z$ 的概率为 $\alpha$。例如，$z_{.05} = 1.645$，这意味着 $Prob[Z \geq 1.645] = .05$。

一种更好的方法是使用相同的样本来评估每个策略。例如，我们可以在从表 2.2 中选取的同一条样本路径 $\omega$ 上测试每个策略。以这种方式测试我们的策略，我们将得到 $\Fhat^{\pi^A}(\omega)$ 和 $\Fhat^{\pi^B}(\omega)$（使用同一组价格 $p_t(\omega)$），然后计算差值

$$
\delta \Fhat^{A-B}(\omega) = \Fhat^{\pi^A}(\omega) - \Fhat^{\pi^B}(\omega).
$$

现在我们计算平均差值

$$
\delta \Fbar^{A-B} = \frac{1}{N} \sum_{n=1}^N \delta \Fhat^{A-B}(\omega^n),
$$

以及方差

$$
(\delta \sigmabar^{A-B})^2 = \frac{1}{N} \left(\frac{1}{N-1} \sum_{n=1}^N (\delta \Fhat^{A-B}(\omega^n)-\delta \Fbar^{A-B})^2\right).
$$

请注意，方差 $(\delta \sigmabar^{A-B})^2$ 将小于使用独立样本时的方差。差值的置信区间随后将为

$$
\delta \mu^{A-B}\in \big(\delta \Fbar^{A-B} - z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}, \delta \Fbar^{A-B}+ z_\alpha \sqrt{\delta \sigmabar^{A-B,2}}\big).
$$

在比较不同类别的策略时，计算置信区间可能是有用的。或者，我们可能是在比较两种物理设计的性能（例如两台机器的速度或某设施的选址）。选择策略与系统的任何设计决策都密切相似。

## 扩展

### 时间序列价格过程

假设我们想要一个能够刻画时间上自相关性的更为现实的价格过程。我们可以提出

$$
\begin{align}
p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \eta_2 p_{t-2} + \varepsilon_{t+1}, \label{eq:assetsellingpricetimeseries}
\end{align}
$$

其中我们仍然假设随机噪声 $\varepsilon_t$ 在时间上是独立同分布的。目前我们还假设我们知道系数 $\eta = (\eta_0, \eta_1, \eta_2)$。

这个价格模型需要对我们的模型做一个细微的改动，具体来说是状态变量。我们将用 $\eqref{eq:assetsellingpricetimeseries}$ 中给出的新时间序列模型来替代旧的价格转移方程 $\eqref{eq:assetsellingP}$。为了计算 $p_{t+1}$，仅仅知道 $p_t$ 已经不够了，我们现在还需要知道 $p_{t-1}$ 和 $p_{t-2}$。我们的状态变量现在将由下式给出

$$
S_t = (R_t, p_t, p_{t-1}, p_{t-2}).
$$

对于我们上面考虑过的策略，这并不会使我们的模型复杂多少。稍后，我们将引入一些策略，其中这些额外的变量会带来重大的复杂性。

### 带学习的时间序列价格过程

现在假设我们的时间序列价格过程由下式给出

$$
p_{t+1} = \etabar_{t0} p_t + \etabar_{t1} p_{t-1} + \varepsilon_{t+1},
$$

其中 $\varepsilon \sim N(0, 4^2)$，且 $\etabar_t = (\etabar_{t0}, \etabar_{t1})$ 是在时刻 $t$ 我们已知信息下对 $\eta$ 的*估计*（在前一节中，我们假设 $\theta$ 是已知的）。

存在一些简单的公式，用于根据我们的估计 $\etabar_t$ 以及对下一个价格 $p_{t+1}$ 的观测，来控制从 $\etabar_t$ 更新到 $\etabar_{t+1}$ 的过程。

我们首先令

$$
\pbar_t(p_t\vert \etabar_t) = \etabar_{t0} p_t + \etabar_{t1} p_{t-1}
$$

为在时刻 $t$ 我们已知信息下对 $p_{t+1}$ 的估计。该估计的误差由下式给出

$$
\hat{\varepsilon}_{t+1} = \pbar(p_t\vert \etabar_t) - p_{t+1}.
$$

现在令向量 $\phi_t$ 为我们价格过程中解释变量的向量，其由下式给出

$$
\phi_t = \begin{pmatrix} p_t \\ p_{t-1} \end{pmatrix}.
$$

接下来我们定义 $2 \times 2$ 矩阵 $M_t$，它使用如下方式递归更新

$$
M_t = M_{t-1} - \frac{1}{\gamma_t} (M_{t-1} \phi_t (\phi_t)^T  M_{t-1}),
$$

其中 $\gamma_t$ 是一个标量，使用下式计算

$$
\gamma_t = 1+(\phi_t)^TM_{t-1}\phi_t.
$$

现在我们可以使用下式更新 $\etabar_t$

$$
\etabar_{t+1} = \etabar_t - \frac{1}{\gamma_t}M_t \phi_t \hat{\varepsilon}_t.
$$

习题 6 将进一步深入探讨这些方程。

### 资产组合

当我们考虑一组资产时，会出现另一种情况。设 $p_{ti}$ 为资产 $i$ 的价格。暂且假设每种价格都按照下面的基本过程演变

$$
p_{t+1,i} = p_{ti}  + \varepsilon_{t+1,i}.
$$

我们可以假设各资产 $i\in\Ical$ 之间的噪声项 $\varepsilon_{t+1,i}$ 是独立的，但更现实的模型应该假设不同资产的价格是相关的。设 $\sigma_{ij} = Cov_t(p_{t+1,i},p_{t+1,j})$ 为在时刻 $t$ 我们已知信息下，资产 $i$ 和 $j$ 的随机价格 $p_{t+1,i}$ 与 $p_{t+1,j}$ 之间的协方差。暂且假设我们知道协方差矩阵 $\Sigma$，或许是通过使用历史数据集来估计它得到的（但一旦估计出来就将其保持固定）。

我们可以使用协方差矩阵，通过一种称为 Cholesky 分解的技术来生成相关价格的样本实现值。该方法通过构造协方差矩阵 $\Sigma$ 的所谓“平方根”来进行，我们将其存储在一个下三角矩阵 $L$ 中。在 python 中，使用 NumPy 包，我们会用如下 python 命令

```
L = scipy.linalg.cholesky(Sigma, lower=True)
```

矩阵 $L$ 使我们能够使用 $\Sigma = L^T L$ 得到矩阵 $\Sigma$。

现在令 $Z$ 为一个随机变量向量，每个资产对应一个分量，其中 $Z_i \sim N(0,1)$（几乎每种编程语言都有从均值为 0、方差为 1 的正态分布中生成随机样本的例程）。设 $p_t$、$p_{t+1}$ 和 $Z$ 为列向量（其维数由资产数量决定）。我们首先通过从 $N(0,1)$ 中抽样 $\vert \Ical\vert $ 次来创建样本 $\hat Z$。我们的价格样本 $p_{t+1}$ 随后由下式给出

$$
p_{t+1} = p_t + L \hat{Z}.
$$

对于这个问题，我们的状态变量由 $S_t = (R_t,p_t)$ 给出，其中 $R_t = (R_{ti})\_{i\in\Ical}$ 刻画了我们持有每种资产的股数，而 $p_t$ 是我们当前的价格向量。协方差矩阵 $\Sigma$ 不在状态变量中，因为我们假设它是静态的（这意味着我们将其放在 $S_0$ 中）。如果我们要在每次新的观测后更新协方差矩阵，答案就会发生变化，此时我们会将协方差矩阵写为 $\Sigma_t$，以体现其对时间的依赖性。由于它现在是动态变化的，状态变量将变为 $S_t = (R_t, p_t, \Sigma_t)$。

## 我们学到了什么？

我们利用这个问题来说明不同类型的 PFA 策略：

- 我们使用一个简单的资产出售问题来说明一个既具有物理状态（我们是否持有资产，或持有多少）又具有出售价格（在时刻 $t$）的序贯决策问题。
- 我们展示了如何对不确定性进行建模，并引入了外源信息过程 $W_1, \ldots, W_T$ 的样本路径 $\omega$ 这一概念。
- 我们说明了 PFA 类别中几种简单的策略。
- 我们展示了如何对一个策略进行仿真。
- 我们在价格过程中引入了一些复杂性（其中价格 $p_{t+1}$ 依赖于近期的价格历史），以及出售价格依赖于一组资产的情形，这是一个更复杂的多维信息过程。请注意，除了对该过程进行建模之外，这并不会引入任何显著的复杂性。它会产生一个维数高得多的状态变量，但对于设计或评估策略这一问题而言，这并不代表一种重大的复杂形式（并非所有类别的策略都是如此）。
- 我们展示了如何更新价格过程的线性模型。

## 习题

**复习题**

<ol class="book-exercises">
<li>我们将转移函数写为 $S_{t+1} = S^M(S_t,x_t,W_{t+1})$。
  <ol type="a">
    <li>为什么我们将外源信息写为 $W_{t+1}$ 而不是 $W_t$？</li>
    <li>使用这个方程时，我们是在什么时间点计算 $S_{t+1}$？</li>
  </ol>
</li>
<li>$p_t$ 与 $p_t(\omega)$ 之间有什么区别？</li>
<li>当你测试不同的策略时，转移函数的结构会发生变化吗？</li>
<li>方程 $\eqref{eq:deterministicobjassetselling}$ 中的目标函数是针对该问题的确定性版本所写的。如果我们求解这个优化问题，时刻 $t$ 的决策 $x_t$ 是否依赖于 $t' > t$ 时的价格 $p_{t'}$？</li>
</ol>

**问题求解题**

<ol class="book-exercises" style="counter-reset: exercise 4;">
<li>使用表 2.2 中的价格，采用当价格跌破 ＄44.00 时卖出的策略。计算 $n=1,\ldots, 10$ 时的目标函数 $\Fhat(\omega^n)$。计算平均卖出价格及其方差。</li>
<li>下面的问题将带你逐步完成资产出售（比方说，一股股票）的建模步骤。
  <ol type="a">
    <li>假设你正在使用由数学模型 $p_{t+1} = \eta_0 p_t + \eta_1 p_{t-1} + \varepsilon_{t+1}$ 给出的数据来仿真你的价格，其中 $\varepsilon \sim N(0, 6^2)$。

    我们不知道 $\eta = (\eta_0, \eta_1)$ 的值，但我们关于 $\eta$ 真实值的信念是它服从多元正态分布，$\eta \sim MVN({\bar \eta}, \Sigma)$ 其中

    $$
    \etabar_t = \begin{bmatrix} .7 \\ .3 \end{bmatrix}.
    $$

    假设协方差矩阵 $\Sigma_t$ 由下式给出

    $$
    \Sigma_t = \begin{bmatrix} (.2)^2 & (.05)^2 \\ (.05)^2 & (.1)^2 \end{bmatrix}
    $$

    其中 $\Sigma_{tij} = Cov(\eta_i,\eta_j)$，$i,j \in (0,1)$。假设在时刻 $t$，$p_t = 20$，$p_{t-1} = 24$，并且我们观测到 $p_{t+1} = 18.2$。</li>
  </ol>
</li>
</ol>

<li>利用带学习的时间序列价格过程一节中的方程，$\etabar_{t+1}$和$\Sigma_{t+1}$的更新估计是什么？请给出更新方程，并对$\etabar_{t+1}$和$\Sigma_{t+1}$进行数值计算。</li>
    <li>该问题的状态变量是什么？请给出变量清单。注意，随着习题的推进你可能需要增加变量（因为在此阶段你尚未掌握全部信息）。请确保包含你从$\etabar_t$更新$\etabar_{t+1}$所需的全部信息。你的状态变量有多少维（这等同于询问$S_t$中包含多少个变量）。</li>
    <li>我们的交易者根据价格的7日移动平均线做出交易决策。假设我们处于第$t$天，7日移动平均线的计算公式为

    $$
    \pbar_t = \frac{1}{7}\sum_{t'=t-7+1}^{t} p_{t'}.
    $$

    如果$p_t < \pbar_t - \theta^{sell}$，交易者将卖出该资产。请将该决策规则写成一个策略$X^\pi(S_t\vert \theta^{sell})$，若卖出资产则返回1，否则返回0。</li>
    <li>外源信息是什么？</li>
    <li>写出转移方程。你需要为$S_t$的每个元素给出一个方程。</li>
    <li>写出目标函数（并记得按照说明中所述，对每个随机变量使用期望算子）。请务必明确说明在（c）部分给定的策略类别下，你所优化的对象是什么。假设你是在离线环境下利用历史数据训练你的策略。</li>
  </ol>
</li>
<li>你需要对电价进行仿真，而电价素以重尾特性著称。你收集到如下表所示的数据。

<div class="book-table-wrap">
<table class="book-table is-narrow">
<thead><tr><th>Time</th><th>Price</th></tr></thead>
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
    <li>利用表中的数据构造一个累积分布函数。你需要绘制该累积分布函数（cdf）的图形，它看起来像一个具有五级台阶的阶梯函数。</li>
    <li>现在你观测到三个价格实现值：25、18、160。请利用（a）中的累积分布函数，将其转换为三个服从0到1之间均匀分布的随机变量的实现值（将该随机变量记为$U$）。</li>
    <li>现在利用$U$的这些观测值，构造出均值为0、方差为1的正态分布随机变量$Z$的三个观测值。请确保你生成这些随机变量的方法清晰明确。【提示：使用均值为0、方差为1的正态随机变量的累积分布函数，就像你在（b）部分利用（a）部分构造的累积分布函数来生成均匀随机变量那样。】</li>
    <li>假设你使用这种生成一系列标准正态（均值为0、方差为1）随机变量的方法，来拟合形如$Z_{t+1} = .7 Z_t + .3 Z_{t-1} + \varepsilon_{t+1}$的线性模型，其中$\varepsilon_{t+1}$服从均值为0、方差为1的正态分布（我们之所以知道这一点，是因为我们是在模拟标准正态随机变量）。从$t=1$、$Z_0 = 0.5$和$Z_1 = -0.3$出发，在假设$\varepsilon_2 = -.6, \varepsilon_3 = 2.2, \varepsilon_4 = 1.4$的条件下生成$Z_2, Z_3, Z_4$。然后，利用你在（a）部分得到的累积分布函数，生成$P_2, P_3$和$P_4$的观测值。</li>
  </ol>
</li>
</ol>

**编程题**

这些习题使用位于[tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/)的Python模块*AssetSelling*。

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li>我们最基本的“高-低”卖出策略由下式给出

$$
X^{high-low}(S_t\vert \theta^{high-low}) = \begin{cases} 1 & \text{if } p_t < \theta^{low} \text{ or } p_t > \theta^{high}, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases}
$$

除了*AssetSelling*模块之外，你还需要从[tinyurl.com/sdamodelingsupplements](https://tinyurl.com/sdamodelingsupplements)下载电子表格"Chapter2_asset_selling_policy"，该表格提供了python模块所需使用的参数。
  <ol type="a">
    <li>使用如下参数，对该策略进行200个时间段的仿真：

    $$
    \theta^{min} = 6, \quad \theta^{max} = 13, \quad T = 20.
    $$</li>
    <li>通过固定$\theta^{max} = 13$，然后以增量1搜索最优的$\theta^{min}$，来寻找$\theta^{min}$和$\theta^{max}$的最优值。然后将$\theta^{min}$固定在该取值上，用类似的方法搜索$\theta^{max}$（并施加约束$\theta^{max} = \theta^{min}+2$）。</li>
  </ol>
</li>
<li>考虑这样一种策略：它认识到资产价格可能正在上涨，这意味着静态的买卖限价可能并不有效。假设我们利用如下拟合的时间序列模型来预测时刻$t+1$的价格

$$
\pbar_t = 0.7 p_t + 0.2 p_{t-1} + 0.1 p_{t-2}.
$$

我们将使用$\pbar_t$作为在已知时刻$t$信息的条件下对$p_{t+1}$的预测。
  <ol type="a">
    <li>该问题的状态变量是什么？如果价格被离散化到最接近的0.1，且假设价格范围在0到100之间，状态空间的大小是多少？</li>
    <li>假设我们引入如下策略

    $$
    \begin{align}
    X^{time-series}(S_t\vert \theta^{low}) &= \begin{cases} 1 & \text{if } p_t < \pbar_t - \theta \text{ or } p_t > \pbar_t + \theta, \\ 1 & \text{if } t=T, \\ 0 & \text{otherwise.}\end{cases} \label{eq:assetsellingpolicytimeseries}
    \end{align}
    $$

    在这一版本的策略中，我们要寻找的是价格相对预期值出现的突然偏离。请绘制目标函数（贡献值）随$\theta$变化的图形。对你的图形进行评述。请注意，尽管状态空间相当大，但在该策略类别中寻找最优策略的复杂度并没有发生变化。

    （提示：你需要修改状态变量、修改高-低策略，并在模块*DriverScript*中针对不同的$\theta$取值建立一个外层循环。鼓励你自行调整代码，并选择自己的取值范围。请说明按照你所选取值范围运行代码所耗费的时间。）</li>
  </ol>
</li>
<li>（接习题9）假设我们的股票遵循某种季节性模式，这意味着我们的买卖信号应当是随时间变化的。这意味着我们需要将$\theta$替换为$\theta_t$。请讨论这将如何使我们的策略搜索过程复杂化。</li>
<li>（接习题9）我们接下来可能会认为，我们的买卖信号应当依赖于价格。例如，如果价格较高，我们可能认为，相较于价格较低时，方程$\eqref{eq:assetsellingpolicytimeseries}$中相对于$\pbar_t$应寻求更大的偏离幅度。这意味着我们需要将常数向量$\theta$替换为一个函数$\theta(\pbar_t)$。
  <ol type="a">
    <li>描述$\theta(\pbar_t)$的一种查找表表示形式，并画出一幅图，描绘你认为该函数可能呈现的形态。这需要将$\pbar_t$离散化为例如10个区间。这会给策略搜索问题带来怎样的复杂性？</li>
    <li>为$\theta(\pbar_t)$提出一种参数化形式，以体现你的直觉——即当$\pbar_t$较大时，$\theta$也应更大？此时你需要搜索的参数有哪些？</li>
  </ol>
</li>
</ol>
{% endraw %}
