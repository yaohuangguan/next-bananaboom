import React from 'react'
require('./PriceTable.scss')
const PriceTable = () => {
  return (
    <div>
      <section className="pricing-table">
  <div className="price-card">
    <h6 className="type">basic</h6>
    <div className="price"><span>$</span>20</div>
    <h5 className="plan">plan</h5>
    <ul className="details">
      <li>FREE Stickers</li>
      <li>FREE Delivery</li>
      <li>24/7 support</li>
    </ul>
    <div className="buy-button">
      <h3 className="btn">subscribe</h3>
    </div>
  </div>

  <div className="price-card">
    <h6 className="type">Awesome</h6>
    <div className="price"><span>$</span>50</div>
    <h5 className="plan">plan</h5>
    <ul className="details">
      <li>FREE Stickers</li>
      <li>FREE Delivery</li>
      <li>24/7 support</li>
    </ul>
    <div className="buy-button">
      <h3 className="btn">subscribe</h3>
    </div>
  </div>

  <div className="price-card">
    <h6 className="type">premium</h6>
    <div className="price"><span>$</span>100</div>
    <h5 className="plan">plan</h5>
    <ul className="details">
      <li>FREE Stickers</li>
      <li>FREE Delivery</li>
      <li>24/7 support</li>
    </ul>
    <div className="buy-button">
      <h3 className="btn">subscribe</h3>
    </div>
  </div>

</section>
    </div>
  )
}

export default PriceTable
