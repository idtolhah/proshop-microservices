// import libs
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
// import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
// import components
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
// import actions
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  // useSelector will subscribe the store whenever action is dispatched
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  // useEffect is simiilar to ComponentDidMount & ComponentDidUpdate
  // will run function inside
  useEffect(() => {
    // send action to store, will be listened by the reducer
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Back
        </Link>
      )}
      {/* <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{product.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in awhile,
              and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </IonCardContent>
          </IonCard>
        </Col>
        ))}
      </Row> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
