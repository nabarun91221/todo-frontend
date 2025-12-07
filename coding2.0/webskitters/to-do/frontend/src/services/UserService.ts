
import type { RegisterUserPayload } from "@/interfaces/payload.types/RegisterUserPayload";
import type { LoginUserPayload } from "@/interfaces/payload.types/LoginUserPayload";

const baseAuthUrl = "http://localhost:9090";

async function parseJsonSafe(res: Response) {
    const text = await res.text();
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export const registerUser = async (data: RegisterUserPayload) => {
    const res = await fetch("http://localhost:9090/user/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res;
};

export const loginUser = async (data: LoginUserPayload) => {
    const res = await fetch("http://localhost:9090/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return res;
};

export const logoutUser = async () => {
    const res = await fetch("http://localhost:9090/user/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });
    const body = await parseJsonSafe(res);
    if (!res.ok) throw { status: res.status, body };
    return body;
};

// export const refreshJwtToken = async () => {
//     const res = await fetch(`${baseAuthUrl}/refresh-jwt-token`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//     });
//     const body = await parseJsonSafe(res);
//     if (!res.ok) throw { status: res.status, body };
//     return body;
// };

// export const validateJwtToken = async () => {
//     const res = await fetch(`${baseAuthUrl}/validate-refresh-token`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//     });
//     const body = await parseJsonSafe(res);
//     if (!res.ok) throw { status: res.status, body };
//     return body;
// };

// export const fetchUserInfo = async () => {
//     const res = await fetch(`${baseAuthUrl}/user`, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//     });
//     const body = await parseJsonSafe(res);
//     if (!res.ok) throw { status: res.status, body };
//     return body;
// };
