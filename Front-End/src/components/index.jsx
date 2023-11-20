import './index.scss'
import logo from '../assets/logo.svg'
import read from '../assets/read_news 1.png' 
import send from '../assets/send.svg'
import arrow from '../assets/arrow-right.svg'
import axios from 'axios'
import { useState } from 'react'

export function Index(){
  const [email,setEmail] = useState('')

  const handleButton = async (e)=>{
    e.preventDefault()
    try{
        const response = await axios.post('https://rocket-news-pi.vercel.app/',
        {email},
        {
            headers: {'Content-Type': 'application/json'}
        }
    )
    console.log(response.data)
    }catch(err){
        console.error(err)
    }
    
  }
    return(
        <>
        <div className='img-read'><img src={read} alt="" /></div>
        

        <main className='container-1'>
        <img src={logo} alt="" className='logo'/> 
        <h2>atualize ideias e informações em 5 minutos.</h2>
        <h3>tudo que você precisa saber para começar seu dia bem informado </h3>
        <p className='description'>noticias sobre o universo da Programação, e tudo oque precisa para começar o dia melhor. <br /> perfeito para se preparar para codar</p>
        

        <div className='input-login'>
        <form action="/" >
            <label htmlFor="email">Insira seu e-mail:</label>
            <input type="text" name="email" id="email" required placeholder='exemplo@gmail.com'onChange={(e)=> setEmail(e.target.value)}/>
            <button type='submit' onClick={handleButton}><img src={send} alt="" /></button>
        </form>
        </div>
        <p className='link-para-ler'><a href="#">deixe-me ler primeiro <img src={arrow} alt="" /></a></p>
        
        </main>
        
        
        </>

    )
}