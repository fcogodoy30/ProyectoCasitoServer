import pymysql
import os

def check_nube_connection():
    try:
        connection = pymysql.connect(
            host=os.getenv('NUBE_DB_HOST'),  # Cambia esto por el host de tu base de datos en la nube
            user=os.getenv('NUBE_DB_USER'),
            password=os.getenv('NUBE_DB_PASSWORD'),
            database=os.getenv('NUBE_DB_NAME')
        )
        connection.close()
        return True
    except pymysql.MySQLError:
        return False



