package com.webapi.security.jwt;

import com.webapi.security.CustomUserDetail;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    private final String JWT_SECRECT = "hensan";

    private final long JWT_EXPIRATION = 60480000L;

    public String generateToken(CustomUserDetail userDetail){
        Date now = new Date();
        Date expiry = new Date(now.getTime() + JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(userDetail.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(SignatureAlgorithm.ES512, JWT_SECRECT)
                .compact();
    }

    public String getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRECT)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    public boolean validateToken(String authToken){
        try{
            Jwts.parser().setSigningKey(JWT_SECRECT).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex){
            log.error("Invalid JWT Token");
        } catch (ExpiredJwtException ex){
            log.error("Expired JWT Token");
        } catch (UnsupportedJwtException ex){
            log.error("Unsupported JWT Token");
        } catch (IllegalArgumentException ex){
            log.error("JWT claims string is empty.");
        }
        return false;
    }

}
