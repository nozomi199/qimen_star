if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  /**
   * 內部參照用
   */
  var jq = new Array("春分", "清明", "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",   "冬至", "小寒", "大寒", "立春", "雨水", "驚蟄");
  /**
   * 輸出用
   */
  var jq0 = new Array("立春", "雨水", "驚蟄","春分", "清明", "穀雨", "立夏", "小滿", "芒種", "夏至", "小暑", "大暑", "立秋", "處暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",   "冬至", "小寒", "大寒" );
  /***
  this.ptsa = new Array(485, 203, 199, 182, 156, 136, 77, 74, 70, 58, 52, 50, 45, 44, 29, 18, 17, 16, 14, 12, 12, 12, 9, 8);
  this.ptsb = new Array(324.96, 337.23, 342.08, 27.85, 73.14, 171.52, 222.54, 296.72, 243.58, 119.81, 297.17, 21.02, 247.54, 325.15, 60.93, 155.12, 288.79, 198.04, 199.76, 95.39, 287.11, 320.81, 227.73, 15.45);
  this.ptsc = new Array(1934.136, 32964.467, 20.186, 445267.112, 45036.886, 22518.443, 65928.934, 3034.906, 9037.513, 33718.147, 150.678, 2281.226, 29929.562, 31555.956, 4443.417, 67555.328, 4562.452, 62894.029, 31436.921, 14577.848, 31931.756, 34777.259, 1222.114, 16859.074);
  ***/
  var jdez = new Array(30);
  var jdjq=new Array(26);
  /**
   * 由格里曆轉換為儒略曆
   */
  function date_to_julian_day(y,m,d) {
    "use strict";
    var a = parseInt((14 - m) / 12);
    var y = y + 4800 - a;
    var m = m + 12*a - 3;
    return d + parseInt((153*m + 2)/5) + 365*y + parseInt(y/4) - parseInt(y/100) + parseInt(y/400) - 32045;
  }
  function date_to_julian_day2(yr,mh,dy) {
    "use strict";
    var hr = 0;
    var op = false;
    if(yr<-400000 || yr>400000) return false;
    var yp=yr+Math.floor((mh-3)/10);
    if(((yr>1582) || (yr==1582 && mh>10) || (yr==1582 && mh==10 && dy>=15)) || op){
      var init=1721119.5;
      var jdy=Math.floor(yp*365.25)-Math.floor(yp/100)+Math.floor(yp/400);
    }
    else{
      if((yr<1582) || (yr==1582 && mh<10) || (yr==1582 && mh==10 && dy<=4)){
        var init=1721117.5;
        var jdy=Math.floor(yp*365.25);
      }
      else {return false;}
    }
    var mp=Math.floor(mh+9)%12; 
    var jdm=mp*30+Math.floor((mp+1)*34/57);
    var jdd=dy-1;
    var jdh=hr/24;
    var jd=jdy+jdm+jdd+jdh+init;
    return jd;
  }
  function date_to_julian_time(h,i,s) {
    /*****
     * h: hour
     * i: minutes
     * s: second
     */
    return ((h * 3600) + (i * 60) + s) /86400;
  }
  /*****
   * 計算指定年份之春分點
   */
  function VE(yy) {
    var yx=yy;
    var jdve = 0;
    if(yx>=1000 && yx<=8001){
      var m=(yx-2000)/1000;
      jdve=2451623.80984+365242.37404*m+0.05169*m*m-0.00411*m*m*m-0.00057*m*m*m*m;
    }
    else{
      if(yx>=-8000 && yx<1000){
        m=yx/1000;
        jdve=1721139.29189+365242.1374*m+0.06134*m*m+0.00111*m*m*m-0.00071*m*m*m*m;
      }
      else{ 
        // 超出計算能力範圍 
        return false;
      }
    }
    return jdve;
  };
  /*****
   * 計算及修正其他星球之影響而產生攝動
   * 取得受perturbation影響所需微調
   */
  function Perturbation(jdez){
    var t=(jdez-2451545)/36525;
    var s=0;
    var ptsa = new Array(485, 203, 199, 182, 156, 136, 77, 74, 70, 58, 52, 50, 45, 44, 29, 18, 17, 16, 14, 12, 12, 12, 9, 8);
    var ptsb = new Array(324.96, 337.23, 342.08, 27.85, 73.14, 171.52, 222.54, 296.72, 243.58, 119.81, 297.17, 21.02, 247.54, 325.15, 60.93, 155.12, 288.79, 198.04, 199.76, 95.39, 287.11, 320.81, 227.73, 15.45);
    var ptsc = new Array(1934.136, 32964.467, 20.186, 445267.112, 45036.886, 22518.443, 65928.934, 3034.906, 9037.513, 33718.147, 150.678, 2281.226, 29929.562, 31555.956, 4443.417, 67555.328, 4562.452, 62894.029, 31436.921, 14577.848, 31931.756, 34777.259, 1222.114, 16859.074);
    for(var k=0;k<=23;k++){
      //s=s+this.ptsa[k]*Math.cos(this.ptsb[k]*2*Math.PI/360+this.ptsc[k]*2*Math.PI/360*t);
      s=s+ptsa[k]*Math.cos(ptsb[k]*2*Math.PI/360+ptsc[k]*2*Math.PI/360*t);
    }
    var w=35999.373*t-2.47;
    var l=1+0.0334*Math.cos(w*2*Math.PI/360)+0.0007*Math.cos(2*w*2*Math.PI/360);
    var ptb=0.00001*s/l;
    return ptb;
  };
  /*****
   * 計算地球運行速度偏差修正值
   * 
   */
  function DeltaT(yy , mm ){
    var u, t, dt, y;
    y = yy + (mm - 0.5) / 12;

    if(y<=-500){	
      u = (y - 1820) / 100;
      dt = (-20 + 32*u*u);}
    else{if(y< 500){
      u = y / 100;
      dt=(10583.6-1014.41*u+33.78311*u*u-5.952053*u*u*u-0.1798452*u*u*u*u+0.022174192*u*u*u*u*u+0.0090316521*u*u*u*u*u*u);}
    else{if(y<1600){
      u = (y - 1000) / 100;
      dt = (1574.2-556.01*u+71.23472*u*u+0.319781*u*u*u-0.8503463*u*u*u*u-0.005050998*u*u*u*u*u+ 0.0083572073*u*u*u*u*u*u);}
    else{if(y<1700){
      t = y - 1600;
      dt = (120 - 0.9808 * t - 0.01532 * t*t + t*t*t / 7129);}
    else{if(y<1800){
      t = y - 1700;
      dt = (8.83 + 0.1603 * t - 0.0059285 * t*t + 0.00013336 * t*t*t - t*t*t*t / 1174000);}
    else{if(y<1860){
      t = y - 1800;
      dt=(13.72-0.332447*t+0.0068612*t*t+0.0041116*t*t*t-0.00037436*t*t*t*t+0.0000121272*t*t*t*t*t-0.0000001699*t*t*t*t*t*t+ 0.000000000875*t*t*t*t*t*t*t);}
    else{if(y<1900){
      t = y - 1860;
      dt = (7.62 + 0.5737 * t - 0.251754 * t*t + 0.01680668 * t*t*t - 0.0004473624 * t*t*t*t + t*t*t*t*t / 233174);}
    else{if(y<1920){
      t = y - 1900;
      dt = (-2.79 + 1.494119 * t - 0.0598939 * t*t + 0.0061966 * t*t*t - 0.000197 * t*t*t*t);}
    else{if(y<1941){
      t = y - 1920;
      dt = (21.2 + 0.84493 * t - 0.0761 * t*t + 0.0020936 * t*t*t);}
    else{if(y<1961){
      t = y - 1950;
      dt = (29.07 + 0.407 * t - t*t / 233 + t*t*t / 2547);}
    else{if(y<1986){
      t = y - 1975;
      dt = (45.45 + 1.067 * t - t*t / 260 - t*t*t / 718);}
    else{if(y<2005){
      t = y - 2000;
      dt = (63.86 + 0.3345 * t - 0.060374 * t*t + 0.0017275 * t*t*t + 0.000651814 * t*t*t*t + 0.00002373599 * t*t*t*t*t);}
    else{if(y<2050){
      t = y - 2000;
      dt = (62.92 + 0.32217 * t + 0.005589 * t*t);}
    else{if(y<2150){
      u = (y - 1820) / 100;
      dt = (-20 + 32*u*u-0.5628*(2150 - y));}
    else{
      u = (y - 1820) / 100;
      dt = (-20 + 32*u*u);}}}}}}}}}}}}}}

    if(y<1955 || y>=2005) dt=dt-(0.000012932*(y-1955)*(y-1955));
    var DeltaT = dt / 60;    //將秒轉換為分
    return DeltaT;
  }
  /*****
   * 
   */
  function MeanJQJD(yy,jdve,ty,ini,num){
    var ath=2*Math.PI/24;
    var tx=(jdve-2451545)/365250;
    var e=0.0167086342-0.0004203654*tx-0.0000126734*tx*tx+0.0000001444*tx*tx*tx-0.0000000002*tx*tx*tx*tx+0.0000000003*tx*tx*tx*tx*tx;
    var tt=yy/1000;
    var vp=111.25586939-17.0119934518333*tt-0.044091890166673*tt*tt-4.37356166661345E-04*tt*tt*tt+8.16716666602386E-06*tt*tt*tt*tt;
    var rvp=vp*2*Math.PI/360;
    var peri = new Array(30);
    var i;
    for(i=1;i<=(ini+num);i++){
      var flag=0;
      var th=ath*(i-1)+rvp;
      if(th>Math.PI && th<=3*Math.PI){
        th=2*Math.PI-th;
        flag=1;
      }
      if(th>3*Math.PI){
        th=4*Math.PI-th;
        flag=2;
      }
      var f1=2*Math.atan((Math.sqrt((1-e)/(1+e))*Math.tan(th/2)));
      var f2=(e*Math.sqrt(1-e*e)*Math.sin(th))/(1+e*Math.cos(th));
      var f=(f1-f2)*ty/2/Math.PI;
      if(flag==1) f=ty-f;
      if(flag==2) f=2*ty-f;
      peri[i]=f;
    }
    for(i=ini;i<=(ini+num);i++){
      jdez[i]=jdve+peri[i]-peri[1];
    }
    return true;
  };
  //副程式功能：對Perturbaton作調整後的自春分點開始的24節氣,可只取部份
  function GetAdjustedJQ(yy, ini, num, jdjq){
    var veb= VE(yy);
    var ty= VE(yy+1)-veb;     //求指定年的春分點及回歸年長
    if(MeanJQJD(yy,veb,ty,ini,num)==true){	//輸入指定年,JD,回歸年長,求該回歸年各節氣之長
      for(var i=ini+1;i<=(ini+num);i++){
        var ptb= Perturbation(jdez[i]);	//取得受perturbation影響所需微調
        var dt= DeltaT(yy,Math.floor(i/2)+3);	//修正dynamical time to Universal time
        jdjq[i]= jdez[i]+ptb-dt/60/24;	//加上攝動調整值ptb，減去對應的Delta T值(分鐘轉換為日)
        jdjq[i]=jdjq[i]+1/3;	//因中國時間比格林威治時間先行8小時，即1/3日
      }
    }
  }
  /*****
   * 副程式功能：求出以立春點開始的含中氣之12節氣
   */
  function GetPureJQsinceSpring2(yy, ptsa,ptsb,ptsc, jdpjq){
    var sjdjq=new Array;
    var yea = yy - 1;
    GetAdjustedJQ(yea, 21, 3, sjdjq);   //求出含指定年立春開始之3個節氣JD值,以前一年的年值代入
    //轉移春分前之立春至驚蟄之節氣至jdpjq變數中，以重整index
    jdpjq[0] =sjdjq[22];                     //此為立春
    jdpjq[1] =sjdjq[23];                     //此為雨水
    jdpjq[2] =sjdjq[24];                     //此為驚蟄
    yea = yy;
    //GetAdjustedJQ(yea, 0, 26, sjdjq);       //求出指定年節氣之JD值,從驚蟄開始，到雨水
    GetAdjustedJQ(yea, 0, 26, sjdjq);       //求出指定年節氣之JD值,從驚蟄開始，到雨水
    //jdpjq[3] =sjdjq[25];                     //此為當年春分
    //轉移春分至小寒之節氣至jdpjq變數中，以重整index
    //jdpjq[3] =sjdjq[0]; 
    for(var i=2;i<=24;i++){
      //jdpjq[i+1] = sjdjq[2 * i];
      jdpjq[i+1] = sjdjq[i-1];
    }
  };
  /*****
   * 將儒略日換成年月日時分秒
   */
  function Jtime (op,jd){
    if(jd>=2299160.5 || op){
      var y4h=146097;
      var init=1721119.5;
    }
    else{
      var y4h=146100;
      var init=1721117.5;
    }
    var jdr=Math.floor(jd-init);
    var yh=y4h/4;
    var cen=Math.floor((jdr+0.75)/yh);
    var d=Math.floor(jdr+0.75-cen*yh);
    var ywl=1461/4;
    var jy=Math.floor((d+0.75)/ywl);
    d=Math.floor(d+0.75-ywl*jy+1);
    var ml=153/5;
    var mp=Math.floor((d-0.5)/ml);
    d=Math.floor((d-0.5)-30.6*mp+1);
    var y=(100*cen)+jy;
    var m=(mp+2)%12+1;
    if(m<3) y=y+1;
    var sd=Math.floor((jd+0.5-Math.floor(jd+0.5))*24*60*60+0.00005);
    var mt=Math.floor(sd/60);
    var ss=sd%60;
    var hh=Math.floor(mt/60);
    var mmt=mt%60;
    var yy=Math.floor(y);
    var mm=Math.floor(m);
    var dd=Math.floor(d);
    var yc="     "+yy;
    yc=yc.substr(yc.length-5,5);
    var dytm=yc;dytm+="年";
    dytm+= ((mm < 10) ? "0" : "") + mm+"月";
    dytm+= ((dd < 10) ? "0" : "") + dd+"日";
    dytm+= ((hh < 10) ? "0" : "") + hh+"時";
    dytm+= ((mmt < 10) ? "0" : "") + mmt+"分";
    dytm+= ((ss < 10) ? "0" : "") + ss+"秒";
    return dytm.trim();
  };
  /**
   * 計算當前節氣
   */
  function CalCurrentJiqi(y,m,d,h,i,s) {
    var jtoday = date_to_julian_day2(y,m,d) + 
      date_to_julian_time(h,i,s);
    var jqTime=new Array;
    GetPureJQsinceSpring2(y,0,0,0,jqTime);  // 計算當年節氣(以立春日為新一年)
    if(jtoday < jqTime[0]) {
      y = y - 1;
      GetPureJQsinceSpring2(y,0,0,0,jqTime);  // 計算上一年節氣(以立春日為新一年)
      //console.log("計算上一年節氣(以立春日為新一年)");
    }
    var dgz = -1;
    for(var ii = 24; ii > 0; ii--) {
      if(jtoday > jqTime[ii-1]) {
        dgz = ii;
        break;
      }
    }
    return jq0[dgz];
  }
  /**
   * 四柱計算, 子初換日
   */
  function GetGZ(y,m,d,h,i,s) {
    var jtoday = date_to_julian_day2(y,m,d) + 
      date_to_julian_time(h,i,s);
    var jqTime=new Array;
    //var y = this.Jtime(jtoday);
    GetPureJQsinceSpring2(y,0,0,0,jqTime);  // 計算當年節氣(以立春日為新一年)
    if(jtoday < jqTime[0]) {
      y = y - 1;
      GetPureJQsinceSpring2(y,0,0,0,jqTime);  // 計算上一年節氣(以立春日為新一年)
      //console.log("計算上一年節氣(以立春日為新一年)");
    }
    // 四柱回傳
    var tin = "甲乙丙丁戊己庚辛壬癸甲乙丙丁戊己庚辛壬癸甲乙";
    var di  = "子丑寅卯辰巳午未申酉戌亥";
    
    var rtn_gz = new Array;    
    // 計年柱
    var ygz = ((y + 4712 + 24) % 60 + 60) % 60;
    rtn_gz.push(tin[ygz % 10]);
    rtn_gz.push(di[ygz % 12]);
    // 計月柱
    var dgz = -1;
    for(var ii = 24; ii > 0; ii--) {
      if(jtoday > jqTime[ii-1]) {
        dgz = ii;
        break;
      }
    }
    if(dgz < 0) dgz = 1;if(dgz%2 == 0) dgz--;
    dgz = Math.floor(dgz / 2);if(dgz == 12) dgz = 11;
    rtn_gz.push(tin.substr(Math.floor((ygz%10)%5*2+2),12)[dgz]);  // 月干
    rtn_gz.push("寅卯辰巳午未申酉戌亥子丑".charAt(dgz));            // 月支
    // 計日柱
    var jda = jtoday + 0.5;
    var thes = ((jda - Math.floor(jda)) * 86400) + 3600;
    var dayjd = Math.floor(jda) + thes / 86400;
    dgz = (Math.floor(dayjd + 49) % 60 + 60) % 60;
    // if(h >= 23) dgz--; // 子正換日處理, 測試用
    rtn_gz.push(tin[dgz % 10]); // 日干
    rtn_gz.push(di[dgz % 12]);  // 日支
    // 計時柱
    var dh = dayjd * 12;
    //var hgz = (Math.floor(dh + 48) % 60 + 60) % 60;console.log('hgz',(Math.floor(dh + 48) % 60));
    var hgz = (Math.floor(dh + 48) % 60 + 60) % 60;
    //console.log(h,Math.ceil(h/2)%12,di[(h/2)%12],di[hgz % 12]);
    //if((h%2) == 1 && i == 0) hgz += 1;
    if((Math.ceil(h/2)%12) != (hgz%12)) hgz++;
    rtn_gz.push(tin[hgz % 10]); // 時干
    rtn_gz.push(di[hgz % 12]);  // 時支
    // 計分柱
    var minhz = i; if(h%2 == 0) minhz += 60; minhz = Math.floor(minhz * 60 / 600);
    var gan_idx = [0,2,4,6,8,0,2,4,6,8];
    rtn_gz.push(tin.substr(gan_idx[tin.indexOf(rtn_gz[6])],12).charAt(minhz)); // 分干
    rtn_gz.push(di[minhz % 12]);  // 分支
    // 計分柱2
    var minhz = i; if(h%2 == 0) minhz += 60; minhz = Math.floor(minhz * 60 % 600 / 50);
    var gan_idx = [0,2,4,6,8,0,2,4,6,8];
    rtn_gz.push(tin.substr(gan_idx[tin.indexOf(rtn_gz[8])],12).charAt(minhz)); // 分干
    rtn_gz.push(di[minhz % 12]);  // 分支
    
    return rtn_gz.join("");
  };
  _e.GetBazi = function(y,m,d,h,i,s) {
    return GetGZ(y,m,d,h,i,s);
  };
  _e.CalCurrentJiqi = function(y,m,d,h,i,s) {
    return CalCurrentJiqi(y,m,d,h,i,s);
  };
}(QIMEN_STAR || {}));