package com.praveen.doodle.message

import com.praveen.doodle.database.Database.dbQuery
import com.praveen.doodle.user.UserService
import org.jetbrains.exposed.sql.insert

class MessageService(private val userService: UserService) {
    suspend fun saveMessage(message: Message) {
        val user = userService.getUserByUsername(message.sentBy) ?: return
        dbQuery {
            Messages.insert {
                it[this.content] = message.content
                it[this.user] = user.id
            }
        }
    }
}