if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
   "use strict";
   var _GAN = "　甲乙丙丁戊己庚辛壬癸";  
   var _CHI = "　子丑寅卯辰巳午未申酉戌亥";
   var _QIYI = " 戊己庚辛壬癸丁丙乙";
   var _CHUN = "　戊丑癸卯壬巳辛未庚酉己亥";
   
   function minQimen(h,i,s)
   {
      var _dun = h < 12 ? 1 : 0;
      var kooks = "174285396852963174396417528417528639936825714258147936714693582693582471";
      var _yuen  = kooks.substr(h*3,3);
      var sec = i * 60 + s;
      var kook = 0;
      if(sec > 2399) kook = _yuen[2];
      else if (sec> 1199) kook = _yuen[1];
      else kook = _yuen[0];
      var fa_kap = sec % 1200;
      fa_kap = (fa_kap - fa_kap % 20)/20;//console.log(fa_kap);
      var tin_gan = "甲乙丙丁戊己庚辛壬癸".charAt(fa_kap % 10);
      var dei_zhi = "子丑寅卯辰巳午未申酉戌亥".charAt(fa_kap % 12);
      //console.log('時間',h,i,s,'天地', tin_gan, dei_zhi,'遁',_dun,'局',kook);
      return calc(_dun, kook, tin_gan+dei_zhi);
   }
   
   function calc(_dun, _kook, gan_chi) {
    "use strict";
    //var d = new Date(); //當下
    //
    var tcol0 = [gan_chi[0]];
    var dcol0 = [gan_chi[1]]; 
    // 計算當前局數
    // 計陰陽遁
    var dun_type = _dun; // 0為陰遁, 1為陽遁, 其餘為錯誤
    var using_kook = _kook;  //局數
    /** 重計時旬首 **/
    //　時旬首
    var chun_sau = "子丑寅卯辰巳午未申酉戌亥".indexOf(dcol0[0]) - "甲乙丙丁戊己庚辛壬癸".indexOf(tcol0[0]);
    if(chun_sau < 0) chun_sau += 12;
    // 建地盤
    var dei_pan = ""; // 建地盤
    if(dun_type == 1) { // 陽遁
      //var dei_pan = " 戊己庚辛壬癸丁丙乙戊己庚辛壬癸丁丙乙".substr(9-using_kook+1,9); // 地盤
      var dei_pan = "戊己庚辛壬癸丁丙乙戊己庚辛壬癸丁丙乙".substr(9-using_kook+1,9); // 地盤
    } else { // 陰遁
      //var dei_pan = " 戊乙丙丁癸壬辛庚己戊乙丙丁癸壬辛庚己".substr(9-using_kook+1,9);
      var dei_pan = "戊乙丙丁癸壬辛庚己戊乙丙丁癸壬辛庚己".substr(9-using_kook+1,9);
    }//console.log(dei_pan);
    // 找值符
    var chun_sau = " 子戌申午辰寅".indexOf("子寅辰午申戌".charAt(parseInt(chun_sau/2)));
    var jik_fu_idx = 0;
    var jik_fu_star = 0;
    var _tmp = tcol0[0];
    if(dun_type == 1) { // 陽遁
      var jik_fu_idx = using_kook + chun_sau - 1;
      while(jik_fu_idx > 9) jik_fu_idx -= 9;
      while(jik_fu_idx < 1) jik_fu_idx += 9;
      if(_tmp == '甲') _tmp = " 戊己庚辛壬癸".charAt(chun_sau);
      jik_fu_star = " 戊己庚辛壬癸丁丙乙".indexOf(_tmp) + using_kook - 1;
      while(jik_fu_star > 9) jik_fu_star -= 9;
      while(jik_fu_star < 1) jik_fu_star += 9;
    } else {
      var jik_fu_idx = 1 + using_kook - chun_sau;
      while(jik_fu_idx > 9) jik_fu_idx -= 9;
      while(jik_fu_idx < 1) jik_fu_idx += 9;
      if(_tmp == '甲') _tmp = " 戊己庚辛壬癸".charAt(chun_sau);
      jik_fu_star = 1 + using_kook - " 戊己庚辛壬癸丁丙乙".indexOf(_tmp);
      while(jik_fu_star < 1) jik_fu_star += 9;
      while(jik_fu_star > 9) jik_fu_star -= 9;
    }
    //console.log('jik_fu_star',jik_fu_star);
    //if(jik_fu_star == 5) jik_fu_star = 2; // 禽星寄二宮
    if(jik_fu_star == 5) jik_fu_star = 2; // 禽星寄二宮
    // 計值使, 不分陰陽遁
    var jik_fu_mun = 0;
    if(dun_type == 1) {
      jik_fu_mun = jik_fu_idx + " 甲乙丙丁戊己庚辛壬癸".indexOf(tcol0[0]) - 1;
      while(jik_fu_mun > 9) jik_fu_mun -= 9;
    } else {
      jik_fu_mun = jik_fu_idx - " 甲乙丙丁戊己庚辛壬癸".indexOf(tcol0[0]) + 1;
      while(jik_fu_mun < 1) jik_fu_mun += 9;
    }
    //console.log("jik_fu_mun:",jik_fu_mun);
    if(jik_fu_mun == 5) jik_fu_mun = 2; // 中宮寄坤二宮
    // 計算星盤
    var houses_star_target = "18349276".indexOf(jik_fu_star);
    var houses_star_idx = "183492761834927618349276".substr(8-houses_star_target+1, 8);
    //console.log("houses_star_idx1:",houses_star_idx);
    var houses_star_idx  = [1,8,3,4,9,2,7,6]; var _jfi = (jik_fu_idx == 5 ? 2 : jik_fu_idx);
    //console.log('exit');return;
    while(houses_star_idx[houses_star_target] != _jfi) {
      houses_star_idx.unshift(houses_star_idx.pop());
    }
    var star_pan = new Array; //星盤
    for(var i = 1; i < 10; i++)
    {
      if(i == 5) {
        star_pan.push(5);
      } else {
        star_pan.push(houses_star_idx["18349276".indexOf(i)]);
      }
    }
    var houses_star = new Array;
    for(var i = 0; i < 9; i++) {
      houses_star.push("，蓬苪衝輔禽心柱任英".charAt(star_pan[i]));
    }
    // 計算天盤
    var tin_pan = new Array;  // 天盤
    if( dun_type  == 1) { // 陽遁
      for(var i = 0; i < 9;i++) 
      {
        var _tin = star_pan[i] - using_kook + 1;
        while(_tin < 1) _tin += 9;
        tin_pan.push(" 戊己庚辛壬癸丁丙乙".charAt(_tin));
      }
    } else {
      for(var i = 0; i < 9; i++) {
        var _tin = using_kook - star_pan[i] + 1;
        while(_tin < 1) _tin += 9;
        tin_pan.push(" 戊己庚辛壬癸丁丙乙".charAt(_tin));
      }
    }
    
    // 計算八門
    var houses_door_target = "18349276".indexOf(jik_fu_mun);
    var houses_door_idx  = [1,8,3,4,9,2,7,6];
    //console.log("houses_door_target: ",houses_door_target);
    //return;
    var _jfi = (jik_fu_idx == 5 ? 2 : jik_fu_idx);
    while(houses_door_idx[houses_door_target] != _jfi) {
      houses_door_idx.unshift(houses_door_idx.pop());
    }
    
    var door_pan = new Array; //門盤(八門)
    for(var i = 1; i < 10; i++)
    {
      if(i == 5) {
        door_pan.push(5);
      } else {
        door_pan.push(houses_door_idx["18349276".indexOf(i)]);
      }
    }
    var house_door = new Array;
    for(var i = 0; i < 9; i++) {
      house_door.push("，休死傷杜　開驚生景".charAt(door_pan[i]));
    }
    // 計算八神
    var houses_god;
    if(dun_type == 1) { // 陽遁-順排
      var houses_god_target = "18349276".indexOf(jik_fu_star);
      houses_god = ['符','蛇','陰','合','白','玄','地','天'];
      while(houses_god[houses_god_target] != '符') {
        houses_god.unshift(houses_god.pop());
      }
    } else {
      var houses_god_target = "18349276".indexOf(jik_fu_star);
      houses_god = ['符','天','地','玄','白','合','陰','蛇'];
      while(houses_god[houses_god_target] != '符') {
        houses_god.unshift(houses_god.pop());
      }
    }
    var god_pan = new Array; //神盤(八神)
    for(var i = 1; i < 10; i++)
    {
      if(i == 5) {
        god_pan.push('　');
      } else {
        god_pan.push(houses_god["18349276".indexOf(i)]);
      }
    }
    /**
    // 輸出天盤
    document.write("天盤：",tin_pan.join(""),"\r\n");
    // 輸出地盤
    document.write("地盤：",dei_pan,"\r\n");
    // 輸出星盤
    document.write("星盤：",houses_star.join(""),"\r\n");
    // 輸出門盤
    document.write("門盤：",house_door.join(""),"\r\n");
    // 輸出八神
    document.write("神盤：",god_pan.join(""),"\r\n");
    // 完結
    **/
    //console.log({'info':{'干支':gan_chi,'遁':_dun?'陽':'陰','局':_kook },'星':tin_star, '天':tin_pan, '地':dei_pan, '門':door_pan, '神':god_pan});
    houses_star.unshift("");
    tin_pan.unshift("");
    dei_pan = " " + dei_pan;
    house_door.unshift("");
    god_pan.unshift("");    
    return {'info':{'干支':gan_chi,'遁':_dun?'陽':'陰','局':_kook,'符':" 蓬苪沖輔禽心柱任英".charAt(jik_fu_idx) },'星':houses_star, '天':tin_pan, '地':dei_pan, '門':house_door, '神':god_pan};
  }
   //console.log(minQimen(13,5,21));
   _e.minQimen = minQimen;
})(QIMEN_STAR);