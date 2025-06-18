// src/messaging/rabbitmq.js
import amqplib from 'amqplib';

let channel = null;

export async function getChannel() {
  if (channel) return channel;

  const connection = await amqplib.connect('amqps://fefqlcnv:tqVg76mx9sIg1ShHvtX7oZLWh3nhPh_r@jaragua.lmq.cloudamqp.com/fefqlcnv');
  channel = await connection.createChannel();
  return channel;
}
