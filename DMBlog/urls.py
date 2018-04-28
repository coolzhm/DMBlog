"""DMBlog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls import url
from . import views
from DMBlog import settings
from blog.feeds import AllPostsRssFeed
from django.http import HttpResponse

from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from django.urls import path
from blog.models import Article, Tag, Category

article_dict = {
    'queryset': Article.objects.all(),
    'date_field': 'created_time',
}

sitemaps = {
    'blog': GenericSitemap(article_dict, priority=0.6, changefreq='weekly'),
}

urlpatterns = [
                  #path('', views.index),
                  path('admin/', admin.site.urls),
                  #path('blog/', include('blog.urls')),
		  path('', include('blog.urls')),
                  path('simditor/', include('simditor.urls')),
                  # path('users/', include('users.urls')),
                  # 将 auth 应用中的 urls 模块包含进来
                  url(r'^MP_verify_bESNDTC1qLBzs5XP\.txt$',
                      lambda r: HttpResponse('bESNDTC1qLBzs5XP', content_type='text/plain')),
				  url(r'^bdunion\.txt$',
                      lambda r: HttpResponse('1fa5cbb925a2f5c901f0cd520c64d164', content_type='text/plain')),
                  #url(r'^robots\.txt$',
                  #    lambda r: HttpResponse('User-agent: *\nDisallow: /admin', content_type='text/plain')),
                  # path('users/', include('django.contrib.auth.urls')),
                  path('accounts/', include('allauth.urls')),
                  path('', include('comments.urls')),
                  url(r'^search/', include('haystack.urls')),
                  url(r'^rss/', AllPostsRssFeed(), name='rss'),
                  # the sitemap
                  path('sitemap.xml', sitemap,
                       {'sitemaps': sitemaps},
                       name='django.contrib.sitemaps.views.sitemap'),
              ] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
