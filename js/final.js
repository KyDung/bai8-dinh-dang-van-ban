/* Giai đoạn Vận dụng: trình bày một bài thơ thành "tấm thiệp" đẹp, có tiêu đề dùng màu lấy từ bức tranh. */
const Final={
 file:'baitho.html',
 poem:'Công cha như núi Thái Sơn\nNghĩa mẹ như nước trong nguồn chảy ra\nMột lòng thờ mẹ kính cha\nCho tròn chữ hiếu mới là đạo con\n(Ca dao)',
 // Bức tranh hoàng hôn vẽ bằng SVG, mỗi mảng màu có mã màu cụ thể để học sinh "lấy màu"
 scene:[['Bầu trời','#ffd9a8','<rect width="320" height="150" fill="#ffd9a8" data-color="#ffd9a8"/>'],
  ['Vầng mặt trời','#ff6b3d','<circle cx="220" cy="82" r="38" fill="#ff6b3d" data-color="#ff6b3d"/>'],
  ['Dãy núi','#7b4fa3','<path d="M0 150 L70 70 L130 125 L190 60 L260 130 L320 90 L320 150Z" fill="#7b4fa3" data-color="#7b4fa3"/>'],
  ['Mặt biển','#1f6f9e','<rect y="150" width="320" height="60" fill="#1f6f9e" data-color="#1f6f9e"/>'],
  ['Ánh nắng trên biển','#ffc933','<rect x="190" y="160" width="60" height="8" rx="4" fill="#ffc933" data-color="#ffc933"/><rect x="200" y="178" width="40" height="8" rx="4" fill="#ffc933" data-color="#ffc933"/>']],
 render(){
  const record=App.state.final;
  document.querySelector('#main').innerHTML=`<div class="eyebrow">VẬN DỤNG · TỰ TAY LÀM</div><h1>Trình bày một bài thơ thật đẹp.</h1>
<p class="lead">Em đã biết các thẻ định dạng. Bây giờ hãy dùng chúng để biến một bài ca dao thành tấm thiệp đẹp mắt. Em có thể hoàn thiện ở nhà, bài tự lưu trên máy.</p>
<div class="panel task-panel"><h3>Đề bài · Viết tệp ${this.file}</h3><ol class="task-steps">
<li>Tiêu đề bài thơ là thẻ <code>&lt;h1&gt;</code>, chữ có <strong>màu cụ thể lấy từ bức tranh</strong> bên dưới (mã dạng <code>#ff6b3d</code> hoặc <code>rgb(…)</code>).</li>
<li>Các câu thơ nằm trong một đoạn <code>&lt;p&gt;</code>, tách thành từng dòng bằng thẻ <code>&lt;br&gt;</code> (ít nhất 4 dòng).</li>
<li>Có đường kẻ ngang <code>&lt;hr&gt;</code> ngăn cách tiêu đề và bài thơ.</li>
<li>Nhấn mạnh ít nhất một cụm chữ bằng strong, em hoặc mark.</li>
<li>Đặt phông chữ và cỡ chữ cho bài thơ bằng <code>font-family</code> và <code>font-size</code> trong style.</li></ol>
<p class="muted">Em có thể dùng bài ca dao gợi ý hoặc chọn bài thơ em thích. Checklist bên dưới tự đánh dấu ✓ khi em làm xong từng phần.</p></div>
<div class="panel picker"><div class="card-label">CÔNG CỤ LẤY MÀU</div><div class="picker-grid"><svg id="scene" viewBox="0 0 320 210" role="img" aria-label="Bức tranh hoàng hôn trên biển, bấm vào từng mảng màu để lấy mã màu">${this.scene.map(s=>s[2]).join('')}</svg><div><h3>Bấm vào bức tranh để lấy màu</h3><p class="muted">Mỗi mảng màu có một mã riêng. Em chọn một màu rồi chèn mã vào thuộc tính style của tiêu đề, ví dụ <code>style="color:#ff6b3d"</code>.</p><div class="picked" id="picked"><span class="swatch" id="swatch"></span><div><b id="picked-name">Chưa chọn màu</b><br><code id="picked-code">—</code></div></div><div class="actions"><button id="insert-color" class="secondary" disabled>Chèn mã màu vào trình soạn</button><button id="insert-poem" class="secondary">Chèn bài ca dao gợi ý</button></div></div></div></div>
<div class="workspace"><section class="editor-side"><div class="pane-head"><span>${this.file}</span><span>TẤM THIỆP CỦA EM</span></div><div class="code-wrap"><div class="lines">1</div><textarea id="code" aria-label="Mã bài thơ" maxlength="100000" spellcheck="false" wrap="off" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Viết mã HTML của tấm thiệp tại đây…">${Util.esc(record.code||'')}</textarea></div></section><section class="preview-side"><div class="pane-head"><span>KẾT QUẢ TRỰC TIẾP</span><span>Tấm thiệp</span></div><iframe id="preview" sandbox="" title="Tấm thiệp của em"></iframe></section></div>
<div class="panel"><h3>Checklist sản phẩm</h3><div id="final-checks"></div><div class="actions"><button id="submit-final" aria-disabled="true">Nộp bài vận dụng →</button><button id="download-final" class="secondary">Tải tệp HTML</button><button id="backup" class="secondary">Tải bản sao toàn bộ bài</button></div><div id="submit-status" role="status"></div></div>`;
  const textarea=document.querySelector('#code');
  const insert=text=>{textarea.focus();textarea.setRangeText(text,textarea.selectionStart,textarea.selectionEnd,'end');textarea.dispatchEvent(new Event('input'))};
  const update=()=>{record.code=textarea.value;const r=this.validate(record.code);record.requirements=Object.fromEntries(r.checks.map(c=>[c.id,c.ok]));document.querySelector('#final-checks').innerHTML=Activity.checklist(r.checks);document.querySelector('#submit-final').setAttribute('aria-disabled',String(!r.passed));Preview.update(document.querySelector('#preview'),record.code);App.save();Store.saveCode('final',record.code)};
  Editor.mount(textarea,record,update);update();
  let picked=null;
  document.querySelectorAll('#scene [data-color]').forEach(el=>{el.style.cursor='pointer';el.addEventListener('click',()=>{
   picked=el.dataset.color;const info=this.scene.find(s=>s[1]===picked);
   document.querySelector('#swatch').style.background=picked;document.querySelector('#picked-name').textContent=info?info[0]:'Màu đã chọn';document.querySelector('#picked-code').textContent=picked;document.querySelector('#insert-color').disabled=false;
  })});
  document.querySelector('#insert-color').onclick=()=>picked&&insert(picked);
  document.querySelector('#insert-poem').onclick=()=>insert(this.poem+'\n');
  document.querySelector('#submit-final').onclick=()=>{const r=this.validate(record.code);if(!r.passed){document.querySelector('#submit-status').textContent='Còn thiếu: '+r.checks.filter(c=>!c.ok).map(c=>c.label).join('; ');return}App.submit('final')};
  document.querySelector('#download-final').onclick=()=>Util.download('baitho.html',record.code);
  document.querySelector('#backup').onclick=()=>Util.download('bai-8-ban-sao.json',JSON.stringify(App.state,null,2),'application/json');
 },
 validate(html){
  const V=Validators,d=V.parseHTML(html);
  const poem=V.q(d,'p').find(p=>V.brIn(p)>=3&&V.text(p).length>=40);
  return V.result([
   V.chk('title',V.q(d,'h1').some(e=>V.isConcreteColor(V.styleOf(e,'color'))&&V.colorOf(V.styleOf(e,'color'))),'Tiêu đề h1 có màu cụ thể (mã #… hoặc rgb) lấy từ bức tranh','Viết <h1 style="color:#ff6b3d">…</h1> với mã màu em chọn, không dùng tên màu tiếng Anh.'),
   V.chk('lines',!!poem,'Bài thơ nằm trong một đoạn p, tách thành ít nhất 4 dòng bằng br','Đặt các câu thơ trong một thẻ p và thêm <br> cuối mỗi câu (cần ít nhất 3 thẻ br).'),
   V.chk('hr',V.q(d,'hr').length,'Có đường kẻ ngang hr','Thêm thẻ <hr> giữa tiêu đề và bài thơ.'),
   V.chk('emphasis',V.q(d,'strong,b,em,i,mark').some(e=>V.text(e).length>0),'Có cụm chữ được nhấn mạnh (strong, em hoặc mark)','Bọc một cụm chữ trong <strong>, <em> hoặc <mark>.'),
   V.chk('font',V.q(d,'*[style]').some(e=>V.styleOf(e,'font-family')&&/^\d+(\.\d+)?(px|pt|em|rem|%)$/.test(V.declOf(e,'font-size').replace(/\s+/g,''))),'Có phần tử đặt cả font-family và font-size','Thêm vào style: font-family:Tahoma; font-size:20px (cỡ chữ có đơn vị).')
  ]);
 }
};
