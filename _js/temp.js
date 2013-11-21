function calc(_dun, _kook, gan_chi) {
  //var d = new Date(); //·í¤U
  //
  var tcol0 = [gan_chi[0]];
  var dcol0 = [gan_chi[1]];
  // ­pºâ·í«e§½¼Æ
  // ­p³±¶§¹P
  var dun_type = _dun; // 0¬°³±¹P, 1¬°¶§¹P, ¨ä¾l¬°¿ù»~
  var using_kook = _kook;  //§½¼Æ
  /** ­«­p®É¦¯­º **/
  //¡@®É¦¯­º
  var chun_sau = "¤l¤¡±G¥f¨°¤x¤È¥¼¥Ó¨»¦¦¥è".indexOf(dcol0[0]) - "¥Ò¤A¤þ¤B¥³¤v©°¨¯¤Ð¬Ñ".indexOf(tcol0[0]);
  if(chun_sau < 0) chun_sau += 12;
  // «Ø¦a½L
  var dei_pan = ""; // «Ø¦a½L
  if(dun_type == 1) { // ¶§¹P
    //var dei_pan = " ¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".substr(9-using_kook+1,9); // ¦a½L
    var dei_pan = "¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".substr(9-using_kook+1,9); // ¦a½L
  } else { // ³±¹P
    //var dei_pan = " ¥³¤A¤þ¤B¬Ñ¤Ð¨¯©°¤v¥³¤A¤þ¤B¬Ñ¤Ð¨¯©°¤v".substr(9-using_kook+1,9);
    var dei_pan = "¥³¤A¤þ¤B¬Ñ¤Ð¨¯©°¤v¥³¤A¤þ¤B¬Ñ¤Ð¨¯©°¤v".substr(9-using_kook+1,9);
  }//console.log(dei_pan);
  // §ä­È²Å
  var chun_sau = " ¤l¦¦¥Ó¤È¨°±G".indexOf("¤l±G¨°¤È¥Ó¦¦".charAt(parseInt(chun_sau/2)));
  var jik_fu_idx = 0;
  var jik_fu_star = 0;
  var _tmp = tcol0[0];
  if(dun_type == 1) { // ¶§¹P
    var jik_fu_idx = using_kook + chun_sau - 1;
    while(jik_fu_idx > 9) jik_fu_idx -= 9;
    while(jik_fu_idx < 1) jik_fu_idx += 9;
    if(_tmp == '¥Ò') _tmp = " ¥³¤v©°¨¯¤Ð¬Ñ".charAt(chun_sau);
    jik_fu_star = " ¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".indexOf(_tmp) + using_kook - 1;
    while(jik_fu_star > 9) jik_fu_star -= 9;
  } else {
    var jik_fu_idx = 1 + using_kook - chun_sau;
    while(jik_fu_idx > 9) jik_fu_idx -= 9;
    while(jik_fu_idx < 1) jik_fu_idx += 9;
    if(_tmp == '¥Ò') _tmp = " ¥³¤v©°¨¯¤Ð¬Ñ".charAt(chun_sau);
    jik_fu_star = 1 + using_kook - " ¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".indexOf(_tmp);
    while(jik_fu_star < 1) jik_fu_star += 9;
  }
  //if(jik_fu_star == 5) jik_fu_star = 2; // ¸V¬P±H¤G®c
  if(jik_fu_star == 5) jik_fu_star = 2; // ¸V¬P±H¤G®c
  // ­p­È¨Ï, ¤£¤À³±¶§¹P
  var jik_fu_mun = 0;
  if(dun_type == 1) {
    jik_fu_mun = jik_fu_idx + " ¥Ò¤A¤þ¤B¥³¤v©°¨¯¤Ð¬Ñ".indexOf(tcol0[0]) - 1;
    while(jik_fu_mun > 9) jik_fu_mun -= 9;
  } else {
    jik_fu_mun = jik_fu_idx - " ¥Ò¤A¤þ¤B¥³¤v©°¨¯¤Ð¬Ñ".indexOf(tcol0[0]) + 1;
    while(jik_fu_mun < 1) jik_fu_mun += 9;
  }
  //console.log("jik_fu_mun:",jik_fu_mun);
  if(jik_fu_mun == 5) jik_fu_mun = 2; // ¤¤®c±H©[¤G®c
  // ­pºâ¬P½L
  var houses_star_target = "18349276".indexOf(jik_fu_star);
  var houses_star_idx = "183492761834927618349276".substr(8-houses_star_target+1, 8);
  //console.log("houses_star_idx1:",houses_star_idx);
  var houses_star_idx  = [1,8,3,4,9,2,7,6]; var _jfi = (jik_fu_idx == 5 ? 2 : jik_fu_idx);
  while(houses_star_idx[houses_star_target] != _jfi) {
    houses_star_idx.unshift(houses_star_idx.pop());
  }
  var star_pan = new Array; //¬P½L
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
    houses_star.push("¡A½´Ð~½Ä»²¸V¤ß¬W¥ô­^".charAt(star_pan[i]));
  }
  // ­pºâ¤Ñ½L
  var tin_pan = new Array;  // ¤Ñ½L
  if( dun_type  == 1) { // ¶§¹P
    for(var i = 0; i < 9;i++) 
    {
      var _tin = star_pan[i] - using_kook + 1;
      while(_tin < 1) _tin += 9;
      tin_pan.push(" ¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".charAt(_tin));
    }
  } else {
    for(var i = 0; i < 9; i++) {
      var _tin = using_kook - star_pan[i] + 1;
      while(_tin < 1) _tin += 9;
      tin_pan.push(" ¥³¤v©°¨¯¤Ð¬Ñ¤B¤þ¤A".charAt(_tin));
    }
  }
  // ­pºâ¤Kªù
  var houses_door_target = "18349276".indexOf(jik_fu_mun);
  var houses_door_idx  = [1,8,3,4,9,2,7,6];
  //console.log("houses_door_target: ",houses_door_target);
  //return;
  var _jfi = (jik_fu_idx == 5 ? 2 : jik_fu_idx);
  while(houses_door_idx[houses_door_target] != _jfi) {
    houses_door_idx.unshift(houses_door_idx.pop());
  }
  var door_pan = new Array; //ªù½L(¤Kªù)
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
    house_door.push("¡A¥ð¦º¶Ë§ù¡@¶}Åå¥Í´º".charAt(door_pan[i]));
  }
  // ­pºâ¤K¯«
  var houses_god;
  if(dun_type == 1) { // ¶§¹P-¶¶±Æ
    var houses_god_target = "18349276".indexOf(jik_fu_star);
    houses_god = ['²Å','³D','³±','¦X','¥Õ','¥È','¦a','¤Ñ'];
    while(houses_god[houses_god_target] != '²Å') {
      houses_god.unshift(houses_god.pop());
    }
  } else {
    var houses_god_target = "18349276".indexOf(jik_fu_star);
    houses_god = ['²Å','¤Ñ','¦a','¥È','¥Õ','¦X','³±','³D'];
    while(houses_god[houses_god_target] != '²Å') {
      houses_god.unshift(houses_god.pop());
    }
  }
  var god_pan = new Array; //¯«½L(¤K¯«)
  for(var i = 1; i < 10; i++)
  {
    if(i == 5) {
      god_pan.push('¡@');
    } else {
      god_pan.push(houses_god["18349276".indexOf(i)]);
    }
  }
  /**
  // ¿é¥X¤Ñ½L
  document.write("¤Ñ½L¡G",tin_pan.join(""),"\r\n");
  // ¿é¥X¦a½L
  document.write("¦a½L¡G",dei_pan,"\r\n");
  // ¿é¥X¬P½L
  document.write("¬P½L¡G",houses_star.join(""),"\r\n");
  // ¿é¥Xªù½L
  document.write("ªù½L¡G",house_door.join(""),"\r\n");
  // ¿é¥X¤K¯«
  document.write("¯«½L¡G",god_pan.join(""),"\r\n");
  // §¹µ²
  **/
  //console.log({'info':{'¤z¤ä':gan_chi,'¹P':_dun?'¶§':'³±','§½':_kook },'¬P':tin_star, '¤Ñ':tin_pan, '¦a':dei_pan, 'ªù':door_pan, '¯«':god_pan});
  return {'info':{'¤z¤ä':gan_chi,'¹P':_dun?'¶§':'³±','§½':_kook,'²Å':" ½´Ð~¨R»²¸V¤ß¬W¥ô­^".charAt(jik_fu_idx) },'¬P':houses_star, '¤Ñ':tin_pan, '¦a':dei_pan, 'ªù':house_door, '¯«':god_pan};
}