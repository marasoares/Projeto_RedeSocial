### Rede Social

##### Postgres + NestJS + TypeScript + Prisma + JWT

Nesse projeto, criamos uma API replicando o Twitter para controle de tweets e seguidores, utilizando o NestJS, para isso, iniciamos com a criação da pasta do projeto através do comando `nest new projeto_redesocial` .

Foram criadas na pasta `src` as subpastas abaixo onde utilizamos o comando `nest generate resource nomedasubpasta` :

- Seguidores
- Seguindo
- Tweet
- Usuario

Dessa forma, criamos o CRUD padrão em todas as subpastas.

Em seguida instalamos o Prisma através do comando: `npm install prisma --save-dev` e utilizamos o `npx prisma init`para iniciar o Prisma.

Para controle das informações inseridas, utilizamos o `schema.prismma` para cada pasta, para um `dto` padrão e completo, de acordo com o código abaixo, fazendo a interação One to Many entre as tabelas: 

```javascript
model Seguidores {
  id            Int             @default(autoincrement()) @id
  idSeguidor    Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```



```javascript
model Seguindo {
  id            Int             @default(autoincrement()) @id
  idSeguindo    Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```



```javascript
model Tweet{
  id            Int             @default(autoincrement()) @id
  texto         String
  emoji         String
  data_postagem DateTime        @default(now())   @map(name: "data_postagem")
  curtidas      Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```



```javascript
model Usuario {
  id            Int             @default(autoincrement()) @id
  nome          String          
  email         String          
  imagem        String
  bio           String
  nascimento    String
  seguidores    Seguidores[]
  seguindo      Seguindo[]
  criado_em     String        
  modificado_em String        
  tweet         Tweet[] 
}

```

Após criada a model utilizamos o comando: `npx prisma generate` para atualização do banco de dados.

Em seguida utilizamos o comando `npx prisma db push` para  subir as informações para o Postgres.

Como estamos utilizando o Prisma, podemos testar a inclusão de dados nas tabelas utilizando `npx prisma studio`.

Instalamos também o `npm install @prisma/client` para manipulação dos dados nas tabelas.



#### Rotas e Endpoints

Para uma melhor documentação do Projeto, utilizamos o Swagger para a visualização das rotas e de seus endpoints. Para isso instalamos o Swagger através do comando `npm install --save @nestjs/swagger swagger-ui-express`, onde o usuário pode testar cada rota do CRUD, desde que informe os dados conforme a model de cada tabela.

Por exemplo, na rota Usuario, utilizamos o Swagger da seguinte forma, no navegador digitamos: localhost:3000/api, que irá nos apresentar a página abaixo:

![image-20220102003212345](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220102003212345.png)

Dessa forma também é demonstrado todos os endpoints das Rotas e subrotas necessárias para o Projeto.

É possível testar cada endpoint no Swagger, verificar se o mesmo está fazendo a inserção dos dados no banco de dados, no nosso caso, no Postgres, conforme abaixo:

![image-20220102001646335](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220102001646335.png)

Por estarmos inserindo um dado novo na tabela o parâmetro utilizado é que as informações venham do `body` utilizando a `application/json`.

Em seguida temos a opção de executar ou limpar as informações do body e a resposta, conforme abaixo:

![image-20220102002201024](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220102002201024.png)

Pode ser observado que, caso as informações inseridas não estejam totalmente iguais a model da rota ao clicar em execute temos um HttpCode 400, conforme abaixo::

![image-20220102002648330](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220102002648330.png)

Como estamos utilizando o JWT nesse Projeto, o usuário criado no Swagger não tem um token válido, logo precisamos primeiro criar o login para esse usuário. Dessa forma criamos a pasta Usuarios, que ficou responsável por toda criação e validação desse login, apresentando essa informação no ThunderClient:

```javascript
model Usuarios {
  nomeUsuario   String          @unique
  senha         String
}

```

Para fazer esse teste utilizamos o endereço: http://localhost:3000/usuario

Para rodar o projeto utilize o comando: `npm run start:dev` 



Projeto elaborado pelos alunos: Mara Paula Soares e Flávio Teston

BlueEdtech