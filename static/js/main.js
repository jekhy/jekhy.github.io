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
    $.getScript('/static/lib/prettify/prettify.js', function(){
        prettyPrint();
    });

    // 添加返回顶部按钮功能
    if ($('#backToTop').length) {
        $(window).scroll(function(){
            if ($(window).scrollTop() > 100) {
                $("#backToTop").fadeIn(1500);
            } else {
                $("#backToTop").fadeOut(1500);
            }
        });

        //当点击跳转链接后，回到页面顶部位置
        $("#backToTop").click(function(){
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 500);
            } else {
                $('body').animate({ scrollTop: 0 }, 500);
            }
            return false;
        });
    }

    // 显示空间提供商的声明
    if (location.href.indexOf('blog.jekhy.com') > -1) {
        $('#hostedByCodingPages').show();
    }
})
