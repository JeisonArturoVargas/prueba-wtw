import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isAuthenticated = false;
  activeTab: string = 'login';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroDeIdentificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoIdentificacion: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.isAuthenticated = !!localStorage.getItem('authToken');
    this.checkAuthenticationStatus();
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registro Exitoso',
            detail: 'Registro Exitoso' + response,
          });
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Mensaje',
            detail: error.error.error,
          });
        }
      });
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {

          localStorage.setItem('authToken', response.token);
          this.isAuthenticated = !!localStorage.getItem('authToken');
          const expirationDate = new Date(new Date().getTime() + response.expiration * 1000);
          localStorage.setItem('expiration', expirationDate.toISOString());
          this.isAuthenticated = this.checkAuthenticationStatus();
          this.router.navigate(['dashboard']);
        },
        error: (error) => {

          this.messageService.add({
            severity: 'error',
            summary: 'Login Error',
            detail: error.error.mensaje,
          });
        }
      });
    }
  }

  checkAuthenticationStatus(): boolean {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return false;
    }
    const expirationDate = new Date(expiration);
    if (expirationDate < new Date()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('expiration');
      this.isAuthenticated = false;
      return false;
    }
    return true;
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
