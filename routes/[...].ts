export default defineEventHandler((event) => {
  if (getRequestURL(event)) {
    const { pathname, search } = new URL(event.request.url);
    var headers = event.request.headers;
    var deepl_keys = process.env.DEEPL_KEYS.split(",");
    var expected_key = process.env.PSEUDO_DEEPL_KEY;
    if (headers.get("Authorization") === `DeepL-Auth-Key ${expected_key}`) {
      event.request.removeHeader("Authorization");
      var rand = Math.floor(Math.random() * deepl_keys.length);
      var deepl_key = deepl_keys[rand];
      event.request.headers.append("Authorization", `DeepL-Auth-Key ${deepl_key}`);
      return new Response(`https://api-free.deepl.com${pathname}${search}`);
      //return fetch(new Request(`https://api-free.deepl.com${pathname}${search}`, request));
    }
  }
})
