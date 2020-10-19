package com.praveen.doodle.user

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

data class LoginRequest(
    val username: String?,
    val password: String?
) {
    fun isValid(): Boolean {
        return !username.isNullOrEmpty() and !password.isNullOrEmpty()
    }
}

fun Route.users(userService: UserService) {
    route("/users") {
        post("/sign-up") {
            val request = call.receive<LoginRequest>()
            if (!request.isValid()) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Username and/or password blank"))
                return@post
            }
            try {
                val token = userService.signUpNewUser(request.username!!, request.password!!)
                call.respond(HttpStatusCode.Created, mapOf("username" to request.username, "token" to token))
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to e.message))
            }
        }

        post("/login") {
            val request = call.receive<LoginRequest>()
            if (!request.isValid()) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Username and/or password blank"))
                return@post
            }
            try {
                val token = userService.loginUser(request.username!!, request.password!!)
                call.respond(HttpStatusCode.Created, mapOf("username" to request.username, "token" to token))
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to e.message))
            }
        }
    }
}