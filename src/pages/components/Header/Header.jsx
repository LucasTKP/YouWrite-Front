import React from 'react'
import './Header.css'
import IconNew from '../../../image/Icons/iconNew.svg'
import { ReactComponent as IconUser } from "../../../image/Icons/iconUser2.svg";

export function Header() {
  return (
    <div className='header'>
      <div className='outContent'>
        <p className='logo'>KurtSon</p>
        <div className='divButtons'>
          <a><button className='buttonHeader'><IconUser  className='iconButtonHeader'/><p className='textButtonHeader'>Profile</p></button></a>
          <a><button className='buttonHeader'><img src={IconNew} className='iconButtonHeader'></img><p className='textButtonHeader'>Profile</p></button></a>
        </div>
      </div>
    </div>
  )
}
