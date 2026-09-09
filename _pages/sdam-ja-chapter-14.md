---
layout: book
book_data: sdam_toc_ja
book_home: /sdam/ja/contents/
title: "第14章:臨床試験の最適化"
permalink: /sdam/ja/chapter-14/
date: 2026-07-17
lang: ja
translated_from: en
translated_from_hash: d2f03f02e366eab2
---


{% raw %}
## 章の概要

薬剤を市場に投入するためには、製薬会社は3段階の試験プロセスを経なければならず、最終段階である最も費用のかかるフェーズIIIでは、数百人から数千人の患者に薬剤が投与される。製薬会社は毎週、実験結果を検討し、試験を継続するか、中止して市場に出すか、あるいは中止して薬剤を廃棄するかの決定を下さなければならない。

不確実性の発生源はいくつかある。第一はもちろん薬剤そのものの効果である。しかし、薬剤を試験するには、その薬剤(あるいはプラセボ)を服用する意思のある患者を登録する必要があり、これが別の不確実性の発生源となる。さらに、ある薬剤が特定の患者に効く確率についての不確実性もあり、これは患者に薬剤が投与された際の実際の結果とは区別されるものである。

我々はこの問題設定を利用して、3つの異なる直接先読み方策を、問題を近似するさまざまな方法を提案することによって示す。決して機能しない単純なモデルから、複雑さを代償により高い精度を提供する、より洗練されたモデルまでを扱う。

## 物語

