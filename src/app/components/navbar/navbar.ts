import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DrawerModule } from 'primeng/drawer';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonModule, FormsModule, AutoCompleteModule, DrawerModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  text: string | undefined;

  visible: boolean = false;

  search(event: any) {
  }

}
