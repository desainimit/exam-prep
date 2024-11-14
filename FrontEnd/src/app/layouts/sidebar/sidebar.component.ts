import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from '@app/core/services/shared.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  isMobile = false;
  isCollapsed = false;

  constructor(
    private observer: BreakpointObserver,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.sharedService.toggleMenu$.subscribe(() => {
      this.toggleMenu();
    });
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
