//Resposnável por tratar o recebimento de um pagamento de assinatura sempre que ouvir um evento

export async function tratarPagamentoRecebido(
  dadosPagamento, // Dados do pagamento recebidos do evento
  repositorioAssinatura
) {
  const { dia, mes, ano, codAss, valorPago } = dadosPagamento;

  try {
    //Tenta recuperar a assinatura a partir do código informado
    const assinatura = await repositorioAssinatura.recuperaPorCodigo(codAss);

    if (!assinatura) {
      console.warn(`[!] Assinatura com código ${codAss} não encontrada.`);
      return;
    }

    //Formata a data no padrão ano-mês-dia
    const dataFormatada = new Date(`${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`);
    
    //Valida a data criada
    if (isNaN(dataFormatada.getTime())) {
      console.warn(`[!] Data inválida fornecida: ${ano}-${mes}-${dia}`);
      return;
    }

    //Atualiza a assinatura com a nova data de pagamento
    assinatura.dataUltimoPagamento = dataFormatada;

    //Salva a atualização no repositório
    await repositorioAssinatura.atualiza(assinatura);

    console.log(`[✓] Pagamento registrado para assinatura ${codAss}: R$${valorPago} em ${dataFormatada.toISOString().slice(0, 10)}`);
  } catch (erro) {
    console.error(`[X] Erro ao processar pagamento da assinatura ${codAss}:`, erro.message);
  }
}
