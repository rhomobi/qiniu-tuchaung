<?php
// header('Content-type: text/json');

error_reporting(E_ALL & ~ E_NOTICE); 
require_once 'vendor/autoload.php';

use Qiniu\Auth;
use Qiniu\Storage\BucketManager;
use Qiniu\Storage\UploadManager;




// $accessKey = 'zCzjxcDKmBkzv3wF0Swef0Ffr8-xB5qAB2dRRaXo';
// $secretKey = 'XG2qkuZYf2segsq3gxeiBgNNiqAY3QOhgedTVWSs';

$accessKey = $_GET['ak'];
$secretKey = $_GET['sk'];
$auth = new Auth($accessKey, $secretKey);

// $bucketMgr = New BucketManager($auth);
$bucket = $_GET['bucket'];
// $key = 'clover.png';



// 设置put policy的其他参数, 上传回调
// $opts = array(
//          // 'returnUrl' => 'http://localhost/qiniu/index.php',  
//          // 'returnBody' => '$(key)',
// 	     'returnBody'=> '{
//                          "name": $(fname),
//                          "size": $(fsize),
//                          "type": $(mimeType),
//                          "hash": $(etag),
//                          "w": $(imageInfo.width),
//                          "h": $(imageInfo.height),
//                          "color": $(exif.ColorSpace.val)
//                           }'
//      );

$token = $auth->uploadToken($bucket, null, 3600, $opts);
// $uploadMgr = New UploadManager();



$tokenobj = array('uptoken' => $token);
// print_r($tokenobj);
echo json_encode($tokenobj);
// echo '{"uptoken":"'.$token.'"';
?>
