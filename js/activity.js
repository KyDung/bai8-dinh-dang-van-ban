/* Khung hiển thị một bài trong giai đoạn Hình thành kiến thức hoặc Luyện tập. */
const Activity={
 arrived:false,
 render(kind,activities,index){
  const task=activities[index],records=App.state[kind],learn=kind==='learning';
  let record=records.find(r=>r.activityId===task.id);
  if(!record){record={activityId:task.id,studentCode:'',attempts:0,passed:false,startedAt:new Date().toISOString(),completedAt:null};records.push(record)}
  // Mã có sẵn (starter) chỉ nạp một lần cho mỗi bài
  if(task.starter&&!record.seeded){if(!record.studentCode)record.studentCode=task.starter;record.seeded=true}
  if(Activity.arrived){Activity.arrived=false;Util.toast(`Đã chuyển sang bài ${index+1}/${activities.length}: ${task.name}`)}
  const tabs=activities.map((t,i)=>`<button data-index="${i}" class="${i===index?'current':''}" ${i>App.availableIndex(kind)?'disabled':''}>${records.find(r=>r.activityId===t.id)?.passed?'✓':i+1} ${t.name}</button>`).join('');
  const top=learn
   ?`<p class="lead">${Util.esc(task.intro)}</p><div class="lesson-card"><div class="card-label">MÃ MẪU</div><div class="knowledge"><div>${this.annotated(task.parts)}</div><div><label>Kết quả hiển thị</label><iframe id="sample-preview" sandbox="" title="Kết quả mã mẫu" style="height:${task.previewHeight||150}px"></iframe><p class="effect"><strong>Tác dụng:</strong> ${Util.esc(task.effect)}</p></div></div></div>`
   :`<p class="lead">${Util.esc(task.lead)}</p><div class="lesson-card target-card"><div class="card-label">KẾT QUẢ CẦN ĐẠT</div><iframe id="target-preview" sandbox="" title="Kết quả cần đạt" style="height:${task.previewHeight||300}px"></iframe></div>`;
  document.querySelector('#main').innerHTML=`<div class="eyebrow">${learn?'HÌNH THÀNH KIẾN THỨC':'LUYỆN TẬP'}</div>
<div class="activity-tabs">${tabs}</div><h1>${Util.esc(task.title)}</h1>${top}
<div class="tip"><strong>Nhiệm vụ của em:</strong><ul class="task-list">${[].concat(task.task).map(t=>`<li>${Util.esc(t)}</li>`).join('')}</ul></div>
<div class="workspace"><section class="editor-side"><div class="pane-head"><span>${task.file}</span><span>VIẾT MÃ HTML</span></div><div class="code-wrap"><div class="lines">1</div><textarea id="code" aria-label="Mã HTML của em" maxlength="100000" spellcheck="false" placeholder="Em bắt đầu viết mã tại đây…">${Util.esc(record.studentCode)}</textarea></div></section><section class="preview-side"><div class="pane-head"><span>KẾT QUẢ TRỰC TIẾP</span><span>Cập nhật khi em gõ</span></div><iframe id="preview" sandbox="" title="Kết quả mã HTML của em"></iframe></section></div>
<div class="actions"><button id="check-code">Kiểm tra mã →</button><span class="muted">${index+1}/${activities.length} nhiệm vụ · Tự động lưu</span></div><div id="feedback" aria-live="polite"></div><div id="practice-end"></div>`;
  document.querySelectorAll('[data-index]').forEach(b=>b.onclick=()=>{location.hash=`${kind}/${b.dataset.index}`});
  if(learn)Preview.update(document.querySelector('#sample-preview'),task.previewHtml||task.sample);
  else Preview.update(document.querySelector('#target-preview'),task.target);
  const textarea=document.querySelector('#code');
  const refresh=()=>{record.studentCode=textarea.value;Store.saveCode(task.id,textarea.value);App.save();Preview.update(document.querySelector('#preview'),textarea.value)};
  Editor.mount(textarea,record,()=>{record.studentCode=textarea.value;record.passed=false;record.completedAt=null;App.invalidateAfter(kind,index);refresh()});
  refresh();
  document.querySelector('#check-code').onclick=()=>{
   const result=task.validate(textarea.value);
   record.attempts++;record.passed=result.passed;
   if(result.passed)record.completedAt=new Date().toISOString();
   App.save();App.nav();
   const fb=document.querySelector('#feedback');
   fb.innerHTML=result.passed?'<div class="feedback good">Chính xác! Em đã làm đúng.</div>':`<div class="feedback">Chưa đúng rồi. ${Util.esc(result.errors[0])}</div>`;
   fb.innerHTML+=Activity.checklist(result.checks);
   if(result.passed)Activity.afterPass(kind,activities,index);
  };
  if(kind==='practice'&&index===activities.length-1)Activity.showPracticeEnd();
 },
 // Chấm đúng: báo rõ và chuyển sang bài tiếp theo (có đếm ngược, có thể ở lại)
 afterPass(kind,activities,index){
  const fb=document.querySelector('#feedback'),last=index+1>=activities.length,hash=location.hash;
  if(kind==='practice'&&last){fb.querySelector('.feedback.good').innerHTML='Chính xác! Em đã hoàn thành cả phần Luyện tập.';Activity.showPracticeEnd(true);return}
  const nextName=last?'trang tổng kết':'bài tiếp theo: “'+activities[index+1].name+'”';
  const box=document.createElement('div');box.className='next-banner';
  box.innerHTML=`<span>✓ Đang chuyển sang ${Util.esc(nextName)} sau <b id="count">3</b> giây…</span><div class="actions"><button id="go-now">Sang ngay →</button><button id="stay" class="secondary">Ở lại bài này</button></div>`;
  fb.append(box);
  let left=3;
  const go=()=>{clearInterval(timer);if(location.hash!==hash)return;Activity.arrived=true;if(last)App.renderStageDone(kind);else location.hash=`${kind}/${index+1}`};
  const timer=setInterval(()=>{left--;const c=box.querySelector('#count');if(c)c.textContent=left;if(left<=0)go()},1000);
  box.querySelector('#go-now').onclick=go;
  box.querySelector('#stay').onclick=()=>{clearInterval(timer);box.innerHTML='<span>Em ở lại bài này. Khi sẵn sàng, bấm nút bên cạnh.</span><div class="actions"><button id="go-now2">Sang bài tiếp →</button></div>';box.querySelector('#go-now2').onclick=go};
  box.scrollIntoView({block:'nearest'});
 },
 // Khung nộp bài ngay cuối phần Luyện tập (phòng khi không kịp sang Vận dụng)
 showPracticeEnd(scroll){
  const box=document.querySelector('#practice-end');if(!box||!App.completed('practice'))return;
  const sent=App.state.part1SubmittedAt;
  box.innerHTML=`<div class="next-banner end"><strong>🎉 Em đã hoàn thành phần Luyện tập!</strong><p>${sent?'Em đã nộp phần 1 lúc '+new Date(sent).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})+'. Nếu sửa bài, em có thể nộp lại.':'Em hãy nộp bài cho giáo viên ngay bây giờ, kể cả khi chưa kịp làm phần Vận dụng.'}</p><div class="actions"><button id="submit-part1-inline">${sent?'Nộp lại phần 1':'Nộp bài phần 1 cho giáo viên'}</button><button id="to-final" class="secondary">Tiếp tục sang Vận dụng →</button></div><div id="submit-status" role="status"></div></div>`;
  box.querySelector('#submit-part1-inline').onclick=()=>Practice.submitPart1().then(()=>{if(App.state.part1SubmittedAt)Activity.showPracticeEnd()});
  box.querySelector('#to-final').onclick=()=>{Activity.arrived=false;location.hash='final'};
  if(scroll)box.scrollIntoView({block:'center'});
 },
 // Mã mẫu tô màu: mỗi đoạn có chú thích riêng
 annotated(parts){
  const segs=parts.map(([code,label,c])=>c?`<span class="seg c${c}">${Util.esc(code)}</span>`:Util.esc(code)).join('');
  const legend=parts.filter(p=>p[1]).map(([code,label,c])=>`<li><span class="dot c${c}"></span><div><code>${Util.esc(code.trim())}</code><span>${Util.esc(label)}</span></div></li>`).join('');
  return `<pre class="sample annotated">${segs}</pre><h4 class="legend-title">Ý nghĩa từng thành phần</h4><ul class="legend">${legend}</ul>`;
 },
 checklist(checks){
  return `<ul class="checks">${checks.map(c=>`<li class="${c.ok?'ok':''}">${Util.esc(c.label)}${!c.ok?`<br><span class="muted">${Util.esc(c.hint)}</span>`:''}</li>`).join('')}</ul>`;
 }
};
