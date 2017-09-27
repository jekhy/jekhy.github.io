$(function() {
    // 外链加右侧小图标
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

    // 添加代码高亮的class
    $('pre').addClass('prettyprint linenums');
    $.getScript('/static/js/prettify/prettify.js',function(){
        prettyPrint();
    });

    // 显示空间提供商的声明
    if (location.href.indexOf('blog.jekhy.com') > -1) {
        $('#hostedByCodingPages').show();
    }
})
