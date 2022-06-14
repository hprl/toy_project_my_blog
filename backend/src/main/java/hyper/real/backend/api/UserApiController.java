package hyper.real.backend.api;

import hyper.real.backend.domain.User;
import hyper.real.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static hyper.real.backend.domain.Provider.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/user/join")
    public ResponseEntity<String> join(@RequestBody JoinRequestDto joinRequestDto) {
        String username = joinRequestDto.getUsername();
        String email = joinRequestDto.getEmail();
        String password = passwordEncoder.encode(SocialLoginProperties.PASSWORD);
        String provider = joinRequestDto.getProvider();
        String providerId = joinRequestDto.getProviderId();

        if (userService.checkProviderId(provider + "_" +providerId)) {
            return ResponseEntity.ok("이미 가입된 회원입니다.");
        } else {

            if (provider.equals(GOOGLE.name())) {
                User user = User.createUser(username, email,password, GOOGLE, providerId);

                userService.join(user);
            } else if (provider.equals(KAKAO.name())) {
                User user = User.createUser(username, email, password, KAKAO, providerId);

                userService.join(user);
            }
            return ResponseEntity.ok("회원가입 완료");
        }
    }

    @GetMapping("/user/{id}")
    public UserResponseDto user(@PathVariable Long id) {
        User user = userService.findById(id);
        List<UserPostResponseDto> posts = user.getPosts().stream()
                .map(m -> new UserPostResponseDto( m.getId(), m.getTitle(),
                                            m.getContent(), m.getUpdatedAt(), m.getImage(), m.getBookmarks().size())).collect(Collectors.toList());
        return new UserResponseDto(user.getId(), user.getUsername(), user.getImage(), posts);
    }

    @PutMapping("/user/update")
    public void updateUser(@RequestBody UserSetDto userSetDto) {
        userService.updateUser(userSetDto.userId, userSetDto.username, userSetDto.image);
    }

    @GetMapping("/user/myPage/{id}")
    public UserSetDto getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return new UserSetDto(user.getId(), user.getUsername(), user.getImage(), user.getEmail());
    }

    @Data
    static class JoinRequestDto {
        private String provider;
        private String providerId;
        private String email;
        private String username;
    }

    @Data
    @AllArgsConstructor
    static class UserSetDto {
        private Long userId;
        private String username;
        private String image;
        private String email;
    }

    @Data
    @AllArgsConstructor
    static class UserResponseDto {
        private Long userId;
        private String username;
        private String image;
        private List<UserPostResponseDto> posts;
    }

    @Data
    @AllArgsConstructor
    static class UserPostResponseDto {
        private Long postId;
        private String title;
        private String content;
        private LocalDateTime updatedAt;
        private String image;
        private int likeQuantity;
    }
}