#本工具用于处理表格，最终返回的数据结构设计为二维向量->[['title_a','title_b'],['item_a','item_b']]
from lxml import etree
test_table='''<table style="width: 100%; border-collapse: collapse; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 0cm 0cm 0cm;" border="1" width="100%" cellspacing="0" cellpadding="0"> 
<thead> 
<tr style="height: 36.4pt; mso-yfti-irow: 0; mso-yfti-firstrow: yes;"> 
<td style="padding: 3.75pt 6pt; border: 1pt solid #333333; width: 60pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt;" width="80"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">品目号</span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 225pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="300"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">品目名称</span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 225pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="300"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">采购标的</span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 75pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="100"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">数量（单位）</span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 150pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="200"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">技术规格、参数及要求</span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 90pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="120"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">品目预算<span lang="EN-US">(</span>元<span lang="EN-US">)</span></span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 1pt 1pt 1pt 0px; border-style: solid solid solid none; border-color: #333333 #333333 #333333 #000000; padding: 3.75pt 6pt; width: 90pt; height: 36.4pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt;" width="120"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><strong><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">最高限价<span lang="EN-US">(</span>元<span lang="EN-US">)</span></span></strong></p>
<span style="font-family: 宋体;"> </span></td>
 </tr>
 </thead>
 
<tbody>
<tr style="height: 24pt; mso-yfti-irow: 1;"> 
<td style="border-width: 0px 1pt 1pt; border-style: none solid solid; border-color: #000000 #333333 #333333; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">1-1</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">信息化工程监理服务</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">软件开发监理服务</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">1(</span><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">项<span lang="EN-US">)</span></span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">详见采购文件</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: right; line-height: 18pt; mso-pagination: widow-orphan;" align="right"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">99,000.00</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: right; line-height: 18pt; mso-pagination: widow-orphan;" align="right"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">-</span></p>
<span style="font-family: 宋体;"> </span></td>
 </tr>
 
<tr style="height: 24pt; mso-yfti-irow: 2; mso-yfti-lastrow: yes;"> 
<td style="border-width: 0px 1pt 1pt; border-style: none solid solid; border-color: #000000 #333333 #333333; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">1-2</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">工程监理服务</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">工程监理服务</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">1(</span><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">项<span lang="EN-US">)</span></span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: center; line-height: 18pt; -ms-word-break: break-all; mso-pagination: widow-orphan;" align="center"><span style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">详见采购文件</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: right; line-height: 18pt; mso-pagination: widow-orphan;" align="right"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">247,173.00</span></p>
<span style="font-family: 宋体;"> </span></td>
 
<td style="border-width: 0px 1pt 1pt 0px; border-style: none solid solid none; border-color: #000000 #333333 #333333 #000000; padding: 3.75pt 6pt; height: 24pt; background-color: transparent; mso-border-alt: solid #333333 .75pt; mso-border-left-alt: solid #333333 .75pt; mso-border-top-alt: solid #333333 .75pt;"><span style="font-family: 宋体;"> </span>
<p style="margin: 0cm 0cm 0pt; text-align: right; line-height: 18pt; mso-pagination: widow-orphan;" align="right"><span lang="EN-US" style="font-family: 宋体; font-size: 12pt; mso-bidi-font-family: 宋体; mso-font-kerning: 0pt;">-</span></p>
<span style="font-family: 宋体;"> </span></td>
 </tr>
 </tbody>
</table>'''

html=etree.HTML(test_table)

def table_get(table_xpath):

    table_vector=[]
    for tr in table_xpath.xpath('.//tr'):
      td_list=[]
      for item in tr.xpath('.//*/text()'):
       if item!='':
        td_list.append(item)
      table_vector.append(td_list)
    print(td_list)
    return td_list


table_get(html.xpath('.//table')[0])

