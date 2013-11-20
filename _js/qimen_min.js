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
      fa_kap = (fa_kap - fa_kap % 20)/20;console.log(fa_kap);
      var tin_gan = "甲乙丙丁戊己庚辛壬癸".charAt(fa_kap % 10);
      var dei_zhi = "子丑寅卯辰巳午未申酉戌亥".charAt(fa_kap % 12);
      console.log('時間',h,i,s,'天地', tin_gan, dei_zhi);
      return calc(_dun, kook, tin_gan+dei_zhi);
   }
   
   function calc(_dun, _kook, gan_chi) {
      var gan_idx = _GAN.indexOf(gan_chi[0]);
      var chi_idx = _CHI.indexOf(gan_chi[1]);
      var qiyi_gan = _QIYI.indexOf(gan_chi[0]);
      
      /** 定旬首 **/
      var chun_chi = chi_idx - gan_idx + 1, chun = _QIYI.indexOf(_CHUN[chun_chi]);
      if(qiyi_gan < 1) qiyi_gan = chun;
      /** 定地盤 **/
      var dei_pan = [];
      if(_dun == 1)
      {  //陽遁
         for(var i = 1; i < 10; i++) dei_pan[i] = i - _kook + 1;
         for(var i = 1; i < 10; i++) if(dei_pan[i] < 1) dei_pan[i] += 9;
      }
      else
      {
         for(var i = 1; i < 10; i++) dei_pan[i] = _kook - i + 1;
         for(var i = 1; i < 10; i++) if(dei_pan[i] < 1) dei_pan[i] += 9
      }
      
      /** 定值符值使" **/
      var jik_fu = 0, jik_si = 0,
          jik_fu_house = 0, jik_si_house = 0;
      if(_dun == 1)
      {  //陽遁
         jik_fu = _kook + chun  - 1;
         jik_si = jik_fu;
         jik_fu_house = qiyi_gan + _kook - 1;
         jik_si_house = chi_idx - chun_chi + jik_fu;
      }
      else
      {
         jik_fu = _kook - chun + 1;
         jik_si = jik_fu;
         jik_fu_house = _kook - qiyi_gan + 1;
         jik_si_house =  chun_chi - chi_idx + jik_fu;
      }
      console.log('值符',jik_fu);
      console.log('星　',jik_fu_house);
      console.log('門　',jik_si_house);
      while(jik_fu > 9) jik_fu -= 9; while(jik_fu < 1) jik_fu += 9;
      while(jik_fu_house > 9) jik_fu_house -= 9; while(jik_fu_house < 1) jik_fu_house += 9;
      while(jik_si_house > 9) jik_si_house -= 9; while(jik_si_house < 1) jik_si_house += 9;
      
      console.log('值符',jik_fu);
      console.log('星　',jik_fu_house);
      console.log('門　',jik_si_house);
      var tin_star = [];
      var tin_pan = [];
      var tin_star_str = "18349276183492761834927618349276";
      if(jik_fu_house == 5) jik_fu_house= 2;
      if(jik_fu == 5) jik_fu = 2;
      if(jik_si_house == 5) jik_si_house = 2;
      
      var _tin_star_t = tin_star_str.substr(tin_star_str.indexOf(jik_fu_house),8);
      var _tin_star_d = tin_star_str.substr(tin_star_str.indexOf(jik_fu),8);
      console.log('tin_star_d',_tin_star_d);
      for(var i = 0; i < 8; i++) {
         tin_star[_tin_star_t[i]] = _tin_star_d[i];
         tin_pan[_tin_star_t[i]] = dei_pan[_tin_star_d[i]];
      }
      for(var i in tin_pan)
      {
         if(tin_pan[i] == 2) tin_pan[5] = i;
         if(tin_star[i] == 2) tin_star[5] = i;
      }
      console.log(tin_star,_tin_star_t, _tin_star_d);
      for(var i in tin_star) tin_star[i] = " 蓬苪沖輔禽心柱任英".charAt(tin_star[i]);
      
      var door_pan = [];
      var _tin_star_t = tin_star_str.substr(tin_star_str.indexOf(jik_si_house),8);
      var _tin_star_d = tin_star_str.substr(tin_star_str.indexOf(jik_fu),8);
      for(var i = 0; i < 8; i++) {
         door_pan[_tin_star_t[i]] = _tin_star_d[i];
      }
      //console.log('天星',tin_star);
      //console.log('天盤',tin_pan);
      //console.log('地盤',dei_pan);
      //console.log('門盤',door_pan);
      var god_pan = [];
      if(_dun == 1)
      {
         var backway = "1834927618349276".substr("18349276".indexOf(jik_fu_house),8);
      }
      else
      {
         var backway = "1834927618349276".split('').reverse().join('');
         backway = backway.substr(backway.indexOf(jik_fu_house),8);
      }
      for(var i = 0; i < 8; i++)
      {
         //god_pan[backway[i]] = i+1;
         god_pan[backway[i]] = " 符蛇陰合白玄地天".charAt(i+1);
      }
      god_pan[5] = " ";
      //console.log('神盤',god_pan);
      /**
       * convert number 去文字
       */
      for(var i in dei_pan) dei_pan[i] = _QIYI[dei_pan[i]];
      for(var i in tin_pan) if(i != 5) {tin_pan[i] = _QIYI[tin_pan[i]]};
      for(var i in tin_star) door_pan[i] = " 休死傷杜死開驚生景".charAt(door_pan[i]);
      
      //console.log('星盤',tin_star);
      //console.log('天盤',tin_pan);
      //console.log('地盤',dei_pan);
      //console.log('門盤',door_pan);
      //console.log('神盤',god_pan);
      return {'info':{'干支':gan_chi,'遁':_dun?'陽':'陰','局':_kook },'星':tin_star, '天':tin_pan, '地':dei_pan, '門':door_pan, '神':god_pan};
   }
   //calc(0,3,"壬申");
   _e.minQimen = minQimen;
})(QIMEN_STAR);