# Generated by Django 2.0.5 on 2018-10-15 23:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('first_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='courseidsubjectid',
            name='lesson_time',
            field=models.IntegerField(default=60, verbose_name='课时'),
        ),
        migrations.AddField(
            model_name='subjectidteacherid',
            name='priority',
            field=models.IntegerField(choices=[(1, '优先级一'), (2, '优先级二'), (3, '优先级三'), (4, '优先级四'), (5, '优先级五'), (6, '优先级六'), (7, '优先级七'), (8, '优先级八'), (9, '优先级九'), (10, '优先级十')], default=1),
        ),
        migrations.AlterField(
            model_name='courseidsubjectid',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='first_app.Course'),
        ),
        migrations.AlterField(
            model_name='courseidsubjectid',
            name='subject',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='first_app.Subject'),
        ),
        migrations.AlterField(
            model_name='subjectidteacherid',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='first_app.Subject'),
        ),
        migrations.AlterField(
            model_name='subjectidteacherid',
            name='teacher',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='first_app.Teacher'),
        ),
    ]
