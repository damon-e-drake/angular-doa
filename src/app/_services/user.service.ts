import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api: string;

  private _currentUser: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(private http: HttpClient) {
    this.api = `${environment.api}/v1/users`;
    this.initObservables();
  }

  private initObservables(): void {
    const lsUser: IUser = JSON.parse(localStorage.getItem("au"));
    this._currentUser = new BehaviorSubject<IUser>({
      id: 'xxxxxxxxx',
      firstName: 'Damon',
      lastName: 'Drake',
      displayName: 'Damon Drake',
      email: 'damon.e.drake@gmail.com'
    });
    this.currentUser = this._currentUser.asObservable();
  }

  public getCurrentUser(): IUser {
    return this._currentUser.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.api}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this._currentUser.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }

  public getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.api}`);
  }

  /**
   * Returns a user based on ID or Email Address
   * @param id User ID or User Email Address
   */
  public get(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.api}/${id}`);
  }

}
