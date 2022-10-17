import axios from "axios";
import getConfig from "next/config";
import LRU from "lru-cache";

const {
  publicRuntimeConfig: { API_INGREDIENTS, API_USER_KEY, CACHE_MAX },
} = getConfig();

const context = {
  cache: new LRU({
    max: CACHE_MAX,
  }),
};

const cache = (wrapperCacheFunc) => (req, res) => {
  req.cache = context.cache;
  return wrapperCacheFunc(req, res);
};

const cacheWrapper = async (req, res) => {
  const key = encodeURIComponent(req.url);

  if (req.cache && req.cache.has(key)) {
    const { data } = req.cache.get(key);

    return res.json(data);
  }

  try {
    const { status, data } = await axios(API_INGREDIENTS, {
      params: {
        metaInformation: true,
        apiKey: API_USER_KEY,
        query: req.query.query,
      },
    });

    if (status === 200) {
      if (req.cache) {
        req.cache.set(key, {
          data,
        });
      }
      return res.status(200).json(data);
    } else {
      return res.status(status).json(data);
    }
  } catch (error) {
    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

export default cache(cacheWrapper);
