/* Điều phối toàn bộ ứng dụng: trạng thái, điều hướng theo hash, các màn hình, nộp bài. */
const STAGES=['home','warmup','learning','practice','final'];
const App={
 state:null,submitting:false,
 fresh(){return {student:null,studentId:null,warmupDone:false,learning:[],practice:[],final:{code:'',requirements:{}},part1SubmittedAt:null,finalSubmittedAt:null}},
 save(){Store.write(this.state)},
 tasks(kind){return kind==='learning'?Learning.activities:Practice.activities},
 passed(kind,task){return !!this.state[kind].find(r=>r.activityId===task.id)?.passed},
 completed(kind){return this.tasks(kind).every(t=>this.passed(kind,t))},
 availableIndex(kind){const tasks=this.tasks(kind),first=tasks.findIndex(t=>!this.passed(kind,t));return first<0?tasks.length-1:first},
 frontier(){
  if(!this.state.student)return 'home';
  if(!this.state.warmupDone)return 'warmup';
  if(!this.completed('learning'))return 'learning';
  if(!this.completed('practice'))return 'practice';
  return 'final';
 },
 canAccess(stage){return STAGES.indexOf(stage)<=STAGES.indexOf(this.frontier())},
 // Khi tải lại trang: chấm lại mã đã lưu, bài nào không còn đạt thì khóa các bài sau
 verifyState(){
  let previous=true;
  for(const kind of ['learning','practice']){
   for(const task of this.tasks(kind)){
    const r=this.state[kind].find(x=>x.activityId===task.id);
    if(r){r.passed=previous&&r.passed&&task.validate(r.studentCode||'').passed;previous=r.passed}else previous=false;
   }
  }
 },
 // Sửa lại một bài thì các bài sau phải làm lại; phần nộp cũ không còn đúng
 invalidateAfter(kind,index){
  this.tasks(kind).slice(index+1).forEach(t=>{const r=this.state[kind].find(x=>x.activityId===t.id);if(r)r.passed=false});
  if(kind==='learning')this.state.practice.forEach(r=>r.passed=false);
  this.state.part1SubmittedAt=null;this.state.finalSubmittedAt=null;this.nav();
 },
 nav(){
  const stage=(location.hash.slice(1)||'home').split('/')[0];
  const items=[['home','Tổng quan'],['warmup','Khởi động'],['learning','Hình thành kiến thức'],['practice','Luyện tập'],['final','Vận dụng']];
  document.querySelector('#steps').innerHTML=items.map(([s,label],i)=>`<a href="#${s}" class="${stage===s?'active':''} ${this.canAccess(s)?'':'locked'}" ${stage===s?'aria-current="step"':''}><span class="num">${this.canAccess(s)?String(i).padStart(2,'0'):'·'}</span>${label}</a>`).join('');
  document.querySelector('#student-badge').innerHTML=this.state.student?`<strong>${Util.esc(this.state.student.name)}</strong><br>${Util.esc(this.state.student.className)}<br><button id="switch-student" class="secondary">Đổi học sinh / nhóm</button>`:'';
  document.querySelector('#switch-student')?.addEventListener('click',()=>{
   if(confirm('Đổi học sinh sẽ bắt đầu lượt học mới trên máy này. Hãy tải bản sao nếu cần giữ bài chưa nộp. Tiếp tục?')){
    Util.download('bai-8-ban-sao.json',JSON.stringify(this.state,null,2),'application/json');
    this.state=this.fresh();this.save();location.hash='home';this.route();
   }
  });
 },
 route(){
  let [stage,index]=location.hash.slice(1).split('/');stage=stage||'home';
  if(!STAGES.includes(stage)||!this.canAccess(stage)){
   const next=this.frontier();
   if(stage!==next)Util.toast('Em hãy làm xong bài hiện tại trước khi sang phần tiếp theo nhé.');
   location.hash=next;return;
  }
  this.nav();window.scrollTo(0,0);
  if(stage==='home')this.home();
  if(stage==='warmup')this.warmup();
  if(stage==='learning'||stage==='practice'){
   if(index===undefined&&this.completed(stage)){this.renderStageDone(stage);return}
   const i=Math.max(0,Math.min(Number.parseInt(index,10)||0,this.availableIndex(stage)));
   (stage==='learning'?Learning:Practice).render(i);
  }
  if(stage==='final')Final.render();
 },

 /* ---------- Trang chủ ---------- */
 home(){
  const s=this.state.student;
  document.querySelector('#main').innerHTML=`<section class="hero"><div class="hero-text"><span class="tag">TIN HỌC 12 · BÀI 8</span>
<h1>Biến chữ thô thành <em>trang đẹp</em>.</h1>
<p>Cùng một nội dung, nhưng cách trình bày khác nhau thì người đọc cảm nhận rất khác. Trong bài này, em học các thẻ HTML để định dạng văn bản: tiêu đề, đoạn văn, chữ đậm, màu sắc, phông chữ…</p>
<a href="#join" onclick="document.querySelector('#join').scrollIntoView({behavior:'smooth'});return false" class="hero-link">Bắt đầu bên dưới ↓</a></div>
<div class="hero-art" aria-hidden="true"><div class="art-card back"><b>Vội vàng</b><span>Tôi muốn tắt nắng đi cho màu đừng nhạt mất tôi muốn buộc gió lại cho hương đừng bay đi</span></div><div class="art-card front"><h3>Vội vàng</h3><hr><p>Tôi muốn <mark>tắt nắng</mark> đi<br>Cho màu đừng nhạt mất;<br>Tôi muốn buộc gió lại<br>Cho hương đừng bay đi.</p></div><span class="art-aa">Aa</span></div></section>
<div class="section-head"><h2>Bốn bước của bài học</h2><span class="muted">Học bằng cách tự viết mã</span></div>
<section class="journey"><article class="step-1"><span>BƯỚC 1</span><h3>So sánh hai văn bản</h3><p>Em nhận ra văn bản nào đẹp hơn và gọi tên các thành phần của văn bản.</p></article><article class="step-2"><span>BƯỚC 2</span><h3>Học các thẻ định dạng</h3><p>6 bài: style, tiêu đề, đoạn văn, nhấn mạnh, số mũ và màu phông chữ.</p></article><article class="step-3"><span>BƯỚC 3</span><h3>Luyện tập</h3><p>Trình bày bài toán, làm tờ rơi và sửa lỗi định dạng. Nộp phần 1.</p></article><article class="step-4"><span>BƯỚC 4</span><h3>Vận dụng</h3><p>Làm tấm thiệp ca dao với màu lấy từ bức tranh.</p></article></section>
<section class="panel" id="join"><h3>${s?'Chào mừng em quay lại':'Sẵn sàng chưa?'}</h3>${s?`<p>${Util.esc(s.name)} · ${Util.esc(s.className)}: tiến độ và mã của em vẫn ở đây.</p><button id="continue">Tiếp tục học →</button>`:`<form id="join-form" class="join"><label>Họ tên học sinh / tên nhóm<input name="name" required maxlength="60" autocomplete="name" placeholder="Ví dụ: Nguyễn Minh An"></label><label>Lớp<input name="className" required maxlength="15" placeholder="Ví dụ: 12A"></label><button type="submit">Bắt đầu →</button></form><p class="connection">Bài làm của em được tự lưu trên máy này. Chỉ khi em bấm “Nộp bài”, họ tên, lớp và mã HTML của em mới được gửi cho giáo viên.</p>`}</section>`;
  document.querySelector('#continue')?.addEventListener('click',()=>location.hash=this.frontier());
  document.querySelector('#join-form')?.addEventListener('submit',e=>{
   e.preventDefault();
   const fd=new FormData(e.target),name=fd.get('name').trim(),className=fd.get('className').trim();
   const a=Util.id(className).slice(0,15),b=Util.id(name).slice(0,40);
   if(!a||!b){Util.toast('Em nhập tên và lớp có chữ hoặc số nhé.');return}
   this.state.student={name,className};this.state.studentId=a+'_'+b;this.save();Api.warmUp();location.hash='warmup';
  });
 },

 /* ---------- Khởi động: so sánh hai văn bản (Hình 8.1) ---------- */
 warmup(){
  const reasons=['Có tiêu đề nổi bật, to hơn chữ thường','Mỗi câu thơ nằm trên một dòng riêng','Có đường kẻ ngang ngăn cách tiêu đề và bài thơ','Có chữ nhấn mạnh (màu sắc, tô nền)'];
  const done=this.state.warmupDone;
  document.querySelector('#main').innerHTML=`<div class="eyebrow">KHỞI ĐỘNG</div><h1>Văn bản nào đẹp hơn?</h1>
<p class="lead">Hai văn bản dưới đây có cùng nội dung nhưng trình bày khác nhau. Em làm hai việc: <strong>chọn</strong> văn bản em thấy đẹp hơn, rồi <strong>chạm vào 3 phần có số ①②③</strong> của văn bản b để biết chúng là gì.</p>
<div class="compare"><article class="doc raw"><span class="doc-tag">a)</span><div class="doc-body">Vội vàng Tôi muốn tắt nắng đi cho màu đừng nhạt mất; Tôi muốn buộc gió lại cho hương đừng bay đi.</div><button class="secondary vote" data-vote="a">Em chọn văn bản a</button></article>
<article class="doc fancy"><span class="doc-tag">b)</span><div class="doc-body"><h3 class="part" data-part="title" data-n="1" tabindex="0" role="button">Vội vàng</h3><hr><p class="part" data-part="lines" data-n="2" tabindex="0" role="button">Tôi muốn tắt nắng đi<br>Cho màu đừng nhạt mất;<br>Tôi muốn buộc gió lại<br>Cho hương đừng bay đi.</p><p><span class="part hl" data-part="emph" data-n="3" tabindex="0" role="button">Xuân Diệu</span></p></div><button class="secondary vote" data-vote="b">Em chọn văn bản b</button></article></div>
<div class="panel" id="warm-result" role="status"><h3>Em chọn văn bản nào?</h3><p>Bấm nút “Em chọn…” dưới một trong hai văn bản.</p></div>
<div class="panel" id="warm-next"><h3>Vì sao văn bản b đẹp hơn?</h3><ul class="reason-list">${reasons.map(r=>`<li>${r}</li>`).join('')}</ul><p class="muted">Các điểm này đều làm được bằng thẻ HTML. Em sẽ học từng thẻ ở bước sau.</p></div>
<div class="warm-bar${done?' ready':''}"><div class="warm-msg"><b id="warm-count" class="warm-count">${done?'3/3':'0/3'}</b><span id="warm-text">${done?'Em đã khám phá xong. Bấm “Tiếp tục” để học các thẻ định dạng.':'Chạm vào phần có số ①②③ trong văn bản b (kéo xuống một chút).'}</span></div><button id="finish-warmup" ${done?'':'disabled'}>Tiếp tục →</button></div>`;
  const found=new Set(done?['title','lines','emph']:[]),notes={title:'① Tiêu đề: dòng chữ to, đứng đầu. Trong HTML dùng thẻ h1 đến h6.',lines:'② Đoạn văn: các câu thơ nằm cùng một đoạn, mỗi câu một dòng. Dùng thẻ p và br.',emph:'③ Chữ nhấn mạnh: được tô nền cho nổi bật. Dùng mark, strong, em hoặc style.'};
  const bar=document.querySelector('.warm-bar'),text=document.querySelector('#warm-text'),count=document.querySelector('#warm-count'),finish=document.querySelector('#finish-warmup');
  const result=document.querySelector('#warm-result');
  document.querySelectorAll('[data-vote]').forEach(b=>b.onclick=()=>{
   const pick=b.dataset.vote;
   result.innerHTML=pick==='b'?'<h3>Đúng rồi, văn bản b đẹp hơn!</h3><p>Em chạm vào 3 phần có số ①②③ trong văn bản b để biết nó được tạo nên từ những thành phần nào.</p>':'<h3>Em chọn văn bản a, có thể em thích sự gọn gàng.</h3><p>Nhưng hầu hết người đọc thấy văn bản b rõ ràng hơn. Em chạm vào 3 phần có số ①②③ trong văn bản b để biết vì sao.</p>';
   document.querySelectorAll('.vote').forEach(x=>x.classList.toggle('chosen',x===b));
   if(found.size<3)document.querySelector('.doc.fancy').scrollIntoView({behavior:'smooth',block:'center'});
  });
  const reveal=el=>{
   found.add(el.dataset.part);el.classList.add('found');
   document.querySelectorAll('.part').forEach(x=>x.classList.toggle('on',x===el));
   count.textContent=found.size+'/3';
   if(found.size===3){bar.classList.add('ready');text.textContent='Tuyệt vời! Em đã nhận ra cả 3 thành phần. Bấm “Tiếp tục” để học các thẻ định dạng.';finish.disabled=false}
   else text.textContent=notes[el.dataset.part];
  };
  document.querySelectorAll('.part').forEach(el=>{
   if(found.has(el.dataset.part))el.classList.add('found');
   el.onclick=()=>reveal(el);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();reveal(el)}};
  });
  finish.onclick=()=>{this.state.warmupDone=true;this.save();location.hash='learning/0'};
 },

 /* ---------- Trang tổng kết mỗi phần ---------- */
 renderStageDone(kind){
  this.nav();
  const tasks=this.tasks(kind);
  document.querySelector('#main').innerHTML=kind==='learning'
   ?`<div class="eyebrow">HOÀN THÀNH HÌNH THÀNH KIẾN THỨC</div><h1>Em đã biết các thẻ định dạng văn bản.</h1><p class="lead">Em đã học xong: thuộc tính style, tiêu đề h1–h6, đoạn văn và xuống dòng, chữ nhấn mạnh, số mũ và chỉ số, màu sắc, phông chữ và cỡ chữ.</p><div class="panel"><h2>Sẵn sàng luyện tập?</h2><p>Ở phần luyện tập, em định dạng những văn bản thật, chỉ có hình mẫu để đối chiếu. Cần nhớ cú pháp thì bấm nút “Từ điển HTML” ở góc trên.</p><button id="next-stage">Vào luyện tập →</button></div>`
   :`<div class="eyebrow">LUYỆN TẬP · HOÀN THÀNH</div><h1>Em đã luyện tập xong!</h1><div class="panel"><span class="tag">HOÀN THÀNH PHẦN 1</span><p>Em đã trình bày bài toán, làm tờ rơi và sửa lỗi định dạng. Em nộp bài cho giáo viên ngay bây giờ nhé.</p><button id="submit-part1">Nộp phần 1 cho giáo viên →</button><div id="submit-status" role="status"></div></div><button id="next-stage" class="secondary">Tiếp tục vận dụng →</button><p class="muted">Nếu mạng bị lỗi, bài vẫn được lưu trên máy. Khi nộp bài vận dụng, phần 1 sẽ được gửi bù.</p>`;
  document.querySelector('#main').insertAdjacentHTML('beforeend',`<div class="panel"><h3>Xem lại bài đã làm</h3><p class="muted">Em bấm vào từng bài để xem lại mã mẫu, phần giải thích và bài làm của mình.</p><div class="review-list">${tasks.map((t,i)=>`<a class="review-link" href="#${kind}/${i}"><b>${i+1}</b> ${Util.esc(t.name)}</a>`).join('')}</div></div>`);
  document.querySelector('#next-stage').onclick=()=>location.hash=kind==='learning'?'practice/0':'final';
  document.querySelector('#submit-part1')?.addEventListener('click',()=>Practice.submitPart1());
 },

 /* ---------- Nộp bài ---------- */
 async submit(type){
  if(this.submitting)return;
  const status=document.querySelector('#submit-status'),say=t=>{if(status)status.textContent=t};
  if(!this.completed('learning')||!this.completed('practice')){say('Em cần hoàn thành phần kiến thức và luyện tập trước khi nộp.');return}
  if(type==='final'&&!Final.validate(this.state.final.code||'').passed){say('Bài vận dụng còn thiếu yêu cầu.');return}
  this.submitting=true;say('Đang gửi bài, em chờ xác nhận từ máy chủ…');
  try{
   if(type==='final'&&!this.state.part1SubmittedAt){await Api.send({type:'part1'});this.state.part1SubmittedAt=new Date().toISOString();this.save()}
   await Api.send({type});
   this.state[type==='part1'?'part1SubmittedAt':'finalSubmittedAt']=new Date().toISOString();this.save();
   const name=type==='part1'?'phần 1':'bài vận dụng';
   say('Đã gửi '+name+' thành công. Giáo viên có thể xem bài của em.');Util.toast('Đã nộp '+name+' thành công ✓');
   setTimeout(()=>this.submitting=false,5000);
  }catch(e){
   this.submitting=false;
   say('Không thể gửi bài. Bài vẫn được lưu trên máy. '+(e.code==='permission-denied'?'Giáo viên cần kiểm tra Firestore Rules.':e.message||'Em kiểm tra kết nối rồi thử lại.'));
  }
 },
 init(){
  const saved=Store.read();
  this.state=saved&&Array.isArray(saved.learning)&&Array.isArray(saved.practice)?{...this.fresh(),...saved}:this.fresh();
  this.verifyState();
  window.addEventListener('hashchange',()=>this.route());
  Dictionary.init();this.route();
 }
};

