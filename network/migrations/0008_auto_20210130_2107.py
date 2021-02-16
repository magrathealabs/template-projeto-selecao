# Generated by Django 3.1.5 on 2021-01-31 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0007_tag_repos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tag',
            name='repos',
        ),
        migrations.AddField(
            model_name='tag',
            name='repo',
            field=models.ManyToManyField(related_name='tags', to='network.Repo'),
        ),
    ]
