# tables.py
import django_tables2 as tables
from django_tables2.utils import A
from .models import Programacion

class ProgramacionTable(tables.Table):
    _syncing = tables.Column(verbose_name='Opciones')
    rut_usuario = tables.Column(accessor=A('usuario.rut'), verbose_name='RUT del Usuario')

    class Meta:
        model = Programacion
        template_name = 'django_tables2/bootstrap.html'
        fields = ('rut_usuario','usuario', 'menu_id', 'nom_menu', 'fecha_servicio', 'cantidad_almuerzo', 'impreso', 'fecha_impreso', 'fecha_seleccion', '_syncing')
