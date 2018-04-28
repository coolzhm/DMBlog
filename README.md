# DMBlog
DM博客源代码，欢迎下载（DM博客地址:www.dmcool.top）<br>

<br>
#安装过程
##1、安装依赖
项目文件夹下有一个requirements.txt文档，用一下指令进行安装<br>
pip install -r requirements.txt<br>

##2、运行一下指令
python3 manage.py makemigrations<br>
python3 manage.py migrate<br>
python3 manage.py runserver<br>
<br>
##3、安装过程出现的问题
安装之前确保每个app（blog、comments、users）中的migrations文件夹中只有__init__.py文件，其他多余的要删除，不然运行python3 manage.py makemigrations和python3 manage.py migrate会报错
------------------------------------------------------<br>
<br>
#二、功能说明
####1、微博、github第三方认证登陆<br>
####2、文章第三方分享<br>
####3、优化首页加载速度，主要针对图片大小优化<br>
####4、highlight使文章中嵌入的代码高亮<br>
####5、站长统计<br>
####6、sitemap地图<br>
####7、博客内容搜索<br>
其他内容可以查看DM博客主页（www.dmcool.top）了解或者下载代码跑起来玩玩
#三、页面展示
![image](https://raw.githubusercontent.com/coolzhm/DMBlog/master/Image/dmblog_homepage.png)





