# coding = 'utf-8'
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


# 科目
from django.forms import model_to_dict
from django.http import JsonResponse


class Subject(models.Model):
    subject = models.CharField(max_length=50)
    
    class Meta:
        managed = True
        db_table = 'subject'
        verbose_name_plural = verbose_name = '科目'

    def __str__(self):
        return self.subject


# 课程
class Course(models.Model):
    course = models.CharField(max_length=50)
    
    class Meta:
        managed = True
        db_table = 'course'
        verbose_name_plural = verbose_name = '课程'
    
    def __str__(self):
        return self.course


# 课程科目中间表
class CourseIdSubjectId(models.Model):
    course = models.ForeignKey(Course, models.CASCADE, blank=True, null=True)
    subject = models.ForeignKey(Subject, models.CASCADE, blank=True, null=True)
    lesson_time = models.IntegerField(default=60, verbose_name='课时')
    
    class Meta:
        managed = True
        db_table = 'course_id_subject_id'
        verbose_name_plural = verbose_name = '课程科目设置'
    
    def __str__(self):
        return f'{self.course}:{self.subject}'


# 科目老师中间表
class SubjectIdTeacherId(models.Model):
    PRIORITY = (
        (1, '优先级一'),
        (2, '优先级二'),
        (3, '优先级三'),
        (4, '优先级四'),
        (5, '优先级五'),
        (6, '优先级六'),
        (7, '优先级七'),
        (8, '优先级八'),
        (9, '优先级九'),
        (10, '优先级十')
        
    )
    subject = models.ForeignKey(Subject, models.CASCADE)
    teacher = models.ForeignKey('Teacher', models.CASCADE, blank=True, null=True)
    priority = models.IntegerField(default=1, choices=PRIORITY)

    class Meta:
        managed = True
        db_table = 'subject_id_teacher_id'
        verbose_name_plural = verbose_name = '科目老师设置'

    def __str__(self):
        return f'{self.teacher}:{self.subject}'


# 老师
class Teacher(models.Model):
    SEX_CHOICES = (
        (0, '男'),
        (1, '女')
    )
    name = models.CharField(max_length=50)
    sex = models.IntegerField(blank=True, null=True, choices=SEX_CHOICES, default=1)  # This field type is a guess.
    age = models.IntegerField(blank=True, null=True, default=30)

    class Meta:
        managed = True
        db_table = 'teacher'
        verbose_name_plural = verbose_name = '教师'
        
    def __str__(self):
        return str(self.name)


class MyTimeTable(models.Model):
    subject_name = models.CharField(max_length=30)
    teacher_name = models.CharField(max_length=30)
    td_id = models.IntegerField()


def get_course_by_course_id():
    course_length = Course.objects.count()
    course_li_query_set = Course.objects.all()
    course_li = [model_to_dict(course) for course in course_li_query_set]
    course_data = {
        'course_length': course_length,
        'course_li': course_li
    }
    return course_data


def get_table_by_course(course_id):
    # 通过课程id获取科目列表及课程课时
    course_subject_query_set = CourseIdSubjectId.objects.filter(course_id=course_id)
    item_li =[]
    subject_teacher_query_set = [SubjectIdTeacherId.objects.filter(subject_id=subject.subject.id) for subject in
                                 course_subject_query_set]
    for i in course_subject_query_set:
        teacher_list = SubjectIdTeacherId.objects.filter(subject_id=i.subject_id)
        filtrate = {}
        for j in teacher_list:
            if f'{i.subject.subject}' in filtrate:
                if j.priority < filtrate.get(f'{i.subject.subject}'):
                    item_li.pop()
                    item_li.append({'course': course_subject_query_set[0].course.course, 'subject': i.subject.subject,
                                    'lesson_time': i.lesson_time, 'teacher': j.teacher.name, 'priority': j.priority})
            else:
                item_li.append({'course': course_subject_query_set[0].course.course, 'subject': i.subject.subject, 'lesson_time': i.lesson_time, 'teacher': j.teacher.name, 'priority': j.priority})
                filtrate[f'{i.subject.subject}'] = j.priority
    return course_subject_query_set, subject_teacher_query_set, item_li