export const isMobileDevice=()=>{
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// // Example usage:
// if (isMobileDevice()) {
//   console.log("Mobile");
// } else {
//   console.log("Desktop");
// }