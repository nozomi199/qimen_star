if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
QIMEN_STAR.luyin = {};
(function(_e) {
  function calcFlow(helpMan,tin) {      
    return parseInt((tin.indexOf(helpMan)+7)%12/6);
  }
  function calcHelpManPan(helpMan,flow,tin) {
    var helpManPan;
    if(flow)
        helpManPan="貴蛇朱合勾青空白常玄陰后貴蛇朱合勾青空白常玄陰后";
      else
        helpManPan="貴后陰玄常白空青勾合朱蛇貴后陰玄常白空青勾合朱蛇";
    var idx = tin.indexOf(helpMan);
    var idx = 0 - idx + 12;
    return helpManPan.substr(idx,12);
  }
  function calc(jiqi) {
    var gen  = "子亥亥戌戌酉酉申申未未午午巳巳辰辰卯卯寅寅丑丑子".charAt(jiqi.currentJiqiIdx);
    var tin = (function(gen,hour){
      var i = "子丑寅卯辰巳午未申酉戌亥".indexOf(gen);
      var j = "子丑寅卯辰巳午未申酉戌亥".indexOf(hour);
      var k = i - j; while(k < 0)k+=12;
      return "子丑寅卯辰巳午未申酉戌亥子丑寅卯辰巳午未申酉戌亥".substr(k,12);
    })(gen,jiqi.bazi[7]);
    var helpManDay = (function(gan) {
      return "丑子亥亥丑子丑午巳巳".charAt("甲乙丙丁戊己庚辛壬癸".indexOf(gan));
    })(jiqi.bazi[4]);
    var helpManDayFlow = calcFlow(helpManDay,tin);
    var helpManDayPan  = calcHelpManPan(helpManDay,helpManDayFlow,tin);
    var helpManNight = (function(gan) {
      return "未申酉酉未申未寅卯卯".charAt("甲乙丙丁戊己庚辛壬癸".indexOf(gan));
    })(jiqi.bazi[4]);
    var helpManNightFlow = calcFlow(helpManNight,tin);
    var helpManNightPan  = calcHelpManPan(helpManNight,helpManNightFlow,tin);
    return {
      'gen' : gen,
      'hour': jiqi.bazi[7],
      'gz'  : jiqi.bazi[4]+jiqi.bazi[5],
      'tin' : tin,
      'dei' : "子丑寅卯辰巳午未申酉戌亥",
      'helpman': {
        'mode': parseInt((18+("子丑寅卯辰巳午未申酉戌亥".indexOf(jiqi.bazi[7]) - 3))%12/6),
        'day':{
          'z'   :helpManDay,
          'flow':helpManDayFlow,
          'pan' :helpManDayPan,
        },
        'night':{
          'z'   :helpManNight,
          'flow':helpManNightFlow,
          'pan' :helpManNightPan,
        },
      },
    };
  }
	function luyin(_gen,_gan,_chi,_hour,_helpMan,_flow) {
    
    var tin = (function(gen,hour){
        var i = "子丑寅卯辰巳午未申酉戌亥".indexOf(_gen);
        var j = "子丑寅卯辰巳午未申酉戌亥".indexOf(_hour);
        var k = i - j; while(k < 0)k+=12;
        return "子丑寅卯辰巳午未申酉戌亥子丑寅卯辰巳午未申酉戌亥".substr(k,12);
      })(_gen,_hour);
    if(_flow > 2 || _flow < 0)
      _flow = calcFlow(_helpMan,tin);
		return {
      'gen' : _gen,
      'hour': _hour,
      'gz'  : _gan+_chi,
      'tin' : tin,
      'dei' : "子丑寅卯辰巳午未申酉戌亥",
      'helpman': {
        'z'    : _helpMan,
        'flow' : _flow,
        'pan'  : calcHelpManPan(_helpMan,_flow,tin),
      },
    };
	}
	//for(var i = 0; i < 12; i++)
	//	luiyin("卯","甲","子","子丑寅卯辰巳午未申酉戌亥"[i]);
  _e.calc = calc;
  _e.luyin = luyin;
})(QIMEN_STAR.luyin);