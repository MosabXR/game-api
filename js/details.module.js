import Game from './games.module.js';

export default class Details extends Game {
    constructor(id, title, thumbnail, short_description, game_url, genre, platform, status, description) {
        super(id, title, thumbnail, short_description, game_url, genre, platform);
        this.status = status;
        this.description = description;
    }
}