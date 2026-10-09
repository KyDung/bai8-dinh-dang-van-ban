/* Giai đoạn Hình thành kiến thức, Bài 8: Định dạng văn bản.
   Mỗi bài: lời dẫn ngắn (intro) → mã mẫu tô màu có chú thích từng thành phần (parts)
   → khung kết quả cho thấy tác dụng của thẻ (previewHtml, effect) → nhiệm vụ viết thêm vào mã có sẵn (starter).
   parts = [đoạn mã, chú thích (để trống nếu không cần), số màu 1-5] */
const V=Validators;
const Learning={activities:[
 {id:'learn-style',name:'Thuộc tính style',title:'Thuộc tính của thẻ: style',file:'trang.html',
  intro:'Thuộc tính bổ sung thông tin cho thẻ, viết trong thẻ mở, sau tên thẻ, theo dạng tên="giá trị". Thuộc tính hay dùng nhất là style: dùng để đổi màu chữ, phông chữ, cỡ chữ, căn lề, tạo khung…',
  parts:[['<p ','Thẻ p mở, sau tên thẻ có một dấu cách rồi đến thuộc tính',1],['style=','Tên thuộc tính: style, dùng để định dạng phần tử ngay tại chỗ viết',2],['"color:red"','Giá trị thuộc tính, đặt trong dấu ngoặc kép, viết dạng tên_định_dạng:giá_trị. Ở đây color (màu chữ) có giá trị red (đỏ)',4],['>','',1],['Chữ màu đỏ','Nội dung đoạn văn',3],['</p>','Thẻ đóng. Thuộc tính chỉ viết trong thẻ mở, không viết trong thẻ đóng',1]],
  previewHtml:'<p>Đoạn không có thuộc tính style.</p>\n<p style="color:red">Đoạn có style="color:red".</p>',
  effect:'Hai đoạn đều là thẻ p, nhưng thuộc tính style làm đoạn thứ hai đổi sang màu đỏ. Thuộc tính không đổi ý nghĩa của thẻ, chỉ bổ sung cách hiển thị.',
  starter:'<h1>Studio chữ</h1>\n<p>Thuộc tính style giúp em đổi màu chữ cho đoạn văn này.</p>\n<!-- Thêm thuộc tính style vào thẻ p ở trên để chữ có màu xanh dương (blue), giống mẫu -->\n',
  task:['Mã bên trái đã có sẵn một tiêu đề và một đoạn văn.','Thêm thuộc tính style vào thẻ <p> của đoạn văn.','Giá trị là color:blue để chữ có màu xanh dương.','Thuộc tính viết trong thẻ mở, ngay sau tên thẻ.'],
  validate(html){const d=V.parseHTML(html),p=V.q(d,'p[style]');return V.result([
   V.chk('attr',p.length,'Thẻ p có thuộc tính style','Viết thuộc tính ngay trong thẻ mở: <p style="…">.'),
   V.chk('blue',p.some(e=>V.colorOf(V.styleOf(e,'color'))===V.colorOf('blue')),'Màu chữ là blue (xanh dương)','Trong style viết color:blue, giữa tên và giá trị là dấu hai chấm (:).')])}},
 {id:'learn-heading',name:'Tiêu đề h1–h6',title:'Thẻ tiêu đề h1 đến h6',file:'trang.html',
  intro:'Tiêu đề và các tiêu đề con được định dạng bằng thẻ <h1> đến <h6>. Số càng nhỏ thì tiêu đề càng quan trọng. <h1> dùng cho tiêu đề chính của cả văn bản, <h2> cho tiêu đề cấp thấp hơn, và cứ thế tiếp.',
  parts:[['<h1>','Thẻ h1: tiêu đề chính của cả văn bản, mức quan trọng cao nhất',1],['Tin học 12'],['</h1>','',1],['\n'],['<h2>','Thẻ h2: tiêu đề cấp thấp hơn h1',2],['Phần chung'],['</h2>','',2],['\n'],['<h3>','Thẻ h3: tiêu đề cấp thấp hơn h2. Cứ tăng số thì chữ nhỏ dần và mức quan trọng giảm dần, đến h6',4],['Chủ đề 1. Máy tính và xã hội tri thức'],['</h3>','',4]],
  previewHtml:'<h1>Tin học 12</h1>\n<h2>Phần chung</h2>\n<h3>Chủ đề 1. Máy tính và xã hội tri thức</h3>\n<h4>1. Trí tuệ nhân tạo và ứng dụng</h4>\n<h5>Mức h5</h5>\n<h6>Mức h6</h6>',
  previewHeight:250,
  effect:'Từ h1 đến h6, chữ nhỏ dần. Trình duyệt và công cụ tìm kiếm dựa vào các thẻ này để hiểu cấu trúc văn bản, giúp người đọc lướt nhanh theo tiêu đề.',
  starter:'<p>Tin học 12</p>\n<p>Phần chung</p>\n<p>Chủ đề 1. Máy tính và xã hội tri thức</p>\n<p>Chủ đề 2. Mạng máy tính và Internet</p>\n',
  task:['Mã bên trái có 4 dòng chữ đều đang là thẻ <p>.','Đổi dòng “Tin học 12” thành tiêu đề h1.','Đổi dòng “Phần chung” thành tiêu đề h2.','Đổi hai dòng “Chủ đề …” thành tiêu đề h3.','Nhớ đổi cả thẻ mở và thẻ đóng.'],
  validate(html){const d=V.parseHTML(html);return V.result([
   V.chk('h1',V.withText(d,'h1','Tin học 12').length,'Dòng “Tin học 12” là thẻ h1','Đổi <p>Tin học 12</p> thành <h1>Tin học 12</h1>.'),
   V.chk('h2',V.withText(d,'h2','Phần chung').length,'Dòng “Phần chung” là thẻ h2','Đổi dòng “Phần chung” thành thẻ h2, cấp thấp hơn h1.'),
   V.chk('h3',V.withText(d,'h3','Chủ đề').length>=2,'Hai dòng “Chủ đề …” là thẻ h3','Đổi cả hai dòng bắt đầu bằng “Chủ đề” thành thẻ h3.')])}},
 {id:'learn-paragraph',name:'Đoạn văn, xuống dòng',title:'Thẻ p, br và hr',file:'trang.html',
  intro:'Đoạn văn được đặt trong cặp thẻ <p>…</p>; trình duyệt hiển thị mỗi đoạn trên dòng mới, cách đoạn trước và sau một khoảng nhỏ. Thẻ <br> xuống dòng trong cùng một đoạn, thẻ <hr> kẻ một đường ngang. Hai thẻ này không có thẻ đóng.',
  parts:[['<h2>Ca dao</h2>\n'],['<hr>','Thẻ hr: kẻ một đường ngang để ngăn cách. Thẻ rỗng, không có thẻ đóng',1],['\n'],['<p>','Thẻ p: bắt đầu một đoạn văn',2],['Công cha như núi Thái Sơn'],['<br>','Thẻ br: xuống dòng ngay tại đây, vẫn nằm trong cùng đoạn. Không cần thẻ đóng',4],['Nghĩa mẹ như nước trong nguồn chảy ra'],['<br>','',4],['Một lòng thờ mẹ kính cha'],['</p>','Thẻ đóng của đoạn văn',2]],
  previewHtml:'<h4>Chỉ có thẻ p</h4>\n<p>Công cha như núi Thái Sơn Nghĩa mẹ như nước trong nguồn chảy ra Một lòng thờ mẹ kính cha</p>\n<h4>Có thẻ hr và br</h4>\n<hr>\n<p>Công cha như núi Thái Sơn<br>Nghĩa mẹ như nước trong nguồn chảy ra<br>Một lòng thờ mẹ kính cha</p>',
  previewHeight:280,
  effect:'Nếu chỉ có chữ liền nhau thì trình duyệt gộp thành một dòng dài. Thẻ br tách thành từng câu thơ, thẻ hr kẻ đường ngang phân cách tiêu đề với nội dung.',
  starter:'<h2>Ca dao về cha mẹ</h2>\n<!-- Thêm thẻ hr ngay dưới tiêu đề để kẻ đường ngang -->\n<p>Công cha như núi Thái Sơn Nghĩa mẹ như nước trong nguồn chảy ra Một lòng thờ mẹ kính cha Cho tròn chữ hiếu mới là đạo con.</p>\n',
  task:['Mã có sẵn tiêu đề và một đoạn ca dao viết liền một dòng.','Thêm thẻ <hr> ngay dưới tiêu đề để kẻ đường ngang.','Dùng thẻ <br> tách ca dao thành 4 dòng (cần 3 thẻ <br>).','Giữ nguyên nội dung chữ.'],
  validate(html){
   const d=V.parseHTML(html),h2=d.querySelector('h2'),hr=d.querySelector('hr');
   const lines=['công cha như núi thái sơn','nghĩa mẹ như nước trong nguồn chảy ra','một lòng thờ mẹ kính cha','cho tròn chữ hiếu mới là đạo con'];
   const withLine=e=>lines.some(l=>V.flat(e.textContent).includes(V.flat(l)));
   const p=V.bestP(d,withLine),manyP=V.q(d,'p').filter(withLine).length>1;
   const missing=lines.find(l=>!V.flat(d.body.textContent).includes(V.flat(l)));
   return V.result([
    V.chk('hr',hr&&h2&&(h2.compareDocumentPosition(hr)&Node.DOCUMENT_POSITION_FOLLOWING),'Có thẻ hr nằm dưới tiêu đề',V.inComment(html,'hr')?'Thẻ <hr> em viết đang nằm trong dòng chú thích <!-- … -->, nên trình duyệt bỏ qua. Em viết <hr> ra ngoài chú thích (hoặc xóa dòng chú thích).':'Thêm <hr> (không cần thẻ đóng) vào dòng ngay dưới thẻ h2.'),
    V.chk('br',p&&V.brIn(p)>=3&&!manyP,'Đoạn ca dao được tách thành 4 dòng bằng thẻ br',manyP?'Em đang chia ca dao thành nhiều thẻ <p>. Mỗi thẻ p là một đoạn riêng, cách nhau một khoảng. Muốn chỉ xuống dòng, em gộp lại thành một thẻ <p> duy nhất và đặt <br> giữa các câu.':V.brMessage(p,3,'đoạn ca dao')),
    V.chk('text',!missing,'Nội dung chữ được giữ nguyên',missing?'Chưa thấy câu “'+missing+'”. Em kiểm tra chính tả, đừng xóa hoặc sửa chữ của ca dao.':'')])
  }},
 {id:'learn-emphasis',name:'Nhấn mạnh chữ',title:'Thẻ định dạng kiểu chữ',file:'trang.html',
  intro:'Muốn nhấn mạnh một cụm chữ, em đặt cụm chữ đó trong cặp thẻ định dạng: <strong> chữ đậm, <em> chữ nghiêng, <mark> tô nền vàng như bút dạ quang, <del> gạch ngang chữ. Strong và em còn mang ý nghĩa “quan trọng”, nên được khuyến khích dùng hơn b và i.',
  parts:[['<p>Môn '],['<strong>','Thẻ strong: chữ đậm, nhấn mạnh nội dung quan trọng',1],['Tin học'],['</strong>','',1],[' rất '],['<em>','Thẻ em: chữ nghiêng, nhấn mạnh về mặt ý nghĩa',2],['hay'],['</em>','',2],[', '],['<mark>','Thẻ mark: tô nền vàng, đánh dấu nội dung cần chú ý',4],['nhớ ôn bài'],['</mark>','',4],[' và '],['<del>','Thẻ del: gạch ngang chữ, cho biết nội dung bị bỏ',5],['đừng học tủ'],['</del>','',5],['.</p>']],
  previewHtml:'<p>Môn Tin học rất hay, nhớ ôn bài và đừng học tủ.</p>\n<p>Môn <strong>Tin học</strong> rất <em>hay</em>, <mark>nhớ ôn bài</mark> và <del>đừng học tủ</del>.</p>',
  effect:'Dòng trên là chữ thường. Dòng dưới dùng bốn thẻ: Tin học đậm, hay nghiêng, nhớ ôn bài được tô nền vàng, đừng học tủ bị gạch ngang.',
  starter:'<p>Bài kiểm tra diễn ra vào thứ Sáu.</p>\n<p>Em cần ôn kỹ thẻ tiêu đề.</p>\n<p>Thời gian làm bài: 90 phút, rút xuống còn 45 phút.</p>\n<p>Chúc các em làm bài thật tốt.</p>\n',
  task:['Dùng thẻ <strong> cho cụm “thứ Sáu”.','Dùng thẻ <em> cho cụm “thẻ tiêu đề”.','Dùng thẻ <del> cho cụm “90 phút”.','Dùng thẻ <mark> cho cụm “làm bài thật tốt”.','Chỉ bọc đúng cụm chữ được yêu cầu, không bọc cả câu.'],
  validate(html){const d=V.parseHTML(html),exact=(sel,s)=>V.q(d,sel).some(e=>V.text(e)===V.norm(s));return V.result([
   V.chk('strong',exact('strong,b','thứ Sáu'),'Cụm “thứ Sáu” nằm trong thẻ strong','Viết <strong>thứ Sáu</strong>, chỉ bọc đúng hai chữ này.'),
   V.chk('em',exact('em,i','thẻ tiêu đề'),'Cụm “thẻ tiêu đề” nằm trong thẻ em','Viết <em>thẻ tiêu đề</em>.'),
   V.chk('del',exact('del,s','90 phút'),'Cụm “90 phút” nằm trong thẻ del','Viết <del>90 phút</del>.'),
   V.chk('mark',exact('mark','làm bài thật tốt'),'Cụm “làm bài thật tốt” nằm trong thẻ mark','Viết <mark>làm bài thật tốt</mark>.')])}},
 {id:'learn-supsub',name:'Số mũ, chỉ số',title:'Thẻ sup, sub và small',file:'trang.html',
  intro:'Khi viết công thức, ta cần chữ nhỏ nâng lên hoặc hạ xuống. Thẻ <sup> viết chỉ số trên (số mũ), thẻ <sub> viết chỉ số dưới, thẻ <small> làm chữ nhỏ hơn bình thường.',
  parts:[['<p>x'],['<sup>','Thẻ sup: nâng chữ lên cao, dùng viết số mũ',1],['2'],['</sup>','',1],[' + y'],['<sup>','',1],['2'],['</sup>','',1],[' = 25<br>Nước: H'],['<sub>','Thẻ sub: hạ chữ xuống thấp, dùng viết chỉ số dưới',2],['2'],['</sub>','',2],['O<br>'],['<small>','Thẻ small: làm chữ nhỏ hơn chữ xung quanh',4],['(Ghi chú nhỏ)'],['</small>','',4],['</p>']],
  previewHtml:'<p>Không dùng thẻ: x2 + y2 = 25 và H2O</p>\n<p>Có dùng thẻ: x<sup>2</sup> + y<sup>2</sup> = 25 và H<sub>2</sub>O<br><small>(Ghi chú nhỏ)</small></p>',
  effect:'Dòng trên viết các con số ngang hàng nên dễ đọc nhầm (x2 là x nhân 2?). Dòng dưới nâng số 2 lên thành số mũ và hạ số 2 xuống thành chỉ số.',
  starter:'<p>Diện tích hình vuông cạnh a là a2.</p>\n<p>Công thức hóa học của nước là H2O.</p>\n<p>Gọi nghiệm của phương trình là x1.</p>\n',
  task:['Viết số 2 trong “a2” thành số mũ bằng thẻ <sup>.','Viết số 2 trong “H2O” thành chỉ số dưới bằng thẻ <sub>.','Viết số 1 trong “x1” thành chỉ số dưới bằng thẻ <sub>.','Chỉ bọc đúng chữ số, không bọc cả chữ cái.'],
  validate(html){const h=V.parseHTML(html).body.innerHTML.replace(/\s+/g,'');return V.result([
   V.chk('sup',/a<sup>2<\/sup>/i.test(h),'a2 viết thành a có số mũ 2','Viết a<sup>2</sup>: chữ a ở ngoài thẻ, chỉ số 2 nằm trong thẻ sup.'),
   V.chk('sub1',/H<sub>2<\/sub>O/i.test(h),'H2O viết thành H có chỉ số dưới 2','Viết H<sub>2</sub>O.'),
   V.chk('sub2',/x<sub>1<\/sub>/i.test(h),'x1 viết thành x có chỉ số dưới 1','Viết x<sub>1</sub>.')])}},
 {id:'learn-font',name:'Màu, phông, cỡ chữ',title:'Định dạng phông chữ bằng style',file:'trang.html',
  intro:'Trong thuộc tính style, em đổi màu bằng color, phông chữ bằng font-family, cỡ chữ bằng font-size. Muốn đặt nhiều định dạng cùng lúc, viết liên tiếp trong cùng dấu ngoặc kép và ngăn cách bằng dấu chấm phẩy (;). Thẻ <span> áp dụng định dạng cho một cụm chữ trong dòng, còn <div> tạo cả một khối riêng.',
  parts:[['<p '],['style="','Thuộc tính style. Nhiều định dạng nằm trong cùng dấu ngoặc kép',2],['color:rgb(205,0,0)','Màu chữ. Viết tên màu tiếng Anh (red, green…) hoặc mã rgb(đỏ, lục, lam)',4],['; '],['font-family:Tahoma','Phông chữ: tên phông, ví dụ Tahoma, Arial, Times New Roman',5],['; '],['font-size:20px','Cỡ chữ: số kèm đơn vị, ví dụ 20px (px là điểm ảnh)',3],['"','Đóng ngoặc kép, kết thúc thuộc tính',2],['>Đoạn chữ đỏ, phông Tahoma, cỡ 20px</p>\n<p>Chữ thường, '],['<span ','Thẻ span: áp dụng định dạng cho một cụm chữ trong dòng, không xuống dòng',1],['style="color:green"','Chỉ cụm chữ trong span mới có màu xanh lá',2],['>','',1],['một cụm chữ xanh'],['</span>','',1],['</p>']],
  previewHtml:'<p style="color:rgb(205,0,0); font-family:Tahoma; font-size:20px">Đoạn chữ đỏ, phông Tahoma, cỡ 20px</p>\n<p>Chữ thường, <span style="color:green">một cụm chữ xanh</span></p>',
  previewHeight:170,
  effect:'Đoạn thứ nhất đổi cả màu, phông và cỡ chữ cùng lúc. Ở dòng thứ hai, span chỉ đổi màu cho một cụm chữ, phần còn lại giữ nguyên.',
  starter:'<h2>Thông báo</h2>\n<p>Lớp 12A họp lúc 7 giờ sáng thứ Hai tại phòng Tin học.</p>\n<!-- Thêm style cho thẻ p và dùng span làm nổi bật “phòng Tin học”, giống mẫu -->\n',
  task:['Thêm thuộc tính style cho thẻ <p> của thông báo, gồm 3 định dạng: color:green, font-family:Tahoma, font-size:20px.','Ngăn cách các định dạng bằng dấu chấm phẩy (;).','Bọc cụm “phòng Tin học” trong thẻ <span> có style="color:red".'],
  validate(html){const d=V.parseHTML(html),p=V.q(d,'p[style]');return V.result([
   V.chk('color',p.some(e=>V.colorOf(V.styleOf(e,'color'))===V.colorOf('green')),'Đoạn văn có màu chữ green','Thêm color:green vào style của thẻ p.'),
   V.chk('family',p.some(e=>V.norm(V.styleOf(e,'font-family')).includes('tahoma')),'Đoạn văn dùng phông Tahoma','Thêm font-family:Tahoma, nhớ ngăn cách bằng dấu chấm phẩy (;).'),
   V.chk('size',p.some(e=>V.declOf(e,'font-size').replace(/\s+/g,'')==='20px'),'Đoạn văn có cỡ chữ 20px','Thêm font-size:20px (có đơn vị px).'),
   V.chk('span',V.q(d,'span').some(e=>V.text(e)==='phòng tin học'&&V.colorOf(V.styleOf(e,'color'))===V.colorOf('red')),'Cụm “phòng Tin học” nằm trong span màu đỏ','Viết <span style="color:red">phòng Tin học</span>.')])}}
],render(index=0){Activity.render('learning',this.activities,index)}};
Learning.activities.forEach(a=>{a.sample=a.parts.map(p=>p[0]).join('')});
