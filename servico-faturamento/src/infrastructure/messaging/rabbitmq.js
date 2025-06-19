//Importa a biblioteca AMQP para conexão com o RabbitMQ
import amqplib from 'amqplib';

let channel = null;

//Função que realiza a conexão com o RabbitMQ e cria o canal
export async function connectRabbitMQ() {
  const amqpUrl = 'amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv';

  if (!amqpUrl) {
    throw new Error('Variável de ambiente RABBITMQ_URL não definida.');
  }

  //Estabelece a conexão e cria o canal de comunicação
  const connection = await amqplib.connect(amqpUrl);
  channel = await connection.createChannel();
  console.log('[✓] Conectado ao RabbitMQ com sucesso!');
}

export function getChannel() {
  if (!channel) {
    throw new Error('[x] Canal RabbitMQ ainda não foi inicializado!');
  }
  return channel;
}
