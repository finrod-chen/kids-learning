# 產生 src/mascot-data.js（首頁芽芽會說的話：冷笑話、小知識、小提醒，含注音）。python3 tools/mascot/build.py
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
J=["什麼東西越洗越髒？洗澡水！","什麼門永遠關不上？球門！","什麼東西一直走，卻從來不會累？時鐘！","什麼豆子不能吃？跳豆！","什麼東西越大越輕？氣球！","蝸牛為什麼背著房子？因為牠買不起房子，只好帶著走！","老師問：誰能說出一個很長的詞？小明說：等一下！","什麼東西是你的，別人卻比你還常用？你的名字！","什麼東西打破了反而更好？紀錄！","什麼東西沒有腳，卻能帶你去很遠的地方？書！"]
F=["章魚有三顆心臟喔。","蜜蜂會跳八字舞，告訴同伴花在哪裡。","長頸鹿的脖子很長，可是和人一樣只有七塊頸骨。","北極熊的毛是透明的，看起來才是白色。","彩虹有七種顏色：紅、橙、黃、綠、藍、靛、紫。","閃電比打雷先被看到，因為光比聲音跑得快。","貓咪一天可以睡十幾個小時。","臺灣最高的山是玉山。","螞蟻可以搬動比自己重好幾倍的東西。","月亮自己不會發光，是反射太陽的光。","大象會用長長的鼻子喝水、洗澡和拿東西。","企鵝是鳥，雖然不會飛，卻很會游泳。","蚯蚓會讓泥土變鬆，是植物的好朋友。","小朋友睡覺的時候，身體正在長高喔。"]
R=["喝一杯水，身體會很開心。","坐久了，站起來動一動吧。","看書或看螢幕一會兒，就看看遠方休息眼睛。","吃完東西，記得刷牙喔。","說請、謝謝、對不起，大家都喜歡你。","有不舒服的事，一定要告訴信任的大人。","過馬路要停、看、聽。","今天有沒有幫小芽澆水呢？","晚上早一點睡覺，明天才有精神。","做錯事沒關係，說對不起，再試一次。","洗手要搓到每一個指縫喔。","心情不好時，深呼吸三次，會舒服一點。","玩具玩完了，記得送它們回家。","今天來看一本書吧。"]
items=[dict(k="j",t=zy(t)) for t in J]+[dict(k="f",t=zy(t)) for t in F]+[dict(k="r",t=zy(t)) for t in R]
ui={k:zy(v) for k,v in dict(hint="點點我，聽我說話",j="冷笑話",f="小知識",r="小提醒").items()}
tags={"j":"😄","f":"💡","r":"🔔"}
data=dict(ui=ui,tags=tags,items=items)
js="// 首頁芽芽會說的話（冷笑話、小知識、小提醒，含注音）。由 tools/mascot/build.py 產生，內容在該檔的 J、F、R。\nexport const MASCOT_DATA = "+json.dumps(data,ensure_ascii=False,separators=(",",":"))+";\n"
open("../../src/mascot-data.js","w",encoding="utf-8").write(js)
print(len(js),len(items))
