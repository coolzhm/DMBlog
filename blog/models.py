import markdown
import datetime
from django.db import models
from django.utils.six import python_2_unicode_compatible
# from django.contrib.auth.models import User
from django.conf import settings
from django.urls import reverse
from django.utils.html import strip_tags
from simditor.fields import RichTextField
from easy_thumbnails.fields import ThumbnailerImageField
from time import timezone

# Create your models here.

# python_2_unicode_compatible 装饰器用于兼容 Python2
@python_2_unicode_compatible
class Category(models.Model):
    """
    Django 要求模型必须继承 models.Model 类。
    Category 只需要一个简单的分类名 name 就可以了。
    CharField 指定了分类名 name 的数据类型，CharField 是字符型，
    CharField 的 max_length 参数指定其最大长度，超过这个长度的分类名就不能被存入数据库。
    当然 Django 还为我们提供了多种其它的数据类型，如日期时间类型 DateTimeField、整数类型 IntegerField 等等。
    Django 内置的全部类型可查看文档：
    http://python.usyiyi.cn/documents/django_182/ref/models/fields.html
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class Tag(models.Model):
    """
    标签 Tag 也比较简单，和 Category 一样。
    再次强调一定要继承 models.Model 类！
    """
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class Article(models.Model):
    # 网站文章类型，主要用于内部区别公告、留言板、说明等信息
    GONGGAO = 'GG'
    LIUYANBAN = 'LYB'
    SHUOMING = 'SM'
    WENZHANG = 'WZ'
    TYPE_CHOICES = (
        (GONGGAO, '公告'),
        (LIUYANBAN, '留言板'),
        (SHUOMING, '说明'),
        (WENZHANG, '文章')
    )
    type = models.CharField(max_length=5, choices=TYPE_CHOICES, default=WENZHANG)

    """
    文章的数据库表稍微复杂一点，主要是涉及的字段更多。
    """
    # 列表中显示的图片
    # pic = models.ImageField('图片', upload_to='uploadImages/%Y/%m/%d', default='')
    # 列表中显示图片，并将图片转化为缩略图
    pic = ThumbnailerImageField(upload_to='uploadImages/%Y/%m/%d', blank=True)

    # 文章标题
    title = models.CharField(max_length=70)

    # 文章正文，我们使用了 TextField。
    # 存储比较短的字符串可以使用 CharField，但对于文章的正文来说可能会是一大段文本，因此使用 TextField 来存储大段文本。
    # body = models.TextField()
    # 使用 RichTextField()
    body = RichTextField()

    # 这两个列分别表示文章的创建时间和最后一次修改时间，存储时间的字段用 DateTimeField 类型。
    created_time = models.DateTimeField(auto_now_add=True)
    # modified_time = models.DateTimeField('最后修改时间', default=datetime.datetime.now())
    modified_time = models.DateTimeField(auto_now=True)
    # 文章摘要，可以没有文章摘要，但默认情况下 CharField 要求我们必须存入数据，否则就会报错。
    # 指定 CharField 的 blank=True 参数值后就可以允许空值了。
    excerpt = models.CharField(max_length=200, blank=True)

    # 新增 views 字段记录阅读量
    views = models.PositiveIntegerField(default=0)

    # 这是分类与标签，分类与标签的模型我们已经定义在上面。
    # 我们在这里把文章对应的数据库表和分类、标签对应的数据库表关联了起来，但是关联形式稍微有点不同。
    # 我们规定一篇文章只能对应一个分类，但是一个分类下可以有多篇文章，所以我们使用的是 ForeignKey，即一对多的关联关系。
    # 而对于标签来说，一篇文章可以有多个标签，同一个标签下也可能有多篇文章，所以我们使用 ManyToManyField，表明这是多对多的关联关系。
    # 同时我们规定文章可以没有标签，因此为标签 tags 指定了 blank=True。
    # 如果你对 ForeignKey、ManyToManyField 不了解，请看教程中的解释，亦可参考官方文档：
    # https://docs.djangoproject.com/en/1.10/topics/db/models/#relationships
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    # 文章的标签列表
    # ManyToManyField是多对多的关系，在前端页面显示的时候可以用all（）来查询，
    # 例如{% for tag in post.tags.all %}即可获取所有的标签
    #
    tags = models.ManyToManyField(Tag, blank=True)

    # 文章作者，这里 User 是从 django.contrib.auth.models 导入的。
    # django.contrib.auth 是 Django 内置的应用，专门用于处理网站用户的注册、登录等流程，User 是 Django 为我们已经写好的用户模型。
    # 这里我们通过 ForeignKey 把文章和 User 关联了起来。
    # 因为我们规定一篇文章只能有一个作者，而一个作者可能会写多篇文章，因此这是一对多的关联关系，和 Category 类似。
    # author = models.ForeignKey(User, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

        # 自定义 get_absolute_url 方法
        # 记得从 django.urls 中导入 reverse 函数

    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'pk': self.pk})

    class Meta:
        ordering = ['-created_time']

    def increase_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    def save(self, *args, **kwargs):
        # 如果没有填写摘要
        if not self.excerpt:
            # 首先实例化一个 Markdown 类，用于渲染 body 的文本
            md = markdown.Markdown(extensions=[
                'markdown.extensions.extra',
                'markdown.extensions.codehilite',
            ])
            # 先将 Markdown 文本渲染成 HTML 文本
            # strip_tags 去掉 HTML 文本的全部 HTML 标签
            # 从文本摘取前 80 个字符赋给 excerpt
            self.excerpt = strip_tags(md.convert(self.body))[:80]

        self.modified_time = datetime.datetime.now()
        # 调用父类的 save 方法将数据保存到数据库中
        super(Article, self).save(*args, **kwargs)


class Advertisement(models.Model):
    # 广告的图片或者gif
    pic = models.ImageField('图片', upload_to='uploadImages/ads/%Y/%m/%d', default='')

    # 目标连接地址
    target_url = models.CharField(max_length=200, default='#')

    # 广告标题
    title = models.CharField(max_length=70)

    # 广告商公司名称
    company = models.CharField(max_length=200)

    # 创建时间
    createdate = models.DateTimeField(auto_now_add=True)


class Friends(models.Model):
    """
    友链数据库表。
    """
    # 友链名称
    title = models.CharField(max_length=70)

    # 友链地址
    url = models.CharField(max_length=200)

    # 友链描述
    desc = models.CharField(max_length=500)

    # 友链启用状态 1为启用，否则为禁用
    used = models.IntegerField(default='1')

    # 创建时间
    created_time = models.DateTimeField(auto_now=True)


class SiteBasicData(models.Model):
    # 网站图标
    logo = models.ImageField(upload_to='basic', default='')

    # 座右铭
    motto = models.CharField(max_length=70, blank=True)

    # 微信号二维码
    wechartcode = models.ImageField(upload_to='basic', default='')

    # 微信打赏二维码
    wechart_reward = models.ImageField(upload_to='basic', default='')

    # 支付宝打赏二维码
    alipay_reward = models.ImageField(upload_to='basic', default='')

    # QQ号
    qq = models.CharField(max_length=15)

    # copyright 声明
    meta = models.CharField(max_length=200)

    # 公网安备号
    recordcode = models.CharField(max_length=20)

    # 备案
    beian = models.CharField(max_length=50, default='')

    # 创建时间
    update_time = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.update_time = datetime.datetime.now()
        # 调用父类的 save 方法将数据保存到数据库中
        super(SiteBasicData, self).save(*args, **kwargs)


class WxToken(models.Model):
    token = models.CharField(max_length=200)
    lifetime = models.DateTimeField(
        default=0
    )

    def get_date(self):
        delta = timezone.now() - self.lifetime
        if delta.seconds < 6000:
            return True
        else:
            return False


class JsToken(models.Model):
    token = models.CharField(max_length=200)
    lifetime = models.DateTimeField(
        default=0
    )

    def get_date(self):
        delta = timezone.now() - self.lifetime
        if delta.seconds < 6000:
            return True
        else:
            return False
