package com.praveen.doodle.message

import com.praveen.doodle.user.Users
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.`java-time`.datetime
import java.time.LocalDateTime
import java.util.*

data class Message(
    val content: String,
    val sentBy: String,
    val sentAt: Date = Date()
)

object Messages : UUIDTable("messages") {
    val content = text("content")
    val user = varchar("sent_by", 100).references(Users.username)
    val sentAt = datetime("sent_at").default(LocalDateTime.now())
}