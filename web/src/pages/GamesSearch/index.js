import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

export default function GamesSearch() {
    const [loadingPage, setLoadingPage] = useState(true);
    const [games, setGames] = useState([]);
    var nextGamesPost = useRef('');
    const [showGameLoading, setShowGameLoading] = useState(true);

    useEffect(() => {
        loadGames('https://api.rawg.io/api/games');
        window.addEventListener("scroll", handleScroll);
    }, []);

    async function loadGamesSearch(url, searchstring) {
        setLoadingPage(true);
        setGames([]);
        nextGamesPost.current = '';

        axios.get(url, searchstring).then(data => {
            setGames(data.results);
            nextGamesPost = data.next;
            setShowGameLoading(false);
        });
    }

    async function loadGames(url) {
        setShowGameLoading(true);

        axios.get(url).then(data => {
            if (data.data.results === undefined) {
                console.log('page loading error', data);
                return;
            }

            if (loadingPage) {
                setLoadingPage(false);
            }

            setGames((games) => (games.concat(data.data.results)));
            nextGamesPost.current = data.data.next;

            setShowGameLoading(false);
        });
    }

    //Detect the bottom page to load more game
    function handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            loadGames(nextGamesPost.current);
        }
    }

    function searchGames(event) {
        loadGamesSearch('https://api.rawg.io/api/games', event.target.value);
    }

    return (
        <div className="game-list-panel">
            <div className='container mt-3 mb-3'>
                <div className='col-md-6 container'>
                    <input className="form-control" placeholder="search" onChange={searchGames}></input>
                </div>
            </div>

            <div>
                {games.map(game =>
                    <Link key={game.id} to={'game/' + game.slug}>
                        <div className="card card-list">
                            <img src={game.background_image} alt="game" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{game.name}</h5>
                                <p className="card-text">Released: {game.released}-Playtime: <b>{game.playtime}</b></p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>


            {showGameLoading ? <Loader /> : null}
        </div>
    );
}