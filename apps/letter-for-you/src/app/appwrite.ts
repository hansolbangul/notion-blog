import { Client, Account, ID, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_LETTER_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);
