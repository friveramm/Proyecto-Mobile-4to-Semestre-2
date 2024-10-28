from django.urls import path
from rest_usuario.views import listar_usuarios, detalle_usuario, listar_tipo_usuarios

urlpatterns = [
    path('listar_usuarios',listar_usuarios,name="listar_usuarios"),
    path('detalle_usuario/<username>',detalle_usuario,name="detalle_usuario"),
    path('listar_tipo_usuarios',listar_tipo_usuarios,name="listar_usuarios"),
]
