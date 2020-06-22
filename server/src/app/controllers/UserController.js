import * as Yup from 'yup';
import User from '../models/User';

/*
 Schema Validation

 Validação do schema que chega atráves da API, na body,
 solicitando alguma ação que vem pela request.

 Neste caso em especifico; estamos dizendo que a body deve ser do tipo objeto
 e deve conter os itens:

 usuario do tipo string, obrigatório, maximo de 50 caracteres
 senha do tipo string, obrigatória, maximo de 10 caracteres
 email do tipo string, obrigatório, máximo de 50 caracteres e precisa ser do tipo email
*/

const userSchema = Yup.object().shape({
  usuario: Yup.string()
    .required()
    .max(50),
  senha: Yup.string()
    .required()
    .max(10),
  email: Yup.string()
    .email()
    .required(50),
});

class UserControler {
  /* estamos utilizando async para pode utilizar o mongoose com async/await */

  /*
    STORE - utilizado para cadastrar o usuário no banco de dados
    utilizando o metódo POST
  */
  async store(req, res) {
    /*
      try/catch é necessario quando estamos trabalhando com código assincrono.
      do contrário, se der erro na aplicação não conseguiremos dizer a origem.
    */
    try {
      /*
       Validação do esquema definido lá no inicio.
        'se o esquema que vem na body se enquadrar com o esquema que foi definido
        então ele continua, do contrário, avisa que deu erro ao validar as informações'

        objeto esperado
        {
          "usuario":"qualquercoisa",
          "senha":"qualquercoisa",
          "email":"qualquercoisa@gmail.com"
        }

        */

      if (!(await userSchema.isValid(req.body))) {
        return res
          .status(401)
          .json({ error: 'Erro ao validar as informações' });
      }

      /*
        Estamos acessando o model User/Usuário e solicitando a busca de um único registro
        findOne - busca um, acha um, etc -- passando o campo email e passando o email que vem
        da body, ou seja, req.body são os dados que o usuário enviou.
       */

      const userExists = await User.findOne({ email: req.body.email })
        .lean()
        .exec();

      /* Se esse email estiver cadastrdo o usuário não pode continuar com o cadastro */

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Esse e-mail já está cadastrado' });
      }

      /*
       Quando todas as metricas foram realizadas e tudo está de acordo com o esperado,
        podemos criar o usuário.
      */

      const user = await User.create(req.body);

      /* E aqui estamos retorno o usuário criado */

      return res.json(user);
    } catch (err) {
      /*
       Caso apresente qualquer erro: lógica, api offline, etc  <div className="">
        iremos capturá-lo aqui e retornar com o status 400
       */

      return res.status(400).json({ error: err.message });
    }
  }

  /*
    LIST - utilizado para listar todos os registros encontrados.
    utilizando o metódo GET
  */

  async list(req, res) {
    try {
      /*
       Como o próprio nome já diz: "find all" -- estamos procurando todos os registros
       de usuário; definindo o tamanho de 10 registros (paginação)
      */

      const users = await User.find({})
        .limit(10)
        .lean()
        .exec();

      return res.json(users);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /*
    INDEX - utilizado para listar uma única informação no banco de dados, ou melhor,
    um registro singular.

    utilizando o metódo GET
  */

  async index(req, res) {
    try {
      /*
       Realizando a busca por um usuário espeicifico passando a ID do memso.
       ID registro único que o usuário possuí no banco de dados
      */
      const user = await User.findById(req.params.id);

      /*
       Se o usuário não existir, devemos informar uma mensagem de erro.
      */

      if (!user) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      /*
       Retorna o usuário solicitado.
      */
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /*
    UPDATE - utilizado para atualizar alguma informação no banco de dados
    utilizando o metódo PUT da API
  */

  async update(req, res) {
    try {
      /*
        Estamos bucando o usuário no banco de dados passando a sua ID
      */
      const userExists = await User.findById(req.params.id);

      /*
       Se o usuário não existir, -- porque não foi cadatrados ou foi excluído --,
       devemos avisar que este usuário não existe mais
      */
      if (!userExists) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      /*
        Aqui iremos fazer as alterações no usuário encontrado.
         Neste caso passei todas as informações que estão vindo da BODY,
         mas poderia escolher uma única informação.
      */

      const user = await userExists
        .update(req.body)
        .lean()
        .exec();

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  /*
    DELETE - deletar o usuário
    utilizando o metódo DELETE da API
  */
  async delete(req, res) {
    try {
      const userExists = await User.findById(req.params.id);

      if (!userExists) {
        return res.json(400).json({ error: 'Usuário não encontrado' });
      }

      await User.deleteMany({ _id: req.params.id });

      return res.json('Usuário deletado com sucesso');
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UserControler();
