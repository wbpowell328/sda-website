---
layout: book
book_data: sdam_toc_zh
book_home: /sdam/zh/contents/
title: "章 12:广告点击优化"
permalink: /sdam/zh/chapter-12/
date: 2026-07-17
lang: zh
translated_from: en
translated_from_hash: 4ae8bcde1a247d20
---


{% raw %}
## 章节概览

本章讨论优化竞价策略以最大化在Google和Facebook等电子商务平台上的回报这一问题。这些平台运行复杂的拍卖机制，以确保它们为展示的广告获得全部市场价值的报酬。该问题的建模以及策略的设计，因需要表示三种形式的不确定性而变得复杂：我们对某广告出价获胜的概率、是否赢得该竞价的结果，以及赢得竞价所获得的收入。

我们探讨三种策略。前两种相对简单：一种是短视策略，它根据我们当前对所有不确定量的估计选择最佳出价；另一种是短视策略的随机化版本，鼓励探索。第三种更为复杂：称为"知识梯度"，它最大化了进行特定出价所带来的信息价值。这需要求出从给定出价中学到的改进的期望值。知识梯度涉及相对复杂的概率计算。

## 叙述

在诸如Google等互联网网站上做广告的公司必须进行竞价，才能使其广告出现在可见位置（即赞助广告列表的顶部）。当客户输入搜索词时，Google会识别所有在其广告词列表中列出相同（或类似）搜索词的竞价者。然后Google将所有匹配项汇总，按每个参与者的出价高低排序，并运行一场拍卖。出价越高，你的广告就越有可能被放置在赞助广告列表的靠前位置，这会提高被点击的概率。图 12.1 是输入搜索词"hotels in baltimore md"后所产生结果的一个示例。

<figure class="book-figure">
  <img src="/assets/images/sdam/adclicksponsoredlist.png" alt="针对广告词搜索所显示广告的示例。" style="max-width: 500px;">
  <figcaption><span class="fig-num">图 12.1.</span> 针对广告词搜索所显示广告的示例。</figcaption>
</figure>

如果客户点击了广告，就会有一个预期回报，反映客户访问该公司网站时平均花费的金额。问题在于我们并不知道竞价响应曲线。图 12.2 展示了一族可能的响应曲线。我们面临的挑战是尝试不同的出价，以了解哪条曲线是正确的。

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickresponse.png" alt="给定出价情况下广告获得点击的概率的可能实例。" style="max-width: 500px;">
  <figcaption><span class="fig-num">图 12.2.</span> 给定出价情况下广告获得点击的概率的可能实例。</figcaption>
</figure>

我们首先假设可以在每次拍卖后调整出价，这意味着我们每次只能了解到单一的响应结果（客户是否点击了链接）。客户有可能看到了展示的链接却决定不点击，或者我们的出价可能太低，以至于我们甚至没有出现在展示的广告列表中。

我们面临的挑战是设计一个用于设定出价的策略。目标是最大化净收入，即我们从销售产品或服务中获得的收入减去我们在广告点击上花费的金额。

## 问题建模

我们对三个建模问题的回答是：

- **度量指标：** 最大化销售在平台上做广告的产品所获得的预期净收入，减去为运行广告所支付的金额。
- **决策：** 为广告出价多少。
- **不确定性：** 一次出价是否成功，以及成功出价所获得的收入金额。

## 基础模型

我们将假设使用某种参数化模型来刻画客户点击广告的概率。至少，这个概率将取决于我们为一则广告出价多少——我们出价越高，广告在赞助广告列表中出现的位置就越靠前，这会增加客户点击它的可能性。设 $K^n = 1$，若第 $n$ 个客户点击了该广告。设

$$
P^{click}(\theta_k,x) = Prob[K^{n+1}=1\vert \theta=\theta_k,x]
$$

其中 $Prob[K^{n+1}=1\vert \theta=\theta_k,x]$ 将由如下的逻辑斯谛函数描述：

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,x^n, H^n] = \frac{e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}{1+e^{\theta^{const,n}_k + \theta^{bid,n}_k x^n}}. \label{eq:adclicklogisticregression}
\end{align}
$$

该函数由 $\theta = (\theta^{const}, \theta^{bid})$ 参数化。我们不知道 $\theta$ 是什么，但我们将假设它是一个抽样集合 $\Theta = \lbrace \theta_1, \ldots,\theta_K\rbrace $ 中的某一个。

### 状态变量

初始状态 $S^0$ 包括 $\Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $，即 $\theta$ 可能取值的集合；以及 $\Rbar^0$，即客户点击链接时所获收入的初始估计值。

