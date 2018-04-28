/**
 * Created by coolzhm on 2018-1-12.
 */


//定义console对象，并声明该console对象的log函数为空函数
if (!window.console) {
    window.console = {
        log: function () {
        }
    }
}

/*
 * jsui
 * ====================================================
 */
jsui.bd = $('body')
// jsui.is_signin = jsui.bd.hasClass('logged-in') ? true : false;

// function addNumber(hello){document.getElementById("txaArticle").value += hello;}

//增加鼠标悬停提示
$('.widget_divTags_inner li a,.article-tags a,.excerpt .cat').each(function () {
    $(this).tooltip({
        container: 'body',
        placement: 'top',
        /* placement: 'bottom', */
        title: '查看关于 ' + $(this).text() + ' 的文章'
    })
})
$('.readers a').tooltip({
    container: 'body',
    placement: 'top',
    /* placement: 'bottom', html : true,*/
    title: $(this).title
})
//侧导航高亮
var s = document.location;
$(".pagemenu li").each(function () {  //找容器
    if ($(this).find("a").attr("href") == s.toString().split("#")[0]) {
        $(this).attr("class", "active")  //给当前页的<li>加上class="active"，如<li class="active">首页</li>
    }
});

//TAB切换
if ($('.widget-nav').length) {
    $('.widget-nav li').each(function (e) {
        $(this).hover(function () {
            $(this).addClass('active').siblings().removeClass('active')
            $('.widget-navcontent .item:eq(' + e + ')').addClass('active').siblings().removeClass('active')
        })
    })

}
if ($('.article-content').length) {

    $('.article-content img').attr('data-tag', 'bdshare');

}

//弹出式暗影 微信
if ($('.sns-wechat').length) {
    $('.sns-wechat').on('click', function () {
        var _this = $(this)
        if (!$('#modal-wechat').length) {
            $('body').append('\
                <div class="modal fade" id="modal-wechat" tabindex="-1" role="dialog" aria-hidden="true">\
                    <div class="modal-dialog" style="margin-top:200px;width:340px;">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                <h4 class="modal-title">' + _this.attr('title') + '</h4>\
                            </div>\
                            <div class="modal-body" style="text-align:center">\
                                <img style="max-width:100%" src="' + _this.data('src') + '">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ')
        }
        $('#modal-wechat').modal()
    })
}
//弹出式暗影 赞助
if ($('.sns-zanzhu').length) {
    $('.sns-zanzhu').on('click', function () {
        var _this = $(this)
        if (!$('#modal-zanzhu').length) {
            $('body').append('\
                <div class="modal fade" id="modal-zanzhu" tabindex="-1" role="dialog" aria-hidden="true">\
                    <div class="modal-dialog" style="margin-top:200px;width:340px;">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                <h4 class="modal-title">' + _this.attr('title') + '</h4>\
                            </div>\
                            <div class="modal-body" style="text-align:center">\
                                <div class="row">\
                                    <div class="col-md-6">    \
                                        <img style="max-width:100%" src="' + _this.data('wechartsrc') + '">\
                                        <span>微信</span>   \
                                    </div>  \
                                    <div class="col-md-6">  \
                                        <img style="max-width:100%" src="' + _this.data('alipaysrc') + '">\
                                        <span>支付宝</span>  \
                                    </div>  \
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ')
        }
        $('#modal-zanzhu').modal()
    })
}

if ($('.carousel').length) {
    var el_carousel = $('.carousel')

    el_carousel.carousel({
        interval: 4000
    })

    // require(['hammer'], function(Hammer) {
    //
    //     // window.Hammer = Hammer
    //
    //     var mc = new Hammer(el_carousel[0]);
    //
    //     mc.on("panleft panright swipeleft swiperight", function(ev) {
    //         if( ev.type == 'swipeleft' || ev.type == 'panleft' ){
    //             el_carousel.carousel('next')
    //         }else if( ev.type == 'swiperight' || ev.type == 'panright' ){
    //             el_carousel.carousel('prev')
    //         }
    //     });
    //
    // })
}
/*
 * lazyload  event : click
 * ====================================================
 */
