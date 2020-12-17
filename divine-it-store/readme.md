# Installation
```sybase
git clone --recursive https://git.divineit.net/web/divine-it-store.git

poetry install
```

# Post installation
```sybase
source .venv/bin/active
python manage.py initialize
python manage.py rebuild_index --noinput
```

## Notification cronjob
```sybase
*/10 * * * * /var/www/html/divine-it-store/.venv/bin/python /var/www/html/divine-it-store/manage.py notification
```

### How to frontend work

At first go to your project `frontend` folder-
```bash
/divine-it-store/frontend
```

Now run this commend `npm install`

After `npm` install done then you can see new `node_modules` folder in `frontend` folder.

```
!> Before `npm install` make sure `node js` and `gulp` install on your pc.
```


#### For run use this commend
```bash
 gulp watch
```

now you can edit any `css` and `js` in src folder. then your css and js automatically compile and add on your
project static css and js folder.
