import React from 'react'
import "./Mail.css"
import { Input, Textarea, Button  } from '@nextui-org/react';
import emailjs from '@emailjs/browser';

const Mail = () => {

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
          <Button shadow type="submit">Send</Button>  
      </form>
    </main>
  )
}

export default Mail;