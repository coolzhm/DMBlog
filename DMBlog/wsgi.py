"""
WSGI config for DMBlog project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""
"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DMBlog.settings")

application = get_wsgi_application()
"""
import os 
from os.path import join,dirname,abspath 
PROJECT_DIR = dirname(dirname(abspath(__file__))) 
import sys 
sys.path.insert(0,PROJECT_DIR) 

os.environ["DJANGO_SETTINGS_MODULE"] = "DMBlog.settings" 

from django.core.wsgi import get_wsgi_application 
application = get_wsgi_application()



"""
import os
import sys # 4

from django.core.wsgi import get_wsgi_application

from os.path import join,dirname,abspath
#sys.path.append('/var/www/DMBlogEnv/lib/python3.5/site-packages')
PROJECT_DIR = dirname(dirname(abspath(__file__)))#3

sys.path.insert(0,PROJECT_DIR) # 5

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DMBlog.settings")

application = get_wsgi_application()
"""

"""
import os,sys
from os.path import join,dirname,abspath

#os.environ["DJANGO_SETTINGS_MODULE"] = "djangoWeb.settings"
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "DMBlog.settings")

sys.path.append('/Home/Project/DMBlogEnv/lib/python3.5/site-packages')

PROJECT_DIR = dirname(dirname(abspath(__file__)))
if PROJECT_DIR not in sys.path:
    sys.path.insert(0,PROJECT_DIR)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
"""

"""
import os


PROJECT_DIR = os.path.dirname(os.path.dirname(__file__))#3
import sys # 4
sys.path.insert(0,PROJECT_DIR) # 5


os.environ["DJANGO_SETTINGS_MODULE"] = "DMBlog.settings" # 7


from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
"""
