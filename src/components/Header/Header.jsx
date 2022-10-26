import React, { useState } from 'react'
import './Header.css'
import { ReactComponent as IconNew } from "../../image/Icons/iconNew.svg";
import { ReactComponent as IconUser } from "../../image/Icons/iconUser2.svg";


export function Header() {

  const [humburguer, setHumburguer] = useState(true)
  console.log(humburguer)
  return (
    <div className='header'>
      <div className='outContent'>
        <p className='logo'>KurtSon</p>
        <div className={humburguer ? 'divButtons' :  'divButtonsCell'}>
          <a><button className='buttonHeader' ><IconUser  className='iconButtonHeader'/> <p className='textButtonHeader'>Profile</p></button></a>
          <a><button className='buttonHeader'><IconNew  className='iconButtonHeader'/> <p className='textButtonHeader'>Profile</p></button></a>
        </div>
        <div className={humburguer ? 'humburguerOn': 'humburguerOff'} onClick={() => setHumburguer(!humburguer)}></div>
      </div>
    </div>
  )
}