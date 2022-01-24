import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
   uri: "https://api-eu-central-1.graphcms.com/v2/ckypvuydb0lfs01w86rh3gqii/master",
   cache: new InMemoryCache(),
});

export default client;
