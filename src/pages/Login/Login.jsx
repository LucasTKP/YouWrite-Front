import React, { useState, useContext, useRef }from 'react'
import './Login.css'
import ImageSignIn from '../../image/imageSignIn.svg'
import IconUser from '../../image/Icons/iconUser.svg'
import IconEmail from '../../image/Icons/iconEmail.svg'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App'


export function Login() {
const {setUser} = useContext(AuthContext)
const [tradeFocusButton, setTradeFocusButton] = useState(true);
const [dataUser, setDataUser] = useState({name: "", email: "", password: "", confirmationPassword: ""});
const [eyeOn, setEyeOn] = useState(false);
const [codeOn, setCodeOn] = useState({register: false, forgetPassword: false});
const [numbersCode, setNumbersCode] = useState({number1: "", number2: "", number3: "", number4: "", number5: "", number6: ""})
const [answerAxios, setAnswerAxios] = useState()
let navigate = useNavigate();
const input1 = useRef()
const input2 = useRef()
const input3 = useRef()
const input4 = useRef()
const input5 = useRef()
const input6 = useRef()

function verifyFields() {
    if(dataUser.name === "ab" || dataUser.email === "" || dataUser.password === "" || dataUser.confirmationPassword === ""){
        alert("Complete all fields to SignUp")
        return false   
    }
    return true
}
useEffect(() => {
    if(answerAxios !== undefined){
        if(answerAxios.data.statusVerifyEmail === 200){
            setCodeOn({...codeOn, register: true})
        } else if (answerAxios.data.statusCreateUser=== 200){
            alert("Usuario criado com sucesso")
            setCodeOn(false)
            setTradeFocusButton(true)
            setDataUser({...dataUser, email: "", name: "", password: "", confirmationPassword: ""})
        } else if(answerAxios.data.statusVerifyLogin === 200){
            const token = Math.random().toString(36).substring(2)
            const bdBrowser = {token:token, name: answerAxios.data.result.name}
            setUser(JSON.stringify(bdBrowser))
            navigate('/')
            // setUser(answerAxios.data)
        } else if(answerAxios.data.statusRecoveryPassword === 200){
            setCodeOn({...codeOn, forgetPassword: true})
        } 
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[answerAxios])

async function CreateUser(event){
    event.preventDefault()
    if(verifyFields()){
        const codeUser = numbersCode.number1 + numbersCode.number2 + numbersCode.number3 + numbersCode.number4 +  numbersCode.number5 +  numbersCode.number6 
        if(toString(codeUser) === toString(answerAxios.data.code)){
            const url= "http://localhost:3333/users/create"
            const data ={
                name: dataUser.name,
                email: dataUser.email,
                password: dataUser.password,
            }
            try {
                const response = await axios.post(url, data);
                setAnswerAxios(response)
              } catch (error) {
                console.error(error);
              }
        } else {
            alert("The code of confirmation is incorrec")
        }
    }
}

async function SendCodeRegister(event){
    event.preventDefault()
    if(verifyFields()){
        if(dataUser.password === dataUser.confirmationPassword ){
            const url= "http://localhost:3333/users/verify"
            const data ={
                email: dataUser.email
            }
            try {
                const response = await axios.post(url, data);
                setAnswerAxios(response)
              } catch (error) {
                alert(error.response.data.message)
              }
        } else {
            alert("The fields of password and password confirmation are different")
        }
    }
}

async function Login(event){
    event.preventDefault()
    const url= "http://localhost:3333/users/login"
    const data ={
        email: dataUser.email,
        password: dataUser.password
    }
    try {
        const response = await axios.post(url, data);
        setAnswerAxios(response)
      } catch (error) {
        alert(error.response.data.message)
      }
}

async function SendCodeForgetPassword(){
    if(dataUser.email.length > 5){
            const url= "http://localhost:3333/users/recovery"
            const data ={
                email: dataUser.email
            }
            try {
                const response = await axios.post(url, data);
                setAnswerAxios(response)
              } catch (error) {
                alert(error.response.data.message)
              }
    } else {
        alert("Complete the field of email")
    }
}

async function VerifyCodeForgetPassword(event){
    event.preventDefault()
    const codeUser = numbersCode.number1 + numbersCode.number2 + numbersCode.number3 + numbersCode.number4 +  numbersCode.number5 +  numbersCode.number6 
    if(toString(answerAxios.data.result) === toString(codeUser)){
        navigate('/alterpassword', {state:{email: dataUser.email}})
    } else{
        alert("The code of confirmation is incorrec")
    }
}

useEffect(() => {
    if(numbersCode.number1 !== ""){
        if (numbersCode.number1.length <= 0) input1.current.focus()
        else if (numbersCode.number2.length <= 0) input2.current.focus()
        else if (numbersCode.number3.length <= 0) input3.current.focus()
        else if (numbersCode.number4.length <= 0) input4.current.focus()
        else if (numbersCode.number5.length <= 0) input5.current.focus()
        else if (numbersCode.number6.length <= 0) input6.current.focus()
    }
},[numbersCode])


  return (
    <div className="configResolution">
        {codeOn.register  || codeOn.forgetPassword
        ?   
            <button className='backgroundBoxCode'>
                <div className='boxCode'>
                    <div className='configBoxCode'>
                        {codeOn.register ? <p className='textBoxCode'>Digite o codigo que foi enviado para seu e-mail e finalize seu cadastro</p> : <></>}
                        {codeOn.forgetPassword ? <p className='textBoxCode'>Digite o codigo que foi enviado para seu e-mail e sera redirecionado para redefinir sua senha</p> : <></>}
                        <form onSubmit={codeOn.register ? CreateUser : VerifyCodeForgetPassword}>
                        <div className='divInputsCode'>
                            <input type={"text"} maxLength={1} ref={input1} autoFocus required onChange={(Text) => setNumbersCode({...numbersCode, number1: Text.target.value})}  className="inputCode"></input>
                            <input type={"text"} maxLength={1} ref={input2} required  onChange={(Text) => setNumbersCode({...numbersCode, number2: Text.target.value})} className="inputCode"></input>
                            <input type={"text"} maxLength={1} ref={input3} required  onChange={(Text) => setNumbersCode({...numbersCode, number3: Text.target.value})} className="inputCode"></input>
                            <input type={"text"} maxLength={1} ref={input4} required  onChange={(Text) => setNumbersCode({...numbersCode, number4: Text.target.value})} className="inputCode"></input>
                            <input type={"text"} maxLength={1} ref={input5} required  onChange={(Text) => setNumbersCode({...numbersCode, number5: Text.target.value})} className="inputCode"></input>
                            <input type={"text"} maxLength={1} ref={input6} required  onChange={(Text) => setNumbersCode({...numbersCode, number6: Text.target.value})} className="inputCode"></input>
                        </div>
                        <button type='submit' className='buttonCode'>Enviar</button>
                        </form>
                    </div>
                    <button onClick={() => setCodeOn(false)} className='closedBox'></button>
                </div>
            </button>
        : <></> }    
        <div className="box">
            <div className="divbuttonsBox">
                <button onClick={() => setTradeFocusButton(!tradeFocusButton)} className={tradeFocusButton ? "buttonFocusOn" : "buttonFocusOff"}>Login</button>
                <button onClick={() => setTradeFocusButton(!tradeFocusButton)} className={tradeFocusButton ? "buttonFocusOff" : "buttonFocusOn"}>Cadastrar</button>
            </div>
        
        <form className="inputsText" onSubmit={tradeFocusButton ? Login : SendCodeRegister}>
        { tradeFocusButton ?
            <>
            <img alt="Man opening one door" src={ImageSignIn} width={250} height={150}></img>
            <div className='outInput'>
                <input onChange={(text) => setDataUser({...dataUser, email: text.target.value})} value={dataUser.email} required type="email" className='input' placeholder='Digite seu email'></input>
                <img alt="icon email" src={IconEmail}></img>
            </div>

            <div className='outInput'>
                <input onChange={(text) => setDataUser({...dataUser, password: text.target.value})} value={dataUser.password} minLength={8} required type={eyeOn ?"text" : "password"}  className='input' placeholder='Digite sua senha'></input>
                {eyeOn ? <EyeOutlined onClick={() => setEyeOn(false)} className='EyeIcon'/> : <EyeInvisibleOutlined onClick={() => setEyeOn(true)} className='EyeIcon'/>}
            </div>
            <p onClick={() => SendCodeForgetPassword()} className='textForgetPassword'>Esqueci minha senha</p>
            <button className="buttonSignUp">Entrar</button>
            </>
        : 
            <>
            <div className='outInput'>
                <input  onChange={(text) => setDataUser({...dataUser, name: text.target.value})} value={dataUser.name} minLength={4} required type="text" className='input' placeholder='Digite seu nome'></input>
                <img alt="icon user" src={IconUser}></img>
            </div>

            <div className='outInput'>
                <input onChange={(text) => setDataUser({...dataUser, email: text.target.value})} value={dataUser.email} required type="email" className='input' placeholder='Digite seu email'></input>
                <img alt="icon email" src={IconEmail}></img>
            </div>

            <div className='outInput'>
                <input onChange={(text) => setDataUser({...dataUser, password: text.target.value})} value={dataUser.password} minLength={8} required type={eyeOn ?"text" : "password"}  className='input' placeholder='Digite sua senha'></input>
                {eyeOn ? <EyeOutlined onClick={() => setEyeOn(false)} className='EyeIcon'/> : <EyeInvisibleOutlined onClick={() => setEyeOn(true)} className='EyeIcon'/>}
            </div>

            <div className='outInput'>
                <input onChange={(text) => setDataUser({...dataUser, confirmationPassword: text.target.value})} value={dataUser.confirmationPassword} minLength={8} required type={eyeOn ?"text" : "password"} className='input' placeholder='Confirme sua senha'></input>
                {eyeOn ? <EyeOutlined onClick={() => setEyeOn(false)} className='EyeIcon'/> : <EyeInvisibleOutlined onClick={() => setEyeOn(true)} className='EyeIcon'/>}
            </div>
            
            
            <button type="submit" className="buttonSignUp">Cadastrar</button>
            </>
            
        }
        </form>
        </div>
    </div>
  )
}
