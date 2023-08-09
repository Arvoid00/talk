/* ========================================================================== */
/* searchTheWeb                                                               */
/* ========================================================================== */

export const searchTheWeb = async (query: string) => {
  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query })
    })

    if (!response.ok) {
      // Handle the error response
      console.error('Error response:', response)
      return
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error)
  }
}

/* ========================================================================== */
/* processSearchResult                                                        */
/* ========================================================================== */

export const processSearchResult = async (id: string) => {
  try {
    const res = await fetch(`/api/process?id=${id}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      }
    })
    console.log('🟢 response: ', res)

    if (!res.ok) {
      // Handle the error response
      console.error('Error response:', res)
      return
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error)
  }
}