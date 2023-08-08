import React from 'react'

function Room({username,room,setUsername,setRoom,setChatScreen,socket}) {

    const sendRoom = () => {
        socket.emit('room', room)
        setChatScreen(true)
    }

  return (
    <div className='flex items-center justify-center h-full'>
        <div className='w-1/5 h-[30vh] bg-gray-800 flex flex-col space-y-4 p-3 rounded-xl'>
            <h1 className='font-bold text-2xl text-center text-white my-4'>Sapsapa hoş geldiniz.</h1>
            <input value={username} onChange={e => setUsername(e.target.value)} className='h-12 rounded-xl p-3 outline-none' type='text' placeholder='Kullanıcı Adı'></input>
            <input value={room} onChange={e => setRoom(e.target.value)} className='h-12 rounded-xl p-3 outline-none' type='text' placeholder='Oda Numarası'></input>
            <div onClick={sendRoom} className='tracking-wider hover:opacity-80 bg-gray-700 border border-red-800 h-12 pt-2 text-xl text-center text-white rounded-xl'>Bağlan</div>
        </div>
    </div>
  )
}

export default Room