製薬会社は常時、数十万件の新薬の臨床試験を実施している可能性がある([clinicaltrials.gov](https://clinicaltrials.gov)を参照)。薬剤の試験は3つのフェーズで行われる。

**フェーズI** – これは20人から100人のボランティアを対象に数か月間実施される試験で、用量を決定し、副作用を特定し、薬剤の反応と副作用の初期評価を行う。

**フェーズII** – これは数百人の患者を対象とした、2年間にわたるより大規模な試験である。目的は疾患が治療に反応するかどうかを判定することである。

**フェーズIII** – これは数百から数千人の患者を対象とする試験であり、多くの場合複数年にわたり、有効性と安全性を評価する。ここで治療が既存の治療法より優れているかどうかが判定される。

フェーズIIとフェーズIIIの両方の試験では、試験に参加するために適切な特性を持つ患者を特定する必要があり、その時点で比較のためのいずれかのグループにランダムに割り当てられる。

我々の演習では、毎週病院とクリニックの集団を登録して*潜在的な*母集団を確保し、そこから紙の記録に基づいて試験の候補となる患者が特定されると仮定する。病院やクリニックを試験に登録するには、事前の管理コストが発生する。この管理コストは、その施設が研究のために抱える可能性のある患者プールを反映している。例えば、合計潜在母集団500人の病院・クリニック群を登録するのに25万ドルかかるかもしれない。我々のモデルでは、単純に1患者あたり500ドルの登録コストを設定するが、これは実際の登録者を引き出す元となる合計潜在母集団に対するものであることに留意されたい。

施設の登録が完了すると、次に臨床試験を宣伝し、そこから患者(あるいはその医師)が名乗り出る。その時点で、患者はさらに詳細な評価を受け、それによって試験への受け入れが決定される。適格でない患者はその後除外される。

この演習の目的のため、各患者は週の初めに投薬を受けると仮定する。週の終わりまでには、その患者が反応しているかどうかがわかる。反応した患者は成功、それ以外は失敗として指定される。したがって、毎週まったく新しい患者集団が必要となるが、これらは我々が登録した母集団から引き出される。この母集団を増やすには、試験にさらに多くのキャパシティを追加登録し、事前の管理コストを支払うしかない。

## 問題の枠組み

3つの枠組みの質問に対する答えは以下の通りである:

- **指標:** 薬剤が使用承認された際に得られる期待収益から、試験を実施する週間コストと、研究における各患者への薬剤投与コストを差し引いたものを最大化する。
- **決定:** 臨床試験を実施する際には3種類の決定が行われる: 試験をもう1週間継続するか、中止するか; 中止すると決めた場合、薬剤を廃棄するか市場に出すかを決定する必要がある; そして試験を継続する場合、何人の新規患者を登録するかも決定する必要がある。
- **不確実性:** 不確実性の発生源は2つある: 毎週試験に登録する患者の数、そして試験における各患者の結果(薬剤を受けたかプラセボを受けたか)。

## 基本モデル

我々は週$t$の終わりに決定を下し、それが週$t+1$の間に実行されると仮定する。時間$t$を週$t$の終わりとする。

### 状態変数

我々は次の状態変数を持つ: $R_t$、登録済みの病院・クリニックにおける患者の潜在母集団; $\alpha_t$、臨床試験の過程で週$t$までの治療の成功数; $\beta_t$、週$t$までの治療の失敗数; そして$\bar\lambda^{response}\_t$、時間$t$の時点で分かっている情報に基づいて試験に参加することを選択する潜在患者の推定割合。

この情報を用いて、我々の治療が成功する確率を$\rho_t$、すなわち週$t$の終わりまでにわかっている情報に基づいて治療が成功する確率を用いて推定できる。これにより

$$
\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

これはつまり、我々の状態変数が次のようになることを意味する

$$
S^n = (R_t, (\alpha_t, \beta_t), \bar\lambda^{response}_t).
$$

$R_t$の初期値として$R_0 = 0$を用いるのは妥当であるが、過去の臨床試験に基づく成功確率の初期推定値を用いることが役立つ。

### 決定変数

我々は$x^{enroll}\_t$を用いて登録される潜在患者数をモデル化する。これは新しい病院施設を追加することで獲得される潜在患者母集団の増加分である。実際に臨床試験に参加する患者数は、週$t+1$の間にこの母集団から引き出される。

さらに、いつ試験を中止するかという決定もあり、これは次のように表される

$$
x^{trial}_t = \begin{cases} 1 & \text{continue the trial,}\\ 0 & \text{stop the trial.} \end{cases}
$$

もし$x^{trial}\_t = 0$であれば、我々は$R_{t+1} = 0$を設定し、これにより試験が停止する。試験を一度停止したら再開できないと仮定するので、$R_t = 0$の場合には$x^{trial}\_t = 0$であることを要求する。

試験を中止する場合、薬剤が成功か失敗かを宣言しなければならない、

$$
x^{drug}_t = \begin{cases} 1 & \text{if the drug is declared a success,}\\ 0 & \text{if the drug is declared a failure.} \end{cases}
$$

我々は$x^{enroll}\_t$、$x^{trial}\_t$、$x^{drug}\_t$を決定する方策$X^{\pi^{enroll}}(S_t)$、$X^{\pi^{trial}}(S_t)$、$X^{\pi^{drug}}(S_t)$を作成する。これにより次のように書ける

$$
X^\pi(S_t) = (X^{\pi^{enroll}}(S_t), X^{\pi^{trial}}(S_t), X^{\pi^{drug}}(S_t)).
$$

いつものように、方策は後で設計する。

### 外生情報

まず、試験への新規患者と試験からの離脱を$\Rhat_{t+1}$を用いて特定する。これは週$t+1$に試験に参加する新規患者数であり、登録された患者の潜在母集団、すなわち$R_{t+1} = R_t + x^{enroll}\_t$に依存する。例えば、母集団$R_{t+1}$内の各患者が、データから推定する必要のある何らかの確率$\lambda^{response}$で臨床試験に登録するかもしれないと仮定できる。

次に、我々は成功を$\Xhat_{t+1}$、すなわち週$t+1$における成功数、そして$\Yhat_{t+1}$、すなわち週$t+1$における失敗数によって追跡する。週$t$における失敗数は次のように計算できる

$$
\Yhat_{t+1} = \Rhat_{t+1} - \Xhat_{t+1}.
$$

これらの変数は、週$t$の終わり時点でシステム内にいる患者数$R_t$に依存する。いつものように、これらの確率変数の基礎となる確率モデルの構築については、不確実性モデリングの節に譲る。

我々の外生情報プロセスは次のようになる

$$
W_{t+1} = (\Rhat_{t+1},  \Xhat_{t+1}),
$$

ここで$\Yhat_{t+1}$は他の変数から計算できるため除外している。

### 遷移関数

登録患者数の遷移方程式は次のように与えられる

$$
\begin{align}
R_{t+1}        = x^{trial}_t (R_t + x^{enroll}_t).  \label{eq:clinicaltransition1}
\end{align}
$$

我々は成功数と失敗数を数えることで、薬剤が成功である確率を次のように更新する

$$
\begin{align}
\alpha_{t+1} &= \alpha_t + \Xhat_{t+1}, \label{eq:clinicaltransition2}\\
\beta_{t+1}  &= \beta_t + (\Rhat_{t+1} - \Xhat_{t+1}). \label{eq:clinicaltransition3}
\end{align}
$$

最後に、現在の推定値$\bar\lambda^{response}\_t$を、週$t+1$の間に登録した数$\Rhat_{t+1}$と現在登録済みの数$R_t + x^{enroll}\_t$の最新比率で平滑化することで、試験に登録する患者数の推定値を更新する。

$$
\begin{align}
\bar\lambda^{response}_{t+1} = (1-\eta) \bar\lambda^{response}_t + \eta \frac{\Rhat_{t+1}}{R_t + x^{enroll}_t}. \label{eq:clinicaltransition4}
\end{align}
$$

式$\eqref{eq:clinicaltransition1}$–$\eqref{eq:clinicaltransition4}$が、我々が一般に次のように表す遷移関数を構成する

$$
S_{t+1} = S^M(S_t,x_t,W_{t+1}).
$$

### 目的関数

我々は次のコストを考慮する必要がある: $c^{enroll}$、期間ごとに試験に患者を維持するコスト; $c^{trial}$、試験を継続するための継続的な管理オーバーヘッドコスト(試験を停止すると発生しなくなる); そして$p^{success}$、試験を中止し成功を宣言した場合に得られる(多額の)収益(これは通常、特許を製造業者に売却することを意味する)。

したがって、ある期間における利益(貢献)は次のように与えられる

$$
\begin{align}
C(S_t,x_t) = (1-x^{trial}_t)x^{drug}_t p^{success} - x^{trial}_t(c^{trial} + c^{enroll}x^{enroll}_t). \label{eq:clinicaltrialprofit}
\end{align}
$$

そして我々の目的関数は、次のように述べる標準的な目的関数となる

$$
\max_\pi \E \left\{\sum_{t=0}^T C(S_t, X^\pi(S_t))\vert S_0\right\},
$$

ここで我々の方策が、患者登録方策$X^{\pi^{enroll}}(S_t)$、試験継続方策$X^{\pi^{trial}}(S_t)$、そして薬剤成功/失敗方策$X^{\pi^{drug}}(S_t)$の合成であることを認識する。

## 不確実性のモデル化

正式な不確実性モデルを構築すべき理由は2つある。第一は基本モデルのためであり、方策の設計と研究の実施の両方に利用できる。第二は、確率的先読み方策における不確実性をモデル化したい場合があるためである。

我々はまず確率論的な基本モデルを構築するが、これはすべての数学モデルが現実世界の近似であることを認識しつつ、実際の問題をできる限りモデル化しようとする試みである。

我々は3つの確率変数をモデル化する必要がある:

- 試験に登録する顧客数$\Rhat_{t+1}$。
- (観測不可能な)成功率$\rho^{true}$。
- 我々が実際に観測する成功数$\Xhat_{t+1}$。

以下でそれぞれについて扱う。

### 患者登録プロセス

我々は、(病院やクリニックを登録するなどして)週$t+1$に患者$x^{enroll}\_t$人を登録できると期待できるような選択を行うという単純なモデルを用いる。これにより合計母集団$R_{t+1} = R_t + x^{enroll}\_t$が得られる。しかし現実は異なるだろう。我々は、実際の到着者数を平均$\bar\lambda^{response} (R_t + x^{enroll}\_t)$のポアソン分布と仮定してモデル化することを提案する。ここで$0 < \bar\lambda^{response} < 1$は試験に参加することを選択する潜在患者の割合(未知)である。これにより次のように書ける

$$
\begin{align}
Prob[\Rhat_{t+1}(R_t)=r] = \frac{(\bar\lambda^{response}_t(R_t + x^{enroll}_t))^r e^{-\bar\lambda^{response}_t(R_t + x^{enroll}_t)}}{r!}. \label{eq:clinicaltrialpoisson}
\end{align}
$$

$\Rhat_{t+1}$には打ち切りポアソン分布を用いることができるが、試験に参加する患者数は$R_{t+1} = R_t + x^{enroll}\_t$で与えられる潜在患者数によって制限されることを認識しなければならない。

$$
\Rbar_t = \bar\lambda^{response}_t (R_t+x^{enroll}_t)
$$

を、試験に志願すると予想される患者数($R_t$が与えられた場合)とし、

$$
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = Prob[\Rhat_{t+1}(x^{enroll}_t)=r\vert \Rbar_t].
$$

我々は$P_{\Rhat_{t+1}}(r\vert x^{enroll}\_t, \Rbar_t)$を$x^{enroll}\_t$と$\Rbar_t$の関数として書き、決定と数$R_{t+1} = R_t + x^{enroll}\_t$への依存性を反映させる。

打ち切りポアソン分布は次のように与えられる

$$
\begin{align}
P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) = \begin{cases} \dfrac{(\Rbar_t)^r e^{-\Rbar_t}}{r!}, & r=0, \ldots, x^{enroll}_t -1 \\[6pt] 1-\displaystyle\sum_{r=0}^{x^{enroll}_t -1} P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t) & r=R_t+x^{enroll}_t \end{cases} \label{eq:clinicaltrialpoisson2}
\end{align}
$$

