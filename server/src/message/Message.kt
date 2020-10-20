package com.praveen.doodle.message

import com.praveen.doodle.user.Users
import org.jetbrains.exposed.dao.id.UUIDTable

data class Message(
    val content: String,
    val sentBy: String,
    val sentAt: Long = System.currentTimeMillis()
)

object Messages : UUIDTable("messages") {
    val content = text("content")
    val user = varchar("sent_by", 100).references(Users.username)
    val sentAt = long("sent_at").default(System.currentTimeMillis())
}