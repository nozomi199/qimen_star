<?php
/**
 * initialize param
 */
define('ROOT',realpath("."));
define('GZIP_LEVEL',9);
/**
 * pre handler
 */
function _pre_handler() {
	session_start();
   //if(!defined($_SESSION['key']))
   //  $_SESSION['key'] = substr(str_shuffle("0123456789ABCDEF"),0,4);
   $t = &$_POST;
   foreach($t as $k => $v) $t[$k] = htmlentities($v, ENT_QUOTES, "UTF-8");
   $t = &$_GET;
   foreach($t as $k => $v) $t[$k] = htmlentities($v, ENT_QUOTES, "UTF-8");
};
function update_key() {
   return $_SESSION['key'] = substr(str_shuffle("0123456789ABCDEF"),0,4);
}
/**
 * post handler
 */
function _post_handler() {
};
/**
 * main handler
 */
$_urls = array();
/**
 * index handler
 */
$_urls['/']['GET'] = function() {
   header("Location: qimen_star.html");
};
$_urls['/early']['GET'] = function() {
   header("Location: qimen_star.html");
};
$_urls['/custom']['GET'] = function() {
   header("Location: _custom-qimen_star.html");
};

/**
 * update random key
 */
$_urls['/key']['GET'] = function() {
   header('Content-type: application/json');
   echo json_encode(['key'=>update_key()]);
};
-
/**
 * handle upload image
 * max: 200 KB
 */
$_urls['/upload']['POST'] = function()
{
   die('test only, no upload');
   if ($_FILES["file"]["error"] > 0) die('501');;
   if ($_FILES["file"]["size"] / 1024 > 200) die('502');;
   if (!(($_FILES["file"]["type"] == "image/gif")
      || ($_FILES["file"]["type"] == "image/jpeg")
      || ($_FILES["file"]["type"] == "image/jpg")
      || ($_FILES["file"]["type"] == "image/pjpeg")
      || ($_FILES["file"]["type"] == "image/x-png")
      || ($_FILES["file"]["type"] == "image/png")))
      die('503');
   //
   $extension = @end(explode(".", $_FILES["file"]["name"]));
   $allowedExts = array("gif", "jpeg", "jpg", "png");
   if(!in_array($extension, $allowedExts)) die('504');
   //
   $filename = time()."_".substr(str_shuffle("0123456789ABCDEF"),0,4).".".$extension;
   move_uploaded_file($_FILES["file"]["tmp_name"],
      "_upload/" .$filename );
   echo "[img]/_upload/{$filename}[/img]";
};
$_urls['/phpinfo']['GET'] = function()
{
  phpinfo();
};
/**
 * router application
 */
function main(&$_urls)
{
  _pre_handler();
  $method = strtoupper($_SERVER['REQUEST_METHOD']);
  $path = $_SERVER['REQUEST_URI'];
  $found = false;
  krsort($_urls);
  foreach($_urls as $regex => $handler)
  {
    $regex = str_replace('/', '\/', $regex);
    $regex = '^' . $regex . '\/?$';
    if(preg_match("/^$regex\$/i", $path, $matches))
    {
      $found = true;
      if($method == 'GET')
      {
         $handler['GET']($matches);
      }
      else if($method == 'POST')
      {
        $handler['POST']($matches);
      }
      break;
    }
  }
  if(!$found) die(json_encode([$_SERVER,$_REQUEST,$_GET,$_POST]));
};
/**
 * start entry point
 */
main($_urls);
?>