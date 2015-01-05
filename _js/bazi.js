if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  function info(y,m,d,h,i,s,ms,_g) {
    // output
    var _out = new Object();
    //
    var jiqi = _e.jiqi.GetJiqiInfo(y,m,d,h,i,s,ms);
    var gender = _g;
    var fcol   = jiqi.bazi;
    var jtoday = jiqi.julian;
    var jqpos  = jiqi.currentJiqiIdx - 1;
    var jqTime = jiqi.wholeYear.slice();
    // add bazi into output
    _out.bazi = jiqi.bazi;
    // 起大運
    var posneg = ("甲乙丙丁戊己庚辛壬癸".indexOf(fcol.charAt(0))+1) % 2; // 陰陽年: 陰年0, 陽年1
    var start_time = 0;
    //
    
    if((gender == 1 && posneg == 1) || (gender == 0 && posneg == 0)) { // 陽男, 陰女
      var jqpos2 = jqpos + (jqpos%2 == 0 ? 2 : 1);
      if(jqpos2 > 23) {
        jqpos2 = 0;
        _e.jiqi.CalJiqiByYear(y+1,m,d,h,i,s,jqTime);
      }
      start_time = jqTime[jqpos2] - jtoday;//console.log('陽男陰女',jtoday,jqTime[jqpos2],start_time,jqpos,jqpos2);
    } else { // 陰男, 陽女
      var jqpos2 = jqpos - (jqpos%2 == 0 ? 0 : 1);
      if(jqpos2 < 0) {
        jqpos2 = 22;
        _e.jiqi.CalJiqiByYear(y-1,m,d,h,i,s,jqTime);
      }
      start_time = jtoday - jqTime[jqpos2];//console.log('陰男陽女',jtoday,jqTime[jqpos2],start_time,jqpos,jqpos2);
    }
    //console.log('gender',gender,'posneg',posneg,'jqpos2',jqpos2);
    // 計小運
    var start_small = start_time / 3;
    _out.small = new Array();
    if(start_small < 1) {
      _out.small.push("即年入大運");
    } else {
      var tinIdx = "甲乙丙丁戊己庚辛壬癸".indexOf(fcol[6]);
      var deiIdx = "子丑寅卯辰巳午未申酉戌亥".indexOf((fcol[7]));
      if((gender == 1 && posneg == 1) || (gender == 0 && posneg == 0)) { // 陽男, 陰女
        for(var i = 1; i <= start_small; i++) {
          _out.small.push(
            "甲乙丙丁戊己庚辛壬癸".charAt((tinIdx+i)%10) +
            "子丑寅卯辰巳午未申酉戌亥".charAt((deiIdx+i)%12)
          );
        }
      } else {// 陽女, 陰男
        for(var i = 1; i <= start_small; i++) {
          _out.small.push(
            "甲乙丙丁戊己庚辛壬癸".charAt((tinIdx-i)%10) +
            "子丑寅卯辰巳午未申酉戌亥".charAt((deiIdx-i)%12)
          );
        }
      }
    }
    // 計大運起始
    //console.log(jtoday,_e.jiqi.JTime(jtoday),start_time);
    start_time = jtoday + 365.25 * (start_time / 3.0);
    _out.start = start_time;
    _out.start_text = _e.jiqi.JTime(start_time);
    // 計一百二十年大運, 參照吠陀占星及法達星限120年大限
    _out.big = new Array();
    var tinIdx = "甲乙丙丁戊己庚辛壬癸".indexOf(fcol[2]);
    var deiIdx = "子丑寅卯辰巳午未申酉戌亥".indexOf((fcol[3]));
    if((gender==1 && posneg==1) || (gender==0 && posneg==0)) { // 陽男, 陰女
      for(var i = 1; i < 13; i++) {
        _out.big.push(
          "甲乙丙丁戊己庚辛壬癸".charAt((tinIdx+i)%10)+
          "子丑寅卯辰巳午未申酉戌亥".charAt((deiIdx+i)%12)
        );
      }
    } else { // 陰男, 陽女
      for(var i = 1; i < 13; i++) {
        var _tmp = (tinIdx-i)%10;
        if(_tmp < 0) _tmp += 10;
        var tcol = "甲乙丙丁戊己庚辛壬癸".charAt(_tmp);
        var _tmp = (deiIdx-i)%12;
        if(_tmp < 0) _tmp += 12; 
        var dcol = "子丑寅卯辰巳午未申酉戌亥".charAt(_tmp);
        _out.big.push(tcol+dcol);
      }
    }
    // return
    return _out;
  }
  /*
  var d = new Date();
  console.log(info(d.getFullYear(),d.getMonth()+1,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds(),1));
  */
  _e.bazi = new Object();
  _e.bazi.info = function(y,m,d,h,i,s,ms,_g) {
    return info(y,m,d,h,i,s,ms,_g);
  };
})(QIMEN_STAR || {});