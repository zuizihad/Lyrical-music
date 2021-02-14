const searchSongs = async () => {
    try {

        toggleSpinner();
        const searchText = document.getElementById('search-field').value;
        const url = `https://api.lyrics.ovh/suggest/${searchText}`
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError("Something went wrong!!!")
    }
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                       
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);
    } catch (error) {
        displayError("Cannot get Lyric");
    }
}

const displayLyric = (lyrics) => {
    const songLyric = document.getElementById('song-lyrics');
    songLyric.innerText = lyrics;
}

const displayError = (error) => {
    const errorMsg = document.getElementById('error-msg');
    errorMsg.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
}