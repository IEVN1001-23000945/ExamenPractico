
import os
from flask import Flask, request, jsonify, flash, get_flashed_messages
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import config

app = Flask(__name__)

app.config.from_object(config['development'])
app.secret_key = os.environ.get(
    'SECRET_KEY',
    'pizzeria_clave_secreta'
)

CORS(app)
mysql = MySQL(app)



@app.route('/clientes', methods=['GET'])
def lista_clientes():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM clientes")
        datos = cursor.fetchall()
        cursor.close()

        return jsonify({
            'clientes': datos,
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500



@app.route('/clientes', methods=['POST'])
def agregar_cliente():
    try:
        cursor = mysql.connection.cursor()

        sql = """INSERT INTO clientes
        (nombre, direccion, telefono, fechaPedido, total)
        VALUES (%s, %s, %s, %s, %s)"""

        total = float(request.json['total'])

        datos = (
            request.json['nombre'],
            request.json['direccion'],
            request.json['telefono'],
            request.json['fechaPedido'],
            total
        )

        cursor.execute(sql, datos)
        mysql.connection.commit()

        idCliente = cursor.lastrowid
        cursor.close()


        flash(
            f'Pedido registrado correctamente. Total a pagar: ${total:.2f}',
            'success'
        )

        mensajes = get_flashed_messages(with_categories=True)

        return jsonify({
            'mensaje': 'Cliente registrado',
            'idCliente': idCliente,
            'exito': True,
            'mensajes': [
                {
                    'categoria': categoria,
                    'texto': mensaje
                }
                for categoria, mensaje in mensajes
            ]
        }), 201

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500



@app.route('/pizzas', methods=['GET'])
def lista_pizzas():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM pizzas")
        datos = cursor.fetchall()
        cursor.close()

        return jsonify({
            'pizzas': datos,
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500



@app.route('/pizzas', methods=['POST'])
def agregar_pizza():
    try:
        cursor = mysql.connection.cursor()

        sql = """INSERT INTO pizzas
        (idCliente, tamano, ingredientes, cantidad, subtotal)
        VALUES (%s, %s, %s, %s, %s)"""

        datos = (
            request.json['idCliente'],
            request.json['tamano'],
            request.json['ingredientes'],
            request.json['cantidad'],
            request.json['subtotal']
        )

        cursor.execute(sql, datos)
        mysql.connection.commit()
        cursor.close()

        return jsonify({
            'mensaje': 'Pizza registrada',
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500



@app.route('/ventas/dia', methods=['GET'])
def ventas_dia():
    try:
        dia = request.args.get('dia', type=int)

        if dia is None or dia < 0 or dia > 6:
            return jsonify({
                'mensaje': 'Selecciona un día válido',
                'exito': False
            }), 400

        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT * FROM clientes
            WHERE WEEKDAY(fechaPedido) = %s
        """, (dia,))

        datos = cursor.fetchall()
        cursor.close()

        return jsonify({
            'ventas': datos,
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500


@app.route('/ventas/mes', methods=['GET'])
def ventas_mes():
    try:
        mes = request.args.get('mes', type=int)

        if mes is None or mes < 1 or mes > 12:
            return jsonify({
                'mensaje': 'Selecciona un mes válido',
                'exito': False
            }), 400

        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT * FROM clientes
            WHERE MONTH(fechaPedido) = %s
        """, (mes,))

        datos = cursor.fetchall()
        cursor.close()

        return jsonify({
            'ventas': datos,
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500


@app.route('/ventas/detalle/<int:idCliente>', methods=['GET'])
def detalle_venta(idCliente):
    try:
        cursor = mysql.connection.cursor()

        cursor.execute("""
            SELECT * FROM pizzas
            WHERE idCliente = %s
        """, (idCliente,))

        datos = cursor.fetchall()
        cursor.close()

        return jsonify({
            'pizzas': datos,
            'exito': True
        })

    except Exception as ex:
        return jsonify({
            'mensaje': str(ex),
            'exito': False
        }), 500


if __name__ == '__main__':
    app.run(debug=True)
