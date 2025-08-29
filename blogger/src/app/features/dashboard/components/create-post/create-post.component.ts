import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-6">Create New Post</h2>
      
      <form class="bg-white rounded-lg shadow p-6 max-w-4xl">
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
          <input type="text" id="title" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        
        <div class="mb-6">
          <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
          <input type="text" id="slug" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        
        <div class="mb-6">
          <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea id="excerpt" rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        
        <div class="mb-6">
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea id="content" rows="10" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        
        <div class="flex items-center space-x-4">
          <button type="button" 
                  class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Draft
          </button>
          <button type="button" 
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Publish
          </button>
        </div>
      </form>
    </div>
  `
})
export class CreatePostComponent { }