このような母集団プロセスに対して、ポアソン過程は良い出発点となる。平均が分散と等しくなり、それが$\Rbar_t$に等しくなるという性質を持つ。

### 成功確率

成功は、ある患者にある週の間、その治療が成功をもたらすという基礎的な、しかし観測不可能な確率によって左右される。我々はベイズ的なスタイルを用いて$\rho^{true}$に確率分布を割り当てる。$\rho^{true}$についての我々の信念の分布を表す方法は3通りある:

- 一様事前分布。ここで$\rho^{true}$が$0$と$1$の間で一様分布すると仮定する。
- パラメータ$(\alpha_0,\beta_0)$を持つベータ分布。
- サンプリングされた分布。ここで$\rho^{true}$が値の集合$(\rho_1, \ldots, \rho_K)$のうちの一つを取ると仮定し、我々の初期分布を$p^\rho_{0k} = Prob[\rho^{true} = \rho_k]$とする。我々は$p_{0k} = 1/K$とすることができる(これは一様事前分布を用いることと同等になるだろう)。あるいは、これらをベータ分布から推定することもできる。

ここでは扱いやすいので、我々のサンプリングされた分布を使用する。

### 成功プロセス

時間$t$で分かっている情報に基づく成功数の確率変数$\Xhat_{t+1}$は、まず試験に参加した患者数を与える確率変数$\Rhat_{t+1}$と、試験における成功の未知の確率$\rho^{true}$に依存する。$\Xhat_{t+1}$の分布を構築する方法は、条件付けの力を利用することである。我々は$\Rhat_{t+1} = r$であり、かつ$\rho^{true} = \rho_k$であると仮定する。

$r$人の患者が試験に参加し、成功の確率が$\rho_k$であると仮定すると、成功数$\Xhat_{t+1}$は$r$個のベルヌーイ(すなわち0/1)確率変数の和となる。$r$個のベルヌーイ確率変数の和は二項分布によって与えられ、したがって

$$
Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true} = \rho_k] = \binom{r}{s} \rho^s_k (1-\rho_k)^{r-s}.
$$

$\Xhat_{t+1}$の非条件付き分布は、$r$と$k$について合計し、適切な確率を掛けることで求めることができ、次式が得られる。

