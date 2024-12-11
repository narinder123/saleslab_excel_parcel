export const Utils = new (class {
  log(msg: any, flag?: string): void {
    if (!flag) console.log(`>`, msg);
    else if (flag == "err") {
      console.log(`> Error:`, msg);
    } else console.log(`> ${msg}`, msg);
  }

  remove(str: string, n?: number) {
    if (!str) return "";
    !str && console.log("n --> ", n, str);
    if (str.includes(" ")) {
      str = str
        .split(" ")
        .map((v) => v.replace(v[0], v[0]?.toUpperCase()))
        .join("");
    }
    if (str.includes("&")) {
      str = str.split("&").join("And");
    }
    if (str.includes("-")) {
      str = str
        .split("-")
        .map((v: string, i: number) =>
          i == 1 ? v.replace(v[0], v[0].toUpperCase()) : v
        )
        .join("");
    }
    [",", ":", ".", "(", ")", "/-Or", "+-plus", "*", "\n", "#", "%"].forEach((v) => {
      if (!v.includes("-")) while (str.includes(v)) str = str.replace(v, "");
      else {
        let [char, word] = v.split("-");
        while (str.includes(char)) str = str.replace(char, word);
      }
    });
    return str;
  }

  // first argument should not match with the rest of the arguments
  ShouldNotInclude(...args: string[]) {
    return args.every((val: string, i: number) => i == 0 || args[0] != val);
  }

  endProcess() {
    process.exit(0);
  }

  // removes all the duplicates from the Array
  distinct(arr: string[]): string[] {
    return [...new Set(arr)];
  }
})();
