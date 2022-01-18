import axios from 'axios';
import React, { useState, useEffect } from 'react'

const LanguageTranslation = ({ text, language }) => {

    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    // Sets timer to update debouncedTerm 1000 ms after user stopped typing (= text changed)
    // This allows us to limit the number of API requests made when the user types something
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedText(text);
        }, 1000);
        // Cancels timer if user types something again before timer reaches 1000 ms
        return () => {
            clearTimeout(timerId);
        }
    }, [text]);

    // Makes API request to obtain output (= update translated piece of state)
    // after debouncedText or language has changed
    useEffect(() => {
        // We need a helper function to use the keyword async inside useEffect() (or we could use the promise syntax)
        const translate = async () => {
            const { data } = await axios.post(
                'https://translation.googleapis.com/language/translate/v2',
                // Whenever we make a POST request with axios, the 2nd argument is always going to be some info
                // to send along in the body but here we don't have anything to send in the body of the request
                // so we leave an empty object
                {},
                // API documentation specifies we should send query string parameters so we need a 3rd argument
                {
                    params: {
                        q: debouncedText,
                        target: language.value,
                        key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                    }
                });
            setTranslated(data.data.translations[0].translatedText);
        };
        translate();
    }, [debouncedText, language]);

    // Returns output
    return (
        <div>
            <h1 className='ui header'>{translated}</h1>
        </div>
    )
}

export default LanguageTranslation
