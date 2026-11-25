// Importamos o Express, que ajuda a criar o servidor e as rotas
import express, { type Request, type Response } from "express";

// Criamos a aplicação do servidor
const app = express();

// Esta configuração permite receber dados no formato JSON
app.use(express.json());

// Porta em que o projeto ficará disponível
const PORT = 8081;

// Rota para receber nome, idade e time favorito
app.post("/mensagem", (req: Request, res: Response) => {
    // Pegamos os dados enviados no corpo da requisição
    const nome = req.body.nome;
    const idade = req.body.idade;
    const timeFavorito = req.body.timeFavorito;

    // Verificamos se algum dado não foi informado ou está inválido
    if (!nome || typeof nome !== "string") {
        return res.status(400).json({
            erro: "O campo 'nome' é obrigatório.",
        });
    }

    if (idade === undefined || idade === null || idade === "") {
        return res.status(400).json({
            erro: "O campo 'idade' é obrigatório.",
        });
    }

    if (typeof idade !== "number" || idade < 0) {
        return res.status(400).json({
            erro: "O campo 'idade' deve ser um número válido.",
        });
    }

    if (!timeFavorito || typeof timeFavorito !== "string") {
        return res.status(400).json({
            erro: "O campo 'timeFavorito' é obrigatório.",
        });
    }

    // Montamos a frase com os dados recebidos
    const frase = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${timeFavorito}!`;

    // Enviamos a frase como resposta
    return res.status(200).json({
        mensagem: frase,
    });
});

// Trata erros que possam acontecer no formato dos dados enviados
app.use((error: unknown, req: Request, res: Response) => {
    // Se o JSON estiver escrito incorretamente
    if (error instanceof SyntaxError) {
        return res.status(400).json({
            erro: "Os dados enviados não estão em formato JSON válido.",
        });
    }

    // Erro inesperado no servidor
    console.error("Erro no servidor:", error);
    return res.status(500).json({
        erro: "Não foi possível processar a requisição.",
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/mensagem`);
});