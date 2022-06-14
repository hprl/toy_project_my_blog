package hyper.real.backend.api;

import hyper.real.backend.config.auth.PrincipalDetails;
import hyper.real.backend.config.jwt.JwtProperties;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginApiController {

    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), SocialLoginProperties.PASSWORD));
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        String jwtToken = generateJwtToken(principalDetails);

        LoginResponseDto loginResponseDto = new LoginResponseDto(principalDetails.getId(), principalDetails.getEmail(), principalDetails.getUsername(), jwtToken);

        return ResponseEntity.ok(loginResponseDto);

    }

    public String generateJwtToken(PrincipalDetails principalDetails) {

        return Jwts.builder()
                .setSubject(principalDetails.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .claim("email", principalDetails.getUser().getEmail())
                .signWith(Keys.hmacShaKeyFor(JwtProperties.SECRET.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    @Data
    @AllArgsConstructor
    static class LoginRequestDto {
        private String email;
        private String password;
        private String provider;
    }

    @Data
    @AllArgsConstructor
    static class LoginResponseDto {
        private Long id;
        private String email;
        private String username;
        private String token;
    }
}