"use strict";
import jQuery from "jquery";
import "@/resume/resume/js/jquery-ui.min.js";
import "@/resume/resume/js/bootstrap.js";
import "@/resume/resume/js/jquery.slimscroll.js";
import "@/resume/resume/js/jquery.fullPage.js";
import "@/resume/resume/js/jquery.qtip.js";
import "@/resume/resume/js/transition.js";
const _prodVersion = "";
const data = require("../data.json?v=" + _prodVersion);
const imgs = {
  brief: {
    html: require("../imgs/html.png"),
    css: require("../imgs/css.png"),
    js: require("../imgs/js.png"),
    more: require("../imgs/more.png")
  },
  gallery: {
    pos: require("../imgs/pos.png"),
    pospa: require("../imgs/pospa.png"),
    log_android: require("../imgs/log_android.png"),
    monitor: require("../imgs/monitor.png"),
    mi: require("../imgs/mi.png"),
    DuiTang: require("../imgs/DuiTang.png")
  },
  misc: {
    work: require("../imgs/work.svg"),
    study: require("../imgs/study.svg"),
    github_1: require("../imgs/github_1.png"),
    github_2: require("../imgs/github_2.png")
  }
};

$(function() {
  var $win = $(window);
  if (window.location.hash === "") {
    window.location.hash = "#demo1";
  }
  $("#fadeWhite").fadeOut(400);
  //$("[id*='Btn']").stop(true).on('click', function (e) {e.preventDefault();$(this).scrolld();})
  $(".webtip").each(function() {
    $(this).qtip({
      content: { text: $(this).next("div") },
      position: { my: "left top", at: "center right" },
      style: { classes: "qtip-light qtip-shadow qtip-rounded" }
    });
  });
  $(".site-wrapper-inner").fullpage({
    sectionsColor: ["#f05c4d", "#686FB3", "#549fea", "#ffd863"],
    anchors: ["demo1", "demo2", "demo3", "demo4"],
    menu: "#menu",
    resize: false,
    scrollingSpeed: 500,
    afterLoad: function(anchorLink, index) {
      if (index === 1) {
        homepage_animate($('[data-anchor="demo1"]')); //#demo1's animation
      }
      $("#navSelected")
        .stop(true)
        .animate({ left: $(".active")[0].offsetLeft }, 300, "easeOutBack");
      $("#navSelected").width($(".active").width());
      scroll_animate(anchorLink);
    }
  });
  fill_data(); //fill pages with 'data.json'
  bindTabActive(); //connect navigation with pages
  $(window).resize(function() {
    resize($("#demo2"));
  });
  if (window.location.hash === "#demo1") {
    homepage_animate($('[data-anchor="demo1"]'));
    $("#navbar ul li")
      .eq(3)
      .trigger("click");
  }
  setTimeout(function() {
    if (document.body.offsetWidth < 768) {
      if ($("footer")[0].offsetTop + 75 + 45 < $(window).height()) {
        $("footer").css("position", "fixed");
        $("footer").css("bottom", 50);
      } else {
        $("footer").css("position", "initial");
        $("footer").css("margin-top", 20);
      }
    }
  }, 100);
  $("#navSelected").width($(".active").width());
  $(".homebackground").css("height", $win.height());
  $win.resize(function() {
    $(".homebackground").css("height", $win.height());
  });
  $(".logo img").hover(
    function() {
      $("#persion2").animate({ opacity: "1" }, 600);
    },
    function() {
      $("#persion2").animate({ opacity: "0" }, 600);
    }
  );
  $("#github").hover(
    function() {
      $(this)
        .find("img")
        .attr("src", imgs.misc.github_2);
    },
    function() {
      $(this)
        .find("img")
        .attr("src", imgs.misc.github_1);
    }
  );
  $(".ski_icon")
    .find("img.icon")
    .each(function(i, e) {
      var id = $(this).attr("id");
      var id_flag = id.substring(id.indexOf("_") + 1);
      var index = i;
      $(this)
        .off("click")
        .on("click", function() {
          var calc = "";
          // calc: ios safafi不支持
          switch (index) {
            case 0:
              // calc(30px - 20px)
              calc = $(document.body).height() > 600 ? 10 : 25;
              break;
            case 1:
              // calc((100% - 240px) / 3 + 75px)
              calc =
                ($("#triangle_up")
                  .parent()
                  .width() -
                  240) /
                  3 +
                75;
              break;
            case 2:
              // calc(2 * (100% - 240px) / 3 + 140px)
              calc =
                $(document.body).height() > 600
                  ? 2 *
                      ($("#triangle_up")
                        .parent()
                        .width() -
                        240) /
                      3 +
                    140
                  : 2 *
                      ($("#triangle_up")
                        .parent()
                        .width() -
                        240) /
                      3 +
                    130;
              break;
            case 3:
              // calc(100% - 30px)
              calc =
                $(document.body).height() > 600
                  ? $("#triangle_up")
                      .parent()
                      .width() - 30
                  : $("#triangle_up")
                      .parent()
                      .width() - 50;
              break;
          }

          $("#triangle_up").css("left", calc);
          $(".icon_detail")
            .children(".detailImg")
            .each(function() {
              $(this).addClass("hidden");
            });
          $("#detail_" + id_flag)
            .removeClass("hidden")
            .fadeIn("fast");
          if (
            $(this)
              .parents(".li_icon")
              .css("transform") == "matrix(1, 0, 0, 1, 0, 0)" ||
            $(this)
              .parents(".li_icon")
              .css("transform") == "none"
          ) {
            $(this)
              .parents(".li_icon")
              .css("-webkit-transform", "rotateY(360deg)");
            $(this)
              .parents(".li_icon")
              .css("-moz-transform", "rotateY(360deg)");
            $(this)
              .parents(".li_icon")
              .css("-ms-transform", "rotateY(360deg)");
            $(this)
              .parents(".li_icon")
              .css("-o-transform", "rotateY(360deg)");
            $(this)
              .parents(".li_icon")
              .css("transform", "rotateY(360deg)");
          } else {
            $(this)
              .parents(".li_icon")
              .css("-webkit-transform", "rotateY(0deg)");
            $(this)
              .parents(".li_icon")
              .css("-moz-transform", "rotateY(0deg)");
            $(this)
              .parents(".li_icon")
              .css("-ms-transform", "rotateY(0deg)");
            $(this)
              .parents(".li_icon")
              .css("-o-transform", "rotateY(0deg)");
            $(this)
              .parents(".li_icon")
              .css("transform", "rotateY(0deg)");
          }
        });
    });
  $(".cd-timeline-img")
    .off("click")
    .on("click", function() {
      $(this)
        .parents(".cd-timeline-block")
        .siblings()
        .find("ul")
        .slideUp(400);
      $(this)
        .parents(".cd-timeline-block")
        .find("ul")
        .slideToggle(400);
    });
});
var changeActive = function(e) {
  e.parent().attr("id", "navCurr");
  e.parent().addClass("active");
};
var removeActive = function(e) {
  e
    .parent()
    .siblings()
    .each(function() {
      $(this).removeClass("active");
      $(this).removeAttr("id");
    });
};
var php_console = function() {
  /*
    $.when(defer("php/sys_console.php")).done(function(data){
            //var json_result = eval('(' + data + ')');
            //var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
            console.log("over")
    })*/
  var win = window.open("http://localhost:8080/Rlibrary/welcome.jsp");
};