if ($('.thumb-span img').data('src') || $('.thumb:first').data('src')/* || $('.thumb-post:first').data('src')  */ || $('.avatar:first').data('src') || $('.widget_divPrevious_inner .thumbnail:first').data('src')) {

//     require(['lazyload'], function() {
//
//         $('.thumb').lazyload({
//             data_attribute: 'src',
// 			failurelimit : 100 ,
//             placeholder: jsui.uri + '/style/img/thumbnail.png',
//             threshold: 400
//         })
// /*         $('.thumb-post').lazyload({
//             data_attribute: 'src',
// 			failurelimit : 100 ,
//             placeholder: jsui.uri + '/style/img/loading.gif',
//             threshold: 400
//         })	 */
//         $('.avatar').lazyload({
//             data_attribute: 'src',
// 			effect : "fadeIn",
// 			failurelimit : 100 ,
//             placeholder: jsui.uri + '/style/img/avatar-default.png',
//             threshold: 400
//         })
//
// 		$('.widget_divPrevious_inner .thumbnail').lazyload({
//             data_attribute: 'src',
// 			failurelimit : 100 ,
//             placeholder: jsui.uri + '/style/img/thumbnail.png',
//             threshold: 400
//         })
//
//     })
}


//加载ias.js 和lazyload.js 列表滚动图片延迟加载
if (Number(jsui.ajaxpager) > 0 && ($('.excerpt').length || $('.site-like').length || $('.excerpt-minic').length)) {
    require(['ias'], function () {
        if (!jsui.bd.hasClass('site-like') && $('.site-like').length) {
            $.ias({
                triggerPageThreshold: jsui.ajaxpager ? Number(jsui.ajaxpager) + 1 : 5,
                history: false,
                container: '.site-likes',
                item: '.site-like',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="' + jsui.uri + '/style/img/loading.gif"></div>',
                trigger: 'More',
                onRenderComplete: function () {
                    require(['lazyload'], function () {
                        $('.thumb').lazyload({
                            data_attribute: 'src',
                            placeholder: jsui.uri + '/style/img/thumbnail.png',
                            threshold: 0
                        });
                    });
                    if (jsui.bd.hasClass('search-results')) {
                        var val = $('.site-search-form .search-input').val()
                        var reg = eval('/' + val + '/i')
                        $('.excerpt h2 a, .excerpt .note').each(function () {
                            $(this).html($(this).text().replace(reg, function (w) {
                                return '<b>' + w + '</b>'
                            }))
                        })
                    }
                }
            });

        }
        if (!jsui.bd.hasClass('excerpt') && $('.excerpt').length) {
            $.ias({
                triggerPageThreshold: jsui.ajaxpager ? Number(jsui.ajaxpager) + 1 : 5,
                history: false,
                container: '.content',
                item: '.excerpt',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="' + jsui.uri + '/style/img/loading.gif"></div>',
                trigger: 'More',
                onRenderComplete: function () {
                    require(['lazyload'], function () {
                        $('.thumb').lazyload({
                            data_attribute: 'src',
                            placeholder: jsui.uri + '/style/img/thumbnail.png',
                            threshold: 400
                        });
                    });
                    if (jsui.bd.hasClass('search-results')) {
                        var val = $('.site-search-form .search-input').val()
                        var reg = eval('/' + val + '/i')
                        $('.excerpt h2 a, .excerpt .note').each(function () {
                            $(this).html($(this).text().replace(reg, function (w) {
                                return '<b>' + w + '</b>'
                            }))
                        })
                    }
                }
            });

        }
        if (jsui.bd.hasClass('site-minicat') && $('.excerpt-minic').length) {
            $.ias({
                triggerPageThreshold: jsui.ajaxpager ? Number(jsui.ajaxpager) + 1 : 5,
                history: false,
                container: '.content',
                item: '.excerpt-minic',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="' + jsui.uri + '/style/img/loading.gif"></div>',
                trigger: 'More',
                onRenderComplete: function () {
                    require(['lazyload'], function () {
                        $('.thumb').lazyload({
                            data_attribute: 'src',
                            placeholder: jsui.uri + '/style/img/thumbnail.png',
                            threshold: 400
                        });
                    });
                    if (jsui.bd.hasClass('search-results')) {
                        var val = $('.site-search-form .search-input').val()
                        var reg = eval('/' + val + '/i')
                        $('.excerpt h2 a, .excerpt .note').each(function () {
                            $(this).html($(this).text().replace(reg, function (w) {
                                return '<b>' + w + '</b>'
                            }))
                        })
                    }
                }
            });
        }
    });
}