动态状态变量 $S^n$ 包括 $p^n_k$，即真实值 $\theta = \theta_k$ 的概率，其中 $p^n = (p^n_k)\_{k=1}^K$；以及 $\Rbar^n$，即经过 $n$ 次拍卖后对广告点击所获收入的估计值。

因此，我们的动态状态变量为

$$
S^n = (\Rbar^n, p^n).
$$

请注意，我们可以在经过 $n$ 次观测后，使用以下公式创建 $\theta$ 的点估计：

$$
\thetabar^n = \sum_{k=1}^K p^n_k \theta_k,
$$

但这是一个可以由 $S^n$ 中的信息计算出来的统计量，因此我们不将 $\thetabar^n$ 放入状态变量中。

### 决策变量

我们唯一的决策变量是出价，我们将其定义为 $x^n$，即第 $(n+1)$ 次拍卖的出价（以每次点击美元计）。和之前一样，我们令 $X^\pi(S^n)$ 为通用策略，它给出出价 $x^n$ 作为可用信息（由 $S^n$ 表示）的函数，这意味着我们可以写为

$$
x^n = X^\pi(S^n).
$$

我们假设该策略强制执行任何约束条件，例如确保出价不为负数或不至于过大。

### 外源信息

在我们的初始模型中，我们只观察单次拍卖的结果，我们使用以下方式对此建模：

$$
K^{n+1} = \begin{cases} 1 & \text{if the customer clicks on our ad,} \\ 0 & \text{otherwise.} \end{cases}
$$

以及 $\Rhat^{n+1}$，即第 $n+1$ 次拍卖所获得的收入。这意味着我们完整的外源信息变量为

$$
W^{n+1} = (\Rhat^{n+1},K^{n+1}).
$$

### 转移函数

该问题的转移函数看起来会比本书中其他问题复杂得多，这是因为我们要更新关于参数向量 $\theta$ 不确定性的信念。我们需要强调，所有转移方程都可以相对容易地编码实现。

当客户点击广告时，我们将使用以下方式更新我们估计的收入：

$$
\begin{align}
\Rbar^{n+1} = \begin{cases} (1-\alpha^{lrn}) \Rbar^n + \alpha^{lrn} \Rhat^{n+1} & \text{if } K^{n+1} = 1, \\ \Rbar^n & \text{otherwise.} \end{cases} \label{eq:adclicktransition1}
\end{align}
$$

因此，我们只在获得点击时才更新我们估计的收入。参数 $\alpha^{lrn}$ 是一个介于0和1之间的平滑参数（有时称为"学习率"），我们事先固定该参数。

接下来我们讨论概率 $p^n_k$ 的更新。我们令 $H^n$ 为状态、决策和外源信息的历史

$$
H^n = (S^0,x^0,W^1, S^1, x^1, \ldots, W^n, S^n, x^n).
$$

我们用它来写出

$$
p^n_k = Prob[\theta=\theta_k\vert H^n].
$$

对历史 $H^n$ 条件化的阅读方式是"$p^n_k$ 是在已知经过 $n$ 次观测后所了解信息的条件下 $\theta = \theta_k$ 的概率。"然后我们运用贝叶斯定理写出

$$
\begin{align}
p^{n+1}_k &= Prob[\theta=\theta_k\vert W^{n+1}, H^n] \nonumber\\
          &= \frac{Prob[K^{n+1}\vert \theta=\theta_k,H^n]Prob[\theta=\theta_k\vert H^n]}{Prob[K^{n+1}\vert H^n]}. \label{eq:adclicktransition2}
\end{align}
$$

请记住，历史 $H^n$ 包含决策 $x^n$，在给定制定这些决策的策略的情况下，该决策直接是状态 $S^n$ 的函数（而状态 $S^n$ 本身又是历史 $H^n$ 的函数）。现在我们利用方程 $\eqref{eq:adclicklogisticregression}$ 中的逻辑斯谛曲线写出

$$
\begin{align}
Prob[K^{n+1}=1\vert \theta=\theta_k,H^n] &= Prob[K^{n+1}=1\vert \theta=\theta_k, x^n]\nonumber\\
   &= \frac{e^{\theta^{const}_k + \theta^{bid}_k x^n}}{1+e^{\theta^{const}_k + \theta^{bid}_k x^n}}. \label{eq:adclicktransition2a}
\end{align}
$$

然后我们注意到

$$
\begin{align}
Prob[\theta=\theta_k\vert H^n]  = p^n_k. \label{eq:adclicktransition2b}
\end{align}
$$

