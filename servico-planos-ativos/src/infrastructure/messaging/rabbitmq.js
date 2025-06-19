//Biblioteca que permite comunicação com o RabbitMQ
import amqplib from 'amqplib';

let channel = null;

//Função que retorna um canal AMQP conectado ao RabbitMQ
export async function getChannel() {
  if (channel) return channel;

  //Estabelece conexão com o RabbitMQ 
  const connection = await amqplib.connect('amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv');

  //Cria um canal de comunicação
  channel = await connection.createChannel();
  
  return channel;
}
