export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/patients", "/addnewtest", "/doctors"] };