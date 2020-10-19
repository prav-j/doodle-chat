package com.praveen.doodle.message

import com.praveen.doodle.database.Database.dbQuery
import com.praveen.doodle.user.UserService
import org.jetbrains.exposed.sql.insert

class MessageService {
    suspend fun saveMessage(message: Message) {
        dbQuery {
            Messages.insert {
                it[this.content] = message.content
                it[this.user] = message.sentBy
            }
        }
    }
}