export default class Game {
    constructor(id, title, thumbnail, short_description, game_url, genre, platform) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.short_description = short_description;
        this.game_url = game_url;
        this.genre = genre;
        this.platform = platform;
    }
}