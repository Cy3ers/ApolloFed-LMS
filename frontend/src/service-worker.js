import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({ request }) => request.destination === "document", new StaleWhileRevalidate());
