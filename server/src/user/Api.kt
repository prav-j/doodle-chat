package com.praveen.doodle.user

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

data class LoginRequest(
    val username: String?,
    val password: String?
)

fun Route.users(userService: UserService) {
    route("/users") {
        post {
            val user = call.receive<LoginRequest>()
            if (user.username.isNullOrEmpty() or user.password.isNullOrEmpty()) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Username and/or password blank"))
                return@post
            }
            try {
                val token = userService.signUpNewUser(
                    User(
                        id = null,
                        username = user.username!!,
                        password = user.password!!
                    )
                )
                call.respond(HttpStatusCode.Created, mapOf("username" to user.username, "token" to token))
            } catch (e: Exception) {
                println(e.message)
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Username already taken"))
            }
        }
    }
}