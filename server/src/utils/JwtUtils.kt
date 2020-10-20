package com.praveen.doodle.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import java.util.*

object JwtUtils {
    private const val SECRET = "SUPER_SECRET_KEY_NJK#@&*(SAMDHJKQ"
    val verifier: JWTVerifier = JWT
        .require(Algorithm.HMAC256(SECRET))
        .build()

    fun sign(id: UUID, username: String): String {
        return JWT.create()
            .withClaim("id", id.toString())
            .withClaim("username", username)
            .sign(Algorithm.HMAC256(SECRET))
    }

    fun getUsername(token: String): String? {
        return try {
            val decodedJWT = verifier.verify(token)
            val username = decodedJWT.getClaim("username")
            username.asString()
        } catch (e: Exception) {
            null
        }
    }
}