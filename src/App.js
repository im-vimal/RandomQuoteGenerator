import './App.css';
import React, { useEffect, useState } from 'react';

const colorsArray = [
    { bgColor: '#FF5733', textColor: '#FFFFFF' },
    { bgColor: '#33FF57', textColor: '#000000' },
    { bgColor: "rgb(254, 164, 127)", textColor: '#FFF' },
    { bgColor: "rgb(37, 204, 247)", textColor: '#FFF' },
    { bgColor: "rgb(234, 181, 67)", textColor: '#222' },
    { bgColor: "rgb(85, 230, 193)", textColor: '#222' },
    { bgColor: "rgb(202, 211, 200)", textColor: '#222' },
    { bgColor: "rgb(249, 127, 81)", textColor: '#FFF' },
    { bgColor: "rgb(27, 156, 252)", textColor: '#FFF' },
    { bgColor: "rgb(248, 239, 186)", textColor: '#222' },
    { bgColor: "rgb(88, 177, 159)", textColor: '#FFF' },
    { bgColor: "rgb(44, 58, 71)", textColor: '#FFF' },
    { bgColor: "rgb(179, 55, 113)", textColor: '#FFF' },
    { bgColor: "rgb(59, 59, 152)", textColor: '#FFF' },
    { bgColor: "rgb(253, 114, 114)", textColor: '#FFF' },
    { bgColor: "rgb(154, 236, 219)", textColor: '#222' },
    { bgColor: "rgb(214, 162, 232)", textColor: '#FFF' },
    { bgColor: "rgb(109, 33, 79)", textColor: '#FFF' },
    { bgColor: "rgb(24, 44, 97)", textColor: '#FFF' },
    { bgColor: "rgb(252, 66, 123)", textColor: '#FFF' },
    { bgColor: "rgb(189, 197, 129)", textColor: '#222' },
    { bgColor: "rgb(130, 88, 159)", textColor: '#FFF' }
];

const TwitterIcon = ({ fillColor }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={fillColor}
        className="twitter-icon"
    >
        <path opacity="0" d="M0 0h24v24H0z"></path>
        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
    </svg>
);

const App = () => {
    const [quote, setQuote] = useState('');
    const [allQuotes, setAllQuotes] = useState([]);
    const [error, setError] = useState(false);
    const [colorProp, setColorProp] = useState(colorsArray[0]);
    const [checkQuote, setCheckQuote] = useState({});

    useEffect(() => {
        fetch('/quotes.json')
            .then((res) => res.json())
            .then((quotes) => setAllQuotes(quotes))
            .catch((err) => setError(true));
    }, []);

    useEffect(() => {
        if (allQuotes.length) {
            generateRandom();
        }
    }, [allQuotes]);

    useEffect(() => {
        setColorProp(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
    }, [quote]);

    const generateRandom = () => {
        let randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        while (randomQuote.id in checkQuote) {
            randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
        }

        checkQuote[randomQuote.id] = true;
        if (Object.keys(checkQuote).length === allQuotes.length) {
            setCheckQuote({});
        }
        setQuote(randomQuote);
    };

    return (
        <div
            className="wrapper"
            style={{
                backgroundColor: colorProp.bgColor,
                color: colorProp.textColor,
            }}
        >
            {error ? (
                <div className="error-wrapper">
                    <p className="display-1">
                        Error while fetching the Quotes. Please check the network connection.
                    </p>
                </div>
            ) : (
                quote && (
                    <>
                        <h1 className="display-1 fixed-top">
                            Here are some awesome technical quotes
                        </h1>
                        <div id="quote-box" style={{ boxShadow: `0 0 10px 0 ${colorProp.textColor}8` }}>
                            <div id="text">
                                <span className="quote-sign user-select-none">&lsquo;&lsquo;</span>
                                {quote.quote}
                            </div>
                            <p id="author">- {quote.author}</p>
                            <div className="action user-select-none">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.quote)}`}
                                    id="tweet-quote"
                                    style={{
                                        backgroundColor: colorProp.bgColor,
                                        color: colorProp.textColor,
                                        borderColor: colorProp.textColor,
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Tweet
                                    <span className="twitter-icon-wrapper">
                                        <TwitterIcon fillColor={colorProp.textColor} />
                                    </span>
                                </a>
                                <button
                                    id="new-quote"
                                    onClick={generateRandom}
                                    style={{
                                        backgroundColor: colorProp.bgColor,
                                        color: colorProp.textColor,
                                        borderColor: colorProp.textColor,
                                    }}
                                >
                                    Next Quote
                                </button>
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default App;
