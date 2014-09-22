if(typeof(QIMEN_STAR) == "undefined") var QIMEN_STAR = {};
(function(_e) {
  "use strict";
  function check(a,b) {
    if(a == 0) return 'ｘ';
    if(a == 1) return 'ｏ';
    return 0;
  }
  function genDate(y,m,d,h) {
    //var y = "子丑寅卯辰巳午未申酉戌亥".indexOf(y) + 1;
    //var m = "寅卯辰巳午未申酉戌亥子丑".indexOf(m) + 1;
    //var d = "子丑寅卯辰巳午未申酉戌亥".indexOf(d) + 1;
    //var h = "子丑寅卯辰巳午未申酉戌亥".indexOf(h) + 1;
    var up = (y + m + d) % 8; if(up == 0) up = 8;
    var down = (y + m + d + h) % 8; if(down == 0) down = 8;
    var chg = (y + m + d + h) % 6; if(chg == 0) chg = 6;
    //
    var main2 = {'8':'000','4':'001','6':'010','2':'011','7':'100','3':'101','5':'110','1':'111'};
    var a = main2[up], b = main2[down], c = main2[up], d = main2[down];
    switch(chg) {
      case 6: c = ((c[0] == '1') ? '0' : '1') + c[1] + c[2]; break;
      case 5: c = c[0] + ((c[1] == '1') ? '0' : '1') + c[2]; break;
      case 4: c = c[0] + c[1] + ((c[2] == '1') ? '0' : '1'); break;
      case 3: d = ((d[0] == '1') ? '0' : '1') + d[1] + d[2]; break;
      case 2: d = d[0] + ((d[1] == '1') ? '0' : '1') + d[2]; break;
      case 1: d = d[0] + d[1] + ((d[2] == '1') ? '0' : '1'); break;
    }
    return gen(a,b,c,d,h);
  }
  function rand() {
    var a = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        b = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        c = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        d = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2);
    return gen(a,b,c,d);
  }
  function gen(a, b, c, d) {
    var main = {'000':'地','001':'雷','010':'水','011':'澤','100':'山','101':'火','110':'風','111':'天'};
    var main2 = {'地':'000','雷':'001','水':'010','澤':'011','山':'100','火':'101','風':'110','天':'111'};
    var main3 = {'000':'０００','001':'００１','010':'０１０','011':'０１１','100':'１００','101':'１０１','110':'１１０','111':'１１１'};
    var upper = {'000':'酉亥丑','110':'卯巳未','101':'巳未酉','011':'未酉亥','111':'戌申午','001':'戌申午','010':'子戌申','100':'寅子戌',};
    var lower = {'000':'卯巳未','110':'酉亥丑','101':'亥丑卯','011':'丑卯巳','111':'辰寅子','001':'辰寅子','010':'午辰寅','100':'申午辰',};
    // 
    /*
    var a = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        b = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        c = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2),
        d = Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2)+''+Math.floor(Math.random() * 2);
    */
    var e = ''+a[1]+a[2]+b[0],
        f = ''+a[2]+b[0]+b[1],
        g = ''+c[1]+c[2]+d[0],
        h = ''+c[2]+d[0]+d[1];
    var ab = upper[a]+lower[b],
        cd = upper[c]+''+lower[d],
        ef = upper[e]+lower[f];
    //定世應
    var sy = (a[0] == b[0] ? "0":"1")+(a[1] == b[1] ? "0":"1")+(a[2] == b[2] ? "0":"1");
    if(sy == '000') sy = '世　　應　　';
    else if(sy == '001') sy = '　　應　　世';
    else if(sy == '011') sy = '　應　　世　';
    else if(sy == '111') sy = '應　　世　　';
    else if(sy == '110') sy = '　　世　　應';
    else if(sy == '100') sy = '　世　　應　';
    else if(sy == '101') sy = '　　世　　應';
    else if(sy == '010') sy = '應　　世　　';
    var sy2 = (c[0] == d[0] ? "0":"1")+(c[1] == d[1] ? "0":"1")+(c[2] == d[2] ? "0":"1");
    //console.log(sy2);
    if(sy2 == '000') sy2 = '世　　應　　';
    else if(sy2 == '001') sy2 = '　　應　　世';
    else if(sy2 == '011') sy2 = '　應　　世　';
    else if(sy2 == '111') sy2 = '應　　世　　';
    else if(sy2 == '110') sy2 = '　　世　　應';
    else if(sy2 == '100') sy2 = '　世　　應　';
    else if(sy2 == '101') sy2 = '　　世　　應';
    else if(sy2 == '010') sy2 = '應　　世　　';
    //
    if(arguments.length > 4) {
      if(a == b && (a == '000' || a == '111')) {
        if(arguments[4]%2 == 1) {
          e = d[2] + c[0] + c[1] ; f =  c[2] + d[0] + d[1];
        } else {
          e = c[1] + c[2] + d[0] ; f =  d[1] + d[2] + c[0];
        }
        ef = upper[e]+lower[f];
      }
    }
    return {
            0:sy[0]+ab[0]+check(a[0],c[0])+(a[0] != c[0]?'－&rArr;':'　　')+cd[0]+sy2[0]+'　'+ef[0],
            1:sy[1]+ab[1]+check(a[1],c[1])+(a[1] != c[1]?'－&rArr;':'　　')+cd[1]+sy2[1]+'　'+ef[1],
            2:sy[2]+ab[2]+check(a[2],c[2])+(a[2] != c[2]?'－&rArr;':'　　')+cd[2]+sy2[2]+'　'+ef[2],
            3:sy[3]+ab[3]+check(b[0],d[0])+(b[0] != d[0]?'－&rArr;':'　　')+cd[3]+sy2[3]+'　'+ef[3],
            4:sy[4]+ab[4]+check(b[1],d[1])+(b[1] != d[1]?'－&rArr;':'　　')+cd[4]+sy2[4]+'　'+ef[4],
            5:sy[5]+ab[5]+check(b[2],d[2])+(b[2] != d[2]?'－&rArr;':'　　')+cd[5]+sy2[5]+'　'+ef[5],
            //1:sy[1]+'▅'+(a[1]=='1'?'▅':'　')+'▅'+ab[1]+''+(a[1] != c[1]?'－&rArr;':'　　')+''+'▅'+(c[1]=='1'?'▅':'　')+'▅'+cd[1],
            6:'　'+main[a]+main[b]+'　　'+main[c]+main[d]+'　'+main[e]+main[f],
           };
    
  }
  //
  _e.yi = new Object();
  _e.yi.rand = rand;
  _e.yi.gen  = gen;
  _e.yi.genDate = genDate;
}(QIMEN_STAR || {}));