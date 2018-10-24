#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.urls import path

from first_app import views

__author__ = 'Zqf'


app_name = 'first_app'


urlpatterns = [
    path('', views.index, name='index'),
    path('get_course/', views.get_course, name='get_course'),
    path('get_table/', views.get_table, name='get_table'),
    path('add_my_table_msg/', views.add_my_table_msg, name='add_my_table_msg')
]