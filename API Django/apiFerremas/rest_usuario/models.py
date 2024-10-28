from django.db import models

# Create your models here.

class TipoUsuario(models.Model):
    idTipoUsuario = models.IntegerField(primary_key=True, verbose_name='Id de Tipo de Usuario')
    nombreTipoUsuario = models.CharField(max_length=50, verbose_name="Nombre del Tipo de Usuario")

    def __str__(self):
        return self.nombreTipoUsuario

class Usuario(models.Model):
    username = models.CharField(max_length=150, unique=True, verbose_name="Nombre de Usuario")
    nombre = models.CharField(max_length=150, verbose_name="Nombre")
    apellido = models.CharField(max_length=150, verbose_name="Apellido")
    correo = models.EmailField(unique=True, verbose_name="Correo Electrónico")
    password = models.CharField(max_length=128, verbose_name="Contraseña")
    
    tipo_usuario = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, verbose_name="Tipo de Usuario")

    def __str__(self):
        return self.username