import React from 'react';
import './App.css';
import { MainWrapper } from './styles'
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

  const appName = 'LFGS'
  const slogan = 'Lightening Fast Gif Searches'
  const author = 'huntCodes'

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
          <Row className='mt-3'>
            <Col>
            <h1 style={{ fontWeight: 'bold' }}>{appName.split('').map((l, i) => <span key={l} className={`l${i}`}>{l}</span>)} <span role="img" aria-label='emoji'>😎</span></h1>
              <p className='mt-3' style={{ fontWeight: 'bold' }}>{slogan.split(' ').map((w, i) => <span key={w} className={`l${i}`}> {w} </span>)}</p>
            </Col>
            <Col>
              <Form className='mt-2' style={{ maxWidth: '400px', margin: 'left' }} onSubmit={e => {
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
                {status === 'loading' ? <></> : (random ?
                <Row>
                <Col>
                  <Card id='cd0' style={{ maxWidth: '800px', height: 'auto', margin: 'auto' }}>
                    <CardImg src={gif.random.images.downsized.url} alt="giphy" />
                  </Card>
                  </Col>
                  </Row>
                  : (gif.list.length === 0 ? <h2 className='text-danger'>No matches</h2> :
                  gif.list.map((g, i) =>
                  <Row>
                  <Col>
                    <Card key={g.id} className={`c${i}`} style={{ maxWidth: '800px', height: 'auto', margin: 'auto' }}>
                      <CardImg src={g.images.downsized.url} alt="giphy" />
                    </Card>
                   </Col>
                </Row>)
                  ))}
              </div>
            </Col>
          </Row>
        </Container>
          <footer style={{ marginTop: '50px', textAlign: 'center' }}>
            <h4 style={{ display: 'inline-block' }}>{author.split('').map((l, i)=> <span num={i} className={`l${i}`}>{l}</span>)} © {new Date().getFullYear()}</h4><p>Built with React, Styled Components</p>
          </footer>
      </MainWrapper>
    </div>
  );
}

export default App;
