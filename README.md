Формы:

Извне: 

-- 1. Форма авторизации.

++ 2. Регистрация пациента. POST users, POST patients.


Пациент:

-- 1. Редактирование собственных данных (ФИО, дата рождения, телефон, email, пароль?). PUT users, PUT patients.

-- 2. Просмотр своих записей на прием - таблица (специальность, ФИО доктора, дата, время, кабинет, кнопка отменить запись). GET timeslots where patientId, GET users where userId(doctor), GET doctorspecialty where userId (добавить специальность в timeslots?).

-- 3. Запись на прием (специальность -> ФИО доктора -> дата -> время -> печать талона). GET specialties, GET doctorspecialties where specialtyId, GET users where userId, GET timeslots where doctorId, PUT timeslots.

-- 4. Удаление своей записи на прием (кнопка в таблице записей). PUT timeslots where timeslotId.

-- 5. Просмотр своей карточки - таблица (дата, специальность, ФИО доктора, заключение). GET diagnosis where patientId, GET doctorspecialties where doctorId, GET doctors where doctorId (добавить специальность в diagnosis?).


Доктор:

-- 1. Редактирование собственных данных (ФИО, телефон, email, пароль?) PUT users, PUT doctors.

++ 2. Просмотр своего расписания - таблица (дата, время, кабинет, специальность, ФИО пациента (или его отсутствие), кнопка карточка пациента). GET timeslots where doctorId, GET patients where patientId.

-- 3. Просмотр и редактрование карточки пациента записанного на прием, таблица (дата, специальность, ФИО доктора, заключение, кнопка создать заключение). GET diagnosis where patientId, GET doctorspecialties where doctorId, GET doctors where doctorId (добавить специальность в diagnosis?), POST diagnosis.

-- 4. Запись текущего пациента (который сейчас на приёме или был на нём в течение часа на приём к другому доктору) (проверка времени, как?). Специальность -> ФИО доктора -> дата -> время -> печать талона. GET specialties, GET doctorspecialties where specialtyId, GET doctors where doctorId, GET timeslots where doctorId, PUT timeslots.


Администратор:

-- 1. Редактирование собственных данных (ФИО, email, пароль?) PUT users.

-- 2. Регистрация администратора. POST users.

+- 3. Регистрация доктора. POST users, POST doctors, GET specialties, POST doctorspecialties. Как реализовать выбор нескольких специальностей? Формочка, добавляющаяся при заполнении предыдущей?

++ 4. Регистрация пациента. POST users, POST patients.

++ 5. Регистрация кабинетов. POST cabinets.

++ 6. Регистрация специальностей. POST specialties.

-- 7. Редактирование специальностей докторов. POST doctorspecialties, DELETE doctorspecialties where doctorId.

--  8. Запись пациента на прием (ФИО пациента -> специальность -> ФИО доктора -> дата -> время -> печать талона). GET users where firstName, GET patients where userId, GET specialties, GET doctorspecialties where specialtyId, GET doctors where doctorId, GET timeslots where doctorId, PUT timeslots.

++ 9. Просмотр общего расписания докторов, таблица (дата, время, специальность, ФИО доктора, кабинет, ФИО пациента (или отсутствие). GET timeslots, GET users where userId, GET cabinets where cabinetId, GET specialties where specialtyId.

+- 10. Список докторов, таблица (Специальность, ФИО доктора, кнопка расписание). GET doctors, GET doctorspecialties where userId, GET users where userId.

-- 11. Составление расписания (Доктор -> специальность -> дата -> начальное время -> конечное время -> кабинет).
GET doctorspecialties where userId, GET schedules where userId, date (проверка занятости кабинета и доктора на указанную дату). 










# Angularclient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
