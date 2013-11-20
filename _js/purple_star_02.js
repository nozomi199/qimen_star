if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  if(!QIMEN_STAR.hasOwnProperty('jiqi')) return;
  // 
  /**
   * 計紫白飛星年盤
   */
  function CalYear(yy,mm,dd,hh,ii,ss) {
    var jiqi = QIMEN_STAR.jiqi.CalCurrentJiqiIdx(yy,mm,dd,hh,ii,ss);
    var bazi = QIMEN_STAR.jiqi.GetBazi(yy,mm,dd,hh,ii,ss);
    if(jiqi > 21) yy -= 1; 
    var period0 = parseInt((parseInt(yy) - 4)/60)%3;
    if(period0 == 0) period0 = 3; // 計三元(上中下元)
    var _output = "一二三四五六七八九一二三四五六七八九一二三四五六七八九";
    // 計數
    var chun_sau = "子丑寅卯辰巳午未申酉戌亥".indexOf(bazi[1]) - "甲乙丙丁戊己庚辛壬癸".indexOf(bazi[0]);
    if(chun_sau < 0) chun_sau += 12;
    var _dz = "子丑寅卯辰巳午未申酉戌亥子丑寅卯辰巳午未申酉戌亥".substr(chun_sau,10);
    var chun_sau = "子戌申午辰寅".indexOf("子寅辰午申戌".charAt(parseInt(chun_sau/2)));
    var year_point_idx = chun_sau*10 + _dz.indexOf(bazi[1])+1;
    //console.log(yy,period0, chun_sau, _dz.indexOf(bazi[1]), year_point_idx, _dz);
    var _rtn = -1;
    switch(period0) {
      case 1: // 上元
        _rtn = (65 - year_point_idx)%9;break;
      case 2: // 中元
        _rtn = (68 - year_point_idx)%9;break;
      case 3: // 下元
        _rtn = (62 - year_point_idx)%9;break
    }
    if(_rtn < 1) _rtn = 9;
    var _output = " 一二三四五六七八九".charAt(_rtn);
    var _output = "一二三四五六七八九一二三四五六七八九".indexOf(_output,5);
    return "一二三四五六七八九一二三四五六七八九".substr(_output-4,9);
  }
  function CalMonth(yy,mm,dd,hh,ii,ss) {
    //var jiqi = QIMEN_STAR.jiqi.CalCurrentJiqiIdx(yy,mm,dd,hh,ii,ss);
    //var dun_type = 0;
    //if(jiqi < 10 || jiqi > 20) dun_type = 1;
    var bazi = QIMEN_STAR.jiqi.GetBazi(yy,mm,dd,hh,ii,ss);
    var month = " 寅卯辰巳午未申酉戌亥子丑".indexOf(bazi[3]);
    //
    var period0 = "子丑寅卯辰巳午未申酉戌亥".indexOf(bazi[1]) % 3;
    var _rtn = -1;
    switch(period0) {
      case 0: // 四正年
        _rtn = (18 - month)%9;break;
      case 1: // 四墓年
        _rtn = (15 - month)%9;break;
      case 2: // 四生年 
        _rtn = (12 - month)%9;break;
    }
    if(_rtn < 1) _rtn = 9;
    var _output = " 一二三四五六七八九".charAt(_rtn);
    var _output = "一二三四五六七八九一二三四五六七八九".indexOf(_output,5);
    return "一二三四五六七八九一二三四五六七八九".substr(_output-4,9);
  }
  function CalDay(yy,mm,dd,hh,ii,ss) {
    var jiqi = QIMEN_STAR.jiqi.CalCurrentJiqiIdx(yy,mm,dd,hh,ii,ss);
    var dun_type = 0;
    if(jiqi < 10 || jiqi > 21) dun_type = 1;
    var bazi = QIMEN_STAR.jiqi.GetBazi(yy,mm,dd,hh,ii,ss);
    // 計數
    var chun_sau = "子丑寅卯辰巳午未申酉戌亥".indexOf(bazi[5]) - "甲乙丙丁戊己庚辛壬癸".indexOf(bazi[4]);
    if(chun_sau < 0) chun_sau += 12;
    var _dz = "子丑寅卯辰巳午未申酉戌亥子丑寅卯辰巳午未申酉戌亥".substr(chun_sau,10);
    var chun_sau = "子戌申午辰寅".indexOf("子寅辰午申戌".charAt(parseInt(chun_sau/2)));
    var day_point_idx = chun_sau*10 + _dz.indexOf(bazi[5])+1;
    //
    var _rtn = -1;
    if(dun_type == 1) { //陽遁(冬至 至 夏至)
      if(jiqi > 21 || jiqi < 1) { //上元 
        _rtn = day_point_idx % 9;
      } else if(jiqi < 6) { // 中元
        _rtn = (day_point_idx + 6) % 9;
      } else{ // 下元
        _rtn = (day_point_idx + 3) % 9;
      }
    } else { //陰遁(夏至 至 冬至)
      if(jiqi < 14) {
        _rtn = (64 - day_point_idx) % 9; //上元 
      } else if(jiqi < 18) {
        _rtn = (67 - day_point_idx) % 9; // 中元
      } else {
        _rtn = (61 - day_point_idx) % 9; // 下元
      }
    }
    //
    if(_rtn < 1) _rtn = 9;
    var _output = " 一二三四五六七八九".charAt(_rtn);
    var _output = "一二三四五六七八九一二三四五六七八九".indexOf(_output,5);
    return "一二三四五六七八九一二三四五六七八九".substr(_output-4,9);
  }
  function CalHour(yy,mm,dd,hh,ii,ss) {
    var jiqi = QIMEN_STAR.jiqi.CalCurrentJiqiIdx(yy,mm,dd,hh,ii,ss);
    var dun_type = 0;
    if(jiqi < 10 || jiqi > 21) dun_type = 1;
    var bazi = QIMEN_STAR.jiqi.GetBazi(yy,mm,dd,hh,ii,ss);
    //
    
    var hour = "子丑寅卯辰巳午未申酉戌亥".indexOf(bazi[7]) + 1;
    var day = "子丑寅卯辰巳午未申酉戌亥".indexOf(bazi[5]);
    var period0 = day % 3;
    //hour++;
    var _rtn = -1;
    if(dun_type == 1) { //陽遁(冬至 至 夏至)
      var _rtn = -1;
      switch(period0) {
        case 0: // 四正
          _rtn = hour%9;break;
        case 1: // 四墓
          _rtn = (hour + 3)%9;break;
        case 2: // 四生
          _rtn = (hour + 6)%9;break;
      }
    } else { //陰遁(夏至 至 冬至)
      switch(period0) {
        case 0: // 四正
          _rtn = (19 - hour)%9;break;
        case 1: // 四墓
          _rtn = (16 - hour)%9;break;
        case 2: // 四生
          _rtn = (13 - hour)%9;break;
      }
    }
    //
    if(_rtn < 1) _rtn = 9;
    var _output = " 一二三四五六七八九".charAt(_rtn);
    var _output = "一二三四五六七八九一二三四五六七八九".indexOf(_output,5);
    return "一二三四五六七八九一二三四五六七八九".substr(_output-4,9);
  }
  /** setup object **/
  var purple_star = new Object();
  purple_star.CalYear = function(yy,mm,dd,hh,ii,ss) {
    return CalYear(yy,mm,dd,hh,ii,ss);
  };
  purple_star.CalMonth = function(yy,mm,dd,hh,ii,ss) {
    return CalMonth(yy,mm,dd,hh,ii,ss);
  };
  purple_star.CalDay = function(yy,mm,dd,hh,ii,ss) {
    return CalDay(yy,mm,dd,hh,ii,ss);
  };
  purple_star.CalHour = function(yy,mm,dd,hh,ii,ss) {
    return CalHour(yy,mm,dd,hh,ii,ss);
  };
  _e.purple_star = purple_star;
}(QIMEN_STAR || {}));