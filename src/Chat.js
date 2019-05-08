import React from 'react'

import Avatar from './img/avatar.png'
import Couple from './img/couple.png'

const StartChat = props => {
  return <div
    onClick={props.openBox ? () => props.sendMessage('user') : props.openMessageBox}
    className='rounded-full text-blue-dar bg-white hover:bg-blue text-blue-dark hover:text-white flex items-center text-2xl hover:text-4xl justify-center cursor-pointer border-2 border-blue-dark shadow-lg z-50'
    style={{position: 'fixed',bottom: 50, right: 30, width: '60px', height: '60px'}}>
      <i className={props.openBox ? 'fas fa-play' : 'fas fa-comment-alt'} />
  </div>
}

const MessageBox = props => {
  const chatStarted = props.messages.length > 0
  const animate = chatStarted ? 'animateChat' : ''
  return <div
    className={`shadow-lg rounded-lg flex flex-col justify-between bg-blue-dark text-white ${animate}`}
    style={{position: 'fixed',bottom: 30, right: 50, width: '400px', height: '400px'}}>
    <div className='flex justify-between' style={{ padding: chatStarted ? '15px' : '30px' }}>
      <div className='flex' style={{ fontSize: chatStarted ? '30px' : '42px' }}>
        {chatStarted && <img alt='avatar' style={{ width: '60px', height: '60px', marginRight: '20px' }} src={Couple} /> }
        <div style={{ alignSelf: 'center' }}>Witaj!</div>
      </div>
      <div onClick={props.closeMessageBox} className='rounded-full cursor-pointer self-start hover:bg-blue' style={{ padding: '5px' }}>
        <i className='fas fa-times' style={{ fontSize: '20px' }} />
      </div>
    </div>
    {chatStarted ?
      <div className='bg-white text-black border-b border-blue-dark' id='scroll' style={{ padding: '30px', overflowY: 'auto', height: '410px' }}>
        {props.messages.map((el, i) => {
          const messageClass = el.type === 'user' ? 'bg-blue float-right' : 'bg-blue-dark float-left'
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
        <div className='bg-blue' style={{ padding: '30px' }}>
          <i className='fas fa-circle' style={{ color: '#58b743', marginRight: '8px' }} />
          Pisz śmiało, jesteśmy dostępni!
        </div>
      </React.Fragment>
    }

    <div className='bg-white rounded-b-lg' style={{ width: '100%', height: '100px', padding: '30px' }}>
      <form onSubmit={(e) => {
          e.preventDefault()
          props.sendMessage('user')
        }}>
        <input type='text' value={props.message} onChange={props.handleChange} placeholder='Wpisz treść wiadomości...' style={{ outline: 'none' }}/>
      </form>
    </div>
  </div>
}


class Chat extends React.Component {
  state = {
    openBox: false,
    message: '',
    messages: []
  }
  openMessageBox = () => {
    this.setState({ openBox: true })
  }
  closeMessageBox = () => {
    this.setState({ openBox: false })
  }
  handleChange = (event) => {
    this.setState({ message: event.target.value });
  }
  sendMessage = (type) => {
    if (this.state.message.length < 1) return
    const temp = this.state.messages
    temp.push({type: type, message: this.state.message})
    this.setState({ message: '', messages: temp }, () => {
        const element = document.getElementById('scroll');
        element.scrollTop = element.scrollHeight
      }
    )
  }
  render () {
    const openBox = this.state.openBox ? 'box-show' : 'box'
    return <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={this.state.message} onChange={this.handleChange} placeholder='Wpisz treść wiadomości...' style={{ outline: 'none' }}/>
        <button onClick={() => this.sendMessage('helper')}>dodaj wiadomosc od pomocy</button>
      </form>
      <StartChat sendMessage={this.sendMessage} openBox={this.state.openBox} openMessageBox={this.openMessageBox} />

      <div className={openBox}>
        <MessageBox message={this.state.message} messages={this.state.messages} sendMessage={this.sendMessage}  handleChange={this.handleChange} openBox={this.state.openBox} closeMessageBox={this.closeMessageBox} />
      </div>

    </div>
  }
}

export default Chat
