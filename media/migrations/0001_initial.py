# Generated by Django 3.0.3 on 2020-02-08 14:21

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('published_date', models.DateTimeField(default=datetime.datetime(2020, 2, 8, 14, 21, 21, 511292, tzinfo=utc))),
                ('image', models.ImageField(upload_to='photos/')),
            ],
            options={
                'ordering': ('-published_date',),
                'abstract': False,
            },
        ),
    ]