package com.praveen.doodle.database

import com.typesafe.config.ConfigFactory

data class DbConnectionParams(
    val url: String,
    val user: String,
    val password: String,
    val database: String
)

fun getDatabaseConnectionInfo(): DbConnectionParams {
    val config = ConfigFactory.load()
    val dbConfig = config.getConfig("database")

    val user = dbConfig.getString("user")
    val password = dbConfig.getString("password")
    val database = dbConfig.getString("database")
    return DbConnectionParams(
        "jdbc:postgresql://${System.getenv("DB_HOST")}/$database",
        user,
        password,
        database
    )
}