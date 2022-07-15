import { Component, OnInit } from '@angular/core';
import { faFacebookSquare, faLinkedin, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  FBicon = faFacebookSquare
  LIicon = faLinkedin
  IGicon = faInstagram
  BWicon = faAdjust
  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  formatName(email: any) {
    return email.replace("@yumzandsweetz.com", "")
  }

  logout() {
    this.authService.LogOut()
  }

}
