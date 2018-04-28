from haystack import indexes
from .models import Article
from django.db.models import Q

# 这是 django haystack 的规定。要相对某个 app 下的数据进行全文检索，
# 就要在该 app 下创建一个 search_indexes.py 文件，然后创建一个 XXIndex 类
# （XX 为含有被检索数据的模型，如这里的 Post），并且继承 SearchIndex 和 Indexable。
# 每个索引里面必须有且只能有一个字段为 document=True，
# 这代表 django haystack 和搜索引擎将使用此字段的内容作为索引进行检索(primary field)。
class ArticleIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)

    def get_model(self):
        return Article

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(~Q(type='SM')).filter(~Q(type='LYB')).all()
