module.exports = class Options {
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
    constructor(options) {
        this.autoDelete = options.autoDelete || 0;
        this.homeTitle = options.homeTitle || "Hangman Game!";
        this.homeDescription = options.homeDescription || "Type a character to guess the word\n\n```{word}```";
        this.allowCancel = typeof options.allowCancel === "boolean" ? options.allowCancel : false;
        this.forceEndTitle = options.forceEndTitle || "Game Cancelled";
        this.forceEndDescription = options.forceEndDescription || "You ended the game by typing `cancel`";
        this.timeEndTitle = options.timeEndTitle || "Game Ended";
        this.timeEndDescription = options.timeEndDescription || "You took too much time to respond";
        this.timeEndTitle = options.timeEndTitle || "Game Ended";
        this.timeEndDescription = options.timeEndDescription || "You took too much time to respond";
        this.timeEndTitle = options.timeEndTitle || "Game Ended";
        this.timeEndDescription = options.timeEndDescription || "You took too much time to respond";
        this.invalidInputReply = options.invalidInputReply || "You have to **provide** a **letter**, **not** a **number/symbol**";
        this.duplicateInputReply = options.duplicateInputReply || "You already used this letter";
        this.winReply = options.winReply || "You won the game, The word was **{word}**";
        this.looseReply = options.looseReply || "You lost the game, The word was **{word}**";
        this.ephemeral = typeof options.ephemeral === 'boolean' ? options.ephemeral : false;
        this.replyType = [0, 1, 2].includes(options.replyType) ? options.replyType : 0;

    }
}