import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Phone from './Phone';

const Phones = () => {
    const phones = useLoaderData();
    console.log('Phones loader data:', phones);
  // defensive rendering: handle loading / unexpected shapes
  if (!phones) return <div>Loading phones...</div>
  if (!Array.isArray(phones)) return <div>Unexpected phones data: check console</div>

  return (
    <div>
      <h2>Phones Component</h2>
      <p>This is the phones component length {phones.length}</p>
      {/* Debug: show raw loader data to inspect shape */}
      <pre style={{whiteSpace: 'pre-wrap', maxHeight: 240, overflow: 'auto', background: '#f6f8fa', padding: 8}}>
        {JSON.stringify(phones, null, 2)}
      </pre>

      <ul style={{listStyle: 'none', padding: 0}}>
      {
        phones.map(phone => {
          const id = phone.id ?? phone._id ?? phone._id_str ?? phone._id_string;
          const displayName = phone.name ?? phone.title ?? phone.model ?? phone.phoneName ?? phone.brand ?? Object.values(phone)[0];
          const thumb = phone.image ?? phone.imageUrl ?? phone.img ?? (phone.images && phone.images[0] && (phone.images[0].url ?? phone.images[0].src)) ?? '';
          return (
            <li key={id ?? JSON.stringify(displayName)} style={{padding: 8, borderBottom: '1px solid #eee', display: 'flex', gap: 12, alignItems: 'center'}}>
              {thumb ? <img src={thumb} alt={String(displayName)} style={{width: 72, height: 72, objectFit: 'cover', borderRadius: 6}} /> : <div style={{width:72,height:72,background:'#f0f0f0',borderRadius:6}} />}
              <div>
                <div style={{fontWeight: 600}}>
                  <Link to={`/phone/${id ?? ''}`}>{displayName ?? JSON.stringify(phone)}</Link>
                </div>
                <div style={{fontSize: 12, color: '#666'}}>{String(phone.brand ?? '')} {phone.model ?? ''}</div>
              </div>
            </li>
          )
        })
      }
      </ul>
    </div>
  )
}

export default Phones
