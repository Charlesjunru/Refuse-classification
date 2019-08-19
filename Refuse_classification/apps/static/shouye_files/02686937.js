$(function () {
    imgLazyloadLib();
    //代码创建一个遮罩层，用于做加载动画
    //setScroll();
    setEventListen();
})
$(window).load(function () {
    diyAutoHeight();
    imgLazyloadLib();
});
$(window).resize(function () {
    if (window.resizeTimeout) window.clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function () {
        diyAutoHeight();
    }, 350);
});

function imgLazyloadLib(obj) {
    if (obj) {
        obj.lazyload({
            event: 'scroll mouseover',
            effect: "fadeIn",
            threshold: 0,
            failure_limit: 80,
            skip_invisible: false,
            load: function () {
                var father = $(this).parents('.view').first();
                if (father.length > 0) {
                    setTimeout(function () {
                        diyAutoHeight(father);
                    }, 500);
                } else {
                    father = $(this).parents('.layout').first();
                    if (father.length > 0) {
                        setTimeout(function () {
                            diyAutoHeight(father);
                        }, 500);
                    }
                }
            }
        });
    } else {
        $("img").lazyload({
            event: 'scroll mouseover',
            effect: "fadeIn",
            threshold: 0,
            failure_limit: 80,
            skip_invisible: false,
            load: function () {
                var father = $(this).parents('.view').first();
                if (father.length > 0) {
                    setTimeout(function () {
                        diyAutoHeight(father);
                    }, 500);
                } else {
                    father = $(this).parents('.layout').first();
                    if (father.length > 0) {
                        setTimeout(function () {
                            diyAutoHeight(father);
                        }, 500);
                    }
                }
            }
        });
    }
}

var scrollTime = 300;

function setEventListen() {
    $(".ev_c_scrollTop").click(function () {
        //滚动到顶部
        //$("html").getNiceScroll().resize();
        //$("html").getNiceScroll(0).doScrollTop(0);
        $("html,body").stop().animate({scrollTop: "0px"}, window.scrollTime);
    });
    $(".ev_c_scrollView").click(function () {
        //鼠标点击：滚动到模块位置
        var settings = settingsLib($(this));
        var viewid = settings.getSetting('eventSet.scrollView');
        if ($("#" + viewid).length > 0) {
            //$("html").getNiceScroll().resize();
            //$("html").getNiceScroll(0).doScrollTop($("#"+viewid).offset().top);
            $("html,body").stop().animate({scrollTop: $("#" + viewid).offset().top + "px"}, window.scrollTime);
        }
    });
    $(".ev_c_showView").click(function () {
        //鼠标点击：显示模块
        showEventView($(this));
    });
    $(".ev_c_hidView").click(function () {
        //鼠标点击：隐藏模块
        hidEventView($(this));
    });
    $(".ev_c_tabView").click(function () {
        //鼠标点击：显示与隐藏模块
        showHidEventView($(this));
    });
    $(".ev_m_tabView").hover(function () {
        //鼠标点击：显示与隐藏模块
        showHidEventView($(this));
    });
    $(".view").click(function () {
        $(this).children(".view_contents").addClass("diyCurTab");
        var settings = settingsLib($(this));
        var unitViewSet = settings.getSetting('unitViewSet');
        if (unitViewSet && unitViewSet.length > 0) {
            for (key in unitViewSet) {
                $("#" + unitViewSet[key]).children(".view_contents").removeClass("diyCurTab");
            }
        }
    });
}

function showHidEventView(obj) {
    var settings = settingsLib(obj);
    var showViews = settings.getSetting('eventSet.showViews');
    var hidViews = settings.getSetting('eventSet.hidViews');
    if (!showViews) showViews = new Array();
    if (!hidViews) hidViews = new Array();
    var doubleKey = new Array();
    //获取重复值
    if (showViews.length > 0) {
        for (s_key in showViews) {
            if (hidViews.length > 0) {
                for (h_key in hidViews) {
                    if (showViews[s_key] == hidViews[h_key]) {
                        doubleKey.push(showViews[s_key]);
                    }
                }
            }
        }
    }
    //隐藏
    if (hidViews.length > 0) {
        for (key in hidViews) {
            if ($.inArray(hidViews[key], doubleKey) < 0) {
                $("#" + hidViews[key]).css({"display": "none"});
                diyAutoHeight($("#" + hidViews[key]));
            }
        }
    }
    //显示
    if (showViews.length > 0) {
        for (key in showViews) {
            if ($.inArray(showViews[key], doubleKey) < 0) {
                $("#" + showViews[key]).css({"display": "block"});
                diyAutoHeight($("#" + showViews[key]));
            }
        }
    }
    //双向显示
    if (doubleKey.length > 0) {
        for (key in doubleKey) {
            if ($("#" + doubleKey[key]).length > 0) {
                if ($("#" + doubleKey[key]).is(":hidden")) {
                    $("#" + doubleKey[key]).css({"display": "block"});
                    diyAutoHeight($("#" + doubleKey[key]));
                } else {
                    $("#" + doubleKey[key]).css({"display": "none"});
                    diyAutoHeight($("#" + doubleKey[key]));
                }
            }
        }
    }
}

function showEventView(obj) {
    var settings = settingsLib(obj);
    var showViews = settings.getSetting('eventSet.showViews');
    if (!showViews) showViews = new Array();
    if (showViews.length > 0) {
        for (key in showViews) {
            $("#" + showViews[key]).css({"display": "block"});
            diyAutoHeight($("#" + showViews[key]));
        }
    }
}

function hidEventView(obj) {
    var settings = settingsLib(obj);
    var hidViews = settings.getSetting('eventSet.hidViews');
    if (!hidViews) hidViews = new Array();
    if (hidViews.length > 0) {
        for (key in hidViews) {
            $("#" + hidViews[key]).css({"display": "none"});
            diyAutoHeight($("#" + hidViews[key]));
        }
    }
}

function getPageScrollTop() {
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    return scrollTop;
}

function getNowPage() {
    var width = $(window).width();
    var max_width = window.DIY_PAGE_SIZE;
    max_width = parseFloat(max_width);
    if (isNaN(max_width)) max_width = 1200;
    if (width >= max_width) {
        return 'pc';
    } else if (width >= 640) {
        return 'pad';
    } else {
        return 'mobile';
    }
}

$(window).scroll(function () {
    var scrollTop = getPageScrollTop();
    var nowPage = getNowPage();
    if ($(".scrollToTop_" + nowPage).length > 0) {
        $(".scrollToTop_" + nowPage).each(function () {
            var old_top = $(this).attr("old_top_" + nowPage);
            var old_left = $(this).attr("old_left_" + nowPage);
            var old_width = $(this).attr("old_width_" + nowPage);
            if (!old_top || old_top == "") {
                old_top = $(this).offset().top;
                $(this).attr("old_top_" + nowPage, old_top);
            }
            if (!old_left || old_left == "") {
                old_left = $(this).offset().left;
                $(this).attr("old_left_" + nowPage, old_left);
            }
            if (!old_width || old_width == "") {
                old_width = $(this).width();
                $(this).attr("old_width_" + nowPage, old_width);
            }
            old_top = parseFloat(old_top);
            old_left = parseFloat(old_left);
            old_width = parseFloat(old_width);
            if (scrollTop >= old_top) {
                $(this).css({
                    "position": "fixed",
                    "z-index": 9999999,
                    "top": "0px",
                    "width": old_width + "px",
                    "left": old_left + "px"
                });
                $(this).parents(".view").css({"z-index": 9999999});
                //$(this).parents(".view").children(".view_contents").css({"overflow":"visible"});
                $(this).parents(".layout").css({"z-index": 9999999});
                //$(this).parents(".layout").children(".view_contents").css({"overflow":"visible"});
                // 通过设置边距，清除悬浮对下一个元素的影响
                if ($(this).hasClass('layout')) {
                    $(this).next().css('margin-top', (Number($(this).css('margin-top').replace('px', '')) + $(this).height()) + 'px');
                }
            } else {
                $(this).css({"position": "", "z-index": "", "top": "", "width": "", "left": ""});
                $(this).parents(".view").css({"z-index": ""});
                //$(this).parents(".view").children(".view_contents").css({"overflow":""});
                $(this).parents(".layout").css({"z-index": ""});
                //$(this).parents(".layout").children(".view_contents").css({"overflow":""});
                $(this).attr("old_top_" + nowPage, null);
                $(this).attr("old_left_" + nowPage, null);
                $(this).attr("old_width_" + nowPage, null);
                // 通过设置边距，清除悬浮对下一个元素的影响
                if ($(this).hasClass('layout')) {
                    $(this).next().css('margin-top', '');
                }
            }
        });
    }
});

function diyAutoHeight(obj) {
    if (obj && obj.length > 0) {
        //针对选项卡做特殊处理
        if (obj.children(".view_contents").children("form").length > 0) {
            if (obj.children(".view_contents").children("form").children(".view").length > 0) {
                obj.children(".view_contents").children("form").children(".view").each(function () {
                    if ($(this).is(":visible")) {
                        diyAutoHeightDo($(this));
                        return false;
                    }
                });
            } else {
                diyAutoHeightDo(obj);
            }
        } else if (obj.children(".view_contents").children(".niceTab").find(".niceTabShow").length > 0) {
            if (obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").length > 0) {
                obj.children(".view_contents").children(".niceTab").find(".niceTabShow").children(".view").each(function () {
                    if ($(this).is(":visible")) {
                        diyAutoHeightDo($(this));
                        return false;
                    }
                });
            } else {
                diyAutoHeightDo(obj);
            }
        } else {
            diyAutoHeightDo(obj);
        }
    } else {
        setTimeout(function () {
            $(".view").each(function () {
                if (!$(this).hasClass("includeBlock")) {
                    diyAutoHeightDo($(this));
                }
            });
        }, 500);
    }
}

function diyAutoHeightFatherDo(father, obj) {
    var settings = settingsLib(father);
    var autoHeight = settings.getSetting('autoHeight');
    if (autoHeight && autoHeight == "true") {
        //开启了允许自动高度
        var minHeight = obj.offset().top + obj.height() - father.offset().top;
        if (obj.siblings(".view").length > 0) {
            obj.siblings(".view").each(function () {
                if ($(this).is(":visible")) {
                    var tempHeight = $(this).offset().top + $(this).height() - father.offset().top;
                    if (tempHeight > minHeight) {
                        minHeight = tempHeight;
                    }
                }
            });
        }
        //2019-5-20  选项卡添加选项高度计算
        var kind = settings.getSetting('kind');
        var name = settings.getSetting('name');
        var data = settings.getSetting('data');
        if (kind == "选项卡" && name == "tab") {
            var tab_nav_obj = father.children().children().children().eq(0);
            var tab_nav_height = tab_nav_obj.css('height');
            if (tab_nav_height != undefined && tab_nav_height != undefined && data.showtype == "bottom") {
                minHeight = parseFloat(tab_nav_height) + Number(minHeight);
            }
        }
        father.css({"height": minHeight + "px"});
        diyAutoHeightDo(father);
    }
}

function diyAutoHeightDo(obj) {
    if (obj.is(":visible")) {
        var father = obj.parents(".view").first();
        if (father.length <= 0) father = obj.parents(".layout").first();
        if (father.length > 0) {
            var settings = settingsLib(father);
            var autoHeight = settings.getSetting('autoHeight');
            if (autoHeight && autoHeight == "true") {
                if (father.offset().top + father.height() < obj.offset().top + obj.height()) {
                    father.css({"height": (obj.offset().top + obj.height() - father.offset().top) + "px"});
                    diyAutoHeightDo(father);
                } else {
                    diyAutoHeightFatherDo(father, obj);
                }
            }
        }
    }
}

function setScroll() {
    if (typeof ($("html").niceScroll) == "function") {
        $("html").niceScroll({
            zindex: 99999,
            cursoropacitymax: 0.8,
            cursoropacitymin: 0.3,
            horizrailenabled: false,
            mousescrollstep: 60,
            smoothscroll: true
        });
    } else {
        setTimeout(setScroll, 500);
    }
}

