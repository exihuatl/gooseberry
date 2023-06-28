import Image from 'next/image'

async function getData() {
  const res = await fetch('https://www.olx.pl/api/v1/offers/?offset=0&limit=40&category_id=4')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const { data: offers } = await getData();


  return (
    <main className="flex flex-col min-h-screen p-24">
      <h2 className="mb-8 text-2xl font-bold">Oferty pracy</h2>
      {offers.map((offer: any) => (
        <div key={offer.id} className="flex flex-col justify-between w-full p-8 mb-4 bg-white rounded-lg">
          <p className="font-semibold">{offer.title}</p>
          <p className="text-slate-400">{offer.created_time}</p>
          {offer.promotion?.isHighlighted && (
            <div className="flex items-center justify-center w-full h-8 mt-4 text-white bg-green-500 rounded-lg">
              <p className="text-sm">Promowane</p>
            </div>
          )}
        </div>
      ))}
    </main>
  )
}
