/* Trình soạn mã (textarea + số dòng) và khung xem trước an toàn.
   Mã học sinh luôn được lọc rồi mới đưa vào iframe sandbox (không chạy script). */
const Editor={
 // Hộp thoại cảnh báo: trả về Promise<true> nếu học sinh đồng ý, false nếu hủy
 confirm({title,message,ok='Đồng ý',cancel='Hủy'}){
  return new Promise(resolve=>{
   const d=document.createElement('dialog');d.className='confirm-dialog';
   d.innerHTML=`<h3>⚠️ ${Util.esc(title)}</h3><p>${Util.esc(message)}</p><div class="actions"><button type="button" class="danger-fill" data-ok>${Util.esc(ok)}</button><button type="button" class="secondary" data-cancel>${Util.esc(cancel)}</button></div>`;
   document.body.append(d);
   const close=v=>{d.close();d.remove();resolve(v)};
   d.querySelector('[data-ok]').onclick=()=>close(true);
   d.querySelector('[data-cancel]').onclick=()=>close(false);
   d.addEventListener('cancel',e=>{e.preventDefault();close(false)});
   d.showModal();d.querySelector('[data-cancel]').focus();
  });
 },
 // Đặt lại khung soạn mã về nội dung ban đầu sau khi học sinh đồng ý
 async reset(textarea,original,what){
  if(textarea.value===original){Util.toast('Mã đang giống ban đầu rồi.');return false}
  const ok=await this.confirm({title:'Đặt lại mã ban đầu?',message:`Toàn bộ phần mã em đã viết ở ${what} sẽ bị xóa và quay về ${original?'mã ban đầu':'khung trống'}. Việc này không hoàn tác được.`,ok:'Đặt lại',cancel:'Giữ bài làm'});
  if(!ok)return false;
  textarea.value=original;textarea.dispatchEvent(new Event('input'));textarea.focus();
  Util.toast('Đã đặt lại về '+(original?'mã ban đầu':'khung trống'));
  return true;
 },
 mount(textarea,record,onChange){
  const stats=record.typingStats||(record.typingStats={keyCount:0,changeCount:0,charsTyped:0,pasteCount:0,firstInputAt:null,lastInputAt:null});
  let old=textarea.value;
  const numberLines=()=>{const lines=document.querySelector('.lines');if(lines)lines.textContent=Array.from({length:textarea.value.split('\n').length},(_,i)=>i+1).join('\n')};
  textarea.addEventListener('keydown',e=>{
   stats.keyCount++;
   if(e.key==='Tab'){e.preventDefault();textarea.setRangeText('  ',textarea.selectionStart,textarea.selectionEnd,'end');textarea.dispatchEvent(new Event('input'))}
  });
  textarea.addEventListener('paste',()=>{stats.pasteCount++});
  textarea.addEventListener('input',()=>{
   const now=new Date().toISOString();
   stats.firstInputAt??=now;stats.lastInputAt=now;stats.changeCount++;
   stats.charsTyped+=Math.max(0,textarea.value.length-old.length);old=textarea.value;
   numberLines();onChange();
  });
  numberLines();
 }
};

const Preview={
 // Chỉ giữ các thuộc tính CSS định dạng chữ/khối; loại url(), expression, @import...
 SAFE_PROPS:/^(color|background(-color)?|font(-family|-size|-style|-weight|-variant)?|text-(align|decoration|transform|indent|shadow)|line-height|letter-spacing|word-spacing|margin(-\w+)?|padding(-\w+)?|border(-\w+)?|width|max-width|height|display|opacity)$/,
 cleanStyle(text){
  return String(text||'').split(';').map(d=>d.trim()).filter(Boolean).map(d=>{
   const i=d.indexOf(':');if(i<1)return '';
   const prop=d.slice(0,i).trim().toLowerCase(),value=d.slice(i+1).trim();
   if(!this.SAFE_PROPS.test(prop))return '';
   if(/url\(|expression|javascript|@|\\|<|>|var\(/i.test(value))return '';
   return prop+':'+value;
  }).filter(Boolean).join(';');
 },
 sanitize(html){
  const d=Validators.parseHTML(html);
  d.querySelectorAll('script,base,meta,link,iframe,object,embed,form,style,svg,math,img,video,audio,source,input,button,textarea,select').forEach(el=>el.remove());
  d.querySelectorAll('*').forEach(el=>{
   [...el.attributes].forEach(a=>{
    if(a.name==='style'){const s=this.cleanStyle(a.value);s?el.setAttribute('style',s):el.removeAttribute('style')}
    else if(!['class','id','title','lang'].includes(a.name))el.removeAttribute(a.name);
   });
  });
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><style>body{font:16px/1.6 Arial,Helvetica,sans-serif;padding:18px;color:#1d1b2e;margin:0}h1,h2,h3,h4,h5,h6{margin:.6em 0 .35em}p{margin:.75em 0}hr{border:0;border-top:1px solid #bbb}</style></head><body>${d.body.innerHTML}</body></html>`;
 },
 update(frame,html){if(frame)frame.srcdoc=this.sanitize(html)}
};
