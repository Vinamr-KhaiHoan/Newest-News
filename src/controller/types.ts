export const VIETCETERA_HOMEPAGE = "https://vietcetera.com/vn/chuyen-muc/"
export const FACEBOOK_SEND_MESSAGE_URL = "https://graph.facebook.com/v10.0/me/messages?access_token"
export const FACEBOOK_VERIFIED_TOKEN = "EAAEUzdQFFV8BADgxTxGOs7GAZCyOJWKMHEy32lmibD8zW9jK3If0zZABMoJZC5CyiRtwDj1TS9fZA28hn6nZAqulw6Vibmew9myPkOo6eHH4REZCYoFbgsyaitilekmDUjl21CfOqrDR9BVyEMxP7CVvAfSURtMS9oi8xGXUpSNgZDZD"

export type ResponseInput = {
    messaging_type: string,
    recipient: { id: string },
    message: { text: string }
}

export const VERIFIED_WEBHOOK_CODE = 'SOA_ueh_project'

export type FacebookMessageInputAttributes = {
    object: string,
    entry: FacebookMessageEntry[]
}

export type FacebookMessageEntry = {
    id: string,
    time: number,
    messaging: FacebookMessageData[]

}

export type FacebookMessageData = {
    sender: { id: string },
    recipient: { id: string },
    timestamp: number,
    message: FacebookMessage
}

export type FacebookMessage = { mid: string, text: string }
