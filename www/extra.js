(function(){
const BUILD=2,R='https://raw.githubusercontent.com/zarzouramahmoudabdo-commits/survey-levels-pro/main/www/';
const st=localStorage.getItem('app_html'),m=st&&st.match(/BUILD=(\d+)/);
if(m&&+m[1]>BUILD&&!sessionStorage.w){sessionStorage.w=1;document.open();document.write(st);document.close();return;}
const $=id=>document.getElementById(id);
document.head.insertAdjacentHTML('beforeend','<style>@media print{.card:not(#secs){display:none}}.row{display:flex;gap:6px;margin:6px 0;align-items:center}.row input{flex:1;min-width:0;padding:8px;font-size:15px;border-radius:8px;border:1px solid var(--bd);background:var(--card);color:var(--tx)}</style>');
document.querySelector('h1').insertAdjacentHTML('beforeend',' <button class="btn" id="up" style="padding:4px 10px">🔄</button>');
const w=document.createElement('div');
w.innerHTML=`<div class="card" id="secs" style="display:none"><h2>📏 القطاعات</h2><div id="sg"></div><button class="btn" onclick="print()">🖨️ طباعة / PDF</button></div>
<div class="card"><h2>🧮 حاسبة الميزانية</h2>
<div class="row"><span>منسوب BM</span><input id="c1" type="number" step="any" inputmode="decimal"></div>
<div class="row"><span>قراءة خلفية BS</span><input id="c2" type="number" step="any" inputmode="decimal"></div>
<div class="row"><span>المنسوب التصميمي</span><input id="c3" type="number" step="any" inputmode="decimal"></div>
<div class="row"><span>قراءة الأرض</span><input id="c4" type="number" step="any" inputmode="decimal"></div>
<div>منسوب الجهاز HI: <b id="o1">—</b></div>
<div>القراءة المطلوبة: <b id="o2">—</b></div>
<div>النتيجة: <b id="o3">—</b></div></div>`;
document.body.appendChild(w);
const g=id=>parseFloat($(id).value),f=v=>isFinite(v)?v.toFixed(3):'—';
w.oninput=()=>{
  const hi=g('c1')+g('c2'),rq=hi-g('c3'),df=g('c4')-rq;
  $('o1').textContent=f(hi);$('o2').textContent=f(rq);
  $('o3').textContent=isFinite(df)?(df>0?'ردم ':'قطع ')+Math.abs(df).toFixed(3)+' م':'—';
};
function sec(b){
  const k=.2,W=1400,t=(S.slabs.find(s=>s.top===b.sel)||{t:150}).t,w=W*k,h=b.d*k,x=10,y=15,c=x+w/2,bw=b.w*k;
  const L=[[0,b.sel],[t,b.sel-t],[b.d,b.sel-b.d]];
  return `<svg viewBox="0 0 ${w+110} ${h+40}" width="320" style="direction:ltr"><g fill="rgba(11,107,203,.3)" stroke="currentColor"><rect x="${x}" y="${y}" width="${w}" height="${t*k}"/><rect x="${c-bw/2}" y="${y}" width="${bw}" height="${h}"/></g><g font-size="11" fill="currentColor" stroke="currentColor" stroke-dasharray="3">${L.map(([d,v])=>`<line x1="${x}" x2="${x+w+6}" y1="${y+d*k}" y2="${y+d*k}" stroke-width=".5"/><text x="${x+w+8}" y="${y+d*k+4}" stroke="none">${fm(v)}</text>`).join('')}</g><text x="${c}" y="${y+h+14}" font-size="11" text-anchor="middle" fill="currentColor">${b.w}</text></svg>`;
}
function draw(){
  const bs=(S.secs||S.beams).filter(b=>b.sel!=null&&b.d);
  $('secs').style.display=bs.length?'block':'none';
  $('sg').innerHTML=bs.map(b=>`<div style="display:inline-block;margin:4px;text-align:center"><b>${b.tag.replace(/^.*-EB-/,'EB-')} (${b.w}×${b.d})</b><br>${sec(b)}</div>`).join('');
}
const _r=render;render=function(){_r();draw();};
$('up').onclick=async()=>{
  const b=$('up');b.textContent='⏳';
  try{
    const [h,x]=await Promise.all(['index.html','extra.js'].map(n=>fetch(R+n+'?t='+Date.now()).then(r=>{if(!r.ok)throw 0;return r.text()})));
    if(+x.match(/BUILD=(\d+)/)[1]<=BUILD){b.textContent='🔄';alert('أنت على أحدث نسخة');return;}
    localStorage.setItem('app_html',h.replace('<script src="extra.js"><\/script>','<script>'+x+'<\/script>'));
    location.reload();
  }catch(e){b.textContent='🔄';alert('تعذر التحديث، تأكد من الإنترنت');}
};
})();
