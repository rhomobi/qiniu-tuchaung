/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */


$(function() {

        uptokenobj = $.ajax({url:uptokenurl,async:false});
        uptoken = eval('(' + uptokenobj.responseText + ')').uptoken;
        console.log(uptoken);
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'qiniu_tuchuang_post',     
        drop_element: 'qiniu_tuchuang_post',
        max_file_size: '100mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '4mb',
        uptoken: uptoken,
        // uptoken_url: 'http://localhost/qiniu/uptoken/',
        domain: host,
        // downtoken_url: '/downtoken',
        // unique_names: true,
        save_key: savekey,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                // $('table').show();
                // $('#success').hide();
                plupload.each(files, function(file) {
                    // var progress = new FileProgress(file, 'fsUploadProgress');
                    // progress.setStatus("等待...");
                    console.log('等待');

                });
            },
            'BeforeUpload': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // if (up.runtime === 'html5' && chunk_size) {
                //     progress.setChunkProgess(chunk_size);
                // }
            },
            'UploadProgress': function(up, file) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                // progress.setProgress(file.percent + "%", up.total.bytesPerSec, chunk_size);

            },
            'UploadComplete': function() {
                // $('#success').show();
                console.log('上传成功');

            },
            'FileUploaded': function(up, file, info) {
                // var progress = new FileProgress(file, 'fsUploadProgress');
                // progress.setComplete(up, info);
                console.log('上传完成');
                var obj = eval('(' + info + ')');
                var key = obj.key;
                var img = '<img src="http://img.yangzhongchao.com/' + key + '">';
                console.log(img);
                tinyMCE.activeEditor.execCommand('mceInsertContent', 0, img);
                console.log(key);

            },
            'Error': function(up, err, errTip) {
                console.log('上传错误');

                // $('table').show();
                // var progress = new FileProgress(err.file, 'fsUploadProgress');
                // progress.setError();
                // progress.setStatus(errTip);
            }

        }
    });
});


$('#pickfiles').click(function(event){
    event.preventDefault();
})