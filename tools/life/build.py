import json,re
from pypinyin import pinyin,Style
from content import CATS,T
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
        if ch=="覺" and text[i-1:i]=="睡": z[i]="ㄐㄧㄠˋ"
        if ch=="著": z[i]="ㄓㄜ˙"
        if ch=="了" and text[max(0,i-1):i+2]=="說了算": z[i]="ㄌㄧㄠˇ"
    return {"t":text,"z":"|".join(z)}
out=[]
for d in T:
    out.append(dict(id=d["id"],c=d["c"],e=d["e"],t=zy(d["t"]),pts=[zy(x) for x in d["pts"]],
      qs=[dict(q=zy(q),o=[zy(x) for x in o],a=a,w=zy(w)) for q,o,a,w in d["qs"]],
      rule=zy(d["rule"]),par=d["par"]))
cats=[dict(k=k,t=zy(t),e=e,bg=bg) for k,t,e,bg in CATS]
order=[]
for i in range(4):
    for c in "sbhm": order.append(f"{c}{i+1}")
ui=dict(week=zy("這週的生活小知識"),past=zy("以前的單元"),kou=zy("口訣"),home=zy("回生活芽"),
  safe=zy("這是保護自己的小知識。有不舒服的事，都可以告訴信任的大人。"),safe2=zy("有不舒服的事，一定要告訴信任的大人。這不是你的錯。"))
data=dict(ui=ui,st=zy("生活芽"),sub=zy("每週一個生活小知識"),cats=cats,topics=out,order=order,w0="20261123")
js="// 生活芽的單元內容（安全、身體界線、健康、品德）。注音由 pypinyin 產生，內容在 /home/claude/work/life/content.py。\n// 每週輪流解鎖一個單元（跟新聞芽一樣每週更新），order 是輪流的順序，w0 是第一週的星期一。\nexport const LIFE_DATA = "+json.dumps(data,ensure_ascii=False)+";\n"
open("../../src/life-data.js","w",encoding="utf-8").write(js)
print(len(js))
