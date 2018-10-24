from django.contrib import admin

# Register your models here.
from first_app.models import *

admin.site.register(Course)
admin.site.register(Subject)
admin.site.register(Teacher)
admin.site.register(CourseIdSubjectId)
admin.site.register(SubjectIdTeacherId)
