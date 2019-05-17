import React, { useState } from 'react'

import Avatar from './img/avatar.png'
import Couple from './img/couple.png'

const StartChat = ({openBox, sendMessage, openMessageBox}) => {
  return <div
    onClick={openBox ? () => sendMessage('user') : openMessageBox}
    className='rounded-full bg-white hover:bg-blue-500 text-blue-600 hover:text-white flex items-center text-2xl hover:text-4xl justify-center cursor-pointer border-2 border-blue-600 shadow-lg z-50'
    style={{position: 'fixed',bottom: 50, right: 30, width: '60px', height: '60px'}}>
      <i className={openBox ? 'fas fa-play' : 'fas fa-comment-alt'} />
  </div>
}

const MessageBox = ({message, messages, sendMessage, setMessage, openBox, closeMessageBox}) => {
  const chatStarted = messages.length > 0
  const animate = chatStarted ? 'animateChat' : ''
  return <div
    className={`shadow-lg rounded-lg flex flex-col justify-between bg-blue-600 text-white ${animate}`}
    style={{position: 'fixed', bottom: 50, right: 50, width: '400px', height: '410px'}}>
    <div className='flex justify-between' style={{ padding: chatStarted ? '15px' : '30px' }}>
      <div className='flex' style={{ fontSize: chatStarted ? '30px' : '42px' }}>
        {chatStarted && <img alt='avatar' style={{ width: '60px', height: '60px', marginRight: '20px' }} src={Couple} /> }
        <div style={{ alignSelf: 'center' }}>Witaj!</div>
      </div>
      <div onClick={closeMessageBox} className='rounded-full cursor-pointer self-start hover:bg-blue-500' style={{ padding: '5px' }}>
        <i className='fas fa-times' style={{ fontSize: '20px' }} />
      </div>
    </div>
    {chatStarted ?
      <div className='bg-white text-black border-b border-blue-600' id='scroll' style={{ padding: '30px 30px 5px 30px', overflowY: 'auto', height: '410px' }}>
        {messages.map((el, i) => {
          const messageClass = el.type === 'user' ? 'bg-blue-500 float-right' : 'bg-blue-600 float-left'
          return <div key={i}>
            <div className={`rounded-lg text-white ${messageClass}`} style={{ padding: '5px 10px', marginBottom: '10px', maxWidth: '200px' }}>
              {el.message}
            </div>
            <div className='clearfix' />
          </div>
        })
        }
      </div>
      :
      <React.Fragment>
        <div className='flex justify-between' style={{ padding: '32px 30px 0 30px' }}>
          <div style={{ lineHeight: '22px' }}>Potrzebujesz pomocy? Masz jakieś pytania? Chętnie odpowiemy</div>
          <img alt='couple' style={{ width: '100px', height: '100px' }} src={Avatar} />
        </div>
        <div className='bg-blue-500' style={{ padding: '30px' }}>
          <i className='fas fa-circle' style={{ color: '#58b743', marginRight: '8px' }} />
          Pisz śmiało, jesteśmy dostępni!
        </div>
      </React.Fragment>
    }

    <div className='bg-white rounded-b-lg text-gray-900' style={{ width: '100%', height: '100px', padding: '30px' }}>
      <form onSubmit={(e) => {
          e.preventDefault()
          sendMessage('user')
        }}>
        <input type='text' value={message} onChange={e => setMessage(e.target.value)} placeholder='Wpisz treść wiadomości...' style={{ outline: 'none' }}/>
      </form>
    </div>
  </div>
}

function Chat() {
  const [openBox, toggleBox] = useState(false)
  const [message, setMessage] = useState('')
  const [helpMessage, setHelpMessage] = useState('')
  const [messages, pushMessage] = useState([])

  function sendMessage(type) {
    const newMessage = type === 'user' ? message : helpMessage
    if (newMessage.length < 1) return
    pushMessage([...messages, {type: type, message: newMessage}])
    if (type === 'user') setMessage('')
    else setHelpMessage('')
    setTimeout(() => {
      const element = document.getElementById('scroll')
      if (element) element.scrollTop = element.scrollHeight
    }, 300)
  }
  const showBox = openBox ? 'boxvisible' : 'boxhidden'
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={helpMessage} onChange={e => setHelpMessage(e.target.value)} placeholder='Wpisz treść wiadomości...' style={{ outline: 'none' }}/>
        <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded' onClick={() => sendMessage('helper')}>dodaj wiadomosc od pomocy</button>
      </form>
      <StartChat sendMessage={sendMessage} openBox={openBox} openMessageBox={() => toggleBox(true)} />
      <div className={showBox}>
        <MessageBox message={message} messages={messages} sendMessage={sendMessage} setMessage={setMessage} openBox={openBox} closeMessageBox={() => toggleBox(false)} />
      </div>
    </div>
  )
}

export default Chat
