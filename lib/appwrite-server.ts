import { Client, Databases, Storage } from 'node-appwrite';

// Server-side Appwrite configuration with API key
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

export const serverDatabases = new Databases(client);
export const serverStorage = new Storage(client);

export { client as serverClient };