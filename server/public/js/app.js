console.log('loaded')
$('.dogContainer').on('click', function(e){
	console.log(e.target)
	dogid = $(e.target).data('id');
	$.ajax({
		url: '/dogs/'+ dogid,
		type: 'GET',
		success: function(result){
			console.log(dogid)
			window.location.replace("http://localhost:3000/dogs/" + dogid)},
		error: function(err){
			console.log(err);
		}
	})
});
