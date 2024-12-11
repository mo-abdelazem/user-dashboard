import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a routerLink="/" class="back-home">Go Back Home</a>
    </div>
  `,
  styles: [
    `
      .not-found {
        text-align: center;
        margin-top: 100px;
      }
      .back-home {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #1976d2;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
      }
      .back-home:hover {
        background-color: #155fa0;
      }
    `,
  ],
})
export class NotFoundComponent {}
