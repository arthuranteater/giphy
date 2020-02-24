import React from 'react';
import './App.css';
import { MainWrapper, Logo } from './styles'
import {
  CardImg, Card, Button, Form, FormGroup, Input, Container,
  Row, Col
} from 'reactstrap';

function App() {

  //renders
  const [status, setStatus] = React.useState('loading')
  const [input, setInput] = React.useState('')
  const [change, changeColors] = React.useState(false)
  const [random, isRandom] = React.useState(true)
  const [search, setSearch] = React.useState('')
  const [gif, setGif] = React.useState({
    random: {},
    list: []
  })

  //vars

  const appName = 'LFGS 😎'
  const slogan = 'Lightening Fast Gif Searches'

  //calls

  React.useEffect(() => {
    if (search === '') {
      isRandom(true)
      fetch(`https://api.giphy.com/v1/gifs/random?&api_key=${process.env.REACT_APP_GIPHY}&limit=5`).then(res => {
        return res.json()
          .then(res => {
            setGif({random: res.data })
            setTimeout(() => {
              setStatus('')
            }, 500)
          })
      })
    } else {
      isRandom(false)
      fetch(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.REACT_APP_GIPHY}&limit=5`).then(res => {
        return res.json()
          .then(res => {
            setGif({list: res.data })
            setTimeout(() => {
              setStatus('')
            }, 500)
          })
      })
    }
  }, [search, change])

  return (
    <div className="App">
      <MainWrapper change={change ? 'yes' : ''}>
        <Container>
          <Row>
            <Col>

              <h1 className='m-3' style={{ fontWeight: 'bold' }}>{appName.split('').map((letter, i) =>
                <Logo key={letter} random>{letter}</Logo>)}</h1>
                <p>{slogan.split(' ').map((word, i) =>
                <Logo key={word} random> {word} </Logo>)}</p>
            </Col>
            <Col>
              <Form className='mt-3' style={{ maxWidth: '400px', margin: 'left' }} onSubmit={e => {
                e.preventDefault()
                setSearch(input)
                changeColors(!change)
                setStatus('loading')
              }} inline>
                <FormGroup>
                  <Input onChange={e => setInput(e.target.value)} type="text" id="search" placeholder="search a gif" />
                </FormGroup>
                <Button type='submit'>{status === '' ? (input === '' ? 'Get Random Giphy' : 'Search') : 'Searching'}</Button>
              </Form>
            </Col>

          </Row>
          <Row>
            <Col>
              <div className='mt-5'>
                {status === 'loading' ? <div></div> : (random ?
                  <Card id='cd0' style={{ width: '800px', height: 'auto', margin: 'auto' }}>
                    <CardImg src={gif.random.images.downsized.url} alt="giphy" />
                  </Card>
                  : (gif.list.length === 0 ? <h2 className='text-danger'>No matches</h2> :
                  gif.list.map((g, i) =>
                    <Card key={g.id} id={`cd${i}`} style={{ width: '800px', height: 'auto', margin: 'auto' }}>
                      <CardImg src={g.images.downsized.url} alt="giphy" />
                    </Card>)
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
      </MainWrapper>
    </div>
  );
}

export default App;
