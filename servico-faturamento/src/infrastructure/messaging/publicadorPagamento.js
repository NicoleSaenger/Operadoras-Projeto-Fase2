//Importa a função que retorna o canal de comunicação com o RabbitMQ
import { getChannel } from './rabbitmq.js';

//Função para publicar um evento de pagamento no RabbitMQ
export async function publicarEventoPagamento({ dataPagamento, codAss, valorPago }) {
  const channel = getChannel();
  const exchange = 'pagamentos';
  const routingKey = 'pagamento.registrado';

  //Cria o objeto do evento com os dados formatados
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

  //Garante que o exchange existe
  await channel.assertExchange(exchange, 'topic', { durable: true });

  //Publica o evento no RabbitMQ com a chave de roteamento especificada
  channel.publish(
    exchange,
    routingKey,
    Buffer.from(JSON.stringify(evento)),
    { persistent: true }
  );

  console.log('-> Evento publicado no RabbitMQ:', evento);
}
