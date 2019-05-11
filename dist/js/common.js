//COMMON
let urls = 'http://localhost:8080';

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var obj = JSON.parse($.cookie('token'));
console.log(obj)
$("#portrait1").attr("src", "http://148.70.8.85/" + obj.avatar)
$("#username1").text(obj.username)
$("#portrait2").attr("src", "http://148.70.8.85/" + obj.avatar)
$("#username2").text(obj.username)
$("#username3").text(obj.username)
$("#portrait3").attr("src", "http://148.70.8.85/" + obj.avatar)

$("#lastLoginTime").text(new Date(obj.loginTime).Format("yyyy-MM-dd HH:mm:ss"))

console.log(obj)
setItems();
function setItems() {
    $.ajax({
        url: urls + '/userAccount/get/item',
        type: 'get',
        dataType: 'json',
        success(res) {
            res = res.body.data;
            var html = "";
            var count=0;
            if (res.problemCount !== 0) {
                html = html + " <li><!-- start notification -->\n" +
                    "<a href=\"problem.html\">\n" +
                    "<i class=\"fa fa-users text-aqua\"></i>有" + res.problemCount + "个用户提的问题待解答 \n" +
                    "</a>\n" +
                    "</li>";
                count++;
            }
            if (res.autoCount !== 0) {
                html = html + " <li><!-- start notification -->\n" +
                    "<a href=\"auto.html\">\n" +
                    "<i class=\"fa fa-users text-aqua\"></i>有" + res.autoCount + "个用户的自动问答未解答 \n" +
                    "</a>\n" +
                    "</li>";
                count++;

            }
            if (res.inspectCount !== 0) {
                html = html + " <li><!-- start notification -->\n" +
                    "<a href=\"inspection.html\">\n" +
                    "<i class=\"fa fa-users text-aqua\"></i>有" + res.inspectCount + "个巡检结果未确认 \n" +
                    "</a>\n" +
                    "</li>";
                count++;

            }
            if (res.reportCount !== 0) {
                html = html + " <li><!-- start notification -->\n" +
                    "<a href=\"report.html\">\n" +
                    "<i class=\"fa fa-users text-aqua\"></i>有" + res.reportCount + "个举报情况未处理 \n" +
                    "</a>\n" +
                    "</li>";
                count++;

            }
            $("#menu").html(html);
            $("#number").text(count);
            $("#header").text("你有"+count+"件事情待办")
            /*
                                                <li><!-- start notification -->
                            <a href="#">
                                <i class="fa fa-users text-aqua"></i> 5 new members joined today
                            </a>
                        </li>
             */
        }
    })
}

$(".logout").click(
    function () {
        $.cookie("token", "null");
    }
)
