if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  function three_elements(day,a,b,c) {
    var _d = "甲乙丙丁戊己庚辛壬癸".indexOf(day[0]);
    var _t = "甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸".substr(_d%5 * 2,12);
    var _d = "子丑寅卯辰巳午未申酉戌亥";
    var _c = "丑子巳寅酉辰亥午卯申";
    var _o = {'天':a%10,'人':b%10,'地':c%10};
    var _p = "三才：　";
    for(var i in _o) {
      _p += '(';
      if(_o[i] == 0) {
        _p += _t.charAt(1) + '丑' +',';
        _p += _t.charAt(7) + '未' ;
      } else if(_o[i] == 5) {
        _p += _t.charAt(4) + '辰' +',';
        _p += _t.charAt(10) + '戌' ;
      } else {
        _p += _t.charAt(_d.indexOf(_c[_o[i]])) + _c[_o[i]];
      }
      _p += ')　';
    }
    return _p;
  }
  _e.threeElem = three_elements;
})(QIMEN_STAR);