const Usuario = require("./Usuario");
const Postagem = require("./Postagem");
const Seguidor = require("./Seguidor");
const Comentario = require("./Comentario");

async function testarInsercao() {
  const u1 = new Usuario(
    1,
    "João Silva",
    "joao.silva@example.com",
    "senhaSegura123",
    new Date()
  );
  await u1.inserir();

  const p1 = new Postagem(1, 1, "Este é um exemplo de postagem.", new Date());
  await p1.inserir();

  const s1 = new Seguidor(1, 1, 2);
  await s1.inserir();

  const c1 = new Comentario(
    1,
    1,
    2,
    "Este é um comentário de exemplo.",
    new Date()
  );
  await c1.inserir();
}

async function testarAtualizar() {
  await Usuario.atualizar(
    { nome: "João Silva" },
    { email: "joao.silva@exemplo.com" }
  );
  await Postagem.atualizar(
    { texto: "Este é um exemplo de postagem." },
    { texto: "Postagem atualizada." }
  );
  await Seguidor.atualizar({ id: 1 }, { idSeguido: 3 });
  await Comentario.atualizar(
    { texto: "Este é um comentário de exemplo." },
    { texto: "Comentário atualizado." }
  );
  console.log("Testar Atualizar concluído");
}

async function testarBuscar() {
  await Usuario.buscar();
  await Postagem.buscar();
  await Seguidor.buscar();
  await Comentario.buscar();
  console.log("Testar Buscar concluído");
}

async function testarDeletar() {
  await Usuario.deletar({ nome: "João Silva" });
  await Postagem.deletar({ texto: "Postagem atualizada." });
  await Seguidor.deletar({ id: 1 });
  await Comentario.deletar({ texto: "Comentário atualizado." });
  console.log("Testar Deletar concluído");
}

async function main() {
  await testarInsercao();
  await testarAtualizar();
  await testarBuscar();
  await testarDeletar();
}

main();
