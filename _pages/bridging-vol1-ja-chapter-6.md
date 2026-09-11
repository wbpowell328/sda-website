---
layout: book
title: 第6章：ケーススタディのフレーミング
permalink: /bridging-vol1/ja/chapter-6/
date: 2026-07-30
book_home: /bridging-vol1/ja/contents/
book_data: bridging_vol1_toc_ja
lang: ja
translated_from: en
translated_from_hash: c629bec2a47403a0
---


{% raw %}
<p class="book-byline"><em>逐次決定問題の橋渡し 第I巻 — 問題のフレーミング</em> &middot; Warren B. Powell</p>

第2章では、在庫計画から大統領選挙の運営まで、さらに公衆衛生、電力網の管理、家具店の運営といったトピックまで、数多くのトピックを取り上げた。これらの各応用領域について、同章はパフォーマンス指標の候補リスト、決定のタイプ、そして不確実性の源を提供した。

続く第3章、第4章、第5章では、第2章の応用例を用いてこれら3つの次元をさらに深く論じた。

こうした背景知識を踏まえた上で、本章では一連のケーススタディを提供する。各ケースは、指標・決定・不確実性のリストをプロンプトとしてChatGPTに生成させたものである。ただし、これらのケースは問題を懇切丁寧に提示するものではなく——読者自身が議論の中から指標・決定・不確実性を抽出しなければならない。

各ケースの後には、2種類の質問セットが続く。1つ目はChatGPTが作成した「ディスカッション質問（Discussion Questions）」というリストで、読者がケースの詳細をどれだけ理解しているかを探るのに役立つ。2つ目は「決定フレーミング質問（Decision Framing Questions）」というリストで、各ケースで共通のものである。決定フレーミング質問は以下に列挙し、続けてダウンロード可能なケース本体へのリンク付きリストを示す。

## 決定フレーミング質問

各ケースの最後には、パフォーマンス評価に関わる指標、下せる決定のタイプ、パフォーマンスに影響を与える不確実性という観点からケースを統合するために、以下の質問を用いる。

1. システムのパフォーマンスのあらゆる側面を評価するために使用できる、さまざまな指標を特定せよ。[ここ](/framingproblems/#performance-metrics)で示したスタイルに倣い、これらをピラミッド状に整理して相対的な重要度を示すこと。

2. 決定のタイプにはどのようなものがあるか？[ここにある決定タイプのリスト](/decisionsdecisions/#types-of-decision-settings)をガイドとして使用し、[ここにある応用例](/decisionsdecisions/#from-apps-to-types)で示されたものを参考にせよ。

3. 上段にパフォーマンス指標を（重要度の高いものから低いものへ）記入し、続けて決定のリストを（任意の順序で）記入せよ。各決定が各指標に与える影響を、H（高い影響）、M（中程度）、L（低い）、N（なし）のいずれかで判断せよ。最後に、得られた行列を用いて、最も重要な指標への影響度に基づき決定に順位を付けよ。これは[インタラクティブな決定フレーミングツール](/decision-framing-tool/)（ピラミッドを構築し、決定をリストアップし、オンラインで行列を記入できる）を使って行うことも、アカウントを作成したくない場合は[ダウンロード可能なスプレッドシートテンプレート](https://tinyurl.com/InteractionMatrix/)を使って行うこともできる。

4. 不確実性のさまざまな源にはどのようなものがあるか？[ここにある不確実性の12のカテゴリ](/modeling-uncertainty/#categories)をガイドとして使用せよ。

5. (3)の演習を、今度は決定の代わりに不確実性を用いて繰り返せ。
   - a) どの不確実性の源が、時間をかけた平均パフォーマンスによって捉えられるか？
   - b) どの不確実性の源が、平均では適切に捉えられないリスクの形態を表すか？

6. 最も重要な指標に対して最も高い影響を与えると思われる単一の決定を選べ。
   - a) この決定を下すにあたり、どのようなアプローチを用いると思うか？
   - b) この決定を下すために必要と思われるデータは何か。決定が高い、または中程度の影響を与えるパフォーマンス指標の計算に必要なデータも含めること。

