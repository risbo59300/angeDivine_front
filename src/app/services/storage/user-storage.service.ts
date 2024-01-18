import { Injectable } from '@angular/core';

const TOKEN = 'divine-token';
const USER = 'divine-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: object): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string{
    return localStorage.getItem(TOKEN);
  }

  static getUser(): string{
    return localStorage.getItem(USER);
  }

  static getUserId(): string{
    const userJsonString: string | null = this.getUser();
    if (userJsonString == null) {
      return '';
    }
    const user: any = JSON.parse(userJsonString);
    return user.userId;
  }


  static getUserRole(): string{
    const userJsonString: string | null = this.getUser();
    if (userJsonString == null) {
      return '';
    }
    const user: any = JSON.parse(userJsonString);
    return user.role;
  }

  static isAdminLoggedIn(): boolean{
    if (this.getToken == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';

  }

  static isCustomerLoggedIn(): boolean{
    if (this.getToken == null) {
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
