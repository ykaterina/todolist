// Material Design Login Form JavaScript

import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from "@angular/material/input";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MaterialLoginForm {

    @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
    @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
    @ViewChild('passwordToggle') passwordToggle!: ElementRef<HTMLButtonElement>;

    showPassword = false;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    constructor() {
        // this.form = document.getElementById('loginForm');
        // this.emailInput = document.getElementById('email');
        // this.passwordInput = document.getElementById('password');
        // this.passwordToggle = document.getElementById('passwordToggle');
        // this.submitButton = this.form.querySelector('.material-btn');
        // this.successMessage = document.getElementById('successMessage');
        // this.socialButtons = document.querySelectorAll('.social-btn');

        this.init();
    }

    init() {
        // this.bindEvents();
        // this.setupPasswordToggle();
        // this.setupSocialButtons();
        // this.setupRippleEffects();
    }

    togglePasswordVisibility(event: MouseEvent) {
        this.showPassword = !this.showPassword;
        const input = this.showPassword ? 'text' : 'password';
        this.passwordInput.nativeElement.type = input;
        const rippleContainer = this.passwordToggle.nativeElement.querySelector('.toggle-ripple') as HTMLElement | null;
        if (rippleContainer) {
            this.createRipple(event, rippleContainer);
        }
    }

    // setupSocialButtons() {
    //     this.socialButtons.forEach(button => {
    //         button.addEventListener('click', (e) => {
    //             const provider = button.classList.contains('google-material') ? 'Google' : 'Facebook';
    //             this.createRipple(e, button.querySelector('.social-ripple'));
    //             this.handleSocialLogin(provider, button);
    //         });
    //     });
    // }

    setupRippleEffect(e: FocusEvent | MouseEvent) {
        const input = e.target as HTMLElement | null;
        if (!input) return;

        const parent = input.parentElement;
        if(!parent) return;

        const rippleContainer = parent.querySelector('.ripple-container') as HTMLElement | null;
        if (rippleContainer) {
           this.createRipple(e, rippleContainer);
        }
    }

    createRipple(event: FocusEvent | MouseEvent, container: HTMLElement) {
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        let clientX = 0;
        let clientY = 0;

        // Get coordinates only for MouseEvent
        if (event instanceof MouseEvent) {
            clientX = event.clientX;
            clientY = event.clientY;
        } else {
            // For FocusEvent, center the ripple
            clientX = rect.left + rect.width / 2;
            clientY = rect.top + rect.height / 2;
        }

        const x = clientX - rect.left - size / 2;
        const y = clientY - rect.top - size / 2;

        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        container.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }



//     async handleSubmit(e) {
//         e.preventDefault();

//         const isEmailValid = this.validateEmail();
//         const isPasswordValid = this.validatePassword();

//         if (!isEmailValid || !isPasswordValid) {
//             // Add material feedback for invalid form
//             this.submitButton.style.animation = 'materialPulse 0.3s ease';
//             setTimeout(() => {
//                 this.submitButton.style.animation = '';
//             }, 300);
//             return;
//         }

//         this.setLoading(true);

//         try {
//             // Simulate Material Design authentication flow
//             await new Promise(resolve => setTimeout(resolve, 2000));

//             // Show Material success state
//             this.showMaterialSuccess();
//         } catch (error) {
//             this.showError('password', 'Sign in failed. Please try again.');
//         } finally {
//             this.setLoading(false);
//         }
//     }

//     async handleSocialLogin(provider, button) {
//         console.log(`Initiating ${provider} sign-in...`);

//         // Add Material loading state
//         button.style.pointerEvents = 'none';
//         button.style.opacity = '0.7';

//         try {
//             await new Promise(resolve => setTimeout(resolve, 1500));
//             console.log(`Redirecting to ${provider} authentication...`);
//             // window.location.href = `/auth/${provider.toLowerCase()}`;
//         } catch (error) {
//             console.error(`${provider} authentication failed: ${error.message}`);
//         } finally {
//             button.style.pointerEvents = 'auto';
//             button.style.opacity = '1';
//         }
//     }

//     setLoading(loading) {
//         this.submitButton.classList.toggle('loading', loading);
//         this.submitButton.disabled = loading;

//         // Disable social buttons during login
//         this.socialButtons.forEach(button => {
//             button.style.pointerEvents = loading ? 'none' : 'auto';
//             button.style.opacity = loading ? '0.6' : '1';
//         });
//     }

//     showMaterialSuccess() {
//         // Hide form with Material motion
//         this.form.style.transform = 'translateY(-16px) scale(0.95)';
//         this.form.style.opacity = '0';

//         setTimeout(() => {
//             this.form.style.display = 'none';
//             document.querySelector('.social-login').style.display = 'none';
//             document.querySelector('.signup-link').style.display = 'none';

//             // Show success with Material elevation
//             this.successMessage.classList.add('show');

//             // Add Material success animation
//             const successIcon = this.successMessage.querySelector('.success-icon');
//             successIcon.style.animation = 'materialSuccessScale 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';

//         }, 300);

//         // Simulate redirect with Material timing
//         setTimeout(() => {
//             console.log('Redirecting to dashboard...');
//             // window.location.href = '/dashboard';
//         }, 2500);
//     }
// }

// Add Material Design specific animations
// if (!document.querySelector('#material-keyframes')) {
//     const style = document.createElement('style');
//     style.id = 'material-keyframes';
//     style.textContent = `
//         @keyframes materialShake {
//             0%, 100% { transform: translateX(0); }
//             25% { transform: translateX(-4px); }
//             75% { transform: translateX(4px); }
//         }
        
//         @keyframes materialPulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.02); }
//             100% { transform: scale(1); }
//         }
        
//         @keyframes materialSuccessScale {
//             0% { transform: scale(0); }
//             50% { transform: scale(1.1); }
//             100% { transform: scale(1); }
//         }
//     `;
//     document.head.appendChild(style);
    }