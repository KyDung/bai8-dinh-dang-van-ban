/* Giai đoạn Luyện tập: không còn mã mẫu, mỗi bài có “kết quả cần đạt” (target) để đối chiếu.
   Bài 1-2: định dạng lại văn bản cho giống hình mẫu. Bài 3: tìm và sửa lỗi định dạng. */
const Practice={activities:[
 {id:'practice-math',name:'Phương trình bậc 2',title:'Bài 1 · Trình bày bài toán biện luận',file:'trang.html',
  lead:'Bạn lớp trưởng gõ xong nội dung bài toán nhưng chưa định dạng gì cả, ai đọc cũng thấy rối. Em hãy định dạng lại để được kết quả giống hình mẫu.',
  target:'<h1>Biện luận số nghiệm của phương trình bậc 2</h1>\n<h2><span style="color:rgb(205,0,0)">Bài toán:</span> Xác định số nghiệm của phương trình ax<sup>2</sup> + bx + c = 0 (a ≠ 0)</h2>\n<h3>Cách làm:</h3>\n<p><strong>B<sub>1</sub>:</strong> Xác định hệ số a, b và c</p>\n<p><strong>B<sub>2</sub>:</strong> Tính delta = b<sup>2</sup> - 4ac</p>\n<p><strong>B<sub>3</sub>:</strong> Kết luận<br>+ Nếu delta &lt; 0: Phương trình vô nghiệm<br>+ Nếu delta = 0: Phương trình có nghiệm duy nhất<br>+ Nếu delta &gt; 0: Phương trình có hai nghiệm phân biệt</p>',
  starter:'<p>Biện luận số nghiệm của phương trình bậc 2</p>\n<p>Bài toán: Xác định số nghiệm của phương trình ax2 + bx + c = 0 (a ≠ 0)</p>\n<p>Cách làm:</p>\n<p>B1: Xác định hệ số a, b và c</p>\n<p>B2: Tính delta = b2 - 4ac</p>\n<p>B3: Kết luận + Nếu delta < 0: Phương trình vô nghiệm + Nếu delta = 0: Phương trình có nghiệm duy nhất + Nếu delta > 0: Phương trình có hai nghiệm phân biệt</p>\n',
  task:['Ba dòng đầu là tiêu đề: dòng 1 là h1, dòng 2 là h2, dòng “Cách làm:” là h3.','Chữ “Bài toán:” màu đỏ rgb(205,0,0), dùng thẻ span và thuộc tính style.','Viết số mũ (ax², b²) bằng sup và chỉ số dưới (B₁, B₂, B₃) bằng sub.','Ba bước B1, B2, B3 là ba đoạn p, phần “B1:” “B2:” “B3:” in đậm bằng strong.','Ở bước B3, dùng thẻ br để tách ba trường hợp thành ba dòng.'],
  validate(html){const V=Validators,d=V.parseHTML(html),step=n=>V.q(d,'p').find(e=>V.text(e).startsWith('b'+n));return V.result([
   V.chk('h1',V.withText(d,'h1','biện luận số nghiệm').length,'Dòng 1 là tiêu đề h1','Đổi dòng “Biện luận số nghiệm…” thành thẻ h1.'),
   V.chk('h2',V.withText(d,'h2','bài toán').length,'Dòng 2 là tiêu đề h2','Đổi dòng “Bài toán: …” thành thẻ h2.'),
   V.chk('h3',V.withText(d,'h3','cách làm').length,'Dòng “Cách làm:” là tiêu đề h3','Đổi dòng “Cách làm:” thành thẻ h3.'),
   V.chk('red',V.q(d,'span').some(e=>V.text(e)==='bài toán:'&&V.colorOf(V.styleOf(e,'color'))===V.colorOf('rgb(205,0,0)')),'Chữ “Bài toán:” nằm trong span màu rgb(205,0,0)','Viết <span style="color:rgb(205,0,0)">Bài toán:</span>.'),
   V.chk('sup',V.q(d,'sup').length>=2,'Có số mũ (sup) ở ax² và b²','Viết ax<sup>2</sup> và b<sup>2</sup>.'),
   V.chk('sub',V.q(d,'sub').length>=3,'Có chỉ số dưới (sub) ở B1, B2, B3','Viết B<sub>1</sub>, B<sub>2</sub>, B<sub>3</sub>.'),
   V.chk('steps',[1,2,3].every(n=>{const p=step(n);return p&&V.q(p,'strong,b').some(s=>V.text(s).startsWith('b'+n))}),'Ba bước B1, B2, B3 là ba đoạn p, phần “Bn:” in đậm','Mỗi bước là một thẻ p, bọc “B1:” (cả chỉ số dưới) trong thẻ strong.'),
   V.chk('br',(()=>{const p=step(3);return p&&V.brIn(p)>=3})(),'Bước B3 tách thành các dòng bằng thẻ br',V.brMessage(step(3),3,'bước B3')+' Đặt <br> sau chữ “Kết luận” và trước mỗi dấu “+ Nếu …”.')])}},
 {id:'practice-ad',name:'Tờ rơi Internet',title:'Bài 2 · Làm tờ rơi quảng cáo',file:'trang.html',
  lead:'Một nhà mạng gửi nội dung tờ rơi dưới dạng chữ thô. Em hãy định dạng để tờ rơi nổi bật, dễ đọc như hình mẫu.',
  target:'<h1 style="color:#0b5ed7; font-family:Tahoma">INTERNET TỐC ĐỘ CAO</h1>\n<hr>\n<p>Dịch vụ Internet tốc độ cao là dịch vụ Internet cáp quang <strong>chất lượng cao</strong>, ổn định, giá cả hợp lí.</p>\n<h3>Các tính năng nổi bật:</h3>\n<p>• Tốc độ siêu cao từ <mark>150 MBps</mark> trở lên<br>• Lắp đặt nhanh chóng trong 24 h<br>• Phù hợp với cá nhân/Hộ gia đình<br>• Tặng Modem 2 băng tần<br>• Miễn phí lắp đặt<br>• Hỗ trợ 24/7</p>',
  starter:'<p>INTERNET TỐC ĐỘ CAO</p>\n<p>Dịch vụ Internet tốc độ cao là dịch vụ Internet cáp quang chất lượng cao, ổn định, giá cả hợp lí.</p>\n<p>Các tính năng nổi bật:</p>\n<p>• Tốc độ siêu cao từ 150 MBps trở lên • Lắp đặt nhanh chóng trong 24 h • Phù hợp với cá nhân/Hộ gia đình • Tặng Modem 2 băng tần • Miễn phí lắp đặt • Hỗ trợ 24/7</p>\n',
  task:['Dòng “INTERNET TỐC ĐỘ CAO” là h1, có màu chữ tùy em chọn và phông chữ Tahoma (dùng style).','Kẻ một đường ngang (hr) ngay dưới tiêu đề.','Trong đoạn giới thiệu, in đậm cụm “chất lượng cao” bằng strong.','Dòng “Các tính năng nổi bật:” là tiêu đề h3.','Tách các tính năng thành từng dòng bằng thẻ br, tô nền vàng “150 MBps” bằng mark.'],
  validate(html){const V=Validators,d=V.parseHTML(html),intro=V.q(d,'p').find(e=>V.has(e,'dịch vụ internet tốc độ cao là')),list=V.bestP(d,e=>V.has(e,'miễn phí lắp đặt')||V.has(e,'tốc độ siêu cao'));return V.result([
   V.chk('h1',V.withText(d,'h1','internet tốc độ cao').some(e=>V.colorOf(V.styleOf(e,'color'))&&V.norm(V.styleOf(e,'font-family')).includes('tahoma')),'Tiêu đề h1 có màu chữ và phông Tahoma','Đổi dòng đầu thành h1 và thêm style="color:…; font-family:Tahoma".'),
   V.chk('hr',V.q(d,'hr').length,'Có đường ngang hr','Thêm thẻ <hr> dưới tiêu đề.'),
   V.chk('strong',intro&&V.q(intro,'strong,b').some(e=>V.text(e)==='chất lượng cao'),'Cụm “chất lượng cao” được in đậm','Viết <strong>chất lượng cao</strong> trong đoạn giới thiệu.'),
   V.chk('h3',V.withText(d,'h3','các tính năng nổi bật').length,'“Các tính năng nổi bật:” là tiêu đề h3','Đổi dòng này thành thẻ h3.'),
   V.chk('br',list&&V.brIn(list)>=4,'Các tính năng được tách thành từng dòng bằng br',V.brMessage(list,4,'danh sách tính năng')+' Đặt <br> trước mỗi dấu “•” (trừ dấu đầu tiên).'),
   V.chk('mark',V.q(d,'mark').some(e=>V.text(e)==='150 mbps'),'“150 MBps” được tô nền bằng mark','Viết <mark>150 MBps</mark>.')])}},
 {id:'practice-fix',name:'Sửa lỗi định dạng',title:'Bài 3 · Tìm và sửa lỗi định dạng',file:'trang.html',
  lead:'Bản thông báo của lớp được gõ vội nên có nhiều lỗi định dạng: có chỗ chữ không đổi màu, có chỗ cả đoạn bị in đậm sai. Em xem kết quả bên phải để tìm lỗi, rồi sửa lại mã.',
  target:'<h1 style="color:red">Thông báo của lớp</h1>\n<p style="font-size:18px">Họp lớp vào <strong>thứ Hai</strong></p>\n<p style="font-family:Tahoma">Mang theo sách Tin học 12.</p>\n<h2>Nội dung họp</h2>\n<p>Công thức hóa học của nước là H<sub>2</sub>O.</p>',
  starter:'<h1 style="color=red">Thông báo của lớp</h1>\n<p style="font-size:18">Họp lớp vào <strong>thứ Hai</p>\n<p style="font-family=Tahoma">Mang theo sách Tin học 12.</p>\n<h2>Nội dung họp<h2>\n<p>Công thức hóa học của nước là H<sup>2</sup>O.</p>\n',
  task:['So sánh kết quả bên phải với “Kết quả cần đạt” để tìm lỗi.','Sửa mọi lỗi trong mã cho đến khi tất cả mục bên dưới được đánh dấu ✓.','Lỗi thường gặp: dùng dấu = thay cho dấu : trong style, thiếu đơn vị px, quên thẻ đóng, viết sai thẻ đóng, dùng nhầm sup và sub.'],
  validate(html){const V=Validators,d=V.parseHTML(html),h1=d.querySelector('h1'),hop=V.q(d,'p').find(e=>V.has(e,'họp lớp')),mang=V.q(d,'p').find(e=>V.has(e,'mang theo')),strong=V.q(d,'strong,b'),h2=V.q(d,'h2'),all=d.body.innerHTML.replace(/\s+/g,'');return V.result([
   V.chk('color',h1&&V.styleOf(h1,'color'),'Tiêu đề h1 đổi được màu chữ','Trong style, giữa tên định dạng và giá trị là dấu hai chấm (:), không phải dấu bằng (=).'),
   V.chk('size',hop&&/^\d+(\.\d+)?px$/.test(V.declOf(hop,'font-size').replace(/\s+/g,'')),'Đoạn “Họp lớp” đổi được cỡ chữ','Cỡ chữ cần có đơn vị, ví dụ 18px.'),
   V.chk('strong',strong.length===1&&V.text(strong[0])==='thứ hai','Chỉ cụm “thứ Hai” được in đậm','Thẻ strong chưa có thẻ đóng </strong> nên các đoạn sau cũng bị đậm theo.'),
   V.chk('family',mang&&V.styleOf(mang,'font-family'),'Đoạn “Mang theo sách” đổi được phông chữ','Trong style, dùng dấu hai chấm: font-family:Tahoma.'),
   V.chk('h2',h2.length===1&&V.text(h2[0])==='nội dung họp','Tiêu đề h2 “Nội dung họp” được đóng đúng','Thẻ đóng của h2 phải có dấu gạch chéo: </h2>.'),
   V.chk('sub',/H<sub>2<\/sub>O/.test(all)&&!/H<sup>/.test(all),'H2O có chỉ số dưới đúng','Chỉ số trong công thức hóa học là chỉ số dưới: dùng sub, không dùng sup.')])}}
],render(index=0){Activity.render('practice',this.activities,index)},async submitPart1(){await App.submit('part1')}};
