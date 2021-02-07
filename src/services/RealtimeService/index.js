import socketIo from 'socket.io'

class RealtimeService {
  constructor(server, config = {}) {
    this.io = socketIo(server, config)

    this.io.on('connection', (socket) => {
      socket.on('room', (roomId) => {
        socket.join(roomId)
      })

      socket.on('chat', (body) => {
        const { message, roomId } = body

        if (message && roomId) {
          socket.broadcast.to(roomId).emit('chat', message)
        }
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
