
import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";

interface CreateUserAccount {
    email: string;
    password: string;
    name: string;
}

interface LoginUserAccount {
    email: string;
    password: string;
}

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

const appwriteAccount = new Account(appwriteClient);

export class AppwriteService {

    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await appwriteAccount.create(ID.unique(), email, name, password);
            if(userAccount){
                return this.LoginUserAccount({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating user account:", error);
            throw error;
        }
    }
    async LoginUserAccount({email, password}: LoginUserAccount){
        try {
            return await appwriteAccount.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log('Error while login', error);
            throw error;
        }
    }
     async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
            // return !!user; same as above
        } catch (error) {}

        return false
    }
    async getCurrentUser() {
        try {
            return appwriteAccount.get();
        } catch (error) {
            console.log("getcurrentUser error: " + error)
        }
        return null;
    }
    async logout() {
        try {
            return await appwriteAccount.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;