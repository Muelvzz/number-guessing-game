const URL: string = "http://127.0.0.1:8000"

type UserPayload = {
  username?: string,
  email?: string,
  password: string
}

export async function loginUserData(payload: UserPayload) {
  const url = `${URL}/user/login`
  const newPayload = new URLSearchParams(payload)

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: newPayload,
      credentials: "include"
    })

    if (!response.ok) {
      throw new Error(`[CLIENT] Response status: ${response.status} | ${response.statusText} `)
    }

    const result = await response.json()
    const token = result["access_token"]
    localStorage.setItem("access_token", token)

    return result
  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }

  }
}

export async function registerUserData(payload: UserPayload) {
  const url: string = `${URL}/user/signup`

  try {

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "include"
    })
    if (!response.ok) {
      throw new Error(`[CLIENT] Response status: ${response.status} `)
    }

    const result = await response.json()
    return result

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.error(`[CLIENT] ${error.message}`)
    }
    else {
      console.error(`[CLIENT] Unknown Error: ${error}`)
      throw error
    }

  }
}