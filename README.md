
<!-- GETTING STARTED -->
## Nodejs Api Project

Follow the below steps to install this project:

For Local system
1. Take pull from this branch.
2. Run ``` npm install ```  This command will install all the packages.
3. Creat ``` .env ``` file and copy the env-example file
4. Then create a database and connect it by setting up the credentials according to your system in the ``` .env ``` file.
5. Run this script ``` npx sequelize-cli db:migrate ```
6. Run this script ``` npx sequelize-cli db:seed:all ```.

For Docker
1. Install Docker on your system .
2. After successful installation of docker run this command ``` docker-compose up ``` and all setup will be done by docker.
3. while docker-compose command is running if there is any error then run ``` ctrl+c ``` then ``` docker-compose down ``` and then again run ``` docker-compose up ```.

<!-- Name -->
# Project Repository
User-Notes


1.  [Sequelize](https://sequelize.org/)
2.  [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
3.  Authentication 
4.  Models
5.  Relations
6.  Migrations
7.  Controllers
8.  Helpers
9.  Validations
10. Seeders
11. Redis
12. Docker



# Node API's

### (Request type: Post)    :9000/login 

```
body: {
    "email": "test@test.com
    "password": "password"
}
```
This will return an authentication token. To access all notes api we have to pass this token in headers.


### (Request type: Post)    :9000/register 

```
body: {
    "name": "fake-name"
    "email": "test@test.com
    "password": "password"
}
```
This will create a user in data base. This api will return a object containing user and its authenticated token


### (Request type: Get)    :9000/notes 

```
headers: {
    "x-access-token": <authentication token>
} 
```
This api will return notes created by authenticated user. In this api redis is also implemented, first time when user get his/her notes it will be set in redis will expire after 30 sec. before 30 sec if user again hit this api then the notes will be get from redis otherwise it will call Database for data.


### (Request type: Get)    :9000/notes/:id 

```
headers: {
    "x-access-token": <authentication token>
} 

params : {
    "id": <Note Id>
}
```
This api will return a specific note related to authenticated user.


### (Request type: Post)    :9000/notes

```
headers: {
    "x-access-token": <authentication token>
} 

body: {
    "type" : "work" -- (this can be only ['work', 'personal'])
    "description: <description of note>
}
```
This api will create a new note for authenticated user.


### (Request type: Put)    :9000/notes/:id

```
headers: {
    "x-access-token": <authentication token>
} 

params: {
    "id" : <Note Id>
}

body: {
    "type" : "work" -- (this can be only ['work', 'personal'])  ===> optional
    "description: <description of note>   ===> optional
}
```
This api will update a specifc note data of authenticated user.



### (Request type: Del)    :9000/notes/:id

```
headers: {
    "x-access-token": <authentication token>
} 

params: {
    "id" : <Note Id>
}

```
This api will delete a specifc note data of authenticated user.


<!-- LICENSE -->
## License

This project is not licensed from any institute.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Email - tahashahid292@invozone.com

Project Link: [https://github.com/TahaInvo2022/users-notes](https://github.com/TahaInvo2022/users-notes)

<p align="right">(<a href="#top">back to top</a>)</p>

