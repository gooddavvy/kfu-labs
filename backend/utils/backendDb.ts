import * as fs from "fs";
import sanitizeString from "./sanitizeString";

export interface UserData {
    username: string;
    passwordHash: string;
    user_theme: string;
    awards: {
        total_points: number;
        trophies: any[];
    };
    goals: any[];
    goal_history: any[];
    workout_session_plans: any[];
    workout_history: any[];
    notifications: any[];
}

let backendDb = {
    add: ({ username, passwordHash }: { username: string; passwordHash: string; }): number => {
        let data: UserData = {
            username,
            passwordHash,
            user_theme: "Light",
            awards: {
                total_points: 0,
                trophies: [],
            },
            goals: [],
            goal_history: [],
            workout_session_plans: [],
            workout_history: [],
            notifications: [],
        };
        let status = 201;

        fs.writeFile(`user_info/${username}.json`, JSON.stringify(data, null, 2), err => {
            if (err) {
                status = 500;
                throw err;
            }
            console.log(`${username}'s user info JSON file has been successfully created`);
        });

        return status;
    },
    get: (username: string): UserData => {
        let data = fs.readFileSync(`user_info/${sanitizeString(username)}.json`, 'utf8');
        let json: UserData = JSON.parse(data);

        return json;
    },
    update: (newData: UserData): number => {
        let status = 201;
        let safeUsername = sanitizeString(newData.username);
        let this_ = backendDb;

        (() => {
            newData.username = safeUsername;
            newData.passwordHash = this_.get(safeUsername).passwordHash;
        })(); // Makes things "safe"
        fs.writeFile(`user_info/${safeUsername}.json`, JSON.stringify(newData, null, 2), err => {
            if (err) {
                status = 500;
                throw err;
            }
            console.log(`${safeUsername}'s user info JSON file has been successfully updated`);
        });

        return status;
    }
};

export default backendDb;
