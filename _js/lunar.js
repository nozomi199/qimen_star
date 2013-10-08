if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  var synmonth = 29.530588853;     //synodic month (new Moon to new Moon)
  var ptsa = new Array(485, 203, 199, 182, 156, 136, 77, 74, 70, 58, 52, 50, 45, 44, 29, 18, 17, 16, 14, 12, 12, 12, 9, 8)
  var ptsb = new Array(324.96, 337.23, 342.08, 27.85, 73.14, 171.52, 222.54, 296.72, 243.58, 119.81, 297.17, 21.02, 247.54, 325.15, 60.93, 155.12, 288.79, 198.04, 199.76, 95.39, 287.11, 320.81, 227.73, 15.45)
  var ptsc = new Array(1934.136, 32964.467, 20.186, 445267.112, 45036.886, 22518.443, 65928.934, 3034.906, 9037.513, 33718.147, 150.678, 2281.226, 29929.562, 31555.956, 4443.417, 67555.328, 4562.452, 62894.029, 31436.921, 14577.848, 31931.756, 34777.259, 1222.114, 16859.074)
  var jdez=new Array;
  function Solar2Lunar(yea,mx,dx){
    //陽曆的各變數
    var yea, zr=new Array, op=false;
    //陰曆的各變數
    var mx, dx;
    var sjd=new Array, mc=new Array, lsjd, mis;
    //取得輸入之陽曆年月日值
    //var yea=in1.value-0;	//取得年之輸入值
    //var mx=in2.value-0;	//取得月之輸入值
    //var dx=in3.value-0;	//取得日之輸入值
    var flag=0;
    var out="";
    //限定範圍
    if(yea<-7000 || yea>7000){
      //alert("超出計算能力");
      return false;
    }
    if(yea<-1000 || yea>3000){
      //alert("适用于西元-1000年至西元3000年，超出此范??差?大");
      return false;
    }

    //驗證輸入日期的正確性,若不正確則跳離
    if(ValidDate(op, yea, mx, dx) == false){ return false; }
    GetZQandSMandLunarMonthCode(op, yea, zr, sjd, mc);

    var jdx = Jdays(op, yea, mx, dx, 12);    //求出指定年月日之JD值
    if(Math.floor(jdx) < Math.floor(sjd[0] + 0.5)){ flag = 1; GetZQandSMandLunarMonthCode(op, yea-1,zr,sjd,mc); }
    for(var i=0;i<=14;i++){
        //下面的指令中加0.5是為了改為從0時算起而不從正午算起
        if(Math.floor(jdx) >= Math.floor(sjd[i]+0.5) && Math.floor(jdx) < Math.floor(sjd[i+1]+0.5)){ var mi=i; break; } 
    }
    var dz=Math.floor(jdx)-Math.floor(sjd[mi]+0.5)+1;       //此處加1是因為每月初一從1開始而非從0開始
    if(mc[mi]<2 || flag==1){ var yi=yea-1 }else{ var yi=yea; } //因mc(mi)=0對應到前一年陰曆11月，mc(mi)=1對應到前一年陰曆12月
      //mc(mi)=2對應到本年1月，依此類推
    if((mc[mi]-Math.floor(mc[mi]))*2+1==1){ var ry=""; }else{ var ry="閏"; }
    mis=(Math.floor(mc[mi]+10)%12)+1;        //對應到月份
    out+="陰曆 "+yi+"年 "+ry+mis+"月 "+dz+"日";
    return out;
  }
  function ValidDate(op,yy,mm,dd){//驗證日期是否有效
    var vd=true;
    if(mm<=0 || mm>12){
      //alert("月份超出範圍");
      vd=false;
    }
    else{
      var ndf1=-(yy%4==0);	//可被四整除
      var ndf2=((yy%400==0)-(yy%100==0)) && (((yy>1582) && (!op)) || op);
      var ndf=ndf1+ndf2;
      var dom=30+((Math.abs(mm-7.5)+0.5)%2)-(mm==2)*(2+ndf);
      if(dd<=0 || dd>dom){
        if(ndf==0 && mm==2 && dd==29){
          //alert("此年無閏月");
        }
        else{
          //alert("日期超出範圍");
        }
        vd=false;
      }
    }
    if((yy==1582 && mm==10 && dd>=5 &&dd<15) && !op){
      //alert("此日期不存在");
      vd=false;
    }
    return vd;
  }
  function VE(yy){//?算指定年的春分点
    var yx=yy;
    if(yx>=1000 && yx<=8001){
      var m=(yx-2000)/1000;
      var jdve=2451623.80984+365242.37404*m+0.05169*m*m-0.00411*m*m*m-0.00057*m*m*m*m;
    }
    else{
      if(yx>=-8000 && yx<1000){
        m=yx/1000;
        var jdve=1721139.29189+365242.1374*m+0.06134*m*m+0.00111*m*m*m-0.00071*m*m*m*m;
      }
      else{
        //alter("超出?算能力范?");
        return false;
      }
    }
    return jdve
  }
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
  }
  function Perturbation(jdez){
    var t=(jdez-2451545)/36525;
    var s=0;
    for(var k=0;k<=23;k++){
      s=s+ptsa[k]*Math.cos(ptsb[k]*2*Math.PI/360+ptsc[k]*2*Math.PI/360*t);
    }
    var w=35999.373*t-2.47;
    var l=1+0.0334*Math.cos(w*2*Math.PI/360)+0.0007*Math.cos(2*w*2*Math.PI/360);
    var ptb=0.00001*s/l;
    return ptb;
  }
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
    return DeltaT
  }

  function Jdays(op,yr,mh,dy,hr){//將年月日時，轉??儒略日
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

    //副程式功能：對Perturbaton作調整後的自春分點開始的24節氣,可只取部份
  function GetAdjustedJQ(yy, ini, num, jdjq){
    var veb=VE(yy);
    var ty=VE(yy+1)-veb;     //求指定年的春分點及回歸年長

    if(MeanJQJD(yy,veb,ty,ini,num)==true){	//輸入指定年,JD,回歸年長,求該回歸年各節氣之長
        for(var i=ini+1;i<=(ini+num);i++){
          var ptb=Perturbation(jdez[i]);	//取得受perturbation影響所需微調
          var dt=DeltaT(yy,Math.floor(i/2)+3);	//修正dynamical time to Universal time
          jdjq[i]=jdez[i]+ptb-dt/60/24;	//加上攝動調整值ptb，減去對應的Delta T值(分鐘轉換為日)
          jdjq[i]=jdjq[i]+1/3;	//因中國時間比格林威治時間先行8小時，即1/3日
        }
      }

  }

  //副程式功能：求出自冬至點為起點的連續16個中氣
  function GetZQsinceWinterSolstice(yy, jdzq){
    //求出以冬至為起點之連續16個中氣（多取四個以備用）
    var dj=new Array(26);
    GetAdjustedJQ(yy - 1, 18, 5, dj);	//求出指定年冬至開始之節氣JD值,以前一年的值代入
    //轉移春分前之節氣至jdzq變數中，以重整index
    jdzq[0] = dj[19];                    //此為冬至中氣
    jdzq[1] = dj[21];                    //此為大寒中氣
    jdzq[2] = dj[23];                    //此為雨水中氣
    GetAdjustedJQ(yy, 0, 26, dj); //求出指定年節氣之JD值
    for(var i=1;i<=13;i++){
        jdzq[i + 2] = dj[2 * i - 1];     //轉移冬至後之節氣至jdzq變數中，以重整index
    }
  }
  //副程式功能：對於指定日期時刻所屬的朔望月，求出其均值新月點的月序數
  function MeanNewMoon(jd){
    var t, thejd, jdt;
    //k為從2000年1月6日14時20分36秒起至指定年月日之陰曆月數,以synodic month為單位
    var k = Math.floor((jd - 2451550.09765) / synmonth); //2451550.09765為2000年1月6日14時20分36秒之JD值。
    jdt = 2451550.09765 + k * synmonth;
    //Time in Julian centuries from 2000 January 0.5.
    t = (jdt - 2451545) / 36525;  //以100年為單位,以2000年1月1日12時為0點
    thejd = jdt + 0.0001337*t*t - 0.00000015*t*t*t + 0.00000000073*t*t*t*t;
            //2451550.09765為2000年1月6日14時20分36秒，此為2000年後的第一個均值新月
    return k;
  }
  //函式功能:求出實際新月點
  //以2000年初的第一個均值新月點為0點求出的均值新月點和其朔望月之序數k
  //代入此副程式來求算實際新月點
  function TrueNewMoon(k){
    var t, t2, t3, t4;
    var m, mprime, f , omega , es;
    var pt, apt1, apt2, jdt;
    jdt = 2451550.09765 + k * synmonth;
    t = (jdt - 2451545) / 36525;	//2451545為2000年1月1日正午12時的JD
    t2 = t * t;      //square for frequent use
    t3 = t2 * t;     //cube for frequent use
    t4 = t3 * t;     //to the fourth
    //mean time of phase
    pt = jdt + 0.0001337 * t2 - 0.00000015 * t3 + 0.00000000073 * t4;
    //Sun's mean anomaly(地球繞太陽運行均值近點角)(從太陽觀察)
    m = 2.5534 + 29.10535669 * k - 0.0000218 * t2 - 0.00000011 * t3;
    //Moon's mean anomaly(月球繞地球運行均值近點角)(從地球觀察)
    mprime = 201.5643 + 385.81693528 * k + 0.0107438 * t2 + 0.00001239 * t3 - 0.000000058 * t4;
    //Moon's argument of latitude(月球的緯度參數)
    f = 160.7108 + 390.67050274 * k - 0.0016341 * t2 - 0.00000227 * t3 + 0.000000011 * t4;
    //Longitude of the ascending node of the lunar orbit(月球繞日運行軌道升交點之經度)
    omega = 124.7746 - 1.5637558 * k + 0.0020691 * t2 + 0.00000215 * t3;
    //乘式因子
    es = 1 - 0.002516 * t - 0.0000074 * t2;
    //因perturbation造成的偏移：
    apt1 = -0.4072 * Math.sin((Math.PI / 180) * mprime);
        apt1+= 0.17241 * es * Math.sin((Math.PI / 180) * m);
        apt1+= 0.01608 * Math.sin((Math.PI / 180) * 2 * mprime);
        apt1+= 0.01039 * Math.sin((Math.PI / 180) * 2 * f);
        apt1+= 0.00739 * es * Math.sin((Math.PI / 180) * (mprime - m));
        apt1-= 0.00514 * es * Math.sin((Math.PI / 180) * (mprime + m));
        apt1+= 0.00208 * es * es * Math.sin((Math.PI / 180) * (2 * m));
        apt1-= 0.00111 * Math.sin((Math.PI / 180) * (mprime - 2 * f));
        apt1-= 0.00057 * Math.sin((Math.PI / 180) * (mprime + 2 * f));
        apt1+= 0.00056 * es * Math.sin((Math.PI / 180) * (2 * mprime + m));
        apt1-= 0.00042 * Math.sin((Math.PI / 180) * 3 * mprime);
        apt1+= 0.00042 * es * Math.sin((Math.PI / 180) * (m + 2 * f));
        apt1+= 0.00038 * es * Math.sin((Math.PI / 180) * (m - 2 * f));
        apt1-= 0.00024 * es * Math.sin((Math.PI / 180) * (2 * mprime - m));
        apt1-= 0.00017 * Math.sin((Math.PI / 180) * omega);
        apt1-= 0.00007 * Math.sin((Math.PI / 180) * (mprime + 2 * m));
        apt1+= 0.00004 * Math.sin((Math.PI / 180) * (2 * mprime - 2 * f));
        apt1+= 0.00004 * Math.sin((Math.PI / 180) * (3 * m));
        apt1+= 0.00003 * Math.sin((Math.PI / 180) * (mprime + m - 2 * f));
        apt1+= 0.00003 * Math.sin((Math.PI / 180) * (2 * mprime + 2 * f));
        apt1-= 0.00003 * Math.sin((Math.PI / 180) * (mprime + m + 2 * f));
        apt1+= 0.00003 * Math.sin((Math.PI / 180) * (mprime - m + 2 * f));
        apt1-= 0.00002 * Math.sin((Math.PI / 180) * (mprime - m - 2 * f));
        apt1-= 0.00002 * Math.sin((Math.PI / 180) * (3 * mprime + m));
        apt1+= 0.00002 * Math.sin((Math.PI / 180) * (4 * mprime));
                
    apt2 = 0.000325 * Math.sin((Math.PI / 180) * (299.77 + 0.107408 * k - 0.009173 * t2));
        apt2+= 0.000165 * Math.sin((Math.PI / 180) * (251.88 + 0.016321 * k));
        apt2+= 0.000164 * Math.sin((Math.PI / 180) * (251.83 + 26.651886 * k));
        apt2+= 0.000126 * Math.sin((Math.PI / 180) * (349.42 + 36.412478 * k));
        apt2+= 0.00011 * Math.sin((Math.PI / 180) * (84.66 + 18.206239 * k));
        apt2+= 0.000062 * Math.sin((Math.PI / 180) * (141.74 + 53.303771 * k));
        apt2+= 0.00006 * Math.sin((Math.PI / 180) * (207.14 + 2.453732 * k));
        apt2+= 0.000056 * Math.sin((Math.PI / 180) * (154.84 + 7.30686 * k));
        apt2+= 0.000047 * Math.sin((Math.PI / 180) * (34.52 + 27.261239 * k));
        apt2+= 0.000042 * Math.sin((Math.PI / 180) * (207.19 + 0.121824 * k));
        apt2+= 0.00004 * Math.sin((Math.PI / 180) * (291.34 + 1.844379 * k));
        apt2+= 0.000037 * Math.sin((Math.PI / 180) * (161.72 + 24.198154 * k));
        apt2+= 0.000035 * Math.sin((Math.PI / 180) * (239.56 + 25.513099 * k));
        apt2+= 0.000023 * Math.sin((Math.PI / 180) * (331.55 + 3.592518 * k));
    var tnm = pt + apt1 + apt2;
    return tnm;
  }
  //副程式功能：求算以含冬至中氣為陰曆11月開始的連續16個朔望月
  function GetSMsinceWinterSolstice(op, yy, jdws, jdnm){
    var kn, tjd=new Array, i, k, mjd, thejd;
    var spcjd, phase, kn;
    spcjd = Jdays(op, yy-1, 11, 0, 0);        //求年初前兩個月附近的新月點(即前一年的11月初)
    kn=MeanNewMoon(spcjd);   //求得自2000年1月起第kn個平均朔望日及其JD值
    for(var i=0;i<=19;i++){                         //求出連續20個朔望月
        k = kn + i;
        mjd = thejd + synmonth * i;
        tjd[i] = TrueNewMoon(k) + 1 / 3;      //以k值代入求瞬時朔望日,因中國比格林威治先行8小時，加1/3天
        //下式為修正dynamical time to Universal time
        tjd[i] = tjd[i] - DeltaT(yy, i - 1) / 1440;   //1為1月，0為前一年12月，-1為前一年11月(當i=0時，i-1=-1，代表前一年11月)
    }
    for(var j=0;j<=18;j++){
        if(Math.floor(tjd[j] + 0.5) > Math.floor(jdws + 0.5)) {break;}	//已超過冬至中氣(比較日期法)
    }
    var jj = j;                                  //取此時的索引值
    for(var k=0;k<=15;k++){
        jdnm[k] = tjd[jj - 1 + k];            //重排索引，使含冬至朔望月的索引為0
    }
  }
  //副程式功能：以比較日期法求算冬月及其餘各月名稱代碼，包含閏月，冬月為0，臘月為1，正月為2，餘類推。閏月多加0.5
  function GetZQandSMandLunarMonthCode(op, yy, jdzq, jdnm, mc){
    var yz;
    GetZQsinceWinterSolstice(yy, jdzq);        //取得以前一年冬至為起點之連續17個中氣
    GetSMsinceWinterSolstice(op, yy, jdzq[0], jdnm);	//求出以含冬至中氣為陰曆11月(冬月)開始的連續16個朔望月的新月點
    yz = 0;      //設定旗標，0表示未遇到閏月，1表示已遇到閏月
    if( Math.floor(jdzq[12] + 0.5) >= Math.floor(jdnm[13] + 0.5)){      //若第13個中氣jdzq(12)大於或等於第14個新月jdnm(13)
      for(i=1;i<=14;i++){ //表示此兩個冬至之間的11個中氣要放到12個朔望月中，
                          //至少有一個朔望月不含中氣，第一個不含中氣的月即為閏月
                          //若陰曆臘月起始日大於冬至中氣日，且陰曆正月起始日小於或等於大寒中氣日，則此月為閏月，其餘同理
        if(Math.floor((jdnm[i] + 0.5) > Math.floor(jdzq[i - 1 - yz] + 0.5) && Math.floor(jdnm[i + 1] + 0.5) <= Math.floor(jdzq[i - yz] + 0.5))){
          mc[i] = i - 0.5;
          yz = 1;      //標示遇到閏月
        }else{
          mc[i] = i - yz;	//遇到閏月開始，每個月號要減1
        }
      }
    }else{  //否則表示兩個連續冬至之間只有11個整月，故無閏月
      for(var i=0;i<=12;i++){     //直接賦予這12個月月代碼
        mc[i] = i;
      }
      for(var i=13;i<=14;i++){  //處理次一置月年的11月與12月，亦有可能含閏月
                            //若次一陰曆臘月起始日大於附近的冬至中氣日，且陰曆正月起始日小於或等於大寒中氣日，則此月為閏月，次一正月同理。
        if(Math.floor((jdnm[i] + 0.5) > Math.floor(jdzq[i - 1 - yz] + 0.5) && Math.floor(jdnm[i + 1] + 0.5) <= Math.floor(jdzq[i - yz] + 0.5))){
          mc[i] = i - 0.5;
          yz = 1;      //標示遇到閏月
        }else{
          mc[i] = i - yz;  //遇到閏月開始，每個月號要減1
        }
      }
    }
  }
  //
  _e.Solar2Lunar = function(yea,mx,dx) {
    return Solar2Lunar(yea,mx,dx);
  };
}(QIMEN_STAR));