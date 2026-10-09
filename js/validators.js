/* Bộ chấm bài: kiểm tra bằng DOM, trả về {passed, errors[], checks[]}.
   Mỗi check = {id, ok, label, hint}. Học sinh gõ HTML, hệ thống đọc cấu trúc và thuộc tính style. */
const Validators=(()=>{
 const parseHTML=html=>new DOMParser().parseFromString(html,'text/html');
 const chk=(id,ok,label,hint)=>({id,ok:!!ok,label,hint});
 const result=checks=>({passed:checks.every(c=>c.ok),errors:checks.filter(c=>!c.ok).map(c=>c.hint),checks});
 const norm=s=>String(s??'').replace(/\s+/g,' ').trim().toLowerCase();
 const text=el=>norm(el.textContent);
 const has=(el,s)=>text(el).includes(norm(s));
 const q=(d,sel)=>[...d.querySelectorAll(sel)];
 // Phần tử có chứa đoạn chữ s
 const withText=(d,sel,s)=>q(d,sel).filter(e=>has(e,s));
 // Đổi tên màu / hex / rgb về dạng rgb(...) để so sánh; null nếu không hợp lệ
 const colorOf=v=>{
  v=String(v||'').trim();if(!v)return null;
  const e=document.createElement('span');e.style.color=v;if(!e.style.color)return null;
  document.body.appendChild(e);const c=getComputedStyle(e).color;e.remove();return c;
 };
 // Màu cụ thể: viết bằng mã hex hoặc rgb()/hsl(), không phải tên màu tiếng Anh
 const isConcreteColor=v=>/^(#[0-9a-f]{3,8}|rgba?\(|hsla?\()/i.test(String(v||'').trim());
 const styleOf=(el,prop)=>(el.style&&el.style.getPropertyValue(prop)||'').trim();
 // Giá trị viết trong thuộc tính style (đọc đúng chữ học sinh gõ, không để trình duyệt tự đoán, ví dụ tự thêm px)
 const declOf=(el,prop)=>{for(const part of (el.getAttribute('style')||'').split(';')){const i=part.indexOf(':');if(i>0&&part.slice(0,i).trim().toLowerCase()===prop)return part.slice(i+1).trim()}return ''};
 // Số thẻ br nằm trong phần tử
 const brIn=el=>el.querySelectorAll('br').length;
 return {parseHTML,chk,result,norm,text,has,q,withText,colorOf,isConcreteColor,styleOf,declOf,brIn};
})();
