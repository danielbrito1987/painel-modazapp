import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  nome: any;
  picture: any;

  userMenu = [{ title: 'Perfil' }, { title: 'Sair', link: '/auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private authService: NbAuthService) {
                this.authService.onTokenChange()
                  .subscribe((token: NbAuthJWTToken) => {
                    if (token.isValid()) {
                      this.user = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
                      this.nome = this.user.name;
                      this.picture = './assets/images/' + this.user.picture;
                      localStorage.setItem("IdLoja", this.user.idLoja);
                    }
                  });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = { name: localStorage.getItem('NomeUsuario'), picture: 'assets/images/' + localStorage.getItem('Logomarca') });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
