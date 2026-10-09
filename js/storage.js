const Util = {
 esc:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 debounce:(fn,ms=250)=>{let t;return(...args)=>{clearTimeout(t);t=setTimeout(()=>fn(...args),ms)}},
 id:v=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').replace(/[^a-z0-9]/gi,''),
 toast(message){const el=document.querySelector('#toast');if(el){el.textContent=message;el.classList.add('show');clearTimeout(this.timer);this.timer=setTimeout(()=>el.classList.remove('show'),4500)}},
 download(name,text,type='text/html'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
};
const Store={key:`html-learning-${LESSON.id}::state-v2`,read(){try{return JSON.parse(localStorage.getItem(this.key))}catch{return null}},write(state){try{localStorage.setItem(this.key,JSON.stringify(state));document.querySelector('#save-status').textContent='Đã lưu trên máy'}catch{Util.toast('Không thể lưu trên máy. Em hãy tải bản sao trước khi đóng trang.')}},saveCode(id,code){try{localStorage.setItem(`html-learning-${LESSON.id}::${App.state.studentId}-${id}`,code)}catch{}}};
