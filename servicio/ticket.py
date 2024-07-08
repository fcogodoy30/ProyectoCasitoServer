import io
from datetime import timezone
from django.http import HttpResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from django.shortcuts import redirect
from .models import Programacion
from reportlab.lib.units import cm, mm
import platform
import tempfile
from django.utils import timezone
from django.contrib import messages

# Importar bibliotecas específicas según el sistema operativo
if platform.system() == "Windows":
    import win32print
    import win32api

# Función de impresión para Windows
def print_pdf_windows(pdf_content):
    try:
        # Crear un archivo temporal
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(pdf_content)
            temp_file.close()
            
            # Obtener el nombre de la impresora predeterminada
            printer_name = win32print.GetDefaultPrinter()
            print(f"Using printer: {printer_name}")  # Depuración

            # Enviar el archivo PDF a la impresora
            win32api.ShellExecute(0, "print", temp_file.name, f'/d:"{printer_name}"', ".", 0)
    except Exception as e:
        print(f"Error printing on Windows: {e}")  # Depuración

def generar_ticket(request, usuario_id, fecha):
    if not fecha:
        fecha = timezone.now().strftime('%Y-%m-%d')  # Set current date as default

    try:
        datos = Programacion.objects.get(usuario=usuario_id, fecha_servicio=fecha)

        if datos.impreso == 1:
            messages.success(request, "El ticket ya ha sido impreso.")
            return redirect('principal')

        buffer = io.BytesIO()
        styles = getSampleStyleSheet()
        
        # Crear un nuevo estilo de párrafo con tamaño de fuente ajustado
        centered_style = ParagraphStyle(name="Centered", alignment=TA_CENTER, fontSize=12)

        content = []
        content.append(Paragraph("Ticket Menu", styles['Title']))
        content.append(Paragraph(f"Perfil: {datos.usuario.tipo_usuario}", centered_style))
        content.append(Paragraph(f"{datos.usuario.nombre} {datos.usuario.apellido}", centered_style))
        content.append(Spacer(0.2 * cm, 0.2 * cm))
        content.append(Paragraph(f"Fecha: {datos.fecha_servicio.strftime('%Y-%m-%d')}", centered_style))
        content.append(Spacer(0.2 * cm, 0.2 * cm))
        content.append(Paragraph(f"Menu: {datos.nom_menu}", centered_style))
        content.append(Spacer(0.2 * cm, 0.2 * cm))
        content.append(Paragraph(f"Cantidad: {datos.cantidad_almuerzo}", centered_style))

        # Calcular la altura total del contenido
        total_height = 0
        for elem in content:
            if isinstance(elem, Paragraph):
                total_height += 10  # Aproximadamente el tamaño de la fuente más un pequeño margen
            elif isinstance(elem, Spacer):
                total_height += elem.height

        # Añadir márgenes
     

        # Crear el documento con la altura calculada
        doc = SimpleDocTemplate(buffer, pagesize=(55*mm, total_height*mm), rightMargin=5*mm, leftMargin=5*mm, topMargin=5*mm, bottomMargin=5*mm)
        doc.build(content)

        pdf = buffer.getvalue()
        buffer.close()

        if platform.system() == "Windows":
            print_pdf_windows(pdf)

        # Marcar como impreso y guardar
        datos.impreso = 1
        datos.fecha_impreso = timezone.now()
        datos.save()

        messages.success(request, "Imprimiendo Ticket.")
        return redirect('principal')

    except Programacion.DoesNotExist:
        messages.error(request, "Sin Ticket Disponible.")
        return redirect('principal')

    except Exception as e:
        messages.error(request, f"Error: {str(e)}")
        return redirect('principal')