// 链接复制
function copy_code(text) {
    if (window.clipboardData) {
        window.clipboardData.setData("Text", text)
        alert("已经成功将原文链接复制到剪贴板！");
    } else {
        var x = prompt('你的浏览器可能不能正常复制\n请您手动进行：', text);
    }
};

//产品页面右下角增加打印输出
jsui.rb_print = ''
if (jsui.bd.hasClass('productshow')) {
    require(['print']), function print() {
        $(".my_show").jqprint();
    }
    jsui.rb_print = "<li><a href=\"javascript:print();\"><i class=\"fa fa-print\"></i></a><h6>去打印<i></i></h6></li>"
}


/*
 * rollbar
 * ====================================================
 */
jsui.rb_comment = ''
if (jsui.bd.hasClass('comment-open')) {
    jsui.rb_comment = "<li><a href=\"javascript:(scrollTo('#comments',-15));\"><i class=\"fa fa-comments\"></i></a><h6>去评论<i></i></h6></li>"
}

jsui.bd.append('\
    <div class="m-mask"></div>\
    <div class="rollbar"><ul>'
    + jsui.rb_comment + jsui.rb_print +
    '<li><a href="javascript:(scrollTo());"><i class="fa fa-angle-up"></i></a><h6>去顶部<i></i></h6></li>\
    </ul></div>\
')

var _wid = $(window).width();

video_ok();
setadcookies();
$(window).resize(function (event) {
    _wid = $(window).width();
    video_ok();
    setadcookies();
});
//cookies
function setadcookies() {
    if (_wid < 640) {
        $.cookie("view_m", "1");
    } else {
        $.cookie("view_m", null);
    }
    if ($.cookie("myad_onece") == null) {
        $('.wintips').fadeIn();
        $.cookie("myad_onece", "1", {expires: 1});

    }
}
$('.wintips-close').on('click', function () {
    $('.wintips').fadeOut();
    $.cookie("myad_onece", "1", {expires: 1});
})
function video_ok() {
    $('.article-content embed, .article-content video, .article-content iframe').each(function () {
        var w = $(this).attr('width'),
            h = $(this).attr('height')
        if (h) {
            $(this).css('height', $(this).width() / (w / h))
        }
    })
}
//bootstrap
/* $('.user-welcome').tooltip({
 container: 'body',
 placement: 'bottom'
 })
 */

//body 没有logged-in的时候调用signpop.js

if (_wid > 720 && !jsui.bd.hasClass('logged-in')) {
    // require(['signpop'], function(signpop) {
    //     signpop.init()
    // })
}

var scroller = $('.rollbar')
var _fix = (jsui.bd.hasClass('nav_fixed') && !jsui.bd.hasClass('pagesnav')) ? true : false
jsui.rb_top = ''
$(window).scroll(function () {
    var h = document.documentElement.scrollTop + document.body.scrollTop

    if (_fix && h > 0 && _wid > 720) {
        jsui.bd.addClass('nav-fixed')
    } else {
        jsui.bd.removeClass('nav-fixed')
    }
    if (h > 200) {
        scroller.fadeIn();
        $('.wintips').fadeOut();
    } else {
        scroller.fadeOut();
    }
})

var _sidebar = $('.sidebar')
if (_wid > 1024 && _sidebar.length) {
    if (jsui.bd.hasClass('nav_fixed')) {
        var h1 = 75,
            h2 = 85
    } else {
        var h1 = 15,
            h2 = 30
    }

    var rollFirst = _sidebar.find('.widget:eq(' + (jsui.roll[0] - 1) + ')')
    var sheight = rollFirst.height()

    rollFirst.on('affix-top.bs.affix', function () {
        rollFirst.css({
            top: 0
        })
        sheight = rollFirst.height()

        for (var i = 1; i < jsui.roll.length; i++) {
            var item = jsui.roll[i] - 1
            var current = _sidebar.find('.widget:eq(' + item + ')')
            current.removeClass('affix').css({
                top: 0
            })
        }
        ;
    })

    rollFirst.on('affix.bs.affix', function () {
        rollFirst.css({
            top: h1
        })

        for (var i = 1; i < jsui.roll.length; i++) {
            var item = jsui.roll[i] - 1
            var current = _sidebar.find('.widget:eq(' + item + ')')
            current.addClass('affix').css({
                top: sheight + h2
            })
            sheight += current.height() + 15
        }
        ;
    })

    rollFirst.affix({
        offset: {
            top: _sidebar.height(),
            bottom: $('.footer').outerHeight()
        }
    })


}

