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
require('./src/models/Status')// import status model
require('./src/models/User')// import user model
require('./src/models/Task')// import task model
const createTables = async () => {
  await sequelize.sync({ force: true })
  console.log('Tables have been created successfully. ✔ ')
}// create tables
*/
