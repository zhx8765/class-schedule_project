# Generated by Django 2.0.5 on 2018-10-23 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('first_app', '0006_mytimetable'),
    ]

    operations = [
        migrations.AddField(
            model_name='mytimetable',
            name='td_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
