package com.praveen.doodle.database

import com.typesafe.config.ConfigFactory

data class DbConnectionParams(
    val url: String,
    val name: String,
    val user: String,
    val password: String
)

fun getDatabaseConnectionInfo(): DbConnectionParams {
    val config = ConfigFactory.load()
    val dbConfig = config.getConfig("database")

    return DbConnectionParams(
        dbConfig.getString("url"),
        dbConfig.getString("name"),
        dbConfig.getString("user"),
        dbConfig.getString("password")
    )
}