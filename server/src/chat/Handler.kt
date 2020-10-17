package com.praveen.doodle.chat

import io.ktor.http.cio.websocket.*

class Handler(private val connection: DefaultWebSocketSession) {
    suspend fun onNewConnection() {
        connection.send(Frame.Text("Welcome to Chat"))
        ConnectionsManager.addConnection(connection)
    }

    fun onConnectionClosed() {
        ConnectionsManager.removeConnection(connection)
    }

    suspend fun onMessageReceived(frame: Frame) {
        if (frame is Frame.Text) {
            ConnectionsManager.broadcastMessage("Client said: " + frame.readText())
        }
    }
}