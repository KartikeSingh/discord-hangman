# Installation
```
npm i discord-hangman-game
```

# What is this for?
This package is created for making hangman game on discord.

# Why?
This package is very easy to use and you can request new updates and stuff simply by messaging me on my [discord server](https://discord.gg/YayNfuEkFU)

# How?
```js
const hangman = require('discord-hangman-game');
const game = new hangman();

const result = await game.start(interaction);

/**
 result = {
    image, // the image buffer
    attachment, // Discord message attachment
    win, // -1 => timeout, 0 => cancel, 1 => win, 2 => loose
    reason, // the win reason in string
    word, // the answer of the game
    message, // the message object of game
 }
 */
```

# Advanced (Custom Messages)
```js
const hangman = require('discord-hangman-game');

/**
 * The Hangman game options
 * @param {Object} options The options for the game
 * @param {Number} options.autoDelete Time after which auto delete useless bot messages. less than 0, to not delete
 * @param {String} options.homeTitle The game home screen title.
 * @param {String} options.homeDescription The game home screen description. use {word} to display current word's scrambled word
 * @param {Boolean} options.allowCancel Whether people should have cancel option or not
 * @param {String} options.forceEndTitle The title when game is ended forcefully
 * @param {String} options.forceEndDescription The description when game is ended forcefully
 * @param {String} options.timeEndTitle The title when user failed in choosing their move.
 * @param {String} options.timeEndDescription The description when user failed in choosing their move.
 * @param {String} options.drawEndTitle The title when game ended with a draw.
 * @param {String} options.drawEndDescription The description when game ended with a draw.
 * @param {String} options.invalidInputReply The reply when invalid input is given.
 * @param {String} options.duplicateInputReply The reply when duplicate input is given.
 * @param {String} options.winReply The reply when use wins the game. use {word} to display the answer
 * @param {String} options.looseReply The reply when use looses the game. use {word} to display the answer
 * @param {0 | 1 | 2} options.replyType How to reply? 0 => .reply, 1 => editReply, 2 => followUp
 * @param {Boolean} options.ephemeral If the created reply should be ephemeral.
 */
const game = new hangman(options);
```

# Note
- This version works for both Discord JS 13 & 14

# Support
If you need any help or something you can get support on my [discord server](https://discord.gg/XYnMTQNTFh)