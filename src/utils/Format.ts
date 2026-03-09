export class Format {
  static capitalizeFirst(inputString: string): string {
    if (!inputString) {
      return inputString; // Handles empty or null strings gracefully
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}