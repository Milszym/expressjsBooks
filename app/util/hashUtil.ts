import {sha512} from "js-sha512";

export class HashUtil {

    public static getHash(value: string) {
        return sha512.digest(value);
    }

}