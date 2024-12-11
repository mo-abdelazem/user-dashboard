import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { UserService } from '../../core/services/user-service/user.service';
import { bounceAnimation } from '../../animations/animations';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBar],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  animations: [bounceAnimation],
})
export class UserDetailsComponent implements OnInit {
  user: any;
  userId: number | null = null;

  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          this.userId = +params.get('id')!;
          return this.userService.getUser(this.userId!);
        })
      )
      .subscribe((userData) => {
        this.user = userData.data;
      });
  }

  fetchUserDetails(userId: string): void {
    this.isLoading = true;
    this.userService.getUser(+userId).subscribe((data) => {
      this.user = data.data;
      this.isLoading = false;
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
