const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const {registerUser, obtenerDatosUsuario, verificarCredenciales}=require('../consultas/consultas')
const {checkCredential, verificacionToken}=require('../middleware/middleware')

router.get("/", (req, res) => {
  res.send("Servidor en express");
});


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         rol:
 *           type: string
 *           description: The rol of the user
 *         lenguage:    
 *           type: string
 *           description: The lenguage of the user
 *       required:
 *         - email
 *         - password
 *         - rol
 *         - lenguage
 *       example:
 *        email: 4z7nR@example.com
 *        password: 123456
 *        rol: admin
 *        lenguage: en
 */

/**
 * @swagger
 * /usuarios:
 *    post:
 *      summary: crea un usuario
 *      tags: [Users]
 *      requestBody:
 *       required: true         
 *       content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *       200:
 *        description: Lista de usuarios
 *          
 */


router.post('/usuarios', checkCredential, async(req,res)=>{
    try {
        const usuario=req.body
        await registerUser(usuario)
        res.send("Usuario creado con éxito")
    } catch (error) {
        res.status(500).send(error)
    }
})


/**
 * @swagger
 * /usuarios:
 *    get:
 *      summary: Obtener todos los usuarios
 *      tags: [Users]
 *      
 *      responses:
 *       200:
 *        description: todos los usuarios
 *        content:
 *          application/json:
 *            schema:
 *             type: array
 *             items:

 *          
 */
router.get("/usuarios",  async(req,res)=>{
    try {
       /*  const token= req.header("Authorization").split("Bearer ")[1];
        const { email }=jwt.decode(token) */
        const usuario= await obtenerDatosUsuario()
        res.json(usuario)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/login', async(req, res)=>{
    try {
        const {email, password}= req.body
        await verificarCredenciales(email, password)
        const token=jwt.sign({email}, process.env.SECRET)
        res.send(token)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports= router;