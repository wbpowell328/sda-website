---
layout: page
title: "The parametric cost function approximation"
permalink: /cfa/
date: 2021-01-19 19:39:42
---

<!-- [if gte mso 9]><xml>
 <o:OfficeDocumentSettings>
  <o:AllowPNG/>
 </o:OfficeDocumentSettings>
</xml><![endif]--><!-- [if gte mso 9]><xml>
 <w:WordDocument>
  <w:View>Normal</w:View>
  <w:Zoom>0</w:Zoom>
  <w:TrackMoves/>
  <w:TrackFormatting/>
  <w:PunctuationKerning/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid>
  <w:IgnoreMixedContent>false</w:IgnoreMixedContent>
  <w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText>
  <w:DoNotPromoteQF/>
  <w:LidThemeOther>EN-US</w:LidThemeOther>
  <w:LidThemeAsian>X-NONE</w:LidThemeAsian>
  <w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:EnableOpenTypeKerning/>
   <w:DontFlipMirrorIndents/>
   <w:OverrideTableStyleHps/>
  </w:Compatibility>
  <m:mathPr>
   <m:mathFont m:val="Cambria Math"/>
   <m:brkBin m:val="before"/>
   <m:brkBinSub m:val="&#45;-"/>
   <m:smallFrac m:val="off"/>
   <m:dispDef/>
   <m:lMargin m:val="0"/>
   <m:rMargin m:val="0"/>
   <m:defJc m:val="centerGroup"/>
   <m:wrapIndent m:val="1440"/>
   <m:intLim m:val="subSup"/>
   <m:naryLim m:val="undOvr"/>
  </m:mathPr></w:WordDocument>
