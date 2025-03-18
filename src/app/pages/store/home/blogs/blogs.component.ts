import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { BlogService } from '../../blog/data-access/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent implements OnInit {
  protected blogs!: SafeHtml[];
  isMobile = input.required<boolean>()

  private blogService = inject(BlogService);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((blogs) => {
      this.blogs = this.isMobile() ? blogs.slice(0, 4) : blogs.slice(0, 8).map((blog) =>
        this.sanitizer.bypassSecurityTrustHtml(blog.blog_url)
      );
    });
  }
}
