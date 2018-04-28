from django.contrib import admin
from .models import Article, Category, Tag, Advertisement, Friends, SiteBasicData


# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_time', 'modified_time', 'category', 'author')


class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ('company', 'title', 'target_url')


class FrendsAdmin(admin.ModelAdmin):
    list_display = ['title', 'url', 'desc', 'used']


admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Advertisement, AdvertisementAdmin)
admin.site.register(Friends, FrendsAdmin)
admin.site.register(SiteBasicData)
