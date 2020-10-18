package com.praveen.doodle.user

import org.jetbrains.exposed.dao.id.UUIDTable
import java.util.*

data class User(
    val id: UUID,
    val username: String,
    val password: String?,
)

object Users : UUIDTable("users") {
    val username = varchar("name", 255).uniqueIndex()
    val password = varchar("password", 255)
}