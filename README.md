# teamcity-booster расширения для работы с TeamCity

## Возможности 

1. Продвинуть сборку в начло очереди
  <br>В строке поиска ищем по ключевым словам нужную сборку. Жмем кнопку Push пока не достигнем желаемого результата.
![movetotop](/src/img/movetotop.png)

2. Возможность запустить одновременно сразу несколько сборок. 
<br>**Будте внимательны, что запускаете и с какими параметрами!**
<br> Ищем  нужную сборку, кнопкой *Add* выбираем желаемые сборки, которые добавяться в список для сборки. Жмем *Build*
![runBuilds](/src/img/run_builds.png)

3. Просмотр всех доступных контекстных параметров. 
<br> На странице Versioned Settings -> Context Parameters формируеться таблица с контекстными параметрами и их текущими значениями
![runBuilds](/src/img/contextparams.png)


# Перед использованием
На вкладке *Teamcity Settings* необходимо указать своb REST API Token и CSRF Token.
REST API Token можно сгенерировать перейдя в свой профиль на TC во вкладке *Access Tokens*. CSRF Token можно получить по ссылке  https://your-server/authenticationTest.html?csrf (your-server замените на base-url TeamCity)

![settings](/src/img/settings.png)

# Загрузка расширения в браузер
1. Откройте страницу расширений Chrome в вашем браузере
2. Переключите переключатель режима разработчика в правом верхнем углу
3. Выберите опцию ЗАГРУЗИТЬ РАСПАКОВАННОЕ РАСШИРЕНИЕ
4. Найдите папку dist и выберите ее
> Если вы хотите изменить исходный код расширения, вам необходимо обновлять расширение на странице расширений Chrome при каждом изменении кода.


# Как собрать их исходников

### Для сборки нехобходим Node.js ###

### Перед сборкой проекта установите переменную NODE_OPTIONS

Linux and macOS (Windows Git Bash)
```
export NODE_OPTIONS=--openssl-legacy-provider
````
Windows command prompt
```
set NODE_OPTIONS=--openssl-legacy-provider
```

Windows PowerShell
```
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

## Сборка проекта
1. Установите все необходимые зависимости
```
$ npm install
```

2. Сборка production mode
```
$ npm run build
```

3. Сборка development mode (позволяет вам изменять код на лету без пересборки)
```
$ npm run dev
```

