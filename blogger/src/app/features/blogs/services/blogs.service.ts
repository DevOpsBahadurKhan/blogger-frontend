import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConfigService } from '../../../core/services/api-config.service';
import { Blog } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  constructor(private http: HttpClient, private api: ApiConfigService) {}

  list(): Observable<Blog[]> {
    return this.http.get<any>(this.api.blogsUrl).pipe(
      map((res) => {
        if (Array.isArray(res)) return res as Blog[];
        // backend returns: { message: string, posts: Post[] }
        if (Array.isArray(res?.posts)) {
          return (res.posts as any[]).map((p) => ({
            id: p.id,
            title: p.title,
            content: p.content,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            author: p.User ? { id: p.User.id, username: p.User.username } : null,
          } satisfies Blog));
        }
        // common paginated or wrapped shapes
        if (Array.isArray(res?.items)) return res.items as Blog[];
        if (Array.isArray(res?.data)) return res.data as Blog[];
        if (Array.isArray(res?.results)) return res.results as Blog[];
        return [] as Blog[];
      })
    );
  }
}
