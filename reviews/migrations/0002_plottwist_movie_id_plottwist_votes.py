# Generated by Django 5.0.6 on 2024-05-30 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='plottwist',
            name='movie_id',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='plottwist',
            name='votes',
            field=models.IntegerField(default=0),
        ),
    ]
