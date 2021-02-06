import socketIo from 'socket.io'

class RealtimeService {
  constructor(server, config = {}) {
    this.io = socketIo(server, config)
    this.io.on('connection', (socket) => {
      console.log('a new user connected')
      socket.on('room', (roomId) => {
        console.log(`Join room ${roomId}`)
        socket.join(roomId)
      })
    })
  }

  broadcast = (event, body) => {
    if (body) this.io.emit(event, body)
  }

  broadcast = (event, body, roomId) => {
    if (body && roomId) this.io.to(roomId).emit(event, body)
  }
}

export default RealtimeService
