from rest_framework import serializers
# Importar los modelos de models.py
from .models import TipoUsuario, Usuario

class  TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields= '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields= '__all__'