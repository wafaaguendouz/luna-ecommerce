import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const {shop} = useParams()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/${shop}/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Recherche de produits...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
      Rechercher
      </Button>
    </Form>
  )
}

export default SearchBox