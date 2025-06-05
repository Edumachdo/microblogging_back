const { connect } = require("./db");
const Logger = require("./logger");

class Postagem {
  constructor(id, idUsuario, texto, dataPostagem) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.texto = texto;
    this.dataPostagem = dataPostagem;
  }

  validar() {
    try {
      if (!this.idUsuario) {
        throw new Error("idUsuario é obrigatório");
      }
      if (!this.texto || this.texto.trim() === "") {
        throw new Error("Texto é obrigatório");
      }
      if (!this.dataPostagem) {
        throw new Error("Data da postagem é obrigatória");
      }
    } catch (error) {
      Logger.log("Erro de validação: " + error.message);
      throw error;
    }
  }

  async inserir() {
    let client;
    try {
      this.validar();
      const connection = await connect();
      client = connection.client;
      const db = connection.db;
      const result = await db.collection("postagens").insertOne({
        id: this.id,
        idUsuario: this.idUsuario,
        texto: this.texto,
        dataPostagem: this.dataPostagem,
      });
      console.log("Postagem inserida:", result.insertedId);
    } catch (error) {
      Logger.log("Erro ao inserir postagem: " + error);
    } finally {
      if (client) {
        client.close();
      }
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
