Para correrlo: yarn start
hacerlo en consola de git bash asi se autentica con mi usuario
y entonces te aparece en la app como projects in development

para iniciar sesion en bash
explo login -u tpulenta@gmail.com -p [password]


si cuando ejecutas yarn start te da el siguiente error: 
error Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class. Run CLI with --verbose flag for more details.

Metro Bundler process exited with code 1

Tenés que ir a [\node_modules\metro-config\src\defaults\blacklist.js]

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