$(function() {
    $('a').each(function(index, element){
        var href = $(this).attr('href');
        if (href){
            if (href.indexOf('#') == 0) {
            } else if (href.indexOf('/') == 0 || href.toLowerCase().indexOf('jekhy.com') > -1) {
            } else if ($(element).has('img').length) {
            } else {
                $(this).attr('target','_blank');
                $(this).addClass('external');
            }
        }
    });
})