最后，我们注意到分母可以用以下方式计算：

$$
\begin{align}
Prob[K^{n+1}\vert H^n] = \sum_{k=1}^K Prob[K^{n+1}\vert \theta=\theta_k,H^n] p^n_k. \label{eq:adclicktransition2c}
\end{align}
$$

我们对 $\theta$ 可能取值采用抽样表示的方式在这里为我们提供了帮助。即使 $\theta$ 只有两个维度（正如此处的情形，但仅是目前如此），对 $\theta$ 的多元分布执行二维积分也会存在问题。

方程 $\eqref{eq:adclicktransition2a}$–$\eqref{eq:adclicktransition2c}$ 使我们能够计算出 $\eqref{eq:adclicktransition2}$ 中概率的贝叶斯更新方程。方程 $\eqref{eq:adclicktransition1}$–$\eqref{eq:adclicktransition2}$ 构成了我们的转移函数

$$
S^{n+1} = S^M(S^n,x^n,W^{n+1}).
$$

### 目标函数

我们首先将单期利润函数写为

$$
C(S^n,x^n,W^{n+1}) = (\Rhat^{n+1} - x^n) K^{n+1},
$$

这意味着如果客户不点击广告（$K^{n+1} = 0$），我们将一无所获。如果客户确实点击了广告（$K^{n+1} = 1$），我们将获得由 $\Rhat^{n+1}$ 给出的收入，但我们也必须支付我们为该次广告点击所出的价，即 $x^n$。

我们最终将取期望贡献，写为

$$
\E \{C(S^n,x^n,W^{n+1})\vert S^n\} = \E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

期望中隐藏着三个随机变量：

- $\theta$，分布为 $p^n = (p^n_1, \ldots, p^n_K)$（包含在 $S^n$ 中）。
- $K^{n+1}$，其中 $P^{click}(\theta,x) = Prob[K^{n+1}=1\vert \theta,x]$。
- $\Rhat^{n+1}$，若 $K^{n+1}=1$ 我们从某个未知分布中观测到该值，而若 $K^{n+1}=0$ 则 $\Rhat^{n+1}=0$（如果客户不点击广告，我们不会获得任何收入）。

于是我们可以将期望分解为三个嵌套期望：

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \E_{\Rhat} \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\}.
$$

我们首先对 $\Rhat$ 取期望，此处我们仅使用 $\E \lbrace \Rhat^{n+1}\vert S^n\rbrace  = \Rbar^n$（请记住 $\Rbar^n$ 存在于状态变量 $S^n$ 中），这使我们能够写出

$$
\E \{(\Rhat^{n+1} - x^n) K^{n+1} \vert S^n\} = \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

接下来，我们将对给定 $\theta$ 的 $K^{n+1}$ 取期望，使用

$$
\E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\} =  (\Rbar^n - x^n) P^{click}(\theta,x).
$$

其中我们利用了若 $K^{n+1}=0$ 则 $(\Rbar^n - x^n) K^{n+1}=0$ 这一事实。

最后我们对 $\theta$ 取期望，使用

$$
\E_{\theta}  \{(\Rbar^n - x^n) P^{click}(\theta,x^n) \vert S^n\} = \sum_{k=1}^K (\Rbar^n - x^n) P^{click}(\theta=\theta_k,x^n) p^n_k.
$$

我们将令 $\Cbar(S^n,x)$ 为期望贡献，即

$$
\Cbar(S^n,x)   =  \E_{\theta} \E_{K\vert \theta} \{(\Rbar^n - x^n) K^{n+1} \vert S^n\}.
$$

我们的目标函数现在可以写为

$$
\max_\pi \E_{S^0} \E_{W^1, \ldots, W^n\vert S^0} \left\{\sum_{n=0}^N C(S^n,X^\pi(S^n),W^{n+1})\vert S_0\right\}.
$$

请注意，对 $S_0$ 的条件化正是我们向模型传达先验 $p^0\_k = Prob[\theta=\theta_k]$ 的方式。和之前一样，我们将通过对 $\theta$ 真实值的模拟样本以及观测到的点击 $K^n$ 和收入 $R^n$ 求平均来近似该期望。

## 不确定性建模

我们有三种形式的不确定性：广告点击 $K^{n+1}$、若 $K^{n+1}=1$ 则我们所获得的收入 $\Rhat^{n+1}$，以及 $\theta$ 的真实值。我们将假设我们只是从真实数据流中观测到 $\Rhat^{n+1}$，这意味着我们不需要为这些随机变量建立正式的概率模型。我们假设 $K^{n+1}$ 由我们的逻辑斯谛函数描述

