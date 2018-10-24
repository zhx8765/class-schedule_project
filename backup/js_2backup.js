// 显示课程列表
function display_course(data) {
    $('#course').empty();
    var html = '';
    $.each(data, function (index, course) {
        html += '<td class="display_subject" width="200px" bgcolor="#f4a460" style="text-align:center;border-radius:10px;height: 30px;"><a style="text-decoration:none;" href="" id=' + course.id + '>' + course.course +'</a></td>';
    });
    $('#course').html(html)
}


// 显示课程表
function display_table(data_li){
    var html = '<tr><th>科目</th><th>课时</th></tr>';
    $.each(data_li.subject_li, function (index, subject) {
        html += '<tr><td>' + subject.subject + '</td><td>' + subject.lesson_time + '</td></tr>';
    });
    $('#display_table').html(html);
}

function display_teacher(teacher_li) {
    var html = '<tr><th>姓名</th><th>年龄</th><th>性别</th><th>所讲科目</th><th>优先级</th></tr>';
    $.each(teacher_li, function (index, teacher) {
        html += '<tr><th>'+ teacher.teacher_name +'</th><th>'+ teacher.age +'</th><th>'+ teacher.sex +'</th><th>'+ teacher.teach_subject +'</th><th>'+ teacher.priority +'</th></tr>';
    });
    $('#teacher_msg').html(html)
}


//注册点击事件
function event_click_display_table() {
    $('.display_subject').children('a').click(function () {
        var url = 'get_table/?course=' + $(this).attr('id');
        get_table(url);
        return false;
    });
}

// 注册开始排课按钮点击事件
function event_click_arrange(data) {
    $('#submit').click(function () {
        var begin_time = $('#input_date').val();

        arrange(data, begin_time);
        return false
    });

}

//设置开课日期
function date_setting(data) {
    var html_date = '<p>输入开课日期</p><input type="date" id="input_date">';
    html_date += '<input type="submit" value="排课" id="submit">';
    $('#date_setting').html(html_date);
    event_click_arrange(data)
}


// 日期加一函数
function date_deal(dataStr,dayCount) {

    var isdate = new Date(dataStr.replace(/-/g,"/"));  //把日期字符串转换成日期格式
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
    var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());   //把日期格式转换成字符串
    // alert(pdate);
    return pdate;
}

//注册提交按钮的点击事件
function click_insert_submit(data_item, begin_time, id) {
    $('#insert_submit').click(function () {
        var subject = $('#insert_subject').val();
        var teacher = $('#insert_teacher').val();
        alert(subject);
        alert(teacher);
        alert(id);
        // alert(data_item);
        // alert(begin_time);
        $.ajax({
        url:'add_my_table_msg/?subject='+ subject +'&teacher='+ teacher + '&td_id=' + toString(id),
        type: "GET",
        data: null,
        success: function (data) {
            alert(data)

        }
    });
        if (data_item.my_time_table_li){
            $.each(data_item.my_time_table_li, function (index, my_time_table_msg) {
                id = my_time_table_msg.td_id;
                arrange(data_item, begin_time, id, subject, teacher);
                alert(id);
                return false;

            })
        }
        else{
            arrange(data_item, begin_time, id, subject, teacher);
            return false;

        }
    })
}

var insert_subject_json = [];

//注册单元格点击事件
function click_every_td(data_item, begin_time) {
    $('td').click(function () {
        var id = $(this).attr('id');
        // $('#arrange').empty();
        var html = '科目：<input type="text" value="" id="insert_subject">';
        html += '老师：<input type="text" value="" id="insert_teacher">';
        html += '提交：<input type="button" value="插入" id="insert_submit">';
        $('#arrange').html(html);

        click_insert_submit(data_item, begin_time, id);
    })
}

//排课
function arrange(data_item, begin_time, id, subject, teacher) {
    var html = '<table border="1px"><tr>';
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var i = 1;
    var sum_days = 0;
    $.each(data_item.item_li, function (index, item) {
        html += '<tr><td style="border: none;">' + item.subject + '</td></tr>';
        for(i; i<=sum_days + item.lesson_time/6; i++){
            var time = date_deal(begin_time, i-1);
            var week = weekDay[new Date(time).getDay()];
            if ((week==='星期天'||week==='星期六')&&(i%15!==0)){
                if(id&&(id==i)){
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px">'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px"><h4>休息</h4>' + time + week + '</td>';
                    sum_days+=1;
                }
            }


            else if ((week==='星期天'||week==='星期六')&&(i%15===0)){

                if(id&&(id==i)){
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px">'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px"><h4>休息</h4>' + time + week + '</td><tr></tr>';
                    sum_days+=1;
                }
            }


            // 换行
            else if ((week!=='星期天'||week!=='星期六')&&(i%15===0)){
                if(id&&(id==i)){
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px">'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px;"type="">' + item.subject + '-' + item.teacher + '-' + time + week + '</td><tr></tr>'
                }
            }


            else {
                if(id&&(id==i)){
                    html += '<td bgcolor="red" onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px"><h4></h4>'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px">' + item.subject + '-' + item.teacher + '-' + time + week + '</td>'
                }
            }

            // 不换行
            // html += '<td style="width: 20px;font-size: 10px">' + item.subject + '-' + item.teacher + '-' + time + week + '</td>'
        }
        sum_days += item.lesson_time/6;
        i = sum_days+1;
    });
    html += '</tr></table>';
    $('#arrange').html(html);
    click_every_td(data_item, begin_time)
}


// 获取课程表数据
function get_table(url) {
    $.ajax({
        url:url,
        type: "GET",
        data: null,
        success: function (data) {
            display_table(data);
            display_teacher(data.teacher_li);
            date_setting(data)
        }
    });
}


//调用ajax调取课程表中的课程数据，并调用显示课程的函数及注册点击课程事件
function get_course(url) {
    $.ajax({
        url:url,
        type: "GET",
        data: null,
        success: function (data) {
            display_course(data.course_li);

            event_click_display_table();
        }
    });
}