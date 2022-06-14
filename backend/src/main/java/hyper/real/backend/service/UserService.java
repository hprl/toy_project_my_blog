package hyper.real.backend.service;

import hyper.real.backend.domain.User;
import hyper.real.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void join(User user) {
        userRepository.save(user);
    }

    public boolean checkProviderId(String providerId) {
        return userRepository.findIsJoinByProviderId(providerId).isPresent();
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(NullPointerException::new);
    }

    @Transactional
    public void updateUser(Long id, String username, String image) {
        User user = userRepository.findById(id).orElseThrow(NullPointerException::new);
        user.updateUser(username, image);
    }
}