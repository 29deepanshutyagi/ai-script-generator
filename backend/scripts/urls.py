from django.urls import path
from .views import ScriptGenerateView

urlpatterns = [
    path('generate-script/', ScriptGenerateView.as_view(), name='generate-script'),
]
