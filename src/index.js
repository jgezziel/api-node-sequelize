const app = require('./app')
const sequelize = require('./database/database')

const PORT = process.env.PORT ?? 3000

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('connection has been established successfully. ✔ ')
    app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}`))
  } catch (error) {
    console.error('Unable to connect to the database: ❌ ', error)
  }
}

main()

/*
require('./models/Status')// import status model
require('./models/User')// import user model
require('./models/Task')// import task model

const createTables = async () => {
  await sequelize.sync({ force: true })
  console.log('Tables have been created successfully. ✔ ')
}// create tables
*/

/* TODO
1.implement validator in all controllers
2.create controller for upload image in USER controller Class 230
3.implement JWT in all controllers
4.implement in controllers not repeat data in database Class 141
*/
