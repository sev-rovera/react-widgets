import React, { useState } from 'react'
import Dropdown from './Dropdown'
import LanguageTranslation from './LanguageTranslation';

const options = [
    {
        label: 'Afrikaans',
        value: 'af'
    },
    {
        label: 'Arabic',
        value: 'ar'
    },
    {
        label: 'Dutch',
        value: 'nl'
    },
    {
        label: 'Hindi',
        value: 'hi'
    }
];

const Translate = () => {

    const [text, setText] = useState('');
    const [language, setLanguage] = useState(options[0]);

    return (
        <div>
            <div className='ui form'>
                <div className='field'>
                    <label>Enter Text</label>
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
            <Dropdown
                dropdownLabel='Select a Language'
                selected={language}
                onSelected={setLanguage}
                options={options}
            />
            <hr />
            <h5 className='ui header'>Output</h5>
            <LanguageTranslation text={text} language={language}/>
        </div>
    )
}

export default Translate
