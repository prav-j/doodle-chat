package com.praveen.doodle.user

import com.praveen.doodle.database.Database.dbQuery
import com.praveen.doodle.utils.JwtUtils
import org.jetbrains.exposed.sql.insertAndGetId
import org.jetbrains.exposed.sql.select
import org.mindrot.jbcrypt.BCrypt
import org.mindrot.jbcrypt.BCrypt.checkpw
import org.mindrot.jbcrypt.BCrypt.hashpw

class UserExistsException(override val message: String) : Exception(message)
class IncorrectCredentialsException : Exception("Username / Password incorrect")

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

    suspend fun loginUser(user: User): String {
        return dbQuery {
            val users = Users.select { Users.username eq user.username }.toList()
            if (users.isEmpty()) {
                throw IncorrectCredentialsException()
            }
            val fetchedUser = users[0]
            if(!checkpw(user.password, fetchedUser[Users.password])){
                throw IncorrectCredentialsException()
            }
            JwtUtils.sign(fetchedUser[Users.id].value, user.username)
        }
    }
}