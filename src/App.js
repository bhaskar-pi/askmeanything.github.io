import './App.css'
import {useState} from 'react'
import PulseLoader from 'react-spinners/PulseLoader'
import showdown from 'showdown'

const App = () => {
  const [displayText, setDisplayText] = useState('')
  const [loading, setLoading] = useState(null)
  const [userValue, setUserValue] = useState('')

  const getKeyWords = async event => {
    let userEnteredValue = event.target.value
    if (event.key === 'Enter' && userEnteredValue) {
      setLoading(true)
      setDisplayText('')
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userEnteredValue}),
      }

      setUserValue('')

      const response = await fetch('http://localhost:3001', options)
      const data = await response.json()
      const {result} = data
      const converter = new showdown.Converter()
      const markdownText = result
      const htmlText = converter.makeHtml(markdownText)
      console.log(htmlText)
      userEnteredValue = ''
      let currentIndex = 0
      let story = ''
      const timer = setInterval(() => {
        if (currentIndex < htmlText.length) {
          story += htmlText[currentIndex]
          setDisplayText(story)
          setLoading(false)

          currentIndex += 1
        } else {
          clearInterval(timer)
        }
      }, 55)
    }
  }

  return (
    <div>
      <div className="app-container">
        <h1 className="ask-me-title">Ask Me</h1>
        <h1 className="story-title">anything ?</h1>

        <div className="user-input-form-container">
          <input
            className="user-input"
            type="text"
            placeholder="How can I help you ?"
            onKeyDown={getKeyWords}
            value={userValue}
            onChange={e => setUserValue(e.target.value)}
          />
        </div>
        <div className="story-container">
          <div className="loader">
            <PulseLoader
              color="#ff6161"
              loading={loading}
              size={8}
              margin={4}
              speedMultiplier={0.8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <div id="displayText" dangerouslySetInnerHTML={{__html: displayText}}>
            {/* <p id="storyText" className="story-text">
              {displayText}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