$$
\begin{align}
P^{click}(\theta,x) &= P[K^{n+1} = 1\vert \theta,x=x^n] \nonumber \\
                   &= \frac{e^{\theta^{const} + \theta^{bid} x}}{1+e^{\theta^{const} + \theta^{bid} x}}, \label{eq:adclicklogistic}
\end{align}
$$

但重要的是要认识到这只是一条拟合曲线。$K^{n+1}$ 的值是从数据中观测得到的，这意味着我们无法保证该分布与我们的逻辑斯谛回归精确匹配。

最后，我们假设 $\theta \in \Theta = \lbrace \theta_1, \ldots, \theta_K\rbrace $，这也是一种近似。有一些方法可以放松对抽样集合的要求，但在没有增加太多教学价值的情况下，其逻辑会变得更加复杂。

## 策略设计

我们将探讨三种学习策略：

- 纯利用——在此策略下，根据我们当前的估计，我们总是给出看起来最优的出价。
- 激励策略——我们通过加入一个随机噪声项将探索引入我们的利用策略中，这会促使系统在我们认为最优的区域附近进行探索（这在状态和决策是连续的工程领域很受欢迎）。
- 信息价值策略——我们将最大化通过出价并了解结果所带来的信息价值。

### 纯利用

任何在线策略的起点都应该是纯利用，也就是尽我们所能做到最好。为了计算这一点，我们首先使用

$$
\E \{\Rhat^{n+1} K^{n+1}\} = \E \{\Rhat^{n+1}\vert K^{n+1} = 1\} Prob[K^{n+1}=1\vert \theta=\theta_k] = \Rbar^n P^{click}(\theta,x).
$$

为了找到最佳出价，经过一番代数运算后，我们求出对出价 $x$ 的导数

$$
\frac{d \Cbar(x)}{d x} = (\Rbar^n - x)\frac{d P^{click}(\theta,x)}{d x} - P^{click}(\theta,x)
$$

其中

$$
\frac{d P^{click}(\theta,x)}{d x} = \frac{\theta_1 e^{-\theta_0 - \theta_1 x}}{(1+e^{-\theta_0 - \theta_1 x})^2}.
$$

现在我们想要找到出价 $x^\ast $，使得

$$
\left.\frac{d \Cbar(x)}{d x}\right\vert _{x=x^\ast } = 0.
$$

图 12.3 展示了 $\frac{d \Cbar(x\vert \theta)}{d x}$ 相对于出价 $x$ 的变化情况，显示出其从正值开始并转变为负值的行为。该值等于零的点将是最优出价，这一点可以相当容易地通过数值方法找到。设 $X^{explt}(S^n)$ 为满足 $d \Cbar(x)/dx = 0$ 的出价 $x^\ast $。

这意味着我们必须运行数值算法来计算该策略。这是一种属于CFA类别的贪婪策略，但没有任何可调参数。

<figure class="book-figure">
  <img src="/assets/images/sdam/adclickprofitderivative.png" alt="广告点击利润函数相对于出价的导数。" style="max-width: 500px;">
  <figcaption><span class="fig-num">图 12.3.</span> 广告点击利润函数相对于出价的导数。</figcaption>
</figure>

### 激励策略

我们纯利用策略的一个潜在局限是，它忽略了尝试更广泛出价范围以帮助学习 $\theta$ 正确值这一过程的价值。一种流行的策略是加入一个噪声项，在工程学中称为"激励"，从而得到策略

$$
X^{excite}(S^n\vert \rho) = X^{explt}(S^n) + \varepsilon(\rho)
$$

其中 $\varepsilon(\rho) \sim N(0,\rho^2)$。在该策略中，$\rho$ 是我们的可调参数，它控制该策略中探索的程度。如果它太小，可能就没有足够的探索。如果它太大，那么我们所选择的出价将远离最优，可能还得不到任何学习上的益处。

### 信息价值策略

我们刚刚介绍的纯利用策略和激励策略都相对简单。现在我们要考虑一种能最大化未来信息价值的策略。这看起来是个合理的想法，但它要求我们思考现在的信息将如何影响我们*可能*在未来做出的决策，这会稍微困难一些。

我们的利用策略假设经过$n$次实验后估计的参数$\theta^n$就是正确值，并基于这个估计来选择出价。现在假设我们出价$x^n=x$并观察到$K^{n+1}$和$\Rhat^{n+1}$，并利用这些信息得到$\theta^{n+1}$以及$\Rbar^{n+1}$的更新估计。然后我们可以利用这些更新后的估计来做出更好的决策。我们希望选择出价$x$，使决策带来的信息价值提升最大，同时要认识到在实际出价之前，我们并不知道$W^{n+1} = (\Rhat^{n+1},K^{n+1})$的结果。

