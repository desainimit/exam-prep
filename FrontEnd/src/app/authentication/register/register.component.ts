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
import { MESSAGE } from '@app/utils/Messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitForm() {
    this.isSubmitted = true;
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.authService
        .registerUser(this.registerForm.value as IUser)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.isSubmitted = false;
            this.registerForm.reset();
            this.toastService.showSuccess(MESSAGE.REGISTER_SUCCESS);
            this.router.navigate(['/auth/login']);
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
