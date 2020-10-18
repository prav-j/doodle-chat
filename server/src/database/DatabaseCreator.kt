package com.praveen.doodle.database

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.transactions.transaction

object Database {
    private val dbConfig = getDatabaseConnectionInfo()
    fun init() {
        Database.connect(
            dbConfig.url,
            driver = "org.postgresql.Driver",
            user = dbConfig.user,
            password = dbConfig.password
        )
    }

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(Dispatchers.IO) {
            transaction { block() }
        }
}