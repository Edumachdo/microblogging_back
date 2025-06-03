const { connect } = require("./db");
const Logger = require("./logger");

class Postagem {
  constructor(id, idUsuario, texto, dataPostagem) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.texto = texto;
    this.dataPostagem = dataPostagem;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("postagens").insertOne({
        id: this.id,
        idUsuario: this.idUsuario,
        texto: this.texto,
        dataPostagem: this.dataPostagem,
      });
      console.log("Postagem inserida:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir postagem: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("postagens").updateMany(filtro, {
        $set: novosDados,
      });
      console.log("Postagem atualizada!", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar postagem: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const postagens = await db.collection("postagens").find(filtro).toArray();
      console.log("Postagem(ns) encontrada(s)!", postagens);
      client.close();
    } catch (error) {
      Logger.log("Erro na busca de postagem(ns): " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("postagens").deleteMany(filtro);
      console.log("Postagem deletada!", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar postagem: " + error);
    }
  }
}

module.exports = Postagem;
