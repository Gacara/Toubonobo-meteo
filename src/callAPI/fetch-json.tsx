// using native browser fetch; just wrapping for clarity
export async function getJSON<T> (url: string): Promise<T> {
    return (fetch(url).then(res => res.json()) as unknown) as T
  }