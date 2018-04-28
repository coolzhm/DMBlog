from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    # 昵称
    # 设置 blank=True 的目的是让用户在注册时无需填写昵称
    nickname = models.CharField(max_length=50, blank=True, default="")

    # 一定要继承AbstractUser，而不是继承auth.User。尽管auth.User继承自
    # AbstractUser且并没有对其进行任何额外拓展，但AbstractUser是一个抽象类，而
    # auth.User不是。如果你继承了auth.User类，这会变成多表继承，在目前的情况下这种继承方式是不被推荐的。
    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
