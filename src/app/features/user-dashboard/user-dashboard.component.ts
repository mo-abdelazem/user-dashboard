import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { UserService } from '../../core/services/user-service/user.service';
import { fadeInAnimation } from '../../animations/animations';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatProgressBar, RouterLink],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  animations: [fadeInAnimation],
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  users: any[] = [];
  totalUsers: number = 0;
  private userSubscription: Subscription = new Subscription();
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(1);
  }
  loadUsers(page: number): void {
    this.userSubscription = this.userService.fetchUsers(page).subscribe({
      next: (data) => {
        this.users = data.data;
        this.totalUsers = data.total;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: any) {
    const page = event.pageIndex + 1;
    this.loadUsers(page);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
