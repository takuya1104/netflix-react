import React, { useState, useEffect } from 'react'
import axios from './axios';

import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // await = promice until comeback
            // axiosでbaseUrlをエイリアス化している.get(fetchUrl)でURL指定
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    // useEffectを使う際にuseEffectの外で定義されている変数　定数を使用する際に[]内に定義

    // console.log(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                        alt={movie.name} />
                ))}
            </div>
        </div>
    )
}

export default Row;
