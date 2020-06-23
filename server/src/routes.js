import { Router } from 'express';

import UserController from './app/controllers/UserController';
import ProfileController from './app/controllers/ProfileController';

const routes = new Router();

/*
PARAMS  http://localhost/usuario/:id =  http://localhost/usuario/1
exemplo: const { id } = req.params
a variável id terá o valor rafael

QUERY http://localhost/usuario?nome=rafael
exemplo: const { nome } = req.query
a variável nome terá o valor rafael

BODY   quando estamos transportando dados sensíveis, extensos, etc;
       a melhor solução é utilizar o metódo POST que nos permite utilizar
       a BODY
*/

/* Rotas de acesso */

/*
 Quando o usuário digitar o path / o servidor irá retornar a seguinte mensagem:
 no navegador: 'CRUD D.S & ADV'
*/

routes.get('/', (req, res) => res.json({ message: 'CRUD D.S & ADV' }));

/*
  Metódo GET, rota /usuario/id:

  neste caso estamos dizendo que nesta rota em especifico
  poderemos utilizar a seguinte conotação:

  /usuario/1
  /usuario/1219218291821921

   --- chamamos de params ou parametros ---
*/
routes.get('/usuario/:id', UserController.index);

/*
  Metódo GET, rota /usuario:

  Neste caso estamos consumindo a rota usuario sem nenhum parametro, e
  a mesma irá listar todos os usuários, claro, limitados por 10 (paginação)
  que definimos no controller
*/
routes.get('/usuario', UserController.list);

/*
  Metódo POST, rota /usuario:

  Neste caso estamos consumindo a rota usuario passando as informações
  na body. Exemplo:

    {
          "usuario":"qualquercoisa",
          "senha":"qualquercoisa",
          "email":"qualquercoisa@gmail.com"
    }

    que será o mesmo que: req.body

*/
routes.post('/usuario', UserController.store);

/*
  Metódo PUT, rota /usuario:

  Neste caso iremos atualizar o usuário.
  O ID do usuário está sendo passado via params,
  mas pode ser passado via body também.

  neste caso quero atualizar apenas o nome do usuário
    {
      "usuario":"queroatualizarousuario",
    }
*/
routes.put('/usuario/:id', UserController.update);

/*
  Metódo DELETE, rota /usuario:

  deletar o usuário passando a ID dele como params
*/
routes.delete('/usuario/:id', UserController.delete);

routes.get('/profile', ProfileController.index);

export default routes;
