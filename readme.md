# Script de Envío de Datos a DynamoDB

## Descripción

Este script de Node.js envía datos simulados a una tabla de DynamoDB cada 10 segundos. Los datos incluyen un identificador de dispositivo, una marca de tiempo, humedad, temperatura, nivel de batería y una ubicación GPS fija para cada dispositivo.

## Requisitos

- **Node.js**: Asegúrate de tener Node.js instalado en tu sistema. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
- **AWS SDK para JavaScript**: Utilizado para interactuar con DynamoDB.

## Instalación

1. **Clona o descarga el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <DIRECTORIO_DEL_REPOSITORIO>
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las credenciales de AWS**:
   Asegúrate de que las credenciales de AWS estén configuradas en tu entorno. Puedes hacerlo configurando el archivo `~/.aws/credentials` o mediante las variables de entorno `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`.

4. **Acceso a DynamoDB**:
   - **Asegúrate de tener acceso a la tabla `demo_meetup_grafana`** en DynamoDB. Esto incluye permisos para realizar operaciones de escritura (`PutItem`) en la tabla.
   - **Configura la región** en el archivo `index.js` para que coincida con la región en la que está ubicada tu tabla en DynamoDB.

## Uso

1. **Modifica el archivo**:
   - Asegúrate de que el nombre de la tabla en DynamoDB (`demo_meetup_grafana`) sea correcto en el archivo `index.js`.
   - Revisa y ajusta las coordenadas GPS en el objeto `deviceLocations` si es necesario.

2. **Ejecuta el script**:
   ```bash
   npm run start
   ```

   El script comenzará a enviar datos simulados a la tabla de DynamoDB cada 10 segundos.

## Explicación del Código

- **`AWS.config.update({ region: 'us-west-2' });`**: Configura la región de DynamoDB. Cambia la región según sea necesario.
- **`deviceLocations`**: Un objeto que mapea cada `device_id` a una ubicación GPS específica en Santiago de Chile.
- **`generateData(device_id)`**: Función que genera datos simulados para cada dispositivo. Incluye un `timestamp` en milisegundos, y valores de `humidity`, `temperature`, y `battery`. La ubicación GPS es fija para cada dispositivo.
- **`sendToDynamoDB()`**: Función que envía datos a DynamoDB para cada dispositivo en la lista.
- **`setInterval(sendToDynamoDB, 10000);`**: Envía datos cada 10 segundos.
