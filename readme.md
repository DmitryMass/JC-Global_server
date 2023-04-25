BackEnd для: https://github.com/DmitryMass/JC-Global

1. Площадка для управления своими сотрудниками (штатом).
2. Установка планов работ(продаж) включая графики.
3. Полная работа с Графиком работы персонала (отпуски больничные \ смены и др)
4. Главная страница с новостями в компании. Какие-то планы, особые дни, новости новинки в мире и тд.
5. Установка целей компании и их управление (полный CRUD + Архивация).
6. Отдельная Админ панель (Наем или создание нового персонала (новые аккаунты)).
7. Основные админ изменения (новостей \ графиков \ планов \ целей и тд), устанавливается прямо на сайте без дополнительных панелей за счет возможностей React, переиспользование компонентов, без лишних форм и дополнительных панелей.

Технологии:

1. Nodejs + Expressjs
2. MongoDb (mongoose).
3. (Dotenv cors parser etc)
4. JsonWebtoken + Bcrypt - for AUTH.
5. Nodemon (Auto-restart server)

6. Работа с ролями (Админ \ сотрудник)

Используются технологии связки между схемами, TTL(Time-to-Live) с определенным expires для очистки некоторых данных с БД по истечению времени.
'$set $pull $push' для работы с новыми и старыми данными.
