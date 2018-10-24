#!/usr/bin/env python
# -*- coding: utf-8 -*-
from itertools import chain

from django.http import JsonResponse
from django.shortcuts import render


# Create your views here.
from first_app.models import *


def index(request):
    return render(request, 'first_app/index.html')


def get_course(request):
    course_data = get_course_by_course_id()
    return JsonResponse(course_data)


def get_table(request):
    args = request.GET
    course = args.get('course', '')
    if course != '':
        course_subject_query_set, subject_teacher_query_set, item_li = get_table_by_course(course)
        # 合并teacher_subject queryset对象
        subject_teacher_query_set = chain(*subject_teacher_query_set)
        if course_subject_query_set:
            subject_li = [{'subject': course_subject.subject.subject, 'lesson_time': course_subject.lesson_time, 'course': course_subject.course.course} for course_subject in course_subject_query_set]
            # 获取teacher对象列表
            teacher_li = [{'teacher_name': subject_teacher.teacher.name, 'age': subject_teacher.teacher.age, 'sex': subject_teacher.teacher.sex, 'teach_subject': subject_teacher.subject.subject, 'priority': subject_teacher.priority} for subject_teacher in subject_teacher_query_set]
            my_time_table_msg = MyTimeTable.objects.all().order_by()
            my_time_table_li = [model_to_dict(msg) for msg in my_time_table_msg]
            data_li = {
                'subject_li': subject_li,
                'teacher_li': teacher_li,
                'item_li': item_li,
                'my_time_table_li': my_time_table_li,
            }
            return JsonResponse(data_li, safe=False)
        else:
            return JsonResponse({})
    else:
        return JsonResponse({})
    

def add_my_table_msg(request):
    args = request.GET
    subject_name = args.get('subject_name')
    teacher_name = args.get('teacher_name')
    td_id = args.get('td_id')
    MyTimeTable.objects.create(subject_name=subject_name, teacher_name=teacher_name, td_id=td_id)
    return JsonResponse({'msg': 200})