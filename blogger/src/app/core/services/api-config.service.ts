import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiUrl = environment.apiUrl;

  // Auth endpoints
  get loginUrl(): string {
    return `${this.apiUrl}/auth/login`;
  }

  get registerUrl(): string {
    return `${this.apiUrl}/auth/register`;
  }

  // User endpoints
  get currentUserUrl(): string {
    return `${this.apiUrl}/users/me`;
  }

  // Blog endpoints
  get blogsUrl(): string {
    return `${this.apiUrl}/posts`;
  }

  blogByIdUrl(id: string): string {
    return `${this.blogsUrl}/${id}`;
  }

  // Comment endpoints
  get commentsUrl(): string {
    return `${this.apiUrl}/comments`;
  }

  commentsByBlogUrl(blogId: string): string {
    return `${this.blogsUrl}/${blogId}/comments`;
  }

  // Category endpoints
  get categoriesUrl(): string {
    return `${this.apiUrl}/categories`;
  }

  // Tag endpoints
  get tagsUrl(): string {
    return `${this.apiUrl}/tags`;
  }
}
