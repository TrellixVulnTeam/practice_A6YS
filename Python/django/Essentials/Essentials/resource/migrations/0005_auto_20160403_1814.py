# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-04-04 01:14
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('resource', '0004_auto_20160402_1832'),
    ]

    operations = [
        migrations.RenameField(
            model_name='model',
            old_name='make',
            new_name='make_name',
        ),
    ]