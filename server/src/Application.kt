package com.praveen.doodle

import com.fasterxml.jackson.databind.SerializationFeature
import com.praveen.doodle.chat.initializeChatSocketHandler
import com.praveen.doodle.database.Database
import com.praveen.doodle.message.MessageService
import com.praveen.doodle.message.fetchRecentMessages
import com.praveen.doodle.user.UserService
import com.praveen.doodle.user.users
import com.praveen.doodle.utils.JwtUtils
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.auth.jwt.*
import io.ktor.client.*
import io.ktor.client.features.auth.*
import io.ktor.client.features.json.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.http.cio.websocket.*
import io.ktor.jackson.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.websocket.*
import kotlinx.coroutines.runBlocking
import java.time.Duration

fun main() {
    embeddedServer(
        Netty,
        module = Application::module
    ).apply { start(wait = true) }
}

fun Application.module(test: Boolean = false) {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(15)
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    install(ContentNegotiation) {
        jackson {
            enable(SerializationFeature.INDENT_OUTPUT)
        }
    }

    HttpClient {
        install(Auth) {
        }
        install(JsonFeature) {
            serializer = GsonSerializer()
        }
        install(CORS) {
            anyHost()
            header(HttpHeaders.Authorization)
            header(HttpHeaders.ContentType)
        }
    }

    runBlocking {
        // Sample for making a HTTP Client request
        /*
        val message = client.post<JsonSampleClass> {
            url("http://127.0.0.1:8080/path/to/endpoint")
            contentType(ContentType.Application.Json)
            body = JsonSampleClass(hello = "world")
        }
        */
    }

    if (!test) {
        Database.init()
    }
    val userService = UserService()
    val messageService = MessageService()

    install(Authentication) {
        jwt {
            verifier(JwtUtils.verifier)
            validate {
                val user = it.payload
                    .getClaim("username")
                if (user.isNull) null else userService.getUserByUsername(user.asString())
            }
        }
    }

    routing {
        get("/") {
            call.respondText("HELLO WORLD!", contentType = ContentType.Text.Plain)
        }

        initializeChatSocketHandler(messageService)
        users(userService)

        authenticate {
            fetchRecentMessages(messageService)
        }
    }
}