from django.conf import settings
from django.conf.urls.defaults import patterns, include, url
from django.views.generic import TemplateView
from josh.views import GalleryView

urlpatterns = patterns('',
  url(r'galleries/(?P<gallery_name>[A-Za-z0-9\-]+)$', GalleryView.as_view())
)