var settingsLib = function (view) {
    var main = {
        view: null,
        setup: function (obj) {
            if (window.viewsSettings && window.viewsSettings[obj.attr("id")]) {
                this.init(window.viewsSettings[obj.attr("id")]);
                this.view = obj;
            } else {
                this.init({});
            }
        },
        init: function (obj) {
            if (typeof (obj) == 'object') {
                this.settings = obj;
            } else if (obj != "" && typeof obj == 'string') {
                eval('if(typeof(' + obj + ')=="object"){this.settings=' + obj + ';}else{this.settings={};}');
            } else {
                this.settings = {};
            }
        },
        setSetting: function (k, v) {
            if (!this.settings) {
                this.settings = {};
            }
            var keyArray = k.split(".");
            var val = 'this.settings';
            for (key in keyArray) {
                if (keyArray[key] && keyArray[key] != '') {
                    if (eval(val + '["' + keyArray[key] + '"]')) {
                        val = val + '["' + keyArray[key] + '"]';
                    } else {
                        eval(val + '["' + keyArray[key] + '"]={}');
                        val = val + '["' + keyArray[key] + '"]';
                    }
                }
            }
            if (v == null) {
                eval("delete " + val);
            } else {
                eval(val + "=v");
            }
        },
        getSetting: function (key) {
            if (!this.settings) {
                this.settings = {};
            }
            if (key) {
                var keyArray = key.split(".");
                var val = 'this.settings';
                for (key in keyArray) {
                    if (keyArray[key] && keyArray[key] != '') {
                        if (eval(val + '["' + keyArray[key] + '"]')) {
                            val = val + '["' + keyArray[key] + '"]';
                            continue;
                        } else {
                            val = null;
                            break;
                        }
                    }
                }
                return eval(val);
            } else {
                return this.settings;
            }
        },
        saveSettings: function (obj) {
            if (typeof (obj) == "object" && this.settings && obj.hasClass("view")) {
                window.viewsSettings[obj.attr("id")] = this.settings;
            } else if (this.view && typeof (this.view) == "object" && this.settings && this.view.hasClass("view")) {
                window.viewsSettings[this.view.attr("id")] = this.settings;
            }
        }
    };
    if (view) {
        main.view = view;
        main.setup(view);
    }
    return main;
}

function GetUrlPara() {
    var url = document.location.toString();
    var arrUrl = url.split("?");
    var paras = '';
    if (arrUrl.length > 1) {
        var para = arrUrl[1];
        var arrUrl2 = para.split("&");
        arrUrl2.forEach(function (e) {
            if (e.indexOf("mod=") >= 0 || e.indexOf("act=") >= 0 || e.indexOf("#") >= 0) {
                return;
            } else {
                paras += e + "&";
            }
        })
    }
    return paras;
}

//RequestURL for signle
function RequestURL_old(viewid, sys_url, moreParams) {
    var serverUrl = '//' + DIY_JS_SERVER + '/sysTools.php?mod=viewsConn&rtype=json&idweb=' + DIY_WEBSITE_ID + '&' + sys_url;
    var settings = settingsLib($("#" + viewid));
    var params = "";
    if (settings && settings.getSetting("data")) {
        $.each(settings.getSetting("data"), function (key, val) {
            if ($.isArray(val)) {
                $.each(val, function (key2, val2) {
                    params += "&" + key + "[]=" + val2;
                });
            } else {
                params += "&" + key + "=" + val;
            }
        });
        if (params) serverUrl += params;
    }
    var params2 = GetUrlPara();
    if (params2) serverUrl += "&" + params2;
    if (moreParams) serverUrl += "&" + moreParams;
    var scriptString = "<scr" + "ipt type='text/javascript' src=" + serverUrl + "></scr" + "ipt>";
    //$.ajaxSettings.async = false;
    $.ajax({
        dataType: 'jsonp',
        crossDomain: true,
        url: serverUrl,
        xhrFields: {withCredentials: true},
        success: function (result) {
            if (result.error) alert(result.error);
            else {
                if (typeof (history.replaceState) != 'undefined') {
                    var obj = {};
                    var hstate = JSON.stringify(history.state);
                    if (hstate != 'null' && hstate != null) {
                        eval('var hjson = ' + hstate);
                        obj = hjson;
                    }
                    var key = "moreParams" + viewid;
                    obj[key] = moreParams;
                    //var strparam=viewid+":"+moreParams;
                    //history.replaceState({("moreParams"+viewid):moreParams},"","");
                    history.replaceState(obj, "", "");
                }
                $("#" + viewid).children(".view_contents").html(result.html);
                $("#" + viewid).children(".view_contents").show();
                setTimeout(function () {
                    diyAutoHeight($("#" + viewid));
                }, 500);
            }
        }
    });
    setTimeout(function () {
        commDefault_isFT();
    }, 500);

    function commDefault_isFT() {
        var based_Obj = document.getElementById("based");
        var currentlang_Obj = document.getElementById("currentlang");//当前语言
        $(function () {
            if (based_Obj) {
                var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
                switch (Request('chlang')) {
                    case "cn-tw":
                        BodyIsFt = getCookie(JF_cn) == "1" ? 0 : 1;
                        delCookie(JF_cn);
                        SetCookie(JF_cn, BodyIsFt, 7);
                        break;
                    case "cn":
                    case "en":
                        BodyIsFt = 0;
                        delCookie(JF_cn);
                        SetCookie(JF_cn, 0, 7);
                        currentlang_Obj.innerHTML = "简体中文";
                        break;
                    case "tw":
                        BodyIsFt = 1;
                        delCookie(JF_cn);
                        SetCookie(JF_cn, 1, 7);
                        currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
                        break;
                    default:
                        if (typeof Default_isFT != 'undefined' && Default_isFT) { //如果默认繁体
                            if (getCookie(JF_cn) == null) {
                                BodyIsFt = 1;
                                SetCookie(JF_cn, 1, 7);
                                break;
                            }
                        }
                        BodyIsFt = parseInt(getCookie(JF_cn));
                }
                if (BodyIsFt === 1) {
                    StranBody();
                    document.title = StranText(document.title);
                } else {
                    StranBodyce();
                    document.title = StranTextce(document.title);
                }
            } else {
                var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
                if (Default_isFT) {
                    BodyIsFt = 1;
                    delCookie(JF_cn);
                    SetCookie(JF_cn, 1, 7);
                    StranBody();
                    document.title = StranText(document.title);
                } else {
                    BodyIsFt = 0;
                    delCookie(JF_cn);
                    SetCookie(JF_cn, 0, 7);
                    /*StranBodyce();
					document.title = StranTextce(document.title);*/
                }
            }

        });
    }

    /*
	$.getJSON(serverUrl, function(result){
		if(result.error) alert(result.error);
		else{
			$("#"+viewid).children(".view_contents").html(result.html);
			$("#"+viewid).show();
			setTimeout(function(){
				diyAutoHeight($("#"+viewid));
			},500);
		}
	});*/
    //$("#"+viewid).append(scriptString);
}

function RequestURL(viewid, sys_url, moreParams) {
    if (checkLoad == 1) {
        RequestURL_old(viewid, sys_url, moreParams);
        return;
    }
    //这是原本的URL
    var serverUrl = '/sysTools.php?&mod=viewsConn&rtype=json&idweb=' + DIY_WEBSITE_ID + '&' + sys_url;
    var settings = settingsLib($("#" + viewid));
    var params = "";
    if (settings && settings.getSetting("data")) {
        $.each(settings.getSetting("data"), function (key, val) {
            if ($.isArray(val)) {
                $.each(val, function (key2, val2) {
                    params += "&" + key + "[]=" + val2;
                });
            } else {
                params += "&" + key + "=" + val;
            }
        });
        if (params) serverUrl += params;
    }
    var params2 = GetUrlPara();
    if (params2) serverUrl += "&" + params2;
    if (moreParams) serverUrl += "&" + moreParams;
    batchArr.push(serverUrl);

}

function sendBatch(sendurl) {
    if (!sendurl) return;
    //10次分割
    var newArr = [];
    newArr = sliceArray(sendurl, 10);
    //对url进行组装
    var serverUrl = '//' + DIY_JS_SERVER + '/sysTools.php?mod=viewsConn&act=batch&idweb=' + DIY_WEBSITE_ID + '&';
    for (var i in newArr) {
        var data = {};
        data.postUrl = newArr[i];
        //获取数据 xhrFields解决传输cookie问题
        $.ajax({
            type: "post",
            cache: false,
            dataType: "json",
            async: true,
            data: data,
            url: serverUrl,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (result) {
                //var result = eval("("+result+")");
                if (result.error) alert(result.error);
                else {
                    for (var i in result) {//i就是viewid
                        $("#" + i).children(".view_contents").html(result[i]['html']);
                        $("#" + i).children(".view_contents").show();
                        setTimeout(function () {
                            diyAutoHeight($("#" + i));
                        }, 500);
                    }
                }
            }
        });
    }
    setTimeout(function () {
        commDefault_isFT();
    }, 500);
    checkLoad = 1;
}

/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
function sliceArray(array, size) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

//导航公共监听函数
function setDhListen(style, obj, params) {
    var father = $(obj).parents(".dh").first();
    if (father.length > 0) {
        switch (style) {
            case 'style_01':
                father.find(".miniMenu").toggleClass("Mslide");
                if ($("body").css("position") == "relative") {
                    $("body").css({"position": "fixed", "width": "100%"});
                } else {
                    $("body").css({"position": "relative", "width": "100%"});
                }
                break;
            case 'style_02':
                if (params == "open") {
                    father.find(".Style_02_miniMenu .menuMain").css("display", "block");
                } else {
                    father.find(".Style_02_miniMenu .menuMain").css("display", "none");
                }
                break;
            case 'style_03':
                if (params == "mobi_more") {
                    $(obj).parent().siblings(".mobi_menuUl02").toggle();
                } else if (params == "m_icoFont") {
                    $(obj).parents(".mobi_main").hide();
                } else if (params == "mobi_top") {
                    $(obj).siblings(".mobi_main").show();
                }
                break;
            case 'style_04':
                var width = $(window).width();
                var newW = width + 18;
                father.find(".newWidth").css("width", newW);
                father.find(".miniMenu").toggleClass("Mslide");
                if ($("body").css("position") == "relative") {
                    $("body").css({"position": "fixed", "width": "100%"});
                } else {
                    $("body").css({"position": "relative", "width": "100%"});
                }
                break;
        }
    }
}

//-------------选项卡-----------------------------------------------
//鼠标左右拖拽事件
function setScroll_Choice(tabId) {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) return;
    if (typeof ($(".tab_nav .tab_scroll", $("#" + tabId)).niceScroll) == "function") {
        $(".tab_nav .tab_scroll", $("#" + tabId)).niceScroll({
            zIndex: 99999,
            cursoropacitymax: 0,
            cursoropacitymin: 0,
            horizrailenabled: true,
            autohidemode: true,
            touchbehavior: true
        });
    } else {
        setTimeout(setScroll_Choice, 500);
    }
}