<div class="eq-flush-left">
$$
\begin{align}
\small Prob[\Xhat_{t+1} = s\vert \Rbar_t] = \sum_{k=1}^K \left(\sum_{r=0}^{R_t} Prob[\Xhat_{t+1} = s\vert \Rhat_{t+1}=r, \rho^{true}=\rho_k] P_{\Rhat_{t+1}}(r\vert x^{enroll}_t, \Rbar_t)\right) p^\rho_{tk}. \label{eq:clinicaltrialsuccessdist}
\end{align}
$$
</div>

式$\eqref{eq:clinicaltrialsuccessdist}$における$\Xhat_{t+1}$のような明示的な確率分布を用いる方法は、それらを見つけて(かつ計算)できる場合には都合が良いが、それが不可能な複雑な問題も多く存在する。例えば式$\eqref{eq:clinicaltrialsuccessdist}$でさえ、連続確率変数$\rho^{true}$のサンプル表現を用いるという工夫が必要であった。これがなければ、$\rho^{true}$の密度に関する積分を導入する必要があっただろう。

もう一つのアプローチは、より単純であり、さらに複雑な状況にも拡張できるもので、モンテカルロサンプリングを用いて$\Rhat_{t+1}$と$\Xhat_{t+1}$を生成する。この過程を以下に概説し、サンプル$\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$(および対応する$\Rhat^1\_{t+1}, \ldots, \Rhat^N_{t+1}$)を生成する。これにより、確率変数$\Xhat_{t+1}$を、それぞれ等確率で生じ得る結果の集合$\Xhat^1\_{t+1}, \ldots, \Xhat^N_{t+1}$で近似することができる。

<div class="book-algorithm">
<p><strong>臨床試験プロセスのモンテカルロベースモデル</strong></p>
<p><strong>ステップ 1.</strong> 反復$n=1, \ldots, N$についてループする:</p>
<p style="margin-left: 1.5rem;"><strong>ステップ 2a.</strong> 式$\eqref{eq:clinicaltrialpoisson2}$で与えられるポアソン分布からモンテカルロサンプル$r^n \sim \Rhat_{t+1}(x^{enroll})$を生成する。</p>
<p style="margin-left: 1.5rem;"><strong>ステップ 2b.</strong> 真の成功確率$\rho^n \sim \rho^{true}$のモンテカルロサンプルを生成する。</p>
<p style="margin-left: 1.5rem;"><strong>ステップ 2c.</strong> $r^n$と$\rho^n$が与えられたとき、$r^n$人の患者についてループし、確率$\rho^n$で1(すなわち、薬が成功であったこと)となる0/1確率変数を生成する。</p>
<p style="margin-left: 1.5rem;"><strong>ステップ 2d.</strong> 成功数を合計し、これを$\Xhat^n_{t+1}$のサンプル実現値とする。</p>
<p><strong>ステップ 3.</strong> サンプル$\Xhat^1_{t+1}, \ldots, \Xhat^N_{t+1}$を出力する。</p>
</div>

## 方策の設計

この問題を用いて、[第7章](/sdam/ja/chapter-7/)で最初に導入した完全確率的先読み方策を、以下の式で改めて十分に理解することにする。

$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials}
\end{align}
$$

方策$\pi$に関する最大化(これは「方策内方策」と呼ぶこともできる)が方策内でどのような意味を持つかに焦点を当てる。

臨床試験のこの応用では、3つの異なる決定に対して方策を設計する必要がある。すなわち、登録する患者数、試験を継続するかどうか、そして試験を停止した際に薬を成功と判定するかどうかである。まず、停止するかどうか、そして停止した場合に薬を成功または失敗と判定するかについて、単純な方策関数近似を設計することから始める。その後、より難しい決定である、試験に登録する患者数の決定に取り組む。

### 試験の停止

まず、パラメータ$(\alpha_t,\beta_t)$を持つベータ分布で与えられる$\rho^{true}$に関する信念を用いることから始め、これにより次の推定が得られる。

$$
\bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t}.
$$

ここで、パラメータ$\theta^{stop-low}$と$\theta^{stop-high}$を導入する。$\bar\rho_t > \theta^{stop-high}$のとき試験を停止して成功と判定し、一方$\bar\rho_t < \theta^{stop-low}$のとき試験を停止して失敗と判定する。$\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$とする。これらの規則を用いて、試験停止のための方策を次のように定義する。

$$
X^{trial}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \theta^{stop-low} \leq \bar\rho_t \leq \theta^{stop-high}, \\ 0 & \text{otherwise.} \end{cases}
$$

試験を停止する場合、成功(1)または失敗(0)を判定する方策は次式で与えられる。

$$
X^{drug}_t(S_t\vert \theta^{stop}) = \begin{cases} 1 & \text{if } \bar\rho_t > \theta^{stop-high}, \\ 0 & \text{if } \bar\rho_t < \theta^{stop-low}. \end{cases}
$$

### 患者登録方策

物理状態($R_t$など)を持つ問題では、確率的最短路問題で用いたのと同様に、先読み方策が必要になることがよくある。しかし、確率的最短路問題で見たように、我々は確率的先読みモデルに何を含めるかを選択することができる。

我々が行わなければならない選択の一つは、停止方策$X^{trial}(S_t\vert \theta^{stop})$と成功/失敗方策$X^{drug}(S_t\vert \theta^{stop})$であり、我々は基本モデルで用いているのと同じパラメータベクトル$\theta^{stop}$を先読みモデルでも用いることを提案する。これらは今後は先読みモデルにのみ適用されるため、それぞれ$\Xtilde^{trial}(\Stilde_t\vert \theta^{stop})$および$\Xtilde^{drug}(\Stilde_t\vert \theta^{stop})$と呼ぶことができる。

