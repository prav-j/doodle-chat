package com.praveen.doodle.user

import com.praveen.doodle.database.Database.dbQuery
import com.praveen.doodle.utils.JwtUtils
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.select
import org.mindrot.jbcrypt.BCrypt
import org.mindrot.jbcrypt.BCrypt.hashpw

class UserExistsException(override val message: String) : Exception(message)

class UserService {
    suspend fun signUpNewUser(user: User): String {
        return dbQuery {
            val userExists = Users.select { Users.username eq user.username }.toList().isNotEmpty()
            if (userExists) {
                throw UserExistsException("Username already taken")
            }
            val id = Users.insertAndGetId {
                it[username] = user.username
                it[password] = hashpw(user.password, BCrypt.gensalt())
            }
            JwtUtils.sign(id.value, user.username)
        }
    }
}