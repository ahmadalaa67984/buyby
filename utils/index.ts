// import Cookies from 'js-cookie';
// import { IBranchData } from 'modules/restaurant/branch-managment/interface';
import { NextRouter } from "next/router";

export function getLocalStorage(item, defaultValue, object = false) {
  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem(item)) {
      if (object) return JSON.parse(localStorage.getItem(item));
      return localStorage.getItem(item);
    }
    return defaultValue;
  }
  return defaultValue;
}
export function singleDigitToMutli(num, len = 2) {
  return `${num}`.padStart(len, "0");
}
export function setLocalStorage(item, value) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(item, value);
  }
}

export const downloadQRCodeSingle = (name) => {
  const qrCodeURL = document
    .getElementById("qrCodeEl")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let aEl = document.createElement("a");
  aEl.href = qrCodeURL;
  aEl.download = name + Date.now();
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
};

export function capitalizeFirstLetter(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}

export function titleCase(str) {
  var splitStr = str?.toLowerCase()?.split(" ");
  for (var i = 0; i < splitStr?.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i]?.charAt(0)?.toUpperCase() + splitStr[i]?.substring(1);
  }
  // Directly return the joined string
  return splitStr?.join(" ");
}

export function threeDigit(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}

export function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

// export function getBranchId() {
//     return Cookies.get('branchid');
// }

// export function findMyBrnachData(branches: IBranchData[]): IBranchData {
//     if (branches?.length > 0) return branches[0];
//     // let branchId: string = Cookies.get('branchid');
//     // return branches?.find((branch) => {
//     //     return branch._id == branchId;
//     // });
// }

export function pushQuery(router: NextRouter, queryObject: any, link?: string) {
  router.push({
    pathname: link
      ? link
      : router.pathname?.replace("[idx]", router?.query?.idx),
    query: { ...router.query, ...queryObject },
  });
}

export function formatDate(date: Date) {
  let dateCreation = new Date(date);
  return `${dateCreation.getFullYear()}-${
    dateCreation.getMonth() + 1
  }-${dateCreation.getDate()} ${dateCreation.getHours()}:${dateCreation.getMinutes()}`;
}

export const getFractureUnits = (itemUnit: string, stockUnit: string) => {
  console.log(itemUnit, stockUnit, "options");
  switch (stockUnit) {
    case "LITRE": {
      if (itemUnit == "LITRE") return 1;
      if (itemUnit == "ML") return 1000;
    }
    case "ML": {
      if (itemUnit == "LITRE") return 0.001;
      if (itemUnit == "ML") return 1;
    }
    case "KILOGRAM": {
      if (itemUnit == "KILOGRAM") return 1;
      if (itemUnit == "GRAM") return 1000;
    }
    case "GRAM": {
      if (itemUnit == "KILOGRAM") return 0.001;
      if (itemUnit == "GRAM") return 1;
    }

    default:
      return 1;
  }
};

export const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

export const arrayyObjectsEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
