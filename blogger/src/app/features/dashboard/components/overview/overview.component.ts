import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  template: `
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Admin Overview</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold">Total Users</h3>
          <p class="text-2xl">0</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold">Total Posts</h3>
          <p class="text-2xl">0</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold">Active Users</h3>
          <p class="text-2xl">0</p>
        </div>
        <div class="bg-white p-4 rounded shadow">
          <h3 class="font-semibold">Categories</h3>
          <p class="text-2xl">0</p>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class OverviewComponent {}
