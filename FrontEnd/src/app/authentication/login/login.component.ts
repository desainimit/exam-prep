import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '@app/core/models/interfaces/dtos/IUser.dto';
import { AuthService } from '@app/core/services/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitLoginForm(): void {
    this.isSubmitted = true;
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as IUser).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.isLoading = false;
            this.router.navigate(['/']);
            this.toastService.showSuccess(res.message);
          }
        },
        error: () => {
          this.isLoading = false;
          this.isSubmitted = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }
}
