import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../shared/services/supabase.service';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './profile-page.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
    private fb = inject(FormBuilder);
    private supabase = inject(SupabaseService);
    private router = inject(Router);

    profileForm!: FormGroup;
    passwordForm!: FormGroup;

    loading = signal(false);
    successMessage = signal('');
    errorMessage = signal('');
    activeTab = signal<'info' | 'password' | 'preferences'>('info');

    userEmail = signal('');
    userName = signal('');
    userPhone = signal('');
    createdAt = signal('');

    ngOnInit() {
        this.initForms();
        this.loadUserData();
    }

    private initForms() {
        this.profileForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            phone: ['', [Validators.pattern(/^\d{10}$/)]],
            email: [{ value: '', disabled: true }]
        });

        this.passwordForm = this.fb.group({
            currentPassword: ['', [Validators.required, Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    private passwordMatchValidator(group: FormGroup) {
        const newPassword = group.get('newPassword')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return newPassword === confirmPassword ? null : { passwordMismatch: true };
    }

    private async loadUserData() {
        try {
            this.loading.set(true);
            const { data: { user }, error: authError } = await this.supabase.client.auth.getUser();

            if (authError || !user) {
                this.router.navigate(['/login']);
                return;
            }

            this.userEmail.set(user.email || '');
            this.createdAt.set(new Date(user.created_at).toLocaleDateString('es-MX'));

            // Get additional user data from users table
            const { data: userData, error: userError } = await this.supabase.client
                .from('users')
                .select('full_name, phone, role')
                .eq('id', user.id)
                .single();

            if (!userError && userData) {
                this.userName.set(userData.full_name || '');
                this.userPhone.set(userData.phone || '');

                this.profileForm.patchValue({
                    fullName: userData.full_name || '',
                    phone: userData.phone || '',
                    email: user.email || ''
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            this.errorMessage.set('Error al cargar los datos del usuario');
        } finally {
            this.loading.set(false);
        }
    }

    async updateProfile() {
        if (this.profileForm.invalid) {
            return;
        }

        try {
            this.loading.set(true);
            this.errorMessage.set('');
            this.successMessage.set('');

            const { data: { user } } = await this.supabase.client.auth.getUser();
            if (!user) return;

            const { error } = await this.supabase.client
                .from('users')
                .update({
                    full_name: this.profileForm.value.fullName,
                    phone: this.profileForm.value.phone,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            this.successMessage.set('Perfil actualizado correctamente');
            this.userName.set(this.profileForm.value.fullName);
            this.userPhone.set(this.profileForm.value.phone);

            setTimeout(() => this.successMessage.set(''), 3000);
        } catch (error: any) {
            console.error('Error updating profile:', error);
            this.errorMessage.set(error.message || 'Error al actualizar el perfil');
        } finally {
            this.loading.set(false);
        }
    }

    async updatePassword() {
        if (this.passwordForm.invalid) {
            if (this.passwordForm.errors?.['passwordMismatch']) {
                this.errorMessage.set('Las contraseñas no coinciden');
            }
            return;
        }

        try {
            this.loading.set(true);
            this.errorMessage.set('');
            this.successMessage.set('');

            const { error } = await this.supabase.client.auth.updateUser({
                password: this.passwordForm.value.newPassword
            });

            if (error) throw error;

            this.successMessage.set('Contraseña actualizada correctamente');
            this.passwordForm.reset();

            setTimeout(() => this.successMessage.set(''), 3000);
        } catch (error: any) {
            console.error('Error updating password:', error);
            this.errorMessage.set(error.message || 'Error al actualizar la contraseña');
        } finally {
            this.loading.set(false);
        }
    }

    async logout() {
        try {
            await this.supabase.client.auth.signOut();
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    setActiveTab(tab: 'info' | 'password' | 'preferences') {
        this.activeTab.set(tab);
        this.errorMessage.set('');
        this.successMessage.set('');
    }
}
