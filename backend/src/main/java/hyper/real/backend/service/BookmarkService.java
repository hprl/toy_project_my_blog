package hyper.real.backend.service;

import hyper.real.backend.domain.Bookmark;
import hyper.real.backend.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostService postService;
    private final UserService userService;

    public List<Bookmark> findByUser(Long userId) {
        return bookmarkRepository.findByUser(userId).orElseThrow(NullPointerException::new);
    }

    public boolean findBookmarked(Long postId, Long userId) {
        return bookmarkRepository.findByPostAndUser(postId, userId).isPresent();
    }

    @Transactional
    public void deleteBookmark(Long postId, Long userId) {
        bookmarkRepository.deleteByPostAndUser(postService.findById(postId), userService.findById(userId));
    }

    @Transactional
    public void createBookmark(Long postId, Long userId) {
        if (!findBookmarked(postId, userId)) {
            bookmarkRepository.save(
                    Bookmark.createBookmark(postService.findById(postId), userService.findById(userId)));
        }
    }
}