/*鼠标悬浮效果*/
function setHover_Choice(tabId) {
    $(".tab_nav .tab_li", $("#" + tabId)).unbind('hover');
    $(".tab_nav .tab_li", $("#" + tabId)).hover(function () {
        var index = $(this).index();
        $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
        $(".tab_box .tab_div", $("#" + tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#" + tabId.substr(4)));
    });
}

/*鼠标点击效果*/
function setClick_Choice(tabId) {
    $(".tab_nav .tab_li", $("#" + tabId)).unbind('click');
    $(".tab_nav .tab_li", $("#" + tabId)).click(function () {
        var index = $(this).index();
        $(this).addClass("tabCurItem").siblings().removeClass("tabCurItem");
        $(".tab_box .tab_div", $("#" + tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#" + tabId.substr(4)));
    });
}

/*自动播放*/
function setAnimat_int(tabId, time) {
    if (!time) time = 5;
    time = time * 1000;
    var viewid = tabId.substr(4);

    if (!window.tabConfigAnimat) window.tabConfigAnimat = {};
    //初始化
    window.tabConfigAnimat[viewid] = setTimeout(doAnimat, time);

    $("#" + viewid).mousemove(function () {
        if (window.tabConfigAnimat[viewid]) window.clearTimeout(window.tabConfigAnimat[viewid]);
    });
    $("#" + viewid).mouseover(function () {
        if (window.tabConfigAnimat[viewid]) window.clearTimeout(window.tabConfigAnimat[viewid]);
    });
    $("#" + viewid).mouseout(function () {
        window.tabConfigAnimat[viewid] = setTimeout(doAnimat, time);
    });

    function doAnimat() {
        if (window.tabConfigAnimat[viewid]) window.clearTimeout(window.tabConfigAnimat[viewid]);
        var index = $(".tab_nav .tabCurItem", $("#" + tabId)).index();
        index = index + 1;
        if (index >= $(".tab_nav .tab_li", $("#" + tabId)).length) {
            index = 0;
        }
        $(".tab_nav .tab_li", $("#" + tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
        $(".tab_box .tab_div", $("#" + tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
        diyAutoHeight($("#" + tabId.substr(4)));
        window.tabConfigAnimat[viewid] = setTimeout(doAnimat, time);
    }
}

//获取鼠标拖拽区域的总宽度
function tab_style03_init(tabId) {
    var total = 0;
    var obj = $(".tab_li", $("#" + tabId));
    $(".tab_li", $("#" + tabId)).each(function () {
        total += $(this).width();
    });
    $(".tab_ul_top", $("#" + tabId)).css("width", total + "px");
    $(".tab_ul_bottom", $("#" + tabId)).css("width", total + "px");

    //向左滚动图标事件
    $(".tab_left_arrow", $("#" + tabId)).unbind('click');
    $(".tab_left_arrow", $("#" + tabId)).click(function () {
        var index = $(".tab_nav .tabCurItem", $("#" + tabId)).index();
        index = index - 1;
        $(".tab_nav .tab_li", $("#" + tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
        $(".tab_box .tab_div", $("#" + tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    });

    //向右滚动图标事件
    $(".tab_right_arrow", $("#" + tabId)).unbind('click');
    $(".tab_right_arrow", $("#" + tabId)).click(function () {
        var index = $(".tab_nav .tabCurItem", $("#" + tabId)).index();
        var len = $(".tab_nav .tab_li").length;
        index = index + 1;
        if (index >= len) {
            index = 0;
        }
        $(".tab_nav .tab_li", $("#" + tabId)).eq(index).addClass("tabCurItem").siblings().removeClass("tabCurItem");
        $(".tab_box .tab_div", $("#" + tabId)).eq(index).addClass("niceTabShow").siblings().removeClass("niceTabShow");
    });
    setScroll_Choice(tabId);
}

function StranBody(fobj) {
    var obj = fobj ? fobj.childNodes : document.body.childNodes;
    for (var i = 0; i < obj.length; i++) {
        var OO = obj.item(i);
        if ("||BR|HR|TEXTAREA|".indexOf("|" + OO.tagName + "|") > 0 || OO == based_Obj) continue;
        if (OO.title != "" && OO.title != null) OO.title = StranText(OO.title);
        if (OO.alt != "" && OO.alt != null) OO.alt = StranText(OO.alt);
        if (OO.tagName == "INPUT" && OO.value != "" && OO.type != "text" && OO.type != "hidden") OO.value = StranText(OO.value);
        if (OO.nodeType == 3) {
            OO.data = StranText(OO.data)
        } else StranBody(OO)
    }

    try {
        var based_Obj2 = document.getElementById("based2");
        if (!based_Obj2) { //简繁
            based_Obj.innerHTML = BodyIsFt == 1 ? "简体中文" : "繁体中文";
        } else { //简繁英
            based_Obj.innerHTML = "繁体中文";
            based_Obj2.innerHTML = "简体中文";
        }
    } catch (e) {
    }
}

function StranBodyce(fobj) {
    var obj = fobj ? fobj.childNodes : document.body.childNodes;
    for (var i = 0; i < obj.length; i++) {
        var OO = obj.item(i);
        if ("||BR|HR|TEXTAREA|".indexOf("|" + OO.tagName + "|") > 0 || OO == based_Obj) continue;
        if (OO.title != "" && OO.title != null) OO.title = StranTextce(OO.title);
        if (OO.alt != "" && OO.alt != null) OO.alt = StranTextce(OO.alt);
        if (OO.tagName == "INPUT" && OO.value != "" && OO.type != "text" && OO.type != "hidden") OO.value = StranTextce(OO.value);
        if (OO.nodeType == 3) {
            OO.data = StranTextce(OO.data)
        } else StranBodyce(OO)
    }
    try {
        var based_Obj2 = document.getElementById("based2");
        if (!based_Obj2) { //简繁
            based_Obj.innerHTML = BodyIsFt == 1 ? "简体中文" : "繁体中文";
        } else { //简繁英
            based_Obj.innerHTML = "繁体中文";
            based_Obj2.innerHTML = "简体中文";
        }
    } catch (e) {
    }
}

function StranText(txt) {
    if (txt == "" || txt == null) return "";
    return Traditionalized(txt);
}

function StranTextce(txt) {
    if (txt == "" || txt == null) return "";
    return Traditionalizedce(txt);
}

function JTPYStr() {
    return '皑蔼碍爱翱袄奥坝罢摆败颁办绊帮绑镑谤剥饱宝报鲍辈贝钡狈备惫绷笔毕毙闭边编贬变辩辫鳖瘪濒滨宾摈饼拨钵铂驳卜补参蚕残惭惨灿苍舱仓沧厕侧册测层诧搀掺蝉馋谗缠铲产阐颤场尝长偿肠厂畅钞车彻尘陈衬撑称惩诚骋痴迟驰耻齿炽冲虫宠畴踌筹绸丑橱厨锄雏础储触处传疮闯创锤纯绰辞词赐聪葱囱从丛凑窜错达带贷担单郸掸胆惮诞弹当挡党荡档捣岛祷导盗灯邓敌涤递缔点垫电淀钓调迭谍叠钉顶锭订东动栋冻斗犊独读赌镀锻断缎兑队对吨顿钝夺鹅额讹恶饿儿尔饵贰发罚阀珐矾钒烦范贩饭访纺飞废费纷坟奋愤粪丰枫锋风疯冯缝讽凤肤辐抚辅赋复负讣妇缚该钙盖干赶秆赣冈刚钢纲岗皋镐搁鸽阁铬个给龚宫巩贡钩沟构购够蛊顾剐关观馆惯贯广规硅归龟闺轨诡柜贵刽辊滚锅国过骇韩汉阂鹤贺横轰鸿红后壶护沪户哗华画划话怀坏欢环还缓换唤痪焕涣黄谎挥辉毁贿秽会烩汇讳诲绘荤浑伙获货祸击机积饥讥鸡绩缉极辑级挤几蓟剂济计记际继纪夹荚颊贾钾价驾歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧浆蒋桨奖讲酱胶浇骄娇搅铰矫侥脚饺缴绞轿较秸阶节茎惊经颈静镜径痉竞净纠厩旧驹举据锯惧剧鹃绢杰洁结诫届紧锦仅谨进晋烬尽劲荆觉决诀绝钧军骏开凯颗壳课垦恳抠库裤夸块侩宽矿旷况亏岿窥馈溃扩阔蜡腊莱来赖蓝栏拦篮阑兰澜谰揽览懒缆烂滥捞劳涝乐镭垒类泪篱离里鲤礼丽厉励砾历沥隶俩联莲连镰怜涟帘敛脸链恋炼练粮凉两辆谅疗辽镣猎临邻鳞凛赁龄铃凌灵岭领馏刘龙聋咙笼垄拢陇楼娄搂篓芦卢颅庐炉掳卤虏鲁赂禄录陆驴吕铝侣屡缕虑滤绿峦挛孪滦乱抡轮伦仑沦纶论萝罗逻锣箩骡骆络妈玛码蚂马骂吗买麦卖迈脉瞒馒蛮满谩猫锚铆贸么霉没镁门闷们锰梦谜弥觅绵缅庙灭悯闽鸣铭谬谋亩钠纳难挠脑恼闹馁腻撵捻酿鸟聂啮镊镍柠狞宁拧泞钮纽脓浓农疟诺欧鸥殴呕沤盘庞国爱赔喷鹏骗飘频贫苹凭评泼颇扑铺朴谱脐齐骑岂启气弃讫牵扦钎铅迁签谦钱钳潜浅谴堑枪呛墙蔷强抢锹桥乔侨翘窍窃钦亲轻氢倾顷请庆琼穷趋区躯驱龋颧权劝却鹊让饶扰绕热韧认纫荣绒软锐闰润洒萨鳃赛伞丧骚扫涩杀纱筛晒闪陕赡缮伤赏烧绍赊摄慑设绅审婶肾渗声绳胜圣师狮湿诗尸时蚀实识驶势释饰视试寿兽枢输书赎属术树竖数帅双谁税顺说硕烁丝饲耸怂颂讼诵擞苏诉肃虽绥岁孙损笋缩琐锁獭挞抬摊贪瘫滩坛谭谈叹汤烫涛绦腾誊锑题体屉条贴铁厅听烃铜统头图涂团颓蜕脱鸵驮驼椭洼袜弯湾顽万网韦违围为潍维苇伟伪纬谓卫温闻纹稳问瓮挝蜗涡窝呜钨乌诬无芜吴坞雾务误锡牺袭习铣戏细虾辖峡侠狭厦锨鲜纤咸贤衔闲显险现献县馅羡宪线厢镶乡详响项萧销晓啸蝎协挟携胁谐写泻谢锌衅兴汹锈绣虚嘘须许绪续轩悬选癣绚学勋询寻驯训讯逊压鸦鸭哑亚讶阉烟盐严颜阎艳厌砚彦谚验鸯杨扬疡阳痒养样瑶摇尧遥窑谣药爷页业叶医铱颐遗仪彝蚁艺亿忆义诣议谊译异绎荫阴银饮樱婴鹰应缨莹萤营荧蝇颖哟拥佣痈踊咏涌优忧邮铀犹游诱舆鱼渔娱与屿语吁御狱誉预驭鸳渊辕园员圆缘远愿约跃钥岳粤悦阅云郧匀陨运蕴酝晕韵杂灾载攒暂赞赃脏凿枣灶责择则泽贼赠扎札轧铡闸诈斋债毡盏斩辗崭栈战绽张涨帐账胀赵蛰辙锗这贞针侦诊镇阵挣睁狰帧郑证织职执纸挚掷帜质钟终种肿众诌轴皱昼骤猪诸诛烛瞩嘱贮铸筑驻专砖转赚桩庄装妆壮状锥赘坠缀谆浊兹资渍踪综总纵邹诅组钻致钟么为只凶准启板里雳余链泄标适态于';
}

function FTPYStr() {
    return '皚藹礙愛翺襖奧壩罷擺敗頒辦絆幫綁鎊謗剝飽寶報鮑輩貝鋇狽備憊繃筆畢斃閉邊編貶變辯辮鼈癟瀕濱賓擯餅撥缽鉑駁蔔補參蠶殘慚慘燦蒼艙倉滄廁側冊測層詫攙摻蟬饞讒纏鏟産闡顫場嘗長償腸廠暢鈔車徹塵陳襯撐稱懲誠騁癡遲馳恥齒熾沖蟲寵疇躊籌綢醜櫥廚鋤雛礎儲觸處傳瘡闖創錘純綽辭詞賜聰蔥囪從叢湊竄錯達帶貸擔單鄲撣膽憚誕彈當擋黨蕩檔搗島禱導盜燈鄧敵滌遞締點墊電澱釣調叠諜疊釘頂錠訂東動棟凍鬥犢獨讀賭鍍鍛斷緞兌隊對噸頓鈍奪鵝額訛惡餓兒爾餌貳發罰閥琺礬釩煩範販飯訪紡飛廢費紛墳奮憤糞豐楓鋒風瘋馮縫諷鳳膚輻撫輔賦複負訃婦縛該鈣蓋幹趕稈贛岡剛鋼綱崗臯鎬擱鴿閣鉻個給龔宮鞏貢鈎溝構購夠蠱顧剮關觀館慣貫廣規矽歸龜閨軌詭櫃貴劊輥滾鍋國過駭韓漢閡鶴賀橫轟鴻紅後壺護滬戶嘩華畫劃話懷壞歡環還緩換喚瘓煥渙黃謊揮輝毀賄穢會燴彙諱誨繪葷渾夥獲貨禍擊機積饑譏雞績緝極輯級擠幾薊劑濟計記際繼紀夾莢頰賈鉀價駕殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗漿蔣槳獎講醬膠澆驕嬌攪鉸矯僥腳餃繳絞轎較稭階節莖驚經頸靜鏡徑痙競淨糾廄舊駒舉據鋸懼劇鵑絹傑潔結誡屆緊錦僅謹進晉燼盡勁荊覺決訣絕鈞軍駿開凱顆殼課墾懇摳庫褲誇塊儈寬礦曠況虧巋窺饋潰擴闊蠟臘萊來賴藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫撈勞澇樂鐳壘類淚籬離裏鯉禮麗厲勵礫曆瀝隸倆聯蓮連鐮憐漣簾斂臉鏈戀煉練糧涼兩輛諒療遼鐐獵臨鄰鱗凜賃齡鈴淩靈嶺領餾劉龍聾嚨籠壟攏隴樓婁摟簍蘆盧顱廬爐擄鹵虜魯賂祿錄陸驢呂鋁侶屢縷慮濾綠巒攣孿灤亂掄輪倫侖淪綸論蘿羅邏鑼籮騾駱絡媽瑪碼螞馬罵嗎買麥賣邁脈瞞饅蠻滿謾貓錨鉚貿麽黴沒鎂門悶們錳夢謎彌覓綿緬廟滅憫閩鳴銘謬謀畝鈉納難撓腦惱鬧餒膩攆撚釀鳥聶齧鑷鎳檸獰甯擰濘鈕紐膿濃農瘧諾歐鷗毆嘔漚盤龐國愛賠噴鵬騙飄頻貧蘋憑評潑頗撲鋪樸譜臍齊騎豈啓氣棄訖牽扡釺鉛遷簽謙錢鉗潛淺譴塹槍嗆牆薔強搶鍬橋喬僑翹竅竊欽親輕氫傾頃請慶瓊窮趨區軀驅齲顴權勸卻鵲讓饒擾繞熱韌認紉榮絨軟銳閏潤灑薩鰓賽傘喪騷掃澀殺紗篩曬閃陝贍繕傷賞燒紹賒攝懾設紳審嬸腎滲聲繩勝聖師獅濕詩屍時蝕實識駛勢釋飾視試壽獸樞輸書贖屬術樹豎數帥雙誰稅順說碩爍絲飼聳慫頌訟誦擻蘇訴肅雖綏歲孫損筍縮瑣鎖獺撻擡攤貪癱灘壇譚談歎湯燙濤縧騰謄銻題體屜條貼鐵廳聽烴銅統頭圖塗團頹蛻脫鴕馱駝橢窪襪彎灣頑萬網韋違圍爲濰維葦偉僞緯謂衛溫聞紋穩問甕撾蝸渦窩嗚鎢烏誣無蕪吳塢霧務誤錫犧襲習銑戲細蝦轄峽俠狹廈鍁鮮纖鹹賢銜閑顯險現獻縣餡羨憲線廂鑲鄉詳響項蕭銷曉嘯蠍協挾攜脅諧寫瀉謝鋅釁興洶鏽繡虛噓須許緒續軒懸選癬絢學勳詢尋馴訓訊遜壓鴉鴨啞亞訝閹煙鹽嚴顔閻豔厭硯彥諺驗鴦楊揚瘍陽癢養樣瑤搖堯遙窯謠藥爺頁業葉醫銥頤遺儀彜蟻藝億憶義詣議誼譯異繹蔭陰銀飲櫻嬰鷹應纓瑩螢營熒蠅穎喲擁傭癰踴詠湧優憂郵鈾猶遊誘輿魚漁娛與嶼語籲禦獄譽預馭鴛淵轅園員圓緣遠願約躍鑰嶽粵悅閱雲鄖勻隕運蘊醞暈韻雜災載攢暫贊贓髒鑿棗竈責擇則澤賊贈紮劄軋鍘閘詐齋債氈盞斬輾嶄棧戰綻張漲帳賬脹趙蟄轍鍺這貞針偵診鎮陣掙睜猙幀鄭證織職執紙摯擲幟質鍾終種腫衆謅軸皺晝驟豬諸誅燭矚囑貯鑄築駐專磚轉賺樁莊裝妝壯狀錐贅墜綴諄濁茲資漬蹤綜總縱鄒詛組鑽緻鐘麼為隻兇準啟闆裡靂餘鍊洩標適態於';
}

function Traditionalized(cc) {
    var str = '', ss = JTPYStr(), tt = FTPYStr();
    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1) str += tt.charAt(ss.indexOf(cc.charAt(i)));
        else str += cc.charAt(i);
    }
    return str;
}

function Traditionalizedce(cc) {
    var str = '', tt = JTPYStr(), ss = FTPYStr();
    for (var i = 0; i < cc.length; i++) {
        if (cc.charCodeAt(i) > 10000 && ss.indexOf(cc.charAt(i)) != -1) str += tt.charAt(ss.indexOf(cc.charAt(i)));
        else str += cc.charAt(i);
    }
    return str;
}

function _RequestParamsStr() {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf('?');
    var strRight = strHref.substr(intPos + 1);
    return strRight;
}

function Request(strName) {
    var arrTmp = _RequestParamsStr().split("&");
    for (var i = 0, len = arrTmp.length; i < len; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) {
            if (arrTemp[1].indexOf("#") != -1) arrTemp[1] = arrTemp[1].substr(0, arrTemp[1].indexOf("#"));
            return arrTemp[1];
        }
    }
    return "";
}

function SetCookie(name, value, hours) {
    var hourstay = 30 * 24 * 60 * 60 * 1000; //此 cookie 将被默认保存 30 天
    if (checkNum(hours)) {
        hourstay = hours;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + hourstay * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function checkNum(nubmer) {
    var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
    if (re.test(nubmer)) return true;
    return false;
}

function goBackHistory(num) {
    if (typeof (num) == 'undefined') {
        num = 0;
    }
    if (num == '0') {
        if (history.go(-1)) {
            location.href = history.go(-1);
        }
    } else {
        arr = location.href.split('/')
        arr[arr.length - 1] = "index.html"
        arr = arr.join('/')
        location.href = arr
    }
}

//简体转繁体
function commDefault_isFT() {
    var based_Obj = document.getElementById("based");
    var currentlang_Obj = document.getElementById("currentlang");//当前语言
    $(function () {
        if (based_Obj) {
            var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
            switch (Request('chlang')) {
                case "cn-tw":
                    BodyIsFt = getCookie(JF_cn) == "1" ? 0 : 1;
                    delCookie(JF_cn);
                    SetCookie(JF_cn, BodyIsFt, 7);
                    break;
                case "cn":
                case "en":
                    BodyIsFt = 0;
                    delCookie(JF_cn);
                    SetCookie(JF_cn, 0, 7);
                    currentlang_Obj.innerHTML = "简体中文";
                    break;
                case "tw":
                    BodyIsFt = 1;
                    delCookie(JF_cn);
                    SetCookie(JF_cn, 1, 7);
                    currentlang_Obj.innerHTML = "繁體中文"; //因为是繁体 你写简体也会被转化成繁体  所以这儿只能写繁体 2015-1-16
                    break;
                default:
                    if (typeof Default_isFT != 'undefined' && Default_isFT) { //如果默认繁体
                        if (getCookie(JF_cn) == null) {
                            BodyIsFt = 1;
                            SetCookie(JF_cn, 1, 7);
                            break;
                        }
                    }
                    BodyIsFt = parseInt(getCookie(JF_cn));
            }
            if (BodyIsFt === 1) {
                StranBody();
                document.title = StranText(document.title);
            } else {
                StranBodyce();
                document.title = StranTextce(document.title);
            }
        } else {
            var JF_cn = "ft" + self.location.hostname.toString().replace(/\./g, "");
            if (Default_isFT) {
                BodyIsFt = 1;
                delCookie(JF_cn);
                SetCookie(JF_cn, 1, 7);
                StranBody();
                document.title = StranText(document.title);
            } else {
                BodyIsFt = 0;
                delCookie(JF_cn);
                SetCookie(JF_cn, 0, 7);
                /*StranBodyce();
					document.title = StranTextce(document.title);*/
            }
        }

    });
}

DIY_PAGE_SIZE = '1200';


$(document).ready(function () {
    /*
	**当前模块对象：$("#dh_style_03_1560938593631")
	**效果仅在发布预览下才生效
	*/

})
var viewsSettings = {
    "comm_layout_header": {
        "diyShowName": "\u5171\u4eab\u5934\u90e8",
        "css": {
            "pc": {"height": "138px", "z-index": "99999"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "pad": {"height": "138px"},
            "mobile": {"height": "62px"}
        },
        "settingsBox": {
            "showTitle": "\u5171\u4eab\u5934\u90e8\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_blank_new01_1560933386501": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "blank_new01",
        "styleSort": "99",
        "styleKind": "\u56fe\u5f62\u6a21\u5757",
        "styleHelpId": 1248,
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "2880px",
                "height": "90px",
                "position": "absolute",
                "top": "0px",
                "left": "calc(50% - 1440px)"
            },
            "pad": [],
            "mobile": {"width": "100%", "height": "62px", "top": "0px", "left": "0%"},
            "customCss": {
                "pc": {
                    "modelArea": {"box-sizing": "border-box", "background": "#dadcd1"},
                    "@modSet": {"background": "#dadcd1"}
                },
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "false"},
        "name": "div",
        "kind": "\u6392\u7248\u5e03\u5c40",
        "showname": "\u9ed8\u8ba4",
        "diyShowName": "\u56fe\u5f62\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "image_logo_1560933829598": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageLogoConfig",
                    "setupFunc": "logoSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "LOGO\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "logo",
        "styleKind": "LOGO",
        "styleHelpId": 1252,
        "viewCtrl": "logo",
        "css": {
            "pc": {"width": "252px", "height": "65px", "position": "absolute", "top": "12.5px", "left": "0%"},
            "pad": {"left": "2%"},
            "mobile": {"width": "192px", "height": "48px", "top": "7px", "left": "2%"}
        },
        "data": {"logoType": 1, "logoStyle": "3", "logoBlank": "_self"},
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "diyShowName": "LOGO",
        "moveEdit": [],
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"filelist": "", "urllist": ""}
    },
    "searchbox_style_02_1560933937947": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "searchboxConfig",
                    "setupFunc": "searchboxSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u641c\u7d22\u6846\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u641c\u7d22\u6846-\u98ce\u683c2",
        "styleShowName": "\u98ce\u683c2",
        "styleKind": "\u641c\u7d22\u6846",
        "styleHelpId": 1261,
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "350px", "position": "absolute", "top": "25px", "left": "70.83333333333334%"},
            "pad": {"left": "62%", "top": "25px"},
            "mobile": {"width": "96%", "top": "135px", "left": "2%", "display": "none"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@btnaSet": {
                        "color": "#015231",
                        "border-color": "#015231",
                        "background": "transparent"
                    },
                    "@inputSet": {"border-color": "#015231", "background": "transparent", "color": "#015231"},
                    "@kwSet": {"color": "#015231"}
                }
            }
        },
        "lock": {"height": "true"},
        "data": {
            "is_search": "on",
            "searchBtn": "",
            "searchTip": "\u8bf7\u8f93\u5165\u641c\u7d22\u5185\u5bb9",
            "searchType": "1",
            "searchLink": 2686941
        },
        "name": "searchbox",
        "kind": "\u641c\u7d22\u6846",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_blank_new01_1560934306156": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "blank_new01",
        "styleSort": "99",
        "styleKind": "\u56fe\u5f62\u6a21\u5757",
        "styleHelpId": 1248,
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "2880px",
                "height": "48px",
                "position": "absolute",
                "top": "90px",
                "left": "calc(50% - 1440px)"
            },
            "pad": [],
            "mobile": {"width": "96%", "height": "50px", "top": "177px", "left": "2%", "display": "none"},
            "customCss": {
                "pc": {"modelArea": {"box-sizing": "border-box"}, "@modSet": {"background": "#333333"}},
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "false"},
        "name": "div",
        "kind": "\u6392\u7248\u5e03\u5c40",
        "showname": "\u9ed8\u8ba4",
        "diyShowName": "\u56fe\u5f62\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "dh_style_32_1560934919100": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsB",
                    "act": "dhConfig",
                    "setupFunc": "dhSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"
        },
        "styleHelpId": 1257,
        "style": "style_32",
        "diyShowName": "\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c32",
        "styleShowName": "\u4e09\u7ea7\u5bfc\u822a-\u98ce\u683c32",
        "styleKind": "\u5bfc\u822a\u83dc\u5355",
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "90%", "z-index": "999", "position": "absolute", "top": "90px", "left": "5%"},
            "pad": {"z-index": "999"},
            "mobile": {"width": "10.4%", "z-index": "999", "top": "9px", "left": "87.86666666666667%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@mainMenuSet": {
                        "font-size": "16px",
                        "line-height": "48px",
                        "bg-hover-color": "#015231",
                        "background": "#333333",
                        "text-hover-color": "#ffffff"
                    },
                    "@thrMenuSet:hover": {"background": "#015231", "color": "#ffffff"},
                    "@thrCurSet": {"background": "#015231", "color": "#ffffff"},
                    "@subMenuSet:hover": {"background": "#015231", "color": "#ffffff"},
                    "@subCurSet": {"background": "#015231", "color": "#ffffff"},
                    "@mainMenuSet:hover": {"background": "#015231", "color": "#ffffff"},
                    "%hot>a": {"background": "#015231", "color": "#ffffff"},
                    "@subMenuSet": {"background": "#5b5b5b"},
                    "@thrMenuSet": {"background": "#838383"}
                },
                "pad": {
                    "@mainMenuSet": {"background": "#333333"},
                    "@subMenuSet": {"background": "#5b5b5b"},
                    "@thrMenuSet": {"background": "#838383"}
                },
                "mobile": {
                    "@mainMenuSet": {"background": "transparent"},
                    "@subMenuSet": {"background": "#5b5b5b"},
                    "@thrMenuSet": {"background": "#838383"}
                }
            }
        },
        "lock": {"height": "true"},
        "data": {
            "childMenuType": "1",
            "dhOpen": "on",
            "subtitlename": "off",
            "logoposition": "0",
            "logoopen": "off",
            "logoright": "",
            "logoleft": "",
            "contentWidth": "",
            "showpc": [],
            "showmobile": []
        },
        "name": "dh",
        "kind": "\u5bfc\u822a\u83dc\u5355",
        "showname": "\u5bfc\u822a\u83dc\u5355",
        "eventSet": {"scrollView": "none", "type": "none"},
        "themeColor": "#333333"
    },
    "layout_diy_1560931233": {
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "css": {
            "pc": {"height": "588px"},
            "pad": {"height": "400px"},
            "mobile": {"height": "200px"},
            "content": {"max-width": "1200px", "overflow": "visible"}
        },
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "banner_style_01_1560935379084": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "bannerConfig",
                    "setupFunc": "bannerSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u8f6e\u64ad\u5c5e\u6027\u8bbe\u7f6e"
        },
        "styleHelpId": 1256,
        "style": "style_01",
        "diyShowName": "\u8f6e\u64ad\u56fe-\u98ce\u683c1",
        "styleShowName": "\u98ce\u683c1",
        "styleKind": "\u56fe\u7247\u8f6e\u64ad",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "2880px",
                "height": "588px",
                "position": "absolute",
                "top": "0px",
                "left": "calc(50% - 1440px)"
            },
            "pad": {"height": "400px", "left": "calc(50% - 1440px)"},
            "mobile": {"width": "100%", "height": "200px", "top": "0px", "left": "0%"}
        },
        "doubleClickFunc": "bannerViewSelect",
        "mouseMenu": [{
            "name": "\u7f16\u8f91\u8f6e\u64ad\u56fe",
            "func": "bannerViewSelect()",
            "ico": "fa-file-image-o"
        }],
        "params": {
            "filelist": "\/userimg\/63355\/pkgimg\/banner\/banner1.jpg,\/userimg\/63355\/pkgimg\/banner\/banner2.jpg,",
            "textlist": ",,",
            "urllist": ",,",
            "selectlist": ",,"
        },
        "name": "banner",
        "kind": "\u56fe\u7247\u8f6e\u64ad",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {"imgStyle": {"pc": "3", "pad": "3", "mobile": "3"}}
    },
    "layout_1560995237824": {
        "css": {
            "pc": {"height": "91px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "mobile": {"height": "41px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1560995155532": {
        "css": {
            "pc": {"height": "141px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "mobile": {"height": "90px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInDown", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1560995287078": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "0px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "2%",
                "height": "90px"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "28px",
                        "text-align": "center",
                        "line-height": "28px",
                        "height": "30px",
                        "letter-spacing": "4px"
                    }
                }, "mobile": {"@view_contents": {"height": "28px"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_01_1560995974347": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "52px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "40px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "18px",
                        "text-align": "center",
                        "line-height": "18px",
                        "height": "18px",
                        "letter-spacing": "0px",
                        "color": "#999999"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1560996125257": {
        "css": {
            "pc": {"height": "372px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_02.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "mobile": {"height": "726px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_01_1560996191805": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "30.833333333333336%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "41px",
                "left": "0%"
            },
            "pad": {"left": "2%"},
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "235px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "24px",
                        "color": "#333333",
                        "line-height": "24px",
                        "height": "24px"
                    }
                }, "mobile": {"@view_contents": {"text-align": "center", "font-size": "22px"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInLeft", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "image_style_01_1560996551132": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "styleHelpId": 1254,
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "480px", "height": "300px", "position": "absolute", "top": "0px", "left": "60%"},
            "pad": {"top": "0px", "left": "59.38494167550371%", "width": "377px", "height": "268px"},
            "mobile": {"width": "96%", "height": "225px", "top": "0px", "left": "2%"},
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "imgUrl": "v9Res\/image01_default.jpg",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/tupian\/20190620103419325.jpg",
            "imgStyle": {"pc": "3", "pad": "3", "mobile": null}
        },
        "params": {
            "animate": "bounceInRight",
            "duration": "1",
            "delay": "0.25",
            "iteration": "1",
            "offset": "0",
            "filelist": "",
            "urllist": ""
        }
    },
    "image_style_01_1560996839363": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "styleHelpId": 1254,
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "260px",
                "height": "160px",
                "position": "absolute",
                "top": "206px",
                "left": "51.79166666666667%"
            },
            "pad": {"top": "206px", "left": "47.125198833510076%"},
            "mobile": {"width": "96%", "height": "225px", "top": "429px", "left": "2%"},
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "imgUrl": "v9Res\/image01_default.jpg",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/tupian\/20190620103419643.jpg",
            "imgStyle": {"pc": "3", "pad": null, "mobile": "3"}
        },
        "params": {
            "animate": "bounceInRight",
            "duration": "1",
            "delay": "0.25",
            "iteration": "1",
            "offset": "0",
            "filelist": "",
            "urllist": ""
        }
    },
    "text_style_01_1560996967379": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "44.5%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "111px",
                "left": "0%"
            },
            "pad": {"left": "2%"},
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "269px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "text-indent": "2em",
                        "color": "#666666",
                        "font-size": "14px",
                        "line-height": "30px",
                        "height": "150px"
                    }
                }, "mobile": {"@view_contents": {"line-height": "22px", "height": "160px"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInLeft", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "customForm_style_button_01_1560997190926": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "buttonConfig",
                    "setupFunc": "btnSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6309\u94ae\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_button_01",
        "diyShowName": "\u8868\u5355-\u6309\u94ae",
        "styleShowName": "\u98ce\u683c1",
        "styleKind": "AAA",
        "viewCtrl": "button",
        "css": {
            "pc": {"width": "150px", "position": "absolute", "top": "318px", "left": "0%"},
            "pad": {"left": "2%"},
            "mobile": {"width": "60%", "top": "669px", "left": "20%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@btnaSet": {
                        "border-style": "none",
                        "box-shadow": "transparent 0px 0px 10px ",
                        "color": "#ffffff",
                        "font-size": "16px",
                        "line-height": "30px",
                        "height": "45px",
                        "background": "#015231"
                    }, "@btnaSet:hover": {"background": "#015231", "color": "#ffffff"}
                }
            }
        },
        "lock": {"height": "true"},
        "name": "customForm",
        "kind": "\u8868\u5355\u6a21\u5757",
        "showname": "\u81ea\u5b9a\u4e49",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {"buttonVal": "\u67e5\u770b\u66f4\u591a", "btnType": "button", "linkType": "1", "selectVal": 2686939},
        "params": {"animate": "bounceInLeft", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "layout_1560933829594": {
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "css": {
            "content": {"overflow": "visible", "max-width": "1200px"},
            "pc": {"height": "91px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_03.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "mobile": {"height": "41px"}
        },
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1560998251963": {
        "css": {
            "pc": {"height": "141px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_04.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "mobile": {"height": "91px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1560998251965": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "0px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "28px",
                        "text-align": "center",
                        "line-height": "28px",
                        "height": "30px",
                        "letter-spacing": "4px"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInDown", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1560998251977": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "52px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "40px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "18px",
                        "text-align": "center",
                        "line-height": "18px",
                        "height": "18px",
                        "letter-spacing": "0px",
                        "color": "#999999"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInDown", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "layout_1560998189504": {
        "css": {
            "pc": {"height": "509px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_05.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "pad": {"height": "436px"},
            "mobile": {"height": "637px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "tab_style_03_1560998524365": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "tabConfig",
                    "setupFunc": "tabSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u9009\u9879\u5361\u5c5e\u6027\u8bbe\u7f6e"
        },
        "styleHelpId": 1258,
        "style": "style_03",
        "diyShowName": "\u9009\u9879\u5361-\u9ed8\u8ba4",
        "styleShowName": "\u9ed8\u8ba4\u98ce\u683c",
        "styleKind": "\u9009\u9879\u5361",
        "viewCtrl": "default3",
        "isInclude": "3",
        "css": {
            "pc": {"width": "100%", "height": "509px", "position": "absolute", "top": "0px", "left": "0%"},
            "pad": {"height": "436px", "width": "96%", "left": "2.014846235418876%"},
            "mobile": {"width": "100%", "height": "637px", "top": "0px", "left": "0%"},
            "customCss": {
                "pc": {
                    "@tabItemSet": {"font-size": "16px", "color": "#333333", "background": "transparent"},
                    "@tabconSet": {"background": "transparent"},
                    "@tabItemSet@tabCurItem": {"background": "#015231", "color": "#ffffff"},
                    "@tabItemSet@tabCurItem:hover": {"background": "#015231", "color": "#ffffff"}
                }
            }
        },
        "name": "tab",
        "kind": "\u9009\u9879\u5361",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {
            "showtab": "1",
            "tabalign": "center",
            "tabtextmargin": "0",
            "tabimg": ["\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png", "\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png", "\/sysTools\/Model\/viewsRes\/publish\/img\/comm\/tabImg.png", "\/sysTools\/View\/img\/diy\/tabImg.png"],
            "tabname": ["\u7eff\u8336", "\u7ea2\u8336", "\u9752\u8336", "\u767d\u8336"],
            "tabtexttype": "center",
            "slidearrow": "",
            "tabheight": "50",
            "tabtextset": "2",
            "tabwidth": "92"
        },
        "params": {"animate": "bounceIn", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "productList_style_23_1560999406232": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "prodListConfig",
                    "setupFunc": "prodListSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_23",
        "diyShowName": "\u4ea7\u54c1\u5217\u8868-\u5e38\u89c4\u98ce\u683c1",
        "styleShowName": "\u5e38\u89c4\u98ce\u683c1",
        "styleSort": "23",
        "styleKind": "AAA",
        "styleHelpId": 1269,
        "defaultContent": ["pic", "title", "oldprice"],
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "100%", "position": "absolute", "left": "0%", "top": "30px"},
            "pad": {"left": "0%", "width": "100%"},
            "mobile": {"width": "96%", "top": "0px", "left": "2%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@titleSet": {
                        "text-align": "center",
                        "font-size": "16px",
                        "color": "#333333",
                        "line-height": "30px"
                    },
                    "@detailSet": {
                        "font-size": "14px",
                        "text-align": "left",
                        "color": "#666666",
                        "line-height": "30px"
                    },
                    "@btnaSet": {
                        "margin-left": "66px",
                        "margin-right": "66px",
                        "background": "#015231",
                        "color": "#ffffff",
                        "line-height": "30px",
                        "height": "32px",
                        "border-style": "none",
                        "font-size": "12px"
                    }
                },
                "pad": {"@btnaSet": {"margin-left": "50px"}},
                "mobile": {
                    "@btnaSet": {"margin-left": "0px", "margin-right": "0px", "margin-top": "8px"},
                    "@titleSet": {"line-height": "24px"},
                    "@detailSet": {"line-height": "24px"}
                }
            }
        },
        "lock": {"height": "true"},
        "prodnum": "4",
        "prodhnum": "4",
        "prodhnumpad": "3",
        "prodhnummobile": "2",
        "prodznum": "2",
        "picscale": "1:1",
        "prodtitle": "true",
        "prodprice": "true",
        "prodviprice": "false",
        "prodbutton": "true",
        "prodpic": "true",
        "arr_ProdShow": {
            "pic": "\u56fe\u7247",
            "title": "\u6807\u9898",
            "kind": "\u7c7b\u522b",
            "intro": "\u7b80\u4ecb",
            "page": "\u5206\u9875",
            "price": "\u4ef7\u683c",
            "stock": "\u9500\u91cf",
            "viprice": "\u4f1a\u5458\u4ef7",
            "button": "\u6309\u94ae"
        },
        "data": {
            "newpshow": {"pc": ["pic", "title", "intro", "oldprice", "button"]},
            "pshow": ["pic", "title", "intro", "oldprice", "button"],
            "gids": [759293],
            "btnName": "\u67e5\u770b\u8be6\u60c5",
            "btnshowat": "2",
            "prodIntroNum": {"pc": "16", "pad": "12", "mobile": "10"},
            "prodsort": "intOrder",
            "prodPicScale": "1:1",
            "prodhnumpad": "4",
            "prodhnum": "4"
        },
        "name": "productList",
        "kind": "\u4ea7\u54c1\u6a21\u5757",
        "showname": "\u4ea7\u54c1\u5217\u8868",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "productList_style_23_1561001385284": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "prodListConfig",
                    "setupFunc": "prodListSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_23",
        "diyShowName": "\u4ea7\u54c1\u5217\u8868-\u5e38\u89c4\u98ce\u683c1",
        "styleShowName": "\u5e38\u89c4\u98ce\u683c1",
        "styleSort": "23",
        "styleKind": "AAA",
        "styleHelpId": 1269,
        "defaultContent": ["pic", "title", "oldprice"],
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "100%", "position": "absolute", "left": "0%", "top": "30px"},
            "pad": {"width": "100%"},
            "mobile": {"width": "96%", "top": "0px", "left": "2%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@titleSet": {
                        "text-align": "center",
                        "font-size": "16px",
                        "color": "#333333",
                        "line-height": "30px"
                    },
                    "@detailSet": {
                        "font-size": "14px",
                        "text-align": "left",
                        "color": "#666666",
                        "line-height": "30px"
                    },
                    "@btnaSet": {
                        "margin-left": "66px",
                        "margin-right": "66px",
                        "background": "#015231",
                        "color": "#ffffff",
                        "line-height": "30px",
                        "height": "32px",
                        "border-style": "none",
                        "font-size": "12px"
                    }
                },
                "pad": {"@btnaSet": {"margin-left": "50px"}},
                "mobile": {
                    "@titleSet": {"line-height": "24px"},
                    "@detailSet": {"line-height": "24px"},
                    "@btnaSet": {"margin-top": "8px", "margin-left": "0px", "margin-right": "0px"}
                }
            }
        },
        "lock": {"height": "true"},
        "prodnum": "4",
        "prodhnum": "4",
        "prodhnumpad": "3",
        "prodhnummobile": "2",
        "prodznum": "2",
        "picscale": "1:1",
        "prodtitle": "true",
        "prodprice": "true",
        "prodviprice": "false",
        "prodbutton": "true",
        "prodpic": "true",
        "arr_ProdShow": {
            "pic": "\u56fe\u7247",
            "title": "\u6807\u9898",
            "kind": "\u7c7b\u522b",
            "intro": "\u7b80\u4ecb",
            "page": "\u5206\u9875",
            "price": "\u4ef7\u683c",
            "stock": "\u9500\u91cf",
            "viprice": "\u4f1a\u5458\u4ef7",
            "button": "\u6309\u94ae"
        },
        "data": {
            "newpshow": {"pc": ["pic", "title", "intro", "oldprice", "button"]},
            "pshow": ["pic", "title", "intro", "oldprice", "button"],
            "gids": [759295],
            "btnName": "\u67e5\u770b\u8be6\u60c5",
            "btnshowat": "2",
            "prodIntroNum": {"pc": "16", "pad": "12", "mobile": "10"},
            "prodsort": "intOrder",
            "prodhnumpad": "4",
            "prodhnum": "4"
        },
        "name": "productList",
        "kind": "\u4ea7\u54c1\u6a21\u5757",
        "showname": "\u4ea7\u54c1\u5217\u8868",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "productList_style_23_1561002557545": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "prodListConfig",
                    "setupFunc": "prodListSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_23",
        "diyShowName": "\u4ea7\u54c1\u5217\u8868-\u5e38\u89c4\u98ce\u683c1",
        "styleShowName": "\u5e38\u89c4\u98ce\u683c1",
        "styleSort": "23",
        "styleKind": "AAA",
        "styleHelpId": 1269,
        "defaultContent": ["pic", "title", "oldprice"],
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "100%", "position": "absolute", "left": "0%", "top": "30px"},
            "pad": {"width": "100%"},
            "mobile": {"width": "96%", "top": "0px", "left": "2%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@titleSet": {
                        "text-align": "center",
                        "font-size": "16px",
                        "color": "#333333",
                        "line-height": "30px"
                    },
                    "@detailSet": {
                        "font-size": "14px",
                        "text-align": "left",
                        "color": "#666666",
                        "line-height": "30px"
                    },
                    "@btnaSet": {
                        "margin-left": "66px",
                        "margin-right": "66px",
                        "background": "#015231",
                        "color": "#ffffff",
                        "line-height": "30px",
                        "height": "32px",
                        "border-style": "none",
                        "font-size": "12px"
                    }
                },
                "pad": {"@btnaSet": {"margin-left": "50px"}},
                "mobile": {
                    "@btnaSet": {"margin-left": "0px", "margin-right": "0px"},
                    "@titleSet": {"line-height": "24px"},
                    "@detailSet": {"line-height": "24px"}
                }
            }
        },
        "lock": {"height": "true"},
        "prodnum": "4",
        "prodhnum": "4",
        "prodhnumpad": "3",
        "prodhnummobile": "2",
        "prodznum": "2",
        "picscale": "1:1",
        "prodtitle": "true",
        "prodprice": "true",
        "prodviprice": "false",
        "prodbutton": "true",
        "prodpic": "true",
        "arr_ProdShow": {
            "pic": "\u56fe\u7247",
            "title": "\u6807\u9898",
            "kind": "\u7c7b\u522b",
            "intro": "\u7b80\u4ecb",
            "page": "\u5206\u9875",
            "price": "\u4ef7\u683c",
            "stock": "\u9500\u91cf",
            "viprice": "\u4f1a\u5458\u4ef7",
            "button": "\u6309\u94ae"
        },
        "data": {
            "newpshow": {"pc": ["pic", "title", "intro", "oldprice", "button"]},
            "pshow": ["pic", "title", "intro", "oldprice", "button"],
            "gids": [759297],
            "btnName": "\u67e5\u770b\u8be6\u60c5",
            "btnshowat": "2",
            "prodIntroNum": {"pc": "16", "pad": "12", "mobile": "10"},
            "prodsort": "intOrder",
            "prodhnumpad": "4",
            "prodhnum": "4"
        },
        "name": "productList",
        "kind": "\u4ea7\u54c1\u6a21\u5757",
        "showname": "\u4ea7\u54c1\u5217\u8868",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "productList_style_23_1561002575689": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "prodListConfig",
                    "setupFunc": "prodListSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u4ea7\u54c1\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_23",
        "diyShowName": "\u4ea7\u54c1\u5217\u8868-\u5e38\u89c4\u98ce\u683c1",
        "styleShowName": "\u5e38\u89c4\u98ce\u683c1",
        "styleSort": "23",
        "styleKind": "AAA",
        "styleHelpId": 1269,
        "defaultContent": ["pic", "title", "oldprice"],
        "viewCtrl": "default",
        "css": {
            "pc": {"width": "100%", "position": "absolute", "left": "0%", "top": "30px"},
            "pad": {"width": "100%"},
            "mobile": {"width": "96%", "top": "0px", "left": "2%"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@titleSet": {
                        "text-align": "center",
                        "font-size": "16px",
                        "color": "#333333",
                        "line-height": "30px"
                    },
                    "@detailSet": {
                        "font-size": "14px",
                        "text-align": "left",
                        "color": "#666666",
                        "line-height": "30px"
                    },
                    "@btnaSet": {
                        "margin-left": "66px",
                        "margin-right": "66px",
                        "background": "#015231",
                        "color": "#ffffff",
                        "line-height": "30px",
                        "height": "32px",
                        "border-style": "none",
                        "font-size": "12px"
                    }
                },
                "pad": {"@btnaSet": {"margin-left": "50px"}},
                "mobile": {
                    "@titleSet": {"line-height": "24px"},
                    "@detailSet": {"line-height": "24px"},
                    "@btnaSet": {"margin-top": "8px", "margin-left": "0px", "margin-right": "0px"}
                }
            }
        },
        "lock": {"height": "true"},
        "prodnum": "4",
        "prodhnum": "4",
        "prodhnumpad": "3",
        "prodhnummobile": "2",
        "prodznum": "2",
        "picscale": "1:1",
        "prodtitle": "true",
        "prodprice": "true",
        "prodviprice": "false",
        "prodbutton": "true",
        "prodpic": "true",
        "arr_ProdShow": {
            "pic": "\u56fe\u7247",
            "title": "\u6807\u9898",
            "kind": "\u7c7b\u522b",
            "intro": "\u7b80\u4ecb",
            "page": "\u5206\u9875",
            "price": "\u4ef7\u683c",
            "stock": "\u9500\u91cf",
            "viprice": "\u4f1a\u5458\u4ef7",
            "button": "\u6309\u94ae"
        },
        "data": {
            "newpshow": {"pc": ["pic", "title", "intro", "oldprice", "button"]},
            "pshow": ["pic", "title", "intro", "oldprice", "button"],
            "gids": [759299],
            "btnName": "\u67e5\u770b\u8be6\u60c5",
            "btnshowat": "2",
            "prodIntroNum": {"pc": "16", "pad": "12", "mobile": "10"},
            "prodsort": "intOrder",
            "prodhnumpad": "4",
            "prodhnum": "4"
        },
        "name": "productList",
        "kind": "\u4ea7\u54c1\u6a21\u5757",
        "showname": "\u4ea7\u54c1\u5217\u8868",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1561011327726": {
        "css": {
            "pc": {"height": "91px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "mobile": {"height": "41px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1561011427234": {
        "css": {
            "pc": {"height": "401px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/banner4.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }, "pad": {"modelArea": {"background-size": "auto 100%", "background-repeat": "no-repeat!important"}}
            },
            "pad": {"height": "420px"},
            "mobile": {"height": "444px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_01_1561011794563": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "30.833333333333336%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "61px",
                "left": "55.833333333333336%"
            },
            "pad": {"left": "44.008483563096505%", "top": "64px"},
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "39px",
                "left": "2%"
            },
            "customCss": {
                "pc": {"@view_contents": {"font-size": "18px", "color": "#ffffff"}},
                "mobile": {"@view_contents": {"height": "28px"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInRight", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1561339943222": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "43.75%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "108px",
                "left": "55.75%"
            },
            "pad": {"left": "44.008483563096505%", "top": "104px", "width": "516px"},
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "81px",
                "left": "2%"
            },
            "customCss": {"pc": {"@view_contents": {"color": "#ffffff", "font-size": "14px", "line-height": "26px"}}}
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInRight", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "layout_1561011892998": {
        "css": {
            "pc": {"height": "91px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "mobile": {"height": "41px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "layout_1561011915530": {
        "css": {
            "pc": {"height": "141px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "mobile": {"height": "91px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_01_1561011915532": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "0px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "28px",
                        "text-align": "center",
                        "line-height": "28px",
                        "height": "30px",
                        "letter-spacing": "4px"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInDown", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1561011915551": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "top": "52px",
                "left": "0%"
            },
            "pad": [],
            "mobile": {
                "width": "96%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "40px",
                "left": "2%"
            },
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "font-size": "18px",
                        "text-align": "center",
                        "line-height": "18px",
                        "height": "18px",
                        "letter-spacing": "0px",
                        "color": "#999999"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceInDown", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "layout_1561011907787": {
        "css": {
            "pc": {"height": "401px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_08.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "pad": {"height": "406px"},
            "mobile": {"height": "726px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "newsList_style_12_1561012031600": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsBhj",
                    "act": "newListCfg",
                    "setupFunc": "newListSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u65b0\u95fb\u5217\u8868\u5c5e\u6027\u8bbe\u7f6e"
        },
        "styleHelpId": 1266,
        "style": "style_12",
        "diyShowName": "\u65b0\u95fb\u5217\u8868-\u98ce\u683c12",
        "styleShowName": "\u98ce\u683c12",
        "styleKind": "AAA",
        "viewCtrl": "newsList",
        "css": {
            "pc": {"width": "100%", "position": "absolute", "top": "0px", "left": "0%"},
            "pad": {"width": "96%", "left": "2%", "top": "6px"},
            "mobile": {"width": "96%", "top": "0px", "left": "2%"},
            "customCss": {
                "pc": {
                    "@titleSet": {"font-size": "18px"},
                    "@detailSet": {"font-size": "14px", "line-height": "26px"}
                }, "pad": {"@titleSet": {"line-height": "38px"}, "@detailSet": {"line-height": "26px"}}
            }
        },
        "lock": {"height": "true"},
        "data": {
            "newsShow": ["pic", "date", "title", "summary"],
            "comments_num": 10,
            "sort": "id",
            "newsnum": "3",
            "column": 1,
            "titlenum": 36,
            "newPicScale": "1:1",
            "newpicwidth": "400",
            "detailnum": {"pc": "150", "pad": "60", "mobile": 36},
            "newsSort": "idAsc"
        },
        "newList": {
            "pic": "\u56fe\u7247",
            "date": "\u65e5\u671f",
            "title": "\u6807\u9898",
            "kind": "\u7c7b\u522b",
            "summary": "\u6458\u8981",
            "page": "\u5206\u9875"
        },
        "name": "newsList",
        "kind": "\u65b0\u95fb\u6a21\u5757",
        "showname": "\u65b0\u95fb\u5217\u8868",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"animate": "bounceIn", "duration": "1", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "layout_1560998332116": {
        "css": {
            "pc": {"height": "91px"},
            "content": {"overflow": "visible", "max-width": "1200px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "background": " url(\/userimg\/63355\/pkgimg\/banner\/tupian_07.jpg)",
                        "background-position": "50% 50% !important",
                        "background-size": "auto 100%"
                    }
                }
            },
            "mobile": {"height": "41px"}
        },
        "diyShowName": "\u533a\u57df\u5e03\u5c40",
        "name": "layout",
        "style": "autoLayout",
        "settingsBox": {
            "showTitle": "\u533a\u57df\u5e03\u5c40\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "comm_layout_footer": {
        "diyShowName": "\u5171\u4eab\u5e95\u90e8",
        "css": {
            "pc": {"height": "376px", "z-index": "99999"},
            "content": {"max-width": "1200px", "overflow": "visible"},
            "customCss": {"pc": {"modelArea": {"background": "#333333"}}},
            "pad": {"height": "350px"},
            "mobile": {"height": "50px"}
        },
        "settingsBox": {
            "showTitle": "\u5171\u4eab\u5e95\u90e8\u8bbe\u7f6e",
            "setList": {
                "\u6837\u5f0f": {
                    "isDefault": "true",
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }
        },
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_blank_new01_1560938718722": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5706\u5f62\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "blank_new01",
        "styleSort": "99",
        "styleKind": "\u56fe\u5f62\u6a21\u5757",
        "styleHelpId": 1248,
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "2880px",
                "height": "50px",
                "position": "absolute",
                "top": "326px",
                "left": "calc(50% - 1440px)"
            },
            "pad": {"top": "300px", "left": "-205.40827147401907%"},
            "mobile": {"width": "100%", "height": "50px", "top": "0px", "left": "0%"},
            "customCss": {
                "pc": {"modelArea": {"box-sizing": "border-box"}, "@modSet": {"background": "#dadcd1"}},
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "false"},
        "name": "div",
        "kind": "\u6392\u7248\u5e03\u5c40",
        "showname": "\u9ed8\u8ba4",
        "diyShowName": "\u56fe\u5f62\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_includeBlock_1560938593486": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "includeBlock",
        "styleKind": "\u81ea\u7531\u5bb9\u5668",
        "viewCtrl": "includeBlock",
        "isInclude": "5",
        "allowIncludeSelf": "1",
        "css": {
            "pc": {"width": "100%", "height": "316px", "position": "absolute", "top": "0px", "left": "0%"},
            "pad": {"height": "301px"},
            "mobile": {"width": "96%", "height": "227px", "top": "50px", "left": "2%", "display": "none"}
        },
        "name": "div",
        "kind": "\u6392\u7248\u5e03\u5c40",
        "showname": "\u9ed8\u8ba4",
        "diyShowName": "\u81ea\u7531\u5bb9\u5668",
        "eventSet": {"scrollView": "none", "type": "none"},
        "autoHeight": "false",
        "needfix": 1,
        "moveEdit": []
    },
    "div_includeBlock_1560938593536": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "includeBlock",
        "styleKind": "\u5bb9\u5668\u6a21\u5757",
        "viewCtrl": "includeBlock",
        "isInclude": "5",
        "allowIncludeSelf": "1",
        "css": {
            "pc": {"width": "23%", "height": "256px", "position": "absolute", "top": "43px", "left": "77%"},
            "pad": {"width": "165px", "left": "79.12082449628845%", "height": "257.5px", "top": "29px"},
            "mobile": {"width": "100%", "height": "240px", "top": "467px", "left": "0%", "display": "none"},
            "undefined": {"height": "72px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "border-bottom-color": "#ffffff",
                        "border-bottom-style": "none",
                        "border-bottom-width": "1px"
                    }
                }
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u5bb9\u5668\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"},
        "autoHeight": "false"
    },
    "text_style_02_1560938593623": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u5b57\u4f53",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "62.5%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "left": "12.596240942028986%",
                "top": "4.5px"
            },
            "mobile": {"width": "97.30000000000001%", "left": "1.3499999999999943%", "top": "0px"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "color": "#ffffff",
                        "font-size": "20px",
                        "font-weight": "normal",
                        "text-align": "left",
                        "font-family": "Microsoft YaHei",
                        "line-height": "30px",
                        "letter-spacing": "2px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box", "font-size": "24px"}},
                "mobile": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-size": "18px",
                        "line-height": "30px",
                        "font-weight": "normal"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u6587\u5b57\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "div_blank_1560938593628": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            },
            "showTitle": "\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e",
            "\u5c5e\u6027": {
                "isDefault": "true",
                "mod": "viewSettingsHcl",
                "act": "blankDivConfig",
                "setupFunc": "textSetup"
            }
        },
        "style": "blank",
        "styleKind": "\u7a7a\u767d\u6a21\u5757",
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "70px",
                "height": "3px",
                "position": "absolute",
                "left": "12.596240942028986%",
                "top": "45px",
                "z-index": "2"
            },
            "mobile": {
                "width": "20.263157894736842%",
                "height": "3px",
                "left": "39.868421052631575%",
                "top": "0px",
                "display": "block"
            },
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {"modelArea": {"box-sizing": "border-box", "background": "#015231"}},
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u7a7a\u767d\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "dh_style_03_1560938593631": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsB",
                    "act": "dhConfig",
                    "setupFunc": "dhSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bfc\u822a\u83dc\u5355\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_03",
        "diyShowName": "\u5bfc\u822a\u83dc\u5355-\u98ce\u683c3",
        "styleShowName": "\u98ce\u683c3",
        "styleShowImg": "\/sysTools\/Model\/viewsRes\/showImg\/dh_style_3.png",
        "styleShowClass": "one",
        "styleKind": "\u5bfc\u822a\u83dc\u5355",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "36.91756272401434%",
                "z-index": "999",
                "left": "8.973052536231885%",
                "top": "72.5px",
                "position": "absolute"
            },
            "pad": {"z-index": "999", "width": "93px", "left": "5.625%", "top": "70.5px"},
            "mobile": {"width": "14.348025711662075%", "z-index": "999", "left": "42.82598714416896%", "top": "240px"},
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {
                    "@columnSet": {
                        "background": "transparent",
                        "font-size": "12px",
                        "line-height": "14px",
                        "color": "#bfbfbf"
                    },
                    "%hot>a": {"background": "transparent", "color": "#bfbfbf"},
                    "@mainMenuSet": {
                        "border-right-style": "none",
                        "border-bottom-style": "none",
                        "height": "28px",
                        "line-height": "28px",
                        "color": "#999999",
                        "font-size": "14px"
                    },
                    "@mainMenuSet:hover": {"background": "transparent"}
                }, "pad": {"@mainMenuSet": {"font-size": "14px"}}
            }
        },
        "lock": {"height": "true"},
        "name": "dh",
        "kind": "\u5bfc\u822a\u83dc\u5355",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "data": {"dhAll": "1", "dhid": [null, null, null, null, null], "dhOpen": "", "showpc": [], "showmobile": []}
    },
    "div_includeBlock_1560938593541": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "includeBlock",
        "styleKind": "\u5bb9\u5668\u6a21\u5757",
        "viewCtrl": "includeBlock",
        "isInclude": "5",
        "allowIncludeSelf": "1",
        "css": {
            "pc": {
                "width": "40.08333333333333%",
                "height": "273px",
                "position": "absolute",
                "top": "43px",
                "left": "35.083333333333336%"
            },
            "pad": {"height": "272px", "width": "339px", "left": "41.73846765641569%", "top": "29px"},
            "mobile": {"width": "100%", "height": "240px", "top": "0px", "left": "0%", "display": "none"},
            "undefined": {"height": "72px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "border-bottom-color": "#ffffff",
                        "border-bottom-style": "none",
                        "border-bottom-width": "1px"
                    }
                }
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u5bb9\u5668\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"},
        "autoHeight": "false"
    },
    "div_blank_1560938593650": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            },
            "showTitle": "\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e",
            "\u5c5e\u6027": {
                "isDefault": "true",
                "mod": "viewSettingsHcl",
                "act": "blankDivConfig",
                "setupFunc": "textSetup"
            }
        },
        "style": "blank",
        "styleKind": "\u7a7a\u767d\u6a21\u5757",
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "70px",
                "height": "3px",
                "position": "absolute",
                "left": "4.98960498960499%",
                "top": "47px",
                "z-index": "2"
            },
            "mobile": {
                "width": "20.263157894736842%",
                "height": "3px",
                "left": "39.868421052631575%",
                "top": "0px",
                "display": "block"
            },
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {"modelArea": {"box-sizing": "border-box", "background": "#015231"}},
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u7a7a\u767d\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_02_1560938593654": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u5b57\u4f53",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "62.5%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "left": "4.98960498960499%",
                "top": "6.5px"
            },
            "mobile": {"width": "97.30000000000001%", "left": "1.3499999999999943%", "top": "0px"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "color": "#ffffff",
                        "font-size": "20px",
                        "font-weight": "normal",
                        "text-align": "left",
                        "font-family": "Microsoft YaHei",
                        "line-height": "30px",
                        "letter-spacing": "2px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box", "font-size": "24px"}},
                "mobile": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-size": "18px",
                        "line-height": "30px",
                        "font-weight": "normal"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u6587\u5b57\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_01_1560994313006": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "76.92307692307693%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "left": "4.98960498960499%",
                "top": "72.5px"
            },
            "pad": {"left": "3.15726401179941%", "width": "83.00653594771242%", "top": "70.5px"},
            "mobile": {
                "width": "50%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "25%"
            },
            "customCss": {"pc": {"@view_contents": {"color": "#999999", "font-size": "14px"}}}
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "needfix": 1,
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "image_style_01_1560994527801": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "styleHelpId": 1254,
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "23.284823284823286%",
                "height": "112px",
                "position": "absolute",
                "top": "113px",
                "left": "4.98960498960499%"
            },
            "pad": {"width": "112px"},
            "mobile": {"width": "100%", "height": "134px", "top": "25px", "left": "0%"},
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "imgUrl": "v9Res\/image01_default.jpg",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "needfix": 1,
        "eventSet": {"scrollView": "none", "type": "none"},
        "moveEdit": [],
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/tupian\/20190620093618709.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": null}
        },
        "params": {"filelist": "", "urllist": ""}
    },
    "image_style_01_1560994584995": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "styleHelpId": 1254,
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "23.284823284823286%",
                "height": "112px",
                "position": "absolute",
                "top": "113px",
                "left": "46.77754677754678%"
            },
            "pad": {"width": "112px", "left": "49.133480825958706%", "top": "113px"},
            "mobile": {"width": "100%", "height": "134px", "top": "0px", "left": "0%"},
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "imgUrl": "v9Res\/image01_default.jpg",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "needfix": 1,
        "eventSet": {"scrollView": "none", "type": "none"},
        "moveEdit": [],
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/tupian\/20190620093618709.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": null}
        },
        "params": {"filelist": "", "urllist": ""}
    },
    "text_style_01_1560994806352": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "112px",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "left": "4.98960498960499%",
                "top": "237.5px"
            },
            "pad": {"width": "112px", "left": "5.577064896755162%", "top": "241px"},
            "mobile": {
                "width": "50%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "0%"
            },
            "customCss": {"pc": {"@view_contents": {"color": "#999999", "font-size": "14px", "text-align": "center"}}}
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "needfix": 1,
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_01_1560994867633": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u6587\u672c\u6a21\u5757",
        "styleKind": "\u6587\u672c\u6a21\u5757",
        "styleSort": "99",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "23.28482328482329%",
                "font-size": "16px",
                "color": "#333",
                "line-height": "1.8",
                "font-family": "Microsoft YaHei",
                "position": "absolute",
                "left": "46.77754677754678%",
                "top": "237.5px"
            },
            "pad": {"width": "112px", "left": "49.133480825958706%", "top": "241px"},
            "mobile": {
                "width": "50%",
                "font-size": "12px",
                "color": "#333",
                "line-height": "1.6",
                "top": "0px",
                "left": "0%"
            },
            "customCss": {"pc": {"@view_contents": {"color": "#999999", "font-size": "14px", "text-align": "center"}}}
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "needfix": 1,
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_includeBlock_1560938593546": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u5bb9\u5668\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "includeBlock",
        "styleKind": "\u5bb9\u5668\u6a21\u5757",
        "viewCtrl": "includeBlock",
        "isInclude": "5",
        "allowIncludeSelf": "1",
        "css": {
            "pc": {
                "width": "34.583333333333336%",
                "height": "256px",
                "position": "absolute",
                "top": "43px",
                "left": "0%"
            },
            "pad": {"height": "270px", "width": "356px", "left": "2%", "top": "29px"},
            "mobile": {"width": "100%", "height": "145px", "top": "0px", "left": "0%", "display": "block"},
            "undefined": {"height": "72px"},
            "customCss": {
                "pc": {
                    "modelArea": {
                        "border-left-color": "#ffffff",
                        "border-left-style": "none",
                        "border-left-width": "1px"
                    }
                }, "mobile": {"modelArea": {"border-left-width": "0px"}}
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u5bb9\u5668\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"},
        "autoHeight": "false"
    },
    "text_style_02_1560938593679": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u6807\u9898",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "84%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "top": "207.5px",
                "left": "12.707078313253012%"
            },
            "pad": {"top": "206px", "left": "11.385182584269662%", "width": "72.42524916943522%"},
            "mobile": {"width": "100%", "top": "0px", "left": "0%", "display": "none"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-family": "Microsoft YaHei",
                        "font-size": "14px",
                        "color": "#999999",
                        "line-height": "30px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box"}},
                "mobile": {"@view_contents": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "div_blank_1560938593686": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "blankDivConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            },
            "showTitle": "\u7a7a\u767d\u6a21\u5757\u5c5e\u6027\u8bbe\u7f6e",
            "\u5c5e\u6027": {
                "isDefault": "true",
                "mod": "viewSettingsHcl",
                "act": "blankDivConfig",
                "setupFunc": "textSetup"
            }
        },
        "style": "blank",
        "styleKind": "\u7a7a\u767d\u6a21\u5757",
        "viewCtrl": "blank",
        "css": {
            "pc": {
                "width": "70px",
                "height": "3px",
                "position": "absolute",
                "left": "4.028614457831326%",
                "top": "47px",
                "z-index": "2"
            },
            "pad": {"top": "51px", "height": "3px", "left": "1.9656019656019657%"},
            "mobile": {
                "width": "20.263157894736842%",
                "height": "3px",
                "left": "39.868421052631575%",
                "top": "0px",
                "display": "none"
            },
            "content": {"overflow": "visible"},
            "customCss": {
                "pc": {"modelArea": {"box-sizing": "border-box", "background": "#015231"}},
                "pad": {"modelArea": {"box-sizing": "border-box"}},
                "mobile": {"modelArea": {"box-sizing": "border-box"}}
            }
        },
        "name": "div",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u7ed3\u6784\u6a21\u5757",
        "diyShowName": "\u7a7a\u767d\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "image_style_01_1560938593689": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "4.819277108433735%",
                "height": "25px",
                "position": "absolute",
                "top": "76.5px",
                "left": "4.028614457831326%"
            },
            "pad": {"left": "1.4044943820224718%", "top": "73px", "width": "20px"},
            "mobile": {
                "width": "57.3921028466483%",
                "height": "200px",
                "top": "200px",
                "left": "21.30394857667585%",
                "display": "none"
            },
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/icon\/icon1.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": "null"}
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"filelist": "", "urllist": ""}
    },
    "image_style_01_1560938593691": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "6.506024096385541%",
                "height": "25px",
                "position": "absolute",
                "top": "122.16666666666666px",
                "left": "4.028614457831326%"
            },
            "pad": {"left": "1.4044943820224718%", "width": "6.388206388206388%", "top": "118.5px", "height": "27px"},
            "mobile": {
                "width": "55.09641873278237%",
                "height": "200px",
                "top": "0px",
                "left": "22.451790633608816%",
                "display": "none"
            },
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/icon\/icon2.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": "null"}
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"filelist": "", "urllist": ""}
    },
    "image_style_01_1560938593694": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "6.833333333333333%",
                "height": "20px",
                "position": "absolute",
                "top": "167.828125px",
                "left": "3.305722891566265%"
            },
            "pad": {"left": "1.4044943820224718%", "top": "165px", "height": "21px", "width": "27px"},
            "mobile": {
                "width": "55.09641873278237%",
                "height": "200px",
                "top": "0px",
                "left": "22.451790633608816%",
                "display": "none"
            },
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/icon\/icon3.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": "null"}
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"filelist": "", "urllist": ""}
    },
    "image_style_01_1560938593699": {
        "settingsBox": {
            "setList": {
                "\u5e38\u89c4": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "imageConfig",
                    "setupFunc": "imageSetup"
                },
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u56fe\u7247\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_01",
        "diyShowName": "\u56fe\u7247-\u5355\u5f20",
        "styleShowName": "\u5355\u5f20\u56fe\u7247",
        "styleKind": "\u5355\u5f20\u56fe\u7247",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "6.166666666666667%",
                "height": "18px",
                "position": "absolute",
                "top": "213.5px",
                "left": "3.305722891566265%"
            },
            "pad": {"left": "1.4044943820224718%", "top": "213px", "width": "25px", "height": "21px"},
            "mobile": {
                "width": "55.09641873278237%",
                "height": "200px",
                "top": "0px",
                "left": "22.451790633608816%",
                "display": "none"
            },
            "content": {"overflow": "visible"}
        },
        "doubleClickFunc": "imageViewSelect",
        "mouseMenu": [{"name": "\u9009\u62e9\u56fe\u7247", "func": "imageViewSelect()", "ico": "fa-file-image-o"}],
        "sizeCallbackFunc": "setImgCen",
        "name": "image",
        "kind": "\u56fe\u7247\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "data": {
            "imgUrl": "\/userimg\/63355\/pkgimg\/icon\/icon4.png",
            "imgStyle": {"pc": "1", "pad": "1", "mobile": "null"}
        },
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"filelist": "", "urllist": ""}
    },
    "text_style_02_1560938593705": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u6807\u9898",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "66.5%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "top": "72.5px",
                "left": "12.707078313253012%"
            },
            "pad": {"left": "11.29453316953317%", "width": "77.40863787375415%", "top": "70.5px"},
            "mobile": {"width": "100%", "top": "0px", "left": "0%", "display": "none"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-family": "Microsoft YaHei",
                        "font-size": "14px",
                        "color": "#999999",
                        "line-height": "30px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box"}},
                "mobile": {"@view_contents": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_02_1560938593709": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u6807\u9898",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "70.12048192771084%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "top": "119.15625px",
                "left": "12.707078313253012%"
            },
            "pad": {"left": "11.117450842696629%", "top": "115px", "width": "216px"},
            "mobile": {"width": "100%", "top": "145px", "left": "0%", "display": "none"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-family": "Microsoft YaHei",
                        "font-size": "14px",
                        "color": "#999999",
                        "line-height": "30px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box"}},
                "mobile": {"@view_contents": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_02_1560938593712": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u6807\u9898",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "66.25%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "top": "162.828125px",
                "left": "12.707078313253012%"
            },
            "pad": {"left": "11.52563202247191%", "top": "160px", "width": "190px"},
            "mobile": {"width": "100%", "top": "0px", "left": "0%", "display": "none"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-family": "Microsoft YaHei",
                        "font-size": "14px",
                        "color": "#999999",
                        "line-height": "30px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box"}},
                "mobile": {"@view_contents": {"box-sizing": "border-box"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"}
    },
    "text_style_02_1560938593721": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u5b57\u4f53",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "56.333333333333336%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "left": "4.039909638554217%",
                "top": "6.5px"
            },
            "pad": {"left": "1.9656019656019657%", "top": "7.5px"},
            "mobile": {"width": "97.30000000000001%", "left": "1.3499999999999943%", "top": "0px", "display": "none"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "color": "#ffffff",
                        "font-size": "20px",
                        "font-weight": "normal",
                        "text-align": "left",
                        "font-family": "Microsoft YaHei",
                        "line-height": "30px",
                        "letter-spacing": "2px"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box", "font-size": "24px"}},
                "mobile": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-size": "18px",
                        "line-height": "30px",
                        "font-weight": "normal"
                    }
                }
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u57fa\u7840\u6a21\u5757",
        "showname": "\u6587\u5b57\u6a21\u5757",
        "eventSet": {"scrollView": "none", "type": "none"},
        "params": {"duration": "2", "delay": "0.25", "iteration": "1", "offset": "0"}
    },
    "text_style_02_1560938593573": {
        "settingsBox": {
            "setList": {
                "\u5c5e\u6027": {
                    "isDefault": "true",
                    "mod": "viewSettingsHcl",
                    "act": "textConfig",
                    "setupFunc": "textSetup"
                },
                "\u98ce\u683c": {"mod": "viewSettingsOne", "act": "ShowStyle"},
                "\u52a8\u753b": {"mod": "viewSettings", "act": "anime", "setupFunc": "setBoxAnime"},
                "\u6837\u5f0f": {
                    "mod": "viewSettingsCustom",
                    "act": "CustomConfig",
                    "setupFunc": "SettingtabChange,SettingCustomListen"
                },
                "\u5168\u5c40": {"mod": "viewSettings", "act": "main", "setupFunc": "setBoxMain"}
            }, "showTitle": "\u6587\u5b57\u5c5e\u6027\u8bbe\u7f6e"
        },
        "style": "style_02",
        "diyShowName": "\u6587\u5b57\u6a21\u5757-\u5fae\u8f6f\u96c5\u9ed1",
        "styleKind": "\u4e2d\u6587\u6807\u9898",
        "viewCtrl": "default",
        "css": {
            "pc": {
                "width": "100%",
                "font-size": "46px",
                "color": "#333",
                "line-height": "50px",
                "font-family": "microsoft yahei",
                "position": "absolute",
                "top": "338px",
                "left": "0%"
            },
            "pad": {"top": "312px", "left": "0%"},
            "mobile": {"width": "96%", "top": "10px", "left": "2%"},
            "customCss": {
                "pc": {
                    "@view_contents": {
                        "box-sizing": "border-box",
                        "font-family": "Microsoft YaHei",
                        "font-size": "14px",
                        "color": "#999999",
                        "line-height": "30px",
                        "text-align": "center"
                    }
                },
                "pad": {"@view_contents": {"box-sizing": "border-box"}},
                "mobile": {"@view_contents": {"box-sizing": "border-box", "text-align": "center", "font-size": "14px"}}
            }
        },
        "lock": {"height": "true"},
        "showEditTip": "\u53cc\u51fb\u7f16\u8f91\u6587\u5b57\u5185\u5bb9",
        "doubleClickFunc": "editTextView",
        "mouseMenu": [{"name": "\u7f16\u8f91\u6587\u5b57\u5185\u5bb9", "func": "editTextView()", "ico": ""}],
        "name": "text",
        "kind": "\u6587\u5b57\u6a21\u5757",
        "showname": "\u9ed8\u8ba4",
        "eventSet": {"scrollView": "none", "type": "none"},
        "moveEdit": []
    }
}