设$\theta^{n+1}(x^n,W^{n+1})$为假设我们出价$x^n=x$并观察到$W^{n+1} = (\Rhat^{n+1},K^{n+1})$时$\theta$的更新估计。这是一个随机变量，因为我们正在考虑对第$n+1$次拍卖出价$x^n=x$，但尚未实际出价，这意味着我们还没有观察到$W^{n+1}$。

为了简化分析，我们将假设随机变量以概率$P^{click}(\theta,x)$取$K^{n+1} = 1$，以概率$1-P^{click}(\theta,x)$取$K^{n+1} = 0$。然后我们将假设我们对广告点击所获收益的估计已经稳定，这意味着$\Rbar^{n+1} \approx \Rbar^n$。

我们可以将其视为一种近似前瞻模型，其中$\Rbar^n$保持不变。于是我们可以将前瞻模型中的外源信息写为

$$
\Wtilde^{n,n+1}=\Ktilde^{n,n+1},
$$

其中双上标$(n,n+1)$表示这是在时刻$n$创建的前瞻模型中关于时刻$n+1$可能发生情况的信息。随机变量$\Ktilde^{n,n+1}$是我们在前瞻模型中模拟*可能*发生的广告点击，而不是关于某人是否点击了广告的实际观测。请记住，我们对前瞻模型中的任何变量都使用波浪号，这些变量将以$n$（启动前瞻模型的时刻）和$n+1$（因为我们在前瞻模型中向前看一个时间段）为索引。

接下来，我们对概率$p^n_k = Prob[\theta=\theta_k\vert H^n]$使用更新方程$\eqref{eq:adclicktransition2}$。我们可以将这些更新后的概率写为$\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$，以体现更新对$\Ktilde^{n,n+1}$的依赖关系（方程$\eqref{eq:adclicktransition2}$是针对$\Ktilde^{n,n+1}=1$写的）。由于$\Ktilde^{n,n+1}$可以取两种结果（0或1），我们将得到$\ptilde^{n,n+1}\_k(\Ktilde^{n,n+1})$的两个可能值。

现在假设我们在上面描述的纯利用策略$X^{explt}(S^n\vert \theta^n)$中，我们要在近似前瞻模型中执行它（这里我们忽略$\Rbar^n$的变化）。设$\Stilde^{n,n+1}$表示前瞻模型中由下式给出的状态

$$
\Stilde^{n,n+1}(\Ktilde^{n,n+1}) = (\Rbar^n, \ptilde^{n,n+1}(\Ktilde^{n,n+1})).
$$

请记住——由于$\Ktilde^{n,n+1}$是一个随机变量（我们仍处于时刻$n$），$\Stilde^{n,n+1}(\Ktilde^{n,n+1})$也是一个随机变量，这就是为什么我们要明确写出它对结果$\Ktilde^{n,n+1}$的依赖关系。

理解这个前瞻模型的方式，就像下棋一样，你在想一步棋（对我们来说，就是出价$x^n$），然后，在真正落子之前，先思考未来可能发生的情况。在这个问题中，我们的未来只有两种可能结果（顾客是否点击广告），这意味着$\Stilde^{n,n+1}$有两个可能值，从而产生两组更新后的概率$\ptilde^{n,n+1}(K^{n+1})$。

最后，这意味着（使用我们的纯利用策略计算得到的）最优短视出价将有两个值$X^{explt}(\Stilde^{n,n+1})$。我们未来将获得的期望贡献由$\Ctilde(\Stilde^{n,n+1},\xtilde^{n,n+1})$给出，其中$\xtilde^{n,n+1}$（这是我们正考虑在未来做出的决策）由下式给出

$$
\xtilde^{n,n+1} = X^{explt}(\Stilde^{n,n+1}).
$$

这意味着存在两个可能的最优决策，也就意味着期望贡献$\Ctilde(\Stilde^{n,n+1},X^{explt}(\Stilde^{n,n+1}))$有两个不同的值。为简洁起见，我们将这两者分别称为$\Ctilde^{n,n+1}(1)$（若$\Ktilde^{n,n+1} = 1$）和$\Ctilde^{n,n+1}(0)$（若$\Ktilde^{n,n+1} = 0$）。可以把它们看作是根据我们现在所知，未来*可能*发生的期望贡献。最后，我们可以对$\Ktilde^{n,n+1}$求期望，从而得到当下出价$x^n=x$的期望贡献，可以用下式计算

