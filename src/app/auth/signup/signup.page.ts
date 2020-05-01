import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  /**
   * Signup Form Group
   *
   */
  public signupForm: FormGroup;

  /**
   * Constructor Method
   *
   */
  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      password_confirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
    });
  }

  public async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });
    await loading.present();
    try {
      await this.authService.signup({ ...this.signupForm.value });
    } catch (message) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 5000,
      });
      await toast.present();
    } finally {
      loading.dismiss();
    }
  }
}
