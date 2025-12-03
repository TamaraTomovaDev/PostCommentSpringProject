
package org.intecbrussel.bootstrap;

import org.intecbrussel.model.Comment;
import org.intecbrussel.model.Post;
import org.intecbrussel.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {

    private final PostRepository postRepository;

    public DataLoader(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (postRepository.count() > 0) {
            System.out.println("Database heeft al data. DataLoader wordt overgeslagen.");
            return;
        }

        System.out.println("DataLoader: voorbeelddata toevoegen...");

        // Post 1
        Post post1 = new Post();
        post1.setTitle("Spring Boot Blog API");
        post1.setDescription("Introductie tot Spring Boot");
        post1.setContent("Dit is een voorbeeld van een Blog API.");

        Comment c1 = new Comment();
        c1.setText("Geweldig artikel!");
        c1.setPost(post1);

        Comment c2 = new Comment();
        c2.setText("Heel leerzaam, bedankt!");
        c2.setPost(post1);

        Set<Comment> comments1 = new HashSet<>();
        comments1.add(c1);
        comments1.add(c2);
        post1.setComments(comments1);

        // Post 2
        Post post2 = new Post();
        post2.setTitle("JPA & Hibernate");
        post2.setDescription("Relaties en ORM");
        post2.setContent("Hoe werken entiteiten en relaties in JPA?");

        Comment c3 = new Comment();
        c3.setText("Super uitleg!");
        c3.setPost(post2);

        Comment c4 = new Comment();
        c4.setText("Duidelijk en praktisch.");
        c4.setPost(post2);

        Set<Comment> comments2 = new HashSet<>();
        comments2.add(c3);
        comments2.add(c4);
        post2.setComments(comments2);

        // Opslaan
        postRepository.save(post1);
        postRepository.save(post2);

        System.out.println("DataLoader: voorbeelddata succesvol toegevoegd!");
    }
}
