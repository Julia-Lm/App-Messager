
class Services {
    _apiBase = 'https://api.chucknorris.io/jokes/';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        return await this.getResource(`${this._apiBase}random`);
    }

}

export default Services;