import amqplib from 'amqplib';

let channel = null;

export async function connectRabbitMQ() {
  const amqpUrl = 'amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv';

  if (!amqpUrl) {
    throw new Error('Variável de ambiente RABBITMQ_URL não definida.');
  }

  const connection = await amqplib.connect(amqpUrl);
  channel = await connection.createChannel();
  console.log('Conectado ao RabbitMQ com sucesso!');
}

export function getChannel() {
  if (!channel) {
    throw new Error('Canal RabbitMQ ainda não foi inicializado!');
  }
  return channel;
}
