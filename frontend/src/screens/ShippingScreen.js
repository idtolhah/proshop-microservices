import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import { getUserAddressMain } from '../actions/userAddressActions'

const ShippingScreen = ({ history }) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAddressMain())
  }, [dispatch])

  const data = useSelector((state) => state.userAddressMain)
  
  // return
  const { userAddress } = data

  const [address, setAddress] = useState(userAddress ? userAddress.address : '')
  const [city, setCity] = useState(userAddress ? userAddress.city : '')
  const [postalCode, setPostalCode] = useState(userAddress ? userAddress.postalCode : '')
  const [province, setProvince] = useState(userAddress ? userAddress.province : '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, province }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            readOnly
            // onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            readOnly
            // onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            readOnly
            // onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='province'>
          <Form.Label>Province</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter province'
            value={province}
            required
            readOnly
            // onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
