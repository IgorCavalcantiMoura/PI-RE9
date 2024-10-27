# 📌 Plataforma de Vagas de Emprego RE9
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/platform-NestJS-red?style=for-the-badge&logo=nestjs"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white">
</p>

```geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 1,
      "properties": {
        "ID": 0
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -90,
              35
            ],
            [
              -90,
              30
            ],
            [
              -85,
              30
            ],
            [
              -85,
              35
            ],
            [
              -90,
              35
            ]
          ]
        ]
      }
    }
  ]
}
```

Esta é uma plataforma para o cadastro e busca de vagas de emprego, desenvolvida para a empresa Re9Ação Soluções Integradas. O objetivo principal é informatizar o processo de recrutamento e seleção, priorizando a proximidade entre os candidatos e as empresas com base na localização.



## 🚀 Funcionalidades
- 📇 Cadastro de empresas com suas informações, incluindo endereço e CEP.
- 📝 Empresas podem cadastrar vagas de emprego com detalhes sobre o cargo, requisitos e local de trabalho.
- 👤 Candidatos podem se registrar na plataforma e buscar vagas de emprego.
- 📍 Busca de vagas por localização com base no CEP, utilizando a distância como critério principal.
- 🔒 Autenticação e autorização de usuários usando JWT.
- 🔐 Criptografia de senhas com bcrypt para maior segurança.



## 🛠️ Tecnologias Utilizadas
- Back-end: Nest.js
- Banco de Dados: MySQL
- Autenticação: Passport.js, JWT, bcrypt
- API de Geolocalização: Awesome API (para conversão de CEP em coordenadas de latitude e longitude)

## ⚙️ Configuração do Ambiente

 1- Clone o repositório:
```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
cd nome-do-repositorio

2- Instale as dependências:
```
npm install
```
3- Configure o arquivo .env: Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=nome_do_banco

```
4- Inicie o servidor:
```
npm run start
```
<br>

> [!NOTE]
> O servidor será executado em http://localhost:3000.

<br>

## 🤝 Como Contribuir

1- Faça um fork do projeto.

2- Crie uma nova branch para a sua funcionalidade (git checkout -b 
minha-nova-funcionalidade).

3 -Faça o commit das suas alterações (git commit -am 'Adiciona nova funcionalidade').

4- Faça push para a branch (git push origin minha-nova-funcionalidade).

5- Crie um novo Pull Request.

## 📜 Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
