const { connect } = require("./db");
const Logger = require("./logger");

class Seguidor {
  constructor(id, idUsuario, idSeguido) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.idSeguido = idSeguido;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("seguidores").insertOne({
        id: this.id,
        idUsuario: this.idUsuario,
        idSeguido: this.idSeguido,
      });
      console.log("Seguidor inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir seguidor: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("seguidores").updateMany(filtro, {
        $set: novosDados,
      });
      console.log("Seguidor atualizado!", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar seguidor: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const seguidores = await db
        .collection("seguidores")
        .find(filtro)
        .toArray();
      console.log("Seguidor(es) encontrado(s)!", seguidores);
      client.close();
    } catch (error) {
      Logger.log("Erro na busca de seguidor(es): " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("seguidores").deleteMany(filtro);
      console.log("Seguidor deletado!", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar seguidor: " + error);
    }
  }
}

module.exports = Seguidor;
