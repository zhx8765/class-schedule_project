# Generated by Django 2.0.5 on 2018-10-15 22:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': '课程',
                'verbose_name_plural': '课程',
                'db_table': 'course',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='CourseIdSubjectId',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='first_app.Course')),
            ],
            options={
                'verbose_name': '课程科目设置',
                'verbose_name_plural': '课程科目设置',
                'db_table': 'course_id_subject_id',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': '科目',
                'verbose_name_plural': '科目',
                'db_table': 'subject',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SubjectIdTeacherId',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='first_app.Subject')),
            ],
            options={
                'verbose_name': '科目老师设置',
                'verbose_name_plural': '科目老师设置',
                'db_table': 'subject_id_teacher_id',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('sex', models.IntegerField(blank=True, choices=[(0, '男'), (1, '女')], default=1, null=True)),
                ('age', models.IntegerField(blank=True, default=30, null=True)),
            ],
            options={
                'verbose_name': '教师',
                'verbose_name_plural': '教师',
                'db_table': 'teacher',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='subjectidteacherid',
            name='teacher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='first_app.Teacher'),
        ),
        migrations.AddField(
            model_name='courseidsubjectid',
            name='subject',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='first_app.Subject'),
        ),
    ]