$('.plinks a').each(function () {
    var imgSrc = $(this).attr('href') + 'favicon.ico'
    $(this).prepend('<img src="' + imgSrc + '">')
})


/*
 * comment
 * ========当body中有comment-open的时候加载comment.js===================
 */
if (jsui.bd.hasClass('comment-open')) {
    // require(['comment'] /* , function(comment) {
    //     comment.init()
    // } */ )
}


/*
 * page theme
 * ====================================================
 */
if (jsui.bd.hasClass('pagestheme')) {
    require(['theme']/* , function(theme) {
     theme.init()
     } */)
}
if (jsui.bd.hasClass('pagestheme')) {
    var nav = $('.theme-nav')
    nav.affix({
        offset: {
            top: nav.offset().top,
            bottom: 0
        }
    })

    jsui.bd.scrollspy({
        target: '.theme-nav',
        offset: nav.height() + 20
    })
}

/*
 * page nav
 * ====================================================
 */

if (jsui.bd.hasClass('pagesnav')) {

    var titles = ''
    var i = 0
    $('#navs .items h2').each(function () {
        titles += '<li><a href="#' + i + '">' + $(this).text() + '</a></li>'
        i++
    })
    $('#navs nav ul').html(titles)

    $('#navs .items a').attr('target', '_blank')

    $('#navs nav ul').affix({
        offset: {
            top: $('#navs nav ul').offset().top,
            bottom: $('.footer').height() + $('.footer').css('padding-top').split('px')[0] * 2
        }
    })


    if (location.hash) {
        var index = location.hash.split('#')[1]
        $('#navs nav li:eq(' + index + ')').addClass('active')
        $('#navs nav .item:eq(' + index + ')').addClass('active')
        scrollTo('#navs .items .item:eq(' + index + ')')
    }
    $('#navs nav a').each(function (e) {
        $(this).click(function () {
            scrollTo('#navs .items .item:eq(' + $(this).parent().index() + ')')
            $(this).parent().addClass('active').siblings().removeClass('active')
        })
    })
}


/*
 * page search
 * ====================================================
 */
if (jsui.bd.hasClass('search-results')) {
    var val = $('.site-search-form .search-input').val()
    var reg = eval('/' + val + '/i')
    $('.excerpt h2 a, .excerpt .note').each(function () {
        $(this).html($(this).text().replace(reg, function (w) {
            return '<b>' + w + '</b>'
        }))
    })
}

/*
 * search
 * ====================================================
 */
$('.search-show').bind('click', function () {
    $(this).find('.fa').toggleClass('fa-remove')
    jsui.bd.toggleClass('search-on')

    if (jsui.bd.hasClass('search-on')) {
        $('.site-search').find('input').focus()
        jsui.bd.removeClass('m-nav-show')
    }
})

if ($('.face-show').length) {
    $("a.face-show").click(function () {
        $(".ComtoolsFrame").slideToggle()
    });
}
/*
 * phone
 * ====================================================
 */

jsui.bd.append($('.site-navbar').clone().attr('class', 'm-navbar'))

$('.m-icon-nav').on('click', function () {
    jsui.bd.addClass('m-nav-show')

    $('.m-mask').show()

    jsui.bd.removeClass('search-on')
    $('.search-show .fa').removeClass('fa-remove')
})

$('.m-mask').on('click', function () {
    $(this).hide()
    jsui.bd.removeClass('m-nav-show')
})


if ($('.comlist_pagebar').length) {
    $(this).click(function () {
        scrollTo('#comments', -15)
    })
}
/*
 * baidushare
 * ====================================================
 */
