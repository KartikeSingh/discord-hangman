const { AttachmentBuilder, MessageCollector, EmbedBuilder } = require('discord.js');

const createHangman = require("./utility/createHangman");
const Options = require("./utility/Options");
const defaultWords = require('./utility/words.json');

module.exports = class Hangman {
    /**
    * The Hangman game
    * @param {string[]} words The words to use for the game
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
    constructor(options, words = defaultWords) {
        if (words && !Array.isArray(words) && !words.some(v => typeof v !== "string")) throw new Error("Invalid words array");

        this.words = words || defaultWords;
        this.options = new Options(options);
    }

    async start(interaction, _word = "") {
        return new Promise(async response => {
            let wrongs = 0,
                img = await createHangman(wrongs),
                at = new AttachmentBuilder(img, "game.png"),
                word = _word || this.words[Math.floor(Math.random() * this.words.length)],
                used = [];

            const msg = await interaction[this.options.replyType === 0 ? "reply" : this.options.replyType === 1 ? "editReply" : "followUp"]({
                ephemeral: this.ephemeral,
                files: [at],
                embeds: [
                    new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription(this.options.homeDescription.replace(/\{word\}/gi, word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")))
                        .setImage("attachment://game.png")
                        .setTitle(this.options.homeTitle)
                ],
                fetchReply: true
            });

            let dontDelete = false;

            const col = new MessageCollector(interaction.channel, {
                filter: m => m.author.id === interaction.user.id,
                time: 600000
            });

            col.on('collect', async (msg) => {
                if (this.options.autoDelete > 0 && !dontDelete) {
                    setTimeout(() => msg.delete().catch(() => { dontDelete = true }), this.options.autoDelete);
                }

                if (msg.content.toLowerCase() === "cancel") col.stop('cancel');

                const char = msg.content[0]?.toLowerCase();

                if (!/[a-z]/i.test(char)) return msg.reply(this.options.invalidInputReply).then((m) => setTimeout(() => m.delete().catch(e => { }), 5000))
                if (used.includes(char)) return msg.reply(this.options.duplicateInputReply).then((m) => setTimeout(() => m.delete().catch(e => { }), 5000));

                used.push(char);

                if (!word.includes(char)) wrongs++;

                let done = word.split("").every(v => used.includes(v));
                let description = (done ? this.options.winReply : (!done && wrongs === 6) ? this.options.looseReply : this.options.homeDescription).replace(/\{word\}/gi, word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" "));

                img = await createHangman(wrongs);
                at = new AttachmentBuilder(img, "game.png");

                await interaction[interaction.editReply ? "editReply" : "edit"]({
                    attachments: [],
                    files: [at],
                    embeds: [new EmbedBuilder()
                        .setColor(wrongs === 6 ? "#ff0000" : done ? "GREEN" : "RANDOM")
                        .setTitle(this.options.homeTitle)
                        .setImage("attachment://game.png")
                        .setDescription(description)
                    ]
                });

                if (wrongs === 6 || done) col.stop(done);
            })

            col.on('end', (s, r) => {
                if (r === "time") {
                    interaction.editReply({
                        attachments: [],
                        embeds: [{
                            title: this.options.timeEndTitle,
                            description: this.options.timeEndDescription
                        }]
                    });

                    response({
                        image: img,
                        attachment: at,
                        win: -1,
                        reason: "timeout",
                        word,
                        message: msg,
                    })
                } else if (r === "cancel") {
                    interaction.editReply({
                        attachments: [],
                        embeds: [{
                            title: this.options.forceEndTitle,
                            description: this.options.forceEndDescription
                        }]
                    });

                    response({
                        image: img,
                        attachment: at,
                        win: 0,
                        reason: "cancel",
                        word,
                        message: msg,
                    })
                } else {
                    response({
                        image: img,
                        attachment: at,
                        win: r ? 1 : 2,
                        reason: r ? "won" : "lost",
                        word,
                        message: msg,
                    })
                }
            })
        })
    }
}