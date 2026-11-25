// importa o Express para criar o servidor e a rota
import express, { type Request, type Response } from "express";

// aplicação do servidor
const app = express();

// dados no formato JSON
app.use(express.json());

// porta do projeto 02
const PORT = 8082;

// rota responsável por somar três números
app.post("/soma", (req: Request, res: Response) => {
    // Recebemos os três números enviados pelo body
    const numero1 = req.body.numero1;
    const numero2 = req.body.numero2;
    const numero3 = req.body.numero3;

    // nomes dos campos que não estão corretos
    const camposComErro: string[] = [];

    // o typeof verifica se o valor recebido é do tipo número
    if (typeof numero1 !== "number") {
        camposComErro.push("numero1");
    }

    if (typeof numero2 !== "number") {
        camposComErro.push("numero2");
    }

    if (typeof numero3 !== "number") {
        camposComErro.push("numero3");
    }

    // se algum campo tiver problema, não faz a soma
    if (camposComErro.length > 0) {
        return res.status(400).json({
            erro: "Os campos informados devem possuir valores numéricos.",
            camposComErro: camposComErro,
        });
    }

    // com todos os valores corretos, faz a soma
    const resultado = numero1 + numero2 + numero3;

    // retorna o resultado em JSON
    return res.status(200).json({
        resultado: resultado,
    });
});

// trata erros relacionados ao JSON enviado pelo cliente
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

// inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/soma`);
});