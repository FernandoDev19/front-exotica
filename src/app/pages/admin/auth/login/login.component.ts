import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../data-access/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  spanButtonTitle: string = 'Mostrar contraseña';
  messageError!: string;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  private isPasswordVisible = false;

  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private title = inject(Title);

  // Icons
  faUser: IconDefinition = faUser;
  iconEye: IconDefinition = faEye;
  faKey = faKey;

  ngOnInit(): void {
    this.title.setTitle('Log-in | Exotica');
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.login(email, password).subscribe({
        error: (error) => {
          if(error.status === 401){
            this.messageError = "Email o Contraseña son incorrectas.";
          }
        },
      });
    } else {
      console.log('Formulario invalido');
    }
  }

  showPassword(): void {
    const password = this.passwordInput.nativeElement;
    if (password && this.isPasswordVisible) {
      this.iconEye = faEye;

      this.spanButtonTitle = 'Mostrar contraseña';

      password.setAttribute('type', 'password');
      this.isPasswordVisible = false;
    } else {

      this.iconEye = faEyeSlash;

      this.spanButtonTitle = 'Ocultar contraseña';

      password.setAttribute('type', 'text');

      this.isPasswordVisible = true;
    }
  }
}
