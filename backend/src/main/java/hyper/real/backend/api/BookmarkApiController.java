package hyper.real.backend.api;

import hyper.real.backend.domain.Bookmark;
import hyper.real.backend.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class BookmarkApiController {


    private final BookmarkService bookmarkService;

    @GetMapping("/bookmark/{id}")
    public List<PostApiController.PostResponseDto> bookmarkList(@PathVariable Long id) {
        return bookmarkService.findByUser(id).stream()
                .map(Bookmark::getPost)
                .map(m -> new PostApiController.PostResponseDto(
                        m.getId(), m.getTitle(), m.getUser().getId(), m.getUser().getUsername(),
                        m.getCreatedAt(), m.getUpdatedAt(), m.getBookmarks().size(), m.getContent(), m.getImage()))
                .collect(Collectors.toList());
    }

    @GetMapping("/bookmarked")
    public boolean bookmarked(@RequestParam("postId") Long postId, @RequestParam("userId") Long userId) {
       return bookmarkService.findBookmarked(postId, userId);
    }

    @DeleteMapping("/bookmark/delete")
    public void deleteBookmarked(@RequestParam("postId") Long postId, @RequestParam("userId") Long userId) {
        bookmarkService.deleteBookmark(postId, userId);
    }

    @PostMapping("/bookmark/create")
    public void createBookmarked(@RequestParam("postId") Long postId, @RequestParam("userId") Long userId) {
        bookmarkService.createBookmark(postId, userId);
    }
}
