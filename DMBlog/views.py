from django.shortcuts import render
# from django.views.generic import ListView
# from blog.models import Tag
# from django.db.models.aggregates import Count


def index(request):
    return render(request, 'home_page2.html', context={
        'title': 'DM博客',
        'welcome': '进入DM博客'
    })


# class TagsView(ListView):
#     model = Tag
#     template_name = 'blog/tags.html'
#     context_object_name = 'tags_list'
#
#     def get_queryset(self):
#         # 记得在顶部引入 Tag model
#         return super(TagsView, self).get_queryset().annotate(num_posts=Count('article')).filter(
#             num_posts__gt=0, ).order_by('-num_posts', )
