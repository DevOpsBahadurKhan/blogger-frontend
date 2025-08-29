import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  title: string;
  author: string;
  publishDate: string;
  views: number;
  likes: number;
  comments: number;
  status: 'published' | 'scheduled' | 'draft';
}

@Component({
  selector: 'app-published-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Published Posts</h2>
        <div class="flex space-x-2">
          <input type="text" 
                 placeholder="Search posts..." 
                 class="px-3 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <select class="text-sm border rounded p-1">
            <option>All Categories</option>
            <option>Angular</option>
            <option>React</option>
            <option>Vue</option>
            <option>JavaScript</option>
          </select>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let post of posts" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{post.title}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                    {{post.author.charAt(0)}}
                  </div>
                  <div class="ml-2">
                    <div class="text-sm font-medium text-gray-900">{{post.author}}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{post.publishDate}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    {{post.views | number}}
                  </span>
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {{post.likes | number}}
                  </span>
                  <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                    {{post.comments | number}}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [ngClass]="{
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-yellow-100 text-yellow-800': post.status === 'scheduled',
                  'bg-gray-100 text-gray-800': post.status === 'draft'
                }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{post.status | titlecase}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                <button class="text-blue-600 hover:text-blue-900">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">24</span> posts
        </div>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border rounded bg-white hover:bg-gray-50">Previous</button>
          <button class="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
          <button class="px-3 py-1 border rounded bg-white hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border rounded bg-white hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border rounded bg-white hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PublishedPostsComponent {
  posts: Post[] = [
    {
      id: 1,
      title: 'Getting Started with Angular 15',
      author: 'John Doe',
      publishDate: '2023-05-15',
      views: 1245,
      likes: 89,
      comments: 23,
      status: 'published'
    },
    {
      id: 2,
      title: 'State Management with NgRx',
      author: 'Jane Smith',
      publishDate: '2023-05-14',
      views: 987,
      likes: 76,
      comments: 15,
      status: 'published'
    },
    {
      id: 3,
      title: 'Advanced TypeScript Patterns',
      author: 'Mike Johnson',
      publishDate: '2023-05-16',
      views: 0,
      likes: 0,
      comments: 0,
      status: 'scheduled'
    },
    {
      id: 4,
      title: 'Responsive Design with Tailwind',
      author: 'Sarah Williams',
      publishDate: '2023-05-13',
      views: 876,
      likes: 65,
      comments: 12,
      status: 'published'
    },
    {
      id: 5,
      title: 'Building Microfrontends',
      author: 'David Brown',
      publishDate: 'Draft',
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft'
    }
  ];
}
