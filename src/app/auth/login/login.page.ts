import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  /**
   * Login Form
   *
   */
  public loginForm: FormGroup;

  /**
   * Constructor Method
   *
   */
  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
  }

  /**
   * Handle Form Submit
   *
   */
  public async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });
    await loading.present();
    try {
      await this.authService.login({ ...this.loginForm.value });
    } catch (message) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 5000,
      });
      await toast.present();
    } finally {
      await loading.dismiss();
    }
  }
}
