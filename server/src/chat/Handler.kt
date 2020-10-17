package com.praveen.doodle.chat

import io.ktor.http.cio.websocket.*

class Handler(private val connection: DefaultWebSocketSession) {
    suspend fun onNewConnection() {
        connection.send(Frame.Text("Welcome to Chat"))
    }

    fun onConnectionClosed() {
    }

    suspend fun onMessageReceived(frame: Frame) {
        if (frame is Frame.Text) {
            connection.send(Frame.Text("Client said: " + frame.readText()))
        }
    }
}