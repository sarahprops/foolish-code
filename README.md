# sprops' foolishly written code challenge

Hello reviewer! Take a peak at all that I did. I left notes about the project here:


## Overall Thoughts
* 



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


### HTML

### CSS

I wanted to recreate the striped Motley Fool border without using extra markup.
I was able to achieve this with a psuedo-selector (::after) and a repeating background gradient. I then made it into a mixin that takes a few params so I was able to use it throughout the challenge without repeating code.

```
background: $blue repeating-linear-gradient(
	to right, 
	$blue, $blue 16.66%,
	$yellow 16.66%, $yellow 33.33%,
	$red 33.33%, $red 50%,
	$green 50%, $green 66.66%,
	// pretty sure this is unneeded
	$blue 66.66%, $blue 83.33%,
	$yellow 83.33%, $yellow 100%
);
```
As noted in the code comment, after 66.66% the pattern repeats, meaning declaring anything after that is redundant. however, I kept it in since it felt weird finishing at 66.66% and in case there were any crossbrowser quarks with not bringing it to 100%.


### JS


## Other Notes


Rock on!