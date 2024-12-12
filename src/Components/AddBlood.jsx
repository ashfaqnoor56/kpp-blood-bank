import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddBlood() {

    const navi = useNavigate()

    const hand=()=>{
        navi('/')
    }

  return (
    <>
    <div>AddBlood</div>
    <button onClick={hand}>home page</button>
    </>
  )
}

export default AddBlood

