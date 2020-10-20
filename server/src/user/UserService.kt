package com.praveen.doodle.user

import com.praveen.doodle.database.Database.dbQuery
import com.praveen.doodle.utils.JwtUtils
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.select
import org.mindrot.jbcrypt.BCrypt
import org.mindrot.jbcrypt.BCrypt.checkpw
import org.mindrot.jbcrypt.BCrypt.hashpw

class UserExistsException(override val message: String) : Exception(message)
class IncorrectCredentialsException : Exception("Username / Password incorrect")

class UserService {
    suspend fun signUpNewUser(username: String, password: String): String {
        return dbQuery {
            val userExists = Users.select { Users.username eq username }.toList().isNotEmpty()
            if (userExists) {
                throw UserExistsException("Username already taken")
            }
            val id = Users.insertAndGetId {
                it[this.username] = username
                it[this.password] = hashpw(password, BCrypt.gensalt())
            }
            JwtUtils.sign(id.value, username)
        }
    }

    private suspend fun getUser(username: String): ResultRow? {
        return dbQuery {
            val users = Users.select { Users.username eq username }.toList()
            if (users.isEmpty()) return@dbQuery null
            return@dbQuery users[0]
        }
    }

    suspend fun loginUser(username: String, password: String): String {
        val user = this.getUser(username) ?: throw IncorrectCredentialsException()
        if (!checkpw(password, user[Users.password])) {
            throw IncorrectCredentialsException()
        }
        return JwtUtils.sign(user[Users.id].value, username)
    }

    suspend fun getUserByUsername(username: String): User? {
        val user = getUser(username) ?: return null
        return User(user[Users.id].value, user[Users.username])
    }
}