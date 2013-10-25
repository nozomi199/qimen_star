if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  if(!QIMEN_STAR.hasOwnProperty('jiqi')) return;
  //
  function calc(_in,_kook) {
    // 設定輸出物件
    var _out = new Object();
    // 排四柱
    var fcol  = _in.bazi;
    var tcol0 = new Array;
    var dcol0 = new Array;
    for(var i = 6; i > -1 ; i -= 2) tcol0.push(fcol[i]);
    for(var i = 7; i > -1 ; i -= 2) dcol0.push(fcol[i]);
    //
    // 計時家奇門三元
    var idx1 =  "甲乙丙丁戊己庚辛壬癸".indexOf(fcol[4]);
    var idx2 = "子丑寅卯辰巳午未申酉戌亥".indexOf(fcol[5]);
    idx2 = idx2 - idx1 % 5;
    if(idx2 < 0) idx2 += 12;
    idx2 = idx2 % 3;
    if(idx2 > 0) {
      idx2 = (idx2 == 1)? 2 : 1;
    }
    _out.san_yuen = idx2; // 節氣三元
    //
    // 計算當前局數
    // 計陰陽遁
    var dun_type = 2; // 0為陰遁, 1為陽遁, 其餘為錯誤
    var kook = [8,9,1,3,4,5,4,5,6,9,8,7,2,1,9,7,6,5,6,5,4,1,2,3]; // 局數
    var using_kook = kook[(_in.currentJiqiIdx+1)%24];  //局數
    //console.log(jtoday, jqTime[21], jqTime[9]);
    if( _in.julian > _in.wholeYear[9] && _in.julian < _in.wholeYear[21]) {
      // 陰遁
      dun_type = 0;
      for(var i = 0; i < idx2; i++) {
        using_kook -= 6;
        while(using_kook < 1) using_kook += 9;
      }
    } else {
      // 陽遁
      dun_type = 1;
      for(var i = 0; i < idx2; i++) {
        using_kook += 6;
        while(using_kook > 9) using_kook -= 9;
      }
    }
    _out.dun = dun_type; // 陰陽遁
    //_out.dun = _yin_yang; // 陰陽遁
    //_out.kook = using_kook; //局數
    _out.kook = _kook; //局數
    using_kook = _kook;
    /** 重計時旬首 **/
    //　時旬首
    var chun_sau = "子丑寅卯辰巳午未申酉戌亥".indexOf(dcol0[0]) - "甲乙丙丁戊己庚辛壬癸".indexOf(tcol0[0]);
    if(chun_sau < 0) chun_sau += 12;
    _out.chun_san = chun_sau; // 時旬首, 計時空亡用
    // 建地盤
    var dei_pan = ""; // 建地盤
    if(dun_type == 1) { // 陽遁
      //var dei_pan = " 戊己庚辛壬癸丁丙乙戊己庚辛壬癸丁丙乙".substr(9-using_kook+1,9); // 地盤
      var dei_pan = "戊己庚辛壬癸丁丙乙戊己庚辛壬癸丁丙乙".substr(9-using_kook+1,9); // 地盤
    } else { // 陰遁
      //var dei_pan = " 戊乙丙丁癸壬辛庚己戊乙丙丁癸壬辛庚己".substr(9-using_kook+1,9);
      var dei_pan = "戊乙丙丁癸壬辛庚己戊乙丙丁癸壬辛庚己".substr(9-using_kook+1,9);
    }
    _out.dei_pan = dei_pan.substr();
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
    } else {
      var jik_fu_idx = 1 + using_kook - chun_sau;
      while(jik_fu_idx > 9) jik_fu_idx -= 9;
      while(jik_fu_idx < 1) jik_fu_idx += 9;
      if(_tmp == '甲') _tmp = " 戊己庚辛壬癸".charAt(chun_sau);
      jik_fu_star = 1 + using_kook - " 戊己庚辛壬癸丁丙乙".indexOf(_tmp);
      while(jik_fu_star < 1) jik_fu_star += 9;
    }
    _out.jik_fu = "，蓬芮衝輔禽心柱任英".charAt(jik_fu_idx); // 值符
    _out.jik_fu_house = jik_fu_star;                       // 值符落宮
    if(jik_fu_star == 5) jik_fu_star = 2; // 禽星寄二宮
    //
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
    _out.ji_zi = " 休死傷杜中開驚生景".charAt(jik_fu_idx); // 值使
    _out.ji_zi_house = jik_fu_mun; // 值使落宮
    // 計算星盤
    var houses_star_target = "18349276".indexOf(jik_fu_star);
    var houses_star_idx = "183492761834927618349276".substr(8-houses_star_target+1, 8);
    //console.log("houses_star_idx1:",houses_star_idx);
    var houses_star_idx  = [1,8,3,4,9,2,7,6]; var _jfi = (jik_fu_idx == 5 ? 2 : jik_fu_idx);
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
    _out.houses_star = houses_star.join("");
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
    _out.tin_pan = tin_pan.join("");
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
    _out.house_door = house_door.join("");
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
    _out.houses_god = god_pan.join("");
    //
    return _out;
  }
  _e.qimen2 = new Object();
  var _q = _e.qimen2;
  _q.calc = function(jiqi,_kook) {
    return calc(jiqi,_kook);
  };
})(QIMEN_STAR);