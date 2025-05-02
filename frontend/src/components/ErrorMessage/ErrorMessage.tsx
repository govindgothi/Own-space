// import React from 'react'

const ErrorMessage = ({ message }:{message:string})=> {
    return (
      <div>
        {message? message:'error'}
      </div>
    )
  }
  
  export default ErrorMessage
  