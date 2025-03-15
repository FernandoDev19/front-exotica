import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from './data-access/blog.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [FontAwesomeModule, ScrollingModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  protected blogs!: SafeHtml[];

  faChevronRight = faChevronRight;
  faSearch = faSearch;

  private blogService = inject(BlogService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs.map((blog) =>
        this.sanitizer.bypassSecurityTrustHtml(blog.blog_url)
      );
    });
  }
}
