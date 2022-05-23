__Deploy en Google Play__
cambiar versionCode en app.json
Comando: yarn run build:android
si no funciona la version de expo: expo upgrade 42
app-bundle
ir a la url que te devuelve, download
(https://play.google.com/console/)
prueba interna
crear nueva version

__Correr__ 
Comando: yarn start
hacerlo en consola de git bash asi se autentica con mi usuario
y entonces te aparece en la app como projects in development

para iniciar sesion en bash
expo login -u tpulenta@gmail.com -p [password]


si cuando ejecutas yarn start te da el siguiente error: 
error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Metro Bundler process exited with code 1

Tenés que ir a [aca](./node_modules/metro-config/src/defaults/blacklist.js)

y reemplazar : 
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

por: 

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

(sacado de https://github.com/expo/expo-cli/issues/1074 )