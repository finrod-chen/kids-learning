# 產生 src/stk-extra.js（新站成就）與暫用圖示。python3 tools/stk/build.py
import json,re,base64,io
from pypinyin import pinyin,Style
from PIL import Image,ImageDraw
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
    return {"t":text,"z":z}
T4=[4,8,12,16]
ITEMS=[
 dict(id="lifepro",name="生活小達人",desc="學完4個生活芽單元",cat="lf",goal=4,tiers=T4,dp="學完生活芽",ds="個單元",col=(236,170,60)),
 dict(id="bodyguard",name="護身小勇士",desc="學完身體界線4個單元",cat="bs",goal=4,col=(70,150,220)),
 dict(id="lifequiz",name="小測驗滿分王",desc="生活芽小測驗拿3次滿分",cat="lp",goal=3,tiers=[3,6,10,16],dp="生活芽小測驗拿",ds="次滿分",col=(120,190,90)),
 dict(id="caring",name="暖心小天使",desc="照顧芽幫了家人5次",cat="cr",goal=5,tiers=[5,20,50,100],dp="照顧芽幫了家人",ds="次",col=(240,130,150)),
 dict(id="sunshine",name="貼心小太陽",desc="每一位家人都幫過",cat="cs",goal=1,col=(250,200,60)),
 dict(id="moodlog",name="心情記錄員",desc="心情芽記錄7天",cat="mo",goal=7,tiers=[7,14,30,60],dp="心情芽記錄",ds="天",col=(170,130,220)),
 dict(id="chatter",name="小小聊天家",desc="聊聊芽聊了5次",cat="ct",goal=5,tiers=[5,20,50,100],dp="聊聊芽聊了",ds="次",col=(90,190,190)),
]
out=[]
for it in ITEMS:
    d=dict(id=it["id"],name=zy(it["name"]),desc=zy(it["desc"]),cat=it["cat"],goal=it["goal"])
    if "tiers" in it: d["tiers"]=it["tiers"]; d["dp"]=zy(it["dp"]); d["ds"]=zy(it["ds"])
    out.append(d)
data=json.dumps(out,ensure_ascii=False,separators=(",",":"))
tpl=open("extra.tpl.js",encoding="utf-8").read()
js="// 貼貼芽的新站成就（生活、照顧、心情、聊聊）。由 tools/stk/build.py 產生，注音由 pypinyin 產生。\nexport const STK_EXTRA_JS = `"+tpl.replace("__ITEMS__",data).replace("\\","\\\\").replace("`","\\`").replace("${","\\${")+"`;\n"
open("../../src/stk-extra.js","w",encoding="utf-8").write(js)
# 圖示是 assets/stk/stk-<id>.webp（正式圖），已寫入 src/care-img.js；要換圖時換檔後重新轉 base64 即可。
print(len(js))
