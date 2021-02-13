# Help
<br/>
<em>This help document was last updated on February 12th, 2021 for version 1.0.0.</em><br/><br/>

Bar 3 is an application that helps you design and send messages to each new player of the game. You can design a message using the message creator monitor activity using the dashboard.
<br/>

## Configuration

You can configure the application using the configuration found in the left navigation area.  You need to enter your Politics and War API Key from your account page found [here](https://politicsandwar.com/account/). The second field: minutes to update, defines to time in minutes before the application checks for new nations. At the bottom of the page is a preview of your message that is sent to new players. This is not how it will always appear but it's the approximation based on what you put in, clicking the edit button will bring you to the message creator page.
<br/>

## The Bar 3 Toggle Button

The button in the top right corner of your screen turns Bar 3 on or off. Turning Bar 3 on means it will send messages to every new person who joins Politics and War. If its off, it will not.
<br/>

## Message Creator

The message creator consists of two parts: the basic editor, which will allow you to apply basic text styling and import images easily, and the advanced editor. The advanced editor gives you a much higer level of control of what your message will look like. It takes [HTML](https://www.codecademy.com/learn/learn-html) and [CSS](https://www.codecademy.com/learn/learn-css), clicking those links will bring you to a guide on how to use the two technologies. Most importantly, test your message before you send it, and turn off Bar 3 when editing messages to avoid sending the wrong message to new recruits.
<br/>

### Customization

Each message can be customized using the tag \\(nation) to subsitute for the name of the recruit's nation, and the tag \\(leader) to subsitute for the name of the leader of the recruit's nation. You can use these customizations inside the message or just the subject.

<br/>

### Advanced Editor
<br/>

#### Learning Requirements
1. [HTML](https://www.codecademy.com/learn/learn-html)
2. [CSS](https://www.codecademy.com/learn/learn-css)
<br/>

#### Recommendations

We recommend when creating your message that you test after you make a change, in order to prevent the message showing up broken inside of Politics and War.<br/>

#### Tips

- Use divs or spans as much as possible, the more basic the element the higher chance it will work inside of P&W
- To get a white background, make a single main element with everything inside of it and style it with 
        background-color: #FFFFFF
- Images should be encoded with base 64 and added through the image source.