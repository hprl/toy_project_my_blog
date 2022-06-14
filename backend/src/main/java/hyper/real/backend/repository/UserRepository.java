package hyper.real.backend.repository;

import hyper.real.backend.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail (String username);

    Optional<User> findIsJoinByProviderId(String providerId);

    @Override
    @EntityGraph(attributePaths = {"posts"})
    Optional<User> findById(Long id);
}