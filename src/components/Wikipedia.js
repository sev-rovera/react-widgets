import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Wikipedia = () => {

    const [term, setTerm] = useState('wikipedia');
    const [results, setResults] = useState([]);

    // Runs at initial render and after each render if term has changed
    // then calls Wikipedia API (throttling request for better performances)
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            });
            setResults(data.query.search);
        };


        /*
        another way to write that...
        (async () => {
            await axios.get('...')
        })()
        */

        /*
        or using promises...
        axios.get('...')
            .then((response) => {

            })
        */

        // If we're rendering component for the first time, we don't implement any delay before starting the search
        if (term && !results.length) {
            search();
        } else {

            // Setting a timer when user starts typing so we don't send an API request with every key press
            // Instead we wait for the user to stop typing for 500ms before calling the API
            const timeoutId = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 1000);

            // If the user types something again within 500ms, we cancel the first timeout
            // and set up another one
            return () => {
                clearTimeout(timeoutId)
            }
        }
    // Adding the 2nd param results.length is required to remove a warning but generates a 2nd API request...
    }, [term, results.length]);

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className='item'>
                <div className='right floated content'>
                    <a
                        className='ui button'
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className='content'>
                    <div className='header'>{result.title}</div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className='ui form'>
                <div className='field'>
                    <label>Enter Search Term</label>
                    <input
                        className='input'
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='ui celled list'>{renderedResults}</div>
        </div>
    )
}

export default Wikipedia