新たに登録可能な患者数をどう決定するかという問題は、幾分より難しい。それは、より多くの潜在的患者を確保するために前払いのコストを支払う必要があり、かつそれを患者の試験参加意思(未知のパラメータ$\lambda^{response}$で与えられる)に関する不確実性の下で行わなければならないからである。

上述のような完全な先読みモデルを作成するには、$\bar\lambda^{response}\_t$の先読み版として$\tilde\lambda_{tt'}$、$\bar\rho_t$に対して$\tilde\rho_{tt'}$、$(\alpha_t, \beta_t)$に対して$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$といった変数を作成することになる。それ以外の論理はすべて、元の不確実性モデルと同じである。

完全な不確実性モデルを用いることは可能だが、モデルを様々な方法で単純化することもできる。これらの選択肢には以下が含まれる。

- 登録率$\bar\lambda^{response}\_t$ – 選択肢は2つある。$\bar\lambda^{response}\_t$の推定を継続することができ、その場合、先読みモデルにおける時刻$t'$での登録率$\lambda$の推定値として記法$\tilde\lambda^{response}\_{tt'}$を導入することになる。あるいは、基本モデルにおける時刻$t$での推定値である$\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$を固定することもできる。
- 薬の成功率$\rho^{true}$ – 再び選択肢は2つある。成功率の推定を継続することができ、その場合、先読みモデルにおいて成功と失敗を累積するための変数$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$を定義することになる。あるいは、先読みモデル内で$(\tilde\alpha_{tt'}, \tilde\beta_{tt'}) = (\alpha_t, \beta_t)$を固定することもできる。

不確実性のモデル化に関する選択を用いて、先読みモデルを設計するための3つの異なる戦略を提案できる。

