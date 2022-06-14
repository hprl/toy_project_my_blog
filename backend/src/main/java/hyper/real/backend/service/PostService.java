package hyper.real.backend.service;

import hyper.real.backend.domain.Post;
import hyper.real.backend.domain.User;
import hyper.real.backend.repository.PostRepository;
import hyper.real.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createPost(Post post) {
        postRepository.save(post);
    }

    @Transactional
    public void updatePost(Long userId, Long postId ,String title, String content, String image) {

        Post post = postRepository.findById(postId).orElseThrow(NullPointerException::new);
        User user = userRepository.findById(userId).orElseThrow(NullPointerException::new);

        post.updatePost(user, title, LocalDateTime.now(), content, image);

    }

    @Transactional
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    public Post findById(Long postId) {
        return postRepository.findById(postId).orElseGet(Post::new);
    }

    public List<Post> findByKeyword(String keyword) {
        return postRepository.findPost(keyword).orElseGet(ArrayList::new);
    }
}
