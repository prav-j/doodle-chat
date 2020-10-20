package com.praveen.doodle.message

import com.praveen.doodle.database.Database.dbQuery
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll

class MessageService {
    suspend fun saveMessage(message: Message) {
        dbQuery {
            Messages.insert {
                it[this.content] = message.content
                it[this.user] = message.sentBy
                it[this.sentAt] = message.sentAt
            }
        }
    }

    suspend fun fetchRecentMessages(since: Long?): List<Message> {
        return dbQuery {
            val messages = (if (since != null) Messages.select {
                Messages.sentAt greater since
            } else Messages.selectAll().limit(50))
                .orderBy(Messages.sentAt to SortOrder.ASC)
            return@dbQuery messages.map { Message(it[Messages.content], it[Messages.user], it[Messages.sentAt]) }
        }
    }
}