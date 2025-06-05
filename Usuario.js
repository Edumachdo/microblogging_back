const { connect } = require("./db");
const Logger = require("./logger");

class Usuario {
  constructor(id, nome, email, senha, dataCriacao) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = dataCriacao;
  }

  validar() {
    try {
      if (!this.nome || this.nome.trim() === "") {
        throw new Error("Nome é obrigatório");
      }
      if (!this.email || this.email.trim() === "") {
        throw new Error("Email é obrigatório");
      }
      if (!this.senha || this.senha.trim() === "") {
        throw new Error("Senha é obrigatória");
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
      const result = await db.collection("usuarios").insertOne({
        id: this.id,
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        dataCriacao: this.dataCriacao,
      });
      console.log("Usuário inserido:", result.insertedId);
    } catch (error) {
      Logger.log("Erro ao inserir usuário: " + error);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").updateMany(filtro, {
        $set: novosDados,
      });
      console.log("Usuário atualizado!", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar usuário: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const usuarios = await db.collection("usuarios").find(filtro).toArray();
      console.log("Usuário(s) encontrado(s)!", usuarios);
      client.close();
    } catch (error) {
      Logger.log("Erro na busca de usuário(s): " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").deleteMany(filtro);
      console.log("Usuário deletado!", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar usuário: " + error);
    }
  }
}

module.exports = Usuario;
