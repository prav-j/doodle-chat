package com.praveen.doodle.chat

import io.ktor.routing.*
import io.ktor.websocket.*

fun Route.initializeChatSocketHandler() {
    webSocket("/chat") {
        val handler = Handler(this)
        handler.onNewConnection()
        try {
            while (true) {
                val frame = incoming.receive()
                handler.onMessageReceived(frame)
            }
        } finally {
            handler.onConnectionClosed()
        }
    }
}