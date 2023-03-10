const openAI = require('openai')

const {Configuration, OpenAIApi} = openAI

const express = require('express')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

const port = 3001

const configuration = new Configuration({
  organization: 'org-yHF5TtfdeF2Sn3WHzelyDn93',
  apiKey: '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',
})
const openai = new OpenAIApi(configuration)

app.use(bodyParser.json())
app.use(cors())

app.listen(port, () => {
  console.log('am listening', port)
})

app.post('/', async (request, response) => {
  const {userEnteredValue} = request.body
  try {
    const createCompletionWithDavinci = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Just answer the questions in simple.${userEnteredValue}`,
      max_tokens: 3030,
      temperature: 0,
    })

    if (createCompletionWithDavinci.data.choices[0].text) {
      console.log(createCompletionWithDavinci.data.choices[0].text)
      response.json({result: createCompletionWithDavinci.data.choices[0].text})
    }
  } catch (error) {
    console.error(error)
    response.json({result: 'Internal Error'})
  }
})