if ($('.bdsharebuttonbox').length) {

    //if ($('.article-content').length) $('.article-content img').data('tag', 'bdshare');

    window._bd_share_config = {
        common: {
            "bdText": '',
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": '',
            "bdStyle": "0",
            "bdSize": "24"
        },
        share: [{
            bdCustomStyle: jsui.uri + '/style/css/share.css'
        }]
    }

    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
}


/* click event
 * ====================================================
 */
/*$(document).on('click', function(e){
 e = e || window.event;
 var target = e.target || e.srcElement
 var etag = $(target)

 if( etag.parent().attr('evt') ){
 etag = $(etag.parent()[0])
 }else if( etag.parent().parent().attr('evt') ){
 etag = $(etag.parent().parent()[0])
 }

 var type = etag.attr('evt')

 if( !type || etag.hasClass('disabled') ) return

 switch( type ){
 case 'nav.slide.hide':
 jsui.bd.removeClass('nav-slide-show').removeAttr('evt')
 break;
 }
 })*/


//滚动
function scrollTo(name, add, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top + (add || 0)
            }, speed)
        }
    }
}

//检查字符
/* function is_name(str) {
 return /.{2,12}$/.test(str)
 }
 function is_url(str) {
 return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
 }
 function is_qq(str) {
 return /^[1-9]\d{4,13}$/.test(str)
 }
 function is_mail(str) {
 return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
 } */


/* $.fn.serializeObject = function(){
 var o = {};
 var a = this.serializeArray();
 $.each(a, function() {
 if (o[this.name] !== undefined) {
 if (!o[this.name].push) {
 o[this.name] = [o[this.name]];
 }
 o[this.name].push(this.value || '');
 } else {
 o[this.name] = this.value || '';
 }
 });
 return o;
 }; */


/* function strToDate(str, fmt) {
 if( !fmt ) fmt = 'yyyy-MM-dd hh:mm:ss'
 str = new Date(str*1000)
 var o = {
 "M+": str.getMonth() + 1, //月份
 "d+": str.getDate(), //日
 "h+": str.getHours(), //小时
 "m+": str.getMinutes(), //分
 "s+": str.getSeconds(), //秒
 "q+": Math.floor((str.getMonth() + 3) / 3), //季度
 "S": str.getMilliseconds() //毫秒
 };
 if (/(y+)/.test(fmt))
 fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt))
 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
 }  */


//***********COMMENT**********************

//表情及辅助标签替换
if ($('.commentlist,.widget_divComments').length) {
    $('.commentlist, .widget_divComments').each(function comreplace() {
        var tx = $(this).html();
        //tx=tx.replace(/\[R\](.*)\[\/R\]/g,'<textarea disabled="disabled">$1</textarea>');
        tx = tx.replace(/\[B\](.*)\[\/B\]/g, '<strong>$1</strong>');
        tx = tx.replace(/\[U\](.*)\[\/U\]/g, '<u>$1</u>');
        tx = tx.replace(/\[S\](.*)\[\/S\]/g, '<del>$1</del>');
        tx = tx.replace(/\[I\](.*)\[\/I\]/g, '<em>$1</em>');
        tx = tx.replace(/\[Q\](.*)\[\/Q\]/g, '<blockquote>$1</blockquote>');
        tx = tx.replace(/\[em_([A-Za-z0-9]*)\]/g, '<img src="' + jsui.face + '/$1.gif" border="0" />');
        $(this).html(tx);

    })
}

