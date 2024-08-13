const AWS = require('aws-sdk');

// Configura la región y la tabla de DynamoDB
AWS.config.update({
    region: 'us-west-2'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Coordenadas base en Santiago de Chile (ajustadas para cada dispositivo)
const deviceLocations = {
    'device_001': {
        latitude: -33.4489,
        longitude: -70.6693
    },
    'device_002': {
        latitude: -33.4490,
        longitude: -70.6694
    },
    'device_003': {
        latitude: -33.4491,
        longitude: -70.6695
    },
    'device_004': {
        latitude: -33.4492,
        longitude: -70.6696
    },
    'device_005': {
        latitude: -33.4493,
        longitude: -70.6697
    },
    'device_006': {
        latitude: -33.4494,
        longitude: -70.6698
    }
};

// Dispositivos con IDs únicos
const devices = Object.keys(deviceLocations);

// Función para generar datos simulados para cada dispositivo
function generateData(device_id) {
    const location = deviceLocations[device_id];

    return {
        TableName: 'demo_meetup_grafana', // Nombre de tu tabla
        Item: {
            device_id: device_id,
            timestamp: Date.now(), // Timestamp como número (milisegundos desde 1970-01-01)
            humidity: parseFloat((Math.random() * 100).toFixed(1)), // Humedad en porcentaje con un decimal
            temperature: parseFloat((Math.random() * 30 + 10).toFixed(1)), // Temperatura en grados Celsius con un decimal
            battery: parseFloat((Math.random() * 100).toFixed(1)), // Batería en porcentaje con un decimal
            latitude: location.latitude, // Latitud fija para el dispositivo
            longitude: location.longitude // Longitud fija para el dispositivo
        }
    };
}

// Función para enviar el JSON a DynamoDB para cada dispositivo
function sendToDynamoDB() {
    devices.forEach(device_id => {
        const item = generateData(device_id);
        dynamoDB.put(item, (err, data) => {
            if (err) {
                console.error(`Error inserting data into DynamoDB for ${device_id}:`, err);
            } else {
                console.log(`Data inserted into DynamoDB for ${device_id}:`, data);
            }
        });
    });
}

// Enviar los datos cada 10 segundos
setInterval(sendToDynamoDB, 10000);
