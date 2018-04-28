from django.db import models
from django.utils.six import python_2_unicode_compatible
from simditor.fields import RichTextField

from mptt import models as mpttModels
from mptt.models import MPTTModel

from users.models import User


# python_2_unicode_compatible 装饰器用于兼容 Python2
@python_2_unicode_compatible
class Comment(MPTTModel):
    name = models.CharField(max_length=100)

    text = RichTextField()

    # 上一个人名称
    previous = models.CharField(blank=True, null=True, max_length=100)

    # 头像地址
    avatar_url = models.CharField(max_length=4000, blank=True, default="")

    # parent为该评论的父评论，所以第一个参数为'self',当为空时表示为第一层级的评论
    # 指定related_name='children'，这样可以父评论通过comment.children获取子评论，默认是通过comment.comment_set获取
    # parent = models.ForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.SET_NULL)

    parent = mpttModels.TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True,
                                       on_delete=models.SET_NULL)

    created_time = models.DateTimeField(auto_now_add=True)
    # parent =
    post = models.ForeignKey('blog.Article', on_delete=models.CASCADE)

    # 访问者ip地址
    ip = models.CharField(max_length=100, blank=True)

    # 访问者所在城市
    city = models.CharField(max_length=100, blank=True)

    email = models.EmailField(max_length=255, blank=True)
    url = models.URLField(blank=True)

    visible = models.BooleanField(default=True)

    def __str__(self):
        return self.text[:20]

    class MPTTMeta:
        order_insertion_by = ['-created_time']
