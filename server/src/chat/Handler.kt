package com.praveen.doodle.chat

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.ktor.http.cio.websocket.*

enum class MessageType {
    NEW_MESSAGE,
}

class MessageFrame(
    val data: String,
    val from: String,
    val type: MessageType
)

class Handler(private val connection: DefaultWebSocketSession) {
    private val mapper = jacksonObjectMapper()

    fun onNewConnection() {
        ConnectionsManager.addConnection(connection)
    }

    fun onConnectionClosed() {
        ConnectionsManager.removeConnection(connection)
    }

    suspend fun onMessageReceived(frame: Frame) {
        if (frame is Frame.Text) {
            val text = frame.readText()
            val messageFrame = mapper.readValue<MessageFrame>(text)
            when (messageFrame.type) {
                MessageType.NEW_MESSAGE -> {
                    ConnectionsManager.broadcastMessage(text)
                }
            }
        }
    }
}