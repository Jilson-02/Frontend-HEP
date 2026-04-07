import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page">
      <div class="page-inner">
        <p class="institution">Hospital de Especialidades</p>
        <p class="city">Portoviejo</p>
      </div>
      <div class="card">
        <h1>Iniciar sesión</h1>
        <p class="subtitle">Accede con tu usuario para continuar.</p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label>
            <span>Usuario</span>
            <input type="text" formControlName="username" autocomplete="username" />
          </label>

          <label>
            <span>Contraseña</span>
            <input type="password" formControlName="password" autocomplete="current-password" />
          </label>

          @if (error()) {
            <div class="error" role="alert">{{ error() }}</div>
          }

          <button type="submit" [disabled]="form.invalid">Entrar</button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .page {
        position: relative;
        min-height: 100dvh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: "Source Sans 3", system-ui, sans-serif;
        background: linear-gradient(165deg, #e8f2fb 0%, #ffffff 45%, #dce9f7 100%);
        color: #1a365d;
      }
      .page-inner {
        position: absolute;
        top: 24px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        width: 100%;
        max-width: 420px;
        pointer-events: none;
      }
      .institution {
        margin: 0;
        font-size: 0.8125rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #0c4da2;
      }
      .city {
        margin: 4px 0 0;
        font-size: 1.125rem;
        font-weight: 700;
        color: #083060;
      }
      .card {
        width: 100%;
        max-width: 420px;
        margin-top: 72px;
        background: #ffffff;
        border: 1px solid rgba(12, 77, 162, 0.12);
        border-radius: 12px;
        padding: 28px 26px;
        box-shadow: 0 8px 32px rgba(12, 77, 162, 0.08), 0 1px 0 rgba(255, 255, 255, 0.8) inset;
        border-top: 3px solid #0d9488;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 1.5rem;
        font-weight: 700;
        color: #083060;
        letter-spacing: -0.02em;
      }
      .subtitle {
        margin: 0 0 22px;
        color: #4a6fa5;
        font-size: 0.9375rem;
        font-weight: 400;
        line-height: 1.45;
      }
      form {
        display: grid;
        gap: 14px;
      }
      label {
        display: grid;
        gap: 6px;
      }
      label span {
        font-size: 0.8125rem;
        font-weight: 600;
        color: #1a365d;
      }
      input {
        border: 1px solid #c5d5eb;
        border-radius: 8px;
        padding: 11px 14px;
        font-size: 1rem;
        font-family: inherit;
        color: #1a365d;
        background: #fafcfe;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;
      }
      input:focus {
        border-color: #1565c0;
        box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.18);
        background: #fff;
      }
      button {
        margin-top: 6px;
        border: 0;
        border-radius: 8px;
        padding: 12px 16px;
        font-size: 1rem;
        font-weight: 600;
        font-family: inherit;
        background: #0c4da2;
        color: #ffffff;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      button:hover:not([disabled]) {
        background: #083060;
      }
      button[disabled] {
        opacity: 0.55;
        cursor: not-allowed;
      }
      .error {
        background: #fef2f2;
        color: #b91c1c;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 0.875rem;
        border-inline-start: 3px solid #d97706;
      }
    `,
  ],
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    this.error.set(null);
    const { username, password } = this.form.getRawValue();

    const ok = this.auth.login(username, password);
    if (!ok) {
      this.error.set('Completa usuario y contraseña.');
      return;
    }

    void this.router.navigateByUrl('/home');
  }
}

