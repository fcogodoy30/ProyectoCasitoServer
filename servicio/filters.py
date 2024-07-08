import django_filters
from .models import Programacion

class ProgramacionFilter(django_filters.FilterSet):
    fecha_servicio = django_filters.DateFromToRangeFilter(
        widget=django_filters.widgets.RangeWidget(attrs={
            'type': 'date',
            'class': 'form-control',
        })
    )

    class Meta:
        model = Programacion
        fields = ['fecha_servicio']
