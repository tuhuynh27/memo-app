import axios from "axios";

async function getImg(timeDelay = false) {
  // This is to prevent rate limit
  if (timeDelay)
    await new Promise((resolve, _) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

  try {
    const res = await axios.get("https://source.unsplash.com/random/800x200");
    return res.request.responseURL;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getImg;
