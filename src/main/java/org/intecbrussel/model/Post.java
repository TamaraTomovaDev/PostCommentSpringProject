package org.intecbrussel.model;import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import java.util.HashSet;
import java.util.Set;
@Entity
@Table(name = "posts")
public class Post extends AuditModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(unique = true)
    private String title;
    @NotNull
    private String description;
    @NotNull
    @Lob
    private String content;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy =
            "post")
    private Set<Comment> comments = new HashSet<>();
    public Post() {
    }
    public Post(Long id, String title, String description, String content, Set<Comment>
            comments) {this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.comments = comments;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {this.content = content;
    }
    public Set<Comment> getComments() {
        return comments;
    }
    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }
    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", content='" + content + '\'' +
                ", comments=" + comments +
                '}';
    }
}