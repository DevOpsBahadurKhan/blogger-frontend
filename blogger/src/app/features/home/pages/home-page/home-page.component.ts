import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DatePipe
  ]
})
export class HomePageComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  currentYear = new Date().getFullYear();
  currentSlide = 0;
  slideInterval: any;

  // Carousel slides
  slides = [
    { 
      title: 'Share your voice', 
      subtitle: 'Write, publish and grow your audience with a delightful blogging experience.',
      image: 'assets/hero/blog-1.jpg' 
    },
    { 
      title: 'Discover great stories', 
      subtitle: 'Explore posts from creators around the world.', 
      image: 'assets/hero/blog-2.jpg' 
    },
    { 
      title: 'Engage your readers', 
      subtitle: 'Comments, likes and community features out of the box.', 
      image: 'assets/hero/blog-3.jpg' 
    }
  ];

  // Feature cards
  featureCards = [
    { 
      icon: 'edit', 
      title: 'Create', 
      desc: 'A clean, modern editor to focus on your writing.' 
    },
    { 
      icon: 'insights', 
      title: 'Grow', 
      desc: 'Reach more readers with sharing and SEO-friendly pages.' 
    },
    { 
      icon: 'security', 
      title: 'Secure', 
      desc: 'Authentication and role-based access built-in.' 
    }
  ];

  // Featured posts
  featuredPosts = [
    {
      id: 1,
      title: 'The Future of Web Development in 2023',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      category: 'Technology',
      author: 'Alex Johnson',
      date: '2023-05-15',
      image: 'assets/images/tech-post.jpg'
    },
    {
      id: 2,
      title: 'Mindfulness for Beginners: A Practical Guide',
      excerpt: 'Learn how to incorporate mindfulness practices into your daily routine for better mental health.',
      category: 'Wellness',
      author: 'Sarah Williams',
      date: '2023-05-10',
      image: 'assets/images/wellness-post.jpg'
    },
    {
      id: 3,
      title: 'Sustainable Living: Small Changes, Big Impact',
      excerpt: 'Discover simple ways to reduce your carbon footprint and live more sustainably.',
      category: 'Lifestyle',
      author: 'Michael Chen',
      date: '2023-05-05',
      image: 'assets/images/sustainability-post.jpg'
    }
  ];

  // Categories
  categories = [
    { name: 'Technology', slug: 'technology', icon: 'code', count: 24 },
    { name: 'Wellness', slug: 'wellness', icon: 'self_improvement', count: 18 },
    { name: 'Lifestyle', slug: 'lifestyle', icon: 'spa', count: 15 },
    { name: 'Productivity', slug: 'productivity', icon: 'check_circle', count: 12 },
    { name: 'Finance', slug: 'finance', icon: 'account_balance', count: 20 },
    { name: 'Travel', slug: 'travel', icon: 'flight_takeoff', count: 16 }
  ];

  // Testimonials
  testimonials = [
    {
      name: 'Emily Rodriguez',
      role: 'Web Developer',
      quote: 'This blog has completely transformed how I approach modern web development. The tutorials are clear and practical.'
    },
    {
      name: 'David Kim',
      role: 'UX Designer',
      quote: 'The design resources and articles have been invaluable for my projects. Highly recommended for designers!' 
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager',
      quote: 'A must-read for anyone in tech. The insights on product development are top-notch.'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startCarousel(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
