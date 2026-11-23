// 從首頁 SPA 逐字切出的共用函式（注音 zy、語音、日期/亂數、筆順、澆水小芽）。內容與首頁相同，不要手改；
// 之後每搬一個站，就把該站用到的首頁函式搬進來，首頁最後整份退役。
export const SPA_LIB_JS = `const UI = {"g3":{"t":"三年級","z":["ㄙㄢ","ㄋㄧㄢˊ","ㄐㄧˊ"]},"g1":{"t":"一年級","z":["ㄧ","ㄋㄧㄢˊ","ㄐㄧˊ"]},"pick":{"t":"你是幾年級？","z":["ㄋㄧˇ","ㄕˋ","ㄐㄧˇ","ㄋㄧㄢˊ","ㄐㄧˊ",""]},"week":{"t":"最新的文章","z":["ㄗㄨㄟˋ","ㄒㄧㄣ","ㄉㄜ˙","ㄨㄣˊ","ㄓㄤ"]},"read":{"t":"讀文章","z":["ㄉㄨˊ","ㄨㄣˊ","ㄓㄤ"]},"quiz":{"t":"開始小測驗","z":["ㄎㄞ","ㄕˇ","ㄒㄧㄠˇ","ㄘㄜˋ","ㄧㄢˋ"]},"listen":{"t":"唸給我聽","z":["ㄋㄧㄢˋ","ㄍㄟˇ","ㄨㄛˇ","ㄊㄧㄥ"]},"stop":{"t":"停下來","z":["ㄊㄧㄥˊ","ㄒㄧㄚˋ","ㄌㄞˊ"]},"next":{"t":"下一題","z":["ㄒㄧㄚˋ","ㄧ","ㄊㄧˊ"]},"right":{"t":"答對了！","z":["ㄉㄚˊ","ㄉㄨㄟˋ","ㄌㄜ˙",""]},"wrong":{"t":"再想一想喔","z":["ㄗㄞˋ","ㄒㄧㄤˇ","ㄧ","ㄒㄧㄤˇ","ㄛ"]},"correctIs":{"t":"正確答案是","z":["ㄓㄥˋ","ㄑㄩㄝˋ","ㄉㄚˊ","ㄢˋ","ㄕˋ"]},"result":{"t":"看成績","z":["ㄎㄢˋ","ㄔㄥˊ","ㄐㄧ"]},"home":{"t":"回首頁","z":["ㄏㄨㄟˊ","ㄕㄡˇ","ㄧㄝˋ"]},"back":{"t":"回上一頁","z":["ㄏㄨㄟˊ","ㄕㄤˋ","ㄧ","ㄧㄝˋ"]},"done":{"t":"做完了！","z":["ㄗㄨㄛˋ","ㄨㄢˊ","ㄌㄜ˙",""]},"great":{"t":"好棒！全部答對！","z":["ㄏㄠˇ","ㄅㄤˋ","","ㄑㄩㄢˊ","ㄅㄨˋ","ㄉㄚˊ","ㄉㄨㄟˋ",""]},"good":{"t":"很不錯！","z":["ㄏㄣˇ","ㄅㄨˋ","ㄘㄨㄛˋ",""]},"keep":{"t":"繼續加油！","z":["ㄐㄧˋ","ㄒㄩˋ","ㄐㄧㄚ","ㄧㄡˊ",""]},"unread":{"t":"還沒讀","z":["ㄏㄞˊ","ㄇㄟˊ","ㄉㄨˊ"]},"finished":{"t":"讀完了","z":["ㄉㄨˊ","ㄨㄢˊ","ㄌㄜ˙"]},"tag_sci":{"t":"科普","z":["ㄎㄜ","ㄆㄨˇ"]},"tag_lit":{"t":"文學","z":["ㄨㄣˊ","ㄒㄩㄝˊ"]},"tag_poem":{"t":"童詩","z":["ㄊㄨㄥˊ","ㄕ"]},"tag_story":{"t":"故事","z":["ㄍㄨˋ","ㄕˋ"]},"bigger":{"t":"字大一點","z":["ㄗˋ","ㄉㄚˋ","ㄧ","ㄉㄧㄢˇ"]},"smaller":{"t":"字小一點","z":["ㄗˋ","ㄒㄧㄠˇ","ㄧ","ㄉㄧㄢˇ"]},"choose":{"t":"選一個答案","z":["ㄒㄩㄢˇ","ㄧ","ㄍㄜˋ","ㄉㄚˊ","ㄢˋ"]},"again":{"t":"再做一次","z":["ㄗㄞˋ","ㄗㄨㄛˋ","ㄧ","ㄘˋ"]},"older":{"t":"以前的文章","z":["ㄧˇ","ㄑㄧㄢˊ","ㄉㄜ˙","ㄨㄣˊ","ㄓㄤ"]},"empty":{"t":"文章還沒準備好","z":["ㄨㄣˊ","ㄓㄤ","ㄏㄞˊ","ㄇㄟˊ","ㄓㄨㄣˇ","ㄅㄟˋ","ㄏㄠˇ"]},"listenQ":{"t":"唸題目","z":["ㄋㄧㄢˋ","ㄊㄧˊ","ㄇㄨˋ"]},"why":{"t":"為什麼？","z":["ㄨㄟˋ","ㄕㄣˊ","ㄇㄜ˙",""]},"chars":{"t":"特色生字","z":["ㄊㄜˋ","ㄙㄜˋ","ㄕㄥ","ㄗˋ"]},"radical":{"t":"部首","z":["ㄅㄨˋ","ㄕㄡˇ"]},"strokes":{"t":"筆畫","z":["ㄅㄧˇ","ㄏㄨㄚˋ"]},"hua":{"t":"畫","z":["ㄏㄨㄚˋ"]},"word":{"t":"詞語","z":["ㄘˊ","ㄩˇ"]},"tip":{"t":"小提醒","z":["ㄒㄧㄠˇ","ㄊㄧˊ","ㄒㄧㄥˇ"]},"replay":{"t":"再寫一次","z":["ㄗㄞˋ","ㄒㄧㄝˇ","ㄧ","ㄘˋ"]},"game":{"t":"生字小遊戲","z":["ㄕㄥ","ㄗˋ","ㄒㄧㄠˇ","ㄧㄡˊ","ㄒㄧˋ"]},"sayChar":{"t":"唸一唸","z":["ㄋㄧㄢˋ","ㄧ","ㄋㄧㄢˋ"]},"gameQ":{"t":"空格裡是哪個字？","z":["ㄎㄨㄥˋ","ㄍㄜˊ","ㄌㄧˇ","ㄕˋ","ㄋㄚˇ","ㄍㄜˋ","ㄗˋ",""]},"gameDone":{"t":"生字都會了！","z":["ㄕㄥ","ㄗˋ","ㄉㄡ","ㄏㄨㄟˋ","ㄌㄜ˙",""]},"tapChar":{"t":"點一個字，看它怎麼寫","z":["ㄉㄧㄢˇ","ㄧ","ㄍㄜˋ","ㄗˋ","","ㄎㄢˋ","ㄊㄚ","ㄗㄣˇ","ㄇㄜ˙","ㄒㄧㄝˇ"]},"backRead":{"t":"回文章","z":["ㄏㄨㄟˊ","ㄨㄣˊ","ㄓㄤ"]},"nextc":{"t":"下一個","z":["ㄒㄧㄚˋ","ㄧ","ㄍㄜˋ"]},"playAgain":{"t":"再玩一次","z":["ㄗㄞˋ","ㄨㄢˊ","ㄧ","ㄘˋ"]},"order":{"t":"筆順","z":["ㄅㄧˇ","ㄕㄨㄣˋ"]},"hubQ":{"t":"今天想去哪個小站？","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄒㄧㄤˇ","ㄑㄩˋ","ㄋㄚˇ","ㄍㄜˋ","ㄒㄧㄠˇ","ㄓㄢˋ",""]},"readSt":{"t":"讀讀芽","z":["ㄉㄨˊ","ㄉㄨˊ","ㄧㄚˊ"]},"vocabSt":{"t":"說說芽","z":["ㄕㄨㄛ","ㄕㄨㄛ","ㄧㄚˊ"]},"abcUI":{"abcSt":{"t":"英文字母","z":["ㄧㄥ","ㄨㄣˊ","ㄗˋ","ㄇㄨˇ"]},"abcSub":{"t":"認識 ABC，聽字母發音","z":["ㄖㄣˋ","ㄕˊ","","","","","","ㄊㄧㄥ","ㄗˋ","ㄇㄨˇ","ㄈㄚ","ㄧㄣ"]},"abcT":{"t":"英文字母","z":["ㄧㄥ","ㄨㄣˊ","ㄗˋ","ㄇㄨˇ"]},"abcAll":{"t":"全部唸一遍","z":["ㄑㄩㄢˊ","ㄅㄨˋ","ㄋㄧㄢˋ","ㄧ","ㄅㄧㄢˋ"]},"abcSubA":{"t":"認識 ABC","z":["ㄖㄣˋ","ㄕˊ","","","",""]},"abcSubB":{"t":"聽字母發音","z":["ㄊㄧㄥ","ㄗˋ","ㄇㄨˇ","ㄈㄚ","ㄧㄣ"]},"abcLetter":{"t":"字母","z":["ㄗˋ","ㄇㄨˇ"]},"abcWord":{"t":"單字","z":["ㄉㄢ","ㄗˋ"]}},"mUI":{"mathSt":{"t":"算算芽","z":["ㄙㄨㄢˋ","ㄙㄨㄢˋ","ㄧㄚˊ"]},"mathSub":{"t":"每日口算，九九乘法","z":["ㄇㄟˇ","ㄖˋ","ㄎㄡˇ","ㄙㄨㄢˋ","","ㄐㄧㄡˇ","ㄐㄧㄡˇ","ㄔㄥˊ","ㄈㄚˇ"]},"mhello":{"t":"今天練什麼？","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄌㄧㄢˋ","ㄕㄣˊ","ㄇㄜ˙",""]},"kind3":{"t":"兩位數 × 一位數","z":["ㄌㄧㄤˇ","ㄨㄟˋ","ㄕㄨˋ","","","","ㄧ","ㄨㄟˋ","ㄕㄨˋ"]},"kind1":{"t":"個位數加減","z":["ㄍㄜˋ","ㄨㄟˋ","ㄕㄨˋ","ㄐㄧㄚ","ㄐㄧㄢˇ"]},"did":{"t":"今天答對","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄉㄚˊ","ㄉㄨㄟˋ"]},"notyet":{"t":"今天還沒練習","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄏㄞˊ","ㄇㄟˊ","ㄌㄧㄢˋ","ㄒㄧˊ"]},"table":{"t":"九九乘法表","z":["ㄐㄧㄡˇ","ㄐㄧㄡˇ","ㄔㄥˊ","ㄈㄚˇ","ㄅㄧㄠˇ"]},"tableSub":{"t":"隨時複習，也能遮住答案考考自己","z":["ㄙㄨㄟˊ","ㄕˊ","ㄈㄨˋ","ㄒㄧˊ","","ㄧㄝˇ","ㄋㄥˊ","ㄓㄜ","ㄓㄨˋ","ㄉㄚˊ","ㄢˋ","ㄎㄠˇ","ㄎㄠˇ","ㄗˋ","ㄐㄧˇ"]},"di":{"t":"第","z":["ㄉㄧˋ"]},"ti":{"t":"題","z":["ㄊㄧˊ"]},"ok":{"t":"確定","z":["ㄑㄩㄝˋ","ㄉㄧㄥˋ"]},"clear":{"t":"清除","z":["ㄑㄧㄥ","ㄔㄨˊ"]},"next":{"t":"下一題","z":["ㄒㄧㄚˋ","ㄧ","ㄊㄧˊ"]},"finish":{"t":"看成績","z":["ㄎㄢˋ","ㄔㄥˊ","ㄐㄧ"]},"right":{"t":"答對了！","z":["ㄉㄚˊ","ㄉㄨㄟˋ","ㄌㄜ˙",""]},"wrong":{"t":"答錯了，答案是","z":["ㄉㄚˊ","ㄘㄨㄛˋ","ㄌㄜ˙","","ㄉㄚˊ","ㄢˋ","ㄕˋ"]},"great":{"t":"太棒了，全對！","z":["ㄊㄞˋ","ㄅㄤˋ","ㄌㄜ˙","","ㄑㄩㄢˊ","ㄉㄨㄟˋ",""]},"good":{"t":"很不錯喔！","z":["ㄏㄣˇ","ㄅㄨˋ","ㄘㄨㄛˋ","ㄛ",""]},"keep":{"t":"繼續加油！","z":["ㄐㄧˋ","ㄒㄩˋ","ㄐㄧㄚ","ㄧㄡˊ",""]},"again":{"t":"再練一次","z":["ㄗㄞˋ","ㄌㄧㄢˋ","ㄧ","ㄘˋ"]},"backM":{"t":"回算算芽","z":["ㄏㄨㄟˊ","ㄙㄨㄢˋ","ㄙㄨㄢˋ","ㄧㄚˊ"]},"hide":{"t":"遮住答案","z":["ㄓㄜ","ㄓㄨˋ","ㄉㄚˊ","ㄢˋ"]},"show":{"t":"看答案","z":["ㄎㄢˋ","ㄉㄚˊ","ㄢˋ"]},"pickN":{"t":"選一個數字","z":["ㄒㄩㄢˇ","ㄧ","ㄍㄜˋ","ㄕㄨˋ","ㄗˋ"]},"tapQ":{"t":"點一點看答案","z":["ㄉㄧㄢˇ","ㄧ","ㄉㄧㄢˇ","ㄎㄢˋ","ㄉㄚˊ","ㄢˋ"]}},"nUI":{"newsSt":{"t":"新聞芽","z":["ㄒㄧㄣ","ㄨㄣˊ","ㄧㄚˊ"]},"newsSub":{"t":"每週新聞，看懂世界","z":["ㄇㄟˇ","ㄓㄡ","ㄒㄧㄣ","ㄨㄣˊ","","ㄎㄢˋ","ㄉㄨㄥˇ","ㄕˋ","ㄐㄧㄝˋ"]},"tin":{"t":"國內","z":["ㄍㄨㄛˊ","ㄋㄟˋ"]},"tout":{"t":"國外","z":["ㄍㄨㄛˊ","ㄨㄞˋ"]},"week":{"t":"這週的新聞","z":["ㄓㄜˋ","ㄓㄡ","ㄉㄜ˙","ㄒㄧㄣ","ㄨㄣˊ"]},"rel":{"t":"跟我有什麼關係？","z":["ㄍㄣ","ㄨㄛˇ","ㄧㄡˇ","ㄕㄣˊ","ㄇㄜ˙","ㄍㄨㄢ","ㄒㄧˋ",""]},"talk":{"t":"親子討論題","z":["ㄑㄧㄣ","ㄗˇ","ㄊㄠˇ","ㄌㄨㄣˋ","ㄊㄧˊ"]},"src":{"t":"看原新聞","z":["ㄎㄢˋ","ㄩㄢˊ","ㄒㄧㄣ","ㄨㄣˊ"]},"empty":{"t":"新聞還在準備中，晚點再來看看。","z":["ㄒㄧㄣ","ㄨㄣˊ","ㄏㄞˊ","ㄗㄞˋ","ㄓㄨㄣˇ","ㄅㄟˋ","ㄓㄨㄥ","","ㄨㄢˇ","ㄉㄧㄢˇ","ㄗㄞˋ","ㄌㄞˊ","ㄎㄢˋ","ㄎㄢ˙",""]},"nextN":{"t":"下一則","z":["ㄒㄧㄚˋ","ㄧ","ㄗㄜˊ"]},"backL":{"t":"回新聞列表","z":["ㄏㄨㄟˊ","ㄒㄧㄣ","ㄨㄣˊ","ㄌㄧㄝˋ","ㄅㄧㄠˇ"]}},"siteName":{"t":"芽芽學堂","z":["ㄧㄚˊ","ㄧㄚˊ","ㄒㄩㄝˊ","ㄊㄤˊ"]},"readSub":{"t":"讀文章，做小測驗","z":["ㄉㄨˊ","ㄨㄣˊ","ㄓㄤ","","ㄗㄨㄛˋ","ㄒㄧㄠˇ","ㄘㄜˋ","ㄧㄢˋ"]},"vocabSub":{"t":"學單字，聽發音","z":["ㄒㄩㄝˊ","ㄉㄢ","ㄗˋ","","ㄊㄧㄥ","ㄈㄚ","ㄧㄣ"]},"soon":{"t":"更多小站，敬請期待","z":["ㄍㄥˋ","ㄉㄨㄛ","ㄒㄧㄠˇ","ㄓㄢˋ","","ㄐㄧㄥˋ","ㄑㄧㄥˇ","ㄑㄧ","ㄉㄞˋ"]},"vtoday":{"t":"今天的單字","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄉㄜ˙","ㄉㄢ","ㄗˋ"]},"vempty":{"t":"單字還沒準備好","z":["ㄉㄢ","ㄗˋ","ㄏㄞˊ","ㄇㄟˊ","ㄓㄨㄣˇ","ㄅㄟˋ","ㄏㄠˇ"]},"vOlder":{"t":"以前的單字","z":["ㄧˇ","ㄑㄧㄢˊ","ㄉㄜ˙","ㄉㄢ","ㄗˋ"]},"sayAll":{"t":"全部唸一遍","z":["ㄑㄩㄢˊ","ㄅㄨˋ","ㄋㄧㄢˋ","ㄧ","ㄅㄧㄢˋ"]},"exLbl":{"t":"例句","z":["ㄌㄧˋ","ㄐㄩˋ"]},"meanLbl":{"t":"意思","z":["ㄧˋ","ㄙ˙"]},"listenW":{"t":"聽發音","z":["ㄊㄧㄥ","ㄈㄚ","ㄧㄣ"]},"backW":{"t":"回單字頁","z":["ㄏㄨㄟˊ","ㄉㄢ","ㄗˋ","ㄧㄝˋ"]}};
const TONES = "ˊˇˋ";
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function zyChar(ch,z,mode){
  if(!z) return ch==="\\n" ? "<br>" : \`<span class="pu">\${esc(ch)}</span>\`;
  const neutral = z.includes("˙");
  let s = z.replace("˙","");
  let tone = "";
  if (TONES.includes(s.slice(-1))) { tone = s.slice(-1); s = s.slice(0,-1); }
  const syms = [...s];
  const n = Math.min(3, Math.max(1, syms.length));
  return \`<span class="c\${mode?" "+mode:""}"><span class="h">\${esc(ch)}</span><span class="b n\${n}" aria-hidden="true">\${neutral?'<span class="nt">˙</span>':''}\${syms.map(x=>\`<span class="s">\${x}</span>\`).join("")}\${tone?\`<span class="tn">\${tone}</span>\`:''}</span></span>\`;
}
const OPEN="「『（(《“";
function zy(o,hl,blank){
  if(!o) return "";
  if (typeof o.z==="string") o.z=o.z.split("|");
  const chars=[...o.t]; const units=[]; let pre="";
  let lat="";
  chars.forEach((c,i)=>{
    const z=o.z[i];
    if (!z && /[A-Za-z0-9'’\\-]/.test(c)) { lat += c; return; }
    if (lat) { units.push(pre + \`<span class="pu en">\${esc(lat)}</span>\`); pre=""; lat=""; }
    if (c==="\\n") { if(pre){units.push(pre);pre="";} units.push("<br>"); return; }
    if (!z && OPEN.includes(c)) { pre += zyChar(c,""); return; }
    if (!z && units.length && units[units.length-1]!=="<br>" && !pre) { units[units.length-1] += zyChar(c,""); return; }
    units.push(pre + (blank===i ? zyChar("□",z,"blank") : zyChar(c,z,hl&&c===hl?"hl":""))); pre="";
  });
  if (lat) units.push(pre + \`<span class="pu en">\${esc(lat)}</span>\`); else if (pre) units.push(pre);
  return \`<span class="zt" lang="zh-TW">\${units.map(u=>u==="<br>"?u:\`<span class="u">\${u}</span>\`).join("")}</span>\`;
}
function U(k){ return zy(UI[k]); }
const synth = ("speechSynthesis" in window) ? window.speechSynthesis : null;
let voice = null, voiceEn = null;
function pickVoice(){ if(!synth) return; const vs = synth.getVoices(); voice = vs.find(v=>/zh[-_]TW/i.test(v.lang)) || vs.find(v=>/zh/i.test(v.lang)) || null; voiceEn = vs.find(v=>/en[-_]US/i.test(v.lang)) || vs.find(v=>/^en/i.test(v.lang)) || null; }
if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
function plain(o){ return o.t.replace(/\\n/g,""); }
let UTTS = [];
function speakList(items, onEach, onEnd, lang){
  if(!synth) return;
  if (synth.speaking || synth.pending) synth.cancel();
  state.speaking = true;
  const en = lang==="en-US"; const rate = en ? (state.grade==="g1" ? 0.7 : 0.8) : (state.grade==="g1" ? 0.78 : 0.88);
  const last = items.length - 1;
  const finish = () => { if(!state.speaking) return; state.speaking=false; UTTS=[]; onEach && onEach(-1); onEnd && onEnd(); };
  UTTS = items.map((t,i)=>{
    const u = new SpeechSynthesisUtterance(t); u.lang = en ? "en-US" : "zh-TW"; u.rate = rate; const vv = en ? voiceEn : voice; if (vv) u.voice = vv;
    u.onstart = () => { if(state.speaking) onEach && onEach(i); };
    if (i===last) u.onend = finish;
    u.onerror = (e) => { if (e && (e.error==="interrupted"||e.error==="canceled")) return; finish(); };
    return u;
  });
  UTTS.forEach(u=>synth.speak(u));
}
function stopSpeak(){ state.speaking=false; if(synth) synth.cancel(); }
const SP = {"title":{"t":"我的小芽","z":["ㄨㄛˇ","ㄉㄜ˙","ㄒㄧㄠˇ","ㄧㄚˊ"]},"g1":{"t":"一年級","z":["ㄧ","ㄋㄧㄢˊ","ㄐㄧˊ"]},"g3":{"t":"三年級","z":["ㄙㄢ","ㄋㄧㄢˊ","ㄐㄧˊ"]},"s0":{"t":"小芽在睡覺","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄗㄞˋ","ㄕㄨㄟˋ","ㄐㄧㄠˋ"]},"s1":{"t":"小芽發芽了","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄈㄚ","ㄧㄚˊ","ㄌㄜ˙"]},"s2":{"t":"小芽長葉子了","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄓㄤˇ","ㄧㄝˋ","ㄗ˙","ㄌㄜ˙"]},"s3":{"t":"葉子變多了","z":["ㄧㄝˋ","ㄗ˙","ㄅㄧㄢˋ","ㄉㄨㄛ","ㄌㄜ˙"]},"s4":{"t":"長出花苞了","z":["ㄓㄤˇ","ㄔㄨ","ㄏㄨㄚ","ㄅㄠ","ㄌㄜ˙"]},"s5":{"t":"小芽開花了","z":["ㄒㄧㄠˇ","ㄧㄚˊ","ㄎㄞ","ㄏㄨㄚ","ㄌㄜ˙"]},"s6":{"t":"結出果實了","z":["ㄐㄧㄝˊ","ㄔㄨ","ㄍㄨㄛˇ","ㄕˊ","ㄌㄜ˙"]},"hint":{"t":"完成一個站，就能幫小芽澆水","z":["ㄨㄢˊ","ㄔㄥˊ","ㄧ","ㄍㄜˋ","ㄓㄢˋ","","ㄐㄧㄡˋ","ㄋㄥˊ","ㄅㄤ","ㄒㄧㄠˇ","ㄧㄚˊ","ㄐㄧㄠ","ㄕㄨㄟˇ"]},"wet":{"t":"今天澆過水了","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄐㄧㄠ","ㄍㄨㄛˋ","ㄕㄨㄟˇ","ㄌㄜ˙"]},"dry":{"t":"今天還沒澆水","z":["ㄐㄧㄣ","ㄊㄧㄢ","ㄏㄞˊ","ㄇㄟˊ","ㄐㄧㄠ","ㄕㄨㄟˇ"]},"fruit":{"t":"果實","z":["ㄍㄨㄛˇ","ㄕˊ"]},"got":{"t":"喝到水了","z":["ㄏㄜ","ㄉㄠˋ","ㄕㄨㄟˇ","ㄌㄜ˙"]},"harvest":{"t":"收成了一顆果實","z":["ㄕㄡ","ㄔㄥˊ","ㄌㄜ˙","ㄧ","ㄎㄜ","ㄍㄨㄛˇ","ㄕˊ"]},"pre":{"t":"已澆水","z":["ㄧˇ","ㄐㄧㄠ","ㄕㄨㄟˇ"]},"day":{"t":"天","z":["ㄊㄧㄢ"]},"sprout":{"t":"小芽","z":["ㄒㄧㄠˇ","ㄧㄚˊ"]}};
function water(){
  const u = state.user; if (!u || state.watering) return;
  if ((state.sprout||{}).last===mathDate()) return;
  state.watering = true;
  api("/api/water",{uid:u.id}).then(r=>r.ok?r.json():null).then(j=>{
    if (j && state.user && state.user.id===u.id) { state.sprout = {n:j.n,last:j.last}; if (j.watered) { state.toast = {harvest:j.n%21===0}; spToast(); if (state.view==="hub") render(); } }
  }).catch(()=>{}).finally(()=>{ state.watering = false; });
}
function spToast(){
  const t = state.toast; if (!t) return; state.toast = null;
  const el = document.createElement("div"); el.className = "sptoast";
  el.innerHTML = \`<span aria-hidden="true">💧</span>\${t.harvest ? zy(SP.harvest) : zy(SP.sprout)+zy(SP.got)}\`;
  document.body.appendChild(el); setTimeout(()=>el.remove(), 3400);
}
function mathDate(){ return new Date(Date.now()+8*3600000).toISOString().slice(0,10).replace(/-/g,""); }
function mseed(s){ let h=2166136261; for (const c of s){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; }
function mrng(seed){ let a=seed>>>0; return ()=>{ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function markSVG(ok){ return ok ? \`<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="25" transform="rotate(-80 32 32)"/></svg>\`
                                 : \`<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 14 L50 50 M50 14 L14 50"/></svg>\`; }
const STROKES = {};
function loadStrokes(c){
  const cp = c.codePointAt(0).toString(16);
  if (!STROKES[cp]) STROKES[cp] = fetch(\`https://raw.githubusercontent.com/g0v/zh-stroke-data/master/json/\${cp}.json\`).then(r=>{ if(!r.ok) throw new Error(r.status); return r.json(); }).catch(e=>{ delete STROKES[cp]; throw e; });
  return STROKES[cp];
}
function outlinePath(o){ return o.map(s=> s.type==="M" ? \`M\${s.x} \${s.y}\` : s.type==="L" ? \`L\${s.x} \${s.y}\` : \`Q\${s.begin.x} \${s.begin.y} \${s.end.x} \${s.end.y}\`).join("")+"Z"; }
function strokeSVG(data){
  let len = t=>{ let L=0; for(let i=1;i<t.length;i++) L+=Math.hypot(t[i].x-t[i-1].x, t[i].y-t[i-1].y); return Math.ceil(L)+10; };
  let defs="", base="", ink="", nums="", t0=0.2;
  data.forEach((st,i)=>{
    const d = outlinePath(st.outline), tr = st.track, L = len(tr), dur = Math.max(.35, Math.min(.9, L/2400));
    const track = tr.map((p,j)=>(j?"L":"M")+p.x+" "+p.y).join("");
    defs += \`<clipPath id="skc\${i}"><path d="\${d}"/></clipPath>\`;
    base += \`<path class="skbase" d="\${d}"/>\`;
    ink += \`<path class="sk" clip-path="url(#skc\${i})" d="\${track}" stroke-dasharray="\${L}" stroke-dashoffset="\${L}" data-L="\${L}" data-dur="\${dur.toFixed(2)}" data-del="\${t0.toFixed(2)}"/>\`;
    nums += \`<text class="skn" x="\${tr[0].x-40}" y="\${tr[0].y-30}" data-del="\${t0.toFixed(2)}">\${i+1}</text>\`;
    t0 += dur + .2;
  });
  return \`<svg viewBox="0 0 2048 2048" aria-hidden="true"><defs>\${defs}</defs>\${base}\${ink}\${nums}</svg>\`;
}
function playStrokes(box){
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paths = [...box.querySelectorAll(".sk")], nums = [...box.querySelectorAll(".skn")];
  if (reduce) { paths.forEach(p=>p.setAttribute("stroke-dashoffset","0")); nums.forEach(n=>n.classList.add("on")); return; }
  void box.offsetWidth;
  paths.forEach(p=>{ p.style.transition = \`stroke-dashoffset \${p.dataset.dur}s linear \${p.dataset.del}s\`; p.setAttribute("stroke-dashoffset","0"); p.style.strokeDashoffset = "0"; });
  nums.forEach(n=>setTimeout(()=>n.classList.add("on"), Number(n.dataset.del)*1000));
}
function stripHTML(data){
  const ds = data.map(st=>outlinePath(st.outline));
  return ds.map((d,i)=>{
    const fut = ds.slice(i+1).map(x=>\`<path class="sf" d="\${x}"/>\`).join("");
    const past = ds.slice(0,i).map(x=>\`<path class="sp" d="\${x}"/>\`).join("");
    return \`<div class="scell"><svg viewBox="0 0 2048 2048" aria-hidden="true">\${fut}\${past}<path class="sc" d="\${d}"/></svg><span>\${i+1}</span></div>\`;
  }).join("");
}
`;