**モデルA** – 決定論的先読みモデル。ここでは、登録率$\tilde\lambda^{response}\_{tt'} = \bar\lambda^{response}\_t$を仮定する。すなわち、先読みモデルを作成する時刻$t$での推定値に登録率を固定するということである。次に、真の薬の成功確率を次式に固定すると仮定する。

$$
\tilde\rho_{tt'} = \bar\rho_t = \frac{\alpha_t}{\alpha_t + \beta_t},
$$

これは基本モデルにおける時刻$t$での推定値である。

**モデルB** – 登録率の推定値を$\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$に固定するが、薬の効果については学習を継続すると仮定する。

**モデルC** – 登録率$\tilde\lambda_{tt'}$を学習する過程と、薬の効果$\tilde\rho_{tt'}$を学習する過程をモデル化する。

なお、薬の効果を固定して患者登録率のみ学習を継続する、という潜在的な第4のモデルは含めていない(このモデルがいかにばかげたものになるかは、すぐにわかる)。

これら3つのモデルを用いて、先読みモデルを設計する過程を示していく。

### モデルA

モデルAは決定論的問題である。なぜなら、推定登録率$\tilde\lambda_{tt'} = \bar\lambda^{response}\_t$と$\tilde\rho_{tt'} = \bar\rho_t$の両方を固定しているからである。良いことに、これは基本的に決定論的最短路問題であり、(先読みモデルにおいて)登録済みの患者数$\Rtilde_{tt'}$はネットワーク内のノードのようなものであり、決定$\xtilde^{enroll}\_{tt'}$はノード$\Rtilde_{t,t'+1} = \Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$へと導くリンクである。

これを確認するために、決定論的最短路問題に関する式$\eqref{eq:shortestpathbellman1}$を思い出そう。それを次に再掲する。

$$
v_i = \min_{j\in\Ncal^+_i} (c_{ij} + v_j).
$$

ここで、ノード$i$での値である$v_i$を、$\Rtilde_{tt'}$人の患者が登録済みである価値である$\Vtilde_{tt'}(\Rtilde_{tt'})$に置き換える(これは先読みモデル内であることを思い出してほしい)。ノード$j$へ進む決定は、$\xtilde^{enroll}\_{tt'}$人の患者を登録する決定に置き換えられる。これによりノード$j$へ進むのではなく、ノード$\Rtilde_{tt'} + \xtilde^{enroll}\_{tt'}$へ進むことになる。したがって、ベルマン方程式は次のようになる。

$$
\begin{align}
\Vtilde_{tt'}(\Rtilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \big(\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}_{tt'}) + \Vtilde_{t,t'+1}(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\big). \label{eq:clinicaltrialbellmanModelA}
\end{align}
$$

1期間の利益関数$\Ctilde(\Rtilde_{tt'},\xtilde^{enroll}\_{tt'})$は、基本モデルの同じ関数(式$\eqref{eq:clinicaltrialprofit}$を参照)から適応させたものである。

我々の決定論的先読みモデルには一つだけ問題がある。すなわち、決して停止しないということである。なぜなら、停止方策では$\tilde\rho_{tt'}$の推定値が「成功」または「失敗」の領域に入ることが要求されるが(そうでなければ「継続」領域から始まっているはずである、基本モデルであればそこで停止していたはずだから)。しかし、このことは決定論的先読みモデルを使えないという意味ではない。単に計画期間$H$を固定し、$t' = t+H$のときに停止すればよいのである。

この戦略を用いて、計画期間$t'=t, \ldots, t+H$にわたって決定論的最短路問題を解き、そこから$\xtilde^\ast \_{tt}$を求める。したがって、我々の登録方策は次のようになる。

$$
X^{\pi^{enroll}}(S_t) = \xtilde^\ast _{tt}.
$$

これが効果的な方策になるとは主張していない。ここでは主として、先読みモデルで行うことができるモデル化上の近似のタイプを説明することを目的としている。

### モデルB

ここでは、応答率$\tilde\lambda_{tt'}$の推定値を、基本モデルにおける時刻$t$での推定値$\bar\lambda^{response}\_t$に固定する。モデルを単純化するために、登録者数$\tilde\Rhat_{t,t'+1}$が志願する患者数の期待値$\tilde\Rbar_{tt'}$に等しいと仮定する。登録者数$\tilde\Rhat_{t,t'+1}$は次式から決定論的に生成される。

$$
\tilde\Rhat_{t,t'+1} = \lfloor \bar\lambda^{response}_t (\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})\rfloor,
$$

ここで$\lfloor x \rfloor$は$x$を最も近い整数に切り下げることを意味する。次に、$Prob[\Xhat_{t+1} = s\vert \Rbar_t]$を用いて$\tilde\Xhat_{t,t'+1}$の分布を計算するが、その際$\Rbar_t$を$\tilde\Rbar_{tt'}$に置き換える。

それでも、シミュレートされた真の値$\tilde\rho_{tt'}$から成功数$\tilde\Xhat_{t,t'+1}$を生成する必要があり、そこから$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$を更新することになるが、これは次式を用いて行う。

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'}+ \tilde\Xhat_{t,t'+1}, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + \tilde\Rbar_{tt'}-\tilde\Xhat_{t,t'+1}.
$$

$\tilde\Xhat_{t,t'+1}$の分布は式$\eqref{eq:clinicaltrialsuccessdist}$における$Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$を用いてモデル化するが、条件付けは$\Rbar_t$の代わりに$\tilde\Rbar_{tt'}$に対して行う(なお、上記のポアソン分布の代わりにモンテカルロ法によるサンプル分布を用いることもできることを思い出してほしい)。

式$\eqref{eq:clinicaltrialbellmanModelA}$のモデルAに対するベルマン方程式を$t'=t, \ldots, t+H$について適応させることで、先読みモデルを解くことができる。

<div class="eq-flush-left">
$$
\begin{align}
\small \Vtilde_{tt'}(\Stilde_{tt'}) = \min_{\xtilde^{enroll}_{tt'}} \left(\Ctilde(\Stilde_{tt'},\xtilde^{enroll}_{tt'}) + \sum_{s=0}^{\tilde\Rbar_{tt'}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}] \Vtilde_{t,t'+1}(\Stilde_{t,t'+1}\vert \tilde\Xhat_{t,t'+1} = s)\right),   \label{eq:clinicaltrialbellmanModelB}
\end{align}
$$
</div>

ここで$\Stilde_{t,t'+1} = (\Rtilde_{t,t'+1},\tilde\alpha_{t,t'+1})$は成功数$\tilde\Xhat_{t,t'+1} = s$に条件付けられており、$Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt'}]$は式$\eqref{eq:clinicaltrialsuccessdist}$から得られる。$\Rtilde_{tt'}$の推移は、先読みモデル内で試験を停止するか継続するかを決定したことを反映しなければならないことを念頭に置く必要がある。

我々の物理状態変数(潜在的な患者総数)$\Rtilde_{t,t'+1}$は次式で与えられる。

$$
\Rtilde_{t,t'+1}  = \begin{cases} \Rtilde_{tt'} + \xtilde^{enroll}_{tt'} & \text{if } \Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 1, \\ 0 & \text{otherwise.} \end{cases}
$$

基本モデルと同様に、先読みモデル内で試験を停止した場合、潜在的な患者数はゼロになることに注意してほしい。

薬の成功に関する我々の現在の推定値(先読みモデル内)は次式を用いて計算される。

$$
\tilde{\bar\rho}_{tt'} = \frac{\tilde\alpha_{tt'}}{\tilde\alpha_{tt'} + \tilde\beta_{tt'}}.
$$

期待値において、成功数が$\tilde\Xhat_{t,t'+1} = s$であるという条件を付けると、更新された信念状態$(\tilde\alpha_{tt'}, \tilde\beta_{tt'})$は次式のようになる。

$$
\tilde\alpha_{t,t'+1} = \tilde\alpha_{tt'} + s, \qquad \tilde\beta_{t,t'+1}  = \tilde\beta_{tt'} + (\tilde\Rbar_{tt'} - s).
$$

<span style="white-space: nowrap;">式$\eqref{eq:clinicaltrialbellmanModelB}$</span>のベルマン方程式を用いて、先読みモデルを解く必要がある。この問題では、それまでに試験を停止していると確信できるほど十分に大きい計画期間$H$を用いることが理にかなっている(すなわち$\Xtilde^{trial}(\Stilde_{tt'}\vert \theta^{stop}) = 0$である)。これにより$\Vtilde_{t,t+H}(\Stilde_{t,t+H}) = 0$を仮定でき、そこから時刻$t$まで逆算していくことができる。動的計画法を解いた後は、次式を用いて登録決定を取り出すことができる。

$$
\small X^{enroll}_{t}(S_t) = \argmin_{\xtilde^{enroll}_{tt}} \left(\Ctilde(\Stilde_{tt},\xtilde^{enroll}_{tt}) + \sum_{s=0}^{\tilde\Rhat_{t,t+1}} Prob[\tilde\Xhat_{t,t'+1} = s\vert \tilde\Rbar_{tt}] \Vtilde_{t,t+1}(\Stilde_{t,t+1}\vert \tilde\Xhat_{t,t'+1} = s)\right).
$$

### モデルC

モデルCは登録率$\tilde\lambda_{tt'}$を学習する過程と、薬の効果$\tilde\rho_{tt'}$を学習する過程をモデル化する。

モデルCは基本モデルとほぼ同一である。なぜなら、あらゆる形態の不確実性をモデル化しているからである。これが先読みモデルであると言える唯一の点は、試験を停止するための単純化された方策(我々の「方策関数近似」)と、薬が成功であるかどうかを判定するための方策の導入である。しかし、これらの方策を無視して、完全な状態変数を用いて問題全体を動的計画問題として定式化することもできる。

## 何を学んだか

- 能動学習(信念状態変数が存在する)を伴いながら、有限の資源(患者を検査するための予算)を管理する問題の課題を説明するために、臨床試験問題を導入した。
- 3種類の不確実性を説明した。患者登録過程、薬が成功する確率、そして個々の患者に対する成功過程である。
- 2つの決定を識別した。試験を停止して成功または失敗を判定するかどうか、そして試験への患者の受け入れである。
- そして、先読みモデルの近似方法と、先読みモデル内での方策の近似方法によって区別される、3種類の先読み方策を設計した。

## 演習問題

**復習問題**

<ol class="book-exercises">
<li>状態変数$S^n$には、2つの不確実な量に関する信念が含まれている。これらの不確実な量は何か、また、それらに関する信念は状態変数の中でどのように捉えられているか。</li>
<li>臨床試験の間に下さなければならない3つの決定について説明せよ。</li>
<li>外生情報の種類について説明し、それらが決定やシステムの状態によってどのように影響を受けるかを説明せよ。</li>
<li>モデルAと呼ばれる先読み方策のロジックを説明し、その長所と短所を論じよ。</li>
<li>モデルBと呼ばれる先読み方策のロジックを説明し、その長所と短所を論じよ。</li>
<li>モデルCと呼ばれる先読み方策のロジックを説明し、その長所と短所を論じよ。</li>
</ol>

**問題解決演習**

<ol class="book-exercises" style="counter-reset: exercise 6;">
<li><p>上で、完全直接先読み方策を次のように書いた。</p>

<div class="eq-flush-left">
$$
\begin{align}
X^{\ast }(S_t) &= \argmax_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \quad \E_{W_{t+1}} \Big\{\max_\pi \E_{W_{t+2}, \ldots, W_T} \Big\{\sum_{t'=t+1}^T C(S_{t'},X^\pi_{t'}(S_{t'}))\Big\vert S_{t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:optDLAclinicaltrials2}
\end{align}
$$
</div>

実際にこれを計算できるのであれば、最適方策が得られることになる。この方策を検討し、それを臨床試験問題に適用してみよう。
  <ol type="a">
    <li>各確率変数$W_{t+1}, \ldots, W_T$は0または1の結果しか取れないと仮定する。次に、決定$x_t, \ldots, x_T$も同様に0または1の値しか取れないと仮定する。式$\eqref{eq:optDLAclinicaltrials2}$の方策は決定木として図示できる。計画期間$t, t + 1, t + 2$について、この木を描け。</li>
    <li>(a)の決定木で表される方策$X^\pi_{t'}(S_{t'})$の構造はどのようなものか。言い換えると、決定木で与えられる場合、$X^\pi_{t'}(S_{t'})$はどのようなタイプの関数か。</li>
  </ol>
</li>
<li><p>一般に式$\eqref{eq:optDLAclinicaltrials2}$を計算することはできないため、完全先読みモデルを、次のように書く近似先読みモデルに置き換える必要がある。</p>

<div class="eq-flush-left">
$$
\begin{align}
\small X^{DLA}(S_t) &= \small \argmin_{x_t\in\Xcal}\Big(C(S_t,x_t) + {} \nonumber \\
& \small \ \Etilde_{\Wtilde_{t,t+1}} \Big\{\min_{\tilde \pi} \E_{\Wtilde_{t,t+2}, \ldots, \Wtilde_{tT}} \Big\{\sum_{t'=t+1}^T C(\Stilde_{tt'},\Xtilde^{\tilde \pi}_t(\Stilde_{tt'}))\Big\vert \Stilde_{t,t+1}\Big\} \Big\vert S_t,x_t\Big\}\Big). \label{eq:policiesapproximateDLA3}
\end{align}
$$
</div>

ここで、この近似先読みモデルのダイナミクスは次式によって支配される。

$$
\begin{align}
\Stilde_{t,t'+1} = S^M(\Stilde_{tt'}, X^{\tilde \pi}_{t'}(\Stilde_{tt'}), \Wtilde_{t,t'+1}). \label{eq:policiesapproximateDLA4}
\end{align}
$$

  <ol type="a">
    <li>先読みモデルにおける方策が「$\rhobar_t$が範囲$[\thetatilde^{stop-low},\thetatilde^{stop-high}]$から外れたら患者の登録を停止する」というようなパラメトリック関数であると想像せよ。本設問の目的のためには、登録方策を単純な「$\thetatilde^{enroll}$人の患者を登録する」(これは静的パラメータとなる)に置き換えてもよい。この関数を$X^{\tilde \pi}(\Stilde_{tt'})$(ただし$\thetatilde = (\thetatilde^{stop-low}, \thetatilde^{stop-high}, \thetatilde^{enroll})$)と書くことができる。先読みモデルにおける方策がパラメトリック関数であることを反映するために、式$\eqref{eq:policiesapproximateDLA3}$をどのように書き直せばよいか。</li>
    <li>(a)は、時刻$t$における与えられた状態$\Stilde_{t,t+1}$に対して最適な$\thetatilde$を見つけなければならないことを意味する。これは、最適解が実際には関数$\thetatilde_{t+1}(\Stilde_{t,t+1})$であることを意味する。これは、近似先読みモデルにおいてシミュレートされた状態$\Stilde_{t,t+1}$にある場合に計算されなければならない。

    実際には、1ステップ進むたびに最適方策を見つけることは、着地する任意の状態$\Stilde_{t,t+1}$について$\thetatilde$を立ち止まって調整しなければならないため、複雑(かつ高コスト)であると思われる。

    ここで、すべての時刻$t$および任意の状態$\Stilde_{t,t+1}$に対して用いる、ただ1つの$\theta$を見つけることでプロセスを単純化したいと考えているとしよう。この$\theta$の値を見つけるために解かなければならない最適化問題を書け。</li>
    <li>先読みモデルにおける確率変数$\Wtilde_{t,t'+1}$を点予測$f^W_{tt'}$に置き換えた場合、式$\eqref{eq:policiesapproximateDLA3}$および$\eqref{eq:policiesapproximateDLA4}$はどのように変化するか。方策は引き続き(a)で導入したパラメトリック関数であると仮定せよ。</li>
    <li>臨床試験問題に対する先読みモデルBで行われている近似について述べよ。</li>
  </ol>
</li>
</ol>

**プログラミング演習**

これらの演習では、[tinyurl.com/sdagithub](http://tinyurl.com/sdagithub/)にあるPythonモジュール *ClinicalTrialsDriverScript.py* を使用する。

<ol class="book-exercises" style="counter-reset: exercise 8;">
<li>試験サイズを$T = 50$に、先読みの計画期間を$H = 5$に設定し、モデルAのシミュレーションを実行せよ。停止時刻を記録し、決定論的先読みモデルが各時刻$t$において同じ数の新規潜在患者$x^{enroll}_{t}$を生成する理由を説明せよ。</li>
<li>今度は先読みの計画期間を$H = 50$に設定せよ。モジュール *ClinicalTrialsDriverScript.py* を修正してforループを含めるようにし、モデルBのシミュレーション(テスト反復)を10回実行せよ。すべてのシミュレーションにわたる平均収益を計算せよ。</li>
<li>停止タイミングを決定するためのPFAにおいて$\theta^{stop} = (\theta^{stop-low}, \theta^{stop-high})$を選ぶ際、通常は薬が成功することを確実にするために十分大きな$\theta^{stop-high}$を選ぶ。逆に、薬の真の成功率が低い場合には、あまりお金を失いすぎる前に試験を早期に停止できるよう、大きな$\theta^{stop-low}$を選ぶ。しかし、$\theta^{stop-low}$をあまり高くしすぎることはできない。そうしないと、薬の真の成功率について十分な情報を得る前に試験を停止してしまうリスクがあるからである。

$\theta^{stop-high} = 0.8$を固定し、$\theta^{stop-low}$を区間$[0.77, 0.79]$内で0.005刻みで変化させよ。得られた各$(\theta^{stop-low}, \theta^{stop-high})$について、モデルBのシミュレーションを5回実行し、平均収益を計算せよ。得られた収益を$\theta^{stop-low}$の値に対してプロットせよ。</li>
<li>モデルAとモデルBは、いずれも、基本モデルにおいて時刻$t$で推定値$\lambdabar_{tt'}$および$\rhobar_{tt'}$の少なくとも一方を固定した先読み問題を解いている。モデルCは、登録率$\lambdabar_{tt'}$と$\rhobar_{tt'}$の両方を学習するプロセスをモデル化するために、方策探索とVFAのハイブリッド方策という形で基本モデルのみを使用する。しかし、モデルCの先読みバージョン(モデルC拡張版と呼ぶ)を作成することもでき、その場合、登録数$\tilde\Rhat_{t,t'+1}$は、平均

$$
\tilde\Rhat_{t,t'+1} = [\lambdabar^{response}_t(\Rtilde_{tt'} + \xtilde^{enroll}_{tt'})]
$$

を持つ切断ポアソン分布から生成され、$\tilde\Xhat_{t,t'+1}$の分布はモデルBと同じである。

あなたの課題は、Pythonモジュール *ClinicalTrialsPolicy.py* にメソッド *model_C_extension_value_fn* を追加することで、モデルC拡張版を実装することである。このメソッドは、(既にコード内にある) model_C_extension_policy によって呼び出され、ベルマン方程式の価値関数を計算するために *model_C_extension_value_fn* を呼び出す。メソッド *model_C_extension_value_fn* を書くには、*model_B_value_fn* のコードをコピーし、$x^{enroll}/10$刻みで$[0, x^{enroll})$における新規登録に対するforループを追加せよ。モデルC拡張版を反映するように、ステップ値とベルマンコストを修正せよ(ヒント:*trunc_probs* メソッドを使用せよ)。

試験サイズを$T = 50$に、先読みの計画期間を$H = 5$に設定し、モデルC拡張版のシミュレーションを1回実行せよ。停止時刻と収益を報告せよ。</li>
</ol>
{% endraw %}
