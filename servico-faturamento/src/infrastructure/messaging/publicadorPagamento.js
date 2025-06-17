import { getChannel } from './rabbitmq.js';

export async function publicarEventoPagamento({ dataPagamento, codAss, valorPago }) {
  const channel = getChannel();
  const exchange = 'pagamentos';
  const routingKey = 'pagamento.registrado';

  // Cria o corpo do evento com estrutura esperada pelo consumidor
  const evento = {
    evento: 'PagamentoRealizado',
    dados: {
      dia: dataPagamento.getUTCDate(),
      mes: dataPagamento.getUTCMonth() + 1,
      ano: dataPagamento.getUTCFullYear(),
      codAss,
      valorPago,
    }
  };

  await channel.assertExchange(exchange, 'topic', { durable: true });

  channel.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify(evento)),
    { persistent: true }
  );

  console.log('Evento publicado no RabbitMQ:', evento);
}