if ($('.comt-box').length) {
    objActive = "txaArticle";
    function InsertText(objHTML, strText, bolReplace) {
        if (strText == "") {
            return ("")
        }
        var obj = document.getElementById(objHTML);
        if (document.selection) {
            if (obj.currPos) {
                if (bolReplace && (obj.value == "")) {
                    obj.currPos.text = strText;
                }
                else {
                    obj.currPos.text += strText;
                }
            }
            else {
                obj.value += strText;
            }
        }
        else {
            if (bolReplace) {
                obj.value = obj.value.slice(0, obj.selectionStart) + strText + obj.value.slice(obj.selectionEnd, obj.value.length);
            }
            else {
                obj.value = obj.value.slice(0, obj.selectionStart) + strText + obj.value.slice(obj.selectionStart, obj.value.length);
            }
        }
    }

    function ReplaceText(objHTML, strPrevious, strNext) {
        var obj = document.getElementById(objHTML);
        var strText;
        if (document.selection && document.selection.type == "Text") {
            if (obj.currPos) {
                var range = document.selection.createRange();
                range.text = strPrevious + range.text + strNext;
                return ("");
            }
            else {
                strText = strPrevious + strNext;
                return (strText);
            }
        }
        else {
            if (obj.selectionStart || obj.selectionEnd) {
                strText = strPrevious + obj.value.slice(obj.selectionStart, obj.selectionEnd) + strNext;
                return (strText);
            }
            else {
                strText = strPrevious + strNext;
                return (strText);
            }
        }
    }

    if ($('#ComtoolsFrame').length) {
        $(this).bind("click", function (event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        });
    }
}


if ($('.site-navbar').length) {
    //导航高亮
    var datatype = $(".header-nav").attr("data-type");
    $(".site-navbar li").each(function () {
        try {
            var myid = $(this).attr("id");
            if ("index" == datatype) {
                if (myid == "navbar-item-index" || myid == "nvabar-item-index") {
                    $(this).addClass("active");
                }
            } else if ("category" == datatype || "article" == datatype) {
                var infoid = $(".header-nav").attr("data-infoid");
                if (infoid != null) {
                    var b = infoid.split(' ');
                    for (var i = 0; i < b.length; i++) {
                        if (myid == "navbar-category-" + b[i]) {
                            $("#navbar-category-" + b[i]).addClass("active");
                        }
                    }
                }
            } else if ("page" == datatype) {
                var infoid = $(".header-nav").attr("data-infoid");
                if (infoid != null) {
                    if (myid == "navbar-page-" + infoid) {
                        $("#navbar-page-" + infoid).addClass("active");
                    }
                }
            } else if ("tag" == datatype) {
                var infoid = $(".header-nav").attr("data-infoid");
                if (infoid != null) {
                    if (myid == "navbar-tag-" + infoid) {
                        $("#navbar-tag-" + infoid).addClass("active");
                    }
                }
            }
        } catch (E) {
        }
    });
}

if (_wid < 640 && $('#producttable').length) {
    $('td.getcpt').append($('td.cpt'))
}

if (_wid < 640 && $('.article-content').length) {
    //这个东西没什么卵用啊，你们干嘛要我加啊
//内页文章图片加自适应
    $(function () {
        $('.article-content img').addClass("img-responsive")
    });
//内页table加自适应
    $(function () {
        $(".article-content table").addClass("table table-bordered table-hover")
    });
    $(function () {
        $("table").wrap("<div class='table-responsive'></div>")
    });
//内页视频加自适应
    $(function () {
        $(".article-content embed,.article-content object").parent().addClass("embed-responsive embed-responsive-4by3")
    });
}

// 收藏本站
function addFavorite() {
    $('body').append('\
        <div class="modal fade" id="modal-fav" tabindex="-1" role="dialog" aria-hidden="true">\
            <div class="modal-dialog" style="margin-top:200px;width:340px;">\
                <div class="modal-content">\
                    <div class="modal-body" style="text-align:center">\
                        <i class="fa fa-heart" aria-hidden="true" style="color:rgba(255, 0, 0, 0.65)"></i> 请使用快捷键 <strong style="color:rgb(255, 94, 82);">Ctrl+D</strong> 将本站加入收藏夹！\
                    </div>\
                </div>\
            </div>\
        </div>\
    ')
    $('#modal-fav').modal();
}

//点击回复，回复框移动到目标事件
function moveForm(targetid, name, level) {
    // console.log(level);
    $('#' + targetid).parent().parent().after($('#respond'));
    $("input[name='parent']").val(targetid)
    $("input[name='previous']").val(name)
    $('#cancel-reply').css('display', 'inherit');
}

//取消评论，重置回复框位置
$('#cancel-reply').on('click', function () {
    $('#postcomments').prepend($('#respond'));
    $("input[name='parent']").removeAttr('value')
    $("input[name='previous']").removeAttr('value')
    $('#cancel-reply').css('display', 'none');
});



