package com.praveen.doodle.chat

import io.ktor.routing.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.ClosedReceiveChannelException

fun Route.initializeChatSocketHandler() {
    webSocket("/chat") {
        val handler = Handler(this)
        handler.onNewConnection()
        try {
            while (true) {
                val frame = incoming.receive()
                handler.onMessageReceived(frame)
            }
        } catch (error: ClosedReceiveChannelException) {
            // TODO: Determine what to do with this
            println("Client suddenly disconnected")
        } finally {
            handler.onConnectionClosed()
        }
    }
}