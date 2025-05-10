### ✅ Step 1: **Q: How do I install Angular CLI globally so I can use `ng`?**
**Terminal**:

```bash
npm install -g @angular/cli
```

---

### ✅ Step 2: **Q: How do I create a new Angular project with routing and CSS?**
**Terminal**:

```bash
ng new contact-form-app
cd contact-form-app
ng serve
```

---

### ✅ Step 3: **Q: How do I generate a new contact form component?**
**Terminal**:

```bash
ng generate component contact-form
```

---

### ✅ Step 4: **Q: How do I register the `ReactiveFormsModule` to use reactive forms?**
**File**: `src/app/app.module.ts`

```ts
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
})
export class AppModule {}
```

---

### ✅ Step 5: **Q: How do I display the contact form on the main page?**
**File**: `src/app/app.component.html`

```html
<app-contact-form></app-contact-form>
```

---

### ✅ Step 6: **Q: How do I define a reactive form with name, email, and message?**
**File**: `src/app/contact-form/contact-form.component.ts`

```ts
form = this.fb.group({
  name: [''],
  email: [''],
  message: ['']
});
```

---

### ✅ Step 7: **Q: How do I inject the `FormBuilder` to construct the form?**
**File**: `src/app/contact-form/contact-form.component.ts`

```ts
constructor(private fb: FormBuilder) {}
```

---

### ✅ Step 8: **Q: How do I build the form template with input fields and a submit button?**
**File**: `src/app/contact-form/contact-form.component.html`

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="name" placeholder="Name" />
  <input formControlName="email" placeholder="Email" />
  <textarea formControlName="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>
```

---

### ✅ Step 9: **Q: How do I handle form submission and log the values?**
**File**: `src/app/contact-form/contact-form.component.ts`

```ts
onSubmit() {
  console.log(this.form.value);
}
```

---

### ✅ Step 10: **Q: How do I add basic validation to the name and email fields?**
**File**: `src/app/contact-form/contact-form.component.ts`

```ts
import { Validators } from '@angular/forms';

form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  message: ['']
});
```

---

### ✅ Step 11: **Q: How do I add Angular Material to my project?**
**Terminal**:

```bash
ng add @angular/material
```

> Choose a theme (e.g. Indigo/Pink), enable global typography and animations.

---

### ✅ Step 12: **Q: How do I import Material form modules into the app?**
**File**: `src/app/app.module.ts`

```ts
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule,
  ],
})
```

---

### ✅ Step 13: **Q: How do I style form fields using Material components?**
**File**: `src/app/contact-form/contact-form.component.html`

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <mat-form-field appearance="fill">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" />
  </mat-form-field>
  ...
  <button mat-raised-button color="primary" type="submit">Send</button>
</form>
```

---

### ✅ Step 14: **Q: How do I ensure Material fonts and styles are loaded?**
✅ Already done when you ran `ng add @angular/material`.

If not, verify in `angular.json` that `styles` includes:

```json
"node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
```

---

### ✅ Step 15: **Q: How do I wrap the form for better spacing?**
**File**: `src/app/contact-form/contact-form.component.css`

```css
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}
```

---

### ✅ Step 16: **Q: How do I enable HTTP requests in Angular?**
**File**: `src/app/app.module.ts`

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
```

---

### ✅ Step 17: **Q: How do I create a service to send form data?**
**Terminal**:

```bash
ng generate service contact
```

---

### ✅ Step 18: **Q: How do I send a POST request in the contact service?**
**File**: `src/app/contact.service.ts`

```ts
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

sendContact(data: any) {
  return this.http.post('http://localhost:3000/contact', data);
}
```

---

### ✅ Step 19: **Q: How do I send the form data when the form is submitted?**
**File**: `src/app/contact-form/contact-form.component.ts`

```ts
constructor(private contactService: ContactService) {}

onSubmit() {
  this.contactService
    .sendContact(this.form.value)
      .subscribe();
}
```

---
