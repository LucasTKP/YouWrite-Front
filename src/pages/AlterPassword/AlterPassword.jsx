import React, {useState} from 'react'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './AlterPassword.css'
import ImageForgetPassword from '../../image/imageForgetPassword.svg'
import axios from 'axios'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export function AlterPassword() {
const [dataUser, setDataUser] = useState({password: "", confirmationPassword: ""});
const [eyeOn, setEyeOn] = useState(false);
const [answerAxios, setAnswerAxios] = useState()
const location = useLocation()
let navigate = useNavigate();
async function TradePassword(event){
        const url="https://youwrite-back-production.up.railway.app/users/alterpassword"
        event.preventDefault()
        if(dataUser.password === dataUser.confirmationPassword){
            const data = {
                email: location.state.email,
                password: dataUser.password
            }
            try{
                const response = await axios.put(url, data)
                setAnswerAxios(response)
            } catch(error) {
                alert(error)
            }
        } else {
            alert("The filds of password and confirmation password are incorrecs")
        }
}

useEffect(() => {
    if(answerAxios !== undefined){
        if(answerAxios.data.statusAlterPassword === 200){
            alert(answerAxios.data.message)
            navigate('/login')
        }
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[answerAxios])

useEffect(() => {
 if (location.state === null) navigate('/login')
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <div className='configAlterPassword'>
        <div className='boxAlterPassword'>
            <div className='marginGeneral'>
                <p className='titlePage'>Trade you password and make login again</p>
        
                <form className="inputsTextAlterPassword" onSubmit={TradePassword}>
                    <img alt="Man opening one door" src={ImageForgetPassword} width={250} height={150}></img>

                    <div className='outInputAlterPassword'>
                        <input onChange={(text) => setDataUser({...dataUser, password: text.target.value})} minLength={8} value={dataUser.password} required type={eyeOn ?"text" : "password"}  className='inputAlterPassword' placeholder='Digite sua senha'></input>
                        {eyeOn ? <EyeOutlined onClick={() => setEyeOn(false)} className='EyeIcon'/> : <EyeInvisibleOutlined onClick={() => setEyeOn(true)} className='EyeIcon'/>}
                    </div>

                    <div className='outInputAlterPassword'>
                        <input onChange={(text) => setDataUser({...dataUser, confirmationPassword: text.target.value})} minLength={8} value={dataUser.confirmationPassword} required type={eyeOn ?"text" : "password"}  className='inputAlterPassword' placeholder='Digite sua senha'></input>
                        {eyeOn ? <EyeOutlined onClick={() => setEyeOn(false)} className='EyeIcon'/> : <EyeInvisibleOutlined onClick={() => setEyeOn(true)} className='EyeIcon'/>}
                    </div>
                    <button className="buttonTrade">Trocar</button>
                    </form>
            </div>
        </div>
    </div>
  )
}
