const express = require('express')
const app = express()
const cors = require('cors')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://NattanJunior:Futuromilionario1@cluster0.yyp9mj8.mongodb.net/?retryWrites=true&w=majority')
const CreateEmail = new mongoose.Schema({
    email: String,
}) ;
let Email = mongoose.model("email", CreateEmail)



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
        user:'fnatanieljunior@gmail.com',
        pass: 'jqhw hzwa akej zhqa'
        
    },
})

    //Configuração do E-mail
    const mailOptions = {
        from: 'fnatanieljunior@gmail.com', 
        to: saveEmail.email,
        subject: 'Teste',
        text: 'Teste de Envio de E-mail.',
    }

    //Enviando E-mail
    transport.sendMail(mailOptions, (err,data) => {
        if(err){
            console.error(err);
            res.status(500).json({message: 'Erro ao enviar o E-mail'})
        }else{
            console.log('E-mail enviado:' + data.response);
            res.json({message: `E-mail salvo e enviado com sucesso para: ${saveEmail.email}`, data:saveEmail })
        }
    })
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Erro ao enviar o E-mail'})
    }
});

app.listen(3000,()=>{
    console.log(`servidor escutando na porta 3000`)
})