7. (6)で特定した決定と同じものを用いて、その決定を実行するために協力する必要がある人々、部門、グループ、組織を特定せよ。

## ケース

これらのケースは、第2章で示された9つの問題領域に沿って整理されており、そのうち健康分野はさらに3つの下位領域に分かれている。加えて、10番目の領域としてスタートアップを追加した。各ケースの名称にはダウンロード可能な文書へのリンクが付いている。

### 在庫計画

**[Aurora Motors — フロー調整のジレンマ](/assets/cases/ja/Aurora_Motors_Flow_Coordination_Case.docx)。** 自動車メーカーは、関税、連邦補助金、ガソリン価格、購買者の嗜好が工場の対応能力を上回る速さで変化する中、不確実なグローバル部品供給、生産、顧客への納品を同期させなければならない。

**[Northstar Living — 在庫の賭け](/assets/cases/ja/Northstar_Living_Inventory_Case.docx)。** ホームグッズ小売業者は、需要がどれほど強いか、あるいは海上輸送が予定通り到着するかどうかが分からないうちに、最も急成長している商品のホリデーシーズン向け仕入れを確定しなければならない。

### 需要管理 — 家具の販売

**[Hearthline Home — 需要バランスの問題](/assets/cases/ja/Hearthline_Furniture_Demand_Case.docx)。** 地域の家具小売業者は、人気スタイルの在庫切れや、顧客がもはや求めていない製品の大幅値下げを引き起こすことなく、どれだけ積極的にホリデーシーズンの需要を喚起すべきかを決定しなければならない。

### 電力網管理

**[Blue River System Operator — 午後6時の信頼性決定](/assets/cases/ja/BlueRiver_Grid_Case.docx)。** 地域の系統運用者は、記録的な夕方のピーク、太陽光発電回廊に向かう雷雨、そして重要な発電所からの警告に直面し、リアルタイムで信頼性のギャップをどう埋めるかを選択しなければならない。

**[Ridgeway Industrial Systems — エネルギーの岐路](/assets/cases/ja/Ridgeway_Industrial_Energy_Dilemma_Case.docx)。** 製造ネットワークのCOOは、電気料金の上昇とデータセンター主導のインフラ投資が地域の電力システムを再編する中、電力会社からの接続調査要請に対応しなければならない。

### ホテル収益管理

**[Harborview Hotel — 8週間の価格設定決定](/assets/cases/ja/Harborview_Hotel_Revenue_Management_Case.docx)。** ホテルの総支配人は、ピーク日はほぼ満室である一方、周辺の週末には空室が目立つ都市型技術会議に向けて、価格設定と在庫戦略を決定しなければならない。

### 健康分野の応用

#### 2型糖尿病の管理

**[Lakeside Medical Group — 次の90日間](/assets/cases/ja/Lakeside_Diabetes_Management_Case.docx)。** プライマリケアチームは、臨床反応、日常行動、テクノロジー、費用負担能力が絡み合い切り分けが難しい中、2型糖尿病患者の治療を再設計しなければならない。

#### 公衆衛生

**[Bellwether Department of Health — 36,000キットの決定](/assets/cases/ja/Bellwether_Naloxone_Allocation_Case.docx)。** 州の公衆衛生局は、パートナーが要請した数より少ないナロキソンキットしか受け取れず、限られた過剰摂取解毒剤の供給をどう配分するか、誰を訓練するか、将来の波に備えてキットを確保しておくべきかを決定しなければならない。

**[Harbor County — 麻疹対応](/assets/cases/ja/Harbor_County_Measles_Case.docx)。** 郡の保健責任者は、麻疹のリスクが集中し、ワクチン接種への信頼が低下し、予防のコストは即座に発生する一方でその便益がほとんど目に見えない状況で、どれほど積極的に対応すべきかを決定しなければならない。

