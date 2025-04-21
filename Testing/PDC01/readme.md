# Automatización de testing con NodeJS

Proyecto para automatizar la ejecución de pruebas de volumen utilizando una herramienta de terceros.

## Requisitos:

 1. Para usar JMeter, se debe tener configurado en el path la carpeta contenedora de JMeter.
 2. Se debe tener instalada NodeJS y tener configurado en el path la carpeta contenedora.

## Uso:

1. En una consola ejecutar `npm install`.
2. En una consola ejectuar `node index.js 10`, donde el parámetro 10 es el número de entidades a crear en el Data Pool.

## Recursos usados

### input.txt

Esta archivo tendrá la configuración básica para el conjunto de pruebas a realizarce, esta escrito en formato JSON,  el cual contiene la siguiente estructura:

`{
    "TestGroups": [
        {
            "ThreadGroup": 
            {
                "Loop": 5,
                "Thread": 1,
                "Ramp": 1
            },
            "Requests": 
            [
                {
                    "Body":"[Build]",
                    "Host": "localhost", 
                    "Port": 3000,
                    "Protocol": "http",
                    "Path":"/recievefile",
                    "Method":"POST",
                    "Content":"Content-Type",
                    "Accept":"Accept",
                    "ApplicationJson": "application/json",
                    "UseCsv":true
                }
            ]
        }
    ]
}`

Donde:

 1. TestGroups es una lista de ThreadGroups cons respectivos Requests, cada elemento de este objeto se escribirá en un archivo separado.
 2. Thread Group es el elemento que tendrá la configuración de la prueba:
     - Loop: La cantidad de veces que se repetirá la prueba, cuando se usa un DataPool es recomendable que esta propiedad sea la misma cantidad que el DataPool, ya que cada iteración usará un solo dato del DataPool.
     - Thread: Cuantos hilos ejecutará para cada petición Rest.
     - Ramp: El tiempo total en el que se ejecutará el total de hilos.
 3. Request: Este será  una lista que tendra la configuración particular de cada petición Rest dentro de la prueba:
    - Body: este sera el cuerpo del Body este puede tener tres tipos de valores:
        - Un objeto JSON que será escrito de manera directa en el Request.
        - ``[Build]``: Este valor indicará que el Body se construirá con el DataPool que se consturirá teniendo el nombre de las propiedades y su valor obtenidos del DataPool y el JsonSchema.
        - ``[UsePrev]``: Este valor indicará que dicha petición tomará el valor de la repuesta de la petición anterior, se tomará el objeto completo y se usará en el body del siguiente.
    - Host: Es e host al que se le mandará la petición.
    - Port: Es el puerto que tomará la petición.
    - Protocol: Es el protocolo a tomar http o https.
    - Path: Es la ruta después del puerto.
    - Method: Es el verbo http a usar, POST, PUT...
    - Content: Valor necesario para peticion POST.
    - Accept: Valor necesario para peticion POST.
    - ApplicationJson: Valor necesario para peticion POST.
    - UseCsv: Valor booleano para determinar si necesita usar un CSV como catálogo de datos.

### JsonSchema

Este documento tendrá la configuración del body a enviar, este archivo tendrá la estrcutura estandar de un Json Schema, a partir de este, se obtendrán los nombres de las propiedades, el tipo de dato y cuando el Request tenga el valor ``[Build]``, construira a partir del mismo el archivo CSV con los datos a usar.

### JMeter xml

Este documento sera una entrada donde se reemplazarán los valores del input.txt para poder generar el archivo .jmx usado dentro de JMeter

### DataPool

Será un archivo Excel el cual será constuido a mano con los posibles datos a usar dentro de las pruebas, el nombre de las columnas debe ser el mismo dentro de los valores del Json Schema para que puedan ser tomados, en caso de no venir con el mismo nombre o que falte, se pondrá un valor **undefined**.

## Salidas

Una vez que se ejecute el comando Node, este escribirá los siguientes archivos:

 1. Un archivo CSV el cual será el DataPool a utilizar por la aplicación de pruebas.
 2. Un archivo JMX el cual será utilizado por la herramienta de pruebas para ejecutar el volumen
 3. En caso de usar JMeter, se escribirá un archivo xml que sera el resumen de las pruebas, el cual podrá ser cargado en JMeter.

### Colaboradores:

1. Benigno Alvarado.
2. Gustavo Ramirez.
3. Javier Rodriguez.
