if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  _e.others = new Object();
  _e.others.calc = function(jiqi) {
	  if(!jiqi.jd) return 0;
	  var out = new Object();
	  out.weekday = Math.floor(jiqi.jd+2)%7;
	  //
	  var t = jiqi.julian+0.5 - Math.floor(jiqi.julian+0.5); t = 86400 * t;
	  if(t > 82799) out.weekday += 1; while(out.weekday > 6) out.weekday -= 7;
	  //out.daypat  = (jiqi.jd+189)%28;
	  var z = "子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[5]);
	  //console.log("局",z%4);
	  // 星期一開始
	  //var block = ["畢翼箕奎鬼氐虛","危觜軫斗婁柳房","心室參角牛胃星","張尾壁井亢女昴"];
	  // -4736年起第一元甲子虛宿(次第:11)
	  var year = jiqi.year;
	  if(jiqi.bazi[3] == '子' || jiqi.bazi[3] =='丑') year = year - 1;
	  year = (year+116)%420;//console.log("other.year",year)
	  out.yearpat = (year)%28+10; while(out.yearpat > 27) out.yearpat -=28;
	  out.yearpat2 = "角亢氐房心尾箕斗牛女虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫".charAt(out.yearpat);
	  
	  // 星期日開始
	  var block = ["虛畢翼箕奎鬼氐","房危觜軫斗婁柳","星心室參角牛胃","昴張尾壁井亢女"];
	  out.daypat2 = block[z%4][out.weekday];//
	  // 時禽推演
	  var block = [ "虛危室壁奎婁胃昴畢觜參井",  //日曜日57,64
					"鬼柳星張翼軫角亢氐房心尾", //月曜日58
					"箕斗牛女虛危室壁奎婁胃昴", //火曜日59
					"畢觜參井鬼柳星張翼軫角亢", //水曜日60
					"氐房心尾箕斗牛女虛危室壁", //木曜日61
					"奎婁胃昴畢觜參井鬼柳星張", //金曜日62
					"翼軫角亢氐房心尾箕斗牛女"]; //土曜日7,14,21,28,35,42,49,56,63,
	  // 月禽起法
      var yuen_y = Math.floor(year/60);//console.log("年禽七元",yuen_y);
	  out.yuen_y = "一二三四五六七".charAt(yuen_y);
	  var yuen_y2 = year%7;// console.log("演禽五性",yuen_y2);
	      yuen_y2 += yuen_y;if(yuen_y2 > 6) yuen_y2 -= 7;
	  out.monpat = block[yuen_y2]["寅卯辰巳午未申酉戌亥子丑".indexOf(jiqi.bazi[3])];
	  //(原起法)
	  //var z = "子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[7]);
	  //out.hourpat = block[(out.weekday)][z];
	  // 求氣將
	  var a = "角亢氐房心尾箕斗牛女虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫";
	  var idxA = a.indexOf(out.hourpat);
	  var idxB = "甲乙丙丁戊己庚辛壬癸".indexOf(jiqi.bazi[4]);
	  var idxB1 = idxB;
	  var idxB2 = "子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[5]);
	  while(idxB1) {
		  idxB2--;idxB1--;
		  if(idxB2 < 0) idxB2 += 12;
	  }
	  //console.log(idxA,idxB1,idxB2);
	  var b =  [0,0,50,0,40,0,
				30,0,20,0,10,0];
				
	  var c = b[idxB2] + idxB;
		// 計七元
		var x = a.indexOf(out.daypat2) - c;while(x < 0) x+=28;
		out.yuen_d = "一二三四五六七".charAt("虛奎畢鬼翼氐箕".indexOf(a[x]));
		out.yuen0 = "虛奎畢鬼翼氐箕".indexOf(a[x]);
		var z = "子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[7]);
		out.hourpat = block[(out.weekday+out.yuen0)%7][z];
	  // 計氣將
	  var qiman = 45;
	  if(c > 44) qiman = 45;
	  else if(c > 29) qiman = 30;
	  else if(c > 14) qiman = 15;
	  else qiman = 0;
	  var d = c - qiman;//console.log("d",d);
	  var qiman_n = a.indexOf(out.daypat2) - d;
	  while(qiman_n < 0) qiman_n+=28;//console.log("qiman_n",qiman_n);
	  out.qiman = a[qiman_n];
	  // 計翻禽
	  var init = "角亢氐房心尾箕斗牛女虛危室壁奎婁胃昴畢觜參井鬼柳星張翼軫";
	  var init1 = init.substr(qiman_n) + init.substr(0,qiman_n);
	  var init2 = init1.indexOf(out.hourpat);//console.log(init1);
	  var init3 = init1.substr(init2) + init1.substr(0,init2);//console.log(init3);
	  out.fan_kam = init3[init2];
	  // 計倒將
	  var init4 = init3.substr(init2) + init3.substr(0,init2);//console.log(init4);
	  out.dou_chm = init4[init2];
	  // 計活曜
	  var ii = [10,8,26,18,5,14,2];
	  var i1 = init.indexOf(out.hourpat)%7;
	  var ii1 = init.substr(ii[i1])+init.substr(0,ii[i1]);
	  var i2 = ii1.indexOf(out.hourpat);
	  var ii2 = ii1.substr(i2)+ii1.substr(0,i2);
	  var i3 = "子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[7]);
	  var i4 = 2-i2;while(i4 < 0) i4+=12;
	  
	  while(i4!=i3){
		  i4+=1;
		  while(i4 > 11)i4-=12;
	  }
		//var i3 = "子丑寅卯辰巳午未申酉戌亥".substr(i2)+"子丑寅卯辰巳午未申酉戌亥".substr(0,i2);
		//i2 = 2-i2;while(i2<0)i2+=12;i2+=i3.indexOf(jiqi.bazi[7]);while(i2>11)i2-=12;
	  //console.log(ii1);
	  //console.log(ii2);
	  out.wood_yiu = ii2[i4];//console.log(ii2[i4]);
	  // output string
	  out.tostring = function(){
		return "星期"+"日一二三四五六".charAt(this.weekday);
		//return "星期"+"日一二三四五六".charAt(this.weekday)+",年禽:"+out.yearpat2+",月禽:"+out.monpat+",日禽:"+this.daypat2+",時禽:"+this.hourpat+",氣將:"+this.qiman+
		//	",\n    翻禽:"+this.fan_kam+",倒將:"+this.dou_chm+",七元:"+this.yuen;
	  }
	  return out;
  };
})(QIMEN_STAR || {});