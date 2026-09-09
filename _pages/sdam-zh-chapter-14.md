---
layout: book
book_data: sdam_toc_zh
book_home: /sdam/zh/contents/
title: 第14章：临床试验优化
permalink: /sdam/zh/chapter-14/
date: 2026-07-17
lang: zh
translated_from: en
translated_from_hash: d2f03f02e366eab2
---


{% raw %}
## 章节概览

要将一种药物推向市场，制药公司必须经历三期测试流程，最终以成本最高的第三期结束，在该阶段，药物会被给予成百上千名患者。每周，制药公司都要查看实验结果，并必须决定是继续测试、停止并将药物推向市场，还是停止并取消该药物。

存在多个不确定性来源。第一个当然是药物本身的疗效。然而，为了测试药物，我们必须招募愿意服用该药物（或安慰剂）的患者，这引入了另一个不确定性来源。此外还存在一个不确定性，即药物对特定患者起效的概率，这与患者实际服用药物后的结果是不同的。

我们利用这一问题背景来说明三种不同的直接前瞻策略，方法是提出不同的近似问题的方式，从一个永远行不通的简单模型，到能以更高复杂度换取更好精度的更复杂模型。

## 叙述

在任何时间点，制药公司可能同时在进行数十万项测试新药的临床试验（参见 [clinicaltrials.gov](https://clinicaltrials.gov)）。药物测试分为三个阶段：

**第一期** —— 这些测试使用20到100名志愿者，历时数月，以确定剂量、识别副作用，并对药物反应和副作用进行初步评估。

**第二期** —— 这些是更大规模的试验，涉及数百名患者，跨越两年时间。目标是确定疾病是否对治疗有反应。

**第三期** —— 这些试验涉及数百到数千名患者，通常跨越多年，以评估有效性和安全性。这是确定该治疗方法是否优于现有治疗方法的阶段。

第二期和第三期试验都需要识别具有适当特征的患者以进入试验，此时他们会被随机分配到用于比较的其中一个组别。

在我们的练习中，我们假设每周招募一批医院和诊所以形成一个*潜在*人群，从中根据纸质记录识别出作为试验候选人的患者。招募医院或诊所需要支付一笔前期行政费用。该行政费用反映了该机构可能为研究提供的患者池规模。例如，招募一组总潜在人群为500名患者的医院和诊所可能需要花费250,000美元。在我们的模型中，我们将简单地设定每名患者500美元的注册成本，同时要记住，这是针对总潜在人群而言的，实际注册人数是从中抽取的。

一旦我们招募了某个机构，我们就会宣传该临床试验，随后患者（或其医生）会主动报名。此时，患者会接受更详细的评估，从而确定谁能被纳入试验。不符合条件的患者随后会被剔除。

为了这个练习的目的，我们将假设每位患者在每周开始时接受药物治疗。到该周结束时，我们就能知道该患者是否有反应。有反应的患者被认定为成功案例，其余的则被认定为失败案例。这样，每周都需要一整批全新的患者，但这些患者是从我们已招募的基础人群中抽取的。我们只能通过向试验中投入更多容量，并支付前期行政费用，来增加这一人群规模。

## 问题构建

我们对三个构建问题的回答如下：

- **指标：** 最大化药物获批使用时获得的预期收益，减去每周运行试验的成本，再减去对研究中每名患者施用药物的成本。
- **决策：** 在运行临床试验期间需要做出三类决策：是否继续再运行一周试验，还是停止；如果决定停止，我们必须决定是取消该药物还是推向市场；如果继续试验，我们还必须决定招募多少新患者。
- **不确定性：** 存在两个不确定性来源：每周有多少患者注册试验，以及试验中每位患者的结果，无论他们接受的是药物还是安慰剂。

## 基本模型

我们假设在每周$t$结束时做出决策，在第$t+1$周内执行。我们令时间$t$表示第$t$周的结束。

### 状态变量

我们有以下状态变量：$R_t$，已招募的医院和诊所中患者的潜在人群规模；$\alpha_t$，截至第$t$周该疗法在整个临床试验过程中的成功例数；$\beta_t$，截至第$t$周该疗法的失败例数；以及$\bar\lambda^{response}\_t$，根据我们在时间$t$所掌握的信息估计出的、选择加入试验的潜在患者比例。

利用这些信息，我们可以使用$\rho_t$来估计我们的治疗方案成功的概率，即根据我们在第$t$周结束时所掌握的信息，治疗方案成功的概率，因此

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

这意味着我们的状态变量将是

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

将$R_0 = 0$用作$R_t$的初始值是合理的，但利用基于先前临床试验的成功概率初始估计会有所帮助。

### 决策变量

我们使用$x^{enroll}\_t$对已招募的潜在患者数量进行建模，即通过增加新的医院设施所获得的潜在患者人群的增量。实际加入临床试验的患者人数将在第$t+1$周期间从这一人群中抽取。

我们还有何时停止试验的决策，用以下方式表示

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

如果$x^{trial}\_t = 0$，那么我们将设定$R_{t+1} = 0$，这将关闭该试验。我们假设一旦停止了试验，就不能重新启动，这意味着如果$R_t = 0$，我们将要求$x^{trial}\_t = 0$。

如果我们停止试验，就必须宣布该药物是成功还是失败，

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

我们将创建策略$X^{\pi^{enroll}}(S_t)$、$X^{\pi^{trial}}(S_t)$和$X^{\pi^{drug}}(S_t)$，用以确定$x^{enroll}\_t$、$x^{trial}\_t$和$x^{drug}\_t$。然后我们可以写出

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

一如既往，我们稍后再设计这些策略。

### 外源信息

我们首先使用$\Rhat_{t+1}$来识别加入和退出试验的新患者与退出患者，即第$t+1$周期间加入试验的新患者数量，这取决于已招募的潜在患者人群规模，由$R_{t+1} = R_t + x^{enroll}\_t$给出。例如，我们可以假设人群$R_{t+1}$中的每位患者可能以某个概率$\lambda^{response}$报名参加临床试验，该概率必须由数据估计得出。

接下来，我们用$\Xhat_{t+1}$，即第$t+1$周内的成功例数，以及$\Yhat_{t+1}$，即第$t+1$周内的失败例数，来追踪我们的成功情况。第$t$周内的失败例数可以计算为

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

这些变量取决于第$t$周结束时系统中的患者数量$R_t$。一如既往，我们将这些随机变量的基础概率模型的构建工作留到不确定性建模一节中讨论。

我们的外源信息过程则为

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

其中我们排除了$\Yhat_{t+1}$，因为它可以由其他变量计算得出。

### 转移函数

已注册患者数量的转移方程由下式给出

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

我们通过统计成功和失败的数量来更新药物成功的概率，使用

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

最后，我们通过将当前估计值$\bar\lambda^{response}\_t$与第$t+1$周注册人数$\Rhat_{t+1}$和当前已招募人数$R_t + x^{enroll}\_t$的最新比率进行平滑处理，来更新我们对试验注册患者数量的估计。

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

方程$\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$构成了我们用以下通用形式表示的转移函数

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### 目标函数

我们必须考虑以下成本：$c^{enroll}$，每个时间段内维持一名患者参与试验的成本；$c^{trial}$，维持试验持续进行的日常行政管理成本（这项成本在我们停止测试时终止）；以及$p^{success}$，如果我们停止并宣布成功所获得的（巨额）收益，这通常意味着将专利出售给制造商。

那么某一时间段的利润（贡献）由下式给出

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

那么，我们的目标函数将是我们的标准目标，表述为

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

其中我们认识到，我们的策略是由患者招募策略$X^{\pi^{enroll}}(S_t)$、试验继续策略$X^{\pi^{trial}}(S_t)$以及药物成功/失败策略$X^{\pi^{drug}}(S_t)$组合而成的。

## 不确定性建模

有两个潜在原因促使我们开发一个正式的不确定性模型。第一个原因是针对基础模型，我们既可以用它来设计策略，也可以用它来进行研究。第二个原因是，我们可能希望在随机前瞻策略中对不确定性进行建模。

我们首先开发一个概率基础模型，这意味着我们将尽最大努力对真实问题进行建模，同时认识到所有数学模型都只是对现实世界的近似。

我们需要对三个随机变量进行建模：

- 报名参加试验的客户数量$\Rhat_{t+1}$。
- （不可观测的）成功率$\rho^{true}$。
- 我们确实能观测到的成功例数$\Xhat_{t+1}$。

我们将在下面分别讨论这些内容。

### 患者招募过程

我们将采用这样一个简单模型：我们做出的选择（例如通过招募医院和诊所）使得我们预期在第$t+1$周能招募到$x^{enroll}\_t$名患者，从而使我们的总人群达到$R_{t+1} = R_t + x^{enroll}\_t$。而现实情况会有所不同。我们提议通过假设实际到达人数服从均值为$\bar\lambda^{response} (R_t + x^{enroll}\_t)$的泊松分布来对其建模，其中$0 < \bar\lambda^{response} < 1$是选择加入试验的潜在患者比例（该比例是未知的）。这意味着我们可以写出

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

我们可以对$\Rhat_{t+1}$使用截断泊松分布，此时我们必须认识到，加入试验的患者人数受限于由$R_{t+1} = R_t + x^{enroll}\_t$给出的潜在患者人数。令

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

为将志愿参加试验的患者预期人数（在给定$R_t$的条件下），以及

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

我们将$P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$写成$x^{enroll}\_t$和$\Rbar_t$的函数，以反映其对该决策以及数量$R_{t+1} = R_t + x^{enroll}\_t$的依赖关系。

截断泊松分布则由下式给出

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

对于这样的人群过程而言，泊松过程是一个很好的起点。它具有均值等于方差、且都等于$\Rbar_t$的性质。

### 成功概率

成功情况是由潜在的、但不可观测的、该疗法在一周内使患者获得成功的概率所驱动的。我们采用贝叶斯方式，为$\rho^{true}$赋予一个概率分布。有三种方式可以表示我们对$\rho^{true}$的信念分布：

- 均匀先验，即我们假设$\rho^{true}$在$0$和$1$之间均匀分布。
- 参数为$(\alpha_0,\beta_0)$的贝塔分布。
- 抽样分布，即我们假设$\rho^{true}$取集合$(\rho_1, \ldots, \rho_K)$中的某一值，其中我们令初始分布为$p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$。我们可以令$p_{0k} = 1/K$（这将与使用均匀先验相当）。或者，我们也可以从贝塔分布中估计这些值。

目前，我们将使用抽样分布，因为它最容易处理。

### 成功过程

在给定我们在时间$t$所掌握信息的条件下，随机的成功例数$\Xhat_{t+1}$首先取决于给出进入试验患者人数的随机变量$\Rhat_{t+1}$，以及试验中成功的未知概率$\rho^{true}$。构建$\Xhat_{t+1}$分布的方法是利用条件化的力量。我们假设$\Rhat_{t+1} = r$且$\rho^{true} = \rho_k$。

假设有$r$名患者进入试验，并假设成功概率为$\rho_k$，那么成功例数$\Xhat_{t+1}$就是$r$个伯努利（即0/1）随机变量之和。$r$个伯努利随机变量之和服从二项分布，这意味着

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

我们可以通过对$r$和$k$求和并乘以相应的概率，来求出$\Xhat_{t+1}$的无条件分布，这样我们得到

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

在能够找到（并计算出）方程$\eqref{eq:clinicaltrialsuccessdist}$中类似$\Xhat_{t+1}$的显式概率分布时，使用这种方法是很好的，但是有许多复杂的问题是无法做到这一点的。例如，即使是方程$\eqref{eq:clinicaltrialsuccessdist}$，也需要我们使用连续随机变量$\rho^{true}$的抽样表示这一技巧。若不这样做，我们就不得不引入关于$\rho^{true}$的密度的积分。

另一种方法更加简便，并且可以推广到更加复杂的情形，那就是使用蒙特卡洛抽样来生成$\Rhat_{t+1}$和$\Xhat_{t+1}$。下面概述了这一过程，它会产生一个样本$\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$（以及相应的$\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$）。现在我们可以用一组结果$\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$来近似随机变量$\Xhat_{t+1}$，其中每个结果发生的概率相等。

<div class="book-algorithm">
<p><strong>基于蒙特卡洛的临床试验过程模型</strong></p>
<p><strong>第1步。</strong> 对迭代$n=1, \ldots, N$进行循环：</p>
<p style="margin-left: 1.5rem;"><strong>第2a步。</strong> 从方程$\eqref{eq:clinicaltrialpoisson2}$给出的泊松分布中生成一个蒙特卡洛样本$r^n \sim \Rhat_{t+1}(x^{enroll})$。</p>
<p style="margin-left: 1.5rem;"><strong>第2b步。</strong> 生成真实成功概率$\rho^n \sim \rho^{true}$的蒙特卡洛样本。</p>
<p style="margin-left: 1.5rem;"><strong>第2c步。</strong> 给定$r^n$和$\rho^n$，对我们的$r^n$个患者进行循环，并生成一个0/1随机变量，该变量以概率$\rho^n$取值为1（即，药物成功）。</p>
<p style="margin-left: 1.5rem;"><strong>第2d步。</strong> 将成功次数求和，将其作为$\Xhat^n_{t+1}$的一个样本实现。</p>
<p><strong>第3步。</strong> 输出样本$\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$。</p>
</div>

## 设计策略

我们将利用这个问题来真正理解我们在[第7章](/sdam/zh/chapter-7/)中首次引入的完全随机前瞻策略，其表达式为

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

我们将重点关注嵌入在策略中的对策略$\pi$求最大化的含义（这可以称为"策略中的策略"）。

对于我们的临床试验应用，我们必须为三种不同的决策设计策略：招募多少患者、是否继续试验、以及当试验停止时是否宣布药物成功。我们将首先为是否停止或继续、以及如果停止的话是否宣布药物成功或失败这些决策设计简单的策略函数近似。然后我们再处理更困难的决策，即应该招募多少患者参与试验。

### 停止试验

我们首先利用参数为$(\alpha_t,\beta_t)$的贝塔分布来表示我们对$\rho^{true}$的信念，由此得到一个估计值

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

现在引入参数$\theta^{stop-low}$和$\theta^{stop-high}$，如果$\bar\rho_t > \theta^{stop-high}$，我们将停止试验并宣布成功；如果$\bar\rho_t < \theta^{stop-low}$，我们将停止试验并宣布失败。令$\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$。我们利用这些规则来定义停止试验的策略为

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

如果我们停止试验，那么宣布成功（1）或失败（0）的策略为

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### 患者招募策略

对于具有物理状态（例如$R_t$）的问题，通常需要一个前瞻策略，就像我们在随机最短路径问题中所使用的那样。但是，正如我们在随机最短路径问题中所看到的，我们可以选择在我们的随机前瞻模型中放入什么内容。

我们必须做出的一个选择是停止策略$X^{trial}(S_t\vert \theta^{stop})$和成功/失败策略$X^{drug}(S_t\vert \theta^{stop})$，我们建议在前瞻模型中使用与基础模型中相同的参数向量$\theta^{stop}$。我们可以将这些称为$\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$和$\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$，因为它们现在仅适用于前瞻模型。

确定招募多少新的潜在患者这一问题稍微更困难一些，因为获取更多潜在患者需要预先支付成本，而且我们必须在患者是否愿意加入试验（由未知参数$\lambda^{response}$给出）具有不确定性的情况下做出这一决策。

要按照上述方式创建一个完整的前瞻模型，我们需要创建诸如$\tilde\lambda_{tt'}$（作为$\bar\lambda^{response}\_t$的前瞻版本）、$\tilde\rho_{tt'}$（作为$\bar\rho_t$的前瞻版本）以及$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$（作为$(\alpha_t, \beta_t)$的前瞻版本）这样的变量。除此之外，所有的逻辑都与原始不确定性模型相同。

虽然我们可以使用完整的不确定性模型，但我们也可以选择以不同的方式简化模型。这些选择包括：

- 招募率$\bar\lambda^{response}\_t$ —— 我们有两种选择：可以继续估计$\bar\lambda^{response}\_t$，为此我们将引入符号$\tilde\lambda^{response}\_{tt'}$，表示在前瞻模型中时间$t'$时对招募率$\lambda$的估计值；或者我们也可以将$\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$固定为我们在基础模型中时间$t$时的估计值。
- 药物成功率$\rho^{true}$ —— 我们同样有两种选择：可以继续估计成功率，为此我们需要定义变量$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$来在前瞻模型中累积成功和失败次数；或者，我们也可以在前瞻模型中将$(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$固定不变。

利用我们对不确定性建模的这些选择，我们可以提出三种不同的策略来设计前瞻模型：

**模型A** —— 确定性前瞻模型。这里，我们假设招募率$\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$，也就是说，在创建前瞻模型时，招募率被固定为时间$t$时的估计值。然后我们假设真实的药物成功概率被固定为

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

这是我们在基础模型中时间$t$时的估计值。

**模型B** —— 我们将招募率的估计固定为$\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$，但假设我们继续了解药物的有效性。

**模型C** —— 我们对招募率$\tilde\lambda_{tt'}$和药物有效性$\tilde\rho_{tt'}$的学习过程进行建模。

请注意，我们没有纳入潜在的第四种模型，即固定药物有效性但继续学习患者招募率（我们稍后会看到这个模型有多么不合理）。

我们将利用这三种模型来说明设计前瞻模型的过程。

### 模型A

模型A是一个确定性问题，因为我们固定了估计的招募率$\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$和$\tilde\rho_{tt'} = \bar\rho_t$。好消息是，这基本上是一个确定性最短路径问题，其中我们已经招募到的患者人数（在前瞻模型中）$\Rtilde_{tt'}$就像网络中的一个节点，决策$\xtilde^{enroll}\_{tt'}$就像是一条将我们带到节点$\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$的链路。

为了理解这一点，回想一下我们确定性最短路径问题的方程$\eqref{eq:shortestpathbellman1}$，我们在此重复一下

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

现在我们只需将节点$i$处的值$v_i$替换为$\Vtilde_{tt'}(\Rtilde_{tt'})$，即已招募到$\Rtilde_{tt'}$名患者的价值（记住我们是在前瞻模型中）。前往节点$j$的决策被替换为招募$\xtilde^{enroll}\_{tt'}$名患者的决策。这一决策不再是带我们前往节点$j$，而是带我们前往节点$\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$。因此贝尔曼方程变为

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

单期利润函数$\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$是从基础模型中的相同函数（参见方程$\eqref{eq:clinicaltrialprofit}$）改编而来的。

我们的确定性前瞻模型只有一个问题：我们永远不会停止，因为我们的停止策略要求我们对$\tilde\rho_{tt'}$的估计进入"成功"或"失败"区域（它必须从"继续"区域开始，因为否则我们就会已经停止了基础模型）。然而，这并不意味着我们不能使用确定性前瞻模型：我们只需要固定一个时域$H$，并在$t' = t+H$时停止即可。

利用这一策略，我们在时域$t'=t, \ldots, t+H$上求解我们的确定性最短路径问题，然后由此求出$\xtilde^\ast \_{tt}$。我们的招募策略则为

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

我们并不是在断言这将是一个有效的策略。我们主要是想说明在前瞻模型中可以进行哪些类型的建模近似。

### 模型B

现在我们将响应率$\tilde\lambda_{tt'}$的估计值固定为基础模型中时间$t$时的估计值$\bar\lambda^{response}\_t$。为简化模型，我们假设招募人数$\tilde\Rhat_{t,t'+1}$等于愿意参加试验的预期患者人数$\tilde\Rbar_{tt'}$。招募人数$\tilde\Rhat_{t,t'+1}$由以下公式确定性地生成

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

其中$\lfloor x \rfloor$表示将$x$向下取整到最接近的整数。然后我们利用$Prob[\Xhat_{t+1} = s\vert \Rbar_t]$计算$\tilde\Xhat_{t,t'+1}$的分布，只是将$\Rbar_t$替换为$\tilde\Rbar_{tt'}$。

我们仍然需要从模拟真值$\tilde\rho_{tt'}$生成成功次数$\tilde\Xhat_{t,t'+1}$，并据此更新$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$，为此我们使用

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

我们利用方程$\eqref{eq:clinicaltrialsuccessdist}$中的$Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$来对$\tilde\Xhat_{t,t'+1}$的分布进行建模，只是以$\tilde\Rbar_{tt'}$而非$\Rbar_t$作为条件（请记住，我们也可以使用上面蒙特卡洛方法所得到的抽样分布，而不用泊松分布）。

我们可以通过对方程$\eqref{eq:clinicaltrialbellmanModelA}$中模型A的贝尔曼方程加以改编，来求解$t'=t, \ldots, t+H$的前瞻模型：

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

其中$\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$是以成功次数$\tilde\Xhat_{t,t'+1} = s$为条件的，而$Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$来自方程$\eqref{eq:clinicaltrialsuccessdist}$。我们必须牢记，$\Rtilde_{tt'}$的演变必须反映我们在前瞻模型中是否已经决定停止或继续试验。

我们的物理状态变量（潜在患者总数）$\Rtilde_{t,t'+1}$由下式给出

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

请注意，与我们的基础模型一样，如果我们在前瞻模型中停止试验，潜在患者数量将降为零。

我们对药物成功情况的当前估计（在前瞻模型中）通过以下方式计算

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

在求期望时，如果我们以成功次数为$\tilde\Xhat_{t,t'+1} = s$作为条件，那么更新后的信念状态$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$为

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

现在我们必须利用<span style="white-space: nowrap;">方程$\eqref{eq:clinicaltrialbellmanModelB}$</span>中的贝尔曼方程来求解前瞻模型。对于这个问题，合理的做法是使用一个足够大的时域$H$，以使我们能够有把握地假设届时我们已经停止了试验（也就是$\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$）。这意味着我们可以假设$\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$，并由此反向计算至时间$t$。一旦我们求解出该动态规划问题，就可以利用下式提取出我们的招募决策

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### 模型C

模型C对招募率$\tilde\lambda_{tt'}$和药物有效性$\tilde\rho_{tt'}$的学习过程进行建模。

模型C几乎与基础模型相同，因为我们对所有不同形式的不确定性都进行了建模。它之所以是一个前瞻模型，唯一的原因就是我们引入了简化的策略（我们的"策略函数近似"）来处理停止试验以及判定药物是否成功这两方面。然而，我们也可以忽略这些策略，转而使用完整的状态变量将整个问题构建为一个动态规划问题。

## 我们学到了什么？

- 我们引入临床试验问题，以说明既涉及主动学习（存在信念状态变量），又需要管理有限资源（用于测试患者的预算）的问题所面临的挑战。
- 我们说明了三种类型的不确定性：患者招募过程、药物成功的概率，以及单个患者的成功过程。
- 我们确定了两项决策：是否停止试验并宣布成功或失败，以及是否允许患者进入试验。
- 然后，我们设计了三种类型的前瞻策略，它们的区别在于我们如何近似前瞻模型，以及我们如何在前瞻模型中近似策略。

## 习题

**复习题**

<ol class="book-exercises">
<li>状态变量 $S^n$ 包含关于两个不确定量的信念。这些不确定量是什么？状态变量中如何捕捉关于它们的信念？</li>
<li>解释临床试验期间必须做出的三个决策。</li>
<li>解释外源信息的类型，以及它们如何受决策和系统状态的影响。</li>
<li>解释称为模型 A 的前瞻策略的逻辑，并讨论其优缺点。</li>
<li>解释称为模型 B 的前瞻策略的逻辑，并讨论其优缺点。</li>
<li>解释称为模型 C 的前瞻策略的逻辑，并讨论其优缺点。</li>
</ol>

**问题求解题**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>上文中，我们将完整的直接前瞻策略写为</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

如果我们真的能计算这个式子，我们就得到了一个最优策略。我们将探索这个策略，然后将其应用于我们的临床试验问题。
  <ol type="a">
    <li>假设每个随机变量 $W_{t+1}, \ldots, W_T$ 只能取 0 或 1 的结果。接下来假设决策 $x_t, \ldots, x_T$ 也只能取 0 或 1 的值。方程 $\eqref{eq:optDLAclinicaltrials2}$ 中的策略可以用决策树来表示。请画出时域 $t, t + 1, t + 2$ 对应的决策树。</li>
    <li>由第(a)部分中的决策树表示的策略 $X^\pi_{t'}(S_{t'})$ 的结构是什么？换句话说，当由决策树给出时，$X^\pi_{t'}(S_{t'})$ 是什么类型的函数？</li>
  </ol>
</li>
<li><p>由于我们通常无法计算方程 $\eqref{eq:optDLAclinicaltrials2}$，我们必须用一个近似前瞻模型来替代完整前瞻模型，写为</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

其中我们近似前瞻模型的动态由以下方程支配

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>设想我们前瞻模型中的策略是一个参数化函数，例如“当 $\rhobar_t$ 落在范围 $[\thetatilde^{stop-low},\thetatilde^{stop-high}]$ 之外时停止招募患者。”出于本问题的目的，我们也可以将招募策略替换为一个简单的“招募 $\thetatilde^{enroll}$ 名患者”（这将是一个静态参数）。我们可以将此函数写为 $X^{\tilde \pi}(\Stilde_{tt'})$，其中 $\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$。你将如何重写方程 $\eqref{eq:policiesapproximateDLA3}$ 以反映前瞻模型中的策略是一个参数化函数？</li>
    <li>第(a)部分意味着，对于给定的时间 $t$ 处的状态 $\Stilde_{t,t+1}$，我们必须找到最佳的 $\thetatilde$。这意味着最优解实际上是一个函数 $\thetatilde_{t+1}(\Stilde_{t,t+1})$。这必须在我们处于近似前瞻模型中模拟状态 $\Stilde_{t,t+1}$ 时进行计算。

    在实践中，每次向前推进一步都要寻找最优策略似乎很复杂（且代价高昂），因为我们每到一个状态 $\Stilde_{t,t+1}$ 都必须停下来调整 $\thetatilde$。

    现在设想，我们希望通过只寻找一个 $\theta$ 来简化这个过程，该值适用于所有时间 $t$ 和任意状态 $\Stilde_{t,t+1}$。请写出为找到这个 $\theta$ 值所需求解的优化问题。</li>
    <li>如果我们用点预测 $f^W_{tt'}$ 替代前瞻模型中的随机变量 $\Wtilde_{t,t'+1}$，方程 $\eqref{eq:policiesapproximateDLA3}$ 和 $\eqref{eq:policiesapproximateDLA4}$ 会有什么变化？继续假设该策略是我们在第(a)部分中引入的参数化函数。</li>
    <li>描述临床试验问题的前瞻模型 B 中所做的近似。</li>
  </ol>
</li>
</ol>

**编程题**

这些习题使用位于 [tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/) 上的 Python 模块 *ClinicalTrialsDriverScript.py*。

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>将试验规模设为 $T = 50$，前瞻时域设为 $H = 5$，并运行模型 A 的模拟。记录停止时间，并解释为什么确定性前瞻模型在每个时间 $t$ 都会得出相同数量的新潜在患者 $x^{enroll}_{t}$。</li>
<li>现在将前瞻时域设为 $H = 50$。修改模块 *ClinicalTrialsDriverScript.py*，加入一个 for 循环，运行模型 B 的 10 次模拟（测试迭代）。计算所有模拟的平均收益。</li>
<li>在为我们的 PFA 选择用于确定何时停止的 $\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$ 时，我们通常选择足够大的 $\theta^{stop-high}$ 以确保药物成功。反之，我们选择较大的 $\theta^{stop-low}$，以便在药物的真实成功率较低时，我们能在损失太多资金之前提前停止试验。然而，我们不能将 $\theta^{stop-low}$ 设得太高，否则我们可能在获得足够关于药物真实成功率的信息之前就冒险停止试验。

固定 $\theta^{stop-high} = 0.8$ 并在区间 $[0.77, 0.79]$ 内以 0.005 为增量变化 $\theta^{stop-low}$。对于每个得到的 $(\theta^{stop-low}, \theta^{stop-high})$，运行模型 B 的 5 次模拟并计算平均收益。将得到的收益对 $\theta^{stop-low}$ 的值绘图。</li>
<li>模型 A 和模型 B 各自求解一个前瞻问题，在该问题中，基础模型中的估计值 $\lambdabar_{tt'}$ 和 $\rhobar_{tt'}$ 中至少有一个在时间 $t$ 固定不变。模型 C 仅使用混合策略搜索-VFA 策略形式的基础模型，来建模同时学习招募率 $\lambdabar_{tt'}$ 和 $\rhobar_{tt'}$ 的过程。然而，我们可以创建模型 C 的一个前瞻版本（称为模型 C 扩展），其中招募数 $\tilde\Rhat_{t,t'+1}$ 由均值为

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

的截尾泊松分布生成，而 $\tilde\Xhat_{t,t'+1}$ 的分布与模型 B 中相同。

你的任务是通过在 Python 模块 *ClinicalTrialsPolicy.py* 中添加方法 *model_C_extension_value_fn* 来实现模型 C 扩展。该方法由已经存在于代码中的 model_C_extension_policy 调用 *model_C_extension_value_fn* 来计算贝尔曼方程的值函数。要编写方法 *model_C_extension_value_fn*，请复制 *model_B_value_fn* 中的代码，并为 $[0, x^{enroll})$ 中的新招募数添加一个额外的 for 循环，步长为 $x^{enroll}/10$。修改步骤值和贝尔曼成本，以反映模型 C 扩展（提示：使用 *trunc_probs* 方法）。

将试验规模设为 $T = 50$，前瞻时域设为 $H = 5$，运行一次模型 C 扩展的模拟。报告停止时间和收益。</li>
</ol>
{% endraw %}
