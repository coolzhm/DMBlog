from django import template
from django.db.models.aggregates import Count
from django.db import connection
from comments.models import Comment

from ..models import Article, Category, Tag, Advertisement, Friends, SiteBasicData

register = template.Library()


@register.simple_tag
def get_site_basic_data(num=1):
    try:
        basic_data = SiteBasicData.objects.all().order_by('update_time')[:num][0]
    except:
        basic_data = SiteBasicData()
    return basic_data


@register.simple_tag
# 获取点击前几
def get_hot_view_article(num=5):
    return Article.objects.all().filter(type='WZ').order_by('-views')[:num]


@register.simple_tag
# 获取评论前几
def get_hot_commend_article(num=5):
    return Article.objects.all().filter(type='WZ').annotate(n=Count('comment')).order_by('-n')[:num]


@register.simple_tag
# 推荐内容
def get_recommend(num=4):
    return Article.objects.filter(type='WZ').order_by('-created_time').order_by('?')[:num]


@register.simple_tag
# 归档
def archives():
    return Article.objects.filter(type='WZ').dates('created_time', 'month', order='DESC')


@register.simple_tag
# 分类
def get_categories():
    # 记得在顶部引入 count 函数
    return Category.objects.annotate(num_posts=Count('article')).filter(num_posts__gt=0)


@register.simple_tag
# 获取所有
def get_tags():
    # 记得在顶部引入 Tag model
    return Tag.objects.annotate(num_posts=Count('article')).filter(num_posts__gt=0, ).order_by('-num_posts', )


@register.simple_tag
# 获取广告
def get_ads(num=2):
    return Advertisement.objects.order_by('-createdate')[:num]


@register.simple_tag
# 获取最新评论
def get_commands(num=8):
    return Comment.objects.order_by('-created_time')[:num]


@register.simple_tag
# 获取友链
def get_frieads():
    return Friends.objects.filter(used='1').order_by('created_time')

# from django.utils.safestring import mark_safe
# from mptt.templatetags.mptt_tags import cache_tree_children
# from django.utils.translation import ugettext as _
#
#
# class RecurseTreeNode(template.Node):
#     def __init__(self, template_nodes, queryset_var):
#         self.template_nodes = template_nodes
#         self.queryset_var = queryset_var
#
#     def _render_node(self, context, node,length=0, index=0):
#         bits = []
#         context.push()
#         for child in node.get_children():
#             bits.append(self._render_node(context, child))
#         # 将index添加到上下文里，和forloop一样，也提供四种计数方式
#         context['counter'] = index + 1
#         context['counter0'] = index
#         context['revcounter'] = length - index
#         context['revcounter0'] = length - index - 1
#         context['node'] = node
#         context['children'] = mark_safe(''.join(bits))
#         rendered = self.template_nodes.render(context)
#         context.pop()
#         return rendered
#
#     def render(self, context):
#         queryset = self.queryset_var.resolve(context)
#         roots = cache_tree_children(queryset)
#         bits = [self._render_node(context, node) for node in roots]
#         # 通过enumerate，获取当前的index
#         for index, node in enumerate(roots):
#             bits.append(self._render_node(context, node, len(roots), roots.index(node)))
#         return ''.join(bits)
#
#
# @register.tag
# def recursetree(parser, token):
#     """
#     Iterates over the nodes in the tree, and renders the contained block for each node.
#     This tag will recursively render children into the template variable {{ children }}.
#     Only one database query is required (children are cached for the whole tree)
#
#     Usage:
#             <ul>
#                 {% recursetree nodes %}
#                     <li>
#                         {{ node.name }}
#                         {% if not node.is_leaf_node %}
#                             <ul>
#                                 {{ children }}
#                             </ul>
#                         {% endif %}
#                     </li>
#                 {% endrecursetree %}
#             </ul>
#     """
#     bits = token.contents.split()
#     if len(bits) != 2:
#         raise template.TemplateSyntaxError(_('%s tag requires a queryset') % bits[0])
#
#     queryset_var = template.Variable(bits[1])
#
#     template_nodes = parser.parse(('endrecursetree',))
#     parser.delete_first_token()
#
#     return RecurseTreeNode(template_nodes, queryset_var)

#
# from django.utils.safestring import mark_safe
# from mptt.templatetags.mptt_tags import cache_tree_children
# from django.utils.translation import ugettext as _
#
#
# class RecurseTreeNode(template.Node):
#     def __init__(self, template_nodes, queryset_var):
#         self.template_nodes = template_nodes
#         self.queryset_var = queryset_var
#
#     def _render_node(self, context, node, length=0, index=0):
#         bits = []
#         context.push()
#         for child in node.get_children():
#             bits.append(self._render_node(context, child))
#         # 将index添加到上下文里，和forloop一样，也提供四种计数方式
#         context['counter'] = index + 1
#         context['counter0'] = index
#         context['revcounter'] = length - index
#         context['revcounter0'] = length - index - 1
#         context['node'] = node
#         context['children'] = mark_safe(''.join(bits))
#         rendered = self.template_nodes.render(context)
#         context.pop()
#         return rendered
#
#     def render(self, context):
#         queryset = self.queryset_var.resolve(context)
#         roots = cache_tree_children(queryset)
#         bits = []
#         # 通过enumerate，获取当前的index
#         for index, node in enumerate(roots):
#             bits.append(self._render_node(context, node, len(roots), roots.index(node)))
#         return ''.join(bits)
#
#
# @register.tag
# def recursetree(parser, token):
#     """
#     Iterates over the nodes in the tree, and renders the contained block for each node.
#     This tag will recursively render children into the template variable {{ children }}.
#     Only one database query is required (children are cached for the whole tree)
#
#     Usage:
#             <ul>
#                 {% recursetree nodes %}
#                     <li>
#                         {{ node.name }}
#                         {% if not node.is_leaf_node %}
#                             <ul>
#                                 {{ children }}
#                             </ul>
#                         {% endif %}
#                     </li>
#                 {% endrecursetree %}
#             </ul>
#     """
#     bits = token.contents.split()
#     if len(bits) != 2:
#         raise template.TemplateSyntaxError(_('%s tag requires a queryset') % bits[0])
#
#     queryset_var = template.Variable(bits[1])
#
#     template_nodes = parser.parse(('endrecursetree',))
#     parser.delete_first_token()
#
#     return RecurseTreeNode(template_nodes, queryset_var)