</xml><![endif]--><!-- [if gte mso 9]><xml>
 <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="false"
  DefSemiHidden="false" DefQFormat="false" DefPriority="99"
  LatentStyleCount="375">
  <w:LsdException Locked="false" Priority="0" QFormat="true" Name="Normal"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 1"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 2"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 3"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 4"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 5"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 6"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 7"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 8"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="heading 9"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index 9"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 1"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 2"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 3"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 4"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 5"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 6"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 7"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 8"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" Name="toc 9"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footnote text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="header"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footer"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="index heading"/>
  <w:LsdException Locked="false" Priority="35" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="caption"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="table of figures"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="envelope address"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="envelope return"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="footnote reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="line number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="page number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="endnote reference"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="endnote text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="table of authorities"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="macro"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="toa heading"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Bullet 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Number 5"/>
  <w:LsdException Locked="false" Priority="10" QFormat="true" Name="Title"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Closing"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Signature"/>
  <w:LsdException Locked="false" Priority="1" SemiHidden="true"
   UnhideWhenUsed="true" Name="Default Paragraph Font"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="List Continue 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Message Header"/>
  <w:LsdException Locked="false" Priority="11" QFormat="true" Name="Subtitle"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Salutation"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Date"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text First Indent"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text First Indent 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Note Heading"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Body Text Indent 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Block Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Hyperlink"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="FollowedHyperlink"/>
  <w:LsdException Locked="false" Priority="22" QFormat="true" Name="Strong"/>
  <w:LsdException Locked="false" Priority="20" QFormat="true" Name="Emphasis"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Document Map"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Plain Text"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="E-mail Signature"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Top of Form"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Bottom of Form"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal (Web)"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Acronym"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Address"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Cite"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Code"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Definition"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Keyboard"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Preformatted"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Sample"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Typewriter"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="HTML Variable"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Normal Table"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="annotation subject"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="No List"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Outline List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Simple 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Classic 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Colorful 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Columns 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Grid 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 4"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 5"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 7"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table List 8"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table 3D effects 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Contemporary"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Elegant"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Professional"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Subtle 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Subtle 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 1"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 2"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Web 3"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Balloon Text"/>
  <w:LsdException Locked="false" Priority="39" Name="Table Grid"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Table Theme"/>
  <w:LsdException Locked="false" SemiHidden="true" Name="Placeholder Text"/>
  <w:LsdException Locked="false" Priority="1" QFormat="true" Name="No Spacing"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 1"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 1"/>
  <w:LsdException Locked="false" SemiHidden="true" Name="Revision"/>
  <w:LsdException Locked="false" Priority="34" QFormat="true"
   Name="List Paragraph"/>
  <w:LsdException Locked="false" Priority="29" QFormat="true" Name="Quote"/>
  <w:LsdException Locked="false" Priority="30" QFormat="true"
   Name="Intense Quote"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 1"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 1"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 2"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 2"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 2"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 3"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 3"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 3"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 4"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 4"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 4"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 5"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 5"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 5"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="60" Name="Light Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="61" Name="Light List Accent 6"/>
  <w:LsdException Locked="false" Priority="62" Name="Light Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="63" Name="Medium Shading 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="64" Name="Medium Shading 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="65" Name="Medium List 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="66" Name="Medium List 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="67" Name="Medium Grid 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="68" Name="Medium Grid 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="69" Name="Medium Grid 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="70" Name="Dark List Accent 6"/>
  <w:LsdException Locked="false" Priority="71" Name="Colorful Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="72" Name="Colorful List Accent 6"/>
  <w:LsdException Locked="false" Priority="73" Name="Colorful Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="19" QFormat="true"
   Name="Subtle Emphasis"/>
  <w:LsdException Locked="false" Priority="21" QFormat="true"
   Name="Intense Emphasis"/>
  <w:LsdException Locked="false" Priority="31" QFormat="true"
   Name="Subtle Reference"/>
  <w:LsdException Locked="false" Priority="32" QFormat="true"
   Name="Intense Reference"/>
  <w:LsdException Locked="false" Priority="33" QFormat="true" Name="Book Title"/>
  <w:LsdException Locked="false" Priority="37" SemiHidden="true"
   UnhideWhenUsed="true" Name="Bibliography"/>
  <w:LsdException Locked="false" Priority="39" SemiHidden="true"
   UnhideWhenUsed="true" QFormat="true" Name="TOC Heading"/>
  <w:LsdException Locked="false" Priority="41" Name="Plain Table 1"/>
  <w:LsdException Locked="false" Priority="42" Name="Plain Table 2"/>
  <w:LsdException Locked="false" Priority="43" Name="Plain Table 3"/>
  <w:LsdException Locked="false" Priority="44" Name="Plain Table 4"/>
  <w:LsdException Locked="false" Priority="45" Name="Plain Table 5"/>
  <w:LsdException Locked="false" Priority="40" Name="Grid Table Light"/>
  <w:LsdException Locked="false" Priority="46" Name="Grid Table 1 Light"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark"/>
  <w:LsdException Locked="false" Priority="51" Name="Grid Table 6 Colorful"/>
  <w:LsdException Locked="false" Priority="52" Name="Grid Table 7 Colorful"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 1"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 1"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 1"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 2"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 2"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 2"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 3"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 3"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 3"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 4"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 4"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 4"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 5"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 5"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 5"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="46"
   Name="Grid Table 1 Light Accent 6"/>
  <w:LsdException Locked="false" Priority="47" Name="Grid Table 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="48" Name="Grid Table 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="49" Name="Grid Table 4 Accent 6"/>
  <w:LsdException Locked="false" Priority="50" Name="Grid Table 5 Dark Accent 6"/>
  <w:LsdException Locked="false" Priority="51"
   Name="Grid Table 6 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="52"
   Name="Grid Table 7 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="46" Name="List Table 1 Light"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark"/>
  <w:LsdException Locked="false" Priority="51" Name="List Table 6 Colorful"/>
  <w:LsdException Locked="false" Priority="52" Name="List Table 7 Colorful"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 1"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 1"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 1"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 1"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 2"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 2"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 2"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 2"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 3"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 3"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 3"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 3"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 4"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 4"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 4"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 4"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 5"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 5"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 5"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 5"/>
  <w:LsdException Locked="false" Priority="46"
   Name="List Table 1 Light Accent 6"/>
  <w:LsdException Locked="false" Priority="47" Name="List Table 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="48" Name="List Table 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="49" Name="List Table 4 Accent 6"/>
  <w:LsdException Locked="false" Priority="50" Name="List Table 5 Dark Accent 6"/>
  <w:LsdException Locked="false" Priority="51"
   Name="List Table 6 Colorful Accent 6"/>
  <w:LsdException Locked="false" Priority="52"
   Name="List Table 7 Colorful Accent 6"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Mention"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Smart Hyperlink"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Hashtag"/>
  <w:LsdException Locked="false" SemiHidden="true" UnhideWhenUsed="true"
   Name="Unresolved Mention"/>
 </w:LatentStyles>