**[Riverton County — 公衆衛生対応](/assets/cases/ja/Riverton_County_Public_Health_Case.docx)。** 郡の保健委員は、全国的な危機が緩和しつつあるように見える中でも地域の過剰摂取死亡者数が高止まりしている場合に、どう対応すべきかを決定しなければならない。

**[Redwood Department of Recovery Services — レッドウッドの資金の針](/assets/cases/ja/Redwood_State_Addiction_Funding_Case.docx)。** 州の依存症対策機関コミッショナーは、1,860万ドルの資金不足が126のポジションと大きく制約された収入構成を脅かす中、ナロキソンの配布、治療、回復支援サービスのバランスを取らなければならない。

#### 臨床試験

**[Asterion Therapeutics — 登録の時計](/assets/cases/ja/Asterion_Clinical_Trial_Case.docx)。** バイオテック企業の開発担当最高責任者は、登録が遅れ、安全性シグナルが現れ、特許の時計が刻む中、有望な治療法の第II相試験を加速、再構築、または一時停止すべきかを決定しなければならない。

**[Crestline Biotherapies — 28週目の決定](/assets/cases/ja/Crestline_Biotherapeutics_Clinical_Trial_Case.docx)。** バイオテック企業は、時間、患者、資本、そして残りの特許存続期間がすべて限られている中で、第II相臨床試験を拡大、再設計、一時停止、または中止すべきかを決定しなければならない。

### 大統領選挙の運営

**[The Meridian Campaign — 93票の地図](/assets/cases/ja/Meridian_Campaign_Electoral_Map_Case.docx)。** 大統領選挙運動のマネージャーは、投票日まで11週間という中、変化する選挙地図全体にわたって資金、候補者の時間、情報、そして現場対応能力を配分しなければならない。

### トラック輸送車両管理

**[Dispatch Dynamics — 推奨のギャップ](/assets/cases/ja/Dispatch_Dynamics_Recommendation_Gap_Case.docx)。** 決定自動化企業は、12社の顧客導入先全体でトラック輸送のディスパッチ推奨のうち実際に実行されるのはわずか43%であることを発見し、この「実装のラストマイル」のギャップをどう埋めるかを決定しなければならない。

**[PrairieLine Freight — 金曜午後のディスパッチ](/assets/cases/ja/PrairieLine_Truckload_Fleet_Case.docx)。** トラック輸送車両担当副社長は、週末を迎えるにあたり1,184台のトラクターが誤った場所に配置されている状況で、貨物の選択、運転手の配置、帰宅時間、ネットワークのバランスを取らなければならない。

### ミューチュアルファンドの資金管理

**[Summit Ridge Asset Management — 月曜朝の資金決定](/assets/cases/ja/Summit_Ridge_Mutual_Fund_Cash_Case.docx)。** ミューチュアルファンドのCIOは、週末に悪いニュースが続いた後、投資家の資金フロー、流動性、ポートフォリオのパフォーマンス、そして取引圧力をどう管理するかを決定しなければならない。

### サプライチェーンファイナンス

**[Northbridge Industrial Systems — 90日間の支払い決定](/assets/cases/ja/Northbridge_Supply_Chain_Finance_Case.docx)。** 自社の近い将来の債務を賄うには十分な現金を持ちながらも、関税主導の在庫購入を吸収するには不十分な製造業者は、重要なサプライヤーを不安定にすることなく流動性をどう保護するかを決定しなければならない。

### スタートアップ

**[BrightNest Home Services — 二面市場のローンチのジレンマ](/assets/cases/ja/BrightNest_Home_Cleaning_Launch_Case.docx)。** 家庭需要は強いが清掃員の供給が薄いホームクリーニング系スタートアップは、3つのパイロット市場全体で地理的拡大、価格設定、プラットフォーム投資のバランスをどう取るかを決定しなければならない。
{% endraw %}
