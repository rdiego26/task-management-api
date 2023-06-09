# task-management-api
API with typescript to task management.

![TaskEntity Management](https://assets-global.website-files.com/6058ba87eec5713e5f80752a/6282f519081a58feae9b1fc4_Task-management-vs-project-management.jpeg)

### Made with:
- Open API Documentation generate with [Swagger](https://swagger.io/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [JSON Web Token](https://jwt.io/)


### Steps to run
- Solve dependencies `npm install`
- Up containers `docker-compose up`

### Available Scripts
- Run tests: `docker-compose run api npm test`


### Next steps / Comments
- Implement [migrations](https://orkhan.gitbook.io/typeorm/docs/migrations) and turn off the auto sync from typeorm.
- Remove `any` in code in order to enforce strong types
- Improve the swagger documentation(improve types, etc)
- Turns middlewares thin extracting logic into a services
- Expose endpoint to provide reports
- Generic error handle and improve error handling
