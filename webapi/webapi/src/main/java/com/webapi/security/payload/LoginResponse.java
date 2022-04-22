package com.webapi.security.payload;

import lombok.Data;

@Data
public class LoginResponse {
    private String tokenType = "Bearer";
    private String accessToken;

    public LoginResponse(String accessToken){
        this.accessToken = accessToken;
    }
}
