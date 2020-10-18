package com.praveen.doodle.database

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.flywaydb.core.Flyway
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
        Flyway.configure()
            .dataSource(dbConfig.url, dbConfig.user, dbConfig.password)
            .load()
            .migrate()
    }

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(Dispatchers.IO) {
            transaction { block() }
        }
}