$$
\Cbar^n(x) = \sum_{k=1}^K \big(P^{click}(\theta=\theta_k,x) \Ctilde^{n,n+1}(1) + (1-P^{click}(\theta=\theta_k,x)) \Ctilde^{n,n+1}(0)\big) p^n_k.
$$

于是，我们的策略就是选择使$\Cbar^n(x)$最大化的出价$x$。假设我们将出价离散化为一个集合$\Xcal = \lbrace x_1, \ldots, x_M\rbrace $。我们的信息价值策略可以写为

$$
X^{VoI}(S^n) = \argmax_{x\in\Xcal} \Cbar^n(x).
$$

我们注意到这属于直接前瞻近似（DLA）类策略。

信息价值策略非常强大。它们更难计算，但没有任何可调参数。举例来说，想象在结果数超过两种的情况下进行这种计算。例如，如果我们没有做出保持$\Rbar^n$不变的简化，我们就必须认识到这个状态变量也在变化。

我们只是顺带提一下，我们已经对不同的学习策略进行了许多比较，一步前瞻信息价值策略通常表现得相当不错。我们在这里使用这种设定，是因为它使推导过程变得简单得多。

需要提出一个警示。结果为0或1的学习问题，是那种单次实验提供的信息非常少的问题。相反，最好的做法是假设我们做出决策（即设定出价），然后观察比方说$M$次拍卖。这意味着$\Ktilde^{n,n+1}$现在可能是0到$M$之间的一个数字。数字$M$成为一个可调参数，计算也变得稍微复杂一些（我们必须对$M+1$种实现结果求和，而不仅仅是两种），但这种方法可以运作得相当好。

## 扩展：具有简单属性的客户

假设我们知道顾客所在的位置精确到区域或最近的主要城市，我们用$L$表示。如果我们认为每个区域的行为都不同，我们可以在顾客来自位置$L=\ell$时，用$\theta_\ell$对$\theta$进行索引。这意味着如果有1,000个位置，那么我们就必须估计1,000个模型，即1,000个$\theta = (\theta^{const},\theta^{bid})$的值。

另一种方法是指定如下形式的模型

$$
Prob^n[K^{n+1}=1\vert \theta] = \frac{e^{U(x,L\vert \theta)}}{1+e^{U(x,L\vert \theta)}}.
$$

其中我们现在将使用如下的效用函数

$$
U(x,L\vert \theta) = \theta^{const} + \theta^{bid}x + \sum_{\ell=1}^L \theta^{loc}_\ell I_{\ell=L}.
$$

这是一个更简洁的模型，因为我们现在假设常数项$\theta^{const}$和出价系数$\theta^{bid}$不依赖于位置。相反，我们只是添加一个偏移量$\theta^{loc}\_\ell$。因此，我们仍然需要估计1,000个参数（位置系数），而之前我们需要估计2,000个参数——每个位置$\ell \in \lbrace 1, \ldots, L\rbrace $都有$\theta^{const}\_\ell$和$\theta^{bid}\_\ell$。

## 我们学到了什么？

- 这是另一个纯学习问题（我们在[第4章](/sdam/zh/chapter-4/)中的糖尿病问题就是一个纯学习问题），但这次我们使用的是非线性信念模型，对确定价格反应的未知参数$\theta$采用了抽样模型。
- 转移函数包含关于未知参数$\theta$等于特定值$\theta_k$的概率$p^n_k$的贝叶斯更新。
- 存在三种形式的不确定性：给定出价，某人是否会点击广告；点击广告所赚取的收益（例如，顾客是否购买了产品）；以及由未知参数$\theta$所刻画的市场反应的不确定性。
- 我们展示了一种纯利用策略、一种激励策略（它只是对利用策略推荐的价格进行随机化），以及一种最大化信息价值的知识梯度策略。

## 习题

**复习题**

<ol class="book-exercises">
<li>对于表示顾客是否点击广告的随机变量$K^n$，假设了什么概率模型？</li>
<li>对于未知（因此不确定）的参数向量$\theta$，我们假设了什么概率模型？</li>
<li>对于顾客点击广告时我们获得的收益$\Rhat^{n+1}$，我们假设了什么概率分布？</li>
<li>给出构成转移函数的各个方程的方程编号。</li>
<li>初始状态$S^0$中包含哪些概率信息？</li>
<li>添加噪声项$\varepsilon(\rho)$以创建激励策略的目的是什么？这有助于我们识别哪些具体参数？</li>
<li>用文字描述信息价值策略背后的逻辑。如果得知顾客是否点击广告不会改变我们将要出的价，那么这一信息的价值是什么？</li>
</ol>

