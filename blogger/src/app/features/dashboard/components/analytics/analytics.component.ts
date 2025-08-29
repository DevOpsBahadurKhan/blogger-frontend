import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-6">Post Analytics</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Total Views</h3>
          <p class="text-3xl font-bold">1,234</p>
          <p class="text-sm text-green-600">+12% from last month</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Total Likes</h3>
          <p class="text-3xl font-bold">456</p>
          <p class="text-sm text-green-600">+5% from last month</p>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Comments</h3>
          <p class="text-3xl font-bold">89</p>
          <p class="text-sm text-green-600">+23% from last month</p>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow mb-6">
        <h3 class="text-lg font-medium mb-4">Views Over Time</h3>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p class="text-gray-500">Chart will be displayed here</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Top Performing Posts</h3>
          <div class="space-y-4">
            <div *ngFor="let post of topPosts" class="border-b pb-2">
              <h4 class="font-medium">{{post.title}}</h4>
              <div class="flex justify-between text-sm text-gray-500">
                <span>{{post.views}} views</span>
                <span>{{post.likes}} likes</span>
                <span>{{post.comments}} comments</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-medium mb-4">Audience Overview</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-medium">Top Countries</h4>
              <div class="mt-2 space-y-2">
                <div *ngFor="let country of topCountries" class="flex items-center">
                  <span class="w-16">{{country.name}}</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-4 mx-2">
                    <div class="bg-indigo-600 h-4 rounded-full" [style.width.%]="country.percentage"></div>
                  </div>
                  <span class="w-8 text-right">{{country.percentage}}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent {
  topPosts = [
    { title: 'Getting Started with Angular', views: 342, likes: 45, comments: 12 },
    { title: 'Advanced TypeScript Patterns', views: 278, likes: 32, comments: 8 },
    { title: 'State Management with NgRx', views: 201, likes: 28, comments: 5 },
  ];
  
  topCountries = [
    { name: 'USA', percentage: 45 },
    { name: 'UK', percentage: 23 },
    { name: 'Canada', percentage: 12 },
    { name: 'Australia', percentage: 8 },
    { name: 'Others', percentage: 12 }
  ];
}
