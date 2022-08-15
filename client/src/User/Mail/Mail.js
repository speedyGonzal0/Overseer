import React, { useState } from 'react'
import "./Mail.css"
import { Input, Textarea, Button  } from '@nextui-org/react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mail = () => {

    const notify = () => {toast.success('Mail sent!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });};

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('Overseer', 'template_iwmfz7o', e.target, 'user_Cxb50mTDX9UVFFj8HJZQQ')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        e.target.reset()
        }

  return (
    <main className='mailContainer'>
        <form onSubmit={sendEmail} className="form">
            <h1>Contact Us</h1>
          <Input labelPlaceholder="Email" name="email"/>
          <Input labelPlaceholder="Username" name='username'/>
          <Input labelPlaceholder="Subject" name='subject'/>
          <Textarea labelPlaceholder="Message" name='message'/>
          <Button shadow type="submit" onClick={notify}>Send</Button>  
      </form>
        <ToastContainer />
    </main>
  )
}

export default Mail;