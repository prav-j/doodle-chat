package com.praveen.doodle.user

import io.ktor.application.*
import io.ktor.auth.*
import org.jetbrains.exposed.dao.id.UUIDTable
import java.util.*

val ApplicationCall.user get() = authentication.principal<User>()
data class User(val id: UUID, val username: String) : Principal

object Users : UUIDTable("users") {
    val username = varchar("name", 255).uniqueIndex()
    val password = varchar("password", 255)
}