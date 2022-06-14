package hyper.real.backend.repository;

import hyper.real.backend.domain.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select distinct p from Post p order by p.updatedAt desc")
    @EntityGraph(attributePaths = {"user", "bookmarks"})
    List<Post> findRecentPosts();

    @Override
    @EntityGraph(attributePaths = {"user", "bookmarks"})
    List<Post> findAll();

    @Override
    @EntityGraph(attributePaths = {"user", "bookmarks"})
    Optional<Post> findById(Long postId);

    @Query("select p from Post p where p.content like %:keyword% or p.title like %:keyword%")
    @EntityGraph(attributePaths = {"user"})
    Optional<List<Post>> findPost(@Param("keyword") String keyword);

}
