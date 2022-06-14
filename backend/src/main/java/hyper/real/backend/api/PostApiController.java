package hyper.real.backend.api;

import hyper.real.backend.domain.Post;
import hyper.real.backend.domain.User;
import hyper.real.backend.repository.PostRepository;
import hyper.real.backend.service.PostService;
import hyper.real.backend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostApiController {

    private final PostRepository postRepository;
    private final PostService postService;
    private final UserService userService;

    @GetMapping("/posts/like")
    public List<PostResponseDto> postsLike() {
        return getPostResponseDto(postRepository.findAll())
                .stream()
                .sorted(Comparator.comparing(PostResponseDto::getLikeQuantity).reversed())
                .collect(Collectors.toList());
    }

    @GetMapping("/posts/recent")
    public List<PostResponseDto> postsNew() {
        return getPostResponseDto(postRepository.findRecentPosts());
    }

    @GetMapping("/post/{id}")
    public PostResponseDto post(@PathVariable("id") Long postId) {

        Post post = postService.findById(postId);
        return new PostResponseDto(post.getId(), post.getTitle(),
                post.getUser().getId(), post.getUser().getUsername(),
                post.getCreatedAt(), post.getUpdatedAt(),
                post.getBookmarks().size(), post.getContent(), post.getImage());

    }

    @GetMapping("/post/search/{keyword}")
    public SearchPostResponse<List<PostResponseDto>> searchedPost(@PathVariable("keyword") String keyword) {
        List<PostResponseDto> postResponseDto = getPostResponseDto(postService.findByKeyword(keyword));
        return new SearchPostResponse<>(postResponseDto.size(), postResponseDto);
    }

    @PostMapping("/post/create")
    public void writePost(@RequestBody PostRequestDto postRequestDto) {

        User user = userService.findById(postRequestDto.userId);
        Post post = Post.createPost(user, postRequestDto.title,
                LocalDateTime.now(), LocalDateTime.now(),
                postRequestDto.content, postRequestDto.image);

        postService.createPost(post);

    }

    @GetMapping("/post/checkPost")
    public boolean checkMyPost(@RequestParam("postId") Long postId, @RequestParam("userId") Long userId) {
        User user = userService.findById(userId);
        List<Post> posts = new ArrayList<>(user.getPosts());
        List<Post> checkedPosts = new ArrayList<>();

        for (Post post : posts) {
            if (Objects.equals(post.getId(), postId)) {
                checkedPosts.add(post);
            }
        }
        return checkedPosts.size() != 0;
    }

    @PutMapping("/post/update")
    public void updatePost(@RequestBody PostUpdateRequestDto postUpdateRequestDto) {
        postService.updatePost(
                postUpdateRequestDto.userId, postUpdateRequestDto.postId,
                postUpdateRequestDto.title, postUpdateRequestDto.content,
                postUpdateRequestDto.image);
    }

    @DeleteMapping("/post/delete/{postId}")
    public void deletePost(@PathVariable("postId") Long postId) {
        postService.deletePost(postId);
    }

    private List<PostResponseDto> getPostResponseDto(List<Post> postList) {
        return postList
                .stream().map(m -> new PostResponseDto(m.getId(), m.getTitle(),
                        m.getUser().getId(), m.getUser().getUsername(),
                        m.getCreatedAt(), m.getUpdatedAt(),
                        m.getBookmarks().size(), m.getContent(), m.getImage())).collect(Collectors.toList());
    }

    @Data
    @AllArgsConstructor
    static class PostRequestDto {
        private String title;
        private Long userId;
        private String content;
        private String image;
    }

    @Data
    @AllArgsConstructor
    static class PostUpdateRequestDto {
        private Long postId;
        private String title;
        private Long userId;
        private String content;
        private String image;
    }

    @Data
    @AllArgsConstructor
    static class PostResponseDto {
        private Long postId;
        private String title;
        private Long userId;
        private String username;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private int likeQuantity;
        private String content;
        private String image;
    }

    @Data
    @AllArgsConstructor
    static class SearchPostResponse<T> {
        private int size;
        private T posts;
    }
}