</xml><![endif]-->
<p class="has-text-align-center">Warren B. Powell
Professor Emeritus, Princeton University
Chief analytics officer, Optimal Dynamics</p>
Within the vast class of problems that fall under the umbrella of sequential decisions (decision, information, decision, information, ...) there are many problems that naturally call for policies that plan into the future in order to decide what to do now.  Some examples are:
<ul>
 	<li>Deciding the next turn while planning a path to a destination over a road network.</li>
 	<li>Planning which energy generators to have running tomorrow to meet energy demand given the uncertainty in wind, solar and temperature.</li>
 	<li>Managing the flows of water between reservoirs given current forecasts of rainfall.</li>
 	<li>Routing a fleet of vehicles making pickups and/or deliveries as orders arrive dynamically.</li>
 	<li>Scheduling machines to meet order deadlines, with new orders arriving randomly.</li>
 	<li>Managing the inventory of high value products to meet scheduled demand requests.</li>
</ul>
These can be complex problems without having to deal with uncertainty, but all of these examples require making decisions in the presence of different forms of  uncertainty: demands, weather, travel times, equipment failures, ...

There are a number of complex, sophisticated tools that have been proposed in the academic literature for these problems that explicitly handle uncertainty, but very little of this work is actually used in practice.  Notable is the whole approach used in two-stage stochastic programs that depend on scenario trees.  In fact, I recognized the power of this approach when I became involved in one of the most popular problems in stochastic programming, the stochastic unit commitment problem.  For a discussion of this problem and the limitations of stochastic programming, <a href="http://tinyurl.com/unitcommitment">click here</a>.

This webpage will introduce a new approach, called a <strong><em>parametric cost function approximation</em></strong>, that formalizes a widely used industrial heuristic which is not just practical, but which may even outperform much more complex methods found in the academic literature.  The core idea is to parameterize a deterministic model, and then to optimize the parameterization.  What is missing in industrial applications is the tuning, which requires formulating the tuning problem as a stochastic optimization problem.

This idea (and hence this webpage) should be of interest to two communities:
<ul>
 	<li>People focusing on applications where you need to optimize problems (such as those above) over time in the presence of different forms of uncertainty, where you are particularly interested in using a deterministic lookahead policy (some call this "model predictive control").</li>
 	<li>Algorithmic specialists looking for a nice challenge.  In particular, parametric CFAs represent the bridge between machine learning and stochastic programming.  While a parametric CFA is easy to implement, there are difficult algorithmic challenges that parallel problems such as fitting neural networks to large datasets.</li>
</ul>
<h2>The challenge of planning under uncertainty</h2>
All of these problems require planning into the future to determine what decision to make now.  Given the different forms of uncertainty (travel times, customer demands, rainfall, product yields, prices, performance of vaccines, ...), we should be capturing this uncertainty as we plan if we want to make the<img class="size-medium wp-image-6537 alignright" src="https://castle.princeton.edu/wp-content/uploads/2021/02/decisiontree-300x218.jpg" alt="" width="300" height="218" /> best decision now.  The problem is that planning under uncertainty is hard.

The figure to the right illustrates the familiar explosion of a decision tree, and this is for a very simple problem (e.g. three possible decisions each time period). Bellman's introduction of Markov decision processes was a breakthrough for these problems, but this has been restricted to small (even toy) problems because of the infamous "curse of dimensionality" (there are actually three curses).

Now imagine we are managing a fleet of 1000 vehicles where we may have a decision vector with 10,000 <em>dimensions</em>.  In the 1950s, George Dantzig introduced the idea of using a lookahead policy where the uncertainties in the future are represented through a small sample (his motivating application was in scheduling airlines).  This idea created the field of stochastic programming, which has produced thousands of papers and a number of books.  If we let [latex]\Omega_t[/latex] represent a sample of outcomes (demands, deviations from wind forecasts, travel times, equipment failures), then we could make a decision using