**问题求解题**

<ol class="book-exercises" style="counter-reset: exercise 7;">
<li><p>推荐系统第一部分——信念模型——你将帮助设计一个推荐系统，当顾客在网站上滚动浏览时，该系统推荐要广告投放的产品。由于顾客必须登录，我们可以用一个包含以下内容的属性向量$a=a^n$来标识第$n$个顾客：</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$a_1$</td><td>性别（2种类型）。</td></tr>
<tr><td>$a_2$</td><td>年龄范围$(0$–$10, 11$–$20, \ldots, 70$–$100)$（8种类型）。</td></tr>
<tr><td>$a_3$</td><td>设备类型（智能手机、笔记本电脑、平板电脑）（3种类型）。</td></tr>
<tr><td>$a_4$</td><td>地区（200个）。</td></tr>
<tr><td>$a_5$</td><td>唯一ID（电子邮件地址）（1亿个）。</td></tr>
</tbody>
</table>
</div>

<p>假设我们正在推荐文章。假设我们为第$n$个顾客推荐的文章具有包含以下内容的属性$b=b^n$：</p>

<div class="book-table-wrap">
<table class="book-table is-list-table">
<tbody>
<tr><td>$b_1$</td><td>新闻、体育、艺术、商业、烹饪、房地产（6种类型）。</td></tr>
<tr><td>$b_2$</td><td>子类别：若为新闻，则分为国际、国内（按国家）、地区（一国内的区域）；若为体育，则按运动项目，再按球队（或运动员）分类；以此类推（共500种）。</td></tr>
<tr><td>$b_3$</td><td>来源（网站、报纸……）（5个来源）。</td></tr>
<tr><td>$b_4$</td><td>作者（2,000名）。</td></tr>
<tr><td>$b_5$</td><td>文章唯一ID（600万个）。</td></tr>
</tbody>
</table>
</div>

<p>我们想要估计：</p>

<p style="margin-left: 2rem;">$P(b^n\vert a^n)$ = 具有属性$a^n$的第$n$个顾客点击具有属性$b^n$的文章链接的概率。</p>

<p>当顾客$a^n$到达时，我们将假设我们必须从集合$\Bcal^n$中选择一篇新闻文章，该集合是第$n$个顾客到达时可用文章的集合（这个集合随时间变化）。我们想要选择一篇具有属性$b\in\Bcal^n$的文章，以最大化顾客点击该新闻文章的概率。我们的策略必须选择一篇具有属性$b^n$的特定文章。</p>

<p>理想情况下，我们希望得到$P(b^n_5\vert a^n_5)$，即用户$a^n_5$选择文章$b^n_5$的概率，但用户和文章的数量太多，无法获得该概率的合理估计。如果我们只考虑要素$a_1, a_2, a_3$和$a_4$，将有9,600种组合，对于这前四个要素中每一种，平均约有10,000人。下面，我们将假设仅使用$a_1$和$a_2$，即16种人群类型。</p>

<p>我们将创建一组特征$\Fcal$，这些特征由我们希望考虑的$a$和$b$的要素构成。我们只使用要素$\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $，并由此构造一组特征变量$\phi_f(a,b),~f\in\Fcal$。由于这五个要素都是分类变量，最基本的特征就是指示变量。例如，对于性别属性$a_1$，我们有两种性别，从而创建两个特征：</p>

$$
\phi_{male}(a) = \begin{cases} 1 & \text{if } a_1 = male, \\ 0 & \text{otherwise.} \end{cases} \qquad \phi_{female}(a) = \begin{cases} 1 & \text{if } a_1 = female, \\ 0 & \text{otherwise.} \end{cases}
$$

<p>如果我们仅限于使用这些基本特征，那么对于属性$a_1,a_2,b_1,b_2,b_3$的每个要素的每个可能取值，我们都会有一个特征。</p>

<p>我们的过程从第一个顾客以属性向量$a^1$登录开始，此时我们必须决定要展示给该用户的文章的属性$b^1$，然后观察$Y^1$，如果顾客点击了该文章，则$Y^1 = 1$，否则为0。这一信息被用来创建更新后的状态$S^1$，之后我们观察顾客$a^2$。</p>

<p>如果$a^n$是第$n$个顾客的属性，那么我们的决策就是利用我们所知道的信息来选择$b^n$，我们将其记为$S^n$。我们的目标是对这个问题建模，并设计一个策略$B^\pi(S^n)$来确定$b^n$。</p>

