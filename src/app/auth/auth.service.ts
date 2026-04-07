import { Injectable, computed, signal } from '@angular/core';

type AuthUser = {
  username: string;
};

const SESSION_KEY = 'hep.session.user';

/** Login de demostración: sin registro ni lista de usuarios; solo sesión (tab del navegador). */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<AuthUser | null>(this.readSession());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  login(username: string, password: string): boolean {
    const u = username.trim();
    if (u.length === 0 || password.length === 0) return false;

    const user: AuthUser = { username: u };
    this._user.set(user);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch {
      /* ignorar si sessionStorage no está disponible */
    }
    return true;
  }

  logout(): void {
    this._user.set(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
  }

  private readSession(): AuthUser | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<AuthUser>;
      if (typeof parsed.username !== 'string' || parsed.username.trim().length === 0) return null;
      return { username: parsed.username };
    } catch {
      return null;
    }
  }
}
