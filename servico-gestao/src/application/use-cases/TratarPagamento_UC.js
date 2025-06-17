export async function tratarPagamentoRecebido(
  dadosPagamento,
  repositorioAssinatura // injetado via NestJS no provider
) {
  const { dia, mes, ano, codAss, valorPago } = dadosPagamento;

  try {
    const assinatura = await repositorioAssinatura.recuperaPorCodigo(codAss);

    if (!assinatura) {
      console.warn(`[!] Assinatura com código ${codAss} não encontrada.`);
      return;
    }

    // Formata a data no padrão: ano-mês-dia (ISO)
    const dataFormatada = new Date(`${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`);
    
    if (isNaN(dataFormatada.getTime())) {
      console.warn(`[!] Data inválida fornecida: ${ano}-${mes}-${dia}`);
      return;
    }

    assinatura.dataUltimoPagamento = dataFormatada;

    await repositorioAssinatura.atualiza(assinatura);

    console.log(`[✓] Pagamento registrado para assinatura ${codAss}: R$${valorPago} em ${dataFormatada.toISOString().slice(0, 10)}`);
  } catch (erro) {
    console.error(`[X] Erro ao processar pagamento da assinatura ${codAss}:`, erro.message);
  }
}
