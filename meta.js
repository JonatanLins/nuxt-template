const path = require('path')
const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')

module.exports = {
  helpers: {
    escape: function(value) {
      return value.replace(/'/g, '&apos;');
    }
  },
  prompts: {
    name: {
      'type': 'string',
      'required': true,
      'message': 'Project name'
    },
    description: {
      'type': 'string',
      'required': false,
      'message': 'Project description',
      'default': 'Nuxt.js project'
    },
    author: {
      'type': 'string',
      'message': 'Author'
    },
    firebase: {
      type: 'confirm',
      message: 'Do you want to use Firebase?'
    },
    firebaseAuth: {
      when: 'firebase',
      type: 'confirm',
      message: 'Do you want to use Firebase Auth?'
    },
    firebaseFirestore: {
      when: 'firebase',
      type: 'confirm',
      message: 'Do you want to use Firebase Cloud Firestore?'
    },
    vuetify: {
      type: 'confirm',
      message: 'Do you want to use Vuetify?'
    },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    'plugins/firebase.js': 'firebase',
    'middleware/checkAuth.js': 'firebaseAuth',
    'store/auth.js': 'firebaseAuth',
    'plugins/vuetify.js': 'vuetify',
    'assets/style/app.styl': 'vuetify',
    'assets/style/main.scss': '!vuetify',
    'assets/style/_theme.scss': '!vuetify',
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
};
