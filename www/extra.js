(function(){
const BUILD=11,R='https://raw.githubusercontent.com/zarzouramahmoudabdo-commits/survey-levels-pro/main/www/';
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
const cv=document.createElement('div');cv.className='card';
cv.innerHTML=`<h2>🔁 تحويل معماري ← مساحي</h2>
<div class="row"><span>منسوب ±0.00 المعماري (مساحي)</span><input id="z0" type="number" step="any" inputmode="decimal"></div>
<div class="row"><span>سمك التشطيبات (مم)</span><input id="fin" type="number" inputmode="decimal"></div>
<div class="row"><span>منسوب معماري (م)</span><input id="ar" type="number" step="any" inputmode="decimal"></div>
<div>مساحي (وش التشطيب): <b id="cv1">—</b></div>
<div>مساحي (وش الخرسانة): <b id="cv2">—</b></div>
<div class="wrap" id="cvl" style="margin-top:8px"></div>`;
document.body.appendChild(cv);
try{$('z0').value=localStorage.z0||'';$('fin').value=localStorage.fin||'';}catch(e){}
function conv(){
  const z=parseFloat($('z0').value),fn=(parseFloat($('fin').value)||0)/1000,a=parseFloat($('ar').value);
  try{localStorage.z0=$('z0').value;localStorage.fin=$('fin').value;}catch(e){}
  $('cv1').textContent=f(z+a);$('cv2').textContent=f(z+a-fn);
  const L=$('cvl');
  if(!isFinite(z)||typeof S==='undefined'||!S){L.innerHTML='';return;}
  const t=v=>(z+v/1000).toFixed(3);
  L.innerHTML='<table><tr><th>العنصر</th><th>على اللوحة</th><th>مساحي</th></tr>'+
    S.levels.map(([v])=>`<tr><td>T.O.C</td><td class="b">${fm(v)}</td><td class="b">${t(v)}</td></tr>`).join('')+
    (S.secs||[]).map(s=>`<tr><td class="b">${sh(s.tag)} ${s.w}×${s.d}</td><td class="b">${fm(s.sel)} / ${fm(s.sel-s.d)}</td><td class="b">${t(s.sel)} / ${t(s.sel-s.d)}</td></tr>`).join('')+'</table>';
}
cv.oninput=conv;
const _r2=render;render=function(){_r2();conv();};
function nm(s){
  return s.replace(/\n/g,' ')
   .replace(/\bT\s*[.,:]?\s*[0O]\s*[.,:]?\s*[CG]\b\.?/gi,'T.O.C')
   .replace(/T\.O\.C\s*\+?\s*(\d{4})/g,'$1 T.O.C')
   .replace(/(?:SLAB|FLOOR)\s*(\d{3})\s*THK\.?/gi,'SLAB THK.$1MM')
   .replace(/\b(\d{3})\s*MM\s*\+?\s*(\d{4})\b/gi,(m,t,l)=>t+' mm +'+(l/1000).toFixed(3)+'m')
   .replace(/\b([A-Z]\d{2})\s*[-:._]?\s*[E£]\s*B\s*[-:._]?\s*(\d{3})/g,'$1-EB-$2').trim();
}
const ob=document.createElement('div');
ob.innerHTML='<div class="row"><button class="btn" id="ocr">🔍 قراءة بالـOCR</button><select id="rot"><option value="90">لف يمين 90°</option><option value="0">بدون لف</option><option value="270">لف شمال 90°</option></select></div><div class="mu">للوحات اللي نصوصها خطوط. بياخد كام دقيقة وبيحتاج إنترنت.</div>';
$('st').after(ob);
$('file').addEventListener('change',e=>{window._f=e.target.files[0]});
$('ocr').onclick=async()=>{
  const st=$('st'),K=6;
  if(!window._f){alert('اختر ملف PDF الأول');return;}
  try{
    st.textContent='تحميل محرك OCR...';
    if(!window.Tesseract)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
    const w=await Tesseract.createWorker('eng');
    await w.setParameters({tessedit_pageseg_mode:'11'});
    const idx=+$('pg').value||0;
    const pdf=await pdfjsLib.getDocument({data:await window._f.arrayBuffer()}).promise;
    const pg=await pdf.getPage(idx+1);
    const vp=pg.getViewport({scale:K,rotation:(pg.rotate+(+$('rot').value))%360});
    const W=Math.ceil(vp.width),H=Math.ceil(vp.height),T=2000,O=150;
    const cv=document.createElement('canvas'),items=[],nx=Math.ceil(W/T),ny=Math.ceil(H/T);let n=0;
    for(let r=0;r<ny;r++)for(let c=0;c<nx;c++){
      n++;st.textContent=`OCR جزء ${n}/${nx*ny} ...`;
      const tx=Math.max(0,c*T-O),ty=Math.max(0,r*T-O);
      cv.width=Math.min(W-tx,T+2*O);cv.height=Math.min(H-ty,T+2*O);
      const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);
      await pg.render({canvasContext:g,viewport:vp,transform:[1,0,0,1,-tx,-ty]}).promise;
      const {data}=await w.recognize(cv);
      for(const l of data.lines){
        const s=nm(l.text);if(s.length<2)continue;
        const x=(tx+l.bbox.x0)/K,y=(H-(ty+l.bbox.y1))/K;
        if(items.some(i=>i.s===s&&Math.abs(i.x-x)<3&&Math.abs(i.y-y)<3))continue;
        items.push({s,x,y,a:0,h:(l.bbox.y1-l.bbox.y0)/K});
      }
    }
    await w.terminate();
    pages[idx]={items,score:items.filter(t=>/T\.?O\.?C/i.test(t.s)).length};
    analyze(idx);
  }catch(e){st.textContent='تعذر OCR: '+(e.message||e)}
};
const _an=analyze;
analyze=function(i){
  const P=pages[i];
  P.items.forEach(t=>{t.s=t.s.replace(/T\.?O\.?C\.?\s*\(?\s*\+?(\d\.\d{2,3})\s*\)?/gi,(m,v)=>Math.round(v*1000)+' T.O.C')});
  _an(i);
  if(!S||S.beams.length)return;
  const toc=[],bs=[],n={},first={};
  P.items.forEach(t=>{const m=t.s.match(/^(\d{3,4}) T\.O\.C$/);if(m)toc.push({v:+m[1],x:t.x,y:t.y})});
  P.items.forEach(t=>{
    const m=t.s.match(/^\s*(?:\d+\s+)?(B\w*)\s*\(\s*(\d{2,4})\s*[xX×]\s*(\d{2,4})\s*\)/);
    if(!m)return;
    const z=m[2]+'x'+m[3],ty=m[1];first[ty]=first[ty]||z;n[ty]=(n[ty]||0)+1;
    const c=toc.length?toc.reduce((b,c)=>Math.hypot(c.x-t.x,c.y-t.y)<Math.hypot(b.x-t.x,b.y-t.y)?c:b):null;
    bs.push({mark:ty+'#'+n[ty],tag:ty+(first[ty]===z?'':"'"),found:c?[c.v]:[],sel:c?c.v:null,w:+m[2],d:+m[3]});
  });
  if(bs.length){S.beams=bs;render();}
};
nm=function(s){
  return s.replace(/\n/g,' ')
   .replace(/(?<![A-Za-z])T\s*[.,:]?\s*[0O]\s*[.,:]?\s*[CG]\b\.?/gi,'T.O.C')
   .replace(/T\.O\.C\s*\+?\s*(\d{4})/g,'$1 T.O.C')
   .replace(/(?:SLAB|FLOOR)\s*THK\.?\s*(\d{2,3})\s*MM/gi,'SLAB THK.$1MM')
   .replace(/(?:SLAB|FLOOR)\s*(\d{3})\s*THK\.?/gi,'SLAB THK.$1MM')
   .replace(/\b(\d{3})\s*MM\s*\+?\s*(\d{4})\b/gi,(m,t,l)=>t+' mm +'+(l/1000).toFixed(3)+'m')
   .replace(/\b([A-Z]\d{2})\s*[-:._]?\s*[E£]\s*B\s*[-:._]?\s*(\d{3})/g,'$1-EB-$2').trim();
};
$('ocr').onclick=async()=>{
  const st=$('st');
  if(!window._f){alert('اختر ملف PDF الأول');return;}
  try{
    st.textContent='تحميل محرك OCR...';
    if(!window.Tesseract)await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
    const w=await Tesseract.createWorker('eng');
    await w.setParameters({tessedit_pageseg_mode:'11'});
    const idx=+$('pg').value||0;
    const pdf=await pdfjsLib.getDocument({data:await window._f.arrayBuffer()}).promise;
    const pg=await pdf.getPage(idx+1);
    const v0=pg.getViewport({scale:1}),land=v0.width>v0.height;
    const K=Math.min(6,6000/Math.max(v0.width,v0.height));
    const vp=pg.getViewport({scale:K,rotation:(pg.rotate+(land?0:+$('rot').value))%360});
    const W=Math.ceil(vp.width),H=Math.ceil(vp.height),T=2000,O=150;
    const cv=document.createElement('canvas'),items=[],nx=Math.ceil(W/T),ny=Math.ceil(H/T);let n=0;
    for(let r=0;r<ny;r++)for(let c=0;c<nx;c++){
      n++;st.textContent=`OCR جزء ${n}/${nx*ny} ...`;
      const tx=Math.max(0,c*T-O),ty=Math.max(0,r*T-O);
      cv.width=Math.min(W-tx,T+2*O);cv.height=Math.min(H-ty,T+2*O);
      const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);
      await pg.render({canvasContext:g,viewport:vp,transform:[1,0,0,1,-tx,-ty]}).promise;
      const {data}=await w.recognize(cv);
      for(const l of data.lines){
        const s=nm(l.text);if(s.length<2)continue;
        const x=(tx+l.bbox.x0)/K,y=(H-(ty+l.bbox.y1))/K;
        if(items.some(i=>i.s===s&&Math.abs(i.x-x)<3&&Math.abs(i.y-y)<3))continue;
        items.push({s,x,y,a:0});
      }
    }
    await w.terminate();
    pages[idx]={items,score:items.filter(t=>/T\.?O\.?C/i.test(t.s)).length};
    analyze(idx);
    st.textContent='🔍 قراءة OCR — الأرقام تقريبية، راجعها على اللوحة. '+st.textContent;
  }catch(e){st.textContent='تعذر OCR: '+(e.message||e)}
};
})();
