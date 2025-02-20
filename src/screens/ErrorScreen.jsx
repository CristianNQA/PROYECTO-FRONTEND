import React from 'react'
import RequestEmailForm from '../components/RequestEmailForm'

const ErrorScreen = () => {
    const url = new URLSearchParams(window.location.search)
    const error = url.get('error')
    const ERRORS = {
        'RESEND_VERIFY_TOKEN': {
            title: 'no se pudo verificar tu cuenta',
            message: 'volvimos a enviar el enlace de verificacion a tu correo',
            Component: null
        },
        'REQUEST_EMAIL_VERIFY_TOKEN': {
            title: 'no se pudo verificar tu cuenta',
            message: 'debes volver a escribir tu mail para poder enviarte el correo de verificacion',
            Component: RequestEmailForm
        },
        'DEFAULT': {
            title: 'Error!',
            message: 'ocurrio un error inesperado',
            Component: null
        }
    }
    const {title, message, Component} = ERRORS[error] ? ERRORS[error] : ERRORS['DEFAULT']

    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
            {Component && <Component/>}
        </div>
    )
}


export default ErrorScreen