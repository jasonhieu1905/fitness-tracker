import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter();
  isAuthed: Observable<boolean>;
  subscription = new Subscription();
  constructor(private authService:  AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuthed = this.store.select(fromRoot.getIsAuthed);
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
