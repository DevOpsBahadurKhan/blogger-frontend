import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  title: string;
  author: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'revision' | 'published';
  category: string;
}

@Component({
  selector: 'app-review-posts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-6">Posts for Review</h2>
      
      <div class="mb-4 flex justify-between items-center">
        <div class="flex space-x-2">
          <button class="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50">All</button>
          <button class="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50">Pending</button>
          <button class="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50">Needs Revision</button>
        </div>
        <div>
          <select class="text-sm border rounded p-1">
            <option>Sort by Newest</option>
            <option>Sort by Oldest</option>
            <option>Sort by Title</option>
            <option>Sort by Author</option>
          </select>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let post of posts">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{post.title}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{post.author}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{post.category}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{post.submittedDate}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [ngClass]="{
                  'bg-yellow-100 text-yellow-800': post.status === 'pending',
                  'bg-green-100 text-green-800': post.status === 'approved',
                  'bg-red-100 text-red-800': post.status === 'revision',
                  'bg-blue-100 text-blue-800': post.status === 'published'
                }" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{post.status | titlecase}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                <button class="text-green-600 hover:text-green-900 mr-3">Approve</button>
                <button class="text-yellow-600 hover:text-yellow-900">Request Revision</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 flex justify-between items-center">
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">12</span> results
        </div>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border rounded bg-white hover:bg-gray-50">Previous</button>
          <button class="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
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
export class ReviewPostsComponent {
  posts: Post[] = [
    {
      id: 1,
      title: 'Getting Started with Angular 15',
      author: 'John Doe',
      submittedDate: '2023-05-15',
      status: 'pending',
      category: 'Angular'
    },
    {
      id: 2,
      title: 'State Management with NgRx',
      author: 'Jane Smith',
      submittedDate: '2023-05-14',
      status: 'pending',
      category: 'State Management'
    },
    {
      id: 3,
      title: 'Advanced TypeScript Patterns',
      author: 'Mike Johnson',
      submittedDate: '2023-05-13',
      status: 'revision',
      category: 'TypeScript'
    },
    {
      id: 4,
      title: 'Responsive Design with Tailwind',
      author: 'Sarah Williams',
      submittedDate: '2023-05-12',
      status: 'approved',
      category: 'CSS'
    },
    {
      id: 5,
      title: 'Building Microfrontends',
      author: 'David Brown',
      submittedDate: '2023-05-11',
      status: 'pending',
      category: 'Architecture'
    }
  ];
}
