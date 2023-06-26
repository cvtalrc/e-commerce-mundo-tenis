import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { helpHttp } from '../../helpers/helpHttp'

export default function Payment() {
    const param = useLocation()
    console.log(param)
    console.log(param.search)
    // const { token_ws } = param
    // console.log(param.search);

    const [response, setResponse] = useState({})
    const api = helpHttp()

    useEffect(() => {
        if(param.search){
            api.get(`http://localhost:3000/api/verify-payment${param.search}`)
            .then((res) => {
                console.log(res);
                setResponse(res)
            })
            .catch((err) => {
                console.err('Error Fatal: ', err)
            })
        }
    }, [param.search])

    console.log(response);

    if(!param.search){
        return (
            <h3>Lo sentimos, el token de compra no es válido o no se ha proporcionado</h3>
        )
    }
    return (
        <div>
            <h3>Todo Bien</h3>
        </div>
    )
}