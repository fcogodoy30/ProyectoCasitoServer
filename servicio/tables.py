# tables.py
import django_tables2 as tables
from .models import Programacion

class ProgramacionTable(tables.Table):
    class Meta:
        model = Programacion
        template_name = 'django_tables2/bootstrap.html'
        fields = ('usuario', 'menu_id', 'nom_menu', 'fecha_servicio', 'cantidad_almuerzo', 'impreso', 'fecha_impreso', 'fecha_seleccion')
