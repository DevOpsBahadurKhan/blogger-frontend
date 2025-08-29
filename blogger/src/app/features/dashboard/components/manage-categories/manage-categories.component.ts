import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  isEditing?: boolean;
}

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Manage Categories</h2>
        <button (click)="showAddForm = !showAddForm" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Add New Category
        </button>
      </div>

      <!-- Add Category Form -->
      <div *ngIf="showAddForm" class="mb-8 bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium mb-4">Add New Category</h3>
        <form (ngSubmit)="addCategory()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input [(ngModel)]="newCategory.name" name="name" type="text" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input [(ngModel)]="newCategory.slug" name="slug" type="text" required
                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea [(ngModel)]="newCategory.description" name="description" rows="3"
                     class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div class="flex justify-end space-x-3">
            <button type="button" (click)="cancelAdd()"
                    class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Category
            </button>
          </div>
        </form>
      </div>

      <!-- Categories List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let category of categories">
              <td class="px-6 py-4 whitespace-nowrap">
                <div *ngIf="!category.isEditing" class="text-sm font-medium text-gray-900">{{category.name}}</div>
                <input *ngIf="category.isEditing" [(ngModel)]="category.name" type="text"
                       class="w-full px-2 py-1 border rounded">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div *ngIf="!category.isEditing" class="text-sm text-gray-500">{{category.slug}}</div>
                <input *ngIf="category.isEditing" [(ngModel)]="category.slug" type="text"
                       class="w-full px-2 py-1 border rounded">
              </td>
              <td class="px-6 py-4">
                <div *ngIf="!category.isEditing" class="text-sm text-gray-500">{{category.description || 'No description'}}</div>
                <textarea *ngIf="category.isEditing" [(ngModel)]="category.description" rows="2"
                         class="w-full px-2 py-1 border rounded"></textarea>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{category.postCount}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div *ngIf="!category.isEditing" class="space-x-2">
                  <button (click)="editCategory(category)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button (click)="deleteCategory(category)" class="text-red-600 hover:text-red-900">Delete</button>
                </div>
                <div *ngIf="category.isEditing" class="space-x-2">
                  <button (click)="saveCategory(category)" class="text-green-600 hover:text-green-900">Save</button>
                  <button (click)="cancelEdit(category)" class="text-gray-600 hover:text-gray-900">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ManageCategoriesComponent {
  categories: Category[] = [
    {
      id: 1,
      name: 'Angular',
      slug: 'angular',
      description: 'All about Angular framework',
      postCount: 24
    },
    {
      id: 2,
      name: 'React',
      slug: 'react',
      description: 'React.js related content',
      postCount: 18
    },
    {
      id: 3,
      name: 'Vue',
      slug: 'vue',
      description: 'Vue.js framework tutorials and articles',
      postCount: 12
    },
    {
      id: 4,
      name: 'JavaScript',
      slug: 'javascript',
      description: 'Core JavaScript concepts and features',
      postCount: 35
    },
    {
      id: 5,
      name: 'TypeScript',
      slug: 'typescript',
      description: 'TypeScript language features and best practices',
      postCount: 15
    }
  ];

  showAddForm = false;
  newCategory: Omit<Category, 'id' | 'postCount'> = {
    name: '',
    slug: '',
    description: ''
  };

  editCategory(category: Category) {
    // Reset any other categories in edit mode
    this.categories.forEach(c => c.isEditing = false);
    category.isEditing = true;
  }

  saveCategory(category: Category) {
    // In a real app, you would make an API call here
    category.isEditing = false;
    // Show success message
  }

  cancelEdit(category: Category) {
    category.isEditing = false;
    // Reset any changes
  }

  addCategory() {
    if (this.newCategory.name && this.newCategory.slug) {
      const newId = Math.max(...this.categories.map(c => c.id), 0) + 1;
      this.categories.unshift({
        ...this.newCategory,
        id: newId,
        postCount: 0
      });
      this.cancelAdd();
    }
  }

  cancelAdd() {
    this.showAddForm = false;
    this.newCategory = { name: '', slug: '', description: '' };
  }

  deleteCategory(category: Category) {
    if (confirm(`Are you sure you want to delete the "${category.name}" category?`)) {
      // In a real app, you would make an API call here
      this.categories = this.categories.filter(c => c.id !== category.id);
      // Show success message
    }
  }
}
