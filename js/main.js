/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */

(function($) {
               uptokenobj = $.ajax({url:uptokenurl,async:false});
               uptoken = eval('(' + uptokenobj.responseText + ')').uptoken;
               console.log(uptoken);
           var uploader = Qiniu.uploader({                  
               runtimes: 'html5,flash,html4',           //上传模式,依次退化            
               browse_button: 'pickfiles',              //上传选择的点选按钮，**必需**   
               container: 'qiniu_tuchuang_post',        //上传区域DOM ID，默认是browser_button的父元素            
               drop_element: 'qiniu_tuchuang_post',     //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传              
               max_file_size: '100mb',                  //最大文件体积限制
               flash_swf_url: 'js/Moxie.swf',           //引入flash,相对路径      
               dragdrop: true,                          //开启可拖曳上传
               chunk_size: '4mb',                       //分块上传时，每片的体积
               uptoken: uptoken,                  
               // uptoken_url: uptokenurl,                
               domain: host,
               // downtoken_url: '/downtoken',
               // unique_names: true,
               // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
               save_key: savekey,
               // x_vars: {
               //     'id': '1234',
               //     'time': function(up, file) {
               //         var time = (new Date()).getTime();
               //         // do something with 'time'
               //         return time;
               //     },
               // },
               auto_start: true,                        //选择文件后自动上传，若关闭需要自己绑定事件触发上传
               init: {

                   'FilesAdded': function(up, files) {
                       // 文件添加进队列后,处理相关的事情
                       // $('table').show();
                       // $('#success').hide();
                       // plupload.each(files, function(file) {
                       //     var progress = new FileProgress(file, 'fsUploadProgress');
                       //     progress.setStatus("等待...");
                       //     console.log('上传中');
       
                       // });
                   },
                   'BeforeUpload': function(up, file) {
                       // 每个文件上传前,处理相关的事情
                       // var progress = new FileProgress(file, 'fsUploadProgress');
                       // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                       // if (up.runtime === 'html5' && chunk_size) {
                       //     progress.setChunkProgess(chunk_size);
                       // }
                   },
                   'UploadProgress': function(up, file) {
                       // 每个文件上传时,处理相关的事情
                       // var progress = new FileProgress(file, 'fsUploadProgress');
                       // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                       // progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);
                       span = $('#spantxt').text(file.percent + "%");
       
                   },
                   'UploadComplete': function() {
                       //队列文件处理完毕后,处理相关的事情
                       console.log('上传完成');
                       span = $('#spantxt').text('上传完成');       
                   },
                   'FileUploaded': function(up, file, info) {
                       // 每个文件上传成功后,处理相关的事情
                       // 其中 info 是文件上传成功后，服务端返回的json，形式如
                       // {
                       //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                       //    "key": "gogopher.jpg"
                       //  }
                       // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                       // var domain = up.getOption('domain');
                       // var res = parseJSON(info);
                       // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                       var title = $('#title').val();
                       console.log(title);
                       var obj = eval('(' + info + ')');
                       var key = obj.key;
                       qiniuurl = host + '/' + key;
                       if (imgurl == true) {
                            var img = '<a href="' + qiniuurl + '"><img src="' + qiniuurl
                                    + '" alt="' + title
                                    + '" title="' + title
                                    + '"></a>';    
                       } else {
                             var img = '<img src="' + qiniuurl
                                    + '" alt="' 
                                    + title
                                    + '" title="'
                                    + title
                                    + '">';   
                       }
                       console.log(img);
                       tinyMCE.activeEditor.execCommand('mceInsertContent', 0, img);
                       console.log(key+'添加完成');
                   },
                   'Error': function(up, err, errTip) {
                       //上传出错时,处理相关的事情
                       console.log(err.file.name + '上传错误:'+ errTip);
                       console.log('错误代码：' + err.status);
                       var status = err.status;
                       if (status == 614) {
                            var title = $('#title').val();
                            console.log(title);
                            var key = err.file.name;
                            qiniuurl = host + '/' + key;
                            if (imgurl == true) {
                                 var img = '<a href="' + qiniuurl + '"><img src="' + qiniuurl
                                         + '" alt="' + title
                                         + '" title="' + title
                                         + '"></a>';    
                            } else {
                                  var img = '<img src="' + qiniuurl
                                         + '" alt="' 
                                         + title
                                         + '" title="'
                                         + title
                                         + '">';   
                            }
                            console.log(img);
                            tinyMCE.activeEditor.execCommand('mceInsertContent', 0, img);
                       };
                       span = $('#spantxt').text('上传完成'); 
                   }
                   // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
                   // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs
               }
           });
})(jQuery);