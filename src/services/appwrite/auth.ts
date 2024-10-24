import conf from "../../conf/conf"
import { Client,Account,ID } from "appwrite"

interface authCredentials {
    email: string;
    password: string;
    name?: string;
}

export class AuthService{
    client= new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}: authCredentials){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email,password}: authCredentials){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            const session = await this.account.getSession('current');
            console.log("Active session found", session);
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error", error);
            if ((error as any).response && (error as any).response.code === 401) {
                console.log("No Active Session. User is not logged in");
            }
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSession('current');
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
            
        }
    }
}
const authService = new AuthService();
export default authService;