package hyper.real.backend.domain;

import lombok.Getter;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Bookmark> bookmarks = new ArrayList<>();

    private String title;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private String image;
    private String content;

    public void updatePost(User user, String title, LocalDateTime updatedAt, String content, String image) {
        this.user = user;
        this.title = title;
        this.updatedAt = updatedAt;
        this.content = content;
        this.image = image;
    }

    public static Post createPost(User user, String title, LocalDateTime createdAt, LocalDateTime updatedAt, String content, String image) {

        Post post = new Post();

        post.user = user;
        post.title = title;
        post.createdAt = createdAt;
        post.updatedAt = updatedAt;
        post.content = content;
        post.image = image;

        return post;
    }
}
