# api-django-mobile

Parte 1 ENTORNO VIRTUAL
rm -r env → comando pa borrar carpeta env
py -m venv env → crear carpeta del entorno virtual
.\env\Scripts\Activate → activar entorno virtual
pip install django


Parte 2 
pip install djangorestframework
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata datosIniciales.json

Parte 3
pip install django-cors-headers

Levantar página y: http://127.0.0.1:8000/api/listar_usuarios (/api/listar_usuarios)