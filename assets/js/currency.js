async function fetchExchangeRates() {
    const apiKey = 'fca0c81b5b2c1311bfcda011';
    const currencies = ['USD', 'EUR', 'ZAR', 'GBP'];
    
    for (const symbol of currencies) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${symbol}/AOA`);
            const data = await response.json();
            
            if (data.result === "success") {
                // Formata o número para o padrão de Angola (ex: 950,50 Kz)
                const rate = data.conversion_rate.toLocaleString('pt-AO', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                document.getElementById(`rate-${symbol.toLowerCase()}`).innerText = `${rate} Kz`;
            }
        } catch (error) {
            console.error(`Erro ao buscar taxa de ${symbol}:`, error);
            document.getElementById(`rate-${symbol.toLowerCase()}`).innerText = "Indisponível";
        }
    }
}

// Inicia a busca ao carregar a página
document.addEventListener('DOMContentLoaded', fetchExchangeRates);