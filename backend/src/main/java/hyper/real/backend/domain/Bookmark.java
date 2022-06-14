package hyper.real.backend.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public static Bookmark createBookmark(Post post, User user) {
        Bookmark bookmark = new Bookmark();
        bookmark.post = post;
        bookmark.user = user;
        return bookmark;
    }
}
