function date_deal(dataStr,dayCount) {
    var isdate = new Date(strdate.replace(/-/g,"/"));  //�������ַ���ת�������ڸ�ʽ
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);  //���ڼ�1��
    var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());   //�����ڸ�ʽת�����ַ���
    alert(pdate);
    return pdate;

}

date_deal('2018-1-1', 1);