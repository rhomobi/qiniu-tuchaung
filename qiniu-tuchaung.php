<?php
error_reporting(5);
/*
Plugin Name: 七牛图床
Plugin URI:  http://www.yangzhongchao.com/works/qiniu-tuchaung/
Description:  七牛云存储 WordPress 插件：实现在编辑器页面上传图片至七牛服务器
Author: 羊种草
Author URI: http://www.yangzhongchao.com
Version: 0.1
*/

define('PLUGIN_URL', plugins_url('', __FILE__));
define('PLUGIN_DIR', plugin_dir_path(__FILE__));

//设置菜单
function qiniu_tuchuang_menu(){
    add_options_page('qiniu', '七牛图床', 'manage_options', 'qiniu-tuchaung', 'qiniu_tuchuang_options');
}
add_action('admin_menu', 'qiniu_tuchuang_menu');

function qiniu_tuchuang_options(){
?>  
    <h1>图床设置</h1>
    <form method="post" action="options.php">
    <?php 
     settings_fields( 'qiniu_options');
     do_settings_sections( 'qiniu-settings' );
     ?>
	<p class="submit"><input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" /></p>
	</form>
<?php 
}

add_action('admin_init', 'register_qiniu_settings');

function register_qiniu_settings() {
	register_setting('qiniu_options', 'qiniu_options');
	add_settings_section('qiniu_defaults', '默认设置', 'defaults_output', 'qiniu-settings');
	add_settings_field('host', '七牛绑定域名', 'host_output', 'qiniu-settings','qiniu_defaults');
	add_settings_field('prefix', '前缀', 'prefix_output', 'qiniu-settings','qiniu_defaults');
	add_settings_field('bucket', 'bucket', 'bucket_output', 'qiniu-settings','qiniu_defaults');
	add_settings_field('accesskey', 'AccessKey', 'accesskey_output', 'qiniu-settings','qiniu_defaults');
	add_settings_field('secretkey', 'SecretKey', 'secretkey_output', 'qiniu-settings','qiniu_defaults');
}

function host_output() {
	$options = get_option('qiniu_options');
	echo "<input id='host' name='qiniu_options[host]' size='50' type='text' value='{$options['host']}' />";
    echo "<div>设置为你在七牛绑定的域名,没绑定则填写七牛域名<br />仅作图片链接使用,<strong>注意要域名前面要加上 http://。</strong></div>";
}
function prefix_output() {
	$options = get_option('qiniu_options');
	echo "<input id='prefix' name='qiniu_options[prefix]' size='50' type='text' value='{$options['prefix']}' />";
	echo "<div>如果你想像七牛一样在上传的图片前加前缀则填写<br />例如:img,多个:img/2015,不想则留空</div>";

}
function bucket_output() {
	$options = get_option('qiniu_options');
	echo "<input id='bucket' name='qiniu_options[bucket]' size='50' type='text' value='{$options['bucket']}' />";
}
function accesskey_output() {
	$options = get_option('qiniu_options');
	echo "<input id='accesskey' name='qiniu_options[accesskey]' size='50' type='text' value='{$options['accesskey']}' />";
}
function secretkey_output() {
	$options = get_option('qiniu_options');
	echo "<input id='secretkey' name='qiniu_options[secretkey]' size='50' type='text' value='{$options['secretkey']}' />";
}

//上传窗口
add_action('after_wp_tiny_mce', 'qiniu_tuchuang_script');
function qiniu_tuchuang_script(){
?>
<script type="text/javascript" src="<?php echo plugins_url('jquery-1.9.1.min.js', __FILE__); ?>"></script>
<script type="text/javascript" src="<?php echo plugins_url('plupload.full.min.js', __FILE__); ?>"></script>
<script type="text/javascript" src="<?php echo plugins_url('qiniu.js', __FILE__); ?>"></script>
<script type="text/javascript" src="<?php echo plugins_url('main.js', __FILE__); ?>"></script>
<?php
}

add_action('submitpost_box', 'qiniu_tuchuang_post_box');
function qiniu_tuchuang_post_box(){
    add_meta_box('qiniu_tuchuang_div', __('七牛图床'), 'qiniu_tuchuang_post_html', 'post', 'side');
}

add_action('submitpost_box', 'qiniu_tuchuang_style');
function qiniu_tuchuang_style(){
	wp_enqueue_style('qiniu_tuchuang_style', plugins_url('qiniu_tuchuang.css', __FILE__));
}

function qiniu_tuchuang_post_html(){
	$options = get_option('qiniu_options');
    $host = $options['host'];
    $bucket = $options['bucket'];
    $prefix = $options['prefix'];
    $accesskey = $options['accesskey'];
    $secretkey = $options['secretkey'];
    if (!empty($prefix)) {
    	echo '<script>savekey = true </script>';
    }else echo '<script>savekey = false </script>';;
    echo '<script>uptokenurl=\''. plugins_url('uptoken.php', __FILE__) . '?sk='. $secretkey . '&ak=' . $accesskey . '&bucket=' . $bucket . '&prefix=' . $prefix .'\'</script>';
    echo '<script>host = \'' . $host . '\'</script>';
    echo '<div id="qiniu_tuchuang_post">';
    echo '<div id="pickfiles" href="#" ><span>上传图片</span></div>';
}
?>