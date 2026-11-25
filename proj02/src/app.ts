// Importamos o Express para criar o servidor e a rota
import express, { type Request, type Response } from "express";

// Criamos a aplicação do servidor
const app = express();

// Permitimos receber dados no formato JSON
app.use(express.json());

// Porta do projeto 02
const PORT = 8082;

// Rota responsável por somar três números
app.post("/soma", (req: Request, res: Response) => {
    // Recebemos os três números enviados pelo body
    const numero1 = req.body.numero1;
    const numero2 = req.body.numero2;
    const numero3 = req.body.numero3;

    // Guardamos aqui os nomes dos campos que não estão corretos
    const camposComErro: string[] = [];

    // O typeof verifica se o valor recebido é do tipo número
    if (typeof numero1 !== "number") {
        camposComErro.push("numero1");
    }

    if (typeof numero2 !== "number") {
        camposComErro.push("numero2");
    }

    if (typeof numero3 !== "number") {
        camposComErro.push("numero3");
    }

    // Se algum campo tiver problema, não fazemos a soma
    if (camposComErro.length > 0) {
        return res.status(400).json({
            erro: "Os campos informados devem possuir valores numéricos.",
            camposComErro: camposComErro,
        });
    }

    // Com todos os valores corretos, fazemos a soma
    const resultado = numero1 + numero2 + numero3;

    // Retornamos o resultado em JSON
    return res.status(200).json({
        resultado: resultado,
    });
});

// Trata erros relacionados ao JSON enviado pelo cliente
app.use((error: unknown, req: Request, res: Response, next: unknown) => {
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            erro: "Os dados enviados não estão em formato JSON válido.",
        });
    }

    console.error("Erro no servidor:", error);
    return res.status(500).json({
        erro: "Não foi possível processar a requisição.",
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/soma`);
});