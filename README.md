# sprops' foolishly written code challenge

Hello reviewer! Take a peak at all that I did. I left notes about the project here:


## Code Notes
from the root directory
to compile the back end
```
pip install -r requirements.txt
python minimal.py runserver
```

to compile the front end (using node 10.0+)
```
npm install
gulp
```

this project uses `gulp-livereload`. 
to use gulp livereload, add the [livereload chrome extension](http://livereload.com/extensions/)

### HTML

I wrote all my HTML with accessibility in mind. I leveraged semantic html elements (`<header> <footer> <main> <section> <article> <aside>`) as much as I could throughout the project. When I did not I made an effort to make them as accessible. For example links styled as a buttons include `role='button'` and the logo link has an `aria-label` since there is no link text.

A lot went into making the data table in the Join CTA accessible following guidelines [found on Mozilla dev](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Table_Role) and [W3](https://www.w3.org/TR/wai-aria-practices-1.1/examples/table/table.html). 


### CSS

I modelled my html / css structure after BEM. I tried to keep my css naming & project structure as literal as possible. properties are named to reflect what they are or what they are doing. the project is structured based on the principles of atomic design - layouts are made of components which are made of elements. I tried to keep everything as clean and repeatable as possible so that the elements could be extended beyond this page.

A few fun CSS things!

I wanted to recreate the striped Motley Fool border without using extra markup.
I was able to achieve this with a psuedo-selector (::after) and a repeating background gradient. I then made it into a mixin that takes a few params so I was able to use it throughout the challenge without repeating code. check it at the bottom of `dev/scss/utils/_mixins.scss`

```
background: $blue repeating-linear-gradient(
	to right, 
	$blue, $blue 16.66%,
	$yellow 16.66%, $yellow 33.33%,
	$red 33.33%, $red 50%,
	$green 50%, $green 66.66%,
	// could be removed (?)
	$blue 66.66%, $blue 83.33%,
	$yellow 83.33%, $yellow 100%
);
```
As noted in the code comment: after 66.66% the pattern repeats, therefore the blue & yellow did not need to be expressly written. however, I kept it in since it felt weird not finishing at 100% and in case it caused any cross-browser weirdness.

---

The data table worked almost perfectly from mobile to desktop. To avoid writing extra code that would be shown / hide, I instead labeled the percentages using a psuedo element that I styled to look good in the mobile version and only had to show / hide the column header. For accessibility on mobile with the hidden column header, I added a robust aria-label on the span.

---

I gave the article bureau tags different colors as a stylistic choice. the colors are random from the colors.scss file provided to me.

---

The CSS is prefixed and should be cross browser back to IE11.

### JS

This project uses npm & gulp to manage dependencies and compile. The gulpfile was written for this project based on an old gulpfile I use in freelance work. It took longer than I planned to rewrite the entire gulpfile, but I'm glad I did!

Article loading, display and filtering is all handled with Vue. Within the view project, I created a filter and a few methods to handle the project. The filter could have been a method, but I wanted to show variety. Overall, it's lightweight and has the capacity to be expanded.

I ran into a small issue when setting up Vue. Both Vue and Django use `{{ handlebar }}` templating. My Vue app is initialized with delimiters setting the templating to `[[ brackets ]]` instead to avoid conflict. 

This project is jQuery free!
