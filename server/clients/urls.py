from django.urls import path
from . import views

urlpatterns = [
    path('clients/', views.get_clients, name='get_clients'),
    path('clients/<int:client_id>/', views.get_client, name='get_client'),
]
