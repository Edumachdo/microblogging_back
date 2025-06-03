const { connect } = require("./db");

class Funcionario {
  constructor(
    id,
    nome,
    idade,
    identificacao,
    turno,
    cargo,
    departamento,
    telefone,
    salario
  ) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this["N° de identificação"] = identificacao;
    this.turno = turno;
    this.cargo = cargo;
    this.departamento = departamento;
    this.telefone = telefone;
    this.salario = salario;
  }

  async inserir() {
    try {
      const { db, client } = await connect();
      const result = await db.collection("funcionarios").insertOne({
        id: this.id,
        nome: this.nome,
        idade: this.idade,
        "N° de identificação": this["N° de identificação"],
        turno: this.turno,
        cargo: this.cargo,
        departamento: this.departamento,
        telefone: this.telefone,
        salario: this.salario,
      });
      console.log("Funcionário inserido:", result.insertedId);
      client.close();
    } catch (error) {
      console.log("Erro ao inserir funcionário:", error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("funcionarios").updateMany(filtro, {
        $set: novosDados,
      });
      console.log("Funcionário Atualizado!", result.modifiedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao atualizar Funcionário!" + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const funcionarios = await db
        .collection("funcionarios")
        .find(filtro)
        .toArray();
      console.log("Funcionário(s) Encontrado(s)!", funcionarios);
      client.close();
    } catch (error) {
      console.log("Erro na Busca de Funcionário(s)!" + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("funcionarios").deleteMany(filtro);
      console.log("Funcionário Deletado!", result.deletedCount);
      client.close();
    } catch (error) {
      console.log("Erro ao Deletar Funcionário!" + error);
    }
  }
}

module.exports = Funcionario;
