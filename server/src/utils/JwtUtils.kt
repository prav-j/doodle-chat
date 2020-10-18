package com.praveen.doodle.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.*

object JwtUtils {
    private const val SECRET = "SUPER_SECRET_KEY_NJK#@&*(SAMDHJKQ"

    fun sign(id: UUID, username: String): String {
        return JWT.create()
            .withClaim("id", id.toString())
            .withClaim("username", username)
            .withExpiresAt(Date(System.currentTimeMillis() + (86400 * 1000)))
            .sign(Algorithm.HMAC256(SECRET))
    }
}