<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>


## Laravel 11 Live Chat, React SPA with Pusher.

The system must first have the necessary components installed: composer, git, docker. PHP version ^8.2  

Commands init application:

```
> cd /path_to_projects
> git clone https://github.com/Igor-ad/laravel-live-chat.git
> cd ./laravel-live-chat
> cp ./.env.example ./.env

```

It is necessary to fill in the parameters of the environment file ./.env with the following values:
DB_PASSWORD,
PUSHER_APP_ID,
PUSHER_APP_KEY,
PUSHER_APP_SECRET,

```
> composer install
> ./vendor/bin/sail up
> chmod 777 -R ./storage/logs
> chmod 777 ./storage/framework/views
> php artisan key:generate
> php artisan migrate
> npm install 
> npm run build
> php artisan queue:listen

```

##### Examples of web pages

![image](public/img/chat_list.png)
![image](public/img/create_chat.png)
![image](public/img/chat_box.png)
![image](public/img/invite_modal_window.png)
![image](public/img/admin_chaat_box.png)