/* ---------- Từ điển HTML (nút góc trên) ---------- */
const Dictionary={
 entries:[
  ['Thuộc tính','Thông tin bổ sung cho thẻ, viết trong thẻ mở theo dạng tên="giá trị". Nhiều thuộc tính ngăn cách bằng dấu cách.','<p style="color:red" title="ghi chú">…</p>'],
  ['style','Thuộc tính dùng để định dạng ngay tại phần tử. Nhiều định dạng ngăn cách bằng dấu chấm phẩy (;), giữa tên và giá trị là dấu hai chấm (:).','<p style="color:blue; font-size:18px">…</p>'],
  ['color','Màu chữ. Dùng tên màu tiếng Anh, mã hex hoặc rgb.','color:red\ncolor:#0b5ed7\ncolor:rgb(205,0,0)'],
  ['font-family','Phông chữ.','font-family:Tahoma'],
  ['font-size','Cỡ chữ: số kèm đơn vị (px) hoặc cỡ có sẵn như small, large.','font-size:20px'],
  ['<h1> … <h6>','Tiêu đề. h1 là tiêu đề chính, số càng lớn thì cấp càng thấp và chữ càng nhỏ.','<h1>Tin học 12</h1>\n<h2>Phần chung</h2>'],
  ['<p>','Đoạn văn. Mỗi đoạn hiển thị trên dòng mới, cách đoạn trước và sau một khoảng nhỏ.','<p>Nội dung đoạn văn.</p>'],
  ['<br> và <hr>','br xuống dòng trong cùng đoạn, hr kẻ đường ngang. Cả hai không có thẻ đóng.','Dòng 1<br>Dòng 2\n<hr>'],
  ['<div> và <span>','div tạo một khối bắt đầu trên dòng mới; span áp dụng cho một cụm chữ trong dòng.','<span style="color:red">đỏ</span>'],
  ['<strong>, <b>','Chữ đậm. strong nhấn mạnh về ý nghĩa nên được khuyến khích dùng hơn b.','<strong>quan trọng</strong>'],
  ['<em>, <i>','Chữ nghiêng. em nhấn mạnh về ý nghĩa, được khuyến khích dùng hơn i.','<em>nhấn mạnh</em>'],
  ['<mark>, <del>, <u>','mark tô nền vàng, del gạch ngang chữ, u gạch chân.','<mark>chú ý</mark> <del>bỏ</del>'],
  ['<sup>, <sub>, <small>','sup là số mũ, sub là chỉ số dưới, small làm chữ nhỏ hơn.','x<sup>2</sup> H<sub>2</sub>O']
 ],
 init(){
  const dialog=document.querySelector('#dictionary'),search=document.querySelector('#dictionary-search');
  document.querySelector('#dictionary-button').onclick=()=>{dialog.showModal();this.render('');search.value='';search.focus()};
  document.querySelector('#close-dictionary').onclick=()=>dialog.close();
  search.oninput=e=>this.render(e.target.value);
 },
 render(query){
  const normalized=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  const rows=this.entries.filter(e=>normalized(e.join(' ')).includes(normalized(query)));
  document.querySelector('#dictionary-results').innerHTML=rows.length
   ?rows.map(([name,text,code])=>`<article class="dict-entry"><strong>${Util.esc(name)}</strong><p>${Util.esc(text)}</p><pre>${Util.esc(code)}</pre></article>`).join('')
   :'<p>Chưa tìm thấy. Em thử “style”, “màu”, “tiêu đề” hoặc “br”.</p>';
 }
};
App.init();
