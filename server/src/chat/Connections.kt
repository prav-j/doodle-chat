package com.praveen.doodle.chat

import io.ktor.http.cio.websocket.*
import java.util.*
import kotlin.collections.LinkedHashSet

object ConnectionsManager {
    private val connections by lazy { Collections.synchronizedSet(LinkedHashSet<DefaultWebSocketSession>()) }

    fun addConnection(connection: DefaultWebSocketSession) {
        connections += connection
    }

    fun removeConnection(connection: DefaultWebSocketSession) {
        connections -= connection
    }

    suspend fun broadcastMessage(message: String) {
        for(connection in connections){
            connection.outgoing.send(Frame.Text(message))
        }
    }
}