<p>我们面临的第一个挑战是建立一个信念模型：</p>
  <ol type="a">
    <li>如果我们使用查找表信念模型来处理$P(b\vert a)$，并使用属性$\lbrace a_1,a_2, b_1,b_2,b_3\rbrace $，我们需要估计多少个参数？</li>
    <li>作为替代，考虑使用逻辑回归。首先定义一个效用函数

    $$
    U(a,b\vert \theta) = \sum_{f\in\Fcal} \theta_f \phi_f(b\vert a),
    $$

    其中$\Fcal$是我们可以从元素$\lbrace a_1,a_2,b_1,b_2,b_3\rbrace $构造出的基本特征集合。现在使用下式创建点击某篇文章的概率的逻辑回归模型

    $$
    P(Y=1\vert a,b,\theta) = \frac{e^{U(a,b\vert \theta)}}{1+e^{U(a,b\vert \theta)}}.
    $$

    假设我们只使用基本指示变量，向量$\theta$的维度是多少？</li>
    <li>认识到（b）部分参数化模型中的参数数量远小于（a）部分查找表模型中的参数数量，那么为什么还会有人使用查找表信念模型而不是像逻辑回归这样的参数化模型呢？请讨论这两类信念模型各自的优缺点。</li>
    <li>现在我们需要估计$\theta$。假设我们生成了向量$\theta$的一组可能值样本，记为$\lbrace \theta_1, \ldots, \theta_k, \ldots, \theta_K\rbrace $，其中每个$\theta_k$都是一个向量，其元素为$\theta_{kf},~f\in\Fcal$。从先验概率$p^0_k = 1/K$开始。接下来假设我们观察到第一个顾客的属性$a^1$，然后我们做出决策，展示一篇属性为$b^1$的文章（这是我们的决策变量）。假设你知道$p^n_k$，请写出贝叶斯定理，用以在观察到属性为$a^{n+1}$的顾客、选择属性为$b^{n+1}$的文章、并观察到结果$Y^{n+1} = 1$之后，计算$p^{n+1}_k$。</li>
  </ol>
</li>
<li>推荐系统第二部分——系统建模——现在我们将对该问题的全部五个要素进行建模。
  <ol type="a">
    <li>给出决策前状态$S^n$和决策后状态$S^{b,n}$的组成要素。</li>
    <li>在这个过程中存在两种形式的外源信息。它们分别是什么？</li>
    <li>请写出状态（决策前和决策后）、决策以及不同形式外源信息的序列，从时间0时我们已知的信息开始，一直进行到（但不包括）第三个顾客到达为止。请按照它们发生的顺序、并使用恰当的下标（例如$n$与$n+1$的区别）来书写。</li>
    <li>写出表示转移函数的方程。</li>
    <li>写出用于寻找最佳策略$B^\pi(S^n)$的目标函数（无需指定策略的具体类型）。</li>
  </ol>
</li>
<li>推荐系统第三部分——策略设计——最后我们将尝试设计策略。假设$\theta$共有$K=20$个可能取值。
  <ol type="a">
    <li>首先假设我们已知$\theta = \theta_k$。请写出一个纯利用策略，在给定$\theta = \theta_k$的情况下，选择能使被选中概率最大化的属性$b\in\Bcal^n$。</li>
    <li>接下来假设我们并不知道$\theta=\theta_k$。相反，$\theta=\theta_k$的概率为$p^n_k$。请重新写出（a）部分的策略，此时你必须将$\theta$视为一个随机变量。你需要在某处插入一个期望。</li>
    <li>（b）部分中的策略可能被认为计算成本过高。你可以通过用其期望值来替代随机变量$\theta$，从而对其加以简化，

    $$
    \thetabar^n = \E^n \theta_k = \sum_{k=1}^K \theta_k p^n_k.
    $$

    请使用这个点估计重新写出（b）部分的策略。假设你只考虑点击概率大于0.5的文章。你认为使用（c）部分的点估计计算出的点击文章的概率，与（b）部分使用期望得到的估计相比会如何？</li>
    <li>区间估计策略使用的是，比如说，某个选择价值估计值的第95百分位数。设$\rho$为所需的百分位数，并假设它必须被舍入到0.05（因为我们为$\theta$选定了$K=20$个可能取值）。请说明如何设计一个策略，选择能使第$\rho$百分位概率（而非点估计）最大化的属性向量$b$，并给出为使广告点击总数最大化而求$\rho$最佳取值的目标函数。</li>
  </ol>
</li>
</ol>
{% endraw %}
