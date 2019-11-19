import React from 'react'

const LoginImage =(props)=>(
        <div>
           <div className="image-box">
                <div className="image-overlay"></div>
                <img src={props.url} alt="login" />
                <div className='image-text'>
                  <h2>Employee Managment System</h2>
                  <p className='image-text-descp'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, sunt!</p>
                </div>
              </div>
        </div>
)
export default LoginImage;