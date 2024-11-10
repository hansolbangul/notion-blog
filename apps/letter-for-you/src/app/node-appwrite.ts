import { Client, Account, ID, Databases } from "node-appwrite";

export const serverClient = new Client();

serverClient
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_LETTER_PROJECT_ID as string);

export const serverAccount = new Account(serverClient);
export const serverDatabases = new Databases(serverClient);
