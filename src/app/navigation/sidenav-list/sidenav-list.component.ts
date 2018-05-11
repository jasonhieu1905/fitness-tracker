import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() emitCloseSideNav = new EventEmitter();
  isAuthed: Observable<boolean>;

  constructor(private authService: AuthService,
    private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuthed = this.store.select(fromRoot.getIsAuthed);
  }

  onCloseSideNav() {
    this.emitCloseSideNav.emit();
  }

  onLogout() {
    this.onCloseSideNav();
    this.authService.logout();
  }

}
