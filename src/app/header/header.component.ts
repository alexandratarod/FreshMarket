import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent{

    isLoggedIn: boolean = false;

    

    constructor(private authService: AuthService) {
        this.isLoggedIn = authService.getIsLoggedIn();
      }

      logout() {
        this.authService.logout();
        
      }
        
    
}