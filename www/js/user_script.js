$(document).ready(function(){
var $base_url = 'http://www.varunshrivastava.in/';
var $loader = '<center><img src="img/loader.gif" /></center>';

getBlogs();

function getBlogs(){
	var $blogListView = $('#blog_listview');
	$blogListView.html($loader);

	$.ajax({
		url: $base_url+'site/getAsyncBlogs',
		type: 'GET',
		success: function(data){
			$blogListView.html('');
			data = $.parseJSON(data);

			$.each(data, function(index, value){
				var li = '<li data-icon="false">'+
				'<a data-transition="flip" href="#blogpage" data-blog-id="' + value.id + '" id="blog_item">'+
					'<div><img style="width: 100%;" src="' + value.cover_image + '" /> </div>'+
					'<h2> '+ value.heading +'</h2>'+
					'<p>'+value.content.substring(0, 300)+'...</p>'+
				'</a>'+
				'</li>';
				$blogListView.append(li);
			});
			$blogListView.listview('refresh');
		},
		error: function(xhr, status, msg){
			console.log(xhr.responseText);
		}
	});
}

$('document, body').on('click', '#blog_item', function(){
	var $url =  $base_url+'site/getBlog/'+$(this).attr('data-blog-id');
	var $blogPost = $('#blog_post');
	$blogPost.html($loader);

	$.ajax({
		url: $url,
		type: 'GET',
		success: function(data){
			data = $.parseJSON(data);
			console.log(data);
			var html_string = '<div style="width: 100%;"><img style="width: 100%;" src=" ' + data[0].cover_image + '" /></div>'+
			'<h1>'+data[0].heading+'</h1>'+
				'<p>'+data[0].content+'</p>'+
				'<br />'+
				'<span style="font-family: sans-serif, tahoma; font-weight: bold;" >Total Blog View: ' + data[0].views + '</span>';

			$blogPost.html(html_string);
		},
		error: function(xhr, status, msg){
			console.log(xhr.responseText);
		}
	})
});

$('#contact_form').submit(function(e){
	e.preventDefault();
	var $successDiv = $('#success_div');
	$successDiv.html($loader);
	var formData = $(this).serialize();
	var url = $(this).attr('action');

	$.ajax({
		url: url,
		type: 'POST',
		data: formData,
		success: function(data){
			var success = '<span class="alert alert-success">Message has been sent Successfully!</span>';
			$successDiv.html(success);
			$('#contact_form input').val('');
			$('#contact_form textarea').val('');
		},
		error: function(xhr, status, msg){
			console.log(xhr.responseText);
		}
	});
});



});