# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-03 06:19
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_auto_20151231_2018'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('order', models.IntegerField(default=0)),
                ('total_questions', models.IntegerField(default=4)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.Course')),
            ],
            options={
                'ordering': ['order'],
                'abstract': False,
            },
        ),
    ]