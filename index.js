import express from 'express'
import mongoose from 'mongoose'

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}))

const app = express()

// mongoose.connect('mongodb://nico:password@localhost:27017/miapp?authSource=admin') // correr desde maquina anfitriona a contenedor docker
mongoose.connect('mongodb://nico:password@monguito:27017/miapp?authSource=admin') // correr desde un docker que este almacenado este proyecto a otro docker se cambia el localhosto por "monguito"
                                                                                    //  es el nombre del docker de la base"

app.get('/', async (_req, res) => {
  console.log('listando... chanchitos x2...')
  const animales = await Animal.find();
  return res.send(animales)
})
app.get('/crear', async (_req, res) => {
  console.log('creando...')
  await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' })
  return res.send('ok')
})

app.listen(3000, () => console.log('listening...'))
