export class Api {
  static async fetchAndJsonOrNull(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return null;
      }
      return await res.json()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch(err) {
      return null;
    }
  }
}