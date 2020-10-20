package com.praveen.doodle.message

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.fetchRecentMessages(messageService: MessageService) {
    route("/messages") {
        get {
            val since = call.request.queryParameters["since"]?.toLongOrNull()
            val messages = messageService.fetchRecentMessages(since)
            call.respond(messages)
        }
    }
}