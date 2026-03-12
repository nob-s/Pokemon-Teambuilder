export class Format {
  static capitalizeFirst(inputString: string): string {
    if (!inputString) {
      return inputString; // Handles empty or null strings gracefully
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  static capitalizeEachFirst(inputString: string): string {
    const split = inputString.split(' ');
    for (let i = 0; i < split.length; i++) {
      split[i] = this.capitalizeFirst(split[i]);
    }

    let ans = split[0];
    for (let i = 1; i < split.length; i++) {
      ans += " " + split[i];
    }
    return ans;
  }

  static listToSentence(list: string[]): string {
    if (list.length === 0) {
      return "";
    }
    if (list.length === 1) {
      return list[0];
    }

    let formatString = "";
    for (let i = 0; i < list.length - 1; i++) {
      if (i !== 0) {
        formatString += ", ";
      }
      formatString += list[i];
    }
    return `${formatString} and ${list[list.length - 1]}`;
  }
}