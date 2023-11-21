const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
require('dotenv').config()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
const CreateEmail = new mongoose.Schema({
    email: String,
}) ;
let Email = mongoose.model("email", CreateEmail)

app.get('/',(req,res)=>{
    res.send('hello world')
})



app.post('/', async (req,res)=>{

    try{
        const {email} = req.body;
        const NewEmail = new Email({
        email:`${email}`

    })
    const saveEmail = await NewEmail.save();


    // Configuração do Nodemailer para o serviço SMTP do Gmail
    const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.GMAIL_USER,
        pass: process.env.PASS_USER
        
    },
})

    //Configuração do E-mail
    const mailOptions = {
        from: process.env.GMAIL_USER, 
        to: saveEmail.email,
        subject: 'Teste',
        text: 'Teste de Envio de E-mail.',
    }

    //Enviando E-mail
    transport.sendMail(mailOptions, (err,data) => {
        if(err){
            res.status(500).json({message: 'Erro ao enviar o E-mail'})
        }else{
            res.json({message: `E-mail salvo e enviado com sucesso para: ${saveEmail.email}`, data:saveEmail })
        }
    })
    }catch(err){
        res.status(500).json({message: 'Erro ao enviar o E-mail'})
    }
});

app.listen(port,()=>{
    console.log(`servidor escutando na porta ${port}`)
})

