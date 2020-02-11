import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({ selector: 'app-main-menu', templateUrl: './main-menu.component.html', styleUrls: ['./main-menu.component.scss'] })
export class MainMenuComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[];
  public currentUser: IUser;
  
  constructor(private users: UserService) { 
    this._subscriptions = [];
    this.currentUser = null;
  }

  public ngOnInit(): void {
    const curUser = this.users.currentUser.subscribe(r => this.currentUser = r);

    this._subscriptions.push(curUser);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
