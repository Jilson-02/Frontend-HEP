import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shell">
      <header class="topbar">
        <div class="brand-wrap">
          <span class="brand-mark" aria-hidden="true"></span>
          <div class="brand-text">
            <span class="brand-title">Hospital de Especialidades</span>
            <span class="brand-sub">Portoviejo</span>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="user">
          <span class="username">{{ auth.user()?.username }}</span>
          <button type="button" (click)="logout()">Cerrar sesión</button>
        </div>
      </header>

      <main class="content">
        <h1>Bienvenido</h1>
        <p class="lead">Sesión iniciada correctamente.</p>

        <section class="panel">
          <h2>Sesión</h2>
          <div class="kv">
            <span class="k">Usuario</span>
            <span class="v">{{ auth.user()?.username }}</span>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [
    `
      .shell {
        min-height: 100dvh;
        font-family: "Source Sans 3", system-ui, sans-serif;
        background: #e8f2fb;
        color: #1a365d;
      }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 20px;
        background: #0c4da2;
        color: #ffffff;
        border-bottom: 3px solid #0d9488;
        box-shadow: 0 4px 20px rgba(12, 77, 162, 0.2);
      }
      .brand-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .brand-mark {
        width: 10px;
        height: 36px;
        border-radius: 3px;
        background: linear-gradient(180deg, #ffffff 0%, #b8d4f0 100%);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
      }
      .brand-text {
        display: flex;
        flex-direction: column;
        gap: 0;
        line-height: 1.2;
      }
      .brand-title {
        font-size: 0.9375rem;
        font-weight: 700;
        letter-spacing: 0.02em;
      }
      .brand-sub {
        font-size: 0.75rem;
        font-weight: 600;
        opacity: 0.92;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .spacer {
        flex: 1;
      }
      .user {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
      .username {
        font-size: 0.9375rem;
        font-weight: 600;
        color: #e8f4fc;
      }
      button {
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: 8px;
        padding: 8px 14px;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.15);
        color: #ffffff;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      button:hover {
        background: rgba(255, 255, 255, 0.28);
      }
      .content {
        padding: 28px 20px 40px;
        max-width: 920px;
        margin: 0 auto;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 1.75rem;
        font-weight: 700;
        color: #083060;
        letter-spacing: -0.02em;
      }
      .lead {
        margin: 0 0 24px;
        font-size: 1rem;
        color: #4a6fa5;
        line-height: 1.5;
      }
      .panel {
        margin-top: 18px;
        padding: 20px 22px;
        border-radius: 12px;
        border: 1px solid rgba(12, 77, 162, 0.1);
        border-inline-start: 4px solid #1565c0;
        background: #ffffff;
        box-shadow: 0 4px 18px rgba(12, 77, 162, 0.06);
      }
      h2 {
        margin: 0 0 12px;
        font-size: 1rem;
        font-weight: 700;
        color: #083060;
      }
      .kv {
        display: grid;
        grid-template-columns: minmax(100px, 140px) 1fr;
        gap: 10px 16px;
        align-items: center;
      }
      .k {
        color: #4a6fa5;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .v {
        font-weight: 700;
        font-size: 1.0625rem;
        color: #0c4da2;
      }
    `,
  ],
})
export class HomePage {
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}

