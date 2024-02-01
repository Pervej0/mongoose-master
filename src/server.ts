import mongoose from 'mongoose'
import app from './app'
import config from './app/config'
import { Server } from 'http'
import createSuperAdmin from './app/DB'
let server: Server

const main = async () => {
  try {
    await mongoose.connect(config.url as string)

    createSuperAdmin()
    app.listen(config.port, () => {
      console.log('The Server Is Running On Port', config.port)
    })
  } catch (error) {
    console.log(error)
  }
}
main()

// unhandledRejection and uncaughtException error handling--
process.on('unhandledRejection', () => {
  console.log('unhandledRejection error detected, server is shutting down!')

  if (server) {
    server.close()
    process.exit(1)
  } else {
    process.exit(1)
  }
})

process.on('uncaughtException', () => {
  console.log('UncaughtException error detected, server is shutting down!')
  process.exit(1)
})
