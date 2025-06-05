const { connect } = require("./db");
const Logger = require("./logger");

class Comentario {
  constructor(id, idPostagem, idUsuario, texto, dataComentario) {
    this.id = id;
    this.idPostagem = idPostagem;
    this.idUsuario = idUsuario;
    this.texto = texto;
    this.dataComentario = dataComentario;
  }

  validar() {
    try {
      if (!this.idPostagem) {
        throw new Error("idPostagem é obrigatório");
      }
      if (!this.idUsuario) {
        throw new Error("idUsuario é obrigatório");
      }
      if (!this.texto || this.texto.trim() === "") {
        throw new Error("Texto é obrigatório");
      }
      if (!this.dataComentario) {
        throw new Error("Data do comentário é obrigatória");
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
      const result = await db.collection("comentarios").insertOne({
        id: this.id,
        idPostagem: this.idPostagem,
        idUsuario: this.idUsuario,
        texto: this.texto,
        dataComentario: this.dataComentario,
      });
      console.log("Comentário inserido:", result.insertedId);
    } catch (error) {
      Logger.log("Erro ao inserir comentário: " + error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("comentarios").updateMany(filtro, {
        $set: novosDados,
      });
      console.log("Comentário atualizado!", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar comentário: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const comentarios = await db
        .collection("comentarios")
        .find(filtro)
        .toArray();
      console.log("Comentário(s) encontrado(s)!", comentarios);
      client.close();
    } catch (error) {
      Logger.log("Erro na busca de comentário(s): " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("comentarios").deleteMany(filtro);
      console.log("Comentário deletado!", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar comentário: " + error);
    }
  }
}

module.exports = Comentario;
