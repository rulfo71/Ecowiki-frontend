Ecowiki is a mobile app deployed on Google Play Store. Uses the following technologies:

- Frontend: React Native (https://github.com/rulfo71/Ecowiki-frontend)
- Backend: NestJS deployado en GCP (https://github.com/rulfo71/Ecowiki-Backend)
- Base de Datos: Firebase
It's a collaborative app where you can search on which container goes each different kind of products on the market. You can search by name or codebar. When a product is searched and not found, another user can add it, allowing the infinity of products to be added to the database.

Getting Started
First, run the development server:

Para correrlo: yarn start
hacerlo en consola de git bash asi se autentica con mi usuario
y entonces te aparece en la app como projects in development

para iniciar sesion en bash
expo login -u xx@xx.com -p [password]

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
