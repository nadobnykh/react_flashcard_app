### ✅ Step 20: **Q: How do I create a new NestJS project?**
**Terminal**:

```bash
npm i -g @nestjs/cli
nest new contact-api
cd contact-api
npm run start
```

---

### ✅ Step 21: **Q: How do I create a controller for receiving the contact form data?**
**Terminal**:

```bash
nest generate controller contact
```

---

### ✅ Step 22: **Q: How do I handle POST requests in the controller?**
**File**: `src/contact/contact.controller.ts`

```ts
import { Body, Controller, Post } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  @Post()
  handleContact(@Body() body: any) {
    console.log('Received:', body);
    return { success: true };
  }
}
```

---

### ✅ Step 23: **Q: How do I allow requests from Angular (CORS)?**
**File**: `src/main.ts`

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow Angular on port 4200
  await app.listen(3000);
}
```

---

### ✅ Step 24: **Q: How do I install TypeORM and SQLite support?**
**Terminal**:

```bash
npm install @nestjs/typeorm typeorm sqlite3
```

---

### ✅ Step 25: **Q: How do I configure TypeORM to use SQLite?**
**File**: `src/app.module.ts`

```ts
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'contacts.db',
      entities: [Contact],
      synchronize: true,
    }),],})
```

> Note: We'll define the `Contact` entity next.

---

### ✅ Step 26: **Q: How do I define an entity to store contact data?**
**File**: `src/contact/contact.entity.ts`

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  ...
}
```

---

### ✅ Step 27: **Q: How do I register the entity in the module?**
**File**: `src/contact/contact.module.ts`

```ts
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
})
```

---

### ✅ Step 28a: **Q: How do I inject the repository?**
**File**: `src/contact/contact.service.ts`

```ts
import // @see: Q 28b
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private repo: Repository<Contact>,
  ) {}
}
```

---

### ✅ Step 28b: **Q: How do I save submissions after repository is injected?**
**File**: `src/contact/contact.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
@Injectable()
export class ContactService {
  // constructor defined in Q 28a
  async saveContact(data: Contact) {
    return this.repo.save(data);
  }
}
```

---

### ✅ Step 29: **Q: How do I call the service from the controller?**
**File**: `src/contact/contact.controller.ts`

```ts
constructor(private service: ContactService) {}

@Post()
async handleContact(@Body() body: Contact) {
  const saved = await this.service.saveContact(body);
  return { success: true, id: saved.id };
}
```

---

### ✅ Step 30: **Q: How do I add a GET route to list all contacts?**
**File**: `src/contact/contact.controller.ts`

```ts
@Get()
findAll() {
  return this.service.getAllContacts();
}
```

---

### ✅ Step 31: **Q: How do I implement the service method to fetch all contacts?**
**File**: `src/contact/contact.service.ts`

```ts
getAllContacts() {
  return this.repo.find();
}
```

---

### ✅ Step 32: **Q: How do I test the `/contacts` endpoint?**
**Option A – Browser:**
Open [http://localhost:3000/contacts](http://localhost:3000/contacts)

**Option B – Terminal (curl):**

```bash
curl http://localhost:3000/contacts
```

---

### ✅ Step 33: **Q: How do I create a DTO for the contact data?**
**Terminal**:

```bash
nest generate class contact/dto/create-contact.dto --no-spec
```

---

### ✅ Step 34: **Q: How do I define validation rules in the DTO?**
**File**: `src/contact/dto/create-contact.dto.ts`

```ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
...
}
```

---

### ✅ Step 35: **Q: How do I use the DTO in the controller?**
**File**: `src/contact/contact.controller.ts`

```ts
import { CreateContactDto } from './dto/create-contact.dto';
import { Body, Post } from '@nestjs/common';

@Post()
async handleContact(@Body() createContactDto: CreateContactDto) {
  const saved = await this.service.saveContact(createContactDto);
  return { success: true, id: saved.id };
}
```

---

### ✅ Step 36: **Q: How do I enable validation globally in the app?**
**File**: `src/main.ts`

```ts
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
```

---

### ✅ Step 37: **Q: How do I update the service to handle the DTO?**
**File**: `src/contact/contact.service.ts`

```ts
import { CreateContactDto } from './dto/create-contact.dto';

async saveContact(createContactDto: CreateContactDto) {
  const contact = this.repo.create(createContactDto); // Auto-maps DTO to entity
  return this.repo.save(contact);
}
```

---

### ✅ Step 38: **Q: How do I handle validation errors?**
NestJS will automatically send **400 Bad Request** with details if validation fails.

Example response:

```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

---
