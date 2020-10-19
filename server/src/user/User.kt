package com.praveen.doodle.user

import org.jetbrains.exposed.dao.id.UUIDTable

object Users : UUIDTable("users") {
    val username = varchar("name", 255).uniqueIndex()
    val password = varchar("password", 255)
}