function bindTabActive() {
  //擦除效果
  jQuery.extend(jQuery.easing, {
    easeOutBack: function(x, t, b, c, d, s) {
      s = s || 1.3;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
  });
  //nav初始化选中
  var navCurr = $("#navCurr");
  $("#navSelected").css("left", navCurr[0].offsetLeft);
  $("#navbar ul li")
    .off("click")
    .on("click", function() {
      $(this)
        .siblings("li")
        .each(function() {
          $(this).removeAttr("id");
        });
      $(this).attr("id", "navCurr");
    });
  if (!browser.versions.mobile) {
    //nav里的链接hover效果
    $("#navbar ul li").hover(
      function() {
        if (
          !!$("#navSelected")
            .stop(true)
            .animate({ left: $(this)[0].offsetLeft }, 400, "easeOutBack")
        ) {
          $(this)
            .siblings()
            .removeClass("active")
            .end()
            .addClass("active");
          $("#navSelected").width($(".active").width());
        }
      },
      function() {
        $(this).removeClass("active");
        $("#navCurr").addClass("active");
        navCurr = $("#navCurr");
        $("#navSelected")
          .stop(true)
          .animate({ left: navCurr[0].offsetLeft }, 300, "easeOutBack");
        $("#navSelected").width($(".active").width());
      }
    );
  }
}
var fill_data = function() {
  $.each(data, function(i, item) {
    var appends = "";
    if (i == "demo1") {
      //--------------------------------------------------------append demo1
      var fsize = "";
      $.each(item.fsize, function(ii, iitem) {
        if (iitem.indexOf("@") > -1) {
          fsize +=
            '<p class="fsize contenttitle"><a href="' +
            iitem +
            '" >' +
            iitem +
            "<a></p>";
        } else {
          fsize += '<p class="fsize contenttitle">' + iitem + "</p>";
        }
      });
      appends +=
        '<div class="inner cover">\
                      <h4 class="contenttitle"><strong>' +
        item.contenttitle +
        '</strong></h4>\
                      <p class="decoration"></p>\
                      <article style="margin-top: 20px">' +
        fsize +
        "</article>\
                  </div>";
      $('[data-anchor="' + i + '"] .fp-tableCell').append(appends);
    } else if (i == "demo2") {
      //--------------------------------------------------------append demo2
      var subtitle =
        '<div class="inner cover">\
                          <h3 class="animated subtitle cover section_title"><strong>' +
        item.subtitle +
        '</strong></h3>\
                          <div class="decoration"></div></div>\
                      </div>\
                      <div><h5 class="animated subt">' +
        item.subt +
        "</h5></div>";
      var article =
        '<div class="center-block article">\
                      <div class="icon_div">\
                          <ul class="list-unstyled list-inline ski_icon">\
                              <li class="li_icon animated">\
                                  <img src="' +
        imgs.brief.html +
        '" class="icon animated" id="icon_html">\
                              </li>\
                              <li class="li_icon animated">\
                                  <img src="' +
        imgs.brief.js +
        '" class="icon animated" id="icon_js">\
                              </li>\
                              <li class="li_icon animated">\
                                  <img src="' +
        imgs.brief.css +
        '" class="icon animated" id="icon_css">\
                              </li>\
                              <li class="li_icon animated">\
                                  <img src="' +
        imgs.brief.more +
        '" class="icon animated" id="icon_more">\
                              </li>\
                          </ul>\
                      </div>\
                  </div>';
      var detail_out =
        '<div class="icon_detail text-center animated"><div id="triangle_up"></div>';
      var descripWords = '<div class="intro center-block hidden">';
      $.each(item, function(ii, iitem) {
        if (ii.indexOf("detail") > -1) {
          var detail_in =
            '<ul id="' + ii + '" class="list-unstyled detailImg">';
          if (ii !== "detail_html") {
            detail_in =
              '<ul id="' + ii + '" class="list-unstyled hidden detailImg">';
          }
          $.each(iitem, function(iii, iiitem) {
            detail_in += "<li>" + iiitem + "</li>";
          });
          detail_in += "</ul>";
          detail_out += detail_in;
        } else if (ii === "fsize_") {
          $.each(iitem, function(iii, iiitem) {
            descripWords += '<p class="fsize_">' + iiitem + "</p>";
          });
        }
      });
      detail_out += "</div>";
      descripWords += "</div>";
      $('[data-anchor="' + i + '"] .fp-tableCell').append(subtitle + article);
      $('[data-anchor="' + i + '"] .fp-tableCell .article').append(
        descripWords
      );
      $('[data-anchor="' + i + '"] .fp-tableCell .article .icon_div').append(
        detail_out
      );
    } else if (i == "demo3") {
      //--------------------------------------------------------append demo3
      var subtitle =
        '<div class="inner cover">\
                          <h3 class="animated subtitle cover section_title"><strong>' +
        item.subtitle +
        '</strong></h3>\
                          <div class="decoration"></div>\
                      </div>\
                      <div><h5 class="animated subt">' +
        item.subt +
        "</h5></div>";
      var subbody = '<div class="major">';
      $.each(item.project, function(ii, iitem) {
        if (ii < 6) {
          for (var key in iitem) {
            if (item.project[ii][key][0] === undefined) {
              item.project[ii][key][0] = "";
            }
            if (item.project[ii][key][1] === undefined) {
              item.project[ii][key][1] = "";
            }
            var base_sentense =
              '<div class="pro-module animated" data-index="' +
              ii +
              '">\
                                    <img src="' +
              imgs.gallery[key] +
              '" />\
                                    <div class="background-shadow">\
                                        <a href="' +
              (key === "ci"
                ? "/project_dao/" + key + "/vip.html"
                : key === "pospa"
                  ? "/project_dao/pospa/pospa/admin.html"
                  : "/project_dao/" + key + "/index.html") +
              '" target="_blanck" class="btn btn_custom btn-default center-block">Check It</a>\
                                    </div>\
                                </div>';
            if (ii >= 0 && ii < 3) {
              base_sentense = base_sentense.replace(
                'animated"',
                'animated slideD"'
              );
              if (ii === 0) {
                base_sentense = base_sentense.replace(
                  'href="/' + key + '"',
                  'href="http://localhost:8080/Rlibrary/welcome.jsp"'
                );
              }
            } else if (ii >= 3) {
              base_sentense = base_sentense.replace(
                'animated"',
                'animated slideU"'
              );
            }
            subbody += base_sentense;
          }
        }
      });
      subbody += "</div>";
      $('[data-anchor="' + i + '"] .fp-tableCell').append(subtitle + subbody);

      function calcShadowStyle() {
        $(".background-shadow").each(function() {
          $(this).width(
            $(this)
              .siblings("img")
              .width()
          );
        });
      }

      // calcShadowStyle()

      if (document.body.offsetWidth < 768) {
        $(".pro-module").each(function() {
          var i = parseInt($(this).attr("data-index"));
          if (i % 2 == 0) {
            $(this)
              .addClass("top")
              .addClass("left");
          } else {
            $(this).addClass("top");
          }
        });
      } else {
        $(".pro-module").each(function() {
          var i = parseInt($(this).attr("data-index"));
          if (i === 0) {
            $(this).addClass("left top");
          } else if (i === 1) {
            $(this).addClass("top");
          } else if (i === 2) {
            $(this).addClass("right top");
          } else if (i === 3) {
            $(this).addClass("left bottom");
          } else if (i === 4) {
            $(this).addClass("bottom");
          } else if (i === 5) {
            $(this).addClass("right bottom");
          }
        });
      }
    } else if (i == "demo4") {
      //--------------------------------------------------------append demo4
      var subtitle =
        '<div class="inner cover" style="/visibility:hidden;">\
                          <h3 class="animated subtitle cover section_title"><strong>' +
        item.subtitle +
        '</strong></h3>\
                          <div class="decoration"></div>\
                      </div>\
                      <div><h5 class="animated subt">' +
        item.subt +
        "</h5></div>";
      var subbody =
        '<div class="container-timeline">\
                      <section id="cd-timeline" class="cd-container">';
      $.each(item.experience, function(i, e) {
        subbody += '<div class="cd-timeline-block">';
        $.each(e, function(ii, ee) {
          if (ii === "picture") {
            subbody +=
              '<div class="cd-timeline-img ' +
              ee +
              '-backgroundColor is-hidden">\
                            <img src="' +
              imgs.misc[ee] +
              '" alt="Picture">\
                        </div>';
          } else {
            subbody +=
              '<div class="cd-timeline-content is-hidden animated">\
                          <div class="text-left"><h5><strong>' +
              ee[0] +
              "</strong></h5></div><hr>";
            subbody += '<ul style="display: none;">';
            $.each(ee[1], function(iii, eee) {
              subbody += '<li class="text-left">' + eee + "</li>";
            });
            subbody += "</ul>";
            subbody += '<span class="cd-date">' + ii + "</span></div>";
          }
        });
        subbody += "</div>";
      });
      subbody += "</section></div>";
      $("#demo5").before(subtitle + subbody);
    }
  });
};
var homepage_animate = function($homebackground_id) {
  $(".decoration").css("width", 0);
  $homebackground_id
    .find(".subt")
    .removeClass("subt")
    .addClass("swing");
  $homebackground_id
    .find(".contenttitle")
    .removeClass("contenttitle")
    .addClass("cover-heading");
  $homebackground_id.find(".decoration").css(
    "width",
    $homebackground_id
      .find(".decoration")
      .prev(".cover-heading")
      .width()
  );
  $homebackground_id
    .find(".li_icon")
    .css("visibility", "visible")
    .addClass("fadeInDown");
  var $intro_p = $homebackground_id.find(".intro .fsize_");
  $homebackground_id
    .find(".intro")
    .removeClass("hidden")
    .animate({ width: "100%" }, 500, function() {
      $intro_p.eq(0).animate({ bottom: "0" }, 500, "linear", function() {
        $intro_p.eq(1).animate({ bottom: "0" }, 500, "linear", function() {
          $intro_p.eq(2).animate({ bottom: "0" }, 500, "linear", function() {
            $intro_p.eq(3).animate({ bottom: "0" }, 500, "linear");
          });
        });
      });
    });
  $homebackground_id.find("#cd-timeline").addClass("before");
  $homebackground_id.find(".cd-timeline-block").each(function() {
    $(this)
      .find(".cd-timeline-img, .cd-timeline-content")
      .removeClass("is-hidden")
      .addClass("bounce-in");
  });
};
var scroll_animate = function(anchorLink) {
  var $demo = $('[data-anchor="' + anchorLink + '"]');
  $(".decoration").css("width", 0);
  $demo
    .find(".contenttitle")
    .removeClass("contenttitle")
    .addClass("cover-heading");
  $demo
    .find(".subtitle")
    .removeClass("subtitle")
    .addClass("fadeInDown");
  if ($demo.attr("data-anchor") == "demo1") {
    $demo
      .find(".decoration")
      .css("width", $demo.find(".cover-heading").width());
  } else {
    $demo.find(".decoration").css("width", $demo.find(".fadeInDown").width());
  }
  $demo
    .find(".subt")
    .removeClass("subt")
    .addClass("swing");
  if ($demo.find(".li_icon").css("visibility") != "visible") {
    $demo
      .find(".li_icon")
      .css("visibility", "visible")
      .addClass("fadeInDown");
  }
  setTimeout(function() {
    $demo.find(".li_icon").removeClass("fadeInDown");
    $demo
      .find(".icon_detail")
      .css("visibility", "visible")
      .addClass("fadeIn");
  }, 300);
  var $intro_p = $demo.find(".intro p");
  $demo
    .find(".intro")
    .removeClass("hidden")
    .animate({ width: "100%" }, 500, "easeOutElastic", function() {
      $intro_p.eq(0).length && recursion($intro_p, 0);
    });
  $demo.find("#cd-timeline").addClass("before");
  $demo.find(".cd-timeline-block").each(function() {
    $(this)
      .find(".cd-timeline-img, .cd-timeline-content")
      .removeClass("is-hidden")
      .addClass("bounceIn");
  });
  anchorLink === "demo3" && resize($demo);
};

function recursion($intro_p, i) {
  $intro_p.eq(i).animate({ bottom: "0" }, 500, "linear", function() {
    $intro_p.eq(i + 1).length && recursion($intro_p, i + 1);
  });
}
var resize = function(element) {
  if (document.body.offsetWidth < 768) {
    element.find(".pro-module").each(function(i, e) {
      var img_src = $(this)
        .children("img")
        .attr("src");
      /*      if (img_src.indexOf("m_") === -1) {
              img_src = img_src.substring(0, img_src.indexOf("/") + 1) + "m_" + img_src.substring(img_src.indexOf("/") + 1)
              $(this).children("img").attr("src", img_src)
            }*/
      //$(this).removeClass("top").removeClass("bottom").removeClass("left").removeClass("right")
      if (i % 2 == 0) {
        $(this)
          .removeClass("slideU")
          .addClass("slideInLeft");
      } else {
        $(this)
          .removeClass("slideD")
          .addClass("slideInRight");
      }
      // $(this).children(".background-shadow").css("width", $(this).children("img").width())
      // $(this).children(".background-shadow").css("height", $(this).children("img").height())
      $(this)
        .children(".background-shadow")
        .children("a")
        .css(
          "height",
          $(this)
            .children("img")
            .height()
        );
      $(this)
        .children(".background-shadow")
        .children("a")
        .css(
          "width",
          $(this)
            .children("img")
            .width()
        );
      $(this)
        .children(".background-shadow")
        .children("a")
        .text("");
    });
  } else {
    element.find(".pro-module").each(function(i, e) {
      var img_src = $(this)
        .children("img")
        .attr("src");
      /*    if (img_src.indexOf("m_") > -1) {
            img_src = img_src.substring(0, img_src.indexOf("m_")) + img_src.substring(img_src.indexOf("m_") + 2)
            $(this).children("img").attr("src", img_src)
          }*/
      //$(this).removeClass("top").removeClass("bottom").removeClass("left").removeClass("right")
      if (i <= 2) {
        $(this)
          .removeClass("slideD")
          .addClass("slideInDown");
      } else {
        $(this)
          .removeClass("slideU")
          .addClass("slideInUp");
      }
      /*$(this).children(".background-shadow").css("width", 340)
      $(this).children(".background-shadow").css("height", 190)*/
      $(this)
        .children(".background-shadow")
        .children("a")
        .css("height", "initial");
      $(this)
        .children(".background-shadow")
        .children("a")
        .css("width", "initial");
      $(this)
        .children(".background-shadow")
        .children("a")
        .text("Check It");
    });
  }
};

function defer(url, data) {
  var df = $.Deferred();
  $.ajax({
    type: "post",
    url: url,
    data: data,
    async: false,
    success: function(data, textStatus) {
      df.resolve(data);
    }
  });
  return df.promise();
}
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
var browser = {
  versions: (function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1, //IE内核
      presto: u.indexOf("Presto") > -1, //opera内核
      webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
      iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1, //是否iPad
      webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function openWind() {
  $.when(defer("php/visitdom.php"))
    .done(function(data) {
      // window.open(href_win, name)
      console.log(data);
    })
    .then(function(e) {
      console.log(e);
    });
}
