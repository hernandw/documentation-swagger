const pool=require('../db/conexion')
const bcrypt=require('bcryptjs')

const registerUser=async (usuario)=>{
    let {email, password, rol, lenguage}=usuario
    const passwordEncriptada=bcrypt.hashSync(password)
    password=passwordEncriptada
    const values=[email, passwordEncriptada,rol,lenguage]
    const consultas="INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)"
    await pool.query(consultas,values)
}

const obtenerDatosUsuario=async()=>{
    const consultas="SELECT * FROM usuarios"
    const {rows}=await pool.query(consultas)
    return rows

    }
    
const verificarCredenciales= async(email, password)=>{
    const values=[email]
    const consulta="SELECT * FROM usuarios WHERE email=$1"

    const {rows:[usuario], rowCount}=await pool.query(consulta, values)

    const {password: passwordEncriptada}= usuario
    const passwordCorrecta =bcrypt.compareSync(password, passwordEncriptada)

    if(!passwordCorrecta || !rowCount)
    throw {code:401, message:"Email o contraseña incorrecta"}
}



module.exports={
    registerUser,
    obtenerDatosUsuario,
    verificarCredenciales
}