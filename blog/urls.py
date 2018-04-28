from django.urls import path, include
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('article/<int:pk>/', views.ArticleDetailView.as_view(), name='detail'),
    path('category/<int:pk>/', views.CategoryView.as_view(), name='category'),
    path('tag/<int:pk>/', views.TagView.as_view(), name='tag'),
    path('tags/', views.TagsView.as_view(), name='tags'),
    path('archive/', views.ArchiveView.as_view(), name='archive'),
    path('archives/<int:year>/<int:month>/', views.ArchivesView.as_view(), name='archives'),
    path('explain/', views.getExplain, name='explain'),
    path('msgboard/', views.getMsgBoard, name='msgboard'),

]
