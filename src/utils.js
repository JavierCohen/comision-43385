import fs from "fs";

export async function fileExists(path) {
    try {
        return await fs.promises.access(path, fs.constants.F_OK);
    } catch (error) {
        return false;
    }
}

export async function readFile(path) {
    try {
        const data = await fs.promises.readFile(path, "utf8");
        return JSON.parse(data);
    } catch (error) { 
        return [];
    }
}

export async function writeFile(path, data) {
    try {
        await fs.promises.writeFile(path, JSON.stringify(data, null, 2), "utf8");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function deleteFile(path) {
    try {
        await fs.promises.unlink(path);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}