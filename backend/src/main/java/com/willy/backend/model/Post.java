package com.willy.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String category; // writing, projects, hikes, friends

    @Column(columnDefinition = "TEXT")
    private String imageUrl; // Base64 or file path for images

    @Column(columnDefinition = "TEXT")
    private String imageUrls; // JSON array of base64 image URLs for slideshow posts

    private LocalDateTime createdAt = LocalDateTime.now();
}
