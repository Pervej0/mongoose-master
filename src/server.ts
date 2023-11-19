import mongoose from 'mongoose'
import app from './app'
import config from './app/config'

const main = async () => {
  try {
    await mongoose.connect(config.url as string)
    app.listen(config.port, () => {
      console.log('The Server Is Running On Port', config.port)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
