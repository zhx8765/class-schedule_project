// ��ʾ�γ��б�
function display_course(data) {
    $('#course').empty();
    var html = '';
    $.each(data, function (index, course) {
        html += '<td class="display_subject" width="200px" bgcolor="#f4a460" style="text-align:center;border-radius:10px;height: 30px;"><a style="text-decoration:none;" href="" id=' + course.id + '>' + course.course +'</a></td>';
    });
    $('#course').html(html)
}


// ��ʾ�γ̱�
function display_table(data_li){
    var html = '<tr><th>��Ŀ</th><th>��ʱ</th></tr>';
    $.each(data_li.subject_li, function (index, subject) {
        html += '<tr><td>' + subject.subject + '</td><td>' + subject.lesson_time + '</td></tr>';
    });
    $('#display_table').html(html);
}

function display_teacher(teacher_li) {
    var html = '<tr><th>����</th><th>����</th><th>�Ա�</th><th>������Ŀ</th><th>���ȼ�</th></tr>';
    $.each(teacher_li, function (index, teacher) {
        html += '<tr><th>'+ teacher.teacher_name +'</th><th>'+ teacher.age +'</th><th>'+ teacher.sex +'</th><th>'+ teacher.teach_subject +'</th><th>'+ teacher.priority +'</th></tr>';
    });
    $('#teacher_msg').html(html)
}


//ע�����¼�
function event_click_display_table() {
    $('.display_subject').children('a').click(function () {
        var url = 'get_table/?course=' + $(this).attr('id');
        get_table(url);
        return false;
    });
}

// ע�Ὺʼ�ſΰ�ť����¼�
function event_click_arrange(data) {
    $('#submit').click(function () {
        var begin_time = $('#input_date').val();

        arrange(data, begin_time);
        return false
    });

}

//���ÿ�������
function date_setting(data) {
    var html_date = '<p>���뿪������</p><input type="date" id="input_date">';
    html_date += '<input type="submit" value="�ſ�" id="submit">';
    $('#date_setting').html(html_date);
    event_click_arrange(data)
}


// ���ڼ�һ����
function date_deal(dataStr,dayCount) {

    var isdate = new Date(dataStr.replace(/-/g,"/"));  //�������ַ���ת�������ڸ�ʽ
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //���ڼ�1��
    var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());   //�����ڸ�ʽת�����ַ���
    // alert(pdate);
    return pdate;
}

//ע���ύ��ť�ĵ���¼�
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

//ע�ᵥԪ�����¼�
function click_every_td(data_item, begin_time) {
    $('td').click(function () {
        var id = $(this).attr('id');
        // $('#arrange').empty();
        var html = '��Ŀ��<input type="text" value="" id="insert_subject">';
        html += '��ʦ��<input type="text" value="" id="insert_teacher">';
        html += '�ύ��<input type="button" value="����" id="insert_submit">';
        $('#arrange').html(html);

        click_insert_submit(data_item, begin_time, id);
    })
}

//�ſ�
function arrange(data_item, begin_time, id, subject, teacher) {
    var html = '<table border="1px"><tr>';
    var weekDay = ["������", "����һ", "���ڶ�", "������", "������", "������", "������"];
    var i = 1;
    var sum_days = 0;
    $.each(data_item.item_li, function (index, item) {
        html += '<tr><td style="border: none;">' + item.subject + '</td></tr>';
        for(i; i<=sum_days + item.lesson_time/6; i++){
            var time = date_deal(begin_time, i-1);
            var week = weekDay[new Date(time).getDay()];
            if ((week==='������'||week==='������')&&(i%15!==0)){
                if(id&&(id==i)){
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px">'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px"><h4>��Ϣ</h4>' + time + week + '</td>';
                    sum_days+=1;
                }
            }


            else if ((week==='������'||week==='������')&&(i%15===0)){

                if(id&&(id==i)){
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'#FF0000\'" id='+ i +' style="width: 20px;font-size: 10px">'+ subject + teacher + time + week + '</td>';
                    sum_days+=1;
                }
                else{
                    html += '<td onMouseOver="this.bgColor=\'#FF8000\'" onMouseOut="this.bgColor=\'\'" id='+ i +' style="width: 20px;font-size: 10px"><h4>��Ϣ</h4>' + time + week + '</td><tr></tr>';
                    sum_days+=1;
                }
            }


            // ����
            else if ((week!=='������'||week!=='������')&&(i%15===0)){
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

            // ������
            // html += '<td style="width: 20px;font-size: 10px">' + item.subject + '-' + item.teacher + '-' + time + week + '</td>'
        }
        sum_days += item.lesson_time/6;
        i = sum_days+1;
    });
    html += '</tr></table>';
    $('#arrange').html(html);
    click_every_td(data_item, begin_time)
}


// ��ȡ�γ̱�����
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


//����ajax��ȡ�γ̱��еĿγ����ݣ���������ʾ�γ̵ĺ�����ע�����γ��¼�
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