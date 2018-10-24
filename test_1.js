function date_deal(dataStr,dayCount) {
    var isdate = new Date(strdate.replace(/-/g,"/"));  //把日期字符串转换成日期格式
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //日期加1天
    var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());   //把日期格式转换成字符串
    alert(pdate);
    return pdate;

}

date_deal('2018-1-1', 1);