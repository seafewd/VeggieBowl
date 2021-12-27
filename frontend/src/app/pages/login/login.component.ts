import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // reset login status
    //this.authService.logout();

    // TODO:
    // get return url from route parameters or defaults to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log(this.returnUrl)
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      if (res.status == 200) {
        this.router.navigateByUrl(this.returnUrl);
        this.notificationService.show('Successfully logged in!');
      } else {
        this.notificationService.show('Login failed - wrong email or password!');
      }
    })
  }

}
