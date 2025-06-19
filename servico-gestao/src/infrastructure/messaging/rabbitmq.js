import amqplib from 'amqplib';

let connection = null;
let channel = null;

//Conecta ao servidor RabbitMQ e cria um canal de comunicação
export async function connectRabbitMQ() {
  const amqpUrl = 'amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv';

  if (!amqpUrl) {
    throw new Error('Variável de ambiente RABBITMQ_URL não definida.');
  }

  try {
    connection = await amqplib.connect(amqpUrl);
    channel = await connection.createChannel();

    console.log('[✓] Conectado ao RabbitMQ com sucesso!');
  } catch (err) {
    console.error('[x] Erro ao conectar ao RabbitMQ:', err.message);
    throw err;
  }
}

export function getChannel() {
  if (!channel) {
    throw new Error('[!] Canal RabbitMQ ainda não foi inicializado! Execute connectRabbitMQ primeiro.');
  }
  return channel;
}
