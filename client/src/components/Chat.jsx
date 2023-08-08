import React, { useEffect } from 'react'
import { useState } from 'react'

function Chat({socket, username, room}) {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    useEffect(() => {   
        socket.on('messageReturn', (data) => {
            setMessageList((prev) => [...prev, data])
        })
    }, [socket])

    const sendMessage = async () => {
        const messageContent  = {
            username: username,
            room: room,
            message: message,
            date: new Date(Date.now).getHours + ':' + new Date(Date.now).getMinutes
        }
        await socket.emit('message', messageContent)
        setMessageList((prev) => [...prev, messageContent])
        setMessage('')
    }

    console.log("messageList", messageList)
  return (
    <div className='flex items-center justify-center h-full'>
        <div className='w-1/3 h-[95vh] bg-gray-800 rounded-xl relative'>
            <div className='w-full h-16 bg-gray-700 flex items-center p-2 rounded-tr-xl rounded-tl-xl'>
                <div className="w-12 h-12 bg-white rounded-full"></div>
            </div>
            <div className="w-full h-[800px] overflow-y-auto">
                {
                    messageList && messageList.map((msg, i) => (

                        <div className={`${username == msg.username ?  'flex justify-end' : ''}`}>
                            <div className={`${username == msg.username ? 'bg-green-800' : 'bg-red-800'} w-2/3 h-12  text-white text-sm m-2 rounded-xl rounded-bl-none p-2`}>
                                <div>{msg.message}</div>
                                    <div className='w-full flex justify-end text-xs'>{msg.username}</div>
                                </div>
                        </div>
                        
                    ))
                }

            </div>
            <div className='absolute bottom-0 left-0 w-full'>
                <input value={message} onChange={e => setMessage(e.target.value)} className='w-5/6 h-12 border bg-gray-700 border-red-800 p-3 outline-none rounded-bl-xl text-white' type="text" placeholder='Mesaj...'/>
                <button onClick={sendMessage} className='w-1/6 tracking-wider hover:opacity-80 bg-gray-700 border border-red-800 h-12 text-white rounded-br-xl'>Gönder</button>
            </div>
        </div>
    </div>
  )
}

export default Chat

