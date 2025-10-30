import React from 'react'
import { useLoaderData } from 'react-router-dom'

const Phone = () => {
    const loaderData = useLoaderData();
    console.log('Phone loader data:', loaderData);

    if (!loaderData) return <div>Loading phone...</div>

    // handle common wrappers like { data: { ... } } or array responses
    const phone = loaderData.data ?? (Array.isArray(loaderData) ? loaderData[0] : loaderData);

    if (!phone || typeof phone !== 'object') return <div>No phone data available</div>

    const id = phone.id ?? phone._id ?? phone._id_str
    const name = phone.name ?? phone.title ?? phone.model ?? phone.phoneName ?? phone.brand ?? Object.values(phone)[0]
    const image = phone.image ?? phone.imageUrl ?? phone.img ?? (phone.images && phone.images[0] && (phone.images[0].url ?? phone.images[0].src)) ?? ''
    const price = phone.price ?? phone.cost ?? phone.amount ?? phone.priceUSD ?? phone.price_usd

  return (
    <div>
      <h2>Phone Details</h2>
      {/* Debug: show raw phone object so we can inspect shape */}
      <pre style={{whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto', background: '#f6f8fa', padding: 8}}>
        {JSON.stringify(phone, null, 2)}
      </pre>

      <p>ID: {id}</p>
      {image ? <img src={image} alt={String(name)} style={{maxWidth: 320}} /> : <div>No image available</div>}
      <p>Name: {String(name)}</p>
      <p>Brand: {String(phone.brand ?? '')}</p>
      <p>Price: {String(price ?? 'N/A')}</p>
    </div>
  )
}

export default Phone
