# 產生 src/fortune-data.js（芽芽小占卜的任務庫，含注音）。python3 tools/fortune/build.py
import json,re
from pypinyin import pinyin,Style
BP=re.compile(r'^[ㄅ-ㄩ˙ˊˇˋ]+$')
def zy(text):
    toks=[x[0] for x in pinyin(text,style=Style.BOPOMOFO)]
    z=[]
    for k in toks:
        if BP.match(k): z.append(k)
        else: z.extend([""]*len(k))
    assert len(z)==len(text),(text,len(z),len(text))
    for i,ch in enumerate(text):
        if ch=="不" and z[i]=="ㄅㄨˊ": z[i]="ㄅㄨˋ"
        if ch=="一" and z[i] in ("ㄧˊ","ㄧˋ"): z[i]="ㄧ"
        if ch=="得": z[i]="ㄉㄜ˙"
        if ch=="著": z[i]="ㄓㄜ˙"
    return {"t":text,"z":"|".join(z)}
CATS=[("f","家人","💞","#FDEBEC"),("p","禮貌","🙏","#FFF3D6"),("s","自己","🌱","#E3F4E6"),("a","小冒險","🌈","#E8F1FB")]
T={
"f":["今天跟家人說一句謝謝","幫家人拿一樣東西","抱抱家人，說一句「我愛你」","陪弟弟妹妹玩一下","幫忙收拾一樣玩具","跟家人說一件今天開心的事","幫爸爸或媽媽捶捶背","分享一樣好吃的給家人","吃飯前幫忙擺碗筷","稱讚家人一件事","教弟弟妹妹一件小事","今天主動說早安和晚安"],
"p":["遇到人要笑著打招呼","有人幫你，大聲說謝謝","不小心碰到別人，說對不起","借東西前先問「可以借我嗎？」","說話時看著對方的眼睛","排隊時耐心等一等","別人說話時，先聽完再說","吃完東西把垃圾丟進垃圾桶","對老師說一句謝謝","用「請」來請別人幫忙","有人難過時，問他「你還好嗎？」","把門輕輕關上"],
"s":["自己把書包整理好","今天喝足夠的水","睡前刷牙，不要偷懶","把鞋子排整齊","今天自己穿好衣服","讀一頁喜歡的書","做三個深呼吸，讓心靜下來","今天早一點上床睡覺","把桌子整理乾淨","伸伸懶腰，動一動身體","寫下今天學到的一件事","吃一樣平常不愛吃的蔬菜"],
"a":["找找看，今天有幾種綠色的東西","找一個圓圓的東西，和家人分享","學一句新的英文單字","觀察一朵花或一棵小草","想一個好笑的笑話說給家人聽","畫一張今天的心情小圖","找一樣今天第一次看到的東西","走路時數一數有幾棵樹","用三個詞形容今天的天氣","跟家人玩一次猜謎","唱一首喜歡的歌","替今天取一個好聽的名字"]}
tasks=[dict(id=f"{c}{i+1}",c=c,t=zy(t)) for c,_,_,_ in CATS for i,t in enumerate(T[c])]
ui={k:zy(v) for k,v in dict(title="芽芽小占卜",sub="每天抽一張小任務",tap="點一下，抽今天的任務",today="今天的任務",done="我做到了",say="朗讀",again="再抽一次（預覽用）",lucky="大吉！",luckyd="今天做到，小芽會長得特別快",praise="好棒！你做到了",water="小芽喝到水，開心地長高了",home="回首頁",shake="小芽正在搖一搖…").items()}
cats=[dict(k=k,t=zy(n),e=e,bg=bg) for k,n,e,bg in CATS]
data=dict(ui=ui,cats=cats,tasks=tasks)
js="// 芽芽小占卜的任務庫（含注音）。由 tools/fortune/build.py 產生，內容在該檔的 T。\nexport const FORTUNE_DATA = "+json.dumps(data,ensure_ascii=False,separators=(",",":"))+";\n"
open("../../src/fortune-data.js","w",encoding="utf-8").write(js)
print(len(js),len(tasks))
