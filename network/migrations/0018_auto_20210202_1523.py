# Generated by Django 3.1.5 on 2021-02-02 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0017_auto_20210202_1451'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='repo',
            name='git_id',
        ),
        migrations.AlterField(
            model_name='repo',
            name='id',
            field=models.CharField(max_length=250, primary_key=True, serialize=False),
        ),
    ]
