// Importamos o Express para criar o servidor e as rotas
import express, { type Request, type Response } from "express";

// Criamos a aplicação do servidor
const app = express();

// Permitimos receber dados no formato JSON
app.use(express.json());

// Porta do projeto 03
const PORT = 8083;

// Dados esperados para realizar o login
const usuarioCorreto = "admin";
const senhaCorreta = "1234";

// Rota responsável pelo login
app.post("/login", (req: Request, res: Response) => {
    // Recebemos usuário e senha enviados no body
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    // Verificamos se os campos foram informados
    if (!usuario || !senha) {
        return res.status(400).json({
            erro: "Informe o usuário e a senha.",
        });
    }

    // Comparamos os valores recebidos com os valores esperados
    if (usuario !== usuarioCorreto || senha !== senhaCorreta) {
        return res.status(401).json({
            erro: "Usuário ou senha incorretos.",
            usuarioInformado: usuario,
        });
    }

    // Quando os dados estiverem corretos
    return res.status(200).json({
        mensagem: "Login realizado com sucesso.",
        usuario: usuario,
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
    console.log(`Acesse: http://localhost:${PORT}/login`);
});