[latex]X^\pi(S_t) =\argmax_{x_t}\left(c_tx_t + \sum_{\omega\in\Omega_t}p_t(\omega)\max_{x_{t,t+1}(\omega),...,x_{t,t+H}} \sum_{t'=t+1}^{t+H} c_{t'}(\omega)x_{t'}(\omega)\right)[/latex]                   (1)

subject to some constraints for the decision to be made now, [latex]x_t[/latex], as well as the decisions that would be made in the future [latex]x_{tt'}(\omega)[/latex] for each scenario [latex]\omega\in\Omega_t[/latex].

This optimization problem is much larger than a method that just uses point estimates of the future, as is done with navigation systems that use a point estimate of travel times over each link in a network.  There are many problems where some or all of the variables have to be integer; introducing scenarios in the lookahead model can make these problems exceptionally difficult.

What is often overlooked is that even when we can solve a stochastic program within computational constraints (a major issue in many applications), an optimal solution to a stochastic program is <em>not</em> an optimal policy, because a number of approximations have been made in the lookahead model.  Some of the most significant include:
<ul>
 	<li>The replacement of a fully sequential decision problem in the future.  Ideally, we want to make decision [latex]x_{t,t+1}[/latex], observe information [latex]W_{t,t+2}[/latex], make another decision [latex]x_{t,t+2}[/latex], observe information [latex]W_{t,t+3}[/latex] (and so on). With the two-stage approximation used in the stochastic program above, we assume we first observe all the information [latex]\omega = (W_{t,t+1}, W_{t,t+2}, \ldots, W_{t,t+H})[/latex] and <em>then</em> make all the decisions [latex]x_{t,t+1}(\omega), x_{t,t+2}(\omega), \ldots, x_{t,t+H}(\omega)[/latex].  This means [latex]x_{tt'}(\omega)[/latex] gets to ``see'' [latex]W_{t,t'+1}(\omega), W_{t,t'+2}(\omega), \ldots[/latex], which means decisions starting at time [latex]x_{t,t+1}[/latex] are allowed to see the entire future.</li>
 	<li>Replacing all outcomes with a sample.</li>
 	<li>Stochastic outcomes in the future have to be independent of any decisions (at time t or later).</li>
 	<li>Limiting the horizon [latex]t,t+1, \ldots, T[/latex] with the truncated horizon [latex]t,t+1,\ldots,t+H[/latex].</li>
 	<li>Often other approximations are made in the future, such as discretizing time periods (say, into hours instead of minutes, or days instead of hours).</li>
</ul>
Stochastic programming has attracted considerable attention from the research community, but very little of this work has been implemented in practice, for several reasons:
<ul>
 	<li>The stochastic program is complicated!</li>
 	<li>It is hard to solve, requiring computation times that may be far beyond what can be tolerated in practice.</li>
 	<li>The analyst has very little control over how the resulting policy responds to uncertainty, while in practice, practitioners often have very good intuition about how they want to deal with uncertainty.</li>
</ul>
<h2>The parametric cost function approximation</h2>
The most common approach used in practice is to solve a deterministic model, but introduce parameters to improve robustness of the solution.  Examples include:
<ul>
 	<li>We may use the shortest path from the deterministic model, but we leave [latex]\theta = 10[/latex] minutes earlier than the deterministic model recommends so we arrive on time.</li>
 	<li>We plan our energy generator for tomorrow, but introduce a vector [latex]\theta[/latex] of reserves in different regions of the network, taking known bottlenecks in the grid into account.</li>
 	<li>We plan the flow of water between reservoirs, but introduce upper and lower limits, captured by a vector [latex]\theta[/latex] that keep the system from allowing reservoirs to get too low or too high.  This makes it possible to draw down even when the reservoirs are at their lowest level if there is less rainfall than expected, or to store more if rainfall is more than expected.</li>
 	<li>Scheduling vehicles or machines to perform tasks, but introducing slack [latex]\theta[/latex] in the time required to complete certain tasks in case of equipment issues.</li>
</ul>
The use of deterministic models with tunable parameters [latex]\theta[/latex] has been a widely used engineering heuristic, which has been largely dismissed by the academic community as nothing more than a deterministic approximation.  Many who work in stochastic programming assume that introducing scenarios automatically means that these models are better, but these claims are made with virtually no empirical evidence (and certainly no theoretical support, given the approximations required by stochastic programming).

Tunable parameters can be introduced as adjustments to the objective function, or (more often) as changes to constraints.  We can write this in a generic way as

[latex] X^{\pi}(S_t|\theta) = \argmax_{x_t=(x_{tt}, \ldots, x_{t,t+H})} {\bar C}^{\pi}(S_t,x_t|\theta)[/latex]                                                                                     (2)

subject to

[latex]x_t \in X_t [/latex]

We can parameterize the objective function, and/or the constraints.  For an illustration, see "A Case Application" below where I show an LP with a parameterized set of constraints.

The central idea here is to parameterize a (typically deterministic) optimization model, which creates two challenges:
<ul>
 	<li>How do we parameterize the optimization model?  This work belongs in the context of the motivating application, since it draws on insights into the structure of the particular application.  The issues are comparable to the design of any parametric model in statistics, but (we believe) the opportunities are much richer.</li>
 	<li>Tuning the policy [latex] X^{\pi}(S_t|\theta)[/latex] - This is a purely algorithmic exercise which offers a number of fresh challenges in context of parameterized optimization problems, just as neural networks have introduced fresh challenges for parameter search while fitting neural networks to datasets.</li>
</ul>
<h2>Designing the parameterization</h2>
As with <em>any</em> parametric model, the structure of the parameterization is more art than science (as of this writing).  Parametric models date back to the early 1900s in the statistics community.  Easily the most popular form of parametric model is a model that is linear in the parameters, which we might write as

[latex]Y = \theta_0 + \theta_1 \phi_1(x) + \theta_2 \phi_2(x) + \ldots + \varepsilon [/latex]

where [latex]\phi_f(x), f\in F[/latex] is a set of features (also known as ``basis functions'') that depend on an input dataset <em>x</em>.  We could use this idea to modify our objective function, giving us

[latex] {\bar C}^{\pi}(S_t,x_t|\theta) = C(S_t,x_t) + \sum_{f\in F} \theta_f \phi_f(S_t,x_t)[/latex]

Here, the additional term [latex]\sum_{f\in F} \theta_f \phi_f(S_t,x_t)[/latex] could be called a ``cost function correction term,'' and requires carefully chosen features [latex]\phi_f(S_t,x_t)[/latex].

The most common way to parameterize constraints would be through the linear modification of the right hand side, which we can write as

[latex]A_t x_t = \theta^b \otimes b_t + \theta^c[/latex]

where [latex]\otimes[/latex] is the elementwise product of the vector [latex]\theta^b[/latex] times the similarly dimensioned vector [latex]b_t[/latex], and [latex]\theta^c[/latex] is a set of additive shifts.

Adding schedule slack would require parameterizing the [latex]A_t[/latex] matrix.  We can also shift upper and lower bounds on [latex]x_t[/latex].
<h2>Tuning the parameterization</h2>
However you design the modified objective function, we then face the problem of tuning [latex]\theta[/latex].  This is its own optimization problem, which we might write as

[latex]max_\theta F^\pi(\theta) = \mathbb{E}\left\{ \sum_{t=0}^T C(S_t,X^\pi(S_t|\theta))|S_0\right\} [/latex]                                                                       (3)

where the evolution of the state variable is determined by

[latex]S_{t+1} = S^M(S_t,X^\pi(S_t|\theta),W_{t+1})[/latex]

and given by an  underlying stochastic model for generating the sequence

[latex]W_1(\omega), W_2(\omega), \ldots, W_T(\omega).[/latex]

We refer to this as the <em>stochastic base model</em>, which is typically implemented as a simulator, but there are settings where we are optimizing the policy in the field.

The first question we have to answer is: how are we going to evaluate the policy?  We are going to need to run a simulation, but there are two ways to do this:
<ul>
 	<li>Simulating the policy in the computer.  Here, there are two ways of generating the exogenous information process [latex]W_1, \ldots, W_t, \ldots[/latex]:
<ul>
 	<li style="list-style-type: none;">
<ul style="list-style-type: circle;">
 	<li>Sampling from a stochastic model</li>
 	<li>Using sequence of observations from history (often called backtesting).</li>
</ul>
</li>
</ul>
</li>
 	<li>Testing in the field - This can be very slow (it takes a day to simulate a day), but it avoids any of the modeling approximations of Monte Carlo simulation. Typically this means that we have to learn by doing, which means that we have to live with our outcomes (this is called optimizing cumulative reward).</li>
</ul>
While we can do much more with a simulation model, these can be time-consuming and expensive to build, in addition to the fact that we still have to live with modeling approximations.  Testing policies in the field is what is done most often in practice, but often without any formal process of learning and improving.

This is a classical stochastic search problem, which can be approached using two basic approaches:
<ul>
 	<li>Derivative-based stochastic search - See chapter 5 of <em><a href="http://www.castle.princeton.edu/RLSO/">Reinforcement Learning and Stochastic Optimization</a>.</em></li>
 	<li>Derivative-free stochastic search - See chapter 7 of <em><a href="http://www.castle.princeton.edu/RLSO/">Reinforcement Learning and Stochastic Optimization</a>.</em></li>
</ul>
Note that you can only do derivative-based search in a computer-based simulator.

The difference between our parameterized CFA, and standard industry heuristics, is the formal statement of the objective function for tuning the parameters, which is the basis for any stochastic search algorithm.  For example, we have never seen a formal statement of an objective function for a policy based on stochastic programming.  People will formulate the stochastic program (which is just a form of lookahead policy), but do not realize that this is just a policy that has to be simulated to be evaluated.  By contrast, the objective function [latex]F^\pi(\theta)[/latex] is central to the parametric CFA policy, just as an objective function is central to the design of <em>any</em> search algorithm in deterministic optimization.

An important property of a parametric CFA is that it will typically be the case that the coefficient vector is inherently scaled.  At the bottom of this page, we present a case study where the parameter vector [latex]\theta[/latex] is centered around [latex]\theta = 1[/latex].  It uses rolling forecasts, and if the forecasts happen to be perfect, then the optimal value of [latex]\theta[/latex] satisfies [latex]\theta = 1[/latex].  This would not be the case if we were using, for example, a linear model or neural network.
<h2>From stochastic lookaheads to stochastic base models</h2>
It is very common in the algorithmic community to view a stochastic lookahead as the gold standard.  The problem is that stochastic lookaheads are inherently complicated, as hinted by the exploding scenario tree above.  The stochastic programming community has learned to live with the different approximations this approach requires.  For example, there may be arguments about how many scenarios [latex]\Omega_t[/latex] are required, but rarely is there a debate about the use of two-stage approximations, since three-stage models are almost always unsolvable.  They do not even raise the possibility of modeling every time period in the future as its own stage.

The process of tuning the parametric CFA, on the other hand, focuses on putting the stochastic model in the simulator required to evaluate [latex]F^\pi(\theta)[/latex].  While putting complex dynamics in a lookahead model is quite difficult, it is comparatively easier in the simulator captured by the transition function [latex]S_{t+1} = S^M(S_t,X^\pi(S_t|\theta),W_{t+1})[/latex].  This means that the tuned value of [latex]\theta[/latex] has these complex dynamics captured by the optimal solution [latex]\theta^*[/latex].

For this reason, we claim:

<strong><em>A properly designed and tuned parametric CFA may easily outperform a much more complex stochastic lookahead, such as those produced by stochastic programming.</em></strong>

It is important to emphasize that no policy, including parametric CFAs, is a panacea.  The universe of sequential decision problems is simply too vast.  However, the types of problems that are good candidates for stochastic programming (regardless of whether you are using scenario trees or SDDP) are likely to be good candidates for parametric CFAs.

There are many papers that formulate stochastic programs to solve a sequential decision problem, which do not then run simulations, but there are some that do.  The most common competition is to compare a stochastic lookahead (using scenario trees) against a ``deterministic model.'' These comparisons never compare against a properly parameterized and tuned deterministic model.
<h2>A case application</h2>
We have demonstrated this idea in a complex form of energy storage application.  The energy system consists of four elements: energy from the grid, energy from a wind farm, a storage device, and a load (demand) for energy:<img class="alignnone  wp-image-6551" src="https://castle.princeton.edu/wp-content/uploads/2021/02/energystoragesystem-1-300x107.jpg" alt="" width="614" height="219" />

There is a demand for energy that follows a consistent hour-of-day pattern (figure below on the left), along with rolling forecasts of wind that are updated hourly (figure on the right).

<img class="alignnone  wp-image-6554" src="https://castle.princeton.edu/wp-content/uploads/2021/02/demandandwindforecast-1-300x90.jpg" alt="" width="630" height="189" />

These two types of variability are different in an important way.  The time-of-day demand pattern means that the high and low points occur consistently at the same time of day, which could be picked up with a parameterized policy where the parameter [latex]\theta_t[/latex] is indexed by time.

This is not the case with the rolling forecast, where the peak wind forecast can change over time, as it does in the illustration of forecasts in the figure on the right.  In this figure, black is the actual wind (observed at the end of the day), while the other lines are forecasts made each hour, where the peak wind changed over the course of the day.  If [latex]f^W_{tt'}[/latex] is the forecast of wind for hour [latex]t'[/latex] made as of hour [latex]t[/latex], then the vector of forecasts [latex]f^W_t = (f^W_{tt'}), t'=t, ..., t+24[/latex] has to be treated as part of the state variable. <a href="https://arxiv.org/abs/1912.03513">See here (section 5)  for a proper model of rolling forecasts</a> for this energy storage problem.

[One way to solve this problem using a stochastic lookahead model would be to make the forecast a <em>latent variable, </em>which means we model the errors in the forecast, but otherwise lock the forecasts in place and treat them as constants (this means we are not modeling the fact that these forecasts are evolving over time).  Imagine that we solve this stochastic model using approximate dynamic programming, which means that we have to estimate value function approximations [latex]{\bar V}_t(S_t)[/latex] where [latex]S_t[/latex] might capture how much energy is stored in the battery, but does not include the current set of forecasts [latex]f^W_t[/latex].  This means that when we step from <em>t</em> to <em>t+1</em>, we would have to re-estimate the value functions [latex]{\bar V}_t(S_t)[/latex] <em>entirely from scratch.</em>]

A powerful way to handle both the time-of-day effect, as well as the rolling forecast, is to use a deterministic lookahead model, parameterized by introducing coefficients<img class="size-medium wp-image-6556 alignright" src="https://castle.princeton.edu/wp-content/uploads/2021/02/parameterizedlookahead-300x199.jpg" alt="" width="300" height="199" /> [latex]\theta_\tau[/latex] for [latex]\tau=1, 2, ..., 24[/latex] in front of each forecast [latex]f^W_{t,t+\tau}[/latex].  The resulting policy is a simple linear program given by the figure to the right.  This policy is no more complicated than a simple deterministic lookahead, obtained by setting [latex]\theta_\tau = 1[/latex] for all [latex]\tau[/latex].

This lookahead policy is both stationary, and has the current forecast imbedded in the policy.  Of course this means that we have to re-optimize the deterministic lookahead as the forecasts change, but this is extremely fast (a fraction of a second).

Using this policy in the field is very easy.  Tuning the parameter vector [latex]\theta[/latex], however, is not.  We used a stochastic gradient algorithm based on Spall's simultaneous perturbation stochastic approximation (SPSA) method, which allows us to estimate an entire gradient with just two function evaluations.  However, our simulations were extremely noisy, which meant that we had to perform ``mini-batches'' of perhaps 20 simulations which were then averaged. Also, the objective function [latex]F^\pi(\theta)[/latex] is nonconvex, but appears to be unimodular. <a href="https://arxiv.org/abs/2001.00831">Please click here for a paper summarizing our work on tuning the policy</a>, which produced results 30 to 50 percent better than a basic lookahead with [latex]\theta=1[/latex].  As we said at the beginning, there is a lot to do here for people who enjoy algorithmic research.

We note that this approach <em>guarantees </em>that we will do at least as well, if not better, than a standard deterministic lookahead (that is, with [latex]\theta=1[/latex]).  Most important is that it is no more complicated to solve than a standard deterministic lookahead.  The additional work is in the tuning of the parameters which is done in the lab, but this requires building a simulator.  It is possible to envision an approach that uses self-tuning in the field, drawing on the tools of derivative-free stochastic search.

This application nicely illustrates how parameterizing, say, a deterministic lookahead helps to perform valuable scaling.  If our forecasts were perfect, then we will find that [latex]\theta^* = 1[/latex].  With large errors, we found that the best values of [latex]\theta[/latex] ranged between 0 and 2.  This behavior dramatically simplified the search.
<h2>References</h2>
We have mentioned the idea of a "cost function approximation" in several earlier papers.  The general idea of the CFA policy is introduced in much greater detail in

<a href="http://tinyurl.com/cfapolicyidea">Warren Powell, Saeed Ghadimi, The Parametric Cost Function Approximation: A new approach for multistage stochastic programming</a>

The algorithmic work behind the energy storage problem described above is discussed in depth in

<a href="https://tinyurl.com/ghadimicfaenergy">Saeed Ghadimi, Warren Powell, Stochastic Search for a Parametric Cost Function Approximation: Energy storage with rolling forecasts, European J. of Operational Research, 312, No. 2, 641-652, 2024</a>.

See also chapter 13 of <em><a href="https://tinyurl.com/RLandSO/">Reinforcement Learning and Stochastic Optimization</a>. </em>

<!-- /wp:post-content -->

<!-- wp:tadv/classic-paragraph /-->
