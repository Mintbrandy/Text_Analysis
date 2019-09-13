from django.urls import path

from .views import TextAnalysisView
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path(r'<slug:pattern>', TextAnalysisView.as_view(), name='test1'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
