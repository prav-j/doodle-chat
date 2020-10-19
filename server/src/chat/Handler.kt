package com.praveen.doodle.chat

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import com.praveen.doodle.chat.ConnectionsManager.broadcastMessage
import com.praveen.doodle.message.Message
import com.praveen.doodle.message.MessageService
import com.praveen.doodle.utils.JwtUtils
import io.ktor.http.cio.websocket.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

enum class MessageType {
    NEW_MESSAGE,
}

class MessageFrame(
    val data: String,
    val token: String,
    val type: MessageType
)

class Handler(
    private val messageService: MessageService,
    private val connection: DefaultWebSocketSession
) {
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
            val sentBy = JwtUtils.getUsername(messageFrame.token)
            if (sentBy.isNullOrEmpty()) {
                // TODO: Send user a message that they are no longer authenticated
                return
            }
            val message = Message(messageFrame.data, sentBy)
            messageService.saveMessage(message)
            when (messageFrame.type) {
                MessageType.NEW_MESSAGE -> {
                    withContext(Dispatchers.IO) {
                        broadcastMessage(mapper.writeValueAsString(message))
                    }
                }
            }
        }
    }
}