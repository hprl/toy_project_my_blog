package hyper.real.backend.repository;

import hyper.real.backend.domain.Bookmark;
import hyper.real.backend.domain.Post;
import hyper.real.backend.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @EntityGraph(attributePaths = {"post"})
    @Query("select b from Bookmark b where b.user.id = :userId")
    Optional<List<Bookmark>> findByUser(@Param("userId") Long userId);

    @Query("select b from Bookmark b where b.post.id = :postId and b.user.id = :userId")
    Optional<Bookmark> findByPostAndUser(@Param ("postId") Long postId, @Param("userId") Long userId);

    @Modifying
    @Query("delete from Bookmark b where b.post = :post and b.user = :user")
    void deleteByPostAndUser(@Param("post") Post post, @Param("user") User user);

}