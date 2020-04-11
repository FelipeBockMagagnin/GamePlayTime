import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

export default function GameDescription(props) {
    const [gameData, setGameData] = useState({});
    const [showGameLoading, setShowGameLoading] = useState(true);

    console.log(props);

    loadGame(props.match.params.id);

    if (showGameLoading) {
        return <Loader />
    }
    else {
        return renderData(gameData);
    }

    async function loadGame(id) {
        setShowGameLoading(true);

        const data = await axios.get('https://api.rawg.io/api/games/' + id);
        console.log('game page', data);
        
        setShowGameLoading(true);
        setGameData(data.data);
    }

    function renderData(data) {
        return (
            <div className="card shadow-card container page-card">

                <div className="form-row card-header">
                    <div className="col-md-6" >
                        <img className="image" src={data.background_image} alt="game" />
                    </div>

                    <div className="col-md-6">
                        <h1>{data.name}</h1>
                        <p>Release: {data.released}</p>
                        <p>Gameplay time: <b>{data.playtime}</b> hours - rating: <b>{data.rating}</b></p>
                        <div className="form-row">
                            <div className="col-md-4">
                                <p className="mb-0">Main Story</p>
                                <p>???</p>
                            </div>

                            <div className="col-md-4">
                                <p className="mb-0">Main + Extras</p>
                                <p>???</p>
                            </div>

                            <div className="col-md-4">
                                <p className="mb-0">Completionist</p>
                                <p>???</p>
                            </div>
                        </div>

                    </div>
                    <button className="add-game-button" onClick={() => alert('Not implemented, add game to user database')}><i className="fas fa-plus"></i></button>

                </div>

                <div className='card-body'>
                    <div className='form-row'>
                        <div className='col-md-8' style={{ borderRightWidth: 1, borderRightColor: 'black', borderRightStyle: 'solid' }}>
                            <video width="100%" height="330" controls style={{ marginBottom: 20 }}>
                                <source src={data.clip.clip} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <br></br>

                            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                        </div>

                        <div className='col-md-4'>
                            Genres:
                            <div className='tag-holder'>
                                {
                                    data.genres.map(genre =>
                                        <div key={genre.id} className='tag genres-tag'>
                                            {genre.name}
                                        </div>
                                    )
                                }
                            </div>

                            <br></br>

                            Category:
                            <div className='tag-holder'>
                                {
                                    data.tags.map(tag =>
                                        <div key={tag.id} className='tag category-tag'>
                                            <b>{tag.name}</b>
                                        </div>
                                    )
                                }
                            </div>

                            <br></br>

                            Publishers:
                            <div className='tag-holder'>
                                {
                                    data.publishers.map(publisher =>
                                        <div key={publisher.id} className='tag publisher-tag'>
                                            <src className="image-tag" src={publisher.image_background} alt="game" />
                                            {publisher.name}
                                        </div>
                                    )
                                }
                            </div>

                            <br></br>

                            Developers:
                            <div className='tag-holder'>
                                {
                                    data.developers.map(developer =>
                                        <div key={developer.id} className='tag developers-tag'>
                                            <src className="image-tag" src={developer.image_background} alt="game" />
                                            {developer.name}
                                        </div>
                                    )
                                }
                            </div>

                            <br></br>

                            <div>
                                <b>Social Data</b>
                                <div>
                                    Twitch: {data.twitch_count}
                                    <br></br>
                                    Youtube: {data.youtube_count}
                                    <br></br>
                                    Reddit: {data.reddit_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}