# reactchat
Chat in real time

##Plugins vscode
Commentator
ESLint
Git History
Git Lens
Material Icon
Nunjucks
React/Redux Snippets
Redux DevTools

##Firebase
1. To do so, we'll first need to install the Firebase command-line tools:
npm install -g firebase-tools
Don’t forget the -g. This flag installs the tools globally on your machine.
2. The next step is to log in to our Firebase tools:
firebase login
3. To complete our Firebase tools setup, we can now initialize our app as a
Firebase project, similar to what we did with npm. Ensure that you run this from
the root of the project folder:
firebase init
4. In the first question it then prompts you for, use the arrow keys and the Spacebar to
select both Functions and Hosting. We will use Firebase's Cloud Functions later on.
Don't select Database, that's for configuring database rules locally; we'll rely on the
Firebase console instead.
 * Functions: Configure and deploy Cloud Functions
 * Hosting: Configure and deploy Firebase Hosting sites
5. When it asks for a default Firebase project, select chatastrophe(or whatever you
named this project in the Firebase console).
6. For the question Do you want to install dependencies with npm now?, enter y.
7. Next, it'll ask you what folder you want to use as your public directory. Enter build,
not public. Firebase is asking what folder to use to deploy your project; we want our
final compiled build, including our transpiled JavaScript and therefore, we want the
build folder.
8. Let's move to the next question now! Do we want to configure our app as a single-
page application? Heck yes. Decline overwriting index.html though (however, no
worries if you say yes; we regenerate our build/index.html every time we run our
build command).
