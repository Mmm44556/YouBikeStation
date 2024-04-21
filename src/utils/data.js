
export async function youBikeStations() {
  try {
    const res = await fetch(process.env.env_YOUTBIKE_STATIONS, { cache: 'no-store' })
    return await res.json();
  } catch (error) {
    console.log(error)
  }
 
}