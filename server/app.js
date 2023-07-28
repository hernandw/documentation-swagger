const express= require('express')
const router=require('./routes/routes')
const cors = require('cors')


//SWagger
const swaggerUi = require('swagger-ui-express')
const swaggerJdoc = require('swagger-jsdoc')

const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SoftJobs API',
            version: '1.0.0',
            description: 'SoftJobs API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/routes.js'],
}



const app=express()
const PORT= process.env.PORT ||3000

app.use(express.json())
app.use(cors())


//middleware
app.use('/', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJdoc(swaggerSpec)))


app.listen (PORT, (req,res)=>{
    console.log(`Servidor correcto en el puerto ${PORT}`)
})