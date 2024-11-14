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
    
class Viaje(models.Model):
    idViaje = models.AutoField(primary_key=True, verbose_name="ID del Viaje")
    direccionPartida = models.CharField(max_length=200, verbose_name="Dirección de Partida")
    latitudPartida = models.FloatField(verbose_name="Latitud de Partida")
    longitudPartida = models.FloatField(verbose_name="Longitud de Partida")
    direccionDestino = models.CharField(max_length=200, verbose_name="Dirección de Destino")
    latitudDestino = models.FloatField(verbose_name="Latitud de Destino")
    longitudDestino = models.FloatField(verbose_name="Longitud de Destino")
    precio = models.IntegerField(verbose_name="Precio")
    horaSalida = models.CharField(max_length=5, verbose_name="Hora de Salida")
    asientos = models.IntegerField(verbose_name="Número de Asientos")

    def __str__(self):
        return f"Viaje {self.idViaje}: {self.direccionPartida} a {self.direccionDestino}"