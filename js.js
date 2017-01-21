$(document).ready(function() {
	if ($('#results').css('display','none')) {
		$('.footer').css({'position': 'fixed', 'bottom': '0', 'left': '0'})
	}
});//document ready	

	$('#input').keyup(function(e) {
		var textOut = document.getElementsByTagName("input")[0].value;
		if (e.which == 13) {
			$.ajax({
				url: 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search='+textOut,
				dataType: 'jsonp',
				success: (function(data) {
					$('#input').blur();
					$('.search').css({'position':'relative', 'top':'20px'});
					$('.random').find('a').text("(if you're not happy with what we found, click here for a random article)");
					$('#results').css('display', 'inline-block');
					$('.footer').css({'position': '', 'bottom': '', 'left': ''});
					
					var title = [];
					var snippet = [];
					var link = [];
					var titleID = [];
					var snippetID = [];
					var resID = [];
					
					for (var i = 0; i < 10; i++) {
						title[i] = data[1][i];
						snippet[i] = data[2][i];
						link[i] = data[3][i];
						titleID[i] = "title" + i;
						snippetID[i] = "snippet" + i;
						resID[i] = "res" + i;
					};
					
					for (var j = 0; j < 10; j++) {
						$('#' + titleID[j]).html(title[j]);
						$('#' + snippetID[j]).html(snippet[j]);
						$('#' + resID[j]).attr({'href': link[j], 'target': '_blank'});
					};
					
					title.length = 0;
					snippet.length = 0;
					link.length = 0;
					
				})//DOM manipulation
			});//ajax
		}//if key is enter
	});//keyup function
	
	$('.title').hover(function() {
		$(this).css('color', '#5BC0DE');
	});
